var grid;
var MHRARobotLive;
var noOfRobotAttempts = 3;
var pageText = "";

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
        while(noError && (attemptNo < noOfRobotAttempts))
        {
            robotNo = attemptNo + 1;
            var robotStartPosition = prompt("Please enter start positions of robot" + robotNo +": two coordinates seperated by a space and another space followed by either n for north, e for east, s for south, w for west (Maximum value for a coordinate is 50)", "e.g. 2 3 w");
            MHRARobotLive = robotStartInput(robotStartPosition);
            if(!(MHRARobotLive instanceof MHRARobot)){ //wanted a global robot
                alert(MHRARobotLive);
                noError = false;
            }
            else{
                
                var robotMoves = prompt("Please enter l for left, r for r, f for forward. No spaces", "e.g. FFLR");
                status = robotMoveInput(robotMoves); alert("previous x: " + MHRARobotLive.previous_x + "previous y: " + MHRARobotLive.previous_y);
                if(status!=false){
                    alert(status);
                    noError = false;
                }
                else{
                    attemptNo = attemptNo + 1;
                    if(MHRARobotLive.alive){
                      pageText = pageText + "<p>" + MHRARobotLive.x + " " + MHRARobotLive.y + " " + MHRARobotLive.orientation + "</p>";
                    }
                    else{
                      pageText = pageText + "<p>" + MHRARobotLive.previous_x + " " + MHRARobotLive.previous_y + " " + MHRARobotLive.orientation + " LOST</p>";
                    }

        
                    document.getElementById("letsdothis").innerHTML = pageText;
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
    // alert(startPosition); for testing
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

function robotMoveInput(robotMoveInstructions){
    // alert(robotMoveInstructions); for testing input
    if(!robotMoveInstructions){
        return "Sorry you did not enter any instructions";
    } 

    instructionsArray = robotMoveInstructions.split("");
    for(instruction of instructionsArray)
    {
        if(instruction=="F" || instruction=="L" || instruction =="R")
        {  
            this.MHRARobotLive.changePosition(instruction);
            if(this.grid.haveYouFallen(MHRARobotLive.x,MHRARobotLive.y,MHRARobotLive.previous_x,MHRARobotLive.previous_y))
            {
              this.MHRARobotLive.alive = false;
            }
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
    x_scent;
    y_scent;
    constructor(x, y) {    
        this.x = x;
        this.y = y;
        this.x_scent = new Array();
        this.y_scent = new Array();
      }

    haveYouFallen(robot_x,robot_y,prev_x,prev_y){
        if(robot_x>this.x || robot_x<0){
          this.saveScent(prev_x,prev_y);
          return true;
        }
        if(robot_y>this.y || robot_y<0){
          this.saveScent(prev_x,prev_y);
          return true;
        }
        return false;
    }

    saveScent(smellScent_x,smellScent_y){
      this.x_scent.push(smellScent_x);
      this.y_scent.push(smellScent_y);
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
        switch(newPositionValue.toLowerCase()) {
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
              alert("ROBOT DID NOT UNDERSTAND!!")
              break;
          } 
      }        
    }
  
    moveForward(){ //Move forward will add or subtract to coordinates depending on direction
      if(this.alive){
        switch(this.orientation.toLowerCase()) { 
            case "n":
                this.previous_y = this.y;
                this.previous_x = this.x;
                this.y = this.y + 1; 
              break;
            case "e":
                this.previous_y = this.y;
                this.previous_x = this.x;
                this.x = this.x + 1;
              break;
            case "s":
                this.previous_y = this.y;
                this.previous_x = this.x;
                this.y = this.y - 1; 
                break;
            case "w":
                this.previous_y = this.y;
                this.previous_x = this.x;
                this.x = this.x - 1;
                break;
        }
      }
        
    }
  
    turnRight(){ //Will change the orientation based on current
      if(this.alive){
        switch(this.orientation.toLowerCase()) { 
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
        switch(this.orientation.toLowerCase()) {
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
