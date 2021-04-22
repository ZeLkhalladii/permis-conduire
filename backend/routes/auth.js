const express = require("express");
const router = express.Router();

//import controller
const{signup, activateAccount, login, datauser, getallusers,getoneuser,infractionUser} = require("../controllers/auth");

router.post('/signup', signup);
router.post('/email-activate', activateAccount);
router.post('/login', login);

router.post('/datauser',datauser);
router.get('/alluser',getallusers);
router.get('/oneuser/:numero_du_Permis',getoneuser);
router.put("/infractionUser/:id",infractionUser);


// router.get('/authentification/activate/:token', async (req,res) => {
//     token = req.params.token;
//     try {
//         const response = await axios.post(
//             `http://localhost:8000/api/email-activate/`,token
//         );
//         res.render("activation");
//     }
//     catch (error) {
//         console.log(error)
//     }
// });

module.exports = router;