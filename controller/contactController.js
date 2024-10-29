const contactModel = require("../model/Contact");

// get all contact
exports.getContact = async (req, res) => {
  const contact = await contactModel.find();
  try {
    res.status(200).json({
      statusCode: 200,
      data: contact,
    });
  } catch (error) {
    console.error("Failed to fetch the data!", error);
    res.status(404).json({
      statusCode: 404,
      message: error,
    });
  }
};

// get contact by id
exports.showContactbyId = async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  try {
    res.status(200).json({
      statusCode: 200,
      data: contact,
    });
  } catch (error) {
    console.error(`Contact with id ${req.params.id} not found!`, error);
    res.status(404).json({
      statusCode: 404,
      message: error,
    });
  }
};

// add new contact
exports.addContact = async (req, res) => {
  try {
    const contact = new contactModel({
      nama: req.body.nama,
      alamat: req.body.alamat,
      email: req.body.email,
      notelp: req.body.notelp,
    });

    await contact.save();

    res.status(200).json({
      statusCode: 200,
      message: "New contact successfuly added!",
    });
  } catch (error) {
    console.error("Failed to add new data!", error);
    res.status(404).json({
      statusCode: 404,
      message: error,
    });
  }
};

// update contact
exports.updateContact = async (req, res) => {
  try {
    const contact = await contactModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          nama: req.body.nama,
          alamat: req.body.alamat,
          email: req.body.email,
          notelp: req.body.notelp,
        },
      }
    );

    if (!contact) {
      res.status(400).json({
        statusCode: 400,
        message: "Contact is not found!",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Contact successfully updated!",
      contact,
    });
  } catch (error) {
    console.error("Failed to update the contact!", error);
    res.status(404).json({
      statusCode: 404,
      message: error,
    });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const deleteContact = await contactModel.deleteOne({ _id: req.params.id });

    if (!deleteContact) {
      res.status(400).json({
        statusCode: 400,
        message: `Contact with id ${req.params.id} not found!`,
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Contact successfully deleted!",
      deleteContact,
    });
  } catch (error) {
    console.error("Failed to delete the data!", error);
    res.status(404).json({
      statusCode: 404,
      message: error,
    });
  }
};
