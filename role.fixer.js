//var roleWallRepairer = require('role.wallRepairer');

var roleFixer =
{
    
    run: function(creep)
   { 
        creep.say('🧱')

        //Double fail-safe JUST IN CASE I dont have a harvester available, which are important, which always seem to die..
        var numberOfHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if (numberOfHarvesters.length == 0)
        {
            setTimeout(creep.memory.role = ('harvester'), 30000);
        }
       
        if (creep.memory.fixing == true && creep.carry.energy == 0) {

            creep.memory.fixing = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.fixing== false && creep.carry.energy == creep.carryCapacity) {

            creep.memory.fixing = true;
        }

        // if creep is supposed to repair something
        //exclude walls because I have a seperate algorithm to handle it for more efficiency
        if (creep.memory.fixing == true) {

            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {

                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
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