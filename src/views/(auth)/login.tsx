import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { baseSchema } from '@/models/schemas/auth-forms.schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Eye, EyeClosed, AlertCircleIcon } from 'lucide-react'
import { useState } from 'react'
import * as Alert from '@/components/ui/alert'

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    asyncDebounceMs: 500,
    validators: { onChange: baseSchema },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  })
  const [showPswrd, setShowPswrd] = useState(false)

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
            children={(field) => (
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <Alert.Alert variant="destructive">
                    <AlertCircleIcon />
                    <Alert.AlertTitle className="font-bold">
                      Uh oh...
                    </Alert.AlertTitle>
                    <Alert.AlertDescription>
                      <ul className="list-disc">
                        {field.state.meta.errors.map((error, i) => (
                          <li key={i}>{error?.message}</li>
                        ))}
                      </ul>
                    </Alert.AlertDescription>
                  </Alert.Alert>
                )}
              </div>
            )}
          />
          <form.Field
            name="password"
            children={(field) => (
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPswrd ? 'text' : 'password'}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPswrd(!showPswrd)}
                  >
                    {showPswrd ? (
                      <EyeClosed className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                </div>
                {field.state.meta.errors.length > 0 && (
                  <Alert.Alert variant="destructive">
                    <AlertCircleIcon />
                    <Alert.AlertTitle className="font-bold">
                      Uh oh...
                    </Alert.AlertTitle>
                    <Alert.AlertDescription>
                      <ul className="list-disc">
                        {field.state.meta.errors.map((error, i) => (
                          <li key={i}>{error?.message}</li>
                        ))}
                      </ul>
                    </Alert.AlertDescription>
                  </Alert.Alert>
                )}
              </div>
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
                Login
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
