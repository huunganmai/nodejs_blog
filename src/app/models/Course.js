const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
//const AutoIncrement = require('mongoose-sequence')(mongoose);
// const ObjectId = Schema.ObjectId;

mongoose.plugin(slug);
mongoose.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

const Course = new Schema(
    {
        name: { type: String, maxLength: 255, require: true },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, maxLength: 255, require: true },
        level: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// Add custom query helper
Course.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

//Course.plugin(AutoIncrement);

module.exports = mongoose.model('course', Course);
