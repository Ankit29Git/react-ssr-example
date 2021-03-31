//  this project setup was done using this link https://www.newline.co/@satansdeer/server-side-rendering-with-react--e753063e
//  Some more material to study about SSR :
//  https://blog.logrocket.com/why-you-should-render-react-on-the-server-side-a50507163b79/

import express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const app = express();
const port = 3030;

app.use('^/$', (req, res, next)=>{
    
    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
        if(err)
            return res.status(500).send(`Error occurred : ${err}`);
        
        return res.send(
                    data.replace(
                        '<div id="root"></div>', 
                        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
                    )
                );
    });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));    //Miss this line and no javascript handlers will be loaded.

app.listen(port, ()=>{
    // console.log(path.resolve(__dirname));
    console.log(`Server started at port: ${port}`);
});