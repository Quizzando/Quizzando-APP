import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Field } from './-components/field'
import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { AuthRedirect } from './-components/authRedirect'

export const Route = createFileRoute('/_auth/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      contactEmail: '',
    },
    onSubmit: ({ value }) => {
      try {
        console.log(value.contactEmail)
      } catch (error) {
        console.error('Erro ao enviar código autenticador: ', error)
      } finally {
        form.reset()
      }
    },
  })

  const contactEmailSchema = z
    .string()
    .email({ message: 'Informe um endereço de email válido.' })

  const contactEmailValidators = {
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: contactEmailSchema,
    onBlur: contactEmailSchema,
  }

  return (
    <div className="flex-1/2 flex flex-col justify-center items-center">
      {/* === HEADER === */}
      <div className="flex gap-4 mb-3 items-center">
        <div className="w-1 rounded-2xl bg-chart-5 h-6"></div>
        <h1 className="text-3xl font-medium">Esqueceu sua senha?</h1>
      </div>

      <p className="max-w-1/2 w-1/2 text-sm text-justify mb-6">
        Informe o email vinculado à conta cuja senha foi esquecida. Um{' '}
        <span className="text-secondary">código autenticador</span> será enviado
        para o endereço fornecido, permitindo redefinir a senha.
      </p>

      {/* === FORM === */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="max-w-1/2 w-1/2 p-2 flex flex-col space-y-5"
      >
        <form.Field
          name="contactEmail"
          validators={{ ...contactEmailValidators }}
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

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              className="bg-secondary rounded-3xl w-38 self-center hover:bg-secondary/60 cursor-pointer transition-colors duration-200"
              variant={!canSubmit || isSubmitting ? 'outline' : 'default'}
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Código'}
            </Button>
          )}
        />

        <AuthRedirect message='Lembrou sua senha?' linkText='Faça login' to='/login' />
      </form>
    </div>
  )
}
