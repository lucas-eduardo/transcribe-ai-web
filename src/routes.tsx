import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { AudiosPage } from './pages/AudiosPage'
import { HomePage } from './pages/HomePage/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/audios',
    element: <AudiosPage />,
  },
])

export function Routes() {
  return <RouterProvider router={router} />
}
