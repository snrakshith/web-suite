export let dataProvider = (reqData: any) => {
  let { config, status } = reqData;
  let { method, baseURL, headers, url } = config;
  let { Accept } = headers;
  return {
    method,
    baseURL,
    apiEndpoint: url,
    accept: Accept,
    status,
  };
};
