var grid;
var MHRARobotLive;
var noOfRobotAttempts = 3;

function robotStart() {
    var status;
    var noError = true;
    var gridSize = prompt("Please enter two coordinates that will be the upper-right coordinates, seperated by a space (Numbers only, Max 50) ", "e.g. 1 1 ");
    status = gridInput(gridSize);
    if(status!=false){
        alert(status);
    }
    else{
        var attemptNo = 0;
        while(noError && (attemptNo <= noOfRobotAttempts))
        {
            var robotStartPosition = prompt("Please enter start positions of robot: two coordinates seperated by a space and another space followed by either n for north, e for east, s for south, w for west (Maximum value for a coordinate is 50)", "e.g. 2 3 w");
            MHRARobotLive = robotStartInput(robotStartPosition);
            if(!(MHRARobotLive instanceof MHRARobot)){ //wanted a global robot
                alert(MHRARobotLive);
                noError = false;
            }
            else{
                
                var robotMoves = prompt("Please enter l for left, r for r, f for forward. No spaces", "e.g. FFLR");
                status = robotMoveInput(robotMoves,MHRARobotLive);
                if(status!=false){
                    alert(status);
                    noError = false;
                }
                else{
                    attemptNo = attemptNo + 1;
                    document.getElementById("letsdothis").innerHTML = MHRARobotLive.x;
                }
                
            }
        }
        
        
    }
    
    
}

function gridInput(size){
    //alert(size); checked various inputs 
    if(!size){
        return "Sorry you did not enter anything, or at least I think you didnt... make it easy for me man....";
    }

    sizeInputArray = size.split(" ");
    var gridInput_x = parseInt(sizeInputArray[0]);
    var gridInput_y = parseInt(sizeInputArray[1]);

    if(isNaN(gridInput_x)  ||  isNaN(gridInput_y)){
        return " Brooo couldn't read the coordniates mann :(";
    }

    this.grid = new Grid(gridInput_x,gridInput_y);

    return false;
}

function robotStartInput(startPosition){
    alert(startPosition); 
    if(!startPosition){
        return "Sorry you did not enter anything for the start position so how am i meant to start man....";
    }

    startPosInputArray = startPosition.split(" ");
    var startPosInput_x = parseInt(startPosInputArray[0]);
    var startPosInput_y = parseInt(startPosInputArray[1]);
    var startPosOrientation = startPosInputArray[2];

    if(isNaN(startPosInput_x)  ||  isNaN(startPosInput_y)){
        return " Brooo couldn't read the start position coordniates mann :(";
    }

    if(!startPosOrientation){
        return "Could not compute the orientation bzzzzzz";
    }

    var robot = new MHRARobot(startPosInput_x,startPosInput_y,startPosOrientation);

    return robot;
}

function robotMoveInput(robotMoveInstructions,robot,grid){
    alert(robotMoveInstructions); 
    if(!robotMoveInstructions){
        return "Sorry you did not enter any instructions";
    }

    instructionsArray = robotMoveInstructions.split("");
    for(instruction of instructionsArray)
    {
        if(instruction=="F" || instruction=="L" || instruction =="R")
        {
            robot.changePosition(instruction);
            this.grid.haveYouFallen(robot.x,robot.y,robot.previous_x,robot.previous_y);
        }
        else{
            return "Did not understand a instruction";
        }
    }

    return false;
}


class Grid{ /* Put this in another file if possible */
    x;
    y;
    constructor(x, y) {    
        this.x = x;
        this.y = y;
      }

    haveYouFallen(robot_x,robot_y){
        if(robot_x>this.x || robot_x<0){
            return true;
        }
        if(robot_y>this.y || robot_y<0){
            return true;
        }
        return false;
    }
}

class MHRARobot { /* Put this in another file if possible */
    x;
    y;
    previous_x;
    previous_y;
    orientation;
    alive;
    constructor(x, y,orientation) {    
      this.x = x;
      this.y = y;
      this.orientation = orientation;
      this.alive = true;
    }
  
    changePosition(newPositionValue){ //incoming command of left,right or forward calls corresponding function
      if(this.alive){
        switch(newPositionValue) {
            case "l":
              this.turnLeft();
              break;
            case "r":
              this.turnRight();
              break;
            case "f":
            this.moveForward();
                break;
            default:
              // Error handling needed
          } 
      }        
    }
  
    moveForward(){ //Move forward will add or subtract to coordinates depending on direction
      if(this.alive){
        switch(this.orientation) { 
            case "n":
                this.previous_y = this.y;
                this.y = this.y + 1; 
              break;
            case "e":
                this.previous_x = this.x;
                this.x = this.x + 1;
              break;
            case "s":
                this.previous_y = this.y;
                this.y = this.y - 1; 
                break;
            case "w":
                this.previous_x = this.x;
                this.x = this.x - 1;
                break;
        }
      }
        
    }
  
    turnRight(){ //Will change the orientation based on current
      if(this.alive){
        switch(this.orientation) { 
            case "n":
                this.orientation = "e";
              break;
            case "e":
                this.orientation = "s";
              break;
            case "s":
                this.orientation = "w";
              break;
            case "w":
                this.orientation = "n";
              break;
        }
      }      
    }
  
    turnLeft(){ //Will change the orientation based on current
      if(this.alive){
        switch(this.orientation) {
            case "n":
                this.orientation = "w";
              break;
            case "e":
                this.orientation = "n";
              break;
            case "s":
                this.orientation = "e";
              break;
            case "w":
                this.orientation = "s";
              break;
        }
      }       
    }
  
  }
