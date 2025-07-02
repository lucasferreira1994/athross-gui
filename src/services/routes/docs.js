import { apiRef, getConfig } from "../api";

const docs = {
  listAllDocs,
  listAllTypes,
  listAllLabels,
};

async function listAllDocs() {
  try {
    const response = await apiRef.get(`/documents/`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

async function listAllTypes() {
  try {
    const response = await apiRef.get(`/document-types/`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

async function listAllLabels() {
  try {
    const response = await apiRef.get(`/labels/`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

export default docs;
