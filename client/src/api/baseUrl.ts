const node_env = process.env.NODE_ENV;

export const baseURL =
  node_env === 'development'
    ? process.env.REACT_APP_API_SERVER_URL_development
    : process.env.REACT_APP_API_SERVER_URL_production;
