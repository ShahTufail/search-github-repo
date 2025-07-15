import { Repository } from "../types";

const characterLimit = 1000; // Limit for description length
const RepositoryCard = ({ data }) => (
  <div className="card">
    {data.length > 0 ? (
      data.map((repo : Repository) => (
        <div key={repo.id} className="card">
          <h3>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.full_name}
            </a>  
          </h3>
            <p>{repo?.description?.length > characterLimit ?  repo.description.substring(0, 1000) + '...' : repo.description}</p>
            <h3>⭐ {repo.stargazers_count} | {repo.language || 'N/A'} | Created: {new Date(repo.created_at).toLocaleDateString()}</h3>
        </div>
      ))

    ) : (
      <p style={{color: 'red'}}>No repositories found.</p>
    )}
    {/* <p>⭐ {repo.stargazers_count} | {repo.language} | Created: {new Date(repo.created_at).toLocaleDateString()}</p> */}
    </div>
  );
export default RepositoryCard;
