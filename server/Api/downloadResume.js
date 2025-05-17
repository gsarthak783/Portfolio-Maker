const express = require("express");
const puppeteer = require("puppeteer");
const resume = express.Router();

resume.get("/download-resume/:email", async (req, res) => {
  const { email } = req.params;
  console.log("Email:", email);
  const resumeUrl = `https://user-portfolio-alpha.vercel.app//${email}/resume-display`; // Adjust to your frontend route

  try {
    const browser = await puppeteer.launch({
      headless: "new", // use true or "new" depending on Puppeteer version
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(resumeUrl, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).send("Failed to generate PDF");
  }
});

module.exports = resume;
