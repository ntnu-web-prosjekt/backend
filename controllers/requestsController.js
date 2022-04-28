const Request = require("../schemas/requestsSchema");

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

const getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params._id);
    res.send(request);
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
    const apply = await Request.updateOne({_id: req.body.requestId}, {$push: { examinatorId: req.body.examinatorId }});

    if(apply){
      res.json({
        "msg": "Success"
      });
    };
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
  applyRequest
};
