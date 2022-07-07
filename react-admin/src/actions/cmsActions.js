import axios from "axios";
import { GET_ALL_CMS } from "./types";
const PROXY = process.env.REACT_APP_URL + "api/";

export const getCms = (toursObj) => async (dispatch) => {
  const res = await axios.get(PROXY + "cms", { params: toursObj });
  dispatch({
    type: GET_ALL_CMS,
    payload: res.data.result,
  });
};

export const changeCmsStatus = (id, tour) => async (dispatch) => {
  const res = await axios.put(PROXY + "cms/change-status/" + id, tour);
  return res;
};

export const addCms = (tour) => async (dispatch) => {
  const res = await axios.post(PROXY + "cms", tour);
  return res;
};

export const updateCms = (id, tour) => async (dispatch) => {
  const res = await axios.put(PROXY + "cms/" + id, tour);
  return res;
};

export const deleteCms = (id) => async (dispatch) => {
  return await axios.delete(PROXY + "cms/" + id);
};
