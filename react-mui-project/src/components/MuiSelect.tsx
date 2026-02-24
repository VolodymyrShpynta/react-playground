import { Box, MenuItem, TextField } from "@mui/material"
import { useState, type ChangeEvent } from "react"

const countryOptions = [
  { code: "IN", label: "India" },
  { code: "US", label: "United States" },
  { code: "UK", label: "United Kingdom" },
]

export const MuiSelect = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState<string[]>([])

  console.log({ country, countries });

  function handleSelectCountry(event: ChangeEvent<HTMLInputElement, Element>): void {
    setCountry(event.target.value)
  }

  function handleSelectCountries(event: ChangeEvent<HTMLInputElement, Element>): void {
    const value = event.target.value
    setCountries(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <Box>
      {/* Single select */}
      <Box width='250px'>
        <TextField
          select
          label='Select country'
          fullWidth
          size="small"
          color="secondary"
          helperText="Please select your country"
          value={country}
          onChange={handleSelectCountry}
        >
          {countryOptions.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Multiple select */}
      <Box width='250px' mt={4}>
        <TextField
          select
          label='Select countries'
          fullWidth
          slotProps={{ select: { multiple: true } }}
          value={countries}
          onChange={handleSelectCountries}
        >
          {countryOptions.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  )
}