function Rectangle()
{
	DisplayElement.call(this);
	this.vertices = new Float32Array([0.5,0.0,-0.5, -0.5,0.0,-0.5, -0.5,0.0,0.5, 0.5,0.0,0.5]);
	this.indices = new Uint8Array([0,1,2, 0,2,3]);
	this.normals = new Float32Array([0.0,1.0,0.0, 0.0,1.0,0.0, 0.0,1.0,0.0, 0.0,1.0,0.0])
	this.color = new Float32Array([1.0,1.0,1.0,1.0]);
	this.shaderName = "rectangle";
	this.initShader(this.shaderName);
}

Rectangle.prototype = new DisplayElement();

Rectangle.prototype.initBuffers = function()
{
	this.vertexBuffer = gl.createBuffer();
	this.indexBuffer = gl.createBuffer();
	this.normalBuffer = gl.createBuffer();
}

Rectangle.prototype.uploadBuffers = function()
{
	var a_Position = gl.getAttribLocation(gl.program,"a_Position");
	gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,this.vertices,gl.STATIC_DRAW);
	gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,12,0);
	gl.enableVertexAttribArray(a_Position);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.indices,gl.STATIC_DRAW);
	var a_Normal = gl.getAttribLocation(gl.program,"a_Normal");
	gl.bindBuffer(gl.ARRAY_BUFFER,this.normalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,this.normals,gl.STATIC_DRAW);
	gl.vertexAttribPointer(a_Normal,3,gl.FLOAT,false,12,0);
	gl.enableVertexAttribArray(a_Normal);
}

Rectangle.prototype.updateMatrix = function()
{
	this.needRender = true;
	if(!this.modelMatrix)
	{
		this.modelMatrix = new Matrix4();
	}
	this.modelMatrix.set(this.parent.modelMatrix);
	this.modelMatrix.translate(this.x,this.y,this.z);
	this.modelMatrix.rotate(this.rx,1,0,0);
	this.modelMatrix.rotate(this.ry,0,1,0);
	this.modelMatrix.rotate(this.rz,0,0,1);
	this.modelMatrix.scale(this.sx,this.sy,this.sz);
	if(!this.normalMatrix)
	{
		this.normalMatrix = new Matrix4();
	}
	this.normalMatrix.setInverseOf(this.modelMatrix);
	this.normalMatrix.transpose();
}

Rectangle.prototype.updateUniformData = function()
{
	scene.uploadCameraAndLight();
	var u_ModelMatrix = gl.getUniformLocation(gl.program,"u_ModelMatrix");
	gl.uniformMatrix4fv(u_ModelMatrix,false,this.modelMatrix.elements);
	var u_Color = gl.getUniformLocation(gl.program,"u_Color");
	gl.uniform4fv(u_Color,this.color);
	var u_Scale = gl.getUniformLocation(gl.program,"u_Scale");
	gl.uniform3f(u_Scale,this.scaleX,this.scaleY,this.scaleZ);
	var u_NormalMatrix = gl.getUniformLocation(gl.program,"u_NormalMatrix");
	gl.uniformMatrix4fv(u_NormalMatrix,false,this.normalMatrix.elements);

}

Rectangle.prototype.drawTriangles = function()
{
	if(this.canRender && this.needRender)
	{
		shaderCompiler.useProgram(this.shaderName);
		this.uploadBuffers();
		this.updateUniformData();
		gl.drawElements(gl.TRIANGLES,this.indices.length,gl.UNSIGNED_BYTE,0);
	}
}