export async function getData({ url }) {
  const baseUrl = "http://localhost:8000/api";
  const headers = {
    "Content-Type": "application/json",
  };
  const fullUrl = baseUrl + url;
  const response = await fetch(fullUrl, {
    headers,
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
