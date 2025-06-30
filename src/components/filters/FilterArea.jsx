import { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import {
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  ListSubheader,
  Divider,
  Autocomplete,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTranslation } from "react-i18next";

export default function FilterArea() {
  const { t } = useTranslation();
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  const [searchLabels, setSearchLabels] = useState([]);

  const availableTypes = ["type 1", "type 2", "type 3", "type 4"];

  const availableLabels = [
    "Label A",
    "Label B",
    "Label C",
    "Product Tag",
    "Service Name",
    "Department ID",
    "Another Label",
  ];

  const orderOptions = [
    {
      category: "creationDate",
      options: [
        {
          value: "oldestToNewest",
          labelKey: "filter.orderTypes.oldestToNewest",
        },
        {
          value: "newestToOldest",
          labelKey: "filter.orderTypes.newestToOldest",
        },
      ],
    },
    {
      category: "alphabeticalOrder",
      options: [
        { value: "aToZ", labelKey: "filter.orderTypes.aToZ" },
        { value: "zToA", labelKey: "filter.orderTypes.zToA" },
      ],
    },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Termo de busca enviado:", searchTerm);
  };

  const handleLabelsChange = (event, newValue) => {
    setSearchLabels(newValue);
    console.log("Labels selecionados:", newValue);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    console.log("Tipo selecionado:", event.target.value);
  };

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
          //height: "100%",
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

      <FormControl
        variant="standard"
        size="small"
        sx={{
          minWidth: 120,
          "& .MuiInput-underline:after": {
            borderBottomColor: theme.colors.borderBottom,
          },
        }}
      >
        <Select
          labelId="type-select-label"
          id="type-select"
          value={selectedType}
          onChange={handleTypeChange}
          displayEmpty
          renderValue={(selected) => {
            if (selected === "") {
              return <em>{t("filter.type")}</em>;
            }
            return selected;
          }}
        >
          <MenuItem value="">
            <em>{t("filter.none")}</em>
          </MenuItem>
          {availableTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}{" "}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
