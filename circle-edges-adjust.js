function circleEdgesAdjustBackground(canvasID, canvasBackgroundColor, canvasForegroundColor, lineWidth, radius, speed) {

    var canvas = document.getElementById(canvasID);
    var ctx = canvas.getContext('2d');

    var minMaxEdgesForCircle = [3, 40];
    var edgesForCircle = minMaxEdgesForCircle[0];
    var circleEdgeAdditionDirection = true; //true = addition; false = subtraction

    function radians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function findCoordsOfHandEdges(centerX, centerY, radius, angle) {
        a = radius * Math.sin(radians(angle));
        b = radius * Math.cos(radians(angle));
        b = centerX - b;
        a = centerY - a;
        return [b, a];
    }

    function drawLoop() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        if (edgesForCircle > minMaxEdgesForCircle[1]) {
            circleEdgeAdditionDirection = false;
        } else if (edgesForCircle < minMaxEdgesForCircle[0]) {
            circleEdgeAdditionDirection = true;
        }

        if (circleEdgeAdditionDirection) {
            edgesForCircle += speed;
        } else {
            edgesForCircle -= speed;
        }

        ctx.fillStyle = canvasBackgroundColor;
        ctx.lineWidth = lineWidth;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = canvasForegroundColor;
        ctx.lineCap = 'round';

        lastCoords = [NaN];
        startCoords = [NaN];

        for (i = 0;i < edgesForCircle + 1;i++) {
            edgeCoords = findCoordsOfHandEdges(canvas.width / 2, canvas.height / 2, radius, i * (360 / Math.floor(edgesForCircle)));
            if (isNaN(lastCoords[0]) && isNaN(startCoords[0])) {
                lastCoords = edgeCoords;
                startCoords = edgeCoords;
            }
            ctx.beginPath()
            ctx.moveTo(lastCoords[0], lastCoords[1]);
            ctx.lineTo(edgeCoords[0], edgeCoords[1]);
            lastCoords = edgeCoords;
            ctx.stroke()
        }


        window.requestAnimationFrame(drawLoop);
    }

    window.requestAnimationFrame(drawLoop);
}