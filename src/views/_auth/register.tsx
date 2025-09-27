import { registerSchema } from '@/models/schemas/auth-forms.schema'
import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { Field } from './-components/field'
import { Button } from '@/components/ui/button'
import { AuthRedirect } from './-components/authRedirect'

export const Route = createFileRoute('/_auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = Route.useRouteContext()
  const navigate = Route.useNavigate()

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      try {
        await auth.register(value.username, value.email, value.password)
        navigate({ to: '/' })
      } catch (error) {
      } finally {
        form.reset()
      }
    },
  })

  const usernameValidators = {
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: registerSchema.shape.username,
    onBlur: registerSchema.shape.username,
  }

  const emailValidators = {
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: registerSchema.shape.email,
    onBlur: registerSchema.shape.email,
  }

  const passwordValidators = {
    onChangeAsyncDebounceMs: 300,
    onChangeAsync: registerSchema.shape.password,
    onBlur: registerSchema.shape.password,
  }

  const confirmPasswordValidators = {
    onChangeAsyncDebounceMs: 300,
  }

  return (
    <div className="flex-1/2 flex flex-col justify-center items-center">
      {/* === FORM CONTAINER ===  */}
      <div className="flex gap-3 mb-3 items-center">
        <div className="w-1 rounded-2xl bg-chart-5 h-6"></div>
        <h1 className="text-3xl font-medium">Registro</h1>
      </div>
      <form
        className="max-w-1/2 w-1/2 p-2 flex flex-col space-y-5"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field
          name="username"
          validators={{ ...usernameValidators }}
          children={(field) => (
            <Field
              type="text"
              label="Nome"
              value={field.state.value}
              onChange={field.handleChange}
              errors={field.state.meta.errors as []}
            />
          )}
        />
        <form.Field
          name="email"
          validators={{ ...emailValidators }}
          children={(field) => (
            <Field
              type="email"
              label="Email"
              value={field.state.value}
              onChange={field.handleChange}
              errors={field.state.meta.errors as []}
            />
          )}
        />
        <form.Field
          name="password"
          validators={{ ...passwordValidators }}
          children={(field) => (
            <Field
              type="password"
              label="Senha"
              value={field.state.value}
              onChange={field.handleChange}
              errors={field.state.meta.errors as []}
            />
          )}
        />
        <form.Field
          name="confirmPassword"
          validators={{
            ...confirmPasswordValidators,
            onChangeAsync: ({ value }) =>
              value !== form.getFieldValue('password')
                ? { message: 'As senhas não coincidem.' }
                : undefined,
          }}
          children={(field) => (
            <Field
              type="password"
              label="Confirmar Senha"
              value={field.state.value}
              onChange={field.handleChange}
              errors={field.state.meta.errors as []}
            />
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              className="bg-secondary rounded-3xl w-38 self-center hover:bg-secondary/60 cursor-pointer transition-colors duration-200"
              variant={!canSubmit || isSubmitting ? 'outline' : 'default'}
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? 'Registrando...' : 'Registrar'}
            </Button>
          )}
        />

        <AuthRedirect
          message="Já possui uma conta?"
          linkText="Entre aqui"
          to="/login"
        />
      </form>
    </div>
  )
}
