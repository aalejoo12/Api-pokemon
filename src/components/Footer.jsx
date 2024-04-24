import { memo } from "react"
import "../css/Footer.css"
import { Navbar } from "react-bootstrap"
import useStore from "../store/useStore"


const Footer = memo(function Footer() {

const {modoOscuro,estiloClaro,estiloOscuro} = useStore()

  return (

    <div  style={modoOscuro?estiloOscuro:estiloClaro} className="footer d-flex justify-content-center">
    <Navbar sticky="botom" >
    <h4><i aria-hidden="true">Copyright© 2024 Alejo´s dev </i></h4>
  </Navbar>
  </div>
  )
})

export default Footer