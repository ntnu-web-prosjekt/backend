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

        // RETRIVE THE INBOX DATA IN A FORMAT WHICH CAN BE USED DIRECTLY ON FRONT-END (DONT SEND USERS ID AND REQUEST ID)

    } catch (error) {

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
        const updateRequest = await Request.findByIdAndUpdate(req.body.requestId, {examinatorApproved: req.body.examinatorId});

        // REMOVE THIS OFFER FROM THE SIGNED IN USERS "offersFromOthers"

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
        // REMOVE THE OFFER FROM THE SIGNED IN USERS (offersFromsOthers)
    } catch (error) {

    }
};

module.exports = {
    getInboxData,
    acceptRequest,
    acceptOffer,
    declineRequest,
    declineOffer

};
