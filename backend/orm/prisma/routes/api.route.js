const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient()

router.get('/products', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }
    })
    const categories = await prisma.category.findMany({})
    res.send({ products, categories });
  } catch (error) {
    next(error)
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const products = await prisma.product.findUnique({
      include: { category: true },
      where: {
        id: Number(id)
      }
    })
    res.send({ products });
  } catch (error) {
    next(error)
  }
});

router.post('/products', async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: req.body
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
});

router.patch('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const products = await prisma.product.update({
      include: { category: true },
      where: {
        id: Number(id)
      },
      data: req.body
    })
    res.send({ products });
  } catch (error) {
    next(error)
  }
});

router.delete('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const products = await prisma.product.delete({
      where: {
        id: Number(id)
      }
    })
    res.send({ products });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
