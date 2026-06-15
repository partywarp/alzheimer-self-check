import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main class="min-h-screen bg-[#f4f3ee] font-sans text-[#172b2c] antialiased">
    <nav class="border-b border-[#d9ddd6] bg-[#f4f3ee]/95">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a href="/" class="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#216869]">
          <span class="grid size-10 place-items-center rounded-full bg-[#193c3d] text-white shadow-sm">
            <svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 13h2.2l1.3-5 2.4 10 2.3-13 2.2 11 1.4-6 1.2 3H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span>
            <span class="block text-sm font-bold tracking-[0.16em] text-[#193c3d] uppercase">Mindful Check</span>
            <span class="block text-xs text-[#607170]">Picture description exercise</span>
          </span>
        </a>
        <div class="flex items-center gap-2 rounded-full border border-[#cdd7d2] bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#315c58]">
          <svg class="size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3 5 6v5c0 4.4 2.8 8.5 7 10 4.2-1.5 7-5.6 7-10V6l-7-3Z" stroke="currentColor" stroke-width="1.8"/>
            <path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Private & on-device
        </div>
      </div>
    </nav>

    <div class="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <header class="mb-8 max-w-3xl sm:mb-10">
        <div class="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-[#44736c] uppercase">
          <span class="h-px w-7 bg-[#76a99f]"></span>
          Alzheimer’s self-check
        </div>
        <h1 class="max-w-2xl font-serif text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-[#183738] sm:text-5xl lg:text-6xl">
          Describe what you see.
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-7 text-[#596a68] sm:text-lg">
          Look closely at the picture, then record yourself describing everything happening in the scene. Speak naturally and take as much time as you need.
        </p>
      </header>

      <div class="mb-7 grid gap-3 sm:grid-cols-3">
        <div class="flex items-center gap-3 rounded-2xl border border-[#d8ddd7] bg-white/55 px-4 py-3">
          <span class="grid size-7 shrink-0 place-items-center rounded-full bg-[#193c3d] text-xs font-bold text-white">1</span>
          <span class="text-sm font-semibold text-[#284746]">Study the picture</span>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-[#d8ddd7] bg-white/55 px-4 py-3">
          <span class="grid size-7 shrink-0 place-items-center rounded-full bg-[#dceae5] text-xs font-bold text-[#285b57]">2</span>
          <span class="text-sm font-semibold text-[#284746]">Record your description</span>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-[#d8ddd7] bg-white/55 px-4 py-3">
          <span class="grid size-7 shrink-0 place-items-center rounded-full bg-[#dceae5] text-xs font-bold text-[#285b57]">3</span>
          <span class="text-sm font-semibold text-[#284746]">Review your recording</span>
        </div>
      </div>

      <section class="grid items-start gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.75fr)] lg:gap-8">
        <div class="overflow-hidden rounded-[1.75rem] border border-[#cfd5cf] bg-[#eae8df] shadow-[0_20px_60px_-28px_rgba(28,57,55,0.35)]">
          <div class="flex items-center justify-between border-b border-[#d5d7cf] bg-[#fbfaf6] px-5 py-3.5">
            <div class="flex items-center gap-2">
              <svg class="size-4 text-[#426b67]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.8"/>
                <path d="m4 16 5-5 4 4 2-2 5 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor"/>
              </svg>
              <span class="text-xs font-bold tracking-[0.16em] text-[#42615f] uppercase">Picture 01</span>
            </div>
            <span class="text-xs font-medium text-[#72807e]">Take your time</span>
          </div>
          <img
            src="/kitchen-picture-description.png"
            alt="A detailed black-and-white illustration of a busy family kitchen for a picture description exercise"
            class="aspect-[3/2] w-full bg-[#f8f7f2] object-contain"
          />
          <div class="flex items-start gap-3 border-t border-[#d5d7cf] bg-[#fbfaf6] px-5 py-4 text-sm leading-6 text-[#536563]">
            <svg class="mt-0.5 size-5 shrink-0 text-[#497a72]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
              <path d="M12 11v5M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Focus on people, objects, actions, and anything unusual. There are no right or wrong answers.
          </div>
        </div>

        <aside class="overflow-hidden rounded-[1.75rem] border border-[#cfd8d2] bg-white shadow-[0_20px_60px_-28px_rgba(28,57,55,0.28)]">
          <div class="border-b border-[#e0e5e1] px-6 py-5 sm:px-7">
            <div class="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-[#4c766f] uppercase">
              <span class="size-1.5 rounded-full bg-[#4e8e82]"></span>
              Step 2 of 3
            </div>
            <h2 class="font-serif text-2xl font-semibold tracking-[-0.02em] text-[#183738]">Record your response</h2>
            <p class="mt-2 text-sm leading-6 text-[#687775]">Your recording remains in this browser unless you download it.</p>
          </div>

          <div class="min-h-[370px] px-6 py-7 sm:px-7">
            <div id="idle-panel" class="flex flex-col items-center text-center">
              <button id="start-recording" type="button" class="group grid size-24 place-items-center rounded-full bg-[#dbece7] text-[#1f645e] ring-8 ring-[#eff6f3] transition hover:scale-[1.03] hover:bg-[#cee5de] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#2b746d] active:scale-95" aria-label="Start recording">
                <span class="grid size-14 place-items-center rounded-full bg-[#216869] text-white shadow-lg shadow-[#216869]/20 transition group-hover:bg-[#195d58]">
                  <svg class="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="8" y="3" width="8" height="12" rx="4" stroke="currentColor" stroke-width="2"/>
                    <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </span>
              </button>
              <p class="mt-6 text-lg font-bold text-[#244443]">Ready when you are</p>
              <p class="mt-2 max-w-xs text-sm leading-6 text-[#6b7977]">Select the microphone to begin. Your browser will ask for microphone access.</p>
              <div class="mt-6 flex items-center gap-2 rounded-full bg-[#f0f4f1] px-3 py-2 text-xs font-semibold text-[#647571]">
                <svg class="size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 10V8a5 5 0 0 1 10 0v2M6 10h12v10H6V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                </svg>
                Nothing is uploaded
              </div>
            </div>

            <div id="requesting-panel" class="hidden flex-col items-center py-8 text-center">
              <div class="grid size-20 animate-pulse place-items-center rounded-full bg-[#e4efeb] text-[#286a63]">
                <svg class="size-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="8" y="3" width="8" height="12" rx="4" stroke="currentColor" stroke-width="2"/>
                  <path d="M5 11a7 7 0 0 0 14 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <p class="mt-6 text-lg font-bold text-[#244443]">Allow microphone access</p>
              <p class="mt-2 max-w-xs text-sm leading-6 text-[#6b7977]">Check your browser’s permission prompt to continue.</p>
            </div>

            <div id="recording-panel" class="hidden flex-col items-center text-center">
              <div class="flex items-center gap-2 rounded-full bg-[#fff0ed] px-3 py-1.5 text-xs font-bold tracking-[0.12em] text-[#a53b2f] uppercase">
                <span class="size-2 animate-pulse rounded-full bg-[#c6493b]"></span>
                Recording
              </div>
              <div id="recording-timer" class="mt-5 font-mono text-5xl font-semibold tracking-[-0.04em] text-[#183738]" aria-label="Recording duration">00:00</div>
              <div class="mt-3 flex items-center gap-2 rounded-full bg-[#edf5f2] px-3 py-1.5 text-xs font-bold text-[#3f716a]">
                <svg class="size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
                  <path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Recommended: 30–60 seconds
              </div>
              <div class="mt-7 flex h-10 items-center gap-1.5 text-[#4d8c82]" aria-hidden="true">
                <span class="h-3 w-1.5 animate-pulse rounded-full bg-current"></span>
                <span class="h-7 w-1.5 animate-pulse rounded-full bg-current"></span>
                <span class="h-5 w-1.5 animate-pulse rounded-full bg-current"></span>
                <span class="h-9 w-1.5 animate-pulse rounded-full bg-current"></span>
                <span class="h-6 w-1.5 animate-pulse rounded-full bg-current"></span>
                <span class="h-4 w-1.5 animate-pulse rounded-full bg-current"></span>
                <span class="h-8 w-1.5 animate-pulse rounded-full bg-current"></span>
                <span class="h-3 w-1.5 animate-pulse rounded-full bg-current"></span>
              </div>
              <p id="recording-guidance" class="mt-5 text-sm leading-6 text-[#6b7977]" aria-live="polite">Keep describing the picture. Aim for at least 30 seconds.</p>
              <button id="stop-recording" type="button" class="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#a43e33] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#8f332a] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#a43e33] disabled:cursor-wait disabled:opacity-60">
                <span class="size-3 rounded-sm bg-white" aria-hidden="true"></span>
                Stop recording
              </button>
            </div>

            <div id="completed-panel" class="hidden flex-col">
              <div class="flex items-center gap-3">
                <span class="grid size-11 shrink-0 place-items-center rounded-full bg-[#dff0e9] text-[#267064]">
                  <svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m5 12 4 4L19 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <div>
                  <p class="font-bold text-[#244443]">Recording complete</p>
                  <p id="completed-duration" class="mt-0.5 text-sm text-[#6b7977]">Duration: 00:00</p>
                </div>
              </div>
              <div class="mt-6 rounded-2xl border border-[#dce3df] bg-[#f7f9f7] p-3">
                <audio id="recording-playback" class="w-full" controls preload="metadata"></audio>
              </div>
              <div id="analysis-card" class="mt-5 rounded-2xl border border-[#d6dfda] bg-[#f5f8f6] p-4">
                <div id="analysis-ready">
                  <div class="flex items-start gap-3">
                    <span class="grid size-9 shrink-0 place-items-center rounded-full bg-[#dfece7] text-[#286a63]">
                      <svg class="size-4.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M8 4h8M9 2v4m6-4v4M7 7h10a2 2 0 0 1 2 2v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        <path d="M9 12h.01M15 12h.01M9 16h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                    </span>
                    <div>
                      <p class="text-sm font-bold text-[#244443]">Optional research analysis</p>
                      <p class="mt-1 text-xs leading-5 text-[#667572]">
                        Compare speech patterns with ADReSSo research classes. A 91 MB model runs locally; audio is not uploaded.
                      </p>
                    </div>
                  </div>
                  <label class="mt-4 flex cursor-pointer items-start gap-2.5 rounded-xl bg-white p-3 text-xs leading-5 text-[#5f6f6c]">
                    <input id="analysis-consent" type="checkbox" class="mt-0.5 size-4 shrink-0 accent-[#216869]">
                    <span>I understand this experimental model cannot detect or diagnose Alzheimer’s disease.</span>
                  </label>
                  <button id="analyze-recording" type="button" disabled class="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#284f4d] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1f4442] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#216869] disabled:cursor-not-allowed disabled:opacity-40">
                    <svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 13h3l1.5-5 3 10 2.7-13 2.5 11 1.3-5 1 2h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Run on-device analysis
                  </button>
                  <p class="mt-2 text-center text-[11px] leading-4 text-[#7b8784]">10–90 seconds of clear speech works best.</p>
                </div>

                <div id="analysis-loading" class="hidden py-3 text-center" role="status" aria-live="polite">
                  <span class="mx-auto grid size-11 animate-pulse place-items-center rounded-full bg-[#dfece7] text-[#286a63]">
                    <svg class="size-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M20 12a8 8 0 1 1-2.3-5.7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </span>
                  <p id="analysis-loading-title" class="mt-3 text-sm font-bold text-[#244443]">Loading research model…</p>
                  <p id="analysis-loading-detail" class="mt-1 text-xs text-[#697875]">Preparing local inference</p>
                  <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-[#dce5e1]">
                    <div id="analysis-progress" class="h-full w-0 rounded-full bg-[#397a72] transition-[width] duration-300"></div>
                  </div>
                </div>

                <div id="analysis-result" class="hidden">
                  <div class="flex items-start gap-3">
                    <span id="analysis-result-icon" class="grid size-9 shrink-0 place-items-center rounded-full bg-[#ece8d9] text-[#74683d]">
                      <svg class="size-4.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
                        <path d="M12 8v5m0 3h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                    </span>
                    <div>
                      <p class="text-[11px] font-bold tracking-[0.12em] text-[#6e795e] uppercase">Experimental comparison</p>
                      <p id="analysis-result-title" class="mt-1 text-sm font-bold text-[#3e493f]">No clear match</p>
                    </div>
                  </div>
                  <div class="mt-4 space-y-3">
                    <div>
                      <div class="mb-1 flex justify-between text-[11px] font-semibold text-[#63716e]">
                        <span>Closer to people without dementia</span>
                        <span id="control-score">0%</span>
                      </div>
                      <div class="h-2 overflow-hidden rounded-full bg-[#e0e5e2]"><div id="control-bar" class="h-full w-0 rounded-full bg-[#5b8c83]"></div></div>
                    </div>
                    <div>
                      <div class="mb-1 flex justify-between text-[11px] font-semibold text-[#63716e]">
                        <span>Closer to people with Alzheimer’s dementia</span>
                        <span id="ad-score">0%</span>
                      </div>
                      <div class="h-2 overflow-hidden rounded-full bg-[#e0e5e2]"><div id="ad-bar" class="h-full w-0 rounded-full bg-[#a77d58]"></div></div>
                    </div>
                  </div>
                  <p class="mt-4 rounded-xl bg-[#fffaf0] p-3 text-[11px] leading-5 text-[#756443]">
                    The percentages show how closely this recording matched two groups in a small research dataset. They do not show your chance of having Alzheimer’s and cannot provide a diagnosis.
                  </p>
                  <button id="reanalyze-recording" type="button" class="mt-3 w-full rounded-lg py-2 text-xs font-bold text-[#346c66] hover:bg-[#e8f1ed] focus-visible:outline-2 focus-visible:outline-[#216869]">
                    Run analysis again
                  </button>
                </div>

                <div id="analysis-error" class="hidden py-2 text-center">
                  <p class="text-sm font-bold text-[#774b45]">Analysis unavailable</p>
                  <p id="analysis-error-message" class="mt-1 text-xs leading-5 text-[#796965]">The model could not process this recording.</p>
                  <button id="retry-analysis" type="button" class="mt-3 rounded-lg px-4 py-2 text-xs font-bold text-[#346c66] hover:bg-[#e8f1ed] focus-visible:outline-2 focus-visible:outline-[#216869]">Try again</button>
                </div>
              </div>
              <a id="download-recording" class="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#216869] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#195d58] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#216869]" href="#">
                <svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Download recording
              </a>
              <div class="mt-3 grid grid-cols-2 gap-3">
                <button id="record-again" type="button" class="inline-flex items-center justify-center gap-2 rounded-xl border border-[#bdd0ca] bg-white px-3 py-3 text-sm font-bold text-[#275d58] transition hover:bg-[#f1f7f4] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2b746d]">
                  <svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Record again
                </button>
                <button id="delete-recording" type="button" class="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e0d8d3] bg-white px-3 py-3 text-sm font-bold text-[#80534d] transition hover:bg-[#fbf4f2] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#9a5148]">
                  <svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Delete
                </button>
              </div>
            </div>

            <div id="error-panel" class="hidden flex-col items-center py-4 text-center">
              <span class="grid size-16 place-items-center rounded-full bg-[#fff0ed] text-[#a43e33]">
                <svg class="size-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 8v5m0 3h.01M10.3 4.4 3.2 17a2 2 0 0 0 1.7 3h14.2a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <p class="mt-5 text-lg font-bold text-[#563c39]">Couldn’t start recording</p>
              <p id="error-message" class="mt-2 max-w-xs text-sm leading-6 text-[#766865]">Check your microphone permissions and try again.</p>
              <button id="retry-recording" type="button" class="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#216869] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#195d58] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#216869]">
                Try again
              </button>
            </div>

            <div id="unsupported-panel" class="hidden flex-col items-center py-4 text-center">
              <span class="grid size-16 place-items-center rounded-full bg-[#f0f1ed] text-[#66716d]">
                <svg class="size-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="8" y="3" width="8" height="12" rx="4" stroke="currentColor" stroke-width="1.8"/>
                  <path d="m4 4 16 16M5 11a7 7 0 0 0 10.8 5.9M19 11a7 7 0 0 1-.3 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </span>
              <p class="mt-5 text-lg font-bold text-[#46514e]">Recording isn’t supported</p>
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

      <section class="mt-8 rounded-2xl border border-[#dedbd0] bg-[#faf8f2] p-5 sm:p-6">
        <div class="flex items-start gap-4">
          <span class="grid size-10 shrink-0 place-items-center rounded-full bg-[#eee9d9] text-[#786c42]">
            <svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3Z" stroke="currentColor" stroke-width="1.8"/>
              <path d="M9 21h6M9 17h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </span>
          <div>
            <h2 class="font-bold text-[#4c493b]">A note about this exercise</h2>
            <p class="mt-1 text-sm leading-6 text-[#6f6b5e]">
              This activity and its optional research-model output are for personal reflection only. Neither can diagnose Alzheimer’s disease or any other condition. If you have concerns about memory, language, or thinking, speak with a qualified healthcare professional.
            </p>
          </div>
        </div>
      </section>
    </div>

    <footer class="border-t border-[#d9ddd6]">
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs leading-5 text-[#71807d] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>Audio stays on this device and is never uploaded.</p>
        <p>Not a medical diagnosis.</p>
      </div>
    </footer>
  </main>
`

type RecorderState = 'idle' | 'requesting' | 'recording' | 'completed' | 'error' | 'unsupported'

const isRecordingSupported =
  typeof MediaRecorder !== 'undefined' &&
  Boolean(navigator.mediaDevices?.getUserMedia)

const panels: Record<RecorderState, HTMLElement> = {
  idle: getElement('idle-panel'),
  requesting: getElement('requesting-panel'),
  recording: getElement('recording-panel'),
  completed: getElement('completed-panel'),
  error: getElement('error-panel'),
  unsupported: getElement('unsupported-panel'),
}

const startButton = getElement<HTMLButtonElement>('start-recording')
const stopButton = getElement<HTMLButtonElement>('stop-recording')
const retryButton = getElement<HTMLButtonElement>('retry-recording')
const recordAgainButton = getElement<HTMLButtonElement>('record-again')
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
const analysisResultTitle = getElement('analysis-result-title')
const analysisErrorMessage = getElement('analysis-error-message')
const controlScoreElement = getElement('control-score')
const adScoreElement = getElement('ad-score')
const controlBar = getElement('control-bar')
const adBar = getElement('ad-bar')

let currentState: RecorderState = isRecordingSupported ? 'idle' : 'unsupported'
let mediaRecorder: MediaRecorder | null = null
let mediaStream: MediaStream | null = null
let audioChunks: BlobPart[] = []
let audioUrl: string | null = null
let recordedAudioBlob: Blob | null = null
let recordingStartedAt = 0
let recordedDuration = 0
let timerId: number | undefined
let recorderFailed = false
let modelWorker: Worker | null = null
let analysisInProgress = false

function getElement<T extends HTMLElement = HTMLElement>(id: string): T {
  const element = document.getElementById(id)

  if (!element) {
    throw new Error(`Missing required element: #${id}`)
  }

  return element as T
}

function setState(nextState: RecorderState, errorMessage?: string): void {
  currentState = nextState

  Object.entries(panels).forEach(([state, panel]) => {
    const isActive = state === nextState
    panel.classList.toggle('hidden', !isActive)
    panel.classList.toggle('flex', isActive)
  })

  const statuses: Record<RecorderState, string> = {
    idle: 'Microphone inactive',
    requesting: 'Waiting for microphone permission',
    recording: 'Recording in progress',
    completed: 'Recording saved in this browser',
    error: 'Microphone unavailable',
    unsupported: 'Recording not supported by this browser',
  }

  statusElement.innerHTML = `
    <span class="size-1.5 rounded-full ${nextState === 'recording' ? 'animate-pulse bg-[#c6493b]' : 'bg-[#87a39d]'}"></span>
    ${statuses[nextState]}
  `

  if (errorMessage) {
    errorElement.textContent = errorMessage
  }
}

function chooseMimeType(): string {
  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg;codecs=opus',
  ]

  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) ?? ''
}

async function startRecording(): Promise<void> {
  if (!isRecordingSupported || currentState === 'requesting' || currentState === 'recording') {
    return
  }

  resetAudio()
  setState('requesting')

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    })

    const mimeType = chooseMimeType()
    mediaRecorder = mimeType
      ? new MediaRecorder(mediaStream, { mimeType })
      : new MediaRecorder(mediaStream)
    audioChunks = []
    recorderFailed = false

    mediaRecorder.addEventListener('dataavailable', (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data)
      }
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
  } catch (error) {
    releaseMicrophone()
    setState('error', getMicrophoneErrorMessage(error))
  }
}

