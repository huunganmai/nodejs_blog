const mongoose = require('mongoose');
const Course = require('../models/Course');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find().sortable(req).lean(), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/storedCourses', { courses, deletedCount });
            })
            .catch(next);
    }

    // [] /me/stored/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .lean()
            .then((courses) => res.render('me/trashCourses', { courses }))
            .catch(next);
    }
}

module.exports = new MeController();
