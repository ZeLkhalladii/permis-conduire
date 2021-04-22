const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
var bcrypt = require("bcryptjs");

//for validation mail
// const mailgun = require("mailgun-js");
// const DOMAIN = 'sandboxc144e215dbfa4ff982a412b050222a9b.mailgun.org';
// const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});


//Ceate user wihtout email account activation
// exports.signup = (req, res) => {
//     console.log(req.body);
//     const {name, email, password} = req.body;
//     User.findOne({email}).exec((err, user) => {
//         if(user){
//             return res.status(400).json({error: "User with this email already exists."});
//         }
//         let newUser = new User({name, email, password});
//         newUser.save((err, success) => {
//             if(err) {
//                 console.log("Error in signup: ", err);
//                 return res.status(400), json({error: err})
//             }
//             res.json({
//                 message: "Signup success!"
//             })
//         })
//     })
// }


//Ceate user wihtout email account activation
/*
exports.signup = (req, res) => {
    console.log(req.body);
    const {name, email, password} = req.body;
    User.findOne({email}).exec((err, user) => {
        if(user){
            return res.status(400).json({error: "User with this email already exists."});
        }
        const token = jwt.sign({name, email, password}, process.env.JWT_ACC_ACTIVATE, {expiresIn: '20m'});

        const data = {
            // from: 'Excited User <me@samples.mailgun.org>',
            from: 'tcharatest@gmail.com',
            // to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
            to: email,
            subject: 'Account Activation Link',
            html:`
                <h2> Pleas click on given link to activate account </h2>
                <p>${process.env.CLIENT_URL}/authentificationactivate/${token}</p>
            `
            // <p>${process.env.CLIENT_URL}/authentificationactivate/${token}</p>
        };
        mg.messages().send(data, function (error, body) {
            if(error){
                return res.json({
                    error: error.message
                    // message: error.message
                })
            }
            return res.json({message: 'Email has been sent,pleas activate your account'});
            // console.log(body);
        });
    })
}
*/

//start v2

//Ceate user wihtout email account activation
exports.signup = (req, res) => {
    //tcharatest start
    /*
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        // isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
    });
    */
    
    //tcharatest end


    console.log(req.body);
    const {name,prenom, email,tel,adresse,numero_du_Permis, password} = req.body;
    User.findOne({email}).exec((err, user) => {
        if(user){
            // return res.status(400).json({error: "User with this email already exists."});
            return res.json({error: "User with this email already exists."});
        }
        const token = jwt.sign({name,prenom, email,tel,adresse,numero_du_Permis, password}, process.env.JWT_ACC_ACTIVATE, {expiresIn: '20m'});
        //sendmail start

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'taouftest@gmail.com',
              pass: 'Admin@12A34'
            },
            //Adding parameter for send mail
            tls: {
              rejectUnauthorized: false
            }
        });
          
        var mailOptions = {
            from: 'tmail1058@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js For activate Your account',
            text: 'test num 10!',
            html: `
                <h2> Pleas click on given link to activate account </h2>
                <p>${process.env.CLIENT_URL}/authentificationactivate/${token}</p>
            ` 
            
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return res.json({
                    error: error.message
                    // message: error.message
                })
            } else {
              console.log('Email sent: ' + info.response);
              return res.json({message: 'Email has been sent,pleas activate your account'});
              
            }
        });

        // res.send('confimeEmail');

        //send mail end

        // const data = {
        //     // from: 'Excited User <me@samples.mailgun.org>',
        //     from: 'tcharatest@gmail.com',
        //     // to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
        //     to: email,
        //     subject: 'Account Activation Link',
        //     html:`
        //         <h2> Pleas click on given link to activate account </h2>
        //         <p>${process.env.CLIENT_URL}/authentificationactivate/${token}</p>
        //     `
        //     // <p>${process.env.CLIENT_URL}/authentificationactivate/${token}</p>
        // };
        // mg.messages().send(data, function (error, body) {
        //     if(error){
        //         return res.json({
        //             error: error.message
        //             // message: error.message
        //         })
        //     }
        //     return res.json({message: 'Email has been sent,pleas activate your account'});
        //     // console.log(body);
        // });
    })
}

