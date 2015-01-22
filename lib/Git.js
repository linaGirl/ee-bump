!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , type          = require('ee-types')
        , path          = require('path')
        , Promise       = (Promise || require('es6-promise').Promise)
        , Exec          = require('./Exec');




    module.exports = new Class({
        inherits: Exec


        /**
         * executes the «git push origin branchName» command
         *
         * @param <String> optional branchname, defaults to master
         */
        , push: function(branch) {
            return this.exec('git push origin '+(branch || 'master')).then(function(std) { log(std);
                if (std.out == '' && std.err.toLowerCase().trim() == 'everything up-to-date') return Promise.resolve();
                else return Promise.reject(std);
            });
        }


        /**
         * executes the «git pull origin branchName» command
         *
         * @param <String> optional branchname, defaults to master
         */
        , pull: function(branch) {
            return this.exec('git pull origin '+(branch || 'master')).then(function(std) {
                if (std.out.toLowerCase().trim() == 'already up-to-date.') return Promise.resolve();
                else return Promise.reject(std);
            });
        }



        /**
         * executes the git commit command, if the files array is
         * passed only those files will be commited, else all files 
         * will be comitted
         *
         * @param <String> message  
         * @param <array> optional files array
         */
        , commit: function(message, files) {
            if (!type.string(message) || message.length === 0) return Promise.reject(new Error('Missing commit message!'));

            if (type.null(files) || type.undefined(files)) {
                return this.exec('git commit -am "'+message.replace(/[^\\]"/gi, '\\"')+'"').then(function(std) {
                    if (std.err === '') return Promise.resolve();
                    else return Promise.reject(std);
                });
            }
            else if (type.array(files)) {
                if (!files.length) return Promise.resolve();
                else return this.exec('git commit -m "'+message.replace(/[^\\]"/gi, '\\"')+'" '+files.join(' ')).then(function(std) {
                    if (std.err === '') return Promise.resolve();
                    else return Promise.reject(std);
                });
            }
            else return Promise.reject(new Error('The files array must be an array, null or undefined. Got «'+type(files)+'»!'));
        }




        , tag: function() {

        }



        , log: function() {

        }
    });
}();
