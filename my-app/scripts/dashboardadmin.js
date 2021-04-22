// require('dotenv').config();
if(localStorage.getItem("rol") !== 'admin'){
    window.location.href = "index.html";
}

function logout(){
    localStorage.removeItem('rol');
}

const USER_ALL_DATA_URL = 'http://localhost:8000/api/alluser';
// const USER_ALL_DATA_URL = `${process.env.PORT.CLIENT_URL}/api/alluser`;

//all
const getUser = async () => {
    try {
      console.log("test2");
      const res = await axios.get(`${USER_ALL_DATA_URL}`);
  
      const users = res.data.users;
  
      console.log("userss : "+users);
  
      for(var i = 0; i < users.length; i++) {
        if(users[i].name !=''){
            if(users[i].rol !='admin'){
                // <td>${users[i].email}</td>
                // <td>${users[i].tel}</td>
                // <td>${users[i].adresse}</td>
                document.getElementById('table_user').innerHTML += `
                <tr>
                    <th scope="row">${i}</th>
                    <td>${users[i]._id}</td>
                    <td>${users[i].name}</td>
                    <td>${users[i].prenom}</td>
                    
                    <td>${users[i].numero_du_Permis}</td>
                    <td>${users[i].nombre_de_Point}</td>
                    <td>
                        <a href='userfind.html?numero_du_Permis=${users[i].numero_du_Permis}' class="btn btn-outline-warning">Info</a>
                    </td>
                </tr>
                `;
            }
        };
      }
      return users;
    } catch (e) {
      console.error(e);
    }
};

getUser();


function rechercheuser(){
    numero_du_Permis = document.getElementById('numero_du_Permis_recherch').value;

    window.location.href = `userfind.html?numero_du_Permis=${numero_du_Permis}`;
    // console.log(numero_du_Permis)

}