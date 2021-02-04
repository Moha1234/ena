var Admin = require('mongoose').model('admin')
var CryptoJS = require("crypto-js");
var moment = require('moment-timezone');
var Excel = require('exceljs');
var fs = require('fs');
var myAdmin = require('./admin');
var Utils = require('../admin-controller/utils');


exports.log_out = function (req, res) {
    req.session.destroy(function (err, data) {
        if (err) {
            //console.log(err);
        } else {
            console.log('after' + req.session);
            res.redirect('/admin');
        }
    });
};

exports.dashboard = function (req, res) {
    console.log("keep running")
    if (typeof req.session.userid != "undefined") {
        res.render('dashboard');
    } else {
        res.render("login")
    }
};

exports.admin = function (req, res) {
    if (typeof req.session.userid != "undefined") {
        res.redirect('/dashboard');
    } else {
        Admin.find({}).then((admins) => {
            if (admins.length == 0) {
                var hash = CryptoJS.MD5("@admin123");
                var admin1 = new Admin({
                    sequence_id: 1,
                    name: "Mohamed Ali",
                    email: "engmali2017@gmail.com",
                    phone: "615481129",
                    picture: "",
                    status: 1,
                    type: "Admin",
                    password: hash,
                });
                admin1.save().then((admin) => {});
            }
        });
        res.render("login");
        delete msg;
    }
}

exports.check_admin_login = function (req, res) {
    if (typeof req.session.userid != "undefined") {
        res.redirect('dashboard');
    } else {
        var name = req.body.email
        var ciphertext = CryptoJS.MD5(req.body.password);
        var phone = {};
        phone['phone'] = name;
        var email = {};
        email['email'] = name;
        var password = {};
        password['password'] = ciphertext;
        Admin.findOne({
            $and: [{
                $or: [phone, email]
            }, {
                status: 1
            }]
        }).then((admin) => {
            if (!admin) {
                res.render("login", {
                    resp: "Invalid email or password!"
                });
            } else {
                if (admin.password != ciphertext) {
                    res.render("login", {
                        resp: "Invalid email or password!"
                    });
                } else {
                    admin.name = "mmmm";
                    var query = {
                        $and: [{
                            $or: [phone, email]
                        }, {
                            status: 1
                        }]
                    };
                    var newvalues = {
                        $set: {
                            last_login_date: Date.now()
                        }
                    };

                    Admin.updateOne(query, newvalues, function (err, res) {
                        if (err) throw err;
                        console.log("1 document updated");

                    });
                    req.session.userid = admin.id;
                    req.session.username = admin.name;
                    res.render('dashboard', {
                        admin_data: admin,
                        resp: "You are successfully logged in"
                    });
                }
            }
        });
    }
};
exports.list_admin = function (req, res) {
    if (typeof req.session.userid != "undefined") {
        Admin.find({}).then((admin) => {
            if (admin) {

                res.render('admin-list', {
                    adminsList: admin,
                    moment: moment
                });
            } else {
                res.redirect("/dashboard");
            }
        })
    } else {
        res.render("login")
    }

};