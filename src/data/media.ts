import sunset from '../assets/panoramic-sliding-windows-sunset.jpg';
import sunsetPhone from '../assets/panoramic-sliding-windows-phone-view.jpg';
import bedroomWindow from '../assets/bedroom-sliding-window-installation.jpg';
import livingWindow from '../assets/living-room-sliding-window-installation.jpg';
import bedside from '../assets/custom-bed-floating-bedside-unit.jpg';
import woodBed from '../assets/custom-bed-wood-grain-headboard.jpg';
import livingDining from '../assets/living-dining-sculpted-feature-wall.jpg';
import lounge from '../assets/compact-lounge-sofa-and-storage.jpg';
import tealStorage from '../assets/teal-arched-storage-cabinets.jpg';
import creamWardrobe from '../assets/bedroom-cream-wardrobes-striped-seat.jpg';
import openGlazing from '../assets/grid-glazing-open-window-panels.jpg';
import dressingWardrobe from '../assets/wardrobe-botanical-dressing-niche.jpg';
import windowFitout from '../assets/renovation-window-interior-fitout.jpg';
import wallPreparation from '../assets/renovation-window-wall-preparation.jpg';
import greenBedroom from '../assets/green-headboard-veined-feature-wall.jpg';
import bathroomWindow from '../assets/bathroom-frosted-window-installation.jpg';
import smallWindow from '../assets/bathroom-compact-window-tiled-wall.jpg';
import exterior from '../assets/building-exterior-window-installation.jpg';
import bathroomDetail from '../assets/bathroom-frosted-window-detail.jpg';
import glazingProgress from '../assets/grid-glazing-site-progress.jpg';
import terraceGlazing from '../assets/grid-glazing-terrace-view.jpg';
import loungeVideo from '../assets/compact-lounge-carpentry-walkthrough.mp4';
import livingVideo from '../assets/living-dining-interior-walkthrough.mp4';
import finishingVideo from '../assets/home-interior-finishing-walkthrough.mp4';
import panelsVideo from '../assets/grid-glazing-opening-panels.mp4';
import glazingVideo from '../assets/grid-glazing-window-walkthrough.mp4';

/** Client-supplied photographs. Captions describe visible details, not unverified specifications. */
export const photos = {
  sunset: { src: sunset, alt: 'Sunset through wide sliding windows at an interior installation site' },
  sunsetPhone: { src: sunsetPhone, alt: 'Portrait view of the panoramic sliding window installation at sunset' },
  bedroomWindow: { src: bedroomWindow, alt: 'New sliding window with protective frame film in an unfinished room' },
  livingWindow: { src: livingWindow, alt: 'Wide sliding window installation overlooking neighbouring buildings' },
  bedside: { src: bedside, alt: 'Wood-grain bed frame, floating bedside drawer and illuminated headboard' },
  woodBed: { src: woodBed, alt: 'Custom bed frame with rounded corners and a two-tone wood-grain headboard' },
  livingDining: { src: livingDining, alt: 'Living and dining space with a backlit sculpted wall, decorative ceiling and patterned entrance floor' },
  lounge: { src: lounge, alt: 'Compact lounge with a cream sofa, glass-top coffee table and teal built-in cabinets' },
  tealStorage: { src: tealStorage, alt: 'Teal arched cabinet doors with round wood-tone handles beside a sofa' },
  creamWardrobe: { src: creamWardrobe, alt: 'Cream panelled wardrobes and a black-and-white striped upholstered seat' },
  openGlazing: { src: openGlazing, alt: 'Tall grid-pattern glazing with outward-opening panels and a hillside view' },
  dressingWardrobe: { src: dressingWardrobe, alt: 'Full-height pale wardrobes with gold-tone handles and a botanical dressing niche' },
  windowFitout: { src: windowFitout, alt: 'Window installation during interior fit-out, with ceiling wiring and decorative panels on site' },
  wallPreparation: { src: wallPreparation, alt: 'Grid-style window in a room with wall preparation in progress' },
  greenBedroom: { src: greenBedroom, alt: 'Green upholstered headboard beneath a dark veined feature panel and wood-tone slats' },
  bathroomWindow: { src: bathroomWindow, alt: 'Bathroom installation with a frosted window, exhaust fan and dark wall surfaces' },
  smallWindow: { src: smallWindow, alt: 'Compact white-framed bathroom window set into a tiled wall' },
  exterior: { src: exterior, alt: 'Exterior of a building under construction with installed glazing' },
  bathroomDetail: { src: bathroomDetail, alt: 'Detail of a frosted bathroom window above concealed plumbing fittings' },
  glazingProgress: { src: glazingProgress, alt: 'Grid-pattern glazing seen during site installation' },
  terraceGlazing: { src: terraceGlazing, alt: 'Open glazed panels framing a terrace and green hillside' },
} as const;

export const photoAlt = (src: string) => Object.values(photos).find(photo => photo.src === src)?.alt;

export interface WorkVideo {
  id: string;
  title: string;
  label: string;
  src: string;
  poster: string;
  duration: string;
  description: string;
  service: string;
}

/** Durations verified from the original MP4 metadata. Files load only when a visitor chooses to play. */
export const workVideos: WorkVideo[] = [
  { id: 'living-dining', title: 'A walk through the living space', label: 'Interior work', src: livingVideo, poster: '/images/video-posters/living-dining.jpg', duration: '0:24', description: 'Explore the living and dining area, from the illuminated sculpted wall and prayer unit to the mirrored entrance and window-side seating.', service: 'Interior Work' },
  { id: 'compact-lounge', title: 'Compact room, considered storage', label: 'Furniture & carpentry', src: loungeVideo, poster: '/images/video-posters/compact-lounge.jpg', duration: '0:17', description: 'A closer look at the lounge: teal built-in cabinets, overhead storage, a cream sofa and a glass-top coffee table.', service: 'Furniture & Carpentry' },
  { id: 'interior-finishing', title: 'Inside an interior fit-out', label: 'Work in progress', src: finishingVideo, poster: '/images/video-posters/interior-finishing.jpg', duration: '2:07', description: 'An on-site walkthrough of rooms taking shape, showing colour accents, wall mouldings, cabinetry, ceiling details and bedroom furniture during finishing work.', service: 'Home Renovation' },
  { id: 'opening-panels', title: 'Glazing that opens to the view', label: 'Aluminium, glass & uPVC work', src: panelsVideo, poster: '/images/video-posters/opening-panels.jpg', duration: '0:08', description: 'See the grid-pattern window installation and its outward-opening glazed panels overlooking the terrace.', service: 'Aluminium, Glass & uPVC Work' },
  { id: 'window-walkthrough', title: 'The window installation, up close', label: 'Aluminium, glass & uPVC work', src: glazingVideo, poster: '/images/video-posters/window-walkthrough.jpg', duration: '0:13', description: 'A second view along the tall glazed wall, showing the frame divisions, open panels and the natural light entering the space.', service: 'Aluminium, Glass & uPVC Work' },
];
