import { Clock as ClockIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ClockProps {
  seconds: number
  duration?: number
  size?: number
}

export function Clock({ seconds, duration = 30, size = 32 }: ClockProps) {
  // Background color logic
  const getBgColor = () => {
    if (seconds > 20) return 'bg-green-500'
    if (seconds > 10) return 'bg-yellow-400'
    return 'bg-red-500'
  }

  const bgColor = getBgColor()

  return (
    <motion.div
      className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-white ${bgColor}`}
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={bgColor}
          initial={{ scale: 0.9, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0.9, rotate: 10 }}
          transition={{
            duration: 0.2,
            type: 'spring',
            stiffness: 300,
            damping: 15,
          }}
        >
          <ClockIcon size={size} />
        </motion.div>
      </AnimatePresence>

      <motion.span
        key={seconds}
        initial={{ opacity: 0.6, y: -2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="font-mono font-bold text-lg"
      >
        {seconds}s
      </motion.span>
    </motion.div>
  )
}
