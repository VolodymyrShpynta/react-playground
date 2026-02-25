import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from "@mui/material"
import { useState } from "react";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export const MuiCheckbox = () => {
  const [checked, setChecked] = useState(false)
  const [bookmarkChecked, setBookmarkChecked] = useState(false)
  const [skills, setSkills] = useState<string[]>([])

  console.log({ checked, bookmarkChecked, skills });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setChecked(event.target.checked)
  }

  function handleBookmarkChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setBookmarkChecked(event.target.checked)
  }

  function handleSkillChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value
    setSkills((prev) => prev.includes(value) ? prev.filter((skill) => skill !== value) : [...prev, value])
  }

  return (
    <Box>
      <Box>
        <FormControlLabel
          label="I accept the terms and conditions"
          control={
            <Checkbox size="small" color="secondary" checked={checked} onChange={handleChange} />
          }
        />
      </Box>

      <Box>
        <FormControlLabel
          label="Bookmark"
          control={
            <Checkbox
              icon={<BookmarkBorderIcon />}
              checkedIcon={<BookmarkIcon />}
              checked={bookmarkChecked}
              onChange={handleBookmarkChange}
            />
          }
        />
      </Box>

      <Box mt={4}>
        <FormControl error={!skills.length}>
          <FormLabel>Skills</FormLabel>
          <FormGroup>
            <FormControlLabel
              label="HTML"
              control={<Checkbox value="HTML" checked={skills.includes("HTML")} onChange={handleSkillChange} />}
            />
            <FormControlLabel
              label="CSS"
              control={<Checkbox value="CSS" checked={skills.includes("CSS")} onChange={handleSkillChange} />}
            />
            <FormControlLabel
              label="JavaScript"
              control={<Checkbox value="JavaScript" checked={skills.includes("JavaScript")} onChange={handleSkillChange} />}
            />
          </FormGroup>
          <FormHelperText>{!skills.length && "Please select at least one skill"}</FormHelperText>
        </FormControl>
      </Box>
    </Box>
  )
}