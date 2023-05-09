const BASE_URL = 'http://localhost:5000'; // Replace with your backend server URL

export async function getAllProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  const data = await response.json();
  return data.products;
}