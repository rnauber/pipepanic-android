// JavaScript Pipepanic.
// Copyright (C) 2004 Thunor <thunorsif@hotmail.com>
// Copyright (C) 2016 Richard Nauber
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

// --- Global constants. ---
// --- Can't use 'const' here as IE doesn't like it so must use 'var' :s ---


var ppdebug = false;
var ppgametimerseconds = 240;
var pppipearraysize = 105;
var ppcleardeadpipestimeout = 150;
var ppflashhighscoretimeout = 500;
var ppfillpipestimeout = 200;
var ppfilledcounterbase = 20;
var ppleakypipeval = +50;
var ppnullpipeval = 0xff;
var ppdeadpipeval = 0xfd;
var pppipeplacementscore = 10;
var pppipeoverwritescore = -10;
var ppdeadpipescore = -10;
var ppfilledpipescore = 50;
var ppfilledendpointscore = 250;
var ppfillnowscore = 5;
var ppflashhighscore_state=-1;
var ppGameTimerTickMS=200

var ppgamepaused=false;

ppGamestateEnum = {
    BUILDING : 0,
    CLEARINGDEAD : 1,
    FILLING : 2,
    DONE:3
}

var ppGameState= ppGamestateEnum.DONE;

// --- Global variables. ---
var pppreviewarray = new Array(3);
var pppipearray = new Array(pppipearraysize);
var pppipearraypointer = pppipearraysize;
var ppgametimer = ppgametimerseconds;

var ppGameTickTimer = new TimerInterval("ppExecGameTick()",ppGameTimerTickMS);
var ppGameTick=0;

var ppcleardeadpipesy = 10; var ppcleardeadpipesx = 0;
var ppfillpipespasscounter = ppfilledcounterbase;
var pphighscore =0;
var ppscore = 0;
// --- Create 2 dimensional array for the game board. ---
var ppcount = 0;
var ppboardarray = new Array(11);
for (ppcount = 0; ppcount < 11; ppcount++) {
	ppboardarray[ppcount] = new Array(11);	// 11*11 = 121 board squares = [0][0] to [10][10].
}
// --- Create 2 dimensional array for the dead pipes. ---
var ppdeadpipesarray = new Array(11);
for (ppcount = 0; ppcount < 11; ppcount++) {
	ppdeadpipesarray[ppcount] = new Array(11);	// 11*11 = 121 board squares = [0][0] to [10][10].
}

// --- Load all images used within document. ---
ppblank = "";

pppipe0 = new Image(); pppipe0.src = "images/pipe0.gif";
pppipe1 = new Image(); pppipe1.src = "images/pipe1.gif";
pppipe2 = new Image(); pppipe2.src = "images/pipe2.gif";
pppipe3 = new Image(); pppipe3.src = "images/pipe3.gif";
pppipe4 = new Image(); pppipe4.src = "images/pipe4.gif";
pppipe5 = new Image(); pppipe5.src = "images/pipe5.gif";
pppipe6 = new Image(); pppipe6.src = "images/pipe6.gif";
pppipe7 = new Image(); pppipe7.src = "images/pipe7.gif";
pppipe8 = new Image(); pppipe8.src = "images/pipe8.gif";
pppipe9 = new Image(); pppipe9.src = "images/pipe9.gif";
pppipe10 = new Image(); pppipe10.src = "images/pipe10.gif";
pppipe11 = new Image(); pppipe11.src = "images/pipe11.gif";
pppipe12 = new Image(); pppipe12.src = "images/pipe12.gif";
pppipe13 = new Image(); pppipe13.src = "images/pipe13.gif";
pppipe14 = new Image(); pppipe14.src = "images/pipe14.gif";
pppipe15 = new Image(); pppipe15.src = "images/pipe15.gif";
pppipe16 = new Image(); pppipe16.src = "images/pipe16.gif";

pppipefull0 = new Image(); pppipefull0.src = "images/pipefull0.gif";
pppipefull1 = new Image(); pppipefull1.src = "images/pipefull1.gif";
pppipefull2 = new Image(); pppipefull2.src = "images/pipefull2.gif";
pppipefull3 = new Image(); pppipefull3.src = "images/pipefull3.gif";
pppipefull4 = new Image(); pppipefull4.src = "images/pipefull4.gif";
pppipefull5 = new Image(); pppipefull5.src = "images/pipefull5.gif";
pppipefull6 = new Image(); pppipefull6.src = "images/pipefull6.gif";
pppipefull7 = new Image(); pppipefull7.src = "images/pipefull7.gif";
pppipefull8 = new Image(); pppipefull8.src = "images/pipefull8.gif";
pppipefull9 = new Image(); pppipefull9.src = "images/pipefull9.gif";
pppipefull10 = new Image(); pppipefull10.src = "images/pipefull10.gif";
pppipefull11 = new Image(); pppipefull11.src = "images/pipefull11.gif";
pppipefull12 = new Image(); pppipefull12.src = "images/pipefull12.gif";
pppipefull13 = new Image(); pppipefull13.src = "images/pipefull13.gif";
pppipefull14 = new Image(); pppipefull14.src = "images/pipefull14.gif";
pppipefull15 = new Image(); pppipefull15.src = "images/pipefull15.gif";
pppipefull16 = new Image(); pppipefull16.src = "images/pipefull16.gif";

