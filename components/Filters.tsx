import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Filters = ({ filters, setFilters }: any) => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get("https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=100");
        const langs = Array.from(
          new Set(res.data.items.map((repo: any) => repo.language).filter(Boolean))
        );
        setLanguages(langs);
      } catch (error) {
        console.error("Failed to fetch languages");
      }
    };
    fetchLanguages();
  }, []);

  return (
    <div className="search-box">
      <select
        value={filters.language}
        onChange={(e) => setFilters((prev: any) => ({ ...prev, language: e.target.value }))}
      >
        <option value="">All Languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Stars (e.g., >1000)"
        value={filters.stars}
        onChange={(e) => setFilters((prev: any) => ({ ...prev, stars: e.target.value }))}
      />

      <DatePicker
        selected={date}
        onChange={(date: Date | null) => {
          setDate(date);
          if (date) {
            setFilters((prev: any) => ({
              ...prev,
              created: `>${date.toISOString().split("T")[0]}`
            }));
          }
        }}
        placeholderText="Created after"
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};

export default Filters;
