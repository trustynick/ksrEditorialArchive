var table;

function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  //table = loadTable('data/ksrea.csv', 'csv', 'header');
  //the file can be remote
  table = loadTable("https://docs.google.com/spreadsheets/d/e/2PACX-1vRi9ipGYonyrz7R0K9qGxOrchoK7RomUaHX84ycaoauhNKyGqNLZ2zb2pSFpLRwh5JS4P6O53dMxm2j/pub?output=csv", "csv", "header");
}

function setup() {
  createCanvas(1000, 1000);
  //count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');

  print(table.getColumn('name'));

  //cycle through the table
  for (var r = 0; r < table.getRowCount(); r++)
    for (var c = 0; c < table.getColumnCount(); c++) {
      print(table.getString(r, c));

textSize(12);
if(c ===0){


//fill(255,0,0);
//text(table.getString(r, 1), 10, 20+20*r);
//createA(table.getString(r, 1), table.getString(r, 0));

createP("hi this is your pair of graphs")
createA('https://p5js.org/examples/dom-modifying-the-dom.html', "sample text");
}


    }
}

// function openlink(_r){
//   var link = table.getString(_r,1);
//   print(link);
//   window.open(link);
// }
