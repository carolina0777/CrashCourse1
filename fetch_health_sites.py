import requests
import json

def fetch_indonesia_health_sites():
    overpass_url = "https://overpass-api.de/api/interpreter"
    
    # Query for all of Indonesia
    overpass_query = """
    [out:json][timeout:300];
    area["name"="Indonesia"]->.searchArea;
    (
      node["amenity"~"hospital|clinic|pharmacy"](area.searchArea);
      node["healthcare"~"hospital|clinic|centre"](area.searchArea);
    );
    out body;
    """
    
    print("Fetching ALL Indonesia health sites from Overpass API...")
    response = requests.post(overpass_url, data={'data': overpass_query})
    
    if response.status_code != 200:
        print(f"Error: Overpass API returned status code {response.status_code}")
        return

    data = response.json()
    elements = data.get('elements', [])
    
    geojson = {
        "type": "FeatureCollection",
        "features": []
    }
    
    for element in elements:
        if element['type'] == 'node':
            feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [element['lon'], element['lat']]
                },
                "properties": element.get('tags', {})
            }
            if 'name' not in feature['properties']:
                feature['properties']['name'] = "Unnamed Facility"
            
            geojson['features'].append(feature)
    
    output_file = 'public/indonesia_health_sites.geojson'
    with open(output_file, 'w') as f:
        json.dump(geojson, f)
    
    print(f"Success: {len(geojson['features'])} health sites saved to {output_file}")

if __name__ == "__main__":
    fetch_indonesia_health_sites()
