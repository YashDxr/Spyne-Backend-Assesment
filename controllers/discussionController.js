const Discussion = require("../models/Discussion.js");

exports.createDiscussion = async (req, res) => {
  try {
    const newDiscussion = new Discussion(req.body);
    await newDiscussion.save();
    res.status(201).json(newDiscussion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateDiscussion = async (req, res) => {
  const { id } = req.params;
  const { text, image, hashtags } = req.body;

  try {
    let discussion = await Discussion.findById(id);

    if (!discussion) {
      return res.status(404).json({ msg: 'Discussion not found' });
    }

    if (text) discussion.text = text;
    if (image) discussion.image = image;
    if (hashtags) discussion.hashtags = hashtags;

    await discussion.save();

    res.json(discussion); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteDiscussion = async (req, res) => {
  const { id } = req.params;

  try {
    let discussion = await Discussion.findById(id);

    if (!discussion) {
      return res.status(404).json({ msg: 'Discussion not found' });
    }

    await discussion.remove();

    res.json({ msg: 'Discussion removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getDiscussionsByTag = async (req, res) => {
  const { tag } = req.params;

  try {
    const discussions = await Discussion.find({ hashtags: tag });
    res.json(discussions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.searchDiscussionsByText = async (req, res) => {
  const { text } = req.query;

  try {
    const discussions = await Discussion.find({ text: { $regex: text, $options: 'i' } });
    res.json(discussions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
