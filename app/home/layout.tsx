import NavMenu from '@/components/nav-menu'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <div className="flex justify-center pt-5">
        <NavMenu />
      </div>
      <>{children}</>
    </div>
  )
}
