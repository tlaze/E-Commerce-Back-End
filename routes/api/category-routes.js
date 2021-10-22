const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', (req, res) => {
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    }
  )
  .then(data => res.json(data))
  .catch(err => {
    res.status(500).json(err);
  });
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne(
    {
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['category_id']
      }
    }
  )
  .then(data => res.json(data))
  .catch(err => {
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => {
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
    }
    // if no product tags, just respond
    res.status(200).json(category);
  })
  .then((productTagIds) => res.status(200).json(productTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((update) => {
    res.json(update);
  })
  .catch((err) => res.json(err)); 
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No Category Found With This ID!'});
      return;
    }
    res.status(200).json(deleteCategory);
  }catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
