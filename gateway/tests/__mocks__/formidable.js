// Minimal mock for formidable used in tests to avoid node:fs resolution issues under Jest
module.exports = {
  IncomingForm: function () {
    this.parse = (req, cb) => cb(null, {}, {});
  }
};
