import { Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material"
import { useState } from "react";

const yearsOfExperienceOptions = [
  { value: '0-2', label: '0-2 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '6-10', label: '6-10 years' },
  { value: '10+', label: '10+ years' },
]

export const MuiRadioButton = () => {
  const [verticalRbValue, setVerticalRbValue] = useState('')
  const [horizontalRbValue, setHorizontalRbValue] = useState('')

  console.log({ verticalRbValue, horizontalRbValue });

  const handleVerticalRbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerticalRbValue((event.target as HTMLInputElement).value)
  }

  const handleHorizontalRbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHorizontalRbValue((event.target as HTMLInputElement).value)
  }

  return (
    <Box>
      {/* Vertical Radio Buttons */}
      <Box>
        <FormControl>
          <FormLabel id="job-experience-group-label">Years of experience</FormLabel>
          <RadioGroup
            name="job-experience-group"
            aria-labelledby="job-experience-group-label"
            value={verticalRbValue}
            onChange={handleVerticalRbChange}
          >
            {yearsOfExperienceOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      {/* Horizontal Radio Buttons */}
      <Box mt={4}>
        <FormControl error={!horizontalRbValue}>
          <FormLabel id="job-experience-group-label">Years of experience</FormLabel>
          <RadioGroup
            name="job-experience-group"
            aria-labelledby="job-experience-group-label"
            row
            value={horizontalRbValue}
            onChange={handleHorizontalRbChange}
          >
            {yearsOfExperienceOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio size="small" color="secondary" />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{!horizontalRbValue && "Please select your years of experience"}</FormHelperText>
        </FormControl>
      </Box>
    </Box>
  )
}