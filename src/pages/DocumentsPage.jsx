import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import FilterArea from "../components/filters/FilterArea";
import DocumentsArea from "../components/cards/DocumentsArea";
import api from "../services/api";

function filterDocuments(documentsInfo, selectedLabels, selectedTypes) {
  const filteredDocuments = {};

  const selectedLabelValues = selectedLabels.map((label) => label.value);
  const selectedTypeNames = selectedTypes.map((type) => type.name);

  for (const typeName in documentsInfo) {
    if (documentsInfo.hasOwnProperty(typeName)) {
      const documentsOfType = documentsInfo[typeName];

      // Filtra documentos por tipo
      const typeFiltered = documentsOfType.filter((document) => {
        const matchesType =
          selectedTypeNames.length === 0 ||
          selectedTypeNames.includes(document.type.name);
        return matchesType;
      });

      // Filtra documentos por labels
      const labelAndTypeFiltered = typeFiltered.filter((document) => {
        if (selectedLabelValues.length === 0) {
          return true;
        }

        const documentLabels = document.labels.map((label) => label.value);

        const matchesAllSelectedLabels = selectedLabelValues.every(
          (selectedVal) => documentLabels.includes(selectedVal)
        );

        return matchesAllSelectedLabels;
      });

      if (labelAndTypeFiltered.length > 0) {
        filteredDocuments[typeName] = labelAndTypeFiltered;
      }
    }
  }

  return filteredDocuments;
}

export default function DocumentsPage({ setTheme }) {
  const [documentsInfo, setDocumentsInfo] = useState({});
  const [filteredDocs, setFilteredDocs] = useState({});

  const [labels, setLabels] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    getAllDocuments();
  }, []);

  const getAllDocuments = async () => {
    try {
      const data = await api.docs.listAllDocs();
      setDocumentsInfo(data);
    } catch (error) {}
  };

  useEffect(() => {
    setFilteredDocs(filterDocuments(documentsInfo, labels, types));
  }, [documentsInfo, labels, types]);

  return (
    <PageContainer>
      <Header setTheme={setTheme} />
      <FilterArea setLabels={setLabels} setTypes={setTypes} />
      <DocumentsArea info={filteredDocs} />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background};
  padding-top: 60px;
  padding-left: 60px;
  padding-right: 60px;
`;
