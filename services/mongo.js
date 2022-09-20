const config = require("../config.json");

mongoConnectionString = ()=> {
    return "mongodb://" +
        config.database.username +
        ":" +
        config.database.password +
        "@" +
        config.database.host +
        "/" +
        config.database.collection +
        ""
};

module.exports = {
    ConnectionString : mongoConnectionString
};
