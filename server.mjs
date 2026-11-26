import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
const root=resolve(import.meta.dirname); const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.jpg':'image/jpeg','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{try{const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!path.startsWith(root+'/')&&path!==root)throw Error();const file=path===root||path===root+'/'?root+'/index.html':path;if(!['.html','.css','.js','.jpg','.svg'].includes(extname(file))||file.includes('/tests/'))throw Error();res.writeHead(200,{'Content-Type':types[extname(file)],'X-Content-Type-Options':'nosniff'});res.end(await readFile(file));}catch{res.writeHead(404);res.end('Not found');}}).listen(process.env.PORT||3000,'0.0.0.0',()=>console.log('FASHION: http://localhost:3000'));
