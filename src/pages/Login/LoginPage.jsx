import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styled from "styled-components";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const sxStyle = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "transparent", // Fundo
      "& fieldset": {
        borderColor: "#E0E0E0", // Cor da borda
      },
      "&:hover fieldset": {
        borderColor: "#CCCCCC", // borda ao passar o mouse
      },
      "&.Mui-focused fieldset": {
        borderColor: "#01404b", // borda quando o input está focado
      },
    },
    "& .MuiInputBase-input": {
      color: "#ffffff", // Cor do texto digitado
    },
    "& .MuiInputLabel-root": {
      color: "#ffffff", // Cor do placeholder
    },
    "& .MuiSvgIcon-root": {
      color: "#ffffff", // Cor do ícone
    },
  };

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    username: false,
    password: false,
  });

  const validateUser = (info) => {
    const errors = {};
    if (!info.username) {
      errors.username = true;
    }
    if (!info.password) {
      errors.password = true;
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateUser(loginInfo);
    if (errors.username || errors.password) {
      setValidationErrors(errors);
      return;
    }
    setLoading(true);
    console.log(loginInfo);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit}>
        <h1>ATHROSS</h1>
        <TextField
          id="username"
          placeholder={t("username")}
          variant="outlined"
          margin="normal"
          size="small"
          sx={sxStyle}
          value={loginInfo.username}
          error={validationErrors.username}
          onChange={(e) => {
            setLoginInfo({ ...loginInfo, username: e.target.value });
            setValidationErrors({ ...validationErrors, username: false });
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          id="password"
          placeholder={t("password")}
          variant="outlined"
          margin="normal"
          size="small"
          sx={sxStyle}
          value={loginInfo.password}
          error={validationErrors.password}
          onChange={(e) => {
            setLoginInfo({ ...loginInfo, password: e.target.value });
            setValidationErrors({ ...validationErrors, password: false });
          }}
          type={showPassword ? "text" : "password"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockPersonIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          variant="contained"
          size="small"
          type="submit"
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#01404b",
            "&:hover": {
              backgroundColor: "#e2e1e1",
              color: "#01404b",
            },
            border: "1px solid #E0E0E0",
            boxShadow: "none",
            textTransform: "none",
            width: "50%",
            marginTop: "26px",
            height: "30px",
          }}
        >
          {!loading ? "LOGIN" : <CircularProgress size="21px" color="info" />}
        </Button>
      </FormContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.loginBackground};
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: #ffffff;
    margin-bottom: 10px;
  }
`;
