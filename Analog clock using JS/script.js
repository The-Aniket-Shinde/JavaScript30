let Secound_hand = document.getElementById('second-hand');
let min_hand = document.getElementById('minute-hand');
let hr_hand = document.getElementById('hour-hand');

function updateClock() {
    let time = new Date();
    seconds = time.getSeconds();
    minutes = time.getMinutes();
    hours = time.getHours();
    if(seconds == 0){Secound_hand.style.transition = 'none';}
    else{Secound_hand.style.transition = 'all 0.05s';}
    if(minutes == 0){min_hand.style.transition = 'none';}
    else{min_hand.style.transition = 'all 0.05s';}
    if(hours == 0){hr_hand.style.transition = 'none';}
    else{hr_hand.style.transition = 'all 0.05s';}
    secoundsDegrees = ((seconds / 60) * 360) + 90;
    Secound_hand.style.transform = `rotate(${secoundsDegrees}deg)`;
    miutesDegrees = ((minutes / 60)*360) +90;
    min_hand.style.transform = `rotate(${miutesDegrees}deg)`;
    hoursDegrees = ((hours / 12) * 360) + 90;
    hr_hand.style.transform = `rotate(${hoursDegrees}deg)`;
}

setInterval(updateClock, 1000); 