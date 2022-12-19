const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
 
// find all tags and includes its associated Product data
router.get('/', async (req, res) => {
  try {
    const tag = await Tag.findAll(
      {
        include:[Product],
      }); 
    res.json(tag);
  } catch (error) {
   res.json(err);
  }
});

 // finds a single tag by its `id` and includes its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagById = await Tag.findOne(
      {
        where:{
          id: req.params.id,
        },
        include:[Product],
      }); 
      if (!tagById) {
      res.status(404).json({ message: 'This tag does not exist!' });
      return;
    }  
    res.json(tagById);
  } catch (err) {
    res.status(500).json(err);
  }

});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tagUpdate) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(tagUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const TagDel = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!TagDel) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(TagDel);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
