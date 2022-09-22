import axios from "axios";

const API_KEY = process.env.REACT_APP_KAKAO_KEY;

export const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${API_KEY}`,
  },
});

export const fetchProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Something went wrong on fetching products!");
  }
  const json = await response.json();
  return json;
};

export const fetchSearchBooks = async (query) => {
  const response = await Kakao.get(
    `/v3/search/book?query=${query}&searched=true`,
  );
  return response;
};
