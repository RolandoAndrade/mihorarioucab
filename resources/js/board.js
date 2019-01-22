
var materias=new Array();
var r=1;


function getFontWithSize(size)
{
	return size+'px Arial, sans-serif';
}




class Header
{
	constructor()
	{
		this.days=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
		this.hourText="Hora";
		this.color="#455A64";
		this.color2="#E95050";
		this.error=false;

	}
	drawHeaderBar()
	{
		if(this.error)
		{
			ctx.fillStyle=this.color2;
		}
		else
		{
			ctx.fillStyle=this.color;
		}
		ctx.fillRect(0,0,WIDTH,ROW_HEIGHT);
	}

	putHeaderText()
	{
		ctx.font =getFontWithSize(14);
		ctx.fillStyle=WHITE;
		ctx.textAlign="center";	
		ctx.fillText("Hora",50,30);
		for(var i=0;i<NUMBER_OF_DAYS;i++)
		{
			ctx.fillText(this.days[i],LEFT_WIDTH+FIELD_WIDTH/2+FIELD_WIDTH*i,30);
		}
	}

	draw()
	{
		this.drawHeaderBar();
		this.putHeaderText();
	}
}

class Hours
{
	constructor()
	{
		this.FONT_SIZE=12;
		this.LINE_HEIGHT=(ROW_HEIGHT-this.FONT_SIZE)/2;
	}
	draw()
	{
		ctx.fillStyle="#88C0DB";
		ctx.fillRect(0,ROW_HEIGHT,LEFT_WIDTH,BOARD_HEIGHT);
		ctx.fillStyle="#fff";
		ctx.textAlign="center";
		for(var i=START_HOUR;i<END_HOUR;i++)
		{
			ctx.font =getFontWithSize(this.FONT_SIZE);
			var lineY=ROW_HEIGHT*(i-5)-this.LINE_HEIGHT;

			if(i==12)
			{
				ctx.fillText("12:00 a 1:00",LEFT_WIDTH/2,lineY);
			}
			else
			{
				ctx.fillText(i%12+":00 a "+(i%12+1)+":00",LEFT_WIDTH/2,lineY);
			}
		}
	}
}

class Footer
{
	constructor()
	{

	}

	draw()
	{
		ctx.fillStyle="#2B4749";
		ctx.fillRect(0,700,WIDTH,100);
		ctx.fillStyle="#193234";
		ctx.fillRect(0,700,100,100);
		ctx.fillStyle="#fff";
		ctx.textAlign="center";
		wrapText("¡Arrastra la materia!", LEFT_WIDTH/2, 744, LEFT_WIDTH, 12);
	}
}

class Board
{
	constructor()
	{
		this.header=new Header();
		this.hours=new Hours();
		this.footer=new Footer();
	}

	fadeColumns()
	{
		for(var i=0;i<NUMBER_OF_DAYS;i++)
		{
			if(i%2==1)
			{
				ctx.fillStyle="rgba(255,255,255,0.2)";
				ctx.fillRect(LEFT_WIDTH+FIELD_WIDTH*i,ROW_HEIGHT,FIELD_WIDTH,BOARD_HEIGHT);
			
			}
		}
	}
	changeRows()
	{
		for(var i=1;i<7;i++)
		{
			ctx.fillStyle="#8FF8F2";
			ctx.fillRect(0,i*2*ROW_HEIGHT,WIDTH,ROW_HEIGHT);
		}
	}

	draw()
	{
		ctx.fillStyle="#81E3DD";
		ctx.fillRect(0,0,WIDTH,BOARD_HEIGHT);
		this.changeRows();
		this.fadeColumns();
		this.header.draw();
		this.hours.draw();
		this.footer.draw();
	}
}