import { InputAdornment, Stack, TextField } from "@mui/material"
import { useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';

export const MuiTextField = () => {
  const [requiredValue, setRequiredValue] = useState('')

  console.log({ requiredValue });

  return (
    <Stack spacing={4}>
      <Stack spacing={2} direction="row">
        <TextField label="Outlined" variant="outlined" />
        <TextField label="Filled" variant="filled" />
        <TextField label="Standard" variant="standard" />
      </Stack>

      <Stack spacing={2} direction="row">
        <TextField label="Small secondary" size="small" color="secondary" />
      </Stack>

      <Stack spacing={2} direction="row">
        <TextField
          label="Required input"
          required
          value={requiredValue}
          onChange={(e) => setRequiredValue(e.target.value)}
          error={!requiredValue}
          helperText={!requiredValue ? 'Required' : ''}
        />
        <TextField label="Disabled input" disabled />
        <TextField label="Password" type="password" helperText="Don't share your password with anyone" />
        <TextField
          label="Read only"
          slotProps={{ input: { readOnly: true } }}
          value="You can't change this"
        />
      </Stack>

      <Stack spacing={2} direction="row">
        <TextField label="Amount" slotProps={{ input: { startAdornment: '$' } }} />
        <TextField label="Weight" slotProps={{ input: { endAdornment: 'kg' } }} />
      </Stack>

      <Stack spacing={2} direction="row">
        <TextField
          label="Price"
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">$</InputAdornment>
            }
          }}
        />
        <TextField
          label="Height"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">cm</InputAdornment>
            }
          }}
        />
        <TextField
          label="Password"
          type="password"
          helperText="Don't share your password with anyone"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIcon />
                </InputAdornment>
              )
            }
          }}
        />
      </Stack>
    </Stack>
  )
}