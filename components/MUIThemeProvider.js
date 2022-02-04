import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#477BFF",
    },
  },
  typography: {
    fontFamily: "General Sans",
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "var(--light-gray) !important",
          fontWeight: "300 !important",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "var(--light-gray)",
        },
        notchedOutline: {
          border: "solid 3px var(--light-gray) !important",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "var(--light-gray) !important",
          color: "var(--dark-gray)",
          fontWeight: "600",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: "var(--light-gray)",
          border: "solid 3px var(--light-gray) !important",
          marginRight: 10,
          borderRadius: 4,
          fontWeight: "600",
          "&.Mui-selected": {
            backgroundColor: "var(--light-gray) !important",
            color: "var(--dark-gray) !important",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          color: "var(--dark-gray)",
          border: "solid 3px var(--dark-gray) !important",
          borderRadius: "5px !important",
          fontWeight: "700",
          backgroundColor: "transparent",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        expandIconWrapper: {
          color: "var(--dark-gray)",
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          fontWeight: "400 !important",
        },
      },
    },
    MuiInput: {
      "primary": "white",
      styleOverrides: {
        root: {
          "&.Mui-focused fieldset": {
            borderColor: "red !important",
            ":after": {
              "borderColor": "red !important"
            },
            ":before": {
              "borderColor": "red !important"
            }
          }
        }
      }
    },
  },
});

function MUIThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default MUIThemeProvider;
