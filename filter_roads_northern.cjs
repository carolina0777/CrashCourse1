const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({ input: fs.createReadStream('./raw_roads.geojson'), terminal: false });
const out = fs.createWriteStream('./data/roads_northern_tip.geojson');
out.write('{"type":"FeatureCollection","features":[\n');
let first = true;

// Regex for coordinates in Lon 13.x-14.x and Lat 12.x-13.x
const coordRegex = /\[\s*1[3-4]\.[0-9]+\s*,\s*1[2-3]\.[0-9]+\s*\]/;

rl.on('line', (line) => {
  if (line.includes('"type": "Feature"') && coordRegex.test(line)) {
    if (!first) out.write(',\n');
    let cleanLine = line.trim();
    if (cleanLine.endsWith(',')) cleanLine = cleanLine.slice(0, -1);
    out.write(cleanLine);
    first = false;
  }
});
rl.on('close', () => { out.write('\n]}'); console.log('Finished filtering northern roads.'); });
