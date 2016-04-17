/*jshint node: true */
// poniżej użylismy krótszej (niż na wykładzie) formy
// module.exports ==> exports
exports.index = function (req, res) {
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    res.render('index', {
        title: 'Mastermind'
    });
};

exports.play = function (req, res) {
    var newGame = function () {
        var i, data = [],
            puzzle = req.session.puzzle;
        for (i = 0; i < puzzle.size; i += 1) {
            data.push(Math.floor(Math.random() * puzzle.dim));
        }
        req.session.puzzle.data = data;
        return {
            "retMsg": {
                "size": puzzle.size,
                "dim": puzzle.dim,
                "max": puzzle.max
            }
        };
    };
    // poniższa linijka jest zbędna (przy założeniu, że
    // play zawsze używany będzie po index) – w końcowym
    // rozwiązaniu można ją usunąć.
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    /*
     * req.params[2] === wartość size
     * req.params[4] === wartość dim
     * req.params[6] === wartość max
     */
    if (req.params[2]) {
        req.session.puzzle.size = req.params[2];
    }
    if (req.params[4]) {
        req.session.puzzle.dim = req.params[4];
    }
    if (req.params[6]) {
        req.session.puzzle.max = req.params[6];
    }
    res.json(newGame());
};

exports.mark = function (req, res) {
    var markAnswer = function () {
        var whitePoints = 0;
        var blackPoints = 0;
        var message = "";
        var check = require("../public/js/logic.js");
        var move = req.params[0].split('/');
        move = move.slice(0, move.length - 1);
        console.log(move);
        
        blackPoints = check.checkBlackPoints(req.session.puzzle.data,move);
        whitePoints = check.checkWhitePoints(req.session.puzzle.data,move);
        
        if (blackPoints == req.session.puzzle.size) {
            message = "Gratulacje! Koniec gry";  
        } else {
            message = "Graj dalej";
        }
        
        return {
            "retVal": {
                "black": blackPoints,
                "white": whitePoints
            },
            "retMsg": message
        };
    };
    res.json(markAnswer());
};
