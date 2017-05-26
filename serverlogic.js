module.exports = (connection,game) => {
    connection.onRegister(()=>{
      connection.getId().then((id)=>{
        game.addEntity(id).then((entity) => {
           console.log("BroadcastingEntity")
          connection.emitRegisteredEntity(entity);
          console.log("BroadcastingEntity")
          connection.broadcastEntity(entity);
        });
      });
    });
    connection.onRefreshWorld(()=>{
      game.getWorld().then((world)=>{
        console.log("Emitting world");
        connection.emitWorld(world);
      });
    });
    connection.onMoveEntity((options)=>{
      connection.getId().then((id)=>{
        game.getEntity(id).then((entity)=>{
          entity.x = entity.x + (options.x||0);
          entity.y = entity.y + (options.y||0);
          game.setEntity(id,entity).then((entity)=>{
            connection.broadcastEntity(entity);
          });
        });
      });
    });
    connection.onDisconnect((options)=>{
      connection.getId().then((id)=>{
        game.removeEntity(id).then(connection.broadcastRemovedEntity)
      });
    })
};