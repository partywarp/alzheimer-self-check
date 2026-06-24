import {
  AudioClassificationPipeline,
  AutoModelForAudioClassification,
  AutoProcessor,
  env,
  type PretrainedModelOptions,
} from '@huggingface/transformers'

const appBaseUrl = () =>
  import.meta.env.DEV
    ? `${self.location.origin}/`
    : new URL(import.meta.env.BASE_URL, self.location.origin).href

const publicAssetUrl = (path: string) => new URL(path, appBaseUrl()).href

type WorkerRequest = {
  type: 'analyze'
  audio: Float32Array
}

type Classification = {
  label: string
  score: number
}

env.localModelPath = publicAssetUrl('models/')
env.allowLocalModels = true
env.allowRemoteModels = false
const wasmBackend = env.backends.onnx.wasm

if (!wasmBackend) {
  throw new Error('ONNX WebAssembly backend is unavailable.')
}

wasmBackend.wasmPaths = {
  wasm: publicAssetUrl('runtime/ort-wasm-simd-threaded.wasm'),
  mjs: publicAssetUrl('runtime/ort-wasm-simd-threaded.mjs'),
}
wasmBackend.numThreads = 1
wasmBackend.proxy = false

let classifierPromise: ReturnType<typeof createClassifier> | null = null

async function createClassifier() {
  const modelPath = 'adresso-wav2vec2'
  const loadOptions = {
    dtype: 'q8',
    local_files_only: true,
    progress_callback: (progress) => {
      if (progress.status === 'progress') {
        self.postMessage({
          type: 'progress',
          progress: Math.round(progress.progress),
        })
      }
    },
  } satisfies PretrainedModelOptions

  const [processor, model] = await Promise.all([
    AutoProcessor.from_pretrained(modelPath, loadOptions),
    AutoModelForAudioClassification.from_pretrained(modelPath, loadOptions),
  ])

  return new AudioClassificationPipeline({
    task: 'audio-classification',
    model,
    processor,
  })
}

self.addEventListener('message', async (event: MessageEvent<WorkerRequest>) => {
  if (event.data.type !== 'analyze') return

  try {
    self.postMessage({ type: 'status', status: 'loading' })
    classifierPromise ??= createClassifier()
    const classifier = await classifierPromise

    self.postMessage({ type: 'status', status: 'analyzing' })
    const output = await classifier(event.data.audio, { top_k: 2 }) as Classification[]
    const scores = Object.fromEntries(output.map(({ label, score }) => [label.toLowerCase(), score]))

    self.postMessage({
      type: 'result',
      adScore: scores.ad ?? 0,
      controlScore: scores.cn ?? 0,
    })
  } catch (error) {
    classifierPromise = null
    self.postMessage({
      type: 'error',
      message: error instanceof Error ? error.message : 'Model analysis failed.',
    })
  }
})
