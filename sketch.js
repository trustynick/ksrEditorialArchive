var table;
var section = "Design & Tech";
var articles = [];
var selecters = [];
var titleOS = 20;
var vSpacing = 20;
var topPadding = 200;
var selSpacing = 100;
var catSel;
var displayedX = 100;
var nondisplayedX = 600;
var speed = 10;
var randomButton;
var randomURL;
var selectedImg;
var imgArray = [];

function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  //table = loadTable('data/ksrea.csv', 'csv', 'header');
  //the file can be remote
  //test
  //table = loadTable("https://docs.google.com/spreadsheets/d/e/2PACX-1vRp9CDCJKJvPug_GcCjOf2YmDlh57-M6dh3DdhfKyYEqOSunPLGYFTuqV2UoHLRFwgkmcMX_wy3aKiz/pub?output=csv", "csv", "header");
//full
table = loadTable("https://docs.google.com/spreadsheets/d/e/2PACX-1vRi9ipGYonyrz7R0K9qGxOrchoK7RomUaHX84ycaoauhNKyGqNLZ2zb2pSFpLRwh5JS4P6O53dMxm2j/pub?output=csv", "csv", "header");
}


function setup() {
  var cnv =createCanvas(windowWidth, windowHeight *10);
  //var cnvX=(windowWidth - width) / 2;
  //var cnvY=(windowHeight - height) / 2;
  //cnv.position(cnvX,cnvY);

  background(240);
  cnv.parent('sketch-holder');
  //count the columns
  // print(table.getRowCount() + ' total rows in table');
  // print(table.getColumnCount() + ' total columns in table');
  //print(table.getColumn('name'));

catSel = new Select(100,220);

  //cycle through the table
  for (var r = 0; r < table.getRowCount(); r++){
    for (var c = 0; c < table.getColumnCount(); c++) {
      //print(table.getString(r, c));

switch(c) {
    case 0:
    {
    articles.push(new Article(c,r));
      articles[r].title = table.getString(r, c);
    }
        break;
    case 1:
    {
    articles[r].link = table.getString(r, c);
    articles[r].createLink();
    //print(articles[r].link);
    }
        break;

    case 2: //category
    {
    articles[r].category = table.getString(r, c);
    //print(articles[r].category);
    catSel.addOption(articles[r].category);

    }
        break;

    case 3: {
    articles[r].section = table.getString(r, c);

    break;
    }

    case 5: {
    articles[r].source = table.getString(r, c);

    break;

}
}
}
}
randomButton();
filterSelection();

//selectedImg = loadImage(path,successCallback,failureCallback)

}

function draw() {
  background(240);
  catSel.display();

  for(var r=0; r < articles.length; r++){
  articles[r].display();
  articles[r].move();
  }

//filterSelection();
}

function mousePressed(){
}
function mouseReleased() {
//randomLinkGen();
//filterSelection();
  //print(catSel.selectedItem);
  //print(catSel.sel.value());

}


filterSelection = function(){
  catSel.setVal();
for(var i=0; i<articles.length; i++){
  if(articles[i].category == catSel.selectedItem){
    articles[i].selected=true;
    //print(articles[i].title+" = "+ articles[i].selected);
  }

  if(articles[i].category != catSel.selectedItem)
  {articles[i].selected=false;}

  if(  articles[i].source == "year"){
  articles[i].selected=true;
  }

  //print(articles[i].title+" = "+ articles[i].selected);
}
//sayHi();

}

sayHi = function(){
  print("hi there "+random(10));
}

// selecter class
function Select(_x,_y){
this.x = _x;
this.y = _y;
this.options = [];
this.sel = createSelect();
this.sel.changed(filterSelection);
//this.sel = createRadio();
this.selectedItem = "all";
//this.sel.changed(this.mySelectEvent());

this.addOption = function(_o){
this.options.push("all");
found = false;
for(var i=0; i<this.options.length; i++){
if(this.options[i]==_o){
  //print("already have"+_o);
  found=true;
}
if(i==this.options.length-1 && found==false){
  this.options.push(_o);
  this.sel.option(_o);
    //print("added"+_o);
  }
}
}

// this.mySelectEvent = function(){
//
// }
this.setVal=function(){
this.selectedItem = this.sel.value();
}

this.display =function(){
this.sel.position(this.x,this.y);
this.setVal();
}
}


// article class
function Article(_c,_r) {
  // this.x = random(width);
  // this.y = random(height);
  this.x = displayedX;
  this.y = 200+vSpacing*_r;
  this.tX = this.x;
  this.tY = this.y;
  this.dotCol = color(3, 71, 82,random(50,255));
  this.diameter = random(5, 10);
  this.speed = speed;
  this.title; //0
  this.link; //1
  this.category; //2
  this.section; //3
  this.date; //4
  this.day;
  this.month;
  this.year;
  this.source
  this.tLink;
  this.selected = true;


  this.createLink=function(){
     this.tLink = createA(this.link, "<div style='color:black; font-family: sans-serif;'>"+this.title+ "</div>", "_blank");
  };

  this.move = function() {
    if(this.x>this.tX){
      this.x-=this.speed;
      this.speed = abs(this.x-this.tX)/speed;
    }
    if(this.y>this.tY){
      this.y-=this.speed;
      this.speed = abs(this.y-this.tY)/speed;
    }
    if(this.x<this.tX){
      this.x+=this.speed;
      this.speed = abs(this.x-this.tX)/speed;
    }
    if(this.y<this.tY){
      this.y+=this.speed;
      this.speed = abs(this.y-this.tY)/speed;
    }
  };

  this.display = function() {
    noStroke();
    fill(this.dotCol);
    this.tLink.position(this.x+titleOS,this.y+topPadding);
    ellipse(this.x,this.y+6, this.diameter);

    if(this.selected){
    this.tX=displayedX;
  }
  else this.tX= nondisplayedX;
  }
};

randomLinkGen =function(){
  randIndex =int(random(articles.length));
  randomURL=articles[randIndex].link;
  window.open(randomURL, "_blank");
  //print(randomURL);
  //return randomURL;
}
randomButton = function(){
randomButton=createButton('Random Article');
randomButton.position(100,260);
randomButton.mousePressed(randomLinkGen);
}
