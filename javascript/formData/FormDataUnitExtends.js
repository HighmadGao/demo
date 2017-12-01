function FormDataUnitExtends()
{}

FormDataUnitExtends.prototype.init = function(filePath)
{
	loader.load(filePath,"text",this.loadOk)
}

FormDataUnitExtends.prototype.loadOk = function(responseText)
{
	var jsonData = JSON.parse(responseText);
	this.formData = [];
	for(var i = 0; i < jsonData.length; i++)
	{
		this.formData[jsonData[i].id] = jsonData[i];
	}
}