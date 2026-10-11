import type { Material } from '../types';
import { IMG } from './images';

/** DEMO materials - indicative price tiers only, not quotations. Edit freely. */
export const materials: Material[] = [
  { id: 'laminate', name: 'Laminate', description: 'Durable, wide range of colours and textures, easy to maintain.', priceTier: '₹', bestFor: 'Wardrobes, kitchen shutters, TV units', image: IMG.materialLaminate },
  { id: 'acrylic', name: 'Acrylic', description: 'High-gloss or matte finish with a deep, seamless look.', priceTier: '₹₹', bestFor: 'Modular kitchen shutters', image: IMG.materialAcrylic },
  { id: 'veneer', name: 'Veneer', description: 'Real wood surface for natural grain and a premium feel.', priceTier: '₹₹₹', bestFor: 'Panelling, doors, statement units', image: IMG.materialVeneer },
  { id: 'quartz', name: 'Quartz', description: 'Engineered stone counters that resist stains and scratches.', priceTier: '₹₹₹', bestFor: 'Kitchen counters, vanities', image: IMG.materialQuartz },
  { id: 'marble', name: 'Marble', description: 'Natural stone with unique veining, needs periodic care.', priceTier: '₹₹₹₹', bestFor: 'Flooring, feature walls, tables', image: IMG.materialMarble },
  { id: 'hardware', name: 'Hardware', description: 'Soft-close hinges, channels and fittings that define daily feel.', priceTier: '₹₹', bestFor: 'Kitchens and wardrobes', image: IMG.materialHardware },
  { id: 'lighting', name: 'Lighting', description: 'Ambient, task and accent fixtures planned as layers.', priceTier: '₹₹', bestFor: 'Living areas, bedrooms, kitchens', image: IMG.materialLighting },
  { id: 'flooring', name: 'Flooring', description: 'Vitrified tiles, engineered wood or stone for different budgets.', priceTier: '₹₹–₹₹₹₹', bestFor: 'Whole-home flooring', image: IMG.materialFlooring },
  { id: 'paint', name: 'Paint & wall finishes', description: 'Washable emulsions, textured and lime-wash style finishes.', priceTier: '₹–₹₹₹', bestFor: 'Walls and ceilings', image: IMG.materialPaint },
];
