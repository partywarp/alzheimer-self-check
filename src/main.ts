import {
  ResearchSubmissionConfigurationError,
  submitResearchSubmission,
  type ResearchSubmissionDocument,
} from './research-submissions'
import './style.css'

type RecorderState = 'idle' | 'requesting' | 'calibrating' | 'recording' | 'completed' | 'error' | 'unsupported'
type AnalysisPanel = 'ready' | 'loading' | 'result' | 'error'
type ResultBand = 'control-like' | 'mixed' | 'ad-like'
type BrowserFamily = ResearchSubmissionDocument['browserFamily']

interface PictureScene {
  id: string
  title: string
  src: string
  alt: string
}

interface PictureDeckState {
  currentId: string
  remainingIds: string[]
}

interface AnalysisResult {
  adScore: number
  controlScore: number
  band: ResultBand
}

type ModelWorkerMessage =
  | { type: 'progress'; progress: number }
  | { type: 'status'; status: 'loading' | 'analyzing' }
  | { type: 'result'; adScore: number; controlScore: number }
  | { type: 'error'; message: string }

const appBaseUrl = () =>
  import.meta.env.DEV
    ? `${window.location.origin}/`
    : new URL(import.meta.env.BASE_URL, window.location.origin).href

const publicAssetUrl = (path = '') => new URL(path, appBaseUrl()).href

const scenes: PictureScene[] = [
  {
    id: 'kitchen',
    title: 'Busy kitchen',
    src: publicAssetUrl('scenes/busy-kitchen.png'),
    alt: 'A detailed black-and-white kitchen scene with water overflowing from a sink, a child reaching into a cupboard, another child holding a towel, and a dog watching.',
  },
  {
    id: 'park-picnic',
    title: 'Park picnic',
    src: publicAssetUrl('scenes/park-picnic.png'),
    alt: 'A detailed black-and-white park scene with a family picnic, a spilled drink, children playing, a cyclist, ducks by a pond, and a playground.',
  },
  {
    id: 'moving-day',
    title: 'Moving day',
    src: publicAssetUrl('scenes/moving-day.png'),
    alt: 'A detailed black-and-white living room scene with a family unpacking boxes, hanging pictures, stacking blocks, carrying items, and cleaning up a fallen plant.',
  },
  {
    id: 'grocery-market',
    title: 'Grocery market',
    src: publicAssetUrl('scenes/grocery-market.png'),
    alt: 'A detailed black-and-white grocery market scene with shoppers, a cashier, produce displays, a fallen shopping bag, and a child pointing at fruit on the floor.',
  },
  {
    id: 'community-garden',
    title: 'Community garden',
    src: publicAssetUrl('scenes/community-garden.png'),
    alt: 'A detailed black-and-white community garden scene with adults and children planting, watering, moving a wheelbarrow, working near a shed, and tending raised beds.',
  },
]

