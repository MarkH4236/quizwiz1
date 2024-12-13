import axios from "axios";

const API_BASE_URL = "https://6736a06caafa2ef222310633.mockapi.io";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const addFlashcard = async (flashcard) => {
  try {
    const response = await api.post("/questionSet", flashcard);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getFlashcards = async () => {
  try {
    const response = await api.get("/questionSet");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteFlashcard = async (id) => {
  try {
    const response = await api.delete(`/questionSet/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}