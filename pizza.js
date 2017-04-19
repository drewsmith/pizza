var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('pisa', 'assets/pisa.png');
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
}

var pisa;
var cursors;
var platforms;

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    pisa = game.add.sprite((game.world.width / 2), game.world.height - 250, 'pisa');

    pisa.scale.setTo(3, 3);

    game.physics.arcade.enable(pisa);

    pisa.body.collideWorldBounds = true;

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    //  Reset the players velocity (movement)
    pisa.body.velocity.x = 0;

    if (cursors.left.isDown) {
        //  Move to the left
        pisa.body.velocity.x = -150;

        pisa.animations.play('left');
    } else if (cursors.right.isDown) {
        //  Move to the right
        pisa.body.velocity.x = 150;

        pisa.animations.play('right');
    } else {
        //  Stand still
        pisa.animations.stop();

        pisa.frame = 4;
    }
}