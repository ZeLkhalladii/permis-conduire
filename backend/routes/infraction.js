const express = require("express");
const router = express.Router();

//import controller
const{addInfraction, infractionById, infractionByMail} = require("../controllers/infraction");

router.post("/add",addInfraction);
router.get("/infractionById/:numPermis",infractionById);
router.get("/infractionByMail/:emailUser",infractionByMail);


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