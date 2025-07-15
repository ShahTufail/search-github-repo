const buildQueryString = (
  keyword: string | string[],
  filters: {
    language?: string | string[];
    stars?: string | string[];
    created?: string | string[];
  }
) => {
  let query = keyword ? `${keyword}` : "";

  if (filters.language) {
    query += `+language:${filters.language}`;
  }

  if (filters) {
    query += `+stars:>=${filters.stars}`;
  }

  if (filters) {
    query += `+created:>=${filters.created}`;
  }

  return query;
};
export default buildQueryString;
