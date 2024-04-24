import React from 'react'
import { Container, Pagination } from 'react-bootstrap';

const Paginate = ({next,previous,handlePages}) => {

    console.log(next,previous);

    const handleNext = () =>{

    let [,data,] = next.split("=");
        let [offset,] = data.split("&")
        console.log(offset);

        handlePages(offset)

    }

    const handlePrevious = () =>{
      if (previous===null) {
        previous="https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
      }
      let [,data,] = previous.split("=");
          let [offset,] = data.split("&")
          console.log(offset);
  
          handlePages(offset)
  
      }

  return (
    <div>
        <Container>
          <Pagination>
           <Pagination.Prev linkStyle={{backgroundColor:"#bdc3c7"}} onClick={handlePrevious}  />
          <Pagination.Next linkStyle={{backgroundColor:"#bdc3c7"}} onClick={handleNext}  />
          </Pagination>
          </Container>
    </div>
  )
}

export default Paginate