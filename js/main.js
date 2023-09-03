function updateCanvas()
{
	if (localStorage.getItem("mainDiv") == "true")
	{
		let generators = [];
		let euclidianGeneratedAreas = [];
		let manhattanGeneratedAreas = [];
		
		for (let i = 0; i < document.getElementById("mainRange").value; ++i)
		{
			let valuesTaken = true;
			newX = Math.floor(Math.random() * document.getElementById("originalCanvas").width);
			newY = Math.floor(Math.random() * document.getElementById("originalCanvas").height);
			
			while (valuesTaken)
			{
				valuesTaken = false;
				newX = Math.floor((Math.random() * document.getElementById("originalCanvas").width));
				newY = Math.floor((Math.random() * document.getElementById("originalCanvas").height));
				
				for (let j = 0; j < generators.length && !valuesTaken; ++j)
				{
					if (newX == generators[j][0] && newY == generators[j][1])
					{
						valuesTaken = true;
					}
				}
			}
			
			generators.push([newX, newY]);
			euclidianGeneratedAreas.push([[0, 0, 0], 0]);
			manhattanGeneratedAreas.push([[0, 0, 0], 0]);
		}
		
		let originalCanvas = document.getElementById("originalCanvas");
		let originalCanvasContext = originalCanvas.getContext('2d', { willReadFrequently: true });
		
		let mainCanvas = document.getElementById("mainCanvas");
		let mainCanvasContext = mainCanvas.getContext('2d', { willReadFrequently: true });

		let manhattanCanvas = document.getElementById("manhattanCanvas");
		let manhattanCanvasContext = manhattanCanvas.getContext('2d', { willReadFrequently: true });
		
		let originalImageData = originalCanvasContext.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
		let originalPixels = originalImageData.data;
		
		let mainImageData = mainCanvasContext.getImageData(0, 0, mainCanvas.width, mainCanvas.height);
		let mainPixels = mainImageData.data;

		let manhattanImageData = manhattanCanvasContext.getImageData(0, 0, manhattanCanvas.width, manhattanCanvas.height);
		let manhattanPixels = manhattanImageData.data;
		
		// Euclidian Distance
		for (let i = 0; i < originalPixels.length; i += 4)
		{
			let pixelIndex = Math.floor(i / 4);
			let pixelRow = Math.floor(pixelIndex / originalCanvas.width);
			let pixelCol = pixelIndex % originalCanvas.width;
			
			let indexNearestGenerator = 0;
			
			for (let j = 0; j < generators.length; ++j)
			{
				if
				(
					// Euclidian Distance
					(generators[indexNearestGenerator][0] - pixelRow) *
					(generators[indexNearestGenerator][0] - pixelRow) +
					(generators[indexNearestGenerator][1] - pixelCol) *
					(generators[indexNearestGenerator][1] - pixelCol)
					>
					(generators[j][0] - pixelRow) *
					(generators[j][0] - pixelRow) +
					(generators[j][1] - pixelCol) *
					(generators[j][1] - pixelCol)
					// Manhattan Distance
					/*
					Math.abs(generators[indexNearestGenerator][0] - pixelRow) +
					Math.abs(generators[indexNearestGenerator][1] - pixelCol)
					>
					Math.abs((generators[j][0] - pixelRow)) +
					Math.abs((generators[j][1] - pixelCol))
					*/
				)
				{
					indexNearestGenerator = j;
				}
			}
			
			euclidianGeneratedAreas[indexNearestGenerator][0][0] += originalPixels[i];
			euclidianGeneratedAreas[indexNearestGenerator][0][1] += originalPixels[i + 1];
			euclidianGeneratedAreas[indexNearestGenerator][0][2] += originalPixels[i + 2];
			++euclidianGeneratedAreas[indexNearestGenerator][1];
		}
		
		for (let i = 0; i < euclidianGeneratedAreas.length; ++i)
		{
			euclidianGeneratedAreas[i][0][0] /= (euclidianGeneratedAreas[i][1]);
			euclidianGeneratedAreas[i][0][1] /= (euclidianGeneratedAreas[i][1]);
			euclidianGeneratedAreas[i][0][2] /= (euclidianGeneratedAreas[i][1]);
		}
		
		for (let i = 0; i < originalPixels.length; i += 4)
		{
			let pixelIndex = i / 4;
			let pixelRow = Math.floor(pixelIndex / originalCanvas.width);
			let pixelCol = pixelIndex % originalCanvas.width;
			
			let indexNearestGenerator = 0;
			
			for (let j = 0; j < generators.length; ++j)
			{
				if
				(
					// Euclidian Distance
					(generators[indexNearestGenerator][0] - pixelRow) *
					(generators[indexNearestGenerator][0] - pixelRow) +
					(generators[indexNearestGenerator][1] - pixelCol) *
					(generators[indexNearestGenerator][1] - pixelCol)
					>
					(generators[j][0] - pixelRow) *
					(generators[j][0] - pixelRow) +
					(generators[j][1] - pixelCol) *
					(generators[j][1] - pixelCol)
					// Manhattan Distance
					/*
					Math.abs(generators[indexNearestGenerator][0] - pixelRow) +
					Math.abs(generators[indexNearestGenerator][1] - pixelCol)
					>
					Math.abs((generators[j][0] - pixelRow)) +
					Math.abs((generators[j][1] - pixelCol))
					*/
				)
				{
					indexNearestGenerator = j;
				}
			}
			
			mainPixels[i] = euclidianGeneratedAreas[indexNearestGenerator][0][0];
			mainPixels[i + 1] = euclidianGeneratedAreas[indexNearestGenerator][0][1];
			mainPixels[i + 2] = euclidianGeneratedAreas[indexNearestGenerator][0][2];
		}
		
		mainCanvasContext.putImageData(mainImageData, 0, 0);
		
		// Manhattan Distance
		for (let i = 0; i < originalPixels.length; i += 4)
		{
			let pixelIndex = Math.floor(i / 4);
			let pixelRow = Math.floor(pixelIndex / originalCanvas.width);
			let pixelCol = pixelIndex % originalCanvas.width;
			
			let indexNearestGenerator = 0;
			
			for (let j = 0; j < generators.length; ++j)
			{
				if
				(
					// Euclidian Distance
					/*
					(generators[indexNearestGenerator][0] - pixelRow) *
					(generators[indexNearestGenerator][0] - pixelRow) +
					(generators[indexNearestGenerator][1] - pixelCol) *
					(generators[indexNearestGenerator][1] - pixelCol)
					>
					(generators[j][0] - pixelRow) *
					(generators[j][0] - pixelRow) +
					(generators[j][1] - pixelCol) *
					(generators[j][1] - pixelCol)
					*/
					// Manhattan Distance
					Math.abs(generators[indexNearestGenerator][0] - pixelRow) +
					Math.abs(generators[indexNearestGenerator][1] - pixelCol)
					>
					Math.abs((generators[j][0] - pixelRow)) +
					Math.abs((generators[j][1] - pixelCol))
				)
				{
					indexNearestGenerator = j;
				}
			}
			
			manhattanGeneratedAreas[indexNearestGenerator][0][0] += originalPixels[i];
			manhattanGeneratedAreas[indexNearestGenerator][0][1] += originalPixels[i + 1];
			manhattanGeneratedAreas[indexNearestGenerator][0][2] += originalPixels[i + 2];
			++manhattanGeneratedAreas[indexNearestGenerator][1];
		}
		
		for (let i = 0; i < manhattanGeneratedAreas.length; ++i)
		{
			manhattanGeneratedAreas[i][0][0] /= (manhattanGeneratedAreas[i][1]);
			manhattanGeneratedAreas[i][0][1] /= (manhattanGeneratedAreas[i][1]);
			manhattanGeneratedAreas[i][0][2] /= (manhattanGeneratedAreas[i][1]);
		}
		
		for (let i = 0; i < originalPixels.length; i += 4)
		{
			let pixelIndex = i / 4;
			let pixelRow = Math.floor(pixelIndex / originalCanvas.width);
			let pixelCol = pixelIndex % originalCanvas.width;
			
			let indexNearestGenerator = 0;
			
			for (let j = 0; j < generators.length; ++j)
			{
				if
				(
					// Euclidian Distance
					/*
					(generators[indexNearestGenerator][0] - pixelRow) *
					(generators[indexNearestGenerator][0] - pixelRow) +
					(generators[indexNearestGenerator][1] - pixelCol) *
					(generators[indexNearestGenerator][1] - pixelCol)
					>
					(generators[j][0] - pixelRow) *
					(generators[j][0] - pixelRow) +
					(generators[j][1] - pixelCol) *
					(generators[j][1] - pixelCol)
					*/
					// Manhattan Distance
					Math.abs(generators[indexNearestGenerator][0] - pixelRow) +
					Math.abs(generators[indexNearestGenerator][1] - pixelCol)
					>
					Math.abs((generators[j][0] - pixelRow)) +
					Math.abs((generators[j][1] - pixelCol))
				)
				{
					indexNearestGenerator = j;
				}
			}
			
			manhattanPixels[i] = manhattanGeneratedAreas[indexNearestGenerator][0][0];
			manhattanPixels[i + 1] = manhattanGeneratedAreas[indexNearestGenerator][0][1];
			manhattanPixels[i + 2] = manhattanGeneratedAreas[indexNearestGenerator][0][2];
		}
		
		manhattanCanvasContext.putImageData(manhattanImageData, 0, 0);
	}
}

