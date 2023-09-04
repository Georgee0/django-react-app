import React from 'react';
import axios from 'axios';

const LogOut = () => {

    const handleLogOut = () =>{
        const token = localStorage.getItem('token');

        axios.get('http://127.0.0.1:8000/logout/', {
            headers : {
                Authorization: `Token ${token}`,
            },
        })
        .then((response) =>{
            console.log("LogOut Successful: ", response);

            //remove the user's token
            //localStorage.removeItem("token", response.data.token);

            // Redirect back to homepage
            window.location='/';
        })
        .catch(error=>{
            console.error("LogOut Failed: ", error)
        })
    }

  return (
    <div>
        <button onClick={handleLogOut}>Logout</button>
      
    </div>
  )
}

export default LogOut
