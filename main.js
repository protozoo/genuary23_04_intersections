//thanks @Yazid for these two helper functions
function random_num(a, b) {
    return a+(b-a)*fxrand()
  }
function random_int(a, b) {
  return Math.floor(random_num(a, b+1))
}

function randomChoice(arr) {
  return arr[Math.floor(random_num(0,1) * arr.length)];
}


// will decide on mobile mode unless there is a pointer device with hover capability attached
let is_mobile = window.matchMedia("(any-hover: none)").matches

// hashes = "hriirieiririiiritiififiviviifj"
// if(hashes==="debug"){hashes=random_num(0,1000000)}
fxrand = sfc32(...hashes)

const W = window.innerWidth;
const H = window.innerHeight;
const margin = 300;
const steps = [2,4,8,16,32];

let colors = ["4d0838","f3722c","f8961e","f9844a","f9c74f","90be6d","43aa8b","4d908e","577590","277da1"];
colors = ["001219","005f73","0a9396","94d2bd","e9d8a6","ee9b00","ca6702","bb3e03","ae2012","9b2226"];
//colors = ["70d6ff","ff70a6","ff9770","ffd670","e9ff70"];
//colors = ["f6bd60","f7ede2","f5cac3","84a59d","f28482"];
colors = ["0c0f0a","ff206e","fbff12","41ead4","ffffff"];
colors = ["3a3335","d81e5b","f0544f","fdf0d5","c6d8d3"];

let wh = H
let ww = W
let mycan
let pd=2;
let dd;

function setup(){
    mycan = createCanvas(W, H);
    

    shred_count=0;
    shred_lim=random_int(10,60);
    water_n=1;

    dd=displayDensity()
    let df = Math.ceil(dd * pd * 0.5)
    if(is_mobile){df/=3}
    console.log([dd,pd,df,ww,wh])
    pixelDensity(df);
    background("#"+colors[0]);
    blendMode(BLEND);
    noSmooth();

    printGrid();

}

function draw(){
    noSmooth();

    //blendMode(OVERLAY)

    if(shred_count<shred_lim){

      let x;
      let y;
      let shw;

      // entropy locking
      if (random_int(1,1000)>997)fxrand=sfc32(...hashes)
      if (random_int(1,1000)>997)fxrand=sfc32(...hashes)

        // tearing effect
        for (let i=0;i<water_n;i++) {
          y=random_int(0,wh)
          shw=wh/randomChoice([64,32,128,256])

          if(is_mobile) {  //mobile device
            blend(0, y, ww, shw, random_int(-20,200), y, ww, shw, DIFFERENCE)
          } else {
            image(mycan, 0, y, ww, shw, random_int(-20,200), y, ww, shw)
          }
        }
      
        // // // water vfx
        for (let i=0;i<water_n;i++) {
          x=random_int(0,ww)
          shw=ww/randomChoice([64,32,128,256])
          if (is_mobile) {
            blend(x, 0, shw, wh, x, random_int(-20,200), shw, wh, DIFFERENCE)
          } else {
            image(mycan, x, 0, shw, wh, x, random_int(-20,200), shw, wh)
          }
        }

      shred_count+=1

      return
    } else {
      // done rendering fully
      fxpreview()
      noLoop()
      return
    }

}

function rad2deg( rad ){
    return rad * 180 / Math.PI;
}

function deg2rad( deg ){
    return deg * Math.PI / 180;
}

function printGrid(){
    rotate( deg2rad(90 - fxrand() * 180) );
    // Rows
    let lastX = -margin;
    while( lastX < W+margin ){
        let step = steps[ Math.floor(fxrand() * steps.length) ];
        let numReps = 30 / step; //2 + Math.floor( fxrand()*10 );
        let x;
        stroke( "#" + colors[ Math.floor(fxrand()*colors.length) ]);
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
        let step = steps[ Math.floor(fxrand() * steps.length) ];
        let numReps = 30 / step; //2 + Math.floor( fxrand()*10 );
        let y;
        stroke( "#" + colors[ Math.floor(fxrand()*colors.length) ]);
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

// ux
function keyTyped() {
  if (key === 's') {
    save(mycan, "genuary2023-4_protozoo_aebrer.png")
  }
}