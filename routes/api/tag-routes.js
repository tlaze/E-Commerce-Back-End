const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async (req, res) => {
  Tag.findAll(
    {
      // be sure to include its associated Product data
      include: {
        model: Product
      }
    }
  )
  .then(data => res.json(data))
  .catch(err => {
    res.status(500).json(err);
  })
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  Tag.findOne(
    {
      where: {
        id: req.params.id
      },
      // be sure to include its associated Products
      include: {
        model: Product
      }
    }
  )
  .then(data => res.json(data))
  .catch(err => {
    res.status(500).json(err);
  });
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(data => res.json(data))
  .catch(err => {
    res.status(500).json(err);
  });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
      id: req.params.id
      } 
    })
    .then(data => {
      if(!data){
        res.status(404).json({ message: "No Tag Found With That ID"});
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err); 
  });
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    if(!data) {
      res.status(404).json({ message: "No Tag Found With That ID"});
      return;
    }
    res.json(data);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

module.exports = router;
