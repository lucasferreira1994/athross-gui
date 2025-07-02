import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const persistedAccess = JSON.parse(sessionStorage.getItem("access"));
  const persistedRefresh = JSON.parse(sessionStorage.getItem("refresh"));

  const [access, setAccess] = useState(persistedAccess);
  const [refresh, setRefresh] = useState(persistedRefresh);

  function signUp({ access, refresh }) {
    setAccess(access);
    sessionStorage.setItem("access", JSON.stringify(access));
    setRefresh(refresh);
    sessionStorage.setItem("refresh", JSON.stringify(refresh));
  }
  function logout() {
    setAccess("");
    setRefresh("");
    sessionStorage.removeItem("access");
    sessionStorage.removeItem("refresh");
  }

  return (
    <AuthContext.Provider
      value={{
        access,
        refresh,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
