const mongoose = require('mongoose');
const crypto = require('crypto');

//user scema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 64
    },
    prenom: {
        type: String,
        trim: true,
        required: true,
        max: 64
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    tel: {
        type: String,
        trim: true,
        required: true,
        // max: 64
    },
    adresse: {
        type: String,
        trim: true,
        required: true,
        max: 64
    },
    numero_du_Permis: {
        type: String,
        required: true,
        unique: true,
        max: 64,
    },
    nombre_de_Point: {
        type: Number,
        trim: true,
        required: true,
        max: 64,
    },
    rol: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
},{timestamps: true})

module.exports = mongoose.model('User', userSchema);