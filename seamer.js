let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let img = new Image();
img.src='./wes.png';
img.onload = function() {
	ctx.drawImage(img, 0,0);
	drawEnergy();
};

function energy(x,y,n,data) {
	let theEnergy = 0;
	for(let xOffset = -1; xOffset <= 1; xOffset++){
		for(let yOffset = -1; yOffset <= 1; yOffset++){
			let offsetIndex = n + (yOffset * canvas.width + xOffset)*4
			if(offsetIndex >= 0 && (xOffset != 0 && yOffset != 0)){
				theEnergy += Math.pow(data[n] - data[offsetIndex],2) 
						+ Math.pow(data[n + 1] - data[offsetIndex + 1],2) 
						+ Math.pow(data[n + 2] - data[offsetIndex + 2],2);
			}
		}
	}

	return theEnergy;
}

function energyGradient(data) {
	let gradient = new Array(canvas.width);
	for(let x = 0; x < canvas.width; x++){
		gradient[x] = new Array(canvas.width);
		for(let y = 0; y < canvas.height; y++){
			let n = (y * canvas.width + x) * 4;
			gradient[x][y] = energy(x,y,n,data);
		}
	}
	return gradient;
}

function minVerticalSeam(gradient) {
	let seams = new Array(canvas.width);
	for(let x = 0; x < canvas.width; x++){
		seams[x] = new Array(canvas.height);
		for(let y = 0; y < canvas.height; y++){
			let currCost = gradient[x][y];
			
		}
	}
}

function drawEnergy() {
	let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imageData.data;

	let gradient = energyGradient(data);

	for(let x = 0; x < gradient.length; x++){
		for(let y = 0; y < gradient[x].length; y++){
			let n = (y * canvas.width + x) * 4;
			data[n + 3] = gradient[x][y] / (196086 / 100000);
		}
	}

	ctx.putImageData(imageData,0,0);
}
