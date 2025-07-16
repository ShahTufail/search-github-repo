import axios from "axios";
import { useRepoStore } from "./repoStore";

export const fetchRepositories = async (query: string) => {
  try {
    const response = await axios.get(`https://api.github.com/search/repositories${query}`);
    return response.data;
  } catch (error: any) {
    // Just throw error
    throw error;
  }
};