const db = require('../models');
const {education: Education, user: User} = db;

const createOrEditEducationItem = async (req, res) => {
  const {name, startStudies, endStudies, specialization, degree, description, updateEducationId} = req.body;
  const userId = req.param('userId');

  if (!name || !startStudies || !endStudies || !specialization || !degree || !description) return res.status(500).send({
    message: 'name, startStudies, endStudies, specialization, degree or description not passed!',
  });

  User.findOne({
    _id: userId,
  }).exec(async (error, user) => {
    if (error) return res.status(500).send({message: error});

    if (user) {
      const educationFind = await Education.findOne({user: userId});

      if (updateEducationId) {
        const newEducationList = [...educationFind.educationList].map((item) => {
          if (item._id.valueOf() === updateEducationId) {
            return {
              name,
              startStudies,
              endStudies,
              specialization,
              degree,
              description,
            };
          }

          return item;
        });

        Education.findByIdAndUpdate(
          educationFind._id,
          {
            educationList: newEducationList,
          },
          {
            returnDocument: 'after',
          },
          (err, updatedEducation) => {
            if (error) return res.status(500).send({message: err});

            return res.send(updatedEducation);
          }
        );
      } else {
        if (!educationFind) {
          const education = new Education({
            updateDate: new Date().getTime(),
            educationList: [{
              name,
              startStudies,
              endStudies,
              specialization,
              degree,
              description,
            }],
            user: user._id,
          });

          education.save((error, savedEducation) => {
            if (error) return res.status(500).send({message: error});

            return res.send(savedEducation);
          });
        } else {
          const newEducationList = [
            ...educationFind.educationList,
            {
              name,
              startStudies,
              endStudies,
              specialization,
              degree,
              description,
            },
          ];

          Education.findByIdAndUpdate(
            educationFind._id,
            {
              educationList: newEducationList,
            },
            {
              returnDocument: 'after',
            },
            (err, updatedEducation) => {
              if (error) return res.status(500).send({message: err});

              return res.send(updatedEducation);
            }
          );
        }
      }
    }
  });
};

const deleteEducationItem = async (req, res) => {
  const {deleteEducationId} = req.body;
  const userId = req.param('userId');

  if (!deleteEducationId) return res.status(500).send({
    message: 'deleteEducationId not passed!',
  });

  User.findOne({
    _id: userId,
  }).exec(async (error, user) => {
    if (error) return res.status(500).send({message: error});

    if (user) {
      const educationFind = await Education.findOne({user: userId});
      const newEducationList = educationFind.educationList.filter((item) => (
        item._id.valueOf() !== deleteEducationId
      ));

      Education.findByIdAndUpdate(
        educationFind._id,
        {
          educationList: newEducationList,
        },
        {
          returnDocument: 'after',
        },
        (err, updatedEducation) => {
          if (error) return res.status(500).send({message: err});

          return res.send(updatedEducation);
        }
      );
    }
  });
};

module.exports = {
  createOrEditEducationItem,
  deleteEducationItem,
};
