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