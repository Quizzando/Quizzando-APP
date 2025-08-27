import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorField } from './errorField'
import { Button } from '@/components/ui/button'
import { Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'

interface FieldProps {
  type: 'text' | 'email' | 'password'
  label: string
  value: string
  onChange: (value: string) => void
  errors?: { message: string }[]
}

export const Field = ({ type, label, value, onChange, errors }: FieldProps) => {
  const [showPswrd, setShowPswrd] = useState(false)

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor={label}>{label}</Label>
      <div className="relative">
        <Input
          type={
            type === 'password' ? (showPswrd ? 'text' : 'password') : 'text'
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {type === 'password' && (
          <Button
            type="button"
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
        )}
      </div>
      {errors && errors?.length > 0 && <ErrorField errors={errors} />}
    </div>
  )
}
