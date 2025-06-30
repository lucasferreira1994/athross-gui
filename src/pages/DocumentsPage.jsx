import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import FilterArea from "../components/filters/FilterArea";
import DocumentsArea from "../components/cards/DocumentsArea";

export default function DocumentsPage({ setTheme }) {
  return (
    <PageContainer>
      <Header setTheme={setTheme} />
      <FilterArea />
      <DocumentsArea />
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
