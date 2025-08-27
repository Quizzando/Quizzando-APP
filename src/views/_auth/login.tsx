import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { baseSchema } from '@/models/schemas/auth-forms.schema'
import { Button } from '@/components/ui/button'
import { Field } from './-components/field'

export const Route = createFileRoute('/_auth/login')({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || '/',
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.user) {
      throw redirect({ to: search.redirect })
    }
  },
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
        alert(`Enviando Credenciais ${value.email} / ${value.password}`)
        await auth.login(value.email, value.password)
        navigate({ to: '/dashboard' })
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
    <div className="flex-1/2 flex flex-col items-center p-2">
      {/* === FORM CONTAINER ===  */}
      <h1 className="text-3xl mb-10 font-bold">Realize seu Login</h1>
      <form
        className="max-w-1/2 w-1/2 p-2 flex flex-col space-y-8"
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
        <div className="flex flex-col space-y-2">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                variant={!canSubmit || isSubmitting ? 'outline' : 'default'}
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? 'Logando...' : 'Login'}
              </Button>
            )}
          />
          <Link to="/forgot-password" className="text-xs text-[#FF0080] self-end">
            Esqueci minha senha
          </Link>
        </div>

        <p>
          Não é registrado?{' '}
          <Link
            to="/register"
            search={{ redirect: '/' }}
            className="text-[#FF0080] hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  )
}
