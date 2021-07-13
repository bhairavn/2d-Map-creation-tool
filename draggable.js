class Draggable {
  constructor(x, y, w, h,color) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.color=color;
  }

  over() {
    // Is mouse over object
    if (mouseX/sf > this.x- this.w && mouseX/sf < this.x + this.w && mouseY/sf > this.y- this.h && mouseY/sf < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = (mouseX/sf + this.offsetX);
      this.y = (mouseY/sf + this.offsetY);
    }
  }

  show() {
    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      fill(100);
    } else if (this.rollover) {
      fill(100);
    } else {
       fill(this.color);
    }
    // rect(this.x, this.y, this.w, this.h);
    ellipse(this.x,this.y, this.w, this.h);
    textSize(conf.text_size*2);
    var x_text;
    var y_text;
    
    if(this.x<width/2 && this.y<height/2){
         x_text=str(-(width/2-this.x)/100);
         y_text=str((height/2-this.y)/100);
    }
    else if(this.x==width/2 && this.y<height/2){
         x_text=str(0);
         y_text=str((height/2-this.y)/100);
    }
    else if(this.x>width/2 && this.y<height/2){
         x_text=str((this.x-width/2)/100);
         y_text=str((height/2-this.y)/100);
    }
    
    else if(this.x<width/2 && this.y>height/2){
         x_text=str(-(width/2-this.x)/100);
         y_text=str(-(this.y-height/2)/100);
    }
    else if(this.x<width/2 && this.y==height/2){
         x_text=str(-(width/2-this.x)/100);
         y_text=str(0);
    }
    else if(this.x==width/2 && this.y==height/2){
         x_text=str(0);
         y_text=str(0);
    }
    else if(this.x==width/2 && this.y>height/2){
         x_text=str(0);
         y_text=str((height/2-this.y)/100);
    }
    else if(this.x>width/2 && this.y==height/2){
         x_text=str((this.x-width/2)/100);
         y_text=str(0);
    }
    else {
       x_text=str((this.x-width/2))/100;
       y_text=str(-(this.y-height/2))/100;
    }
    var text1=x_text+','+y_text
    if(conf.cone_coords){fill(conf.text_color);
    text(text1, this.x+4, this.y+15);
    }
  }

  pressed() {
    // Did I click on the rectangle?
    
    if (mouseX/sf > (this.x- this.w) && mouseX/sf < (this.x + this.w) && mouseY/sf > (this.y- this.h) && mouseY/sf < (this.y + this.h)) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = (this.x - mouseX/sf);
      this.offsetY = (this.y - mouseY/sf);
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}