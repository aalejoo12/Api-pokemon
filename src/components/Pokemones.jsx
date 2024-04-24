import { useState, useEffect } from "react";
import {
  Col,
  Button,
  Container,
  Row,
  InputGroup,
  Form,
  Navbar,
  Dropdown
} from "react-bootstrap";
import axios from "axios";
import { BASE_URL, POKEMONS, TIPOS } from "../constants/endpoints";
import PokemonCard from "./PokemonCard";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
// import Paginate from "./Paginate";
import { PaginationControl } from "react-bootstrap-pagination-control";
import {motion } from "framer-motion"
import "../css/Pokemones.css"

const Pokemones = () => {
  const [pokemones, setPokemones] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);

  const [allPokemones, setAllPokemones] = useState([]);
  const [listado, setListado] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [total, setTotal] = useState(0);
  const [tipos, setTipos] = useState([])




  const getPokemones = async (o) => {
    const liga = `${BASE_URL}/${POKEMONS}?offset=${o}&limit=${limit}`;
    // console.log(liga);

    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      console.log(respuesta.results);
      setPokemones(respuesta.results);
      setListado(respuesta.results);
      setTotal(respuesta.count);

    });
  };

  const getAllPokemones = async () => {
    const liga = `${BASE_URL}/${POKEMONS}?offset=0&limit=100000`;
    // console.log(liga);

    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      // console.log(respuesta.results);
      setAllPokemones(respuesta.results);
    });
  };

  const getTipos = async (type) =>{
    const liga = `${BASE_URL}/${TIPOS}/${type}`
    let tipes = []
    // console.log(liga)
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      console.log(respuesta.name);
      respuesta.pokemon.map(res=>{tipes.push(res.pokemon)})
      // console.log(tipes);
      setListado([]);
      setTimeout(()=>{
        setListado(tipes)
      })
    });
  }

  const handleBuscar = async (e) => {
    e.preventDefault(e);
    if (filtro.trim() != "") {
      setListado([]);
      setTimeout(() => {
        setListado(allPokemones.filter((p) => p.name.includes(filtro)));
      });
    } else if (filtro.trim() == "") {
      setListado([]);
      setTimeout(() => {
        setListado(pokemones);
      });
    }
    setFiltro("");
  };
  const handleKeyDown = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      handleBuscar(e);
    }
  };

  const goPage = async (p) => {
    setListado([]);
    await getPokemones(p == 1 ? 0 : (p - 1) * 20);
    setOffset(p);
  };

  // const handlePages = (off) => {
  //   console.log(off);
  //   setOffset(off);
  //   setListado([]);
  //   setTimeout(() => {
  //     setListado(pokemones);
  //   });
  // };

  useEffect(() => {
    getPokemones(offset);
    getAllPokemones();
  }, []);

  return (
    <div className="container-fluid">
      <Container className="mt-4 d-flex justify-content-center">
<Col md={{ span: 1, offset: 3 }}>
          <InputGroup className="input " >
            <Form.Control
              placeholder="Busca por nombre"
              aria-label="Busca por nombre"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              onKeyDown={handleKeyDown}
              className="input"
            />
            <Button  type="button" onClick={handleBuscar}>
              Buscar
            </Button>
          </InputGroup>
          </Col>
          <Col md={{ span: 1, offset: 3 }}>
        <Dropdown className="ml-5 ">
          <Dropdown.Toggle className="dropdown" variant="light" id="dropdown-basic">
          <i className="fa-solid fa-filter"></i> Filtrar por tipo
          
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdownMenu" >
            <Dropdown.Item onClick={() => getTipos(1)}>Normal</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(2)}>Lucha</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(3)}>Volador</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(4)}>Veneno</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(5)}>Tierra</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(6)}>Roca</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(7)}>Bicho</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(8)}>Fantasma</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(9)}>Acero</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(10)}>Fuego</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(11)}>Agua</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(12)}>Planta</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(13)}>Electrico</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(14)}>Psíquico</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(15)}>Hielo</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(16)}>Dragón</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(17)}>Siniestro</Dropdown.Item>
            <Dropdown.Item onClick={() => getTipos(18)}>Hada</Dropdown.Item>


          </Dropdown.Menu>
        </Dropdown>
        </Col>
        </Container>

      <Row md={4}>
        {listado.map((pok, i) => (
          <PokemonCard key={i} poke={pok} />
        ))}
      </Row>
      <Container className="d-flex justify-content-center mt-5">
        <Navbar sticky="bottom">
          <PaginationControl
            last={true}
            limit={limit}
            total={total}
            page={offset}
            changePage={(page) => goPage(page)}
          />
          {/* <Paginate {...paginas} handlePages={handlePages} /> */}
        </Navbar>
      </Container>
    </div>
  );
};

export default Pokemones;
