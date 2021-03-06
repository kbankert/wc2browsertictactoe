//Define global variables - unsure if they needed to be global or not

var ticTacRef;
var IDs;
var board = ['', '', '', '', '', '', '', '', '',];
var brasilScore = 0;
var argentinaScore = 0;
var clearBoard;
var myGamepiece;
var celebrate = function() {};

//Most of this is from Lorin
angular.module("TicTac", ["firebase"])
 .controller("TicTacCtrl", function($scope, $firebase){


 	ticTacRef = new Firebase("https://wc2browsertictactoe.firebaseio.com");
 	$scope.fbRoot = $firebase(ticTacRef);

 	$scope.fbRoot.$on("loaded", function() {
		IDs = $scope.fbRoot.$getIndex();
		if(IDs.length == 0)
		{
			//Added gameOver to identify if there was a win; default is false which means there is no winner
	 		$scope.fbRoot.$add( {
	 			board: ['', '', '', '', '', '', '', '', '',],
 	 			bTurn: true,
 	 			gameOver: false,
 	 			brasilgol: img_src = "img/brasilgol.jpg",
 	 			argentinagol: img_src = "img/argentinagol.jpg",
 	 			brasilScore: 0,
 	 			argentinaScore: 0,
 	 		} );

			$scope.fbRoot.$on("change", function() {
				IDs = $scope.fbRoot.$getIndex();
				$scope.obj = $scope.fbRoot.$child(IDs[0]);

			});
		}
		else
		{
			$scope.obj = $scope.fbRoot.$child(IDs[0]);
		}

	});

 	$scope.makePass = function(idx){
 		if ($scope.obj.gameOver == true) {
 			alert("Game Over. You Lose!");
 		}
 		else if($scope.obj.board[idx]=="")
 		{
			myGamepiece = $scope.obj.bTurn ? 'B':'A';
			//Assign "myGampiece" based on the turn...should be the same for two browsers but will alternate if playing on one browser
			$scope.obj.board[idx] = myGamepiece;
			$scope.obj.bTurn = !$scope.obj.bTurn;
			$scope.obj.$save();
 		}
 		else {
 			alert("Defender snagged the ball. Get it back, and make a different play.");
 		}
 		//functio to run the win condition
 		celebrate(myGamepiece);
 	};

 	//check the win condition for rows and then cols and then diagonals
 	var rowGol = function() {
	 	var row0 = $scope.obj.board[0] + $scope.obj.board[1] + $scope.obj.board[2];
		var row1 = $scope.obj.board[3] + $scope.obj.board[4] + $scope.obj.board[5];
		var row2 = $scope.obj.board[6] + $scope.obj.board[7] + $scope.obj.board[8];
		var aGol = myGamepiece + myGamepiece + myGamepiece;
 		if (aGol == row0 || aGol == row1 || aGol == row2) {
			return true;
 		}
 		else
 		{
 			return false;
 		}
 		};

 	var colGol = function() {
 		var col0 = $scope.obj.board[0] + $scope.obj.board[3] + $scope.obj.board[6];
 		var col1 = $scope.obj.board[1] + $scope.obj.board[4] + $scope.obj.board[7];
 		var col2 = $scope.obj.board[2] + $scope.obj.board[5] + $scope.obj.board[8];
 		var aGol = myGamepiece + myGamepiece + myGamepiece;
 		if (aGol == col0 || aGol == col1 || aGol == col2) {
			return true;
 		}
 		else
 		{
 			return false;
 		}
 		};

 	var diaGol = function() {
 		dia0 = $scope.obj.board[0] + $scope.obj.board[4] + $scope.obj.board[8];
 		dia1 = $scope.obj.board[2] + $scope.obj.board[4] + $scope.obj.board[6];
 		var aGol = myGamepiece + myGamepiece + myGamepiece;
 		if (aGol == dia0 || aGol == dia1) {
			return true;
 		}
 		else
 		{
 			return false;
 		}
 		};

 	var checkGol = function() {
 		return rowGol() || colGol() || diaGol();
 	};


 	var celebrate = function(myGamepiece) {
 		$scope.golDance = document.getElementById("mainfield");

 		//If there is a win condition then replace mainfield with celebration pic, and switch gameOver to true
 		if (myGamepiece == "B" && checkGol() == true) {
 			$scope.golDance.style.backgroundImage = "url(" + $scope.obj.brasilgol + ")";
 			$scope.obj.gameOver = !$scope.obj.gameOver;
 			$scope.obj.$save();
 		}
 		else if (myGamepiece == "A" && checkGol() == true) {
 			$scope.golDance.style.backgroundImage = "url(" + $scope.obj.argentinagol + ")";
 			$scope.obj.gameOver = !$scope.obj.gameOver;
 			$scope.obj.$save();
 		}
 		else {
 			false;
 		}
 	};
 	
 });

