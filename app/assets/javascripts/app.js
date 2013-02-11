
function dist(a, b) {
	var d = Math.pow(a[0]-b[0],2) + Math.pow(a[1]-b[1],2);
	return Math.pow(d, 0.5);
}

function userDraw() {

	//set it true on mousedown
	$("#canvas").mousedown(function(){
		draw=true; 
		pointList.push([-1,-1]);
		ctx.beginPath();
		isFirst = true;
	});
	
	//reset it on mouseup
	$("#canvas").mouseup(function(){ 
		draw=false; 
		var o = new Array();
		for(var i=0;i<pointList.length;i+=1) {
			if (pointList[i][0] == -1) {
				o.push(pointList[i]);
			} else if ( dist(o.slice(-1), pointList[i]) >= 5 ) {
				o.push(pointList[i]);
			}		
		}
	});
	
	$("#canvas").mousemove(function(e) {
		if(draw == true){
				pointList.push([e.pageX,e.pageY]);
				
				if (isFirst == true) {
					ctx.moveTo(e.pageX,e.pageY);
					isFirst = false;
				} else {
					ctx.lineTo(e.pageX,e.pageY);
				}		
				ctx.stroke();
				//console.log(JSON.stringify(pointList));
		}    
	});
}

function drawBot() {
	var todo;
	
	k = window.location.hash.substring(1);
	if (k == "w6tzj5") {
		k = "flzcp9"; //sub out the one on reddit for grant's new one. super hack.
	}
	if (k == "8xziz") {
		k = "tqk0d4";
	}
	
	$.ajax({
			type: 'POST',
			url: "/valentine/backend.php",
			data: {"method":"get", "key":k},
			success: function(data) { 
				if (data == "error") {
					alert("Oh no! There's been an error. Sorry! :(");
				}
				todo = JSON.parse(data);
				//console.log(todo);
				$("#facebook-wrapper").delay(500).fadeIn();
			}
		});
	
	var i = 0;
	var drawBot = window.setInterval(function() {
		var k = todo[i];
		//console.log(todo.length - i);
		if (k[0] == -1) {
			ctx.beginPath();
			ctx.moveTo(todo[i+1][0],todo[i+1][1]);
			i++;
		} else {
			ctx.lineTo(todo[i][0],todo[i][1]);
			ctx.stroke();
			i++;
		}
		if (i >= todo.length) {
			window.clearInterval(drawBot);
		}
	}, 5);
}

$(document).ready(function() {

	$.post('http://uovalentine.herokuapp.com/generate_uuid', function(data){
		console.log(data);
		;
	});

	draw = false;
	pointList = new Array();
	isFirst = true;
	
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctx.strokeStyle = '#F64A8A';
	ctx.lineWidth = 3;
	ctx.lineCap = "round";
	

	if(window.location.hash) {
	  drawBot();
	} else { 
	  userDraw();
	  $("#save").show();
	}        
	
	$("#save").click(function() {
		$.ajax({
			type: 'POST',
			url: "http://uovalentine.herokuapp.com/update_path",
			data: {"uuid":'test', "path":JSON.stringify(pointList)},
			success: function(data) { 
				window.location.hash = data;
				console.log(data)
			}
		});
	});
});