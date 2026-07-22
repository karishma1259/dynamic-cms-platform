const express = require('express');
const router = express.Router();
const {
  getAllContent,
  getContentBySection,
  getContentById,
  createContent,
  updateContent,
  deleteContent
} = require('../controllers/contentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllContent);
router.get('/section/:section', getContentBySection);

router.get('/:id', protect, getContentById);
router.post('/', protect, createContent);
router.put('/:id', protect, updateContent);
router.delete('/:id', protect, deleteContent);

module.exports = router;
