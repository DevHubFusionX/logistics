import { create } from 'zustand'
import en from './en.json'
import fr from './fr.json'

const translations = { en, fr }

const getInitialLocale = () => {
  const saved = localStorage.getItem('dara-locale')
  if (saved) return saved

  // Auto-detect browser language
  const browserLang = navigator.language || navigator.userLanguage
  if (browserLang && browserLang.startsWith('fr')) {
    return 'fr'
  }
  return 'en'
}

export const useTranslationStore = create((set) => ({
  locale: getInitialLocale(),
  isTranslating: false,
  setLocale: (locale) => {
    if (translations[locale]) {
      localStorage.setItem('dara-locale', locale)
      set({ locale, isTranslating: true })

      // Set cookie for Google Translate
      const cookieVal = locale === 'en' ? '' : `/en/${locale}`
      document.cookie = `googtrans=${cookieVal}; path=/;`
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${window.location.hostname};`
      document.cookie = `googtrans=${cookieVal}; path=/; domain=.${window.location.hostname};`

      // Poll for the GT widget — avoids a full page reload when script is still loading
      let attempts = 0
      const maxAttempts = 30 // 30 × 100ms = 3s max wait
      const tryTrigger = () => {
        const select = document.querySelector('.goog-te-combo')
        if (select) {
          select.value = locale
          select.dispatchEvent(new Event('change'))
          setTimeout(() => set({ isTranslating: false }), 500)
        } else if (attempts < maxAttempts) {
          attempts++
          setTimeout(tryTrigger, 100)
        } else {
          // Last resort: reload only if widget never initialised after 3s
          window.location.reload()
        }
      }
      tryTrigger()
    }
  }
}))

export const useTranslation = () => {
  const locale = useTranslationStore((state) => state.locale)
  const setLocale = useTranslationStore((state) => state.setLocale)
  const translate = (key) => {
    const keys = key.split('.')
    let value = translations[locale]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }
  return { t: translate, locale, setLocale }
}

export const t = (key) => {
  const locale = useTranslationStore.getState().locale
  const keys = key.split('.')
  let value = translations[locale]
  for (const k of keys) {
    value = value?.[k]
  }
  return value || key
}

export const setLocale = (locale) => {
  useTranslationStore.getState().setLocale(locale)
}

export const getLocale = () => {
  return useTranslationStore.getState().locale
}

export const formatDate = (dateInput, options = {}) => {
  if (!dateInput) return ''
  const locale = useTranslationStore.getState().locale
  const date = new Date(dateInput)
  if (isNaN(date.getTime())) return dateInput // Fallback for invalid/text dates

  const defaultOptions = { month: 'long', day: 'numeric', year: 'numeric', ...options }
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'fr-FR', defaultOptions).format(date)
}

export const initGoogleTranslate = () => {
  if (window.googleTranslateElementInit) return

  // 1. Create target element for Google Translate (hidden)
  if (!document.getElementById('google_translate_element')) {
    const div = document.createElement('div')
    div.id = 'google_translate_element'
    div.style.display = 'none'
    document.body.appendChild(div)
  }

  // 2. Define callback
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,fr',
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element')
  }

  // 3. Load script
  if (!document.querySelector('script[src*="translate.google.com"]')) {
    const script = document.createElement('script')
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)
  }

  // 4. MutationObserver — strip inline background-color GT injects on <font> elements
  //    This is the only reliable way to kill the hover highlight since GT uses inline styles.
  const stripGTHighlight = (node) => {
    if (node.nodeType !== 1) return // element nodes only
    if (node.tagName === 'FONT') {
      node.style.removeProperty('background-color')
      node.style.removeProperty('background')
      node.style.removeProperty('box-shadow')
    }
    // Also clean any font children inside the mutated subtree
    node.querySelectorAll?.('font').forEach((el) => {
      el.style.removeProperty('background-color')
      el.style.removeProperty('background')
      el.style.removeProperty('box-shadow')
    })
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // Attribute change on an existing font element (GT sets style on hover)
      if (mutation.type === 'attributes' && mutation.target.tagName === 'FONT') {
        stripGTHighlight(mutation.target)
      }
      // New nodes added to the DOM (GT wrapping text in <font>)
      for (const node of mutation.addedNodes) {
        stripGTHighlight(node)
      }
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style'],
  })
}

