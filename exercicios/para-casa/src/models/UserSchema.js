const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('user', userSchema)