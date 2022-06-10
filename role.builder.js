var roleBuilder =
{
    run: function (creep)
    {
        creep.say('🛠')
        
        //Creep will check to see how much energy it has, if it zero, will return that it cannot build (false)
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) 
        {
            creep.memory.building = false;
        }
        //Creep will check to see how much energy it can store, if it has max energy, it can start building
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) 
        {
            creep.memory.building = true;
        }
        //Creep will look for construction sites by looking in the current room and parsing the array
        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ccffcc' } });
                }
            }
        }
        /*When the creep is not building, it can look for energy to mine, default set to first energy source in the array
        maybe figure out how to get the number of sources and always pick the closest one, or the least crowded*/
        else
         {
             var sources = creep.room.find(FIND_SOURCES);
             if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
             {
                 if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
                 {
                     creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#00ff00' } });
                 }
             }
         }

    }
    
};

module.exports = roleBuilder;