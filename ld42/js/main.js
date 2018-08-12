<!-- hide script from old browsers




function main(){
    


	var game = new Phaser.Game(800, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	function preload() {

	    


	}



	var square;
	
	var black = '#000000';
	var white = '#ffffff';
	var blue = '#0000ff';
	var red = '#ff0000';
	var yellow = '#ffff00';
	var green = '#00ff00';
	var cyan = '#00ffff';
	var magenta = '#ff00ff';

	var board;
 	
	var col=20;
	var row=13;

	size=32;
	offset=8;
	top_row=100;
	side_margin=4;


	function create() {

	    game.stage.backgroundColor = "666666";

	 //    var bmd = game.add.bitmapData(32, 32); //initial offset
		
		// bmd.ctx.beginPath();
		// bmd.ctx.rect(0, 0, 32, 32); // size of square
		// bmd.ctx.fillStyle = black;
		// bmd.ctx.fill();

		// square = game.add.sprite(320, 320, bmd); // position 
		// square.anchor.setTo(0.5, 0.5);

		// bmd.ctx.fillStyle = blue;
		// bmd.ctx.fill();
		// square = game.add.sprite(32, 32, bmd);
		// square.anchor.setTo(0.5, 0.5);

		board = new Array(col);
		for (var i = 0; i < col; i++) {
		  board[i] = new Array(row);
		  for(var j =0; j<row;j++){

		 //  	var bmd = game.add.bitmapData(32, 32); //initial offset
		
			// bmd.ctx.beginPath();
			// bmd.ctx.rect(0, 0, 32, 32, black); // size of square
			// bmd.ctx.fill();

			// square = game.add.sprite(, , bmd);
			// square.col = i;
			// square.row = j;
			// square.anchor.setTo(0.5, 0.5);
			// square.inputEnabled = true;
	    	// square.events.onInputDown.add(listener, square);


	    	var graphics = game.add.graphics(0, 0);

		    graphics.beginFill(HEXToVBColor(black));
	    	graphics.drawRect(side_margin+(i*(size+offset)), top_row+(j*(size+offset)), size, size);
	    	graphics.endFill();
	    	graphics.inputEnabled = true;
		    graphics.events.onInputDown.add(listener, this,0,graphics);

			graphics.col = i;
			graphics.row = j;
			graphics.color = HEXToVBColor(black);


		  	board[i][j]=graphics;
		  }
		}


	    // console.log(board);

	    // board[5][5].key.ctx.fillStyle = cyan;
	    // board[5][5].key.ctx.fill();

	    

		board[5][5].beginFill(HEXToVBColor(red));
    	board[5][5].drawRect(side_margin+(5*(size+offset)), top_row+(5*(size+offset)), size, size);
    	board[5][5].endFill();
		board[5][5].color = HEXToVBColor(red);	

	    
	}

	function update() {

	    //  Collide the player and the stars with the platforms

	    // board[5][5].ctx.fillStyle = cyan;
	  
	}

	function listener (graphics) {

	    // counter++;
	    // // text.text = "You clicked " + counter + " times!";
	    // this.key.ctx.fillStyle = red;
	    // this.key.ctx.fill();
	    // // this.loadTexture(this.key);
	    // // this.resetFrame();
	    // // this.bringToTop();
	    // // this.kill();
	    // this.update();

	    // graphics.beginFill(HEXToVBColor(green));
    	// graphics.drawRect(32, 32, 32, 32);
    	// graphics.endFill();

  //   	graphics.graphicsData[0].fillColor = 0xff00ff;
  //   	// graphics.graphicsData[0].drawRect(side_margin+(5*(size+offset)), top_row+(5*(size+offset)), size, size);
  //   	// graphics.graphicsData[0].endFill();
		// graphics.color = HEXToVBColor(red);	

		// graphics.clear();
		var col = graphics.col;
		var row = graphics.row;

		graphics.beginFill(0xff0000);
    	graphics.drawRect(side_margin+(col*(size+offset)), top_row+(row*(size+offset)), size, size);
    	graphics.endFill();

    	// graphics.graphicsData[0].fillColor = 0XFFFF33;

		graphics.color = HEXToVBColor(red);	
		graphics.tint = 0xffffff;	


	    console.log(graphics);

	}


	function HEXToVBColor(rrggbb) {
	    var bbggrr = rrggbb.substr(4, 2) + rrggbb.substr(2, 2) + rrggbb.substr(0, 2);
	    return parseInt(bbggrr, 16);
	}




}// end of game




// end hiding script from old browsers -->