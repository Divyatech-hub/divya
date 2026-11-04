// Downloads Natural Earth 1:110m country outlines (public domain) and writes a compact
// version for the globe: { iso, rings } with coordinates rounded to 0.1°.
// usage: node scripts/build-countries.mjs
import fs from "node:fs";

const SRC =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";
const OUT = new URL("../public/geo/countries-110m.json", import.meta.url);

const geo = await (await fetch(SRC)).json();
const round = (n) => Math.round(n * 10) / 10;

const countries = geo.features.map((f) => {
  const { type, coordinates } = f.geometry;
  // Polygon = [ring, hole, ...]; MultiPolygon = [polygon, polygon, ...]. Keep outer rings only.
  const polygons = type === "Polygon" ? [coordinates] : coordinates;
  const rings = polygons.map((poly) => poly[0].map(([lng, lat]) => [round(lng), round(lat)]));
  // ISO_A2 is "-99" for a few countries (france, norway); ISO_A2_EH fills those in
  const iso = f.properties.ISO_A2_EH !== "-99" ? f.properties.ISO_A2_EH : f.properties.ISO_A2;
  return { iso, name: f.properties.NAME, rings };
});

fs.mkdirSync(new URL("../public/geo/", import.meta.url), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(countries));
console.log(`wrote ${countries.length} countries, ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`);
