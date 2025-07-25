import { useEffect } from "react";
import buildQueryString from "../utils/buildQueryString";
import { fetchRepositories } from "../utils/fetchRepos";
import { useDebounce } from "../hooks/useDebounce";
import { useRouter } from "next/router";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import RepositoryCard from "../components/RepositoryCard";
import { useRepoStore } from "../utils/repoStore";

export default function Home() {
  const router = useRouter();
  const {
    query,
    setQuery,
    filters,
    setFilters,
    repos,
    setRepos,
    count,
    setCount,
    loading,
    setLoading,
    error,
    setError,
    page,
    setPage,
    cache,
    reset,
  } = useRepoStore();

  const perPage = 5;
  const debouncedQuery = useDebounce(query, 500);

  // Only trigger search if there is a query or filters (not just page)
  const hasSearchParams = !!(
    debouncedQuery ||
    filters.language ||
    filters.stars ||
    filters.created
  );

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (debouncedQuery) searchParams.set("q", debouncedQuery);
    if (filters.language) searchParams.set("language", filters.language);
    if (filters.stars) searchParams.set("stars", filters.stars);
    if (filters.created) searchParams.set("created", filters.created);
    if (searchParams.toString()) {
      searchParams.set("page", String(page));
      router.push(`/?${searchParams.toString()}`, undefined, { shallow: true });
    } else {
      router.push(`/`, undefined, { shallow: true });
    }
  }, [debouncedQuery, filters, page]);

  useEffect(() => {
    if (!hasSearchParams) {
      setRepos([]);
      setCount(0);
      setError("");
      setLoading(false);
      return;
    }

    const cacheKey = JSON.stringify({
      q: debouncedQuery,
      ...filters,
      page,
      perPage,
    });

    const getData = async () => {
      setLoading(true);
      setError("");
      if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        setRepos(cached.items || []);
        setCount(cached.total_count || 0);
        setLoading(false);
        return;
      }
      try {
        const q = buildQueryString(debouncedQuery, filters);
        const response = await fetchRepositories(
          `?q=${encodeURIComponent(
            q
          )}&sort=stars&order=desc&page=${page}&per_page=${perPage}`
        );
        setRepos(response.items || []);
        setCount(response.total_count || 0);
        cache.set(cacheKey, response);
      } catch (err: any) {
        let message = "An unexpected error occurred.";
        if (err?.response?.status === 403) {
          message = "API rate limit exceeded. Please try again later.";
        } else if (err?.response?.status === 422) {
          message = "Invalid search query. Please refine your search.";
        } else if (err?.message) {
          message = err.message;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [debouncedQuery, filters, page, hasSearchParams, perPage]);

  const resetFilters = () => {
    reset();
    router.push("/", undefined, { shallow: true });
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8" aria-label="Main content">
      <section
        className="bg-white rounded-lg shadow p-6 relative"
        aria-labelledby="main-heading"
      >
        <h1 id="main-heading" className="text-2xl font-bold mb-4">
          GitHub Repository Search
        </h1>
        <label htmlFor="search-input" className="sr-only">
          Search Repository
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="🔍 Search Repository ..."
          value={query}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search Repository"
        />

        <Filters
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
        />

        {error && (
          <div
            className="mt-4 mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 shadow flex items-center gap-3 justify-between"
            role="alert"
          >
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-red-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0ZM12 7h.01"
                />
              </svg>
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError("")}
              className="ml-4 p-1 rounded hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Close error"
              type="button"
            >
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Loader overlay */}
        <div className="relative min-h-[120px]">
          <div
            className={
              loading ? "opacity-50 pointer-events-none select-none" : ""
            }
          >
            {/* Show generic message if nothing searched */}
            {!hasSearchParams && !loading && !error && (
              <div
                className="mt-4 mb-2 p-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 shadow flex items-center gap-6"
                role="status"
              >
                <svg
                  className="w-8 h-8 text-red-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16h8M8 12h8m-8-4h8M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-base italic font-semibold font-sans">
                  Nothing to show yet... <br />
                  Type and start searching for the repo(s)
                </span>
              </div>
            )}
            {/* No repositories found card */}
            {hasSearchParams && !loading && !error && repos.length === 0 && (
              <div
                className="mt-4 mb-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-700 shadow flex items-center gap-3"
                role="status"
              >
                <svg
                  className="w-6 h-6 text-yellow-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"
                  />
                </svg>
                <span>No repositories found.</span>
              </div>
            )}
            {/* Repos has value */}
            {repos.length > 0 && <RepositoryCard data={repos} />}
          </div>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
              <div className="flex flex-col items-center">
                <svg
                  className="animate-spin h-8 w-8 text-blue-500 mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span className="text-blue-500 font-medium">Loading...</span>
              </div>
            </div>
          )}
        </div>

        {(repos.length > 0 || loading) && hasSearchParams && (
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(Number(count / perPage))}
            onPageChange={(newPage) => {
              setPage(newPage);
              // Only add page param if there are other params
              const searchParams = new URLSearchParams();
              if (debouncedQuery) searchParams.set("q", debouncedQuery);
              if (filters.language)
                searchParams.set("language", filters.language);
              if (filters.stars) searchParams.set("stars", filters.stars);
              if (filters.created) searchParams.set("created", filters.created);
              if (searchParams.toString()) {
                searchParams.set("page", String(newPage));
                router.push(`/?${searchParams.toString()}`, undefined, {
                  shallow: true,
                });
              } else {
                router.push("/", undefined, { shallow: true });
              }
              setPage(newPage);
            }}
          />
        )}
      </section>
    </main>
  );
}
