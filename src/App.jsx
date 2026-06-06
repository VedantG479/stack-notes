import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import './App.css'
import ArticlePage from './pages/ArticlePage'
import AuthorPage from './pages/AuthorPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import WriteArticlePage from './pages/WriteArticlePage'
import ProtectedLayout from './ProtectedLayout'

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
    element: <ProtectedLayout/>,
    children: [{
      path: '/write', 
      element: <WriteArticlePage/>
    }, 
    {
      path: '/write/:articleId', 
      element: <WriteArticlePage/>
    },
    {
      path: '/dashboard', 
      element: <DashboardPage/>
    }]
  }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App
