window.addEventListener('keydown', createSound);

function createSound(e){
    const audio = document.querySelector(`audio[id="${e.which}"]`);
    const key = document.querySelector(`.key[id="${e.which}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('pressed');
    key.addEventListener('transitionend', removeClass);
};

function removeClass(e){
        if(e.propertyName !== 'transform') return;
        this.classList.remove('pressed');
}
