import { apiRef } from "../api";

const docs = {
  listAllDocs,
  listAllTypes,
  listAllLabels,
  filterDocuments,
};

async function listAllDocs() {
  try {
    const response = await apiRef.get(`/documents/`);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}
async function filterDocuments(labels = []) {
  try {
    const response = await apiRef.post(`/documents/search`, {
      labels: labels,
      by_type: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

async function listAllTypes() {
  try {
    const response = await apiRef.get(`/document-types/`);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

async function listAllLabels() {
  try {
    const response = await apiRef.get(`/labels/`);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

export default docs;
