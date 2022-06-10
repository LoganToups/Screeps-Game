var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFixer = require('role.fixer');

//Add an extra work to the creeps bodys <----
//test 1

module.exports.loop = function () 
{
    //clear dead creeps from memory
    for(var name in Memory.creeps)
    {
        if(!Game.creeps[name]){
            delete Memory.creeps[name];
            console.log('clearing non-existing creeps memory:', name);
        }
    }
    /*Consolidated*/
    // find how many creeps there are in the room by role
    var numberOfHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var numberOfupgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var numberOfBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var numberOfFixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');

    /*added prioritization*/
    //Look how many creeps are left by role, and create more when there aren't enough
    if (numberOfHarvesters.length < 1)
    {
        var newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
            { memory: { role: 'harvester' } })
        /*added failsafe to always be able to spawn at least 1 harvester in case of catistrophic failure, hope it works*/
        if (Game.spawns['Spawn1'] == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters.length == 0)
        {
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'harvester' } })
        }
    }
 
   if (numberOfupgraders.length < 3)
    {
        var newName = 'Upgrader' + Game.time;;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
        {memory: {role: 'upgrader'}});
    }
    
   if (numberOfBuilders.length < 1)
    {
        var newName = 'builder' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
        {memory: {role: 'builder'}});
    }

    if (numberOfFixers.length < 2)
    {
        var newName = 'Fixer' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
        {memory: {role: 'fixer'}});
    }
    
    for(var name in Game.creeps)
    {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester')
        {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader')
        {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder')
        {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'fixer')
        {
            roleFixer.run(creep);
        }
    }
}


//WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE