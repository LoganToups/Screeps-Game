var roleUpgrader =
{

    run: function (creep)
    {
        creep.say('🌐')
        
        //if the creep state is set to upgradding and the energy it is carry falls to 0, stop upgrading and do soemthing else
        if (creep.memory.upgrading && creep.carry.energy == 0) 
        {
            creep.memory.upgrading = false;
        }

        //if the creep is NOT upgrading, and the energy capacity is at max, start upgrading.
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) 
        {
            creep.memory.upgrading = true;
        }

        //if the creep is NOT upgrading, then start mining until the energy capacity is at max
        if (!creep.memory.upgrading) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ccccff' } });

            }
        }
        // this will allow the creep to find and upgrade the controller if it's memory is set to upgrading
        else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#0000ff' } });
            }
        }
        //signing a controller to display a message, keeping this code commented out for later use or something
        
        /*if(creep.room.controller)
        {
            if(creep.signController(creep.room.controller, "Bby dont hurt me, it's my first time <3") == ERR_NOT_IN_RANGE) 
            {
            creep.moveTo(creep.room.controller);
            }
        }*/
    }
};

module.exports = roleUpgrader;