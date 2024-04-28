import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Form, Row, Col, Button} from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ProductCard from './productCard';
import { supabase } from './client';
// Create the user interface (Navbar, Sidebar, Main, Footer)
// set up the supabase client
function App() {
  const[name, setName] = useState('');
  const[description, setDescription] = useState('');
  const[image, setImage] = useState('');
  const[location, setLocation] = useState('');
  const[poster, setPoster] = useState('');
  const[products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    getProducts();
}, []);



async function getProducts() {
    try {
      const { data, error } = await supabase
       .from('products')
       .select('*');
       if (error) throw error;
       if (data != null) {
           setProducts(data);
           console.log(data);
       }
    } catch (error) {
      console.log('error', error)
      alert(error.message);
    }

  }

async function createProduct() {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert({ name: name, description: description, location_text: location, poster: poster, imageUrl})
      .single();

    if (error) throw error;
   window.location.reload();
  } catch (error) {
    console.log('error', error);
    alert(error.message);
  }
}

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home"> Art History Forum
            <Nav.Item> Created by Josiah Welcome</Nav.Item>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h3>Create Post</h3>
            <Form.Label> Name of Art Piece</Form.Label>
            <Form.Control 
              type="text" 
              id='name' 
              placeholder="Enter Art piece Name"  
              onChange={(e) =>setName(e.target.value)}
            />
            <br></br>
            <Form.Label> Name </Form.Label>
            <Form.Control 
              type="text" 
              id='poster' 
              placeholder="Enter your Name"  
              onChange={(e) =>setPoster(e.target.value)}
            />
            <br></br>
            <Form.Label> Art piece description</Form.Label>
            <Form.Control 
              type="text" 
              id='description' 
              placeholder="Enter Art piece Description"
              onChange={(e) =>setDescription(e.target.value)}
              />
            <br></br>
            <Form.Label> Place of Art work</Form.Label>
            <Form.Control 
              type="text" 
              id='location' 
              placeholder="Enter addresss or location of the art piece"  
              onChange={(e) =>setLocation(e.target.value)}
            />
            <br></br>
              <Form.Label>Upload Image</Form.Label>
              <input type="text" value={imageUrl} placeholder="Enter external image URL" onChange={(e) => setImageUrl(e.target.value)}/>
            <br></br>
            <Button onClick={()=> createProduct()}>Create Post!</Button>
          </Col>
        </Row>
        <hr></hr>
        <h3> Current blog Post</h3>
        <Form.Control
            type="search"
            placeholder="Search by name or poster"
            onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Row xs={1} lg={3} className="g-4">
        {products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.poster.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (

  <Col> 
  <br></br>
  <hr></hr>
    <ProductCard product={product}/>
  </Col>
))}
</Row>
      </Container>
    </>
  );
}

export default App;
