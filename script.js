document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".copy").forEach(btn=>btn.addEventListener("click",async()=>{
    const code=btn.closest(".code")?.querySelector("code");if(!code)return;const old=btn.textContent;
    try{await navigator.clipboard.writeText(code.innerText);btn.textContent="Copied!";}
    catch(e){const range=document.createRange();range.selectNodeContents(code);const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);btn.textContent="Select & copy";}
    setTimeout(()=>btn.textContent=old,1400);
  }));
  const search=document.getElementById("search");search?.addEventListener("keydown",e=>{
    if(e.key!=="Enter")return;const q=search.value.trim().toLowerCase();document.querySelectorAll(".search-hit").forEach(x=>x.classList.remove("search-hit"));if(!q)return;
    const section=[...document.querySelectorAll(".content-section")].find(s=>s.innerText.toLowerCase().includes(q));
    if(section){section.classList.add("search-hit");section.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(()=>section.classList.remove("search-hit"),2500);}
    else{search.setCustomValidity("No matching section. Try Docker, Flask, Git, port, volume or Compose.");search.reportValidity();setTimeout(()=>search.setCustomValidity(""),2500);}
  });
  const practice=["Install and verify Docker","Run and inspect a container","Build an image","Practise volumes and networks","Commit and push with Git","Run Flask locally","Build Flask image","Run Flask with Compose"];
  const list=document.getElementById("practiceList"),bar=document.getElementById("progress"),txt=document.getElementById("progressText");let state={};try{state=JSON.parse(localStorage.getItem("meviDockerFlaskChecklist")||"{}")}catch(e){}
  practice.forEach((item,i)=>{const label=document.createElement("label"),input=document.createElement("input");input.type="checkbox";input.checked=!!state[i];input.addEventListener("change",()=>{state[i]=input.checked;try{localStorage.setItem("meviDockerFlaskChecklist",JSON.stringify(state))}catch(e){}update()});label.append(input,document.createTextNode(item));list.append(label)});
  function update(){const n=practice.filter((_,i)=>state[i]).length;bar.style.width=Math.round(n/practice.length*100)+"%";txt.textContent=Math.round(n/practice.length*100)+"%"}update();
  const pcs=[...document.querySelectorAll("#projectChecks input")],pb=document.getElementById("projectProgress"),pt=document.getElementById("projectProgressText");
  pcs.forEach((input,i)=>{try{input.checked=localStorage.getItem("meviProjectCheck"+i)==="true"}catch(e){}input.addEventListener("change",()=>{try{localStorage.setItem("meviProjectCheck"+i,String(input.checked))}catch(e){}projectUpdate()})});
  function projectUpdate(){const n=pcs.filter(x=>x.checked).length;pb.style.width=(n/pcs.length*100)+"%";pt.textContent=`${n} of ${pcs.length} complete`}projectUpdate();
  document.getElementById("quiz")?.addEventListener("submit",e=>{e.preventDefault();let score=0;const qs=[...document.querySelectorAll(".question")];qs.forEach(q=>{const selected=q.querySelector("input:checked"),ok=selected&&selected.value===q.dataset.answer;if(ok)score++;q.style.borderColor=ok?"#15956b":"#e2e8f0"});document.getElementById("quizResult").textContent=`Score: ${score}/${qs.length}. ${score===qs.length?"Excellent work!":"Review the relevant sections and try again."}`});
  const top=document.getElementById("topBtn");window.addEventListener("scroll",()=>top.classList.toggle("show",window.scrollY>600));top.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
  const links=[...document.querySelectorAll("#sideNav a")],sections=links.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);if("IntersectionObserver"in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(a=>a.classList.toggle("active",a.hash==="#"+entry.target.id))}),{rootMargin:"-20% 0px -65% 0px"});sections.forEach(s=>observer.observe(s))}
});