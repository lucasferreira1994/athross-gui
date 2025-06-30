// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.5; /* Altura de linha para melhor legibilidade */
    -webkit-font-smoothing: antialiased; /* Suavização de fonte para WebKit */
    -moz-osx-font-smoothing: grayscale; /* Suavização de fonte para Firefox (macOS) */

    /* Cores de fundo e texto padrão do tema */
    background-color: ${(props) => props.theme.colors.background || "#FFFFFF"};
    color: ${(props) => props.theme.colors.textColor || "#333333"};
    transition: background-color 0.3s ease, color 0.3s ease; /* Transição suave ao mudar o tema */
  }

  /* Estilos para títulos */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', sans-serif; 
    font-weight: 700; 
    line-height: 1.2;
    color: ${(props) => props.theme.colors.textColor || "#333333"};
  }

  /* Estilos para links */
  a {
    color: ${(props) => props.theme.colors.primary || "#007bff"};
    &:hover {
      text-decoration: underline;
    }
  }

  /* Seleção de texto */
  ::selection {
    
  }
`;
