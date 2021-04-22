// require('dotenv').config();
document.getElementById('message').innerHTML = localStorage.getItem('message');
const SIGNIN_URL = 'http://localhost:8000/api/login';
// const SIGNIN_URL = `${process.env.PORT.CLIENT_URL}/api/login`;


const login = async () => {
  try {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    //rrecuperation data
    
    axios.post(`${SIGNIN_URL}`,{email: email , password: password})
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
        alert(res.data.rol);
        localStorage.setItem("mail", email);
        if(res.data.rol == 'admin'){
          localStorage.setItem("rol", `admin`);
          window.location.href = "dashboardadmin.html";
        }else if(res.data.rol == 'user'){
          localStorage.setItem("rol", `user`);
          window.location.href = "dashboarduser.html";
        }



        // localStorage.setItem("authontificateduser", `true`);
        // window.location.href = "dashboarduser.html";
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
    
    // .then(
      
    //   //   window.location.href = "verifmail.html"
    // );
    // const message = data.message;
    // alert(message)
  } catch (error) {
    // console.error(error);
    console.log(error);
  }
};