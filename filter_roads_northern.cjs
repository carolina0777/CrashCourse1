const fs = require('fs');
const readline = require('readline');
const BBOX = { minLon: 13.0, maxLon: 14.8, minLat: 12.5, maxLat: 13.8 };

const rl = readline.createInterface({
  input: fs.createReadStream('./raw_roads.geojson'),
  terminal: false
});

const out = fs.createWriteStream('./data/roads_northern_tip.geojson');
out.write('{"type":"FeatureCollection","features":[\n');
let first = true;

rl.on('line', (line) => {
  if (line.includes('"type": "Feature"')) {
      // Find coordinates in the string manually for speed without JSON.parse on every line
      const coordMatch = line.match(/\[\s*([0-9]+\.[0-9]+)\s*,\s*([0-9]+\.[0-9]+)\s*\]/);
      if (coordMatch) {
          const lon = parseFloat(coordMatch[1]);
          const lat = parseFloat(coordMatch[2]);
          
          if (lon >= BBOX.minLon && lon <= BBOX.maxLon && lat >= BBOX.minLat && lat <= BBOX.maxLat) {
              if (!first) out.write(',\n');
              let cleanLine = line.trim();
              if (cleanLine.endsWith(',')) cleanLine = cleanLine.slice(0, -1);
              out.write(cleanLine);
              first = false;
          }
      }
  }
});

rl.on('close', () => {
  out.write('\n]}');
  console.log('Finished strictly filtering northern roads.');
});
