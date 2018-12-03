var cards=new Array();

class Day
{
	constructor(hour)
	{
		try
		{
			this.startHour=parseInt(hour.substr(0,2));
			this.endHour=parseInt(hour.substr(2,4));
		}
		catch(e)
		{
			this.startHour=NaN;
			this.endHour=NaN;
		}
		
	}

	isAtMyStartHour(hour)
	{
		return hour==this.startHour;
	}

	hasAClass()
	{
		return !isNaN(this.startHour);
	}

	getDiference()
	{
		return this.endHour-this.startHour;
	}
}

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

	getClassAt(day, hour)
	{
		try
		{
			
			if(this.days[day].isAtMyStartHour(hour))
			{
				return this.days[day].getDiference();
			}
			return 0;
		}
		catch(e)
		{
			return 0;
		}
		
	}

	createCard(color, number, others,day)
	{
		for (var i = 0; i < this.days.length; i++) 
		{
			if(day!=i)
			{
				if(this.days[i].hasAClass())
				{
					var x=LEFT_WIDTH+i*FIELD_WIDTH;
					var y=(this.days[i].startHour-START_HOUR+1)*ROW_HEIGHT;
					var w=FIELD_WIDTH;
					var h=this.days[i].getDiference()*ROW_HEIGHT;
					cards.push(new Card(x,y,w,h,color,others,number));
				}
			}
			
		}
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