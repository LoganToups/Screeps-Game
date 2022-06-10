module.exports = function()
{

    StructureSpawn.prototype.createCustomCreep = function (energy, roleName)
        {
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            for (let i = 0; i < numberOfParts; i++)
            {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++)
            {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++)
            {
                body.push(MOVE);
            }
            this.createCreep(body, undefined, { role: roleName});
        };

};