var table;

var section = "Design & Tech";
var articles = [];
var titleOS = 20;
var vSpacing = 20;
var topPadding = 200;


function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  //table = loadTable('data/ksrea.csv', 'csv', 'header');
  //the file can be remote
  table = loadTable("https://docs.google.com/spreadsheets/d/e/2PACX-1vRi9ipGYonyrz7R0K9qGxOrchoK7RomUaHX84ycaoauhNKyGqNLZ2zb2pSFpLRwh5JS4P6O53dMxm2j/pub?output=csv", "csv", "header");
}

function setup() {
  var cnv =createCanvas(1000, 1000);
  //var cnvX=(windowWidth - width) / 2;
  //var cnvY=(windowHeight - height) / 2;
  //cnv.position(cnvX,cnvY);

  background(240);
  cnv.parent('sketch-holder');
  //count the columns
  // print(table.getRowCount() + ' total rows in table');
  // print(table.getColumnCount() + ' total columns in table');
  //print(table.getColumn('name'));

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

}
}
}

}

function draw() {
  background(240);
  for(var r=0; r < articles.length; r++){
  articles[r].display();
  articles[r].move();
  }
}

function mousePressed() {

  for(var r=0; r < articles.length; r++){
  articles[r].tX+=random(-10,10);
  }

}


// article class
function Article(_c,_r) {
  // this.x = random(width);
  // this.y = random(height);
  this.x = 100;
  this.y = 200+vSpacing*_r;
  this.tX = this.x;
  this.tY = this.y;
  this.dotCol = color(3, 71, 82,random(50,255));
  this.diameter = random(5, 10);
  this.speed = 1;
  this.title;
  this.link;
  this.category;
  this.section;
  this.date;
  this.day;
  this.month;
  this.year;
  this.tLink;

  this.createLink=function(){
     this.tLink = createA(this.link, "<div style='color:black; font-family: sans-serif;'>"+this.title+ "</div>", "_blank");
  };


  this.move = function() {
    if(this.x>this.tX){
      this.x-=this.speed;
    }
    if(this.y>this.tY){
      this.y-=this.speed;
    }
    if(this.x<this.tX){
      this.x+=this.speed;
    }
    if(this.y<this.tY){
      this.y+=this.speed;
    }
  };

  this.display = function() {
    noStroke();
    fill(this.dotCol);
    ellipse(this.x,this.y+6, this.diameter);
    this.tLink.position(this.x+titleOS,this.y+topPadding);

  }

};


// function openlink(_r){
//   var link = table.getString(_r,1);
//   print(link);
//   window.open(link);
// }
