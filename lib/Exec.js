!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , type          = require('ee-types')
        , chalk         = require('chalk')
        , print         = require('util').print
        , Promise       = (Promise || require('es6-promise').Promise)
        , exec          = require('child_process').exec;


    module.exports = new Class({

        /**
         * execute a command
         */
        exec: function(command) {
            return new Promise(function(resolve, reject) {
                var dots;

                print(chalk.gray((command.length >= 60 ? (command.substr(0, 60)+' [...]') : command))+' ');
                dots = this.dots();
                
                exec(command, function(err, stdout, stderr) {
                    if (err) {
                        dots(false);
                        reject(err);
                    }
                    else {
                        dots(true);
                        resolve({out: stdout, err: stderr});
                    }
                }.bind(this));
            }.bind(this));
        }



        /**
         * prints dots until canceled
         */
        , dots: function(color, sign) {
            var interval = setInterval(function() {
                print(chalk[(color || 'grey')](sign || '.'));
            }, 333);

            return function(ok) {
                clearInterval(interval);

                if (type.boolean(ok)){
                    if (ok) print(' '+chalk.green('\u2713\n'));
                    else print(' '+chalk.red('X\n'));
                }
            }
        }
    });
}();
