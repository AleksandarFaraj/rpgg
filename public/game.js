var core = core();
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gamecanvas', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('spider', 'assets/spider');
}
var cursors;
var world = {};
var entitySprites;

var thisEntity;

function create() {
  entitySprites = {};
  
  core.bindWorldEvent(function(_world) {
    console.log("World broadcast",_world);
    for(var key in _world){
      world[key] = _world[key];
      var entity = _world[key];
      var entitySprite = this.add.sprite(entity.x,entity.y,'spider');
      entitySprites[key]=entitySprite;
    }
  }.bind(this));
  
  core.bindEntityEvent(function(entity) {
    console.log("Entity information",entity);
    var entitySprite = entitySprites[entity.id];
    if (!entitySprite) {
      
      entitySprite = this.add.sprite(entity.x,entity.y,'spider');
      entitySprites[entity.id] = entitySprite
    }
    entitySprite.position.x = entity.x;
    entitySprite.position.y = entity.y;
  }.bind(this));
  
  core.bindRegisterEvent(function(entity) {
    console.log("Received own entitity");
    thisEntity=entity;
  }.bind(this));
  
  core.bindRemovedEntityEvent(function(entity) {
    var entitySprite = entitySprites[entity.id];
    if (entitySprite) {
      entitySprite.destroy();
      delete entitySprites[entity.id];
      delete world[entity.id];
    } else {
      throw new Error("EntityRemovedWithoutBeingAdded","Entity removed before added");
    }
  }.bind(this));
  core.registerWithServer();

  cursors = this.input.keyboard.createCursorKeys();
}
function output() {
  var console = document.getElementById("console");
  console.scrollTop = console.scrollHeight;
  for(var key in arguments) {
    var arg = arguments[key];
    console.value += arg +" ";
  }
  console.value("\n");
}
function update() {
  try {
    eval(document.getElementById("code").value);
  } catch (e) {
    output(e);
  }
    if (cursors.left.isDown) {
        core.moveEntity({x:-1});
    } else if (cursors.right.isDown) {
        core.moveEntity({x:1});
    } else if (cursors.up.isDown){
        core.moveEntity({y:-1});
    } else if (cursors.down.isDown) {
        core.moveEntity({y:1});
    }
}
function render() {
  
}
function worldHandler() {
  const world = {};
  
}