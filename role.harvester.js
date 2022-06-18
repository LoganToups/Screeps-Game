var roleHarvester =
{
    run: function (creep)
    {
        creep.say('⚡')
        
        //creep needs to check to see if it has max capacity and return False
        if (creep.memory.harvesting && creep.carry.energy == 0)
        {
            creep.memory.harvesting = false;
        }
        
        //creep needs to check to see if it is at min capacity and return True
        if (!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity)
        {
            creep.memory.harvesting = true;
        }
        
        //creep needs find out what it is doing at min/max capacity and compare it to our checks and do something
        if (!creep.memory.harvesting)
        {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) ==  ERR_NOT_IN_RANGE)
            {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffebcc'}});
            }
            
        }
        
        //if it is not doing the first thing it should be doing, have it do the other thing
        else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity)
        {
           if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
           {
               creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffa31a'}});
           }
        }
        
        /* Harvest creeps will also look for Extension structures and Towers to refill as needed
        Can possible expand this to include more structres later, or just implicitly allow it to look for ALL fillable structures, not sure how efficent that would be*/
        if (creep.memory.harvesting == true) {
            // find closest spawn, extension or tower which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                    || s.structureType == STRUCTURE_EXTENSION
                    || s.structureType == STRUCTURE_TOWER)
                    && s.energy < s.energyCapacity
            });

            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }

            else {
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};
module.exports = roleHarvester;