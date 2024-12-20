import http from 'http';

import app from '../Backend/app.js';

const port = process.env.PORT || 3000;

const server = http.createServer(app);


server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})
