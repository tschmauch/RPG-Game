// When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.
// The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen.
// The player chooses an opponent by clicking on an enemy's picture.
// Once the player selects an opponent, that enemy is moved to a defender area.

// The player will now be able to click the attack button.

// Whenever the player clicks attack, their character damages the defender. The opponent will lose HP (health points). These points are displayed at the bottom of the defender's picture. 
// The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their HP. These points are shown at the bottom of the player character's picture.

// The player will keep hitting the attack button in an effort to defeat their opponent.

// When the defender's HP is reduced to zero or below, remove the enemy from the defender area. The player character can now choose a new opponent.

// The player wins the game by defeating all enemy characters. The player loses the game the game if their character's HP falls to zero or below.

// Option 2 Game design note

// Each character in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power.

// Each time the player attacks, their character's Attack Power increases by its base Attack Power. 

// For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).

// The enemy character only has Counter Attack Power. 

// Unlike the player's Attack Points, Counter Attack Power never changes.

// The Health Points, Attack Power and Counter Attack Power of each character must differ.

// No characters in the game can heal or recover Health Points. 

// A winning player must pick their characters wisely by first fighting an enemy with low Counter Attack Power. This will allow them to grind Attack Power and to take on enemies before they lose all of their Health Points. Healing options would mess with this dynamic.

// Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.

