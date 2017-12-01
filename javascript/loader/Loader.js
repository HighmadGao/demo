function Loader()
{
	this.loaderMark = new Mark();
	this.loaderMark.init(LoaderUnit,100);
	this.waitingList = [];
}

Loader.prototype.load = function(filePath,responseType,onLoadFunc)
{
	var loaderUnit = this.loaderMark.applyForUnit();
	var loader = this;
	if(loaderUnit)
	{
		loaderUnit.load(filePath,responseType,loadOk);
	}else
	{
		this.waitingList.push([filePath,responsetype,onLoadFunc]);
	}

	function loadOk(response)
	{
		loader.loaderMark.releaseUnit(loader);
		onLoadFunc(response);
		loader.checkWaitingList();
	}
}

Loader.prototype.checkWaitingList = function()
{
	if(this.waitingList.length > 0)
	{
		this.load.apply(this,this.waitingList.shift());
	}
}