import axios from "axios";

const domain = "";
let request;
let url;

export const login = (email, password) => {
  request = "";
  url = domain + request;
  return axios.post(url, {
    email: email,
    password: password,
  });
};

export const companyRegister = (formData) => {
  request = "";
  url = domain + request;
  return axios.post(url, formData);
};

export const particularRegister = (formData) => {
  request = "";
  url = domain + request;
  return axios.post(url, formData);
};
