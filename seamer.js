let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let img = new Image();
img.onload = function() {
	ctx.drawImage(img, 0,0);
	drawEnergy();
};

img.src='./emma.jpg';

function drawEnergy() {
	let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imageData.data;

	for(let x = 0; x < canvas.width; x++){
		for(let y = 0; y < canvas.height; y++){
			let n = (y * canvas.width + x) * 4;
			energy(x,y,n,data);
		}
	}

	ctx.putImageData(imageData,0,0);
}

function energy(x,y,n,data) {
	let theEnergy = 0;
	for(let xOffset = -1; xOffset <= 1; xOffset++){
		for(let yOffset = -1; yOffset <= 1; yOffset++){
			let offsetIndex = n + (yOffset * canvas.width + xOffset)*4
			if(offsetIndex >= 0 && (xOffset != 0 && yOffset != 0)){
				theEnergy += Math.pow(data[n] - data[offsetIndex],2) 
						+ Math.pow(data[n + 1] - data[offsetIndex + 1],2) 
						+ Math.pow(data[n + 2] - data[offsetIndex + 2],2);
				//data[offsetIndex + 3] = theEnergy / (196086 / 1000);
			}
		}
	}

	/*data[n] = theEnergy / 196086 * 255;
	data[n + 1] = 0;
	data[n + 2] = 0;*/

	/*for(let xOffset = -1; xOffset <= 1; xOffset++) {
		for(let yOffset = -1; yOffset <= 1; yOffset++) {
			let offsetIndex = n + (yOffset * canvas.width + xOffset) * 4;
			if(offsetIndex != n && offsetIndex > 0 ){
				theEnergy += Math.pow(data[n] - data[offsetIndex],2) 
						+ Math.pow(data[n + 1] - data[offsetIndex + 1],2) 
						+ Math.pow(data[n + 2] - data[offsetIndex + 2],2);
			}
		}
	}

	data[n] = theEnergy / 196086 * 255;
	data[n + 1] = 0;
	data[n + 2] = 0;*/
	data[n + 3] = theEnergy / (196086 / 1000);
}
