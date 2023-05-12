import axios from "axios";

const domain = "http://localhost:8080";
let request;
let url;

export const createAdoptionAdvertisement = (formData, idUser) => {
  request = "/saveAnnounce";
  url = domain + request;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = JSON.stringify(formData);
  return axios.post(url, data, idUser, config);
};


export const showMyAnnouncements = (idUser) => {
  request = "/findAnnounceByUser";
  url = domain + request;
  return axios.post(url, idUser);
};


export const editMyAnnouncement = (idAnnounce, formData) => {
  request = "/updateAnnounce";
  url = domain + request;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = JSON.stringify(formData);
  return axios.post(url, data, idAnnounce, config);
};


export const deleteMyAnnouncement = (idAnnouncer) => {
  request = "/deleteAnnounce";
  url = domain + request;
  return axios.post(url, idAnnouncer);
};