const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const postController = require("../controllers/postController");

router.get("/", protect, postController.home);

router.get("/create", protect, postController.createPostPage);
router.post("/create", protect, upload.single("image"), postController.createPost);

router.get("/edit/:id", protect, postController.editPostPage);
router.post("/edit/:id", protect, upload.single("image"), postController.updatePost);

router.get("/delete/:id", protect, postController.deletePost);


router.get("/like/:id", protect, postController.toggleLike);

module.exports = router;