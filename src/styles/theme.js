const commonColors = {
  white: "#FFFFFF",
  black: "#000000",
  grayLight: "#F5F5F5",
  grayMedium: "#CCCCCC",
  grayDark: "#333333",
  primaryBlue: "#007bff", // Azul comum para ações primárias
  secondaryGray: "#6c757d", // Cinza para ações secundárias
  successGreen: "#28a745",
  errorRed: "#dc3545",
  warningYellow: "#ffc107",
  loginBackground: "#005564", // 2148c0 051d64 #040A24
};

// --- Tema Claro (Light Theme) ---
export const lightTheme = {
  mode: "light",
  colors: {
    // Fundo
    background: "#e7e9e8",
    surface: commonColors.grayLight, // Para cards, modais, etc.

    // Texto
    textColor: commonColors.grayDark, // Texto principal escuro em fundo claro
    textSecondary: commonColors.secondaryGray, // Texto secundário, legendas

    // Cores de Ação/Marca
    primary: commonColors.primaryBlue, // Cor principal da aplicação
    secondary: commonColors.secondaryGray, // Cor secundária/ênfase
    accent: "#6200EE", // Uma cor de destaque, exemplo roxo

    // Botões
    buttonBackgroundPrimary: commonColors.primaryBlue,
    buttonTextPrimary: commonColors.white,
    buttonBackgroundSecondary: commonColors.grayMedium,
    buttonTextSecondary: commonColors.Colors,

    // Bordas e Divisores
    borderColor: "#E0E0E0",
    dividerColor: "#EEEEEE",

    // Estados
    success: commonColors.successGreen,
    error: commonColors.errorRed,
    warning: commonColors.warningYellow,
    info: commonColors.primaryBlue,

    loginBackground: commonColors.loginBackground,
    borderBottom: "#0295af",

    documents: {
      backgroundColor: "#FFFFFF",
      buttonText: "#3b3b3b",
      buttonTextSelected: "#FFFFFF",
      buttonColor: "#303B46",

      title: "#000000",
      border: "hsl(240 5.9% 90%)", //#1A1A1A
      secondary: "#6f6f6f",
      downButton: "#e5e5e5",
      label: "#000000",
    },
  },
};

// --- Tema Escuro (Dark Theme) ---
export const darkTheme = {
  mode: "dark",
  colors: {
    // Fundo
    background: "#0D1117", // Fundo bem escuro "#1a1a1a"
    surface: "#1E1E1E", // Para cards, modais, etc., um pouco mais claro que o fundo

    // Texto
    textColor: commonColors.white, // Texto principal claro em fundo escuro
    textSecondary: commonColors.grayMedium, // Texto secundário, legendas

    // Cores de Ação/Marca
    primary: "#BB86FC", // Um tom de azul/roxo que funciona bem no escuro
    secondary: "#03DAC6", // Um tom de ciano que contrasta bem
    accent: "#03DAC6", // Mesma cor de destaque, ou diferente se preferir

    // Botões
    buttonBackgroundPrimary: "#BB86FC",
    buttonTextPrimary: commonColors.black,
    buttonBackgroundSecondary: commonColors.grayDark,
    buttonTextSecondary: commonColors.white,

    // Bordas e Divisores
    borderColor: "#383838",
    dividerColor: "#2C2C2C",

    // Estados
    success: "#66BB6A", // Tons de verde mais suaves
    error: "#EF5350", // Tons de vermelho mais suaves
    warning: "#FFEB3B", // Tons de amarelo mais suaves
    info: "#2196F3",

    loginBackground: commonColors.loginBackground,
    borderBottom: "#0295af",

    documents: {
      backgroundColor: "#171c24", // 363636
      buttonText: "#FFFFFF",
      buttonTextSelected: "#303B46",
      buttonColor: "#FFFFFF",

      title: "#FFFFFF",
      border: "#1A1A1A",
      secondary: "#bdbdbd",
      downButton: "#1A1A1A",
      label: "#adadad",
    },
  },
};
