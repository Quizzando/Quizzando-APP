import * as Alert from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

interface ErrorFieldProps {
  errors: { message: string }[]
}

export const ErrorField = ({ errors }: ErrorFieldProps) => {
  return (
    <div className="flex flex-row gap-2 text-red-600 items-center text-xs text-justify">
      <div>
        <AlertCircleIcon size={12} />
      </div>
      <p>{errors[0]?.message}</p>
    </div>
  )
}
