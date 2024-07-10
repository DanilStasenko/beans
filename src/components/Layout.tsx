import { NavLink, Outlet, useLocation } from "react-router-dom"

import { ModeToggle } from "./ModeToggle"
import { Bean, BookOpenText, CookingPot, Puzzle } from "lucide-react"

const navList = [
  { text: "Beans", path: "/beans", icon: <Bean /> },
  { text: "Recipes", path: "/recipes", icon: <CookingPot /> },
  { text: "Facts", path: "/facts", icon: <BookOpenText /> },
  { text: "Combinations", path: "/combinations", icon: <Puzzle /> },
]

const Layout = () => {
  const location = useLocation()
  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-muted flex justify-between items-center py-5 border-b-2 border-primary">
        <nav className="flex-grow flex justify-center">
          <ul className="flex gap-2 md:gap-5">
            {navList.map(nav => (
              <li
                className={`${isActive(nav.path) ? "bg-primary text-secondary" : ""} p-2 rounded-md shadow-lg`}
                key={nav.path}
              >
                <NavLink to={nav.path} className="flex gap-1">
                  {nav.icon}
                  <span className="hidden md:inline">{nav.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto pr-3">
          <ModeToggle />
        </div>
      </header>
      <main className="flex-grow py-4 px-2 md:py-6 md:px-4 lg:py-8 lg:px-6">
        <Outlet />
      </main>
      <footer className="flex justify-center py-4">
        <p>Copyright &copy; {new Date().getFullYear()} All Rights Reserved</p>
      </footer>
    </div>
  )
}

export default Layout
