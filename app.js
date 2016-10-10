$(document).ready(function(event){
	var cellStates = [];
	var game = {
		lastPlayer: 'O',
	};
	var counter=0;

	function createCellStates(rows, columns) {
		for (var i=0; i<rows; i++) {
			cellStates.push([]);
		}
		cellStates.forEach(function(element){
			for (var j=0; j<columns; j++){
				element.push(0);
			}
		});
	}

	function getCellIndex(cell) {
		var indexOne;
		var indexTwo;
		if (cell.parent().attr('class').split(' ')[0]==='top') {
			indexOne = 0;
		} else if (cell.parent().attr('class').split(' ')[0]==='middle') {
			indexOne = 1;
		} else {
			indexOne = 2;
		}

		var cellPosition = cell.attr('class').split(' ')[1];
		if (cellPosition==='left') {
			indexTwo = 0;
		} else if (cellPosition==='center') {
			indexTwo = 1;
		} else {
			indexTwo = 2;
		}	
		
		return [indexOne, indexTwo];

	}

	function columnCheck(player) {
		for (var j=0; j<cellStates[0].length; j++) {	
			var col=[];
			for (var i=0; i<cellStates.length; i++) {
				col.push(cellStates[i][counter]);
			}
			if (col[0]===player && col[1]===player && col[2]===player) {
				$('header').append('<span class="winner">'+player+ ' wins!</span>');
				return;
			}
		if (counter<2){
			counter++
			} else {counter=0}	
		}
	}

	function rowCheck(player){
		for (var i=0; i<cellStates.length; i++){
			if (cellStates[i][0]===player && cellStates[i][1]===player && cellStates[i][2]===player) {
				$('header').append('<span class="winner">'+player+ ' wins!</span>');
				return;
			}
		}
	}

/////////Log elements in array
	function logArrayElements(element, index, array) {
	  console.log('a[' + index + '] = ' + element);
	}

///////Event Listeners////////////////////////////
	$('.start-game-button').click(function(event){
		$(this).addClass('hidden');
		$('.row, .start-new-game-container').removeClass('hidden');
		$('.start-new-game-container').append('<button class="start-new-game">Start New Game</button>');
		createCellStates(3, 3);
	});	

	$('.cell').click(function(event){
		var cellIndex = getCellIndex($(this));
		if (cellStates[cellIndex[0]][cellIndex[1]] === 0) {
			if (game.lastPlayer==='O') {
					$(this).text('X');
					game.lastPlayer = 'X';
				} else {
					$(this).text('O');
					game.lastPlayer = 'O';
				}
			cellStates[cellIndex[0]][cellIndex[1]] = $(this).text();		
		} 			
		//console.log(cellStates.forEach(logArrayElements));
		rowCheck(game.lastPlayer);
		columnCheck(game.lastPlayer);
	});





});