const sceneIds = scenes.map(({ id }) => id)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <a class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#203836] focus:outline-2 focus:outline-offset-2 focus:outline-[#315f5a]" href="#main-content">
    Skip to main content
  </a>

  <main id="main-content" tabindex="-1" class="min-h-screen bg-[#fafaf8] font-sans text-[#202827] antialiased focus:outline-none">
    <nav class="border-b border-[#d9ddda] bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <a href="${publicAssetUrl()}" class="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315f5a]">
          <span class="block text-sm font-semibold text-[#253f3d]">Alzheimer's screening helper</span>
          <span class="block text-xs text-[#697572]">Runs in your browser</span>
        </a>
        <div class="flex items-center gap-2">
          <a href="${publicAssetUrl('science.html')}" class="px-2 py-2 text-xs font-medium text-[#315c58] underline decoration-[#a8b9b4] underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#315f5a]">Method & limitations</a>
          <a href="${publicAssetUrl('about.html')}" class="px-2 py-2 text-xs font-medium text-[#315c58] underline decoration-[#a8b9b4] underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#315f5a]">About me</a>
          <button id="share-app-nav" type="button" class="px-2 py-2 text-xs font-medium text-[#315c58] underline decoration-[#a8b9b4] underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#315f5a]">Share</button>
        </div>
      </div>
    </nav>

    <div class="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
      <header class="mb-7 max-w-3xl">
        <h1 class="max-w-2xl text-3xl leading-tight font-semibold tracking-[-0.02em] text-[#203836] sm:text-4xl">
          A private Alzheimer's screening helper for families.
        </h1>
        <p class="mt-3 max-w-2xl text-base leading-7 text-[#596663]">
          For adults concerned about an older parent or family member's memory, language, or speech. Record a picture description, listen back, and optionally run an experimental speech risk-class comparison. Not diagnostic.
        </p>
      </header>

      <section class="mb-7 border-y border-[#d9ddda] py-4" aria-labelledby="before-you-begin">
        <h2 id="before-you-begin" class="text-sm font-semibold text-[#293f3d]">Before you begin</h2>
        <dl class="mt-3 grid gap-x-8 gap-y-3 text-sm leading-6 text-[#596663] sm:grid-cols-2 lg:grid-cols-4">
          <div><dt class="font-medium text-[#293f3d]">Purpose</dt><dd>Memory-screening conversation aid.</dd></div>
          <div><dt class="font-medium text-[#293f3d]">Recording</dt><dd>Stays on this device.</dd></div>
          <div><dt class="font-medium text-[#293f3d]">Output</dt><dd>Experimental class comparison, not clinical risk.</dd></div>
          <div><dt class="font-medium text-[#293f3d]">Medical use</dt><dd>Not a diagnosis or substitute for a clinician.</dd></div>
        </dl>
      </section>

      <div class="mb-7" aria-label="Exercise progress">
        <div class="grid gap-3 sm:grid-cols-3">
          <div class="step-card flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-500 motion-reduce:transition-none" data-step="1">
            <span class="step-badge grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-500 motion-reduce:transition-none">1</span>
            <span class="text-sm font-semibold">Study the picture</span>
          </div>
          <div class="step-card flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-500 motion-reduce:transition-none" data-step="2">
            <span class="step-badge grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-500 motion-reduce:transition-none">2</span>
            <span class="text-sm font-semibold">Record your description</span>
          </div>
          <div class="step-card flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-500 motion-reduce:transition-none" data-step="3">
            <span class="step-badge grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-500 motion-reduce:transition-none">3</span>
            <span class="text-sm font-semibold">Review your recording</span>
          </div>
        </div>
      </div>

      <section id="workspace" class="grid items-start gap-6 transition-[grid-template-columns,gap] duration-500 motion-reduce:transition-none lg:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.75fr)] lg:gap-8">
        <div id="scene-panel" class="min-w-0 max-h-300 translate-y-0 overflow-hidden opacity-100 transition-[max-height,opacity,transform] duration-500 motion-reduce:transition-none">
          <div class="overflow-hidden rounded-lg border border-[#cfd5cf] bg-white">
            <div class="flex items-center justify-between gap-4 border-b border-[#d5d7cf] bg-white px-4 py-3">
              <div class="flex items-center gap-2">
                <svg class="size-4 text-[#426b67]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.8"/>
                  <path d="m4 16 5-5 4 4 2-2 5 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor"/>
                </svg>
                <span id="scene-title" class="text-sm font-medium text-[#42615f]">Busy kitchen</span>
              </div>
              <span class="text-xs text-[#72807e]">Scene rotates between attempts</span>
            </div>
            <img id="scene-image" src="" alt="" width="1536" height="1024" class="aspect-3/2 w-full bg-[#f8f7f2] object-contain" />
            <div class="flex items-start gap-3 border-t border-[#d5d7cf] bg-white px-4 py-3 text-sm leading-6 text-[#536563]">
              <svg class="mt-0.5 size-5 shrink-0 text-[#497a72]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
                <path d="M12 11v5M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              This picture stays fixed for the current attempt. A different picture appears when you start another exercise.
            </div>
          </div>
        </div>

        <aside id="exercise-panel" class="min-w-0 w-full max-w-none justify-self-stretch overflow-hidden rounded-lg border border-[#cfd8d2] bg-white transition-[width,max-width] duration-500 motion-reduce:transition-none">
          <div class="border-b border-[#e0e5e1] px-6 py-5 sm:px-7">
            <div class="mb-2 flex items-center gap-2 text-xs font-medium text-[#4c766f]">
              <span class="size-1.5 rounded-full bg-[#4e8e82]"></span>
              <span id="panel-step">Step 1 of 3</span>
            </div>
            <h2 id="panel-title" class="text-xl font-semibold text-[#183738]">Study the picture</h2>
            <p id="panel-description" class="mt-2 text-sm leading-6 text-[#687775]">Take a moment to notice the whole scene before recording.</p>
          </div>

          <div class="min-h-92.5 px-6 py-7 sm:px-7">
            <div id="idle-panel" class="flex flex-col items-center text-center">
              <button id="start-calibration" type="button" class="group grid size-20 place-items-center rounded-full border border-[#9dbab3] bg-[#eef5f2] text-[#1f645e] transition hover:bg-[#e1eeea] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#2b746d] active:scale-95" aria-label="Continue to microphone setup">
                <span class="grid size-12 place-items-center rounded-full bg-[#315f5a] text-white transition group-hover:bg-[#264f4b]">
                  <svg class="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="8" y="3" width="8" height="12" rx="4" stroke="currentColor" stroke-width="2"/>
                    <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </span>
              </button>
              <p class="mt-6 text-lg font-bold text-[#244443]">Ready to describe it?</p>
              <p class="mt-2 max-w-xs text-sm leading-6 text-[#6b7977]">Continue to a quick microphone warm-up. Recording will not begin yet.</p>
            </div>

            <div id="requesting-panel" class="hidden flex-col items-center py-8 text-center">
              <div class="grid size-20 animate-pulse place-items-center rounded-full bg-[#e4efeb] text-[#286a63]">
                <svg class="size-8" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="3" width="8" height="12" rx="4" stroke="currentColor" stroke-width="2"/><path d="M5 11a7 7 0 0 0 14 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </div>
              <p class="mt-6 text-lg font-bold text-[#244443]">Allow microphone access</p>
              <p class="mt-2 max-w-xs text-sm leading-6 text-[#6b7977]">Check your browser's permission prompt to continue.</p>
              <div id="permission-help" class="mt-5 hidden max-w-xs border-y border-[#d8e1dc] py-3 text-xs leading-5 text-[#667572]">
                <p class="font-semibold text-[#405a56]">Still waiting for the browser.</p>
                <p class="mt-1">If no prompt is visible, check the address bar microphone icon or site settings, then try again.</p>
              </div>
              <button id="cancel-permission" type="button" class="mt-5 rounded-lg px-4 py-2 text-xs font-bold text-[#657572] hover:bg-[#f0f4f1]">Cancel and try again</button>
            </div>

            <div id="calibrating-panel" class="hidden flex-col items-center text-center">
              <span class="grid size-16 place-items-center rounded-full bg-[#e4efeb] text-[#286a63]">
                <svg class="size-7" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="3" width="8" height="12" rx="4" stroke="currentColor" stroke-width="2"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </span>
              <p class="mt-5 text-xs font-medium text-[#4c766f]">Quick warm-up</p>
              <p class="mt-2 text-3xl font-semibold text-[#183738]">Say "Hello."</p>
              <div class="mt-6 flex h-9 items-center gap-1.5 text-[#4d8c82]" aria-hidden="true">
                <span class="h-3 w-1.5 animate-pulse rounded-full bg-current"></span>
                <span class="h-7 w-1.5 animate-pulse rounded-full bg-current"></span>
                <span class="h-5 w-1.5 animate-pulse rounded-full bg-current"></span>
                <span class="h-9 w-1.5 animate-pulse rounded-full bg-current"></span>
                <span class="h-6 w-1.5 animate-pulse rounded-full bg-current"></span>
                <span class="h-4 w-1.5 animate-pulse rounded-full bg-current"></span>
                <span class="h-8 w-1.5 animate-pulse rounded-full bg-current"></span>
                <span class="h-3 w-1.5 animate-pulse rounded-full bg-current"></span>
              </div>
              <p class="mt-5 max-w-xs text-sm leading-6 text-[#6b7977]">This gets you into the flow. The warm-up is not recorded or analyzed.</p>
              <button id="begin-recording" type="button" class="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#216869] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#195d58] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#216869]">Start description</button>
              <button id="cancel-calibration" type="button" class="mt-2 rounded-lg px-4 py-2 text-xs font-bold text-[#657572] hover:bg-[#f0f4f1]">Cancel</button>
            </div>

            <div id="recording-panel" class="hidden flex-col items-center text-center">
              <div class="flex items-center gap-2 text-xs font-semibold text-[#a53b2f]">
                <span class="size-2 animate-pulse rounded-full bg-[#c6493b]"></span>Recording
              </div>
              <div id="recording-timer" class="mt-5 font-mono text-5xl font-semibold tracking-[-0.04em] text-[#183738]" aria-label="Recording duration">00:00</div>
              <div class="mt-3 flex items-center gap-2 rounded-full bg-[#edf5f2] px-3 py-1.5 text-xs font-bold text-[#3f716a]">
                <svg class="size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                Recommended: 30-60 seconds
              </div>
              <p class="mt-6 text-sm font-bold text-[#284746]">Describe everything happening in the picture.</p>
              <p id="recording-guidance" class="mt-2 text-sm leading-6 text-[#6b7977]" aria-live="polite">Start with the main action, then add details.</p>
              <button id="stop-recording" type="button" class="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#a43e33] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#8f332a] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#a43e33] disabled:cursor-wait disabled:opacity-60">
                <span class="size-3 rounded-sm bg-white" aria-hidden="true"></span>Stop recording
              </button>
            </div>

            <div id="completed-panel" class="hidden flex-col">
              <div class="flex items-center gap-3">
                <span class="grid size-11 shrink-0 place-items-center rounded-full bg-[#dff0e9] text-[#267064]">
                  <svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
                </span>
                <div>
                  <p class="font-bold text-[#244443]">Recording complete</p>
                  <p id="completed-duration" class="mt-0.5 text-sm text-[#6b7977]">Duration: 00:00</p>
                </div>
              </div>
              <div class="mt-6 border-y border-[#dce3df] py-3">
                <audio id="recording-playback" class="w-full" controls preload="metadata"></audio>
              </div>

              <div class="mt-6 border-t border-[#d6dfda] pt-5">
                <div id="analysis-ready">
                  <p class="text-sm font-semibold text-[#244443]">Run the experimental model?</p>
                  <p class="mt-1 text-xs leading-5 text-[#667572]">Optional. Compares acoustic patterns with two ADReSSo research classes. The 91 MB model runs locally.</p>
                  <label class="mt-4 flex cursor-pointer items-start gap-2.5 border-l-2 border-[#b8c9c4] pl-3 text-xs leading-5 text-[#5f6f6c]">
                    <input id="analysis-consent" type="checkbox" class="mt-0.5 size-4 shrink-0 accent-[#216869]">
                    <span>I understand this experimental model cannot detect or diagnose Alzheimer's disease.</span>
                  </label>
                  <button id="analyze-recording" type="button" disabled class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#315f5a] px-4 py-3 text-sm font-semibold text-white hover:bg-[#264f4b] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#216869] disabled:cursor-not-allowed disabled:opacity-40">
                    <svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13h3l1.5-5 3 10 2.7-13 2.5 11 1.3-5 1 2h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                    Run on-device analysis
                  </button>
                  <p class="mt-2 text-center text-[11px] leading-4 text-[#7b8784]">10-90 seconds of clear speech works best.</p>
                </div>

                <div id="analysis-loading" class="hidden py-3 text-center" role="status" aria-live="polite">
                  <span class="mx-auto grid size-11 animate-pulse place-items-center rounded-full bg-[#dfece7] text-[#286a63]">
                    <svg class="size-5 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.3-5.7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                  </span>
                  <p id="analysis-loading-title" class="mt-3 text-sm font-bold text-[#244443]">Preparing your recording...</p>
                  <p id="analysis-loading-detail" class="mt-1 text-xs text-[#697875]">Audio remains on this device</p>
                  <div class="mt-4 h-2 overflow-hidden rounded-full bg-[#dce5e1]" role="progressbar" aria-label="Analysis progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="analysis-progressbar">
                    <div id="analysis-progress" class="h-full rounded-full bg-[#397a72] transition-[width] duration-300 motion-reduce:transition-none" style="width: 0%"></div>
                  </div>
                  <p id="analysis-progress-label" class="mt-2 text-[11px] font-bold text-[#61736f]">0%</p>
                </div>

                <div id="analysis-result" class="hidden">
                  <div id="result-graphic" class="mb-4 overflow-hidden border-y border-[#e2ded2] bg-[#f8f7f3] p-4 text-[#847447]" aria-hidden="true"></div>
                  <p class="text-xs font-medium text-[#6e795e]">Experimental class comparison</p>
                  <p id="analysis-result-title" class="mt-1 text-base font-bold text-[#3e493f]">No clear class match</p>
                  <div class="mt-4 space-y-3">
                    <div>
                      <div class="mb-1 flex justify-between gap-3 text-[11px] font-semibold text-[#63716e]"><span>Research control class</span><span id="control-score">0%</span></div>
                      <div class="h-2 overflow-hidden rounded-full bg-[#e0e5e2]"><div id="control-bar" class="h-full rounded-full bg-[#5b8c83] transition-[width] duration-500" style="width: 0%"></div></div>
                    </div>
                    <div>
                      <div class="mb-1 flex justify-between gap-3 text-[11px] font-semibold text-[#63716e]"><span>Alzheimer's research class</span><span id="ad-score">0%</span></div>
                      <div class="h-2 overflow-hidden rounded-full bg-[#e0e5e2]"><div id="ad-bar" class="h-full rounded-full bg-[#a77d58] transition-[width] duration-500" style="width: 0%"></div></div>
                    </div>
                  </div>
                  <div class="mt-4 border-l-2 border-[#b8c9c4] pl-3">
                    <p class="text-xs font-bold text-[#4f5f5b]">What does a control-like score mean?</p>
                    <p class="mt-1 text-[11px] leading-5 text-[#697572]">A higher control score means closer to this model's research group without dementia. The source publishes no validated "typical healthy" range or normal score.</p>
                  </div>
                  <p class="mt-4 border-y border-[#e2ded2] py-3 text-[11px] leading-5 text-[#756443]">These percentages are class similarity outputs, not your chance of disease and not a diagnosis. Results from different pictures are not directly comparable.</p>

                  <div class="mt-4 grid grid-cols-2 gap-2">
                    <button id="share-result" type="button" class="rounded-md border border-[#bdd0ca] bg-white px-3 py-2.5 text-xs font-semibold text-[#346c66] hover:bg-[#f3f6f5]">Share result</button>
                    <button id="share-app-result" type="button" class="rounded-md border border-[#bdd0ca] bg-white px-3 py-2.5 text-xs font-semibold text-[#346c66] hover:bg-[#f3f6f5]">Share app</button>
                  </div>
                  <p id="share-feedback" class="mt-2 min-h-4 text-center text-[11px] text-[#647571]" aria-live="polite"></p>

                  <div class="mt-4 border-t border-[#d8e1dc] pt-4">
                    <p class="text-xs font-semibold text-[#405a56]">Optional research sharing</p>
                    <label class="mt-2 flex cursor-pointer items-start gap-2.5 border-l-2 border-[#b8c9c4] pl-3 text-[11px] leading-5 text-[#5f6f6c]">
                      <input id="research-consent" type="checkbox" class="mt-0.5 size-4 shrink-0 accent-[#216869]">
                      <span>Share my results for scientific research. No audio, transcript, or identifiers are included.</span>
                    </label>
                    <fieldset class="mt-3 grid gap-3 border-y border-[#e0e7e3] py-3">
                      <legend class="sr-only">Optional speaker survey</legend>
                      <p class="text-[11px] font-semibold text-[#405a56]">Optional speaker survey</p>
                      <label class="grid gap-1 text-[11px] leading-5 text-[#5f6f6c]">
                        <span>Speaker age</span>
                        <input id="research-age" type="number" inputmode="numeric" min="0" max="120" class="rounded-md border border-[#c8d6d1] bg-white px-3 py-2 text-sm text-[#253f3d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315f5a]" placeholder="Optional">
                      </label>
                      <label class="grid gap-1 text-[11px] leading-5 text-[#5f6f6c]">
                        <span>Speaker gender</span>
                        <input id="research-gender" type="text" maxlength="80" class="rounded-md border border-[#c8d6d1] bg-white px-3 py-2 text-sm text-[#253f3d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315f5a]" placeholder="Optional">
                      </label>
                    </fieldset>
                    <button id="submit-research" type="button" disabled class="mt-3 w-full rounded-md border border-[#8ca9a2] bg-white px-3 py-2.5 text-xs font-semibold text-[#315f5a] disabled:cursor-not-allowed disabled:opacity-40">Submit result</button>
                    <p id="research-status" class="mt-2 text-[11px] leading-5 text-[#647571]" aria-live="polite">Results are sent only if you opt in.</p>
                  </div>

                  <button id="reanalyze-recording" type="button" class="mt-3 w-full rounded-lg py-2 text-xs font-bold text-[#346c66] hover:bg-[#e8f1ed]">Run analysis again</button>
                </div>

                <div id="analysis-error" class="hidden py-2 text-center">
                  <p class="text-sm font-bold text-[#774b45]">Analysis unavailable</p>
                  <p id="analysis-error-message" class="mt-1 text-xs leading-5 text-[#796965]">The model could not process this recording.</p>
                  <button id="retry-analysis" type="button" class="mt-3 rounded-lg px-4 py-2 text-xs font-bold text-[#346c66] hover:bg-[#e8f1ed]">Try again</button>
                </div>
              </div>

              <a id="download-recording" class="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#315f5a] px-5 py-3 text-sm font-semibold text-white hover:bg-[#264f4b]" href="#">
                <svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                Download recording
              </a>
              <div class="mt-3 grid grid-cols-2 gap-3">
                <button id="try-another-picture" type="button" class="rounded-md border border-[#bdd0ca] bg-white px-3 py-3 text-sm font-semibold text-[#275d58] hover:bg-[#f3f6f5]">Try another picture</button>
                <button id="delete-recording" type="button" class="rounded-md border border-[#e0d8d3] bg-white px-3 py-3 text-sm font-semibold text-[#80534d] hover:bg-[#fbf4f2]">Delete</button>
              </div>
            </div>

            <div id="error-panel" class="hidden flex-col items-center py-4 text-center">
              <span class="grid size-16 place-items-center rounded-full bg-[#f6e9e6] text-[#9a5148]">
                <svg class="size-7" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 8v5m0 3h.01M10.3 4.4 2.9 17a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              </span>
              <p class="mt-5 text-lg font-bold text-[#563c39]">Couldn't start recording</p>
              <p id="error-message" class="mt-2 max-w-xs text-sm leading-6 text-[#766865]">Check microphone permissions and try again.</p>
              <button id="retry-recording" type="button" class="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#216869] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#195d58]">Try again</button>
            </div>

            <div id="unsupported-panel" class="hidden flex-col items-center py-4 text-center">
              <p class="text-lg font-bold text-[#46514e]">Recording isn't supported</p>
              <p class="mt-2 max-w-xs text-sm leading-6 text-[#6b7977]">Open this page in a current version of Chrome, Edge, Firefox, or Safari.</p>
            </div>
          </div>

          <div class="border-t border-[#e0e5e1] bg-[#f8faf8] px-6 py-4 sm:px-7">
            <div id="recorder-status" class="flex items-center gap-2 text-xs font-medium text-[#6b7977]" role="status" aria-live="polite">
              <span class="size-1.5 rounded-full bg-[#87a39d]"></span>
              Microphone inactive
            </div>
          </div>
        </aside>
      </section>

      <section class="mt-8 border-t border-[#d9ddda] pt-5">
        <h2 class="font-semibold text-[#4c493b]">Not a medical test</h2>
        <p class="mt-1 max-w-4xl text-sm leading-6 text-[#6f6b5e]">This can help families organize observations before seeking professional advice. Neither the exercise nor its optional output can diagnose Alzheimer's disease, dementia, mild cognitive impairment, or any condition. <a class="font-semibold text-[#526f68] underline underline-offset-4" href="${publicAssetUrl('science.html')}">Read the method, evidence, privacy details, and limitations.</a></p>
      </section>

      <section class="mt-8 border-t border-[#d9ddda] pt-5">
        <h2 class="font-semibold text-[#4c493b]">Common questions</h2>
        <div class="mt-3 divide-y divide-[#d9ddda] border-y border-[#d9ddda] text-sm leading-6">
          <details class="py-3">
            <summary class="cursor-pointer font-medium text-[#293f3d]">Can this screen for Alzheimer's disease?</summary>
            <p class="mt-2 text-[#6f6b5e]">It is a screening helper for family reflection, not a clinical Alzheimer's screening test. It cannot diagnose Alzheimer's disease or dementia.</p>
          </details>
          <details class="py-3">
            <summary class="cursor-pointer font-medium text-[#293f3d]">What does risk-class comparison mean?</summary>
            <p class="mt-2 text-[#6f6b5e]">The optional model compares speech with two research classes. It is not a medical risk score, disease probability, or clinical classification.</p>
          </details>
          <details class="py-3">
            <summary class="cursor-pointer font-medium text-[#293f3d]">What should families do with concerns?</summary>
            <p class="mt-2 text-[#6f6b5e]">Use observations as notes for a healthcare professional, especially if memory, language, behavior, or daily function has changed.</p>
          </details>
        </div>
      </section>
    </div>

    <footer class="border-t border-[#d9ddd6]">
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs leading-5 text-[#71807d] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>Audio stays on this device. Opted-in research summaries may include optional age and gender survey answers, but never audio or transcript.</p>
        <div class="flex gap-4">
          <a class="font-medium underline underline-offset-4 hover:text-[#315f5a]" href="${publicAssetUrl('science.html')}">Method & limitations</a>
          <a class="font-medium underline underline-offset-4 hover:text-[#315f5a]" href="${publicAssetUrl('about.html')}">About me</a>
        </div>
      </div>
    </footer>
  </main>
`

const isRecordingSupported = typeof MediaRecorder !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia)
const pictureDeck = loadPictureDeck()
let currentState: RecorderState = isRecordingSupported ? 'idle' : 'unsupported'
let mediaRecorder: MediaRecorder | null = null
let mediaStream: MediaStream | null = null
let audioChunks: BlobPart[] = []
let audioUrl: string | null = null
let recordedAudioBlob: Blob | null = null
let recordingStartedAt = 0
let recordedDuration = 0
let timerId: number | undefined
let permissionHelpTimer: number | undefined
let permissionTimeoutTimer: number | undefined
let microphoneRequestId = 0
let recorderFailed = false
let modelWorker: Worker | null = null
let analysisInProgress = false
let analysisProgressValue = 0
let inferenceProgressTimer: number | undefined
let resultRenderTimer: number | undefined
let currentResult: AnalysisResult | null = null

const panels: Record<RecorderState, HTMLElement> = {
  idle: getElement('idle-panel'),
  requesting: getElement('requesting-panel'),
  calibrating: getElement('calibrating-panel'),
  recording: getElement('recording-panel'),
  completed: getElement('completed-panel'),
  error: getElement('error-panel'),
  unsupported: getElement('unsupported-panel'),
}

const workspace = getElement('workspace')
const scenePanel = getElement('scene-panel')
const exercisePanel = getElement('exercise-panel')
const sceneTitle = getElement('scene-title')
const sceneImage = getElement<HTMLImageElement>('scene-image')
const panelStep = getElement('panel-step')
const panelTitle = getElement('panel-title')
const panelDescription = getElement('panel-description')
const startCalibrationButton = getElement<HTMLButtonElement>('start-calibration')
const beginRecordingButton = getElement<HTMLButtonElement>('begin-recording')
const cancelPermissionButton = getElement<HTMLButtonElement>('cancel-permission')
const cancelCalibrationButton = getElement<HTMLButtonElement>('cancel-calibration')
const permissionHelp = getElement('permission-help')
const stopButton = getElement<HTMLButtonElement>('stop-recording')
const retryButton = getElement<HTMLButtonElement>('retry-recording')
const tryAnotherPictureButton = getElement<HTMLButtonElement>('try-another-picture')
const deleteButton = getElement<HTMLButtonElement>('delete-recording')
const timerElement = getElement('recording-timer')
const recordingGuidance = getElement('recording-guidance')
const durationElement = getElement('completed-duration')
const errorElement = getElement('error-message')
const statusElement = getElement('recorder-status')
const audioElement = getElement<HTMLAudioElement>('recording-playback')
const downloadLink = getElement<HTMLAnchorElement>('download-recording')
const analysisConsent = getElement<HTMLInputElement>('analysis-consent')
const analyzeButton = getElement<HTMLButtonElement>('analyze-recording')
const reanalyzeButton = getElement<HTMLButtonElement>('reanalyze-recording')
const retryAnalysisButton = getElement<HTMLButtonElement>('retry-analysis')
const analysisReady = getElement('analysis-ready')
const analysisLoading = getElement('analysis-loading')
const analysisResult = getElement('analysis-result')
const analysisError = getElement('analysis-error')
const analysisLoadingTitle = getElement('analysis-loading-title')
const analysisLoadingDetail = getElement('analysis-loading-detail')
const analysisProgress = getElement('analysis-progress')
const analysisProgressbar = getElement('analysis-progressbar')
const analysisProgressLabel = getElement('analysis-progress-label')
const analysisResultTitle = getElement('analysis-result-title')
const analysisErrorMessage = getElement('analysis-error-message')
const resultGraphic = getElement('result-graphic')
const controlScoreElement = getElement('control-score')
const adScoreElement = getElement('ad-score')
const controlBar = getElement('control-bar')
const adBar = getElement('ad-bar')
const shareAppNavButton = getElement<HTMLButtonElement>('share-app-nav')
const shareAppResultButton = getElement<HTMLButtonElement>('share-app-result')
const shareResultButton = getElement<HTMLButtonElement>('share-result')
const shareFeedback = getElement('share-feedback')
const researchConsent = getElement<HTMLInputElement>('research-consent')
const researchAgeInput = getElement<HTMLInputElement>('research-age')
const researchGenderInput = getElement<HTMLInputElement>('research-gender')
const submitResearchButton = getElement<HTMLButtonElement>('submit-research')
const researchStatus = getElement('research-status')

renderCurrentScene()
setState(currentState)

startCalibrationButton.addEventListener('click', startCalibration)
beginRecordingButton.addEventListener('click', beginRecording)
cancelPermissionButton.addEventListener('click', cancelCalibration)
cancelCalibrationButton.addEventListener('click', cancelCalibration)
stopButton.addEventListener('click', stopRecording)
retryButton.addEventListener('click', startCalibration)
tryAnotherPictureButton.addEventListener('click', showNextPicture)
deleteButton.addEventListener('click', deleteRecording)
analysisConsent.addEventListener('change', () => {
  analyzeButton.disabled = !analysisConsent.checked
})
analyzeButton.addEventListener('click', analyzeRecording)
reanalyzeButton.addEventListener('click', analyzeRecording)
retryAnalysisButton.addEventListener('click', analyzeRecording)
shareAppNavButton.addEventListener('click', shareApp)
shareAppResultButton.addEventListener('click', shareApp)
shareResultButton.addEventListener('click', shareResult)
researchConsent.addEventListener('change', () => {
  submitResearchButton.disabled = !researchConsent.checked
})
submitResearchButton.addEventListener('click', submitResearchPreference)

function getElement<T extends HTMLElement = HTMLElement>(id: string): T {
  const element = document.getElementById(id)
  if (!element) throw new Error(`Missing required element: #${id}`)
  return element as T
}

