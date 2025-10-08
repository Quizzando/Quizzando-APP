import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { baseSchema } from '@/models/schemas/auth-forms.schema'
import { Button } from '@/components/ui/button'
import { Field } from './-components/field'
import { AuthRedirect } from './-components/authRedirect'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = Route.useRouteContext()
  const navigate = Route.useNavigate()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onBlur: baseSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await auth.login(value.email, value.password)
        navigate({ to: '/' })
      } catch (error) {
      } finally {
        form.reset()
      }
    },
  })

  const emailValidators = {
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: baseSchema.shape.email,
    onBlur: baseSchema.shape.email,
  }

  const passwordValidators = {
    onChangeAsyncDebounceMs: 300,
    onChangeAsync: baseSchema.shape.password,
    onBlur: baseSchema.shape.password,
  }

  return (
    <div className="flex-1/2 flex flex-col justify-center items-center">
      {/* === FORM CONTAINER ===  */}
      <div className="flex gap-3 mb-3 items-center">
        <div className="w-1 rounded-2xl bg-chart-5 h-6"></div>
        <h1 className="text-3xl font-medium">Login</h1>
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
        <AuthRedirect linkText="Esqueceu sua senha?" to="/forgot-password" />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              className="bg-secondary rounded-3xl w-38 self-center hover:bg-secondary/60 cursor-pointer transition-colors duration-200"
              variant={!canSubmit || isSubmitting ? 'outline' : 'default'}
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          )}
        />

        <AuthRedirect
          message="Não possui uma conta?"
          linkText="Cadastre-se"
          to="/register"
        />
      </form>
    </div>
  )
}
