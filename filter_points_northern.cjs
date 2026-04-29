const fs = require('fs');
const BBOX = { minLon: 13.0, maxLon: 14.8, minLat: 12.5, maxLat: 13.8 };

function filterFile(input, output) {
    const data = JSON.parse(fs.readFileSync(input, 'utf8'));
    const filtered = data.features.filter(f => {
        const coords = f.geometry.coordinates;
        const lon = coords[0];
        const lat = coords[1];
        return lon >= BBOX.minLon && lon <= BBOX.maxLon && lat >= BBOX.minLat && lat <= BBOX.maxLat;
    });
    const outputData = Object.assign({}, data);
    outputData.features = filtered;
    fs.writeFileSync(output, JSON.stringify(outputData, null, 2));
    console.log("Filtered " + input + ": " + data.features.length + " -> " + filtered.length);
}

filterFile('./data/schools_filtered.geojson', './data/schools_northern_tip.geojson');
filterFile('./data/populated_places_filtered.geojson', './data/populated_places_northern_tip.geojson');
