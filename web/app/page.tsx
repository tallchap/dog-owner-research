"use client";

import { useState, useMemo } from "react";
import { sampleRecords, breeds, neighborhoods, zips, DogRecord } from "./data";

export default function Home() {
  const [search, setSearch] = useState("");
  const [breedFilter, setBreedFilter] = useState("");
  const [neighborhoodFilter, setNeighborhoodFilter] = useState("");
  const [zipFilter, setZipFilter] = useState("");
  const [sortCol, setSortCol] = useState<keyof DogRecord>("ownerName");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    let results = sampleRecords;

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (r) =>
          r.ownerName.toLowerCase().includes(q) ||
          r.dogName.toLowerCase().includes(q) ||
          r.breed.toLowerCase().includes(q) ||
          r.address.toLowerCase().includes(q) ||
          r.neighborhood.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q)
      );
    }

    if (breedFilter) {
      results = results.filter((r) =>
        r.breed.toLowerCase().includes(breedFilter.toLowerCase())
      );
    }
    if (neighborhoodFilter) {
      results = results.filter((r) => r.neighborhood === neighborhoodFilter);
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
  }, [search, breedFilter, neighborhoodFilter, zipFilter, sortCol, sortAsc]);

  const yorkieCount = sampleRecords.filter((r) =>
    r.breed.toLowerCase().includes("yorkshire")
  ).length;

  const handleSort = (col: keyof DogRecord) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
  };

  const sortIcon = (col: keyof DogRecord) => {
    if (sortCol !== col) return " \u2195";
    return sortAsc ? " \u2191" : " \u2193";
  };

  const clearFilters = () => {
    setSearch("");
    setBreedFilter("");
    setNeighborhoodFilter("");
    setZipFilter("");
  };

  const hasFilters = search || breedFilter || neighborhoodFilter || zipFilter;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          SF Dog Owner Research
        </h1>
        <p className="text-gray-500">
          Search SF dog registration records by breed, neighborhood, or owner.
          Currently showing{" "}
          <span className="font-semibold">{sampleRecords.length}</span> sample
          records ({yorkieCount} Yorkies).
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border p-4">
          <div className="text-2xl font-bold text-gray-900">
            {sampleRecords.length}
          </div>
          <div className="text-sm text-gray-500">Total Records</div>
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
            {filtered.length}
          </div>
          <div className="text-sm text-gray-500">Matching Results</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Search name, dog, breed, address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={breedFilter}
            onChange={(e) => setBreedFilter(e.target.value)}
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
            value={neighborhoodFilter}
            onChange={(e) => setNeighborhoodFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Neighborhoods</option>
            {neighborhoods.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <select
            value={zipFilter}
            onChange={(e) => setZipFilter(e.target.value)}
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
                  ["id", "License #"],
                  ["ownerName", "Owner"],
                  ["address", "Address"],
                  ["neighborhood", "Neighborhood"],
                  ["zip", "Zip"],
                  ["breed", "Breed"],
                  ["dogName", "Dog Name"],
                  ["sex", "Sex"],
                ] as [keyof DogRecord, string][]
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
              <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">
                Fixed
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.id}
                className={`border-b hover:bg-purple-50 transition-colors ${
                  r.breed.toLowerCase().includes("yorkshire")
                    ? "bg-purple-50/50"
                    : ""
                }`}
              >
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                  {r.id}
                </td>
                <td className="px-4 py-3 font-medium">{r.ownerName}</td>
                <td className="px-4 py-3 text-gray-600">{r.address}</td>
                <td className="px-4 py-3 text-gray-600">{r.neighborhood}</td>
                <td className="px-4 py-3 text-gray-500">{r.zip}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      r.breed.toLowerCase().includes("yorkshire")
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {r.breed}
                  </span>
                </td>
                <td className="px-4 py-3">{r.dogName}</td>
                <td className="px-4 py-3 text-gray-500">
                  {r.sex === "M" ? "Male" : "Female"}
                </td>
                <td className="px-4 py-3">
                  {r.spayedNeutered ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                  No records match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-gray-400 text-center">
        Sample data for demonstration. Replace with real SF dog license records
        obtained via public records request.
      </p>
    </main>
  );
}
