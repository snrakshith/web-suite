import axios, { AxiosResponse } from "axios";
import { paths } from "./api/v1";

// export interface paths {
//   "/crm/companies": {
//     /**
//      * List companies
//      * @description List companies
//      */
//     get: operations["companiesAll"];
//   };
// }

// export interface operations {
//   /**
//    * List companies
//    * @description List companies
//    */
//   companiesAll: {
//     parameters: {
//       query?: {
//         raw?: components["parameters"]["raw"];
//         cursor?: components["parameters"]["cursor"];
//         limit?: components["parameters"]["limit"];
//         filter?: components["parameters"]["companiesFilter"];
//         sort?: components["parameters"]["companiesSort"];
//         pass_through?: components["parameters"]["passThrough"];
//         fields?: components["parameters"]["fields"];
//       };
//       header: {
//         "x-apideck-consumer-id": components["parameters"]["consumerId"];
//         "x-apideck-app-id": components["parameters"]["applicationId"];
//         "x-apideck-service-id"?: components["parameters"]["serviceId"];
//       };
//     };
//     responses: {
//       200: components["responses"]["GetCompaniesResponse"];
//       400: components["responses"]["BadRequestResponse"];
//       401: components["responses"]["UnauthorizedResponse"];
//       402: components["responses"]["PaymentRequiredResponse"];
//       404: components["responses"]["NotFoundResponse"];
//       422: components["responses"]["UnprocessableResponse"];
//       default: components["responses"]["UnexpectedErrorResponse"];
//     };
//   };
// }

// interface components {
//   parameters: {
//     raw: string;
//     cursor: string;
//     limit: string;
//     companiesFilter: string;
//     companiesSort: string;
//     passThrough: string;
//     fields: string;
//     consumerId: string;
//     applicationId: string;
//     serviceId: string;
//   };
//   responses: {
//     GetCompaniesResponse: any;
//     BadRequestResponse: any;
//     UnauthorizedResponse: any;
//     PaymentRequiredResponse: any;
//     NotFoundResponse: any;
//     UnprocessableResponse: any;
//     UnexpectedErrorResponse: any;
//   };
// }

// Function to generate Axios service call
function generateAxiosServiceCall(
  method: keyof paths[keyof paths],
  path: keyof paths
): () => Promise<AxiosResponse<any>> {
  return async () => {
    try {
      const response = await axios({
        method: method?.toUpperCase(),
        url: path,
        // You need to provide appropriate headers and data according to your API specifications
        headers: {
          "x-apideck-consumer-id": "your_consumer_id",
          "x-apideck-app-id": "your_app_id",
          // Optionally, add x-apideck-service-id if provided in the parameters
        },
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
const callCompaniesAll = generateAxiosServiceCall("get", "/crm/users");
callCompaniesAll()
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