function setState(nextState: RecorderState, errorMessage?: string): void {
  currentState = nextState

  Object.entries(panels).forEach(([state, panel]) => {
    const isActive = state === nextState
    panel.classList.toggle('hidden', !isActive)
    panel.classList.toggle('flex', isActive)
  })

  const activeStep = getExerciseStep(nextState)
  renderStepIndicator(activeStep)
  renderPanelHeading(activeStep)
  renderReviewLayout(nextState === 'completed')

  const statuses: Record<RecorderState, string> = {
    idle: 'Microphone inactive',
    requesting: 'Waiting for microphone permission',
    calibrating: 'Microphone ready; warm-up is not recorded',
    recording: 'Recording in progress',
    completed: 'Recording saved in this browser',
    error: 'Microphone unavailable',
    unsupported: 'Recording not supported by this browser',
  }

  statusElement.innerHTML = `
    <span class="size-1.5 ${nextState === 'recording' ? 'animate-pulse rounded-full bg-[#c6493b]' : 'rounded-full bg-[#87a39d]'}"></span>
    ${statuses[nextState]}
  `

  if (errorMessage) errorElement.textContent = errorMessage
}

function getExerciseStep(state: RecorderState): 1 | 2 | 3 {
  if (state === 'completed') return 3
  if (state === 'idle' || state === 'unsupported') return 1
  return 2
}

