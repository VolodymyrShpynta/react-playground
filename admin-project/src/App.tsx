import { ThemeProvider } from "@emotion/react";
import { ColorModeToggleContext, useColorTheme } from "./theme"

function App() {
  const [theme, colorModeToggle] = useColorTheme();

  return (
    <ColorModeToggleContext.Provider value={colorModeToggle}>
      <ThemeProvider theme={theme}>
        <div className="app">
          <main className="content">Admin Dashboard</main>
        </div>
      </ThemeProvider>
    </ColorModeToggleContext.Provider>
  )
}

export default App
