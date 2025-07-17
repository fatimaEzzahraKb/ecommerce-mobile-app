
const Book = require("../models/Books.model");
const { Sequelize } = require("sequelize");
const Order = require("../models/Order.model");
const User = require("../models/Users.model");
const OrderItem = require("../models/OrderItem.model");

async function getData(req, res) {
  try {
    const customersTotal = await User.count({ where: { isAdmin: false } });
    const salesTotal = await Order.sum("total", { where: { status: 'términé' } }) | 0;
    const booksTotal = await Book.count();
    const ordersTotal = await Order.count();

    const salesRaw = await Order.findAll({
      attributes: [
        [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m'), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('total')), 'totalSales']
      ],
      where: { status: 'términé' },
      group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m')],
      order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m'), 'ASC']]
    });

    const topBooksRaw = await OrderItem.findAll({
      attributes: [
        'book_id',
        [Sequelize.fn('SUM', Sequelize.col("quantity")), "totalSold"]
      ],
      include: [{
        model: Book,
        attributes: ["titre"]
      }],
      group: ["book_id", "Book.id", "Book.titre"],
      order: [[Sequelize.literal('totalSold'), 'DESC']],
      limit: 5
    })
    const topBooks = topBooksRaw.map(item => ({
      title: item.Book.titre,
      quantity: parseInt(item.get('totalSold'))
    }));


    const sales = salesRaw.map(item => ({
      month: item.dataValues.month,
      totalSales: parseFloat(item.dataValues.totalSales)
    }))
    return res.status(200).send({ customersTotal, salesTotal, salesChartData: sales.map(t => t.totalSales), salesChartLabels: sales.map(t => t.month), booksTotal, ordersTotal, topBooksLabels: topBooks.map(b => b.title), topBooksData: topBooks.map(b => b.quantity) });
  }
  catch (err) {
    console.log("Dashboard Data Error", err);
    return res.status(500).send(err);
  }
}


module.exports = { getData }