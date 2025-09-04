import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App.tsx'
import GlobalStyle from './style/index.ts'
import NavigationListener from './components/navListen/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <NavigationListener />
        <GlobalStyle />
        <App />
      </Router>
    </Provider>
  </StrictMode>,
)
