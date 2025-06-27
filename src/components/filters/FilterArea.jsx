import { useState, Fragment } from "react";
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

  const availableTypes = ["type 1", "type 2", "type 3", "type 4"];

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

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    console.log("Tipo selecionado:", event.target.value);
  };

  const handleOrderChange = (event) => {
    console.log(
      "Valor do Select recebido:",
      event.target.value,
      "Tipo:",
      typeof event.target.value
    );
    setSelectedOrder(event.target.value);
  };

  const handleAdvancedFilter = () => {
    console.log("Filtro Avançado clicado!");
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
            width: "300px",
            "& .MuiInput-underline:after": {
              borderBottomColor: theme.colors.borderBottom, // #0295af
            },
          }}
        />
        <IconButton
          aria-label={t("search.confirmSearch")}
          type="submit"
          size="small"
          sx={{
            borderRadius: "5px",
          }}
        >
          <SearchIcon sx={{ color: theme.colors.white }} />
        </IconButton>
      </SearchBox>

      <SearchBox>
        {/* Select para Tipos */}
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
        {/* Botão de Filtro Avançado com Tooltip */}
        <Tooltip title={t("advancedFilter.tooltip")} arrow placement="bottom">
          <IconButton
            aria-label={t("advancedFilter.ariaLabel")}
            size="small"
            onClick={handleAdvancedFilter}
            sx={{
              borderRadius: "5px",
            }}
          >
            <FilterListIcon sx={{ color: theme.colors.white }} />
          </IconButton>
        </Tooltip>
      </SearchBox>

      {/* Select para Ordem com Categorias */}
      <FormControl
        variant="standard"
        size="small"
        sx={{
          minWidth: 180,
          "& .MuiInput-underline:after": {
            borderBottomColor: theme.colors.borderBottom, // Certifique-se que essa cor está definida no seu tema
          },
        }}
      >
        <Select
          labelId="order-select-label"
          id="order-select"
          value={selectedOrder}
          onChange={handleOrderChange}
          displayEmpty
          renderValue={(selected) => {
            if (selected === "") {
              return <em>{t("filter.order")}</em>;
            }
            const foundOption = orderOptions
              .flatMap((cat) => cat.options)
              .find((opt) => opt.value === selected);

            return foundOption ? t(foundOption.labelKey) : selected;
          }}
          sx={{
            "& .MuiInput-underline:after": {
              borderBottomColor: theme.colors.primaryBlue,
            },
          }}
        >
          <MenuItem value="" sx={{ display: "flex", justifyContent: "center" }}>
            <em>{t("filter.none")}</em>{" "}
          </MenuItem>
          {orderOptions.map((categoryGroup, index) => {
            const itemsToRender = [
              <Divider
                key={`subheader-${categoryGroup.category}`}
                sx={{ fontSize: "12px", margin: "5px 0" }}
              >
                {t(`filter.category.${categoryGroup.category}`)}
              </Divider>,
              ...categoryGroup.options.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {t(option.labelKey)}
                </MenuItem>
              )),
            ];

            return itemsToRender;
          })}
        </Select>
      </FormControl>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  gap: 22px;
`;

const SearchBox = styled.form`
  width: auto;
  display: flex;
  align-items: center;
  gap: 10px;
`;
