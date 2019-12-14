let coordinates = new Map();
let counter = 1;
let time = 25;
let numOfCircles = 10;
let win = false;
let timeout;

////////////////////////////////////////////////////////////////////

function timer(){
    document.getElementById('timer').innerText--;
    if (document.getElementById('timer').innerText==='0'){
        reset();
        swal("You ran out of time please try again...");
        return;
    }
    timeout = setTimeout(timer, 1000);
}

////////////////////////////////////////////////////////////////////

function makeCircles(){
    for (let i=1; i<=numOfCircles; i++){
        let elem = document.createElement('button');
        elem.className = 'circle';
        elem.id = i;
        elem.addEventListener('click', function(){
            checkAnswer(i);
        });
        elem.disabled = true;
        document.getElementById('game').appendChild(elem);
    }
}
makeCircles();

////////////////////////////////////////////////////////////////////

function enableCirles(){
    for (let i=1; i<=numOfCircles; i++){
        document.getElementById(i).disabled = false;
    }
}
function disableCircles(){
    for (let i=1; i<=numOfCircles; i++){
        document.getElementById(i).disabled = true;
    }
}

////////////////////////////////////////////////////////////////////

function toggleStartDisable(){
    if (document.getElementById('start').disabled === true){
        document.getElementById('start').disabled = false;
        return;
    }
    document.getElementById('start').disabled = true;
    return;
}

////////////////////////////////////////////////////////////////////

function moveCircles(){
    for (let i=1; i<=numOfCircles; i++){
        document.getElementById(i.toString()).style.position = "absolute";
        let coord = move(i);
        coordinates.set(i, coord);
        checkOverlap(coord, i);
    }

}
function checkOverlap(circleCoord, circNum){
    coordinates.forEach(coordinate => {
        if(circleCoord.x === coordinate.x  &&  circleCoord.y === coordinate.y){
            return;
        }
        if (circleCoord.x <= coordinate.x+5  &&  circleCoord.x >= coordinate.x-5  &&  
            circleCoord.y <= coordinate.y+5  &&  circleCoord.y >= coordinate.y-5){
            let coord = move(circNum);
            coordinates.set(circNum, coord);
            checkOverlap(coord, circNum);
        }
    });
}
function move(circNum){
    let x = Math.floor(Math.random() * 80) + 10;
    let y = Math.floor(Math.random() * 50) + 20;
    let xCoord = x.toString() + 'vw';
    let yCoord = y.toString() + 'vh';
    let coord = { x:x, y:y };
    let ident = '#' + circNum.toString();  
    $(ident).animate({left: xCoord, top: yCoord}, 500);
    return coord;
}

////////////////////////////////////////////////////////////////////

function checkAnswer(num){
    if(num === counter){
        let elem = document.getElementById(num.toString());
        elem.style.backgroundColor = '#0bafd2';
        elem.style.color = '#404141';
        elem.innerText = num;
        elem.disabled = true;
        if (counter === numOfCircles){
            reset();
            swal("Congrats on winning!!!");
            return;
        }
        counter++;
        for (let j=1; j<=numOfCircles; j++){
            if(document.getElementById(j.toString()).style.backgroundColor==='brown'){   
                document.getElementById(j.toString()).style.backgroundColor ='whitesmoke';
            }
        }
        return;
    }
    document.getElementById(num).style.backgroundColor = 'brown';
    document.getElementById(num).innerText = '';
}

////////////////////////////////////////////////////////////////////

function reset(){
    for (let i=1; i<=numOfCircles; i++){
        let elem = document.getElementById(i.toString());
        elem.style.backgroundColor ='whitesmoke';
        elem.innerHTML ='';
    }
    counter = 1;
    document.getElementById('timer').innerText = time;
    disableCircles();
    toggleStartDisable();
    clearTimeout(timeout);
}

////////////////////////////////////////////////////////////////////

function startGame(){
    enableCirles();
    toggleStartDisable();
    moveCircles();
    timer();
}