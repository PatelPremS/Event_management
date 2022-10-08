const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const db = "mongodb+srv://admin:admin@cluster0.e4ykm.mongodb.net/mishan-learning?retryWrites=true&w=majority";
// mongodb+srv://admin:<password>@cluster0.e4ykm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(db, err => {
    if(err) {
        console.log(err);
    } else {
        console.log('mongodb connected');
    }
})
