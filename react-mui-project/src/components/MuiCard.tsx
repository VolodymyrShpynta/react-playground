import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

export const MuiCard = () => {
  return (
    <Box width='500px'>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image="https://images.unsplash.com/photo-1616869736800-34ef43c096ee"
          alt="Unsplash image"
          sx={{
            objectFit: 'cover',
            objectPosition: 'top'
          }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom component="div">
            React
          </Typography>
          <Typography variant="body2" color="text.secondary">
            React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.
            React can be used as a base in the development of single-page or mobile applications.
            However, React is only concerned with rendering data to the DOM, and so creating React applications usually requires the use of
            additional libraries for state management and routing. Redux and React Router are respective examples of such libraries.
            The core principle of React is the component. A React application is made of multiple components, each responsible for rendering a small,
            reusable piece of HTML. Components can be nested, managed, and handled with state and props.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  )
}