function renderStepIndicator(activeStep: 1 | 2 | 3): void {
  document.querySelectorAll<HTMLElement>('.step-card').forEach((card) => {
    const step = Number(card.dataset.step)
    const badge = card.querySelector<HTMLElement>('.step-badge')
    const isComplete = step < activeStep
    const isActive = step === activeStep

    card.setAttribute('aria-current', isActive ? 'step' : 'false')
    card.className = `step-card flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-500 motion-reduce:transition-none ${
      isActive
        ? '-translate-y-0.5 border-[#315f5a] bg-white text-[#284746]'
        : isComplete
          ? 'border-[#9fb8b1] bg-white text-[#315f5a]'
          : 'border-[#d8ddd7] bg-[#fbfbf9] text-[#657572]'
    }`

    if (badge) {
      badge.textContent = isComplete ? '✓' : String(step)
      badge.className = `step-badge grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-500 motion-reduce:transition-none ${
        isActive
          ? 'scale-105 bg-[#315f5a] text-white ring-2 ring-[#dbe9e4]'
          : isComplete
            ? 'bg-[#4f8279] text-white'
            : 'bg-[#dceae5] text-[#285b57]'
      }`
    }
  })
}

function renderPanelHeading(activeStep: 1 | 2 | 3): void {
  const headings: Record<1 | 2 | 3, [string, string]> = {
    1: ['Study the picture', 'Take a moment to notice the whole scene before recording.'],
    2: ['Record your description', 'Speak naturally. Your warm-up is excluded from the recording.'],
    3: ['Review your recording', 'Listen back, save it, or run the optional local analysis.'],
  }

  panelStep.textContent = `Step ${activeStep} of 3`
  panelTitle.textContent = headings[activeStep][0]
  panelDescription.textContent = headings[activeStep][1]
}

