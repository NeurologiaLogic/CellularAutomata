class Node
{
  constructor(x,y)
  {
    this.isAlive = 0;
    this.x = x;
    this.y = y;
  }
};

const length = 10;
let states = [];
for (let i = 0; i < length; i++) {
  states[i] = [];
  for (let j = 0; j < length; j++) {
    states[i][j] = new Node(i,j);
  }
}




let generation = 0;

const isOutOfBounds = (x,y) =>
{
  return x < 0 || x >= length || y < 0 || y >= length;
}

//B3/S12345 and B3/S1234
//Maze and Mazectric

const checkNeighbours = (x,y) =>
{
  console.log("check neighbors");
  //do something here
  //check for 8 neightbours
  

}
while(generation<20)
{
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      checkNeighbours(i,j);
    }
  }





  generation++;
}



