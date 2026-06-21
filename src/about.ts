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
      <div class="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="${publicAssetUrl()}" class="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315f5a]">
          <span class="block text-sm font-semibold text-[#253f3d]">Alzheimer's screening helper</span>
          <span class="block text-xs text-[#697572]">About me</span>
        </a>
        <div class="flex gap-4 text-sm">
          <a href="${publicAssetUrl('science.html')}" class="font-medium text-[#285f59] underline decoration-[#a8b9b4] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315f5a]">Method</a>
          <a href="${publicAssetUrl()}" class="font-medium text-[#285f59] underline decoration-[#a8b9b4] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315f5a]">Exercise</a>
        </div>
      </div>
    </nav>

    <article class="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-12">
      <header class="max-w-3xl">
        <p class="text-sm font-medium text-[#44736c]">About me</p>
        <h1 class="mt-3 text-3xl leading-tight font-semibold tracking-[-0.02em] text-[#203836] sm:text-4xl">
          David Zhao
        </h1>
        <p class="mt-4 text-base leading-7 text-[#596a68]">
          Student builder interested in AI, machine learning, and practical tools for families navigating Alzheimer's concerns.
        </p>
      </header>

      <section class="mt-10 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div class="self-start overflow-hidden rounded-lg border border-[#d9ddda] bg-white p-3">
          <img
            src="${publicAssetUrl('IMG_1441.jpg')}"
            alt="Photo of David"
            width="4284"
            height="5712"
            class="aspect-square w-full rounded-md object-cover object-center"
          />
        </div>

        <div class="space-y-8">
          <section class="border-y border-[#d9ddda] py-5" aria-labelledby="bio-heading">
            <h2 id="bio-heading" class="text-xl font-semibold text-[#203836]">Personal blurb</h2>
            <div class="mt-3 space-y-3 text-sm leading-7 text-[#596a68]">
              <p>David is a high-school junior with an interest in AI and machine learning.</p>
              <p>David is committed to helping families suffering from Alzheimer's disease find help and diagnosis.</p>
              <p>You can contact David at <a class="font-semibold text-[#285f59] underline decoration-[#a8b9b4] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315f5a]" href="mailto:dzhao650@gmail.com">dzhao650@gmail.com</a> or using the contact form below.</p>
            </div>
          </section>

          <section class="border-y border-[#d9ddda] py-5" aria-labelledby="contact-heading">
            <h2 id="contact-heading" class="text-xl font-semibold text-[#203836]">Contact</h2>
            <p class="mt-3 text-sm leading-7 text-[#596a68]">Use the form below for questions, feedback, or project-related contact.</p>
            <div class="mt-4 overflow-hidden rounded-lg border border-[#d9ddda] bg-white">
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc88bQnk9JdoxKrYLVVggMCDb5ylnl7MVJb7K_xX__1hG6J-Q/viewform?embedded=true" width="640" height="1015" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            </div>
          </section>
        </div>
      </section>
    </article>
  </main>
`
