import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar, Stack } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';

export const MuiImageList = () => {
  return (
    <Stack spacing={4}>
      {/*
        Standard Image List (default variant)
        - All items are the same fixed size (controlled by rowHeight)
        - Items are arranged in a strict uniform grid
        - Best for: galleries where consistency and alignment matter
        - Key props: cols (number of columns), rowHeight (fixed height per row)
      */}
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            {/*
              src:     Standard resolution (DPR=1) for normal screens — smaller file, faster load
              srcSet:  High resolution (2x) for Retina/HiDPI screens — same dimensions but double pixel density
              loading: "lazy" defers loading until the image is near the viewport, improving performance
            */}
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              position="bottom"
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.title}`}
                  onClick={() => alert(`Info about: ${item.title}`)}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/*
        Woven Image List (variant="woven")
        - Items alternate between two different heights, creating a woven/brick-like pattern
        - Odd-indexed items are shorter, even-indexed items are taller (or vice versa)
        - Best for: adding visual rhythm and variety to a uniform grid
        - Key props: cols, gap (space between items in px)
      */}
      <ImageList variant="woven" sx={{ width: 500, height: 450 }} cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
        {/*
          Masonry Image List (variant="masonry")
          - Items retain their natural/original aspect ratio — no forced cropping
          - Items are packed tightly by filling vertical gaps, like a Pinterest layout
          - Requires a scrollable outer container (overflowY: scroll) since height is dynamic
          - Best for: mixed-size images where preserving aspect ratios is important
          - Key props: cols, gap — NOTE: rowHeight has no effect in masonry mode
        */}
        <ImageList variant="masonry" cols={3} gap={8}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Stack>
  )
}

const itemData: { img: string; title: string }[] = [
  { img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'Breakfast' },
  { img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', title: 'Burger' },
  { img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', title: 'Camera' },
  { img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c', title: 'Coffee' },
  { img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8', title: 'Hats' },
  { img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62', title: 'Honey' },
  { img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6', title: 'Basketball' },
  { img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f', title: 'Fern' },
  { img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25', title: 'Mushrooms' },
  { img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af', title: 'Tomato basil' },
  { img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1', title: 'Sea star' },
  { img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6', title: 'Bike' },
  { img: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c', title: 'Canyonlands' }
];