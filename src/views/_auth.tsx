import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (context.auth.user) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: () => (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-[#916CF5] to-[#553F8F] p-4">
      <div className="flex flex-col md:flex-row items-center justify-between bg-white w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-6">
          <Outlet />
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src="/form-image.svg"
            alt="Form Image"
            className="w-full max-w-sm h-auto"
          />
        </div>
      </div>
    </div>
  ),
})
