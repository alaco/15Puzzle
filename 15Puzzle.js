//Allie LaCompte
//15 Puzzle

var empty;                     // The current empty position
var clickable = new Array(4);  // The tiles adjacent to the empty position

// Verify whether the game has ended.
function checkGameOver() {

   // If the game has ended, the empty space should be in position 15
   if(empty != 15) {
      return false;
   } // end if

   // Check that each tile is in the correct position
   for (var i = 0; i < 15; i++) {

      var tile = document.getElementById("tile"+i);

      if(tile.innerHTML != i+1) {
         return false;
      } // end if
   } // end for 

   return true;
} // end function checkGameOver

// If legal, move selected tile to empty position.
function move(e) {

   var clicked = e.target;
   var clickedId = clicked.id;

   if(clickedId != "tile"+empty) {

      if(clickable.indexOf(clickedId) != -1) {

         var moveTo = document.getElementById("tile"+empty);
         moveTo.innerHTML = clicked.innerHTML;
         moveTo.className = "";

         empty = parseInt(clickedId.substring(4));
         setClickable();
         clicked.innerHTML = "";
         clicked.className = "empty";

         if(checkGameOver()) {
            // Use setTimeout to allow movement of tile to render before prompt 
            // dialog box appears
            setTimeout(function() { 
               var response = window.prompt("Congratulations, you won!\nWould you like to play again?"
               + "\n(Enter Y to play again and anything else otherwise.)");
               
               if(response == "Y" || response == "y") {
                  // Reset the board for a new game
                  setBoard();
               } // end if
            }, 0)
         } // end if
      } // end if 

      else {
         window.alert("You did not select a tile that is adjacent to the empty space.\nPlease try again.");
      } // end else
   }
} // end function move

// Determine which tiles can be moved given where 
// the empty space is currently found
function setClickable() {

   // Tile above
   clickable[0] = "tile"+(empty-4);

   // Empty space is in the rightmost column, no tile to the right.
   if(empty%4 == 3) {
      clickable[1] = "";
   } // end if

   // Tile to the right
   else {
      clickable[1] = "tile"+(empty+1);
   } // end else

   // Tile below
   clickable[2] = "tile"+(empty+4);

   // Empty space is in the leftmost column, no tile to the left.
   if(empty%4 == 0) {
      clickable[3] = "";
   } // end if

   // Tile to the left.
   else {
      clickable[3] = "tile"+(empty-1);
   } // end else
} // end function setClickable

// Set the board by randomly allocating the tiles to the positions.
function setBoard() {

   // Array to keep track of which numbers have already been place on the baord
   var numbers = new Array(16);

   for (var i = 0; i < 16; i++) {
      numbers[i] = false;
   } // end for

   var tile;
   var num;

   for (var i = 0; i < 16; i++) {

      tile = document.getElementById("tile"+i);
      num = Math.floor(Math.random() * 16);

      while(numbers[num]) {
         num = Math.floor(Math.random() * 16);
      } // end while

      numbers[num] = true;

      // Empty space is place in given position
      if(num === 0) {
         empty = i;
         setClickable();
         tile.innerHTML = "";
         tile.className = "empty";
      } // end if

      // Tile is placed in given position
      else {
         tile.innerHTML = num;
         tile.className = "";
      } // end else
   }
} // end function setBoard

function onLoad() {

   setBoard();

   // Add event listeners to all positions on the board
   for (var i = 0; i < 16; i++) {
      var tile = document.getElementById("tile"+i);
      tile.addEventListener("click", move, false);   
   }
} // end function onLoad

window.addEventListener("load", onLoad, false);