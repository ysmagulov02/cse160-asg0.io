// Yernar Smagulov
// ysmagulo@ucsc.edu
// asg0.js

function main() {
    // Retrieve the <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');

    // Clear the canvas in the beginning
    clearCanvas(ctx);
}

function drawVector(v, color, ctx) {
    ctx.beginPath();
    ctx.moveTo(200, 200);  // Center of the canvas
    ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function handleDrawEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    clearCanvas(ctx);

    // Read values for v1
    var x1 = parseFloat(document.getElementById('xInput1').value);
    var y1 = parseFloat(document.getElementById('yInput1').value);
    var v1 = new Vector3([x1, y1, 0]);
    drawVector(v1, 'red', ctx);

    // Read values for v2
    var x2 = parseFloat(document.getElementById('xInput2').value);
    var y2 = parseFloat(document.getElementById('yInput2').value);
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v2, 'blue', ctx);
}

function clearCanvas(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function handleDrawOperationEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    clearCanvas(ctx);

    var x1 = parseFloat(document.getElementById('xInput1').value);
    var y1 = parseFloat(document.getElementById('yInput1').value);
    var v1 = new Vector3([x1, y1, 0]);
    drawVector(v1, 'red', ctx);

    var x2 = parseFloat(document.getElementById('xInput2').value);
    var y2 = parseFloat(document.getElementById('yInput2').value);
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v2, 'blue', ctx);

    var operation = document.getElementById('operationSelector').value;
    var scalar = parseFloat(document.getElementById('scalarInput').value);

    switch(operation) {
        case 'add':
            v1.add(v2);
            drawVector(v1, 'green', ctx);
            break;
        case 'sub':
            v1.sub(v2);
            drawVector(v1, 'green', ctx);
            break;
        case 'mul':
            drawVector(v1.mul(scalar), 'green', ctx);
            drawVector(v2.mul(scalar), 'green', ctx);
            break;
        case 'div':
            drawVector(v1.div(scalar), 'green', ctx);
            drawVector(v2.div(scalar), 'green', ctx);
            break;
        case 'mag':
            console.log('Magnitude of v1:', v1.magnitude());
            console.log('Magnitude of v2:', v2.magnitude());
            break;
        case 'norm':
            drawVector(v1.normalize(), 'green', ctx);
            drawVector(v2.normalize(), 'green', ctx);
            break;
        case 'angle':
            angleBetween(v1, v2);
            break;
        case 'area':
            areaTriangle(v1, v2);
            break;
    }
}

function angleBetween(v1, v2) {
    // Ensure vectors are not zero vectors
    if (v1.magnitude() === 0 || v2.magnitude() === 0) {
        console.log("One or both vectors are zero vectors; cannot calculate angle.");
        return 0;
    }
    // Calculate the dot product
    let dot = Vector3.dot(v1, v2);
    // Calculate the angle in radians
    let angleRadians = Math.acos(dot / (v1.magnitude() * v2.magnitude()));
    // Convert radians to degrees
    let angleDegrees = angleRadians * (180 / Math.PI);
    // Log the angle to the console
    console.log(`Angle: ${angleDegrees.toFixed(2)} degrees`);
    return angleDegrees;
}

function areaTriangle(v1, v2) {
    // Calculate the cross product
    let crossProduct = Vector3.cross(v1, v2);
    // Calculate the magnitude of the cross product
    let areaParallelogram = crossProduct.magnitude();
    // The area of the triangle is half of the area of the parallelogram
    let area = areaParallelogram / 2.0;
    // Log the area to the console
    console.log(`Area of the triangle: ${area.toFixed(2)}`);
    return area;
}

