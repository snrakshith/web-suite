/**
 * Sample fetch api syntax, for quick reference
 */

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

//  Using async & await
async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  //   console.log(response);
  const data = await response.json();
  console.log(data);
}

getData();

// In case of react

export default function FetchDataExample() {
  const [data, setData] = (useState < null) | (any > []);
  useEffect(() => {
    fetch(`https://api.ikurehealthtech.com/dev/healthq/datasets`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  if (isLoading) return <SplashScreen />;
  return (
    <>
      <div>{data}</div>
    </>
  );
}