function renderReviewLayout(isReviewing: boolean): void {
  workspace.className = isReviewing
    ? 'grid items-start gap-0 transition-[grid-template-columns,gap] duration-500 motion-reduce:transition-none lg:grid-cols-[minmax(0,0fr)_minmax(0,1fr)]'
    : 'grid items-start gap-6 transition-[grid-template-columns,gap] duration-500 motion-reduce:transition-none lg:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.75fr)] lg:gap-8'
  scenePanel.className = isReviewing
    ? 'pointer-events-none min-w-0 max-h-0 -translate-y-3 overflow-hidden opacity-0 transition-[max-height,opacity,transform] duration-500 motion-reduce:transition-none'
    : 'min-w-0 max-h-[1200px] translate-y-0 overflow-hidden opacity-100 transition-[max-height,opacity,transform] duration-500 motion-reduce:transition-none'
  exercisePanel.className = isReviewing
    ? 'min-w-0 w-full max-w-4xl justify-self-center overflow-hidden rounded-lg border border-[#cfd8d2] bg-white transition-[width,max-width] duration-500 motion-reduce:transition-none'
    : 'min-w-0 w-full max-w-none justify-self-stretch overflow-hidden rounded-lg border border-[#cfd8d2] bg-white transition-[width,max-width] duration-500 motion-reduce:transition-none'
}

function renderCurrentScene(): void {
  const scene = getCurrentScene()
  sceneTitle.textContent = scene.title
  sceneImage.src = scene.src
  sceneImage.alt = scene.alt
}

function getCurrentScene(): PictureScene {
  return scenes.find(({ id }) => id === pictureDeck.currentId) ?? scenes[0]
}

function loadPictureDeck(): PictureDeckState {
  try {
    const parsed = JSON.parse(sessionStorage.getItem('mindful-check-picture-deck-v1') ?? '') as PictureDeckState
    const allIds = [parsed.currentId, ...parsed.remainingIds]
    const isValid =
      sceneIds.includes(parsed.currentId) &&
      parsed.remainingIds.every((id) => sceneIds.includes(id)) &&
      new Set(allIds).size === allIds.length
    if (isValid) return parsed
  } catch {
    // Session storage is optional.
  }

  const deck = createPictureDeck(sceneIds)
  persistPictureDeck(deck)
  return deck
}

function persistPictureDeck(deck: PictureDeckState): void {
  try {
    sessionStorage.setItem('mindful-check-picture-deck-v1', JSON.stringify(deck))
  } catch {
    // In-memory deck still works.
  }
}

function createPictureDeck(ids: readonly string[]): PictureDeckState {
  const shuffled = shuffle(ids)
  return { currentId: shuffled[0], remainingIds: shuffled.slice(1) }
}

