const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
    try {
        console.log("login event attempt");
        const { mail, password } = req.body;

        const user = await User.findOne({ mail: mail.toLowerCase() });

        if (user && (await bcrypt.compare(password, user.password))) {
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

            return res.status(200).json({
                userDetails: {
                    mail: user.mail,
                    token: token,
                    username: user.username,
                    _id: user._id,
                },
            });
        }

        return res.status(400).send("Podane dane są niepoprawne. Spróbuj ponownie.");
    } catch (err) {
        return res.status(500).send("Wystąpił nieoczekiwany błąd. Spróbuj ponownie później..");
    }
};

module.exports = postLogin;