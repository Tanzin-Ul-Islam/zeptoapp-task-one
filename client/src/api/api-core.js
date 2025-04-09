import constants from "../constants";
export async function getData({ url }) {
  const headers = {
    "Content-Type": "application/json",
  };
  const fullUrl = constants.BASE_URL + url;
  const response = await fetch(fullUrl, {
    headers,
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function postFormData({ url, formData }) {
  const fullUrl = constants.BASE_URL + url;
  const response = await fetch(fullUrl, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to post data");
  }
}

export async function deleteData({ url, id }) {
  const fullUrl = constants.BASE_URL + url;
  const response = await fetch(fullUrl, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete data");
  }
}
