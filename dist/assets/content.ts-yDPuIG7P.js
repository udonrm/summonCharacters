var o=Object.defineProperty;var r=(i,t,n)=>t in i?o(i,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[t]=n;var e=(i,t,n)=>(r(i,typeof t!="symbol"?t+"":t,n),n);class a{constructor(t){e(this,"current");e(this,"destination");e(this,"applyPositionToStyle");e(this,"toString",()=>`現在地は (${this.current.top}, ${this.current.left})です `);e(this,"startAction",async()=>{for(;;)this.selectDestination(),this.moveToDestination(),await this.sleep(1e4)});e(this,"moveToDestination",()=>{this.destination&&(this.current.top=this.destination.top,this.current.left=this.destination.left,this.applyPositionToStyle(this.current))});e(this,"selectDestination",()=>{this.destination={top:this.getRandomInt(),left:this.getRandomInt()}});e(this,"getRandomInt",()=>Math.random()*100);e(this,"sleep",t=>new Promise(n=>setTimeout(n,t)));this.applyPositionToStyle=t,this.current={top:0,left:0}}}const s=document.createElement("div"),c=chrome.runtime.getURL("images/dog.png");s.innerHTML=`<img src="${c}"/>`;document.body.appendChild(s);s.setAttribute("id","summonCharacters");const l=i=>{s.style.setProperty("--top",i.top+"%"),s.style.setProperty("--left",i.left+"%")},h=new a(l);h.startAction();
