var registrationNumber=0;
function reset(subjects)
{
    if(cards.length==0)
        registrationNumber=0;
	cards.push(new Card(LEFT_WIDTH*(registrationNumber+1),HEIGHT-FOOTER_HEIGHT,FOOTER_HEIGHT,FOOTER_HEIGHT,colores[registrationNumber],subjects,registrationNumber));
	registrationNumber++;
}


var board=new Board();

function background()
{
	board.draw();

	for(var i=0;i<cards.length;i++)
	{
		cards[i].draw();
	}
		
}


var selection=null;
canvas.onmousedown=function(event)
{
	var px=(event.clientX -ClientRect.left)/r;
	var py=(event.clientY- ClientRect.top)/r;
	for(var i=0; i<cards.length;i++)
	{
		if(cards[i].x<px&&cards[i].x+cards[i].w>px&&cards[i].y<py&&cards[i].y+cards[i].h>py)
		{
			selection=cards[i];
			deleteSection();
			break;
		}
	}
};


function isACorrectClass(classTime)
{
	if(classTime==0)
	{
		selection.number=-1;
		return false;
	}
	return true;
}

canvas.onmousemove=function(event)
{
	if(selection!=null)
	{
		var px=(event.clientX -ClientRect.left)/r;
		var py=(event.clientY- ClientRect.top)/r;
		selection.move(px,py);

		if(py<700)
		{
			var x=Math.trunc((px-LEFT_WIDTH)/FIELD_WIDTH);
			var y=Math.trunc((py)/ROW_HEIGHT);
			for(var i=0;i<selection.subjects.length;i++)
			{
				var classTime = selection.subjects[i].getClassAt(x,y+6);
				if(isACorrectClass(classTime))
				{
					selection.reset();
					selection.h=classTime*ROW_HEIGHT;
					selection.actualSection=selection.subjects[i];
					break;
				}
					
			}
		}
		else
		{
			selection.reset();
		}
		background();
	}
}

function completeSection(day)
{
	if (selection.actualSection!=null) 
	{
		selection.actualSection.createCard(selection.color,selection.id,selection.subjects,day);
	}
}

function deleteSection()
{
	let i=0;
	while(i<cards.length)
	{
		if(cards[i]!=selection&&selection.id==cards[i].id)
			cards.splice(i,1);
		else
			i++;
	}
}

canvas.onmouseup=function(event)
{
	var px=(event.clientX -ClientRect.left)/r;
	var py=(event.clientY- ClientRect.top)/r;
	if(selection!=null&&px>100&&py>50)
	{
		var y=Math.trunc((py)/50);
		selection.y=ROW_HEIGHT*y;
		if(selection.y<700)
		{
			var x=Math.trunc((px-LEFT_WIDTH)/FIELD_WIDTH);
			selection.x=LEFT_WIDTH+x*FIELD_WIDTH;
			selection.w=FIELD_WIDTH;			
			if(selection.number!=-1)
				completeSection(x);
		}
		else
		{
			var x=Math.trunc((px)/100);
			selection.setBounds(LEFT_WIDTH*x,selection.y,FOOTER_HEIGHT, FOOTER_HEIGHT);
			selection.reset();
		}
			
		selection=null;
		background();
	}
}

function wrapText(text, x, y, maxWidth, lineHeight) 
{
	ctx.font ='12px Arial, sans-serif';
	ctx.textAlign="center";
	var words = text.split(' ');
	var line="";
	var salto=false;
	for(var n = 0; n < words.length; n++) 
	{
		var testLine = line + words[n] + ' ';
		var metrics = ctx.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > maxWidth && n > 0)
		{
		  ctx.fillText(line, x, y);
		  line = words[n] + ' ';
		  y += lineHeight;
		  salto=true;
		}
		else {
		  line = testLine;
		}
	}
	if(!salto)
		y+=12;
	ctx.fillText(line, x, y);
}

$(document).ready(function()
{
	/*
	var width = document.getElementById('canvas').offsetWidth;
	var height = document.getElementById('canvas').offsetHeight;
	var windowWidth = $(document).outerWidth();
	var windowHeight = $(document).outerHeight();
	r = 1;
	r = Math.min(height / windowHeight, windowHeight / height);
	console.log(r);
	$('#canvas').css({
		'-webkit-transform': 'scale(' + r + ')',
		'-moz-transform': 'scale(' + r + ')',
		'-ms-transform': 'scale(' + r + ')',
		'-o-transform': 'scale(' + r + ')',
		'transform': 'scale(' + r + ')'
	});*/


});
