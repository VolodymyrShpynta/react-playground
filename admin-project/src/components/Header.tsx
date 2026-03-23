import { Typography, Box } from '@mui/material'

interface HeaderProps {
  title: string
  subtitle: string
}

export const Header = ({ title, subtitle }: HeaderProps) => (
  <Box sx={{ mb: '30px' }}>
    <Typography
      variant="h2"
      color="text.primary"
      fontWeight="bold"
      sx={{ mb: '5px' }}
    >
      {title}
    </Typography>
    <Typography variant="h5" color="secondary.light">
      {subtitle}
    </Typography>
  </Box>
)