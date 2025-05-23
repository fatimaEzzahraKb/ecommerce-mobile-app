const { Sequelize } = require("sequelize");
const Order = require("../models/Order.model");
const User = require("../models/Users.model");


async function getData(req, res) {
  try {
    const customersTotal = await User.count({ where: { isAdmin: false } });
    const salesTotal = await Order.sum("total", { where: { status: 'términé' } }) | 0;
    const salesChartData = await await Order.findAll({
      attributes: [
        [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m'), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('total')), 'totalSales']
      ],
      where: { status: 'términé' },
      group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m')],
      order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m'), 'ASC']]
    });
    return res.status(200).send({ customersTotal, salesTotal, salesChartData });
  }
  catch (err) {
    console.log("Dashboard Data Error", err);
    return res.status(500).send(err);
  }
}


module.exports = { getData }