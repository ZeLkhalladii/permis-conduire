// require('dotenv').config();
const SIGNIN_URL = 'http://localhost:8000/api/signup';
// const SIGNIN_URL = `${process.env.PORT.CLIENT_URL}/api/signup`;


const signin = async () => {
  try {
    var name = document.getElementById("name").value;
    var prenom = document.getElementById("prenom").value;
    var email = document.getElementById("email").value;
    var tel = document.getElementById("tel").value;
    var adresse = document.getElementById("adresse").value;
    var numero_du_Permis = document.getElementById("numero_du_Permis").value;
    var password = document.getElementById("password").value;
    
    
    axios.post(`${SIGNIN_URL}`,{
      name: name , 
      prenom: prenom , 
      email: email , 
      tel: tel , 
      adresse: adresse , 
      email: email , 
      numero_du_Permis: numero_du_Permis,
      password: password
    })
    .then(res => {
      if(res.data.message){
        console.log(res.data.message);
        // document.getElementById('message').innerHTML = `
        // <div class="alert alert-success" role="alert">
        //   ${res.data.message}
        // </div>`;
    //     <div class="alert alert-success" role="alert">
    //     ${res.data.message}
    //   </div>
        localStorage.setItem("message", `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${res.data.message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `);
        // window.location.href = "verifmail.html";
        window.location.href = "login.html";
      }else{
        console.log(res.data.error);
        // document.getElementById('message').innerHTML = `
        // <div class="alert alert-success" role="alert">
        //   ${res.data.message}
        // </div>`;
        // <div class="alert alert-danger" role="alert">
        //   ${res.data.error}
        // </div>
        localStorage.setItem("message", `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>${res.data.error}!</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `);
        document.getElementById('message').innerHTML = localStorage.getItem("message");
        // window.location.href = "verifmail.html";
      }
      
    })

  } catch (error) {
    // console.error(error);
    console.log(error);
  }
};