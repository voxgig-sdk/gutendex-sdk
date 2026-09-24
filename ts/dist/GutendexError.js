"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GutendexError = void 0;
class GutendexError extends Error {
    isGutendexError = true;
    sdk = 'Gutendex';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.GutendexError = GutendexError;
//# sourceMappingURL=GutendexError.js.map