ppnumber0 = new Image(); ppnumber0.src = "images/0.gif";
ppnumber1 = new Image(); ppnumber1.src = "images/1.gif";
ppnumber2 = new Image(); ppnumber2.src = "images/2.gif";
ppnumber3 = new Image(); ppnumber3.src = "images/3.gif";
ppnumber4 = new Image(); ppnumber4.src = "images/4.gif";
ppnumber5 = new Image(); ppnumber5.src = "images/5.gif";
ppnumber6 = new Image(); ppnumber6.src = "images/6.gif";
ppnumber7 = new Image(); ppnumber7.src = "images/7.gif";
ppnumber8 = new Image(); ppnumber8.src = "images/8.gif";
ppnumber9 = new Image(); ppnumber9.src = "images/9.gif";
ppminus = new Image(); ppminus.src = "images/minus.gif";


window.console.log("Page loaded");
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------




function ppcreatedeadpipesarray() {
	var count = 0;
	var rowloop = 0; var colloop = 0;
	var pointexists = false;
	var endreached = false;
	var pointsconverge = false;
	var leakcount = 0;
	var deadcount = 0;
	var freepointer = 0;
	var filledcounter = ppfilledcounterbase;
	var north = false; var south = false; var east = false; var west = false;
	var targety = 0; var targetx = 0;
	var targettype = ppnullpipeval; var targetvalid = false; targetvisited = false;
	// --- Create 2 dimensional array for the route tracing points. ---
	var pointsarraysize = 75;
	var pointsarray = new Array(pointsarraysize);
	for (rowloop = 0; rowloop < pointsarraysize; rowloop++) {
		pointsarray[rowloop] = new Array(4);	// y|x|direction|passcounter.
		pointsarray[rowloop][0] = pointsarray[rowloop][1] = pointsarray[rowloop][3] = 0;
		pointsarray[rowloop][2] = ppnullpipeval;	// dead point.
	}
			
	// Find endpoints in game board array.
	for (rowloop = 0; rowloop <= 10; rowloop++) {
		for (colloop = 0; colloop <= 10; colloop++) {
			if (ppboardarray[rowloop][colloop] == 0) {
				// Create a single point at start heading west (0=n|1=e|2=s|3=w).
				pointsarray[pointsarraysize - 1][0] = rowloop; pointsarray[pointsarraysize - 1][1] = colloop; pointsarray[pointsarraysize -1][2] = 3; pointsarray[pointsarraysize - 1][3] = filledcounter;
			}
			// Duplicate the game board array into the dead pipes array.
			ppdeadpipesarray[rowloop][colloop] = ppboardarray[rowloop][colloop];
		}
	}
	// MAIN LOOP. Do this while points exist (no points means no more routes).
	do {
		pointexists = false;
		for (rowloop = 0; rowloop < pointsarraysize; rowloop++) {
			if (pointsarray[rowloop][2] != ppnullpipeval && pointsarray[rowloop][3] == filledcounter) {
				// Get target yx.
				switch (pointsarray[rowloop][2]) {	// point direction.
					case 0 :	// north.
						targety = pointsarray[rowloop][0] + 1;	// NOTE: As the array is upside down, so is this.
						targetx = pointsarray[rowloop][1];
						break;				
					case 1 :	// east.
						targety = pointsarray[rowloop][0];
						targetx = pointsarray[rowloop][1] + 1;
						break;				
					case 2 :	// south.
						targety = pointsarray[rowloop][0] - 1;
						targetx = pointsarray[rowloop][1];
						break;				
					case 3 :	// west.
						targety = pointsarray[rowloop][0];
						targetx = pointsarray[rowloop][1] - 1;
						break;				
				}				
				// Get target pipe type.
				if (targety < 0 || targety >= 11 || targetx < 0 || targetx >= 11) {
					targettype = ppnullpipeval;	// targets outside the game board are invalid.
				} else {
					targettype = ppboardarray[targety][targetx];
				}
				// Get direction information on the target piece.
				switch (targettype) {
					case 0 :
						north = false; east = false; south = false; west = true;
						break;				
					case 1 :
						north = false; east = true; south = false; west = false;
						break;				
					case 2 :
						north = true; east = false; south = false; west = true;
						break;				
					case 3 :
						north = false; east = false; south = true; west = true;
						break;				
					case 4 :
						north = false; east = true; south = true; west = false;
						break;				
					case 5 :
						north = true; east = true; south = false; west = false;
						break;				
					case 6 :
						north = true; east = false; south = true; west = true;
						break;				
					case 7 :
						north = false; east = true; south = true; west = true;
						break;				
					case 8 :
						north = true; east = true; south = true; west = false;
						break;				
					case 9 :
						north = true; east = true; south = false; west = true;
						break;				
					case 10 :
						north = true; east = true; south = true; west = true;
						break;				
					case 11 :
						north = false; east = true; south = false; west = true;
						break;				
					case 12 :
						north = true; east = false; south = true; west = false;
						break;				
					case 13 :
						north = false; east = false; south = false; west = true;
						break;				
					case 14 :
						north = true; east = false; south = false; west = false;
						break;				
					case 15 :
						north = false; east = true; south = false; west = false;
						break;				
					case 16 :
						north = false; east = false; south = true; west = false;
						break;				
					default :
						north = false; east = false; south = false; west = false;
						break;
				}
				// Get validity of target move.
				targetvalid = false;
				if (pointsarray[rowloop][2] == 0 && south == true) targetvalid = true;
				if (pointsarray[rowloop][2] == 1 && west == true) targetvalid = true;
				if (pointsarray[rowloop][2] == 2 && north == true) targetvalid = true;
				if (pointsarray[rowloop][2] == 3 && east == true) targetvalid = true;
				// Get visited status of target pipe.
				targetvisited = false;
				if (targetvalid) {	// don't try and reference array elements using -1 ;)
					if (ppdeadpipesarray[targety][targetx] >= ppfilledcounterbase && ppdeadpipesarray[targety][targetx] != ppnullpipeval) targetvisited = true;
				}
				// Now that we have all the info we make the MAIN DECISIONS HERE.
				// If source is THE endpoint...
				if (ppboardarray[pointsarray[rowloop][0]][pointsarray[rowloop][1]] == 1) {
					if (ppdeadpipesarray[pointsarray[rowloop][0]][pointsarray[rowloop][1]] >= 0 && ppdeadpipesarray[pointsarray[rowloop][0]][pointsarray[rowloop][1]] < ppfilledcounterbase) ppdeadpipesarray[pointsarray[rowloop][0]][pointsarray[rowloop][1]] = filledcounter;	// mark source as filled.
					pointsarray[rowloop][2] = ppnullpipeval;	// kill current point.
					endreached = true;
				} else {
					// ElseIf target is valid and not visited...
					if (targetvalid && !targetvisited) {
						if (ppdeadpipesarray[pointsarray[rowloop][0]][pointsarray[rowloop][1]] >= 0 && ppdeadpipesarray[pointsarray[rowloop][0]][pointsarray[rowloop][1]] < ppfilledcounterbase) ppdeadpipesarray[pointsarray[rowloop][0]][pointsarray[rowloop][1]] = filledcounter;	// mark source as filled.
						pointsarray[rowloop][2] = ppnullpipeval;	// kill current point.
						// Create a new point at target for each direction.
						// Merge converging paths, caused when 2 sources converge on the same target at the same time.
						if (north) {
							pointsconverge = false;
							for (count = 0; count < pointsarraysize; count++) {
								if (pointsarray[count][2] != ppnullpipeval) {
									// We don't want 2 points in the same square going in the same direction.
									if (pointsarray[count][0] == targety && pointsarray[count][1] == targetx && pointsarray[count][2] == 0) {
										pointsconverge = true;
									}
								} else {
									freepointer = count;	// record this as we'll use it to store the new point.
								}
							}						
							if (!pointsconverge) {
								pointsarray[freepointer][0] = targety; pointsarray[freepointer][1] = targetx;
								pointsarray[freepointer][2] = 0; pointsarray[freepointer][3] = filledcounter + 1;	// process it next do-while iteration.
								pointexists = true;
							}
						}
						if (east) {
							pointsconverge = false;
							for (count = 0; count < pointsarraysize; count++) {
								if (pointsarray[count][2] != ppnullpipeval) {
									// We don't want 2 points in the same square going in the same direction.
									if (pointsarray[count][0] == targety && pointsarray[count][1] == targetx && pointsarray[count][2] == 1) {
										pointsconverge = true;
									}
								} else {
									freepointer = count;	// record this as we'll use it to store the new point.
								}
							}							
							if (!pointsconverge) {
								pointsarray[freepointer][0] = targety; pointsarray[freepointer][1] = targetx;
								pointsarray[freepointer][2] = 1; pointsarray[freepointer][3] = filledcounter + 1;	// process it next do-while iteration.
								pointexists = true;
							}
						}
						if (south) {
							pointsconverge = false;
							for (count = 0; count < pointsarraysize; count++) {
								if (pointsarray[count][2] != ppnullpipeval) {
									// We don't want 2 points in the same square going in the same direction.
									if (pointsarray[count][0] == targety && pointsarray[count][1] == targetx && pointsarray[count][2] == 2) {
										pointsconverge = true;
									}
								} else {
									freepointer = count;	// record this as we'll use it to store the new point.
								}
							}							
							if (!pointsconverge) {
								pointsarray[freepointer][0] = targety; pointsarray[freepointer][1] = targetx;
								pointsarray[freepointer][2] = 2; pointsarray[freepointer][3] = filledcounter + 1;	// process it next do-while iteration.
								pointexists = true;
							}
						}
						if (west) {
							pointsconverge = false;
							for (count = 0; count < pointsarraysize; count++) {
								if (pointsarray[count][2] != ppnullpipeval) {
									// We don't want 2 points in the same square going in the same direction.
									if (pointsarray[count][0] == targety && pointsarray[count][1] == targetx && pointsarray[count][2] == 3) {
										pointsconverge = true;
									}
								} else {
									freepointer = count;	// record this as we'll use it to store the new point.
								}
							}							
							if (!pointsconverge) {
								pointsarray[freepointer][0] = targety; pointsarray[freepointer][1] = targetx;
								pointsarray[freepointer][2] = 3; pointsarray[freepointer][3] = filledcounter + 1;	// process it next do-while iteration.
								pointexists = true;
							}
						}
					} else {
						// ElseIf target is valid and visited...
						if (targetvalid && targetvisited) {
							if (ppdeadpipesarray[pointsarray[rowloop][0]][pointsarray[rowloop][1]] >= 0 && ppdeadpipesarray[pointsarray[rowloop][0]][pointsarray[rowloop][1]] < ppfilledcounterbase) ppdeadpipesarray[pointsarray[rowloop][0]][pointsarray[rowloop][1]] = filledcounter;	// mark source as filled.
							pointsarray[rowloop][2] = ppnullpipeval;	// kill current point.
						} else {
							// ElseIf target is not valid...
							if  (!targetvalid) {
								ppdeadpipesarray[pointsarray[rowloop][0]][pointsarray[rowloop][1]] = filledcounter + ppleakypipeval;	// mark source as leaky retaining fill count (important).
								pointsarray[rowloop][2] = ppnullpipeval;	// kill current point.
								leakcount++;
							}
						}
					}
				}				
			}				
		}
		filledcounter++;		
	} while (pointexists)

	// MARK DEAD PIPES. The easy bit :)
	deadcount = 0;
	for (rowloop = 0; rowloop < 11; rowloop++) {
		for (colloop = 0; colloop < 11; colloop++) {
			if (ppdeadpipesarray[rowloop][colloop] >= 0 && ppdeadpipesarray[rowloop][colloop] < ppfilledcounterbase) {
				ppdeadpipesarray[rowloop][colloop] = ppdeadpipeval;
				deadcount++;	// count can include endpoint if it is unvisited.
			}
		}
	}

	// Set off the clear dead pipes timer.
	ppcleardeadpipesy = 10; ppcleardeadpipesx = 0;
	//ppcleardeadpipesid = new Timer("ppcleardeadpipes()", 0);
	
/*	
	// Show messagebox with game board.
	var debugstring = "";
	for (rowloop = 0; rowloop < 11; rowloop++) {
		for (colloop = 0; colloop < 11; colloop++) {
			switch (ppdeadpipesarray[rowloop][colloop]) {
				case 0xff :			
					debugstring = debugstring + "FF|";
					break;			
				case 0xff :			
					debugstring = debugstring + "FE|";
					break;			
				default :
					if (ppdeadpipesarray[rowloop][colloop] < 10) debugstring = debugstring + "0";
					debugstring = debugstring + ppdeadpipesarray[rowloop][colloop] + "|";
					break;			
			}
		}
		debugstring = debugstring + "\n";
	}
	alert("Game board array:-\n\n" + debugstring);
*/	
}

