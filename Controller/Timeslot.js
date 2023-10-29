const Timeslots = require("../Repository/Timeslot");

//created a sucess message
exports.CreateSlot = async (req, res) => {
    try {
        await Timeslots.create(req.body);
        res.status(200).send("created sucessfulley")
    } catch (error) {
        throw error
    }
}

//get the slots 
exports.AllSlots = async (req, res) => {
    try {
        let Slots = await Timeslots.getall();
        console.log(Slots);
        return res.status(200).send(Slots);
    } catch (error) {
        throw error
    }
}
exports.OneSlot = async (req, res) => {
    try {
        const slots = await Timeslots.getone(req.params.id);
        if (slots) {
            res.status(200).json(slots);
        } else {
            res.status(404).json({ error: 'slots not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
//delete the slots
exports.Deleted = async (req, res) => {
    const delete_Properties = await Timeslots.deleting(req.params.id);
    res.status(200).send("sucessfulley deleted");
}

//update the availablity
exports.Updated = async (req, res) => {
    try {
        const SlotsId = req.params.id;
        const Updates = req.body;

        const UpdateSlots = await Timeslots.Updating(SlotsId, Updates);

        if (!UpdateSlots) {
            return res.status(404).send('There is no slot for this date');
        }

        res.status(200).send("This slot is now Booked");
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};
