import { UserAuthNS } from "../auth/auth";
import { HttpError, HttpStatusCodes } from "../lib/http";
import { UserNS } from "../user/user";

const commonErrors = new Set([
    ...Object.values(UserNS.Errors),
    ...Object.values(UserAuthNS.Errors),
]);

export function HttpErrorHandler(err, req, res, next) {
    if (commonErrors.has(err)) {
        err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    if (err && typeof err.HttpStatusCode === "function") {
        const message = err.message;
        res.status(err.HttpStatusCode() || 500).json({
            error: message,
        });
        return;
    }
    console.log(err);
    res.status(500).send({
        error: "internal server error",
    });
}
