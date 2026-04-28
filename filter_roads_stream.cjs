const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./raw_roads.geojson'),
  terminal: false
});

const out = fs.createWriteStream('./data/roads_lines_filtered.geojson');
out.write('{"type":"FeatureCollection","features":[\n');

let first = true;
const coordRegex = /\[\s*1([1-3]\.[0-9]+|4\.[0-4][0-9]*)\s*,\s*1([0-2]\.[0-9]+|3\.[0-5][0-9]*)\s*\]/;
const importantRoads = ['trunk', 'primary', 'secondary', 'tertiary', 'residential', 'unclassified', 'trunk_link', 'primary_link', 'secondary_link', 'tertiary_link'];

rl.on('line', (line) => {
  if (line.includes('"type": "Feature"')) {
    if (coordRegex.test(line)) {
      const isImportant = importantRoads.some(type => line.includes(`"highway": "${type}"`));
      if (isImportant) {
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
  console.log('Finished filtering road lines.');
});
