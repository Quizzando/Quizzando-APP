import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { MOCK_COURSES } from "@/constants/mock"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const courses = MOCK_COURSES.map((course) => {
  return {
    id: course.id,
    value: formatCourseName(course.name),
    label: course.name,
  }
})

function formatCourseName(courseName: string): string {
  return courseName.toLowerCase().replace(/\s+/g, '')
}

interface CoursePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function CoursePicker({ value, onChange }: CoursePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {
            value
              ? courses.find((course) => course.id === value)?.label
              : "Selecione o curso..."
          }
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search course..." className="h-9" />
          <CommandList>
            <CommandEmpty>Curso não encontrado</CommandEmpty>
            <CommandGroup>
              {courses.map((course) => (
                <CommandItem
                  key={course.id}
                  value={course.id}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue
                    onChange(newValue)
                    setOpen(false)
                  }}
                >
                  {course.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === course.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
