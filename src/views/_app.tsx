import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user) {
      throw redirect({
        to: '/login',
        // search: {
        //   redirect: location.href,
        // },
      })
    }
  },
  component: () => (
    <div className="max-w-10xl container mx-auto flex flex-col p-6 space-y-6">
      <Outlet />
    </div>
  ),
})
