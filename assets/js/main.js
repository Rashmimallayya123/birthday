function confettiBurst(duration = 1600, count = 220){
  const canvas = document.getElementById('confetti-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); addEventListener('resize', resize);

  const colors = ['#9bd1ff','#5cc8ff','#3a7bd5','#ffdfe0','#dfffe8','#ffffff'];
  const pieces = Array.from({length:count}, ()=> ({
    x: Math.random()*canvas.width,
    y: -20 - Math.random()*canvas.height*0.3,
    w: 6 + Math.random()*6,
    h: 8 + Math.random()*10,
    r: Math.random()*Math.PI,
    s: 3 + Math.random()*6,
    g: 0.15 + Math.random()*0.25,
    c: colors[Math.floor(Math.random()*colors.length)]
  }));
  const start = performance.now();
  function tick(t){
    const e = t - start;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(const p of pieces){
      p.y += p.s; p.x += Math.sin((p.y + p.h)*0.03) * .9; p.r += .1; p.s += p.g*0.02;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore();
    }
    if(e < duration){ requestAnimationFrame(tick); } else {
      canvas.style.transition='opacity .6s ease'; canvas.style.opacity='0';
      setTimeout(()=>{canvas.remove()},800);
    }
  }
  requestAnimationFrame(tick);
}

function setupAudio(){
  const audio = document.getElementById('bgm');
  const btn = document.getElementById('audioToggle');
  if(!audio || !btn) return;
  btn.addEventListener('click', async ()=>{
    if(audio.paused){ try{ await audio.play(); btn.textContent='⏸ Pause music'; }catch(e){ alert('Click allowed now to enable audio.'); } }
    else { audio.pause(); btn.textContent='▶ Play music'; }
  });
}
document.addEventListener('DOMContentLoaded', setupAudio);