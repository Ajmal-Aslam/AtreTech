const Appoinments = require("../Schemas/Appoinment");

//creating the :
exports.create = async (data) => {
    try {
        const CreateAppoinment = new Appoinments(data);
        await CreateAppoinment.save();
    } catch (error) {
        throw error
    }
};

//get all the Appoinment list:
exports.getall = async () => {
    try {
        return await Appoinments.find({}).populate('user');
    } catch (error) {
        throw error
    }
};

//particular Appoinments:
exports.getone = async (id) => {
    try {
        return await Appoinments.findById(id);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
//find the Appoinment by id and delete them
exports.deleting = async (id) => {
    try {
        return await Appoinments.deleteOne({ _id: id });
    } catch (error) {
        throw error
    }
}
//find the Appoinment by id and update them
exports.Updating = async (id, data) => {
    try {
        const UpdatedUsers = await Appoinments.updateOne({ _id: id }, { $set: data });
        return UpdatedUsers;

    } catch (error) {
        throw error
    }
}
