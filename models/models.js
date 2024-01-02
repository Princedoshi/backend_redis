const mongoose = require('mongoose');
const redisClient = require('../redis')

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3, maxlength: 50 },
    content: { type: String, required: true, minlength: 5 },
  }, { timestamps: true });


const Note = mongoose.model('Note', noteSchema);


mongoose.Query.prototype.cache = function (hkey) {
    this.useCache = true;
    this.hashkey = JSON.stringify(hkey || '');
    return this;
}

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments);
    }

    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name })
    );

    const cacheValue = await redisClient.hget(this.hashkey, key);

    if (cacheValue) {
        const doc = JSON.parse(cacheValue);

        return Array.isArray(doc)
            ? doc.map((d) => new this.model(d))
            : new this.model(doc);
    }

    const result = await exec.apply(this, arguments);

    if (result) {
        if (Array.isArray(result) && result.length === 0) {
            return null;
        } else {
            redisClient.hset(this.hashkey, key, JSON.stringify(result));
            return result;
        }
    } else {
        console.log("Data not present");
        return null;
    }
}

module.exports = {Note};
