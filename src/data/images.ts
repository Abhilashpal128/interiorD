/**
 * CENTRAL IMAGE LIBRARY
 * ---------------------
 * Every image used on the site is listed here. Replace a URL (or point it at /images/xyz.webp in client/public)
 * and every section that uses it updates automatically.
 *
 * Current images are Unsplash photo IDs (Unsplash licence permits commercial use, attribution appreciated).
 * They are DEMO stock photos - swap in your own project photography before launch.
 * If any URL fails to load, <SmartImage> shows /placeholder.svg instead of a broken image.
 */
export const unsplash = (id: string, width = 1200): string =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=70`;

export const IMG = {
  hero: unsplash('1600210492486-724fe5c67fb0', 1600),
  heroInset: unsplash('1556909114-f6e7ad7d3136', 900),
  living1: unsplash('1586023492125-27b2c045efd7'),
  living2: unsplash('1502672260266-1c1ef2d93688'),
  living3: unsplash('1600607687939-ce8a6c25118c'),
  living4: unsplash('1618221195710-dd6b41faaea6'),
  living5: unsplash('1555041469-a586c61ea9bc'),
  living6: unsplash('1600566753086-00f18fb6b3ea'),
  kitchen1: unsplash('1556909114-f6e7ad7d3136'),
  kitchen2: unsplash('1484154218962-a197022b5858'),
  kitchen3: unsplash('1556911220-bff31c812dba'),
  kitchen4: unsplash('1600489000022-c2086d79f9d4'),
  kitchen5: unsplash('1600585152220-90363fe7e115'),
  bedroom1: unsplash('1616594039964-ae9021a400a0'),
  bedroom2: unsplash('1540518614846-7eded433c457'),
  bedroom3: unsplash('1505693416388-ac5ce068fe85'),
  bedroom4: unsplash('1560185127-6ed189bf02f4'),
  bedroom5: unsplash('1522771739844-6a9f6d5f14af'),
  bath1: unsplash('1552321554-5fefe8c9ef14'),
  bath2: unsplash('1584622650111-993a426fbf0a'),
  bath3: unsplash('1620626011761-996317b8d101'),
  house1: unsplash('1600585154340-be6161a56a0c'),
  house2: unsplash('1600596542815-ffad4c1539a9'),
  house3: unsplash('1564013799919-ab600027ffc6'),
  house4: unsplash('1600607688969-a5bfcd646154'),
  apt1: unsplash('1493809842364-78817add7ffb'),
  apt2: unsplash('1522708323590-d24dbb6b0267'),
  apt3: unsplash('1512917774080-9991f1c4c750'),
  dining1: unsplash('1617806118233-18e1de247200'),
  dining2: unsplash('1600566752355-35792bedcfea'),
  wardrobe: unsplash('1595428774223-ef52624120d2'),
  ceiling: unsplash('1513694203232-719a280e022f'),
  lighting: unsplash('1600573472592-401b489a3cdc'),
  decor: unsplash('1618220179428-22790b461013'),
  construction: unsplash('1503387762-592deb58ef4e'),
  construction2: unsplash('1541888946425-d81bb19240f5'),
  planning: unsplash('1581094794329-c8112a89af12'),
  office1: unsplash('1497366216548-37526070297c'),
  office2: unsplash('1524758631624-e2822e304c36'),
  materialLaminate: unsplash('1615874959474-d609969a20ed', 900),
  materialAcrylic: unsplash('1600121848594-d8644e57abab', 900),
  materialVeneer: unsplash('1583847268964-b28dc8f51f92', 900),
  materialQuartz: unsplash('1631679706909-1844bbd07221', 900),
  materialMarble: unsplash('1615529328331-f8917597711f', 900),
  materialHardware: unsplash('1556909172-54557c7e4fb7', 900),
  materialLighting: unsplash('1600573472592-401b489a3cdc', 900),
  materialFlooring: unsplash('1581858726788-75bc0f6a952d', 900),
  materialPaint: unsplash('1562259949-e8e7689d7828', 900),
  beforeRoom: unsplash('1560448204-e02f11c3d0e2'),
  afterRoom: unsplash('1600210492486-724fe5c67fb0'),
} as const;

export const FALLBACK_IMAGE = '/placeholder.svg';
