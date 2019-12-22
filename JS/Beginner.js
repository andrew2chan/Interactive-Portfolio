class Beginner extends Phaser.Scene {
  constructor()
  {
    super({key:"Beginner"});
  }

  preload ()
  {
      this.load.image('background', 'Asset/Background.png');
      this.load.image('ground', 'Asset/Ground.png');
      this.load.image('platforms', 'Asset/JumpPlatforms.png');
      this.load.image('movementBoard', 'Asset/MovementBoard.png');
      this.load.image('movementBoardTP', 'Asset/MovementBoardTP.png');
      this.load.spritesheet('dude', 'Asset/SpriteSheet.png', {frameWidth: 16, frameHeight: 32 });
      this.load.spritesheet('portal', 'Asset/PortalSpriteSheet.png', {frameWidth: 32, frameHeight: 32 });

      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
  }

  playerPosition = {};

  init (data) {
    this.playerPosition.x = data.positionX;
    this.playerPosition.y = data.positionY;
  }

  portal = "";
  portal2 = "";
  cursors = "";
  player = "";

  create ()
  {
      this.add.image(400, 300, 'background');

      let platforms = this.physics.add.staticGroup();
      let boards = this.physics.add.staticGroup();
      //portal = this.physics.add.staticGroup();

      this.portal = this.physics.add.sprite(750, 170, 'portal');
      this.portal2 = this.physics.add.sprite(670, 85, 'portal');

      boards.create(30,170,'movementBoard');
      boards.create(700,170,'movementBoardTP');
      boards.create(625,85,'movementBoardTP');

      platforms.create(210, 130, 'platforms');
      platforms.create(310, 95, 'platforms');
      platforms.create(430, 130, 'platforms');
      platforms.create(530, 95, 'platforms');
      platforms.create(650, 115, 'platforms').setScale(3,1).refreshBody();
      platforms.create(100, 175, 'platforms').setScale(2,1.5).refreshBody();
      platforms.create(400, 200, 'ground');

      //portal.create(500, 170, 'portal');
      //portal.create(750, 170, 'portal');
      this.player = this.physics.add.sprite(this.playerPosition.x, this.playerPosition.y, 'dude');

      this.portal.body.allowGravity = false;
      this.portal2.body.allowGravity = false;

      this.player.setBounce(0.1);
      this.player.setCollideWorldBounds(true);

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

      this.cursors = this.input.keyboard.createCursorKeys();

      this.physics.add.collider(this.player, platforms);

      this.physics.add.overlap(this.player, this.portal, function() {
        if(this.cursors.down.isDown) {
          this.scene.start("AboutMe", {positionX: 30, positionY: 160});
        }
      }, null, this);

      this.physics.add.overlap(this.player, this.portal2, function() {
        if(this.cursors.down.isDown) {
          console.log("working2");
        }
      }, null, this);

      //portal.playAnimation('stand');
      let camera = this.scene.scene.cameras.main;
      camera.setBounds(0, 0, 800, 0);
      camera.setZoom(3);
      camera.startFollow(this.player);
  }

  direction = 1;

  update() {
    this.portal.anims.play('stand', true);
    this.portal2.anims.play('stand', true);

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-90);
        this.direction = -1;

        this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(90);
        this.direction = 1;

        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);

        if(this.direction == 1) { this.player.anims.play('turn-right'); }
        else { this.player.anims.play('turn-left'); }
    }

    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-150);
    }

    if(!this.player.body.touching.down) {
      if(this.direction == 1) {
        this.player.anims.play('jump-right', true);
      } else {
        this.player.anims.play('jump-left', true);
      }
    }
  }

}
