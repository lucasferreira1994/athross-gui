import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styled, { useTheme } from "styled-components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
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
    email: "",
    password: "",
    remember: false,
  });

  const [validationErrors, setValidationErrors] = useState({
    email: false,
    password: false,
  });

  const validateUser = (info) => {
    const errors = {};
    if (!info.email) {
      errors.email = true;
    }
    if (!info.password) {
      errors.password = true;
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const errors = validateUser(loginInfo);
    if (errors.email || errors.password) {
      setValidationErrors(errors);
      return;
    }

    try {
      const data = await api.users.signIn(loginInfo);
      console.log(data);
      navigate("/documents");
    } catch (error) {
      toast.error(
        error?.response?.data?.detail || error?.message || t("errorSend")
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const data = await api.users.getUser();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit}>
        <h1>ATHROSS</h1>
        <TextField
          id="email"
          placeholder="Email"
          variant="outlined"
          margin="normal"
          size="small"
          disabled={loading}
          sx={sxStyle}
          value={loginInfo.email}
          error={validationErrors.email}
          onChange={(e) => {
            setLoginInfo({ ...loginInfo, email: e.target.value });
            setValidationErrors({ ...validationErrors, email: false });
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
          disabled={loading}
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
        <div className="remember">
          <FormControlLabel
            control={
              <Checkbox
                id="remember-me"
                checked={loginInfo.remember}
                disabled={loading}
                size="small"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, remember: e.target.checked });
                }}
                sx={{
                  color: "#ffffff",
                  "&.Mui-checked": {
                    color: "#ffffff",
                  },
                }}
              />
            }
            label={t("rememberMe")}
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "#ffffff",
                fontSize: "13px",
              },
            }}
          />
        </div>
        <Button
          variant="contained"
          size="small"
          type="submit"
          disabled={loading}
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
            marginTop: "18px",
            height: "30px",
          }}
        >
          {!loading ? "LOGIN" : <CircularProgress size="21px" color="info" />}
        </Button>
      </FormContainer>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.mode}
        transition={Slide}
      />
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
  .remember {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
  }
`;
