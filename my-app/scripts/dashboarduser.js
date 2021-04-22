// require('dotenv').config();
if(localStorage.getItem("rol") !== 'user'){
    window.location.href = "index.html";
}

function logout(){
    localStorage.removeItem('rol');
}

document.getElementById('mail').innerHTML = localStorage.getItem("mail");
var numpermisUser = "";

// document.getElementById('mail').innerHTML = localStorage.getItem("mailhid");

const USER_DATA_URL = 'http://localhost:8000/api/datauser';
// const USER_DATA_URL = `${process.env.PORT.CLIENT_URL}/api/datauser`;


const datauser = async () => {
    try {
      var email = localStorage.getItem("mail");
        //   var password = document.getElementById("password").value;
      
      
      axios.post(`${USER_DATA_URL}`,{email: email})
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
          document.getElementById('message').innerHTML = localStorage.getItem("message");
          console.log(res.data);
          console.log("--------");
          console.log(res.data.dataofuser.numero_du_Permis);


          document.getElementById('nom').innerHTML = res.data.dataofuser.name;
          document.getElementById('prenom').innerHTML = res.data.dataofuser.prenom;
          document.getElementById('email').innerHTML = res.data.dataofuser.email;
          document.getElementById('tel').innerHTML = res.data.dataofuser.tel;
          document.getElementById('adresse').innerHTML = res.data.dataofuser.adresse;

          document.getElementById('numPermis').innerHTML = res.data.dataofuser.numero_du_Permis;
          numpermisUser =  res.data.dataofuser.numero_du_Permis;
          document.getElementById('notPermis').innerHTML = res.data.dataofuser.nombre_de_Point;
          getInfraction();

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

//METHODE 2

const GET_INFRACTION_URL = `http://localhost:8000/api/infraction/infractionByMail/${localStorage.getItem("mail")}`;
// const GET_INFRACTION_URL = `${process.env.PORT.CLIENT_URL}/api/infraction/infractionByMail/${localStorage.getItem("mail")}`;


const getInfraction = async () => {
    try {
      console.log("test2");
      const res = await axios.get(`${GET_INFRACTION_URL}`)
      .then(res => {
        console.log(res);
        if(res.data.status){
            console.log(res.data.status);

            //_____

            const infractions = res.data.infraction;
  
            console.log("infractions : "+infractions);
        
            for(var i = 0; i < infractions.length; i++) {
                if(infractions[i]._id !=''){
                    // <td>${users[i].email}</td>
                    // <td>${users[i].tel}</td>
                    // <td>${users[i].adresse}</td>
                document.getElementById('table_user_infraction').innerHTML += `
                                                                    <div class="card mb-4">
                                                                        <div class="card-header">
                                                                            <span>infraction : ${i + 1}</span>
                                                                        </div>
                                                                        <div class="card-body">
                                                                            <h5 class="card-title">Type Dinfraction : ${infractions[i].typeInfraction}</h5>
                                                                            <h5 class="card-title">nombre de Points Deduits I'nfraction : ${infractions[i].nombrePointsDeduitsInfraction}</h5>
                                                                            <p class="card-text"><strong>Message : </strong>  ${infractions[i].messageInfraction}</p>
                                                                            
                                                                        </div>
                                                                        <div class="card-footer">
                                                                            <span>infraction ID : ${infractions[i]._id}</span><br>
                                                                            <span>Date : ${infractions[i].createdAt}</span>
                                                                        </div>
                                                                    </div>




                `;
                };
            }
            return infractions;

            //_____

        }else{
            document.getElementById('table_user_infraction').innerHTML += `
                                                                    <div class="card mb-4">
                                                                        <div class="card-header">
                                                                            
                                                                        </div>
                                                                        <div class="card-body">
                                                                            <center><h1>No infraction</h1></center>
                                                                        </div>
                                                                        <div class="card-footer">
                                                                            
                                                                        </div>
                                                                    </div>`;
        }
        })
    } catch (e) {
      console.error(e);
    }
};




