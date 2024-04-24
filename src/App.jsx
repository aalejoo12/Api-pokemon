import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import VerMas from "./pages/VerMas"
import useStore from "./store/useStore"
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
   ${(props) => (props.modoOscuro ? props.estiloOscuro : props.estiloClaro)};
  }
`;

function App() {

  const { modoOscuro, estiloClaro, estiloOscuro } = useStore()

  return (
    <>
    <GlobalStyle modoOscuro={modoOscuro} estiloClaro={estiloClaro} estiloOscuro={estiloOscuro}/>
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/pokemon/:id" element={<VerMas/>}/>
    </Routes>
    </BrowserRouter>
     
    </div>
    </>
  )
}

export default App
