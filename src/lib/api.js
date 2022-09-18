export const fetchProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Something went wrong on fetching products!");
  }
  const json = await response.json();
  return json;
};
