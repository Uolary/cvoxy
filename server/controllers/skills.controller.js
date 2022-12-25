const db = require('../models');
const {skills: Skills, user: User} = db;

const createOrEditSkillItem = async (req, res) => {
  const {name, description, level, updateSkillId} = req.body;
  const userId = req.params.userId;

  if (!name || !description || !level) return res.status(500).send({
    message: 'name, description or level not passed!',
  });

  User.findOne({
    _id: userId,
  }).exec(async (error, user) => {
    if (error) return res.status(500).send({message: error});

    const skillsFind = await Skills.findOne({user: userId});

    if (updateSkillId) {
      const newSkillsList = [...skillsFind.skillsList].map((item) => {
        if (item._id.valueOf() === updateSkillId) {
          return {
            name,
            description,
            level,
          };
        }

        return item;
      });

      Skills.findByIdAndUpdate(
        skillsFind._id,
        {
          skillsList: newSkillsList,
        },
        {
          returnDocument: 'after',
        },
        (err, updatedSkills) => {
          if (error) return res.status(500).send({message: err});

          return res.send(updatedSkills);
        }
      );
    } else {
      if (!skillsFind) {
        const skills = new Skills({
          updateDate: new Date().getTime(),
          skillsList: [{
            name,
            description,
            level,
          }],
          user: user._id,
        });

        skills.save((error, savedSkills) => {
          if (error) return res.status(500).send({message: error});

          return res.send(savedSkills);
        });
      } else {
        const newSkillsList = [
          ...skillsFind.skillsList,
          {
            name,
            description,
            level,
          },
        ];

        Skills.findByIdAndUpdate(
          skillsFind._id,
          {
            skillsList: newSkillsList,
          },
          {
            returnDocument: 'after',
          },
          (err, updatedSkills) => {
            if (error) return res.status(500).send({message: err});

            return res.send(updatedSkills);
          }
        );
      }
    }
  });
};

const deleteSkillItem = async (req, res) => {
  const {deleteSkillId} = req.body;
  const userId = req.params.userId;

  if (!deleteSkillId) return res.status(500).send({
    message: 'deleteSkillId not passed!',
  });

  User.findOne({
    _id: userId,
  }).exec(async (error) => {
    if (error) return res.status(500).send({message: error});

    const skillsFind = await Skills.findOne({user: userId});
    const newSkillsList = skillsFind.skillsList.filter((item) => (
      item._id.valueOf() !== deleteSkillId
    ));

    Skills.findByIdAndUpdate(
      skillsFind._id,
      {
        skillsList: newSkillsList,
      },
      {
        returnDocument: 'after',
      },
      (err, updatedSkills) => {
        if (error) return res.status(500).send({message: err});

        return res.send(updatedSkills);
      }
    );
  });
};

const getSkillsData = async (req, res) => {
  const userId = req.params.userId;

  User.findOne({
    _id: userId,
  }).exec(async (error) => {
    if (error) return res.status(500).send({message: error});

    const skillsFind = await Skills.findOne({user: userId});

    res.send(skillsFind);
  });
};

module.exports = {
  createOrEditSkillItem,
  deleteSkillItem,
  getSkillsData,
};
