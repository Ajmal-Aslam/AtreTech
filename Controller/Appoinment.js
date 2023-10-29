const Appoinments = require("../Repository/Appoinment");

const jwt = require('jsonwebtoken');
const secKey = "AWESOME";


exports.CreateAPI = async (req, res) => {
    let verfiTokens = async (req, res, next) => {
        try {
            let getToken = req.headers['authorization'];
            let revisedToken = getToken.split(' ')[1];
            let verified = jwt.verify(revisedToken, secKey);
            req.users = verified;
            next();
        } catch {
            res.status(401).send("Token invalid");
        }
    }

    try {
        await verfiTokens(req, res, async () => {
            req.body.User_Id = req.users[0]._id;
            await Booking.create(req.body);
            console.log("eror display")
            res.status(200).send("Created successfully");
        });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

//display the sucess message
exports.CreateAPI = async (req, res) => {
    try {
        await Appoinments.create(req.body);
        res.status(200).send("created sucessfulley")
    } catch (error) {
        throw error
    }
}
//particular user by repository
exports.OneUser = async (req, res) => {
    try {
        const getuser = await Appoinments.getone(req.params.id);
        if (getuser) {
            res.status(200).json(getuser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
//get the all Appoinments by repository:
exports.AllAppoinment = async (req, res) => {
    try {
        let lists = await Appoinments.getall();
        console.log(lists);
        return res.status(200).send(lists);
    } catch (error) {
        throw error
    }
}
//Delete the bookings flow by repository:
exports.Deleted = async (req, res) => {
    const DeleteAppoinment = await Appoinments.deleting(req.params.id);
    console.log(DeleteAppoinment);
    res.status(200).send("sucessfulley deleted");
}

//same as updating the bookings flow by repository:
exports.Updated = async (req, res) => {
    let id = req.params.id;
    const UpdateUser = await Appoinments.Updating({ _id: id }, req.body);
    console.log(UpdateUser);
    res.status(200).send(UpdateUser);
}
