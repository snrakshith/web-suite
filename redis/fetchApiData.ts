const axios = require("axios");

// Fetch API data function
export async function fetchApiData(species) {
  try {
    const apiResponse = await axios.get(
      `https://www.fishwatch.gov/api/species/${species}`
    );
    console.log("Request sent to the API");
    return apiResponse.data;
  } catch (error) {
    console.error("API request error:", error);
    throw new Error("Failed to fetch data from API");
  }
}
