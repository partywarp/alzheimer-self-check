import './style.css'

const appBaseUrl = () =>
  import.meta.env.DEV
    ? `${window.location.origin}/`
    : new URL(import.meta.env.BASE_URL, window.location.origin).href

const publicAssetUrl = (path = '') => new URL(path, appBaseUrl()).href

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <a class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-heading focus:outline-2 focus:outline-offset-2 focus:outline-brand" href="#main-content">
    Skip to main content
  </a>
  <main id="main-content" tabindex="-1" class="min-h-screen bg-page-soft font-sans text-ink antialiased focus:outline-none">
    <nav class="border-b border-line-muted bg-white">
      <div class="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <a href="${publicAssetUrl()}" class="min-w-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
          <span class="block truncate text-sm font-semibold text-ink-brand"><span class="sm:hidden">Alzheimer's helper</span><span class="hidden sm:inline">Alzheimer's screening helper</span></span>
          <span class="block text-xs text-muted-soft">alzheimer self check</span>
        </a>
        <div class="flex shrink-0 gap-3 text-sm">
          <a href="${publicAssetUrl()}" class="font-medium text-brand-link-dark underline decoration-brand-decoration underline-offset-4">Exercise</a>
          <a href="${publicAssetUrl('about.html')}" class="font-medium text-brand-link-dark underline decoration-brand-decoration underline-offset-4">About</a>
        </div>
      </div>
    </nav>

    <article class="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-12">
      <header class="max-w-3xl">
        <p class="text-sm font-medium text-brand-overline">Method, evidence, privacy, limitations</p>
        <h1 class="mt-3 text-3xl leading-tight font-semibold tracking-[-0.02em] text-ink-heading sm:text-4xl">
          What a speech risk-class comparison can and cannot tell you
        </h1>
        <p class="mt-4 text-base leading-7 text-muted-body">
          This page is for families looking for Alzheimer's or dementia screening information. The exercise can structure a private picture-description recording and optional experimental model comparison. It is not diagnostic and is not a substitute for clinical cognitive screening or medical evaluation.
        </p>
      </header>

      <div class="mt-10 grid border-y border-line-muted md:grid-cols-3 md:divide-x md:divide-line-muted">
        <section class="py-5 md:pr-6">
          <p class="text-xs font-medium text-brand-label">1. Describe</p>
          <h2 class="mt-2 text-lg font-semibold text-ink-strong">Connected speech</h2>
          <p class="mt-2 text-sm leading-6 text-muted-copy-7">A detailed scene encourages natural, continuous speech rather than isolated words or rehearsed answers.</p>
        </section>
        <section class="border-t border-line-muted py-5 md:border-t-0 md:px-6">
          <p class="text-xs font-medium text-brand-label">2. Process</p>
          <h2 class="mt-2 text-lg font-semibold text-ink-strong">On-device audio</h2>
          <p class="mt-2 text-sm leading-6 text-muted-copy-7">The browser converts up to 90 seconds to a mono 16 kHz waveform. The recording stays on the device.</p>
        </section>
        <section class="border-t border-line-muted py-5 md:border-t-0 md:pl-6">
          <p class="text-xs font-medium text-brand-label">3. Compare</p>
          <h2 class="mt-2 text-lg font-semibold text-ink-strong">Research classes</h2>
          <p class="mt-2 text-sm leading-6 text-muted-copy-7">A Wav2Vec2 classifier reports relative similarity to control and Alzheimer's-dementia classes from a research dataset. That is not a clinical risk classification.</p>
        </section>
      </div>

      <section class="mt-10">
        <h2 class="text-2xl font-semibold text-ink-strong">How to interpret a result</h2>
        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 class="font-bold text-ink-soft">"Without dementia" is a model class</h3>
            <p class="mt-2 text-sm leading-6 text-muted-copy-7">A higher control percentage means the recording was more similar to speech the model labeled as its control group. It does not establish that a person is cognitively healthy.</p>
          </div>
          <div>
            <h3 class="font-bold text-ink-soft">There is no validated screening cutoff</h3>
            <p class="mt-2 text-sm leading-6 text-muted-copy-7">The model source does not publish a typical healthy range, score distribution, calibration study, screening threshold, or clinical cutoff. The percentages are class-comparison outputs, not disease probabilities.</p>
          </div>
        </div>
      </section>

      <section class="mt-12">
        <h2 class="text-2xl font-semibold text-ink-strong">Important limitations</h2>
        <div class="mt-5 divide-y divide-line-muted border-t border-line-muted">
          <div class="py-4"><h3 class="font-semibold text-ink-warm">Not diagnostic</h3><p class="mt-2 text-sm leading-6 text-muted-copy-9">Diagnosis requires qualified clinical assessment and may involve history, cognitive testing, examination, imaging, or laboratory work.</p></div>
          <div class="py-4"><h3 class="font-semibold text-ink-warm">Different pictures</h3><p class="mt-2 text-sm leading-6 text-muted-copy-9">This app rotates original scenes that were not used to train or validate the model. Scores from different pictures are not directly comparable.</p></div>
          <div class="py-4"><h3 class="font-semibold text-ink-warm">Many sources of variation</h3><p class="mt-2 text-sm leading-6 text-muted-copy-9">Microphone quality, background noise, accent, language, age, speaking style, fatigue, and recording length can change the output.</p></div>
          <div class="py-4"><h3 class="font-semibold text-ink-warm">Sparse model documentation</h3><p class="mt-2 text-sm leading-6 text-muted-copy-9">The bundled model card does not document model-specific performance, demographics, intended use, clinical validation, or a license.</p></div>
        </div>
      </section>

      <section class="mt-10 border-y border-line-research bg-result-research-bg px-4 py-6">
        <h2 class="text-2xl font-semibold text-ink-strong">Privacy and research sharing</h2>
        <p class="mt-3 max-w-3xl text-sm leading-7 text-muted-copy">
          Recording and analysis remain local unless you opt in after viewing a result. Opted-in research sharing sends only image ID, model scores, result band, duration, broad browser family, timestamp, consent version, and optional age and gender survey answers to Appwrite TablesDB. It excludes audio, transcript, full user agent, name, email, and recording files.
        </p>
      </section>

      <section class="mt-12">
        <h2 class="text-2xl font-semibold text-ink-strong">References and model record</h2>
        <ul class="mt-6 space-y-3 text-sm leading-6 text-muted-copy">
          <li><a class="font-bold text-brand-action underline decoration-result-research-decoration underline-offset-4" href="https://www.isca-archive.org/interspeech_2020/luz20_interspeech.html" target="_blank" rel="noreferrer">Luz et al. (2020), ADReSS Challenge</a> - standardized spontaneous-speech dementia recognition research.</li>
          <li><a class="font-bold text-brand-action underline decoration-result-research-decoration underline-offset-4" href="https://www.isca-archive.org/interspeech_2021/luz21_interspeech.html" target="_blank" rel="noreferrer">Luz et al. (2021), ADReSSo Challenge</a> - speech-only recognition and cognitive-score prediction tasks.</li>
          <li><a class="font-bold text-brand-action underline decoration-result-research-decoration underline-offset-4" href="https://talkbank.org/dementia/" target="_blank" rel="noreferrer">DementiaBank</a> - shared language and dementia research resources.</li>
          <li><a class="font-bold text-brand-action underline decoration-result-research-decoration underline-offset-4" href="https://huggingface.co/giyong/wav2vec2-base_ADReSSo" target="_blank" rel="noreferrer">giyong/wav2vec2-base_ADReSSo</a> - source model converted for local ONNX inference.</li>
          <li><a class="font-bold text-brand-action underline decoration-result-research-decoration underline-offset-4" href="${publicAssetUrl('models/adresso-wav2vec2/MODEL-NOTICE.md')}" target="_blank" rel="noreferrer">Local model notice</a> - exact revision, conversion, labels, and documentation gaps.</li>
        </ul>
      </section>

      <div class="mt-12 border-t border-line-muted-2 pt-8">
        <p class="text-sm leading-6 text-muted-softer">If memory, language, or thinking changes concern you, discuss them with a qualified healthcare professional.</p>
        <a href="${publicAssetUrl()}" class="mt-5 inline-flex text-sm font-semibold text-brand underline decoration-brand-decoration underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand">Return to exercise</a>
      </div>
    </article>
  </main>
`
