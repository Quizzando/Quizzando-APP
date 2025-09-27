import * as Lucide from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ClockProps {
  seconds: number
  duration?: number
  size?: number
}

export function Clock({ seconds, duration = 60, size = 32 }: ClockProps) {
  const segment = Math.floor(duration / 12)
  const currentStep = Math.min(11, Math.floor(seconds / segment)) // 0-11
  const time = (currentStep % 12) + 1 // convertendo para 1-12

  const iconName = `Clock${time}` as keyof typeof Lucide
  const Icon = Lucide[iconName]

  if (!Icon) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={iconName}
        initial={{ opacity: 0.2, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0.2, scale: 0.95 }}
        transition={{
          duration: 0.15,
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        <Icon size={size} />
      </motion.div>
    </AnimatePresence>
  )

  return
}
