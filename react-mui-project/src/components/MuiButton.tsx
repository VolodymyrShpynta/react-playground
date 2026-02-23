import { Button, Stack } from '@mui/material'

export const MuiButton = () => {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained">contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </Stack>
  )
}