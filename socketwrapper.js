const q = require('q');
module.exports = (io,cb) => {
  io.on('connection', function(socket){
    var id = Math.random();
    var connection = {getId,onRegister, onDisconnect, onRefreshWorld,onMoveEntity,broadcastEntity,broadcastRemovedEntity, emitWorld, emitRegisteredEntity};
    cb(connection);
    
    function getId() {
      const defer = q.defer();
      defer.resolve(id);
      return defer.promise;
    }
    
    function onRegister(callback){
      socket.on("register",(options)=>{
        callback(options);
      });
    }
    function onDisconnect(callback){
      socket.on("disconnect",(options)=>{
        callback(options);
      });
    }
    
    function onRefreshWorld(callback){
       socket.on("register",(options)=>{
        callback(options);
      });
    }
    
    function onMoveEntity(callback){
      socket.on("moveEntity",(options)=>{
        callback(options);
      });
    }
    function broadcastEntity(entity){
      io.emit("entity",entity);
    }
    function broadcastRemovedEntity(entity){
      io.emit("removedEntity",entity);
    }
    function emitWorld(world) {
        socket.emit("world",world);
    }
    
    function emitRegisteredEntity(entity) {
      socket.emit("registeredEntity",entity);
    }
  });
}
