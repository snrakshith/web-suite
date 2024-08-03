// import type { paths } from "../api/v1";

import fs from "fs";
import yaml from "js-yaml";

// @description ${description}
const openapi_fetch = (baseUrl, path) => `
import createClient from "openapi-fetch";

const client = createClient<paths>({ baseUrl: ${baseUrl} });

const {
  response,
  data, // only present if 2XX response
  error, // only present if 4XX or 5XX response
} = await client.GET(${path}, {
  params: {
    header: {  
      "x-apideck-app-id": "",
      "x-apideck-consumer-id": "",
    },
  },
});
`;

function generate() {
  try {
    // Read YAML file
    const yamlData = fs.readFileSync("test.yaml", "utf8");

    // Parse YAML into JavaScript object
    const data = yaml.load(yamlData);
    const BASE_URL = data.servers[0].url;
    // const description = data.servers[0].url;
    console.log("data:", data.openapi);
    // console.log("item:", Object.keys(data.components));

    // Object.entries(data.components.responses).forEach(([name, value]) => {
    //   console.log("item:", name);
    //   console.log("value:", value.content["application/json"]);
    // });
    const output = Object.entries(data.paths).forEach((item) => {
      console.log("path:", item[0]);
      console.log("summary:", item[1].get.summary);
      console.log("params:", item[1].get.parameters);
      console.log("responses:", item[1].get.responses);
      console.log("sample:", item[1].get.security);
      return item;
    });
    return output;
  } catch (error) {
    console.error("Error reading YAML file:", error);
    return [];
  }
}

console.log("===Process Started===");
console.log("GENERATE", generate());
console.log("===Process Ended===");

//   let x = Object.entries(methodPaths).map((path) => {
//     return openapi_fetch(BASE_URL, path[1]);
//   });
//   return x;