//v2 mail
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
//v2 mail

//end v2




exports.activateAccount = (req, res) => {
    const {token} = req.body;
    if(token){
        jwt.verify(token, process.env.JWT_ACC_ACTIVATE, function(err, decodedToken){
            if(err){
                return res.status(400).json({error: 'Incorrect or Expired Link.'})
            }
            const {name,prenom, email,tel,adresse,numero_du_Permis, password} = decodedToken;
            User.findOne({email}).exec((err, user) => {
                if(user){
                    // return res.status(400).json({error: "User with this email already exists."});
                    return res.json({error: "User with this email already exists."});
                }
                const nombre_de_Point = 30;
                const rol = 'user';
                let newUser = new User({name,prenom, email,tel,adresse,numero_du_Permis,nombre_de_Point,rol, password});
                newUser.save((err, success) => {
                    if(err) {
                        console.log("Error in signup while account activation: ", err);
                        return res.status(400), json({error: 'Error activation account'})
                    }
                    res.json({
                        message: "Signup success!"
                    })
                })
            })

        })
    }else{
        return res.json({error: "Something went wrong!!!"})
    }
}




//login
exports.login = (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    User.findOne({email}).exec((err, user) => {
        if(!user){
            // return res.status(400).json({error: "User with this email already exists."});
            return res.json({error: "User with this email not exists."});
        }else{
            if(user.password === req.body.password){
                console.log('login Succes');
                if(user.rol === 'admin'){
                    return res.json({ status: 'ok', rol: 'admin', message: 'Welcoom admin'}); 
                }else{
                    return res.json({ status: 'ok', rol: 'user', message: 'Welcoom user'});
                }
            }else{
                console.log('login not Succes');
                return res.json({error: 'Password not correct'});
            }
        }
    })
}


exports.datauser = (req, res) => {
    console.log(req.body);
    // const {email, password} = req.body;
    const {email} = req.body;
    User.findOne({email}).exec((err, user) => {
        if(!user){
            // return res.status(400).json({error: "User with this email already exists."});
            return res.json({error: "User with this email not exists."});
        }else{
           
            
            if(user.rol === 'admin'){
                return res.json({ status: 'ok', rol: 'admin', message: 'get data succes admin', dataofadmin: user}); 
            }else{
                return res.json({ status: 'ok', rol: 'user', message: 'get data succes user', dataofuser: user });
            }
            
        }
    })
}

exports.getallusers = (req,res) => {
    User.find()
        .sort("-createdAt")
        .exec((err,users) =>{
        if(err || !users){
            return res.json({error : "No data"})
        }
        res.json({users});
    });
};

// exports.getoneuser = (req,res) => {
//     console.log(req.params.numero_du_Permis)
    
//     User.find({'numero_du_Permis':req.params.numero_du_Permis })
//     .then(user =>{
//         res.json({user});
//     }).catch(err => console.log(err));
// }

exports.getoneuser = (req,res) => {
    console.log(req.params.numero_du_Permis)
    
    User.find({'numero_du_Permis':req.params.numero_du_Permis }).exec((err, user) => {
        if(user.length==0){
            // return res.status(400).json({error: "User with this email already exists."});
            return res.json({error: "User with this Numero de permis not exists."});
        }else{
            return res.json({ user,status: 'ok'}); 
        }
    })
}


exports.infractionUser = (req,res) => {
    // console.log(req.params.numero_du_Permis)
    
    User.find({'numero_du_Permis':req.params.numero_du_Permis }).exec((err, user) => {
        if(user.length==0){
            // return res.status(400).json({error: "User with this email already exists."});
            return res.json({error: "User with this Numero de permis not exists."});
        }else{
            return res.json({ user,status: 'ok'}); 
        }
    })
}



exports.infractionUser = (req,res) => {
    User.findById(req.params.id)
    .then(user =>{
        const { nombre_de_Point } = req.body;
        user.nombre_de_Point = (user.nombre_de_Point) - (nombre_de_Point);
        user.save().then(() => console.log('user modifié'));
        return res.json({message : "updated"})
    }).catch(err => res.json({ error : err }));
};