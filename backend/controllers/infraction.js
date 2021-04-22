const Infraction = require('../models/infraction');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
var bcrypt = require("bcryptjs");



exports.addInfraction = (req,res) => {
    const { idUser ,numPermisUser ,email , typeInfraction ,nombrePointsDeduitsInfraction ,messageInfraction } = req.body;
    const newdInfraction = new Infraction({ idUser ,numPermisUser, email ,typeInfraction ,nombrePointsDeduitsInfraction ,messageInfraction });
    // newdInfraction.save()
    //     .then(() => res.json(newdInfraction))
    //     .catch(err => res.json({ error : err }));
    // ;

    newdInfraction.save((err, success) => {
        if(err) {
            console.log("Som error: ", err);
            return res.status(400), json({error: 'Error activation account'})
        }
        

        //start send mail
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
            subject: 'Sending Email using Node.js',
            text: 'test num 10!',
            html: `
                <h2> Rak dayer infraction </h2>
                <h2> Type Dinfraction : ${typeInfraction} </h2>
                <h2> nombre de Points Deduits Infraction : ${nombrePointsDeduitsInfraction} </h2>
                <p>${messageInfraction}</p>
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
              return res.json({message: 'Infraction add avec succes ! AND Email has been sent,pleas activate your account'});
              
            }
        });
        User.findById(idUser)
        .then(user =>{
            const { nombrePointsDeduitsInfraction } = req.body;
            user.nombre_de_Point = (user.nombre_de_Point) - (nombrePointsDeduitsInfraction);
            user.save().then(() => console.log('user modifié'));
            return res.json({message : "updated"})
        }).catch(err => res.json({ error : err }));



        //end send mail


        // res.json({
        //     message: "Infraction add avec succes !"
        // })
    })
}



exports.infractionById = (req,res) => {
    // Infraction.findById(req.params.id)
    // .then(infraction =>{
        
    //     res.json({infraction});
    // }).catch(err => console.log(err));

    Infraction.find({'numPermisUser':req.params.numPermis }).exec((err, infraction) => {
        if(infraction.length==0){
            // return res.status(400).json({error: "User with this email already exists."});
            return res.json({error: "no infraction."});
        }else{
            return res.json({ infraction,status: 'ok'}); 
        }
    })
}




exports.infractionByMail = (req,res) => {
    // Infraction.findById(req.params.id)
    // .then(infraction =>{
        
    //     res.json({infraction});
    // }).catch(err => console.log(err));

    Infraction.find({'email':req.params.emailUser }).exec((err, infraction) => {
        if(infraction.length==0){
            // return res.status(400).json({error: "User with this email already exists."});
            return res.json({error: "no infraction."});
        }else{
            return res.json({ infraction,status: 'ok'}); 
        }
    })
}
