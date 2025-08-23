import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import type { QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from '@/controllers/theme-context'
import { Header } from '@/components/Header'
import type { AuthProviderState } from '@/controllers/auth-context'

interface MyRouterContext {
  queryClient: QueryClient
  auth: AuthProviderState
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Header />
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
})
