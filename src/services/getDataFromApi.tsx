const API_BASE_URL = "https://tourism-data-backend.herokuapp.com";

export async function getDataFromApi(collectionUrl: any) {
  try {
    const response = await fetch(`${API_BASE_URL}${collectionUrl}`, {
      method: "GET",
      headers: new Headers({ "Content-type": "application/json" }),
      mode: "cors",
    });
    const data = await response.json();
    console.log(data)

    return data;
  } catch (error) {
    console.log(error);
  }
}
