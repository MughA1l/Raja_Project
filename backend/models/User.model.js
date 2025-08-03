import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [3, "Password must be of 4 length"]
    },
    profileImage: {
        type: String,
        default: null
    },
    refreshTokens: [{
        token: String,
        expiresAt: Date,
        createdAt: { type: Date, default: Date.now }
    }]
},
    {
        timestamps: true
    }
);

userSchema.method('addRefreshToken', async function (token) {
    console.log('addRefreshToken called on:', this.constructor.name);
    this.refreshTokens.push({
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    return this.save();
});

userSchema.method('removeRefreshToken', async function (token) {
    console.log('removeRefreshToken called on:', this.constructor.name);
    this.refreshTokens = this.refreshTokens.filter(t => t.token !== token);
    return this.save();
});

const User = mongoose.model("User", userSchema);

export default User;