import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import { ThemeProvider } from "./components/ThemeProvider"
import Layout from "./components/Layout"
import BeansPage from "./pages/BeansPage"
import FactsPage from "./pages/FactsPage"
import RecipesPage from "./pages/RecipesPage"
import CombinationsPage from "./pages/CombinationsPage"

import "./index.css"

const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="beans" />,
      },
      {
        path: "/beans",
        element: <BeansPage />,
      },
      {
        path: "/recipes",
        element: <RecipesPage />,
      },
      {
        path: "/facts",
        element: <FactsPage />,
      },
      {
        path: "/combinations",
        element: <CombinationsPage />,
      },
    ],
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
