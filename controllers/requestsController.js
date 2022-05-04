const Request = require("../schemas/requestsSchema");
const User = require("../schemas/myprofileSchema.js");

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.send(requests);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await Request.find({ ownerId: req.params._id });
    res.send(requests);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * Retrieves the subjects which matches search query
 *
 * @param Object $req The request object
 * @param Object $res The response object
 */
 const getMatchingSubjects = async (req, res) => {
  try {
    let requests;

    if (req.params.subjectname == "-") {
      // Retrieving all request data
      requests = await Request.find({examinatorApproved: null});
    }
    // Retrieving request data based on query
    else {
      requests = await Request.find({ subjectName: { "$regex": req.params.subjectname, "$options": "i" }, examinatorApproved: null });
    }

    if (requests.length === 0) {
      res.json({
        "msg": "No requests found"
      })
    } else {
      res.json(requests);
    }
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};




const getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params._id);
    const userName = await User.findById(request.ownerId, "name email");

    let requestCopy = JSON.parse(JSON.stringify(request));
    requestCopy["username"] = userName.name.firstName + " " + userName.name.lastName;
    requestCopy["email"] = userName.email;

    res.send(requestCopy);

  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createRequest = async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).send(request);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateRequest = async (req, res) => {
  try {
    const request = await Request.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    res.send(request);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteRequest = async (req, res) => {
  try {
    await Request.findOneAndDelete({ _id: req.params._id });
    res.send("Request deleted");
  } catch (error) {
    res.status(400).send(error);
  }
};

const checkRequestApproved = async (req, res) => {
  try {
    const request = await Request.find({ examinatorApproved: req.params._id });
    res.send(request);
  } catch (error) {
    res.status(400).send(error);
  }
};

const applyRequest = async (req, res) => {
  try {
    const alreadyApplied = await Request.find({_id: req.body.requestId, examinatorId: req.body.examinatorId});
    const ownRequest = await Request.find({_id: req.body.requestId, ownerId: req.body.examinatorId});

    if(alreadyApplied.length > 0){
      res.json({
        "msg": "You have already applied for this request."
      });
    } else if(ownRequest.length == 1 ){
      res.json({
        "msg": "You cannot apply for your own request!"
      });
    } else {
      const apply = await Request.updateOne({_id: req.body.requestId}, {$push: { examinatorId: req.body.examinatorId }});
      
      if(apply){
        res.json({
        "msg": "Successfully applied for this request."
        });
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createRequest,
  getRequests,
  getAllRequests,
  getRequest,
  updateRequest,
  deleteRequest,
  checkRequestApproved,
  applyRequest,
  getMatchingSubjects
};
