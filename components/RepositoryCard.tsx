import { Repository } from "../types";

const RepositoryCard = ({ repo }: { repo: Repository }) => (
  <div className="card">
    <h3><a href={repo.html_url} target="_blank" rel="noreferrer">{repo.full_name}</a></h3>
    <p>{repo.description}</p>
    <p>⭐ {repo.stargazers_count} | {repo.language} | Created: {new Date(repo.created_at).toLocaleDateString()}</p>
  </div>
);

export default RepositoryCard;
