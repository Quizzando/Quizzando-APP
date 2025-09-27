import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { Field } from './-components/field'
import { registerSchema } from '@/models/schemas/auth-forms.schema'
import { useState } from 'react'

export const Route = createFileRoute('/_auth/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      recoverEmail: '',
      authCode: '',
      password: {
        newPassword: '',
        confirmNewPassword: '',
      },
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

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex gap-4 mb-3 items-center">
        <div className="w-1 rounded-2xl bg-chart-5 h-6"></div>
        <h1 className="text-3xl font-medium">Recuperação de Senha</h1>
      </div>

      {/* <form.Field
        name="recoverEmail"
        validators={{ ...emailValidators }}
        children={(field) => (
          <RecoverEmailField
            value={field.state.value}
            handleChange={field.handleChange}
            // @ts-ignore
            errors={field.state.meta.errors}
          />
        )}
      /> */}
      {/* <form.Field
        name="authCode"
        children={(field) => (
          <AuthCodeField
            value={field.state.value}
            handleChange={field.handleChange}
          />
        )}
      /> */}
      <form.Field
        name="password"
        children={(field) => (
          <ResetPasswordField
            value={field.state.value}
            handleChange={field.handleChange}
          />
        )}
      />
    </div>
  )
}

function RecoverEmailField({
  value,
  handleChange,
  errors,
}: {
  value: string
  handleChange: (value: string) => void
  errors?: { message: string }[]
}) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-sm text-justify mb-6 px-6">
        Informe o email vinculado à conta cuja senha foi esquecida. Um{' '}
        <span className="text-secondary">código verificador</span> será enviado
        para o endereço fornecido, permitindo redefinir a senha.
      </p>
      <Field
        value={value}
        onChange={handleChange}
        type="email"
        label="Email de Recuperação"
        errors={errors}
      />
      <Button>Enviar Email</Button>
    </div>
  )
}

function AuthCodeField({
  value,
  handleChange,
}: {
  value: string
  handleChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-sm text-justify mb-6 px-6">
        Informe o <span className="text-secondary">código verificador</span>{' '}
        enviado ao seu email para autenticarmos sua identidade.
      </p>

      <div className="flex flex-col items-center space-y-2">
        <Label>Código Verificador</Label>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(newVal) => handleChange(newVal)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button>Confirmar código</Button>
    </div>
  )
}
function ResetPasswordField({
  value,
  handleChange,
}: {
  value: { newPassword: string; confirmNewPassword: string }
  handleChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-sm text-justify mb-6 px-6">
        Quase lá! Agora que confirmamos sua identidade, digite e confirme a sua
        nova senha nos campos abaixo. Após a alteração, você será redirecionado
        para a tela de login.
      </p>

      <div className="flex flex-col space-y-4">
        <Field
          type="password"
          value={value.newPassword}
          onChange={(e) => handleChange({ newPassword: e })}
          label="Nova senha"
        />
        <Field
          type="password"
          value={value.confirmNewPassword}
          onChange={(e) => handleChange({ confirmNewPassword: e })}
          label="Confirmar nova senha"
        />
      </div>
      <Button>Alterar Senha</Button>
      {value.newPassword}
      {value.confirmNewPassword}
    </div>
  )
}
