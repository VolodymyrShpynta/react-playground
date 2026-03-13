import { ThemeProvider, CssBaseline } from '@mui/material';
import { ColorModeToggleContext, useColorTheme } from "./theme"
import Topbar from "./scenes/global/Topbar";

function App() {
  const [theme, colorModeToggle] = useColorTheme();

  return (
    <ColorModeToggleContext.Provider value={colorModeToggle}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Applies theme-aware global reset so body/background follow light-dark mode  */}
        <div className="app">
          <main className="content">
            <Topbar />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeToggleContext.Provider>
  )
}

export default App;
