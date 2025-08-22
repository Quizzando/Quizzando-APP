import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { baseSchema } from '@/models/schemas/auth-forms.schema'
import { Button } from '@/components/ui/button'
import { Field } from './-components/field'

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
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
    <div className="w-full min-h-screen flex items-center justify-between gap-4 px-10">
      <div className="flex-1/2">.</div>

      {/* === FORM CONTAINER ===  */}
      <div className="flex-1/2 flex flex-col items-center p-2">
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
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                variant={!canSubmit || isSubmitting ? 'outline' : 'default'}
                disabled={!canSubmit || isSubmitting}
                className="cursor-pointer"
              >
                {isSubmitting ? 'Logando...' : 'Login'}
              </Button>
            )}
          />
          <p>
            Não é registrado?{' '}
            <Link to="/register" className="text-[#FF0080] hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
