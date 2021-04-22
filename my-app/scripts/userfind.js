// require('dotenv').config();

if(localStorage.getItem("rol") !== 'admin'){
    window.location.href = "index.html";
}

function logout(){
    localStorage.removeItem('rol');
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var idOfUser = "";
var numPermisUserOfUser = "";
var emailOfUser = "";

const numero_du_Permis = urlParams.get('numero_du_Permis')
console.log("numero_du_Permis : ",numero_du_Permis);
if(numero_du_Permis == null){
    window.location.href = `userfind.html?numero_du_Permis=${localStorage.getItem('numpermis')}`
}

const USER_ONE_DATA_URL = `http://localhost:8000/api/oneuser/${numero_du_Permis}`;
// const USER_ONE_DATA_URL = `${process.env.PORT.CLIENT_URL}/api/oneuser/${numero_du_Permis}`;

console.log(USER_ONE_DATA_URL);

//methode2
const getUser = async () => {
    try {
        await axios.get(`${USER_ONE_DATA_URL}`)
        .then(res => {
            console.log(res);
            if(res.data.status){
                console.log(res.data.status);


                const User = res.data.user[0];

                console.log('___________________________________');
                console.log(User);
        
                var name="";
                var prenom= "";
                var email= "";
                var tel= "";
                var adresse= "";
                var numero_du_Permis= "";
                var nombre_de_Point= "";
        
                id = User._id ;
                name = User.name ;
                prenom = User.prenom ;
                email = User.email ;
                tel = User.tel ;
                adresse = User.adresse ;
                numero_du_Permis = User.numero_du_Permis ;
                nombre_de_Point = User.nombre_de_Point ;

                idOfUser =  User._id ;
                numPermisUserOfUser = User.numero_du_Permis ;
                emailOfUser = User.email ;
        
                console.log("id : "+id); 
                console.log("name : "+name);
                console.log("prenom : "+prenom);
                console.log("email : "+email);
                console.log("tel : "+tel);
                console.log("adresse : "+adresse);
                console.log("numero_du_Permis : "+numero_du_Permis);
                console.log("nombre_de_Point : "+nombre_de_Point);

            
        
                // document.getElementById('table_user').innerHTML = `
                //                                                     <tr>
                //                                                         <th scope="row">${id}</th>
                //                                                         <td>${name}</td>
                //                                                         <td>${prenom}</td>
                //                                                         <td>${email}</td>
                //                                                         <td>${tel}</td>
                //                                                         <td>${adresse}</td>
                //                                                         <td>${numero_du_Permis}</td>
                //                                                         <td>${nombre_de_Point}</td>
                //                                                     </tr>                                                        
                // `;
                // document.getElementById('content_btn_manage').innerHTML = `<a class="btn btn-outline-warning" href="updateuser.html?id=${id}">update</a>`;
                document.getElementById('id_user').innerHTML = `${id}`;
                document.getElementById('name_user').innerHTML = `${name}`;
                document.getElementById('prenom_user').innerHTML = `${prenom}`;
                document.getElementById('email_user').innerHTML = `${email}`;
                document.getElementById('tel_user').innerHTML = `${tel}`;
                document.getElementById('adresse_user').innerHTML = `${adresse}`;
                document.getElementById('numero_du_Permis_user').innerHTML = `${numero_du_Permis}`;
                document.getElementById('nombre_de_Point_user').innerHTML = `${nombre_de_Point}`;

                return User;
            }else{
                console.log(res.data.error);
                localStorage.setItem("message", `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>${res.data.error}!</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `);
                document.getElementById('message').innerHTML = localStorage.getItem("message");
                document.getElementById('resultatsherch').innerHTML = "<center><h1>User not found !</h1></center>";

                // window.location.href = "verifmail.html";
            }
            
        })

    } catch (e) {
        console.error(e);
    }
};

  
getUser();


function rechercheuser(){

    
    numero_du_Permiss = document.getElementById('numero_du_Permis_recherch').value;
    // alert(numero_du_Permiss)
    // const USER_ONE_DATA_URL = `http://localhost:8000/api/oneuser/${numero_du_Permiss}`;
    // getUser();
    window.location.href = `userfind.html?numero_du_Permis=${numero_du_Permiss}`;
    // console.log(numero_du_Permis)

}


//Find infraction
const GET_INFRACTION_URL = `http://localhost:8000/api/infraction/infractionById/${numero_du_Permis}`;
// const GET_INFRACTION_URL = `${process.env.PORT.CLIENT_URL}/api/infraction/infractionById/${numero_du_Permis}`;


const getInfraction = async () => {
    try {
      console.log("test2");
      const res = await axios.get(`${GET_INFRACTION_URL}`);
  
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
    } catch (e) {
      console.error(e);
    }
};

getInfraction();


//ADD Infraction

function addInfraction(){
    alert(idOfUser)
}
const INFRACTION_ADD_URL = 'http://localhost:8000/api/infraction/add';
// const INFRACTION_ADD_URL = `${process.env.PORT.CLIENT_URL}/api/infraction/add`;

const addinfraction = async () => {
    try {
      var idUser = idOfUser;
      var numPermisUser = numPermisUserOfUser;
      localStorage.setItem('numpermis',numPermisUser);
      var email = emailOfUser;
      var typeInfraction = document.getElementById("typeInfraction").value;
      var nombrePointsDeduitsInfraction = document.getElementById("nombrePointsDeduitsInfraction").value;
      var messageInfraction = document.getElementById("messageInfraction").value;
      
      axios.post(`${INFRACTION_ADD_URL}`,{idUser: idUser , numPermisUser: numPermisUser , email: email , typeInfraction: typeInfraction , nombrePointsDeduitsInfraction: nombrePointsDeduitsInfraction , messageInfraction: messageInfraction}).then(
        //   window.location.href = "index.html"
        // alert("infraction add succes")
        // window.location.href = "login.html"
        // updatePoints(),
        // window.location.href = `dashboardadmin.html`
      );
    } catch (e) {
      console.error(e);
    }
};

//Update Nombre Des Points
const UPDATE_POINTS_URL = 'http://localhost:8000/api/infractionUser/'+idOfUser;
// const UPDATE_POINTS_URL = `${process.env.PORT.CLIENT_URL}/api/infractionUser/`+idOfUser;
//UPDATE

const updatePoints = async () => {
    try {
    
    var nombre_de_Point = document.getElementById("nombrePointsDeduitsInfraction").value;

    axios.put(`${UPDATE_POINTS_URL}`,{
        nombre_de_Point: nombre_de_Point 
        }).then(
        // window.location.href = "index.html"
        alert('point - 1')
    );

    } catch (e) {
      console.error(e);
    }
};

