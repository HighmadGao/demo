/*
	shader编译器
*/
function ShaderCompiler()
{
	this.programList = []
	this.programListState = [];
	this.programCompileCallback = [];
	this.vertexShaderList = [];
	this.vertexShaderStrList = [];
	this.fragmentShaderList = [];
	this.fragmentShaderStrList = [];
	this.shaderPath = "http://localhost/html/webGl/3DScene/resource/shader/";
	this.currentProgram = null;
}

ShaderCompiler.prototype.compileProgram = function(shaderName,compileOkFunc)
{
	//program已经创建完成，那么直接回调
	if(this.programListState[shaderName] == 1)
	{
		compileOkFunc();
	}
	//program正在被创建，则暂存完成回调
	else if(this.programListState[shaderName] == 0)
	{
		this.programCompileCallback[shaderName].push(compileOkFunc);
	}
	//program没有被创建，则进入创建program流程
	else
	{
		this.programListState[shaderName] = 0;
		this.programCompileCallback[shaderName] = [compileOkFunc];
		this.createProgram(shaderName);
	}
}

ShaderCompiler.prototype.createProgram = function(shaderName)
{
	//标记是否向program分配了shader
	var attachVertex = false;
	var attachFragment = false;
	this.programList[shaderName] = gl.createProgram();
	if (!this.programList[shaderName])
	{
		console.log('Failed to create program');
		return;
	}
	//如果顶点着色器已经存在，那么分配给program
	if(this.vertexShaderList[shaderName])
	{
		attachShader(this,shaderName,gl.VERTEX_SHADER);
	}
	//如果不存在，那么创建并编译顶点着色器
	else
	{
		this.createAndCompileShader(shaderName,gl.VERTEX_SHADER,attachShader);

	}
	//如果片段着色器已经存在，那么分配给program
	if(this.fragmentShaderList[shaderName])
	{
		attachShader(this,shaderName,gl.FRAGMENT_SHADER);
	}
	//如果不存在，那么创建并编译片段着色器
	else
	{
		this.createAndCompileShader(shaderName,gl.FRAGMENT_SHADER,attachShader);
	}

	function attachShader(parent,shaderName,type)
	{
		if(type == gl.VERTEX_SHADER)
		{
			gl.attachShader(parent.programList[shaderName],parent.vertexShaderList[shaderName]);
			attachVertex = true;
		}else if(type == gl.FRAGMENT_SHADER)
		{
			gl.attachShader(parent.programList[shaderName],parent.fragmentShaderList[shaderName]);
			attachFragment = true;
		}
		if(attachVertex && attachFragment)
		{
			gl.linkProgram(parent.programList[shaderName]);
			var linked = gl.getProgramParameter(parent.programList[shaderName], gl.LINK_STATUS);
			if(!linked)
			{
				var error = gl.getProgramInfoLog(parent.programList[shaderName]);
				console.log('Failed to link program: ' + error);
				gl.deleteProgram(parent.programList[shaderName]);
				gl.deleteShader(parent.fragmentShaderList[shaderName]);
				gl.deleteShader(parent.vertexShaderList[shaderName]);
	    		return;
			}
			parent.programListState[shaderName] = 1;
			while(parent.programCompileCallback[shaderName].length > 0)
			{
				parent.programCompileCallback[shaderName].shift()();
			}
		}
	}
}

ShaderCompiler.prototype.createAndCompileShader = function(shaderName,type,attachShader)
{
	if(type == gl.VERTEX_SHADER)
	{
		this.vertexShaderList[shaderName] = gl.createShader(gl.VERTEX_SHADER);
		if(this.vertexShaderList[shaderName] == null)
		{
			console.log('unable to create vertex shader');
			return;
		}
		if(this.vertexShaderStrList[shaderName])
		{
			compileVertexShader(this,shaderName);
		}else
		{
			this.loadShader(shaderName,type,compileVertexShader);
		}
	}else if(type == gl.FRAGMENT_SHADER)
	{
		this.fragmentShaderList[shaderName] = gl.createShader(gl.FRAGMENT_SHADER);
		if(this.fragmentShaderList[shaderName] == null)
		{
			console.log('unable to create fragment shader');
			return;
		}
		if(this.fragmentShaderStrList[shaderName])
		{
			compileFragmentShader(this,shaderName);
		}else
		{
			this.loadShader(shaderName,type,compileFragmentShader);
		}
	}

	function compileVertexShader(parent,shaderName)
	{
		gl.shaderSource(parent.vertexShaderList[shaderName],parent.vertexShaderStrList[shaderName]);
		gl.compileShader(parent.vertexShaderList[shaderName]);
		var compiled = gl.getShaderParameter(parent.vertexShaderList[shaderName], gl.COMPILE_STATUS);
		if(!compiled)
		{
			var error = gl.getShaderInfoLog(parent.vertexShaderList[shaderName]);
			console.log('Failed to compile vertex shader: ' + error);
			gl.deleteShader(parent.vertexShaderList[shaderName]);
			return;
		}
		attachShader(parent,shaderName,gl.VERTEX_SHADER);
	}

	function compileFragmentShader(parent,shaderName)
	{
		gl.shaderSource(parent.fragmentShaderList[shaderName],parent.fragmentShaderStrList[shaderName]);
		gl.compileShader(parent.fragmentShaderList[shaderName]);
		var compiled = gl.getShaderParameter(parent.fragmentShaderList[shaderName], gl.COMPILE_STATUS);
		if(!compiled)
		{
			var error = gl.getShaderInfoLog(parent.fragmentShaderList[shaderName]);
			console.log('Failed to compile fragment shader: ' + error);
			gl.deleteShader(parent.fragmentShaderList[shaderName]);
			return;
		}
		attachShader(parent,shaderName,gl.FRAGMENT_SHADER);
	}
}

ShaderCompiler.prototype.loadShader = function(shaderName,type,loadOkCallback)
{
	var request = new XMLHttpRequest();
	var parent = this;
	request.onreadystatechange = function(){onReadyStateChange(parent,shaderName,type)};
	
	if(type == gl.VERTEX_SHADER)
	{
		var filePath = this.shaderPath+shaderName+".vtx";
	}else if(type == gl.FRAGMENT_SHADER)
	{
		filePath = this.shaderPath+shaderName+".frg";
	}
	request.open("GET", filePath, true);
	request.send();

	function onReadyStateChange(parent,shaderName,type)
	{
		if(request.readyState === 4 && request.status !== 404)
		{
			if(type == gl.VERTEX_SHADER)
			{
				parent.vertexShaderStrList[shaderName] = request.responseText;
			}else if(type == gl.FRAGMENT_SHADER)
			{
				parent.fragmentShaderStrList[shaderName] = request.responseText;
			}
			loadOkCallback(parent,shaderName);
		}
	}
}

ShaderCompiler.prototype.useProgram = function(programName)
{
	if(this.currentProgram != programName)
	{
		gl.useProgram(this.programList[programName]);
		gl.program = this.programList[programName];
		this.currentProgram = programName;
	}
}