window.onload = function()
{
	let mainForm = document.getElementById("mainForm");
	localStorage.setItem("mainDiv", "false");
	mainForm.addEventListener("submit", function(event)
	{
		event.preventDefault();
		
		if (localStorage.getItem("mainDiv") == "false")
		{
			let originalDiv = document.createElement("div");
			originalDiv.id = "originalDiv";
			document.body.appendChild(originalDiv);
			originalDiv.insertAdjacentHTML("beforebegin", "<br><br><br> Original Image: <br><br><br>");
			let originalCanvas = document.createElement("canvas");
			originalCanvas.id = "originalCanvas";
			document.getElementById("originalDiv").appendChild(originalCanvas);
			
			localStorage.setItem("mainDiv", "true");
			let mainDiv = document.createElement("div");
			mainDiv.id = "mainDiv";
			document.body.appendChild(mainDiv);
			mainDiv.insertAdjacentHTML("beforebegin", "<br><br><br> Voronoi Diagram with Euclidian Distance: <br><br><br>");
			let mainCanvas = document.createElement("canvas");
			mainCanvas.id = "mainCanvas";
			document.getElementById("mainDiv").appendChild(mainCanvas);

			let manhattanDiv = document.createElement("div");
			manhattanDiv.id = "manhattanDiv";
			document.body.appendChild(manhattanDiv);
			manhattanDiv.insertAdjacentHTML("beforebegin", "<br><br><br> Voronoi Diagram with Manhattan Distance: <br><br><br>");
			let manhattanCanvas = document.createElement("canvas");
			manhattanCanvas.id = "manhattanCanvas";
			document.getElementById("manhattanDiv").appendChild(manhattanCanvas);
		}
		
		let originalCanvas = document.getElementById("originalCanvas");
		let originalCanvasContext = originalCanvas.getContext('2d', { willReadFrequently: true });
		
		let mainCanvas = document.getElementById("mainCanvas");
		let mainCanvasContext = mainCanvas.getContext('2d', { willReadFrequently: true });

		let manhattanCanvas = document.getElementById("manhattanCanvas");
		let manhattanCanvasContext = manhattanCanvas.getContext('2d', { willReadFrequently: true });
		
		let file = document.getElementById("mainFile").files[0];
		let fileReader = new FileReader();

		fileReader.onload = function(event)
		{
			let image = new Image();
			image.src = event.target.result;

			image.addEventListener("load", function()
			{
				originalCanvas.width = image.width;
				originalCanvas.height = image.height;
				originalCanvasContext.drawImage(image, 0, 0);
				
				mainCanvas.width = image.width;
				mainCanvas.height = image.height;
				mainCanvasContext.drawImage(image, 0, 0);

				manhattanCanvas.width = image.width;
				manhattanCanvas.height = image.height;
				manhattanCanvasContext.drawImage(image, 0, 0);
				
				document.getElementById("mainRange").value = document.getElementById("mainRange").min;
				document.getElementById("mainRangeSpan").textContent = document.getElementById("mainRange").min;
		
				updateCanvas();
			});
		};

		if (file)
		{
			fileReader.readAsDataURL(file);
		}
		
		document.getElementById("mainRange").value = document.getElementById("mainRange").min;
		document.getElementById("mainRangeSpan").textContent = document.getElementById("mainRange").min;
		
		updateCanvas();
	});
	
	let mainRangeSpan = document.createElement("span");
	mainRangeSpan.id = "mainRangeSpan";
	document.getElementById("mainRange").insertAdjacentElement("afterend", mainRangeSpan);
	document.getElementById("mainRangeSpan").appendChild(document.createElement("br"));
	document.getElementById("mainRange").value = document.getElementById("mainRange").min;
	document.getElementById("mainRangeSpan").textContent = document.getElementById("mainRange").min;
	
	document.getElementById("mainRange").addEventListener("change", function(event)
	{
		event.preventDefault();
		
		document.getElementById("mainRangeSpan").textContent = event.target.value;
		
		updateCanvas();
	});
};

