const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Token = require("./../schema/token");
const getUserInfo = require("./../lib/getUserInfo");
const {generateAccessToken, refreshAccessToken} = require("./../auth/generateTokens")

const UserSchema = new Mongoose.Schema({
    id: { type: Object },
    name: { type: String, required: true },
    user: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
    if (this.isModified("password") || this.isNew) {
        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) {
                next(err);
            } else {
                this.password = hash;
                next();
            }
        });
    } else {
        next();
    }
});

UserSchema.methods.userExist = async function (user) {
    const result = await Mongoose.model("User").find({ user });
    return result.length > 0;
};

UserSchema.methods.comparePassword = async function (password, hash) {
    const same = await bcrypt.compare(password, hash);
    return same;
};

UserSchema.methods.createAccessToken = async function () {
    return generateAccessToken(getUserInfo(this));
};

UserSchema.methods.refreshAccessToken = async function () {
    const refreshToken = generateAccessToken(getUserInfo(this));

    try {
        await new Token({ token: refreshToken });

        return refreshToken;
    } catch (error) {
        console.log(error);
    }
};

module.exports = Mongoose.model("User", UserSchema);
