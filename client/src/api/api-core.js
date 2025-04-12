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

  return await response.json();
}

export async function postData({ url, payLoad }) {
  console.log('payLoad in fetch', payLoad)
  const fullUrl = constants.BASE_URL + url;
  const response = await fetch(fullUrl, {
    method: "POST",
    body: payLoad,
  });

  return await response.json();

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
