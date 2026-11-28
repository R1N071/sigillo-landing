(()=>{function ks(n,t,e){var i;if(n instanceof Element)return[n];if(typeof n=="string"){let s=document;t&&(s=t.current);let r=(i=e?.[n])!==null&&i!==void 0?i:s.querySelectorAll(n);return r?Array.from(r):[]}return Array.from(n)}var Qe=n=>n;var Ni=Qe,Bn=Qe;var $n=(n,t,e)=>{let i=t-n;return i===0?1:(e-n)/i};function Vs(n){let t;return()=>(t===void 0&&(t=n()),t)}var Yo=Vs(()=>window.ScrollTimeline!==void 0);var qo=class{constructor(t){this.stop=()=>this.runAll("stop"),this.animations=t.filter(Boolean)}get finished(){return Promise.all(this.animations.map(t=>"finished"in t?t.finished:t))}getAll(t){return this.animations[0][t]}setAll(t,e){for(let i=0;i<this.animations.length;i++)this.animations[i][t]=e}attachTimeline(t,e){let i=this.animations.map(s=>{if(Yo()&&s.attachTimeline)return s.attachTimeline(t);if(typeof e=="function")return e(s)});return()=>{i.forEach((s,r)=>{s&&s(),this.animations[r].stop()})}}get time(){return this.getAll("time")}set time(t){this.setAll("time",t)}get speed(){return this.getAll("speed")}set speed(t){this.setAll("speed",t)}get startTime(){return this.getAll("startTime")}get duration(){let t=0;for(let e=0;e<this.animations.length;e++)t=Math.max(t,this.animations[e].duration);return t}runAll(t){this.animations.forEach(e=>e[t]())}flatten(){this.runAll("flatten")}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}};var Hs=class extends qo{then(t,e){return Promise.all(this.animations).then(t).catch(e)}};var je=n=>n*1e3,pn=n=>n/1e3;function Gs(n){let t=0,e=50,i=n.next(t);for(;!i.done&&t<2e4;)t+=e,i=n.next(t);return t>=2e4?1/0:t}var $o=(n,t,e=10)=>{let i="",s=Math.max(Math.round(t/e),2);for(let r=0;r<s;r++)i+=n($n(0,s-1,r))+", ";return`linear(${i.substring(0,i.length-2)})`};var an=(n,t,e)=>e>t?t:e<n?n:e;function Ws(n,t){return t?n*(1e3/t):0}var _g=5;function Zo(n,t,e){let i=Math.max(t-_g,0);return Ws(e-n(i),t-i)}var Ae={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};var xc=.001;function Pf({duration:n=Ae.duration,bounce:t=Ae.bounce,velocity:e=Ae.velocity,mass:i=Ae.mass}){let s,r;Ni(n<=je(Ae.maxDuration),"Spring duration must be 10 seconds or less");let o=1-t;o=an(Ae.minDamping,Ae.maxDamping,o),n=an(Ae.minDuration,Ae.maxDuration,pn(n)),o<1?(s=c=>{let h=c*o,u=h*n,f=h-e,p=Ko(c,o),g=Math.exp(-u);return xc-f/p*g},r=c=>{let u=c*o*n,f=u*e+e,p=Math.pow(o,2)*Math.pow(c,2)*n,g=Math.exp(-u),y=Ko(Math.pow(c,2),o);return(-s(c)+xc>0?-1:1)*((f-p)*g)/y}):(s=c=>{let h=Math.exp(-c*n),u=(c-e)*n+1;return-xc+h*u},r=c=>{let h=Math.exp(-c*n),u=(e-c)*(n*n);return h*u});let a=5/n,l=Sg(s,r,a);if(n=je(n),isNaN(l))return{stiffness:Ae.stiffness,damping:Ae.damping,duration:n};{let c=Math.pow(l,2)*i;return{stiffness:c,damping:o*2*Math.sqrt(i*c),duration:n}}}var vg=12;function Sg(n,t,e){let i=e;for(let s=1;s<vg;s++)i=i-n(i)/t(i);return i}function Ko(n,t){return n*Math.sqrt(1-t*t)}var Mg=["duration","bounce"],bg=["stiffness","damping","mass"];function If(n,t){return t.some(e=>n[e]!==void 0)}function Tg(n){let t={velocity:Ae.velocity,stiffness:Ae.stiffness,damping:Ae.damping,mass:Ae.mass,isResolvedFromDuration:!1,...n};if(!If(n,bg)&&If(n,Mg))if(n.visualDuration){let e=n.visualDuration,i=2*Math.PI/(e*1.2),s=i*i,r=2*an(.05,1,1-(n.bounce||0))*Math.sqrt(s);t={...t,mass:Ae.mass,stiffness:s,damping:r}}else{let e=Pf(n);t={...t,...e,mass:Ae.mass},t.isResolvedFromDuration=!0}return t}function Xs(n=Ae.visualDuration,t=Ae.bounce){let e=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:t}:n,{restSpeed:i,restDelta:s}=e,r=e.keyframes[0],o=e.keyframes[e.keyframes.length-1],a={done:!1,value:r},{stiffness:l,damping:c,mass:h,duration:u,velocity:f,isResolvedFromDuration:p}=Tg({...e,velocity:-pn(e.velocity||0)}),g=f||0,y=c/(2*Math.sqrt(l*h)),m=o-r,d=pn(Math.sqrt(l/h)),w=Math.abs(m)<5;i||(i=w?Ae.restSpeed.granular:Ae.restSpeed.default),s||(s=w?Ae.restDelta.granular:Ae.restDelta.default);let T;if(y<1){let L=Ko(d,y);T=I=>{let R=Math.exp(-y*d*I);return o-R*((g+y*d*m)/L*Math.sin(L*I)+m*Math.cos(L*I))}}else if(y===1)T=L=>o-Math.exp(-d*L)*(m+(g+d*m)*L);else{let L=d*Math.sqrt(y*y-1);T=I=>{let R=Math.exp(-y*d*I),D=Math.min(L*I,300);return o-R*((g+y*d*m)*Math.sinh(D)+L*m*Math.cosh(D))/L}}let v={calculatedDuration:p&&u||null,next:L=>{let I=T(L);if(p)a.done=L>=u;else{let R=0;y<1&&(R=L===0?je(g):Zo(T,L,I));let D=Math.abs(R)<=i,M=Math.abs(o-I)<=s;a.done=D&&M}return a.value=a.done?o:I,a},toString:()=>{let L=Math.min(Gs(v),2e4),I=$o(R=>v.next(L*R).value,L,30);return L+"ms "+I}};return v}function Df(n,t=100,e){let i=e({...n,keyframes:[0,t]}),s=Math.min(Gs(i),2e4);return{type:"keyframes",ease:r=>i.next(s*r).value/t,duration:pn(s)}}function Fi(n){return typeof n=="function"}var Lf=(n,t,e)=>{let i=t-n;return((e-n)%i+i)%i+n};var Jo=n=>Array.isArray(n)&&typeof n[0]!="number";function Qo(n,t){return Jo(n)?n[Lf(0,n.length,t)]:n}var Zn=(n,t,e)=>n+(t-n)*e;function jo(n,t){let e=n[n.length-1];for(let i=1;i<=t;i++){let s=$n(0,t,i);n.push(Zn(e,1,s))}}function Ys(n){let t=[0];return jo(t,n.length-1),t}var Re=n=>!!(n&&n.getVelocity);function jr(n){return typeof n=="object"&&!Array.isArray(n)}function ta(n,t,e,i){return typeof n=="string"&&jr(t)?ks(n,e,i):n instanceof NodeList?Array.from(n):Array.isArray(n)?n:[n]}function Uf(n,t,e){return n*(t+1)}function _c(n,t,e,i){var s;return typeof t=="number"?t:t.startsWith("-")||t.startsWith("+")?Math.max(0,n+parseFloat(t)):t==="<"?e:(s=i.get(t))!==null&&s!==void 0?s:n}function Nf(n,t){n.indexOf(t)===-1&&n.push(t)}function ea(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function wg(n,t,e){for(let i=0;i<n.length;i++){let s=n[i];s.at>t&&s.at<e&&(ea(n,s),i--)}}function Ff(n,t,e,i,s,r){wg(n,s,r);for(let o=0;o<t.length;o++)n.push({value:t[o],at:Zn(s,r,i[o]),easing:Qo(e,o)})}function Of(n,t){for(let e=0;e<n.length;e++)n[e]=n[e]/(t+1)}function Bf(n,t){return n.at===t.at?n.value===null?1:t.value===null?-1:0:n.at-t.at}var Eg="easeInOut",Ag=20;function Vf(n,{defaultTransition:t={},...e}={},i,s){let r=t.duration||.3,o=new Map,a=new Map,l={},c=new Map,h=0,u=0,f=0;for(let p=0;p<n.length;p++){let g=n[p];if(typeof g=="string"){c.set(g,u);continue}else if(!Array.isArray(g)){c.set(g.name,_c(u,g.at,h,c));continue}let[y,m,d={}]=g;d.at!==void 0&&(u=_c(u,d.at,h,c));let w=0,T=(v,L,I,R=0,D=0)=>{let M=Cg(v),{delay:S=0,times:U=Ys(M),type:Y="keyframes",repeat:$,repeatType:Z,repeatDelay:rt=0,...B}=L,{ease:et=t.ease||"easeOut",duration:N}=L,F=typeof S=="function"?S(R,D):S,J=M.length,K=Fi(Y)?Y:s?.[Y];if(J<=2&&K){let H=100;if(J===2&&Ig(M)){let pt=M[1]-M[0];H=Math.abs(pt)}let Q={...B};N!==void 0&&(Q.duration=je(N));let j=Df(Q,H,K);et=j.ease,N=j.duration}N??(N=r);let at=u+F;U.length===1&&U[0]===0&&(U[1]=1);let vt=U.length-M.length;if(vt>0&&jo(U,vt),M.length===1&&M.unshift(null),$){Bn($<Ag,"Repeat count too high, must be less than 20"),N=Uf(N,$);let H=[...M],Q=[...U];et=Array.isArray(et)?[...et]:[et];let j=[...et];for(let pt=0;pt<$;pt++){M.push(...H);for(let _t=0;_t<H.length;_t++)U.push(Q[_t]+(pt+1)),et.push(_t===0?"linear":Qo(j,_t-1))}Of(U,$)}let P=at+N;Ff(I,M,et,U,at,P),w=Math.max(F+N,w),f=Math.max(P,f)};if(Re(y)){let v=zf(y,a);T(m,d,kf("default",v))}else{let v=ta(y,m,i,l),L=v.length;for(let I=0;I<L;I++){m=m,d=d;let R=v[I],D=zf(R,a);for(let M in m)T(m[M],Rg(d,M),kf(M,D),I,L)}}h=u,u+=w}return a.forEach((p,g)=>{for(let y in p){let m=p[y];m.sort(Bf);let d=[],w=[],T=[];for(let L=0;L<m.length;L++){let{at:I,value:R,easing:D}=m[L];d.push(R),w.push($n(0,f,I)),T.push(D||"easeOut")}w[0]!==0&&(w.unshift(0),d.unshift(d[0]),T.unshift(Eg)),w[w.length-1]!==1&&(w.push(1),d.push(null)),o.has(g)||o.set(g,{keyframes:{},transition:{}});let v=o.get(g);v.keyframes[y]=d,v.transition[y]={...t,duration:f,ease:T,times:w,...e}}}),o}function zf(n,t){return!t.has(n)&&t.set(n,{}),t.get(n)}function kf(n,t){return t[n]||(t[n]=[]),t[n]}function Cg(n){return Array.isArray(n)?n:[n]}function Rg(n,t){return n&&n[t]?{...n,...n[t]}:{...n}}var Pg=n=>typeof n=="number",Ig=n=>n.every(Pg);var fi=new WeakMap;function na(n,t){return n?n[t]||n.default||n:void 0}var Kn=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Tn=new Set(Kn);var ia=new Set(["width","height","top","left","right","bottom",...Kn]);var Hf=n=>Array.isArray(n);var Gf=n=>Hf(n)?n[n.length-1]||0:n;var qs={skipAnimations:!1,useManualTiming:!1};function Wf(n){let t=new Set,e=new Set,i=!1,s=!1,r=new WeakSet,o={delta:0,timestamp:0,isProcessing:!1};function a(c){r.has(c)&&(l.schedule(c),n()),c(o)}let l={schedule:(c,h=!1,u=!1)=>{let p=u&&i?t:e;return h&&r.add(c),p.has(c)||p.add(c),c},cancel:c=>{e.delete(c),r.delete(c)},process:c=>{if(o=c,i){s=!0;return}i=!0,[t,e]=[e,t],t.forEach(a),t.clear(),i=!1,s&&(s=!1,l.process(c))}};return l}var sa=["read","resolveKeyframes","update","preRender","render","postRender"],Dg=40;function Xf(n,t){let e=!1,i=!0,s={delta:0,timestamp:0,isProcessing:!1},r=()=>e=!0,o=sa.reduce((d,w)=>(d[w]=Wf(r),d),{}),{read:a,resolveKeyframes:l,update:c,preRender:h,render:u,postRender:f}=o,p=()=>{let d=qs.useManualTiming?s.timestamp:performance.now();e=!1,s.delta=i?1e3/60:Math.max(Math.min(d-s.timestamp,Dg),1),s.timestamp=d,s.isProcessing=!0,a.process(s),l.process(s),c.process(s),h.process(s),u.process(s),f.process(s),s.isProcessing=!1,e&&t&&(i=!1,n(p))},g=()=>{e=!0,i=!0,s.isProcessing||n(p)};return{schedule:sa.reduce((d,w)=>{let T=o[w];return d[w]=(v,L=!1,I=!1)=>(e||g(),T.schedule(v,L,I)),d},{}),cancel:d=>{for(let w=0;w<sa.length;w++)o[sa[w]].cancel(d)},state:s,steps:o}}var{schedule:Ne,cancel:di,state:Oi,steps:mE}=Xf(typeof requestAnimationFrame<"u"?requestAnimationFrame:Qe,!0);var ra;function Lg(){ra=void 0}var wn={now:()=>(ra===void 0&&wn.set(Oi.isProcessing||qs.useManualTiming?Oi.timestamp:performance.now()),ra),set:n=>{ra=n,queueMicrotask(Lg)}};var $s=class{constructor(){this.subscriptions=[]}add(t){return Nf(this.subscriptions,t),()=>ea(this.subscriptions,t)}notify(t,e,i){let s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](t,e,i);else for(let r=0;r<s;r++){let o=this.subscriptions[r];o&&o(t,e,i)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}};var Yf=30,Ug=n=>!isNaN(parseFloat(n)),qf={current:void 0},vc=class{constructor(t,e={}){this.version="12.0.0",this.canTrackVelocity=null,this.events={},this.updateAndNotify=(i,s=!0)=>{let r=wn.now();this.updatedAt!==r&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(i),this.current!==this.prev&&this.events.change&&this.events.change.notify(this.current),s&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.hasAnimated=!1,this.setCurrent(t),this.owner=e.owner}setCurrent(t){this.current=t,this.updatedAt=wn.now(),this.canTrackVelocity===null&&t!==void 0&&(this.canTrackVelocity=Ug(this.current))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return this.on("change",t)}on(t,e){this.events[t]||(this.events[t]=new $s);let i=this.events[t].add(e);return t==="change"?()=>{i(),Ne.read(()=>{this.events.change.getSize()||this.stop()})}:i}clearListeners(){for(let t in this.events)this.events[t].clear()}attach(t,e){this.passiveEffect=t,this.stopPassiveEffect=e}set(t,e=!0){!e||!this.passiveEffect?this.updateAndNotify(t,e):this.passiveEffect(t,this.updateAndNotify)}setWithVelocity(t,e,i){this.set(e),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-i}jump(t,e=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,e&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return qf.current&&qf.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){let t=wn.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||t-this.updatedAt>Yf)return 0;let e=Math.min(this.updatedAt-this.prevUpdatedAt,Yf);return Ws(parseFloat(this.current)-parseFloat(this.prevFrameValue),e)}start(t){return this.stop(),new Promise(e=>{this.hasAnimated=!0,this.animation=t(e),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}};function pi(n,t){return new vc(n,t)}function $f(n){let t=[{},{}];return n?.values.forEach((e,i)=>{t[0][i]=e.get(),t[1][i]=e.getVelocity()}),t}function oa(n,t,e,i){if(typeof t=="function"){let[s,r]=$f(i);t=t(e!==void 0?e:n.custom,s,r)}if(typeof t=="string"&&(t=n.variants&&n.variants[t]),typeof t=="function"){let[s,r]=$f(i);t=t(e!==void 0?e:n.custom,s,r)}return t}function Zf(n,t,e){let i=n.getProps();return oa(i,t,e!==void 0?e:i.custom,n)}function Ng(n,t,e){n.hasValue(t)?n.getValue(t).set(e):n.addValue(t,pi(e))}function Kf(n,t){let e=Zf(n,t),{transitionEnd:i={},transition:s={},...r}=e||{};r={...r,...i};for(let o in r){let a=Gf(r[o]);Ng(n,o,a)}}function Jf(n){return!!(Re(n)&&n.add)}function Qf(n,t){let e=n.getValue("willChange");if(Jf(e))return e.add(t)}var Zs=n=>n.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase();var Fg="framerAppearId",jf="data-"+Zs(Fg);function td(n){return n.props[jf]}var aa={current:!1};function Sc(n,t){n.timeline=t,n.onfinish=null}var to=n=>Array.isArray(n)&&typeof n[0]=="number";var ed={linearEasing:void 0};function nd(n,t){let e=Vs(n);return()=>{var i;return(i=ed[t])!==null&&i!==void 0?i:e()}}var Ks=nd(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing");function bc(n){return!!(typeof n=="function"&&Ks()||!n||typeof n=="string"&&(n in Mc||Ks())||to(n)||Array.isArray(n)&&n.every(bc))}var eo=([n,t,e,i])=>`cubic-bezier(${n}, ${t}, ${e}, ${i})`,Mc={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:eo([0,.65,.55,1]),circOut:eo([.55,0,1,.45]),backIn:eo([.31,.01,.66,-.59]),backOut:eo([.33,1.53,.69,.99])};function Tc(n,t){if(n)return typeof n=="function"&&Ks()?$o(n,t):to(n)?eo(n):Array.isArray(n)?n.map(e=>Tc(e,t)||Mc.easeOut):Mc[n]}var id=(n,t,e)=>(((1-3*e+3*t)*n+(3*e-6*t))*n+3*t)*n,Og=1e-7,Bg=12;function zg(n,t,e,i,s){let r,o,a=0;do o=t+(e-t)/2,r=id(o,i,s)-n,r>0?e=o:t=o;while(Math.abs(r)>Og&&++a<Bg);return o}function Bi(n,t,e,i){if(n===t&&e===i)return Qe;let s=r=>zg(r,0,1,n,e);return r=>r===0||r===1?r:id(s(r),t,i)}var la=n=>t=>t<=.5?n(2*t)/2:(2-n(2*(1-t)))/2;var ca=n=>t=>1-n(1-t);var wc=Bi(.33,1.53,.69,.99),no=ca(wc),ha=la(no);var ua=n=>(n*=2)<1?.5*no(n):.5*(2-Math.pow(2,-10*(n-1)));var fa=n=>1-Math.sin(Math.acos(n)),sd=ca(fa),da=la(fa);var pa=n=>/^0[^.\s]+$/u.test(n);function rd(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||pa(n):!0}var Jn={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},mi={...Jn,transform:n=>an(0,1,n)},io={...Jn,default:1};var zi=n=>Math.round(n*1e5)/1e5;var Js=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function od(n){return n==null}var ad=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;var Qs=(n,t)=>e=>!!(typeof e=="string"&&ad.test(e)&&e.startsWith(n)||t&&!od(e)&&Object.prototype.hasOwnProperty.call(e,t)),ma=(n,t,e)=>i=>{if(typeof i!="string")return i;let[s,r,o,a]=i.match(Js);return{[n]:parseFloat(s),[t]:parseFloat(r),[e]:parseFloat(o),alpha:a!==void 0?parseFloat(a):1}};var kg=n=>an(0,255,n),Ec={...Jn,transform:n=>Math.round(kg(n))},Qn={test:Qs("rgb","red"),parse:ma("red","green","blue"),transform:({red:n,green:t,blue:e,alpha:i=1})=>"rgba("+Ec.transform(n)+", "+Ec.transform(t)+", "+Ec.transform(e)+", "+zi(mi.transform(i))+")"};function Vg(n){let t="",e="",i="",s="";return n.length>5?(t=n.substring(1,3),e=n.substring(3,5),i=n.substring(5,7),s=n.substring(7,9)):(t=n.substring(1,2),e=n.substring(2,3),i=n.substring(3,4),s=n.substring(4,5),t+=t,e+=e,i+=i,s+=s),{red:parseInt(t,16),green:parseInt(e,16),blue:parseInt(i,16),alpha:s?parseInt(s,16)/255:1}}var so={test:Qs("#"),parse:Vg,transform:Qn.transform};var ro=n=>({test:t=>typeof t=="string"&&t.endsWith(n)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${n}`}),jn=ro("deg"),ki=ro("%"),Wt=ro("px"),ld=ro("vh"),cd=ro("vw"),Ac={...ki,parse:n=>ki.parse(n)/100,transform:n=>ki.transform(n*100)};var Vi={test:Qs("hsl","hue"),parse:ma("hue","saturation","lightness"),transform:({hue:n,saturation:t,lightness:e,alpha:i=1})=>"hsla("+Math.round(n)+", "+ki.transform(zi(t))+", "+ki.transform(zi(e))+", "+zi(mi.transform(i))+")"};var He={test:n=>Qn.test(n)||so.test(n)||Vi.test(n),parse:n=>Qn.test(n)?Qn.parse(n):Vi.test(n)?Vi.parse(n):so.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?Qn.transform(n):Vi.transform(n)};var hd=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function Hg(n){var t,e;return isNaN(n)&&typeof n=="string"&&(((t=n.match(Js))===null||t===void 0?void 0:t.length)||0)+(((e=n.match(hd))===null||e===void 0?void 0:e.length)||0)>0}var fd="number",dd="color",Gg="var",Wg="var(",ud="${}",Xg=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function ds(n){let t=n.toString(),e=[],i={color:[],number:[],var:[]},s=[],r=0,a=t.replace(Xg,l=>(He.test(l)?(i.color.push(r),s.push(dd),e.push(He.parse(l))):l.startsWith(Wg)?(i.var.push(r),s.push(Gg),e.push(l)):(i.number.push(r),s.push(fd),e.push(parseFloat(l))),++r,ud)).split(ud);return{values:e,split:a,indexes:i,types:s}}function pd(n){return ds(n).values}function md(n){let{split:t,types:e}=ds(n),i=t.length;return s=>{let r="";for(let o=0;o<i;o++)if(r+=t[o],s[o]!==void 0){let a=e[o];a===fd?r+=zi(s[o]):a===dd?r+=He.transform(s[o]):r+=s[o]}return r}}var Yg=n=>typeof n=="number"?0:n;function qg(n){let t=pd(n);return md(n)(t.map(Yg))}var En={test:Hg,parse:pd,createTransformer:md,getAnimatableNone:qg};var $g=new Set(["brightness","contrast","saturate","opacity"]);function Zg(n){let[t,e]=n.slice(0,-1).split("(");if(t==="drop-shadow")return n;let[i]=e.match(Js)||[];if(!i)return n;let s=e.replace(i,""),r=$g.has(t)?1:0;return i!==e&&(r*=100),t+"("+r+s+")"}var Kg=/\b([a-z-]*)\(.*?\)/gu,oo={...En,getAnimatableNone:n=>{let t=n.match(Kg);return t?t.map(Zg).join(" "):n}};var gd={borderWidth:Wt,borderTopWidth:Wt,borderRightWidth:Wt,borderBottomWidth:Wt,borderLeftWidth:Wt,borderRadius:Wt,radius:Wt,borderTopLeftRadius:Wt,borderTopRightRadius:Wt,borderBottomRightRadius:Wt,borderBottomLeftRadius:Wt,width:Wt,maxWidth:Wt,height:Wt,maxHeight:Wt,top:Wt,right:Wt,bottom:Wt,left:Wt,padding:Wt,paddingTop:Wt,paddingRight:Wt,paddingBottom:Wt,paddingLeft:Wt,margin:Wt,marginTop:Wt,marginRight:Wt,marginBottom:Wt,marginLeft:Wt,backgroundPositionX:Wt,backgroundPositionY:Wt};var xd={rotate:jn,rotateX:jn,rotateY:jn,rotateZ:jn,scale:io,scaleX:io,scaleY:io,scaleZ:io,skew:jn,skewX:jn,skewY:jn,distance:Wt,translateX:Wt,translateY:Wt,translateZ:Wt,x:Wt,y:Wt,z:Wt,perspective:Wt,transformPerspective:Wt,opacity:mi,originX:Ac,originY:Ac,originZ:Wt};var Cc={...Jn,transform:Math.round};var js={...gd,...xd,zIndex:Cc,size:Wt,fillOpacity:mi,strokeOpacity:mi,numOctaves:Cc};var Jg={...js,color:He,backgroundColor:He,outlineColor:He,fill:He,stroke:He,borderColor:He,borderTopColor:He,borderRightColor:He,borderBottomColor:He,borderLeftColor:He,filter:oo,WebkitFilter:oo},tr=n=>Jg[n];function ga(n,t){let e=tr(n);return e!==oo&&(e=En),e.getAnimatableNone?e.getAnimatableNone(t):void 0}var Qg=new Set(["auto","none","0"]);function yd(n,t,e){let i=0,s;for(;i<n.length&&!s;){let r=n[i];typeof r=="string"&&!Qg.has(r)&&ds(r).values.length&&(s=n[i]),i++}if(s&&e)for(let r of t)n[r]=ga(e,s)}var Rc=n=>n===Jn||n===Wt,_d=(n,t)=>parseFloat(n.split(", ")[t]),vd=(n,t)=>(e,{transform:i})=>{if(i==="none"||!i)return 0;let s=i.match(/^matrix3d\((.+)\)$/u);if(s)return _d(s[1],t);{let r=i.match(/^matrix\((.+)\)$/u);return r?_d(r[1],n):0}},jg=new Set(["x","y","z"]),tx=Kn.filter(n=>!jg.has(n));function Sd(n){let t=[];return tx.forEach(e=>{let i=n.getValue(e);i!==void 0&&(t.push([e,i.get()]),i.set(e.startsWith("scale")?1:0))}),t}var ps={width:({x:n},{paddingLeft:t="0",paddingRight:e="0"})=>n.max-n.min-parseFloat(t)-parseFloat(e),height:({y:n},{paddingTop:t="0",paddingBottom:e="0"})=>n.max-n.min-parseFloat(t)-parseFloat(e),top:(n,{top:t})=>parseFloat(t),left:(n,{left:t})=>parseFloat(t),bottom:({y:n},{top:t})=>parseFloat(t)+(n.max-n.min),right:({x:n},{left:t})=>parseFloat(t)+(n.max-n.min),x:vd(4,13),y:vd(5,14)};ps.translateX=ps.x;ps.translateY=ps.y;var ms=new Set,Pc=!1,Ic=!1;function Md(){if(Ic){let n=Array.from(ms).filter(i=>i.needsMeasurement),t=new Set(n.map(i=>i.element)),e=new Map;t.forEach(i=>{let s=Sd(i);s.length&&(e.set(i,s),i.render())}),n.forEach(i=>i.measureInitialState()),t.forEach(i=>{i.render();let s=e.get(i);s&&s.forEach(([r,o])=>{var a;(a=i.getValue(r))===null||a===void 0||a.set(o)})}),n.forEach(i=>i.measureEndState()),n.forEach(i=>{i.suspendedScrollY!==void 0&&window.scrollTo(0,i.suspendedScrollY)})}Ic=!1,Pc=!1,ms.forEach(n=>n.complete()),ms.clear()}function bd(){ms.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(Ic=!0)})}function Td(){bd(),Md()}var Hi=class{constructor(t,e,i,s,r,o=!1){this.isComplete=!1,this.isAsync=!1,this.needsMeasurement=!1,this.isScheduled=!1,this.unresolvedKeyframes=[...t],this.onComplete=e,this.name=i,this.motionValue=s,this.element=r,this.isAsync=o}scheduleResolve(){this.isScheduled=!0,this.isAsync?(ms.add(this),Pc||(Pc=!0,Ne.read(bd),Ne.resolveKeyframes(Md))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:t,name:e,element:i,motionValue:s}=this;for(let r=0;r<t.length;r++)if(t[r]===null)if(r===0){let o=s?.get(),a=t[t.length-1];if(o!==void 0)t[0]=o;else if(i&&e){let l=i.readValue(e,a);l!=null&&(t[0]=l)}t[0]===void 0&&(t[0]=a),s&&o===void 0&&s.set(t[0])}else t[r]=t[r-1]}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(){this.isComplete=!0,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe),ms.delete(this)}cancel(){this.isComplete||(this.isScheduled=!1,ms.delete(this))}resume(){this.isComplete||this.scheduleResolve()}};var xa=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);var wd=n=>t=>typeof t=="string"&&t.startsWith(n),ya=wd("--"),ex=wd("var(--"),er=n=>ex(n)?nx.test(n.split("/*")[0].trim()):!1,nx=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;var ix=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function sx(n){let t=ix.exec(n);if(!t)return[,];let[,e,i,s]=t;return[`--${e??i}`,s]}var rx=4;function Dc(n,t,e=1){Bn(e<=rx,`Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`);let[i,s]=sx(n);if(!i)return;let r=window.getComputedStyle(t).getPropertyValue(i);if(r){let o=r.trim();return xa(o)?parseFloat(o):o}return er(s)?Dc(s,t,e+1):s}var _a=n=>t=>t.test(n);var Ed={test:n=>n==="auto",parse:n=>n};var Lc=[Jn,Wt,ki,jn,cd,ld,Ed],Uc=n=>Lc.find(_a(n));var nr=class extends Hi{constructor(t,e,i,s,r){super(t,e,i,s,r,!0)}readKeyframes(){let{unresolvedKeyframes:t,element:e,name:i}=this;if(!e||!e.current)return;super.readKeyframes();for(let l=0;l<t.length;l++){let c=t[l];if(typeof c=="string"&&(c=c.trim(),er(c))){let h=Dc(c,e.current);h!==void 0&&(t[l]=h),l===t.length-1&&(this.finalKeyframe=c)}}if(this.resolveNoneKeyframes(),!ia.has(i)||t.length!==2)return;let[s,r]=t,o=Uc(s),a=Uc(r);if(o!==a)if(Rc(o)&&Rc(a))for(let l=0;l<t.length;l++){let c=t[l];typeof c=="string"&&(t[l]=parseFloat(c))}else this.needsMeasurement=!0}resolveNoneKeyframes(){let{unresolvedKeyframes:t,name:e}=this,i=[];for(let s=0;s<t.length;s++)rd(t[s])&&i.push(s);i.length&&yd(t,i,e)}measureInitialState(){let{element:t,unresolvedKeyframes:e,name:i}=this;if(!t||!t.current)return;i==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=ps[i](t.measureViewportBox(),window.getComputedStyle(t.current)),e[0]=this.measuredOrigin;let s=e[e.length-1];s!==void 0&&t.getValue(i,s).jump(s,!1)}measureEndState(){var t;let{element:e,name:i,unresolvedKeyframes:s}=this;if(!e||!e.current)return;let r=e.getValue(i);r&&r.jump(this.measuredOrigin,!1);let o=s.length-1,a=s[o];s[o]=ps[i](e.measureViewportBox(),window.getComputedStyle(e.current)),a!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=a),!((t=this.removedTransforms)===null||t===void 0)&&t.length&&this.removedTransforms.forEach(([l,c])=>{e.getValue(l).set(c)}),this.resolveNoneKeyframes()}};var Nc=(n,t)=>t==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(En.test(n)||n==="0")&&!n.startsWith("url("));function ox(n){let t=n[0];if(n.length===1)return!0;for(let e=0;e<n.length;e++)if(n[e]!==t)return!0}function Ad(n,t,e,i){let s=n[0];if(s===null)return!1;if(t==="display"||t==="visibility")return!0;let r=n[n.length-1],o=Nc(s,t),a=Nc(r,t);return Ni(o===a,`You are trying to animate ${t} from "${s}" to "${r}". ${s} is not an animatable value - to enable this animation set ${s} to a value animatable to ${r} via the \`style\` property.`),!o||!a?!1:ox(n)||(e==="spring"||Fi(e))&&i}var ax=n=>n!==null;function Gi(n,{repeat:t,repeatType:e="loop"},i){let s=n.filter(ax),r=t&&e!=="loop"&&t%2===1?0:s.length-1;return!r||i===void 0?s[r]:i}var lx=40,ir=class{constructor({autoplay:t=!0,delay:e=0,type:i="keyframes",repeat:s=0,repeatDelay:r=0,repeatType:o="loop",...a}){this.isStopped=!1,this.hasAttemptedResolve=!1,this.createdAt=wn.now(),this.options={autoplay:t,delay:e,type:i,repeat:s,repeatDelay:r,repeatType:o,...a},this.updateFinishedPromise()}calcStartTime(){return this.resolvedAt?this.resolvedAt-this.createdAt>lx?this.resolvedAt:this.createdAt:this.createdAt}get resolved(){return!this._resolved&&!this.hasAttemptedResolve&&Td(),this._resolved}onKeyframesResolved(t,e){this.resolvedAt=wn.now(),this.hasAttemptedResolve=!0;let{name:i,type:s,velocity:r,delay:o,onComplete:a,onUpdate:l,isGenerator:c}=this.options;if(!c&&!Ad(t,i,s,r))if(aa.current||!o){l&&l(Gi(t,this.options,e)),a&&a(),this.resolveFinishedPromise();return}else this.options.duration=0;let h=this.initPlayback(t,e);h!==!1&&(this._resolved={keyframes:t,finalKeyframe:e,...h},this.onPostResolved())}onPostResolved(){}then(t,e){return this.currentFinishedPromise.then(t,e)}flatten(){this.options.type="keyframes",this.options.ease="linear"}updateFinishedPromise(){this.currentFinishedPromise=new Promise(t=>{this.resolveFinishedPromise=t})}};function Fc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*(2/3-e)*6:n}function Cd({hue:n,saturation:t,lightness:e,alpha:i}){n/=360,t/=100,e/=100;let s=0,r=0,o=0;if(!t)s=r=o=e;else{let a=e<.5?e*(1+t):e+t-e*t,l=2*e-a;s=Fc(l,a,n+1/3),r=Fc(l,a,n),o=Fc(l,a,n-1/3)}return{red:Math.round(s*255),green:Math.round(r*255),blue:Math.round(o*255),alpha:i}}function sr(n,t){return e=>e>0?t:n}var Oc=(n,t,e)=>{let i=n*n,s=e*(t*t-i)+i;return s<0?0:Math.sqrt(s)},cx=[so,Qn,Vi],hx=n=>cx.find(t=>t.test(n));function Rd(n){let t=hx(n);if(Ni(!!t,`'${n}' is not an animatable color. Use the equivalent color code instead.`),!t)return!1;let e=t.parse(n);return t===Vi&&(e=Cd(e)),e}var Bc=(n,t)=>{let e=Rd(n),i=Rd(t);if(!e||!i)return sr(n,t);let s={...e};return r=>(s.red=Oc(e.red,i.red,r),s.green=Oc(e.green,i.green,r),s.blue=Oc(e.blue,i.blue,r),s.alpha=Zn(e.alpha,i.alpha,r),Qn.transform(s))};var ux=(n,t)=>e=>t(n(e)),rr=(...n)=>n.reduce(ux);var va=new Set(["none","hidden"]);function Pd(n,t){return va.has(n)?e=>e<=0?n:t:e=>e>=1?t:n}function fx(n,t){return e=>Zn(n,t,e)}function Sa(n){return typeof n=="number"?fx:typeof n=="string"?er(n)?sr:He.test(n)?Bc:mx:Array.isArray(n)?Id:typeof n=="object"?He.test(n)?Bc:dx:sr}function Id(n,t){let e=[...n],i=e.length,s=n.map((r,o)=>Sa(r)(r,t[o]));return r=>{for(let o=0;o<i;o++)e[o]=s[o](r);return e}}function dx(n,t){let e={...n,...t},i={};for(let s in e)n[s]!==void 0&&t[s]!==void 0&&(i[s]=Sa(n[s])(n[s],t[s]));return s=>{for(let r in i)e[r]=i[r](s);return e}}function px(n,t){var e;let i=[],s={color:0,var:0,number:0};for(let r=0;r<t.values.length;r++){let o=t.types[r],a=n.indexes[o][s[o]],l=(e=n.values[a])!==null&&e!==void 0?e:0;i[r]=l,s[o]++}return i}var mx=(n,t)=>{let e=En.createTransformer(t),i=ds(n),s=ds(t);return i.indexes.var.length===s.indexes.var.length&&i.indexes.color.length===s.indexes.color.length&&i.indexes.number.length>=s.indexes.number.length?va.has(n)&&!s.values.length||va.has(t)&&!i.values.length?Pd(n,t):rr(Id(px(i,s),s.values),e):(Ni(!0,`Complex values '${n}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`),sr(n,t))};function Ma(n,t,e){return typeof n=="number"&&typeof t=="number"&&typeof e=="number"?Zn(n,t,e):Sa(n)(n,t)}function zc({keyframes:n,velocity:t=0,power:e=.8,timeConstant:i=325,bounceDamping:s=10,bounceStiffness:r=500,modifyTarget:o,min:a,max:l,restDelta:c=.5,restSpeed:h}){let u=n[0],f={done:!1,value:u},p=D=>a!==void 0&&D<a||l!==void 0&&D>l,g=D=>a===void 0?l:l===void 0||Math.abs(a-D)<Math.abs(l-D)?a:l,y=e*t,m=u+y,d=o===void 0?m:o(m);d!==m&&(y=d-u);let w=D=>-y*Math.exp(-D/i),T=D=>d+w(D),v=D=>{let M=w(D),S=T(D);f.done=Math.abs(M)<=c,f.value=f.done?d:S},L,I,R=D=>{p(f.value)&&(L=D,I=Xs({keyframes:[f.value,g(f.value)],velocity:Zo(T,D,f.value),damping:s,stiffness:r,restDelta:c,restSpeed:h}))};return R(0),{calculatedDuration:null,next:D=>{let M=!1;return!I&&L===void 0&&(M=!0,v(D),R(D)),L!==void 0&&D>=L?I.next(D-L):(!M&&v(D),f)}}}var Dd=Bi(.42,0,1,1),Ld=Bi(0,0,.58,1),ba=Bi(.42,0,.58,1);var Ud={linear:Qe,easeIn:Dd,easeInOut:ba,easeOut:Ld,circIn:fa,circInOut:da,circOut:sd,backIn:no,backInOut:ha,backOut:wc,anticipate:ua},kc=n=>{if(to(n)){Bn(n.length===4,"Cubic bezier arrays must contain four numerical values.");let[t,e,i,s]=n;return Bi(t,e,i,s)}else if(typeof n=="string")return Bn(Ud[n]!==void 0,`Invalid easing type '${n}'`),Ud[n];return n};function gx(n,t,e){let i=[],s=e||Ma,r=n.length-1;for(let o=0;o<r;o++){let a=s(n[o],n[o+1]);if(t){let l=Array.isArray(t)?t[o]||Qe:t;a=rr(l,a)}i.push(a)}return i}function Ta(n,t,{clamp:e=!0,ease:i,mixer:s}={}){let r=n.length;if(Bn(r===t.length,"Both input and output ranges must be the same length"),r===1)return()=>t[0];if(r===2&&t[0]===t[1])return()=>t[1];let o=n[0]===n[1];n[0]>n[r-1]&&(n=[...n].reverse(),t=[...t].reverse());let a=gx(t,i,s),l=a.length,c=h=>{if(o&&h<n[0])return t[0];let u=0;if(l>1)for(;u<n.length-2&&!(h<n[u+1]);u++);let f=$n(n[u],n[u+1],h);return a[u](f)};return e?h=>c(an(n[0],n[r-1],h)):c}function Nd(n,t){return n.map(e=>e*t)}function xx(n,t){return n.map(()=>t||ba).splice(0,n.length-1)}function ao({duration:n=300,keyframes:t,times:e,ease:i="easeInOut"}){let s=Jo(i)?i.map(kc):kc(i),r={done:!1,value:t[0]},o=Nd(e&&e.length===t.length?e:Ys(t),n),a=Ta(o,t,{ease:Array.isArray(s)?s:xx(t,s)});return{calculatedDuration:n,next:l=>(r.value=a(l),r.done=l>=n,r)}}var Fd=n=>{let t=({timestamp:e})=>n(e);return{start:()=>Ne.update(t,!0),stop:()=>di(t),now:()=>Oi.isProcessing?Oi.timestamp:wn.now()}};var yx={decay:zc,inertia:zc,tween:ao,keyframes:ao,spring:Xs},_x=n=>n/100,gs=class extends ir{constructor(t){super(t),this.holdTime=null,this.cancelTime=null,this.currentTime=0,this.playbackSpeed=1,this.pendingPlayState="running",this.startTime=null,this.state="idle",this.stop=()=>{if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.teardown();let{onStop:l}=this.options;l&&l()};let{name:e,motionValue:i,element:s,keyframes:r}=this.options,o=s?.KeyframeResolver||Hi,a=(l,c)=>this.onKeyframesResolved(l,c);this.resolver=new o(r,a,e,i,s),this.resolver.scheduleResolve()}flatten(){super.flatten(),this._resolved&&Object.assign(this._resolved,this.initPlayback(this._resolved.keyframes))}initPlayback(t){let{type:e="keyframes",repeat:i=0,repeatDelay:s=0,repeatType:r,velocity:o=0}=this.options,a=Fi(e)?e:yx[e]||ao,l,c;a!==ao&&typeof t[0]!="number"&&(l=rr(_x,Ma(t[0],t[1])),t=[0,100]);let h=a({...this.options,keyframes:t});r==="mirror"&&(c=a({...this.options,keyframes:[...t].reverse(),velocity:-o})),h.calculatedDuration===null&&(h.calculatedDuration=Gs(h));let{calculatedDuration:u}=h,f=u+s,p=f*(i+1)-s;return{generator:h,mirroredGenerator:c,mapPercentToKeyframes:l,calculatedDuration:u,resolvedDuration:f,totalDuration:p}}onPostResolved(){let{autoplay:t=!0}=this.options;this.play(),this.pendingPlayState==="paused"||!t?this.pause():this.state=this.pendingPlayState}tick(t,e=!1){let{resolved:i}=this;if(!i){let{keyframes:D}=this.options;return{done:!0,value:D[D.length-1]}}let{finalKeyframe:s,generator:r,mirroredGenerator:o,mapPercentToKeyframes:a,keyframes:l,calculatedDuration:c,totalDuration:h,resolvedDuration:u}=i;if(this.startTime===null)return r.next(0);let{delay:f,repeat:p,repeatType:g,repeatDelay:y,onUpdate:m}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-h/this.speed,this.startTime)),e?this.currentTime=t:this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=Math.round(t-this.startTime)*this.speed;let d=this.currentTime-f*(this.speed>=0?1:-1),w=this.speed>=0?d<0:d>h;this.currentTime=Math.max(d,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=h);let T=this.currentTime,v=r;if(p){let D=Math.min(this.currentTime,h)/u,M=Math.floor(D),S=D%1;!S&&D>=1&&(S=1),S===1&&M--,M=Math.min(M,p+1),M%2&&(g==="reverse"?(S=1-S,y&&(S-=y/u)):g==="mirror"&&(v=o)),T=an(0,1,S)*u}let L=w?{done:!1,value:l[0]}:v.next(T);a&&(L.value=a(L.value));let{done:I}=L;!w&&c!==null&&(I=this.speed>=0?this.currentTime>=h:this.currentTime<=0);let R=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&I);return R&&s!==void 0&&(L.value=Gi(l,this.options,s)),m&&m(L.value),R&&this.finish(),L}get duration(){let{resolved:t}=this;return t?pn(t.calculatedDuration):0}get time(){return pn(this.currentTime)}set time(t){t=je(t),this.currentTime=t,this.holdTime!==null||this.speed===0?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.speed)}get speed(){return this.playbackSpeed}set speed(t){let e=this.playbackSpeed!==t;this.playbackSpeed=t,e&&(this.time=pn(this.currentTime))}play(){if(this.resolver.isScheduled||this.resolver.resume(),!this._resolved){this.pendingPlayState="running";return}if(this.isStopped)return;let{driver:t=Fd,onPlay:e,startTime:i}=this.options;this.driver||(this.driver=t(r=>this.tick(r))),e&&e();let s=this.driver.now();this.holdTime!==null?this.startTime=s-this.holdTime:this.startTime?this.state==="finished"&&(this.startTime=s):this.startTime=i??this.calcStartTime(),this.state==="finished"&&this.updateFinishedPromise(),this.cancelTime=this.startTime,this.holdTime=null,this.state="running",this.driver.start()}pause(){var t;if(!this._resolved){this.pendingPlayState="paused";return}this.state="paused",this.holdTime=(t=this.currentTime)!==null&&t!==void 0?t:0}complete(){this.state!=="running"&&this.play(),this.pendingPlayState=this.state="finished",this.holdTime=null}finish(){this.teardown(),this.state="finished";let{onComplete:t}=this.options;t&&t()}cancel(){this.cancelTime!==null&&this.tick(this.cancelTime),this.teardown(),this.updateFinishedPromise()}teardown(){this.state="idle",this.stopDriver(),this.resolveFinishedPromise(),this.updateFinishedPromise(),this.startTime=this.cancelTime=null,this.resolver.cancel()}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}};var Od=new Set(["opacity","clipPath","filter","transform"]);function Bd(n,t,e,{delay:i=0,duration:s=300,repeat:r=0,repeatType:o="loop",ease:a="easeInOut",times:l}={}){let c={[t]:e};l&&(c.offset=l);let h=Tc(a,s);return Array.isArray(h)&&(c.easing=h),n.animate(c,{delay:i,duration:s,easing:Array.isArray(h)?"linear":h,fill:"both",iterations:r+1,direction:o==="reverse"?"alternate":"normal"})}var zd=Vs(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));var wa=10,vx=2e4;function Sx(n){return Fi(n.type)||n.type==="spring"||!bc(n.ease)}function Mx(n,t){let e=new gs({...t,keyframes:n,repeat:0,delay:0,isGenerator:!0}),i={done:!1,value:n[0]},s=[],r=0;for(;!i.done&&r<vx;)i=e.sample(r),s.push(i.value),r+=wa;return{times:void 0,keyframes:s,duration:r-wa,ease:"linear"}}var kd={anticipate:ua,backInOut:ha,circInOut:da};function bx(n){return n in kd}var lo=class extends ir{constructor(t){super(t);let{name:e,motionValue:i,element:s,keyframes:r}=this.options;this.resolver=new nr(r,(o,a)=>this.onKeyframesResolved(o,a),e,i,s),this.resolver.scheduleResolve()}initPlayback(t,e){let{duration:i=300,times:s,ease:r,type:o,motionValue:a,name:l,startTime:c}=this.options;if(!a.owner||!a.owner.current)return!1;if(typeof r=="string"&&Ks()&&bx(r)&&(r=kd[r]),Sx(this.options)){let{onComplete:u,onUpdate:f,motionValue:p,element:g,...y}=this.options,m=Mx(t,y);t=m.keyframes,t.length===1&&(t[1]=t[0]),i=m.duration,s=m.times,r=m.ease,o="keyframes"}let h=Bd(a.owner.current,l,t,{...this.options,duration:i,times:s,ease:r});return h.startTime=c??this.calcStartTime(),this.pendingTimeline?(Sc(h,this.pendingTimeline),this.pendingTimeline=void 0):h.onfinish=()=>{let{onComplete:u}=this.options;a.set(Gi(t,this.options,e)),u&&u(),this.cancel(),this.resolveFinishedPromise()},{animation:h,duration:i,times:s,type:o,ease:r,keyframes:t}}get duration(){let{resolved:t}=this;if(!t)return 0;let{duration:e}=t;return pn(e)}get time(){let{resolved:t}=this;if(!t)return 0;let{animation:e}=t;return pn(e.currentTime||0)}set time(t){let{resolved:e}=this;if(!e)return;let{animation:i}=e;i.currentTime=je(t)}get speed(){let{resolved:t}=this;if(!t)return 1;let{animation:e}=t;return e.playbackRate}set speed(t){let{resolved:e}=this;if(!e)return;let{animation:i}=e;i.playbackRate=t}get state(){let{resolved:t}=this;if(!t)return"idle";let{animation:e}=t;return e.playState}get startTime(){let{resolved:t}=this;if(!t)return null;let{animation:e}=t;return e.startTime}attachTimeline(t){if(!this._resolved)this.pendingTimeline=t;else{let{resolved:e}=this;if(!e)return Qe;let{animation:i}=e;Sc(i,t)}return Qe}play(){if(this.isStopped)return;let{resolved:t}=this;if(!t)return;let{animation:e}=t;e.playState==="finished"&&this.updateFinishedPromise(),e.play()}pause(){let{resolved:t}=this;if(!t)return;let{animation:e}=t;e.pause()}stop(){if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.resolveFinishedPromise(),this.updateFinishedPromise();let{resolved:t}=this;if(!t)return;let{animation:e,keyframes:i,duration:s,type:r,ease:o,times:a}=t;if(e.playState==="idle"||e.playState==="finished")return;if(this.time){let{motionValue:c,onUpdate:h,onComplete:u,element:f,...p}=this.options,g=new gs({...p,keyframes:i,duration:s,type:r,ease:o,times:a,isGenerator:!0}),y=je(this.time);c.setWithVelocity(g.sample(y-wa).value,g.sample(y).value,wa)}let{onStop:l}=this.options;l&&l(),this.cancel()}complete(){let{resolved:t}=this;t&&t.animation.finish()}cancel(){let{resolved:t}=this;t&&t.animation.cancel()}static supports(t){let{motionValue:e,name:i,repeatDelay:s,repeatType:r,damping:o,type:a}=t;if(!e||!e.owner||!(e.owner.current instanceof HTMLElement))return!1;let{onUpdate:l,transformTemplate:c}=e.owner.getProps();return zd()&&i&&Od.has(i)&&!l&&!c&&!s&&r!=="mirror"&&o!==0&&a!=="inertia"}};var Tx={type:"spring",stiffness:500,damping:25,restSpeed:10},wx=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),Ex={type:"keyframes",duration:.8},Ax={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},Vd=(n,{keyframes:t})=>t.length>2?Ex:Tn.has(n)?n.startsWith("scale")?wx(t[1]):Tx:Ax;function Hd({when:n,delay:t,delayChildren:e,staggerChildren:i,staggerDirection:s,repeat:r,repeatType:o,repeatDelay:a,from:l,elapsed:c,...h}){return!!Object.keys(h).length}var Ea=(n,t,e,i={},s,r)=>o=>{let a=na(i,n)||{},l=a.delay||i.delay||0,{elapsed:c=0}=i;c=c-je(l);let h={keyframes:Array.isArray(e)?e:[null,e],ease:"easeOut",velocity:t.getVelocity(),...a,delay:-c,onUpdate:f=>{t.set(f),a.onUpdate&&a.onUpdate(f)},onComplete:()=>{o(),a.onComplete&&a.onComplete()},name:n,motionValue:t,element:r?void 0:s};Hd(a)||(h={...h,...Vd(n,h)}),h.duration&&(h.duration=je(h.duration)),h.repeatDelay&&(h.repeatDelay=je(h.repeatDelay)),h.from!==void 0&&(h.keyframes[0]=h.from);let u=!1;if((h.type===!1||h.duration===0&&!h.repeatDelay)&&(h.duration=0,h.delay===0&&(u=!0)),(aa.current||qs.skipAnimations)&&(u=!0,h.duration=0,h.delay=0),u&&!r&&t.get()!==void 0){let f=Gi(h.keyframes,a);if(f!==void 0)return Ne.update(()=>{h.onUpdate(f),h.onComplete()}),new Hs([])}return!r&&lo.supports(h)?new lo(h):new gs(h)};function Cx({protectedKeys:n,needsAnimating:t},e){let i=n.hasOwnProperty(e)&&t[e]!==!0;return t[e]=!1,i}function Gd(n,t,{delay:e=0,transitionOverride:i,type:s}={}){var r;let{transition:o=n.getDefaultTransition(),transitionEnd:a,...l}=t;i&&(o=i);let c=[],h=s&&n.animationState&&n.animationState.getState()[s];for(let u in l){let f=n.getValue(u,(r=n.latestValues[u])!==null&&r!==void 0?r:null),p=l[u];if(p===void 0||h&&Cx(h,u))continue;let g={delay:e,...na(o||{},u)},y=!1;if(window.MotionHandoffAnimation){let d=td(n);if(d){let w=window.MotionHandoffAnimation(d,u,Ne);w!==null&&(g.startTime=w,y=!0)}}Qf(n,u),f.start(Ea(u,f,p,n.shouldReduceMotion&&ia.has(u)?{type:!1}:g,n,y));let m=f.animation;m&&c.push(m)}return a&&Promise.all(c).then(()=>{Ne.update(()=>{a&&Kf(n,a)})}),c}function Wd(n){return n instanceof SVGElement&&n.tagName!=="svg"}var Xd=()=>({min:0,max:0}),or=()=>({x:Xd(),y:Xd()});var Yd={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},Aa={};for(let n in Yd)Aa[n]={isEnabled:t=>Yd[n].some(e=>!!t[e])};var qd=typeof window<"u";var co={current:null},Ca={current:!1};function $d(){if(Ca.current=!0,!!qd)if(window.matchMedia){let n=window.matchMedia("(prefers-reduced-motion)"),t=()=>co.current=n.matches;n.addListener(t),t()}else co.current=!1}var Rx=[...Lc,He,En],Zd=n=>Rx.find(_a(n));function Kd(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function Jd(n){return typeof n=="string"||Array.isArray(n)}var Px=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Qd=["initial",...Px];function Vc(n){return Kd(n.animate)||Qd.some(t=>Jd(n[t]))}function jd(n){return!!(Vc(n)||n.variants)}function tp(n,t,e){for(let i in t){let s=t[i],r=e[i];if(Re(s))n.addValue(i,s);else if(Re(r))n.addValue(i,pi(s,{owner:n}));else if(r!==s)if(n.hasValue(i)){let o=n.getValue(i);o.liveStyle===!0?o.jump(s):o.hasAnimated||o.set(s)}else{let o=n.getStaticValue(i);n.addValue(i,pi(o!==void 0?o:s,{owner:n}))}}for(let i in e)t[i]===void 0&&n.removeValue(i);return t}var ep=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],ar=class{scrapeMotionValuesFromProps(t,e,i){return{}}constructor({parent:t,props:e,presenceContext:i,reducedMotionConfig:s,blockInitialAnimation:r,visualState:o},a={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=Hi,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let p=wn.now();this.renderScheduledAt<p&&(this.renderScheduledAt=p,Ne.render(this.render,!1,!0))};let{latestValues:l,renderState:c,onUpdate:h}=o;this.onUpdate=h,this.latestValues=l,this.baseTarget={...l},this.initialValues=e.initial?{...l}:{},this.renderState=c,this.parent=t,this.props=e,this.presenceContext=i,this.depth=t?t.depth+1:0,this.reducedMotionConfig=s,this.options=a,this.blockInitialAnimation=!!r,this.isControllingVariants=Vc(e),this.isVariantNode=jd(e),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);let{willChange:u,...f}=this.scrapeMotionValuesFromProps(e,{},this);for(let p in f){let g=f[p];l[p]!==void 0&&Re(g)&&g.set(l[p],!1)}}mount(t){this.current=t,fi.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((e,i)=>this.bindToMotionValue(i,e)),Ca.current||$d(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:co.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){fi.delete(this.current),this.projection&&this.projection.unmount(),di(this.notifyUpdate),di(this.render),this.valueSubscriptions.forEach(t=>t()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(let t in this.events)this.events[t].clear();for(let t in this.features){let e=this.features[t];e&&(e.unmount(),e.isMounted=!1)}this.current=null}bindToMotionValue(t,e){this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)();let i=Tn.has(t),s=e.on("change",a=>{this.latestValues[t]=a,this.props.onUpdate&&Ne.preRender(this.notifyUpdate),i&&this.projection&&(this.projection.isTransformDirty=!0)}),r=e.on("renderRequest",this.scheduleRender),o;window.MotionCheckAppearSync&&(o=window.MotionCheckAppearSync(this,t,e)),this.valueSubscriptions.set(t,()=>{s(),r(),o&&o(),e.owner&&e.stop()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}updateFeatures(){let t="animation";for(t in Aa){let e=Aa[t];if(!e)continue;let{isEnabled:i,Feature:s}=e;if(!this.features[t]&&s&&i(this.props)&&(this.features[t]=new s(this)),this.features[t]){let r=this.features[t];r.isMounted?r.update():(r.mount(),r.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):or()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,e){this.latestValues[t]=e}update(t,e){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=e;for(let i=0;i<ep.length;i++){let s=ep[i];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);let r="on"+s,o=t[r];o&&(this.propEventSubscriptions[s]=this.on(s,o))}this.prevMotionValues=tp(this,this.scrapeMotionValuesFromProps(t,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue(),this.onUpdate&&this.onUpdate(this)}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(t){let e=this.getClosestVariantNode();if(e)return e.variantChildren&&e.variantChildren.add(t),()=>e.variantChildren.delete(t)}addValue(t,e){let i=this.values.get(t);e!==i&&(i&&this.removeValue(t),this.bindToMotionValue(t,e),this.values.set(t,e),this.latestValues[t]=e.get())}removeValue(t){this.values.delete(t);let e=this.valueSubscriptions.get(t);e&&(e(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,e){if(this.props.values&&this.props.values[t])return this.props.values[t];let i=this.values.get(t);return i===void 0&&e!==void 0&&(i=pi(e===null?void 0:e,{owner:this}),this.addValue(t,i)),i}readValue(t,e){var i;let s=this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:(i=this.getBaseTargetFromProps(this.props,t))!==null&&i!==void 0?i:this.readValueFromInstance(this.current,t,this.options);return s!=null&&(typeof s=="string"&&(xa(s)||pa(s))?s=parseFloat(s):!Zd(s)&&En.test(e)&&(s=ga(t,e)),this.setBaseTarget(t,Re(s)?s.get():s)),Re(s)?s.get():s}setBaseTarget(t,e){this.baseTarget[t]=e}getBaseTarget(t){var e;let{initial:i}=this.props,s;if(typeof i=="string"||typeof i=="object"){let o=oa(this.props,i,(e=this.presenceContext)===null||e===void 0?void 0:e.custom);o&&(s=o[t])}if(i&&s!==void 0)return s;let r=this.getBaseTargetFromProps(this.props,t);return r!==void 0&&!Re(r)?r:this.initialValues[t]!==void 0&&s===void 0?void 0:this.baseTarget[t]}on(t,e){return this.events[t]||(this.events[t]=new $s),this.events[t].add(e)}notify(t,...e){this.events[t]&&this.events[t].notify(...e)}};var lr=class extends ar{constructor(){super(...arguments),this.KeyframeResolver=nr}sortInstanceNodePosition(t,e){return t.compareDocumentPosition(e)&2?1:-1}getBaseTargetFromProps(t,e){return t.style?t.style[e]:void 0}removeValueFromRenderState(t,{vars:e,style:i}){delete e[t],delete i[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:t}=this.props;Re(t)&&(this.childSubscription=t.on("change",e=>{this.current&&(this.current.textContent=`${e}`)}))}};var Ra=(n,t)=>t&&typeof n=="number"?t.transform(n):n;var Ix={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},Dx=Kn.length;function np(n,t,e){let i="",s=!0;for(let r=0;r<Dx;r++){let o=Kn[r],a=n[o];if(a===void 0)continue;let l=!0;if(typeof a=="number"?l=a===(o.startsWith("scale")?1:0):l=parseFloat(a)===0,!l||e){let c=Ra(a,js[o]);if(!l){s=!1;let h=Ix[o]||o;i+=`${h}(${c}) `}e&&(t[o]=c)}}return i=i.trim(),e?i=e(t,s?"":i):s&&(i="none"),i}function Pa(n,t,e){let{style:i,vars:s,transformOrigin:r}=n,o=!1,a=!1;for(let l in t){let c=t[l];if(Tn.has(l)){o=!0;continue}else if(ya(l)){s[l]=c;continue}else{let h=Ra(c,js[l]);l.startsWith("origin")?(a=!0,r[l]=h):i[l]=h}}if(t.transform||(o||e?i.transform=np(t,n.transform,e):i.transform&&(i.transform="none")),a){let{originX:l="50%",originY:c="50%",originZ:h=0}=r;i.transformOrigin=`${l} ${c} ${h}`}}var Lx={offset:"stroke-dashoffset",array:"stroke-dasharray"},Ux={offset:"strokeDashoffset",array:"strokeDasharray"};function ip(n,t,e=1,i=0,s=!0){n.pathLength=1;let r=s?Lx:Ux;n[r.offset]=Wt.transform(-i);let o=Wt.transform(t),a=Wt.transform(e);n[r.array]=`${o} ${a}`}function sp(n,t,e){return typeof n=="string"?n:Wt.transform(t+e*n)}function rp(n,t,e){let i=sp(t,n.x,n.width),s=sp(e,n.y,n.height);return`${i} ${s}`}function op(n,{attrX:t,attrY:e,attrScale:i,originX:s,originY:r,pathLength:o,pathSpacing:a=1,pathOffset:l=0,...c},h,u){if(Pa(n,c,u),h){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};let{attrs:f,style:p,dimensions:g}=n;f.transform&&(g&&(p.transform=f.transform),delete f.transform),g&&(s!==void 0||r!==void 0||p.transform)&&(p.transformOrigin=rp(g,s!==void 0?s:.5,r!==void 0?r:.5)),t!==void 0&&(f.x=t),e!==void 0&&(f.y=e),i!==void 0&&(f.scale=i),o!==void 0&&ip(f,o,a,l,!1)}var Ia=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);var ap=n=>typeof n=="string"&&n.toLowerCase()==="svg";function Da(n,{style:t,vars:e},i,s){Object.assign(n.style,t,s&&s.getProjectionStyles(i));for(let r in e)n.style.setProperty(r,e[r])}function lp(n,t,e,i){Da(n,t,void 0,i);for(let s in t.attrs)n.setAttribute(Ia.has(s)?s:Zs(s),t.attrs[s])}var cp={};function hp(n,{layout:t,layoutId:e}){return Tn.has(n)||n.startsWith("origin")||(t||e!==void 0)&&(!!cp[n]||n==="opacity")}function La(n,t,e){var i;let{style:s}=n,r={};for(let o in s)(Re(s[o])||t.style&&Re(t.style[o])||hp(o,n)||((i=e?.getValue(o))===null||i===void 0?void 0:i.liveStyle)!==void 0)&&(r[o]=s[o]);return r}function up(n,t,e){let i=La(n,t,e);for(let s in n)if(Re(n[s])||Re(t[s])){let r=Kn.indexOf(s)!==-1?"attr"+s.charAt(0).toUpperCase()+s.substring(1):s;i[r]=n[s]}return i}var Ua=class extends lr{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=or}getBaseTargetFromProps(t,e){return t[e]}readValueFromInstance(t,e){if(Tn.has(e)){let i=tr(e);return i&&i.default||0}return e=Ia.has(e)?e:Zs(e),t.getAttribute(e)}scrapeMotionValuesFromProps(t,e,i){return up(t,e,i)}build(t,e,i){op(t,e,this.isSVGTag,i.transformTemplate)}renderInstance(t,e,i,s){lp(t,e,i,s)}mount(t){this.isSVGTag=ap(t.tagName),super.mount(t)}};function fp({top:n,left:t,right:e,bottom:i}){return{x:{min:t,max:e},y:{min:n,max:i}}}function dp(n,t){if(!t)return n;let e=t({x:n.left,y:n.top}),i=t({x:n.right,y:n.bottom});return{top:e.y,left:e.x,bottom:i.y,right:i.x}}function pp(n,t){return fp(dp(n.getBoundingClientRect(),t))}function Nx(n){return window.getComputedStyle(n)}var Na=class extends lr{constructor(){super(...arguments),this.type="html",this.renderInstance=Da}readValueFromInstance(t,e){if(Tn.has(e)){let i=tr(e);return i&&i.default||0}else{let i=Nx(t),s=(ya(e)?i.getPropertyValue(e):i[e])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(t,{transformPagePoint:e}){return pp(t,e)}build(t,e,i){Pa(t,e,i.transformTemplate)}scrapeMotionValuesFromProps(t,e,i){return La(t,e,i)}};function Fx(n,t){return n in t}var Fa=class extends ar{constructor(){super(...arguments),this.type="object"}readValueFromInstance(t,e){if(Fx(e,t)){let i=t[e];if(typeof i=="string"||typeof i=="number")return i}}getBaseTargetFromProps(){}removeValueFromRenderState(t,e){delete e.output[t]}measureInstanceViewportBox(){return or()}build(t,e){Object.assign(t.output,e)}renderInstance(t,{output:e}){Object.assign(t,e)}sortInstanceNodePosition(){return 0}};function mp(n){let t={presenceContext:null,props:{},visualState:{renderState:{transform:{},transformOrigin:{},style:{},vars:{},attrs:{}},latestValues:{}}},e=Wd(n)?new Ua(t):new Na(t);e.mount(n),fi.set(n,e)}function gp(n){let t={presenceContext:null,props:{},visualState:{renderState:{output:{}},latestValues:{}}},e=new Fa(t);e.mount(n),fi.set(n,e)}function xp(n,t,e){let i=Re(n)?n:pi(n);return i.start(Ea("",i,t,e)),i.animation}function Ox(n,t){return Re(n)||typeof n=="number"||typeof n=="string"&&!jr(t)}function Oa(n,t,e,i){let s=[];if(Ox(n,t))s.push(xp(n,jr(t)&&t.default||t,e&&(e.default||e)));else{let r=ta(n,t,i),o=r.length;Bn(!!o,"No valid elements provided.");for(let a=0;a<o;a++){let l=r[a],c=l instanceof Element?mp:gp;fi.has(l)||c(l);let h=fi.get(l),u={...e};"delay"in u&&typeof u.delay=="function"&&(u.delay=u.delay(a,o)),s.push(...Gd(h,{...t,transition:u},{}))}}return s}function yp(n,t,e){let i=[];return Vf(n,t,e,{spring:Xs}).forEach(({keyframes:r,transition:o},a)=>{i.push(...Oa(a,r,o))}),i}function Bx(n){return Array.isArray(n)&&n.some(Array.isArray)}function _p(n){function t(e,i,s){let r=[];Bx(e)?r=yp(e,i,n):r=Oa(e,i,s,n);let o=new Hs(r);return n&&n.animations.push(o),o}return t}var Hc=_p();function Gc(n,t){let e,i=()=>{let{currentTime:s}=t,o=(s===null?0:s.value)/100;e!==o&&n(o),e=o};return Ne.update(i,!0),()=>di(i)}var Ba=new WeakMap,Wi;function zx(n,t){if(t){let{inlineSize:e,blockSize:i}=t[0];return{width:e,height:i}}else return n instanceof SVGElement&&"getBBox"in n?n.getBBox():{width:n.offsetWidth,height:n.offsetHeight}}function kx({target:n,contentRect:t,borderBoxSize:e}){var i;(i=Ba.get(n))===null||i===void 0||i.forEach(s=>{s({target:n,contentSize:t,get size(){return zx(n,e)}})})}function Vx(n){n.forEach(kx)}function Hx(){typeof ResizeObserver>"u"||(Wi=new ResizeObserver(Vx))}function vp(n,t){Wi||Hx();let e=ks(n);return e.forEach(i=>{let s=Ba.get(i);s||(s=new Set,Ba.set(i,s)),s.add(t),Wi?.observe(i)}),()=>{e.forEach(i=>{let s=Ba.get(i);s?.delete(t),s?.size||Wi?.unobserve(i)})}}var za=new Set,ho;function Gx(){ho=()=>{let n={width:window.innerWidth,height:window.innerHeight},t={target:window,size:n,contentSize:n};za.forEach(e=>e(t))},window.addEventListener("resize",ho)}function Sp(n){return za.add(n),ho||Gx(),()=>{za.delete(n),!za.size&&ho&&(ho=void 0)}}function Mp(n,t){return typeof n=="function"?Sp(n):vp(n,t)}var Wx=50,bp=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),wp=()=>({time:0,x:bp(),y:bp()}),Xx={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function Tp(n,t,e,i){let s=e[t],{length:r,position:o}=Xx[t],a=s.current,l=e.time;s.current=n[`scroll${o}`],s.scrollLength=n[`scroll${r}`]-n[`client${r}`],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=$n(0,s.scrollLength,s.current);let c=i-l;s.velocity=c>Wx?0:Ws(s.current-a,c)}function Ep(n,t,e){Tp(n,"x",t,e),Tp(n,"y",t,e),t.time=e}function Ap(n,t){let e={x:0,y:0},i=n;for(;i&&i!==t;)if(i instanceof HTMLElement)e.x+=i.offsetLeft,e.y+=i.offsetTop,i=i.offsetParent;else if(i.tagName==="svg"){let s=i.getBoundingClientRect();i=i.parentElement;let r=i.getBoundingClientRect();e.x+=s.left-r.left,e.y+=s.top-r.top}else if(i instanceof SVGGraphicsElement){let{x:s,y:r}=i.getBBox();e.x+=s,e.y+=r;let o=null,a=i.parentNode;for(;!o;)a.tagName==="svg"&&(o=a),a=i.parentNode;i=o}else break;return e}var ka={start:0,center:.5,end:1};function Wc(n,t,e=0){let i=0;if(n in ka&&(n=ka[n]),typeof n=="string"){let s=parseFloat(n);n.endsWith("px")?i=s:n.endsWith("%")?n=s/100:n.endsWith("vw")?i=s/100*document.documentElement.clientWidth:n.endsWith("vh")?i=s/100*document.documentElement.clientHeight:n=s}return typeof n=="number"&&(i=t*n),e+i}var Yx=[0,0];function Cp(n,t,e,i){let s=Array.isArray(n)?n:Yx,r=0,o=0;return typeof n=="number"?s=[n,n]:typeof n=="string"&&(n=n.trim(),n.includes(" ")?s=n.split(" "):s=[n,ka[n]?n:"0"]),r=Wc(s[0],e,i),o=Wc(s[1],t),r-o}var Rp={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]};var qx={x:0,y:0};function $x(n){return"getBBox"in n&&n.tagName!=="svg"?n.getBBox():{width:n.clientWidth,height:n.clientHeight}}function Pp(n,t,e){let{offset:i=Rp.All}=e,{target:s=n,axis:r="y"}=e,o=r==="y"?"height":"width",a=s!==n?Ap(s,n):qx,l=s===n?{width:n.scrollWidth,height:n.scrollHeight}:$x(s),c={width:n.clientWidth,height:n.clientHeight};t[r].offset.length=0;let h=!t[r].interpolate,u=i.length;for(let f=0;f<u;f++){let p=Cp(i[f],c[o],l[o],a[r]);!h&&p!==t[r].interpolatorOffsets[f]&&(h=!0),t[r].offset[f]=p}h&&(t[r].interpolate=Ta(t[r].offset,Ys(i),{clamp:!1}),t[r].interpolatorOffsets=[...t[r].offset]),t[r].progress=an(0,1,t[r].interpolate(t[r].current))}function Zx(n,t=n,e){if(e.x.targetOffset=0,e.y.targetOffset=0,t!==n){let i=t;for(;i&&i!==n;)e.x.targetOffset+=i.offsetLeft,e.y.targetOffset+=i.offsetTop,i=i.offsetParent}e.x.targetLength=t===n?t.scrollWidth:t.clientWidth,e.y.targetLength=t===n?t.scrollHeight:t.clientHeight,e.x.containerLength=n.clientWidth,e.y.containerLength=n.clientHeight}function Ip(n,t,e,i={}){return{measure:()=>Zx(n,i.target,e),update:s=>{Ep(n,e,s),(i.offset||i.target)&&Pp(n,e,i)},notify:()=>t(e)}}var uo=new WeakMap,Dp=new WeakMap,Xc=new WeakMap,Lp=n=>n===document.documentElement?window:n;function Va(n,{container:t=document.documentElement,...e}={}){let i=Xc.get(t);i||(i=new Set,Xc.set(t,i));let s=wp(),r=Ip(t,n,s,e);if(i.add(r),!uo.has(t)){let a=()=>{for(let f of i)f.measure()},l=()=>{for(let f of i)f.update(Oi.timestamp)},c=()=>{for(let f of i)f.notify()},h=()=>{Ne.read(a,!1,!0),Ne.read(l,!1,!0),Ne.update(c,!1,!0)};uo.set(t,h);let u=Lp(t);window.addEventListener("resize",h,{passive:!0}),t!==document.documentElement&&Dp.set(t,Mp(t,h)),u.addEventListener("scroll",h,{passive:!0})}let o=uo.get(t);return Ne.read(o,!1,!0),()=>{var a;di(o);let l=Xc.get(t);if(!l||(l.delete(r),l.size))return;let c=uo.get(t);uo.delete(t),c&&(Lp(t).removeEventListener("scroll",c),(a=Dp.get(t))===null||a===void 0||a(),window.removeEventListener("resize",c))}}function Kx({source:n,container:t,axis:e="y"}){n&&(t=n);let i={value:0},s=Va(r=>{i.value=r[e].progress*100},{container:t,axis:e});return{currentTime:i,cancel:s}}var Yc=new Map;function Up({source:n,container:t=document.documentElement,axis:e="y"}={}){n&&(t=n),Yc.has(t)||Yc.set(t,{});let i=Yc.get(t);return i[e]||(i[e]=Yo()?new ScrollTimeline({source:t,axis:e}):Kx({source:t,axis:e})),i[e]}function Jx(n){return n.length===2}function Np(n){return n&&(n.target||n.offset)}function Qx(n,t){return Jx(n)||Np(t)?Va(e=>{n(e[t.axis].progress,e)},t):Gc(n,Up(t))}function jx(n,t){if(n.flatten(),Np(t))return n.pause(),Va(e=>{n.time=n.duration*e[t.axis].progress},t);{let e=Up(t);return n.attachTimeline?n.attachTimeline(e,i=>(i.pause(),Gc(s=>{i.time=i.duration*s},e))):Qe}}function qc(n,{axis:t="y",...e}={}){let i={axis:t,...e};return typeof n=="function"?Qx(n,i):jx(n,i)}var ty={some:0,all:1};function $c(n,t,{root:e,margin:i,amount:s="some"}={}){let r=ks(n),o=new WeakMap,a=c=>{c.forEach(h=>{let u=o.get(h.target);if(h.isIntersecting!==!!u)if(h.isIntersecting){let f=t(h.target,h);typeof f=="function"?o.set(h.target,f):l.unobserve(h.target)}else typeof u=="function"&&(u(h),o.delete(h.target))})},l=new IntersectionObserver(a,{root:e,rootMargin:i,threshold:typeof s=="number"?s:ty[s]});return r.forEach(c=>l.observe(c)),()=>l.disconnect()}function Fp(n){let t=n.getContext("2d"),e=matchMedia("(prefers-reduced-motion: reduce)").matches,i=Math.min(devicePixelRatio||1,2),{sin:s,cos:r,atan2:o,hypot:a,acos:l,min:c,max:h,PI:u,random:f}=Math,p=(x,E,A)=>x<E?E:x>A?A:x,g=x=>(x=p(x,0,1),x*x*(3-2*x)),y=(x,E,A)=>x+(E-x)*A,m=[10,10,11],d=[229,72,77],w=[255,46,52],T=x=>`${x}px "IBM Plex Mono", ui-monospace, monospace`,v=(x,E)=>`rgba(${x[0]|0},${x[1]|0},${x[2]|0},${p(E,0,1).toFixed(3)})`,L=(x,E,A)=>[y(x[0],E[0],A),y(x[1],E[1],A),y(x[2],E[2],A)],I=x=>{let E="";for(let A=0;A<x;A++)E+="0123456789abcdef"[f()*16|0];return E},R=0,D=0,M=!0,S=800,U=0,Y=0,$=!1;function Z(){let x=n.getBoundingClientRect();R=x.width,D=x.height,n.width=Math.round(R*i),n.height=Math.round(D*i),t.setTransform(i,0,0,i,0,0),M=R/D>1.05,M?(S=c(D*1,R*.68),U=R*.71,Y=D*.5):(S=c(R*.85,D*.42),U=R*.5,Y=D*.79),$&&gc()}Z(),new ResizeObserver(Z).observe(n);let rt=0,B=0,et=0,N=0;e||addEventListener("pointermove",x=>{et=(x.clientX/innerWidth-.5)*2,N=(x.clientY/innerHeight-.5)*2},{passive:!0});let F={ex:0,ey:0,ez:0,fx:0,fy:0,fz:0,rx:0,rz:0,ux:0,uy:0,uz:0};function J(x,E){F.ex=s(x)*11,F.ez=r(x)*11,F.ey=4.1+E;let V=-F.ex,tt=2.3-F.ey,st=-F.ez,ht=a(V,tt,st);V/=ht,tt/=ht,st/=ht;let mt=-st,Vt=V,Qt=a(mt,Vt);mt/=Qt,Vt/=Qt,Object.assign(F,{fx:V,fy:tt,fz:st,rx:mt,rz:Vt,ux:-Vt*tt,uy:Vt*V-mt*st,uz:mt*tt})}let K=[0,0,0];function at(x,E,A,z=K){let V=x-F.ex,tt=E-F.ey,st=A-F.ez,ht=V*F.fx+tt*F.fy+st*F.fz,mt=S/h(ht,.05);return z[0]=U+(V*F.rx+st*F.rz)*mt,z[1]=Y-(V*F.ux+tt*F.uy+st*F.uz)*mt,z[2]=ht,z}let vt=(x,E)=>({m:x,t:E}),P=(x,E,A)=>vt([1,0,0,0,1,0,0,0,1],[x,E,A]),H=x=>vt([x,0,0,0,x,0,0,0,x],[0,0,0]),Q=x=>{let E=r(x),A=s(x);return vt([E,0,A,0,1,0,-A,0,E],[0,0,0])},j=x=>{let E=r(x),A=s(x);return vt([E,-A,0,A,E,0,0,0,1],[0,0,0])},pt=x=>{let E=r(x),A=s(x);return vt([1,0,0,0,E,-A,0,A,E],[0,0,0])};function _t(x,E){let A=x.m,z=E.m,V=new Array(9),tt=E.t;for(let st=0;st<3;st++)for(let ht=0;ht<3;ht++)V[st*3+ht]=A[st*3]*z[ht]+A[st*3+1]*z[3+ht]+A[st*3+2]*z[6+ht];return vt(V,[A[0]*tt[0]+A[1]*tt[1]+A[2]*tt[2]+x.t[0],A[3]*tt[0]+A[4]*tt[1]+A[5]*tt[2]+x.t[1],A[6]*tt[0]+A[7]*tt[1]+A[8]*tt[2]+x.t[2]])}let ft=(...x)=>x.reduce(_t),Rt=(x,E,A,z)=>[x.m[0]*E+x.m[1]*A+x.m[2]*z+x.t[0],x.m[3]*E+x.m[4]*A+x.m[5]*z+x.t[1],x.m[6]*E+x.m[7]*A+x.m[8]*z+x.t[2]];function Gt(x,E,A,z){let V=[x.m[0]*E+x.m[1]*A+x.m[2]*z,x.m[3]*E+x.m[4]*A+x.m[5]*z,x.m[6]*E+x.m[7]*A+x.m[8]*z],tt=a(V[0],V[1],V[2]);return[V[0]/tt,V[1]/tt,V[2]/tt]}let Yt=(x,E,A)=>{let z=a(x,E,A);return[x/z,E/z,A/z]},O=Yt(-.5,.85,.6),le=Yt(.8,.2,-.55),gt={metal:{c:[182,188,202],amb:.36,dif:.8,rim:.75},dark:{c:[72,76,88],amb:.5,dif:.6,rim:.65},accent:{c:[236,72,78],amb:.62,dif:.48,rim:.2},crate:{c:[216,212,202],amb:.4,dif:.66,rim:.45},dais:{c:[30,31,36],amb:.85,dif:.45,rim:1}};function qt(x,E,A,z){let V=h(0,E[0]*O[0]+E[1]*O[1]+E[2]*O[2]),tt=h(0,E[0]*le[0]+E[1]*le[1]+E[2]*le[2]),st=x.amb+x.dif*V,ht=tt*x.rim*.6,mt=x.c[0]*st+229*ht+z*255,Vt=x.c[1]*st+60*ht+z*110,Qt=x.c[2]*st+66*ht+z*115,me=p((A-8.5)/10,0,.6);return mt=c(255,y(mt,m[0],me)),Vt=c(255,y(Vt,m[1],me)),Qt=c(255,y(Qt,m[2],me)),`rgb(${mt|0},${Vt|0},${Qt|0})`}let zt=[],ee=[],Lt=[[[1,3,7,5],[1,0,0]],[[0,4,6,2],[-1,0,0]],[[2,6,7,3],[0,1,0]],[[0,1,5,4],[0,-1,0]],[[4,5,7,6],[0,0,1]],[[0,2,3,1],[0,0,-1]]];function C(x,E,A,z=0,V=zt){let tt=0,st=0,ht=0;for(let ie of x)tt+=ie[0],st+=ie[1],ht+=ie[2];let mt=x.length;if(tt/=mt,st/=mt,ht/=mt,E[0]*(tt-F.ex)+E[1]*(st-F.ey)+E[2]*(ht-F.ez)>=0)return;let Vt=new Array(mt*2),Qt=0;for(let ie=0;ie<mt;ie++){if(at(x[ie][0],x[ie][1],x[ie][2]),K[2]<.3)return;Vt[ie*2]=K[0],Vt[ie*2+1]=K[1],Qt+=K[2]}let me=Qt/mt;V.push({k:0,z:me,s:Vt,fill:qt(A,E,me,z)})}function _(x,E,A,z,V,tt=0,st){let ht=[];for(let mt=0;mt<8;mt++)ht.push(Rt(x,(mt&1?.5:-.5)*E,(mt&2?.5:-.5)*A,(mt&4?.5:-.5)*z));for(let[mt,Vt]of Lt)C(mt.map(Qt=>ht[Qt]),Gt(x,Vt[0],Vt[1],Vt[2]),V,tt,st)}function q(x,E,A,z,V,tt=0,st){let ht=[],mt=[];for(let Vt=0;Vt<z;Vt++){let Qt=Vt/z*u*2;ht.push(Rt(x,r(Qt)*E,A/2,s(Qt)*E)),mt.push(Rt(x,r(Qt)*E,-A/2,s(Qt)*E))}for(let Vt=0;Vt<z;Vt++){let Qt=(Vt+1)%z,me=(Vt+.5)/z*u*2;C([mt[Vt],mt[Qt],ht[Qt],ht[Vt]],Gt(x,r(me),0,s(me)),V,tt,st)}C(ht,Gt(x,0,1,0),V,tt,st),C(mt,Gt(x,0,-1,0),V,tt,st)}let ct=18,ut=.52,lt=.35,Dt=.48,yt=[1.5*r(-2.4),.18,-1.5*s(-2.4)],Mt=2.5,Kt=-.45,xt=2.6,Pt=3.7,Ut=-.15,Xt=.95,wt=(x,E,A=0)=>[x*r(E),A,-x*s(E)],Bt=(x,E,A)=>x+o(s(E-x),r(E-x))*A,Ot=wt(Mt,xt);function ue(x,E){if(E<=x[0][0])return{...x[0][1]};for(let A=1;A<x.length;A++){let[z,V]=x[A];if(E<=z){let[tt,st]=x[A-1],ht=z>tt?g((E-tt)/(z-tt)):1,mt={};for(let Vt in V)Vt!=="arc"&&(mt[Vt]=y(st[Vt],V[Vt],ht));return V.arc&&(mt.y+=V.arc*s(u*ht)),mt}}return{...x[x.length-1][1]}}let k=x=>E=>Rt(x,E[0],E[1],E[2]);function bt(x,E,A,z,V,tt,st=0){let ht=A[0]-E[0],mt=A[1]-E[1];_(ft(x,P((E[0]+A[0])/2,(E[1]+A[1])/2,(E[2]+A[2])/2),j(o(mt,ht))),a(ht,mt)+z*.4,z,V,tt,st)}let ot=(x,E,A,z)=>[[-E,A,-z],[E,A,-z],[E,A,z],[-E,A,z]].map(k(x)),dt=.95,Tt=1.55,Et=1.35,Jt=.49;function Ce(x){let E=o(-x[2],x[0]),A=a(x[0],x[2]),z=x[1]+Jt,V=z-dt,tt=p(a(A,V),.4,Tt+Et-.001),st=o(V,A)+l(p((Tt*Tt+tt*tt-Et*Et)/(2*Tt*tt),-1,1)),ht=[Tt*r(st),dt+Tt*s(st)],mt=o(z-ht[1],A-ht[0]);return{th:E,a1:st,a2:mt,E:ht,Wr:[A,z]}}let ke=(x,E,A)=>[E*r(x),A,-E*s(x)];function xe(x,E,A){let z=Q(x.th),{a1:V,a2:tt,E:st,Wr:ht}=x;q(P(0,.31,0),.64,.26,22,gt.dark),q(ft(z,P(0,.6,0)),.47,.32,22,gt.metal),q(ft(z,P(0,.465,0)),.5,.05,22,gt.accent,A*.5),_(ft(z,P(0,.94,0)),.56,.46,.48,gt.metal),q(ft(z,P(0,dt,0),pt(u/2)),.21,.74,16,gt.accent,A*.6),_(ft(z,P(Tt/2*r(V),dt+Tt/2*s(V),0),j(V)),Tt+.08,.3,.36,gt.metal),q(ft(z,P(st[0],st[1],0),pt(u/2)),.18,.52,16,gt.accent,A*.6),_(ft(z,P((st[0]+ht[0])/2,(st[1]+ht[1])/2,0),j(tt)),Et,.24,.28,gt.metal),q(ft(z,P(ht[0],ht[1],0),pt(u/2)),.13,.38,14,gt.dark),_(ft(z,P(ht[0],ht[1]-.17,0)),.6,.12,.24,gt.metal);for(let mt of[-1,1])_(ft(z,P(ht[0]+mt*E/2,ht[1]-.36,0)),.05,.26,.18,gt.dark,A*.25)}let rn={th:-1.25,r:1.15,y:1.7,g:ut},Un=[[.4,rn],[1,{th:Kt,r:Mt,y:1.35,g:ut}],[1.4,{th:Kt,r:Mt,y:Dt+.06,g:ut}],[1.55,{th:Kt,r:Mt,y:Dt+.06,g:lt}],[2.1,{th:Kt,r:Mt,y:1.35,g:lt}],[3.2,{th:-2.4,r:1.5,y:1.3,g:lt,arc:.5}],[3.75,{th:-2.4,r:1.5,y:.24,g:lt}],[3.95,{th:-2.4,r:1.5,y:.24,g:ut}],[4.4,{th:-2.4,r:1.5,y:1.3,g:ut}],[5,rn]],Nn={name:"ARM",glow:0,k:rn,ps:null,tip:[0,0,0],step(x){let E=ue(Un,x);if(x>5){let A=x-5;E.y+=.05*s(A*1.3),E.th+=.1*s(A*.45)}this.k=E,this.tip=[E.r*r(E.th),E.y,-E.r*s(E.th)],this.ps=Ce(this.tip)},joints(){let x=this.ps;return[[0,.18,0],[0,.76,0],ke(x.th,0,dt),ke(x.th,x.E[0],x.E[1]),ke(x.th,x.Wr[0],x.Wr[1]),this.tip.slice()]},snap(){return[{pts:this.joints(),joints:!0}]},emit(){return this.joints()[2+(f()*4|0)]},cap(){return this.tip},ring(){return{c:[0,0],r:1,y0:.25,y1:2.9}},build(){xe(this.ps,this.k.g,this.glow)}},Bo=[[4.6,{p:Kt}],[7.6,{p:xt}],[13,{p:xt}],[17.6,{p:Kt+u*2}]],Je={name:"AMR",glow:0,p:Kt,pos:wt(Mt,Kt),yaw:Kt+u/2,spin:0,step(x,E){let A=ue(Bo,x).p,z=Math.abs(o(s(A-this.p),r(A-this.p)));this.p=A,this.pos=wt(Mt,A),this.yaw=A+u/2,this.spin+=z*Mt/.11},T(){return ft(P(this.pos[0],0,this.pos[2]),Q(this.yaw))},snap(){let x=this.T();return[{pts:ot(x,.48,.45,.33),loop:!0},{pts:[[0,.45,0],[.48,.52,0]].map(k(x)),joints:!0}]},emit(){return Rt(this.T(),.36,.55,0)},cap(){return[this.pos[0],.6,this.pos[2]]},ring(){return{c:[this.pos[0],this.pos[2]],r:.75,y0:.05,y1:.95}},build(){let x=this.T();for(let[E,A]of[[.32,.36],[-.32,.36],[.32,-.36],[-.32,-.36]])q(ft(x,P(E,.11,A),pt(u/2),Q(this.spin)),.11,.07,10,gt.dark);_(ft(x,P(0,.28,0)),.95,.34,.66,gt.metal),_(ft(x,P(-.02,.465,0)),.78,.03,.56,gt.dark),_(ft(x,P(.485,.24,0)),.03,.1,.58,gt.accent,this.glow*.6),q(ft(x,P(.36,.52,0)),.08,.09,12,gt.accent,.25+this.glow*.6)}},hi={x:2.9,y:3.3,z:-2},zo=[[8.4,hi],[9.6,{x:yt[0],y:2.4,z:yt[2]}],[10.2,{x:yt[0],y:.66,z:yt[2]}],[10.4,{x:yt[0],y:.66,z:yt[2]}],[11,{x:yt[0],y:2.6,z:yt[2]}],[12.1,{x:Ot[0],y:2.2,z:Ot[2]}],[12.35,{x:Ot[0],y:Dt+.48,z:Ot[2]}],[12.6,{x:Ot[0],y:Dt+.48,z:Ot[2]}],[13.2,{x:Ot[0],y:2,z:Ot[2]}],[14.6,hi]],Os=[[.34,.34],[.34,-.34],[-.34,.34],[-.34,-.34]],xn={name:"DRONE",glow:0,pos:[hi.x,hi.y,hi.z],yaw:u,tilt:0,spin:0,step(x,E){let A=ue(zo,x),z=this.pos;this.pos=[A.x,A.y+.05*s(pe*2.1),A.z];let V=(this.pos[0]-z[0])/h(E,.001),tt=(this.pos[2]-z[2])/h(E,.001),st=a(V,tt);st>.15&&(this.yaw=Bt(this.yaw,o(-tt,V),c(1,E*4))),this.tilt+=(p(st*.09,0,.32)-this.tilt)*c(1,E*5),this.spin+=E*38},T(){return ft(P(this.pos[0],this.pos[1],this.pos[2]),Q(this.yaw),j(-this.tilt))},snap(){let x=this.T(),E=k(x),A=[{pts:[[.34,0,.34],[-.34,0,-.34]].map(E),joints:!0},{pts:[[.34,0,-.34],[-.34,0,.34]].map(E),joints:!0},{pts:ot(x,.18,.02,.15),loop:!0}];for(let[z,V]of Os)A.push({pts:[[z-.15,.05,V],[z,.05,V-.15],[z+.15,.05,V],[z,.05,V+.15]].map(E),loop:!0});return A},emit(){let[x,E]=Os[f()*4|0];return Rt(this.T(),x,.05,E)},cap(){return this.pos},ring(){return{c:[this.pos[0],this.pos[2]],r:.62,y0:this.pos[1]-.55,y1:this.pos[1]+.4}},build(){let x=this.T();_(x,.36,.11,.3,gt.metal),_(ft(x,P(0,.07,0)),.2,.03,.16,gt.accent,.3+this.glow*.7),_(ft(x,Q(u/4)),.96,.04,.05,gt.dark),_(ft(x,Q(-u/4)),.96,.04,.05,gt.dark),Os.forEach(([E,A],z)=>{q(ft(x,P(E,.05,A)),.18,.015,12,gt.dark,this.glow*.3),_(ft(x,P(E,.065,A),Q(this.spin*(z%2?1:-1))),.34,.01,.04,gt.metal)});for(let E of[.12,-.12])_(ft(x,P(0,-.13,E)),.42,.03,.03,gt.dark);_(ft(x,P(0,-.12,0)),.06,.12,.06,gt.dark)}},Di=[-3.05,0,.45],ui=[-2.4,0,1.55],ko=[[4.2,{x:Di[0],z:Di[2]}],[6,{x:ui[0],z:ui[2]}],[7.8,{x:ui[0],z:ui[2]}],[9.6,{x:Di[0],z:Di[2]}]],Bs={name:"HUMANOID",glow:0,pos:Di.slice(),yaw:0,walk:0,ph:0,point:0,step(x,E){let A=ue(ko,x),z=A.x-this.pos[0],V=A.z-this.pos[2],tt=a(z,V)/h(E,.001);this.pos=[A.x,0,A.z],this.walk+=(p(tt/.7,0,1)-this.walk)*c(1,E*6),this.ph+=tt*E*5.2;let st;tt>.08?st=o(-V,z):x>5&&x<8.5?st=o(-(yt[2]-A.z),yt[0]-A.x):st=o(A.z,-A.x),this.yaw=Bt(this.yaw,st,c(1,E*5)),this.point=g((x-6.3)/.4)*(1-g((x-7.4)/.4))},T(){return ft(P(this.pos[0],0,this.pos[2]),Q(this.yaw))},skel(){let x=this.walk,E=this.ph,A=.92+.03*Math.abs(s(E))*x,z=[],V=[];for(let[tt,st]of[[-1,0],[1,u]]){let ht=s(E+st),mt=.42*ht*x,Vt=(.15+.55*h(0,r(E+st)))*x+.05,Qt=[0,A,tt*.11],me=[.44*s(mt),A-.44*r(mt),Qt[2]];z.push([Qt,me,[me[0]+.44*s(mt-Vt),me[1]-.44*r(mt-Vt),Qt[2]]]);let ie=tt>0?this.point:0,Ee=y(-.38*ht*x,1.45,ie),We=[0,A+.58,tt*.29],Ui=[.3*s(Ee),We[1]-.3*r(Ee),We[2]],fs=Ee+y(.25,.02,ie);V.push([We,Ui,[Ui[0]+.28*s(fs),Ui[1]-.28*r(fs),We[2]]])}return{pel:A,legs:z,arms:V}},snap(){let{pel:x,legs:E,arms:A}=this.skel(),z=k(this.T());return[{pts:[[0,x,0],[0,x+.6,0],[0,x+.95,0]].map(z),joints:!0},{pts:[A[0][0],A[1][0]].map(z)},{pts:[E[0][0],E[1][0]].map(z)},...A.map(V=>({pts:V.map(z),joints:!0})),...E.map(V=>({pts:V.map(z),joints:!0}))]},emit(){let{pel:x,arms:E}=this.skel();return Rt(this.T(),...f()<.5?[0,x+.82,0]:E[1][2])},cap(){return Rt(this.T(),0,1.75,0)},ring(){return{c:[this.pos[0],this.pos[2]],r:.55,y0:.05,y1:1.95}},build(){let x=this.T(),{pel:E,legs:A,arms:z}=this.skel(),V=this.glow;for(let[tt,st,ht]of A)bt(x,tt,st,.12,.13,gt.dark),bt(x,st,ht,.1,.11,gt.metal);_(ft(x,P(0,E,0)),.2,.14,.32,gt.dark),_(ft(x,P(0,E+.32,0)),.24,.52,.46,gt.crate),_(ft(x,P(.125,E+.42,0)),.02,.06,.12,gt.accent,.3+V*.7),_(ft(x,P(0,E+.82,0)),.22,.25,.21,gt.crate),_(ft(x,P(.115,E+.84,0)),.03,.07,.16,gt.accent,.35+V*.65);for(let[tt,st,ht]of z)bt(x,tt,st,.09,.1,gt.dark),bt(x,st,ht,.08,.09,gt.metal)}},dc=[[.5,{p:Ut}],[6,{p:Xt}],[7.8,{p:Xt}],[13.3,{p:Ut}]],Jr={name:"QUADRUPED",glow:0,p:Ut,pos:wt(Pt,Ut),yaw:Ut+u/2,walk:0,ph:0,head:0,step(x,E){let A=ue(dc,x).p,z=A-this.p,V=Math.abs(z)*Pt/h(E,.001);this.p=A,this.pos=wt(Pt,A),this.walk+=(p(V/.5,0,1)-this.walk)*c(1,E*5),this.ph+=V*E*7,Math.abs(z)>1e-5&&(this.yaw=Bt(this.yaw,z>0?A+u/2:A-u/2,c(1,E*3))),this.head=.6*s(pe*1.4)*(1-this.walk)},T(){return ft(P(this.pos[0],0,this.pos[2]),Q(this.yaw))},legs(){let x=this.walk;return[[.3,.15,0,1],[-.3,-.15,0,-1],[.3,-.15,u,1],[-.3,.15,u,-1]].map(([E,A,z,V])=>{let tt=.4*s(this.ph+z)*x,st=.5+.55*h(0,r(this.ph+z))*x,ht=[E,.47,A],mt=[E+.24*s(tt),.47-.24*r(tt),A],Vt=V>0?tt-st:tt+st;return[ht,mt,[mt[0]+.26*s(Vt),mt[1]-.26*r(Vt),A]]})},snap(){let x=k(this.T());return[{pts:[[-.39,.53,0],[.39,.53,0],[.58,.6,0]].map(x),joints:!0},...this.legs().map(E=>({pts:E.map(x),joints:!0}))]},emit(){return Rt(this.T(),.55,.62,0)},cap(){return Rt(this.T(),0,.65,0)},ring(){return{c:[this.pos[0],this.pos[2]],r:.6,y0:.05,y1:.95}},build(){let x=this.T(),E=this.glow;_(ft(x,P(0,.53,0)),.78,.2,.32,gt.metal),_(ft(x,P(-.02,.64,0)),.44,.02,.1,gt.accent,.25+E*.7);let A=ft(x,P(.47,.6,0),Q(this.head));_(A,.22,.15,.2,gt.dark),_(ft(A,P(.11,.01,0)),.02,.04,.14,gt.accent,.4+E*.6);for(let[z,V,tt]of this.legs())bt(x,z,V,.07,.07,gt.dark),bt(x,V,tt,.055,.055,gt.metal)}},Li=[Nn,Je,xn,Bs,Jr],b=[[1.45,Nn,"GRIP"],[2.65,Nn,"MOVE"],[3.9,Nn,"PLACE"],[4.6,Je,"DEPART"],[5.5,Bs,"ZONE ENTRY"],[6.6,Jr,"CHECKPOINT"],[7.1,Bs,"INSPECT"],[7.6,Je,"STAGED"],[8.4,xn,"DISPATCH"],[10.3,xn,"PICKUP"],[12.45,xn,"DROP"],[13,Je,"DEPART"],[14.2,Jr,"CHECKPOINT"],[17.6,Je,"DOCKED"]],W=b.length,nt=2.3,it=1.05,X=.2,St=.42,It=-.35,kt=22,Ft=1.1,$t=.5,Zt=x=>{let E=It+x*St;return[nt*r(E),it+x*X,-nt*s(E)]},At=[],ce=4096,ve=4096,ye=[],Oe=[],se=[],Ht=[];function Fn(x){let E=pe-x.born;if(E>=Ft)return Zt(E);let A=g(E/Ft),z=Zt(Ft),V=[(x.start[0]+z[0])/2,h(x.start[1],z[1])+.9,(x.start[2]+z[2])/2],tt=(1-A)*(1-A),st=2*(1-A)*A,ht=A*A;return[tt*x.start[0]+st*V[0]+ht*z[0],tt*x.start[1]+st*V[1]+ht*z[1],tt*x.start[2]+st*V[2]+ht*z[2]]}function de(x,E){if(E){let[st,ht,mt]=E;x.push({pts:[[st-.15,ht+.15,mt-.15],[st+.15,ht+.15,mt-.15],[st+.15,ht+.15,mt+.15],[st-.15,ht+.15,mt+.15]],loop:!0,crate:!0})}let A=[1e9,1e9,1e9],z=[-1e9,-1e9,-1e9];for(let st of x)for(let ht of st.pts)for(let mt=0;mt<3;mt++)A[mt]=c(A[mt],ht[mt]),z[mt]=h(z[mt],ht[mt]);let V=[0,1,2].map(st=>(A[st]+z[st])/2),tt=.36/h(.1,...[0,1,2].map(st=>(z[st]-A[st])/2));return x.map(st=>({...st,pts:st.pts.map(ht=>[(ht[0]-V[0])*tt,(ht[1]-V[1])*tt,(ht[2]-V[2])*tt])}))}function yn(x,E){let A=x.cap().slice(),z=a(Se.pos[0]-A[0],Se.pos[1]-A[1],Se.pos[2]-A[2])<.9,V={id:++ce,born:pe,kind:E,who:x.name,hash:`${I(4)}\u2026${I(4)}`,snap:de(x.snap(),z?Se.pos:null),src:x,start:[A[0],A[1]+.35,A[2]],spin:f()*u*2,state:null,wp:null};At.push(V),ve++,x.glow=1,ye.push({t:0,...x.ring()}),Oe.push({t:0,p:A});for(let tt=0;tt<56;tt++)qn({},!0,V,A)}function qn(x,E,A,z){let V=z||Li[f()*Li.length|0].emit(),tt=f()*u*2,st=E?1.4+f()*1.8:.2+f()*.5;return Object.assign(x,{x:V[0],y:V[1],z:V[2],vx:r(tt)*st,vy:E?f()*1.6:.3+f()*.6,vz:s(tt)*st,t:0,life:E?1.4+f()*.8:1.1+f()*1.6,tgt:A||At[At.length-1]||null,burst:E,heat:E?1:.35}),E&&se.push(x),x}for(let x=0;x<160;x++)Ht.push({x:(f()-.5)*13,y:f()*6.5,z:(f()-.5)*10,ph:f()*6.28,s:.4+f()*.8});let Nt={phase:"idle",t:0,next:17.5,victim:null};function hs(x){let E=x.filter(V=>!V.crate).map(V=>({...V,pts:V.pts.map(tt=>tt.slice())})),A=(V,tt)=>{for(let st=Math.floor(V.pts.length/2);st<V.pts.length;st++)V.pts[st][0]+=.14*tt,V.pts[st][1]+=.16*tt,V.pts[st][2]+=.1*tt},z=E[0];for(let V of E)V.pts.length>z.pts.length&&(z=V);return A(z,1),E.length>1&&A(E[E.length-1],-.8),E}function we(x){if(Nt.phase==="idle"){if(pe<Nt.next)return;let E=null,A=1/0;for(let z of At){let V=pe-z.born;if(V<5||V>13)continue;let tt=Zt(V),st=at(tt[0],tt[1],tt[2])[2];st<A&&(A=st,E=z)}if(!E){Nt.next=pe+1;return}Nt.victim=E,E.state="edited",E.edited=hs(E.snap),Nt.phase="glitch",Nt.t=0;return}if(Nt.t+=x,!At.includes(Nt.victim)){Nt.phase="idle",Nt.victim=null,Nt.next=pe+6;return}Nt.phase==="glitch"&&Nt.t>.7?(Nt.phase="broken",Nt.t=0):Nt.phase==="broken"&&Nt.t>2.8?(Nt.phase="restore",Nt.t=0):Nt.phase==="restore"&&(Nt.t>.8&&Nt.victim.state==="edited"&&(Nt.victim.state="restored",Oe.push({t:0,p:Nt.victim.wp,white:!0})),Nt.t>2&&(Nt.victim.state=null,Nt.victim=null,Nt.phase="idle",Nt.next=pe+10.5))}function Mn(x){let E=Nt.victim;if(!E||x.id<=E.id)return 0;let A=At[At.length-1].id;if(Nt.phase==="glitch")return 0;if(Nt.phase==="broken")return x.id<=E.id+(A-E.id+1)*g(Nt.t/1)?1:0;if(Nt.phase==="restore"){let z=E.id+(A-E.id+1)*g((Nt.t-.8)/.8);return x.id<=z?2:1}return 0}let pe=0,Se={pos:[0,0,0],yaw:0};function On(x){x<1.5||x>=12.45?(Se.pos=[Je.pos[0],Dt+.15,Je.pos[2]],Se.yaw=Je.yaw):x<3.9?(Se.pos=[Nn.tip[0],Nn.tip[1]+.09,Nn.tip[2]],Se.yaw=Nn.k.th):x<10.3?(Se.pos=[yt[0],.33,yt[2]],Se.yaw=-2.4):(Se.pos=[xn.pos[0],xn.pos[1]-.33,xn.pos[2]],Se.yaw=xn.yaw)}for(let x of Li)x.step(0,1/30);On(0);let bn=0,Vo=x=>Math.floor(x/W)*ct+b[x%W][0],pc=[];for(let x=0;x<340;x++)pc.push(qn({},!1));function Sf(x,E){x.t+=E;let A=x.tgt&&x.tgt.wp;if(A){let V=(x.burst?2.2:.9)+x.t*3.2,tt=A[0]-x.x,st=A[1]-x.y,ht=A[2]-x.z;x.vx+=(tt*V-ht*.9)*E,x.vy+=st*V*E,x.vz+=(ht*V+tt*.9)*E,tt*tt+st*st+ht*ht<.03&&(x.t=x.life)}else x.vy+=.4*E;let z=Math.exp(-2.4*E);x.vx*=z,x.vy*=z,x.vz*=z,x.x+=x.vx*E,x.y+=x.vy*E,x.z+=x.vz*E}function Mf(x){pe+=x;let E=pe%ct;for(let A of Li)A.step(E,x),A.glow*=Math.exp(-3*x);for(On(E);pe>=Vo(bn);){let[,A,z]=b[bn%W];yn(A,z),bn++}for(let A=At.length-1;A>=0;A--)pe-At[A].born>kt&&At.splice(A,1);for(let A of At)A.wp=Fn(A);we(x);for(let A of pc)Sf(A,x),A.t>=A.life&&qn(A,!1);for(let A=se.length-1;A>=0;A--)Sf(se[A],x),se[A].t>=se[A].life&&se.splice(A,1);for(let A=ye.length-1;A>=0;A--)(ye[A].t+=x)>.8&&ye.splice(A,1);for(let A=Oe.length-1;A>=0;A--)(Oe[A].t+=x)>.6&&Oe.splice(A,1)}function Qr(x){t.beginPath(),t.moveTo(x[0],x[1]);for(let E=2;E<x.length;E+=2)t.lineTo(x[E],x[E+1]);t.closePath()}function bf(x){x.sort((E,A)=>A.z-E.z),t.lineWidth=.8,t.lineJoin="round";for(let E of x)ag(E)}function ag(x){if(x.k===0)Qr(x.s),t.lineWidth=.8,t.fillStyle=x.fill,t.strokeStyle=x.fill,t.fill(),t.stroke();else if(x.k===1)fg(x.c);else if(x.k===2)dg(x);else if(x.k===3)pg(x);else if(x.k===4){let E=1-p((x.z-8.5)/8,0,.7);t.strokeStyle=v(d,.38*x.a*E),t.lineWidth=1.2,t.beginPath(),t.moveTo(x.s[0],x.s[1]),t.lineTo(x.s[2],x.s[3]),t.stroke()}}function zs(x,E,A,z,V,tt=0){let st=[];for(let ht=0;ht<=V;ht++){let mt=tt+ht/V*u*2;at(x+r(mt)*z,E,A+s(mt)*z),st.push(K[0],K[1])}return st}function us(x,E){t.beginPath(),t.moveTo(x[0],x[1]);for(let A=2;A<x.length;A+=2)t.lineTo(x[A],x[A+1]);E&&t.closePath(),t.stroke()}function lg(){let x=at(0,0,0,[0,0,0]),E=at(3.2,0,0,[0,0,0]),A=at(0,0,3.2,[0,0,0]),z=at(0,0,-3.2,[0,0,0]),V=h(20,a(E[0]-x[0],E[1]-x[1])),tt=h(8,Math.abs(A[1]-z[1])/2);t.save(),t.translate(x[0],x[1]),t.scale(1,tt/V);let st=t.createRadialGradient(0,0,0,0,0,V*1.6);st.addColorStop(0,"rgba(229,72,77,0.22)"),st.addColorStop(.45,"rgba(229,72,77,0.07)"),st.addColorStop(1,"rgba(229,72,77,0)"),t.fillStyle=st,t.beginPath(),t.arc(0,0,V*1.6,0,u*2),t.fill(),t.restore();let ht=[[],[],[],[],[]],mt=10,Vt=[0,0,0],Qt=[0,0,0],me=(ie,Ee,We,Ui)=>{let fs=a((ie+We)/2,(Ee+Ui)/2),Go=Math.floor((1-fs/10)*5);Go<0||(at(ie,0,Ee,Vt),at(We,0,Ui,Qt),!(Vt[2]<.4||Qt[2]<.4)&&ht[c(4,Go)].push(Vt[0],Vt[1],Qt[0],Qt[1]))};for(let ie=-mt;ie<=mt;ie++)for(let Ee=-mt;Ee<mt;Ee++)me(ie,Ee,ie,Ee+1),me(Ee,ie,Ee+1,ie);t.lineWidth=1;for(let ie=0;ie<5;ie++){let Ee=ht[ie];if(Ee.length){t.strokeStyle=`rgba(150,152,168,${(.03+ie*.045).toFixed(3)})`,t.beginPath();for(let We=0;We<Ee.length;We+=4)t.moveTo(Ee[We],Ee[We+1]),t.lineTo(Ee[We+2],Ee[We+3]);t.stroke()}}}function cg(){t.save(),t.lineWidth=1,t.setLineDash([6,7]),t.strokeStyle="rgba(229,72,77,0.3)",us(zs(0,.004,0,Mt-.4,80),!0),us(zs(0,.004,0,Mt+.4,80),!0),t.setLineDash([2,6]),t.strokeStyle="rgba(190,188,182,0.32)";let x=[];for(let E=0;E<=36;E++){let A=wt(Pt,y(Ut-.1,Xt+.1,E/36),.004);at(A[0],A[1],A[2]),x.push(K[0],K[1])}us(x),t.restore()}function hg(){ee=[],q(P(0,.09,0),1.95,.18,48,gt.dais,0,ee),bf(ee);let x=.181;t.lineWidth=1.4,t.strokeStyle="rgba(255,99,105,0.75)",us(zs(0,x,0,1.93,64),!0),t.lineWidth=1,t.strokeStyle="rgba(229,72,77,0.45)",us(zs(0,x,0,1.78,64),!0),t.strokeStyle="rgba(229,72,77,0.28)",us(zs(0,x,0,1.05,48),!0),t.strokeStyle="rgba(255,120,125,0.55)",t.beginPath();let E=[0,0,0],A=[0,0,0];for(let z=0;z<72;z++){let V=pe*.12+z/72*u*2,tt=z%6===0;at(r(V)*1.3,x,s(V)*1.3,E),at(r(V)*(tt?1.55:1.42),x,s(V)*(tt?1.55:1.42),A),t.moveTo(E[0],E[1]),t.lineTo(A[0],A[1])}t.stroke();for(let z of[{th:-2.4,r:1.5}]){let V=ft(P(z.r*r(z.th),x,-z.r*s(z.th)),Q(z.th)),tt=[];for(let[st,ht]of[[-.24,-.24],[.24,-.24],[.24,.24],[-.24,.24]]){let mt=Rt(V,st,0,ht);at(mt[0],mt[1],mt[2]),tt.push(K[0],K[1])}t.fillStyle="rgba(229,72,77,0.08)",t.strokeStyle="rgba(255,99,105,0.6)",Qr(tt),t.fill(),t.stroke()}}function ug(x,E){return x.state==="edited"?Nt.phase==="glitch"&&f()<.5?[255,255,255]:w:x.state==="restored"?L([255,255,255],d,g((Nt.t-.8)/1.2)):L([255,240,240],d,g(E/1.6))}function fg(x){let E=pe-x.born,A=c(1,(kt-E)/4)*c(1,E/.25);if(A<=0)return;let z=g(E/.5),V=x.wp;x.state==="edited"&&(Nt.phase==="glitch"||Nt.t<.4)&&(V=[V[0]+(f()-.5)*.12,V[1]+(f()-.5)*.06,V[2]+(f()-.5)*.12]);let tt=ft(Q(x.spin+E*.5),pt(.32)),st=ft(P(V[0],V[1],V[2]),tt,H($t*z)),ht=ug(x,E),mt=1-p((x.z-8.5)/10,0,.55),Vt=A*mt,Qt=at(V[0],V[1],V[2],[0,0,0]),me=$t*z*S/Qt[2];t.globalCompositeOperation="lighter";let ie=t.createRadialGradient(Qt[0],Qt[1],0,Qt[0],Qt[1],me*1.5);ie.addColorStop(0,v(ht,.26*Vt)),ie.addColorStop(1,v(ht,0)),t.fillStyle=ie,t.beginPath(),t.arc(Qt[0],Qt[1],me*1.5,0,u*2),t.fill(),t.globalCompositeOperation="source-over";let Ee=[];for(let Ve=0;Ve<8;Ve++){let _e=Rt(st,Ve&1?.5:-.5,Ve&2?.5:-.5,Ve&4?.5:-.5);at(_e[0],_e[1],_e[2]),Ee.push([K[0],K[1]])}let We=Lt.map(([Ve,_e])=>{let Be=Gt(tt,_e[0],_e[1],_e[2]),on=Rt(st,_e[0]*.5,_e[1]*.5,_e[2]*.5),Wo=Be[0]*(on[0]-F.ex)+Be[1]*(on[1]-F.ey)+Be[2]*(on[2]-F.ez)<0;return{pts:Ve.flatMap(Xo=>Ee[Xo]),front:Wo,up:Be[1]}});t.lineWidth=1;for(let Ve of We)Ve.front||(Qr(Ve.pts),t.fillStyle=v(ht,.05*Vt),t.fill(),t.strokeStyle=v(ht,.32*Vt),t.stroke());let Ui=x.state==="edited"?x.edited:x.snap,fs=x.state==="edited"?[255,90,90]:[255,226,226];t.strokeStyle=v(fs,.92*Vt),t.lineWidth=h(1,me*.07);let Go=h(1,me*.055);for(let Ve of Ui){let _e=[];for(let Be of Ve.pts){let on=Rt(st,Be[0],Be[1],Be[2]);at(on[0],on[1],on[2]),_e.push(K[0],K[1])}if(Ve.crate){t.fillStyle=v([235,230,220],.55*Vt),Qr(_e),t.fill();continue}t.beginPath(),t.moveTo(_e[0],_e[1]);for(let Be=2;Be<_e.length;Be+=2)t.lineTo(_e[Be],_e[Be+1]);if(Ve.loop&&t.closePath(),t.stroke(),Ve.joints){t.fillStyle=v(fs,Vt);for(let Be=2;Be<_e.length;Be+=2)t.beginPath(),t.arc(_e[Be],_e[Be+1],Go,0,u*2),t.fill()}}for(let Ve of We)Ve.front&&(Qr(Ve.pts),t.fillStyle=v(ht,(Ve.up>.3?.16:.08)*Vt),t.fill(),t.strokeStyle=v(ht,.95*Vt),t.lineWidth=1.3,t.stroke());if(x.state==="edited"&&Nt.phase!=="glitch"){let _e=(We.find(on=>on.front)||We[0]).pts;t.strokeStyle=v([255,200,200],Vt),t.lineWidth=1.4,t.beginPath();let Be=6;for(let on=0;on<=Be;on++){let Wo=on/Be,Xo=y(y(_e[0],_e[2],.15),y(_e[4],_e[6],.85),Wo)+(on%2?1:-1)*me*.12,Rf=y(y(_e[1],_e[3],.15),y(_e[5],_e[7],.85),Wo);on===0?t.moveTo(Xo,Rf):t.lineTo(Xo,Rf)}t.stroke()}x.sx=Qt[0],x.sy=Qt[1],x.rad=me,x.al=Vt}function dg(x){let{a:E,b:A}=x,z=Mn(A),V=c(E.al??1,A.al??1),tt=at(E.wp[0],E.wp[1],E.wp[2],[0,0,0]),st=at(A.wp[0],A.wp[1],A.wp[2],[0,0,0]),ht=d,mt=.5;if(z===1&&(ht=w,mt=.55+.45*(f()<.3?0:1)),z===2&&(ht=[255,235,235],mt=.9),t.strokeStyle=v(ht,mt*V),t.lineWidth=z===1?1.6:1.2,z===1&&t.setLineDash([5,4]),t.beginPath(),t.moveTo(tt[0],tt[1]),t.lineTo(st[0],st[1]),t.stroke(),t.setLineDash([]),z!==1){let Vt=(pe*.9+A.id*.37)%1,Qt=y(st[0],tt[0],Vt),me=y(st[1],tt[1],Vt);t.fillStyle=v([255,210,210],.9*V),t.beginPath(),t.arc(Qt,me,1.8,0,u*2),t.fill()}}function pg(x){let{c:E}=x,A=(pe-E.born)/Ft,z=E.src.cap(),V=at(z[0],z[1],z[2],[0,0,0]),tt=at(E.wp[0],E.wp[1],E.wp[2],[0,0,0]),st=t.createLinearGradient(V[0],V[1],tt[0],tt[1]);st.addColorStop(0,v([255,120,125],.7*(1-A))),st.addColorStop(1,v([255,230,230],.9*(1-A))),t.strokeStyle=st,t.lineWidth=1.2,t.beginPath(),t.moveTo(V[0],V[1]),t.lineTo(tt[0],tt[1]),t.stroke()}function Tf(x,E){t.globalCompositeOperation="lighter";let A=[0,0,0];for(let z of x){if(at(z.x,z.y,z.z,A),A[2]<.5)continue;let V=c(1,z.t/.2)*c(1,(z.life-z.t)/.4),tt=p(.05*S/A[2],.8,3.4);t.globalAlpha=p(V*E,0,1),t.fillStyle=z.burst?"#fff1f1":z.heat>.6?"#ffb3b6":"#ff5a60",t.fillRect(A[0]-tt/2,A[1]-tt/2,tt,tt)}t.globalAlpha=1,t.globalCompositeOperation="source-over"}function mg(){t.globalCompositeOperation="lighter";let x=[0,0,0];for(let E of Ht){let A=(E.y+pe*.06*E.s)%6.5;if(at(E.x+s(pe*.2+E.ph)*.3,A,E.z,x),x[2]<.5)continue;let z=.35+.65*Math.abs(s(pe*.8+E.ph)),V=p(.035*S/x[2],.6,2.4);t.fillStyle=`rgba(255,120,125,${(.4*z).toFixed(3)})`,t.fillRect(x[0],x[1],V,V)}t.globalCompositeOperation="source-over"}function gg(){for(let x of ye){let E=x.t/.8;t.strokeStyle=v([255,99,105],.85*(1-E)),t.lineWidth=1.6,us(zs(x.c[0],y(x.y0,x.y1,g(E)),x.c[1],x.r*(1+E*.5),40),!0)}t.globalCompositeOperation="lighter";for(let x of Oe){if(!x.p)continue;let E=x.t/.6,A=at(x.p[0],x.p[1],x.p[2],[0,0,0]),z=(x.white?1.4:.8)*S/A[2]*(.4+E),V=t.createRadialGradient(A[0],A[1],0,A[0],A[1],z);V.addColorStop(0,x.white?v([255,255,255],.8*(1-E)):v([255,200,200],.7*(1-E))),V.addColorStop(1,"rgba(255,99,105,0)"),t.fillStyle=V,t.beginPath(),t.arc(A[0],A[1],z,0,u*2),t.fill()}if(t.globalCompositeOperation="source-over",Nt.phase==="restore"&&Nt.victim&&Nt.t<1){let x=Nt.victim,E=g(Nt.t/.8),A=[x.wp[0],x.wp[1]+(1-E)*2.2,x.wp[2]],z=ft(P(A[0],A[1],A[2]),Q(x.spin+(pe-x.born)*.5),pt(.32),H($t*1.08)),V=[];for(let ht=0;ht<8;ht++){let mt=Rt(z,ht&1?.5:-.5,ht&2?.5:-.5,ht&4?.5:-.5);at(mt[0],mt[1],mt[2]),V.push([K[0],K[1]])}t.strokeStyle=v([255,255,255],.95*(1-h(0,Nt.t-.8)/.2)),t.lineWidth=1.5,t.beginPath();for(let[ht,mt]of[[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[1,5],[2,6],[3,7]])t.moveTo(V[ht][0],V[ht][1]),t.lineTo(V[mt][0],V[mt][1]);t.stroke();let tt=at(A[0],A[1]+2.4,A[2],[0,0,0]),st=t.createLinearGradient(tt[0],tt[1],V[0][0],V[0][1]);st.addColorStop(0,"rgba(255,255,255,0)"),st.addColorStop(1,"rgba(255,255,255,0.35)"),t.strokeStyle=st,t.beginPath(),t.moveTo(tt[0],tt[1]),t.lineTo(V[2][0],V[2][1]),t.stroke()}}function Ho(x){"letterSpacing"in t&&(t.letterSpacing=x)}function mc(x,E,A,z,V){if(!M||!x.sx||V<=0)return;let tt=M?11:10;t.font=T(tt),Ho("0.08em");let st=h(t.measureText(E).width,A?t.measureText(A).width:0),ht=x.sx+x.rad+52+st<R-12,mt=ht?1:-1,Vt=x.sx+mt*x.rad*.8,Qt=x.sy-x.rad*.5,me=Vt+mt*26,ie=Qt-22;t.globalAlpha=V,t.strokeStyle=v(z,.8),t.lineWidth=1,t.beginPath(),t.moveTo(Vt,Qt),t.lineTo(me,ie),t.lineTo(me+mt*10,ie),t.stroke(),t.textAlign=ht?"left":"right",t.textBaseline="middle";let Ee=ht?me+mt*8:me+mt*8-st-12;t.fillStyle="rgba(10,10,11,0.78)",t.fillRect(Ee,ie-tt*.9,st+12,(A?tt*2+4:tt)+tt*.8),t.fillStyle=v(z,1),t.fillText(E,me+mt*14,ie),A&&(t.fillStyle="rgba(166,164,158,0.9)",t.fillText(A,me+mt*14,ie+tt+4)),Ho("0px"),t.globalAlpha=1}function xg(){let x=At[At.length-1];if(x&&Nt.victim!==x){let mt=pe-x.born,Vt=p((mt-Ft+.1)/.25,0,1)*p((Ft+1.5-mt)/.3,0,1);mc(x,`#0${x.id}  ${x.who} \xB7 ${x.kind}`,M?`sha256 ${x.hash}  SEALED`:null,[255,140,144],Vt)}let E=Nt.victim;E&&(Nt.phase!=="restore"?mc(E,`#0${E.id}  ${E.who} RECORD EDITED`,"hash mismatch: chain broken",w,Nt.phase==="glitch"?f()<.5?1:.3:1):mc(E,`#0${E.id}  RESTORED`,"from the sealed copy",[255,255,255],p((Nt.t-.7)/.2,0,1)));let A=at(0,0,3.1,[0,0,0]),z=c(A[1]+30,D-(M?120:40)),V=`CHAIN INTACT  \xB7  ${Li.length} MACHINES  \xB7  ${ve.toLocaleString("en-US")} EVENTS SEALED`,tt=[255,140,144];E&&Nt.phase==="broken"&&(V=`CHAIN BROKEN AT #0${E.id}`,tt=w),E&&Nt.phase==="restore"&&(V="VERIFIED AGAINST THE SEALED COPY",tt=[255,255,255]),t.font=T(M?11:10),Ho("0.14em"),t.textAlign="center",t.textBaseline="middle";let st=t.measureText(V).width,ht=.55+.45*s(pe*4);t.fillStyle=v(tt,ht),t.beginPath(),t.arc(A[0]-st/2-12,z,3,0,u*2),t.fill(),t.fillStyle=v(tt,.95),t.fillText(V,A[0],z),Ho("0px")}function gc(){t.clearRect(0,0,R,D);let x=.12+s(pe*.06)*.22+rt*.2;J(x,-B*.7),t.globalAlpha=1,lg(),cg(),mg(),hg(),zt=[];for(let z of Li)z.build();_(ft(P(Se.pos[0],Se.pos[1],Se.pos[2]),Q(Se.yaw)),.3,.3,.3,gt.crate);let E=[0,0,0],A=[0,0,0];for(let z=0;z<90;z++){let V=z/90*kt,tt=(z+1)/90*kt,st=Zt(V),ht=Zt(tt);at(st[0],st[1],st[2],E),at(ht[0],ht[1],ht[2],A),zt.push({k:4,z:(E[2]+A[2])/2+.3,s:[E[0],E[1],A[0],A[1]],a:c(1,V/2,(kt-tt)/4)})}for(let z=0;z<At.length;z++){let V=At[z];if(V.z=at(V.wp[0],V.wp[1],V.wp[2])[2],zt.push({k:1,z:V.z,c:V}),z>0){let tt=At[z-1];pe-V.born>=Ft*.8&&zt.push({k:2,z:(tt.z+V.z)/2+.01,a:tt,b:V})}pe-V.born<Ft&&zt.push({k:3,z:V.z-.01,c:V})}bf(zt),gg(),Tf(pc,.75),Tf(se,1),xg()}let wf=parseFloat(new URLSearchParams(location.search).get("witness_t")),yg=24+(wf>0?wf:0);Nt.next=28;for(let x=0;x<yg*30;x++)x%6===0&&J(.12,0),Mf(1/30);$=!0;let Ef=!0;if(new IntersectionObserver(([x])=>{Ef=x.isIntersecting},{threshold:.02}).observe(n),e){gc();return}let Af=performance.now(),Cf=x=>{let E=Math.min(.05,Math.max(0,(x-Af)/1e3));Af=x,Ef&&!document.hidden&&(rt+=(et-rt)*.05,B+=(N-B)*.05,Mf(E),gc()),requestAnimationFrame(Cf)};requestAnimationFrame(Cf)}var ey=0,Op=1,ny=2;var Ym=1,iy=2,Si=3,es=0,mn=1,bi=2,ji=0,wr=1,Bp=2,zp=3,kp=4,sy=5,Ts=100,ry=101,oy=102,ay=103,ly=104,cy=200,hy=201,uy=202,fy=203,Ah=204,Ch=205,dy=206,py=207,my=208,gy=209,xy=210,yy=211,_y=212,vy=213,Sy=214,Rh=0,Ph=1,Ih=2,Pr=3,Dh=4,Lh=5,Uh=6,Nh=7,qm=0,My=1,by=2,ts=0,Ty=1,wy=2,Ey=3,Ay=4,Cy=5,Ry=6,Py=7;var $m=300,Ir=301,Dr=302,Fh=303,Oh=304,ql=306,Bh=1e3,Es=1001,zh=1002,Gn=1003,Iy=1004;var Ha=1005;var ei=1006,Zc=1007;var As=1008;var Ai=1009,Zm=1010,Km=1011,bo=1012,Vu=1013,Cs=1014,Ti=1015,Co=1016,Hu=1017,Gu=1018,Lr=1020,Jm=35902,Qm=1021,jm=1022,Hn=1023,t0=1024,e0=1025,Er=1026,Ur=1027,n0=1028,Wu=1029,i0=1030,Xu=1031;var Yu=1033,ml=33776,gl=33777,xl=33778,yl=33779,kh=35840,Vh=35841,Hh=35842,Gh=35843,Wh=36196,Xh=37492,Yh=37496,qh=37808,$h=37809,Zh=37810,Kh=37811,Jh=37812,Qh=37813,jh=37814,tu=37815,eu=37816,nu=37817,iu=37818,su=37819,ru=37820,ou=37821,_l=36492,au=36494,lu=36495,s0=36283,cu=36284,hu=36285,uu=36286;var vl=2300,fu=2301,Kc=2302,Vp=2400,Hp=2401,Gp=2402;var Dy=3200,Ly=3201;var r0=0,Uy=1,Ji="",Cn="srgb",kr="srgb-linear",$l="linear",Me="srgb";var cr=7680;var Wp=519,Ny=512,Fy=513,Oy=514,o0=515,By=516,zy=517,ky=518,Vy=519,Xp=35044;var Yp="300 es",wi=2e3,Sl=2001,ns=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qp=1234567,Ar=Math.PI/180,To=180/Math.PI;function Vr(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]+"-"+tn[t&255]+tn[t>>8&255]+"-"+tn[t>>16&15|64]+tn[t>>24&255]+"-"+tn[e&63|128]+tn[e>>8&255]+"-"+tn[e>>16&255]+tn[e>>24&255]+tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]).toLowerCase()}function hn(n,t,e){return Math.max(t,Math.min(e,n))}function qu(n,t){return(n%t+t)%t}function Hy(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Gy(n,t,e){return n!==t?(e-n)/(t-n):0}function So(n,t,e){return(1-e)*n+e*t}function Wy(n,t,e,i){return So(n,t,1-Math.exp(-e*i))}function Xy(n,t=1){return t-Math.abs(qu(n,t*2)-t)}function Yy(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function qy(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function $y(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Zy(n,t){return n+Math.random()*(t-n)}function Ky(n){return n*(.5-Math.random())}function Jy(n){n!==void 0&&(qp=n);let t=qp+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Qy(n){return n*Ar}function jy(n){return n*To}function t_(n){return(n&n-1)===0&&n!==0}function e_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function n_(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function i_(n,t,e,i,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),h=o((t+i)/2),u=r((t-i)/2),f=o((t-i)/2),p=r((i-t)/2),g=o((i-t)/2);switch(s){case"XYX":n.set(a*h,l*u,l*f,a*c);break;case"YZY":n.set(l*f,a*h,l*u,a*c);break;case"ZXZ":n.set(l*u,l*f,a*h,a*c);break;case"XZX":n.set(a*h,l*g,l*p,a*c);break;case"YXY":n.set(l*p,a*h,l*g,a*c);break;case"ZYZ":n.set(l*g,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function br(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ln(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var a0={DEG2RAD:Ar,RAD2DEG:To,generateUUID:Vr,clamp:hn,euclideanModulo:qu,mapLinear:Hy,inverseLerp:Gy,lerp:So,damp:Wy,pingpong:Xy,smoothstep:Yy,smootherstep:qy,randInt:$y,randFloat:Zy,randFloatSpread:Ky,seededRandom:Jy,degToRad:Qy,radToDeg:jy,isPowerOfTwo:t_,ceilPowerOfTwo:e_,floorPowerOfTwo:n_,setQuaternionFromProperEuler:i_,normalize:ln,denormalize:br},ge=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(hn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},te=class n{constructor(t,e,i,s,r,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],p=i[5],g=i[8],y=s[0],m=s[3],d=s[6],w=s[1],T=s[4],v=s[7],L=s[2],I=s[5],R=s[8];return r[0]=o*y+a*w+l*L,r[3]=o*m+a*T+l*I,r[6]=o*d+a*v+l*R,r[1]=c*y+h*w+u*L,r[4]=c*m+h*T+u*I,r[7]=c*d+h*v+u*R,r[2]=f*y+p*w+g*L,r[5]=f*m+p*T+g*I,r[8]=f*d+p*v+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*r,p=c*r-o*l,g=e*u+i*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return t[0]=u*y,t[1]=(s*c-h*i)*y,t[2]=(a*i-s*o)*y,t[3]=f*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-a*e)*y,t[6]=p*y,t[7]=(i*l-c*e)*y,t[8]=(o*e-i*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Jc.makeScale(t,e)),this}rotate(t){return this.premultiply(Jc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Jc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Jc=new te;function l0(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ml(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function s_(){let n=Ml("canvas");return n.style.display="block",n}var $p={};function _o(n){n in $p||($p[n]=!0,console.warn(n))}function r_(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function o_(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function a_(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var fe={enabled:!0,workingColorSpace:kr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Me&&(n.r=Ei(n.r),n.g=Ei(n.g),n.b=Ei(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Me&&(n.r=Cr(n.r),n.g=Cr(n.g),n.b=Cr(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ji?$l:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Ei(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Cr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Zp=[.64,.33,.3,.6,.15,.06],Kp=[.2126,.7152,.0722],Jp=[.3127,.329],Qp=new te().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jp=new te().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);fe.define({[kr]:{primaries:Zp,whitePoint:Jp,transfer:$l,toXYZ:Qp,fromXYZ:jp,luminanceCoefficients:Kp,workingColorSpaceConfig:{unpackColorSpace:Cn},outputColorSpaceConfig:{drawingBufferColorSpace:Cn}},[Cn]:{primaries:Zp,whitePoint:Jp,transfer:Me,toXYZ:Qp,fromXYZ:jp,luminanceCoefficients:Kp,outputColorSpaceConfig:{drawingBufferColorSpace:Cn}}});var hr,du=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{hr===void 0&&(hr=Ml("canvas")),hr.width=t.width,hr.height=t.height;let i=hr.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=hr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ml("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ei(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ei(e[i]/255)*255):e[i]=Ei(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},l_=0,bl=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:l_++}),this.uuid=Vr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Qc(s[o].image)):r.push(Qc(s[o]))}else r=Qc(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Qc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?du.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var c_=0,Pn=class n extends ns{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Es,s=Es,r=ei,o=As,a=Hn,l=Ai,c=n.DEFAULT_ANISOTROPY,h=Ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:c_++}),this.uuid=Vr(),this.name="",this.source=new bl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new te,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$m)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Bh:t.x=t.x-Math.floor(t.x);break;case Es:t.x=t.x<0?0:1;break;case zh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Bh:t.y=t.y-Math.floor(t.y);break;case Es:t.y=t.y<0?0:1;break;case zh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Pn.DEFAULT_IMAGE=null;Pn.DEFAULT_MAPPING=$m;Pn.DEFAULT_ANISOTROPY=1;var be=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],g=l[9],y=l[2],m=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(c+1)/2,v=(p+1)/2,L=(d+1)/2,I=(h+f)/4,R=(u+y)/4,D=(g+m)/4;return T>v&&T>L?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=I/i,r=R/i):v>L?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=I/s,r=D/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=R/r,s=D/r),this.set(i,s,r,e),this}let w=Math.sqrt((m-g)*(m-g)+(u-y)*(u-y)+(f-h)*(f-h));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(u-y)/w,this.z=(f-h)/w,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},pu=class extends ns{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ei,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new Pn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new bl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ci=class extends pu{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Tl=class extends Pn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Gn,this.minFilter=Gn,this.wrapR=Es,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var mu=class extends Pn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Gn,this.minFilter=Gn,this.wrapR=Es,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var is=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],f=r[o+0],p=r[o+1],g=r[o+2],y=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=y;return}if(u!==y||l!==f||c!==p||h!==g){let m=1-a,d=l*f+c*p+h*g+u*y,w=d>=0?1:-1,T=1-d*d;if(T>Number.EPSILON){let L=Math.sqrt(T),I=Math.atan2(L,d*w);m=Math.sin(m*I)/L,a=Math.sin(a*I)/L}let v=a*w;if(l=l*m+f*v,c=c*m+p*v,h=h*m+g*v,u=u*m+y*v,m===1-a){let L=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=L,c*=L,h*=L,u*=L}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*p-c*f,t[e+1]=l*g+h*f+c*u-a*p,t[e+2]=c*g+h*p+a*f-l*u,t[e+3]=h*g-a*u-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),u=a(r/2),f=l(i/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"YZX":this._x=f*h*u+c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u-f*p*g;break;case"XZY":this._x=f*h*u-c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+a+u;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>u){let p=2*Math.sqrt(1+i-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>u){let p=2*Math.sqrt(1+a-i-u);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(hn(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},G=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(tm.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(tm.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return jc.copy(this).projectOnVector(t),this.sub(jc)}reflect(t){return this.sub(jc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(hn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},jc=new G,tm=new is,Rs=class{constructor(t=new G(1/0,1/0,1/0),e=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(zn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(zn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=zn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,zn):zn.fromBufferAttribute(r,o),zn.applyMatrix4(t.matrixWorld),this.expandByPoint(zn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ga.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ga.copy(i.boundingBox)),Ga.applyMatrix4(t.matrixWorld),this.union(Ga)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,zn),zn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fo),Wa.subVectors(this.max,fo),ur.subVectors(t.a,fo),fr.subVectors(t.b,fo),dr.subVectors(t.c,fo),Xi.subVectors(fr,ur),Yi.subVectors(dr,fr),xs.subVectors(ur,dr);let e=[0,-Xi.z,Xi.y,0,-Yi.z,Yi.y,0,-xs.z,xs.y,Xi.z,0,-Xi.x,Yi.z,0,-Yi.x,xs.z,0,-xs.x,-Xi.y,Xi.x,0,-Yi.y,Yi.x,0,-xs.y,xs.x,0];return!th(e,ur,fr,dr,Wa)||(e=[1,0,0,0,1,0,0,0,1],!th(e,ur,fr,dr,Wa))?!1:(Xa.crossVectors(Xi,Yi),e=[Xa.x,Xa.y,Xa.z],th(e,ur,fr,dr,Wa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,zn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(zn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(gi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},gi=[new G,new G,new G,new G,new G,new G,new G,new G],zn=new G,Ga=new Rs,ur=new G,fr=new G,dr=new G,Xi=new G,Yi=new G,xs=new G,fo=new G,Wa=new G,Xa=new G,ys=new G;function th(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){ys.fromArray(n,r);let a=s.x*Math.abs(ys.x)+s.y*Math.abs(ys.y)+s.z*Math.abs(ys.z),l=t.dot(ys),c=e.dot(ys),h=i.dot(ys);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var h_=new Rs,po=new G,eh=new G,Nr=class{constructor(t=new G,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):h_.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;po.subVectors(t,this.center);let e=po.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(po,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(eh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(po.copy(t.center).add(eh)),this.expandByPoint(po.copy(t.center).sub(eh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},xi=new G,nh=new G,Ya=new G,qi=new G,ih=new G,qa=new G,sh=new G,wl=class{constructor(t=new G,e=new G(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=xi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(xi.copy(this.origin).addScaledVector(this.direction,e),xi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){nh.copy(t).add(e).multiplyScalar(.5),Ya.copy(e).sub(t).normalize(),qi.copy(this.origin).sub(nh);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ya),a=qi.dot(this.direction),l=-qi.dot(Ya),c=qi.lengthSq(),h=Math.abs(1-o*o),u,f,p,g;if(h>0)if(u=o*l-a,f=o*a-l,g=r*h,u>=0)if(f>=-g)if(f<=g){let y=1/h;u*=y,f*=y,p=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(nh).addScaledVector(Ya,f),p}intersectSphere(t,e){xi.subVectors(t.center,this.origin);let i=xi.dot(this.direction),s=xi.dot(xi)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,xi)!==null}intersectTriangle(t,e,i,s,r){ih.subVectors(e,t),qa.subVectors(i,t),sh.crossVectors(ih,qa);let o=this.direction.dot(sh),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;qi.subVectors(this.origin,t);let l=a*this.direction.dot(qa.crossVectors(qi,qa));if(l<0)return null;let c=a*this.direction.dot(ih.cross(qi));if(c<0||l+c>o)return null;let h=-a*qi.dot(sh);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},De=class n{constructor(t,e,i,s,r,o,a,l,c,h,u,f,p,g,y,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,h,u,f,p,g,y,m)}set(t,e,i,s,r,o,a,l,c,h,u,f,p,g,y,m){let d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=y,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/pr.setFromMatrixColumn(t,0).length(),r=1/pr.setFromMatrixColumn(t,1).length(),o=1/pr.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,p=o*u,g=a*h,y=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=f-y*c,e[9]=-a*l,e[2]=y-f*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){let f=l*h,p=l*u,g=c*h,y=c*u;e[0]=f+y*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=y+f*a,e[10]=o*l}else if(t.order==="ZXY"){let f=l*h,p=l*u,g=c*h,y=c*u;e[0]=f-y*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=y-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let f=o*h,p=o*u,g=a*h,y=a*u;e[0]=l*h,e[4]=g*c-p,e[8]=f*c+y,e[1]=l*u,e[5]=y*c+f,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let f=o*l,p=o*c,g=a*l,y=a*c;e[0]=l*h,e[4]=y-f*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+g,e[10]=f-y*u}else if(t.order==="XZY"){let f=o*l,p=o*c,g=a*l,y=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+y,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=y*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(u_,t,f_)}lookAt(t,e,i){let s=this.elements;return _n.subVectors(t,e),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),$i.crossVectors(i,_n),$i.lengthSq()===0&&(Math.abs(i.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),$i.crossVectors(i,_n)),$i.normalize(),$a.crossVectors(_n,$i),s[0]=$i.x,s[4]=$a.x,s[8]=_n.x,s[1]=$i.y,s[5]=$a.y,s[9]=_n.y,s[2]=$i.z,s[6]=$a.z,s[10]=_n.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],p=i[13],g=i[2],y=i[6],m=i[10],d=i[14],w=i[3],T=i[7],v=i[11],L=i[15],I=s[0],R=s[4],D=s[8],M=s[12],S=s[1],U=s[5],Y=s[9],$=s[13],Z=s[2],rt=s[6],B=s[10],et=s[14],N=s[3],F=s[7],J=s[11],K=s[15];return r[0]=o*I+a*S+l*Z+c*N,r[4]=o*R+a*U+l*rt+c*F,r[8]=o*D+a*Y+l*B+c*J,r[12]=o*M+a*$+l*et+c*K,r[1]=h*I+u*S+f*Z+p*N,r[5]=h*R+u*U+f*rt+p*F,r[9]=h*D+u*Y+f*B+p*J,r[13]=h*M+u*$+f*et+p*K,r[2]=g*I+y*S+m*Z+d*N,r[6]=g*R+y*U+m*rt+d*F,r[10]=g*D+y*Y+m*B+d*J,r[14]=g*M+y*$+m*et+d*K,r[3]=w*I+T*S+v*Z+L*N,r[7]=w*R+T*U+v*rt+L*F,r[11]=w*D+T*Y+v*B+L*J,r[15]=w*M+T*$+v*et+L*K,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],p=t[14],g=t[3],y=t[7],m=t[11],d=t[15];return g*(+r*l*u-s*c*u-r*a*f+i*c*f+s*a*p-i*l*p)+y*(+e*l*p-e*c*f+r*o*f-s*o*p+s*c*h-r*l*h)+m*(+e*c*u-e*a*p-r*o*u+i*o*p+r*a*h-i*c*h)+d*(-s*a*h-e*l*u+e*a*f+s*o*u-i*o*f+i*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],p=t[11],g=t[12],y=t[13],m=t[14],d=t[15],w=u*m*c-y*f*c+y*l*p-a*m*p-u*l*d+a*f*d,T=g*f*c-h*m*c-g*l*p+o*m*p+h*l*d-o*f*d,v=h*y*c-g*u*c+g*a*p-o*y*p-h*a*d+o*u*d,L=g*u*l-h*y*l-g*a*f+o*y*f+h*a*m-o*u*m,I=e*w+i*T+s*v+r*L;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/I;return t[0]=w*R,t[1]=(y*f*r-u*m*r-y*s*p+i*m*p+u*s*d-i*f*d)*R,t[2]=(a*m*r-y*l*r+y*s*c-i*m*c-a*s*d+i*l*d)*R,t[3]=(u*l*r-a*f*r-u*s*c+i*f*c+a*s*p-i*l*p)*R,t[4]=T*R,t[5]=(h*m*r-g*f*r+g*s*p-e*m*p-h*s*d+e*f*d)*R,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*d-e*l*d)*R,t[7]=(o*f*r-h*l*r+h*s*c-e*f*c-o*s*p+e*l*p)*R,t[8]=v*R,t[9]=(g*u*r-h*y*r-g*i*p+e*y*p+h*i*d-e*u*d)*R,t[10]=(o*y*r-g*a*r+g*i*c-e*y*c-o*i*d+e*a*d)*R,t[11]=(h*a*r-o*u*r-h*i*c+e*u*c+o*i*p-e*a*p)*R,t[12]=L*R,t[13]=(h*y*s-g*u*s+g*i*f-e*y*f-h*i*m+e*u*m)*R,t[14]=(g*a*s-o*y*s-g*i*l+e*y*l+o*i*m-e*a*m)*R,t[15]=(o*u*s-h*a*s+h*i*l-e*u*l-o*i*f+e*a*f)*R,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,f=r*c,p=r*h,g=r*u,y=o*h,m=o*u,d=a*u,w=l*c,T=l*h,v=l*u,L=i.x,I=i.y,R=i.z;return s[0]=(1-(y+d))*L,s[1]=(p+v)*L,s[2]=(g-T)*L,s[3]=0,s[4]=(p-v)*I,s[5]=(1-(f+d))*I,s[6]=(m+w)*I,s[7]=0,s[8]=(g+T)*R,s[9]=(m-w)*R,s[10]=(1-(f+y))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=pr.set(s[0],s[1],s[2]).length(),o=pr.set(s[4],s[5],s[6]).length(),a=pr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],kn.copy(this);let c=1/r,h=1/o,u=1/a;return kn.elements[0]*=c,kn.elements[1]*=c,kn.elements[2]*=c,kn.elements[4]*=h,kn.elements[5]*=h,kn.elements[6]*=h,kn.elements[8]*=u,kn.elements[9]*=u,kn.elements[10]*=u,e.setFromRotationMatrix(kn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=wi){let l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s),p,g;if(a===wi)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Sl)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=wi){let l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(o-r),f=(e+t)*c,p=(i+s)*h,g,y;if(a===wi)g=(o+r)*u,y=-2*u;else if(a===Sl)g=r*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},pr=new G,kn=new De,u_=new G(0,0,0),f_=new G(1,1,1),$i=new G,$a=new G,_n=new G,em=new De,nm=new is,ii=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(hn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-hn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(hn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-hn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(hn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-hn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return em.makeRotationFromQuaternion(t),this.setFromRotationMatrix(em,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return nm.setFromEuler(this),this.setFromQuaternion(nm,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ii.DEFAULT_ORDER="XYZ";var El=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},d_=0,im=new G,mr=new is,yi=new De,Za=new G,mo=new G,p_=new G,m_=new is,sm=new G(1,0,0),rm=new G(0,1,0),om=new G(0,0,1),am={type:"added"},g_={type:"removed"},gr={type:"childadded",child:null},rh={type:"childremoved",child:null},un=class n extends ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:d_++}),this.uuid=Vr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new G,e=new ii,i=new is,s=new G(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new De},normalMatrix:{value:new te}}),this.matrix=new De,this.matrixWorld=new De,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new El,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return mr.setFromAxisAngle(t,e),this.quaternion.multiply(mr),this}rotateOnWorldAxis(t,e){return mr.setFromAxisAngle(t,e),this.quaternion.premultiply(mr),this}rotateX(t){return this.rotateOnAxis(sm,t)}rotateY(t){return this.rotateOnAxis(rm,t)}rotateZ(t){return this.rotateOnAxis(om,t)}translateOnAxis(t,e){return im.copy(t).applyQuaternion(this.quaternion),this.position.add(im.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(sm,t)}translateY(t){return this.translateOnAxis(rm,t)}translateZ(t){return this.translateOnAxis(om,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Za.copy(t):Za.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),mo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(mo,Za,this.up):yi.lookAt(Za,mo,this.up),this.quaternion.setFromRotationMatrix(yi),s&&(yi.extractRotation(s.matrixWorld),mr.setFromRotationMatrix(yi),this.quaternion.premultiply(mr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(am),gr.child=t,this.dispatchEvent(gr),gr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(g_),rh.child=t,this.dispatchEvent(rh),rh.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),yi.multiply(t.parent.matrixWorld)),t.applyMatrix4(yi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(am),gr.child=t,this.dispatchEvent(gr),gr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mo,t,p_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mo,m_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};un.DEFAULT_UP=new G(0,1,0);un.DEFAULT_MATRIX_AUTO_UPDATE=!0;un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Vn=new G,_i=new G,oh=new G,vi=new G,xr=new G,yr=new G,lm=new G,ah=new G,lh=new G,ch=new G,hh=new be,uh=new be,fh=new be,Qi=class n{constructor(t=new G,e=new G,i=new G){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Vn.subVectors(t,e),s.cross(Vn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Vn.subVectors(s,e),_i.subVectors(i,e),oh.subVectors(t,e);let o=Vn.dot(Vn),a=Vn.dot(_i),l=Vn.dot(oh),c=_i.dot(_i),h=_i.dot(oh),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,p=(c*l-a*h)*f,g=(o*h-a*l)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,vi)===null?!1:vi.x>=0&&vi.y>=0&&vi.x+vi.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,vi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vi.x),l.addScaledVector(o,vi.y),l.addScaledVector(a,vi.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return hh.setScalar(0),uh.setScalar(0),fh.setScalar(0),hh.fromBufferAttribute(t,e),uh.fromBufferAttribute(t,i),fh.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(hh,r.x),o.addScaledVector(uh,r.y),o.addScaledVector(fh,r.z),o}static isFrontFacing(t,e,i,s){return Vn.subVectors(i,e),_i.subVectors(t,e),Vn.cross(_i).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Vn.subVectors(this.c,this.b),_i.subVectors(this.a,this.b),Vn.cross(_i).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;xr.subVectors(s,i),yr.subVectors(r,i),ah.subVectors(t,i);let l=xr.dot(ah),c=yr.dot(ah);if(l<=0&&c<=0)return e.copy(i);lh.subVectors(t,s);let h=xr.dot(lh),u=yr.dot(lh);if(h>=0&&u<=h)return e.copy(s);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(xr,o);ch.subVectors(t,r);let p=xr.dot(ch),g=yr.dot(ch);if(g>=0&&p<=g)return e.copy(r);let y=p*c-l*g;if(y<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(yr,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return lm.subVectors(r,s),a=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(lm,a);let d=1/(m+y+f);return o=y*d,a=f*d,e.copy(i).addScaledVector(xr,o).addScaledVector(yr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},c0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},Ka={h:0,s:0,l:0};function dh(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var he=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Cn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,fe.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=fe.workingColorSpace){return this.r=t,this.g=e,this.b=i,fe.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=fe.workingColorSpace){if(t=qu(t,1),e=hn(e,0,1),i=hn(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=dh(o,r,t+1/3),this.g=dh(o,r,t),this.b=dh(o,r,t-1/3)}return fe.toWorkingColorSpace(this,s),this}setStyle(t,e=Cn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Cn){let i=c0[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ei(t.r),this.g=Ei(t.g),this.b=Ei(t.b),this}copyLinearToSRGB(t){return this.r=Cr(t.r),this.g=Cr(t.g),this.b=Cr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Cn){return fe.fromWorkingColorSpace(en.copy(this),t),Math.round(hn(en.r*255,0,255))*65536+Math.round(hn(en.g*255,0,255))*256+Math.round(hn(en.b*255,0,255))}getHexString(t=Cn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=fe.workingColorSpace){fe.fromWorkingColorSpace(en.copy(this),e);let i=en.r,s=en.g,r=en.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=fe.workingColorSpace){return fe.fromWorkingColorSpace(en.copy(this),e),t.r=en.r,t.g=en.g,t.b=en.b,t}getStyle(t=Cn){fe.fromWorkingColorSpace(en.copy(this),t);let e=en.r,i=en.g,s=en.b;return t!==Cn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Zi),this.setHSL(Zi.h+t,Zi.s+e,Zi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Zi),t.getHSL(Ka);let i=So(Zi.h,Ka.h,e),s=So(Zi.s,Ka.s,e),r=So(Zi.l,Ka.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},en=new he;he.NAMES=c0;var x_=0,ss=class extends ns{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:x_++}),this.uuid=Vr(),this.name="",this.blending=wr,this.side=es,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ah,this.blendDst=Ch,this.blendEquation=Ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new he(0,0,0),this.blendAlpha=0,this.depthFunc=Pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=cr,this.stencilZFail=cr,this.stencilZPass=cr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==wr&&(i.blending=this.blending),this.side!==es&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ah&&(i.blendSrc=this.blendSrc),this.blendDst!==Ch&&(i.blendDst=this.blendDst),this.blendEquation!==Ts&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Pr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==cr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==cr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==cr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Al=class extends ss{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=qm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ge=new G,Ja=new ge,Rn=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Xp,this.updateRanges=[],this.gpuType=Ti,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ja.fromBufferAttribute(this,e),Ja.applyMatrix3(t),this.setXY(e,Ja.x,Ja.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix3(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix4(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.applyNormalMatrix(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.transformDirection(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=br(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ln(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=br(e,this.array)),e}setX(t,e){return this.normalized&&(e=ln(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=br(e,this.array)),e}setY(t,e){return this.normalized&&(e=ln(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=br(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ln(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=br(e,this.array)),e}setW(t,e){return this.normalized&&(e=ln(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ln(e,this.array),i=ln(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=ln(e,this.array),i=ln(i,this.array),s=ln(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=ln(e,this.array),i=ln(i,this.array),s=ln(s,this.array),r=ln(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Xp&&(t.usage=this.usage),t}};var Cl=class extends Rn{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Rl=class extends Rn{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Ze=class extends Rn{constructor(t,e,i){super(new Float32Array(t),e,i)}},y_=0,An=new De,ph=new un,_r=new G,vn=new Rs,go=new Rs,$e=new G,Sn=class n extends ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:y_++}),this.uuid=Vr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(l0(t)?Rl:Cl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new te().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return An.makeRotationFromQuaternion(t),this.applyMatrix4(An),this}rotateX(t){return An.makeRotationX(t),this.applyMatrix4(An),this}rotateY(t){return An.makeRotationY(t),this.applyMatrix4(An),this}rotateZ(t){return An.makeRotationZ(t),this.applyMatrix4(An),this}translate(t,e,i){return An.makeTranslation(t,e,i),this.applyMatrix4(An),this}scale(t,e,i){return An.makeScale(t,e,i),this.applyMatrix4(An),this}lookAt(t){return ph.lookAt(t),ph.updateMatrix(),this.applyMatrix4(ph.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_r).negate(),this.translate(_r.x,_r.y,_r.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ze(i,3))}else{for(let i=0,s=e.count;i<s;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rs);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];vn.setFromBufferAttribute(r),this.morphTargetsRelative?($e.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint($e),$e.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint($e)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nr);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(t){let i=this.boundingSphere.center;if(vn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];go.setFromBufferAttribute(a),this.morphTargetsRelative?($e.addVectors(vn.min,go.min),vn.expandByPoint($e),$e.addVectors(vn.max,go.max),vn.expandByPoint($e)):(vn.expandByPoint(go.min),vn.expandByPoint(go.max))}vn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)$e.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared($e));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)$e.fromBufferAttribute(a,c),l&&(_r.fromBufferAttribute(t,c),$e.add(_r)),s=Math.max(s,i.distanceToSquared($e))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Rn(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<i.count;D++)a[D]=new G,l[D]=new G;let c=new G,h=new G,u=new G,f=new ge,p=new ge,g=new ge,y=new G,m=new G;function d(D,M,S){c.fromBufferAttribute(i,D),h.fromBufferAttribute(i,M),u.fromBufferAttribute(i,S),f.fromBufferAttribute(r,D),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,S),h.sub(c),u.sub(c),p.sub(f),g.sub(f);let U=1/(p.x*g.y-g.x*p.y);isFinite(U)&&(y.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(U),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(U),a[D].add(y),a[M].add(y),a[S].add(y),l[D].add(m),l[M].add(m),l[S].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let D=0,M=w.length;D<M;++D){let S=w[D],U=S.start,Y=S.count;for(let $=U,Z=U+Y;$<Z;$+=3)d(t.getX($+0),t.getX($+1),t.getX($+2))}let T=new G,v=new G,L=new G,I=new G;function R(D){L.fromBufferAttribute(s,D),I.copy(L);let M=a[D];T.copy(M),T.sub(L.multiplyScalar(L.dot(M))).normalize(),v.crossVectors(I,M);let U=v.dot(l[D])<0?-1:1;o.setXYZW(D,T.x,T.y,T.z,U)}for(let D=0,M=w.length;D<M;++D){let S=w[D],U=S.start,Y=S.count;for(let $=U,Z=U+Y;$<Z;$+=3)R(t.getX($+0)),R(t.getX($+1)),R(t.getX($+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Rn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);let s=new G,r=new G,o=new G,a=new G,l=new G,c=new G,h=new G,u=new G;if(t)for(let f=0,p=t.count;f<p;f+=3){let g=t.getX(f+0),y=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)$e.fromBufferAttribute(t,e),$e.normalize(),t.setXYZ(e,$e.x,$e.y,$e.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h),p=0,g=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?p=l[y]*a.data.stride+a.offset:p=l[y]*h;for(let d=0;d<h;d++)f[g++]=c[p++]}return new Rn(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,i);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let f=c[h],p=t(f,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},cm=new De,_s=new wl,Qa=new Nr,hm=new G,ja=new G,tl=new G,el=new G,mh=new G,nl=new G,um=new G,il=new G,Ie=class extends un{constructor(t=new Sn,e=new Al){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){nl.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(mh.fromBufferAttribute(u,t),o?nl.addScaledVector(mh,h):nl.addScaledVector(mh.sub(e),h))}e.add(nl)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Qa.copy(i.boundingSphere),Qa.applyMatrix4(r),_s.copy(t.ray).recast(t.near),!(Qa.containsPoint(_s.origin)===!1&&(_s.intersectSphere(Qa,hm)===null||_s.origin.distanceToSquared(hm)>(t.far-t.near)**2))&&(cm.copy(r).invert(),_s.copy(t.ray).applyMatrix4(cm),!(i.boundingBox!==null&&_s.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,_s)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],d=o[m.materialIndex],w=Math.max(m.start,p.start),T=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=w,L=T;v<L;v+=3){let I=a.getX(v),R=a.getX(v+1),D=a.getX(v+2);s=sl(this,d,t,i,c,h,u,I,R,D),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let m=g,d=y;m<d;m+=3){let w=a.getX(m),T=a.getX(m+1),v=a.getX(m+2);s=sl(this,o,t,i,c,h,u,w,T,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],d=o[m.materialIndex],w=Math.max(m.start,p.start),T=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=w,L=T;v<L;v+=3){let I=v,R=v+1,D=v+2;s=sl(this,d,t,i,c,h,u,I,R,D),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=g,d=y;m<d;m+=3){let w=m,T=m+1,v=m+2;s=sl(this,o,t,i,c,h,u,w,T,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function __(n,t,e,i,s,r,o,a){let l;if(t.side===mn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===es,a),l===null)return null;il.copy(a),il.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(il);return c<e.near||c>e.far?null:{distance:c,point:il.clone(),object:n}}function sl(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,ja),n.getVertexPosition(l,tl),n.getVertexPosition(c,el);let h=__(n,t,e,i,ja,tl,el,um);if(h){let u=new G;Qi.getBarycoord(um,ja,tl,el,u),s&&(h.uv=Qi.getInterpolatedAttribute(s,a,l,c,u,new ge)),r&&(h.uv1=Qi.getInterpolatedAttribute(r,a,l,c,u,new ge)),o&&(h.normal=Qi.getInterpolatedAttribute(o,a,l,c,u,new G),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new G,materialIndex:0};Qi.getNormal(ja,tl,el,f.normal),h.face=f,h.barycoord=u}return h}var si=class n extends Sn{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],f=0,p=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ze(c,3)),this.setAttribute("normal",new Ze(h,3)),this.setAttribute("uv",new Ze(u,2));function g(y,m,d,w,T,v,L,I,R,D,M){let S=v/R,U=L/D,Y=v/2,$=L/2,Z=I/2,rt=R+1,B=D+1,et=0,N=0,F=new G;for(let J=0;J<B;J++){let K=J*U-$;for(let at=0;at<rt;at++){let vt=at*S-Y;F[y]=vt*w,F[m]=K*T,F[d]=Z,c.push(F.x,F.y,F.z),F[y]=0,F[m]=0,F[d]=I>0?1:-1,h.push(F.x,F.y,F.z),u.push(at/R),u.push(1-J/D),et+=1}}for(let J=0;J<D;J++)for(let K=0;K<R;K++){let at=f+K+rt*J,vt=f+K+rt*(J+1),P=f+(K+1)+rt*(J+1),H=f+(K+1)+rt*J;l.push(at,vt,H),l.push(vt,P,H),N+=6}a.addGroup(p,N,M),p+=N,f+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Fr(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function cn(n){let t={};for(let e=0;e<n.length;e++){let i=Fr(n[e]);for(let s in i)t[s]=i[s]}return t}function v_(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function h0(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:fe.workingColorSpace}var S_={clone:Fr,merge:cn},M_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,b_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ri=class extends ss{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=M_,this.fragmentShader=b_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Fr(t.uniforms),this.uniformsGroups=v_(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},Pl=class extends un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new De,this.projectionMatrix=new De,this.projectionMatrixInverse=new De,this.coordinateSystem=wi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ki=new G,fm=new ge,dm=new ge,nn=class extends Pl{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=To*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ar*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return To*2*Math.atan(Math.tan(Ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ki.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ki.x,Ki.y).multiplyScalar(-t/Ki.z),Ki.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ki.x,Ki.y).multiplyScalar(-t/Ki.z)}getViewSize(t,e){return this.getViewBounds(t,fm,dm),e.subVectors(dm,fm)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ar*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},vr=-90,Sr=1,gu=class extends un{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new nn(vr,Sr,t,e);s.layers=this.layers,this.add(s);let r=new nn(vr,Sr,t,e);r.layers=this.layers,this.add(r);let o=new nn(vr,Sr,t,e);o.layers=this.layers,this.add(o);let a=new nn(vr,Sr,t,e);a.layers=this.layers,this.add(a);let l=new nn(vr,Sr,t,e);l.layers=this.layers,this.add(l);let c=new nn(vr,Sr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===wi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Sl)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=y,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Il=class extends Pn{constructor(t,e,i,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Ir,super(t,e,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},xu=class extends Ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Il(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ei}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new si(5,5,5),r=new ri({name:"CubemapFromEquirect",uniforms:Fr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:mn,blending:ji});r.uniforms.tEquirect.value=e;let o=new Ie(s,r),a=e.minFilter;return e.minFilter===As&&(e.minFilter=ei),new gu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},gh=new G,T_=new G,w_=new te,Mi=class{constructor(t=new G(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=gh.subVectors(i,e).cross(T_.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(gh),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||w_.getNormalMatrix(t),s=this.coplanarPoint(gh).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},vs=new Nr,rl=new G,wo=class{constructor(t=new Mi,e=new Mi,i=new Mi,s=new Mi,r=new Mi,o=new Mi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=wi){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],p=s[8],g=s[9],y=s[10],m=s[11],d=s[12],w=s[13],T=s[14],v=s[15];if(i[0].setComponents(l-r,f-c,m-p,v-d).normalize(),i[1].setComponents(l+r,f+c,m+p,v+d).normalize(),i[2].setComponents(l+o,f+h,m+g,v+w).normalize(),i[3].setComponents(l-o,f-h,m-g,v-w).normalize(),i[4].setComponents(l-a,f-u,m-y,v-T).normalize(),e===wi)i[5].setComponents(l+a,f+u,m+y,v+T).normalize();else if(e===Sl)i[5].setComponents(a,u,y,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),vs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vs)}intersectsSprite(t){return vs.center.set(0,0,0),vs.radius=.7071067811865476,vs.applyMatrix4(t.matrixWorld),this.intersectsSphere(vs)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(rl.x=s.normal.x>0?t.max.x:t.min.x,rl.y=s.normal.y>0?t.max.y:t.min.y,rl.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(rl)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function u0(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function E_(n){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){let g=u[f],y=u[p];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,u[f]=y)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){let y=u[p];n.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Dl=class n extends Sn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,u=t/a,f=e/l,p=[],g=[],y=[],m=[];for(let d=0;d<h;d++){let w=d*f-o;for(let T=0;T<c;T++){let v=T*u-r;g.push(v,-w,0),y.push(0,0,1),m.push(T/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let w=0;w<a;w++){let T=w+c*d,v=w+c*(d+1),L=w+1+c*(d+1),I=w+1+c*d;p.push(T,v,I),p.push(v,L,I)}this.setIndex(p),this.setAttribute("position",new Ze(g,3)),this.setAttribute("normal",new Ze(y,3)),this.setAttribute("uv",new Ze(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},A_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,C_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,R_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,P_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,I_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,D_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,L_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,U_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,N_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,F_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,O_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,B_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,z_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,k_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,V_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,H_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,G_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,W_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,X_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Y_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,q_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Z_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,K_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,J_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Q_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,j_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ev=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,iv="gl_FragColor = linearToOutputTexel( gl_FragColor );",sv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ov=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,av=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,lv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,hv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,uv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,mv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,_v=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,vv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,wv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ev=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Av=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Cv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Iv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Lv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Uv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Nv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Fv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ov=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Gv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Xv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Yv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$v=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Zv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Kv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,eS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,nS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,iS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,oS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,aS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,cS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,hS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,uS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,fS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,gS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_S=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,SS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,MS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,TS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,wS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ES=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,AS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,CS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,RS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,PS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,IS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,LS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,US=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,NS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,FS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,OS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,VS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,XS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,YS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,qS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,$S=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ZS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,JS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,eM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ne={alphahash_fragment:A_,alphahash_pars_fragment:C_,alphamap_fragment:R_,alphamap_pars_fragment:P_,alphatest_fragment:I_,alphatest_pars_fragment:D_,aomap_fragment:L_,aomap_pars_fragment:U_,batching_pars_vertex:N_,batching_vertex:F_,begin_vertex:O_,beginnormal_vertex:B_,bsdfs:z_,iridescence_fragment:k_,bumpmap_pars_fragment:V_,clipping_planes_fragment:H_,clipping_planes_pars_fragment:G_,clipping_planes_pars_vertex:W_,clipping_planes_vertex:X_,color_fragment:Y_,color_pars_fragment:q_,color_pars_vertex:$_,color_vertex:Z_,common:K_,cube_uv_reflection_fragment:J_,defaultnormal_vertex:Q_,displacementmap_pars_vertex:j_,displacementmap_vertex:tv,emissivemap_fragment:ev,emissivemap_pars_fragment:nv,colorspace_fragment:iv,colorspace_pars_fragment:sv,envmap_fragment:rv,envmap_common_pars_fragment:ov,envmap_pars_fragment:av,envmap_pars_vertex:lv,envmap_physical_pars_fragment:_v,envmap_vertex:cv,fog_vertex:hv,fog_pars_vertex:uv,fog_fragment:fv,fog_pars_fragment:dv,gradientmap_pars_fragment:pv,lightmap_pars_fragment:mv,lights_lambert_fragment:gv,lights_lambert_pars_fragment:xv,lights_pars_begin:yv,lights_toon_fragment:vv,lights_toon_pars_fragment:Sv,lights_phong_fragment:Mv,lights_phong_pars_fragment:bv,lights_physical_fragment:Tv,lights_physical_pars_fragment:wv,lights_fragment_begin:Ev,lights_fragment_maps:Av,lights_fragment_end:Cv,logdepthbuf_fragment:Rv,logdepthbuf_pars_fragment:Pv,logdepthbuf_pars_vertex:Iv,logdepthbuf_vertex:Dv,map_fragment:Lv,map_pars_fragment:Uv,map_particle_fragment:Nv,map_particle_pars_fragment:Fv,metalnessmap_fragment:Ov,metalnessmap_pars_fragment:Bv,morphinstance_vertex:zv,morphcolor_vertex:kv,morphnormal_vertex:Vv,morphtarget_pars_vertex:Hv,morphtarget_vertex:Gv,normal_fragment_begin:Wv,normal_fragment_maps:Xv,normal_pars_fragment:Yv,normal_pars_vertex:qv,normal_vertex:$v,normalmap_pars_fragment:Zv,clearcoat_normal_fragment_begin:Kv,clearcoat_normal_fragment_maps:Jv,clearcoat_pars_fragment:Qv,iridescence_pars_fragment:jv,opaque_fragment:tS,packing:eS,premultiplied_alpha_fragment:nS,project_vertex:iS,dithering_fragment:sS,dithering_pars_fragment:rS,roughnessmap_fragment:oS,roughnessmap_pars_fragment:aS,shadowmap_pars_fragment:lS,shadowmap_pars_vertex:cS,shadowmap_vertex:hS,shadowmask_pars_fragment:uS,skinbase_vertex:fS,skinning_pars_vertex:dS,skinning_vertex:pS,skinnormal_vertex:mS,specularmap_fragment:gS,specularmap_pars_fragment:xS,tonemapping_fragment:yS,tonemapping_pars_fragment:_S,transmission_fragment:vS,transmission_pars_fragment:SS,uv_pars_fragment:MS,uv_pars_vertex:bS,uv_vertex:TS,worldpos_vertex:wS,background_vert:ES,background_frag:AS,backgroundCube_vert:CS,backgroundCube_frag:RS,cube_vert:PS,cube_frag:IS,depth_vert:DS,depth_frag:LS,distanceRGBA_vert:US,distanceRGBA_frag:NS,equirect_vert:FS,equirect_frag:OS,linedashed_vert:BS,linedashed_frag:zS,meshbasic_vert:kS,meshbasic_frag:VS,meshlambert_vert:HS,meshlambert_frag:GS,meshmatcap_vert:WS,meshmatcap_frag:XS,meshnormal_vert:YS,meshnormal_frag:qS,meshphong_vert:$S,meshphong_frag:ZS,meshphysical_vert:KS,meshphysical_frag:JS,meshtoon_vert:QS,meshtoon_frag:jS,points_vert:tM,points_frag:eM,shadow_vert:nM,shadow_frag:iM,sprite_vert:sM,sprite_frag:rM},Ct={common:{diffuse:{value:new he(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new te}},envmap:{envMap:{value:null},envMapRotation:{value:new te},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new te}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new te}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new te},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new te},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new te},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new te}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new te}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new te}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new he(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0},uvTransform:{value:new te}},sprite:{diffuse:{value:new he(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}}},ti={basic:{uniforms:cn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:cn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new he(0)}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:cn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:cn([Ct.common,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.roughnessmap,Ct.metalnessmap,Ct.fog,Ct.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:cn([Ct.common,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.gradientmap,Ct.fog,Ct.lights,{emissive:{value:new he(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:cn([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:cn([Ct.points,Ct.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:cn([Ct.common,Ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:cn([Ct.common,Ct.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:cn([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:cn([Ct.sprite,Ct.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new te},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new te}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distanceRGBA:{uniforms:cn([Ct.common,Ct.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distanceRGBA_vert,fragmentShader:ne.distanceRGBA_frag},shadow:{uniforms:cn([Ct.lights,Ct.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};ti.physical={uniforms:cn([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new te},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new te},clearcoatNormalScale:{value:new ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new te},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new te},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new te},sheen:{value:0},sheenColor:{value:new he(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new te},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new te},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new te},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new te},attenuationDistance:{value:0},attenuationColor:{value:new he(0)},specularColor:{value:new he(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new te},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new te},anisotropyVector:{value:new ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new te}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};var ol={r:0,b:0,g:0},Ss=new ii,oM=new De;function aM(n,t,e,i,s,r,o){let a=new he(0),l=r===!0?0:1,c,h,u=null,f=0,p=null;function g(w){let T=w.isScene===!0?w.background:null;return T&&T.isTexture&&(T=(w.backgroundBlurriness>0?e:t).get(T)),T}function y(w){let T=!1,v=g(w);v===null?d(a,l):v&&v.isColor&&(d(v,1),T=!0);let L=n.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,T){let v=g(T);v&&(v.isCubeTexture||v.mapping===ql)?(h===void 0&&(h=new Ie(new si(1,1,1),new ri({name:"BackgroundCubeMaterial",uniforms:Fr(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,I,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ss.copy(T.backgroundRotation),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(oM.makeRotationFromEuler(Ss)),h.material.toneMapped=fe.getTransfer(v.colorSpace)!==Me,(u!==v||f!==v.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,p=n.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Ie(new Dl(2,2),new ri({name:"BackgroundMaterial",uniforms:Fr(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:es,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=fe.getTransfer(v.colorSpace)!==Me,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,p=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function d(w,T){w.getRGB(ol,h0(n)),i.buffers.color.setClear(ol.r,ol.g,ol.b,T,o)}return{getClearColor:function(){return a},setClearColor:function(w,T=1){a.set(w),l=T,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,d(a,l)},render:y,addToRenderList:m}}function lM(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null),r=s,o=!1;function a(S,U,Y,$,Z){let rt=!1,B=u($,Y,U);r!==B&&(r=B,c(r.object)),rt=p(S,$,Y,Z),rt&&g(S,$,Y,Z),Z!==null&&t.update(Z,n.ELEMENT_ARRAY_BUFFER),(rt||o)&&(o=!1,v(S,U,Y,$),Z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function h(S){return n.deleteVertexArray(S)}function u(S,U,Y){let $=Y.wireframe===!0,Z=i[S.id];Z===void 0&&(Z={},i[S.id]=Z);let rt=Z[U.id];rt===void 0&&(rt={},Z[U.id]=rt);let B=rt[$];return B===void 0&&(B=f(l()),rt[$]=B),B}function f(S){let U=[],Y=[],$=[];for(let Z=0;Z<e;Z++)U[Z]=0,Y[Z]=0,$[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:Y,attributeDivisors:$,object:S,attributes:{},index:null}}function p(S,U,Y,$){let Z=r.attributes,rt=U.attributes,B=0,et=Y.getAttributes();for(let N in et)if(et[N].location>=0){let J=Z[N],K=rt[N];if(K===void 0&&(N==="instanceMatrix"&&S.instanceMatrix&&(K=S.instanceMatrix),N==="instanceColor"&&S.instanceColor&&(K=S.instanceColor)),J===void 0||J.attribute!==K||K&&J.data!==K.data)return!0;B++}return r.attributesNum!==B||r.index!==$}function g(S,U,Y,$){let Z={},rt=U.attributes,B=0,et=Y.getAttributes();for(let N in et)if(et[N].location>=0){let J=rt[N];J===void 0&&(N==="instanceMatrix"&&S.instanceMatrix&&(J=S.instanceMatrix),N==="instanceColor"&&S.instanceColor&&(J=S.instanceColor));let K={};K.attribute=J,J&&J.data&&(K.data=J.data),Z[N]=K,B++}r.attributes=Z,r.attributesNum=B,r.index=$}function y(){let S=r.newAttributes;for(let U=0,Y=S.length;U<Y;U++)S[U]=0}function m(S){d(S,0)}function d(S,U){let Y=r.newAttributes,$=r.enabledAttributes,Z=r.attributeDivisors;Y[S]=1,$[S]===0&&(n.enableVertexAttribArray(S),$[S]=1),Z[S]!==U&&(n.vertexAttribDivisor(S,U),Z[S]=U)}function w(){let S=r.newAttributes,U=r.enabledAttributes;for(let Y=0,$=U.length;Y<$;Y++)U[Y]!==S[Y]&&(n.disableVertexAttribArray(Y),U[Y]=0)}function T(S,U,Y,$,Z,rt,B){B===!0?n.vertexAttribIPointer(S,U,Y,Z,rt):n.vertexAttribPointer(S,U,Y,$,Z,rt)}function v(S,U,Y,$){y();let Z=$.attributes,rt=Y.getAttributes(),B=U.defaultAttributeValues;for(let et in rt){let N=rt[et];if(N.location>=0){let F=Z[et];if(F===void 0&&(et==="instanceMatrix"&&S.instanceMatrix&&(F=S.instanceMatrix),et==="instanceColor"&&S.instanceColor&&(F=S.instanceColor)),F!==void 0){let J=F.normalized,K=F.itemSize,at=t.get(F);if(at===void 0)continue;let vt=at.buffer,P=at.type,H=at.bytesPerElement,Q=P===n.INT||P===n.UNSIGNED_INT||F.gpuType===Vu;if(F.isInterleavedBufferAttribute){let j=F.data,pt=j.stride,_t=F.offset;if(j.isInstancedInterleavedBuffer){for(let ft=0;ft<N.locationSize;ft++)d(N.location+ft,j.meshPerAttribute);S.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ft=0;ft<N.locationSize;ft++)m(N.location+ft);n.bindBuffer(n.ARRAY_BUFFER,vt);for(let ft=0;ft<N.locationSize;ft++)T(N.location+ft,K/N.locationSize,P,J,pt*H,(_t+K/N.locationSize*ft)*H,Q)}else{if(F.isInstancedBufferAttribute){for(let j=0;j<N.locationSize;j++)d(N.location+j,F.meshPerAttribute);S.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let j=0;j<N.locationSize;j++)m(N.location+j);n.bindBuffer(n.ARRAY_BUFFER,vt);for(let j=0;j<N.locationSize;j++)T(N.location+j,K/N.locationSize,P,J,K*H,K/N.locationSize*j*H,Q)}}else if(B!==void 0){let J=B[et];if(J!==void 0)switch(J.length){case 2:n.vertexAttrib2fv(N.location,J);break;case 3:n.vertexAttrib3fv(N.location,J);break;case 4:n.vertexAttrib4fv(N.location,J);break;default:n.vertexAttrib1fv(N.location,J)}}}}w()}function L(){D();for(let S in i){let U=i[S];for(let Y in U){let $=U[Y];for(let Z in $)h($[Z].object),delete $[Z];delete U[Y]}delete i[S]}}function I(S){if(i[S.id]===void 0)return;let U=i[S.id];for(let Y in U){let $=U[Y];for(let Z in $)h($[Z].object),delete $[Z];delete U[Y]}delete i[S.id]}function R(S){for(let U in i){let Y=i[U];if(Y[S.id]===void 0)continue;let $=Y[S.id];for(let Z in $)h($[Z].object),delete $[Z];delete Y[S.id]}}function D(){M(),o=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:M,dispose:L,releaseStatesOfGeometry:I,releaseStatesOfProgram:R,initAttributes:y,enableAttribute:m,disableUnusedAttributes:w}}function cM(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,i,1)}function l(c,h,u,f){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let g=0;for(let y=0;y<u;y++)g+=h[y]*f[y];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function hM(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Hn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let D=R===Co&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Ai&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Ti&&!D)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,I=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:v,vertexTextures:L,maxSamples:I}}function uM(n){let t=this,e=null,i=0,s=!1,r=!1,o=new Mi,a=new te,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let p=u.length!==0||f||i!==0||s;return s=f,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,p){let g=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,d=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let w=r?0:i,T=w*4,v=d.clippingState||null;l.value=v,v=h(g,f,T,p);for(let L=0;L!==T;++L)v[L]=e[L];d.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,p,g){let y=u!==null?u.length:0,m=null;if(y!==0){if(m=l.value,g!==!0||m===null){let d=p+y*4,w=f.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<d)&&(m=new Float32Array(d));for(let T=0,v=p;T!==y;++T,v+=4)o.copy(u[T]).applyMatrix4(w,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}function fM(n){let t=new WeakMap;function e(o,a){return a===Fh?o.mapping=Ir:a===Oh&&(o.mapping=Dr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Fh||a===Oh)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new xu(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var Ll=class extends Pl{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Tr=4,pm=[.125,.215,.35,.446,.526,.582],ws=20,xh=new Ll,mm=new he,yh=null,_h=0,vh=0,Sh=!1,bs=(1+Math.sqrt(5))/2,Mr=1/bs,gm=[new G(-bs,Mr,0),new G(bs,Mr,0),new G(-Mr,0,bs),new G(Mr,0,bs),new G(0,bs,-Mr),new G(0,bs,Mr),new G(-1,1,-1),new G(1,1,-1),new G(-1,1,1),new G(1,1,1)],Ul=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){yh=this._renderer.getRenderTarget(),_h=this._renderer.getActiveCubeFace(),vh=this._renderer.getActiveMipmapLevel(),Sh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_m(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ym(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(yh,_h,vh),this._renderer.xr.enabled=Sh,t.scissorTest=!1,al(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ir||t.mapping===Dr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),yh=this._renderer.getRenderTarget(),_h=this._renderer.getActiveCubeFace(),vh=this._renderer.getActiveMipmapLevel(),Sh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ei,minFilter:ei,generateMipmaps:!1,type:Co,format:Hn,colorSpace:kr,depthBuffer:!1},s=xm(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xm(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=dM(r)),this._blurMaterial=pM(r,t,e)}return s}_compileMaterial(t){let e=new Ie(this._lodPlanes[0],t);this._renderer.compile(e,xh)}_sceneToCubeUV(t,e,i,s){let a=new nn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(mm),h.toneMapping=ts,h.autoClear=!1;let p=new Al({name:"PMREM.Background",side:mn,depthWrite:!1,depthTest:!1}),g=new Ie(new si,p),y=!1,m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,y=!0):(p.color.copy(mm),y=!0);for(let d=0;d<6;d++){let w=d%3;w===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):w===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));let T=this._cubeSize;al(s,w*T,d>2?T:0,T,T),h.setRenderTarget(s),y&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===Ir||t.mapping===Dr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=_m()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ym());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ie(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;al(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,xh)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=gm[(s-r-1)%gm.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ie(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ws-1),y=r/g,m=isFinite(r)?1+Math.floor(h*y):ws;m>ws&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ws}`);let d=[],w=0;for(let R=0;R<ws;++R){let D=R/y,M=Math.exp(-D*D/2);d.push(M),R===0?w+=M:R<m&&(w+=2*M)}for(let R=0;R<d.length;R++)d[R]=d[R]/w;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:T}=this;f.dTheta.value=g,f.mipInt.value=T-i;let v=this._sizeLods[s],L=3*v*(s>T-Tr?s-T+Tr:0),I=4*(this._cubeSize-v);al(e,L,I,3*v,2*v),l.setRenderTarget(e),l.render(u,xh)}};function dM(n){let t=[],e=[],i=[],s=n,r=n-Tr+1+pm.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Tr?l=pm[o-n+Tr-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,y=3,m=2,d=1,w=new Float32Array(y*g*p),T=new Float32Array(m*g*p),v=new Float32Array(d*g*p);for(let I=0;I<p;I++){let R=I%3*2/3-1,D=I>2?0:-1,M=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];w.set(M,y*g*I),T.set(f,m*g*I);let S=[I,I,I,I,I,I];v.set(S,d*g*I)}let L=new Sn;L.setAttribute("position",new Rn(w,y)),L.setAttribute("uv",new Rn(T,m)),L.setAttribute("faceIndex",new Rn(v,d)),t.push(L),s>Tr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function xm(n,t,e){let i=new Ci(n,t,e);return i.texture.mapping=ql,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function al(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function pM(n,t,e){let i=new Float32Array(ws),s=new G(0,1,0);return new ri({name:"SphericalGaussianBlur",defines:{n:ws,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:$u(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function ym(){return new ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$u(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function _m(){return new ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$u(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function $u(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function mM(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Fh||l===Oh,h=l===Ir||l===Dr;if(c||h){let u=t.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Ul(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let p=a.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new Ul(n)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function gM(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&_o("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function xM(n,t,e,i){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);for(let g in f.morphAttributes){let y=f.morphAttributes[g];for(let m=0,d=y.length;m<d;m++)t.remove(y[m])}f.removeEventListener("dispose",o),delete s[f.id];let p=r.get(f);p&&(t.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(u){let f=u.attributes;for(let g in f)t.update(f[g],n.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let y=p[g];for(let m=0,d=y.length;m<d;m++)t.update(y[m],n.ARRAY_BUFFER)}}function c(u){let f=[],p=u.index,g=u.attributes.position,y=0;if(p!==null){let w=p.array;y=p.version;for(let T=0,v=w.length;T<v;T+=3){let L=w[T+0],I=w[T+1],R=w[T+2];f.push(L,I,I,R,R,L)}}else if(g!==void 0){let w=g.array;y=g.version;for(let T=0,v=w.length/3-1;T<v;T+=3){let L=T+0,I=T+1,R=T+2;f.push(L,I,I,R,R,L)}}else return;let m=new(l0(f)?Rl:Cl)(f,1);m.version=y;let d=r.get(u);d&&t.remove(d),r.set(u,m)}function h(u){let f=r.get(u);if(f){let p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function yM(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,p){n.drawElements(i,p,r,f*o),e.update(p,i,1)}function c(f,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,f*o,g),e.update(p,i,g))}function h(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,i,1)}function u(f,p,g,y){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],y[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,y,0,g);let d=0;for(let w=0;w<g;w++)d+=p[w]*y[w];e.update(d,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function _M(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function vM(n,t,e){let i=new WeakMap,s=new be;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=i.get(a);if(f===void 0||f.count!==u){let M=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",M)};f!==void 0&&f.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],T=0;p===!0&&(T=1),g===!0&&(T=2),y===!0&&(T=3);let v=a.attributes.position.count*T,L=1;v>t.maxTextureSize&&(L=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let I=new Float32Array(v*L*4*u),R=new Tl(I,v,L,u);R.type=Ti,R.needsUpdate=!0;let D=T*4;for(let S=0;S<u;S++){let U=m[S],Y=d[S],$=w[S],Z=v*L*4*S;for(let rt=0;rt<U.count;rt++){let B=rt*D;p===!0&&(s.fromBufferAttribute(U,rt),I[Z+B+0]=s.x,I[Z+B+1]=s.y,I[Z+B+2]=s.z,I[Z+B+3]=0),g===!0&&(s.fromBufferAttribute(Y,rt),I[Z+B+4]=s.x,I[Z+B+5]=s.y,I[Z+B+6]=s.z,I[Z+B+7]=0),y===!0&&(s.fromBufferAttribute($,rt),I[Z+B+8]=s.x,I[Z+B+9]=s.y,I[Z+B+10]=s.z,I[Z+B+11]=$.itemSize===4?s.w:1)}}f={count:u,texture:R,size:new ge(v,L)},i.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let p=0;for(let y=0;y<c.length;y++)p+=c[y];let g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function SM(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var Nl=class extends Pn{constructor(t,e,i,s,r,o,a,l,c,h=Er){if(h!==Er&&h!==Ur)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Er&&(i=Cs),i===void 0&&h===Ur&&(i=Lr),super(null,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Gn,this.minFilter=l!==void 0?l:Gn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},f0=new Pn,vm=new Nl(1,1),d0=new Tl,p0=new mu,m0=new Il,Sm=[],Mm=[],bm=new Float32Array(16),Tm=new Float32Array(9),wm=new Float32Array(4);function Hr(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Sm[s];if(r===void 0&&(r=new Float32Array(s),Sm[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Xe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ye(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Zl(n,t){let e=Mm[t];e===void 0&&(e=new Int32Array(t),Mm[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function MM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function bM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;n.uniform2fv(this.addr,t),Ye(e,t)}}function TM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Xe(e,t))return;n.uniform3fv(this.addr,t),Ye(e,t)}}function wM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;n.uniform4fv(this.addr,t),Ye(e,t)}}function EM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Xe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ye(e,t)}else{if(Xe(e,i))return;wm.set(i),n.uniformMatrix2fv(this.addr,!1,wm),Ye(e,i)}}function AM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Xe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ye(e,t)}else{if(Xe(e,i))return;Tm.set(i),n.uniformMatrix3fv(this.addr,!1,Tm),Ye(e,i)}}function CM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Xe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ye(e,t)}else{if(Xe(e,i))return;bm.set(i),n.uniformMatrix4fv(this.addr,!1,bm),Ye(e,i)}}function RM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function PM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;n.uniform2iv(this.addr,t),Ye(e,t)}}function IM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Xe(e,t))return;n.uniform3iv(this.addr,t),Ye(e,t)}}function DM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;n.uniform4iv(this.addr,t),Ye(e,t)}}function LM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function UM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;n.uniform2uiv(this.addr,t),Ye(e,t)}}function NM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Xe(e,t))return;n.uniform3uiv(this.addr,t),Ye(e,t)}}function FM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;n.uniform4uiv(this.addr,t),Ye(e,t)}}function OM(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(vm.compareFunction=o0,r=vm):r=f0,e.setTexture2D(t||r,s)}function BM(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||p0,s)}function zM(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||m0,s)}function kM(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||d0,s)}function VM(n){switch(n){case 5126:return MM;case 35664:return bM;case 35665:return TM;case 35666:return wM;case 35674:return EM;case 35675:return AM;case 35676:return CM;case 5124:case 35670:return RM;case 35667:case 35671:return PM;case 35668:case 35672:return IM;case 35669:case 35673:return DM;case 5125:return LM;case 36294:return UM;case 36295:return NM;case 36296:return FM;case 35678:case 36198:case 36298:case 36306:case 35682:return OM;case 35679:case 36299:case 36307:return BM;case 35680:case 36300:case 36308:case 36293:return zM;case 36289:case 36303:case 36311:case 36292:return kM}}function HM(n,t){n.uniform1fv(this.addr,t)}function GM(n,t){let e=Hr(t,this.size,2);n.uniform2fv(this.addr,e)}function WM(n,t){let e=Hr(t,this.size,3);n.uniform3fv(this.addr,e)}function XM(n,t){let e=Hr(t,this.size,4);n.uniform4fv(this.addr,e)}function YM(n,t){let e=Hr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function qM(n,t){let e=Hr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function $M(n,t){let e=Hr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function ZM(n,t){n.uniform1iv(this.addr,t)}function KM(n,t){n.uniform2iv(this.addr,t)}function JM(n,t){n.uniform3iv(this.addr,t)}function QM(n,t){n.uniform4iv(this.addr,t)}function jM(n,t){n.uniform1uiv(this.addr,t)}function tb(n,t){n.uniform2uiv(this.addr,t)}function eb(n,t){n.uniform3uiv(this.addr,t)}function nb(n,t){n.uniform4uiv(this.addr,t)}function ib(n,t,e){let i=this.cache,s=t.length,r=Zl(e,s);Xe(i,r)||(n.uniform1iv(this.addr,r),Ye(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||f0,r[o])}function sb(n,t,e){let i=this.cache,s=t.length,r=Zl(e,s);Xe(i,r)||(n.uniform1iv(this.addr,r),Ye(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||p0,r[o])}function rb(n,t,e){let i=this.cache,s=t.length,r=Zl(e,s);Xe(i,r)||(n.uniform1iv(this.addr,r),Ye(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||m0,r[o])}function ob(n,t,e){let i=this.cache,s=t.length,r=Zl(e,s);Xe(i,r)||(n.uniform1iv(this.addr,r),Ye(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||d0,r[o])}function ab(n){switch(n){case 5126:return HM;case 35664:return GM;case 35665:return WM;case 35666:return XM;case 35674:return YM;case 35675:return qM;case 35676:return $M;case 5124:case 35670:return ZM;case 35667:case 35671:return KM;case 35668:case 35672:return JM;case 35669:case 35673:return QM;case 5125:return jM;case 36294:return tb;case 36295:return eb;case 36296:return nb;case 35678:case 36198:case 36298:case 36306:case 35682:return ib;case 35679:case 36299:case 36307:return sb;case 35680:case 36300:case 36308:case 36293:return rb;case 36289:case 36303:case 36311:case 36292:return ob}}var yu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=VM(e.type)}},_u=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ab(e.type)}},vu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},Mh=/(\w+)(\])?(\[|\.)?/g;function Em(n,t){n.seq.push(t),n.map[t.id]=t}function lb(n,t,e){let i=n.name,s=i.length;for(Mh.lastIndex=0;;){let r=Mh.exec(i),o=Mh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Em(e,c===void 0?new yu(a,n,t):new _u(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new vu(a),Em(e,u)),e=u}}}var Rr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);lb(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function Am(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var cb=37297,hb=0;function ub(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var Cm=new te;function fb(n){fe._getMatrix(Cm,fe.workingColorSpace,n);let t=`mat3( ${Cm.elements.map(e=>e.toFixed(4))} )`;switch(fe.getTransfer(n)){case $l:return[t,"LinearTransferOETF"];case Me:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Rm(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+ub(n.getShaderSource(t),o)}else return s}function db(n,t){let e=fb(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function pb(n,t){let e;switch(t){case Ty:e="Linear";break;case wy:e="Reinhard";break;case Ey:e="Cineon";break;case Ay:e="ACESFilmic";break;case Ry:e="AgX";break;case Py:e="Neutral";break;case Cy:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var ll=new G;function mb(){fe.getLuminanceCoefficients(ll);let n=ll.x.toFixed(4),t=ll.y.toFixed(4),e=ll.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gb(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vo).join(`
`)}function xb(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function yb(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function vo(n){return n!==""}function Pm(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Im(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var _b=/^[ \t]*#include +<([\w\d./]+)>/gm;function Su(n){return n.replace(_b,Sb)}var vb=new Map;function Sb(n,t){let e=ne[t];if(e===void 0){let i=vb.get(t);if(i!==void 0)e=ne[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Su(e)}var Mb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dm(n){return n.replace(Mb,bb)}function bb(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Lm(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Tb(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ym?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===iy?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Si&&(t="SHADOWMAP_TYPE_VSM"),t}function wb(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ir:case Dr:t="ENVMAP_TYPE_CUBE";break;case ql:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Eb(n){let t="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===Dr&&(t="ENVMAP_MODE_REFRACTION"),t}function Ab(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case qm:t="ENVMAP_BLENDING_MULTIPLY";break;case My:t="ENVMAP_BLENDING_MIX";break;case by:t="ENVMAP_BLENDING_ADD";break}return t}function Cb(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Rb(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Tb(e),c=wb(e),h=Eb(e),u=Ab(e),f=Cb(e),p=gb(e),g=xb(r),y=s.createProgram(),m,d,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(vo).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(vo).join(`
`),d.length>0&&(d+=`
`)):(m=[Lm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vo).join(`
`),d=[Lm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ts?"#define TONE_MAPPING":"",e.toneMapping!==ts?ne.tonemapping_pars_fragment:"",e.toneMapping!==ts?pb("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,db("linearToOutputTexel",e.outputColorSpace),mb(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(vo).join(`
`)),o=Su(o),o=Pm(o,e),o=Im(o,e),a=Su(a),a=Pm(a,e),a=Im(a,e),o=Dm(o),a=Dm(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Yp?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Yp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let T=w+m+o,v=w+d+a,L=Am(s,s.VERTEX_SHADER,T),I=Am(s,s.FRAGMENT_SHADER,v);s.attachShader(y,L),s.attachShader(y,I),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function R(U){if(n.debug.checkShaderErrors){let Y=s.getProgramInfoLog(y).trim(),$=s.getShaderInfoLog(L).trim(),Z=s.getShaderInfoLog(I).trim(),rt=!0,B=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(rt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,y,L,I);else{let et=Rm(s,L,"vertex"),N=Rm(s,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+Y+`
`+et+`
`+N)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):($===""||Z==="")&&(B=!1);B&&(U.diagnostics={runnable:rt,programLog:Y,vertexShader:{log:$,prefix:m},fragmentShader:{log:Z,prefix:d}})}s.deleteShader(L),s.deleteShader(I),D=new Rr(s,y),M=yb(s,y)}let D;this.getUniforms=function(){return D===void 0&&R(this),D};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(y,cb)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=hb++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=L,this.fragmentShader=I,this}var Pb=0,Mu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new bu(t),e.set(t,i)),i}},bu=class{constructor(t){this.id=Pb++,this.code=t,this.usedTimes=0}};function Ib(n,t,e,i,s,r,o){let a=new El,l=new Mu,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,S,U,Y,$){let Z=Y.fog,rt=$.geometry,B=M.isMeshStandardMaterial?Y.environment:null,et=(M.isMeshStandardMaterial?e:t).get(M.envMap||B),N=et&&et.mapping===ql?et.image.height:null,F=g[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));let J=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,K=J!==void 0?J.length:0,at=0;rt.morphAttributes.position!==void 0&&(at=1),rt.morphAttributes.normal!==void 0&&(at=2),rt.morphAttributes.color!==void 0&&(at=3);let vt,P,H,Q;if(F){let xe=ti[F];vt=xe.vertexShader,P=xe.fragmentShader}else vt=M.vertexShader,P=M.fragmentShader,l.update(M),H=l.getVertexShaderID(M),Q=l.getFragmentShaderID(M);let j=n.getRenderTarget(),pt=n.state.buffers.depth.getReversed(),_t=$.isInstancedMesh===!0,ft=$.isBatchedMesh===!0,Rt=!!M.map,Gt=!!M.matcap,Yt=!!et,O=!!M.aoMap,le=!!M.lightMap,gt=!!M.bumpMap,qt=!!M.normalMap,zt=!!M.displacementMap,ee=!!M.emissiveMap,Lt=!!M.metalnessMap,C=!!M.roughnessMap,_=M.anisotropy>0,q=M.clearcoat>0,ct=M.dispersion>0,ut=M.iridescence>0,lt=M.sheen>0,Dt=M.transmission>0,yt=_&&!!M.anisotropyMap,Mt=q&&!!M.clearcoatMap,Kt=q&&!!M.clearcoatNormalMap,xt=q&&!!M.clearcoatRoughnessMap,Pt=ut&&!!M.iridescenceMap,Ut=ut&&!!M.iridescenceThicknessMap,Xt=lt&&!!M.sheenColorMap,wt=lt&&!!M.sheenRoughnessMap,Bt=!!M.specularMap,Ot=!!M.specularColorMap,ue=!!M.specularIntensityMap,k=Dt&&!!M.transmissionMap,bt=Dt&&!!M.thicknessMap,ot=!!M.gradientMap,dt=!!M.alphaMap,Tt=M.alphaTest>0,Et=!!M.alphaHash,Jt=!!M.extensions,Ce=ts;M.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ce=n.toneMapping);let ke={shaderID:F,shaderType:M.type,shaderName:M.name,vertexShader:vt,fragmentShader:P,defines:M.defines,customVertexShaderID:H,customFragmentShaderID:Q,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:ft,batchingColor:ft&&$._colorsTexture!==null,instancing:_t,instancingColor:_t&&$.instanceColor!==null,instancingMorph:_t&&$.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:j===null?n.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:kr,alphaToCoverage:!!M.alphaToCoverage,map:Rt,matcap:Gt,envMap:Yt,envMapMode:Yt&&et.mapping,envMapCubeUVHeight:N,aoMap:O,lightMap:le,bumpMap:gt,normalMap:qt,displacementMap:f&&zt,emissiveMap:ee,normalMapObjectSpace:qt&&M.normalMapType===Uy,normalMapTangentSpace:qt&&M.normalMapType===r0,metalnessMap:Lt,roughnessMap:C,anisotropy:_,anisotropyMap:yt,clearcoat:q,clearcoatMap:Mt,clearcoatNormalMap:Kt,clearcoatRoughnessMap:xt,dispersion:ct,iridescence:ut,iridescenceMap:Pt,iridescenceThicknessMap:Ut,sheen:lt,sheenColorMap:Xt,sheenRoughnessMap:wt,specularMap:Bt,specularColorMap:Ot,specularIntensityMap:ue,transmission:Dt,transmissionMap:k,thicknessMap:bt,gradientMap:ot,opaque:M.transparent===!1&&M.blending===wr&&M.alphaToCoverage===!1,alphaMap:dt,alphaTest:Tt,alphaHash:Et,combine:M.combine,mapUv:Rt&&y(M.map.channel),aoMapUv:O&&y(M.aoMap.channel),lightMapUv:le&&y(M.lightMap.channel),bumpMapUv:gt&&y(M.bumpMap.channel),normalMapUv:qt&&y(M.normalMap.channel),displacementMapUv:zt&&y(M.displacementMap.channel),emissiveMapUv:ee&&y(M.emissiveMap.channel),metalnessMapUv:Lt&&y(M.metalnessMap.channel),roughnessMapUv:C&&y(M.roughnessMap.channel),anisotropyMapUv:yt&&y(M.anisotropyMap.channel),clearcoatMapUv:Mt&&y(M.clearcoatMap.channel),clearcoatNormalMapUv:Kt&&y(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&y(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Pt&&y(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&y(M.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&y(M.sheenColorMap.channel),sheenRoughnessMapUv:wt&&y(M.sheenRoughnessMap.channel),specularMapUv:Bt&&y(M.specularMap.channel),specularColorMapUv:Ot&&y(M.specularColorMap.channel),specularIntensityMapUv:ue&&y(M.specularIntensityMap.channel),transmissionMapUv:k&&y(M.transmissionMap.channel),thicknessMapUv:bt&&y(M.thicknessMap.channel),alphaMapUv:dt&&y(M.alphaMap.channel),vertexTangents:!!rt.attributes.tangent&&(qt||_),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,pointsUvs:$.isPoints===!0&&!!rt.attributes.uv&&(Rt||dt),fog:!!Z,useFog:M.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:pt,skinning:$.isSkinnedMesh===!0,morphTargets:rt.morphAttributes.position!==void 0,morphNormals:rt.morphAttributes.normal!==void 0,morphColors:rt.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:at,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ce,decodeVideoTexture:Rt&&M.map.isVideoTexture===!0&&fe.getTransfer(M.map.colorSpace)===Me,decodeVideoTextureEmissive:ee&&M.emissiveMap.isVideoTexture===!0&&fe.getTransfer(M.emissiveMap.colorSpace)===Me,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===bi,flipSided:M.side===mn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Jt&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Jt&&M.extensions.multiDraw===!0||ft)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ke.vertexUv1s=c.has(1),ke.vertexUv2s=c.has(2),ke.vertexUv3s=c.has(3),c.clear(),ke}function d(M){let S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(let U in M.defines)S.push(U),S.push(M.defines[U]);return M.isRawShaderMaterial===!1&&(w(S,M),T(S,M),S.push(n.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function w(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function T(M,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function v(M){let S=g[M.type],U;if(S){let Y=ti[S];U=S_.clone(Y.uniforms)}else U=M.uniforms;return U}function L(M,S){let U;for(let Y=0,$=h.length;Y<$;Y++){let Z=h[Y];if(Z.cacheKey===S){U=Z,++U.usedTimes;break}}return U===void 0&&(U=new Rb(n,S,M,r),h.push(U)),U}function I(M){if(--M.usedTimes===0){let S=h.indexOf(M);h[S]=h[h.length-1],h.pop(),M.destroy()}}function R(M){l.remove(M)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:v,acquireProgram:L,releaseProgram:I,releaseShaderCache:R,programs:h,dispose:D}}function Db(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Lb(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Um(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Nm(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,f,p,g,y,m){let d=n[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:y,group:m},n[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=y,d.group=m),t++,d}function a(u,f,p,g,y,m){let d=o(u,f,p,g,y,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):e.push(d)}function l(u,f,p,g,y,m){let d=o(u,f,p,g,y,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function c(u,f){e.length>1&&e.sort(u||Lb),i.length>1&&i.sort(f||Um),s.length>1&&s.sort(f||Um)}function h(){for(let u=t,f=n.length;u<f;u++){let p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Ub(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new Nm,n.set(i,[o])):s>=r.length?(o=new Nm,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Nb(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new G,color:new he};break;case"SpotLight":e={position:new G,direction:new G,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new G,color:new he,distance:0,decay:0};break;case"HemisphereLight":e={direction:new G,skyColor:new he,groundColor:new he};break;case"RectAreaLight":e={color:new he,position:new G,halfWidth:new G,halfHeight:new G};break}return n[t.id]=e,e}}}function Fb(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var Ob=0;function Bb(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function zb(n){let t=new Nb,e=Fb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new G);let s=new G,r=new De,o=new De;function a(c){let h=0,u=0,f=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let p=0,g=0,y=0,m=0,d=0,w=0,T=0,v=0,L=0,I=0,R=0;c.sort(Bb);for(let M=0,S=c.length;M<S;M++){let U=c[M],Y=U.color,$=U.intensity,Z=U.distance,rt=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=Y.r*$,u+=Y.g*$,f+=Y.b*$;else if(U.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(U.sh.coefficients[B],$);R++}else if(U.isDirectionalLight){let B=t.get(U);if(B.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let et=U.shadow,N=e.get(U);N.shadowIntensity=et.intensity,N.shadowBias=et.bias,N.shadowNormalBias=et.normalBias,N.shadowRadius=et.radius,N.shadowMapSize=et.mapSize,i.directionalShadow[p]=N,i.directionalShadowMap[p]=rt,i.directionalShadowMatrix[p]=U.shadow.matrix,w++}i.directional[p]=B,p++}else if(U.isSpotLight){let B=t.get(U);B.position.setFromMatrixPosition(U.matrixWorld),B.color.copy(Y).multiplyScalar($),B.distance=Z,B.coneCos=Math.cos(U.angle),B.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),B.decay=U.decay,i.spot[y]=B;let et=U.shadow;if(U.map&&(i.spotLightMap[L]=U.map,L++,et.updateMatrices(U),U.castShadow&&I++),i.spotLightMatrix[y]=et.matrix,U.castShadow){let N=e.get(U);N.shadowIntensity=et.intensity,N.shadowBias=et.bias,N.shadowNormalBias=et.normalBias,N.shadowRadius=et.radius,N.shadowMapSize=et.mapSize,i.spotShadow[y]=N,i.spotShadowMap[y]=rt,v++}y++}else if(U.isRectAreaLight){let B=t.get(U);B.color.copy(Y).multiplyScalar($),B.halfWidth.set(U.width*.5,0,0),B.halfHeight.set(0,U.height*.5,0),i.rectArea[m]=B,m++}else if(U.isPointLight){let B=t.get(U);if(B.color.copy(U.color).multiplyScalar(U.intensity),B.distance=U.distance,B.decay=U.decay,U.castShadow){let et=U.shadow,N=e.get(U);N.shadowIntensity=et.intensity,N.shadowBias=et.bias,N.shadowNormalBias=et.normalBias,N.shadowRadius=et.radius,N.shadowMapSize=et.mapSize,N.shadowCameraNear=et.camera.near,N.shadowCameraFar=et.camera.far,i.pointShadow[g]=N,i.pointShadowMap[g]=rt,i.pointShadowMatrix[g]=U.shadow.matrix,T++}i.point[g]=B,g++}else if(U.isHemisphereLight){let B=t.get(U);B.skyColor.copy(U.color).multiplyScalar($),B.groundColor.copy(U.groundColor).multiplyScalar($),i.hemi[d]=B,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ct.LTC_FLOAT_1,i.rectAreaLTC2=Ct.LTC_FLOAT_2):(i.rectAreaLTC1=Ct.LTC_HALF_1,i.rectAreaLTC2=Ct.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;let D=i.hash;(D.directionalLength!==p||D.pointLength!==g||D.spotLength!==y||D.rectAreaLength!==m||D.hemiLength!==d||D.numDirectionalShadows!==w||D.numPointShadows!==T||D.numSpotShadows!==v||D.numSpotMaps!==L||D.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=y,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=v+L-I,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=R,D.directionalLength=p,D.pointLength=g,D.spotLength=y,D.rectAreaLength=m,D.hemiLength=d,D.numDirectionalShadows=w,D.numPointShadows=T,D.numSpotShadows=v,D.numSpotMaps=L,D.numLightProbes=R,i.version=Ob++)}function l(c,h){let u=0,f=0,p=0,g=0,y=0,m=h.matrixWorldInverse;for(let d=0,w=c.length;d<w;d++){let T=c[d];if(T.isDirectionalLight){let v=i.directional[u];v.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),u++}else if(T.isSpotLight){let v=i.spot[p];v.position.setFromMatrixPosition(T.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),p++}else if(T.isRectAreaLight){let v=i.rectArea[g];v.position.setFromMatrixPosition(T.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(T.width*.5,0,0),v.halfHeight.set(0,T.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){let v=i.point[f];v.position.setFromMatrixPosition(T.matrixWorld),v.position.applyMatrix4(m),f++}else if(T.isHemisphereLight){let v=i.hemi[y];v.direction.setFromMatrixPosition(T.matrixWorld),v.direction.transformDirection(m),y++}}}return{setup:a,setupView:l,state:i}}function Fm(n){let t=new zb(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function kb(n){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Fm(n),t.set(s,[a])):r>=o.length?(a=new Fm(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var Tu=class extends ss{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Dy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},wu=class extends ss{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Vb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Hb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Gb(n,t,e){let i=new wo,s=new ge,r=new ge,o=new be,a=new Tu({depthPacking:Ly}),l=new wu,c={},h=e.maxTextureSize,u={[es]:mn,[mn]:es,[bi]:bi},f=new ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:Vb,fragmentShader:Hb}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new Sn;g.setAttribute("position",new Rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Ie(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ym;let d=this.type;this.render=function(I,R,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||I.length===0)return;let M=n.getRenderTarget(),S=n.getActiveCubeFace(),U=n.getActiveMipmapLevel(),Y=n.state;Y.setBlending(ji),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);let $=d!==Si&&this.type===Si,Z=d===Si&&this.type!==Si;for(let rt=0,B=I.length;rt<B;rt++){let et=I[rt],N=et.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);let F=N.getFrameExtents();if(s.multiply(F),r.copy(N.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/F.x),s.x=r.x*F.x,N.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/F.y),s.y=r.y*F.y,N.mapSize.y=r.y)),N.map===null||$===!0||Z===!0){let K=this.type!==Si?{minFilter:Gn,magFilter:Gn}:{};N.map!==null&&N.map.dispose(),N.map=new Ci(s.x,s.y,K),N.map.texture.name=et.name+".shadowMap",N.camera.updateProjectionMatrix()}n.setRenderTarget(N.map),n.clear();let J=N.getViewportCount();for(let K=0;K<J;K++){let at=N.getViewport(K);o.set(r.x*at.x,r.y*at.y,r.x*at.z,r.y*at.w),Y.viewport(o),N.updateMatrices(et,K),i=N.getFrustum(),v(R,D,N.camera,et,this.type)}N.isPointLightShadow!==!0&&this.type===Si&&w(N,D),N.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(M,S,U)};function w(I,R){let D=t.update(y);f.defines.VSM_SAMPLES!==I.blurSamples&&(f.defines.VSM_SAMPLES=I.blurSamples,p.defines.VSM_SAMPLES=I.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new Ci(s.x,s.y)),f.uniforms.shadow_pass.value=I.map.texture,f.uniforms.resolution.value=I.mapSize,f.uniforms.radius.value=I.radius,n.setRenderTarget(I.mapPass),n.clear(),n.renderBufferDirect(R,null,D,f,y,null),p.uniforms.shadow_pass.value=I.mapPass.texture,p.uniforms.resolution.value=I.mapSize,p.uniforms.radius.value=I.radius,n.setRenderTarget(I.map),n.clear(),n.renderBufferDirect(R,null,D,p,y,null)}function T(I,R,D,M){let S=null,U=D.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(U!==void 0)S=U;else if(S=D.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let Y=S.uuid,$=R.uuid,Z=c[Y];Z===void 0&&(Z={},c[Y]=Z);let rt=Z[$];rt===void 0&&(rt=S.clone(),Z[$]=rt,R.addEventListener("dispose",L)),S=rt}if(S.visible=R.visible,S.wireframe=R.wireframe,M===Si?S.side=R.shadowSide!==null?R.shadowSide:R.side:S.side=R.shadowSide!==null?R.shadowSide:u[R.side],S.alphaMap=R.alphaMap,S.alphaTest=R.alphaTest,S.map=R.map,S.clipShadows=R.clipShadows,S.clippingPlanes=R.clippingPlanes,S.clipIntersection=R.clipIntersection,S.displacementMap=R.displacementMap,S.displacementScale=R.displacementScale,S.displacementBias=R.displacementBias,S.wireframeLinewidth=R.wireframeLinewidth,S.linewidth=R.linewidth,D.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let Y=n.properties.get(S);Y.light=D}return S}function v(I,R,D,M,S){if(I.visible===!1)return;if(I.layers.test(R.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&S===Si)&&(!I.frustumCulled||i.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,I.matrixWorld);let $=t.update(I),Z=I.material;if(Array.isArray(Z)){let rt=$.groups;for(let B=0,et=rt.length;B<et;B++){let N=rt[B],F=Z[N.materialIndex];if(F&&F.visible){let J=T(I,F,M,S);I.onBeforeShadow(n,I,R,D,$,J,N),n.renderBufferDirect(D,null,$,J,I,N),I.onAfterShadow(n,I,R,D,$,J,N)}}}else if(Z.visible){let rt=T(I,Z,M,S);I.onBeforeShadow(n,I,R,D,$,rt,null),n.renderBufferDirect(D,null,$,rt,I,null),I.onAfterShadow(n,I,R,D,$,rt,null)}}let Y=I.children;for(let $=0,Z=Y.length;$<Z;$++)v(Y[$],R,D,M,S)}function L(I){I.target.removeEventListener("dispose",L);for(let D in c){let M=c[D],S=I.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}var Wb={[Rh]:Ph,[Ih]:Uh,[Dh]:Nh,[Pr]:Lh,[Ph]:Rh,[Uh]:Ih,[Nh]:Dh,[Lh]:Pr};function Xb(n,t){function e(){let k=!1,bt=new be,ot=null,dt=new be(0,0,0,0);return{setMask:function(Tt){ot!==Tt&&!k&&(n.colorMask(Tt,Tt,Tt,Tt),ot=Tt)},setLocked:function(Tt){k=Tt},setClear:function(Tt,Et,Jt,Ce,ke){ke===!0&&(Tt*=Ce,Et*=Ce,Jt*=Ce),bt.set(Tt,Et,Jt,Ce),dt.equals(bt)===!1&&(n.clearColor(Tt,Et,Jt,Ce),dt.copy(bt))},reset:function(){k=!1,ot=null,dt.set(-1,0,0,0)}}}function i(){let k=!1,bt=!1,ot=null,dt=null,Tt=null;return{setReversed:function(Et){if(bt!==Et){let Jt=t.get("EXT_clip_control");bt?Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.ZERO_TO_ONE_EXT):Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.NEGATIVE_ONE_TO_ONE_EXT);let Ce=Tt;Tt=null,this.setClear(Ce)}bt=Et},getReversed:function(){return bt},setTest:function(Et){Et?j(n.DEPTH_TEST):pt(n.DEPTH_TEST)},setMask:function(Et){ot!==Et&&!k&&(n.depthMask(Et),ot=Et)},setFunc:function(Et){if(bt&&(Et=Wb[Et]),dt!==Et){switch(Et){case Rh:n.depthFunc(n.NEVER);break;case Ph:n.depthFunc(n.ALWAYS);break;case Ih:n.depthFunc(n.LESS);break;case Pr:n.depthFunc(n.LEQUAL);break;case Dh:n.depthFunc(n.EQUAL);break;case Lh:n.depthFunc(n.GEQUAL);break;case Uh:n.depthFunc(n.GREATER);break;case Nh:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}dt=Et}},setLocked:function(Et){k=Et},setClear:function(Et){Tt!==Et&&(bt&&(Et=1-Et),n.clearDepth(Et),Tt=Et)},reset:function(){k=!1,ot=null,dt=null,Tt=null,bt=!1}}}function s(){let k=!1,bt=null,ot=null,dt=null,Tt=null,Et=null,Jt=null,Ce=null,ke=null;return{setTest:function(xe){k||(xe?j(n.STENCIL_TEST):pt(n.STENCIL_TEST))},setMask:function(xe){bt!==xe&&!k&&(n.stencilMask(xe),bt=xe)},setFunc:function(xe,rn,Un){(ot!==xe||dt!==rn||Tt!==Un)&&(n.stencilFunc(xe,rn,Un),ot=xe,dt=rn,Tt=Un)},setOp:function(xe,rn,Un){(Et!==xe||Jt!==rn||Ce!==Un)&&(n.stencilOp(xe,rn,Un),Et=xe,Jt=rn,Ce=Un)},setLocked:function(xe){k=xe},setClear:function(xe){ke!==xe&&(n.clearStencil(xe),ke=xe)},reset:function(){k=!1,bt=null,ot=null,dt=null,Tt=null,Et=null,Jt=null,Ce=null,ke=null}}}let r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap,h={},u={},f=new WeakMap,p=[],g=null,y=!1,m=null,d=null,w=null,T=null,v=null,L=null,I=null,R=new he(0,0,0),D=0,M=!1,S=null,U=null,Y=null,$=null,Z=null,rt=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,et=0,N=n.getParameter(n.VERSION);N.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(N)[1]),B=et>=1):N.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),B=et>=2);let F=null,J={},K=n.getParameter(n.SCISSOR_BOX),at=n.getParameter(n.VIEWPORT),vt=new be().fromArray(K),P=new be().fromArray(at);function H(k,bt,ot,dt){let Tt=new Uint8Array(4),Et=n.createTexture();n.bindTexture(k,Et),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Jt=0;Jt<ot;Jt++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(bt,0,n.RGBA,1,1,dt,0,n.RGBA,n.UNSIGNED_BYTE,Tt):n.texImage2D(bt+Jt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Tt);return Et}let Q={};Q[n.TEXTURE_2D]=H(n.TEXTURE_2D,n.TEXTURE_2D,1),Q[n.TEXTURE_CUBE_MAP]=H(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[n.TEXTURE_2D_ARRAY]=H(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Q[n.TEXTURE_3D]=H(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),j(n.DEPTH_TEST),o.setFunc(Pr),gt(!1),qt(Op),j(n.CULL_FACE),O(ji);function j(k){h[k]!==!0&&(n.enable(k),h[k]=!0)}function pt(k){h[k]!==!1&&(n.disable(k),h[k]=!1)}function _t(k,bt){return u[k]!==bt?(n.bindFramebuffer(k,bt),u[k]=bt,k===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=bt),k===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=bt),!0):!1}function ft(k,bt){let ot=p,dt=!1;if(k){ot=f.get(bt),ot===void 0&&(ot=[],f.set(bt,ot));let Tt=k.textures;if(ot.length!==Tt.length||ot[0]!==n.COLOR_ATTACHMENT0){for(let Et=0,Jt=Tt.length;Et<Jt;Et++)ot[Et]=n.COLOR_ATTACHMENT0+Et;ot.length=Tt.length,dt=!0}}else ot[0]!==n.BACK&&(ot[0]=n.BACK,dt=!0);dt&&n.drawBuffers(ot)}function Rt(k){return g!==k?(n.useProgram(k),g=k,!0):!1}let Gt={[Ts]:n.FUNC_ADD,[ry]:n.FUNC_SUBTRACT,[oy]:n.FUNC_REVERSE_SUBTRACT};Gt[ay]=n.MIN,Gt[ly]=n.MAX;let Yt={[cy]:n.ZERO,[hy]:n.ONE,[uy]:n.SRC_COLOR,[Ah]:n.SRC_ALPHA,[xy]:n.SRC_ALPHA_SATURATE,[my]:n.DST_COLOR,[dy]:n.DST_ALPHA,[fy]:n.ONE_MINUS_SRC_COLOR,[Ch]:n.ONE_MINUS_SRC_ALPHA,[gy]:n.ONE_MINUS_DST_COLOR,[py]:n.ONE_MINUS_DST_ALPHA,[yy]:n.CONSTANT_COLOR,[_y]:n.ONE_MINUS_CONSTANT_COLOR,[vy]:n.CONSTANT_ALPHA,[Sy]:n.ONE_MINUS_CONSTANT_ALPHA};function O(k,bt,ot,dt,Tt,Et,Jt,Ce,ke,xe){if(k===ji){y===!0&&(pt(n.BLEND),y=!1);return}if(y===!1&&(j(n.BLEND),y=!0),k!==sy){if(k!==m||xe!==M){if((d!==Ts||v!==Ts)&&(n.blendEquation(n.FUNC_ADD),d=Ts,v=Ts),xe)switch(k){case wr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Bp:n.blendFunc(n.ONE,n.ONE);break;case zp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case kp:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case wr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Bp:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case zp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case kp:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}w=null,T=null,L=null,I=null,R.set(0,0,0),D=0,m=k,M=xe}return}Tt=Tt||bt,Et=Et||ot,Jt=Jt||dt,(bt!==d||Tt!==v)&&(n.blendEquationSeparate(Gt[bt],Gt[Tt]),d=bt,v=Tt),(ot!==w||dt!==T||Et!==L||Jt!==I)&&(n.blendFuncSeparate(Yt[ot],Yt[dt],Yt[Et],Yt[Jt]),w=ot,T=dt,L=Et,I=Jt),(Ce.equals(R)===!1||ke!==D)&&(n.blendColor(Ce.r,Ce.g,Ce.b,ke),R.copy(Ce),D=ke),m=k,M=!1}function le(k,bt){k.side===bi?pt(n.CULL_FACE):j(n.CULL_FACE);let ot=k.side===mn;bt&&(ot=!ot),gt(ot),k.blending===wr&&k.transparent===!1?O(ji):O(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);let dt=k.stencilWrite;a.setTest(dt),dt&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),ee(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?j(n.SAMPLE_ALPHA_TO_COVERAGE):pt(n.SAMPLE_ALPHA_TO_COVERAGE)}function gt(k){S!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),S=k)}function qt(k){k!==ey?(j(n.CULL_FACE),k!==U&&(k===Op?n.cullFace(n.BACK):k===ny?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):pt(n.CULL_FACE),U=k}function zt(k){k!==Y&&(B&&n.lineWidth(k),Y=k)}function ee(k,bt,ot){k?(j(n.POLYGON_OFFSET_FILL),($!==bt||Z!==ot)&&(n.polygonOffset(bt,ot),$=bt,Z=ot)):pt(n.POLYGON_OFFSET_FILL)}function Lt(k){k?j(n.SCISSOR_TEST):pt(n.SCISSOR_TEST)}function C(k){k===void 0&&(k=n.TEXTURE0+rt-1),F!==k&&(n.activeTexture(k),F=k)}function _(k,bt,ot){ot===void 0&&(F===null?ot=n.TEXTURE0+rt-1:ot=F);let dt=J[ot];dt===void 0&&(dt={type:void 0,texture:void 0},J[ot]=dt),(dt.type!==k||dt.texture!==bt)&&(F!==ot&&(n.activeTexture(ot),F=ot),n.bindTexture(k,bt||Q[k]),dt.type=k,dt.texture=bt)}function q(){let k=J[F];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ct(){try{n.compressedTexImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ut(){try{n.compressedTexImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function lt(){try{n.texSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Dt(){try{n.texSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function yt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Mt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Kt(){try{n.texStorage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function xt(){try{n.texStorage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Pt(){try{n.texImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ut(){try{n.texImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Xt(k){vt.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),vt.copy(k))}function wt(k){P.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),P.copy(k))}function Bt(k,bt){let ot=c.get(bt);ot===void 0&&(ot=new WeakMap,c.set(bt,ot));let dt=ot.get(k);dt===void 0&&(dt=n.getUniformBlockIndex(bt,k.name),ot.set(k,dt))}function Ot(k,bt){let dt=c.get(bt).get(k);l.get(bt)!==dt&&(n.uniformBlockBinding(bt,dt,k.__bindingPointIndex),l.set(bt,dt))}function ue(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},F=null,J={},u={},f=new WeakMap,p=[],g=null,y=!1,m=null,d=null,w=null,T=null,v=null,L=null,I=null,R=new he(0,0,0),D=0,M=!1,S=null,U=null,Y=null,$=null,Z=null,vt.set(0,0,n.canvas.width,n.canvas.height),P.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:j,disable:pt,bindFramebuffer:_t,drawBuffers:ft,useProgram:Rt,setBlending:O,setMaterial:le,setFlipSided:gt,setCullFace:qt,setLineWidth:zt,setPolygonOffset:ee,setScissorTest:Lt,activeTexture:C,bindTexture:_,unbindTexture:q,compressedTexImage2D:ct,compressedTexImage3D:ut,texImage2D:Pt,texImage3D:Ut,updateUBOMapping:Bt,uniformBlockBinding:Ot,texStorage2D:Kt,texStorage3D:xt,texSubImage2D:lt,texSubImage3D:Dt,compressedTexSubImage2D:yt,compressedTexSubImage3D:Mt,scissor:Xt,viewport:wt,reset:ue}}function Om(n,t,e,i){let s=Yb(i);switch(e){case Qm:return n*t;case t0:return n*t;case e0:return n*t*2;case n0:return n*t/s.components*s.byteLength;case Wu:return n*t/s.components*s.byteLength;case i0:return n*t*2/s.components*s.byteLength;case Xu:return n*t*2/s.components*s.byteLength;case jm:return n*t*3/s.components*s.byteLength;case Hn:return n*t*4/s.components*s.byteLength;case Yu:return n*t*4/s.components*s.byteLength;case ml:case gl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case xl:case yl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Vh:case Gh:return Math.max(n,16)*Math.max(t,8)/4;case kh:case Hh:return Math.max(n,8)*Math.max(t,8)/2;case Wh:case Xh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Yh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case qh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case $h:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Zh:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Kh:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Jh:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Qh:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case jh:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case tu:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case eu:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case nu:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case iu:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case su:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case ru:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ou:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case _l:case au:case lu:return Math.ceil(n/4)*Math.ceil(t/4)*16;case s0:case cu:return Math.ceil(n/4)*Math.ceil(t/4)*8;case hu:case uu:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Yb(n){switch(n){case Ai:case Zm:return{byteLength:1,components:1};case bo:case Km:case Co:return{byteLength:2,components:1};case Hu:case Gu:return{byteLength:2,components:4};case Cs:case Vu:case Ti:return{byteLength:4,components:1};case Jm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function qb(n,t,e,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ge,h=new WeakMap,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,_){return p?new OffscreenCanvas(C,_):Ml("canvas")}function y(C,_,q){let ct=1,ut=Lt(C);if((ut.width>q||ut.height>q)&&(ct=q/Math.max(ut.width,ut.height)),ct<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let lt=Math.floor(ct*ut.width),Dt=Math.floor(ct*ut.height);u===void 0&&(u=g(lt,Dt));let yt=_?g(lt,Dt):u;return yt.width=lt,yt.height=Dt,yt.getContext("2d").drawImage(C,0,0,lt,Dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ut.width+"x"+ut.height+") to ("+lt+"x"+Dt+")."),yt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ut.width+"x"+ut.height+")."),C;return C}function m(C){return C.generateMipmaps}function d(C){n.generateMipmap(C)}function w(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(C,_,q,ct,ut=!1){if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let lt=_;if(_===n.RED&&(q===n.FLOAT&&(lt=n.R32F),q===n.HALF_FLOAT&&(lt=n.R16F),q===n.UNSIGNED_BYTE&&(lt=n.R8)),_===n.RED_INTEGER&&(q===n.UNSIGNED_BYTE&&(lt=n.R8UI),q===n.UNSIGNED_SHORT&&(lt=n.R16UI),q===n.UNSIGNED_INT&&(lt=n.R32UI),q===n.BYTE&&(lt=n.R8I),q===n.SHORT&&(lt=n.R16I),q===n.INT&&(lt=n.R32I)),_===n.RG&&(q===n.FLOAT&&(lt=n.RG32F),q===n.HALF_FLOAT&&(lt=n.RG16F),q===n.UNSIGNED_BYTE&&(lt=n.RG8)),_===n.RG_INTEGER&&(q===n.UNSIGNED_BYTE&&(lt=n.RG8UI),q===n.UNSIGNED_SHORT&&(lt=n.RG16UI),q===n.UNSIGNED_INT&&(lt=n.RG32UI),q===n.BYTE&&(lt=n.RG8I),q===n.SHORT&&(lt=n.RG16I),q===n.INT&&(lt=n.RG32I)),_===n.RGB_INTEGER&&(q===n.UNSIGNED_BYTE&&(lt=n.RGB8UI),q===n.UNSIGNED_SHORT&&(lt=n.RGB16UI),q===n.UNSIGNED_INT&&(lt=n.RGB32UI),q===n.BYTE&&(lt=n.RGB8I),q===n.SHORT&&(lt=n.RGB16I),q===n.INT&&(lt=n.RGB32I)),_===n.RGBA_INTEGER&&(q===n.UNSIGNED_BYTE&&(lt=n.RGBA8UI),q===n.UNSIGNED_SHORT&&(lt=n.RGBA16UI),q===n.UNSIGNED_INT&&(lt=n.RGBA32UI),q===n.BYTE&&(lt=n.RGBA8I),q===n.SHORT&&(lt=n.RGBA16I),q===n.INT&&(lt=n.RGBA32I)),_===n.RGB&&q===n.UNSIGNED_INT_5_9_9_9_REV&&(lt=n.RGB9_E5),_===n.RGBA){let Dt=ut?$l:fe.getTransfer(ct);q===n.FLOAT&&(lt=n.RGBA32F),q===n.HALF_FLOAT&&(lt=n.RGBA16F),q===n.UNSIGNED_BYTE&&(lt=Dt===Me?n.SRGB8_ALPHA8:n.RGBA8),q===n.UNSIGNED_SHORT_4_4_4_4&&(lt=n.RGBA4),q===n.UNSIGNED_SHORT_5_5_5_1&&(lt=n.RGB5_A1)}return(lt===n.R16F||lt===n.R32F||lt===n.RG16F||lt===n.RG32F||lt===n.RGBA16F||lt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),lt}function v(C,_){let q;return C?_===null||_===Cs||_===Lr?q=n.DEPTH24_STENCIL8:_===Ti?q=n.DEPTH32F_STENCIL8:_===bo&&(q=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Cs||_===Lr?q=n.DEPTH_COMPONENT24:_===Ti?q=n.DEPTH_COMPONENT32F:_===bo&&(q=n.DEPTH_COMPONENT16),q}function L(C,_){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Gn&&C.minFilter!==ei?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function I(C){let _=C.target;_.removeEventListener("dispose",I),D(_),_.isVideoTexture&&h.delete(_)}function R(C){let _=C.target;_.removeEventListener("dispose",R),S(_)}function D(C){let _=i.get(C);if(_.__webglInit===void 0)return;let q=C.source,ct=f.get(q);if(ct){let ut=ct[_.__cacheKey];ut.usedTimes--,ut.usedTimes===0&&M(C),Object.keys(ct).length===0&&f.delete(q)}i.remove(C)}function M(C){let _=i.get(C);n.deleteTexture(_.__webglTexture);let q=C.source,ct=f.get(q);delete ct[_.__cacheKey],o.memory.textures--}function S(C){let _=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ct=0;ct<6;ct++){if(Array.isArray(_.__webglFramebuffer[ct]))for(let ut=0;ut<_.__webglFramebuffer[ct].length;ut++)n.deleteFramebuffer(_.__webglFramebuffer[ct][ut]);else n.deleteFramebuffer(_.__webglFramebuffer[ct]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[ct])}else{if(Array.isArray(_.__webglFramebuffer))for(let ct=0;ct<_.__webglFramebuffer.length;ct++)n.deleteFramebuffer(_.__webglFramebuffer[ct]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let ct=0;ct<_.__webglColorRenderbuffer.length;ct++)_.__webglColorRenderbuffer[ct]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[ct]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let q=C.textures;for(let ct=0,ut=q.length;ct<ut;ct++){let lt=i.get(q[ct]);lt.__webglTexture&&(n.deleteTexture(lt.__webglTexture),o.memory.textures--),i.remove(q[ct])}i.remove(C)}let U=0;function Y(){U=0}function $(){let C=U;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),U+=1,C}function Z(C){let _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function rt(C,_){let q=i.get(C);if(C.isVideoTexture&&zt(C),C.isRenderTargetTexture===!1&&C.version>0&&q.__version!==C.version){let ct=C.image;if(ct===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ct.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{P(q,C,_);return}}e.bindTexture(n.TEXTURE_2D,q.__webglTexture,n.TEXTURE0+_)}function B(C,_){let q=i.get(C);if(C.version>0&&q.__version!==C.version){P(q,C,_);return}e.bindTexture(n.TEXTURE_2D_ARRAY,q.__webglTexture,n.TEXTURE0+_)}function et(C,_){let q=i.get(C);if(C.version>0&&q.__version!==C.version){P(q,C,_);return}e.bindTexture(n.TEXTURE_3D,q.__webglTexture,n.TEXTURE0+_)}function N(C,_){let q=i.get(C);if(C.version>0&&q.__version!==C.version){H(q,C,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture,n.TEXTURE0+_)}let F={[Bh]:n.REPEAT,[Es]:n.CLAMP_TO_EDGE,[zh]:n.MIRRORED_REPEAT},J={[Gn]:n.NEAREST,[Iy]:n.NEAREST_MIPMAP_NEAREST,[Ha]:n.NEAREST_MIPMAP_LINEAR,[ei]:n.LINEAR,[Zc]:n.LINEAR_MIPMAP_NEAREST,[As]:n.LINEAR_MIPMAP_LINEAR},K={[Ny]:n.NEVER,[Vy]:n.ALWAYS,[Fy]:n.LESS,[o0]:n.LEQUAL,[Oy]:n.EQUAL,[ky]:n.GEQUAL,[By]:n.GREATER,[zy]:n.NOTEQUAL};function at(C,_){if(_.type===Ti&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===ei||_.magFilter===Zc||_.magFilter===Ha||_.magFilter===As||_.minFilter===ei||_.minFilter===Zc||_.minFilter===Ha||_.minFilter===As)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,F[_.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,F[_.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,F[_.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,J[_.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,J[_.minFilter]),_.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,K[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Gn||_.minFilter!==Ha&&_.minFilter!==As||_.type===Ti&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let q=t.get("EXT_texture_filter_anisotropic");n.texParameterf(C,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function vt(C,_){let q=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",I));let ct=_.source,ut=f.get(ct);ut===void 0&&(ut={},f.set(ct,ut));let lt=Z(_);if(lt!==C.__cacheKey){ut[lt]===void 0&&(ut[lt]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,q=!0),ut[lt].usedTimes++;let Dt=ut[C.__cacheKey];Dt!==void 0&&(ut[C.__cacheKey].usedTimes--,Dt.usedTimes===0&&M(_)),C.__cacheKey=lt,C.__webglTexture=ut[lt].texture}return q}function P(C,_,q){let ct=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(ct=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(ct=n.TEXTURE_3D);let ut=vt(C,_),lt=_.source;e.bindTexture(ct,C.__webglTexture,n.TEXTURE0+q);let Dt=i.get(lt);if(lt.version!==Dt.__version||ut===!0){e.activeTexture(n.TEXTURE0+q);let yt=fe.getPrimaries(fe.workingColorSpace),Mt=_.colorSpace===Ji?null:fe.getPrimaries(_.colorSpace),Kt=_.colorSpace===Ji||yt===Mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt);let xt=y(_.image,!1,s.maxTextureSize);xt=ee(_,xt);let Pt=r.convert(_.format,_.colorSpace),Ut=r.convert(_.type),Xt=T(_.internalFormat,Pt,Ut,_.colorSpace,_.isVideoTexture);at(ct,_);let wt,Bt=_.mipmaps,Ot=_.isVideoTexture!==!0,ue=Dt.__version===void 0||ut===!0,k=lt.dataReady,bt=L(_,xt);if(_.isDepthTexture)Xt=v(_.format===Ur,_.type),ue&&(Ot?e.texStorage2D(n.TEXTURE_2D,1,Xt,xt.width,xt.height):e.texImage2D(n.TEXTURE_2D,0,Xt,xt.width,xt.height,0,Pt,Ut,null));else if(_.isDataTexture)if(Bt.length>0){Ot&&ue&&e.texStorage2D(n.TEXTURE_2D,bt,Xt,Bt[0].width,Bt[0].height);for(let ot=0,dt=Bt.length;ot<dt;ot++)wt=Bt[ot],Ot?k&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,wt.width,wt.height,Pt,Ut,wt.data):e.texImage2D(n.TEXTURE_2D,ot,Xt,wt.width,wt.height,0,Pt,Ut,wt.data);_.generateMipmaps=!1}else Ot?(ue&&e.texStorage2D(n.TEXTURE_2D,bt,Xt,xt.width,xt.height),k&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,xt.width,xt.height,Pt,Ut,xt.data)):e.texImage2D(n.TEXTURE_2D,0,Xt,xt.width,xt.height,0,Pt,Ut,xt.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ot&&ue&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Xt,Bt[0].width,Bt[0].height,xt.depth);for(let ot=0,dt=Bt.length;ot<dt;ot++)if(wt=Bt[ot],_.format!==Hn)if(Pt!==null)if(Ot){if(k)if(_.layerUpdates.size>0){let Tt=Om(wt.width,wt.height,_.format,_.type);for(let Et of _.layerUpdates){let Jt=wt.data.subarray(Et*Tt/wt.data.BYTES_PER_ELEMENT,(Et+1)*Tt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,Et,wt.width,wt.height,1,Pt,Jt)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,wt.width,wt.height,xt.depth,Pt,wt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ot,Xt,wt.width,wt.height,xt.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ot?k&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,wt.width,wt.height,xt.depth,Pt,Ut,wt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ot,Xt,wt.width,wt.height,xt.depth,0,Pt,Ut,wt.data)}else{Ot&&ue&&e.texStorage2D(n.TEXTURE_2D,bt,Xt,Bt[0].width,Bt[0].height);for(let ot=0,dt=Bt.length;ot<dt;ot++)wt=Bt[ot],_.format!==Hn?Pt!==null?Ot?k&&e.compressedTexSubImage2D(n.TEXTURE_2D,ot,0,0,wt.width,wt.height,Pt,wt.data):e.compressedTexImage2D(n.TEXTURE_2D,ot,Xt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?k&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,wt.width,wt.height,Pt,Ut,wt.data):e.texImage2D(n.TEXTURE_2D,ot,Xt,wt.width,wt.height,0,Pt,Ut,wt.data)}else if(_.isDataArrayTexture)if(Ot){if(ue&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Xt,xt.width,xt.height,xt.depth),k)if(_.layerUpdates.size>0){let ot=Om(xt.width,xt.height,_.format,_.type);for(let dt of _.layerUpdates){let Tt=xt.data.subarray(dt*ot/xt.data.BYTES_PER_ELEMENT,(dt+1)*ot/xt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,dt,xt.width,xt.height,1,Pt,Ut,Tt)}_.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,xt.width,xt.height,xt.depth,Pt,Ut,xt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Xt,xt.width,xt.height,xt.depth,0,Pt,Ut,xt.data);else if(_.isData3DTexture)Ot?(ue&&e.texStorage3D(n.TEXTURE_3D,bt,Xt,xt.width,xt.height,xt.depth),k&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,xt.width,xt.height,xt.depth,Pt,Ut,xt.data)):e.texImage3D(n.TEXTURE_3D,0,Xt,xt.width,xt.height,xt.depth,0,Pt,Ut,xt.data);else if(_.isFramebufferTexture){if(ue)if(Ot)e.texStorage2D(n.TEXTURE_2D,bt,Xt,xt.width,xt.height);else{let ot=xt.width,dt=xt.height;for(let Tt=0;Tt<bt;Tt++)e.texImage2D(n.TEXTURE_2D,Tt,Xt,ot,dt,0,Pt,Ut,null),ot>>=1,dt>>=1}}else if(Bt.length>0){if(Ot&&ue){let ot=Lt(Bt[0]);e.texStorage2D(n.TEXTURE_2D,bt,Xt,ot.width,ot.height)}for(let ot=0,dt=Bt.length;ot<dt;ot++)wt=Bt[ot],Ot?k&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,Pt,Ut,wt):e.texImage2D(n.TEXTURE_2D,ot,Xt,Pt,Ut,wt);_.generateMipmaps=!1}else if(Ot){if(ue){let ot=Lt(xt);e.texStorage2D(n.TEXTURE_2D,bt,Xt,ot.width,ot.height)}k&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Pt,Ut,xt)}else e.texImage2D(n.TEXTURE_2D,0,Xt,Pt,Ut,xt);m(_)&&d(ct),Dt.__version=lt.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function H(C,_,q){if(_.image.length!==6)return;let ct=vt(C,_),ut=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+q);let lt=i.get(ut);if(ut.version!==lt.__version||ct===!0){e.activeTexture(n.TEXTURE0+q);let Dt=fe.getPrimaries(fe.workingColorSpace),yt=_.colorSpace===Ji?null:fe.getPrimaries(_.colorSpace),Mt=_.colorSpace===Ji||Dt===yt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);let Kt=_.isCompressedTexture||_.image[0].isCompressedTexture,xt=_.image[0]&&_.image[0].isDataTexture,Pt=[];for(let dt=0;dt<6;dt++)!Kt&&!xt?Pt[dt]=y(_.image[dt],!0,s.maxCubemapSize):Pt[dt]=xt?_.image[dt].image:_.image[dt],Pt[dt]=ee(_,Pt[dt]);let Ut=Pt[0],Xt=r.convert(_.format,_.colorSpace),wt=r.convert(_.type),Bt=T(_.internalFormat,Xt,wt,_.colorSpace),Ot=_.isVideoTexture!==!0,ue=lt.__version===void 0||ct===!0,k=ut.dataReady,bt=L(_,Ut);at(n.TEXTURE_CUBE_MAP,_);let ot;if(Kt){Ot&&ue&&e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,Bt,Ut.width,Ut.height);for(let dt=0;dt<6;dt++){ot=Pt[dt].mipmaps;for(let Tt=0;Tt<ot.length;Tt++){let Et=ot[Tt];_.format!==Hn?Xt!==null?Ot?k&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Tt,0,0,Et.width,Et.height,Xt,Et.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Tt,Bt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ot?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Tt,0,0,Et.width,Et.height,Xt,wt,Et.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Tt,Bt,Et.width,Et.height,0,Xt,wt,Et.data)}}}else{if(ot=_.mipmaps,Ot&&ue){ot.length>0&&bt++;let dt=Lt(Pt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,Bt,dt.width,dt.height)}for(let dt=0;dt<6;dt++)if(xt){Ot?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,Pt[dt].width,Pt[dt].height,Xt,wt,Pt[dt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,Bt,Pt[dt].width,Pt[dt].height,0,Xt,wt,Pt[dt].data);for(let Tt=0;Tt<ot.length;Tt++){let Jt=ot[Tt].image[dt].image;Ot?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Tt+1,0,0,Jt.width,Jt.height,Xt,wt,Jt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Tt+1,Bt,Jt.width,Jt.height,0,Xt,wt,Jt.data)}}else{Ot?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,Xt,wt,Pt[dt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,Bt,Xt,wt,Pt[dt]);for(let Tt=0;Tt<ot.length;Tt++){let Et=ot[Tt];Ot?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Tt+1,0,0,Xt,wt,Et.image[dt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Tt+1,Bt,Xt,wt,Et.image[dt])}}}m(_)&&d(n.TEXTURE_CUBE_MAP),lt.__version=ut.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function Q(C,_,q,ct,ut,lt){let Dt=r.convert(q.format,q.colorSpace),yt=r.convert(q.type),Mt=T(q.internalFormat,Dt,yt,q.colorSpace),Kt=i.get(_),xt=i.get(q);if(xt.__renderTarget=_,!Kt.__hasExternalTextures){let Pt=Math.max(1,_.width>>lt),Ut=Math.max(1,_.height>>lt);ut===n.TEXTURE_3D||ut===n.TEXTURE_2D_ARRAY?e.texImage3D(ut,lt,Mt,Pt,Ut,_.depth,0,Dt,yt,null):e.texImage2D(ut,lt,Mt,Pt,Ut,0,Dt,yt,null)}e.bindFramebuffer(n.FRAMEBUFFER,C),qt(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ct,ut,xt.__webglTexture,0,gt(_)):(ut===n.TEXTURE_2D||ut>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ut<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ct,ut,xt.__webglTexture,lt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function j(C,_,q){if(n.bindRenderbuffer(n.RENDERBUFFER,C),_.depthBuffer){let ct=_.depthTexture,ut=ct&&ct.isDepthTexture?ct.type:null,lt=v(_.stencilBuffer,ut),Dt=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,yt=gt(_);qt(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,yt,lt,_.width,_.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,yt,lt,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,lt,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Dt,n.RENDERBUFFER,C)}else{let ct=_.textures;for(let ut=0;ut<ct.length;ut++){let lt=ct[ut],Dt=r.convert(lt.format,lt.colorSpace),yt=r.convert(lt.type),Mt=T(lt.internalFormat,Dt,yt,lt.colorSpace),Kt=gt(_);q&&qt(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Kt,Mt,_.width,_.height):qt(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Kt,Mt,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Mt,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function pt(C,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ct=i.get(_.depthTexture);ct.__renderTarget=_,(!ct.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),rt(_.depthTexture,0);let ut=ct.__webglTexture,lt=gt(_);if(_.depthTexture.format===Er)qt(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ut,0,lt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ut,0);else if(_.depthTexture.format===Ur)qt(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ut,0,lt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ut,0);else throw new Error("Unknown depthTexture format")}function _t(C){let _=i.get(C),q=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){let ct=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),ct){let ut=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,ct.removeEventListener("dispose",ut)};ct.addEventListener("dispose",ut),_.__depthDisposeCallback=ut}_.__boundDepthTexture=ct}if(C.depthTexture&&!_.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");pt(_.__webglFramebuffer,C)}else if(q){_.__webglDepthbuffer=[];for(let ct=0;ct<6;ct++)if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[ct]),_.__webglDepthbuffer[ct]===void 0)_.__webglDepthbuffer[ct]=n.createRenderbuffer(),j(_.__webglDepthbuffer[ct],C,!1);else{let ut=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=_.__webglDepthbuffer[ct];n.bindRenderbuffer(n.RENDERBUFFER,lt),n.framebufferRenderbuffer(n.FRAMEBUFFER,ut,n.RENDERBUFFER,lt)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),j(_.__webglDepthbuffer,C,!1);else{let ct=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ut=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ut),n.framebufferRenderbuffer(n.FRAMEBUFFER,ct,n.RENDERBUFFER,ut)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ft(C,_,q){let ct=i.get(C);_!==void 0&&Q(ct.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),q!==void 0&&_t(C)}function Rt(C){let _=C.texture,q=i.get(C),ct=i.get(_);C.addEventListener("dispose",R);let ut=C.textures,lt=C.isWebGLCubeRenderTarget===!0,Dt=ut.length>1;if(Dt||(ct.__webglTexture===void 0&&(ct.__webglTexture=n.createTexture()),ct.__version=_.version,o.memory.textures++),lt){q.__webglFramebuffer=[];for(let yt=0;yt<6;yt++)if(_.mipmaps&&_.mipmaps.length>0){q.__webglFramebuffer[yt]=[];for(let Mt=0;Mt<_.mipmaps.length;Mt++)q.__webglFramebuffer[yt][Mt]=n.createFramebuffer()}else q.__webglFramebuffer[yt]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){q.__webglFramebuffer=[];for(let yt=0;yt<_.mipmaps.length;yt++)q.__webglFramebuffer[yt]=n.createFramebuffer()}else q.__webglFramebuffer=n.createFramebuffer();if(Dt)for(let yt=0,Mt=ut.length;yt<Mt;yt++){let Kt=i.get(ut[yt]);Kt.__webglTexture===void 0&&(Kt.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&qt(C)===!1){q.__webglMultisampledFramebuffer=n.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let yt=0;yt<ut.length;yt++){let Mt=ut[yt];q.__webglColorRenderbuffer[yt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,q.__webglColorRenderbuffer[yt]);let Kt=r.convert(Mt.format,Mt.colorSpace),xt=r.convert(Mt.type),Pt=T(Mt.internalFormat,Kt,xt,Mt.colorSpace,C.isXRRenderTarget===!0),Ut=gt(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ut,Pt,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+yt,n.RENDERBUFFER,q.__webglColorRenderbuffer[yt])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(q.__webglDepthRenderbuffer=n.createRenderbuffer(),j(q.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(lt){e.bindTexture(n.TEXTURE_CUBE_MAP,ct.__webglTexture),at(n.TEXTURE_CUBE_MAP,_);for(let yt=0;yt<6;yt++)if(_.mipmaps&&_.mipmaps.length>0)for(let Mt=0;Mt<_.mipmaps.length;Mt++)Q(q.__webglFramebuffer[yt][Mt],C,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Mt);else Q(q.__webglFramebuffer[yt],C,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0);m(_)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Dt){for(let yt=0,Mt=ut.length;yt<Mt;yt++){let Kt=ut[yt],xt=i.get(Kt);e.bindTexture(n.TEXTURE_2D,xt.__webglTexture),at(n.TEXTURE_2D,Kt),Q(q.__webglFramebuffer,C,Kt,n.COLOR_ATTACHMENT0+yt,n.TEXTURE_2D,0),m(Kt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let yt=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(yt=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(yt,ct.__webglTexture),at(yt,_),_.mipmaps&&_.mipmaps.length>0)for(let Mt=0;Mt<_.mipmaps.length;Mt++)Q(q.__webglFramebuffer[Mt],C,_,n.COLOR_ATTACHMENT0,yt,Mt);else Q(q.__webglFramebuffer,C,_,n.COLOR_ATTACHMENT0,yt,0);m(_)&&d(yt),e.unbindTexture()}C.depthBuffer&&_t(C)}function Gt(C){let _=C.textures;for(let q=0,ct=_.length;q<ct;q++){let ut=_[q];if(m(ut)){let lt=w(C),Dt=i.get(ut).__webglTexture;e.bindTexture(lt,Dt),d(lt),e.unbindTexture()}}}let Yt=[],O=[];function le(C){if(C.samples>0){if(qt(C)===!1){let _=C.textures,q=C.width,ct=C.height,ut=n.COLOR_BUFFER_BIT,lt=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Dt=i.get(C),yt=_.length>1;if(yt)for(let Mt=0;Mt<_.length;Mt++)e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let Mt=0;Mt<_.length;Mt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ut|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ut|=n.STENCIL_BUFFER_BIT)),yt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Dt.__webglColorRenderbuffer[Mt]);let Kt=i.get(_[Mt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Kt,0)}n.blitFramebuffer(0,0,q,ct,0,0,q,ct,ut,n.NEAREST),l===!0&&(Yt.length=0,O.length=0,Yt.push(n.COLOR_ATTACHMENT0+Mt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Yt.push(lt),O.push(lt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,O)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Yt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),yt)for(let Mt=0;Mt<_.length;Mt++){e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.RENDERBUFFER,Dt.__webglColorRenderbuffer[Mt]);let Kt=i.get(_[Mt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.TEXTURE_2D,Kt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let _=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function gt(C){return Math.min(s.maxSamples,C.samples)}function qt(C){let _=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function zt(C){let _=o.render.frame;h.get(C)!==_&&(h.set(C,_),C.update())}function ee(C,_){let q=C.colorSpace,ct=C.format,ut=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||q!==kr&&q!==Ji&&(fe.getTransfer(q)===Me?(ct!==Hn||ut!==Ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),_}function Lt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=Y,this.setTexture2D=rt,this.setTexture2DArray=B,this.setTexture3D=et,this.setTextureCube=N,this.rebindTextures=ft,this.setupRenderTarget=Rt,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=le,this.setupDepthRenderbuffer=_t,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=qt}function $b(n,t){function e(i,s=Ji){let r,o=fe.getTransfer(s);if(i===Ai)return n.UNSIGNED_BYTE;if(i===Hu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Gu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Jm)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Zm)return n.BYTE;if(i===Km)return n.SHORT;if(i===bo)return n.UNSIGNED_SHORT;if(i===Vu)return n.INT;if(i===Cs)return n.UNSIGNED_INT;if(i===Ti)return n.FLOAT;if(i===Co)return n.HALF_FLOAT;if(i===Qm)return n.ALPHA;if(i===jm)return n.RGB;if(i===Hn)return n.RGBA;if(i===t0)return n.LUMINANCE;if(i===e0)return n.LUMINANCE_ALPHA;if(i===Er)return n.DEPTH_COMPONENT;if(i===Ur)return n.DEPTH_STENCIL;if(i===n0)return n.RED;if(i===Wu)return n.RED_INTEGER;if(i===i0)return n.RG;if(i===Xu)return n.RG_INTEGER;if(i===Yu)return n.RGBA_INTEGER;if(i===ml||i===gl||i===xl||i===yl)if(o===Me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ml)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===gl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===xl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===yl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ml)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===gl)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===xl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===yl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===kh||i===Vh||i===Hh||i===Gh)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===kh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Vh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Hh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Gh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Wh||i===Xh||i===Yh)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Wh||i===Xh)return o===Me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Yh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===qh||i===$h||i===Zh||i===Kh||i===Jh||i===Qh||i===jh||i===tu||i===eu||i===nu||i===iu||i===su||i===ru||i===ou)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===qh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===$h)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Zh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Kh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Jh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Qh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===jh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===tu)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===eu)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===nu)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===iu)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===su)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ru)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ou)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===_l||i===au||i===lu)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===_l)return o===Me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===au)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===lu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===s0||i===cu||i===hu||i===uu)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===_l)return r.COMPRESSED_RED_RGTC1_EXT;if(i===cu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===hu)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===uu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Lr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var Eu=class extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},ni=class extends un{constructor(){super(),this.isGroup=!0,this.type="Group"}},Zb={type:"move"},Mo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ni,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ni,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ni,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let y of t.hand.values()){let m=e.getJointPose(y,i),d=this._getHandJoint(c,y);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Zb)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new ni;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Kb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Jb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Au=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new Pn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new ri({vertexShader:Kb,fragmentShader:Jb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ie(new Dl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Cu=class extends ns{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,g=null,y=new Au,m=e.getContextAttributes(),d=null,w=null,T=[],v=[],L=new ge,I=null,R=new nn;R.viewport=new be;let D=new nn;D.viewport=new be;let M=[R,D],S=new Eu,U=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(P){let H=T[P];return H===void 0&&(H=new Mo,T[P]=H),H.getTargetRaySpace()},this.getControllerGrip=function(P){let H=T[P];return H===void 0&&(H=new Mo,T[P]=H),H.getGripSpace()},this.getHand=function(P){let H=T[P];return H===void 0&&(H=new Mo,T[P]=H),H.getHandSpace()};function $(P){let H=v.indexOf(P.inputSource);if(H===-1)return;let Q=T[H];Q!==void 0&&(Q.update(P.inputSource,P.frame,c||o),Q.dispatchEvent({type:P.type,data:P.inputSource}))}function Z(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",rt);for(let P=0;P<T.length;P++){let H=v[P];H!==null&&(v[P]=null,T[P].disconnect(H))}U=null,Y=null,y.reset(),t.setRenderTarget(d),p=null,f=null,u=null,s=null,w=null,vt.stop(),i.isPresenting=!1,t.setPixelRatio(I),t.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(P){r=P,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(P){a=P,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(P){c=P},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(P){if(s=P,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",rt),m.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){let H={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,H),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),w=new Ci(p.framebufferWidth,p.framebufferHeight,{format:Hn,type:Ai,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let H=null,Q=null,j=null;m.depth&&(j=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,H=m.stencil?Ur:Er,Q=m.stencil?Lr:Cs);let pt={colorFormat:e.RGBA8,depthFormat:j,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(pt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),w=new Ci(f.textureWidth,f.textureHeight,{format:Hn,type:Ai,depthTexture:new Nl(f.textureWidth,f.textureHeight,Q,void 0,void 0,void 0,void 0,void 0,void 0,H),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),vt.setContext(s),vt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function rt(P){for(let H=0;H<P.removed.length;H++){let Q=P.removed[H],j=v.indexOf(Q);j>=0&&(v[j]=null,T[j].disconnect(Q))}for(let H=0;H<P.added.length;H++){let Q=P.added[H],j=v.indexOf(Q);if(j===-1){for(let _t=0;_t<T.length;_t++)if(_t>=v.length){v.push(Q),j=_t;break}else if(v[_t]===null){v[_t]=Q,j=_t;break}if(j===-1)break}let pt=T[j];pt&&pt.connect(Q)}}let B=new G,et=new G;function N(P,H,Q){B.setFromMatrixPosition(H.matrixWorld),et.setFromMatrixPosition(Q.matrixWorld);let j=B.distanceTo(et),pt=H.projectionMatrix.elements,_t=Q.projectionMatrix.elements,ft=pt[14]/(pt[10]-1),Rt=pt[14]/(pt[10]+1),Gt=(pt[9]+1)/pt[5],Yt=(pt[9]-1)/pt[5],O=(pt[8]-1)/pt[0],le=(_t[8]+1)/_t[0],gt=ft*O,qt=ft*le,zt=j/(-O+le),ee=zt*-O;if(H.matrixWorld.decompose(P.position,P.quaternion,P.scale),P.translateX(ee),P.translateZ(zt),P.matrixWorld.compose(P.position,P.quaternion,P.scale),P.matrixWorldInverse.copy(P.matrixWorld).invert(),pt[10]===-1)P.projectionMatrix.copy(H.projectionMatrix),P.projectionMatrixInverse.copy(H.projectionMatrixInverse);else{let Lt=ft+zt,C=Rt+zt,_=gt-ee,q=qt+(j-ee),ct=Gt*Rt/C*Lt,ut=Yt*Rt/C*Lt;P.projectionMatrix.makePerspective(_,q,ct,ut,Lt,C),P.projectionMatrixInverse.copy(P.projectionMatrix).invert()}}function F(P,H){H===null?P.matrixWorld.copy(P.matrix):P.matrixWorld.multiplyMatrices(H.matrixWorld,P.matrix),P.matrixWorldInverse.copy(P.matrixWorld).invert()}this.updateCamera=function(P){if(s===null)return;let H=P.near,Q=P.far;y.texture!==null&&(y.depthNear>0&&(H=y.depthNear),y.depthFar>0&&(Q=y.depthFar)),S.near=D.near=R.near=H,S.far=D.far=R.far=Q,(U!==S.near||Y!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),U=S.near,Y=S.far),R.layers.mask=P.layers.mask|2,D.layers.mask=P.layers.mask|4,S.layers.mask=R.layers.mask|D.layers.mask;let j=P.parent,pt=S.cameras;F(S,j);for(let _t=0;_t<pt.length;_t++)F(pt[_t],j);pt.length===2?N(S,R,D):S.projectionMatrix.copy(R.projectionMatrix),J(P,S,j)};function J(P,H,Q){Q===null?P.matrix.copy(H.matrixWorld):(P.matrix.copy(Q.matrixWorld),P.matrix.invert(),P.matrix.multiply(H.matrixWorld)),P.matrix.decompose(P.position,P.quaternion,P.scale),P.updateMatrixWorld(!0),P.projectionMatrix.copy(H.projectionMatrix),P.projectionMatrixInverse.copy(H.projectionMatrixInverse),P.isPerspectiveCamera&&(P.fov=To*2*Math.atan(1/P.projectionMatrix.elements[5]),P.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(P){l=P,f!==null&&(f.fixedFoveation=P),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=P)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(S)};let K=null;function at(P,H){if(h=H.getViewerPose(c||o),g=H,h!==null){let Q=h.views;p!==null&&(t.setRenderTargetFramebuffer(w,p.framebuffer),t.setRenderTarget(w));let j=!1;Q.length!==S.cameras.length&&(S.cameras.length=0,j=!0);for(let _t=0;_t<Q.length;_t++){let ft=Q[_t],Rt=null;if(p!==null)Rt=p.getViewport(ft);else{let Yt=u.getViewSubImage(f,ft);Rt=Yt.viewport,_t===0&&(t.setRenderTargetTextures(w,Yt.colorTexture,f.ignoreDepthValues?void 0:Yt.depthStencilTexture),t.setRenderTarget(w))}let Gt=M[_t];Gt===void 0&&(Gt=new nn,Gt.layers.enable(_t),Gt.viewport=new be,M[_t]=Gt),Gt.matrix.fromArray(ft.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(ft.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(Rt.x,Rt.y,Rt.width,Rt.height),_t===0&&(S.matrix.copy(Gt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),j===!0&&S.cameras.push(Gt)}let pt=s.enabledFeatures;if(pt&&pt.includes("depth-sensing")){let _t=u.getDepthInformation(Q[0]);_t&&_t.isValid&&_t.texture&&y.init(t,_t,s.renderState)}}for(let Q=0;Q<T.length;Q++){let j=v[Q],pt=T[Q];j!==null&&pt!==void 0&&pt.update(j,H,c||o)}K&&K(P,H),H.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:H}),g=null}let vt=new u0;vt.setAnimationLoop(at),this.setAnimationLoop=function(P){K=P},this.dispose=function(){}}},Ms=new ii,Qb=new De;function jb(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,h0(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,w,T,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,v)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),y(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,w,T):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===mn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===mn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let w=t.get(d),T=w.envMap,v=w.envMapRotation;T&&(m.envMap.value=T,Ms.copy(v),Ms.x*=-1,Ms.y*=-1,Ms.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ms.y*=-1,Ms.z*=-1),m.envMapRotation.value.setFromMatrix4(Qb.makeRotationFromEuler(Ms)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,w,T){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*w,m.scale.value=T*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,w){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===mn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function y(m,d){let w=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function t1(n,t,e,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,T){let v=T.program;i.uniformBlockBinding(w,v)}function c(w,T){let v=s[w.id];v===void 0&&(g(w),v=h(w),s[w.id]=v,w.addEventListener("dispose",m));let L=T.program;i.updateUBOMapping(w,L);let I=t.render.frame;r[w.id]!==I&&(f(w),r[w.id]=I)}function h(w){let T=u();w.__bindingPointIndex=T;let v=n.createBuffer(),L=w.__size,I=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,L,I),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,v),v}function u(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(w){let T=s[w.id],v=w.uniforms,L=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let I=0,R=v.length;I<R;I++){let D=Array.isArray(v[I])?v[I]:[v[I]];for(let M=0,S=D.length;M<S;M++){let U=D[M];if(p(U,I,M,L)===!0){let Y=U.__offset,$=Array.isArray(U.value)?U.value:[U.value],Z=0;for(let rt=0;rt<$.length;rt++){let B=$[rt],et=y(B);typeof B=="number"||typeof B=="boolean"?(U.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,Y+Z,U.__data)):B.isMatrix3?(U.__data[0]=B.elements[0],U.__data[1]=B.elements[1],U.__data[2]=B.elements[2],U.__data[3]=0,U.__data[4]=B.elements[3],U.__data[5]=B.elements[4],U.__data[6]=B.elements[5],U.__data[7]=0,U.__data[8]=B.elements[6],U.__data[9]=B.elements[7],U.__data[10]=B.elements[8],U.__data[11]=0):(B.toArray(U.__data,Z),Z+=et.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,Y,U.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,T,v,L){let I=w.value,R=T+"_"+v;if(L[R]===void 0)return typeof I=="number"||typeof I=="boolean"?L[R]=I:L[R]=I.clone(),!0;{let D=L[R];if(typeof I=="number"||typeof I=="boolean"){if(D!==I)return L[R]=I,!0}else if(D.equals(I)===!1)return D.copy(I),!0}return!1}function g(w){let T=w.uniforms,v=0,L=16;for(let R=0,D=T.length;R<D;R++){let M=Array.isArray(T[R])?T[R]:[T[R]];for(let S=0,U=M.length;S<U;S++){let Y=M[S],$=Array.isArray(Y.value)?Y.value:[Y.value];for(let Z=0,rt=$.length;Z<rt;Z++){let B=$[Z],et=y(B),N=v%L,F=N%et.boundary,J=N+F;v+=F,J!==0&&L-J<et.storage&&(v+=L-J),Y.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=v,v+=et.storage}}}let I=v%L;return I>0&&(v+=L-I),w.__size=v,w.__cache={},this}function y(w){let T={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(T.boundary=4,T.storage=4):w.isVector2?(T.boundary=8,T.storage=8):w.isVector3||w.isColor?(T.boundary=16,T.storage=12):w.isVector4?(T.boundary=16,T.storage=16):w.isMatrix3?(T.boundary=48,T.storage=48):w.isMatrix4?(T.boundary=64,T.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),T}function m(w){let T=w.target;T.removeEventListener("dispose",m);let v=o.indexOf(T.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function d(){for(let w in s)n.deleteBuffer(s[w]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}var Fl=class{constructor(t={}){let{canvas:e=s_(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),y=new Int32Array(4),m=null,d=null,w=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Cn,this.toneMapping=ts,this.toneMappingExposure=1;let v=this,L=!1,I=0,R=0,D=null,M=-1,S=null,U=new be,Y=new be,$=null,Z=new he(0),rt=0,B=e.width,et=e.height,N=1,F=null,J=null,K=new be(0,0,B,et),at=new be(0,0,B,et),vt=!1,P=new wo,H=!1,Q=!1,j=new De,pt=new De,_t=new G,ft=new be,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Gt=!1;function Yt(){return D===null?N:1}let O=i;function le(b,W){return e.getContext(b,W)}try{let b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",dt,!1),e.addEventListener("webglcontextrestored",Tt,!1),e.addEventListener("webglcontextcreationerror",Et,!1),O===null){let W="webgl2";if(O=le(W,b),O===null)throw le(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let gt,qt,zt,ee,Lt,C,_,q,ct,ut,lt,Dt,yt,Mt,Kt,xt,Pt,Ut,Xt,wt,Bt,Ot,ue,k;function bt(){gt=new gM(O),gt.init(),Ot=new $b(O,gt),qt=new hM(O,gt,t,Ot),zt=new Xb(O,gt),qt.reverseDepthBuffer&&f&&zt.buffers.depth.setReversed(!0),ee=new _M(O),Lt=new Db,C=new qb(O,gt,zt,Lt,qt,Ot,ee),_=new fM(v),q=new mM(v),ct=new E_(O),ue=new lM(O,ct),ut=new xM(O,ct,ee,ue),lt=new SM(O,ut,ct,ee),Xt=new vM(O,qt,C),xt=new uM(Lt),Dt=new Ib(v,_,q,gt,qt,ue,xt),yt=new jb(v,Lt),Mt=new Ub,Kt=new kb(gt),Ut=new aM(v,_,q,zt,lt,p,l),Pt=new Gb(v,lt,qt),k=new t1(O,ee,qt,zt),wt=new cM(O,gt,ee),Bt=new yM(O,gt,ee),ee.programs=Dt.programs,v.capabilities=qt,v.extensions=gt,v.properties=Lt,v.renderLists=Mt,v.shadowMap=Pt,v.state=zt,v.info=ee}bt();let ot=new Cu(v,O);this.xr=ot,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let b=gt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=gt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(b){b!==void 0&&(N=b,this.setSize(B,et,!1))},this.getSize=function(b){return b.set(B,et)},this.setSize=function(b,W,nt=!0){if(ot.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=b,et=W,e.width=Math.floor(b*N),e.height=Math.floor(W*N),nt===!0&&(e.style.width=b+"px",e.style.height=W+"px"),this.setViewport(0,0,b,W)},this.getDrawingBufferSize=function(b){return b.set(B*N,et*N).floor()},this.setDrawingBufferSize=function(b,W,nt){B=b,et=W,N=nt,e.width=Math.floor(b*nt),e.height=Math.floor(W*nt),this.setViewport(0,0,b,W)},this.getCurrentViewport=function(b){return b.copy(U)},this.getViewport=function(b){return b.copy(K)},this.setViewport=function(b,W,nt,it){b.isVector4?K.set(b.x,b.y,b.z,b.w):K.set(b,W,nt,it),zt.viewport(U.copy(K).multiplyScalar(N).round())},this.getScissor=function(b){return b.copy(at)},this.setScissor=function(b,W,nt,it){b.isVector4?at.set(b.x,b.y,b.z,b.w):at.set(b,W,nt,it),zt.scissor(Y.copy(at).multiplyScalar(N).round())},this.getScissorTest=function(){return vt},this.setScissorTest=function(b){zt.setScissorTest(vt=b)},this.setOpaqueSort=function(b){F=b},this.setTransparentSort=function(b){J=b},this.getClearColor=function(b){return b.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(b=!0,W=!0,nt=!0){let it=0;if(b){let X=!1;if(D!==null){let St=D.texture.format;X=St===Yu||St===Xu||St===Wu}if(X){let St=D.texture.type,It=St===Ai||St===Cs||St===bo||St===Lr||St===Hu||St===Gu,kt=Ut.getClearColor(),Ft=Ut.getClearAlpha(),$t=kt.r,Zt=kt.g,At=kt.b;It?(g[0]=$t,g[1]=Zt,g[2]=At,g[3]=Ft,O.clearBufferuiv(O.COLOR,0,g)):(y[0]=$t,y[1]=Zt,y[2]=At,y[3]=Ft,O.clearBufferiv(O.COLOR,0,y))}else it|=O.COLOR_BUFFER_BIT}W&&(it|=O.DEPTH_BUFFER_BIT),nt&&(it|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(it)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",dt,!1),e.removeEventListener("webglcontextrestored",Tt,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),Mt.dispose(),Kt.dispose(),Lt.dispose(),_.dispose(),q.dispose(),lt.dispose(),ue.dispose(),k.dispose(),Dt.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",Nn),ot.removeEventListener("sessionend",Bo),Je.stop()};function dt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function Tt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;let b=ee.autoReset,W=Pt.enabled,nt=Pt.autoUpdate,it=Pt.needsUpdate,X=Pt.type;bt(),ee.autoReset=b,Pt.enabled=W,Pt.autoUpdate=nt,Pt.needsUpdate=it,Pt.type=X}function Et(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Jt(b){let W=b.target;W.removeEventListener("dispose",Jt),Ce(W)}function Ce(b){ke(b),Lt.remove(b)}function ke(b){let W=Lt.get(b).programs;W!==void 0&&(W.forEach(function(nt){Dt.releaseProgram(nt)}),b.isShaderMaterial&&Dt.releaseShaderCache(b))}this.renderBufferDirect=function(b,W,nt,it,X,St){W===null&&(W=Rt);let It=X.isMesh&&X.matrixWorld.determinant()<0,kt=dc(b,W,nt,it,X);zt.setMaterial(it,It);let Ft=nt.index,$t=1;if(it.wireframe===!0){if(Ft=ut.getWireframeAttribute(nt),Ft===void 0)return;$t=2}let Zt=nt.drawRange,At=nt.attributes.position,ce=Zt.start*$t,ve=(Zt.start+Zt.count)*$t;St!==null&&(ce=Math.max(ce,St.start*$t),ve=Math.min(ve,(St.start+St.count)*$t)),Ft!==null?(ce=Math.max(ce,0),ve=Math.min(ve,Ft.count)):At!=null&&(ce=Math.max(ce,0),ve=Math.min(ve,At.count));let ye=ve-ce;if(ye<0||ye===1/0)return;ue.setup(X,it,kt,nt,Ft);let Oe,se=wt;if(Ft!==null&&(Oe=ct.get(Ft),se=Bt,se.setIndex(Oe)),X.isMesh)it.wireframe===!0?(zt.setLineWidth(it.wireframeLinewidth*Yt()),se.setMode(O.LINES)):se.setMode(O.TRIANGLES);else if(X.isLine){let Ht=it.linewidth;Ht===void 0&&(Ht=1),zt.setLineWidth(Ht*Yt()),X.isLineSegments?se.setMode(O.LINES):X.isLineLoop?se.setMode(O.LINE_LOOP):se.setMode(O.LINE_STRIP)}else X.isPoints?se.setMode(O.POINTS):X.isSprite&&se.setMode(O.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)se.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(gt.get("WEBGL_multi_draw"))se.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{let Ht=X._multiDrawStarts,Fn=X._multiDrawCounts,de=X._multiDrawCount,yn=Ft?ct.get(Ft).bytesPerElement:1,qn=Lt.get(it).currentProgram.getUniforms();for(let Nt=0;Nt<de;Nt++)qn.setValue(O,"_gl_DrawID",Nt),se.render(Ht[Nt]/yn,Fn[Nt])}else if(X.isInstancedMesh)se.renderInstances(ce,ye,X.count);else if(nt.isInstancedBufferGeometry){let Ht=nt._maxInstanceCount!==void 0?nt._maxInstanceCount:1/0,Fn=Math.min(nt.instanceCount,Ht);se.renderInstances(ce,ye,Fn)}else se.render(ce,ye)};function xe(b,W,nt){b.transparent===!0&&b.side===bi&&b.forceSinglePass===!1?(b.side=mn,b.needsUpdate=!0,ui(b,W,nt),b.side=es,b.needsUpdate=!0,ui(b,W,nt),b.side=bi):ui(b,W,nt)}this.compile=function(b,W,nt=null){nt===null&&(nt=b),d=Kt.get(nt),d.init(W),T.push(d),nt.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(d.pushLight(X),X.castShadow&&d.pushShadow(X))}),b!==nt&&b.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(d.pushLight(X),X.castShadow&&d.pushShadow(X))}),d.setupLights();let it=new Set;return b.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;let St=X.material;if(St)if(Array.isArray(St))for(let It=0;It<St.length;It++){let kt=St[It];xe(kt,nt,X),it.add(kt)}else xe(St,nt,X),it.add(St)}),T.pop(),d=null,it},this.compileAsync=function(b,W,nt=null){let it=this.compile(b,W,nt);return new Promise(X=>{function St(){if(it.forEach(function(It){Lt.get(It).currentProgram.isReady()&&it.delete(It)}),it.size===0){X(b);return}setTimeout(St,10)}gt.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let rn=null;function Un(b){rn&&rn(b)}function Nn(){Je.stop()}function Bo(){Je.start()}let Je=new u0;Je.setAnimationLoop(Un),typeof self<"u"&&Je.setContext(self),this.setAnimationLoop=function(b){rn=b,ot.setAnimationLoop(b),b===null?Je.stop():Je.start()},ot.addEventListener("sessionstart",Nn),ot.addEventListener("sessionend",Bo),this.render=function(b,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(W),W=ot.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,W,D),d=Kt.get(b,T.length),d.init(W),T.push(d),pt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),P.setFromProjectionMatrix(pt),Q=this.localClippingEnabled,H=xt.init(this.clippingPlanes,Q),m=Mt.get(b,w.length),m.init(),w.push(m),ot.enabled===!0&&ot.isPresenting===!0){let St=v.xr.getDepthSensingMesh();St!==null&&hi(St,W,-1/0,v.sortObjects)}hi(b,W,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(F,J),Gt=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,Gt&&Ut.addToRenderList(m,b),this.info.render.frame++,H===!0&&xt.beginShadows();let nt=d.state.shadowsArray;Pt.render(nt,b,W),H===!0&&xt.endShadows(),this.info.autoReset===!0&&this.info.reset();let it=m.opaque,X=m.transmissive;if(d.setupLights(),W.isArrayCamera){let St=W.cameras;if(X.length>0)for(let It=0,kt=St.length;It<kt;It++){let Ft=St[It];Os(it,X,b,Ft)}Gt&&Ut.render(b);for(let It=0,kt=St.length;It<kt;It++){let Ft=St[It];zo(m,b,Ft,Ft.viewport)}}else X.length>0&&Os(it,X,b,W),Gt&&Ut.render(b),zo(m,b,W);D!==null&&(C.updateMultisampleRenderTarget(D),C.updateRenderTargetMipmap(D)),b.isScene===!0&&b.onAfterRender(v,b,W),ue.resetDefaultState(),M=-1,S=null,T.pop(),T.length>0?(d=T[T.length-1],H===!0&&xt.setGlobalState(v.clippingPlanes,d.state.camera)):d=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function hi(b,W,nt,it){if(b.visible===!1)return;if(b.layers.test(W.layers)){if(b.isGroup)nt=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(W);else if(b.isLight)d.pushLight(b),b.castShadow&&d.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||P.intersectsSprite(b)){it&&ft.setFromMatrixPosition(b.matrixWorld).applyMatrix4(pt);let It=lt.update(b),kt=b.material;kt.visible&&m.push(b,It,kt,nt,ft.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||P.intersectsObject(b))){let It=lt.update(b),kt=b.material;if(it&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),ft.copy(b.boundingSphere.center)):(It.boundingSphere===null&&It.computeBoundingSphere(),ft.copy(It.boundingSphere.center)),ft.applyMatrix4(b.matrixWorld).applyMatrix4(pt)),Array.isArray(kt)){let Ft=It.groups;for(let $t=0,Zt=Ft.length;$t<Zt;$t++){let At=Ft[$t],ce=kt[At.materialIndex];ce&&ce.visible&&m.push(b,It,ce,nt,ft.z,At)}}else kt.visible&&m.push(b,It,kt,nt,ft.z,null)}}let St=b.children;for(let It=0,kt=St.length;It<kt;It++)hi(St[It],W,nt,it)}function zo(b,W,nt,it){let X=b.opaque,St=b.transmissive,It=b.transparent;d.setupLightsView(nt),H===!0&&xt.setGlobalState(v.clippingPlanes,nt),it&&zt.viewport(U.copy(it)),X.length>0&&xn(X,W,nt),St.length>0&&xn(St,W,nt),It.length>0&&xn(It,W,nt),zt.buffers.depth.setTest(!0),zt.buffers.depth.setMask(!0),zt.buffers.color.setMask(!0),zt.setPolygonOffset(!1)}function Os(b,W,nt,it){if((nt.isScene===!0?nt.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[it.id]===void 0&&(d.state.transmissionRenderTarget[it.id]=new Ci(1,1,{generateMipmaps:!0,type:gt.has("EXT_color_buffer_half_float")||gt.has("EXT_color_buffer_float")?Co:Ai,minFilter:As,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:fe.workingColorSpace}));let St=d.state.transmissionRenderTarget[it.id],It=it.viewport||U;St.setSize(It.z,It.w);let kt=v.getRenderTarget();v.setRenderTarget(St),v.getClearColor(Z),rt=v.getClearAlpha(),rt<1&&v.setClearColor(16777215,.5),v.clear(),Gt&&Ut.render(nt);let Ft=v.toneMapping;v.toneMapping=ts;let $t=it.viewport;if(it.viewport!==void 0&&(it.viewport=void 0),d.setupLightsView(it),H===!0&&xt.setGlobalState(v.clippingPlanes,it),xn(b,nt,it),C.updateMultisampleRenderTarget(St),C.updateRenderTargetMipmap(St),gt.has("WEBGL_multisampled_render_to_texture")===!1){let Zt=!1;for(let At=0,ce=W.length;At<ce;At++){let ve=W[At],ye=ve.object,Oe=ve.geometry,se=ve.material,Ht=ve.group;if(se.side===bi&&ye.layers.test(it.layers)){let Fn=se.side;se.side=mn,se.needsUpdate=!0,Di(ye,nt,it,Oe,se,Ht),se.side=Fn,se.needsUpdate=!0,Zt=!0}}Zt===!0&&(C.updateMultisampleRenderTarget(St),C.updateRenderTargetMipmap(St))}v.setRenderTarget(kt),v.setClearColor(Z,rt),$t!==void 0&&(it.viewport=$t),v.toneMapping=Ft}function xn(b,W,nt){let it=W.isScene===!0?W.overrideMaterial:null;for(let X=0,St=b.length;X<St;X++){let It=b[X],kt=It.object,Ft=It.geometry,$t=it===null?It.material:it,Zt=It.group;kt.layers.test(nt.layers)&&Di(kt,W,nt,Ft,$t,Zt)}}function Di(b,W,nt,it,X,St){b.onBeforeRender(v,W,nt,it,X,St),b.modelViewMatrix.multiplyMatrices(nt.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),X.onBeforeRender(v,W,nt,it,b,St),X.transparent===!0&&X.side===bi&&X.forceSinglePass===!1?(X.side=mn,X.needsUpdate=!0,v.renderBufferDirect(nt,W,it,X,b,St),X.side=es,X.needsUpdate=!0,v.renderBufferDirect(nt,W,it,X,b,St),X.side=bi):v.renderBufferDirect(nt,W,it,X,b,St),b.onAfterRender(v,W,nt,it,X,St)}function ui(b,W,nt){W.isScene!==!0&&(W=Rt);let it=Lt.get(b),X=d.state.lights,St=d.state.shadowsArray,It=X.state.version,kt=Dt.getParameters(b,X.state,St,W,nt),Ft=Dt.getProgramCacheKey(kt),$t=it.programs;it.environment=b.isMeshStandardMaterial?W.environment:null,it.fog=W.fog,it.envMap=(b.isMeshStandardMaterial?q:_).get(b.envMap||it.environment),it.envMapRotation=it.environment!==null&&b.envMap===null?W.environmentRotation:b.envMapRotation,$t===void 0&&(b.addEventListener("dispose",Jt),$t=new Map,it.programs=$t);let Zt=$t.get(Ft);if(Zt!==void 0){if(it.currentProgram===Zt&&it.lightsStateVersion===It)return Bs(b,kt),Zt}else kt.uniforms=Dt.getUniforms(b),b.onBeforeCompile(kt,v),Zt=Dt.acquireProgram(kt,Ft),$t.set(Ft,Zt),it.uniforms=kt.uniforms;let At=it.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(At.clippingPlanes=xt.uniform),Bs(b,kt),it.needsLights=Li(b),it.lightsStateVersion=It,it.needsLights&&(At.ambientLightColor.value=X.state.ambient,At.lightProbe.value=X.state.probe,At.directionalLights.value=X.state.directional,At.directionalLightShadows.value=X.state.directionalShadow,At.spotLights.value=X.state.spot,At.spotLightShadows.value=X.state.spotShadow,At.rectAreaLights.value=X.state.rectArea,At.ltc_1.value=X.state.rectAreaLTC1,At.ltc_2.value=X.state.rectAreaLTC2,At.pointLights.value=X.state.point,At.pointLightShadows.value=X.state.pointShadow,At.hemisphereLights.value=X.state.hemi,At.directionalShadowMap.value=X.state.directionalShadowMap,At.directionalShadowMatrix.value=X.state.directionalShadowMatrix,At.spotShadowMap.value=X.state.spotShadowMap,At.spotLightMatrix.value=X.state.spotLightMatrix,At.spotLightMap.value=X.state.spotLightMap,At.pointShadowMap.value=X.state.pointShadowMap,At.pointShadowMatrix.value=X.state.pointShadowMatrix),it.currentProgram=Zt,it.uniformsList=null,Zt}function ko(b){if(b.uniformsList===null){let W=b.currentProgram.getUniforms();b.uniformsList=Rr.seqWithValue(W.seq,b.uniforms)}return b.uniformsList}function Bs(b,W){let nt=Lt.get(b);nt.outputColorSpace=W.outputColorSpace,nt.batching=W.batching,nt.batchingColor=W.batchingColor,nt.instancing=W.instancing,nt.instancingColor=W.instancingColor,nt.instancingMorph=W.instancingMorph,nt.skinning=W.skinning,nt.morphTargets=W.morphTargets,nt.morphNormals=W.morphNormals,nt.morphColors=W.morphColors,nt.morphTargetsCount=W.morphTargetsCount,nt.numClippingPlanes=W.numClippingPlanes,nt.numIntersection=W.numClipIntersection,nt.vertexAlphas=W.vertexAlphas,nt.vertexTangents=W.vertexTangents,nt.toneMapping=W.toneMapping}function dc(b,W,nt,it,X){W.isScene!==!0&&(W=Rt),C.resetTextureUnits();let St=W.fog,It=it.isMeshStandardMaterial?W.environment:null,kt=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:kr,Ft=(it.isMeshStandardMaterial?q:_).get(it.envMap||It),$t=it.vertexColors===!0&&!!nt.attributes.color&&nt.attributes.color.itemSize===4,Zt=!!nt.attributes.tangent&&(!!it.normalMap||it.anisotropy>0),At=!!nt.morphAttributes.position,ce=!!nt.morphAttributes.normal,ve=!!nt.morphAttributes.color,ye=ts;it.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ye=v.toneMapping);let Oe=nt.morphAttributes.position||nt.morphAttributes.normal||nt.morphAttributes.color,se=Oe!==void 0?Oe.length:0,Ht=Lt.get(it),Fn=d.state.lights;if(H===!0&&(Q===!0||b!==S)){let Se=b===S&&it.id===M;xt.setState(it,b,Se)}let de=!1;it.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==Fn.state.version||Ht.outputColorSpace!==kt||X.isBatchedMesh&&Ht.batching===!1||!X.isBatchedMesh&&Ht.batching===!0||X.isBatchedMesh&&Ht.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Ht.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Ht.instancing===!1||!X.isInstancedMesh&&Ht.instancing===!0||X.isSkinnedMesh&&Ht.skinning===!1||!X.isSkinnedMesh&&Ht.skinning===!0||X.isInstancedMesh&&Ht.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ht.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ht.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ht.instancingMorph===!1&&X.morphTexture!==null||Ht.envMap!==Ft||it.fog===!0&&Ht.fog!==St||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==xt.numPlanes||Ht.numIntersection!==xt.numIntersection)||Ht.vertexAlphas!==$t||Ht.vertexTangents!==Zt||Ht.morphTargets!==At||Ht.morphNormals!==ce||Ht.morphColors!==ve||Ht.toneMapping!==ye||Ht.morphTargetsCount!==se)&&(de=!0):(de=!0,Ht.__version=it.version);let yn=Ht.currentProgram;de===!0&&(yn=ui(it,W,X));let qn=!1,Nt=!1,hs=!1,we=yn.getUniforms(),Mn=Ht.uniforms;if(zt.useProgram(yn.program)&&(qn=!0,Nt=!0,hs=!0),it.id!==M&&(M=it.id,Nt=!0),qn||S!==b){zt.buffers.depth.getReversed()?(j.copy(b.projectionMatrix),o_(j),a_(j),we.setValue(O,"projectionMatrix",j)):we.setValue(O,"projectionMatrix",b.projectionMatrix),we.setValue(O,"viewMatrix",b.matrixWorldInverse);let On=we.map.cameraPosition;On!==void 0&&On.setValue(O,_t.setFromMatrixPosition(b.matrixWorld)),qt.logarithmicDepthBuffer&&we.setValue(O,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(it.isMeshPhongMaterial||it.isMeshToonMaterial||it.isMeshLambertMaterial||it.isMeshBasicMaterial||it.isMeshStandardMaterial||it.isShaderMaterial)&&we.setValue(O,"isOrthographic",b.isOrthographicCamera===!0),S!==b&&(S=b,Nt=!0,hs=!0)}if(X.isSkinnedMesh){we.setOptional(O,X,"bindMatrix"),we.setOptional(O,X,"bindMatrixInverse");let Se=X.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),we.setValue(O,"boneTexture",Se.boneTexture,C))}X.isBatchedMesh&&(we.setOptional(O,X,"batchingTexture"),we.setValue(O,"batchingTexture",X._matricesTexture,C),we.setOptional(O,X,"batchingIdTexture"),we.setValue(O,"batchingIdTexture",X._indirectTexture,C),we.setOptional(O,X,"batchingColorTexture"),X._colorsTexture!==null&&we.setValue(O,"batchingColorTexture",X._colorsTexture,C));let pe=nt.morphAttributes;if((pe.position!==void 0||pe.normal!==void 0||pe.color!==void 0)&&Xt.update(X,nt,yn),(Nt||Ht.receiveShadow!==X.receiveShadow)&&(Ht.receiveShadow=X.receiveShadow,we.setValue(O,"receiveShadow",X.receiveShadow)),it.isMeshGouraudMaterial&&it.envMap!==null&&(Mn.envMap.value=Ft,Mn.flipEnvMap.value=Ft.isCubeTexture&&Ft.isRenderTargetTexture===!1?-1:1),it.isMeshStandardMaterial&&it.envMap===null&&W.environment!==null&&(Mn.envMapIntensity.value=W.environmentIntensity),Nt&&(we.setValue(O,"toneMappingExposure",v.toneMappingExposure),Ht.needsLights&&Jr(Mn,hs),St&&it.fog===!0&&yt.refreshFogUniforms(Mn,St),yt.refreshMaterialUniforms(Mn,it,N,et,d.state.transmissionRenderTarget[b.id]),Rr.upload(O,ko(Ht),Mn,C)),it.isShaderMaterial&&it.uniformsNeedUpdate===!0&&(Rr.upload(O,ko(Ht),Mn,C),it.uniformsNeedUpdate=!1),it.isSpriteMaterial&&we.setValue(O,"center",X.center),we.setValue(O,"modelViewMatrix",X.modelViewMatrix),we.setValue(O,"normalMatrix",X.normalMatrix),we.setValue(O,"modelMatrix",X.matrixWorld),it.isShaderMaterial||it.isRawShaderMaterial){let Se=it.uniformsGroups;for(let On=0,bn=Se.length;On<bn;On++){let Vo=Se[On];k.update(Vo,yn),k.bind(Vo,yn)}}return yn}function Jr(b,W){b.ambientLightColor.needsUpdate=W,b.lightProbe.needsUpdate=W,b.directionalLights.needsUpdate=W,b.directionalLightShadows.needsUpdate=W,b.pointLights.needsUpdate=W,b.pointLightShadows.needsUpdate=W,b.spotLights.needsUpdate=W,b.spotLightShadows.needsUpdate=W,b.rectAreaLights.needsUpdate=W,b.hemisphereLights.needsUpdate=W}function Li(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(b,W,nt){Lt.get(b.texture).__webglTexture=W,Lt.get(b.depthTexture).__webglTexture=nt;let it=Lt.get(b);it.__hasExternalTextures=!0,it.__autoAllocateDepthBuffer=nt===void 0,it.__autoAllocateDepthBuffer||gt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),it.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,W){let nt=Lt.get(b);nt.__webglFramebuffer=W,nt.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(b,W=0,nt=0){D=b,I=W,R=nt;let it=!0,X=null,St=!1,It=!1;if(b){let Ft=Lt.get(b);if(Ft.__useDefaultFramebuffer!==void 0)zt.bindFramebuffer(O.FRAMEBUFFER,null),it=!1;else if(Ft.__webglFramebuffer===void 0)C.setupRenderTarget(b);else if(Ft.__hasExternalTextures)C.rebindTextures(b,Lt.get(b.texture).__webglTexture,Lt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let At=b.depthTexture;if(Ft.__boundDepthTexture!==At){if(At!==null&&Lt.has(At)&&(b.width!==At.image.width||b.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(b)}}let $t=b.texture;($t.isData3DTexture||$t.isDataArrayTexture||$t.isCompressedArrayTexture)&&(It=!0);let Zt=Lt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Zt[W])?X=Zt[W][nt]:X=Zt[W],St=!0):b.samples>0&&C.useMultisampledRTT(b)===!1?X=Lt.get(b).__webglMultisampledFramebuffer:Array.isArray(Zt)?X=Zt[nt]:X=Zt,U.copy(b.viewport),Y.copy(b.scissor),$=b.scissorTest}else U.copy(K).multiplyScalar(N).floor(),Y.copy(at).multiplyScalar(N).floor(),$=vt;if(zt.bindFramebuffer(O.FRAMEBUFFER,X)&&it&&zt.drawBuffers(b,X),zt.viewport(U),zt.scissor(Y),zt.setScissorTest($),St){let Ft=Lt.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ft.__webglTexture,nt)}else if(It){let Ft=Lt.get(b.texture),$t=W||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ft.__webglTexture,nt||0,$t)}M=-1},this.readRenderTargetPixels=function(b,W,nt,it,X,St,It){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=Lt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&It!==void 0&&(kt=kt[It]),kt){zt.bindFramebuffer(O.FRAMEBUFFER,kt);try{let Ft=b.texture,$t=Ft.format,Zt=Ft.type;if(!qt.textureFormatReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qt.textureTypeReadable(Zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=b.width-it&&nt>=0&&nt<=b.height-X&&O.readPixels(W,nt,it,X,Ot.convert($t),Ot.convert(Zt),St)}finally{let Ft=D!==null?Lt.get(D).__webglFramebuffer:null;zt.bindFramebuffer(O.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(b,W,nt,it,X,St,It){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let kt=Lt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&It!==void 0&&(kt=kt[It]),kt){let Ft=b.texture,$t=Ft.format,Zt=Ft.type;if(!qt.textureFormatReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qt.textureTypeReadable(Zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=b.width-it&&nt>=0&&nt<=b.height-X){zt.bindFramebuffer(O.FRAMEBUFFER,kt);let At=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,At),O.bufferData(O.PIXEL_PACK_BUFFER,St.byteLength,O.STREAM_READ),O.readPixels(W,nt,it,X,Ot.convert($t),Ot.convert(Zt),0);let ce=D!==null?Lt.get(D).__webglFramebuffer:null;zt.bindFramebuffer(O.FRAMEBUFFER,ce);let ve=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await r_(O,ve,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,At),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,St),O.deleteBuffer(At),O.deleteSync(ve),St}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,W=null,nt=0){b.isTexture!==!0&&(_o("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,b=arguments[1]);let it=Math.pow(2,-nt),X=Math.floor(b.image.width*it),St=Math.floor(b.image.height*it),It=W!==null?W.x:0,kt=W!==null?W.y:0;C.setTexture2D(b,0),O.copyTexSubImage2D(O.TEXTURE_2D,nt,0,0,It,kt,X,St),zt.unbindTexture()},this.copyTextureToTexture=function(b,W,nt=null,it=null,X=0){b.isTexture!==!0&&(_o("WebGLRenderer: copyTextureToTexture function signature has changed."),it=arguments[0]||null,b=arguments[1],W=arguments[2],X=arguments[3]||0,nt=null);let St,It,kt,Ft,$t,Zt,At,ce,ve,ye=b.isCompressedTexture?b.mipmaps[X]:b.image;nt!==null?(St=nt.max.x-nt.min.x,It=nt.max.y-nt.min.y,kt=nt.isBox3?nt.max.z-nt.min.z:1,Ft=nt.min.x,$t=nt.min.y,Zt=nt.isBox3?nt.min.z:0):(St=ye.width,It=ye.height,kt=ye.depth||1,Ft=0,$t=0,Zt=0),it!==null?(At=it.x,ce=it.y,ve=it.z):(At=0,ce=0,ve=0);let Oe=Ot.convert(W.format),se=Ot.convert(W.type),Ht;W.isData3DTexture?(C.setTexture3D(W,0),Ht=O.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(C.setTexture2DArray(W,0),Ht=O.TEXTURE_2D_ARRAY):(C.setTexture2D(W,0),Ht=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,W.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,W.unpackAlignment);let Fn=O.getParameter(O.UNPACK_ROW_LENGTH),de=O.getParameter(O.UNPACK_IMAGE_HEIGHT),yn=O.getParameter(O.UNPACK_SKIP_PIXELS),qn=O.getParameter(O.UNPACK_SKIP_ROWS),Nt=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,ye.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ye.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ft),O.pixelStorei(O.UNPACK_SKIP_ROWS,$t),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Zt);let hs=b.isDataArrayTexture||b.isData3DTexture,we=W.isDataArrayTexture||W.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){let Mn=Lt.get(b),pe=Lt.get(W),Se=Lt.get(Mn.__renderTarget),On=Lt.get(pe.__renderTarget);zt.bindFramebuffer(O.READ_FRAMEBUFFER,Se.__webglFramebuffer),zt.bindFramebuffer(O.DRAW_FRAMEBUFFER,On.__webglFramebuffer);for(let bn=0;bn<kt;bn++)hs&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Lt.get(b).__webglTexture,X,Zt+bn),b.isDepthTexture?(we&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Lt.get(W).__webglTexture,X,ve+bn),O.blitFramebuffer(Ft,$t,St,It,At,ce,St,It,O.DEPTH_BUFFER_BIT,O.NEAREST)):we?O.copyTexSubImage3D(Ht,X,At,ce,ve+bn,Ft,$t,St,It):O.copyTexSubImage2D(Ht,X,At,ce,ve+bn,Ft,$t,St,It);zt.bindFramebuffer(O.READ_FRAMEBUFFER,null),zt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else we?b.isDataTexture||b.isData3DTexture?O.texSubImage3D(Ht,X,At,ce,ve,St,It,kt,Oe,se,ye.data):W.isCompressedArrayTexture?O.compressedTexSubImage3D(Ht,X,At,ce,ve,St,It,kt,Oe,ye.data):O.texSubImage3D(Ht,X,At,ce,ve,St,It,kt,Oe,se,ye):b.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,X,At,ce,St,It,Oe,se,ye.data):b.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,X,At,ce,ye.width,ye.height,Oe,ye.data):O.texSubImage2D(O.TEXTURE_2D,X,At,ce,St,It,Oe,se,ye);O.pixelStorei(O.UNPACK_ROW_LENGTH,Fn),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,de),O.pixelStorei(O.UNPACK_SKIP_PIXELS,yn),O.pixelStorei(O.UNPACK_SKIP_ROWS,qn),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Nt),X===0&&W.generateMipmaps&&O.generateMipmap(Ht),zt.unbindTexture()},this.copyTextureToTexture3D=function(b,W,nt=null,it=null,X=0){return b.isTexture!==!0&&(_o("WebGLRenderer: copyTextureToTexture3D function signature has changed."),nt=arguments[0]||null,it=arguments[1]||null,b=arguments[2],W=arguments[3],X=arguments[4]||0),_o('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,W,nt,it,X)},this.initRenderTarget=function(b){Lt.get(b).__webglFramebuffer===void 0&&C.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?C.setTextureCube(b,0):b.isData3DTexture?C.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?C.setTexture2DArray(b,0):C.setTexture2D(b,0),zt.unbindTexture()},this.resetState=function(){I=0,R=0,D=null,zt.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=fe._getDrawingBufferColorSpace(t),e.unpackColorSpace=fe._getUnpackColorSpace()}};var Ol=class extends un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ii,this.environmentIntensity=1,this.environmentRotation=new ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Or=class extends ss{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new he(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Bl=new G,zl=new G,Bm=new De,xo=new wl,cl=new Nr,bh=new G,zm=new G,Eo=class extends un{constructor(t=new Sn,e=new Or){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Bl.fromBufferAttribute(e,s-1),zl.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Bl.distanceTo(zl);t.setAttribute("lineDistance",new Ze(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),cl.copy(i.boundingSphere),cl.applyMatrix4(s),cl.radius+=r,t.ray.intersectsSphere(cl)===!1)return;Bm.copy(s).invert(),xo.copy(t.ray).applyMatrix4(Bm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let y=p,m=g-1;y<m;y+=c){let d=h.getX(y),w=h.getX(y+1),T=hl(this,t,xo,l,d,w);T&&e.push(T)}if(this.isLineLoop){let y=h.getX(g-1),m=h.getX(p),d=hl(this,t,xo,l,y,m);d&&e.push(d)}}else{let p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let y=p,m=g-1;y<m;y+=c){let d=hl(this,t,xo,l,y,y+1);d&&e.push(d)}if(this.isLineLoop){let y=hl(this,t,xo,l,g-1,p);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function hl(n,t,e,i,s,r){let o=n.geometry.attributes.position;if(Bl.fromBufferAttribute(o,s),zl.fromBufferAttribute(o,r),e.distanceSqToSegment(Bl,zl,bh,zm)>i)return;bh.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(bh);if(!(l<t.near||l>t.far))return{distance:l,point:zm.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}var km=new G,Vm=new G,Ri=class extends Eo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)km.fromBufferAttribute(e,s),Vm.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+km.distanceTo(Vm);t.setAttribute("lineDistance",new Ze(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Br=class n extends Sn{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],p=[],g=0,y=[],m=i/2,d=0;w(),o===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new Ze(u,3)),this.setAttribute("normal",new Ze(f,3)),this.setAttribute("uv",new Ze(p,2));function w(){let v=new G,L=new G,I=0,R=(e-t)/i;for(let D=0;D<=r;D++){let M=[],S=D/r,U=S*(e-t)+t;for(let Y=0;Y<=s;Y++){let $=Y/s,Z=$*l+a,rt=Math.sin(Z),B=Math.cos(Z);L.x=U*rt,L.y=-S*i+m,L.z=U*B,u.push(L.x,L.y,L.z),v.set(rt,R,B).normalize(),f.push(v.x,v.y,v.z),p.push($,1-S),M.push(g++)}y.push(M)}for(let D=0;D<s;D++)for(let M=0;M<r;M++){let S=y[M][D],U=y[M+1][D],Y=y[M+1][D+1],$=y[M][D+1];(t>0||M!==0)&&(h.push(S,U,$),I+=3),(e>0||M!==r-1)&&(h.push(U,Y,$),I+=3)}c.addGroup(d,I,0),d+=I}function T(v){let L=g,I=new ge,R=new G,D=0,M=v===!0?t:e,S=v===!0?1:-1;for(let Y=1;Y<=s;Y++)u.push(0,m*S,0),f.push(0,S,0),p.push(.5,.5),g++;let U=g;for(let Y=0;Y<=s;Y++){let Z=Y/s*l+a,rt=Math.cos(Z),B=Math.sin(Z);R.x=M*B,R.y=m*S,R.z=M*rt,u.push(R.x,R.y,R.z),f.push(0,S,0),I.x=rt*.5+.5,I.y=B*.5*S+.5,p.push(I.x,I.y),g++}for(let Y=0;Y<s;Y++){let $=L+Y,Z=U+Y;v===!0?h.push(Z,Z+1,$):h.push(Z+1,Z,$),D+=3}c.addGroup(d,D,v===!0?1:2),d+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var ul=new G,fl=new G,Th=new G,dl=new Qi,Pi=class extends Sn{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(Ar*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),f={},p=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:y,b:m,c:d}=dl;if(y.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),d.fromBufferAttribute(a,c[2]),dl.getNormal(Th),u[0]=`${Math.round(y.x*s)},${Math.round(y.y*s)},${Math.round(y.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(d.x*s)},${Math.round(d.y*s)},${Math.round(d.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let w=0;w<3;w++){let T=(w+1)%3,v=u[w],L=u[T],I=dl[h[w]],R=dl[h[T]],D=`${v}_${L}`,M=`${L}_${v}`;M in f&&f[M]?(Th.dot(f[M].normal)<=r&&(p.push(I.x,I.y,I.z),p.push(R.x,R.y,R.z)),f[M]=null):D in f||(f[D]={index0:c[w],index1:c[T],normal:Th.clone()})}}for(let g in f)if(f[g]){let{index0:y,index1:m}=f[g];ul.fromBufferAttribute(a,y),fl.fromBufferAttribute(a,m),p.push(ul.x,ul.y,ul.z),p.push(fl.x,fl.y,fl.z)}this.setAttribute("position",new Ze(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var kl=class n extends Sn{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],l=[],c=[],h=new G,u=new G,f=new G;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){let y=g/s*r,m=p/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(y),u.y=(t+e*Math.cos(m))*Math.sin(y),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(y),h.y=t*Math.sin(y),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){let y=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,w=(s+1)*p+g;o.push(y,m,w),o.push(m,d,w)}this.setIndex(o),this.setAttribute("position",new Ze(a,3)),this.setAttribute("normal",new Ze(l,3)),this.setAttribute("uv",new Ze(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var oi=class extends ss{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new he(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=r0,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function pl(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function e1(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var zr=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ru=class extends zr{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Vp,endingEnd:Vp}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Hp:r=t,a=2*e-i;break;case Gp:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Hp:o=t,l=2*i-e;break;case Gp:o=1,l=i+s[1]-s[0];break;default:o=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(i-e)/(s-e),y=g*g,m=y*g,d=-f*m+2*f*y-f*g,w=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*g+1,T=(-1-p)*m+(1.5+p)*y+.5*g,v=p*m-p*y;for(let L=0;L!==a;++L)r[L]=d*o[h+L]+w*o[c+L]+T*o[l+L]+v*o[u+L];return r}},Pu=class extends zr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(i-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[c+f]*u+o[l+f]*h;return r}},Iu=class extends zr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Wn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=pl(e,this.TimeBufferType),this.values=pl(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:pl(t.times,Array),values:pl(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Iu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Pu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ru(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case vl:e=this.InterpolantFactoryMethodDiscrete;break;case fu:e=this.InterpolantFactoryMethodLinear;break;case Kc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return vl;case this.InterpolantFactoryMethodLinear:return fu;case this.InterpolantFactoryMethodSmooth:return Kc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&e1(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Kc,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*i,f=u-i,p=u+i;for(let g=0;g!==i;++g){let y=e[u+g];if(y!==e[f+g]||y!==e[p+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*i,f=o*i;for(let p=0;p!==i;++p)e[f+p]=e[u+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Wn.prototype.TimeBufferType=Float32Array;Wn.prototype.ValueBufferType=Float32Array;Wn.prototype.DefaultInterpolation=fu;var Ps=class extends Wn{constructor(t,e,i){super(t,e,i)}};Ps.prototype.ValueTypeName="bool";Ps.prototype.ValueBufferType=Array;Ps.prototype.DefaultInterpolation=vl;Ps.prototype.InterpolantFactoryMethodLinear=void 0;Ps.prototype.InterpolantFactoryMethodSmooth=void 0;var Du=class extends Wn{};Du.prototype.ValueTypeName="color";var Lu=class extends Wn{};Lu.prototype.ValueTypeName="number";var Uu=class extends zr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)is.slerpFlat(r,0,o,c-a,o,c,l);return r}},Vl=class extends Wn{InterpolantFactoryMethodLinear(t){return new Uu(this.times,this.values,this.getValueSize(),t)}};Vl.prototype.ValueTypeName="quaternion";Vl.prototype.InterpolantFactoryMethodSmooth=void 0;var Is=class extends Wn{constructor(t,e,i){super(t,e,i)}};Is.prototype.ValueTypeName="string";Is.prototype.ValueBufferType=Array;Is.prototype.DefaultInterpolation=vl;Is.prototype.InterpolantFactoryMethodLinear=void 0;Is.prototype.InterpolantFactoryMethodSmooth=void 0;var Nu=class extends Wn{};Nu.prototype.ValueTypeName="vector";var Fu=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},n1=new Fu,Ou=class{constructor(t){this.manager=t!==void 0?t:n1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Ou.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ao=class extends un{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new he(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var wh=new De,Hm=new G,Gm=new G,Hl=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ge(512,512),this.map=null,this.mapPass=null,this.matrix=new De,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wo,this._frameExtents=new ge(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;Hm.setFromMatrixPosition(t.matrixWorld),e.position.copy(Hm),Gm.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Gm),e.updateMatrixWorld(),wh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wh),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(wh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Wm=new De,yo=new G,Eh=new G,Bu=class extends Hl{constructor(){super(new nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ge(4,2),this._viewportCount=6,this._viewports=[new be(2,1,1,1),new be(0,1,1,1),new be(3,1,1,1),new be(1,1,1,1),new be(3,0,1,1),new be(1,0,1,1)],this._cubeDirections=[new G(1,0,0),new G(-1,0,0),new G(0,0,1),new G(0,0,-1),new G(0,1,0),new G(0,-1,0)],this._cubeUps=[new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,0,1),new G(0,0,-1)]}updateMatrices(t,e=0){let i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),yo.setFromMatrixPosition(t.matrixWorld),i.position.copy(yo),Eh.copy(i.position),Eh.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Eh),i.updateMatrixWorld(),s.makeTranslation(-yo.x,-yo.y,-yo.z),Wm.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wm)}},Gl=class extends Ao{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Bu}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},zu=class extends Hl{constructor(){super(new Ll(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Wl=class extends Ao{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.target=new un,this.shadow=new zu}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Xl=class extends Ao{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Yl=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Xm(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Xm();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Xm(){return performance.now()}var Zu="\\[\\]\\.:\\/",i1=new RegExp("["+Zu+"]","g"),Ku="[^"+Zu+"]",s1="[^"+Zu.replace("\\.","")+"]",r1=/((?:WC+[\/:])*)/.source.replace("WC",Ku),o1=/(WCOD+)?/.source.replace("WCOD",s1),a1=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ku),l1=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ku),c1=new RegExp("^"+r1+o1+a1+l1+"$"),h1=["material","materials","bones","map"],ku=class{constructor(t,e,i){let s=i||Pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Pe=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(i1,"")}static parseTrackName(t){let e=c1.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);h1.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Pe.Composite=ku;Pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Pe.prototype.GetterByBindingType=[Pe.prototype._getValue_direct,Pe.prototype._getValue_array,Pe.prototype._getValue_arrayElement,Pe.prototype._getValue_toArray];Pe.prototype.SetterByBindingTypeAndVersioning=[[Pe.prototype._setValue_direct,Pe.prototype._setValue_direct_setNeedsUpdate,Pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_array,Pe.prototype._setValue_array_setNeedsUpdate,Pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_arrayElement,Pe.prototype._setValue_arrayElement_setNeedsUpdate,Pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_fromArray,Pe.prototype._setValue_fromArray_setNeedsUpdate,Pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var k3=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var Ro=new G;function In(n,t,e,i,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;Ro.copy(t),Ro[i]=0,Ro.normalize();let c=.5*o/(o+a),h=1-Ro.angleTo(n)/l;return Math.sign(Ro[e])===1?h*c:a/(o+a)+c+c*(1-h)}var Ii=class extends si{constructor(t=1,e=1,i=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,i/2,r),super(1,1,1,s,s,s),s===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let a=new G,l=new G,c=new G(t,e,i).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,p=h.length/6,g=new G,y=.5/s;for(let m=0,d=0;m<h.length;m+=3,d+=2)switch(a.fromArray(h,m),l.copy(a),l.x-=Math.sign(l.x)*y,l.y-=Math.sign(l.y)*y,l.z-=Math.sign(l.z)*y,l.normalize(),h[m+0]=c.x*Math.sign(a.x)+l.x*r,h[m+1]=c.y*Math.sign(a.y)+l.y*r,h[m+2]=c.z*Math.sign(a.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/p)){case 0:g.set(1,0,0),f[d+0]=In(g,l,"z","y",r,i),f[d+1]=1-In(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),f[d+0]=1-In(g,l,"z","y",r,i),f[d+1]=1-In(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),f[d+0]=1-In(g,l,"x","z",r,t),f[d+1]=In(g,l,"z","x",r,i);break;case 3:g.set(0,-1,0),f[d+0]=1-In(g,l,"x","z",r,t),f[d+1]=1-In(g,l,"z","x",r,i);break;case 4:g.set(0,0,1),f[d+0]=1-In(g,l,"x","y",r,t),f[d+1]=1-In(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),f[d+0]=In(g,l,"x","y",r,t),f[d+1]=1-In(g,l,"y","x",r,e);break}}};var Kl=matchMedia("(prefers-reduced-motion: reduce)").matches,W3=new URLSearchParams(location.search).has("debug"),Ds=15026253;function g0(n,t,e,i){let s=new Fl({canvas:t,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});s.setPixelRatio(Math.min(devicePixelRatio,2));let r=new Ol,o=new nn(36,1,.1,60);o.position.set(3.4,2.6,5),r.add(o),r.add(new Xl(3421242,1.7));let a=new Wl(16773604,3.2);a.position.set(4,6,5),r.add(a);let l=new Gl(Ds,80,16);l.position.set(-3.5,1.5,-3),r.add(l);let c=()=>new Or({color:Ds,transparent:!0,opacity:1}),h=()=>new oi({color:1776417,metalness:.45,roughness:.42,transparent:!0,opacity:1}),u=new ni;r.add(u);let f=[],p=new ni;u.add(p);function g(P,H,Q){let j=new ni;return P(j),j.position.y=H,j.userData={baseY:H,mats:[],edges:[],anchor:new G(Q[0],0,Q[2]),op:1},j.traverse(pt=>{pt.isMesh&&pt.material.transparent!==void 0&&(pt.material=pt.material.clone(),j.userData.mats.push(pt.material)),pt.isLineSegments&&(pt.material=pt.material.clone(),j.userData.edges.push(pt.material))}),p.add(j),f.push(j),j}g(P=>{let H=new Ie(new Ii(1.15,.34,1.15,3,.05),h());P.add(H),P.add(new Ri(new Pi(H.geometry,22),c()));let Q=new Ie(new Br(.17,.17,.07,24),new oi({color:Ds,emissive:Ds,emissiveIntensity:1.5,transparent:!0}));Q.position.y=.21,P.add(Q),P.userData.seal=Q.material},1.62,[.6,0,.6]),g(P=>{let H=new Ie(new Ii(2.25,.18,1.65,3,.04),h());P.add(H),P.add(new Ri(new Pi(H.geometry,22),c()));let Q=new oi({color:6974066,metalness:.85,roughness:.3,transparent:!0});for(let j=0;j<10;j++){let pt=new Ie(new Br(.045,.045,.09,10),Q);pt.position.set(-.9+j%5*.45,.13,j<5?-.45:.45),P.add(pt)}},1.32,[1.2,0,.9]),g(P=>{let H=new Ie(new Ii(2,.34,1.3,3,.05),h());P.add(H),P.add(new Ri(new Pi(H.geometry,22),c()));let Q=new Ii(.24,.24,.24,2,.04);for(let j=0;j<5;j++){let pt=new Ie(Q,h());pt.position.set(-.72+j*.36,.28,0),P.add(pt);let _t=new Ri(new Pi(Q),c());if(pt.add(_t),j>0){let ft=new Eo(new Sn().setFromPoints([new G(-.72+(j-1)*.36,.28,0),new G(-.72+j*.36,.28,0)]),new Or({color:Ds,transparent:!0,opacity:.45}));P.add(ft)}}},.98,[1.05,0,.7]),g(P=>{let H=new Ie(new Ii(1.5,.26,1.1,3,.04),h());P.add(H),P.add(new Ri(new Pi(H.geometry,22),c()));let Q=new oi({color:10124095,metalness:.9,roughness:.35,transparent:!0});for(let pt=0;pt<12;pt++){let _t=new Ie(new si(.14,.05,.16),Q);_t.position.set(-.62+pt%6*.25,.15,pt<6?-.4:.4),P.add(_t)}let j=new Ie(new si(.4,.09,.4),new oi({color:657932,metalness:.6,roughness:.2,transparent:!0}));j.position.y=.17,P.add(j)},.62,[.8,0,.6]),g(P=>{let H=new Ie(new Ii(2.5,.55,1.9,3,.06),h());P.add(H),P.add(new Ri(new Pi(H.geometry,22),c()));let Q=new Ie(new Br(.55,.55,.06,36),new oi({color:5658208,metalness:.85,roughness:.25,transparent:!0}));Q.position.set(-.6,.3,0),P.add(Q);let j=new Ie(new kl(.55,.015,8,48),new oi({color:Ds,emissive:Ds,emissiveIntensity:.9,transparent:!0}));j.rotation.x=Math.PI/2,j.position.set(.6,.3,0),P.add(j),P.userData.ring=j},0,[1.3,0,1]),u.position.y=-.9;let y=[3.1,1.9,1.05,.45,0];function m(){let P=t.clientWidth,H=t.clientHeight;s.setSize(P,H,!1),o.aspect=P/H;let Q=i.getBoundingClientRect(),j=t.getBoundingClientRect(),pt=matchMedia("(max-width: 900px)").matches;d=pt?0:Math.max(0,Q.right-j.left+24);let _t=document.querySelector("header, nav"),ft=parseFloat(getComputedStyle(t.parentElement).top)||0,Rt=Math.max(0,(_t?_t.getBoundingClientRect().height:64)-ft)+12;w=pt?Math.max(0,j.bottom-Q.top+12):0,o.setViewOffset(P,H,-d/2,(w-Rt)/2,P,H),T=Math.max(.3,(P-d)/Math.max(1,H-w-Rt)),v=Math.max(.3,(H-w-Rt)/H)}let d=0,w=0,T=1,v=1;m(),new ResizeObserver(m).observe(t);let L=new G(3.4,2.5,5).normalize(),I=new G,R=0;function D(P,H){let Q=f[0].position.y+.25,j=-.3,pt=u.position.y+(Q+j)/2,_t=(Q-j)/2,ft=1.6+.3*P,Rt=Math.hypot(_t,ft)*1.06,Gt=a0.degToRad(o.fov/2),Yt=Math.min(Math.atan(Math.tan(Gt)*v),Math.atan(Math.tan(Gt)*v*T)),O=Rt/Math.sin(Yt);R=R?R+(O-R)*Math.min(H*5,1):O,I.set(0,pt,0),o.position.copy(L).multiplyScalar(R).add(I),o.lookAt(I)}let M=[...i.querySelectorAll(".chip")],S=[...n.querySelectorAll(".step")],U=-1;function Y(P){P!==U&&(U=P,S.forEach(H=>H.classList.toggle("active",+H.dataset.layer===P)),M.forEach(H=>H.classList.toggle("active",+H.dataset.layer===P)))}if(Kl)Y(1);else{let P=new IntersectionObserver(H=>{for(let Q of H)Q.isIntersecting&&Y(+Q.target.dataset.layer)},{rootMargin:matchMedia("(max-width: 900px)").matches?"-70% 0px -22% 0px":"-42% 0px -42% 0px"});S.forEach(H=>P.observe(H))}let Z=document.createElementNS("http://www.w3.org/2000/svg","line");e.appendChild(Z);let rt=matchMedia("(max-width: 900px)").matches,B=new G;function et(){if(rt||U<0){Z.setAttribute("opacity","0");return}let P=i.querySelector(".chip.active");if(!P)return;let H=P.getBoundingClientRect(),Q=t.getBoundingClientRect(),j=H.right-Q.left,pt=H.top+H.height/2-Q.top,_t=f[U].userData.anchor,ft=null,Rt=1/0;for(let[O,le]of[[1,1],[1,-1],[-1,1],[-1,-1]]){let gt=B.set(_t.x*O,0,_t.z*le);f[U].localToWorld(gt),gt.project(o),gt.x<Rt&&(Rt=gt.x,ft=(ft||new G).copy(gt))}let Gt=(ft.x*.5+.5)*Q.width,Yt=(-ft.y*.5+.5)*Q.height;if(ft.z>1||Gt<j||Gt>Q.width||Yt<0||Yt>Q.height){Z.setAttribute("opacity","0");return}Z.setAttribute("x1",j),Z.setAttribute("y1",pt),Z.setAttribute("x2",Gt),Z.setAttribute("y2",Yt),Z.setAttribute("opacity","0.55")}let N=P=>P*P*(3-2*P),F=0,J=0,K=!0;new IntersectionObserver(([P])=>{K=P.isIntersecting},{threshold:.02}).observe(t);let at=new Yl;function vt(){let P=Math.min(at.getDelta(),.05),H=at.elapsedTime,Q=n.getBoundingClientRect(),j=innerHeight,pt=Q.height-j;J=pt>0?Math.min(1,Math.max(0,-Q.top/pt)):0,F+=(J-F)*Math.min(P*6,1);let _t=Kl?.35:N(F);for(let ft=0;ft<f.length;ft++){let Rt=f[ft],Gt=y[ft];Rt.position.y=Rt.userData.baseY+Gt*_t,Rt.position.x=(ft%2===0?-1:1)*_t*.28;let Yt=U<0||U===ft?1:.22;Rt.userData.op+=(Yt-Rt.userData.op)*Math.min(P*8,1);let O=Rt.userData.op;for(let le of Rt.userData.mats)le.opacity=O;for(let le of Rt.userData.edges)le.opacity=.8*O;Rt.userData.seal&&(Rt.userData.seal.emissiveIntensity=(1.2+Math.sin(H*2.5)*.5)*O),Rt.userData.ring&&(Rt.userData.ring.material.emissiveIntensity=(.7+Math.sin(H*1.8)*.3)*O)}p.rotation.y=(Kl?.5:H*.12)+_t*1.2,D(_t,P),s.render(r,o),et()}return Kl?vt():s.setAnimationLoop(()=>{K&&!document.hidden&&vt()}),{dispose(){s.setAnimationLoop(null)}}}var li=typeof window<"u",Ju=li?window:null,Zr=li?document:null,Le={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},ae={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},Ln={NONE:0,AUTO:1,FORCE:2},dn={replace:0,none:1,blend:2},x0=Symbol(),cf=Symbol(),P0=Symbol(),cc=Symbol();var f1=Symbol(),Te=1e-11,I0=1e12,Ns=1e3,ef=120,ls="",No=new Map;No.set("x","translateX");No.set("y","translateY");No.set("z","translateZ");var hf=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],D0=hf.reduce((n,t)=>({...n,[t]:t+"("}),{}),gn=()=>{},d1=/(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,p1=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,m1=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,g1=/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,x1=/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,y0=/[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,L0=/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,y1=/([a-z])([A-Z])/g,_1=/(\w+)(\([^)]+\)+)/g,v1=/(\*=|\+=|-=)/,U0={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:ef,loop:0,reversed:!1,alternate:!1,autoplay:!0,duration:Ns,delay:0,loopDelay:0,ease:"out(2)",composition:dn.replace,modifier:n=>n,onBegin:gn,onBeforeUpdate:gn,onUpdate:gn,onLoop:gn,onPause:gn,onComplete:gn,onRender:gn},Fe={defaults:U0,root:Zr,scope:null,precision:4,timeScale:1,tickThreshold:200},N0={version:"4.0.2",engine:null};li&&(Ju.AnimeJS||(Ju.AnimeJS=[]),Ju.AnimeJS.push(N0));var S1=n=>n.replace(y1,"$1-$2").toLowerCase(),Us=(n,t)=>n.indexOf(t)===0,Do=Date.now,Fs=Array.isArray,Qu=n=>n&&n.constructor===Object,uf=n=>typeof n=="number"&&!isNaN(n),hc=n=>typeof n=="string",sc=n=>typeof n=="function",oe=n=>typeof n>"u",tc=n=>oe(n)||n===null,F0=n=>li&&n instanceof SVGElement,O0=n=>d1.test(n),B0=n=>Us(n,"rgb"),z0=n=>Us(n,"hsl"),M1=n=>O0(n)||B0(n)||z0(n),ec=n=>!Fe.defaults.hasOwnProperty(n),Ls=n=>hc(n)?parseFloat(n):n,Wr=Math.pow,k0=Math.sqrt,b1=Math.sin,T1=Math.cos,Lo=Math.abs;var w1=Math.ceil,Uo=Math.floor,E1=Math.asin,A1=Math.max;var Fo=Math.PI,nf=Math.round,Ke=(n,t,e)=>n<t?t:n>e?e:n,_0={},Ue=(n,t)=>{if(t<0)return n;if(!t)return nf(n);let e=_0[t];return e||(e=_0[t]=10**t),nf(n*e)/e},C1=(n,t)=>Fs(t)?t.reduce((e,i)=>Lo(i-n)<Lo(e-n)?i:e):t?nf(n/t)*t:n,as=(n,t,e)=>n+(t-n)*e,ff=n=>n===1/0?I0:n===-1/0?-1e12:n,Io=n=>n<=Te?Te:ff(Ue(n,11)),fn=n=>Fs(n)?[...n]:n,R1=(n,t)=>{let e={...n};for(let i in t){let s=n[i];e[i]=oe(s)?t[i]:s}return e},ze=(n,t,e,i="_prev",s="_next")=>{let r=n._head,o=s;for(e&&(r=n._tail,o=i);r;){let a=r[o];t(r),r=a}},cs=(n,t,e="_prev",i="_next")=>{let s=t[e],r=t[i];s?s[i]=r:n._head=r,r?r[e]=s:n._tail=s,t[e]=null,t[i]=null},qr=(n,t,e,i="_prev",s="_next")=>{let r=n._tail;for(;r&&e&&e(r,t);)r=r[i];let o=r?r[s]:n._head;r?r[s]=t:n._head=t,o?o[i]=t:n._tail=t,t[i]=r,t[s]=o},rc=class{constructor(t=0){this.deltaTime=0,this._currentTime=t,this._elapsedTime=t,this._startTime=t,this._lastTime=t,this._scheduledTime=0,this._frameDuration=Ue(Ns/ef,0),this._fps=ef,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(t){let e=this._frameDuration,i=+t,s=i<Te?Te:i,r=Ue(Ns/s,0);this._fps=s,this._frameDuration=r,this._scheduledTime+=r-e}get speed(){return this._speed}set speed(t){let e=+t;this._speed=e<Te?Te:e}requestTick(t){let e=this._scheduledTime,i=this._elapsedTime;if(this._elapsedTime+=t-i,i<e)return Ln.NONE;let s=this._frameDuration,r=i-e;return this._scheduledTime+=r<s?s:r,Ln.AUTO}computeDeltaTime(t){let e=t-this._lastTime;return this.deltaTime=e,this._lastTime=t,e}},nc=(n,t,e,i,s)=>{let r=n.parent,o=n.duration,a=n.completed,l=n.iterationDuration,c=n.iterationCount,h=n._currentIteration,u=n._loopDelay,f=n._reversed,p=n._alternate,g=n._hasChildren,y=n._delay,m=n._currentTime,d=y+l,w=t-y,T=Ke(m,-y,o),v=Ke(w,-y,o),L=w-m,I=v>0,R=v>=o,D=o<=Te,M=s===Ln.FORCE,S=0,U=w,Y=0;if(c>1){let et=~~(v/(l+(R?0:u)));n._currentIteration=Ke(et,0,c),R&&n._currentIteration--,S=n._currentIteration%2,U=v%(l+u)||0}let $=f^(p&&S),Z=n._ease,rt=R?$?0:o:$?l-U:U;Z&&(rt=l*Z(rt/l)||0);let B=(r?r.backwards:w<m)?!$:!!$;if(n._currentTime=w,n._iterationTime=rt,n.backwards=B,I&&!n.began?(n.began=!0,!e&&!(r&&(B||!r.began))&&n.onBegin(n)):w<=0&&(n.began=!1),!e&&!g&&I&&n._currentIteration!==h&&n.onLoop(n),M||s===Ln.AUTO&&(t>=y&&t<=d||t<=y&&T>y||t>=d&&T!==o)||rt>=d&&T!==o||rt<=y&&T>0||t<=T&&T===o&&a||R&&!a&&D){if(I&&(n.computeDeltaTime(T),e||n.onBeforeUpdate(n)),!g){let et=M||(B?L*-1:L)>=Fe.tickThreshold,N=n._offset+(r?r._offset:0)+y+rt,F=n._head,J,K,at,vt,P=0;for(;F;){let H=F._composition,Q=F._currentTime,j=F._changeDuration,pt=F._absoluteStartTime+F._changeDuration,_t=F._nextRep,ft=F._prevRep,Rt=H!==dn.none;if((et||(Q!==j||N<=pt+(_t?_t._delay:0))&&(Q!==0||N>=F._absoluteStartTime))&&(!Rt||!F._isOverridden&&(!F._isOverlapped||N<=pt)&&(!_t||_t._isOverridden||N<=_t._absoluteStartTime)&&(!ft||ft._isOverridden||N>=ft._absoluteStartTime+ft._changeDuration+F._delay))){let Gt=F._currentTime=Ke(rt-F._startTime,0,j),Yt=F._ease(Gt/F._updateDuration),O=F._modifier,le=F._valueType,gt=F._tweenType,qt=gt===Le.OBJECT,zt=le===ae.NUMBER,ee=zt&&qt||Yt===0||Yt===1?-1:Fe.precision,Lt,C;if(zt)Lt=C=O(Ue(as(F._fromNumber,F._toNumber,Yt),ee));else if(le===ae.UNIT)C=O(Ue(as(F._fromNumber,F._toNumber,Yt),ee)),Lt=`${C}${F._unit}`;else if(le===ae.COLOR){let _=F._fromNumbers,q=F._toNumbers,ct=Ue(Ke(O(as(_[0],q[0],Yt)),0,255),0),ut=Ue(Ke(O(as(_[1],q[1],Yt)),0,255),0),lt=Ue(Ke(O(as(_[2],q[2],Yt)),0,255),0),Dt=Ke(O(Ue(as(_[3],q[3],Yt),ee)),0,1);if(Lt=`rgba(${ct},${ut},${lt},${Dt})`,Rt){let yt=F._numbers;yt[0]=ct,yt[1]=ut,yt[2]=lt,yt[3]=Dt}}else if(le===ae.COMPLEX){Lt=F._strings[0];for(let _=0,q=F._toNumbers.length;_<q;_++){let ct=O(Ue(as(F._fromNumbers[_],F._toNumbers[_],Yt),ee)),ut=F._strings[_+1];Lt+=`${ut?ct+ut:ct}`,Rt&&(F._numbers[_]=ct)}}if(Rt&&(F._number=C),!i&&H!==dn.blend){let _=F.property;J=F.target,qt?J[_]=Lt:gt===Le.ATTRIBUTE?J.setAttribute(_,Lt):(K=J.style,gt===Le.TRANSFORM?(J!==at&&(at=J,vt=J[cc]),vt[_]=Lt,P=1):gt===Le.CSS?K[_]=Lt:gt===Le.CSS_VAR&&K.setProperty(_,Lt)),I&&(Y=1)}else F._value=Lt}if(P&&F._renderTransforms){let Gt=ls;for(let Yt in vt)Gt+=`${D0[Yt]}${vt[Yt]}) `;K.transform=Gt,P=0}F=F._next}!e&&Y&&n.onRender(n)}!e&&I&&n.onUpdate(n)}return r&&D?!e&&(r.began&&!B&&w>=o&&!a||B&&w<=Te&&a)&&(n.onComplete(n),n.completed=!B):I&&R?c===1/0?n._startTime+=n.duration:n._currentIteration>=c-1&&(n.paused=!0,!a&&!g&&(n.completed=!0,!e&&!(r&&(B||!r.began))&&(n.onComplete(n),n._resolve(n)))):n.completed=!1,Y},Xr=(n,t,e,i,s)=>{let r=n._currentIteration;if(nc(n,t,e,i,s),n._hasChildren){let o=n,a=o.backwards,l=i?t:o._iterationTime,c=Do(),h=0,u=!0;if(!i&&o._currentIteration!==r){let f=o.iterationDuration;ze(o,p=>{if(!a)!p.completed&&!p.backwards&&p._currentTime<p.iterationDuration&&nc(p,f,e,1,Ln.FORCE),p.began=!1,p.completed=!1;else{let g=p.duration,y=p._offset+p._delay,m=y+g;!e&&g<=Te&&(!y||m===f)&&p.onComplete(p)}}),e||o.onLoop(o)}ze(o,f=>{let p=Ue((l-f._offset)*f._speed,12),g=f._fps<o._fps?f.requestTick(c):s;h+=nc(f,p,e,i,g),!f.completed&&u&&(u=!1)},a),!e&&h&&o.onRender(o),u&&o._currentTime>=o.duration&&(o.paused=!0,o.completed||(o.completed=!0,e||(o.onComplete(o),o._resolve(o))))}},$r={animation:null,update:gn},P1=n=>{let t=$r.animation;return t||(t={duration:Te,computeDeltaTime:gn,_offset:0,_delay:0,_head:null,_tail:null},$r.animation=t,$r.update=()=>{n.forEach(e=>{for(let i in e){let s=e[i],r=s._head;if(r){let o=r._valueType,a=o===ae.COMPLEX||o===ae.COLOR?fn(r._fromNumbers):null,l=r._fromNumber,c=s._tail;for(;c&&c!==r;){if(a)for(let h=0,u=c._numbers.length;h<u;h++)a[h]+=c._numbers[h];else l+=c._number;c=c._prevAdd}r._toNumber=l,r._toNumbers=a}}}),nc(t,1,1,0,Ln.FORCE)}),t},V0=li?requestAnimationFrame:setImmediate,I1=li?cancelAnimationFrame:clearImmediate,sf=class extends rc{constructor(t){super(t),this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=U0,this.paused=!!(li&&Zr.hidden),this.reqId=null}update(){let t=this._currentTime=Do();if(this.requestTick(t)){this.computeDeltaTime(t);let e=this._speed,i=this._fps,s=this._head;for(;s;){let r=s._next;s.paused?(cs(this,s),this._hasChildren=!!this._tail,s._running=!1,s.completed&&!s._cancelled&&s.cancel()):Xr(s,(t-s._startTime)*s._speed*e,0,0,s._fps<i?s.requestTick(t):Ln.AUTO),s=r}$r.update()}}wake(){return this.useDefaultMainLoop&&!this.reqId&&!this.paused&&(this.reqId=V0(H0)),this}pause(){return this.paused=!0,D1()}resume(){if(this.paused)return this.paused=!1,ze(this,t=>t.resetTime()),this.wake()}get speed(){return this._speed*(Fe.timeScale===1?1:Ns)}set speed(t){this._speed=t*Fe.timeScale,ze(this,e=>e.speed=e._speed)}get timeUnit(){return Fe.timeScale===1?"ms":"s"}set timeUnit(t){let i=t==="s",s=i?.001:1;if(Fe.timeScale!==s){Fe.timeScale=s,Fe.tickThreshold=200*s;let r=i?.001:Ns;this.defaults.duration*=r,this._speed*=r}}get precision(){return Fe.precision}set precision(t){Fe.precision=t}},qe=(()=>{let n=new sf(Do());return li&&(N0.engine=n,Zr.addEventListener("visibilitychange",()=>{n.pauseOnDocumentHidden&&(Zr.hidden?n.pause():n.resume())})),n})(),H0=()=>{qe._head?(qe.reqId=V0(H0),qe.update()):qe.reqId=0},D1=()=>(I1(qe.reqId),qe.reqId=0,qe),L1=(n,t,e)=>{let i=n.style.transform,s;if(i){let r=n[cc],o;for(;o=_1.exec(i);){let a=o[1],l=o[2].slice(1,-1);r[a]=l,a===t&&(s=l,e&&(e[t]=l))}}return i&&!oe(s)?s:Us(t,"scale")?"1":Us(t,"rotate")||Us(t,"skew")?"0deg":"0px"};function v0(n){let t=hc(n)?Fe.root.querySelectorAll(n):n;if(t instanceof NodeList||t instanceof HTMLCollection)return t}function G0(n){if(tc(n))return[];if(Fs(n)){let e=n.flat(1/0),i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];if(!tc(o)){let a=v0(o);if(a)for(let l=0,c=a.length;l<c;l++){let h=a[l];if(!tc(h)){let u=!1;for(let f=0,p=i.length;f<p;f++)if(i[f]===h){u=!0;break}u||i.push(h)}}else{let l=!1;for(let c=0,h=i.length;c<h;c++)if(i[c]===o){l=!0;break}l||i.push(o)}}}return i}if(!li)return[n];let t=v0(n);return t?Array.from(t):[n]}function df(n){let t=G0(n),e=t.length;if(e)for(let i=0;i<e;i++){let s=t[i];if(!s[x0]){s[x0]=!0;let r=F0(s);(s.nodeType||r)&&(s[cf]=!0,s[P0]=r,s[cc]={})}}return t}var U1=["opacity","rotate","overflow","color"],N1=(n,t)=>{if(U1.includes(t))return!1;if(n.getAttribute(t)||t in n){if(t==="scale"){let e=n.parentNode;return e&&e.tagName==="filter"}return!0}};var F1=n=>{let t=p1.exec(n)||m1.exec(n),e=oe(t[4])?1:+t[4];return[+t[1],+t[2],+t[3],e]},O1=n=>{let t=n.length,e=t===4||t===5;return[+("0x"+n[1]+n[e?1:2]),+("0x"+n[e?2:3]+n[e?2:4]),+("0x"+n[e?3:5]+n[e?3:6]),t===5||t===9?+(+("0x"+n[e?4:7]+n[e?4:8])/255).toFixed(3):1]},ju=(n,t,e)=>(e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*(2/3-e)*6:n),B1=n=>{let t=g1.exec(n)||x1.exec(n),e=+t[1]/360,i=+t[2]/100,s=+t[3]/100,r=oe(t[4])?1:+t[4],o,a,l;if(i===0)o=a=l=s;else{let c=s<.5?s*(1+i):s+i-s*i,h=2*s-c;o=Ue(ju(h,c,e+1/3)*255,0),a=Ue(ju(h,c,e)*255,0),l=Ue(ju(h,c,e-1/3)*255,0)}return[o,a,l,r]},z1=n=>B0(n)?F1(n):O0(n)?O1(n):z0(n)?B1(n):[0,0,0,1],sn=(n,t)=>oe(n)?t:n,rs=(n,t,e,i,s)=>{if(sc(n)){let r=()=>{let o=n(t,e,i);return isNaN(+o)?o||0:+o};return s&&(s.func=r),r()}else return n},pf=(n,t)=>n[cf]?n[P0]&&N1(n,t)?Le.ATTRIBUTE:hf.includes(t)||No.get(t)?Le.TRANSFORM:Us(t,"--")?Le.CSS_VAR:t in n.style?Le.CSS:t in n?Le.OBJECT:Le.ATTRIBUTE:Le.OBJECT,S0=(n,t,e)=>{let i=n.style[t];i&&e&&(e[t]=i);let s=i||getComputedStyle(n[f1]||n).getPropertyValue(t);return s==="auto"?"0":s},Yr=(n,t,e,i)=>{let s=oe(e)?pf(n,t):e;return s===Le.OBJECT?n[t]||0:s===Le.ATTRIBUTE?n.getAttribute(t):s===Le.TRANSFORM?L1(n,t,i):s===Le.CSS_VAR?S0(n,t,i).trimStart():S0(n,t,i)},rf=(n,t,e)=>e==="-"?n-t:e==="+"?n+t:n*t,mf=()=>({t:ae.NUMBER,n:0,u:null,o:null,d:null,s:null}),Yn=(n,t)=>{if(t.t=ae.NUMBER,t.n=0,t.u=null,t.o=null,t.d=null,t.s=null,!n)return t;let e=+n;if(isNaN(e)){let i=n;i[1]==="="&&(t.o=i[0],i=i.slice(2));let s=i.includes(" ")?!1:L0.exec(i);if(s)return t.t=ae.UNIT,t.n=+s[1],t.u=s[2],t;if(t.o)return t.n=+i,t;if(M1(i))return t.t=ae.COLOR,t.d=z1(i),t;{let r=i.match(y0);return t.t=ae.COMPLEX,t.d=r?r.map(Number):[],t.s=i.split(y0)||[],t}}else return t.n=e,t},M0=(n,t)=>(t.t=n._valueType,t.n=n._toNumber,t.u=n._unit,t.o=null,t.d=fn(n._toNumbers),t.s=fn(n._strings),t),Dn=mf(),oc={_rep:new WeakMap,_add:new Map},gf=(n,t,e="_rep")=>{let i=oc[e],s=i.get(n);return s||(s={},i.set(n,s)),s[t]?s[t]:s[t]={_head:null,_tail:null}},k1=(n,t)=>n._isOverridden||n._absoluteStartTime>t._absoluteStartTime,ic=n=>{n._isOverlapped=1,n._isOverridden=1,n._changeDuration=Te,n._currentTime=Te},W0=(n,t)=>{let e=n._composition;if(e===dn.replace){let i=n._absoluteStartTime;qr(t,n,k1,"_prevRep","_nextRep");let s=n._prevRep;if(s){let r=s.parent,o=s._absoluteStartTime+s._changeDuration;if(n.parent.id!==r.id&&r.iterationCount>1&&o+(r.duration-r.iterationDuration)>i){ic(s);let c=s._prevRep;for(;c&&c.parent.id===r.id;)ic(c),c=c._prevRep}let a=i-n._delay;if(o>a){let c=s._startTime,h=o-(c+s._updateDuration);s._changeDuration=a-h-c,s._currentTime=s._changeDuration,s._isOverlapped=1,s._changeDuration<Te&&ic(s)}let l=!0;if(ze(r,c=>{c._isOverlapped||(l=!1)}),l){let c=r.parent;if(c){let h=!0;ze(c,u=>{u!==r&&ze(u,f=>{f._isOverlapped||(h=!1)})}),h&&c.cancel()}else r.cancel()}}}else if(e===dn.blend){let i=gf(n.target,n.property,"_add"),s=P1(oc._add),r=i._head;r||(r={...n},r._composition=dn.replace,r._updateDuration=Te,r._startTime=0,r._numbers=fn(n._fromNumbers),r._number=0,r._next=null,r._prev=null,qr(i,r),qr(s,r));let o=n._toNumber;if(n._fromNumber=r._fromNumber-o,n._toNumber=0,n._numbers=fn(n._fromNumbers),n._number=0,r._fromNumber=o,n._toNumbers){let a=fn(n._toNumbers);a&&a.forEach((l,c)=>{n._fromNumbers[c]=r._fromNumbers[c]-l,n._toNumbers[c]=0}),r._fromNumbers=a}qr(i,n,null,"_prevAdd","_nextAdd")}return n},X0=n=>{let t=n._composition;if(t!==dn.none){let e=n.target,i=n.property,o=oc._rep.get(e)[i];if(cs(o,n,"_prevRep","_nextRep"),t===dn.blend){let a=oc._add,l=a.get(e);if(!l)return;let c=l[i],h=$r.animation;cs(c,n,"_prevAdd","_nextAdd");let u=c._head;if(u&&u===c._tail){cs(c,u,"_prevAdd","_nextAdd"),cs(h,u);let f=!0;for(let p in l)if(l[p]._head){f=!1;break}f&&a.delete(e)}}}return n},b0=n=>(n.paused=!0,n.began=!1,n.completed=!1,n),of=n=>(n._cancelled&&(n._hasChildren?ze(n,of):ze(n,t=>{t._composition!==dn.none&&W0(t,gf(t.target,t.property))}),n._cancelled=0),n),V1=0,ac=class extends rc{constructor(t={},e=null,i=0){super(0);let{id:s,delay:r,duration:o,reversed:a,alternate:l,loop:c,loopDelay:h,autoplay:u,frameRate:f,playbackRate:p,onComplete:g,onLoop:y,onPause:m,onBegin:d,onBeforeUpdate:w,onUpdate:T}=t;Fe.scope&&Fe.scope.revertibles.push(this);let v=e?0:qe._elapsedTime,L=e?e.defaults:Fe.defaults,I=sc(r)||oe(r)?L.delay:+r,R=sc(o)||oe(o)?1/0:+o,D=sn(c,L.loop),M=sn(h,L.loopDelay),S=D===!0||D===1/0||D<0?1/0:D+1,U=0;if(e)U=i;else{let Y=Do();qe.paused&&(qe.requestTick(Y),Y=qe._elapsedTime),U=Y-qe._startTime}this.id=oe(s)?++V1:s,this.parent=e,this.duration=ff((R+M)*S-M)||Te,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=d||L.onBegin,this.onBeforeUpdate=w||L.onBeforeUpdate,this.onUpdate=T||L.onUpdate,this.onLoop=y||L.onLoop,this.onPause=m||L.onPause,this.onComplete=g||L.onComplete,this.iterationDuration=R,this.iterationCount=S,this._autoplay=e?!1:sn(u,L.autoplay),this._offset=U,this._delay=I,this._loopDelay=M,this._iterationTime=0,this._currentIteration=0,this._resolve=gn,this._running=!1,this._reversed=+sn(a,L.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=sn(l,L.alternate),this._prev=null,this._next=null,this._elapsedTime=v,this._startTime=v,this._lastTime=v,this._fps=sn(f,L.frameRate),this._speed=sn(p,L.playbackRate)}get cancelled(){return!!this._cancelled}set cancelled(t){t?this.cancel():this.reset(1).play()}get currentTime(){return Ke(Ue(this._currentTime,Fe.precision),-this._delay,this.duration)}set currentTime(t){let e=this.paused;this.pause().seek(+t),e||this.resume()}get iterationCurrentTime(){return Ue(this._iterationTime,Fe.precision)}set iterationCurrentTime(t){this.currentTime=this.iterationDuration*this._currentIteration+t}get progress(){return Ke(Ue(this._currentTime/this.duration,5),0,1)}set progress(t){this.currentTime=this.duration*t}get iterationProgress(){return Ke(Ue(this._iterationTime/this.iterationDuration,5),0,1)}set iterationProgress(t){let e=this.iterationDuration;this.currentTime=e*this._currentIteration+e*t}get currentIteration(){return this._currentIteration}set currentIteration(t){this.currentTime=this.iterationDuration*Ke(+t,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(t){t?this.reverse():this.play()}get speed(){return super.speed}set speed(t){super.speed=t,this.resetTime()}reset(t=0){return of(this),this._reversed&&!this._reverse&&(this.reversed=!1),this._iterationTime=this.iterationDuration,Xr(this,0,1,t,Ln.FORCE),b0(this),this._hasChildren&&ze(this,b0),this}init(t=0){this.fps=this._fps,this.speed=this._speed,!t&&this._hasChildren&&Xr(this,this.duration,1,t,Ln.FORCE),this.reset(t);let e=this._autoplay;return e===!0?this.resume():e&&!oe(e.linked)&&e.link(this),this}resetTime(){let t=1/(this._speed*qe._speed);return this._startTime=Do()-(this._currentTime+this._delay)*t,this}pause(){return this.paused?this:(this.paused=!0,this.onPause(this),this)}resume(){return this.paused?(this.paused=!1,this.duration<=Te&&!this._hasChildren?Xr(this,Te,0,0,Ln.FORCE):(this._running||(qr(qe,this),qe._hasChildren=!0,this._running=!0),this.resetTime(),this._startTime-=12,qe.wake()),this):this}restart(){return this.reset(0).resume()}seek(t,e=0,i=0){of(this),this.completed=!1;let s=this.paused;return this.paused=!0,Xr(this,t+this._delay,~~e,~~i,Ln.AUTO),s?this:this.resume()}alternate(){let t=this._reversed,e=this.iterationCount,i=this.iterationDuration,s=e===1/0?Uo(I0/i):e;return this._reversed=+(this._alternate&&!(s%2)?t:!t),e===1/0?this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress:this.seek(i*s-this._currentTime),this.resetTime(),this}play(){return this._reversed&&this.alternate(),this.resume()}reverse(){return this._reversed||this.alternate(),this.resume()}cancel(){return this._hasChildren?ze(this,t=>t.cancel(),!0):ze(this,X0),this._cancelled=1,this.pause()}stretch(t){let e=this.duration,i=Io(t);if(e===i)return this;let s=t/e,r=t<=Te;return this.duration=r?Te:i,this.iterationDuration=r?Te:Io(this.iterationDuration*s),this._offset*=s,this._delay*=s,this._loopDelay*=s,this}revert(){Xr(this,0,1,0,Ln.AUTO);let t=this._autoplay;return t&&t.linked&&t.linked===this&&t.revert(),this.cancel()}complete(){return this.seek(this.duration).cancel()}then(t=gn){let e=this.then,i=()=>{this.then=null,t(this),this.then=e,this._resolve=gn};return new Promise(s=>(this._resolve=()=>s(i()),this.completed&&this._resolve(),this))}};var Kr=n=>n,Y0=(n,t,e)=>(((1-3*e+3*t)*n+(3*e-6*t))*n+3*t)*n,H1=(n,t,e)=>{let i=0,s=1,r,o,a=0;do o=i+(s-i)/2,r=Y0(o,t,e)-n,r>0?s=o:i=o;while(Lo(r)>1e-7&&++a<100);return o},G1=(n=.5,t=0,e=.5,i=1)=>n===t&&e===i?Kr:s=>s===0||s===1?s:Y0(H1(s,n,e),t,i),W1=(n=10,t)=>{let e=t?w1:Uo;return i=>e(Ke(i,0,1)*n)*(1/n)},q0=(...n)=>{let t=n.length;if(!t)return Kr;let e=t-1,i=n[0],s=n[e],r=[0],o=[Ls(i)];for(let a=1;a<e;a++){let l=n[a],c=hc(l)?l.trim().split(" "):[l],h=c[0],u=c[1];r.push(oe(u)?a/e:Ls(u)/100),o.push(Ls(h))}return o.push(Ls(s)),r.push(1),function(l){for(let c=1,h=r.length;c<h;c++){let u=r[c];if(l<=u){let f=r[c-1],p=o[c-1];return p+(o[c]-p)*(l-f)/(u-f)}}return o[o.length-1]}},X1=(n=10,t=1)=>{let e=[0],i=n-1;for(let s=1;s<i;s++){let r=e[s-1],o=s/i,a=(s+1)/i,l=o+(a-o)*Math.random(),c=o*(1-t)+l*t;e.push(Ke(c,r,1))}return e.push(1),q0(...e)},Y1=Fo/2,T0=Fo*2,Po=(n=1.68)=>t=>Wr(t,+n),w0={[ls]:Po,Quad:Po(2),Cubic:Po(3),Quart:Po(4),Quint:Po(5),Sine:n=>1-T1(n*Y1),Circ:n=>1-k0(1-n*n),Expo:n=>n?Wr(2,10*n-10):0,Bounce:n=>{let t,e=4;for(;n<((t=Wr(2,--e))-1)/11;);return 1/Wr(4,3-e)-7.5625*Wr((t*3-2)/22-n,2)},Back:(n=1.70158)=>t=>(+n+1)*t*t*t-+n*t*t,Elastic:(n=1,t=.3)=>{let e=Ke(+n,1,10),i=Ke(+t,Te,2),s=i/T0*E1(1/e),r=T0/i;return o=>o===0||o===1?o:-e*Wr(2,-10*(1-o))*b1((1-o-s)*r)}},af={in:n=>t=>n(t),out:n=>t=>1-n(1-t),inOut:n=>t=>t<.5?n(t*2)/2:1-n(t*-2+2)/2,outIn:n=>t=>t<.5?(1-n(1-t*2))/2:(n(t*2-1)+1)/2},q1=(n,t,e)=>{if(e[n])return e[n];if(n.indexOf("(")<=-1){let s=af[n]||n.includes("Back")||n.includes("Elastic")?t[n]():t[n];return s?e[n]=s:Kr}else{let i=n.slice(0,-1).split("("),s=t[i[0]];return s?e[n]=s(...i[1].split(",")):Kr}},$1=(()=>{let n={linear:q0,irregular:X1,steps:W1,cubicBezier:G1};for(let t in af)for(let e in w0){let i=w0[e],s=af[t];n[t+e]=e===ls||e==="Back"||e==="Elastic"?(r,o)=>s(i(r,o)):s(i)}return n})(),Z1={linear:Kr},lf=n=>sc(n)?n:hc(n)?q1(n,$1,Z1):Kr,E0={},xf=(n,t,e)=>{if(e===Le.TRANSFORM){let i=No.get(n);return i||n}else if(e===Le.CSS||e===Le.ATTRIBUTE&&F0(t)&&n in t.style){let i=E0[n];if(i)return i;{let s=n&&S1(n);return E0[n]=s,s}}else return n},tf={deg:1,rad:180/Fo,turn:360},A0={},$0=(n,t,e,i=!1)=>{let s=t.u,r=t.n;if(t.t===ae.UNIT&&s===e)return t;let o=r+s+e,a=A0[o];if(!oe(a)&&!i)t.n=a;else{let l;if(s in tf)l=r*tf[s]/tf[e];else{let h=n.cloneNode(),u=n.parentNode,f=u&&u!==Zr?u:Zr.body;f.appendChild(h);let p=h.style;p.width=100+s;let g=h.offsetWidth||100;p.width=100+e;let y=h.offsetWidth||100,m=g/y;f.removeChild(h),l=m*r}t.n=l,A0[o]=l}return t.t,ae.UNIT,t.u=e,t},yf=n=>{if(n._hasChildren)ze(n,yf,!0);else{let t=n;t.pause(),ze(t,e=>{let i=e.property,s=e.target;if(s[cf]){let r=s.style,o=t._inlineStyles[i];if(e._tweenType===Le.TRANSFORM){let a=s[cc];if(oe(o)||o===ls?delete a[i]:a[i]=o,e._renderTransforms)if(!Object.keys(a).length)r.removeProperty("transform");else{let l=ls;for(let c in a)l+=D0[c]+a[c]+") ";r.transform=l}}else oe(o)||o===ls?r.removeProperty(i):r[i]=o;t._tail===e&&t.targets.forEach(a=>{a.getAttribute&&a.getAttribute("style")===ls&&a.removeAttribute("style")})}})}return n},jt=mf(),re=mf(),Jl={func:null},Ql=[null],Gr=[null,null],jl={to:null},K1=0,os,ai,J1=(n,t)=>{let e={};if(Fs(n)){let i=[].concat(...n.map(s=>Object.keys(s))).filter(ec);for(let s=0,r=i.length;s<r;s++){let o=i[s],a=n.map(l=>{let c={};for(let h in l){let u=l[h];ec(h)?h===o&&(c.to=u):c[h]=u}return c});e[o]=a}}else{let i=sn(t.duration,Fe.defaults.duration);Object.keys(n).map(r=>({o:parseFloat(r)/100,p:n[r]})).sort((r,o)=>r.o-o.o).forEach(r=>{let o=r.o,a=r.p;for(let l in a)if(ec(l)){let c=e[l];c||(c=e[l]=[]);let h=o*i,u=c.length,f=c[u-1],p={to:a[l]},g=0;for(let y=0;y<u;y++)g+=c[y].duration;u===1&&(p.from=f.to),a.ease&&(p.ease=a.ease),p.duration=h-(u?g:0),c.push(p)}return r});for(let r in e){let o=e[r],a;for(let l=0,c=o.length;l<c;l++){let h=o[l],u=h.ease;h.ease=a||void 0,a=u}o[0].duration||o.shift()}}return e},lc=class extends ac{constructor(t,e,i,s,r=!1,o=0,a=0){super(e,i,s);let l=df(t),c=l.length,h=e.keyframes,u=h?R1(J1(h,e),e):e,{delay:f,duration:p,ease:g,playbackEase:y,modifier:m,composition:d,onRender:w}=u,T=i?i.defaults:Fe.defaults,v=sn(y,T.playbackEase),L=v?lf(v):null,I=!oe(g)&&!oe(g.ease),R=I?g.ease:sn(g,L?"linear":T.ease),D=I?g.duration:sn(p,T.duration),M=sn(f,T.delay),S=m||T.modifier,U=oe(d)&&c>=Ns?dn.none:oe(d)?T.composition:d,Y={},$=this._offset+(i?i._offset:0),Z=NaN,rt=NaN,B=0,et=0;for(let N=0;N<c;N++){let F=l[N],J=o||N,K=a||c,at=NaN,vt=NaN;for(let P in u)if(ec(P)){let H=pf(F,P),Q=xf(P,F,H),j=u[P],pt=Fs(j);if(r&&!pt&&(Gr[0]=j,Gr[1]=j,j=Gr),pt){let O=j.length,le=!Qu(j[0]);O===2&&le?(jl.to=j,Ql[0]=jl,os=Ql):O>2&&le?(os=[],j.forEach((gt,qt)=>{qt?qt===1?(Gr[1]=gt,os.push(Gr)):os.push(gt):Gr[0]=gt})):os=j}else Ql[0]=j,os=Ql;let _t=null,ft=null,Rt=NaN,Gt=0,Yt=0;for(let O=os.length;Yt<O;Yt++){let le=os[Yt];Qu(le)?ai=le:(jl.to=le,ai=jl),Jl.func=null;let gt=rs(ai.to,F,J,K,Jl),qt;Qu(gt)&&!oe(gt.to)?(ai=gt,qt=gt.to):qt=gt;let zt=rs(ai.from,F,J,K),ee=ai.ease,Lt=!oe(ee)&&!oe(ee.ease),C=Lt?ee.ease:ee||R,_=Lt?ee.duration:rs(sn(ai.duration,O>1?rs(D,F,J,K)/O:D),F,J,K),q=rs(sn(ai.delay,Yt?0:M),F,J,K),ct=rs(sn(ai.composition,U),F,J,K),ut=uf(ct)?ct:dn[ct],lt=ai.modifier||S,Dt=!oe(zt),yt=!oe(qt),Mt=Fs(qt),Kt=Mt||Dt&&yt,xt=ft?Gt+q:q,Pt=$+xt;!et&&(Dt||Mt)&&(et=1);let Ut=ft;if(ut!==dn.none){_t||(_t=gf(F,Q));let Bt=_t._head;for(;Bt&&!Bt._isOverridden&&Bt._absoluteStartTime<=Pt;)if(Ut=Bt,Bt=Bt._nextRep,Bt&&Bt._absoluteStartTime>=Pt)for(;Bt;)ic(Bt),Bt=Bt._nextRep}if(Kt?(Yn(Mt?rs(qt[0],F,J,K):zt,jt),Yn(Mt?rs(qt[1],F,J,K,Jl):qt,re),jt.t===ae.NUMBER&&(Ut?Ut._valueType===ae.UNIT&&(jt.t=ae.UNIT,jt.u=Ut._unit):(Yn(Yr(F,Q,H,Y),Dn),Dn.t===ae.UNIT&&(jt.t=ae.UNIT,jt.u=Dn.u)))):(yt?Yn(qt,re):ft?M0(ft,re):Yn(i&&Ut&&Ut.parent.parent===i?Ut._value:Yr(F,Q,H,Y),re),Dt?Yn(zt,jt):ft?M0(ft,jt):Yn(i&&Ut&&Ut.parent.parent===i?Ut._value:Yr(F,Q,H,Y),jt)),jt.o&&(jt.n=rf(Ut?Ut._toNumber:Yn(Yr(F,Q,H,Y),Dn).n,jt.n,jt.o)),re.o&&(re.n=rf(jt.n,re.n,re.o)),jt.t!==re.t){if(jt.t===ae.COMPLEX||re.t===ae.COMPLEX){let Bt=jt.t===ae.COMPLEX?jt:re,Ot=jt.t===ae.COMPLEX?re:jt;Ot.t=ae.COMPLEX,Ot.s=fn(Bt.s),Ot.d=Bt.d.map(()=>Ot.n)}else if(jt.t===ae.UNIT||re.t===ae.UNIT){let Bt=jt.t===ae.UNIT?jt:re,Ot=jt.t===ae.UNIT?re:jt;Ot.t=ae.UNIT,Ot.u=Bt.u}else if(jt.t===ae.COLOR||re.t===ae.COLOR){let Bt=jt.t===ae.COLOR?jt:re,Ot=jt.t===ae.COLOR?re:jt;Ot.t=ae.COLOR,Ot.s=Bt.s,Ot.d=[0,0,0,1]}}if(jt.u!==re.u){let Bt=re.u?jt:re;Bt=$0(F,Bt,re.u?re.u:jt.u,!1)}if(re.d&&jt.d&&re.d.length!==jt.d.length){let Bt=jt.d.length>re.d.length?jt:re,Ot=Bt===jt?re:jt;Ot.d=Bt.d.map((ue,k)=>oe(Ot.d[k])?0:Ot.d[k]),Ot.s=fn(Bt.s)}let Xt=Ue(+_||Te,12),wt={parent:this,id:K1++,property:Q,target:F,_value:null,_func:Jl.func,_ease:lf(C),_fromNumbers:fn(jt.d),_toNumbers:fn(re.d),_strings:fn(re.s),_fromNumber:jt.n,_toNumber:re.n,_numbers:fn(jt.d),_number:jt.n,_unit:re.u,_modifier:lt,_currentTime:0,_startTime:xt,_delay:+q,_updateDuration:Xt,_changeDuration:Xt,_absoluteStartTime:Pt,_tweenType:H,_valueType:re.t,_composition:ut,_isOverlapped:0,_isOverridden:0,_renderTransforms:0,_prevRep:null,_nextRep:null,_prevAdd:null,_nextAdd:null,_prev:null,_next:null};ut!==dn.none&&W0(wt,_t),isNaN(Rt)&&(Rt=wt._startTime),Gt=Ue(xt+Xt,12),ft=wt,B++,qr(this,wt)}(isNaN(rt)||Rt<rt)&&(rt=Rt),(isNaN(Z)||Gt>Z)&&(Z=Gt),H===Le.TRANSFORM&&(at=B-Yt,vt=B)}if(!isNaN(at)){let P=0;ze(this,H=>{P>=at&&P<vt&&(H._renderTransforms=1,H._composition===dn.blend&&ze($r.animation,Q=>{Q.id===H.id&&(Q._renderTransforms=1)})),P++})}}c||console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation."),rt?(ze(this,N=>{N._startTime-N._delay||(N._delay-=rt),N._startTime-=rt}),Z-=rt):rt=0,Z||(Z=Te,this.iterationCount=0),this.targets=l,this.duration=Z===Te?Te:ff((Z+this._loopDelay)*this.iterationCount-this._loopDelay)||Te,this.onRender=w||T.onRender,this._ease=L,this._delay=rt,this.iterationDuration=Z,this._inlineStyles=Y,!this._autoplay&&et&&this.onRender(this)}stretch(t){let e=this.duration;if(e===Io(t))return this;let i=t/e;return ze(this,s=>{s._updateDuration=Io(s._updateDuration*i),s._changeDuration=Io(s._changeDuration*i),s._currentTime*=i,s._startTime*=i,s._absoluteStartTime*=i}),super.stretch(t)}refresh(){return ze(this,t=>{let e=Yr(t.target,t.property,t._tweenType);Yn(e,Dn),t._fromNumbers=fn(Dn.d),t._fromNumber=Dn.n,t._func&&(Yn(t._func(),re),t._toNumbers=fn(re.d),t._strings=fn(re.s),t._toNumber=re.n)}),this}revert(){return super.revert(),yf(this)}then(t){return super.then(t)}},Oo=(n,t)=>new lc(n,t,null,0,!1).init();var Z0=["x","y","z"],Y3=["perspective","width","height","margin","padding","top","right","bottom","left","borderWidth","fontSize","borderRadius",...Z0],q3=[...Z0,...hf.filter(n=>["X","Y","Z"].some(t=>n.endsWith(t)))],$3=li&&(oe(CSS)||!Object.hasOwnProperty.call(CSS,"registerProperty"));var C0={_head:null,_tail:null},Q1=(n,t,e)=>{let i=C0._head;for(;i;){let s=i._next,r=i.$el===n,o=!t||i.property===t,a=!e||i.parent===e;if(r&&o&&a){let l=i.animation;try{l.commitStyles()}catch{}l.cancel(),cs(C0,i);let c=i.parent;c&&(c._completed++,c.animations.length===c._completed&&(c.completed=!0,c.muteCallbacks||(c.paused=!0,c.onComplete(c),c._resolve(c))))}i=s}};var j1=(n=gn)=>new ac({duration:1*Fe.timeScale,onComplete:n},null,0).resume();function tT(n,t,e){let i=df(n);if(!i.length)return;let[s]=i,r=pf(s,t),o=xf(t,s,r),a=Yr(s,o);if(oe(e))return a;if(Yn(a,Dn),Dn.t===ae.NUMBER||Dn.t===ae.UNIT){if(e===!1)return Dn.n;{let l=$0(s,Dn,e,!1);return`${Ue(l.n,Fe.precision)}${l.u}`}}}var eT=(n,t)=>{if(!oe(t))return t.duration=Te,t.composition=sn(t.composition,dn.none),new lc(n,t,null,0,!0).resume()},R0=(n,t,e)=>{let i=!1;return ze(t,s=>{let r=s.target;if(n.includes(r)){let o=s.property,a=s._tweenType,l=xf(e,r,a);(!l||l&&l===o)&&(s.parent._tail===s&&s._tweenType===Le.TRANSFORM&&s._prev&&s._prev._tweenType===Le.TRANSFORM&&(s._prev._renderTransforms=1),cs(t,s),X0(s),i=!0)}},!0),i},K0=(n,t,e)=>{let i=G0(n),s=t||qe,r=t&&t.controlAnimation&&t;for(let a=0,l=i.length;a<l;a++){let c=i[a];Q1(c,e,r)}let o;if(s._hasChildren){let a=0;ze(s,l=>{if(!l._hasChildren)if(o=R0(i,l,e),o&&!l._head)l.cancel(),cs(s,l);else{let h=l._offset+l._delay+l.duration;h>a&&(a=h)}l._head?K0(n,l,e):l._hasChildren=!1},!0),oe(s.iterationDuration)||(s.iterationDuration=a)}else o=R0(i,s,e);return o&&!s._head&&(s._hasChildren=!1,s.cancel&&s.cancel()),i},_f=(n,t,e)=>{let i=10**(e||0);return Uo((Math.random()*(t-n+1/i)+n)*i)/i},nT=n=>n[_f(0,n.length-1)],iT=n=>{let t=n.length,e,i;for(;t;)i=_f(0,--t),e=n[t],n[t]=n[i],n[i]=e;return n},sT=(n,t)=>(+n).toFixed(t),rT=(n,t,e)=>`${n}`.padStart(t,e),oT=(n,t,e)=>`${n}`.padEnd(t,e),aT=(n,t,e)=>((n-t)%(e-t)+(e-t))%(e-t)+t,lT=(n,t,e,i,s)=>i+(n-t)/(e-t)*(s-i),cT=n=>n*Fo/180,hT=n=>n*180/Fo,uT=(n,t,e,i)=>{let s=Ns/Fe.defaults.frameRate;if(i!==!1){let o=i||qe._hasChildren&&qe;o&&o.deltaTime&&(s=o.deltaTime)}let r=1-Math.exp(-e*s*.1);return e?e===1?t:(1-r)*n+r*t:n},fT=(n,t=0)=>(...e)=>t?i=>n(...e,i):i=>n(i,...e),J0=n=>(...t)=>{let e=n(...t);return new Proxy(gn,{apply:(i,s,[r])=>e(r),get:(i,s)=>J0((...r)=>{let o=dT[s](...r);return a=>o(e(a))})})},Xn=(n,t=0)=>(...e)=>(e.length<n.length?J0(fT(n,t)):n)(...e),dT={$:df,get:tT,set:eT,remove:K0,cleanInlineStyles:yf,random:_f,randomPick:nT,shuffle:iT,lerp:uT,sync:j1,clamp:Xn(Ke),round:Xn(Ue),snap:Xn(C1),wrap:Xn(aT),interpolate:Xn(as,1),mapRange:Xn(lT),roundPad:Xn(sT),padStart:Xn(rT),padEnd:Xn(oT),degToRad:Xn(cT),radToDeg:Xn(hT)},pT=(n,t)=>{if(Us(t,"<")){let e=t[1]==="<",i=n._tail,s=i?i._offset+i._delay:0;return e?s:s+i.duration}},mT=(n,t)=>{let e=n.iterationDuration;if(e===Te&&(e=0),oe(t))return e;if(uf(+t))return+t;let i=t,s=n?n.labels:null,r=!tc(s),o=pT(n,i),a=!oe(o),l=v1.exec(i);if(l){let c=l[0],h=i.split(c),u=r&&h[0]?s[h[0]]:e,f=a?o:r?u:e,p=+h[1];return rf(f,p,c[0])}else return a?o:r?oe(s[i])?e:s[i]:e};var Q0=(n,t={})=>{let e=[],i=0,s=t.from,r=t.reversed,o=t.ease,a=!oe(o),c=a&&!oe(o.ease)?o.ease:a?lf(o):null,h=t.grid,u=t.axis,f=oe(s)||s===0||s==="first",p=s==="center",g=s==="last",y=Fs(n),m=Ls(y?n[0]:n),d=y?Ls(n[1]):0,w=L0.exec((y?n[1]:n)+ls),T=t.start||0+(y?m:0),v=f?0:uf(s)?s:0;return(L,I,R,D)=>{if(p&&(v=(R-1)/2),g&&(v=R-1),!e.length){for(let Y=0;Y<R;Y++){if(!h)e.push(Lo(v-Y));else{let $=p?(h[0]-1)/2:v%h[0],Z=p?(h[1]-1)/2:Uo(v/h[0]),rt=Y%h[0],B=Uo(Y/h[0]),et=$-rt,N=Z-B,F=k0(et*et+N*N);u==="x"&&(F=-et),u==="y"&&(F=-N),e.push(F)}i=A1(...e)}c&&(e=e.map(Y=>c(Y/i)*i)),r&&(e=e.map(Y=>u?Y<0?Y*-1:-Y:Lo(i-Y)))}let M=y?(d-m)/i:m,U=(D?mT(D,oe(t.start)?D.iterationDuration:T):T)+(M*Ue(e[I],2)||0);return t.modifier&&(U=t.modifier(U)),w&&(U=`${U}${w[2]}`),U}};var gT=matchMedia("(prefers-reduced-motion: reduce)").matches;function j0(n,t){let e=n.getContext("2d"),i=0,s=0,r=Math.min(devicePixelRatio,2);function o(){let N=n.getBoundingClientRect();i=N.width,s=N.height,n.width=i*r,n.height=s*r,e.setTransform(r,0,0,r,0,0)}o(),new ResizeObserver(o).observe(n);let a="#2A2A2F",l="#6E6D68",c="#A6A49E",h="#FF6369",u="#8E2E32",f={idle:{x:.14,y:.5,label:"idle"},drive:{x:.34,y:.5,label:"driving"},human:{x:.52,y:.26,label:"human detected"},zone:{x:.7,y:.26,label:"slow zone"},exit:{x:.7,y:.74,label:"zone exit"}},p={start:{x:.24,y:.5,label:"start"},detect:{x:.43,y:.4,label:"detect human"},clear:{x:.61,y:.26,label:"zone clearance"},resume:{x:.61,y:.62,label:"resume speed"},complete:{x:.86,y:.62,label:"mission complete"},dev:{x:.52,y:.74,label:"clearance skipped",dev:!0}};function g(N){return{x:N.x*i,y:N.y*s}}let y=[["idle","T:start",null,700],["T:start","drive",null,700],["drive","T:detect",{cy:-.1},650],["T:detect","human",null,650],["human","T:clear",null,550],["T:clear","zone",null,550],["zone","T:resume",{cx:.79},650],["T:resume","exit",null,650],["exit","T:complete",{cy:.82},800],["T:complete","idle",{cy:1.02},900]],m=[["drive","T:dev",{cy:.68},600],["T:dev","exit",null,600]],d={};function w(){e.clearRect(0,0,i,s),e.fillStyle="#141416";for(let F=24;F<i;F+=44)for(let J=24;J<s;J+=44)e.fillRect(F,J,1.4,1.4);let N=[["idle","T:start",null,a],["T:start","drive",null,a],["drive","T:detect",{cy:-.1},a],["T:detect","human",null,a],["human","T:clear",null,a],["T:clear","zone",null,a],["zone","T:resume",{cx:.79},a],["T:resume","exit",null,a],["exit","T:complete",{cy:.82},a],["T:complete","idle",{cy:1.02},a],["drive","T:dev",{cy:.68},u],["T:dev","exit",null,u]];for(let[F,J,K,at]of N){let vt=g(v(F)),P=g(v(J)),H,Q;K&&K.cy!=null?(H=(vt.x+P.x)/2,Q=K.cy*s):K&&K.cx!=null?(H=K.cx*i,Q=(vt.y+P.y)/2):(H=(vt.x+P.x)/2,Q=(vt.y+P.y)/2),e.strokeStyle=at,e.lineWidth=1,e.setLineDash(at===u?[4,5]:[]),e.beginPath(),e.moveTo(vt.x,vt.y),e.quadraticCurveTo(H,Q,P.x,P.y),e.stroke(),e.setLineDash([])}e.font='10px "IBM Plex Mono", monospace';for(let[F,J]of Object.entries(p)){let K=g(J),at=d[F]||0,vt=J.dev?u:a;e.fillStyle=at>0?`rgba(255,99,105,${.25+at*.7})`:"#17171A",e.strokeStyle=J.dev?u:"#3A3A40",T(K.x,K.y,5,16),e.fillStyle="#17171A",at>0&&(e.save(),e.shadowColor=h,e.shadowBlur=14*at,T(K.x,K.y,5,16),e.restore()),e.fillStyle=J.dev?"#7a4a4c":l,e.textAlign="center",e.fillText(J.label.toUpperCase(),K.x,K.y+30)}for(let[F,J]of Object.entries(f)){let K=g(J),at=d[F]||0;e.beginPath(),e.arc(K.x,K.y,17,0,Math.PI*2),e.fillStyle="#0E0E10",e.fill(),e.strokeStyle=at>0?`rgba(255,99,105,${.5+at*.5})`:"#3A3A40",e.lineWidth=1.2,e.stroke(),at>0&&(e.save(),e.strokeStyle=`rgba(255,99,105,${.35*at})`,e.lineWidth=2,e.beginPath(),e.arc(K.x,K.y,17+8*(1-at),0,Math.PI*2),e.stroke(),e.restore()),e.fillStyle=l,e.textAlign="center",e.fillText(J.label.toUpperCase(),K.x,K.y+34)}}function T(N,F,J,K){e.beginPath(),e.roundRect(N-J,F-K,J*2,K*2,2),e.fill(),e.stroke()}let v=N=>N.startsWith("T:")?p[N.slice(2)]:f[N.slice(0)],L={x:0,y:0,dev:!1,visible:!1};function I(N,F,J,K){let at=g(N),vt=g(F),P,H;J&&J.cy!=null?(P=(at.x+vt.x)/2,H=J.cy*s):J&&J.cx!=null?(P=J.cx*i,H=(at.y+vt.y)/2):(P=(at.x+vt.x)/2,H=(at.y+vt.y)/2);let Q=1-K;return{x:Q*Q*at.x+2*Q*K*P+K*K*vt.x,y:Q*Q*at.y+2*Q*K*H+K*K*vt.y}}function R(N){d[N]=1,Oo(d,{[N]:0},{duration:700,ease:"outQuad"})}let D=412,M=["14:02:11","14:02:47","14:03:29"];function S(){let N=document.createElement("div");N.className="deviation-chip";let F=D++,J=M[F%M.length];for(N.innerHTML=`<span class="dot"></span>sealed event #${F}: zone clearance skipped \xB7 ${J}`,t.appendChild(N),Oo(N,{opacity:[0,1],translateY:[-8,0],duration:420,ease:"outQuad"});t.children.length>3;)t.firstChild.remove()}let U=0,Y=!1;function $(N,F){let J=0;function K(){if(Y)return;if(J>=N.length){F();return}let[at,vt,P,H]=N[J];R((at.startsWith("T:"),at)),at.startsWith("T:")&&R(at);let Q=performance.now();L.visible=!0,L.dev=vt==="exit"&&at==="T:dev",L.dev=N===m;function j(pt){if(Y)return;let _t=Math.min(1,(pt-Q)/H),ft=1-Math.pow(1-_t,2.2),Rt=I(v(at),v(vt),P,ft);L.x=Rt.x,L.y=Rt.y,_t<1?requestAnimationFrame(j):(R(vt),J++,L.dev&&vt==="exit"&&S(),setTimeout(K,260))}requestAnimationFrame(j)}K()}function Z(){L.visible&&(e.beginPath(),e.arc(L.x,L.y,5,0,Math.PI*2),e.fillStyle=L.dev?h:"#EDECE8",e.shadowColor=L.dev?h:"rgba(240,240,235,0.8)",e.shadowBlur=10,e.fill(),e.shadowBlur=0)}function rt(){U++;let N=U%3===0,F=N?m:y;if(N){let J=y.slice(0,2),K=y.slice(7);$(J,()=>{$(m,()=>{$(K,()=>setTimeout(rt,900))})})}else $(y,()=>setTimeout(rt,900))}let B=!0;new IntersectionObserver(([N])=>{B=N.isIntersecting},{threshold:.05}).observe(n);function et(){w(),Z(),requestAnimationFrame(et)}if(gT){w();return}requestAnimationFrame(et),(function N(){B&&!document.hidden?rt():setTimeout(N,300)})()}var tg=[{time:"13:58:02",payload:"agent v0.9.3 online, fleet B"},{time:"13:59:10",payload:"config speed_limit zone_B = 1.2 m/s"},{time:"14:01:58",payload:"intervention: operator r.rossi raised speed_limit zone_B to 1.8 m/s (remote)"},{time:"14:02:09",payload:"safety: protective stop near human, aisle 7"},{time:"14:02:10",payload:"state: velocity reached 0.0 m/s in 0.4 s"},{time:"14:04:33",payload:"mission: resumed mission 217"},{time:"14:31:02",payload:"config speed_limit zone_B restored 1.2 m/s"},{time:"14:31:05",payload:"upload: bundle sealed, Merkle root 9f3c41"}],xT="intervention: system auto-tuned speed_limit zone_B to 1.8 m/s",yT=2,_T=5;async function eg(n){let t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return[...new Uint8Array(t)].map(e=>e.toString(16).padStart(2,"0")).join("")}async function ng(){let n=document.getElementById("event-log"),t=document.getElementById("status-dot"),e=document.getElementById("status-text"),i=document.getElementById("sealed-panel"),s=document.getElementById("btn-edit"),r=document.getElementById("btn-delete"),o=document.getElementById("btn-restore"),a=document.getElementById("btn-verify"),l=[],c="genesis";for(let w of tg)c=await eg(c+w.payload),l.push(c);let h=!1,u=!1,f=[];function p(){f.length=0,tg.forEach((w,T)=>{f.push({seq:T+1,time:w.time,payload:u&&T===yT?xT:w.payload,deleted:h&&T===_T,sealedHash:l[T]})})}function g(){p(),n.innerHTML="",f.forEach((w,T)=>{let v=document.createElement("li");v.className="event-row"+(w.deleted?" deleted":""),v.innerHTML=`
        <span class="ev-seq">${String(w.seq).padStart(2,"0")}</span>
        <span class="ev-time">${w.time}</span>
        <span class="ev-payload">${w.deleted?"[missing event: sequence break]":y(w.payload)}</span>
        <span class="ev-hash">${w.sealedHash.slice(0,12)}</span>`,n.appendChild(v)})}let y=w=>w.replace(/[<>&]/g,T=>({"<":"&lt;",">":"&gt;","&":"&amp;"})[T]);async function m(){let w="genesis",T=!1,v=[...n.children];for(let L=0;L<f.length;L++){let I=f[L],R=v[L];if(I.deleted){T=!0,R.classList.add("bad");continue}if(T){R.classList.remove("ok"),R.classList.add("bad");continue}let D=await eg(w+I.payload);D===I.sealedHash?(R.classList.add("ok"),w=D):(T=!0,R.classList.add("bad"))}T?(t.classList.add("broken"),e.textContent="Verification fails at the exact gap: the chain is broken",i.hidden=!1):(t.classList.remove("broken"),e.textContent="Chain intact - 8 events sealed",i.hidden=!0)}function d(){Oo(".event-row",{opacity:[0,1],translateX:[-14,0],duration:480,delay:Q0(55),ease:"outQuad"})}s.addEventListener("click",()=>{u=!u,s.textContent=u?"Undo edit 03":"Edit event 03",g(),m()}),r.addEventListener("click",()=>{h=!h,r.textContent=h?"Restore event 06":"Delete event 06",g(),m()}),o.addEventListener("click",()=>{u=!1,h=!1,s.textContent="Edit event 03",r.textContent="Delete event 06",g(),m()}),a.addEventListener("click",m),g(),d(),await m()}function ig(n,t,e){let i=document.createElement("canvas");i.id="explode-canvas",i.setAttribute("aria-hidden","true"),t&&t.parentNode?t.replaceWith(i):n.querySelector(".pipeline-sticky").prepend(i);let s=i.getContext("2d"),r=matchMedia("(prefers-reduced-motion: reduce)").matches,o="229,72,77",a=0,l=0,c=Math.min(devicePixelRatio||1,2),h=100,u=0,f=0;function p(){let B=i.getBoundingClientRect();a=B.width,l=B.height,i.width=Math.round(a*c),i.height=Math.round(l*c),s.setTransform(c,0,0,c,0,0),h=Math.min(a*.185,l*.115,148),u=a*.5,f=l*.7}p(),new ResizeObserver(p).observe(i);let g=0,y=0,m=0;function d(B,et,N){return[(B-N)*.866*h+u,((B+N)*.5-et)*h+f]}function w(B,et,N,F,J){J!==void 0&&(s.globalAlpha=J),s.beginPath(),s.moveTo(B[0][0],B[0][1]);for(let K=1;K<B.length;K++)s.lineTo(B[K][0],B[K][1]);s.closePath(),et&&(s.fillStyle=et,s.fill()),N&&(s.save(),F&&(s.shadowColor=`rgba(${o},0.9)`,s.shadowBlur=F),s.strokeStyle=N,s.lineWidth=1.4,s.stroke(),s.restore()),s.globalAlpha=1}function T(B,et,N,F,J,K,at,vt){let P=B-F/2,H=B+F/2,Q=N-K/2,j=N+K/2,pt=et,_t=et+J;w([d(P,_t,Q),d(H,_t,Q),d(H,_t,j),d(P,_t,j)],at.top,at.stroke,at.glow,vt),w([d(H,pt,Q),d(H,pt,j),d(H,_t,j),d(H,_t,Q)],at.right,at.stroke,0,vt),w([d(P,pt,j),d(H,pt,j),d(H,_t,j),d(P,_t,j)],at.front,at.stroke,0,vt)}function v(B,et,N,F,J,K,at,vt){vt!==void 0&&(s.globalAlpha=vt);let[P,H]=d(B,et,N);s.beginPath(),s.ellipse(P,H,F*1.2247*h,F*.7071*h,0,0,Math.PI*2),J&&(s.fillStyle=J,s.fill()),K&&(s.save(),at&&(s.shadowColor=`rgba(${o},0.9)`,s.shadowBlur=at),s.strokeStyle=K,s.lineWidth=1.4,s.stroke(),s.restore()),s.globalAlpha=1}let L=[3.1,1.9,1.05,.45,0];function I(B,et,N){return et+L[B]*N}let R=[...e.querySelectorAll(".chip")],D=[...n.querySelectorAll(".step")],M=-1;function S(B){B===M||B<0||(M=B,D.forEach(et=>et.classList.toggle("active",+et.dataset.layer===B)),R.forEach(et=>et.classList.toggle("active",+et.dataset.layer===B)))}if(r)S(1);else{let B=new IntersectionObserver(et=>{for(let N of et)N.isIntersecting&&S(+N.target.dataset.layer)},{rootMargin:matchMedia("(max-width: 900px)").matches?"-70% 0px -22% 0px":"-42% 0px -42% 0px"});D.forEach(et=>B.observe(et))}function U(B,et,N){let F=M<0||M===B?1:.2,J=(B%2===0?-1:1)*N*.3,K=I(B,et,N),at=`rgba(${o},${.9*F})`,vt=F;if(B===4)T(J,K,0,2.5,.55,1.9,{top:"#2c2f37",right:"#1a1c22",front:"#14161b",stroke:at,glow:6},vt),v(J-.6,K+.56,0,.55,`rgba(120,124,138,${.55*F})`,`rgba(255,255,255,${.12*F})`,0,vt),v(J+.6,K+.56,0,.55,null,`rgba(${o},${.6*F})`,10,vt);else if(B===3)T(J,K,0,1.5,.26,1.1,{top:"#23262d",right:"#171920",front:"#121419",stroke:at,glow:5},vt),T(J,K+.26,0,.4,.09,.4,{top:`rgba(20,22,27,${F})`,right:"#0e1013",front:"#0a0c0f",stroke:`rgba(160,130,70,${.5*F})`},vt);else if(B===2){T(J,K,0,2,.34,1.3,{top:"#2a2c34",right:"#191b21",front:"#121419",stroke:at,glow:6},vt);for(let P=0;P<5;P++){let H=J-.68+P*.34;T(H,K+.34,0,.24,.24,.24,{top:`rgba(30,33,40,${F})`,right:"#14161b",front:"#0f1115",stroke:`rgba(255,99,105,${.85*F})`,glow:8},vt)}}else if(B===1){T(J,K,0,2.25,.18,1.65,{top:"#30333b",right:"#1d1f25",front:"#16181d",stroke:at,glow:5},vt);for(let P=0;P<6;P++)v(J-.85+P*.34,K+.2,.4,.05,`rgba(140,144,158,${.6*F})`,null,0,vt)}else{T(J,K,0,1.15,.34,1.15,{top:"#262932",right:"#171920",front:"#121419",stroke:at,glow:6},vt),v(J,K+.35,0,.17,`rgba(229,72,77,${.95*F})`,`rgba(255,170,173,${.9*F})`,18*F,vt);let[P,H]=d(J,K+.35,0),Q=s.createRadialGradient(P,H,0,P,H,h*.7);Q.addColorStop(0,`rgba(255,99,105,${.4*F})`),Q.addColorStop(1,"rgba(255,99,105,0)"),s.fillStyle=Q,s.fillRect(P-h,H-h,h*2,h*2)}}function Y(){s.save(),s.strokeStyle="rgba(150,152,166,0.1)",s.lineWidth=1;for(let B=-5;B<=5;B++){let et=d(B,-.6,-5),N=d(B,-.6,5);s.beginPath(),s.moveTo(et[0],et[1]),s.lineTo(N[0],N[1]),s.stroke();let F=d(-5,-.6,B),J=d(5,-.6,B);s.beginPath(),s.moveTo(F[0],F[1]),s.lineTo(J[0],J[1]),s.stroke()}s.restore()}function $(){s.clearRect(0,0,a,l),Y();let B=[1.62,1.32,.98,.62,0];for(let et of[4,3,2,1,0])U(et,B[et],r?.3:y)}let Z=!0;new IntersectionObserver(([B])=>{Z=B.isIntersecting},{threshold:.02}).observe(i);function rt(){g+=.016;let B=n.getBoundingClientRect(),et=B.height-innerHeight;m=et>0?Math.min(1,Math.max(0,-B.top/et)):0,y+=(m-y)*.1;let N=r?.3:y*y*(3-2*y);s.clearRect(0,0,a,l),Y();let F=[1.62,1.32,.98,.62,0];for(let J of[4,3,2,1,0])U(J,F[J],N)}if(r)$();else{let B=()=>{Z&&!document.hidden&&rt(),requestAnimationFrame(B)};requestAnimationFrame(B)}}var fc=matchMedia("(prefers-reduced-motion: reduce)").matches;function vT(){setTimeout(()=>{document.querySelectorAll(".hero h1, .hero-sub, .hero-ctas").forEach(n=>{parseFloat(getComputedStyle(n).opacity)<.99&&(n.style.animation="none",n.style.opacity="1",n.style.transform="none")})},1600)}function ST(){fc||qc(Hc("#progress",{scaleX:[0,1],ease:"linear"}))}function MT(){if(fc)return;let n=[...document.querySelectorAll(".clause, .ledger-row, .tier, .stat, .fact, .quote-card, .demo-shell, .section-h")],t=new Set,e=i=>{t.has(i)||(t.add(i),i.style.transition="opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",i.style.opacity="1",i.style.transform="translateY(0)")};n.forEach(i=>{i.style.opacity="0",i.style.transform="translateY(24px)",$c(i,()=>e(i),{amount:.25})}),setTimeout(()=>n.forEach(e),3200)}function bT(){let n=document.querySelectorAll("[data-count]"),t=i=>{let s=+i.dataset.count,r=i.dataset.prefix||"",o=i.dataset.suffix||"%";if(fc){i.textContent=r+s+o;return}let a=performance.now(),l=1400;function c(h){let u=Math.min(1,(h-a)/l),f=1-Math.pow(1-u,3);i.textContent=r+Math.round(s*f)+o,u<1&&requestAnimationFrame(c)}requestAnimationFrame(c)},e=new IntersectionObserver(i=>{i.forEach(s=>{s.isIntersecting&&(t(s.target),e.unobserve(s.target))})},{threshold:.6});n.forEach(i=>e.observe(i))}var TT=new Date("2027-01-20T00:00:00+01:00").getTime();function uc(n){return String(n).padStart(2,"0")}function wT(){let n=document.getElementById("count-days"),t=document.getElementById("count-clock"),e=document.getElementById("cta-count");function i(){let s=Math.max(0,TT-Date.now()),r=Math.floor(s/864e5),o=Math.floor(s/36e5)%24,a=Math.floor(s/6e4)%60,l=Math.floor(s/1e3)%60;n&&(n.textContent=r),t&&(t.textContent=`${uc(r)} : ${uc(o)} : ${uc(a)} : ${uc(l)}`),e&&(e.textContent=`${r} days to go`)}i(),setInterval(i,1e3)}function ET(){if(fc)return;document.querySelectorAll(".magnetic").forEach(t=>{let e=0,i=0,s=0,r=0,o=0,a=.18;function l(){i+=(r-i)*.18,s+=(o-s)*.18,t.style.transform=`translate(${i}px, ${s}px)`,e=requestAnimationFrame(l)}t.addEventListener("pointermove",c=>{let h=t.getBoundingClientRect();r=(c.clientX-(h.left+h.width/2))*a,o=(c.clientY-(h.top+h.height/2))*a,e||(e=requestAnimationFrame(l))}),t.addEventListener("pointerleave",()=>{r=0,o=0,setTimeout(()=>{Math.abs(i)<.4&&Math.abs(s)<.4&&(cancelAnimationFrame(e),e=0,t.style.transform="",i=s=0)},350)})})}var sg=!1,vf=null;function rg(n){if(!sg){sg=!0,console.warn("[sigillo] 2D renderer active:",n),document.documentElement.setAttribute("data-renderer","2d");try{vf&&vf.dispose()}catch{}try{ig(document.querySelector(".pipeline"),document.getElementById("explode-canvas"),document.getElementById("layer-chips"))}catch(t){console.error("[sigillo] fallback explode",t)}}}function AT(){ci("witness",()=>Fp(document.getElementById("hero-canvas")));let n=new URLSearchParams(location.search).get("renderer")==="2d";if(n||!CT()){n||console.warn("[sigillo] webgl unavailable"),rg(n?"forced by URL":"webgl unavailable");return}try{vf=g0(document.querySelector(".pipeline"),document.getElementById("explode-canvas"),document.getElementById("leader-lines"),document.getElementById("layer-chips")),document.documentElement.setAttribute("data-renderer","webgl")}catch(t){console.error("[sigillo] webgl init failed",t),rg("webgl init failed")}}function CT(){try{let n=document.createElement("canvas");return!!(n.getContext("webgl2")||n.getContext("webgl"))}catch{return!1}}function ci(n,t){try{t()}catch(e){console.error("[sigillo]",n,e)}}function og(){window.__sigilloBooted=!0,ci("progress",()=>ST()),ci("reveals",()=>MT()),ci("heroSafety",()=>vT()),ci("counters",()=>bT()),ci("countdown",()=>wT()),ci("magnetic",()=>ET()),ci("scenes",()=>AT()),ci("petri",()=>j0(document.getElementById("petri-canvas"),document.getElementById("deviation-feed"))),ci("tamper",()=>ng())}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",og):og();})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

animejs/lib/anime.esm.js:
  (**
   * anime.js - ESM
   * @version v4.0.2
   * @author Julian Garnier
   * @license MIT
   * @copyright (c) 2025 Julian Garnier
   * @see https://animejs.com
   *)
*/
