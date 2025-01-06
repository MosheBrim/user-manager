import { RouterProvider } from "react-router-dom"
import router from './routers/Router';
import './styles/index.css'


const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
