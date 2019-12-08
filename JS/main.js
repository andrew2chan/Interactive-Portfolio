var config = {
    type: Phaser.AUTO,
    parent: "phaser-main",
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        render: render
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      //width: 200,
      //height: 150
    },
    render: {
      pixelArt: true,
      antialias: false
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('background', 'Asset/Background.png');
    this.load.image('ground', 'Asset/Ground.png');
    this.load.image('platforms', 'Asset/JumpPlatforms.png');
    this.load.spritesheet('dude', 'Asset/SpriteSheet.png', {frameWidth: 16, frameHeight: 32 });
    this.load.spritesheet('portal', 'Asset/PortalSpriteSheet.png', {frameWidth: 32, frameHeight: 32 });

    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
}

function create ()
{
    this.add.image(400, 300, 'background');

    platforms = this.physics.add.staticGroup();
    //portal = this.physics.add.staticGroup();

    platforms.create(210, 130, 'platforms');
    platforms.create(100, 175, 'platforms').setScale(2,1.5).refreshBody();
    platforms.create(400, 200, 'ground');

    portal = this.physics.add.sprite(750, 170, 'portal');
    portal2 = this.physics.add.sprite(500, 170, 'portal');

    //portal.create(500, 170, 'portal');
    //portal.create(750, 170, 'portal');
    player = this.physics.add.sprite(5, 25, 'dude');

    portal.body.allowGravity = false;
    portal2.body.allowGravity = false;

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'turn-left',
        frames: [ { key: 'dude', frame: 2 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'turn-right',
        frames: [ { key: 'dude', frame: 3 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 5 }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'jump-left',
        frames: [ { key: 'dude', frame: 6 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'jump-right',
        frames: [ { key: 'dude', frame: 7 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'stand',
        frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);

    this.physics.add.overlap(player, portal, function() {
      if(cursors.down.isDown) {
        console.log("working");
      }
    }, null, this);

    this.physics.add.overlap(player, portal2, function() {
      if(cursors.down.isDown) {
        console.log("working2");
      }
    }, null, this);

    //portal.playAnimation('stand');

    var camera = this.scene.scene.cameras.main;
    camera.setBounds(0, 0, 800, 0);
    camera.setZoom(3);
    camera.startFollow(player);
}

var direction = 1;

function update() {
  portal.anims.play('stand', true);
  portal2.anims.play('stand', true);

  if (cursors.left.isDown) {
      player.setVelocityX(-90);
      direction = -1;

      player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
      player.setVelocityX(90);
      direction = 1;

      player.anims.play('right', true);
  }
  else
  {
      player.setVelocityX(0);

      if(direction == 1) { player.anims.play('turn-right'); }
      else { player.anims.play('turn-left'); }
  }

  if (cursors.up.isDown && player.body.touching.down)
  {
      player.setVelocityY(-150);
  }

  if(!player.body.touching.down) {
    if(direction == 1) {
      player.anims.play('jump-right', true);
    } else {
      player.anims.play('jump-left', true);
    }
  }



}

function render() {

}
