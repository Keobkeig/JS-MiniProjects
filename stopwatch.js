/*
Stopwatch:
    duration - 0 whilst start === false, ticking until stop 
    reset
    start - only one instance allowed
    stop - only one instance allowed
    constructor
*/

function Stopwatch() {
    let startTime, endTime = null, on = false, dur = 0;

    this.reset = function() {
        startTime, endTime = null;
        on = false;
        dur = 0;
    };

    this.start = function() {
        if(on) {
            throw new Error("Stopwatch is already on");
        }
        else {
            on = true;
            startTime = new Date();
            startTime.getTime;
        }
    };

    this.stop = function() {
        if(!on) {
            throw new Error("Stopwatch is not even on");
        }
        else {
            on = false;
            endTime = new Date();
            endTime.getTime;
            //once ended, check time betw
            const elapsed = (endTime.getTime() - startTime.getTime()) / 1000; //ms to s conversion
            dur += elapsed;
        }
        
    };

    Object.defineProperty(this, 'dur', {
        get: function() {
            return dur;
        },
        set: function(value) {
            dur = value;
        },
        }
    );
}

//test on Node.js
const sw = new Stopwatch();

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

//wait 3 seconds
async function testStopwatch() {
    sw.start();
    await wait(3000);
    sw.stop();
    console.log(sw.dur);
    sw.start();
    await wait(2000);
    sw.stop();
    console.log(sw.dur);
    sw.reset();
    console.log(sw.dur);
}

// testStopwatch();



