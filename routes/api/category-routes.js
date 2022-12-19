const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// finds all categories and include its associated Products
router.get("/", async (req, res) => {
  try {
    const category = await Category.findAll({ include: [Product] });
    res.json(category);
  } catch (error) {
    res.json(err);
  }
});

// finds one category by its `id` value and includes its associated Products
router.get("/:id", async (req, res) => {
  try {
    const categoryById = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    });
    if (!categoryById) {
      res.status(404).json({ message: "This category does not exist!" });
      return;
    }
    res.json(categoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Creates a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// updates a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const categoryUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryUpdate) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json({ message: "category has been updated!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// deletes a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categoryDel = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryDel) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json({ message: "category has been deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