function advancePictureDeck(deck: PictureDeckState, ids: readonly string[]): PictureDeckState {
  if (deck.remainingIds.length > 0) {
    return { currentId: deck.remainingIds[0], remainingIds: deck.remainingIds.slice(1) }
  }

  const nextCycle = shuffle(ids)
  if (nextCycle.length > 1 && nextCycle[0] === deck.currentId) {
    ;[nextCycle[0], nextCycle[1]] = [nextCycle[1], nextCycle[0]]
  }
  return { currentId: nextCycle[0], remainingIds: nextCycle.slice(1) }
}

function shuffle<T>(items: readonly T[]): T[] {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
  return shuffled
}

async function startCalibration(): Promise<void> {
  if (!isRecordingSupported || ['requesting', 'calibrating', 'recording'].includes(currentState)) return

  resetAudio()
  setState('requesting')
  const requestId = beginMicrophoneRequest()

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    })
    if (requestId !== microphoneRequestId) {
      stream.getTracks().forEach((track) => track.stop())
      return
    }

    clearMicrophoneRequestTimers()
    permissionHelp.classList.add('hidden')
    mediaStream = stream
    setState('calibrating')
  } catch (error) {
    if (requestId !== microphoneRequestId) return

    clearMicrophoneRequestTimers()
    permissionHelp.classList.add('hidden')
    releaseMicrophone()
    setState('error', getMicrophoneErrorMessage(error))
  }
}

function beginRecording(): void {
  if (!mediaStream || currentState !== 'calibrating') return

  try {
    clearMicrophoneRequestTimers()
    const mimeType = chooseMimeType()
    mediaRecorder = mimeType ? new MediaRecorder(mediaStream, { mimeType }) : new MediaRecorder(mediaStream)
    audioChunks = []
    recorderFailed = false

    mediaRecorder.addEventListener('dataavailable', (event) => {
      if (event.data.size > 0) audioChunks.push(event.data)
    })
    mediaRecorder.addEventListener('error', () => {
      recorderFailed = true
      stopTimer()
      releaseMicrophone()
      setState('error', 'The browser could not continue recording. Check your microphone and try again.')
    }, { once: true })
    mediaRecorder.addEventListener('stop', finalizeRecording, { once: true })
    mediaRecorder.start(250)

    recordingStartedAt = Date.now()
    recordedDuration = 0
    updateTimer()
    timerId = window.setInterval(updateTimer, 250)
    setState('recording')
  } catch {
    releaseMicrophone()
    setState('error', 'The browser could not start audio capture. Check your microphone and try again.')
  }
}

function cancelCalibration(): void {
  cancelPendingMicrophoneRequest()
  releaseMicrophone()
  setState('idle')
}

function stopRecording(): void {
  if (!mediaRecorder || mediaRecorder.state !== 'recording') return

  stopButton.disabled = true
  recordedDuration = Date.now() - recordingStartedAt
  stopTimer()
  mediaRecorder.stop()
}

function finalizeRecording(): void {
  stopButton.disabled = false
  releaseMicrophone()
  if (recorderFailed) return

  if (audioChunks.length === 0) {
    setState('error', 'No audio was captured. Check your microphone and try again.')
    return
  }

  const mimeType = mediaRecorder?.mimeType || 'audio/webm'
  const audioBlob = new Blob(audioChunks, { type: mimeType })
  recordedAudioBlob = audioBlob
  audioUrl = URL.createObjectURL(audioBlob)
  audioElement.src = audioUrl
  downloadLink.href = audioUrl
  downloadLink.download = `picture-description-${formatDownloadTimestamp()}.${getFileExtension(mimeType)}`
  durationElement.textContent = `Duration: ${formatDuration(recordedDuration)}`
  mediaRecorder = null
  audioChunks = []
  setState('completed')
}

function showNextPicture(): void {
  resetAudio()
  resetRecordingDisplay()
  const nextDeck = advancePictureDeck(pictureDeck, sceneIds)
  pictureDeck.currentId = nextDeck.currentId
  pictureDeck.remainingIds = nextDeck.remainingIds
  persistPictureDeck(pictureDeck)
  renderCurrentScene()
  setState('idle')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function deleteRecording(): void {
  resetAudio()
  resetRecordingDisplay()
  setState('idle')
  startCalibrationButton.focus()
}

function chooseMimeType(): string {
  const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus']
  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) ?? ''
}

function updateTimer(): void {
  recordedDuration = Date.now() - recordingStartedAt
  timerElement.textContent = formatDuration(recordedDuration)
  recordingGuidance.textContent = getRecordingGuidance(Math.floor(recordedDuration / 1000))
}

function stopTimer(): void {
  if (timerId !== undefined) {
    window.clearInterval(timerId)
    timerId = undefined
  }
}

function beginMicrophoneRequest(): number {
  const requestId = microphoneRequestId + 1
  microphoneRequestId = requestId
  clearMicrophoneRequestTimers()
  permissionHelp.classList.add('hidden')

  permissionHelpTimer = window.setTimeout(() => {
    if (requestId === microphoneRequestId && currentState === 'requesting') {
      permissionHelp.classList.remove('hidden')
    }
  }, 4_000)

  permissionTimeoutTimer = window.setTimeout(() => {
    if (requestId !== microphoneRequestId || currentState !== 'requesting') return

    microphoneRequestId += 1
    clearMicrophoneRequestTimers()
    permissionHelp.classList.add('hidden')
    setState('error', 'The browser did not finish microphone permission. Check the address bar microphone icon or site settings, then try again.')
  }, 20_000)

  return requestId
}

function cancelPendingMicrophoneRequest(): void {
  microphoneRequestId += 1
  clearMicrophoneRequestTimers()
  permissionHelp.classList.add('hidden')
}

function clearMicrophoneRequestTimers(): void {
  if (permissionHelpTimer !== undefined) {
    window.clearTimeout(permissionHelpTimer)
    permissionHelpTimer = undefined
  }
  if (permissionTimeoutTimer !== undefined) {
    window.clearTimeout(permissionTimeoutTimer)
    permissionTimeoutTimer = undefined
  }
}

function releaseMicrophone(): void {
  mediaStream?.getTracks().forEach((track) => track.stop())
  mediaStream = null
}

function resetAudio(): void {
  resetAnalysis()
  audioElement.pause()
  audioElement.removeAttribute('src')
  audioElement.load()

  if (audioUrl) {
    URL.revokeObjectURL(audioUrl)
    audioUrl = null
  }

  downloadLink.removeAttribute('href')
  downloadLink.removeAttribute('download')
  recordedAudioBlob = null
  audioChunks = []
}

function resetRecordingDisplay(): void {
  recordedDuration = 0
  timerElement.textContent = '00:00'
  recordingGuidance.textContent = getRecordingGuidance(0)
}

async function analyzeRecording(): Promise<void> {
  if (!recordedAudioBlob || analysisInProgress) return

  resetResearchSharing()
  analysisInProgress = true
  currentResult = null
  showAnalysisPanel('loading')
  setAnalysisProgress(0, true)
  analysisLoadingTitle.textContent = 'Preparing your recording...'
  analysisLoadingDetail.textContent = 'Audio remains on this device'

  try {
    setAnalysisProgress(4)
    const waveform = await decodeRecording(recordedAudioBlob)
    setAnalysisProgress(10)
    const worker = getModelWorker()
    worker.postMessage({ type: 'analyze', audio: waveform }, [waveform.buffer])
  } catch (error) {
    showAnalysisError(getAnalysisErrorMessage(error))
  }
}

