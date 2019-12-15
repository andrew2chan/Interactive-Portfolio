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
    scene: [Beginner, AboutMe],
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
