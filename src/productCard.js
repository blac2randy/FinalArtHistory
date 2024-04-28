import {Card, Button, Form} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { supabase } from './client';

function ProductCard(props) {
    const product = props.product;
    const [editing, setEditing] = useState(false);
    const[name, setName] = useState(product.name);
    const[description, setDescription] = useState(product.description);
    const [imageUrl, setImageUrl] = useState(product.imageUrl || '');
    const[location, setLocation] = useState(product.location_text);
    const[poster, setPoster] = useState(product.poster);
   
  

    async function updateProduct() {
        try {
            const { data, error } = await supabase
              .from('products')
              .update({ name: name, description: description, location_text: location, poster: poster, imageUrl: imageUrl })
              .eq('id', product.id);
        
            if (error) throw error;
           window.location.reload();
          } catch (error) {
            console.log('error', error);
            alert(error.message);
          }
    }

    async function deleteProduct() {
        try {
            const { data, error } = await supabase
              .from('products')
              .delete()
              .eq('id', product.id);
        
            if (error) throw error;
           window.location.reload();
          } catch (error) {
            console.log('error', error);
            alert(error.message);
          }
    }

    const [count, setCount] = useState(0)
    const updateCount = () => {
        setCount((count) => count + 1);
      };


    return(
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                { editing == false ?
                <>
                <Card.Title>{product.name}</Card.Title>
                <Card.Img variant="top" src={imageUrl} />
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>{product.location_text}</Card.Text>
                <Card.Text>{'Posted by ' +product.poster}</Card.Text>
                <Card.Text>{'Posted on ' +product.date}</Card.Text>
                <Button className="like-button" onClick={updateCount} >👍 Like: {count}</Button>
                <Button variant='danger'onClick={() => deleteProduct()}>Delete Post</Button>
                <Button variant='secondary' onClick={()=> setEditing(true)}>Edit Post</Button>
                </>
                :
                <>
                <h4> Editing interface</h4>
                <Form.Control 
                    type="text" 
                    value={imageUrl}
                    placeholder="Enter external image URL" 
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <button size='sm' onClick={()=> setEditing(false)}> Go Back</button>
                <br></br>
        <Form.Label> Name of Art Piece</Form.Label>
            <Form.Control 
              type="text" 
              id='name' 
              defaultValue={product.name}
              placeholder="Enter name of Art Piece"  
              onChange={(e) =>setName(e.target.value)}
            />
            <br></br>
            <Form.Label> Poster</Form.Label>
            <Form.Control 
              type="text" 
              id='poster' 
              defaultValue={product.poster}
              placeholder="Enter your Name"  
              onChange={(e) =>setPoster(e.target.value)}
            />
            <br></br>
            <Form.Label> Art piece description</Form.Label>
            <Form.Control 
              type="text" 
              id='description' 
              defaultValue={product.description}
              placeholder="Enter Art piece Description"
              onChange={(e) =>setDescription(e.target.value)}
              />
            <br></br>
            <Form.Label> Place of work</Form.Label>
            <Form.Control 
              type="text" 
              id='location' 
              defaultValue={product.location_text}
              placeholder="Enter addresss or location of the art piece"  
              onChange={(e) =>setLocation(e.target.value)}
            />
            <br></br>
            <Button onClick={() => updateProduct()}>Update Post!</Button>
        </>
             
                
            }

            </Card.Body>
        </Card>
    )
}

export default ProductCard;