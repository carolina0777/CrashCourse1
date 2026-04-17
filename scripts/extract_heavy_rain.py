import pandas as pd

def extract_heavy_rain_data(input_file, output_file):
    # Load the data
    df = pd.read_csv(input_file)
    
    # Standardize column names
    df.columns = df.columns.str.strip()
    
    # Convert 'Began' to datetime and extract Year
    df['Began'] = pd.to_datetime(df['Began'], errors='coerce')
    df['Year'] = df['Began'].dt.year
    
    # Filter for 'Heavy rain' (case-insensitive)
    # We use .str.contains to catch variations if any, or .str.lower() == 'heavy rain'
    is_heavy_rain = df['MainCause'].str.lower().str.strip() == 'heavy rain'
    
    # Filter for years 2010 to 2021
    is_in_range = (df['Year'] >= 2010) & (df['Year'] <= 2021)
    
    filtered_df = df[is_heavy_rain & is_in_range]
    
    # Save to new CSV
    filtered_df.to_csv(output_file, index=False)
    print(f"Extracted {len(filtered_df)} events to {output_file}")

if __name__ == "__main__":
    extract_heavy_rain_data('floodarchive.csv', 'data/heavy_rain_2010_2021.csv')
