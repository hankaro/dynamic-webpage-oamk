import { useState } from 'react';
const Product = () => { 
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
   
    const handleChange = (e) => { 
        try {
                setValue(e.target.value) 

        }
        catch (error) {
            console.log(error)
            setError("Oops!" + error)
        }
        
    } 
   
    return ( 
      <form> 
        <input 
          value={value} 
          onChange={handleChange} 
          type="text" 
        /> 
        <p>{value}</p>
        <p>{error}</p>
      </form> 
    ); 
   }; 

export default Product;