function getModelWorker(): Worker {
  if (modelWorker) return modelWorker

  modelWorker = new Worker(new URL('./worker/model.worker.ts', import.meta.url), { type: 'module' })
  modelWorker.addEventListener('message', (event: MessageEvent<ModelWorkerMessage>) => {
    const message = event.data

    if (message.type === 'progress') {
      setAnalysisProgress(mapModelProgress(message.progress))
      analysisLoadingDetail.textContent = `Loading local model: ${message.progress}%`
      return
    }

    if (message.type === 'status') {
      if (message.status === 'loading') {
        setAnalysisProgress(12)
        analysisLoadingTitle.textContent = 'Loading research model...'
        analysisLoadingDetail.textContent = 'First use may take a moment'
      } else {
        analysisLoadingTitle.textContent = 'Analyzing speech patterns...'
        analysisLoadingDetail.textContent = 'Running locally in your browser'
        startInferenceProgress()
      }
      return
    }

    if (message.type === 'result') {
      analysisInProgress = false
      stopAnalysisProgress()
      setAnalysisProgress(100)
      resultRenderTimer = window.setTimeout(() => {
        renderAnalysisResult(message.adScore, message.controlScore)
      }, 250)
      return
    }

    console.error('Local model analysis failed:', message.message)
    showAnalysisError(formatModelError(message.message))
  })

  modelWorker.addEventListener('error', (event) => {
    console.error('Local model worker failed:', event.message)
    showAnalysisError(formatModelError(event.message))
    disposeModelWorker()
  })

  return modelWorker
}

function setAnalysisProgress(value: number, force = false): void {
  const nextValue = Math.min(100, Math.max(0, value))
  analysisProgressValue = force ? nextValue : Math.max(analysisProgressValue, nextValue)
  const roundedValue = Math.round(analysisProgressValue)
  analysisProgress.style.width = `${roundedValue}%`
  analysisProgressbar.setAttribute('aria-valuenow', String(roundedValue))
  analysisProgressLabel.textContent = `${roundedValue}%`
}

function startInferenceProgress(): void {
  stopAnalysisProgress()
  setAnalysisProgress(82)
  inferenceProgressTimer = window.setInterval(() => {
    const increment = Math.max(0.4, (95 - analysisProgressValue) * 0.08)
    setAnalysisProgress(Math.min(95, analysisProgressValue + increment))
  }, 350)
}

function stopAnalysisProgress(): void {
  if (inferenceProgressTimer !== undefined) {
    window.clearInterval(inferenceProgressTimer)
    inferenceProgressTimer = undefined
  }
  if (resultRenderTimer !== undefined) {
    window.clearTimeout(resultRenderTimer)
    resultRenderTimer = undefined
  }
}

async function decodeRecording(blob: Blob): Promise<Float32Array> {
  const audioContext = new AudioContext()

  try {
    const audioBuffer = await audioContext.decodeAudioData(await blob.arrayBuffer())
    const mono = new Float32Array(audioBuffer.length)

    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel += 1) {
      const channelData = audioBuffer.getChannelData(channel)
      for (let index = 0; index < channelData.length; index += 1) {
        mono[index] += channelData[index] / audioBuffer.numberOfChannels
      }
    }

    const resampled = resampleAudio(mono, audioBuffer.sampleRate, 16_000)
    if (resampled.length < 5 * 16_000) throw new Error('short-recording')
    return resampled.length > 90 * 16_000 ? resampled.slice(0, 90 * 16_000) : resampled
  } finally {
    await audioContext.close()
  }
}

function resampleAudio(input: Float32Array, sourceRate: number, targetRate: number): Float32Array {
  if (sourceRate === targetRate) return input

  const outputLength = Math.round(input.length * targetRate / sourceRate)
  const output = new Float32Array(outputLength)
  const ratio = sourceRate / targetRate

  for (let index = 0; index < outputLength; index += 1) {
    const sourcePosition = index * ratio
    const lowerIndex = Math.floor(sourcePosition)
    const upperIndex = Math.min(lowerIndex + 1, input.length - 1)
    const fraction = sourcePosition - lowerIndex
    output[index] = input[lowerIndex] * (1 - fraction) + input[upperIndex] * fraction
  }

  return output
}

function renderAnalysisResult(adScore: number, controlScore: number): void {
  currentResult = normalizeAnalysisResult(adScore, controlScore)
  const adPercent = Math.round(currentResult.adScore * 100)
  const controlPercent = Math.round(currentResult.controlScore * 100)

  const titles: Record<ResultBand, string> = {
    'control-like': 'More similar to the research control class',
    mixed: 'No clear class match',
    'ad-like': "More similar to the Alzheimer's research class",
  }

  analysisResultTitle.textContent = titles[currentResult.band]
  adScoreElement.textContent = `${adPercent}%`
  controlScoreElement.textContent = `${controlPercent}%`
  adBar.style.width = `${adPercent}%`
  controlBar.style.width = `${controlPercent}%`
  resultGraphic.className = getResultGraphicClass(currentResult.band)
  resultGraphic.innerHTML = getResultGraphic(currentResult.band)
  showAnalysisPanel('result')
}

function normalizeAnalysisResult(adScore: number, controlScore: number): AnalysisResult {
  const safeAdScore = Math.min(1, Math.max(0, adScore))
  const safeControlScore = Math.min(1, Math.max(0, controlScore))
  return {
    adScore: safeAdScore,
    controlScore: safeControlScore,
    band: getResultBand(safeAdScore),
  }
}

function getResultBand(adScore: number): ResultBand {
  if (adScore >= 0.65) return 'ad-like'
  if (adScore <= 0.35) return 'control-like'
  return 'mixed'
}

function getResultGraphicClass(band: ResultBand): string {
  const classes: Record<ResultBand, string> = {
    'control-like': 'mb-4 overflow-hidden border-y border-[#d8e1dc] bg-[#f5f7f6] p-4 text-[#397a72]',
    mixed: 'mb-4 overflow-hidden border-y border-[#e2ded2] bg-[#f8f7f3] p-4 text-[#847447]',
    'ad-like': 'mb-4 overflow-hidden border-y border-[#e5d9d2] bg-[#f8f5f3] p-4 text-[#986b4d]',
  }
  return classes[band]
}

function getResultGraphic(band: ResultBand): string {
  const graphics: Record<ResultBand, string> = {
    'control-like': `
      <svg class="h-24 w-full" viewBox="0 0 320 96" fill="none">
        <path d="M18 61c30-38 52 18 82-10s49-15 70 5 43 18 65-6 45-20 67-1" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
        <circle cx="44" cy="43" r="7" fill="currentColor" opacity=".3"/><circle cx="153" cy="38" r="10" fill="currentColor" opacity=".2"/><circle cx="271" cy="39" r="7" fill="currentColor" opacity=".35"/>
      </svg>`,
    mixed: `
      <svg class="h-24 w-full" viewBox="0 0 320 96" fill="none">
        <path d="M24 67c35 0 38-39 72-39s39 39 72 39 39-39 72-39 40 39 58 39" stroke="currentColor" stroke-width="5" stroke-linecap="round" opacity=".65"/>
        <path d="M24 29c35 0 38 39 72 39s39-39 72-39 39 39 72 39 40-39 58-39" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
      </svg>`,
    'ad-like': `
      <svg class="h-24 w-full" viewBox="0 0 320 96" fill="none">
        <path d="M20 56h45l12-25 18 43 20-33h35l17 18 21-36 20 51 19-29h32l14 11h27" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="77" cy="31" r="6" fill="currentColor" opacity=".25"/><circle cx="188" cy="23" r="7" fill="currentColor" opacity=".25"/><circle cx="253" cy="45" r="6" fill="currentColor" opacity=".3"/>
      </svg>`,
  }
  return graphics[band]
}

