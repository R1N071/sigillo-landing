(()=>{function _s(n,t,e){var i;if(n instanceof Element)return[n];if(typeof n=="string"){let s=document;t&&(s=t.current);let r=(i=e?.[n])!==null&&i!==void 0?i:s.querySelectorAll(n);return r?Array.from(r):[]}return Array.from(n)}var Ne=n=>n;var ui=Ne,pn=Ne;var Tn=(n,t,e)=>{let i=t-n;return i===0?1:(e-n)/i};function ys(n){let t;return()=>(t===void 0&&(t=n()),t)}var Do=ys(()=>window.ScrollTimeline!==void 0);var Lo=class{constructor(t){this.stop=()=>this.runAll("stop"),this.animations=t.filter(Boolean)}get finished(){return Promise.all(this.animations.map(t=>"finished"in t?t.finished:t))}getAll(t){return this.animations[0][t]}setAll(t,e){for(let i=0;i<this.animations.length;i++)this.animations[i][t]=e}attachTimeline(t,e){let i=this.animations.map(s=>{if(Do()&&s.attachTimeline)return s.attachTimeline(t);if(typeof e=="function")return e(s)});return()=>{i.forEach((s,r)=>{s&&s(),this.animations[r].stop()})}}get time(){return this.getAll("time")}set time(t){this.setAll("time",t)}get speed(){return this.getAll("speed")}set speed(t){this.setAll("speed",t)}get startTime(){return this.getAll("startTime")}get duration(){let t=0;for(let e=0;e<this.animations.length;e++)t=Math.max(t,this.animations[e].duration);return t}runAll(t){this.animations.forEach(e=>e[t]())}flatten(){this.runAll("flatten")}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}};var vs=class extends Lo{then(t,e){return Promise.all(this.animations).then(t).catch(e)}};var Fe=n=>n*1e3,qe=n=>n/1e3;function Ms(n){let t=0,e=50,i=n.next(t);for(;!i.done&&t<2e4;)t+=e,i=n.next(t);return t>=2e4?1/0:t}var Uo=(n,t,e=10)=>{let i="",s=Math.max(Math.round(t/e),2);for(let r=0;r<s;r++)i+=n(Tn(0,s-1,r))+", ";return`linear(${i.substring(0,i.length-2)})`};var ke=(n,t,e)=>e>t?t:e<n?n:e;function Ss(n,t){return t?n*(1e3/t):0}var u0=5;function No(n,t,e){let i=Math.max(t-u0,0);return Ss(e-n(i),t-i)}var fe={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};var rc=.001;function Cd({duration:n=fe.duration,bounce:t=fe.bounce,velocity:e=fe.velocity,mass:i=fe.mass}){let s,r;ui(n<=Fe(fe.maxDuration),"Spring duration must be 10 seconds or less");let o=1-t;o=ke(fe.minDamping,fe.maxDamping,o),n=ke(fe.minDuration,fe.maxDuration,qe(n)),o<1?(s=c=>{let h=c*o,u=h*n,d=h-e,p=Fo(c,o),g=Math.exp(-u);return rc-d/p*g},r=c=>{let u=c*o*n,d=u*e+e,p=Math.pow(o,2)*Math.pow(c,2)*n,g=Math.exp(-u),x=Fo(Math.pow(c,2),o);return(-s(c)+rc>0?-1:1)*((d-p)*g)/x}):(s=c=>{let h=Math.exp(-c*n),u=(c-e)*n+1;return-rc+h*u},r=c=>{let h=Math.exp(-c*n),u=(e-c)*(n*n);return h*u});let a=5/n,l=f0(s,r,a);if(n=Fe(n),isNaN(l))return{stiffness:fe.stiffness,damping:fe.damping,duration:n};{let c=Math.pow(l,2)*i;return{stiffness:c,damping:o*2*Math.sqrt(i*c),duration:n}}}var d0=12;function f0(n,t,e){let i=e;for(let s=1;s<d0;s++)i=i-n(i)/t(i);return i}function Fo(n,t){return n*Math.sqrt(1-t*t)}var p0=["duration","bounce"],m0=["stiffness","damping","mass"];function Rd(n,t){return t.some(e=>n[e]!==void 0)}function g0(n){let t={velocity:fe.velocity,stiffness:fe.stiffness,damping:fe.damping,mass:fe.mass,isResolvedFromDuration:!1,...n};if(!Rd(n,m0)&&Rd(n,p0))if(n.visualDuration){let e=n.visualDuration,i=2*Math.PI/(e*1.2),s=i*i,r=2*ke(.05,1,1-(n.bounce||0))*Math.sqrt(s);t={...t,mass:fe.mass,stiffness:s,damping:r}}else{let e=Cd(n);t={...t,...e,mass:fe.mass},t.isResolvedFromDuration=!0}return t}function bs(n=fe.visualDuration,t=fe.bounce){let e=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:t}:n,{restSpeed:i,restDelta:s}=e,r=e.keyframes[0],o=e.keyframes[e.keyframes.length-1],a={done:!1,value:r},{stiffness:l,damping:c,mass:h,duration:u,velocity:d,isResolvedFromDuration:p}=g0({...e,velocity:-qe(e.velocity||0)}),g=d||0,x=c/(2*Math.sqrt(l*h)),m=o-r,f=qe(Math.sqrt(l/h)),b=Math.abs(m)<5;i||(i=b?fe.restSpeed.granular:fe.restSpeed.default),s||(s=b?fe.restDelta.granular:fe.restDelta.default);let S;if(x<1){let w=Fo(f,x);S=E=>{let C=Math.exp(-x*f*E);return o-C*((g+x*f*m)/w*Math.sin(w*E)+m*Math.cos(w*E))}}else if(x===1)S=w=>o-Math.exp(-f*w)*(m+(g+f*m)*w);else{let w=f*Math.sqrt(x*x-1);S=E=>{let C=Math.exp(-x*f*E),I=Math.min(w*E,300);return o-C*((g+x*f*m)*Math.sinh(I)+w*m*Math.cosh(I))/w}}let _={calculatedDuration:p&&u||null,next:w=>{let E=S(w);if(p)a.done=w>=u;else{let C=0;x<1&&(C=w===0?Fe(g):No(S,w,E));let I=Math.abs(C)<=i,M=Math.abs(o-E)<=s;a.done=I&&M}return a.value=a.done?o:E,a},toString:()=>{let w=Math.min(Ms(_),2e4),E=Uo(C=>_.next(w*C).value,w,30);return w+"ms "+E}};return _}function Pd(n,t=100,e){let i=e({...n,keyframes:[0,t]}),s=Math.min(Ms(i),2e4);return{type:"keyframes",ease:r=>i.next(s*r).value/t,duration:qe(s)}}function di(n){return typeof n=="function"}var Id=(n,t,e)=>{let i=t-n;return((e-n)%i+i)%i+n};var Oo=n=>Array.isArray(n)&&typeof n[0]!="number";function Bo(n,t){return Oo(n)?n[Id(0,n.length,t)]:n}var En=(n,t,e)=>n+(t-n)*e;function Vo(n,t){let e=n[n.length-1];for(let i=1;i<=t;i++){let s=Tn(0,t,i);n.push(En(e,1,s))}}function Ts(n){let t=[0];return Vo(t,n.length-1),t}var pe=n=>!!(n&&n.getVelocity);function zr(n){return typeof n=="object"&&!Array.isArray(n)}function zo(n,t,e,i){return typeof n=="string"&&zr(t)?_s(n,e,i):n instanceof NodeList?Array.from(n):Array.isArray(n)?n:[n]}function Dd(n,t,e){return n*(t+1)}function ac(n,t,e,i){var s;return typeof t=="number"?t:t.startsWith("-")||t.startsWith("+")?Math.max(0,n+parseFloat(t)):t==="<"?e:(s=i.get(t))!==null&&s!==void 0?s:n}function Ld(n,t){n.indexOf(t)===-1&&n.push(t)}function ko(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function x0(n,t,e){for(let i=0;i<n.length;i++){let s=n[i];s.at>t&&s.at<e&&(ko(n,s),i--)}}function Ud(n,t,e,i,s,r){x0(n,s,r);for(let o=0;o<t.length;o++)n.push({value:t[o],at:En(s,r,i[o]),easing:Bo(e,o)})}function Nd(n,t){for(let e=0;e<n.length;e++)n[e]=n[e]/(t+1)}function Fd(n,t){return n.at===t.at?n.value===null?1:t.value===null?-1:0:n.at-t.at}var _0="easeInOut",y0=20;function Vd(n,{defaultTransition:t={},...e}={},i,s){let r=t.duration||.3,o=new Map,a=new Map,l={},c=new Map,h=0,u=0,d=0;for(let p=0;p<n.length;p++){let g=n[p];if(typeof g=="string"){c.set(g,u);continue}else if(!Array.isArray(g)){c.set(g.name,ac(u,g.at,h,c));continue}let[x,m,f={}]=g;f.at!==void 0&&(u=ac(u,f.at,h,c));let b=0,S=(_,w,E,C=0,I=0)=>{let M=v0(_),{delay:v=0,times:D=Ts(M),type:k="keyframes",repeat:W,repeatType:Z,repeatDelay:B=0,...P}=w,{ease:H=t.ease||"easeOut",duration:R}=w,L=typeof v=="function"?v(C,I):v,U=M.length,X=di(k)?k:s?.[k];if(U<=2&&X){let Y=100;if(U===2&&b0(M)){let ut=M[1]-M[0];Y=Math.abs(ut)}let tt={...P};R!==void 0&&(tt.duration=Fe(R));let it=Pd(tt,Y,X);H=it.ease,R=it.duration}R??(R=r);let j=u+L;D.length===1&&D[0]===0&&(D[1]=1);let ot=D.length-M.length;if(ot>0&&Vo(D,ot),M.length===1&&M.unshift(null),W){pn(W<y0,"Repeat count too high, must be less than 20"),R=Dd(R,W);let Y=[...M],tt=[...D];H=Array.isArray(H)?[...H]:[H];let it=[...H];for(let ut=0;ut<W;ut++){M.push(...Y);for(let ht=0;ht<Y.length;ht++)D.push(tt[ht]+(ut+1)),H.push(ht===0?"linear":Bo(it,ht-1))}Nd(D,W)}let V=j+R;Ud(E,M,H,D,j,V),b=Math.max(L+R,b),d=Math.max(V,d)};if(pe(x)){let _=Od(x,a);S(m,f,Bd("default",_))}else{let _=zo(x,m,i,l),w=_.length;for(let E=0;E<w;E++){m=m,f=f;let C=_[E],I=Od(C,a);for(let M in m)S(m[M],M0(f,M),Bd(M,I),E,w)}}h=u,u+=b}return a.forEach((p,g)=>{for(let x in p){let m=p[x];m.sort(Fd);let f=[],b=[],S=[];for(let w=0;w<m.length;w++){let{at:E,value:C,easing:I}=m[w];f.push(C),b.push(Tn(0,d,E)),S.push(I||"easeOut")}b[0]!==0&&(b.unshift(0),f.unshift(f[0]),S.unshift(_0)),b[b.length-1]!==1&&(b.push(1),f.push(null)),o.has(g)||o.set(g,{keyframes:{},transition:{}});let _=o.get(g);_.keyframes[x]=f,_.transition[x]={...t,duration:d,ease:S,times:b,...e}}}),o}function Od(n,t){return!t.has(n)&&t.set(n,{}),t.get(n)}function Bd(n,t){return t[n]||(t[n]=[]),t[n]}function v0(n){return Array.isArray(n)?n:[n]}function M0(n,t){return n&&n[t]?{...n,...n[t]}:{...n}}var S0=n=>typeof n=="number",b0=n=>n.every(S0);var Hn=new WeakMap;function Ho(n,t){return n?n[t]||n.default||n:void 0}var wn=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],sn=new Set(wn);var Go=new Set(["width","height","top","left","right","bottom",...wn]);var zd=n=>Array.isArray(n);var kd=n=>zd(n)?n[n.length-1]||0:n;var Es={skipAnimations:!1,useManualTiming:!1};function Hd(n){let t=new Set,e=new Set,i=!1,s=!1,r=new WeakSet,o={delta:0,timestamp:0,isProcessing:!1};function a(c){r.has(c)&&(l.schedule(c),n()),c(o)}let l={schedule:(c,h=!1,u=!1)=>{let p=u&&i?t:e;return h&&r.add(c),p.has(c)||p.add(c),c},cancel:c=>{e.delete(c),r.delete(c)},process:c=>{if(o=c,i){s=!0;return}i=!0,[t,e]=[e,t],t.forEach(a),t.clear(),i=!1,s&&(s=!1,l.process(c))}};return l}var Wo=["read","resolveKeyframes","update","preRender","render","postRender"],T0=40;function Gd(n,t){let e=!1,i=!0,s={delta:0,timestamp:0,isProcessing:!1},r=()=>e=!0,o=Wo.reduce((f,b)=>(f[b]=Hd(r),f),{}),{read:a,resolveKeyframes:l,update:c,preRender:h,render:u,postRender:d}=o,p=()=>{let f=Es.useManualTiming?s.timestamp:performance.now();e=!1,s.delta=i?1e3/60:Math.max(Math.min(f-s.timestamp,T0),1),s.timestamp=f,s.isProcessing=!0,a.process(s),l.process(s),c.process(s),h.process(s),u.process(s),d.process(s),s.isProcessing=!1,e&&t&&(i=!1,n(p))},g=()=>{e=!0,i=!0,s.isProcessing||n(p)};return{schedule:Wo.reduce((f,b)=>{let S=o[b];return f[b]=(_,w=!1,E=!1)=>(e||g(),S.schedule(_,w,E)),f},{}),cancel:f=>{for(let b=0;b<Wo.length;b++)o[Wo[b]].cancel(f)},state:s,steps:o}}var{schedule:ve,cancel:Gn,state:fi,steps:YE}=Gd(typeof requestAnimationFrame<"u"?requestAnimationFrame:Ne,!0);var Xo;function E0(){Xo=void 0}var rn={now:()=>(Xo===void 0&&rn.set(fi.isProcessing||Es.useManualTiming?fi.timestamp:performance.now()),Xo),set:n=>{Xo=n,queueMicrotask(E0)}};var ws=class{constructor(){this.subscriptions=[]}add(t){return Ld(this.subscriptions,t),()=>ko(this.subscriptions,t)}notify(t,e,i){let s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](t,e,i);else for(let r=0;r<s;r++){let o=this.subscriptions[r];o&&o(t,e,i)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}};var Wd=30,w0=n=>!isNaN(parseFloat(n)),Xd={current:void 0},lc=class{constructor(t,e={}){this.version="12.0.0",this.canTrackVelocity=null,this.events={},this.updateAndNotify=(i,s=!0)=>{let r=rn.now();this.updatedAt!==r&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(i),this.current!==this.prev&&this.events.change&&this.events.change.notify(this.current),s&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.hasAnimated=!1,this.setCurrent(t),this.owner=e.owner}setCurrent(t){this.current=t,this.updatedAt=rn.now(),this.canTrackVelocity===null&&t!==void 0&&(this.canTrackVelocity=w0(this.current))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return this.on("change",t)}on(t,e){this.events[t]||(this.events[t]=new ws);let i=this.events[t].add(e);return t==="change"?()=>{i(),ve.read(()=>{this.events.change.getSize()||this.stop()})}:i}clearListeners(){for(let t in this.events)this.events[t].clear()}attach(t,e){this.passiveEffect=t,this.stopPassiveEffect=e}set(t,e=!0){!e||!this.passiveEffect?this.updateAndNotify(t,e):this.passiveEffect(t,this.updateAndNotify)}setWithVelocity(t,e,i){this.set(e),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-i}jump(t,e=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,e&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return Xd.current&&Xd.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){let t=rn.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||t-this.updatedAt>Wd)return 0;let e=Math.min(this.updatedAt-this.prevUpdatedAt,Wd);return Ss(parseFloat(this.current)-parseFloat(this.prevFrameValue),e)}start(t){return this.stop(),new Promise(e=>{this.hasAnimated=!0,this.animation=t(e),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}};function Wn(n,t){return new lc(n,t)}function Yd(n){let t=[{},{}];return n?.values.forEach((e,i)=>{t[0][i]=e.get(),t[1][i]=e.getVelocity()}),t}function Yo(n,t,e,i){if(typeof t=="function"){let[s,r]=Yd(i);t=t(e!==void 0?e:n.custom,s,r)}if(typeof t=="string"&&(t=n.variants&&n.variants[t]),typeof t=="function"){let[s,r]=Yd(i);t=t(e!==void 0?e:n.custom,s,r)}return t}function qd(n,t,e){let i=n.getProps();return Yo(i,t,e!==void 0?e:i.custom,n)}function A0(n,t,e){n.hasValue(t)?n.getValue(t).set(e):n.addValue(t,Wn(e))}function $d(n,t){let e=qd(n,t),{transitionEnd:i={},transition:s={},...r}=e||{};r={...r,...i};for(let o in r){let a=kd(r[o]);A0(n,o,a)}}function Zd(n){return!!(pe(n)&&n.add)}function Kd(n,t){let e=n.getValue("willChange");if(Zd(e))return e.add(t)}var As=n=>n.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase();var C0="framerAppearId",Jd="data-"+As(C0);function Qd(n){return n.props[Jd]}var qo={current:!1};function cc(n,t){n.timeline=t,n.onfinish=null}var kr=n=>Array.isArray(n)&&typeof n[0]=="number";var jd={linearEasing:void 0};function tf(n,t){let e=ys(n);return()=>{var i;return(i=jd[t])!==null&&i!==void 0?i:e()}}var Cs=tf(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing");function uc(n){return!!(typeof n=="function"&&Cs()||!n||typeof n=="string"&&(n in hc||Cs())||kr(n)||Array.isArray(n)&&n.every(uc))}var Hr=([n,t,e,i])=>`cubic-bezier(${n}, ${t}, ${e}, ${i})`,hc={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Hr([0,.65,.55,1]),circOut:Hr([.55,0,1,.45]),backIn:Hr([.31,.01,.66,-.59]),backOut:Hr([.33,1.53,.69,.99])};function dc(n,t){if(n)return typeof n=="function"&&Cs()?Uo(n,t):kr(n)?Hr(n):Array.isArray(n)?n.map(e=>dc(e,t)||hc.easeOut):hc[n]}var ef=(n,t,e)=>(((1-3*e+3*t)*n+(3*e-6*t))*n+3*t)*n,R0=1e-7,P0=12;function I0(n,t,e,i,s){let r,o,a=0;do o=t+(e-t)/2,r=ef(o,i,s)-n,r>0?e=o:t=o;while(Math.abs(r)>R0&&++a<P0);return o}function pi(n,t,e,i){if(n===t&&e===i)return Ne;let s=r=>I0(r,0,1,n,e);return r=>r===0||r===1?r:ef(s(r),t,i)}var $o=n=>t=>t<=.5?n(2*t)/2:(2-n(2*(1-t)))/2;var Zo=n=>t=>1-n(1-t);var fc=pi(.33,1.53,.69,.99),Gr=Zo(fc),Ko=$o(Gr);var Jo=n=>(n*=2)<1?.5*Gr(n):.5*(2-Math.pow(2,-10*(n-1)));var Qo=n=>1-Math.sin(Math.acos(n)),nf=Zo(Qo),jo=$o(Qo);var ta=n=>/^0[^.\s]+$/u.test(n);function sf(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||ta(n):!0}var An={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},Xn={...An,transform:n=>ke(0,1,n)},Wr={...An,default:1};var mi=n=>Math.round(n*1e5)/1e5;var Rs=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function rf(n){return n==null}var of=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;var Ps=(n,t)=>e=>!!(typeof e=="string"&&of.test(e)&&e.startsWith(n)||t&&!rf(e)&&Object.prototype.hasOwnProperty.call(e,t)),ea=(n,t,e)=>i=>{if(typeof i!="string")return i;let[s,r,o,a]=i.match(Rs);return{[n]:parseFloat(s),[t]:parseFloat(r),[e]:parseFloat(o),alpha:a!==void 0?parseFloat(a):1}};var D0=n=>ke(0,255,n),pc={...An,transform:n=>Math.round(D0(n))},Cn={test:Ps("rgb","red"),parse:ea("red","green","blue"),transform:({red:n,green:t,blue:e,alpha:i=1})=>"rgba("+pc.transform(n)+", "+pc.transform(t)+", "+pc.transform(e)+", "+mi(Xn.transform(i))+")"};function L0(n){let t="",e="",i="",s="";return n.length>5?(t=n.substring(1,3),e=n.substring(3,5),i=n.substring(5,7),s=n.substring(7,9)):(t=n.substring(1,2),e=n.substring(2,3),i=n.substring(3,4),s=n.substring(4,5),t+=t,e+=e,i+=i,s+=s),{red:parseInt(t,16),green:parseInt(e,16),blue:parseInt(i,16),alpha:s?parseInt(s,16)/255:1}}var Xr={test:Ps("#"),parse:L0,transform:Cn.transform};var Yr=n=>({test:t=>typeof t=="string"&&t.endsWith(n)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${n}`}),Rn=Yr("deg"),gi=Yr("%"),Ft=Yr("px"),af=Yr("vh"),lf=Yr("vw"),mc={...gi,parse:n=>gi.parse(n)/100,transform:n=>gi.transform(n*100)};var xi={test:Ps("hsl","hue"),parse:ea("hue","saturation","lightness"),transform:({hue:n,saturation:t,lightness:e,alpha:i=1})=>"hsla("+Math.round(n)+", "+gi.transform(mi(t))+", "+gi.transform(mi(e))+", "+mi(Xn.transform(i))+")"};var be={test:n=>Cn.test(n)||Xr.test(n)||xi.test(n),parse:n=>Cn.test(n)?Cn.parse(n):xi.test(n)?xi.parse(n):Xr.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?Cn.transform(n):xi.transform(n)};var cf=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function U0(n){var t,e;return isNaN(n)&&typeof n=="string"&&(((t=n.match(Rs))===null||t===void 0?void 0:t.length)||0)+(((e=n.match(cf))===null||e===void 0?void 0:e.length)||0)>0}var uf="number",df="color",N0="var",F0="var(",hf="${}",O0=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function ki(n){let t=n.toString(),e=[],i={color:[],number:[],var:[]},s=[],r=0,a=t.replace(O0,l=>(be.test(l)?(i.color.push(r),s.push(df),e.push(be.parse(l))):l.startsWith(F0)?(i.var.push(r),s.push(N0),e.push(l)):(i.number.push(r),s.push(uf),e.push(parseFloat(l))),++r,hf)).split(hf);return{values:e,split:a,indexes:i,types:s}}function ff(n){return ki(n).values}function pf(n){let{split:t,types:e}=ki(n),i=t.length;return s=>{let r="";for(let o=0;o<i;o++)if(r+=t[o],s[o]!==void 0){let a=e[o];a===uf?r+=mi(s[o]):a===df?r+=be.transform(s[o]):r+=s[o]}return r}}var B0=n=>typeof n=="number"?0:n;function V0(n){let t=ff(n);return pf(n)(t.map(B0))}var on={test:U0,parse:ff,createTransformer:pf,getAnimatableNone:V0};var z0=new Set(["brightness","contrast","saturate","opacity"]);function k0(n){let[t,e]=n.slice(0,-1).split("(");if(t==="drop-shadow")return n;let[i]=e.match(Rs)||[];if(!i)return n;let s=e.replace(i,""),r=z0.has(t)?1:0;return i!==e&&(r*=100),t+"("+r+s+")"}var H0=/\b([a-z-]*)\(.*?\)/gu,qr={...on,getAnimatableNone:n=>{let t=n.match(H0);return t?t.map(k0).join(" "):n}};var mf={borderWidth:Ft,borderTopWidth:Ft,borderRightWidth:Ft,borderBottomWidth:Ft,borderLeftWidth:Ft,borderRadius:Ft,radius:Ft,borderTopLeftRadius:Ft,borderTopRightRadius:Ft,borderBottomRightRadius:Ft,borderBottomLeftRadius:Ft,width:Ft,maxWidth:Ft,height:Ft,maxHeight:Ft,top:Ft,right:Ft,bottom:Ft,left:Ft,padding:Ft,paddingTop:Ft,paddingRight:Ft,paddingBottom:Ft,paddingLeft:Ft,margin:Ft,marginTop:Ft,marginRight:Ft,marginBottom:Ft,marginLeft:Ft,backgroundPositionX:Ft,backgroundPositionY:Ft};var gf={rotate:Rn,rotateX:Rn,rotateY:Rn,rotateZ:Rn,scale:Wr,scaleX:Wr,scaleY:Wr,scaleZ:Wr,skew:Rn,skewX:Rn,skewY:Rn,distance:Ft,translateX:Ft,translateY:Ft,translateZ:Ft,x:Ft,y:Ft,z:Ft,perspective:Ft,transformPerspective:Ft,opacity:Xn,originX:mc,originY:mc,originZ:Ft};var gc={...An,transform:Math.round};var Is={...mf,...gf,zIndex:gc,size:Ft,fillOpacity:Xn,strokeOpacity:Xn,numOctaves:gc};var G0={...Is,color:be,backgroundColor:be,outlineColor:be,fill:be,stroke:be,borderColor:be,borderTopColor:be,borderRightColor:be,borderBottomColor:be,borderLeftColor:be,filter:qr,WebkitFilter:qr},Ds=n=>G0[n];function na(n,t){let e=Ds(n);return e!==qr&&(e=on),e.getAnimatableNone?e.getAnimatableNone(t):void 0}var W0=new Set(["auto","none","0"]);function xf(n,t,e){let i=0,s;for(;i<n.length&&!s;){let r=n[i];typeof r=="string"&&!W0.has(r)&&ki(r).values.length&&(s=n[i]),i++}if(s&&e)for(let r of t)n[r]=na(e,s)}var xc=n=>n===An||n===Ft,_f=(n,t)=>parseFloat(n.split(", ")[t]),yf=(n,t)=>(e,{transform:i})=>{if(i==="none"||!i)return 0;let s=i.match(/^matrix3d\((.+)\)$/u);if(s)return _f(s[1],t);{let r=i.match(/^matrix\((.+)\)$/u);return r?_f(r[1],n):0}},X0=new Set(["x","y","z"]),Y0=wn.filter(n=>!X0.has(n));function vf(n){let t=[];return Y0.forEach(e=>{let i=n.getValue(e);i!==void 0&&(t.push([e,i.get()]),i.set(e.startsWith("scale")?1:0))}),t}var Hi={width:({x:n},{paddingLeft:t="0",paddingRight:e="0"})=>n.max-n.min-parseFloat(t)-parseFloat(e),height:({y:n},{paddingTop:t="0",paddingBottom:e="0"})=>n.max-n.min-parseFloat(t)-parseFloat(e),top:(n,{top:t})=>parseFloat(t),left:(n,{left:t})=>parseFloat(t),bottom:({y:n},{top:t})=>parseFloat(t)+(n.max-n.min),right:({x:n},{left:t})=>parseFloat(t)+(n.max-n.min),x:yf(4,13),y:yf(5,14)};Hi.translateX=Hi.x;Hi.translateY=Hi.y;var Gi=new Set,_c=!1,yc=!1;function Mf(){if(yc){let n=Array.from(Gi).filter(i=>i.needsMeasurement),t=new Set(n.map(i=>i.element)),e=new Map;t.forEach(i=>{let s=vf(i);s.length&&(e.set(i,s),i.render())}),n.forEach(i=>i.measureInitialState()),t.forEach(i=>{i.render();let s=e.get(i);s&&s.forEach(([r,o])=>{var a;(a=i.getValue(r))===null||a===void 0||a.set(o)})}),n.forEach(i=>i.measureEndState()),n.forEach(i=>{i.suspendedScrollY!==void 0&&window.scrollTo(0,i.suspendedScrollY)})}yc=!1,_c=!1,Gi.forEach(n=>n.complete()),Gi.clear()}function Sf(){Gi.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(yc=!0)})}function bf(){Sf(),Mf()}var _i=class{constructor(t,e,i,s,r,o=!1){this.isComplete=!1,this.isAsync=!1,this.needsMeasurement=!1,this.isScheduled=!1,this.unresolvedKeyframes=[...t],this.onComplete=e,this.name=i,this.motionValue=s,this.element=r,this.isAsync=o}scheduleResolve(){this.isScheduled=!0,this.isAsync?(Gi.add(this),_c||(_c=!0,ve.read(Sf),ve.resolveKeyframes(Mf))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:t,name:e,element:i,motionValue:s}=this;for(let r=0;r<t.length;r++)if(t[r]===null)if(r===0){let o=s?.get(),a=t[t.length-1];if(o!==void 0)t[0]=o;else if(i&&e){let l=i.readValue(e,a);l!=null&&(t[0]=l)}t[0]===void 0&&(t[0]=a),s&&o===void 0&&s.set(t[0])}else t[r]=t[r-1]}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(){this.isComplete=!0,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe),Gi.delete(this)}cancel(){this.isComplete||(this.isScheduled=!1,Gi.delete(this))}resume(){this.isComplete||this.scheduleResolve()}};var ia=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);var Tf=n=>t=>typeof t=="string"&&t.startsWith(n),sa=Tf("--"),q0=Tf("var(--"),Ls=n=>q0(n)?$0.test(n.split("/*")[0].trim()):!1,$0=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;var Z0=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function K0(n){let t=Z0.exec(n);if(!t)return[,];let[,e,i,s]=t;return[`--${e??i}`,s]}var J0=4;function vc(n,t,e=1){pn(e<=J0,`Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`);let[i,s]=K0(n);if(!i)return;let r=window.getComputedStyle(t).getPropertyValue(i);if(r){let o=r.trim();return ia(o)?parseFloat(o):o}return Ls(s)?vc(s,t,e+1):s}var ra=n=>t=>t.test(n);var Ef={test:n=>n==="auto",parse:n=>n};var Mc=[An,Ft,gi,Rn,lf,af,Ef],Sc=n=>Mc.find(ra(n));var Us=class extends _i{constructor(t,e,i,s,r){super(t,e,i,s,r,!0)}readKeyframes(){let{unresolvedKeyframes:t,element:e,name:i}=this;if(!e||!e.current)return;super.readKeyframes();for(let l=0;l<t.length;l++){let c=t[l];if(typeof c=="string"&&(c=c.trim(),Ls(c))){let h=vc(c,e.current);h!==void 0&&(t[l]=h),l===t.length-1&&(this.finalKeyframe=c)}}if(this.resolveNoneKeyframes(),!Go.has(i)||t.length!==2)return;let[s,r]=t,o=Sc(s),a=Sc(r);if(o!==a)if(xc(o)&&xc(a))for(let l=0;l<t.length;l++){let c=t[l];typeof c=="string"&&(t[l]=parseFloat(c))}else this.needsMeasurement=!0}resolveNoneKeyframes(){let{unresolvedKeyframes:t,name:e}=this,i=[];for(let s=0;s<t.length;s++)sf(t[s])&&i.push(s);i.length&&xf(t,i,e)}measureInitialState(){let{element:t,unresolvedKeyframes:e,name:i}=this;if(!t||!t.current)return;i==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Hi[i](t.measureViewportBox(),window.getComputedStyle(t.current)),e[0]=this.measuredOrigin;let s=e[e.length-1];s!==void 0&&t.getValue(i,s).jump(s,!1)}measureEndState(){var t;let{element:e,name:i,unresolvedKeyframes:s}=this;if(!e||!e.current)return;let r=e.getValue(i);r&&r.jump(this.measuredOrigin,!1);let o=s.length-1,a=s[o];s[o]=Hi[i](e.measureViewportBox(),window.getComputedStyle(e.current)),a!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=a),!((t=this.removedTransforms)===null||t===void 0)&&t.length&&this.removedTransforms.forEach(([l,c])=>{e.getValue(l).set(c)}),this.resolveNoneKeyframes()}};var bc=(n,t)=>t==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(on.test(n)||n==="0")&&!n.startsWith("url("));function Q0(n){let t=n[0];if(n.length===1)return!0;for(let e=0;e<n.length;e++)if(n[e]!==t)return!0}function wf(n,t,e,i){let s=n[0];if(s===null)return!1;if(t==="display"||t==="visibility")return!0;let r=n[n.length-1],o=bc(s,t),a=bc(r,t);return ui(o===a,`You are trying to animate ${t} from "${s}" to "${r}". ${s} is not an animatable value - to enable this animation set ${s} to a value animatable to ${r} via the \`style\` property.`),!o||!a?!1:Q0(n)||(e==="spring"||di(e))&&i}var j0=n=>n!==null;function yi(n,{repeat:t,repeatType:e="loop"},i){let s=n.filter(j0),r=t&&e!=="loop"&&t%2===1?0:s.length-1;return!r||i===void 0?s[r]:i}var tx=40,Ns=class{constructor({autoplay:t=!0,delay:e=0,type:i="keyframes",repeat:s=0,repeatDelay:r=0,repeatType:o="loop",...a}){this.isStopped=!1,this.hasAttemptedResolve=!1,this.createdAt=rn.now(),this.options={autoplay:t,delay:e,type:i,repeat:s,repeatDelay:r,repeatType:o,...a},this.updateFinishedPromise()}calcStartTime(){return this.resolvedAt?this.resolvedAt-this.createdAt>tx?this.resolvedAt:this.createdAt:this.createdAt}get resolved(){return!this._resolved&&!this.hasAttemptedResolve&&bf(),this._resolved}onKeyframesResolved(t,e){this.resolvedAt=rn.now(),this.hasAttemptedResolve=!0;let{name:i,type:s,velocity:r,delay:o,onComplete:a,onUpdate:l,isGenerator:c}=this.options;if(!c&&!wf(t,i,s,r))if(qo.current||!o){l&&l(yi(t,this.options,e)),a&&a(),this.resolveFinishedPromise();return}else this.options.duration=0;let h=this.initPlayback(t,e);h!==!1&&(this._resolved={keyframes:t,finalKeyframe:e,...h},this.onPostResolved())}onPostResolved(){}then(t,e){return this.currentFinishedPromise.then(t,e)}flatten(){this.options.type="keyframes",this.options.ease="linear"}updateFinishedPromise(){this.currentFinishedPromise=new Promise(t=>{this.resolveFinishedPromise=t})}};function Tc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*(2/3-e)*6:n}function Af({hue:n,saturation:t,lightness:e,alpha:i}){n/=360,t/=100,e/=100;let s=0,r=0,o=0;if(!t)s=r=o=e;else{let a=e<.5?e*(1+t):e+t-e*t,l=2*e-a;s=Tc(l,a,n+1/3),r=Tc(l,a,n),o=Tc(l,a,n-1/3)}return{red:Math.round(s*255),green:Math.round(r*255),blue:Math.round(o*255),alpha:i}}function Fs(n,t){return e=>e>0?t:n}var Ec=(n,t,e)=>{let i=n*n,s=e*(t*t-i)+i;return s<0?0:Math.sqrt(s)},ex=[Xr,Cn,xi],nx=n=>ex.find(t=>t.test(n));function Cf(n){let t=nx(n);if(ui(!!t,`'${n}' is not an animatable color. Use the equivalent color code instead.`),!t)return!1;let e=t.parse(n);return t===xi&&(e=Af(e)),e}var wc=(n,t)=>{let e=Cf(n),i=Cf(t);if(!e||!i)return Fs(n,t);let s={...e};return r=>(s.red=Ec(e.red,i.red,r),s.green=Ec(e.green,i.green,r),s.blue=Ec(e.blue,i.blue,r),s.alpha=En(e.alpha,i.alpha,r),Cn.transform(s))};var ix=(n,t)=>e=>t(n(e)),Os=(...n)=>n.reduce(ix);var oa=new Set(["none","hidden"]);function Rf(n,t){return oa.has(n)?e=>e<=0?n:t:e=>e>=1?t:n}function sx(n,t){return e=>En(n,t,e)}function aa(n){return typeof n=="number"?sx:typeof n=="string"?Ls(n)?Fs:be.test(n)?wc:ax:Array.isArray(n)?Pf:typeof n=="object"?be.test(n)?wc:rx:Fs}function Pf(n,t){let e=[...n],i=e.length,s=n.map((r,o)=>aa(r)(r,t[o]));return r=>{for(let o=0;o<i;o++)e[o]=s[o](r);return e}}function rx(n,t){let e={...n,...t},i={};for(let s in e)n[s]!==void 0&&t[s]!==void 0&&(i[s]=aa(n[s])(n[s],t[s]));return s=>{for(let r in i)e[r]=i[r](s);return e}}function ox(n,t){var e;let i=[],s={color:0,var:0,number:0};for(let r=0;r<t.values.length;r++){let o=t.types[r],a=n.indexes[o][s[o]],l=(e=n.values[a])!==null&&e!==void 0?e:0;i[r]=l,s[o]++}return i}var ax=(n,t)=>{let e=on.createTransformer(t),i=ki(n),s=ki(t);return i.indexes.var.length===s.indexes.var.length&&i.indexes.color.length===s.indexes.color.length&&i.indexes.number.length>=s.indexes.number.length?oa.has(n)&&!s.values.length||oa.has(t)&&!i.values.length?Rf(n,t):Os(Pf(ox(i,s),s.values),e):(ui(!0,`Complex values '${n}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`),Fs(n,t))};function la(n,t,e){return typeof n=="number"&&typeof t=="number"&&typeof e=="number"?En(n,t,e):aa(n)(n,t)}function Ac({keyframes:n,velocity:t=0,power:e=.8,timeConstant:i=325,bounceDamping:s=10,bounceStiffness:r=500,modifyTarget:o,min:a,max:l,restDelta:c=.5,restSpeed:h}){let u=n[0],d={done:!1,value:u},p=I=>a!==void 0&&I<a||l!==void 0&&I>l,g=I=>a===void 0?l:l===void 0||Math.abs(a-I)<Math.abs(l-I)?a:l,x=e*t,m=u+x,f=o===void 0?m:o(m);f!==m&&(x=f-u);let b=I=>-x*Math.exp(-I/i),S=I=>f+b(I),_=I=>{let M=b(I),v=S(I);d.done=Math.abs(M)<=c,d.value=d.done?f:v},w,E,C=I=>{p(d.value)&&(w=I,E=bs({keyframes:[d.value,g(d.value)],velocity:No(S,I,d.value),damping:s,stiffness:r,restDelta:c,restSpeed:h}))};return C(0),{calculatedDuration:null,next:I=>{let M=!1;return!E&&w===void 0&&(M=!0,_(I),C(I)),w!==void 0&&I>=w?E.next(I-w):(!M&&_(I),d)}}}var If=pi(.42,0,1,1),Df=pi(0,0,.58,1),ca=pi(.42,0,.58,1);var Lf={linear:Ne,easeIn:If,easeInOut:ca,easeOut:Df,circIn:Qo,circInOut:jo,circOut:nf,backIn:Gr,backInOut:Ko,backOut:fc,anticipate:Jo},Cc=n=>{if(kr(n)){pn(n.length===4,"Cubic bezier arrays must contain four numerical values.");let[t,e,i,s]=n;return pi(t,e,i,s)}else if(typeof n=="string")return pn(Lf[n]!==void 0,`Invalid easing type '${n}'`),Lf[n];return n};function lx(n,t,e){let i=[],s=e||la,r=n.length-1;for(let o=0;o<r;o++){let a=s(n[o],n[o+1]);if(t){let l=Array.isArray(t)?t[o]||Ne:t;a=Os(l,a)}i.push(a)}return i}function ha(n,t,{clamp:e=!0,ease:i,mixer:s}={}){let r=n.length;if(pn(r===t.length,"Both input and output ranges must be the same length"),r===1)return()=>t[0];if(r===2&&t[0]===t[1])return()=>t[1];let o=n[0]===n[1];n[0]>n[r-1]&&(n=[...n].reverse(),t=[...t].reverse());let a=lx(t,i,s),l=a.length,c=h=>{if(o&&h<n[0])return t[0];let u=0;if(l>1)for(;u<n.length-2&&!(h<n[u+1]);u++);let d=Tn(n[u],n[u+1],h);return a[u](d)};return e?h=>c(ke(n[0],n[r-1],h)):c}function Uf(n,t){return n.map(e=>e*t)}function cx(n,t){return n.map(()=>t||ca).splice(0,n.length-1)}function $r({duration:n=300,keyframes:t,times:e,ease:i="easeInOut"}){let s=Oo(i)?i.map(Cc):Cc(i),r={done:!1,value:t[0]},o=Uf(e&&e.length===t.length?e:Ts(t),n),a=ha(o,t,{ease:Array.isArray(s)?s:cx(t,s)});return{calculatedDuration:n,next:l=>(r.value=a(l),r.done=l>=n,r)}}var Nf=n=>{let t=({timestamp:e})=>n(e);return{start:()=>ve.update(t,!0),stop:()=>Gn(t),now:()=>fi.isProcessing?fi.timestamp:rn.now()}};var hx={decay:Ac,inertia:Ac,tween:$r,keyframes:$r,spring:bs},ux=n=>n/100,Wi=class extends Ns{constructor(t){super(t),this.holdTime=null,this.cancelTime=null,this.currentTime=0,this.playbackSpeed=1,this.pendingPlayState="running",this.startTime=null,this.state="idle",this.stop=()=>{if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.teardown();let{onStop:l}=this.options;l&&l()};let{name:e,motionValue:i,element:s,keyframes:r}=this.options,o=s?.KeyframeResolver||_i,a=(l,c)=>this.onKeyframesResolved(l,c);this.resolver=new o(r,a,e,i,s),this.resolver.scheduleResolve()}flatten(){super.flatten(),this._resolved&&Object.assign(this._resolved,this.initPlayback(this._resolved.keyframes))}initPlayback(t){let{type:e="keyframes",repeat:i=0,repeatDelay:s=0,repeatType:r,velocity:o=0}=this.options,a=di(e)?e:hx[e]||$r,l,c;a!==$r&&typeof t[0]!="number"&&(l=Os(ux,la(t[0],t[1])),t=[0,100]);let h=a({...this.options,keyframes:t});r==="mirror"&&(c=a({...this.options,keyframes:[...t].reverse(),velocity:-o})),h.calculatedDuration===null&&(h.calculatedDuration=Ms(h));let{calculatedDuration:u}=h,d=u+s,p=d*(i+1)-s;return{generator:h,mirroredGenerator:c,mapPercentToKeyframes:l,calculatedDuration:u,resolvedDuration:d,totalDuration:p}}onPostResolved(){let{autoplay:t=!0}=this.options;this.play(),this.pendingPlayState==="paused"||!t?this.pause():this.state=this.pendingPlayState}tick(t,e=!1){let{resolved:i}=this;if(!i){let{keyframes:I}=this.options;return{done:!0,value:I[I.length-1]}}let{finalKeyframe:s,generator:r,mirroredGenerator:o,mapPercentToKeyframes:a,keyframes:l,calculatedDuration:c,totalDuration:h,resolvedDuration:u}=i;if(this.startTime===null)return r.next(0);let{delay:d,repeat:p,repeatType:g,repeatDelay:x,onUpdate:m}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-h/this.speed,this.startTime)),e?this.currentTime=t:this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=Math.round(t-this.startTime)*this.speed;let f=this.currentTime-d*(this.speed>=0?1:-1),b=this.speed>=0?f<0:f>h;this.currentTime=Math.max(f,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=h);let S=this.currentTime,_=r;if(p){let I=Math.min(this.currentTime,h)/u,M=Math.floor(I),v=I%1;!v&&I>=1&&(v=1),v===1&&M--,M=Math.min(M,p+1),M%2&&(g==="reverse"?(v=1-v,x&&(v-=x/u)):g==="mirror"&&(_=o)),S=ke(0,1,v)*u}let w=b?{done:!1,value:l[0]}:_.next(S);a&&(w.value=a(w.value));let{done:E}=w;!b&&c!==null&&(E=this.speed>=0?this.currentTime>=h:this.currentTime<=0);let C=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&E);return C&&s!==void 0&&(w.value=yi(l,this.options,s)),m&&m(w.value),C&&this.finish(),w}get duration(){let{resolved:t}=this;return t?qe(t.calculatedDuration):0}get time(){return qe(this.currentTime)}set time(t){t=Fe(t),this.currentTime=t,this.holdTime!==null||this.speed===0?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.speed)}get speed(){return this.playbackSpeed}set speed(t){let e=this.playbackSpeed!==t;this.playbackSpeed=t,e&&(this.time=qe(this.currentTime))}play(){if(this.resolver.isScheduled||this.resolver.resume(),!this._resolved){this.pendingPlayState="running";return}if(this.isStopped)return;let{driver:t=Nf,onPlay:e,startTime:i}=this.options;this.driver||(this.driver=t(r=>this.tick(r))),e&&e();let s=this.driver.now();this.holdTime!==null?this.startTime=s-this.holdTime:this.startTime?this.state==="finished"&&(this.startTime=s):this.startTime=i??this.calcStartTime(),this.state==="finished"&&this.updateFinishedPromise(),this.cancelTime=this.startTime,this.holdTime=null,this.state="running",this.driver.start()}pause(){var t;if(!this._resolved){this.pendingPlayState="paused";return}this.state="paused",this.holdTime=(t=this.currentTime)!==null&&t!==void 0?t:0}complete(){this.state!=="running"&&this.play(),this.pendingPlayState=this.state="finished",this.holdTime=null}finish(){this.teardown(),this.state="finished";let{onComplete:t}=this.options;t&&t()}cancel(){this.cancelTime!==null&&this.tick(this.cancelTime),this.teardown(),this.updateFinishedPromise()}teardown(){this.state="idle",this.stopDriver(),this.resolveFinishedPromise(),this.updateFinishedPromise(),this.startTime=this.cancelTime=null,this.resolver.cancel()}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}};var Ff=new Set(["opacity","clipPath","filter","transform"]);function Of(n,t,e,{delay:i=0,duration:s=300,repeat:r=0,repeatType:o="loop",ease:a="easeInOut",times:l}={}){let c={[t]:e};l&&(c.offset=l);let h=dc(a,s);return Array.isArray(h)&&(c.easing=h),n.animate(c,{delay:i,duration:s,easing:Array.isArray(h)?"linear":h,fill:"both",iterations:r+1,direction:o==="reverse"?"alternate":"normal"})}var Bf=ys(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));var ua=10,dx=2e4;function fx(n){return di(n.type)||n.type==="spring"||!uc(n.ease)}function px(n,t){let e=new Wi({...t,keyframes:n,repeat:0,delay:0,isGenerator:!0}),i={done:!1,value:n[0]},s=[],r=0;for(;!i.done&&r<dx;)i=e.sample(r),s.push(i.value),r+=ua;return{times:void 0,keyframes:s,duration:r-ua,ease:"linear"}}var Vf={anticipate:Jo,backInOut:Ko,circInOut:jo};function mx(n){return n in Vf}var Zr=class extends Ns{constructor(t){super(t);let{name:e,motionValue:i,element:s,keyframes:r}=this.options;this.resolver=new Us(r,(o,a)=>this.onKeyframesResolved(o,a),e,i,s),this.resolver.scheduleResolve()}initPlayback(t,e){let{duration:i=300,times:s,ease:r,type:o,motionValue:a,name:l,startTime:c}=this.options;if(!a.owner||!a.owner.current)return!1;if(typeof r=="string"&&Cs()&&mx(r)&&(r=Vf[r]),fx(this.options)){let{onComplete:u,onUpdate:d,motionValue:p,element:g,...x}=this.options,m=px(t,x);t=m.keyframes,t.length===1&&(t[1]=t[0]),i=m.duration,s=m.times,r=m.ease,o="keyframes"}let h=Of(a.owner.current,l,t,{...this.options,duration:i,times:s,ease:r});return h.startTime=c??this.calcStartTime(),this.pendingTimeline?(cc(h,this.pendingTimeline),this.pendingTimeline=void 0):h.onfinish=()=>{let{onComplete:u}=this.options;a.set(yi(t,this.options,e)),u&&u(),this.cancel(),this.resolveFinishedPromise()},{animation:h,duration:i,times:s,type:o,ease:r,keyframes:t}}get duration(){let{resolved:t}=this;if(!t)return 0;let{duration:e}=t;return qe(e)}get time(){let{resolved:t}=this;if(!t)return 0;let{animation:e}=t;return qe(e.currentTime||0)}set time(t){let{resolved:e}=this;if(!e)return;let{animation:i}=e;i.currentTime=Fe(t)}get speed(){let{resolved:t}=this;if(!t)return 1;let{animation:e}=t;return e.playbackRate}set speed(t){let{resolved:e}=this;if(!e)return;let{animation:i}=e;i.playbackRate=t}get state(){let{resolved:t}=this;if(!t)return"idle";let{animation:e}=t;return e.playState}get startTime(){let{resolved:t}=this;if(!t)return null;let{animation:e}=t;return e.startTime}attachTimeline(t){if(!this._resolved)this.pendingTimeline=t;else{let{resolved:e}=this;if(!e)return Ne;let{animation:i}=e;cc(i,t)}return Ne}play(){if(this.isStopped)return;let{resolved:t}=this;if(!t)return;let{animation:e}=t;e.playState==="finished"&&this.updateFinishedPromise(),e.play()}pause(){let{resolved:t}=this;if(!t)return;let{animation:e}=t;e.pause()}stop(){if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.resolveFinishedPromise(),this.updateFinishedPromise();let{resolved:t}=this;if(!t)return;let{animation:e,keyframes:i,duration:s,type:r,ease:o,times:a}=t;if(e.playState==="idle"||e.playState==="finished")return;if(this.time){let{motionValue:c,onUpdate:h,onComplete:u,element:d,...p}=this.options,g=new Wi({...p,keyframes:i,duration:s,type:r,ease:o,times:a,isGenerator:!0}),x=Fe(this.time);c.setWithVelocity(g.sample(x-ua).value,g.sample(x).value,ua)}let{onStop:l}=this.options;l&&l(),this.cancel()}complete(){let{resolved:t}=this;t&&t.animation.finish()}cancel(){let{resolved:t}=this;t&&t.animation.cancel()}static supports(t){let{motionValue:e,name:i,repeatDelay:s,repeatType:r,damping:o,type:a}=t;if(!e||!e.owner||!(e.owner.current instanceof HTMLElement))return!1;let{onUpdate:l,transformTemplate:c}=e.owner.getProps();return Bf()&&i&&Ff.has(i)&&!l&&!c&&!s&&r!=="mirror"&&o!==0&&a!=="inertia"}};var gx={type:"spring",stiffness:500,damping:25,restSpeed:10},xx=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),_x={type:"keyframes",duration:.8},yx={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},zf=(n,{keyframes:t})=>t.length>2?_x:sn.has(n)?n.startsWith("scale")?xx(t[1]):gx:yx;function kf({when:n,delay:t,delayChildren:e,staggerChildren:i,staggerDirection:s,repeat:r,repeatType:o,repeatDelay:a,from:l,elapsed:c,...h}){return!!Object.keys(h).length}var da=(n,t,e,i={},s,r)=>o=>{let a=Ho(i,n)||{},l=a.delay||i.delay||0,{elapsed:c=0}=i;c=c-Fe(l);let h={keyframes:Array.isArray(e)?e:[null,e],ease:"easeOut",velocity:t.getVelocity(),...a,delay:-c,onUpdate:d=>{t.set(d),a.onUpdate&&a.onUpdate(d)},onComplete:()=>{o(),a.onComplete&&a.onComplete()},name:n,motionValue:t,element:r?void 0:s};kf(a)||(h={...h,...zf(n,h)}),h.duration&&(h.duration=Fe(h.duration)),h.repeatDelay&&(h.repeatDelay=Fe(h.repeatDelay)),h.from!==void 0&&(h.keyframes[0]=h.from);let u=!1;if((h.type===!1||h.duration===0&&!h.repeatDelay)&&(h.duration=0,h.delay===0&&(u=!0)),(qo.current||Es.skipAnimations)&&(u=!0,h.duration=0,h.delay=0),u&&!r&&t.get()!==void 0){let d=yi(h.keyframes,a);if(d!==void 0)return ve.update(()=>{h.onUpdate(d),h.onComplete()}),new vs([])}return!r&&Zr.supports(h)?new Zr(h):new Wi(h)};function vx({protectedKeys:n,needsAnimating:t},e){let i=n.hasOwnProperty(e)&&t[e]!==!0;return t[e]=!1,i}function Hf(n,t,{delay:e=0,transitionOverride:i,type:s}={}){var r;let{transition:o=n.getDefaultTransition(),transitionEnd:a,...l}=t;i&&(o=i);let c=[],h=s&&n.animationState&&n.animationState.getState()[s];for(let u in l){let d=n.getValue(u,(r=n.latestValues[u])!==null&&r!==void 0?r:null),p=l[u];if(p===void 0||h&&vx(h,u))continue;let g={delay:e,...Ho(o||{},u)},x=!1;if(window.MotionHandoffAnimation){let f=Qd(n);if(f){let b=window.MotionHandoffAnimation(f,u,ve);b!==null&&(g.startTime=b,x=!0)}}Kd(n,u),d.start(da(u,d,p,n.shouldReduceMotion&&Go.has(u)?{type:!1}:g,n,x));let m=d.animation;m&&c.push(m)}return a&&Promise.all(c).then(()=>{ve.update(()=>{a&&$d(n,a)})}),c}function Gf(n){return n instanceof SVGElement&&n.tagName!=="svg"}var Wf=()=>({min:0,max:0}),Bs=()=>({x:Wf(),y:Wf()});var Xf={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},fa={};for(let n in Xf)fa[n]={isEnabled:t=>Xf[n].some(e=>!!t[e])};var Yf=typeof window<"u";var Kr={current:null},pa={current:!1};function qf(){if(pa.current=!0,!!Yf)if(window.matchMedia){let n=window.matchMedia("(prefers-reduced-motion)"),t=()=>Kr.current=n.matches;n.addListener(t),t()}else Kr.current=!1}var Mx=[...Mc,be,on],$f=n=>Mx.find(ra(n));function Zf(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function Kf(n){return typeof n=="string"||Array.isArray(n)}var Sx=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Jf=["initial",...Sx];function Rc(n){return Zf(n.animate)||Jf.some(t=>Kf(n[t]))}function Qf(n){return!!(Rc(n)||n.variants)}function jf(n,t,e){for(let i in t){let s=t[i],r=e[i];if(pe(s))n.addValue(i,s);else if(pe(r))n.addValue(i,Wn(s,{owner:n}));else if(r!==s)if(n.hasValue(i)){let o=n.getValue(i);o.liveStyle===!0?o.jump(s):o.hasAnimated||o.set(s)}else{let o=n.getStaticValue(i);n.addValue(i,Wn(o!==void 0?o:s,{owner:n}))}}for(let i in e)t[i]===void 0&&n.removeValue(i);return t}var tp=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],Vs=class{scrapeMotionValuesFromProps(t,e,i){return{}}constructor({parent:t,props:e,presenceContext:i,reducedMotionConfig:s,blockInitialAnimation:r,visualState:o},a={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=_i,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let p=rn.now();this.renderScheduledAt<p&&(this.renderScheduledAt=p,ve.render(this.render,!1,!0))};let{latestValues:l,renderState:c,onUpdate:h}=o;this.onUpdate=h,this.latestValues=l,this.baseTarget={...l},this.initialValues=e.initial?{...l}:{},this.renderState=c,this.parent=t,this.props=e,this.presenceContext=i,this.depth=t?t.depth+1:0,this.reducedMotionConfig=s,this.options=a,this.blockInitialAnimation=!!r,this.isControllingVariants=Rc(e),this.isVariantNode=Qf(e),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);let{willChange:u,...d}=this.scrapeMotionValuesFromProps(e,{},this);for(let p in d){let g=d[p];l[p]!==void 0&&pe(g)&&g.set(l[p],!1)}}mount(t){this.current=t,Hn.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((e,i)=>this.bindToMotionValue(i,e)),pa.current||qf(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:Kr.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){Hn.delete(this.current),this.projection&&this.projection.unmount(),Gn(this.notifyUpdate),Gn(this.render),this.valueSubscriptions.forEach(t=>t()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(let t in this.events)this.events[t].clear();for(let t in this.features){let e=this.features[t];e&&(e.unmount(),e.isMounted=!1)}this.current=null}bindToMotionValue(t,e){this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)();let i=sn.has(t),s=e.on("change",a=>{this.latestValues[t]=a,this.props.onUpdate&&ve.preRender(this.notifyUpdate),i&&this.projection&&(this.projection.isTransformDirty=!0)}),r=e.on("renderRequest",this.scheduleRender),o;window.MotionCheckAppearSync&&(o=window.MotionCheckAppearSync(this,t,e)),this.valueSubscriptions.set(t,()=>{s(),r(),o&&o(),e.owner&&e.stop()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}updateFeatures(){let t="animation";for(t in fa){let e=fa[t];if(!e)continue;let{isEnabled:i,Feature:s}=e;if(!this.features[t]&&s&&i(this.props)&&(this.features[t]=new s(this)),this.features[t]){let r=this.features[t];r.isMounted?r.update():(r.mount(),r.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Bs()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,e){this.latestValues[t]=e}update(t,e){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=e;for(let i=0;i<tp.length;i++){let s=tp[i];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);let r="on"+s,o=t[r];o&&(this.propEventSubscriptions[s]=this.on(s,o))}this.prevMotionValues=jf(this,this.scrapeMotionValuesFromProps(t,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue(),this.onUpdate&&this.onUpdate(this)}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(t){let e=this.getClosestVariantNode();if(e)return e.variantChildren&&e.variantChildren.add(t),()=>e.variantChildren.delete(t)}addValue(t,e){let i=this.values.get(t);e!==i&&(i&&this.removeValue(t),this.bindToMotionValue(t,e),this.values.set(t,e),this.latestValues[t]=e.get())}removeValue(t){this.values.delete(t);let e=this.valueSubscriptions.get(t);e&&(e(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,e){if(this.props.values&&this.props.values[t])return this.props.values[t];let i=this.values.get(t);return i===void 0&&e!==void 0&&(i=Wn(e===null?void 0:e,{owner:this}),this.addValue(t,i)),i}readValue(t,e){var i;let s=this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:(i=this.getBaseTargetFromProps(this.props,t))!==null&&i!==void 0?i:this.readValueFromInstance(this.current,t,this.options);return s!=null&&(typeof s=="string"&&(ia(s)||ta(s))?s=parseFloat(s):!$f(s)&&on.test(e)&&(s=na(t,e)),this.setBaseTarget(t,pe(s)?s.get():s)),pe(s)?s.get():s}setBaseTarget(t,e){this.baseTarget[t]=e}getBaseTarget(t){var e;let{initial:i}=this.props,s;if(typeof i=="string"||typeof i=="object"){let o=Yo(this.props,i,(e=this.presenceContext)===null||e===void 0?void 0:e.custom);o&&(s=o[t])}if(i&&s!==void 0)return s;let r=this.getBaseTargetFromProps(this.props,t);return r!==void 0&&!pe(r)?r:this.initialValues[t]!==void 0&&s===void 0?void 0:this.baseTarget[t]}on(t,e){return this.events[t]||(this.events[t]=new ws),this.events[t].add(e)}notify(t,...e){this.events[t]&&this.events[t].notify(...e)}};var zs=class extends Vs{constructor(){super(...arguments),this.KeyframeResolver=Us}sortInstanceNodePosition(t,e){return t.compareDocumentPosition(e)&2?1:-1}getBaseTargetFromProps(t,e){return t.style?t.style[e]:void 0}removeValueFromRenderState(t,{vars:e,style:i}){delete e[t],delete i[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:t}=this.props;pe(t)&&(this.childSubscription=t.on("change",e=>{this.current&&(this.current.textContent=`${e}`)}))}};var ma=(n,t)=>t&&typeof n=="number"?t.transform(n):n;var bx={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},Tx=wn.length;function ep(n,t,e){let i="",s=!0;for(let r=0;r<Tx;r++){let o=wn[r],a=n[o];if(a===void 0)continue;let l=!0;if(typeof a=="number"?l=a===(o.startsWith("scale")?1:0):l=parseFloat(a)===0,!l||e){let c=ma(a,Is[o]);if(!l){s=!1;let h=bx[o]||o;i+=`${h}(${c}) `}e&&(t[o]=c)}}return i=i.trim(),e?i=e(t,s?"":i):s&&(i="none"),i}function ga(n,t,e){let{style:i,vars:s,transformOrigin:r}=n,o=!1,a=!1;for(let l in t){let c=t[l];if(sn.has(l)){o=!0;continue}else if(sa(l)){s[l]=c;continue}else{let h=ma(c,Is[l]);l.startsWith("origin")?(a=!0,r[l]=h):i[l]=h}}if(t.transform||(o||e?i.transform=ep(t,n.transform,e):i.transform&&(i.transform="none")),a){let{originX:l="50%",originY:c="50%",originZ:h=0}=r;i.transformOrigin=`${l} ${c} ${h}`}}var Ex={offset:"stroke-dashoffset",array:"stroke-dasharray"},wx={offset:"strokeDashoffset",array:"strokeDasharray"};function np(n,t,e=1,i=0,s=!0){n.pathLength=1;let r=s?Ex:wx;n[r.offset]=Ft.transform(-i);let o=Ft.transform(t),a=Ft.transform(e);n[r.array]=`${o} ${a}`}function ip(n,t,e){return typeof n=="string"?n:Ft.transform(t+e*n)}function sp(n,t,e){let i=ip(t,n.x,n.width),s=ip(e,n.y,n.height);return`${i} ${s}`}function rp(n,{attrX:t,attrY:e,attrScale:i,originX:s,originY:r,pathLength:o,pathSpacing:a=1,pathOffset:l=0,...c},h,u){if(ga(n,c,u),h){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};let{attrs:d,style:p,dimensions:g}=n;d.transform&&(g&&(p.transform=d.transform),delete d.transform),g&&(s!==void 0||r!==void 0||p.transform)&&(p.transformOrigin=sp(g,s!==void 0?s:.5,r!==void 0?r:.5)),t!==void 0&&(d.x=t),e!==void 0&&(d.y=e),i!==void 0&&(d.scale=i),o!==void 0&&np(d,o,a,l,!1)}var xa=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);var op=n=>typeof n=="string"&&n.toLowerCase()==="svg";function _a(n,{style:t,vars:e},i,s){Object.assign(n.style,t,s&&s.getProjectionStyles(i));for(let r in e)n.style.setProperty(r,e[r])}function ap(n,t,e,i){_a(n,t,void 0,i);for(let s in t.attrs)n.setAttribute(xa.has(s)?s:As(s),t.attrs[s])}var lp={};function cp(n,{layout:t,layoutId:e}){return sn.has(n)||n.startsWith("origin")||(t||e!==void 0)&&(!!lp[n]||n==="opacity")}function ya(n,t,e){var i;let{style:s}=n,r={};for(let o in s)(pe(s[o])||t.style&&pe(t.style[o])||cp(o,n)||((i=e?.getValue(o))===null||i===void 0?void 0:i.liveStyle)!==void 0)&&(r[o]=s[o]);return r}function hp(n,t,e){let i=ya(n,t,e);for(let s in n)if(pe(n[s])||pe(t[s])){let r=wn.indexOf(s)!==-1?"attr"+s.charAt(0).toUpperCase()+s.substring(1):s;i[r]=n[s]}return i}var va=class extends zs{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Bs}getBaseTargetFromProps(t,e){return t[e]}readValueFromInstance(t,e){if(sn.has(e)){let i=Ds(e);return i&&i.default||0}return e=xa.has(e)?e:As(e),t.getAttribute(e)}scrapeMotionValuesFromProps(t,e,i){return hp(t,e,i)}build(t,e,i){rp(t,e,this.isSVGTag,i.transformTemplate)}renderInstance(t,e,i,s){ap(t,e,i,s)}mount(t){this.isSVGTag=op(t.tagName),super.mount(t)}};function up({top:n,left:t,right:e,bottom:i}){return{x:{min:t,max:e},y:{min:n,max:i}}}function dp(n,t){if(!t)return n;let e=t({x:n.left,y:n.top}),i=t({x:n.right,y:n.bottom});return{top:e.y,left:e.x,bottom:i.y,right:i.x}}function fp(n,t){return up(dp(n.getBoundingClientRect(),t))}function Ax(n){return window.getComputedStyle(n)}var Ma=class extends zs{constructor(){super(...arguments),this.type="html",this.renderInstance=_a}readValueFromInstance(t,e){if(sn.has(e)){let i=Ds(e);return i&&i.default||0}else{let i=Ax(t),s=(sa(e)?i.getPropertyValue(e):i[e])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(t,{transformPagePoint:e}){return fp(t,e)}build(t,e,i){ga(t,e,i.transformTemplate)}scrapeMotionValuesFromProps(t,e,i){return ya(t,e,i)}};function Cx(n,t){return n in t}var Sa=class extends Vs{constructor(){super(...arguments),this.type="object"}readValueFromInstance(t,e){if(Cx(e,t)){let i=t[e];if(typeof i=="string"||typeof i=="number")return i}}getBaseTargetFromProps(){}removeValueFromRenderState(t,e){delete e.output[t]}measureInstanceViewportBox(){return Bs()}build(t,e){Object.assign(t.output,e)}renderInstance(t,{output:e}){Object.assign(t,e)}sortInstanceNodePosition(){return 0}};function pp(n){let t={presenceContext:null,props:{},visualState:{renderState:{transform:{},transformOrigin:{},style:{},vars:{},attrs:{}},latestValues:{}}},e=Gf(n)?new va(t):new Ma(t);e.mount(n),Hn.set(n,e)}function mp(n){let t={presenceContext:null,props:{},visualState:{renderState:{output:{}},latestValues:{}}},e=new Sa(t);e.mount(n),Hn.set(n,e)}function gp(n,t,e){let i=pe(n)?n:Wn(n);return i.start(da("",i,t,e)),i.animation}function Rx(n,t){return pe(n)||typeof n=="number"||typeof n=="string"&&!zr(t)}function ba(n,t,e,i){let s=[];if(Rx(n,t))s.push(gp(n,zr(t)&&t.default||t,e&&(e.default||e)));else{let r=zo(n,t,i),o=r.length;pn(!!o,"No valid elements provided.");for(let a=0;a<o;a++){let l=r[a],c=l instanceof Element?pp:mp;Hn.has(l)||c(l);let h=Hn.get(l),u={...e};"delay"in u&&typeof u.delay=="function"&&(u.delay=u.delay(a,o)),s.push(...Hf(h,{...t,transition:u},{}))}}return s}function xp(n,t,e){let i=[];return Vd(n,t,e,{spring:bs}).forEach(({keyframes:r,transition:o},a)=>{i.push(...ba(a,r,o))}),i}function Px(n){return Array.isArray(n)&&n.some(Array.isArray)}function _p(n){function t(e,i,s){let r=[];Px(e)?r=xp(e,i,n):r=ba(e,i,s,n);let o=new vs(r);return n&&n.animations.push(o),o}return t}var Pc=_p();function Ic(n,t){let e,i=()=>{let{currentTime:s}=t,o=(s===null?0:s.value)/100;e!==o&&n(o),e=o};return ve.update(i,!0),()=>Gn(i)}var Ta=new WeakMap,vi;function Ix(n,t){if(t){let{inlineSize:e,blockSize:i}=t[0];return{width:e,height:i}}else return n instanceof SVGElement&&"getBBox"in n?n.getBBox():{width:n.offsetWidth,height:n.offsetHeight}}function Dx({target:n,contentRect:t,borderBoxSize:e}){var i;(i=Ta.get(n))===null||i===void 0||i.forEach(s=>{s({target:n,contentSize:t,get size(){return Ix(n,e)}})})}function Lx(n){n.forEach(Dx)}function Ux(){typeof ResizeObserver>"u"||(vi=new ResizeObserver(Lx))}function yp(n,t){vi||Ux();let e=_s(n);return e.forEach(i=>{let s=Ta.get(i);s||(s=new Set,Ta.set(i,s)),s.add(t),vi?.observe(i)}),()=>{e.forEach(i=>{let s=Ta.get(i);s?.delete(t),s?.size||vi?.unobserve(i)})}}var Ea=new Set,Jr;function Nx(){Jr=()=>{let n={width:window.innerWidth,height:window.innerHeight},t={target:window,size:n,contentSize:n};Ea.forEach(e=>e(t))},window.addEventListener("resize",Jr)}function vp(n){return Ea.add(n),Jr||Nx(),()=>{Ea.delete(n),!Ea.size&&Jr&&(Jr=void 0)}}function Mp(n,t){return typeof n=="function"?vp(n):yp(n,t)}var Fx=50,Sp=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Tp=()=>({time:0,x:Sp(),y:Sp()}),Ox={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function bp(n,t,e,i){let s=e[t],{length:r,position:o}=Ox[t],a=s.current,l=e.time;s.current=n[`scroll${o}`],s.scrollLength=n[`scroll${r}`]-n[`client${r}`],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=Tn(0,s.scrollLength,s.current);let c=i-l;s.velocity=c>Fx?0:Ss(s.current-a,c)}function Ep(n,t,e){bp(n,"x",t,e),bp(n,"y",t,e),t.time=e}function wp(n,t){let e={x:0,y:0},i=n;for(;i&&i!==t;)if(i instanceof HTMLElement)e.x+=i.offsetLeft,e.y+=i.offsetTop,i=i.offsetParent;else if(i.tagName==="svg"){let s=i.getBoundingClientRect();i=i.parentElement;let r=i.getBoundingClientRect();e.x+=s.left-r.left,e.y+=s.top-r.top}else if(i instanceof SVGGraphicsElement){let{x:s,y:r}=i.getBBox();e.x+=s,e.y+=r;let o=null,a=i.parentNode;for(;!o;)a.tagName==="svg"&&(o=a),a=i.parentNode;i=o}else break;return e}var wa={start:0,center:.5,end:1};function Dc(n,t,e=0){let i=0;if(n in wa&&(n=wa[n]),typeof n=="string"){let s=parseFloat(n);n.endsWith("px")?i=s:n.endsWith("%")?n=s/100:n.endsWith("vw")?i=s/100*document.documentElement.clientWidth:n.endsWith("vh")?i=s/100*document.documentElement.clientHeight:n=s}return typeof n=="number"&&(i=t*n),e+i}var Bx=[0,0];function Ap(n,t,e,i){let s=Array.isArray(n)?n:Bx,r=0,o=0;return typeof n=="number"?s=[n,n]:typeof n=="string"&&(n=n.trim(),n.includes(" ")?s=n.split(" "):s=[n,wa[n]?n:"0"]),r=Dc(s[0],e,i),o=Dc(s[1],t),r-o}var Cp={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]};var Vx={x:0,y:0};function zx(n){return"getBBox"in n&&n.tagName!=="svg"?n.getBBox():{width:n.clientWidth,height:n.clientHeight}}function Rp(n,t,e){let{offset:i=Cp.All}=e,{target:s=n,axis:r="y"}=e,o=r==="y"?"height":"width",a=s!==n?wp(s,n):Vx,l=s===n?{width:n.scrollWidth,height:n.scrollHeight}:zx(s),c={width:n.clientWidth,height:n.clientHeight};t[r].offset.length=0;let h=!t[r].interpolate,u=i.length;for(let d=0;d<u;d++){let p=Ap(i[d],c[o],l[o],a[r]);!h&&p!==t[r].interpolatorOffsets[d]&&(h=!0),t[r].offset[d]=p}h&&(t[r].interpolate=ha(t[r].offset,Ts(i),{clamp:!1}),t[r].interpolatorOffsets=[...t[r].offset]),t[r].progress=ke(0,1,t[r].interpolate(t[r].current))}function kx(n,t=n,e){if(e.x.targetOffset=0,e.y.targetOffset=0,t!==n){let i=t;for(;i&&i!==n;)e.x.targetOffset+=i.offsetLeft,e.y.targetOffset+=i.offsetTop,i=i.offsetParent}e.x.targetLength=t===n?t.scrollWidth:t.clientWidth,e.y.targetLength=t===n?t.scrollHeight:t.clientHeight,e.x.containerLength=n.clientWidth,e.y.containerLength=n.clientHeight}function Pp(n,t,e,i={}){return{measure:()=>kx(n,i.target,e),update:s=>{Ep(n,e,s),(i.offset||i.target)&&Rp(n,e,i)},notify:()=>t(e)}}var Qr=new WeakMap,Ip=new WeakMap,Lc=new WeakMap,Dp=n=>n===document.documentElement?window:n;function Aa(n,{container:t=document.documentElement,...e}={}){let i=Lc.get(t);i||(i=new Set,Lc.set(t,i));let s=Tp(),r=Pp(t,n,s,e);if(i.add(r),!Qr.has(t)){let a=()=>{for(let d of i)d.measure()},l=()=>{for(let d of i)d.update(fi.timestamp)},c=()=>{for(let d of i)d.notify()},h=()=>{ve.read(a,!1,!0),ve.read(l,!1,!0),ve.update(c,!1,!0)};Qr.set(t,h);let u=Dp(t);window.addEventListener("resize",h,{passive:!0}),t!==document.documentElement&&Ip.set(t,Mp(t,h)),u.addEventListener("scroll",h,{passive:!0})}let o=Qr.get(t);return ve.read(o,!1,!0),()=>{var a;Gn(o);let l=Lc.get(t);if(!l||(l.delete(r),l.size))return;let c=Qr.get(t);Qr.delete(t),c&&(Dp(t).removeEventListener("scroll",c),(a=Ip.get(t))===null||a===void 0||a(),window.removeEventListener("resize",c))}}function Hx({source:n,container:t,axis:e="y"}){n&&(t=n);let i={value:0},s=Aa(r=>{i.value=r[e].progress*100},{container:t,axis:e});return{currentTime:i,cancel:s}}var Uc=new Map;function Lp({source:n,container:t=document.documentElement,axis:e="y"}={}){n&&(t=n),Uc.has(t)||Uc.set(t,{});let i=Uc.get(t);return i[e]||(i[e]=Do()?new ScrollTimeline({source:t,axis:e}):Hx({source:t,axis:e})),i[e]}function Gx(n){return n.length===2}function Up(n){return n&&(n.target||n.offset)}function Wx(n,t){return Gx(n)||Up(t)?Aa(e=>{n(e[t.axis].progress,e)},t):Ic(n,Lp(t))}function Xx(n,t){if(n.flatten(),Up(t))return n.pause(),Aa(e=>{n.time=n.duration*e[t.axis].progress},t);{let e=Lp(t);return n.attachTimeline?n.attachTimeline(e,i=>(i.pause(),Ic(s=>{i.time=i.duration*s},e))):Ne}}function Nc(n,{axis:t="y",...e}={}){let i={axis:t,...e};return typeof n=="function"?Wx(n,i):Xx(n,i)}var Yx={some:0,all:1};function Fc(n,t,{root:e,margin:i,amount:s="some"}={}){let r=_s(n),o=new WeakMap,a=c=>{c.forEach(h=>{let u=o.get(h.target);if(h.isIntersecting!==!!u)if(h.isIntersecting){let d=t(h.target,h);typeof d=="function"?o.set(h.target,d):l.unobserve(h.target)}else typeof u=="function"&&(u(h),o.delete(h.target))})},l=new IntersectionObserver(a,{root:e,rootMargin:i,threshold:typeof s=="number"?s:Yx[s]});return r.forEach(c=>l.observe(c)),()=>l.disconnect()}var qx=0,Np=1,$x=2;var Xm=1,Zx=2,Jn=3,Ii=0,$e=1,tn=2,Ci=0,or=1,ns=2,Fp=3,Op=4,Kx=5,Qi=100,Jx=101,Qx=102,jx=103,t_=104,e_=200,n_=201,i_=202,s_=203,vh=204,Mh=205,r_=206,o_=207,a_=208,l_=209,c_=210,h_=211,u_=212,d_=213,f_=214,Sh=0,bh=1,Th=2,hr=3,Eh=4,wh=5,Ah=6,Ch=7,Ym=0,p_=1,m_=2,Ri=0,g_=1,x_=2,__=3,y_=4,v_=5,M_=6,S_=7;var qm=300,ur=301,dr=302,Rh=303,Ph=304,Fl=306,Ih=1e3,ts=1001,Dh=1002,yn=1003,b_=1004;var Ca=1005;var Dn=1006,Oc=1007;var es=1008;var ii=1009,$m=1010,Zm=1011,uo=1012,Vu=1013,is=1014,ti=1015,_o=1016,zu=1017,ku=1018,fr=1020,Km=35902,Jm=1021,Qm=1022,_n=1023,jm=1024,tg=1025,ar=1026,pr=1027,eg=1028,Hu=1029,ng=1030,Gu=1031;var Wu=1033,al=33776,ll=33777,cl=33778,hl=33779,Lh=35840,Uh=35841,Nh=35842,Fh=35843,Oh=36196,Bh=37492,Vh=37496,zh=37808,kh=37809,Hh=37810,Gh=37811,Wh=37812,Xh=37813,Yh=37814,qh=37815,$h=37816,Zh=37817,Kh=37818,Jh=37819,Qh=37820,jh=37821,ul=36492,tu=36494,eu=36495,ig=36283,nu=36284,iu=36285,su=36286;var fl=2300,ru=2301,Bc=2302,Bp=2400,Vp=2401,zp=2402;var T_=3200,E_=3201;var sg=0,w_=1,Ai="",ln="srgb",Cr="srgb-linear",Ol="linear",se="srgb";var ks=7680;var kp=519,A_=512,C_=513,R_=514,rg=515,P_=516,I_=517,D_=518,L_=519,ou=35044;var Hp="300 es",ei=2e3,pl=2001,Di=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var dl=Math.PI/180,au=180/Math.PI;function Pi(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]).toLowerCase()}function Pe(n,t,e){return Math.max(t,Math.min(e,n))}function U_(n,t){return(n%t+t)%t}function Vc(n,t,e){return(1-e)*n+e*t}function In(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function re(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var zt=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Pe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Xt=class n{constructor(t,e,i,s,r,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],p=i[5],g=i[8],x=s[0],m=s[3],f=s[6],b=s[1],S=s[4],_=s[7],w=s[2],E=s[5],C=s[8];return r[0]=o*x+a*b+l*w,r[3]=o*m+a*S+l*E,r[6]=o*f+a*_+l*C,r[1]=c*x+h*b+u*w,r[4]=c*m+h*S+u*E,r[7]=c*f+h*_+u*C,r[2]=d*x+p*b+g*w,r[5]=d*m+p*S+g*E,r[8]=d*f+p*_+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,p=c*r-o*l,g=e*u+i*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(s*c-h*i)*x,t[2]=(a*i-s*o)*x,t[3]=d*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=p*x,t[7]=(i*l-c*e)*x,t[8]=(o*e-i*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(zc.makeScale(t,e)),this}rotate(t){return this.premultiply(zc.makeRotation(-t)),this}translate(t,e){return this.premultiply(zc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},zc=new Xt;function og(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function ml(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function N_(){let n=ml("canvas");return n.style.display="block",n}var Gp={};function lo(n){n in Gp||(Gp[n]=!0,console.warn(n))}function F_(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function O_(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function B_(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Qt={enabled:!0,workingColorSpace:Cr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===se&&(n.r=ni(n.r),n.g=ni(n.g),n.b=ni(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===se&&(n.r=lr(n.r),n.g=lr(n.g),n.b=lr(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ai?Ol:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function ni(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function lr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Wp=[.64,.33,.3,.6,.15,.06],Xp=[.2126,.7152,.0722],Yp=[.3127,.329],qp=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$p=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qt.define({[Cr]:{primaries:Wp,whitePoint:Yp,transfer:Ol,toXYZ:qp,fromXYZ:$p,luminanceCoefficients:Xp,workingColorSpaceConfig:{unpackColorSpace:ln},outputColorSpaceConfig:{drawingBufferColorSpace:ln}},[ln]:{primaries:Wp,whitePoint:Yp,transfer:se,toXYZ:qp,fromXYZ:$p,luminanceCoefficients:Xp,outputColorSpaceConfig:{drawingBufferColorSpace:ln}}});var Hs,lu=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Hs===void 0&&(Hs=ml("canvas")),Hs.width=t.width,Hs.height=t.height;let i=Hs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Hs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ml("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ni(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ni(e[i]/255)*255):e[i]=ni(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},V_=0,gl=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:V_++}),this.uuid=Pi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(kc(s[o].image)):r.push(kc(s[o]))}else r=kc(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function kc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?lu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var z_=0,en=class n extends Di{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=ts,s=ts,r=Dn,o=es,a=_n,l=ii,c=n.DEFAULT_ANISOTROPY,h=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:z_++}),this.uuid=Pi(),this.name="",this.source=new gl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==qm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ih:t.x=t.x-Math.floor(t.x);break;case ts:t.x=t.x<0?0:1;break;case Dh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ih:t.y=t.y-Math.floor(t.y);break;case ts:t.y=t.y<0?0:1;break;case Dh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=qm;en.DEFAULT_ANISOTROPY=1;var oe=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(c+1)/2,_=(p+1)/2,w=(f+1)/2,E=(h+d)/4,C=(u+x)/4,I=(g+m)/4;return S>_&&S>w?S<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(S),s=E/i,r=C/i):_>w?_<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),i=E/s,r=I/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=C/r,s=I/r),this.set(i,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-x)/b,this.z=(d-h)/b,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},cu=class extends Di{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new en(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new gl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},si=class extends cu{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},xl=class extends en{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=yn,this.minFilter=yn,this.wrapR=ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var hu=class extends en{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=yn,this.minFilter=yn,this.wrapR=ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Li=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],d=r[o+0],p=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(u!==x||l!==d||c!==p||h!==g){let m=1-a,f=l*d+c*p+h*g+u*x,b=f>=0?1:-1,S=1-f*f;if(S>Number.EPSILON){let w=Math.sqrt(S),E=Math.atan2(w,f*b);m=Math.sin(m*E)/w,a=Math.sin(a*E)/w}let _=a*b;if(l=l*m+d*_,c=c*m+p*_,h=h*m+g*_,u=u*m+x*_,m===1-a){let w=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=w,c*=w,h*=w,u*=w}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*p-c*d,t[e+1]=l*g+h*d+c*u-a*p,t[e+2]=c*g+h*p+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),u=a(r/2),d=l(i/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>u){let p=2*Math.sqrt(1+i-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>u){let p=2*Math.sqrt(1+a-i-u);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Pe(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Zp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Zp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Hc.copy(this).projectOnVector(t),this.sub(Hc)}reflect(t){return this.sub(Hc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Pe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Hc=new N,Zp=new Li,ss=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(mn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(mn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=mn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,mn):mn.fromBufferAttribute(r,o),mn.applyMatrix4(t.matrixWorld),this.expandByPoint(mn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ra.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ra.copy(i.boundingBox)),Ra.applyMatrix4(t.matrixWorld),this.union(Ra)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,mn),mn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(jr),Pa.subVectors(this.max,jr),Gs.subVectors(t.a,jr),Ws.subVectors(t.b,jr),Xs.subVectors(t.c,jr),Mi.subVectors(Ws,Gs),Si.subVectors(Xs,Ws),Xi.subVectors(Gs,Xs);let e=[0,-Mi.z,Mi.y,0,-Si.z,Si.y,0,-Xi.z,Xi.y,Mi.z,0,-Mi.x,Si.z,0,-Si.x,Xi.z,0,-Xi.x,-Mi.y,Mi.x,0,-Si.y,Si.x,0,-Xi.y,Xi.x,0];return!Gc(e,Gs,Ws,Xs,Pa)||(e=[1,0,0,0,1,0,0,0,1],!Gc(e,Gs,Ws,Xs,Pa))?!1:(Ia.crossVectors(Mi,Si),e=[Ia.x,Ia.y,Ia.z],Gc(e,Gs,Ws,Xs,Pa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,mn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(mn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Yn=[new N,new N,new N,new N,new N,new N,new N,new N],mn=new N,Ra=new ss,Gs=new N,Ws=new N,Xs=new N,Mi=new N,Si=new N,Xi=new N,jr=new N,Pa=new N,Ia=new N,Yi=new N;function Gc(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Yi.fromArray(n,r);let a=s.x*Math.abs(Yi.x)+s.y*Math.abs(Yi.y)+s.z*Math.abs(Yi.z),l=t.dot(Yi),c=e.dot(Yi),h=i.dot(Yi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var k_=new ss,to=new N,Wc=new N,rs=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):k_.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;to.subVectors(t,this.center);let e=to.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(to,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Wc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(to.copy(t.center).add(Wc)),this.expandByPoint(to.copy(t.center).sub(Wc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},qn=new N,Xc=new N,Da=new N,bi=new N,Yc=new N,La=new N,qc=new N,fo=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(qn.copy(this.origin).addScaledVector(this.direction,e),qn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Xc.copy(t).add(e).multiplyScalar(.5),Da.copy(e).sub(t).normalize(),bi.copy(this.origin).sub(Xc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Da),a=bi.dot(this.direction),l=-bi.dot(Da),c=bi.lengthSq(),h=Math.abs(1-o*o),u,d,p,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,p=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Xc).addScaledVector(Da,d),p}intersectSphere(t,e){qn.subVectors(t.center,this.origin);let i=qn.dot(this.direction),s=qn.dot(qn)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,qn)!==null}intersectTriangle(t,e,i,s,r){Yc.subVectors(e,t),La.subVectors(i,t),qc.crossVectors(Yc,La);let o=this.direction.dot(qc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;bi.subVectors(this.origin,t);let l=a*this.direction.dot(La.crossVectors(bi,La));if(l<0)return null;let c=a*this.direction.dot(Yc.cross(bi));if(c<0||l+c>o)return null;let h=-a*bi.dot(qc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},he=class n{constructor(t,e,i,s,r,o,a,l,c,h,u,d,p,g,x,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,h,u,d,p,g,x,m)}set(t,e,i,s,r,o,a,l,c,h,u,d,p,g,x,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/Ys.setFromMatrixColumn(t,0).length(),r=1/Ys.setFromMatrixColumn(t,1).length(),o=1/Ys.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,p=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,p=l*u,g=c*h,x=c*u;e[0]=d+x*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,p=l*u,g=c*h,x=c*u;e[0]=d-x*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,p=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,p=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-d*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+g,e[10]=d-x*u}else if(t.order==="XZY"){let d=o*l,p=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(H_,t,G_)}lookAt(t,e,i){let s=this.elements;return Qe.subVectors(t,e),Qe.lengthSq()===0&&(Qe.z=1),Qe.normalize(),Ti.crossVectors(i,Qe),Ti.lengthSq()===0&&(Math.abs(i.z)===1?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),Ti.crossVectors(i,Qe)),Ti.normalize(),Ua.crossVectors(Qe,Ti),s[0]=Ti.x,s[4]=Ua.x,s[8]=Qe.x,s[1]=Ti.y,s[5]=Ua.y,s[9]=Qe.y,s[2]=Ti.z,s[6]=Ua.z,s[10]=Qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],p=i[13],g=i[2],x=i[6],m=i[10],f=i[14],b=i[3],S=i[7],_=i[11],w=i[15],E=s[0],C=s[4],I=s[8],M=s[12],v=s[1],D=s[5],k=s[9],W=s[13],Z=s[2],B=s[6],P=s[10],H=s[14],R=s[3],L=s[7],U=s[11],X=s[15];return r[0]=o*E+a*v+l*Z+c*R,r[4]=o*C+a*D+l*B+c*L,r[8]=o*I+a*k+l*P+c*U,r[12]=o*M+a*W+l*H+c*X,r[1]=h*E+u*v+d*Z+p*R,r[5]=h*C+u*D+d*B+p*L,r[9]=h*I+u*k+d*P+p*U,r[13]=h*M+u*W+d*H+p*X,r[2]=g*E+x*v+m*Z+f*R,r[6]=g*C+x*D+m*B+f*L,r[10]=g*I+x*k+m*P+f*U,r[14]=g*M+x*W+m*H+f*X,r[3]=b*E+S*v+_*Z+w*R,r[7]=b*C+S*D+_*B+w*L,r[11]=b*I+S*k+_*P+w*U,r[15]=b*M+S*W+_*H+w*X,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],x=t[7],m=t[11],f=t[15];return g*(+r*l*u-s*c*u-r*a*d+i*c*d+s*a*p-i*l*p)+x*(+e*l*p-e*c*d+r*o*d-s*o*p+s*c*h-r*l*h)+m*(+e*c*u-e*a*p-r*o*u+i*o*p+r*a*h-i*c*h)+f*(-s*a*h-e*l*u+e*a*d+s*o*u-i*o*d+i*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],x=t[13],m=t[14],f=t[15],b=u*m*c-x*d*c+x*l*p-a*m*p-u*l*f+a*d*f,S=g*d*c-h*m*c-g*l*p+o*m*p+h*l*f-o*d*f,_=h*x*c-g*u*c+g*a*p-o*x*p-h*a*f+o*u*f,w=g*u*l-h*x*l-g*a*d+o*x*d+h*a*m-o*u*m,E=e*b+i*S+s*_+r*w;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/E;return t[0]=b*C,t[1]=(x*d*r-u*m*r-x*s*p+i*m*p+u*s*f-i*d*f)*C,t[2]=(a*m*r-x*l*r+x*s*c-i*m*c-a*s*f+i*l*f)*C,t[3]=(u*l*r-a*d*r-u*s*c+i*d*c+a*s*p-i*l*p)*C,t[4]=S*C,t[5]=(h*m*r-g*d*r+g*s*p-e*m*p-h*s*f+e*d*f)*C,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*f-e*l*f)*C,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*p+e*l*p)*C,t[8]=_*C,t[9]=(g*u*r-h*x*r-g*i*p+e*x*p+h*i*f-e*u*f)*C,t[10]=(o*x*r-g*a*r+g*i*c-e*x*c-o*i*f+e*a*f)*C,t[11]=(h*a*r-o*u*r-h*i*c+e*u*c+o*i*p-e*a*p)*C,t[12]=w*C,t[13]=(h*x*s-g*u*s+g*i*d-e*x*d-h*i*m+e*u*m)*C,t[14]=(g*a*s-o*x*s-g*i*l+e*x*l+o*i*m-e*a*m)*C,t[15]=(o*u*s-h*a*s+h*i*l-e*u*l-o*i*d+e*a*d)*C,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,p=r*h,g=r*u,x=o*h,m=o*u,f=a*u,b=l*c,S=l*h,_=l*u,w=i.x,E=i.y,C=i.z;return s[0]=(1-(x+f))*w,s[1]=(p+_)*w,s[2]=(g-S)*w,s[3]=0,s[4]=(p-_)*E,s[5]=(1-(d+f))*E,s[6]=(m+b)*E,s[7]=0,s[8]=(g+S)*C,s[9]=(m-b)*C,s[10]=(1-(d+x))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=Ys.set(s[0],s[1],s[2]).length(),o=Ys.set(s[4],s[5],s[6]).length(),a=Ys.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],gn.copy(this);let c=1/r,h=1/o,u=1/a;return gn.elements[0]*=c,gn.elements[1]*=c,gn.elements[2]*=c,gn.elements[4]*=h,gn.elements[5]*=h,gn.elements[6]*=h,gn.elements[8]*=u,gn.elements[9]*=u,gn.elements[10]*=u,e.setFromRotationMatrix(gn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=ei){let l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),d=(i+s)/(i-s),p,g;if(a===ei)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===pl)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=ei){let l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(o-r),d=(e+t)*c,p=(i+s)*h,g,x;if(a===ei)g=(o+r)*u,x=-2*u;else if(a===pl)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Ys=new N,gn=new he,H_=new N(0,0,0),G_=new N(1,1,1),Ti=new N,Ua=new N,Qe=new N,Kp=new he,Jp=new Li,Ln=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Pe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Pe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Pe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Pe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Pe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Pe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Kp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Kp,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Jp.setFromEuler(this),this.setFromQuaternion(Jp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ln.DEFAULT_ORDER="XYZ";var _l=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},W_=0,Qp=new N,qs=new Li,$n=new he,Na=new N,eo=new N,X_=new N,Y_=new Li,jp=new N(1,0,0),tm=new N(0,1,0),em=new N(0,0,1),nm={type:"added"},q_={type:"removed"},$s={type:"childadded",child:null},$c={type:"childremoved",child:null},De=class n extends Di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:W_++}),this.uuid=Pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new N,e=new Ln,i=new Li,s=new N(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new Xt}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _l,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qs.setFromAxisAngle(t,e),this.quaternion.multiply(qs),this}rotateOnWorldAxis(t,e){return qs.setFromAxisAngle(t,e),this.quaternion.premultiply(qs),this}rotateX(t){return this.rotateOnAxis(jp,t)}rotateY(t){return this.rotateOnAxis(tm,t)}rotateZ(t){return this.rotateOnAxis(em,t)}translateOnAxis(t,e){return Qp.copy(t).applyQuaternion(this.quaternion),this.position.add(Qp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(jp,t)}translateY(t){return this.translateOnAxis(tm,t)}translateZ(t){return this.translateOnAxis(em,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Na.copy(t):Na.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),eo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(eo,Na,this.up):$n.lookAt(Na,eo,this.up),this.quaternion.setFromRotationMatrix($n),s&&($n.extractRotation(s.matrixWorld),qs.setFromRotationMatrix($n),this.quaternion.premultiply(qs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(nm),$s.child=t,this.dispatchEvent($s),$s.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(q_),$c.child=t,this.dispatchEvent($c),$c.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),$n.multiply(t.parent.matrixWorld)),t.applyMatrix4($n),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(nm),$s.child=t,this.dispatchEvent($s),$s.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(eo,t,X_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(eo,Y_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};De.DEFAULT_UP=new N(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var xn=new N,Zn=new N,Zc=new N,Kn=new N,Zs=new N,Ks=new N,im=new N,Kc=new N,Jc=new N,Qc=new N,jc=new oe,th=new oe,eh=new oe,jn=class n{constructor(t=new N,e=new N,i=new N){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),xn.subVectors(t,e),s.cross(xn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){xn.subVectors(s,e),Zn.subVectors(i,e),Zc.subVectors(t,e);let o=xn.dot(xn),a=xn.dot(Zn),l=xn.dot(Zc),c=Zn.dot(Zn),h=Zn.dot(Zc),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,Kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Kn.x),l.addScaledVector(o,Kn.y),l.addScaledVector(a,Kn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return jc.setScalar(0),th.setScalar(0),eh.setScalar(0),jc.fromBufferAttribute(t,e),th.fromBufferAttribute(t,i),eh.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(jc,r.x),o.addScaledVector(th,r.y),o.addScaledVector(eh,r.z),o}static isFrontFacing(t,e,i,s){return xn.subVectors(i,e),Zn.subVectors(t,e),xn.cross(Zn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return xn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),xn.cross(Zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;Zs.subVectors(s,i),Ks.subVectors(r,i),Kc.subVectors(t,i);let l=Zs.dot(Kc),c=Ks.dot(Kc);if(l<=0&&c<=0)return e.copy(i);Jc.subVectors(t,s);let h=Zs.dot(Jc),u=Ks.dot(Jc);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(Zs,o);Qc.subVectors(t,r);let p=Zs.dot(Qc),g=Ks.dot(Qc);if(g>=0&&p<=g)return e.copy(r);let x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Ks,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return im.subVectors(r,s),a=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(im,a);let f=1/(m+x+d);return o=x*f,a=d*f,e.copy(i).addScaledVector(Zs,o).addScaledVector(Ks,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ag={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ei={h:0,s:0,l:0},Fa={h:0,s:0,l:0};function nh(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Ht=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ln){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Qt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=Qt.workingColorSpace){if(t=U_(t,1),e=Pe(e,0,1),i=Pe(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=nh(o,r,t+1/3),this.g=nh(o,r,t),this.b=nh(o,r,t-1/3)}return Qt.toWorkingColorSpace(this,s),this}setStyle(t,e=ln){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ln){let i=ag[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ni(t.r),this.g=ni(t.g),this.b=ni(t.b),this}copyLinearToSRGB(t){return this.r=lr(t.r),this.g=lr(t.g),this.b=lr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ln){return Qt.fromWorkingColorSpace(Be.copy(this),t),Math.round(Pe(Be.r*255,0,255))*65536+Math.round(Pe(Be.g*255,0,255))*256+Math.round(Pe(Be.b*255,0,255))}getHexString(t=ln){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(Be.copy(this),e);let i=Be.r,s=Be.g,r=Be.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=ln){Qt.fromWorkingColorSpace(Be.copy(this),t);let e=Be.r,i=Be.g,s=Be.b;return t!==ln?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ei),this.setHSL(Ei.h+t,Ei.s+e,Ei.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ei),t.getHSL(Fa);let i=Vc(Ei.h,Fa.h,e),s=Vc(Ei.s,Fa.s,e),r=Vc(Ei.l,Fa.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Be=new Ht;Ht.NAMES=ag;var $_=0,Un=class extends Di{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$_++}),this.uuid=Pi(),this.name="",this.blending=or,this.side=Ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vh,this.blendDst=Mh,this.blendEquation=Qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=hr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ks,this.stencilZFail=ks,this.stencilZPass=ks,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==or&&(i.blending=this.blending),this.side!==Ii&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==vh&&(i.blendSrc=this.blendSrc),this.blendDst!==Mh&&(i.blendDst=this.blendDst),this.blendEquation!==Qi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==hr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==kp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ks&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ks&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ks&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},os=class extends Un{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.combine=Ym,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Te=new N,Oa=new zt,Ie=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=ou,this.updateRanges=[],this.gpuType=ti,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Oa.fromBufferAttribute(this,e),Oa.applyMatrix3(t),this.setXY(e,Oa.x,Oa.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=In(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=re(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=In(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=In(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=In(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=In(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ou&&(t.usage=this.usage),t}};var yl=class extends Ie{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var vl=class extends Ie{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var ie=class extends Ie{constructor(t,e,i){super(new Float32Array(t),e,i)}},Z_=0,an=new he,ih=new De,Js=new N,je=new ss,no=new ss,Ce=new N,ge=class n extends Di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Z_++}),this.uuid=Pi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(og(t)?vl:yl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Xt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return an.makeRotationFromQuaternion(t),this.applyMatrix4(an),this}rotateX(t){return an.makeRotationX(t),this.applyMatrix4(an),this}rotateY(t){return an.makeRotationY(t),this.applyMatrix4(an),this}rotateZ(t){return an.makeRotationZ(t),this.applyMatrix4(an),this}translate(t,e,i){return an.makeTranslation(t,e,i),this.applyMatrix4(an),this}scale(t,e,i){return an.makeScale(t,e,i),this.applyMatrix4(an),this}lookAt(t){return ih.lookAt(t),ih.updateMatrix(),this.applyMatrix4(ih.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ie(i,3))}else{for(let i=0,s=e.count;i<s;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ss);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];je.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rs);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let i=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];no.setFromBufferAttribute(a),this.morphTargetsRelative?(Ce.addVectors(je.min,no.min),je.expandByPoint(Ce),Ce.addVectors(je.max,no.max),je.expandByPoint(Ce)):(je.expandByPoint(no.min),je.expandByPoint(no.max))}je.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ce));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ce.fromBufferAttribute(a,c),l&&(Js.fromBufferAttribute(t,c),Ce.add(Js)),s=Math.max(s,i.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ie(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<i.count;I++)a[I]=new N,l[I]=new N;let c=new N,h=new N,u=new N,d=new zt,p=new zt,g=new zt,x=new N,m=new N;function f(I,M,v){c.fromBufferAttribute(i,I),h.fromBufferAttribute(i,M),u.fromBufferAttribute(i,v),d.fromBufferAttribute(r,I),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,v),h.sub(c),u.sub(c),p.sub(d),g.sub(d);let D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(D),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(D),a[I].add(x),a[M].add(x),a[v].add(x),l[I].add(m),l[M].add(m),l[v].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let I=0,M=b.length;I<M;++I){let v=b[I],D=v.start,k=v.count;for(let W=D,Z=D+k;W<Z;W+=3)f(t.getX(W+0),t.getX(W+1),t.getX(W+2))}let S=new N,_=new N,w=new N,E=new N;function C(I){w.fromBufferAttribute(s,I),E.copy(w);let M=a[I];S.copy(M),S.sub(w.multiplyScalar(w.dot(M))).normalize(),_.crossVectors(E,M);let D=_.dot(l[I])<0?-1:1;o.setXYZW(I,S.x,S.y,S.z,D)}for(let I=0,M=b.length;I<M;++I){let v=b[I],D=v.start,k=v.count;for(let W=D,Z=D+k;W<Z;W+=3)C(t.getX(W+0)),C(t.getX(W+1)),C(t.getX(W+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ie(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);let s=new N,r=new N,o=new N,a=new N,l=new N,c=new N,h=new N,u=new N;if(t)for(let d=0,p=t.count;d<p;d+=3){let g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),p=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new Ie(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,i);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],p=t(d,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},sm=new he,qi=new fo,Ba=new rs,rm=new N,Va=new N,za=new N,ka=new N,sh=new N,Ha=new N,om=new N,Ga=new N,$t=class extends De{constructor(t=new ge,e=new os){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Ha.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(sh.fromBufferAttribute(u,t),o?Ha.addScaledVector(sh,h):Ha.addScaledVector(sh.sub(e),h))}e.add(Ha)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ba.copy(i.boundingSphere),Ba.applyMatrix4(r),qi.copy(t.ray).recast(t.near),!(Ba.containsPoint(qi.origin)===!1&&(qi.intersectSphere(Ba,rm)===null||qi.origin.distanceToSquared(rm)>(t.far-t.near)**2))&&(sm.copy(r).invert(),qi.copy(t.ray).applyMatrix4(sm),!(i.boundingBox!==null&&qi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,qi)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],f=o[m.materialIndex],b=Math.max(m.start,p.start),S=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let _=b,w=S;_<w;_+=3){let E=a.getX(_),C=a.getX(_+1),I=a.getX(_+2);s=Wa(this,f,t,i,c,h,u,E,C,I),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let b=a.getX(m),S=a.getX(m+1),_=a.getX(m+2);s=Wa(this,o,t,i,c,h,u,b,S,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],f=o[m.materialIndex],b=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let _=b,w=S;_<w;_+=3){let E=_,C=_+1,I=_+2;s=Wa(this,f,t,i,c,h,u,E,C,I),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let b=m,S=m+1,_=m+2;s=Wa(this,o,t,i,c,h,u,b,S,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function K_(n,t,e,i,s,r,o,a){let l;if(t.side===$e?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Ii,a),l===null)return null;Ga.copy(a),Ga.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Ga);return c<e.near||c>e.far?null:{distance:c,point:Ga.clone(),object:n}}function Wa(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,Va),n.getVertexPosition(l,za),n.getVertexPosition(c,ka);let h=K_(n,t,e,i,Va,za,ka,om);if(h){let u=new N;jn.getBarycoord(om,Va,za,ka,u),s&&(h.uv=jn.getInterpolatedAttribute(s,a,l,c,u,new zt)),r&&(h.uv1=jn.getInterpolatedAttribute(r,a,l,c,u,new zt)),o&&(h.normal=jn.getInterpolatedAttribute(o,a,l,c,u,new N),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new N,materialIndex:0};jn.getNormal(Va,za,ka,d.normal),h.face=d,h.barycoord=u}return h}var Nn=class n extends ge{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new ie(c,3)),this.setAttribute("normal",new ie(h,3)),this.setAttribute("uv",new ie(u,2));function g(x,m,f,b,S,_,w,E,C,I,M){let v=_/C,D=w/I,k=_/2,W=w/2,Z=E/2,B=C+1,P=I+1,H=0,R=0,L=new N;for(let U=0;U<P;U++){let X=U*D-W;for(let j=0;j<B;j++){let ot=j*v-k;L[x]=ot*b,L[m]=X*S,L[f]=Z,c.push(L.x,L.y,L.z),L[x]=0,L[m]=0,L[f]=E>0?1:-1,h.push(L.x,L.y,L.z),u.push(j/C),u.push(1-U/I),H+=1}}for(let U=0;U<I;U++)for(let X=0;X<C;X++){let j=d+X+B*U,ot=d+X+B*(U+1),V=d+(X+1)+B*(U+1),Y=d+(X+1)+B*U;l.push(j,ot,Y),l.push(ot,V,Y),R+=6}a.addGroup(p,R,M),p+=R,d+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function mr(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Ge(n){let t={};for(let e=0;e<n.length;e++){let i=mr(n[e]);for(let s in i)t[s]=i[s]}return t}function J_(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function lg(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}var Q_={clone:mr,merge:Ge},j_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ty=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Fn=class extends Un{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=j_,this.fragmentShader=ty,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=mr(t.uniforms),this.uniformsGroups=J_(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},Ml=class extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=ei}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},wi=new N,am=new zt,lm=new zt,Re=class extends Ml{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=au*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(dl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return au*2*Math.atan(Math.tan(dl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(wi.x,wi.y).multiplyScalar(-t/wi.z),wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(wi.x,wi.y).multiplyScalar(-t/wi.z)}getViewSize(t,e){return this.getViewBounds(t,am,lm),e.subVectors(lm,am)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(dl*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Qs=-90,js=1,uu=class extends De{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Re(Qs,js,t,e);s.layers=this.layers,this.add(s);let r=new Re(Qs,js,t,e);r.layers=this.layers,this.add(r);let o=new Re(Qs,js,t,e);o.layers=this.layers,this.add(o);let a=new Re(Qs,js,t,e);a.layers=this.layers,this.add(a);let l=new Re(Qs,js,t,e);l.layers=this.layers,this.add(l);let c=new Re(Qs,js,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===ei)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===pl)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Sl=class extends en{constructor(t,e,i,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ur,super(t,e,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},du=class extends si{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Sl(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Dn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Nn(5,5,5),r=new Fn({name:"CubemapFromEquirect",uniforms:mr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$e,blending:Ci});r.uniforms.tEquirect.value=e;let o=new $t(s,r),a=e.minFilter;return e.minFilter===es&&(e.minFilter=Dn),new uu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},rh=new N,ey=new N,ny=new Xt,Qn=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=rh.subVectors(i,e).cross(ey.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(rh),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||ny.getNormalMatrix(t),s=this.coplanarPoint(rh).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},$i=new rs,Xa=new N,po=class{constructor(t=new Qn,e=new Qn,i=new Qn,s=new Qn,r=new Qn,o=new Qn){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ei){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],x=s[10],m=s[11],f=s[12],b=s[13],S=s[14],_=s[15];if(i[0].setComponents(l-r,d-c,m-p,_-f).normalize(),i[1].setComponents(l+r,d+c,m+p,_+f).normalize(),i[2].setComponents(l+o,d+h,m+g,_+b).normalize(),i[3].setComponents(l-o,d-h,m-g,_-b).normalize(),i[4].setComponents(l-a,d-u,m-x,_-S).normalize(),e===ei)i[5].setComponents(l+a,d+u,m+x,_+S).normalize();else if(e===pl)i[5].setComponents(a,u,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(t){return $i.center.set(0,0,0),$i.radius=.7071067811865476,$i.applyMatrix4(t.matrixWorld),this.intersectsSphere($i)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(Xa.x=s.normal.x>0?t.max.x:t.min.x,Xa.y=s.normal.y>0?t.max.y:t.min.y,Xa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Xa)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function cg(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function iy(n){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){let g=u[d],x=u[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){let x=u[p];n.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var gr=class n extends ge{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,p=[],g=[],x=[],m=[];for(let f=0;f<h;f++){let b=f*d-o;for(let S=0;S<c;S++){let _=S*u-r;g.push(_,-b,0),x.push(0,0,1),m.push(S/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let b=0;b<a;b++){let S=b+c*f,_=b+c*(f+1),w=b+1+c*(f+1),E=b+1+c*f;p.push(S,_,E),p.push(_,w,E)}this.setIndex(p),this.setAttribute("position",new ie(g,3)),this.setAttribute("normal",new ie(x,3)),this.setAttribute("uv",new ie(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},sy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ry=`#ifdef USE_ALPHAHASH
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
#endif`,oy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ay=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ly=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hy=`#ifdef USE_AOMAP
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
#endif`,uy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dy=`#ifdef USE_BATCHING
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
#endif`,fy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,py=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,my=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,xy=`#ifdef USE_IRIDESCENCE
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
#endif`,_y=`#ifdef USE_BUMPMAP
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
#endif`,yy=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,vy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,My=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,by=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ty=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ey=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,wy=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ay=`#define PI 3.141592653589793
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
} // validated`,Cy=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ry=`vec3 transformedNormal = objectNormal;
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
#endif`,Py=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Iy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ly=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Uy="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ny=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fy=`#ifdef USE_ENVMAP
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
#endif`,Oy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,By=`#ifdef USE_ENVMAP
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
#endif`,Vy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zy=`#ifdef USE_ENVMAP
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
#endif`,ky=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xy=`#ifdef USE_GRADIENTMAP
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
}`,Yy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$y=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zy=`uniform bool receiveShadow;
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
#endif`,Ky=`#ifdef USE_ENVMAP
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
#endif`,Jy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,tv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ev=`PhysicalMaterial material;
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
#endif`,nv=`struct PhysicalMaterial {
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
}`,iv=`
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
#endif`,sv=`#if defined( RE_IndirectDiffuse )
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
#endif`,rv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ov=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,av=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,uv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,fv=`#if defined( USE_POINTS_UV )
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
#endif`,pv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,xv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_v=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yv=`#ifdef USE_MORPHTARGETS
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
#endif`,vv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Sv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,bv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ev=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wv=`#ifdef USE_NORMALMAP
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
#endif`,Av=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Iv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Lv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Uv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ov=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hv=`float getShadowMask() {
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
}`,Gv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wv=`#ifdef USE_SKINNING
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
#endif`,Xv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yv=`#ifdef USE_SKINNING
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
#endif`,qv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$v=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Kv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jv=`#ifdef USE_TRANSMISSION
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
#endif`,Qv=`#ifdef USE_TRANSMISSION
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
#endif`,jv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,eM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,iM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sM=`uniform sampler2D t2D;
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
}`,rM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,aM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cM=`#include <common>
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
}`,hM=`#if DEPTH_PACKING == 3200
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
}`,uM=`#define DISTANCE
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
}`,dM=`#define DISTANCE
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
}`,fM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mM=`uniform float scale;
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
}`,gM=`uniform vec3 diffuse;
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
}`,xM=`#include <common>
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
}`,_M=`uniform vec3 diffuse;
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
}`,yM=`#define LAMBERT
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
}`,vM=`#define LAMBERT
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
}`,MM=`#define MATCAP
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
}`,SM=`#define MATCAP
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
}`,bM=`#define NORMAL
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
}`,TM=`#define NORMAL
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
}`,EM=`#define PHONG
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
}`,wM=`#define PHONG
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
}`,AM=`#define STANDARD
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
}`,CM=`#define STANDARD
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
}`,RM=`#define TOON
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
}`,PM=`#define TOON
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
}`,IM=`uniform float size;
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
}`,DM=`uniform vec3 diffuse;
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
}`,LM=`#include <common>
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
}`,UM=`uniform vec3 color;
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
}`,NM=`uniform float rotation;
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
}`,FM=`uniform vec3 diffuse;
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
}`,Yt={alphahash_fragment:sy,alphahash_pars_fragment:ry,alphamap_fragment:oy,alphamap_pars_fragment:ay,alphatest_fragment:ly,alphatest_pars_fragment:cy,aomap_fragment:hy,aomap_pars_fragment:uy,batching_pars_vertex:dy,batching_vertex:fy,begin_vertex:py,beginnormal_vertex:my,bsdfs:gy,iridescence_fragment:xy,bumpmap_pars_fragment:_y,clipping_planes_fragment:yy,clipping_planes_pars_fragment:vy,clipping_planes_pars_vertex:My,clipping_planes_vertex:Sy,color_fragment:by,color_pars_fragment:Ty,color_pars_vertex:Ey,color_vertex:wy,common:Ay,cube_uv_reflection_fragment:Cy,defaultnormal_vertex:Ry,displacementmap_pars_vertex:Py,displacementmap_vertex:Iy,emissivemap_fragment:Dy,emissivemap_pars_fragment:Ly,colorspace_fragment:Uy,colorspace_pars_fragment:Ny,envmap_fragment:Fy,envmap_common_pars_fragment:Oy,envmap_pars_fragment:By,envmap_pars_vertex:Vy,envmap_physical_pars_fragment:Ky,envmap_vertex:zy,fog_vertex:ky,fog_pars_vertex:Hy,fog_fragment:Gy,fog_pars_fragment:Wy,gradientmap_pars_fragment:Xy,lightmap_pars_fragment:Yy,lights_lambert_fragment:qy,lights_lambert_pars_fragment:$y,lights_pars_begin:Zy,lights_toon_fragment:Jy,lights_toon_pars_fragment:Qy,lights_phong_fragment:jy,lights_phong_pars_fragment:tv,lights_physical_fragment:ev,lights_physical_pars_fragment:nv,lights_fragment_begin:iv,lights_fragment_maps:sv,lights_fragment_end:rv,logdepthbuf_fragment:ov,logdepthbuf_pars_fragment:av,logdepthbuf_pars_vertex:lv,logdepthbuf_vertex:cv,map_fragment:hv,map_pars_fragment:uv,map_particle_fragment:dv,map_particle_pars_fragment:fv,metalnessmap_fragment:pv,metalnessmap_pars_fragment:mv,morphinstance_vertex:gv,morphcolor_vertex:xv,morphnormal_vertex:_v,morphtarget_pars_vertex:yv,morphtarget_vertex:vv,normal_fragment_begin:Mv,normal_fragment_maps:Sv,normal_pars_fragment:bv,normal_pars_vertex:Tv,normal_vertex:Ev,normalmap_pars_fragment:wv,clearcoat_normal_fragment_begin:Av,clearcoat_normal_fragment_maps:Cv,clearcoat_pars_fragment:Rv,iridescence_pars_fragment:Pv,opaque_fragment:Iv,packing:Dv,premultiplied_alpha_fragment:Lv,project_vertex:Uv,dithering_fragment:Nv,dithering_pars_fragment:Fv,roughnessmap_fragment:Ov,roughnessmap_pars_fragment:Bv,shadowmap_pars_fragment:Vv,shadowmap_pars_vertex:zv,shadowmap_vertex:kv,shadowmask_pars_fragment:Hv,skinbase_vertex:Gv,skinning_pars_vertex:Wv,skinning_vertex:Xv,skinnormal_vertex:Yv,specularmap_fragment:qv,specularmap_pars_fragment:$v,tonemapping_fragment:Zv,tonemapping_pars_fragment:Kv,transmission_fragment:Jv,transmission_pars_fragment:Qv,uv_pars_fragment:jv,uv_pars_vertex:tM,uv_vertex:eM,worldpos_vertex:nM,background_vert:iM,background_frag:sM,backgroundCube_vert:rM,backgroundCube_frag:oM,cube_vert:aM,cube_frag:lM,depth_vert:cM,depth_frag:hM,distanceRGBA_vert:uM,distanceRGBA_frag:dM,equirect_vert:fM,equirect_frag:pM,linedashed_vert:mM,linedashed_frag:gM,meshbasic_vert:xM,meshbasic_frag:_M,meshlambert_vert:yM,meshlambert_frag:vM,meshmatcap_vert:MM,meshmatcap_frag:SM,meshnormal_vert:bM,meshnormal_frag:TM,meshphong_vert:EM,meshphong_frag:wM,meshphysical_vert:AM,meshphysical_frag:CM,meshtoon_vert:RM,meshtoon_frag:PM,points_vert:IM,points_frag:DM,shadow_vert:LM,shadow_frag:UM,sprite_vert:NM,sprite_frag:FM},mt={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},Pn={basic:{uniforms:Ge([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Ge([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Ge([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Ge([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Ge([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Ge([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Ge([mt.points,mt.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Ge([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Ge([mt.common,mt.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Ge([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Ge([mt.sprite,mt.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Ge([mt.common,mt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Ge([mt.lights,mt.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};Pn.physical={uniforms:Ge([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};var Ya={r:0,b:0,g:0},Zi=new Ln,OM=new he;function BM(n,t,e,i,s,r,o){let a=new Ht(0),l=r===!0?0:1,c,h,u=null,d=0,p=null;function g(b){let S=b.isScene===!0?b.background:null;return S&&S.isTexture&&(S=(b.backgroundBlurriness>0?e:t).get(S)),S}function x(b){let S=!1,_=g(b);_===null?f(a,l):_&&_.isColor&&(f(_,1),S=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(b,S){let _=g(S);_&&(_.isCubeTexture||_.mapping===Fl)?(h===void 0&&(h=new $t(new Nn(1,1,1),new Fn({name:"BackgroundCubeMaterial",uniforms:mr(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Zi.copy(S.backgroundRotation),Zi.x*=-1,Zi.y*=-1,Zi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Zi.y*=-1,Zi.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(OM.makeRotationFromEuler(Zi)),h.material.toneMapped=Qt.getTransfer(_.colorSpace)!==se,(u!==_||d!==_.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,p=n.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new $t(new gr(2,2),new Fn({name:"BackgroundMaterial",uniforms:mr(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:Ii,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(_.colorSpace)!==se,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,p=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function f(b,S){b.getRGB(Ya,lg(n)),i.buffers.color.setClear(Ya.r,Ya.g,Ya.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(b,S=1){a.set(b),l=S,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,f(a,l)},render:x,addToRenderList:m}}function VM(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,o=!1;function a(v,D,k,W,Z){let B=!1,P=u(W,k,D);r!==P&&(r=P,c(r.object)),B=p(v,W,k,Z),B&&g(v,W,k,Z),Z!==null&&t.update(Z,n.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,_(v,D,k,W),Z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function l(){return n.createVertexArray()}function c(v){return n.bindVertexArray(v)}function h(v){return n.deleteVertexArray(v)}function u(v,D,k){let W=k.wireframe===!0,Z=i[v.id];Z===void 0&&(Z={},i[v.id]=Z);let B=Z[D.id];B===void 0&&(B={},Z[D.id]=B);let P=B[W];return P===void 0&&(P=d(l()),B[W]=P),P}function d(v){let D=[],k=[],W=[];for(let Z=0;Z<e;Z++)D[Z]=0,k[Z]=0,W[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:k,attributeDivisors:W,object:v,attributes:{},index:null}}function p(v,D,k,W){let Z=r.attributes,B=D.attributes,P=0,H=k.getAttributes();for(let R in H)if(H[R].location>=0){let U=Z[R],X=B[R];if(X===void 0&&(R==="instanceMatrix"&&v.instanceMatrix&&(X=v.instanceMatrix),R==="instanceColor"&&v.instanceColor&&(X=v.instanceColor)),U===void 0||U.attribute!==X||X&&U.data!==X.data)return!0;P++}return r.attributesNum!==P||r.index!==W}function g(v,D,k,W){let Z={},B=D.attributes,P=0,H=k.getAttributes();for(let R in H)if(H[R].location>=0){let U=B[R];U===void 0&&(R==="instanceMatrix"&&v.instanceMatrix&&(U=v.instanceMatrix),R==="instanceColor"&&v.instanceColor&&(U=v.instanceColor));let X={};X.attribute=U,U&&U.data&&(X.data=U.data),Z[R]=X,P++}r.attributes=Z,r.attributesNum=P,r.index=W}function x(){let v=r.newAttributes;for(let D=0,k=v.length;D<k;D++)v[D]=0}function m(v){f(v,0)}function f(v,D){let k=r.newAttributes,W=r.enabledAttributes,Z=r.attributeDivisors;k[v]=1,W[v]===0&&(n.enableVertexAttribArray(v),W[v]=1),Z[v]!==D&&(n.vertexAttribDivisor(v,D),Z[v]=D)}function b(){let v=r.newAttributes,D=r.enabledAttributes;for(let k=0,W=D.length;k<W;k++)D[k]!==v[k]&&(n.disableVertexAttribArray(k),D[k]=0)}function S(v,D,k,W,Z,B,P){P===!0?n.vertexAttribIPointer(v,D,k,Z,B):n.vertexAttribPointer(v,D,k,W,Z,B)}function _(v,D,k,W){x();let Z=W.attributes,B=k.getAttributes(),P=D.defaultAttributeValues;for(let H in B){let R=B[H];if(R.location>=0){let L=Z[H];if(L===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(L=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(L=v.instanceColor)),L!==void 0){let U=L.normalized,X=L.itemSize,j=t.get(L);if(j===void 0)continue;let ot=j.buffer,V=j.type,Y=j.bytesPerElement,tt=V===n.INT||V===n.UNSIGNED_INT||L.gpuType===Vu;if(L.isInterleavedBufferAttribute){let it=L.data,ut=it.stride,ht=L.offset;if(it.isInstancedInterleavedBuffer){for(let lt=0;lt<R.locationSize;lt++)f(R.location+lt,it.meshPerAttribute);v.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let lt=0;lt<R.locationSize;lt++)m(R.location+lt);n.bindBuffer(n.ARRAY_BUFFER,ot);for(let lt=0;lt<R.locationSize;lt++)S(R.location+lt,X/R.locationSize,V,U,ut*Y,(ht+X/R.locationSize*lt)*Y,tt)}else{if(L.isInstancedBufferAttribute){for(let it=0;it<R.locationSize;it++)f(R.location+it,L.meshPerAttribute);v.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=L.meshPerAttribute*L.count)}else for(let it=0;it<R.locationSize;it++)m(R.location+it);n.bindBuffer(n.ARRAY_BUFFER,ot);for(let it=0;it<R.locationSize;it++)S(R.location+it,X/R.locationSize,V,U,X*Y,X/R.locationSize*it*Y,tt)}}else if(P!==void 0){let U=P[H];if(U!==void 0)switch(U.length){case 2:n.vertexAttrib2fv(R.location,U);break;case 3:n.vertexAttrib3fv(R.location,U);break;case 4:n.vertexAttrib4fv(R.location,U);break;default:n.vertexAttrib1fv(R.location,U)}}}}b()}function w(){I();for(let v in i){let D=i[v];for(let k in D){let W=D[k];for(let Z in W)h(W[Z].object),delete W[Z];delete D[k]}delete i[v]}}function E(v){if(i[v.id]===void 0)return;let D=i[v.id];for(let k in D){let W=D[k];for(let Z in W)h(W[Z].object),delete W[Z];delete D[k]}delete i[v.id]}function C(v){for(let D in i){let k=i[D];if(k[v.id]===void 0)continue;let W=k[v.id];for(let Z in W)h(W[Z].object),delete W[Z];delete k[v.id]}}function I(){M(),o=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:M,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:b}}function zM(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,i,1)}function l(c,h,u,d){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function kM(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==_n&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let I=C===_o&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==ii&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==ti&&!I)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,E=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:_,vertexTextures:w,maxSamples:E}}function HM(n){let t=this,e=null,i=0,s=!1,r=!1,o=new Qn,a=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||i!==0||s;return s=d,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let b=r?0:i,S=b*4,_=f.clippingState||null;l.value=_,_=h(g,d,S,p);for(let w=0;w!==S;++w)_[w]=e[w];f.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,p,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let f=p+x*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,_=p;S!==x;++S,_+=4)o.copy(u[S]).applyMatrix4(b,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function GM(n){let t=new WeakMap;function e(o,a){return a===Rh?o.mapping=ur:a===Ph&&(o.mapping=dr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Rh||a===Ph)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new du(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var bl=class extends Ml{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},rr=4,cm=[.125,.215,.35,.446,.526,.582],ji=20,oh=new bl,hm=new Ht,ah=null,lh=0,ch=0,hh=!1,Ji=(1+Math.sqrt(5))/2,tr=1/Ji,um=[new N(-Ji,tr,0),new N(Ji,tr,0),new N(-tr,0,Ji),new N(tr,0,Ji),new N(0,Ji,-tr),new N(0,Ji,tr),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],Tl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){ah=this._renderer.getRenderTarget(),lh=this._renderer.getActiveCubeFace(),ch=this._renderer.getActiveMipmapLevel(),hh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ah,lh,ch),this._renderer.xr.enabled=hh,t.scissorTest=!1,qa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ur||t.mapping===dr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ah=this._renderer.getRenderTarget(),lh=this._renderer.getActiveCubeFace(),ch=this._renderer.getActiveMipmapLevel(),hh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Dn,minFilter:Dn,generateMipmaps:!1,type:_o,format:_n,colorSpace:Cr,depthBuffer:!1},s=dm(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dm(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=WM(r)),this._blurMaterial=XM(r,t,e)}return s}_compileMaterial(t){let e=new $t(this._lodPlanes[0],t);this._renderer.compile(e,oh)}_sceneToCubeUV(t,e,i,s){let a=new Re(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(hm),h.toneMapping=Ri,h.autoClear=!1;let p=new os({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1}),g=new $t(new Nn,p),x=!1,m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,x=!0):(p.color.copy(hm),x=!0);for(let f=0;f<6;f++){let b=f%3;b===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):b===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));let S=this._cubeSize;qa(s,b*S,f>2?S:0,S,S),h.setRenderTarget(s),x&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===ur||t.mapping===dr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=pm()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fm());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new $t(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;qa(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,oh)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=um[(s-r-1)%um.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new $t(this._lodPlanes[s],c),d=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ji-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):ji;m>ji&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ji}`);let f=[],b=0;for(let C=0;C<ji;++C){let I=C/x,M=Math.exp(-I*I/2);f.push(M),C===0?b+=M:C<m&&(b+=2*M)}for(let C=0;C<f.length;C++)f[C]=f[C]/b;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-i;let _=this._sizeLods[s],w=3*_*(s>S-rr?s-S+rr:0),E=4*(this._cubeSize-_);qa(e,w,E,3*_,2*_),l.setRenderTarget(e),l.render(u,oh)}};function WM(n){let t=[],e=[],i=[],s=n,r=n-rr+1+cm.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>n-rr?l=cm[o-n+rr-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,x=3,m=2,f=1,b=new Float32Array(x*g*p),S=new Float32Array(m*g*p),_=new Float32Array(f*g*p);for(let E=0;E<p;E++){let C=E%3*2/3-1,I=E>2?0:-1,M=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];b.set(M,x*g*E),S.set(d,m*g*E);let v=[E,E,E,E,E,E];_.set(v,f*g*E)}let w=new ge;w.setAttribute("position",new Ie(b,x)),w.setAttribute("uv",new Ie(S,m)),w.setAttribute("faceIndex",new Ie(_,f)),t.push(w),s>rr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function dm(n,t,e){let i=new si(n,t,e);return i.texture.mapping=Fl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qa(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function XM(n,t,e){let i=new Float32Array(ji),s=new N(0,1,0);return new Fn({name:"SphericalGaussianBlur",defines:{n:ji,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Xu(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function fm(){return new Fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xu(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function pm(){return new Fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Xu(){return`

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
	`}function YM(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Rh||l===Ph,h=l===ur||l===dr;if(c||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Tl(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let p=a.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new Tl(n)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function qM(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&lo("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function $M(n,t,e,i){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let m=0,f=x.length;m<f;m++)t.remove(x[m])}d.removeEventListener("dispose",o),delete s[d.id];let p=r.get(d);p&&(t.remove(p),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let g in d)t.update(d[g],n.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let x=p[g];for(let m=0,f=x.length;m<f;m++)t.update(x[m],n.ARRAY_BUFFER)}}function c(u){let d=[],p=u.index,g=u.attributes.position,x=0;if(p!==null){let b=p.array;x=p.version;for(let S=0,_=b.length;S<_;S+=3){let w=b[S+0],E=b[S+1],C=b[S+2];d.push(w,E,E,C,C,w)}}else if(g!==void 0){let b=g.array;x=g.version;for(let S=0,_=b.length/3-1;S<_;S+=3){let w=S+0,E=S+1,C=S+2;d.push(w,E,E,C,C,w)}}else return;let m=new(og(d)?vl:yl)(d,1);m.version=x;let f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function ZM(n,t,e){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,p){n.drawElements(i,p,r,d*o),e.update(p,i,1)}function c(d,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,d*o,g),e.update(p,i,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,i,1)}function u(d,p,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/o,p[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,d,0,x,0,g);let f=0;for(let b=0;b<g;b++)f+=p[b]*x[b];e.update(f,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function KM(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function JM(n,t,e){let i=new WeakMap,s=new oe;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(a);if(d===void 0||d.count!==u){let M=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],S=0;p===!0&&(S=1),g===!0&&(S=2),x===!0&&(S=3);let _=a.attributes.position.count*S,w=1;_>t.maxTextureSize&&(w=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let E=new Float32Array(_*w*4*u),C=new xl(E,_,w,u);C.type=ti,C.needsUpdate=!0;let I=S*4;for(let v=0;v<u;v++){let D=m[v],k=f[v],W=b[v],Z=_*w*4*v;for(let B=0;B<D.count;B++){let P=B*I;p===!0&&(s.fromBufferAttribute(D,B),E[Z+P+0]=s.x,E[Z+P+1]=s.y,E[Z+P+2]=s.z,E[Z+P+3]=0),g===!0&&(s.fromBufferAttribute(k,B),E[Z+P+4]=s.x,E[Z+P+5]=s.y,E[Z+P+6]=s.z,E[Z+P+7]=0),x===!0&&(s.fromBufferAttribute(W,B),E[Z+P+8]=s.x,E[Z+P+9]=s.y,E[Z+P+10]=s.z,E[Z+P+11]=W.itemSize===4?s.w:1)}}d={count:u,texture:C,size:new zt(_,w)},i.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function QM(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var El=class extends en{constructor(t,e,i,s,r,o,a,l,c,h=ar){if(h!==ar&&h!==pr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===ar&&(i=is),i===void 0&&h===pr&&(i=fr),super(null,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:yn,this.minFilter=l!==void 0?l:yn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},hg=new en,mm=new El(1,1),ug=new xl,dg=new hu,fg=new Sl,gm=[],xm=[],_m=new Float32Array(16),ym=new Float32Array(9),vm=new Float32Array(4);function Rr(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=gm[s];if(r===void 0&&(r=new Float32Array(s),gm[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ee(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function we(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Bl(n,t){let e=xm[t];e===void 0&&(e=new Int32Array(t),xm[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function jM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function tS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2fv(this.addr,t),we(e,t)}}function eS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;n.uniform3fv(this.addr,t),we(e,t)}}function nS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4fv(this.addr,t),we(e,t)}}function iS(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,i))return;vm.set(i),n.uniformMatrix2fv(this.addr,!1,vm),we(e,i)}}function sS(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,i))return;ym.set(i),n.uniformMatrix3fv(this.addr,!1,ym),we(e,i)}}function rS(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,i))return;_m.set(i),n.uniformMatrix4fv(this.addr,!1,_m),we(e,i)}}function oS(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function aS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2iv(this.addr,t),we(e,t)}}function lS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;n.uniform3iv(this.addr,t),we(e,t)}}function cS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4iv(this.addr,t),we(e,t)}}function hS(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function uS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2uiv(this.addr,t),we(e,t)}}function dS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;n.uniform3uiv(this.addr,t),we(e,t)}}function fS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4uiv(this.addr,t),we(e,t)}}function pS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(mm.compareFunction=rg,r=mm):r=hg,e.setTexture2D(t||r,s)}function mS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||dg,s)}function gS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||fg,s)}function xS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||ug,s)}function _S(n){switch(n){case 5126:return jM;case 35664:return tS;case 35665:return eS;case 35666:return nS;case 35674:return iS;case 35675:return sS;case 35676:return rS;case 5124:case 35670:return oS;case 35667:case 35671:return aS;case 35668:case 35672:return lS;case 35669:case 35673:return cS;case 5125:return hS;case 36294:return uS;case 36295:return dS;case 36296:return fS;case 35678:case 36198:case 36298:case 36306:case 35682:return pS;case 35679:case 36299:case 36307:return mS;case 35680:case 36300:case 36308:case 36293:return gS;case 36289:case 36303:case 36311:case 36292:return xS}}function yS(n,t){n.uniform1fv(this.addr,t)}function vS(n,t){let e=Rr(t,this.size,2);n.uniform2fv(this.addr,e)}function MS(n,t){let e=Rr(t,this.size,3);n.uniform3fv(this.addr,e)}function SS(n,t){let e=Rr(t,this.size,4);n.uniform4fv(this.addr,e)}function bS(n,t){let e=Rr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function TS(n,t){let e=Rr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function ES(n,t){let e=Rr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function wS(n,t){n.uniform1iv(this.addr,t)}function AS(n,t){n.uniform2iv(this.addr,t)}function CS(n,t){n.uniform3iv(this.addr,t)}function RS(n,t){n.uniform4iv(this.addr,t)}function PS(n,t){n.uniform1uiv(this.addr,t)}function IS(n,t){n.uniform2uiv(this.addr,t)}function DS(n,t){n.uniform3uiv(this.addr,t)}function LS(n,t){n.uniform4uiv(this.addr,t)}function US(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),we(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||hg,r[o])}function NS(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),we(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||dg,r[o])}function FS(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),we(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||fg,r[o])}function OS(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),we(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||ug,r[o])}function BS(n){switch(n){case 5126:return yS;case 35664:return vS;case 35665:return MS;case 35666:return SS;case 35674:return bS;case 35675:return TS;case 35676:return ES;case 5124:case 35670:return wS;case 35667:case 35671:return AS;case 35668:case 35672:return CS;case 35669:case 35673:return RS;case 5125:return PS;case 36294:return IS;case 36295:return DS;case 36296:return LS;case 35678:case 36198:case 36298:case 36306:case 35682:return US;case 35679:case 36299:case 36307:return NS;case 35680:case 36300:case 36308:case 36293:return FS;case 36289:case 36303:case 36311:case 36292:return OS}}var fu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=_S(e.type)}},pu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=BS(e.type)}},mu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},uh=/(\w+)(\])?(\[|\.)?/g;function Mm(n,t){n.seq.push(t),n.map[t.id]=t}function VS(n,t,e){let i=n.name,s=i.length;for(uh.lastIndex=0;;){let r=uh.exec(i),o=uh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Mm(e,c===void 0?new fu(a,n,t):new pu(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new mu(a),Mm(e,u)),e=u}}}var cr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);VS(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function Sm(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var zS=37297,kS=0;function HS(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var bm=new Xt;function GS(n){Qt._getMatrix(bm,Qt.workingColorSpace,n);let t=`mat3( ${bm.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(n)){case Ol:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Tm(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+HS(n.getShaderSource(t),o)}else return s}function WS(n,t){let e=GS(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function XS(n,t){let e;switch(t){case g_:e="Linear";break;case x_:e="Reinhard";break;case __:e="Cineon";break;case y_:e="ACESFilmic";break;case M_:e="AgX";break;case S_:e="Neutral";break;case v_:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var $a=new N;function YS(){Qt.getLuminanceCoefficients($a);let n=$a.x.toFixed(4),t=$a.y.toFixed(4),e=$a.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(co).join(`
`)}function $S(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function ZS(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function co(n){return n!==""}function Em(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wm(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var KS=/^[ \t]*#include +<([\w\d./]+)>/gm;function gu(n){return n.replace(KS,QS)}var JS=new Map;function QS(n,t){let e=Yt[t];if(e===void 0){let i=JS.get(t);if(i!==void 0)e=Yt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return gu(e)}var jS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Am(n){return n.replace(jS,tb)}function tb(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Cm(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function eb(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Xm?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Zx?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Jn&&(t="SHADOWMAP_TYPE_VSM"),t}function nb(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ur:case dr:t="ENVMAP_TYPE_CUBE";break;case Fl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ib(n){let t="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===dr&&(t="ENVMAP_MODE_REFRACTION"),t}function sb(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ym:t="ENVMAP_BLENDING_MULTIPLY";break;case p_:t="ENVMAP_BLENDING_MIX";break;case m_:t="ENVMAP_BLENDING_ADD";break}return t}function rb(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function ob(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=eb(e),c=nb(e),h=ib(e),u=sb(e),d=rb(e),p=qS(e),g=$S(r),x=s.createProgram(),m,f,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(co).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(co).join(`
`),f.length>0&&(f+=`
`)):(m=[Cm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(co).join(`
`),f=[Cm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ri?"#define TONE_MAPPING":"",e.toneMapping!==Ri?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Ri?XS("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,WS("linearToOutputTexel",e.outputColorSpace),YS(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(co).join(`
`)),o=gu(o),o=Em(o,e),o=wm(o,e),a=gu(a),a=Em(a,e),a=wm(a,e),o=Am(o),a=Am(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Hp?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Hp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let S=b+m+o,_=b+f+a,w=Sm(s,s.VERTEX_SHADER,S),E=Sm(s,s.FRAGMENT_SHADER,_);s.attachShader(x,w),s.attachShader(x,E),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function C(D){if(n.debug.checkShaderErrors){let k=s.getProgramInfoLog(x).trim(),W=s.getShaderInfoLog(w).trim(),Z=s.getShaderInfoLog(E).trim(),B=!0,P=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(B=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,w,E);else{let H=Tm(s,w,"vertex"),R=Tm(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+k+`
`+H+`
`+R)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(W===""||Z==="")&&(P=!1);P&&(D.diagnostics={runnable:B,programLog:k,vertexShader:{log:W,prefix:m},fragmentShader:{log:Z,prefix:f}})}s.deleteShader(w),s.deleteShader(E),I=new cr(s,x),M=ZS(s,x)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(x,zS)),v},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=kS++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=E,this}var ab=0,xu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new _u(t),e.set(t,i)),i}},_u=class{constructor(t){this.id=ab++,this.code=t,this.usedTimes=0}};function lb(n,t,e,i,s,r,o){let a=new _l,l=new xu,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,v,D,k,W){let Z=k.fog,B=W.geometry,P=M.isMeshStandardMaterial?k.environment:null,H=(M.isMeshStandardMaterial?e:t).get(M.envMap||P),R=H&&H.mapping===Fl?H.image.height:null,L=g[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));let U=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,X=U!==void 0?U.length:0,j=0;B.morphAttributes.position!==void 0&&(j=1),B.morphAttributes.normal!==void 0&&(j=2),B.morphAttributes.color!==void 0&&(j=3);let ot,V,Y,tt;if(L){let ne=Pn[L];ot=ne.vertexShader,V=ne.fragmentShader}else ot=M.vertexShader,V=M.fragmentShader,l.update(M),Y=l.getVertexShaderID(M),tt=l.getFragmentShaderID(M);let it=n.getRenderTarget(),ut=n.state.buffers.depth.getReversed(),ht=W.isInstancedMesh===!0,lt=W.isBatchedMesh===!0,pt=!!M.map,dt=!!M.matcap,Ct=!!H,F=!!M.aoMap,Vt=!!M.lightMap,Et=!!M.bumpMap,Nt=!!M.normalMap,Rt=!!M.displacementMap,qt=!!M.emissiveMap,St=!!M.metalnessMap,A=!!M.roughnessMap,y=M.anisotropy>0,q=M.clearcoat>0,nt=M.dispersion>0,$=M.iridescence>0,K=M.sheen>0,ft=M.transmission>0,rt=y&&!!M.anisotropyMap,xt=q&&!!M.clearcoatMap,wt=q&&!!M.clearcoatNormalMap,at=q&&!!M.clearcoatRoughnessMap,_t=$&&!!M.iridescenceMap,Tt=$&&!!M.iridescenceThicknessMap,Ot=K&&!!M.sheenColorMap,bt=K&&!!M.sheenRoughnessMap,At=!!M.specularMap,Lt=!!M.specularColorMap,le=!!M.specularIntensityMap,O=ft&&!!M.transmissionMap,gt=ft&&!!M.thicknessMap,et=!!M.gradientMap,st=!!M.alphaMap,Mt=M.alphaTest>0,yt=!!M.alphaHash,Gt=!!M.extensions,ye=Ri;M.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(ye=n.toneMapping);let Ue={shaderID:L,shaderType:M.type,shaderName:M.name,vertexShader:ot,fragmentShader:V,defines:M.defines,customVertexShaderID:Y,customFragmentShaderID:tt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:lt,batchingColor:lt&&W._colorsTexture!==null,instancing:ht,instancingColor:ht&&W.instanceColor!==null,instancingMorph:ht&&W.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:it===null?n.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:Cr,alphaToCoverage:!!M.alphaToCoverage,map:pt,matcap:dt,envMap:Ct,envMapMode:Ct&&H.mapping,envMapCubeUVHeight:R,aoMap:F,lightMap:Vt,bumpMap:Et,normalMap:Nt,displacementMap:d&&Rt,emissiveMap:qt,normalMapObjectSpace:Nt&&M.normalMapType===w_,normalMapTangentSpace:Nt&&M.normalMapType===sg,metalnessMap:St,roughnessMap:A,anisotropy:y,anisotropyMap:rt,clearcoat:q,clearcoatMap:xt,clearcoatNormalMap:wt,clearcoatRoughnessMap:at,dispersion:nt,iridescence:$,iridescenceMap:_t,iridescenceThicknessMap:Tt,sheen:K,sheenColorMap:Ot,sheenRoughnessMap:bt,specularMap:At,specularColorMap:Lt,specularIntensityMap:le,transmission:ft,transmissionMap:O,thicknessMap:gt,gradientMap:et,opaque:M.transparent===!1&&M.blending===or&&M.alphaToCoverage===!1,alphaMap:st,alphaTest:Mt,alphaHash:yt,combine:M.combine,mapUv:pt&&x(M.map.channel),aoMapUv:F&&x(M.aoMap.channel),lightMapUv:Vt&&x(M.lightMap.channel),bumpMapUv:Et&&x(M.bumpMap.channel),normalMapUv:Nt&&x(M.normalMap.channel),displacementMapUv:Rt&&x(M.displacementMap.channel),emissiveMapUv:qt&&x(M.emissiveMap.channel),metalnessMapUv:St&&x(M.metalnessMap.channel),roughnessMapUv:A&&x(M.roughnessMap.channel),anisotropyMapUv:rt&&x(M.anisotropyMap.channel),clearcoatMapUv:xt&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:wt&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:Tt&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ot&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:bt&&x(M.sheenRoughnessMap.channel),specularMapUv:At&&x(M.specularMap.channel),specularColorMapUv:Lt&&x(M.specularColorMap.channel),specularIntensityMapUv:le&&x(M.specularIntensityMap.channel),transmissionMapUv:O&&x(M.transmissionMap.channel),thicknessMapUv:gt&&x(M.thicknessMap.channel),alphaMapUv:st&&x(M.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Nt||y),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!B.attributes.uv&&(pt||st),fog:!!Z,useFog:M.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ut,skinning:W.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:X,morphTextureStride:j,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:ye,decodeVideoTexture:pt&&M.map.isVideoTexture===!0&&Qt.getTransfer(M.map.colorSpace)===se,decodeVideoTextureEmissive:qt&&M.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(M.emissiveMap.colorSpace)===se,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===tn,flipSided:M.side===$e,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Gt&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&M.extensions.multiDraw===!0||lt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Ue.vertexUv1s=c.has(1),Ue.vertexUv2s=c.has(2),Ue.vertexUv3s=c.has(3),c.clear(),Ue}function f(M){let v=[];if(M.shaderID?v.push(M.shaderID):(v.push(M.customVertexShaderID),v.push(M.customFragmentShaderID)),M.defines!==void 0)for(let D in M.defines)v.push(D),v.push(M.defines[D]);return M.isRawShaderMaterial===!1&&(b(v,M),S(v,M),v.push(n.outputColorSpace)),v.push(M.customProgramCacheKey),v.join()}function b(M,v){M.push(v.precision),M.push(v.outputColorSpace),M.push(v.envMapMode),M.push(v.envMapCubeUVHeight),M.push(v.mapUv),M.push(v.alphaMapUv),M.push(v.lightMapUv),M.push(v.aoMapUv),M.push(v.bumpMapUv),M.push(v.normalMapUv),M.push(v.displacementMapUv),M.push(v.emissiveMapUv),M.push(v.metalnessMapUv),M.push(v.roughnessMapUv),M.push(v.anisotropyMapUv),M.push(v.clearcoatMapUv),M.push(v.clearcoatNormalMapUv),M.push(v.clearcoatRoughnessMapUv),M.push(v.iridescenceMapUv),M.push(v.iridescenceThicknessMapUv),M.push(v.sheenColorMapUv),M.push(v.sheenRoughnessMapUv),M.push(v.specularMapUv),M.push(v.specularColorMapUv),M.push(v.specularIntensityMapUv),M.push(v.transmissionMapUv),M.push(v.thicknessMapUv),M.push(v.combine),M.push(v.fogExp2),M.push(v.sizeAttenuation),M.push(v.morphTargetsCount),M.push(v.morphAttributeCount),M.push(v.numDirLights),M.push(v.numPointLights),M.push(v.numSpotLights),M.push(v.numSpotLightMaps),M.push(v.numHemiLights),M.push(v.numRectAreaLights),M.push(v.numDirLightShadows),M.push(v.numPointLightShadows),M.push(v.numSpotLightShadows),M.push(v.numSpotLightShadowsWithMaps),M.push(v.numLightProbes),M.push(v.shadowMapType),M.push(v.toneMapping),M.push(v.numClippingPlanes),M.push(v.numClipIntersection),M.push(v.depthPacking)}function S(M,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),M.push(a.mask)}function _(M){let v=g[M.type],D;if(v){let k=Pn[v];D=Q_.clone(k.uniforms)}else D=M.uniforms;return D}function w(M,v){let D;for(let k=0,W=h.length;k<W;k++){let Z=h[k];if(Z.cacheKey===v){D=Z,++D.usedTimes;break}}return D===void 0&&(D=new ob(n,v,M,r),h.push(D)),D}function E(M){if(--M.usedTimes===0){let v=h.indexOf(M);h[v]=h[h.length-1],h.pop(),M.destroy()}}function C(M){l.remove(M)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:_,acquireProgram:w,releaseProgram:E,releaseShaderCache:C,programs:h,dispose:I}}function cb(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function hb(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Rm(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Pm(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,d,p,g,x,m){let f=n[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},n[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=x,f.group=m),t++,f}function a(u,d,p,g,x,m){let f=o(u,d,p,g,x,m);p.transmission>0?i.push(f):p.transparent===!0?s.push(f):e.push(f)}function l(u,d,p,g,x,m){let f=o(u,d,p,g,x,m);p.transmission>0?i.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||hb),i.length>1&&i.sort(d||Rm),s.length>1&&s.sort(d||Rm)}function h(){for(let u=t,d=n.length;u<d;u++){let p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function ub(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new Pm,n.set(i,[o])):s>=r.length?(o=new Pm,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function db(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Ht};break;case"SpotLight":e={position:new N,direction:new N,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new N,halfWidth:new N,halfHeight:new N};break}return n[t.id]=e,e}}}function fb(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var pb=0;function mb(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function gb(n){let t=new db,e=fb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);let s=new N,r=new he,o=new he;function a(c){let h=0,u=0,d=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,b=0,S=0,_=0,w=0,E=0,C=0;c.sort(mb);for(let M=0,v=c.length;M<v;M++){let D=c[M],k=D.color,W=D.intensity,Z=D.distance,B=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=k.r*W,u+=k.g*W,d+=k.b*W;else if(D.isLightProbe){for(let P=0;P<9;P++)i.probe[P].addScaledVector(D.sh.coefficients[P],W);C++}else if(D.isDirectionalLight){let P=t.get(D);if(P.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let H=D.shadow,R=e.get(D);R.shadowIntensity=H.intensity,R.shadowBias=H.bias,R.shadowNormalBias=H.normalBias,R.shadowRadius=H.radius,R.shadowMapSize=H.mapSize,i.directionalShadow[p]=R,i.directionalShadowMap[p]=B,i.directionalShadowMatrix[p]=D.shadow.matrix,b++}i.directional[p]=P,p++}else if(D.isSpotLight){let P=t.get(D);P.position.setFromMatrixPosition(D.matrixWorld),P.color.copy(k).multiplyScalar(W),P.distance=Z,P.coneCos=Math.cos(D.angle),P.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),P.decay=D.decay,i.spot[x]=P;let H=D.shadow;if(D.map&&(i.spotLightMap[w]=D.map,w++,H.updateMatrices(D),D.castShadow&&E++),i.spotLightMatrix[x]=H.matrix,D.castShadow){let R=e.get(D);R.shadowIntensity=H.intensity,R.shadowBias=H.bias,R.shadowNormalBias=H.normalBias,R.shadowRadius=H.radius,R.shadowMapSize=H.mapSize,i.spotShadow[x]=R,i.spotShadowMap[x]=B,_++}x++}else if(D.isRectAreaLight){let P=t.get(D);P.color.copy(k).multiplyScalar(W),P.halfWidth.set(D.width*.5,0,0),P.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=P,m++}else if(D.isPointLight){let P=t.get(D);if(P.color.copy(D.color).multiplyScalar(D.intensity),P.distance=D.distance,P.decay=D.decay,D.castShadow){let H=D.shadow,R=e.get(D);R.shadowIntensity=H.intensity,R.shadowBias=H.bias,R.shadowNormalBias=H.normalBias,R.shadowRadius=H.radius,R.shadowMapSize=H.mapSize,R.shadowCameraNear=H.camera.near,R.shadowCameraFar=H.camera.far,i.pointShadow[g]=R,i.pointShadowMap[g]=B,i.pointShadowMatrix[g]=D.shadow.matrix,S++}i.point[g]=P,g++}else if(D.isHemisphereLight){let P=t.get(D);P.skyColor.copy(D.color).multiplyScalar(W),P.groundColor.copy(D.groundColor).multiplyScalar(W),i.hemi[f]=P,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=mt.LTC_FLOAT_1,i.rectAreaLTC2=mt.LTC_FLOAT_2):(i.rectAreaLTC1=mt.LTC_HALF_1,i.rectAreaLTC2=mt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let I=i.hash;(I.directionalLength!==p||I.pointLength!==g||I.spotLength!==x||I.rectAreaLength!==m||I.hemiLength!==f||I.numDirectionalShadows!==b||I.numPointShadows!==S||I.numSpotShadows!==_||I.numSpotMaps!==w||I.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=_+w-E,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=C,I.directionalLength=p,I.pointLength=g,I.spotLength=x,I.rectAreaLength=m,I.hemiLength=f,I.numDirectionalShadows=b,I.numPointShadows=S,I.numSpotShadows=_,I.numSpotMaps=w,I.numLightProbes=C,i.version=pb++)}function l(c,h){let u=0,d=0,p=0,g=0,x=0,m=h.matrixWorldInverse;for(let f=0,b=c.length;f<b;f++){let S=c[f];if(S.isDirectionalLight){let _=i.directional[u];_.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(S.isSpotLight){let _=i.spot[p];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),p++}else if(S.isRectAreaLight){let _=i.rectArea[g];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(S.width*.5,0,0),_.halfHeight.set(0,S.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){let _=i.point[d];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),d++}else if(S.isHemisphereLight){let _=i.hemi[x];_.direction.setFromMatrixPosition(S.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function Im(n){let t=new gb(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function xb(n){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Im(n),t.set(s,[a])):r>=o.length?(a=new Im(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var yu=class extends Un{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=T_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},vu=class extends Un{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},_b=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yb=`uniform sampler2D shadow_pass;
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
}`;function vb(n,t,e){let i=new po,s=new zt,r=new zt,o=new oe,a=new yu({depthPacking:E_}),l=new vu,c={},h=e.maxTextureSize,u={[Ii]:$e,[$e]:Ii,[tn]:tn},d=new Fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:_b,fragmentShader:yb}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new ge;g.setAttribute("position",new Ie(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new $t(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xm;let f=this.type;this.render=function(E,C,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let M=n.getRenderTarget(),v=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),k=n.state;k.setBlending(Ci),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let W=f!==Jn&&this.type===Jn,Z=f===Jn&&this.type!==Jn;for(let B=0,P=E.length;B<P;B++){let H=E[B],R=H.shadow;if(R===void 0){console.warn("THREE.WebGLShadowMap:",H,"has no shadow.");continue}if(R.autoUpdate===!1&&R.needsUpdate===!1)continue;s.copy(R.mapSize);let L=R.getFrameExtents();if(s.multiply(L),r.copy(R.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/L.x),s.x=r.x*L.x,R.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/L.y),s.y=r.y*L.y,R.mapSize.y=r.y)),R.map===null||W===!0||Z===!0){let X=this.type!==Jn?{minFilter:yn,magFilter:yn}:{};R.map!==null&&R.map.dispose(),R.map=new si(s.x,s.y,X),R.map.texture.name=H.name+".shadowMap",R.camera.updateProjectionMatrix()}n.setRenderTarget(R.map),n.clear();let U=R.getViewportCount();for(let X=0;X<U;X++){let j=R.getViewport(X);o.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),k.viewport(o),R.updateMatrices(H,X),i=R.getFrustum(),_(C,I,R.camera,H,this.type)}R.isPointLightShadow!==!0&&this.type===Jn&&b(R,I),R.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(M,v,D)};function b(E,C){let I=t.update(x);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new si(s.x,s.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(C,null,I,d,x,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(C,null,I,p,x,null)}function S(E,C,I,M){let v=null,D=I.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(D!==void 0)v=D;else if(v=I.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let k=v.uuid,W=C.uuid,Z=c[k];Z===void 0&&(Z={},c[k]=Z);let B=Z[W];B===void 0&&(B=v.clone(),Z[W]=B,C.addEventListener("dispose",w)),v=B}if(v.visible=C.visible,v.wireframe=C.wireframe,M===Jn?v.side=C.shadowSide!==null?C.shadowSide:C.side:v.side=C.shadowSide!==null?C.shadowSide:u[C.side],v.alphaMap=C.alphaMap,v.alphaTest=C.alphaTest,v.map=C.map,v.clipShadows=C.clipShadows,v.clippingPlanes=C.clippingPlanes,v.clipIntersection=C.clipIntersection,v.displacementMap=C.displacementMap,v.displacementScale=C.displacementScale,v.displacementBias=C.displacementBias,v.wireframeLinewidth=C.wireframeLinewidth,v.linewidth=C.linewidth,I.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let k=n.properties.get(v);k.light=I}return v}function _(E,C,I,M,v){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&v===Jn)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,E.matrixWorld);let W=t.update(E),Z=E.material;if(Array.isArray(Z)){let B=W.groups;for(let P=0,H=B.length;P<H;P++){let R=B[P],L=Z[R.materialIndex];if(L&&L.visible){let U=S(E,L,M,v);E.onBeforeShadow(n,E,C,I,W,U,R),n.renderBufferDirect(I,null,W,U,E,R),E.onAfterShadow(n,E,C,I,W,U,R)}}}else if(Z.visible){let B=S(E,Z,M,v);E.onBeforeShadow(n,E,C,I,W,B,null),n.renderBufferDirect(I,null,W,B,E,null),E.onAfterShadow(n,E,C,I,W,B,null)}}let k=E.children;for(let W=0,Z=k.length;W<Z;W++)_(k[W],C,I,M,v)}function w(E){E.target.removeEventListener("dispose",w);for(let I in c){let M=c[I],v=E.target.uuid;v in M&&(M[v].dispose(),delete M[v])}}}var Mb={[Sh]:bh,[Th]:Ah,[Eh]:Ch,[hr]:wh,[bh]:Sh,[Ah]:Th,[Ch]:Eh,[wh]:hr};function Sb(n,t){function e(){let O=!1,gt=new oe,et=null,st=new oe(0,0,0,0);return{setMask:function(Mt){et!==Mt&&!O&&(n.colorMask(Mt,Mt,Mt,Mt),et=Mt)},setLocked:function(Mt){O=Mt},setClear:function(Mt,yt,Gt,ye,Ue){Ue===!0&&(Mt*=ye,yt*=ye,Gt*=ye),gt.set(Mt,yt,Gt,ye),st.equals(gt)===!1&&(n.clearColor(Mt,yt,Gt,ye),st.copy(gt))},reset:function(){O=!1,et=null,st.set(-1,0,0,0)}}}function i(){let O=!1,gt=!1,et=null,st=null,Mt=null;return{setReversed:function(yt){if(gt!==yt){let Gt=t.get("EXT_clip_control");gt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);let ye=Mt;Mt=null,this.setClear(ye)}gt=yt},getReversed:function(){return gt},setTest:function(yt){yt?it(n.DEPTH_TEST):ut(n.DEPTH_TEST)},setMask:function(yt){et!==yt&&!O&&(n.depthMask(yt),et=yt)},setFunc:function(yt){if(gt&&(yt=Mb[yt]),st!==yt){switch(yt){case Sh:n.depthFunc(n.NEVER);break;case bh:n.depthFunc(n.ALWAYS);break;case Th:n.depthFunc(n.LESS);break;case hr:n.depthFunc(n.LEQUAL);break;case Eh:n.depthFunc(n.EQUAL);break;case wh:n.depthFunc(n.GEQUAL);break;case Ah:n.depthFunc(n.GREATER);break;case Ch:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}st=yt}},setLocked:function(yt){O=yt},setClear:function(yt){Mt!==yt&&(gt&&(yt=1-yt),n.clearDepth(yt),Mt=yt)},reset:function(){O=!1,et=null,st=null,Mt=null,gt=!1}}}function s(){let O=!1,gt=null,et=null,st=null,Mt=null,yt=null,Gt=null,ye=null,Ue=null;return{setTest:function(ne){O||(ne?it(n.STENCIL_TEST):ut(n.STENCIL_TEST))},setMask:function(ne){gt!==ne&&!O&&(n.stencilMask(ne),gt=ne)},setFunc:function(ne,dn,zn){(et!==ne||st!==dn||Mt!==zn)&&(n.stencilFunc(ne,dn,zn),et=ne,st=dn,Mt=zn)},setOp:function(ne,dn,zn){(yt!==ne||Gt!==dn||ye!==zn)&&(n.stencilOp(ne,dn,zn),yt=ne,Gt=dn,ye=zn)},setLocked:function(ne){O=ne},setClear:function(ne){Ue!==ne&&(n.clearStencil(ne),Ue=ne)},reset:function(){O=!1,gt=null,et=null,st=null,Mt=null,yt=null,Gt=null,ye=null,Ue=null}}}let r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,p=[],g=null,x=!1,m=null,f=null,b=null,S=null,_=null,w=null,E=null,C=new Ht(0,0,0),I=0,M=!1,v=null,D=null,k=null,W=null,Z=null,B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),P=!1,H=0,R=n.getParameter(n.VERSION);R.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(R)[1]),P=H>=1):R.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(R)[1]),P=H>=2);let L=null,U={},X=n.getParameter(n.SCISSOR_BOX),j=n.getParameter(n.VIEWPORT),ot=new oe().fromArray(X),V=new oe().fromArray(j);function Y(O,gt,et,st){let Mt=new Uint8Array(4),yt=n.createTexture();n.bindTexture(O,yt),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Gt=0;Gt<et;Gt++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(gt,0,n.RGBA,1,1,st,0,n.RGBA,n.UNSIGNED_BYTE,Mt):n.texImage2D(gt+Gt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Mt);return yt}let tt={};tt[n.TEXTURE_2D]=Y(n.TEXTURE_2D,n.TEXTURE_2D,1),tt[n.TEXTURE_CUBE_MAP]=Y(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[n.TEXTURE_2D_ARRAY]=Y(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),tt[n.TEXTURE_3D]=Y(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),it(n.DEPTH_TEST),o.setFunc(hr),Et(!1),Nt(Np),it(n.CULL_FACE),F(Ci);function it(O){h[O]!==!0&&(n.enable(O),h[O]=!0)}function ut(O){h[O]!==!1&&(n.disable(O),h[O]=!1)}function ht(O,gt){return u[O]!==gt?(n.bindFramebuffer(O,gt),u[O]=gt,O===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=gt),O===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=gt),!0):!1}function lt(O,gt){let et=p,st=!1;if(O){et=d.get(gt),et===void 0&&(et=[],d.set(gt,et));let Mt=O.textures;if(et.length!==Mt.length||et[0]!==n.COLOR_ATTACHMENT0){for(let yt=0,Gt=Mt.length;yt<Gt;yt++)et[yt]=n.COLOR_ATTACHMENT0+yt;et.length=Mt.length,st=!0}}else et[0]!==n.BACK&&(et[0]=n.BACK,st=!0);st&&n.drawBuffers(et)}function pt(O){return g!==O?(n.useProgram(O),g=O,!0):!1}let dt={[Qi]:n.FUNC_ADD,[Jx]:n.FUNC_SUBTRACT,[Qx]:n.FUNC_REVERSE_SUBTRACT};dt[jx]=n.MIN,dt[t_]=n.MAX;let Ct={[e_]:n.ZERO,[n_]:n.ONE,[i_]:n.SRC_COLOR,[vh]:n.SRC_ALPHA,[c_]:n.SRC_ALPHA_SATURATE,[a_]:n.DST_COLOR,[r_]:n.DST_ALPHA,[s_]:n.ONE_MINUS_SRC_COLOR,[Mh]:n.ONE_MINUS_SRC_ALPHA,[l_]:n.ONE_MINUS_DST_COLOR,[o_]:n.ONE_MINUS_DST_ALPHA,[h_]:n.CONSTANT_COLOR,[u_]:n.ONE_MINUS_CONSTANT_COLOR,[d_]:n.CONSTANT_ALPHA,[f_]:n.ONE_MINUS_CONSTANT_ALPHA};function F(O,gt,et,st,Mt,yt,Gt,ye,Ue,ne){if(O===Ci){x===!0&&(ut(n.BLEND),x=!1);return}if(x===!1&&(it(n.BLEND),x=!0),O!==Kx){if(O!==m||ne!==M){if((f!==Qi||_!==Qi)&&(n.blendEquation(n.FUNC_ADD),f=Qi,_=Qi),ne)switch(O){case or:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ns:n.blendFunc(n.ONE,n.ONE);break;case Fp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Op:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case or:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ns:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Fp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Op:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}b=null,S=null,w=null,E=null,C.set(0,0,0),I=0,m=O,M=ne}return}Mt=Mt||gt,yt=yt||et,Gt=Gt||st,(gt!==f||Mt!==_)&&(n.blendEquationSeparate(dt[gt],dt[Mt]),f=gt,_=Mt),(et!==b||st!==S||yt!==w||Gt!==E)&&(n.blendFuncSeparate(Ct[et],Ct[st],Ct[yt],Ct[Gt]),b=et,S=st,w=yt,E=Gt),(ye.equals(C)===!1||Ue!==I)&&(n.blendColor(ye.r,ye.g,ye.b,Ue),C.copy(ye),I=Ue),m=O,M=!1}function Vt(O,gt){O.side===tn?ut(n.CULL_FACE):it(n.CULL_FACE);let et=O.side===$e;gt&&(et=!et),Et(et),O.blending===or&&O.transparent===!1?F(Ci):F(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);let st=O.stencilWrite;a.setTest(st),st&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),qt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?it(n.SAMPLE_ALPHA_TO_COVERAGE):ut(n.SAMPLE_ALPHA_TO_COVERAGE)}function Et(O){v!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),v=O)}function Nt(O){O!==qx?(it(n.CULL_FACE),O!==D&&(O===Np?n.cullFace(n.BACK):O===$x?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ut(n.CULL_FACE),D=O}function Rt(O){O!==k&&(P&&n.lineWidth(O),k=O)}function qt(O,gt,et){O?(it(n.POLYGON_OFFSET_FILL),(W!==gt||Z!==et)&&(n.polygonOffset(gt,et),W=gt,Z=et)):ut(n.POLYGON_OFFSET_FILL)}function St(O){O?it(n.SCISSOR_TEST):ut(n.SCISSOR_TEST)}function A(O){O===void 0&&(O=n.TEXTURE0+B-1),L!==O&&(n.activeTexture(O),L=O)}function y(O,gt,et){et===void 0&&(L===null?et=n.TEXTURE0+B-1:et=L);let st=U[et];st===void 0&&(st={type:void 0,texture:void 0},U[et]=st),(st.type!==O||st.texture!==gt)&&(L!==et&&(n.activeTexture(et),L=et),n.bindTexture(O,gt||tt[O]),st.type=O,st.texture=gt)}function q(){let O=U[L];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function nt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function $(){try{n.compressedTexImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function K(){try{n.texSubImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ft(){try{n.texSubImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function rt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function xt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function wt(){try{n.texStorage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function at(){try{n.texStorage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function _t(){try{n.texImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Tt(){try{n.texImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ot(O){ot.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),ot.copy(O))}function bt(O){V.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),V.copy(O))}function At(O,gt){let et=c.get(gt);et===void 0&&(et=new WeakMap,c.set(gt,et));let st=et.get(O);st===void 0&&(st=n.getUniformBlockIndex(gt,O.name),et.set(O,st))}function Lt(O,gt){let st=c.get(gt).get(O);l.get(gt)!==st&&(n.uniformBlockBinding(gt,st,O.__bindingPointIndex),l.set(gt,st))}function le(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},L=null,U={},u={},d=new WeakMap,p=[],g=null,x=!1,m=null,f=null,b=null,S=null,_=null,w=null,E=null,C=new Ht(0,0,0),I=0,M=!1,v=null,D=null,k=null,W=null,Z=null,ot.set(0,0,n.canvas.width,n.canvas.height),V.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:it,disable:ut,bindFramebuffer:ht,drawBuffers:lt,useProgram:pt,setBlending:F,setMaterial:Vt,setFlipSided:Et,setCullFace:Nt,setLineWidth:Rt,setPolygonOffset:qt,setScissorTest:St,activeTexture:A,bindTexture:y,unbindTexture:q,compressedTexImage2D:nt,compressedTexImage3D:$,texImage2D:_t,texImage3D:Tt,updateUBOMapping:At,uniformBlockBinding:Lt,texStorage2D:wt,texStorage3D:at,texSubImage2D:K,texSubImage3D:ft,compressedTexSubImage2D:rt,compressedTexSubImage3D:xt,scissor:Ot,viewport:bt,reset:le}}function Dm(n,t,e,i){let s=bb(i);switch(e){case Jm:return n*t;case jm:return n*t;case tg:return n*t*2;case eg:return n*t/s.components*s.byteLength;case Hu:return n*t/s.components*s.byteLength;case ng:return n*t*2/s.components*s.byteLength;case Gu:return n*t*2/s.components*s.byteLength;case Qm:return n*t*3/s.components*s.byteLength;case _n:return n*t*4/s.components*s.byteLength;case Wu:return n*t*4/s.components*s.byteLength;case al:case ll:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case cl:case hl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Uh:case Fh:return Math.max(n,16)*Math.max(t,8)/4;case Lh:case Nh:return Math.max(n,8)*Math.max(t,8)/2;case Oh:case Bh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Vh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case zh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case kh:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Hh:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Gh:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Wh:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Xh:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Yh:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case qh:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case $h:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Zh:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Kh:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Jh:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Qh:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case jh:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case ul:case tu:case eu:return Math.ceil(n/4)*Math.ceil(t/4)*16;case ig:case nu:return Math.ceil(n/4)*Math.ceil(t/4)*8;case iu:case su:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function bb(n){switch(n){case ii:case $m:return{byteLength:1,components:1};case uo:case Zm:case _o:return{byteLength:2,components:1};case zu:case ku:return{byteLength:2,components:4};case is:case Vu:case ti:return{byteLength:4,components:1};case Km:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Tb(n,t,e,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new zt,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,y){return p?new OffscreenCanvas(A,y):ml("canvas")}function x(A,y,q){let nt=1,$=St(A);if(($.width>q||$.height>q)&&(nt=q/Math.max($.width,$.height)),nt<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let K=Math.floor(nt*$.width),ft=Math.floor(nt*$.height);u===void 0&&(u=g(K,ft));let rt=y?g(K,ft):u;return rt.width=K,rt.height=ft,rt.getContext("2d").drawImage(A,0,0,K,ft),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+K+"x"+ft+")."),rt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),A;return A}function m(A){return A.generateMipmaps}function f(A){n.generateMipmap(A)}function b(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(A,y,q,nt,$=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let K=y;if(y===n.RED&&(q===n.FLOAT&&(K=n.R32F),q===n.HALF_FLOAT&&(K=n.R16F),q===n.UNSIGNED_BYTE&&(K=n.R8)),y===n.RED_INTEGER&&(q===n.UNSIGNED_BYTE&&(K=n.R8UI),q===n.UNSIGNED_SHORT&&(K=n.R16UI),q===n.UNSIGNED_INT&&(K=n.R32UI),q===n.BYTE&&(K=n.R8I),q===n.SHORT&&(K=n.R16I),q===n.INT&&(K=n.R32I)),y===n.RG&&(q===n.FLOAT&&(K=n.RG32F),q===n.HALF_FLOAT&&(K=n.RG16F),q===n.UNSIGNED_BYTE&&(K=n.RG8)),y===n.RG_INTEGER&&(q===n.UNSIGNED_BYTE&&(K=n.RG8UI),q===n.UNSIGNED_SHORT&&(K=n.RG16UI),q===n.UNSIGNED_INT&&(K=n.RG32UI),q===n.BYTE&&(K=n.RG8I),q===n.SHORT&&(K=n.RG16I),q===n.INT&&(K=n.RG32I)),y===n.RGB_INTEGER&&(q===n.UNSIGNED_BYTE&&(K=n.RGB8UI),q===n.UNSIGNED_SHORT&&(K=n.RGB16UI),q===n.UNSIGNED_INT&&(K=n.RGB32UI),q===n.BYTE&&(K=n.RGB8I),q===n.SHORT&&(K=n.RGB16I),q===n.INT&&(K=n.RGB32I)),y===n.RGBA_INTEGER&&(q===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),q===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),q===n.UNSIGNED_INT&&(K=n.RGBA32UI),q===n.BYTE&&(K=n.RGBA8I),q===n.SHORT&&(K=n.RGBA16I),q===n.INT&&(K=n.RGBA32I)),y===n.RGB&&q===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),y===n.RGBA){let ft=$?Ol:Qt.getTransfer(nt);q===n.FLOAT&&(K=n.RGBA32F),q===n.HALF_FLOAT&&(K=n.RGBA16F),q===n.UNSIGNED_BYTE&&(K=ft===se?n.SRGB8_ALPHA8:n.RGBA8),q===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),q===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function _(A,y){let q;return A?y===null||y===is||y===fr?q=n.DEPTH24_STENCIL8:y===ti?q=n.DEPTH32F_STENCIL8:y===uo&&(q=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===is||y===fr?q=n.DEPTH_COMPONENT24:y===ti?q=n.DEPTH_COMPONENT32F:y===uo&&(q=n.DEPTH_COMPONENT16),q}function w(A,y){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==yn&&A.minFilter!==Dn?Math.log2(Math.max(y.width,y.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?y.mipmaps.length:1}function E(A){let y=A.target;y.removeEventListener("dispose",E),I(y),y.isVideoTexture&&h.delete(y)}function C(A){let y=A.target;y.removeEventListener("dispose",C),v(y)}function I(A){let y=i.get(A);if(y.__webglInit===void 0)return;let q=A.source,nt=d.get(q);if(nt){let $=nt[y.__cacheKey];$.usedTimes--,$.usedTimes===0&&M(A),Object.keys(nt).length===0&&d.delete(q)}i.remove(A)}function M(A){let y=i.get(A);n.deleteTexture(y.__webglTexture);let q=A.source,nt=d.get(q);delete nt[y.__cacheKey],o.memory.textures--}function v(A){let y=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(y.__webglFramebuffer[nt]))for(let $=0;$<y.__webglFramebuffer[nt].length;$++)n.deleteFramebuffer(y.__webglFramebuffer[nt][$]);else n.deleteFramebuffer(y.__webglFramebuffer[nt]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[nt])}else{if(Array.isArray(y.__webglFramebuffer))for(let nt=0;nt<y.__webglFramebuffer.length;nt++)n.deleteFramebuffer(y.__webglFramebuffer[nt]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let nt=0;nt<y.__webglColorRenderbuffer.length;nt++)y.__webglColorRenderbuffer[nt]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[nt]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let q=A.textures;for(let nt=0,$=q.length;nt<$;nt++){let K=i.get(q[nt]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),o.memory.textures--),i.remove(q[nt])}i.remove(A)}let D=0;function k(){D=0}function W(){let A=D;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),D+=1,A}function Z(A){let y=[];return y.push(A.wrapS),y.push(A.wrapT),y.push(A.wrapR||0),y.push(A.magFilter),y.push(A.minFilter),y.push(A.anisotropy),y.push(A.internalFormat),y.push(A.format),y.push(A.type),y.push(A.generateMipmaps),y.push(A.premultiplyAlpha),y.push(A.flipY),y.push(A.unpackAlignment),y.push(A.colorSpace),y.join()}function B(A,y){let q=i.get(A);if(A.isVideoTexture&&Rt(A),A.isRenderTargetTexture===!1&&A.version>0&&q.__version!==A.version){let nt=A.image;if(nt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{V(q,A,y);return}}e.bindTexture(n.TEXTURE_2D,q.__webglTexture,n.TEXTURE0+y)}function P(A,y){let q=i.get(A);if(A.version>0&&q.__version!==A.version){V(q,A,y);return}e.bindTexture(n.TEXTURE_2D_ARRAY,q.__webglTexture,n.TEXTURE0+y)}function H(A,y){let q=i.get(A);if(A.version>0&&q.__version!==A.version){V(q,A,y);return}e.bindTexture(n.TEXTURE_3D,q.__webglTexture,n.TEXTURE0+y)}function R(A,y){let q=i.get(A);if(A.version>0&&q.__version!==A.version){Y(q,A,y);return}e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture,n.TEXTURE0+y)}let L={[Ih]:n.REPEAT,[ts]:n.CLAMP_TO_EDGE,[Dh]:n.MIRRORED_REPEAT},U={[yn]:n.NEAREST,[b_]:n.NEAREST_MIPMAP_NEAREST,[Ca]:n.NEAREST_MIPMAP_LINEAR,[Dn]:n.LINEAR,[Oc]:n.LINEAR_MIPMAP_NEAREST,[es]:n.LINEAR_MIPMAP_LINEAR},X={[A_]:n.NEVER,[L_]:n.ALWAYS,[C_]:n.LESS,[rg]:n.LEQUAL,[R_]:n.EQUAL,[D_]:n.GEQUAL,[P_]:n.GREATER,[I_]:n.NOTEQUAL};function j(A,y){if(y.type===ti&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Dn||y.magFilter===Oc||y.magFilter===Ca||y.magFilter===es||y.minFilter===Dn||y.minFilter===Oc||y.minFilter===Ca||y.minFilter===es)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,L[y.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,L[y.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,L[y.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,U[y.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,U[y.minFilter]),y.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,X[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===yn||y.minFilter!==Ca&&y.minFilter!==es||y.type===ti&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let q=t.get("EXT_texture_filter_anisotropic");n.texParameterf(A,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function ot(A,y){let q=!1;A.__webglInit===void 0&&(A.__webglInit=!0,y.addEventListener("dispose",E));let nt=y.source,$=d.get(nt);$===void 0&&($={},d.set(nt,$));let K=Z(y);if(K!==A.__cacheKey){$[K]===void 0&&($[K]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,q=!0),$[K].usedTimes++;let ft=$[A.__cacheKey];ft!==void 0&&($[A.__cacheKey].usedTimes--,ft.usedTimes===0&&M(y)),A.__cacheKey=K,A.__webglTexture=$[K].texture}return q}function V(A,y,q){let nt=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(nt=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(nt=n.TEXTURE_3D);let $=ot(A,y),K=y.source;e.bindTexture(nt,A.__webglTexture,n.TEXTURE0+q);let ft=i.get(K);if(K.version!==ft.__version||$===!0){e.activeTexture(n.TEXTURE0+q);let rt=Qt.getPrimaries(Qt.workingColorSpace),xt=y.colorSpace===Ai?null:Qt.getPrimaries(y.colorSpace),wt=y.colorSpace===Ai||rt===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);let at=x(y.image,!1,s.maxTextureSize);at=qt(y,at);let _t=r.convert(y.format,y.colorSpace),Tt=r.convert(y.type),Ot=S(y.internalFormat,_t,Tt,y.colorSpace,y.isVideoTexture);j(nt,y);let bt,At=y.mipmaps,Lt=y.isVideoTexture!==!0,le=ft.__version===void 0||$===!0,O=K.dataReady,gt=w(y,at);if(y.isDepthTexture)Ot=_(y.format===pr,y.type),le&&(Lt?e.texStorage2D(n.TEXTURE_2D,1,Ot,at.width,at.height):e.texImage2D(n.TEXTURE_2D,0,Ot,at.width,at.height,0,_t,Tt,null));else if(y.isDataTexture)if(At.length>0){Lt&&le&&e.texStorage2D(n.TEXTURE_2D,gt,Ot,At[0].width,At[0].height);for(let et=0,st=At.length;et<st;et++)bt=At[et],Lt?O&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,bt.width,bt.height,_t,Tt,bt.data):e.texImage2D(n.TEXTURE_2D,et,Ot,bt.width,bt.height,0,_t,Tt,bt.data);y.generateMipmaps=!1}else Lt?(le&&e.texStorage2D(n.TEXTURE_2D,gt,Ot,at.width,at.height),O&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,at.width,at.height,_t,Tt,at.data)):e.texImage2D(n.TEXTURE_2D,0,Ot,at.width,at.height,0,_t,Tt,at.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Lt&&le&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,Ot,At[0].width,At[0].height,at.depth);for(let et=0,st=At.length;et<st;et++)if(bt=At[et],y.format!==_n)if(_t!==null)if(Lt){if(O)if(y.layerUpdates.size>0){let Mt=Dm(bt.width,bt.height,y.format,y.type);for(let yt of y.layerUpdates){let Gt=bt.data.subarray(yt*Mt/bt.data.BYTES_PER_ELEMENT,(yt+1)*Mt/bt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,yt,bt.width,bt.height,1,_t,Gt)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,0,bt.width,bt.height,at.depth,_t,bt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,et,Ot,bt.width,bt.height,at.depth,0,bt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Lt?O&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,0,bt.width,bt.height,at.depth,_t,Tt,bt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,et,Ot,bt.width,bt.height,at.depth,0,_t,Tt,bt.data)}else{Lt&&le&&e.texStorage2D(n.TEXTURE_2D,gt,Ot,At[0].width,At[0].height);for(let et=0,st=At.length;et<st;et++)bt=At[et],y.format!==_n?_t!==null?Lt?O&&e.compressedTexSubImage2D(n.TEXTURE_2D,et,0,0,bt.width,bt.height,_t,bt.data):e.compressedTexImage2D(n.TEXTURE_2D,et,Ot,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Lt?O&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,bt.width,bt.height,_t,Tt,bt.data):e.texImage2D(n.TEXTURE_2D,et,Ot,bt.width,bt.height,0,_t,Tt,bt.data)}else if(y.isDataArrayTexture)if(Lt){if(le&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,Ot,at.width,at.height,at.depth),O)if(y.layerUpdates.size>0){let et=Dm(at.width,at.height,y.format,y.type);for(let st of y.layerUpdates){let Mt=at.data.subarray(st*et/at.data.BYTES_PER_ELEMENT,(st+1)*et/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,st,at.width,at.height,1,_t,Tt,Mt)}y.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,_t,Tt,at.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ot,at.width,at.height,at.depth,0,_t,Tt,at.data);else if(y.isData3DTexture)Lt?(le&&e.texStorage3D(n.TEXTURE_3D,gt,Ot,at.width,at.height,at.depth),O&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,_t,Tt,at.data)):e.texImage3D(n.TEXTURE_3D,0,Ot,at.width,at.height,at.depth,0,_t,Tt,at.data);else if(y.isFramebufferTexture){if(le)if(Lt)e.texStorage2D(n.TEXTURE_2D,gt,Ot,at.width,at.height);else{let et=at.width,st=at.height;for(let Mt=0;Mt<gt;Mt++)e.texImage2D(n.TEXTURE_2D,Mt,Ot,et,st,0,_t,Tt,null),et>>=1,st>>=1}}else if(At.length>0){if(Lt&&le){let et=St(At[0]);e.texStorage2D(n.TEXTURE_2D,gt,Ot,et.width,et.height)}for(let et=0,st=At.length;et<st;et++)bt=At[et],Lt?O&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,_t,Tt,bt):e.texImage2D(n.TEXTURE_2D,et,Ot,_t,Tt,bt);y.generateMipmaps=!1}else if(Lt){if(le){let et=St(at);e.texStorage2D(n.TEXTURE_2D,gt,Ot,et.width,et.height)}O&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,_t,Tt,at)}else e.texImage2D(n.TEXTURE_2D,0,Ot,_t,Tt,at);m(y)&&f(nt),ft.__version=K.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function Y(A,y,q){if(y.image.length!==6)return;let nt=ot(A,y),$=y.source;e.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+q);let K=i.get($);if($.version!==K.__version||nt===!0){e.activeTexture(n.TEXTURE0+q);let ft=Qt.getPrimaries(Qt.workingColorSpace),rt=y.colorSpace===Ai?null:Qt.getPrimaries(y.colorSpace),xt=y.colorSpace===Ai||ft===rt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let wt=y.isCompressedTexture||y.image[0].isCompressedTexture,at=y.image[0]&&y.image[0].isDataTexture,_t=[];for(let st=0;st<6;st++)!wt&&!at?_t[st]=x(y.image[st],!0,s.maxCubemapSize):_t[st]=at?y.image[st].image:y.image[st],_t[st]=qt(y,_t[st]);let Tt=_t[0],Ot=r.convert(y.format,y.colorSpace),bt=r.convert(y.type),At=S(y.internalFormat,Ot,bt,y.colorSpace),Lt=y.isVideoTexture!==!0,le=K.__version===void 0||nt===!0,O=$.dataReady,gt=w(y,Tt);j(n.TEXTURE_CUBE_MAP,y);let et;if(wt){Lt&&le&&e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,At,Tt.width,Tt.height);for(let st=0;st<6;st++){et=_t[st].mipmaps;for(let Mt=0;Mt<et.length;Mt++){let yt=et[Mt];y.format!==_n?Ot!==null?Lt?O&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt,0,0,yt.width,yt.height,Ot,yt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt,At,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Lt?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt,0,0,yt.width,yt.height,Ot,bt,yt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt,At,yt.width,yt.height,0,Ot,bt,yt.data)}}}else{if(et=y.mipmaps,Lt&&le){et.length>0&&gt++;let st=St(_t[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,At,st.width,st.height)}for(let st=0;st<6;st++)if(at){Lt?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,_t[st].width,_t[st].height,Ot,bt,_t[st].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,At,_t[st].width,_t[st].height,0,Ot,bt,_t[st].data);for(let Mt=0;Mt<et.length;Mt++){let Gt=et[Mt].image[st].image;Lt?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt+1,0,0,Gt.width,Gt.height,Ot,bt,Gt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt+1,At,Gt.width,Gt.height,0,Ot,bt,Gt.data)}}else{Lt?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Ot,bt,_t[st]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,At,Ot,bt,_t[st]);for(let Mt=0;Mt<et.length;Mt++){let yt=et[Mt];Lt?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt+1,0,0,Ot,bt,yt.image[st]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt+1,At,Ot,bt,yt.image[st])}}}m(y)&&f(n.TEXTURE_CUBE_MAP),K.__version=$.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function tt(A,y,q,nt,$,K){let ft=r.convert(q.format,q.colorSpace),rt=r.convert(q.type),xt=S(q.internalFormat,ft,rt,q.colorSpace),wt=i.get(y),at=i.get(q);if(at.__renderTarget=y,!wt.__hasExternalTextures){let _t=Math.max(1,y.width>>K),Tt=Math.max(1,y.height>>K);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?e.texImage3D($,K,xt,_t,Tt,y.depth,0,ft,rt,null):e.texImage2D($,K,xt,_t,Tt,0,ft,rt,null)}e.bindFramebuffer(n.FRAMEBUFFER,A),Nt(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,nt,$,at.__webglTexture,0,Et(y)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,nt,$,at.__webglTexture,K),e.bindFramebuffer(n.FRAMEBUFFER,null)}function it(A,y,q){if(n.bindRenderbuffer(n.RENDERBUFFER,A),y.depthBuffer){let nt=y.depthTexture,$=nt&&nt.isDepthTexture?nt.type:null,K=_(y.stencilBuffer,$),ft=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=Et(y);Nt(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,rt,K,y.width,y.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,rt,K,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,K,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ft,n.RENDERBUFFER,A)}else{let nt=y.textures;for(let $=0;$<nt.length;$++){let K=nt[$],ft=r.convert(K.format,K.colorSpace),rt=r.convert(K.type),xt=S(K.internalFormat,ft,rt,K.colorSpace),wt=Et(y);q&&Nt(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,wt,xt,y.width,y.height):Nt(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,wt,xt,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,xt,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ut(A,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,A),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let nt=i.get(y.depthTexture);nt.__renderTarget=y,(!nt.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),B(y.depthTexture,0);let $=nt.__webglTexture,K=Et(y);if(y.depthTexture.format===ar)Nt(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0);else if(y.depthTexture.format===pr)Nt(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function ht(A){let y=i.get(A),q=A.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==A.depthTexture){let nt=A.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),nt){let $=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,nt.removeEventListener("dispose",$)};nt.addEventListener("dispose",$),y.__depthDisposeCallback=$}y.__boundDepthTexture=nt}if(A.depthTexture&&!y.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");ut(y.__webglFramebuffer,A)}else if(q){y.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[nt]),y.__webglDepthbuffer[nt]===void 0)y.__webglDepthbuffer[nt]=n.createRenderbuffer(),it(y.__webglDepthbuffer[nt],A,!1);else{let $=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=y.__webglDepthbuffer[nt];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,K)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),it(y.__webglDepthbuffer,A,!1);else{let nt=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,nt,n.RENDERBUFFER,$)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function lt(A,y,q){let nt=i.get(A);y!==void 0&&tt(nt.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),q!==void 0&&ht(A)}function pt(A){let y=A.texture,q=i.get(A),nt=i.get(y);A.addEventListener("dispose",C);let $=A.textures,K=A.isWebGLCubeRenderTarget===!0,ft=$.length>1;if(ft||(nt.__webglTexture===void 0&&(nt.__webglTexture=n.createTexture()),nt.__version=y.version,o.memory.textures++),K){q.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(y.mipmaps&&y.mipmaps.length>0){q.__webglFramebuffer[rt]=[];for(let xt=0;xt<y.mipmaps.length;xt++)q.__webglFramebuffer[rt][xt]=n.createFramebuffer()}else q.__webglFramebuffer[rt]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){q.__webglFramebuffer=[];for(let rt=0;rt<y.mipmaps.length;rt++)q.__webglFramebuffer[rt]=n.createFramebuffer()}else q.__webglFramebuffer=n.createFramebuffer();if(ft)for(let rt=0,xt=$.length;rt<xt;rt++){let wt=i.get($[rt]);wt.__webglTexture===void 0&&(wt.__webglTexture=n.createTexture(),o.memory.textures++)}if(A.samples>0&&Nt(A)===!1){q.__webglMultisampledFramebuffer=n.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let rt=0;rt<$.length;rt++){let xt=$[rt];q.__webglColorRenderbuffer[rt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,q.__webglColorRenderbuffer[rt]);let wt=r.convert(xt.format,xt.colorSpace),at=r.convert(xt.type),_t=S(xt.internalFormat,wt,at,xt.colorSpace,A.isXRRenderTarget===!0),Tt=Et(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Tt,_t,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+rt,n.RENDERBUFFER,q.__webglColorRenderbuffer[rt])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(q.__webglDepthRenderbuffer=n.createRenderbuffer(),it(q.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){e.bindTexture(n.TEXTURE_CUBE_MAP,nt.__webglTexture),j(n.TEXTURE_CUBE_MAP,y);for(let rt=0;rt<6;rt++)if(y.mipmaps&&y.mipmaps.length>0)for(let xt=0;xt<y.mipmaps.length;xt++)tt(q.__webglFramebuffer[rt][xt],A,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt);else tt(q.__webglFramebuffer[rt],A,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);m(y)&&f(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){for(let rt=0,xt=$.length;rt<xt;rt++){let wt=$[rt],at=i.get(wt);e.bindTexture(n.TEXTURE_2D,at.__webglTexture),j(n.TEXTURE_2D,wt),tt(q.__webglFramebuffer,A,wt,n.COLOR_ATTACHMENT0+rt,n.TEXTURE_2D,0),m(wt)&&f(n.TEXTURE_2D)}e.unbindTexture()}else{let rt=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(rt=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(rt,nt.__webglTexture),j(rt,y),y.mipmaps&&y.mipmaps.length>0)for(let xt=0;xt<y.mipmaps.length;xt++)tt(q.__webglFramebuffer[xt],A,y,n.COLOR_ATTACHMENT0,rt,xt);else tt(q.__webglFramebuffer,A,y,n.COLOR_ATTACHMENT0,rt,0);m(y)&&f(rt),e.unbindTexture()}A.depthBuffer&&ht(A)}function dt(A){let y=A.textures;for(let q=0,nt=y.length;q<nt;q++){let $=y[q];if(m($)){let K=b(A),ft=i.get($).__webglTexture;e.bindTexture(K,ft),f(K),e.unbindTexture()}}}let Ct=[],F=[];function Vt(A){if(A.samples>0){if(Nt(A)===!1){let y=A.textures,q=A.width,nt=A.height,$=n.COLOR_BUFFER_BIT,K=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ft=i.get(A),rt=y.length>1;if(rt)for(let xt=0;xt<y.length;xt++)e.bindFramebuffer(n.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ft.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ft.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ft.__webglFramebuffer);for(let xt=0;xt<y.length;xt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),rt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ft.__webglColorRenderbuffer[xt]);let wt=i.get(y[xt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,wt,0)}n.blitFramebuffer(0,0,q,nt,0,0,q,nt,$,n.NEAREST),l===!0&&(Ct.length=0,F.length=0,Ct.push(n.COLOR_ATTACHMENT0+xt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ct.push(K),F.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,F)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ct))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),rt)for(let xt=0;xt<y.length;xt++){e.bindFramebuffer(n.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,ft.__webglColorRenderbuffer[xt]);let wt=i.get(y[xt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ft.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,wt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ft.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let y=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function Et(A){return Math.min(s.maxSamples,A.samples)}function Nt(A){let y=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Rt(A){let y=o.render.frame;h.get(A)!==y&&(h.set(A,y),A.update())}function qt(A,y){let q=A.colorSpace,nt=A.format,$=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||q!==Cr&&q!==Ai&&(Qt.getTransfer(q)===se?(nt!==_n||$!==ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),y}function St(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=k,this.setTexture2D=B,this.setTexture2DArray=P,this.setTexture3D=H,this.setTextureCube=R,this.rebindTextures=lt,this.setupRenderTarget=pt,this.updateRenderTargetMipmap=dt,this.updateMultisampleRenderTarget=Vt,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=Nt}function Eb(n,t){function e(i,s=Ai){let r,o=Qt.getTransfer(s);if(i===ii)return n.UNSIGNED_BYTE;if(i===zu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ku)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Km)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===$m)return n.BYTE;if(i===Zm)return n.SHORT;if(i===uo)return n.UNSIGNED_SHORT;if(i===Vu)return n.INT;if(i===is)return n.UNSIGNED_INT;if(i===ti)return n.FLOAT;if(i===_o)return n.HALF_FLOAT;if(i===Jm)return n.ALPHA;if(i===Qm)return n.RGB;if(i===_n)return n.RGBA;if(i===jm)return n.LUMINANCE;if(i===tg)return n.LUMINANCE_ALPHA;if(i===ar)return n.DEPTH_COMPONENT;if(i===pr)return n.DEPTH_STENCIL;if(i===eg)return n.RED;if(i===Hu)return n.RED_INTEGER;if(i===ng)return n.RG;if(i===Gu)return n.RG_INTEGER;if(i===Wu)return n.RGBA_INTEGER;if(i===al||i===ll||i===cl||i===hl)if(o===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===al)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ll)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===cl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===hl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===al)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ll)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===cl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===hl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Lh||i===Uh||i===Nh||i===Fh)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Lh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Uh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Nh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Fh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Oh||i===Bh||i===Vh)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Oh||i===Bh)return o===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Vh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===zh||i===kh||i===Hh||i===Gh||i===Wh||i===Xh||i===Yh||i===qh||i===$h||i===Zh||i===Kh||i===Jh||i===Qh||i===jh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===zh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===kh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Hh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Gh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Wh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Xh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Yh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===qh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===$h)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Zh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Kh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Jh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Qh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===jh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ul||i===tu||i===eu)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===ul)return o===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===tu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===eu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ig||i===nu||i===iu||i===su)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===ul)return r.COMPRESSED_RED_RGTC1_EXT;if(i===nu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===iu)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===su)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===fr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var Mu=class extends Re{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Ve=class extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}},wb={type:"move"},ho=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ve,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ve,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ve,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,i),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(wb)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Ve;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Ab=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cb=`
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

}`,Su=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new en,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Fn({vertexShader:Ab,fragmentShader:Cb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new $t(new gr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},bu=class extends Di{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null,x=new Su,m=e.getContextAttributes(),f=null,b=null,S=[],_=[],w=new zt,E=null,C=new Re;C.viewport=new oe;let I=new Re;I.viewport=new oe;let M=[C,I],v=new Mu,D=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let Y=S[V];return Y===void 0&&(Y=new ho,S[V]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(V){let Y=S[V];return Y===void 0&&(Y=new ho,S[V]=Y),Y.getGripSpace()},this.getHand=function(V){let Y=S[V];return Y===void 0&&(Y=new ho,S[V]=Y),Y.getHandSpace()};function W(V){let Y=_.indexOf(V.inputSource);if(Y===-1)return;let tt=S[Y];tt!==void 0&&(tt.update(V.inputSource,V.frame,c||o),tt.dispatchEvent({type:V.type,data:V.inputSource}))}function Z(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",B);for(let V=0;V<S.length;V++){let Y=_[V];Y!==null&&(_[V]=null,S[V].disconnect(Y))}D=null,k=null,x.reset(),t.setRenderTarget(f),p=null,d=null,u=null,s=null,b=null,ot.stop(),i.isPresenting=!1,t.setPixelRatio(E),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",B),m.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(w),s.renderState.layers===void 0){let Y={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,Y),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new si(p.framebufferWidth,p.framebufferHeight,{format:_n,type:ii,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let Y=null,tt=null,it=null;m.depth&&(it=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Y=m.stencil?pr:ar,tt=m.stencil?fr:is);let ut={colorFormat:e.RGBA8,depthFormat:it,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(ut),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new si(d.textureWidth,d.textureHeight,{format:_n,type:ii,depthTexture:new El(d.textureWidth,d.textureHeight,tt,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ot.setContext(s),ot.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function B(V){for(let Y=0;Y<V.removed.length;Y++){let tt=V.removed[Y],it=_.indexOf(tt);it>=0&&(_[it]=null,S[it].disconnect(tt))}for(let Y=0;Y<V.added.length;Y++){let tt=V.added[Y],it=_.indexOf(tt);if(it===-1){for(let ht=0;ht<S.length;ht++)if(ht>=_.length){_.push(tt),it=ht;break}else if(_[ht]===null){_[ht]=tt,it=ht;break}if(it===-1)break}let ut=S[it];ut&&ut.connect(tt)}}let P=new N,H=new N;function R(V,Y,tt){P.setFromMatrixPosition(Y.matrixWorld),H.setFromMatrixPosition(tt.matrixWorld);let it=P.distanceTo(H),ut=Y.projectionMatrix.elements,ht=tt.projectionMatrix.elements,lt=ut[14]/(ut[10]-1),pt=ut[14]/(ut[10]+1),dt=(ut[9]+1)/ut[5],Ct=(ut[9]-1)/ut[5],F=(ut[8]-1)/ut[0],Vt=(ht[8]+1)/ht[0],Et=lt*F,Nt=lt*Vt,Rt=it/(-F+Vt),qt=Rt*-F;if(Y.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(qt),V.translateZ(Rt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),ut[10]===-1)V.projectionMatrix.copy(Y.projectionMatrix),V.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{let St=lt+Rt,A=pt+Rt,y=Et-qt,q=Nt+(it-qt),nt=dt*pt/A*St,$=Ct*pt/A*St;V.projectionMatrix.makePerspective(y,q,nt,$,St,A),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function L(V,Y){Y===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(Y.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let Y=V.near,tt=V.far;x.texture!==null&&(x.depthNear>0&&(Y=x.depthNear),x.depthFar>0&&(tt=x.depthFar)),v.near=I.near=C.near=Y,v.far=I.far=C.far=tt,(D!==v.near||k!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),D=v.near,k=v.far),C.layers.mask=V.layers.mask|2,I.layers.mask=V.layers.mask|4,v.layers.mask=C.layers.mask|I.layers.mask;let it=V.parent,ut=v.cameras;L(v,it);for(let ht=0;ht<ut.length;ht++)L(ut[ht],it);ut.length===2?R(v,C,I):v.projectionMatrix.copy(C.projectionMatrix),U(V,v,it)};function U(V,Y,tt){tt===null?V.matrix.copy(Y.matrixWorld):(V.matrix.copy(tt.matrixWorld),V.matrix.invert(),V.matrix.multiply(Y.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(Y.projectionMatrix),V.projectionMatrixInverse.copy(Y.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=au*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(V){l=V,d!==null&&(d.fixedFoveation=V),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=V)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(v)};let X=null;function j(V,Y){if(h=Y.getViewerPose(c||o),g=Y,h!==null){let tt=h.views;p!==null&&(t.setRenderTargetFramebuffer(b,p.framebuffer),t.setRenderTarget(b));let it=!1;tt.length!==v.cameras.length&&(v.cameras.length=0,it=!0);for(let ht=0;ht<tt.length;ht++){let lt=tt[ht],pt=null;if(p!==null)pt=p.getViewport(lt);else{let Ct=u.getViewSubImage(d,lt);pt=Ct.viewport,ht===0&&(t.setRenderTargetTextures(b,Ct.colorTexture,d.ignoreDepthValues?void 0:Ct.depthStencilTexture),t.setRenderTarget(b))}let dt=M[ht];dt===void 0&&(dt=new Re,dt.layers.enable(ht),dt.viewport=new oe,M[ht]=dt),dt.matrix.fromArray(lt.transform.matrix),dt.matrix.decompose(dt.position,dt.quaternion,dt.scale),dt.projectionMatrix.fromArray(lt.projectionMatrix),dt.projectionMatrixInverse.copy(dt.projectionMatrix).invert(),dt.viewport.set(pt.x,pt.y,pt.width,pt.height),ht===0&&(v.matrix.copy(dt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),it===!0&&v.cameras.push(dt)}let ut=s.enabledFeatures;if(ut&&ut.includes("depth-sensing")){let ht=u.getDepthInformation(tt[0]);ht&&ht.isValid&&ht.texture&&x.init(t,ht,s.renderState)}}for(let tt=0;tt<S.length;tt++){let it=_[tt],ut=S[tt];it!==null&&ut!==void 0&&ut.update(it,Y,c||o)}X&&X(V,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}let ot=new cg;ot.setAnimationLoop(j),this.setAnimationLoop=function(V){X=V},this.dispose=function(){}}},Ki=new Ln,Rb=new he;function Pb(n,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,lg(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,b,S,_){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,_)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,b,S):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===$e&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===$e&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let b=t.get(f),S=b.envMap,_=b.envMapRotation;S&&(m.envMap.value=S,Ki.copy(_),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),m.envMapRotation.value.setFromMatrix4(Rb.makeRotationFromEuler(Ki)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,b,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*b,m.scale.value=S*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,b){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===$e&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){let b=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Ib(n,t,e,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){let _=S.program;i.uniformBlockBinding(b,_)}function c(b,S){let _=s[b.id];_===void 0&&(g(b),_=h(b),s[b.id]=_,b.addEventListener("dispose",m));let w=S.program;i.updateUBOMapping(b,w);let E=t.render.frame;r[b.id]!==E&&(d(b),r[b.id]=E)}function h(b){let S=u();b.__bindingPointIndex=S;let _=n.createBuffer(),w=b.__size,E=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,w,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,_),_}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){let S=s[b.id],_=b.uniforms,w=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let E=0,C=_.length;E<C;E++){let I=Array.isArray(_[E])?_[E]:[_[E]];for(let M=0,v=I.length;M<v;M++){let D=I[M];if(p(D,E,M,w)===!0){let k=D.__offset,W=Array.isArray(D.value)?D.value:[D.value],Z=0;for(let B=0;B<W.length;B++){let P=W[B],H=x(P);typeof P=="number"||typeof P=="boolean"?(D.__data[0]=P,n.bufferSubData(n.UNIFORM_BUFFER,k+Z,D.__data)):P.isMatrix3?(D.__data[0]=P.elements[0],D.__data[1]=P.elements[1],D.__data[2]=P.elements[2],D.__data[3]=0,D.__data[4]=P.elements[3],D.__data[5]=P.elements[4],D.__data[6]=P.elements[5],D.__data[7]=0,D.__data[8]=P.elements[6],D.__data[9]=P.elements[7],D.__data[10]=P.elements[8],D.__data[11]=0):(P.toArray(D.__data,Z),Z+=H.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(b,S,_,w){let E=b.value,C=S+"_"+_;if(w[C]===void 0)return typeof E=="number"||typeof E=="boolean"?w[C]=E:w[C]=E.clone(),!0;{let I=w[C];if(typeof E=="number"||typeof E=="boolean"){if(I!==E)return w[C]=E,!0}else if(I.equals(E)===!1)return I.copy(E),!0}return!1}function g(b){let S=b.uniforms,_=0,w=16;for(let C=0,I=S.length;C<I;C++){let M=Array.isArray(S[C])?S[C]:[S[C]];for(let v=0,D=M.length;v<D;v++){let k=M[v],W=Array.isArray(k.value)?k.value:[k.value];for(let Z=0,B=W.length;Z<B;Z++){let P=W[Z],H=x(P),R=_%w,L=R%H.boundary,U=R+L;_+=L,U!==0&&w-U<H.storage&&(_+=w-U),k.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=_,_+=H.storage}}}let E=_%w;return E>0&&(_+=w-E),b.__size=_,b.__cache={},this}function x(b){let S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){let S=b.target;S.removeEventListener("dispose",m);let _=o.indexOf(S.__bindingPointIndex);o.splice(_,1),n.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function f(){for(let b in s)n.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}var xr=class{constructor(t={}){let{canvas:e=N_(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,f=null,b=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ln,this.toneMapping=Ri,this.toneMappingExposure=1;let _=this,w=!1,E=0,C=0,I=null,M=-1,v=null,D=new oe,k=new oe,W=null,Z=new Ht(0),B=0,P=e.width,H=e.height,R=1,L=null,U=null,X=new oe(0,0,P,H),j=new oe(0,0,P,H),ot=!1,V=new po,Y=!1,tt=!1,it=new he,ut=new he,ht=new N,lt=new oe,pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},dt=!1;function Ct(){return I===null?R:1}let F=i;function Vt(T,z){return e.getContext(T,z)}try{let T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",st,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",yt,!1),F===null){let z="webgl2";if(F=Vt(z,T),F===null)throw Vt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Et,Nt,Rt,qt,St,A,y,q,nt,$,K,ft,rt,xt,wt,at,_t,Tt,Ot,bt,At,Lt,le,O;function gt(){Et=new qM(F),Et.init(),Lt=new Eb(F,Et),Nt=new kM(F,Et,t,Lt),Rt=new Sb(F,Et),Nt.reverseDepthBuffer&&d&&Rt.buffers.depth.setReversed(!0),qt=new KM(F),St=new cb,A=new Tb(F,Et,Rt,St,Nt,Lt,qt),y=new GM(_),q=new YM(_),nt=new iy(F),le=new VM(F,nt),$=new $M(F,nt,qt,le),K=new QM(F,$,nt,qt),Ot=new JM(F,Nt,A),at=new HM(St),ft=new lb(_,y,q,Et,Nt,le,at),rt=new Pb(_,St),xt=new ub,wt=new xb(Et),Tt=new BM(_,y,q,Rt,K,p,l),_t=new vb(_,K,Nt),O=new Ib(F,qt,Nt,Rt),bt=new zM(F,Et,qt),At=new ZM(F,Et,qt),qt.programs=ft.programs,_.capabilities=Nt,_.extensions=Et,_.properties=St,_.renderLists=xt,_.shadowMap=_t,_.state=Rt,_.info=qt}gt();let et=new bu(_,F);this.xr=et,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let T=Et.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=Et.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return R},this.setPixelRatio=function(T){T!==void 0&&(R=T,this.setSize(P,H,!1))},this.getSize=function(T){return T.set(P,H)},this.setSize=function(T,z,J=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=T,H=z,e.width=Math.floor(T*R),e.height=Math.floor(z*R),J===!0&&(e.style.width=T+"px",e.style.height=z+"px"),this.setViewport(0,0,T,z)},this.getDrawingBufferSize=function(T){return T.set(P*R,H*R).floor()},this.setDrawingBufferSize=function(T,z,J){P=T,H=z,R=J,e.width=Math.floor(T*J),e.height=Math.floor(z*J),this.setViewport(0,0,T,z)},this.getCurrentViewport=function(T){return T.copy(D)},this.getViewport=function(T){return T.copy(X)},this.setViewport=function(T,z,J,Q){T.isVector4?X.set(T.x,T.y,T.z,T.w):X.set(T,z,J,Q),Rt.viewport(D.copy(X).multiplyScalar(R).round())},this.getScissor=function(T){return T.copy(j)},this.setScissor=function(T,z,J,Q){T.isVector4?j.set(T.x,T.y,T.z,T.w):j.set(T,z,J,Q),Rt.scissor(k.copy(j).multiplyScalar(R).round())},this.getScissorTest=function(){return ot},this.setScissorTest=function(T){Rt.setScissorTest(ot=T)},this.setOpaqueSort=function(T){L=T},this.setTransparentSort=function(T){U=T},this.getClearColor=function(T){return T.copy(Tt.getClearColor())},this.setClearColor=function(){Tt.setClearColor.apply(Tt,arguments)},this.getClearAlpha=function(){return Tt.getClearAlpha()},this.setClearAlpha=function(){Tt.setClearAlpha.apply(Tt,arguments)},this.clear=function(T=!0,z=!0,J=!0){let Q=0;if(T){let G=!1;if(I!==null){let ct=I.texture.format;G=ct===Wu||ct===Gu||ct===Hu}if(G){let ct=I.texture.type,vt=ct===ii||ct===is||ct===uo||ct===fr||ct===zu||ct===ku,Pt=Tt.getClearColor(),It=Tt.getClearAlpha(),Bt=Pt.r,Wt=Pt.g,Dt=Pt.b;vt?(g[0]=Bt,g[1]=Wt,g[2]=Dt,g[3]=It,F.clearBufferuiv(F.COLOR,0,g)):(x[0]=Bt,x[1]=Wt,x[2]=Dt,x[3]=It,F.clearBufferiv(F.COLOR,0,x))}else Q|=F.COLOR_BUFFER_BIT}z&&(Q|=F.DEPTH_BUFFER_BIT),J&&(Q|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",yt,!1),xt.dispose(),wt.dispose(),St.dispose(),y.dispose(),q.dispose(),K.dispose(),le.dispose(),O.dispose(),ft.dispose(),et.dispose(),et.removeEventListener("sessionstart",vd),et.removeEventListener("sessionend",Md),zi.stop()};function st(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;let T=qt.autoReset,z=_t.enabled,J=_t.autoUpdate,Q=_t.needsUpdate,G=_t.type;gt(),qt.autoReset=T,_t.enabled=z,_t.autoUpdate=J,_t.needsUpdate=Q,_t.type=G}function yt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Gt(T){let z=T.target;z.removeEventListener("dispose",Gt),ye(z)}function ye(T){Ue(T),St.remove(T)}function Ue(T){let z=St.get(T).programs;z!==void 0&&(z.forEach(function(J){ft.releaseProgram(J)}),T.isShaderMaterial&&ft.releaseShaderCache(T))}this.renderBufferDirect=function(T,z,J,Q,G,ct){z===null&&(z=pt);let vt=G.isMesh&&G.matrixWorld.determinant()<0,Pt=l0(T,z,J,Q,G);Rt.setMaterial(Q,vt);let It=J.index,Bt=1;if(Q.wireframe===!0){if(It=$.getWireframeAttribute(J),It===void 0)return;Bt=2}let Wt=J.drawRange,Dt=J.attributes.position,jt=Wt.start*Bt,ce=(Wt.start+Wt.count)*Bt;ct!==null&&(jt=Math.max(jt,ct.start*Bt),ce=Math.min(ce,(ct.start+ct.count)*Bt)),It!==null?(jt=Math.max(jt,0),ce=Math.min(ce,It.count)):Dt!=null&&(jt=Math.max(jt,0),ce=Math.min(ce,Dt.count));let ue=ce-jt;if(ue<0||ue===1/0)return;le.setup(G,Q,Pt,J,It);let Ye,te=bt;if(It!==null&&(Ye=nt.get(It),te=At,te.setIndex(Ye)),G.isMesh)Q.wireframe===!0?(Rt.setLineWidth(Q.wireframeLinewidth*Ct()),te.setMode(F.LINES)):te.setMode(F.TRIANGLES);else if(G.isLine){let Ut=Q.linewidth;Ut===void 0&&(Ut=1),Rt.setLineWidth(Ut*Ct()),G.isLineSegments?te.setMode(F.LINES):G.isLineLoop?te.setMode(F.LINE_LOOP):te.setMode(F.LINE_STRIP)}else G.isPoints?te.setMode(F.POINTS):G.isSprite&&te.setMode(F.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)te.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(Et.get("WEBGL_multi_draw"))te.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Ut=G._multiDrawStarts,kn=G._multiDrawCounts,ee=G._multiDrawCount,fn=It?nt.get(It).bytesPerElement:1,xs=St.get(Q).currentProgram.getUniforms();for(let Je=0;Je<ee;Je++)xs.setValue(F,"_gl_DrawID",Je),te.render(Ut[Je]/fn,kn[Je])}else if(G.isInstancedMesh)te.renderInstances(jt,ue,G.count);else if(J.isInstancedBufferGeometry){let Ut=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,kn=Math.min(J.instanceCount,Ut);te.renderInstances(jt,ue,kn)}else te.render(jt,ue)};function ne(T,z,J){T.transparent===!0&&T.side===tn&&T.forceSinglePass===!1?(T.side=$e,T.needsUpdate=!0,Io(T,z,J),T.side=Ii,T.needsUpdate=!0,Io(T,z,J),T.side=tn):Io(T,z,J)}this.compile=function(T,z,J=null){J===null&&(J=T),f=wt.get(J),f.init(z),S.push(f),J.traverseVisible(function(G){G.isLight&&G.layers.test(z.layers)&&(f.pushLight(G),G.castShadow&&f.pushShadow(G))}),T!==J&&T.traverseVisible(function(G){G.isLight&&G.layers.test(z.layers)&&(f.pushLight(G),G.castShadow&&f.pushShadow(G))}),f.setupLights();let Q=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let ct=G.material;if(ct)if(Array.isArray(ct))for(let vt=0;vt<ct.length;vt++){let Pt=ct[vt];ne(Pt,J,G),Q.add(Pt)}else ne(ct,J,G),Q.add(ct)}),S.pop(),f=null,Q},this.compileAsync=function(T,z,J=null){let Q=this.compile(T,z,J);return new Promise(G=>{function ct(){if(Q.forEach(function(vt){St.get(vt).currentProgram.isReady()&&Q.delete(vt)}),Q.size===0){G(T);return}setTimeout(ct,10)}Et.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let dn=null;function zn(T){dn&&dn(T)}function vd(){zi.stop()}function Md(){zi.start()}let zi=new cg;zi.setAnimationLoop(zn),typeof self<"u"&&zi.setContext(self),this.setAnimationLoop=function(T){dn=T,et.setAnimationLoop(T),T===null?zi.stop():zi.start()},et.addEventListener("sessionstart",vd),et.addEventListener("sessionend",Md),this.render=function(T,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(z),z=et.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,z,I),f=wt.get(T,S.length),f.init(z),S.push(f),ut.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),V.setFromProjectionMatrix(ut),tt=this.localClippingEnabled,Y=at.init(this.clippingPlanes,tt),m=xt.get(T,b.length),m.init(),b.push(m),et.enabled===!0&&et.isPresenting===!0){let ct=_.xr.getDepthSensingMesh();ct!==null&&sc(ct,z,-1/0,_.sortObjects)}sc(T,z,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(L,U),dt=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,dt&&Tt.addToRenderList(m,T),this.info.render.frame++,Y===!0&&at.beginShadows();let J=f.state.shadowsArray;_t.render(J,T,z),Y===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();let Q=m.opaque,G=m.transmissive;if(f.setupLights(),z.isArrayCamera){let ct=z.cameras;if(G.length>0)for(let vt=0,Pt=ct.length;vt<Pt;vt++){let It=ct[vt];bd(Q,G,T,It)}dt&&Tt.render(T);for(let vt=0,Pt=ct.length;vt<Pt;vt++){let It=ct[vt];Sd(m,T,It,It.viewport)}}else G.length>0&&bd(Q,G,T,z),dt&&Tt.render(T),Sd(m,T,z);I!==null&&(A.updateMultisampleRenderTarget(I),A.updateRenderTargetMipmap(I)),T.isScene===!0&&T.onAfterRender(_,T,z),le.resetDefaultState(),M=-1,v=null,S.pop(),S.length>0?(f=S[S.length-1],Y===!0&&at.setGlobalState(_.clippingPlanes,f.state.camera)):f=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function sc(T,z,J,Q){if(T.visible===!1)return;if(T.layers.test(z.layers)){if(T.isGroup)J=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(z);else if(T.isLight)f.pushLight(T),T.castShadow&&f.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||V.intersectsSprite(T)){Q&&lt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ut);let vt=K.update(T),Pt=T.material;Pt.visible&&m.push(T,vt,Pt,J,lt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||V.intersectsObject(T))){let vt=K.update(T),Pt=T.material;if(Q&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),lt.copy(T.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),lt.copy(vt.boundingSphere.center)),lt.applyMatrix4(T.matrixWorld).applyMatrix4(ut)),Array.isArray(Pt)){let It=vt.groups;for(let Bt=0,Wt=It.length;Bt<Wt;Bt++){let Dt=It[Bt],jt=Pt[Dt.materialIndex];jt&&jt.visible&&m.push(T,vt,jt,J,lt.z,Dt)}}else Pt.visible&&m.push(T,vt,Pt,J,lt.z,null)}}let ct=T.children;for(let vt=0,Pt=ct.length;vt<Pt;vt++)sc(ct[vt],z,J,Q)}function Sd(T,z,J,Q){let G=T.opaque,ct=T.transmissive,vt=T.transparent;f.setupLightsView(J),Y===!0&&at.setGlobalState(_.clippingPlanes,J),Q&&Rt.viewport(D.copy(Q)),G.length>0&&Po(G,z,J),ct.length>0&&Po(ct,z,J),vt.length>0&&Po(vt,z,J),Rt.buffers.depth.setTest(!0),Rt.buffers.depth.setMask(!0),Rt.buffers.color.setMask(!0),Rt.setPolygonOffset(!1)}function bd(T,z,J,Q){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[Q.id]===void 0&&(f.state.transmissionRenderTarget[Q.id]=new si(1,1,{generateMipmaps:!0,type:Et.has("EXT_color_buffer_half_float")||Et.has("EXT_color_buffer_float")?_o:ii,minFilter:es,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));let ct=f.state.transmissionRenderTarget[Q.id],vt=Q.viewport||D;ct.setSize(vt.z,vt.w);let Pt=_.getRenderTarget();_.setRenderTarget(ct),_.getClearColor(Z),B=_.getClearAlpha(),B<1&&_.setClearColor(16777215,.5),_.clear(),dt&&Tt.render(J);let It=_.toneMapping;_.toneMapping=Ri;let Bt=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),f.setupLightsView(Q),Y===!0&&at.setGlobalState(_.clippingPlanes,Q),Po(T,J,Q),A.updateMultisampleRenderTarget(ct),A.updateRenderTargetMipmap(ct),Et.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let Dt=0,jt=z.length;Dt<jt;Dt++){let ce=z[Dt],ue=ce.object,Ye=ce.geometry,te=ce.material,Ut=ce.group;if(te.side===tn&&ue.layers.test(Q.layers)){let kn=te.side;te.side=$e,te.needsUpdate=!0,Td(ue,J,Q,Ye,te,Ut),te.side=kn,te.needsUpdate=!0,Wt=!0}}Wt===!0&&(A.updateMultisampleRenderTarget(ct),A.updateRenderTargetMipmap(ct))}_.setRenderTarget(Pt),_.setClearColor(Z,B),Bt!==void 0&&(Q.viewport=Bt),_.toneMapping=It}function Po(T,z,J){let Q=z.isScene===!0?z.overrideMaterial:null;for(let G=0,ct=T.length;G<ct;G++){let vt=T[G],Pt=vt.object,It=vt.geometry,Bt=Q===null?vt.material:Q,Wt=vt.group;Pt.layers.test(J.layers)&&Td(Pt,z,J,It,Bt,Wt)}}function Td(T,z,J,Q,G,ct){T.onBeforeRender(_,z,J,Q,G,ct),T.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(_,z,J,Q,T,ct),G.transparent===!0&&G.side===tn&&G.forceSinglePass===!1?(G.side=$e,G.needsUpdate=!0,_.renderBufferDirect(J,z,Q,G,T,ct),G.side=Ii,G.needsUpdate=!0,_.renderBufferDirect(J,z,Q,G,T,ct),G.side=tn):_.renderBufferDirect(J,z,Q,G,T,ct),T.onAfterRender(_,z,J,Q,G,ct)}function Io(T,z,J){z.isScene!==!0&&(z=pt);let Q=St.get(T),G=f.state.lights,ct=f.state.shadowsArray,vt=G.state.version,Pt=ft.getParameters(T,G.state,ct,z,J),It=ft.getProgramCacheKey(Pt),Bt=Q.programs;Q.environment=T.isMeshStandardMaterial?z.environment:null,Q.fog=z.fog,Q.envMap=(T.isMeshStandardMaterial?q:y).get(T.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&T.envMap===null?z.environmentRotation:T.envMapRotation,Bt===void 0&&(T.addEventListener("dispose",Gt),Bt=new Map,Q.programs=Bt);let Wt=Bt.get(It);if(Wt!==void 0){if(Q.currentProgram===Wt&&Q.lightsStateVersion===vt)return wd(T,Pt),Wt}else Pt.uniforms=ft.getUniforms(T),T.onBeforeCompile(Pt,_),Wt=ft.acquireProgram(Pt,It),Bt.set(It,Wt),Q.uniforms=Pt.uniforms;let Dt=Q.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Dt.clippingPlanes=at.uniform),wd(T,Pt),Q.needsLights=h0(T),Q.lightsStateVersion=vt,Q.needsLights&&(Dt.ambientLightColor.value=G.state.ambient,Dt.lightProbe.value=G.state.probe,Dt.directionalLights.value=G.state.directional,Dt.directionalLightShadows.value=G.state.directionalShadow,Dt.spotLights.value=G.state.spot,Dt.spotLightShadows.value=G.state.spotShadow,Dt.rectAreaLights.value=G.state.rectArea,Dt.ltc_1.value=G.state.rectAreaLTC1,Dt.ltc_2.value=G.state.rectAreaLTC2,Dt.pointLights.value=G.state.point,Dt.pointLightShadows.value=G.state.pointShadow,Dt.hemisphereLights.value=G.state.hemi,Dt.directionalShadowMap.value=G.state.directionalShadowMap,Dt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Dt.spotShadowMap.value=G.state.spotShadowMap,Dt.spotLightMatrix.value=G.state.spotLightMatrix,Dt.spotLightMap.value=G.state.spotLightMap,Dt.pointShadowMap.value=G.state.pointShadowMap,Dt.pointShadowMatrix.value=G.state.pointShadowMatrix),Q.currentProgram=Wt,Q.uniformsList=null,Wt}function Ed(T){if(T.uniformsList===null){let z=T.currentProgram.getUniforms();T.uniformsList=cr.seqWithValue(z.seq,T.uniforms)}return T.uniformsList}function wd(T,z){let J=St.get(T);J.outputColorSpace=z.outputColorSpace,J.batching=z.batching,J.batchingColor=z.batchingColor,J.instancing=z.instancing,J.instancingColor=z.instancingColor,J.instancingMorph=z.instancingMorph,J.skinning=z.skinning,J.morphTargets=z.morphTargets,J.morphNormals=z.morphNormals,J.morphColors=z.morphColors,J.morphTargetsCount=z.morphTargetsCount,J.numClippingPlanes=z.numClippingPlanes,J.numIntersection=z.numClipIntersection,J.vertexAlphas=z.vertexAlphas,J.vertexTangents=z.vertexTangents,J.toneMapping=z.toneMapping}function l0(T,z,J,Q,G){z.isScene!==!0&&(z=pt),A.resetTextureUnits();let ct=z.fog,vt=Q.isMeshStandardMaterial?z.environment:null,Pt=I===null?_.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Cr,It=(Q.isMeshStandardMaterial?q:y).get(Q.envMap||vt),Bt=Q.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Wt=!!J.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Dt=!!J.morphAttributes.position,jt=!!J.morphAttributes.normal,ce=!!J.morphAttributes.color,ue=Ri;Q.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ue=_.toneMapping);let Ye=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,te=Ye!==void 0?Ye.length:0,Ut=St.get(Q),kn=f.state.lights;if(Y===!0&&(tt===!0||T!==v)){let nn=T===v&&Q.id===M;at.setState(Q,T,nn)}let ee=!1;Q.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==kn.state.version||Ut.outputColorSpace!==Pt||G.isBatchedMesh&&Ut.batching===!1||!G.isBatchedMesh&&Ut.batching===!0||G.isBatchedMesh&&Ut.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Ut.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Ut.instancing===!1||!G.isInstancedMesh&&Ut.instancing===!0||G.isSkinnedMesh&&Ut.skinning===!1||!G.isSkinnedMesh&&Ut.skinning===!0||G.isInstancedMesh&&Ut.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ut.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ut.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ut.instancingMorph===!1&&G.morphTexture!==null||Ut.envMap!==It||Q.fog===!0&&Ut.fog!==ct||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==at.numPlanes||Ut.numIntersection!==at.numIntersection)||Ut.vertexAlphas!==Bt||Ut.vertexTangents!==Wt||Ut.morphTargets!==Dt||Ut.morphNormals!==jt||Ut.morphColors!==ce||Ut.toneMapping!==ue||Ut.morphTargetsCount!==te)&&(ee=!0):(ee=!0,Ut.__version=Q.version);let fn=Ut.currentProgram;ee===!0&&(fn=Io(Q,z,G));let xs=!1,Je=!1,Br=!1,de=fn.getUniforms(),bn=Ut.uniforms;if(Rt.useProgram(fn.program)&&(xs=!0,Je=!0,Br=!0),Q.id!==M&&(M=Q.id,Je=!0),xs||v!==T){Rt.buffers.depth.getReversed()?(it.copy(T.projectionMatrix),O_(it),B_(it),de.setValue(F,"projectionMatrix",it)):de.setValue(F,"projectionMatrix",T.projectionMatrix),de.setValue(F,"viewMatrix",T.matrixWorldInverse);let ci=de.map.cameraPosition;ci!==void 0&&ci.setValue(F,ht.setFromMatrixPosition(T.matrixWorld)),Nt.logarithmicDepthBuffer&&de.setValue(F,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&de.setValue(F,"isOrthographic",T.isOrthographicCamera===!0),v!==T&&(v=T,Je=!0,Br=!0)}if(G.isSkinnedMesh){de.setOptional(F,G,"bindMatrix"),de.setOptional(F,G,"bindMatrixInverse");let nn=G.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),de.setValue(F,"boneTexture",nn.boneTexture,A))}G.isBatchedMesh&&(de.setOptional(F,G,"batchingTexture"),de.setValue(F,"batchingTexture",G._matricesTexture,A),de.setOptional(F,G,"batchingIdTexture"),de.setValue(F,"batchingIdTexture",G._indirectTexture,A),de.setOptional(F,G,"batchingColorTexture"),G._colorsTexture!==null&&de.setValue(F,"batchingColorTexture",G._colorsTexture,A));let Vr=J.morphAttributes;if((Vr.position!==void 0||Vr.normal!==void 0||Vr.color!==void 0)&&Ot.update(G,J,fn),(Je||Ut.receiveShadow!==G.receiveShadow)&&(Ut.receiveShadow=G.receiveShadow,de.setValue(F,"receiveShadow",G.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(bn.envMap.value=It,bn.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&z.environment!==null&&(bn.envMapIntensity.value=z.environmentIntensity),Je&&(de.setValue(F,"toneMappingExposure",_.toneMappingExposure),Ut.needsLights&&c0(bn,Br),ct&&Q.fog===!0&&rt.refreshFogUniforms(bn,ct),rt.refreshMaterialUniforms(bn,Q,R,H,f.state.transmissionRenderTarget[T.id]),cr.upload(F,Ed(Ut),bn,A)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(cr.upload(F,Ed(Ut),bn,A),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&de.setValue(F,"center",G.center),de.setValue(F,"modelViewMatrix",G.modelViewMatrix),de.setValue(F,"normalMatrix",G.normalMatrix),de.setValue(F,"modelMatrix",G.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){let nn=Q.uniformsGroups;for(let ci=0,hi=nn.length;ci<hi;ci++){let Ad=nn[ci];O.update(Ad,fn),O.bind(Ad,fn)}}return fn}function c0(T,z){T.ambientLightColor.needsUpdate=z,T.lightProbe.needsUpdate=z,T.directionalLights.needsUpdate=z,T.directionalLightShadows.needsUpdate=z,T.pointLights.needsUpdate=z,T.pointLightShadows.needsUpdate=z,T.spotLights.needsUpdate=z,T.spotLightShadows.needsUpdate=z,T.rectAreaLights.needsUpdate=z,T.hemisphereLights.needsUpdate=z}function h0(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,z,J){St.get(T.texture).__webglTexture=z,St.get(T.depthTexture).__webglTexture=J;let Q=St.get(T);Q.__hasExternalTextures=!0,Q.__autoAllocateDepthBuffer=J===void 0,Q.__autoAllocateDepthBuffer||Et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,z){let J=St.get(T);J.__webglFramebuffer=z,J.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(T,z=0,J=0){I=T,E=z,C=J;let Q=!0,G=null,ct=!1,vt=!1;if(T){let It=St.get(T);if(It.__useDefaultFramebuffer!==void 0)Rt.bindFramebuffer(F.FRAMEBUFFER,null),Q=!1;else if(It.__webglFramebuffer===void 0)A.setupRenderTarget(T);else if(It.__hasExternalTextures)A.rebindTextures(T,St.get(T.texture).__webglTexture,St.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Dt=T.depthTexture;if(It.__boundDepthTexture!==Dt){if(Dt!==null&&St.has(Dt)&&(T.width!==Dt.image.width||T.height!==Dt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(T)}}let Bt=T.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(vt=!0);let Wt=St.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Wt[z])?G=Wt[z][J]:G=Wt[z],ct=!0):T.samples>0&&A.useMultisampledRTT(T)===!1?G=St.get(T).__webglMultisampledFramebuffer:Array.isArray(Wt)?G=Wt[J]:G=Wt,D.copy(T.viewport),k.copy(T.scissor),W=T.scissorTest}else D.copy(X).multiplyScalar(R).floor(),k.copy(j).multiplyScalar(R).floor(),W=ot;if(Rt.bindFramebuffer(F.FRAMEBUFFER,G)&&Q&&Rt.drawBuffers(T,G),Rt.viewport(D),Rt.scissor(k),Rt.setScissorTest(W),ct){let It=St.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+z,It.__webglTexture,J)}else if(vt){let It=St.get(T.texture),Bt=z||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,It.__webglTexture,J||0,Bt)}M=-1},this.readRenderTargetPixels=function(T,z,J,Q,G,ct,vt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=St.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&vt!==void 0&&(Pt=Pt[vt]),Pt){Rt.bindFramebuffer(F.FRAMEBUFFER,Pt);try{let It=T.texture,Bt=It.format,Wt=It.type;if(!Nt.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Nt.textureTypeReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=T.width-Q&&J>=0&&J<=T.height-G&&F.readPixels(z,J,Q,G,Lt.convert(Bt),Lt.convert(Wt),ct)}finally{let It=I!==null?St.get(I).__webglFramebuffer:null;Rt.bindFramebuffer(F.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(T,z,J,Q,G,ct,vt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=St.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&vt!==void 0&&(Pt=Pt[vt]),Pt){let It=T.texture,Bt=It.format,Wt=It.type;if(!Nt.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Nt.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=T.width-Q&&J>=0&&J<=T.height-G){Rt.bindFramebuffer(F.FRAMEBUFFER,Pt);let Dt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Dt),F.bufferData(F.PIXEL_PACK_BUFFER,ct.byteLength,F.STREAM_READ),F.readPixels(z,J,Q,G,Lt.convert(Bt),Lt.convert(Wt),0);let jt=I!==null?St.get(I).__webglFramebuffer:null;Rt.bindFramebuffer(F.FRAMEBUFFER,jt);let ce=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await F_(F,ce,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Dt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ct),F.deleteBuffer(Dt),F.deleteSync(ce),ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,z=null,J=0){T.isTexture!==!0&&(lo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,T=arguments[1]);let Q=Math.pow(2,-J),G=Math.floor(T.image.width*Q),ct=Math.floor(T.image.height*Q),vt=z!==null?z.x:0,Pt=z!==null?z.y:0;A.setTexture2D(T,0),F.copyTexSubImage2D(F.TEXTURE_2D,J,0,0,vt,Pt,G,ct),Rt.unbindTexture()},this.copyTextureToTexture=function(T,z,J=null,Q=null,G=0){T.isTexture!==!0&&(lo("WebGLRenderer: copyTextureToTexture function signature has changed."),Q=arguments[0]||null,T=arguments[1],z=arguments[2],G=arguments[3]||0,J=null);let ct,vt,Pt,It,Bt,Wt,Dt,jt,ce,ue=T.isCompressedTexture?T.mipmaps[G]:T.image;J!==null?(ct=J.max.x-J.min.x,vt=J.max.y-J.min.y,Pt=J.isBox3?J.max.z-J.min.z:1,It=J.min.x,Bt=J.min.y,Wt=J.isBox3?J.min.z:0):(ct=ue.width,vt=ue.height,Pt=ue.depth||1,It=0,Bt=0,Wt=0),Q!==null?(Dt=Q.x,jt=Q.y,ce=Q.z):(Dt=0,jt=0,ce=0);let Ye=Lt.convert(z.format),te=Lt.convert(z.type),Ut;z.isData3DTexture?(A.setTexture3D(z,0),Ut=F.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(A.setTexture2DArray(z,0),Ut=F.TEXTURE_2D_ARRAY):(A.setTexture2D(z,0),Ut=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,z.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,z.unpackAlignment);let kn=F.getParameter(F.UNPACK_ROW_LENGTH),ee=F.getParameter(F.UNPACK_IMAGE_HEIGHT),fn=F.getParameter(F.UNPACK_SKIP_PIXELS),xs=F.getParameter(F.UNPACK_SKIP_ROWS),Je=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,ue.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ue.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,It),F.pixelStorei(F.UNPACK_SKIP_ROWS,Bt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Wt);let Br=T.isDataArrayTexture||T.isData3DTexture,de=z.isDataArrayTexture||z.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){let bn=St.get(T),Vr=St.get(z),nn=St.get(bn.__renderTarget),ci=St.get(Vr.__renderTarget);Rt.bindFramebuffer(F.READ_FRAMEBUFFER,nn.__webglFramebuffer),Rt.bindFramebuffer(F.DRAW_FRAMEBUFFER,ci.__webglFramebuffer);for(let hi=0;hi<Pt;hi++)Br&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,St.get(T).__webglTexture,G,Wt+hi),T.isDepthTexture?(de&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,St.get(z).__webglTexture,G,ce+hi),F.blitFramebuffer(It,Bt,ct,vt,Dt,jt,ct,vt,F.DEPTH_BUFFER_BIT,F.NEAREST)):de?F.copyTexSubImage3D(Ut,G,Dt,jt,ce+hi,It,Bt,ct,vt):F.copyTexSubImage2D(Ut,G,Dt,jt,ce+hi,It,Bt,ct,vt);Rt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Rt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else de?T.isDataTexture||T.isData3DTexture?F.texSubImage3D(Ut,G,Dt,jt,ce,ct,vt,Pt,Ye,te,ue.data):z.isCompressedArrayTexture?F.compressedTexSubImage3D(Ut,G,Dt,jt,ce,ct,vt,Pt,Ye,ue.data):F.texSubImage3D(Ut,G,Dt,jt,ce,ct,vt,Pt,Ye,te,ue):T.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,G,Dt,jt,ct,vt,Ye,te,ue.data):T.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,G,Dt,jt,ue.width,ue.height,Ye,ue.data):F.texSubImage2D(F.TEXTURE_2D,G,Dt,jt,ct,vt,Ye,te,ue);F.pixelStorei(F.UNPACK_ROW_LENGTH,kn),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ee),F.pixelStorei(F.UNPACK_SKIP_PIXELS,fn),F.pixelStorei(F.UNPACK_SKIP_ROWS,xs),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Je),G===0&&z.generateMipmaps&&F.generateMipmap(Ut),Rt.unbindTexture()},this.copyTextureToTexture3D=function(T,z,J=null,Q=null,G=0){return T.isTexture!==!0&&(lo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),J=arguments[0]||null,Q=arguments[1]||null,T=arguments[2],z=arguments[3],G=arguments[4]||0),lo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,z,J,Q,G)},this.initRenderTarget=function(T){St.get(T).__webglFramebuffer===void 0&&A.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?A.setTextureCube(T,0):T.isData3DTexture?A.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?A.setTexture2DArray(T,0):A.setTexture2D(T,0),Rt.unbindTexture()},this.resetState=function(){E=0,C=0,I=null,Rt.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}};var wl=class n{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ht(t),this.near=e,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},_r=class extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ln,this.environmentIntensity=1,this.environmentRotation=new Ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Tu=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ou,this.updateRanges=[],this.version=0,this.uuid=Pi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},He=new N,Al=class n{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)He.fromBufferAttribute(this,e),He.applyMatrix4(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)He.fromBufferAttribute(this,e),He.applyNormalMatrix(t),this.setXYZ(e,He.x,He.y,He.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)He.fromBufferAttribute(this,e),He.transformDirection(t),this.setXYZ(e,He.x,He.y,He.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=In(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=re(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=In(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=In(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=In(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=In(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ie(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new n(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},yr=class extends Un{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},er,io=new N,nr=new N,ir=new N,sr=new zt,so=new zt,pg=new he,Za=new N,ro=new N,Ka=new N,Lm=new zt,dh=new zt,Um=new zt,mo=class extends De{constructor(t=new yr){if(super(),this.isSprite=!0,this.type="Sprite",er===void 0){er=new ge;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Tu(e,5);er.setIndex([0,1,2,0,2,3]),er.setAttribute("position",new Al(i,3,0,!1)),er.setAttribute("uv",new Al(i,2,3,!1))}this.geometry=er,this.material=t,this.center=new zt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),nr.setFromMatrixScale(this.matrixWorld),pg.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ir.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&nr.multiplyScalar(-ir.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let o=this.center;Ja(Za.set(-.5,-.5,0),ir,o,nr,s,r),Ja(ro.set(.5,-.5,0),ir,o,nr,s,r),Ja(Ka.set(.5,.5,0),ir,o,nr,s,r),Lm.set(0,0),dh.set(1,0),Um.set(1,1);let a=t.ray.intersectTriangle(Za,ro,Ka,!1,io);if(a===null&&(Ja(ro.set(-.5,.5,0),ir,o,nr,s,r),dh.set(0,1),a=t.ray.intersectTriangle(Za,Ka,ro,!1,io),a===null))return;let l=t.ray.origin.distanceTo(io);l<t.near||l>t.far||e.push({distance:l,point:io.clone(),uv:jn.getInterpolation(io,Za,ro,Ka,Lm,dh,Um,new zt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Ja(n,t,e,i,s,r){sr.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(so.x=r*sr.x-s*sr.y,so.y=s*sr.x+r*sr.y):so.copy(sr),n.copy(t),n.x+=so.x,n.y+=so.y,n.applyMatrix4(pg)}var as=class extends Un{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Cl=new N,Rl=new N,Nm=new he,oo=new fo,Qa=new rs,fh=new N,Fm=new N,go=class extends De{constructor(t=new ge,e=new as){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Cl.fromBufferAttribute(e,s-1),Rl.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Cl.distanceTo(Rl);t.setAttribute("lineDistance",new ie(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Qa.copy(i.boundingSphere),Qa.applyMatrix4(s),Qa.radius+=r,t.ray.intersectsSphere(Qa)===!1)return;Nm.copy(s).invert(),oo.copy(t.ray).applyMatrix4(Nm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=c){let f=h.getX(x),b=h.getX(x+1),S=ja(this,t,oo,l,f,b);S&&e.push(S)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(p),f=ja(this,t,oo,l,x,m);f&&e.push(f)}}else{let p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=c){let f=ja(this,t,oo,l,x,x+1);f&&e.push(f)}if(this.isLineLoop){let x=ja(this,t,oo,l,g-1,p);x&&e.push(x)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ja(n,t,e,i,s,r){let o=n.geometry.attributes.position;if(Cl.fromBufferAttribute(o,s),Rl.fromBufferAttribute(o,r),e.distanceSqToSegment(Cl,Rl,fh,Fm)>i)return;fh.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(fh);if(!(l<t.near||l>t.far))return{distance:l,point:Fm.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}var Om=new N,Bm=new N,On=class extends go{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Om.fromBufferAttribute(e,s),Bm.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Om.distanceTo(Bm);t.setAttribute("lineDistance",new ie(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var ls=class extends Un{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Vm=new he,Eu=new fo,tl=new rs,el=new N,vr=class extends De{constructor(t=new ge,e=new ls){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),tl.copy(i.boundingSphere),tl.applyMatrix4(s),tl.radius+=r,t.ray.intersectsSphere(tl)===!1)return;Vm.copy(s).invert(),Eu.copy(t.ray).applyMatrix4(Vm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){let d=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=d,x=p;g<x;g++){let m=c.getX(g);el.fromBufferAttribute(u,m),zm(el,m,l,s,t,e,this)}}else{let d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,x=p;g<x;g++)el.fromBufferAttribute(u,g),zm(el,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function zm(n,t,e,i,s,r,o){let a=Eu.distanceSqToPoint(n);if(a<e){let l=new N;Eu.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Pl=class extends en{constructor(t,e,i,s,r,o,a,l,c){super(t,e,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},wu=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,o;e?o=e:o=t*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);let h=i[s],d=i[s+1]-h,p=(o-h)/d;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new zt:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new N,s=[],r=[],o=[],a=new N,l=new he;for(let p=0;p<=t;p++){let g=p/t;s[p]=this.getTangentAt(g,new N)}r[0]=new N,o[0]=new N;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Pe(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Pe(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}};function Yu(){let n=0,t=0,e=0,i=0;function s(r,o,a,l){n=r,t=a,e=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,p*=h,s(o,a,d,p)},calc:function(r){let o=r*r,a=o*r;return n+t*r+e*o+i*a}}}var nl=new N,ph=new Yu,mh=new Yu,gh=new Yu,Il=class extends wu{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new N){let i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(nl.subVectors(s[0],s[1]).add(s[0]),c=nl);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(nl.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=nl),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),p),x=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(h),p);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),ph.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,x,m),mh.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,x,m),gh.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(ph.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),mh.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),gh.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(ph.calc(l),mh.calc(l),gh.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};var Dl=class n extends ge{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new N,h=new zt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let p=i+u/e*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ie(o,3)),this.setAttribute("normal",new ie(a,3)),this.setAttribute("uv",new ie(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Mr=class n extends ge{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],p=[],g=0,x=[],m=i/2,f=0;b(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new ie(u,3)),this.setAttribute("normal",new ie(d,3)),this.setAttribute("uv",new ie(p,2));function b(){let _=new N,w=new N,E=0,C=(e-t)/i;for(let I=0;I<=r;I++){let M=[],v=I/r,D=v*(e-t)+t;for(let k=0;k<=s;k++){let W=k/s,Z=W*l+a,B=Math.sin(Z),P=Math.cos(Z);w.x=D*B,w.y=-v*i+m,w.z=D*P,u.push(w.x,w.y,w.z),_.set(B,C,P).normalize(),d.push(_.x,_.y,_.z),p.push(W,1-v),M.push(g++)}x.push(M)}for(let I=0;I<s;I++)for(let M=0;M<r;M++){let v=x[M][I],D=x[M+1][I],k=x[M+1][I+1],W=x[M][I+1];(t>0||M!==0)&&(h.push(v,D,W),E+=3),(e>0||M!==r-1)&&(h.push(D,k,W),E+=3)}c.addGroup(f,E,0),f+=E}function S(_){let w=g,E=new zt,C=new N,I=0,M=_===!0?t:e,v=_===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,m*v,0),d.push(0,v,0),p.push(.5,.5),g++;let D=g;for(let k=0;k<=s;k++){let Z=k/s*l+a,B=Math.cos(Z),P=Math.sin(Z);C.x=M*P,C.y=m*v,C.z=M*B,u.push(C.x,C.y,C.z),d.push(0,v,0),E.x=B*.5+.5,E.y=P*.5*v+.5,p.push(E.x,E.y),g++}for(let k=0;k<s;k++){let W=w+k,Z=D+k;_===!0?h.push(Z,Z+1,W):h.push(Z+1,Z,W),I+=3}c.addGroup(f,I,_===!0?1:2),f+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var il=new N,sl=new N,xh=new N,rl=new jn,ri=class extends ge{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(dl*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},p=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:x,b:m,c:f}=rl;if(x.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),f.fromBufferAttribute(a,c[2]),rl.getNormal(xh),u[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let b=0;b<3;b++){let S=(b+1)%3,_=u[b],w=u[S],E=rl[h[b]],C=rl[h[S]],I=`${_}_${w}`,M=`${w}_${_}`;M in d&&d[M]?(xh.dot(d[M].normal)<=r&&(p.push(E.x,E.y,E.z),p.push(C.x,C.y,C.z)),d[M]=null):I in d||(d[I]={index0:c[b],index1:c[S],normal:xh.clone()})}}for(let g in d)if(d[g]){let{index0:x,index1:m}=d[g];il.fromBufferAttribute(a,x),sl.fromBufferAttribute(a,m),p.push(il.x,il.y,il.z),p.push(sl.x,sl.y,sl.z)}this.setAttribute("position",new ie(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var Sr=class n extends ge{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);let a=[],l=[],c=[],h=[],u=t,d=(e-t)/s,p=new N,g=new zt;for(let x=0;x<=s;x++){for(let m=0;m<=i;m++){let f=r+m/i*o;p.x=u*Math.cos(f),p.y=u*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let x=0;x<s;x++){let m=x*(i+1);for(let f=0;f<i;f++){let b=f+m,S=b,_=b+i+1,w=b+i+2,E=b+1;a.push(S,_,E),a.push(_,w,E)}}this.setIndex(a),this.setAttribute("position",new ie(l,3)),this.setAttribute("normal",new ie(c,3)),this.setAttribute("uv",new ie(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var cs=class n extends ge{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new N,d=new N,p=[],g=[],x=[],m=[];for(let f=0;f<=i;f++){let b=[],S=f/i,_=0;f===0&&o===0?_=.5/e:f===i&&l===Math.PI&&(_=-.5/e);for(let w=0;w<=e;w++){let E=w/e;u.x=-t*Math.cos(s+E*r)*Math.sin(o+S*a),u.y=t*Math.cos(o+S*a),u.z=t*Math.sin(s+E*r)*Math.sin(o+S*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(E+_,1-S),b.push(c++)}h.push(b)}for(let f=0;f<i;f++)for(let b=0;b<e;b++){let S=h[f][b+1],_=h[f][b],w=h[f+1][b],E=h[f+1][b+1];(f!==0||o>0)&&p.push(S,_,E),(f!==i-1||l<Math.PI)&&p.push(_,w,E)}this.setIndex(p),this.setAttribute("position",new ie(g,3)),this.setAttribute("normal",new ie(x,3)),this.setAttribute("uv",new ie(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ui=class n extends ge{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],l=[],c=[],h=new N,u=new N,d=new N;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){let x=g/s*r,m=p/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){let x=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,b=(s+1)*p+g;o.push(x,m,b),o.push(m,f,b)}this.setIndex(o),this.setAttribute("position",new ie(a,3)),this.setAttribute("normal",new ie(l,3)),this.setAttribute("uv",new ie(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Ze=class extends Un{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sg,this.normalScale=new zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},br=class extends Ze{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new zt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Pe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ht(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ht(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ht(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function ol(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Db(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var Tr=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Au=class extends Tr{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Bp,endingEnd:Bp}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Vp:r=t,a=2*e-i;break;case zp:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Vp:o=t,l=2*i-e;break;case zp:o=1,l=i+s[1]-s[0];break;default:o=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(i-e)/(s-e),x=g*g,m=x*g,f=-d*m+2*d*x-d*g,b=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,S=(-1-p)*m+(1.5+p)*x+.5*g,_=p*m-p*x;for(let w=0;w!==a;++w)r[w]=f*o[h+w]+b*o[c+w]+S*o[l+w]+_*o[u+w];return r}},Cu=class extends Tr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(i-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},Ru=class extends Tr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},vn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ol(e,this.TimeBufferType),this.values=ol(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:ol(t.times,Array),values:ol(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Ru(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Cu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Au(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case fl:e=this.InterpolantFactoryMethodDiscrete;break;case ru:e=this.InterpolantFactoryMethodLinear;break;case Bc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fl;case this.InterpolantFactoryMethodLinear:return ru;case this.InterpolantFactoryMethodSmooth:return Bc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Db(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Bc,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*i,d=u-i,p=u+i;for(let g=0;g!==i;++g){let x=e[u+g];if(x!==e[d+g]||x!==e[p+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*i,d=o*i;for(let p=0;p!==i;++p)e[d+p]=e[u+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};vn.prototype.TimeBufferType=Float32Array;vn.prototype.ValueBufferType=Float32Array;vn.prototype.DefaultInterpolation=ru;var hs=class extends vn{constructor(t,e,i){super(t,e,i)}};hs.prototype.ValueTypeName="bool";hs.prototype.ValueBufferType=Array;hs.prototype.DefaultInterpolation=fl;hs.prototype.InterpolantFactoryMethodLinear=void 0;hs.prototype.InterpolantFactoryMethodSmooth=void 0;var Pu=class extends vn{};Pu.prototype.ValueTypeName="color";var Iu=class extends vn{};Iu.prototype.ValueTypeName="number";var Du=class extends Tr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)Li.slerpFlat(r,0,o,c-a,o,c,l);return r}},Ll=class extends vn{InterpolantFactoryMethodLinear(t){return new Du(this.times,this.values,this.getValueSize(),t)}};Ll.prototype.ValueTypeName="quaternion";Ll.prototype.InterpolantFactoryMethodSmooth=void 0;var us=class extends vn{constructor(t,e,i){super(t,e,i)}};us.prototype.ValueTypeName="string";us.prototype.ValueBufferType=Array;us.prototype.DefaultInterpolation=fl;us.prototype.InterpolantFactoryMethodLinear=void 0;us.prototype.InterpolantFactoryMethodSmooth=void 0;var Lu=class extends vn{};Lu.prototype.ValueTypeName="vector";var Uu=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},Lb=new Uu,Nu=class{constructor(t){this.manager=t!==void 0?t:Lb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Nu.DEFAULT_MATERIAL_NAME="__DEFAULT";var xo=class extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var _h=new he,km=new N,Hm=new N,Ul=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new zt(512,512),this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new po,this._frameExtents=new zt(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;km.setFromMatrixPosition(t.matrixWorld),e.position.copy(km),Hm.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Hm),e.updateMatrixWorld(),_h.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_h),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(_h)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Gm=new he,ao=new N,yh=new N,Fu=class extends Ul{constructor(){super(new Re(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new zt(4,2),this._viewportCount=6,this._viewports=[new oe(2,1,1,1),new oe(0,1,1,1),new oe(3,1,1,1),new oe(1,1,1,1),new oe(3,0,1,1),new oe(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(t,e=0){let i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),ao.setFromMatrixPosition(t.matrixWorld),i.position.copy(ao),yh.copy(i.position),yh.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(yh),i.updateMatrixWorld(),s.makeTranslation(-ao.x,-ao.y,-ao.z),Gm.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gm)}},oi=class extends xo{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Fu}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Ou=class extends Ul{constructor(){super(new bl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Er=class extends xo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Ou}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},wr=class extends xo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ar=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Wm(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Wm();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Wm(){return performance.now()}var qu="\\[\\]\\.:\\/",Ub=new RegExp("["+qu+"]","g"),$u="[^"+qu+"]",Nb="[^"+qu.replace("\\.","")+"]",Fb=/((?:WC+[\/:])*)/.source.replace("WC",$u),Ob=/(WCOD+)?/.source.replace("WCOD",Nb),Bb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$u),Vb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$u),zb=new RegExp("^"+Fb+Ob+Bb+Vb+"$"),kb=["material","materials","bones","map"],Bu=class{constructor(t,e,i){let s=i||me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},me=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Ub,"")}static parseTrackName(t){let e=zb.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);kb.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};me.Composite=Bu;me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};me.prototype.GetterByBindingType=[me.prototype._getValue_direct,me.prototype._getValue_array,me.prototype._getValue_arrayElement,me.prototype._getValue_toArray];me.prototype.SetterByBindingTypeAndVersioning=[[me.prototype._setValue_direct,me.prototype._setValue_direct_setNeedsUpdate,me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[me.prototype._setValue_array,me.prototype._setValue_array_setNeedsUpdate,me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[me.prototype._setValue_arrayElement,me.prototype._setValue_arrayElement_setNeedsUpdate,me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[me.prototype._setValue_fromArray,me.prototype._setValue_fromArray_setNeedsUpdate,me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var gL=new Float32Array(1);var Nl=class extends On{constructor(t=10,e=10,i=4473924,s=8947848){i=new Ht(i),s=new Ht(s);let r=e/2,o=t/e,a=t/2,l=[],c=[];for(let d=0,p=0,g=-a;d<=e;d++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);let x=d===r?i:s;x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3}let h=new ge;h.setAttribute("position",new ie(l,3)),h.setAttribute("color",new ie(c,3));let u=new as({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var yo=new N;function cn(n,t,e,i,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;yo.copy(t),yo[i]=0,yo.normalize();let c=.5*o/(o+a),h=1-yo.angleTo(n)/l;return Math.sign(yo[e])===1?h*c:a/(o+a)+c+c*(1-h)}var ai=class extends Nn{constructor(t=1,e=1,i=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,i/2,r),super(1,1,1,s,s,s),s===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let a=new N,l=new N,c=new N(t,e,i).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=h.length/6,g=new N,x=.5/s;for(let m=0,f=0;m<h.length;m+=3,f+=2)switch(a.fromArray(h,m),l.copy(a),l.x-=Math.sign(l.x)*x,l.y-=Math.sign(l.y)*x,l.z-=Math.sign(l.z)*x,l.normalize(),h[m+0]=c.x*Math.sign(a.x)+l.x*r,h[m+1]=c.y*Math.sign(a.y)+l.y*r,h[m+2]=c.z*Math.sign(a.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/p)){case 0:g.set(1,0,0),d[f+0]=cn(g,l,"z","y",r,i),d[f+1]=1-cn(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),d[f+0]=1-cn(g,l,"z","y",r,i),d[f+1]=1-cn(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),d[f+0]=1-cn(g,l,"x","z",r,t),d[f+1]=cn(g,l,"z","x",r,i);break;case 3:g.set(0,-1,0),d[f+0]=1-cn(g,l,"x","z",r,t),d[f+1]=1-cn(g,l,"z","x",r,i);break;case 4:g.set(0,0,1),d[f+0]=1-cn(g,l,"x","y",r,t),d[f+1]=1-cn(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),d[f+0]=cn(g,l,"x","y",r,t),d[f+1]=1-cn(g,l,"y","x",r,e);break}}};var Vl=matchMedia("(prefers-reduced-motion: reduce)").matches,Hb=new URLSearchParams(location.search).has("debug"),Zu=15026253;function zl(n="229,72,77,"){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d"),i=e.createRadialGradient(64,64,0,64,64,64);return i.addColorStop(0,`rgba(${n}0.9)`),i.addColorStop(.35,`rgba(${n}0.28)`),i.addColorStop(1,`rgba(${n}0)`),e.fillStyle=i,e.fillRect(0,0,128,128),new Pl(t)}function gg(n,t={}){let e=new xr({canvas:n,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});n.addEventListener("webglcontextlost",$=>{$.preventDefault(),e.setAnimationLoop(null),t.onFatal&&t.onFatal()});let i=new _r;i.fog=new wl(657931,12,44);let s=new Re(40,1,.1,100),r=new Ve;s.position.set(0,2.4,6.6),r.add(s),i.add(r),i.add(new wr(3947588,1.5));let o=new Er(16773862,3.6);o.position.set(6,8,5),i.add(o);let a=new oi(16777215,50,24);a.position.set(1.4,5.6,2.6),i.add(a);let l=new oi(Zu,110,20);l.position.set(-3.6,3.2,-2.4),i.add(l);let c=new oi(12106952,46,24);c.position.set(3.6,2.2,5),i.add(c);let h=new oi(16737129,55,8);i.add(h);let u=new $t(new gr(90,90),new Ze({color:789519,roughness:1,metalness:0}));u.rotation.x=-Math.PI/2,u.position.y=-.32,i.add(u);let d=new Nl(70,70,4868693,2500142);d.position.y=-.3,i.add(d);let p=new $t(new Sr(.96,1,64),new os({color:Zu,transparent:!0,opacity:.55,side:tn}));p.rotation.x=-Math.PI/2,p.position.y=-.29,i.add(p);let g=0,x=new Ve,m=()=>new os({color:16737129,transparent:!0,opacity:0,side:tn}),f=new $t(new Sr(.72,.8,48),m());f.rotation.x=-Math.PI/2,x.add(f);let b=new $t(new Sr(.42,.46,48),m());b.rotation.x=-Math.PI/2,x.add(b);let S=new $t(new Dl(.14,24),m());S.rotation.x=-Math.PI/2,x.add(S),x.position.y=-.28,i.add(x);let _=new Ve;i.add(_);let w=new Ve;w.position.y=2.7,_.add(w);let E=new br({color:7215904,roughness:.34,metalness:.02,emissive:9317938,emissiveIntensity:.35,clearcoat:.7,clearcoatRoughness:.32}),C=new $t(new cs(1.5,56,40),E);C.scale.set(1,.3,1),w.add(C);let I=new cs(.16,16,12),M=[.4,1.5,2.7,3.9,5.1];for(let $=0;$<M.length;$++){let K=M[$],ft=1.42+$%2*.05,rt=new $t(I,E);rt.scale.set(1.4,.55,1.4),rt.position.set(Math.cos(K)*ft,-.02,Math.sin(K)*ft),w.add(rt)}let v=new $t(new Ui(1.34,.09,12,72),new br({color:8134694,roughness:.4,metalness:.02,emissive:9317938,emissiveIntensity:.3,clearcoat:.5,clearcoatRoughness:.4}));v.rotation.x=Math.PI/2,v.position.y=.3,w.add(v);let D=new Ze({color:16737129,emissive:Zu,emissiveIntensity:1.6,roughness:.5,metalness:.05}),k=new $t(new Ui(.72,.055,12,64),D);k.rotation.x=Math.PI/2,k.position.y=.38,w.add(k);let W=new $t(new Ui(.44,.035,10,48),D);W.rotation.x=Math.PI/2,W.position.y=.39,w.add(W);let Z=new $t(new cs(.13,20,16),D);Z.scale.set(1,.6,1),Z.position.y=.38,w.add(Z);let B=new mo(new yr({map:zl(),transparent:!0,opacity:.6,blending:ns,depthWrite:!1}));B.scale.set(4.6,3.2,1),B.position.y=.55,w.add(B);let P=[],H=new br({color:6034970,roughness:.4,metalness:.02,emissive:5313560,emissiveIntensity:.4,clearcoat:.5,clearcoatRoughness:.4});for(let[$,K,ft]of[[.95,.25,.55],[-.7,.5,.75],[.1,-.9,.42]]){let rt=new $t(new cs(.12,14,12),H);rt.scale.set(1,ft*3.2,1),rt.position.set($,-.42-ft*.5,K),w.add(rt),P.push(rt)}let R=new Il([new N(2.25,.05,1.05),new N(1.45,1.15,1.25),new N(.55,2.1,.85),new N(0,2.62,.25),new N(0,2.95,0)]),L=200,U=new Float32Array(L*3),X=new Float32Array(L);for(let $=0;$<L;$++)X[$]=.035+Math.random()*.045;let j=new ge;j.setAttribute("position",new Ie(U,3));let ot=new ls({color:16737129,size:.055,transparent:!0,opacity:.6,blending:ns,depthWrite:!1,map:zl("255,99,105,")});_.add(new vr(j,ot));let V=new Float32Array(L);for(let $=0;$<L;$++)V[$]=Math.random();let Y=new N,tt=26,it=new ge,ut=new Float32Array(tt*3);it.setAttribute("position",new Ie(ut,3));let ht=new ls({color:16754859,size:.045,transparent:!0,opacity:.7,blending:ns,depthWrite:!1,map:zl("255,170,173,")});_.add(new vr(it,ht));let lt=40,pt=new Float32Array(lt*3);for(let $=0;$<lt;$++)pt[$*3]=(Math.random()-.5)*9,pt[$*3+1]=Math.random()*5.5,pt[$*3+2]=(Math.random()-.5)*6-1;let dt=new ge;dt.setAttribute("position",new Ie(pt,3)),i.add(new vr(dt,new ls({color:10133677,size:.03,transparent:!0,opacity:.26,depthWrite:!1})));let Ct=new mo(new yr({map:zl(),transparent:!0,opacity:.34,blending:ns,depthWrite:!1}));Ct.scale.set(8.5,6,1),Ct.position.set(-.6,3,-6.5),i.add(Ct);let F=new Ve;F.scale.y=-1,_.add(F);let Vt=w.clone(!0);Vt.traverse($=>{$.isMesh?($.material=$.material.clone(),$.material.transparent=!0,$.material.opacity=($.material.opacity??1)*.13,$.material.depthWrite=!1,$.material.side=tn):$.isSprite&&($.material=$.material.clone(),$.material.opacity=.07)}),F.add(Vt);let Et=0,Nt=0,Rt=0,qt=0;Vl||addEventListener("pointermove",$=>{Rt=($.clientX/innerWidth-.5)*2,qt=($.clientY/innerHeight-.5)*2},{passive:!0});function St(){let $=n.clientWidth,K=n.clientHeight;e.setSize($,K,!1),s.aspect=$/K;let ft=$/K>1.05;_.position.set(ft?1:0,ft?-.4:-.95,0),_.scale.setScalar(ft?1.15:.94),s.updateProjectionMatrix()}St(),new ResizeObserver(St).observe(n);let A=!0;new IntersectionObserver(([$])=>{A=$.isIntersecting},{threshold:.02}).observe(n);let y=new Ar;function q(){let $=Math.min(y.getDelta(),.05),K=y.elapsedTime;Et+=(Rt-Et)*Math.min($*4,1),Nt+=(qt-Nt)*Math.min($*4,1),r.rotation.y=Et*.08+Math.sin(K*.12)*.03,r.rotation.x=Nt*.03,s.position.x=Et*.4,s.lookAt(_.position.x*.55,2.15,0),g=(g+$*.4)%1;let ft=Vl?.5:K*.14%1,rt=ft<.14?1-ft/.14:0;p.scale.setScalar(.4+g*5.4+rt*1.5),p.material.opacity=.5*(1-g)+rt*.5,p.position.x=_.position.x,x.position.x=_.position.x;for(let wt of[f.material,b.material,S.material])wt.opacity=rt*.85;let xt=.5+Math.sin(K*1.6)*.18;E.emissiveIntensity=xt+rt*1.4,h.position.set(_.position.x,w.position.y-.1,.2),h.intensity=45+Math.sin(K*1.6)*16+rt*130,B.material.opacity=.5+Math.sin(K*1.6)*.12+rt*.4,D.emissiveIntensity=1.5+Math.sin(K*2.2)*.5+rt*3.2,w.position.y=2.7+Math.sin(K*.8)*.07,w.rotation.y=Math.sin(K*.16)*.3,w.rotation.x=.1+Math.sin(K*.21)*.05,Vt.rotation.copy(w.rotation),Vt.position.y=w.position.y;for(let wt=0;wt<P.length;wt++)P[wt].rotation.z=Math.sin(K*1.1+wt*2)*.08;if(!Vl){for(let wt=0;wt<L;wt++)V[wt]=(V[wt]+X[wt]*$*2.4)%1,R.getPointAt(V[wt],Y),U[wt*3]=_.position.x+Y.x*_.scale.x,U[wt*3+1]=_.position.y+Y.y*_.scale.y,U[wt*3+2]=Y.z;j.attributes.position.needsUpdate=!0,ot.opacity=.5+Math.sin(K*2)*.15;for(let wt=0;wt<tt;wt++){let at=K*.55+wt/tt*Math.PI*2,_t=(K*.1+wt*.037)%1,Tt=(1.85-_t*.9)*_.scale.x;ut[wt*3]=_.position.x+Math.cos(at)*Tt,ut[wt*3+1]=_.position.y+(2.95-_t*.75)*_.scale.y+Math.sin(K+wt)*.05,ut[wt*3+2]=Math.sin(at)*Tt*.55}it.attributes.position.needsUpdate=!0,ht.opacity=.55+Math.sin(K*2.4)*.15}e.render(i,s)}let nt=0;return Hb&&(window.__heroDebug={scene:i,camera:s,renderer:e,get running(){return A},get frames(){return nt}}),Vl?q():e.setAnimationLoop(()=>{A&&!document.hidden&&(nt++,q())}),{getFrames:()=>nt,dispose(){e.setAnimationLoop(null)}}}var kl=matchMedia("(prefers-reduced-motion: reduce)").matches,ML=new URLSearchParams(location.search).has("debug"),ds=15026253;function xg(n,t,e,i){let s=new xr({canvas:t,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});s.setPixelRatio(Math.min(devicePixelRatio,2));let r=new _r,o=new Re(36,1,.1,60);o.position.set(3.4,2.6,5),r.add(o),r.add(new wr(3421242,1.7));let a=new Er(16773604,3.2);a.position.set(4,6,5),r.add(a);let l=new oi(ds,80,16);l.position.set(-3.5,1.5,-3),r.add(l);let c=()=>new as({color:ds,transparent:!0,opacity:1}),h=()=>new Ze({color:1776417,metalness:.45,roughness:.42,transparent:!0,opacity:1}),u=new Ve;r.add(u);let d=[],p=new Ve;u.add(p);function g(B,P,H){let R=new Ve;return B(R),R.position.y=P,R.userData={baseY:P,mats:[],edges:[],anchor:new N(H[0],P,H[2]),op:1},R.traverse(L=>{L.isMesh&&L.material.transparent!==void 0&&(L.material=L.material.clone(),R.userData.mats.push(L.material)),L.isLineSegments&&(L.material=L.material.clone(),R.userData.edges.push(L.material))}),p.add(R),d.push(R),R}g(B=>{let P=new $t(new ai(1.15,.34,1.15,3,.05),h());B.add(P),B.add(new On(new ri(P.geometry,22),c()));let H=new $t(new Mr(.17,.17,.07,24),new Ze({color:ds,emissive:ds,emissiveIntensity:1.5,transparent:!0}));H.position.y=.21,B.add(H),B.userData.seal=H.material},1.62,[.6,0,.6]),g(B=>{let P=new $t(new ai(2.25,.18,1.65,3,.04),h());B.add(P),B.add(new On(new ri(P.geometry,22),c()));let H=new Ze({color:6974066,metalness:.85,roughness:.3,transparent:!0});for(let R=0;R<10;R++){let L=new $t(new Mr(.045,.045,.09,10),H);L.position.set(-.9+R%5*.45,.13,R<5?-.45:.45),B.add(L)}},1.32,[1.2,0,.9]),g(B=>{let P=new $t(new ai(2,.34,1.3,3,.05),h());B.add(P),B.add(new On(new ri(P.geometry,22),c()));let H=new ai(.24,.24,.24,2,.04);for(let R=0;R<5;R++){let L=new $t(H,h());L.position.set(-.72+R*.36,.28,0),B.add(L);let U=new On(new ri(H),c());if(L.add(U),R>0){let X=new go(new ge().setFromPoints([new N(-.72+(R-1)*.36,.28,0),new N(-.72+R*.36,.28,0)]),new as({color:ds,transparent:!0,opacity:.45}));B.add(X)}}},.98,[1.05,0,.7]),g(B=>{let P=new $t(new ai(1.5,.26,1.1,3,.04),h());B.add(P),B.add(new On(new ri(P.geometry,22),c()));let H=new Ze({color:10124095,metalness:.9,roughness:.35,transparent:!0});for(let L=0;L<12;L++){let U=new $t(new Nn(.14,.05,.16),H);U.position.set(-.62+L%6*.25,.15,L<6?-.4:.4),B.add(U)}let R=new $t(new Nn(.4,.09,.4),new Ze({color:657932,metalness:.6,roughness:.2,transparent:!0}));R.position.y=.17,B.add(R)},.62,[.8,0,.6]),g(B=>{let P=new $t(new ai(2.5,.55,1.9,3,.06),h());B.add(P),B.add(new On(new ri(P.geometry,22),c()));let H=new $t(new Mr(.55,.55,.06,36),new Ze({color:5658208,metalness:.85,roughness:.25,transparent:!0}));H.position.set(-.6,.3,0),B.add(H);let R=new $t(new Ui(.55,.015,8,48),new Ze({color:ds,emissive:ds,emissiveIntensity:.9,transparent:!0}));R.rotation.x=Math.PI/2,R.position.set(.6,.3,0),B.add(R),B.userData.ring=R},0,[1.3,0,1]),u.position.y=-.9;let x=[3.1,1.9,1.05,.45,0];function m(){let B=t.clientWidth,P=t.clientHeight;s.setSize(B,P,!1),o.aspect=B/P,o.updateProjectionMatrix();let H=Math.min(1,B/640);u.scale.setScalar(1.05+H*.35)}m(),new ResizeObserver(m).observe(t);let f=[...i.querySelectorAll(".chip")],b=[...n.querySelectorAll(".step")],S=-1;function _(B){B!==S&&(S=B,b.forEach(P=>P.classList.toggle("active",+P.dataset.layer===B)),f.forEach(P=>P.classList.toggle("active",+P.dataset.layer===B)))}if(kl)_(1);else{let B=new IntersectionObserver(P=>{for(let H of P)H.isIntersecting&&_(+H.target.dataset.layer)},{rootMargin:"-42% 0px -42% 0px"});b.forEach(P=>B.observe(P))}let E=document.createElementNS("http://www.w3.org/2000/svg","line");e.appendChild(E);let C=matchMedia("(max-width: 900px)").matches;function I(){if(C||S<0){E.setAttribute("opacity","0");return}let B=i.querySelector(".chip.active");if(!B)return;let P=B.getBoundingClientRect(),H=t.getBoundingClientRect(),R=P.right-H.left,L=P.top+P.height/2-H.top,U=d[S].userData.anchor.clone();d[S].getWorldPosition,d[S].localToWorld(U),U.project(o);let X=(U.x*.5+.5)*H.width,j=(-U.y*.5+.5)*H.height;E.setAttribute("x1",R),E.setAttribute("y1",L),E.setAttribute("x2",X),E.setAttribute("y2",j),E.setAttribute("opacity","0.55")}let M=B=>B*B*(3-2*B),v=0,D=0,k=!0;new IntersectionObserver(([B])=>{k=B.isIntersecting},{threshold:.02}).observe(t);let W=new Ar;function Z(){let B=Math.min(W.getDelta(),.05),P=W.elapsedTime,H=n.getBoundingClientRect(),R=innerHeight,L=H.height-R;D=L>0?Math.min(1,Math.max(0,-H.top/L)):0,v+=(D-v)*Math.min(B*6,1);let U=kl?.35:M(v);for(let X=0;X<d.length;X++){let j=d[X],ot=x[X];j.position.y=j.userData.baseY+ot*U,j.position.x=(X%2===0?-1:1)*U*.28;let V=S<0||S===X?1:.22;j.userData.op+=(V-j.userData.op)*Math.min(B*8,1);let Y=j.userData.op;for(let tt of j.userData.mats)tt.opacity=Y;for(let tt of j.userData.edges)tt.opacity=.8*Y;j.userData.seal&&(j.userData.seal.emissiveIntensity=(1.2+Math.sin(P*2.5)*.5)*Y),j.userData.ring&&(j.userData.ring.material.emissiveIntensity=(.7+Math.sin(P*1.8)*.3)*Y)}p.rotation.y=(kl?.5:P*.12)+U*1.2,o.position.set(3.4,2.4+U*.7,5-U*.5),o.lookAt(0,.9+U*.5,0),s.render(r,o),I()}return kl?Z():s.setAnimationLoop(()=>{k&&!document.hidden&&Z()}),{dispose(){s.setAnimationLoop(null)}}}var Vn=typeof window<"u",Ku=Vn?window:null,Fr=Vn?document:null,xe={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},Jt={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},un={NONE:0,AUTO:1,FORCE:2},Xe={replace:0,none:1,blend:2},_g=Symbol(),ad=Symbol(),Ig=Symbol(),tc=Symbol();var Gb=Symbol(),ae=1e-11,Dg=1e12,ms=1e3,td=120,Bi="",Eo=new Map;Eo.set("x","translateX");Eo.set("y","translateY");Eo.set("z","translateZ");var ld=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],Lg=ld.reduce((n,t)=>({...n,[t]:t+"("}),{}),Ke=()=>{},Wb=/(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,Xb=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,Yb=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,qb=/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,$b=/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,yg=/[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,Ug=/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,Zb=/([a-z])([A-Z])/g,Kb=/(\w+)(\([^)]+\)+)/g,Jb=/(\*=|\+=|-=)/,Ng={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:td,loop:0,reversed:!1,alternate:!1,autoplay:!0,duration:ms,delay:0,loopDelay:0,ease:"out(2)",composition:Xe.replace,modifier:n=>n,onBegin:Ke,onBeforeUpdate:Ke,onUpdate:Ke,onLoop:Ke,onPause:Ke,onComplete:Ke,onRender:Ke},Me={defaults:Ng,root:Fr,scope:null,precision:4,timeScale:1,tickThreshold:200},Fg={version:"4.0.2",engine:null};Vn&&(Ku.AnimeJS||(Ku.AnimeJS=[]),Ku.AnimeJS.push(Fg));var Qb=n=>n.replace(Zb,"$1-$2").toLowerCase(),ps=(n,t)=>n.indexOf(t)===0,So=Date.now,gs=Array.isArray,Ju=n=>n&&n.constructor===Object,cd=n=>typeof n=="number"&&!isNaN(n),ec=n=>typeof n=="string",Zl=n=>typeof n=="function",Kt=n=>typeof n>"u",Xl=n=>Kt(n)||n===null,Og=n=>Vn&&n instanceof SVGElement,Bg=n=>Wb.test(n),Vg=n=>ps(n,"rgb"),zg=n=>ps(n,"hsl"),jb=n=>Bg(n)||Vg(n)||zg(n),Yl=n=>!Me.defaults.hasOwnProperty(n),fs=n=>ec(n)?parseFloat(n):n,Ir=Math.pow,kg=Math.sqrt,tT=Math.sin,eT=Math.cos,bo=Math.abs;var nT=Math.ceil,To=Math.floor,iT=Math.asin,sT=Math.max;var wo=Math.PI,ed=Math.round,Le=(n,t,e)=>n<t?t:n>e?e:n,vg={},_e=(n,t)=>{if(t<0)return n;if(!t)return ed(n);let e=vg[t];return e||(e=vg[t]=10**t),ed(n*e)/e},rT=(n,t)=>gs(t)?t.reduce((e,i)=>bo(i-n)<bo(e-n)?i:e):t?ed(n/t)*t:n,Oi=(n,t,e)=>n+(t-n)*e,hd=n=>n===1/0?Dg:n===-1/0?-1e12:n,Mo=n=>n<=ae?ae:hd(_e(n,11)),We=n=>gs(n)?[...n]:n,oT=(n,t)=>{let e={...n};for(let i in t){let s=n[i];e[i]=Kt(s)?t[i]:s}return e},Se=(n,t,e,i="_prev",s="_next")=>{let r=n._head,o=s;for(e&&(r=n._tail,o=i);r;){let a=r[o];t(r),r=a}},Vi=(n,t,e="_prev",i="_next")=>{let s=t[e],r=t[i];s?s[i]=r:n._head=r,r?r[e]=s:n._tail=s,t[e]=null,t[i]=null},Ur=(n,t,e,i="_prev",s="_next")=>{let r=n._tail;for(;r&&e&&e(r,t);)r=r[i];let o=r?r[s]:n._head;r?r[s]=t:n._head=t,o?o[i]=t:n._tail=t,t[i]=r,t[s]=o},Kl=class{constructor(t=0){this.deltaTime=0,this._currentTime=t,this._elapsedTime=t,this._startTime=t,this._lastTime=t,this._scheduledTime=0,this._frameDuration=_e(ms/td,0),this._fps=td,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(t){let e=this._frameDuration,i=+t,s=i<ae?ae:i,r=_e(ms/s,0);this._fps=s,this._frameDuration=r,this._scheduledTime+=r-e}get speed(){return this._speed}set speed(t){let e=+t;this._speed=e<ae?ae:e}requestTick(t){let e=this._scheduledTime,i=this._elapsedTime;if(this._elapsedTime+=t-i,i<e)return un.NONE;let s=this._frameDuration,r=i-e;return this._scheduledTime+=r<s?s:r,un.AUTO}computeDeltaTime(t){let e=t-this._lastTime;return this.deltaTime=e,this._lastTime=t,e}},ql=(n,t,e,i,s)=>{let r=n.parent,o=n.duration,a=n.completed,l=n.iterationDuration,c=n.iterationCount,h=n._currentIteration,u=n._loopDelay,d=n._reversed,p=n._alternate,g=n._hasChildren,x=n._delay,m=n._currentTime,f=x+l,b=t-x,S=Le(m,-x,o),_=Le(b,-x,o),w=b-m,E=_>0,C=_>=o,I=o<=ae,M=s===un.FORCE,v=0,D=b,k=0;if(c>1){let H=~~(_/(l+(C?0:u)));n._currentIteration=Le(H,0,c),C&&n._currentIteration--,v=n._currentIteration%2,D=_%(l+u)||0}let W=d^(p&&v),Z=n._ease,B=C?W?0:o:W?l-D:D;Z&&(B=l*Z(B/l)||0);let P=(r?r.backwards:b<m)?!W:!!W;if(n._currentTime=b,n._iterationTime=B,n.backwards=P,E&&!n.began?(n.began=!0,!e&&!(r&&(P||!r.began))&&n.onBegin(n)):b<=0&&(n.began=!1),!e&&!g&&E&&n._currentIteration!==h&&n.onLoop(n),M||s===un.AUTO&&(t>=x&&t<=f||t<=x&&S>x||t>=f&&S!==o)||B>=f&&S!==o||B<=x&&S>0||t<=S&&S===o&&a||C&&!a&&I){if(E&&(n.computeDeltaTime(S),e||n.onBeforeUpdate(n)),!g){let H=M||(P?w*-1:w)>=Me.tickThreshold,R=n._offset+(r?r._offset:0)+x+B,L=n._head,U,X,j,ot,V=0;for(;L;){let Y=L._composition,tt=L._currentTime,it=L._changeDuration,ut=L._absoluteStartTime+L._changeDuration,ht=L._nextRep,lt=L._prevRep,pt=Y!==Xe.none;if((H||(tt!==it||R<=ut+(ht?ht._delay:0))&&(tt!==0||R>=L._absoluteStartTime))&&(!pt||!L._isOverridden&&(!L._isOverlapped||R<=ut)&&(!ht||ht._isOverridden||R<=ht._absoluteStartTime)&&(!lt||lt._isOverridden||R>=lt._absoluteStartTime+lt._changeDuration+L._delay))){let dt=L._currentTime=Le(B-L._startTime,0,it),Ct=L._ease(dt/L._updateDuration),F=L._modifier,Vt=L._valueType,Et=L._tweenType,Nt=Et===xe.OBJECT,Rt=Vt===Jt.NUMBER,qt=Rt&&Nt||Ct===0||Ct===1?-1:Me.precision,St,A;if(Rt)St=A=F(_e(Oi(L._fromNumber,L._toNumber,Ct),qt));else if(Vt===Jt.UNIT)A=F(_e(Oi(L._fromNumber,L._toNumber,Ct),qt)),St=`${A}${L._unit}`;else if(Vt===Jt.COLOR){let y=L._fromNumbers,q=L._toNumbers,nt=_e(Le(F(Oi(y[0],q[0],Ct)),0,255),0),$=_e(Le(F(Oi(y[1],q[1],Ct)),0,255),0),K=_e(Le(F(Oi(y[2],q[2],Ct)),0,255),0),ft=Le(F(_e(Oi(y[3],q[3],Ct),qt)),0,1);if(St=`rgba(${nt},${$},${K},${ft})`,pt){let rt=L._numbers;rt[0]=nt,rt[1]=$,rt[2]=K,rt[3]=ft}}else if(Vt===Jt.COMPLEX){St=L._strings[0];for(let y=0,q=L._toNumbers.length;y<q;y++){let nt=F(_e(Oi(L._fromNumbers[y],L._toNumbers[y],Ct),qt)),$=L._strings[y+1];St+=`${$?nt+$:nt}`,pt&&(L._numbers[y]=nt)}}if(pt&&(L._number=A),!i&&Y!==Xe.blend){let y=L.property;U=L.target,Nt?U[y]=St:Et===xe.ATTRIBUTE?U.setAttribute(y,St):(X=U.style,Et===xe.TRANSFORM?(U!==j&&(j=U,ot=U[tc]),ot[y]=St,V=1):Et===xe.CSS?X[y]=St:Et===xe.CSS_VAR&&X.setProperty(y,St)),E&&(k=1)}else L._value=St}if(V&&L._renderTransforms){let dt=Bi;for(let Ct in ot)dt+=`${Lg[Ct]}${ot[Ct]}) `;X.transform=dt,V=0}L=L._next}!e&&k&&n.onRender(n)}!e&&E&&n.onUpdate(n)}return r&&I?!e&&(r.began&&!P&&b>=o&&!a||P&&b<=ae&&a)&&(n.onComplete(n),n.completed=!P):E&&C?c===1/0?n._startTime+=n.duration:n._currentIteration>=c-1&&(n.paused=!0,!a&&!g&&(n.completed=!0,!e&&!(r&&(P||!r.began))&&(n.onComplete(n),n._resolve(n)))):n.completed=!1,k},Dr=(n,t,e,i,s)=>{let r=n._currentIteration;if(ql(n,t,e,i,s),n._hasChildren){let o=n,a=o.backwards,l=i?t:o._iterationTime,c=So(),h=0,u=!0;if(!i&&o._currentIteration!==r){let d=o.iterationDuration;Se(o,p=>{if(!a)!p.completed&&!p.backwards&&p._currentTime<p.iterationDuration&&ql(p,d,e,1,un.FORCE),p.began=!1,p.completed=!1;else{let g=p.duration,x=p._offset+p._delay,m=x+g;!e&&g<=ae&&(!x||m===d)&&p.onComplete(p)}}),e||o.onLoop(o)}Se(o,d=>{let p=_e((l-d._offset)*d._speed,12),g=d._fps<o._fps?d.requestTick(c):s;h+=ql(d,p,e,i,g),!d.completed&&u&&(u=!1)},a),!e&&h&&o.onRender(o),u&&o._currentTime>=o.duration&&(o.paused=!0,o.completed||(o.completed=!0,e||(o.onComplete(o),o._resolve(o))))}},Nr={animation:null,update:Ke},aT=n=>{let t=Nr.animation;return t||(t={duration:ae,computeDeltaTime:Ke,_offset:0,_delay:0,_head:null,_tail:null},Nr.animation=t,Nr.update=()=>{n.forEach(e=>{for(let i in e){let s=e[i],r=s._head;if(r){let o=r._valueType,a=o===Jt.COMPLEX||o===Jt.COLOR?We(r._fromNumbers):null,l=r._fromNumber,c=s._tail;for(;c&&c!==r;){if(a)for(let h=0,u=c._numbers.length;h<u;h++)a[h]+=c._numbers[h];else l+=c._number;c=c._prevAdd}r._toNumber=l,r._toNumbers=a}}}),ql(t,1,1,0,un.FORCE)}),t},Hg=Vn?requestAnimationFrame:setImmediate,lT=Vn?cancelAnimationFrame:clearImmediate,nd=class extends Kl{constructor(t){super(t),this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=Ng,this.paused=!!(Vn&&Fr.hidden),this.reqId=null}update(){let t=this._currentTime=So();if(this.requestTick(t)){this.computeDeltaTime(t);let e=this._speed,i=this._fps,s=this._head;for(;s;){let r=s._next;s.paused?(Vi(this,s),this._hasChildren=!!this._tail,s._running=!1,s.completed&&!s._cancelled&&s.cancel()):Dr(s,(t-s._startTime)*s._speed*e,0,0,s._fps<i?s.requestTick(t):un.AUTO),s=r}Nr.update()}}wake(){return this.useDefaultMainLoop&&!this.reqId&&!this.paused&&(this.reqId=Hg(Gg)),this}pause(){return this.paused=!0,cT()}resume(){if(this.paused)return this.paused=!1,Se(this,t=>t.resetTime()),this.wake()}get speed(){return this._speed*(Me.timeScale===1?1:ms)}set speed(t){this._speed=t*Me.timeScale,Se(this,e=>e.speed=e._speed)}get timeUnit(){return Me.timeScale===1?"ms":"s"}set timeUnit(t){let i=t==="s",s=i?.001:1;if(Me.timeScale!==s){Me.timeScale=s,Me.tickThreshold=200*s;let r=i?.001:ms;this.defaults.duration*=r,this._speed*=r}}get precision(){return Me.precision}set precision(t){Me.precision=t}},Ae=(()=>{let n=new nd(So());return Vn&&(Fg.engine=n,Fr.addEventListener("visibilitychange",()=>{n.pauseOnDocumentHidden&&(Fr.hidden?n.pause():n.resume())})),n})(),Gg=()=>{Ae._head?(Ae.reqId=Hg(Gg),Ae.update()):Ae.reqId=0},cT=()=>(lT(Ae.reqId),Ae.reqId=0,Ae),hT=(n,t,e)=>{let i=n.style.transform,s;if(i){let r=n[tc],o;for(;o=Kb.exec(i);){let a=o[1],l=o[2].slice(1,-1);r[a]=l,a===t&&(s=l,e&&(e[t]=l))}}return i&&!Kt(s)?s:ps(t,"scale")?"1":ps(t,"rotate")||ps(t,"skew")?"0deg":"0px"};function Mg(n){let t=ec(n)?Me.root.querySelectorAll(n):n;if(t instanceof NodeList||t instanceof HTMLCollection)return t}function Wg(n){if(Xl(n))return[];if(gs(n)){let e=n.flat(1/0),i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];if(!Xl(o)){let a=Mg(o);if(a)for(let l=0,c=a.length;l<c;l++){let h=a[l];if(!Xl(h)){let u=!1;for(let d=0,p=i.length;d<p;d++)if(i[d]===h){u=!0;break}u||i.push(h)}}else{let l=!1;for(let c=0,h=i.length;c<h;c++)if(i[c]===o){l=!0;break}l||i.push(o)}}}return i}if(!Vn)return[n];let t=Mg(n);return t?Array.from(t):[n]}function ud(n){let t=Wg(n),e=t.length;if(e)for(let i=0;i<e;i++){let s=t[i];if(!s[_g]){s[_g]=!0;let r=Og(s);(s.nodeType||r)&&(s[ad]=!0,s[Ig]=r,s[tc]={})}}return t}var uT=["opacity","rotate","overflow","color"],dT=(n,t)=>{if(uT.includes(t))return!1;if(n.getAttribute(t)||t in n){if(t==="scale"){let e=n.parentNode;return e&&e.tagName==="filter"}return!0}};var fT=n=>{let t=Xb.exec(n)||Yb.exec(n),e=Kt(t[4])?1:+t[4];return[+t[1],+t[2],+t[3],e]},pT=n=>{let t=n.length,e=t===4||t===5;return[+("0x"+n[1]+n[e?1:2]),+("0x"+n[e?2:3]+n[e?2:4]),+("0x"+n[e?3:5]+n[e?3:6]),t===5||t===9?+(+("0x"+n[e?4:7]+n[e?4:8])/255).toFixed(3):1]},Qu=(n,t,e)=>(e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*(2/3-e)*6:n),mT=n=>{let t=qb.exec(n)||$b.exec(n),e=+t[1]/360,i=+t[2]/100,s=+t[3]/100,r=Kt(t[4])?1:+t[4],o,a,l;if(i===0)o=a=l=s;else{let c=s<.5?s*(1+i):s+i-s*i,h=2*s-c;o=_e(Qu(h,c,e+1/3)*255,0),a=_e(Qu(h,c,e)*255,0),l=_e(Qu(h,c,e-1/3)*255,0)}return[o,a,l,r]},gT=n=>Vg(n)?fT(n):Bg(n)?pT(n):zg(n)?mT(n):[0,0,0,1],ze=(n,t)=>Kt(n)?t:n,Ni=(n,t,e,i,s)=>{if(Zl(n)){let r=()=>{let o=n(t,e,i);return isNaN(+o)?o||0:+o};return s&&(s.func=r),r()}else return n},dd=(n,t)=>n[ad]?n[Ig]&&dT(n,t)?xe.ATTRIBUTE:ld.includes(t)||Eo.get(t)?xe.TRANSFORM:ps(t,"--")?xe.CSS_VAR:t in n.style?xe.CSS:t in n?xe.OBJECT:xe.ATTRIBUTE:xe.OBJECT,Sg=(n,t,e)=>{let i=n.style[t];i&&e&&(e[t]=i);let s=i||getComputedStyle(n[Gb]||n).getPropertyValue(t);return s==="auto"?"0":s},Lr=(n,t,e,i)=>{let s=Kt(e)?dd(n,t):e;return s===xe.OBJECT?n[t]||0:s===xe.ATTRIBUTE?n.getAttribute(t):s===xe.TRANSFORM?hT(n,t,i):s===xe.CSS_VAR?Sg(n,t,i).trimStart():Sg(n,t,i)},id=(n,t,e)=>e==="-"?n-t:e==="+"?n+t:n*t,fd=()=>({t:Jt.NUMBER,n:0,u:null,o:null,d:null,s:null}),Sn=(n,t)=>{if(t.t=Jt.NUMBER,t.n=0,t.u=null,t.o=null,t.d=null,t.s=null,!n)return t;let e=+n;if(isNaN(e)){let i=n;i[1]==="="&&(t.o=i[0],i=i.slice(2));let s=i.includes(" ")?!1:Ug.exec(i);if(s)return t.t=Jt.UNIT,t.n=+s[1],t.u=s[2],t;if(t.o)return t.n=+i,t;if(jb(i))return t.t=Jt.COLOR,t.d=gT(i),t;{let r=i.match(yg);return t.t=Jt.COMPLEX,t.d=r?r.map(Number):[],t.s=i.split(yg)||[],t}}else return t.n=e,t},bg=(n,t)=>(t.t=n._valueType,t.n=n._toNumber,t.u=n._unit,t.o=null,t.d=We(n._toNumbers),t.s=We(n._strings),t),hn=fd(),Jl={_rep:new WeakMap,_add:new Map},pd=(n,t,e="_rep")=>{let i=Jl[e],s=i.get(n);return s||(s={},i.set(n,s)),s[t]?s[t]:s[t]={_head:null,_tail:null}},xT=(n,t)=>n._isOverridden||n._absoluteStartTime>t._absoluteStartTime,$l=n=>{n._isOverlapped=1,n._isOverridden=1,n._changeDuration=ae,n._currentTime=ae},Xg=(n,t)=>{let e=n._composition;if(e===Xe.replace){let i=n._absoluteStartTime;Ur(t,n,xT,"_prevRep","_nextRep");let s=n._prevRep;if(s){let r=s.parent,o=s._absoluteStartTime+s._changeDuration;if(n.parent.id!==r.id&&r.iterationCount>1&&o+(r.duration-r.iterationDuration)>i){$l(s);let c=s._prevRep;for(;c&&c.parent.id===r.id;)$l(c),c=c._prevRep}let a=i-n._delay;if(o>a){let c=s._startTime,h=o-(c+s._updateDuration);s._changeDuration=a-h-c,s._currentTime=s._changeDuration,s._isOverlapped=1,s._changeDuration<ae&&$l(s)}let l=!0;if(Se(r,c=>{c._isOverlapped||(l=!1)}),l){let c=r.parent;if(c){let h=!0;Se(c,u=>{u!==r&&Se(u,d=>{d._isOverlapped||(h=!1)})}),h&&c.cancel()}else r.cancel()}}}else if(e===Xe.blend){let i=pd(n.target,n.property,"_add"),s=aT(Jl._add),r=i._head;r||(r={...n},r._composition=Xe.replace,r._updateDuration=ae,r._startTime=0,r._numbers=We(n._fromNumbers),r._number=0,r._next=null,r._prev=null,Ur(i,r),Ur(s,r));let o=n._toNumber;if(n._fromNumber=r._fromNumber-o,n._toNumber=0,n._numbers=We(n._fromNumbers),n._number=0,r._fromNumber=o,n._toNumbers){let a=We(n._toNumbers);a&&a.forEach((l,c)=>{n._fromNumbers[c]=r._fromNumbers[c]-l,n._toNumbers[c]=0}),r._fromNumbers=a}Ur(i,n,null,"_prevAdd","_nextAdd")}return n},Yg=n=>{let t=n._composition;if(t!==Xe.none){let e=n.target,i=n.property,o=Jl._rep.get(e)[i];if(Vi(o,n,"_prevRep","_nextRep"),t===Xe.blend){let a=Jl._add,l=a.get(e);if(!l)return;let c=l[i],h=Nr.animation;Vi(c,n,"_prevAdd","_nextAdd");let u=c._head;if(u&&u===c._tail){Vi(c,u,"_prevAdd","_nextAdd"),Vi(h,u);let d=!0;for(let p in l)if(l[p]._head){d=!1;break}d&&a.delete(e)}}}return n},Tg=n=>(n.paused=!0,n.began=!1,n.completed=!1,n),sd=n=>(n._cancelled&&(n._hasChildren?Se(n,sd):Se(n,t=>{t._composition!==Xe.none&&Xg(t,pd(t.target,t.property))}),n._cancelled=0),n),_T=0,Ql=class extends Kl{constructor(t={},e=null,i=0){super(0);let{id:s,delay:r,duration:o,reversed:a,alternate:l,loop:c,loopDelay:h,autoplay:u,frameRate:d,playbackRate:p,onComplete:g,onLoop:x,onPause:m,onBegin:f,onBeforeUpdate:b,onUpdate:S}=t;Me.scope&&Me.scope.revertibles.push(this);let _=e?0:Ae._elapsedTime,w=e?e.defaults:Me.defaults,E=Zl(r)||Kt(r)?w.delay:+r,C=Zl(o)||Kt(o)?1/0:+o,I=ze(c,w.loop),M=ze(h,w.loopDelay),v=I===!0||I===1/0||I<0?1/0:I+1,D=0;if(e)D=i;else{let k=So();Ae.paused&&(Ae.requestTick(k),k=Ae._elapsedTime),D=k-Ae._startTime}this.id=Kt(s)?++_T:s,this.parent=e,this.duration=hd((C+M)*v-M)||ae,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=f||w.onBegin,this.onBeforeUpdate=b||w.onBeforeUpdate,this.onUpdate=S||w.onUpdate,this.onLoop=x||w.onLoop,this.onPause=m||w.onPause,this.onComplete=g||w.onComplete,this.iterationDuration=C,this.iterationCount=v,this._autoplay=e?!1:ze(u,w.autoplay),this._offset=D,this._delay=E,this._loopDelay=M,this._iterationTime=0,this._currentIteration=0,this._resolve=Ke,this._running=!1,this._reversed=+ze(a,w.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=ze(l,w.alternate),this._prev=null,this._next=null,this._elapsedTime=_,this._startTime=_,this._lastTime=_,this._fps=ze(d,w.frameRate),this._speed=ze(p,w.playbackRate)}get cancelled(){return!!this._cancelled}set cancelled(t){t?this.cancel():this.reset(1).play()}get currentTime(){return Le(_e(this._currentTime,Me.precision),-this._delay,this.duration)}set currentTime(t){let e=this.paused;this.pause().seek(+t),e||this.resume()}get iterationCurrentTime(){return _e(this._iterationTime,Me.precision)}set iterationCurrentTime(t){this.currentTime=this.iterationDuration*this._currentIteration+t}get progress(){return Le(_e(this._currentTime/this.duration,5),0,1)}set progress(t){this.currentTime=this.duration*t}get iterationProgress(){return Le(_e(this._iterationTime/this.iterationDuration,5),0,1)}set iterationProgress(t){let e=this.iterationDuration;this.currentTime=e*this._currentIteration+e*t}get currentIteration(){return this._currentIteration}set currentIteration(t){this.currentTime=this.iterationDuration*Le(+t,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(t){t?this.reverse():this.play()}get speed(){return super.speed}set speed(t){super.speed=t,this.resetTime()}reset(t=0){return sd(this),this._reversed&&!this._reverse&&(this.reversed=!1),this._iterationTime=this.iterationDuration,Dr(this,0,1,t,un.FORCE),Tg(this),this._hasChildren&&Se(this,Tg),this}init(t=0){this.fps=this._fps,this.speed=this._speed,!t&&this._hasChildren&&Dr(this,this.duration,1,t,un.FORCE),this.reset(t);let e=this._autoplay;return e===!0?this.resume():e&&!Kt(e.linked)&&e.link(this),this}resetTime(){let t=1/(this._speed*Ae._speed);return this._startTime=So()-(this._currentTime+this._delay)*t,this}pause(){return this.paused?this:(this.paused=!0,this.onPause(this),this)}resume(){return this.paused?(this.paused=!1,this.duration<=ae&&!this._hasChildren?Dr(this,ae,0,0,un.FORCE):(this._running||(Ur(Ae,this),Ae._hasChildren=!0,this._running=!0),this.resetTime(),this._startTime-=12,Ae.wake()),this):this}restart(){return this.reset(0).resume()}seek(t,e=0,i=0){sd(this),this.completed=!1;let s=this.paused;return this.paused=!0,Dr(this,t+this._delay,~~e,~~i,un.AUTO),s?this:this.resume()}alternate(){let t=this._reversed,e=this.iterationCount,i=this.iterationDuration,s=e===1/0?To(Dg/i):e;return this._reversed=+(this._alternate&&!(s%2)?t:!t),e===1/0?this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress:this.seek(i*s-this._currentTime),this.resetTime(),this}play(){return this._reversed&&this.alternate(),this.resume()}reverse(){return this._reversed||this.alternate(),this.resume()}cancel(){return this._hasChildren?Se(this,t=>t.cancel(),!0):Se(this,Yg),this._cancelled=1,this.pause()}stretch(t){let e=this.duration,i=Mo(t);if(e===i)return this;let s=t/e,r=t<=ae;return this.duration=r?ae:i,this.iterationDuration=r?ae:Mo(this.iterationDuration*s),this._offset*=s,this._delay*=s,this._loopDelay*=s,this}revert(){Dr(this,0,1,0,un.AUTO);let t=this._autoplay;return t&&t.linked&&t.linked===this&&t.revert(),this.cancel()}complete(){return this.seek(this.duration).cancel()}then(t=Ke){let e=this.then,i=()=>{this.then=null,t(this),this.then=e,this._resolve=Ke};return new Promise(s=>(this._resolve=()=>s(i()),this.completed&&this._resolve(),this))}};var Or=n=>n,qg=(n,t,e)=>(((1-3*e+3*t)*n+(3*e-6*t))*n+3*t)*n,yT=(n,t,e)=>{let i=0,s=1,r,o,a=0;do o=i+(s-i)/2,r=qg(o,t,e)-n,r>0?s=o:i=o;while(bo(r)>1e-7&&++a<100);return o},vT=(n=.5,t=0,e=.5,i=1)=>n===t&&e===i?Or:s=>s===0||s===1?s:qg(yT(s,n,e),t,i),MT=(n=10,t)=>{let e=t?nT:To;return i=>e(Le(i,0,1)*n)*(1/n)},$g=(...n)=>{let t=n.length;if(!t)return Or;let e=t-1,i=n[0],s=n[e],r=[0],o=[fs(i)];for(let a=1;a<e;a++){let l=n[a],c=ec(l)?l.trim().split(" "):[l],h=c[0],u=c[1];r.push(Kt(u)?a/e:fs(u)/100),o.push(fs(h))}return o.push(fs(s)),r.push(1),function(l){for(let c=1,h=r.length;c<h;c++){let u=r[c];if(l<=u){let d=r[c-1],p=o[c-1];return p+(o[c]-p)*(l-d)/(u-d)}}return o[o.length-1]}},ST=(n=10,t=1)=>{let e=[0],i=n-1;for(let s=1;s<i;s++){let r=e[s-1],o=s/i,a=(s+1)/i,l=o+(a-o)*Math.random(),c=o*(1-t)+l*t;e.push(Le(c,r,1))}return e.push(1),$g(...e)},bT=wo/2,Eg=wo*2,vo=(n=1.68)=>t=>Ir(t,+n),wg={[Bi]:vo,Quad:vo(2),Cubic:vo(3),Quart:vo(4),Quint:vo(5),Sine:n=>1-eT(n*bT),Circ:n=>1-kg(1-n*n),Expo:n=>n?Ir(2,10*n-10):0,Bounce:n=>{let t,e=4;for(;n<((t=Ir(2,--e))-1)/11;);return 1/Ir(4,3-e)-7.5625*Ir((t*3-2)/22-n,2)},Back:(n=1.70158)=>t=>(+n+1)*t*t*t-+n*t*t,Elastic:(n=1,t=.3)=>{let e=Le(+n,1,10),i=Le(+t,ae,2),s=i/Eg*iT(1/e),r=Eg/i;return o=>o===0||o===1?o:-e*Ir(2,-10*(1-o))*tT((1-o-s)*r)}},rd={in:n=>t=>n(t),out:n=>t=>1-n(1-t),inOut:n=>t=>t<.5?n(t*2)/2:1-n(t*-2+2)/2,outIn:n=>t=>t<.5?(1-n(1-t*2))/2:(n(t*2-1)+1)/2},TT=(n,t,e)=>{if(e[n])return e[n];if(n.indexOf("(")<=-1){let s=rd[n]||n.includes("Back")||n.includes("Elastic")?t[n]():t[n];return s?e[n]=s:Or}else{let i=n.slice(0,-1).split("("),s=t[i[0]];return s?e[n]=s(...i[1].split(",")):Or}},ET=(()=>{let n={linear:$g,irregular:ST,steps:MT,cubicBezier:vT};for(let t in rd)for(let e in wg){let i=wg[e],s=rd[t];n[t+e]=e===Bi||e==="Back"||e==="Elastic"?(r,o)=>s(i(r,o)):s(i)}return n})(),wT={linear:Or},od=n=>Zl(n)?n:ec(n)?TT(n,ET,wT):Or,Ag={},md=(n,t,e)=>{if(e===xe.TRANSFORM){let i=Eo.get(n);return i||n}else if(e===xe.CSS||e===xe.ATTRIBUTE&&Og(t)&&n in t.style){let i=Ag[n];if(i)return i;{let s=n&&Qb(n);return Ag[n]=s,s}}else return n},ju={deg:1,rad:180/wo,turn:360},Cg={},Zg=(n,t,e,i=!1)=>{let s=t.u,r=t.n;if(t.t===Jt.UNIT&&s===e)return t;let o=r+s+e,a=Cg[o];if(!Kt(a)&&!i)t.n=a;else{let l;if(s in ju)l=r*ju[s]/ju[e];else{let h=n.cloneNode(),u=n.parentNode,d=u&&u!==Fr?u:Fr.body;d.appendChild(h);let p=h.style;p.width=100+s;let g=h.offsetWidth||100;p.width=100+e;let x=h.offsetWidth||100,m=g/x;d.removeChild(h),l=m*r}t.n=l,Cg[o]=l}return t.t,Jt.UNIT,t.u=e,t},gd=n=>{if(n._hasChildren)Se(n,gd,!0);else{let t=n;t.pause(),Se(t,e=>{let i=e.property,s=e.target;if(s[ad]){let r=s.style,o=t._inlineStyles[i];if(e._tweenType===xe.TRANSFORM){let a=s[tc];if(Kt(o)||o===Bi?delete a[i]:a[i]=o,e._renderTransforms)if(!Object.keys(a).length)r.removeProperty("transform");else{let l=Bi;for(let c in a)l+=Lg[c]+a[c]+") ";r.transform=l}}else Kt(o)||o===Bi?r.removeProperty(i):r[i]=o;t._tail===e&&t.targets.forEach(a=>{a.getAttribute&&a.getAttribute("style")===Bi&&a.removeAttribute("style")})}})}return n},kt=fd(),Zt=fd(),Hl={func:null},Gl=[null],Pr=[null,null],Wl={to:null},AT=0,Fi,Bn,CT=(n,t)=>{let e={};if(gs(n)){let i=[].concat(...n.map(s=>Object.keys(s))).filter(Yl);for(let s=0,r=i.length;s<r;s++){let o=i[s],a=n.map(l=>{let c={};for(let h in l){let u=l[h];Yl(h)?h===o&&(c.to=u):c[h]=u}return c});e[o]=a}}else{let i=ze(t.duration,Me.defaults.duration);Object.keys(n).map(r=>({o:parseFloat(r)/100,p:n[r]})).sort((r,o)=>r.o-o.o).forEach(r=>{let o=r.o,a=r.p;for(let l in a)if(Yl(l)){let c=e[l];c||(c=e[l]=[]);let h=o*i,u=c.length,d=c[u-1],p={to:a[l]},g=0;for(let x=0;x<u;x++)g+=c[x].duration;u===1&&(p.from=d.to),a.ease&&(p.ease=a.ease),p.duration=h-(u?g:0),c.push(p)}return r});for(let r in e){let o=e[r],a;for(let l=0,c=o.length;l<c;l++){let h=o[l],u=h.ease;h.ease=a||void 0,a=u}o[0].duration||o.shift()}}return e},jl=class extends Ql{constructor(t,e,i,s,r=!1,o=0,a=0){super(e,i,s);let l=ud(t),c=l.length,h=e.keyframes,u=h?oT(CT(h,e),e):e,{delay:d,duration:p,ease:g,playbackEase:x,modifier:m,composition:f,onRender:b}=u,S=i?i.defaults:Me.defaults,_=ze(x,S.playbackEase),w=_?od(_):null,E=!Kt(g)&&!Kt(g.ease),C=E?g.ease:ze(g,w?"linear":S.ease),I=E?g.duration:ze(p,S.duration),M=ze(d,S.delay),v=m||S.modifier,D=Kt(f)&&c>=ms?Xe.none:Kt(f)?S.composition:f,k={},W=this._offset+(i?i._offset:0),Z=NaN,B=NaN,P=0,H=0;for(let R=0;R<c;R++){let L=l[R],U=o||R,X=a||c,j=NaN,ot=NaN;for(let V in u)if(Yl(V)){let Y=dd(L,V),tt=md(V,L,Y),it=u[V],ut=gs(it);if(r&&!ut&&(Pr[0]=it,Pr[1]=it,it=Pr),ut){let F=it.length,Vt=!Ju(it[0]);F===2&&Vt?(Wl.to=it,Gl[0]=Wl,Fi=Gl):F>2&&Vt?(Fi=[],it.forEach((Et,Nt)=>{Nt?Nt===1?(Pr[1]=Et,Fi.push(Pr)):Fi.push(Et):Pr[0]=Et})):Fi=it}else Gl[0]=it,Fi=Gl;let ht=null,lt=null,pt=NaN,dt=0,Ct=0;for(let F=Fi.length;Ct<F;Ct++){let Vt=Fi[Ct];Ju(Vt)?Bn=Vt:(Wl.to=Vt,Bn=Wl),Hl.func=null;let Et=Ni(Bn.to,L,U,X,Hl),Nt;Ju(Et)&&!Kt(Et.to)?(Bn=Et,Nt=Et.to):Nt=Et;let Rt=Ni(Bn.from,L,U,X),qt=Bn.ease,St=!Kt(qt)&&!Kt(qt.ease),A=St?qt.ease:qt||C,y=St?qt.duration:Ni(ze(Bn.duration,F>1?Ni(I,L,U,X)/F:I),L,U,X),q=Ni(ze(Bn.delay,Ct?0:M),L,U,X),nt=Ni(ze(Bn.composition,D),L,U,X),$=cd(nt)?nt:Xe[nt],K=Bn.modifier||v,ft=!Kt(Rt),rt=!Kt(Nt),xt=gs(Nt),wt=xt||ft&&rt,at=lt?dt+q:q,_t=W+at;!H&&(ft||xt)&&(H=1);let Tt=lt;if($!==Xe.none){ht||(ht=pd(L,tt));let At=ht._head;for(;At&&!At._isOverridden&&At._absoluteStartTime<=_t;)if(Tt=At,At=At._nextRep,At&&At._absoluteStartTime>=_t)for(;At;)$l(At),At=At._nextRep}if(wt?(Sn(xt?Ni(Nt[0],L,U,X):Rt,kt),Sn(xt?Ni(Nt[1],L,U,X,Hl):Nt,Zt),kt.t===Jt.NUMBER&&(Tt?Tt._valueType===Jt.UNIT&&(kt.t=Jt.UNIT,kt.u=Tt._unit):(Sn(Lr(L,tt,Y,k),hn),hn.t===Jt.UNIT&&(kt.t=Jt.UNIT,kt.u=hn.u)))):(rt?Sn(Nt,Zt):lt?bg(lt,Zt):Sn(i&&Tt&&Tt.parent.parent===i?Tt._value:Lr(L,tt,Y,k),Zt),ft?Sn(Rt,kt):lt?bg(lt,kt):Sn(i&&Tt&&Tt.parent.parent===i?Tt._value:Lr(L,tt,Y,k),kt)),kt.o&&(kt.n=id(Tt?Tt._toNumber:Sn(Lr(L,tt,Y,k),hn).n,kt.n,kt.o)),Zt.o&&(Zt.n=id(kt.n,Zt.n,Zt.o)),kt.t!==Zt.t){if(kt.t===Jt.COMPLEX||Zt.t===Jt.COMPLEX){let At=kt.t===Jt.COMPLEX?kt:Zt,Lt=kt.t===Jt.COMPLEX?Zt:kt;Lt.t=Jt.COMPLEX,Lt.s=We(At.s),Lt.d=At.d.map(()=>Lt.n)}else if(kt.t===Jt.UNIT||Zt.t===Jt.UNIT){let At=kt.t===Jt.UNIT?kt:Zt,Lt=kt.t===Jt.UNIT?Zt:kt;Lt.t=Jt.UNIT,Lt.u=At.u}else if(kt.t===Jt.COLOR||Zt.t===Jt.COLOR){let At=kt.t===Jt.COLOR?kt:Zt,Lt=kt.t===Jt.COLOR?Zt:kt;Lt.t=Jt.COLOR,Lt.s=At.s,Lt.d=[0,0,0,1]}}if(kt.u!==Zt.u){let At=Zt.u?kt:Zt;At=Zg(L,At,Zt.u?Zt.u:kt.u,!1)}if(Zt.d&&kt.d&&Zt.d.length!==kt.d.length){let At=kt.d.length>Zt.d.length?kt:Zt,Lt=At===kt?Zt:kt;Lt.d=At.d.map((le,O)=>Kt(Lt.d[O])?0:Lt.d[O]),Lt.s=We(At.s)}let Ot=_e(+y||ae,12),bt={parent:this,id:AT++,property:tt,target:L,_value:null,_func:Hl.func,_ease:od(A),_fromNumbers:We(kt.d),_toNumbers:We(Zt.d),_strings:We(Zt.s),_fromNumber:kt.n,_toNumber:Zt.n,_numbers:We(kt.d),_number:kt.n,_unit:Zt.u,_modifier:K,_currentTime:0,_startTime:at,_delay:+q,_updateDuration:Ot,_changeDuration:Ot,_absoluteStartTime:_t,_tweenType:Y,_valueType:Zt.t,_composition:$,_isOverlapped:0,_isOverridden:0,_renderTransforms:0,_prevRep:null,_nextRep:null,_prevAdd:null,_nextAdd:null,_prev:null,_next:null};$!==Xe.none&&Xg(bt,ht),isNaN(pt)&&(pt=bt._startTime),dt=_e(at+Ot,12),lt=bt,P++,Ur(this,bt)}(isNaN(B)||pt<B)&&(B=pt),(isNaN(Z)||dt>Z)&&(Z=dt),Y===xe.TRANSFORM&&(j=P-Ct,ot=P)}if(!isNaN(j)){let V=0;Se(this,Y=>{V>=j&&V<ot&&(Y._renderTransforms=1,Y._composition===Xe.blend&&Se(Nr.animation,tt=>{tt.id===Y.id&&(tt._renderTransforms=1)})),V++})}}c||console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation."),B?(Se(this,R=>{R._startTime-R._delay||(R._delay-=B),R._startTime-=B}),Z-=B):B=0,Z||(Z=ae,this.iterationCount=0),this.targets=l,this.duration=Z===ae?ae:hd((Z+this._loopDelay)*this.iterationCount-this._loopDelay)||ae,this.onRender=b||S.onRender,this._ease=w,this._delay=B,this.iterationDuration=Z,this._inlineStyles=k,!this._autoplay&&H&&this.onRender(this)}stretch(t){let e=this.duration;if(e===Mo(t))return this;let i=t/e;return Se(this,s=>{s._updateDuration=Mo(s._updateDuration*i),s._changeDuration=Mo(s._changeDuration*i),s._currentTime*=i,s._startTime*=i,s._absoluteStartTime*=i}),super.stretch(t)}refresh(){return Se(this,t=>{let e=Lr(t.target,t.property,t._tweenType);Sn(e,hn),t._fromNumbers=We(hn.d),t._fromNumber=hn.n,t._func&&(Sn(t._func(),Zt),t._toNumbers=We(Zt.d),t._strings=We(Zt.s),t._toNumber=Zt.n)}),this}revert(){return super.revert(),gd(this)}then(t){return super.then(t)}},Ao=(n,t)=>new jl(n,t,null,0,!1).init();var Kg=["x","y","z"],bL=["perspective","width","height","margin","padding","top","right","bottom","left","borderWidth","fontSize","borderRadius",...Kg],TL=[...Kg,...ld.filter(n=>["X","Y","Z"].some(t=>n.endsWith(t)))],EL=Vn&&(Kt(CSS)||!Object.hasOwnProperty.call(CSS,"registerProperty"));var Rg={_head:null,_tail:null},RT=(n,t,e)=>{let i=Rg._head;for(;i;){let s=i._next,r=i.$el===n,o=!t||i.property===t,a=!e||i.parent===e;if(r&&o&&a){let l=i.animation;try{l.commitStyles()}catch{}l.cancel(),Vi(Rg,i);let c=i.parent;c&&(c._completed++,c.animations.length===c._completed&&(c.completed=!0,c.muteCallbacks||(c.paused=!0,c.onComplete(c),c._resolve(c))))}i=s}};var PT=(n=Ke)=>new Ql({duration:1*Me.timeScale,onComplete:n},null,0).resume();function IT(n,t,e){let i=ud(n);if(!i.length)return;let[s]=i,r=dd(s,t),o=md(t,s,r),a=Lr(s,o);if(Kt(e))return a;if(Sn(a,hn),hn.t===Jt.NUMBER||hn.t===Jt.UNIT){if(e===!1)return hn.n;{let l=Zg(s,hn,e,!1);return`${_e(l.n,Me.precision)}${l.u}`}}}var DT=(n,t)=>{if(!Kt(t))return t.duration=ae,t.composition=ze(t.composition,Xe.none),new jl(n,t,null,0,!0).resume()},Pg=(n,t,e)=>{let i=!1;return Se(t,s=>{let r=s.target;if(n.includes(r)){let o=s.property,a=s._tweenType,l=md(e,r,a);(!l||l&&l===o)&&(s.parent._tail===s&&s._tweenType===xe.TRANSFORM&&s._prev&&s._prev._tweenType===xe.TRANSFORM&&(s._prev._renderTransforms=1),Vi(t,s),Yg(s),i=!0)}},!0),i},Jg=(n,t,e)=>{let i=Wg(n),s=t||Ae,r=t&&t.controlAnimation&&t;for(let a=0,l=i.length;a<l;a++){let c=i[a];RT(c,e,r)}let o;if(s._hasChildren){let a=0;Se(s,l=>{if(!l._hasChildren)if(o=Pg(i,l,e),o&&!l._head)l.cancel(),Vi(s,l);else{let h=l._offset+l._delay+l.duration;h>a&&(a=h)}l._head?Jg(n,l,e):l._hasChildren=!1},!0),Kt(s.iterationDuration)||(s.iterationDuration=a)}else o=Pg(i,s,e);return o&&!s._head&&(s._hasChildren=!1,s.cancel&&s.cancel()),i},xd=(n,t,e)=>{let i=10**(e||0);return To((Math.random()*(t-n+1/i)+n)*i)/i},LT=n=>n[xd(0,n.length-1)],UT=n=>{let t=n.length,e,i;for(;t;)i=xd(0,--t),e=n[t],n[t]=n[i],n[i]=e;return n},NT=(n,t)=>(+n).toFixed(t),FT=(n,t,e)=>`${n}`.padStart(t,e),OT=(n,t,e)=>`${n}`.padEnd(t,e),BT=(n,t,e)=>((n-t)%(e-t)+(e-t))%(e-t)+t,VT=(n,t,e,i,s)=>i+(n-t)/(e-t)*(s-i),zT=n=>n*wo/180,kT=n=>n*180/wo,HT=(n,t,e,i)=>{let s=ms/Me.defaults.frameRate;if(i!==!1){let o=i||Ae._hasChildren&&Ae;o&&o.deltaTime&&(s=o.deltaTime)}let r=1-Math.exp(-e*s*.1);return e?e===1?t:(1-r)*n+r*t:n},GT=(n,t=0)=>(...e)=>t?i=>n(...e,i):i=>n(i,...e),Qg=n=>(...t)=>{let e=n(...t);return new Proxy(Ke,{apply:(i,s,[r])=>e(r),get:(i,s)=>Qg((...r)=>{let o=WT[s](...r);return a=>o(e(a))})})},Mn=(n,t=0)=>(...e)=>(e.length<n.length?Qg(GT(n,t)):n)(...e),WT={$:ud,get:IT,set:DT,remove:Jg,cleanInlineStyles:gd,random:xd,randomPick:LT,shuffle:UT,lerp:HT,sync:PT,clamp:Mn(Le),round:Mn(_e),snap:Mn(rT),wrap:Mn(BT),interpolate:Mn(Oi,1),mapRange:Mn(VT),roundPad:Mn(NT),padStart:Mn(FT),padEnd:Mn(OT),degToRad:Mn(zT),radToDeg:Mn(kT)},XT=(n,t)=>{if(ps(t,"<")){let e=t[1]==="<",i=n._tail,s=i?i._offset+i._delay:0;return e?s:s+i.duration}},YT=(n,t)=>{let e=n.iterationDuration;if(e===ae&&(e=0),Kt(t))return e;if(cd(+t))return+t;let i=t,s=n?n.labels:null,r=!Xl(s),o=XT(n,i),a=!Kt(o),l=Jb.exec(i);if(l){let c=l[0],h=i.split(c),u=r&&h[0]?s[h[0]]:e,d=a?o:r?u:e,p=+h[1];return id(d,p,c[0])}else return a?o:r?Kt(s[i])?e:s[i]:e};var jg=(n,t={})=>{let e=[],i=0,s=t.from,r=t.reversed,o=t.ease,a=!Kt(o),c=a&&!Kt(o.ease)?o.ease:a?od(o):null,h=t.grid,u=t.axis,d=Kt(s)||s===0||s==="first",p=s==="center",g=s==="last",x=gs(n),m=fs(x?n[0]:n),f=x?fs(n[1]):0,b=Ug.exec((x?n[1]:n)+Bi),S=t.start||0+(x?m:0),_=d?0:cd(s)?s:0;return(w,E,C,I)=>{if(p&&(_=(C-1)/2),g&&(_=C-1),!e.length){for(let k=0;k<C;k++){if(!h)e.push(bo(_-k));else{let W=p?(h[0]-1)/2:_%h[0],Z=p?(h[1]-1)/2:To(_/h[0]),B=k%h[0],P=To(k/h[0]),H=W-B,R=Z-P,L=kg(H*H+R*R);u==="x"&&(L=-H),u==="y"&&(L=-R),e.push(L)}i=sT(...e)}c&&(e=e.map(k=>c(k/i)*i)),r&&(e=e.map(k=>u?k<0?k*-1:-k:bo(i-k)))}let M=x?(f-m)/i:m,D=(I?YT(I,Kt(t.start)?I.iterationDuration:S):S)+(M*_e(e[E],2)||0);return t.modifier&&(D=t.modifier(D)),b&&(D=`${D}${b[2]}`),D}};var qT=matchMedia("(prefers-reduced-motion: reduce)").matches;function t0(n,t){let e=n.getContext("2d"),i=0,s=0,r=Math.min(devicePixelRatio,2);function o(){let R=n.getBoundingClientRect();i=R.width,s=R.height,n.width=i*r,n.height=s*r,e.setTransform(r,0,0,r,0,0)}o(),new ResizeObserver(o).observe(n);let a="#2A2A2F",l="#6E6D68",c="#A6A49E",h="#FF6369",u="#8E2E32",d={idle:{x:.14,y:.5,label:"idle"},drive:{x:.34,y:.5,label:"driving"},human:{x:.52,y:.26,label:"human detected"},zone:{x:.7,y:.26,label:"slow zone"},exit:{x:.7,y:.74,label:"zone exit"}},p={start:{x:.24,y:.5,label:"start"},detect:{x:.43,y:.4,label:"detect human"},clear:{x:.61,y:.26,label:"zone clearance"},resume:{x:.61,y:.62,label:"resume speed"},complete:{x:.86,y:.62,label:"mission complete"},dev:{x:.52,y:.74,label:"clearance skipped",dev:!0}};function g(R){return{x:R.x*i,y:R.y*s}}let x=[["idle","T:start",null,700],["T:start","drive",null,700],["drive","T:detect",{cy:-.1},650],["T:detect","human",null,650],["human","T:clear",null,550],["T:clear","zone",null,550],["zone","T:resume",{cx:.79},650],["T:resume","exit",null,650],["exit","T:complete",{cy:.82},800],["T:complete","idle",{cy:1.02},900]],m=[["drive","T:dev",{cy:.68},600],["T:dev","exit",null,600]],f={};function b(){e.clearRect(0,0,i,s),e.fillStyle="#141416";for(let L=24;L<i;L+=44)for(let U=24;U<s;U+=44)e.fillRect(L,U,1.4,1.4);let R=[["idle","T:start",null,a],["T:start","drive",null,a],["drive","T:detect",{cy:-.1},a],["T:detect","human",null,a],["human","T:clear",null,a],["T:clear","zone",null,a],["zone","T:resume",{cx:.79},a],["T:resume","exit",null,a],["exit","T:complete",{cy:.82},a],["T:complete","idle",{cy:1.02},a],["drive","T:dev",{cy:.68},u],["T:dev","exit",null,u]];for(let[L,U,X,j]of R){let ot=g(_(L)),V=g(_(U)),Y,tt;X&&X.cy!=null?(Y=(ot.x+V.x)/2,tt=X.cy*s):X&&X.cx!=null?(Y=X.cx*i,tt=(ot.y+V.y)/2):(Y=(ot.x+V.x)/2,tt=(ot.y+V.y)/2),e.strokeStyle=j,e.lineWidth=1,e.setLineDash(j===u?[4,5]:[]),e.beginPath(),e.moveTo(ot.x,ot.y),e.quadraticCurveTo(Y,tt,V.x,V.y),e.stroke(),e.setLineDash([])}e.font='10px "IBM Plex Mono", monospace';for(let[L,U]of Object.entries(p)){let X=g(U),j=f[L]||0,ot=U.dev?u:a;e.fillStyle=j>0?`rgba(255,99,105,${.25+j*.7})`:"#17171A",e.strokeStyle=U.dev?u:"#3A3A40",S(X.x,X.y,5,16),e.fillStyle="#17171A",j>0&&(e.save(),e.shadowColor=h,e.shadowBlur=14*j,S(X.x,X.y,5,16),e.restore()),e.fillStyle=U.dev?"#7a4a4c":l,e.textAlign="center",e.fillText(U.label.toUpperCase(),X.x,X.y+30)}for(let[L,U]of Object.entries(d)){let X=g(U),j=f[L]||0;e.beginPath(),e.arc(X.x,X.y,17,0,Math.PI*2),e.fillStyle="#0E0E10",e.fill(),e.strokeStyle=j>0?`rgba(255,99,105,${.5+j*.5})`:"#3A3A40",e.lineWidth=1.2,e.stroke(),j>0&&(e.save(),e.strokeStyle=`rgba(255,99,105,${.35*j})`,e.lineWidth=2,e.beginPath(),e.arc(X.x,X.y,17+8*(1-j),0,Math.PI*2),e.stroke(),e.restore()),e.fillStyle=l,e.textAlign="center",e.fillText(U.label.toUpperCase(),X.x,X.y+34)}}function S(R,L,U,X){e.beginPath(),e.roundRect(R-U,L-X,U*2,X*2,2),e.fill(),e.stroke()}let _=R=>R.startsWith("T:")?p[R.slice(2)]:d[R.slice(0)],w={x:0,y:0,dev:!1,visible:!1};function E(R,L,U,X){let j=g(R),ot=g(L),V,Y;U&&U.cy!=null?(V=(j.x+ot.x)/2,Y=U.cy*s):U&&U.cx!=null?(V=U.cx*i,Y=(j.y+ot.y)/2):(V=(j.x+ot.x)/2,Y=(j.y+ot.y)/2);let tt=1-X;return{x:tt*tt*j.x+2*tt*X*V+X*X*ot.x,y:tt*tt*j.y+2*tt*X*Y+X*X*ot.y}}function C(R){f[R]=1,Ao(f,{[R]:0},{duration:700,ease:"outQuad"})}let I=412,M=["14:02:11","14:02:47","14:03:29"];function v(){let R=document.createElement("div");R.className="deviation-chip";let L=I++,U=M[L%M.length];for(R.innerHTML=`<span class="dot"></span>sealed event #${L}: zone clearance skipped \xB7 ${U}`,t.appendChild(R),Ao(R,{opacity:[0,1],translateY:[-8,0],duration:420,ease:"outQuad"});t.children.length>3;)t.firstChild.remove()}let D=0,k=!1;function W(R,L){let U=0;function X(){if(k)return;if(U>=R.length){L();return}let[j,ot,V,Y]=R[U];C((j.startsWith("T:"),j)),j.startsWith("T:")&&C(j);let tt=performance.now();w.visible=!0,w.dev=ot==="exit"&&j==="T:dev",w.dev=R===m;function it(ut){if(k)return;let ht=Math.min(1,(ut-tt)/Y),lt=1-Math.pow(1-ht,2.2),pt=E(_(j),_(ot),V,lt);w.x=pt.x,w.y=pt.y,ht<1?requestAnimationFrame(it):(C(ot),U++,w.dev&&ot==="exit"&&v(),setTimeout(X,260))}requestAnimationFrame(it)}X()}function Z(){w.visible&&(e.beginPath(),e.arc(w.x,w.y,5,0,Math.PI*2),e.fillStyle=w.dev?h:"#EDECE8",e.shadowColor=w.dev?h:"rgba(240,240,235,0.8)",e.shadowBlur=10,e.fill(),e.shadowBlur=0)}function B(){D++;let R=D%3===0,L=R?m:x;if(R){let U=x.slice(0,2),X=x.slice(7);W(U,()=>{W(m,()=>{W(X,()=>setTimeout(B,900))})})}else W(x,()=>setTimeout(B,900))}let P=!0;new IntersectionObserver(([R])=>{P=R.isIntersecting},{threshold:.05}).observe(n);function H(){b(),Z(),requestAnimationFrame(H)}if(qT){b();return}requestAnimationFrame(H),(function R(){P&&!document.hidden?B():setTimeout(R,300)})()}var e0=[{time:"13:58:02",payload:"agent v0.9.3 online, fleet B"},{time:"13:59:10",payload:"config speed_limit zone_B = 1.2 m/s"},{time:"14:01:58",payload:"intervention: operator r.rossi raised speed_limit zone_B to 1.8 m/s (remote)"},{time:"14:02:09",payload:"safety: protective stop near human, aisle 7"},{time:"14:02:10",payload:"state: velocity reached 0.0 m/s in 0.4 s"},{time:"14:04:33",payload:"mission: resumed mission 217"},{time:"14:31:02",payload:"config speed_limit zone_B restored 1.2 m/s"},{time:"14:31:05",payload:"upload: bundle sealed, Merkle root 9f3c41"}],$T="intervention: system auto-tuned speed_limit zone_B to 1.8 m/s",ZT=2,KT=5;async function n0(n){let t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return[...new Uint8Array(t)].map(e=>e.toString(16).padStart(2,"0")).join("")}async function i0(){let n=document.getElementById("event-log"),t=document.getElementById("status-dot"),e=document.getElementById("status-text"),i=document.getElementById("sealed-panel"),s=document.getElementById("btn-edit"),r=document.getElementById("btn-delete"),o=document.getElementById("btn-restore"),a=document.getElementById("btn-verify"),l=[],c="genesis";for(let b of e0)c=await n0(c+b.payload),l.push(c);let h=!1,u=!1,d=[];function p(){d.length=0,e0.forEach((b,S)=>{d.push({seq:S+1,time:b.time,payload:u&&S===ZT?$T:b.payload,deleted:h&&S===KT,sealedHash:l[S]})})}function g(){p(),n.innerHTML="",d.forEach((b,S)=>{let _=document.createElement("li");_.className="event-row"+(b.deleted?" deleted":""),_.innerHTML=`
        <span class="ev-seq">${String(b.seq).padStart(2,"0")}</span>
        <span class="ev-time">${b.time}</span>
        <span class="ev-payload">${b.deleted?"[missing event: sequence break]":x(b.payload)}</span>
        <span class="ev-hash">${b.sealedHash.slice(0,12)}</span>`,n.appendChild(_)})}let x=b=>b.replace(/[<>&]/g,S=>({"<":"&lt;",">":"&gt;","&":"&amp;"})[S]);async function m(){let b="genesis",S=!1,_=[...n.children];for(let w=0;w<d.length;w++){let E=d[w],C=_[w];if(E.deleted){S=!0,C.classList.add("bad");continue}if(S){C.classList.remove("ok"),C.classList.add("bad");continue}let I=await n0(b+E.payload);I===E.sealedHash?(C.classList.add("ok"),b=I):(S=!0,C.classList.add("bad"))}S?(t.classList.add("broken"),e.textContent="Verification fails at the exact gap: the chain is broken",i.hidden=!1):(t.classList.remove("broken"),e.textContent="Chain intact - 8 events sealed",i.hidden=!0)}function f(){Ao(".event-row",{opacity:[0,1],translateX:[-14,0],duration:480,delay:jg(55),ease:"outQuad"})}s.addEventListener("click",()=>{u=!u,s.textContent=u?"Undo edit 03":"Edit event 03",g(),m()}),r.addEventListener("click",()=>{h=!h,r.textContent=h?"Restore event 06":"Delete event 06",g(),m()}),o.addEventListener("click",()=>{u=!1,h=!1,s.textContent="Edit event 03",r.textContent="Delete event 06",g(),m()}),a.addEventListener("click",m),g(),f(),await m()}function s0(n,t){let e=document.createElement("canvas");e.id="hero-canvas",e.setAttribute("aria-hidden","true"),t&&t.parentNode?t.replaceWith(e):n.prepend(e);let i=e.getContext("2d"),s=matchMedia("(prefers-reduced-motion: reduce)").matches,r=0,o=0,a=Math.min(devicePixelRatio||1,2),l=0,c=0,h=200,u=0,d=0,p=90,g=0,x=0,m=0,f=0,b=0,S=0;s||addEventListener("pointermove",U=>{m=(U.clientX/innerWidth-.5)*2,f=(U.clientY/innerHeight-.5)*2},{passive:!0});function _(){let U=e.getBoundingClientRect();r=U.width,o=U.height,e.width=Math.round(r*a),e.height=Math.round(o*a),i.setTransform(a,0,0,a,0,0);let X=r/o>1.05;h=X?Math.min(r*.24,o*.27):Math.min(r*.36,o*.17),l=X?r*.61:r*.5,c=X?o*.36:o*.52,p=X?Math.min(r*.1,o*.15):Math.min(r*.12,o*.085),u=l,d=X?o*.72:o*.8}_(),new ResizeObserver(_).observe(e);let w=.86;function E(U,X,j){return[(U-j)*.866*p+u+g*26,((U+j)*.5-X)*p+d+x*14]}function C(U,X,j,ot,V){i.beginPath(),i.ellipse(U,X,j,ot,V||0,0,Math.PI*2)}function I(U,X,j,ot,V,Y){let[tt,it]=E(U,X,j);C(tt,it,ot*1.2247*p,ot*.7071*p,0),i.strokeStyle=V,i.globalAlpha=Y,i.lineWidth=2,i.stroke(),i.globalAlpha=1}let M=[];for(let U=0;U<9;U++){let X=U/9*Math.PI*2+.35;M.push({a:X,r:.97+U*37%10/90,s:.05+U*53%10/55})}let v=[{a:1.25,len:.34,w:.055},{a:2.35,len:.46,w:.045},{a:4.05,len:.28,w:.06}],D=[];for(let U=0;U<90;U++)D.push({t:Math.random(),sp:.04+Math.random()*.05});let k=[];for(let U=0;U<22;U++)k.push({ph:U/22*Math.PI*2,sink:Math.random()});let W=[];for(let U=0;U<26;U++)W.push({x:Math.random(),y:Math.random(),sp:.02+Math.random()*.05});function Z(){let U=s?.5:b*.14%1;return U<.14?1-U/.14:0}function B(U,X,j,ot){if(i.save(),ot){let[,Vt]=E(0,0,0);i.translate(0,2*Vt),i.scale(1,-1),i.globalAlpha=.15}else j<1&&(i.globalAlpha=j);let V=Math.sin(b*.8)*h*.02,Y=U,tt=X+V,it=i.createRadialGradient(Y,tt,h*.2,Y,tt,h*1.55),ut=.5+Math.sin(b*1.6)*.15;it.addColorStop(0,`rgba(255,99,105,${(.5*ut+P*.35)*(ot?.4:1)})`),it.addColorStop(1,"rgba(255,99,105,0)"),i.fillStyle=it,i.fillRect(Y-h*1.6,tt-h*1.6,h*3.2,h*3.2);for(let Vt of M){let Et=Y+Math.cos(Vt.a)*h*Vt.r,Nt=tt+Math.sin(Vt.a)*h*Vt.r*w;C(Et,Nt,h*Vt.s,h*Vt.s*w,0),i.fillStyle="#5a151a",i.fill()}let ht=i.createRadialGradient(Y-h*.25,tt-h*.3,h*.1,Y,tt,h*1.05);ht.addColorStop(0,"rgba(198,66,72,1)"),ht.addColorStop(.55,"rgba(134,34,40,1)"),ht.addColorStop(1,"rgba(70,17,21,1)"),C(Y,tt,h,h*w,0),i.fillStyle=ht,i.fill();let lt=i.createRadialGradient(Y,tt,0,Y,tt,h*.9),pt=ut*.42+P*.4;lt.addColorStop(0,`rgba(255,110,116,${pt})`),lt.addColorStop(.6,`rgba(200,50,57,${pt*.55})`),lt.addColorStop(1,"rgba(190,45,52,0)"),C(Y,tt,h*.98,h*w*.98,0),i.fillStyle=lt,i.fill(),i.save(),C(Y,tt,h,h*w,0),i.clip();let dt=i.createLinearGradient(Y-h,tt-h*w,Y+h*.2,tt+h*.2);dt.addColorStop(0,"rgba(255,240,238,0.2)"),dt.addColorStop(.4,"rgba(255,240,238,0.03)"),dt.addColorStop(1,"rgba(0,0,0,0.12)"),i.fillStyle=dt,i.fillRect(Y-h,tt-h,h*2,h*2),i.restore(),i.save(),i.shadowColor="rgba(0,0,0,0.6)",i.shadowBlur=6,i.shadowOffsetY=2,C(Y,tt,h*.87,h*.87*w,0),i.strokeStyle="rgba(140,33,38,0.9)",i.lineWidth=h*.045,i.stroke(),i.restore();let Ct=(Vt,Et)=>{C(Y+Et*.5,tt+Et*.9,Vt,Vt*w,0),i.strokeStyle="rgba(26,7,9,0.85)",i.lineWidth=Et*1.6,i.stroke(),C(Y,tt,Vt,Vt*w,0),i.strokeStyle=`rgba(255,110,116,${.75+P*.25})`,i.lineWidth=Et,i.stroke()};i.save(),i.shadowColor="rgba(255,99,105,0.9)",i.shadowBlur=16+P*30,Ct(h*.62,h*.03),Ct(h*.4,h*.02),C(Y+1,tt+2,h*.09,h*.09*w,0),i.fillStyle="rgba(26,7,9,0.85)",i.fill(),C(Y,tt,h*.085,h*.085*w,0);let F=i.createRadialGradient(Y,tt,0,Y,tt,h*.1);F.addColorStop(0,`rgba(255,214,216,${.95+P*.05})`),F.addColorStop(1,"rgba(255,99,105,0.9)"),i.fillStyle=F,i.fill(),i.restore(),i.restore()}let P=0;function H(){P=Z(),i.clearRect(0,0,r,o);let U=Math.sin(b*.8)*h*.02,X=l+g*24+Math.sin(b*.3)*4,j=c+U+x*12,ot=i.createRadialGradient(X,j,0,X,j,h*2.6);ot.addColorStop(0,"rgba(229,72,77,0.14)"),ot.addColorStop(1,"rgba(229,72,77,0)"),i.fillStyle=ot,i.fillRect(0,0,r,o);let V=i.createRadialGradient(u,d,0,u,d,p*4.8);V.addColorStop(0,"rgba(190,196,214,0.13)"),V.addColorStop(1,"rgba(190,196,214,0)"),i.save(),i.translate(u,d),i.scale(1,.5),i.fillStyle=V,i.beginPath(),i.arc(0,0,p*4.8,0,Math.PI*2),i.fill(),i.restore(),i.strokeStyle="rgba(165,170,186,0.22)",i.lineWidth=1;for(let lt=-8;lt<=8;lt++){let pt=E(lt,0,-8),dt=E(lt,0,8);i.beginPath(),i.moveTo(pt[0],pt[1]),i.lineTo(dt[0],dt[1]),i.stroke();let Ct=E(-8,0,lt),F=E(8,0,lt);i.beginPath(),i.moveTo(Ct[0],Ct[1]),i.lineTo(F[0],F[1]),i.stroke()}if(P>.02){I(0,.01,0,.9,`rgba(255,99,105,${P*.9})`,1),I(0,.01,0,.55,`rgba(255,99,105,${P*.6})`,1);let[lt,pt]=E(0,.01,0);i.beginPath(),i.ellipse(lt,pt,p*.16,p*.11,0,0,Math.PI*2),i.fillStyle=`rgba(255,130,135,${P*.9})`,i.fill()}S=(S+.0065)%1;let Y=.7+S*4.8;I(0,.01,0,Y,"rgba(229,72,77,0.9)",.55*(1-S)+P*.35),B(X,j,1,!0);for(let lt of W)s||(lt.y=(lt.y+lt.sp*.016)%1),i.beginPath(),i.arc(lt.x*r,lt.y*o*.7+40,1.2,0,Math.PI*2),i.fillStyle="rgba(180,186,200,0.3)",i.fill();for(let lt=0;lt<v.length;lt++){let pt=v[lt],dt=X+Math.cos(pt.a)*h*.82,Ct=j+Math.sin(pt.a)*h*.82*w+h*.1,F=pt.len*h*(1+Math.sin(b*1.1+lt*2)*.06);i.beginPath(),i.moveTo(dt-pt.w*h,Ct),i.quadraticCurveTo(dt-pt.w*h*.6,Ct+F*.6,dt,Ct+F),i.quadraticCurveTo(dt+pt.w*h*.6,Ct+F*.6,dt+pt.w*h,Ct),i.closePath(),i.fillStyle="#471014",i.fill()}B(X,j,1,!1),i.save(),i.globalCompositeOperation="lighter";for(let lt of k){s||(lt.sink=(lt.sink+.0021)%1);let pt=b*.55+lt.ph,dt=1.22-lt.sink*.75,Ct=X+Math.cos(pt)*h*dt,F=j+Math.sin(pt)*h*dt*w-lt.sink*h*.25;i.fillStyle=`rgba(255,170,173,${.75*(1-lt.sink*.6)})`,i.beginPath(),i.arc(Ct,F,1.7,0,Math.PI*2),i.fill()}let tt=[X+h*1.55,j+h*.9],it=[X+h*.9,j+h*.15],ut=[X+h*.3,j-h*.05],ht=[X,j];for(let lt of D){s||(lt.t=(lt.t+lt.sp*.016)%1);let pt=lt.t,dt=1-pt,Ct=dt*dt*dt*tt[0]+3*dt*dt*pt*it[0]+3*dt*pt*pt*ut[0]+pt*pt*pt*ht[0],F=dt*dt*dt*tt[1]+3*dt*dt*pt*it[1]+3*dt*pt*pt*ut[1]+pt*pt*pt*ht[1];i.fillStyle=pt>.72?"rgba(255,130,135,0.95)":"rgba(255,205,205,0.7)",i.beginPath(),i.arc(Ct,F,1.9,0,Math.PI*2),i.fill()}i.restore()}let R=!0;new IntersectionObserver(([U])=>{R=U.isIntersecting},{threshold:.02}).observe(e);function L(){b+=.016,g+=(m-g)*.06,x+=(f-x)*.06,H()}if(s)b=1.2,H();else{let U=()=>{R&&!document.hidden&&L(),requestAnimationFrame(U)};requestAnimationFrame(U)}}function r0(n,t,e){let i=document.createElement("canvas");i.id="explode-canvas",i.setAttribute("aria-hidden","true"),t&&t.parentNode?t.replaceWith(i):n.querySelector(".pipeline-sticky").prepend(i);let s=i.getContext("2d"),r=matchMedia("(prefers-reduced-motion: reduce)").matches,o="229,72,77",a=0,l=0,c=Math.min(devicePixelRatio||1,2),h=100,u=0,d=0;function p(){let P=i.getBoundingClientRect();a=P.width,l=P.height,i.width=Math.round(a*c),i.height=Math.round(l*c),s.setTransform(c,0,0,c,0,0),h=Math.min(a*.185,l*.115,148),u=a*.5,d=l*.7}p(),new ResizeObserver(p).observe(i);let g=0,x=0,m=0;function f(P,H,R){return[(P-R)*.866*h+u,((P+R)*.5-H)*h+d]}function b(P,H,R,L,U){U!==void 0&&(s.globalAlpha=U),s.beginPath(),s.moveTo(P[0][0],P[0][1]);for(let X=1;X<P.length;X++)s.lineTo(P[X][0],P[X][1]);s.closePath(),H&&(s.fillStyle=H,s.fill()),R&&(s.save(),L&&(s.shadowColor=`rgba(${o},0.9)`,s.shadowBlur=L),s.strokeStyle=R,s.lineWidth=1.4,s.stroke(),s.restore()),s.globalAlpha=1}function S(P,H,R,L,U,X,j,ot){let V=P-L/2,Y=P+L/2,tt=R-X/2,it=R+X/2,ut=H,ht=H+U;b([f(V,ht,tt),f(Y,ht,tt),f(Y,ht,it),f(V,ht,it)],j.top,j.stroke,j.glow,ot),b([f(Y,ut,tt),f(Y,ut,it),f(Y,ht,it),f(Y,ht,tt)],j.right,j.stroke,0,ot),b([f(V,ut,it),f(Y,ut,it),f(Y,ht,it),f(V,ht,it)],j.front,j.stroke,0,ot)}function _(P,H,R,L,U,X,j,ot){ot!==void 0&&(s.globalAlpha=ot);let[V,Y]=f(P,H,R);s.beginPath(),s.ellipse(V,Y,L*1.2247*h,L*.7071*h,0,0,Math.PI*2),U&&(s.fillStyle=U,s.fill()),X&&(s.save(),j&&(s.shadowColor=`rgba(${o},0.9)`,s.shadowBlur=j),s.strokeStyle=X,s.lineWidth=1.4,s.stroke(),s.restore()),s.globalAlpha=1}let w=[3.1,1.9,1.05,.45,0];function E(P,H,R){return H+w[P]*R}let C=[...e.querySelectorAll(".chip")],I=[...n.querySelectorAll(".step")],M=-1;function v(P){P===M||P<0||(M=P,I.forEach(H=>H.classList.toggle("active",+H.dataset.layer===P)),C.forEach(H=>H.classList.toggle("active",+H.dataset.layer===P)))}if(r)v(1);else{let P=new IntersectionObserver(H=>{for(let R of H)R.isIntersecting&&v(+R.target.dataset.layer)},{rootMargin:"-42% 0px -42% 0px"});I.forEach(H=>P.observe(H))}function D(P,H,R){let L=M<0||M===P?1:.2,U=(P%2===0?-1:1)*R*.3,X=E(P,H,R),j=`rgba(${o},${.9*L})`,ot=L;if(P===4)S(U,X,0,2.5,.55,1.9,{top:"#2c2f37",right:"#1a1c22",front:"#14161b",stroke:j,glow:6},ot),_(U-.6,X+.56,0,.55,`rgba(120,124,138,${.55*L})`,`rgba(255,255,255,${.12*L})`,0,ot),_(U+.6,X+.56,0,.55,null,`rgba(${o},${.6*L})`,10,ot);else if(P===3)S(U,X,0,1.5,.26,1.1,{top:"#23262d",right:"#171920",front:"#121419",stroke:j,glow:5},ot),S(U,X+.26,0,.4,.09,.4,{top:`rgba(20,22,27,${L})`,right:"#0e1013",front:"#0a0c0f",stroke:`rgba(160,130,70,${.5*L})`},ot);else if(P===2){S(U,X,0,2,.34,1.3,{top:"#2a2c34",right:"#191b21",front:"#121419",stroke:j,glow:6},ot);for(let V=0;V<5;V++){let Y=U-.68+V*.34;S(Y,X+.34,0,.24,.24,.24,{top:`rgba(30,33,40,${L})`,right:"#14161b",front:"#0f1115",stroke:`rgba(255,99,105,${.85*L})`,glow:8},ot)}}else if(P===1){S(U,X,0,2.25,.18,1.65,{top:"#30333b",right:"#1d1f25",front:"#16181d",stroke:j,glow:5},ot);for(let V=0;V<6;V++)_(U-.85+V*.34,X+.2,.4,.05,`rgba(140,144,158,${.6*L})`,null,0,ot)}else{S(U,X,0,1.15,.34,1.15,{top:"#262932",right:"#171920",front:"#121419",stroke:j,glow:6},ot),_(U,X+.35,0,.17,`rgba(229,72,77,${.95*L})`,`rgba(255,170,173,${.9*L})`,18*L,ot);let[V,Y]=f(U,X+.35,0),tt=s.createRadialGradient(V,Y,0,V,Y,h*.7);tt.addColorStop(0,`rgba(255,99,105,${.4*L})`),tt.addColorStop(1,"rgba(255,99,105,0)"),s.fillStyle=tt,s.fillRect(V-h,Y-h,h*2,h*2)}}function k(){s.save(),s.strokeStyle="rgba(150,152,166,0.1)",s.lineWidth=1;for(let P=-5;P<=5;P++){let H=f(P,-.6,-5),R=f(P,-.6,5);s.beginPath(),s.moveTo(H[0],H[1]),s.lineTo(R[0],R[1]),s.stroke();let L=f(-5,-.6,P),U=f(5,-.6,P);s.beginPath(),s.moveTo(L[0],L[1]),s.lineTo(U[0],U[1]),s.stroke()}s.restore()}function W(){s.clearRect(0,0,a,l),k();let P=[1.62,1.32,.98,.62,0];for(let H of[4,3,2,1,0])D(H,P[H],r?.3:x)}let Z=!0;new IntersectionObserver(([P])=>{Z=P.isIntersecting},{threshold:.02}).observe(i);function B(){g+=.016;let P=n.getBoundingClientRect(),H=P.height-innerHeight;m=H>0?Math.min(1,Math.max(0,-P.top/H)):0,x+=(m-x)*.1;let R=r?.3:x*x*(3-2*x);s.clearRect(0,0,a,l),k();let L=[1.62,1.32,.98,.62,0];for(let U of[4,3,2,1,0])D(U,L[U],R)}if(r)W();else{let P=()=>{Z&&!document.hidden&&B(),requestAnimationFrame(P)};requestAnimationFrame(P)}}var ic=matchMedia("(prefers-reduced-motion: reduce)").matches;function JT(){setTimeout(()=>{document.querySelectorAll(".hero h1, .hero-sub, .hero-ctas").forEach(n=>{parseFloat(getComputedStyle(n).opacity)<.99&&(n.style.animation="none",n.style.opacity="1",n.style.transform="none")})},1600)}function QT(){ic||Nc(Pc("#progress",{scaleX:[0,1],ease:"linear"}))}function jT(){if(ic)return;let n=[...document.querySelectorAll(".clause, .ledger-row, .tier, .stat, .fact, .quote-card, .demo-shell, .section-h")],t=new Set,e=i=>{t.has(i)||(t.add(i),i.style.transition="opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",i.style.opacity="1",i.style.transform="translateY(0)")};n.forEach(i=>{i.style.opacity="0",i.style.transform="translateY(24px)",Fc(i,()=>e(i),{amount:.25})}),setTimeout(()=>n.forEach(e),3200)}function t1(){let n=document.querySelectorAll("[data-count]"),t=i=>{let s=+i.dataset.count,r=i.dataset.prefix||"",o=i.dataset.suffix||"%";if(ic){i.textContent=r+s+o;return}let a=performance.now(),l=1400;function c(h){let u=Math.min(1,(h-a)/l),d=1-Math.pow(1-u,3);i.textContent=r+Math.round(s*d)+o,u<1&&requestAnimationFrame(c)}requestAnimationFrame(c)},e=new IntersectionObserver(i=>{i.forEach(s=>{s.isIntersecting&&(t(s.target),e.unobserve(s.target))})},{threshold:.6});n.forEach(i=>e.observe(i))}var e1=new Date("2027-01-20T00:00:00+01:00").getTime();function nc(n){return String(n).padStart(2,"0")}function n1(){let n=document.getElementById("count-days"),t=document.getElementById("count-clock"),e=document.getElementById("cta-count");function i(){let s=Math.max(0,e1-Date.now()),r=Math.floor(s/864e5),o=Math.floor(s/36e5)%24,a=Math.floor(s/6e4)%60,l=Math.floor(s/1e3)%60;n&&(n.textContent=r),t&&(t.textContent=`${nc(r)} : ${nc(o)} : ${nc(a)} : ${nc(l)}`),e&&(e.textContent=`${r} days to go`)}i(),setInterval(i,1e3)}function i1(){if(ic)return;document.querySelectorAll(".magnetic").forEach(t=>{let e=0,i=0,s=0,r=0,o=0,a=.18;function l(){i+=(r-i)*.18,s+=(o-s)*.18,t.style.transform=`translate(${i}px, ${s}px)`,e=requestAnimationFrame(l)}t.addEventListener("pointermove",c=>{let h=t.getBoundingClientRect();r=(c.clientX-(h.left+h.width/2))*a,o=(c.clientY-(h.top+h.height/2))*a,e||(e=requestAnimationFrame(l))}),t.addEventListener("pointerleave",()=>{r=0,o=0,setTimeout(()=>{Math.abs(i)<.4&&Math.abs(s)<.4&&(cancelAnimationFrame(e),e=0,t.style.transform="",i=s=0)},350)})})}var _d=!1,Ro=null,yd=null;function s1(){let n=document.getElementById("hero-canvas");if(!n)return 0;try{let t=document.createElement("canvas");t.width=72,t.height=45;let e=t.getContext("2d");e.drawImage(n,0,0,72,45);let i=e.getImageData(0,0,72,45).data,s=0;for(let r=0;r<i.length;r+=4)i[r]+i[r+1]+i[r+2]>60&&s++;return s}catch{return 0}}function Co(n){if(!_d){_d=!0,console.warn("[sigillo] 2D renderer active:",n),document.documentElement.setAttribute("data-renderer","2d");try{Ro&&Ro.dispose()}catch{}try{yd&&yd.dispose()}catch{}try{s0(document.querySelector(".hero"),document.getElementById("hero-canvas"))}catch(t){console.error("[sigillo] fallback hero",t)}try{r0(document.querySelector(".pipeline"),document.getElementById("explode-canvas"),document.getElementById("layer-chips"))}catch(t){console.error("[sigillo] fallback explode",t)}}}function r1(){if(new URLSearchParams(location.search).get("renderer")==="2d"){Co("forced by URL");return}let n=!1;if(o0())try{Ro=gg(document.getElementById("hero-canvas"),{onFatal:()=>Co("webgl context lost")}),yd=xg(document.querySelector(".pipeline"),document.getElementById("explode-canvas"),document.getElementById("leader-lines"),document.getElementById("layer-chips")),n=!0}catch(e){console.error("[sigillo] webgl init failed",e)}if(!n){Co(o0()?"webgl init failed":"webgl unavailable");return}document.documentElement.setAttribute("data-renderer","webgl");let t=e=>{setTimeout(()=>{if(_d)return;if(document.visibilityState!=="visible"){e<6&&t(e+1);return}if((Ro?Ro.getFrames():0)<3){Co("render loop idle");return}s1()<12&&Co("blank canvas")},e===0?2200:1600)};t(0)}function o0(){try{let n=document.createElement("canvas");return!!(n.getContext("webgl2")||n.getContext("webgl"))}catch{return!1}}function li(n,t){try{t()}catch(e){console.error("[sigillo]",n,e)}}function a0(){window.__sigilloBooted=!0,li("progress",()=>QT()),li("reveals",()=>jT()),li("heroSafety",()=>JT()),li("counters",()=>t1()),li("countdown",()=>n1()),li("magnetic",()=>i1()),li("3d",()=>r1()),li("petri",()=>t0(document.getElementById("petri-canvas"),document.getElementById("deviation-feed"))),li("tamper",()=>i0())}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",a0):a0();})();
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
