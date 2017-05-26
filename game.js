var q = require("q");
function game() {
  var _ = this;
  this.world = {};
  return {addEntity,getEntity,setEntity,removeEntity,getWorld};
  function addEntity(id) {
    var entity = {id,x:Math.random()*500,y:Math.random()*500};
    _.world[entity.id] = entity;
    var defer = q.defer();
    console.log("Adding entity");
    defer.resolve(entity);
    return defer.promise;
  }
  function getEntity(id) {
    const defer = q.defer();
    const entity = _.world[id];
    if (entity) {
      defer.resolve(entity);
    } else {
      defer.reject(new Error("EntityNotFound","Entity "+id+" could not be found"));
    }
    return defer.promise;
  }
  function setEntity(id,entity) {
    const defer = q.defer();
    _.world[id]=entity;
    defer.resolve(entity);

    return defer.promise;
  }
  function removeEntity(id) {
    const defer = q.defer();
    const entity = _.world[id];
    if (entity) {
      delete _.world[id];
      defer.resolve(entity);
    } else {
      defer.reject(new Error("EntityNotFound","Entity "+id+" could not be deleted because it was not found"));
    }
    return defer.promise;
  }
  function getWorld() {
    var defer = q.defer();
    defer.resolve(_.world);
    return defer.promise;
  }
}
module.exports = game;