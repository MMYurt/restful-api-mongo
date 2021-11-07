const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.DATABASE_URL;

async function query(req) {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();
    const min = req.body.minCount;
    const max = req.body.maxCount;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    return db
      .collection("records")
      .aggregate([
        {
          $project: {
            _id: 0,
            createdAt: 1,
            totalCount: { $sum: "$counts" },
            key: 1,
          },
        },
        {
          $match: {
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
            totalCount: {
              $gte: min,
              $lte: max,
            },
          },
        },
      ])
      .toArray();
  } catch (err) {
    if (err) {
      throw err;
    }
  }
}

module.exports = query;
