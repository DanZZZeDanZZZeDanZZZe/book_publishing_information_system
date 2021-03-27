import { Switch, Route, Link, Redirect, BrowserRouter } from 'react-router-dom'

import NavSideMenu from './components/NavSideMenu'
import useAuth from './hooks/useAuth'
import AuthorsPage from './pages/AuthorsPage'
import BooksPage from './pages/BooksPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'

function AppRouter() {
  const isAuth = useAuth()

  return (
    <BrowserRouter>
      {isAuth && (
        <NavSideMenu>
          <Link to="/authors">Authors</Link>
          <Link to="/books">Books</Link>
        </NavSideMenu>
      )}
      <Switch>
        {isAuth ? (
          <>
            <Route path="/books" exact>
              <BooksPage />
            </Route>
            <Route path="/authors" exact>
              <AuthorsPage />
            </Route>
            <Route path="/">
              <Redirect to="/books" />
            </Route>
          </>
        ) : (
          <>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/registration">
              <RegistrationPage />
            </Route>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
