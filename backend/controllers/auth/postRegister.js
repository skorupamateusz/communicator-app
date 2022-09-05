const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
    try {
        const { username, mail, password } = req.body;

        console.log("register event attempt");

        const userExists = await User.exists({ mail: mail.toLowerCase() });

        console.log(userExists);

        if (userExists) {
            return res.status(409).send("Podany adres e-mail jest już w użyciu.");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            mail: mail.toLowerCase(),
            password: encryptedPassword,
        });

        // create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                mail,
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "24h",
            }
        );

        res.status(201).json({
            userDetails: {
                mail: user.mail,
                token: token,
                username: user.username,
                _id: user._id,
            },
        });
    } catch (err) {
        return res.status(500).send("Coś poszło nie tak. Spróbuj ponownie później..");
    }
};

module.exports = postRegister;