function inputRange(min, max, val, change) {
    var input = document.createElement('input');
    input.style.display = 'block';
    input.type = 'range';
    input.max = max;
    input.min = min;
    input.value = val;
    input.onchange = function (ev) {
        change(parseInt(input.value, 10));
    };
    document.body.appendChild(input);
}
function main() {
    var _a = [200, 200], W = _a[0], H = _a[1];
    var canvas = document.createElement('canvas');
    canvas.style.border = '1px solid black';
    canvas.width = W;
    canvas.height = H;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var img = document.createElement('img');
    var _b = [10, 80, 34, 0], A = _b[0], B = _b[1], C = _b[2], D = _b[3];
    var result = document.createElement('p');
    document.body.appendChild(result);
    var config = document.createElement('p');
    document.body.appendChild(config);
    function draw() {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < W; ++i) {
            ctx.drawImage(img, i, 0, 1, 50, i, H / 2 - (C + A * Math.sin(D + 2 * Math.PI * i / B)), 1, 50);
        }
        config.innerHTML = JSON.stringify([A, B, C, D]);
        result.innerHTML = OCRAD(ctx);
        for (var i = 0; i < W; ++i) {
            ctx.drawImage(img, i, 0, 1, 50, i, 0, 1, 50);
            ctx.fillRect(i, C + A * Math.sin(D + 2 * Math.PI * i / B), 1, 1);
            ctx.fillRect(i, H / 2, 1, 1);
        }
    }
    inputRange(1, 30, A, function (val) {
        A = val;
        draw();
    });
    inputRange(10, 200, B, function (val) {
        B = val;
        draw();
    });
    inputRange(0, 100, C, function (val) {
        C = val;
        draw();
    });
    inputRange(0, 360, 360 * D / (2 * Math.PI), function (val) {
        D = 2 * Math.PI * val / 360;
        draw();
    });
    img.onload = draw;
    function reload() {
        img.src = '';
        img.src = '/captcha?sid=501e5e9621e4cd39de710e192fd1de20&s=' + [W, H].join('x') + '&ps=24&g=10,25&c' + Date.now();
    }
    reload();
    var button = document.createElement('button');
    button.onclick = reload;
    button.innerHTML = 'Reload';
    document.body.appendChild(button);
}
window.addEventListener('load', main);
