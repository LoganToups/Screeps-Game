var roleWallRepairer =
{
    // a function to run the logic for the extended role of fixer to try to keep code readability
    run: function (creep)
    {
        creep.say('🚧');

        //Double fail-safe JUST IN CASE I dont have a harvester available, which are important, which always seem to die..
        var numberOfHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if (numberOfHarvesters.length < 1) {
            creep.memory.role = ('harvester');
        }

        // if creep is trying to repair something but has no energy left
        if (creep.memory.fixing == true && creep.carry.energy == 0)
        {
            console.log('memory false');
            creep.memory.fixing = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.fixing == false && creep.carry.energy == creep.carryCapacity)
        {

            creep.memory.fixing = true;
        }

        // if creep is supposed to repair something
        if (creep.memory.fixing == true)
        {

            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL
            });

            var target = undefined;

            // loop with increasing percentages
            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001)
            {
                // find a wall with less than percentage hits
                for (let wall of walls)
                {
                    if (wall.hits / wall.hitsMax < percentage)
                    {
                        target = wall;
                        break;
                    }
                }

                // if there is one
                if (target != undefined)
                {
                    break;
                }
            }

            // if we find a wall that has to be repaired
            if (target != undefined)
            {
                if (creep.repair(target) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#00ff00' } });
                }
            }

        }
        // if no walls need repairing, go back to fixing shit.... took me forever to figure out I can just switch modules this easy ._.
        else
        {
            role.fixer.run(Creep);
        }
    }
};
module.exports = roleWallRepairer;