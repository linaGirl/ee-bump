

    var   Git = require('./lib/Git')
        , log = require('ee-log');


    var git = new Git();




    git.pull().then(function() {
        return git.commit('some more progress')
    }).then(git.push.bind(git)).then().catch(log);