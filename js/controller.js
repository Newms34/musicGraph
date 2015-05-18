'use strict';
var app = angular.module("soundApp", []);

app.controller("soundController", function($scope, $filter) {
    //audio vars
    $scope.audioCont = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
    $scope.yArr = [300, 300]; //freqs
    $scope.xArr = [0, 800]; //position of each freq
    $scope.min = 0;
    $scope.max = 0;
    $scope.dur = 200;
    $scope.autoPlay = false;
    $scope.soundType = 'sine';
    //preparing canvas element
    $scope.canvEle = document.querySelector('#toneGraf');
    $scope.canvDraw = $scope.canvEle.getContext('2d');
    $scope.drawMe = function() {
        $scope.canvDraw.clearRect(0, 0, 800, 600);
        $scope.canvDraw.beginPath();
        $scope.canvDraw.strokeStyle = '#ccf'
        for (var i = 0; i < $scope.yArr.length - 1; i++) {
            $scope.canvDraw.moveTo($scope.xArr[i], $scope.yArr[i]);
            $scope.canvDraw.lineTo($scope.xArr[i + 1], $scope.yArr[i + 1]);
            $scope.canvDraw.stroke();
        }
        $scope.canvDraw.strokeStyle = '#444';
        $scope.canvDraw.closePath();
    };
    $scope.drawMe();
    $scope.currToneNum = 0;
    if ($scope.audioCont) {
        $scope.context = new $scope.audioCont();
        $scope.gainValue = 0.2; //vol!
        $scope.gainNode = $scope.context.createGain ? $scope.context.createGain() : $scope.context.createGainNode();
        $scope.oscillator;
    } else {
        alert('Your browser doesn\'t support webaudio. Sorry!');
    }

    $scope.toneAdd = function(e) {
        var x = Math.floor(((e.x || e.clientX) + $(document).scrollLeft() - 100) / 10) * 10;
        var y = Math.floor(((e.y || e.clientY) + $(document).scrollTop() - 100) / 10) * 10;
        var posNum;
        console.log('x:', x, 'y:', y)
            //now, search to see if that xPos is already taken:
        var foundPos = $scope.xArr.indexOf(x);
        if (foundPos != -1) {
            //adjust existing freq
            $scope.yArr[foundPos] = y;
        } else {
            //make new freq
            posNum = 0;
            while ($scope.xArr[posNum + 1] < x) {
                posNum++;
            }
            $scope.xArr.splice(posNum + 1, 0, x);
            $scope.yArr.splice(posNum + 1, 0, y);
            console.log('Between:' + $scope.xArr[posNum] + ' and ' + $scope.xArr[posNum + 1] + '. Pos number: ' + posNum)
        }
        $scope.drawMe();
        $scope.currToneNum = 0;
        if ($scope.autoPlay) {
            $scope.oscOn($scope.yArr[$scope.currToneNum])
        }
    }

    $scope.oscOn = function(freqIn) {
        //this function plays a tone. it then stops the tone after 'dur' seconds and continues on to the next tone (if there is one)
        var freq = parseInt((-13 * freqIn / 4) + 1500);
        console.log(freqIn, freq)
        $scope.barW = parseInt((100 * (freq - $scope.min) / ($scope.max - $scope.min)));
        $scope.barHue = ($scope.currToneNum * 30) % 360
        if (typeof $scope.oscillator != 'undefined') $scope.oscillator.disconnect(); //if there is a previous osc, disconnect it first
        $scope.oscillator = $scope.context.createOscillator();
        $scope.oscillator.frequency.value = freq;
        $scope.oscillator.connect($scope.gainNode);
        $scope.gainNode.connect($scope.context.destination);
        $scope.gainNode.gain.value = $scope.gainValue;
        $scope.oscillator.type = $scope.soundType;
        $scope.oscillator.start ? $scope.oscillator.start(0) : $scope.oscillator.noteOn(0);
        $('#showBar').css({
            'width': $scope.barW + '%',
            'background-color': 'hsl(' + $scope.barHue + ',100%,' + $scope.barW + '%)'
        });
        setTimeout(function() {
            $scope.oscillator.disconnect();
            if ($scope.currToneNum < $scope.yArr.length - 1) {
                //still freqs to play!
                $scope.currToneNum++;
                $scope.oscOn($scope.yArr[$scope.currToneNum]);
            } else {
                //reset!
                $scope.currToneNum = 0;
            }
            $('#marker').css('left', $scope.xArr[$scope.currToneNum] + 100 + 'px')
        }, $scope.dur)
    };


    $scope.volCh = function(vol) {
        $scope.gainValue = (parseInt(vol) / 30) * 0.6;
        $scope.gainNode.gain.value = $scope.gainValue;
    };
    $scope.timCh = function(tempo) {
        $scope.dur = parseInt(((30 - tempo) / 30) * 1000);
    };
    $scope.reset = function() {
        $scope.yArr = [300, 300]; //freqs
        $scope.xArr = [0, 800]; //position of each freq
        console.log($scope.xArr)
        $scope.drawMe();
    }
    $scope.save = function() {
        var saveStr = $scope.xArr.toString() + '/' + $scope.yArr.toString();
        var strCode = window.btoa(unescape(encodeURIComponent(saveStr)));
        window.prompt('Press ctrl-c to copy this to your clipboard!', strCode);
    }
    $scope.load = function() {
        var strCode = window.prompt('Enter the code you were given!','');
        var loadStrArr = decodeURIComponent(escape(window.atob( strCode ))).split('/');
        console.log(loadStrArr);
        $scope.xArr = loadStrArr[0].split(',');
        $scope.yArr = loadStrArr[1].split(',');
        $scope.drawMe();
    }
});
