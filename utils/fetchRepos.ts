import axios from "axios";
import { useRepoStore } from "../pages/index"; // Import the zustand store

export const fetchRepositories = async (query: string) => {
  try {
    const response = await axios.get(`https://api.github.com/search/repositories${query}`);
    return response.data;
  } catch (error: any) {
    // Just throw error, don't show toast
    throw error;
  } finally {
    // setLoading(false);
  }
};