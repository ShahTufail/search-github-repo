import axios from "axios";
import { toast } from "react-toastify";

export const fetchRepositories = async (query: string) => {
  try {
    const response = await axios.get(`https://api.github.com/search/repositories${query}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.message || "GitHub API error");
    } else if (error.request) {
      toast.error("No response from GitHub API");
    } else {
      toast.error("Unexpected error");
    }
    throw error;
  }
};
