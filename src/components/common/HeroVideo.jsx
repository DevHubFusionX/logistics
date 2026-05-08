import { memo } from 'react'

// Cloudinary transformations: q_auto (adaptive quality), f_auto (WebM for Chrome/FF, MP4 fallback),
// w_1280 (cap resolution — full 4K is wasted on a background video), br_2m (bitrate cap)
const HERO_VIDEO_URL = 'https://res.cloudinary.com/degktbk01/video/upload/q_auto,f_auto,w_1280,br_2m/v1777375603/herovideo_cpx5ut.mp4'

// Low-quality poster frame from same video (grabbed at 0s, tiny JPEG)
const HERO_POSTER_URL = 'https://res.cloudinary.com/degktbk01/video/upload/q_30,w_800,f_jpg,so_0/v1777375603/herovideo_cpx5ut.jpg'

const HeroVideo = memo(({ className = 'absolute inset-0 w-full h-full object-cover object-bottom', opacity }) => (
  <video
    src={HERO_VIDEO_URL}
    poster={HERO_POSTER_URL}
    preload="none"
    autoPlay muted loop playsInline crossOrigin="anonymous"
    className={className}
    style={opacity ? { opacity } : undefined}
  />
))

export default HeroVideo
export { HERO_VIDEO_URL }
