core = function core() {
  var socket = io();
  
  return {bindWorldEvent,bindEntityEvent,bindRegisterEvent,bindRemovedEntityEvent,registerWithServer,moveEntity}; 
  function bindWorldEvent(callback) {
    socket.on("world", callback);
  }
  function bindEntityEvent(callback) {
    socket.on("entity", callback);
  } 
  function bindRegisterEvent(callback) {
    socket.on("registeredEntity", callback);
  } 
  function bindRemovedEntityEvent(callback) {
    socket.on("removedEntity", callback);
  }
  function registerWithServer(options) {
    socket.emit("register", options);
  }
  function moveEntity(options){
    socket.emit("moveEntity", options);
    
  }
}
