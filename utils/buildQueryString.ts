const buildQueryString = (
  keyword: string | string[],
  filters: {
    language?: string | string[];
    stars?: string | string[];
    created?: string | string[];
  }
): string => {
  const queryParts = [];

  if (keyword) queryParts.push(keyword);
  if (filters.language) queryParts.push(`language:${filters.language}`);
  if (filters.stars) queryParts.push(`stars:>=${filters.stars}`);
  if (filters.created) queryParts.push(`created:>=${filters.created}`);

  return queryParts.join(" ");
};

export default buildQueryString;
