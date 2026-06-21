import './style.css'

const appBaseUrl = () =>
  import.meta.env.DEV
    ? `${window.location.origin}/`
    : new URL(import.meta.env.BASE_URL, window.location.origin).href

const publicAssetUrl = (path = '') => new URL(path, appBaseUrl()).href

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <a class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#203836] focus:outline-2 focus:outline-offset-2 focus:outline-[#315f5a]" href="#main-content">
    Skip to main content
  </a>
  <main id="main-content" tabindex="-1" class="min-h-screen bg-[#fafaf8] font-sans text-[#202827] antialiased focus:outline-none">
    <nav class="border-b border-[#d9ddda] bg-white">
      <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="${publicAssetUrl()}" class="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315f5a]">
          <span class="block text-sm font-semibold text-[#253f3d]">Alzheimer's screening helper</span>
          <span class="block text-xs text-[#697572]">Method & limitations</span>
        </a>
        <div class="flex gap-4 text-sm">
          <a href="${publicAssetUrl()}" class="font-medium text-[#285f59] underline decoration-[#a8b9b4] underline-offset-4">Exercise</a>
          <a href="${publicAssetUrl('about.html')}" class="font-medium text-[#285f59] underline decoration-[#a8b9b4] underline-offset-4">About me</a>
        </div>
      </div>
    </nav>

    <article class="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-12">
      <header class="max-w-3xl">
        <p class="text-sm font-medium text-[#44736c]">Method, evidence, privacy, limitations</p>
        <h1 class="mt-3 text-3xl leading-tight font-semibold tracking-[-0.02em] text-[#203836] sm:text-4xl">
          What a speech risk-class comparison can and cannot tell you
        </h1>
        <p class="mt-4 text-base leading-7 text-[#596a68]">
          This page is for families looking for Alzheimer's or dementia screening information. The exercise can structure a private picture-description recording and optional experimental model comparison. It is not diagnostic and is not a substitute for clinical cognitive screening or medical evaluation.
        </p>
      </header>

      <div class="mt-10 grid border-y border-[#d9ddda] md:grid-cols-3 md:divide-x md:divide-[#d9ddda]">
        <section class="py-5 md:pr-6">
          <p class="text-xs font-medium text-[#4b746e]">1. Describe</p>
          <h2 class="mt-2 text-lg font-semibold text-[#183738]">Connected speech</h2>
          <p class="mt-2 text-sm leading-6 text-[#63716e]">A detailed scene encourages natural, continuous speech rather than isolated words or rehearsed answers.</p>
        </section>
        <section class="border-t border-[#d9ddda] py-5 md:border-t-0 md:px-6">
          <p class="text-xs font-medium text-[#4b746e]">2. Process</p>
          <h2 class="mt-2 text-lg font-semibold text-[#183738]">On-device audio</h2>
          <p class="mt-2 text-sm leading-6 text-[#63716e]">The browser converts up to 90 seconds to a mono 16 kHz waveform. The recording stays on the device.</p>
        </section>
        <section class="border-t border-[#d9ddda] py-5 md:border-t-0 md:pl-6">
          <p class="text-xs font-medium text-[#4b746e]">3. Compare</p>
          <h2 class="mt-2 text-lg font-semibold text-[#183738]">Research classes</h2>
          <p class="mt-2 text-sm leading-6 text-[#63716e]">A Wav2Vec2 classifier reports relative similarity to control and Alzheimer's-dementia classes from a research dataset. That is not a clinical risk classification.</p>
        </section>
      </div>

      <section class="mt-10 border-t border-[#d9ddda] pt-7">
        <h2 class="text-2xl font-semibold text-[#183738]">How to interpret a result</h2>
        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 class="font-bold text-[#284746]">"Without dementia" is a model class</h3>
            <p class="mt-2 text-sm leading-6 text-[#63716e]">A higher control percentage means the recording was more similar to speech the model labeled as its control group. It does not establish that a person is cognitively healthy.</p>
          </div>
          <div>
            <h3 class="font-bold text-[#284746]">There is no validated screening cutoff</h3>
            <p class="mt-2 text-sm leading-6 text-[#63716e]">The model source does not publish a typical healthy range, score distribution, calibration study, screening threshold, or clinical cutoff. The percentages are class-comparison outputs, not disease probabilities.</p>
          </div>
        </div>
      </section>

      <section class="mt-12">
        <h2 class="text-2xl font-semibold text-[#183738]">Important limitations</h2>
        <div class="mt-5 divide-y divide-[#d9ddda] border-y border-[#d9ddda]">
          <div class="py-4"><h3 class="font-semibold text-[#4c493b]">Not diagnostic</h3><p class="mt-2 text-sm leading-6 text-[#6f6b5e]">Diagnosis requires qualified clinical assessment and may involve history, cognitive testing, examination, imaging, or laboratory work.</p></div>
          <div class="py-4"><h3 class="font-semibold text-[#4c493b]">Different pictures</h3><p class="mt-2 text-sm leading-6 text-[#6f6b5e]">This app rotates original scenes that were not used to train or validate the model. Scores from different pictures are not directly comparable.</p></div>
          <div class="py-4"><h3 class="font-semibold text-[#4c493b]">Many sources of variation</h3><p class="mt-2 text-sm leading-6 text-[#6f6b5e]">Microphone quality, background noise, accent, language, age, speaking style, fatigue, and recording length can change the output.</p></div>
          <div class="py-4"><h3 class="font-semibold text-[#4c493b]">Sparse model documentation</h3><p class="mt-2 text-sm leading-6 text-[#6f6b5e]">The bundled model card does not document model-specific performance, demographics, intended use, clinical validation, or a license.</p></div>
        </div>
      </section>

      <section class="mt-10 border-y border-[#b9c8c4] bg-[#f2f6f4] px-4 py-6">
        <h2 class="text-2xl font-semibold text-[#183738]">Privacy and research sharing</h2>
        <p class="mt-3 max-w-3xl text-sm leading-7 text-[#536563]">
          Recording and analysis remain local. The optional research-sharing prototype prepares only image ID, model scores, result band, duration, broad browser family, timestamp, and consent version. It excludes audio, transcript, full user agent, and identifiers. No submissions are currently stored.
        </p>
      </section>

      <section class="mt-12">
        <h2 class="text-2xl font-semibold text-[#183738]">References and model record</h2>
        <ul class="mt-6 space-y-3 text-sm leading-6 text-[#536563]">
          <li><a class="font-bold text-[#216869] underline decoration-[#9bbeb6] underline-offset-4" href="https://www.isca-archive.org/interspeech_2020/luz20_interspeech.html" target="_blank" rel="noreferrer">Luz et al. (2020), ADReSS Challenge</a> - standardized spontaneous-speech dementia recognition research.</li>
          <li><a class="font-bold text-[#216869] underline decoration-[#9bbeb6] underline-offset-4" href="https://www.isca-archive.org/interspeech_2021/luz21_interspeech.html" target="_blank" rel="noreferrer">Luz et al. (2021), ADReSSo Challenge</a> - speech-only recognition and cognitive-score prediction tasks.</li>
          <li><a class="font-bold text-[#216869] underline decoration-[#9bbeb6] underline-offset-4" href="https://talkbank.org/dementia/" target="_blank" rel="noreferrer">DementiaBank</a> - shared language and dementia research resources.</li>
          <li><a class="font-bold text-[#216869] underline decoration-[#9bbeb6] underline-offset-4" href="https://huggingface.co/giyong/wav2vec2-base_ADReSSo" target="_blank" rel="noreferrer">giyong/wav2vec2-base_ADReSSo</a> - source model converted for local ONNX inference.</li>
          <li><a class="font-bold text-[#216869] underline decoration-[#9bbeb6] underline-offset-4" href="${publicAssetUrl('models/adresso-wav2vec2/MODEL-NOTICE.md')}" target="_blank" rel="noreferrer">Local model notice</a> - exact revision, conversion, labels, and documentation gaps.</li>
        </ul>
      </section>

      <div class="mt-12 border-t border-[#d9ddd6] pt-8">
        <p class="text-sm leading-6 text-[#687775]">If memory, language, or thinking changes concern you, discuss them with a qualified healthcare professional.</p>
        <a href="${publicAssetUrl()}" class="mt-5 inline-flex text-sm font-semibold text-[#315f5a] underline decoration-[#a8b9b4] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#315f5a]">Return to exercise</a>
      </div>
    </article>
  </main>
`
