import axios from "axios";

const domain = "http://localhost:8080";
let request;
let url;

export const createAdoptionAdvertisement = (formData) => {
  request = "/saveAnnounce";
  url = domain + request;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = JSON.stringify(formData);
  return axios.post(url, data, config);
};