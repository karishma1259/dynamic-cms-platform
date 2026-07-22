const Content = require('../models/Content');

exports.getAllContent = async (req, res) => {
  try {
    const filter = req.query.admin === 'true' ? {} : { status: 'published' };
    const content = await Content.find(filter).sort({ createdAt: -1 });
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getContentBySection = async (req, res) => {
  try {
    const content = await Content.findOne({
      section: req.params.section,
      status: 'published'
    });
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createContent = async (req, res) => {
  try {
    const { section, title, slug, blocks, status } = req.body;
    const content = await Content.create({
      section,
      title,
      slug,
      blocks,
      status: status || 'draft',
      updatedBy: req.userId
    });
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const { section, title, slug, blocks, status } = req.body;
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { section, title, slug, blocks, status, updatedBy: req.userId },
      { new: true, runValidators: true }
    );
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json({ message: 'Content deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};