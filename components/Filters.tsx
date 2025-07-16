import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "../hooks/useDebounce";
import { useRepoStore } from "../pages/index"; // Import the zustand store

const Filters = () => {
  const {
    filters,
    setFilters,
    reset: resetFilters,
  } = useRepoStore();

  const [languages, setLanguages] = useState<string[]>([]);
  const [date, setDate] = useState(filters.created || "");
  const [tempStars, setTempStars] = useState(filters.stars);
  const debouncedStars = useDebounce(tempStars, 500);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get("https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=100");
        const langs = Array.from(
          new Set(res.data.items.map((repo: any) => repo.language).filter(Boolean))
        );
        setLanguages(langs);
      } catch {
      }
    };
    fetchLanguages();
  }, []);

  const handleReset = () => {
    resetFilters();
    setDate("");
    setTempStars("");
  };

  useEffect(() => {
    setFilters({ stars: debouncedStars });
  }, [debouncedStars, setFilters]);

  useEffect(() => {
    setFilters({ created: date });
  }, [date, setFilters]);

  return (
    <section
      className="bg-gray-50 rounded-lg shadow p-4 mb-6"
      aria-labelledby="filter-heading"
    >
      <h2 id="filter-heading" className="text-lg font-semibold mb-3">
        Filter
      </h2>
      <form
        className="flex flex-col md:flex-row gap-4 items-stretch w-full"
        role="search"
        aria-label="Repository filters"
        onSubmit={e => e.preventDefault()}
      >
        <div className="w-full md:w-1/3 flex flex-col">
          <label htmlFor="language-select" className="mb-1 font-medium text-gray-700">
            Language
          </label>
          <select
            id="language-select"
            value={filters.language}
            onChange={(e) => setFilters({ language: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
            aria-label="Filter by language"
          >
            <option value="">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/3 flex flex-col">
          <label htmlFor="stars-input" className="mb-1 font-medium text-gray-700">
            Minimum Stars
          </label>
          <input
            id="stars-input"
            type="number"
            placeholder="e.g. 100"
            value={tempStars}
            onChange={(e) => setTempStars(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
            aria-label="Minimum stars"
            min={0}
          />
        </div>

        <div className="w-full md:w-1/3 flex flex-col">
          <label htmlFor="created-date" className="mb-1 font-medium text-gray-700">
            Created After
          </label>
          <input
            id="created-date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
            aria-label="Created after date"
            max={new Date().toISOString().split("T")[0]}
            placeholder="YYYY-MM-DD"
          />
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition h-11 mt-6 md:mt-0"
            aria-label="Reset filters"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filters;