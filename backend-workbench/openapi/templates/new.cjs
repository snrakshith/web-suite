"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAPICalls = void 0;
var fs = require("fs");
var yaml = require("js-yaml");
function generateAPICalls(openapiFile) {
  var openapiSpec = yaml.load(fs.readFileSync(openapiFile, "utf8"));
  for (var path in openapiSpec.paths) {
    var methods = openapiSpec.paths[path];
    var _loop_1 = function (method) {
      var _a = methods[method],
        summary = _a.summary,
        parameters = _a.parameters,
        headers = _a.headers,
        requestBody = _a.requestBody,
        responses = _a.responses;
      var paramsString = parameters
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
      var headersString = headers
        ? headers
            .map(function (header) {
              return "".concat(header.name, ": ").concat(header.schema.type);
            })
            .join(", ")
        : "";
      var bodyString =
        requestBody &&
        requestBody.content &&
        requestBody.content["application/json"] &&
        requestBody.content["application/json"].schema &&
        requestBody.content["application/json"].schema.properties
          ? Object.keys(
              requestBody.content["application/json"].schema.properties
            )
              .map(function (key) {
                return ""
                  .concat(key, ": ")
                  .concat(
                    requestBody.content["application/json"].schema.properties[
                      key
                    ].type
                  );
              })
              .join(", ")
          : "";
      var responsesCases = responses
        ? Object.entries(responses).map(function (_a) {
            var status = _a[0],
              response = _a[1];
            var responseName = response.$ref.split("/").pop();
            return "\n                case "
              .concat(status, ":\n                    // Handle ")
              .concat(
                status,
                " response\n                    // Example: return "
              )
              .concat(
                responseName,
                ";\n                    break;\n                "
              );
          })
        : [];
      var responsesSwitchCase = responsesCases.join("\n").trim();
      var apiCall = "\n/**\n * "
        .concat(summary, "\n */\nexport const ")
        .concat(summary.replace(/\s/g, ""), " = async (")
        .concat(paramsString, ") => {\n    const headers = { ")
        .concat(headersString, " };\n    const body = { ")
        .concat(
          bodyString,
          " };\n\n    try {\n        const response = await fetch('"
        )
        .concat(path, "', {\n            method: '")
        .concat(
          method.toUpperCase(),
          "',\n            headers: headers,\n            body: JSON.stringify(body),\n        });\n\n        if (!response.ok) {\n          throw new Error('Network response was not ok');\n        }\n\n        switch (response.status) {\n          "
        )
        .concat(
          responsesSwitchCase,
          "\n          default:\n              // Handle other status codes\n              break;\n        }\n\n        return await response.json();\n    } catch (error) {\n        console.error('There was a problem with the fetch operation:', error);\n        throw error;\n    }\n};\n"
        );
      fs.writeFileSync(summary.replace(/\s/g, ""), apiCall);
      console.log(apiCall);
    };
    for (var method in methods) {
      _loop_1(method);
    }
  }
}
exports.generateAPICalls = generateAPICalls;
generateAPICalls("openapi.yaml"); // Replace 'openapi.yaml' with the path to your OpenAPI specification file
