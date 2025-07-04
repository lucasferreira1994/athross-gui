import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import CheckIcon from "@mui/icons-material/Check";
import BR from "../../assets/brazil.png";
import EN from "../../assets/united-states.png";
import ES from "../../assets/spain.png";

import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import useAuth from "../../hooks/useAuth";

export default function Settings({ open, setOpen, setTheme }) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { numOfColumns, setNumOfColumns } = useAuth();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleThemeChange = (mode) => {
    setTheme(mode);
  };
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const languageFlags = {
    ptBR: BR,
    en: EN,
    es: ES,
  };

  const handleColumnsToggleChange = (event, newSelection) => {
    if (newSelection !== null) {
      setNumOfColumns(newSelection);
    }
  };

  const drawerContent = (
    <Box
      sx={{
        width: 280,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: (theme) => theme.palette.background.paper, // cor de fundo do tema MUI
        color: (theme) => theme.palette.text.primary, // cor do texto do tema MUI
      }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <h3>{t("settings")}</h3>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider>{t("theme")}</Divider>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleThemeChange("light")}>
            <ListItemIcon>
              <LightModeIcon />
            </ListItemIcon>
            <ListItemText primary={t("lightTheme")} />
            {theme.mode === "light" && (
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  marginLeft: "auto",
                }}
              >
                <CheckIcon color="primary" />
              </ListItemIcon>
            )}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleThemeChange("dark")}>
            <ListItemIcon sx={{ color: theme.colors.textColor }}>
              <DarkModeIcon />
            </ListItemIcon>
            <ListItemText primary={t("darkTheme")} />
            {theme.mode === "dark" && (
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  marginLeft: "auto",
                }}
              >
                <CheckIcon color="primary" />
              </ListItemIcon>
            )}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider>{t("language")}</Divider>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleLanguageChange("ptBR")}>
            <ListItemIcon>
              <img
                src={languageFlags.ptBR}
                alt="Bandeira do Brasil"
                style={{ width: 24, height: 24 }}
              />
            </ListItemIcon>
            <ListItemText primary={t("ptBR")} />
            {i18n.language === "ptBR" && (
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  marginLeft: "auto",
                }}
              >
                <CheckIcon color="primary" />
              </ListItemIcon>
            )}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleLanguageChange("en")}>
            <ListItemIcon>
              <img
                src={languageFlags.en}
                alt="Bandeira dos EUA"
                style={{ width: 24, height: 24 }}
              />
            </ListItemIcon>
            <ListItemText primary={t("en")} />
            {i18n.language === "en" && (
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  marginLeft: "auto",
                }}
              >
                <CheckIcon color="primary" />
              </ListItemIcon>
            )}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleLanguageChange("es")}>
            <ListItemIcon>
              <img
                src={languageFlags.es}
                alt="Bandeira da Espanha"
                style={{ width: 24, height: 24 }}
              />
            </ListItemIcon>
            <ListItemText primary={t("es")} />
            {i18n.language === "es" && (
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  marginLeft: "auto",
                }}
              >
                <CheckIcon color="primary" />
              </ListItemIcon>
            )}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider>{t("numberOfColumns")}</Divider>
      <div style={{ padding: "16px 25px 20px" }}>
        <ToggleButtonGroup
          value={numOfColumns}
          exclusive
          size="small"
          onChange={handleColumnsToggleChange}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            "& .MuiToggleButton-root": {
              flexGrow: 1,
            },
          }}
        >
          <ToggleButton value={1}>1</ToggleButton>
          <ToggleButton value={2}>2</ToggleButton>
          <ToggleButton value={3}>3</ToggleButton>
          <ToggleButton value={4}>4</ToggleButton>
          <ToggleButton value={5}>5</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Divider sx={{ borderColor: theme.colors.borderColor }} />
      <Box sx={{ padding: "16px", flexGrow: 1 }}></Box>
    </Box>
  );

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      {drawerContent}
    </Drawer>
  );
}
