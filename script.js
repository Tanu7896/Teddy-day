const pages=document.querySelectorAll('.page');
const music=document.getElementById('bgMusic');

function goTo(id){
  pages.forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(id==="game") setupGame();
}

/* START */
function startLove(){
  music.currentTime=0;
  music.play().catch(()=>{});
  goTo('intro');
}

function start(){
  goTo('hug');
  setTimeout(()=>goTo('days'),3000);
}

function restart(){
  music.currentTime=0;
  goTo('startLove');
}

/* DAYS */
const startDate=new Date("2023-11-12");
const days=Math.floor((new Date()-startDate)/(1000*60*60*24));
document.querySelector('.days-text').innerText=
`Deepika, we’ve been us for ${days} days 🧸🤍`;

/* MEMORIES – CLEAN TRANSITION */
const memories=[
{img:"memories/memory1.jpeg",q:"Even silence becomes beautiful when it carries your presence."},
{img:"memories/memory2.jpeg",q:"The world softens wherever your eyes rest."},
{img:"memories/memory3.jpeg",q:"You stayed — and that choice became my forever."},
{img:"memories/memory4.jpeg",q:"In a world that changes daily, you remained constant."},
{img:"memories/memory5.jpeg",q:"Some souls don’t meet by chance; they recognize each other."},
{img:"memories/memory6.jpeg",q:"Loving you feels like finally being understood."}
];

let m=0;
const imgEl=document.getElementById("memoryImg");
const qEl=document.getElementById("memoryQuote");

imgEl.src=memories[0].img;
qEl.innerText=memories[0].q;

function showMemory(){
  imgEl.classList.add("hidden");
  qEl.classList.add("hidden");

  setTimeout(()=>{
    imgEl.src=memories[m].img;
    qEl.innerText=memories[m].q;
    imgEl.classList.remove("hidden");
    qEl.classList.remove("hidden");
  },600);
}

function nextMemory(){
  if(m<memories.length-1){
    m++;
    showMemory();
  }else{
    goTo('game');
  }
}

/* SWIPE */
let startX=0;
imgEl.addEventListener("touchstart",e=>startX=e.touches[0].clientX);
imgEl.addEventListener("touchend",e=>{
  if(startX-e.changedTouches[0].clientX>40) nextMemory();
});

/* GAME */
const cardsBox=document.querySelector(".cards");
const gameMsg=document.getElementById("gameMsg");

function setupGame(){
  cardsBox.innerHTML="";
  gameMsg.innerText="";
  ["🧸","❤️","❤️","❤️","❤️","❤️"]
    .sort(()=>Math.random()-0.5)
    .forEach(sym=>{
      const c=document.createElement("div");
      c.className="card";
      c.innerHTML=`
        <div class="card-inner">
          <div class="card-face">❓</div>
          <div class="card-face card-back">${sym}</div>
        </div>`;
      c.onclick=()=>{
        if(c.classList.contains("flipped"))return;
        c.classList.add("flipped");
        if(sym==="🧸"){
          confetti();
          gameMsg.innerText=
`Your loyalty is the quiet promise my heart trusts.
You are not a moment — you are a direction.
My heart learned patience the day it chose you.`;
          setTimeout(()=>goTo('final'),3500);
        }
      };
      cardsBox.appendChild(c);
    });
}

/* CONFETTI */
function confetti(){
  for(let i=0;i<40;i++){
    const c=document.createElement("span");
    c.className="confetti";
    c.innerText=Math.random()>.5?"💖":"✨";
    c.style.left=Math.random()*100+"vw";
    c.style.animationDuration=2+Math.random()*2+"s";
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),4000);
  }
}
