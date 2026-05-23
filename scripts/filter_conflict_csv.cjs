const fs = require('fs');
const readline = require('readline');

const BBOX = { minLon: 13.0, maxLon: 14.8, minLat: 12.5, maxLat: 13.8 };

const rl = readline.createInterface({
    input: fs.createReadStream('data/raw/conflict_events.csv'),
    terminal: false
});

const out = fs.createWriteStream('data/cleaned/conflict_northern_tip.csv');

let header = null;
let latIdx = -1;
let lonIdx = -1;

function parseCSVLine(line) {
    const result = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuote && line[i + 1] === '"') {
                cur += '"';
                i++;
            } else {
                inQuote = !inQuote;
            }
        } else if (char === ',' && !inQuote) {
            result.push(cur);
            cur = '';
        } else {
            cur += char;
        }
    }
    result.push(cur);
    return result;
}

rl.on('line', (line) => {
    if (!header) {
        header = line;
        out.write(header + '\n');
        const cols = parseCSVLine(line);
        latIdx = cols.indexOf('latitude');
        lonIdx = cols.indexOf('longitude');
        console.log(`Found columns: latitude at ${latIdx}, longitude at ${lonIdx}`);
        return;
    }

    const cols = parseCSVLine(line);
    if (cols.length > Math.max(latIdx, lonIdx)) {
        const lat = parseFloat(cols[latIdx]);
        const lon = parseFloat(cols[lonIdx]);

        if (lon >= BBOX.minLon && lon <= BBOX.maxLon && lat >= BBOX.minLat && lat <= BBOX.maxLat) {
            out.write(line + '\n');
        }
    }
});

rl.on('close', () => {
    console.log('Finished filtering conflict CSV.');
});
