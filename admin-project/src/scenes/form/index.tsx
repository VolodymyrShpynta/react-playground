import { Box, Button, TextField } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { z } from 'zod'
import { Header } from '../../components/Header'

const PHONE_REGEXP =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/

/**
 * Zod validation schema for the Create User form.
 *
 * Each field is defined once — Zod acts as both the validation layer AND the
 * TypeScript type source (see `CreateUserFormValues` below). This eliminates
 * the need to maintain a separate `interface` that could drift out of sync.
 *
 * - `z.string().min(1, ...)` — ensures a non-empty string (`z.string()`
 *   allows empty strings by default, so `min(1)` enforces required fields)
 * - `z.email(...)` — top-level email type that validates format automatically
 * - `.regex(...)` — validates the string against a regular expression
 */
const createUserSchema = z.object({
  firstName: z.string().min(1, 'required'),
  lastName: z.string().min(1, 'required'),
  email: z.email('invalid email'),
  contact: z.string().min(1, 'required').regex(PHONE_REGEXP, 'Phone number is not valid'),
  address1: z.string().min(1, 'required'),
  address2: z.string().min(1, 'required'),
})

/**
 * TypeScript type derived directly from the Zod schema.
 * `z.infer` extracts the output type so the form values and validation
 * are always guaranteed to match — no manual interface needed.
 */
type CreateUserFormValues = z.infer<typeof createUserSchema>

const CreateUserForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')

  /**
   * `useForm` — the core React Hook Form hook. Returns utilities to manage
   * the entire form lifecycle.
   *
   * - `register(name)` — connects a field to RHF by injecting `name`,
   *   `onChange`, `onBlur`, and `ref` props. Fields are **uncontrolled** by
   *   default, meaning React doesn't re-render the component on every
   *   keystroke — only when validation state changes.
   *
   * - `handleSubmit(onSubmit)` — wraps your submit handler. It runs
   *   validation first (via the resolver) and only calls `onSubmit` if the
   *   schema passes. Also calls `event.preventDefault()` automatically.
   *
   * - `formState.errors` — an object keyed by field name. Each entry has a
   *   `.message` from the Zod schema. Empty when all fields are valid.
   *
   * Options:
   * - `mode: 'onTouched'` — validate on first blur, then re-validate on
   *   each change so errors clear as soon as the user fixes them.
   * - `resolver` — plugs the Zod schema into RHF's validation pipeline.
   *   `standardSchemaResolver` works with any Standard Schema-compliant
   *   library (Zod, Valibot, ArkType, etc.).
   * - `defaultValues` — initial field values and baseline for dirty tracking.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormValues>({
    mode: 'onTouched',
    resolver: standardSchemaResolver(createUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      address1: '',
      address2: '',
    },
  })

  const handleFormSubmit = (values: CreateUserFormValues) => {
    console.log(values)
  }

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      {/* handleSubmit validates via the resolver, then calls handleFormSubmit */}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}
        >
          {/*
           * Spreading `{...register('firstName')}` injects:
           *   name="firstName", onChange, onBlur, ref
           * `error` highlights the field red when there's a validation error.
           * `helperText` shows the Zod error message below the field.
           */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="First Name"
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Last Name"
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ gridColumn: 'span 4' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Contact Number"
            {...register('contact')}
            error={!!errors.contact}
            helperText={errors.contact?.message}
            sx={{ gridColumn: 'span 4' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address 1"
            {...register('address1')}
            error={!!errors.address1}
            helperText={errors.address1?.message}
            sx={{ gridColumn: 'span 4' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address 2"
            {...register('address2')}
            error={!!errors.address2}
            helperText={errors.address2?.message}
            sx={{ gridColumn: 'span 4' }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New User
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default CreateUserForm