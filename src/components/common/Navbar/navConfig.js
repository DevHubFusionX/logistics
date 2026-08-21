export const navLinks = [
  { label: 'Platform',   path: '/platform',    megaMenu: 'platform' },
  { label: 'Solutions',  path: '/solutions',   megaMenu: 'solutions' },
  { label: 'Network',    path: '/network',     megaMenu: 'network' },
  { label: 'Technology', path: '/technology',  megaMenu: 'technology' },
  { label: 'Resources',  path: '/blog',        megaMenu: 'resources' },
  { label: 'Company',    path: '/about',       megaMenu: 'company' },
]

export const mobileContainerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
}

export const mobileItemVariants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 320, damping: 28 } },
}
