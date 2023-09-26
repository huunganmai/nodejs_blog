const mongoose = require('mongoose');
const Course = require('../models/Course');

class SiteController {
    // [GET] /
    home(req, res, next) {
        Course.find({})
            .lean()
            .then((courses) => {
                res.render('home', {
                    courses,
                });
                console.log(courses);
            })
            .catch((err) => {
                next(err);
            });
        //res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
