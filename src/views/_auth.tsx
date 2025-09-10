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
    <div className="w-full h-[85vh] flex justify-center items-center bg-gradient-to-b from-[#916CF5] to-[#553F8F]">
      <div className="flex items-center justify-between bg-white w-[80%] h-min">
        <Outlet />
        <div>
          <img src="/form-image.svg" width={'420px'} alt="Form Image" />
        </div>
      </div>
    </div>
  ),
})
