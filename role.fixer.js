var roleWallRepairer = require('role.wallRepairer');
var roleFixer =
{
    run: function(creep)
   { 
        creep.say('🧱')
        
        if(!creep.memory.fixing)
        {
            creep.memory.fixing = false;
        }
        
        if (creep.memory.fixing == true && creep.carry.energy == 0) {
            creep.memory.fixing = false;
        }
        // if creep is harvesting energy but is full
        if (!creep.memory.fixing && creep.carry.energy == creep.carryCapacity) {

            creep.memory.fixing = true;
        }

        // if creep is supposed to repair something
        //exclude walls because I have a seperate algorithm to handle it for more efficiency
        if (creep.memory.fixing == true) {
                
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {

                filter: (s) => s.hits < s.hitsMax / 2 && s.structureType != STRUCTURE_WALL
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
                roleWallRepairer.run(creep);
			}
        }
            
        if(creep.memory.fixing == false)
        {
          var sources = creep.room.find(FIND_SOURCES);

          if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
          {
             creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#00ff00' } });
          }
        }
   }
};

module.exports = roleFixer;