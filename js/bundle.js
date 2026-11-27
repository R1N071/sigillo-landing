(()=>{function Ss(n,t,e){var i;if(n instanceof Element)return[n];if(typeof n=="string"){let s=document;t&&(s=t.current);let r=(i=e?.[n])!==null&&i!==void 0?i:s.querySelectorAll(n);return r?Array.from(r):[]}return Array.from(n)}var ze=n=>n;var yi=ze,vn=ze;var In=(n,t,e)=>{let i=t-n;return i===0?1:(e-n)/i};function bs(n){let t;return()=>(t===void 0&&(t=n()),t)}var Lo=bs(()=>window.ScrollTimeline!==void 0);var Uo=class{constructor(t){this.stop=()=>this.runAll("stop"),this.animations=t.filter(Boolean)}get finished(){return Promise.all(this.animations.map(t=>"finished"in t?t.finished:t))}getAll(t){return this.animations[0][t]}setAll(t,e){for(let i=0;i<this.animations.length;i++)this.animations[i][t]=e}attachTimeline(t,e){let i=this.animations.map(s=>{if(Lo()&&s.attachTimeline)return s.attachTimeline(t);if(typeof e=="function")return e(s)});return()=>{i.forEach((s,r)=>{s&&s(),this.animations[r].stop()})}}get time(){return this.getAll("time")}set time(t){this.setAll("time",t)}get speed(){return this.getAll("speed")}set speed(t){this.setAll("speed",t)}get startTime(){return this.getAll("startTime")}get duration(){let t=0;for(let e=0;e<this.animations.length;e++)t=Math.max(t,this.animations[e].duration);return t}runAll(t){this.animations.forEach(e=>e[t]())}flatten(){this.runAll("flatten")}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}};var Ts=class extends Uo{then(t,e){return Promise.all(this.animations).then(t).catch(e)}};var ke=n=>n*1e3,Je=n=>n/1e3;function Es(n){let t=0,e=50,i=n.next(t);for(;!i.done&&t<2e4;)t+=e,i=n.next(t);return t>=2e4?1/0:t}var No=(n,t,e=10)=>{let i="",s=Math.max(Math.round(t/e),2);for(let r=0;r<s;r++)i+=n(In(0,s-1,r))+", ";return`linear(${i.substring(0,i.length-2)})`};var We=(n,t,e)=>e>t?t:e<n?n:e;function ws(n,t){return t?n*(1e3/t):0}var n0=5;function Fo(n,t,e){let i=Math.max(t-n0,0);return ws(e-n(i),t-i)}var de={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};var sc=.001;function _d({duration:n=de.duration,bounce:t=de.bounce,velocity:e=de.velocity,mass:i=de.mass}){let s,r;yi(n<=ke(de.maxDuration),"Spring duration must be 10 seconds or less");let o=1-t;o=We(de.minDamping,de.maxDamping,o),n=We(de.minDuration,de.maxDuration,Je(n)),o<1?(s=c=>{let h=c*o,u=h*n,f=h-e,p=Oo(c,o),g=Math.exp(-u);return sc-f/p*g},r=c=>{let u=c*o*n,f=u*e+e,p=Math.pow(o,2)*Math.pow(c,2)*n,g=Math.exp(-u),y=Oo(Math.pow(c,2),o);return(-s(c)+sc>0?-1:1)*((f-p)*g)/y}):(s=c=>{let h=Math.exp(-c*n),u=(c-e)*n+1;return-sc+h*u},r=c=>{let h=Math.exp(-c*n),u=(e-c)*(n*n);return h*u});let a=5/n,l=s0(s,r,a);if(n=ke(n),isNaN(l))return{stiffness:de.stiffness,damping:de.damping,duration:n};{let c=Math.pow(l,2)*i;return{stiffness:c,damping:o*2*Math.sqrt(i*c),duration:n}}}var i0=12;function s0(n,t,e){let i=e;for(let s=1;s<i0;s++)i=i-n(i)/t(i);return i}function Oo(n,t){return n*Math.sqrt(1-t*t)}var r0=["duration","bounce"],o0=["stiffness","damping","mass"];function vd(n,t){return t.some(e=>n[e]!==void 0)}function a0(n){let t={velocity:de.velocity,stiffness:de.stiffness,damping:de.damping,mass:de.mass,isResolvedFromDuration:!1,...n};if(!vd(n,o0)&&vd(n,r0))if(n.visualDuration){let e=n.visualDuration,i=2*Math.PI/(e*1.2),s=i*i,r=2*We(.05,1,1-(n.bounce||0))*Math.sqrt(s);t={...t,mass:de.mass,stiffness:s,damping:r}}else{let e=_d(n);t={...t,...e,mass:de.mass},t.isResolvedFromDuration=!0}return t}function As(n=de.visualDuration,t=de.bounce){let e=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:t}:n,{restSpeed:i,restDelta:s}=e,r=e.keyframes[0],o=e.keyframes[e.keyframes.length-1],a={done:!1,value:r},{stiffness:l,damping:c,mass:h,duration:u,velocity:f,isResolvedFromDuration:p}=a0({...e,velocity:-Je(e.velocity||0)}),g=f||0,y=c/(2*Math.sqrt(l*h)),m=o-r,d=Je(Math.sqrt(l/h)),b=Math.abs(m)<5;i||(i=b?de.restSpeed.granular:de.restSpeed.default),s||(s=b?de.restDelta.granular:de.restDelta.default);let S;if(y<1){let C=Oo(d,y);S=A=>{let I=Math.exp(-y*d*A);return o-I*((g+y*d*m)/C*Math.sin(C*A)+m*Math.cos(C*A))}}else if(y===1)S=C=>o-Math.exp(-d*C)*(m+(g+d*m)*C);else{let C=d*Math.sqrt(y*y-1);S=A=>{let I=Math.exp(-y*d*A),P=Math.min(C*A,300);return o-I*((g+y*d*m)*Math.sinh(P)+C*m*Math.cosh(P))/C}}let _={calculatedDuration:p&&u||null,next:C=>{let A=S(C);if(p)a.done=C>=u;else{let I=0;y<1&&(I=C===0?ke(g):Fo(S,C,A));let P=Math.abs(I)<=i,M=Math.abs(o-A)<=s;a.done=P&&M}return a.value=a.done?o:A,a},toString:()=>{let C=Math.min(Es(_),2e4),A=No(I=>_.next(C*I).value,C,30);return C+"ms "+A}};return _}function Md(n,t=100,e){let i=e({...n,keyframes:[0,t]}),s=Math.min(Es(i),2e4);return{type:"keyframes",ease:r=>i.next(s*r).value/t,duration:Je(s)}}function xi(n){return typeof n=="function"}var Sd=(n,t,e)=>{let i=t-n;return((e-n)%i+i)%i+n};var Bo=n=>Array.isArray(n)&&typeof n[0]!="number";function zo(n,t){return Bo(n)?n[Sd(0,n.length,t)]:n}var Dn=(n,t,e)=>n+(t-n)*e;function ko(n,t){let e=n[n.length-1];for(let i=1;i<=t;i++){let s=In(0,t,i);n.push(Dn(e,1,s))}}function Rs(n){let t=[0];return ko(t,n.length-1),t}var pe=n=>!!(n&&n.getVelocity);function Vr(n){return typeof n=="object"&&!Array.isArray(n)}function Vo(n,t,e,i){return typeof n=="string"&&Vr(t)?Ss(n,e,i):n instanceof NodeList?Array.from(n):Array.isArray(n)?n:[n]}function bd(n,t,e){return n*(t+1)}function oc(n,t,e,i){var s;return typeof t=="number"?t:t.startsWith("-")||t.startsWith("+")?Math.max(0,n+parseFloat(t)):t==="<"?e:(s=i.get(t))!==null&&s!==void 0?s:n}function Td(n,t){n.indexOf(t)===-1&&n.push(t)}function Ho(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function l0(n,t,e){for(let i=0;i<n.length;i++){let s=n[i];s.at>t&&s.at<e&&(Ho(n,s),i--)}}function Ed(n,t,e,i,s,r){l0(n,s,r);for(let o=0;o<t.length;o++)n.push({value:t[o],at:Dn(s,r,i[o]),easing:zo(e,o)})}function wd(n,t){for(let e=0;e<n.length;e++)n[e]=n[e]/(t+1)}function Ad(n,t){return n.at===t.at?n.value===null?1:t.value===null?-1:0:n.at-t.at}var c0="easeInOut",h0=20;function Pd(n,{defaultTransition:t={},...e}={},i,s){let r=t.duration||.3,o=new Map,a=new Map,l={},c=new Map,h=0,u=0,f=0;for(let p=0;p<n.length;p++){let g=n[p];if(typeof g=="string"){c.set(g,u);continue}else if(!Array.isArray(g)){c.set(g.name,oc(u,g.at,h,c));continue}let[y,m,d={}]=g;d.at!==void 0&&(u=oc(u,d.at,h,c));let b=0,S=(_,C,A,I=0,P=0)=>{let M=u0(_),{delay:v=0,times:L=Rs(M),type:G="keyframes",repeat:X,repeatType:Q,repeatDelay:B=0,...D}=C,{ease:V=t.ease||"easeOut",duration:E}=C,R=typeof v=="function"?v(I,P):v,U=M.length,q=xi(G)?G:s?.[G];if(U<=2&&q){let $=100;if(U===2&&p0(M)){let Y=M[1]-M[0];$=Math.abs(Y)}let st={...D};E!==void 0&&(st.duration=ke(E));let ot=Md(st,$,q);V=ot.ease,E=ot.duration}E??(E=r);let nt=u+R;L.length===1&&L[0]===0&&(L[1]=1);let ct=L.length-M.length;if(ct>0&&ko(L,ct),M.length===1&&M.unshift(null),X){vn(X<h0,"Repeat count too high, must be less than 20"),E=bd(E,X);let $=[...M],st=[...L];V=Array.isArray(V)?[...V]:[V];let ot=[...V];for(let Y=0;Y<X;Y++){M.push(...$);for(let ft=0;ft<$.length;ft++)L.push(st[ft]+(Y+1)),V.push(ft===0?"linear":zo(ot,ft-1))}wd(L,X)}let k=nt+E;Ed(A,M,V,L,nt,k),b=Math.max(R+E,b),f=Math.max(k,f)};if(pe(y)){let _=Rd(y,a);S(m,d,Cd("default",_))}else{let _=Vo(y,m,i,l),C=_.length;for(let A=0;A<C;A++){m=m,d=d;let I=_[A],P=Rd(I,a);for(let M in m)S(m[M],d0(d,M),Cd(M,P),A,C)}}h=u,u+=b}return a.forEach((p,g)=>{for(let y in p){let m=p[y];m.sort(Ad);let d=[],b=[],S=[];for(let C=0;C<m.length;C++){let{at:A,value:I,easing:P}=m[C];d.push(I),b.push(In(0,f,A)),S.push(P||"easeOut")}b[0]!==0&&(b.unshift(0),d.unshift(d[0]),S.unshift(c0)),b[b.length-1]!==1&&(b.push(1),d.push(null)),o.has(g)||o.set(g,{keyframes:{},transition:{}});let _=o.get(g);_.keyframes[y]=d,_.transition[y]={...t,duration:f,ease:S,times:b,...e}}}),o}function Rd(n,t){return!t.has(n)&&t.set(n,{}),t.get(n)}function Cd(n,t){return t[n]||(t[n]=[]),t[n]}function u0(n){return Array.isArray(n)?n:[n]}function d0(n,t){return n&&n[t]?{...n,...n[t]}:{...n}}var f0=n=>typeof n=="number",p0=n=>n.every(f0);var Zn=new WeakMap;function Go(n,t){return n?n[t]||n.default||n:void 0}var Ln=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],cn=new Set(Ln);var Wo=new Set(["width","height","top","left","right","bottom",...Ln]);var Id=n=>Array.isArray(n);var Dd=n=>Id(n)?n[n.length-1]||0:n;var Cs={skipAnimations:!1,useManualTiming:!1};function Ld(n){let t=new Set,e=new Set,i=!1,s=!1,r=new WeakSet,o={delta:0,timestamp:0,isProcessing:!1};function a(c){r.has(c)&&(l.schedule(c),n()),c(o)}let l={schedule:(c,h=!1,u=!1)=>{let p=u&&i?t:e;return h&&r.add(c),p.has(c)||p.add(c),c},cancel:c=>{e.delete(c),r.delete(c)},process:c=>{if(o=c,i){s=!0;return}i=!0,[t,e]=[e,t],t.forEach(a),t.clear(),i=!1,s&&(s=!1,l.process(c))}};return l}var Xo=["read","resolveKeyframes","update","preRender","render","postRender"],m0=40;function Ud(n,t){let e=!1,i=!0,s={delta:0,timestamp:0,isProcessing:!1},r=()=>e=!0,o=Xo.reduce((d,b)=>(d[b]=Ld(r),d),{}),{read:a,resolveKeyframes:l,update:c,preRender:h,render:u,postRender:f}=o,p=()=>{let d=Cs.useManualTiming?s.timestamp:performance.now();e=!1,s.delta=i?1e3/60:Math.max(Math.min(d-s.timestamp,m0),1),s.timestamp=d,s.isProcessing=!0,a.process(s),l.process(s),c.process(s),h.process(s),u.process(s),f.process(s),s.isProcessing=!1,e&&t&&(i=!1,n(p))},g=()=>{e=!0,i=!0,s.isProcessing||n(p)};return{schedule:Xo.reduce((d,b)=>{let S=o[b];return d[b]=(_,C=!1,A=!1)=>(e||g(),S.schedule(_,C,A)),d},{}),cancel:d=>{for(let b=0;b<Xo.length;b++)o[Xo[b]].cancel(d)},state:s,steps:o}}var{schedule:ve,cancel:Kn,state:_i,steps:kE}=Ud(typeof requestAnimationFrame<"u"?requestAnimationFrame:ze,!0);var qo;function g0(){qo=void 0}var hn={now:()=>(qo===void 0&&hn.set(_i.isProcessing||Cs.useManualTiming?_i.timestamp:performance.now()),qo),set:n=>{qo=n,queueMicrotask(g0)}};var Ps=class{constructor(){this.subscriptions=[]}add(t){return Td(this.subscriptions,t),()=>Ho(this.subscriptions,t)}notify(t,e,i){let s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](t,e,i);else for(let r=0;r<s;r++){let o=this.subscriptions[r];o&&o(t,e,i)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}};var Nd=30,y0=n=>!isNaN(parseFloat(n)),Fd={current:void 0},ac=class{constructor(t,e={}){this.version="12.0.0",this.canTrackVelocity=null,this.events={},this.updateAndNotify=(i,s=!0)=>{let r=hn.now();this.updatedAt!==r&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(i),this.current!==this.prev&&this.events.change&&this.events.change.notify(this.current),s&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.hasAnimated=!1,this.setCurrent(t),this.owner=e.owner}setCurrent(t){this.current=t,this.updatedAt=hn.now(),this.canTrackVelocity===null&&t!==void 0&&(this.canTrackVelocity=y0(this.current))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return this.on("change",t)}on(t,e){this.events[t]||(this.events[t]=new Ps);let i=this.events[t].add(e);return t==="change"?()=>{i(),ve.read(()=>{this.events.change.getSize()||this.stop()})}:i}clearListeners(){for(let t in this.events)this.events[t].clear()}attach(t,e){this.passiveEffect=t,this.stopPassiveEffect=e}set(t,e=!0){!e||!this.passiveEffect?this.updateAndNotify(t,e):this.passiveEffect(t,this.updateAndNotify)}setWithVelocity(t,e,i){this.set(e),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-i}jump(t,e=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,e&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return Fd.current&&Fd.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){let t=hn.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||t-this.updatedAt>Nd)return 0;let e=Math.min(this.updatedAt-this.prevUpdatedAt,Nd);return ws(parseFloat(this.current)-parseFloat(this.prevFrameValue),e)}start(t){return this.stop(),new Promise(e=>{this.hasAnimated=!0,this.animation=t(e),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}};function Jn(n,t){return new ac(n,t)}function Od(n){let t=[{},{}];return n?.values.forEach((e,i)=>{t[0][i]=e.get(),t[1][i]=e.getVelocity()}),t}function Yo(n,t,e,i){if(typeof t=="function"){let[s,r]=Od(i);t=t(e!==void 0?e:n.custom,s,r)}if(typeof t=="string"&&(t=n.variants&&n.variants[t]),typeof t=="function"){let[s,r]=Od(i);t=t(e!==void 0?e:n.custom,s,r)}return t}function Bd(n,t,e){let i=n.getProps();return Yo(i,t,e!==void 0?e:i.custom,n)}function x0(n,t,e){n.hasValue(t)?n.getValue(t).set(e):n.addValue(t,Jn(e))}function zd(n,t){let e=Bd(n,t),{transitionEnd:i={},transition:s={},...r}=e||{};r={...r,...i};for(let o in r){let a=Dd(r[o]);x0(n,o,a)}}function kd(n){return!!(pe(n)&&n.add)}function Vd(n,t){let e=n.getValue("willChange");if(kd(e))return e.add(t)}var Is=n=>n.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase();var _0="framerAppearId",Hd="data-"+Is(_0);function Gd(n){return n.props[Hd]}var $o={current:!1};function lc(n,t){n.timeline=t,n.onfinish=null}var Hr=n=>Array.isArray(n)&&typeof n[0]=="number";var Wd={linearEasing:void 0};function Xd(n,t){let e=bs(n);return()=>{var i;return(i=Wd[t])!==null&&i!==void 0?i:e()}}var Ds=Xd(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing");function hc(n){return!!(typeof n=="function"&&Ds()||!n||typeof n=="string"&&(n in cc||Ds())||Hr(n)||Array.isArray(n)&&n.every(hc))}var Gr=([n,t,e,i])=>`cubic-bezier(${n}, ${t}, ${e}, ${i})`,cc={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Gr([0,.65,.55,1]),circOut:Gr([.55,0,1,.45]),backIn:Gr([.31,.01,.66,-.59]),backOut:Gr([.33,1.53,.69,.99])};function uc(n,t){if(n)return typeof n=="function"&&Ds()?No(n,t):Hr(n)?Gr(n):Array.isArray(n)?n.map(e=>uc(e,t)||cc.easeOut):cc[n]}var qd=(n,t,e)=>(((1-3*e+3*t)*n+(3*e-6*t))*n+3*t)*n,v0=1e-7,M0=12;function S0(n,t,e,i,s){let r,o,a=0;do o=t+(e-t)/2,r=qd(o,i,s)-n,r>0?e=o:t=o;while(Math.abs(r)>v0&&++a<M0);return o}function vi(n,t,e,i){if(n===t&&e===i)return ze;let s=r=>S0(r,0,1,n,e);return r=>r===0||r===1?r:qd(s(r),t,i)}var Zo=n=>t=>t<=.5?n(2*t)/2:(2-n(2*(1-t)))/2;var Ko=n=>t=>1-n(1-t);var dc=vi(.33,1.53,.69,.99),Wr=Ko(dc),Jo=Zo(Wr);var Qo=n=>(n*=2)<1?.5*Wr(n):.5*(2-Math.pow(2,-10*(n-1)));var jo=n=>1-Math.sin(Math.acos(n)),Yd=Ko(jo),ta=Zo(jo);var ea=n=>/^0[^.\s]+$/u.test(n);function $d(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||ea(n):!0}var Un={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},Qn={...Un,transform:n=>We(0,1,n)},Xr={...Un,default:1};var Mi=n=>Math.round(n*1e5)/1e5;var Ls=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Zd(n){return n==null}var Kd=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;var Us=(n,t)=>e=>!!(typeof e=="string"&&Kd.test(e)&&e.startsWith(n)||t&&!Zd(e)&&Object.prototype.hasOwnProperty.call(e,t)),na=(n,t,e)=>i=>{if(typeof i!="string")return i;let[s,r,o,a]=i.match(Ls);return{[n]:parseFloat(s),[t]:parseFloat(r),[e]:parseFloat(o),alpha:a!==void 0?parseFloat(a):1}};var b0=n=>We(0,255,n),fc={...Un,transform:n=>Math.round(b0(n))},Nn={test:Us("rgb","red"),parse:na("red","green","blue"),transform:({red:n,green:t,blue:e,alpha:i=1})=>"rgba("+fc.transform(n)+", "+fc.transform(t)+", "+fc.transform(e)+", "+Mi(Qn.transform(i))+")"};function T0(n){let t="",e="",i="",s="";return n.length>5?(t=n.substring(1,3),e=n.substring(3,5),i=n.substring(5,7),s=n.substring(7,9)):(t=n.substring(1,2),e=n.substring(2,3),i=n.substring(3,4),s=n.substring(4,5),t+=t,e+=e,i+=i,s+=s),{red:parseInt(t,16),green:parseInt(e,16),blue:parseInt(i,16),alpha:s?parseInt(s,16)/255:1}}var qr={test:Us("#"),parse:T0,transform:Nn.transform};var Yr=n=>({test:t=>typeof t=="string"&&t.endsWith(n)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${n}`}),Fn=Yr("deg"),Si=Yr("%"),Ut=Yr("px"),Jd=Yr("vh"),Qd=Yr("vw"),pc={...Si,parse:n=>Si.parse(n)/100,transform:n=>Si.transform(n*100)};var bi={test:Us("hsl","hue"),parse:na("hue","saturation","lightness"),transform:({hue:n,saturation:t,lightness:e,alpha:i=1})=>"hsla("+Math.round(n)+", "+Si.transform(Mi(t))+", "+Si.transform(Mi(e))+", "+Mi(Qn.transform(i))+")"};var Ee={test:n=>Nn.test(n)||qr.test(n)||bi.test(n),parse:n=>Nn.test(n)?Nn.parse(n):bi.test(n)?bi.parse(n):qr.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?Nn.transform(n):bi.transform(n)};var jd=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function E0(n){var t,e;return isNaN(n)&&typeof n=="string"&&(((t=n.match(Ls))===null||t===void 0?void 0:t.length)||0)+(((e=n.match(jd))===null||e===void 0?void 0:e.length)||0)>0}var ef="number",nf="color",w0="var",A0="var(",tf="${}",R0=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function $i(n){let t=n.toString(),e=[],i={color:[],number:[],var:[]},s=[],r=0,a=t.replace(R0,l=>(Ee.test(l)?(i.color.push(r),s.push(nf),e.push(Ee.parse(l))):l.startsWith(A0)?(i.var.push(r),s.push(w0),e.push(l)):(i.number.push(r),s.push(ef),e.push(parseFloat(l))),++r,tf)).split(tf);return{values:e,split:a,indexes:i,types:s}}function sf(n){return $i(n).values}function rf(n){let{split:t,types:e}=$i(n),i=t.length;return s=>{let r="";for(let o=0;o<i;o++)if(r+=t[o],s[o]!==void 0){let a=e[o];a===ef?r+=Mi(s[o]):a===nf?r+=Ee.transform(s[o]):r+=s[o]}return r}}var C0=n=>typeof n=="number"?0:n;function P0(n){let t=sf(n);return rf(n)(t.map(C0))}var un={test:E0,parse:sf,createTransformer:rf,getAnimatableNone:P0};var I0=new Set(["brightness","contrast","saturate","opacity"]);function D0(n){let[t,e]=n.slice(0,-1).split("(");if(t==="drop-shadow")return n;let[i]=e.match(Ls)||[];if(!i)return n;let s=e.replace(i,""),r=I0.has(t)?1:0;return i!==e&&(r*=100),t+"("+r+s+")"}var L0=/\b([a-z-]*)\(.*?\)/gu,$r={...un,getAnimatableNone:n=>{let t=n.match(L0);return t?t.map(D0).join(" "):n}};var of={borderWidth:Ut,borderTopWidth:Ut,borderRightWidth:Ut,borderBottomWidth:Ut,borderLeftWidth:Ut,borderRadius:Ut,radius:Ut,borderTopLeftRadius:Ut,borderTopRightRadius:Ut,borderBottomRightRadius:Ut,borderBottomLeftRadius:Ut,width:Ut,maxWidth:Ut,height:Ut,maxHeight:Ut,top:Ut,right:Ut,bottom:Ut,left:Ut,padding:Ut,paddingTop:Ut,paddingRight:Ut,paddingBottom:Ut,paddingLeft:Ut,margin:Ut,marginTop:Ut,marginRight:Ut,marginBottom:Ut,marginLeft:Ut,backgroundPositionX:Ut,backgroundPositionY:Ut};var af={rotate:Fn,rotateX:Fn,rotateY:Fn,rotateZ:Fn,scale:Xr,scaleX:Xr,scaleY:Xr,scaleZ:Xr,skew:Fn,skewX:Fn,skewY:Fn,distance:Ut,translateX:Ut,translateY:Ut,translateZ:Ut,x:Ut,y:Ut,z:Ut,perspective:Ut,transformPerspective:Ut,opacity:Qn,originX:pc,originY:pc,originZ:Ut};var mc={...Un,transform:Math.round};var Ns={...of,...af,zIndex:mc,size:Ut,fillOpacity:Qn,strokeOpacity:Qn,numOctaves:mc};var U0={...Ns,color:Ee,backgroundColor:Ee,outlineColor:Ee,fill:Ee,stroke:Ee,borderColor:Ee,borderTopColor:Ee,borderRightColor:Ee,borderBottomColor:Ee,borderLeftColor:Ee,filter:$r,WebkitFilter:$r},Fs=n=>U0[n];function ia(n,t){let e=Fs(n);return e!==$r&&(e=un),e.getAnimatableNone?e.getAnimatableNone(t):void 0}var N0=new Set(["auto","none","0"]);function lf(n,t,e){let i=0,s;for(;i<n.length&&!s;){let r=n[i];typeof r=="string"&&!N0.has(r)&&$i(r).values.length&&(s=n[i]),i++}if(s&&e)for(let r of t)n[r]=ia(e,s)}var gc=n=>n===Un||n===Ut,cf=(n,t)=>parseFloat(n.split(", ")[t]),hf=(n,t)=>(e,{transform:i})=>{if(i==="none"||!i)return 0;let s=i.match(/^matrix3d\((.+)\)$/u);if(s)return cf(s[1],t);{let r=i.match(/^matrix\((.+)\)$/u);return r?cf(r[1],n):0}},F0=new Set(["x","y","z"]),O0=Ln.filter(n=>!F0.has(n));function uf(n){let t=[];return O0.forEach(e=>{let i=n.getValue(e);i!==void 0&&(t.push([e,i.get()]),i.set(e.startsWith("scale")?1:0))}),t}var Zi={width:({x:n},{paddingLeft:t="0",paddingRight:e="0"})=>n.max-n.min-parseFloat(t)-parseFloat(e),height:({y:n},{paddingTop:t="0",paddingBottom:e="0"})=>n.max-n.min-parseFloat(t)-parseFloat(e),top:(n,{top:t})=>parseFloat(t),left:(n,{left:t})=>parseFloat(t),bottom:({y:n},{top:t})=>parseFloat(t)+(n.max-n.min),right:({x:n},{left:t})=>parseFloat(t)+(n.max-n.min),x:hf(4,13),y:hf(5,14)};Zi.translateX=Zi.x;Zi.translateY=Zi.y;var Ki=new Set,yc=!1,xc=!1;function df(){if(xc){let n=Array.from(Ki).filter(i=>i.needsMeasurement),t=new Set(n.map(i=>i.element)),e=new Map;t.forEach(i=>{let s=uf(i);s.length&&(e.set(i,s),i.render())}),n.forEach(i=>i.measureInitialState()),t.forEach(i=>{i.render();let s=e.get(i);s&&s.forEach(([r,o])=>{var a;(a=i.getValue(r))===null||a===void 0||a.set(o)})}),n.forEach(i=>i.measureEndState()),n.forEach(i=>{i.suspendedScrollY!==void 0&&window.scrollTo(0,i.suspendedScrollY)})}xc=!1,yc=!1,Ki.forEach(n=>n.complete()),Ki.clear()}function ff(){Ki.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(xc=!0)})}function pf(){ff(),df()}var Ti=class{constructor(t,e,i,s,r,o=!1){this.isComplete=!1,this.isAsync=!1,this.needsMeasurement=!1,this.isScheduled=!1,this.unresolvedKeyframes=[...t],this.onComplete=e,this.name=i,this.motionValue=s,this.element=r,this.isAsync=o}scheduleResolve(){this.isScheduled=!0,this.isAsync?(Ki.add(this),yc||(yc=!0,ve.read(ff),ve.resolveKeyframes(df))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:t,name:e,element:i,motionValue:s}=this;for(let r=0;r<t.length;r++)if(t[r]===null)if(r===0){let o=s?.get(),a=t[t.length-1];if(o!==void 0)t[0]=o;else if(i&&e){let l=i.readValue(e,a);l!=null&&(t[0]=l)}t[0]===void 0&&(t[0]=a),s&&o===void 0&&s.set(t[0])}else t[r]=t[r-1]}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(){this.isComplete=!0,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe),Ki.delete(this)}cancel(){this.isComplete||(this.isScheduled=!1,Ki.delete(this))}resume(){this.isComplete||this.scheduleResolve()}};var sa=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);var mf=n=>t=>typeof t=="string"&&t.startsWith(n),ra=mf("--"),B0=mf("var(--"),Os=n=>B0(n)?z0.test(n.split("/*")[0].trim()):!1,z0=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;var k0=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function V0(n){let t=k0.exec(n);if(!t)return[,];let[,e,i,s]=t;return[`--${e??i}`,s]}var H0=4;function _c(n,t,e=1){vn(e<=H0,`Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`);let[i,s]=V0(n);if(!i)return;let r=window.getComputedStyle(t).getPropertyValue(i);if(r){let o=r.trim();return sa(o)?parseFloat(o):o}return Os(s)?_c(s,t,e+1):s}var oa=n=>t=>t.test(n);var gf={test:n=>n==="auto",parse:n=>n};var vc=[Un,Ut,Si,Fn,Qd,Jd,gf],Mc=n=>vc.find(oa(n));var Bs=class extends Ti{constructor(t,e,i,s,r){super(t,e,i,s,r,!0)}readKeyframes(){let{unresolvedKeyframes:t,element:e,name:i}=this;if(!e||!e.current)return;super.readKeyframes();for(let l=0;l<t.length;l++){let c=t[l];if(typeof c=="string"&&(c=c.trim(),Os(c))){let h=_c(c,e.current);h!==void 0&&(t[l]=h),l===t.length-1&&(this.finalKeyframe=c)}}if(this.resolveNoneKeyframes(),!Wo.has(i)||t.length!==2)return;let[s,r]=t,o=Mc(s),a=Mc(r);if(o!==a)if(gc(o)&&gc(a))for(let l=0;l<t.length;l++){let c=t[l];typeof c=="string"&&(t[l]=parseFloat(c))}else this.needsMeasurement=!0}resolveNoneKeyframes(){let{unresolvedKeyframes:t,name:e}=this,i=[];for(let s=0;s<t.length;s++)$d(t[s])&&i.push(s);i.length&&lf(t,i,e)}measureInitialState(){let{element:t,unresolvedKeyframes:e,name:i}=this;if(!t||!t.current)return;i==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Zi[i](t.measureViewportBox(),window.getComputedStyle(t.current)),e[0]=this.measuredOrigin;let s=e[e.length-1];s!==void 0&&t.getValue(i,s).jump(s,!1)}measureEndState(){var t;let{element:e,name:i,unresolvedKeyframes:s}=this;if(!e||!e.current)return;let r=e.getValue(i);r&&r.jump(this.measuredOrigin,!1);let o=s.length-1,a=s[o];s[o]=Zi[i](e.measureViewportBox(),window.getComputedStyle(e.current)),a!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=a),!((t=this.removedTransforms)===null||t===void 0)&&t.length&&this.removedTransforms.forEach(([l,c])=>{e.getValue(l).set(c)}),this.resolveNoneKeyframes()}};var Sc=(n,t)=>t==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(un.test(n)||n==="0")&&!n.startsWith("url("));function G0(n){let t=n[0];if(n.length===1)return!0;for(let e=0;e<n.length;e++)if(n[e]!==t)return!0}function yf(n,t,e,i){let s=n[0];if(s===null)return!1;if(t==="display"||t==="visibility")return!0;let r=n[n.length-1],o=Sc(s,t),a=Sc(r,t);return yi(o===a,`You are trying to animate ${t} from "${s}" to "${r}". ${s} is not an animatable value - to enable this animation set ${s} to a value animatable to ${r} via the \`style\` property.`),!o||!a?!1:G0(n)||(e==="spring"||xi(e))&&i}var W0=n=>n!==null;function Ei(n,{repeat:t,repeatType:e="loop"},i){let s=n.filter(W0),r=t&&e!=="loop"&&t%2===1?0:s.length-1;return!r||i===void 0?s[r]:i}var X0=40,zs=class{constructor({autoplay:t=!0,delay:e=0,type:i="keyframes",repeat:s=0,repeatDelay:r=0,repeatType:o="loop",...a}){this.isStopped=!1,this.hasAttemptedResolve=!1,this.createdAt=hn.now(),this.options={autoplay:t,delay:e,type:i,repeat:s,repeatDelay:r,repeatType:o,...a},this.updateFinishedPromise()}calcStartTime(){return this.resolvedAt?this.resolvedAt-this.createdAt>X0?this.resolvedAt:this.createdAt:this.createdAt}get resolved(){return!this._resolved&&!this.hasAttemptedResolve&&pf(),this._resolved}onKeyframesResolved(t,e){this.resolvedAt=hn.now(),this.hasAttemptedResolve=!0;let{name:i,type:s,velocity:r,delay:o,onComplete:a,onUpdate:l,isGenerator:c}=this.options;if(!c&&!yf(t,i,s,r))if($o.current||!o){l&&l(Ei(t,this.options,e)),a&&a(),this.resolveFinishedPromise();return}else this.options.duration=0;let h=this.initPlayback(t,e);h!==!1&&(this._resolved={keyframes:t,finalKeyframe:e,...h},this.onPostResolved())}onPostResolved(){}then(t,e){return this.currentFinishedPromise.then(t,e)}flatten(){this.options.type="keyframes",this.options.ease="linear"}updateFinishedPromise(){this.currentFinishedPromise=new Promise(t=>{this.resolveFinishedPromise=t})}};function bc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*(2/3-e)*6:n}function xf({hue:n,saturation:t,lightness:e,alpha:i}){n/=360,t/=100,e/=100;let s=0,r=0,o=0;if(!t)s=r=o=e;else{let a=e<.5?e*(1+t):e+t-e*t,l=2*e-a;s=bc(l,a,n+1/3),r=bc(l,a,n),o=bc(l,a,n-1/3)}return{red:Math.round(s*255),green:Math.round(r*255),blue:Math.round(o*255),alpha:i}}function ks(n,t){return e=>e>0?t:n}var Tc=(n,t,e)=>{let i=n*n,s=e*(t*t-i)+i;return s<0?0:Math.sqrt(s)},q0=[qr,Nn,bi],Y0=n=>q0.find(t=>t.test(n));function _f(n){let t=Y0(n);if(yi(!!t,`'${n}' is not an animatable color. Use the equivalent color code instead.`),!t)return!1;let e=t.parse(n);return t===bi&&(e=xf(e)),e}var Ec=(n,t)=>{let e=_f(n),i=_f(t);if(!e||!i)return ks(n,t);let s={...e};return r=>(s.red=Tc(e.red,i.red,r),s.green=Tc(e.green,i.green,r),s.blue=Tc(e.blue,i.blue,r),s.alpha=Dn(e.alpha,i.alpha,r),Nn.transform(s))};var $0=(n,t)=>e=>t(n(e)),Vs=(...n)=>n.reduce($0);var aa=new Set(["none","hidden"]);function vf(n,t){return aa.has(n)?e=>e<=0?n:t:e=>e>=1?t:n}function Z0(n,t){return e=>Dn(n,t,e)}function la(n){return typeof n=="number"?Z0:typeof n=="string"?Os(n)?ks:Ee.test(n)?Ec:Q0:Array.isArray(n)?Mf:typeof n=="object"?Ee.test(n)?Ec:K0:ks}function Mf(n,t){let e=[...n],i=e.length,s=n.map((r,o)=>la(r)(r,t[o]));return r=>{for(let o=0;o<i;o++)e[o]=s[o](r);return e}}function K0(n,t){let e={...n,...t},i={};for(let s in e)n[s]!==void 0&&t[s]!==void 0&&(i[s]=la(n[s])(n[s],t[s]));return s=>{for(let r in i)e[r]=i[r](s);return e}}function J0(n,t){var e;let i=[],s={color:0,var:0,number:0};for(let r=0;r<t.values.length;r++){let o=t.types[r],a=n.indexes[o][s[o]],l=(e=n.values[a])!==null&&e!==void 0?e:0;i[r]=l,s[o]++}return i}var Q0=(n,t)=>{let e=un.createTransformer(t),i=$i(n),s=$i(t);return i.indexes.var.length===s.indexes.var.length&&i.indexes.color.length===s.indexes.color.length&&i.indexes.number.length>=s.indexes.number.length?aa.has(n)&&!s.values.length||aa.has(t)&&!i.values.length?vf(n,t):Vs(Mf(J0(i,s),s.values),e):(yi(!0,`Complex values '${n}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`),ks(n,t))};function ca(n,t,e){return typeof n=="number"&&typeof t=="number"&&typeof e=="number"?Dn(n,t,e):la(n)(n,t)}function wc({keyframes:n,velocity:t=0,power:e=.8,timeConstant:i=325,bounceDamping:s=10,bounceStiffness:r=500,modifyTarget:o,min:a,max:l,restDelta:c=.5,restSpeed:h}){let u=n[0],f={done:!1,value:u},p=P=>a!==void 0&&P<a||l!==void 0&&P>l,g=P=>a===void 0?l:l===void 0||Math.abs(a-P)<Math.abs(l-P)?a:l,y=e*t,m=u+y,d=o===void 0?m:o(m);d!==m&&(y=d-u);let b=P=>-y*Math.exp(-P/i),S=P=>d+b(P),_=P=>{let M=b(P),v=S(P);f.done=Math.abs(M)<=c,f.value=f.done?d:v},C,A,I=P=>{p(f.value)&&(C=P,A=As({keyframes:[f.value,g(f.value)],velocity:Fo(S,P,f.value),damping:s,stiffness:r,restDelta:c,restSpeed:h}))};return I(0),{calculatedDuration:null,next:P=>{let M=!1;return!A&&C===void 0&&(M=!0,_(P),I(P)),C!==void 0&&P>=C?A.next(P-C):(!M&&_(P),f)}}}var Sf=vi(.42,0,1,1),bf=vi(0,0,.58,1),ha=vi(.42,0,.58,1);var Tf={linear:ze,easeIn:Sf,easeInOut:ha,easeOut:bf,circIn:jo,circInOut:ta,circOut:Yd,backIn:Wr,backInOut:Jo,backOut:dc,anticipate:Qo},Ac=n=>{if(Hr(n)){vn(n.length===4,"Cubic bezier arrays must contain four numerical values.");let[t,e,i,s]=n;return vi(t,e,i,s)}else if(typeof n=="string")return vn(Tf[n]!==void 0,`Invalid easing type '${n}'`),Tf[n];return n};function j0(n,t,e){let i=[],s=e||ca,r=n.length-1;for(let o=0;o<r;o++){let a=s(n[o],n[o+1]);if(t){let l=Array.isArray(t)?t[o]||ze:t;a=Vs(l,a)}i.push(a)}return i}function ua(n,t,{clamp:e=!0,ease:i,mixer:s}={}){let r=n.length;if(vn(r===t.length,"Both input and output ranges must be the same length"),r===1)return()=>t[0];if(r===2&&t[0]===t[1])return()=>t[1];let o=n[0]===n[1];n[0]>n[r-1]&&(n=[...n].reverse(),t=[...t].reverse());let a=j0(t,i,s),l=a.length,c=h=>{if(o&&h<n[0])return t[0];let u=0;if(l>1)for(;u<n.length-2&&!(h<n[u+1]);u++);let f=In(n[u],n[u+1],h);return a[u](f)};return e?h=>c(We(n[0],n[r-1],h)):c}function Ef(n,t){return n.map(e=>e*t)}function ty(n,t){return n.map(()=>t||ha).splice(0,n.length-1)}function Zr({duration:n=300,keyframes:t,times:e,ease:i="easeInOut"}){let s=Bo(i)?i.map(Ac):Ac(i),r={done:!1,value:t[0]},o=Ef(e&&e.length===t.length?e:Rs(t),n),a=ua(o,t,{ease:Array.isArray(s)?s:ty(t,s)});return{calculatedDuration:n,next:l=>(r.value=a(l),r.done=l>=n,r)}}var wf=n=>{let t=({timestamp:e})=>n(e);return{start:()=>ve.update(t,!0),stop:()=>Kn(t),now:()=>_i.isProcessing?_i.timestamp:hn.now()}};var ey={decay:wc,inertia:wc,tween:Zr,keyframes:Zr,spring:As},ny=n=>n/100,Ji=class extends zs{constructor(t){super(t),this.holdTime=null,this.cancelTime=null,this.currentTime=0,this.playbackSpeed=1,this.pendingPlayState="running",this.startTime=null,this.state="idle",this.stop=()=>{if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.teardown();let{onStop:l}=this.options;l&&l()};let{name:e,motionValue:i,element:s,keyframes:r}=this.options,o=s?.KeyframeResolver||Ti,a=(l,c)=>this.onKeyframesResolved(l,c);this.resolver=new o(r,a,e,i,s),this.resolver.scheduleResolve()}flatten(){super.flatten(),this._resolved&&Object.assign(this._resolved,this.initPlayback(this._resolved.keyframes))}initPlayback(t){let{type:e="keyframes",repeat:i=0,repeatDelay:s=0,repeatType:r,velocity:o=0}=this.options,a=xi(e)?e:ey[e]||Zr,l,c;a!==Zr&&typeof t[0]!="number"&&(l=Vs(ny,ca(t[0],t[1])),t=[0,100]);let h=a({...this.options,keyframes:t});r==="mirror"&&(c=a({...this.options,keyframes:[...t].reverse(),velocity:-o})),h.calculatedDuration===null&&(h.calculatedDuration=Es(h));let{calculatedDuration:u}=h,f=u+s,p=f*(i+1)-s;return{generator:h,mirroredGenerator:c,mapPercentToKeyframes:l,calculatedDuration:u,resolvedDuration:f,totalDuration:p}}onPostResolved(){let{autoplay:t=!0}=this.options;this.play(),this.pendingPlayState==="paused"||!t?this.pause():this.state=this.pendingPlayState}tick(t,e=!1){let{resolved:i}=this;if(!i){let{keyframes:P}=this.options;return{done:!0,value:P[P.length-1]}}let{finalKeyframe:s,generator:r,mirroredGenerator:o,mapPercentToKeyframes:a,keyframes:l,calculatedDuration:c,totalDuration:h,resolvedDuration:u}=i;if(this.startTime===null)return r.next(0);let{delay:f,repeat:p,repeatType:g,repeatDelay:y,onUpdate:m}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-h/this.speed,this.startTime)),e?this.currentTime=t:this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=Math.round(t-this.startTime)*this.speed;let d=this.currentTime-f*(this.speed>=0?1:-1),b=this.speed>=0?d<0:d>h;this.currentTime=Math.max(d,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=h);let S=this.currentTime,_=r;if(p){let P=Math.min(this.currentTime,h)/u,M=Math.floor(P),v=P%1;!v&&P>=1&&(v=1),v===1&&M--,M=Math.min(M,p+1),M%2&&(g==="reverse"?(v=1-v,y&&(v-=y/u)):g==="mirror"&&(_=o)),S=We(0,1,v)*u}let C=b?{done:!1,value:l[0]}:_.next(S);a&&(C.value=a(C.value));let{done:A}=C;!b&&c!==null&&(A=this.speed>=0?this.currentTime>=h:this.currentTime<=0);let I=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&A);return I&&s!==void 0&&(C.value=Ei(l,this.options,s)),m&&m(C.value),I&&this.finish(),C}get duration(){let{resolved:t}=this;return t?Je(t.calculatedDuration):0}get time(){return Je(this.currentTime)}set time(t){t=ke(t),this.currentTime=t,this.holdTime!==null||this.speed===0?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.speed)}get speed(){return this.playbackSpeed}set speed(t){let e=this.playbackSpeed!==t;this.playbackSpeed=t,e&&(this.time=Je(this.currentTime))}play(){if(this.resolver.isScheduled||this.resolver.resume(),!this._resolved){this.pendingPlayState="running";return}if(this.isStopped)return;let{driver:t=wf,onPlay:e,startTime:i}=this.options;this.driver||(this.driver=t(r=>this.tick(r))),e&&e();let s=this.driver.now();this.holdTime!==null?this.startTime=s-this.holdTime:this.startTime?this.state==="finished"&&(this.startTime=s):this.startTime=i??this.calcStartTime(),this.state==="finished"&&this.updateFinishedPromise(),this.cancelTime=this.startTime,this.holdTime=null,this.state="running",this.driver.start()}pause(){var t;if(!this._resolved){this.pendingPlayState="paused";return}this.state="paused",this.holdTime=(t=this.currentTime)!==null&&t!==void 0?t:0}complete(){this.state!=="running"&&this.play(),this.pendingPlayState=this.state="finished",this.holdTime=null}finish(){this.teardown(),this.state="finished";let{onComplete:t}=this.options;t&&t()}cancel(){this.cancelTime!==null&&this.tick(this.cancelTime),this.teardown(),this.updateFinishedPromise()}teardown(){this.state="idle",this.stopDriver(),this.resolveFinishedPromise(),this.updateFinishedPromise(),this.startTime=this.cancelTime=null,this.resolver.cancel()}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}};var Af=new Set(["opacity","clipPath","filter","transform"]);function Rf(n,t,e,{delay:i=0,duration:s=300,repeat:r=0,repeatType:o="loop",ease:a="easeInOut",times:l}={}){let c={[t]:e};l&&(c.offset=l);let h=uc(a,s);return Array.isArray(h)&&(c.easing=h),n.animate(c,{delay:i,duration:s,easing:Array.isArray(h)?"linear":h,fill:"both",iterations:r+1,direction:o==="reverse"?"alternate":"normal"})}var Cf=bs(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));var da=10,iy=2e4;function sy(n){return xi(n.type)||n.type==="spring"||!hc(n.ease)}function ry(n,t){let e=new Ji({...t,keyframes:n,repeat:0,delay:0,isGenerator:!0}),i={done:!1,value:n[0]},s=[],r=0;for(;!i.done&&r<iy;)i=e.sample(r),s.push(i.value),r+=da;return{times:void 0,keyframes:s,duration:r-da,ease:"linear"}}var Pf={anticipate:Qo,backInOut:Jo,circInOut:ta};function oy(n){return n in Pf}var Kr=class extends zs{constructor(t){super(t);let{name:e,motionValue:i,element:s,keyframes:r}=this.options;this.resolver=new Bs(r,(o,a)=>this.onKeyframesResolved(o,a),e,i,s),this.resolver.scheduleResolve()}initPlayback(t,e){let{duration:i=300,times:s,ease:r,type:o,motionValue:a,name:l,startTime:c}=this.options;if(!a.owner||!a.owner.current)return!1;if(typeof r=="string"&&Ds()&&oy(r)&&(r=Pf[r]),sy(this.options)){let{onComplete:u,onUpdate:f,motionValue:p,element:g,...y}=this.options,m=ry(t,y);t=m.keyframes,t.length===1&&(t[1]=t[0]),i=m.duration,s=m.times,r=m.ease,o="keyframes"}let h=Rf(a.owner.current,l,t,{...this.options,duration:i,times:s,ease:r});return h.startTime=c??this.calcStartTime(),this.pendingTimeline?(lc(h,this.pendingTimeline),this.pendingTimeline=void 0):h.onfinish=()=>{let{onComplete:u}=this.options;a.set(Ei(t,this.options,e)),u&&u(),this.cancel(),this.resolveFinishedPromise()},{animation:h,duration:i,times:s,type:o,ease:r,keyframes:t}}get duration(){let{resolved:t}=this;if(!t)return 0;let{duration:e}=t;return Je(e)}get time(){let{resolved:t}=this;if(!t)return 0;let{animation:e}=t;return Je(e.currentTime||0)}set time(t){let{resolved:e}=this;if(!e)return;let{animation:i}=e;i.currentTime=ke(t)}get speed(){let{resolved:t}=this;if(!t)return 1;let{animation:e}=t;return e.playbackRate}set speed(t){let{resolved:e}=this;if(!e)return;let{animation:i}=e;i.playbackRate=t}get state(){let{resolved:t}=this;if(!t)return"idle";let{animation:e}=t;return e.playState}get startTime(){let{resolved:t}=this;if(!t)return null;let{animation:e}=t;return e.startTime}attachTimeline(t){if(!this._resolved)this.pendingTimeline=t;else{let{resolved:e}=this;if(!e)return ze;let{animation:i}=e;lc(i,t)}return ze}play(){if(this.isStopped)return;let{resolved:t}=this;if(!t)return;let{animation:e}=t;e.playState==="finished"&&this.updateFinishedPromise(),e.play()}pause(){let{resolved:t}=this;if(!t)return;let{animation:e}=t;e.pause()}stop(){if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.resolveFinishedPromise(),this.updateFinishedPromise();let{resolved:t}=this;if(!t)return;let{animation:e,keyframes:i,duration:s,type:r,ease:o,times:a}=t;if(e.playState==="idle"||e.playState==="finished")return;if(this.time){let{motionValue:c,onUpdate:h,onComplete:u,element:f,...p}=this.options,g=new Ji({...p,keyframes:i,duration:s,type:r,ease:o,times:a,isGenerator:!0}),y=ke(this.time);c.setWithVelocity(g.sample(y-da).value,g.sample(y).value,da)}let{onStop:l}=this.options;l&&l(),this.cancel()}complete(){let{resolved:t}=this;t&&t.animation.finish()}cancel(){let{resolved:t}=this;t&&t.animation.cancel()}static supports(t){let{motionValue:e,name:i,repeatDelay:s,repeatType:r,damping:o,type:a}=t;if(!e||!e.owner||!(e.owner.current instanceof HTMLElement))return!1;let{onUpdate:l,transformTemplate:c}=e.owner.getProps();return Cf()&&i&&Af.has(i)&&!l&&!c&&!s&&r!=="mirror"&&o!==0&&a!=="inertia"}};var ay={type:"spring",stiffness:500,damping:25,restSpeed:10},ly=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),cy={type:"keyframes",duration:.8},hy={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},If=(n,{keyframes:t})=>t.length>2?cy:cn.has(n)?n.startsWith("scale")?ly(t[1]):ay:hy;function Df({when:n,delay:t,delayChildren:e,staggerChildren:i,staggerDirection:s,repeat:r,repeatType:o,repeatDelay:a,from:l,elapsed:c,...h}){return!!Object.keys(h).length}var fa=(n,t,e,i={},s,r)=>o=>{let a=Go(i,n)||{},l=a.delay||i.delay||0,{elapsed:c=0}=i;c=c-ke(l);let h={keyframes:Array.isArray(e)?e:[null,e],ease:"easeOut",velocity:t.getVelocity(),...a,delay:-c,onUpdate:f=>{t.set(f),a.onUpdate&&a.onUpdate(f)},onComplete:()=>{o(),a.onComplete&&a.onComplete()},name:n,motionValue:t,element:r?void 0:s};Df(a)||(h={...h,...If(n,h)}),h.duration&&(h.duration=ke(h.duration)),h.repeatDelay&&(h.repeatDelay=ke(h.repeatDelay)),h.from!==void 0&&(h.keyframes[0]=h.from);let u=!1;if((h.type===!1||h.duration===0&&!h.repeatDelay)&&(h.duration=0,h.delay===0&&(u=!0)),($o.current||Cs.skipAnimations)&&(u=!0,h.duration=0,h.delay=0),u&&!r&&t.get()!==void 0){let f=Ei(h.keyframes,a);if(f!==void 0)return ve.update(()=>{h.onUpdate(f),h.onComplete()}),new Ts([])}return!r&&Kr.supports(h)?new Kr(h):new Ji(h)};function uy({protectedKeys:n,needsAnimating:t},e){let i=n.hasOwnProperty(e)&&t[e]!==!0;return t[e]=!1,i}function Lf(n,t,{delay:e=0,transitionOverride:i,type:s}={}){var r;let{transition:o=n.getDefaultTransition(),transitionEnd:a,...l}=t;i&&(o=i);let c=[],h=s&&n.animationState&&n.animationState.getState()[s];for(let u in l){let f=n.getValue(u,(r=n.latestValues[u])!==null&&r!==void 0?r:null),p=l[u];if(p===void 0||h&&uy(h,u))continue;let g={delay:e,...Go(o||{},u)},y=!1;if(window.MotionHandoffAnimation){let d=Gd(n);if(d){let b=window.MotionHandoffAnimation(d,u,ve);b!==null&&(g.startTime=b,y=!0)}}Vd(n,u),f.start(fa(u,f,p,n.shouldReduceMotion&&Wo.has(u)?{type:!1}:g,n,y));let m=f.animation;m&&c.push(m)}return a&&Promise.all(c).then(()=>{ve.update(()=>{a&&zd(n,a)})}),c}function Uf(n){return n instanceof SVGElement&&n.tagName!=="svg"}var Nf=()=>({min:0,max:0}),Hs=()=>({x:Nf(),y:Nf()});var Ff={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},pa={};for(let n in Ff)pa[n]={isEnabled:t=>Ff[n].some(e=>!!t[e])};var Of=typeof window<"u";var Jr={current:null},ma={current:!1};function Bf(){if(ma.current=!0,!!Of)if(window.matchMedia){let n=window.matchMedia("(prefers-reduced-motion)"),t=()=>Jr.current=n.matches;n.addListener(t),t()}else Jr.current=!1}var dy=[...vc,Ee,un],zf=n=>dy.find(oa(n));function kf(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function Vf(n){return typeof n=="string"||Array.isArray(n)}var fy=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Hf=["initial",...fy];function Rc(n){return kf(n.animate)||Hf.some(t=>Vf(n[t]))}function Gf(n){return!!(Rc(n)||n.variants)}function Wf(n,t,e){for(let i in t){let s=t[i],r=e[i];if(pe(s))n.addValue(i,s);else if(pe(r))n.addValue(i,Jn(s,{owner:n}));else if(r!==s)if(n.hasValue(i)){let o=n.getValue(i);o.liveStyle===!0?o.jump(s):o.hasAnimated||o.set(s)}else{let o=n.getStaticValue(i);n.addValue(i,Jn(o!==void 0?o:s,{owner:n}))}}for(let i in e)t[i]===void 0&&n.removeValue(i);return t}var Xf=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],Gs=class{scrapeMotionValuesFromProps(t,e,i){return{}}constructor({parent:t,props:e,presenceContext:i,reducedMotionConfig:s,blockInitialAnimation:r,visualState:o},a={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=Ti,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let p=hn.now();this.renderScheduledAt<p&&(this.renderScheduledAt=p,ve.render(this.render,!1,!0))};let{latestValues:l,renderState:c,onUpdate:h}=o;this.onUpdate=h,this.latestValues=l,this.baseTarget={...l},this.initialValues=e.initial?{...l}:{},this.renderState=c,this.parent=t,this.props=e,this.presenceContext=i,this.depth=t?t.depth+1:0,this.reducedMotionConfig=s,this.options=a,this.blockInitialAnimation=!!r,this.isControllingVariants=Rc(e),this.isVariantNode=Gf(e),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);let{willChange:u,...f}=this.scrapeMotionValuesFromProps(e,{},this);for(let p in f){let g=f[p];l[p]!==void 0&&pe(g)&&g.set(l[p],!1)}}mount(t){this.current=t,Zn.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((e,i)=>this.bindToMotionValue(i,e)),ma.current||Bf(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:Jr.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){Zn.delete(this.current),this.projection&&this.projection.unmount(),Kn(this.notifyUpdate),Kn(this.render),this.valueSubscriptions.forEach(t=>t()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(let t in this.events)this.events[t].clear();for(let t in this.features){let e=this.features[t];e&&(e.unmount(),e.isMounted=!1)}this.current=null}bindToMotionValue(t,e){this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)();let i=cn.has(t),s=e.on("change",a=>{this.latestValues[t]=a,this.props.onUpdate&&ve.preRender(this.notifyUpdate),i&&this.projection&&(this.projection.isTransformDirty=!0)}),r=e.on("renderRequest",this.scheduleRender),o;window.MotionCheckAppearSync&&(o=window.MotionCheckAppearSync(this,t,e)),this.valueSubscriptions.set(t,()=>{s(),r(),o&&o(),e.owner&&e.stop()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}updateFeatures(){let t="animation";for(t in pa){let e=pa[t];if(!e)continue;let{isEnabled:i,Feature:s}=e;if(!this.features[t]&&s&&i(this.props)&&(this.features[t]=new s(this)),this.features[t]){let r=this.features[t];r.isMounted?r.update():(r.mount(),r.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Hs()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,e){this.latestValues[t]=e}update(t,e){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=e;for(let i=0;i<Xf.length;i++){let s=Xf[i];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);let r="on"+s,o=t[r];o&&(this.propEventSubscriptions[s]=this.on(s,o))}this.prevMotionValues=Wf(this,this.scrapeMotionValuesFromProps(t,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue(),this.onUpdate&&this.onUpdate(this)}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(t){let e=this.getClosestVariantNode();if(e)return e.variantChildren&&e.variantChildren.add(t),()=>e.variantChildren.delete(t)}addValue(t,e){let i=this.values.get(t);e!==i&&(i&&this.removeValue(t),this.bindToMotionValue(t,e),this.values.set(t,e),this.latestValues[t]=e.get())}removeValue(t){this.values.delete(t);let e=this.valueSubscriptions.get(t);e&&(e(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,e){if(this.props.values&&this.props.values[t])return this.props.values[t];let i=this.values.get(t);return i===void 0&&e!==void 0&&(i=Jn(e===null?void 0:e,{owner:this}),this.addValue(t,i)),i}readValue(t,e){var i;let s=this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:(i=this.getBaseTargetFromProps(this.props,t))!==null&&i!==void 0?i:this.readValueFromInstance(this.current,t,this.options);return s!=null&&(typeof s=="string"&&(sa(s)||ea(s))?s=parseFloat(s):!zf(s)&&un.test(e)&&(s=ia(t,e)),this.setBaseTarget(t,pe(s)?s.get():s)),pe(s)?s.get():s}setBaseTarget(t,e){this.baseTarget[t]=e}getBaseTarget(t){var e;let{initial:i}=this.props,s;if(typeof i=="string"||typeof i=="object"){let o=Yo(this.props,i,(e=this.presenceContext)===null||e===void 0?void 0:e.custom);o&&(s=o[t])}if(i&&s!==void 0)return s;let r=this.getBaseTargetFromProps(this.props,t);return r!==void 0&&!pe(r)?r:this.initialValues[t]!==void 0&&s===void 0?void 0:this.baseTarget[t]}on(t,e){return this.events[t]||(this.events[t]=new Ps),this.events[t].add(e)}notify(t,...e){this.events[t]&&this.events[t].notify(...e)}};var Ws=class extends Gs{constructor(){super(...arguments),this.KeyframeResolver=Bs}sortInstanceNodePosition(t,e){return t.compareDocumentPosition(e)&2?1:-1}getBaseTargetFromProps(t,e){return t.style?t.style[e]:void 0}removeValueFromRenderState(t,{vars:e,style:i}){delete e[t],delete i[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:t}=this.props;pe(t)&&(this.childSubscription=t.on("change",e=>{this.current&&(this.current.textContent=`${e}`)}))}};var ga=(n,t)=>t&&typeof n=="number"?t.transform(n):n;var py={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},my=Ln.length;function qf(n,t,e){let i="",s=!0;for(let r=0;r<my;r++){let o=Ln[r],a=n[o];if(a===void 0)continue;let l=!0;if(typeof a=="number"?l=a===(o.startsWith("scale")?1:0):l=parseFloat(a)===0,!l||e){let c=ga(a,Ns[o]);if(!l){s=!1;let h=py[o]||o;i+=`${h}(${c}) `}e&&(t[o]=c)}}return i=i.trim(),e?i=e(t,s?"":i):s&&(i="none"),i}function ya(n,t,e){let{style:i,vars:s,transformOrigin:r}=n,o=!1,a=!1;for(let l in t){let c=t[l];if(cn.has(l)){o=!0;continue}else if(ra(l)){s[l]=c;continue}else{let h=ga(c,Ns[l]);l.startsWith("origin")?(a=!0,r[l]=h):i[l]=h}}if(t.transform||(o||e?i.transform=qf(t,n.transform,e):i.transform&&(i.transform="none")),a){let{originX:l="50%",originY:c="50%",originZ:h=0}=r;i.transformOrigin=`${l} ${c} ${h}`}}var gy={offset:"stroke-dashoffset",array:"stroke-dasharray"},yy={offset:"strokeDashoffset",array:"strokeDasharray"};function Yf(n,t,e=1,i=0,s=!0){n.pathLength=1;let r=s?gy:yy;n[r.offset]=Ut.transform(-i);let o=Ut.transform(t),a=Ut.transform(e);n[r.array]=`${o} ${a}`}function $f(n,t,e){return typeof n=="string"?n:Ut.transform(t+e*n)}function Zf(n,t,e){let i=$f(t,n.x,n.width),s=$f(e,n.y,n.height);return`${i} ${s}`}function Kf(n,{attrX:t,attrY:e,attrScale:i,originX:s,originY:r,pathLength:o,pathSpacing:a=1,pathOffset:l=0,...c},h,u){if(ya(n,c,u),h){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};let{attrs:f,style:p,dimensions:g}=n;f.transform&&(g&&(p.transform=f.transform),delete f.transform),g&&(s!==void 0||r!==void 0||p.transform)&&(p.transformOrigin=Zf(g,s!==void 0?s:.5,r!==void 0?r:.5)),t!==void 0&&(f.x=t),e!==void 0&&(f.y=e),i!==void 0&&(f.scale=i),o!==void 0&&Yf(f,o,a,l,!1)}var xa=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);var Jf=n=>typeof n=="string"&&n.toLowerCase()==="svg";function _a(n,{style:t,vars:e},i,s){Object.assign(n.style,t,s&&s.getProjectionStyles(i));for(let r in e)n.style.setProperty(r,e[r])}function Qf(n,t,e,i){_a(n,t,void 0,i);for(let s in t.attrs)n.setAttribute(xa.has(s)?s:Is(s),t.attrs[s])}var jf={};function tp(n,{layout:t,layoutId:e}){return cn.has(n)||n.startsWith("origin")||(t||e!==void 0)&&(!!jf[n]||n==="opacity")}function va(n,t,e){var i;let{style:s}=n,r={};for(let o in s)(pe(s[o])||t.style&&pe(t.style[o])||tp(o,n)||((i=e?.getValue(o))===null||i===void 0?void 0:i.liveStyle)!==void 0)&&(r[o]=s[o]);return r}function ep(n,t,e){let i=va(n,t,e);for(let s in n)if(pe(n[s])||pe(t[s])){let r=Ln.indexOf(s)!==-1?"attr"+s.charAt(0).toUpperCase()+s.substring(1):s;i[r]=n[s]}return i}var Ma=class extends Ws{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Hs}getBaseTargetFromProps(t,e){return t[e]}readValueFromInstance(t,e){if(cn.has(e)){let i=Fs(e);return i&&i.default||0}return e=xa.has(e)?e:Is(e),t.getAttribute(e)}scrapeMotionValuesFromProps(t,e,i){return ep(t,e,i)}build(t,e,i){Kf(t,e,this.isSVGTag,i.transformTemplate)}renderInstance(t,e,i,s){Qf(t,e,i,s)}mount(t){this.isSVGTag=Jf(t.tagName),super.mount(t)}};function np({top:n,left:t,right:e,bottom:i}){return{x:{min:t,max:e},y:{min:n,max:i}}}function ip(n,t){if(!t)return n;let e=t({x:n.left,y:n.top}),i=t({x:n.right,y:n.bottom});return{top:e.y,left:e.x,bottom:i.y,right:i.x}}function sp(n,t){return np(ip(n.getBoundingClientRect(),t))}function xy(n){return window.getComputedStyle(n)}var Sa=class extends Ws{constructor(){super(...arguments),this.type="html",this.renderInstance=_a}readValueFromInstance(t,e){if(cn.has(e)){let i=Fs(e);return i&&i.default||0}else{let i=xy(t),s=(ra(e)?i.getPropertyValue(e):i[e])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(t,{transformPagePoint:e}){return sp(t,e)}build(t,e,i){ya(t,e,i.transformTemplate)}scrapeMotionValuesFromProps(t,e,i){return va(t,e,i)}};function _y(n,t){return n in t}var ba=class extends Gs{constructor(){super(...arguments),this.type="object"}readValueFromInstance(t,e){if(_y(e,t)){let i=t[e];if(typeof i=="string"||typeof i=="number")return i}}getBaseTargetFromProps(){}removeValueFromRenderState(t,e){delete e.output[t]}measureInstanceViewportBox(){return Hs()}build(t,e){Object.assign(t.output,e)}renderInstance(t,{output:e}){Object.assign(t,e)}sortInstanceNodePosition(){return 0}};function rp(n){let t={presenceContext:null,props:{},visualState:{renderState:{transform:{},transformOrigin:{},style:{},vars:{},attrs:{}},latestValues:{}}},e=Uf(n)?new Ma(t):new Sa(t);e.mount(n),Zn.set(n,e)}function op(n){let t={presenceContext:null,props:{},visualState:{renderState:{output:{}},latestValues:{}}},e=new ba(t);e.mount(n),Zn.set(n,e)}function ap(n,t,e){let i=pe(n)?n:Jn(n);return i.start(fa("",i,t,e)),i.animation}function vy(n,t){return pe(n)||typeof n=="number"||typeof n=="string"&&!Vr(t)}function Ta(n,t,e,i){let s=[];if(vy(n,t))s.push(ap(n,Vr(t)&&t.default||t,e&&(e.default||e)));else{let r=Vo(n,t,i),o=r.length;vn(!!o,"No valid elements provided.");for(let a=0;a<o;a++){let l=r[a],c=l instanceof Element?rp:op;Zn.has(l)||c(l);let h=Zn.get(l),u={...e};"delay"in u&&typeof u.delay=="function"&&(u.delay=u.delay(a,o)),s.push(...Lf(h,{...t,transition:u},{}))}}return s}function lp(n,t,e){let i=[];return Pd(n,t,e,{spring:As}).forEach(({keyframes:r,transition:o},a)=>{i.push(...Ta(a,r,o))}),i}function My(n){return Array.isArray(n)&&n.some(Array.isArray)}function cp(n){function t(e,i,s){let r=[];My(e)?r=lp(e,i,n):r=Ta(e,i,s,n);let o=new Ts(r);return n&&n.animations.push(o),o}return t}var Cc=cp();function Pc(n,t){let e,i=()=>{let{currentTime:s}=t,o=(s===null?0:s.value)/100;e!==o&&n(o),e=o};return ve.update(i,!0),()=>Kn(i)}var Ea=new WeakMap,wi;function Sy(n,t){if(t){let{inlineSize:e,blockSize:i}=t[0];return{width:e,height:i}}else return n instanceof SVGElement&&"getBBox"in n?n.getBBox():{width:n.offsetWidth,height:n.offsetHeight}}function by({target:n,contentRect:t,borderBoxSize:e}){var i;(i=Ea.get(n))===null||i===void 0||i.forEach(s=>{s({target:n,contentSize:t,get size(){return Sy(n,e)}})})}function Ty(n){n.forEach(by)}function Ey(){typeof ResizeObserver>"u"||(wi=new ResizeObserver(Ty))}function hp(n,t){wi||Ey();let e=Ss(n);return e.forEach(i=>{let s=Ea.get(i);s||(s=new Set,Ea.set(i,s)),s.add(t),wi?.observe(i)}),()=>{e.forEach(i=>{let s=Ea.get(i);s?.delete(t),s?.size||wi?.unobserve(i)})}}var wa=new Set,Qr;function wy(){Qr=()=>{let n={width:window.innerWidth,height:window.innerHeight},t={target:window,size:n,contentSize:n};wa.forEach(e=>e(t))},window.addEventListener("resize",Qr)}function up(n){return wa.add(n),Qr||wy(),()=>{wa.delete(n),!wa.size&&Qr&&(Qr=void 0)}}function dp(n,t){return typeof n=="function"?up(n):hp(n,t)}var Ay=50,fp=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),mp=()=>({time:0,x:fp(),y:fp()}),Ry={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function pp(n,t,e,i){let s=e[t],{length:r,position:o}=Ry[t],a=s.current,l=e.time;s.current=n[`scroll${o}`],s.scrollLength=n[`scroll${r}`]-n[`client${r}`],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=In(0,s.scrollLength,s.current);let c=i-l;s.velocity=c>Ay?0:ws(s.current-a,c)}function gp(n,t,e){pp(n,"x",t,e),pp(n,"y",t,e),t.time=e}function yp(n,t){let e={x:0,y:0},i=n;for(;i&&i!==t;)if(i instanceof HTMLElement)e.x+=i.offsetLeft,e.y+=i.offsetTop,i=i.offsetParent;else if(i.tagName==="svg"){let s=i.getBoundingClientRect();i=i.parentElement;let r=i.getBoundingClientRect();e.x+=s.left-r.left,e.y+=s.top-r.top}else if(i instanceof SVGGraphicsElement){let{x:s,y:r}=i.getBBox();e.x+=s,e.y+=r;let o=null,a=i.parentNode;for(;!o;)a.tagName==="svg"&&(o=a),a=i.parentNode;i=o}else break;return e}var Aa={start:0,center:.5,end:1};function Ic(n,t,e=0){let i=0;if(n in Aa&&(n=Aa[n]),typeof n=="string"){let s=parseFloat(n);n.endsWith("px")?i=s:n.endsWith("%")?n=s/100:n.endsWith("vw")?i=s/100*document.documentElement.clientWidth:n.endsWith("vh")?i=s/100*document.documentElement.clientHeight:n=s}return typeof n=="number"&&(i=t*n),e+i}var Cy=[0,0];function xp(n,t,e,i){let s=Array.isArray(n)?n:Cy,r=0,o=0;return typeof n=="number"?s=[n,n]:typeof n=="string"&&(n=n.trim(),n.includes(" ")?s=n.split(" "):s=[n,Aa[n]?n:"0"]),r=Ic(s[0],e,i),o=Ic(s[1],t),r-o}var _p={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]};var Py={x:0,y:0};function Iy(n){return"getBBox"in n&&n.tagName!=="svg"?n.getBBox():{width:n.clientWidth,height:n.clientHeight}}function vp(n,t,e){let{offset:i=_p.All}=e,{target:s=n,axis:r="y"}=e,o=r==="y"?"height":"width",a=s!==n?yp(s,n):Py,l=s===n?{width:n.scrollWidth,height:n.scrollHeight}:Iy(s),c={width:n.clientWidth,height:n.clientHeight};t[r].offset.length=0;let h=!t[r].interpolate,u=i.length;for(let f=0;f<u;f++){let p=xp(i[f],c[o],l[o],a[r]);!h&&p!==t[r].interpolatorOffsets[f]&&(h=!0),t[r].offset[f]=p}h&&(t[r].interpolate=ua(t[r].offset,Rs(i),{clamp:!1}),t[r].interpolatorOffsets=[...t[r].offset]),t[r].progress=We(0,1,t[r].interpolate(t[r].current))}function Dy(n,t=n,e){if(e.x.targetOffset=0,e.y.targetOffset=0,t!==n){let i=t;for(;i&&i!==n;)e.x.targetOffset+=i.offsetLeft,e.y.targetOffset+=i.offsetTop,i=i.offsetParent}e.x.targetLength=t===n?t.scrollWidth:t.clientWidth,e.y.targetLength=t===n?t.scrollHeight:t.clientHeight,e.x.containerLength=n.clientWidth,e.y.containerLength=n.clientHeight}function Mp(n,t,e,i={}){return{measure:()=>Dy(n,i.target,e),update:s=>{gp(n,e,s),(i.offset||i.target)&&vp(n,e,i)},notify:()=>t(e)}}var jr=new WeakMap,Sp=new WeakMap,Dc=new WeakMap,bp=n=>n===document.documentElement?window:n;function Ra(n,{container:t=document.documentElement,...e}={}){let i=Dc.get(t);i||(i=new Set,Dc.set(t,i));let s=mp(),r=Mp(t,n,s,e);if(i.add(r),!jr.has(t)){let a=()=>{for(let f of i)f.measure()},l=()=>{for(let f of i)f.update(_i.timestamp)},c=()=>{for(let f of i)f.notify()},h=()=>{ve.read(a,!1,!0),ve.read(l,!1,!0),ve.update(c,!1,!0)};jr.set(t,h);let u=bp(t);window.addEventListener("resize",h,{passive:!0}),t!==document.documentElement&&Sp.set(t,dp(t,h)),u.addEventListener("scroll",h,{passive:!0})}let o=jr.get(t);return ve.read(o,!1,!0),()=>{var a;Kn(o);let l=Dc.get(t);if(!l||(l.delete(r),l.size))return;let c=jr.get(t);jr.delete(t),c&&(bp(t).removeEventListener("scroll",c),(a=Sp.get(t))===null||a===void 0||a(),window.removeEventListener("resize",c))}}function Ly({source:n,container:t,axis:e="y"}){n&&(t=n);let i={value:0},s=Ra(r=>{i.value=r[e].progress*100},{container:t,axis:e});return{currentTime:i,cancel:s}}var Lc=new Map;function Tp({source:n,container:t=document.documentElement,axis:e="y"}={}){n&&(t=n),Lc.has(t)||Lc.set(t,{});let i=Lc.get(t);return i[e]||(i[e]=Lo()?new ScrollTimeline({source:t,axis:e}):Ly({source:t,axis:e})),i[e]}function Uy(n){return n.length===2}function Ep(n){return n&&(n.target||n.offset)}function Ny(n,t){return Uy(n)||Ep(t)?Ra(e=>{n(e[t.axis].progress,e)},t):Pc(n,Tp(t))}function Fy(n,t){if(n.flatten(),Ep(t))return n.pause(),Ra(e=>{n.time=n.duration*e[t.axis].progress},t);{let e=Tp(t);return n.attachTimeline?n.attachTimeline(e,i=>(i.pause(),Pc(s=>{i.time=i.duration*s},e))):ze}}function Uc(n,{axis:t="y",...e}={}){let i={axis:t,...e};return typeof n=="function"?Ny(n,i):Fy(n,i)}var Oy={some:0,all:1};function Nc(n,t,{root:e,margin:i,amount:s="some"}={}){let r=Ss(n),o=new WeakMap,a=c=>{c.forEach(h=>{let u=o.get(h.target);if(h.isIntersecting!==!!u)if(h.isIntersecting){let f=t(h.target,h);typeof f=="function"?o.set(h.target,f):l.unobserve(h.target)}else typeof u=="function"&&(u(h),o.delete(h.target))})},l=new IntersectionObserver(a,{root:e,rootMargin:i,threshold:typeof s=="number"?s:Oy[s]});return r.forEach(c=>l.observe(c)),()=>l.disconnect()}var By=0,wp=1,zy=2;var Fm=1,ky=2,si=3,Oi=0,je=1,Tn=2,Ui=0,hr=1,hi=2,Ap=3,Rp=4,Vy=5,rs=100,Hy=101,Gy=102,Wy=103,Xy=104,qy=200,Yy=201,$y=202,Zy=203,gh=204,yh=205,Ky=206,Jy=207,Qy=208,jy=209,tx=210,ex=211,nx=212,ix=213,sx=214,xh=0,_h=1,vh=2,pr=3,Mh=4,Sh=5,bh=6,Th=7,Om=0,rx=1,ox=2,Ni=0,ax=1,lx=2,cx=3,hx=4,ux=5,dx=6,fx=7;var Bm=300,mr=301,gr=302,Eh=303,wh=304,Fl=306,Ah=1e3,as=1001,Rh=1002,wn=1003,px=1004;var Ca=1005;var zn=1006,Fc=1007;var ls=1008;var ui=1009,zm=1010,km=1011,fo=1012,Uu=1013,cs=1014,ai=1015,_o=1016,Nu=1017,Fu=1018,yr=1020,Vm=35902,Hm=1021,Gm=1022,En=1023,Wm=1024,Xm=1025,ur=1026,xr=1027,qm=1028,Ou=1029,Ym=1030,Bu=1031;var zu=1033,al=33776,ll=33777,cl=33778,hl=33779,Ch=35840,Ph=35841,Ih=35842,Dh=35843,Lh=36196,Uh=37492,Nh=37496,Fh=37808,Oh=37809,Bh=37810,zh=37811,kh=37812,Vh=37813,Hh=37814,Gh=37815,Wh=37816,Xh=37817,qh=37818,Yh=37819,$h=37820,Zh=37821,ul=36492,Kh=36494,Jh=36495,$m=36283,Qh=36284,jh=36285,tu=36286;var fl=2300,eu=2301,Oc=2302,Cp=2400,Pp=2401,Ip=2402;var mx=3200,gx=3201;var Zm=0,yx=1,Li="",fn="srgb",Rr="srgb-linear",Ol="linear",se="srgb";var Xs=7680;var Dp=519,xx=512,_x=513,vx=514,Km=515,Mx=516,Sx=517,bx=518,Tx=519,nu=35044;var Lp="300 es",li=2e3,pl=2001,Bi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ve=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var dl=Math.PI/180,iu=180/Math.PI;function Fi(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ve[n&255]+Ve[n>>8&255]+Ve[n>>16&255]+Ve[n>>24&255]+"-"+Ve[t&255]+Ve[t>>8&255]+"-"+Ve[t>>16&15|64]+Ve[t>>24&255]+"-"+Ve[e&63|128]+Ve[e>>8&255]+"-"+Ve[e>>16&255]+Ve[e>>24&255]+Ve[i&255]+Ve[i>>8&255]+Ve[i>>16&255]+Ve[i>>24&255]).toLowerCase()}function Qe(n,t,e){return Math.max(t,Math.min(e,n))}function Ex(n,t){return(n%t+t)%t}function Bc(n,t,e){return(1-e)*n+e*t}function Bn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function re(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var qt=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Qe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Wt=class n{constructor(t,e,i,s,r,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],p=i[5],g=i[8],y=s[0],m=s[3],d=s[6],b=s[1],S=s[4],_=s[7],C=s[2],A=s[5],I=s[8];return r[0]=o*y+a*b+l*C,r[3]=o*m+a*S+l*A,r[6]=o*d+a*_+l*I,r[1]=c*y+h*b+u*C,r[4]=c*m+h*S+u*A,r[7]=c*d+h*_+u*I,r[2]=f*y+p*b+g*C,r[5]=f*m+p*S+g*A,r[8]=f*d+p*_+g*I,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*r,p=c*r-o*l,g=e*u+i*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return t[0]=u*y,t[1]=(s*c-h*i)*y,t[2]=(a*i-s*o)*y,t[3]=f*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-a*e)*y,t[6]=p*y,t[7]=(i*l-c*e)*y,t[8]=(o*e-i*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(zc.makeScale(t,e)),this}rotate(t){return this.premultiply(zc.makeRotation(-t)),this}translate(t,e){return this.premultiply(zc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},zc=new Wt;function Jm(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function ml(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function wx(){let n=ml("canvas");return n.style.display="block",n}var Up={};function co(n){n in Up||(Up[n]=!0,console.warn(n))}function Ax(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function Rx(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Cx(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var jt={enabled:!0,workingColorSpace:Rr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===se&&(n.r=ci(n.r),n.g=ci(n.g),n.b=ci(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===se&&(n.r=dr(n.r),n.g=dr(n.g),n.b=dr(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Li?Ol:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function ci(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function dr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Np=[.64,.33,.3,.6,.15,.06],Fp=[.2126,.7152,.0722],Op=[.3127,.329],Bp=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zp=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);jt.define({[Rr]:{primaries:Np,whitePoint:Op,transfer:Ol,toXYZ:Bp,fromXYZ:zp,luminanceCoefficients:Fp,workingColorSpaceConfig:{unpackColorSpace:fn},outputColorSpaceConfig:{drawingBufferColorSpace:fn}},[fn]:{primaries:Np,whitePoint:Op,transfer:se,toXYZ:Bp,fromXYZ:zp,luminanceCoefficients:Fp,outputColorSpaceConfig:{drawingBufferColorSpace:fn}}});var qs,su=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{qs===void 0&&(qs=ml("canvas")),qs.width=t.width,qs.height=t.height;let i=qs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=qs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ml("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ci(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ci(e[i]/255)*255):e[i]=ci(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Px=0,gl=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Px++}),this.uuid=Fi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(kc(s[o].image)):r.push(kc(s[o]))}else r=kc(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function kc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?su.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ix=0,an=class n extends Bi{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=as,s=as,r=zn,o=ls,a=En,l=ui,c=n.DEFAULT_ANISOTROPY,h=Li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ix++}),this.uuid=Fi(),this.name="",this.source=new gl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new qt(0,0),this.repeat=new qt(1,1),this.center=new qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Bm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ah:t.x=t.x-Math.floor(t.x);break;case as:t.x=t.x<0?0:1;break;case Rh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ah:t.y=t.y-Math.floor(t.y);break;case as:t.y=t.y<0?0:1;break;case Rh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=Bm;an.DEFAULT_ANISOTROPY=1;var oe=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],g=l[9],y=l[2],m=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(c+1)/2,_=(p+1)/2,C=(d+1)/2,A=(h+f)/4,I=(u+y)/4,P=(g+m)/4;return S>_&&S>C?S<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(S),s=A/i,r=I/i):_>C?_<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),i=A/s,r=P/s):C<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),i=I/r,s=P/r),this.set(i,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(u-y)*(u-y)+(f-h)*(f-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-y)/b,this.z=(f-h)/b,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ru=class extends Bi{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new an(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new gl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},di=class extends ru{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},yl=class extends an{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=wn,this.minFilter=wn,this.wrapR=as,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ou=class extends an{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=wn,this.minFilter=wn,this.wrapR=as,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var zi=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],f=r[o+0],p=r[o+1],g=r[o+2],y=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=y;return}if(u!==y||l!==f||c!==p||h!==g){let m=1-a,d=l*f+c*p+h*g+u*y,b=d>=0?1:-1,S=1-d*d;if(S>Number.EPSILON){let C=Math.sqrt(S),A=Math.atan2(C,d*b);m=Math.sin(m*A)/C,a=Math.sin(a*A)/C}let _=a*b;if(l=l*m+f*_,c=c*m+p*_,h=h*m+g*_,u=u*m+y*_,m===1-a){let C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*p-c*f,t[e+1]=l*g+h*f+c*u-a*p,t[e+2]=c*g+h*p+a*f-l*u,t[e+3]=h*g-a*u-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),u=a(r/2),f=l(i/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"YZX":this._x=f*h*u+c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u-f*p*g;break;case"XZY":this._x=f*h*u-c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+a+u;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>u){let p=2*Math.sqrt(1+i-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>u){let p=2*Math.sqrt(1+a-i-u);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qe(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(kp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(kp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Vc.copy(this).projectOnVector(t),this.sub(Vc)}reflect(t){return this.sub(Vc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Qe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Vc=new F,kp=new zi,hs=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Mn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Mn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Mn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Mn):Mn.fromBufferAttribute(r,o),Mn.applyMatrix4(t.matrixWorld),this.expandByPoint(Mn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Pa.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Pa.copy(i.boundingBox)),Pa.applyMatrix4(t.matrixWorld),this.union(Pa)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Mn),Mn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(to),Ia.subVectors(this.max,to),Ys.subVectors(t.a,to),$s.subVectors(t.b,to),Zs.subVectors(t.c,to),Ai.subVectors($s,Ys),Ri.subVectors(Zs,$s),Qi.subVectors(Ys,Zs);let e=[0,-Ai.z,Ai.y,0,-Ri.z,Ri.y,0,-Qi.z,Qi.y,Ai.z,0,-Ai.x,Ri.z,0,-Ri.x,Qi.z,0,-Qi.x,-Ai.y,Ai.x,0,-Ri.y,Ri.x,0,-Qi.y,Qi.x,0];return!Hc(e,Ys,$s,Zs,Ia)||(e=[1,0,0,0,1,0,0,0,1],!Hc(e,Ys,$s,Zs,Ia))?!1:(Da.crossVectors(Ai,Ri),e=[Da.x,Da.y,Da.z],Hc(e,Ys,$s,Zs,Ia))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Mn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Mn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},jn=[new F,new F,new F,new F,new F,new F,new F,new F],Mn=new F,Pa=new hs,Ys=new F,$s=new F,Zs=new F,Ai=new F,Ri=new F,Qi=new F,to=new F,Ia=new F,Da=new F,ji=new F;function Hc(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){ji.fromArray(n,r);let a=s.x*Math.abs(ji.x)+s.y*Math.abs(ji.y)+s.z*Math.abs(ji.z),l=t.dot(ji),c=e.dot(ji),h=i.dot(ji);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Dx=new hs,eo=new F,Gc=new F,us=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Dx.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;eo.subVectors(t,this.center);let e=eo.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(eo,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Gc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(eo.copy(t.center).add(Gc)),this.expandByPoint(eo.copy(t.center).sub(Gc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},ti=new F,Wc=new F,La=new F,Ci=new F,Xc=new F,Ua=new F,qc=new F,po=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ti)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ti.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ti.copy(this.origin).addScaledVector(this.direction,e),ti.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Wc.copy(t).add(e).multiplyScalar(.5),La.copy(e).sub(t).normalize(),Ci.copy(this.origin).sub(Wc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(La),a=Ci.dot(this.direction),l=-Ci.dot(La),c=Ci.lengthSq(),h=Math.abs(1-o*o),u,f,p,g;if(h>0)if(u=o*l-a,f=o*a-l,g=r*h,u>=0)if(f>=-g)if(f<=g){let y=1/h;u*=y,f*=y,p=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Wc).addScaledVector(La,f),p}intersectSphere(t,e){ti.subVectors(t.center,this.origin);let i=ti.dot(this.direction),s=ti.dot(ti)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,ti)!==null}intersectTriangle(t,e,i,s,r){Xc.subVectors(e,t),Ua.subVectors(i,t),qc.crossVectors(Xc,Ua);let o=this.direction.dot(qc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ci.subVectors(this.origin,t);let l=a*this.direction.dot(Ua.crossVectors(Ci,Ua));if(l<0)return null;let c=a*this.direction.dot(Xc.cross(Ci));if(c<0||l+c>o)return null;let h=-a*Ci.dot(qc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},fe=class n{constructor(t,e,i,s,r,o,a,l,c,h,u,f,p,g,y,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,h,u,f,p,g,y,m)}set(t,e,i,s,r,o,a,l,c,h,u,f,p,g,y,m){let d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=y,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/Ks.setFromMatrixColumn(t,0).length(),r=1/Ks.setFromMatrixColumn(t,1).length(),o=1/Ks.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,p=o*u,g=a*h,y=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=f-y*c,e[9]=-a*l,e[2]=y-f*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){let f=l*h,p=l*u,g=c*h,y=c*u;e[0]=f+y*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=y+f*a,e[10]=o*l}else if(t.order==="ZXY"){let f=l*h,p=l*u,g=c*h,y=c*u;e[0]=f-y*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=y-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let f=o*h,p=o*u,g=a*h,y=a*u;e[0]=l*h,e[4]=g*c-p,e[8]=f*c+y,e[1]=l*u,e[5]=y*c+f,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let f=o*l,p=o*c,g=a*l,y=a*c;e[0]=l*h,e[4]=y-f*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+g,e[10]=f-y*u}else if(t.order==="XZY"){let f=o*l,p=o*c,g=a*l,y=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+y,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=y*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Lx,t,Ux)}lookAt(t,e,i){let s=this.elements;return rn.subVectors(t,e),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),Pi.crossVectors(i,rn),Pi.lengthSq()===0&&(Math.abs(i.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),Pi.crossVectors(i,rn)),Pi.normalize(),Na.crossVectors(rn,Pi),s[0]=Pi.x,s[4]=Na.x,s[8]=rn.x,s[1]=Pi.y,s[5]=Na.y,s[9]=rn.y,s[2]=Pi.z,s[6]=Na.z,s[10]=rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],p=i[13],g=i[2],y=i[6],m=i[10],d=i[14],b=i[3],S=i[7],_=i[11],C=i[15],A=s[0],I=s[4],P=s[8],M=s[12],v=s[1],L=s[5],G=s[9],X=s[13],Q=s[2],B=s[6],D=s[10],V=s[14],E=s[3],R=s[7],U=s[11],q=s[15];return r[0]=o*A+a*v+l*Q+c*E,r[4]=o*I+a*L+l*B+c*R,r[8]=o*P+a*G+l*D+c*U,r[12]=o*M+a*X+l*V+c*q,r[1]=h*A+u*v+f*Q+p*E,r[5]=h*I+u*L+f*B+p*R,r[9]=h*P+u*G+f*D+p*U,r[13]=h*M+u*X+f*V+p*q,r[2]=g*A+y*v+m*Q+d*E,r[6]=g*I+y*L+m*B+d*R,r[10]=g*P+y*G+m*D+d*U,r[14]=g*M+y*X+m*V+d*q,r[3]=b*A+S*v+_*Q+C*E,r[7]=b*I+S*L+_*B+C*R,r[11]=b*P+S*G+_*D+C*U,r[15]=b*M+S*X+_*V+C*q,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],p=t[14],g=t[3],y=t[7],m=t[11],d=t[15];return g*(+r*l*u-s*c*u-r*a*f+i*c*f+s*a*p-i*l*p)+y*(+e*l*p-e*c*f+r*o*f-s*o*p+s*c*h-r*l*h)+m*(+e*c*u-e*a*p-r*o*u+i*o*p+r*a*h-i*c*h)+d*(-s*a*h-e*l*u+e*a*f+s*o*u-i*o*f+i*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],p=t[11],g=t[12],y=t[13],m=t[14],d=t[15],b=u*m*c-y*f*c+y*l*p-a*m*p-u*l*d+a*f*d,S=g*f*c-h*m*c-g*l*p+o*m*p+h*l*d-o*f*d,_=h*y*c-g*u*c+g*a*p-o*y*p-h*a*d+o*u*d,C=g*u*l-h*y*l-g*a*f+o*y*f+h*a*m-o*u*m,A=e*b+i*S+s*_+r*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/A;return t[0]=b*I,t[1]=(y*f*r-u*m*r-y*s*p+i*m*p+u*s*d-i*f*d)*I,t[2]=(a*m*r-y*l*r+y*s*c-i*m*c-a*s*d+i*l*d)*I,t[3]=(u*l*r-a*f*r-u*s*c+i*f*c+a*s*p-i*l*p)*I,t[4]=S*I,t[5]=(h*m*r-g*f*r+g*s*p-e*m*p-h*s*d+e*f*d)*I,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*d-e*l*d)*I,t[7]=(o*f*r-h*l*r+h*s*c-e*f*c-o*s*p+e*l*p)*I,t[8]=_*I,t[9]=(g*u*r-h*y*r-g*i*p+e*y*p+h*i*d-e*u*d)*I,t[10]=(o*y*r-g*a*r+g*i*c-e*y*c-o*i*d+e*a*d)*I,t[11]=(h*a*r-o*u*r-h*i*c+e*u*c+o*i*p-e*a*p)*I,t[12]=C*I,t[13]=(h*y*s-g*u*s+g*i*f-e*y*f-h*i*m+e*u*m)*I,t[14]=(g*a*s-o*y*s-g*i*l+e*y*l+o*i*m-e*a*m)*I,t[15]=(o*u*s-h*a*s+h*i*l-e*u*l-o*i*f+e*a*f)*I,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,f=r*c,p=r*h,g=r*u,y=o*h,m=o*u,d=a*u,b=l*c,S=l*h,_=l*u,C=i.x,A=i.y,I=i.z;return s[0]=(1-(y+d))*C,s[1]=(p+_)*C,s[2]=(g-S)*C,s[3]=0,s[4]=(p-_)*A,s[5]=(1-(f+d))*A,s[6]=(m+b)*A,s[7]=0,s[8]=(g+S)*I,s[9]=(m-b)*I,s[10]=(1-(f+y))*I,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=Ks.set(s[0],s[1],s[2]).length(),o=Ks.set(s[4],s[5],s[6]).length(),a=Ks.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Sn.copy(this);let c=1/r,h=1/o,u=1/a;return Sn.elements[0]*=c,Sn.elements[1]*=c,Sn.elements[2]*=c,Sn.elements[4]*=h,Sn.elements[5]*=h,Sn.elements[6]*=h,Sn.elements[8]*=u,Sn.elements[9]*=u,Sn.elements[10]*=u,e.setFromRotationMatrix(Sn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=li){let l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s),p,g;if(a===li)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===pl)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=li){let l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(o-r),f=(e+t)*c,p=(i+s)*h,g,y;if(a===li)g=(o+r)*u,y=-2*u;else if(a===pl)g=r*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Ks=new F,Sn=new fe,Lx=new F(0,0,0),Ux=new F(1,1,1),Pi=new F,Na=new F,rn=new F,Vp=new fe,Hp=new zi,kn=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Vp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Vp,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Hp.setFromEuler(this),this.setFromQuaternion(Hp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};kn.DEFAULT_ORDER="XYZ";var xl=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Nx=0,Gp=new F,Js=new zi,ei=new fe,Fa=new F,no=new F,Fx=new F,Ox=new zi,Wp=new F(1,0,0),Xp=new F(0,1,0),qp=new F(0,0,1),Yp={type:"added"},Bx={type:"removed"},Qs={type:"childadded",child:null},Yc={type:"childremoved",child:null},Fe=class n extends Bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nx++}),this.uuid=Fi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new F,e=new kn,i=new zi,s=new F(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new fe},normalMatrix:{value:new Wt}}),this.matrix=new fe,this.matrixWorld=new fe,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Js.setFromAxisAngle(t,e),this.quaternion.multiply(Js),this}rotateOnWorldAxis(t,e){return Js.setFromAxisAngle(t,e),this.quaternion.premultiply(Js),this}rotateX(t){return this.rotateOnAxis(Wp,t)}rotateY(t){return this.rotateOnAxis(Xp,t)}rotateZ(t){return this.rotateOnAxis(qp,t)}translateOnAxis(t,e){return Gp.copy(t).applyQuaternion(this.quaternion),this.position.add(Gp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Wp,t)}translateY(t){return this.translateOnAxis(Xp,t)}translateZ(t){return this.translateOnAxis(qp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ei.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Fa.copy(t):Fa.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),no.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ei.lookAt(no,Fa,this.up):ei.lookAt(Fa,no,this.up),this.quaternion.setFromRotationMatrix(ei),s&&(ei.extractRotation(s.matrixWorld),Js.setFromRotationMatrix(ei),this.quaternion.premultiply(Js.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Yp),Qs.child=t,this.dispatchEvent(Qs),Qs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Bx),Yc.child=t,this.dispatchEvent(Yc),Yc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ei.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ei.multiply(t.parent.matrixWorld)),t.applyMatrix4(ei),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Yp),Qs.child=t,this.dispatchEvent(Qs),Qs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(no,t,Fx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(no,Ox,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Fe.DEFAULT_UP=new F(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var bn=new F,ni=new F,$c=new F,ii=new F,js=new F,tr=new F,$p=new F,Zc=new F,Kc=new F,Jc=new F,Qc=new oe,jc=new oe,th=new oe,oi=class n{constructor(t=new F,e=new F,i=new F){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),bn.subVectors(t,e),s.cross(bn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){bn.subVectors(s,e),ni.subVectors(i,e),$c.subVectors(t,e);let o=bn.dot(bn),a=bn.dot(ni),l=bn.dot($c),c=ni.dot(ni),h=ni.dot($c),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,p=(c*l-a*h)*f,g=(o*h-a*l)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,ii)===null?!1:ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ii.x),l.addScaledVector(o,ii.y),l.addScaledVector(a,ii.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return Qc.setScalar(0),jc.setScalar(0),th.setScalar(0),Qc.fromBufferAttribute(t,e),jc.fromBufferAttribute(t,i),th.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Qc,r.x),o.addScaledVector(jc,r.y),o.addScaledVector(th,r.z),o}static isFrontFacing(t,e,i,s){return bn.subVectors(i,e),ni.subVectors(t,e),bn.cross(ni).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return bn.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),bn.cross(ni).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;js.subVectors(s,i),tr.subVectors(r,i),Zc.subVectors(t,i);let l=js.dot(Zc),c=tr.dot(Zc);if(l<=0&&c<=0)return e.copy(i);Kc.subVectors(t,s);let h=js.dot(Kc),u=tr.dot(Kc);if(h>=0&&u<=h)return e.copy(s);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(js,o);Jc.subVectors(t,r);let p=js.dot(Jc),g=tr.dot(Jc);if(g>=0&&p<=g)return e.copy(r);let y=p*c-l*g;if(y<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(tr,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return $p.subVectors(r,s),a=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector($p,a);let d=1/(m+y+f);return o=y*d,a=f*d,e.copy(i).addScaledVector(js,o).addScaledVector(tr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Qm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},Oa={h:0,s:0,l:0};function eh(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var $t=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=fn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,jt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=jt.workingColorSpace){if(t=Ex(t,1),e=Qe(e,0,1),i=Qe(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=eh(o,r,t+1/3),this.g=eh(o,r,t),this.b=eh(o,r,t-1/3)}return jt.toWorkingColorSpace(this,s),this}setStyle(t,e=fn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=fn){let i=Qm[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ci(t.r),this.g=ci(t.g),this.b=ci(t.b),this}copyLinearToSRGB(t){return this.r=dr(t.r),this.g=dr(t.g),this.b=dr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=fn){return jt.fromWorkingColorSpace(He.copy(this),t),Math.round(Qe(He.r*255,0,255))*65536+Math.round(Qe(He.g*255,0,255))*256+Math.round(Qe(He.b*255,0,255))}getHexString(t=fn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(He.copy(this),e);let i=He.r,s=He.g,r=He.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(He.copy(this),e),t.r=He.r,t.g=He.g,t.b=He.b,t}getStyle(t=fn){jt.fromWorkingColorSpace(He.copy(this),t);let e=He.r,i=He.g,s=He.b;return t!==fn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ii),this.setHSL(Ii.h+t,Ii.s+e,Ii.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ii),t.getHSL(Oa);let i=Bc(Ii.h,Oa.h,e),s=Bc(Ii.s,Oa.s,e),r=Bc(Ii.l,Oa.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},He=new $t;$t.NAMES=Qm;var zx=0,Vn=class extends Bi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zx++}),this.uuid=Fi(),this.name="",this.blending=hr,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gh,this.blendDst=yh,this.blendEquation=rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $t(0,0,0),this.blendAlpha=0,this.depthFunc=pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xs,this.stencilZFail=Xs,this.stencilZPass=Xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==hr&&(i.blending=this.blending),this.side!==Oi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==gh&&(i.blendSrc=this.blendSrc),this.blendDst!==yh&&(i.blendDst=this.blendDst),this.blendEquation!==rs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==pr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Xs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Xs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Hn=class extends Vn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Om,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var we=new F,Ba=new qt,Ne=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=nu,this.updateRanges=[],this.gpuType=ai,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ba.fromBufferAttribute(this,e),Ba.applyMatrix3(t),this.setXY(e,Ba.x,Ba.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Bn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=re(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Bn(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Bn(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Bn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Bn(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==nu&&(t.usage=this.usage),t}};var _l=class extends Ne{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var vl=class extends Ne{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var ge=class extends Ne{constructor(t,e,i){super(new Float32Array(t),e,i)}},kx=0,dn=new fe,nh=new Fe,er=new F,on=new hs,io=new hs,De=new F,Me=class n extends Bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kx++}),this.uuid=Fi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Jm(t)?vl:_l)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Wt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return dn.makeRotationFromQuaternion(t),this.applyMatrix4(dn),this}rotateX(t){return dn.makeRotationX(t),this.applyMatrix4(dn),this}rotateY(t){return dn.makeRotationY(t),this.applyMatrix4(dn),this}rotateZ(t){return dn.makeRotationZ(t),this.applyMatrix4(dn),this}translate(t,e,i){return dn.makeTranslation(t,e,i),this.applyMatrix4(dn),this}scale(t,e,i){return dn.makeScale(t,e,i),this.applyMatrix4(dn),this}lookAt(t){return nh.lookAt(t),nh.updateMatrix(),this.applyMatrix4(nh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(er).negate(),this.translate(er.x,er.y,er.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ge(i,3))}else{for(let i=0,s=e.count;i<s;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hs);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];on.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new us);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let i=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];io.setFromBufferAttribute(a),this.morphTargetsRelative?(De.addVectors(on.min,io.min),on.expandByPoint(De),De.addVectors(on.max,io.max),on.expandByPoint(De)):(on.expandByPoint(io.min),on.expandByPoint(io.max))}on.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)De.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(De));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)De.fromBufferAttribute(a,c),l&&(er.fromBufferAttribute(t,c),De.add(er)),s=Math.max(s,i.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ne(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<i.count;P++)a[P]=new F,l[P]=new F;let c=new F,h=new F,u=new F,f=new qt,p=new qt,g=new qt,y=new F,m=new F;function d(P,M,v){c.fromBufferAttribute(i,P),h.fromBufferAttribute(i,M),u.fromBufferAttribute(i,v),f.fromBufferAttribute(r,P),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,v),h.sub(c),u.sub(c),p.sub(f),g.sub(f);let L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(y.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(L),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(L),a[P].add(y),a[M].add(y),a[v].add(y),l[P].add(m),l[M].add(m),l[v].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let P=0,M=b.length;P<M;++P){let v=b[P],L=v.start,G=v.count;for(let X=L,Q=L+G;X<Q;X+=3)d(t.getX(X+0),t.getX(X+1),t.getX(X+2))}let S=new F,_=new F,C=new F,A=new F;function I(P){C.fromBufferAttribute(s,P),A.copy(C);let M=a[P];S.copy(M),S.sub(C.multiplyScalar(C.dot(M))).normalize(),_.crossVectors(A,M);let L=_.dot(l[P])<0?-1:1;o.setXYZW(P,S.x,S.y,S.z,L)}for(let P=0,M=b.length;P<M;++P){let v=b[P],L=v.start,G=v.count;for(let X=L,Q=L+G;X<Q;X+=3)I(t.getX(X+0)),I(t.getX(X+1)),I(t.getX(X+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ne(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);let s=new F,r=new F,o=new F,a=new F,l=new F,c=new F,h=new F,u=new F;if(t)for(let f=0,p=t.count;f<p;f+=3){let g=t.getX(f+0),y=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h),p=0,g=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?p=l[y]*a.data.stride+a.offset:p=l[y]*h;for(let d=0;d<h;d++)f[g++]=c[p++]}return new Ne(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,i);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let f=c[h],p=t(f,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zp=new fe,ts=new po,za=new us,Kp=new F,ka=new F,Va=new F,Ha=new F,ih=new F,Ga=new F,Jp=new F,Wa=new F,Yt=class extends Fe{constructor(t=new Me,e=new Hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Ga.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(ih.fromBufferAttribute(u,t),o?Ga.addScaledVector(ih,h):Ga.addScaledVector(ih.sub(e),h))}e.add(Ga)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),za.copy(i.boundingSphere),za.applyMatrix4(r),ts.copy(t.ray).recast(t.near),!(za.containsPoint(ts.origin)===!1&&(ts.intersectSphere(za,Kp)===null||ts.origin.distanceToSquared(Kp)>(t.far-t.near)**2))&&(Zp.copy(r).invert(),ts.copy(t.ray).applyMatrix4(Zp),!(i.boundingBox!==null&&ts.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ts)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],d=o[m.materialIndex],b=Math.max(m.start,p.start),S=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let _=b,C=S;_<C;_+=3){let A=a.getX(_),I=a.getX(_+1),P=a.getX(_+2);s=Xa(this,d,t,i,c,h,u,A,I,P),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let m=g,d=y;m<d;m+=3){let b=a.getX(m),S=a.getX(m+1),_=a.getX(m+2);s=Xa(this,o,t,i,c,h,u,b,S,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],d=o[m.materialIndex],b=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let _=b,C=S;_<C;_+=3){let A=_,I=_+1,P=_+2;s=Xa(this,d,t,i,c,h,u,A,I,P),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=g,d=y;m<d;m+=3){let b=m,S=m+1,_=m+2;s=Xa(this,o,t,i,c,h,u,b,S,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Vx(n,t,e,i,s,r,o,a){let l;if(t.side===je?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Oi,a),l===null)return null;Wa.copy(a),Wa.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Wa);return c<e.near||c>e.far?null:{distance:c,point:Wa.clone(),object:n}}function Xa(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,ka),n.getVertexPosition(l,Va),n.getVertexPosition(c,Ha);let h=Vx(n,t,e,i,ka,Va,Ha,Jp);if(h){let u=new F;oi.getBarycoord(Jp,ka,Va,Ha,u),s&&(h.uv=oi.getInterpolatedAttribute(s,a,l,c,u,new qt)),r&&(h.uv1=oi.getInterpolatedAttribute(r,a,l,c,u,new qt)),o&&(h.normal=oi.getInterpolatedAttribute(o,a,l,c,u,new F),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new F,materialIndex:0};oi.getNormal(ka,Va,Ha,f.normal),h.face=f,h.barycoord=u}return h}var Ye=class n extends Me{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],f=0,p=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new ge(c,3)),this.setAttribute("normal",new ge(h,3)),this.setAttribute("uv",new ge(u,2));function g(y,m,d,b,S,_,C,A,I,P,M){let v=_/I,L=C/P,G=_/2,X=C/2,Q=A/2,B=I+1,D=P+1,V=0,E=0,R=new F;for(let U=0;U<D;U++){let q=U*L-X;for(let nt=0;nt<B;nt++){let ct=nt*v-G;R[y]=ct*b,R[m]=q*S,R[d]=Q,c.push(R.x,R.y,R.z),R[y]=0,R[m]=0,R[d]=A>0?1:-1,h.push(R.x,R.y,R.z),u.push(nt/I),u.push(1-U/P),V+=1}}for(let U=0;U<P;U++)for(let q=0;q<I;q++){let nt=f+q+B*U,ct=f+q+B*(U+1),k=f+(q+1)+B*(U+1),$=f+(q+1)+B*U;l.push(nt,ct,$),l.push(ct,k,$),E+=6}a.addGroup(p,E,M),p+=E,f+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function _r(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function qe(n){let t={};for(let e=0;e<n.length;e++){let i=_r(n[e]);for(let s in i)t[s]=i[s]}return t}function Hx(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function jm(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}var Gx={clone:_r,merge:qe},Wx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Gn=class extends Vn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wx,this.fragmentShader=Xx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_r(t.uniforms),this.uniformsGroups=Hx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},Ml=class extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fe,this.projectionMatrix=new fe,this.projectionMatrixInverse=new fe,this.coordinateSystem=li}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Di=new F,Qp=new qt,jp=new qt,Le=class extends Ml{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=iu*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(dl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return iu*2*Math.atan(Math.tan(dl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Di.x,Di.y).multiplyScalar(-t/Di.z),Di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Di.x,Di.y).multiplyScalar(-t/Di.z)}getViewSize(t,e){return this.getViewBounds(t,Qp,jp),e.subVectors(jp,Qp)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(dl*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},nr=-90,ir=1,au=class extends Fe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Le(nr,ir,t,e);s.layers=this.layers,this.add(s);let r=new Le(nr,ir,t,e);r.layers=this.layers,this.add(r);let o=new Le(nr,ir,t,e);o.layers=this.layers,this.add(o);let a=new Le(nr,ir,t,e);a.layers=this.layers,this.add(a);let l=new Le(nr,ir,t,e);l.layers=this.layers,this.add(l);let c=new Le(nr,ir,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===li)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===pl)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=y,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Sl=class extends an{constructor(t,e,i,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:mr,super(t,e,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},lu=class extends di{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Sl(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:zn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ye(5,5,5),r=new Gn({name:"CubemapFromEquirect",uniforms:_r(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:je,blending:Ui});r.uniforms.tEquirect.value=e;let o=new Yt(s,r),a=e.minFilter;return e.minFilter===ls&&(e.minFilter=zn),new au(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},sh=new F,qx=new F,Yx=new Wt,ri=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=sh.subVectors(i,e).cross(qx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(sh),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Yx.getNormalMatrix(t),s=this.coplanarPoint(sh).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},es=new us,qa=new F,mo=class{constructor(t=new ri,e=new ri,i=new ri,s=new ri,r=new ri,o=new ri){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=li){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],p=s[8],g=s[9],y=s[10],m=s[11],d=s[12],b=s[13],S=s[14],_=s[15];if(i[0].setComponents(l-r,f-c,m-p,_-d).normalize(),i[1].setComponents(l+r,f+c,m+p,_+d).normalize(),i[2].setComponents(l+o,f+h,m+g,_+b).normalize(),i[3].setComponents(l-o,f-h,m-g,_-b).normalize(),i[4].setComponents(l-a,f-u,m-y,_-S).normalize(),e===li)i[5].setComponents(l+a,f+u,m+y,_+S).normalize();else if(e===pl)i[5].setComponents(a,u,y,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),es.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),es.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(es)}intersectsSprite(t){return es.center.set(0,0,0),es.radius=.7071067811865476,es.applyMatrix4(t.matrixWorld),this.intersectsSphere(es)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(qa.x=s.normal.x>0?t.max.x:t.min.x,qa.y=s.normal.y>0?t.max.y:t.min.y,qa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(qa)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function tg(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function $x(n){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){let g=u[f],y=u[p];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,u[f]=y)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){let y=u[p];n.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var bl=class n extends Me{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,u=t/a,f=e/l,p=[],g=[],y=[],m=[];for(let d=0;d<h;d++){let b=d*f-o;for(let S=0;S<c;S++){let _=S*u-r;g.push(_,-b,0),y.push(0,0,1),m.push(S/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let b=0;b<a;b++){let S=b+c*d,_=b+c*(d+1),C=b+1+c*(d+1),A=b+1+c*d;p.push(S,_,A),p.push(_,C,A)}this.setIndex(p),this.setAttribute("position",new ge(g,3)),this.setAttribute("normal",new ge(y,3)),this.setAttribute("uv",new ge(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},Zx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kx=`#ifdef USE_ALPHAHASH
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
#endif`,Jx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,t_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,e_=`#ifdef USE_AOMAP
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
#endif`,n_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,i_=`#ifdef USE_BATCHING
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
#endif`,s_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,r_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,o_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,a_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,l_=`#ifdef USE_IRIDESCENCE
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
#endif`,c_=`#ifdef USE_BUMPMAP
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
#endif`,h_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,u_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,d_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,f_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,p_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,m_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,g_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,y_=`#if defined( USE_COLOR_ALPHA )
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
#endif`,x_=`#define PI 3.141592653589793
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
} // validated`,__=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,v_=`vec3 transformedNormal = objectNormal;
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
#endif`,M_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,S_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,b_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,T_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,E_="gl_FragColor = linearToOutputTexel( gl_FragColor );",w_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,A_=`#ifdef USE_ENVMAP
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
#endif`,R_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,C_=`#ifdef USE_ENVMAP
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
#endif`,P_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,I_=`#ifdef USE_ENVMAP
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
#endif`,D_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,L_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,U_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,N_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,F_=`#ifdef USE_GRADIENTMAP
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
}`,O_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,B_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,z_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,k_=`uniform bool receiveShadow;
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
#endif`,V_=`#ifdef USE_ENVMAP
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
#endif`,H_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,G_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,W_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,X_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,q_=`PhysicalMaterial material;
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
#endif`,Y_=`struct PhysicalMaterial {
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
}`,$_=`
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
#endif`,Z_=`#if defined( RE_IndirectDiffuse )
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
#endif`,K_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,J_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Q_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,j_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ev=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,iv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sv=`#if defined( USE_POINTS_UV )
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
#endif`,rv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ov=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,av=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hv=`#ifdef USE_MORPHTARGETS
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
#endif`,uv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,fv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,pv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yv=`#ifdef USE_NORMALMAP
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
#endif`,xv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_v=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ev=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Av=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Iv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Lv=`float getShadowMask() {
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
}`,Uv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nv=`#ifdef USE_SKINNING
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
#endif`,Fv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ov=`#ifdef USE_SKINNING
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
#endif`,Bv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hv=`#ifdef USE_TRANSMISSION
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
#endif`,Gv=`#ifdef USE_TRANSMISSION
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
#endif`,Wv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,$v=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zv=`uniform sampler2D t2D;
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
}`,Kv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Qv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tM=`#include <common>
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
}`,eM=`#if DEPTH_PACKING == 3200
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
}`,nM=`#define DISTANCE
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
}`,iM=`#define DISTANCE
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
}`,sM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oM=`uniform float scale;
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
}`,aM=`uniform vec3 diffuse;
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
}`,lM=`#include <common>
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
}`,cM=`uniform vec3 diffuse;
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
}`,hM=`#define LAMBERT
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
}`,uM=`#define LAMBERT
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
}`,dM=`#define MATCAP
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
}`,fM=`#define MATCAP
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
}`,pM=`#define NORMAL
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
}`,mM=`#define NORMAL
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
}`,gM=`#define PHONG
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
}`,yM=`#define PHONG
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
}`,xM=`#define STANDARD
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
}`,_M=`#define STANDARD
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
}`,vM=`#define TOON
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
}`,MM=`#define TOON
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
}`,SM=`uniform float size;
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
}`,bM=`uniform vec3 diffuse;
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
}`,TM=`#include <common>
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
}`,EM=`uniform vec3 color;
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
}`,wM=`uniform float rotation;
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
}`,AM=`uniform vec3 diffuse;
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
}`,Xt={alphahash_fragment:Zx,alphahash_pars_fragment:Kx,alphamap_fragment:Jx,alphamap_pars_fragment:Qx,alphatest_fragment:jx,alphatest_pars_fragment:t_,aomap_fragment:e_,aomap_pars_fragment:n_,batching_pars_vertex:i_,batching_vertex:s_,begin_vertex:r_,beginnormal_vertex:o_,bsdfs:a_,iridescence_fragment:l_,bumpmap_pars_fragment:c_,clipping_planes_fragment:h_,clipping_planes_pars_fragment:u_,clipping_planes_pars_vertex:d_,clipping_planes_vertex:f_,color_fragment:p_,color_pars_fragment:m_,color_pars_vertex:g_,color_vertex:y_,common:x_,cube_uv_reflection_fragment:__,defaultnormal_vertex:v_,displacementmap_pars_vertex:M_,displacementmap_vertex:S_,emissivemap_fragment:b_,emissivemap_pars_fragment:T_,colorspace_fragment:E_,colorspace_pars_fragment:w_,envmap_fragment:A_,envmap_common_pars_fragment:R_,envmap_pars_fragment:C_,envmap_pars_vertex:P_,envmap_physical_pars_fragment:V_,envmap_vertex:I_,fog_vertex:D_,fog_pars_vertex:L_,fog_fragment:U_,fog_pars_fragment:N_,gradientmap_pars_fragment:F_,lightmap_pars_fragment:O_,lights_lambert_fragment:B_,lights_lambert_pars_fragment:z_,lights_pars_begin:k_,lights_toon_fragment:H_,lights_toon_pars_fragment:G_,lights_phong_fragment:W_,lights_phong_pars_fragment:X_,lights_physical_fragment:q_,lights_physical_pars_fragment:Y_,lights_fragment_begin:$_,lights_fragment_maps:Z_,lights_fragment_end:K_,logdepthbuf_fragment:J_,logdepthbuf_pars_fragment:Q_,logdepthbuf_pars_vertex:j_,logdepthbuf_vertex:tv,map_fragment:ev,map_pars_fragment:nv,map_particle_fragment:iv,map_particle_pars_fragment:sv,metalnessmap_fragment:rv,metalnessmap_pars_fragment:ov,morphinstance_vertex:av,morphcolor_vertex:lv,morphnormal_vertex:cv,morphtarget_pars_vertex:hv,morphtarget_vertex:uv,normal_fragment_begin:dv,normal_fragment_maps:fv,normal_pars_fragment:pv,normal_pars_vertex:mv,normal_vertex:gv,normalmap_pars_fragment:yv,clearcoat_normal_fragment_begin:xv,clearcoat_normal_fragment_maps:_v,clearcoat_pars_fragment:vv,iridescence_pars_fragment:Mv,opaque_fragment:Sv,packing:bv,premultiplied_alpha_fragment:Tv,project_vertex:Ev,dithering_fragment:wv,dithering_pars_fragment:Av,roughnessmap_fragment:Rv,roughnessmap_pars_fragment:Cv,shadowmap_pars_fragment:Pv,shadowmap_pars_vertex:Iv,shadowmap_vertex:Dv,shadowmask_pars_fragment:Lv,skinbase_vertex:Uv,skinning_pars_vertex:Nv,skinning_vertex:Fv,skinnormal_vertex:Ov,specularmap_fragment:Bv,specularmap_pars_fragment:zv,tonemapping_fragment:kv,tonemapping_pars_fragment:Vv,transmission_fragment:Hv,transmission_pars_fragment:Gv,uv_pars_fragment:Wv,uv_pars_vertex:Xv,uv_vertex:qv,worldpos_vertex:Yv,background_vert:$v,background_frag:Zv,backgroundCube_vert:Kv,backgroundCube_frag:Jv,cube_vert:Qv,cube_frag:jv,depth_vert:tM,depth_frag:eM,distanceRGBA_vert:nM,distanceRGBA_frag:iM,equirect_vert:sM,equirect_frag:rM,linedashed_vert:oM,linedashed_frag:aM,meshbasic_vert:lM,meshbasic_frag:cM,meshlambert_vert:hM,meshlambert_frag:uM,meshmatcap_vert:dM,meshmatcap_frag:fM,meshnormal_vert:pM,meshnormal_frag:mM,meshphong_vert:gM,meshphong_frag:yM,meshphysical_vert:xM,meshphysical_frag:_M,meshtoon_vert:vM,meshtoon_frag:MM,points_vert:SM,points_frag:bM,shadow_vert:TM,shadow_frag:EM,sprite_vert:wM,sprite_frag:AM},yt={common:{diffuse:{value:new $t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new $t(16777215)},opacity:{value:1},center:{value:new qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},On={basic:{uniforms:qe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:qe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new $t(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:qe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new $t(0)},specular:{value:new $t(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:qe([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new $t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:qe([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new $t(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:qe([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:qe([yt.points,yt.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:qe([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:qe([yt.common,yt.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:qe([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:qe([yt.sprite,yt.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:qe([yt.common,yt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:qe([yt.lights,yt.fog,{color:{value:new $t(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};On.physical={uniforms:qe([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new $t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new $t(0)},specularColor:{value:new $t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};var Ya={r:0,b:0,g:0},ns=new kn,RM=new fe;function CM(n,t,e,i,s,r,o){let a=new $t(0),l=r===!0?0:1,c,h,u=null,f=0,p=null;function g(b){let S=b.isScene===!0?b.background:null;return S&&S.isTexture&&(S=(b.backgroundBlurriness>0?e:t).get(S)),S}function y(b){let S=!1,_=g(b);_===null?d(a,l):_&&_.isColor&&(d(_,1),S=!0);let C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(b,S){let _=g(S);_&&(_.isCubeTexture||_.mapping===Fl)?(h===void 0&&(h=new Yt(new Ye(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:_r(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:je,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,A,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ns.copy(S.backgroundRotation),ns.x*=-1,ns.y*=-1,ns.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ns.y*=-1,ns.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(RM.makeRotationFromEuler(ns)),h.material.toneMapped=jt.getTransfer(_.colorSpace)!==se,(u!==_||f!==_.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=_,f=_.version,p=n.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Yt(new bl(2,2),new Gn({name:"BackgroundMaterial",uniforms:_r(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=jt.getTransfer(_.colorSpace)!==se,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||f!==_.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=_,f=_.version,p=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function d(b,S){b.getRGB(Ya,jm(n)),i.buffers.color.setClear(Ya.r,Ya.g,Ya.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(b,S=1){a.set(b),l=S,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,d(a,l)},render:y,addToRenderList:m}}function PM(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null),r=s,o=!1;function a(v,L,G,X,Q){let B=!1,D=u(X,G,L);r!==D&&(r=D,c(r.object)),B=p(v,X,G,Q),B&&g(v,X,G,Q),Q!==null&&t.update(Q,n.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,_(v,L,G,X),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Q).buffer))}function l(){return n.createVertexArray()}function c(v){return n.bindVertexArray(v)}function h(v){return n.deleteVertexArray(v)}function u(v,L,G){let X=G.wireframe===!0,Q=i[v.id];Q===void 0&&(Q={},i[v.id]=Q);let B=Q[L.id];B===void 0&&(B={},Q[L.id]=B);let D=B[X];return D===void 0&&(D=f(l()),B[X]=D),D}function f(v){let L=[],G=[],X=[];for(let Q=0;Q<e;Q++)L[Q]=0,G[Q]=0,X[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:G,attributeDivisors:X,object:v,attributes:{},index:null}}function p(v,L,G,X){let Q=r.attributes,B=L.attributes,D=0,V=G.getAttributes();for(let E in V)if(V[E].location>=0){let U=Q[E],q=B[E];if(q===void 0&&(E==="instanceMatrix"&&v.instanceMatrix&&(q=v.instanceMatrix),E==="instanceColor"&&v.instanceColor&&(q=v.instanceColor)),U===void 0||U.attribute!==q||q&&U.data!==q.data)return!0;D++}return r.attributesNum!==D||r.index!==X}function g(v,L,G,X){let Q={},B=L.attributes,D=0,V=G.getAttributes();for(let E in V)if(V[E].location>=0){let U=B[E];U===void 0&&(E==="instanceMatrix"&&v.instanceMatrix&&(U=v.instanceMatrix),E==="instanceColor"&&v.instanceColor&&(U=v.instanceColor));let q={};q.attribute=U,U&&U.data&&(q.data=U.data),Q[E]=q,D++}r.attributes=Q,r.attributesNum=D,r.index=X}function y(){let v=r.newAttributes;for(let L=0,G=v.length;L<G;L++)v[L]=0}function m(v){d(v,0)}function d(v,L){let G=r.newAttributes,X=r.enabledAttributes,Q=r.attributeDivisors;G[v]=1,X[v]===0&&(n.enableVertexAttribArray(v),X[v]=1),Q[v]!==L&&(n.vertexAttribDivisor(v,L),Q[v]=L)}function b(){let v=r.newAttributes,L=r.enabledAttributes;for(let G=0,X=L.length;G<X;G++)L[G]!==v[G]&&(n.disableVertexAttribArray(G),L[G]=0)}function S(v,L,G,X,Q,B,D){D===!0?n.vertexAttribIPointer(v,L,G,Q,B):n.vertexAttribPointer(v,L,G,X,Q,B)}function _(v,L,G,X){y();let Q=X.attributes,B=G.getAttributes(),D=L.defaultAttributeValues;for(let V in B){let E=B[V];if(E.location>=0){let R=Q[V];if(R===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(R=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(R=v.instanceColor)),R!==void 0){let U=R.normalized,q=R.itemSize,nt=t.get(R);if(nt===void 0)continue;let ct=nt.buffer,k=nt.type,$=nt.bytesPerElement,st=k===n.INT||k===n.UNSIGNED_INT||R.gpuType===Uu;if(R.isInterleavedBufferAttribute){let ot=R.data,Y=ot.stride,ft=R.offset;if(ot.isInstancedInterleavedBuffer){for(let mt=0;mt<E.locationSize;mt++)d(E.location+mt,ot.meshPerAttribute);v.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let mt=0;mt<E.locationSize;mt++)m(E.location+mt);n.bindBuffer(n.ARRAY_BUFFER,ct);for(let mt=0;mt<E.locationSize;mt++)S(E.location+mt,q/E.locationSize,k,U,Y*$,(ft+q/E.locationSize*mt)*$,st)}else{if(R.isInstancedBufferAttribute){for(let ot=0;ot<E.locationSize;ot++)d(E.location+ot,R.meshPerAttribute);v.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=R.meshPerAttribute*R.count)}else for(let ot=0;ot<E.locationSize;ot++)m(E.location+ot);n.bindBuffer(n.ARRAY_BUFFER,ct);for(let ot=0;ot<E.locationSize;ot++)S(E.location+ot,q/E.locationSize,k,U,q*$,q/E.locationSize*ot*$,st)}}else if(D!==void 0){let U=D[V];if(U!==void 0)switch(U.length){case 2:n.vertexAttrib2fv(E.location,U);break;case 3:n.vertexAttrib3fv(E.location,U);break;case 4:n.vertexAttrib4fv(E.location,U);break;default:n.vertexAttrib1fv(E.location,U)}}}}b()}function C(){P();for(let v in i){let L=i[v];for(let G in L){let X=L[G];for(let Q in X)h(X[Q].object),delete X[Q];delete L[G]}delete i[v]}}function A(v){if(i[v.id]===void 0)return;let L=i[v.id];for(let G in L){let X=L[G];for(let Q in X)h(X[Q].object),delete X[Q];delete L[G]}delete i[v.id]}function I(v){for(let L in i){let G=i[L];if(G[v.id]===void 0)continue;let X=G[v.id];for(let Q in X)h(X[Q].object),delete X[Q];delete G[v.id]}}function P(){M(),o=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:M,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:I,initAttributes:y,enableAttribute:m,disableUnusedAttributes:b}}function IM(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,i,1)}function l(c,h,u,f){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let g=0;for(let y=0;y<u;y++)g+=h[y]*f[y];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function DM(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let I=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(I){return!(I!==En&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let P=I===_o&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==ui&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==ai&&!P)}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:_,vertexTextures:C,maxSamples:A}}function LM(n){let t=this,e=null,i=0,s=!1,r=!1,o=new ri,a=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let p=u.length!==0||f||i!==0||s;return s=f,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,p){let g=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,d=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let b=r?0:i,S=b*4,_=d.clippingState||null;l.value=_,_=h(g,f,S,p);for(let C=0;C!==S;++C)_[C]=e[C];d.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,p,g){let y=u!==null?u.length:0,m=null;if(y!==0){if(m=l.value,g!==!0||m===null){let d=p+y*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<d)&&(m=new Float32Array(d));for(let S=0,_=p;S!==y;++S,_+=4)o.copy(u[S]).applyMatrix4(b,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}function UM(n){let t=new WeakMap;function e(o,a){return a===Eh?o.mapping=mr:a===wh&&(o.mapping=gr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Eh||a===wh)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new lu(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var Tl=class extends Ml{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},cr=4,tm=[.125,.215,.35,.446,.526,.582],os=20,rh=new Tl,em=new $t,oh=null,ah=0,lh=0,ch=!1,ss=(1+Math.sqrt(5))/2,sr=1/ss,nm=[new F(-ss,sr,0),new F(ss,sr,0),new F(-sr,0,ss),new F(sr,0,ss),new F(0,ss,-sr),new F(0,ss,sr),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],El=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){oh=this._renderer.getRenderTarget(),ah=this._renderer.getActiveCubeFace(),lh=this._renderer.getActiveMipmapLevel(),ch=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(oh,ah,lh),this._renderer.xr.enabled=ch,t.scissorTest=!1,$a(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===mr||t.mapping===gr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),oh=this._renderer.getRenderTarget(),ah=this._renderer.getActiveCubeFace(),lh=this._renderer.getActiveMipmapLevel(),ch=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:zn,minFilter:zn,generateMipmaps:!1,type:_o,format:En,colorSpace:Rr,depthBuffer:!1},s=im(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=im(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=NM(r)),this._blurMaterial=FM(r,t,e)}return s}_compileMaterial(t){let e=new Yt(this._lodPlanes[0],t);this._renderer.compile(e,rh)}_sceneToCubeUV(t,e,i,s){let a=new Le(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(em),h.toneMapping=Ni,h.autoClear=!1;let p=new Hn({name:"PMREM.Background",side:je,depthWrite:!1,depthTest:!1}),g=new Yt(new Ye,p),y=!1,m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,y=!0):(p.color.copy(em),y=!0);for(let d=0;d<6;d++){let b=d%3;b===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):b===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));let S=this._cubeSize;$a(s,b*S,d>2?S:0,S,S),h.setRenderTarget(s),y&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===mr||t.mapping===gr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=rm()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sm());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Yt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;$a(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,rh)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=nm[(s-r-1)%nm.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Yt(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*os-1),y=r/g,m=isFinite(r)?1+Math.floor(h*y):os;m>os&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${os}`);let d=[],b=0;for(let I=0;I<os;++I){let P=I/y,M=Math.exp(-P*P/2);d.push(M),I===0?b+=M:I<m&&(b+=2*M)}for(let I=0;I<d.length;I++)d[I]=d[I]/b;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-i;let _=this._sizeLods[s],C=3*_*(s>S-cr?s-S+cr:0),A=4*(this._cubeSize-_);$a(e,C,A,3*_,2*_),l.setRenderTarget(e),l.render(u,rh)}};function NM(n){let t=[],e=[],i=[],s=n,r=n-cr+1+tm.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>n-cr?l=tm[o-n+cr-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,y=3,m=2,d=1,b=new Float32Array(y*g*p),S=new Float32Array(m*g*p),_=new Float32Array(d*g*p);for(let A=0;A<p;A++){let I=A%3*2/3-1,P=A>2?0:-1,M=[I,P,0,I+2/3,P,0,I+2/3,P+1,0,I,P,0,I+2/3,P+1,0,I,P+1,0];b.set(M,y*g*A),S.set(f,m*g*A);let v=[A,A,A,A,A,A];_.set(v,d*g*A)}let C=new Me;C.setAttribute("position",new Ne(b,y)),C.setAttribute("uv",new Ne(S,m)),C.setAttribute("faceIndex",new Ne(_,d)),t.push(C),s>cr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function im(n,t,e){let i=new di(n,t,e);return i.texture.mapping=Fl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function $a(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function FM(n,t,e){let i=new Float32Array(os),s=new F(0,1,0);return new Gn({name:"SphericalGaussianBlur",defines:{n:os,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ku(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function sm(){return new Gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ku(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function rm(){return new Gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ku(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function ku(){return`

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
	`}function OM(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Eh||l===wh,h=l===mr||l===gr;if(c||h){let u=t.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new El(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let p=a.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new El(n)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function BM(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&co("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function zM(n,t,e,i){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);for(let g in f.morphAttributes){let y=f.morphAttributes[g];for(let m=0,d=y.length;m<d;m++)t.remove(y[m])}f.removeEventListener("dispose",o),delete s[f.id];let p=r.get(f);p&&(t.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(u){let f=u.attributes;for(let g in f)t.update(f[g],n.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let y=p[g];for(let m=0,d=y.length;m<d;m++)t.update(y[m],n.ARRAY_BUFFER)}}function c(u){let f=[],p=u.index,g=u.attributes.position,y=0;if(p!==null){let b=p.array;y=p.version;for(let S=0,_=b.length;S<_;S+=3){let C=b[S+0],A=b[S+1],I=b[S+2];f.push(C,A,A,I,I,C)}}else if(g!==void 0){let b=g.array;y=g.version;for(let S=0,_=b.length/3-1;S<_;S+=3){let C=S+0,A=S+1,I=S+2;f.push(C,A,A,I,I,C)}}else return;let m=new(Jm(f)?vl:_l)(f,1);m.version=y;let d=r.get(u);d&&t.remove(d),r.set(u,m)}function h(u){let f=r.get(u);if(f){let p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function kM(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,p){n.drawElements(i,p,r,f*o),e.update(p,i,1)}function c(f,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,f*o,g),e.update(p,i,g))}function h(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,i,1)}function u(f,p,g,y){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],y[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,y,0,g);let d=0;for(let b=0;b<g;b++)d+=p[b]*y[b];e.update(d,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function VM(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function HM(n,t,e){let i=new WeakMap,s=new oe;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=i.get(a);if(f===void 0||f.count!==u){let M=function(){I.dispose(),i.delete(a),a.removeEventListener("dispose",M)};f!==void 0&&f.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],S=0;p===!0&&(S=1),g===!0&&(S=2),y===!0&&(S=3);let _=a.attributes.position.count*S,C=1;_>t.maxTextureSize&&(C=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let A=new Float32Array(_*C*4*u),I=new yl(A,_,C,u);I.type=ai,I.needsUpdate=!0;let P=S*4;for(let v=0;v<u;v++){let L=m[v],G=d[v],X=b[v],Q=_*C*4*v;for(let B=0;B<L.count;B++){let D=B*P;p===!0&&(s.fromBufferAttribute(L,B),A[Q+D+0]=s.x,A[Q+D+1]=s.y,A[Q+D+2]=s.z,A[Q+D+3]=0),g===!0&&(s.fromBufferAttribute(G,B),A[Q+D+4]=s.x,A[Q+D+5]=s.y,A[Q+D+6]=s.z,A[Q+D+7]=0),y===!0&&(s.fromBufferAttribute(X,B),A[Q+D+8]=s.x,A[Q+D+9]=s.y,A[Q+D+10]=s.z,A[Q+D+11]=X.itemSize===4?s.w:1)}}f={count:u,texture:I,size:new qt(_,C)},i.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let p=0;for(let y=0;y<c.length;y++)p+=c[y];let g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function GM(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var wl=class extends an{constructor(t,e,i,s,r,o,a,l,c,h=ur){if(h!==ur&&h!==xr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===ur&&(i=cs),i===void 0&&h===xr&&(i=yr),super(null,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:wn,this.minFilter=l!==void 0?l:wn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},eg=new an,om=new wl(1,1),ng=new yl,ig=new ou,sg=new Sl,am=[],lm=[],cm=new Float32Array(16),hm=new Float32Array(9),um=new Float32Array(4);function Cr(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=am[s];if(r===void 0&&(r=new Float32Array(s),am[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Re(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ce(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Bl(n,t){let e=lm[t];e===void 0&&(e=new Int32Array(t),lm[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function WM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function XM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2fv(this.addr,t),Ce(e,t)}}function qM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;n.uniform3fv(this.addr,t),Ce(e,t)}}function YM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4fv(this.addr,t),Ce(e,t)}}function $M(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,i))return;um.set(i),n.uniformMatrix2fv(this.addr,!1,um),Ce(e,i)}}function ZM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,i))return;hm.set(i),n.uniformMatrix3fv(this.addr,!1,hm),Ce(e,i)}}function KM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,i))return;cm.set(i),n.uniformMatrix4fv(this.addr,!1,cm),Ce(e,i)}}function JM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function QM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2iv(this.addr,t),Ce(e,t)}}function jM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;n.uniform3iv(this.addr,t),Ce(e,t)}}function tS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4iv(this.addr,t),Ce(e,t)}}function eS(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function nS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2uiv(this.addr,t),Ce(e,t)}}function iS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;n.uniform3uiv(this.addr,t),Ce(e,t)}}function sS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4uiv(this.addr,t),Ce(e,t)}}function rS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(om.compareFunction=Km,r=om):r=eg,e.setTexture2D(t||r,s)}function oS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||ig,s)}function aS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||sg,s)}function lS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||ng,s)}function cS(n){switch(n){case 5126:return WM;case 35664:return XM;case 35665:return qM;case 35666:return YM;case 35674:return $M;case 35675:return ZM;case 35676:return KM;case 5124:case 35670:return JM;case 35667:case 35671:return QM;case 35668:case 35672:return jM;case 35669:case 35673:return tS;case 5125:return eS;case 36294:return nS;case 36295:return iS;case 36296:return sS;case 35678:case 36198:case 36298:case 36306:case 35682:return rS;case 35679:case 36299:case 36307:return oS;case 35680:case 36300:case 36308:case 36293:return aS;case 36289:case 36303:case 36311:case 36292:return lS}}function hS(n,t){n.uniform1fv(this.addr,t)}function uS(n,t){let e=Cr(t,this.size,2);n.uniform2fv(this.addr,e)}function dS(n,t){let e=Cr(t,this.size,3);n.uniform3fv(this.addr,e)}function fS(n,t){let e=Cr(t,this.size,4);n.uniform4fv(this.addr,e)}function pS(n,t){let e=Cr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function mS(n,t){let e=Cr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function gS(n,t){let e=Cr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function yS(n,t){n.uniform1iv(this.addr,t)}function xS(n,t){n.uniform2iv(this.addr,t)}function _S(n,t){n.uniform3iv(this.addr,t)}function vS(n,t){n.uniform4iv(this.addr,t)}function MS(n,t){n.uniform1uiv(this.addr,t)}function SS(n,t){n.uniform2uiv(this.addr,t)}function bS(n,t){n.uniform3uiv(this.addr,t)}function TS(n,t){n.uniform4uiv(this.addr,t)}function ES(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||eg,r[o])}function wS(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||ig,r[o])}function AS(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||sg,r[o])}function RS(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||ng,r[o])}function CS(n){switch(n){case 5126:return hS;case 35664:return uS;case 35665:return dS;case 35666:return fS;case 35674:return pS;case 35675:return mS;case 35676:return gS;case 5124:case 35670:return yS;case 35667:case 35671:return xS;case 35668:case 35672:return _S;case 35669:case 35673:return vS;case 5125:return MS;case 36294:return SS;case 36295:return bS;case 36296:return TS;case 35678:case 36198:case 36298:case 36306:case 35682:return ES;case 35679:case 36299:case 36307:return wS;case 35680:case 36300:case 36308:case 36293:return AS;case 36289:case 36303:case 36311:case 36292:return RS}}var cu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=cS(e.type)}},hu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=CS(e.type)}},uu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},hh=/(\w+)(\])?(\[|\.)?/g;function dm(n,t){n.seq.push(t),n.map[t.id]=t}function PS(n,t,e){let i=n.name,s=i.length;for(hh.lastIndex=0;;){let r=hh.exec(i),o=hh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){dm(e,c===void 0?new cu(a,n,t):new hu(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new uu(a),dm(e,u)),e=u}}}var fr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);PS(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function fm(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var IS=37297,DS=0;function LS(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var pm=new Wt;function US(n){jt._getMatrix(pm,jt.workingColorSpace,n);let t=`mat3( ${pm.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(n)){case Ol:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function mm(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+LS(n.getShaderSource(t),o)}else return s}function NS(n,t){let e=US(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function FS(n,t){let e;switch(t){case ax:e="Linear";break;case lx:e="Reinhard";break;case cx:e="Cineon";break;case hx:e="ACESFilmic";break;case dx:e="AgX";break;case fx:e="Neutral";break;case ux:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Za=new F;function OS(){jt.getLuminanceCoefficients(Za);let n=Za.x.toFixed(4),t=Za.y.toFixed(4),e=Za.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function BS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ho).join(`
`)}function zS(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function kS(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function ho(n){return n!==""}function gm(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ym(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var VS=/^[ \t]*#include +<([\w\d./]+)>/gm;function du(n){return n.replace(VS,GS)}var HS=new Map;function GS(n,t){let e=Xt[t];if(e===void 0){let i=HS.get(t);if(i!==void 0)e=Xt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return du(e)}var WS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xm(n){return n.replace(WS,XS)}function XS(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function _m(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function qS(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Fm?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===ky?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===si&&(t="SHADOWMAP_TYPE_VSM"),t}function YS(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case mr:case gr:t="ENVMAP_TYPE_CUBE";break;case Fl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function $S(n){let t="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===gr&&(t="ENVMAP_MODE_REFRACTION"),t}function ZS(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Om:t="ENVMAP_BLENDING_MULTIPLY";break;case rx:t="ENVMAP_BLENDING_MIX";break;case ox:t="ENVMAP_BLENDING_ADD";break}return t}function KS(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function JS(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=qS(e),c=YS(e),h=$S(e),u=ZS(e),f=KS(e),p=BS(e),g=zS(r),y=s.createProgram(),m,d,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ho).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ho).join(`
`),d.length>0&&(d+=`
`)):(m=[_m(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ho).join(`
`),d=[_m(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ni?"#define TONE_MAPPING":"",e.toneMapping!==Ni?Xt.tonemapping_pars_fragment:"",e.toneMapping!==Ni?FS("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,NS("linearToOutputTexel",e.outputColorSpace),OS(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ho).join(`
`)),o=du(o),o=gm(o,e),o=ym(o,e),a=du(a),a=gm(a,e),a=ym(a,e),o=xm(o),a=xm(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Lp?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Lp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let S=b+m+o,_=b+d+a,C=fm(s,s.VERTEX_SHADER,S),A=fm(s,s.FRAGMENT_SHADER,_);s.attachShader(y,C),s.attachShader(y,A),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function I(L){if(n.debug.checkShaderErrors){let G=s.getProgramInfoLog(y).trim(),X=s.getShaderInfoLog(C).trim(),Q=s.getShaderInfoLog(A).trim(),B=!0,D=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(B=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,y,C,A);else{let V=mm(s,C,"vertex"),E=mm(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+G+`
`+V+`
`+E)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(X===""||Q==="")&&(D=!1);D&&(L.diagnostics={runnable:B,programLog:G,vertexShader:{log:X,prefix:m},fragmentShader:{log:Q,prefix:d}})}s.deleteShader(C),s.deleteShader(A),P=new fr(s,y),M=kS(s,y)}let P;this.getUniforms=function(){return P===void 0&&I(this),P};let M;this.getAttributes=function(){return M===void 0&&I(this),M};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(y,IS)),v},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=DS++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=C,this.fragmentShader=A,this}var QS=0,fu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new pu(t),e.set(t,i)),i}},pu=class{constructor(t){this.id=QS++,this.code=t,this.usedTimes=0}};function jS(n,t,e,i,s,r,o){let a=new xl,l=new fu,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,v,L,G,X){let Q=G.fog,B=X.geometry,D=M.isMeshStandardMaterial?G.environment:null,V=(M.isMeshStandardMaterial?e:t).get(M.envMap||D),E=V&&V.mapping===Fl?V.image.height:null,R=g[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));let U=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,q=U!==void 0?U.length:0,nt=0;B.morphAttributes.position!==void 0&&(nt=1),B.morphAttributes.normal!==void 0&&(nt=2),B.morphAttributes.color!==void 0&&(nt=3);let ct,k,$,st;if(R){let kt=On[R];ct=kt.vertexShader,k=kt.fragmentShader}else ct=M.vertexShader,k=M.fragmentShader,l.update(M),$=l.getVertexShaderID(M),st=l.getFragmentShaderID(M);let ot=n.getRenderTarget(),Y=n.state.buffers.depth.getReversed(),ft=X.isInstancedMesh===!0,mt=X.isBatchedMesh===!0,Bt=!!M.map,Lt=!!M.matcap,Ot=!!V,N=!!M.aoMap,Kt=!!M.lightMap,At=!!M.bumpMap,It=!!M.normalMap,Z=!!M.displacementMap,bt=!!M.emissiveMap,at=!!M.metalnessMap,w=!!M.roughnessMap,x=M.anisotropy>0,O=M.clearcoat>0,et=M.dispersion>0,rt=M.iridescence>0,J=M.sheen>0,ht=M.transmission>0,K=x&&!!M.anisotropyMap,dt=O&&!!M.clearcoatMap,Nt=O&&!!M.clearcoatNormalMap,ut=O&&!!M.clearcoatRoughnessMap,vt=rt&&!!M.iridescenceMap,Et=rt&&!!M.iridescenceThicknessMap,Ft=J&&!!M.sheenColorMap,_t=J&&!!M.sheenRoughnessMap,Mt=!!M.specularMap,wt=!!M.specularColorMap,ee=!!M.specularIntensityMap,z=ht&&!!M.transmissionMap,gt=ht&&!!M.thicknessMap,it=!!M.gradientMap,lt=!!M.alphaMap,xt=M.alphaTest>0,St=!!M.alphaHash,zt=!!M.extensions,le=Ni;M.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(le=n.toneMapping);let Te={shaderID:R,shaderType:M.type,shaderName:M.name,vertexShader:ct,fragmentShader:k,defines:M.defines,customVertexShaderID:$,customFragmentShaderID:st,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:mt,batchingColor:mt&&X._colorsTexture!==null,instancing:ft,instancingColor:ft&&X.instanceColor!==null,instancingMorph:ft&&X.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ot===null?n.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Rr,alphaToCoverage:!!M.alphaToCoverage,map:Bt,matcap:Lt,envMap:Ot,envMapMode:Ot&&V.mapping,envMapCubeUVHeight:E,aoMap:N,lightMap:Kt,bumpMap:At,normalMap:It,displacementMap:f&&Z,emissiveMap:bt,normalMapObjectSpace:It&&M.normalMapType===yx,normalMapTangentSpace:It&&M.normalMapType===Zm,metalnessMap:at,roughnessMap:w,anisotropy:x,anisotropyMap:K,clearcoat:O,clearcoatMap:dt,clearcoatNormalMap:Nt,clearcoatRoughnessMap:ut,dispersion:et,iridescence:rt,iridescenceMap:vt,iridescenceThicknessMap:Et,sheen:J,sheenColorMap:Ft,sheenRoughnessMap:_t,specularMap:Mt,specularColorMap:wt,specularIntensityMap:ee,transmission:ht,transmissionMap:z,thicknessMap:gt,gradientMap:it,opaque:M.transparent===!1&&M.blending===hr&&M.alphaToCoverage===!1,alphaMap:lt,alphaTest:xt,alphaHash:St,combine:M.combine,mapUv:Bt&&y(M.map.channel),aoMapUv:N&&y(M.aoMap.channel),lightMapUv:Kt&&y(M.lightMap.channel),bumpMapUv:At&&y(M.bumpMap.channel),normalMapUv:It&&y(M.normalMap.channel),displacementMapUv:Z&&y(M.displacementMap.channel),emissiveMapUv:bt&&y(M.emissiveMap.channel),metalnessMapUv:at&&y(M.metalnessMap.channel),roughnessMapUv:w&&y(M.roughnessMap.channel),anisotropyMapUv:K&&y(M.anisotropyMap.channel),clearcoatMapUv:dt&&y(M.clearcoatMap.channel),clearcoatNormalMapUv:Nt&&y(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ut&&y(M.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&y(M.iridescenceMap.channel),iridescenceThicknessMapUv:Et&&y(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&y(M.sheenColorMap.channel),sheenRoughnessMapUv:_t&&y(M.sheenRoughnessMap.channel),specularMapUv:Mt&&y(M.specularMap.channel),specularColorMapUv:wt&&y(M.specularColorMap.channel),specularIntensityMapUv:ee&&y(M.specularIntensityMap.channel),transmissionMapUv:z&&y(M.transmissionMap.channel),thicknessMapUv:gt&&y(M.thicknessMap.channel),alphaMapUv:lt&&y(M.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(It||x),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!B.attributes.uv&&(Bt||lt),fog:!!Q,useFog:M.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Y,skinning:X.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:nt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:le,decodeVideoTexture:Bt&&M.map.isVideoTexture===!0&&jt.getTransfer(M.map.colorSpace)===se,decodeVideoTextureEmissive:bt&&M.emissiveMap.isVideoTexture===!0&&jt.getTransfer(M.emissiveMap.colorSpace)===se,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Tn,flipSided:M.side===je,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:zt&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(zt&&M.extensions.multiDraw===!0||mt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Te.vertexUv1s=c.has(1),Te.vertexUv2s=c.has(2),Te.vertexUv3s=c.has(3),c.clear(),Te}function d(M){let v=[];if(M.shaderID?v.push(M.shaderID):(v.push(M.customVertexShaderID),v.push(M.customFragmentShaderID)),M.defines!==void 0)for(let L in M.defines)v.push(L),v.push(M.defines[L]);return M.isRawShaderMaterial===!1&&(b(v,M),S(v,M),v.push(n.outputColorSpace)),v.push(M.customProgramCacheKey),v.join()}function b(M,v){M.push(v.precision),M.push(v.outputColorSpace),M.push(v.envMapMode),M.push(v.envMapCubeUVHeight),M.push(v.mapUv),M.push(v.alphaMapUv),M.push(v.lightMapUv),M.push(v.aoMapUv),M.push(v.bumpMapUv),M.push(v.normalMapUv),M.push(v.displacementMapUv),M.push(v.emissiveMapUv),M.push(v.metalnessMapUv),M.push(v.roughnessMapUv),M.push(v.anisotropyMapUv),M.push(v.clearcoatMapUv),M.push(v.clearcoatNormalMapUv),M.push(v.clearcoatRoughnessMapUv),M.push(v.iridescenceMapUv),M.push(v.iridescenceThicknessMapUv),M.push(v.sheenColorMapUv),M.push(v.sheenRoughnessMapUv),M.push(v.specularMapUv),M.push(v.specularColorMapUv),M.push(v.specularIntensityMapUv),M.push(v.transmissionMapUv),M.push(v.thicknessMapUv),M.push(v.combine),M.push(v.fogExp2),M.push(v.sizeAttenuation),M.push(v.morphTargetsCount),M.push(v.morphAttributeCount),M.push(v.numDirLights),M.push(v.numPointLights),M.push(v.numSpotLights),M.push(v.numSpotLightMaps),M.push(v.numHemiLights),M.push(v.numRectAreaLights),M.push(v.numDirLightShadows),M.push(v.numPointLightShadows),M.push(v.numSpotLightShadows),M.push(v.numSpotLightShadowsWithMaps),M.push(v.numLightProbes),M.push(v.shadowMapType),M.push(v.toneMapping),M.push(v.numClippingPlanes),M.push(v.numClipIntersection),M.push(v.depthPacking)}function S(M,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),M.push(a.mask)}function _(M){let v=g[M.type],L;if(v){let G=On[v];L=Gx.clone(G.uniforms)}else L=M.uniforms;return L}function C(M,v){let L;for(let G=0,X=h.length;G<X;G++){let Q=h[G];if(Q.cacheKey===v){L=Q,++L.usedTimes;break}}return L===void 0&&(L=new JS(n,v,M,r),h.push(L)),L}function A(M){if(--M.usedTimes===0){let v=h.indexOf(M);h[v]=h[h.length-1],h.pop(),M.destroy()}}function I(M){l.remove(M)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:_,acquireProgram:C,releaseProgram:A,releaseShaderCache:I,programs:h,dispose:P}}function tb(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function eb(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function vm(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Mm(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,f,p,g,y,m){let d=n[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:y,group:m},n[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=y,d.group=m),t++,d}function a(u,f,p,g,y,m){let d=o(u,f,p,g,y,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):e.push(d)}function l(u,f,p,g,y,m){let d=o(u,f,p,g,y,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function c(u,f){e.length>1&&e.sort(u||eb),i.length>1&&i.sort(f||vm),s.length>1&&s.sort(f||vm)}function h(){for(let u=t,f=n.length;u<f;u++){let p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function nb(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new Mm,n.set(i,[o])):s>=r.length?(o=new Mm,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function ib(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new $t};break;case"SpotLight":e={position:new F,direction:new F,color:new $t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new $t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new $t,groundColor:new $t};break;case"RectAreaLight":e={color:new $t,position:new F,halfWidth:new F,halfHeight:new F};break}return n[t.id]=e,e}}}function sb(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var rb=0;function ob(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function ab(n){let t=new ib,e=sb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);let s=new F,r=new fe,o=new fe;function a(c){let h=0,u=0,f=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let p=0,g=0,y=0,m=0,d=0,b=0,S=0,_=0,C=0,A=0,I=0;c.sort(ob);for(let M=0,v=c.length;M<v;M++){let L=c[M],G=L.color,X=L.intensity,Q=L.distance,B=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=G.r*X,u+=G.g*X,f+=G.b*X;else if(L.isLightProbe){for(let D=0;D<9;D++)i.probe[D].addScaledVector(L.sh.coefficients[D],X);I++}else if(L.isDirectionalLight){let D=t.get(L);if(D.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let V=L.shadow,E=e.get(L);E.shadowIntensity=V.intensity,E.shadowBias=V.bias,E.shadowNormalBias=V.normalBias,E.shadowRadius=V.radius,E.shadowMapSize=V.mapSize,i.directionalShadow[p]=E,i.directionalShadowMap[p]=B,i.directionalShadowMatrix[p]=L.shadow.matrix,b++}i.directional[p]=D,p++}else if(L.isSpotLight){let D=t.get(L);D.position.setFromMatrixPosition(L.matrixWorld),D.color.copy(G).multiplyScalar(X),D.distance=Q,D.coneCos=Math.cos(L.angle),D.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),D.decay=L.decay,i.spot[y]=D;let V=L.shadow;if(L.map&&(i.spotLightMap[C]=L.map,C++,V.updateMatrices(L),L.castShadow&&A++),i.spotLightMatrix[y]=V.matrix,L.castShadow){let E=e.get(L);E.shadowIntensity=V.intensity,E.shadowBias=V.bias,E.shadowNormalBias=V.normalBias,E.shadowRadius=V.radius,E.shadowMapSize=V.mapSize,i.spotShadow[y]=E,i.spotShadowMap[y]=B,_++}y++}else if(L.isRectAreaLight){let D=t.get(L);D.color.copy(G).multiplyScalar(X),D.halfWidth.set(L.width*.5,0,0),D.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=D,m++}else if(L.isPointLight){let D=t.get(L);if(D.color.copy(L.color).multiplyScalar(L.intensity),D.distance=L.distance,D.decay=L.decay,L.castShadow){let V=L.shadow,E=e.get(L);E.shadowIntensity=V.intensity,E.shadowBias=V.bias,E.shadowNormalBias=V.normalBias,E.shadowRadius=V.radius,E.shadowMapSize=V.mapSize,E.shadowCameraNear=V.camera.near,E.shadowCameraFar=V.camera.far,i.pointShadow[g]=E,i.pointShadowMap[g]=B,i.pointShadowMatrix[g]=L.shadow.matrix,S++}i.point[g]=D,g++}else if(L.isHemisphereLight){let D=t.get(L);D.skyColor.copy(L.color).multiplyScalar(X),D.groundColor.copy(L.groundColor).multiplyScalar(X),i.hemi[d]=D,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=yt.LTC_FLOAT_1,i.rectAreaLTC2=yt.LTC_FLOAT_2):(i.rectAreaLTC1=yt.LTC_HALF_1,i.rectAreaLTC2=yt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;let P=i.hash;(P.directionalLength!==p||P.pointLength!==g||P.spotLength!==y||P.rectAreaLength!==m||P.hemiLength!==d||P.numDirectionalShadows!==b||P.numPointShadows!==S||P.numSpotShadows!==_||P.numSpotMaps!==C||P.numLightProbes!==I)&&(i.directional.length=p,i.spot.length=y,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=_+C-A,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=I,P.directionalLength=p,P.pointLength=g,P.spotLength=y,P.rectAreaLength=m,P.hemiLength=d,P.numDirectionalShadows=b,P.numPointShadows=S,P.numSpotShadows=_,P.numSpotMaps=C,P.numLightProbes=I,i.version=rb++)}function l(c,h){let u=0,f=0,p=0,g=0,y=0,m=h.matrixWorldInverse;for(let d=0,b=c.length;d<b;d++){let S=c[d];if(S.isDirectionalLight){let _=i.directional[u];_.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(S.isSpotLight){let _=i.spot[p];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),p++}else if(S.isRectAreaLight){let _=i.rectArea[g];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(S.width*.5,0,0),_.halfHeight.set(0,S.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){let _=i.point[f];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){let _=i.hemi[y];_.direction.setFromMatrixPosition(S.matrixWorld),_.direction.transformDirection(m),y++}}}return{setup:a,setupView:l,state:i}}function Sm(n){let t=new ab(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function lb(n){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Sm(n),t.set(s,[a])):r>=o.length?(a=new Sm(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var mu=class extends Vn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=mx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},gu=class extends Vn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},cb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hb=`uniform sampler2D shadow_pass;
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
}`;function ub(n,t,e){let i=new mo,s=new qt,r=new qt,o=new oe,a=new mu({depthPacking:gx}),l=new gu,c={},h=e.maxTextureSize,u={[Oi]:je,[je]:Oi,[Tn]:Tn},f=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qt},radius:{value:4}},vertexShader:cb,fragmentShader:hb}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new Me;g.setAttribute("position",new Ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Yt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fm;let d=this.type;this.render=function(A,I,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;let M=n.getRenderTarget(),v=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),G=n.state;G.setBlending(Ui),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let X=d!==si&&this.type===si,Q=d===si&&this.type!==si;for(let B=0,D=A.length;B<D;B++){let V=A[B],E=V.shadow;if(E===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(E.autoUpdate===!1&&E.needsUpdate===!1)continue;s.copy(E.mapSize);let R=E.getFrameExtents();if(s.multiply(R),r.copy(E.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/R.x),s.x=r.x*R.x,E.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/R.y),s.y=r.y*R.y,E.mapSize.y=r.y)),E.map===null||X===!0||Q===!0){let q=this.type!==si?{minFilter:wn,magFilter:wn}:{};E.map!==null&&E.map.dispose(),E.map=new di(s.x,s.y,q),E.map.texture.name=V.name+".shadowMap",E.camera.updateProjectionMatrix()}n.setRenderTarget(E.map),n.clear();let U=E.getViewportCount();for(let q=0;q<U;q++){let nt=E.getViewport(q);o.set(r.x*nt.x,r.y*nt.y,r.x*nt.z,r.y*nt.w),G.viewport(o),E.updateMatrices(V,q),i=E.getFrustum(),_(I,P,E.camera,V,this.type)}E.isPointLightShadow!==!0&&this.type===si&&b(E,P),E.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(M,v,L)};function b(A,I){let P=t.update(y);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new di(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(I,null,P,f,y,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(I,null,P,p,y,null)}function S(A,I,P,M){let v=null,L=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)v=L;else if(v=P.isPointLight===!0?l:a,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){let G=v.uuid,X=I.uuid,Q=c[G];Q===void 0&&(Q={},c[G]=Q);let B=Q[X];B===void 0&&(B=v.clone(),Q[X]=B,I.addEventListener("dispose",C)),v=B}if(v.visible=I.visible,v.wireframe=I.wireframe,M===si?v.side=I.shadowSide!==null?I.shadowSide:I.side:v.side=I.shadowSide!==null?I.shadowSide:u[I.side],v.alphaMap=I.alphaMap,v.alphaTest=I.alphaTest,v.map=I.map,v.clipShadows=I.clipShadows,v.clippingPlanes=I.clippingPlanes,v.clipIntersection=I.clipIntersection,v.displacementMap=I.displacementMap,v.displacementScale=I.displacementScale,v.displacementBias=I.displacementBias,v.wireframeLinewidth=I.wireframeLinewidth,v.linewidth=I.linewidth,P.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let G=n.properties.get(v);G.light=P}return v}function _(A,I,P,M,v){if(A.visible===!1)return;if(A.layers.test(I.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&v===si)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);let X=t.update(A),Q=A.material;if(Array.isArray(Q)){let B=X.groups;for(let D=0,V=B.length;D<V;D++){let E=B[D],R=Q[E.materialIndex];if(R&&R.visible){let U=S(A,R,M,v);A.onBeforeShadow(n,A,I,P,X,U,E),n.renderBufferDirect(P,null,X,U,A,E),A.onAfterShadow(n,A,I,P,X,U,E)}}}else if(Q.visible){let B=S(A,Q,M,v);A.onBeforeShadow(n,A,I,P,X,B,null),n.renderBufferDirect(P,null,X,B,A,null),A.onAfterShadow(n,A,I,P,X,B,null)}}let G=A.children;for(let X=0,Q=G.length;X<Q;X++)_(G[X],I,P,M,v)}function C(A){A.target.removeEventListener("dispose",C);for(let P in c){let M=c[P],v=A.target.uuid;v in M&&(M[v].dispose(),delete M[v])}}}var db={[xh]:_h,[vh]:bh,[Mh]:Th,[pr]:Sh,[_h]:xh,[bh]:vh,[Th]:Mh,[Sh]:pr};function fb(n,t){function e(){let z=!1,gt=new oe,it=null,lt=new oe(0,0,0,0);return{setMask:function(xt){it!==xt&&!z&&(n.colorMask(xt,xt,xt,xt),it=xt)},setLocked:function(xt){z=xt},setClear:function(xt,St,zt,le,Te){Te===!0&&(xt*=le,St*=le,zt*=le),gt.set(xt,St,zt,le),lt.equals(gt)===!1&&(n.clearColor(xt,St,zt,le),lt.copy(gt))},reset:function(){z=!1,it=null,lt.set(-1,0,0,0)}}}function i(){let z=!1,gt=!1,it=null,lt=null,xt=null;return{setReversed:function(St){if(gt!==St){let zt=t.get("EXT_clip_control");gt?zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.ZERO_TO_ONE_EXT):zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.NEGATIVE_ONE_TO_ONE_EXT);let le=xt;xt=null,this.setClear(le)}gt=St},getReversed:function(){return gt},setTest:function(St){St?ot(n.DEPTH_TEST):Y(n.DEPTH_TEST)},setMask:function(St){it!==St&&!z&&(n.depthMask(St),it=St)},setFunc:function(St){if(gt&&(St=db[St]),lt!==St){switch(St){case xh:n.depthFunc(n.NEVER);break;case _h:n.depthFunc(n.ALWAYS);break;case vh:n.depthFunc(n.LESS);break;case pr:n.depthFunc(n.LEQUAL);break;case Mh:n.depthFunc(n.EQUAL);break;case Sh:n.depthFunc(n.GEQUAL);break;case bh:n.depthFunc(n.GREATER);break;case Th:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}lt=St}},setLocked:function(St){z=St},setClear:function(St){xt!==St&&(gt&&(St=1-St),n.clearDepth(St),xt=St)},reset:function(){z=!1,it=null,lt=null,xt=null,gt=!1}}}function s(){let z=!1,gt=null,it=null,lt=null,xt=null,St=null,zt=null,le=null,Te=null;return{setTest:function(kt){z||(kt?ot(n.STENCIL_TEST):Y(n.STENCIL_TEST))},setMask:function(kt){gt!==kt&&!z&&(n.stencilMask(kt),gt=kt)},setFunc:function(kt,_e,Ie){(it!==kt||lt!==_e||xt!==Ie)&&(n.stencilFunc(kt,_e,Ie),it=kt,lt=_e,xt=Ie)},setOp:function(kt,_e,Ie){(St!==kt||zt!==_e||le!==Ie)&&(n.stencilOp(kt,_e,Ie),St=kt,zt=_e,le=Ie)},setLocked:function(kt){z=kt},setClear:function(kt){Te!==kt&&(n.clearStencil(kt),Te=kt)},reset:function(){z=!1,gt=null,it=null,lt=null,xt=null,St=null,zt=null,le=null,Te=null}}}let r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap,h={},u={},f=new WeakMap,p=[],g=null,y=!1,m=null,d=null,b=null,S=null,_=null,C=null,A=null,I=new $t(0,0,0),P=0,M=!1,v=null,L=null,G=null,X=null,Q=null,B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),D=!1,V=0,E=n.getParameter(n.VERSION);E.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(E)[1]),D=V>=1):E.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(E)[1]),D=V>=2);let R=null,U={},q=n.getParameter(n.SCISSOR_BOX),nt=n.getParameter(n.VIEWPORT),ct=new oe().fromArray(q),k=new oe().fromArray(nt);function $(z,gt,it,lt){let xt=new Uint8Array(4),St=n.createTexture();n.bindTexture(z,St),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let zt=0;zt<it;zt++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(gt,0,n.RGBA,1,1,lt,0,n.RGBA,n.UNSIGNED_BYTE,xt):n.texImage2D(gt+zt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,xt);return St}let st={};st[n.TEXTURE_2D]=$(n.TEXTURE_2D,n.TEXTURE_2D,1),st[n.TEXTURE_CUBE_MAP]=$(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[n.TEXTURE_2D_ARRAY]=$(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),st[n.TEXTURE_3D]=$(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(n.DEPTH_TEST),o.setFunc(pr),At(!1),It(wp),ot(n.CULL_FACE),N(Ui);function ot(z){h[z]!==!0&&(n.enable(z),h[z]=!0)}function Y(z){h[z]!==!1&&(n.disable(z),h[z]=!1)}function ft(z,gt){return u[z]!==gt?(n.bindFramebuffer(z,gt),u[z]=gt,z===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=gt),z===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=gt),!0):!1}function mt(z,gt){let it=p,lt=!1;if(z){it=f.get(gt),it===void 0&&(it=[],f.set(gt,it));let xt=z.textures;if(it.length!==xt.length||it[0]!==n.COLOR_ATTACHMENT0){for(let St=0,zt=xt.length;St<zt;St++)it[St]=n.COLOR_ATTACHMENT0+St;it.length=xt.length,lt=!0}}else it[0]!==n.BACK&&(it[0]=n.BACK,lt=!0);lt&&n.drawBuffers(it)}function Bt(z){return g!==z?(n.useProgram(z),g=z,!0):!1}let Lt={[rs]:n.FUNC_ADD,[Hy]:n.FUNC_SUBTRACT,[Gy]:n.FUNC_REVERSE_SUBTRACT};Lt[Wy]=n.MIN,Lt[Xy]=n.MAX;let Ot={[qy]:n.ZERO,[Yy]:n.ONE,[$y]:n.SRC_COLOR,[gh]:n.SRC_ALPHA,[tx]:n.SRC_ALPHA_SATURATE,[Qy]:n.DST_COLOR,[Ky]:n.DST_ALPHA,[Zy]:n.ONE_MINUS_SRC_COLOR,[yh]:n.ONE_MINUS_SRC_ALPHA,[jy]:n.ONE_MINUS_DST_COLOR,[Jy]:n.ONE_MINUS_DST_ALPHA,[ex]:n.CONSTANT_COLOR,[nx]:n.ONE_MINUS_CONSTANT_COLOR,[ix]:n.CONSTANT_ALPHA,[sx]:n.ONE_MINUS_CONSTANT_ALPHA};function N(z,gt,it,lt,xt,St,zt,le,Te,kt){if(z===Ui){y===!0&&(Y(n.BLEND),y=!1);return}if(y===!1&&(ot(n.BLEND),y=!0),z!==Vy){if(z!==m||kt!==M){if((d!==rs||_!==rs)&&(n.blendEquation(n.FUNC_ADD),d=rs,_=rs),kt)switch(z){case hr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hi:n.blendFunc(n.ONE,n.ONE);break;case Ap:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Rp:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case hr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hi:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ap:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Rp:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}b=null,S=null,C=null,A=null,I.set(0,0,0),P=0,m=z,M=kt}return}xt=xt||gt,St=St||it,zt=zt||lt,(gt!==d||xt!==_)&&(n.blendEquationSeparate(Lt[gt],Lt[xt]),d=gt,_=xt),(it!==b||lt!==S||St!==C||zt!==A)&&(n.blendFuncSeparate(Ot[it],Ot[lt],Ot[St],Ot[zt]),b=it,S=lt,C=St,A=zt),(le.equals(I)===!1||Te!==P)&&(n.blendColor(le.r,le.g,le.b,Te),I.copy(le),P=Te),m=z,M=!1}function Kt(z,gt){z.side===Tn?Y(n.CULL_FACE):ot(n.CULL_FACE);let it=z.side===je;gt&&(it=!it),At(it),z.blending===hr&&z.transparent===!1?N(Ui):N(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);let lt=z.stencilWrite;a.setTest(lt),lt&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),bt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?ot(n.SAMPLE_ALPHA_TO_COVERAGE):Y(n.SAMPLE_ALPHA_TO_COVERAGE)}function At(z){v!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),v=z)}function It(z){z!==By?(ot(n.CULL_FACE),z!==L&&(z===wp?n.cullFace(n.BACK):z===zy?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Y(n.CULL_FACE),L=z}function Z(z){z!==G&&(D&&n.lineWidth(z),G=z)}function bt(z,gt,it){z?(ot(n.POLYGON_OFFSET_FILL),(X!==gt||Q!==it)&&(n.polygonOffset(gt,it),X=gt,Q=it)):Y(n.POLYGON_OFFSET_FILL)}function at(z){z?ot(n.SCISSOR_TEST):Y(n.SCISSOR_TEST)}function w(z){z===void 0&&(z=n.TEXTURE0+B-1),R!==z&&(n.activeTexture(z),R=z)}function x(z,gt,it){it===void 0&&(R===null?it=n.TEXTURE0+B-1:it=R);let lt=U[it];lt===void 0&&(lt={type:void 0,texture:void 0},U[it]=lt),(lt.type!==z||lt.texture!==gt)&&(R!==it&&(n.activeTexture(it),R=it),n.bindTexture(z,gt||st[z]),lt.type=z,lt.texture=gt)}function O(){let z=U[R];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function et(){try{n.compressedTexImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function rt(){try{n.compressedTexImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function J(){try{n.texSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ht(){try{n.texSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function K(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function dt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Nt(){try{n.texStorage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ut(){try{n.texStorage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function vt(){try{n.texImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Et(){try{n.texImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ft(z){ct.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),ct.copy(z))}function _t(z){k.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),k.copy(z))}function Mt(z,gt){let it=c.get(gt);it===void 0&&(it=new WeakMap,c.set(gt,it));let lt=it.get(z);lt===void 0&&(lt=n.getUniformBlockIndex(gt,z.name),it.set(z,lt))}function wt(z,gt){let lt=c.get(gt).get(z);l.get(gt)!==lt&&(n.uniformBlockBinding(gt,lt,z.__bindingPointIndex),l.set(gt,lt))}function ee(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},R=null,U={},u={},f=new WeakMap,p=[],g=null,y=!1,m=null,d=null,b=null,S=null,_=null,C=null,A=null,I=new $t(0,0,0),P=0,M=!1,v=null,L=null,G=null,X=null,Q=null,ct.set(0,0,n.canvas.width,n.canvas.height),k.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ot,disable:Y,bindFramebuffer:ft,drawBuffers:mt,useProgram:Bt,setBlending:N,setMaterial:Kt,setFlipSided:At,setCullFace:It,setLineWidth:Z,setPolygonOffset:bt,setScissorTest:at,activeTexture:w,bindTexture:x,unbindTexture:O,compressedTexImage2D:et,compressedTexImage3D:rt,texImage2D:vt,texImage3D:Et,updateUBOMapping:Mt,uniformBlockBinding:wt,texStorage2D:Nt,texStorage3D:ut,texSubImage2D:J,texSubImage3D:ht,compressedTexSubImage2D:K,compressedTexSubImage3D:dt,scissor:Ft,viewport:_t,reset:ee}}function bm(n,t,e,i){let s=pb(i);switch(e){case Hm:return n*t;case Wm:return n*t;case Xm:return n*t*2;case qm:return n*t/s.components*s.byteLength;case Ou:return n*t/s.components*s.byteLength;case Ym:return n*t*2/s.components*s.byteLength;case Bu:return n*t*2/s.components*s.byteLength;case Gm:return n*t*3/s.components*s.byteLength;case En:return n*t*4/s.components*s.byteLength;case zu:return n*t*4/s.components*s.byteLength;case al:case ll:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case cl:case hl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ph:case Dh:return Math.max(n,16)*Math.max(t,8)/4;case Ch:case Ih:return Math.max(n,8)*Math.max(t,8)/2;case Lh:case Uh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Nh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Fh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Oh:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Bh:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case zh:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case kh:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Vh:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Hh:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Gh:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Wh:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Xh:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case qh:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Yh:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case $h:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Zh:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case ul:case Kh:case Jh:return Math.ceil(n/4)*Math.ceil(t/4)*16;case $m:case Qh:return Math.ceil(n/4)*Math.ceil(t/4)*8;case jh:case tu:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function pb(n){switch(n){case ui:case zm:return{byteLength:1,components:1};case fo:case km:case _o:return{byteLength:2,components:1};case Nu:case Fu:return{byteLength:2,components:4};case cs:case Uu:case ai:return{byteLength:4,components:1};case Vm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function mb(n,t,e,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new qt,h=new WeakMap,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,x){return p?new OffscreenCanvas(w,x):ml("canvas")}function y(w,x,O){let et=1,rt=at(w);if((rt.width>O||rt.height>O)&&(et=O/Math.max(rt.width,rt.height)),et<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let J=Math.floor(et*rt.width),ht=Math.floor(et*rt.height);u===void 0&&(u=g(J,ht));let K=x?g(J,ht):u;return K.width=J,K.height=ht,K.getContext("2d").drawImage(w,0,0,J,ht),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+rt.width+"x"+rt.height+") to ("+J+"x"+ht+")."),K}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+rt.width+"x"+rt.height+")."),w;return w}function m(w){return w.generateMipmaps}function d(w){n.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(w,x,O,et,rt=!1){if(w!==null){if(n[w]!==void 0)return n[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let J=x;if(x===n.RED&&(O===n.FLOAT&&(J=n.R32F),O===n.HALF_FLOAT&&(J=n.R16F),O===n.UNSIGNED_BYTE&&(J=n.R8)),x===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(J=n.R8UI),O===n.UNSIGNED_SHORT&&(J=n.R16UI),O===n.UNSIGNED_INT&&(J=n.R32UI),O===n.BYTE&&(J=n.R8I),O===n.SHORT&&(J=n.R16I),O===n.INT&&(J=n.R32I)),x===n.RG&&(O===n.FLOAT&&(J=n.RG32F),O===n.HALF_FLOAT&&(J=n.RG16F),O===n.UNSIGNED_BYTE&&(J=n.RG8)),x===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(J=n.RG8UI),O===n.UNSIGNED_SHORT&&(J=n.RG16UI),O===n.UNSIGNED_INT&&(J=n.RG32UI),O===n.BYTE&&(J=n.RG8I),O===n.SHORT&&(J=n.RG16I),O===n.INT&&(J=n.RG32I)),x===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(J=n.RGB8UI),O===n.UNSIGNED_SHORT&&(J=n.RGB16UI),O===n.UNSIGNED_INT&&(J=n.RGB32UI),O===n.BYTE&&(J=n.RGB8I),O===n.SHORT&&(J=n.RGB16I),O===n.INT&&(J=n.RGB32I)),x===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),O===n.UNSIGNED_INT&&(J=n.RGBA32UI),O===n.BYTE&&(J=n.RGBA8I),O===n.SHORT&&(J=n.RGBA16I),O===n.INT&&(J=n.RGBA32I)),x===n.RGB&&O===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),x===n.RGBA){let ht=rt?Ol:jt.getTransfer(et);O===n.FLOAT&&(J=n.RGBA32F),O===n.HALF_FLOAT&&(J=n.RGBA16F),O===n.UNSIGNED_BYTE&&(J=ht===se?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function _(w,x){let O;return w?x===null||x===cs||x===yr?O=n.DEPTH24_STENCIL8:x===ai?O=n.DEPTH32F_STENCIL8:x===fo&&(O=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===cs||x===yr?O=n.DEPTH_COMPONENT24:x===ai?O=n.DEPTH_COMPONENT32F:x===fo&&(O=n.DEPTH_COMPONENT16),O}function C(w,x){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==wn&&w.minFilter!==zn?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function A(w){let x=w.target;x.removeEventListener("dispose",A),P(x),x.isVideoTexture&&h.delete(x)}function I(w){let x=w.target;x.removeEventListener("dispose",I),v(x)}function P(w){let x=i.get(w);if(x.__webglInit===void 0)return;let O=w.source,et=f.get(O);if(et){let rt=et[x.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&M(w),Object.keys(et).length===0&&f.delete(O)}i.remove(w)}function M(w){let x=i.get(w);n.deleteTexture(x.__webglTexture);let O=w.source,et=f.get(O);delete et[x.__cacheKey],o.memory.textures--}function v(w){let x=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let et=0;et<6;et++){if(Array.isArray(x.__webglFramebuffer[et]))for(let rt=0;rt<x.__webglFramebuffer[et].length;rt++)n.deleteFramebuffer(x.__webglFramebuffer[et][rt]);else n.deleteFramebuffer(x.__webglFramebuffer[et]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[et])}else{if(Array.isArray(x.__webglFramebuffer))for(let et=0;et<x.__webglFramebuffer.length;et++)n.deleteFramebuffer(x.__webglFramebuffer[et]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let et=0;et<x.__webglColorRenderbuffer.length;et++)x.__webglColorRenderbuffer[et]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[et]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let O=w.textures;for(let et=0,rt=O.length;et<rt;et++){let J=i.get(O[et]);J.__webglTexture&&(n.deleteTexture(J.__webglTexture),o.memory.textures--),i.remove(O[et])}i.remove(w)}let L=0;function G(){L=0}function X(){let w=L;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),L+=1,w}function Q(w){let x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function B(w,x){let O=i.get(w);if(w.isVideoTexture&&Z(w),w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){let et=w.image;if(et===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(et.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(O,w,x);return}}e.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+x)}function D(w,x){let O=i.get(w);if(w.version>0&&O.__version!==w.version){k(O,w,x);return}e.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+x)}function V(w,x){let O=i.get(w);if(w.version>0&&O.__version!==w.version){k(O,w,x);return}e.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+x)}function E(w,x){let O=i.get(w);if(w.version>0&&O.__version!==w.version){$(O,w,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+x)}let R={[Ah]:n.REPEAT,[as]:n.CLAMP_TO_EDGE,[Rh]:n.MIRRORED_REPEAT},U={[wn]:n.NEAREST,[px]:n.NEAREST_MIPMAP_NEAREST,[Ca]:n.NEAREST_MIPMAP_LINEAR,[zn]:n.LINEAR,[Fc]:n.LINEAR_MIPMAP_NEAREST,[ls]:n.LINEAR_MIPMAP_LINEAR},q={[xx]:n.NEVER,[Tx]:n.ALWAYS,[_x]:n.LESS,[Km]:n.LEQUAL,[vx]:n.EQUAL,[bx]:n.GEQUAL,[Mx]:n.GREATER,[Sx]:n.NOTEQUAL};function nt(w,x){if(x.type===ai&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===zn||x.magFilter===Fc||x.magFilter===Ca||x.magFilter===ls||x.minFilter===zn||x.minFilter===Fc||x.minFilter===Ca||x.minFilter===ls)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,R[x.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,R[x.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,R[x.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,U[x.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,U[x.minFilter]),x.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,q[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===wn||x.minFilter!==Ca&&x.minFilter!==ls||x.type===ai&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");n.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function ct(w,x){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",A));let et=x.source,rt=f.get(et);rt===void 0&&(rt={},f.set(et,rt));let J=Q(x);if(J!==w.__cacheKey){rt[J]===void 0&&(rt[J]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,O=!0),rt[J].usedTimes++;let ht=rt[w.__cacheKey];ht!==void 0&&(rt[w.__cacheKey].usedTimes--,ht.usedTimes===0&&M(x)),w.__cacheKey=J,w.__webglTexture=rt[J].texture}return O}function k(w,x,O){let et=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(et=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(et=n.TEXTURE_3D);let rt=ct(w,x),J=x.source;e.bindTexture(et,w.__webglTexture,n.TEXTURE0+O);let ht=i.get(J);if(J.version!==ht.__version||rt===!0){e.activeTexture(n.TEXTURE0+O);let K=jt.getPrimaries(jt.workingColorSpace),dt=x.colorSpace===Li?null:jt.getPrimaries(x.colorSpace),Nt=x.colorSpace===Li||K===dt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);let ut=y(x.image,!1,s.maxTextureSize);ut=bt(x,ut);let vt=r.convert(x.format,x.colorSpace),Et=r.convert(x.type),Ft=S(x.internalFormat,vt,Et,x.colorSpace,x.isVideoTexture);nt(et,x);let _t,Mt=x.mipmaps,wt=x.isVideoTexture!==!0,ee=ht.__version===void 0||rt===!0,z=J.dataReady,gt=C(x,ut);if(x.isDepthTexture)Ft=_(x.format===xr,x.type),ee&&(wt?e.texStorage2D(n.TEXTURE_2D,1,Ft,ut.width,ut.height):e.texImage2D(n.TEXTURE_2D,0,Ft,ut.width,ut.height,0,vt,Et,null));else if(x.isDataTexture)if(Mt.length>0){wt&&ee&&e.texStorage2D(n.TEXTURE_2D,gt,Ft,Mt[0].width,Mt[0].height);for(let it=0,lt=Mt.length;it<lt;it++)_t=Mt[it],wt?z&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,_t.width,_t.height,vt,Et,_t.data):e.texImage2D(n.TEXTURE_2D,it,Ft,_t.width,_t.height,0,vt,Et,_t.data);x.generateMipmaps=!1}else wt?(ee&&e.texStorage2D(n.TEXTURE_2D,gt,Ft,ut.width,ut.height),z&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ut.width,ut.height,vt,Et,ut.data)):e.texImage2D(n.TEXTURE_2D,0,Ft,ut.width,ut.height,0,vt,Et,ut.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){wt&&ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,Ft,Mt[0].width,Mt[0].height,ut.depth);for(let it=0,lt=Mt.length;it<lt;it++)if(_t=Mt[it],x.format!==En)if(vt!==null)if(wt){if(z)if(x.layerUpdates.size>0){let xt=bm(_t.width,_t.height,x.format,x.type);for(let St of x.layerUpdates){let zt=_t.data.subarray(St*xt/_t.data.BYTES_PER_ELEMENT,(St+1)*xt/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,St,_t.width,_t.height,1,vt,zt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,0,_t.width,_t.height,ut.depth,vt,_t.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,it,Ft,_t.width,_t.height,ut.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else wt?z&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,0,_t.width,_t.height,ut.depth,vt,Et,_t.data):e.texImage3D(n.TEXTURE_2D_ARRAY,it,Ft,_t.width,_t.height,ut.depth,0,vt,Et,_t.data)}else{wt&&ee&&e.texStorage2D(n.TEXTURE_2D,gt,Ft,Mt[0].width,Mt[0].height);for(let it=0,lt=Mt.length;it<lt;it++)_t=Mt[it],x.format!==En?vt!==null?wt?z&&e.compressedTexSubImage2D(n.TEXTURE_2D,it,0,0,_t.width,_t.height,vt,_t.data):e.compressedTexImage2D(n.TEXTURE_2D,it,Ft,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):wt?z&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,_t.width,_t.height,vt,Et,_t.data):e.texImage2D(n.TEXTURE_2D,it,Ft,_t.width,_t.height,0,vt,Et,_t.data)}else if(x.isDataArrayTexture)if(wt){if(ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,Ft,ut.width,ut.height,ut.depth),z)if(x.layerUpdates.size>0){let it=bm(ut.width,ut.height,x.format,x.type);for(let lt of x.layerUpdates){let xt=ut.data.subarray(lt*it/ut.data.BYTES_PER_ELEMENT,(lt+1)*it/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,lt,ut.width,ut.height,1,vt,Et,xt)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,vt,Et,ut.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ft,ut.width,ut.height,ut.depth,0,vt,Et,ut.data);else if(x.isData3DTexture)wt?(ee&&e.texStorage3D(n.TEXTURE_3D,gt,Ft,ut.width,ut.height,ut.depth),z&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,vt,Et,ut.data)):e.texImage3D(n.TEXTURE_3D,0,Ft,ut.width,ut.height,ut.depth,0,vt,Et,ut.data);else if(x.isFramebufferTexture){if(ee)if(wt)e.texStorage2D(n.TEXTURE_2D,gt,Ft,ut.width,ut.height);else{let it=ut.width,lt=ut.height;for(let xt=0;xt<gt;xt++)e.texImage2D(n.TEXTURE_2D,xt,Ft,it,lt,0,vt,Et,null),it>>=1,lt>>=1}}else if(Mt.length>0){if(wt&&ee){let it=at(Mt[0]);e.texStorage2D(n.TEXTURE_2D,gt,Ft,it.width,it.height)}for(let it=0,lt=Mt.length;it<lt;it++)_t=Mt[it],wt?z&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,vt,Et,_t):e.texImage2D(n.TEXTURE_2D,it,Ft,vt,Et,_t);x.generateMipmaps=!1}else if(wt){if(ee){let it=at(ut);e.texStorage2D(n.TEXTURE_2D,gt,Ft,it.width,it.height)}z&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,vt,Et,ut)}else e.texImage2D(n.TEXTURE_2D,0,Ft,vt,Et,ut);m(x)&&d(et),ht.__version=J.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function $(w,x,O){if(x.image.length!==6)return;let et=ct(w,x),rt=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+O);let J=i.get(rt);if(rt.version!==J.__version||et===!0){e.activeTexture(n.TEXTURE0+O);let ht=jt.getPrimaries(jt.workingColorSpace),K=x.colorSpace===Li?null:jt.getPrimaries(x.colorSpace),dt=x.colorSpace===Li||ht===K?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);let Nt=x.isCompressedTexture||x.image[0].isCompressedTexture,ut=x.image[0]&&x.image[0].isDataTexture,vt=[];for(let lt=0;lt<6;lt++)!Nt&&!ut?vt[lt]=y(x.image[lt],!0,s.maxCubemapSize):vt[lt]=ut?x.image[lt].image:x.image[lt],vt[lt]=bt(x,vt[lt]);let Et=vt[0],Ft=r.convert(x.format,x.colorSpace),_t=r.convert(x.type),Mt=S(x.internalFormat,Ft,_t,x.colorSpace),wt=x.isVideoTexture!==!0,ee=J.__version===void 0||et===!0,z=rt.dataReady,gt=C(x,Et);nt(n.TEXTURE_CUBE_MAP,x);let it;if(Nt){wt&&ee&&e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,Mt,Et.width,Et.height);for(let lt=0;lt<6;lt++){it=vt[lt].mipmaps;for(let xt=0;xt<it.length;xt++){let St=it[xt];x.format!==En?Ft!==null?wt?z&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt,0,0,St.width,St.height,Ft,St.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt,Mt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):wt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt,0,0,St.width,St.height,Ft,_t,St.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt,Mt,St.width,St.height,0,Ft,_t,St.data)}}}else{if(it=x.mipmaps,wt&&ee){it.length>0&&gt++;let lt=at(vt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,Mt,lt.width,lt.height)}for(let lt=0;lt<6;lt++)if(ut){wt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,vt[lt].width,vt[lt].height,Ft,_t,vt[lt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Mt,vt[lt].width,vt[lt].height,0,Ft,_t,vt[lt].data);for(let xt=0;xt<it.length;xt++){let zt=it[xt].image[lt].image;wt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt+1,0,0,zt.width,zt.height,Ft,_t,zt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt+1,Mt,zt.width,zt.height,0,Ft,_t,zt.data)}}else{wt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,Ft,_t,vt[lt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Mt,Ft,_t,vt[lt]);for(let xt=0;xt<it.length;xt++){let St=it[xt];wt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt+1,0,0,Ft,_t,St.image[lt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt+1,Mt,Ft,_t,St.image[lt])}}}m(x)&&d(n.TEXTURE_CUBE_MAP),J.__version=rt.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function st(w,x,O,et,rt,J){let ht=r.convert(O.format,O.colorSpace),K=r.convert(O.type),dt=S(O.internalFormat,ht,K,O.colorSpace),Nt=i.get(x),ut=i.get(O);if(ut.__renderTarget=x,!Nt.__hasExternalTextures){let vt=Math.max(1,x.width>>J),Et=Math.max(1,x.height>>J);rt===n.TEXTURE_3D||rt===n.TEXTURE_2D_ARRAY?e.texImage3D(rt,J,dt,vt,Et,x.depth,0,ht,K,null):e.texImage2D(rt,J,dt,vt,Et,0,ht,K,null)}e.bindFramebuffer(n.FRAMEBUFFER,w),It(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,et,rt,ut.__webglTexture,0,At(x)):(rt===n.TEXTURE_2D||rt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,et,rt,ut.__webglTexture,J),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ot(w,x,O){if(n.bindRenderbuffer(n.RENDERBUFFER,w),x.depthBuffer){let et=x.depthTexture,rt=et&&et.isDepthTexture?et.type:null,J=_(x.stencilBuffer,rt),ht=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=At(x);It(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,K,J,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,K,J,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,J,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ht,n.RENDERBUFFER,w)}else{let et=x.textures;for(let rt=0;rt<et.length;rt++){let J=et[rt],ht=r.convert(J.format,J.colorSpace),K=r.convert(J.type),dt=S(J.internalFormat,ht,K,J.colorSpace),Nt=At(x);O&&It(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Nt,dt,x.width,x.height):It(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Nt,dt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,dt,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Y(w,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let et=i.get(x.depthTexture);et.__renderTarget=x,(!et.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),B(x.depthTexture,0);let rt=et.__webglTexture,J=At(x);if(x.depthTexture.format===ur)It(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,rt,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,rt,0);else if(x.depthTexture.format===xr)It(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,rt,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,rt,0);else throw new Error("Unknown depthTexture format")}function ft(w){let x=i.get(w),O=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){let et=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),et){let rt=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,et.removeEventListener("dispose",rt)};et.addEventListener("dispose",rt),x.__depthDisposeCallback=rt}x.__boundDepthTexture=et}if(w.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Y(x.__webglFramebuffer,w)}else if(O){x.__webglDepthbuffer=[];for(let et=0;et<6;et++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[et]),x.__webglDepthbuffer[et]===void 0)x.__webglDepthbuffer[et]=n.createRenderbuffer(),ot(x.__webglDepthbuffer[et],w,!1);else{let rt=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=x.__webglDepthbuffer[et];n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,J)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),ot(x.__webglDepthbuffer,w,!1);else{let et=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,rt),n.framebufferRenderbuffer(n.FRAMEBUFFER,et,n.RENDERBUFFER,rt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function mt(w,x,O){let et=i.get(w);x!==void 0&&st(et.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&ft(w)}function Bt(w){let x=w.texture,O=i.get(w),et=i.get(x);w.addEventListener("dispose",I);let rt=w.textures,J=w.isWebGLCubeRenderTarget===!0,ht=rt.length>1;if(ht||(et.__webglTexture===void 0&&(et.__webglTexture=n.createTexture()),et.__version=x.version,o.memory.textures++),J){O.__webglFramebuffer=[];for(let K=0;K<6;K++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[K]=[];for(let dt=0;dt<x.mipmaps.length;dt++)O.__webglFramebuffer[K][dt]=n.createFramebuffer()}else O.__webglFramebuffer[K]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let K=0;K<x.mipmaps.length;K++)O.__webglFramebuffer[K]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(ht)for(let K=0,dt=rt.length;K<dt;K++){let Nt=i.get(rt[K]);Nt.__webglTexture===void 0&&(Nt.__webglTexture=n.createTexture(),o.memory.textures++)}if(w.samples>0&&It(w)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let K=0;K<rt.length;K++){let dt=rt[K];O.__webglColorRenderbuffer[K]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[K]);let Nt=r.convert(dt.format,dt.colorSpace),ut=r.convert(dt.type),vt=S(dt.internalFormat,Nt,ut,dt.colorSpace,w.isXRRenderTarget===!0),Et=At(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,Et,vt,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+K,n.RENDERBUFFER,O.__webglColorRenderbuffer[K])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),ot(O.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(J){e.bindTexture(n.TEXTURE_CUBE_MAP,et.__webglTexture),nt(n.TEXTURE_CUBE_MAP,x);for(let K=0;K<6;K++)if(x.mipmaps&&x.mipmaps.length>0)for(let dt=0;dt<x.mipmaps.length;dt++)st(O.__webglFramebuffer[K][dt],w,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt);else st(O.__webglFramebuffer[K],w,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);m(x)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ht){for(let K=0,dt=rt.length;K<dt;K++){let Nt=rt[K],ut=i.get(Nt);e.bindTexture(n.TEXTURE_2D,ut.__webglTexture),nt(n.TEXTURE_2D,Nt),st(O.__webglFramebuffer,w,Nt,n.COLOR_ATTACHMENT0+K,n.TEXTURE_2D,0),m(Nt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let K=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(K=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(K,et.__webglTexture),nt(K,x),x.mipmaps&&x.mipmaps.length>0)for(let dt=0;dt<x.mipmaps.length;dt++)st(O.__webglFramebuffer[dt],w,x,n.COLOR_ATTACHMENT0,K,dt);else st(O.__webglFramebuffer,w,x,n.COLOR_ATTACHMENT0,K,0);m(x)&&d(K),e.unbindTexture()}w.depthBuffer&&ft(w)}function Lt(w){let x=w.textures;for(let O=0,et=x.length;O<et;O++){let rt=x[O];if(m(rt)){let J=b(w),ht=i.get(rt).__webglTexture;e.bindTexture(J,ht),d(J),e.unbindTexture()}}}let Ot=[],N=[];function Kt(w){if(w.samples>0){if(It(w)===!1){let x=w.textures,O=w.width,et=w.height,rt=n.COLOR_BUFFER_BIT,J=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=i.get(w),K=x.length>1;if(K)for(let dt=0;dt<x.length;dt++)e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let dt=0;dt<x.length;dt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(rt|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(rt|=n.STENCIL_BUFFER_BIT)),K){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ht.__webglColorRenderbuffer[dt]);let Nt=i.get(x[dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Nt,0)}n.blitFramebuffer(0,0,O,et,0,0,O,et,rt,n.NEAREST),l===!0&&(Ot.length=0,N.length=0,Ot.push(n.COLOR_ATTACHMENT0+dt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Ot.push(J),N.push(J),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,N)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ot))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),K)for(let dt=0;dt<x.length;dt++){e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,ht.__webglColorRenderbuffer[dt]);let Nt=i.get(x[dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,Nt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let x=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function At(w){return Math.min(s.maxSamples,w.samples)}function It(w){let x=i.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Z(w){let x=o.render.frame;h.get(w)!==x&&(h.set(w,x),w.update())}function bt(w,x){let O=w.colorSpace,et=w.format,rt=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==Rr&&O!==Li&&(jt.getTransfer(O)===se?(et!==En||rt!==ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function at(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=G,this.setTexture2D=B,this.setTexture2DArray=D,this.setTexture3D=V,this.setTextureCube=E,this.rebindTextures=mt,this.setupRenderTarget=Bt,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=Kt,this.setupDepthRenderbuffer=ft,this.setupFrameBufferTexture=st,this.useMultisampledRTT=It}function gb(n,t){function e(i,s=Li){let r,o=jt.getTransfer(s);if(i===ui)return n.UNSIGNED_BYTE;if(i===Nu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Fu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Vm)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===zm)return n.BYTE;if(i===km)return n.SHORT;if(i===fo)return n.UNSIGNED_SHORT;if(i===Uu)return n.INT;if(i===cs)return n.UNSIGNED_INT;if(i===ai)return n.FLOAT;if(i===_o)return n.HALF_FLOAT;if(i===Hm)return n.ALPHA;if(i===Gm)return n.RGB;if(i===En)return n.RGBA;if(i===Wm)return n.LUMINANCE;if(i===Xm)return n.LUMINANCE_ALPHA;if(i===ur)return n.DEPTH_COMPONENT;if(i===xr)return n.DEPTH_STENCIL;if(i===qm)return n.RED;if(i===Ou)return n.RED_INTEGER;if(i===Ym)return n.RG;if(i===Bu)return n.RG_INTEGER;if(i===zu)return n.RGBA_INTEGER;if(i===al||i===ll||i===cl||i===hl)if(o===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===al)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ll)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===cl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===hl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===al)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ll)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===cl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===hl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ch||i===Ph||i===Ih||i===Dh)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ch)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ph)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ih)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Dh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Lh||i===Uh||i===Nh)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Lh||i===Uh)return o===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Nh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Fh||i===Oh||i===Bh||i===zh||i===kh||i===Vh||i===Hh||i===Gh||i===Wh||i===Xh||i===qh||i===Yh||i===$h||i===Zh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Fh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Oh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Bh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===zh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===kh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Vh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Hh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Gh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Wh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Xh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===qh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Yh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===$h)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Zh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ul||i===Kh||i===Jh)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===ul)return o===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Kh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Jh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===$m||i===Qh||i===jh||i===tu)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===ul)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Qh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===jh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===tu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===yr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var yu=class extends Le{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Ue=class extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}},yb={type:"move"},uo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ue,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ue,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ue,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let y of t.hand.values()){let m=e.getJointPose(y,i),d=this._getHandJoint(c,y);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(yb)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Ue;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},xb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_b=`
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

}`,xu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new an,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Gn({vertexShader:xb,fragmentShader:_b,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Yt(new bl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},_u=class extends Bi{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,g=null,y=new xu,m=e.getContextAttributes(),d=null,b=null,S=[],_=[],C=new qt,A=null,I=new Le;I.viewport=new oe;let P=new Le;P.viewport=new oe;let M=[I,P],v=new yu,L=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let $=S[k];return $===void 0&&($=new uo,S[k]=$),$.getTargetRaySpace()},this.getControllerGrip=function(k){let $=S[k];return $===void 0&&($=new uo,S[k]=$),$.getGripSpace()},this.getHand=function(k){let $=S[k];return $===void 0&&($=new uo,S[k]=$),$.getHandSpace()};function X(k){let $=_.indexOf(k.inputSource);if($===-1)return;let st=S[$];st!==void 0&&(st.update(k.inputSource,k.frame,c||o),st.dispatchEvent({type:k.type,data:k.inputSource}))}function Q(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",Q),s.removeEventListener("inputsourceschange",B);for(let k=0;k<S.length;k++){let $=_[k];$!==null&&(_[k]=null,S[k].disconnect($))}L=null,G=null,y.reset(),t.setRenderTarget(d),p=null,f=null,u=null,s=null,b=null,ct.stop(),i.isPresenting=!1,t.setPixelRatio(A),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){a=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(k){if(s=k,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",Q),s.addEventListener("inputsourceschange",B),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(C),s.renderState.layers===void 0){let $={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,$),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new di(p.framebufferWidth,p.framebufferHeight,{format:En,type:ui,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let $=null,st=null,ot=null;m.depth&&(ot=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,$=m.stencil?xr:ur,st=m.stencil?yr:cs);let Y={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(Y),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),b=new di(f.textureWidth,f.textureHeight,{format:En,type:ui,depthTexture:new wl(f.textureWidth,f.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ct.setContext(s),ct.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function B(k){for(let $=0;$<k.removed.length;$++){let st=k.removed[$],ot=_.indexOf(st);ot>=0&&(_[ot]=null,S[ot].disconnect(st))}for(let $=0;$<k.added.length;$++){let st=k.added[$],ot=_.indexOf(st);if(ot===-1){for(let ft=0;ft<S.length;ft++)if(ft>=_.length){_.push(st),ot=ft;break}else if(_[ft]===null){_[ft]=st,ot=ft;break}if(ot===-1)break}let Y=S[ot];Y&&Y.connect(st)}}let D=new F,V=new F;function E(k,$,st){D.setFromMatrixPosition($.matrixWorld),V.setFromMatrixPosition(st.matrixWorld);let ot=D.distanceTo(V),Y=$.projectionMatrix.elements,ft=st.projectionMatrix.elements,mt=Y[14]/(Y[10]-1),Bt=Y[14]/(Y[10]+1),Lt=(Y[9]+1)/Y[5],Ot=(Y[9]-1)/Y[5],N=(Y[8]-1)/Y[0],Kt=(ft[8]+1)/ft[0],At=mt*N,It=mt*Kt,Z=ot/(-N+Kt),bt=Z*-N;if($.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(bt),k.translateZ(Z),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),Y[10]===-1)k.projectionMatrix.copy($.projectionMatrix),k.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let at=mt+Z,w=Bt+Z,x=At-bt,O=It+(ot-bt),et=Lt*Bt/w*at,rt=Ot*Bt/w*at;k.projectionMatrix.makePerspective(x,O,et,rt,at,w),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function R(k,$){$===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices($.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(s===null)return;let $=k.near,st=k.far;y.texture!==null&&(y.depthNear>0&&($=y.depthNear),y.depthFar>0&&(st=y.depthFar)),v.near=P.near=I.near=$,v.far=P.far=I.far=st,(L!==v.near||G!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),L=v.near,G=v.far),I.layers.mask=k.layers.mask|2,P.layers.mask=k.layers.mask|4,v.layers.mask=I.layers.mask|P.layers.mask;let ot=k.parent,Y=v.cameras;R(v,ot);for(let ft=0;ft<Y.length;ft++)R(Y[ft],ot);Y.length===2?E(v,I,P):v.projectionMatrix.copy(I.projectionMatrix),U(k,v,ot)};function U(k,$,st){st===null?k.matrix.copy($.matrixWorld):(k.matrix.copy(st.matrixWorld),k.matrix.invert(),k.matrix.multiply($.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy($.projectionMatrix),k.projectionMatrixInverse.copy($.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=iu*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(k){l=k,f!==null&&(f.fixedFoveation=k),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=k)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(v)};let q=null;function nt(k,$){if(h=$.getViewerPose(c||o),g=$,h!==null){let st=h.views;p!==null&&(t.setRenderTargetFramebuffer(b,p.framebuffer),t.setRenderTarget(b));let ot=!1;st.length!==v.cameras.length&&(v.cameras.length=0,ot=!0);for(let ft=0;ft<st.length;ft++){let mt=st[ft],Bt=null;if(p!==null)Bt=p.getViewport(mt);else{let Ot=u.getViewSubImage(f,mt);Bt=Ot.viewport,ft===0&&(t.setRenderTargetTextures(b,Ot.colorTexture,f.ignoreDepthValues?void 0:Ot.depthStencilTexture),t.setRenderTarget(b))}let Lt=M[ft];Lt===void 0&&(Lt=new Le,Lt.layers.enable(ft),Lt.viewport=new oe,M[ft]=Lt),Lt.matrix.fromArray(mt.transform.matrix),Lt.matrix.decompose(Lt.position,Lt.quaternion,Lt.scale),Lt.projectionMatrix.fromArray(mt.projectionMatrix),Lt.projectionMatrixInverse.copy(Lt.projectionMatrix).invert(),Lt.viewport.set(Bt.x,Bt.y,Bt.width,Bt.height),ft===0&&(v.matrix.copy(Lt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ot===!0&&v.cameras.push(Lt)}let Y=s.enabledFeatures;if(Y&&Y.includes("depth-sensing")){let ft=u.getDepthInformation(st[0]);ft&&ft.isValid&&ft.texture&&y.init(t,ft,s.renderState)}}for(let st=0;st<S.length;st++){let ot=_[st],Y=S[st];ot!==null&&Y!==void 0&&Y.update(ot,$,c||o)}q&&q(k,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),g=null}let ct=new tg;ct.setAnimationLoop(nt),this.setAnimationLoop=function(k){q=k},this.dispose=function(){}}},is=new kn,vb=new fe;function Mb(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,jm(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,b,S,_){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,_)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),y(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,b,S):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===je&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===je&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let b=t.get(d),S=b.envMap,_=b.envMapRotation;S&&(m.envMap.value=S,is.copy(_),is.x*=-1,is.y*=-1,is.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(is.y*=-1,is.z*=-1),m.envMapRotation.value.setFromMatrix4(vb.makeRotationFromEuler(is)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,b,S){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*b,m.scale.value=S*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,b){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===je&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function y(m,d){let b=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Sb(n,t,e,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){let _=S.program;i.uniformBlockBinding(b,_)}function c(b,S){let _=s[b.id];_===void 0&&(g(b),_=h(b),s[b.id]=_,b.addEventListener("dispose",m));let C=S.program;i.updateUBOMapping(b,C);let A=t.render.frame;r[b.id]!==A&&(f(b),r[b.id]=A)}function h(b){let S=u();b.__bindingPointIndex=S;let _=n.createBuffer(),C=b.__size,A=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,C,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,_),_}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){let S=s[b.id],_=b.uniforms,C=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let A=0,I=_.length;A<I;A++){let P=Array.isArray(_[A])?_[A]:[_[A]];for(let M=0,v=P.length;M<v;M++){let L=P[M];if(p(L,A,M,C)===!0){let G=L.__offset,X=Array.isArray(L.value)?L.value:[L.value],Q=0;for(let B=0;B<X.length;B++){let D=X[B],V=y(D);typeof D=="number"||typeof D=="boolean"?(L.__data[0]=D,n.bufferSubData(n.UNIFORM_BUFFER,G+Q,L.__data)):D.isMatrix3?(L.__data[0]=D.elements[0],L.__data[1]=D.elements[1],L.__data[2]=D.elements[2],L.__data[3]=0,L.__data[4]=D.elements[3],L.__data[5]=D.elements[4],L.__data[6]=D.elements[5],L.__data[7]=0,L.__data[8]=D.elements[6],L.__data[9]=D.elements[7],L.__data[10]=D.elements[8],L.__data[11]=0):(D.toArray(L.__data,Q),Q+=V.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,G,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(b,S,_,C){let A=b.value,I=S+"_"+_;if(C[I]===void 0)return typeof A=="number"||typeof A=="boolean"?C[I]=A:C[I]=A.clone(),!0;{let P=C[I];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return C[I]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function g(b){let S=b.uniforms,_=0,C=16;for(let I=0,P=S.length;I<P;I++){let M=Array.isArray(S[I])?S[I]:[S[I]];for(let v=0,L=M.length;v<L;v++){let G=M[v],X=Array.isArray(G.value)?G.value:[G.value];for(let Q=0,B=X.length;Q<B;Q++){let D=X[Q],V=y(D),E=_%C,R=E%V.boundary,U=E+R;_+=R,U!==0&&C-U<V.storage&&(_+=C-U),G.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=_,_+=V.storage}}}let A=_%C;return A>0&&(_+=C-A),b.__size=_,b.__cache={},this}function y(b){let S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){let S=b.target;S.removeEventListener("dispose",m);let _=o.indexOf(S.__bindingPointIndex);o.splice(_,1),n.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function d(){for(let b in s)n.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}var vr=class{constructor(t={}){let{canvas:e=wx(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),y=new Int32Array(4),m=null,d=null,b=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=fn,this.toneMapping=Ni,this.toneMappingExposure=1;let _=this,C=!1,A=0,I=0,P=null,M=-1,v=null,L=new oe,G=new oe,X=null,Q=new $t(0),B=0,D=e.width,V=e.height,E=1,R=null,U=null,q=new oe(0,0,D,V),nt=new oe(0,0,D,V),ct=!1,k=new mo,$=!1,st=!1,ot=new fe,Y=new fe,ft=new F,mt=new oe,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Lt=!1;function Ot(){return P===null?E:1}let N=i;function Kt(T,H){return e.getContext(T,H)}try{let T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",lt,!1),e.addEventListener("webglcontextrestored",xt,!1),e.addEventListener("webglcontextcreationerror",St,!1),N===null){let H="webgl2";if(N=Kt(H,T),N===null)throw Kt(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let At,It,Z,bt,at,w,x,O,et,rt,J,ht,K,dt,Nt,ut,vt,Et,Ft,_t,Mt,wt,ee,z;function gt(){At=new BM(N),At.init(),wt=new gb(N,At),It=new DM(N,At,t,wt),Z=new fb(N,At),It.reverseDepthBuffer&&f&&Z.buffers.depth.setReversed(!0),bt=new VM(N),at=new tb,w=new mb(N,At,Z,at,It,wt,bt),x=new UM(_),O=new OM(_),et=new $x(N),ee=new PM(N,et),rt=new zM(N,et,bt,ee),J=new GM(N,rt,et,bt),Ft=new HM(N,It,w),ut=new LM(at),ht=new jS(_,x,O,At,It,ee,ut),K=new Mb(_,at),dt=new nb,Nt=new lb(At),Et=new CM(_,x,O,Z,J,p,l),vt=new ub(_,J,It),z=new Sb(N,bt,It,Z),_t=new IM(N,At,bt),Mt=new kM(N,At,bt),bt.programs=ht.programs,_.capabilities=It,_.extensions=At,_.properties=at,_.renderLists=dt,_.shadowMap=vt,_.state=Z,_.info=bt}gt();let it=new _u(_,N);this.xr=it,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let T=At.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=At.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return E},this.setPixelRatio=function(T){T!==void 0&&(E=T,this.setSize(D,V,!1))},this.getSize=function(T){return T.set(D,V)},this.setSize=function(T,H,j=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=T,V=H,e.width=Math.floor(T*E),e.height=Math.floor(H*E),j===!0&&(e.style.width=T+"px",e.style.height=H+"px"),this.setViewport(0,0,T,H)},this.getDrawingBufferSize=function(T){return T.set(D*E,V*E).floor()},this.setDrawingBufferSize=function(T,H,j){D=T,V=H,E=j,e.width=Math.floor(T*j),e.height=Math.floor(H*j),this.setViewport(0,0,T,H)},this.getCurrentViewport=function(T){return T.copy(L)},this.getViewport=function(T){return T.copy(q)},this.setViewport=function(T,H,j,tt){T.isVector4?q.set(T.x,T.y,T.z,T.w):q.set(T,H,j,tt),Z.viewport(L.copy(q).multiplyScalar(E).round())},this.getScissor=function(T){return T.copy(nt)},this.setScissor=function(T,H,j,tt){T.isVector4?nt.set(T.x,T.y,T.z,T.w):nt.set(T,H,j,tt),Z.scissor(G.copy(nt).multiplyScalar(E).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(T){Z.setScissorTest(ct=T)},this.setOpaqueSort=function(T){R=T},this.setTransparentSort=function(T){U=T},this.getClearColor=function(T){return T.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor.apply(Et,arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha.apply(Et,arguments)},this.clear=function(T=!0,H=!0,j=!0){let tt=0;if(T){let W=!1;if(P!==null){let pt=P.texture.format;W=pt===zu||pt===Bu||pt===Ou}if(W){let pt=P.texture.type,Tt=pt===ui||pt===cs||pt===fo||pt===yr||pt===Nu||pt===Fu,Rt=Et.getClearColor(),Ct=Et.getClearAlpha(),Vt=Rt.r,Gt=Rt.g,Pt=Rt.b;Tt?(g[0]=Vt,g[1]=Gt,g[2]=Pt,g[3]=Ct,N.clearBufferuiv(N.COLOR,0,g)):(y[0]=Vt,y[1]=Gt,y[2]=Pt,y[3]=Ct,N.clearBufferiv(N.COLOR,0,y))}else tt|=N.COLOR_BUFFER_BIT}H&&(tt|=N.DEPTH_BUFFER_BIT),j&&(tt|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(tt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",lt,!1),e.removeEventListener("webglcontextrestored",xt,!1),e.removeEventListener("webglcontextcreationerror",St,!1),dt.dispose(),Nt.dispose(),at.dispose(),x.dispose(),O.dispose(),J.dispose(),ee.dispose(),z.dispose(),ht.dispose(),it.dispose(),it.removeEventListener("sessionstart",Yn),it.removeEventListener("sessionend",Be),nn.stop()};function lt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function xt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let T=bt.autoReset,H=vt.enabled,j=vt.autoUpdate,tt=vt.needsUpdate,W=vt.type;gt(),bt.autoReset=T,vt.enabled=H,vt.autoUpdate=j,vt.needsUpdate=tt,vt.type=W}function St(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function zt(T){let H=T.target;H.removeEventListener("dispose",zt),le(H)}function le(T){Te(T),at.remove(T)}function Te(T){let H=at.get(T).programs;H!==void 0&&(H.forEach(function(j){ht.releaseProgram(j)}),T.isShaderMaterial&&ht.releaseShaderCache(T))}this.renderBufferDirect=function(T,H,j,tt,W,pt){H===null&&(H=Bt);let Tt=W.isMesh&&W.matrixWorld.determinant()<0,Rt=jg(T,H,j,tt,W);Z.setMaterial(tt,Tt);let Ct=j.index,Vt=1;if(tt.wireframe===!0){if(Ct=rt.getWireframeAttribute(j),Ct===void 0)return;Vt=2}let Gt=j.drawRange,Pt=j.attributes.position,te=Gt.start*Vt,ce=(Gt.start+Gt.count)*Vt;pt!==null&&(te=Math.max(te,pt.start*Vt),ce=Math.min(ce,(pt.start+pt.count)*Vt)),Ct!==null?(te=Math.max(te,0),ce=Math.min(ce,Ct.count)):Pt!=null&&(te=Math.max(te,0),ce=Math.min(ce,Pt.count));let he=ce-te;if(he<0||he===1/0)return;ee.setup(W,tt,Rt,j,Ct);let Ke,ne=_t;if(Ct!==null&&(Ke=et.get(Ct),ne=Mt,ne.setIndex(Ke)),W.isMesh)tt.wireframe===!0?(Z.setLineWidth(tt.wireframeLinewidth*Ot()),ne.setMode(N.LINES)):ne.setMode(N.TRIANGLES);else if(W.isLine){let Dt=tt.linewidth;Dt===void 0&&(Dt=1),Z.setLineWidth(Dt*Ot()),W.isLineSegments?ne.setMode(N.LINES):W.isLineLoop?ne.setMode(N.LINE_LOOP):ne.setMode(N.LINE_STRIP)}else W.isPoints?ne.setMode(N.POINTS):W.isSprite&&ne.setMode(N.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)ne.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(At.get("WEBGL_multi_draw"))ne.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let Dt=W._multiDrawStarts,$n=W._multiDrawCounts,ie=W._multiDrawCount,_n=Ct?et.get(Ct).bytesPerElement:1,Ms=at.get(tt).currentProgram.getUniforms();for(let sn=0;sn<ie;sn++)Ms.setValue(N,"_gl_DrawID",sn),ne.render(Dt[sn]/_n,$n[sn])}else if(W.isInstancedMesh)ne.renderInstances(te,he,W.count);else if(j.isInstancedBufferGeometry){let Dt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,$n=Math.min(j.instanceCount,Dt);ne.renderInstances(te,he,$n)}else ne.render(te,he)};function kt(T,H,j){T.transparent===!0&&T.side===Tn&&T.forceSinglePass===!1?(T.side=je,T.needsUpdate=!0,Do(T,H,j),T.side=Oi,T.needsUpdate=!0,Do(T,H,j),T.side=Tn):Do(T,H,j)}this.compile=function(T,H,j=null){j===null&&(j=T),d=Nt.get(j),d.init(H),S.push(d),j.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(d.pushLight(W),W.castShadow&&d.pushShadow(W))}),T!==j&&T.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(d.pushLight(W),W.castShadow&&d.pushShadow(W))}),d.setupLights();let tt=new Set;return T.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let pt=W.material;if(pt)if(Array.isArray(pt))for(let Tt=0;Tt<pt.length;Tt++){let Rt=pt[Tt];kt(Rt,j,W),tt.add(Rt)}else kt(pt,j,W),tt.add(pt)}),S.pop(),d=null,tt},this.compileAsync=function(T,H,j=null){let tt=this.compile(T,H,j);return new Promise(W=>{function pt(){if(tt.forEach(function(Tt){at.get(Tt).currentProgram.isReady()&&tt.delete(Tt)}),tt.size===0){W(T);return}setTimeout(pt,10)}At.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let _e=null;function Ie(T){_e&&_e(T)}function Yn(){nn.stop()}function Be(){nn.start()}let nn=new tg;nn.setAnimationLoop(Ie),typeof self<"u"&&nn.setContext(self),this.setAnimationLoop=function(T){_e=T,it.setAnimationLoop(T),T===null?nn.stop():nn.start()},it.addEventListener("sessionstart",Yn),it.addEventListener("sessionend",Be),this.render=function(T,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(H),H=it.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,H,P),d=Nt.get(T,S.length),d.init(H),S.push(d),Y.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),k.setFromProjectionMatrix(Y),st=this.localClippingEnabled,$=ut.init(this.clippingPlanes,st),m=dt.get(T,b.length),m.init(),b.push(m),it.enabled===!0&&it.isPresenting===!0){let pt=_.xr.getDepthSensingMesh();pt!==null&&Br(pt,H,-1/0,_.sortObjects)}Br(T,H,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(R,U),Lt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Lt&&Et.addToRenderList(m,T),this.info.render.frame++,$===!0&&ut.beginShadows();let j=d.state.shadowsArray;vt.render(j,T,H),$===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();let tt=m.opaque,W=m.transmissive;if(d.setupLights(),H.isArrayCamera){let pt=H.cameras;if(W.length>0)for(let Tt=0,Rt=pt.length;Tt<Rt;Tt++){let Ct=pt[Tt];pd(tt,W,T,Ct)}Lt&&Et.render(T);for(let Tt=0,Rt=pt.length;Tt<Rt;Tt++){let Ct=pt[Tt];ic(m,T,Ct,Ct.viewport)}}else W.length>0&&pd(tt,W,T,H),Lt&&Et.render(T),ic(m,T,H);P!==null&&(w.updateMultisampleRenderTarget(P),w.updateRenderTargetMipmap(P)),T.isScene===!0&&T.onAfterRender(_,T,H),ee.resetDefaultState(),M=-1,v=null,S.pop(),S.length>0?(d=S[S.length-1],$===!0&&ut.setGlobalState(_.clippingPlanes,d.state.camera)):d=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Br(T,H,j,tt){if(T.visible===!1)return;if(T.layers.test(H.layers)){if(T.isGroup)j=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(H);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||k.intersectsSprite(T)){tt&&mt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Y);let Tt=J.update(T),Rt=T.material;Rt.visible&&m.push(T,Tt,Rt,j,mt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||k.intersectsObject(T))){let Tt=J.update(T),Rt=T.material;if(tt&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),mt.copy(T.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),mt.copy(Tt.boundingSphere.center)),mt.applyMatrix4(T.matrixWorld).applyMatrix4(Y)),Array.isArray(Rt)){let Ct=Tt.groups;for(let Vt=0,Gt=Ct.length;Vt<Gt;Vt++){let Pt=Ct[Vt],te=Rt[Pt.materialIndex];te&&te.visible&&m.push(T,Tt,te,j,mt.z,Pt)}}else Rt.visible&&m.push(T,Tt,Rt,j,mt.z,null)}}let pt=T.children;for(let Tt=0,Rt=pt.length;Tt<Rt;Tt++)Br(pt[Tt],H,j,tt)}function ic(T,H,j,tt){let W=T.opaque,pt=T.transmissive,Tt=T.transparent;d.setupLightsView(j),$===!0&&ut.setGlobalState(_.clippingPlanes,j),tt&&Z.viewport(L.copy(tt)),W.length>0&&Io(W,H,j),pt.length>0&&Io(pt,H,j),Tt.length>0&&Io(Tt,H,j),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function pd(T,H,j,tt){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[tt.id]===void 0&&(d.state.transmissionRenderTarget[tt.id]=new di(1,1,{generateMipmaps:!0,type:At.has("EXT_color_buffer_half_float")||At.has("EXT_color_buffer_float")?_o:ui,minFilter:ls,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));let pt=d.state.transmissionRenderTarget[tt.id],Tt=tt.viewport||L;pt.setSize(Tt.z,Tt.w);let Rt=_.getRenderTarget();_.setRenderTarget(pt),_.getClearColor(Q),B=_.getClearAlpha(),B<1&&_.setClearColor(16777215,.5),_.clear(),Lt&&Et.render(j);let Ct=_.toneMapping;_.toneMapping=Ni;let Vt=tt.viewport;if(tt.viewport!==void 0&&(tt.viewport=void 0),d.setupLightsView(tt),$===!0&&ut.setGlobalState(_.clippingPlanes,tt),Io(T,j,tt),w.updateMultisampleRenderTarget(pt),w.updateRenderTargetMipmap(pt),At.has("WEBGL_multisampled_render_to_texture")===!1){let Gt=!1;for(let Pt=0,te=H.length;Pt<te;Pt++){let ce=H[Pt],he=ce.object,Ke=ce.geometry,ne=ce.material,Dt=ce.group;if(ne.side===Tn&&he.layers.test(tt.layers)){let $n=ne.side;ne.side=je,ne.needsUpdate=!0,md(he,j,tt,Ke,ne,Dt),ne.side=$n,ne.needsUpdate=!0,Gt=!0}}Gt===!0&&(w.updateMultisampleRenderTarget(pt),w.updateRenderTargetMipmap(pt))}_.setRenderTarget(Rt),_.setClearColor(Q,B),Vt!==void 0&&(tt.viewport=Vt),_.toneMapping=Ct}function Io(T,H,j){let tt=H.isScene===!0?H.overrideMaterial:null;for(let W=0,pt=T.length;W<pt;W++){let Tt=T[W],Rt=Tt.object,Ct=Tt.geometry,Vt=tt===null?Tt.material:tt,Gt=Tt.group;Rt.layers.test(j.layers)&&md(Rt,H,j,Ct,Vt,Gt)}}function md(T,H,j,tt,W,pt){T.onBeforeRender(_,H,j,tt,W,pt),T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),W.onBeforeRender(_,H,j,tt,T,pt),W.transparent===!0&&W.side===Tn&&W.forceSinglePass===!1?(W.side=je,W.needsUpdate=!0,_.renderBufferDirect(j,H,tt,W,T,pt),W.side=Oi,W.needsUpdate=!0,_.renderBufferDirect(j,H,tt,W,T,pt),W.side=Tn):_.renderBufferDirect(j,H,tt,W,T,pt),T.onAfterRender(_,H,j,tt,W,pt)}function Do(T,H,j){H.isScene!==!0&&(H=Bt);let tt=at.get(T),W=d.state.lights,pt=d.state.shadowsArray,Tt=W.state.version,Rt=ht.getParameters(T,W.state,pt,H,j),Ct=ht.getProgramCacheKey(Rt),Vt=tt.programs;tt.environment=T.isMeshStandardMaterial?H.environment:null,tt.fog=H.fog,tt.envMap=(T.isMeshStandardMaterial?O:x).get(T.envMap||tt.environment),tt.envMapRotation=tt.environment!==null&&T.envMap===null?H.environmentRotation:T.envMapRotation,Vt===void 0&&(T.addEventListener("dispose",zt),Vt=new Map,tt.programs=Vt);let Gt=Vt.get(Ct);if(Gt!==void 0){if(tt.currentProgram===Gt&&tt.lightsStateVersion===Tt)return yd(T,Rt),Gt}else Rt.uniforms=ht.getUniforms(T),T.onBeforeCompile(Rt,_),Gt=ht.acquireProgram(Rt,Ct),Vt.set(Ct,Gt),tt.uniforms=Rt.uniforms;let Pt=tt.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Pt.clippingPlanes=ut.uniform),yd(T,Rt),tt.needsLights=e0(T),tt.lightsStateVersion=Tt,tt.needsLights&&(Pt.ambientLightColor.value=W.state.ambient,Pt.lightProbe.value=W.state.probe,Pt.directionalLights.value=W.state.directional,Pt.directionalLightShadows.value=W.state.directionalShadow,Pt.spotLights.value=W.state.spot,Pt.spotLightShadows.value=W.state.spotShadow,Pt.rectAreaLights.value=W.state.rectArea,Pt.ltc_1.value=W.state.rectAreaLTC1,Pt.ltc_2.value=W.state.rectAreaLTC2,Pt.pointLights.value=W.state.point,Pt.pointLightShadows.value=W.state.pointShadow,Pt.hemisphereLights.value=W.state.hemi,Pt.directionalShadowMap.value=W.state.directionalShadowMap,Pt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Pt.spotShadowMap.value=W.state.spotShadowMap,Pt.spotLightMatrix.value=W.state.spotLightMatrix,Pt.spotLightMap.value=W.state.spotLightMap,Pt.pointShadowMap.value=W.state.pointShadowMap,Pt.pointShadowMatrix.value=W.state.pointShadowMatrix),tt.currentProgram=Gt,tt.uniformsList=null,Gt}function gd(T){if(T.uniformsList===null){let H=T.currentProgram.getUniforms();T.uniformsList=fr.seqWithValue(H.seq,T.uniforms)}return T.uniformsList}function yd(T,H){let j=at.get(T);j.outputColorSpace=H.outputColorSpace,j.batching=H.batching,j.batchingColor=H.batchingColor,j.instancing=H.instancing,j.instancingColor=H.instancingColor,j.instancingMorph=H.instancingMorph,j.skinning=H.skinning,j.morphTargets=H.morphTargets,j.morphNormals=H.morphNormals,j.morphColors=H.morphColors,j.morphTargetsCount=H.morphTargetsCount,j.numClippingPlanes=H.numClippingPlanes,j.numIntersection=H.numClipIntersection,j.vertexAlphas=H.vertexAlphas,j.vertexTangents=H.vertexTangents,j.toneMapping=H.toneMapping}function jg(T,H,j,tt,W){H.isScene!==!0&&(H=Bt),w.resetTextureUnits();let pt=H.fog,Tt=tt.isMeshStandardMaterial?H.environment:null,Rt=P===null?_.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Rr,Ct=(tt.isMeshStandardMaterial?O:x).get(tt.envMap||Tt),Vt=tt.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Gt=!!j.attributes.tangent&&(!!tt.normalMap||tt.anisotropy>0),Pt=!!j.morphAttributes.position,te=!!j.morphAttributes.normal,ce=!!j.morphAttributes.color,he=Ni;tt.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(he=_.toneMapping);let Ke=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ne=Ke!==void 0?Ke.length:0,Dt=at.get(tt),$n=d.state.lights;if($===!0&&(st===!0||T!==v)){let ln=T===v&&tt.id===M;ut.setState(tt,T,ln)}let ie=!1;tt.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==$n.state.version||Dt.outputColorSpace!==Rt||W.isBatchedMesh&&Dt.batching===!1||!W.isBatchedMesh&&Dt.batching===!0||W.isBatchedMesh&&Dt.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Dt.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Dt.instancing===!1||!W.isInstancedMesh&&Dt.instancing===!0||W.isSkinnedMesh&&Dt.skinning===!1||!W.isSkinnedMesh&&Dt.skinning===!0||W.isInstancedMesh&&Dt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Dt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Dt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Dt.instancingMorph===!1&&W.morphTexture!==null||Dt.envMap!==Ct||tt.fog===!0&&Dt.fog!==pt||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==ut.numPlanes||Dt.numIntersection!==ut.numIntersection)||Dt.vertexAlphas!==Vt||Dt.vertexTangents!==Gt||Dt.morphTargets!==Pt||Dt.morphNormals!==te||Dt.morphColors!==ce||Dt.toneMapping!==he||Dt.morphTargetsCount!==ne)&&(ie=!0):(ie=!0,Dt.__version=tt.version);let _n=Dt.currentProgram;ie===!0&&(_n=Do(tt,H,W));let Ms=!1,sn=!1,zr=!1,ue=_n.getUniforms(),Pn=Dt.uniforms;if(Z.useProgram(_n.program)&&(Ms=!0,sn=!0,zr=!0),tt.id!==M&&(M=tt.id,sn=!0),Ms||v!==T){Z.buffers.depth.getReversed()?(ot.copy(T.projectionMatrix),Rx(ot),Cx(ot),ue.setValue(N,"projectionMatrix",ot)):ue.setValue(N,"projectionMatrix",T.projectionMatrix),ue.setValue(N,"viewMatrix",T.matrixWorldInverse);let mi=ue.map.cameraPosition;mi!==void 0&&mi.setValue(N,ft.setFromMatrixPosition(T.matrixWorld)),It.logarithmicDepthBuffer&&ue.setValue(N,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(tt.isMeshPhongMaterial||tt.isMeshToonMaterial||tt.isMeshLambertMaterial||tt.isMeshBasicMaterial||tt.isMeshStandardMaterial||tt.isShaderMaterial)&&ue.setValue(N,"isOrthographic",T.isOrthographicCamera===!0),v!==T&&(v=T,sn=!0,zr=!0)}if(W.isSkinnedMesh){ue.setOptional(N,W,"bindMatrix"),ue.setOptional(N,W,"bindMatrixInverse");let ln=W.skeleton;ln&&(ln.boneTexture===null&&ln.computeBoneTexture(),ue.setValue(N,"boneTexture",ln.boneTexture,w))}W.isBatchedMesh&&(ue.setOptional(N,W,"batchingTexture"),ue.setValue(N,"batchingTexture",W._matricesTexture,w),ue.setOptional(N,W,"batchingIdTexture"),ue.setValue(N,"batchingIdTexture",W._indirectTexture,w),ue.setOptional(N,W,"batchingColorTexture"),W._colorsTexture!==null&&ue.setValue(N,"batchingColorTexture",W._colorsTexture,w));let kr=j.morphAttributes;if((kr.position!==void 0||kr.normal!==void 0||kr.color!==void 0)&&Ft.update(W,j,_n),(sn||Dt.receiveShadow!==W.receiveShadow)&&(Dt.receiveShadow=W.receiveShadow,ue.setValue(N,"receiveShadow",W.receiveShadow)),tt.isMeshGouraudMaterial&&tt.envMap!==null&&(Pn.envMap.value=Ct,Pn.flipEnvMap.value=Ct.isCubeTexture&&Ct.isRenderTargetTexture===!1?-1:1),tt.isMeshStandardMaterial&&tt.envMap===null&&H.environment!==null&&(Pn.envMapIntensity.value=H.environmentIntensity),sn&&(ue.setValue(N,"toneMappingExposure",_.toneMappingExposure),Dt.needsLights&&t0(Pn,zr),pt&&tt.fog===!0&&K.refreshFogUniforms(Pn,pt),K.refreshMaterialUniforms(Pn,tt,E,V,d.state.transmissionRenderTarget[T.id]),fr.upload(N,gd(Dt),Pn,w)),tt.isShaderMaterial&&tt.uniformsNeedUpdate===!0&&(fr.upload(N,gd(Dt),Pn,w),tt.uniformsNeedUpdate=!1),tt.isSpriteMaterial&&ue.setValue(N,"center",W.center),ue.setValue(N,"modelViewMatrix",W.modelViewMatrix),ue.setValue(N,"normalMatrix",W.normalMatrix),ue.setValue(N,"modelMatrix",W.matrixWorld),tt.isShaderMaterial||tt.isRawShaderMaterial){let ln=tt.uniformsGroups;for(let mi=0,gi=ln.length;mi<gi;mi++){let xd=ln[mi];z.update(xd,_n),z.bind(xd,_n)}}return _n}function t0(T,H){T.ambientLightColor.needsUpdate=H,T.lightProbe.needsUpdate=H,T.directionalLights.needsUpdate=H,T.directionalLightShadows.needsUpdate=H,T.pointLights.needsUpdate=H,T.pointLightShadows.needsUpdate=H,T.spotLights.needsUpdate=H,T.spotLightShadows.needsUpdate=H,T.rectAreaLights.needsUpdate=H,T.hemisphereLights.needsUpdate=H}function e0(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(T,H,j){at.get(T.texture).__webglTexture=H,at.get(T.depthTexture).__webglTexture=j;let tt=at.get(T);tt.__hasExternalTextures=!0,tt.__autoAllocateDepthBuffer=j===void 0,tt.__autoAllocateDepthBuffer||At.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),tt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,H){let j=at.get(T);j.__webglFramebuffer=H,j.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(T,H=0,j=0){P=T,A=H,I=j;let tt=!0,W=null,pt=!1,Tt=!1;if(T){let Ct=at.get(T);if(Ct.__useDefaultFramebuffer!==void 0)Z.bindFramebuffer(N.FRAMEBUFFER,null),tt=!1;else if(Ct.__webglFramebuffer===void 0)w.setupRenderTarget(T);else if(Ct.__hasExternalTextures)w.rebindTextures(T,at.get(T.texture).__webglTexture,at.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Pt=T.depthTexture;if(Ct.__boundDepthTexture!==Pt){if(Pt!==null&&at.has(Pt)&&(T.width!==Pt.image.width||T.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(T)}}let Vt=T.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(Tt=!0);let Gt=at.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Gt[H])?W=Gt[H][j]:W=Gt[H],pt=!0):T.samples>0&&w.useMultisampledRTT(T)===!1?W=at.get(T).__webglMultisampledFramebuffer:Array.isArray(Gt)?W=Gt[j]:W=Gt,L.copy(T.viewport),G.copy(T.scissor),X=T.scissorTest}else L.copy(q).multiplyScalar(E).floor(),G.copy(nt).multiplyScalar(E).floor(),X=ct;if(Z.bindFramebuffer(N.FRAMEBUFFER,W)&&tt&&Z.drawBuffers(T,W),Z.viewport(L),Z.scissor(G),Z.setScissorTest(X),pt){let Ct=at.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+H,Ct.__webglTexture,j)}else if(Tt){let Ct=at.get(T.texture),Vt=H||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ct.__webglTexture,j||0,Vt)}M=-1},this.readRenderTargetPixels=function(T,H,j,tt,W,pt,Tt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=at.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Tt!==void 0&&(Rt=Rt[Tt]),Rt){Z.bindFramebuffer(N.FRAMEBUFFER,Rt);try{let Ct=T.texture,Vt=Ct.format,Gt=Ct.type;if(!It.textureFormatReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!It.textureTypeReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=T.width-tt&&j>=0&&j<=T.height-W&&N.readPixels(H,j,tt,W,wt.convert(Vt),wt.convert(Gt),pt)}finally{let Ct=P!==null?at.get(P).__webglFramebuffer:null;Z.bindFramebuffer(N.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(T,H,j,tt,W,pt,Tt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=at.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Tt!==void 0&&(Rt=Rt[Tt]),Rt){let Ct=T.texture,Vt=Ct.format,Gt=Ct.type;if(!It.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!It.textureTypeReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=T.width-tt&&j>=0&&j<=T.height-W){Z.bindFramebuffer(N.FRAMEBUFFER,Rt);let Pt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Pt),N.bufferData(N.PIXEL_PACK_BUFFER,pt.byteLength,N.STREAM_READ),N.readPixels(H,j,tt,W,wt.convert(Vt),wt.convert(Gt),0);let te=P!==null?at.get(P).__webglFramebuffer:null;Z.bindFramebuffer(N.FRAMEBUFFER,te);let ce=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Ax(N,ce,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Pt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,pt),N.deleteBuffer(Pt),N.deleteSync(ce),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,H=null,j=0){T.isTexture!==!0&&(co("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,T=arguments[1]);let tt=Math.pow(2,-j),W=Math.floor(T.image.width*tt),pt=Math.floor(T.image.height*tt),Tt=H!==null?H.x:0,Rt=H!==null?H.y:0;w.setTexture2D(T,0),N.copyTexSubImage2D(N.TEXTURE_2D,j,0,0,Tt,Rt,W,pt),Z.unbindTexture()},this.copyTextureToTexture=function(T,H,j=null,tt=null,W=0){T.isTexture!==!0&&(co("WebGLRenderer: copyTextureToTexture function signature has changed."),tt=arguments[0]||null,T=arguments[1],H=arguments[2],W=arguments[3]||0,j=null);let pt,Tt,Rt,Ct,Vt,Gt,Pt,te,ce,he=T.isCompressedTexture?T.mipmaps[W]:T.image;j!==null?(pt=j.max.x-j.min.x,Tt=j.max.y-j.min.y,Rt=j.isBox3?j.max.z-j.min.z:1,Ct=j.min.x,Vt=j.min.y,Gt=j.isBox3?j.min.z:0):(pt=he.width,Tt=he.height,Rt=he.depth||1,Ct=0,Vt=0,Gt=0),tt!==null?(Pt=tt.x,te=tt.y,ce=tt.z):(Pt=0,te=0,ce=0);let Ke=wt.convert(H.format),ne=wt.convert(H.type),Dt;H.isData3DTexture?(w.setTexture3D(H,0),Dt=N.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(w.setTexture2DArray(H,0),Dt=N.TEXTURE_2D_ARRAY):(w.setTexture2D(H,0),Dt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,H.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,H.unpackAlignment);let $n=N.getParameter(N.UNPACK_ROW_LENGTH),ie=N.getParameter(N.UNPACK_IMAGE_HEIGHT),_n=N.getParameter(N.UNPACK_SKIP_PIXELS),Ms=N.getParameter(N.UNPACK_SKIP_ROWS),sn=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,he.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,he.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ct),N.pixelStorei(N.UNPACK_SKIP_ROWS,Vt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Gt);let zr=T.isDataArrayTexture||T.isData3DTexture,ue=H.isDataArrayTexture||H.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){let Pn=at.get(T),kr=at.get(H),ln=at.get(Pn.__renderTarget),mi=at.get(kr.__renderTarget);Z.bindFramebuffer(N.READ_FRAMEBUFFER,ln.__webglFramebuffer),Z.bindFramebuffer(N.DRAW_FRAMEBUFFER,mi.__webglFramebuffer);for(let gi=0;gi<Rt;gi++)zr&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,at.get(T).__webglTexture,W,Gt+gi),T.isDepthTexture?(ue&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,at.get(H).__webglTexture,W,ce+gi),N.blitFramebuffer(Ct,Vt,pt,Tt,Pt,te,pt,Tt,N.DEPTH_BUFFER_BIT,N.NEAREST)):ue?N.copyTexSubImage3D(Dt,W,Pt,te,ce+gi,Ct,Vt,pt,Tt):N.copyTexSubImage2D(Dt,W,Pt,te,ce+gi,Ct,Vt,pt,Tt);Z.bindFramebuffer(N.READ_FRAMEBUFFER,null),Z.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ue?T.isDataTexture||T.isData3DTexture?N.texSubImage3D(Dt,W,Pt,te,ce,pt,Tt,Rt,Ke,ne,he.data):H.isCompressedArrayTexture?N.compressedTexSubImage3D(Dt,W,Pt,te,ce,pt,Tt,Rt,Ke,he.data):N.texSubImage3D(Dt,W,Pt,te,ce,pt,Tt,Rt,Ke,ne,he):T.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,W,Pt,te,pt,Tt,Ke,ne,he.data):T.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,W,Pt,te,he.width,he.height,Ke,he.data):N.texSubImage2D(N.TEXTURE_2D,W,Pt,te,pt,Tt,Ke,ne,he);N.pixelStorei(N.UNPACK_ROW_LENGTH,$n),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ie),N.pixelStorei(N.UNPACK_SKIP_PIXELS,_n),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ms),N.pixelStorei(N.UNPACK_SKIP_IMAGES,sn),W===0&&H.generateMipmaps&&N.generateMipmap(Dt),Z.unbindTexture()},this.copyTextureToTexture3D=function(T,H,j=null,tt=null,W=0){return T.isTexture!==!0&&(co("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,tt=arguments[1]||null,T=arguments[2],H=arguments[3],W=arguments[4]||0),co('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,H,j,tt,W)},this.initRenderTarget=function(T){at.get(T).__webglFramebuffer===void 0&&w.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?w.setTextureCube(T,0):T.isData3DTexture?w.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?w.setTexture2DArray(T,0):w.setTexture2D(T,0),Z.unbindTexture()},this.resetState=function(){A=0,I=0,P=null,Z.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}};var Al=class n{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new $t(t),this.near=e,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Mr=class extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},vu=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=nu,this.updateRanges=[],this.version=0,this.uuid=Fi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Xe=new F,Rl=class n{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix4(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Xe.fromBufferAttribute(this,e),Xe.applyNormalMatrix(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Xe.fromBufferAttribute(this,e),Xe.transformDirection(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Bn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=re(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Bn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Bn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Bn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Bn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ne(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new n(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Sr=class extends Vn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new $t(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},rr,so=new F,or=new F,ar=new F,lr=new qt,ro=new qt,rg=new fe,Ka=new F,oo=new F,Ja=new F,Tm=new qt,uh=new qt,Em=new qt,go=class extends Fe{constructor(t=new Sr){if(super(),this.isSprite=!0,this.type="Sprite",rr===void 0){rr=new Me;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new vu(e,5);rr.setIndex([0,1,2,0,2,3]),rr.setAttribute("position",new Rl(i,3,0,!1)),rr.setAttribute("uv",new Rl(i,2,3,!1))}this.geometry=rr,this.material=t,this.center=new qt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),or.setFromMatrixScale(this.matrixWorld),rg.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ar.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&or.multiplyScalar(-ar.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let o=this.center;Qa(Ka.set(-.5,-.5,0),ar,o,or,s,r),Qa(oo.set(.5,-.5,0),ar,o,or,s,r),Qa(Ja.set(.5,.5,0),ar,o,or,s,r),Tm.set(0,0),uh.set(1,0),Em.set(1,1);let a=t.ray.intersectTriangle(Ka,oo,Ja,!1,so);if(a===null&&(Qa(oo.set(-.5,.5,0),ar,o,or,s,r),uh.set(0,1),a=t.ray.intersectTriangle(Ka,Ja,oo,!1,so),a===null))return;let l=t.ray.origin.distanceTo(so);l<t.near||l>t.far||e.push({distance:l,point:so.clone(),uv:oi.getInterpolation(so,Ka,oo,Ja,Tm,uh,Em,new qt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Qa(n,t,e,i,s,r){lr.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(ro.x=r*lr.x-s*lr.y,ro.y=s*lr.x+r*lr.y):ro.copy(lr),n.copy(t),n.x+=ro.x,n.y+=ro.y,n.applyMatrix4(rg)}var Wn=class extends Vn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new $t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Cl=new F,Pl=new F,wm=new fe,ao=new po,ja=new us,dh=new F,Am=new F,ki=class extends Fe{constructor(t=new Me,e=new Wn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Cl.fromBufferAttribute(e,s-1),Pl.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Cl.distanceTo(Pl);t.setAttribute("lineDistance",new ge(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ja.copy(i.boundingSphere),ja.applyMatrix4(s),ja.radius+=r,t.ray.intersectsSphere(ja)===!1)return;wm.copy(s).invert(),ao.copy(t.ray).applyMatrix4(wm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let y=p,m=g-1;y<m;y+=c){let d=h.getX(y),b=h.getX(y+1),S=tl(this,t,ao,l,d,b);S&&e.push(S)}if(this.isLineLoop){let y=h.getX(g-1),m=h.getX(p),d=tl(this,t,ao,l,y,m);d&&e.push(d)}}else{let p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let y=p,m=g-1;y<m;y+=c){let d=tl(this,t,ao,l,y,y+1);d&&e.push(d)}if(this.isLineLoop){let y=tl(this,t,ao,l,g-1,p);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function tl(n,t,e,i,s,r){let o=n.geometry.attributes.position;if(Cl.fromBufferAttribute(o,s),Pl.fromBufferAttribute(o,r),e.distanceSqToSegment(Cl,Pl,dh,Am)>i)return;dh.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(dh);if(!(l<t.near||l>t.far))return{distance:l,point:Am.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}var Rm=new F,Cm=new F,pn=class extends ki{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Rm.fromBufferAttribute(e,s),Cm.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Rm.distanceTo(Cm);t.setAttribute("lineDistance",new ge(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var br=class extends Vn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new $t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Pm=new fe,Mu=new po,el=new us,nl=new F,yo=class extends Fe{constructor(t=new Me,e=new br){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),el.copy(i.boundingSphere),el.applyMatrix4(s),el.radius+=r,t.ray.intersectsSphere(el)===!1)return;Pm.copy(s).invert(),Mu.copy(t.ray).applyMatrix4(Pm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){let f=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=f,y=p;g<y;g++){let m=c.getX(g);nl.fromBufferAttribute(u,m),Im(nl,m,l,s,t,e,this)}}else{let f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=f,y=p;g<y;g++)nl.fromBufferAttribute(u,g),Im(nl,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Im(n,t,e,i,s,r,o){let a=Mu.distanceSqToPoint(n);if(a<e){let l=new F;Mu.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Il=class extends an{constructor(t,e,i,s,r,o,a,l,c){super(t,e,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Vi=class n extends Me{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],p=[],g=0,y=[],m=i/2,d=0;b(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new ge(u,3)),this.setAttribute("normal",new ge(f,3)),this.setAttribute("uv",new ge(p,2));function b(){let _=new F,C=new F,A=0,I=(e-t)/i;for(let P=0;P<=r;P++){let M=[],v=P/r,L=v*(e-t)+t;for(let G=0;G<=s;G++){let X=G/s,Q=X*l+a,B=Math.sin(Q),D=Math.cos(Q);C.x=L*B,C.y=-v*i+m,C.z=L*D,u.push(C.x,C.y,C.z),_.set(B,I,D).normalize(),f.push(_.x,_.y,_.z),p.push(X,1-v),M.push(g++)}y.push(M)}for(let P=0;P<s;P++)for(let M=0;M<r;M++){let v=y[M][P],L=y[M+1][P],G=y[M+1][P+1],X=y[M][P+1];(t>0||M!==0)&&(h.push(v,L,X),A+=3),(e>0||M!==r-1)&&(h.push(L,G,X),A+=3)}c.addGroup(d,A,0),d+=A}function S(_){let C=g,A=new qt,I=new F,P=0,M=_===!0?t:e,v=_===!0?1:-1;for(let G=1;G<=s;G++)u.push(0,m*v,0),f.push(0,v,0),p.push(.5,.5),g++;let L=g;for(let G=0;G<=s;G++){let Q=G/s*l+a,B=Math.cos(Q),D=Math.sin(Q);I.x=M*D,I.y=m*v,I.z=M*B,u.push(I.x,I.y,I.z),f.push(0,v,0),A.x=B*.5+.5,A.y=D*.5*v+.5,p.push(A.x,A.y),g++}for(let G=0;G<s;G++){let X=C+G,Q=L+G;_===!0?h.push(Q,Q+1,X):h.push(Q+1,Q,X),P+=3}c.addGroup(d,P,_===!0?1:2),d+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var il=new F,sl=new F,fh=new F,rl=new oi,mn=class extends Me{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(dl*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),f={},p=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:y,b:m,c:d}=rl;if(y.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),d.fromBufferAttribute(a,c[2]),rl.getNormal(fh),u[0]=`${Math.round(y.x*s)},${Math.round(y.y*s)},${Math.round(y.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(d.x*s)},${Math.round(d.y*s)},${Math.round(d.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let b=0;b<3;b++){let S=(b+1)%3,_=u[b],C=u[S],A=rl[h[b]],I=rl[h[S]],P=`${_}_${C}`,M=`${C}_${_}`;M in f&&f[M]?(fh.dot(f[M].normal)<=r&&(p.push(A.x,A.y,A.z),p.push(I.x,I.y,I.z)),f[M]=null):P in f||(f[P]={index0:c[b],index1:c[S],normal:fh.clone()})}}for(let g in f)if(f[g]){let{index0:y,index1:m}=f[g];il.fromBufferAttribute(a,y),sl.fromBufferAttribute(a,m),p.push(il.x,il.y,il.z),p.push(sl.x,sl.y,sl.z)}this.setAttribute("position",new ge(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var Dl=class n extends Me{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);let a=[],l=[],c=[],h=[],u=t,f=(e-t)/s,p=new F,g=new qt;for(let y=0;y<=s;y++){for(let m=0;m<=i;m++){let d=r+m/i*o;p.x=u*Math.cos(d),p.y=u*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let y=0;y<s;y++){let m=y*(i+1);for(let d=0;d<i;d++){let b=d+m,S=b,_=b+i+1,C=b+i+2,A=b+1;a.push(S,_,A),a.push(_,C,A)}}this.setIndex(a),this.setAttribute("position",new ge(l,3)),this.setAttribute("normal",new ge(c,3)),this.setAttribute("uv",new ge(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var ds=class n extends Me{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new F,f=new F,p=[],g=[],y=[],m=[];for(let d=0;d<=i;d++){let b=[],S=d/i,_=0;d===0&&o===0?_=.5/e:d===i&&l===Math.PI&&(_=-.5/e);for(let C=0;C<=e;C++){let A=C/e;u.x=-t*Math.cos(s+A*r)*Math.sin(o+S*a),u.y=t*Math.cos(o+S*a),u.z=t*Math.sin(s+A*r)*Math.sin(o+S*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),y.push(f.x,f.y,f.z),m.push(A+_,1-S),b.push(c++)}h.push(b)}for(let d=0;d<i;d++)for(let b=0;b<e;b++){let S=h[d][b+1],_=h[d][b],C=h[d+1][b],A=h[d+1][b+1];(d!==0||o>0)&&p.push(S,_,A),(d!==i-1||l<Math.PI)&&p.push(_,C,A)}this.setIndex(p),this.setAttribute("position",new ge(g,3)),this.setAttribute("normal",new ge(y,3)),this.setAttribute("uv",new ge(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Hi=class n extends Me{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],l=[],c=[],h=new F,u=new F,f=new F;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){let y=g/s*r,m=p/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(y),u.y=(t+e*Math.cos(m))*Math.sin(y),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(y),h.y=t*Math.sin(y),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){let y=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,b=(s+1)*p+g;o.push(y,m,b),o.push(m,d,b)}this.setIndex(o),this.setAttribute("position",new ge(a,3)),this.setAttribute("normal",new ge(l,3)),this.setAttribute("uv",new ge(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var tn=class extends Vn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new $t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zm,this.normalScale=new qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function ol(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function bb(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var Tr=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Su=class extends Tr{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Cp,endingEnd:Cp}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Pp:r=t,a=2*e-i;break;case Ip:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Pp:o=t,l=2*i-e;break;case Ip:o=1,l=i+s[1]-s[0];break;default:o=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(i-e)/(s-e),y=g*g,m=y*g,d=-f*m+2*f*y-f*g,b=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*g+1,S=(-1-p)*m+(1.5+p)*y+.5*g,_=p*m-p*y;for(let C=0;C!==a;++C)r[C]=d*o[h+C]+b*o[c+C]+S*o[l+C]+_*o[u+C];return r}},bu=class extends Tr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(i-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[c+f]*u+o[l+f]*h;return r}},Tu=class extends Tr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},An=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ol(e,this.TimeBufferType),this.values=ol(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:ol(t.times,Array),values:ol(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Tu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new bu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Su(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case fl:e=this.InterpolantFactoryMethodDiscrete;break;case eu:e=this.InterpolantFactoryMethodLinear;break;case Oc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fl;case this.InterpolantFactoryMethodLinear:return eu;case this.InterpolantFactoryMethodSmooth:return Oc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&bb(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Oc,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*i,f=u-i,p=u+i;for(let g=0;g!==i;++g){let y=e[u+g];if(y!==e[f+g]||y!==e[p+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*i,f=o*i;for(let p=0;p!==i;++p)e[f+p]=e[u+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};An.prototype.TimeBufferType=Float32Array;An.prototype.ValueBufferType=Float32Array;An.prototype.DefaultInterpolation=eu;var fs=class extends An{constructor(t,e,i){super(t,e,i)}};fs.prototype.ValueTypeName="bool";fs.prototype.ValueBufferType=Array;fs.prototype.DefaultInterpolation=fl;fs.prototype.InterpolantFactoryMethodLinear=void 0;fs.prototype.InterpolantFactoryMethodSmooth=void 0;var Eu=class extends An{};Eu.prototype.ValueTypeName="color";var wu=class extends An{};wu.prototype.ValueTypeName="number";var Au=class extends Tr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)zi.slerpFlat(r,0,o,c-a,o,c,l);return r}},Ll=class extends An{InterpolantFactoryMethodLinear(t){return new Au(this.times,this.values,this.getValueSize(),t)}};Ll.prototype.ValueTypeName="quaternion";Ll.prototype.InterpolantFactoryMethodSmooth=void 0;var ps=class extends An{constructor(t,e,i){super(t,e,i)}};ps.prototype.ValueTypeName="string";ps.prototype.ValueBufferType=Array;ps.prototype.DefaultInterpolation=fl;ps.prototype.InterpolantFactoryMethodLinear=void 0;ps.prototype.InterpolantFactoryMethodSmooth=void 0;var Ru=class extends An{};Ru.prototype.ValueTypeName="vector";var Cu=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},Tb=new Cu,Pu=class{constructor(t){this.manager=t!==void 0?t:Tb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Pu.DEFAULT_MATERIAL_NAME="__DEFAULT";var xo=class extends Fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new $t(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var ph=new fe,Dm=new F,Lm=new F,Ul=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qt(512,512),this.map=null,this.mapPass=null,this.matrix=new fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new mo,this._frameExtents=new qt(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;Dm.setFromMatrixPosition(t.matrixWorld),e.position.copy(Dm),Lm.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Lm),e.updateMatrixWorld(),ph.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ph),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ph)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Um=new fe,lo=new F,mh=new F,Iu=class extends Ul{constructor(){super(new Le(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new qt(4,2),this._viewportCount=6,this._viewports=[new oe(2,1,1,1),new oe(0,1,1,1),new oe(3,1,1,1),new oe(1,1,1,1),new oe(3,0,1,1),new oe(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(t,e=0){let i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),lo.setFromMatrixPosition(t.matrixWorld),i.position.copy(lo),mh.copy(i.position),mh.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(mh),i.updateMatrixWorld(),s.makeTranslation(-lo.x,-lo.y,-lo.z),Um.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Um)}},Nl=class extends xo{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Iu}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Du=class extends Ul{constructor(){super(new Tl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Er=class extends xo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new Du}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},wr=class extends xo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ar=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Nm(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Nm();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Nm(){return performance.now()}var Vu="\\[\\]\\.:\\/",Eb=new RegExp("["+Vu+"]","g"),Hu="[^"+Vu+"]",wb="[^"+Vu.replace("\\.","")+"]",Ab=/((?:WC+[\/:])*)/.source.replace("WC",Hu),Rb=/(WCOD+)?/.source.replace("WCOD",wb),Cb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Hu),Pb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Hu),Ib=new RegExp("^"+Ab+Rb+Cb+Pb+"$"),Db=["material","materials","bones","map"],Lu=class{constructor(t,e,i){let s=i||me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},me=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Eb,"")}static parseTrackName(t){let e=Ib.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Db.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};me.Composite=Lu;me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};me.prototype.GetterByBindingType=[me.prototype._getValue_direct,me.prototype._getValue_array,me.prototype._getValue_arrayElement,me.prototype._getValue_toArray];me.prototype.SetterByBindingTypeAndVersioning=[[me.prototype._setValue_direct,me.prototype._setValue_direct_setNeedsUpdate,me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[me.prototype._setValue_array,me.prototype._setValue_array_setNeedsUpdate,me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[me.prototype._setValue_arrayElement,me.prototype._setValue_arrayElement_setNeedsUpdate,me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[me.prototype._setValue_fromArray,me.prototype._setValue_fromArray_setNeedsUpdate,me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var hL=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var zl=matchMedia("(prefers-reduced-motion: reduce)").matches,Lb=new URLSearchParams(location.search).has("debug"),ms=15026253,Ae={FLOW:6.5,FORM:2.8,HOLD:3.4,BURST:1.3},Ub=Ae.FLOW+Ae.FORM+Ae.HOLD+Ae.BURST;function Nb(n){let t=n%Ub;return t<Ae.FLOW?{id:0,t:t/Ae.FLOW}:t<Ae.FLOW+Ae.FORM?{id:1,t:(t-Ae.FLOW)/Ae.FORM}:t<Ae.FLOW+Ae.FORM+Ae.HOLD?{id:2,t:(t-Ae.FLOW-Ae.FORM)/Ae.HOLD}:{id:3,t:(t-Ae.FLOW-Ae.FORM-Ae.HOLD)/Ae.BURST}}function Gu(n="255,99,105,"){let t=document.createElement("canvas");t.width=t.height=64;let e=t.getContext("2d"),i=e.createRadialGradient(32,32,0,32,32,32);return i.addColorStop(0,`rgba(${n}1)`),i.addColorStop(.3,`rgba(${n}0.5)`),i.addColorStop(1,`rgba(${n}0)`),e.fillStyle=i,e.fillRect(0,0,64,64),new Il(t)}function Fb(n){let t=new Float32Array(n*3);for(let e=0;e<n;e++){let i=Math.random(),s,r;if(i<.36){let o=Math.random()*Math.PI*2,a=1.32+(Math.random()-.5)*.09;s=Math.cos(o)*a,r=Math.sin(o)*a}else if(i<.58){let o=Math.random()*Math.PI*2,a=.8+(Math.random()-.5)*.08;s=Math.cos(o)*a,r=Math.sin(o)*a}else if(i<.74){let o=Math.random()*Math.PI*2,a=.26*Math.sqrt(Math.random());s=Math.cos(o)*a,r=Math.sin(o)*a}else if(i<.85){let o=Math.random()*Math.PI*2,a=1.62+(Math.random()-.5)*.18;s=Math.cos(o)*a,r=Math.sin(o)*a}else{let o=Math.random()*Math.PI*2,a=1.5*Math.sqrt(Math.random());s=Math.cos(o)*a,r=Math.sin(o)*a}t[e*3]=s,t[e*3+1]=r,t[e*3+2]=(Math.random()-.5)*.5}return t}function ag(n,t={}){let e=new vr({canvas:n,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});n.addEventListener("webglcontextlost",Z=>{Z.preventDefault(),e.setAnimationLoop(null),t.onFatal&&t.onFatal()});let i=new Mr;i.fog=new Al(657931,13,46);let s=new Le(42,1,.1,100),r=new Ue;s.position.set(0,2,7.2),r.add(s),i.add(r),i.add(new wr(3947588,1.2));let o=new Er(16773862,1.6);o.position.set(5,8,5),i.add(o);let a=new Ue;a.position.y=1.95,i.add(a);let l=6500,c=new Float32Array(l*3),h=Fb(l),u=new Float32Array(l*3),f=new Float32Array(l*3),p=new Float32Array(l),g=new Float32Array(l),y=new Float32Array(l*3);for(let Z=0;Z<l;Z++){p[Z]=Math.random()*100,g[Z]=Math.random()*.55;let bt=Math.random()*Math.PI*2,at=1.4+Math.random()*1.5;c[Z*3]=Math.cos(bt)*at*1.35,c[Z*3+1]=Math.sin(bt)*at*.95,c[Z*3+2]=(Math.random()-.5)*2.2;let w=Math.random();w<.8?(y[Z*3]=.92,y[Z*3+1]=.3,y[Z*3+2]=.32):w<.95?(y[Z*3]=1,y[Z*3+1]=.62,y[Z*3+2]=.64):(y[Z*3]=1,y[Z*3+1]=.93,y[Z*3+2]=.93)}let m=new Float32Array(l*3),d=new Float32Array(l),b=new Uint8Array(l),S=new Uint8Array(l),_=new Float32Array(y),C=new Me;C.setAttribute("position",new Ne(c,3)),C.setAttribute("color",new Ne(y,3));let A=new br({size:.085,vertexColors:!0,transparent:!0,opacity:1,blending:hi,depthWrite:!1,map:Gu(),sizeAttenuation:!0}),I=new yo(C,A);a.add(I);let P=new Ue;a.add(P);let M=new tn({color:1776417,metalness:.55,roughness:.4}),v=new Wn({color:ms,transparent:!0,opacity:.95}),L=new tn({color:10124095,metalness:.9,roughness:.3}),G=()=>new Hn({color:16737129,transparent:!0,opacity:.6,blending:hi,depthWrite:!1}),X=[],Q=[],B=[],D=[];function V(Z){let bt=new ki(new Me().setFromPoints([Z.clone(),new F(0,0,0)]),new Wn({color:ms,transparent:!0,opacity:.18}));return P.add(bt),Q.push(bt.material),bt}{let Z=new Ue,bt=new Ye(.22,.22,.22),at=[[-.2,-.12,0],[0,.06,.1],[.2,.24,.02]];for(let x=0;x<3;x++){let O=new Yt(bt,M);if(O.position.set(...at[x]),O.add(new pn(new mn(bt),v)),Z.add(O),x>0){let et=new ki(new Me().setFromPoints([new F(...at[x-1]),new F(...at[x])]),new Wn({color:ms,transparent:!0,opacity:.6}));Z.add(et)}}let w=new Yt(new ds(.045,10,10),G());w.position.set(.2,.24,.02),Z.add(w),X.push(w.material),Z.position.set(2.35,.55,0),Z.userData.spin={x:.3,y:.5,z:.1},P.add(Z),V(Z.position),B.push(Z)}{let Z=new Ue,bt=new Yt(new Ye(.5,.14,.36),M);Z.add(bt),Z.add(new pn(new mn(bt.geometry),v));for(let w=0;w<4;w++){let x=new Yt(new Ye(.07,.05,.08),L);x.position.set(-.19+w*.13,.09,.13),Z.add(x);let O=x.clone();O.position.z=-.13,Z.add(O)}let at=new Yt(new ds(.05,10,10),G());at.position.y=.1,Z.add(at),X.push(at.material),Z.position.set(0,-.35,2.45),Z.userData.spin={x:.15,y:.6,z:0},P.add(Z),V(Z.position),B.push(Z)}{let Z=new Ue,bt=new Yt(new Vi(.26,.28,.2,24),M);Z.add(bt);let at=new Yt(new Hi(.27,.012,8,40),new Hn({color:ms,transparent:!0,opacity:.8}));at.rotation.x=Math.PI/2,at.position.y=.11,Z.add(at);let w=new Yt(new ds(.045,10,10),G());w.position.y=.16,Z.add(w),X.push(w.material),Z.position.set(-2.4,.25,.4),Z.userData.spin={x:.1,y:.7,z:.2},P.add(Z),V(Z.position),B.push(Z)}{let Z=new Ue,bt=new Yt(new Hi(.24,.014,10,48),new tn({color:2763827,metalness:.7,roughness:.3,emissive:ms,emissiveIntensity:.4}));Z.add(bt);for(let w=0;w<8;w++){let x=w/8*Math.PI*2,O=new Yt(new Ye(.016,.07,.016),new Hn({color:ms,transparent:!0,opacity:.9}));O.position.set(Math.cos(x)*.31,Math.sin(x)*.31,0),O.rotation.z=x+Math.PI/2,Z.add(O)}let at=new Yt(new ds(.05,10,10),G());Z.add(at),X.push(at.material),Z.position.set(-.3,-.6,-2.3),Z.userData.spin={x:.5,y:.3,z:.4},P.add(Z),V(Z.position),B.push(Z)}for(let Z of B)D.push({act:0,hits:0,kickT:0,baseY:Z.position.y});let E=new F,R=B.map(()=>new F),U=new Yt(new Dl(1.62,1.72,72),new Hn({color:ms,transparent:!0,opacity:0,blending:hi,depthWrite:!1,side:Tn}));a.add(U);let q=new go(new Sr({map:Gu("255,170,173,"),transparent:!0,opacity:0,blending:hi,depthWrite:!1}));q.scale.set(5.2,5.2,1),a.add(q);let nt=new Yt(new Hi(1.85,.012,8,96),new Hn({color:16737129,transparent:!0,opacity:0,blending:hi,depthWrite:!1}));a.add(nt);let ct=40,k=new Float32Array(ct*3);for(let Z=0;Z<ct;Z++)k[Z*3]=(Math.random()-.5)*12,k[Z*3+1]=(Math.random()-.5)*7+2,k[Z*3+2]=(Math.random()-.5)*6-2;let $=new Me;$.setAttribute("position",new Ne(k,3)),i.add(new yo($,new br({color:9080732,size:.028,transparent:!0,opacity:.3,depthWrite:!1})));let st=new go(new Sr({map:Gu(),transparent:!0,opacity:.3,blending:hi,depthWrite:!1}));st.scale.set(9,6.5,1),st.position.set(0,2,-6),i.add(st);let ot=0,Y=0,ft=0,mt=0;zl||addEventListener("pointermove",Z=>{ft=(Z.clientX/innerWidth-.5)*2,mt=(Z.clientY/innerHeight-.5)*2},{passive:!0});function Bt(){let Z=n.clientWidth,bt=n.clientHeight;e.setSize(Z,bt,!1),s.aspect=Z/bt;let at=Z/bt>1.05;a.position.set(at?1.15:0,at?1.95:1.45,0),a.scale.setScalar(at?1:.88),P.scale.setScalar(at?1:.52),s.updateProjectionMatrix()}Bt(),new ResizeObserver(Bt).observe(n);let Lt=!0;new IntersectionObserver(([Z])=>{Lt=Z.isIntersecting},{threshold:.02}).observe(n);let Ot=new Ar,N=-1,Kt=Z=>1-Math.pow(1-Z,3);function At(){let Z=Math.min(Ot.getDelta(),.05),bt=Ot.elapsedTime,at=zl?{id:2,t:.5}:Nb(bt);if(at.id===1&&N!==1&&u.set(c),at.id===3&&N!==3)for(let J=0;J<l;J++){let ht=h[J*3],K=h[J*3+1],dt=Math.max(.001,Math.hypot(ht,K));f[J*3]=ht/dt*(1.4+Math.random()*1.6),f[J*3+1]=K/dt*(1.4+Math.random()*1.6),f[J*3+2]=(Math.random()-.5)*1.4}N=at.id,ot+=(ft-ot)*Math.min(Z*4,1),Y+=(mt-Y)*Math.min(Z*4,1),r.rotation.y=ot*.07,r.rotation.x=Y*.028,s.position.x=ot*.36,s.lookAt(a.position.x*.5,a.position.y,0);let w=a.position.x+ot*2.6,x=a.position.y-Y*1.5,O=at.id===2?Math.max(0,1-at.t*3.2):0,et=at.id===2?.55+Math.sin(bt*3)*.1:0;if(O>.01){let J=.6+O*5.5;U.scale.setScalar(J),U.material.opacity=.75*O,U.quaternion.copy(s.quaternion),q.material.opacity=.85*O,A.size=.085+O*.075}else U.material.opacity=0,q.material.opacity=0,A.size=at.id===2?.105:.085;let rt=at.id===2?Math.min(1,at.t*2.4):at.id===3?Math.max(0,1-at.t*4):0;P.rotation.y=bt*.09;for(let J=0;J<B.length;J++){let ht=B[J],K=D[J];K.kickT*=Math.exp(-Z*3.2),K.act+=(K.hits*14-K.act)*Math.min(1,Z*4),K.hits=0;let dt=1+K.kickT*.32;ht.scale.setScalar(dt),ht.position.y=K.baseY+Math.sin(bt*1.1+J*2.1)*.08;let Nt=.35*(1+K.act*3+K.kickT*2);ht.rotation.x+=ht.userData.spin.x*Z*Nt,ht.rotation.y+=ht.userData.spin.y*Z*Nt,ht.rotation.z+=ht.userData.spin.z*Z*Nt,X[J].opacity=Math.min(1,.35+K.act*.7+K.kickT*.5+rt*.45),Q[J].opacity=Math.min(1,.1+K.act*.5+rt*.5)}if(nt.material.opacity=rt,nt.rotation.z+=Z*.15,A.opacity=at.id===2?1:.92,!zl){for(let ht=0;ht<l;ht++){let K=ht*3,dt=p[ht];if(at.id===0&&S[ht]){c[K]+=m[K]*Z,c[K+1]+=m[K+1]*Z,c[K+2]+=m[K+2]*Z;let Nt=Math.exp(-Z*1.15);m[K]*=Nt,m[K+1]*=Nt,m[K+2]*=Nt,m[K]*m[K]+m[K+1]*m[K+1]+m[K+2]*m[K+2]<.09&&(S[ht]=0)}else if(at.id===0){let Nt=c[K],ut=c[K+1],vt=c[K+2],Et=Math.sin(ut*1.35+bt*.45+dt)*.34+Math.sin(vt*.8+bt*.2)*.12,Ft=Math.sin(vt*1.1+bt*.35+dt*1.7)*.3-.03,_t=Math.sin(Nt*.9+bt*.3+dt*.6)*.16,Mt=-1,wt=1e9,ee=0,z=0,gt=0;for(let kt=0;kt<R.length;kt++){let _e=Nt-R[kt].x,Ie=ut-R[kt].y,Yn=vt-R[kt].z,Be=_e*_e+Ie*Ie+Yn*Yn;Be<wt&&(wt=Be,Mt=kt,ee=_e,z=Ie,gt=Yn)}let it=1.05;if(wt<it*it){let kt=Math.sqrt(wt),_e=ee/kt,Ie=z/kt,Yn=gt/kt;if(kt<.18){d[ht]=1,b[ht]=1,S[ht]=1;let Be=1.9+Math.random()*1.4,nn=Math.max(.3,Math.hypot(R[Mt].x,R[Mt].y,R[Mt].z));m[K]=-R[Mt].x/nn*Be,m[K+1]=-R[Mt].y/nn*Be,m[K+2]=-R[Mt].z/nn*Be,D[Mt].hits++,D[Mt].kickT=1}else{let Be=(it-kt)*1.9*Z,nn=Ie,Br=-Yn*.4-_e*.2,ic=Ie*.4-Ie*0;Et-=_e*Be*5,Ft-=Ie*Be*5,_t-=Yn*Be*5,Et+=nn*Be*3,Ft+=Br*Be*3,_t+=_e*.5*Be*3}}c[K]+=Et*Z,c[K+1]+=Ft*Z,c[K+2]+=_t*Z;let lt=c[K]*.42,xt=c[K+1]*.55;lt*lt+xt*xt>1&&(c[K]-=lt*.02*Z*60*.016,c[K+1]-=xt*.02*Z*60*.016);let zt=c[K]-w+a.position.x,le=c[K+1]-x,Te=zt*zt+le*le;if(Te<1.2){let kt=(1.2-Te)*.9*Z,_e=Math.max(.05,Math.sqrt(Te));c[K]+=zt/_e*kt,c[K+1]+=le/_e*kt}}else if(at.id===1){let Nt=Math.min(1,Math.max(0,(at.t-g[ht]*.5)/.5)),ut=Kt(Nt);c[K]=u[K]+(h[K]-u[K])*ut,c[K+1]=u[K+1]+(h[K+1]-u[K+1])*ut,c[K+2]=u[K+2]+(h[K+2]-u[K+2])*ut}else at.id===2?(c[K]=h[K]+Math.sin(bt*2.6+dt)*.012,c[K+1]=h[K+1]+Math.cos(bt*2.2+dt*1.3)*.012,c[K+2]=h[K+2]+Math.sin(bt*1.8+dt)*.012*1.5):(c[K]+=f[K]*Z*2.1,c[K+1]+=f[K+1]*Z*2.1,c[K+2]+=f[K+2]*Z*2.1)}for(let ht=0;ht<B.length;ht++)B[ht].getWorldPosition(E),a.worldToLocal(E),R[ht].copy(E);let J=C.attributes.color;for(let ht=0;ht<l;ht++){if(!b[ht])continue;d[ht]*=Math.exp(-Z*.32);let K=d[ht],dt=ht*3;if(K<.02)b[ht]=0,J.array[dt]=_[dt],J.array[dt+1]=_[dt+1],J.array[dt+2]=_[dt+2];else{let Nt=1+K*2.2;J.array[dt]=Math.min(1,_[dt]*Nt+K*.5),J.array[dt+1]=Math.min(1,_[dt+1]*Nt+K*.45),J.array[dt+2]=Math.min(1,_[dt+2]*Nt+K*.45)}}J.needsUpdate=!0,C.attributes.position.needsUpdate=!0}e.render(i,s)}let It=0;return Lb&&(window.__heroDebug={scene:i,camera:s,renderer:e,get running(){return Lt},get frames(){return It}}),zl?(c.set(h),C.attributes.position.needsUpdate=!0,nt.material.opacity=.8,At()):e.setAnimationLoop(()=>{Lt&&!document.hidden&&(It++,At())}),{getFrames:()=>It,dispose(){e.setAnimationLoop(null)}}}var vo=new F;function gn(n,t,e,i,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;vo.copy(t),vo[i]=0,vo.normalize();let c=.5*o/(o+a),h=1-vo.angleTo(n)/l;return Math.sign(vo[e])===1?h*c:a/(o+a)+c+c*(1-h)}var fi=class extends Ye{constructor(t=1,e=1,i=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,i/2,r),super(1,1,1,s,s,s),s===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let a=new F,l=new F,c=new F(t,e,i).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,p=h.length/6,g=new F,y=.5/s;for(let m=0,d=0;m<h.length;m+=3,d+=2)switch(a.fromArray(h,m),l.copy(a),l.x-=Math.sign(l.x)*y,l.y-=Math.sign(l.y)*y,l.z-=Math.sign(l.z)*y,l.normalize(),h[m+0]=c.x*Math.sign(a.x)+l.x*r,h[m+1]=c.y*Math.sign(a.y)+l.y*r,h[m+2]=c.z*Math.sign(a.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/p)){case 0:g.set(1,0,0),f[d+0]=gn(g,l,"z","y",r,i),f[d+1]=1-gn(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),f[d+0]=1-gn(g,l,"z","y",r,i),f[d+1]=1-gn(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),f[d+0]=1-gn(g,l,"x","z",r,t),f[d+1]=gn(g,l,"z","x",r,i);break;case 3:g.set(0,-1,0),f[d+0]=1-gn(g,l,"x","z",r,t),f[d+1]=1-gn(g,l,"z","x",r,i);break;case 4:g.set(0,0,1),f[d+0]=1-gn(g,l,"x","y",r,t),f[d+1]=1-gn(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),f[d+0]=gn(g,l,"x","y",r,t),f[d+1]=1-gn(g,l,"y","x",r,e);break}}};var kl=matchMedia("(prefers-reduced-motion: reduce)").matches,mL=new URLSearchParams(location.search).has("debug"),gs=15026253;function lg(n,t,e,i){let s=new vr({canvas:t,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});s.setPixelRatio(Math.min(devicePixelRatio,2));let r=new Mr,o=new Le(36,1,.1,60);o.position.set(3.4,2.6,5),r.add(o),r.add(new wr(3421242,1.7));let a=new Er(16773604,3.2);a.position.set(4,6,5),r.add(a);let l=new Nl(gs,80,16);l.position.set(-3.5,1.5,-3),r.add(l);let c=()=>new Wn({color:gs,transparent:!0,opacity:1}),h=()=>new tn({color:1776417,metalness:.45,roughness:.42,transparent:!0,opacity:1}),u=new Ue;r.add(u);let f=[],p=new Ue;u.add(p);function g(B,D,V){let E=new Ue;return B(E),E.position.y=D,E.userData={baseY:D,mats:[],edges:[],anchor:new F(V[0],D,V[2]),op:1},E.traverse(R=>{R.isMesh&&R.material.transparent!==void 0&&(R.material=R.material.clone(),E.userData.mats.push(R.material)),R.isLineSegments&&(R.material=R.material.clone(),E.userData.edges.push(R.material))}),p.add(E),f.push(E),E}g(B=>{let D=new Yt(new fi(1.15,.34,1.15,3,.05),h());B.add(D),B.add(new pn(new mn(D.geometry,22),c()));let V=new Yt(new Vi(.17,.17,.07,24),new tn({color:gs,emissive:gs,emissiveIntensity:1.5,transparent:!0}));V.position.y=.21,B.add(V),B.userData.seal=V.material},1.62,[.6,0,.6]),g(B=>{let D=new Yt(new fi(2.25,.18,1.65,3,.04),h());B.add(D),B.add(new pn(new mn(D.geometry,22),c()));let V=new tn({color:6974066,metalness:.85,roughness:.3,transparent:!0});for(let E=0;E<10;E++){let R=new Yt(new Vi(.045,.045,.09,10),V);R.position.set(-.9+E%5*.45,.13,E<5?-.45:.45),B.add(R)}},1.32,[1.2,0,.9]),g(B=>{let D=new Yt(new fi(2,.34,1.3,3,.05),h());B.add(D),B.add(new pn(new mn(D.geometry,22),c()));let V=new fi(.24,.24,.24,2,.04);for(let E=0;E<5;E++){let R=new Yt(V,h());R.position.set(-.72+E*.36,.28,0),B.add(R);let U=new pn(new mn(V),c());if(R.add(U),E>0){let q=new ki(new Me().setFromPoints([new F(-.72+(E-1)*.36,.28,0),new F(-.72+E*.36,.28,0)]),new Wn({color:gs,transparent:!0,opacity:.45}));B.add(q)}}},.98,[1.05,0,.7]),g(B=>{let D=new Yt(new fi(1.5,.26,1.1,3,.04),h());B.add(D),B.add(new pn(new mn(D.geometry,22),c()));let V=new tn({color:10124095,metalness:.9,roughness:.35,transparent:!0});for(let R=0;R<12;R++){let U=new Yt(new Ye(.14,.05,.16),V);U.position.set(-.62+R%6*.25,.15,R<6?-.4:.4),B.add(U)}let E=new Yt(new Ye(.4,.09,.4),new tn({color:657932,metalness:.6,roughness:.2,transparent:!0}));E.position.y=.17,B.add(E)},.62,[.8,0,.6]),g(B=>{let D=new Yt(new fi(2.5,.55,1.9,3,.06),h());B.add(D),B.add(new pn(new mn(D.geometry,22),c()));let V=new Yt(new Vi(.55,.55,.06,36),new tn({color:5658208,metalness:.85,roughness:.25,transparent:!0}));V.position.set(-.6,.3,0),B.add(V);let E=new Yt(new Hi(.55,.015,8,48),new tn({color:gs,emissive:gs,emissiveIntensity:.9,transparent:!0}));E.rotation.x=Math.PI/2,E.position.set(.6,.3,0),B.add(E),B.userData.ring=E},0,[1.3,0,1]),u.position.y=-.9;let y=[3.1,1.9,1.05,.45,0];function m(){let B=t.clientWidth,D=t.clientHeight;s.setSize(B,D,!1),o.aspect=B/D,o.updateProjectionMatrix();let V=Math.min(1,B/640);u.scale.setScalar(1.05+V*.35)}m(),new ResizeObserver(m).observe(t);let d=[...i.querySelectorAll(".chip")],b=[...n.querySelectorAll(".step")],S=-1;function _(B){B!==S&&(S=B,b.forEach(D=>D.classList.toggle("active",+D.dataset.layer===B)),d.forEach(D=>D.classList.toggle("active",+D.dataset.layer===B)))}if(kl)_(1);else{let B=new IntersectionObserver(D=>{for(let V of D)V.isIntersecting&&_(+V.target.dataset.layer)},{rootMargin:"-42% 0px -42% 0px"});b.forEach(D=>B.observe(D))}let A=document.createElementNS("http://www.w3.org/2000/svg","line");e.appendChild(A);let I=matchMedia("(max-width: 900px)").matches;function P(){if(I||S<0){A.setAttribute("opacity","0");return}let B=i.querySelector(".chip.active");if(!B)return;let D=B.getBoundingClientRect(),V=t.getBoundingClientRect(),E=D.right-V.left,R=D.top+D.height/2-V.top,U=f[S].userData.anchor.clone();f[S].getWorldPosition,f[S].localToWorld(U),U.project(o);let q=(U.x*.5+.5)*V.width,nt=(-U.y*.5+.5)*V.height;A.setAttribute("x1",E),A.setAttribute("y1",R),A.setAttribute("x2",q),A.setAttribute("y2",nt),A.setAttribute("opacity","0.55")}let M=B=>B*B*(3-2*B),v=0,L=0,G=!0;new IntersectionObserver(([B])=>{G=B.isIntersecting},{threshold:.02}).observe(t);let X=new Ar;function Q(){let B=Math.min(X.getDelta(),.05),D=X.elapsedTime,V=n.getBoundingClientRect(),E=innerHeight,R=V.height-E;L=R>0?Math.min(1,Math.max(0,-V.top/R)):0,v+=(L-v)*Math.min(B*6,1);let U=kl?.35:M(v);for(let q=0;q<f.length;q++){let nt=f[q],ct=y[q];nt.position.y=nt.userData.baseY+ct*U,nt.position.x=(q%2===0?-1:1)*U*.28;let k=S<0||S===q?1:.22;nt.userData.op+=(k-nt.userData.op)*Math.min(B*8,1);let $=nt.userData.op;for(let st of nt.userData.mats)st.opacity=$;for(let st of nt.userData.edges)st.opacity=.8*$;nt.userData.seal&&(nt.userData.seal.emissiveIntensity=(1.2+Math.sin(D*2.5)*.5)*$),nt.userData.ring&&(nt.userData.ring.material.emissiveIntensity=(.7+Math.sin(D*1.8)*.3)*$)}p.rotation.y=(kl?.5:D*.12)+U*1.2,o.position.set(3.4,2.4+U*.7,5-U*.5),o.lookAt(0,.9+U*.5,0),s.render(r,o),P()}return kl?Q():s.setAnimationLoop(()=>{G&&!document.hidden&&Q()}),{dispose(){s.setAnimationLoop(null)}}}var qn=typeof window<"u",Wu=qn?window:null,Fr=qn?document:null,ye={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},Qt={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},xn={NONE:0,AUTO:1,FORCE:2},Ze={replace:0,none:1,blend:2},cg=Symbol(),ed=Symbol(),Sg=Symbol(),jl=Symbol();var Ob=Symbol(),ae=1e-11,bg=1e12,_s=1e3,$u=120,qi="",wo=new Map;wo.set("x","translateX");wo.set("y","translateY");wo.set("z","translateZ");var nd=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],Tg=nd.reduce((n,t)=>({...n,[t]:t+"("}),{}),en=()=>{},Bb=/(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,zb=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,kb=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,Vb=/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,Hb=/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,hg=/[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,Eg=/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,Gb=/([a-z])([A-Z])/g,Wb=/(\w+)(\([^)]+\)+)/g,Xb=/(\*=|\+=|-=)/,wg={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:$u,loop:0,reversed:!1,alternate:!1,autoplay:!0,duration:_s,delay:0,loopDelay:0,ease:"out(2)",composition:Ze.replace,modifier:n=>n,onBegin:en,onBeforeUpdate:en,onUpdate:en,onLoop:en,onPause:en,onComplete:en,onRender:en},Se={defaults:wg,root:Fr,scope:null,precision:4,timeScale:1,tickThreshold:200},Ag={version:"4.0.2",engine:null};qn&&(Wu.AnimeJS||(Wu.AnimeJS=[]),Wu.AnimeJS.push(Ag));var qb=n=>n.replace(Gb,"$1-$2").toLowerCase(),xs=(n,t)=>n.indexOf(t)===0,bo=Date.now,vs=Array.isArray,Xu=n=>n&&n.constructor===Object,id=n=>typeof n=="number"&&!isNaN(n),tc=n=>typeof n=="string",$l=n=>typeof n=="function",Jt=n=>typeof n>"u",Wl=n=>Jt(n)||n===null,Rg=n=>qn&&n instanceof SVGElement,Cg=n=>Bb.test(n),Pg=n=>xs(n,"rgb"),Ig=n=>xs(n,"hsl"),Yb=n=>Cg(n)||Pg(n)||Ig(n),Xl=n=>!Se.defaults.hasOwnProperty(n),ys=n=>tc(n)?parseFloat(n):n,Ir=Math.pow,Dg=Math.sqrt,$b=Math.sin,Zb=Math.cos,To=Math.abs;var Kb=Math.ceil,Eo=Math.floor,Jb=Math.asin,Qb=Math.max;var Ao=Math.PI,Zu=Math.round,Oe=(n,t,e)=>n<t?t:n>e?e:n,ug={},xe=(n,t)=>{if(t<0)return n;if(!t)return Zu(n);let e=ug[t];return e||(e=ug[t]=10**t),Zu(n*e)/e},jb=(n,t)=>vs(t)?t.reduce((e,i)=>To(i-n)<To(e-n)?i:e):t?Zu(n/t)*t:n,Xi=(n,t,e)=>n+(t-n)*e,sd=n=>n===1/0?bg:n===-1/0?-1e12:n,So=n=>n<=ae?ae:sd(xe(n,11)),$e=n=>vs(n)?[...n]:n,tT=(n,t)=>{let e={...n};for(let i in t){let s=n[i];e[i]=Jt(s)?t[i]:s}return e},be=(n,t,e,i="_prev",s="_next")=>{let r=n._head,o=s;for(e&&(r=n._tail,o=i);r;){let a=r[o];t(r),r=a}},Yi=(n,t,e="_prev",i="_next")=>{let s=t[e],r=t[i];s?s[i]=r:n._head=r,r?r[e]=s:n._tail=s,t[e]=null,t[i]=null},Ur=(n,t,e,i="_prev",s="_next")=>{let r=n._tail;for(;r&&e&&e(r,t);)r=r[i];let o=r?r[s]:n._head;r?r[s]=t:n._head=t,o?o[i]=t:n._tail=t,t[i]=r,t[s]=o},Zl=class{constructor(t=0){this.deltaTime=0,this._currentTime=t,this._elapsedTime=t,this._startTime=t,this._lastTime=t,this._scheduledTime=0,this._frameDuration=xe(_s/$u,0),this._fps=$u,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(t){let e=this._frameDuration,i=+t,s=i<ae?ae:i,r=xe(_s/s,0);this._fps=s,this._frameDuration=r,this._scheduledTime+=r-e}get speed(){return this._speed}set speed(t){let e=+t;this._speed=e<ae?ae:e}requestTick(t){let e=this._scheduledTime,i=this._elapsedTime;if(this._elapsedTime+=t-i,i<e)return xn.NONE;let s=this._frameDuration,r=i-e;return this._scheduledTime+=r<s?s:r,xn.AUTO}computeDeltaTime(t){let e=t-this._lastTime;return this.deltaTime=e,this._lastTime=t,e}},ql=(n,t,e,i,s)=>{let r=n.parent,o=n.duration,a=n.completed,l=n.iterationDuration,c=n.iterationCount,h=n._currentIteration,u=n._loopDelay,f=n._reversed,p=n._alternate,g=n._hasChildren,y=n._delay,m=n._currentTime,d=y+l,b=t-y,S=Oe(m,-y,o),_=Oe(b,-y,o),C=b-m,A=_>0,I=_>=o,P=o<=ae,M=s===xn.FORCE,v=0,L=b,G=0;if(c>1){let V=~~(_/(l+(I?0:u)));n._currentIteration=Oe(V,0,c),I&&n._currentIteration--,v=n._currentIteration%2,L=_%(l+u)||0}let X=f^(p&&v),Q=n._ease,B=I?X?0:o:X?l-L:L;Q&&(B=l*Q(B/l)||0);let D=(r?r.backwards:b<m)?!X:!!X;if(n._currentTime=b,n._iterationTime=B,n.backwards=D,A&&!n.began?(n.began=!0,!e&&!(r&&(D||!r.began))&&n.onBegin(n)):b<=0&&(n.began=!1),!e&&!g&&A&&n._currentIteration!==h&&n.onLoop(n),M||s===xn.AUTO&&(t>=y&&t<=d||t<=y&&S>y||t>=d&&S!==o)||B>=d&&S!==o||B<=y&&S>0||t<=S&&S===o&&a||I&&!a&&P){if(A&&(n.computeDeltaTime(S),e||n.onBeforeUpdate(n)),!g){let V=M||(D?C*-1:C)>=Se.tickThreshold,E=n._offset+(r?r._offset:0)+y+B,R=n._head,U,q,nt,ct,k=0;for(;R;){let $=R._composition,st=R._currentTime,ot=R._changeDuration,Y=R._absoluteStartTime+R._changeDuration,ft=R._nextRep,mt=R._prevRep,Bt=$!==Ze.none;if((V||(st!==ot||E<=Y+(ft?ft._delay:0))&&(st!==0||E>=R._absoluteStartTime))&&(!Bt||!R._isOverridden&&(!R._isOverlapped||E<=Y)&&(!ft||ft._isOverridden||E<=ft._absoluteStartTime)&&(!mt||mt._isOverridden||E>=mt._absoluteStartTime+mt._changeDuration+R._delay))){let Lt=R._currentTime=Oe(B-R._startTime,0,ot),Ot=R._ease(Lt/R._updateDuration),N=R._modifier,Kt=R._valueType,At=R._tweenType,It=At===ye.OBJECT,Z=Kt===Qt.NUMBER,bt=Z&&It||Ot===0||Ot===1?-1:Se.precision,at,w;if(Z)at=w=N(xe(Xi(R._fromNumber,R._toNumber,Ot),bt));else if(Kt===Qt.UNIT)w=N(xe(Xi(R._fromNumber,R._toNumber,Ot),bt)),at=`${w}${R._unit}`;else if(Kt===Qt.COLOR){let x=R._fromNumbers,O=R._toNumbers,et=xe(Oe(N(Xi(x[0],O[0],Ot)),0,255),0),rt=xe(Oe(N(Xi(x[1],O[1],Ot)),0,255),0),J=xe(Oe(N(Xi(x[2],O[2],Ot)),0,255),0),ht=Oe(N(xe(Xi(x[3],O[3],Ot),bt)),0,1);if(at=`rgba(${et},${rt},${J},${ht})`,Bt){let K=R._numbers;K[0]=et,K[1]=rt,K[2]=J,K[3]=ht}}else if(Kt===Qt.COMPLEX){at=R._strings[0];for(let x=0,O=R._toNumbers.length;x<O;x++){let et=N(xe(Xi(R._fromNumbers[x],R._toNumbers[x],Ot),bt)),rt=R._strings[x+1];at+=`${rt?et+rt:et}`,Bt&&(R._numbers[x]=et)}}if(Bt&&(R._number=w),!i&&$!==Ze.blend){let x=R.property;U=R.target,It?U[x]=at:At===ye.ATTRIBUTE?U.setAttribute(x,at):(q=U.style,At===ye.TRANSFORM?(U!==nt&&(nt=U,ct=U[jl]),ct[x]=at,k=1):At===ye.CSS?q[x]=at:At===ye.CSS_VAR&&q.setProperty(x,at)),A&&(G=1)}else R._value=at}if(k&&R._renderTransforms){let Lt=qi;for(let Ot in ct)Lt+=`${Tg[Ot]}${ct[Ot]}) `;q.transform=Lt,k=0}R=R._next}!e&&G&&n.onRender(n)}!e&&A&&n.onUpdate(n)}return r&&P?!e&&(r.began&&!D&&b>=o&&!a||D&&b<=ae&&a)&&(n.onComplete(n),n.completed=!D):A&&I?c===1/0?n._startTime+=n.duration:n._currentIteration>=c-1&&(n.paused=!0,!a&&!g&&(n.completed=!0,!e&&!(r&&(D||!r.began))&&(n.onComplete(n),n._resolve(n)))):n.completed=!1,G},Dr=(n,t,e,i,s)=>{let r=n._currentIteration;if(ql(n,t,e,i,s),n._hasChildren){let o=n,a=o.backwards,l=i?t:o._iterationTime,c=bo(),h=0,u=!0;if(!i&&o._currentIteration!==r){let f=o.iterationDuration;be(o,p=>{if(!a)!p.completed&&!p.backwards&&p._currentTime<p.iterationDuration&&ql(p,f,e,1,xn.FORCE),p.began=!1,p.completed=!1;else{let g=p.duration,y=p._offset+p._delay,m=y+g;!e&&g<=ae&&(!y||m===f)&&p.onComplete(p)}}),e||o.onLoop(o)}be(o,f=>{let p=xe((l-f._offset)*f._speed,12),g=f._fps<o._fps?f.requestTick(c):s;h+=ql(f,p,e,i,g),!f.completed&&u&&(u=!1)},a),!e&&h&&o.onRender(o),u&&o._currentTime>=o.duration&&(o.paused=!0,o.completed||(o.completed=!0,e||(o.onComplete(o),o._resolve(o))))}},Nr={animation:null,update:en},eT=n=>{let t=Nr.animation;return t||(t={duration:ae,computeDeltaTime:en,_offset:0,_delay:0,_head:null,_tail:null},Nr.animation=t,Nr.update=()=>{n.forEach(e=>{for(let i in e){let s=e[i],r=s._head;if(r){let o=r._valueType,a=o===Qt.COMPLEX||o===Qt.COLOR?$e(r._fromNumbers):null,l=r._fromNumber,c=s._tail;for(;c&&c!==r;){if(a)for(let h=0,u=c._numbers.length;h<u;h++)a[h]+=c._numbers[h];else l+=c._number;c=c._prevAdd}r._toNumber=l,r._toNumbers=a}}}),ql(t,1,1,0,xn.FORCE)}),t},Lg=qn?requestAnimationFrame:setImmediate,nT=qn?cancelAnimationFrame:clearImmediate,Ku=class extends Zl{constructor(t){super(t),this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=wg,this.paused=!!(qn&&Fr.hidden),this.reqId=null}update(){let t=this._currentTime=bo();if(this.requestTick(t)){this.computeDeltaTime(t);let e=this._speed,i=this._fps,s=this._head;for(;s;){let r=s._next;s.paused?(Yi(this,s),this._hasChildren=!!this._tail,s._running=!1,s.completed&&!s._cancelled&&s.cancel()):Dr(s,(t-s._startTime)*s._speed*e,0,0,s._fps<i?s.requestTick(t):xn.AUTO),s=r}Nr.update()}}wake(){return this.useDefaultMainLoop&&!this.reqId&&!this.paused&&(this.reqId=Lg(Ug)),this}pause(){return this.paused=!0,iT()}resume(){if(this.paused)return this.paused=!1,be(this,t=>t.resetTime()),this.wake()}get speed(){return this._speed*(Se.timeScale===1?1:_s)}set speed(t){this._speed=t*Se.timeScale,be(this,e=>e.speed=e._speed)}get timeUnit(){return Se.timeScale===1?"ms":"s"}set timeUnit(t){let i=t==="s",s=i?.001:1;if(Se.timeScale!==s){Se.timeScale=s,Se.tickThreshold=200*s;let r=i?.001:_s;this.defaults.duration*=r,this._speed*=r}}get precision(){return Se.precision}set precision(t){Se.precision=t}},Pe=(()=>{let n=new Ku(bo());return qn&&(Ag.engine=n,Fr.addEventListener("visibilitychange",()=>{n.pauseOnDocumentHidden&&(Fr.hidden?n.pause():n.resume())})),n})(),Ug=()=>{Pe._head?(Pe.reqId=Lg(Ug),Pe.update()):Pe.reqId=0},iT=()=>(nT(Pe.reqId),Pe.reqId=0,Pe),sT=(n,t,e)=>{let i=n.style.transform,s;if(i){let r=n[jl],o;for(;o=Wb.exec(i);){let a=o[1],l=o[2].slice(1,-1);r[a]=l,a===t&&(s=l,e&&(e[t]=l))}}return i&&!Jt(s)?s:xs(t,"scale")?"1":xs(t,"rotate")||xs(t,"skew")?"0deg":"0px"};function dg(n){let t=tc(n)?Se.root.querySelectorAll(n):n;if(t instanceof NodeList||t instanceof HTMLCollection)return t}function Ng(n){if(Wl(n))return[];if(vs(n)){let e=n.flat(1/0),i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];if(!Wl(o)){let a=dg(o);if(a)for(let l=0,c=a.length;l<c;l++){let h=a[l];if(!Wl(h)){let u=!1;for(let f=0,p=i.length;f<p;f++)if(i[f]===h){u=!0;break}u||i.push(h)}}else{let l=!1;for(let c=0,h=i.length;c<h;c++)if(i[c]===o){l=!0;break}l||i.push(o)}}}return i}if(!qn)return[n];let t=dg(n);return t?Array.from(t):[n]}function rd(n){let t=Ng(n),e=t.length;if(e)for(let i=0;i<e;i++){let s=t[i];if(!s[cg]){s[cg]=!0;let r=Rg(s);(s.nodeType||r)&&(s[ed]=!0,s[Sg]=r,s[jl]={})}}return t}var rT=["opacity","rotate","overflow","color"],oT=(n,t)=>{if(rT.includes(t))return!1;if(n.getAttribute(t)||t in n){if(t==="scale"){let e=n.parentNode;return e&&e.tagName==="filter"}return!0}};var aT=n=>{let t=zb.exec(n)||kb.exec(n),e=Jt(t[4])?1:+t[4];return[+t[1],+t[2],+t[3],e]},lT=n=>{let t=n.length,e=t===4||t===5;return[+("0x"+n[1]+n[e?1:2]),+("0x"+n[e?2:3]+n[e?2:4]),+("0x"+n[e?3:5]+n[e?3:6]),t===5||t===9?+(+("0x"+n[e?4:7]+n[e?4:8])/255).toFixed(3):1]},qu=(n,t,e)=>(e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*(2/3-e)*6:n),cT=n=>{let t=Vb.exec(n)||Hb.exec(n),e=+t[1]/360,i=+t[2]/100,s=+t[3]/100,r=Jt(t[4])?1:+t[4],o,a,l;if(i===0)o=a=l=s;else{let c=s<.5?s*(1+i):s+i-s*i,h=2*s-c;o=xe(qu(h,c,e+1/3)*255,0),a=xe(qu(h,c,e)*255,0),l=xe(qu(h,c,e-1/3)*255,0)}return[o,a,l,r]},hT=n=>Pg(n)?aT(n):Cg(n)?lT(n):Ig(n)?cT(n):[0,0,0,1],Ge=(n,t)=>Jt(n)?t:n,Gi=(n,t,e,i,s)=>{if($l(n)){let r=()=>{let o=n(t,e,i);return isNaN(+o)?o||0:+o};return s&&(s.func=r),r()}else return n},od=(n,t)=>n[ed]?n[Sg]&&oT(n,t)?ye.ATTRIBUTE:nd.includes(t)||wo.get(t)?ye.TRANSFORM:xs(t,"--")?ye.CSS_VAR:t in n.style?ye.CSS:t in n?ye.OBJECT:ye.ATTRIBUTE:ye.OBJECT,fg=(n,t,e)=>{let i=n.style[t];i&&e&&(e[t]=i);let s=i||getComputedStyle(n[Ob]||n).getPropertyValue(t);return s==="auto"?"0":s},Lr=(n,t,e,i)=>{let s=Jt(e)?od(n,t):e;return s===ye.OBJECT?n[t]||0:s===ye.ATTRIBUTE?n.getAttribute(t):s===ye.TRANSFORM?sT(n,t,i):s===ye.CSS_VAR?fg(n,t,i).trimStart():fg(n,t,i)},Ju=(n,t,e)=>e==="-"?n-t:e==="+"?n+t:n*t,ad=()=>({t:Qt.NUMBER,n:0,u:null,o:null,d:null,s:null}),Cn=(n,t)=>{if(t.t=Qt.NUMBER,t.n=0,t.u=null,t.o=null,t.d=null,t.s=null,!n)return t;let e=+n;if(isNaN(e)){let i=n;i[1]==="="&&(t.o=i[0],i=i.slice(2));let s=i.includes(" ")?!1:Eg.exec(i);if(s)return t.t=Qt.UNIT,t.n=+s[1],t.u=s[2],t;if(t.o)return t.n=+i,t;if(Yb(i))return t.t=Qt.COLOR,t.d=hT(i),t;{let r=i.match(hg);return t.t=Qt.COMPLEX,t.d=r?r.map(Number):[],t.s=i.split(hg)||[],t}}else return t.n=e,t},pg=(n,t)=>(t.t=n._valueType,t.n=n._toNumber,t.u=n._unit,t.o=null,t.d=$e(n._toNumbers),t.s=$e(n._strings),t),yn=ad(),Kl={_rep:new WeakMap,_add:new Map},ld=(n,t,e="_rep")=>{let i=Kl[e],s=i.get(n);return s||(s={},i.set(n,s)),s[t]?s[t]:s[t]={_head:null,_tail:null}},uT=(n,t)=>n._isOverridden||n._absoluteStartTime>t._absoluteStartTime,Yl=n=>{n._isOverlapped=1,n._isOverridden=1,n._changeDuration=ae,n._currentTime=ae},Fg=(n,t)=>{let e=n._composition;if(e===Ze.replace){let i=n._absoluteStartTime;Ur(t,n,uT,"_prevRep","_nextRep");let s=n._prevRep;if(s){let r=s.parent,o=s._absoluteStartTime+s._changeDuration;if(n.parent.id!==r.id&&r.iterationCount>1&&o+(r.duration-r.iterationDuration)>i){Yl(s);let c=s._prevRep;for(;c&&c.parent.id===r.id;)Yl(c),c=c._prevRep}let a=i-n._delay;if(o>a){let c=s._startTime,h=o-(c+s._updateDuration);s._changeDuration=a-h-c,s._currentTime=s._changeDuration,s._isOverlapped=1,s._changeDuration<ae&&Yl(s)}let l=!0;if(be(r,c=>{c._isOverlapped||(l=!1)}),l){let c=r.parent;if(c){let h=!0;be(c,u=>{u!==r&&be(u,f=>{f._isOverlapped||(h=!1)})}),h&&c.cancel()}else r.cancel()}}}else if(e===Ze.blend){let i=ld(n.target,n.property,"_add"),s=eT(Kl._add),r=i._head;r||(r={...n},r._composition=Ze.replace,r._updateDuration=ae,r._startTime=0,r._numbers=$e(n._fromNumbers),r._number=0,r._next=null,r._prev=null,Ur(i,r),Ur(s,r));let o=n._toNumber;if(n._fromNumber=r._fromNumber-o,n._toNumber=0,n._numbers=$e(n._fromNumbers),n._number=0,r._fromNumber=o,n._toNumbers){let a=$e(n._toNumbers);a&&a.forEach((l,c)=>{n._fromNumbers[c]=r._fromNumbers[c]-l,n._toNumbers[c]=0}),r._fromNumbers=a}Ur(i,n,null,"_prevAdd","_nextAdd")}return n},Og=n=>{let t=n._composition;if(t!==Ze.none){let e=n.target,i=n.property,o=Kl._rep.get(e)[i];if(Yi(o,n,"_prevRep","_nextRep"),t===Ze.blend){let a=Kl._add,l=a.get(e);if(!l)return;let c=l[i],h=Nr.animation;Yi(c,n,"_prevAdd","_nextAdd");let u=c._head;if(u&&u===c._tail){Yi(c,u,"_prevAdd","_nextAdd"),Yi(h,u);let f=!0;for(let p in l)if(l[p]._head){f=!1;break}f&&a.delete(e)}}}return n},mg=n=>(n.paused=!0,n.began=!1,n.completed=!1,n),Qu=n=>(n._cancelled&&(n._hasChildren?be(n,Qu):be(n,t=>{t._composition!==Ze.none&&Fg(t,ld(t.target,t.property))}),n._cancelled=0),n),dT=0,Jl=class extends Zl{constructor(t={},e=null,i=0){super(0);let{id:s,delay:r,duration:o,reversed:a,alternate:l,loop:c,loopDelay:h,autoplay:u,frameRate:f,playbackRate:p,onComplete:g,onLoop:y,onPause:m,onBegin:d,onBeforeUpdate:b,onUpdate:S}=t;Se.scope&&Se.scope.revertibles.push(this);let _=e?0:Pe._elapsedTime,C=e?e.defaults:Se.defaults,A=$l(r)||Jt(r)?C.delay:+r,I=$l(o)||Jt(o)?1/0:+o,P=Ge(c,C.loop),M=Ge(h,C.loopDelay),v=P===!0||P===1/0||P<0?1/0:P+1,L=0;if(e)L=i;else{let G=bo();Pe.paused&&(Pe.requestTick(G),G=Pe._elapsedTime),L=G-Pe._startTime}this.id=Jt(s)?++dT:s,this.parent=e,this.duration=sd((I+M)*v-M)||ae,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=d||C.onBegin,this.onBeforeUpdate=b||C.onBeforeUpdate,this.onUpdate=S||C.onUpdate,this.onLoop=y||C.onLoop,this.onPause=m||C.onPause,this.onComplete=g||C.onComplete,this.iterationDuration=I,this.iterationCount=v,this._autoplay=e?!1:Ge(u,C.autoplay),this._offset=L,this._delay=A,this._loopDelay=M,this._iterationTime=0,this._currentIteration=0,this._resolve=en,this._running=!1,this._reversed=+Ge(a,C.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=Ge(l,C.alternate),this._prev=null,this._next=null,this._elapsedTime=_,this._startTime=_,this._lastTime=_,this._fps=Ge(f,C.frameRate),this._speed=Ge(p,C.playbackRate)}get cancelled(){return!!this._cancelled}set cancelled(t){t?this.cancel():this.reset(1).play()}get currentTime(){return Oe(xe(this._currentTime,Se.precision),-this._delay,this.duration)}set currentTime(t){let e=this.paused;this.pause().seek(+t),e||this.resume()}get iterationCurrentTime(){return xe(this._iterationTime,Se.precision)}set iterationCurrentTime(t){this.currentTime=this.iterationDuration*this._currentIteration+t}get progress(){return Oe(xe(this._currentTime/this.duration,5),0,1)}set progress(t){this.currentTime=this.duration*t}get iterationProgress(){return Oe(xe(this._iterationTime/this.iterationDuration,5),0,1)}set iterationProgress(t){let e=this.iterationDuration;this.currentTime=e*this._currentIteration+e*t}get currentIteration(){return this._currentIteration}set currentIteration(t){this.currentTime=this.iterationDuration*Oe(+t,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(t){t?this.reverse():this.play()}get speed(){return super.speed}set speed(t){super.speed=t,this.resetTime()}reset(t=0){return Qu(this),this._reversed&&!this._reverse&&(this.reversed=!1),this._iterationTime=this.iterationDuration,Dr(this,0,1,t,xn.FORCE),mg(this),this._hasChildren&&be(this,mg),this}init(t=0){this.fps=this._fps,this.speed=this._speed,!t&&this._hasChildren&&Dr(this,this.duration,1,t,xn.FORCE),this.reset(t);let e=this._autoplay;return e===!0?this.resume():e&&!Jt(e.linked)&&e.link(this),this}resetTime(){let t=1/(this._speed*Pe._speed);return this._startTime=bo()-(this._currentTime+this._delay)*t,this}pause(){return this.paused?this:(this.paused=!0,this.onPause(this),this)}resume(){return this.paused?(this.paused=!1,this.duration<=ae&&!this._hasChildren?Dr(this,ae,0,0,xn.FORCE):(this._running||(Ur(Pe,this),Pe._hasChildren=!0,this._running=!0),this.resetTime(),this._startTime-=12,Pe.wake()),this):this}restart(){return this.reset(0).resume()}seek(t,e=0,i=0){Qu(this),this.completed=!1;let s=this.paused;return this.paused=!0,Dr(this,t+this._delay,~~e,~~i,xn.AUTO),s?this:this.resume()}alternate(){let t=this._reversed,e=this.iterationCount,i=this.iterationDuration,s=e===1/0?Eo(bg/i):e;return this._reversed=+(this._alternate&&!(s%2)?t:!t),e===1/0?this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress:this.seek(i*s-this._currentTime),this.resetTime(),this}play(){return this._reversed&&this.alternate(),this.resume()}reverse(){return this._reversed||this.alternate(),this.resume()}cancel(){return this._hasChildren?be(this,t=>t.cancel(),!0):be(this,Og),this._cancelled=1,this.pause()}stretch(t){let e=this.duration,i=So(t);if(e===i)return this;let s=t/e,r=t<=ae;return this.duration=r?ae:i,this.iterationDuration=r?ae:So(this.iterationDuration*s),this._offset*=s,this._delay*=s,this._loopDelay*=s,this}revert(){Dr(this,0,1,0,xn.AUTO);let t=this._autoplay;return t&&t.linked&&t.linked===this&&t.revert(),this.cancel()}complete(){return this.seek(this.duration).cancel()}then(t=en){let e=this.then,i=()=>{this.then=null,t(this),this.then=e,this._resolve=en};return new Promise(s=>(this._resolve=()=>s(i()),this.completed&&this._resolve(),this))}};var Or=n=>n,Bg=(n,t,e)=>(((1-3*e+3*t)*n+(3*e-6*t))*n+3*t)*n,fT=(n,t,e)=>{let i=0,s=1,r,o,a=0;do o=i+(s-i)/2,r=Bg(o,t,e)-n,r>0?s=o:i=o;while(To(r)>1e-7&&++a<100);return o},pT=(n=.5,t=0,e=.5,i=1)=>n===t&&e===i?Or:s=>s===0||s===1?s:Bg(fT(s,n,e),t,i),mT=(n=10,t)=>{let e=t?Kb:Eo;return i=>e(Oe(i,0,1)*n)*(1/n)},zg=(...n)=>{let t=n.length;if(!t)return Or;let e=t-1,i=n[0],s=n[e],r=[0],o=[ys(i)];for(let a=1;a<e;a++){let l=n[a],c=tc(l)?l.trim().split(" "):[l],h=c[0],u=c[1];r.push(Jt(u)?a/e:ys(u)/100),o.push(ys(h))}return o.push(ys(s)),r.push(1),function(l){for(let c=1,h=r.length;c<h;c++){let u=r[c];if(l<=u){let f=r[c-1],p=o[c-1];return p+(o[c]-p)*(l-f)/(u-f)}}return o[o.length-1]}},gT=(n=10,t=1)=>{let e=[0],i=n-1;for(let s=1;s<i;s++){let r=e[s-1],o=s/i,a=(s+1)/i,l=o+(a-o)*Math.random(),c=o*(1-t)+l*t;e.push(Oe(c,r,1))}return e.push(1),zg(...e)},yT=Ao/2,gg=Ao*2,Mo=(n=1.68)=>t=>Ir(t,+n),yg={[qi]:Mo,Quad:Mo(2),Cubic:Mo(3),Quart:Mo(4),Quint:Mo(5),Sine:n=>1-Zb(n*yT),Circ:n=>1-Dg(1-n*n),Expo:n=>n?Ir(2,10*n-10):0,Bounce:n=>{let t,e=4;for(;n<((t=Ir(2,--e))-1)/11;);return 1/Ir(4,3-e)-7.5625*Ir((t*3-2)/22-n,2)},Back:(n=1.70158)=>t=>(+n+1)*t*t*t-+n*t*t,Elastic:(n=1,t=.3)=>{let e=Oe(+n,1,10),i=Oe(+t,ae,2),s=i/gg*Jb(1/e),r=gg/i;return o=>o===0||o===1?o:-e*Ir(2,-10*(1-o))*$b((1-o-s)*r)}},ju={in:n=>t=>n(t),out:n=>t=>1-n(1-t),inOut:n=>t=>t<.5?n(t*2)/2:1-n(t*-2+2)/2,outIn:n=>t=>t<.5?(1-n(1-t*2))/2:(n(t*2-1)+1)/2},xT=(n,t,e)=>{if(e[n])return e[n];if(n.indexOf("(")<=-1){let s=ju[n]||n.includes("Back")||n.includes("Elastic")?t[n]():t[n];return s?e[n]=s:Or}else{let i=n.slice(0,-1).split("("),s=t[i[0]];return s?e[n]=s(...i[1].split(",")):Or}},_T=(()=>{let n={linear:zg,irregular:gT,steps:mT,cubicBezier:pT};for(let t in ju)for(let e in yg){let i=yg[e],s=ju[t];n[t+e]=e===qi||e==="Back"||e==="Elastic"?(r,o)=>s(i(r,o)):s(i)}return n})(),vT={linear:Or},td=n=>$l(n)?n:tc(n)?xT(n,_T,vT):Or,xg={},cd=(n,t,e)=>{if(e===ye.TRANSFORM){let i=wo.get(n);return i||n}else if(e===ye.CSS||e===ye.ATTRIBUTE&&Rg(t)&&n in t.style){let i=xg[n];if(i)return i;{let s=n&&qb(n);return xg[n]=s,s}}else return n},Yu={deg:1,rad:180/Ao,turn:360},_g={},kg=(n,t,e,i=!1)=>{let s=t.u,r=t.n;if(t.t===Qt.UNIT&&s===e)return t;let o=r+s+e,a=_g[o];if(!Jt(a)&&!i)t.n=a;else{let l;if(s in Yu)l=r*Yu[s]/Yu[e];else{let h=n.cloneNode(),u=n.parentNode,f=u&&u!==Fr?u:Fr.body;f.appendChild(h);let p=h.style;p.width=100+s;let g=h.offsetWidth||100;p.width=100+e;let y=h.offsetWidth||100,m=g/y;f.removeChild(h),l=m*r}t.n=l,_g[o]=l}return t.t,Qt.UNIT,t.u=e,t},hd=n=>{if(n._hasChildren)be(n,hd,!0);else{let t=n;t.pause(),be(t,e=>{let i=e.property,s=e.target;if(s[ed]){let r=s.style,o=t._inlineStyles[i];if(e._tweenType===ye.TRANSFORM){let a=s[jl];if(Jt(o)||o===qi?delete a[i]:a[i]=o,e._renderTransforms)if(!Object.keys(a).length)r.removeProperty("transform");else{let l=qi;for(let c in a)l+=Tg[c]+a[c]+") ";r.transform=l}}else Jt(o)||o===qi?r.removeProperty(i):r[i]=o;t._tail===e&&t.targets.forEach(a=>{a.getAttribute&&a.getAttribute("style")===qi&&a.removeAttribute("style")})}})}return n},Ht=ad(),Zt=ad(),Vl={func:null},Hl=[null],Pr=[null,null],Gl={to:null},MT=0,Wi,Xn,ST=(n,t)=>{let e={};if(vs(n)){let i=[].concat(...n.map(s=>Object.keys(s))).filter(Xl);for(let s=0,r=i.length;s<r;s++){let o=i[s],a=n.map(l=>{let c={};for(let h in l){let u=l[h];Xl(h)?h===o&&(c.to=u):c[h]=u}return c});e[o]=a}}else{let i=Ge(t.duration,Se.defaults.duration);Object.keys(n).map(r=>({o:parseFloat(r)/100,p:n[r]})).sort((r,o)=>r.o-o.o).forEach(r=>{let o=r.o,a=r.p;for(let l in a)if(Xl(l)){let c=e[l];c||(c=e[l]=[]);let h=o*i,u=c.length,f=c[u-1],p={to:a[l]},g=0;for(let y=0;y<u;y++)g+=c[y].duration;u===1&&(p.from=f.to),a.ease&&(p.ease=a.ease),p.duration=h-(u?g:0),c.push(p)}return r});for(let r in e){let o=e[r],a;for(let l=0,c=o.length;l<c;l++){let h=o[l],u=h.ease;h.ease=a||void 0,a=u}o[0].duration||o.shift()}}return e},Ql=class extends Jl{constructor(t,e,i,s,r=!1,o=0,a=0){super(e,i,s);let l=rd(t),c=l.length,h=e.keyframes,u=h?tT(ST(h,e),e):e,{delay:f,duration:p,ease:g,playbackEase:y,modifier:m,composition:d,onRender:b}=u,S=i?i.defaults:Se.defaults,_=Ge(y,S.playbackEase),C=_?td(_):null,A=!Jt(g)&&!Jt(g.ease),I=A?g.ease:Ge(g,C?"linear":S.ease),P=A?g.duration:Ge(p,S.duration),M=Ge(f,S.delay),v=m||S.modifier,L=Jt(d)&&c>=_s?Ze.none:Jt(d)?S.composition:d,G={},X=this._offset+(i?i._offset:0),Q=NaN,B=NaN,D=0,V=0;for(let E=0;E<c;E++){let R=l[E],U=o||E,q=a||c,nt=NaN,ct=NaN;for(let k in u)if(Xl(k)){let $=od(R,k),st=cd(k,R,$),ot=u[k],Y=vs(ot);if(r&&!Y&&(Pr[0]=ot,Pr[1]=ot,ot=Pr),Y){let N=ot.length,Kt=!Xu(ot[0]);N===2&&Kt?(Gl.to=ot,Hl[0]=Gl,Wi=Hl):N>2&&Kt?(Wi=[],ot.forEach((At,It)=>{It?It===1?(Pr[1]=At,Wi.push(Pr)):Wi.push(At):Pr[0]=At})):Wi=ot}else Hl[0]=ot,Wi=Hl;let ft=null,mt=null,Bt=NaN,Lt=0,Ot=0;for(let N=Wi.length;Ot<N;Ot++){let Kt=Wi[Ot];Xu(Kt)?Xn=Kt:(Gl.to=Kt,Xn=Gl),Vl.func=null;let At=Gi(Xn.to,R,U,q,Vl),It;Xu(At)&&!Jt(At.to)?(Xn=At,It=At.to):It=At;let Z=Gi(Xn.from,R,U,q),bt=Xn.ease,at=!Jt(bt)&&!Jt(bt.ease),w=at?bt.ease:bt||I,x=at?bt.duration:Gi(Ge(Xn.duration,N>1?Gi(P,R,U,q)/N:P),R,U,q),O=Gi(Ge(Xn.delay,Ot?0:M),R,U,q),et=Gi(Ge(Xn.composition,L),R,U,q),rt=id(et)?et:Ze[et],J=Xn.modifier||v,ht=!Jt(Z),K=!Jt(It),dt=vs(It),Nt=dt||ht&&K,ut=mt?Lt+O:O,vt=X+ut;!V&&(ht||dt)&&(V=1);let Et=mt;if(rt!==Ze.none){ft||(ft=ld(R,st));let Mt=ft._head;for(;Mt&&!Mt._isOverridden&&Mt._absoluteStartTime<=vt;)if(Et=Mt,Mt=Mt._nextRep,Mt&&Mt._absoluteStartTime>=vt)for(;Mt;)Yl(Mt),Mt=Mt._nextRep}if(Nt?(Cn(dt?Gi(It[0],R,U,q):Z,Ht),Cn(dt?Gi(It[1],R,U,q,Vl):It,Zt),Ht.t===Qt.NUMBER&&(Et?Et._valueType===Qt.UNIT&&(Ht.t=Qt.UNIT,Ht.u=Et._unit):(Cn(Lr(R,st,$,G),yn),yn.t===Qt.UNIT&&(Ht.t=Qt.UNIT,Ht.u=yn.u)))):(K?Cn(It,Zt):mt?pg(mt,Zt):Cn(i&&Et&&Et.parent.parent===i?Et._value:Lr(R,st,$,G),Zt),ht?Cn(Z,Ht):mt?pg(mt,Ht):Cn(i&&Et&&Et.parent.parent===i?Et._value:Lr(R,st,$,G),Ht)),Ht.o&&(Ht.n=Ju(Et?Et._toNumber:Cn(Lr(R,st,$,G),yn).n,Ht.n,Ht.o)),Zt.o&&(Zt.n=Ju(Ht.n,Zt.n,Zt.o)),Ht.t!==Zt.t){if(Ht.t===Qt.COMPLEX||Zt.t===Qt.COMPLEX){let Mt=Ht.t===Qt.COMPLEX?Ht:Zt,wt=Ht.t===Qt.COMPLEX?Zt:Ht;wt.t=Qt.COMPLEX,wt.s=$e(Mt.s),wt.d=Mt.d.map(()=>wt.n)}else if(Ht.t===Qt.UNIT||Zt.t===Qt.UNIT){let Mt=Ht.t===Qt.UNIT?Ht:Zt,wt=Ht.t===Qt.UNIT?Zt:Ht;wt.t=Qt.UNIT,wt.u=Mt.u}else if(Ht.t===Qt.COLOR||Zt.t===Qt.COLOR){let Mt=Ht.t===Qt.COLOR?Ht:Zt,wt=Ht.t===Qt.COLOR?Zt:Ht;wt.t=Qt.COLOR,wt.s=Mt.s,wt.d=[0,0,0,1]}}if(Ht.u!==Zt.u){let Mt=Zt.u?Ht:Zt;Mt=kg(R,Mt,Zt.u?Zt.u:Ht.u,!1)}if(Zt.d&&Ht.d&&Zt.d.length!==Ht.d.length){let Mt=Ht.d.length>Zt.d.length?Ht:Zt,wt=Mt===Ht?Zt:Ht;wt.d=Mt.d.map((ee,z)=>Jt(wt.d[z])?0:wt.d[z]),wt.s=$e(Mt.s)}let Ft=xe(+x||ae,12),_t={parent:this,id:MT++,property:st,target:R,_value:null,_func:Vl.func,_ease:td(w),_fromNumbers:$e(Ht.d),_toNumbers:$e(Zt.d),_strings:$e(Zt.s),_fromNumber:Ht.n,_toNumber:Zt.n,_numbers:$e(Ht.d),_number:Ht.n,_unit:Zt.u,_modifier:J,_currentTime:0,_startTime:ut,_delay:+O,_updateDuration:Ft,_changeDuration:Ft,_absoluteStartTime:vt,_tweenType:$,_valueType:Zt.t,_composition:rt,_isOverlapped:0,_isOverridden:0,_renderTransforms:0,_prevRep:null,_nextRep:null,_prevAdd:null,_nextAdd:null,_prev:null,_next:null};rt!==Ze.none&&Fg(_t,ft),isNaN(Bt)&&(Bt=_t._startTime),Lt=xe(ut+Ft,12),mt=_t,D++,Ur(this,_t)}(isNaN(B)||Bt<B)&&(B=Bt),(isNaN(Q)||Lt>Q)&&(Q=Lt),$===ye.TRANSFORM&&(nt=D-Ot,ct=D)}if(!isNaN(nt)){let k=0;be(this,$=>{k>=nt&&k<ct&&($._renderTransforms=1,$._composition===Ze.blend&&be(Nr.animation,st=>{st.id===$.id&&(st._renderTransforms=1)})),k++})}}c||console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation."),B?(be(this,E=>{E._startTime-E._delay||(E._delay-=B),E._startTime-=B}),Q-=B):B=0,Q||(Q=ae,this.iterationCount=0),this.targets=l,this.duration=Q===ae?ae:sd((Q+this._loopDelay)*this.iterationCount-this._loopDelay)||ae,this.onRender=b||S.onRender,this._ease=C,this._delay=B,this.iterationDuration=Q,this._inlineStyles=G,!this._autoplay&&V&&this.onRender(this)}stretch(t){let e=this.duration;if(e===So(t))return this;let i=t/e;return be(this,s=>{s._updateDuration=So(s._updateDuration*i),s._changeDuration=So(s._changeDuration*i),s._currentTime*=i,s._startTime*=i,s._absoluteStartTime*=i}),super.stretch(t)}refresh(){return be(this,t=>{let e=Lr(t.target,t.property,t._tweenType);Cn(e,yn),t._fromNumbers=$e(yn.d),t._fromNumber=yn.n,t._func&&(Cn(t._func(),Zt),t._toNumbers=$e(Zt.d),t._strings=$e(Zt.s),t._toNumber=Zt.n)}),this}revert(){return super.revert(),hd(this)}then(t){return super.then(t)}},Ro=(n,t)=>new Ql(n,t,null,0,!1).init();var Vg=["x","y","z"],yL=["perspective","width","height","margin","padding","top","right","bottom","left","borderWidth","fontSize","borderRadius",...Vg],xL=[...Vg,...nd.filter(n=>["X","Y","Z"].some(t=>n.endsWith(t)))],_L=qn&&(Jt(CSS)||!Object.hasOwnProperty.call(CSS,"registerProperty"));var vg={_head:null,_tail:null},bT=(n,t,e)=>{let i=vg._head;for(;i;){let s=i._next,r=i.$el===n,o=!t||i.property===t,a=!e||i.parent===e;if(r&&o&&a){let l=i.animation;try{l.commitStyles()}catch{}l.cancel(),Yi(vg,i);let c=i.parent;c&&(c._completed++,c.animations.length===c._completed&&(c.completed=!0,c.muteCallbacks||(c.paused=!0,c.onComplete(c),c._resolve(c))))}i=s}};var TT=(n=en)=>new Jl({duration:1*Se.timeScale,onComplete:n},null,0).resume();function ET(n,t,e){let i=rd(n);if(!i.length)return;let[s]=i,r=od(s,t),o=cd(t,s,r),a=Lr(s,o);if(Jt(e))return a;if(Cn(a,yn),yn.t===Qt.NUMBER||yn.t===Qt.UNIT){if(e===!1)return yn.n;{let l=kg(s,yn,e,!1);return`${xe(l.n,Se.precision)}${l.u}`}}}var wT=(n,t)=>{if(!Jt(t))return t.duration=ae,t.composition=Ge(t.composition,Ze.none),new Ql(n,t,null,0,!0).resume()},Mg=(n,t,e)=>{let i=!1;return be(t,s=>{let r=s.target;if(n.includes(r)){let o=s.property,a=s._tweenType,l=cd(e,r,a);(!l||l&&l===o)&&(s.parent._tail===s&&s._tweenType===ye.TRANSFORM&&s._prev&&s._prev._tweenType===ye.TRANSFORM&&(s._prev._renderTransforms=1),Yi(t,s),Og(s),i=!0)}},!0),i},Hg=(n,t,e)=>{let i=Ng(n),s=t||Pe,r=t&&t.controlAnimation&&t;for(let a=0,l=i.length;a<l;a++){let c=i[a];bT(c,e,r)}let o;if(s._hasChildren){let a=0;be(s,l=>{if(!l._hasChildren)if(o=Mg(i,l,e),o&&!l._head)l.cancel(),Yi(s,l);else{let h=l._offset+l._delay+l.duration;h>a&&(a=h)}l._head?Hg(n,l,e):l._hasChildren=!1},!0),Jt(s.iterationDuration)||(s.iterationDuration=a)}else o=Mg(i,s,e);return o&&!s._head&&(s._hasChildren=!1,s.cancel&&s.cancel()),i},ud=(n,t,e)=>{let i=10**(e||0);return Eo((Math.random()*(t-n+1/i)+n)*i)/i},AT=n=>n[ud(0,n.length-1)],RT=n=>{let t=n.length,e,i;for(;t;)i=ud(0,--t),e=n[t],n[t]=n[i],n[i]=e;return n},CT=(n,t)=>(+n).toFixed(t),PT=(n,t,e)=>`${n}`.padStart(t,e),IT=(n,t,e)=>`${n}`.padEnd(t,e),DT=(n,t,e)=>((n-t)%(e-t)+(e-t))%(e-t)+t,LT=(n,t,e,i,s)=>i+(n-t)/(e-t)*(s-i),UT=n=>n*Ao/180,NT=n=>n*180/Ao,FT=(n,t,e,i)=>{let s=_s/Se.defaults.frameRate;if(i!==!1){let o=i||Pe._hasChildren&&Pe;o&&o.deltaTime&&(s=o.deltaTime)}let r=1-Math.exp(-e*s*.1);return e?e===1?t:(1-r)*n+r*t:n},OT=(n,t=0)=>(...e)=>t?i=>n(...e,i):i=>n(i,...e),Gg=n=>(...t)=>{let e=n(...t);return new Proxy(en,{apply:(i,s,[r])=>e(r),get:(i,s)=>Gg((...r)=>{let o=BT[s](...r);return a=>o(e(a))})})},Rn=(n,t=0)=>(...e)=>(e.length<n.length?Gg(OT(n,t)):n)(...e),BT={$:rd,get:ET,set:wT,remove:Hg,cleanInlineStyles:hd,random:ud,randomPick:AT,shuffle:RT,lerp:FT,sync:TT,clamp:Rn(Oe),round:Rn(xe),snap:Rn(jb),wrap:Rn(DT),interpolate:Rn(Xi,1),mapRange:Rn(LT),roundPad:Rn(CT),padStart:Rn(PT),padEnd:Rn(IT),degToRad:Rn(UT),radToDeg:Rn(NT)},zT=(n,t)=>{if(xs(t,"<")){let e=t[1]==="<",i=n._tail,s=i?i._offset+i._delay:0;return e?s:s+i.duration}},kT=(n,t)=>{let e=n.iterationDuration;if(e===ae&&(e=0),Jt(t))return e;if(id(+t))return+t;let i=t,s=n?n.labels:null,r=!Wl(s),o=zT(n,i),a=!Jt(o),l=Xb.exec(i);if(l){let c=l[0],h=i.split(c),u=r&&h[0]?s[h[0]]:e,f=a?o:r?u:e,p=+h[1];return Ju(f,p,c[0])}else return a?o:r?Jt(s[i])?e:s[i]:e};var Wg=(n,t={})=>{let e=[],i=0,s=t.from,r=t.reversed,o=t.ease,a=!Jt(o),c=a&&!Jt(o.ease)?o.ease:a?td(o):null,h=t.grid,u=t.axis,f=Jt(s)||s===0||s==="first",p=s==="center",g=s==="last",y=vs(n),m=ys(y?n[0]:n),d=y?ys(n[1]):0,b=Eg.exec((y?n[1]:n)+qi),S=t.start||0+(y?m:0),_=f?0:id(s)?s:0;return(C,A,I,P)=>{if(p&&(_=(I-1)/2),g&&(_=I-1),!e.length){for(let G=0;G<I;G++){if(!h)e.push(To(_-G));else{let X=p?(h[0]-1)/2:_%h[0],Q=p?(h[1]-1)/2:Eo(_/h[0]),B=G%h[0],D=Eo(G/h[0]),V=X-B,E=Q-D,R=Dg(V*V+E*E);u==="x"&&(R=-V),u==="y"&&(R=-E),e.push(R)}i=Qb(...e)}c&&(e=e.map(G=>c(G/i)*i)),r&&(e=e.map(G=>u?G<0?G*-1:-G:To(i-G)))}let M=y?(d-m)/i:m,L=(P?kT(P,Jt(t.start)?P.iterationDuration:S):S)+(M*xe(e[A],2)||0);return t.modifier&&(L=t.modifier(L)),b&&(L=`${L}${b[2]}`),L}};var VT=matchMedia("(prefers-reduced-motion: reduce)").matches;function Xg(n,t){let e=n.getContext("2d"),i=0,s=0,r=Math.min(devicePixelRatio,2);function o(){let E=n.getBoundingClientRect();i=E.width,s=E.height,n.width=i*r,n.height=s*r,e.setTransform(r,0,0,r,0,0)}o(),new ResizeObserver(o).observe(n);let a="#2A2A2F",l="#6E6D68",c="#A6A49E",h="#FF6369",u="#8E2E32",f={idle:{x:.14,y:.5,label:"idle"},drive:{x:.34,y:.5,label:"driving"},human:{x:.52,y:.26,label:"human detected"},zone:{x:.7,y:.26,label:"slow zone"},exit:{x:.7,y:.74,label:"zone exit"}},p={start:{x:.24,y:.5,label:"start"},detect:{x:.43,y:.4,label:"detect human"},clear:{x:.61,y:.26,label:"zone clearance"},resume:{x:.61,y:.62,label:"resume speed"},complete:{x:.86,y:.62,label:"mission complete"},dev:{x:.52,y:.74,label:"clearance skipped",dev:!0}};function g(E){return{x:E.x*i,y:E.y*s}}let y=[["idle","T:start",null,700],["T:start","drive",null,700],["drive","T:detect",{cy:-.1},650],["T:detect","human",null,650],["human","T:clear",null,550],["T:clear","zone",null,550],["zone","T:resume",{cx:.79},650],["T:resume","exit",null,650],["exit","T:complete",{cy:.82},800],["T:complete","idle",{cy:1.02},900]],m=[["drive","T:dev",{cy:.68},600],["T:dev","exit",null,600]],d={};function b(){e.clearRect(0,0,i,s),e.fillStyle="#141416";for(let R=24;R<i;R+=44)for(let U=24;U<s;U+=44)e.fillRect(R,U,1.4,1.4);let E=[["idle","T:start",null,a],["T:start","drive",null,a],["drive","T:detect",{cy:-.1},a],["T:detect","human",null,a],["human","T:clear",null,a],["T:clear","zone",null,a],["zone","T:resume",{cx:.79},a],["T:resume","exit",null,a],["exit","T:complete",{cy:.82},a],["T:complete","idle",{cy:1.02},a],["drive","T:dev",{cy:.68},u],["T:dev","exit",null,u]];for(let[R,U,q,nt]of E){let ct=g(_(R)),k=g(_(U)),$,st;q&&q.cy!=null?($=(ct.x+k.x)/2,st=q.cy*s):q&&q.cx!=null?($=q.cx*i,st=(ct.y+k.y)/2):($=(ct.x+k.x)/2,st=(ct.y+k.y)/2),e.strokeStyle=nt,e.lineWidth=1,e.setLineDash(nt===u?[4,5]:[]),e.beginPath(),e.moveTo(ct.x,ct.y),e.quadraticCurveTo($,st,k.x,k.y),e.stroke(),e.setLineDash([])}e.font='10px "IBM Plex Mono", monospace';for(let[R,U]of Object.entries(p)){let q=g(U),nt=d[R]||0,ct=U.dev?u:a;e.fillStyle=nt>0?`rgba(255,99,105,${.25+nt*.7})`:"#17171A",e.strokeStyle=U.dev?u:"#3A3A40",S(q.x,q.y,5,16),e.fillStyle="#17171A",nt>0&&(e.save(),e.shadowColor=h,e.shadowBlur=14*nt,S(q.x,q.y,5,16),e.restore()),e.fillStyle=U.dev?"#7a4a4c":l,e.textAlign="center",e.fillText(U.label.toUpperCase(),q.x,q.y+30)}for(let[R,U]of Object.entries(f)){let q=g(U),nt=d[R]||0;e.beginPath(),e.arc(q.x,q.y,17,0,Math.PI*2),e.fillStyle="#0E0E10",e.fill(),e.strokeStyle=nt>0?`rgba(255,99,105,${.5+nt*.5})`:"#3A3A40",e.lineWidth=1.2,e.stroke(),nt>0&&(e.save(),e.strokeStyle=`rgba(255,99,105,${.35*nt})`,e.lineWidth=2,e.beginPath(),e.arc(q.x,q.y,17+8*(1-nt),0,Math.PI*2),e.stroke(),e.restore()),e.fillStyle=l,e.textAlign="center",e.fillText(U.label.toUpperCase(),q.x,q.y+34)}}function S(E,R,U,q){e.beginPath(),e.roundRect(E-U,R-q,U*2,q*2,2),e.fill(),e.stroke()}let _=E=>E.startsWith("T:")?p[E.slice(2)]:f[E.slice(0)],C={x:0,y:0,dev:!1,visible:!1};function A(E,R,U,q){let nt=g(E),ct=g(R),k,$;U&&U.cy!=null?(k=(nt.x+ct.x)/2,$=U.cy*s):U&&U.cx!=null?(k=U.cx*i,$=(nt.y+ct.y)/2):(k=(nt.x+ct.x)/2,$=(nt.y+ct.y)/2);let st=1-q;return{x:st*st*nt.x+2*st*q*k+q*q*ct.x,y:st*st*nt.y+2*st*q*$+q*q*ct.y}}function I(E){d[E]=1,Ro(d,{[E]:0},{duration:700,ease:"outQuad"})}let P=412,M=["14:02:11","14:02:47","14:03:29"];function v(){let E=document.createElement("div");E.className="deviation-chip";let R=P++,U=M[R%M.length];for(E.innerHTML=`<span class="dot"></span>sealed event #${R}: zone clearance skipped \xB7 ${U}`,t.appendChild(E),Ro(E,{opacity:[0,1],translateY:[-8,0],duration:420,ease:"outQuad"});t.children.length>3;)t.firstChild.remove()}let L=0,G=!1;function X(E,R){let U=0;function q(){if(G)return;if(U>=E.length){R();return}let[nt,ct,k,$]=E[U];I((nt.startsWith("T:"),nt)),nt.startsWith("T:")&&I(nt);let st=performance.now();C.visible=!0,C.dev=ct==="exit"&&nt==="T:dev",C.dev=E===m;function ot(Y){if(G)return;let ft=Math.min(1,(Y-st)/$),mt=1-Math.pow(1-ft,2.2),Bt=A(_(nt),_(ct),k,mt);C.x=Bt.x,C.y=Bt.y,ft<1?requestAnimationFrame(ot):(I(ct),U++,C.dev&&ct==="exit"&&v(),setTimeout(q,260))}requestAnimationFrame(ot)}q()}function Q(){C.visible&&(e.beginPath(),e.arc(C.x,C.y,5,0,Math.PI*2),e.fillStyle=C.dev?h:"#EDECE8",e.shadowColor=C.dev?h:"rgba(240,240,235,0.8)",e.shadowBlur=10,e.fill(),e.shadowBlur=0)}function B(){L++;let E=L%3===0,R=E?m:y;if(E){let U=y.slice(0,2),q=y.slice(7);X(U,()=>{X(m,()=>{X(q,()=>setTimeout(B,900))})})}else X(y,()=>setTimeout(B,900))}let D=!0;new IntersectionObserver(([E])=>{D=E.isIntersecting},{threshold:.05}).observe(n);function V(){b(),Q(),requestAnimationFrame(V)}if(VT){b();return}requestAnimationFrame(V),(function E(){D&&!document.hidden?B():setTimeout(E,300)})()}var qg=[{time:"13:58:02",payload:"agent v0.9.3 online, fleet B"},{time:"13:59:10",payload:"config speed_limit zone_B = 1.2 m/s"},{time:"14:01:58",payload:"intervention: operator r.rossi raised speed_limit zone_B to 1.8 m/s (remote)"},{time:"14:02:09",payload:"safety: protective stop near human, aisle 7"},{time:"14:02:10",payload:"state: velocity reached 0.0 m/s in 0.4 s"},{time:"14:04:33",payload:"mission: resumed mission 217"},{time:"14:31:02",payload:"config speed_limit zone_B restored 1.2 m/s"},{time:"14:31:05",payload:"upload: bundle sealed, Merkle root 9f3c41"}],HT="intervention: system auto-tuned speed_limit zone_B to 1.8 m/s",GT=2,WT=5;async function Yg(n){let t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return[...new Uint8Array(t)].map(e=>e.toString(16).padStart(2,"0")).join("")}async function $g(){let n=document.getElementById("event-log"),t=document.getElementById("status-dot"),e=document.getElementById("status-text"),i=document.getElementById("sealed-panel"),s=document.getElementById("btn-edit"),r=document.getElementById("btn-delete"),o=document.getElementById("btn-restore"),a=document.getElementById("btn-verify"),l=[],c="genesis";for(let b of qg)c=await Yg(c+b.payload),l.push(c);let h=!1,u=!1,f=[];function p(){f.length=0,qg.forEach((b,S)=>{f.push({seq:S+1,time:b.time,payload:u&&S===GT?HT:b.payload,deleted:h&&S===WT,sealedHash:l[S]})})}function g(){p(),n.innerHTML="",f.forEach((b,S)=>{let _=document.createElement("li");_.className="event-row"+(b.deleted?" deleted":""),_.innerHTML=`
        <span class="ev-seq">${String(b.seq).padStart(2,"0")}</span>
        <span class="ev-time">${b.time}</span>
        <span class="ev-payload">${b.deleted?"[missing event: sequence break]":y(b.payload)}</span>
        <span class="ev-hash">${b.sealedHash.slice(0,12)}</span>`,n.appendChild(_)})}let y=b=>b.replace(/[<>&]/g,S=>({"<":"&lt;",">":"&gt;","&":"&amp;"})[S]);async function m(){let b="genesis",S=!1,_=[...n.children];for(let C=0;C<f.length;C++){let A=f[C],I=_[C];if(A.deleted){S=!0,I.classList.add("bad");continue}if(S){I.classList.remove("ok"),I.classList.add("bad");continue}let P=await Yg(b+A.payload);P===A.sealedHash?(I.classList.add("ok"),b=P):(S=!0,I.classList.add("bad"))}S?(t.classList.add("broken"),e.textContent="Verification fails at the exact gap: the chain is broken",i.hidden=!1):(t.classList.remove("broken"),e.textContent="Chain intact - 8 events sealed",i.hidden=!0)}function d(){Ro(".event-row",{opacity:[0,1],translateX:[-14,0],duration:480,delay:Wg(55),ease:"outQuad"})}s.addEventListener("click",()=>{u=!u,s.textContent=u?"Undo edit 03":"Edit event 03",g(),m()}),r.addEventListener("click",()=>{h=!h,r.textContent=h?"Restore event 06":"Delete event 06",g(),m()}),o.addEventListener("click",()=>{u=!1,h=!1,s.textContent="Edit event 03",r.textContent="Delete event 06",g(),m()}),a.addEventListener("click",m),g(),d(),await m()}function Zg(n,t){let e=document.createElement("canvas");e.id="hero-canvas",e.setAttribute("aria-hidden","true"),t&&t.parentNode?t.replaceWith(e):n.prepend(e);let i=e.getContext("2d"),s=matchMedia("(prefers-reduced-motion: reduce)").matches,r={FLOW:6.5,FORM:2.8,HOLD:3.4,BURST:1.3},o=r.FLOW+r.FORM+r.HOLD+r.BURST;function a(E){let R=E%o;return R<r.FLOW?{id:0,t:R/r.FLOW}:R<r.FLOW+r.FORM?{id:1,t:(R-r.FLOW)/r.FORM}:R<r.FLOW+r.FORM+r.HOLD?{id:2,t:(R-r.FLOW-r.FORM)/r.HOLD}:{id:3,t:(R-r.FLOW-r.FORM-r.HOLD)/r.BURST}}function l(E){return E.id===2?Math.min(1,E.t*2.4):E.id===3?Math.max(0,1-E.t*4):0}let c=0,h=0,u=Math.min(devicePixelRatio||1,2),f=0,p=0,g=220,y=0,m=0,d=0,b=0,S=0,_=.016;s||addEventListener("pointermove",E=>{d=(E.clientX/innerWidth-.5)*2,b=(E.clientY/innerHeight-.5)*2},{passive:!0});function C(){let E=e.getBoundingClientRect();c=E.width,h=E.height,e.width=Math.round(c*u),e.height=Math.round(h*u),i.setTransform(u,0,0,u,0,0);let R=c/h>1.05;g=R?Math.min(c*.155,h*.23):Math.min(c*.34,h*.15),f=R?c*.63:c*.5,p=R?h*.38:h*.56}C(),new ResizeObserver(C).observe(e);let A=2400,I=[];for(let E=0;E<A;E++){let R=Math.random(),U,q;if(R<.36){let $=Math.random()*Math.PI*2,st=g*.98+(Math.random()-.5)*g*.07;U=Math.cos($)*st,q=Math.sin($)*st}else if(R<.58){let $=Math.random()*Math.PI*2,st=g*.59+(Math.random()-.5)*g*.06;U=Math.cos($)*st,q=Math.sin($)*st}else if(R<.74){let $=Math.random()*Math.PI*2,st=g*.19*Math.sqrt(Math.random());U=Math.cos($)*st,q=Math.sin($)*st}else if(R<.85){let $=Math.random()*Math.PI*2,st=g*1.2+(Math.random()-.5)*g*.13;U=Math.cos($)*st,q=Math.sin($)*st}else{let $=Math.random()*Math.PI*2,st=g*1.1*Math.sqrt(Math.random());U=Math.cos($)*st,q=Math.sin($)*st}let nt=Math.random()*Math.PI*2,ct=g*(1+Math.random()*1.1),k=Math.random();I.push({x:Math.cos(nt)*ct,y:Math.sin(nt)*ct*.8,sx0:0,sy0:0,tx:U,ty:q,bvx:0,bvy:0,evx:0,evy:0,eject:0,heat:0,seed:Math.random()*100,delay:Math.random()*.55,white:k>.94,bright:k>.8&&k<=.94,sz:2.1+Math.random()*1.4})}let P=[{kind:"chain",a0:.3,dy:-.35,ph:1.1},{kind:"chip",a0:Math.PI*.55,dy:.25,ph:2.6},{kind:"vault",a0:Math.PI+.2,dy:-.1,ph:4},{kind:"clock",a0:-Math.PI*.45,dy:.45,ph:5.3}];for(let E of P)E.state={act:0,hits:0,kickT:0,kickAge:9};let M=P.map(()=>({x:0,y:0,depth:0,sc:1})),v=-1,L=E=>1-Math.pow(1-E,3);function G(E,R){for(let U=0;U<P.length;U++){let q=P[U],nt=q.state,ct=M[U],k=q.a0+S*.09;ct.depth=(Math.sin(k)+1)/2,ct.sc=.72+ct.depth*.42,ct.x=E+Math.cos(k)*g*(c/h>1.05?1.85:1.5),ct.y=R+q.dy*g*.7+Math.sin(k)*g*.42+Math.sin(S*1.2+q.ph)*5,nt.kickT*=Math.exp(-_*3.2),nt.kickAge+=_,nt.act+=(nt.hits*14-nt.act)*Math.min(1,_*4),nt.hits=0}}function X(E,R,U){for(let q=0;q<P.length;q++){let nt=P[q],ct=nt.state,k=M[q],$=k.depth,st=k.sc*(1+ct.kickT*.3),ot=.45+$*.55;if(i.strokeStyle=`rgba(255,99,105,${Math.min(1,(.1+ct.act*.55+U*.5)*(.35+$*.65))})`,i.lineWidth=1,i.beginPath(),i.moveTo(k.x,k.y),i.lineTo(E,R),i.stroke(),ct.kickAge<.5){let mt=ct.kickAge/.5;i.strokeStyle=`rgba(255,99,105,${(1-mt)*.8})`,i.lineWidth=1.6,i.beginPath(),i.arc(k.x,k.y,8+mt*34,0,Math.PI*2),i.stroke()}i.save(),i.translate(k.x,k.y),i.scale(st,st),i.globalAlpha=Math.min(1,ot+ct.kickT*.4);let Y=.55+ct.act*.5+ct.kickT*.5+U*.45;if(nt.kind==="chain"){let mt=[[-16,8],[0,-6],[16,-20]];i.strokeStyle="rgba(255,99,105,0.7)",i.lineWidth=1.6,i.beginPath(),i.moveTo(mt[0][0],mt[0][1]),i.lineTo(mt[1][0],mt[1][1]),i.lineTo(mt[2][0],mt[2][1]),i.stroke();for(let[Bt,Lt]of mt)i.fillStyle="#1b1b21",i.strokeStyle="rgba(255,110,116,1)",i.lineWidth=1.5,i.beginPath(),i.rect(Bt-6,Lt-6,12,12),i.fill(),i.stroke()}else if(nt.kind==="chip"){i.fillStyle="#1b1b21",i.strokeStyle="rgba(255,110,116,1)",i.lineWidth=1.5,i.beginPath(),i.roundRect(-19,-8,38,16,2),i.fill(),i.stroke(),i.fillStyle="#b08d4a";for(let mt=0;mt<4;mt++)i.fillRect(-15+mt*9,-6,5,4),i.fillRect(-15+mt*9,2,5,4)}else if(nt.kind==="vault")i.fillStyle="#1b1b21",i.strokeStyle="rgba(255,110,116,1)",i.lineWidth=1.5,i.beginPath(),i.ellipse(0,2,15,8,0,0,Math.PI*2),i.fill(),i.stroke(),i.beginPath(),i.ellipse(0,-5,12,6,0,0,Math.PI*2),i.fill(),i.stroke(),i.strokeStyle=`rgba(255,99,105,${Y})`,i.beginPath(),i.ellipse(0,-10,9,4,0,0,Math.PI*2),i.stroke();else{i.strokeStyle="rgba(255,110,116,1)",i.lineWidth=1.6,i.beginPath(),i.arc(0,0,13,0,Math.PI*2),i.stroke();for(let mt=0;mt<8;mt++){let Bt=mt/8*Math.PI*2+S*(.4+ct.act*2);i.beginPath(),i.moveTo(Math.cos(Bt)*13,Math.sin(Bt)*13),i.lineTo(Math.cos(Bt)*17,Math.sin(Bt)*17),i.strokeStyle="rgba(255,110,116,0.8)",i.stroke()}}let ft=i.createRadialGradient(0,0,0,0,0,14);ft.addColorStop(0,`rgba(255,99,105,${Math.min(1,.22+ct.act*.6+U*.5)})`),ft.addColorStop(1,"rgba(255,99,105,0)"),i.fillStyle=ft,i.beginPath(),i.arc(0,0,14,0,Math.PI*2),i.fill(),i.restore()}}function Q(){let E=s?{id:2,t:.5}:a(S);i.clearRect(0,0,c,h);let R=f+y*22+Math.sin(S*.3)*4,U=p+m*12;if(G(R,U),E.id===1&&v!==1)for(let Y of I)Y.sx0=Y.x,Y.sy0=Y.y;if(E.id===3&&v!==3)for(let Y of I){let ft=Math.max(1,Math.hypot(Y.tx,Y.ty));Y.bvx=Y.tx/ft*(g*(.9+Math.random()*1.1)),Y.bvy=Y.ty/ft*(g*(.9+Math.random()*1.1))}v=E.id;let q=E.id===2?Math.max(0,1-E.t*3.2):0,nt=l(E),ct=i.createRadialGradient(R,U,0,R,U,g*2.8);if(ct.addColorStop(0,`rgba(229,72,77,${.2+q*.32+(E.id===2?.13:0)})`),ct.addColorStop(1,"rgba(229,72,77,0)"),i.fillStyle=ct,i.fillRect(0,0,c,h),q>.01){let Y=i.createRadialGradient(R,U,0,R,U,g*1.6);Y.addColorStop(0,`rgba(255,190,192,${.55*q})`),Y.addColorStop(1,"rgba(255,99,105,0)"),i.fillStyle=Y,i.fillRect(R-g*1.7,U-g*1.7,g*3.4,g*3.4),i.beginPath(),i.arc(R,U,g*(.7+q*2.6),0,Math.PI*2),i.strokeStyle=`rgba(255,99,105,${.8*q})`,i.lineWidth=3,i.stroke()}let k=y*c*.5,$=m*h*.5,st=g*.55,ot=g*.085;i.save(),i.globalCompositeOperation="lighter";for(let Y of I){if(s)Y.x=Y.tx,Y.y=Y.ty;else{if(E.id===0&&Y.eject){Y.x+=Y.evx*_,Y.y+=Y.evy*_;let Ot=Math.exp(-_*1.15);Y.evx*=Ot,Y.evy*=Ot,Y.evx*Y.evx+Y.evy*Y.evy<60&&(Y.eject=0)}else if(E.id===0){let Ot=Math.sin(Y.y*.02+S*.5+Y.seed)*26+Math.sin(Y.seed+S*.23)*12,N=Math.sin(Y.x*.016+S*.4+Y.seed*1.7)*22-2,Kt=-1,At=1e18,It=0,Z=0;for(let O=0;O<M.length;O++){let et=Y.x+R-M[O].x,rt=Y.y+U-M[O].y,J=et*et+rt*rt;J<At&&(At=J,Kt=O,It=et,Z=rt)}if(At<st*st){let O=Math.sqrt(At);if(O<ot){Y.heat=1,Y.eject=1;let et=R-M[Kt].x,rt=U-M[Kt].y,J=Math.max(20,Math.hypot(et,rt)),ht=g*(1.3+Math.random()*.9);Y.evx=et/J*ht+(Y.x+R-M[Kt].x)*.5,Y.evy=rt/J*ht,Y.x=M[Kt].x-R,Y.y=M[Kt].y-U,P[Kt].state.hits++,P[Kt].state.kickT=1,P[Kt].state.kickAge=0}else{let et=It/O,rt=Z/O,J=(st-O)*90*_;Ot-=et*J*5,N-=rt*J*5,Ot+=-rt*J*3,N+=et*J*3}}Y.x+=Ot*_,Y.y+=N*_,Math.hypot(Y.x,Y.y)>g*2.3&&(Y.x*=.995,Y.y*=.995);let at=Y.x+R-(k+c*.5),w=Y.y+U-($+h*.5),x=at*at+w*w;if(x<(g*.9)**2){let O=(1-Math.sqrt(x)/(g*.9))*3.2,et=Math.max(6,Math.sqrt(x));Y.x+=at/et*O,Y.y+=w/et*O}}else if(E.id===1){let Ot=Math.min(1,Math.max(0,(E.t-Y.delay*.5)/.5)),N=L(Ot);Y.x=Y.sx0+(Y.tx-Y.sx0)*N,Y.y=Y.sy0+(Y.ty-Y.sy0)*N}else E.id===2?(Y.x=Y.tx+Math.sin(S*2.6+Y.seed)*1.6,Y.y=Y.ty+Math.cos(S*2.2+Y.seed*1.3)*1.6):(Y.x+=Y.bvx*_,Y.y+=Y.bvy*_);Y.heat>.02&&(Y.heat*=Math.exp(-_*.32))}let ft=R+Y.x,mt=U+Y.y;if(ft<-20||ft>c+20||mt<-20||mt>h+20)continue;let Bt=(E.id===2?1.5:1)*(1+Y.heat*2.4);i.fillStyle=Y.heat>.25?"rgba(255,170,173,0.2)":"rgba(229,72,77,0.09)",i.beginPath(),i.arc(ft,mt,Y.sz*2.8,0,Math.PI*2),i.fill();let Lt;Y.heat>.35?Lt=`rgba(255,${Math.round(190+60*Y.heat)},${Math.round(192+60*Y.heat)},${Math.min(1,Bt)})`:Y.white?Lt=`rgba(255,235,235,${Math.min(1,Bt)})`:Y.bright?Lt=`rgba(255,158,162,${Math.min(1,Bt)})`:Lt=`rgba(235,84,90,${Math.min(1,.92*Bt)})`,i.fillStyle=Lt,i.beginPath(),i.arc(ft,mt,Y.sz*(E.id===2?1.15:1)*(1+Y.heat*.7),0,Math.PI*2),i.fill()}if(E.id===2){let Y=Math.min(1,E.t*2.4),ft=i.createRadialGradient(R,U,0,R,U,g*.9);ft.addColorStop(0,"rgba(255,99,105,0.22)"),ft.addColorStop(1,"rgba(255,99,105,0)"),i.fillStyle=ft,i.beginPath(),i.arc(R,U,g*.9,0,Math.PI*2),i.fill(),i.strokeStyle=`rgba(255,120,126,${Y})`,i.shadowColor="rgba(255,99,105,1)",i.shadowBlur=18,i.lineWidth=3,i.beginPath(),i.arc(R,U,g*.98,0,Math.PI*2),i.stroke(),i.lineWidth=1.6,i.beginPath(),i.arc(R,U,g*.59,0,Math.PI*2),i.stroke();let mt=i.createRadialGradient(R,U,0,R,U,g*.2);mt.addColorStop(0,`rgba(255,220,222,${Y})`),mt.addColorStop(1,"rgba(255,99,105,0)"),i.fillStyle=mt,i.beginPath(),i.arc(R,U,g*.2,0,Math.PI*2),i.fill(),i.lineWidth=1.8,i.setLineDash([g*.16,g*.1]),i.lineDashOffset=-S*g*.3,i.beginPath(),i.arc(R,U,g*1.37,0,Math.PI*2),i.strokeStyle=`rgba(255,99,105,${Y*.9})`,i.stroke(),i.setLineDash([]),i.shadowBlur=0}i.restore(),X(R,U,nt)}let B=!0;new IntersectionObserver(([E])=>{B=E.isIntersecting},{threshold:.02}).observe(e);let D=performance.now();function V(E){_=Math.min(.05,Math.max(0,(E-D)/1e3)),D=E,S+=_,y+=(d-y)*.06,m+=(b-m)*.06,Q()}if(s)S=1,Q();else{let E=R=>{B&&!document.hidden&&V(R),requestAnimationFrame(E)};requestAnimationFrame(E)}}function Kg(n,t,e){let i=document.createElement("canvas");i.id="explode-canvas",i.setAttribute("aria-hidden","true"),t&&t.parentNode?t.replaceWith(i):n.querySelector(".pipeline-sticky").prepend(i);let s=i.getContext("2d"),r=matchMedia("(prefers-reduced-motion: reduce)").matches,o="229,72,77",a=0,l=0,c=Math.min(devicePixelRatio||1,2),h=100,u=0,f=0;function p(){let D=i.getBoundingClientRect();a=D.width,l=D.height,i.width=Math.round(a*c),i.height=Math.round(l*c),s.setTransform(c,0,0,c,0,0),h=Math.min(a*.185,l*.115,148),u=a*.5,f=l*.7}p(),new ResizeObserver(p).observe(i);let g=0,y=0,m=0;function d(D,V,E){return[(D-E)*.866*h+u,((D+E)*.5-V)*h+f]}function b(D,V,E,R,U){U!==void 0&&(s.globalAlpha=U),s.beginPath(),s.moveTo(D[0][0],D[0][1]);for(let q=1;q<D.length;q++)s.lineTo(D[q][0],D[q][1]);s.closePath(),V&&(s.fillStyle=V,s.fill()),E&&(s.save(),R&&(s.shadowColor=`rgba(${o},0.9)`,s.shadowBlur=R),s.strokeStyle=E,s.lineWidth=1.4,s.stroke(),s.restore()),s.globalAlpha=1}function S(D,V,E,R,U,q,nt,ct){let k=D-R/2,$=D+R/2,st=E-q/2,ot=E+q/2,Y=V,ft=V+U;b([d(k,ft,st),d($,ft,st),d($,ft,ot),d(k,ft,ot)],nt.top,nt.stroke,nt.glow,ct),b([d($,Y,st),d($,Y,ot),d($,ft,ot),d($,ft,st)],nt.right,nt.stroke,0,ct),b([d(k,Y,ot),d($,Y,ot),d($,ft,ot),d(k,ft,ot)],nt.front,nt.stroke,0,ct)}function _(D,V,E,R,U,q,nt,ct){ct!==void 0&&(s.globalAlpha=ct);let[k,$]=d(D,V,E);s.beginPath(),s.ellipse(k,$,R*1.2247*h,R*.7071*h,0,0,Math.PI*2),U&&(s.fillStyle=U,s.fill()),q&&(s.save(),nt&&(s.shadowColor=`rgba(${o},0.9)`,s.shadowBlur=nt),s.strokeStyle=q,s.lineWidth=1.4,s.stroke(),s.restore()),s.globalAlpha=1}let C=[3.1,1.9,1.05,.45,0];function A(D,V,E){return V+C[D]*E}let I=[...e.querySelectorAll(".chip")],P=[...n.querySelectorAll(".step")],M=-1;function v(D){D===M||D<0||(M=D,P.forEach(V=>V.classList.toggle("active",+V.dataset.layer===D)),I.forEach(V=>V.classList.toggle("active",+V.dataset.layer===D)))}if(r)v(1);else{let D=new IntersectionObserver(V=>{for(let E of V)E.isIntersecting&&v(+E.target.dataset.layer)},{rootMargin:"-42% 0px -42% 0px"});P.forEach(V=>D.observe(V))}function L(D,V,E){let R=M<0||M===D?1:.2,U=(D%2===0?-1:1)*E*.3,q=A(D,V,E),nt=`rgba(${o},${.9*R})`,ct=R;if(D===4)S(U,q,0,2.5,.55,1.9,{top:"#2c2f37",right:"#1a1c22",front:"#14161b",stroke:nt,glow:6},ct),_(U-.6,q+.56,0,.55,`rgba(120,124,138,${.55*R})`,`rgba(255,255,255,${.12*R})`,0,ct),_(U+.6,q+.56,0,.55,null,`rgba(${o},${.6*R})`,10,ct);else if(D===3)S(U,q,0,1.5,.26,1.1,{top:"#23262d",right:"#171920",front:"#121419",stroke:nt,glow:5},ct),S(U,q+.26,0,.4,.09,.4,{top:`rgba(20,22,27,${R})`,right:"#0e1013",front:"#0a0c0f",stroke:`rgba(160,130,70,${.5*R})`},ct);else if(D===2){S(U,q,0,2,.34,1.3,{top:"#2a2c34",right:"#191b21",front:"#121419",stroke:nt,glow:6},ct);for(let k=0;k<5;k++){let $=U-.68+k*.34;S($,q+.34,0,.24,.24,.24,{top:`rgba(30,33,40,${R})`,right:"#14161b",front:"#0f1115",stroke:`rgba(255,99,105,${.85*R})`,glow:8},ct)}}else if(D===1){S(U,q,0,2.25,.18,1.65,{top:"#30333b",right:"#1d1f25",front:"#16181d",stroke:nt,glow:5},ct);for(let k=0;k<6;k++)_(U-.85+k*.34,q+.2,.4,.05,`rgba(140,144,158,${.6*R})`,null,0,ct)}else{S(U,q,0,1.15,.34,1.15,{top:"#262932",right:"#171920",front:"#121419",stroke:nt,glow:6},ct),_(U,q+.35,0,.17,`rgba(229,72,77,${.95*R})`,`rgba(255,170,173,${.9*R})`,18*R,ct);let[k,$]=d(U,q+.35,0),st=s.createRadialGradient(k,$,0,k,$,h*.7);st.addColorStop(0,`rgba(255,99,105,${.4*R})`),st.addColorStop(1,"rgba(255,99,105,0)"),s.fillStyle=st,s.fillRect(k-h,$-h,h*2,h*2)}}function G(){s.save(),s.strokeStyle="rgba(150,152,166,0.1)",s.lineWidth=1;for(let D=-5;D<=5;D++){let V=d(D,-.6,-5),E=d(D,-.6,5);s.beginPath(),s.moveTo(V[0],V[1]),s.lineTo(E[0],E[1]),s.stroke();let R=d(-5,-.6,D),U=d(5,-.6,D);s.beginPath(),s.moveTo(R[0],R[1]),s.lineTo(U[0],U[1]),s.stroke()}s.restore()}function X(){s.clearRect(0,0,a,l),G();let D=[1.62,1.32,.98,.62,0];for(let V of[4,3,2,1,0])L(V,D[V],r?.3:y)}let Q=!0;new IntersectionObserver(([D])=>{Q=D.isIntersecting},{threshold:.02}).observe(i);function B(){g+=.016;let D=n.getBoundingClientRect(),V=D.height-innerHeight;m=V>0?Math.min(1,Math.max(0,-D.top/V)):0,y+=(m-y)*.1;let E=r?.3:y*y*(3-2*y);s.clearRect(0,0,a,l),G();let R=[1.62,1.32,.98,.62,0];for(let U of[4,3,2,1,0])L(U,R[U],E)}if(r)X();else{let D=()=>{Q&&!document.hidden&&B(),requestAnimationFrame(D)};requestAnimationFrame(D)}}var nc=matchMedia("(prefers-reduced-motion: reduce)").matches;function XT(){setTimeout(()=>{document.querySelectorAll(".hero h1, .hero-sub, .hero-ctas").forEach(n=>{parseFloat(getComputedStyle(n).opacity)<.99&&(n.style.animation="none",n.style.opacity="1",n.style.transform="none")})},1600)}function qT(){nc||Uc(Cc("#progress",{scaleX:[0,1],ease:"linear"}))}function YT(){if(nc)return;let n=[...document.querySelectorAll(".clause, .ledger-row, .tier, .stat, .fact, .quote-card, .demo-shell, .section-h")],t=new Set,e=i=>{t.has(i)||(t.add(i),i.style.transition="opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",i.style.opacity="1",i.style.transform="translateY(0)")};n.forEach(i=>{i.style.opacity="0",i.style.transform="translateY(24px)",Nc(i,()=>e(i),{amount:.25})}),setTimeout(()=>n.forEach(e),3200)}function $T(){let n=document.querySelectorAll("[data-count]"),t=i=>{let s=+i.dataset.count,r=i.dataset.prefix||"",o=i.dataset.suffix||"%";if(nc){i.textContent=r+s+o;return}let a=performance.now(),l=1400;function c(h){let u=Math.min(1,(h-a)/l),f=1-Math.pow(1-u,3);i.textContent=r+Math.round(s*f)+o,u<1&&requestAnimationFrame(c)}requestAnimationFrame(c)},e=new IntersectionObserver(i=>{i.forEach(s=>{s.isIntersecting&&(t(s.target),e.unobserve(s.target))})},{threshold:.6});n.forEach(i=>e.observe(i))}var ZT=new Date("2027-01-20T00:00:00+01:00").getTime();function ec(n){return String(n).padStart(2,"0")}function KT(){let n=document.getElementById("count-days"),t=document.getElementById("count-clock"),e=document.getElementById("cta-count");function i(){let s=Math.max(0,ZT-Date.now()),r=Math.floor(s/864e5),o=Math.floor(s/36e5)%24,a=Math.floor(s/6e4)%60,l=Math.floor(s/1e3)%60;n&&(n.textContent=r),t&&(t.textContent=`${ec(r)} : ${ec(o)} : ${ec(a)} : ${ec(l)}`),e&&(e.textContent=`${r} days to go`)}i(),setInterval(i,1e3)}function JT(){if(nc)return;document.querySelectorAll(".magnetic").forEach(t=>{let e=0,i=0,s=0,r=0,o=0,a=.18;function l(){i+=(r-i)*.18,s+=(o-s)*.18,t.style.transform=`translate(${i}px, ${s}px)`,e=requestAnimationFrame(l)}t.addEventListener("pointermove",c=>{let h=t.getBoundingClientRect();r=(c.clientX-(h.left+h.width/2))*a,o=(c.clientY-(h.top+h.height/2))*a,e||(e=requestAnimationFrame(l))}),t.addEventListener("pointerleave",()=>{r=0,o=0,setTimeout(()=>{Math.abs(i)<.4&&Math.abs(s)<.4&&(cancelAnimationFrame(e),e=0,t.style.transform="",i=s=0)},350)})})}var dd=!1,Po=null,fd=null;function QT(){let n=document.getElementById("hero-canvas");if(!n)return 0;try{let t=document.createElement("canvas");t.width=72,t.height=45;let e=t.getContext("2d");e.drawImage(n,0,0,72,45);let i=e.getImageData(0,0,72,45).data,s=0;for(let r=0;r<i.length;r+=4)i[r]+i[r+1]+i[r+2]>60&&s++;return s}catch{return 0}}function Co(n){if(!dd){dd=!0,console.warn("[sigillo] 2D renderer active:",n),document.documentElement.setAttribute("data-renderer","2d");try{Po&&Po.dispose()}catch{}try{fd&&fd.dispose()}catch{}try{Zg(document.querySelector(".hero"),document.getElementById("hero-canvas"))}catch(t){console.error("[sigillo] fallback hero",t)}try{Kg(document.querySelector(".pipeline"),document.getElementById("explode-canvas"),document.getElementById("layer-chips"))}catch(t){console.error("[sigillo] fallback explode",t)}}}function jT(){if(new URLSearchParams(location.search).get("renderer")==="2d"){Co("forced by URL");return}let n=!1;if(Jg())try{Po=ag(document.getElementById("hero-canvas"),{onFatal:()=>Co("webgl context lost")}),fd=lg(document.querySelector(".pipeline"),document.getElementById("explode-canvas"),document.getElementById("leader-lines"),document.getElementById("layer-chips")),n=!0}catch(e){console.error("[sigillo] webgl init failed",e)}if(!n){Co(Jg()?"webgl init failed":"webgl unavailable");return}document.documentElement.setAttribute("data-renderer","webgl");let t=e=>{setTimeout(()=>{if(dd)return;if(document.visibilityState!=="visible"){e<6&&t(e+1);return}if((Po?Po.getFrames():0)<3){Co("render loop idle");return}QT()<12&&Co("blank canvas")},e===0?2200:1600)};t(0)}function Jg(){try{let n=document.createElement("canvas");return!!(n.getContext("webgl2")||n.getContext("webgl"))}catch{return!1}}function pi(n,t){try{t()}catch(e){console.error("[sigillo]",n,e)}}function Qg(){window.__sigilloBooted=!0,pi("progress",()=>qT()),pi("reveals",()=>YT()),pi("heroSafety",()=>XT()),pi("counters",()=>$T()),pi("countdown",()=>KT()),pi("magnetic",()=>JT()),pi("3d",()=>jT()),pi("petri",()=>Xg(document.getElementById("petri-canvas"),document.getElementById("deviation-feed"))),pi("tamper",()=>$g())}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Qg):Qg();})();
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
