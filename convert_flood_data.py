import pandas as pd
import json

def convert_to_geojson(excel_file, output_file):
    # Load the data
    df = pd.read_excel(excel_file)
    
    # Filter out rows missing latitude or longitude
    df = df.dropna(subset=['lat', 'long'])
    
    # Create GeoJSON structure
    geojson = {
        "type": "FeatureCollection",
        "features": []
    }
    
    for _, row in df.iterrows():
        # Handle date conversion from millisecond timestamps
        began_date = pd.to_datetime(row['Began'], unit='ms').strftime('%Y-%m-%d') if pd.notnull(row['Began']) else "Unknown"
        ended_date = pd.to_datetime(row['Ended'], unit='ms').strftime('%Y-%m-%d') if pd.notnull(row['Ended']) else "Unknown"
        
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [float(row['long']), float(row['lat'])]
            },
            "properties": {
                "id": str(row['ID']),
                "country": str(row['Country']),
                "began": began_date,
                "ended": ended_date,
                "dead": int(row['Dead']) if pd.notnull(row['Dead']) else 0,
                "displaced": int(row['Displaced']) if pd.notnull(row['Displaced']) else 0,
                "cause": str(row['MainCause']),
                "severity": float(row['Severity']) if pd.notnull(row['Severity']) else 0.0
            }
        }
        geojson['features'].append(feature)
    
    # Save the GeoJSON file
    with open(output_file, 'w') as f:
        json.dump(geojson, f)

if __name__ == "__main__":
    convert_to_geojson('flood_archive.xlsx', 'flood_data.geojson')
    print("Success: flood_data.geojson created.")
