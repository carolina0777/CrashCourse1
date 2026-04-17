import pandas as pd

def clean_data(input_file, output_file):
    # Load the CSV
    df = pd.read_excel('data/flood_archive.xlsx') if input_file.endswith('.xlsx') else pd.read_csv(input_file)
    
    # Standardize column names (stripping whitespace)
    df.columns = df.columns.str.strip()
    
    # Handle dates - convert to datetime and extract Year
    # Some dates might be numeric (Excel timestamps) or strings
    if 'Began' in df.columns:
        df['Began'] = pd.to_datetime(df['Began'], errors='coerce')
        df['Year'] = df['Began'].dt.year
    
    # Fill missing Displaced with 0 for the chart
    if 'Displaced' in df.columns:
        df['Displaced'] = pd.to_numeric(df['Displaced'], errors='coerce').fillna(0)
    
    # Save the cleaned version
    df.to_csv(output_file, index=False)
    print(f"Cleaned data saved to {output_file}")

if __name__ == "__main__":
    # Using the original CSV file
    clean_data('floodarchive.csv', 'public/floodarchive_cleaned.csv')
