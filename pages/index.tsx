import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RepositoryCard from "../components/RepositoryCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import { useDebounce } from "../hooks/useDebounce";
import { fetchRepositories } from "../utils/fetchRepos";
import buildQueryString from "../utils/buildQueryString";
// import "../styles/globals.scss";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.q || "");
  const debouncedQuery = useDebounce(query, 500);
  const [filters, setFilters] = useState({
    language: router.query.language || "",
    stars: router.query.stars || "",
    created: router.query.created || "",
  });
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(Number(router.query.page) || 1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (debouncedQuery) searchParams.append("q", debouncedQuery);
    if (filters.language) searchParams.append("language", filters.language);
    if (filters.stars) searchParams.append("stars", filters.stars);
    if (filters.created) searchParams.append("created", filters.created);
    searchParams.append("page", String(page));

    router.push(`/?${searchParams.toString()}`, undefined, { shallow: true });
  }, [debouncedQuery, filters, page]);

  const perPage = 5;

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError("");
        // const q = [
        //   debouncedQuery,
        //   filters.language && `language:${filters.language}`,
        //   filters.stars,
        //   filters.created,
        // ].filter(Boolean).join(" ");
        const q = buildQueryString(debouncedQuery, filters);
        const response = await fetchRepositories(`?q=${encodeURIComponent(q)}&sort=stars&order=desc&page=${page}&per_page=${perPage}`);
        setRepos(response.items || []);
        setCount(response.total_count || 0);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    if (debouncedQuery) getData();
    else setRepos([]);
  }, [debouncedQuery, filters, page]);

  const resetFilters = () => {
    setFilters({ language: "", stars: "", created: "" });
    setPage(1);
    setQuery("");
    router.push("/", undefined, { shallow: true });
  };


  return (
    <div className="container">
      <div className="all-cards">
        <h1>GitHub Repository Search</h1>
        <input
          type="text"
          placeholder="🔍 Search Repository ..."
          value={query}
          style={{padding: "10px", borderRadius: "5px"}}
          onChange={e => setQuery(e.target.value)}
          
        />
        <Filters filters={filters} setFilters={setFilters} resetFilters={resetFilters} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {/* {!loading && repos.length === 0 && <p>No results found.</p>} */}
        {!loading && 
          <RepositoryCard data={repos} />
        }
        {repos.length > 0 && <Pagination
          currentPage={page}
          totalPages={Math.ceil(Number(count / perPage))}
          onPageChange={(newPage) => {
            setPage(newPage);
            router.push(`/?page=${newPage}`, undefined, { shallow: true });
          }}
        />}
      </div>
    </div>
  );
}
