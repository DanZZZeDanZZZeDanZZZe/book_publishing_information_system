import { Switch, Route, Link, Redirect, BrowserRouter } from 'react-router-dom'

import NavSideMenu from './components/NavSideMenu'
import useAuth from './hooks/useAuth'
import AuthorsPage from './pages/AuthorsPage'
import BooksPage from './pages/BooksPage'
import CommandsPage from './pages/CommandPage'
import LoginPage from './pages/LoginPage'
import ProjectPage from './pages/ProjectPage'
import RegistrationPage from './pages/RegistrationPage'

function AppRouter() {
  const isAuth = useAuth()

  return (
    <BrowserRouter>
      {isAuth && (
        <NavSideMenu>
          <Link to="/authors">Authors</Link>
          <Link to="/books">Books</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/commands">Commands</Link>
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
            <Route path="/projects" exact>
              <ProjectPage />
            </Route>
            <Route path="/commands" exact>
              <CommandsPage />
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
