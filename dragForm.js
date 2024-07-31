var form = document.getElementById('settings');
var draggable = document.getElementById('dragHere');

var isMouseDown = false;
var mousePositionOfDraggable = { x: null, y: null };

// 计算鼠标相对于元素的位置
draggable.addEventListener('mousedown', (e) => {
    // 保存当前的鼠标相对于元素的位置
    mousePositionOfDraggable.x = e.clientX - form.offsetLeft;
    mousePositionOfDraggable.y = e.clientY - form.offsetTop;
    isMouseDown = true;
});

// 当鼠标抬起时取消拖动状态
document.addEventListener('mouseup', () => {
    isMouseDown = false;
    mousePositionOfDraggable = { x: null, y: null };
});

// 监听整个文档的 mousemove 事件，以便在拖动时更新元素的位置
document.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
        // 更新元素的位置
        form.style.left = e.clientX - mousePositionOfDraggable.x + 'px';
        form.style.top = e.clientY - mousePositionOfDraggable.y + 'px';
    }
});
