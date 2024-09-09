"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = notFound;
function notFound(req, res, next) {
    return res
        .status(404)
        .json({
        error: "Not found buddy, The route you searching for does not exist",
    });
}
