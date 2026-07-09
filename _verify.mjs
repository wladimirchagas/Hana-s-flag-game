import { chromium } from 'playwright';
const base='http://localhost:5173';
// code, meta-name, expected phrase (specific to that council)
const cases=[
 ['MT-03','Birgu','Great Siege'],
 ['MT-20','Senglea','de la Sengle'],
 ['MT-47','Safi','Sine Macula'],
 ['MT-64','Żabbar','Hompesch'],
 ['MT-43','Qormi','Pinto'],
 ['MT-32','Mosta','Rotunda'],
];
const b=await chromium.launch(); const p=await b.newPage();
for(const [code,name,exp] of cases){let d='';try{
 await p.goto(`${base}/learn?country=MT&subdivisions=1&sub=${code}`,{waitUntil:'domcontentloaded'});
 await p.locator('.learn-fs__subdiv-name',{hasText:name}).first().waitFor({timeout:40000});
 const panel=p.locator('.learn-fs__subdiv-info',{has:p.locator('.learn-fs__subdiv-name',{hasText:name})}).first();
 const t=panel.locator('.flag-meaning__toggle');await t.waitFor({timeout:8000});await t.click();await p.waitForTimeout(300);
 d=await panel.locator('.flag-meaning__desc').first().innerText();
}catch(e){d='(ERR '+e.message.slice(0,45)+')';}
console.log(`${d.includes(exp)?'PASS':'FAIL'} ${code}(${name}) exp "${exp}" — ${d.slice(0,55)}`);}
await b.close();
