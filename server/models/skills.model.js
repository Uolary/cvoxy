const mongoose = require('mongoose');

const Skills = mongoose.model(
  'Skills',
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updateDate: Date,
    skillsList: [{
      name: String,
      level: Number,
      description: String,
    }],
  })
);

module.exports = Skills;
