import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import './App.css'
import ArticlePage from './pages/ArticlePage'
import AuthorPage from './pages/AuthorPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import WriteArticlePage from './pages/WriteArticlePage'
import ProtectedLayout from './ProtectedLayout'
import authorPageLoader from './loader/authorPageLoader'
import AuthorNotFound from './pages/ErrorPages/AuthorNotFound'
import articlePageLoader from './loader/articlePageLoader'
import ArticleNotFound from './pages/ErrorPages/ArticleNotFound'
import searchResultLoader from './loader/searchResultsLoader'
import writeArticleLoader from './loader/writeArticleLoader'
import dashboardLoader from './loader/dashboardLoader'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>, 
    loader: searchResultLoader
  }, 
  {
    path: '/login', 
    element: <LoginPage/>
  }, 
  {
    path: '/:articleId',
    element: <ArticlePage/>, 
    loader: articlePageLoader, 
    errorElement: <ArticleNotFound/>
  },
  {
    path: '/author/:authorId',
    element: <AuthorPage/>, 
    loader: authorPageLoader, 
    errorElement: <AuthorNotFound/>
  }, 
  {
    element: <ProtectedLayout/>,
    children: [{
      path: '/write', 
      element: <WriteArticlePage/>, 
      loader: writeArticleLoader
    }, 
    {
      path: '/write/:articleId', 
      element: <WriteArticlePage/>, 
      loader: writeArticleLoader
    },
    {
      path: '/dashboard', 
      element: <DashboardPage/>, 
      loader: dashboardLoader
    }]
  }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App
