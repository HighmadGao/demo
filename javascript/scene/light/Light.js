function Light()
{
	this.pointLight = new Float32Array([10.0,20.0,0.0,0.7,0.7,0.0]);
	this.directionalLight = new Float32Array([1.0,1.0,1.0,0.6,0.0,0.0]);
	this.ambientLight = new Float32Array([0.3,0.3,0.6]);
}

Light.prototype = new DisplayElement();

Light.prototype.uploadLightUniform = function()
{
	var u_PointLight = gl.getUniformLocation(gl.program,"u_PointLight");
	gl.uniform3f(u_PointLight,this.pointLight[0],this.pointLight[1],this.pointLight[2]);
	var u_PointLightColor = gl.getUniformLocation(gl.program,"u_PointLightColor");
	gl.uniform3f(u_PointLightColor,this.pointLight[3],this.pointLight[4],this.pointLight[5]);
	var u_DirectionalLight = gl.getUniformLocation(gl.program,"u_DirectionalLight");
	gl.uniform3f(u_DirectionalLight,this.directionalLight[0],this.directionalLight[1],this.directionalLight[2]);
	var u_DirectionalLightColor = gl.getUniformLocation(gl.program,"u_DirectionalLightColor");
	gl.uniform3f(u_DirectionalLightColor,this.directionalLight[3],this.directionalLight[4],this.directionalLight[5]);
	var u_AmbientLightColor = gl.getUniformLocation(gl.program,"u_AmbientLightColor");
	gl.uniform3f(u_AmbientLightColor,this.ambientLight[0],this.ambientLight[1],this.ambientLight[2]);
}