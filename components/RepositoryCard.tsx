import { Repository } from "../types";

const characterLimit = 1000; // Limit for description length
const RepositoryCard = ({ data }) => (
  <section aria-label="Repository results">
    {data.length > 0 ? (
      data.map((repo : Repository) => (
        <article
          key={repo.id}
          className="mb-6 p-6 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-shadow hover:shadow-lg"
          aria-labelledby={`repo-title-${repo.id}`}
        >
          <div className="flex-1">
            <h3
              id={`repo-title-${repo.id}`}
              className="text-xl font-bold mb-1 text-gray-800"
            >
              {repo.full_name}
            </h3>
            <p className="mb-2 text-gray-700">
              {repo?.description?.length > characterLimit
                ? repo.description.substring(0, 1000) + "..."
                : repo.description}
            </p>
            <h3 className="text-sm text-gray-500">
              <span aria-label="Stars" title="Stars">⭐ {repo.stargazers_count}</span> |{" "}
              <span aria-label="Language">{repo.language || "N/A"}</span> |{" "}
              <span aria-label="Created at">
                Created: {new Date(repo.created_at).toLocaleDateString()}
              </span>
            </h3>
          </div>
          <div className="flex-shrink-0 flex items-center">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-5 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold shadow hover:bg-gray-300 hover:text-black hover:scale-105 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400"
              title={`View ${repo.full_name} on GitHub`}
              aria-label={`View ${repo.full_name} on GitHub`}
              role="button"
              tabIndex={0}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              View
            </a>
          </div>
        </article>
      ))
    ) : (
      <p className="text-red-500" role="status">No repositories found.</p>
    )}
  </section>
);
export default RepositoryCard;