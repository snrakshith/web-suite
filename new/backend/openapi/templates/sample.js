import { readFileSync } from "fs";
import axios from "axios";
import { load } from "js-yaml";

async function generateHttpClient(openApiSpecPath) {
  try {
    // Read OpenAPI spec from file
    const openApiSpec = load(readFileSync(openApiSpecPath, "utf8"));

    // Generate HTTP client functions
    const httpClient = {};

    for (const [path, pathItem] of Object.entries(openApiSpec.paths)) {
      for (const [method, operation] of Object.entries(pathItem)) {
        const operationId = operation.operationId;
        const urlTemplate = openApiSpec?.servers[0]?.url + path;
        httpClient[operationId] = async (params = {}, data = {}) => {
          const headers =
            operation.requestBody?.content["application/json"]?.headers || {};
          const parameters = operation.parameters || [];
          const requestHeaders = {};
          const requestParams = {};

          // Extract headers from OpenAPI spec
          for (const header of Object.keys(headers)) {
            const headerObj = headers[header];
            if (headerObj.required && !data[header]) {
              throw new Error(`Header ${header} is required`);
            }
            if (data[header]) {
              requestHeaders[header] = data[header];
              delete data[header];
            }
          }

          // Extract parameters from OpenAPI spec
          for (const param of parameters) {
            if (param.in === "query") {
              if (param.required && !params[param.name]) {
                throw new Error(`Query parameter ${param.name} is required`);
              }
              if (params[param.name]) {
                requestParams[param.name] = params[param.name];
              }
            }
          }
          // Interpolate URL with parameters

          let url = urlTemplate.replace(/\{id\}/g, params.id);
          url = url.replace(/\/\//g, "/"); // Remove double slashes

          const options = {
            method: method.toUpperCase(),
            url,
            headers: requestHeaders,
            params: requestParams,
            data,
          };
          const response = await axios(options);
          return response.data;
        };
      }
    }

    return httpClient;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    const openApiSpecPath = "./placeholder.yaml";
    // const openApiSpecPath = "./openapi.yaml";
    const httpClient = await generateHttpClient(openApiSpecPath);
    const k = await Object.keys(httpClient);
    // console.log("hc", k);
    console.log("hc", httpClient.getPost());

    // Call API methods
    // const getAllCompanies = await httpClient.companiesAll();
    // const getPosts = await httpClient.companiesAll();
    // const result = await httpClient.getPosts({ id: 6 }, { hi: "1" });
    // console.log(getPosts);
    // console.log(result);
    // console.log(getAllCompanies);
  } catch (error) {
    // console.error("Error:", error);
  }
})();
