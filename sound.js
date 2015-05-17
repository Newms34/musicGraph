var audioCont = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
var freqArr = [];
var min = 0;
var max = 0;
var durArr = [];
var numTonez;
var recorded = false; //flag if we've already written the notes.
var soundType = 'sine';


var currToneNum = 0;
if (audioCont) {
    var context = new audioCont();
    var gainValue = 0.5; //vol!
    var gainNode = context.createGain ? context.createGain() : context.createGainNode();
    var oscillator;
} else {
    alert('Your browser doesn\'t support webaudio. Sorry!');
}

var oscOn = function(freq, dur) {
    //this function plays a tone. it then stops the tone after 'dur' seconds and continues on to the next tone (if there is one)
    var barW = parseInt((100 * (freq - min) / (max - min)));
    var barHue = (currToneNum * 30) % 360
    if (typeof oscillator != 'undefined') oscillator.disconnect(); //if there is a previous osc, disconnect it first
    oscillator = context.createOscillator();
    oscillator.frequency.value = freq;
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    gainNode.gain.value = gainValue;
    oscillator.type = soundType;
    oscillator.start ? oscillator.start(0) : oscillator.noteOn(0);
    $('#showBar').css({
        'width': barW + '%',
        'background-color': 'hsl(' + barHue + ',100%,' + barW + '%)'
    });
    setTimeout(function() {
        oscillator.disconnect();
        if (currToneNum < freqArr.length - 1) {
            //still freqs to play!
            currToneNum++;
            oscOn(freqArr[currToneNum], durArr[currToneNum]);
        }
    }, dur)
};


var volCh = function(vol) {
    gainValue = (parseInt(vol) / 10) * 0.6;
    gainNode.gain.value = gainValue;
};
