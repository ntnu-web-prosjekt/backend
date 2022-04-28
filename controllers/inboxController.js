const User = require("../schemas/myprofileSchema.js");
const Request = require("../schemas/requestsSchema.js");

/**
 * Retrieves signed in users inbox data.
 *
 * @param Object $req The request object
 * @param Object $res The response object
 */
const getInboxData = async (req, res) => {
    try {
        const data = await Request.find({ownerId: req.body.ownerId, examinatorApproved: null, examinatorId: {$not: {$size: 0} }}, "startDate endDate subjectName examinatorId");
        const userNames = await User.find({}, "_id name");
        
        // Updates the data collection so the examinatorId also includes the name of the examinator separated by a ::
        data.forEach(subject => {
            subject.examinatorId.forEach((userId, i) => {
                userNames.forEach((username, j) => {
                    if(userId == username._id){
                        userId = `${userId}::${username.name.firstName} ${username.name.lastName}`;
                        subject.examinatorId[i] = userId;
                    }
                })
            })
        })

      if(data && userNames){
          res.json(data);
      }

    } catch (error) {
        res.json({
            "msg": error.message
        });
    }
};

/**
 * Accept to help someone with their request. The examinatorId belongs to the signed in user or to the approved user.
 *
 * @param Object $req The request object
 * @param Object $res The response object
 */
const acceptRequest = async (req, res) => {
    try {
        const updateRequest = await Request.findByIdAndUpdate(req.body.requestId, {examinatorApproved: req.body.examinatorId});

        // REMOVE THIS REQUEST FROM THE SIGNED IN USERS "requestingYourHelp"

        if(updateRequest){
            res.json({
                "msg": "Success"
            });
        }   
    } catch (error) {
        res.json({
            "msg": error.message
        });
    }
};

/**
* Accept that someone can help you with your own request. The examinatorId belongs to approved user.
*
* @param Object $req The request object
* @param Object $res The response object
*/
const acceptOffer = async (req, res) => {
    try {
        // Update the request with new examinatorApproved
        const updateRequest = await Request.findByIdAndUpdate(req.body.requestId, {examinatorApproved: req.body.examinatorId});

        // Remove the examinator from the application list (examinatorId)
        const removeExaminator = await Request.updateOne({_id: req.body.requestId}, {$pull: {examinatorId: req.body.examinatorId}});

        if(updateRequest && removeExaminator){
            res.json({
                "msg": "Success"
            });
        }   
    } catch (error) {
        res.json({
            "msg": error.message
        });
    }
};

/**
* Declines an examinators request for your help
*
* @param Object $req The request object
* @param Object $res The response object
*/
const declineRequest = async (req, res) => {
    try {
        // REMOVE THE REQUESR FROM THE SIGNED IN USERS (requestingYourHelp)
    } catch (error) {

    }
};

/**
* Declines an examinators who wants to help
*
* @param Object $req The request object
* @param Object $res The response object
*/
const declineOffer = async (req, res) => {
    try {
        // Remove the examinator from the application list (examinatorId)
        const removeExaminator = await Request.updateOne({_id: req.body.requestId}, {$pull: {examinatorId: req.body.examinatorId}});

        if(removeExaminator){
            res.json({
                "msg": "Success"
            });
        } 

    } catch (error) {
        res.json({
            "msg": error.message
        });
    }
};

module.exports = {
    getInboxData,
    acceptRequest,
    acceptOffer,
    declineRequest,
    declineOffer

};
