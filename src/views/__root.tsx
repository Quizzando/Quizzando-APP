import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import type { QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from '@/controllers/theme-context'
import type { AuthProviderState } from '@/controllers/auth-context'
import { NotFound } from './-not-found'

interface MyRouterContext {
  queryClient: QueryClient
  auth: AuthProviderState
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Outlet />
        <TanstackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      </ThemeProvider>
    </>
  ),
  notFoundComponent: () => <NotFound />,
})
