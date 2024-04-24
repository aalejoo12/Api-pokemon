import { useState } from "react";
import { Container, Button, Navbar } from "react-bootstrap";
import "../css/Header.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useStore from "../store/useStore.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLightbulb} from '@fortawesome/free-solid-svg-icons'


const Header = () => {


  const {cambiarColor, modoOscuro} = useStore()


  return (
    <>
   
      <Container className="text-center mt-4">
        <Navbar className="d-flex navHeader" fixed="top">
          { modoOscuro ?
    <Button onClick={cambiarColor} className="buttonHeader" variant="none" type="button"><FontAwesomeIcon icon={faLightbulb} style={{color: "#FFD43B",}} /></Button>
    :
    <Button onClick={cambiarColor} className="buttonHeader" variant="none" type="button"><i className="fa-solid fa-lightbulb"></i></Button>}
    </Navbar>
        <Link to={"/"}>
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 2 }}
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
            alt=""
          />
        </Link>
       
      </Container>
     
    </>
  );
};

export default Header;
