const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Url Encoded and BodyParser
app.use(express.json());
app.use(express.urlencoded());

const dateFormat = { day: 'numeric', year: 'numeric', month: 'long' };
const errorReturn = res => res.json({ error: 'Invalid Date' });

app.get('/api/timestamp/:date_string?', (req, res) => {
	const { date_string } = req.params;
	let utc, unix;

	if (!date_string) errorReturn(res);

	if (isNaN(date_string)) {
		console.log('isNan');
		utc = new Date(date_string).toGMTString('en-us');
		unix = new Date(date_string).getTime();
	} else {
		console.log('else');
		utc = new Date(date_string * 1000).toGMTString('en-us');
		unix = +date_string;
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
