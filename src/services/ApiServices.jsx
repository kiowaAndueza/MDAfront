import axios from "axios";

const domain = "";
let request;
let url;

export const createAdoptionAdvertisement = (formData, token) => {
  request = "";
  url = domain + request;
  return axios.post(url, formData, {
    headers: {
      "X-AUTH-TOKEN": token,
    },
  });
};