function setImage(id,image)
{
if (image=="")
	document.getElementById(id).style.backgroundImage="none";
else
 	document.getElementById(id).style.backgroundImage="url("+image.src+")";
}

function setBoardImage(row,column,image)
{
			if (row < 10) row = "0" + row;
			if (column < 10) column = "0" + column;
			//debug("row:"+row+"col:"+column+"  ")
			setImage("board" + row + column, image)
}


function ppcleardeadpipes() {
 	if (ppGameState!=ppGamestateEnum.CLEARINGDEAD)
 		return;

	var row = 0;
	var column = 0;
	var deadpipefound = false;
	var nomorepipes = false;

	do {
		// Officially if the endpoint is unvisited it's dead, but we'll leave it onscreen anyway.
		if (ppdeadpipesarray[ppcleardeadpipesy][ppcleardeadpipesx] == ppdeadpipeval && ppboardarray[ppcleardeadpipesy][ppcleardeadpipesx] != 1) {
			// Erase dead pipe from the screen.
			setBoardImage(ppcleardeadpipesy,ppcleardeadpipesx,ppblank);
			// Erase dead pipe from the board array.
			ppboardarray[ppcleardeadpipesy][ppcleardeadpipesx] = ppnullpipeval;
			ppscore = ppscore + ppdeadpipescore;
			ppdisplayanumber(ppscore, 4, "score");
			deadpipefound = true;
		}
		// Work our way from top left to bottom right (board is upside down remember).
		ppcleardeadpipesx++;
		if (ppcleardeadpipesx >= 11) {
			ppcleardeadpipesx = 0; ppcleardeadpipesy--;
			if (ppcleardeadpipesy < 0) nomorepipes = true;
		}
	} while (!deadpipefound && !nomorepipes)
	if (nomorepipes) {
		ppfillpipespasscounter = ppfilledcounterbase;
		ppGameState=ppGamestateEnum.FILLING;
	}
}

