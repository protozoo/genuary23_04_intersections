
const W = 800;
const H = 600;
const margin = 300;
const steps = [2,4,8,16,32];

let colors = ["4d0838","f3722c","f8961e","f9844a","f9c74f","90be6d","43aa8b","4d908e","577590","277da1"];
//colors = ["001219","005f73","0a9396","94d2bd","e9d8a6","ee9b00","ca6702","bb3e03","ae2012","9b2226"];
//colors = ["70d6ff","ff70a6","ff9770","ffd670","e9ff70"];
//colors = ["f6bd60","f7ede2","f5cac3","84a59d","f28482"];

function setup(){
    createCanvas(W, H);
    background( "#" + colors[0] );
    printGrid();
}

function draw(){
}

function rad2deg( rad ){
    return rad * 180 / Math.PI;
}

function deg2rad( deg ){
    return deg * Math.PI / 180;
}

function printGrid(){
    rotate( deg2rad(8 - Math.random() * 16) );
    // Rows
    let lastX = -margin;
    while( lastX < W+margin ){
        let step = steps[ Math.floor(Math.random() * steps.length) ];
        let numReps = 30 / step; //2 + Math.floor( Math.random()*10 );
        let x;
        stroke( "#" + colors[ Math.floor(Math.random()*colors.length) ]);
        for(let j = 0; j < numReps; j++){
            x = lastX + j*step;
            if( x > W+margin){
                break;
            }
            line(x, -margin, x, H+margin);
        }
        lastX = x;
    }
    // Columns
    let lastY = -margin;
    inbound = true;
    while( lastY < H+margin ){
        let step = steps[ Math.floor(Math.random() * steps.length) ];
        let numReps = 30 / step; //2 + Math.floor( Math.random()*10 );
        let y;
        stroke( "#" + colors[ Math.floor(Math.random()*colors.length) ]);
        for(let j = 0; j < numReps; j++){
            y = lastY + j*step;
            if( y > H+margin){
                break;
            }
            line(-margin, y, W+margin, y);
        }
        lastY = y;
    }
}