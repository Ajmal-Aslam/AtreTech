const UserSession = require("../Schemas/User");

const CryptoJS = require("crypto-js");
const secKey = "Awesome";

//creating the users data:

exports.create = async (data) => {
    try {
        const users = new UserSession(data);
        await users.save();
    } catch (error) {
        throw error
    }
};

/*exports.getOneByIdOrUsername = async (idOrUsername) => {
    try {
        return await UserSession.findOne({
            // we can search id or user
            $or: [//this is operator specify array conditions
                { _id: idOrUsername },
                { username: idOrUsername },
            ]
        });
    } catch (error) {
        throw error;
    }
};*/
//particular by id
exports.getone = async (id) => {
    try {
        return await UserSession.findById(id);
    } catch (error) {
        console.error(error);
        throw error;
    }
}


//get  user :
exports.getUserByname = async (username) => {
    try {
        return await UserSession.find({ username });
    } catch (error) {
        throw error;
    }
};
//get all the users list:

exports.getall = async () => {
    try {
        return await UserSession.find({});
    } catch (error) {
        throw error
    }
};

//if you want to reset the password:
exports.resetPassword = async (id, password) => {
    try {
        const encryptData = CryptoJS.AES.encrypt(password, secKey).toString();
        const data = { password: encryptData };
        return await UserSession.updateOne({ _id: id }, data);
    } catch (error) {
        throw error;
    }
};

//find the user by id and delete them
exports.deleting = async (id) => {
    try {
        return await UserSession.deleteOne({ _id: id });
    } catch (error) {
        throw error
    }
}
//find the user by id and update them
exports.Updating = async (id, data) => {
    try {
        const UpdatedUsers = await UserSession.updateOne({ _id: id }, { $set: data });
        return UpdatedUsers;

    } catch (error) {
        throw error
    }
}



