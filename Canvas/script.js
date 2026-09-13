const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const inputs = document.querySelectorAll('input');
let allowDraw = false;
let xcord = 0;
let ycord = 0;

inputs.forEach( (input) => {
    input.addEventListener('change',()=>{
        if(input.type==='number' || input.type==='range'){
            ctx.lineWidth = input.value;
            // console.log(input.value);
        }else{
            ctx.strokeStyle = input.value;
            // console.log(input.value);
        }
    });
});

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';

function draw(e){
    if(!allowDraw){return};
    ctx.beginPath();
    ctx.moveTo(xcord, ycord);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [xcord, ycord] = [e.offsetX, e.offsetY];
}

document.addEventListener('keydown', (e)=>{
    if(e.key==="Control"){
        allowDraw=true;
    }
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mousemove', (e)=>{
    [xcord, ycord] = [e.offsetX, e.offsetY];
});

document.addEventListener('keyup', (e)=>{
    if(e.key==="Control"){
        allowDraw=false;
    }
});



