const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const user_id = "Ridhima_Chauhan_31052004";
const email = "22BCS15442@cuchd.in";
const roll_number = "22bcs15442";

// POST /bfhl - Process Data
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

        // Get highest alphabet (case insensitive sorting)
        const highest_alphabet = alphabets.length > 0 
            ? [alphabets.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).pop()] 
            : [];

        res.status(200).json({
            is_success: true,
            user_id,
            email,
            roll_number,
            numbers,
            alphabets,
            highest_alphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

// GET /bfhl - Returns operation code
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🔗 Local: http://localhost:${PORT}`);
    console.log(`📌 Try GET request: http://localhost:${PORT}/bfhl`);
    console.log(`📌 Try POST request using Postman or curl`);
});
