import { Skeleton } from '@/components/ui/skeleton'
import { BookOpen } from 'lucide-react'

export function CourseSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 mb-6">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-pulse" />
            </div>
            <Skeleton className="h-10 sm:h-12 lg:h-14 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-5 sm:h-6 w-full max-w-2xl mx-auto mb-2" />
            <Skeleton className="h-5 sm:h-6 w-4/5 max-w-xl mx-auto" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 space-y-12 sm:space-y-16">
        {/* Section 1 */}
        <section>
          <Skeleton className="h-8 sm:h-9 w-64 mb-6 sm:mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <Skeleton className="h-8 sm:h-9 w-64 mb-6 sm:mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function CourseCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 w-9" />
      </div>
    </div>
  )
}
