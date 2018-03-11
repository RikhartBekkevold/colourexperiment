var stimuli_el = document.getElementById("stimuli");
var btn = document.getElementById("btn");
var heading = document.getElementById("question");
var icon = document.getElementById("icon");
heading.innerHTML = 'Before beginning:'; //instructions?
btn.innerHTML = 'START TEST:';
document.getElementById('answer_container').style.visibility = 'hidden';

var exp_field;// = document.getElementById("exp");
var usage_field;

//get one or two.. if two use loop to pop array in specific way
//consider how the data should be recorded so i know that task 2 was last etc

// btn disabled until field not empty

    // 1, 2 or 3
   // var value = Math.round(1 + Math.random() * 2);




   //dont randomize the nr. randomize the ncc part of the name. if 1 make second have ncc, if 0 let first.

//just determining if ncc and cc is gonna switch place,thats why 1 or 2. dont wanna randomize all. keep in spot, just switch
//splice?

//push instructions
//loop
//push test[i]
//push pausescreen
//loop end
//push donescreen


//randomize
//instructions
//answer coloumn, button that only works when answered

//questionare fields

var stimulis = [
                { src: 'img/instructions.png' },
                { src: 'img/test1mono.png' },
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

var value = Math.round(Math.random());

if(value === 0) {

    stimulis[1].src = 'img/test1ncc.png'     //set to ncc
    stimulis[3].src = 'img/test1.png'        //remove ncc

    stimulis[5].src = 'img/test2ncc.png'     //set to ncc
    stimulis[7].src = 'img/test2.png'        //remove ncc

    stimulis[9].src = 'img/test3ncc.png'     //set to ncc
    stimulis[11].src ='img/test3.png'        //remove ncc

}



// for(var i = 0; i < stimulis.length; i++) {
//     stimulis[1].src = 'img/test1ncc.png'     //set to ncc
//     stimulis[3].src = 'img/test1.png'        //remove ncc
// }
//


//i can clean up and change the format of the data, as long as i have the data

//record in the data the order?

//if in doubt, make an assumption

//should the data show the randomization?
//will other data from eye tracker feks do that?

//write to two different files?

//randomized = secure for carry on effect? but cant analyze by seeing
//they did better for the first one, so cant be carry over effect...

//ask what to randomize

//learning effect between tasks dont matter?
//learning effect between ncc and cc though I need to account for

//randomizing everything... difine into categories...

//all are ncc first or vis versa

//if its not recorded, how do i know?
//if its the same, i know since i know which came first

//dont want to randomize everything sicne need more samples

//foo being called before function works

//when you think you have the answer

//monochrome is a very different. so is few vs many colours

//"also see if there are any difference between the syntax highlighters. not all equal feks. is monocrhome better? many colours? last is best, becasue
// looks at the aspect that actually should help. the words having colour. so..."


//since snipptes small, hard to have many colours

//does it help, and does the effct&/help increase with more colours (not experience)?

//more diff SH, more tests/tasks

//color. or light vs dark themes...

//mentally prepare them?

//monocrhome

//test in diff browsers

//does the nr of color matter? thats the qustiosn i ask
//so need theme where i can ask a question

//font

var currentTask = 0;
stimuli_el.src = stimulis[0].src;

var participant = {
    id: 0,
    questionnaire: {
        yearsProgramming: null,
        usesCC: null
    },
    order: null,        //0 ncc first, 1 cc first
    answers: [],        //transform to 0, or 1 for correct or not? dont i thin. just need answers to control for trolling or not
    taskLength: [],
    totalTime: null, //move outside. or delete at end.
    times: []
};


participant.order = value;

//it happens that someone does complete or data is corrupt for some of the tasks. then can still analyze

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

function recordCurrentTime() {

    icon.disabled = true;
    document.getElementById('answer_container').style.visibility = 'visible';

    if(currentTask === 0) {
        // participant.questionnaire.yearsProgramming = exp_field.value;
        // participant.questionnaire.usesCC = usage_field.value;
    }

    if(currentTask < stimulis.length - 1) {


        // btn.style.backgroundColor = 'red';
        var d = new Date();
        var time = d.getTime();
        participant.times.push( time );
        console.log(participant.times);

        // if(document.getElementById('answer').value != '') {
        //      icon.disabled = false;
        // }

        participant.answers.push(document.getElementById('answer').value);
        console.log(participant.answers);
        document.getElementById('answer').value = '';

//show it only on isOdd() == 1
//add 0 or 1

        stimuli_el.src = stimulis[++currentTask].src;
        console.log(currentTask);

        //if btn.innerHTML != 'NEXT'
        // btn.innerHTML = 'NEXT TASK:';
        btn.innerHTML = isOdd(currentTask) == 1 ? 'NEXT TASK:' : 'NEXT TASK:';
        heading.innerHTML = isOdd(currentTask) == 1 ? 'What is the value of bar?' : 'Pause';
        // heading.innerHTML = "What is the value of 'bar'?"

        if(currentTask === stimulis.length - 1) {
            saveData();
            btn.style.visibility = 'hidden';
            icon.style.visibility = 'hidden';
            heading.innerHTML = 'Finished';
            document.getElementById('answer_container').style.visibility = 'hidden';
        }

        setTimeout(function() {
            icon.disabled = false;
        }, 500)

    }

}


//randomizing tasks (pairs) doesnt matter since im not testing if some of them (the pairs) are harder or not
//randomizing ncc and cc make sure to see if there is a learning effect between


function calcTimeSpentOnEachTask() { //format?

    var length = [];

    var self = this;
    participant.times.forEach(function(time, index) {
        if(index > 0 && isOdd(index) === 1) {
            var time = (self.participant.times[index] - self.participant.times[index - 1]) / 1000;
            self.participant.totalTime += time;

            console.log('Task ' + index + ' took: ' + time + ' seconds');
            self.participant.taskLength.push(time);
        }
    });


}



function isOdd(num) {
    return num % 2;
}




//obj is ok, can assign instead of push
//


//if double click prevent anything from happen
// format of data and how to analyze

// dont calc time between button click 2 and  3, but 3 and 4 since this is an pause screen. however not a problem that the data is recored. just need
// to know its not a test.


//disable button immidately, then cant dobbel click and also cant go on before answering
//opacity to show disabled

//third column between button and stimuli where you answer. radio buttons?

//when disabling dont need the check down below. invislbe cant click and disabled cant click and call function.
//rigjt now its a check that makes sure code wont fire.


// const MIN = 100;
// const DIVIATION = 10;
// Math.round(MIN + Math.random() * 10);


//start screen briefing:
//assume its correct - no traps
//inform aboyut time or what the test is about?
