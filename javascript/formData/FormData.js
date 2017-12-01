function FormData()
{}

FormData.prototype.init = function()
{
	this.shaderFormData = new ShaderFormData();
	this.shaderFormData.init(resourcePath+"json/Shader.json");
	this.objectFormData = new ObjectFormData();
	this.objectFormData.init(resourcePath+"json/Object.json");
	this.materialFormData = new MaterialFormData();
	this.materialFormData.init(resourcePath+"json/Material.json");
}