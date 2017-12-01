function LoaderUnit()
{
	this.request = new XMLHttpRequest();
}

LoaderUnit.prototype.load = function(filePath,responseType,onLoadFunc)
{
	var requestParent = this;
	this.request.onreadystatechange = function()
	{
		if(requestParent.request.readyState === 4 && requestParent.request.status !== 404)
		{
			if(responseType == "text")
			{
				onLoadFunc(requestParent.request.responseText);
			}
		}
	};
	this.request.open("GET", filePath, true);
	this.request.send();
}