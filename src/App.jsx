import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import './App.css'
import ArticlePage from './pages/ArticlePage'
import AuthorPage from './pages/AuthorPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import WriteArticlePage from './pages/WriteArticlePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  }, 
  {
    path: '/login', 
    element: <LoginPage/>
  }, 
  {
    path: '/:articleId',
    element: <ArticlePage/>
  },
  {
    path: '/author/:authorId',
    element: <AuthorPage/>
  }, 
  {
    path: '/write', 
    element: <WriteArticlePage/>
  }, 
  {
    path: '/dashboard', 
    element: <DashboardPage/>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}>
        <Outlet/>
      </RouterProvider>
    </>
  )
}

export default App
