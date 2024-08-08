var form = document.getElementById('settings');
var draggable = document.getElementById('dragHere');

var isMouseDown = false;
var mousePositionOfDraggable = { x: null, y: null };

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    handleClick();
});

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
        let posX = e.clientX - mousePositionOfDraggable.x;
        let posY = e.clientY - mousePositionOfDraggable.y;
        // 保证元素在窗口内移动
        if(posX < 0)posX = 0;
        if(posX > window.innerWidth - form.offsetWidth) posX = window.innerWidth - form.offsetWidth;
        if(posY < 0)posY = 0;
        if(posY > window.innerHeight - form.offsetHeight) posY = window.innerHeight - form.offsetHeight;
        form.style.left = posX + 'px';
        form.style.top = posY + 'px';
    }
});
window.addEventListener('resize',()=>{
    let posX = form.offsetLeft;
    let posY = form.offsetTop;
    // 保证元素在窗口内移动
    if(posX < 0)posX = 0;
    if(posX > window.innerWidth - form.offsetWidth) posX = window.innerWidth - form.offsetWidth;
    if(posY < 0)posY = 0;
    if(posY > window.innerHeight - form.offsetHeight) posY = window.innerHeight - form.offsetHeight;
    form.style.left = posX + 'px';
    form.style.top = posY + 'px';
});