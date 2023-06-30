import axios from "axios";
import { serviceUrl } from "./fixtures.js";

export const placemarkService = {
  donationUrl: serviceUrl,

  async callApi() {
    const res = await axios.get(`${this.donationUrl}/api/apitest`);
    return res.data;
  },

  async createUser(user) {
    const res = await axios.post(`${this.donationUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.donationUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.donationUrl}/api/users`);
    return res.data;
  },

  async deleteAllNonAdminUsers() {
    const res = await axios.delete(`${this.donationUrl}/api/users`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.donationUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  async createPlacemark(newPlacemark) {
    const response = await axios.post(`${this.donationUrl}/api/placemarks`, newPlacemark);
    return response.data;
  },

  async getPlacemark(id) {
    const response = await axios.get(`${this.donationUrl}/api/placemarks/${id}`);
    return response.data;
  },

  async getAllPlacemarks() {
    const response = await axios.get(`${this.donationUrl}/api/placemarks`);
    return response.data;
  },

  async deletePlacemark(id) {
    const response = await axios.delete(`${this.donationUrl}/api/placemarks/${id}`);
    return response.data;
  },

  async deleteAllPlacemarks() {
    const response = await axios.delete(`${this.donationUrl}/api/placemarks`);
    return response.data;
  },

  async updatePlacemark(id, placemark) {
    const response = await axios.put(`${this.donationUrl}/api/placemarks/${id}`, placemark);
    return response.data;
  },

  async uploadImage(id, fromData) {
    const response = await axios.post(`${this.donationUrl}/api/placemarks/${id}/addImage`, fromData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  async deleteImage(id, imageUrl) {
    const response = await axios.delete(`${this.donationUrl}/api/placemarks/${id}/deleteImage`, {
      data: {
        imageUrl: imageUrl,
      },
    });
    return response;
  },

  async createAdminUser() {
    try {
      const response = await axios.post(`${this.donationUrl}/api/apitest/createAdminUser`);
      return response.data;
    } catch (e) {
      if (e.response.status === 409) {
        return null;
      }
      throw e;
    }
  },

  async deleteAllUsers() {
    const response = await axios.delete(`${this.donationUrl}/api/apitest/deleteAll`);
    return response.data;
  },

  async deleteUser(id) {
    const response = await axios.delete(`${this.donationUrl}/api/users/${id}`);
    return response.data;
  },

  async getStatistic(type) {
    const response = await axios.get(`${this.donationUrl}/api/statistics`, {
      params: {
        type: type,
      },
    });
    return response.data;
  },
};
