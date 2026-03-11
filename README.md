# Dog Owner Research

Searchable database of pet license records. Currently loaded with 5,000 real dog records from Seattle Open Data.

## Web UI

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000 — filter by breed, ZIP code, or search by pet name.

## Python CLI

```bash
pip install pandas

# Search Seattle data for Yorkies
python search.py data/sample.csv

# Filter by ZIP prefix
python search.py data/sample.csv --zip 981

# Different breed
python search.py data/sample.csv --breed "Poodle"

# Stats only
python search.py data/sample.csv --summary-only
```

## Data Source

5,000 dog license records from [Seattle Open Data](https://data.seattle.gov/Community/Seattle-Pet-Licenses/jguv-t9rb).

Fields: License Date, License Number, Pet Name, Primary Breed, Secondary Breed, ZIP Code.

No owner PII (name/address) — public open data has this stripped. For owner contact info, file a public records request with the relevant city.
