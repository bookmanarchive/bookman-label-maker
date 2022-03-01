const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();

const LABELS = {
    BOOKMAN1: require('./draw.bookman1.label'),
    MBS: require('./draw.mbs.label'),
};

app.use(express.json({ limit: '20kb' }));

const respond400BadParams = res => res.status(400).json({ error: true, message: 'Bad params given!' });

app.post('/draw/bookman1', async (req, res) => {
    const { buttonText, titleText, cartridgeCode } = req.body;

    if (!buttonText || !titleText || !cartridgeCode) {
        return respond400BadParams(res);
    }

    res.contentType('image/svg+xml');
    res.send(await LABELS.BOOKMAN1.draw({
        buttonText: buttonText.split(','),
        titleText: titleText.split(','),
        cartridgeCode,
    }));
});

app.post('/draw/mbs', async (req, res) => {
    const { titleText, cartridgeCode } = req.body;

    if (!titleText || !cartridgeCode) {
        return respond400BadParams(res);
    }

    res.contentType('image/svg+xml');
    res.send(await LABELS.MBS.draw({
        titleText: titleText.split(','),
        cartridgeCode,
    }));
});

app.use(express.static('public'));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`));
