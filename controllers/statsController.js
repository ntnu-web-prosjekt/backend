const Request = require("../schemas/requestsSchema.js");

/**
* Retrieves request stats.
*
* @param Object $req The request object
* @param Object $res The response object
*/
const getStats = async (req, res) => {
  try {
    // Counts number of requests with no approved examinator
    const openRequests = await Request.countDocuments({ examinatorApproved: null }).exec();

    // Counts number of requests with approved examinator
    const matchedRequests = await Request.countDocuments({ examinatorApproved: { $ne: null } }).exec();

    if (openRequests >= 0 && matchedRequests >= 0) {
      res.json({
        openReq: openRequests,
        matchedReq: matchedRequests
      });
    } else {
      res.status(400).send("Could not retrieve data.");
      return;
    }

  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

module.exports = {
  getStats
};
