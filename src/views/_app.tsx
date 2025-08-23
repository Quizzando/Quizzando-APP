import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context, location }) => {
    if (context.auth.user === null) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: () => <Outlet />,
})
