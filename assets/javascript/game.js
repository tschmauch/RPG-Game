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
	var frodo = { name: 'Frodo', hp: 80, attackPower: 5, attackGrow: 10, counterPower: 10, loot: '<img class="loot" src="assets/images/the-one-ring.png" alt="Ring">', display: '<img class="heroimg" src="assets/images/frodo.jpg_c200" alt="Frodo"><div class="text-block"><h5>Frodo</h5></div><div class="hp"><h5>80</h5></div>' };
	var gollum = { name: 'Gollum', hp: 120, attackPower: 5, attackGrow: 5, counterPower: 10, loot: '<img class="loot" src="assets/images/deadfish.jpg_c200" alt="Fish">', display: '<img class="heroimg" src="assets/images/gollum.png" alt="Gollum"><div class="text-block"><h5>Gollum</h5></div><div class="hp">	<h5>120</h5></div>' };
	var gandalf = { name: 'Gandalf', hp: 150, attackPower: 5, attackGrow: 5, counterPower: 10, loot: '<img class="loot" src="assets/images/witch-hat.jpg" alt="Wizard Hat">', display: '<img class="heroimg" src="assets/images/gandalf.jpg" alt="Gandalf"><div class="text-block">	<h5>Gandalf</h5></div><div class="hp"><h5>150</h5></div>' };
	var sauron = { name: 'Sauron', hp: 200, attackPower: 5, attackGrow: 5, counterPower: 10, loot: '<img class="loot" src="assets/images/EyeSauron.jpg" alt="Eye">', display: '<img class="heroimg" src="assets/images/sauron.jpg" alt="Sauron"><div class="text-block"><h5>Sauron</h5></div><div class="hp"><h5>200</h5></div>' };
	var charBool = false;
	var enemyBool = false;
	var myHero;
	var myEnemy;

	function initializeGame() {
		frodo = { name: 'Frodo', hp: 80, attackPower: 5, attackGrow: 10,  counterPower: 10, loot: '<img class="loot" src="assets/images/the-one-ring.png" alt="Ring">', display: '<img class="heroimg" src="assets/images/frodo.jpg_c200" alt="Frodo"><div class="text-block"><h5>Frodo</h5></div><div class="hp"><h5>80</h5></div>' };
		gollum = { name: 'Gollum', hp: 120, attackPower: 5, attackGrow: 5,  counterPower: 10, loot: '<img class="loot" src="assets/images/deadfish.jpg_c200" alt="Fish">', display: '<img class="heroimg" src="assets/images/gollum.png" alt="Gollum"><div class="text-block"><h5>Gollum</h5></div><div class="hp">	<h5>120</h5></div>' };
		gandalf = { name: 'Gandalf', hp: 150, attackPower: 5, attackGrow: 5,  counterPower: 10, loot: '<img class="loot" src="assets/images/witch-hat.jpg" alt="Wizard Hat">', display: '<img class="heroimg" src="assets/images/gandalf.jpg" alt="Gandalf"><div class="text-block">	<h5>Gandalf</h5></div><div class="hp"><h5>150</h5></div>' };
		sauron = { name: 'Sauron', hp: 200, attackPower: 5, attackGrow: 5,  counterPower: 10, loot: '<img class="loot" src="assets/images/EyeSauron.jpg" alt="Eye">', display: '<img class="heroimg" src="assets/images/sauron.jpg" alt="Sauron"><div class="text-block"><h5>Sauron</h5></div><div class="hp"><h5>200</h5></div>' };
		$('#hero1').html(frodo.display);
		$('#hero2').html(gollum.display);
		$('#hero3').html(gandalf.display);
		$('#hero4').html(sauron.display);
		charBool = false;
		enemyBool = false;
		myHero = '';
		myEnemy = '';
	}

	// WHEN YOU CLICK ON A CHARACTER, IF FIRST SELECTION, SET AS HERO, SET ALL OTHERS AS AVAILABLE ENEMIES, IF ANOTHER CLICKED SET AS CURRENT ENEMY
	$('.character').on('click', function () {
		if (charBool === false) {
			console.log(this);
			$('#select').hide();
			$('#playerHero').append(this);
			charBool = true;
			$(this).attr('class', 'col-md-2 hero');
			$('#enemiesAvailable').append($('.character'));
			switch(this) {
				case hero1: 
				myHero = frodo;
				break;
				case hero2:
				myHero = gollum;
				break;
				case hero3:
				myHero = gandalf;
				break;
				case hero4:
				myHero = sauron;
				break;
			}
		}
		else if (enemyBool === false) {
			enemyBool = true;
			$(this).attr('class', 'col-md-2 enemy');
			$('#defenderArea').append(this);
			switch(this) {
				case hero1: 
				myEnemy = frodo;
				break;
				case hero2:
				myEnemy = gollum;
				break;
				case hero3:
				myEnemy = gandalf;
				break;
				case hero4:
				myEnemy = sauron;
				break;
		}
		}
	});

	// ATTACK FUNCTION - WHEN CLICKED, REMOVES ATTACK VALUE FROM ENEMY HP, REMOVES COUNTERATTACK FROM HERO HP, ADDS TO HERO ATTACK, IF ENEMY SLAIN LOGIC
	$('#attack').on('click', function () {
		console.log(myHero);
		myHero.hp = myHero.hp - myEnemy.counterPower;
		// $('.hp').text(myHero.hp);
		myEnemy.hp = myHero.hp - myHero.attackPower;
		console.log(myEnemy.hp);
		myHero.attackPower = myHero.attackPower + myHero.attackGrow;
		console.log(myHero.attackPower);
		if (myEnemy.hp <= 0) {
			$('#updateArea').text('You\'ve slain ' + myEnemy.name + '!');
			console.log(myEnemy);
			$('.enemy').hide();
			enemyBool = false;
			myEnemy = '';


		}

	});

	initializeGame();
})