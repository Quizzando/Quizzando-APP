import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Field } from './-components/field'
import { Button } from '@/components/ui/button'
import { baseSchema, registerSchema } from '@/models/schemas/auth-forms.schema'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useForm } from '@tanstack/react-form'

export const Route = createFileRoute('/_auth/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const [authCode, setAuthCode] = useState<string | null>(null)
  const [isCodeSent, setIsCodeSent] = useState(true)

  const form = useForm({
    defaultValues: {
      recoverEmail: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {},
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
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex-1/2 flex flex-col justify-center items-center"
    >
      {/* === HEADER === */}
      <div className="flex gap-4 mb-3 items-center">
        <div className="w-1 rounded-2xl bg-chart-5 h-6"></div>
        <h1 className="text-3xl font-medium">Esqueceu sua senha?</h1>
      </div>

      <p className="text-sm text-justify mb-6 px-6">
        Informe o email vinculado à conta cuja senha foi esquecida. Um{' '}
        <span className="text-secondary">código autenticador</span> será enviado
        para o endereço fornecido, permitindo redefinir a senha.
      </p>

      <div className="flex flex-col space-y-6">
        {authCode ? (
          <>
            <form.Field
              name="recoverEmail"
              validators={{ ...emailValidators }}
              children={(field) => (
                <Field
                  label="Email de recuperação"
                  type="email"
                  value={field.state.value}
                  onChange={field.handleChange}
                  errors={field.state.meta.errors as []}
                />
              )}
            />
            <Button>Enviar código para email</Button>
          </>
        ) : !isCodeSent ? (
          <AuthCodeField />
        ) : (
          <>
            <form.Field
              name="password"
              validators={{ ...passwordValidators }}
              children={(field) => (
                <Field
                  label="Nova Senha"
                  type="password"
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
                  label="Confirmação da Nova Senha"
                  type="password"
                  value={field.state.value}
                  onChange={field.handleChange}
                  errors={field.state.meta.errors as []}
                />
              )}
            />
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? 'Redefinindo...' : 'Redefinir Senha'}
                </Button>
              )}
            </form.Subscribe>
          </>
        )}
      </div>
    </form>
  )
}

function AuthCodeField() {
  return (
    <div className="flex flex-col space-y-6">
      <Label>Digite o Código de Verificação</Label>
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button>Enviar Código</Button>
    </div>
  )
}