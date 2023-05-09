module.exports = {
  sendError: function (error_code, res, text, req) {
    res.send({
      action: req.originalUrl,
      code: error_code,
      status: false,
      data: {},
      message: text,
    });
  },
  sendSuccess: function (res, text, req, message = "") {
    res.send({
      action: req.originalUrl,
      code: 200,
      status: true,
      data: text,
      message: message,
    });
  },
  // Verify Token
  verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      // Split at the space
      const bearer = bearerHeader.split(" ");
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      return res.sendStatus(403);
    }
  },
  makeid() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  validateEmail: function (email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  validatePhone: function (phone) {
    var valid_number = phone.replace("+", "00");
    valid_number = valid_number.replace(/-/g, "");
    valid_number = valid_number.replace(/ /g, "");
    valid_number = valid_number.replace(/[\])}[{(]/g, "");
    valid_number = valid_number.substr(valid_number.length - 9);
    return valid_number;
  },
};
