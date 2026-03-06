import { Box, Breadcrumbs, Link, Stack, Typography } from '@mui/material'

// MUI Breadcrumbs docs: https://mui.com/material-ui/react-breadcrumbs/
// Breadcrumbs renders a navigation trail of links.
// The last item typically uses Typography (not Link) to represent the current page.
// For router integration, set component={RouterLink} on each Link and use `to` instead of `href`.

import HomeIcon from '@mui/icons-material/Home'
import FolderIcon from '@mui/icons-material/Folder'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

export const MuiBreadcrumbs = () => {
  return (
    <Stack spacing={4}>

      {/* Basic breadcrumbs — Link for ancestors, Typography for current page */}
      <Box>
        <Typography variant="h6" gutterBottom>Basic breadcrumbs</Typography>
        <Breadcrumbs>
          <Link href="#" underline="hover" color="inherit">Home</Link>
          <Link href="#" underline="hover" color="inherit">Catalog</Link>
          <Typography color="text.primary">Product</Typography>
        </Breadcrumbs>
      </Box>

      {/* Custom separator — any string or element */}
      <Box>
        <Typography variant="h6" gutterBottom>Custom separator</Typography>
        <Stack spacing={2}>
          <Breadcrumbs separator="›">
            <Link href="#" underline="hover" color="inherit">Home</Link>
            <Link href="#" underline="hover" color="inherit">Catalog</Link>
            <Typography color="text.primary">Product</Typography>
          </Breadcrumbs>

          <Breadcrumbs separator="-">
            <Link href="#" underline="hover" color="inherit">Home</Link>
            <Link href="#" underline="hover" color="inherit">Catalog</Link>
            <Typography color="text.primary">Product</Typography>
          </Breadcrumbs>

          {/* Icon as separator */}
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Link href="#" underline="hover" color="inherit">Home</Link>
            <Link href="#" underline="hover" color="inherit">Catalog</Link>
            <Typography color="text.primary">Product</Typography>
          </Breadcrumbs>

          <Breadcrumbs separator={<FiberManualRecordIcon sx={{ fontSize: 8 }} />}>
            <Link href="#" underline="hover" color="inherit">Home</Link>
            <Link href="#" underline="hover" color="inherit">Catalog</Link>
            <Typography color="text.primary">Product</Typography>
          </Breadcrumbs>
        </Stack>
      </Box>

      {/* maxItems + itemsBeforeCollapse / itemsAfterCollapse */}
      <Box>
        <Typography variant="h6" gutterBottom>Collapsed breadcrumbs (maxItems)</Typography>
        <Stack spacing={2}>
          {/* Default collapse: shows first 1 and last 1 item */}
          <Breadcrumbs maxItems={2}>
            <Link href="#" underline="hover" color="inherit">Home</Link>
            <Link href="#" underline="hover" color="inherit">Catalog</Link>
            <Link href="#" underline="hover" color="inherit">Category</Link>
            <Link href="#" underline="hover" color="inherit">Subcategory</Link>
            <Typography color="text.primary">Product</Typography>
          </Breadcrumbs>

          {/* Show 2 before and 2 after the ellipsis */}
          <Breadcrumbs maxItems={4} itemsBeforeCollapse={2} itemsAfterCollapse={2}>
            <Link href="#" underline="hover" color="inherit">Home</Link>
            <Link href="#" underline="hover" color="inherit">Catalog</Link>
            <Link href="#" underline="hover" color="inherit">Category</Link>
            <Link href="#" underline="hover" color="inherit">Subcategory</Link>
            <Link href="#" underline="hover" color="inherit">Sub-subcategory</Link>
            <Typography color="text.primary">Product</Typography>
          </Breadcrumbs>
        </Stack>
      </Box>

      {/* Breadcrumbs with icons */}
      <Box>
        <Typography variant="h6" gutterBottom>With icons</Typography>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link
            href="#"
            underline="hover"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <HomeIcon fontSize="inherit" />
            Home
          </Link>
          <Link
            href="#"
            underline="hover"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <FolderIcon fontSize="inherit" />
            Documents
          </Link>
          <Typography
            color="text.primary"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <InsertDriveFileIcon fontSize="inherit" />
            Report.pdf
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* color variations on the active (current) item */}
      <Box>
        <Typography variant="h6" gutterBottom>Current page color variations</Typography>
        <Stack spacing={2}>
          <Breadcrumbs>
            <Link href="#" underline="hover" color="inherit">Home</Link>
            <Link href="#" underline="hover" color="inherit">Catalog</Link>
            <Typography color="text.primary">text.primary (default)</Typography>
          </Breadcrumbs>
          <Breadcrumbs>
            <Link href="#" underline="hover" color="inherit">Home</Link>
            <Link href="#" underline="hover" color="inherit">Catalog</Link>
            <Typography color="primary">primary</Typography>
          </Breadcrumbs>
          <Breadcrumbs>
            <Link href="#" underline="hover" color="inherit">Home</Link>
            <Link href="#" underline="hover" color="inherit">Catalog</Link>
            <Typography color="secondary">secondary</Typography>
          </Breadcrumbs>
        </Stack>
      </Box>

      {/* Custom styling via sx */}
      <Box>
        <Typography variant="h6" gutterBottom>Custom styling via sx</Typography>
        <Breadcrumbs
          sx={{
            backgroundColor: 'grey.100',
            px: 2,
            py: 1,
            borderRadius: 1,
            '& .MuiBreadcrumbs-separator': { color: 'primary.main' },
          }}
        >
          <Link href="#" underline="hover" color="primary" sx={{ fontWeight: 'bold' }}>
            Home
          </Link>
          <Link href="#" underline="hover" color="primary" sx={{ fontWeight: 'bold' }}>
            Catalog
          </Link>
          <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Product
          </Typography>
        </Breadcrumbs>
      </Box>

    </Stack>
  )
}
