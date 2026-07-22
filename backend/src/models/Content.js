const mongoose = require('mongoose');

// Flexible block schema - supports text, lists, tables, equations, mixed content
const blockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['heading', 'paragraph', 'list', 'nestedList', 'table', 'equation', 'image', 'quote'],
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // flexible structure per block type
    required: true
  }
}, { _id: true });

const contentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    // e.g. 'hero', 'about', 'services', 'blog-post-1'
    index: true
  },
  title: {
    type: String,
    default: ''
  },
  slug: {
    type: String,
    unique: true,
    sparse: true
  },
  blocks: [blockSchema], // rich content stored as array of blocks
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
