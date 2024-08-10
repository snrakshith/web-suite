import axios, { AxiosResponse } from "axios";
import { operations, paths } from "./api/v1";

function generateAxiosServiceCall(
  path: keyof paths,
  method: keyof paths[keyof paths],
  operation: operations[keyof operations]
): () => Promise<AxiosResponse<any>> {
  return async () => {
    try {
      const { parameters, responses } = operation;

      const queryParams = parameters.query ? { params: parameters.query } : {};
      console.log("qp", queryParams);
      const headers = {
        "x-apideck-consumer-id": parameters.header["x-apideck-consumer-id"],
        "x-apideck-app-id": parameters.header["x-apideck-app-id"],
        // Optionally, add x-apideck-service-id if provided in the parameters
      };

      const response = await axios({
        method: method?.toUpperCase(), // You might want to adjust the method based on your operations
        url: path,
        headers,
        ...queryParams,
        // Optionally, add data for POST/PUT requests
        // data: {},
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

// Example usage:
// const callCompaniesAll = generateAxiosServiceCall(
//   "/crm/companies",
//   "companiesAll"
// );
const callCompaniesAll = generateAxiosServiceCall("/crm/companies", "get");
callCompaniesAll()
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
