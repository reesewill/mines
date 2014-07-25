function Square( ui, x, y ) {
    
	this.ui = ui;
	this.x = x;
	this.y = y;
	this.isFlagged = false;
	this.isMine = false;
	this.isExposed = false;
	this.neighbors;
};

Square.prototype.setDisplay = function( val ) {
	
	if( typeof( val ) === "number") {
		this.ui.html( val ).removeClass( "hidden" ).addClass( "num-" + val );
		this.isExposed = 1;
		this.neighbors = val;
	}
	else if( val === "flag" ) {
		if( this.isFlagged ) {
			this.ui.html( "" );
			Game.mines++;
		}
		else {
			this.ui.html( "F" );
			Game.mines--;
		}
		this.isFlagged = !this.isFlagged;
		$( ".mine-count" ).html( Game.mines );
	}
	else if( val === "mine" ) {
		this.ui.html( "X" );
		this.isExposed = 1;
		
		if( !Game.gameOver ) {
			this.ui.addClass( "tripped" );
			Game.gameOver = true;
			Game.revealBoard();
		}
	}
	else {
		//display empty square
		this.ui.removeClass( "hidden" );
		this.isExposed = 1;
		this.neighbors = 0;
	}
};

Square.prototype.reset = function() {
    
    this.isMine = false;
    this.isExposed = false;
    this.isFlagged = false;
    this.neighbors = undefined;
    this.ui.removeClass().addClass( "square hidden" ).html( "" );
};

