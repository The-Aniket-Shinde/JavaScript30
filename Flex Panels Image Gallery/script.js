const options = document.querySelectorAll('.img-container');

function removeClass(){
    options.forEach((option)=>{
        if(!option.classList.contains('display')){
            return
        }
        option.classList.remove('display')
    })
}

function grow(){
    if(!this.classList.contains('display')){
        removeClass()
        this.classList.add('display');
    }else{
        this.classList.remove('display');
    }
};

options.forEach((option)=>{option.addEventListener('click' , grow)});