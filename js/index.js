function draw() {
    var canvas = document.getElementById("canvas");
    var sqSize = 19;
    canvas.height = Math.floor(((window.innerHeight - (sqSize * 4)) / (sqSize * 6))) * sqSize * 6 + (sqSize * 3);
    canvas.width = Math.floor(((window.innerWidth - (sqSize * 4)) / (sqSize * 6))) * sqSize * 6 + (sqSize * 3);
    $("#canvas").css("height", canvas.height);
    $("#canvas").css("width", canvas.width);
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = Math.floor(((window.innerWidth - (sqSize * 4)) / (sqSize * 6))) * sqSize * 6 + (sqSize * 3);
        canvas.height = Math.floor(((window.innerHeight - (sqSize * 4)) / (sqSize * 6))) * sqSize * 6 + (sqSize * 3);
        $('#canvas').css('width', canvas.width);
        $('#canvas').css('height', canvas.height);
        start();
    }
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var colorArray = ["#ECECEC", "#ACBEC5", "#C4CB8D", "#3E3D50", "#3E3D50"];

        function solidSq(x, y, color) {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, sqSize, sqSize);
        }

        function l2r(x, y, colorL, colorR) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + sqSize);
            ctx.lineTo(x + sqSize, y + sqSize);
            ctx.fillStyle = colorL;
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + sqSize, y);
            ctx.lineTo(x + sqSize, y + sqSize);
            ctx.fillStyle = colorR;
            ctx.fill();
        }

        function r2l(x, y, colorL, colorR) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + sqSize, y);
            ctx.lineTo(x, y + sqSize);
            ctx.fillStyle = colorL;
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x, y + sqSize);
            ctx.lineTo(x + sqSize, y + sqSize);
            ctx.lineTo(x + sqSize, y);
            ctx.fillStyle = colorR;
            ctx.fill();
        }

        function patt1(x, y, pattC, centerC, bgC, altC) {
            solidSq(x, y, pattC);
            l2r(x + sqSize, y, bgC, pattC);
            solidSq(x + sqSize * 2, y, bgC);
            r2l(x + sqSize * 3, y, pattC, bgC);
            solidSq(x + sqSize * 4, y, pattC);
            //row2
            l2r(x, y + sqSize, pattC, bgC);
            solidSq(x + sqSize, y + sqSize, bgC);
            solidSq(x + sqSize * 2, y + sqSize, centerC);
            solidSq(x + sqSize * 3, y + sqSize, bgC);
            r2l(x + sqSize * 4, y + sqSize, bgC, pattC);
            //row3
            solidSq(x, y + sqSize * 2, bgC);
            solidSq(x + sqSize, y + sqSize * 2, centerC);
            solidSq(x + sqSize * 2, y + sqSize * 2, altC);
            solidSq(x + sqSize * 3, y + sqSize * 2, centerC);
            solidSq(x + sqSize * 4, y + sqSize * 2, bgC);
            //row4
            r2l(x, y + sqSize * 3, pattC, bgC);
            solidSq(x + sqSize, y + sqSize * 3, bgC);
            solidSq(x + sqSize * 2, y + sqSize * 3, centerC);
            solidSq(x + sqSize * 3, y + sqSize * 3, bgC);
            l2r(x + sqSize * 4, y + sqSize * 3, bgC, pattC);
            //row5
            solidSq(x, y + sqSize * 4, pattC);
            r2l(x + sqSize, y + sqSize * 4, bgC, pattC);
            solidSq(x + sqSize * 2, y + sqSize * 4, bgC);
            l2r(x + sqSize * 3, y + sqSize * 4, pattC, bgC);
            solidSq(x + sqSize * 4, y + sqSize * 4, pattC);
        };
        //pattern placement
        function start() {
            ctx.fillStyle = colorArray[0]
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            var rowStart = false;
            var colStart = false;
            for (var col = sqSize * 2; col < canvas.height - sqSize * 2; col += sqSize * 6) {
                for (var row = sqSize * 2; row < canvas.width - sqSize * 2; row += sqSize * 6) {
                    if (colStart && rowStart || !colStart && !rowStart) {
                        patt1(row, col, colorArray[1], colorArray[3], colorArray[0], colorArray[2]);
                    }
                    else {
                        patt1(row, col, colorArray[0], colorArray[3], colorArray[2], colorArray[1]);
                    }
                    rowStart = !rowStart;
                }
                colStart = !colStart;
                rowStart = false;
            }
            //create border
            ctx.fillStyle = colorArray[4];
            ctx.fillRect(0, 0, sqSize, canvas.height);
            ctx.fillRect(0, 0, canvas.width, sqSize);
            ctx.fillRect(canvas.width - sqSize, 0, sqSize, canvas.height);
            ctx.fillRect(0, canvas.height - sqSize, canvas.width, sqSize);
            ctx.fillStyle = colorArray[0];
            ctx.fillRect(0, sqSize, canvas.width, sqSize);
            ctx.fillRect(0, canvas.height - sqSize * 2, canvas.width, sqSize);
            ctx.fillRect(sqSize, 0, sqSize, canvas.height);
            ctx.fillRect(canvas.width - sqSize * 2, 0, sqSize, canvas.height);
        }
        start();
    }
}
draw();