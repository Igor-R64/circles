let canvas = document.getElementById("c1");
let ctx = canvas.getContext("2d");

let isDrawing = false;

let x = 0;

let y = 0;

let coordinates = [{
    x,
    y,
}];

let crossing = null;

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
    if (isDrawing === true) {
        drawLine(ctx, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
        coordinates.push({
            x,
            y,
            isCrossing: true
        });
    }
});

canvas.addEventListener("mouseup", (e) => {
    up();
    if (crossing.isCrossing === true) {
        drawLine(ctx, x, y, e.offsetX, e.offsetY);
        console.log(crossing.isCrossing);
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = false;
        clearLine(ctx);
        drawCircle(ctx, e.offsetX, e.offsetY);

    } else if (isDrawing === true) {
        drawLine(ctx, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
        console.log(up());
    }
});


function up() {
    let _coordinates = coordinates.map(el => JSON.stringify(el));

    function findDuplicates(arr) {
        let sorted_arr = arr.slice().sort();
        let results = [];
        for (let i = 0; i < sorted_arr.length - 1; i++) {
            if (sorted_arr[i + 1] == sorted_arr[i]) {
                results.push(sorted_arr[i]);
            }
        }
        return results;
    }
    return crossing = (JSON.parse(findDuplicates(_coordinates)[0]));
}

function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.strokeWidth = 1;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function clearLine(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(ctx, x1, y1) {
    ctx.beginPath();
    ctx.arc(x1 + 50, y1 + 100, 100, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.closePath();
}


