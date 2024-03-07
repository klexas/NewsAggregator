const config = require("../config.json");
const mongoose = require("mongoose");
const { log } = require("mercedlogger");

mongoConnectionString = () => {
    return "mongodb://" +
        // config.database.username +
        // ":" +
        // config.database.password +
        // "@" +
        config.database.host +
        "/" +
        config.database.collection +
        ""
};

mongoose.connect = mongoose.connect(mongoConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection
    .on("open", () => log.green("DATABASE STATE", "Connection Open"))
    .on("close", () => log.magenta("DATABASE STATE", "Connection Open"))
    .on("error", (error) => log.red("DATABASE STATE", error))

module.exports = mongoose