import mongoose from 'mongoose';


function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => {
            console.log("Connection to database established successfully");
        }).catch(err => console.log(err));
}

export default connectToDb;