function ppfillpipes() {
	 if (ppGameState!=ppGamestateEnum.FILLING)
     		return;

	var row = 0; var column = 0;
	var rowloop = 0; var colloop = 0;
	var leakypipefound = false;
	var leakypipefound = false;
	var nomorepipes = true;

	// Show all filled pipes onscreen for this passcounter.
	for (rowloop = 0; rowloop < 11; rowloop++) {
		for (colloop = 0; colloop < 11; colloop++) {
			if (ppdeadpipesarray[rowloop][colloop] == ppfillpipespasscounter || ppdeadpipesarray[rowloop][colloop] - ppleakypipeval == ppfillpipespasscounter) {
				// Draw filled pipe.
				setBoardImage(rowloop, colloop, eval("pppipefull" + ppboardarray[rowloop][colloop]));
				ppscore = ppscore + ppfilledpipescore;
				if (ppboardarray[rowloop][colloop] == 1){
				    ppscore += ppfilledendpointscore //bonus for filling the endpoint
                }
				ppdisplayanumber(ppscore, 4, "score");
				// Is it a leaky pipe? If so break out of both for-next loops.
				if (ppdeadpipesarray[rowloop][colloop] >= ppfilledcounterbase + ppleakypipeval) {
					leakypipefound = true;
					break;
				}
			} else {
				if (ppdeadpipesarray[rowloop][colloop] > ppfillpipespasscounter && ppdeadpipesarray[rowloop][colloop] < ppdeadpipeval) nomorepipes = false;
			}
		}
		if (leakypipefound) break;
	}
	ppfillpipespasscounter++;
	if (!leakypipefound && !nomorepipes) {
	} else {
		ppGameState=ppGamestateEnum.DONE;
		// Ok, last bit, high score.
		if (ppscore > pphighscore) {
			pphighscore = ppscore;
			ppflashhighscore_state=1;
			// Save the high score
			window.localStorage.setItem("pphighscore", pphighscore);
		}
	}
}

