/*
 * x = 30
 * y = 16
 *    0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29
 * 0  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 1  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 2  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 3  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 4  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 5  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 6  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 7  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 8  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 9  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 10 #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 11 #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 12 #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 13 #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 14 #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 * 15 #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
 */

var Game = {
    "board": {},
    "dimensions": {
        "x": 30,
        "y": 16,
    },
    "gameOver": false,
    "seconds": 0,
    "size": {
        "height": 500,
        "width": 780
    },
    "startingMines": 99,
    "timer": null
};

//Board Creation
Game._createBoard = function() {
    
    this._createBoardWrapper();
    this._sizeBoard();
        
    for( var y = 0, first = 1; y < this.dimensions.y; y++ ) {
        
        var row = this._createBoardRow();
        
        for( var x = 0; x < this.dimensions.x; x++ ) {
            var square = this._createBoardSquare( row, x, y );
            
            if( first ) {
                this.board[ x ] = { };
            }
            
            this.board[ x ][ y ] = new Square( square, x, y );
        }
        
        first = 0;
    }
    
    this.noMines = true;
    this.mines = this.startingMines;
};

Game._createBoardInfoPanel = function( wrapper ) {
    
    var panel = $( "<div>" )
        .addClass( "jg-info-panel" )
        .appendTo( wrapper );
        
    $( "<div>" )
        .addClass( "jg-info-panel-item" )
        .html( "Mines: " )
        .append( $( "<span>" )
            .addClass( "mine-count" )
            .text( this.startingMines )
        ).appendTo( panel );
        
    $( "<div>" )
        .addClass( "jg-info-panel-item" )
        .append( $( "<a>" )
            .addClass( "restart-link" )
            .attr( "href", "#" )
            .text( "New" )
        ).appendTo( panel );
        
    $( "<div>" )
        .addClass( "jg-info-panel-item" )
        .html( "Time: " )
        .append( $( "<span>" )
            .addClass( "time" )
            .text( "0" )
        ).appendTo( panel );
};

Game._createBoardRow = function() {
    
    return $( "<li>" )
        .addClass( "row" )
        .appendTo( this.board.ui );
};

Game._createBoardSquare = function( row, x, y ) {
    
    return $( "<div>" )
        .addClass( "square hidden" )
        .attr({
            "data-x": x,
            "data-y": y
        }).appendTo( row );
};

Game._createBoardWrapper = function() {
    
    var wrapper = $( "<div>" )
        .addClass( "jg-board-wrapper" )
        .appendTo( "body" );
    
    this.board.ui = $( "<ol>" )
        .addClass( "jg-board" )
        .prependTo( wrapper );
        
    this._createBoardInfoPanel( wrapper );   
        
};

Game._sizeBoard = function() {
    
    var width = 26 * this.dimensions.x,
        height = 26 * this.dimensions.y;
    
    $( ".jg-board" ).css({
        "width": width + "px",
        "height": height + "px"
    });
    
    $( ".jg-board-wrapper" ).css({
        "width": width + "px",
        "height": ( width + 84 ) + "px",
        "left": (( $( window ).width() - width ) / 2 ) + "px"
    });
};
//End of Board Creation

//Game Logic
Game.attachMines = function(xCoord,yCoord) {
	
	var mines = this.startingMines, x, y, inYRange, inXRange;
	
	xCoord = parseInt( xCoord , 10 );
	yCoord = parseInt( yCoord , 10 );
	
	while( mines > 0 ) {
		x = parseInt( Math.random() * ( this.dimensions.x - 1 ) );
		y = parseInt( Math.random() * ( this.dimensions.y - 1 ) );
		
		inXRange = x <= xCoord + 1 && x >= xCoord - 1;
		inYRange = y <= yCoord + 1 && y >= yCoord - 1;
		
		if( !this.board[ x ][ y ].isMine && !( inXRange && inYRange ) ) {
			this.board[ x ][ y ].isMine = true;
			mines--;
		}
	}
	
	this.noMines = false;
	this.startTimer();
};

Game.clearField = function( x, y ) {
	
	x = parseInt( x, 10 );
	y = parseInt( y, 10 );
	
	if( x > 0 ) {
		// straight left
		if( !this.board[ x - 1 ][ y ].isExposed ) { 
		    this.handleClick( x - 1, y ); 
		}
		// up left
		if( y > 0 ) {
			if( !this.board[ x - 1 ][ y - 1 ].isExposed ) { 
			    this.handleClick( x - 1, y - 1); 
			}
		}
		// down left
		if( y < this.dimensions.y - 1 ) {
			if( !this.board[ x - 1 ][ y + 1 ].isExposed ) { 
			    this.handleClick( x - 1, y + 1 );
			}
		}
	}
	
	if( x < this.dimensions.x - 1 ) {
		// straight right
		if( !this.board[ x + 1 ][ y ].isExposed ) { 
		    this.handleClick( x + 1, y );
		}
		// up right
		if( y > 0 ) {
			if( !this.board[ x + 1 ][ y - 1 ].isExposed ) { 
			    this.handleClick( x + 1 , y - 1 );
			}
		}
		// down right
		if( y < this.dimensions.y - 1 ) {
			if( !this.board[ x + 1 ][ y + 1 ].isExposed ) { 
			    this.handleClick( x + 1, y + 1 ); 
			}
		}
	}
	
	// straight up
	if( y > 0 ) {
		if( !this.board[ x ][ y - 1 ].isExposed ) { 
		    this.handleClick( x, y - 1 );
		}
	}
	//straight down
	if( y < this.dimensions.y - 1 ) {
		if( !this.board[ x ][ y + 1 ].isExposed ) { 
		    this.handleClick( x , y + 1 );
		}
	}
};

