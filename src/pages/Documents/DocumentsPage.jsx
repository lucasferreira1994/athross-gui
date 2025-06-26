import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";

export default function DocumentsPage({ setTheme }) {
  return (
    <PageContainer>
      <Header setTheme={setTheme} />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: ${(props) => props.theme.colors.background};
  padding-top: 60px;
`;
