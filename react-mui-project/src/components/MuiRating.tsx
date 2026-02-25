import { Rating, Stack } from "@mui/material"
import type { IconContainerProps } from "@mui/material/Rating"
import { useState } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral"
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied"
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied"

/**
 * Lookup table mapping each rating value (1–5) to a distinct icon and
 * an accessible label used by screen readers via getLabelText.
 * Using a plain object (Record) instead of Map since keys are small,
 * known integers and plain object lookup is simpler.
 */
const iconMap: Record<number, { icon: React.ReactElement; label: string }> = {
  1: { icon: <SentimentVeryDissatisfiedIcon />, label: "Very Dissatisfied" },
  2: { icon: <SentimentDissatisfiedIcon />, label: "Dissatisfied" },
  3: { icon: <SentimentNeutralIcon />, label: "Neutral" },
  4: { icon: <SentimentSatisfiedIcon />, label: "Satisfied" },
  5: { icon: <SentimentVerySatisfiedIcon />, label: "Very Satisfied" },
}

/**
 * Custom icon container used by the smiley Rating.
 * MUI calls this component for each rating position, passing:
 *   - value: the position number (1–5)
 *   - ...props: internal MUI props (className, etc.) that carry CSS state
 *     classes like MuiRating-iconFilled / MuiRating-iconEmpty, which drive
 *     the hover and selection highlighting.
 *
 * The <span> receives {...props} so MUI can attach its state classes to it,
 * and renders the matching icon from iconMap as its child.
 */
const IconContainer = ({ value, ...props }: IconContainerProps) => (
  <span {...props}>{iconMap[value].icon}</span>
)

export const MuiRating = () => {
  const [value, setValue] = useState<number | null>(null)

  console.log({ value });

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    setValue(newValue)
  }

  return (
    <Stack spacing={2}>
      {/* Default star rating with half-star precision */}
      <Rating
        precision={0.5}
        size="large"
        value={value}
        onChange={handleChange}
      />

      {/* Read-only heart rating — custom icon/emptyIcon override the default star */}
      <Rating
        precision={0.5}
        size="medium"
        readOnly
        icon={<FavoriteIcon fontSize="inherit" color="error" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        value={value}
        onChange={handleChange}
      />

      {/*
        Heart rating with highlightSelectedOnly — only the selected heart is
        filled, rather than all hearts up to the selected value.
        Useful for non-sequential icon sets where cumulative fill looks odd.
      */}
      <Rating
        precision={0.5}
        size="small"
        highlightSelectedOnly
        icon={<FavoriteIcon fontSize="inherit" color="secondary" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        value={value}
        onChange={handleChange}
      />

      {/*
        Smiley rating with a different icon per value.
        - slotProps.icon.component replaces the default icon wrapper with IconContainer
        - getLabelText provides accessible labels for screen readers
        - highlightSelectedOnly ensures only the chosen smiley is highlighted
      */}
      <Rating
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        slotProps={{ icon: { component: IconContainer } }}
        getLabelText={(v) => iconMap[v].label}
        highlightSelectedOnly
      />
    </Stack>
  )
}