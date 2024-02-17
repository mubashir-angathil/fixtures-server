"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DATABASE_URL = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || 'development'}` });
_a = process.env, exports.DATABASE_URL = _a.DATABASE_URL, exports.PORT = _a.PORT;
//# sourceMappingURL=configs.js.map