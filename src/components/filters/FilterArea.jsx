import { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { TextField, IconButton, Autocomplete, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import api from "../../services/api";

export default function FilterArea() {
  const { t } = useTranslation();
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const [searchLabels, setSearchLabels] = useState([]);

  const [availableLabels, setAvailableLabels] = useState([]);
  const [availableTypes, setAvailableTypes] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleLabelsChange = (event, newValue) => {
    setSearchLabels(newValue);
  };

  const handleTypeChange = (event) => {
    setSelectedTypes(event, newValue);
  };

  const getAllTypes = async () => {
    try {
      const data = await api.docs.listAllTypes();
      setAvailableTypes(data.items);
    } catch (error) {
    }
  };

  const getAllLabels = async () => {
    try {
      const data = await api.docs.listAllLabels();
      const labels = data.map((label) => label.value);
      setAvailableLabels(labels);
    } catch (error) {
    }
  };

  useEffect(() => {
    getAllTypes();
    getAllLabels();
  }, []);

  return (
    <FilterContainer onSubmit={handleSearchSubmit}>
      <Autocomplete
        multiple
        limitTags={1}
        disableCloseOnSelect
        id="search-labels-autocomplete"
        options={availableLabels}
        getOptionLabel={(option) => option}
        value={searchLabels}
        onChange={handleLabelsChange}
        sx={{
          width: "300px",
          "& .MuiInput-underline:after": {
            borderBottomColor: theme.colors.borderBottom,
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder={t("search")}
            // label={t("searchLabelsPlaceholder")}
            size="small"
          />
        )}
        renderValue={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={option}
              label={option}
              size="small"
              {...getTagProps({ index })}
            />
          ))
        }
      />

      <Autocomplete
        multiple
        limitTags={1}
        disableCloseOnSelect
        id="search-types-autocomplete"
        options={availableTypes}
        getOptionLabel={(option) => option.name}
        value={selectedTypes}
        onChange={(event, newValue) => setSelectedTypes(newValue)}
        sx={{
          width: 200,
          "& .MuiInput-underline:after": {
            borderBottomColor: theme.colors.borderBottom,
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder={t("filter.types")}
            size="small"
          />
        )}
        renderValue={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={option.id}
              label={option.name}
              size="small"
              {...getTagProps({ index })}
            />
          ))
        }
      />

      <IconButton
        aria-label={t("confirmSearch")}
        type="submit"
        size="small"
        sx={{
          background: "#005564",
          borderRadius: "5px",
          maxHeight: "34px",
          "&:hover": {
            background: "#00778b",
          },
        }}
      >
        <SearchIcon sx={{ color: "#FFFFFF" }} />
      </IconButton>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: top;
  gap: 22px;
`;

const SearchBox = styled.form`
  width: auto;
  display: flex;
  align-items: top;
  gap: 10px;
`;
