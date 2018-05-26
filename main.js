// store the element references in memory at start

// the picture
var stimuli_el = document.getElementById("stimuli");
// the next button
var nextBtn = document.getElementById("btn");
//the question
var heading = document.getElementById("question");
// the icon in the middle of the button
var icon = document.getElementById("icon");
// on first page, dont ask a question
heading.innerHTML = '';
// button is used to start test on first page, not go to next task
nextBtn.innerHTML = 'START TEST:';
// hide the field to put the task answer in on the first page
document.getElementById('answer_container').style.visibility = 'hidden';
// the field to put the answer in
var answer = document.getElementById('answer');

// object representing the test participant/ the person currently taking the test
var participant = {
    id: 0,
    questionnaire: {
        yearsProgramming: null,
        usesCC: null
    },
    order: null,        //0 ncc first, 1 cc first
    answers: [],        //transform to 0, or 1 for correct or not? dont i thin. just need answers to control for trolling or not
    taskLength: [],
    totalTime: null,    //move outside. or delete at end.
    // times: []
};

// picture array
var stimulis = [
                { src: 'img/instructions.png' },
                { src: 'img/test1.png' },
                { src: 'img/pausescreen.png' },
                { src: 'img/test1ncc.png' },
                { src: 'img/pausescreen.png' },
                { src: 'img/test2.png' },
                { src: 'img/pausescreen.png' },
                { src: 'img/test2ncc.png' },
                { src: 'img/pausescreen.png' },
                { src: 'img/test3.png' },
                { src: 'img/pausescreen.png' },
                { src: 'img/test3ncc.png' },
                { src: 'img/donescreen.png' }
            ];

// generate randomly the nr 0 or 1
var value = Math.round(Math.random());
participant.order = value;
// if the random nr === 0 reverse the order of the pairs displayed
if(value === 0) {
    stimulis[1].src = 'img/test1ncc.png'     //set to ncc
    stimulis[3].src = 'img/test1.png'        //remove ncc

    stimulis[5].src = 'img/test2ncc.png'     //set to ncc
    stimulis[7].src = 'img/test2.png'        //remove ncc

    stimulis[9].src = 'img/test3ncc.png'     //set to ncc
    stimulis[11].src ='img/test3.png'        //remove ncc
}

var times = [];
var currentTask = 0;
stimuli_el.src = stimulis[0].src;


/////////////////////////////////
function saveData() {
    calcTimeSpentOnEachTask(); //this pushes current times as length into taskLength first
    var data = JSON.stringify(participant, null, 2);
    self = this;
    $.ajax({
        url: "server/store.php",
        type: "POST",
        data: {participant: data},
        complete: function(data) {
            if(data.status == 200) {
                console.log(data.responseText);
            }
        }
    })
}


/////////////////////////////////
function recordCurrentTime() {

    // if task page
    if (isOdd(currentTask + 1) == 1) {  //if i move this inside i dont need + 1
         icon.disabled = true;
         icon.style.opacity = 0.4;
         nextBtn.style.opacity = 0.4;
         document.getElementById('answer_container').style.visibility = 'visible';
    }
    // if pause page
    else {
        icon.disabled = false;
        icon.style.opacity = 1;
        nextBtn.style.opacity = 1;
        document.getElementById('answer_container').style.visibility = 'hidden';
    }

    // if not at end of array
    if(currentTask < stimulis.length - 1) {
        // add the current time in ms
        var d = new Date();
        var time = d.getTime();
        times.push(time);

        // add answer
        isOdd(currentTask) == 1 ? participant.answers.push(document.getElementById('answer').value) : null;

        // reset answer field
        document.getElementById('answer').value = '';

        // replace
        stimuli_el.src = stimulis[++currentTask].src;
        nextBtn.innerHTML = isOdd(currentTask) == 1 ? 'NEXT TASK:' : 'NEXT TASK:';
        heading.innerHTML = isOdd(currentTask) == 1 ? 'What is the value of bar?' : 'Pause';

        // if at last task page
        if(currentTask === stimulis.length - 1) {
            // save only
            saveData();
            nextBtn.style.visibility = 'hidden';
            icon.style.visibility = 'hidden';
            heading.innerHTML = 'Finished';
            document.getElementById('answer_container').style.visibility = 'hidden';
        }
    }
}


/////////////////////////////////
function calcTimeSpentOnEachTask() {
    var length = [];
    var self = this;

    times.forEach(function(time, index) {
        if(index > 0 && isOdd(index) === 1) {
            var time = (times[index] - times[index - 1]) / 1000;
            self.participant.totalTime += time;

            console.log('Task ' + index + ' took: ' + time + ' seconds');
            self.participant.taskLength.push(time);
        }
    });
}


/////////////////////////////////
function onAnswering() {
    icon.disabled = false;
    icon.style.opacity = 1;
    nextBtn.style.opacity = 1;
}


/////////////////////////////////
function isOdd(num) {
    // return 1 if odd nr, 0 for not odd nr
    return num % 2;
}
