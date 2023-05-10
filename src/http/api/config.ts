import axios from 'axios';

const getServerApiConfig = () => {
  const config = {
    baseURL: `${process.env.NEXT_PUBLIC_DOMAIN}`,
    withCredentials: true,
    crossDomain: true,
  };

  const instance = axios.create(config);

  return instance;
};

const appConfig = (net = true) => {
  const config = {
    baseURL: `${
      net ? process.env.NEXT_PUBLIC_DOMAIN : process.env.NEXT_DOMAIN_SERVER
    }`,
    serverURL: process.env.NEXT_PUBLIC_RPC_SERVER,
  };
  return config;
};

const apiServer = getServerApiConfig();
const api = getServerApiConfig();
const config = appConfig(true);
export { api, apiServer, config };
