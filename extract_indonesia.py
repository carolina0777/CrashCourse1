import pandas as pd
import json

def convert_to_geojson_indonesia(excel_file, output_file):
    df = pd.read_excel(excel_file)
    df = df.dropna(subset=['lat', 'long'])
    
    # Strip any extra spaces from country names
    df['Country_Clean'] = df['Country'].astype(str).str.strip()
    
    # Filter for Indonesia (including some common variations)
    indonesia_df = df[df['Country_Clean'].str.contains('Indonesia', case=False)]
    
    geojson = {
        "type": "FeatureCollection",
        "features": []
    }
    
    for _, row in indonesia_df.iterrows():
        # Handle date conversion
        began_date = pd.to_datetime(row['Began'], unit='ms').strftime('%Y-%m-%d') if pd.notnull(row['Began']) else "Unknown"
        
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [float(row['long']), float(row['lat'])]
            },
            "properties": {
                "id": str(row['ID']),
                "country": str(row['Country']).strip(),
                "began": began_date,
                "dead": int(row['Dead']) if pd.notnull(row['Dead']) else 0,
                "cause": str(row['MainCause']),
                "severity": float(row['Severity']) if pd.notnull(row['Severity']) else 0.0
            }
        }
        geojson['features'].append(feature)
    
    with open(output_file, 'w') as f:
        json.dump(geojson, f)
    
    print(f"Success: {len(indonesia_df)} Indonesia flood events saved to {output_file}")

if __name__ == "__main__":
    convert_to_geojson_indonesia('flood_archive.xlsx', 'indonesia_floods.geojson')
