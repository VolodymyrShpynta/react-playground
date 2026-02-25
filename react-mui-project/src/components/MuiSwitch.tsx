import { Box, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Switch } from "@mui/material"
import { useState } from "react";

export const MuiSwitch = () => {
  const [checked, setChecked] = useState(false)
  const [skills, setSkills] = useState<string[]>([])

  console.log({ checked, skills });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setChecked(event.target.checked)
  }

  function handleSkillChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value
    setSkills((prev) => prev.includes(value) ? prev.filter((skill) => skill !== value) : [...prev, value])
  }

  return (
    <Box>
      <Box>
        <FormControlLabel
          label="Dark mode"
          control={
            <Switch size="small" color="success" checked={checked} onChange={handleChange} />
          }
        />
      </Box>

      <Box mt={4}>
        <FormControl error={!skills.length}>
          <FormLabel>Skills</FormLabel>
          <FormGroup>
            <FormControlLabel
              label="HTML"
              control={<Switch value="HTML" checked={skills.includes("HTML")} onChange={handleSkillChange} />}
            />
            <FormControlLabel
              label="CSS"
              control={<Switch value="CSS" checked={skills.includes("CSS")} onChange={handleSkillChange} />}
            />
            <FormControlLabel
              label="JavaScript"
              control={<Switch value="JavaScript" checked={skills.includes("JavaScript")} onChange={handleSkillChange} />}
            />
          </FormGroup>
          <FormHelperText>{!skills.length && "Please select at least one skill"}</FormHelperText>
        </FormControl>
      </Box>
    </Box>
  )
}
