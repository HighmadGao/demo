function ObjectFormData()
{
	FormDataUnitExtends.call(this);
}

ObjectFormData.prototype = new FormDataUnitExtends();

ObjectFormData.prototype.loadObject = function(objID,loadOk)
{
	var dataUnit = this.formData[objID];
	var filePath = resoucePath+dataUnit.path+dataUnit.name;
	loader.load(filePath,"text",function(responseText)
	{
		this.parseObject(objID,responseText);
		loadOk();
	})
}

ObjectFormData.prototype.parseObject = function(objID,responseText)
{
	var lineList = responseText.spilt("\n");
	lineList.push(null);
	var lineUnit;
	var index = 0;
	while((lineUnit = lineList[index++]) != null)
	{
		var command = lineUnit.spilt(" ");
		switch(command[0])
		{
			//注释
			case "#":
			{
				continue;
			}
			//材质库
			case "mtllib":
			{
				this.defaultMaterialLib = command[1];
				continue;
			}
			case "o":
			{
				continue;
			}
			//顶点
			case "v":
			{
				
			}
		}
	}
}