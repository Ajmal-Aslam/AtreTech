const Timeslots = require("../Schemas/Timeslot");

//creating the :
exports.create = async (data) => {
    try {
        const CreateSlot = new Timeslots(data);
        await CreateSlot.save();
    } catch (error) {
        throw error
    }
};

//get all the Appoinment list:
exports.getall = async () => {
    try {
        return await Timeslots.find({}).populate('appointment');
    } catch (error) {
        throw error
    }
};

//particular Appoinments:
exports.getone = async (id) => {
    try {
        return await Timeslots.findById(id);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
//find the Appoinment by id and delete them
exports.deleting = async (id) => {
    try {
        return await Timeslots.deleteOne({ _id: id });
    } catch (error) {
        throw error
    }
}
//find the Appoinment by id and update them
exports.Updating = async (id, data) => {
    try {
        //Find the slot by id
        const timeSlot = await Timeslots.findByIdAndUpdate(id, { $set: { ...data, bookedStatus: 'NotAvailable' } }, { new: true });
        //const timeSlot = await Timeslots.findByIdAndUpdate(id, { $set: data }, { new: true });
        return timeSlot;

    } catch (error) {
        throw error;
    }
};

