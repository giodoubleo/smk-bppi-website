import { chromium } from "playwright-core";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const RECORDING_DIR = path.resolve("recordings");
if (!fs.existsSync(RECORDING_DIR)) {
  fs.mkdirSync(RECORDING_DIR, { recursive: true });
}

async function smoothScroll(page, targetY, durationMs = 1500) {
  const steps = 30;
  const delay = durationMs / steps;
  const currentY = await page.evaluate(() => window.scrollY);
  const diff = targetY - currentY;
  for (let i = 1; i <= steps; i++) {
    const y = currentY + (diff * (1 - Math.cos((i / steps) * Math.PI))) / 2;
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await new Promise((r) => setTimeout(r, delay));
  }
}

async function dragRotate3D(page, startX, startY, deltaX, deltaY, steps = 25) {
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  for (let i = 1; i <= steps; i++) {
    await page.mouse.move(
      startX + (deltaX * i) / steps,
      startY + (deltaY * i) / steps
    );
    await new Promise((r) => setTimeout(r, 20));
  }
  await page.mouse.up();
}

async function run() {
  console.log("Starting automated video recording of SMK BPPI Baleendah website...");

  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: false, // Headed mode ensures full WebGL GPU acceleration & canvas rendering!
    args: [
      "--enable-webgl",
      "--ignore-gpu-blocklist",
      "--window-size=1400,900",
      "--no-first-run",
      "--no-default-browser-check",
    ],
  });

  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    recordVideo: {
      dir: RECORDING_DIR,
      size: { width: 1366, height: 768 },
    },
  });

  const page = await context.newPage();

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  console.log("Interacting with 3D Showcase (PPLG PlayStation DualSense)...");
  // Hover over the 3D canvas to show mouse parallax
  const canvasBox = await page.locator("canvas").first().boundingBox();
  if (canvasBox) {
    const cx = canvasBox.x + canvasBox.width * 0.5;
    const cy = canvasBox.y + canvasBox.height * 0.5;

    // Smooth circle mouse move
    for (let angle = 0; angle < Math.PI * 2; angle += 0.2) {
      const mx = cx + Math.cos(angle) * 120;
      const my = cy + Math.sin(angle) * 70;
      await page.mouse.move(mx, my);
      await page.waitForTimeout(30);
    }

    // 360-degree interactive drag rotation
    console.log("Performing 3D drag rotation...");
    await dragRotate3D(page, cx - 100, cy, 260, -30, 35);
    await page.waitForTimeout(1000);
    await dragRotate3D(page, cx + 150, cy - 20, -220, 40, 35);
    await page.waitForTimeout(1500);
  }

  // Switch Major tabs
  console.log("Switching 3D Tab to TJKT (Cisco Datacenter)...");
  const tjktTab = page.locator("button:has-text('TJKT')").first();
  if (await tjktTab.count() > 0) {
    await tjktTab.click();
    await page.waitForTimeout(3000);
  }

  console.log("Switching 3D Tab to AKL (Bitcoin & Vault)...");
  const aklTab = page.locator("button:has-text('AKL')").first();
  if (await aklTab.count() > 0) {
    await aklTab.click();
    await page.waitForTimeout(3000);
  }

  console.log("Switching 3D Tab to AXIOO (Laptop Tech Rig)...");
  const axiooTab = page.locator("button:has-text('AXIOO')").first();
  if (await axiooTab.count() > 0) {
    await axiooTab.click();
    await page.waitForTimeout(3000);
  }

  console.log("Returning to PPLG (PlayStation DualSense)...");
  const pplgTab = page.locator("button:has-text('PPLG')").first();
  if (await pplgTab.count() > 0) {
    await pplgTab.click();
    await page.waitForTimeout(2500);
  }

  // Scroll down smoothly to Statistics
  console.log("Scrolling to Statistics...");
  await smoothScroll(page, 480, 1200);
  await page.waitForTimeout(1500);

  // Scroll down to Sambutan Kepala Sekolah
  console.log("Scrolling to Sambutan Kepala Sekolah (Pak Dede Sumarna)...");
  await smoothScroll(page, 850, 1500);
  await page.waitForTimeout(3500);

  // Scroll down to Program Keahlian section
  console.log("Scrolling to 4 Program Keahlian...");
  await smoothScroll(page, 1550, 1800);
  await page.waitForTimeout(2500);

  // Scroll down to Keunggulan / Berita
  console.log("Scrolling to Berita & Kegiatan...");
  await smoothScroll(page, 2300, 1800);
  await page.waitForTimeout(2500);

  // Scroll to Footer
  console.log("Scrolling to Footer...");
  await smoothScroll(page, 3200, 1500);
  await page.waitForTimeout(2000);

  // Scroll back to top
  console.log("Scrolling back to Top...");
  await smoothScroll(page, 0, 1200);
  await page.waitForTimeout(1500);

  // Navigate to Profil page
  console.log("Navigating to /profil...");
  await page.goto("http://localhost:3000/profil", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await smoothScroll(page, 500, 1200);
  await page.waitForTimeout(2000);
  await smoothScroll(page, 1000, 1200);
  await page.waitForTimeout(2000);

  // Navigate to Jurusan PPLG page
  console.log("Navigating to /jurusan/pplg...");
  await page.goto("http://localhost:3000/jurusan/pplg", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await smoothScroll(page, 600, 1500);
  await page.waitForTimeout(2000);
  await smoothScroll(page, 1200, 1500);
  await page.waitForTimeout(2000);

  console.log("Finishing recording session...");
  await page.close();
  await context.close();
  await browser.close();

  console.log("Recording saved to recordings directory.");

  // Find the recorded webm file
  const files = fs.readdirSync(RECORDING_DIR).filter((f) => f.endsWith(".webm"));
  if (files.length > 0) {
    const latestWebm = path.join(RECORDING_DIR, files[files.length - 1]);
    const finalMp4 = path.resolve("DEMO_WEBSITE_SMK_BPPI.mp4");

    console.log(`Converting ${latestWebm} to ${finalMp4} using ffmpeg...`);
    try {
      execSync(
        `ffmpeg -y -i "${latestWebm}" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p "${finalMp4}"`,
        { stdio: "inherit" }
      );
      console.log(`SUCCESS! High quality MP4 video created at: ${finalMp4}`);
    } catch (e) {
      console.error("FFmpeg conversion error:", e);
    }
  }
}

run().catch((err) => {
  console.error("Recording error:", err);
  process.exit(1);
});
