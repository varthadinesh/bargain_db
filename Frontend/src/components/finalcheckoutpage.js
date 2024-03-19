import React, { useEffect } from 'react';
import axios from 'axios';

export default function Finalcheckoutpage() {
    
    useEffect(() => { 
       var token = sessionStorage.getItem("user-token");
          axios.post(`http://localhost:8080/updatepayment`, {payment_status:true, token})
          .then((res)=>{
             window.location.href= "http://localhost:3000/bargain_db/"
          })
        .catch((err) => console.log(err));
    }, []); 

    return <div>Loading...</div>;
}
