const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ ok: true });
});

function isIntegerString(s) {
  return typeof s === 'string' && /^-?\d+$/.test(s);
}
function isAlphaString(s) {
  return typeof s === 'string' && /^[A-Za-z]+$/.test(s);
}
function altCapsFromReversedLetters(alphaTokens) {
  const joined = alphaTokens.join('');
  const reversed = joined.split('').reverse().join('');
  let out = '';
  for (let i = 0; i < reversed.length; i++) {
    const ch = reversed[i];
    out += i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
  }
  return out;
}

app.post('/bfhl', (req, res) => {
  try {
    const body = req.body || {};
    const arr = Array.isArray(body.data) ? body.data : null;

    if (!arr) {
      return res.status(200).json({
        is_success: false,
        user_id: "aman_gupta_26122002",
        email: "Lochanaman444@gmail.com",
        roll_number: "22BCE1747",
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: ""
      });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    const alphaTokensRaw = [];

    for (const item of arr) {
      const s = String(item);
      if (isIntegerString(s)) {
        const n = parseInt(s, 10);
        if (Math.abs(n % 2) === 1) {
          odd_numbers.push(s);
        } else {
          even_numbers.push(s);
        }
        sum += n;
      } else if (isAlphaString(s)) {
        alphabets.push(s.toUpperCase());
        alphaTokensRaw.push(s);
      } else {
        special_characters.push(s);
      }
    }

    const concat_string = altCapsFromReversedLetters(alphaTokensRaw);

    const response = {
      is_success: true,
      user_id: "aman_gupta_26122002",
      email: "Lochanaman444@gmail.com",
      roll_number: "22BCE1747",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    };

    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      is_success: false,
      user_id: "aman_gupta_26122002",
      email: "Lochanaman444@gmail.com",
      roll_number: "22BCE1747",
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: ""
    });
  }
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
