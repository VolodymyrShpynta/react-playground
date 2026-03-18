import { Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { colorTokens } from '../theme'

interface HeaderProps {
  title: string
  subtitle: string
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  const theme = useTheme()
  const colors = colorTokens(theme.palette.mode)

  return (
    <Box sx={{ mb: '30px' }}>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: '5px' }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  )
}