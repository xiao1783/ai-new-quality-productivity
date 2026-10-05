/**
 * esbuild Windows 补丁
 *
 * 问题:项目位于 OneDrive 同步目录,esbuild 的 Go 服务处理大数据包时会把
 * 输入写到 %TEMP%\esbuild-<随机> 临时文件,写完立即删除。Windows Defender
 * 实时扫描会短暂锁住新文件,导致“写完即删”竞态失败,构建报:
 *   remove C:\...\esbuild-xxx: Access is denied.
 *
 * 修复:
 *  1) 复用同一个稳定临时文件名(esbuild-packet.bin)——首次扫描后不再触发新扫描
 *  2) transform 失败时自动重试(双保险)
 *  3) 屏蔽服务 stop()(避免退出清理竞态)
 * 幂等:重复运行安全。package.json 的 postinstall 会在每次 npm install 后自动执行。
 */
const fs = require('fs')
const path = require('path')

const mainPath = path.join(__dirname, '..', 'node_modules', 'esbuild', 'lib', 'main.js')
if (!fs.existsSync(mainPath)) {
  console.log('[patch-esbuild] esbuild 未安装,跳过')
  process.exit(0)
}

let s = fs.readFileSync(mainPath, 'utf-8')
const before = s

/* ---- 1) writeFile:复用稳定路径 + 常开句柄 ----
 * 关键:保持一个永不关闭的文件句柄(Node 打开文件默认带 FILE_SHARE_DELETE),
 * 这样 Go 侧读完后的 os.Remove 会成功进入“待删除”状态,不再报 Access denied。
 * 句柄首次打开后一直复用,后续写入只做截断 + 覆写。 */
const writeFileFd = `  writeFile(contents, callback) {
    try {
      let tempFile = path2.join(os2.tmpdir(), "esbuild-packet.bin");
      if (globalThis.__esbuildPacketFd == null) {
        globalThis.__esbuildPacketFd = fs2.openSync(tempFile, "w");
      } else {
        try {
          fs2.ftruncateSync(globalThis.__esbuildPacketFd, 0);
        } catch {
        }
      }
      fs2.writeSync(globalThis.__esbuildPacketFd, contents);
      callback(tempFile);
    } catch {
      try {
        let tempFile = randomFileName();
        fs2.writeFileSync(tempFile, contents);
        callback(tempFile);
      } catch {
        callback(null);
      }
    }
  }`
const fsSyncOld = `  writeFile(contents, callback) {
    try {
      let tempFile = randomFileName();
      fs2.writeFileSync(tempFile, contents);
      callback(tempFile);
    } catch {
      callback(null);
    }
  }`
const fsSyncStable = `  writeFile(contents, callback) {
    try {
      let tempFile = path2.join(os2.tmpdir(), "esbuild-packet.bin");
      fs2.writeFileSync(tempFile, contents);
      callback(tempFile);
    } catch {
      callback(null);
    }
  }`
if (s.includes(fsSyncOld) || s.includes(fsSyncStable)) {
  s = s.replace(fsSyncOld, writeFileFd)
  s = s.replace(fsSyncStable, writeFileFd)
  console.log('[patch-esbuild] fsSync.writeFile -> 常开句柄')
}
const fsAsyncOld = `  writeFile(contents, callback) {
    try {
      let tempFile = randomFileName();
      fs2.writeFile(tempFile, contents, (err) => err !== null ? callback(null) : callback(tempFile));
    } catch {
      callback(null);
    }
  }`
const fsAsyncStable = `  writeFile(contents, callback) {
    try {
      let tempFile = path2.join(os2.tmpdir(), "esbuild-packet.bin");
      fs2.writeFile(tempFile, contents, (err) => err !== null ? callback(null) : callback(tempFile));
    } catch {
      callback(null);
    }
  }`
if (s.includes(fsAsyncOld) || s.includes(fsAsyncStable)) {
  s = s.replace(fsAsyncOld, writeFileFd)
  s = s.replace(fsAsyncStable, writeFileFd)
  console.log('[patch-esbuild] fsAsync.writeFile -> 常开句柄')
}

/* ---- 2) transform 重试(幂等:已存在则原位替换) ---- */
const START = '// === esbuild-packet-retry:start ==='
const END = '// === esbuild-packet-retry:end ==='
const retryWrapper = `${START}
var transform = (input, options) => new Promise((resolve, reject) => {
  const attempt = (n) => {
    ensureServiceIsRunning().transform(input, options).then(
      (v) => resolve(v),
      (e) => {
        if (e && /Access is denied/.test(e.message || "") && n < 20) {
          setTimeout(() => attempt(n + 1), 250);
          return;
        }
        reject(e);
      },
    );
  };
  attempt(0);
});
${END}`
const startIdx = s.indexOf(START)
const endIdx = s.indexOf(END)
if (startIdx !== -1 && endIdx !== -1) {
  s = s.slice(0, startIdx) + retryWrapper + s.slice(endIdx + END.length)
  console.log('[patch-esbuild] transform 重试已原位更新')
} else {
  const originalTransform = 'var transform = (input, options) => ensureServiceIsRunning().transform(input, options);'
  if (s.includes(originalTransform)) {
    s = s.replace(originalTransform, retryWrapper)
    console.log('[patch-esbuild] transform 重试已安装')
  } else {
    console.log('[patch-esbuild] 未找到 transform 入口,跳过重试补丁')
  }
}

/* ---- 3) 屏蔽服务 stop() ---- */
const stopOld = `var stop = () => {
  if (stopService) stopService();
  if (workerThreadService) workerThreadService.stop();
  return Promise.resolve();
};`
const stopNew = `var stop = () => {
  return Promise.resolve();
};`
if (s.includes(stopOld)) {
  s = s.replace(stopOld, stopNew)
  console.log('[patch-esbuild] stop() 已屏蔽')
}

if (s !== before) {
  fs.writeFileSync(mainPath, s)
  console.log('[patch-esbuild] 补丁已写入 node_modules/esbuild/lib/main.js')
} else {
  console.log('[patch-esbuild] 无需更改(已打过补丁)')
}
