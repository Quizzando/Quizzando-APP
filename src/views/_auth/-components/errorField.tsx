import * as Alert from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

interface ErrorFieldProps {
  errors: { message: string }[]
}

export const ErrorField = ({ errors }: ErrorFieldProps) => {
  return (
    <Alert.Alert variant="destructive">
      <AlertCircleIcon />
      <Alert.AlertTitle className="font-bold">Uh oh...</Alert.AlertTitle>
      <Alert.AlertDescription>
        <ul className="list-disc">
          {errors.map((error, i) => (
            <li key={i}>{error?.message}</li>
          ))}
        </ul>
      </Alert.AlertDescription>
    </Alert.Alert>
  )
}
