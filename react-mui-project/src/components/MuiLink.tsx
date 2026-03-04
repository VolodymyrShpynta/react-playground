import { Box, Link, Stack, Typography } from '@mui/material'

// MUI Link docs: https://mui.com/material-ui/react-link/
// Link renders an <a> tag by default. Use the `component` prop to change the root element.
// For router integration (e.g. React Router), set component={RouterLink} and use `to` instead of `href`.

export const MuiLink = () => {
  return (
    <Stack spacing={4}>

      {/* Basic link */}
      <Box>
        <Typography variant="h6" gutterBottom>Basic link</Typography>
        <Link href="https://mui.com" target="_blank" rel="noopener">
          MUI Documentation
        </Link>
      </Box>

      {/* underline prop: always | hover | none */}
      <Box>
        <Typography variant="h6" gutterBottom>underline prop</Typography>
        <Stack spacing={2} direction="row">
          <Link href="#" underline="always">always</Link>
          <Link href="#" underline="hover">hover</Link>
          <Link href="#" underline="none">none</Link>
        </Stack>
      </Box>

      {/* color prop — accepts theme palette keys or any CSS color */}
      <Box>
        <Typography variant="h6" gutterBottom>color prop</Typography>
        <Stack spacing={2} direction="row">
          <Link href="#" color="primary">primary</Link>
          <Link href="#" color="secondary">secondary</Link>
          <Link href="#" color="error">error</Link>
          <Link href="#" color="warning.main">warning</Link>
          <Link href="#" color="info.main">info</Link>
          <Link href="#" color="success.main">success</Link>
          <Link href="#" color="text.primary">text.primary</Link>
          <Link href="#" color="text.secondary">text.secondary</Link>
          <Link href="#" color="inherit">inherit</Link>
        </Stack>
      </Box>

      {/* variant prop — maps to Typography variants */}
      <Box>
        <Typography variant="h6" gutterBottom>variant prop (typography scale)</Typography>
        <Stack spacing={1}>
          <Link href="#" variant="h5">h5 link</Link>
          <Link href="#" variant="h6">h6 link</Link>
          <Link href="#" variant="subtitle1">subtitle1 link</Link>
          <Link href="#" variant="body1">body1 link</Link>
          <Link href="#" variant="body2">body2 link</Link>
          <Link href="#" variant="caption">caption link</Link>
        </Stack>
      </Box>

      {/* Opening in a new tab — always pair target="_blank" with rel="noopener" */}
      <Box>
        <Typography variant="h6" gutterBottom>External link (new tab)</Typography>
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub (opens in new tab)
        </Link>
      </Box>

      {/* Link as a button — no href, use component="button" + onClick */}
      <Box>
        <Typography variant="h6" gutterBottom>Link as button (no navigation)</Typography>
        <Link
          component="button"
          variant="body1"
          onClick={() => alert('Link-button clicked!')}
        >
          Click me without navigating
        </Link>
      </Box>

      {/* Link inside Typography — inherits the surrounding text style */}
      <Box>
        <Typography variant="h6" gutterBottom>Link inside Typography</Typography>
        <Typography variant="body1">
          You can embed a{' '}
          <Link href="https://mui.com/material-ui/react-link/" target="_blank" rel="noopener">
            MUI Link
          </Link>{' '}
          inline within a paragraph of text.
        </Typography>
      </Box>

      {/* sx prop — arbitrary CSS overrides */}
      <Box>
        <Typography variant="h6" gutterBottom>Custom styling via sx</Typography>
        <Stack spacing={2} direction="row">
          <Link
            href="#"
            sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
          >
            Bold link
          </Link>
          <Link
            href="#"
            sx={{ color: 'purple', textDecorationColor: 'purple' }}
          >
            Custom color
          </Link>
          <Link
            href="#"
            sx={{
              color: 'text.primary',
              '&:hover': { color: 'primary.main' },
              transition: 'color 0.2s',
            }}
          >
            Hover transition
          </Link>
        </Stack>
      </Box>

    </Stack>
  )
}
