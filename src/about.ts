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
      <div class="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <a href="${publicAssetUrl()}" class="min-w-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315f5a]">
          <span class="block truncate text-sm font-semibold text-[#253f3d]"><span class="sm:hidden">Alzheimer's helper</span><span class="hidden sm:inline">Alzheimer's screening helper</span></span>
          <span class="block text-xs text-[#697572]">alzheimer self check</span>
        </a>
        <div class="flex shrink-0 gap-3 text-sm">
          <a href="${publicAssetUrl('science.html')}" class="font-medium text-[#285f59] underline decoration-[#a8b9b4] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315f5a]">Method</a>
          <a href="${publicAssetUrl()}" class="font-medium text-[#285f59] underline decoration-[#a8b9b4] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315f5a]">Exercise</a>
        </div>
      </div>
    </nav>

    <article class="mx-auto max-w-none px-0 py-0">
      <section class="md:grid md:grid-cols-[minmax(18rem,0.85fr)_minmax(22rem,1.15fr)] md:gap-8 md:bg-[#f4f1ea] md:px-8 md:py-10 lg:px-10">
        <div class="relative min-h-[calc(100svh-4rem)] overflow-hidden md:flex md:min-h-0 md:flex-col md:overflow-visible">
          <img
            src="${publicAssetUrl('IMG_1441.jpg')}"
            alt="Photo of David"
            width="4284"
            height="5712"
            class="absolute inset-0 h-full w-full object-cover object-center md:static md:order-2 md:mt-8 md:h-auto md:w-full md:object-cover md:object-center"
          />

          <header class="absolute left-0 top-0 max-w-3xl px-5 pt-8 text-[#203836] drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] sm:px-8 sm:pt-10 md:static md:order-1 md:max-w-none md:px-0 md:pt-0 md:drop-shadow-none">
            <p class="text-sm font-semibold uppercase tracking-[0.14em] md:text-[#44736c]">About</p>
            <h1 class="mt-3 text-4xl leading-tight font-semibold tracking-[-0.03em] sm:text-6xl md:text-5xl lg:text-6xl">
              David Zhao
            </h1>
            <p class="mt-4 max-w-md text-lg leading-7 md:text-[#596a68] lg:text-xl lg:leading-8">
              Student builder interested in AI, machine learning, and practical tools for families navigating Alzheimer's concerns.
            </p>
          </header>
        </div>

        <div class="px-5 py-10 sm:px-8 sm:py-12 md:px-0 md:py-0">
          <section class="py-5" aria-labelledby="bio-heading">
            <h2 id="bio-heading" class="text-xl font-semibold text-[#203836]">Personal blurb</h2>
            <div class="mt-3 space-y-3 text-sm leading-7 text-[#596a68]">
              <p>David is a high-school junior with an interest in AI and machine learning.</p>
              <p>David is committed to helping families suffering from Alzheimer's disease find help and diagnosis.</p>
              <p>You can contact David at <a class="font-semibold text-[#285f59] underline decoration-[#a8b9b4] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315f5a]" href="mailto:dzhao650@gmail.com">dzhao650@gmail.com</a> or using the contact form below.</p>
            </div>
          </section>

          <section class="border-t border-[#d9ddda] pt-4 pb-5" aria-labelledby="contact-heading">
            <h2 id="contact-heading" class="text-xl font-semibold text-[#203836]">Contact</h2>
            <p class="mt-3 text-sm leading-7 text-[#596a68]">Use the form below for questions, feedback, or project-related contact.</p>
            <div class="mt-4 max-w-full overflow-hidden">
              <iframe class="block w-full max-w-full" src="https://docs.google.com/forms/d/e/1FAIpQLSc88bQnk9JdoxKrYLVVggMCDb5ylnl7MVJb7K_xX__1hG6J-Q/viewform?embedded=true" width="640" height="1015" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            </div>
          </section>
        </div>
      </section>
    </article>
  </main>
`
