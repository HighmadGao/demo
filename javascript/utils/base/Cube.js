function Cube()
{
	DisplayElement.call(this);
	this.vertices = new Float32Array([ 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5,-0.5, 0.5,  0.5,-0.5, 0.5,		//front
									   0.5,-0.5,-0.5,  0.5, 0.5,-0.5, -0.5, 0.5,-0.5, -0.5,-0.5,-0.5,		//back
									  -0.5, 0.5, 0.5, -0.5, 0.5,-0.5, -0.5,-0.5,-0.5, -0.5,-0.5, 0.5,		//left
									   0.5, 0.5,-0.5,  0.5, 0.5, 0.5,  0.5,-0.5, 0.5,  0.5,-0.5,-0.5,		//right
									   0.5, 0.5,-0.5, -0.5, 0.5,-0.5, -0.5, 0.5, 0.5,  0.5, 0.5, 0.5,		//top
									   0.5,-0.5, 0.5, -0.5,-0.5, 0.5, -0.5,-0.5,-0.5,  0.5,-0.5,-0.5]);		//bottom);
	this.indices = new Uint8Array([ 0, 1, 2, 0, 2, 3,	//front
									4, 5, 6, 4, 6, 7,	//back
									8, 9,10, 8,10,11,	//left
								   12,13,14,12,14,15,	//right
								   16,17,18,16,18,19,	//top
								   20,21,22,20,22,23]);//bottom);
	this.normals = new Float32Array([ 0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,		//front
										0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0,		//back
									   -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,		//left
									    1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,		//right
									    0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,		//top
									    0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0]);		//bottom)
	this.color = new Float32Array([1.0,1.0,1.0,1.0]);
	this.shaderName = "rectangle";
	this.initShader(this.shaderName);
}

Cube.prototype = new DisplayElement();

Cube.prototype.initBuffers = function()
{
	this.vertexBuffer = gl.createBuffer();
	this.indexBuffer = gl.createBuffer();
	this.normalBuffer = gl.createBuffer();
}

Cube.prototype.uploadBuffers = function()
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

Cube.prototype.updateMatrix = function()
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

Cube.prototype.updateUniformData = function()
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

Cube.prototype.drawTriangles = function()
{
	if(this.canRender && this.needRender)
	{
		shaderCompiler.useProgram(this.shaderName);
		this.uploadBuffers();
		this.updateUniformData();
		gl.drawElements(gl.TRIANGLES,this.indices.length,gl.UNSIGNED_BYTE,0);
	}
}