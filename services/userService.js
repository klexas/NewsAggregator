require("dotenv").config();

const User = require('../models/userSchema');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { log } = require("mercedlogger");


const { SECRET = "" } = process.env;

const register = async (req, callback) => {
    try {
        const { username, email, password } = req;
        const pw = await bcrypt.hash(password, 12);
        console.log(pw);
        console.log(pw2);
        const user = await User.create({ username: username, email: email, password: pw });
        const token = createJWT(user);
        log.magenta("REGISTER", 'User Created Successfully' + username);
        callback(null, { token });
    } catch (error) {
        log.red("REGISTER", 'Could not register' + error);
        callback({ error: error.message }, null);
    }
}

const login = async (req, callback) => {
    try {
        const { email, password } = req;
        const user = await User.findOne({ email });
        if (await bcrypt.compare(password, user.password)) {
            const token = createJWT(user);
            callback(null, { token });
        } else {
            callback({error: "Invalid Credentials"});
        }
    } catch (error) {
        callback({ error: error.message }, null);
    }
}

const createJWT = (user) => {
    return jwt.sign(
        { user },
        SECRET,
        { expiresIn: "24h" }
    );
}

module.exports = {
    register,
    login,
}
