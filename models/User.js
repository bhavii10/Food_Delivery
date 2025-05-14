// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, default: "user" },
//     cart: [
//         {
//             id: String,
//             name: String,
//             price: Number,
//             quantity: { type: Number, default: 1 }
//         }
//     ],
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    cart: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },  // Reference to Item model
            quantity: { type: Number, default: 1 },
            price: { type: Number },
        },
    ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
