import axios from "axios";

const domain = "";
let request;
let url;

export const createAdoptionAdvertisement = (formData, id) => {
  request = "";
  url = domain + request;
  return axios.post(url, formData, {
    headers: {
      "headers": id,
    },
  });
};
