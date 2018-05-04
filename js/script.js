var interval;
var numOfCircles = 10;
var counter = 1;
var level = 1;
var timer = '25';
var win = false;
var coordinates = [];


//constructor for circle objects
class button
{
    constructor(name, row, col)
    {
        this.name = name;
        this.row = row;
        this.col = col;
    }
}

//disable game buttons upon loadding game
for(let i=1; i<=numOfCircles; i++)
{
    let circNum = i; circNum.toString();
    document.getElementById(circNum).disabled=true;
}



//conditons after clicking start
function startGame()
{
    counter = 1;
    setCircles();
    document.getElementById('message').innerHTML = "You have begun the game!";
    interval = setInterval(function(){ displayTime() }, 1000);
}


//timer and losing condition
function displayTime()
{
    document.getElementById('timer').innerHTML--;
    if(document.getElementById('timer').innerHTML==='0')
    {
        clearInterval(interval);
        document.getElementById('start').disabled = false;
        swal("Game Over! You Lose!");
        document.getElementById('message').innerHTML = "Click Start to begin the game!";
        win = false;
        resetGame();
        levelChange();
        
    }
}   

//disabling button
function disable()
{
    document.getElementById('start').disabled = true;
}

//check to see if the user has clicked right button and for winning condtion
function checkAnswer(circleNumber)
{   

    if(circleNumber === counter)
    {
        let circNum = circleNumber; circNum.toString();
        document.getElementById(circNum).style.backgroundColor = '#0bafd2';
        document.getElementById(circNum).style.color = '#404141';
        document.getElementById(circNum).innerHTML = circleNumber;
        document.getElementById(circNum).disabled=true;
        if(level===4)
        {
            for(let i=1; i<=numOfCircles; i++)
            {
                var x = Math.floor(Math.random() * 45)+50;
                var y = Math.floor(Math.random() * 45)+40;
                let coord = i-1;  coordinates[coord].row = x;  coordinates[coord].col = y;                            
                let circNum = i; circNum.toString();
                let circle = document.getElementById(circNum);
                circle.style.position = "absolute";
                var ident = '#' + i.toString();  var xCoord = x.toString() + 'vw'; var yCoord = y.toString() + 'vh';
                $(ident).animate({left: xCoord, top: yCoord});
                circle.style.left = x+"vw";
                circle.style.top = y+"vh";
            }
            checkOverlap(coordinates);
        }
        for(let j=1; j<=numOfCircles; j++)
        {
            let curCirc = j; curCirc.toString();
            if(document.getElementById(curCirc).style.backgroundColor==='brown')
            {   
                document.getElementById(curCirc).style.backgroundColor ='whitesmoke';
            }
        }
        if(circleNumber === numOfCircles)
        {
            document.getElementById(circNum).style.backgroundColor = '#0bafd2';
            document.getElementById(circNum).style.color = '#404141';
            document.getElementById(circNum).disabled=true;
            clearInterval(interval);
            document.getElementById('start').disabled = false;
            swal("Congrats on winning!!!");
            if(level === 4)
            {
                swal('Congrats you have now completed every level!');
            }
            win = true;
            resetGame();
            levelChange();
            document.getElementById('message').innerHTML = "Click Start to begin the game!";

        }
        counter++;
    }
    else
    {
        let circNum = circleNumber.toString();
        document.getElementById(circNum).style.backgroundColor = 'brown';
        document.getElementById(circNum).style.color = 'brown';
    }
}


//reset the game zone after every game
function resetGame()
{
    let x = 55;
    let y = 50;
    for(let i=1; i<=numOfCircles; i++)
    {
        let circNum = i; circNum.toString();
        let circle = document.getElementById(circNum);
        circle.style.position = "absolute";
        var ident = '#' + i.toString();  var xCoord = x.toString() + 'vw'; var yCoord = y.toString() + 'vh';
        $(ident).animate({left: xCoord, top: yCoord});
        circle.style.left = x+'vw';   
        circle.style.top = y;
        x=x+4;
        circle.style.color = 'white';
        circle.disabled=true;
        circle.style.backgroundColor = "whitesmoke";
        circle.innerHTML = '';
    }
    document.getElementById('timer').innerHTML = timer;
    setTimer();
    counter = 1;
}




//set the location of the circles on the game zone
function setCircles()
{
    for(var i=1; i<=numOfCircles; i++)
    {
        var x = Math.floor(Math.random() * 45)+50;
        var y = Math.floor(Math.random() * 45)+40;
        let coord = i-1;  coordinates[coord] = new button (i.toString(), x, y);
        let circle = document.getElementById(i.toString());
        circle.style.position = "absolute";
        var ident = '#' + i.toString();  var xCoord = x.toString() + 'vw'; var yCoord = y.toString() + 'vh';
        $(ident).animate({left: xCoord, top: yCoord}, 500);
        circle.style.color = 'whitesmoke';
        circle.disabled=false;
    }
    checkOverlap(coordinates);
}

//check for circle overlap and move overlapping ones
function checkOverlap(buttons)
{
    
    for(let n = 0; n<buttons.length; n++)
    {
        for(let j=0; j<buttons.length; j++)
        {
   
            if((buttons[n].row <= buttons[j].row+3  &&   buttons[n].row >= buttons[j].row-3)   &&   (buttons[n].col <= buttons[j].col+6   &&  buttons[n].col >= buttons[j].col-6))
            {
                if(buttons[n].name !== buttons[j].name)
                {
                    buttons[n].row = Math.floor(Math.random() * 45)+50;   
                    buttons[n].col = Math.floor(Math.random() * 45)+40; 
                    let xNew = buttons[n].row;  let yNew = buttons[n].col;  xNew = xNew.toString(); yNew = yNew.toString();
                    let ident2 = n+1; ident2 = '#' + ident2.toString(); xNew = xNew + 'vw'; yNew = yNew + 'vh';
                    $(ident2).animate({left: xNew, top: yNew}, 250);
                   checkOverlap(buttons);
                }
            }
        }
    }
}


//set the timer before every game
function setTimer()
{
    if(level===1)
    {
        timer = '25';
        
    }
    else 
    {
        timer ='20';
    }
}


//change the level after winning
function levelChange()
{
    if(level===1 && win === true)
    {
        document.getElementById('game').innerHTML = 'Game Zone: Level 2';
        document.getElementById('list').innerHTML = 'Rules for Level 2:';
        document.getElementById('L.1').innerHTML = 'You now have 20 seconds.';
        document.getElementById('L.8').innerHTML = 'Your time limit has decreased.';
        timer = '20';
        document.getElementById('timer').innerHTML = '20';
        level++;
    }
    else if(level===2 && win === true)
    {
        document.getElementById('list').innerHTML = 'Rules for Level 3:';
        document.getElementById('game').innerHTML = 'Game Zone: Level 3';
        document.getElementById('L.8').innerHTML = 'The circles are now samller.';
        for(let i=1; i<=numOfCircles; i++)
        {
            let ident = i;  ident = ident.toString();
            document.getElementById(ident).style.fontSize = .75+"vw";
            document.getElementById(ident).style.minHeight = 4.5+"vh";
            document.getElementById(ident).style.minWidth = 2.25+"vw";
        }
        level++;
    }
    else if(level===3 && win === true)
    {
        document.getElementById('list').innerHTML = 'Rules for Level 4:';
        document.getElementById('game').innerHTML = 'Game Zone: Level 4';
        document.getElementById('L.8').innerHTML = "This is the final level, the circles will shift every time you find the right number.";
        level++;
    }
}

