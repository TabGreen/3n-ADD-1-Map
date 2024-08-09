//获取所有的元素
var startButton = document.getElementById('startButton');
var useTheLastButton = document.getElementById('useTheLast');
var saveButton = document.getElementById('saveButton');
var numN = document.getElementById('numN');
var colorInput = document.getElementById('color');
var cvs = document.getElementById('mapCVS');
var ctx = cvs.getContext('2d');

//规定常量
const inputMax = 3002399751580330;//用户输入数字的最大限制
const lineWidth = 3;//绘制图形时线条宽度
const maxWidth = 800;//画布的最大宽度
const maxHeight = maxWidth * (10 / 16);//让画布的长宽保持16:10的比例
const cvsZoom = 20;//根据数据对画布进行一定的放大

//全局需要使用的变量
var downloadLink = document.createElement('a');
var date = new Date();
var formHistory = {
    n: 114514,
    color: '#00ff00',
};

//调用历史记录
function useTheLast(){
    numN.value = formHistory.n;
    colorInput.value = formHistory.color;
}
//保存历史记录
function saveTheLast(){
    formHistory.n = parseInt(numN.value);
    formHistory.color = colorInput.value;
}
//禁用表单
function disabledForm(){
    numN.disabled = true;
    colorInput.disabled = true;
    useTheLastButton.disabled = true;
    startButton.disabled = true;
    saveButton.disabled = true;
}
//启用表单
function startForm(){
    numN.disabled = false;
    colorInput.disabled = false;
    useTheLastButton.disabled = false;
    startButton.disabled = false;
    saveButton.disabled = false;
}
//验证用户输入
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

            //如果输入的数字大于阈值,则使用BigInt
            let isUseBigInt = confirm('使用大数字运算?\n如果数字过大，可能会降低性能');
            if(isUseBigInt){
                return 'UseBigInt';
            }
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
function getNumber(num){
    return 
}
//普通Int型的计算
function comput(n){
    let numList = [];
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
//BigInt型的计算
function computForBigInt(n){
    let numList = [];
    while(n!==1n){
        numList.push(n);
        if(n%2n===1){
            n = 3n*n+1n;
        }else{
            n /= 2n;
        }
    }numList.push(1n);
    return numList;
}
//普通Int型获取数组长度
function getMaxAndLength(numList){
    console.log(...numList);
    return [numList.length,Math.max(...numList)];
}
//BigInt型获取数组长度
function getMaxAndLengthForBigInt(numList) {
    let max = 0n;
    let length = 0;
    for (let num of numList) {
        if (num > max) {
            max = num;
        }
        length++;
    }console.log(numList);
    return [length, max];
}

//设置画布信息
function setCanvas(size) {
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
//绘制图形
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
}
function drawForBigIntByAI(numList, size) {
    setCanvas(size);
    ctx.strokeStyle = colorInput.value;
    ctx.lineWidth = lineWidth;
    // 获取最大值，这里假设它是BigInt类型
    var maxValue = BigInt(size[1]);
    // 计算每个数值之间的水平间距
    var xSpacing = cvs.width / numList.length;
    // 确保 cvs.height 也被转换为BigInt
    var ySpacing = BigInt(cvs.height) / maxValue; 
    ctx.clearRect(0, 0, cvs.width, cvs.height); // 清除画布
    ctx.beginPath(); // 开始新路径
    for (var i = 0; i < numList.length; i++) {
        var value = numList[i];
        var x = i * xSpacing; // 当前数值在 X 轴的位置
        // 使用BigInt运算
        var y = BigInt(cvs.height) - value * ySpacing; // 当前数值在 Y 轴的位置
        if (i === 0) {
            ctx.moveTo(Number(x), Number(y)); // 移动到第一个点
        } else {
            ctx.lineTo(Number(x), Number(y)); // 连接下一个点
        }
    }
    ctx.stroke(); // 绘制路径
}

function draw(numList,size){
//不想自己写了，AI写的挺好，改一改用着吧
}
//运算Int型的主函数
function main(){
    let num = parseInt(numN.value);
    let numList = comput(num);
    let size = getMaxAndLength(numList);
    drawByAI(numList,size);
}
//运算BigInt型的主函数
function mainForBigInt(){
    let num = BigInt(numN.value);
    let numList = computForBigInt(num);
    let size = getMaxAndLengthForBigInt(numList);
    drawForBigIntByAI(numList,size);
}
//响应用户(点击“开始”按钮)
function handleClick(){
    let startTime = date.getTime();//计时

    disabledForm();
    let isPassed = verification();
    //如果验证通过，开始计算并绘制
    if(isPassed){
        let num;
        //根据用户的选择,决定用Int还是BigInt
        switch(isPassed){
            case true:
                main();
                break;
            case 'UseBigInt':
                mainForBigInt();
                break;
        }
        saveTheLast();
    }startForm();

    console.log('use time:',(date.getTime() - startTime)+'ms');//计时
}

//保存图像
function saveImage(){
    downloadLink.download =  '3n+1Map——'+'初始值：'+numN.value+'.png';
    downloadLink.href = cvs.toDataURL('image/png');
    downloadLink.click();
}
useTheLastButton.addEventListener('click',useTheLast);
startButton.addEventListener('click',handleClick);
saveButton.addEventListener('click',saveImage);

