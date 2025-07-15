
export function getClientIp(request: any): string {
    const ip = request.ip || request.connection?.remoteAddress || request.headers['x-forwarded-for'];
    if (ip && ip.startsWith('::ffff:')) {
        return ip.substring(7);
    }
    return ip;
}