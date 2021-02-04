var myUtils = require('./utils');
var fs = require('fs');
var {
    customAlphabet
} = require("nanoid");

exports.deleteImageFromFolderTosaveNewOne = function (old_img_path, name_id) {
    if (old_img_path != "" || old_img_path != null) {
        var old_file_name = old_img_path.split('/');
        var fs = require('fs');
        var old_file_path = myUtils.saveImageFolderPath(name_id) + old_file_name[1];

        fs.unlink(old_file_path, function (err, file) {
            if (err) {} else {}
        });
    }
};
exports.getImageFolderPath = function (req, name_id) {
    return myUtils.getImageFolderName(name_id);
};

exports.get_unique_id = function () {
    const alphabet = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nanoid = customAlphabet(alphabet, 15)
    return nanoid(); //=> "TMOTG7NQACG51CN";
}

exports.saveImageFromBrowser = function (local_image_path, image_name, name_id) {
    var file_new_path = myUtils.saveImageFolderPath(name_id) + image_name;
    fs.readFile(local_image_path, function (err, data) {
        fs.writeFile(file_new_path, data, 'binary', function (err) {
            if (err) {} else {
                response = {
                    message: 'File uploaded successfully'
                };
            }
        });
    });
};
exports.saveImageFolderPath = function (name_id) {
    return './data/' + myUtils.getImageFolderName(name_id);
};
exports.getImageFolderName = function (name_id) {
    switch (name_id) {
        case 1:
            return 'admin_profile/';
        default:
            break;
    }
};
////////////// TOKEN GENERATE ////////
exports.tokenGenerator = function (length) {

    if (typeof length == "undefined")
        length = 32;
    var token = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        token += possible.charAt(Math.floor(Math.random() * possible.length));
    return token;

};