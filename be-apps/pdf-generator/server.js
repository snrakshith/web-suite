const express = require("express");
const app = express();
const PDFDocument = require("pdfkit");
const axios = require("axios");

// Middleware to parse JSON bodies
app.use(express.json());

// Route to generate PDF
app.get("/generate-pdf/:username", async (req, res) => {
  try {
    const user = {
      username: "@" + req.params.username,
      name: req.params.username,
      email: "snrakshith.97@gmail.com",
      age: 25,
    };

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const filename = `${user.name}_profile.pdf`;
    const customerInformationTop = 185;

    // Set headers
    res.setHeader("Content-disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-type", "application/pdf");

    // Pipe the PDF into the response
    doc.pipe(res);

    // Fetch the image from the URL
    const imageUrl =
      "https://fastly.picsum.photos/id/244/200/200.jpg?hmac=Q1gdvE6ZPZUX3nXkxvmzuc12eKVZ9XVEmSH3nCJ2OOo";
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");

    // Add the image to the PDF
    doc.image(imageBuffer, 50, 50, { width: 100 });

    // Add some content to the PDF
    doc.moveDown(6); // Move down to avoid overlap with the image
    doc.fontSize(25).text("User Profile", {
      align: "center",
    });

    doc.moveDown();
    doc.fontSize(14).text(`Name: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Age: ${user.age}`);

    // Optional section
    doc
      .fillColor("#444444")
      .fontSize(10)
      .text("Name:", 50, customerInformationTop)
      .font("Helvetica-Bold")
      .text(user.name, 130, customerInformationTop)
      .font("Helvetica")
      .text("Gender:", 50, customerInformationTop + 15);

    // Finalize the PDF and end the stream
    doc.end();
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Error generating PDF");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
