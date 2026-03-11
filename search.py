#!/usr/bin/env python3
"""Search SF dog registration records by breed for marketing research."""

import argparse
import pandas as pd
import sys


def load_data(filepath):
    """Load CSV and normalize column names."""
    try:
        df = pd.read_csv(filepath)
    except FileNotFoundError:
        print(f"Error: File not found: {filepath}")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading CSV: {e}")
        sys.exit(1)

    # Normalize column names: strip whitespace, lowercase
    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "")
    return df


def find_breed_column(df):
    """Find the column that contains breed data."""
    for col in df.columns:
        if "breed" in col:
            return col
    print("Error: No 'breed' column found in CSV.")
    print(f"Available columns: {', '.join(df.columns)}")
    sys.exit(1)


def find_zip_column(df):
    """Find the column that contains zip code data."""
    for col in df.columns:
        if "zip" in col or "postal" in col:
            return col
    return None


def search_by_breed(df, breed_col, breed):
    """Filter rows where breed column contains the search term (case-insensitive)."""
    return df[df[breed_col].astype(str).str.contains(breed, case=False, na=False)]


def print_summary(df, breed_df, breed, zip_col):
    """Print formatted summary statistics."""
    print("=" * 72)
    print(f'SF Dog Registration Search — "{breed}"')
    print("=" * 72)
    print()
    print(f"  Dataset:  {len(df):,} total registrations")
    print(f"  Matches:  {len(breed_df):,} {breed} owners")
    print()

    if len(breed_df) == 0:
        print("  No matching records found.")
        print()
        return

    if zip_col:
        zip_counts = breed_df[zip_col].astype(str).value_counts().head(15)
        print("  GEOGRAPHIC BREAKDOWN")
        print("  " + "-" * 50)
        print(f"  {'Zip Code':<14}{'Count':>6}    {'% of Matches':>12}")
        for zipcode, count in zip_counts.items():
            pct = count / len(breed_df) * 100
            print(f"  {zipcode:<14}{count:>6}    {pct:>11.1f}%")
        print()


def print_results(breed_df, limit=50):
    """Print matching records in formatted table."""
    if len(breed_df) == 0:
        return

    display_df = breed_df.head(limit)
    showing = f"first {limit} of {len(breed_df)}" if len(breed_df) > limit else f"all {len(breed_df)}"
    print(f"  RESULTS ({showing})")
    print("  " + "-" * 68)

    # Find relevant columns to display
    name_col = next((c for c in breed_df.columns if "name" in c and "owner" in c),
                    next((c for c in breed_df.columns if "name" in c), None))
    addr_col = next((c for c in breed_df.columns if "addr" in c), None)
    zip_col = next((c for c in breed_df.columns if "zip" in c or "postal" in c), None)
    sex_col = next((c for c in breed_df.columns if c == "sex"), None)
    spay_col = next((c for c in breed_df.columns if "spay" in c or "neuter" in c), None)

    # Header
    header = f"  {'Name':<24}"
    if addr_col:
        header += f"{'Address':<30}"
    if zip_col:
        header += f"{'Zip':<8}"
    if sex_col:
        header += f"{'Sex':<5}"
    if spay_col:
        header += f"{'Fixed':<6}"
    print(header)

    for _, row in display_df.iterrows():
        line = "  "
        if name_col:
            line += f"{str(row.get(name_col, ''))[:22]:<24}"
        if addr_col:
            line += f"{str(row.get(addr_col, ''))[:28]:<30}"
        if zip_col:
            line += f"{str(row.get(zip_col, '')):<8}"
        if sex_col:
            line += f"{str(row.get(sex_col, '')):<5}"
        if spay_col:
            line += f"{str(row.get(spay_col, '')):<6}"
        print(line)

    print("  " + "-" * 68)
    print()


def export_results(breed_df, output_path):
    """Export filtered results to CSV."""
    breed_df.to_csv(output_path, index=False)
    print(f"  Exported {len(breed_df):,} records to: {output_path}")
    print()


def main():
    parser = argparse.ArgumentParser(
        description="Search SF dog registration records by breed"
    )
    parser.add_argument("csv_file", help="Path to the dog registration CSV")
    parser.add_argument(
        "--breed",
        default="Yorkshire Terrier",
        help='Breed to search for (default: "Yorkshire Terrier")',
    )
    parser.add_argument("--output", "-o", help="Output CSV path")
    parser.add_argument("--zip", help="Filter by zip code prefix (e.g., 941)")
    parser.add_argument(
        "--summary-only",
        action="store_true",
        help="Only show summary stats, not individual records",
    )
    args = parser.parse_args()

    df = load_data(args.csv_file)
    breed_col = find_breed_column(df)
    zip_col = find_zip_column(df)

    breed_df = search_by_breed(df, breed_col, args.breed)

    if args.zip and zip_col:
        breed_df = breed_df[
            breed_df[zip_col].astype(str).str.startswith(args.zip)
        ]

    print()
    print_summary(df, breed_df, args.breed, zip_col)

    if not args.summary_only:
        print_results(breed_df)

    if len(breed_df) > 0:
        output_path = args.output or f"results_{args.breed.lower().replace(' ', '_')}.csv"
        export_results(breed_df, output_path)


if __name__ == "__main__":
    main()
