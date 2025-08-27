import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (context.auth.user) {
      throw redirect({
        to: '/dashboard',
        // search: {
        //   redirect: location.href,
        // },
      })
    }
  },
  component: () => (
    <div className="w-full min-h-screen flex items-center justify-between gap-4 px-10">
      <div className="flex-1/2">.</div>
      <Outlet />
    </div>
  ),
})
