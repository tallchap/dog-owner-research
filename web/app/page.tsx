"use client";

import { useState, useMemo } from "react";
import { records, breeds, zips, PetLicense } from "./data";

const PAGE_SIZE = 100;

export default function Home() {
  const [search, setSearch] = useState("");
  const [breedFilter, setBreedFilter] = useState("");
  const [zipFilter, setZipFilter] = useState("");
  const [sortCol, setSortCol] = useState<keyof PetLicense>("animalName");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let results = records;

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (r) =>
          r.animalName.toLowerCase().includes(q) ||
          r.primaryBreed.toLowerCase().includes(q) ||
          r.secondaryBreed.toLowerCase().includes(q) ||
          r.licenseNumber.toLowerCase().includes(q) ||
          r.zip.includes(q)
      );
    }

    if (breedFilter) {
      results = results.filter((r) =>
        r.primaryBreed.toLowerCase().includes(breedFilter.toLowerCase())
      );
    }
    if (zipFilter) {
      results = results.filter((r) => r.zip === zipFilter);
    }

    results = [...results].sort((a, b) => {
      const aVal = a[sortCol];
      const bVal = b[sortCol];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return 0;
    });

    return results;
  }, [search, breedFilter, zipFilter, sortCol, sortAsc]);

  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const yorkieCount = records.filter((r) =>
    r.primaryBreed.toLowerCase().includes("yorkshire")
  ).length;

  const handleSort = (col: keyof PetLicense) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
    setPage(0);
  };

  const sortIcon = (col: keyof PetLicense) => {
    if (sortCol !== col) return " \u2195";
    return sortAsc ? " \u2191" : " \u2193";
  };

  const clearFilters = () => {
    setSearch("");
    setBreedFilter("");
    setZipFilter("");
    setPage(0);
  };

  const hasFilters = search || breedFilter || zipFilter;

  const isYorkie = (r: PetLicense) =>
    r.primaryBreed.toLowerCase().includes("yorkshire");

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dog Owner Research
        </h1>
        <p className="text-gray-500">
          Searchable database of{" "}
          <span className="font-semibold">{records.length.toLocaleString()}</span>{" "}
          Seattle pet license records ({yorkieCount} Yorkies).
          Source: Seattle Open Data.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border p-4">
          <div className="text-2xl font-bold text-gray-900">
            {records.length.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Total Dogs</div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-2xl font-bold text-purple-600">
            {yorkieCount}
          </div>
          <div className="text-sm text-gray-500">Yorkshire Terriers</div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-2xl font-bold text-gray-900">
            {breeds.length}
          </div>
          <div className="text-sm text-gray-500">Unique Breeds</div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-2xl font-bold text-blue-600">
            {filtered.length.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Matching Results</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Search pet name, breed, license #, zip..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={breedFilter}
            onChange={(e) => { setBreedFilter(e.target.value); setPage(0); }}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Breeds</option>
            <option value="Yorkshire Terrier">Yorkshire Terrier</option>
            {breeds.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <select
            value={zipFilter}
            onChange={(e) => { setZipFilter(e.target.value); setPage(0); }}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Zip Codes</option>
            {zips.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="mt-3 text-sm text-purple-600 hover:text-purple-800 underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              {(
                [
                  ["licenseDate", "License Date"],
                  ["licenseNumber", "License #"],
                  ["animalName", "Pet Name"],
                  ["primaryBreed", "Primary Breed"],
                  ["secondaryBreed", "Secondary Breed"],
                  ["zip", "ZIP Code"],
                ] as [keyof PetLicense, string][]
              ).map(([col, label]) => (
                <th
                  key={col}
                  onClick={() => handleSort(col)}
                  className="px-4 py-3 text-left font-medium text-gray-600 cursor-pointer hover:text-gray-900 select-none whitespace-nowrap"
                >
                  {label}
                  <span className="text-gray-400">{sortIcon(col)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((r, i) => (
              <tr
                key={r.licenseNumber + i}
                className={`border-b hover:bg-purple-50 transition-colors ${
                  isYorkie(r) ? "bg-purple-50/50" : ""
                }`}
              >
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {r.licenseDate}
                </td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                  {r.licenseNumber}
                </td>
                <td className="px-4 py-3 font-medium">{r.animalName}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      isYorkie(r)
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {r.primaryBreed}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {r.secondaryBreed}
                </td>
                <td className="px-4 py-3 text-gray-500">{r.zip}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No records match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Showing {page * PAGE_SIZE + 1}&ndash;{Math.min((page + 1) * PAGE_SIZE, filtered.length)}{" "}
            of {filtered.length.toLocaleString()}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-30 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-30 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-gray-400 text-center">
        Data from Seattle Open Data (data.seattle.gov). First 5,000 dog license records.
      </p>
    </main>
  );
}
