import { Component, OnInit } from '@angular/core';

interface Tile{
  isMine: boolean;
  isRevealed: boolean;
  numAdjMines?: number;
}

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css']
})
export class MinesweeperComponent implements OnInit{
  grid: Tile[][] = makeGameGrid(10,10,8);
  
  ngOnInit(): void {
    console.log("grid",this.grid[-1]) 
    // this.reveal(2,6) ;  
  }
  
  reveal(row:number, col:number){
    console.log()
    if(row < 0 || col <0 ||
       row > this.grid.length ||
        col > this.grid[0].length){
          return ;
        };
    const tile = this.grid[row][col];
    if(tile.isRevealed) return;

    if(tile.isMine){
      //TODO: you loose the whole board
    }

    tile.isRevealed = true;
    if(tile.numAdjMines === 0){
      for(let i= -1; i =1; i++){
        for(let j= -1; j <= 1; j++){
          this.reveal(i,j);
        }
      }
    }

    
  
  }

}


//functions outside class

function makeGameGrid(rows: number, cols: number,mines: number){
  const result:Tile[][] =[];
  let mineCount = 0;
  for(let r= 0; r< rows; r++){
    result.push([]);
    for(let c=0; c< cols; c++){
      result[r].push({
        isMine: mineCount++ < mines,
        isRevealed: false
      })
    }

  }
  shuffle(result);
  return result;
}


function shuffle(grid: Tile[][]){
  const totalTiles = grid.length * grid[0].length;
  let count=0;
  for(let i =0; i< totalTiles-2; i++)
  {
    const swapIndex = Math.floor(Math.random() * (totalTiles -1));
    console.log("swapIndex:",swapIndex, " ", "count:",++count)
    let swapRow = Math.floor(swapIndex / grid.length);    
    let swapCol = Math.floor(swapIndex % grid[0].length);
    let orgRow = Math.floor(i / grid.length);
    let orgCol = Math.floor(i % grid[0].length);
    console.log("swapRow:",swapRow,"-","orgRow:",orgRow, " ","swapCol:",swapCol,"-","orgCol:",orgCol);    

    [grid[orgRow][orgCol], grid[swapRow][swapCol] ] = [grid[swapRow][swapCol], grid[orgRow][orgCol]];

  }
  return grid;
}