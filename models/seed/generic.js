var count = function (model) {
    return new Promise((resolve, reject) => {
        model.count({}, (err, count) => {
            if (err) {
                return reject(err);
            }
            return resolve(count);
        });
    });
};

var moreThanZero = function (count) {
    return new Promise((resolve, reject) => {
        if (count > 0) {
            return reject(count + ' document found in collection');
        }
        return resolve(count);
    });
};

module.exports = {
    count: count,
    moreThanZero: moreThanZero
};