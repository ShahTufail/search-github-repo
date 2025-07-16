import axios from "axios";
import { useRepoStore } from "../pages/index"; // Import the zustand store

export const fetchRepositories = async (query: string) => {
  // Optionally, you can use the store to set loading/error here if you want global control
  // const { setLoading, setError } = useRepoStore.getState();
  // setLoading(true);
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