var startButton = document.getElementById('startButton');
var useTheLastButton = document.getElementById('useTheLast');
var saveButton = document.getElementById('saveButton');
var numN = document.getElementById('numN');
var colorInput = document.getElementById('color');
var cvs = document.getElementById('mapCVS');
var ctx = cvs.getContext('2d');

const inputMax = 3002399751580330;
const lineWidth = 3;
const maxWidth = 800;
const maxHeight = maxWidth * (10 / 16);
const cvsZoom = 20;


var downloadLink = document.createElement('a');
var formHistory = {
    n: 114514,
    color: '#00ff00',
};

function useTheLast(){
    numN.value = formHistory.n;
    colorInput.value = formHistory.color;
}function saveTheLast(){
    formHistory.n = parseInt(numN.value);
    formHistory.color = colorInput.value;
}
function disabledForm(){
    numN.disabled = true;
    colorInput.disabled = true;
    useTheLastButton.disabled = true;
    startButton.disabled = true;
    saveButton.disabled = true;
}
function startForm(){
    numN.disabled = false;
    colorInput.disabled = false;
    useTheLastButton.disabled = false;
    startButton.disabled = false;
    saveButton.disabled = false;
}
function verification(){
    let num = parseInt(numN.value);
    if(!/^\d+$/.test(numN.value)){
        alert('请输入一个自然数');
        startForm();
        numN.focus();
        return false;
    }else{
        if(num > inputMax){
            alert('数字过大');
            startForm();
            numN.focus();
            return false;
        }else{
            if(num === 0||num === 1){
                alert('不能输入0或1');
                startForm();
                numN.focus();
                return false;
            }
        }
    }if(!/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(colorInput.value)){
        alert('很想知道你是怎么连颜色都选不对的，\n我想你应该更新你的浏览器了，\n还是说你的浏览器出错了？');
        startForm();
        colorInput.focus();
        return false;
    }formHistory.n = parseInt(numN.value);
    return true;
}
function comput(n){
    var numList = [];
    while(n!=1){
        numList.push(n);
        if(n%2===1){
            n = 3*n+1;
        }else{
            n/=2;
        }
    }numList.push(1);
    return numList;
}
function getMaxAndLength(numList){
    console.log(...numList);
    return [numList.length,Math.max(...numList)];
}function setCanvas(size) {
    /*ctx.strokeStyle = colorInput.value;
    ctx.lineWidth = lineWidth;*/
    let width = size[0]*cvsZoom;
    let height = width*(10/16);
    if (width > maxWidth) {
        width = maxWidth;
        height = maxWidth * (10 / 16);
    }
    cvs.width = width;
    cvs.height = height;
}

function drawByAI(numList,size){
    setCanvas(size);
    ctx.strokeStyle = colorInput.value;
    ctx.lineWidth = lineWidth;
    var xSpacing = cvs.width / numList.length; // 计算每个数值之间的水平间距
    var ySpacing = cvs.height / size[1];       // 计算每个数值之间的垂直间距
    ctx.clearRect(0, 0, cvs.width, cvs.height); // 清除画布
    ctx.beginPath(); // 开始新路径
    for (var i = 0; i < numList.length; i++) {
        var value = numList[i];
        var x = i * xSpacing; // 当前数值在 X 轴的位置
        var y = cvs.height - value * ySpacing; // 当前数值在 Y 轴的位置
        if (i === 0) {
            ctx.moveTo(x, y); // 移动到第一个点
        } else {
            ctx.lineTo(x, y); // 连接下一个点
        }
    }
    ctx.stroke(); // 绘制路径
}function draw(numList,size){
//不想自己写了，AI写的挺好，改一改用着吧
}
function main(){
    disabledForm();
    if(verification()){
        let numList = comput(parseInt(numN.value));
        let size = getMaxAndLength(numList);
        drawByAI(numList,size);
    }saveTheLast();
    startForm();
}
function saveImage(){
    downloadLink.download =  '3n+1Map——'+'初始值：'+numN.value+'.png';
    downloadLink.href = cvs.toDataURL('image/png');
    downloadLink.click();
}
useTheLastButton.addEventListener('click',useTheLast);
startButton.addEventListener('click',main);
saveButton.addEventListener('click',saveImage);