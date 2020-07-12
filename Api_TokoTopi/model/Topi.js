const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    kodeTopi:{
        type: String
    },
    hargaTopi:{
        type: String
    },
    stok:{
        type: String
    },
    modelTopi:{
        type: String
    },
    gambar:{
        type: String
    }

});

module.exports = mongoose.model('topi',userSchema)
