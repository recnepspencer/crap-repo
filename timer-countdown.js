let typeTime = document.getElementById('type-time');
let typeTime2 = document.getElementById('type-time2');
let userInput;
let userInput2;
typeTime.placeholder = "4";
typeTime2.placeholder = "20";
currentTime = new Date;
let amLabel = document.getElementById('amLabel');
let pmLabel = document.getElementById('pmLabel');
let mN;
let mNb;
let snoozeTime = 1;
let playSnooze;
let innerHTMLFunction = `<div id='settings-form' class='settings-form'><div style='text-decoration: underline; font-size: 20px; margin-bottom: 10px !important'>Settings</div><div><label>Set Snooze time (in minutes)</label><input type='text' id='snooze-setting' value='${snoozeTime}'></div><div><label>Pick Songs</label><input type='text'></div><div><button id='save-settings'>Save</button><button id='cancel-changes'>Cancel</button></div></div>`;


songList = [
    src="files/4am.mp3",
    src="files/bottle.mp3",
    src="files/bye.mp3",
    src="files/cff.mp3",
    src="files/cigs.mp3",
    src="files/confide.mp3",
    src="files/dtm.mp3",
    src="files/ontime.mp3",
    src="files/relapse.mp3",
    src="files/smile.mp3"
];
randSong = songList[Math.floor(Math.random() * songList.length)];
let audiopoop = new Audio(randSong);


// cant be 60
function noSixty(inputA, inputB){
    if(inputB >= 60){
        inputA += 1
        inputB -= 60
        return [inputA, inputB]
    } else {
        return [inputA, inputB]
    }
}



// clicking on the AM and PM buttons
amLabel.onclick = function (){
    document.getElementById('am').checked = true;
    amLabel.className = 'amLabel';
    pmLabel.classList.remove('pmLabel')
    mN = 'AM'
}
pmLabel.onclick = function (){
    document.getElementById('pm').checked = true;
    pmLabel.className = 'pmLabel';
    amLabel.classList.remove('amLabel')
    mN = 'PM'
}

//function to play the sounds
function playSong(arg1, arg2, arg3) {
    if(arg1 === arg2 || arg3 === arg2){
    audiopoop = new Audio(randSong);
    audiopoop.play(); 
    document.getElementById('stop').className = 'stop'
    document.getElementById('stop').classList.remove('disabled')
    document.getElementById('snooze').className = 'snooze'
    document.getElementById('snooze').classList.remove('disabled')

    };
}
document.getElementById('stop').onclick = function() {
        audiopoop.pause();
        document.getElementById('stop').className = 'disabled'
        document.getElementById('stop').classList.remove('stop')
        document.getElementById('snooze').className = 'disabled'
        document.getElementById('snooze').classList.remove('snooze')

}
document.getElementById('snooze').onclick = function(){
    audiopoop.pause();
    let numberA = Number(typeTime.value);
    let numberB = Number(typeTime2.value);
    numberB += snoozeTime;
    numberA = noSixty(numberA, numberB)[0];
    numberB = noSixty(numberA, numberB)[1];
    if (numberB < 10){
        numberB = '0' + numberB
    };
    if (numberA > 12){
        numberA -= 12;
    };
    if (mN === 'AM'){
        clickSeconds = numberA * 3600 + numberB * 60
    } else {
        clickSeconds = (numberA + 12) * 3600 + numberB * 60 
    }
    if (clickSeconds < 43200 || clickSeconds >= 86400){
        mNb = 'AM'
    } else {
        mNb = 'PM'
    }
    playSnooze = `${numberA}:${numberB}.00 ${mNb}`
    console.log(playSnooze)
    document.getElementById('stop').className = 'disabled'
    document.getElementById('stop').classList.remove('stop')
    document.getElementById('snooze').className = 'disabled'
    document.getElementById('snooze').classList.remove('snooze')
}



console.log(document.getElementById('stop'))
//making the time work
setInterval(updateTime, 1000);
function updateTime(){
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let hoursB = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    if (minutes < 10){
        minutes = "0" + minutes
    };
    let seconds = currentTime.getSeconds();
    if (seconds < 10){
        seconds = '0' + seconds
    };
    if (hours > 12){
        hours -= 12
    }
    let t_str = `${hours}:${minutes}.${seconds} `;
    if(hoursB > 11){
        t_str += "PM";
    } else {
        t_str += "AM";
    }


    document.getElementById('current-time').innerHTML = t_str;
    let totalAlarm = typeTime.value + ':' + typeTime2.value + '.00 ' + mN
    playSong(totalAlarm, t_str, playSnooze);
}


document.getElementById('settings-pic').onclick = function() {
    document.getElementById('add-settings').innerHTML = innerHTMLFunction
    closeSettings('cancel-changes', 'add-settings')
    saveSettings('save-settings', 'add-settings')
    return snoozeTime
}

function closeSettings(closeButton, settingsInnerHtml){
    document.getElementById(closeButton).onclick = function () {
        document.getElementById(settingsInnerHtml).replaceChildren();
    }
}

function saveSettings(saveButton, settingsInnerHtml){
    document.getElementById(saveButton).onclick = function () {
        snoozeTime = Number(document.getElementById('snooze-setting').value)
        console.log(snoozeTime)
        innerHTMLFunction = `<div id='settings-form' class='settings-form'><div style='text-decoration: underline; font-size: 20px; margin-bottom: 10px !important'>Settings</div><div><label>Set Snooze time (in minutes)</label><input type='text' id='snooze-setting' value='${snoozeTime}'></div><div><label>Pick Songs</label><input type='text'></div><div><button id='save-settings'>Save</button><button id='cancel-changes'>Cancel</button></div></div>`
        document.getElementById(settingsInnerHtml).replaceChildren();
        return snoozeTime
    }
};

