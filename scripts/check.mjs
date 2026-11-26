import {readdirSync} from 'node:fs';import {join} from 'node:path';import {spawnSync} from 'node:child_process';
const root=new URL('..',import.meta.url).pathname;
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>['.git','data','assets','node_modules'].includes(e.name)?[]:e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]);}
for(const file of files(root).filter(f=>/\.(?:m?js)$/.test(f))){const result=spawnSync(process.execPath,['--check',file],{stdio:'inherit'});if(result.status!==0)process.exit(result.status||1);}
for(const file of readdirSync(join(root,'tests')).filter(f=>f.endsWith('.test.mjs')).sort()){const result=spawnSync(process.execPath,[join(root,'tests',file)],{stdio:'inherit',cwd:root});if(result.status!==0)process.exit(result.status||1);}
