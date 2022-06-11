var roleBuilder =
{
    run: function (creep)
    {
        creep.say('🛠')
     
        //Double fail-safe JUST IN CASE I dont have a harvester available, which are important, which always seem to die..
        var numberOfHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if (numberOfHarvesters.length == 0)
        {
            setTimeout(creep.memory.role = ('harvester'), 35000);
        }

        //Creep will check to see how much energy it has, if it zero, will return that it cannot build (false)
        if (creep.memory.building && creep.carry.energy == 0) 
        {
            creep.memory.building = false;
        }
        //Creep will check to see how much energy it can store, if it has max energy, it can start building
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) 
        {
            creep.memory.building = true;
        }
        //Creep will look for construction sites by looking in the current room and parsing the array
        if (creep.memory.building)
        {
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
                    creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#00ff00' } });
           }

        }
    }
};
module.exports = roleBuilder;