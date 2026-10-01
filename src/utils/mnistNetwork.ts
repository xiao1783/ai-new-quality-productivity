let w12: number[][] = []
let w23: number[][] = []
let bias2: number[] = []
let bias3: number[] = []
let loading: Promise<boolean> | null = null

export function loadWeights() {
  if (w12.length) return Promise.resolve(true)
  if (loading) return loading
  loading = fetch(`${import.meta.env.BASE_URL}assets/ai-journey/mnist-weights.json`)
    .then((response) => {
      if (!response.ok) throw new Error(`MNIST weights: ${response.status}`)
      return response.json()
    })
    .then((weights) => {
      w12 = weights.w12
      w23 = weights.w23
      bias2 = weights.bias2
      bias3 = weights.bias3
      return true
    })
    .catch(() => false)
  return loading
}

const sigmoid = (value: number) => 1 / (1 + Math.exp(-value))

function softmax(values: number[]) {
  const max = Math.max(...values)
  const exps = values.map((value) => Math.exp(value - max))
  const total = exps.reduce((sum, value) => sum + value, 0)
  return exps.map((value) => value / total)
}

function infer(data: number[]) {
  const hidden = w12.map((weights, index) => {
    let sum = bias2[index]
    for (let i = 0; i < weights.length; i += 1) sum += data[i] * weights[i]
    return sigmoid(sum)
  })
  return softmax(
    w23.map((weights, index) => {
      let sum = bias3[index]
      for (let i = 0; i < weights.length; i += 1) sum += hidden[i] * weights[i]
      return sum
    }),
  )
}

type Point = [number, number]

export interface Recognition {
  digit: number
  confidence: number
  probabilities: number[]
}

export function recognizeDigit(paths: Point[][]): Recognition | null {
  if (!w12.length || !paths.some((path) => path.length > 1)) return null

  const points = paths.flat()
  const xs = points.map(([x]) => x)
  const ys = points.map(([, y]) => y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  const width = Math.max(maxX - minX, 1)
  const height = Math.max(maxY - minY, 1)
  const scale = 190 / Math.max(width, height)
  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2

  const canvas = document.createElement('canvas')
  canvas.width = 280
  canvas.height = 280
  const context = canvas.getContext('2d')
  if (!context) return null
  context.fillStyle = '#fff'
  context.fillRect(0, 0, 280, 280)
  context.strokeStyle = '#000'
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.lineWidth = 20 / scale
  context.setTransform(scale, 0, 0, scale, 140 - centerX * scale, 140 - centerY * scale)
  paths.forEach((path) => {
    if (path.length < 2) return
    context.beginPath()
    context.moveTo(path[0][0], path[0][1])
    path.slice(1).forEach(([x, y]) => context.lineTo(x, y))
    context.stroke()
  })
  context.resetTransform()

  const image = context.getImageData(0, 0, 280, 280).data
  const input = new Array<number>(784)
  for (let y = 0; y < 28; y += 1) {
    for (let x = 0; x < 28; x += 1) {
      let darkness = 0
      for (let sy = 0; sy < 10; sy += 1) {
        for (let sx = 0; sx < 10; sx += 1) {
          const offset = ((y * 10 + sy) * 280 + x * 10 + sx) * 4
          darkness += 1 - image[offset] / 255
        }
      }
      input[x * 28 + y] = (darkness / 100 - 0.5) / 0.5
    }
  }

  const probabilities = infer(input)
  const digit = probabilities.indexOf(Math.max(...probabilities))
  return {
    digit,
    confidence: probabilities[digit] * 100,
    probabilities,
  }
}
