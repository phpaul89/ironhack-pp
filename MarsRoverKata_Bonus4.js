/* ===== Boundaries ===== */

// Grid layer [x, y] without negative values
const gridMin = 0;
const gridMax = 10;

// Obstacle layer inside grid boundaries, small stone at [2,6], little mountain at area [6,4] to [8,6]
// JSON.stringify() to make coordinates comparable between environment and rovers
const obstacles = [
                   [2,6],
                   [6,4],[6,5],[6,6],
                   [7,4],[7,5],[7,6],
                   [8,4],[8,5],[8,6]
                  ];
const obstaclesStr = JSON.stringify(obstacles);
/* ===== end of Boundaries ===== */


/* ===== Rover Objects Go Here ===== */

// Define objects 'rover' with starting positions, 'N' for facing north
let roverA = {
    direction: "N",
    x: 0,
    y: 0,
    travelLog: [[0,0]]
}

let roverB = {
    direction: "N",
    x: 9,
    y: 9,
    travelLog: [[9,9]]
}
/* ===== end of Rover Object =====*/


/* ===== Function block starts here ===== */
function turnLeft(rover){
    console.log("Rover currently faces: " + rover.direction);
    console.log("Initiating a left turn!");
  
    // re-define direction property here
    switch(rover.direction) {
      case "N": rover.direction = "W"; break;
      case "W": rover.direction = "S"; break;
      case "S": rover.direction = "E"; break;
      case "E": rover.direction = "N"; break;
    }
  
    console.log("Rover now faces: " + rover.direction);
  }
  
  function turnRight(rover){
    console.log("Rover currently faces: " + rover.direction);
    console.log("Initiating a right turn!");
  
    // re-define direction property here
    switch(rover.direction) {
      case "N": rover.direction = "E"; break;
      case "E": rover.direction = "S"; break;
      case "S": rover.direction = "W"; break;
      case "W": rover.direction = "N"; break;
    }
  
    console.log("Rover now faces: " + rover.direction);
  }
  
  function moveForward(rover){
    console.log("Current coordinates: " + "x: " + rover.x + ", y: " + rover.y);
    console.log("Initiating move forward!");
    
    //case structure logic: 
    //1. check if boundaries will be touched 
    //2. check if obstacles will be touched -> includes() and JSON.stringify() needed for comparability [x,y]
    //3. check if another rover will be touched -> checkFleet() for dynamic positioning
    //4. move forward according to direction of rover
    
    switch(rover.direction) {
      case "N": if(rover.y == gridMin){
                  console.log("Rover is at the boundary and cannot move forward!"); 
                  rover.travelLog.push("Hit the boundary at: ");
                } else if(obstaclesStr.includes(JSON.stringify([rover.x,rover.y-1])) == true){
                    console.log("Rover is facing an obstacle and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else if(checkFleet(rover.x,rover.y-1) == true){
                    console.log("Rover is facing another Rover and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else {rover.y--;} break;
        
      case "W": if(rover.x == gridMin){
                  console.log("Rover is at the boundary and cannot move forward!");
                  rover.travelLog.push("Hit the boundary at: ");
                } else if(obstaclesStr.includes(JSON.stringify([rover.x-1,rover.y])) == true){
                    console.log("Rover is facing an obstacle and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else if(checkFleet(rover.x-1,rover.y) == true){
                    console.log("Rover is facing another Rover and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else {rover.x--;} break;
        
      case "S": if(rover.y == gridMax){
                  console.log("Rover is at the boundary and cannot move forward!");
                  rover.travelLog.push("Hit the boundary at: ");
                } else if(obstaclesStr.includes(JSON.stringify([rover.x,rover.y+1])) == true){
                    console.log("Rover is facing an obstacle and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else if(checkFleet(rover.x,rover.y+1) == true){
                    console.log("Rover is facing another Rover and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else {rover.y++;} break;
        
      case "E": if(rover.x == gridMax){
                  console.log("Rover is at the boundary and cannot move forward!");
                  rover.travelLog.push("Hit the boundary at: ");
                } else if(obstaclesStr.includes(JSON.stringify([rover.x+1,rover.y])) == true){
                    console.log("Rover is facing an obstacle and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else if(checkFleet(rover.x+1,rover.y) == true){
                    console.log("Rover is facing another Rover and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else {rover.x++;} break;
    }
    
    console.log("New coordinates: " + "x: " + rover.x + ", y: " + rover.y);
    rover.travelLog.push([rover.x, rover.y]);
  }

function moveBackward(rover){
    console.log("moveBackward was called");
    console.log("Current coordinates: " + "x: " + rover.x + ", y: " + rover.y);
    console.log("Initiating move backward!");
    
    //case structure logic: 
    //1. check if boundaries will be touched 
    //2. check if obstacles will be touched -> includes() and JSON.stringify() needed for comparability [x,y]
    //3. check if another rover will be touched -> checkFleet() for dynamic positioning
    //4. move backward according to direction of rover
  
    switch(rover.direction) {
      case "N": if(rover.y == gridMax){
                  console.log("Rover is at the boundary and cannot move backward!"); 
                  rover.travelLog.push("Hit the boundary at: ");
                } else if(obstaclesStr.includes(JSON.stringify([rover.x,rover.y+1])) == true){
                    console.log("Rover is facing an obstacle and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else if(checkFleet(rover.x,rover.y+1) == true){
                    console.log("Rover is facing another Rover and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else {rover.y++;} break;
        
      case "W": if(rover.x == gridMax){
                  console.log("Rover is at the boundary and cannot move backward!");
                  rover.travelLog.push("Hit the boundary at: ");
                } else if(obstaclesStr.includes(JSON.stringify([rover.x+1,rover.y])) == true){
                    console.log("Rover is facing an obstacle and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else if(checkFleet(rover.x+1,rover.y) == true){
                    console.log("Rover is facing another Rover and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else {rover.x++;} break;
        
      case "S": if(rover.y == gridMin){
                  console.log("Rover is at the boundary and cannot move backward!");
                  rover.travelLog.push("Hit the boundary at: ");
                } else if(obstaclesStr.includes(JSON.stringify([rover.x,rover.y-1])) == true){
                    console.log("Rover is facing an obstacle and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else if(checkFleet(rover.x,rover.y-1) == true){
                    console.log("Rover is facing another Rover and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else {rover.y--;} break;
        
      case "E": if(rover.x == gridMin){
                  console.log("Rover is at the boundary and cannot move backward!");
                  rover.travelLog.push("Hit the boundary at: ");
                } else if(obstaclesStr.includes(JSON.stringify([rover.x-1,rover.y])) == true){
                    console.log("Rover is facing an obstacle and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else if(checkFleet(rover.x-1,rover.y) == true){
                    console.log("Rover is facing another Rover and cannot move in the desired direction.");
                    rover.travelLog.push("Prevented collision at: ");
                } else {rover.x--;} break;
    }
    
    console.log("New coordinates: " + "x: " + rover.x + ", y: " + rover.y);
    rover.travelLog.push([rover.x, rover.y]);
  }

  function moveSequence(protocol,rover){
    console.log("There are " + protocol.length + " inputs for this command");
    protocol = protocol.toLowerCase(); //normalize input to all lowercase characters
    
    // iterate through string literal to search for valid commands
    // if valid command (l,r,f,b) is found, then functions will be executed accordingly, 
    // else -> input error message (see 'default:')
    for (let i = 0; i < protocol.length; i++){
      console.log("Current action is: " + protocol[i]);
      
      switch(protocol[i]){
        case "l": turnLeft(rover); break;
        case "r": turnRight(rover); break;
        case "f": moveForward(rover); break;
        case "b": moveBackward(rover); break;
        default: console.log("Unknown input, Rover didn't move! Executing next input."); break;
      }
    }
    
  }

  function checkFleet(x,y){
    // multiple rover objects pass through same functions, so a comparison of coordinates
    // cannot be made on the main function levels (turnLeft,turnRight,moveForward,moveBackward),
    // therefore this checking function is implemented where the current coordinates of all rovers
    // are retrieved and serve as a fleet GPS log -> a rover shall not collide with other rovers
    let roverFleetPos = [[roverA.x,roverA.y],[roverB.x,roverB.y]];
    let roverFleetPosStr = JSON.stringify(roverFleetPos);
    
    if(roverFleetPosStr.includes(JSON.stringify([x,y])) == true){
      return true;
    } else {return false;}
  }

  /* ===== Function block ends here ===== */

  /* ===== Execution commands follow here ===== */
  
  // Rover B set on collision course at [5,4] where Rover A waits
  moveSequence("rfffffrffff",roverA);
  console.log(roverA.travelLog);

  moveSequence("lffffrfffff",roverB);
  console.log(roverB.travelLog); 
  