// main dispacher routine: gets called periodically
function ppExecGameTick()
{

	ppGameTick++;
	//debug("tick "+ppGameTick);

	gametimerperiod=Math.round(1000/ppGameTimerTickMS);
	if (ppGameTick % gametimerperiod == 0)
			ppdecgametimer();

	ppcleardeadpipes();
	ppfillpipes();

	flashperiod=Math.round(500/ppGameTimerTickMS);
	if (ppGameTick % flashperiod == 0)
		ppflashhighscore();
}



function ppflashhighscore() {
	if (ppflashhighscore_state < 0)
		return;

	if (ppflashhighscore_state) {
		ppdisplayanumber("", 4, "hscore");
		ppflashhighscore_state=0;
	} else {
		ppdisplayanumber(pphighscore, 4, "hscore");
		ppflashhighscore_state=1;
	}}

function ppfillpipesnow() {
	if (ppGameState==ppGamestateEnum.BUILDING) {
		ppscore = ppscore + ppgametimer * ppfillnowscore;
		ppdisplayanumber(ppscore, 4, "score");
		ppcreatedeadpipesarray();
		ppGameState=ppGamestateEnum.CLEARINGDEAD;	// Fill now!
	}
}


function debug(dbg)
{
	if (ppdebug)
		document.getElementById("ppdebug").innerHTML=dbg;
	window.console.log(dbg);
}
function ppscale()
{
	var board = document.getElementById("board");
	var width = document.body.clientWidth - document.getElementById("controlarea").offsetWidth;
    var height = document.body.clientHeight;
	var boarddim=Math.min(width, height);
	board.style.width=boarddim+"px";
	board.style.height=boarddim+"px";
	document.getElementById("controlarea").style.height=boarddim+"px";
	debug("w:"+width+" h:"+ height + " board:"+boarddim);
}