function stopRecording(): void {
  if (!mediaRecorder || mediaRecorder.state !== 'recording') {
    return
  }

  stopButton.disabled = true
  recordedDuration = Date.now() - recordingStartedAt
  stopTimer()
  mediaRecorder.stop()
}

function finalizeRecording(): void {
  stopButton.disabled = false
  releaseMicrophone()

  if (recorderFailed) {
    return
  }

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

function updateTimer(): void {
  recordedDuration = Date.now() - recordingStartedAt
  timerElement.textContent = formatDuration(recordedDuration)
  const seconds = Math.floor(recordedDuration / 1000)

  if (seconds < 30) {
    recordingGuidance.textContent = `Keep going if you can — about ${30 - seconds} seconds to the recommended minimum.`
  } else if (seconds <= 60) {
    recordingGuidance.textContent = 'Good recording length. Stop when you have finished describing the scene.'
  } else if (seconds <= 90) {
    recordingGuidance.textContent = 'You have enough audio. Wrap up when you are ready.'
  } else {
    recordingGuidance.textContent = 'Only the first 90 seconds will be used for optional analysis.'
  }
}

function stopTimer(): void {
  if (timerId !== undefined) {
    window.clearInterval(timerId)
    timerId = undefined
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
  recordedAudioBlob = null
  audioChunks = []
}

function deleteRecording(): void {
  resetAudio()
  recordedDuration = 0
  timerElement.textContent = '00:00'
  recordingGuidance.textContent = 'Keep describing the picture. Aim for at least 30 seconds.'
  setState('idle')
  startButton.focus()
}

type ModelWorkerMessage =
  | { type: 'progress'; progress: number }
  | { type: 'status'; status: 'loading' | 'analyzing' }
  | { type: 'result'; adScore: number; controlScore: number }
  | { type: 'error'; message: string }

async function analyzeRecording(): Promise<void> {
  if (!recordedAudioBlob || analysisInProgress) return

  analysisInProgress = true
  showAnalysisPanel('loading')
  analysisProgress.style.width = '0%'
  analysisLoadingTitle.textContent = 'Preparing your recording…'
  analysisLoadingDetail.textContent = 'Audio remains on this device'

  try {
    const waveform = await decodeRecording(recordedAudioBlob)
    const worker = getModelWorker()
    worker.postMessage({ type: 'analyze', audio: waveform }, [waveform.buffer])
  } catch (error) {
    showAnalysisError(getAnalysisErrorMessage(error))
  }
}

function getModelWorker(): Worker {
  if (modelWorker) return modelWorker

  modelWorker = new Worker(new URL('./model.worker.ts', import.meta.url), { type: 'module' })
  modelWorker.addEventListener('message', (event: MessageEvent<ModelWorkerMessage>) => {
    const message = event.data

    if (message.type === 'progress') {
      analysisProgress.style.width = `${Math.min(100, Math.max(0, message.progress))}%`
      analysisLoadingDetail.textContent = `Loading local model: ${message.progress}%`
      return
    }

    if (message.type === 'status') {
      if (message.status === 'loading') {
        analysisLoadingTitle.textContent = 'Loading research model…'
        analysisLoadingDetail.textContent = 'First use may take a moment'
      } else {
        analysisProgress.style.width = '100%'
        analysisLoadingTitle.textContent = 'Analyzing speech patterns…'
        analysisLoadingDetail.textContent = 'Running locally in your browser'
      }
      return
    }

    if (message.type === 'result') {
      analysisInProgress = false
      renderAnalysisResult(message.adScore, message.controlScore)
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
    const minimumSamples = 5 * 16_000
    const maximumSamples = 90 * 16_000

    if (resampled.length < minimumSamples) {
      throw new Error('short-recording')
    }

    return resampled.length > maximumSamples
      ? resampled.slice(0, maximumSamples)
      : resampled
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
  const safeAdScore = Math.min(1, Math.max(0, adScore))
  const safeControlScore = Math.min(1, Math.max(0, controlScore))
  const adPercent = Math.round(safeAdScore * 100)
  const controlPercent = Math.round(safeControlScore * 100)

  if (safeAdScore >= 0.65) {
    analysisResultTitle.textContent = 'Speech patterns were closer to the Alzheimer’s research group'
  } else if (safeAdScore <= 0.35) {
    analysisResultTitle.textContent = 'Speech patterns were closer to the group without dementia'
  } else {
    analysisResultTitle.textContent = 'The model found no clear match'
  }

  adScoreElement.textContent = `${adPercent}%`
  controlScoreElement.textContent = `${controlPercent}%`
  adBar.style.width = `${adPercent}%`
  controlBar.style.width = `${controlPercent}%`
  showAnalysisPanel('result')
}

function showAnalysisPanel(panel: 'ready' | 'loading' | 'result' | 'error'): void {
  analysisReady.classList.toggle('hidden', panel !== 'ready')
  analysisLoading.classList.toggle('hidden', panel !== 'loading')
  analysisResult.classList.toggle('hidden', panel !== 'result')
  analysisError.classList.toggle('hidden', panel !== 'error')
}

function showAnalysisError(message: string): void {
  analysisInProgress = false
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
  analysisConsent.checked = false
  analyzeButton.disabled = true
  analysisProgress.style.width = '0%'
  adBar.style.width = '0%'
  controlBar.style.width = '0%'
  showAnalysisPanel('ready')
  disposeModelWorker()
}

function disposeModelWorker(): void {
  modelWorker?.terminate()
  modelWorker = null
}

function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
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
    NotAllowedError: 'Microphone access was blocked. Enable it in your browser’s site settings, then try again.',
    NotFoundError: 'No microphone was found. Connect a microphone and try again.',
    NotReadableError: 'Your microphone is busy or unavailable. Close other apps using it, then try again.',
    SecurityError: 'Microphone access requires a secure browser connection.',
  }

  return messages[error.name] ?? 'The microphone could not be started. Check your browser settings and try again.'
}

startButton.addEventListener('click', startRecording)
stopButton.addEventListener('click', stopRecording)
retryButton.addEventListener('click', startRecording)
recordAgainButton.addEventListener('click', startRecording)
deleteButton.addEventListener('click', deleteRecording)
analysisConsent.addEventListener('change', () => {
  analyzeButton.disabled = !analysisConsent.checked
})
analyzeButton.addEventListener('click', analyzeRecording)
reanalyzeButton.addEventListener('click', analyzeRecording)
retryAnalysisButton.addEventListener('click', analyzeRecording)

window.addEventListener('pagehide', () => {
  stopTimer()
  releaseMicrophone()
  disposeModelWorker()

  if (audioUrl) {
    URL.revokeObjectURL(audioUrl)
  }
})

setState(currentState)
