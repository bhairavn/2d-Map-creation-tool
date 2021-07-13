
let shape;
var export_button;
var add_button;
var clear_button;
var import_button;

let cones=[]

var w, h, tow, toh;
var x_b, y_b, tox, toy;
var canvas;

var sf=1;
let conf;

function preload(){
	conf = loadJSON('settings.json');	
}

function setup() {
  canvas = createCanvas(conf.canvas_width, conf.canvas_height);
  
  let but_col = conf.button_color;
  
  w = tow = width;
  h = toh = height;
  x_b = tox = w / 2;
  y_b = toy = h / 2;
  
  input = createInput();
  input.position(15,20);
  input.size(40);
  input.style('background-color', color(220));
  
  add_button = createButton("add");
  add_button.position(65, 20);
  add_button.mouseClicked(add_cone_pressed);
  add_button.style('background-color', but_col);
  
  clear_button = createButton("clear");
  clear_button.position(115, 20);
  clear_button.mouseClicked(clear_cone_pressed);
  clear_button.style('background-color', but_col);
  
  export_button = createButton("export-json");
  export_button.position(168,20);
  export_button.mouseClicked(export_pressed);
  export_button.style('background-color', but_col);
  
  
  export_button = createButton("import-json-file");
  export_button.position(258,20);
  export_button.mouseClicked(import_pressed);
  export_button.style('background-color', but_col);
  
}
function add_cone_pressed(){
  add_cone(100,100);
}

let impcone;
function import_pressed(){
  impcone = loadJSON(str(conf.data_url), loadData);
  }
function loadData(){
   temp=impcone["cones"]
  cones=[]

  if(conf.import_grid_data){
    for (var t=0;t<temp.length;t++)
  {
    // print(t)
    var xt =temp[t]["x"];
    var yt = temp[t]["y"];
    
     if(xt<0 && yt<0){
         xt=(width/2+xt*100);
         yt=(height/2-yt*100);
       print(xt+","+yt)
    }
    else if(xt==0 && yt<0){
         xt=width/2;
         yt=(height/2-yt*100);
    }
    else if(xt>0 && yt<0){
         xt=(width/2+xt*100);
         yt=(height/2-yt*100);
    }
    
    else if(xt<0 && yt>0){
         xt=(width/2+xt*100);
         yt=(height/2-yt*100);
    }
    
    else if(xt<0 && yt==0){
         xt=(width/2+xt*100);
         yt=height/2;
    }
    else if(xt==0 && yt==0){
         xt=width/2;
         yt=height/2;
    }
    else if(xt==0 && yt>0){
         xt=width/2;
         yt=(height/2-yt*100);
    }
    else if(xt>0&& yt==0){
         xt=(xt*100+width/2);
         yt=height/2;
    }
    else {
       xt=(xt*100+width/2);
       yt=(height/2-yt*100);
    }
    
    shape = new Draggable(xt,yt, conf.ellipse_width, conf.ellipse_height, temp[t]["color"]);
    // print(shape)
     cones.push(shape);
  }
    
  }
  else
  {
  for (var t=0;t<temp.length;t++)
  {
    // print(t)
    shape = new Draggable(temp[t]["x"],temp[t]["y"], conf.ellipse_width, conf.ellipse_height, temp[t]["color"]);
    // print(shape)
     cones.push(shape);
  }
  }
}
function clear_cone_pressed(){
  cones=[]
}

function draw() {
  scale(sf);
  background(conf.background_color);
  
  x_b = lerp(x_b, tox, 0.1);
  y_b = lerp(y_b, toy, 0.1);
  w = lerp(w, tow, 0.1); 
  h = lerp(h, toh, 0.1);
  var count=height/200;
  var count1=width/200;
  canvas.position( x_b-w/2, y_b-h/2, w, h);
  
  textSize(conf.text_size);
  fill(conf.text_color);
  text('0,0',  width/2, height/2);

  for(var i=0; i<height/2; i+=100){
    textSize(conf.text_size);
    fill(conf.text_color);
    text(str(count),  1, i);
    text(str(count), width/2, i);
    line(0, i, width, i);
    count-=1;
  }
  for(var i=height/2; i<height; i+=100){
    textSize(conf.text_size);
    fill(conf.text_color);
    text(str(count),  1, i);
    text(str(count),  width/2, i);
    line(0, i, width, i);
    count-=1;
  }
  for(var j=0; j<width/2; j+=100){
    textSize(conf.text_size);
    fill(conf.text_color);
    text(str(-count1),  j+1, 10);
    text(str(-count1),  j+1,height/2);
    line(j, 0, j, height);
    count1-=1;
  }
  for(var j=width/2; j<width; j+=100){
    textSize(conf.text_size);
    fill(conf.text_color);
    text(str(count1),  j+1, 10);
    text(str(count1),  j+1, height/2);
    line(j, 0, j, height);
    count1+=1;
  }

  for (i = 0; i < cones.length; i++) {
    cones[i].over();
    cones[i].update();
    cones[i].show();
  }
}

