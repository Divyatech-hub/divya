// Lat/lng math shared by the globe scene and its textures.
// The textures are equirectangular: x runs with longitude, y with latitude.
// That matches how three's SphereGeometry wraps UVs, so a point painted on the
// canvas lands on the same spot as a point placed in 3D with latLngToVector3.

export type Country = { iso: string; name: string; rings: [number, number][][] };

// ─────────────────────────────────────────────────────────────────────────────
// DIV: try this (day 2). Rewrite latLngToVector3 yourself.
// Spec: lat (−90..90) and lng (−180..180) in degrees, radius r → [x, y, z].
//   1. theta = angle down from the north pole, phi = angle around the equator
//      (both in radians). theta is 0 at lat 90. phi is 0 at lng −180.
//   2. three's SphereGeometry puts a point at:
//        x = −r · cos(phi) · sin(theta),  y = r · cos(theta),  z = r · sin(phi) · sin(theta)
//   3. check: chennai (13.08, 80.27) should land on the side facing the camera when the
//      globe turns to it, and the pin should sit on top of india in the painting layer.
// This is spherical coordinates, straight out of your math minor.
// ─────────────────────────────────────────────────────────────────────────────
export function latLngToVector3(lat: number, lng: number, r = 1): [number, number, number] {
  const theta = ((90 - lat) * Math.PI) / 180;
  const phi = ((lng + 180) * Math.PI) / 180;
  return [-r * Math.cos(phi) * Math.sin(theta), r * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta)];
}

/** Globe rotation (x then y) that turns a lat/lng to face the camera at +z. */
export function rotationToFace(lat: number, lng: number) {
  const [x, , z] = latLngToVector3(0, lng);
  return { x: (lat * Math.PI) / 180, y: -Math.atan2(x, z) };
}

/** lng/lat → pixel on an equirectangular canvas of size W×H */
export const toCanvas = (lng: number, lat: number, W: number, H: number): [number, number] => [
  ((lng + 180) / 360) * W,
  ((90 - lat) / 180) * H,
];

/** Adds every outer ring of a country to the current canvas path. */
export function traceCountry(ctx: CanvasRenderingContext2D, country: Country, W: number, H: number) {
  for (const ring of country.rings) {
    ring.forEach(([lng, lat], i) => {
      const [x, y] = toCanvas(lng, lat, W, H);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
  }
}

/** Pixel bounding box of a country on the canvas. */
export function countryBox(country: Country, W: number, H: number) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const ring of country.rings) {
    for (const [lng, lat] of ring) {
      const [x, y] = toCanvas(lng, lat, W, H);
      x0 = Math.min(x0, x); y0 = Math.min(y0, y);
      x1 = Math.max(x1, x); y1 = Math.max(y1, y);
    }
  }
  return { x0, y0, x1, y1 };
}

export const CONTINENT: Record<string, string> = {
  IN: "asia",
  AE: "asia",
  CH: "europe",
  US: "north america",
};
