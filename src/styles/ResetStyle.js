// src/styles/ResetStyle.js
import { createGlobalStyle } from 'styled-components';

export const ResetStyle = createGlobalStyle`
  /* Box sizing defaults */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default margin and padding */
  body,
  h1, h2, h3, h4, h5, h6,
  p, blockquote, pre,
  dl, dd, ol, ul, figure,
  hr, fieldset, legend {
    margin: 0;
    padding: 0;
  }

  /* Set default font size and line height */
  html {
    font-size: 100%; /* Base font size */
    -webkit-text-size-adjust: 100%; /* Prevent font size adjustment on mobile */
  }

  /* Remove list styles */
  ol, ul {
    list-style: none;
  }

  /* Remove text decoration from links */
  a {
    text-decoration: none;
    color: inherit; /* Inherit color from parent by default */
  }

  /* Improve media defaults */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  /* Remove default button styles */
  button, input, optgroup, select, textarea {
    font-family: inherit; /* Inherit font from body */
    font-size: 100%; /* Inherit font size */
    line-height: 1.15; /* Maintain consistent line height */
    margin: 0; /* Remove default margin */
    border: none;
    background: none;
    cursor: pointer;
  }

  /* A elements that don't have a href attribute should have a cursor not-allowed */
  a:not([href]) {
    cursor: not-allowed;
  }

  /* Form elements */
  input, textarea, select {
    border: 1px solid #ccc; /* Basic border for form elements */
    padding: 8px;
    border-radius: 4px;
  }

  /* Make sure textarea can be resized */
  textarea {
    resize: vertical;
  }
`;