export async function getData({ url }) {
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    headers,
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
