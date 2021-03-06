const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = global.DDCONFIG.dataBase.aliPayDb;
const sequelize = new Sequelize(config.database, config.username, config.password, config);
let db = {};

/* eslint-disable no-sync */
fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (/\.\w+?$/.exec(file)[0] == '.js') && (file !== 'index.js');
    })
    .forEach(function (file) {
        let model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.Db = sequelize;

db.Sequelize = Sequelize;

module.exports = db;