const mongoose = require('mongoose');

//const url = "mongodb+srv://admin:admin@cluster0.iutbg.mongodb.net/Permis?retryWrites=true&w=majority";

//connect to database
// mongoose.connect(url, {
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("connected"))
.catch(err => console.log("DB connection error: ",err));
