import { createHash } from "crypto";
import { Request } from "express";

export function getDeviceID(req: Request) {
    const fingerprint = [
        req.headers['user-agent'],
        req.ip,
        req.headers['accept-language'],
        req.headers['sec-ch-ua-platform']
    ].join('|');

    return createHash('sha256')
        .update(fingerprint)
        .digest('hex');
}