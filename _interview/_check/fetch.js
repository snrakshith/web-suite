// https://www.geeksforgeeks.org/javascript-fetch-method/

// Set up options for the fetch request
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json", // Set content type to JSON
  },
  body: JSON.stringify(jsonData), // Convert JSON data to a string and set it as the request body
};

fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => {
    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Parse the response as JSON
    return response.json();
  })
  .then((data) => {
    // Handle the JSON data
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

getData();

async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  //   console.log(response);
  const data = await response.json();
  console.log(data);
}
