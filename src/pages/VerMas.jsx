import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Col,
  Modal,
  Button,
  ModalDialog,
  Card,
  CardImg,
  CardBody,
  CardText,
  Badge,
  Row,
  Container,
} from "react-bootstrap";
import PokemonCard from "../components/PokemonCard";
import axios from "axios";
import { BASE_URL, ESPECIES, EVOLUCIONES, POKEMONS } from "../constants/endpoints";
import "../css/VerMas.css";
import { motion } from "framer-motion"
import useStore from "../store/useStore";
import PokemonCardEv from "../components/PokemonCardEv";

const VerMas = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [imagen, setImagen] = useState([]);
  const [especie, setEspecie] = useState([]);
  const [habitat, setHabitat] = useState([])
  const [descripcion, setDescripcion] = useState([])
  const [tipos, setTipos] = useState([])
  const { estiloClaro, estiloOscuro, modoOscuro } = useStore()
  const [evolucion, setEvolucion] = useState([])
  const [imagenEv, setImagenEv] = useState([])
  const [listaEvoluciones, setListaEvoluciones] = useState([])

  const getPokemon = async () => {
    const liga = `${BASE_URL}/${POKEMONS}/${id}`;
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      setPokemon(respuesta);
      if (respuesta.sprites.other.dream_world.front_default != null) {
        setImagen(respuesta.sprites.other.dream_world.front_default);
      } else {
        setImagen(respuesta.sprites.other["official-artwork"].front_default);
      }
      await getEspecie(respuesta.species.name)
      //  console.log(respuesta.types);
      await getTipos(respuesta.types)
    });

  };

  const getEspecie = async (esp) => {
    const liga = `${BASE_URL}/${POKEMONS}-${ESPECIES}/${esp}`;
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;

      setEspecie(respuesta);
      if (respuesta.habitat != null) {
        await getHabitat(respuesta.habitat.url);
      }
      await getDescripcion(respuesta.flavor_text_entries)

      await getEvolucion(respuesta.evolution_chain.url)
    });
  };


  const getHabitat = async (hab) => {
    axios.get(hab).then(async (response) => {
      setHabitat(response.data.names[1].name);
    });
  };

  const getDescripcion = async (desc) => {
    let texto = ""
    desc.forEach((d) => {
      if (d.language.name == "es") {
        texto = d.flavor_text
      }
    })
    setDescripcion(texto)
  };
  const getTipos = async (tip) => {
    let listaTipos = []
    tip.map((t) => (
      axios.get(t.type.url).then(async (response) => {
        listaTipos.push(response.data.names[5].name)
        setTipos(listaTipos)
      })
    ))
  }



  const getEvolucion = async (ev) => {
    axios.get(ev).then(async (response) => {
      const respuesta = response.data;
      console.log(respuesta.chain.species.url)
      let lista = respuesta.chain.species.url.replace("-species", "")
      console.log(respuesta.chain)
      lista += procesaEvoluciones(respuesta.chain)
      setEvolucion(lista)
      let apoyo = lista.split(' ')
      console.log(apoyo)
      let list = []
      apoyo.forEach(ap => {
        if (ap != '') {
          list.push({ url: ap })

        }
      })
      setListaEvoluciones(list)
      // console.log(list)
    });
  }

  const procesaEvoluciones = (info) => {
    let res = ' '
    // console.log(info)
    if (info.evolves_to.length > 0) {
      res += info.evolves_to[0].species.url.replace("-species", "")
      console.log(res)
      return res + ' ' + procesaEvoluciones(info.evolves_to[0]);
    } else {
      return res;
    }
  }



  // const getEvolucion = async (ev) =>{
  //   axios.get(ev).then(async(response)=>{
  //     console.log(response.data.chain.evolves_to[0].species.url)
  //     const otraUrl = response.data.chain.evolves_to[0].species.url
  //     let [,array] = otraUrl.split("es/")
  //     let[array2] = array.split("/")
  //     console.log(array2)
  //     const respuesta= response.data.chain.evolves_to[0].species.name


  //     const getPokemon = async () => {

  //       const liga = `${BASE_URL}/${POKEMONS}/${respuesta}`;
  //       axios.get(liga).then(async (response) => {
  //         const respuesta = response.data;
  //         // console.log(respuesta)
  //         setEvolucion(respuesta);
  //         if (respuesta.sprites.other.dream_world.front_default != null) {
  //           setImagenEv(respuesta.sprites.other.dream_world.front_default);
  //         } else {
  //           setImagenEv(respuesta.sprites.other["official-artwork"].front_default);
  //         }
  //       });

  //     };
  //     await getPokemon()
  //     // console.log(respuesta.chain.evolves_to[0].species.name)
  //     // console.log(respuesta.chain.evolves_to[0].evolves_to[0].species.name)
  //     // setEvolucion(respuesta.chain.evolves_to[0].species)
  //   })
  // }

  useEffect(() => {
    getPokemon();
  }, [id]);

  return (
    <div className="text-center">
      <motion.div >

        <ModalDialog className="modalDialog">
          <Modal.Header style={modoOscuro ? estiloOscuro : estiloClaro} className="modalHeader">
            <Modal.Title
              className="text-capitalize"
              id="contained-modal-title-vcenter"
            >
              #{pokemon.id} {pokemon.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={modoOscuro ? estiloOscuro : estiloClaro} className="modalBody">
            <Card style={modoOscuro ? estiloOscuro : estiloClaro} className="cardVermas">
              <CardBody>
                <div className="d-flex justify-content-end">
                  <CardImg className="imagenModal" src={imagen} />

                  <div className="cardTextDatos mt-5">
                    <CardText>
                      <b>Altura:</b> {pokemon.height}
                    </CardText>
                    <CardText>
                      <b>Peso:</b> {pokemon.weight}kg.
                    </CardText>
                    <CardText>
                      <b>Habitat:</b> {habitat}
                    </CardText>
                  </div>
                </div>
                <CardText className="cardTextDesc mt-4">
                  <b>Descripcion:</b> {descripcion}
                </CardText>
                <CardText className="cardTextTipo">
                  <b>Tipo:</b> {tipos.map((tip, i) => (
                    <Badge className="me-2" pill bg={tip === "Planta" ? "success" : tip === "Eléctrico" ? "warning" : tip === "Fuego" || tip === "Dragón" ? "danger" : tip === "Agua" ? "info" : tip === "Veneno" ? "dark" : tip === "Volador" ? "primary" : tip === "Hielo" ? "light" : "secondary"}
                      text={tip === "Hielo" ? "dark" : "white"}
                      key={i}>
                      {tip}
                    </Badge>

                  ))}
                </CardText>


                {/* <CardText className="cardTextTipo">
              <b>Evolucion:</b>
              <Card className="cardEvolucion">
                <CardImg className="imgEvolucion" src={imagenEv}/>
                <CardText>{evolucion.name}</CardText>
              </Card>
              <Card className="cardEvolucion">
                <CardImg className="imgEvolucion" src={imagenEv}/>
                <CardText>{evolucion.name}</CardText>
              </Card>
              
            </CardText> */}
                <b>Evolución</b>
                <Row md={3}>
                  {listaEvoluciones.map((pok, i) => (

                    <PokemonCardEv key={i} poke={pok} />
                  ))}
                </Row>
              </CardBody>
            </Card>

            {/* <img className="imagenModal" src={imagen}/>

       <p>Altura: {pokemon.height}</p>
       <p>Peso: {pokemon.weight}</p> */}
          </Modal.Body>
          <Modal.Footer style={modoOscuro ? estiloOscuro : estiloClaro} className="modalFooter">
            <Link className="btn btn-danger" to={"/"}>
              Cerrar
            </Link>
          </Modal.Footer>
        </ModalDialog>
      </motion.div>
    </div>
  );
};

export default VerMas;
