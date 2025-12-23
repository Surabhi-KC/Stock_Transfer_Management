import prisma from '../utils/prisma.js';

export const createWarehouse = async (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location required' });
  }

  const warehouse = await prisma.warehouse.create({
    data: { name, location }
  });

  res.status(201).json(warehouse);
};

export const getWarehouses = async (req, res) => {
  const warehouses = await prisma.warehouse.findMany();
  res.json(warehouses);
};
