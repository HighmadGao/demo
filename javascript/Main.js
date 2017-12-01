var resourcePath = "http://localhost/html/webGl/demo/resource/";
var shaderCompiler;
var canvasOne;
var gl;
var loader;
var formData;
//------整合场景----------
var scene;
var bgColor = {r:0.3,g:0.3,b:0.3,a:1.0};

//------整合debug信息-----
var alert;
var fpsLabel;

window.addEventListener("load",main,false);
function main()
{
	window.removeEventListener("load",main,false);
	initDebugArea();
	initResizeListener();
	initShaderCompiler();
	initCanvasAndGl();
	initLoader();
	initFormData();
	initScene();
	addCube();
	initKeyboardHandler();
	resize();
	startRender();
}

function initDebugArea()
{
	alert = document.getElementById("alert");
	fpsLabel = document.getElementById("fps");
}

function initResizeListener()
{
	window.addEventListener("resize",resize,false);
}

function resize()
{
	canvasOne.width = document.documentElement.clientWidth*0.9;
	canvasOne.height = document.documentElement.clientHeight*0.9;
	gl.viewport(0,0,canvasOne.width,canvasOne.height);
	// console.log(document.documentElement.clientWidth,document.documentElement.clientHeight);
}

function initShaderCompiler()
{
	shaderCompiler = new ShaderCompiler();
}

function initCanvasAndGl()
{
	canvasOne = document.getElementById("canvasOne");
	canvasOne.width = document.documentElement.clientWidth*0.9;
	canvasOne.height = document.documentElement.clientHeight*0.9;
	gl = canvasOne.getContext("experimental-webgl");
	gl.clearColor(bgColor.r,bgColor.g,bgColor.b,bgColor.a);
	gl.enable(gl.DEPTH_TEST);
}

function initLoader()
{
	loader = new Loader();
}

function initFormData()
{
	formData = new FormData();
	formData.init();
}

function initScene()
{
	scene = new Scene();
	scene.init();
}

function addCube()
{
	for(var i = 0; i < 500; i++)
	{
		var cube = new Cube();
		cube.y = 10*Math.random();
		cube.x = 25*(2*Math.random()-1);
		cube.z = 25*(2*Math.random()-1);
		cube.rx = 90*Math.random();
		cube.ry = 90*Math.random();
		cube.rz = 90*Math.random();
		cube.sx = cube.sy = cube.sz = 3*Math.random();
		scene.defaultFlat.addElement(cube);
	}
}

function loadFile(filePath,fileType,responseType,onLoadFunc,parent)
{
	var request = new XMLHttpRequest();
	request.onreadystatechange = function()
	{
		if(request.readyState === 4 && request.status !== 404)
		{
			if(responseType == "text")
			{
				onLoadFunc(parent,request.responseText,fileType);
			}
		}
	}
	request.open("GET", filePath, true);
	request.send();
}

var nowTime = 0;
var lastTime = 0;

function startRender()
{
	lastTime = nowTime;
	nowTime = Date.now();
	fpsLabel.innerHTML = (1000/(nowTime-lastTime)).toFixed(0);
	scene.defaultFlat.ry += 0.1;
	updateElementsMatrix(scene.elements);
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	drawTriangles(scene.elements);
	alert.innerHTML = "Camera x:"+scene.camera.x.toFixed(2)+"     y:"+scene.camera.y.toFixed(2)+"     z:"+scene.camera.z.toFixed(2)+"\r"+
								  "rx:"+scene.camera.rx.toFixed(2)+"    ry:"+scene.camera.ry.toFixed(2)+"    rz:"+scene.camera.rz.toFixed(2)+"\r";
	requestAnimationFrame(startRender);
}

function updateElementsMatrix(elements)
{
	for(var i = 0; i < elements.length; i++)
	{
		elements[i].updateMatrix();
		updateElementsMatrix(elements[i].elements);
	}
}

function drawTriangles(elements)
{
	for(var i = 0; i < elements.length; i++)
	{
		elements[i].drawTriangles();
		drawTriangles(elements[i].elements);
	}
}