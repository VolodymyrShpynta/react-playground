import { createContext, useState, useMemo } from "react";
import { alpha, createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";
import type { Theme } from "@mui/material/styles";

// ---------------------------------------------------------------------------
// TypeScript augmentation — extend MUI's palette types with custom semantic
// slots so components reference intent, not specific colour shades.
// ---------------------------------------------------------------------------
declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter: string
    darker: string
  }
  interface SimplePaletteColorOptions {
    lighter?: string
    darker?: string
  }
}

interface ColorModeToggle {
  toggleColorMode: () => void;
}

// ---------------------------------------------------------------------------
// Color scales — each defined once, lightest → darkest.
// themeSettings picks different shades per mode from these static scales.
// ---------------------------------------------------------------------------

const grey = {
  100: '#e0e0e0',
  200: '#c2c2c2',
  300: '#a3a3a3',
  400: '#858585',
  500: '#666666',
  600: '#525252',
  700: '#3d3d3d',
  800: '#292929',
  900: '#141414',
} as const

const navy = {
  100: '#d0d1d5',
  200: '#a1a4ab',
  300: '#727681',
  400: '#1F2A40',
  500: '#141b2d',
  600: '#101624',
  700: '#0c101b',
  800: '#080b12',
  900: '#040509',
} as const

const greenAccent = {
  100: '#dbf5ee',
  200: '#b7ebde',
  300: '#94e2cd',
  400: '#70d8bd',
  500: '#4cceac',
  600: '#3da58a',
  700: '#2e7c67',
  800: '#1e5245',
  900: '#0f2922',
} as const

const redAccent = {
  100: '#f8dcdb',
  200: '#f1b9b7',
  300: '#e99592',
  400: '#e2726e',
  500: '#db4f4a',
  600: '#af3f3b',
  700: '#832f2c',
  800: '#58201e',
  900: '#2c100f',
} as const

const blueAccent = {
  50: '#f9f8ff',
  75: '#ededf7',
  100: '#e1e2fe',
  200: '#c3c6fd',
  300: '#a4a9fc',
  400: '#868dfb',
  500: '#6870fa',
  600: '#535ac8',
  700: '#3e4396',
  800: '#2a2d64',
  900: '#151632',
} as const

// Exported for non-component consumers (e.g. static chart data) that can't
// access the theme via hooks.
export const colors = { grey, navy, greenAccent, redAccent, blueAccent } as const

// mui theme settings
export const themeSettings = (mode: PaletteMode) => {
  const isDarkMode = mode === 'dark';

  // Derived colors reused by multiple component overrides below.
  const paperBg = isDarkMode ? navy[400] : blueAccent[50];
  const gridHeader = isDarkMode ? blueAccent[700] : blueAccent[75];

  const scrollbarTrack = isDarkMode ? navy[500] : grey[100];
  const scrollbarThumbStart = isDarkMode ? navy[400] : grey[300];
  const scrollbarThumbEnd = isDarkMode ? blueAccent[600] : grey[600];
  const scrollbarThumbHoverStart = isDarkMode ? blueAccent[400] : blueAccent[500];
  const scrollbarThumbHoverEnd = isDarkMode ? blueAccent[500] : blueAccent[600];

  return {
    palette: {
      mode: mode,
      primary: {
        main: isDarkMode ? navy[500] : navy[900],
      },
      secondary: {
        lighter: isDarkMode ? greenAccent[300] : greenAccent[700],
        light: isDarkMode ? greenAccent[400] : greenAccent[600],
        main: greenAccent[500],
        dark: isDarkMode ? greenAccent[600] : greenAccent[400],
        darker: isDarkMode ? greenAccent[700] : greenAccent[300],
      },
      info: {
        light: isDarkMode ? blueAccent[400] : blueAccent[600],
        main: blueAccent[500],
        dark: isDarkMode ? blueAccent[700] : blueAccent[300],
      },
      error: {
        main: redAccent[500],
      },
      text: {
        primary: isDarkMode ? grey[100] : grey[900],
        secondary: isDarkMode ? grey[300] : grey[700],
      },
      background: {
        // Light mode: omit `default` so MUI uses its built-in white.
        // Setting it to `undefined` explicitly would override MUI's default
        // and crash components that call alpha() on background.default.
        ...(isDarkMode && { default: navy[500] }),
        paper: paperBg,
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: 12,
      h1: { fontSize: 40 },
      h2: { fontSize: 32 },
      h3: { fontSize: 24 },
      h4: { fontSize: 20 },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollbarGutter: 'stable',
          },
          '*': {
            scrollbarWidth: 'thin',
            scrollbarColor: `${scrollbarThumbStart} ${scrollbarTrack}`,
          },
          '*::-webkit-scrollbar': {
            width: '12px',
            height: '12px',
          },
          '*::-webkit-scrollbar-track': {
            backgroundColor: scrollbarTrack,
          },
          '*::-webkit-scrollbar-thumb': {
            background: `linear-gradient(180deg, ${scrollbarThumbStart} 0%, ${scrollbarThumbEnd} 100%)`,
            border: `3px solid ${scrollbarTrack}`,
            borderRadius: '999px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: `linear-gradient(180deg, ${scrollbarThumbHoverStart} 0%, ${scrollbarThumbHoverEnd} 100%)`,
          },
          '*::-webkit-scrollbar-corner': {
            backgroundColor: scrollbarTrack,
          },
        },
      },
      // ---------------------------------------------------------------------------
      // DataGrid — global overrides so every grid in the app shares a consistent
      // borderless look. Per-page tweaks (e.g. custom cell colours) should go in
      // the component's own `sx`.
      // ---------------------------------------------------------------------------
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 'none',
            backgroundColor: paperBg,
          },
          cell: {
            borderBottom: 'none',
          },
          // Row background — uses paperBg so rows blend with the
          // page background while the header/footer stand out.
          row: {
            backgroundColor: paperBg,
            '&:hover': {
              backgroundColor: alpha(isDarkMode ? blueAccent[600] : blueAccent[400], 0.15),
            },
            '&.Mui-selected': {
              backgroundColor: alpha(isDarkMode ? blueAccent[600] : blueAccent[400], 0.22),
              '&:hover': {
                backgroundColor: alpha(blueAccent[500], 0.3),
              },
            },
          },
          columnHeader: {
            backgroundColor: gridHeader,
          },
          footerContainer: {
            borderTop: 'none',
            backgroundColor: gridHeader,
          },
          checkboxInput: {
            color: isDarkMode ? greenAccent[200] : greenAccent[800],
            '&.Mui-checked': {
              color: isDarkMode ? greenAccent[400] : greenAccent[600],
            },
          },
        },
      },
    },
  };
};

// context for color mode
export const ColorModeToggleContext = createContext<ColorModeToggle>({
  toggleColorMode: () => { },
});

export const useColorTheme = (): [Theme, ColorModeToggle] => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const colorModeToggle = useMemo<ColorModeToggle>(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorModeToggle];
};