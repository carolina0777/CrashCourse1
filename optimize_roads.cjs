const fs = require('fs');
const readline = require('readline');

// Input is our current filtered file
const rl = readline.createInterface({
  input: fs.createReadStream('./data/roads_lines_filtered.geojson'),
  terminal: false
});

const out = fs.createWriteStream('./data/roads_final_optimized.geojson');
out.write('{"type":"FeatureCollection","features":[\n');

let first = true;
// We keep ONLY the core structural roads for the region
const importantTypes = ['trunk', 'primary', 'secondary', 'tertiary'];

rl.on('line', (line) => {
  if (line.includes('"type": "Feature"')) {
    const isImportant = importantTypes.some(type => line.includes(`"highway": "${type}"`));
    
    if (isImportant) {
      if (!first) out.write(',\n');
      let cleanLine = line.trim();
      if (cleanLine.endsWith(',')) cleanLine = cleanLine.slice(0, -1);
      out.write(cleanLine);
      first = false;
    }
  }
});

rl.on('close', () => {
  out.write('\n]}');
  console.log('Finished optimizing roads.');
});
