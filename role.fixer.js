var roleFixer =
{
    run: function(creep)
   { 
       creep.say('🧱')
       
        //Creep will check to see how much energy it has, if it zero, will return that it cannot build (false)
        if (creep.memory.fixing && creep.store[RESOURCE_ENERGY] == 0) 
        {
            creep.memory.fixing = false;
        }
        //Creep will check to see how much energy it can store, if it has max energy, it can start building
        if (!creep.memory.fixing && creep.store.getFreeCapacity() == 0) 
        {
            creep.memory.fixing = true;
        }
    
        if(creep.memory.fixing) 
        {
            var roadToRepair = creep.room.find(FIND_STRUCTURES, { filter: function (object) { return object.structureType == STRUCTURE_ROAD && (object.hits < object.hitsMax)}});
            if (roadToRepair.length > 0)
            {
                creep.moveTo(roadToRepair[0]);
                creep.repair(roadToRepair[0]);
            }
            
            var containerToRepair = creep.room.find(FIND_STRUCTURES, { filter: function (object) { return object.structureType == STRUCTURE_CONTAINER && (object.hits < object.hitsMax)}});
            if (containerToRepair.length > 0)
            {
                creep.moveTo(containerToRepair[0]);
                creep.repair(containerToRepair[0]);
            }
            
             //repair dem walls!!!!!!!!!!
            var wallToRepair = creep.room.find(FIND_STRUCTURES,
                { filter: function (object) { return object.structureType == STRUCTURE_WALL && (object.hits < object.hitsMax)}});
            
            if (wallToRepair.length > 0)
            {
                creep.moveTo(wallToRepair[0]);
                creep.repair(wallToRepair[0]);
            }
            /*var target = undefined;

            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001)
            {
                for (let wall of wallsToRepair) {
                    if (wall.hits / wall.hitsMax < percentage) {
                        target = wall;
                        break;
                    }
                }
            }
            if (target != undefined) {

                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }

            }*/

        }
            
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

module.exports = roleFixer;