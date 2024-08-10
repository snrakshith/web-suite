import fs from "fs";
import axios, { AxiosRequestConfig } from "axios";
import yaml from "js-yaml";

interface OpenApiSpec {
  paths: Record<string, Record<string, any>>;
  servers: { url: string }[];
}

type HttpClient = Record<
  string,
  (params?: Record<string, any>, data?: Record<string, any>) => Promise<any>
>;

async function generateHttpClient(
  openApiSpecPath: string
): Promise<HttpClient> {
  try {
    // Read OpenAPI spec from file
    const openApiSpec: OpenApiSpec = yaml.load(
      fs.readFileSync(openApiSpecPath, "utf8")
    );

    // Generate HTTP client functions
    const httpClient: HttpClient = {};

    for (const [path, pathItem] of Object.entries(openApiSpec.paths)) {
      for (const [method, operation] of Object.entries(pathItem)) {
        const operationId: string = operation.operationId;
        const url: string = openApiSpec.servers[0].url + path;
        httpClient[operationId] = async (params = {}, data = {}) => {
          const headers =
            operation.requestBody?.content["application/json"]?.headers || {};
          const parameters = operation.parameters || [];
          const requestHeaders: Record<string, string> = {};
          const requestParams: Record<string, string> = {};

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

          const options: AxiosRequestConfig = {
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
    const openApiSpecPath = "./openapi.yaml";
    const httpClient = await generateHttpClient(openApiSpecPath);
    console.log(httpClient);

    // Call API methods with params and data
    const result = await httpClient.getSomeResource(
      { id: "1" },
      {
        /* data */
      }
    );
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
})();
