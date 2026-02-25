import { Box, Divider, Grid, Paper, Stack } from "@mui/material"

export const MuiLayout = () => {
  return (
    <>
      <Paper elevation={4} sx={{ padding: 4 }}>
        <Box >
          Plain Box
        </Box>

        <Box component='span'>
          Box as span
        </Box>

        <Box component='span' sx={{ backgroundColor: 'secondary.main', color: 'white', p: 1 }}>
          Box as span with secondary background and white text
        </Box>


        <Box display="flex" justifyContent="center" bgcolor="primary.main" color="white" p={2}>
          Box with flex display, centered content, primary background and white text
        </Box>

        <Box
          sx={{
            backgroundColor: 'success.main',
            color: 'white',
            height: '100px',
            width: '100px',
            padding: '16px',
            '&:hover': {
              backgroundColor: 'success.dark'
            }
          }}>
          Box with custom styles and hover effect
        </Box>
      </Paper>
      <Stack sx={{ border: '2px solid' }} mt={4}>
        <Box bgcolor="primary.main" p={4}>Box 1</Box>
        <Box bgcolor="secondary.main" p={4}>Box 2</Box>
        <Box bgcolor="success.main" p={4}>Box 3</Box>
      </Stack>

      <Stack sx={{ border: '2px solid' }} direction="column-reverse" mt={2}>
        <Box bgcolor="primary.main" p={4}>Box 1</Box>
        <Box bgcolor="secondary.main" p={4}>Box 2</Box>
        <Box bgcolor="success.main" p={4}>Box 3</Box>
      </Stack>

      <Stack sx={{ border: '2px solid' }} direction="row" mt={2}>
        <Box bgcolor="primary.main" p={4}>Box 1</Box>
        <Box bgcolor="secondary.main" p={4}>Box 2</Box>
        <Box bgcolor="success.main" p={4}>Box 3</Box>
      </Stack>

      <Stack sx={{ border: '2px solid' }} direction="row-reverse" mt={2} spacing={2}>
        <Box bgcolor="primary.main" p={4}>Box 1</Box>
        <Box bgcolor="secondary.main" p={4}>Box 2</Box>
        <Box bgcolor="success.main" p={4}>Box 3</Box>
      </Stack>

      <Stack
        sx={{ border: '2px solid' }}
        direction="row" mt={2}
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box bgcolor="primary.main" p={4}>Box 1</Box>
        <Box bgcolor="secondary.main" p={4}>Box 2</Box>
        <Box bgcolor="success.main" p={4}>Box 3</Box>
      </Stack>

      {/*
        Grid Component Notes:
        - The Grid component under the hood uses the flexbox module
        - The Grid consists of 12 columns
        - Each item in the grid can take up one or more columns as its width
        - There are five breakpoints each corresponding to a certain device width:
            xs  - mobile devices   (~0px and up)
            sm  - tablets          (~600px and up)
            md  - desktops         (~900px and up)
            lg  - large monitors   (~1200px and up)
            xl  - extra-large      (~1536px and up)
        - We can assign integer values to each breakpoint which indicates how many
          of the 12 available columns are occupied by that item when the viewport
          satisfies that breakpoint constraints
          e.g. <Grid size={{ xs: 12, sm: 6, md: 4 }}> means full width on mobile,
               half width on tablet, one-third width on desktop
          Note: MUI v6+ uses Grid v2 where `item` and `xs/sm/md/lg/xl` props are
          replaced by a single `size` prop: size={6} or size={{ xs: 12, sm: 6 }}
      */}
      <Grid container mt={4} spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box bgcolor="primary.main" p={4}>Box 1</Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box bgcolor="secondary.main" p={4}>Box 2</Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box bgcolor="success.main" p={4}>Box 3</Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box bgcolor="warning.main" p={4}>Box 4</Box>
        </Grid>
      </Grid>

      <Grid container mt={4} columnSpacing={2} rowSpacing={1}>
        <Grid size={{ xs: 3 }}>
          <Box bgcolor="primary.main" p={4}>Box 1</Box>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <Box bgcolor="secondary.main" p={4}>Box 2</Box>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <Box bgcolor="success.main" p={4}>Box 3</Box>
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Box bgcolor="warning.main" p={4}>Box 4</Box>
        </Grid>
      </Grid>

      {/* size="grow" makes items equally share the remaining space after fixed-size items */}
      {/* Box 2 is fixed at 6 columns on md+, but grows equally with others on xs/sm */}
      <Grid container mt={4} spacing={1}>
        <Grid size="grow">
          <Box bgcolor="primary.main" p={4}>Box 1</Box>
        </Grid>
        <Grid size={{ xs: "grow", md: 6 }}>
          <Box bgcolor="secondary.main" p={4}>Box 2 (grow on xs/sm, fixed 6 on md+)</Box>
        </Grid>
        <Grid size="grow">
          <Box bgcolor="success.main" p={4}>Box 3</Box>
        </Grid>
        <Grid size="grow">
          <Box bgcolor="warning.main" p={4}>Box 4</Box>
        </Grid>
      </Grid>

      {/* Box 1 is auto-sized, Box 2 grows on xs/sm and is fixed 6 on md+ */}
      <Grid container mt={4} spacing={1}>
        <Grid size="auto">
          <Box bgcolor="primary.main" p={4}>Box 1</Box>
        </Grid>
        <Grid size={{ xs: "grow", md: 6 }}>
          <Box bgcolor="secondary.main" p={4}>Box 2 (grow on xs/sm, fixed 6 on md+)</Box>
        </Grid>
        <Grid size="grow">
          <Box bgcolor="success.main" p={4}>Box 3</Box>
        </Grid>
        <Grid size="grow">
          <Box bgcolor="warning.main" p={4}>Box 4</Box>
        </Grid>
      </Grid>
    </>
  )
}