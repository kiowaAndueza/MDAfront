import axios from "axios";

const domain = "http://localhost:8080";
let request;
let url;

export const login = (formData) => {
  request = "/login";
  url = domain + request;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = JSON.stringify(formData);
  return axios.post(url, data, config);
};

export const companyRegister = (formData) => {
  request = "/saveUser";
  url = domain + request;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = JSON.stringify(formData);
  return axios.post(url, data, config);
};

export const particularRegister = (formData) => {
  request = "/saveUser";
  url = domain + request;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = JSON.stringify(formData);
  return axios.post(url, data, config);
};