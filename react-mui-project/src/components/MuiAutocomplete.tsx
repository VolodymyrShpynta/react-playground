import { Autocomplete, Stack, TextField } from "@mui/material"
import { useState } from "react"

type SkillOption = {
  label: string
  value: string
}

const skills = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue']

const skillOptions: SkillOption[] = skills.map((skill) => ({ label: skill, value: skill.toLowerCase() }))

export const MuiAutocomplete = () => {
  const [value, setValue] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<SkillOption | null>(null)

  console.log({ value, selectedSkill });

  return (
    <Stack spacing={2} width={'250px'}>
      {/* Standard autocomplete */}
      <Autocomplete
        options={skills}
        renderInput={(params) => <TextField {...params} label="Skills" />}
        value={value}
        onChange={(_event: React.SyntheticEvent, newValue: string | null) => setValue(newValue)}
      />

      {/* Free solo allows users to enter values that are not present in the options */}
      <Autocomplete
        options={skills}
        renderInput={(params) => <TextField {...params} label="Editable Skills" />}
        value={value}
        onChange={(_event: React.SyntheticEvent, newValue: string | null) => setValue(newValue)}
        freeSolo
      />

      {/* Autocomplete with object options */}
      <Autocomplete
        options={skillOptions}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} label="Skills with Objects" />}
        value={selectedSkill}
        onChange={(_event: React.SyntheticEvent, newValue: SkillOption | null) => setSelectedSkill(newValue)}
      />
    </Stack>
  )
}