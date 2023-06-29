import { Statistic } from "./statistics.js";

export const statisticMongoStore = {
  async getAllStatisticsOfType(type) {
    const statistics = await Statistic.find({ objectCategory: type }).lean();
    return statistics;
  },

  async addStatistic(statistic) {
    statistic.creationDate = new Date();
    const newStatistic = new Statistic(statistic);
    const statisticObj = await newStatistic.save();
    const s = await this.getStatisticById(statisticObj._id);
    return s;
  },

  async getStatisticById(id) {
    if (id) {
      try {
        const statistic = await Statistic.findOne({ _id: id }).lean();
        return statistic;
      } catch (error) {
        console.log("bad id");
      }
    }
    return null;
  },
};
