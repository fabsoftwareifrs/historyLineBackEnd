class HttpResponse {
  static badRequest(res, massage) {
    return res.status(400).json({ massage });
  }
  static ServerError(res, massage) {
    return res.status(500).json({ massage });
  }
  static ok(res, massage) {
    return res.status(200).json({ massage });
  }
}
module.exports = HttpResponse;
