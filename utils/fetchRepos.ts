import axios from "axios";

export const fetchRepositories = async (query: string) => {
  try {
    const response = await axios.get(`https://api.github.com/search/repositories${query}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "GitHub API error");
    } else if (error.request) {
      throw new Error("No response from GitHub API");
    } else {
      throw new Error("Unexpected error");
    }
  }
}
