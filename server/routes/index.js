const router = require('express').Router();
const fs = require('fs');
const path = require('path');
import React from 'react';
import { renderToString  } from 'react-dom/server';
import { StaticRouter } from 'react-router';

router.get('/*' , (req,res)=> {
  console.log('url is =>',req.path)
   const context = {};
   fs.readFile(path.resolve(__dirname, '..' , '..' , 'client' , 'build' , 'index.html'), 'utf8' , (err , data)=>{
     if(err) {
       return res.send( '<h1>This error due be BETA Version</h1>')
      }
      return res.send(data.replace('<div id="root"></div>' , `<div id="root">${
        renderToString(
          <StaticRouter location={ req.url } context = { context } >
        </StaticRouter>
      ) 
    }</div>`))
  }) 
} );
  module.exports = router


