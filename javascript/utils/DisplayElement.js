function DisplayElement()
{
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.rx = 0;
	this.ry = 0;
	this.rz = 0;
	this.sx = 1;
	this.sy = 1;
	this.sz = 1;
	this.elements = [];
	this.root = null;
	this.isRoot = false;
	this.index = 0;
	this.scaleX = this.scaleY = this.scaleZ = 1;
	this.vertexShader = null;
	this.fragmentShader = null;
	this.canRender = false;
	this.needRender = false;
	this.parent = null;
	this.modelMatrix = new Matrix4();
	this.shaderName = null;
}

DisplayElement.prototype.addElement = function(element)
{
	this.elements.push(element);
	element.index = this.elements.length-1;
	element.parent = this;
}

DisplayElement.prototype.removeElement = function(element)
{
	this.elements.splice(element.index,1);
	element.parent = null;
}

DisplayElement.prototype.setColor = function(r,g,b,a)
{
	this.color[0] = r;
	this.color[1] = g;
	this.color[2] = b;
	this.color[3] = a;
}

DisplayElement.prototype.updateMatrix = function()
{
	// this.needRender = true;
	// console.log("updateMatrix");
}

DisplayElement.prototype.initShader = function(name)
{
	var parent = this;
	shaderCompiler.compileProgram(name,function()
		{
			parent.canRender = true;
			parent.initBuffers();
		});
}

DisplayElement.prototype.updateUniformData = function()
{
}

DisplayElement.prototype.drawTriangles = function()
{
	if(this.canRender && this.needRender)
	{
		console.log("drawTriangles");
	}
}