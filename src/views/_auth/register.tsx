import { registerSchema } from '@/models/schemas/auth-forms.schema'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Field } from './-components/field'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      try {
        alert(
          `Enviando Credenciais ${value.name} / ${value.email} / ${value.password}`,
        )
      } catch (error) {
      } finally {
        form.reset()
      }
    },
  })

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
    <div className="flex-1/2 flex flex-col items-center p-2">
      {/* === FORM CONTAINER ===  */}
      <h1 className="text-3xl mb-10 font-bold">Realize seu Cadastro</h1>
      <form
        className="max-w-1/2 w-1/2 p-2 flex flex-col space-y-8"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field
          name="name"
          children={(field) => (
            <Field
              type="text"
              label="Seu Nome (opcional)"
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
              label="Seu Email"
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
              label="Sua Senha"
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
              label="Confirme sua Senha"
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
              {isSubmitting ? 'Registrando...' : 'Registrar'}
            </Button>
          )}
        />
        <p>
          Já tem um cadastro?{' '}
          <Link to="/login" className="text-[#FF0080] hover:underline">
            Entre aqui
          </Link>
        </p>
      </form>
    </div>
  )
}
