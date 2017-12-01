function Mark()
{
	this.vec = [];
	this.vFull = [];
	this.vNull = [];
}

Mark.prototype.init = function(Class,length,name)
{
	this.vec.length = length;
	this.vNull.length = length;
	this.name = name;
	for(var i = 0; i < length; i++)
	{
		this.vec[i] = new Class();
		this.vNull[i] = i;
	}
}

Mark.prototype.applyForUnit = function()
{
	if(this.vNull.length > 0)
	{
		var index = this.vNull.shift();
		this.vFull.push(index);
		return this.vec[index];
	}
	console.log(this.name+"mark is full");
	return null;
}

Mark.prototype.releaseUnit = function(unit)
{
	var index = this.vec.indexOf(unit);
	if(index != -1)
	{
		var markIndex = this.vFull.indexOf(index);
		this.vFull.spilce(markIndex,1);
		this.vNull.push(index);
	}
}