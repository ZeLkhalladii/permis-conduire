const mongoose = require('mongoose');
const crypto = require('crypto');

//user scema
const infractionSchema = new mongoose.Schema({
    idUser: {
        type: String,
        trim: true,
        required: true
    },
    numPermisUser: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    typeInfraction: {
        type: String,
        trim: true,
        required: true,
        max: 64
    },
    nombrePointsDeduitsInfraction: {
        type: Number,
        trim: true,
        required: true,
        max: 64
    },
    messageInfraction: {
        type: String,
        trim: true,
        required: true,
        // max: 64
    }
},{timestamps: true})

module.exports = mongoose.model('Infraction', infractionSchema);