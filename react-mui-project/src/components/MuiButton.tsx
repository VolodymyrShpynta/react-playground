import {
  Button, Stack, IconButton, ButtonGroup, ToggleButtonGroup, ToggleButton
} from '@mui/material'
import { useState } from 'react';

// For icons, we need to install @mui/icons-material package. 
// To find icons, we can go to https://mui.com/material-ui/material-icons/ and search for the icon we want, 
// then click on it and copy the import statement.
import SendIcon from '@mui/icons-material/Send';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

export const MuiButton = () => {
  const [formats, setFormats] = useState<string[]>([])
  const [exclusiveFormat, setExclusiveFormat] = useState<string | null>(null)

  console.log(formats);
  console.log(exclusiveFormat);

  function handleFormatChange(_event: React.MouseEvent<HTMLElement>, newFormats: string[]): void {
    setFormats(newFormats);
  }

  function handleExclusiveFormatChange(_event: React.MouseEvent<HTMLElement>, newExclusiveFormat: string | null): void {
    setExclusiveFormat(newExclusiveFormat);
  }

  return (
    <Stack spacing={4}>
      <Stack spacing={2} direction="row">
        <Button variant="contained">contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
        <Button variant='text' href='https://google.com'>Link</Button>
      </Stack>

      <Stack spacing={2} direction="row">
        <Button variant="contained" color="primary">Primary</Button>
        <Button variant="contained" color="secondary">Secondary</Button>
        <Button variant="contained" color="error">Error</Button>
        <Button variant="contained" color="warning">Warning</Button>
        <Button variant="contained" color="info">Info</Button>
        <Button variant="contained" color="success">Success</Button>
      </Stack>

      <Stack spacing={2} direction="row">
        <Button variant="outlined" color="primary">Primary</Button>
        <Button variant="outlined" color="secondary">Secondary</Button>
        <Button variant="outlined" color="error">Error</Button>
        <Button variant="outlined" color="warning">Warning</Button>
        <Button variant="outlined" color="info">Info</Button>
        <Button variant="outlined" color="success">Success</Button>
      </Stack>

      <Stack spacing={2} direction="row">
        <Button variant="text" color="primary">Primary</Button>
        <Button variant="text" color="secondary">Secondary</Button>
        <Button variant="text" color="error">Error</Button>
        <Button variant="text" color="warning">Warning</Button>
        <Button variant="text" color="info">Info</Button>
        <Button variant="text" color="success">Success</Button>
      </Stack>

      <Stack display="block" spacing={2} direction="row">
        <Button variant="contained" size="small">Small</Button>
        <Button variant="contained" size="medium">Medium</Button>
        <Button variant="contained" size="large">Large</Button>
      </Stack>

      <Stack spacing={2} direction="row">
        <Button variant="contained" startIcon={<SendIcon />} disableRipple>Send</Button>
        <Button variant="contained" endIcon={<SendIcon />} disableElevation>Send</Button>
        <IconButton color="success" size='medium' aria-label='Send' onClick={() => alert('Clicked')}>
          <SendIcon />
        </IconButton>
      </Stack>

      <Stack direction="row">
        <ButtonGroup variant='contained'>
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </Stack>

      <Stack direction="row">
        <ButtonGroup
          variant='outlined'
          color='secondary'
          orientation='vertical'
          size='small'
          aria-label='alignment button group'
        >
          <Button onClick={() => alert('Left clicked')}>Left</Button>
          <Button onClick={() => alert('Center clicked')}>Center</Button>
          <Button onClick={() => alert('Right clicked')}>Right</Button>
        </ButtonGroup>
      </Stack>

      <Stack direction="row">
        <ToggleButtonGroup
          aria-label='text formatting'
          size='small'
          color='success'
          value={formats}
          onChange={handleFormatChange}
        >
          <ToggleButton value="bold" aria-label='bold'>
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" aria-label='italic'>
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label='underlined'>
            <FormatUnderlinedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack direction="row">
        {/* Exclusive selection */}
        <ToggleButtonGroup
          aria-label='text formatting'
          size='small'
          color='warning'
          orientation='vertical'
          value={exclusiveFormat}
          onChange={handleExclusiveFormatChange}
          exclusive
        >
          <ToggleButton value="bold" aria-label='bold'>
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" aria-label='italic'>
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label='underlined'>
            <FormatUnderlinedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  )
}