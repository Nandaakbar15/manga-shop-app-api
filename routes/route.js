const express = require("express");
const router = express.Router();
const upload = require("../config/upload");

// manga controller
const {
  getAllManga,
  showMangabyId,
  showMangaBygenre,
  addManga,
  updateManga,
  deleteManga,
} = require("../controller/mangaController");

// contact controller
const {
  getContact,
  showContactbyId,
  addContact,
  updateContact,
  deleteContact,
} = require("../controller/contactController");

// route admin

// route get all data manga
router.get("/api/admin/datamanga", getAllManga);

// route show manga by id
router.get("/api/admin/datamanga/:id", showMangabyId);

router.get("/api/admin/datamanga/:genre", showMangaBygenre);

router.post("/api/admin/newManga", upload.single("gambar"), addManga);

router.put("/api/admin/updateManga/:id", upload.single("gambar"), updateManga);

router.delete("/api/admin/deleteManga/:id", deleteManga);

router.get("/api/admin/datacontact", getContact);

router.get("/api/admin/datacontact/:id", showContactbyId);

router.post("/api/admin/newContact", addContact);

router.put("/api/admin/updatecontact/:id", updateContact);

router.delete("/api/admin/deleteContact/:id", deleteContact);

module.exports = router;
