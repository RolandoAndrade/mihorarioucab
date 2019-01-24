class GetRequest
{
	constructor(request)
	{
		this.url=request;
	}

	async execute()
	{
		return await fetch(this.url).then(response => response.json()).then(json => {return json;}).catch(e => {return e});
	}
}

class CareerDao
{
	async getById(id)
	{
		var request = new GetRequest("/api/career/view/"+id);
		return await request.execute();
	}

	async getAll()
	{
		var request = new GetRequest("/api/career/all/cut");
		return await request.execute();
	}
}

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

class Career
{
    constructor(id, name)
    {
        this.id=id;
        this.name=name;
        this.subjects=[];
    }
    addSubject(subject)
    {
        for(let i=0;i<this.subjects.length;i++)
            if(this.subjects[i][0].name===subject.name)
            {
                this.subjects[i].push(subject);
                return;
            }
        this.subjects.push([subject]);
    }


    nameOfSubject(index)
    {
        return this.subjects[index][0].name;
    }

    semesterOfSubject(index)
    {
        return this.subjects[index][0].semester;
    }
}
class CareerSubject
{
    constructor(id, semester, nrc, teacher, name, days)
    {
        this.id=id;
        this.semester = semester;
        this.nrc = nrc;
        this.teacher = teacher;
        this.name = name;
        this.days = days;
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

class JSONParser
{
    parseCareer(json)
    {
        if(json.career_id)
        {
            let career=new Career(json.career_id,json.name);
            if(json.subjects)
                for(let i=0;i<json.subjects.length;i++)
                {
                    career.addSubject(this.parseSubject(json.subjects[i]));
                }
            return career;
        }
        return null;
    }
    parseSubject(json)
    {
        if(json.subject_id)
        {
            let days=[new Day(json.monday),new Day(json.tuesday),
                new Day(json.wednesday),new Day(json.thursday),
                new Day(json.friday), new Day(json.saturday),
                new Day(json.sunday)];
            return new CareerSubject(json.subject_id, json.semester, json.nrc, json.teacher, json.name, days);
        }
        return null;
    }
}

class Manager
{
    constructor()
    {
        this.dao=new CareerDao();
        this.parser=new JSONParser();
    }
    async getById(id)
    {
        const response=await this.dao.getById(id);
        return this.parser.parseCareer(response);
    }
    async getAll()
    {
        const response=await this.dao.getAll();
        let careers=[];
        for(let i=0;i<response.length;i++)
        {
            careers.push(this.parser.parseCareer(response[i]));
        }
        return careers;
    }
}