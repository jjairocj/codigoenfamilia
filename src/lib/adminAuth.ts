export function verifyAdminPin(req: Request): boolean {
  const pin = req.headers.get("x-admin-pin") || "";
  const validPin = process.env.ADMIN_PIN || "familia2026admin";
  return pin.trim() === validPin.trim();
}
