const mongoose = require('mongoose');

const Education = mongoose.model(
  'Education',
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updateDate: Date,
    educationList: [{
      name: String,
      startStudies: Date,
      endStudies: Date,
      specialization: String,
      degree: String,
      description: String,
    }],
  })
);

module.exports = Education;
