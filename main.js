//Welcome to the speghetti train!
require('prototype.tower');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFixer = require('role.fixer');
var roleLongDistanceHarvester = require('role.longDistanceHarvester');

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
    var numberOfLongDistanceHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'longDistanceHarvester');

    //Look how many creeps are left by role, and create more when there aren't enough
    if (numberOfHarvesters.length < 2)
    {
        var newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
            { memory: { role: 'harvester' } })
        /*added failsafe to always be able to spawn at least 1 harvester in case of catistrophic failure, hope it works <--- turns out the first itteration did NOT work...
         it works now though*/
        if (numberOfHarvesters.length == 0)
        {
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'harvester' }});
        }
    }
    // Look at how many creeps by role are left, and if less than the desired amount, create more.
    if (numberOfLongDistanceHarvesters.length < 0) // not working
    {
        var newName = 'LD-Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory:{role:'longDistanceHarvester'}});
    }
 
   if (numberOfupgraders.length < 2)
    {
        var newName = 'Upgrader' + Game.time;;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
        {memory: {role: 'upgrader'}});
    }
    
   if (numberOfBuilders.length < 1)
    {
        var newName = 'builder' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
        {memory: {role: 'builder'}});
    }

    if (numberOfFixers.length < 4)
    {
        var newName = 'Fixer' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
        {memory: {role: 'fixer'}});
    }
    // assign creeps logic by role, messy implementation but it works I guess
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
        if(creep.memory.role == 'longDistanceHarvester')
        {
            roleLongDistanceHarvester.run(creep);
        }
    }

    // find all towers
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers)
    {
        // run tower logic
        tower.defend();
    }
}


//WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE