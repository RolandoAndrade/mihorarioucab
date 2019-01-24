var cards=new Array();

class Subject
{
	constructor(info)
	{
		this.semester=info.semester;
		this.nrc=info.nrc;
		this.teacher=info.teacher;
		this.name=info.name;
		this.days=[new Day(info.monday),new Day(info.tuesday),new Day(info.wednesday),new Day(info.thursday),new Day(info.friday),
		new Day(info.saturday),new Day(info.sunday)];
	}
}

class Card
{
	constructor(x,y,w,h,color,subjects,number)
	{
		this.id=number;
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
		this.color=color;
		this.subjects=subjects;
		this.name=subjects[0].name;
		this.number=number;
		this.actualSection=null;
	}

	reset()
	{
		this.number=this.id;
	}

	addSubject(subject)
	{
		this.subjects.add(subject);
	}

	move(x,y)
	{
		this.x=x-this.w/2;
		this.y=y-this.h/2;
	}

	draw()
	{
		if(this.number!=-1)
		{
			ctx.fillStyle=this.color;
		}
		else
		{
			ctx.fillStyle="rgba(166,166,166,0.5)";
		}
		ctx.fillRect(this.x,this.y,this.w,this.h);
		ctx.fillStyle=WHITE;
		ctx.textAlign="center";
		wrapText(this.name, this.x+this.w/2, this.y+(this.h-12)/2, this.w, 12);
	}
	setBounds(x,y,w,h)
	{
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
	}
}