Game.detectVictory = function() {
	
	var win = true;
	
	for( var x = 0; x < this.dimensions.x; x++ ) {
		for( var y = 0; y < this.dimensions.y; y++ ) {
			if( !this.board[ x ][ y ].isExposed && !this.board[ x ][ y ].isMine ) {
				win = false;
				break;
			}
		}
		
		if( !win ) { 
		    break; 
		}
	}
	
	if( win ) {
		clearTimeout( this.timer );
		alert( "Victory - " + this.seconds + " seconds" );
		this.restart();
	}
};

Game.handleClick = function( x, y, origin ) {
	
	if( this.noMines ) {
		this.attachMines( x, y );
	}
	
	x = parseInt( x, 10 );
	y = parseInt( y, 10 );
	
	if( this.board[ x ][ y ].isExposed && origin ) {
		return this.handleChording( x, y );
	}
	if( this.board[ x ][ y ].isFlagged ) {
		return;
	}
	
	if( this.board[ x ][ y ].isMine ) {
		this.board[ x ][ y ].setDisplay( "mine" );
		return;
	}
	
	var neighbors = this.getNeighborMineCount( x, y );

	if( neighbors > 0 ) {
		this.board[ x ][ y ].setDisplay( neighbors );
	}
	else {
		this.board[ x ][ y ].setDisplay( "empty" );
		if( !this.gameOver ) {
			this.clearField( x, y );
		}
	}
	
	if(!this.gameOver) {
		this.detectVictory();
	}
};

Game.handleChording = function( x, y ) {
	
	//check to see if chording should be initiated
	var ui = this.board[ x ][ y ].ui,
		neighborsFlagged = 0,
		targets = [];
	
	x = parseInt( x, 10 );
	y = parseInt( y, 10 );
	
	if( x > 0 ) {
		// straight left
		if( this.board[ x - 1 ][ y ].isFlagged ) { 
			neighborsFlagged++;
		}
		else if( !this.board[ x - 1 ][ y ].isExposed ) {
			targets.push({
			    x: x-1, 
			    y: y
			});
		}
		// up left
		if( y > 0 ) {
			if( this.board[ x - 1 ][ y - 1 ].isFlagged ) { 
				neighborsFlagged++;
			}
			else if( !this.board[ x - 1 ][ y - 1 ].isExposed ) {
				targets.push({
				    x: x - 1,
				    y: y - 1
				});
			}
		}
		// down left
		if( y < this.dimensions.y - 1 ) {
			if( this.board[ x - 1 ][ y + 1 ].isFlagged ) { 
				neighborsFlagged++;
			}
			else if( !this.board[ x - 1 ][ y + 1 ].isExposed ) {
				targets.push({
				    x: x - 1,
				    y: y + 1
				});
			}
		}
	}
	
	if( x < this.dimensions.x - 1 ) {
		// straight right
		if( this.board[ x + 1 ][ y ].isFlagged ) { 
			neighborsFlagged++;
		}
		else if( !this.board[ x + 1 ][ y ].isExposed ) {
			targets.push({
			    x: x + 1,
			    y: y 
			});
		}
		// up right
		if( y > 0 ) {
			if( this.board[ x + 1 ][ y - 1 ].isFlagged ) { 
				neighborsFlagged++;
			}
			else if( !this.board[ x + 1 ][ y - 1 ].isExposed ) {
				targets.push({
				    x: x + 1,
                    y: y - 1
                });
			}
		}
		// down right
		if( y < this.dimensions.y - 1 ) {
			if( this.board[ x + 1 ][ y + 1 ].isFlagged ) {
				neighborsFlagged++;
			}
			else if( !this.board[ x + 1 ][ y + 1 ].isExposed ) {
				targets.push({
				    x: x + 1,
                    y: y + 1
                });
			}
		}
	}
	
	// straight up
	if( y > 0 ) {
		if( this.board[ x ][ y - 1 ].isFlagged ) {
			neighborsFlagged++;
		}
		else if( !this.board[ x ][ y - 1 ].isExposed ) {
			targets.push({
			    x: x,
			    y: y-1
			});
		}
	}
	//straight down
	if( y < this.dimensions.y - 1 ) {
		if( this.board[ x ][ y + 1 ].isFlagged ) {
			neighborsFlagged++;
		}
		else if( !this.board[ x ][ y + 1 ].isExposed ) {
			targets.push({
			    x: x, 
			    y: y + 1 
			});
		}
	}
	
	//begin chording if flags set
	if( this.board[ x ][ y ].neighbors === neighborsFlagged ) {
		for( var neighbor in targets ) {
			
			if( !targets.hasOwnProperty( neighbor )) {
				continue;
			}
			
			this.handleClick(
				targets[ neighbor ].x,
				targets[ neighbor ].y
			);
		}
	}
	//flash neighbors if flags not set
	else {
		
	}
};

