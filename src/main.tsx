import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import { Provider } from 'react-redux'
import rootStore from './root/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={rootStore}>
    <App />
  </Provider>
)
