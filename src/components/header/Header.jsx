import { useState, useEffect } from "react";
import styled from "styled-components";
import Settings from "./Settings";
import { useTranslation } from "react-i18next";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

export default function Header({ setTheme }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp, username, logout } = useAuth();

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Formato 24h
  });

  const [openConfig, setOpenConfig] = useState(false);

  const logoutFunction = () => {
    logout();
    navigate("/");
  };

  const getUserData = async () => {
    try {
      const data = await api.users.getUser();
      signUp(data.username);
    } catch (error) {}
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <HeaderContainer>
      <UserContent>
        <div id="user">
          <p>
            {t("username")}: {username || t("notFound")}
          </p>
        </div>
        <div id="time">
          <p>
            {t("date")}: {formattedDateTime}
          </p>
        </div>
      </UserContent>
      <SettingsDiv>
        <ExitToAppIcon
          sx={{
            color: "#ffffff",
            cursor: "pointer",
          }}
          onClick={logoutFunction}
        />
        <SettingsIcon
          sx={{
            color: "#ffffff",
            cursor: "pointer",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "rotate(150deg)",
            },
          }}
          onClick={() => setOpenConfig(true)}
        />
      </SettingsDiv>

      <Settings open={openConfig} setOpen={setOpenConfig} setTheme={setTheme} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.loginBackground};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 10px 60px;
`;

const UserContent = styled.div`
  height: 100%;

  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  p {
    color: #ffffff;
    font-weight: 500;
    font-size: 14px;
  }
`;

const SettingsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
