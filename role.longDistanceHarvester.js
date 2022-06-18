//Dont have this working properly yet... 

var roleLongDistanceHarvester = 
{
    // a function to run the logic for this role
    run: function(creep) 
    {
        creep.say('🚚');
        if(!creep.memory.working)
        {
            creep.memory.working = true;
        }
        
        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working = true) 
        {
            // if in home room
            if (creep.room.name == creep.memory.home) {
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

                // if we found one
                if (structure != undefined) {
                    // try to transfer energy, if it is not in range
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(structure);
                    }
                }
            }
            // if not in home room...
            else {
                // find exit to home room
                var exit = creep.room.findExitTo(creep.memory.home);
                // and move to exit
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
        // if creep is supposed to harvest energy from source
        if (creep.memory.working = false)
        {
               var source = creep.room.find(FIND_SOURCES);
               
                if (creep.harvest(source) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(Game.flags['sources']);
                }
                // if not in target room
                else
                {
                    // find exit to target room
                    var exit = creep.room.findExitTo(creep.memory.target);
                    // move to exit
                    creep.moveTo(creep.pos.findClosestByRange(exit));
                }
        }
    }
};
module.exports = roleLongDistanceHarvester;