function showAnalysisPanel(panel: AnalysisPanel): void {
  analysisReady.classList.toggle('hidden', panel !== 'ready')
  analysisLoading.classList.toggle('hidden', panel !== 'loading')
  analysisResult.classList.toggle('hidden', panel !== 'result')
  analysisError.classList.toggle('hidden', panel !== 'error')
}

function showAnalysisError(message: string): void {
  analysisInProgress = false
  stopAnalysisProgress()
  analysisErrorMessage.textContent = message
  showAnalysisPanel('error')
}

function getAnalysisErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message === 'short-recording') {
    return 'Record at least five seconds of speech before running the model.'
  }
  return 'This audio format could not be processed. Record again or try another current browser.'
}

function formatModelError(message: string): string {
  const detail = message.trim().replace(/\s+/g, ' ').slice(0, 180)
  return detail
    ? `The local model could not start. Technical detail: ${detail}`
    : 'The local model could not start. Refresh the page and try again.'
}

function resetAnalysis(): void {
  analysisInProgress = false
  currentResult = null
  stopAnalysisProgress()
  analysisConsent.checked = false
  analyzeButton.disabled = true
  setAnalysisProgress(0, true)
  adBar.style.width = '0%'
  controlBar.style.width = '0%'
  adScoreElement.textContent = '0%'
  controlScoreElement.textContent = '0%'
  shareFeedback.textContent = ''
  resetResearchSharing()
  showAnalysisPanel('ready')
  disposeModelWorker()
}

function resetResearchSharing(): void {
  researchConsent.checked = false
  researchConsent.disabled = false
  researchAgeInput.value = ''
  researchAgeInput.disabled = false
  researchGenderInput.value = ''
  researchGenderInput.disabled = false
  submitResearchButton.disabled = true
  submitResearchButton.textContent = 'Submit result'
  researchStatus.textContent = 'Results are sent only if you opt in.'
}

function disposeModelWorker(): void {
  modelWorker?.terminate()
  modelWorker = null
}

async function submitResearchPreference(): Promise<void> {
  if (!currentResult || !researchConsent.checked) return

  const surveyAnswers = getOptionalResearchSurveyAnswers()
  if (!surveyAnswers) return

  submitResearchButton.disabled = true
  submitResearchButton.textContent = 'Submitting...'
  researchStatus.textContent = 'Submitting opted-in result summary...'

  const payload: ResearchSubmissionDocument = {
    schemaVersion: '1.0',
    consentVersion: '2026-06-15',
    imageId: getCurrentScene().id,
    modelId: 'giyong/wav2vec2-base_ADReSSo',
    modelRevision: '24e5428d688f83a0f7a2469871c998329f5ef2df',
    controlScore: currentResult.controlScore,
    adScore: currentResult.adScore,
    resultBand: currentResult.band,
    recordingDurationMs: recordedDuration,
    browserFamily: detectBrowserFamily(navigator.userAgent),
    submittedAt: new Date().toISOString(),
    ...surveyAnswers,
  }

  try {
    await submitResearchSubmission(payload)
    researchConsent.disabled = true
    researchAgeInput.disabled = true
    researchGenderInput.disabled = true
    submitResearchButton.disabled = true
    submitResearchButton.textContent = 'Submitted'
    researchStatus.textContent = 'Research result submitted. Thank you.'
  } catch (error) {
    console.error('Research submission failed:', error)
    submitResearchButton.disabled = !researchConsent.checked
    submitResearchButton.textContent = 'Submit result'
    researchStatus.textContent = error instanceof ResearchSubmissionConfigurationError
      ? 'Research submission is not configured in this environment.'
      : 'Could not submit. Your recording and result remain local.'
  }
}

function getOptionalResearchSurveyAnswers(): Pick<Partial<ResearchSubmissionDocument>, 'age' | 'gender'> | null {
  const ageInput = researchAgeInput.value.trim()
  const gender = researchGenderInput.value.trim()
  const answers: Pick<Partial<ResearchSubmissionDocument>, 'age' | 'gender'> = {}

  if (ageInput) {
    const age = Number(ageInput)
    if (!Number.isInteger(age) || age < 0 || age > 120) {
      researchStatus.textContent = 'Enter an age from 0 to 120, or leave age blank.'
      researchAgeInput.focus()
      return null
    }
    answers.age = age
  }

  if (gender) {
    answers.gender = gender
  }

  return answers
}

async function shareApp(): Promise<void> {
  await shareContent({
    title: "Alzheimer's screening helper for families",
    text: 'A private picture-description exercise with optional experimental speech risk-class comparison. Not diagnostic.',
    url: publicAssetUrl(),
  })
}

async function shareResult(): Promise<void> {
  if (!currentResult) return

  const descriptions: Record<ResultBand, string> = {
    'control-like': 'My recording was more similar to the research control class.',
    mixed: 'My recording had no clear research-class match.',
    'ad-like': "My recording was more similar to the Alzheimer's research class.",
  }

  await shareContent({
    title: 'Experimental picture-description comparison',
    text: `${descriptions[currentResult.band]} This experimental result is not a diagnosis or disease probability.`,
    url: publicAssetUrl(),
  })
}

async function shareContent(data: ShareData): Promise<void> {
  shareFeedback.textContent = ''

  try {
    if (navigator.share) {
      await navigator.share(data)
      shareFeedback.textContent = 'Share sheet opened.'
      return
    }

    await copyText(`${data.title}\n${data.text}\n${data.url}`)
    shareFeedback.textContent = 'Share text copied to clipboard.'
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return
    shareFeedback.textContent = 'Sharing is unavailable in this browser.'
  }
}

async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.className = 'fixed left-[-9999px] top-0'
  document.body.append(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

function mapModelProgress(progress: number): number {
  return 10 + Math.min(100, Math.max(0, progress)) * 0.7
}

function getRecordingGuidance(seconds: number): string {
  if (seconds < 10) return 'Start with the main action, then add details.'
  if (seconds < 30) return `Keep going if you can - about ${30 - seconds} seconds to the recommended minimum.`
  if (seconds <= 60) return 'Good length. Stop when you have finished describing the scene.'
  if (seconds <= 90) return 'You have enough audio. Wrap up when you are ready.'
  return 'Only the first 90 seconds will be used for optional analysis.'
}

function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000))
  return `${String(Math.floor(totalSeconds / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`
}

function formatDownloadTimestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-')
}

function getFileExtension(mimeType: string): string {
  if (mimeType.includes('mp4')) return 'm4a'
  if (mimeType.includes('ogg')) return 'ogg'
  return 'webm'
}

function getMicrophoneErrorMessage(error: unknown): string {
  if (!(error instanceof DOMException)) {
    return 'The microphone could not be started. Check your browser settings and try again.'
  }

  const messages: Record<string, string> = {
    NotAllowedError: "Microphone access was blocked. Enable it in your browser's site settings, then try again.",
    NotFoundError: 'No microphone was found. Connect a microphone and try again.',
    NotReadableError: 'Your microphone is busy or unavailable. Close other apps using it, then try again.',
    SecurityError: 'Microphone access requires a secure browser connection.',
  }
  return messages[error.name] ?? 'The microphone could not be started. Check your browser settings and try again.'
}

function detectBrowserFamily(userAgent: string): BrowserFamily {
  if (/Edg\//.test(userAgent)) return 'Edge'
  if (/Firefox\//.test(userAgent)) return 'Firefox'
  if (/Chrome\//.test(userAgent)) return 'Chrome'
  if (/Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)) return 'Safari'
  return 'Other'
}
