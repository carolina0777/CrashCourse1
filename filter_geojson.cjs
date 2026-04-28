const fs = require('fs');
const path = require('path');
const BBOX = { minLon: 11.0, maxLon: 14.5, minLat: 10.0, maxLat: 13.5 };
function isInside(coord) {
    if (!Array.isArray(coord) || coord.length < 2) return false;
    const [lon, lat] = coord;
    return lon >= BBOX.minLon && lon <= BBOX.maxLon && lat >= BBOX.minLat && lat <= BBOX.maxLat;
}
function hasPointInBBox(geometry) {
    if (!geometry || !geometry.coordinates) return false;
    const coords = geometry.coordinates.flat(Infinity);
    for (let i = 0; i < coords.length; i += 2) {
        if (isInside([coords[i], coords[i+1]])) return true;
    }
    return false;
}
function filterGeoJSON(inputPath, outputPath) {
    console.log(`\nProcessing: ${path.basename(inputPath)}`);
    if (!fs.existsSync(inputPath)) { console.error(`Error: File not found: ${inputPath}`); return; }
    const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    const originalCount = data.features.length;
    const filteredFeatures = data.features.filter(f => {
        try { return hasPointInBBox(f.geometry); } catch (e) { return false; }
    });
    fs.writeFileSync(outputPath, JSON.stringify({...data, features: filteredFeatures}, null, 2));
    console.log(`- Original: ${originalCount} | Filtered: ${filteredFeatures.length}`);
    console.log(`- Saved to: ${outputPath}`);
}
const [,, input, output] = process.argv;
if (!input || !output) console.log("Usage: node filter_geojson.js <in> <out>");
else filterGeoJSON(input, output);