function ppprocessboardclick(boardyx) {
	var count = 0;
	var row = 0;
	var column = 0;

	if (ppgamepaused)
		return;
	if (ppGameState!=ppGamestateEnum.BUILDING)
		return;

	// Get and record yx.
	row = Math.abs(boardyx.substr(5,2));
	column = Math.abs(boardyx.substr(7,2));

	//debug(boardyx+" row:"+row+" col:"+column);

	// Don't allow replacing of the end points.
	if (ppboardarray[row][column] > 1) {
		// Place pipe piece from start of preview array.
		setBoardImage(row,column,eval("pppipe" + pppreviewarray[0]));
		if (ppboardarray[row][column] != ppnullpipeval) {
			ppscore = ppscore + pppipeoverwritescore;
		} else {
			ppscore = ppscore + pppipeplacementscore;
		}
		ppboardarray[row][column] = pppreviewarray[0];
		ppdisplayanumber(ppscore, 4, "score");
		// Move all preview pieces down 1 place.
		for (count = 0; count < 3; count++) {
			pppreviewarray[count] = pppreviewarray[count + 1]
			setImage("preview" + count,eval("pppipe" + pppreviewarray[count]));
		}
		// Add a new preview piece at the end.
		pppreviewarray[3] = ppgetnextpipepiece();
		setImage("preview3" ,eval("pppipe" + pppreviewarray[3]));
	} else {

		//fill pipes if endpoint is clicked
		//if (ppboardarray[row][column] == 0)
		//	ppfillpipesnow();
	}
}

function ppreset() {
	var count = 0;
	var endpoint = 0;
	var colloop = 0;
	var rowloop = 0;
	var column = 0;
	var row = 0;

	debug("Reset game");

	// Stop blinking high score.
    if (ppflashhighscore_state > -1) {
        ppflashhighscore_state = -1;
    }
					
	// Clear game board and array.
	for (rowloop = 0; rowloop < 11; rowloop++) {
		for (colloop = 0; colloop < 11; colloop++) {
			setBoardImage(rowloop,colloop,ppblank)
			ppboardarray[rowloop][colloop] = ppnullpipeval;	// Empty squares are ppnullpipeval.
		}
	}
	// Setup and initialise preview pieces/array.
	for (count = 0; count < 4; count++) {
		pppreviewarray[count] = ppgetnextpipepiece();
		setImage("preview" + count,eval("pppipe" + pppreviewarray[count]));
	}
	// Place end points and record in game board array.
	endpoint = Math.floor(Math.random() * 10);
	ppboardarray[endpoint][0] = 1;	// yx
	setBoardImage(endpoint,0,pppipe1);
	endpoint = Math.floor(Math.random() * 10);
	ppboardarray[endpoint][10] = 0;	// yx
	setBoardImage(endpoint,10,pppipe0);

	ppdisplayanumber(pphighscore, 4, "hscore");
	ppscore = 0;
	ppdisplayanumber(ppscore, 4, "score");
	
	ppgameover = false;
	
	// Set off the game timer.
	ppgametimer = ppgametimerseconds;
	ppdisplayanumber(ppgametimer, 3, "timer");

	ppGameState= ppGamestateEnum.BUILDING;

}

function ppgetnextpipepiece() {
	// Get next piece from the pipe array, or if at end
	// of array refill it and get piece from start.
	pppipearraypointer++;
	if (pppipearraypointer >= pppipearraysize) {
		ppfillpipearray();
		pppipearraypointer = 0;
	}
	return pppipearray[pppipearraypointer];
}

