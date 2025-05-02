import * as fs from "fs";
import * as yaml from "js-yaml";

interface OpenAPIPath {
  [method: string]: {
    summary: string,
    parameters?: OpenAPIParameter[],
    headers?: OpenAPIParameter[],
    requestBody?: {
      content: {
        "application/json": {
          schema: {
            properties: { [key: string]: { type: string } },
          },
        },
      },
    },
  };
}

interface OpenAPIParameter {
  name: string;
  in: string;
  required?: boolean;
  schema: {
    type: string,
  };
}

interface OpenAPI {
  paths: { [path: string]: OpenAPIPath };
}

function generateAPICalls(openapiFile: string): void {
  const openapiSpec: OpenAPI = yaml.load(fs.readFileSync(openapiFile, "utf8"));

  for (const path in openapiSpec.paths) {
    const methods = openapiSpec.paths[path];
    for (const method in methods) {
      const { summary, parameters, headers, requestBody } = methods[method];

      const paramsString = parameters
        ? parameters
            .map((param) => `${param.name}: ${param.schema.type}`)
            .join(", ")
        : "";
      const headersString = headers
        ? headers
            .map((header) => `${header.name}: ${header.schema.type}`)
            .join(", ")
        : "";
      const bodyString = requestBody
        ? Object.keys(requestBody.content["application/json"].schema.properties)
            .map(
              (key) =>
                `${key}: ${requestBody.content["application/json"].schema.properties[key].type}`
            )
            .join(", ")
        : "";

      const apiCall = `
/**
 * ${summary}
 */
export const ${summary.replace(/\s/g, "")} = async (${paramsString}) => {
    const headers = { ${headersString} };
    const body = { ${bodyString} };

    try {
        const response = await fetch('${path}', {
            method: '${method.toUpperCase()}',
            headers: headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};
`;
      console.log(apiCall);
    }
  }
}

generateAPICalls("./openapi.yaml"); // Replace 'openapi.yaml' with the path to your OpenAPI specification file
