import prisma from '../utils/prisma.js';

export const createTransfer = async (req, res) => {
  const { fromWarehouseId, toWarehouseId, productName, quantity } = req.body;

  if (!fromWarehouseId || !toWarehouseId || !productName || quantity == null) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const transfer = await prisma.stockTransfer.create({
    data: {
      fromWarehouseId,
      toWarehouseId,
      productName,
      quantity,
      status: 'PENDING',
      history: {
        create: { status: 'PENDING' }
      }
    }
  });

  res.status(201).json(transfer);
};

export const updateTransferStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const transfer = await prisma.stockTransfer.findUnique({
    where: { id: Number(id) }
  });

  if (!transfer) {
    return res.status(404).json({ error: 'Transfer not found' });
  }

  // COMPLETED → update stock atomically
  if (status === 'COMPLETED') {
    await prisma.$transaction([
      prisma.stock.updateMany({
        where: {
          warehouseId: transfer.fromWarehouseId,
          productName: transfer.productName
        },
        data: {
          quantity: { decrement: transfer.quantity }
        }
      }),
      prisma.stock.upsert({
        where: {
          warehouseId_productName: {
            warehouseId: transfer.toWarehouseId,
            productName: transfer.productName
          }
        },
        update: {
          quantity: { increment: transfer.quantity }
        },
        create: {
          warehouseId: transfer.toWarehouseId,
          productName: transfer.productName,
          quantity: transfer.quantity
        }
      })
    ]);
  }

  const updated = await prisma.stockTransfer.update({
    where: { id: Number(id) },
    data: {
      status,
      history: {
        create: { status }
      }
    }
  });

  res.json(updated);
};

export const getTransfers = async (req, res) => {
  const transfers = await prisma.stockTransfer.findMany({
    include: {
      fromWarehouse: true,
      toWarehouse: true,
      history: true
    }
  });

  res.json(transfers);
};
