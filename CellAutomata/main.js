



function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


function Population (width,height){
    
    
    this.rows = [];
    for(var i = 0; i < height ; i++){

        var row = [];

        for(var j = 0; j < width; j++){

            row.push(false);

        }

        this.rows.push(row);

    }


    this.initialiseRandomPopulation = function(startingPopulation){
        
        var usedCells = [];

        for(var i = 0; i < startingPopulation ; i++){

            var go = true;

            while(go){
                

                var x = getRandomInt(width);
                var y = getRandomInt(height);

                var proposedCell = [x,y];

                var useCell = true;

                for(var c in usedCells){
                    var cell = usedCells[c];

                    if(cell[0] == proposedCell[0] && cell[1] == proposedCell[1]){
                        useCell = false;
                        
                    }

                }


                if(useCell == true){

                    this.rows[x][y] = true; 
                    
                    usedCells.push(proposedCell);

                    go = false;

                }
            }
        }

       
    }

    this.aplyChanges = function(changes){

        for(var c in changes){

            var change = changes[c];

            var x = change[0];
            var y = change[1];

            var cell = this.rows[x][y];

            if(cell == true){

                cell = false;
            }else{

                cell = true;

            }

            this.rows[x][y] = cell;

        }



    }
}



function Grid(elementId,iterator,population){


    var trueColour = "rgb(255, 0, 0)";
    var falseColour = "#ccccff";

    var cellDivs = [];
    var cellSize = 4;
    var topMargin = 50;
    var leftMargin = 200;

    this.gridDiv = document.getElementById(elementId);

    for(var r in population.rows){

        var row = population.rows[r];

        var divRow = []

        for(var c in row){
            var cellName = "cell" + r +","+c;
            var cell = row[c];

            var colour = falseColour;
            if(cell == true){

                colour = trueColour;
            }
            
            var top = (r * cellSize) + topMargin;  
            var left = (c * cellSize) + leftMargin;

            var cellDiv = document.createElement("div");
            cellDiv.style.position = 'absolute';
            cellDiv.style.backgroundColor = colour ;
            cellDiv.style.width = cellSize+"px";
            cellDiv.style.height = cellSize+"px";
            cellDiv.style.left = left+"px";
            cellDiv.style.top = top+"px";
            
            this.gridDiv.appendChild(cellDiv);

            divRow.push(cellDiv);
        }

        cellDivs.push(divRow);
    }
    

    function updateGrid(changes){

        for(var c in changes){

            var cell = changes[c];

            var x = cell[0];
            var y = cell[1];

            var cellDiv = cellDivs[x][y];


            if(cellDiv.style.backgroundColor == trueColour){

                cellDiv.style.backgroundColor = falseColour;
            }else{

                cellDiv.style.backgroundColor = trueColour;
            }

        }

    }

    this.iterate = function(){

        setInterval(doOneIteration,250);

        function doOneIteration(){
            var changes = iterator.evolve(population);

            population.aplyChanges(changes);

            updateGrid(changes);

        }

    };
}

function GameOfLifeIterator(){

    function checkNumNeighbours(coordinates, population){
        var x = parseInt( coordinates[0]);
        var y = parseInt( coordinates[1]);

        var height = population.length;
        var width = population[0].length;

        var numberOfNeighbours = 0;


        var offSets = [
            [-1,1],
            [0,1],
            [1,1],
            [1,0],
            [1,-1],
            [0,-1],
            [-1,-1],
            [-1,0]
        ];

        for(var o in offSets){

            var offSet = offSets[o];

            var offSetX = x+offSet[0];
            var offSetY = y+offSet[1];

            if(inHeight(offSetY) && inWidth(offSetX)){

                if(population[offSetX][offSetY]){
                    numberOfNeighbours++
                }
            }
        }


        function inHeight(yCoordinate){

            if(yCoordinate >= 0 && yCoordinate < height){
                return true;
            }else{
                return false;
            }

        }

        function inWidth(xCoordinate){

            if(xCoordinate >= 0 && xCoordinate < width){
                return true;
            }else{
                return false;
            }

        }
        return numberOfNeighbours;
        
    }

    this.evolve = function(Population){

        var changes = [];

        var population = Population.rows;

        for(var r in population){

            var row = population[r];

            for(var c in row){

                var cell = row[c];
                var coordinates = [r,c];
                var numberOfNeighbours = checkNumNeighbours(coordinates, population);

                //Cell Comes to life
                if(cell == false && numberOfNeighbours == 3){
                    changes.push(coordinates);
                }

                // cell dies from Exposure
                if(cell == true && numberOfNeighbours < 2){

                    changes.push(coordinates);
                }

                // cell dies from OverCrowding 

                if(cell == true && numberOfNeighbours > 3){

                    changes.push(coordinates);

                }


            }
        }

        return changes;

    }
}


function onGo () {

    var width = document.getElementById('widthIn').value;
   // var width = 100;

    var height = document.getElementById('heightIn').value;
    // var height = 100;


    var startingPopulation = document.getElementById('populationIn').value;

    // var startingPopulation = 2500;

    var populationSeed = new Population(width,height);

    populationSeed.initialiseRandomPopulation(startingPopulation);

    var iterator = new GameOfLifeIterator();

    var grid = new Grid("grid",iterator,populationSeed);

    grid.iterate();

}


function arraydemo (){

    var myArray = [];  //instanciates a new empoty array
    var ma2 = [1,2,3,4];

    myArray.push(2);// adds a 2 to the end of myArray
    myArray.push([]);  // adds a new empty array to the end of myArray 

    var ma3 = [[0,1,2],[3,4,5],[6,7,8]];
    var i12 = ma3[1][2] ;// resolves to 5

    function makeArray(){
        return [1,2,3];
    }
    var r = makeArray()[1] ;// resolves 2

    var aaa = [];
    for (var i = 0 ; i<10 ; i++ ) {
        aaa.push(i);
    }

    // aaa = [0,1,2,3,4,5,6,7,8,9]

    var bbb  = [0,'hello',null,NaN,function(){return 5;},[0,0,0]];







}