function add_cone(x,y) {
  var color = input.value();
  if (color==''){
    color='white';
  }
  shape = new Draggable(x, y, conf.ellipse_width, conf.ellipse_height, color);
  cones.push(shape);
}

function add_blue_cone(x,y) {
  shape = new Draggable(x, y, conf.ellipse_width, conf.ellipse_height,'blue');
  cones.push(shape);
}

function add_yellow_cone(x,y) {
  shape = new Draggable(x, y,  conf.ellipse_width, conf.ellipse_height,'yellow');
  cones.push(shape);
}

function add_red_cone(x,y) {
  shape = new Draggable(x, y,  conf.ellipse_width, conf.ellipse_height,'red');
  cones.push(shape);
}

function keyTyped(){
 if(key=='R'){
    add_red_cone(mouseX/sf,mouseY/sf);
  }
  if(key=='B'){
    add_blue_cone(mouseX/sf,mouseY/sf);
  }
  if(key=='Y'){
    add_yellow_cone(mouseX/sf,mouseY/sf);
  }
  if(key=='P'){
    w = tow = width;
    h = toh = height;
    x_b = tox = w / 2;
    y_b = toy = h / 2;
    sf=1
  }
}


function keyPressed() {
  if (keyCode === DELETE) {
    for (i = 0; i < cones.length; i++) {
      if (cones[i].dragging==true)
         cones.splice(i,1);
    }
  }
}

function mousePressed() {
  for (i = 0; i < cones.length; i++) {
  cones[i].pressed();
  }
}

function mouseReleased() {
    for (i = 0; i < cones.length; i++) {
  cones[i].released();
  }
}

function mouseDragged() {
  if (keyCode === CONTROL || mouseButton === RIGHT){
  tox += mouseX-pmouseX;
  toy += mouseY-pmouseY;
}
}

window.addEventListener("wheel", function(e) {
  if (e.deltaY > 0)
    sf *= 1.05;
  else
    sf *= 0.95;
});

function export_pressed(){
  var json_array_raw = [];
  var json_array_grid=[];
  
  if(conf.save_raw_data)
  {
    for (var i=0;i<cones.length;i++){
      json_array_raw.push({x: cones[i].x,
                           y: cones[i].y,
                           color: cones[i].color}); 
    }
    var raw_json={"cones":json_array_raw} 
    saveJSON(raw_json, 'raw_data.json', true);
  }
  
  var x_val;
  var y_val;
  for (var i=0;i<cones.length;i++){
  
    if(cones[i].x<width/2 && cones[i].y<height/2){
         x_val=-(width/2-cones[i].x)/100;
         y_val=(height/2-cones[i].y)/100;
    }
    else if(cones[i].x==width/2 && cones[i].y<height/2){
         x_val=0;
         y_val=(height/2-cones[i].y)/100;
    }
    else if(cones[i].x>width/2 && cones[i].y<height/2){
         x_val=(cones[i].x-width/2)/100;
         y_val=(height/2-cones[i].y)/100;
    }
    
    else if(cones[i].x<width/2 && cones[i].y>height/2){
         x_val=-(width/2-cones[i].x)/100;
         y_val=-(cones[i].y-height/2)/100;
    }
    else if(cones[i].x<width/2 && cones[i].y==height/2){
         x_val=-(width/2-cones[i].x)/100;
         y_val=0;
    }
    else if(cones[i].x==width/2 && cones[i].y==height/2){
         x_val=0;
         y_val=0;
    }
    else if(cones[i].x==width/2 && cones[i].y>height/2){
         x_val=0;
         y_val=(height/2-cones[i].y)/100;
    }
    else if(cones[i].x>width/2 && cones[i].y==height/2){
         x_val=(cones[i].x-width/2)/100;
         y_val=0;
    }
    else {
       x_val=(cones[i].x-width/2)/100;
       y_val=-(cones[i].y-height/2)/100;
    }
    json_array_grid.push({x: x_val, y: y_val, color: cones[i].color}); 
  } 
  var grid_json={"cones":json_array_grid}  
  // var json = JSON.stringify(cones);
  // console.log(json);
  saveJSON(grid_json, 'gridconv_data.json', true);

}
