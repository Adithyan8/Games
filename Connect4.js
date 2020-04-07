var player1=prompt(" PLAYER 1 Enter your name (Your red): ");
var player1num=1;
var player1color= 'rgb(255, 8, 0)';

var player2=prompt(" PLAYER 2 Enter your name (Your blue): ");
var player2num=-1;
var player2color= 'rgb(255, 0, 242)';

var table = $('tr')
var currentcolor=player1color;
var currentname = player1;
var currentplayernum=1;
$('.currentplayer').text(player1 + " it is your turn.You are RED " );
var game=true;
var count=0;

function changecolor(row,col,currentcolor)
{
    return table.eq(row).find('td').eq(col).find('button').css('background-color',currentcolor);
}

function returncolor(row,col)
{
    return table.eq(row).find('td').eq(col).find('button').css('background-color');
}

function bottompos(col)
{
    var temp=returncolor(4,col);
    for(var i=4;i>-1;i--)
    {
        temp=returncolor(i,col);
        if(temp === 'rgb(255, 255, 255)')
        {   
             return i;
        }
    }
}

function colormatch(cell1,cell2,cell3,cell4)
{
    if(cell1 === cell2 && cell2===cell3 && cell3===cell4 && cell1!='rgb(255, 255, 255)' && cell1!=undefined)
        return true;
    else 
        return false;    
}

function horizontal()
{
    for(var r=4;r>-1;r--)
    {
        for(var c=0;c<3;c++)
        {
            if(colormatch(returncolor(r,c),returncolor(r,c+1),returncolor(r,c+2),returncolor(r,c+3)))
            {
                wincolor=returncolor(r,c);
                return true;
            }
        }
    }
    return false;
}

function vertical()
{
    for(var c=0;c<6;c++)
    {
        for(var r=0;r<2;r++)
        {
            if(colormatch(returncolor(r,c),returncolor(r+1,c),returncolor(r+2,c),returncolor(r+3,c)))
            {
                wincolor=returncolor(r,c);
                return true;
            }
        }
    }
}

function diagonal()
{
    for(var r=0;r<2;r++)
    {
        for(var c=0;c<6;c++)
        {
            if(colormatch(returncolor(r,c),returncolor(r+1,c-1),returncolor(r+2,c-2),returncolor(r+3,c-3)))
            {
                wincolor=returncolor(r,c);
                return true;
            }
            else if(colormatch(returncolor(r,c),returncolor(r+1,c+1),returncolor(r+2,c+2),returncolor(r+3,c+3)))
            {
                wincolor=returncolor(r,c);
                return true;
            }
        }
    }
    return false;
}


$('button').on('click',function()
{
    ++count;
    var col = $(this).closest('td').index();
    var bottomrow = bottompos(col);
    changecolor(bottomrow,col,currentcolor);

    if(horizontal() || vertical() || diagonal())
    {
        $('.currentplayer').text("Refresh to play again");
        $('.win').text("Congratulations " + currentname + " ! You win.");
        game=false;
    }
    else if(count === 30)
    {
        $('.currentplayer').text("Refresh to play again");
        $('.win').text("DRAW!!");
        game=false;
    }

    currentplayernum*=-1;
    if(currentplayernum === player1num && game)
    {
        currentname = player1;
        currentcolor = player1color;
        $('.currentplayer').text(currentname + " it is your turn.You are RED " );
    }
    else if(currentplayernum === player2num && game)
    {
        currentname = player2;
        currentcolor = player2color;
        $('.currentplayer').text(currentname + " it is your turn.You are BLUE");
    }
        
});