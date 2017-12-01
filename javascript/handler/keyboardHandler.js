var keyList = [];

function initKeyboardHandler()
{
	window.addEventListener("keydown",keyDownHandler,false);
	window.addEventListener("keyup",keyUpHandler,false);
	window.addEventListener("keypress",keyPressHandler,false);
	keyList["ArrowLeft"] = keyList["ArrowRight"] = keyList["ArrowUp"] = keyList["ArrowDown"] = 0;
	keyList["Home"] = keyList["End"] = 0;
	keyList["PageUp"] = keyList["PageDown"] = 0;
}

function keyDownHandler(e)
{
	keyList[e.key] = 1;
}

function keyUpHandler(e)
{
	keyList[e.key] = 0;
}

function keyPressHandler(e)
{

}