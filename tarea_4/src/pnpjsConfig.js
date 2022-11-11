"use strict";
exports.__esModule = true;
exports.getSP = void 0;
var sp_1 = require("@pnp/sp");
var logging_1 = require("@pnp/logging");
require("@pnp/sp/webs");
require("@pnp/sp/lists");
require("@pnp/sp/items");
require("@pnp/sp/fields");
require("@pnp/sp/batching");
var _sp = null;
var getSP = function (context) {
    if (_sp === null && context !== null) {
        _sp = (0, sp_1.spfi)().using((0, sp_1.SPFx)(context)).using((0, logging_1.PnPLogging)(2 /* LogLevel.Warning */));
    }
    return _sp;
};
exports.getSP = getSP;
