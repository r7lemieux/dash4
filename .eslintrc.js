// jshint ignore: start
module.exports = {
    "env"          : {
        "browser"   : true,
        "commonjs"  : true,
        "es6"       : true,
        "jquery"    : true,
        "protractor": true,
        "commonjs"  : true
    },
    "extends"      : "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules"        : {
        "strict"         : "off",
        "no-console"     : "off",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes"         : "off",
        "semi"           : [
            "error",
            "always"
        ]
    },
    "globals"      : {
        "$"         : false,
        "_"         : false,
        "angular"   : false,
        "jasmine"   : false,
        "exports"   : false,
        "module"    : false,
        "describe"  : false,
        "before"    : false,
        "beforeEach": false,
        "after"     : false,
        "afterEach" : false,
        "it"        : false,
        "inject"    : false,
        "expect"    : false,
        "spyOn"     : false,
        "$a"        : false,
        "google"    : false
    }
};