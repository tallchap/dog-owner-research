# Dog Owner Research

Search SF dog registration records by breed for targeted marketing.

## Getting the Data

SF dog license data isn't publicly available online. Submit a public records request:

1. Go to [SF NextRequest](https://sanfrancisco.nextrequest.com/)
2. Create an account and submit a new request with this text:

> I am requesting all active dog license registrations held by SF Animal Care & Control, including the following fields: owner name, owner address, dog breed, dog sex, license number, spay/neuter status, and license expiration date. Please provide in CSV or Excel format.

3. Save the file to `data/` (it's gitignored — PII won't be committed)

## Usage

```bash
# Find all Yorkshire Terrier owners (default)
python search.py data/your_file.csv

# Filter by zip code prefix
python search.py data/your_file.csv --zip 941

# Search a different breed
python search.py data/your_file.csv --breed "Poodle"

# Summary stats only
python search.py data/your_file.csv --summary-only

# Custom output file
python search.py data/your_file.csv -o yorkie_owners.csv
```

## Test with sample data

```bash
python search.py data/sample.csv
```

## Install

```bash
pip install pandas
```
