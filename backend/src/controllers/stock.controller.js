import prisma from '../utils/prisma.js';

export const addStock = async (req, res) => {
  const { warehouseId, productName, quantity } = req.body;

  if (!warehouseId || !productName || quantity == null) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const stock = await prisma.stock.create({
    data: {
      warehouseId,
      productName,
      quantity
    }
  });

  res.status(201).json(stock);
};

export const getStock = async (req, res) => {
  const stock = await prisma.stock.findMany({
    include: {
      warehouse: true
    }
  });

  res.json(stock);
};
