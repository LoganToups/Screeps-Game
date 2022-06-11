var roleWallRepairer = require('role.wallRepairer');

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

        //simplified the code ALOT by just implicitly looking for ALL damaged structures, instead of explicitly which started taking up a lot of space
        if(creep.memory.fixing) 
        {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsmax && s.structureType != STRUCTURE_WALL
            });

            if (structure != undefined) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
				}
			}
            
             //repair dem walls!!!!!!!!!!
            //attempting to factor code into better form by giving other lengthy behaviors their own file
            else
            {
                console.log('Wall repair');
                roleWallRepairer.run(creep);
			}
        }
            
        if(!creep.memory.fixing)
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