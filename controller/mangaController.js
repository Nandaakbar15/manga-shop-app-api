const MangaModel = require("../model/Manga");

// get all data manga
exports.getAllManga = async (req, res) => {
  const manga = await MangaModel.find();
  try {
    res.status(200).json({
      statusCode: 200,
      data: manga,
    });
  } catch (error) {
    console.error("Failed to fetch the data!", error);
    res.status(400).json({ message: error.message });
  }
};

// get manga by id
exports.showMangabyId = async (req, res) => {
  const manga = await MangaModel.findById(req.params.id);
  try {
    res.status(200).json({
      statusCode: 200,
      data: manga,
    });
  } catch (error) {
    console.error("Failed to fetch the data!", error);
    res.status(400).json({ message: error.message });
  }
};

// get manga based on genre
exports.showMangaBygenre = async (req, res) => {
  const manga = await MangaModel.findOne({ genre: req.params.genre });
  try {
    res.status(200).json({
      statusCode: 200,
      data: manga,
    });
  } catch (error) {
    console.error("Failed to find the manga based on genre!", error);
    res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }
};

// add new manga
exports.addManga = async (req, res) => {
  try {
    // const imagePath = req.file ? `/images/${req.file.filename}` : null;

    const newManga = new MangaModel({
      judul: req.body.judul,
      genre: req.body.genre,
      author: req.body.author,
      status: req.body.status,
      gambar: req.file ? req.file.filename : "",
    });

    await newManga.save();

    res.status(200).json({
      statusCode: 200,
      message: "Data Manga successfuly added!",
    });
  } catch (error) {
    console.error("Failed to add new manga", error);
    res.status(404).json({
      statusCode: 404,
      message: error,
    });
  }
};

// update the manga
exports.updateManga = async (req, res) => {
  try {
    const updateManga = await MangaModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          judul: req.body.judul,
          genre: req.body.genre,
          author: req.body.author,
          status: req.body.status,
          gambar: req.file ? req.file.filename : "",
        },
      }
    );

    if (!updateManga) {
      res.status(400).json({
        statusCode: 400,
        message: `Manga with id ${req.params.id} is not found!`,
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Manga successfully updated!",
      updateManga,
    });
  } catch (error) {
    console.error("Failed to  update the manga!", error);
    res.status(404).json({
      statusCode: 404,
      message: error,
    });
  }
};

// delete manga
exports.deleteManga = async (req, res) => {
  try {
    const deleteManga = await MangaModel.deleteOne({ _id: req.params.id });

    if (!deleteManga) {
      res.status(400).json({
        statusCode: 400,
        message: `Manga with id ${req.params.id} is not found!`,
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Manga successfully deleted!",
      deleteManga,
    });
  } catch (error) {
    console.error("Failed to delete the data!", error);
    res.status(404).json({
      statusCode: 404,
      message: error,
    });
  }
};
