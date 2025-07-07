import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const persistedUsername = JSON.parse(localStorage.getItem("username"));

  const [username, setUsername] = useState(persistedUsername);
  const [exit, setExit] = useState(false);

  function signUp(username) {
    setUsername(username);
    localStorage.setItem("username", JSON.stringify(username));
    setExit(false);
  }
  function logout() {
    setUsername("");
    localStorage.removeItem("username");
    setExit(true);
  }

  const [numOfColumns, setNumOfColumns] = useState(4);

  return (
    <AuthContext.Provider
      value={{
        username,
        exit,
        numOfColumns,
        setNumOfColumns,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
