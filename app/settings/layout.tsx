import NavMenu from '@/components/home/nav-menu'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <div className="flex justify-center pt-5 lg:pt-20">
        <NavMenu />
      </div>
      <>{children}</>
    </div>
  )
}
