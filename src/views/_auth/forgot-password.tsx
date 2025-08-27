import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Field } from './-components/field'
import { useForm } from '@tanstack/react-form'
import z from 'zod'

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
    <div className="flex-1/2 flex flex-col items-center p-2 space-y-4">
      <div className="flex flex-col">
        <h1 className="text-3xl mb-10 font-bold">Recuperação de Conta</h1>
        <p className="text-justify">
          Informe-nos o email vinculado à conta cuja senha você se esqueceu. Um{' '}
          <span className="text-[#FF0080]">código autenticador</span> será
          enviado para o endereço de email fornecido para resetar a senha
          esquecida.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="max-w-1/2 w-1/2 p-2 flex flex-col space-y-8"
      >
        <form.Field
          name="contactEmail"
          validators={{
            ...contactEmailValidators,
          }}
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

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar código autenticador'}
            </Button>
          )}
        />
      </form>
    </div>
  )
}
