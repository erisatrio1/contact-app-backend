import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    noPhone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
});

const Contact = mongoose.model('Contact', contactSchema);


export default Contact;