$(document).ready(function () {
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var frodo;
	var gollum;
	var gandalf;
	var sauron;
	var charBool = false;
	var enemyBool = false;
	var myHero;
	var myEnemy;
	var characterArray = [];
	var winCounter = 0;
	var lossCounter = 0;

	function resetGame() {
		$('.container').html('<div class="row"><div class="col-md-12"><h3 id="select">Select Your Hero</h3></div></div><div class="row" id="heroSelection"><div id="hero1" class="col-md-2 character"></div>	<div id="hero2" class="col-md-2 character"></div><div id="hero3" class="col-md-2 character"></div><div id="hero4" class="col-md-2 character"></div></div><div id="playerHero" class="row"><div class="col-md-12"><h3>Your Hero</h3></div></div><div id="enemiesAvailable" class="row"><div class="col-md-12"><h3>Enemies Available to Attack</h3></div></div><!-- button --><button id="attack" type="button" class="btn btn-danger">Attack!</button><div id="defenderArea" class="row"><div class="col-md-12"><h3>Opponent</h3></div></div><div class="row"><div id="updateArea" class="col-md-5">		<p>SAVE MIDDLE EARTH</p></div></div><br><br><div class="row"><div id="score" class="col-md-5"></div></div>');
		$('#hp1').attr('class', 'hp');
		$('#hp2').attr('class', 'hp');
		$('#hp3').attr('class', 'hp');
		$('#hp4').attr('class', 'hp');
		$('.col-md-2').attr('class', 'col-md-2 character');
		myHero = '';
		myEnemy = '';
	}

	function initializeGame() {
		characterArray = [frodo, gollum, gandalf, sauron];
		frodo = { name: 'Frodo', hp: 80, attackPower: 5, attackGrow: 15, counterPower: 5, loot: '<img class="loot" src="assets/images/the-one-ring.png" alt="Ring">', display: '<img class="heroimg" src="assets/images/frodo.jpg_c200" alt="Frodo"><div class="text-block"><h5>Frodo</h5></div><div class="hp" id="hp1"><h5>80</h5></div>' };
		gollum = { name: 'Gollum', hp: 120, attackPower: 10, attackGrow: 5, counterPower: 10, loot: '<img class="loot" src="assets/images/deadfish.jpg_c200" alt="Fish">', display: '<img class="heroimg" src="assets/images/gollum.png" alt="Gollum"><div class="text-block"><h5>Gollum</h5></div><div class="hp" id="hp2"><h5>120</h5></div>' };
		gandalf = { name: 'Gandalf', hp: 150, attackPower: 20, attackGrow: 8, counterPower: 20, loot: '<img class="loot" src="assets/images/witch-hat.jpg" alt="Wizard Hat">', display: '<img class="heroimg" src="assets/images/gandalf.jpg" alt="Gandalf"><div class="text-block">	<h5>Gandalf</h5></div><div class="hp" id="hp3"><h5>150</h5></div>' };
		sauron = { name: 'Sauron', hp: 200, attackPower: 15, attackGrow: 10, counterPower: 25, loot: '<img class="loot" src="assets/images/EyeSauron.jpg" alt="Eye">', display: '<img class="heroimg" src="assets/images/sauron.jpg" alt="Sauron"><div class="text-block"><h5>Sauron</h5></div><div class="hp" id="hp4"><h5>200</h5></div>' };
		$('#hero1').html(frodo.display);
		$('#hero2').html(gollum.display);
		$('#hero3').html(gandalf.display);
		$('#hero4').html(sauron.display);
		charBool = false;
		enemyBool = false;
		$('#score').text('Wins: ' + winCounter + '   Losses: ' + lossCounter);
	}

	function updateHP() {
		$('.heroHP').text(myHero.hp);
		$('.enemyHP').text(myEnemy.hp);
		console.log('inside updateHP fx', myHero.hp);
	}

	// WHEN YOU CLICK ON A CHARACTER, IF FIRST SELECTION, SET AS HERO, SET ALL OTHERS AS AVAILABLE ENEMIES, IF ANOTHER CLICKED SET AS CURRENT ENEMY
	$('body').on('click', '.character', function () {
		if (charBool === false) {
			$('#select').hide();
			$('#playerHero').append(this);
			charBool = true;
			$(this).attr('class', 'col-md-2 hero');
			$('#enemiesAvailable').append($('.character'));
			switch (this) {
				case hero1:
					myHero = frodo;
					characterArray.splice(0, 1);
					$('#hp1').attr('class', 'hp heroHP');
					break;
				case hero2:
					myHero = gollum;
					characterArray.splice(1, 1);
					$('#hp2').attr('class', 'hp heroHP');
					break;
				case hero3:
					myHero = gandalf;
					characterArray.splice(2, 1);
					$('#hp3').attr('class', 'hp heroHP');
					break;
				case hero4:
					myHero = sauron;
					characterArray.splice(3, 1);
					$('#hp4').attr('class', 'hp heroHP');
					break;
			}
		}
		else if (enemyBool === false) {
			enemyBool = true;
			$(this).attr('class', 'col-md-2 enemy');
			$('#defenderArea').append(this);
			console.log(this);
			switch (this) {
				case hero1:
					myEnemy = frodo;
					var indexFrodo = characterArray.indexOf(frodo);
					characterArray.splice(indexFrodo, 1);
					$('#hp1').attr('class', 'hp enemyHP');
					break;
				case hero2:
					myEnemy = gollum;
					var indexGollum = characterArray.indexOf(frodo);
					characterArray.splice(indexGollum, 1);
					$('#hp2').attr('class', 'hp enemyHP');
					break;
				case hero3:
					myEnemy = gandalf;
					var indexGandalf = characterArray.indexOf(frodo);
					characterArray.splice(indexGandalf, 1);
					$('#hp3').attr('class', 'hp enemyHP');
					break;
				case hero4:
					myEnemy = sauron;
					var indexSauron = characterArray.indexOf(frodo);
					characterArray.splice(indexSauron, 1);
					$('#hp4').attr('class', 'hp enemyHP');
					break;
			}
		}
	});

	// ATTACK FUNCTION - WHEN CLICKED, REMOVES ATTACK VALUE FROM ENEMY HP, REMOVES COUNTERATTACK FROM HERO HP, ADDS TO HERO ATTACK, IF ENEMY SLAIN LOGIC
	$('body').on('click', '#attack', function () {
		if (characterArray.length !== 0 && myHero.hp > 0 && myEnemy.hp > 0) {
			myHero.hp = myHero.hp - myEnemy.counterPower;
			console.log(myHero.hp);
			$('#updateArea').text('You\'ve dealt ' + myHero.attackPower + ' damage to ' + myEnemy.name + '! ' + myEnemy.name + ' dealt ' + myEnemy.counterPower + ' damage to you.');
			myEnemy.hp = myEnemy.hp - myHero.attackPower;
			myHero.attackPower = myHero.attackPower + myHero.attackGrow;
			console.log(myHero.attackPower);
			updateHP();
			if (characterArray.length !== 0 && myEnemy.hp <= 0) {
				$('#updateArea').text('You\'ve slain ' + myEnemy.name + '!');
				$('.enemy').hide();
				enemyBool = false;
				myEnemy = '';
			}
			if (characterArray.length !== 0 && myHero.hp <= 0) {
				lossCounter++;
				alert('You lose!');
				resetGame();
				initializeGame();
			}
		}
		else {
			winCounter++;
			alert('You win!');
			resetGame();
			initializeGame();
		};
	});
	initializeGame();
})