const UserSession = require("../Repository/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

const secKey = "AWESOME";

//create or signin for customer

exports.createUser = async (req, res) => {
    try {
        const { password } = req.body;
        const encryptData = CryptoJS.AES.encrypt(password, secKey).toString();
        req.body.password = encryptData;
        await UserSession.create(req.body);
        res.status(200).send("created Successfully");
        console.log(req.body);
    } catch (error) {
        throw error;
    }
};


//get the user by some datas or propereties
exports.AllUser = async (req, res) => {
    try {
        let users = await UserSession.getall();
        console.log(users);
        return res.status(200).send(users);
    } catch (error) {
        throw error
    }
}

//get the particular user by id:


exports.OneUser = async (req, res) => {
    try {
        const getuser = await UserSession.getone(req.params.id);
        if (getuser) {
            res.status(200).json(getuser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

//login again and creating a tokens to generate the data:

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const loginUsers = await UserSession.getUserByname(username);
        if (loginUsers.length === 0) {
            return res.status(401).send("User not Found");
        }
        const bytes = CryptoJS.AES.decrypt(loginUsers[0].password, secKey);
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (decryptedPassword === password) {
            req.result = loginUsers;
            next();
        } else {
            return res.status(401).send("Login Failure");
        }
    } catch (error) {
        throw error;
    }
};

exports.generateToken = async (req, res) => {
    try {
        const token = jwt.sign(JSON.stringify(req.result), secKey);
        const outPut = {
            status: 200,
            result: {
                UserDetails: req.result,
                token: token,
            },
            message: "Login Successfully",
        };
        res.status(200).send(outPut);
    } catch (error) {
        throw error;
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        await UserSession.resetPassword(id, password);
        res.status(200).send("Your password has been reset");
    } catch (error) {
        throw error;
    }
};



//delete the customers
exports.Deleted = async (req, res) => {
    const DeleteUser = await UserSession.deleting(req.params.id);
    res.status(200).send("sucessfulley deleted");
}

//updating the customers bio:
exports.Updated = async (req, res) => {
    let id = req.params.id;
    const UpdateUser = await UserSession.Updating({ _id: id }, req.body);
    console.log(UpdateUser);
    res.status(200).send(UpdateUser);
}

