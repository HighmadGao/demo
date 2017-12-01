function Camera()
{
	this.y = 15;
	this.z = 65;
	this.rx = -9;
	this.viewMatrix = new Matrix4();
	this.projMatrix = new Matrix4();
	this.moveSpeed = new Vector3([0,0,-0.1]);
	this.projMatrix.setPerspective(30,canvasOne.width/canvasOne.height,0.1,1000);
	this.init();
}

Camera.prototype = new DisplayElement();

Camera.prototype.init = function()
{
	this.cameraMatrix = new Matrix4();
	this.viewPos = new Vector3([0,0,-1]);
}

Camera.prototype.resize = function()
{
	// this.projMatrix.setPerspective(30,canvasOne.width/canvasOne.height,1,10000);
}

Camera.prototype.updateMatrix = function()
{
	this.updateCamera();
	// this.cameraMatrix.setTranslate(this.x,this.y,this.z);
	this.cameraMatrix.setRotate(this.rx,1,0,0);
	this.cameraMatrix.rotate(this.ry,0,1,0);
	this.cameraMatrix.rotate(this.rz,0,0,1);
	// this.cameraMatrix.scale(this.sx,this.sy,this.sz);
	this.viewPos = this.cameraMatrix.multiplyVector3(new Vector3([0,0,-1]));
	// this.viewMatrix.setPerspective(30,canvasOne.width/canvasOne.height,0.1,1000);
	this.viewMatrix.setLookAt(this.x,this.y,this.z,this.x+this.viewPos.elements[0],this.y+this.viewPos.elements[1],this.z+this.viewPos.elements[2],0,1,0);
	// this.viewMatrix.setLookAt(this.x,this.y,this.z,0,0,0,0,1,0);
}

Camera.prototype.updateCamera = function()
{
	if(keyList["ArrowUp"])
	{
		var arrowUp = new Matrix4().setRotate(this.ry,0,1,0).multiplyVector3(this.moveSpeed);
	}else
	{
		arrowUp = new Vector3([0,0,0]);
	}
	if(keyList["ArrowDown"])
	{
		var arrowDown = new Matrix4().setRotate(this.ry+180,0,1,0).multiplyVector3(this.moveSpeed);
	}else
	{
		arrowDown = new Vector3([0,0,0]);
	}
	if(keyList["ArrowLeft"])
	{
		var arrowLeft = new Matrix4().setRotate(this.ry+90,0,1,0).multiplyVector3(this.moveSpeed);
	}else
	{
		arrowLeft = new Vector3([0,0,0]);
	}
	if(keyList["ArrowRight"])
	{
		var arrowRight = new Matrix4().setRotate(this.ry-90,0,1,0).multiplyVector3(this.moveSpeed);
	}else
	{
		arrowRight = new Vector3([0,0,0]);
	}
	if(keyList["Home"])
	{
		var home = new Vector3([0,0.1,0]);
	}else
	{
		home = new Vector3([0,0,0]);
	}
	if(keyList["End"])
	{
		var end = new Vector3([0,-0.1,0]);
	}else
	{
		end = new Vector3([0,0,0]);
	}
	if(keyList["PageUp"])
	{
		if(this.rx < 90)
		{
			this.rx += 1;
		}
	}
	if(keyList["PageDown"])
	{
		if(this.rx > -90)
		{
			this.rx -= 1;
		}
	}
	this.x += arrowUp.elements[0]+arrowDown.elements[0]+arrowLeft.elements[0]+arrowRight.elements[0]+home.elements[0]+end.elements[0];
	this.y += arrowUp.elements[1]+arrowDown.elements[1]+arrowLeft.elements[1]+arrowRight.elements[1]+home.elements[1]+end.elements[1];
	this.z += arrowUp.elements[2]+arrowDown.elements[2]+arrowLeft.elements[2]+arrowRight.elements[2]+home.elements[2]+end.elements[2];
}

Camera.prototype.uploadCameraUniform = function()
{
	var u_ProjMatrix = gl.getUniformLocation(gl.program,"u_ProjMatrix");
	gl.uniformMatrix4fv(u_ProjMatrix,false,this.projMatrix.elements);
	var u_ViewMatrix = gl.getUniformLocation(gl.program,"u_ViewMatrix");
	gl.uniformMatrix4fv(u_ViewMatrix,false,this.viewMatrix.elements);
}
