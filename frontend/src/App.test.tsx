import fs from "fs";
import path from "path";

describe("Sckoob PWA assets", () => {
  test("manifest configures a standalone installable app", () => {
    const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, "../public/manifest.json"), "utf8"));
    expect(manifest.name).toBe("Sckoob Community");
    expect(manifest.display).toBe("standalone");
    expect(manifest.icons).toEqual(expect.arrayContaining([expect.objectContaining({ sizes: "192x192" }), expect.objectContaining({ sizes: "512x512" })]));
  });
  test("service worker excludes API requests from its cache", () => {
    const worker = fs.readFileSync(path.join(__dirname, "../public/service-worker.js"), "utf8");
    expect(worker).toContain('url.pathname.startsWith("/api/")');
    expect(worker).toContain('caches.match("/offline.html")');
  });
});
