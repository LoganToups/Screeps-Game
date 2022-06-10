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
        Can possible expand this to include more structres later*/
        else
        {
            var fillExtension = creep.room.find(FIND_STRUCTURES, {filter: (structure) => 
                {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity}});
            if (creep.transfer(fillExtension[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(fillExtension[0]);
            }


            else 
            {
                var fillContainer = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER && structure.energy < structure.energyCapacity) }});

                if (creep.transfer(fillContainer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(fillContainer[0], { visualizePathStyle: { stroke: '#ffa31a' }});
                }
                
            }
        }

    }
};
module.exports = roleHarvester;