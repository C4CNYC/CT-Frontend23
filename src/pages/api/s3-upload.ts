import { APIRoute, sanitizeKey } from "next-s3-upload";
import { v4 } from "uuid";

export default APIRoute.configure({
  key(req, filename) {
    const tenant = req.headers['x-tenant-id'] ?? 'default';
    return `media/${tenant}/${v4()}-${sanitizeKey(filename)}`;
  }
});
