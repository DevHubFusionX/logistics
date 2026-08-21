import { useTranslation } from '../../../i18n'

/**
 * LanguageToggle
 * Renders EN | FR switcher in two modes:
 *  - isMobile: full-row row inside the mobile drawer
 *  - default:  compact inline version for the desktop nav
 */
export default function LanguageToggle({ isMobile = false }) {
  const { locale, setLocale } = useTranslation()
  const isFrench = locale === 'fr'
  const toggle = () => setLocale(isFrench ? 'en' : 'fr')

  if (isMobile) {
    return (
      <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-slate-50 border border-slate-200">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-body-unique">
          Language
        </span>
        <button
          onClick={toggle}
          className="flex items-center gap-1.5 text-[11px] font-bold font-body-unique cursor-pointer"
        >
          <span className={!isFrench ? 'text-[#0056B8]' : 'text-slate-400'}>EN</span>
          <span className="text-slate-300">|</span>
          <span className={isFrench ? 'text-[#0056B8]' : 'text-slate-400'}>FR</span>
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={toggle}
      title={isFrench ? 'Switch to English' : 'Traduire en Français'}
      className="flex items-center gap-1 text-[10px] font-semibold font-body-unique tracking-widest cursor-pointer select-none transition-colors text-slate-500 hover:text-slate-800"
    >
      <span className={!isFrench ? 'text-[#0056B8] font-bold' : ''}>EN</span>
      <span className="text-slate-300 mx-0.5">|</span>
      <span className={isFrench ? 'text-[#0056B8] font-bold' : ''}>FR</span>
    </button>
  )
}
