const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
require('dotenv').config(); //to use env variables
require("./db/connectDB");

const axios = require("axios");

const bodyParser = require('body-parser');
const exphbs = require("express-handlebars");

//set temlate engine
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//add body parser middleware
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());



//import routes
const authRoutes = require("./routes/auth");
const infractionRoutes = require("./routes/infraction");

app.use(express.json());
// app.use(cros())

// middlewares
app.use('/api', authRoutes);
app.use('/api/infraction', infractionRoutes);


app.get('/',(req, res) => res.send('hello world'));


app.get('/authentificationactivate/:token', async (req,res) => {
    token = req.params.token;
    // token = req.body;
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieiIsImVtYWlsIjoidGFvdWZ0ZXN0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoieiIsImlhdCI6MTYxODgwMzE2MCwiZXhwIjoxNjE4ODA0MzYwfQ.VJzNVbrLLw1krdH3piI9eKjRmsFa-6RXjCu7EhUhXPo";
    console.log(token);
    // const queryString = location.search;
    // const urlParams = new URLSearchParams(queryString);

    // const token = urlParams.get('token')
    try {
        const response = await axios.post(
            `http://localhost:8000/api/email-activate/`,{token : token}
        );
        res.render("activation");
    }
    catch (error) {
        console.log(error)
    }
});



// app.get('/sendmail', (req, res)=> {
    
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'taouftest@gmail.com',
//           pass: 'Admin@12A34'
//         },
//         //Adding parameter for send mail
//         tls: {
//           rejectUnauthorized: false
//         }
//     });
      
//     var mailOptions = {
//         from: 'tmail1058@gmail.com',
//         to: 'taouftest@gmail.com',
//         subject: 'Sending Email using Node.js',
//         text: 'test num 10!',
//         html: `<h1>Hello world</h1>` 
        
//     };
      
//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
          
//         }
//     });
    
//     res.send('confimeEmail');
    
// });



// app.listen(3000, () => {
//     console.log('My REST API RUNNING on mort 3000!');
// })

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Servervis running on port: ${port}`);
});


{/* <br><br><center><a href="/confirmer/<%= id_user %>/<%= volid.id %>/<%= nombre_places_selected %>/<%= idReservation %>" class="btn btn-outline-danger" style="background:#f96b13;border:1px solid #f96b13;text-decoration:none;padding:20px 30px;color:#ffffff;border-radius:4px;display:inline-block;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:20px">confirmer</a></center> */}