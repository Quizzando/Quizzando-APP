import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: () => (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ),
})
