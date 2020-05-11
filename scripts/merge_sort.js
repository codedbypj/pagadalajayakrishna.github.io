var canvas;
var values = [];
var state = [];
let slider;
let w;
let size;
let bg;
let v;
let btn1;
let btn2;
let value,hole;
//let left,right;
function setup(){
    canvas = createCanvas(1250,650);
    canvas.position(245,40);
    bg = color(0);
    slider = createSlider(1,100,10);
    slider.style('-webkit-appearance','none');
    slider.style('height','30px');
    slider.style('width','300px');
    slider.style('background-color','#347bcc');
    slider.style('transform','rotate(-90deg)');
    slider.style('cursor','pointer');
    slider.style('border-radius','15px');
    slider.style('position','absolute');
    slider.style('bottom','550px');
    slider.style('right','1350px');
    btn1 = createButton("Generate Array");
    btn1.style('width','100px');
    btn1.style('height','300px');
    btn1.style('border','none');
    btn1.style('border-radius','15px');
    btn1.style('position','absolute');
    btn1.style('bottom','415px');
    btn1.style('left','75px');
    btn1.style('color','white');
    btn1.style('font-weight','bold');
    btn1.style('font-size','large');
    btn1.style('font-family',"'Courier New',Courier,monospace");
    btn1.style('background-color','#347bcc');
    btn1.mousePressed(setArray);
    btn2 = createButton("Visualize!!");
    btn2.style('width','165px');
    btn2.style('height','310px');
    btn2.style('border','none');
    btn2.style('border-radius','15px');
    btn2.style('position','absolute');
    btn2.style('bottom','10px');
    btn2.style('left','15px');
    btn2.style('color','white');
    btn2.style('font-weight','bold');
    btn2.style('font-size','large');
    btn2.style('font-family',"'Courier New',Courier,monospace");
    btn2.style('background-color','#347bcc');
    btn2.mousePressed(callFunc);
}
function callFunc(){
    mergeSort(values,0,values.length);
}
var mspeed = 100/slider.value();
function setArray(){
    background(255);
    size = slider.value()*10;
    w = width/size;
    values = new Array(floor(size));
    for(let i=0;i<values.length;i++){
        values[i]=Math.random()*height;
        state[i]=-1;
    }
}
/*var myPromise =new Promise(function(resolve,reject){
    setTimeout(resolve,1000);
});*/
/*async function moveit(){
    await myPromise;
    while(hole>0 && values[hole-1] > value){
        values[hole] = values[hole-1];
        hole = hole-1;
    }
}*/
function changeColor(){
    bg = color(floor(Math.random()*255));
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function mergeSort(val,li,ri){
    var n = ri -li;
    if(n < 2){
        return;
    }
    var mid = li + Math.round(n/2);
    /*for(let i=li;i<mid;i++){
        state[i] = 1;
    }
    for(let i=mid;i<ri;i++){
        state[i] = 1;
    }*/
    mergeSort(val,li,mid);
    mergeSort(val,mid,ri);
    await sleep(10);
    draw(val);
    merger(val,li,ri,mid);
}

async function merger(val,li,ri,mid){
    var result = [];
    var l = li;
    var r = mid;
    for(let i=li;i<mid;i++){
        state[i] = 1;
    }
    for(let i=mid;i<ri;i++){
        state[i] = 2;
    }
    while(l < mid && r < ri){
        if(val[l] <= val[r]){
            result.push(val[l++]);
        }
        else{
            result.push(val[r++]);
        }
    }
    while(l<mid){
        result.push(val[l++]);
    }
    while(r<ri){
        result.push(val[r++]);
    }
    for(let i=0;i<ri-li;i++){
        val[li+i] = result[i];
        state[i] = 0;
    }
}
function draw(){
    background(255);
    for(let i=0;i<values.length;i++){
        if(state[i]==-1){
            fill(255);
        }
        else if(state[i]==1){
            fill('#00008b');
        }
        else if(state[i]==0){
            fill('#90ee90');
        }
        else if(state[i]==2){
            fill('#eb1a1a');
        }
        rect(i*w,height-values[i],w,values[i]);
        if(i==values.length){
            return;
        }
    }
    
}