function ppfillpipearray() {

	var nextpointer = 0;
	var count = 0;
	var temp = 0;
	var swap = 0;

	// Fill pipe array with our recommended frequency.
	nextpointer = ppfillpipearraypieces(2, 7, nextpointer);
	nextpointer = ppfillpipearraypieces(3, 7, nextpointer);
	nextpointer = ppfillpipearraypieces(4, 7, nextpointer);
	nextpointer = ppfillpipearraypieces(5, 7, nextpointer);
	nextpointer = ppfillpipearraypieces(6, 5, nextpointer);
	nextpointer = ppfillpipearraypieces(7, 5, nextpointer);
	nextpointer = ppfillpipearraypieces(8, 5, nextpointer);
	nextpointer = ppfillpipearraypieces(9, 5, nextpointer);
	nextpointer = ppfillpipearraypieces(10, 5, nextpointer);
	nextpointer = ppfillpipearraypieces(11, 18, nextpointer);
	nextpointer = ppfillpipearraypieces(12, 18, nextpointer);
	nextpointer = ppfillpipearraypieces(13, 4, nextpointer);
	nextpointer = ppfillpipearraypieces(14, 4, nextpointer);
	nextpointer = ppfillpipearraypieces(15, 4, nextpointer);
	nextpointer = ppfillpipearraypieces(16, 4, nextpointer);

	// Go through the pipe array and shuffle the pieces. This maintains frequency :)
	// Fiddle with the above figures to tweek it, but don't forget the array size
	// is set as a constant and will need to be adjusted accordingly.
	for (count = 0; count < pppipearraysize; count++) {
		temp = pppipearray[count];
		swap = Math.floor(Math.random() * (pppipearraysize - 1));
		pppipearray[count] = pppipearray[swap];
		pppipearray[swap] = temp;
	}
}

function ppfillpipearraypieces(pipepiece, frequency, nextpointer) {
	while (frequency > 0) {
		pppipearray[nextpointer] = pipepiece;
		nextpointer++;
		if (nextpointer >= pppipearraysize) nextpointer = 0;
		frequency--;
	}
	return nextpointer;
}

function ppdecgametimer() {
	if (ppGameState != ppGamestateEnum.BUILDING)
		return;

	ppgametimer--;
	ppdisplayanumber(ppgametimer, 3, "timer");
	if (ppgametimer <= 0) {
		ppfillpipesnow()
	}

}

function ppdisplayanumber(number, digits, target) {
	var units1000s = 0;
	var units100s = 0;
	var units10s = 0;
	var units1s = 0;

	if (number==="")	{
		setImage(target + "sign", ppblank);
		if (digits >= 4)
			setImage(target + "1000", ppblank);
		if (digits >= 3)
			setImage(target + "100", ppblank);
		if (digits >= 2)
			setImage(target + "10", ppblank);
		setImage(target + "1", ppblank);
		return;
	}

	if (number < 0) {
		number = Math.abs(number);
		setImage(target + "sign", ppminus);
	} else {
		setImage(target + "sign", ppblank);
	}
	if (digits >= 4) {
		units1000s =  Math.floor(number % 10000 / 1000);	// 'mod'ed to isolate the units.
		setImage(target + "1000", eval("ppnumber" + units1000s));
	}
	if (digits >= 3) {
		units100s =  Math.floor(number % 1000 / 100);
		setImage(target + "100", eval("ppnumber" + units100s));
	}
	if (digits >= 2) {
		units10s =  Math.floor(number % 100 / 10);
		setImage(target + "10", eval("ppnumber" + units10s));
	}
	units1s = Math.floor(number % 10);
	setImage(target + "1", eval("ppnumber" + units1s));
}

