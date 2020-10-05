import { FETCH_ALL_DOCS, CREATE_NEW_DOC, FETCH_DOC } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const fetchAllDocs = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  try {
    const response = await axios.get("/api/newdocs/getall/");
    dispatch({ type: FETCH_ALL_DOCS, payload: response.data });
  } catch (error) {
    console.log("User not authenticated");
  }
};

export const fetchDoc = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  try {
    const response = await axios.get("/api/newdocs/" + id);
    console.log(response.data);
    dispatch({ type: FETCH_DOC, payload: response.data });
  } catch (error) {
    console.log("User not authenticated");
  }
};

export const addNewDoc = (title, content, imageUrl) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  const data = {
    title: title,
    doc: content,
    imageUrl: imageUrl,
  };
  try {
    const response = axios.post("/api/newdocs", data);
    console.log(response);
    dispatch({ type: CREATE_NEW_DOC, payload: response.data });
  } catch (error) {
    console.log("Something went wrong...");
  }
};
