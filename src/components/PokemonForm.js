import React, { useState } from "react";
import { Form } from "semantic-ui-react";

// Default Form Values
const defaultForm = {
  name: "",
  hp: "",
  frontUrl: "",
  backUrl: ""
}


function PokemonForm({ addToPokedex }) {

  // State and Variable Declaration
  const [formData, setFormData] = useState(defaultForm);
  const { name, hp, frontUrl, backUrl } = formData;

  // Reset formData to default values
  const resetForm = () => setFormData(defaultForm);

  // Handles form onSubmit event
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPokemonData = {
      name: name,
      hp: hp,
      sprites: {
        front: frontUrl,
        back: backUrl
      }
    }
    addToPokedex(newPokemonData);

    resetForm();
  }

  // Handles input onChange events: input name attributes must match formData keys
  const handleFormChange = ({ target: { type, name, value, checked } }) => {
    const newValue = type === 'checkbox' ? checked : value; 
    const updatedFormData = { ...formData, [name]: newValue };

    setFormData(updatedFormData);
  }


  
  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" placeholder="Name" name="name" value={name} onChange={handleFormChange}/>
          <Form.Input fluid label="hp" placeholder="hp" name="hp" value={hp} onChange={handleFormChange}/>
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="frontUrl"
            value={frontUrl}
            onChange={handleFormChange}
          />
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="backUrl"
            value={backUrl}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
