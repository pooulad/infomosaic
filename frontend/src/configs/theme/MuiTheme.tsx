import { createContext, useMemo, useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Poppins from "../../assets/fonts/Poppins/Poppins.ttf";

interface Props {
  children: React.ReactNode;
}

type themeColor = "light" | "dark";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const Theme: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = useState<themeColor>("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: themeColor) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );
  localStorage.setItem("theme", mode);
  const theme = useMemo(
    () =>
      createTheme({
        direction: "ltr",
        typography: {
          fontFamily: [
            "Poppins",
            "Arial",
            "Helvetica",
            "sans-serif",
          ].join(","),
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: `   
                    @font-face {
                      font-family: "Poppins";
                      font-style: normal;
                      font-display: swap;
                      font-weight: 400;
                      src: local("Poppins"), local("Poppins"), url(${Poppins}) format("truetype");
                      unicoderange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
                        U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
                        U+FEFF;
                    }
              
                    a {
                      text-decoration: none;
                      color: inherit
                    }

                    ::-webkit-scrollbar {
                        border-radius: 10px;
                        width: 6px;
                    }
                    ::-webkit-scrollbar-track {
                        border-radius: 10px;
                        backdrop-filter: blur(4px);
                    }
                    ::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        background-color: #707070;
                    }
                  `,
          },
        },
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#b3da3f",
                },
                secondary: {
                  main: "#2f4858",
                },
                success: {
                  main: "#5ac466",
                },
                error: {
                  main: "#EB4D4B",
                },
                background: {
                  paper: "#FFFFFF",
                  default: "#FFFFFF",
                },
                action: {
                  disabled: "transparent",
                },
                text: {
                  disabled: "none",
                  primary: "#2f4858",
                  secondary: "#343434",
                },
                divider: "#707070",
              }
            : {
                primary: {
                  main: "#2f4858",
                },
                secondary: {
                  main: "#b3da3f",
                },
                success: {
                  main: "#13DB63",
                },
                error: {
                  main: "#EB4D4B",
                },
                background: {
                  paper: "#0c0e26",
                  default: "#0c0e26",
                },
                action: {
                  disabled: "transparent",
                },
                text: {
                  disabled: "none",
                  primary: "#FFFFFF",
                  secondary: "#FFFFFF",
                },
                divider: "#707070",
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Theme;
