const Test = require("../schemas/testSchema.js");

/**
* Description of function...
*
*/
const doSomeTest = async (req, res) => {
    try {
        const testResult = await Test.find();

        if(testResult.length === 0){
            res.status(400);
            throw new Error("There exists no data yet!");

        } else {
            res.json(testResult);
        }

    } catch(error){
        res.json({
            "msg": error.message
        })
    }
}

module.exports = {
    doSomeTest
}