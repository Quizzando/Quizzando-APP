export function CourseDetailsSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      <section className="w-full flex flex-col md:flex-row md:items-start gap-6 px-4 sm:px-6 py-4">
        <div className="relative w-full md:w-1/2 flex-shrink-0">
          <div className="rounded-xl w-full h-[400px] md:h-[500px] bg-primary" />
        </div>
        <div className="flex flex-col w-full md:w-1/2 space-y-4 md:space-y-6">
          <div className="space-y-2">
            <div className="h-8 bg-primary rounded w-3/4" />
            <div className="h-4 bg-primary rounded w-20" />
          </div>
          <div className="space-y-3">
            <div className="h-6 bg-primary rounded w-32" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className=" p-6 rounded-lg h-24 bg-primary" />
              <div className=" p-6 rounded-lg h-24 bg-primary" />
              <div className=" p-6 rounded-lg h-24 bg-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-6 bg-primary rounded w-32" />
            <div className="space-y-2">
              <div className="h-4 bg-primary rounded w-full" />
              <div className="h-4 bg-primary rounded w-full" />
              <div className="h-4 bg-primary rounded w-3/4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
