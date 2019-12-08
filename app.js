const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Url Encoded and BodyParser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const errorReturn = res => res.json({ error: 'Invalid Date' });

app.get('/api/timestamp/:date_string?', (req, res) => {
	const { date_string } = req.params;
	let utc, unix;

	if (!date_string)
		res.json({
			utc: new Date().toUTCString(),
			unix: new Date().getTime()
		});

	if (/\d{5,}/.test(date_string)) {
		unix = +date_string;
		utc = new Date(unix).toUTCString();
	} else if (isNaN(date_string)) {
		utc = new Date(date_string).toUTCString();
		unix = new Date(date_string).getTime();
	}

	if (unix && utc) {
		res.json({ unix, utc });
	} else {
		errorReturn(res);
	}
});

app.get('*', (req, res) =>
	res.json({ success: true, description: 'This is Another Page.', uri: `${req.baseUrl}/timestamp/:date_string` })
);
app.listen(port, _ => console.log(`Server's running @ ${port}`));
