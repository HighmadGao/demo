function Scene()
{
	DisplayElement.call(this);
}

Scene.prototype = new DisplayElement();

Scene.prototype.init = function()
{
	this.root = this;
	this.isRoot = true;
	this.camera = new Camera();
	this.light = new Light();
	this.defaultFlat = new Rectangle();
	this.defaultFlat.setColor(0.5,0.5,0.5,1.0);
	this.defaultFlat.scaleX = this.defaultFlat.scaleY = this.defaultFlat.scaleZ = 50;
	this.addElement(this.camera);
	this.addElement(this.light);
	this.addElement(this.defaultFlat);
}

Scene.prototype.resize = function()
{
	this.camera.resize();
}

Scene.prototype.uploadCameraAndLight = function()
{
	var u_ProjMatrix = gl.getUniformLocation(gl.program,"u_ProjMatrix");
	gl.uniformMatrix4fv(u_ProjMatrix,false,this.camera.projMatrix.elements);
	var u_ViewMatrix = gl.getUniformLocation(gl.program,"u_ViewMatrix");
	gl.uniformMatrix4fv(u_ViewMatrix,false,this.camera.viewMatrix.elements);
	var u_PointLight = gl.getUniformLocation(gl.program,"u_PointLight");
	gl.uniform3f(u_PointLight,this.light.pointLight[0],this.light.pointLight[1],this.light.pointLight[2]);
	var u_PointLightColor = gl.getUniformLocation(gl.program,"u_PointLightColor");
	gl.uniform3f(u_PointLightColor,this.light.pointLight[3],this.light.pointLight[4],this.light.pointLight[5]);
	var u_DirectionalLight = gl.getUniformLocation(gl.program,"u_DirectionalLight");
	gl.uniform3f(u_DirectionalLight,this.light.directionalLight[0],this.light.directionalLight[1],this.light.directionalLight[2]);
	var u_DirectionalLightColor = gl.getUniformLocation(gl.program,"u_DirectionalLightColor");
	gl.uniform3f(u_DirectionalLightColor,this.light.directionalLight[3],this.light.directionalLight[4],this.light.directionalLight[5]);
	var u_AmbientLightColor = gl.getUniformLocation(gl.program,"u_AmbientLightColor");
	gl.uniform3f(u_AmbientLightColor,this.light.ambientLight[0],this.light.ambientLight[1],this.light.ambientLight[2]);
}