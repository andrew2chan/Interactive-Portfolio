class ExperienceContact extends Phaser.Scene {
  constructor()
  {
    super({key:"ExperienceContact"});
  }

  preload ()
  {
      this.load.image('background', 'Asset/Background.png');
      this.load.image('ground', 'Asset/Ground.png');
      this.load.image('email', 'Asset/Email.png');
      this.load.image('phone', 'Asset/Phone.png');
      this.load.image('surveyprogrammer', 'Asset/SurveyProgrammer.png');
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
  cursors = "";
  player = ""

  create ()
  {
      this.add.image(400, 300, 'background');

      let platforms = this.physics.add.staticGroup();
      let information = this.physics.add.staticGroup();

      this.portal = this.physics.add.sprite(30, 170, 'portal');

      information.create(100, 157, 'email');
      information.create(200, 157, 'phone');
      information.create(380, 135, 'surveyprogrammer');

      platforms.create(400, 200, 'ground');

      this.player = this.physics.add.sprite(this.playerPosition.x, this.playerPosition.y, 'dude');

      this.portal.body.allowGravity = false;

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
          this.scene.start("GameInterlude", { positionX: 750, positionY: 165 });
        }
      }, null, this);

      let camera = this.scene.scene.cameras.main;
      camera.setBounds(0, 0, 800, 0);
      camera.setZoom(3);
      camera.startFollow(this.player);
  }

  direction = 1;

  update() {
    this.portal.anims.play('stand', true);

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
