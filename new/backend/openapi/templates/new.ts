import * as fs from "fs";
import * as yaml from "js-yaml";

interface OpenAPIPath {
  [method: string]: {
    summary: string;
    parameters?: OpenAPIParameter[];
    headers?: OpenAPIParameter[];
    requestBody?: {
      content: {
        "application/json": {
          schema: {
            properties: { [key: string]: { type: string } };
          };
        };
      };
    };
    responses?: { [status: string]: { $ref: string } };
  };
}

interface OpenAPIParameter {
  name: string;
  in: string;
  required?: boolean;
  schema: {
    type: string;
  };
}

interface OpenAPI {
  paths: { [path: string]: OpenAPIPath };
}

export function generateAPICalls(openapiFile: string): void {
  const openapiSpec: OpenAPI = yaml.load(
    fs.readFileSync(openapiFile, "utf8")
  ) as OpenAPI;

  for (const path in openapiSpec.paths) {
    const methods = openapiSpec.paths[path];
    for (const method in methods) {
      const { summary, parameters, headers, requestBody, responses } =
        methods[method];

      const paramsString = parameters
        ? parameters
            .map((param) => {
              const paramName = param.$ref.split("/").pop(); // Extract the parameter name from the reference
              const resolvedParam =
                openapiSpec.components.parameters[paramName];
              if (resolvedParam) {
                return `${resolvedParam.name}: ${
                  resolvedParam.schema ? resolvedParam.schema.type : "unknown"
                }`;
              } else {
                console.warn(`Parameter ${paramName} not found in components.`);
                return "";
              }
            })
            .filter(Boolean) // Filter out any empty strings
            .join(", ")
        : "";

      const headersString = headers
        ? headers
            .map((header) => `${header.name}: ${header.schema.type}`)
            .join(", ")
        : "";

      const bodyString =
        requestBody &&
        requestBody.content &&
        requestBody.content["application/json"] &&
        requestBody.content["application/json"].schema &&
        requestBody.content["application/json"].schema.properties
          ? Object.keys(
              requestBody.content["application/json"].schema.properties
            )
              .map(
                (key) =>
                  `${key}: ${requestBody.content["application/json"].schema.properties[key].type}`
              )
              .join(", ")
          : "";

      const responsesCases = responses
        ? Object.entries(responses).map(([status, response]) => {
            const responseName = response.$ref.split("/").pop();
            return `
                case ${status}:
                    // Handle ${status} response
                    // Example: return ${responseName};
                    break;
                `;
          })
        : [];

      const responsesSwitchCase = responsesCases.join("\n").trim();

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

        switch (response.status) {
          ${responsesSwitchCase}
          default:
              // Handle other status codes
              break;
        }

        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};
`;
      const camelCaseSummary = summary.replace(/\s+(.)/g, (_, char) =>
        char.toUpperCase()
      );
      const serviceName = `${camelCaseSummary}.service.ts`;
      const serviceNameInSnakeCase = `${summary
        .replace(/\s+/g, "_")
        .toLowerCase()}.service.ts`;
      // const serviceName = `${summary.replace(/\s/g, "")}.service.ts`;
      fs.writeFileSync(serviceName, apiCall);
      // console.log(apiCall);
    }
  }
}

generateAPICalls("openapi.yaml"); // Replace 'openapi.yaml' with the path to your OpenAPI specification file
