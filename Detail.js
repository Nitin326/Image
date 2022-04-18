const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://image:image@cluster0.xif31.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(() => console.log("database Connnected"));

const DetailSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Detail = mongoose.model('Detail', DetailSchema);

module.exports = Detail;