Game.handleFlag = function( x , y ) {
	
	if( !this.board[ x ][ y ].isExposed ) {
		this.board[ x ][ y ].setDisplay( "flag" );
	}
};

Game.getNeighborMineCount = function( x , y ) {
	
	var neighbors = 0;
	
	if( x > 0 ) {
		// straight left
		if( this.board[ x - 1 ][ y ].isMine ) {
		    neighbors++;
		}
		// up left
		if( y > 0 ) {
			if( this.board[ x - 1 ][ y - 1 ].isMine ) {
			    neighbors++;
			 }
		}
		// down left
		if( y < this.dimensions.y - 1 ) {
			if( this.board[ x - 1 ][ y + 1 ].isMine ) { 
			    neighbors++; 
			}
		}
	}
	
	if( x < this.dimensions.x - 1 ) {
		// straight right
		if( this.board[ x + 1 ][ y ].isMine ) { 
		    neighbors++;
	    }
		// up right
		if( y > 0 ) {
			if( this.board[ x + 1 ][ y - 1 ].isMine ) { 
			    neighbors++; 
			}
		}
		// down right
		if( y < this.dimensions.y - 1 ) {
			if( this.board[ x + 1 ][ y + 1 ].isMine ) { 
			    neighbors++;
		    }
		}
	}
	
	// straight up
	if( y > 0 ) {
		if( this.board[ x ][ y - 1 ].isMine ) { 
		    neighbors++;
		}
	}
	//straight down
	if( y < this.dimensions.y - 1 ) {
		if( this.board[ x ][ y + 1 ].isMine ) { 
		    neighbors++;
		}
	}
	
	return neighbors;
};
//End of Game Logic

//Initialization, Reinitialization
Game.init = function() {
	
	this._createBoard();
	
	$( ".jg-board-wrapper" ).on( "click", ".square", function() {

		Game.handleClick(
			Game.getSquareX( this ),
			Game.getSquareY( this ),
			true
		);
	});
	
	$( ".jg-board-wrapper").on( "contextmenu", ".square", function( event ) {
		Game.handleFlag(
			Game.getSquareX( this ),
			Game.getSquareY( this )
		);
		event.preventDefault();
	});
	
	$( ".restart-link" ).click( function() {
		Game.restart();
		return false;
	});
};

Game.restart = function() {
	
	var el, x, y;
	
	for( x = 0; x < this.dimensions.x; x++ ) {
		for( y = 0; y < this.dimensions.y; y++ ) {
			this.board[ x ][ y ].reset();
		}
	}

    this.resetGameValues();
	this.resetTimer();
};

Game.resetGameValues = function() {
    
    this.gameOver = false;
    this.mines = this.startingMines;
    this.noMines = true;
    
    $( ".mine-count" ).html( this.startingMines );
};

Game.resetTimer = function() {
    
    clearTimeout( this.timer );
    this.seconds = 0;
    
    $( ".time" ).html( 0 );
};

Game.revealBoard = function() {
	
	for( var x = 0; x < this.dimensions.x; x++ ) {
		for( var y = 0; y < this.dimensions.y; y++ ) {
			
			//check for a misflagged square
			if( this.board[ x ][ y ].isFlagged && !this.board[ x ][ y ].isMine ) {
				this.board[ x ][ y ].isFlagged = false;
				this.board[ x ][ y ].ui.addClass( "error" ).html( "" );
			}
			
			if( !this.board[ x ][ y ].isExposed ) {
				this.board[ x ][ y ].ui.click();
			}
		}
	}
	
	clearTimeout( this.timer );
};

Game.updateBoardDifficulty = function( x, y, mines ) {
    
    this.dimensions.x = x;
    this.dimensions.y = y;
    this.startingMines = mines;
    
    $( ".jg-board-wrapper" ).remove();
    this.board = {};
    
    this.resetGameValues();
    this.resetTimer();
    this.init();
};
//End of Initialization, Reinitialization

Game.getSquareX = function( el ) {
	return $( el ).attr( "data-x" );
};
Game.getSquareY = function( el ) {
	return $( el ).attr( "data-y" );
};
Game.getElement = function( x, y ) {
	return $( ".square[data-x=" + x + "][data-y=" + y + "]" );
};
Game.startTimer = function() {
	this.timer = setInterval( function() {
		Game.seconds++;
		$( ".time" ).html( Game.seconds );
	}, 1000 );
};

$(document).ready( function() {
	Game.init();
});

