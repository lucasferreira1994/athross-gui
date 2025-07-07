import { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import {
  TextField,
  IconButton,
  Autocomplete,
  Chip,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import api from "../../services/api";

export default function FilterArea({ setLabels, setTypes }) {
  const { t } = useTranslation();
  const theme = useTheme();

  const [availableLabels, setAvailableLabels] = useState([]);
  const [availableTypes, setAvailableTypes] = useState([]);

  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const getAllTypes = async () => {
    try {
      const data = await api.docs.listAllTypes();
      setAvailableTypes(data.items);
    } catch (error) {}
  };

  const getAllLabels = async () => {
    try {
      const data = await api.docs.listAllLabels();
      const labels = data.map((label, index) => {
        return {
          ...label,
          id: index,
        };
      });
      setAvailableLabels(labels);
    } catch (error) {}
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
        getOptionLabel={(option) => option.value}
        getOptionKey={(option) => option.id}
        value={selectedLabels}
        onChange={(event, newValue) => setSelectedLabels(newValue)}
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
            size="small"
          />
        )}
        renderValue={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={option.id}
              label={option.value}
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
        getOptionKey={(option) => option.id}
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

      <Tooltip title={t("confirmSearch")} arrow>
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
          onClick={() => {
            setLabels(selectedLabels);
            setTypes(selectedTypes);
          }}
        >
          <SearchIcon sx={{ color: "#FFFFFF" }} />
        </IconButton>
      </Tooltip>
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
