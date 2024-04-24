import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImg,
  CardText,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/PokemonCard.css";
import { motion} from "framer-motion";
import useStore from "../store/useStore";

const PokemonCard = (props) => {

  const [pokemon, setPokemon] = useState([]);
  const [imagen, setImagen] = useState("");
  const {estiloClaro,estiloOscuro,modoOscuro} = useStore()

  const getPokemon = async () => {
    const liga = props.poke.url;
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      // console.log(respuesta);
      setPokemon(respuesta);
      if (respuesta.sprites.other.dream_world.front_default != null) {
        setImagen(respuesta.sprites.other.dream_world.front_default);
      } else {
        setImagen(respuesta.sprites.other["official-artwork"].front_default);
      }
      // setImagen(respuesta.sprites.other.dream_world.front_default)
    });
  };
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    getPokemon();
  }, []);
  return (
    
    <div className="text-center">
       
      <Col className="mt-5 d-flex justify-content-center">
          <motion.div initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{duration:0.5}}>
        <Card
          className="cardPoke"
          style={modoOscuro?estiloOscuro:estiloClaro}
          >
          <CardHeader>#{pokemon.id}</CardHeader>
          <CardBody>
            <CardImg className="img" src={imagen} />
            <CardText className="text-capitalize">
              <b>{pokemon.name}</b>
            </CardText>
          </CardBody>
          <CardFooter>
            <Link onClick={handleScrollToTop} className="btn btn-primary" to={`/pokemon/${pokemon.name}`}>
              Ver más
            </Link>
          </CardFooter>
        </Card>
            </motion.div>
      </Col>
    </div>
  );
};

export default PokemonCard;
