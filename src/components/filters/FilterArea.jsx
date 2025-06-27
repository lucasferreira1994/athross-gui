import { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

export default function FilterArea() {
  const { t } = useTranslation();
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Termo de busca enviado:", searchTerm);
    // Aqui você pode adicionar a lógica real da busca,
    // como chamar uma API, filtrar uma lista, etc.
  };

  return (
    <FilterContainer>
      <SearchBox onSubmit={handleSearchSubmit}>
        <TextField
          placeholder={t("search")}
          variant="standard"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            width: "350px",
            "& .MuiInput-underline:after": {
              borderBottomColor: theme.colors.loginBackground,
            },
          }}
        />
        <IconButton
          aria-label="confirm search"
          type="submit"
          size="small"
          sx={{
            //background: "#2c2c2c",
            borderRadius: "5px",
            //":hover": { background: "#00414d" },
          }}
        >
          <SearchIcon sx={{ color: theme.colors.textColor }} />
        </IconButton>
      </SearchBox>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
`;

const SearchBox = styled.form`
  width: auto;
  display: flex;
  align-items: center;
  gap: 10px;
`;