function ppdebugstuff() {
	var rowloop = 0;
	var colloop = 0;
	var debugstring = "";
	
	// Show messagebox with game board.
	for (rowloop = 10; rowloop >= 0; rowloop--) {
		for (colloop = 0; colloop < 11; colloop++) {
			switch (ppboardarray[rowloop][colloop]) {
				case 0xff :			
					debugstring = debugstring + "FF|";
					break;			
				case 0xff :			
					debugstring = debugstring + "FE|";
					break;			
				default :
					if (ppboardarray[rowloop][colloop] < 10) debugstring = debugstring + "0";
					debugstring = debugstring + ppboardarray[rowloop][colloop] + "|";
					break;			
			}
		}
		debugstring = debugstring + "\n";
	}
	alert("Game board array:-\n\n" + debugstring);

	// Dump game board to text box in array format.
	debugstring = "ppboardarray = ["
	for (rowloop = 0; rowloop < 11; rowloop++) {
		debugstring = debugstring + "["
		for (colloop = 0; colloop < 11; colloop++) {
			debugstring = debugstring + ppboardarray[rowloop][colloop];
			if (colloop != 10) debugstring = debugstring + ","
		}
		debugstring = debugstring + "]"
		if (rowloop != 10) debugstring = debugstring + ","
	}
	debugstring = debugstring + "];"
	document.ppdebugform.ppdebugnotes.value = debugstring;
	
	// Reset the game and populate the game board array with a winning design :)
	ppreset();
	//ppboardarray = [[255,255,255,255,255,255,255,255,255,255,255],[255,255,15,9,9,13,255,255,255,255,255],[15,11,11,10,10,11,11,2,15,2,255],[255,255,255,12,12,255,255,4,11,6,255],[255,14,5,3,12,255,15,2,255,4,0],[255,8,3,255,12,255,255,12,5,11,13],[255,12,255,255,12,255,255,12,12,255,255],[255,8,11,9,10,11,11,6,12,255,255],[1,3,5,10,3,5,9,7,7,11,13],[255,5,3,12,255,4,6,255,255,255,255],[255,16,255,16,255,255,16,255,255,255,255]];	// this one is complete.
	//ppboardarray = [[15,255,3,11,255,255,11,255,255,255,12],[255,255,15,9,9,13,255,12,255,12,255],[15,11,11,10,10,11,11,2,15,2,255],[12,255,255,12,12,255,255,4,11,6,255],[255,14,5,3,12,12,15,2,255,4,0],[255,8,3,255,12,6,255,12,5,11,13],[10,12,255,3,12,255,2,12,12,255,11],[255,8,11,9,10,11,11,6,12,255,255],[1,3,5,10,3,5,9,7,7,11,13],[255,5,3,12,255,4,6,255,5,12,255],[255,16,255,16,12,255,16,255,11,16,5]];	// this one has many dead pipes.
	ppboardarray = [[14,5,2,14,5,9,11,11,9,11,0],[12,12,12,4,10,3,255,255,8,9,2],[4,3,8,11,3,255,255,255,12,4,3],[15,11,7,11,11,2,255,255,8,11,13],[255,5,11,11,9,10,13,255,8,2,255],[15,6,255,255,12,12,14,2,12,12,255],[255,12,255,5,10,7,7,7,6,8,13],[1,6,255,12,12,255,255,255,4,3,255],[255,12,255,12,12,255,255,255,255,255,255],[15,10,11,6,16,255,255,255,255,255,255],[255,16,255,16,255,255,255,255,255,255,255]];	// this one has 1 leak.
	// Draw array contents.
	for (rowloop = 0; rowloop < 11; rowloop++) {
		for (colloop = 0; colloop < 11; colloop++) {
			row = rowloop; if (row < 10) row = "0" + row;
			column = colloop; if (column < 10) column = "0" + column;
			if (ppboardarray[rowloop][colloop] != 0xff) {
				setBoardImage(row,column, eval("pppipe" + ppboardarray[rowloop][colloop]));
			} else {
				setBoardImage(row,column, ppblank);
			}
		}
	}
}

function resetHighscore() {
	window.localStorage.setItem("pphighscore", 0);
}

function pauseGame() {
	ppGameTickTimer.pause();
	ppgamepaused=true;
}

function resumeGame() {
	ppGameTickTimer.resume();
	ppgamepaused=false;
}


function help(show)
{
    if (show){
        document.getElementById("board").style.display="none";
        document.getElementById("help").style.display="inline";
    }
    else    {
        document.getElementById("board").style.display="inline";
        document.getElementById("help").style.display="none";
    }
}



function TimerInterval(action, delay) {
    this.timerId=null;
    this.action = action;
    this.interval = delay;
    this.running=true;

    //debug("create interval timer " + action + " " + delay );
    this.resume = function() {
        if (this.timerId != null)
     	    window.clearInterval(this.timerId);
     	if (this.running && (this.action != null)){
			this.timerId = window.setInterval(this.runnow.bind(this), this.interval);
        } 
    };
    this.pause = function() {
        if (this.timerId != null)
            window.clearInterval(this.timerId);
    };
    this.stop = function() {
        this.running=false;
    };
    this.runnow = function() {
        //debug("TIMER interval srun:" + this.action);
        if (this.action != null)
            eval(this.action);
    };
    this.resume();
}
