/* jshint node: true */
/* jshint browser: true, devel: true, esnext: true */
'use strict';

var blackPoints = 0;
var whitePoints = 0;
exports.checkBlackPoints = function (tabFromServer, tabFromUser){
    blackPoints = 0;
    console.log("tabFromServer: " + tabFromServer);
    console.log("tabFromUser: " + tabFromUser);
    for(let i = 0; i<tabFromServer.length ; i++){
        if (tabFromServer[i] === parseInt(tabFromUser[i])){
            blackPoints++;
        }
    }
    
    console.log("blackPoints: " + blackPoints);
    return blackPoints;
};

exports.checkWhitePoints = function (tabFromServer, tabFromUser){
    whitePoints = 0;
    for(let i = 0; i<tabFromServer.length; i++){
        for(let j=0; j<tabFromServer.length; j++){
            if(parseInt(tabFromUser[i]) === tabFromServer[j]){
                whitePoints++;
                break;
            }
        }
    }

    whitePoints = whitePoints - blackPoints;
    console.log("whitePoints: " + whitePoints);
    return whitePoints;
}