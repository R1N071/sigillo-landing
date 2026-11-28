(()=>{function Ns(n,t,e){var i;if(n instanceof Element)return[n];if(typeof n=="string"){let s=document;t&&(s=t.current);let r=(i=e?.[n])!==null&&i!==void 0?i:s.querySelectorAll(n);return r?Array.from(r):[]}return Array.from(n)}var Ze=n=>n;var Ui=Ze,Bn=Ze;var Zn=(n,t,e)=>{let i=t-n;return i===0?1:(e-n)/i};function Fs(n){let t;return()=>(t===void 0&&(t=n()),t)}var ko=Fs(()=>window.ScrollTimeline!==void 0);var Ho=class{constructor(t){this.stop=()=>this.runAll("stop"),this.animations=t.filter(Boolean)}get finished(){return Promise.all(this.animations.map(t=>"finished"in t?t.finished:t))}getAll(t){return this.animations[0][t]}setAll(t,e){for(let i=0;i<this.animations.length;i++)this.animations[i][t]=e}attachTimeline(t,e){let i=this.animations.map(s=>{if(ko()&&s.attachTimeline)return s.attachTimeline(t);if(typeof e=="function")return e(s)});return()=>{i.forEach((s,r)=>{s&&s(),this.animations[r].stop()})}}get time(){return this.getAll("time")}set time(t){this.setAll("time",t)}get speed(){return this.getAll("speed")}set speed(t){this.setAll("speed",t)}get startTime(){return this.getAll("startTime")}get duration(){let t=0;for(let e=0;e<this.animations.length;e++)t=Math.max(t,this.animations[e].duration);return t}runAll(t){this.animations.forEach(e=>e[t]())}flatten(){this.runAll("flatten")}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}};var Os=class extends Ho{then(t,e){return Promise.all(this.animations).then(t).catch(e)}};var Ke=n=>n*1e3,pn=n=>n/1e3;function Bs(n){let t=0,e=50,i=n.next(t);for(;!i.done&&t<2e4;)t+=e,i=n.next(t);return t>=2e4?1/0:t}var Go=(n,t,e=10)=>{let i="",s=Math.max(Math.round(t/e),2);for(let r=0;r<s;r++)i+=n(Zn(0,s-1,r))+", ";return`linear(${i.substring(0,i.length-2)})`};var sn=(n,t,e)=>e>t?t:e<n?n:e;function zs(n,t){return t?n*(1e3/t):0}var Zg=5;function Wo(n,t,e){let i=Math.max(t-Zg,0);return zs(e-n(i),t-i)}var Ce={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};var hc=.001;function gd({duration:n=Ce.duration,bounce:t=Ce.bounce,velocity:e=Ce.velocity,mass:i=Ce.mass}){let s,r;Ui(n<=Ke(Ce.maxDuration),"Spring duration must be 10 seconds or less");let o=1-t;o=sn(Ce.minDamping,Ce.maxDamping,o),n=sn(Ce.minDuration,Ce.maxDuration,pn(n)),o<1?(s=c=>{let h=c*o,u=h*n,d=h-e,p=Xo(c,o),g=Math.exp(-u);return hc-d/p*g},r=c=>{let u=c*o*n,d=u*e+e,p=Math.pow(o,2)*Math.pow(c,2)*n,g=Math.exp(-u),x=Xo(Math.pow(c,2),o);return(-s(c)+hc>0?-1:1)*((d-p)*g)/x}):(s=c=>{let h=Math.exp(-c*n),u=(c-e)*n+1;return-hc+h*u},r=c=>{let h=Math.exp(-c*n),u=(e-c)*(n*n);return h*u});let a=5/n,l=Jg(s,r,a);if(n=Ke(n),isNaN(l))return{stiffness:Ce.stiffness,damping:Ce.damping,duration:n};{let c=Math.pow(l,2)*i;return{stiffness:c,damping:o*2*Math.sqrt(i*c),duration:n}}}var Kg=12;function Jg(n,t,e){let i=e;for(let s=1;s<Kg;s++)i=i-n(i)/t(i);return i}function Xo(n,t){return n*Math.sqrt(1-t*t)}var Qg=["duration","bounce"],jg=["stiffness","damping","mass"];function xd(n,t){return t.some(e=>n[e]!==void 0)}function t0(n){let t={velocity:Ce.velocity,stiffness:Ce.stiffness,damping:Ce.damping,mass:Ce.mass,isResolvedFromDuration:!1,...n};if(!xd(n,jg)&&xd(n,Qg))if(n.visualDuration){let e=n.visualDuration,i=2*Math.PI/(e*1.2),s=i*i,r=2*sn(.05,1,1-(n.bounce||0))*Math.sqrt(s);t={...t,mass:Ce.mass,stiffness:s,damping:r}}else{let e=gd(n);t={...t,...e,mass:Ce.mass},t.isResolvedFromDuration=!0}return t}function Vs(n=Ce.visualDuration,t=Ce.bounce){let e=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:t}:n,{restSpeed:i,restDelta:s}=e,r=e.keyframes[0],o=e.keyframes[e.keyframes.length-1],a={done:!1,value:r},{stiffness:l,damping:c,mass:h,duration:u,velocity:d,isResolvedFromDuration:p}=t0({...e,velocity:-pn(e.velocity||0)}),g=d||0,x=c/(2*Math.sqrt(l*h)),m=o-r,f=pn(Math.sqrt(l/h)),w=Math.abs(m)<5;i||(i=w?Ce.restSpeed.granular:Ce.restSpeed.default),s||(s=w?Ce.restDelta.granular:Ce.restDelta.default);let T;if(x<1){let P=Xo(f,x);T=C=>{let A=Math.exp(-x*f*C);return o-A*((g+x*f*m)/P*Math.sin(P*C)+m*Math.cos(P*C))}}else if(x===1)T=P=>o-Math.exp(-f*P)*(m+(g+f*m)*P);else{let P=f*Math.sqrt(x*x-1);T=C=>{let A=Math.exp(-x*f*C),R=Math.min(P*C,300);return o-A*((g+x*f*m)*Math.sinh(R)+P*m*Math.cosh(R))/P}}let y={calculatedDuration:p&&u||null,next:P=>{let C=T(P);if(p)a.done=P>=u;else{let A=0;x<1&&(A=P===0?Ke(g):Wo(T,P,C));let R=Math.abs(A)<=i,M=Math.abs(o-C)<=s;a.done=R&&M}return a.value=a.done?o:C,a},toString:()=>{let P=Math.min(Bs(y),2e4),C=Go(A=>y.next(P*A).value,P,30);return P+"ms "+C}};return y}function _d(n,t=100,e){let i=e({...n,keyframes:[0,t]}),s=Math.min(Bs(i),2e4);return{type:"keyframes",ease:r=>i.next(s*r).value/t,duration:pn(s)}}function Ni(n){return typeof n=="function"}var yd=(n,t,e)=>{let i=t-n;return((e-n)%i+i)%i+n};var Yo=n=>Array.isArray(n)&&typeof n[0]!="number";function qo(n,t){return Yo(n)?n[yd(0,n.length,t)]:n}var Kn=(n,t,e)=>n+(t-n)*e;function $o(n,t){let e=n[n.length-1];for(let i=1;i<=t;i++){let s=Zn(0,t,i);n.push(Kn(e,1,s))}}function ks(n){let t=[0];return $o(t,n.length-1),t}var Re=n=>!!(n&&n.getVelocity);function Zr(n){return typeof n=="object"&&!Array.isArray(n)}function Zo(n,t,e,i){return typeof n=="string"&&Zr(t)?Ns(n,e,i):n instanceof NodeList?Array.from(n):Array.isArray(n)?n:[n]}function vd(n,t,e){return n*(t+1)}function dc(n,t,e,i){var s;return typeof t=="number"?t:t.startsWith("-")||t.startsWith("+")?Math.max(0,n+parseFloat(t)):t==="<"?e:(s=i.get(t))!==null&&s!==void 0?s:n}function Sd(n,t){n.indexOf(t)===-1&&n.push(t)}function Ko(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function e0(n,t,e){for(let i=0;i<n.length;i++){let s=n[i];s.at>t&&s.at<e&&(Ko(n,s),i--)}}function Md(n,t,e,i,s,r){e0(n,s,r);for(let o=0;o<t.length;o++)n.push({value:t[o],at:Kn(s,r,i[o]),easing:qo(e,o)})}function bd(n,t){for(let e=0;e<n.length;e++)n[e]=n[e]/(t+1)}function Td(n,t){return n.at===t.at?n.value===null?1:t.value===null?-1:0:n.at-t.at}var n0="easeInOut",i0=20;function Ad(n,{defaultTransition:t={},...e}={},i,s){let r=t.duration||.3,o=new Map,a=new Map,l={},c=new Map,h=0,u=0,d=0;for(let p=0;p<n.length;p++){let g=n[p];if(typeof g=="string"){c.set(g,u);continue}else if(!Array.isArray(g)){c.set(g.name,dc(u,g.at,h,c));continue}let[x,m,f={}]=g;f.at!==void 0&&(u=dc(u,f.at,h,c));let w=0,T=(y,P,C,A=0,R=0)=>{let M=s0(y),{delay:v=0,times:I=ks(M),type:W="keyframes",repeat:Y,repeatType:q,repeatDelay:it=0,...O}=P,{ease:Q=t.ease||"easeOut",duration:U}=P,N=typeof v=="function"?v(A,R):v,K=M.length,$=Ni(W)?W:s?.[W];if(K<=2&&$){let z=100;if(K===2&&a0(M)){let ut=M[1]-M[0];z=Math.abs(ut)}let tt={...O};U!==void 0&&(tt.duration=Ke(U));let J=_d(tt,z,$);Q=J.ease,U=J.duration}U??(U=r);let rt=u+N;I.length===1&&I[0]===0&&(I[1]=1);let _t=I.length-M.length;if(_t>0&&$o(I,_t),M.length===1&&M.unshift(null),Y){Bn(Y<i0,"Repeat count too high, must be less than 20"),U=vd(U,Y);let z=[...M],tt=[...I];Q=Array.isArray(Q)?[...Q]:[Q];let J=[...Q];for(let ut=0;ut<Y;ut++){M.push(...z);for(let mt=0;mt<z.length;mt++)I.push(tt[mt]+(ut+1)),Q.push(mt===0?"linear":qo(J,mt-1))}bd(I,Y)}let L=rt+U;Md(C,M,Q,I,rt,L),w=Math.max(N+U,w),d=Math.max(L,d)};if(Re(x)){let y=wd(x,a);T(m,f,Ed("default",y))}else{let y=Zo(x,m,i,l),P=y.length;for(let C=0;C<P;C++){m=m,f=f;let A=y[C],R=wd(A,a);for(let M in m)T(m[M],r0(f,M),Ed(M,R),C,P)}}h=u,u+=w}return a.forEach((p,g)=>{for(let x in p){let m=p[x];m.sort(Td);let f=[],w=[],T=[];for(let P=0;P<m.length;P++){let{at:C,value:A,easing:R}=m[P];f.push(A),w.push(Zn(0,d,C)),T.push(R||"easeOut")}w[0]!==0&&(w.unshift(0),f.unshift(f[0]),T.unshift(n0)),w[w.length-1]!==1&&(w.push(1),f.push(null)),o.has(g)||o.set(g,{keyframes:{},transition:{}});let y=o.get(g);y.keyframes[x]=f,y.transition[x]={...t,duration:d,ease:T,times:w,...e}}}),o}function wd(n,t){return!t.has(n)&&t.set(n,{}),t.get(n)}function Ed(n,t){return t[n]||(t[n]=[]),t[n]}function s0(n){return Array.isArray(n)?n:[n]}function r0(n,t){return n&&n[t]?{...n,...n[t]}:{...n}}var o0=n=>typeof n=="number",a0=n=>n.every(o0);var di=new WeakMap;function Jo(n,t){return n?n[t]||n.default||n:void 0}var Jn=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Sn=new Set(Jn);var Qo=new Set(["width","height","top","left","right","bottom",...Jn]);var Cd=n=>Array.isArray(n);var Rd=n=>Cd(n)?n[n.length-1]||0:n;var Hs={skipAnimations:!1,useManualTiming:!1};function Pd(n){let t=new Set,e=new Set,i=!1,s=!1,r=new WeakSet,o={delta:0,timestamp:0,isProcessing:!1};function a(c){r.has(c)&&(l.schedule(c),n()),c(o)}let l={schedule:(c,h=!1,u=!1)=>{let p=u&&i?t:e;return h&&r.add(c),p.has(c)||p.add(c),c},cancel:c=>{e.delete(c),r.delete(c)},process:c=>{if(o=c,i){s=!0;return}i=!0,[t,e]=[e,t],t.forEach(a),t.clear(),i=!1,s&&(s=!1,l.process(c))}};return l}var jo=["read","resolveKeyframes","update","preRender","render","postRender"],l0=40;function Id(n,t){let e=!1,i=!0,s={delta:0,timestamp:0,isProcessing:!1},r=()=>e=!0,o=jo.reduce((f,w)=>(f[w]=Pd(r),f),{}),{read:a,resolveKeyframes:l,update:c,preRender:h,render:u,postRender:d}=o,p=()=>{let f=Hs.useManualTiming?s.timestamp:performance.now();e=!1,s.delta=i?1e3/60:Math.max(Math.min(f-s.timestamp,l0),1),s.timestamp=f,s.isProcessing=!0,a.process(s),l.process(s),c.process(s),h.process(s),u.process(s),d.process(s),s.isProcessing=!1,e&&t&&(i=!1,n(p))},g=()=>{e=!0,i=!0,s.isProcessing||n(p)};return{schedule:jo.reduce((f,w)=>{let T=o[w];return f[w]=(y,P=!1,C=!1)=>(e||g(),T.schedule(y,P,C)),f},{}),cancel:f=>{for(let w=0;w<jo.length;w++)o[jo[w]].cancel(f)},state:s,steps:o}}var{schedule:Ne,cancel:fi,state:Fi,steps:Xw}=Id(typeof requestAnimationFrame<"u"?requestAnimationFrame:Ze,!0);var ta;function c0(){ta=void 0}var Mn={now:()=>(ta===void 0&&Mn.set(Fi.isProcessing||Hs.useManualTiming?Fi.timestamp:performance.now()),ta),set:n=>{ta=n,queueMicrotask(c0)}};var Gs=class{constructor(){this.subscriptions=[]}add(t){return Sd(this.subscriptions,t),()=>Ko(this.subscriptions,t)}notify(t,e,i){let s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](t,e,i);else for(let r=0;r<s;r++){let o=this.subscriptions[r];o&&o(t,e,i)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}};var Dd=30,h0=n=>!isNaN(parseFloat(n)),Ld={current:void 0},fc=class{constructor(t,e={}){this.version="12.0.0",this.canTrackVelocity=null,this.events={},this.updateAndNotify=(i,s=!0)=>{let r=Mn.now();this.updatedAt!==r&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(i),this.current!==this.prev&&this.events.change&&this.events.change.notify(this.current),s&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.hasAnimated=!1,this.setCurrent(t),this.owner=e.owner}setCurrent(t){this.current=t,this.updatedAt=Mn.now(),this.canTrackVelocity===null&&t!==void 0&&(this.canTrackVelocity=h0(this.current))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return this.on("change",t)}on(t,e){this.events[t]||(this.events[t]=new Gs);let i=this.events[t].add(e);return t==="change"?()=>{i(),Ne.read(()=>{this.events.change.getSize()||this.stop()})}:i}clearListeners(){for(let t in this.events)this.events[t].clear()}attach(t,e){this.passiveEffect=t,this.stopPassiveEffect=e}set(t,e=!0){!e||!this.passiveEffect?this.updateAndNotify(t,e):this.passiveEffect(t,this.updateAndNotify)}setWithVelocity(t,e,i){this.set(e),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-i}jump(t,e=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,e&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return Ld.current&&Ld.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){let t=Mn.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||t-this.updatedAt>Dd)return 0;let e=Math.min(this.updatedAt-this.prevUpdatedAt,Dd);return zs(parseFloat(this.current)-parseFloat(this.prevFrameValue),e)}start(t){return this.stop(),new Promise(e=>{this.hasAnimated=!0,this.animation=t(e),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}};function pi(n,t){return new fc(n,t)}function Ud(n){let t=[{},{}];return n?.values.forEach((e,i)=>{t[0][i]=e.get(),t[1][i]=e.getVelocity()}),t}function ea(n,t,e,i){if(typeof t=="function"){let[s,r]=Ud(i);t=t(e!==void 0?e:n.custom,s,r)}if(typeof t=="string"&&(t=n.variants&&n.variants[t]),typeof t=="function"){let[s,r]=Ud(i);t=t(e!==void 0?e:n.custom,s,r)}return t}function Nd(n,t,e){let i=n.getProps();return ea(i,t,e!==void 0?e:i.custom,n)}function u0(n,t,e){n.hasValue(t)?n.getValue(t).set(e):n.addValue(t,pi(e))}function Fd(n,t){let e=Nd(n,t),{transitionEnd:i={},transition:s={},...r}=e||{};r={...r,...i};for(let o in r){let a=Rd(r[o]);u0(n,o,a)}}function Od(n){return!!(Re(n)&&n.add)}function Bd(n,t){let e=n.getValue("willChange");if(Od(e))return e.add(t)}var Ws=n=>n.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase();var d0="framerAppearId",zd="data-"+Ws(d0);function Vd(n){return n.props[zd]}var na={current:!1};function pc(n,t){n.timeline=t,n.onfinish=null}var Kr=n=>Array.isArray(n)&&typeof n[0]=="number";var kd={linearEasing:void 0};function Hd(n,t){let e=Fs(n);return()=>{var i;return(i=kd[t])!==null&&i!==void 0?i:e()}}var Xs=Hd(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing");function gc(n){return!!(typeof n=="function"&&Xs()||!n||typeof n=="string"&&(n in mc||Xs())||Kr(n)||Array.isArray(n)&&n.every(gc))}var Jr=([n,t,e,i])=>`cubic-bezier(${n}, ${t}, ${e}, ${i})`,mc={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Jr([0,.65,.55,1]),circOut:Jr([.55,0,1,.45]),backIn:Jr([.31,.01,.66,-.59]),backOut:Jr([.33,1.53,.69,.99])};function xc(n,t){if(n)return typeof n=="function"&&Xs()?Go(n,t):Kr(n)?Jr(n):Array.isArray(n)?n.map(e=>xc(e,t)||mc.easeOut):mc[n]}var Gd=(n,t,e)=>(((1-3*e+3*t)*n+(3*e-6*t))*n+3*t)*n,f0=1e-7,p0=12;function m0(n,t,e,i,s){let r,o,a=0;do o=t+(e-t)/2,r=Gd(o,i,s)-n,r>0?e=o:t=o;while(Math.abs(r)>f0&&++a<p0);return o}function Oi(n,t,e,i){if(n===t&&e===i)return Ze;let s=r=>m0(r,0,1,n,e);return r=>r===0||r===1?r:Gd(s(r),t,i)}var ia=n=>t=>t<=.5?n(2*t)/2:(2-n(2*(1-t)))/2;var sa=n=>t=>1-n(1-t);var _c=Oi(.33,1.53,.69,.99),Qr=sa(_c),ra=ia(Qr);var oa=n=>(n*=2)<1?.5*Qr(n):.5*(2-Math.pow(2,-10*(n-1)));var aa=n=>1-Math.sin(Math.acos(n)),Wd=sa(aa),la=ia(aa);var ca=n=>/^0[^.\s]+$/u.test(n);function Xd(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||ca(n):!0}var Qn={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},mi={...Qn,transform:n=>sn(0,1,n)},jr={...Qn,default:1};var Bi=n=>Math.round(n*1e5)/1e5;var Ys=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Yd(n){return n==null}var qd=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;var qs=(n,t)=>e=>!!(typeof e=="string"&&qd.test(e)&&e.startsWith(n)||t&&!Yd(e)&&Object.prototype.hasOwnProperty.call(e,t)),ha=(n,t,e)=>i=>{if(typeof i!="string")return i;let[s,r,o,a]=i.match(Ys);return{[n]:parseFloat(s),[t]:parseFloat(r),[e]:parseFloat(o),alpha:a!==void 0?parseFloat(a):1}};var g0=n=>sn(0,255,n),yc={...Qn,transform:n=>Math.round(g0(n))},jn={test:qs("rgb","red"),parse:ha("red","green","blue"),transform:({red:n,green:t,blue:e,alpha:i=1})=>"rgba("+yc.transform(n)+", "+yc.transform(t)+", "+yc.transform(e)+", "+Bi(mi.transform(i))+")"};function x0(n){let t="",e="",i="",s="";return n.length>5?(t=n.substring(1,3),e=n.substring(3,5),i=n.substring(5,7),s=n.substring(7,9)):(t=n.substring(1,2),e=n.substring(2,3),i=n.substring(3,4),s=n.substring(4,5),t+=t,e+=e,i+=i,s+=s),{red:parseInt(t,16),green:parseInt(e,16),blue:parseInt(i,16),alpha:s?parseInt(s,16)/255:1}}var to={test:qs("#"),parse:x0,transform:jn.transform};var eo=n=>({test:t=>typeof t=="string"&&t.endsWith(n)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${n}`}),ti=eo("deg"),zi=eo("%"),Xt=eo("px"),$d=eo("vh"),Zd=eo("vw"),vc={...zi,parse:n=>zi.parse(n)/100,transform:n=>zi.transform(n*100)};var Vi={test:qs("hsl","hue"),parse:ha("hue","saturation","lightness"),transform:({hue:n,saturation:t,lightness:e,alpha:i=1})=>"hsla("+Math.round(n)+", "+zi.transform(Bi(t))+", "+zi.transform(Bi(e))+", "+Bi(mi.transform(i))+")"};var ze={test:n=>jn.test(n)||to.test(n)||Vi.test(n),parse:n=>jn.test(n)?jn.parse(n):Vi.test(n)?Vi.parse(n):to.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?jn.transform(n):Vi.transform(n)};var Kd=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function _0(n){var t,e;return isNaN(n)&&typeof n=="string"&&(((t=n.match(Ys))===null||t===void 0?void 0:t.length)||0)+(((e=n.match(Kd))===null||e===void 0?void 0:e.length)||0)>0}var Qd="number",jd="color",y0="var",v0="var(",Jd="${}",S0=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function us(n){let t=n.toString(),e=[],i={color:[],number:[],var:[]},s=[],r=0,a=t.replace(S0,l=>(ze.test(l)?(i.color.push(r),s.push(jd),e.push(ze.parse(l))):l.startsWith(v0)?(i.var.push(r),s.push(y0),e.push(l)):(i.number.push(r),s.push(Qd),e.push(parseFloat(l))),++r,Jd)).split(Jd);return{values:e,split:a,indexes:i,types:s}}function tf(n){return us(n).values}function ef(n){let{split:t,types:e}=us(n),i=t.length;return s=>{let r="";for(let o=0;o<i;o++)if(r+=t[o],s[o]!==void 0){let a=e[o];a===Qd?r+=Bi(s[o]):a===jd?r+=ze.transform(s[o]):r+=s[o]}return r}}var M0=n=>typeof n=="number"?0:n;function b0(n){let t=tf(n);return ef(n)(t.map(M0))}var bn={test:_0,parse:tf,createTransformer:ef,getAnimatableNone:b0};var T0=new Set(["brightness","contrast","saturate","opacity"]);function w0(n){let[t,e]=n.slice(0,-1).split("(");if(t==="drop-shadow")return n;let[i]=e.match(Ys)||[];if(!i)return n;let s=e.replace(i,""),r=T0.has(t)?1:0;return i!==e&&(r*=100),t+"("+r+s+")"}var E0=/\b([a-z-]*)\(.*?\)/gu,no={...bn,getAnimatableNone:n=>{let t=n.match(E0);return t?t.map(w0).join(" "):n}};var nf={borderWidth:Xt,borderTopWidth:Xt,borderRightWidth:Xt,borderBottomWidth:Xt,borderLeftWidth:Xt,borderRadius:Xt,radius:Xt,borderTopLeftRadius:Xt,borderTopRightRadius:Xt,borderBottomRightRadius:Xt,borderBottomLeftRadius:Xt,width:Xt,maxWidth:Xt,height:Xt,maxHeight:Xt,top:Xt,right:Xt,bottom:Xt,left:Xt,padding:Xt,paddingTop:Xt,paddingRight:Xt,paddingBottom:Xt,paddingLeft:Xt,margin:Xt,marginTop:Xt,marginRight:Xt,marginBottom:Xt,marginLeft:Xt,backgroundPositionX:Xt,backgroundPositionY:Xt};var sf={rotate:ti,rotateX:ti,rotateY:ti,rotateZ:ti,scale:jr,scaleX:jr,scaleY:jr,scaleZ:jr,skew:ti,skewX:ti,skewY:ti,distance:Xt,translateX:Xt,translateY:Xt,translateZ:Xt,x:Xt,y:Xt,z:Xt,perspective:Xt,transformPerspective:Xt,opacity:mi,originX:vc,originY:vc,originZ:Xt};var Sc={...Qn,transform:Math.round};var $s={...nf,...sf,zIndex:Sc,size:Xt,fillOpacity:mi,strokeOpacity:mi,numOctaves:Sc};var A0={...$s,color:ze,backgroundColor:ze,outlineColor:ze,fill:ze,stroke:ze,borderColor:ze,borderTopColor:ze,borderRightColor:ze,borderBottomColor:ze,borderLeftColor:ze,filter:no,WebkitFilter:no},Zs=n=>A0[n];function ua(n,t){let e=Zs(n);return e!==no&&(e=bn),e.getAnimatableNone?e.getAnimatableNone(t):void 0}var C0=new Set(["auto","none","0"]);function rf(n,t,e){let i=0,s;for(;i<n.length&&!s;){let r=n[i];typeof r=="string"&&!C0.has(r)&&us(r).values.length&&(s=n[i]),i++}if(s&&e)for(let r of t)n[r]=ua(e,s)}var Mc=n=>n===Qn||n===Xt,of=(n,t)=>parseFloat(n.split(", ")[t]),af=(n,t)=>(e,{transform:i})=>{if(i==="none"||!i)return 0;let s=i.match(/^matrix3d\((.+)\)$/u);if(s)return of(s[1],t);{let r=i.match(/^matrix\((.+)\)$/u);return r?of(r[1],n):0}},R0=new Set(["x","y","z"]),P0=Jn.filter(n=>!R0.has(n));function lf(n){let t=[];return P0.forEach(e=>{let i=n.getValue(e);i!==void 0&&(t.push([e,i.get()]),i.set(e.startsWith("scale")?1:0))}),t}var ds={width:({x:n},{paddingLeft:t="0",paddingRight:e="0"})=>n.max-n.min-parseFloat(t)-parseFloat(e),height:({y:n},{paddingTop:t="0",paddingBottom:e="0"})=>n.max-n.min-parseFloat(t)-parseFloat(e),top:(n,{top:t})=>parseFloat(t),left:(n,{left:t})=>parseFloat(t),bottom:({y:n},{top:t})=>parseFloat(t)+(n.max-n.min),right:({x:n},{left:t})=>parseFloat(t)+(n.max-n.min),x:af(4,13),y:af(5,14)};ds.translateX=ds.x;ds.translateY=ds.y;var fs=new Set,bc=!1,Tc=!1;function cf(){if(Tc){let n=Array.from(fs).filter(i=>i.needsMeasurement),t=new Set(n.map(i=>i.element)),e=new Map;t.forEach(i=>{let s=lf(i);s.length&&(e.set(i,s),i.render())}),n.forEach(i=>i.measureInitialState()),t.forEach(i=>{i.render();let s=e.get(i);s&&s.forEach(([r,o])=>{var a;(a=i.getValue(r))===null||a===void 0||a.set(o)})}),n.forEach(i=>i.measureEndState()),n.forEach(i=>{i.suspendedScrollY!==void 0&&window.scrollTo(0,i.suspendedScrollY)})}Tc=!1,bc=!1,fs.forEach(n=>n.complete()),fs.clear()}function hf(){fs.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(Tc=!0)})}function uf(){hf(),cf()}var ki=class{constructor(t,e,i,s,r,o=!1){this.isComplete=!1,this.isAsync=!1,this.needsMeasurement=!1,this.isScheduled=!1,this.unresolvedKeyframes=[...t],this.onComplete=e,this.name=i,this.motionValue=s,this.element=r,this.isAsync=o}scheduleResolve(){this.isScheduled=!0,this.isAsync?(fs.add(this),bc||(bc=!0,Ne.read(hf),Ne.resolveKeyframes(cf))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:t,name:e,element:i,motionValue:s}=this;for(let r=0;r<t.length;r++)if(t[r]===null)if(r===0){let o=s?.get(),a=t[t.length-1];if(o!==void 0)t[0]=o;else if(i&&e){let l=i.readValue(e,a);l!=null&&(t[0]=l)}t[0]===void 0&&(t[0]=a),s&&o===void 0&&s.set(t[0])}else t[r]=t[r-1]}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(){this.isComplete=!0,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe),fs.delete(this)}cancel(){this.isComplete||(this.isScheduled=!1,fs.delete(this))}resume(){this.isComplete||this.scheduleResolve()}};var da=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);var df=n=>t=>typeof t=="string"&&t.startsWith(n),fa=df("--"),I0=df("var(--"),Ks=n=>I0(n)?D0.test(n.split("/*")[0].trim()):!1,D0=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;var L0=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function U0(n){let t=L0.exec(n);if(!t)return[,];let[,e,i,s]=t;return[`--${e??i}`,s]}var N0=4;function wc(n,t,e=1){Bn(e<=N0,`Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`);let[i,s]=U0(n);if(!i)return;let r=window.getComputedStyle(t).getPropertyValue(i);if(r){let o=r.trim();return da(o)?parseFloat(o):o}return Ks(s)?wc(s,t,e+1):s}var pa=n=>t=>t.test(n);var ff={test:n=>n==="auto",parse:n=>n};var Ec=[Qn,Xt,zi,ti,Zd,$d,ff],Ac=n=>Ec.find(pa(n));var Js=class extends ki{constructor(t,e,i,s,r){super(t,e,i,s,r,!0)}readKeyframes(){let{unresolvedKeyframes:t,element:e,name:i}=this;if(!e||!e.current)return;super.readKeyframes();for(let l=0;l<t.length;l++){let c=t[l];if(typeof c=="string"&&(c=c.trim(),Ks(c))){let h=wc(c,e.current);h!==void 0&&(t[l]=h),l===t.length-1&&(this.finalKeyframe=c)}}if(this.resolveNoneKeyframes(),!Qo.has(i)||t.length!==2)return;let[s,r]=t,o=Ac(s),a=Ac(r);if(o!==a)if(Mc(o)&&Mc(a))for(let l=0;l<t.length;l++){let c=t[l];typeof c=="string"&&(t[l]=parseFloat(c))}else this.needsMeasurement=!0}resolveNoneKeyframes(){let{unresolvedKeyframes:t,name:e}=this,i=[];for(let s=0;s<t.length;s++)Xd(t[s])&&i.push(s);i.length&&rf(t,i,e)}measureInitialState(){let{element:t,unresolvedKeyframes:e,name:i}=this;if(!t||!t.current)return;i==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=ds[i](t.measureViewportBox(),window.getComputedStyle(t.current)),e[0]=this.measuredOrigin;let s=e[e.length-1];s!==void 0&&t.getValue(i,s).jump(s,!1)}measureEndState(){var t;let{element:e,name:i,unresolvedKeyframes:s}=this;if(!e||!e.current)return;let r=e.getValue(i);r&&r.jump(this.measuredOrigin,!1);let o=s.length-1,a=s[o];s[o]=ds[i](e.measureViewportBox(),window.getComputedStyle(e.current)),a!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=a),!((t=this.removedTransforms)===null||t===void 0)&&t.length&&this.removedTransforms.forEach(([l,c])=>{e.getValue(l).set(c)}),this.resolveNoneKeyframes()}};var Cc=(n,t)=>t==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(bn.test(n)||n==="0")&&!n.startsWith("url("));function F0(n){let t=n[0];if(n.length===1)return!0;for(let e=0;e<n.length;e++)if(n[e]!==t)return!0}function pf(n,t,e,i){let s=n[0];if(s===null)return!1;if(t==="display"||t==="visibility")return!0;let r=n[n.length-1],o=Cc(s,t),a=Cc(r,t);return Ui(o===a,`You are trying to animate ${t} from "${s}" to "${r}". ${s} is not an animatable value - to enable this animation set ${s} to a value animatable to ${r} via the \`style\` property.`),!o||!a?!1:F0(n)||(e==="spring"||Ni(e))&&i}var O0=n=>n!==null;function Hi(n,{repeat:t,repeatType:e="loop"},i){let s=n.filter(O0),r=t&&e!=="loop"&&t%2===1?0:s.length-1;return!r||i===void 0?s[r]:i}var B0=40,Qs=class{constructor({autoplay:t=!0,delay:e=0,type:i="keyframes",repeat:s=0,repeatDelay:r=0,repeatType:o="loop",...a}){this.isStopped=!1,this.hasAttemptedResolve=!1,this.createdAt=Mn.now(),this.options={autoplay:t,delay:e,type:i,repeat:s,repeatDelay:r,repeatType:o,...a},this.updateFinishedPromise()}calcStartTime(){return this.resolvedAt?this.resolvedAt-this.createdAt>B0?this.resolvedAt:this.createdAt:this.createdAt}get resolved(){return!this._resolved&&!this.hasAttemptedResolve&&uf(),this._resolved}onKeyframesResolved(t,e){this.resolvedAt=Mn.now(),this.hasAttemptedResolve=!0;let{name:i,type:s,velocity:r,delay:o,onComplete:a,onUpdate:l,isGenerator:c}=this.options;if(!c&&!pf(t,i,s,r))if(na.current||!o){l&&l(Hi(t,this.options,e)),a&&a(),this.resolveFinishedPromise();return}else this.options.duration=0;let h=this.initPlayback(t,e);h!==!1&&(this._resolved={keyframes:t,finalKeyframe:e,...h},this.onPostResolved())}onPostResolved(){}then(t,e){return this.currentFinishedPromise.then(t,e)}flatten(){this.options.type="keyframes",this.options.ease="linear"}updateFinishedPromise(){this.currentFinishedPromise=new Promise(t=>{this.resolveFinishedPromise=t})}};function Rc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*(2/3-e)*6:n}function mf({hue:n,saturation:t,lightness:e,alpha:i}){n/=360,t/=100,e/=100;let s=0,r=0,o=0;if(!t)s=r=o=e;else{let a=e<.5?e*(1+t):e+t-e*t,l=2*e-a;s=Rc(l,a,n+1/3),r=Rc(l,a,n),o=Rc(l,a,n-1/3)}return{red:Math.round(s*255),green:Math.round(r*255),blue:Math.round(o*255),alpha:i}}function js(n,t){return e=>e>0?t:n}var Pc=(n,t,e)=>{let i=n*n,s=e*(t*t-i)+i;return s<0?0:Math.sqrt(s)},z0=[to,jn,Vi],V0=n=>z0.find(t=>t.test(n));function gf(n){let t=V0(n);if(Ui(!!t,`'${n}' is not an animatable color. Use the equivalent color code instead.`),!t)return!1;let e=t.parse(n);return t===Vi&&(e=mf(e)),e}var Ic=(n,t)=>{let e=gf(n),i=gf(t);if(!e||!i)return js(n,t);let s={...e};return r=>(s.red=Pc(e.red,i.red,r),s.green=Pc(e.green,i.green,r),s.blue=Pc(e.blue,i.blue,r),s.alpha=Kn(e.alpha,i.alpha,r),jn.transform(s))};var k0=(n,t)=>e=>t(n(e)),tr=(...n)=>n.reduce(k0);var ma=new Set(["none","hidden"]);function xf(n,t){return ma.has(n)?e=>e<=0?n:t:e=>e>=1?t:n}function H0(n,t){return e=>Kn(n,t,e)}function ga(n){return typeof n=="number"?H0:typeof n=="string"?Ks(n)?js:ze.test(n)?Ic:X0:Array.isArray(n)?_f:typeof n=="object"?ze.test(n)?Ic:G0:js}function _f(n,t){let e=[...n],i=e.length,s=n.map((r,o)=>ga(r)(r,t[o]));return r=>{for(let o=0;o<i;o++)e[o]=s[o](r);return e}}function G0(n,t){let e={...n,...t},i={};for(let s in e)n[s]!==void 0&&t[s]!==void 0&&(i[s]=ga(n[s])(n[s],t[s]));return s=>{for(let r in i)e[r]=i[r](s);return e}}function W0(n,t){var e;let i=[],s={color:0,var:0,number:0};for(let r=0;r<t.values.length;r++){let o=t.types[r],a=n.indexes[o][s[o]],l=(e=n.values[a])!==null&&e!==void 0?e:0;i[r]=l,s[o]++}return i}var X0=(n,t)=>{let e=bn.createTransformer(t),i=us(n),s=us(t);return i.indexes.var.length===s.indexes.var.length&&i.indexes.color.length===s.indexes.color.length&&i.indexes.number.length>=s.indexes.number.length?ma.has(n)&&!s.values.length||ma.has(t)&&!i.values.length?xf(n,t):tr(_f(W0(i,s),s.values),e):(Ui(!0,`Complex values '${n}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`),js(n,t))};function xa(n,t,e){return typeof n=="number"&&typeof t=="number"&&typeof e=="number"?Kn(n,t,e):ga(n)(n,t)}function Dc({keyframes:n,velocity:t=0,power:e=.8,timeConstant:i=325,bounceDamping:s=10,bounceStiffness:r=500,modifyTarget:o,min:a,max:l,restDelta:c=.5,restSpeed:h}){let u=n[0],d={done:!1,value:u},p=R=>a!==void 0&&R<a||l!==void 0&&R>l,g=R=>a===void 0?l:l===void 0||Math.abs(a-R)<Math.abs(l-R)?a:l,x=e*t,m=u+x,f=o===void 0?m:o(m);f!==m&&(x=f-u);let w=R=>-x*Math.exp(-R/i),T=R=>f+w(R),y=R=>{let M=w(R),v=T(R);d.done=Math.abs(M)<=c,d.value=d.done?f:v},P,C,A=R=>{p(d.value)&&(P=R,C=Vs({keyframes:[d.value,g(d.value)],velocity:Wo(T,R,d.value),damping:s,stiffness:r,restDelta:c,restSpeed:h}))};return A(0),{calculatedDuration:null,next:R=>{let M=!1;return!C&&P===void 0&&(M=!0,y(R),A(R)),P!==void 0&&R>=P?C.next(R-P):(!M&&y(R),d)}}}var yf=Oi(.42,0,1,1),vf=Oi(0,0,.58,1),_a=Oi(.42,0,.58,1);var Sf={linear:Ze,easeIn:yf,easeInOut:_a,easeOut:vf,circIn:aa,circInOut:la,circOut:Wd,backIn:Qr,backInOut:ra,backOut:_c,anticipate:oa},Lc=n=>{if(Kr(n)){Bn(n.length===4,"Cubic bezier arrays must contain four numerical values.");let[t,e,i,s]=n;return Oi(t,e,i,s)}else if(typeof n=="string")return Bn(Sf[n]!==void 0,`Invalid easing type '${n}'`),Sf[n];return n};function Y0(n,t,e){let i=[],s=e||xa,r=n.length-1;for(let o=0;o<r;o++){let a=s(n[o],n[o+1]);if(t){let l=Array.isArray(t)?t[o]||Ze:t;a=tr(l,a)}i.push(a)}return i}function ya(n,t,{clamp:e=!0,ease:i,mixer:s}={}){let r=n.length;if(Bn(r===t.length,"Both input and output ranges must be the same length"),r===1)return()=>t[0];if(r===2&&t[0]===t[1])return()=>t[1];let o=n[0]===n[1];n[0]>n[r-1]&&(n=[...n].reverse(),t=[...t].reverse());let a=Y0(t,i,s),l=a.length,c=h=>{if(o&&h<n[0])return t[0];let u=0;if(l>1)for(;u<n.length-2&&!(h<n[u+1]);u++);let d=Zn(n[u],n[u+1],h);return a[u](d)};return e?h=>c(sn(n[0],n[r-1],h)):c}function Mf(n,t){return n.map(e=>e*t)}function q0(n,t){return n.map(()=>t||_a).splice(0,n.length-1)}function io({duration:n=300,keyframes:t,times:e,ease:i="easeInOut"}){let s=Yo(i)?i.map(Lc):Lc(i),r={done:!1,value:t[0]},o=Mf(e&&e.length===t.length?e:ks(t),n),a=ya(o,t,{ease:Array.isArray(s)?s:q0(t,s)});return{calculatedDuration:n,next:l=>(r.value=a(l),r.done=l>=n,r)}}var bf=n=>{let t=({timestamp:e})=>n(e);return{start:()=>Ne.update(t,!0),stop:()=>fi(t),now:()=>Fi.isProcessing?Fi.timestamp:Mn.now()}};var $0={decay:Dc,inertia:Dc,tween:io,keyframes:io,spring:Vs},Z0=n=>n/100,ps=class extends Qs{constructor(t){super(t),this.holdTime=null,this.cancelTime=null,this.currentTime=0,this.playbackSpeed=1,this.pendingPlayState="running",this.startTime=null,this.state="idle",this.stop=()=>{if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.teardown();let{onStop:l}=this.options;l&&l()};let{name:e,motionValue:i,element:s,keyframes:r}=this.options,o=s?.KeyframeResolver||ki,a=(l,c)=>this.onKeyframesResolved(l,c);this.resolver=new o(r,a,e,i,s),this.resolver.scheduleResolve()}flatten(){super.flatten(),this._resolved&&Object.assign(this._resolved,this.initPlayback(this._resolved.keyframes))}initPlayback(t){let{type:e="keyframes",repeat:i=0,repeatDelay:s=0,repeatType:r,velocity:o=0}=this.options,a=Ni(e)?e:$0[e]||io,l,c;a!==io&&typeof t[0]!="number"&&(l=tr(Z0,xa(t[0],t[1])),t=[0,100]);let h=a({...this.options,keyframes:t});r==="mirror"&&(c=a({...this.options,keyframes:[...t].reverse(),velocity:-o})),h.calculatedDuration===null&&(h.calculatedDuration=Bs(h));let{calculatedDuration:u}=h,d=u+s,p=d*(i+1)-s;return{generator:h,mirroredGenerator:c,mapPercentToKeyframes:l,calculatedDuration:u,resolvedDuration:d,totalDuration:p}}onPostResolved(){let{autoplay:t=!0}=this.options;this.play(),this.pendingPlayState==="paused"||!t?this.pause():this.state=this.pendingPlayState}tick(t,e=!1){let{resolved:i}=this;if(!i){let{keyframes:R}=this.options;return{done:!0,value:R[R.length-1]}}let{finalKeyframe:s,generator:r,mirroredGenerator:o,mapPercentToKeyframes:a,keyframes:l,calculatedDuration:c,totalDuration:h,resolvedDuration:u}=i;if(this.startTime===null)return r.next(0);let{delay:d,repeat:p,repeatType:g,repeatDelay:x,onUpdate:m}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-h/this.speed,this.startTime)),e?this.currentTime=t:this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=Math.round(t-this.startTime)*this.speed;let f=this.currentTime-d*(this.speed>=0?1:-1),w=this.speed>=0?f<0:f>h;this.currentTime=Math.max(f,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=h);let T=this.currentTime,y=r;if(p){let R=Math.min(this.currentTime,h)/u,M=Math.floor(R),v=R%1;!v&&R>=1&&(v=1),v===1&&M--,M=Math.min(M,p+1),M%2&&(g==="reverse"?(v=1-v,x&&(v-=x/u)):g==="mirror"&&(y=o)),T=sn(0,1,v)*u}let P=w?{done:!1,value:l[0]}:y.next(T);a&&(P.value=a(P.value));let{done:C}=P;!w&&c!==null&&(C=this.speed>=0?this.currentTime>=h:this.currentTime<=0);let A=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&C);return A&&s!==void 0&&(P.value=Hi(l,this.options,s)),m&&m(P.value),A&&this.finish(),P}get duration(){let{resolved:t}=this;return t?pn(t.calculatedDuration):0}get time(){return pn(this.currentTime)}set time(t){t=Ke(t),this.currentTime=t,this.holdTime!==null||this.speed===0?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.speed)}get speed(){return this.playbackSpeed}set speed(t){let e=this.playbackSpeed!==t;this.playbackSpeed=t,e&&(this.time=pn(this.currentTime))}play(){if(this.resolver.isScheduled||this.resolver.resume(),!this._resolved){this.pendingPlayState="running";return}if(this.isStopped)return;let{driver:t=bf,onPlay:e,startTime:i}=this.options;this.driver||(this.driver=t(r=>this.tick(r))),e&&e();let s=this.driver.now();this.holdTime!==null?this.startTime=s-this.holdTime:this.startTime?this.state==="finished"&&(this.startTime=s):this.startTime=i??this.calcStartTime(),this.state==="finished"&&this.updateFinishedPromise(),this.cancelTime=this.startTime,this.holdTime=null,this.state="running",this.driver.start()}pause(){var t;if(!this._resolved){this.pendingPlayState="paused";return}this.state="paused",this.holdTime=(t=this.currentTime)!==null&&t!==void 0?t:0}complete(){this.state!=="running"&&this.play(),this.pendingPlayState=this.state="finished",this.holdTime=null}finish(){this.teardown(),this.state="finished";let{onComplete:t}=this.options;t&&t()}cancel(){this.cancelTime!==null&&this.tick(this.cancelTime),this.teardown(),this.updateFinishedPromise()}teardown(){this.state="idle",this.stopDriver(),this.resolveFinishedPromise(),this.updateFinishedPromise(),this.startTime=this.cancelTime=null,this.resolver.cancel()}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}};var Tf=new Set(["opacity","clipPath","filter","transform"]);function wf(n,t,e,{delay:i=0,duration:s=300,repeat:r=0,repeatType:o="loop",ease:a="easeInOut",times:l}={}){let c={[t]:e};l&&(c.offset=l);let h=xc(a,s);return Array.isArray(h)&&(c.easing=h),n.animate(c,{delay:i,duration:s,easing:Array.isArray(h)?"linear":h,fill:"both",iterations:r+1,direction:o==="reverse"?"alternate":"normal"})}var Ef=Fs(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));var va=10,K0=2e4;function J0(n){return Ni(n.type)||n.type==="spring"||!gc(n.ease)}function Q0(n,t){let e=new ps({...t,keyframes:n,repeat:0,delay:0,isGenerator:!0}),i={done:!1,value:n[0]},s=[],r=0;for(;!i.done&&r<K0;)i=e.sample(r),s.push(i.value),r+=va;return{times:void 0,keyframes:s,duration:r-va,ease:"linear"}}var Af={anticipate:oa,backInOut:ra,circInOut:la};function j0(n){return n in Af}var so=class extends Qs{constructor(t){super(t);let{name:e,motionValue:i,element:s,keyframes:r}=this.options;this.resolver=new Js(r,(o,a)=>this.onKeyframesResolved(o,a),e,i,s),this.resolver.scheduleResolve()}initPlayback(t,e){let{duration:i=300,times:s,ease:r,type:o,motionValue:a,name:l,startTime:c}=this.options;if(!a.owner||!a.owner.current)return!1;if(typeof r=="string"&&Xs()&&j0(r)&&(r=Af[r]),J0(this.options)){let{onComplete:u,onUpdate:d,motionValue:p,element:g,...x}=this.options,m=Q0(t,x);t=m.keyframes,t.length===1&&(t[1]=t[0]),i=m.duration,s=m.times,r=m.ease,o="keyframes"}let h=wf(a.owner.current,l,t,{...this.options,duration:i,times:s,ease:r});return h.startTime=c??this.calcStartTime(),this.pendingTimeline?(pc(h,this.pendingTimeline),this.pendingTimeline=void 0):h.onfinish=()=>{let{onComplete:u}=this.options;a.set(Hi(t,this.options,e)),u&&u(),this.cancel(),this.resolveFinishedPromise()},{animation:h,duration:i,times:s,type:o,ease:r,keyframes:t}}get duration(){let{resolved:t}=this;if(!t)return 0;let{duration:e}=t;return pn(e)}get time(){let{resolved:t}=this;if(!t)return 0;let{animation:e}=t;return pn(e.currentTime||0)}set time(t){let{resolved:e}=this;if(!e)return;let{animation:i}=e;i.currentTime=Ke(t)}get speed(){let{resolved:t}=this;if(!t)return 1;let{animation:e}=t;return e.playbackRate}set speed(t){let{resolved:e}=this;if(!e)return;let{animation:i}=e;i.playbackRate=t}get state(){let{resolved:t}=this;if(!t)return"idle";let{animation:e}=t;return e.playState}get startTime(){let{resolved:t}=this;if(!t)return null;let{animation:e}=t;return e.startTime}attachTimeline(t){if(!this._resolved)this.pendingTimeline=t;else{let{resolved:e}=this;if(!e)return Ze;let{animation:i}=e;pc(i,t)}return Ze}play(){if(this.isStopped)return;let{resolved:t}=this;if(!t)return;let{animation:e}=t;e.playState==="finished"&&this.updateFinishedPromise(),e.play()}pause(){let{resolved:t}=this;if(!t)return;let{animation:e}=t;e.pause()}stop(){if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.resolveFinishedPromise(),this.updateFinishedPromise();let{resolved:t}=this;if(!t)return;let{animation:e,keyframes:i,duration:s,type:r,ease:o,times:a}=t;if(e.playState==="idle"||e.playState==="finished")return;if(this.time){let{motionValue:c,onUpdate:h,onComplete:u,element:d,...p}=this.options,g=new ps({...p,keyframes:i,duration:s,type:r,ease:o,times:a,isGenerator:!0}),x=Ke(this.time);c.setWithVelocity(g.sample(x-va).value,g.sample(x).value,va)}let{onStop:l}=this.options;l&&l(),this.cancel()}complete(){let{resolved:t}=this;t&&t.animation.finish()}cancel(){let{resolved:t}=this;t&&t.animation.cancel()}static supports(t){let{motionValue:e,name:i,repeatDelay:s,repeatType:r,damping:o,type:a}=t;if(!e||!e.owner||!(e.owner.current instanceof HTMLElement))return!1;let{onUpdate:l,transformTemplate:c}=e.owner.getProps();return Ef()&&i&&Tf.has(i)&&!l&&!c&&!s&&r!=="mirror"&&o!==0&&a!=="inertia"}};var tx={type:"spring",stiffness:500,damping:25,restSpeed:10},ex=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),nx={type:"keyframes",duration:.8},ix={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},Cf=(n,{keyframes:t})=>t.length>2?nx:Sn.has(n)?n.startsWith("scale")?ex(t[1]):tx:ix;function Rf({when:n,delay:t,delayChildren:e,staggerChildren:i,staggerDirection:s,repeat:r,repeatType:o,repeatDelay:a,from:l,elapsed:c,...h}){return!!Object.keys(h).length}var Sa=(n,t,e,i={},s,r)=>o=>{let a=Jo(i,n)||{},l=a.delay||i.delay||0,{elapsed:c=0}=i;c=c-Ke(l);let h={keyframes:Array.isArray(e)?e:[null,e],ease:"easeOut",velocity:t.getVelocity(),...a,delay:-c,onUpdate:d=>{t.set(d),a.onUpdate&&a.onUpdate(d)},onComplete:()=>{o(),a.onComplete&&a.onComplete()},name:n,motionValue:t,element:r?void 0:s};Rf(a)||(h={...h,...Cf(n,h)}),h.duration&&(h.duration=Ke(h.duration)),h.repeatDelay&&(h.repeatDelay=Ke(h.repeatDelay)),h.from!==void 0&&(h.keyframes[0]=h.from);let u=!1;if((h.type===!1||h.duration===0&&!h.repeatDelay)&&(h.duration=0,h.delay===0&&(u=!0)),(na.current||Hs.skipAnimations)&&(u=!0,h.duration=0,h.delay=0),u&&!r&&t.get()!==void 0){let d=Hi(h.keyframes,a);if(d!==void 0)return Ne.update(()=>{h.onUpdate(d),h.onComplete()}),new Os([])}return!r&&so.supports(h)?new so(h):new ps(h)};function sx({protectedKeys:n,needsAnimating:t},e){let i=n.hasOwnProperty(e)&&t[e]!==!0;return t[e]=!1,i}function Pf(n,t,{delay:e=0,transitionOverride:i,type:s}={}){var r;let{transition:o=n.getDefaultTransition(),transitionEnd:a,...l}=t;i&&(o=i);let c=[],h=s&&n.animationState&&n.animationState.getState()[s];for(let u in l){let d=n.getValue(u,(r=n.latestValues[u])!==null&&r!==void 0?r:null),p=l[u];if(p===void 0||h&&sx(h,u))continue;let g={delay:e,...Jo(o||{},u)},x=!1;if(window.MotionHandoffAnimation){let f=Vd(n);if(f){let w=window.MotionHandoffAnimation(f,u,Ne);w!==null&&(g.startTime=w,x=!0)}}Bd(n,u),d.start(Sa(u,d,p,n.shouldReduceMotion&&Qo.has(u)?{type:!1}:g,n,x));let m=d.animation;m&&c.push(m)}return a&&Promise.all(c).then(()=>{Ne.update(()=>{a&&Fd(n,a)})}),c}function If(n){return n instanceof SVGElement&&n.tagName!=="svg"}var Df=()=>({min:0,max:0}),er=()=>({x:Df(),y:Df()});var Lf={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},Ma={};for(let n in Lf)Ma[n]={isEnabled:t=>Lf[n].some(e=>!!t[e])};var Uf=typeof window<"u";var ro={current:null},ba={current:!1};function Nf(){if(ba.current=!0,!!Uf)if(window.matchMedia){let n=window.matchMedia("(prefers-reduced-motion)"),t=()=>ro.current=n.matches;n.addListener(t),t()}else ro.current=!1}var rx=[...Ec,ze,bn],Ff=n=>rx.find(pa(n));function Of(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function Bf(n){return typeof n=="string"||Array.isArray(n)}var ox=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],zf=["initial",...ox];function Uc(n){return Of(n.animate)||zf.some(t=>Bf(n[t]))}function Vf(n){return!!(Uc(n)||n.variants)}function kf(n,t,e){for(let i in t){let s=t[i],r=e[i];if(Re(s))n.addValue(i,s);else if(Re(r))n.addValue(i,pi(s,{owner:n}));else if(r!==s)if(n.hasValue(i)){let o=n.getValue(i);o.liveStyle===!0?o.jump(s):o.hasAnimated||o.set(s)}else{let o=n.getStaticValue(i);n.addValue(i,pi(o!==void 0?o:s,{owner:n}))}}for(let i in e)t[i]===void 0&&n.removeValue(i);return t}var Hf=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],nr=class{scrapeMotionValuesFromProps(t,e,i){return{}}constructor({parent:t,props:e,presenceContext:i,reducedMotionConfig:s,blockInitialAnimation:r,visualState:o},a={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=ki,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let p=Mn.now();this.renderScheduledAt<p&&(this.renderScheduledAt=p,Ne.render(this.render,!1,!0))};let{latestValues:l,renderState:c,onUpdate:h}=o;this.onUpdate=h,this.latestValues=l,this.baseTarget={...l},this.initialValues=e.initial?{...l}:{},this.renderState=c,this.parent=t,this.props=e,this.presenceContext=i,this.depth=t?t.depth+1:0,this.reducedMotionConfig=s,this.options=a,this.blockInitialAnimation=!!r,this.isControllingVariants=Uc(e),this.isVariantNode=Vf(e),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);let{willChange:u,...d}=this.scrapeMotionValuesFromProps(e,{},this);for(let p in d){let g=d[p];l[p]!==void 0&&Re(g)&&g.set(l[p],!1)}}mount(t){this.current=t,di.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((e,i)=>this.bindToMotionValue(i,e)),ba.current||Nf(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:ro.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){di.delete(this.current),this.projection&&this.projection.unmount(),fi(this.notifyUpdate),fi(this.render),this.valueSubscriptions.forEach(t=>t()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(let t in this.events)this.events[t].clear();for(let t in this.features){let e=this.features[t];e&&(e.unmount(),e.isMounted=!1)}this.current=null}bindToMotionValue(t,e){this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)();let i=Sn.has(t),s=e.on("change",a=>{this.latestValues[t]=a,this.props.onUpdate&&Ne.preRender(this.notifyUpdate),i&&this.projection&&(this.projection.isTransformDirty=!0)}),r=e.on("renderRequest",this.scheduleRender),o;window.MotionCheckAppearSync&&(o=window.MotionCheckAppearSync(this,t,e)),this.valueSubscriptions.set(t,()=>{s(),r(),o&&o(),e.owner&&e.stop()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}updateFeatures(){let t="animation";for(t in Ma){let e=Ma[t];if(!e)continue;let{isEnabled:i,Feature:s}=e;if(!this.features[t]&&s&&i(this.props)&&(this.features[t]=new s(this)),this.features[t]){let r=this.features[t];r.isMounted?r.update():(r.mount(),r.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):er()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,e){this.latestValues[t]=e}update(t,e){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=e;for(let i=0;i<Hf.length;i++){let s=Hf[i];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);let r="on"+s,o=t[r];o&&(this.propEventSubscriptions[s]=this.on(s,o))}this.prevMotionValues=kf(this,this.scrapeMotionValuesFromProps(t,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue(),this.onUpdate&&this.onUpdate(this)}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(t){let e=this.getClosestVariantNode();if(e)return e.variantChildren&&e.variantChildren.add(t),()=>e.variantChildren.delete(t)}addValue(t,e){let i=this.values.get(t);e!==i&&(i&&this.removeValue(t),this.bindToMotionValue(t,e),this.values.set(t,e),this.latestValues[t]=e.get())}removeValue(t){this.values.delete(t);let e=this.valueSubscriptions.get(t);e&&(e(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,e){if(this.props.values&&this.props.values[t])return this.props.values[t];let i=this.values.get(t);return i===void 0&&e!==void 0&&(i=pi(e===null?void 0:e,{owner:this}),this.addValue(t,i)),i}readValue(t,e){var i;let s=this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:(i=this.getBaseTargetFromProps(this.props,t))!==null&&i!==void 0?i:this.readValueFromInstance(this.current,t,this.options);return s!=null&&(typeof s=="string"&&(da(s)||ca(s))?s=parseFloat(s):!Ff(s)&&bn.test(e)&&(s=ua(t,e)),this.setBaseTarget(t,Re(s)?s.get():s)),Re(s)?s.get():s}setBaseTarget(t,e){this.baseTarget[t]=e}getBaseTarget(t){var e;let{initial:i}=this.props,s;if(typeof i=="string"||typeof i=="object"){let o=ea(this.props,i,(e=this.presenceContext)===null||e===void 0?void 0:e.custom);o&&(s=o[t])}if(i&&s!==void 0)return s;let r=this.getBaseTargetFromProps(this.props,t);return r!==void 0&&!Re(r)?r:this.initialValues[t]!==void 0&&s===void 0?void 0:this.baseTarget[t]}on(t,e){return this.events[t]||(this.events[t]=new Gs),this.events[t].add(e)}notify(t,...e){this.events[t]&&this.events[t].notify(...e)}};var ir=class extends nr{constructor(){super(...arguments),this.KeyframeResolver=Js}sortInstanceNodePosition(t,e){return t.compareDocumentPosition(e)&2?1:-1}getBaseTargetFromProps(t,e){return t.style?t.style[e]:void 0}removeValueFromRenderState(t,{vars:e,style:i}){delete e[t],delete i[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:t}=this.props;Re(t)&&(this.childSubscription=t.on("change",e=>{this.current&&(this.current.textContent=`${e}`)}))}};var Ta=(n,t)=>t&&typeof n=="number"?t.transform(n):n;var ax={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},lx=Jn.length;function Gf(n,t,e){let i="",s=!0;for(let r=0;r<lx;r++){let o=Jn[r],a=n[o];if(a===void 0)continue;let l=!0;if(typeof a=="number"?l=a===(o.startsWith("scale")?1:0):l=parseFloat(a)===0,!l||e){let c=Ta(a,$s[o]);if(!l){s=!1;let h=ax[o]||o;i+=`${h}(${c}) `}e&&(t[o]=c)}}return i=i.trim(),e?i=e(t,s?"":i):s&&(i="none"),i}function wa(n,t,e){let{style:i,vars:s,transformOrigin:r}=n,o=!1,a=!1;for(let l in t){let c=t[l];if(Sn.has(l)){o=!0;continue}else if(fa(l)){s[l]=c;continue}else{let h=Ta(c,$s[l]);l.startsWith("origin")?(a=!0,r[l]=h):i[l]=h}}if(t.transform||(o||e?i.transform=Gf(t,n.transform,e):i.transform&&(i.transform="none")),a){let{originX:l="50%",originY:c="50%",originZ:h=0}=r;i.transformOrigin=`${l} ${c} ${h}`}}var cx={offset:"stroke-dashoffset",array:"stroke-dasharray"},hx={offset:"strokeDashoffset",array:"strokeDasharray"};function Wf(n,t,e=1,i=0,s=!0){n.pathLength=1;let r=s?cx:hx;n[r.offset]=Xt.transform(-i);let o=Xt.transform(t),a=Xt.transform(e);n[r.array]=`${o} ${a}`}function Xf(n,t,e){return typeof n=="string"?n:Xt.transform(t+e*n)}function Yf(n,t,e){let i=Xf(t,n.x,n.width),s=Xf(e,n.y,n.height);return`${i} ${s}`}function qf(n,{attrX:t,attrY:e,attrScale:i,originX:s,originY:r,pathLength:o,pathSpacing:a=1,pathOffset:l=0,...c},h,u){if(wa(n,c,u),h){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};let{attrs:d,style:p,dimensions:g}=n;d.transform&&(g&&(p.transform=d.transform),delete d.transform),g&&(s!==void 0||r!==void 0||p.transform)&&(p.transformOrigin=Yf(g,s!==void 0?s:.5,r!==void 0?r:.5)),t!==void 0&&(d.x=t),e!==void 0&&(d.y=e),i!==void 0&&(d.scale=i),o!==void 0&&Wf(d,o,a,l,!1)}var Ea=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);var $f=n=>typeof n=="string"&&n.toLowerCase()==="svg";function Aa(n,{style:t,vars:e},i,s){Object.assign(n.style,t,s&&s.getProjectionStyles(i));for(let r in e)n.style.setProperty(r,e[r])}function Zf(n,t,e,i){Aa(n,t,void 0,i);for(let s in t.attrs)n.setAttribute(Ea.has(s)?s:Ws(s),t.attrs[s])}var Kf={};function Jf(n,{layout:t,layoutId:e}){return Sn.has(n)||n.startsWith("origin")||(t||e!==void 0)&&(!!Kf[n]||n==="opacity")}function Ca(n,t,e){var i;let{style:s}=n,r={};for(let o in s)(Re(s[o])||t.style&&Re(t.style[o])||Jf(o,n)||((i=e?.getValue(o))===null||i===void 0?void 0:i.liveStyle)!==void 0)&&(r[o]=s[o]);return r}function Qf(n,t,e){let i=Ca(n,t,e);for(let s in n)if(Re(n[s])||Re(t[s])){let r=Jn.indexOf(s)!==-1?"attr"+s.charAt(0).toUpperCase()+s.substring(1):s;i[r]=n[s]}return i}var Ra=class extends ir{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=er}getBaseTargetFromProps(t,e){return t[e]}readValueFromInstance(t,e){if(Sn.has(e)){let i=Zs(e);return i&&i.default||0}return e=Ea.has(e)?e:Ws(e),t.getAttribute(e)}scrapeMotionValuesFromProps(t,e,i){return Qf(t,e,i)}build(t,e,i){qf(t,e,this.isSVGTag,i.transformTemplate)}renderInstance(t,e,i,s){Zf(t,e,i,s)}mount(t){this.isSVGTag=$f(t.tagName),super.mount(t)}};function jf({top:n,left:t,right:e,bottom:i}){return{x:{min:t,max:e},y:{min:n,max:i}}}function tp(n,t){if(!t)return n;let e=t({x:n.left,y:n.top}),i=t({x:n.right,y:n.bottom});return{top:e.y,left:e.x,bottom:i.y,right:i.x}}function ep(n,t){return jf(tp(n.getBoundingClientRect(),t))}function ux(n){return window.getComputedStyle(n)}var Pa=class extends ir{constructor(){super(...arguments),this.type="html",this.renderInstance=Aa}readValueFromInstance(t,e){if(Sn.has(e)){let i=Zs(e);return i&&i.default||0}else{let i=ux(t),s=(fa(e)?i.getPropertyValue(e):i[e])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(t,{transformPagePoint:e}){return ep(t,e)}build(t,e,i){wa(t,e,i.transformTemplate)}scrapeMotionValuesFromProps(t,e,i){return Ca(t,e,i)}};function dx(n,t){return n in t}var Ia=class extends nr{constructor(){super(...arguments),this.type="object"}readValueFromInstance(t,e){if(dx(e,t)){let i=t[e];if(typeof i=="string"||typeof i=="number")return i}}getBaseTargetFromProps(){}removeValueFromRenderState(t,e){delete e.output[t]}measureInstanceViewportBox(){return er()}build(t,e){Object.assign(t.output,e)}renderInstance(t,{output:e}){Object.assign(t,e)}sortInstanceNodePosition(){return 0}};function np(n){let t={presenceContext:null,props:{},visualState:{renderState:{transform:{},transformOrigin:{},style:{},vars:{},attrs:{}},latestValues:{}}},e=If(n)?new Ra(t):new Pa(t);e.mount(n),di.set(n,e)}function ip(n){let t={presenceContext:null,props:{},visualState:{renderState:{output:{}},latestValues:{}}},e=new Ia(t);e.mount(n),di.set(n,e)}function sp(n,t,e){let i=Re(n)?n:pi(n);return i.start(Sa("",i,t,e)),i.animation}function fx(n,t){return Re(n)||typeof n=="number"||typeof n=="string"&&!Zr(t)}function Da(n,t,e,i){let s=[];if(fx(n,t))s.push(sp(n,Zr(t)&&t.default||t,e&&(e.default||e)));else{let r=Zo(n,t,i),o=r.length;Bn(!!o,"No valid elements provided.");for(let a=0;a<o;a++){let l=r[a],c=l instanceof Element?np:ip;di.has(l)||c(l);let h=di.get(l),u={...e};"delay"in u&&typeof u.delay=="function"&&(u.delay=u.delay(a,o)),s.push(...Pf(h,{...t,transition:u},{}))}}return s}function rp(n,t,e){let i=[];return Ad(n,t,e,{spring:Vs}).forEach(({keyframes:r,transition:o},a)=>{i.push(...Da(a,r,o))}),i}function px(n){return Array.isArray(n)&&n.some(Array.isArray)}function op(n){function t(e,i,s){let r=[];px(e)?r=rp(e,i,n):r=Da(e,i,s,n);let o=new Os(r);return n&&n.animations.push(o),o}return t}var Nc=op();function Fc(n,t){let e,i=()=>{let{currentTime:s}=t,o=(s===null?0:s.value)/100;e!==o&&n(o),e=o};return Ne.update(i,!0),()=>fi(i)}var La=new WeakMap,Gi;function mx(n,t){if(t){let{inlineSize:e,blockSize:i}=t[0];return{width:e,height:i}}else return n instanceof SVGElement&&"getBBox"in n?n.getBBox():{width:n.offsetWidth,height:n.offsetHeight}}function gx({target:n,contentRect:t,borderBoxSize:e}){var i;(i=La.get(n))===null||i===void 0||i.forEach(s=>{s({target:n,contentSize:t,get size(){return mx(n,e)}})})}function xx(n){n.forEach(gx)}function _x(){typeof ResizeObserver>"u"||(Gi=new ResizeObserver(xx))}function ap(n,t){Gi||_x();let e=Ns(n);return e.forEach(i=>{let s=La.get(i);s||(s=new Set,La.set(i,s)),s.add(t),Gi?.observe(i)}),()=>{e.forEach(i=>{let s=La.get(i);s?.delete(t),s?.size||Gi?.unobserve(i)})}}var Ua=new Set,oo;function yx(){oo=()=>{let n={width:window.innerWidth,height:window.innerHeight},t={target:window,size:n,contentSize:n};Ua.forEach(e=>e(t))},window.addEventListener("resize",oo)}function lp(n){return Ua.add(n),oo||yx(),()=>{Ua.delete(n),!Ua.size&&oo&&(oo=void 0)}}function cp(n,t){return typeof n=="function"?lp(n):ap(n,t)}var vx=50,hp=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),dp=()=>({time:0,x:hp(),y:hp()}),Sx={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function up(n,t,e,i){let s=e[t],{length:r,position:o}=Sx[t],a=s.current,l=e.time;s.current=n[`scroll${o}`],s.scrollLength=n[`scroll${r}`]-n[`client${r}`],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=Zn(0,s.scrollLength,s.current);let c=i-l;s.velocity=c>vx?0:zs(s.current-a,c)}function fp(n,t,e){up(n,"x",t,e),up(n,"y",t,e),t.time=e}function pp(n,t){let e={x:0,y:0},i=n;for(;i&&i!==t;)if(i instanceof HTMLElement)e.x+=i.offsetLeft,e.y+=i.offsetTop,i=i.offsetParent;else if(i.tagName==="svg"){let s=i.getBoundingClientRect();i=i.parentElement;let r=i.getBoundingClientRect();e.x+=s.left-r.left,e.y+=s.top-r.top}else if(i instanceof SVGGraphicsElement){let{x:s,y:r}=i.getBBox();e.x+=s,e.y+=r;let o=null,a=i.parentNode;for(;!o;)a.tagName==="svg"&&(o=a),a=i.parentNode;i=o}else break;return e}var Na={start:0,center:.5,end:1};function Oc(n,t,e=0){let i=0;if(n in Na&&(n=Na[n]),typeof n=="string"){let s=parseFloat(n);n.endsWith("px")?i=s:n.endsWith("%")?n=s/100:n.endsWith("vw")?i=s/100*document.documentElement.clientWidth:n.endsWith("vh")?i=s/100*document.documentElement.clientHeight:n=s}return typeof n=="number"&&(i=t*n),e+i}var Mx=[0,0];function mp(n,t,e,i){let s=Array.isArray(n)?n:Mx,r=0,o=0;return typeof n=="number"?s=[n,n]:typeof n=="string"&&(n=n.trim(),n.includes(" ")?s=n.split(" "):s=[n,Na[n]?n:"0"]),r=Oc(s[0],e,i),o=Oc(s[1],t),r-o}var gp={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]};var bx={x:0,y:0};function Tx(n){return"getBBox"in n&&n.tagName!=="svg"?n.getBBox():{width:n.clientWidth,height:n.clientHeight}}function xp(n,t,e){let{offset:i=gp.All}=e,{target:s=n,axis:r="y"}=e,o=r==="y"?"height":"width",a=s!==n?pp(s,n):bx,l=s===n?{width:n.scrollWidth,height:n.scrollHeight}:Tx(s),c={width:n.clientWidth,height:n.clientHeight};t[r].offset.length=0;let h=!t[r].interpolate,u=i.length;for(let d=0;d<u;d++){let p=mp(i[d],c[o],l[o],a[r]);!h&&p!==t[r].interpolatorOffsets[d]&&(h=!0),t[r].offset[d]=p}h&&(t[r].interpolate=ya(t[r].offset,ks(i),{clamp:!1}),t[r].interpolatorOffsets=[...t[r].offset]),t[r].progress=sn(0,1,t[r].interpolate(t[r].current))}function wx(n,t=n,e){if(e.x.targetOffset=0,e.y.targetOffset=0,t!==n){let i=t;for(;i&&i!==n;)e.x.targetOffset+=i.offsetLeft,e.y.targetOffset+=i.offsetTop,i=i.offsetParent}e.x.targetLength=t===n?t.scrollWidth:t.clientWidth,e.y.targetLength=t===n?t.scrollHeight:t.clientHeight,e.x.containerLength=n.clientWidth,e.y.containerLength=n.clientHeight}function _p(n,t,e,i={}){return{measure:()=>wx(n,i.target,e),update:s=>{fp(n,e,s),(i.offset||i.target)&&xp(n,e,i)},notify:()=>t(e)}}var ao=new WeakMap,yp=new WeakMap,Bc=new WeakMap,vp=n=>n===document.documentElement?window:n;function Fa(n,{container:t=document.documentElement,...e}={}){let i=Bc.get(t);i||(i=new Set,Bc.set(t,i));let s=dp(),r=_p(t,n,s,e);if(i.add(r),!ao.has(t)){let a=()=>{for(let d of i)d.measure()},l=()=>{for(let d of i)d.update(Fi.timestamp)},c=()=>{for(let d of i)d.notify()},h=()=>{Ne.read(a,!1,!0),Ne.read(l,!1,!0),Ne.update(c,!1,!0)};ao.set(t,h);let u=vp(t);window.addEventListener("resize",h,{passive:!0}),t!==document.documentElement&&yp.set(t,cp(t,h)),u.addEventListener("scroll",h,{passive:!0})}let o=ao.get(t);return Ne.read(o,!1,!0),()=>{var a;fi(o);let l=Bc.get(t);if(!l||(l.delete(r),l.size))return;let c=ao.get(t);ao.delete(t),c&&(vp(t).removeEventListener("scroll",c),(a=yp.get(t))===null||a===void 0||a(),window.removeEventListener("resize",c))}}function Ex({source:n,container:t,axis:e="y"}){n&&(t=n);let i={value:0},s=Fa(r=>{i.value=r[e].progress*100},{container:t,axis:e});return{currentTime:i,cancel:s}}var zc=new Map;function Sp({source:n,container:t=document.documentElement,axis:e="y"}={}){n&&(t=n),zc.has(t)||zc.set(t,{});let i=zc.get(t);return i[e]||(i[e]=ko()?new ScrollTimeline({source:t,axis:e}):Ex({source:t,axis:e})),i[e]}function Ax(n){return n.length===2}function Mp(n){return n&&(n.target||n.offset)}function Cx(n,t){return Ax(n)||Mp(t)?Fa(e=>{n(e[t.axis].progress,e)},t):Fc(n,Sp(t))}function Rx(n,t){if(n.flatten(),Mp(t))return n.pause(),Fa(e=>{n.time=n.duration*e[t.axis].progress},t);{let e=Sp(t);return n.attachTimeline?n.attachTimeline(e,i=>(i.pause(),Fc(s=>{i.time=i.duration*s},e))):Ze}}function Vc(n,{axis:t="y",...e}={}){let i={axis:t,...e};return typeof n=="function"?Cx(n,i):Rx(n,i)}var Px={some:0,all:1};function kc(n,t,{root:e,margin:i,amount:s="some"}={}){let r=Ns(n),o=new WeakMap,a=c=>{c.forEach(h=>{let u=o.get(h.target);if(h.isIntersecting!==!!u)if(h.isIntersecting){let d=t(h.target,h);typeof d=="function"?o.set(h.target,d):l.unobserve(h.target)}else typeof u=="function"&&(u(h),o.delete(h.target))})},l=new IntersectionObserver(a,{root:e,rootMargin:i,threshold:typeof s=="number"?s:Px[s]});return r.forEach(c=>l.observe(c)),()=>l.disconnect()}function bp(n){let t=n.getContext("2d"),e=matchMedia("(prefers-reduced-motion: reduce)").matches,i=Math.min(devicePixelRatio||1,2),{sin:s,cos:r,atan2:o,hypot:a,acos:l,min:c,max:h,PI:u,random:d}=Math,p=(b,D,G)=>b<D?D:b>G?G:b,g=b=>(b=p(b,0,1),b*b*(3-2*b)),x=(b,D,G)=>b+(D-b)*G,m=[10,10,11],f=[229,72,77],w=[255,46,52],T=b=>`${b}px "IBM Plex Mono", ui-monospace, monospace`,y=(b,D)=>`rgba(${b[0]|0},${b[1]|0},${b[2]|0},${p(D,0,1).toFixed(3)})`,P=(b,D,G)=>[x(b[0],D[0],G),x(b[1],D[1],G),x(b[2],D[2],G)],C=b=>{let D="";for(let G=0;G<b;G++)D+="0123456789abcdef"[d()*16|0];return D},A=0,R=0,M=!0,v=800,I=0,W=0,Y=!1;function q(){let b=n.getBoundingClientRect();A=b.width,R=b.height,n.width=Math.round(A*i),n.height=Math.round(R*i),t.setTransform(i,0,0,i,0,0),M=A/R>1.05,M?(v=c(R*.98,A*.7),I=A*.71,W=R*.5):(v=c(A*.95,R*.46),I=A*.5,W=R*.8),Y&&ui()}q(),new ResizeObserver(q).observe(n);let it=0,O=0,Q=0,U=0;e||addEventListener("pointermove",b=>{Q=(b.clientX/innerWidth-.5)*2,U=(b.clientY/innerHeight-.5)*2},{passive:!0});let N={ex:0,ey:0,ez:0,fx:0,fy:0,fz:0,rx:0,rz:0,ux:0,uy:0,uz:0};function K(b,D){N.ex=s(b)*9.5,N.ez=r(b)*9.5,N.ey=3.6+D;let nt=-N.ex,ot=2.5-N.ey,pt=-N.ez,dt=a(nt,ot,pt);nt/=dt,ot/=dt,pt/=dt;let yt=-pt,Vt=nt,Jt=a(yt,Vt);yt/=Jt,Vt/=Jt,Object.assign(N,{fx:nt,fy:ot,fz:pt,rx:yt,rz:Vt,ux:-Vt*ot,uy:Vt*nt-yt*pt,uz:yt*ot})}let $=[0,0,0];function rt(b,D,G,et=$){let nt=b-N.ex,ot=D-N.ey,pt=G-N.ez,dt=nt*N.fx+ot*N.fy+pt*N.fz,yt=v/h(dt,.05);return et[0]=I+(nt*N.rx+pt*N.rz)*yt,et[1]=W-(nt*N.ux+ot*N.uy+pt*N.uz)*yt,et[2]=dt,et}let _t=(b,D)=>({m:b,t:D}),L=(b,D,G)=>_t([1,0,0,0,1,0,0,0,1],[b,D,G]),z=b=>_t([b,0,0,0,b,0,0,0,b],[0,0,0]),tt=b=>{let D=r(b),G=s(b);return _t([D,0,G,0,1,0,-G,0,D],[0,0,0])},J=b=>{let D=r(b),G=s(b);return _t([D,-G,0,G,D,0,0,0,1],[0,0,0])},ut=b=>{let D=r(b),G=s(b);return _t([1,0,0,0,D,-G,0,G,D],[0,0,0])};function mt(b,D){let G=b.m,et=D.m,nt=new Array(9),ot=D.t;for(let pt=0;pt<3;pt++)for(let dt=0;dt<3;dt++)nt[pt*3+dt]=G[pt*3]*et[dt]+G[pt*3+1]*et[3+dt]+G[pt*3+2]*et[6+dt];return _t(nt,[G[0]*ot[0]+G[1]*ot[1]+G[2]*ot[2]+b.t[0],G[3]*ot[0]+G[4]*ot[1]+G[5]*ot[2]+b.t[1],G[6]*ot[0]+G[7]*ot[1]+G[8]*ot[2]+b.t[2]])}let xt=(...b)=>b.reduce(mt),Pt=(b,D,G,et)=>[b.m[0]*D+b.m[1]*G+b.m[2]*et+b.t[0],b.m[3]*D+b.m[4]*G+b.m[5]*et+b.t[1],b.m[6]*D+b.m[7]*G+b.m[8]*et+b.t[2]];function kt(b,D,G,et){let nt=[b.m[0]*D+b.m[1]*G+b.m[2]*et,b.m[3]*D+b.m[4]*G+b.m[5]*et,b.m[6]*D+b.m[7]*G+b.m[8]*et],ot=a(nt[0],nt[1],nt[2]);return[nt[0]/ot,nt[1]/ot,nt[2]/ot]}let Yt=(b,D,G)=>{let et=a(b,D,G);return[b/et,D/et,G/et]},F=Yt(-.5,.85,.6),ce=Yt(.8,.2,-.55),Rt={metal:{c:[182,188,202],amb:.36,dif:.8,rim:.75},dark:{c:[72,76,88],amb:.5,dif:.6,rim:.65},accent:{c:[236,72,78],amb:.62,dif:.48,rim:.2},crate:{c:[216,212,202],amb:.4,dif:.66,rim:.45},dais:{c:[30,31,36],amb:.85,dif:.45,rim:1}};function qt(b,D,G,et){let nt=h(0,D[0]*F[0]+D[1]*F[1]+D[2]*F[2]),ot=h(0,D[0]*ce[0]+D[1]*ce[1]+D[2]*ce[2]),pt=b.amb+b.dif*nt,dt=ot*b.rim*.6,yt=b.c[0]*pt+229*dt+et*255,Vt=b.c[1]*pt+60*dt+et*110,Jt=b.c[2]*pt+66*dt+et*115,ue=p((G-8.5)/10,0,.6);return yt=c(255,x(yt,m[0],ue)),Vt=c(255,x(Vt,m[1],ue)),Jt=c(255,x(Jt,m[2],ue)),`rgb(${yt|0},${Vt|0},${Jt|0})`}let Nt=[],te=[],It=[[[1,3,7,5],[1,0,0]],[[0,4,6,2],[-1,0,0]],[[2,6,7,3],[0,1,0]],[[0,1,5,4],[0,-1,0]],[[4,5,7,6],[0,0,1]],[[0,2,3,1],[0,0,-1]]];function E(b,D,G,et=0,nt=Nt){let ot=0,pt=0,dt=0;for(let re of b)ot+=re[0],pt+=re[1],dt+=re[2];let yt=b.length;if(ot/=yt,pt/=yt,dt/=yt,D[0]*(ot-N.ex)+D[1]*(pt-N.ey)+D[2]*(dt-N.ez)>=0)return;let Vt=new Array(yt*2),Jt=0;for(let re=0;re<yt;re++){if(rt(b[re][0],b[re][1],b[re][2]),$[2]<.3)return;Vt[re*2]=$[0],Vt[re*2+1]=$[1],Jt+=$[2]}let ue=Jt/yt;nt.push({k:0,z:ue,s:Vt,fill:qt(G,D,ue,et)})}function _(b,D,G,et,nt,ot=0,pt){let dt=[];for(let yt=0;yt<8;yt++)dt.push(Pt(b,(yt&1?.5:-.5)*D,(yt&2?.5:-.5)*G,(yt&4?.5:-.5)*et));for(let[yt,Vt]of It)E(yt.map(Jt=>dt[Jt]),kt(b,Vt[0],Vt[1],Vt[2]),nt,ot,pt)}function X(b,D,G,et,nt,ot=0,pt){let dt=[],yt=[];for(let Vt=0;Vt<et;Vt++){let Jt=Vt/et*u*2;dt.push(Pt(b,r(Jt)*D,G/2,s(Jt)*D)),yt.push(Pt(b,r(Jt)*D,-G/2,s(Jt)*D))}for(let Vt=0;Vt<et;Vt++){let Jt=(Vt+1)%et,ue=(Vt+.5)/et*u*2;E([yt[Vt],yt[Jt],dt[Jt],dt[Vt]],kt(b,r(ue),0,s(ue)),nt,ot,pt)}E(dt,kt(b,0,1,0),nt,ot,pt),E(yt,kt(b,0,-1,0),nt,ot,pt)}let at=.95,ct=1.55,lt=1.35,Ut=.49;function vt(b){let D=o(-b[2],b[0]),G=a(b[0],b[2]),et=b[1]+Ut,nt=et-at,ot=p(a(G,nt),.4,ct+lt-.001),pt=o(nt,G)+l(p((ct*ct+ot*ot-lt*lt)/(2*ct*ot),-1,1)),dt=[ct*r(pt),at+ct*s(pt)],yt=o(et-dt[1],G-dt[0]);return{th:D,a1:pt,a2:yt,E:dt,Wr:[G,et]}}let Tt=(b,D,G)=>[D*r(b),G,-D*s(b)];function ne(b,D,G){let et=tt(b.th),{a1:nt,a2:ot,E:pt,Wr:dt}=b;X(L(0,.31,0),.64,.26,22,Rt.dark),X(xt(et,L(0,.6,0)),.47,.32,22,Rt.metal),X(xt(et,L(0,.465,0)),.5,.05,22,Rt.accent,G*.5),_(xt(et,L(0,.94,0)),.56,.46,.48,Rt.metal),X(xt(et,L(0,at,0),ut(u/2)),.21,.74,16,Rt.accent,G*.6),_(xt(et,L(ct/2*r(nt),at+ct/2*s(nt),0),J(nt)),ct+.08,.3,.36,Rt.metal),X(xt(et,L(pt[0],pt[1],0),ut(u/2)),.18,.52,16,Rt.accent,G*.6),_(xt(et,L((pt[0]+dt[0])/2,(pt[1]+dt[1])/2,0),J(ot)),lt,.24,.28,Rt.metal),X(xt(et,L(dt[0],dt[1],0),ut(u/2)),.13,.38,14,Rt.dark),_(xt(et,L(dt[0],dt[1]-.17,0)),.6,.12,.24,Rt.metal);for(let yt of[-1,1])_(xt(et,L(dt[0]+yt*D/2,dt[1]-.36,0)),.05,.26,.18,Rt.dark,G*.25)}let ft=[{th:-.5,r:1.62},{th:-2.4,r:1.5}],At=4.4,Dt=1.3,Wt=.24,wt=.52,Lt=.35,Bt=[[1,"GRIP"],[2.4,"MOVE"],[3.75,"PLACE"]];function _e(b){let D=Math.floor(b/At),G=b-D*At,et=ft[D%2],nt=ft[(D+1)%2],ot=et.th,pt=et.r,dt=Dt,yt=wt,Vt=!1,Jt=D%2;if(G<.8)dt=x(Dt,Wt,g(G/.8));else if(G<1.1)dt=Wt,yt=x(wt,Lt,g((G-.8)/.25)),Vt=G>1;else if(G<1.8)dt=x(Wt,Dt,g((G-1.1)/.7)),yt=Lt,Vt=!0;else if(G<3){let ue=g((G-1.8)/1.2);ot=x(et.th,nt.th,ue),pt=x(et.r,nt.r,ue),dt=Dt+.45*s(u*ue),yt=Lt,Vt=!0}else G<3.6?(ot=nt.th,pt=nt.r,dt=x(Dt,Wt,g((G-3)/.6)),yt=Lt,Vt=!0):G<3.9?(ot=nt.th,pt=nt.r,dt=Wt,yt=x(Lt,wt,g((G-3.65)/.25)),Vt=G<3.7,Vt||(Jt=(D+1)%2)):(ot=nt.th,pt=nt.r,dt=x(Wt,Dt,g((G-3.9)/.5)),Jt=(D+1)%2);return{th:ot,tip:[pt*r(ot),dt,-pt*s(ot)],g:yt,carry:Vt,at:Jt}}let B=2.3,bt=1.05,st=.2,ht=.42,Ct=-.35,St=22,$t=1.1,Ee=.5,We=.12,ae=b=>{let D=Ct+b*ht;return[B*r(D),bt+b*st,-B*s(D)]},ve=[],In=4096,Yr=4096,Dn=[],un=[],Ln=[],qr=[];function Uo(b){let D=Ae-b.born;if(D>=$t)return ae(D);let G=g(D/$t),et=ae($t),nt=[(b.start[0]+et[0])/2,h(b.start[1],et[1])+.9,(b.start[2]+et[2])/2],ot=(1-G)*(1-G),pt=2*(1-G)*G,dt=G*G;return[ot*b.start[0]+pt*nt[0]+dt*et[0],ot*b.start[1]+pt*nt[1]+dt*et[1],ot*b.start[2]+pt*nt[2]+dt*et[2]]}function cs(b,D){return[[0,.18,0],[0,.76,0],Tt(b.th,0,at),Tt(b.th,b.E[0],b.E[1]),Tt(b.th,b.Wr[0],b.Wr[1]),D.slice()]}function No(b){let D=et=>[et[0],et[1]-1.35,et[2]],G={id:++In,born:Ae,kind:b,hash:`${C(4)}\u2026${C(4)}`,snap:cs(k,S.tip).map(D),crate:D(Z.pos),start:[S.tip[0],S.tip[1]+.35,S.tip[2]],spin:d()*u*2,state:null,wp:null};ve.push(G),Yr++,Dn.push({t:0}),un.push({t:0,p:S.tip.slice()});for(let et=0;et<56;et++)Di({},!0,G)}function Di(b,D,G){let et=cs(k,S.tip),nt=D?S.tip:et[2+(d()*4|0)],ot=d()*u*2,pt=D?1.4+d()*1.8:.2+d()*.5;return Object.assign(b,{x:nt[0],y:nt[1],z:nt[2],vx:r(ot)*pt,vy:D?d()*1.6:.3+d()*.6,vz:s(ot)*pt,t:0,life:D?1.4+d()*.8:1.1+d()*1.6,tgt:G||ve[ve.length-1]||null,burst:D,heat:D?1:.35}),D&&Ln.push(b),b}for(let b=0;b<160;b++)qr.push({x:(d()-.5)*13,y:d()*6.5,z:(d()-.5)*10,ph:d()*6.28,s:.4+d()*.8});let Gt={phase:"idle",t:0,next:17.5,victim:null};function Fo(b){let D=b.map(G=>G.slice());return D[3][1]+=.55,D[3][0]+=.35,D[4][1]+=.8,D[4][2]+=.45,D[5][1]+=.9,D[5][2]+=.6,D}function lc(b){if(Gt.phase==="idle"){if(Ae<Gt.next)return;let D=null,G=1/0;for(let et of ve){let nt=Ae-et.born;if(nt<5||nt>13)continue;let ot=ae(nt),pt=rt(ot[0],ot[1],ot[2])[2];pt<G&&(G=pt,D=et)}if(!D){Gt.next=Ae+1;return}Gt.victim=D,D.state="edited",D.edited=Fo(D.snap),Gt.phase="glitch",Gt.t=0;return}if(Gt.t+=b,!ve.includes(Gt.victim)){Gt.phase="idle",Gt.victim=null,Gt.next=Ae+6;return}Gt.phase==="glitch"&&Gt.t>.7?(Gt.phase="broken",Gt.t=0):Gt.phase==="broken"&&Gt.t>2.8?(Gt.phase="restore",Gt.t=0):Gt.phase==="restore"&&(Gt.t>.8&&Gt.victim.state==="edited"&&(Gt.victim.state="restored",un.push({t:0,p:Gt.victim.wp,white:!0})),Gt.t>2&&(Gt.victim.state=null,Gt.victim=null,Gt.phase="idle",Gt.next=Ae+10.5))}function cc(b){let D=Gt.victim;if(!D||b.id<=D.id)return 0;let G=ve[ve.length-1].id;if(Gt.phase==="glitch")return 0;if(Gt.phase==="broken")return b.id<=D.id+(G-D.id+1)*g(Gt.t/1)?1:0;if(Gt.phase==="restore"){let et=D.id+(G-D.id+1)*g((Gt.t-.8)/.8);return b.id<=et?2:1}return 0}let Ae=0,S=_e(0),k=vt(S.tip),Z={pos:[0,0,0],yaw:0},j=0,H=b=>Math.floor(b/3)*At+Bt[b%3][0],gt=[];for(let b=0;b<300;b++)gt.push(Di({},!1));function Et(){if(S.carry)Z.pos=[S.tip[0],S.tip[1]+.09,S.tip[2]],Z.yaw=S.th;else{let b=ft[S.at];Z.pos=[b.r*r(b.th),.33,-b.r*s(b.th)],Z.yaw=b.th}}function Ft(b,D){b.t+=D;let G=b.tgt&&b.tgt.wp;if(G){let nt=(b.burst?2.2:.9)+b.t*3.2,ot=G[0]-b.x,pt=G[1]-b.y,dt=G[2]-b.z;b.vx+=(ot*nt-dt*.9)*D,b.vy+=pt*nt*D,b.vz+=(dt*nt+ot*.9)*D,ot*ot+pt*pt+dt*dt<.03&&(b.t=b.life)}else b.vy+=.4*D;let et=Math.exp(-2.4*D);b.vx*=et,b.vy*=et,b.vz*=et,b.x+=b.vx*D,b.y+=b.vy*D,b.z+=b.vz*D}function Ot(b){for(Ae+=b,S=_e(Ae),k=vt(S.tip),Et();Ae>=H(j);)No(Bt[j%3][1]),j++;for(let D=ve.length-1;D>=0;D--)Ae-ve[D].born>St&&ve.splice(D,1);for(let D of ve)D.wp=Uo(D);lc(b);for(let D of gt)Ft(D,b),D.t>=D.life&&Di(D,!1);for(let D=Ln.length-1;D>=0;D--)Ft(Ln[D],b),Ln[D].t>=Ln[D].life&&Ln.splice(D,1);for(let D=Dn.length-1;D>=0;D--)(Dn[D].t+=b)>.8&&Dn.splice(D,1);for(let D=un.length-1;D>=0;D--)(un[D].t+=b)>.6&&un.splice(D,1)}function Zt(b){t.beginPath(),t.moveTo(b[0],b[1]);for(let D=2;D<b.length;D+=2)t.lineTo(b[D],b[D+1]);t.closePath()}function Kt(b){b.sort((D,G)=>G.z-D.z),t.lineWidth=.8,t.lineJoin="round";for(let D of b)zt(D)}function zt(b){if(b.k===0)Zt(b.s),t.lineWidth=.8,t.fillStyle=b.fill,t.strokeStyle=b.fill,t.fill(),t.stroke();else if(b.k===1)Ht(b.c);else if(b.k===2)Un(b);else if(b.k===3)me(b);else if(b.k===4){let D=1-p((b.z-8.5)/8,0,.7);t.strokeStyle=y(f,.38*b.a*D),t.lineWidth=1.2,t.beginPath(),t.moveTo(b.s[0],b.s[1]),t.lineTo(b.s[2],b.s[3]),t.stroke()}}function ie(b,D,G,et,nt,ot=0){let pt=[];for(let dt=0;dt<=nt;dt++){let yt=ot+dt/nt*u*2;rt(b+r(yt)*et,D,G+s(yt)*et),pt.push($[0],$[1])}return pt}function xe(b,D){t.beginPath(),t.moveTo(b[0],b[1]);for(let G=2;G<b.length;G+=2)t.lineTo(b[G],b[G+1]);D&&t.closePath(),t.stroke()}function we(){let b=rt(0,0,0,[0,0,0]),D=rt(3.2,0,0,[0,0,0]),G=rt(0,0,3.2,[0,0,0]),et=rt(0,0,-3.2,[0,0,0]),nt=h(20,a(D[0]-b[0],D[1]-b[1])),ot=h(8,Math.abs(G[1]-et[1])/2);t.save(),t.translate(b[0],b[1]),t.scale(1,ot/nt);let pt=t.createRadialGradient(0,0,0,0,0,nt*1.6);pt.addColorStop(0,"rgba(229,72,77,0.22)"),pt.addColorStop(.45,"rgba(229,72,77,0.07)"),pt.addColorStop(1,"rgba(229,72,77,0)"),t.fillStyle=pt,t.beginPath(),t.arc(0,0,nt*1.6,0,u*2),t.fill(),t.restore();let dt=[[],[],[],[],[]],yt=10,Vt=[0,0,0],Jt=[0,0,0],ue=(re,Oe,fn,Oo)=>{let Bo=a((re+fn)/2,(Oe+Oo)/2),Fn=Math.floor((1-Bo/10)*5);Fn<0||(rt(re,0,Oe,Vt),rt(fn,0,Oo,Jt),!(Vt[2]<.4||Jt[2]<.4)&&dt[c(4,Fn)].push(Vt[0],Vt[1],Jt[0],Jt[1]))};for(let re=-yt;re<=yt;re++)for(let Oe=-yt;Oe<yt;Oe++)ue(re,Oe,re,Oe+1),ue(Oe,re,Oe+1,re);t.lineWidth=1;for(let re=0;re<5;re++){let Oe=dt[re];if(Oe.length){t.strokeStyle=`rgba(150,152,168,${(.03+re*.045).toFixed(3)})`,t.beginPath();for(let fn=0;fn<Oe.length;fn+=4)t.moveTo(Oe[fn],Oe[fn+1]),t.lineTo(Oe[fn+2],Oe[fn+3]);t.stroke()}}}function $e(){te=[],X(L(0,.09,0),1.95,.18,48,Rt.dais,0,te),Kt(te);let b=.181;t.lineWidth=1.4,t.strokeStyle="rgba(255,99,105,0.75)",xe(ie(0,b,0,1.93,64),!0),t.lineWidth=1,t.strokeStyle="rgba(229,72,77,0.45)",xe(ie(0,b,0,1.78,64),!0),t.strokeStyle="rgba(229,72,77,0.28)",xe(ie(0,b,0,1.05,48),!0),t.strokeStyle="rgba(255,120,125,0.55)",t.beginPath();let D=[0,0,0],G=[0,0,0];for(let et=0;et<72;et++){let nt=Ae*.12+et/72*u*2,ot=et%6===0;rt(r(nt)*1.3,b,s(nt)*1.3,D),rt(r(nt)*(ot?1.55:1.42),b,s(nt)*(ot?1.55:1.42),G),t.moveTo(D[0],D[1]),t.lineTo(G[0],G[1])}t.stroke();for(let et of ft){let nt=xt(L(et.r*r(et.th),b,-et.r*s(et.th)),tt(et.th)),ot=[];for(let[pt,dt]of[[-.24,-.24],[.24,-.24],[.24,.24],[-.24,.24]]){let yt=Pt(nt,pt,0,dt);rt(yt[0],yt[1],yt[2]),ot.push($[0],$[1])}t.fillStyle="rgba(229,72,77,0.08)",t.strokeStyle="rgba(255,99,105,0.6)",Zt(ot),t.fill(),t.stroke()}}function pe(b,D){return b.state==="edited"?Gt.phase==="glitch"&&d()<.5?[255,255,255]:w:b.state==="restored"?P([255,255,255],f,g((Gt.t-.8)/1.2)):P([255,240,240],f,g(D/1.6))}function Ht(b){let D=Ae-b.born,G=c(1,(St-D)/4)*c(1,D/.25);if(G<=0)return;let et=g(D/.5),nt=b.wp;b.state==="edited"&&(Gt.phase==="glitch"||Gt.t<.4)&&(nt=[nt[0]+(d()-.5)*.12,nt[1]+(d()-.5)*.06,nt[2]+(d()-.5)*.12]);let ot=xt(tt(b.spin+D*.5),ut(.32)),pt=xt(L(nt[0],nt[1],nt[2]),ot,z(Ee*et)),dt=pe(b,D),yt=1-p((b.z-8.5)/10,0,.55),Vt=G*yt,Jt=rt(nt[0],nt[1],nt[2],[0,0,0]),ue=Ee*et*v/Jt[2];t.globalCompositeOperation="lighter";let re=t.createRadialGradient(Jt[0],Jt[1],0,Jt[0],Jt[1],ue*1.5);re.addColorStop(0,y(dt,.26*Vt)),re.addColorStop(1,y(dt,0)),t.fillStyle=re,t.beginPath(),t.arc(Jt[0],Jt[1],ue*1.5,0,u*2),t.fill(),t.globalCompositeOperation="source-over";let Oe=[];for(let de=0;de<8;de++){let Se=Pt(pt,de&1?.5:-.5,de&2?.5:-.5,de&4?.5:-.5);rt(Se[0],Se[1],Se[2]),Oe.push([$[0],$[1]])}let fn=It.map(([de,Se])=>{let hs=kt(ot,Se[0],Se[1],Se[2]),On=Pt(pt,Se[0]*.5,Se[1]*.5,Se[2]*.5),zo=hs[0]*(On[0]-N.ex)+hs[1]*(On[1]-N.ey)+hs[2]*(On[2]-N.ez)<0;return{pts:de.flatMap(Vo=>Oe[Vo]),front:zo,up:hs[1]}});t.lineWidth=1;for(let de of fn)de.front||(Zt(de.pts),t.fillStyle=y(dt,.05*Vt),t.fill(),t.strokeStyle=y(dt,.32*Vt),t.stroke());let Oo=b.state==="edited"?b.edited:b.snap,Bo=xt(L(nt[0],nt[1],nt[2]),ot,z(We*et)),Fn=Oo.map(de=>{let Se=Pt(Bo,de[0],de[1],de[2]);return rt(Se[0],Se[1],Se[2]),[$[0],$[1]]}),pd=b.state==="edited"?[255,90,90]:[255,226,226];t.strokeStyle=y(pd,.92*Vt),t.lineWidth=h(1,ue*.09),t.beginPath(),t.moveTo(Fn[0][0],Fn[0][1]);for(let de=1;de<Fn.length;de++)t.lineTo(Fn[de][0],Fn[de][1]);t.stroke(),t.fillStyle=y(pd,Vt);let $g=h(1,ue*.07);for(let de=2;de<Fn.length;de++)t.beginPath(),t.arc(Fn[de][0],Fn[de][1],$g,0,u*2),t.fill();if(b.state!=="edited"){let de=Pt(Bo,b.crate[0],b.crate[1],b.crate[2]);rt(de[0],de[1],de[2]);let Se=h(1.5,ue*.14);t.fillStyle=y([235,230,220],.8*Vt),t.fillRect($[0]-Se/2,$[1]-Se/2,Se,Se)}for(let de of fn)de.front&&(Zt(de.pts),t.fillStyle=y(dt,(de.up>.3?.16:.08)*Vt),t.fill(),t.strokeStyle=y(dt,.95*Vt),t.lineWidth=1.3,t.stroke());if(b.state==="edited"&&Gt.phase!=="glitch"){let Se=(fn.find(On=>On.front)||fn[0]).pts;t.strokeStyle=y([255,200,200],Vt),t.lineWidth=1.4,t.beginPath();let hs=6;for(let On=0;On<=hs;On++){let zo=On/hs,Vo=x(x(Se[0],Se[2],.15),x(Se[4],Se[6],.85),zo)+(On%2?1:-1)*ue*.12,md=x(x(Se[1],Se[3],.15),x(Se[5],Se[7],.85),zo);On===0?t.moveTo(Vo,md):t.lineTo(Vo,md)}t.stroke()}b.sx=Jt[0],b.sy=Jt[1],b.rad=ue,b.al=Vt}function Un(b){let{a:D,b:G}=b,et=cc(G),nt=c(D.al??1,G.al??1),ot=rt(D.wp[0],D.wp[1],D.wp[2],[0,0,0]),pt=rt(G.wp[0],G.wp[1],G.wp[2],[0,0,0]),dt=f,yt=.5;if(et===1&&(dt=w,yt=.55+.45*(d()<.3?0:1)),et===2&&(dt=[255,235,235],yt=.9),t.strokeStyle=y(dt,yt*nt),t.lineWidth=et===1?1.6:1.2,et===1&&t.setLineDash([5,4]),t.beginPath(),t.moveTo(ot[0],ot[1]),t.lineTo(pt[0],pt[1]),t.stroke(),t.setLineDash([]),et!==1){let Vt=(Ae*.9+G.id*.37)%1,Jt=x(pt[0],ot[0],Vt),ue=x(pt[1],ot[1],Vt);t.fillStyle=y([255,210,210],.9*nt),t.beginPath(),t.arc(Jt,ue,1.8,0,u*2),t.fill()}}function me(b){let{c:D}=b,G=(Ae-D.born)/$t,et=rt(S.tip[0],S.tip[1],S.tip[2],[0,0,0]),nt=rt(D.wp[0],D.wp[1],D.wp[2],[0,0,0]),ot=t.createLinearGradient(et[0],et[1],nt[0],nt[1]);ot.addColorStop(0,y([255,120,125],.7*(1-G))),ot.addColorStop(1,y([255,230,230],.9*(1-G))),t.strokeStyle=ot,t.lineWidth=1.2,t.beginPath(),t.moveTo(et[0],et[1]),t.lineTo(nt[0],nt[1]),t.stroke()}function dn(b,D){t.globalCompositeOperation="lighter";let G=[0,0,0];for(let et of b){if(rt(et.x,et.y,et.z,G),G[2]<.5)continue;let nt=c(1,et.t/.2)*c(1,(et.life-et.t)/.4),ot=p(.05*v/G[2],.8,3.4);t.globalAlpha=p(nt*D,0,1),t.fillStyle=et.burst?"#fff1f1":et.heat>.6?"#ffb3b6":"#ff5a60",t.fillRect(G[0]-ot/2,G[1]-ot/2,ot,ot)}t.globalAlpha=1,t.globalCompositeOperation="source-over"}function Li(){t.globalCompositeOperation="lighter";let b=[0,0,0];for(let D of qr){let G=(D.y+Ae*.06*D.s)%6.5;if(rt(D.x+s(Ae*.2+D.ph)*.3,G,D.z,b),b[2]<.5)continue;let et=.35+.65*Math.abs(s(Ae*.8+D.ph)),nt=p(.035*v/b[2],.6,2.4);t.fillStyle=`rgba(255,120,125,${(.4*et).toFixed(3)})`,t.fillRect(b[0],b[1],nt,nt)}t.globalCompositeOperation="source-over"}function en(){for(let b of Dn){let D=b.t/.8;t.strokeStyle=y([255,99,105],.85*(1-D)),t.lineWidth=1.6,xe(ie(0,x(.25,2.9,g(D)),0,1+D*.5,48),!0)}t.globalCompositeOperation="lighter";for(let b of un){if(!b.p)continue;let D=b.t/.6,G=rt(b.p[0],b.p[1],b.p[2],[0,0,0]),et=(b.white?1.4:.8)*v/G[2]*(.4+D),nt=t.createRadialGradient(G[0],G[1],0,G[0],G[1],et);nt.addColorStop(0,b.white?y([255,255,255],.8*(1-D)):y([255,200,200],.7*(1-D))),nt.addColorStop(1,"rgba(255,99,105,0)"),t.fillStyle=nt,t.beginPath(),t.arc(G[0],G[1],et,0,u*2),t.fill()}if(t.globalCompositeOperation="source-over",Gt.phase==="restore"&&Gt.victim&&Gt.t<1){let b=Gt.victim,D=g(Gt.t/.8),G=[b.wp[0],b.wp[1]+(1-D)*2.2,b.wp[2]],et=xt(L(G[0],G[1],G[2]),tt(b.spin+(Ae-b.born)*.5),ut(.32),z(Ee*1.08)),nt=[];for(let dt=0;dt<8;dt++){let yt=Pt(et,dt&1?.5:-.5,dt&2?.5:-.5,dt&4?.5:-.5);rt(yt[0],yt[1],yt[2]),nt.push([$[0],$[1]])}t.strokeStyle=y([255,255,255],.95*(1-h(0,Gt.t-.8)/.2)),t.lineWidth=1.5,t.beginPath();for(let[dt,yt]of[[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[1,5],[2,6],[3,7]])t.moveTo(nt[dt][0],nt[dt][1]),t.lineTo(nt[yt][0],nt[yt][1]);t.stroke();let ot=rt(G[0],G[1]+2.4,G[2],[0,0,0]),pt=t.createLinearGradient(ot[0],ot[1],nt[0][0],nt[0][1]);pt.addColorStop(0,"rgba(255,255,255,0)"),pt.addColorStop(1,"rgba(255,255,255,0.35)"),t.strokeStyle=pt,t.beginPath(),t.moveTo(ot[0],ot[1]),t.lineTo(nt[2][0],nt[2][1]),t.stroke()}}function qn(b){"letterSpacing"in t&&(t.letterSpacing=b)}function ye(b,D,G,et,nt){if(!M||!b.sx||nt<=0)return;let ot=M?11:10;t.font=T(ot),qn("0.08em");let pt=h(t.measureText(D).width,G?t.measureText(G).width:0),dt=b.sx+b.rad+52+pt<A-12,yt=dt?1:-1,Vt=b.sx+yt*b.rad*.8,Jt=b.sy-b.rad*.5,ue=Vt+yt*26,re=Jt-22;t.globalAlpha=nt,t.strokeStyle=y(et,.8),t.lineWidth=1,t.beginPath(),t.moveTo(Vt,Jt),t.lineTo(ue,re),t.lineTo(ue+yt*10,re),t.stroke(),t.textAlign=dt?"left":"right",t.textBaseline="middle";let Oe=dt?ue+yt*8:ue+yt*8-pt-12;t.fillStyle="rgba(10,10,11,0.78)",t.fillRect(Oe,re-ot*.9,pt+12,(G?ot*2+4:ot)+ot*.8),t.fillStyle=y(et,1),t.fillText(D,ue+yt*14,re),G&&(t.fillStyle="rgba(166,164,158,0.9)",t.fillText(G,ue+yt*14,re+ot+4)),qn("0px"),t.globalAlpha=1}function vn(){let b=ve[ve.length-1];if(b&&Gt.victim!==b){let yt=Ae-b.born,Vt=p((yt-$t+.1)/.25,0,1)*p(($t+1.5-yt)/.3,0,1);ye(b,`#0${b.id}  ${b.kind}  SEALED`,M?`sha256 ${b.hash}`:null,[255,140,144],Vt)}let D=Gt.victim;D&&(Gt.phase!=="restore"?ye(D,`#0${D.id}  RECORD EDITED`,"hash mismatch: chain broken",w,Gt.phase==="glitch"?d()<.5?1:.3:1):ye(D,`#0${D.id}  RESTORED`,"from the sealed copy",[255,255,255],p((Gt.t-.7)/.2,0,1)));let G=rt(0,0,2.3,[0,0,0]),et=c(G[1]+30,R-(M?120:40)),nt=`CHAIN INTACT  \xB7  ${Yr.toLocaleString("en-US")} EVENTS SEALED`,ot=[255,140,144];D&&Gt.phase==="broken"&&(nt=`CHAIN BROKEN AT #0${D.id}`,ot=w),D&&Gt.phase==="restore"&&(nt="VERIFIED AGAINST THE SEALED COPY",ot=[255,255,255]),t.font=T(M?11:10),qn("0.14em"),t.textAlign="center",t.textBaseline="middle";let pt=t.measureText(nt).width,dt=.55+.45*s(Ae*4);t.fillStyle=y(ot,dt),t.beginPath(),t.arc(G[0]-pt/2-12,et,3,0,u*2),t.fill(),t.fillStyle=y(ot,.95),t.fillText(nt,G[0],et),qn("0px")}function ui(){t.clearRect(0,0,A,R);let b=.12+s(Ae*.06)*.22+it*.2;K(b,-O*.7),t.globalAlpha=1,we(),Li(),$e(),Nt=[];let D=Dn.length?1-Dn[Dn.length-1].t/.8:0;ne(k,S.g,D),_(xt(L(Z.pos[0],Z.pos[1],Z.pos[2]),tt(Z.yaw)),.3,.3,.3,Rt.crate);let G=[0,0,0],et=[0,0,0];for(let nt=0;nt<90;nt++){let ot=nt/90*St,pt=(nt+1)/90*St,dt=ae(ot),yt=ae(pt);rt(dt[0],dt[1],dt[2],G),rt(yt[0],yt[1],yt[2],et),Nt.push({k:4,z:(G[2]+et[2])/2+.3,s:[G[0],G[1],et[0],et[1]],a:c(1,ot/2,(St-pt)/4)})}for(let nt=0;nt<ve.length;nt++){let ot=ve[nt];if(ot.z=rt(ot.wp[0],ot.wp[1],ot.wp[2])[2],Nt.push({k:1,z:ot.z,c:ot}),nt>0){let pt=ve[nt-1];Ae-ot.born>=$t*.8&&Nt.push({k:2,z:(pt.z+ot.z)/2+.01,a:pt,b:ot})}Ae-ot.born<$t&&Nt.push({k:3,z:ot.z-.01,c:ot})}Kt(Nt),en(),dn(gt,.75),dn(Ln,1),vn()}let nn=parseFloat(new URLSearchParams(location.search).get("witness_t")),$n=24+(nn>0?nn:0);Gt.next=28;for(let b=0;b<$n*30;b++)b%6===0&&K(.12,0),Ot(1/30);Y=!0;let Nn=!0;if(new IntersectionObserver(([b])=>{Nn=b.isIntersecting},{threshold:.02}).observe(n),e){ui();return}let $r=performance.now(),fd=b=>{let D=Math.min(.05,Math.max(0,(b-$r)/1e3));$r=b,Nn&&!document.hidden&&(it+=(Q-it)*.05,O+=(U-O)*.05,Ot(D),ui()),requestAnimationFrame(fd)};requestAnimationFrame(fd)}var Ix=0,Tp=1,Dx=2;var Lm=1,Lx=2,Si=3,ts=0,mn=1,bi=2,Qi=0,vr=1,wp=2,Ep=3,Ap=4,Ux=5,Ms=100,Nx=101,Fx=102,Ox=103,Bx=104,zx=200,Vx=201,kx=202,Hx=203,vh=204,Sh=205,Gx=206,Wx=207,Xx=208,Yx=209,qx=210,$x=211,Zx=212,Kx=213,Jx=214,Mh=0,bh=1,Th=2,wr=3,wh=4,Eh=5,Ah=6,Ch=7,Um=0,Qx=1,jx=2,ji=0,t_=1,e_=2,n_=3,i_=4,s_=5,r_=6,o_=7;var Nm=300,Er=301,Ar=302,Rh=303,Ph=304,Hl=306,Ih=1e3,Ts=1001,Dh=1002,Gn=1003,a_=1004;var Oa=1005;var ni=1006,Hc=1007;var ws=1008;var Ai=1009,Fm=1010,Om=1011,yo=1012,Uu=1013,Es=1014,Ti=1015,To=1016,Nu=1017,Fu=1018,Cr=1020,Bm=35902,zm=1021,Vm=1022,Hn=1023,km=1024,Hm=1025,Sr=1026,Rr=1027,Gm=1028,Ou=1029,Wm=1030,Bu=1031;var zu=1033,hl=33776,ul=33777,dl=33778,fl=33779,Lh=35840,Uh=35841,Nh=35842,Fh=35843,Oh=36196,Bh=37492,zh=37496,Vh=37808,kh=37809,Hh=37810,Gh=37811,Wh=37812,Xh=37813,Yh=37814,qh=37815,$h=37816,Zh=37817,Kh=37818,Jh=37819,Qh=37820,jh=37821,pl=36492,tu=36494,eu=36495,Xm=36283,nu=36284,iu=36285,su=36286;var ml=2300,ru=2301,Gc=2302,Cp=2400,Rp=2401,Pp=2402;var l_=3200,c_=3201;var Ym=0,h_=1,Ki="",wn="srgb",Nr="srgb-linear",Gl="linear",Me="srgb";var sr=7680;var Ip=519,u_=512,d_=513,f_=514,qm=515,p_=516,m_=517,g_=518,x_=519,Dp=35044;var Lp="300 es",wi=2e3,gl=2001,es=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Up=1234567,Mr=Math.PI/180,vo=180/Math.PI;function Fr(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Je[n&255]+Je[n>>8&255]+Je[n>>16&255]+Je[n>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[i&255]+Je[i>>8&255]+Je[i>>16&255]+Je[i>>24&255]).toLowerCase()}function an(n,t,e){return Math.max(t,Math.min(e,n))}function Vu(n,t){return(n%t+t)%t}function __(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function y_(n,t,e){return n!==t?(e-n)/(t-n):0}function xo(n,t,e){return(1-e)*n+e*t}function v_(n,t,e,i){return xo(n,t,1-Math.exp(-e*i))}function S_(n,t=1){return t-Math.abs(Vu(n,t*2)-t)}function M_(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function b_(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function T_(n,t){return n+Math.floor(Math.random()*(t-n+1))}function w_(n,t){return n+Math.random()*(t-n)}function E_(n){return n*(.5-Math.random())}function A_(n){n!==void 0&&(Up=n);let t=Up+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function C_(n){return n*Mr}function R_(n){return n*vo}function P_(n){return(n&n-1)===0&&n!==0}function I_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function D_(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function L_(n,t,e,i,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),h=o((t+i)/2),u=r((t-i)/2),d=o((t-i)/2),p=r((i-t)/2),g=o((i-t)/2);switch(s){case"XYX":n.set(a*h,l*u,l*d,a*c);break;case"YZY":n.set(l*d,a*h,l*u,a*c);break;case"ZXZ":n.set(l*u,l*d,a*h,a*c);break;case"XZX":n.set(a*h,l*g,l*p,a*c);break;case"YXY":n.set(l*p,a*h,l*g,a*c);break;case"ZYZ":n.set(l*g,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function _r(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function rn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var $m={DEG2RAD:Mr,RAD2DEG:vo,generateUUID:Fr,clamp:an,euclideanModulo:Vu,mapLinear:__,inverseLerp:y_,lerp:xo,damp:v_,pingpong:S_,smoothstep:M_,smootherstep:b_,randInt:T_,randFloat:w_,randFloatSpread:E_,seededRandom:A_,degToRad:C_,radToDeg:R_,isPowerOfTwo:P_,ceilPowerOfTwo:I_,floorPowerOfTwo:D_,setQuaternionFromProperEuler:L_,normalize:rn,denormalize:_r},ge=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(an(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},jt=class n{constructor(t,e,i,s,r,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],p=i[5],g=i[8],x=s[0],m=s[3],f=s[6],w=s[1],T=s[4],y=s[7],P=s[2],C=s[5],A=s[8];return r[0]=o*x+a*w+l*P,r[3]=o*m+a*T+l*C,r[6]=o*f+a*y+l*A,r[1]=c*x+h*w+u*P,r[4]=c*m+h*T+u*C,r[7]=c*f+h*y+u*A,r[2]=d*x+p*w+g*P,r[5]=d*m+p*T+g*C,r[8]=d*f+p*y+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,p=c*r-o*l,g=e*u+i*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(s*c-h*i)*x,t[2]=(a*i-s*o)*x,t[3]=d*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=p*x,t[7]=(i*l-c*e)*x,t[8]=(o*e-i*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Wc.makeScale(t,e)),this}rotate(t){return this.premultiply(Wc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Wc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Wc=new jt;function Zm(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function xl(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function U_(){let n=xl("canvas");return n.style.display="block",n}var Np={};function mo(n){n in Np||(Np[n]=!0,console.warn(n))}function N_(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function F_(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function O_(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var fe={enabled:!0,workingColorSpace:Nr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Me&&(n.r=Ei(n.r),n.g=Ei(n.g),n.b=Ei(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Me&&(n.r=br(n.r),n.g=br(n.g),n.b=br(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ki?Gl:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Ei(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function br(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Fp=[.64,.33,.3,.6,.15,.06],Op=[.2126,.7152,.0722],Bp=[.3127,.329],zp=new jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vp=new jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);fe.define({[Nr]:{primaries:Fp,whitePoint:Bp,transfer:Gl,toXYZ:zp,fromXYZ:Vp,luminanceCoefficients:Op,workingColorSpaceConfig:{unpackColorSpace:wn},outputColorSpaceConfig:{drawingBufferColorSpace:wn}},[wn]:{primaries:Fp,whitePoint:Bp,transfer:Me,toXYZ:zp,fromXYZ:Vp,luminanceCoefficients:Op,outputColorSpaceConfig:{drawingBufferColorSpace:wn}}});var rr,ou=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{rr===void 0&&(rr=xl("canvas")),rr.width=t.width,rr.height=t.height;let i=rr.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=rr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=xl("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ei(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ei(e[i]/255)*255):e[i]=Ei(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},B_=0,_l=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:B_++}),this.uuid=Fr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Xc(s[o].image)):r.push(Xc(s[o]))}else r=Xc(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Xc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ou.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var z_=0,An=class n extends es{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Ts,s=Ts,r=ni,o=ws,a=Hn,l=Ai,c=n.DEFAULT_ANISOTROPY,h=Ki){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:z_++}),this.uuid=Fr(),this.name="",this.source=new _l(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Nm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ih:t.x=t.x-Math.floor(t.x);break;case Ts:t.x=t.x<0?0:1;break;case Dh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ih:t.y=t.y-Math.floor(t.y);break;case Ts:t.y=t.y<0?0:1;break;case Dh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};An.DEFAULT_IMAGE=null;An.DEFAULT_MAPPING=Nm;An.DEFAULT_ANISOTROPY=1;var be=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(c+1)/2,y=(p+1)/2,P=(f+1)/2,C=(h+d)/4,A=(u+x)/4,R=(g+m)/4;return T>y&&T>P?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=C/i,r=A/i):y>P?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=C/s,r=R/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=A/r,s=R/r),this.set(i,s,r,e),this}let w=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(u-x)/w,this.z=(d-h)/w,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},au=class extends es{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ni,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new An(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new _l(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ci=class extends au{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},yl=class extends An{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Gn,this.minFilter=Gn,this.wrapR=Ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var lu=class extends An{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Gn,this.minFilter=Gn,this.wrapR=Ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ns=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],d=r[o+0],p=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(u!==x||l!==d||c!==p||h!==g){let m=1-a,f=l*d+c*p+h*g+u*x,w=f>=0?1:-1,T=1-f*f;if(T>Number.EPSILON){let P=Math.sqrt(T),C=Math.atan2(P,f*w);m=Math.sin(m*C)/P,a=Math.sin(a*C)/P}let y=a*w;if(l=l*m+d*y,c=c*m+p*y,h=h*m+g*y,u=u*m+x*y,m===1-a){let P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*p-c*d,t[e+1]=l*g+h*d+c*u-a*p,t[e+2]=c*g+h*p+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),u=a(r/2),d=l(i/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>u){let p=2*Math.sqrt(1+i-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>u){let p=2*Math.sqrt(1+a-i-u);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(an(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},V=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(kp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(kp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Yc.copy(this).projectOnVector(t),this.sub(Yc)}reflect(t){return this.sub(Yc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(an(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Yc=new V,kp=new ns,As=class{constructor(t=new V(1/0,1/0,1/0),e=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(zn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(zn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=zn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,zn):zn.fromBufferAttribute(r,o),zn.applyMatrix4(t.matrixWorld),this.expandByPoint(zn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ba.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ba.copy(i.boundingBox)),Ba.applyMatrix4(t.matrixWorld),this.union(Ba)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,zn),zn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(lo),za.subVectors(this.max,lo),or.subVectors(t.a,lo),ar.subVectors(t.b,lo),lr.subVectors(t.c,lo),Wi.subVectors(ar,or),Xi.subVectors(lr,ar),ms.subVectors(or,lr);let e=[0,-Wi.z,Wi.y,0,-Xi.z,Xi.y,0,-ms.z,ms.y,Wi.z,0,-Wi.x,Xi.z,0,-Xi.x,ms.z,0,-ms.x,-Wi.y,Wi.x,0,-Xi.y,Xi.x,0,-ms.y,ms.x,0];return!qc(e,or,ar,lr,za)||(e=[1,0,0,0,1,0,0,0,1],!qc(e,or,ar,lr,za))?!1:(Va.crossVectors(Wi,Xi),e=[Va.x,Va.y,Va.z],qc(e,or,ar,lr,za))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,zn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(zn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(gi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},gi=[new V,new V,new V,new V,new V,new V,new V,new V],zn=new V,Ba=new As,or=new V,ar=new V,lr=new V,Wi=new V,Xi=new V,ms=new V,lo=new V,za=new V,Va=new V,gs=new V;function qc(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){gs.fromArray(n,r);let a=s.x*Math.abs(gs.x)+s.y*Math.abs(gs.y)+s.z*Math.abs(gs.z),l=t.dot(gs),c=e.dot(gs),h=i.dot(gs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var V_=new As,co=new V,$c=new V,Pr=class{constructor(t=new V,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):V_.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;co.subVectors(t,this.center);let e=co.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(co,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):($c.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(co.copy(t.center).add($c)),this.expandByPoint(co.copy(t.center).sub($c))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},xi=new V,Zc=new V,ka=new V,Yi=new V,Kc=new V,Ha=new V,Jc=new V,vl=class{constructor(t=new V,e=new V(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=xi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(xi.copy(this.origin).addScaledVector(this.direction,e),xi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Zc.copy(t).add(e).multiplyScalar(.5),ka.copy(e).sub(t).normalize(),Yi.copy(this.origin).sub(Zc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(ka),a=Yi.dot(this.direction),l=-Yi.dot(ka),c=Yi.lengthSq(),h=Math.abs(1-o*o),u,d,p,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,p=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Zc).addScaledVector(ka,d),p}intersectSphere(t,e){xi.subVectors(t.center,this.origin);let i=xi.dot(this.direction),s=xi.dot(xi)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,xi)!==null}intersectTriangle(t,e,i,s,r){Kc.subVectors(e,t),Ha.subVectors(i,t),Jc.crossVectors(Kc,Ha);let o=this.direction.dot(Jc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Yi.subVectors(this.origin,t);let l=a*this.direction.dot(Ha.crossVectors(Yi,Ha));if(l<0)return null;let c=a*this.direction.dot(Kc.cross(Yi));if(c<0||l+c>o)return null;let h=-a*Yi.dot(Jc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},De=class n{constructor(t,e,i,s,r,o,a,l,c,h,u,d,p,g,x,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,h,u,d,p,g,x,m)}set(t,e,i,s,r,o,a,l,c,h,u,d,p,g,x,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/cr.setFromMatrixColumn(t,0).length(),r=1/cr.setFromMatrixColumn(t,1).length(),o=1/cr.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,p=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,p=l*u,g=c*h,x=c*u;e[0]=d+x*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,p=l*u,g=c*h,x=c*u;e[0]=d-x*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,p=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,p=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-d*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+g,e[10]=d-x*u}else if(t.order==="XZY"){let d=o*l,p=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(k_,t,H_)}lookAt(t,e,i){let s=this.elements;return xn.subVectors(t,e),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),qi.crossVectors(i,xn),qi.lengthSq()===0&&(Math.abs(i.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),qi.crossVectors(i,xn)),qi.normalize(),Ga.crossVectors(xn,qi),s[0]=qi.x,s[4]=Ga.x,s[8]=xn.x,s[1]=qi.y,s[5]=Ga.y,s[9]=xn.y,s[2]=qi.z,s[6]=Ga.z,s[10]=xn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],p=i[13],g=i[2],x=i[6],m=i[10],f=i[14],w=i[3],T=i[7],y=i[11],P=i[15],C=s[0],A=s[4],R=s[8],M=s[12],v=s[1],I=s[5],W=s[9],Y=s[13],q=s[2],it=s[6],O=s[10],Q=s[14],U=s[3],N=s[7],K=s[11],$=s[15];return r[0]=o*C+a*v+l*q+c*U,r[4]=o*A+a*I+l*it+c*N,r[8]=o*R+a*W+l*O+c*K,r[12]=o*M+a*Y+l*Q+c*$,r[1]=h*C+u*v+d*q+p*U,r[5]=h*A+u*I+d*it+p*N,r[9]=h*R+u*W+d*O+p*K,r[13]=h*M+u*Y+d*Q+p*$,r[2]=g*C+x*v+m*q+f*U,r[6]=g*A+x*I+m*it+f*N,r[10]=g*R+x*W+m*O+f*K,r[14]=g*M+x*Y+m*Q+f*$,r[3]=w*C+T*v+y*q+P*U,r[7]=w*A+T*I+y*it+P*N,r[11]=w*R+T*W+y*O+P*K,r[15]=w*M+T*Y+y*Q+P*$,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],x=t[7],m=t[11],f=t[15];return g*(+r*l*u-s*c*u-r*a*d+i*c*d+s*a*p-i*l*p)+x*(+e*l*p-e*c*d+r*o*d-s*o*p+s*c*h-r*l*h)+m*(+e*c*u-e*a*p-r*o*u+i*o*p+r*a*h-i*c*h)+f*(-s*a*h-e*l*u+e*a*d+s*o*u-i*o*d+i*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],x=t[13],m=t[14],f=t[15],w=u*m*c-x*d*c+x*l*p-a*m*p-u*l*f+a*d*f,T=g*d*c-h*m*c-g*l*p+o*m*p+h*l*f-o*d*f,y=h*x*c-g*u*c+g*a*p-o*x*p-h*a*f+o*u*f,P=g*u*l-h*x*l-g*a*d+o*x*d+h*a*m-o*u*m,C=e*w+i*T+s*y+r*P;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/C;return t[0]=w*A,t[1]=(x*d*r-u*m*r-x*s*p+i*m*p+u*s*f-i*d*f)*A,t[2]=(a*m*r-x*l*r+x*s*c-i*m*c-a*s*f+i*l*f)*A,t[3]=(u*l*r-a*d*r-u*s*c+i*d*c+a*s*p-i*l*p)*A,t[4]=T*A,t[5]=(h*m*r-g*d*r+g*s*p-e*m*p-h*s*f+e*d*f)*A,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*f-e*l*f)*A,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*p+e*l*p)*A,t[8]=y*A,t[9]=(g*u*r-h*x*r-g*i*p+e*x*p+h*i*f-e*u*f)*A,t[10]=(o*x*r-g*a*r+g*i*c-e*x*c-o*i*f+e*a*f)*A,t[11]=(h*a*r-o*u*r-h*i*c+e*u*c+o*i*p-e*a*p)*A,t[12]=P*A,t[13]=(h*x*s-g*u*s+g*i*d-e*x*d-h*i*m+e*u*m)*A,t[14]=(g*a*s-o*x*s-g*i*l+e*x*l+o*i*m-e*a*m)*A,t[15]=(o*u*s-h*a*s+h*i*l-e*u*l-o*i*d+e*a*d)*A,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,p=r*h,g=r*u,x=o*h,m=o*u,f=a*u,w=l*c,T=l*h,y=l*u,P=i.x,C=i.y,A=i.z;return s[0]=(1-(x+f))*P,s[1]=(p+y)*P,s[2]=(g-T)*P,s[3]=0,s[4]=(p-y)*C,s[5]=(1-(d+f))*C,s[6]=(m+w)*C,s[7]=0,s[8]=(g+T)*A,s[9]=(m-w)*A,s[10]=(1-(d+x))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=cr.set(s[0],s[1],s[2]).length(),o=cr.set(s[4],s[5],s[6]).length(),a=cr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Vn.copy(this);let c=1/r,h=1/o,u=1/a;return Vn.elements[0]*=c,Vn.elements[1]*=c,Vn.elements[2]*=c,Vn.elements[4]*=h,Vn.elements[5]*=h,Vn.elements[6]*=h,Vn.elements[8]*=u,Vn.elements[9]*=u,Vn.elements[10]*=u,e.setFromRotationMatrix(Vn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=wi){let l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),d=(i+s)/(i-s),p,g;if(a===wi)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===gl)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=wi){let l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(o-r),d=(e+t)*c,p=(i+s)*h,g,x;if(a===wi)g=(o+r)*u,x=-2*u;else if(a===gl)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},cr=new V,Vn=new De,k_=new V(0,0,0),H_=new V(1,1,1),qi=new V,Ga=new V,xn=new V,Hp=new De,Gp=new ns,si=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(an(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-an(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(an(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-an(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(an(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-an(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Hp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Hp,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Gp.setFromEuler(this),this.setFromQuaternion(Gp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};si.DEFAULT_ORDER="XYZ";var Sl=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},G_=0,Wp=new V,hr=new ns,_i=new De,Wa=new V,ho=new V,W_=new V,X_=new ns,Xp=new V(1,0,0),Yp=new V(0,1,0),qp=new V(0,0,1),$p={type:"added"},Y_={type:"removed"},ur={type:"childadded",child:null},Qc={type:"childremoved",child:null},ln=class n extends es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:G_++}),this.uuid=Fr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new V,e=new si,i=new ns,s=new V(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new De},normalMatrix:{value:new jt}}),this.matrix=new De,this.matrixWorld=new De,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return hr.setFromAxisAngle(t,e),this.quaternion.multiply(hr),this}rotateOnWorldAxis(t,e){return hr.setFromAxisAngle(t,e),this.quaternion.premultiply(hr),this}rotateX(t){return this.rotateOnAxis(Xp,t)}rotateY(t){return this.rotateOnAxis(Yp,t)}rotateZ(t){return this.rotateOnAxis(qp,t)}translateOnAxis(t,e){return Wp.copy(t).applyQuaternion(this.quaternion),this.position.add(Wp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Xp,t)}translateY(t){return this.translateOnAxis(Yp,t)}translateZ(t){return this.translateOnAxis(qp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Wa.copy(t):Wa.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),ho.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(ho,Wa,this.up):_i.lookAt(Wa,ho,this.up),this.quaternion.setFromRotationMatrix(_i),s&&(_i.extractRotation(s.matrixWorld),hr.setFromRotationMatrix(_i),this.quaternion.premultiply(hr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent($p),ur.child=t,this.dispatchEvent(ur),ur.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Y_),Qc.child=t,this.dispatchEvent(Qc),Qc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_i.multiply(t.parent.matrixWorld)),t.applyMatrix4(_i),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent($p),ur.child=t,this.dispatchEvent(ur),ur.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ho,t,W_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ho,X_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};ln.DEFAULT_UP=new V(0,1,0);ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var kn=new V,yi=new V,jc=new V,vi=new V,dr=new V,fr=new V,Zp=new V,th=new V,eh=new V,nh=new V,ih=new be,sh=new be,rh=new be,Ji=class n{constructor(t=new V,e=new V,i=new V){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),kn.subVectors(t,e),s.cross(kn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){kn.subVectors(s,e),yi.subVectors(i,e),jc.subVectors(t,e);let o=kn.dot(kn),a=kn.dot(yi),l=kn.dot(jc),c=yi.dot(yi),h=yi.dot(jc),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,vi)===null?!1:vi.x>=0&&vi.y>=0&&vi.x+vi.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,vi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vi.x),l.addScaledVector(o,vi.y),l.addScaledVector(a,vi.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return ih.setScalar(0),sh.setScalar(0),rh.setScalar(0),ih.fromBufferAttribute(t,e),sh.fromBufferAttribute(t,i),rh.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ih,r.x),o.addScaledVector(sh,r.y),o.addScaledVector(rh,r.z),o}static isFrontFacing(t,e,i,s){return kn.subVectors(i,e),yi.subVectors(t,e),kn.cross(yi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return kn.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),kn.cross(yi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;dr.subVectors(s,i),fr.subVectors(r,i),th.subVectors(t,i);let l=dr.dot(th),c=fr.dot(th);if(l<=0&&c<=0)return e.copy(i);eh.subVectors(t,s);let h=dr.dot(eh),u=fr.dot(eh);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(dr,o);nh.subVectors(t,r);let p=dr.dot(nh),g=fr.dot(nh);if(g>=0&&p<=g)return e.copy(r);let x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(fr,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Zp.subVectors(r,s),a=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(Zp,a);let f=1/(m+x+d);return o=x*f,a=d*f,e.copy(i).addScaledVector(dr,o).addScaledVector(fr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Km={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},Xa={h:0,s:0,l:0};function oh(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var he=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=wn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,fe.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=fe.workingColorSpace){return this.r=t,this.g=e,this.b=i,fe.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=fe.workingColorSpace){if(t=Vu(t,1),e=an(e,0,1),i=an(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=oh(o,r,t+1/3),this.g=oh(o,r,t),this.b=oh(o,r,t-1/3)}return fe.toWorkingColorSpace(this,s),this}setStyle(t,e=wn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=wn){let i=Km[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ei(t.r),this.g=Ei(t.g),this.b=Ei(t.b),this}copyLinearToSRGB(t){return this.r=br(t.r),this.g=br(t.g),this.b=br(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=wn){return fe.fromWorkingColorSpace(Qe.copy(this),t),Math.round(an(Qe.r*255,0,255))*65536+Math.round(an(Qe.g*255,0,255))*256+Math.round(an(Qe.b*255,0,255))}getHexString(t=wn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=fe.workingColorSpace){fe.fromWorkingColorSpace(Qe.copy(this),e);let i=Qe.r,s=Qe.g,r=Qe.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=fe.workingColorSpace){return fe.fromWorkingColorSpace(Qe.copy(this),e),t.r=Qe.r,t.g=Qe.g,t.b=Qe.b,t}getStyle(t=wn){fe.fromWorkingColorSpace(Qe.copy(this),t);let e=Qe.r,i=Qe.g,s=Qe.b;return t!==wn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL($i),this.setHSL($i.h+t,$i.s+e,$i.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL($i),t.getHSL(Xa);let i=xo($i.h,Xa.h,e),s=xo($i.s,Xa.s,e),r=xo($i.l,Xa.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Qe=new he;he.NAMES=Km;var q_=0,is=class extends es{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:q_++}),this.uuid=Fr(),this.name="",this.blending=vr,this.side=ts,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vh,this.blendDst=Sh,this.blendEquation=Ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new he(0,0,0),this.blendAlpha=0,this.depthFunc=wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ip,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sr,this.stencilZFail=sr,this.stencilZPass=sr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==vr&&(i.blending=this.blending),this.side!==ts&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==vh&&(i.blendSrc=this.blendSrc),this.blendDst!==Sh&&(i.blendDst=this.blendDst),this.blendEquation!==Ms&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==wr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ip&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==sr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==sr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==sr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Ml=class extends is{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=Um,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ve=new V,Ya=new ge,En=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Dp,this.updateRanges=[],this.gpuType=Ti,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ya.fromBufferAttribute(this,e),Ya.applyMatrix3(t),this.setXY(e,Ya.x,Ya.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=_r(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=rn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=_r(e,this.array)),e}setX(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=_r(e,this.array)),e}setY(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=_r(e,this.array)),e}setZ(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=_r(e,this.array)),e}setW(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array),s=rn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array),s=rn(s,this.array),r=rn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Dp&&(t.usage=this.usage),t}};var bl=class extends En{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Tl=class extends En{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Ye=class extends En{constructor(t,e,i){super(new Float32Array(t),e,i)}},$_=0,Tn=new De,ah=new ln,pr=new V,_n=new As,uo=new As,Xe=new V,yn=class n extends es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$_++}),this.uuid=Fr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Zm(t)?Tl:bl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new jt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Tn.makeRotationFromQuaternion(t),this.applyMatrix4(Tn),this}rotateX(t){return Tn.makeRotationX(t),this.applyMatrix4(Tn),this}rotateY(t){return Tn.makeRotationY(t),this.applyMatrix4(Tn),this}rotateZ(t){return Tn.makeRotationZ(t),this.applyMatrix4(Tn),this}translate(t,e,i){return Tn.makeTranslation(t,e,i),this.applyMatrix4(Tn),this}scale(t,e,i){return Tn.makeScale(t,e,i),this.applyMatrix4(Tn),this}lookAt(t){return ah.lookAt(t),ah.updateMatrix(),this.applyMatrix4(ah.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pr).negate(),this.translate(pr.x,pr.y,pr.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ye(i,3))}else{for(let i=0,s=e.count;i<s;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new As);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(Xe.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Xe),Xe.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Xe)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pr);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){let i=this.boundingSphere.center;if(_n.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];uo.setFromBufferAttribute(a),this.morphTargetsRelative?(Xe.addVectors(_n.min,uo.min),_n.expandByPoint(Xe),Xe.addVectors(_n.max,uo.max),_n.expandByPoint(Xe)):(_n.expandByPoint(uo.min),_n.expandByPoint(uo.max))}_n.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Xe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Xe));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Xe.fromBufferAttribute(a,c),l&&(pr.fromBufferAttribute(t,c),Xe.add(pr)),s=Math.max(s,i.distanceToSquared(Xe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new En(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<i.count;R++)a[R]=new V,l[R]=new V;let c=new V,h=new V,u=new V,d=new ge,p=new ge,g=new ge,x=new V,m=new V;function f(R,M,v){c.fromBufferAttribute(i,R),h.fromBufferAttribute(i,M),u.fromBufferAttribute(i,v),d.fromBufferAttribute(r,R),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,v),h.sub(c),u.sub(c),p.sub(d),g.sub(d);let I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(I),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(I),a[R].add(x),a[M].add(x),a[v].add(x),l[R].add(m),l[M].add(m),l[v].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let R=0,M=w.length;R<M;++R){let v=w[R],I=v.start,W=v.count;for(let Y=I,q=I+W;Y<q;Y+=3)f(t.getX(Y+0),t.getX(Y+1),t.getX(Y+2))}let T=new V,y=new V,P=new V,C=new V;function A(R){P.fromBufferAttribute(s,R),C.copy(P);let M=a[R];T.copy(M),T.sub(P.multiplyScalar(P.dot(M))).normalize(),y.crossVectors(C,M);let I=y.dot(l[R])<0?-1:1;o.setXYZW(R,T.x,T.y,T.z,I)}for(let R=0,M=w.length;R<M;++R){let v=w[R],I=v.start,W=v.count;for(let Y=I,q=I+W;Y<q;Y+=3)A(t.getX(Y+0)),A(t.getX(Y+1)),A(t.getX(Y+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new En(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);let s=new V,r=new V,o=new V,a=new V,l=new V,c=new V,h=new V,u=new V;if(t)for(let d=0,p=t.count;d<p;d+=3){let g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Xe.fromBufferAttribute(t,e),Xe.normalize(),t.setXYZ(e,Xe.x,Xe.y,Xe.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),p=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new En(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,i);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],p=t(d,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Kp=new De,xs=new vl,qa=new Pr,Jp=new V,$a=new V,Za=new V,Ka=new V,lh=new V,Ja=new V,Qp=new V,Qa=new V,Ie=class extends ln{constructor(t=new yn,e=new Ml){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Ja.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(lh.fromBufferAttribute(u,t),o?Ja.addScaledVector(lh,h):Ja.addScaledVector(lh.sub(e),h))}e.add(Ja)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),qa.copy(i.boundingSphere),qa.applyMatrix4(r),xs.copy(t.ray).recast(t.near),!(qa.containsPoint(xs.origin)===!1&&(xs.intersectSphere(qa,Jp)===null||xs.origin.distanceToSquared(Jp)>(t.far-t.near)**2))&&(Kp.copy(r).invert(),xs.copy(t.ray).applyMatrix4(Kp),!(i.boundingBox!==null&&xs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,xs)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],f=o[m.materialIndex],w=Math.max(m.start,p.start),T=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=w,P=T;y<P;y+=3){let C=a.getX(y),A=a.getX(y+1),R=a.getX(y+2);s=ja(this,f,t,i,c,h,u,C,A,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let w=a.getX(m),T=a.getX(m+1),y=a.getX(m+2);s=ja(this,o,t,i,c,h,u,w,T,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],f=o[m.materialIndex],w=Math.max(m.start,p.start),T=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=w,P=T;y<P;y+=3){let C=y,A=y+1,R=y+2;s=ja(this,f,t,i,c,h,u,C,A,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let w=m,T=m+1,y=m+2;s=ja(this,o,t,i,c,h,u,w,T,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Z_(n,t,e,i,s,r,o,a){let l;if(t.side===mn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===ts,a),l===null)return null;Qa.copy(a),Qa.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Qa);return c<e.near||c>e.far?null:{distance:c,point:Qa.clone(),object:n}}function ja(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,$a),n.getVertexPosition(l,Za),n.getVertexPosition(c,Ka);let h=Z_(n,t,e,i,$a,Za,Ka,Qp);if(h){let u=new V;Ji.getBarycoord(Qp,$a,Za,Ka,u),s&&(h.uv=Ji.getInterpolatedAttribute(s,a,l,c,u,new ge)),r&&(h.uv1=Ji.getInterpolatedAttribute(r,a,l,c,u,new ge)),o&&(h.normal=Ji.getInterpolatedAttribute(o,a,l,c,u,new V),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new V,materialIndex:0};Ji.getNormal($a,Za,Ka,d.normal),h.face=d,h.barycoord=u}return h}var ri=class n extends yn{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ye(c,3)),this.setAttribute("normal",new Ye(h,3)),this.setAttribute("uv",new Ye(u,2));function g(x,m,f,w,T,y,P,C,A,R,M){let v=y/A,I=P/R,W=y/2,Y=P/2,q=C/2,it=A+1,O=R+1,Q=0,U=0,N=new V;for(let K=0;K<O;K++){let $=K*I-Y;for(let rt=0;rt<it;rt++){let _t=rt*v-W;N[x]=_t*w,N[m]=$*T,N[f]=q,c.push(N.x,N.y,N.z),N[x]=0,N[m]=0,N[f]=C>0?1:-1,h.push(N.x,N.y,N.z),u.push(rt/A),u.push(1-K/R),Q+=1}}for(let K=0;K<R;K++)for(let $=0;$<A;$++){let rt=d+$+it*K,_t=d+$+it*(K+1),L=d+($+1)+it*(K+1),z=d+($+1)+it*K;l.push(rt,_t,z),l.push(_t,L,z),U+=6}a.addGroup(p,U,M),p+=U,d+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ir(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function on(n){let t={};for(let e=0;e<n.length;e++){let i=Ir(n[e]);for(let s in i)t[s]=i[s]}return t}function K_(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Jm(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:fe.workingColorSpace}var J_={clone:Ir,merge:on},Q_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,j_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,oi=class extends is{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Q_,this.fragmentShader=j_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ir(t.uniforms),this.uniformsGroups=K_(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},wl=class extends ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new De,this.projectionMatrix=new De,this.projectionMatrixInverse=new De,this.coordinateSystem=wi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Zi=new V,jp=new ge,tm=new ge,je=class extends wl{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=vo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Mr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return vo*2*Math.atan(Math.tan(Mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Zi.x,Zi.y).multiplyScalar(-t/Zi.z),Zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Zi.x,Zi.y).multiplyScalar(-t/Zi.z)}getViewSize(t,e){return this.getViewBounds(t,jp,tm),e.subVectors(tm,jp)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Mr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},mr=-90,gr=1,cu=class extends ln{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new je(mr,gr,t,e);s.layers=this.layers,this.add(s);let r=new je(mr,gr,t,e);r.layers=this.layers,this.add(r);let o=new je(mr,gr,t,e);o.layers=this.layers,this.add(o);let a=new je(mr,gr,t,e);a.layers=this.layers,this.add(a);let l=new je(mr,gr,t,e);l.layers=this.layers,this.add(l);let c=new je(mr,gr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===wi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===gl)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},El=class extends An{constructor(t,e,i,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Er,super(t,e,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},hu=class extends Ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new El(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ni}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ri(5,5,5),r=new oi({name:"CubemapFromEquirect",uniforms:Ir(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:mn,blending:Qi});r.uniforms.tEquirect.value=e;let o=new Ie(s,r),a=e.minFilter;return e.minFilter===ws&&(e.minFilter=ni),new cu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},ch=new V,ty=new V,ey=new jt,Mi=class{constructor(t=new V(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=ch.subVectors(i,e).cross(ty.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(ch),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||ey.getNormalMatrix(t),s=this.coplanarPoint(ch).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},_s=new Pr,tl=new V,So=class{constructor(t=new Mi,e=new Mi,i=new Mi,s=new Mi,r=new Mi,o=new Mi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=wi){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],x=s[10],m=s[11],f=s[12],w=s[13],T=s[14],y=s[15];if(i[0].setComponents(l-r,d-c,m-p,y-f).normalize(),i[1].setComponents(l+r,d+c,m+p,y+f).normalize(),i[2].setComponents(l+o,d+h,m+g,y+w).normalize(),i[3].setComponents(l-o,d-h,m-g,y-w).normalize(),i[4].setComponents(l-a,d-u,m-x,y-T).normalize(),e===wi)i[5].setComponents(l+a,d+u,m+x,y+T).normalize();else if(e===gl)i[5].setComponents(a,u,x,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),_s.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),_s.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(_s)}intersectsSprite(t){return _s.center.set(0,0,0),_s.radius=.7071067811865476,_s.applyMatrix4(t.matrixWorld),this.intersectsSphere(_s)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(tl.x=s.normal.x>0?t.max.x:t.min.x,tl.y=s.normal.y>0?t.max.y:t.min.y,tl.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(tl)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Qm(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function ny(n){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){let g=u[d],x=u[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){let x=u[p];n.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Al=class n extends yn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,p=[],g=[],x=[],m=[];for(let f=0;f<h;f++){let w=f*d-o;for(let T=0;T<c;T++){let y=T*u-r;g.push(y,-w,0),x.push(0,0,1),m.push(T/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let w=0;w<a;w++){let T=w+c*f,y=w+c*(f+1),P=w+1+c*(f+1),C=w+1+c*f;p.push(T,y,C),p.push(y,P,C)}this.setIndex(p),this.setAttribute("position",new Ye(g,3)),this.setAttribute("normal",new Ye(x,3)),this.setAttribute("uv",new Ye(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},iy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sy=`#ifdef USE_ALPHAHASH
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
#endif`,ry=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,oy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ay=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ly=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cy=`#ifdef USE_AOMAP
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
#endif`,hy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uy=`#ifdef USE_BATCHING
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
#endif`,dy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,py=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,my=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,gy=`#ifdef USE_IRIDESCENCE
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
#endif`,xy=`#ifdef USE_BUMPMAP
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
#endif`,_y=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,yy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,My=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,by=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ty=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ey=`#define PI 3.141592653589793
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
} // validated`,Ay=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Cy=`vec3 transformedNormal = objectNormal;
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
#endif`,Ry=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Py=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Iy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Dy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ly="gl_FragColor = linearToOutputTexel( gl_FragColor );",Uy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ny=`#ifdef USE_ENVMAP
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
#endif`,Fy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Oy=`#ifdef USE_ENVMAP
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
#endif`,By=`#ifdef USE_ENVMAP
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
#endif`,Vy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ky=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wy=`#ifdef USE_GRADIENTMAP
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
}`,Xy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$y=`uniform bool receiveShadow;
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
#endif`,Zy=`#ifdef USE_ENVMAP
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
#endif`,Ky=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tv=`PhysicalMaterial material;
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
#endif`,ev=`struct PhysicalMaterial {
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
}`,nv=`
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
#endif`,iv=`#if defined( RE_IndirectDiffuse )
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
#endif`,sv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ov=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,av=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,dv=`#if defined( USE_POINTS_UV )
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
#endif`,fv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_v=`#ifdef USE_MORPHTARGETS
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
#endif`,yv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
#endif`,Mv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tv=`#ifndef FLAT_SHADED
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
#endif`,Ev=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Av=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Iv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Dv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Uv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Nv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ov=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,kv=`float getShadowMask() {
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
}`,Hv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gv=`#ifdef USE_SKINNING
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
#endif`,Wv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xv=`#ifdef USE_SKINNING
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
#endif`,Yv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$v=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kv=`#ifdef USE_TRANSMISSION
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
#endif`,Jv=`#ifdef USE_TRANSMISSION
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
#endif`,Qv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,eS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,nS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,iS=`uniform sampler2D t2D;
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
}`,sS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,oS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lS=`#include <common>
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
}`,cS=`#if DEPTH_PACKING == 3200
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
}`,hS=`#define DISTANCE
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
}`,uS=`#define DISTANCE
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
}`,dS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pS=`uniform float scale;
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
}`,mS=`uniform vec3 diffuse;
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
}`,gS=`#include <common>
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
}`,xS=`uniform vec3 diffuse;
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
}`,_S=`#define LAMBERT
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
}`,yS=`#define LAMBERT
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
}`,vS=`#define MATCAP
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
}`,SS=`#define MATCAP
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
}`,MS=`#define NORMAL
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
}`,bS=`#define NORMAL
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
}`,TS=`#define PHONG
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
}`,wS=`#define PHONG
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
}`,ES=`#define STANDARD
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
}`,AS=`#define STANDARD
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
}`,CS=`#define TOON
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
}`,RS=`#define TOON
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
}`,PS=`uniform float size;
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
}`,IS=`uniform vec3 diffuse;
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
}`,DS=`#include <common>
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
}`,LS=`uniform vec3 color;
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
}`,US=`uniform float rotation;
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
}`,NS=`uniform vec3 diffuse;
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
}`,ee={alphahash_fragment:iy,alphahash_pars_fragment:sy,alphamap_fragment:ry,alphamap_pars_fragment:oy,alphatest_fragment:ay,alphatest_pars_fragment:ly,aomap_fragment:cy,aomap_pars_fragment:hy,batching_pars_vertex:uy,batching_vertex:dy,begin_vertex:fy,beginnormal_vertex:py,bsdfs:my,iridescence_fragment:gy,bumpmap_pars_fragment:xy,clipping_planes_fragment:_y,clipping_planes_pars_fragment:yy,clipping_planes_pars_vertex:vy,clipping_planes_vertex:Sy,color_fragment:My,color_pars_fragment:by,color_pars_vertex:Ty,color_vertex:wy,common:Ey,cube_uv_reflection_fragment:Ay,defaultnormal_vertex:Cy,displacementmap_pars_vertex:Ry,displacementmap_vertex:Py,emissivemap_fragment:Iy,emissivemap_pars_fragment:Dy,colorspace_fragment:Ly,colorspace_pars_fragment:Uy,envmap_fragment:Ny,envmap_common_pars_fragment:Fy,envmap_pars_fragment:Oy,envmap_pars_vertex:By,envmap_physical_pars_fragment:Zy,envmap_vertex:zy,fog_vertex:Vy,fog_pars_vertex:ky,fog_fragment:Hy,fog_pars_fragment:Gy,gradientmap_pars_fragment:Wy,lightmap_pars_fragment:Xy,lights_lambert_fragment:Yy,lights_lambert_pars_fragment:qy,lights_pars_begin:$y,lights_toon_fragment:Ky,lights_toon_pars_fragment:Jy,lights_phong_fragment:Qy,lights_phong_pars_fragment:jy,lights_physical_fragment:tv,lights_physical_pars_fragment:ev,lights_fragment_begin:nv,lights_fragment_maps:iv,lights_fragment_end:sv,logdepthbuf_fragment:rv,logdepthbuf_pars_fragment:ov,logdepthbuf_pars_vertex:av,logdepthbuf_vertex:lv,map_fragment:cv,map_pars_fragment:hv,map_particle_fragment:uv,map_particle_pars_fragment:dv,metalnessmap_fragment:fv,metalnessmap_pars_fragment:pv,morphinstance_vertex:mv,morphcolor_vertex:gv,morphnormal_vertex:xv,morphtarget_pars_vertex:_v,morphtarget_vertex:yv,normal_fragment_begin:vv,normal_fragment_maps:Sv,normal_pars_fragment:Mv,normal_pars_vertex:bv,normal_vertex:Tv,normalmap_pars_fragment:wv,clearcoat_normal_fragment_begin:Ev,clearcoat_normal_fragment_maps:Av,clearcoat_pars_fragment:Cv,iridescence_pars_fragment:Rv,opaque_fragment:Pv,packing:Iv,premultiplied_alpha_fragment:Dv,project_vertex:Lv,dithering_fragment:Uv,dithering_pars_fragment:Nv,roughnessmap_fragment:Fv,roughnessmap_pars_fragment:Ov,shadowmap_pars_fragment:Bv,shadowmap_pars_vertex:zv,shadowmap_vertex:Vv,shadowmask_pars_fragment:kv,skinbase_vertex:Hv,skinning_pars_vertex:Gv,skinning_vertex:Wv,skinnormal_vertex:Xv,specularmap_fragment:Yv,specularmap_pars_fragment:qv,tonemapping_fragment:$v,tonemapping_pars_fragment:Zv,transmission_fragment:Kv,transmission_pars_fragment:Jv,uv_pars_fragment:Qv,uv_pars_vertex:jv,uv_vertex:tS,worldpos_vertex:eS,background_vert:nS,background_frag:iS,backgroundCube_vert:sS,backgroundCube_frag:rS,cube_vert:oS,cube_frag:aS,depth_vert:lS,depth_frag:cS,distanceRGBA_vert:hS,distanceRGBA_frag:uS,equirect_vert:dS,equirect_frag:fS,linedashed_vert:pS,linedashed_frag:mS,meshbasic_vert:gS,meshbasic_frag:xS,meshlambert_vert:_S,meshlambert_frag:yS,meshmatcap_vert:vS,meshmatcap_frag:SS,meshnormal_vert:MS,meshnormal_frag:bS,meshphong_vert:TS,meshphong_frag:wS,meshphysical_vert:ES,meshphysical_frag:AS,meshtoon_vert:CS,meshtoon_frag:RS,points_vert:PS,points_frag:IS,shadow_vert:DS,shadow_frag:LS,sprite_vert:US,sprite_frag:NS},Mt={common:{diffuse:{value:new he(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},envMapRotation:{value:new jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new he(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new he(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},ei={basic:{uniforms:on([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:on([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new he(0)}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:on([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:on([Mt.common,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.roughnessmap,Mt.metalnessmap,Mt.fog,Mt.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:on([Mt.common,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.gradientmap,Mt.fog,Mt.lights,{emissive:{value:new he(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:on([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:on([Mt.points,Mt.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:on([Mt.common,Mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:on([Mt.common,Mt.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:on([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:on([Mt.sprite,Mt.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new jt}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distanceRGBA:{uniforms:on([Mt.common,Mt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distanceRGBA_vert,fragmentShader:ee.distanceRGBA_frag},shadow:{uniforms:on([Mt.lights,Mt.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};ei.physical={uniforms:on([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new he(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new he(0)},specularColor:{value:new he(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};var el={r:0,b:0,g:0},ys=new si,FS=new De;function OS(n,t,e,i,s,r,o){let a=new he(0),l=r===!0?0:1,c,h,u=null,d=0,p=null;function g(w){let T=w.isScene===!0?w.background:null;return T&&T.isTexture&&(T=(w.backgroundBlurriness>0?e:t).get(T)),T}function x(w){let T=!1,y=g(w);y===null?f(a,l):y&&y.isColor&&(f(y,1),T=!0);let P=n.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,T){let y=g(T);y&&(y.isCubeTexture||y.mapping===Hl)?(h===void 0&&(h=new Ie(new ri(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:Ir(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ys.copy(T.backgroundRotation),ys.x*=-1,ys.y*=-1,ys.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(FS.makeRotationFromEuler(ys)),h.material.toneMapped=fe.getTransfer(y.colorSpace)!==Me,(u!==y||d!==y.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,p=n.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ie(new Al(2,2),new oi({name:"BackgroundMaterial",uniforms:Ir(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:ts,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=fe.getTransfer(y.colorSpace)!==Me,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,p=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function f(w,T){w.getRGB(el,Jm(n)),i.buffers.color.setClear(el.r,el.g,el.b,T,o)}return{getClearColor:function(){return a},setClearColor:function(w,T=1){a.set(w),l=T,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,f(a,l)},render:x,addToRenderList:m}}function BS(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,o=!1;function a(v,I,W,Y,q){let it=!1,O=u(Y,W,I);r!==O&&(r=O,c(r.object)),it=p(v,Y,W,q),it&&g(v,Y,W,q),q!==null&&t.update(q,n.ELEMENT_ARRAY_BUFFER),(it||o)&&(o=!1,y(v,I,W,Y),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function l(){return n.createVertexArray()}function c(v){return n.bindVertexArray(v)}function h(v){return n.deleteVertexArray(v)}function u(v,I,W){let Y=W.wireframe===!0,q=i[v.id];q===void 0&&(q={},i[v.id]=q);let it=q[I.id];it===void 0&&(it={},q[I.id]=it);let O=it[Y];return O===void 0&&(O=d(l()),it[Y]=O),O}function d(v){let I=[],W=[],Y=[];for(let q=0;q<e;q++)I[q]=0,W[q]=0,Y[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:W,attributeDivisors:Y,object:v,attributes:{},index:null}}function p(v,I,W,Y){let q=r.attributes,it=I.attributes,O=0,Q=W.getAttributes();for(let U in Q)if(Q[U].location>=0){let K=q[U],$=it[U];if($===void 0&&(U==="instanceMatrix"&&v.instanceMatrix&&($=v.instanceMatrix),U==="instanceColor"&&v.instanceColor&&($=v.instanceColor)),K===void 0||K.attribute!==$||$&&K.data!==$.data)return!0;O++}return r.attributesNum!==O||r.index!==Y}function g(v,I,W,Y){let q={},it=I.attributes,O=0,Q=W.getAttributes();for(let U in Q)if(Q[U].location>=0){let K=it[U];K===void 0&&(U==="instanceMatrix"&&v.instanceMatrix&&(K=v.instanceMatrix),U==="instanceColor"&&v.instanceColor&&(K=v.instanceColor));let $={};$.attribute=K,K&&K.data&&($.data=K.data),q[U]=$,O++}r.attributes=q,r.attributesNum=O,r.index=Y}function x(){let v=r.newAttributes;for(let I=0,W=v.length;I<W;I++)v[I]=0}function m(v){f(v,0)}function f(v,I){let W=r.newAttributes,Y=r.enabledAttributes,q=r.attributeDivisors;W[v]=1,Y[v]===0&&(n.enableVertexAttribArray(v),Y[v]=1),q[v]!==I&&(n.vertexAttribDivisor(v,I),q[v]=I)}function w(){let v=r.newAttributes,I=r.enabledAttributes;for(let W=0,Y=I.length;W<Y;W++)I[W]!==v[W]&&(n.disableVertexAttribArray(W),I[W]=0)}function T(v,I,W,Y,q,it,O){O===!0?n.vertexAttribIPointer(v,I,W,q,it):n.vertexAttribPointer(v,I,W,Y,q,it)}function y(v,I,W,Y){x();let q=Y.attributes,it=W.getAttributes(),O=I.defaultAttributeValues;for(let Q in it){let U=it[Q];if(U.location>=0){let N=q[Q];if(N===void 0&&(Q==="instanceMatrix"&&v.instanceMatrix&&(N=v.instanceMatrix),Q==="instanceColor"&&v.instanceColor&&(N=v.instanceColor)),N!==void 0){let K=N.normalized,$=N.itemSize,rt=t.get(N);if(rt===void 0)continue;let _t=rt.buffer,L=rt.type,z=rt.bytesPerElement,tt=L===n.INT||L===n.UNSIGNED_INT||N.gpuType===Uu;if(N.isInterleavedBufferAttribute){let J=N.data,ut=J.stride,mt=N.offset;if(J.isInstancedInterleavedBuffer){for(let xt=0;xt<U.locationSize;xt++)f(U.location+xt,J.meshPerAttribute);v.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let xt=0;xt<U.locationSize;xt++)m(U.location+xt);n.bindBuffer(n.ARRAY_BUFFER,_t);for(let xt=0;xt<U.locationSize;xt++)T(U.location+xt,$/U.locationSize,L,K,ut*z,(mt+$/U.locationSize*xt)*z,tt)}else{if(N.isInstancedBufferAttribute){for(let J=0;J<U.locationSize;J++)f(U.location+J,N.meshPerAttribute);v.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let J=0;J<U.locationSize;J++)m(U.location+J);n.bindBuffer(n.ARRAY_BUFFER,_t);for(let J=0;J<U.locationSize;J++)T(U.location+J,$/U.locationSize,L,K,$*z,$/U.locationSize*J*z,tt)}}else if(O!==void 0){let K=O[Q];if(K!==void 0)switch(K.length){case 2:n.vertexAttrib2fv(U.location,K);break;case 3:n.vertexAttrib3fv(U.location,K);break;case 4:n.vertexAttrib4fv(U.location,K);break;default:n.vertexAttrib1fv(U.location,K)}}}}w()}function P(){R();for(let v in i){let I=i[v];for(let W in I){let Y=I[W];for(let q in Y)h(Y[q].object),delete Y[q];delete I[W]}delete i[v]}}function C(v){if(i[v.id]===void 0)return;let I=i[v.id];for(let W in I){let Y=I[W];for(let q in Y)h(Y[q].object),delete Y[q];delete I[W]}delete i[v.id]}function A(v){for(let I in i){let W=i[I];if(W[v.id]===void 0)continue;let Y=W[v.id];for(let q in Y)h(Y[q].object),delete Y[q];delete W[v.id]}}function R(){M(),o=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:M,dispose:P,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:w}}function zS(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,i,1)}function l(c,h,u,d){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function VS(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Hn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let R=A===To&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Ai&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ti&&!R)}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,C=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:y,vertexTextures:P,maxSamples:C}}function kS(n){let t=this,e=null,i=0,s=!1,r=!1,o=new Mi,a=new jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||i!==0||s;return s=d,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let w=r?0:i,T=w*4,y=f.clippingState||null;l.value=y,y=h(g,d,T,p);for(let P=0;P!==T;++P)y[P]=e[P];f.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,p,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let f=p+x*4,w=d.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<f)&&(m=new Float32Array(f));for(let T=0,y=p;T!==x;++T,y+=4)o.copy(u[T]).applyMatrix4(w,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function HS(n){let t=new WeakMap;function e(o,a){return a===Rh?o.mapping=Er:a===Ph&&(o.mapping=Ar),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Rh||a===Ph)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new hu(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var Cl=class extends wl{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},yr=4,em=[.125,.215,.35,.446,.526,.582],bs=20,hh=new Cl,nm=new he,uh=null,dh=0,fh=0,ph=!1,Ss=(1+Math.sqrt(5))/2,xr=1/Ss,im=[new V(-Ss,xr,0),new V(Ss,xr,0),new V(-xr,0,Ss),new V(xr,0,Ss),new V(0,Ss,-xr),new V(0,Ss,xr),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)],Rl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){uh=this._renderer.getRenderTarget(),dh=this._renderer.getActiveCubeFace(),fh=this._renderer.getActiveMipmapLevel(),ph=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=om(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(uh,dh,fh),this._renderer.xr.enabled=ph,t.scissorTest=!1,nl(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Er||t.mapping===Ar?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),uh=this._renderer.getRenderTarget(),dh=this._renderer.getActiveCubeFace(),fh=this._renderer.getActiveMipmapLevel(),ph=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ni,minFilter:ni,generateMipmaps:!1,type:To,format:Hn,colorSpace:Nr,depthBuffer:!1},s=sm(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sm(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=GS(r)),this._blurMaterial=WS(r,t,e)}return s}_compileMaterial(t){let e=new Ie(this._lodPlanes[0],t);this._renderer.compile(e,hh)}_sceneToCubeUV(t,e,i,s){let a=new je(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(nm),h.toneMapping=ji,h.autoClear=!1;let p=new Ml({name:"PMREM.Background",side:mn,depthWrite:!1,depthTest:!1}),g=new Ie(new ri,p),x=!1,m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,x=!0):(p.color.copy(nm),x=!0);for(let f=0;f<6;f++){let w=f%3;w===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):w===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));let T=this._cubeSize;nl(s,w*T,f>2?T:0,T,T),h.setRenderTarget(s),x&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===Er||t.mapping===Ar;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=om()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rm());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ie(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;nl(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,hh)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=im[(s-r-1)%im.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ie(this._lodPlanes[s],c),d=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*bs-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):bs;m>bs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bs}`);let f=[],w=0;for(let A=0;A<bs;++A){let R=A/x,M=Math.exp(-R*R/2);f.push(M),A===0?w+=M:A<m&&(w+=2*M)}for(let A=0;A<f.length;A++)f[A]=f[A]/w;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:T}=this;d.dTheta.value=g,d.mipInt.value=T-i;let y=this._sizeLods[s],P=3*y*(s>T-yr?s-T+yr:0),C=4*(this._cubeSize-y);nl(e,P,C,3*y,2*y),l.setRenderTarget(e),l.render(u,hh)}};function GS(n){let t=[],e=[],i=[],s=n,r=n-yr+1+em.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>n-yr?l=em[o-n+yr-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,x=3,m=2,f=1,w=new Float32Array(x*g*p),T=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let C=0;C<p;C++){let A=C%3*2/3-1,R=C>2?0:-1,M=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];w.set(M,x*g*C),T.set(d,m*g*C);let v=[C,C,C,C,C,C];y.set(v,f*g*C)}let P=new yn;P.setAttribute("position",new En(w,x)),P.setAttribute("uv",new En(T,m)),P.setAttribute("faceIndex",new En(y,f)),t.push(P),s>yr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function sm(n,t,e){let i=new Ci(n,t,e);return i.texture.mapping=Hl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function nl(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function WS(n,t,e){let i=new Float32Array(bs),s=new V(0,1,0);return new oi({name:"SphericalGaussianBlur",defines:{n:bs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ku(),fragmentShader:`

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
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function rm(){return new oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ku(),fragmentShader:`

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
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function om(){return new oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ku(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function ku(){return`

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
	`}function XS(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Rh||l===Ph,h=l===Er||l===Ar;if(c||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Rl(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let p=a.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new Rl(n)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function YS(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&mo("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function qS(n,t,e,i){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let m=0,f=x.length;m<f;m++)t.remove(x[m])}d.removeEventListener("dispose",o),delete s[d.id];let p=r.get(d);p&&(t.remove(p),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let g in d)t.update(d[g],n.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let x=p[g];for(let m=0,f=x.length;m<f;m++)t.update(x[m],n.ARRAY_BUFFER)}}function c(u){let d=[],p=u.index,g=u.attributes.position,x=0;if(p!==null){let w=p.array;x=p.version;for(let T=0,y=w.length;T<y;T+=3){let P=w[T+0],C=w[T+1],A=w[T+2];d.push(P,C,C,A,A,P)}}else if(g!==void 0){let w=g.array;x=g.version;for(let T=0,y=w.length/3-1;T<y;T+=3){let P=T+0,C=T+1,A=T+2;d.push(P,C,C,A,A,P)}}else return;let m=new(Zm(d)?Tl:bl)(d,1);m.version=x;let f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function $S(n,t,e){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,p){n.drawElements(i,p,r,d*o),e.update(p,i,1)}function c(d,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,d*o,g),e.update(p,i,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,i,1)}function u(d,p,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/o,p[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,d,0,x,0,g);let f=0;for(let w=0;w<g;w++)f+=p[w]*x[w];e.update(f,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ZS(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function KS(n,t,e){let i=new WeakMap,s=new be;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(a);if(d===void 0||d.count!==u){let M=function(){A.dispose(),i.delete(a),a.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],T=0;p===!0&&(T=1),g===!0&&(T=2),x===!0&&(T=3);let y=a.attributes.position.count*T,P=1;y>t.maxTextureSize&&(P=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let C=new Float32Array(y*P*4*u),A=new yl(C,y,P,u);A.type=Ti,A.needsUpdate=!0;let R=T*4;for(let v=0;v<u;v++){let I=m[v],W=f[v],Y=w[v],q=y*P*4*v;for(let it=0;it<I.count;it++){let O=it*R;p===!0&&(s.fromBufferAttribute(I,it),C[q+O+0]=s.x,C[q+O+1]=s.y,C[q+O+2]=s.z,C[q+O+3]=0),g===!0&&(s.fromBufferAttribute(W,it),C[q+O+4]=s.x,C[q+O+5]=s.y,C[q+O+6]=s.z,C[q+O+7]=0),x===!0&&(s.fromBufferAttribute(Y,it),C[q+O+8]=s.x,C[q+O+9]=s.y,C[q+O+10]=s.z,C[q+O+11]=Y.itemSize===4?s.w:1)}}d={count:u,texture:A,size:new ge(y,P)},i.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function JS(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var Pl=class extends An{constructor(t,e,i,s,r,o,a,l,c,h=Sr){if(h!==Sr&&h!==Rr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Sr&&(i=Es),i===void 0&&h===Rr&&(i=Cr),super(null,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Gn,this.minFilter=l!==void 0?l:Gn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},jm=new An,am=new Pl(1,1),tg=new yl,eg=new lu,ng=new El,lm=[],cm=[],hm=new Float32Array(16),um=new Float32Array(9),dm=new Float32Array(4);function Or(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=lm[s];if(r===void 0&&(r=new Float32Array(s),lm[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function ke(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function He(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Wl(n,t){let e=cm[t];e===void 0&&(e=new Int32Array(t),cm[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function QS(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function jS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;n.uniform2fv(this.addr,t),He(e,t)}}function tM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ke(e,t))return;n.uniform3fv(this.addr,t),He(e,t)}}function eM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;n.uniform4fv(this.addr,t),He(e,t)}}function nM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ke(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),He(e,t)}else{if(ke(e,i))return;dm.set(i),n.uniformMatrix2fv(this.addr,!1,dm),He(e,i)}}function iM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ke(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),He(e,t)}else{if(ke(e,i))return;um.set(i),n.uniformMatrix3fv(this.addr,!1,um),He(e,i)}}function sM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ke(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),He(e,t)}else{if(ke(e,i))return;hm.set(i),n.uniformMatrix4fv(this.addr,!1,hm),He(e,i)}}function rM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function oM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;n.uniform2iv(this.addr,t),He(e,t)}}function aM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;n.uniform3iv(this.addr,t),He(e,t)}}function lM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;n.uniform4iv(this.addr,t),He(e,t)}}function cM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function hM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;n.uniform2uiv(this.addr,t),He(e,t)}}function uM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;n.uniform3uiv(this.addr,t),He(e,t)}}function dM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;n.uniform4uiv(this.addr,t),He(e,t)}}function fM(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(am.compareFunction=qm,r=am):r=jm,e.setTexture2D(t||r,s)}function pM(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||eg,s)}function mM(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||ng,s)}function gM(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||tg,s)}function xM(n){switch(n){case 5126:return QS;case 35664:return jS;case 35665:return tM;case 35666:return eM;case 35674:return nM;case 35675:return iM;case 35676:return sM;case 5124:case 35670:return rM;case 35667:case 35671:return oM;case 35668:case 35672:return aM;case 35669:case 35673:return lM;case 5125:return cM;case 36294:return hM;case 36295:return uM;case 36296:return dM;case 35678:case 36198:case 36298:case 36306:case 35682:return fM;case 35679:case 36299:case 36307:return pM;case 35680:case 36300:case 36308:case 36293:return mM;case 36289:case 36303:case 36311:case 36292:return gM}}function _M(n,t){n.uniform1fv(this.addr,t)}function yM(n,t){let e=Or(t,this.size,2);n.uniform2fv(this.addr,e)}function vM(n,t){let e=Or(t,this.size,3);n.uniform3fv(this.addr,e)}function SM(n,t){let e=Or(t,this.size,4);n.uniform4fv(this.addr,e)}function MM(n,t){let e=Or(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function bM(n,t){let e=Or(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function TM(n,t){let e=Or(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function wM(n,t){n.uniform1iv(this.addr,t)}function EM(n,t){n.uniform2iv(this.addr,t)}function AM(n,t){n.uniform3iv(this.addr,t)}function CM(n,t){n.uniform4iv(this.addr,t)}function RM(n,t){n.uniform1uiv(this.addr,t)}function PM(n,t){n.uniform2uiv(this.addr,t)}function IM(n,t){n.uniform3uiv(this.addr,t)}function DM(n,t){n.uniform4uiv(this.addr,t)}function LM(n,t,e){let i=this.cache,s=t.length,r=Wl(e,s);ke(i,r)||(n.uniform1iv(this.addr,r),He(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||jm,r[o])}function UM(n,t,e){let i=this.cache,s=t.length,r=Wl(e,s);ke(i,r)||(n.uniform1iv(this.addr,r),He(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||eg,r[o])}function NM(n,t,e){let i=this.cache,s=t.length,r=Wl(e,s);ke(i,r)||(n.uniform1iv(this.addr,r),He(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||ng,r[o])}function FM(n,t,e){let i=this.cache,s=t.length,r=Wl(e,s);ke(i,r)||(n.uniform1iv(this.addr,r),He(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||tg,r[o])}function OM(n){switch(n){case 5126:return _M;case 35664:return yM;case 35665:return vM;case 35666:return SM;case 35674:return MM;case 35675:return bM;case 35676:return TM;case 5124:case 35670:return wM;case 35667:case 35671:return EM;case 35668:case 35672:return AM;case 35669:case 35673:return CM;case 5125:return RM;case 36294:return PM;case 36295:return IM;case 36296:return DM;case 35678:case 36198:case 36298:case 36306:case 35682:return LM;case 35679:case 36299:case 36307:return UM;case 35680:case 36300:case 36308:case 36293:return NM;case 36289:case 36303:case 36311:case 36292:return FM}}var uu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=xM(e.type)}},du=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=OM(e.type)}},fu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},mh=/(\w+)(\])?(\[|\.)?/g;function fm(n,t){n.seq.push(t),n.map[t.id]=t}function BM(n,t,e){let i=n.name,s=i.length;for(mh.lastIndex=0;;){let r=mh.exec(i),o=mh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){fm(e,c===void 0?new uu(a,n,t):new du(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new fu(a),fm(e,u)),e=u}}}var Tr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);BM(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function pm(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var zM=37297,VM=0;function kM(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var mm=new jt;function HM(n){fe._getMatrix(mm,fe.workingColorSpace,n);let t=`mat3( ${mm.elements.map(e=>e.toFixed(4))} )`;switch(fe.getTransfer(n)){case Gl:return[t,"LinearTransferOETF"];case Me:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function gm(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+kM(n.getShaderSource(t),o)}else return s}function GM(n,t){let e=HM(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function WM(n,t){let e;switch(t){case t_:e="Linear";break;case e_:e="Reinhard";break;case n_:e="Cineon";break;case i_:e="ACESFilmic";break;case r_:e="AgX";break;case o_:e="Neutral";break;case s_:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var il=new V;function XM(){fe.getLuminanceCoefficients(il);let n=il.x.toFixed(4),t=il.y.toFixed(4),e=il.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function YM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(go).join(`
`)}function qM(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function $M(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function go(n){return n!==""}function xm(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function _m(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ZM=/^[ \t]*#include +<([\w\d./]+)>/gm;function pu(n){return n.replace(ZM,JM)}var KM=new Map;function JM(n,t){let e=ee[t];if(e===void 0){let i=KM.get(t);if(i!==void 0)e=ee[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return pu(e)}var QM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ym(n){return n.replace(QM,jM)}function jM(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function vm(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function tb(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Lm?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Lx?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Si&&(t="SHADOWMAP_TYPE_VSM"),t}function eb(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Er:case Ar:t="ENVMAP_TYPE_CUBE";break;case Hl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function nb(n){let t="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===Ar&&(t="ENVMAP_MODE_REFRACTION"),t}function ib(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Um:t="ENVMAP_BLENDING_MULTIPLY";break;case Qx:t="ENVMAP_BLENDING_MIX";break;case jx:t="ENVMAP_BLENDING_ADD";break}return t}function sb(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function rb(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=tb(e),c=eb(e),h=nb(e),u=ib(e),d=sb(e),p=YM(e),g=qM(r),x=s.createProgram(),m,f,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(go).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(go).join(`
`),f.length>0&&(f+=`
`)):(m=[vm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(go).join(`
`),f=[vm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ji?"#define TONE_MAPPING":"",e.toneMapping!==ji?ee.tonemapping_pars_fragment:"",e.toneMapping!==ji?WM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,GM("linearToOutputTexel",e.outputColorSpace),XM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(go).join(`
`)),o=pu(o),o=xm(o,e),o=_m(o,e),a=pu(a),a=xm(a,e),a=_m(a,e),o=ym(o),a=ym(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Lp?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Lp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let T=w+m+o,y=w+f+a,P=pm(s,s.VERTEX_SHADER,T),C=pm(s,s.FRAGMENT_SHADER,y);s.attachShader(x,P),s.attachShader(x,C),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(I){if(n.debug.checkShaderErrors){let W=s.getProgramInfoLog(x).trim(),Y=s.getShaderInfoLog(P).trim(),q=s.getShaderInfoLog(C).trim(),it=!0,O=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(it=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,P,C);else{let Q=gm(s,P,"vertex"),U=gm(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+W+`
`+Q+`
`+U)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(Y===""||q==="")&&(O=!1);O&&(I.diagnostics={runnable:it,programLog:W,vertexShader:{log:Y,prefix:m},fragmentShader:{log:q,prefix:f}})}s.deleteShader(P),s.deleteShader(C),R=new Tr(s,x),M=$M(s,x)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(x,zM)),v},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=VM++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=P,this.fragmentShader=C,this}var ob=0,mu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new gu(t),e.set(t,i)),i}},gu=class{constructor(t){this.id=ob++,this.code=t,this.usedTimes=0}};function ab(n,t,e,i,s,r,o){let a=new Sl,l=new mu,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,v,I,W,Y){let q=W.fog,it=Y.geometry,O=M.isMeshStandardMaterial?W.environment:null,Q=(M.isMeshStandardMaterial?e:t).get(M.envMap||O),U=Q&&Q.mapping===Hl?Q.image.height:null,N=g[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));let K=it.morphAttributes.position||it.morphAttributes.normal||it.morphAttributes.color,$=K!==void 0?K.length:0,rt=0;it.morphAttributes.position!==void 0&&(rt=1),it.morphAttributes.normal!==void 0&&(rt=2),it.morphAttributes.color!==void 0&&(rt=3);let _t,L,z,tt;if(N){let ae=ei[N];_t=ae.vertexShader,L=ae.fragmentShader}else _t=M.vertexShader,L=M.fragmentShader,l.update(M),z=l.getVertexShaderID(M),tt=l.getFragmentShaderID(M);let J=n.getRenderTarget(),ut=n.state.buffers.depth.getReversed(),mt=Y.isInstancedMesh===!0,xt=Y.isBatchedMesh===!0,Pt=!!M.map,kt=!!M.matcap,Yt=!!Q,F=!!M.aoMap,ce=!!M.lightMap,Rt=!!M.bumpMap,qt=!!M.normalMap,Nt=!!M.displacementMap,te=!!M.emissiveMap,It=!!M.metalnessMap,E=!!M.roughnessMap,_=M.anisotropy>0,X=M.clearcoat>0,at=M.dispersion>0,ct=M.iridescence>0,lt=M.sheen>0,Ut=M.transmission>0,vt=_&&!!M.anisotropyMap,Tt=X&&!!M.clearcoatMap,ne=X&&!!M.clearcoatNormalMap,ft=X&&!!M.clearcoatRoughnessMap,At=ct&&!!M.iridescenceMap,Dt=ct&&!!M.iridescenceThicknessMap,Wt=lt&&!!M.sheenColorMap,wt=lt&&!!M.sheenRoughnessMap,Lt=!!M.specularMap,Bt=!!M.specularColorMap,_e=!!M.specularIntensityMap,B=Ut&&!!M.transmissionMap,bt=Ut&&!!M.thicknessMap,st=!!M.gradientMap,ht=!!M.alphaMap,Ct=M.alphaTest>0,St=!!M.alphaHash,$t=!!M.extensions,Ee=ji;M.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Ee=n.toneMapping);let We={shaderID:N,shaderType:M.type,shaderName:M.name,vertexShader:_t,fragmentShader:L,defines:M.defines,customVertexShaderID:z,customFragmentShaderID:tt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:xt,batchingColor:xt&&Y._colorsTexture!==null,instancing:mt,instancingColor:mt&&Y.instanceColor!==null,instancingMorph:mt&&Y.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:J===null?n.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Nr,alphaToCoverage:!!M.alphaToCoverage,map:Pt,matcap:kt,envMap:Yt,envMapMode:Yt&&Q.mapping,envMapCubeUVHeight:U,aoMap:F,lightMap:ce,bumpMap:Rt,normalMap:qt,displacementMap:d&&Nt,emissiveMap:te,normalMapObjectSpace:qt&&M.normalMapType===h_,normalMapTangentSpace:qt&&M.normalMapType===Ym,metalnessMap:It,roughnessMap:E,anisotropy:_,anisotropyMap:vt,clearcoat:X,clearcoatMap:Tt,clearcoatNormalMap:ne,clearcoatRoughnessMap:ft,dispersion:at,iridescence:ct,iridescenceMap:At,iridescenceThicknessMap:Dt,sheen:lt,sheenColorMap:Wt,sheenRoughnessMap:wt,specularMap:Lt,specularColorMap:Bt,specularIntensityMap:_e,transmission:Ut,transmissionMap:B,thicknessMap:bt,gradientMap:st,opaque:M.transparent===!1&&M.blending===vr&&M.alphaToCoverage===!1,alphaMap:ht,alphaTest:Ct,alphaHash:St,combine:M.combine,mapUv:Pt&&x(M.map.channel),aoMapUv:F&&x(M.aoMap.channel),lightMapUv:ce&&x(M.lightMap.channel),bumpMapUv:Rt&&x(M.bumpMap.channel),normalMapUv:qt&&x(M.normalMap.channel),displacementMapUv:Nt&&x(M.displacementMap.channel),emissiveMapUv:te&&x(M.emissiveMap.channel),metalnessMapUv:It&&x(M.metalnessMap.channel),roughnessMapUv:E&&x(M.roughnessMap.channel),anisotropyMapUv:vt&&x(M.anisotropyMap.channel),clearcoatMapUv:Tt&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:ne&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ft&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:Wt&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:wt&&x(M.sheenRoughnessMap.channel),specularMapUv:Lt&&x(M.specularMap.channel),specularColorMapUv:Bt&&x(M.specularColorMap.channel),specularIntensityMapUv:_e&&x(M.specularIntensityMap.channel),transmissionMapUv:B&&x(M.transmissionMap.channel),thicknessMapUv:bt&&x(M.thicknessMap.channel),alphaMapUv:ht&&x(M.alphaMap.channel),vertexTangents:!!it.attributes.tangent&&(qt||_),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!it.attributes.color&&it.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!it.attributes.uv&&(Pt||ht),fog:!!q,useFog:M.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ut,skinning:Y.isSkinnedMesh===!0,morphTargets:it.morphAttributes.position!==void 0,morphNormals:it.morphAttributes.normal!==void 0,morphColors:it.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:rt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ee,decodeVideoTexture:Pt&&M.map.isVideoTexture===!0&&fe.getTransfer(M.map.colorSpace)===Me,decodeVideoTextureEmissive:te&&M.emissiveMap.isVideoTexture===!0&&fe.getTransfer(M.emissiveMap.colorSpace)===Me,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===bi,flipSided:M.side===mn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:$t&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($t&&M.extensions.multiDraw===!0||xt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return We.vertexUv1s=c.has(1),We.vertexUv2s=c.has(2),We.vertexUv3s=c.has(3),c.clear(),We}function f(M){let v=[];if(M.shaderID?v.push(M.shaderID):(v.push(M.customVertexShaderID),v.push(M.customFragmentShaderID)),M.defines!==void 0)for(let I in M.defines)v.push(I),v.push(M.defines[I]);return M.isRawShaderMaterial===!1&&(w(v,M),T(v,M),v.push(n.outputColorSpace)),v.push(M.customProgramCacheKey),v.join()}function w(M,v){M.push(v.precision),M.push(v.outputColorSpace),M.push(v.envMapMode),M.push(v.envMapCubeUVHeight),M.push(v.mapUv),M.push(v.alphaMapUv),M.push(v.lightMapUv),M.push(v.aoMapUv),M.push(v.bumpMapUv),M.push(v.normalMapUv),M.push(v.displacementMapUv),M.push(v.emissiveMapUv),M.push(v.metalnessMapUv),M.push(v.roughnessMapUv),M.push(v.anisotropyMapUv),M.push(v.clearcoatMapUv),M.push(v.clearcoatNormalMapUv),M.push(v.clearcoatRoughnessMapUv),M.push(v.iridescenceMapUv),M.push(v.iridescenceThicknessMapUv),M.push(v.sheenColorMapUv),M.push(v.sheenRoughnessMapUv),M.push(v.specularMapUv),M.push(v.specularColorMapUv),M.push(v.specularIntensityMapUv),M.push(v.transmissionMapUv),M.push(v.thicknessMapUv),M.push(v.combine),M.push(v.fogExp2),M.push(v.sizeAttenuation),M.push(v.morphTargetsCount),M.push(v.morphAttributeCount),M.push(v.numDirLights),M.push(v.numPointLights),M.push(v.numSpotLights),M.push(v.numSpotLightMaps),M.push(v.numHemiLights),M.push(v.numRectAreaLights),M.push(v.numDirLightShadows),M.push(v.numPointLightShadows),M.push(v.numSpotLightShadows),M.push(v.numSpotLightShadowsWithMaps),M.push(v.numLightProbes),M.push(v.shadowMapType),M.push(v.toneMapping),M.push(v.numClippingPlanes),M.push(v.numClipIntersection),M.push(v.depthPacking)}function T(M,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),M.push(a.mask)}function y(M){let v=g[M.type],I;if(v){let W=ei[v];I=J_.clone(W.uniforms)}else I=M.uniforms;return I}function P(M,v){let I;for(let W=0,Y=h.length;W<Y;W++){let q=h[W];if(q.cacheKey===v){I=q,++I.usedTimes;break}}return I===void 0&&(I=new rb(n,v,M,r),h.push(I)),I}function C(M){if(--M.usedTimes===0){let v=h.indexOf(M);h[v]=h[h.length-1],h.pop(),M.destroy()}}function A(M){l.remove(M)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:P,releaseProgram:C,releaseShaderCache:A,programs:h,dispose:R}}function lb(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function cb(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Sm(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Mm(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,d,p,g,x,m){let f=n[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},n[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=x,f.group=m),t++,f}function a(u,d,p,g,x,m){let f=o(u,d,p,g,x,m);p.transmission>0?i.push(f):p.transparent===!0?s.push(f):e.push(f)}function l(u,d,p,g,x,m){let f=o(u,d,p,g,x,m);p.transmission>0?i.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||cb),i.length>1&&i.sort(d||Sm),s.length>1&&s.sort(d||Sm)}function h(){for(let u=t,d=n.length;u<d;u++){let p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function hb(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new Mm,n.set(i,[o])):s>=r.length?(o=new Mm,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function ub(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new V,color:new he};break;case"SpotLight":e={position:new V,direction:new V,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new V,color:new he,distance:0,decay:0};break;case"HemisphereLight":e={direction:new V,skyColor:new he,groundColor:new he};break;case"RectAreaLight":e={color:new he,position:new V,halfWidth:new V,halfHeight:new V};break}return n[t.id]=e,e}}}function db(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var fb=0;function pb(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function mb(n){let t=new ub,e=db(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new V);let s=new V,r=new De,o=new De;function a(c){let h=0,u=0,d=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,w=0,T=0,y=0,P=0,C=0,A=0;c.sort(pb);for(let M=0,v=c.length;M<v;M++){let I=c[M],W=I.color,Y=I.intensity,q=I.distance,it=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=W.r*Y,u+=W.g*Y,d+=W.b*Y;else if(I.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(I.sh.coefficients[O],Y);A++}else if(I.isDirectionalLight){let O=t.get(I);if(O.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let Q=I.shadow,U=e.get(I);U.shadowIntensity=Q.intensity,U.shadowBias=Q.bias,U.shadowNormalBias=Q.normalBias,U.shadowRadius=Q.radius,U.shadowMapSize=Q.mapSize,i.directionalShadow[p]=U,i.directionalShadowMap[p]=it,i.directionalShadowMatrix[p]=I.shadow.matrix,w++}i.directional[p]=O,p++}else if(I.isSpotLight){let O=t.get(I);O.position.setFromMatrixPosition(I.matrixWorld),O.color.copy(W).multiplyScalar(Y),O.distance=q,O.coneCos=Math.cos(I.angle),O.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),O.decay=I.decay,i.spot[x]=O;let Q=I.shadow;if(I.map&&(i.spotLightMap[P]=I.map,P++,Q.updateMatrices(I),I.castShadow&&C++),i.spotLightMatrix[x]=Q.matrix,I.castShadow){let U=e.get(I);U.shadowIntensity=Q.intensity,U.shadowBias=Q.bias,U.shadowNormalBias=Q.normalBias,U.shadowRadius=Q.radius,U.shadowMapSize=Q.mapSize,i.spotShadow[x]=U,i.spotShadowMap[x]=it,y++}x++}else if(I.isRectAreaLight){let O=t.get(I);O.color.copy(W).multiplyScalar(Y),O.halfWidth.set(I.width*.5,0,0),O.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=O,m++}else if(I.isPointLight){let O=t.get(I);if(O.color.copy(I.color).multiplyScalar(I.intensity),O.distance=I.distance,O.decay=I.decay,I.castShadow){let Q=I.shadow,U=e.get(I);U.shadowIntensity=Q.intensity,U.shadowBias=Q.bias,U.shadowNormalBias=Q.normalBias,U.shadowRadius=Q.radius,U.shadowMapSize=Q.mapSize,U.shadowCameraNear=Q.camera.near,U.shadowCameraFar=Q.camera.far,i.pointShadow[g]=U,i.pointShadowMap[g]=it,i.pointShadowMatrix[g]=I.shadow.matrix,T++}i.point[g]=O,g++}else if(I.isHemisphereLight){let O=t.get(I);O.skyColor.copy(I.color).multiplyScalar(Y),O.groundColor.copy(I.groundColor).multiplyScalar(Y),i.hemi[f]=O,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Mt.LTC_FLOAT_1,i.rectAreaLTC2=Mt.LTC_FLOAT_2):(i.rectAreaLTC1=Mt.LTC_HALF_1,i.rectAreaLTC2=Mt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let R=i.hash;(R.directionalLength!==p||R.pointLength!==g||R.spotLength!==x||R.rectAreaLength!==m||R.hemiLength!==f||R.numDirectionalShadows!==w||R.numPointShadows!==T||R.numSpotShadows!==y||R.numSpotMaps!==P||R.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=y+P-C,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=A,R.directionalLength=p,R.pointLength=g,R.spotLength=x,R.rectAreaLength=m,R.hemiLength=f,R.numDirectionalShadows=w,R.numPointShadows=T,R.numSpotShadows=y,R.numSpotMaps=P,R.numLightProbes=A,i.version=fb++)}function l(c,h){let u=0,d=0,p=0,g=0,x=0,m=h.matrixWorldInverse;for(let f=0,w=c.length;f<w;f++){let T=c[f];if(T.isDirectionalLight){let y=i.directional[u];y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(T.isSpotLight){let y=i.spot[p];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(T.isRectAreaLight){let y=i.rectArea[g];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(T.width*.5,0,0),y.halfHeight.set(0,T.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){let y=i.point[d];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){let y=i.hemi[x];y.direction.setFromMatrixPosition(T.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function bm(n){let t=new mb(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function gb(n){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new bm(n),t.set(s,[a])):r>=o.length?(a=new bm(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var xu=class extends is{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=l_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},_u=class extends is{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},xb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_b=`uniform sampler2D shadow_pass;
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
}`;function yb(n,t,e){let i=new So,s=new ge,r=new ge,o=new be,a=new xu({depthPacking:c_}),l=new _u,c={},h=e.maxTextureSize,u={[ts]:mn,[mn]:ts,[bi]:bi},d=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:xb,fragmentShader:_b}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new yn;g.setAttribute("position",new En(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ie(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lm;let f=this.type;this.render=function(C,A,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let M=n.getRenderTarget(),v=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),W=n.state;W.setBlending(Qi),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let Y=f!==Si&&this.type===Si,q=f===Si&&this.type!==Si;for(let it=0,O=C.length;it<O;it++){let Q=C[it],U=Q.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);let N=U.getFrameExtents();if(s.multiply(N),r.copy(U.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/N.x),s.x=r.x*N.x,U.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/N.y),s.y=r.y*N.y,U.mapSize.y=r.y)),U.map===null||Y===!0||q===!0){let $=this.type!==Si?{minFilter:Gn,magFilter:Gn}:{};U.map!==null&&U.map.dispose(),U.map=new Ci(s.x,s.y,$),U.map.texture.name=Q.name+".shadowMap",U.camera.updateProjectionMatrix()}n.setRenderTarget(U.map),n.clear();let K=U.getViewportCount();for(let $=0;$<K;$++){let rt=U.getViewport($);o.set(r.x*rt.x,r.y*rt.y,r.x*rt.z,r.y*rt.w),W.viewport(o),U.updateMatrices(Q,$),i=U.getFrustum(),y(A,R,U.camera,Q,this.type)}U.isPointLightShadow!==!0&&this.type===Si&&w(U,R),U.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(M,v,I)};function w(C,A){let R=t.update(x);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Ci(s.x,s.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(A,null,R,d,x,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(A,null,R,p,x,null)}function T(C,A,R,M){let v=null,I=R.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(I!==void 0)v=I;else if(v=R.isPointLight===!0?l:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let W=v.uuid,Y=A.uuid,q=c[W];q===void 0&&(q={},c[W]=q);let it=q[Y];it===void 0&&(it=v.clone(),q[Y]=it,A.addEventListener("dispose",P)),v=it}if(v.visible=A.visible,v.wireframe=A.wireframe,M===Si?v.side=A.shadowSide!==null?A.shadowSide:A.side:v.side=A.shadowSide!==null?A.shadowSide:u[A.side],v.alphaMap=A.alphaMap,v.alphaTest=A.alphaTest,v.map=A.map,v.clipShadows=A.clipShadows,v.clippingPlanes=A.clippingPlanes,v.clipIntersection=A.clipIntersection,v.displacementMap=A.displacementMap,v.displacementScale=A.displacementScale,v.displacementBias=A.displacementBias,v.wireframeLinewidth=A.wireframeLinewidth,v.linewidth=A.linewidth,R.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let W=n.properties.get(v);W.light=R}return v}function y(C,A,R,M,v){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&v===Si)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,C.matrixWorld);let Y=t.update(C),q=C.material;if(Array.isArray(q)){let it=Y.groups;for(let O=0,Q=it.length;O<Q;O++){let U=it[O],N=q[U.materialIndex];if(N&&N.visible){let K=T(C,N,M,v);C.onBeforeShadow(n,C,A,R,Y,K,U),n.renderBufferDirect(R,null,Y,K,C,U),C.onAfterShadow(n,C,A,R,Y,K,U)}}}else if(q.visible){let it=T(C,q,M,v);C.onBeforeShadow(n,C,A,R,Y,it,null),n.renderBufferDirect(R,null,Y,it,C,null),C.onAfterShadow(n,C,A,R,Y,it,null)}}let W=C.children;for(let Y=0,q=W.length;Y<q;Y++)y(W[Y],A,R,M,v)}function P(C){C.target.removeEventListener("dispose",P);for(let R in c){let M=c[R],v=C.target.uuid;v in M&&(M[v].dispose(),delete M[v])}}}var vb={[Mh]:bh,[Th]:Ah,[wh]:Ch,[wr]:Eh,[bh]:Mh,[Ah]:Th,[Ch]:wh,[Eh]:wr};function Sb(n,t){function e(){let B=!1,bt=new be,st=null,ht=new be(0,0,0,0);return{setMask:function(Ct){st!==Ct&&!B&&(n.colorMask(Ct,Ct,Ct,Ct),st=Ct)},setLocked:function(Ct){B=Ct},setClear:function(Ct,St,$t,Ee,We){We===!0&&(Ct*=Ee,St*=Ee,$t*=Ee),bt.set(Ct,St,$t,Ee),ht.equals(bt)===!1&&(n.clearColor(Ct,St,$t,Ee),ht.copy(bt))},reset:function(){B=!1,st=null,ht.set(-1,0,0,0)}}}function i(){let B=!1,bt=!1,st=null,ht=null,Ct=null;return{setReversed:function(St){if(bt!==St){let $t=t.get("EXT_clip_control");bt?$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.ZERO_TO_ONE_EXT):$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.NEGATIVE_ONE_TO_ONE_EXT);let Ee=Ct;Ct=null,this.setClear(Ee)}bt=St},getReversed:function(){return bt},setTest:function(St){St?J(n.DEPTH_TEST):ut(n.DEPTH_TEST)},setMask:function(St){st!==St&&!B&&(n.depthMask(St),st=St)},setFunc:function(St){if(bt&&(St=vb[St]),ht!==St){switch(St){case Mh:n.depthFunc(n.NEVER);break;case bh:n.depthFunc(n.ALWAYS);break;case Th:n.depthFunc(n.LESS);break;case wr:n.depthFunc(n.LEQUAL);break;case wh:n.depthFunc(n.EQUAL);break;case Eh:n.depthFunc(n.GEQUAL);break;case Ah:n.depthFunc(n.GREATER);break;case Ch:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ht=St}},setLocked:function(St){B=St},setClear:function(St){Ct!==St&&(bt&&(St=1-St),n.clearDepth(St),Ct=St)},reset:function(){B=!1,st=null,ht=null,Ct=null,bt=!1}}}function s(){let B=!1,bt=null,st=null,ht=null,Ct=null,St=null,$t=null,Ee=null,We=null;return{setTest:function(ae){B||(ae?J(n.STENCIL_TEST):ut(n.STENCIL_TEST))},setMask:function(ae){bt!==ae&&!B&&(n.stencilMask(ae),bt=ae)},setFunc:function(ae,ve,In){(st!==ae||ht!==ve||Ct!==In)&&(n.stencilFunc(ae,ve,In),st=ae,ht=ve,Ct=In)},setOp:function(ae,ve,In){(St!==ae||$t!==ve||Ee!==In)&&(n.stencilOp(ae,ve,In),St=ae,$t=ve,Ee=In)},setLocked:function(ae){B=ae},setClear:function(ae){We!==ae&&(n.clearStencil(ae),We=ae)},reset:function(){B=!1,bt=null,st=null,ht=null,Ct=null,St=null,$t=null,Ee=null,We=null}}}let r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,p=[],g=null,x=!1,m=null,f=null,w=null,T=null,y=null,P=null,C=null,A=new he(0,0,0),R=0,M=!1,v=null,I=null,W=null,Y=null,q=null,it=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),O=!1,Q=0,U=n.getParameter(n.VERSION);U.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(U)[1]),O=Q>=1):U.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),O=Q>=2);let N=null,K={},$=n.getParameter(n.SCISSOR_BOX),rt=n.getParameter(n.VIEWPORT),_t=new be().fromArray($),L=new be().fromArray(rt);function z(B,bt,st,ht){let Ct=new Uint8Array(4),St=n.createTexture();n.bindTexture(B,St),n.texParameteri(B,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(B,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let $t=0;$t<st;$t++)B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?n.texImage3D(bt,0,n.RGBA,1,1,ht,0,n.RGBA,n.UNSIGNED_BYTE,Ct):n.texImage2D(bt+$t,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ct);return St}let tt={};tt[n.TEXTURE_2D]=z(n.TEXTURE_2D,n.TEXTURE_2D,1),tt[n.TEXTURE_CUBE_MAP]=z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[n.TEXTURE_2D_ARRAY]=z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),tt[n.TEXTURE_3D]=z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(n.DEPTH_TEST),o.setFunc(wr),Rt(!1),qt(Tp),J(n.CULL_FACE),F(Qi);function J(B){h[B]!==!0&&(n.enable(B),h[B]=!0)}function ut(B){h[B]!==!1&&(n.disable(B),h[B]=!1)}function mt(B,bt){return u[B]!==bt?(n.bindFramebuffer(B,bt),u[B]=bt,B===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=bt),B===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=bt),!0):!1}function xt(B,bt){let st=p,ht=!1;if(B){st=d.get(bt),st===void 0&&(st=[],d.set(bt,st));let Ct=B.textures;if(st.length!==Ct.length||st[0]!==n.COLOR_ATTACHMENT0){for(let St=0,$t=Ct.length;St<$t;St++)st[St]=n.COLOR_ATTACHMENT0+St;st.length=Ct.length,ht=!0}}else st[0]!==n.BACK&&(st[0]=n.BACK,ht=!0);ht&&n.drawBuffers(st)}function Pt(B){return g!==B?(n.useProgram(B),g=B,!0):!1}let kt={[Ms]:n.FUNC_ADD,[Nx]:n.FUNC_SUBTRACT,[Fx]:n.FUNC_REVERSE_SUBTRACT};kt[Ox]=n.MIN,kt[Bx]=n.MAX;let Yt={[zx]:n.ZERO,[Vx]:n.ONE,[kx]:n.SRC_COLOR,[vh]:n.SRC_ALPHA,[qx]:n.SRC_ALPHA_SATURATE,[Xx]:n.DST_COLOR,[Gx]:n.DST_ALPHA,[Hx]:n.ONE_MINUS_SRC_COLOR,[Sh]:n.ONE_MINUS_SRC_ALPHA,[Yx]:n.ONE_MINUS_DST_COLOR,[Wx]:n.ONE_MINUS_DST_ALPHA,[$x]:n.CONSTANT_COLOR,[Zx]:n.ONE_MINUS_CONSTANT_COLOR,[Kx]:n.CONSTANT_ALPHA,[Jx]:n.ONE_MINUS_CONSTANT_ALPHA};function F(B,bt,st,ht,Ct,St,$t,Ee,We,ae){if(B===Qi){x===!0&&(ut(n.BLEND),x=!1);return}if(x===!1&&(J(n.BLEND),x=!0),B!==Ux){if(B!==m||ae!==M){if((f!==Ms||y!==Ms)&&(n.blendEquation(n.FUNC_ADD),f=Ms,y=Ms),ae)switch(B){case vr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case wp:n.blendFunc(n.ONE,n.ONE);break;case Ep:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ap:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case vr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case wp:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ep:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ap:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}w=null,T=null,P=null,C=null,A.set(0,0,0),R=0,m=B,M=ae}return}Ct=Ct||bt,St=St||st,$t=$t||ht,(bt!==f||Ct!==y)&&(n.blendEquationSeparate(kt[bt],kt[Ct]),f=bt,y=Ct),(st!==w||ht!==T||St!==P||$t!==C)&&(n.blendFuncSeparate(Yt[st],Yt[ht],Yt[St],Yt[$t]),w=st,T=ht,P=St,C=$t),(Ee.equals(A)===!1||We!==R)&&(n.blendColor(Ee.r,Ee.g,Ee.b,We),A.copy(Ee),R=We),m=B,M=!1}function ce(B,bt){B.side===bi?ut(n.CULL_FACE):J(n.CULL_FACE);let st=B.side===mn;bt&&(st=!st),Rt(st),B.blending===vr&&B.transparent===!1?F(Qi):F(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);let ht=B.stencilWrite;a.setTest(ht),ht&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),te(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?J(n.SAMPLE_ALPHA_TO_COVERAGE):ut(n.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(B){v!==B&&(B?n.frontFace(n.CW):n.frontFace(n.CCW),v=B)}function qt(B){B!==Ix?(J(n.CULL_FACE),B!==I&&(B===Tp?n.cullFace(n.BACK):B===Dx?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ut(n.CULL_FACE),I=B}function Nt(B){B!==W&&(O&&n.lineWidth(B),W=B)}function te(B,bt,st){B?(J(n.POLYGON_OFFSET_FILL),(Y!==bt||q!==st)&&(n.polygonOffset(bt,st),Y=bt,q=st)):ut(n.POLYGON_OFFSET_FILL)}function It(B){B?J(n.SCISSOR_TEST):ut(n.SCISSOR_TEST)}function E(B){B===void 0&&(B=n.TEXTURE0+it-1),N!==B&&(n.activeTexture(B),N=B)}function _(B,bt,st){st===void 0&&(N===null?st=n.TEXTURE0+it-1:st=N);let ht=K[st];ht===void 0&&(ht={type:void 0,texture:void 0},K[st]=ht),(ht.type!==B||ht.texture!==bt)&&(N!==st&&(n.activeTexture(st),N=st),n.bindTexture(B,bt||tt[B]),ht.type=B,ht.texture=bt)}function X(){let B=K[N];B!==void 0&&B.type!==void 0&&(n.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function at(){try{n.compressedTexImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ct(){try{n.compressedTexImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function lt(){try{n.texSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ut(){try{n.texSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function vt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Tt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ne(){try{n.texStorage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ft(){try{n.texStorage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function At(){try{n.texImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Dt(){try{n.texImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Wt(B){_t.equals(B)===!1&&(n.scissor(B.x,B.y,B.z,B.w),_t.copy(B))}function wt(B){L.equals(B)===!1&&(n.viewport(B.x,B.y,B.z,B.w),L.copy(B))}function Lt(B,bt){let st=c.get(bt);st===void 0&&(st=new WeakMap,c.set(bt,st));let ht=st.get(B);ht===void 0&&(ht=n.getUniformBlockIndex(bt,B.name),st.set(B,ht))}function Bt(B,bt){let ht=c.get(bt).get(B);l.get(bt)!==ht&&(n.uniformBlockBinding(bt,ht,B.__bindingPointIndex),l.set(bt,ht))}function _e(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},N=null,K={},u={},d=new WeakMap,p=[],g=null,x=!1,m=null,f=null,w=null,T=null,y=null,P=null,C=null,A=new he(0,0,0),R=0,M=!1,v=null,I=null,W=null,Y=null,q=null,_t.set(0,0,n.canvas.width,n.canvas.height),L.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:J,disable:ut,bindFramebuffer:mt,drawBuffers:xt,useProgram:Pt,setBlending:F,setMaterial:ce,setFlipSided:Rt,setCullFace:qt,setLineWidth:Nt,setPolygonOffset:te,setScissorTest:It,activeTexture:E,bindTexture:_,unbindTexture:X,compressedTexImage2D:at,compressedTexImage3D:ct,texImage2D:At,texImage3D:Dt,updateUBOMapping:Lt,uniformBlockBinding:Bt,texStorage2D:ne,texStorage3D:ft,texSubImage2D:lt,texSubImage3D:Ut,compressedTexSubImage2D:vt,compressedTexSubImage3D:Tt,scissor:Wt,viewport:wt,reset:_e}}function Tm(n,t,e,i){let s=Mb(i);switch(e){case zm:return n*t;case km:return n*t;case Hm:return n*t*2;case Gm:return n*t/s.components*s.byteLength;case Ou:return n*t/s.components*s.byteLength;case Wm:return n*t*2/s.components*s.byteLength;case Bu:return n*t*2/s.components*s.byteLength;case Vm:return n*t*3/s.components*s.byteLength;case Hn:return n*t*4/s.components*s.byteLength;case zu:return n*t*4/s.components*s.byteLength;case hl:case ul:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case dl:case fl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Uh:case Fh:return Math.max(n,16)*Math.max(t,8)/4;case Lh:case Nh:return Math.max(n,8)*Math.max(t,8)/2;case Oh:case Bh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case zh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Vh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case kh:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Hh:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Gh:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Wh:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Xh:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Yh:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case qh:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case $h:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Zh:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Kh:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Jh:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Qh:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case jh:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case pl:case tu:case eu:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Xm:case nu:return Math.ceil(n/4)*Math.ceil(t/4)*8;case iu:case su:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Mb(n){switch(n){case Ai:case Fm:return{byteLength:1,components:1};case yo:case Om:case To:return{byteLength:2,components:1};case Nu:case Fu:return{byteLength:2,components:4};case Es:case Uu:case Ti:return{byteLength:4,components:1};case Bm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function bb(n,t,e,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ge,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,_){return p?new OffscreenCanvas(E,_):xl("canvas")}function x(E,_,X){let at=1,ct=It(E);if((ct.width>X||ct.height>X)&&(at=X/Math.max(ct.width,ct.height)),at<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let lt=Math.floor(at*ct.width),Ut=Math.floor(at*ct.height);u===void 0&&(u=g(lt,Ut));let vt=_?g(lt,Ut):u;return vt.width=lt,vt.height=Ut,vt.getContext("2d").drawImage(E,0,0,lt,Ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ct.width+"x"+ct.height+") to ("+lt+"x"+Ut+")."),vt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ct.width+"x"+ct.height+")."),E;return E}function m(E){return E.generateMipmaps}function f(E){n.generateMipmap(E)}function w(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(E,_,X,at,ct=!1){if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let lt=_;if(_===n.RED&&(X===n.FLOAT&&(lt=n.R32F),X===n.HALF_FLOAT&&(lt=n.R16F),X===n.UNSIGNED_BYTE&&(lt=n.R8)),_===n.RED_INTEGER&&(X===n.UNSIGNED_BYTE&&(lt=n.R8UI),X===n.UNSIGNED_SHORT&&(lt=n.R16UI),X===n.UNSIGNED_INT&&(lt=n.R32UI),X===n.BYTE&&(lt=n.R8I),X===n.SHORT&&(lt=n.R16I),X===n.INT&&(lt=n.R32I)),_===n.RG&&(X===n.FLOAT&&(lt=n.RG32F),X===n.HALF_FLOAT&&(lt=n.RG16F),X===n.UNSIGNED_BYTE&&(lt=n.RG8)),_===n.RG_INTEGER&&(X===n.UNSIGNED_BYTE&&(lt=n.RG8UI),X===n.UNSIGNED_SHORT&&(lt=n.RG16UI),X===n.UNSIGNED_INT&&(lt=n.RG32UI),X===n.BYTE&&(lt=n.RG8I),X===n.SHORT&&(lt=n.RG16I),X===n.INT&&(lt=n.RG32I)),_===n.RGB_INTEGER&&(X===n.UNSIGNED_BYTE&&(lt=n.RGB8UI),X===n.UNSIGNED_SHORT&&(lt=n.RGB16UI),X===n.UNSIGNED_INT&&(lt=n.RGB32UI),X===n.BYTE&&(lt=n.RGB8I),X===n.SHORT&&(lt=n.RGB16I),X===n.INT&&(lt=n.RGB32I)),_===n.RGBA_INTEGER&&(X===n.UNSIGNED_BYTE&&(lt=n.RGBA8UI),X===n.UNSIGNED_SHORT&&(lt=n.RGBA16UI),X===n.UNSIGNED_INT&&(lt=n.RGBA32UI),X===n.BYTE&&(lt=n.RGBA8I),X===n.SHORT&&(lt=n.RGBA16I),X===n.INT&&(lt=n.RGBA32I)),_===n.RGB&&X===n.UNSIGNED_INT_5_9_9_9_REV&&(lt=n.RGB9_E5),_===n.RGBA){let Ut=ct?Gl:fe.getTransfer(at);X===n.FLOAT&&(lt=n.RGBA32F),X===n.HALF_FLOAT&&(lt=n.RGBA16F),X===n.UNSIGNED_BYTE&&(lt=Ut===Me?n.SRGB8_ALPHA8:n.RGBA8),X===n.UNSIGNED_SHORT_4_4_4_4&&(lt=n.RGBA4),X===n.UNSIGNED_SHORT_5_5_5_1&&(lt=n.RGB5_A1)}return(lt===n.R16F||lt===n.R32F||lt===n.RG16F||lt===n.RG32F||lt===n.RGBA16F||lt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),lt}function y(E,_){let X;return E?_===null||_===Es||_===Cr?X=n.DEPTH24_STENCIL8:_===Ti?X=n.DEPTH32F_STENCIL8:_===yo&&(X=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Es||_===Cr?X=n.DEPTH_COMPONENT24:_===Ti?X=n.DEPTH_COMPONENT32F:_===yo&&(X=n.DEPTH_COMPONENT16),X}function P(E,_){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Gn&&E.minFilter!==ni?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function C(E){let _=E.target;_.removeEventListener("dispose",C),R(_),_.isVideoTexture&&h.delete(_)}function A(E){let _=E.target;_.removeEventListener("dispose",A),v(_)}function R(E){let _=i.get(E);if(_.__webglInit===void 0)return;let X=E.source,at=d.get(X);if(at){let ct=at[_.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&M(E),Object.keys(at).length===0&&d.delete(X)}i.remove(E)}function M(E){let _=i.get(E);n.deleteTexture(_.__webglTexture);let X=E.source,at=d.get(X);delete at[_.__cacheKey],o.memory.textures--}function v(E){let _=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let at=0;at<6;at++){if(Array.isArray(_.__webglFramebuffer[at]))for(let ct=0;ct<_.__webglFramebuffer[at].length;ct++)n.deleteFramebuffer(_.__webglFramebuffer[at][ct]);else n.deleteFramebuffer(_.__webglFramebuffer[at]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[at])}else{if(Array.isArray(_.__webglFramebuffer))for(let at=0;at<_.__webglFramebuffer.length;at++)n.deleteFramebuffer(_.__webglFramebuffer[at]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let at=0;at<_.__webglColorRenderbuffer.length;at++)_.__webglColorRenderbuffer[at]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[at]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let X=E.textures;for(let at=0,ct=X.length;at<ct;at++){let lt=i.get(X[at]);lt.__webglTexture&&(n.deleteTexture(lt.__webglTexture),o.memory.textures--),i.remove(X[at])}i.remove(E)}let I=0;function W(){I=0}function Y(){let E=I;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),I+=1,E}function q(E){let _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function it(E,_){let X=i.get(E);if(E.isVideoTexture&&Nt(E),E.isRenderTargetTexture===!1&&E.version>0&&X.__version!==E.version){let at=E.image;if(at===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(at.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{L(X,E,_);return}}e.bindTexture(n.TEXTURE_2D,X.__webglTexture,n.TEXTURE0+_)}function O(E,_){let X=i.get(E);if(E.version>0&&X.__version!==E.version){L(X,E,_);return}e.bindTexture(n.TEXTURE_2D_ARRAY,X.__webglTexture,n.TEXTURE0+_)}function Q(E,_){let X=i.get(E);if(E.version>0&&X.__version!==E.version){L(X,E,_);return}e.bindTexture(n.TEXTURE_3D,X.__webglTexture,n.TEXTURE0+_)}function U(E,_){let X=i.get(E);if(E.version>0&&X.__version!==E.version){z(X,E,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture,n.TEXTURE0+_)}let N={[Ih]:n.REPEAT,[Ts]:n.CLAMP_TO_EDGE,[Dh]:n.MIRRORED_REPEAT},K={[Gn]:n.NEAREST,[a_]:n.NEAREST_MIPMAP_NEAREST,[Oa]:n.NEAREST_MIPMAP_LINEAR,[ni]:n.LINEAR,[Hc]:n.LINEAR_MIPMAP_NEAREST,[ws]:n.LINEAR_MIPMAP_LINEAR},$={[u_]:n.NEVER,[x_]:n.ALWAYS,[d_]:n.LESS,[qm]:n.LEQUAL,[f_]:n.EQUAL,[g_]:n.GEQUAL,[p_]:n.GREATER,[m_]:n.NOTEQUAL};function rt(E,_){if(_.type===Ti&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===ni||_.magFilter===Hc||_.magFilter===Oa||_.magFilter===ws||_.minFilter===ni||_.minFilter===Hc||_.minFilter===Oa||_.minFilter===ws)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,N[_.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,N[_.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,N[_.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,K[_.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,K[_.minFilter]),_.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,$[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Gn||_.minFilter!==Oa&&_.minFilter!==ws||_.type===Ti&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let X=t.get("EXT_texture_filter_anisotropic");n.texParameterf(E,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function _t(E,_){let X=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",C));let at=_.source,ct=d.get(at);ct===void 0&&(ct={},d.set(at,ct));let lt=q(_);if(lt!==E.__cacheKey){ct[lt]===void 0&&(ct[lt]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,X=!0),ct[lt].usedTimes++;let Ut=ct[E.__cacheKey];Ut!==void 0&&(ct[E.__cacheKey].usedTimes--,Ut.usedTimes===0&&M(_)),E.__cacheKey=lt,E.__webglTexture=ct[lt].texture}return X}function L(E,_,X){let at=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(at=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(at=n.TEXTURE_3D);let ct=_t(E,_),lt=_.source;e.bindTexture(at,E.__webglTexture,n.TEXTURE0+X);let Ut=i.get(lt);if(lt.version!==Ut.__version||ct===!0){e.activeTexture(n.TEXTURE0+X);let vt=fe.getPrimaries(fe.workingColorSpace),Tt=_.colorSpace===Ki?null:fe.getPrimaries(_.colorSpace),ne=_.colorSpace===Ki||vt===Tt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let ft=x(_.image,!1,s.maxTextureSize);ft=te(_,ft);let At=r.convert(_.format,_.colorSpace),Dt=r.convert(_.type),Wt=T(_.internalFormat,At,Dt,_.colorSpace,_.isVideoTexture);rt(at,_);let wt,Lt=_.mipmaps,Bt=_.isVideoTexture!==!0,_e=Ut.__version===void 0||ct===!0,B=lt.dataReady,bt=P(_,ft);if(_.isDepthTexture)Wt=y(_.format===Rr,_.type),_e&&(Bt?e.texStorage2D(n.TEXTURE_2D,1,Wt,ft.width,ft.height):e.texImage2D(n.TEXTURE_2D,0,Wt,ft.width,ft.height,0,At,Dt,null));else if(_.isDataTexture)if(Lt.length>0){Bt&&_e&&e.texStorage2D(n.TEXTURE_2D,bt,Wt,Lt[0].width,Lt[0].height);for(let st=0,ht=Lt.length;st<ht;st++)wt=Lt[st],Bt?B&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,wt.width,wt.height,At,Dt,wt.data):e.texImage2D(n.TEXTURE_2D,st,Wt,wt.width,wt.height,0,At,Dt,wt.data);_.generateMipmaps=!1}else Bt?(_e&&e.texStorage2D(n.TEXTURE_2D,bt,Wt,ft.width,ft.height),B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ft.width,ft.height,At,Dt,ft.data)):e.texImage2D(n.TEXTURE_2D,0,Wt,ft.width,ft.height,0,At,Dt,ft.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Bt&&_e&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Wt,Lt[0].width,Lt[0].height,ft.depth);for(let st=0,ht=Lt.length;st<ht;st++)if(wt=Lt[st],_.format!==Hn)if(At!==null)if(Bt){if(B)if(_.layerUpdates.size>0){let Ct=Tm(wt.width,wt.height,_.format,_.type);for(let St of _.layerUpdates){let $t=wt.data.subarray(St*Ct/wt.data.BYTES_PER_ELEMENT,(St+1)*Ct/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,St,wt.width,wt.height,1,At,$t)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,0,wt.width,wt.height,ft.depth,At,wt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,st,Wt,wt.width,wt.height,ft.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?B&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,0,wt.width,wt.height,ft.depth,At,Dt,wt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,st,Wt,wt.width,wt.height,ft.depth,0,At,Dt,wt.data)}else{Bt&&_e&&e.texStorage2D(n.TEXTURE_2D,bt,Wt,Lt[0].width,Lt[0].height);for(let st=0,ht=Lt.length;st<ht;st++)wt=Lt[st],_.format!==Hn?At!==null?Bt?B&&e.compressedTexSubImage2D(n.TEXTURE_2D,st,0,0,wt.width,wt.height,At,wt.data):e.compressedTexImage2D(n.TEXTURE_2D,st,Wt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?B&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,wt.width,wt.height,At,Dt,wt.data):e.texImage2D(n.TEXTURE_2D,st,Wt,wt.width,wt.height,0,At,Dt,wt.data)}else if(_.isDataArrayTexture)if(Bt){if(_e&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Wt,ft.width,ft.height,ft.depth),B)if(_.layerUpdates.size>0){let st=Tm(ft.width,ft.height,_.format,_.type);for(let ht of _.layerUpdates){let Ct=ft.data.subarray(ht*st/ft.data.BYTES_PER_ELEMENT,(ht+1)*st/ft.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ht,ft.width,ft.height,1,At,Dt,Ct)}_.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ft.width,ft.height,ft.depth,At,Dt,ft.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Wt,ft.width,ft.height,ft.depth,0,At,Dt,ft.data);else if(_.isData3DTexture)Bt?(_e&&e.texStorage3D(n.TEXTURE_3D,bt,Wt,ft.width,ft.height,ft.depth),B&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ft.width,ft.height,ft.depth,At,Dt,ft.data)):e.texImage3D(n.TEXTURE_3D,0,Wt,ft.width,ft.height,ft.depth,0,At,Dt,ft.data);else if(_.isFramebufferTexture){if(_e)if(Bt)e.texStorage2D(n.TEXTURE_2D,bt,Wt,ft.width,ft.height);else{let st=ft.width,ht=ft.height;for(let Ct=0;Ct<bt;Ct++)e.texImage2D(n.TEXTURE_2D,Ct,Wt,st,ht,0,At,Dt,null),st>>=1,ht>>=1}}else if(Lt.length>0){if(Bt&&_e){let st=It(Lt[0]);e.texStorage2D(n.TEXTURE_2D,bt,Wt,st.width,st.height)}for(let st=0,ht=Lt.length;st<ht;st++)wt=Lt[st],Bt?B&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,At,Dt,wt):e.texImage2D(n.TEXTURE_2D,st,Wt,At,Dt,wt);_.generateMipmaps=!1}else if(Bt){if(_e){let st=It(ft);e.texStorage2D(n.TEXTURE_2D,bt,Wt,st.width,st.height)}B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,At,Dt,ft)}else e.texImage2D(n.TEXTURE_2D,0,Wt,At,Dt,ft);m(_)&&f(at),Ut.__version=lt.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function z(E,_,X){if(_.image.length!==6)return;let at=_t(E,_),ct=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+X);let lt=i.get(ct);if(ct.version!==lt.__version||at===!0){e.activeTexture(n.TEXTURE0+X);let Ut=fe.getPrimaries(fe.workingColorSpace),vt=_.colorSpace===Ki?null:fe.getPrimaries(_.colorSpace),Tt=_.colorSpace===Ki||Ut===vt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let ne=_.isCompressedTexture||_.image[0].isCompressedTexture,ft=_.image[0]&&_.image[0].isDataTexture,At=[];for(let ht=0;ht<6;ht++)!ne&&!ft?At[ht]=x(_.image[ht],!0,s.maxCubemapSize):At[ht]=ft?_.image[ht].image:_.image[ht],At[ht]=te(_,At[ht]);let Dt=At[0],Wt=r.convert(_.format,_.colorSpace),wt=r.convert(_.type),Lt=T(_.internalFormat,Wt,wt,_.colorSpace),Bt=_.isVideoTexture!==!0,_e=lt.__version===void 0||at===!0,B=ct.dataReady,bt=P(_,Dt);rt(n.TEXTURE_CUBE_MAP,_);let st;if(ne){Bt&&_e&&e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,Lt,Dt.width,Dt.height);for(let ht=0;ht<6;ht++){st=At[ht].mipmaps;for(let Ct=0;Ct<st.length;Ct++){let St=st[Ct];_.format!==Hn?Wt!==null?Bt?B&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Ct,0,0,St.width,St.height,Wt,St.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Ct,Lt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Ct,0,0,St.width,St.height,Wt,wt,St.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Ct,Lt,St.width,St.height,0,Wt,wt,St.data)}}}else{if(st=_.mipmaps,Bt&&_e){st.length>0&&bt++;let ht=It(At[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,Lt,ht.width,ht.height)}for(let ht=0;ht<6;ht++)if(ft){Bt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,0,0,At[ht].width,At[ht].height,Wt,wt,At[ht].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,Lt,At[ht].width,At[ht].height,0,Wt,wt,At[ht].data);for(let Ct=0;Ct<st.length;Ct++){let $t=st[Ct].image[ht].image;Bt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Ct+1,0,0,$t.width,$t.height,Wt,wt,$t.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Ct+1,Lt,$t.width,$t.height,0,Wt,wt,$t.data)}}else{Bt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,0,0,Wt,wt,At[ht]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,Lt,Wt,wt,At[ht]);for(let Ct=0;Ct<st.length;Ct++){let St=st[Ct];Bt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Ct+1,0,0,Wt,wt,St.image[ht]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Ct+1,Lt,Wt,wt,St.image[ht])}}}m(_)&&f(n.TEXTURE_CUBE_MAP),lt.__version=ct.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function tt(E,_,X,at,ct,lt){let Ut=r.convert(X.format,X.colorSpace),vt=r.convert(X.type),Tt=T(X.internalFormat,Ut,vt,X.colorSpace),ne=i.get(_),ft=i.get(X);if(ft.__renderTarget=_,!ne.__hasExternalTextures){let At=Math.max(1,_.width>>lt),Dt=Math.max(1,_.height>>lt);ct===n.TEXTURE_3D||ct===n.TEXTURE_2D_ARRAY?e.texImage3D(ct,lt,Tt,At,Dt,_.depth,0,Ut,vt,null):e.texImage2D(ct,lt,Tt,At,Dt,0,Ut,vt,null)}e.bindFramebuffer(n.FRAMEBUFFER,E),qt(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,at,ct,ft.__webglTexture,0,Rt(_)):(ct===n.TEXTURE_2D||ct>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,at,ct,ft.__webglTexture,lt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function J(E,_,X){if(n.bindRenderbuffer(n.RENDERBUFFER,E),_.depthBuffer){let at=_.depthTexture,ct=at&&at.isDepthTexture?at.type:null,lt=y(_.stencilBuffer,ct),Ut=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,vt=Rt(_);qt(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,vt,lt,_.width,_.height):X?n.renderbufferStorageMultisample(n.RENDERBUFFER,vt,lt,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,lt,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ut,n.RENDERBUFFER,E)}else{let at=_.textures;for(let ct=0;ct<at.length;ct++){let lt=at[ct],Ut=r.convert(lt.format,lt.colorSpace),vt=r.convert(lt.type),Tt=T(lt.internalFormat,Ut,vt,lt.colorSpace),ne=Rt(_);X&&qt(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ne,Tt,_.width,_.height):qt(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ne,Tt,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Tt,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ut(E,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let at=i.get(_.depthTexture);at.__renderTarget=_,(!at.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),it(_.depthTexture,0);let ct=at.__webglTexture,lt=Rt(_);if(_.depthTexture.format===Sr)qt(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ct,0,lt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ct,0);else if(_.depthTexture.format===Rr)qt(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ct,0,lt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ct,0);else throw new Error("Unknown depthTexture format")}function mt(E){let _=i.get(E),X=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){let at=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),at){let ct=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,at.removeEventListener("dispose",ct)};at.addEventListener("dispose",ct),_.__depthDisposeCallback=ct}_.__boundDepthTexture=at}if(E.depthTexture&&!_.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");ut(_.__webglFramebuffer,E)}else if(X){_.__webglDepthbuffer=[];for(let at=0;at<6;at++)if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[at]),_.__webglDepthbuffer[at]===void 0)_.__webglDepthbuffer[at]=n.createRenderbuffer(),J(_.__webglDepthbuffer[at],E,!1);else{let ct=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=_.__webglDepthbuffer[at];n.bindRenderbuffer(n.RENDERBUFFER,lt),n.framebufferRenderbuffer(n.FRAMEBUFFER,ct,n.RENDERBUFFER,lt)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),J(_.__webglDepthbuffer,E,!1);else{let at=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ct),n.framebufferRenderbuffer(n.FRAMEBUFFER,at,n.RENDERBUFFER,ct)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function xt(E,_,X){let at=i.get(E);_!==void 0&&tt(at.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),X!==void 0&&mt(E)}function Pt(E){let _=E.texture,X=i.get(E),at=i.get(_);E.addEventListener("dispose",A);let ct=E.textures,lt=E.isWebGLCubeRenderTarget===!0,Ut=ct.length>1;if(Ut||(at.__webglTexture===void 0&&(at.__webglTexture=n.createTexture()),at.__version=_.version,o.memory.textures++),lt){X.__webglFramebuffer=[];for(let vt=0;vt<6;vt++)if(_.mipmaps&&_.mipmaps.length>0){X.__webglFramebuffer[vt]=[];for(let Tt=0;Tt<_.mipmaps.length;Tt++)X.__webglFramebuffer[vt][Tt]=n.createFramebuffer()}else X.__webglFramebuffer[vt]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){X.__webglFramebuffer=[];for(let vt=0;vt<_.mipmaps.length;vt++)X.__webglFramebuffer[vt]=n.createFramebuffer()}else X.__webglFramebuffer=n.createFramebuffer();if(Ut)for(let vt=0,Tt=ct.length;vt<Tt;vt++){let ne=i.get(ct[vt]);ne.__webglTexture===void 0&&(ne.__webglTexture=n.createTexture(),o.memory.textures++)}if(E.samples>0&&qt(E)===!1){X.__webglMultisampledFramebuffer=n.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let vt=0;vt<ct.length;vt++){let Tt=ct[vt];X.__webglColorRenderbuffer[vt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,X.__webglColorRenderbuffer[vt]);let ne=r.convert(Tt.format,Tt.colorSpace),ft=r.convert(Tt.type),At=T(Tt.internalFormat,ne,ft,Tt.colorSpace,E.isXRRenderTarget===!0),Dt=Rt(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,Dt,At,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+vt,n.RENDERBUFFER,X.__webglColorRenderbuffer[vt])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(X.__webglDepthRenderbuffer=n.createRenderbuffer(),J(X.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(lt){e.bindTexture(n.TEXTURE_CUBE_MAP,at.__webglTexture),rt(n.TEXTURE_CUBE_MAP,_);for(let vt=0;vt<6;vt++)if(_.mipmaps&&_.mipmaps.length>0)for(let Tt=0;Tt<_.mipmaps.length;Tt++)tt(X.__webglFramebuffer[vt][Tt],E,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Tt);else tt(X.__webglFramebuffer[vt],E,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0);m(_)&&f(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ut){for(let vt=0,Tt=ct.length;vt<Tt;vt++){let ne=ct[vt],ft=i.get(ne);e.bindTexture(n.TEXTURE_2D,ft.__webglTexture),rt(n.TEXTURE_2D,ne),tt(X.__webglFramebuffer,E,ne,n.COLOR_ATTACHMENT0+vt,n.TEXTURE_2D,0),m(ne)&&f(n.TEXTURE_2D)}e.unbindTexture()}else{let vt=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(vt=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(vt,at.__webglTexture),rt(vt,_),_.mipmaps&&_.mipmaps.length>0)for(let Tt=0;Tt<_.mipmaps.length;Tt++)tt(X.__webglFramebuffer[Tt],E,_,n.COLOR_ATTACHMENT0,vt,Tt);else tt(X.__webglFramebuffer,E,_,n.COLOR_ATTACHMENT0,vt,0);m(_)&&f(vt),e.unbindTexture()}E.depthBuffer&&mt(E)}function kt(E){let _=E.textures;for(let X=0,at=_.length;X<at;X++){let ct=_[X];if(m(ct)){let lt=w(E),Ut=i.get(ct).__webglTexture;e.bindTexture(lt,Ut),f(lt),e.unbindTexture()}}}let Yt=[],F=[];function ce(E){if(E.samples>0){if(qt(E)===!1){let _=E.textures,X=E.width,at=E.height,ct=n.COLOR_BUFFER_BIT,lt=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ut=i.get(E),vt=_.length>1;if(vt)for(let Tt=0;Tt<_.length;Tt++)e.bindFramebuffer(n.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Tt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Ut.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Tt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer);for(let Tt=0;Tt<_.length;Tt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(ct|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(ct|=n.STENCIL_BUFFER_BIT)),vt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ut.__webglColorRenderbuffer[Tt]);let ne=i.get(_[Tt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ne,0)}n.blitFramebuffer(0,0,X,at,0,0,X,at,ct,n.NEAREST),l===!0&&(Yt.length=0,F.length=0,Yt.push(n.COLOR_ATTACHMENT0+Tt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Yt.push(lt),F.push(lt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,F)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Yt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),vt)for(let Tt=0;Tt<_.length;Tt++){e.bindFramebuffer(n.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Tt,n.RENDERBUFFER,Ut.__webglColorRenderbuffer[Tt]);let ne=i.get(_[Tt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Ut.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Tt,n.TEXTURE_2D,ne,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let _=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Rt(E){return Math.min(s.maxSamples,E.samples)}function qt(E){let _=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Nt(E){let _=o.render.frame;h.get(E)!==_&&(h.set(E,_),E.update())}function te(E,_){let X=E.colorSpace,at=E.format,ct=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||X!==Nr&&X!==Ki&&(fe.getTransfer(X)===Me?(at!==Hn||ct!==Ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),_}function It(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=W,this.setTexture2D=it,this.setTexture2DArray=O,this.setTexture3D=Q,this.setTextureCube=U,this.rebindTextures=xt,this.setupRenderTarget=Pt,this.updateRenderTargetMipmap=kt,this.updateMultisampleRenderTarget=ce,this.setupDepthRenderbuffer=mt,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=qt}function Tb(n,t){function e(i,s=Ki){let r,o=fe.getTransfer(s);if(i===Ai)return n.UNSIGNED_BYTE;if(i===Nu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Fu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Bm)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Fm)return n.BYTE;if(i===Om)return n.SHORT;if(i===yo)return n.UNSIGNED_SHORT;if(i===Uu)return n.INT;if(i===Es)return n.UNSIGNED_INT;if(i===Ti)return n.FLOAT;if(i===To)return n.HALF_FLOAT;if(i===zm)return n.ALPHA;if(i===Vm)return n.RGB;if(i===Hn)return n.RGBA;if(i===km)return n.LUMINANCE;if(i===Hm)return n.LUMINANCE_ALPHA;if(i===Sr)return n.DEPTH_COMPONENT;if(i===Rr)return n.DEPTH_STENCIL;if(i===Gm)return n.RED;if(i===Ou)return n.RED_INTEGER;if(i===Wm)return n.RG;if(i===Bu)return n.RG_INTEGER;if(i===zu)return n.RGBA_INTEGER;if(i===hl||i===ul||i===dl||i===fl)if(o===Me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===hl)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ul)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===dl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===hl)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ul)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===dl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Lh||i===Uh||i===Nh||i===Fh)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Lh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Uh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Nh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Fh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Oh||i===Bh||i===zh)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Oh||i===Bh)return o===Me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===zh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Vh||i===kh||i===Hh||i===Gh||i===Wh||i===Xh||i===Yh||i===qh||i===$h||i===Zh||i===Kh||i===Jh||i===Qh||i===jh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Vh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===kh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Hh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Gh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Wh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Xh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Yh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===qh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===$h)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Zh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Kh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Jh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Qh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===jh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===pl||i===tu||i===eu)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===pl)return o===Me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===tu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===eu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Xm||i===nu||i===iu||i===su)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===pl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===nu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===iu)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===su)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Cr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var yu=class extends je{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},ii=class extends ln{constructor(){super(),this.isGroup=!0,this.type="Group"}},wb={type:"move"},_o=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ii,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ii,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ii,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,i),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(wb)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new ii;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Eb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ab=`
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

}`,vu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new An,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new oi({vertexShader:Eb,fragmentShader:Ab,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ie(new Al(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Su=class extends es{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null,x=new vu,m=e.getContextAttributes(),f=null,w=null,T=[],y=[],P=new ge,C=null,A=new je;A.viewport=new be;let R=new je;R.viewport=new be;let M=[A,R],v=new yu,I=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(L){let z=T[L];return z===void 0&&(z=new _o,T[L]=z),z.getTargetRaySpace()},this.getControllerGrip=function(L){let z=T[L];return z===void 0&&(z=new _o,T[L]=z),z.getGripSpace()},this.getHand=function(L){let z=T[L];return z===void 0&&(z=new _o,T[L]=z),z.getHandSpace()};function Y(L){let z=y.indexOf(L.inputSource);if(z===-1)return;let tt=T[z];tt!==void 0&&(tt.update(L.inputSource,L.frame,c||o),tt.dispatchEvent({type:L.type,data:L.inputSource}))}function q(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",it);for(let L=0;L<T.length;L++){let z=y[L];z!==null&&(y[L]=null,T[L].disconnect(z))}I=null,W=null,x.reset(),t.setRenderTarget(f),p=null,d=null,u=null,s=null,w=null,_t.stop(),i.isPresenting=!1,t.setPixelRatio(C),t.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(L){r=L,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(L){a=L,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(L){c=L},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(L){if(s=L,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",q),s.addEventListener("inputsourceschange",it),m.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(P),s.renderState.layers===void 0){let z={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,z),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),w=new Ci(p.framebufferWidth,p.framebufferHeight,{format:Hn,type:Ai,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let z=null,tt=null,J=null;m.depth&&(J=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,z=m.stencil?Rr:Sr,tt=m.stencil?Cr:Es);let ut={colorFormat:e.RGBA8,depthFormat:J,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(ut),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),w=new Ci(d.textureWidth,d.textureHeight,{format:Hn,type:Ai,depthTexture:new Pl(d.textureWidth,d.textureHeight,tt,void 0,void 0,void 0,void 0,void 0,void 0,z),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),_t.setContext(s),_t.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function it(L){for(let z=0;z<L.removed.length;z++){let tt=L.removed[z],J=y.indexOf(tt);J>=0&&(y[J]=null,T[J].disconnect(tt))}for(let z=0;z<L.added.length;z++){let tt=L.added[z],J=y.indexOf(tt);if(J===-1){for(let mt=0;mt<T.length;mt++)if(mt>=y.length){y.push(tt),J=mt;break}else if(y[mt]===null){y[mt]=tt,J=mt;break}if(J===-1)break}let ut=T[J];ut&&ut.connect(tt)}}let O=new V,Q=new V;function U(L,z,tt){O.setFromMatrixPosition(z.matrixWorld),Q.setFromMatrixPosition(tt.matrixWorld);let J=O.distanceTo(Q),ut=z.projectionMatrix.elements,mt=tt.projectionMatrix.elements,xt=ut[14]/(ut[10]-1),Pt=ut[14]/(ut[10]+1),kt=(ut[9]+1)/ut[5],Yt=(ut[9]-1)/ut[5],F=(ut[8]-1)/ut[0],ce=(mt[8]+1)/mt[0],Rt=xt*F,qt=xt*ce,Nt=J/(-F+ce),te=Nt*-F;if(z.matrixWorld.decompose(L.position,L.quaternion,L.scale),L.translateX(te),L.translateZ(Nt),L.matrixWorld.compose(L.position,L.quaternion,L.scale),L.matrixWorldInverse.copy(L.matrixWorld).invert(),ut[10]===-1)L.projectionMatrix.copy(z.projectionMatrix),L.projectionMatrixInverse.copy(z.projectionMatrixInverse);else{let It=xt+Nt,E=Pt+Nt,_=Rt-te,X=qt+(J-te),at=kt*Pt/E*It,ct=Yt*Pt/E*It;L.projectionMatrix.makePerspective(_,X,at,ct,It,E),L.projectionMatrixInverse.copy(L.projectionMatrix).invert()}}function N(L,z){z===null?L.matrixWorld.copy(L.matrix):L.matrixWorld.multiplyMatrices(z.matrixWorld,L.matrix),L.matrixWorldInverse.copy(L.matrixWorld).invert()}this.updateCamera=function(L){if(s===null)return;let z=L.near,tt=L.far;x.texture!==null&&(x.depthNear>0&&(z=x.depthNear),x.depthFar>0&&(tt=x.depthFar)),v.near=R.near=A.near=z,v.far=R.far=A.far=tt,(I!==v.near||W!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),I=v.near,W=v.far),A.layers.mask=L.layers.mask|2,R.layers.mask=L.layers.mask|4,v.layers.mask=A.layers.mask|R.layers.mask;let J=L.parent,ut=v.cameras;N(v,J);for(let mt=0;mt<ut.length;mt++)N(ut[mt],J);ut.length===2?U(v,A,R):v.projectionMatrix.copy(A.projectionMatrix),K(L,v,J)};function K(L,z,tt){tt===null?L.matrix.copy(z.matrixWorld):(L.matrix.copy(tt.matrixWorld),L.matrix.invert(),L.matrix.multiply(z.matrixWorld)),L.matrix.decompose(L.position,L.quaternion,L.scale),L.updateMatrixWorld(!0),L.projectionMatrix.copy(z.projectionMatrix),L.projectionMatrixInverse.copy(z.projectionMatrixInverse),L.isPerspectiveCamera&&(L.fov=vo*2*Math.atan(1/L.projectionMatrix.elements[5]),L.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(L){l=L,d!==null&&(d.fixedFoveation=L),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=L)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(v)};let $=null;function rt(L,z){if(h=z.getViewerPose(c||o),g=z,h!==null){let tt=h.views;p!==null&&(t.setRenderTargetFramebuffer(w,p.framebuffer),t.setRenderTarget(w));let J=!1;tt.length!==v.cameras.length&&(v.cameras.length=0,J=!0);for(let mt=0;mt<tt.length;mt++){let xt=tt[mt],Pt=null;if(p!==null)Pt=p.getViewport(xt);else{let Yt=u.getViewSubImage(d,xt);Pt=Yt.viewport,mt===0&&(t.setRenderTargetTextures(w,Yt.colorTexture,d.ignoreDepthValues?void 0:Yt.depthStencilTexture),t.setRenderTarget(w))}let kt=M[mt];kt===void 0&&(kt=new je,kt.layers.enable(mt),kt.viewport=new be,M[mt]=kt),kt.matrix.fromArray(xt.transform.matrix),kt.matrix.decompose(kt.position,kt.quaternion,kt.scale),kt.projectionMatrix.fromArray(xt.projectionMatrix),kt.projectionMatrixInverse.copy(kt.projectionMatrix).invert(),kt.viewport.set(Pt.x,Pt.y,Pt.width,Pt.height),mt===0&&(v.matrix.copy(kt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),J===!0&&v.cameras.push(kt)}let ut=s.enabledFeatures;if(ut&&ut.includes("depth-sensing")){let mt=u.getDepthInformation(tt[0]);mt&&mt.isValid&&mt.texture&&x.init(t,mt,s.renderState)}}for(let tt=0;tt<T.length;tt++){let J=y[tt],ut=T[tt];J!==null&&ut!==void 0&&ut.update(J,z,c||o)}$&&$(L,z),z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:z}),g=null}let _t=new Qm;_t.setAnimationLoop(rt),this.setAnimationLoop=function(L){$=L},this.dispose=function(){}}},vs=new si,Cb=new De;function Rb(n,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Jm(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,w,T,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,w,T):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===mn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===mn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let w=t.get(f),T=w.envMap,y=w.envMapRotation;T&&(m.envMap.value=T,vs.copy(y),vs.x*=-1,vs.y*=-1,vs.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(vs.y*=-1,vs.z*=-1),m.envMapRotation.value.setFromMatrix4(Cb.makeRotationFromEuler(vs)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,w,T){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*w,m.scale.value=T*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,w){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===mn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){let w=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Pb(n,t,e,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,T){let y=T.program;i.uniformBlockBinding(w,y)}function c(w,T){let y=s[w.id];y===void 0&&(g(w),y=h(w),s[w.id]=y,w.addEventListener("dispose",m));let P=T.program;i.updateUBOMapping(w,P);let C=t.render.frame;r[w.id]!==C&&(d(w),r[w.id]=C)}function h(w){let T=u();w.__bindingPointIndex=T;let y=n.createBuffer(),P=w.__size,C=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,P,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,y),y}function u(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){let T=s[w.id],y=w.uniforms,P=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let C=0,A=y.length;C<A;C++){let R=Array.isArray(y[C])?y[C]:[y[C]];for(let M=0,v=R.length;M<v;M++){let I=R[M];if(p(I,C,M,P)===!0){let W=I.__offset,Y=Array.isArray(I.value)?I.value:[I.value],q=0;for(let it=0;it<Y.length;it++){let O=Y[it],Q=x(O);typeof O=="number"||typeof O=="boolean"?(I.__data[0]=O,n.bufferSubData(n.UNIFORM_BUFFER,W+q,I.__data)):O.isMatrix3?(I.__data[0]=O.elements[0],I.__data[1]=O.elements[1],I.__data[2]=O.elements[2],I.__data[3]=0,I.__data[4]=O.elements[3],I.__data[5]=O.elements[4],I.__data[6]=O.elements[5],I.__data[7]=0,I.__data[8]=O.elements[6],I.__data[9]=O.elements[7],I.__data[10]=O.elements[8],I.__data[11]=0):(O.toArray(I.__data,q),q+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,W,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,T,y,P){let C=w.value,A=T+"_"+y;if(P[A]===void 0)return typeof C=="number"||typeof C=="boolean"?P[A]=C:P[A]=C.clone(),!0;{let R=P[A];if(typeof C=="number"||typeof C=="boolean"){if(R!==C)return P[A]=C,!0}else if(R.equals(C)===!1)return R.copy(C),!0}return!1}function g(w){let T=w.uniforms,y=0,P=16;for(let A=0,R=T.length;A<R;A++){let M=Array.isArray(T[A])?T[A]:[T[A]];for(let v=0,I=M.length;v<I;v++){let W=M[v],Y=Array.isArray(W.value)?W.value:[W.value];for(let q=0,it=Y.length;q<it;q++){let O=Y[q],Q=x(O),U=y%P,N=U%Q.boundary,K=U+N;y+=N,K!==0&&P-K<Q.storage&&(y+=P-K),W.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=y,y+=Q.storage}}}let C=y%P;return C>0&&(y+=P-C),w.__size=y,w.__cache={},this}function x(w){let T={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(T.boundary=4,T.storage=4):w.isVector2?(T.boundary=8,T.storage=8):w.isVector3||w.isColor?(T.boundary=16,T.storage=12):w.isVector4?(T.boundary=16,T.storage=16):w.isMatrix3?(T.boundary=48,T.storage=48):w.isMatrix4?(T.boundary=64,T.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),T}function m(w){let T=w.target;T.removeEventListener("dispose",m);let y=o.indexOf(T.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function f(){for(let w in s)n.deleteBuffer(s[w]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}var Il=class{constructor(t={}){let{canvas:e=U_(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,f=null,w=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=wn,this.toneMapping=ji,this.toneMappingExposure=1;let y=this,P=!1,C=0,A=0,R=null,M=-1,v=null,I=new be,W=new be,Y=null,q=new he(0),it=0,O=e.width,Q=e.height,U=1,N=null,K=null,$=new be(0,0,O,Q),rt=new be(0,0,O,Q),_t=!1,L=new So,z=!1,tt=!1,J=new De,ut=new De,mt=new V,xt=new be,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},kt=!1;function Yt(){return R===null?U:1}let F=i;function ce(S,k){return e.getContext(S,k)}try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",ht,!1),e.addEventListener("webglcontextrestored",Ct,!1),e.addEventListener("webglcontextcreationerror",St,!1),F===null){let k="webgl2";if(F=ce(k,S),F===null)throw ce(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Rt,qt,Nt,te,It,E,_,X,at,ct,lt,Ut,vt,Tt,ne,ft,At,Dt,Wt,wt,Lt,Bt,_e,B;function bt(){Rt=new YS(F),Rt.init(),Bt=new Tb(F,Rt),qt=new VS(F,Rt,t,Bt),Nt=new Sb(F,Rt),qt.reverseDepthBuffer&&d&&Nt.buffers.depth.setReversed(!0),te=new ZS(F),It=new lb,E=new bb(F,Rt,Nt,It,qt,Bt,te),_=new HS(y),X=new XS(y),at=new ny(F),_e=new BS(F,at),ct=new qS(F,at,te,_e),lt=new JS(F,ct,at,te),Wt=new KS(F,qt,E),ft=new kS(It),Ut=new ab(y,_,X,Rt,qt,_e,ft),vt=new Rb(y,It),Tt=new hb,ne=new gb(Rt),Dt=new OS(y,_,X,Nt,lt,p,l),At=new yb(y,lt,qt),B=new Pb(F,te,qt,Nt),wt=new zS(F,Rt,te),Lt=new $S(F,Rt,te),te.programs=Ut.programs,y.capabilities=qt,y.extensions=Rt,y.properties=It,y.renderLists=Tt,y.shadowMap=At,y.state=Nt,y.info=te}bt();let st=new Su(y,F);this.xr=st,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let S=Rt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=Rt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(S){S!==void 0&&(U=S,this.setSize(O,Q,!1))},this.getSize=function(S){return S.set(O,Q)},this.setSize=function(S,k,Z=!0){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=S,Q=k,e.width=Math.floor(S*U),e.height=Math.floor(k*U),Z===!0&&(e.style.width=S+"px",e.style.height=k+"px"),this.setViewport(0,0,S,k)},this.getDrawingBufferSize=function(S){return S.set(O*U,Q*U).floor()},this.setDrawingBufferSize=function(S,k,Z){O=S,Q=k,U=Z,e.width=Math.floor(S*Z),e.height=Math.floor(k*Z),this.setViewport(0,0,S,k)},this.getCurrentViewport=function(S){return S.copy(I)},this.getViewport=function(S){return S.copy($)},this.setViewport=function(S,k,Z,j){S.isVector4?$.set(S.x,S.y,S.z,S.w):$.set(S,k,Z,j),Nt.viewport(I.copy($).multiplyScalar(U).round())},this.getScissor=function(S){return S.copy(rt)},this.setScissor=function(S,k,Z,j){S.isVector4?rt.set(S.x,S.y,S.z,S.w):rt.set(S,k,Z,j),Nt.scissor(W.copy(rt).multiplyScalar(U).round())},this.getScissorTest=function(){return _t},this.setScissorTest=function(S){Nt.setScissorTest(_t=S)},this.setOpaqueSort=function(S){N=S},this.setTransparentSort=function(S){K=S},this.getClearColor=function(S){return S.copy(Dt.getClearColor())},this.setClearColor=function(){Dt.setClearColor.apply(Dt,arguments)},this.getClearAlpha=function(){return Dt.getClearAlpha()},this.setClearAlpha=function(){Dt.setClearAlpha.apply(Dt,arguments)},this.clear=function(S=!0,k=!0,Z=!0){let j=0;if(S){let H=!1;if(R!==null){let gt=R.texture.format;H=gt===zu||gt===Bu||gt===Ou}if(H){let gt=R.texture.type,Et=gt===Ai||gt===Es||gt===yo||gt===Cr||gt===Nu||gt===Fu,Ft=Dt.getClearColor(),Ot=Dt.getClearAlpha(),Zt=Ft.r,Kt=Ft.g,zt=Ft.b;Et?(g[0]=Zt,g[1]=Kt,g[2]=zt,g[3]=Ot,F.clearBufferuiv(F.COLOR,0,g)):(x[0]=Zt,x[1]=Kt,x[2]=zt,x[3]=Ot,F.clearBufferiv(F.COLOR,0,x))}else j|=F.COLOR_BUFFER_BIT}k&&(j|=F.DEPTH_BUFFER_BIT),Z&&(j|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ht,!1),e.removeEventListener("webglcontextrestored",Ct,!1),e.removeEventListener("webglcontextcreationerror",St,!1),Tt.dispose(),ne.dispose(),It.dispose(),_.dispose(),X.dispose(),lt.dispose(),_e.dispose(),B.dispose(),Ut.dispose(),st.dispose(),st.removeEventListener("sessionstart",Yr),st.removeEventListener("sessionend",Dn),un.stop()};function ht(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;let S=te.autoReset,k=At.enabled,Z=At.autoUpdate,j=At.needsUpdate,H=At.type;bt(),te.autoReset=S,At.enabled=k,At.autoUpdate=Z,At.needsUpdate=j,At.type=H}function St(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function $t(S){let k=S.target;k.removeEventListener("dispose",$t),Ee(k)}function Ee(S){We(S),It.remove(S)}function We(S){let k=It.get(S).programs;k!==void 0&&(k.forEach(function(Z){Ut.releaseProgram(Z)}),S.isShaderMaterial&&Ut.releaseShaderCache(S))}this.renderBufferDirect=function(S,k,Z,j,H,gt){k===null&&(k=Pt);let Et=H.isMesh&&H.matrixWorld.determinant()<0,Ft=lc(S,k,Z,j,H);Nt.setMaterial(j,Et);let Ot=Z.index,Zt=1;if(j.wireframe===!0){if(Ot=ct.getWireframeAttribute(Z),Ot===void 0)return;Zt=2}let Kt=Z.drawRange,zt=Z.attributes.position,ie=Kt.start*Zt,xe=(Kt.start+Kt.count)*Zt;gt!==null&&(ie=Math.max(ie,gt.start*Zt),xe=Math.min(xe,(gt.start+gt.count)*Zt)),Ot!==null?(ie=Math.max(ie,0),xe=Math.min(xe,Ot.count)):zt!=null&&(ie=Math.max(ie,0),xe=Math.min(xe,zt.count));let we=xe-ie;if(we<0||we===1/0)return;_e.setup(H,j,Ft,Z,Ot);let $e,pe=wt;if(Ot!==null&&($e=at.get(Ot),pe=Lt,pe.setIndex($e)),H.isMesh)j.wireframe===!0?(Nt.setLineWidth(j.wireframeLinewidth*Yt()),pe.setMode(F.LINES)):pe.setMode(F.TRIANGLES);else if(H.isLine){let Ht=j.linewidth;Ht===void 0&&(Ht=1),Nt.setLineWidth(Ht*Yt()),H.isLineSegments?pe.setMode(F.LINES):H.isLineLoop?pe.setMode(F.LINE_LOOP):pe.setMode(F.LINE_STRIP)}else H.isPoints?pe.setMode(F.POINTS):H.isSprite&&pe.setMode(F.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)pe.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(Rt.get("WEBGL_multi_draw"))pe.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Ht=H._multiDrawStarts,Un=H._multiDrawCounts,me=H._multiDrawCount,dn=Ot?at.get(Ot).bytesPerElement:1,Li=It.get(j).currentProgram.getUniforms();for(let en=0;en<me;en++)Li.setValue(F,"_gl_DrawID",en),pe.render(Ht[en]/dn,Un[en])}else if(H.isInstancedMesh)pe.renderInstances(ie,we,H.count);else if(Z.isInstancedBufferGeometry){let Ht=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Un=Math.min(Z.instanceCount,Ht);pe.renderInstances(ie,we,Un)}else pe.render(ie,we)};function ae(S,k,Z){S.transparent===!0&&S.side===bi&&S.forceSinglePass===!1?(S.side=mn,S.needsUpdate=!0,Di(S,k,Z),S.side=ts,S.needsUpdate=!0,Di(S,k,Z),S.side=bi):Di(S,k,Z)}this.compile=function(S,k,Z=null){Z===null&&(Z=S),f=ne.get(Z),f.init(k),T.push(f),Z.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),S!==Z&&S.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),f.setupLights();let j=new Set;return S.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let gt=H.material;if(gt)if(Array.isArray(gt))for(let Et=0;Et<gt.length;Et++){let Ft=gt[Et];ae(Ft,Z,H),j.add(Ft)}else ae(gt,Z,H),j.add(gt)}),T.pop(),f=null,j},this.compileAsync=function(S,k,Z=null){let j=this.compile(S,k,Z);return new Promise(H=>{function gt(){if(j.forEach(function(Et){It.get(Et).currentProgram.isReady()&&j.delete(Et)}),j.size===0){H(S);return}setTimeout(gt,10)}Rt.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let ve=null;function In(S){ve&&ve(S)}function Yr(){un.stop()}function Dn(){un.start()}let un=new Qm;un.setAnimationLoop(In),typeof self<"u"&&un.setContext(self),this.setAnimationLoop=function(S){ve=S,st.setAnimationLoop(S),S===null?un.stop():un.start()},st.addEventListener("sessionstart",Yr),st.addEventListener("sessionend",Dn),this.render=function(S,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(k),k=st.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,k,R),f=ne.get(S,T.length),f.init(k),T.push(f),ut.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),L.setFromProjectionMatrix(ut),tt=this.localClippingEnabled,z=ft.init(this.clippingPlanes,tt),m=Tt.get(S,w.length),m.init(),w.push(m),st.enabled===!0&&st.isPresenting===!0){let gt=y.xr.getDepthSensingMesh();gt!==null&&Ln(gt,k,-1/0,y.sortObjects)}Ln(S,k,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(N,K),kt=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,kt&&Dt.addToRenderList(m,S),this.info.render.frame++,z===!0&&ft.beginShadows();let Z=f.state.shadowsArray;At.render(Z,S,k),z===!0&&ft.endShadows(),this.info.autoReset===!0&&this.info.reset();let j=m.opaque,H=m.transmissive;if(f.setupLights(),k.isArrayCamera){let gt=k.cameras;if(H.length>0)for(let Et=0,Ft=gt.length;Et<Ft;Et++){let Ot=gt[Et];Uo(j,H,S,Ot)}kt&&Dt.render(S);for(let Et=0,Ft=gt.length;Et<Ft;Et++){let Ot=gt[Et];qr(m,S,Ot,Ot.viewport)}}else H.length>0&&Uo(j,H,S,k),kt&&Dt.render(S),qr(m,S,k);R!==null&&(E.updateMultisampleRenderTarget(R),E.updateRenderTargetMipmap(R)),S.isScene===!0&&S.onAfterRender(y,S,k),_e.resetDefaultState(),M=-1,v=null,T.pop(),T.length>0?(f=T[T.length-1],z===!0&&ft.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function Ln(S,k,Z,j){if(S.visible===!1)return;if(S.layers.test(k.layers)){if(S.isGroup)Z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(k);else if(S.isLight)f.pushLight(S),S.castShadow&&f.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||L.intersectsSprite(S)){j&&xt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ut);let Et=lt.update(S),Ft=S.material;Ft.visible&&m.push(S,Et,Ft,Z,xt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||L.intersectsObject(S))){let Et=lt.update(S),Ft=S.material;if(j&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),xt.copy(S.boundingSphere.center)):(Et.boundingSphere===null&&Et.computeBoundingSphere(),xt.copy(Et.boundingSphere.center)),xt.applyMatrix4(S.matrixWorld).applyMatrix4(ut)),Array.isArray(Ft)){let Ot=Et.groups;for(let Zt=0,Kt=Ot.length;Zt<Kt;Zt++){let zt=Ot[Zt],ie=Ft[zt.materialIndex];ie&&ie.visible&&m.push(S,Et,ie,Z,xt.z,zt)}}else Ft.visible&&m.push(S,Et,Ft,Z,xt.z,null)}}let gt=S.children;for(let Et=0,Ft=gt.length;Et<Ft;Et++)Ln(gt[Et],k,Z,j)}function qr(S,k,Z,j){let H=S.opaque,gt=S.transmissive,Et=S.transparent;f.setupLightsView(Z),z===!0&&ft.setGlobalState(y.clippingPlanes,Z),j&&Nt.viewport(I.copy(j)),H.length>0&&cs(H,k,Z),gt.length>0&&cs(gt,k,Z),Et.length>0&&cs(Et,k,Z),Nt.buffers.depth.setTest(!0),Nt.buffers.depth.setMask(!0),Nt.buffers.color.setMask(!0),Nt.setPolygonOffset(!1)}function Uo(S,k,Z,j){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[j.id]===void 0&&(f.state.transmissionRenderTarget[j.id]=new Ci(1,1,{generateMipmaps:!0,type:Rt.has("EXT_color_buffer_half_float")||Rt.has("EXT_color_buffer_float")?To:Ai,minFilter:ws,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:fe.workingColorSpace}));let gt=f.state.transmissionRenderTarget[j.id],Et=j.viewport||I;gt.setSize(Et.z,Et.w);let Ft=y.getRenderTarget();y.setRenderTarget(gt),y.getClearColor(q),it=y.getClearAlpha(),it<1&&y.setClearColor(16777215,.5),y.clear(),kt&&Dt.render(Z);let Ot=y.toneMapping;y.toneMapping=ji;let Zt=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),f.setupLightsView(j),z===!0&&ft.setGlobalState(y.clippingPlanes,j),cs(S,Z,j),E.updateMultisampleRenderTarget(gt),E.updateRenderTargetMipmap(gt),Rt.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let zt=0,ie=k.length;zt<ie;zt++){let xe=k[zt],we=xe.object,$e=xe.geometry,pe=xe.material,Ht=xe.group;if(pe.side===bi&&we.layers.test(j.layers)){let Un=pe.side;pe.side=mn,pe.needsUpdate=!0,No(we,Z,j,$e,pe,Ht),pe.side=Un,pe.needsUpdate=!0,Kt=!0}}Kt===!0&&(E.updateMultisampleRenderTarget(gt),E.updateRenderTargetMipmap(gt))}y.setRenderTarget(Ft),y.setClearColor(q,it),Zt!==void 0&&(j.viewport=Zt),y.toneMapping=Ot}function cs(S,k,Z){let j=k.isScene===!0?k.overrideMaterial:null;for(let H=0,gt=S.length;H<gt;H++){let Et=S[H],Ft=Et.object,Ot=Et.geometry,Zt=j===null?Et.material:j,Kt=Et.group;Ft.layers.test(Z.layers)&&No(Ft,k,Z,Ot,Zt,Kt)}}function No(S,k,Z,j,H,gt){S.onBeforeRender(y,k,Z,j,H,gt),S.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),H.onBeforeRender(y,k,Z,j,S,gt),H.transparent===!0&&H.side===bi&&H.forceSinglePass===!1?(H.side=mn,H.needsUpdate=!0,y.renderBufferDirect(Z,k,j,H,S,gt),H.side=ts,H.needsUpdate=!0,y.renderBufferDirect(Z,k,j,H,S,gt),H.side=bi):y.renderBufferDirect(Z,k,j,H,S,gt),S.onAfterRender(y,k,Z,j,H,gt)}function Di(S,k,Z){k.isScene!==!0&&(k=Pt);let j=It.get(S),H=f.state.lights,gt=f.state.shadowsArray,Et=H.state.version,Ft=Ut.getParameters(S,H.state,gt,k,Z),Ot=Ut.getProgramCacheKey(Ft),Zt=j.programs;j.environment=S.isMeshStandardMaterial?k.environment:null,j.fog=k.fog,j.envMap=(S.isMeshStandardMaterial?X:_).get(S.envMap||j.environment),j.envMapRotation=j.environment!==null&&S.envMap===null?k.environmentRotation:S.envMapRotation,Zt===void 0&&(S.addEventListener("dispose",$t),Zt=new Map,j.programs=Zt);let Kt=Zt.get(Ot);if(Kt!==void 0){if(j.currentProgram===Kt&&j.lightsStateVersion===Et)return Fo(S,Ft),Kt}else Ft.uniforms=Ut.getUniforms(S),S.onBeforeCompile(Ft,y),Kt=Ut.acquireProgram(Ft,Ot),Zt.set(Ot,Kt),j.uniforms=Ft.uniforms;let zt=j.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(zt.clippingPlanes=ft.uniform),Fo(S,Ft),j.needsLights=Ae(S),j.lightsStateVersion=Et,j.needsLights&&(zt.ambientLightColor.value=H.state.ambient,zt.lightProbe.value=H.state.probe,zt.directionalLights.value=H.state.directional,zt.directionalLightShadows.value=H.state.directionalShadow,zt.spotLights.value=H.state.spot,zt.spotLightShadows.value=H.state.spotShadow,zt.rectAreaLights.value=H.state.rectArea,zt.ltc_1.value=H.state.rectAreaLTC1,zt.ltc_2.value=H.state.rectAreaLTC2,zt.pointLights.value=H.state.point,zt.pointLightShadows.value=H.state.pointShadow,zt.hemisphereLights.value=H.state.hemi,zt.directionalShadowMap.value=H.state.directionalShadowMap,zt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,zt.spotShadowMap.value=H.state.spotShadowMap,zt.spotLightMatrix.value=H.state.spotLightMatrix,zt.spotLightMap.value=H.state.spotLightMap,zt.pointShadowMap.value=H.state.pointShadowMap,zt.pointShadowMatrix.value=H.state.pointShadowMatrix),j.currentProgram=Kt,j.uniformsList=null,Kt}function Gt(S){if(S.uniformsList===null){let k=S.currentProgram.getUniforms();S.uniformsList=Tr.seqWithValue(k.seq,S.uniforms)}return S.uniformsList}function Fo(S,k){let Z=It.get(S);Z.outputColorSpace=k.outputColorSpace,Z.batching=k.batching,Z.batchingColor=k.batchingColor,Z.instancing=k.instancing,Z.instancingColor=k.instancingColor,Z.instancingMorph=k.instancingMorph,Z.skinning=k.skinning,Z.morphTargets=k.morphTargets,Z.morphNormals=k.morphNormals,Z.morphColors=k.morphColors,Z.morphTargetsCount=k.morphTargetsCount,Z.numClippingPlanes=k.numClippingPlanes,Z.numIntersection=k.numClipIntersection,Z.vertexAlphas=k.vertexAlphas,Z.vertexTangents=k.vertexTangents,Z.toneMapping=k.toneMapping}function lc(S,k,Z,j,H){k.isScene!==!0&&(k=Pt),E.resetTextureUnits();let gt=k.fog,Et=j.isMeshStandardMaterial?k.environment:null,Ft=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Nr,Ot=(j.isMeshStandardMaterial?X:_).get(j.envMap||Et),Zt=j.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Kt=!!Z.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),zt=!!Z.morphAttributes.position,ie=!!Z.morphAttributes.normal,xe=!!Z.morphAttributes.color,we=ji;j.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(we=y.toneMapping);let $e=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,pe=$e!==void 0?$e.length:0,Ht=It.get(j),Un=f.state.lights;if(z===!0&&(tt===!0||S!==v)){let nn=S===v&&j.id===M;ft.setState(j,S,nn)}let me=!1;j.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==Un.state.version||Ht.outputColorSpace!==Ft||H.isBatchedMesh&&Ht.batching===!1||!H.isBatchedMesh&&Ht.batching===!0||H.isBatchedMesh&&Ht.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Ht.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Ht.instancing===!1||!H.isInstancedMesh&&Ht.instancing===!0||H.isSkinnedMesh&&Ht.skinning===!1||!H.isSkinnedMesh&&Ht.skinning===!0||H.isInstancedMesh&&Ht.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ht.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ht.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ht.instancingMorph===!1&&H.morphTexture!==null||Ht.envMap!==Ot||j.fog===!0&&Ht.fog!==gt||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==ft.numPlanes||Ht.numIntersection!==ft.numIntersection)||Ht.vertexAlphas!==Zt||Ht.vertexTangents!==Kt||Ht.morphTargets!==zt||Ht.morphNormals!==ie||Ht.morphColors!==xe||Ht.toneMapping!==we||Ht.morphTargetsCount!==pe)&&(me=!0):(me=!0,Ht.__version=j.version);let dn=Ht.currentProgram;me===!0&&(dn=Di(j,k,H));let Li=!1,en=!1,qn=!1,ye=dn.getUniforms(),vn=Ht.uniforms;if(Nt.useProgram(dn.program)&&(Li=!0,en=!0,qn=!0),j.id!==M&&(M=j.id,en=!0),Li||v!==S){Nt.buffers.depth.getReversed()?(J.copy(S.projectionMatrix),F_(J),O_(J),ye.setValue(F,"projectionMatrix",J)):ye.setValue(F,"projectionMatrix",S.projectionMatrix),ye.setValue(F,"viewMatrix",S.matrixWorldInverse);let $n=ye.map.cameraPosition;$n!==void 0&&$n.setValue(F,mt.setFromMatrixPosition(S.matrixWorld)),qt.logarithmicDepthBuffer&&ye.setValue(F,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&ye.setValue(F,"isOrthographic",S.isOrthographicCamera===!0),v!==S&&(v=S,en=!0,qn=!0)}if(H.isSkinnedMesh){ye.setOptional(F,H,"bindMatrix"),ye.setOptional(F,H,"bindMatrixInverse");let nn=H.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),ye.setValue(F,"boneTexture",nn.boneTexture,E))}H.isBatchedMesh&&(ye.setOptional(F,H,"batchingTexture"),ye.setValue(F,"batchingTexture",H._matricesTexture,E),ye.setOptional(F,H,"batchingIdTexture"),ye.setValue(F,"batchingIdTexture",H._indirectTexture,E),ye.setOptional(F,H,"batchingColorTexture"),H._colorsTexture!==null&&ye.setValue(F,"batchingColorTexture",H._colorsTexture,E));let ui=Z.morphAttributes;if((ui.position!==void 0||ui.normal!==void 0||ui.color!==void 0)&&Wt.update(H,Z,dn),(en||Ht.receiveShadow!==H.receiveShadow)&&(Ht.receiveShadow=H.receiveShadow,ye.setValue(F,"receiveShadow",H.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(vn.envMap.value=Ot,vn.flipEnvMap.value=Ot.isCubeTexture&&Ot.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&k.environment!==null&&(vn.envMapIntensity.value=k.environmentIntensity),en&&(ye.setValue(F,"toneMappingExposure",y.toneMappingExposure),Ht.needsLights&&cc(vn,qn),gt&&j.fog===!0&&vt.refreshFogUniforms(vn,gt),vt.refreshMaterialUniforms(vn,j,U,Q,f.state.transmissionRenderTarget[S.id]),Tr.upload(F,Gt(Ht),vn,E)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Tr.upload(F,Gt(Ht),vn,E),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&ye.setValue(F,"center",H.center),ye.setValue(F,"modelViewMatrix",H.modelViewMatrix),ye.setValue(F,"normalMatrix",H.normalMatrix),ye.setValue(F,"modelMatrix",H.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){let nn=j.uniformsGroups;for(let $n=0,Nn=nn.length;$n<Nn;$n++){let $r=nn[$n];B.update($r,dn),B.bind($r,dn)}}return dn}function cc(S,k){S.ambientLightColor.needsUpdate=k,S.lightProbe.needsUpdate=k,S.directionalLights.needsUpdate=k,S.directionalLightShadows.needsUpdate=k,S.pointLights.needsUpdate=k,S.pointLightShadows.needsUpdate=k,S.spotLights.needsUpdate=k,S.spotLightShadows.needsUpdate=k,S.rectAreaLights.needsUpdate=k,S.hemisphereLights.needsUpdate=k}function Ae(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(S,k,Z){It.get(S.texture).__webglTexture=k,It.get(S.depthTexture).__webglTexture=Z;let j=It.get(S);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=Z===void 0,j.__autoAllocateDepthBuffer||Rt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,k){let Z=It.get(S);Z.__webglFramebuffer=k,Z.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(S,k=0,Z=0){R=S,C=k,A=Z;let j=!0,H=null,gt=!1,Et=!1;if(S){let Ot=It.get(S);if(Ot.__useDefaultFramebuffer!==void 0)Nt.bindFramebuffer(F.FRAMEBUFFER,null),j=!1;else if(Ot.__webglFramebuffer===void 0)E.setupRenderTarget(S);else if(Ot.__hasExternalTextures)E.rebindTextures(S,It.get(S.texture).__webglTexture,It.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let zt=S.depthTexture;if(Ot.__boundDepthTexture!==zt){if(zt!==null&&It.has(zt)&&(S.width!==zt.image.width||S.height!==zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(S)}}let Zt=S.texture;(Zt.isData3DTexture||Zt.isDataArrayTexture||Zt.isCompressedArrayTexture)&&(Et=!0);let Kt=It.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Kt[k])?H=Kt[k][Z]:H=Kt[k],gt=!0):S.samples>0&&E.useMultisampledRTT(S)===!1?H=It.get(S).__webglMultisampledFramebuffer:Array.isArray(Kt)?H=Kt[Z]:H=Kt,I.copy(S.viewport),W.copy(S.scissor),Y=S.scissorTest}else I.copy($).multiplyScalar(U).floor(),W.copy(rt).multiplyScalar(U).floor(),Y=_t;if(Nt.bindFramebuffer(F.FRAMEBUFFER,H)&&j&&Nt.drawBuffers(S,H),Nt.viewport(I),Nt.scissor(W),Nt.setScissorTest(Y),gt){let Ot=It.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ot.__webglTexture,Z)}else if(Et){let Ot=It.get(S.texture),Zt=k||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ot.__webglTexture,Z||0,Zt)}M=-1},this.readRenderTargetPixels=function(S,k,Z,j,H,gt,Et){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ft=It.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Et!==void 0&&(Ft=Ft[Et]),Ft){Nt.bindFramebuffer(F.FRAMEBUFFER,Ft);try{let Ot=S.texture,Zt=Ot.format,Kt=Ot.type;if(!qt.textureFormatReadable(Zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qt.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=S.width-j&&Z>=0&&Z<=S.height-H&&F.readPixels(k,Z,j,H,Bt.convert(Zt),Bt.convert(Kt),gt)}finally{let Ot=R!==null?It.get(R).__webglFramebuffer:null;Nt.bindFramebuffer(F.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(S,k,Z,j,H,gt,Et){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ft=It.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Et!==void 0&&(Ft=Ft[Et]),Ft){let Ot=S.texture,Zt=Ot.format,Kt=Ot.type;if(!qt.textureFormatReadable(Zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qt.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=S.width-j&&Z>=0&&Z<=S.height-H){Nt.bindFramebuffer(F.FRAMEBUFFER,Ft);let zt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,zt),F.bufferData(F.PIXEL_PACK_BUFFER,gt.byteLength,F.STREAM_READ),F.readPixels(k,Z,j,H,Bt.convert(Zt),Bt.convert(Kt),0);let ie=R!==null?It.get(R).__webglFramebuffer:null;Nt.bindFramebuffer(F.FRAMEBUFFER,ie);let xe=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await N_(F,xe,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,zt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,gt),F.deleteBuffer(zt),F.deleteSync(xe),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,k=null,Z=0){S.isTexture!==!0&&(mo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,S=arguments[1]);let j=Math.pow(2,-Z),H=Math.floor(S.image.width*j),gt=Math.floor(S.image.height*j),Et=k!==null?k.x:0,Ft=k!==null?k.y:0;E.setTexture2D(S,0),F.copyTexSubImage2D(F.TEXTURE_2D,Z,0,0,Et,Ft,H,gt),Nt.unbindTexture()},this.copyTextureToTexture=function(S,k,Z=null,j=null,H=0){S.isTexture!==!0&&(mo("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,S=arguments[1],k=arguments[2],H=arguments[3]||0,Z=null);let gt,Et,Ft,Ot,Zt,Kt,zt,ie,xe,we=S.isCompressedTexture?S.mipmaps[H]:S.image;Z!==null?(gt=Z.max.x-Z.min.x,Et=Z.max.y-Z.min.y,Ft=Z.isBox3?Z.max.z-Z.min.z:1,Ot=Z.min.x,Zt=Z.min.y,Kt=Z.isBox3?Z.min.z:0):(gt=we.width,Et=we.height,Ft=we.depth||1,Ot=0,Zt=0,Kt=0),j!==null?(zt=j.x,ie=j.y,xe=j.z):(zt=0,ie=0,xe=0);let $e=Bt.convert(k.format),pe=Bt.convert(k.type),Ht;k.isData3DTexture?(E.setTexture3D(k,0),Ht=F.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(E.setTexture2DArray(k,0),Ht=F.TEXTURE_2D_ARRAY):(E.setTexture2D(k,0),Ht=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,k.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,k.unpackAlignment);let Un=F.getParameter(F.UNPACK_ROW_LENGTH),me=F.getParameter(F.UNPACK_IMAGE_HEIGHT),dn=F.getParameter(F.UNPACK_SKIP_PIXELS),Li=F.getParameter(F.UNPACK_SKIP_ROWS),en=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,we.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,we.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ot),F.pixelStorei(F.UNPACK_SKIP_ROWS,Zt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Kt);let qn=S.isDataArrayTexture||S.isData3DTexture,ye=k.isDataArrayTexture||k.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){let vn=It.get(S),ui=It.get(k),nn=It.get(vn.__renderTarget),$n=It.get(ui.__renderTarget);Nt.bindFramebuffer(F.READ_FRAMEBUFFER,nn.__webglFramebuffer),Nt.bindFramebuffer(F.DRAW_FRAMEBUFFER,$n.__webglFramebuffer);for(let Nn=0;Nn<Ft;Nn++)qn&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,It.get(S).__webglTexture,H,Kt+Nn),S.isDepthTexture?(ye&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,It.get(k).__webglTexture,H,xe+Nn),F.blitFramebuffer(Ot,Zt,gt,Et,zt,ie,gt,Et,F.DEPTH_BUFFER_BIT,F.NEAREST)):ye?F.copyTexSubImage3D(Ht,H,zt,ie,xe+Nn,Ot,Zt,gt,Et):F.copyTexSubImage2D(Ht,H,zt,ie,xe+Nn,Ot,Zt,gt,Et);Nt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Nt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ye?S.isDataTexture||S.isData3DTexture?F.texSubImage3D(Ht,H,zt,ie,xe,gt,Et,Ft,$e,pe,we.data):k.isCompressedArrayTexture?F.compressedTexSubImage3D(Ht,H,zt,ie,xe,gt,Et,Ft,$e,we.data):F.texSubImage3D(Ht,H,zt,ie,xe,gt,Et,Ft,$e,pe,we):S.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,H,zt,ie,gt,Et,$e,pe,we.data):S.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,H,zt,ie,we.width,we.height,$e,we.data):F.texSubImage2D(F.TEXTURE_2D,H,zt,ie,gt,Et,$e,pe,we);F.pixelStorei(F.UNPACK_ROW_LENGTH,Un),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,me),F.pixelStorei(F.UNPACK_SKIP_PIXELS,dn),F.pixelStorei(F.UNPACK_SKIP_ROWS,Li),F.pixelStorei(F.UNPACK_SKIP_IMAGES,en),H===0&&k.generateMipmaps&&F.generateMipmap(Ht),Nt.unbindTexture()},this.copyTextureToTexture3D=function(S,k,Z=null,j=null,H=0){return S.isTexture!==!0&&(mo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,j=arguments[1]||null,S=arguments[2],k=arguments[3],H=arguments[4]||0),mo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,k,Z,j,H)},this.initRenderTarget=function(S){It.get(S).__webglFramebuffer===void 0&&E.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?E.setTextureCube(S,0):S.isData3DTexture?E.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?E.setTexture2DArray(S,0):E.setTexture2D(S,0),Nt.unbindTexture()},this.resetState=function(){C=0,A=0,R=null,Nt.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=fe._getDrawingBufferColorSpace(t),e.unpackColorSpace=fe._getUnpackColorSpace()}};var Dl=class extends ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new si,this.environmentIntensity=1,this.environmentRotation=new si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Dr=class extends is{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new he(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Ll=new V,Ul=new V,wm=new De,fo=new vl,sl=new Pr,gh=new V,Em=new V,Mo=class extends ln{constructor(t=new yn,e=new Dr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Ll.fromBufferAttribute(e,s-1),Ul.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Ll.distanceTo(Ul);t.setAttribute("lineDistance",new Ye(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),sl.copy(i.boundingSphere),sl.applyMatrix4(s),sl.radius+=r,t.ray.intersectsSphere(sl)===!1)return;wm.copy(s).invert(),fo.copy(t.ray).applyMatrix4(wm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=c){let f=h.getX(x),w=h.getX(x+1),T=rl(this,t,fo,l,f,w);T&&e.push(T)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(p),f=rl(this,t,fo,l,x,m);f&&e.push(f)}}else{let p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=c){let f=rl(this,t,fo,l,x,x+1);f&&e.push(f)}if(this.isLineLoop){let x=rl(this,t,fo,l,g-1,p);x&&e.push(x)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function rl(n,t,e,i,s,r){let o=n.geometry.attributes.position;if(Ll.fromBufferAttribute(o,s),Ul.fromBufferAttribute(o,r),e.distanceSqToSegment(Ll,Ul,gh,Em)>i)return;gh.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(gh);if(!(l<t.near||l>t.far))return{distance:l,point:Em.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}var Am=new V,Cm=new V,Ri=class extends Mo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Am.fromBufferAttribute(e,s),Cm.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Am.distanceTo(Cm);t.setAttribute("lineDistance",new Ye(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Lr=class n extends yn{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],p=[],g=0,x=[],m=i/2,f=0;w(),o===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new Ye(u,3)),this.setAttribute("normal",new Ye(d,3)),this.setAttribute("uv",new Ye(p,2));function w(){let y=new V,P=new V,C=0,A=(e-t)/i;for(let R=0;R<=r;R++){let M=[],v=R/r,I=v*(e-t)+t;for(let W=0;W<=s;W++){let Y=W/s,q=Y*l+a,it=Math.sin(q),O=Math.cos(q);P.x=I*it,P.y=-v*i+m,P.z=I*O,u.push(P.x,P.y,P.z),y.set(it,A,O).normalize(),d.push(y.x,y.y,y.z),p.push(Y,1-v),M.push(g++)}x.push(M)}for(let R=0;R<s;R++)for(let M=0;M<r;M++){let v=x[M][R],I=x[M+1][R],W=x[M+1][R+1],Y=x[M][R+1];(t>0||M!==0)&&(h.push(v,I,Y),C+=3),(e>0||M!==r-1)&&(h.push(I,W,Y),C+=3)}c.addGroup(f,C,0),f+=C}function T(y){let P=g,C=new ge,A=new V,R=0,M=y===!0?t:e,v=y===!0?1:-1;for(let W=1;W<=s;W++)u.push(0,m*v,0),d.push(0,v,0),p.push(.5,.5),g++;let I=g;for(let W=0;W<=s;W++){let q=W/s*l+a,it=Math.cos(q),O=Math.sin(q);A.x=M*O,A.y=m*v,A.z=M*it,u.push(A.x,A.y,A.z),d.push(0,v,0),C.x=it*.5+.5,C.y=O*.5*v+.5,p.push(C.x,C.y),g++}for(let W=0;W<s;W++){let Y=P+W,q=I+W;y===!0?h.push(q,q+1,Y):h.push(q+1,q,Y),R+=3}c.addGroup(f,R,y===!0?1:2),f+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var ol=new V,al=new V,xh=new V,ll=new Ji,Pi=class extends yn{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(Mr*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},p=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:x,b:m,c:f}=ll;if(x.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),f.fromBufferAttribute(a,c[2]),ll.getNormal(xh),u[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let w=0;w<3;w++){let T=(w+1)%3,y=u[w],P=u[T],C=ll[h[w]],A=ll[h[T]],R=`${y}_${P}`,M=`${P}_${y}`;M in d&&d[M]?(xh.dot(d[M].normal)<=r&&(p.push(C.x,C.y,C.z),p.push(A.x,A.y,A.z)),d[M]=null):R in d||(d[R]={index0:c[w],index1:c[T],normal:xh.clone()})}}for(let g in d)if(d[g]){let{index0:x,index1:m}=d[g];ol.fromBufferAttribute(a,x),al.fromBufferAttribute(a,m),p.push(ol.x,ol.y,ol.z),p.push(al.x,al.y,al.z)}this.setAttribute("position",new Ye(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var Nl=class n extends yn{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],l=[],c=[],h=new V,u=new V,d=new V;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){let x=g/s*r,m=p/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){let x=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,w=(s+1)*p+g;o.push(x,m,w),o.push(m,f,w)}this.setIndex(o),this.setAttribute("position",new Ye(a,3)),this.setAttribute("normal",new Ye(l,3)),this.setAttribute("uv",new Ye(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var ai=class extends is{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new he(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ym,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function cl(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Ib(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var Ur=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Mu=class extends Ur{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Cp,endingEnd:Cp}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Rp:r=t,a=2*e-i;break;case Pp:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Rp:o=t,l=2*i-e;break;case Pp:o=1,l=i+s[1]-s[0];break;default:o=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(i-e)/(s-e),x=g*g,m=x*g,f=-d*m+2*d*x-d*g,w=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,T=(-1-p)*m+(1.5+p)*x+.5*g,y=p*m-p*x;for(let P=0;P!==a;++P)r[P]=f*o[h+P]+w*o[c+P]+T*o[l+P]+y*o[u+P];return r}},bu=class extends Ur{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(i-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},Tu=class extends Ur{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Wn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=cl(e,this.TimeBufferType),this.values=cl(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:cl(t.times,Array),values:cl(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Tu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new bu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Mu(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ml:e=this.InterpolantFactoryMethodDiscrete;break;case ru:e=this.InterpolantFactoryMethodLinear;break;case Gc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ml;case this.InterpolantFactoryMethodLinear:return ru;case this.InterpolantFactoryMethodSmooth:return Gc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Ib(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Gc,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*i,d=u-i,p=u+i;for(let g=0;g!==i;++g){let x=e[u+g];if(x!==e[d+g]||x!==e[p+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*i,d=o*i;for(let p=0;p!==i;++p)e[d+p]=e[u+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Wn.prototype.TimeBufferType=Float32Array;Wn.prototype.ValueBufferType=Float32Array;Wn.prototype.DefaultInterpolation=ru;var Cs=class extends Wn{constructor(t,e,i){super(t,e,i)}};Cs.prototype.ValueTypeName="bool";Cs.prototype.ValueBufferType=Array;Cs.prototype.DefaultInterpolation=ml;Cs.prototype.InterpolantFactoryMethodLinear=void 0;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;var wu=class extends Wn{};wu.prototype.ValueTypeName="color";var Eu=class extends Wn{};Eu.prototype.ValueTypeName="number";var Au=class extends Ur{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)ns.slerpFlat(r,0,o,c-a,o,c,l);return r}},Fl=class extends Wn{InterpolantFactoryMethodLinear(t){return new Au(this.times,this.values,this.getValueSize(),t)}};Fl.prototype.ValueTypeName="quaternion";Fl.prototype.InterpolantFactoryMethodSmooth=void 0;var Rs=class extends Wn{constructor(t,e,i){super(t,e,i)}};Rs.prototype.ValueTypeName="string";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=ml;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;var Cu=class extends Wn{};Cu.prototype.ValueTypeName="vector";var Ru=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},Db=new Ru,Pu=class{constructor(t){this.manager=t!==void 0?t:Db,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Pu.DEFAULT_MATERIAL_NAME="__DEFAULT";var bo=class extends ln{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new he(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var _h=new De,Rm=new V,Pm=new V,Ol=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ge(512,512),this.map=null,this.mapPass=null,this.matrix=new De,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new So,this._frameExtents=new ge(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;Rm.setFromMatrixPosition(t.matrixWorld),e.position.copy(Rm),Pm.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Pm),e.updateMatrixWorld(),_h.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_h),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(_h)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Im=new De,po=new V,yh=new V,Iu=class extends Ol{constructor(){super(new je(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ge(4,2),this._viewportCount=6,this._viewports=[new be(2,1,1,1),new be(0,1,1,1),new be(3,1,1,1),new be(1,1,1,1),new be(3,0,1,1),new be(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(t,e=0){let i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),po.setFromMatrixPosition(t.matrixWorld),i.position.copy(po),yh.copy(i.position),yh.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(yh),i.updateMatrixWorld(),s.makeTranslation(-po.x,-po.y,-po.z),Im.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Im)}},Bl=class extends bo{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Iu}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Du=class extends Ol{constructor(){super(new Cl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},zl=class extends bo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ln.DEFAULT_UP),this.updateMatrix(),this.target=new ln,this.shadow=new Du}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Vl=class extends bo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var kl=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Dm(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Dm();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Dm(){return performance.now()}var Hu="\\[\\]\\.:\\/",Lb=new RegExp("["+Hu+"]","g"),Gu="[^"+Hu+"]",Ub="[^"+Hu.replace("\\.","")+"]",Nb=/((?:WC+[\/:])*)/.source.replace("WC",Gu),Fb=/(WCOD+)?/.source.replace("WCOD",Ub),Ob=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Gu),Bb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Gu),zb=new RegExp("^"+Nb+Fb+Ob+Bb+"$"),Vb=["material","materials","bones","map"],Lu=class{constructor(t,e,i){let s=i||Pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Pe=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Lb,"")}static parseTrackName(t){let e=zb.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Vb.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Pe.Composite=Lu;Pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Pe.prototype.GetterByBindingType=[Pe.prototype._getValue_direct,Pe.prototype._getValue_array,Pe.prototype._getValue_arrayElement,Pe.prototype._getValue_toArray];Pe.prototype.SetterByBindingTypeAndVersioning=[[Pe.prototype._setValue_direct,Pe.prototype._setValue_direct_setNeedsUpdate,Pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_array,Pe.prototype._setValue_array_setNeedsUpdate,Pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_arrayElement,Pe.prototype._setValue_arrayElement_setNeedsUpdate,Pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_fromArray,Pe.prototype._setValue_fromArray_setNeedsUpdate,Pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var gL=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var wo=new V;function Cn(n,t,e,i,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;wo.copy(t),wo[i]=0,wo.normalize();let c=.5*o/(o+a),h=1-wo.angleTo(n)/l;return Math.sign(wo[e])===1?h*c:a/(o+a)+c+c*(1-h)}var Ii=class extends ri{constructor(t=1,e=1,i=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,i/2,r),super(1,1,1,s,s,s),s===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let a=new V,l=new V,c=new V(t,e,i).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=h.length/6,g=new V,x=.5/s;for(let m=0,f=0;m<h.length;m+=3,f+=2)switch(a.fromArray(h,m),l.copy(a),l.x-=Math.sign(l.x)*x,l.y-=Math.sign(l.y)*x,l.z-=Math.sign(l.z)*x,l.normalize(),h[m+0]=c.x*Math.sign(a.x)+l.x*r,h[m+1]=c.y*Math.sign(a.y)+l.y*r,h[m+2]=c.z*Math.sign(a.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/p)){case 0:g.set(1,0,0),d[f+0]=Cn(g,l,"z","y",r,i),d[f+1]=1-Cn(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),d[f+0]=1-Cn(g,l,"z","y",r,i),d[f+1]=1-Cn(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),d[f+0]=1-Cn(g,l,"x","z",r,t),d[f+1]=Cn(g,l,"z","x",r,i);break;case 3:g.set(0,-1,0),d[f+0]=1-Cn(g,l,"x","z",r,t),d[f+1]=1-Cn(g,l,"z","x",r,i);break;case 4:g.set(0,0,1),d[f+0]=1-Cn(g,l,"x","y",r,t),d[f+1]=1-Cn(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),d[f+0]=Cn(g,l,"x","y",r,t),d[f+1]=1-Cn(g,l,"y","x",r,e);break}}};var Xl=matchMedia("(prefers-reduced-motion: reduce)").matches,vL=new URLSearchParams(location.search).has("debug"),Ps=15026253;function ig(n,t,e,i){let s=new Il({canvas:t,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});s.setPixelRatio(Math.min(devicePixelRatio,2));let r=new Dl,o=new je(36,1,.1,60);o.position.set(3.4,2.6,5),r.add(o),r.add(new Vl(3421242,1.7));let a=new zl(16773604,3.2);a.position.set(4,6,5),r.add(a);let l=new Bl(Ps,80,16);l.position.set(-3.5,1.5,-3),r.add(l);let c=()=>new Dr({color:Ps,transparent:!0,opacity:1}),h=()=>new ai({color:1776417,metalness:.45,roughness:.42,transparent:!0,opacity:1}),u=new ii;r.add(u);let d=[],p=new ii;u.add(p);function g(L,z,tt){let J=new ii;return L(J),J.position.y=z,J.userData={baseY:z,mats:[],edges:[],anchor:new V(tt[0],0,tt[2]),op:1},J.traverse(ut=>{ut.isMesh&&ut.material.transparent!==void 0&&(ut.material=ut.material.clone(),J.userData.mats.push(ut.material)),ut.isLineSegments&&(ut.material=ut.material.clone(),J.userData.edges.push(ut.material))}),p.add(J),d.push(J),J}g(L=>{let z=new Ie(new Ii(1.15,.34,1.15,3,.05),h());L.add(z),L.add(new Ri(new Pi(z.geometry,22),c()));let tt=new Ie(new Lr(.17,.17,.07,24),new ai({color:Ps,emissive:Ps,emissiveIntensity:1.5,transparent:!0}));tt.position.y=.21,L.add(tt),L.userData.seal=tt.material},1.62,[.6,0,.6]),g(L=>{let z=new Ie(new Ii(2.25,.18,1.65,3,.04),h());L.add(z),L.add(new Ri(new Pi(z.geometry,22),c()));let tt=new ai({color:6974066,metalness:.85,roughness:.3,transparent:!0});for(let J=0;J<10;J++){let ut=new Ie(new Lr(.045,.045,.09,10),tt);ut.position.set(-.9+J%5*.45,.13,J<5?-.45:.45),L.add(ut)}},1.32,[1.2,0,.9]),g(L=>{let z=new Ie(new Ii(2,.34,1.3,3,.05),h());L.add(z),L.add(new Ri(new Pi(z.geometry,22),c()));let tt=new Ii(.24,.24,.24,2,.04);for(let J=0;J<5;J++){let ut=new Ie(tt,h());ut.position.set(-.72+J*.36,.28,0),L.add(ut);let mt=new Ri(new Pi(tt),c());if(ut.add(mt),J>0){let xt=new Mo(new yn().setFromPoints([new V(-.72+(J-1)*.36,.28,0),new V(-.72+J*.36,.28,0)]),new Dr({color:Ps,transparent:!0,opacity:.45}));L.add(xt)}}},.98,[1.05,0,.7]),g(L=>{let z=new Ie(new Ii(1.5,.26,1.1,3,.04),h());L.add(z),L.add(new Ri(new Pi(z.geometry,22),c()));let tt=new ai({color:10124095,metalness:.9,roughness:.35,transparent:!0});for(let ut=0;ut<12;ut++){let mt=new Ie(new ri(.14,.05,.16),tt);mt.position.set(-.62+ut%6*.25,.15,ut<6?-.4:.4),L.add(mt)}let J=new Ie(new ri(.4,.09,.4),new ai({color:657932,metalness:.6,roughness:.2,transparent:!0}));J.position.y=.17,L.add(J)},.62,[.8,0,.6]),g(L=>{let z=new Ie(new Ii(2.5,.55,1.9,3,.06),h());L.add(z),L.add(new Ri(new Pi(z.geometry,22),c()));let tt=new Ie(new Lr(.55,.55,.06,36),new ai({color:5658208,metalness:.85,roughness:.25,transparent:!0}));tt.position.set(-.6,.3,0),L.add(tt);let J=new Ie(new Nl(.55,.015,8,48),new ai({color:Ps,emissive:Ps,emissiveIntensity:.9,transparent:!0}));J.rotation.x=Math.PI/2,J.position.set(.6,.3,0),L.add(J),L.userData.ring=J},0,[1.3,0,1]),u.position.y=-.9;let x=[3.1,1.9,1.05,.45,0];function m(){let L=t.clientWidth,z=t.clientHeight;s.setSize(L,z,!1),o.aspect=L/z;let tt=i.getBoundingClientRect(),J=t.getBoundingClientRect(),ut=matchMedia("(max-width: 900px)").matches;f=ut?0:Math.max(0,tt.right-J.left+24);let mt=document.querySelector("header, nav"),xt=parseFloat(getComputedStyle(t.parentElement).top)||0,Pt=Math.max(0,(mt?mt.getBoundingClientRect().height:64)-xt)+12;w=ut?Math.max(0,J.bottom-tt.top+12):0,o.setViewOffset(L,z,-f/2,(w-Pt)/2,L,z),T=Math.max(.3,(L-f)/Math.max(1,z-w-Pt)),y=Math.max(.3,(z-w-Pt)/z)}let f=0,w=0,T=1,y=1;m(),new ResizeObserver(m).observe(t);let P=new V(3.4,2.5,5).normalize(),C=new V,A=0;function R(L,z){let tt=d[0].position.y+.25,J=-.3,ut=u.position.y+(tt+J)/2,mt=(tt-J)/2,xt=1.6+.3*L,Pt=Math.hypot(mt,xt)*1.06,kt=$m.degToRad(o.fov/2),Yt=Math.min(Math.atan(Math.tan(kt)*y),Math.atan(Math.tan(kt)*y*T)),F=Pt/Math.sin(Yt);A=A?A+(F-A)*Math.min(z*5,1):F,C.set(0,ut,0),o.position.copy(P).multiplyScalar(A).add(C),o.lookAt(C)}let M=[...i.querySelectorAll(".chip")],v=[...n.querySelectorAll(".step")],I=-1;function W(L){L!==I&&(I=L,v.forEach(z=>z.classList.toggle("active",+z.dataset.layer===L)),M.forEach(z=>z.classList.toggle("active",+z.dataset.layer===L)))}if(Xl)W(1);else{let L=new IntersectionObserver(z=>{for(let tt of z)tt.isIntersecting&&W(+tt.target.dataset.layer)},{rootMargin:matchMedia("(max-width: 900px)").matches?"-70% 0px -22% 0px":"-42% 0px -42% 0px"});v.forEach(z=>L.observe(z))}let q=document.createElementNS("http://www.w3.org/2000/svg","line");e.appendChild(q);let it=matchMedia("(max-width: 900px)").matches,O=new V;function Q(){if(it||I<0){q.setAttribute("opacity","0");return}let L=i.querySelector(".chip.active");if(!L)return;let z=L.getBoundingClientRect(),tt=t.getBoundingClientRect(),J=z.right-tt.left,ut=z.top+z.height/2-tt.top,mt=d[I].userData.anchor,xt=null,Pt=1/0;for(let[F,ce]of[[1,1],[1,-1],[-1,1],[-1,-1]]){let Rt=O.set(mt.x*F,0,mt.z*ce);d[I].localToWorld(Rt),Rt.project(o),Rt.x<Pt&&(Pt=Rt.x,xt=(xt||new V).copy(Rt))}let kt=(xt.x*.5+.5)*tt.width,Yt=(-xt.y*.5+.5)*tt.height;if(xt.z>1||kt<J||kt>tt.width||Yt<0||Yt>tt.height){q.setAttribute("opacity","0");return}q.setAttribute("x1",J),q.setAttribute("y1",ut),q.setAttribute("x2",kt),q.setAttribute("y2",Yt),q.setAttribute("opacity","0.55")}let U=L=>L*L*(3-2*L),N=0,K=0,$=!0;new IntersectionObserver(([L])=>{$=L.isIntersecting},{threshold:.02}).observe(t);let rt=new kl;function _t(){let L=Math.min(rt.getDelta(),.05),z=rt.elapsedTime,tt=n.getBoundingClientRect(),J=innerHeight,ut=tt.height-J;K=ut>0?Math.min(1,Math.max(0,-tt.top/ut)):0,N+=(K-N)*Math.min(L*6,1);let mt=Xl?.35:U(N);for(let xt=0;xt<d.length;xt++){let Pt=d[xt],kt=x[xt];Pt.position.y=Pt.userData.baseY+kt*mt,Pt.position.x=(xt%2===0?-1:1)*mt*.28;let Yt=I<0||I===xt?1:.22;Pt.userData.op+=(Yt-Pt.userData.op)*Math.min(L*8,1);let F=Pt.userData.op;for(let ce of Pt.userData.mats)ce.opacity=F;for(let ce of Pt.userData.edges)ce.opacity=.8*F;Pt.userData.seal&&(Pt.userData.seal.emissiveIntensity=(1.2+Math.sin(z*2.5)*.5)*F),Pt.userData.ring&&(Pt.userData.ring.material.emissiveIntensity=(.7+Math.sin(z*1.8)*.3)*F)}p.rotation.y=(Xl?.5:z*.12)+mt*1.2,R(mt,L),s.render(r,o),Q()}return Xl?_t():s.setAnimationLoop(()=>{$&&!document.hidden&&_t()}),{dispose(){s.setAnimationLoop(null)}}}var ci=typeof window<"u",Wu=ci?window:null,Wr=ci?document:null,Le={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},le={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},Pn={NONE:0,AUTO:1,FORCE:2},hn={replace:0,none:1,blend:2},sg=Symbol(),ed=Symbol(),xg=Symbol(),sc=Symbol();var Hb=Symbol(),Te=1e-11,_g=1e12,Ls=1e3,$u=120,as="",Io=new Map;Io.set("x","translateX");Io.set("y","translateY");Io.set("z","translateZ");var nd=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],yg=nd.reduce((n,t)=>({...n,[t]:t+"("}),{}),gn=()=>{},Gb=/(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,Wb=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,Xb=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,Yb=/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,qb=/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,rg=/[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,vg=/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,$b=/([a-z])([A-Z])/g,Zb=/(\w+)(\([^)]+\)+)/g,Kb=/(\*=|\+=|-=)/,Sg={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:$u,loop:0,reversed:!1,alternate:!1,autoplay:!0,duration:Ls,delay:0,loopDelay:0,ease:"out(2)",composition:hn.replace,modifier:n=>n,onBegin:gn,onBeforeUpdate:gn,onUpdate:gn,onLoop:gn,onPause:gn,onComplete:gn,onRender:gn},Fe={defaults:Sg,root:Wr,scope:null,precision:4,timeScale:1,tickThreshold:200},Mg={version:"4.0.2",engine:null};ci&&(Wu.AnimeJS||(Wu.AnimeJS=[]),Wu.AnimeJS.push(Mg));var Jb=n=>n.replace($b,"$1-$2").toLowerCase(),Ds=(n,t)=>n.indexOf(t)===0,Co=Date.now,Us=Array.isArray,Xu=n=>n&&n.constructor===Object,id=n=>typeof n=="number"&&!isNaN(n),rc=n=>typeof n=="string",jl=n=>typeof n=="function",oe=n=>typeof n>"u",Zl=n=>oe(n)||n===null,bg=n=>ci&&n instanceof SVGElement,Tg=n=>Gb.test(n),wg=n=>Ds(n,"rgb"),Eg=n=>Ds(n,"hsl"),Qb=n=>Tg(n)||wg(n)||Eg(n),Kl=n=>!Fe.defaults.hasOwnProperty(n),Is=n=>rc(n)?parseFloat(n):n,zr=Math.pow,Ag=Math.sqrt,jb=Math.sin,t1=Math.cos,Ro=Math.abs;var e1=Math.ceil,Po=Math.floor,n1=Math.asin,i1=Math.max;var Do=Math.PI,Zu=Math.round,qe=(n,t,e)=>n<t?t:n>e?e:n,og={},Ue=(n,t)=>{if(t<0)return n;if(!t)return Zu(n);let e=og[t];return e||(e=og[t]=10**t),Zu(n*e)/e},s1=(n,t)=>Us(t)?t.reduce((e,i)=>Ro(i-n)<Ro(e-n)?i:e):t?Zu(n/t)*t:n,os=(n,t,e)=>n+(t-n)*e,sd=n=>n===1/0?_g:n===-1/0?-1e12:n,Ao=n=>n<=Te?Te:sd(Ue(n,11)),cn=n=>Us(n)?[...n]:n,r1=(n,t)=>{let e={...n};for(let i in t){let s=n[i];e[i]=oe(s)?t[i]:s}return e},Be=(n,t,e,i="_prev",s="_next")=>{let r=n._head,o=s;for(e&&(r=n._tail,o=i);r;){let a=r[o];t(r),r=a}},ls=(n,t,e="_prev",i="_next")=>{let s=t[e],r=t[i];s?s[i]=r:n._head=r,r?r[e]=s:n._tail=s,t[e]=null,t[i]=null},Hr=(n,t,e,i="_prev",s="_next")=>{let r=n._tail;for(;r&&e&&e(r,t);)r=r[i];let o=r?r[s]:n._head;r?r[s]=t:n._head=t,o?o[i]=t:n._tail=t,t[i]=r,t[s]=o},tc=class{constructor(t=0){this.deltaTime=0,this._currentTime=t,this._elapsedTime=t,this._startTime=t,this._lastTime=t,this._scheduledTime=0,this._frameDuration=Ue(Ls/$u,0),this._fps=$u,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(t){let e=this._frameDuration,i=+t,s=i<Te?Te:i,r=Ue(Ls/s,0);this._fps=s,this._frameDuration=r,this._scheduledTime+=r-e}get speed(){return this._speed}set speed(t){let e=+t;this._speed=e<Te?Te:e}requestTick(t){let e=this._scheduledTime,i=this._elapsedTime;if(this._elapsedTime+=t-i,i<e)return Pn.NONE;let s=this._frameDuration,r=i-e;return this._scheduledTime+=r<s?s:r,Pn.AUTO}computeDeltaTime(t){let e=t-this._lastTime;return this.deltaTime=e,this._lastTime=t,e}},Jl=(n,t,e,i,s)=>{let r=n.parent,o=n.duration,a=n.completed,l=n.iterationDuration,c=n.iterationCount,h=n._currentIteration,u=n._loopDelay,d=n._reversed,p=n._alternate,g=n._hasChildren,x=n._delay,m=n._currentTime,f=x+l,w=t-x,T=qe(m,-x,o),y=qe(w,-x,o),P=w-m,C=y>0,A=y>=o,R=o<=Te,M=s===Pn.FORCE,v=0,I=w,W=0;if(c>1){let Q=~~(y/(l+(A?0:u)));n._currentIteration=qe(Q,0,c),A&&n._currentIteration--,v=n._currentIteration%2,I=y%(l+u)||0}let Y=d^(p&&v),q=n._ease,it=A?Y?0:o:Y?l-I:I;q&&(it=l*q(it/l)||0);let O=(r?r.backwards:w<m)?!Y:!!Y;if(n._currentTime=w,n._iterationTime=it,n.backwards=O,C&&!n.began?(n.began=!0,!e&&!(r&&(O||!r.began))&&n.onBegin(n)):w<=0&&(n.began=!1),!e&&!g&&C&&n._currentIteration!==h&&n.onLoop(n),M||s===Pn.AUTO&&(t>=x&&t<=f||t<=x&&T>x||t>=f&&T!==o)||it>=f&&T!==o||it<=x&&T>0||t<=T&&T===o&&a||A&&!a&&R){if(C&&(n.computeDeltaTime(T),e||n.onBeforeUpdate(n)),!g){let Q=M||(O?P*-1:P)>=Fe.tickThreshold,U=n._offset+(r?r._offset:0)+x+it,N=n._head,K,$,rt,_t,L=0;for(;N;){let z=N._composition,tt=N._currentTime,J=N._changeDuration,ut=N._absoluteStartTime+N._changeDuration,mt=N._nextRep,xt=N._prevRep,Pt=z!==hn.none;if((Q||(tt!==J||U<=ut+(mt?mt._delay:0))&&(tt!==0||U>=N._absoluteStartTime))&&(!Pt||!N._isOverridden&&(!N._isOverlapped||U<=ut)&&(!mt||mt._isOverridden||U<=mt._absoluteStartTime)&&(!xt||xt._isOverridden||U>=xt._absoluteStartTime+xt._changeDuration+N._delay))){let kt=N._currentTime=qe(it-N._startTime,0,J),Yt=N._ease(kt/N._updateDuration),F=N._modifier,ce=N._valueType,Rt=N._tweenType,qt=Rt===Le.OBJECT,Nt=ce===le.NUMBER,te=Nt&&qt||Yt===0||Yt===1?-1:Fe.precision,It,E;if(Nt)It=E=F(Ue(os(N._fromNumber,N._toNumber,Yt),te));else if(ce===le.UNIT)E=F(Ue(os(N._fromNumber,N._toNumber,Yt),te)),It=`${E}${N._unit}`;else if(ce===le.COLOR){let _=N._fromNumbers,X=N._toNumbers,at=Ue(qe(F(os(_[0],X[0],Yt)),0,255),0),ct=Ue(qe(F(os(_[1],X[1],Yt)),0,255),0),lt=Ue(qe(F(os(_[2],X[2],Yt)),0,255),0),Ut=qe(F(Ue(os(_[3],X[3],Yt),te)),0,1);if(It=`rgba(${at},${ct},${lt},${Ut})`,Pt){let vt=N._numbers;vt[0]=at,vt[1]=ct,vt[2]=lt,vt[3]=Ut}}else if(ce===le.COMPLEX){It=N._strings[0];for(let _=0,X=N._toNumbers.length;_<X;_++){let at=F(Ue(os(N._fromNumbers[_],N._toNumbers[_],Yt),te)),ct=N._strings[_+1];It+=`${ct?at+ct:at}`,Pt&&(N._numbers[_]=at)}}if(Pt&&(N._number=E),!i&&z!==hn.blend){let _=N.property;K=N.target,qt?K[_]=It:Rt===Le.ATTRIBUTE?K.setAttribute(_,It):($=K.style,Rt===Le.TRANSFORM?(K!==rt&&(rt=K,_t=K[sc]),_t[_]=It,L=1):Rt===Le.CSS?$[_]=It:Rt===Le.CSS_VAR&&$.setProperty(_,It)),C&&(W=1)}else N._value=It}if(L&&N._renderTransforms){let kt=as;for(let Yt in _t)kt+=`${yg[Yt]}${_t[Yt]}) `;$.transform=kt,L=0}N=N._next}!e&&W&&n.onRender(n)}!e&&C&&n.onUpdate(n)}return r&&R?!e&&(r.began&&!O&&w>=o&&!a||O&&w<=Te&&a)&&(n.onComplete(n),n.completed=!O):C&&A?c===1/0?n._startTime+=n.duration:n._currentIteration>=c-1&&(n.paused=!0,!a&&!g&&(n.completed=!0,!e&&!(r&&(O||!r.began))&&(n.onComplete(n),n._resolve(n)))):n.completed=!1,W},Vr=(n,t,e,i,s)=>{let r=n._currentIteration;if(Jl(n,t,e,i,s),n._hasChildren){let o=n,a=o.backwards,l=i?t:o._iterationTime,c=Co(),h=0,u=!0;if(!i&&o._currentIteration!==r){let d=o.iterationDuration;Be(o,p=>{if(!a)!p.completed&&!p.backwards&&p._currentTime<p.iterationDuration&&Jl(p,d,e,1,Pn.FORCE),p.began=!1,p.completed=!1;else{let g=p.duration,x=p._offset+p._delay,m=x+g;!e&&g<=Te&&(!x||m===d)&&p.onComplete(p)}}),e||o.onLoop(o)}Be(o,d=>{let p=Ue((l-d._offset)*d._speed,12),g=d._fps<o._fps?d.requestTick(c):s;h+=Jl(d,p,e,i,g),!d.completed&&u&&(u=!1)},a),!e&&h&&o.onRender(o),u&&o._currentTime>=o.duration&&(o.paused=!0,o.completed||(o.completed=!0,e||(o.onComplete(o),o._resolve(o))))}},Gr={animation:null,update:gn},o1=n=>{let t=Gr.animation;return t||(t={duration:Te,computeDeltaTime:gn,_offset:0,_delay:0,_head:null,_tail:null},Gr.animation=t,Gr.update=()=>{n.forEach(e=>{for(let i in e){let s=e[i],r=s._head;if(r){let o=r._valueType,a=o===le.COMPLEX||o===le.COLOR?cn(r._fromNumbers):null,l=r._fromNumber,c=s._tail;for(;c&&c!==r;){if(a)for(let h=0,u=c._numbers.length;h<u;h++)a[h]+=c._numbers[h];else l+=c._number;c=c._prevAdd}r._toNumber=l,r._toNumbers=a}}}),Jl(t,1,1,0,Pn.FORCE)}),t},Cg=ci?requestAnimationFrame:setImmediate,a1=ci?cancelAnimationFrame:clearImmediate,Ku=class extends tc{constructor(t){super(t),this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=Sg,this.paused=!!(ci&&Wr.hidden),this.reqId=null}update(){let t=this._currentTime=Co();if(this.requestTick(t)){this.computeDeltaTime(t);let e=this._speed,i=this._fps,s=this._head;for(;s;){let r=s._next;s.paused?(ls(this,s),this._hasChildren=!!this._tail,s._running=!1,s.completed&&!s._cancelled&&s.cancel()):Vr(s,(t-s._startTime)*s._speed*e,0,0,s._fps<i?s.requestTick(t):Pn.AUTO),s=r}Gr.update()}}wake(){return this.useDefaultMainLoop&&!this.reqId&&!this.paused&&(this.reqId=Cg(Rg)),this}pause(){return this.paused=!0,l1()}resume(){if(this.paused)return this.paused=!1,Be(this,t=>t.resetTime()),this.wake()}get speed(){return this._speed*(Fe.timeScale===1?1:Ls)}set speed(t){this._speed=t*Fe.timeScale,Be(this,e=>e.speed=e._speed)}get timeUnit(){return Fe.timeScale===1?"ms":"s"}set timeUnit(t){let i=t==="s",s=i?.001:1;if(Fe.timeScale!==s){Fe.timeScale=s,Fe.tickThreshold=200*s;let r=i?.001:Ls;this.defaults.duration*=r,this._speed*=r}}get precision(){return Fe.precision}set precision(t){Fe.precision=t}},Ge=(()=>{let n=new Ku(Co());return ci&&(Mg.engine=n,Wr.addEventListener("visibilitychange",()=>{n.pauseOnDocumentHidden&&(Wr.hidden?n.pause():n.resume())})),n})(),Rg=()=>{Ge._head?(Ge.reqId=Cg(Rg),Ge.update()):Ge.reqId=0},l1=()=>(a1(Ge.reqId),Ge.reqId=0,Ge),c1=(n,t,e)=>{let i=n.style.transform,s;if(i){let r=n[sc],o;for(;o=Zb.exec(i);){let a=o[1],l=o[2].slice(1,-1);r[a]=l,a===t&&(s=l,e&&(e[t]=l))}}return i&&!oe(s)?s:Ds(t,"scale")?"1":Ds(t,"rotate")||Ds(t,"skew")?"0deg":"0px"};function ag(n){let t=rc(n)?Fe.root.querySelectorAll(n):n;if(t instanceof NodeList||t instanceof HTMLCollection)return t}function Pg(n){if(Zl(n))return[];if(Us(n)){let e=n.flat(1/0),i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];if(!Zl(o)){let a=ag(o);if(a)for(let l=0,c=a.length;l<c;l++){let h=a[l];if(!Zl(h)){let u=!1;for(let d=0,p=i.length;d<p;d++)if(i[d]===h){u=!0;break}u||i.push(h)}}else{let l=!1;for(let c=0,h=i.length;c<h;c++)if(i[c]===o){l=!0;break}l||i.push(o)}}}return i}if(!ci)return[n];let t=ag(n);return t?Array.from(t):[n]}function rd(n){let t=Pg(n),e=t.length;if(e)for(let i=0;i<e;i++){let s=t[i];if(!s[sg]){s[sg]=!0;let r=bg(s);(s.nodeType||r)&&(s[ed]=!0,s[xg]=r,s[sc]={})}}return t}var h1=["opacity","rotate","overflow","color"],u1=(n,t)=>{if(h1.includes(t))return!1;if(n.getAttribute(t)||t in n){if(t==="scale"){let e=n.parentNode;return e&&e.tagName==="filter"}return!0}};var d1=n=>{let t=Wb.exec(n)||Xb.exec(n),e=oe(t[4])?1:+t[4];return[+t[1],+t[2],+t[3],e]},f1=n=>{let t=n.length,e=t===4||t===5;return[+("0x"+n[1]+n[e?1:2]),+("0x"+n[e?2:3]+n[e?2:4]),+("0x"+n[e?3:5]+n[e?3:6]),t===5||t===9?+(+("0x"+n[e?4:7]+n[e?4:8])/255).toFixed(3):1]},Yu=(n,t,e)=>(e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*(2/3-e)*6:n),p1=n=>{let t=Yb.exec(n)||qb.exec(n),e=+t[1]/360,i=+t[2]/100,s=+t[3]/100,r=oe(t[4])?1:+t[4],o,a,l;if(i===0)o=a=l=s;else{let c=s<.5?s*(1+i):s+i-s*i,h=2*s-c;o=Ue(Yu(h,c,e+1/3)*255,0),a=Ue(Yu(h,c,e)*255,0),l=Ue(Yu(h,c,e-1/3)*255,0)}return[o,a,l,r]},m1=n=>wg(n)?d1(n):Tg(n)?f1(n):Eg(n)?p1(n):[0,0,0,1],tn=(n,t)=>oe(n)?t:n,ss=(n,t,e,i,s)=>{if(jl(n)){let r=()=>{let o=n(t,e,i);return isNaN(+o)?o||0:+o};return s&&(s.func=r),r()}else return n},od=(n,t)=>n[ed]?n[xg]&&u1(n,t)?Le.ATTRIBUTE:nd.includes(t)||Io.get(t)?Le.TRANSFORM:Ds(t,"--")?Le.CSS_VAR:t in n.style?Le.CSS:t in n?Le.OBJECT:Le.ATTRIBUTE:Le.OBJECT,lg=(n,t,e)=>{let i=n.style[t];i&&e&&(e[t]=i);let s=i||getComputedStyle(n[Hb]||n).getPropertyValue(t);return s==="auto"?"0":s},kr=(n,t,e,i)=>{let s=oe(e)?od(n,t):e;return s===Le.OBJECT?n[t]||0:s===Le.ATTRIBUTE?n.getAttribute(t):s===Le.TRANSFORM?c1(n,t,i):s===Le.CSS_VAR?lg(n,t,i).trimStart():lg(n,t,i)},Ju=(n,t,e)=>e==="-"?n-t:e==="+"?n+t:n*t,ad=()=>({t:le.NUMBER,n:0,u:null,o:null,d:null,s:null}),Yn=(n,t)=>{if(t.t=le.NUMBER,t.n=0,t.u=null,t.o=null,t.d=null,t.s=null,!n)return t;let e=+n;if(isNaN(e)){let i=n;i[1]==="="&&(t.o=i[0],i=i.slice(2));let s=i.includes(" ")?!1:vg.exec(i);if(s)return t.t=le.UNIT,t.n=+s[1],t.u=s[2],t;if(t.o)return t.n=+i,t;if(Qb(i))return t.t=le.COLOR,t.d=m1(i),t;{let r=i.match(rg);return t.t=le.COMPLEX,t.d=r?r.map(Number):[],t.s=i.split(rg)||[],t}}else return t.n=e,t},cg=(n,t)=>(t.t=n._valueType,t.n=n._toNumber,t.u=n._unit,t.o=null,t.d=cn(n._toNumbers),t.s=cn(n._strings),t),Rn=ad(),ec={_rep:new WeakMap,_add:new Map},ld=(n,t,e="_rep")=>{let i=ec[e],s=i.get(n);return s||(s={},i.set(n,s)),s[t]?s[t]:s[t]={_head:null,_tail:null}},g1=(n,t)=>n._isOverridden||n._absoluteStartTime>t._absoluteStartTime,Ql=n=>{n._isOverlapped=1,n._isOverridden=1,n._changeDuration=Te,n._currentTime=Te},Ig=(n,t)=>{let e=n._composition;if(e===hn.replace){let i=n._absoluteStartTime;Hr(t,n,g1,"_prevRep","_nextRep");let s=n._prevRep;if(s){let r=s.parent,o=s._absoluteStartTime+s._changeDuration;if(n.parent.id!==r.id&&r.iterationCount>1&&o+(r.duration-r.iterationDuration)>i){Ql(s);let c=s._prevRep;for(;c&&c.parent.id===r.id;)Ql(c),c=c._prevRep}let a=i-n._delay;if(o>a){let c=s._startTime,h=o-(c+s._updateDuration);s._changeDuration=a-h-c,s._currentTime=s._changeDuration,s._isOverlapped=1,s._changeDuration<Te&&Ql(s)}let l=!0;if(Be(r,c=>{c._isOverlapped||(l=!1)}),l){let c=r.parent;if(c){let h=!0;Be(c,u=>{u!==r&&Be(u,d=>{d._isOverlapped||(h=!1)})}),h&&c.cancel()}else r.cancel()}}}else if(e===hn.blend){let i=ld(n.target,n.property,"_add"),s=o1(ec._add),r=i._head;r||(r={...n},r._composition=hn.replace,r._updateDuration=Te,r._startTime=0,r._numbers=cn(n._fromNumbers),r._number=0,r._next=null,r._prev=null,Hr(i,r),Hr(s,r));let o=n._toNumber;if(n._fromNumber=r._fromNumber-o,n._toNumber=0,n._numbers=cn(n._fromNumbers),n._number=0,r._fromNumber=o,n._toNumbers){let a=cn(n._toNumbers);a&&a.forEach((l,c)=>{n._fromNumbers[c]=r._fromNumbers[c]-l,n._toNumbers[c]=0}),r._fromNumbers=a}Hr(i,n,null,"_prevAdd","_nextAdd")}return n},Dg=n=>{let t=n._composition;if(t!==hn.none){let e=n.target,i=n.property,o=ec._rep.get(e)[i];if(ls(o,n,"_prevRep","_nextRep"),t===hn.blend){let a=ec._add,l=a.get(e);if(!l)return;let c=l[i],h=Gr.animation;ls(c,n,"_prevAdd","_nextAdd");let u=c._head;if(u&&u===c._tail){ls(c,u,"_prevAdd","_nextAdd"),ls(h,u);let d=!0;for(let p in l)if(l[p]._head){d=!1;break}d&&a.delete(e)}}}return n},hg=n=>(n.paused=!0,n.began=!1,n.completed=!1,n),Qu=n=>(n._cancelled&&(n._hasChildren?Be(n,Qu):Be(n,t=>{t._composition!==hn.none&&Ig(t,ld(t.target,t.property))}),n._cancelled=0),n),x1=0,nc=class extends tc{constructor(t={},e=null,i=0){super(0);let{id:s,delay:r,duration:o,reversed:a,alternate:l,loop:c,loopDelay:h,autoplay:u,frameRate:d,playbackRate:p,onComplete:g,onLoop:x,onPause:m,onBegin:f,onBeforeUpdate:w,onUpdate:T}=t;Fe.scope&&Fe.scope.revertibles.push(this);let y=e?0:Ge._elapsedTime,P=e?e.defaults:Fe.defaults,C=jl(r)||oe(r)?P.delay:+r,A=jl(o)||oe(o)?1/0:+o,R=tn(c,P.loop),M=tn(h,P.loopDelay),v=R===!0||R===1/0||R<0?1/0:R+1,I=0;if(e)I=i;else{let W=Co();Ge.paused&&(Ge.requestTick(W),W=Ge._elapsedTime),I=W-Ge._startTime}this.id=oe(s)?++x1:s,this.parent=e,this.duration=sd((A+M)*v-M)||Te,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=f||P.onBegin,this.onBeforeUpdate=w||P.onBeforeUpdate,this.onUpdate=T||P.onUpdate,this.onLoop=x||P.onLoop,this.onPause=m||P.onPause,this.onComplete=g||P.onComplete,this.iterationDuration=A,this.iterationCount=v,this._autoplay=e?!1:tn(u,P.autoplay),this._offset=I,this._delay=C,this._loopDelay=M,this._iterationTime=0,this._currentIteration=0,this._resolve=gn,this._running=!1,this._reversed=+tn(a,P.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=tn(l,P.alternate),this._prev=null,this._next=null,this._elapsedTime=y,this._startTime=y,this._lastTime=y,this._fps=tn(d,P.frameRate),this._speed=tn(p,P.playbackRate)}get cancelled(){return!!this._cancelled}set cancelled(t){t?this.cancel():this.reset(1).play()}get currentTime(){return qe(Ue(this._currentTime,Fe.precision),-this._delay,this.duration)}set currentTime(t){let e=this.paused;this.pause().seek(+t),e||this.resume()}get iterationCurrentTime(){return Ue(this._iterationTime,Fe.precision)}set iterationCurrentTime(t){this.currentTime=this.iterationDuration*this._currentIteration+t}get progress(){return qe(Ue(this._currentTime/this.duration,5),0,1)}set progress(t){this.currentTime=this.duration*t}get iterationProgress(){return qe(Ue(this._iterationTime/this.iterationDuration,5),0,1)}set iterationProgress(t){let e=this.iterationDuration;this.currentTime=e*this._currentIteration+e*t}get currentIteration(){return this._currentIteration}set currentIteration(t){this.currentTime=this.iterationDuration*qe(+t,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(t){t?this.reverse():this.play()}get speed(){return super.speed}set speed(t){super.speed=t,this.resetTime()}reset(t=0){return Qu(this),this._reversed&&!this._reverse&&(this.reversed=!1),this._iterationTime=this.iterationDuration,Vr(this,0,1,t,Pn.FORCE),hg(this),this._hasChildren&&Be(this,hg),this}init(t=0){this.fps=this._fps,this.speed=this._speed,!t&&this._hasChildren&&Vr(this,this.duration,1,t,Pn.FORCE),this.reset(t);let e=this._autoplay;return e===!0?this.resume():e&&!oe(e.linked)&&e.link(this),this}resetTime(){let t=1/(this._speed*Ge._speed);return this._startTime=Co()-(this._currentTime+this._delay)*t,this}pause(){return this.paused?this:(this.paused=!0,this.onPause(this),this)}resume(){return this.paused?(this.paused=!1,this.duration<=Te&&!this._hasChildren?Vr(this,Te,0,0,Pn.FORCE):(this._running||(Hr(Ge,this),Ge._hasChildren=!0,this._running=!0),this.resetTime(),this._startTime-=12,Ge.wake()),this):this}restart(){return this.reset(0).resume()}seek(t,e=0,i=0){Qu(this),this.completed=!1;let s=this.paused;return this.paused=!0,Vr(this,t+this._delay,~~e,~~i,Pn.AUTO),s?this:this.resume()}alternate(){let t=this._reversed,e=this.iterationCount,i=this.iterationDuration,s=e===1/0?Po(_g/i):e;return this._reversed=+(this._alternate&&!(s%2)?t:!t),e===1/0?this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress:this.seek(i*s-this._currentTime),this.resetTime(),this}play(){return this._reversed&&this.alternate(),this.resume()}reverse(){return this._reversed||this.alternate(),this.resume()}cancel(){return this._hasChildren?Be(this,t=>t.cancel(),!0):Be(this,Dg),this._cancelled=1,this.pause()}stretch(t){let e=this.duration,i=Ao(t);if(e===i)return this;let s=t/e,r=t<=Te;return this.duration=r?Te:i,this.iterationDuration=r?Te:Ao(this.iterationDuration*s),this._offset*=s,this._delay*=s,this._loopDelay*=s,this}revert(){Vr(this,0,1,0,Pn.AUTO);let t=this._autoplay;return t&&t.linked&&t.linked===this&&t.revert(),this.cancel()}complete(){return this.seek(this.duration).cancel()}then(t=gn){let e=this.then,i=()=>{this.then=null,t(this),this.then=e,this._resolve=gn};return new Promise(s=>(this._resolve=()=>s(i()),this.completed&&this._resolve(),this))}};var Xr=n=>n,Lg=(n,t,e)=>(((1-3*e+3*t)*n+(3*e-6*t))*n+3*t)*n,_1=(n,t,e)=>{let i=0,s=1,r,o,a=0;do o=i+(s-i)/2,r=Lg(o,t,e)-n,r>0?s=o:i=o;while(Ro(r)>1e-7&&++a<100);return o},y1=(n=.5,t=0,e=.5,i=1)=>n===t&&e===i?Xr:s=>s===0||s===1?s:Lg(_1(s,n,e),t,i),v1=(n=10,t)=>{let e=t?e1:Po;return i=>e(qe(i,0,1)*n)*(1/n)},Ug=(...n)=>{let t=n.length;if(!t)return Xr;let e=t-1,i=n[0],s=n[e],r=[0],o=[Is(i)];for(let a=1;a<e;a++){let l=n[a],c=rc(l)?l.trim().split(" "):[l],h=c[0],u=c[1];r.push(oe(u)?a/e:Is(u)/100),o.push(Is(h))}return o.push(Is(s)),r.push(1),function(l){for(let c=1,h=r.length;c<h;c++){let u=r[c];if(l<=u){let d=r[c-1],p=o[c-1];return p+(o[c]-p)*(l-d)/(u-d)}}return o[o.length-1]}},S1=(n=10,t=1)=>{let e=[0],i=n-1;for(let s=1;s<i;s++){let r=e[s-1],o=s/i,a=(s+1)/i,l=o+(a-o)*Math.random(),c=o*(1-t)+l*t;e.push(qe(c,r,1))}return e.push(1),Ug(...e)},M1=Do/2,ug=Do*2,Eo=(n=1.68)=>t=>zr(t,+n),dg={[as]:Eo,Quad:Eo(2),Cubic:Eo(3),Quart:Eo(4),Quint:Eo(5),Sine:n=>1-t1(n*M1),Circ:n=>1-Ag(1-n*n),Expo:n=>n?zr(2,10*n-10):0,Bounce:n=>{let t,e=4;for(;n<((t=zr(2,--e))-1)/11;);return 1/zr(4,3-e)-7.5625*zr((t*3-2)/22-n,2)},Back:(n=1.70158)=>t=>(+n+1)*t*t*t-+n*t*t,Elastic:(n=1,t=.3)=>{let e=qe(+n,1,10),i=qe(+t,Te,2),s=i/ug*n1(1/e),r=ug/i;return o=>o===0||o===1?o:-e*zr(2,-10*(1-o))*jb((1-o-s)*r)}},ju={in:n=>t=>n(t),out:n=>t=>1-n(1-t),inOut:n=>t=>t<.5?n(t*2)/2:1-n(t*-2+2)/2,outIn:n=>t=>t<.5?(1-n(1-t*2))/2:(n(t*2-1)+1)/2},b1=(n,t,e)=>{if(e[n])return e[n];if(n.indexOf("(")<=-1){let s=ju[n]||n.includes("Back")||n.includes("Elastic")?t[n]():t[n];return s?e[n]=s:Xr}else{let i=n.slice(0,-1).split("("),s=t[i[0]];return s?e[n]=s(...i[1].split(",")):Xr}},T1=(()=>{let n={linear:Ug,irregular:S1,steps:v1,cubicBezier:y1};for(let t in ju)for(let e in dg){let i=dg[e],s=ju[t];n[t+e]=e===as||e==="Back"||e==="Elastic"?(r,o)=>s(i(r,o)):s(i)}return n})(),w1={linear:Xr},td=n=>jl(n)?n:rc(n)?b1(n,T1,w1):Xr,fg={},cd=(n,t,e)=>{if(e===Le.TRANSFORM){let i=Io.get(n);return i||n}else if(e===Le.CSS||e===Le.ATTRIBUTE&&bg(t)&&n in t.style){let i=fg[n];if(i)return i;{let s=n&&Jb(n);return fg[n]=s,s}}else return n},qu={deg:1,rad:180/Do,turn:360},pg={},Ng=(n,t,e,i=!1)=>{let s=t.u,r=t.n;if(t.t===le.UNIT&&s===e)return t;let o=r+s+e,a=pg[o];if(!oe(a)&&!i)t.n=a;else{let l;if(s in qu)l=r*qu[s]/qu[e];else{let h=n.cloneNode(),u=n.parentNode,d=u&&u!==Wr?u:Wr.body;d.appendChild(h);let p=h.style;p.width=100+s;let g=h.offsetWidth||100;p.width=100+e;let x=h.offsetWidth||100,m=g/x;d.removeChild(h),l=m*r}t.n=l,pg[o]=l}return t.t,le.UNIT,t.u=e,t},hd=n=>{if(n._hasChildren)Be(n,hd,!0);else{let t=n;t.pause(),Be(t,e=>{let i=e.property,s=e.target;if(s[ed]){let r=s.style,o=t._inlineStyles[i];if(e._tweenType===Le.TRANSFORM){let a=s[sc];if(oe(o)||o===as?delete a[i]:a[i]=o,e._renderTransforms)if(!Object.keys(a).length)r.removeProperty("transform");else{let l=as;for(let c in a)l+=yg[c]+a[c]+") ";r.transform=l}}else oe(o)||o===as?r.removeProperty(i):r[i]=o;t._tail===e&&t.targets.forEach(a=>{a.getAttribute&&a.getAttribute("style")===as&&a.removeAttribute("style")})}})}return n},Qt=ad(),se=ad(),Yl={func:null},ql=[null],Br=[null,null],$l={to:null},E1=0,rs,li,A1=(n,t)=>{let e={};if(Us(n)){let i=[].concat(...n.map(s=>Object.keys(s))).filter(Kl);for(let s=0,r=i.length;s<r;s++){let o=i[s],a=n.map(l=>{let c={};for(let h in l){let u=l[h];Kl(h)?h===o&&(c.to=u):c[h]=u}return c});e[o]=a}}else{let i=tn(t.duration,Fe.defaults.duration);Object.keys(n).map(r=>({o:parseFloat(r)/100,p:n[r]})).sort((r,o)=>r.o-o.o).forEach(r=>{let o=r.o,a=r.p;for(let l in a)if(Kl(l)){let c=e[l];c||(c=e[l]=[]);let h=o*i,u=c.length,d=c[u-1],p={to:a[l]},g=0;for(let x=0;x<u;x++)g+=c[x].duration;u===1&&(p.from=d.to),a.ease&&(p.ease=a.ease),p.duration=h-(u?g:0),c.push(p)}return r});for(let r in e){let o=e[r],a;for(let l=0,c=o.length;l<c;l++){let h=o[l],u=h.ease;h.ease=a||void 0,a=u}o[0].duration||o.shift()}}return e},ic=class extends nc{constructor(t,e,i,s,r=!1,o=0,a=0){super(e,i,s);let l=rd(t),c=l.length,h=e.keyframes,u=h?r1(A1(h,e),e):e,{delay:d,duration:p,ease:g,playbackEase:x,modifier:m,composition:f,onRender:w}=u,T=i?i.defaults:Fe.defaults,y=tn(x,T.playbackEase),P=y?td(y):null,C=!oe(g)&&!oe(g.ease),A=C?g.ease:tn(g,P?"linear":T.ease),R=C?g.duration:tn(p,T.duration),M=tn(d,T.delay),v=m||T.modifier,I=oe(f)&&c>=Ls?hn.none:oe(f)?T.composition:f,W={},Y=this._offset+(i?i._offset:0),q=NaN,it=NaN,O=0,Q=0;for(let U=0;U<c;U++){let N=l[U],K=o||U,$=a||c,rt=NaN,_t=NaN;for(let L in u)if(Kl(L)){let z=od(N,L),tt=cd(L,N,z),J=u[L],ut=Us(J);if(r&&!ut&&(Br[0]=J,Br[1]=J,J=Br),ut){let F=J.length,ce=!Xu(J[0]);F===2&&ce?($l.to=J,ql[0]=$l,rs=ql):F>2&&ce?(rs=[],J.forEach((Rt,qt)=>{qt?qt===1?(Br[1]=Rt,rs.push(Br)):rs.push(Rt):Br[0]=Rt})):rs=J}else ql[0]=J,rs=ql;let mt=null,xt=null,Pt=NaN,kt=0,Yt=0;for(let F=rs.length;Yt<F;Yt++){let ce=rs[Yt];Xu(ce)?li=ce:($l.to=ce,li=$l),Yl.func=null;let Rt=ss(li.to,N,K,$,Yl),qt;Xu(Rt)&&!oe(Rt.to)?(li=Rt,qt=Rt.to):qt=Rt;let Nt=ss(li.from,N,K,$),te=li.ease,It=!oe(te)&&!oe(te.ease),E=It?te.ease:te||A,_=It?te.duration:ss(tn(li.duration,F>1?ss(R,N,K,$)/F:R),N,K,$),X=ss(tn(li.delay,Yt?0:M),N,K,$),at=ss(tn(li.composition,I),N,K,$),ct=id(at)?at:hn[at],lt=li.modifier||v,Ut=!oe(Nt),vt=!oe(qt),Tt=Us(qt),ne=Tt||Ut&&vt,ft=xt?kt+X:X,At=Y+ft;!Q&&(Ut||Tt)&&(Q=1);let Dt=xt;if(ct!==hn.none){mt||(mt=ld(N,tt));let Lt=mt._head;for(;Lt&&!Lt._isOverridden&&Lt._absoluteStartTime<=At;)if(Dt=Lt,Lt=Lt._nextRep,Lt&&Lt._absoluteStartTime>=At)for(;Lt;)Ql(Lt),Lt=Lt._nextRep}if(ne?(Yn(Tt?ss(qt[0],N,K,$):Nt,Qt),Yn(Tt?ss(qt[1],N,K,$,Yl):qt,se),Qt.t===le.NUMBER&&(Dt?Dt._valueType===le.UNIT&&(Qt.t=le.UNIT,Qt.u=Dt._unit):(Yn(kr(N,tt,z,W),Rn),Rn.t===le.UNIT&&(Qt.t=le.UNIT,Qt.u=Rn.u)))):(vt?Yn(qt,se):xt?cg(xt,se):Yn(i&&Dt&&Dt.parent.parent===i?Dt._value:kr(N,tt,z,W),se),Ut?Yn(Nt,Qt):xt?cg(xt,Qt):Yn(i&&Dt&&Dt.parent.parent===i?Dt._value:kr(N,tt,z,W),Qt)),Qt.o&&(Qt.n=Ju(Dt?Dt._toNumber:Yn(kr(N,tt,z,W),Rn).n,Qt.n,Qt.o)),se.o&&(se.n=Ju(Qt.n,se.n,se.o)),Qt.t!==se.t){if(Qt.t===le.COMPLEX||se.t===le.COMPLEX){let Lt=Qt.t===le.COMPLEX?Qt:se,Bt=Qt.t===le.COMPLEX?se:Qt;Bt.t=le.COMPLEX,Bt.s=cn(Lt.s),Bt.d=Lt.d.map(()=>Bt.n)}else if(Qt.t===le.UNIT||se.t===le.UNIT){let Lt=Qt.t===le.UNIT?Qt:se,Bt=Qt.t===le.UNIT?se:Qt;Bt.t=le.UNIT,Bt.u=Lt.u}else if(Qt.t===le.COLOR||se.t===le.COLOR){let Lt=Qt.t===le.COLOR?Qt:se,Bt=Qt.t===le.COLOR?se:Qt;Bt.t=le.COLOR,Bt.s=Lt.s,Bt.d=[0,0,0,1]}}if(Qt.u!==se.u){let Lt=se.u?Qt:se;Lt=Ng(N,Lt,se.u?se.u:Qt.u,!1)}if(se.d&&Qt.d&&se.d.length!==Qt.d.length){let Lt=Qt.d.length>se.d.length?Qt:se,Bt=Lt===Qt?se:Qt;Bt.d=Lt.d.map((_e,B)=>oe(Bt.d[B])?0:Bt.d[B]),Bt.s=cn(Lt.s)}let Wt=Ue(+_||Te,12),wt={parent:this,id:E1++,property:tt,target:N,_value:null,_func:Yl.func,_ease:td(E),_fromNumbers:cn(Qt.d),_toNumbers:cn(se.d),_strings:cn(se.s),_fromNumber:Qt.n,_toNumber:se.n,_numbers:cn(Qt.d),_number:Qt.n,_unit:se.u,_modifier:lt,_currentTime:0,_startTime:ft,_delay:+X,_updateDuration:Wt,_changeDuration:Wt,_absoluteStartTime:At,_tweenType:z,_valueType:se.t,_composition:ct,_isOverlapped:0,_isOverridden:0,_renderTransforms:0,_prevRep:null,_nextRep:null,_prevAdd:null,_nextAdd:null,_prev:null,_next:null};ct!==hn.none&&Ig(wt,mt),isNaN(Pt)&&(Pt=wt._startTime),kt=Ue(ft+Wt,12),xt=wt,O++,Hr(this,wt)}(isNaN(it)||Pt<it)&&(it=Pt),(isNaN(q)||kt>q)&&(q=kt),z===Le.TRANSFORM&&(rt=O-Yt,_t=O)}if(!isNaN(rt)){let L=0;Be(this,z=>{L>=rt&&L<_t&&(z._renderTransforms=1,z._composition===hn.blend&&Be(Gr.animation,tt=>{tt.id===z.id&&(tt._renderTransforms=1)})),L++})}}c||console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation."),it?(Be(this,U=>{U._startTime-U._delay||(U._delay-=it),U._startTime-=it}),q-=it):it=0,q||(q=Te,this.iterationCount=0),this.targets=l,this.duration=q===Te?Te:sd((q+this._loopDelay)*this.iterationCount-this._loopDelay)||Te,this.onRender=w||T.onRender,this._ease=P,this._delay=it,this.iterationDuration=q,this._inlineStyles=W,!this._autoplay&&Q&&this.onRender(this)}stretch(t){let e=this.duration;if(e===Ao(t))return this;let i=t/e;return Be(this,s=>{s._updateDuration=Ao(s._updateDuration*i),s._changeDuration=Ao(s._changeDuration*i),s._currentTime*=i,s._startTime*=i,s._absoluteStartTime*=i}),super.stretch(t)}refresh(){return Be(this,t=>{let e=kr(t.target,t.property,t._tweenType);Yn(e,Rn),t._fromNumbers=cn(Rn.d),t._fromNumber=Rn.n,t._func&&(Yn(t._func(),se),t._toNumbers=cn(se.d),t._strings=cn(se.s),t._toNumber=se.n)}),this}revert(){return super.revert(),hd(this)}then(t){return super.then(t)}},Lo=(n,t)=>new ic(n,t,null,0,!1).init();var Fg=["x","y","z"],ML=["perspective","width","height","margin","padding","top","right","bottom","left","borderWidth","fontSize","borderRadius",...Fg],bL=[...Fg,...nd.filter(n=>["X","Y","Z"].some(t=>n.endsWith(t)))],TL=ci&&(oe(CSS)||!Object.hasOwnProperty.call(CSS,"registerProperty"));var mg={_head:null,_tail:null},C1=(n,t,e)=>{let i=mg._head;for(;i;){let s=i._next,r=i.$el===n,o=!t||i.property===t,a=!e||i.parent===e;if(r&&o&&a){let l=i.animation;try{l.commitStyles()}catch{}l.cancel(),ls(mg,i);let c=i.parent;c&&(c._completed++,c.animations.length===c._completed&&(c.completed=!0,c.muteCallbacks||(c.paused=!0,c.onComplete(c),c._resolve(c))))}i=s}};var R1=(n=gn)=>new nc({duration:1*Fe.timeScale,onComplete:n},null,0).resume();function P1(n,t,e){let i=rd(n);if(!i.length)return;let[s]=i,r=od(s,t),o=cd(t,s,r),a=kr(s,o);if(oe(e))return a;if(Yn(a,Rn),Rn.t===le.NUMBER||Rn.t===le.UNIT){if(e===!1)return Rn.n;{let l=Ng(s,Rn,e,!1);return`${Ue(l.n,Fe.precision)}${l.u}`}}}var I1=(n,t)=>{if(!oe(t))return t.duration=Te,t.composition=tn(t.composition,hn.none),new ic(n,t,null,0,!0).resume()},gg=(n,t,e)=>{let i=!1;return Be(t,s=>{let r=s.target;if(n.includes(r)){let o=s.property,a=s._tweenType,l=cd(e,r,a);(!l||l&&l===o)&&(s.parent._tail===s&&s._tweenType===Le.TRANSFORM&&s._prev&&s._prev._tweenType===Le.TRANSFORM&&(s._prev._renderTransforms=1),ls(t,s),Dg(s),i=!0)}},!0),i},Og=(n,t,e)=>{let i=Pg(n),s=t||Ge,r=t&&t.controlAnimation&&t;for(let a=0,l=i.length;a<l;a++){let c=i[a];C1(c,e,r)}let o;if(s._hasChildren){let a=0;Be(s,l=>{if(!l._hasChildren)if(o=gg(i,l,e),o&&!l._head)l.cancel(),ls(s,l);else{let h=l._offset+l._delay+l.duration;h>a&&(a=h)}l._head?Og(n,l,e):l._hasChildren=!1},!0),oe(s.iterationDuration)||(s.iterationDuration=a)}else o=gg(i,s,e);return o&&!s._head&&(s._hasChildren=!1,s.cancel&&s.cancel()),i},ud=(n,t,e)=>{let i=10**(e||0);return Po((Math.random()*(t-n+1/i)+n)*i)/i},D1=n=>n[ud(0,n.length-1)],L1=n=>{let t=n.length,e,i;for(;t;)i=ud(0,--t),e=n[t],n[t]=n[i],n[i]=e;return n},U1=(n,t)=>(+n).toFixed(t),N1=(n,t,e)=>`${n}`.padStart(t,e),F1=(n,t,e)=>`${n}`.padEnd(t,e),O1=(n,t,e)=>((n-t)%(e-t)+(e-t))%(e-t)+t,B1=(n,t,e,i,s)=>i+(n-t)/(e-t)*(s-i),z1=n=>n*Do/180,V1=n=>n*180/Do,k1=(n,t,e,i)=>{let s=Ls/Fe.defaults.frameRate;if(i!==!1){let o=i||Ge._hasChildren&&Ge;o&&o.deltaTime&&(s=o.deltaTime)}let r=1-Math.exp(-e*s*.1);return e?e===1?t:(1-r)*n+r*t:n},H1=(n,t=0)=>(...e)=>t?i=>n(...e,i):i=>n(i,...e),Bg=n=>(...t)=>{let e=n(...t);return new Proxy(gn,{apply:(i,s,[r])=>e(r),get:(i,s)=>Bg((...r)=>{let o=G1[s](...r);return a=>o(e(a))})})},Xn=(n,t=0)=>(...e)=>(e.length<n.length?Bg(H1(n,t)):n)(...e),G1={$:rd,get:P1,set:I1,remove:Og,cleanInlineStyles:hd,random:ud,randomPick:D1,shuffle:L1,lerp:k1,sync:R1,clamp:Xn(qe),round:Xn(Ue),snap:Xn(s1),wrap:Xn(O1),interpolate:Xn(os,1),mapRange:Xn(B1),roundPad:Xn(U1),padStart:Xn(N1),padEnd:Xn(F1),degToRad:Xn(z1),radToDeg:Xn(V1)},W1=(n,t)=>{if(Ds(t,"<")){let e=t[1]==="<",i=n._tail,s=i?i._offset+i._delay:0;return e?s:s+i.duration}},X1=(n,t)=>{let e=n.iterationDuration;if(e===Te&&(e=0),oe(t))return e;if(id(+t))return+t;let i=t,s=n?n.labels:null,r=!Zl(s),o=W1(n,i),a=!oe(o),l=Kb.exec(i);if(l){let c=l[0],h=i.split(c),u=r&&h[0]?s[h[0]]:e,d=a?o:r?u:e,p=+h[1];return Ju(d,p,c[0])}else return a?o:r?oe(s[i])?e:s[i]:e};var zg=(n,t={})=>{let e=[],i=0,s=t.from,r=t.reversed,o=t.ease,a=!oe(o),c=a&&!oe(o.ease)?o.ease:a?td(o):null,h=t.grid,u=t.axis,d=oe(s)||s===0||s==="first",p=s==="center",g=s==="last",x=Us(n),m=Is(x?n[0]:n),f=x?Is(n[1]):0,w=vg.exec((x?n[1]:n)+as),T=t.start||0+(x?m:0),y=d?0:id(s)?s:0;return(P,C,A,R)=>{if(p&&(y=(A-1)/2),g&&(y=A-1),!e.length){for(let W=0;W<A;W++){if(!h)e.push(Ro(y-W));else{let Y=p?(h[0]-1)/2:y%h[0],q=p?(h[1]-1)/2:Po(y/h[0]),it=W%h[0],O=Po(W/h[0]),Q=Y-it,U=q-O,N=Ag(Q*Q+U*U);u==="x"&&(N=-Q),u==="y"&&(N=-U),e.push(N)}i=i1(...e)}c&&(e=e.map(W=>c(W/i)*i)),r&&(e=e.map(W=>u?W<0?W*-1:-W:Ro(i-W)))}let M=x?(f-m)/i:m,I=(R?X1(R,oe(t.start)?R.iterationDuration:T):T)+(M*Ue(e[C],2)||0);return t.modifier&&(I=t.modifier(I)),w&&(I=`${I}${w[2]}`),I}};var Y1=matchMedia("(prefers-reduced-motion: reduce)").matches;function Vg(n,t){let e=n.getContext("2d"),i=0,s=0,r=Math.min(devicePixelRatio,2);function o(){let U=n.getBoundingClientRect();i=U.width,s=U.height,n.width=i*r,n.height=s*r,e.setTransform(r,0,0,r,0,0)}o(),new ResizeObserver(o).observe(n);let a="#2A2A2F",l="#6E6D68",c="#A6A49E",h="#FF6369",u="#8E2E32",d={idle:{x:.14,y:.5,label:"idle"},drive:{x:.34,y:.5,label:"driving"},human:{x:.52,y:.26,label:"human detected"},zone:{x:.7,y:.26,label:"slow zone"},exit:{x:.7,y:.74,label:"zone exit"}},p={start:{x:.24,y:.5,label:"start"},detect:{x:.43,y:.4,label:"detect human"},clear:{x:.61,y:.26,label:"zone clearance"},resume:{x:.61,y:.62,label:"resume speed"},complete:{x:.86,y:.62,label:"mission complete"},dev:{x:.52,y:.74,label:"clearance skipped",dev:!0}};function g(U){return{x:U.x*i,y:U.y*s}}let x=[["idle","T:start",null,700],["T:start","drive",null,700],["drive","T:detect",{cy:-.1},650],["T:detect","human",null,650],["human","T:clear",null,550],["T:clear","zone",null,550],["zone","T:resume",{cx:.79},650],["T:resume","exit",null,650],["exit","T:complete",{cy:.82},800],["T:complete","idle",{cy:1.02},900]],m=[["drive","T:dev",{cy:.68},600],["T:dev","exit",null,600]],f={};function w(){e.clearRect(0,0,i,s),e.fillStyle="#141416";for(let N=24;N<i;N+=44)for(let K=24;K<s;K+=44)e.fillRect(N,K,1.4,1.4);let U=[["idle","T:start",null,a],["T:start","drive",null,a],["drive","T:detect",{cy:-.1},a],["T:detect","human",null,a],["human","T:clear",null,a],["T:clear","zone",null,a],["zone","T:resume",{cx:.79},a],["T:resume","exit",null,a],["exit","T:complete",{cy:.82},a],["T:complete","idle",{cy:1.02},a],["drive","T:dev",{cy:.68},u],["T:dev","exit",null,u]];for(let[N,K,$,rt]of U){let _t=g(y(N)),L=g(y(K)),z,tt;$&&$.cy!=null?(z=(_t.x+L.x)/2,tt=$.cy*s):$&&$.cx!=null?(z=$.cx*i,tt=(_t.y+L.y)/2):(z=(_t.x+L.x)/2,tt=(_t.y+L.y)/2),e.strokeStyle=rt,e.lineWidth=1,e.setLineDash(rt===u?[4,5]:[]),e.beginPath(),e.moveTo(_t.x,_t.y),e.quadraticCurveTo(z,tt,L.x,L.y),e.stroke(),e.setLineDash([])}e.font='10px "IBM Plex Mono", monospace';for(let[N,K]of Object.entries(p)){let $=g(K),rt=f[N]||0,_t=K.dev?u:a;e.fillStyle=rt>0?`rgba(255,99,105,${.25+rt*.7})`:"#17171A",e.strokeStyle=K.dev?u:"#3A3A40",T($.x,$.y,5,16),e.fillStyle="#17171A",rt>0&&(e.save(),e.shadowColor=h,e.shadowBlur=14*rt,T($.x,$.y,5,16),e.restore()),e.fillStyle=K.dev?"#7a4a4c":l,e.textAlign="center",e.fillText(K.label.toUpperCase(),$.x,$.y+30)}for(let[N,K]of Object.entries(d)){let $=g(K),rt=f[N]||0;e.beginPath(),e.arc($.x,$.y,17,0,Math.PI*2),e.fillStyle="#0E0E10",e.fill(),e.strokeStyle=rt>0?`rgba(255,99,105,${.5+rt*.5})`:"#3A3A40",e.lineWidth=1.2,e.stroke(),rt>0&&(e.save(),e.strokeStyle=`rgba(255,99,105,${.35*rt})`,e.lineWidth=2,e.beginPath(),e.arc($.x,$.y,17+8*(1-rt),0,Math.PI*2),e.stroke(),e.restore()),e.fillStyle=l,e.textAlign="center",e.fillText(K.label.toUpperCase(),$.x,$.y+34)}}function T(U,N,K,$){e.beginPath(),e.roundRect(U-K,N-$,K*2,$*2,2),e.fill(),e.stroke()}let y=U=>U.startsWith("T:")?p[U.slice(2)]:d[U.slice(0)],P={x:0,y:0,dev:!1,visible:!1};function C(U,N,K,$){let rt=g(U),_t=g(N),L,z;K&&K.cy!=null?(L=(rt.x+_t.x)/2,z=K.cy*s):K&&K.cx!=null?(L=K.cx*i,z=(rt.y+_t.y)/2):(L=(rt.x+_t.x)/2,z=(rt.y+_t.y)/2);let tt=1-$;return{x:tt*tt*rt.x+2*tt*$*L+$*$*_t.x,y:tt*tt*rt.y+2*tt*$*z+$*$*_t.y}}function A(U){f[U]=1,Lo(f,{[U]:0},{duration:700,ease:"outQuad"})}let R=412,M=["14:02:11","14:02:47","14:03:29"];function v(){let U=document.createElement("div");U.className="deviation-chip";let N=R++,K=M[N%M.length];for(U.innerHTML=`<span class="dot"></span>sealed event #${N}: zone clearance skipped \xB7 ${K}`,t.appendChild(U),Lo(U,{opacity:[0,1],translateY:[-8,0],duration:420,ease:"outQuad"});t.children.length>3;)t.firstChild.remove()}let I=0,W=!1;function Y(U,N){let K=0;function $(){if(W)return;if(K>=U.length){N();return}let[rt,_t,L,z]=U[K];A((rt.startsWith("T:"),rt)),rt.startsWith("T:")&&A(rt);let tt=performance.now();P.visible=!0,P.dev=_t==="exit"&&rt==="T:dev",P.dev=U===m;function J(ut){if(W)return;let mt=Math.min(1,(ut-tt)/z),xt=1-Math.pow(1-mt,2.2),Pt=C(y(rt),y(_t),L,xt);P.x=Pt.x,P.y=Pt.y,mt<1?requestAnimationFrame(J):(A(_t),K++,P.dev&&_t==="exit"&&v(),setTimeout($,260))}requestAnimationFrame(J)}$()}function q(){P.visible&&(e.beginPath(),e.arc(P.x,P.y,5,0,Math.PI*2),e.fillStyle=P.dev?h:"#EDECE8",e.shadowColor=P.dev?h:"rgba(240,240,235,0.8)",e.shadowBlur=10,e.fill(),e.shadowBlur=0)}function it(){I++;let U=I%3===0,N=U?m:x;if(U){let K=x.slice(0,2),$=x.slice(7);Y(K,()=>{Y(m,()=>{Y($,()=>setTimeout(it,900))})})}else Y(x,()=>setTimeout(it,900))}let O=!0;new IntersectionObserver(([U])=>{O=U.isIntersecting},{threshold:.05}).observe(n);function Q(){w(),q(),requestAnimationFrame(Q)}if(Y1){w();return}requestAnimationFrame(Q),(function U(){O&&!document.hidden?it():setTimeout(U,300)})()}var kg=[{time:"13:58:02",payload:"agent v0.9.3 online, fleet B"},{time:"13:59:10",payload:"config speed_limit zone_B = 1.2 m/s"},{time:"14:01:58",payload:"intervention: operator r.rossi raised speed_limit zone_B to 1.8 m/s (remote)"},{time:"14:02:09",payload:"safety: protective stop near human, aisle 7"},{time:"14:02:10",payload:"state: velocity reached 0.0 m/s in 0.4 s"},{time:"14:04:33",payload:"mission: resumed mission 217"},{time:"14:31:02",payload:"config speed_limit zone_B restored 1.2 m/s"},{time:"14:31:05",payload:"upload: bundle sealed, Merkle root 9f3c41"}],q1="intervention: system auto-tuned speed_limit zone_B to 1.8 m/s",$1=2,Z1=5;async function Hg(n){let t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return[...new Uint8Array(t)].map(e=>e.toString(16).padStart(2,"0")).join("")}async function Gg(){let n=document.getElementById("event-log"),t=document.getElementById("status-dot"),e=document.getElementById("status-text"),i=document.getElementById("sealed-panel"),s=document.getElementById("btn-edit"),r=document.getElementById("btn-delete"),o=document.getElementById("btn-restore"),a=document.getElementById("btn-verify"),l=[],c="genesis";for(let w of kg)c=await Hg(c+w.payload),l.push(c);let h=!1,u=!1,d=[];function p(){d.length=0,kg.forEach((w,T)=>{d.push({seq:T+1,time:w.time,payload:u&&T===$1?q1:w.payload,deleted:h&&T===Z1,sealedHash:l[T]})})}function g(){p(),n.innerHTML="",d.forEach((w,T)=>{let y=document.createElement("li");y.className="event-row"+(w.deleted?" deleted":""),y.innerHTML=`
        <span class="ev-seq">${String(w.seq).padStart(2,"0")}</span>
        <span class="ev-time">${w.time}</span>
        <span class="ev-payload">${w.deleted?"[missing event: sequence break]":x(w.payload)}</span>
        <span class="ev-hash">${w.sealedHash.slice(0,12)}</span>`,n.appendChild(y)})}let x=w=>w.replace(/[<>&]/g,T=>({"<":"&lt;",">":"&gt;","&":"&amp;"})[T]);async function m(){let w="genesis",T=!1,y=[...n.children];for(let P=0;P<d.length;P++){let C=d[P],A=y[P];if(C.deleted){T=!0,A.classList.add("bad");continue}if(T){A.classList.remove("ok"),A.classList.add("bad");continue}let R=await Hg(w+C.payload);R===C.sealedHash?(A.classList.add("ok"),w=R):(T=!0,A.classList.add("bad"))}T?(t.classList.add("broken"),e.textContent="Verification fails at the exact gap: the chain is broken",i.hidden=!1):(t.classList.remove("broken"),e.textContent="Chain intact - 8 events sealed",i.hidden=!0)}function f(){Lo(".event-row",{opacity:[0,1],translateX:[-14,0],duration:480,delay:zg(55),ease:"outQuad"})}s.addEventListener("click",()=>{u=!u,s.textContent=u?"Undo edit 03":"Edit event 03",g(),m()}),r.addEventListener("click",()=>{h=!h,r.textContent=h?"Restore event 06":"Delete event 06",g(),m()}),o.addEventListener("click",()=>{u=!1,h=!1,s.textContent="Edit event 03",r.textContent="Delete event 06",g(),m()}),a.addEventListener("click",m),g(),f(),await m()}function Wg(n,t,e){let i=document.createElement("canvas");i.id="explode-canvas",i.setAttribute("aria-hidden","true"),t&&t.parentNode?t.replaceWith(i):n.querySelector(".pipeline-sticky").prepend(i);let s=i.getContext("2d"),r=matchMedia("(prefers-reduced-motion: reduce)").matches,o="229,72,77",a=0,l=0,c=Math.min(devicePixelRatio||1,2),h=100,u=0,d=0;function p(){let O=i.getBoundingClientRect();a=O.width,l=O.height,i.width=Math.round(a*c),i.height=Math.round(l*c),s.setTransform(c,0,0,c,0,0),h=Math.min(a*.185,l*.115,148),u=a*.5,d=l*.7}p(),new ResizeObserver(p).observe(i);let g=0,x=0,m=0;function f(O,Q,U){return[(O-U)*.866*h+u,((O+U)*.5-Q)*h+d]}function w(O,Q,U,N,K){K!==void 0&&(s.globalAlpha=K),s.beginPath(),s.moveTo(O[0][0],O[0][1]);for(let $=1;$<O.length;$++)s.lineTo(O[$][0],O[$][1]);s.closePath(),Q&&(s.fillStyle=Q,s.fill()),U&&(s.save(),N&&(s.shadowColor=`rgba(${o},0.9)`,s.shadowBlur=N),s.strokeStyle=U,s.lineWidth=1.4,s.stroke(),s.restore()),s.globalAlpha=1}function T(O,Q,U,N,K,$,rt,_t){let L=O-N/2,z=O+N/2,tt=U-$/2,J=U+$/2,ut=Q,mt=Q+K;w([f(L,mt,tt),f(z,mt,tt),f(z,mt,J),f(L,mt,J)],rt.top,rt.stroke,rt.glow,_t),w([f(z,ut,tt),f(z,ut,J),f(z,mt,J),f(z,mt,tt)],rt.right,rt.stroke,0,_t),w([f(L,ut,J),f(z,ut,J),f(z,mt,J),f(L,mt,J)],rt.front,rt.stroke,0,_t)}function y(O,Q,U,N,K,$,rt,_t){_t!==void 0&&(s.globalAlpha=_t);let[L,z]=f(O,Q,U);s.beginPath(),s.ellipse(L,z,N*1.2247*h,N*.7071*h,0,0,Math.PI*2),K&&(s.fillStyle=K,s.fill()),$&&(s.save(),rt&&(s.shadowColor=`rgba(${o},0.9)`,s.shadowBlur=rt),s.strokeStyle=$,s.lineWidth=1.4,s.stroke(),s.restore()),s.globalAlpha=1}let P=[3.1,1.9,1.05,.45,0];function C(O,Q,U){return Q+P[O]*U}let A=[...e.querySelectorAll(".chip")],R=[...n.querySelectorAll(".step")],M=-1;function v(O){O===M||O<0||(M=O,R.forEach(Q=>Q.classList.toggle("active",+Q.dataset.layer===O)),A.forEach(Q=>Q.classList.toggle("active",+Q.dataset.layer===O)))}if(r)v(1);else{let O=new IntersectionObserver(Q=>{for(let U of Q)U.isIntersecting&&v(+U.target.dataset.layer)},{rootMargin:matchMedia("(max-width: 900px)").matches?"-70% 0px -22% 0px":"-42% 0px -42% 0px"});R.forEach(Q=>O.observe(Q))}function I(O,Q,U){let N=M<0||M===O?1:.2,K=(O%2===0?-1:1)*U*.3,$=C(O,Q,U),rt=`rgba(${o},${.9*N})`,_t=N;if(O===4)T(K,$,0,2.5,.55,1.9,{top:"#2c2f37",right:"#1a1c22",front:"#14161b",stroke:rt,glow:6},_t),y(K-.6,$+.56,0,.55,`rgba(120,124,138,${.55*N})`,`rgba(255,255,255,${.12*N})`,0,_t),y(K+.6,$+.56,0,.55,null,`rgba(${o},${.6*N})`,10,_t);else if(O===3)T(K,$,0,1.5,.26,1.1,{top:"#23262d",right:"#171920",front:"#121419",stroke:rt,glow:5},_t),T(K,$+.26,0,.4,.09,.4,{top:`rgba(20,22,27,${N})`,right:"#0e1013",front:"#0a0c0f",stroke:`rgba(160,130,70,${.5*N})`},_t);else if(O===2){T(K,$,0,2,.34,1.3,{top:"#2a2c34",right:"#191b21",front:"#121419",stroke:rt,glow:6},_t);for(let L=0;L<5;L++){let z=K-.68+L*.34;T(z,$+.34,0,.24,.24,.24,{top:`rgba(30,33,40,${N})`,right:"#14161b",front:"#0f1115",stroke:`rgba(255,99,105,${.85*N})`,glow:8},_t)}}else if(O===1){T(K,$,0,2.25,.18,1.65,{top:"#30333b",right:"#1d1f25",front:"#16181d",stroke:rt,glow:5},_t);for(let L=0;L<6;L++)y(K-.85+L*.34,$+.2,.4,.05,`rgba(140,144,158,${.6*N})`,null,0,_t)}else{T(K,$,0,1.15,.34,1.15,{top:"#262932",right:"#171920",front:"#121419",stroke:rt,glow:6},_t),y(K,$+.35,0,.17,`rgba(229,72,77,${.95*N})`,`rgba(255,170,173,${.9*N})`,18*N,_t);let[L,z]=f(K,$+.35,0),tt=s.createRadialGradient(L,z,0,L,z,h*.7);tt.addColorStop(0,`rgba(255,99,105,${.4*N})`),tt.addColorStop(1,"rgba(255,99,105,0)"),s.fillStyle=tt,s.fillRect(L-h,z-h,h*2,h*2)}}function W(){s.save(),s.strokeStyle="rgba(150,152,166,0.1)",s.lineWidth=1;for(let O=-5;O<=5;O++){let Q=f(O,-.6,-5),U=f(O,-.6,5);s.beginPath(),s.moveTo(Q[0],Q[1]),s.lineTo(U[0],U[1]),s.stroke();let N=f(-5,-.6,O),K=f(5,-.6,O);s.beginPath(),s.moveTo(N[0],N[1]),s.lineTo(K[0],K[1]),s.stroke()}s.restore()}function Y(){s.clearRect(0,0,a,l),W();let O=[1.62,1.32,.98,.62,0];for(let Q of[4,3,2,1,0])I(Q,O[Q],r?.3:x)}let q=!0;new IntersectionObserver(([O])=>{q=O.isIntersecting},{threshold:.02}).observe(i);function it(){g+=.016;let O=n.getBoundingClientRect(),Q=O.height-innerHeight;m=Q>0?Math.min(1,Math.max(0,-O.top/Q)):0,x+=(m-x)*.1;let U=r?.3:x*x*(3-2*x);s.clearRect(0,0,a,l),W();let N=[1.62,1.32,.98,.62,0];for(let K of[4,3,2,1,0])I(K,N[K],U)}if(r)Y();else{let O=()=>{q&&!document.hidden&&it(),requestAnimationFrame(O)};requestAnimationFrame(O)}}var ac=matchMedia("(prefers-reduced-motion: reduce)").matches;function K1(){setTimeout(()=>{document.querySelectorAll(".hero h1, .hero-sub, .hero-ctas").forEach(n=>{parseFloat(getComputedStyle(n).opacity)<.99&&(n.style.animation="none",n.style.opacity="1",n.style.transform="none")})},1600)}function J1(){ac||Vc(Nc("#progress",{scaleX:[0,1],ease:"linear"}))}function Q1(){if(ac)return;let n=[...document.querySelectorAll(".clause, .ledger-row, .tier, .stat, .fact, .quote-card, .demo-shell, .section-h")],t=new Set,e=i=>{t.has(i)||(t.add(i),i.style.transition="opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",i.style.opacity="1",i.style.transform="translateY(0)")};n.forEach(i=>{i.style.opacity="0",i.style.transform="translateY(24px)",kc(i,()=>e(i),{amount:.25})}),setTimeout(()=>n.forEach(e),3200)}function j1(){let n=document.querySelectorAll("[data-count]"),t=i=>{let s=+i.dataset.count,r=i.dataset.prefix||"",o=i.dataset.suffix||"%";if(ac){i.textContent=r+s+o;return}let a=performance.now(),l=1400;function c(h){let u=Math.min(1,(h-a)/l),d=1-Math.pow(1-u,3);i.textContent=r+Math.round(s*d)+o,u<1&&requestAnimationFrame(c)}requestAnimationFrame(c)},e=new IntersectionObserver(i=>{i.forEach(s=>{s.isIntersecting&&(t(s.target),e.unobserve(s.target))})},{threshold:.6});n.forEach(i=>e.observe(i))}var tT=new Date("2027-01-20T00:00:00+01:00").getTime();function oc(n){return String(n).padStart(2,"0")}function eT(){let n=document.getElementById("count-days"),t=document.getElementById("count-clock"),e=document.getElementById("cta-count");function i(){let s=Math.max(0,tT-Date.now()),r=Math.floor(s/864e5),o=Math.floor(s/36e5)%24,a=Math.floor(s/6e4)%60,l=Math.floor(s/1e3)%60;n&&(n.textContent=r),t&&(t.textContent=`${oc(r)} : ${oc(o)} : ${oc(a)} : ${oc(l)}`),e&&(e.textContent=`${r} days to go`)}i(),setInterval(i,1e3)}function nT(){if(ac)return;document.querySelectorAll(".magnetic").forEach(t=>{let e=0,i=0,s=0,r=0,o=0,a=.18;function l(){i+=(r-i)*.18,s+=(o-s)*.18,t.style.transform=`translate(${i}px, ${s}px)`,e=requestAnimationFrame(l)}t.addEventListener("pointermove",c=>{let h=t.getBoundingClientRect();r=(c.clientX-(h.left+h.width/2))*a,o=(c.clientY-(h.top+h.height/2))*a,e||(e=requestAnimationFrame(l))}),t.addEventListener("pointerleave",()=>{r=0,o=0,setTimeout(()=>{Math.abs(i)<.4&&Math.abs(s)<.4&&(cancelAnimationFrame(e),e=0,t.style.transform="",i=s=0)},350)})})}var Xg=!1,dd=null;function Yg(n){if(!Xg){Xg=!0,console.warn("[sigillo] 2D renderer active:",n),document.documentElement.setAttribute("data-renderer","2d");try{dd&&dd.dispose()}catch{}try{Wg(document.querySelector(".pipeline"),document.getElementById("explode-canvas"),document.getElementById("layer-chips"))}catch(t){console.error("[sigillo] fallback explode",t)}}}function iT(){hi("witness",()=>bp(document.getElementById("hero-canvas")));let n=new URLSearchParams(location.search).get("renderer")==="2d";if(n||!sT()){n||console.warn("[sigillo] webgl unavailable"),Yg(n?"forced by URL":"webgl unavailable");return}try{dd=ig(document.querySelector(".pipeline"),document.getElementById("explode-canvas"),document.getElementById("leader-lines"),document.getElementById("layer-chips")),document.documentElement.setAttribute("data-renderer","webgl")}catch(t){console.error("[sigillo] webgl init failed",t),Yg("webgl init failed")}}function sT(){try{let n=document.createElement("canvas");return!!(n.getContext("webgl2")||n.getContext("webgl"))}catch{return!1}}function hi(n,t){try{t()}catch(e){console.error("[sigillo]",n,e)}}function qg(){window.__sigilloBooted=!0,hi("progress",()=>J1()),hi("reveals",()=>Q1()),hi("heroSafety",()=>K1()),hi("counters",()=>j1()),hi("countdown",()=>eT()),hi("magnetic",()=>nT()),hi("scenes",()=>iT()),hi("petri",()=>Vg(document.getElementById("petri-canvas"),document.getElementById("deviation-feed"))),hi("tamper",()=>Gg())}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",qg):qg();})();
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
