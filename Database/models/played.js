const played = async (prefs) => {
    const DAO = require("../DAO")

    const sequelize = require("sequelize")
  
    const db  = await DAO()

    const model = db.define('played',{
        uri: sequelize.TEXT,
    })

    if(prefs&& prefs.i) await model.sync();

    return model
  };

module.exports = played;