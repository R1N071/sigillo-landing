(()=>{function _s(n,t,e){var i;if(n instanceof Element)return[n];if(typeof n=="string"){let s=document;t&&(s=t.current);let r=(i=e?.[n])!==null&&i!==void 0?i:s.querySelectorAll(n);return r?Array.from(r):[]}return Array.from(n)}var Ue=n=>n;var pi=Ue,_n=Ue;var Pn=(n,t,e)=>{let i=t-n;return i===0?1:(e-n)/i};function xs(n){let t;return()=>(t===void 0&&(t=n()),t)}var Co=xs(()=>window.ScrollTimeline!==void 0);var Ro=class{constructor(t){this.stop=()=>this.runAll("stop"),this.animations=t.filter(Boolean)}get finished(){return Promise.all(this.animations.map(t=>"finished"in t?t.finished:t))}getAll(t){return this.animations[0][t]}setAll(t,e){for(let i=0;i<this.animations.length;i++)this.animations[i][t]=e}attachTimeline(t,e){let i=this.animations.map(s=>{if(Co()&&s.attachTimeline)return s.attachTimeline(t);if(typeof e=="function")return e(s)});return()=>{i.forEach((s,r)=>{s&&s(),this.animations[r].stop()})}}get time(){return this.getAll("time")}set time(t){this.setAll("time",t)}get speed(){return this.getAll("speed")}set speed(t){this.setAll("speed",t)}get startTime(){return this.getAll("startTime")}get duration(){let t=0;for(let e=0;e<this.animations.length;e++)t=Math.max(t,this.animations[e].duration);return t}runAll(t){this.animations.forEach(e=>e[t]())}flatten(){this.runAll("flatten")}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}};var ys=class extends Ro{then(t,e){return Promise.all(this.animations).then(t).catch(e)}};var Ne=n=>n*1e3,$e=n=>n/1e3;function vs(n){let t=0,e=50,i=n.next(t);for(;!i.done&&t<2e4;)t+=e,i=n.next(t);return t>=2e4?1/0:t}var Po=(n,t,e=10)=>{let i="",s=Math.max(Math.round(t/e),2);for(let r=0;r<s;r++)i+=n(Pn(0,s-1,r))+", ";return`linear(${i.substring(0,i.length-2)})`};var Ve=(n,t,e)=>e>t?t:e<n?n:e;function Ms(n,t){return t?n*(1e3/t):0}var l0=5;function Io(n,t,e){let i=Math.max(t-l0,0);return Ms(e-n(i),t-i)}var de={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};var ec=.001;function Ed({duration:n=de.duration,bounce:t=de.bounce,velocity:e=de.velocity,mass:i=de.mass}){let s,r;pi(n<=Ne(de.maxDuration),"Spring duration must be 10 seconds or less");let o=1-t;o=Ve(de.minDamping,de.maxDamping,o),n=Ve(de.minDuration,de.maxDuration,$e(n)),o<1?(s=c=>{let h=c*o,u=h*n,d=h-e,p=Do(c,o),g=Math.exp(-u);return ec-d/p*g},r=c=>{let u=c*o*n,d=u*e+e,p=Math.pow(o,2)*Math.pow(c,2)*n,g=Math.exp(-u),_=Do(Math.pow(c,2),o);return(-s(c)+ec>0?-1:1)*((d-p)*g)/_}):(s=c=>{let h=Math.exp(-c*n),u=(c-e)*n+1;return-ec+h*u},r=c=>{let h=Math.exp(-c*n),u=(e-c)*(n*n);return h*u});let a=5/n,l=h0(s,r,a);if(n=Ne(n),isNaN(l))return{stiffness:de.stiffness,damping:de.damping,duration:n};{let c=Math.pow(l,2)*i;return{stiffness:c,damping:o*2*Math.sqrt(i*c),duration:n}}}var c0=12;function h0(n,t,e){let i=e;for(let s=1;s<c0;s++)i=i-n(i)/t(i);return i}function Do(n,t){return n*Math.sqrt(1-t*t)}var u0=["duration","bounce"],d0=["stiffness","damping","mass"];function wd(n,t){return t.some(e=>n[e]!==void 0)}function f0(n){let t={velocity:de.velocity,stiffness:de.stiffness,damping:de.damping,mass:de.mass,isResolvedFromDuration:!1,...n};if(!wd(n,d0)&&wd(n,u0))if(n.visualDuration){let e=n.visualDuration,i=2*Math.PI/(e*1.2),s=i*i,r=2*Ve(.05,1,1-(n.bounce||0))*Math.sqrt(s);t={...t,mass:de.mass,stiffness:s,damping:r}}else{let e=Ed(n);t={...t,...e,mass:de.mass},t.isResolvedFromDuration=!0}return t}function Ss(n=de.visualDuration,t=de.bounce){let e=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:t}:n,{restSpeed:i,restDelta:s}=e,r=e.keyframes[0],o=e.keyframes[e.keyframes.length-1],a={done:!1,value:r},{stiffness:l,damping:c,mass:h,duration:u,velocity:d,isResolvedFromDuration:p}=f0({...e,velocity:-$e(e.velocity||0)}),g=d||0,_=c/(2*Math.sqrt(l*h)),m=o-r,f=$e(Math.sqrt(l/h)),T=Math.abs(m)<5;i||(i=T?de.restSpeed.granular:de.restSpeed.default),s||(s=T?de.restDelta.granular:de.restDelta.default);let v;if(_<1){let P=Do(f,_);v=w=>{let R=Math.exp(-_*f*w);return o-R*((g+_*f*m)/P*Math.sin(P*w)+m*Math.cos(P*w))}}else if(_===1)v=P=>o-Math.exp(-f*P)*(m+(g+f*m)*P);else{let P=f*Math.sqrt(_*_-1);v=w=>{let R=Math.exp(-_*f*w),I=Math.min(P*w,300);return o-R*((g+_*f*m)*Math.sinh(I)+P*m*Math.cosh(I))/P}}let M={calculatedDuration:p&&u||null,next:P=>{let w=v(P);if(p)a.done=P>=u;else{let R=0;_<1&&(R=P===0?Ne(g):Io(v,P,w));let I=Math.abs(R)<=i,S=Math.abs(o-w)<=s;a.done=I&&S}return a.value=a.done?o:w,a},toString:()=>{let P=Math.min(vs(M),2e4),w=Po(R=>M.next(P*R).value,P,30);return P+"ms "+w}};return M}function Ad(n,t=100,e){let i=e({...n,keyframes:[0,t]}),s=Math.min(vs(i),2e4);return{type:"keyframes",ease:r=>i.next(s*r).value/t,duration:$e(s)}}function mi(n){return typeof n=="function"}var Cd=(n,t,e)=>{let i=t-n;return((e-n)%i+i)%i+n};var Lo=n=>Array.isArray(n)&&typeof n[0]!="number";function Uo(n,t){return Lo(n)?n[Cd(0,n.length,t)]:n}var In=(n,t,e)=>n+(t-n)*e;function No(n,t){let e=n[n.length-1];for(let i=1;i<=t;i++){let s=Pn(0,t,i);n.push(In(e,1,s))}}function bs(n){let t=[0];return No(t,n.length-1),t}var fe=n=>!!(n&&n.getVelocity);function Fr(n){return typeof n=="object"&&!Array.isArray(n)}function Fo(n,t,e,i){return typeof n=="string"&&Fr(t)?_s(n,e,i):n instanceof NodeList?Array.from(n):Array.isArray(n)?n:[n]}function Rd(n,t,e){return n*(t+1)}function ic(n,t,e,i){var s;return typeof t=="number"?t:t.startsWith("-")||t.startsWith("+")?Math.max(0,n+parseFloat(t)):t==="<"?e:(s=i.get(t))!==null&&s!==void 0?s:n}function Pd(n,t){n.indexOf(t)===-1&&n.push(t)}function Oo(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function p0(n,t,e){for(let i=0;i<n.length;i++){let s=n[i];s.at>t&&s.at<e&&(Oo(n,s),i--)}}function Id(n,t,e,i,s,r){p0(n,s,r);for(let o=0;o<t.length;o++)n.push({value:t[o],at:In(s,r,i[o]),easing:Uo(e,o)})}function Dd(n,t){for(let e=0;e<n.length;e++)n[e]=n[e]/(t+1)}function Ld(n,t){return n.at===t.at?n.value===null?1:t.value===null?-1:0:n.at-t.at}var m0="easeInOut",g0=20;function Fd(n,{defaultTransition:t={},...e}={},i,s){let r=t.duration||.3,o=new Map,a=new Map,l={},c=new Map,h=0,u=0,d=0;for(let p=0;p<n.length;p++){let g=n[p];if(typeof g=="string"){c.set(g,u);continue}else if(!Array.isArray(g)){c.set(g.name,ic(u,g.at,h,c));continue}let[_,m,f={}]=g;f.at!==void 0&&(u=ic(u,f.at,h,c));let T=0,v=(M,P,w,R=0,I=0)=>{let S=_0(M),{delay:y=0,times:D=bs(S),type:W="keyframes",repeat:Y,repeatType:B,repeatDelay:N=0,...C}=P,{ease:O=t.ease||"easeOut",duration:A}=P,L=typeof y=="function"?y(R,I):y,V=S.length,X=mi(W)?W:s?.[W];if(V<=2&&X){let $=100;if(V===2&&v0(S)){let ct=S[1]-S[0];$=Math.abs(ct)}let it={...C};A!==void 0&&(it.duration=Ne(A));let et=Ad(it,$,X);O=et.ease,A=et.duration}A??(A=r);let Q=u+L;D.length===1&&D[0]===0&&(D[1]=1);let rt=D.length-S.length;if(rt>0&&No(D,rt),S.length===1&&S.unshift(null),Y){_n(Y<g0,"Repeat count too high, must be less than 20"),A=Rd(A,Y);let $=[...S],it=[...D];O=Array.isArray(O)?[...O]:[O];let et=[...O];for(let ct=0;ct<Y;ct++){S.push(...$);for(let ut=0;ut<$.length;ut++)D.push(it[ut]+(ct+1)),O.push(ut===0?"linear":Uo(et,ut-1))}Dd(D,Y)}let H=Q+A;Id(w,S,O,D,Q,H),T=Math.max(L+A,T),d=Math.max(H,d)};if(fe(_)){let M=Ud(_,a);v(m,f,Nd("default",M))}else{let M=Fo(_,m,i,l),P=M.length;for(let w=0;w<P;w++){m=m,f=f;let R=M[w],I=Ud(R,a);for(let S in m)v(m[S],x0(f,S),Nd(S,I),w,P)}}h=u,u+=T}return a.forEach((p,g)=>{for(let _ in p){let m=p[_];m.sort(Ld);let f=[],T=[],v=[];for(let P=0;P<m.length;P++){let{at:w,value:R,easing:I}=m[P];f.push(R),T.push(Pn(0,d,w)),v.push(I||"easeOut")}T[0]!==0&&(T.unshift(0),f.unshift(f[0]),v.unshift(m0)),T[T.length-1]!==1&&(T.push(1),f.push(null)),o.has(g)||o.set(g,{keyframes:{},transition:{}});let M=o.get(g);M.keyframes[_]=f,M.transition[_]={...t,duration:d,ease:v,times:T,...e}}}),o}function Ud(n,t){return!t.has(n)&&t.set(n,{}),t.get(n)}function Nd(n,t){return t[n]||(t[n]=[]),t[n]}function _0(n){return Array.isArray(n)?n:[n]}function x0(n,t){return n&&n[t]?{...n,...n[t]}:{...n}}var y0=n=>typeof n=="number",v0=n=>n.every(y0);var qn=new WeakMap;function Bo(n,t){return n?n[t]||n.default||n:void 0}var Dn=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],on=new Set(Dn);var zo=new Set(["width","height","top","left","right","bottom",...Dn]);var Od=n=>Array.isArray(n);var Bd=n=>Od(n)?n[n.length-1]||0:n;var Ts={skipAnimations:!1,useManualTiming:!1};function zd(n){let t=new Set,e=new Set,i=!1,s=!1,r=new WeakSet,o={delta:0,timestamp:0,isProcessing:!1};function a(c){r.has(c)&&(l.schedule(c),n()),c(o)}let l={schedule:(c,h=!1,u=!1)=>{let p=u&&i?t:e;return h&&r.add(c),p.has(c)||p.add(c),c},cancel:c=>{e.delete(c),r.delete(c)},process:c=>{if(o=c,i){s=!0;return}i=!0,[t,e]=[e,t],t.forEach(a),t.clear(),i=!1,s&&(s=!1,l.process(c))}};return l}var Vo=["read","resolveKeyframes","update","preRender","render","postRender"],M0=40;function Vd(n,t){let e=!1,i=!0,s={delta:0,timestamp:0,isProcessing:!1},r=()=>e=!0,o=Vo.reduce((f,T)=>(f[T]=zd(r),f),{}),{read:a,resolveKeyframes:l,update:c,preRender:h,render:u,postRender:d}=o,p=()=>{let f=Ts.useManualTiming?s.timestamp:performance.now();e=!1,s.delta=i?1e3/60:Math.max(Math.min(f-s.timestamp,M0),1),s.timestamp=f,s.isProcessing=!0,a.process(s),l.process(s),c.process(s),h.process(s),u.process(s),d.process(s),s.isProcessing=!1,e&&t&&(i=!1,n(p))},g=()=>{e=!0,i=!0,s.isProcessing||n(p)};return{schedule:Vo.reduce((f,T)=>{let v=o[T];return f[T]=(M,P=!1,w=!1)=>(e||g(),v.schedule(M,P,w)),f},{}),cancel:f=>{for(let T=0;T<Vo.length;T++)o[Vo[T]].cancel(f)},state:s,steps:o}}var{schedule:ye,cancel:$n,state:gi,steps:GE}=Vd(typeof requestAnimationFrame<"u"?requestAnimationFrame:Ue,!0);var ko;function S0(){ko=void 0}var an={now:()=>(ko===void 0&&an.set(gi.isProcessing||Ts.useManualTiming?gi.timestamp:performance.now()),ko),set:n=>{ko=n,queueMicrotask(S0)}};var Es=class{constructor(){this.subscriptions=[]}add(t){return Pd(this.subscriptions,t),()=>Oo(this.subscriptions,t)}notify(t,e,i){let s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](t,e,i);else for(let r=0;r<s;r++){let o=this.subscriptions[r];o&&o(t,e,i)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}};var kd=30,b0=n=>!isNaN(parseFloat(n)),Hd={current:void 0},sc=class{constructor(t,e={}){this.version="12.0.0",this.canTrackVelocity=null,this.events={},this.updateAndNotify=(i,s=!0)=>{let r=an.now();this.updatedAt!==r&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(i),this.current!==this.prev&&this.events.change&&this.events.change.notify(this.current),s&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.hasAnimated=!1,this.setCurrent(t),this.owner=e.owner}setCurrent(t){this.current=t,this.updatedAt=an.now(),this.canTrackVelocity===null&&t!==void 0&&(this.canTrackVelocity=b0(this.current))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return this.on("change",t)}on(t,e){this.events[t]||(this.events[t]=new Es);let i=this.events[t].add(e);return t==="change"?()=>{i(),ye.read(()=>{this.events.change.getSize()||this.stop()})}:i}clearListeners(){for(let t in this.events)this.events[t].clear()}attach(t,e){this.passiveEffect=t,this.stopPassiveEffect=e}set(t,e=!0){!e||!this.passiveEffect?this.updateAndNotify(t,e):this.passiveEffect(t,this.updateAndNotify)}setWithVelocity(t,e,i){this.set(e),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-i}jump(t,e=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,e&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return Hd.current&&Hd.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){let t=an.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||t-this.updatedAt>kd)return 0;let e=Math.min(this.updatedAt-this.prevUpdatedAt,kd);return Ms(parseFloat(this.current)-parseFloat(this.prevFrameValue),e)}start(t){return this.stop(),new Promise(e=>{this.hasAnimated=!0,this.animation=t(e),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}};function Zn(n,t){return new sc(n,t)}function Gd(n){let t=[{},{}];return n?.values.forEach((e,i)=>{t[0][i]=e.get(),t[1][i]=e.getVelocity()}),t}function Ho(n,t,e,i){if(typeof t=="function"){let[s,r]=Gd(i);t=t(e!==void 0?e:n.custom,s,r)}if(typeof t=="string"&&(t=n.variants&&n.variants[t]),typeof t=="function"){let[s,r]=Gd(i);t=t(e!==void 0?e:n.custom,s,r)}return t}function Wd(n,t,e){let i=n.getProps();return Ho(i,t,e!==void 0?e:i.custom,n)}function T0(n,t,e){n.hasValue(t)?n.getValue(t).set(e):n.addValue(t,Zn(e))}function Xd(n,t){let e=Wd(n,t),{transitionEnd:i={},transition:s={},...r}=e||{};r={...r,...i};for(let o in r){let a=Bd(r[o]);T0(n,o,a)}}function Yd(n){return!!(fe(n)&&n.add)}function qd(n,t){let e=n.getValue("willChange");if(Yd(e))return e.add(t)}var ws=n=>n.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase();var E0="framerAppearId",$d="data-"+ws(E0);function Zd(n){return n.props[$d]}var Go={current:!1};function rc(n,t){n.timeline=t,n.onfinish=null}var Or=n=>Array.isArray(n)&&typeof n[0]=="number";var Kd={linearEasing:void 0};function Jd(n,t){let e=xs(n);return()=>{var i;return(i=Kd[t])!==null&&i!==void 0?i:e()}}var As=Jd(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing");function ac(n){return!!(typeof n=="function"&&As()||!n||typeof n=="string"&&(n in oc||As())||Or(n)||Array.isArray(n)&&n.every(ac))}var Br=([n,t,e,i])=>`cubic-bezier(${n}, ${t}, ${e}, ${i})`,oc={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Br([0,.65,.55,1]),circOut:Br([.55,0,1,.45]),backIn:Br([.31,.01,.66,-.59]),backOut:Br([.33,1.53,.69,.99])};function lc(n,t){if(n)return typeof n=="function"&&As()?Po(n,t):Or(n)?Br(n):Array.isArray(n)?n.map(e=>lc(e,t)||oc.easeOut):oc[n]}var Qd=(n,t,e)=>(((1-3*e+3*t)*n+(3*e-6*t))*n+3*t)*n,w0=1e-7,A0=12;function C0(n,t,e,i,s){let r,o,a=0;do o=t+(e-t)/2,r=Qd(o,i,s)-n,r>0?e=o:t=o;while(Math.abs(r)>w0&&++a<A0);return o}function _i(n,t,e,i){if(n===t&&e===i)return Ue;let s=r=>C0(r,0,1,n,e);return r=>r===0||r===1?r:Qd(s(r),t,i)}var Wo=n=>t=>t<=.5?n(2*t)/2:(2-n(2*(1-t)))/2;var Xo=n=>t=>1-n(1-t);var cc=_i(.33,1.53,.69,.99),zr=Xo(cc),Yo=Wo(zr);var qo=n=>(n*=2)<1?.5*zr(n):.5*(2-Math.pow(2,-10*(n-1)));var $o=n=>1-Math.sin(Math.acos(n)),jd=Xo($o),Zo=Wo($o);var Ko=n=>/^0[^.\s]+$/u.test(n);function tf(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||Ko(n):!0}var Ln={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},Kn={...Ln,transform:n=>Ve(0,1,n)},Vr={...Ln,default:1};var xi=n=>Math.round(n*1e5)/1e5;var Cs=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function ef(n){return n==null}var nf=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;var Rs=(n,t)=>e=>!!(typeof e=="string"&&nf.test(e)&&e.startsWith(n)||t&&!ef(e)&&Object.prototype.hasOwnProperty.call(e,t)),Jo=(n,t,e)=>i=>{if(typeof i!="string")return i;let[s,r,o,a]=i.match(Cs);return{[n]:parseFloat(s),[t]:parseFloat(r),[e]:parseFloat(o),alpha:a!==void 0?parseFloat(a):1}};var R0=n=>Ve(0,255,n),hc={...Ln,transform:n=>Math.round(R0(n))},Un={test:Rs("rgb","red"),parse:Jo("red","green","blue"),transform:({red:n,green:t,blue:e,alpha:i=1})=>"rgba("+hc.transform(n)+", "+hc.transform(t)+", "+hc.transform(e)+", "+xi(Kn.transform(i))+")"};function P0(n){let t="",e="",i="",s="";return n.length>5?(t=n.substring(1,3),e=n.substring(3,5),i=n.substring(5,7),s=n.substring(7,9)):(t=n.substring(1,2),e=n.substring(2,3),i=n.substring(3,4),s=n.substring(4,5),t+=t,e+=e,i+=i,s+=s),{red:parseInt(t,16),green:parseInt(e,16),blue:parseInt(i,16),alpha:s?parseInt(s,16)/255:1}}var kr={test:Rs("#"),parse:P0,transform:Un.transform};var Hr=n=>({test:t=>typeof t=="string"&&t.endsWith(n)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${n}`}),Nn=Hr("deg"),yi=Hr("%"),Ut=Hr("px"),sf=Hr("vh"),rf=Hr("vw"),uc={...yi,parse:n=>yi.parse(n)/100,transform:n=>yi.transform(n*100)};var vi={test:Rs("hsl","hue"),parse:Jo("hue","saturation","lightness"),transform:({hue:n,saturation:t,lightness:e,alpha:i=1})=>"hsla("+Math.round(n)+", "+yi.transform(xi(t))+", "+yi.transform(xi(e))+", "+xi(Kn.transform(i))+")"};var Se={test:n=>Un.test(n)||kr.test(n)||vi.test(n),parse:n=>Un.test(n)?Un.parse(n):vi.test(n)?vi.parse(n):kr.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?Un.transform(n):vi.transform(n)};var of=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function I0(n){var t,e;return isNaN(n)&&typeof n=="string"&&(((t=n.match(Cs))===null||t===void 0?void 0:t.length)||0)+(((e=n.match(of))===null||e===void 0?void 0:e.length)||0)>0}var lf="number",cf="color",D0="var",L0="var(",af="${}",U0=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Gi(n){let t=n.toString(),e=[],i={color:[],number:[],var:[]},s=[],r=0,a=t.replace(U0,l=>(Se.test(l)?(i.color.push(r),s.push(cf),e.push(Se.parse(l))):l.startsWith(L0)?(i.var.push(r),s.push(D0),e.push(l)):(i.number.push(r),s.push(lf),e.push(parseFloat(l))),++r,af)).split(af);return{values:e,split:a,indexes:i,types:s}}function hf(n){return Gi(n).values}function uf(n){let{split:t,types:e}=Gi(n),i=t.length;return s=>{let r="";for(let o=0;o<i;o++)if(r+=t[o],s[o]!==void 0){let a=e[o];a===lf?r+=xi(s[o]):a===cf?r+=Se.transform(s[o]):r+=s[o]}return r}}var N0=n=>typeof n=="number"?0:n;function F0(n){let t=hf(n);return uf(n)(t.map(N0))}var ln={test:I0,parse:hf,createTransformer:uf,getAnimatableNone:F0};var O0=new Set(["brightness","contrast","saturate","opacity"]);function B0(n){let[t,e]=n.slice(0,-1).split("(");if(t==="drop-shadow")return n;let[i]=e.match(Cs)||[];if(!i)return n;let s=e.replace(i,""),r=O0.has(t)?1:0;return i!==e&&(r*=100),t+"("+r+s+")"}var z0=/\b([a-z-]*)\(.*?\)/gu,Gr={...ln,getAnimatableNone:n=>{let t=n.match(z0);return t?t.map(B0).join(" "):n}};var df={borderWidth:Ut,borderTopWidth:Ut,borderRightWidth:Ut,borderBottomWidth:Ut,borderLeftWidth:Ut,borderRadius:Ut,radius:Ut,borderTopLeftRadius:Ut,borderTopRightRadius:Ut,borderBottomRightRadius:Ut,borderBottomLeftRadius:Ut,width:Ut,maxWidth:Ut,height:Ut,maxHeight:Ut,top:Ut,right:Ut,bottom:Ut,left:Ut,padding:Ut,paddingTop:Ut,paddingRight:Ut,paddingBottom:Ut,paddingLeft:Ut,margin:Ut,marginTop:Ut,marginRight:Ut,marginBottom:Ut,marginLeft:Ut,backgroundPositionX:Ut,backgroundPositionY:Ut};var ff={rotate:Nn,rotateX:Nn,rotateY:Nn,rotateZ:Nn,scale:Vr,scaleX:Vr,scaleY:Vr,scaleZ:Vr,skew:Nn,skewX:Nn,skewY:Nn,distance:Ut,translateX:Ut,translateY:Ut,translateZ:Ut,x:Ut,y:Ut,z:Ut,perspective:Ut,transformPerspective:Ut,opacity:Kn,originX:uc,originY:uc,originZ:Ut};var dc={...Ln,transform:Math.round};var Ps={...df,...ff,zIndex:dc,size:Ut,fillOpacity:Kn,strokeOpacity:Kn,numOctaves:dc};var V0={...Ps,color:Se,backgroundColor:Se,outlineColor:Se,fill:Se,stroke:Se,borderColor:Se,borderTopColor:Se,borderRightColor:Se,borderBottomColor:Se,borderLeftColor:Se,filter:Gr,WebkitFilter:Gr},Is=n=>V0[n];function Qo(n,t){let e=Is(n);return e!==Gr&&(e=ln),e.getAnimatableNone?e.getAnimatableNone(t):void 0}var k0=new Set(["auto","none","0"]);function pf(n,t,e){let i=0,s;for(;i<n.length&&!s;){let r=n[i];typeof r=="string"&&!k0.has(r)&&Gi(r).values.length&&(s=n[i]),i++}if(s&&e)for(let r of t)n[r]=Qo(e,s)}var fc=n=>n===Ln||n===Ut,mf=(n,t)=>parseFloat(n.split(", ")[t]),gf=(n,t)=>(e,{transform:i})=>{if(i==="none"||!i)return 0;let s=i.match(/^matrix3d\((.+)\)$/u);if(s)return mf(s[1],t);{let r=i.match(/^matrix\((.+)\)$/u);return r?mf(r[1],n):0}},H0=new Set(["x","y","z"]),G0=Dn.filter(n=>!H0.has(n));function _f(n){let t=[];return G0.forEach(e=>{let i=n.getValue(e);i!==void 0&&(t.push([e,i.get()]),i.set(e.startsWith("scale")?1:0))}),t}var Wi={width:({x:n},{paddingLeft:t="0",paddingRight:e="0"})=>n.max-n.min-parseFloat(t)-parseFloat(e),height:({y:n},{paddingTop:t="0",paddingBottom:e="0"})=>n.max-n.min-parseFloat(t)-parseFloat(e),top:(n,{top:t})=>parseFloat(t),left:(n,{left:t})=>parseFloat(t),bottom:({y:n},{top:t})=>parseFloat(t)+(n.max-n.min),right:({x:n},{left:t})=>parseFloat(t)+(n.max-n.min),x:gf(4,13),y:gf(5,14)};Wi.translateX=Wi.x;Wi.translateY=Wi.y;var Xi=new Set,pc=!1,mc=!1;function xf(){if(mc){let n=Array.from(Xi).filter(i=>i.needsMeasurement),t=new Set(n.map(i=>i.element)),e=new Map;t.forEach(i=>{let s=_f(i);s.length&&(e.set(i,s),i.render())}),n.forEach(i=>i.measureInitialState()),t.forEach(i=>{i.render();let s=e.get(i);s&&s.forEach(([r,o])=>{var a;(a=i.getValue(r))===null||a===void 0||a.set(o)})}),n.forEach(i=>i.measureEndState()),n.forEach(i=>{i.suspendedScrollY!==void 0&&window.scrollTo(0,i.suspendedScrollY)})}mc=!1,pc=!1,Xi.forEach(n=>n.complete()),Xi.clear()}function yf(){Xi.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(mc=!0)})}function vf(){yf(),xf()}var Mi=class{constructor(t,e,i,s,r,o=!1){this.isComplete=!1,this.isAsync=!1,this.needsMeasurement=!1,this.isScheduled=!1,this.unresolvedKeyframes=[...t],this.onComplete=e,this.name=i,this.motionValue=s,this.element=r,this.isAsync=o}scheduleResolve(){this.isScheduled=!0,this.isAsync?(Xi.add(this),pc||(pc=!0,ye.read(yf),ye.resolveKeyframes(xf))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:t,name:e,element:i,motionValue:s}=this;for(let r=0;r<t.length;r++)if(t[r]===null)if(r===0){let o=s?.get(),a=t[t.length-1];if(o!==void 0)t[0]=o;else if(i&&e){let l=i.readValue(e,a);l!=null&&(t[0]=l)}t[0]===void 0&&(t[0]=a),s&&o===void 0&&s.set(t[0])}else t[r]=t[r-1]}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(){this.isComplete=!0,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe),Xi.delete(this)}cancel(){this.isComplete||(this.isScheduled=!1,Xi.delete(this))}resume(){this.isComplete||this.scheduleResolve()}};var jo=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);var Mf=n=>t=>typeof t=="string"&&t.startsWith(n),ta=Mf("--"),W0=Mf("var(--"),Ds=n=>W0(n)?X0.test(n.split("/*")[0].trim()):!1,X0=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;var Y0=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function q0(n){let t=Y0.exec(n);if(!t)return[,];let[,e,i,s]=t;return[`--${e??i}`,s]}var $0=4;function gc(n,t,e=1){_n(e<=$0,`Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`);let[i,s]=q0(n);if(!i)return;let r=window.getComputedStyle(t).getPropertyValue(i);if(r){let o=r.trim();return jo(o)?parseFloat(o):o}return Ds(s)?gc(s,t,e+1):s}var ea=n=>t=>t.test(n);var Sf={test:n=>n==="auto",parse:n=>n};var _c=[Ln,Ut,yi,Nn,rf,sf,Sf],xc=n=>_c.find(ea(n));var Ls=class extends Mi{constructor(t,e,i,s,r){super(t,e,i,s,r,!0)}readKeyframes(){let{unresolvedKeyframes:t,element:e,name:i}=this;if(!e||!e.current)return;super.readKeyframes();for(let l=0;l<t.length;l++){let c=t[l];if(typeof c=="string"&&(c=c.trim(),Ds(c))){let h=gc(c,e.current);h!==void 0&&(t[l]=h),l===t.length-1&&(this.finalKeyframe=c)}}if(this.resolveNoneKeyframes(),!zo.has(i)||t.length!==2)return;let[s,r]=t,o=xc(s),a=xc(r);if(o!==a)if(fc(o)&&fc(a))for(let l=0;l<t.length;l++){let c=t[l];typeof c=="string"&&(t[l]=parseFloat(c))}else this.needsMeasurement=!0}resolveNoneKeyframes(){let{unresolvedKeyframes:t,name:e}=this,i=[];for(let s=0;s<t.length;s++)tf(t[s])&&i.push(s);i.length&&pf(t,i,e)}measureInitialState(){let{element:t,unresolvedKeyframes:e,name:i}=this;if(!t||!t.current)return;i==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Wi[i](t.measureViewportBox(),window.getComputedStyle(t.current)),e[0]=this.measuredOrigin;let s=e[e.length-1];s!==void 0&&t.getValue(i,s).jump(s,!1)}measureEndState(){var t;let{element:e,name:i,unresolvedKeyframes:s}=this;if(!e||!e.current)return;let r=e.getValue(i);r&&r.jump(this.measuredOrigin,!1);let o=s.length-1,a=s[o];s[o]=Wi[i](e.measureViewportBox(),window.getComputedStyle(e.current)),a!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=a),!((t=this.removedTransforms)===null||t===void 0)&&t.length&&this.removedTransforms.forEach(([l,c])=>{e.getValue(l).set(c)}),this.resolveNoneKeyframes()}};var yc=(n,t)=>t==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(ln.test(n)||n==="0")&&!n.startsWith("url("));function Z0(n){let t=n[0];if(n.length===1)return!0;for(let e=0;e<n.length;e++)if(n[e]!==t)return!0}function bf(n,t,e,i){let s=n[0];if(s===null)return!1;if(t==="display"||t==="visibility")return!0;let r=n[n.length-1],o=yc(s,t),a=yc(r,t);return pi(o===a,`You are trying to animate ${t} from "${s}" to "${r}". ${s} is not an animatable value - to enable this animation set ${s} to a value animatable to ${r} via the \`style\` property.`),!o||!a?!1:Z0(n)||(e==="spring"||mi(e))&&i}var K0=n=>n!==null;function Si(n,{repeat:t,repeatType:e="loop"},i){let s=n.filter(K0),r=t&&e!=="loop"&&t%2===1?0:s.length-1;return!r||i===void 0?s[r]:i}var J0=40,Us=class{constructor({autoplay:t=!0,delay:e=0,type:i="keyframes",repeat:s=0,repeatDelay:r=0,repeatType:o="loop",...a}){this.isStopped=!1,this.hasAttemptedResolve=!1,this.createdAt=an.now(),this.options={autoplay:t,delay:e,type:i,repeat:s,repeatDelay:r,repeatType:o,...a},this.updateFinishedPromise()}calcStartTime(){return this.resolvedAt?this.resolvedAt-this.createdAt>J0?this.resolvedAt:this.createdAt:this.createdAt}get resolved(){return!this._resolved&&!this.hasAttemptedResolve&&vf(),this._resolved}onKeyframesResolved(t,e){this.resolvedAt=an.now(),this.hasAttemptedResolve=!0;let{name:i,type:s,velocity:r,delay:o,onComplete:a,onUpdate:l,isGenerator:c}=this.options;if(!c&&!bf(t,i,s,r))if(Go.current||!o){l&&l(Si(t,this.options,e)),a&&a(),this.resolveFinishedPromise();return}else this.options.duration=0;let h=this.initPlayback(t,e);h!==!1&&(this._resolved={keyframes:t,finalKeyframe:e,...h},this.onPostResolved())}onPostResolved(){}then(t,e){return this.currentFinishedPromise.then(t,e)}flatten(){this.options.type="keyframes",this.options.ease="linear"}updateFinishedPromise(){this.currentFinishedPromise=new Promise(t=>{this.resolveFinishedPromise=t})}};function vc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*(2/3-e)*6:n}function Tf({hue:n,saturation:t,lightness:e,alpha:i}){n/=360,t/=100,e/=100;let s=0,r=0,o=0;if(!t)s=r=o=e;else{let a=e<.5?e*(1+t):e+t-e*t,l=2*e-a;s=vc(l,a,n+1/3),r=vc(l,a,n),o=vc(l,a,n-1/3)}return{red:Math.round(s*255),green:Math.round(r*255),blue:Math.round(o*255),alpha:i}}function Ns(n,t){return e=>e>0?t:n}var Mc=(n,t,e)=>{let i=n*n,s=e*(t*t-i)+i;return s<0?0:Math.sqrt(s)},Q0=[kr,Un,vi],j0=n=>Q0.find(t=>t.test(n));function Ef(n){let t=j0(n);if(pi(!!t,`'${n}' is not an animatable color. Use the equivalent color code instead.`),!t)return!1;let e=t.parse(n);return t===vi&&(e=Tf(e)),e}var Sc=(n,t)=>{let e=Ef(n),i=Ef(t);if(!e||!i)return Ns(n,t);let s={...e};return r=>(s.red=Mc(e.red,i.red,r),s.green=Mc(e.green,i.green,r),s.blue=Mc(e.blue,i.blue,r),s.alpha=In(e.alpha,i.alpha,r),Un.transform(s))};var t_=(n,t)=>e=>t(n(e)),Fs=(...n)=>n.reduce(t_);var na=new Set(["none","hidden"]);function wf(n,t){return na.has(n)?e=>e<=0?n:t:e=>e>=1?t:n}function e_(n,t){return e=>In(n,t,e)}function ia(n){return typeof n=="number"?e_:typeof n=="string"?Ds(n)?Ns:Se.test(n)?Sc:s_:Array.isArray(n)?Af:typeof n=="object"?Se.test(n)?Sc:n_:Ns}function Af(n,t){let e=[...n],i=e.length,s=n.map((r,o)=>ia(r)(r,t[o]));return r=>{for(let o=0;o<i;o++)e[o]=s[o](r);return e}}function n_(n,t){let e={...n,...t},i={};for(let s in e)n[s]!==void 0&&t[s]!==void 0&&(i[s]=ia(n[s])(n[s],t[s]));return s=>{for(let r in i)e[r]=i[r](s);return e}}function i_(n,t){var e;let i=[],s={color:0,var:0,number:0};for(let r=0;r<t.values.length;r++){let o=t.types[r],a=n.indexes[o][s[o]],l=(e=n.values[a])!==null&&e!==void 0?e:0;i[r]=l,s[o]++}return i}var s_=(n,t)=>{let e=ln.createTransformer(t),i=Gi(n),s=Gi(t);return i.indexes.var.length===s.indexes.var.length&&i.indexes.color.length===s.indexes.color.length&&i.indexes.number.length>=s.indexes.number.length?na.has(n)&&!s.values.length||na.has(t)&&!i.values.length?wf(n,t):Fs(Af(i_(i,s),s.values),e):(pi(!0,`Complex values '${n}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`),Ns(n,t))};function sa(n,t,e){return typeof n=="number"&&typeof t=="number"&&typeof e=="number"?In(n,t,e):ia(n)(n,t)}function bc({keyframes:n,velocity:t=0,power:e=.8,timeConstant:i=325,bounceDamping:s=10,bounceStiffness:r=500,modifyTarget:o,min:a,max:l,restDelta:c=.5,restSpeed:h}){let u=n[0],d={done:!1,value:u},p=I=>a!==void 0&&I<a||l!==void 0&&I>l,g=I=>a===void 0?l:l===void 0||Math.abs(a-I)<Math.abs(l-I)?a:l,_=e*t,m=u+_,f=o===void 0?m:o(m);f!==m&&(_=f-u);let T=I=>-_*Math.exp(-I/i),v=I=>f+T(I),M=I=>{let S=T(I),y=v(I);d.done=Math.abs(S)<=c,d.value=d.done?f:y},P,w,R=I=>{p(d.value)&&(P=I,w=Ss({keyframes:[d.value,g(d.value)],velocity:Io(v,I,d.value),damping:s,stiffness:r,restDelta:c,restSpeed:h}))};return R(0),{calculatedDuration:null,next:I=>{let S=!1;return!w&&P===void 0&&(S=!0,M(I),R(I)),P!==void 0&&I>=P?w.next(I-P):(!S&&M(I),d)}}}var Cf=_i(.42,0,1,1),Rf=_i(0,0,.58,1),ra=_i(.42,0,.58,1);var Pf={linear:Ue,easeIn:Cf,easeInOut:ra,easeOut:Rf,circIn:$o,circInOut:Zo,circOut:jd,backIn:zr,backInOut:Yo,backOut:cc,anticipate:qo},Tc=n=>{if(Or(n)){_n(n.length===4,"Cubic bezier arrays must contain four numerical values.");let[t,e,i,s]=n;return _i(t,e,i,s)}else if(typeof n=="string")return _n(Pf[n]!==void 0,`Invalid easing type '${n}'`),Pf[n];return n};function r_(n,t,e){let i=[],s=e||sa,r=n.length-1;for(let o=0;o<r;o++){let a=s(n[o],n[o+1]);if(t){let l=Array.isArray(t)?t[o]||Ue:t;a=Fs(l,a)}i.push(a)}return i}function oa(n,t,{clamp:e=!0,ease:i,mixer:s}={}){let r=n.length;if(_n(r===t.length,"Both input and output ranges must be the same length"),r===1)return()=>t[0];if(r===2&&t[0]===t[1])return()=>t[1];let o=n[0]===n[1];n[0]>n[r-1]&&(n=[...n].reverse(),t=[...t].reverse());let a=r_(t,i,s),l=a.length,c=h=>{if(o&&h<n[0])return t[0];let u=0;if(l>1)for(;u<n.length-2&&!(h<n[u+1]);u++);let d=Pn(n[u],n[u+1],h);return a[u](d)};return e?h=>c(Ve(n[0],n[r-1],h)):c}function If(n,t){return n.map(e=>e*t)}function o_(n,t){return n.map(()=>t||ra).splice(0,n.length-1)}function Wr({duration:n=300,keyframes:t,times:e,ease:i="easeInOut"}){let s=Lo(i)?i.map(Tc):Tc(i),r={done:!1,value:t[0]},o=If(e&&e.length===t.length?e:bs(t),n),a=oa(o,t,{ease:Array.isArray(s)?s:o_(t,s)});return{calculatedDuration:n,next:l=>(r.value=a(l),r.done=l>=n,r)}}var Df=n=>{let t=({timestamp:e})=>n(e);return{start:()=>ye.update(t,!0),stop:()=>$n(t),now:()=>gi.isProcessing?gi.timestamp:an.now()}};var a_={decay:bc,inertia:bc,tween:Wr,keyframes:Wr,spring:Ss},l_=n=>n/100,Yi=class extends Us{constructor(t){super(t),this.holdTime=null,this.cancelTime=null,this.currentTime=0,this.playbackSpeed=1,this.pendingPlayState="running",this.startTime=null,this.state="idle",this.stop=()=>{if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.teardown();let{onStop:l}=this.options;l&&l()};let{name:e,motionValue:i,element:s,keyframes:r}=this.options,o=s?.KeyframeResolver||Mi,a=(l,c)=>this.onKeyframesResolved(l,c);this.resolver=new o(r,a,e,i,s),this.resolver.scheduleResolve()}flatten(){super.flatten(),this._resolved&&Object.assign(this._resolved,this.initPlayback(this._resolved.keyframes))}initPlayback(t){let{type:e="keyframes",repeat:i=0,repeatDelay:s=0,repeatType:r,velocity:o=0}=this.options,a=mi(e)?e:a_[e]||Wr,l,c;a!==Wr&&typeof t[0]!="number"&&(l=Fs(l_,sa(t[0],t[1])),t=[0,100]);let h=a({...this.options,keyframes:t});r==="mirror"&&(c=a({...this.options,keyframes:[...t].reverse(),velocity:-o})),h.calculatedDuration===null&&(h.calculatedDuration=vs(h));let{calculatedDuration:u}=h,d=u+s,p=d*(i+1)-s;return{generator:h,mirroredGenerator:c,mapPercentToKeyframes:l,calculatedDuration:u,resolvedDuration:d,totalDuration:p}}onPostResolved(){let{autoplay:t=!0}=this.options;this.play(),this.pendingPlayState==="paused"||!t?this.pause():this.state=this.pendingPlayState}tick(t,e=!1){let{resolved:i}=this;if(!i){let{keyframes:I}=this.options;return{done:!0,value:I[I.length-1]}}let{finalKeyframe:s,generator:r,mirroredGenerator:o,mapPercentToKeyframes:a,keyframes:l,calculatedDuration:c,totalDuration:h,resolvedDuration:u}=i;if(this.startTime===null)return r.next(0);let{delay:d,repeat:p,repeatType:g,repeatDelay:_,onUpdate:m}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-h/this.speed,this.startTime)),e?this.currentTime=t:this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=Math.round(t-this.startTime)*this.speed;let f=this.currentTime-d*(this.speed>=0?1:-1),T=this.speed>=0?f<0:f>h;this.currentTime=Math.max(f,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=h);let v=this.currentTime,M=r;if(p){let I=Math.min(this.currentTime,h)/u,S=Math.floor(I),y=I%1;!y&&I>=1&&(y=1),y===1&&S--,S=Math.min(S,p+1),S%2&&(g==="reverse"?(y=1-y,_&&(y-=_/u)):g==="mirror"&&(M=o)),v=Ve(0,1,y)*u}let P=T?{done:!1,value:l[0]}:M.next(v);a&&(P.value=a(P.value));let{done:w}=P;!T&&c!==null&&(w=this.speed>=0?this.currentTime>=h:this.currentTime<=0);let R=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&w);return R&&s!==void 0&&(P.value=Si(l,this.options,s)),m&&m(P.value),R&&this.finish(),P}get duration(){let{resolved:t}=this;return t?$e(t.calculatedDuration):0}get time(){return $e(this.currentTime)}set time(t){t=Ne(t),this.currentTime=t,this.holdTime!==null||this.speed===0?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.speed)}get speed(){return this.playbackSpeed}set speed(t){let e=this.playbackSpeed!==t;this.playbackSpeed=t,e&&(this.time=$e(this.currentTime))}play(){if(this.resolver.isScheduled||this.resolver.resume(),!this._resolved){this.pendingPlayState="running";return}if(this.isStopped)return;let{driver:t=Df,onPlay:e,startTime:i}=this.options;this.driver||(this.driver=t(r=>this.tick(r))),e&&e();let s=this.driver.now();this.holdTime!==null?this.startTime=s-this.holdTime:this.startTime?this.state==="finished"&&(this.startTime=s):this.startTime=i??this.calcStartTime(),this.state==="finished"&&this.updateFinishedPromise(),this.cancelTime=this.startTime,this.holdTime=null,this.state="running",this.driver.start()}pause(){var t;if(!this._resolved){this.pendingPlayState="paused";return}this.state="paused",this.holdTime=(t=this.currentTime)!==null&&t!==void 0?t:0}complete(){this.state!=="running"&&this.play(),this.pendingPlayState=this.state="finished",this.holdTime=null}finish(){this.teardown(),this.state="finished";let{onComplete:t}=this.options;t&&t()}cancel(){this.cancelTime!==null&&this.tick(this.cancelTime),this.teardown(),this.updateFinishedPromise()}teardown(){this.state="idle",this.stopDriver(),this.resolveFinishedPromise(),this.updateFinishedPromise(),this.startTime=this.cancelTime=null,this.resolver.cancel()}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}};var Lf=new Set(["opacity","clipPath","filter","transform"]);function Uf(n,t,e,{delay:i=0,duration:s=300,repeat:r=0,repeatType:o="loop",ease:a="easeInOut",times:l}={}){let c={[t]:e};l&&(c.offset=l);let h=lc(a,s);return Array.isArray(h)&&(c.easing=h),n.animate(c,{delay:i,duration:s,easing:Array.isArray(h)?"linear":h,fill:"both",iterations:r+1,direction:o==="reverse"?"alternate":"normal"})}var Nf=xs(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));var aa=10,c_=2e4;function h_(n){return mi(n.type)||n.type==="spring"||!ac(n.ease)}function u_(n,t){let e=new Yi({...t,keyframes:n,repeat:0,delay:0,isGenerator:!0}),i={done:!1,value:n[0]},s=[],r=0;for(;!i.done&&r<c_;)i=e.sample(r),s.push(i.value),r+=aa;return{times:void 0,keyframes:s,duration:r-aa,ease:"linear"}}var Ff={anticipate:qo,backInOut:Yo,circInOut:Zo};function d_(n){return n in Ff}var Xr=class extends Us{constructor(t){super(t);let{name:e,motionValue:i,element:s,keyframes:r}=this.options;this.resolver=new Ls(r,(o,a)=>this.onKeyframesResolved(o,a),e,i,s),this.resolver.scheduleResolve()}initPlayback(t,e){let{duration:i=300,times:s,ease:r,type:o,motionValue:a,name:l,startTime:c}=this.options;if(!a.owner||!a.owner.current)return!1;if(typeof r=="string"&&As()&&d_(r)&&(r=Ff[r]),h_(this.options)){let{onComplete:u,onUpdate:d,motionValue:p,element:g,..._}=this.options,m=u_(t,_);t=m.keyframes,t.length===1&&(t[1]=t[0]),i=m.duration,s=m.times,r=m.ease,o="keyframes"}let h=Uf(a.owner.current,l,t,{...this.options,duration:i,times:s,ease:r});return h.startTime=c??this.calcStartTime(),this.pendingTimeline?(rc(h,this.pendingTimeline),this.pendingTimeline=void 0):h.onfinish=()=>{let{onComplete:u}=this.options;a.set(Si(t,this.options,e)),u&&u(),this.cancel(),this.resolveFinishedPromise()},{animation:h,duration:i,times:s,type:o,ease:r,keyframes:t}}get duration(){let{resolved:t}=this;if(!t)return 0;let{duration:e}=t;return $e(e)}get time(){let{resolved:t}=this;if(!t)return 0;let{animation:e}=t;return $e(e.currentTime||0)}set time(t){let{resolved:e}=this;if(!e)return;let{animation:i}=e;i.currentTime=Ne(t)}get speed(){let{resolved:t}=this;if(!t)return 1;let{animation:e}=t;return e.playbackRate}set speed(t){let{resolved:e}=this;if(!e)return;let{animation:i}=e;i.playbackRate=t}get state(){let{resolved:t}=this;if(!t)return"idle";let{animation:e}=t;return e.playState}get startTime(){let{resolved:t}=this;if(!t)return null;let{animation:e}=t;return e.startTime}attachTimeline(t){if(!this._resolved)this.pendingTimeline=t;else{let{resolved:e}=this;if(!e)return Ue;let{animation:i}=e;rc(i,t)}return Ue}play(){if(this.isStopped)return;let{resolved:t}=this;if(!t)return;let{animation:e}=t;e.playState==="finished"&&this.updateFinishedPromise(),e.play()}pause(){let{resolved:t}=this;if(!t)return;let{animation:e}=t;e.pause()}stop(){if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.resolveFinishedPromise(),this.updateFinishedPromise();let{resolved:t}=this;if(!t)return;let{animation:e,keyframes:i,duration:s,type:r,ease:o,times:a}=t;if(e.playState==="idle"||e.playState==="finished")return;if(this.time){let{motionValue:c,onUpdate:h,onComplete:u,element:d,...p}=this.options,g=new Yi({...p,keyframes:i,duration:s,type:r,ease:o,times:a,isGenerator:!0}),_=Ne(this.time);c.setWithVelocity(g.sample(_-aa).value,g.sample(_).value,aa)}let{onStop:l}=this.options;l&&l(),this.cancel()}complete(){let{resolved:t}=this;t&&t.animation.finish()}cancel(){let{resolved:t}=this;t&&t.animation.cancel()}static supports(t){let{motionValue:e,name:i,repeatDelay:s,repeatType:r,damping:o,type:a}=t;if(!e||!e.owner||!(e.owner.current instanceof HTMLElement))return!1;let{onUpdate:l,transformTemplate:c}=e.owner.getProps();return Nf()&&i&&Lf.has(i)&&!l&&!c&&!s&&r!=="mirror"&&o!==0&&a!=="inertia"}};var f_={type:"spring",stiffness:500,damping:25,restSpeed:10},p_=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),m_={type:"keyframes",duration:.8},g_={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},Of=(n,{keyframes:t})=>t.length>2?m_:on.has(n)?n.startsWith("scale")?p_(t[1]):f_:g_;function Bf({when:n,delay:t,delayChildren:e,staggerChildren:i,staggerDirection:s,repeat:r,repeatType:o,repeatDelay:a,from:l,elapsed:c,...h}){return!!Object.keys(h).length}var la=(n,t,e,i={},s,r)=>o=>{let a=Bo(i,n)||{},l=a.delay||i.delay||0,{elapsed:c=0}=i;c=c-Ne(l);let h={keyframes:Array.isArray(e)?e:[null,e],ease:"easeOut",velocity:t.getVelocity(),...a,delay:-c,onUpdate:d=>{t.set(d),a.onUpdate&&a.onUpdate(d)},onComplete:()=>{o(),a.onComplete&&a.onComplete()},name:n,motionValue:t,element:r?void 0:s};Bf(a)||(h={...h,...Of(n,h)}),h.duration&&(h.duration=Ne(h.duration)),h.repeatDelay&&(h.repeatDelay=Ne(h.repeatDelay)),h.from!==void 0&&(h.keyframes[0]=h.from);let u=!1;if((h.type===!1||h.duration===0&&!h.repeatDelay)&&(h.duration=0,h.delay===0&&(u=!0)),(Go.current||Ts.skipAnimations)&&(u=!0,h.duration=0,h.delay=0),u&&!r&&t.get()!==void 0){let d=Si(h.keyframes,a);if(d!==void 0)return ye.update(()=>{h.onUpdate(d),h.onComplete()}),new ys([])}return!r&&Xr.supports(h)?new Xr(h):new Yi(h)};function __({protectedKeys:n,needsAnimating:t},e){let i=n.hasOwnProperty(e)&&t[e]!==!0;return t[e]=!1,i}function zf(n,t,{delay:e=0,transitionOverride:i,type:s}={}){var r;let{transition:o=n.getDefaultTransition(),transitionEnd:a,...l}=t;i&&(o=i);let c=[],h=s&&n.animationState&&n.animationState.getState()[s];for(let u in l){let d=n.getValue(u,(r=n.latestValues[u])!==null&&r!==void 0?r:null),p=l[u];if(p===void 0||h&&__(h,u))continue;let g={delay:e,...Bo(o||{},u)},_=!1;if(window.MotionHandoffAnimation){let f=Zd(n);if(f){let T=window.MotionHandoffAnimation(f,u,ye);T!==null&&(g.startTime=T,_=!0)}}qd(n,u),d.start(la(u,d,p,n.shouldReduceMotion&&zo.has(u)?{type:!1}:g,n,_));let m=d.animation;m&&c.push(m)}return a&&Promise.all(c).then(()=>{ye.update(()=>{a&&Xd(n,a)})}),c}function Vf(n){return n instanceof SVGElement&&n.tagName!=="svg"}var kf=()=>({min:0,max:0}),Os=()=>({x:kf(),y:kf()});var Hf={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},ca={};for(let n in Hf)ca[n]={isEnabled:t=>Hf[n].some(e=>!!t[e])};var Gf=typeof window<"u";var Yr={current:null},ha={current:!1};function Wf(){if(ha.current=!0,!!Gf)if(window.matchMedia){let n=window.matchMedia("(prefers-reduced-motion)"),t=()=>Yr.current=n.matches;n.addListener(t),t()}else Yr.current=!1}var x_=[..._c,Se,ln],Xf=n=>x_.find(ea(n));function Yf(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function qf(n){return typeof n=="string"||Array.isArray(n)}var y_=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],$f=["initial",...y_];function Ec(n){return Yf(n.animate)||$f.some(t=>qf(n[t]))}function Zf(n){return!!(Ec(n)||n.variants)}function Kf(n,t,e){for(let i in t){let s=t[i],r=e[i];if(fe(s))n.addValue(i,s);else if(fe(r))n.addValue(i,Zn(s,{owner:n}));else if(r!==s)if(n.hasValue(i)){let o=n.getValue(i);o.liveStyle===!0?o.jump(s):o.hasAnimated||o.set(s)}else{let o=n.getStaticValue(i);n.addValue(i,Zn(o!==void 0?o:s,{owner:n}))}}for(let i in e)t[i]===void 0&&n.removeValue(i);return t}var Jf=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],Bs=class{scrapeMotionValuesFromProps(t,e,i){return{}}constructor({parent:t,props:e,presenceContext:i,reducedMotionConfig:s,blockInitialAnimation:r,visualState:o},a={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=Mi,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let p=an.now();this.renderScheduledAt<p&&(this.renderScheduledAt=p,ye.render(this.render,!1,!0))};let{latestValues:l,renderState:c,onUpdate:h}=o;this.onUpdate=h,this.latestValues=l,this.baseTarget={...l},this.initialValues=e.initial?{...l}:{},this.renderState=c,this.parent=t,this.props=e,this.presenceContext=i,this.depth=t?t.depth+1:0,this.reducedMotionConfig=s,this.options=a,this.blockInitialAnimation=!!r,this.isControllingVariants=Ec(e),this.isVariantNode=Zf(e),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);let{willChange:u,...d}=this.scrapeMotionValuesFromProps(e,{},this);for(let p in d){let g=d[p];l[p]!==void 0&&fe(g)&&g.set(l[p],!1)}}mount(t){this.current=t,qn.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((e,i)=>this.bindToMotionValue(i,e)),ha.current||Wf(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:Yr.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){qn.delete(this.current),this.projection&&this.projection.unmount(),$n(this.notifyUpdate),$n(this.render),this.valueSubscriptions.forEach(t=>t()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(let t in this.events)this.events[t].clear();for(let t in this.features){let e=this.features[t];e&&(e.unmount(),e.isMounted=!1)}this.current=null}bindToMotionValue(t,e){this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)();let i=on.has(t),s=e.on("change",a=>{this.latestValues[t]=a,this.props.onUpdate&&ye.preRender(this.notifyUpdate),i&&this.projection&&(this.projection.isTransformDirty=!0)}),r=e.on("renderRequest",this.scheduleRender),o;window.MotionCheckAppearSync&&(o=window.MotionCheckAppearSync(this,t,e)),this.valueSubscriptions.set(t,()=>{s(),r(),o&&o(),e.owner&&e.stop()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}updateFeatures(){let t="animation";for(t in ca){let e=ca[t];if(!e)continue;let{isEnabled:i,Feature:s}=e;if(!this.features[t]&&s&&i(this.props)&&(this.features[t]=new s(this)),this.features[t]){let r=this.features[t];r.isMounted?r.update():(r.mount(),r.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Os()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,e){this.latestValues[t]=e}update(t,e){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=e;for(let i=0;i<Jf.length;i++){let s=Jf[i];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);let r="on"+s,o=t[r];o&&(this.propEventSubscriptions[s]=this.on(s,o))}this.prevMotionValues=Kf(this,this.scrapeMotionValuesFromProps(t,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue(),this.onUpdate&&this.onUpdate(this)}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(t){let e=this.getClosestVariantNode();if(e)return e.variantChildren&&e.variantChildren.add(t),()=>e.variantChildren.delete(t)}addValue(t,e){let i=this.values.get(t);e!==i&&(i&&this.removeValue(t),this.bindToMotionValue(t,e),this.values.set(t,e),this.latestValues[t]=e.get())}removeValue(t){this.values.delete(t);let e=this.valueSubscriptions.get(t);e&&(e(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,e){if(this.props.values&&this.props.values[t])return this.props.values[t];let i=this.values.get(t);return i===void 0&&e!==void 0&&(i=Zn(e===null?void 0:e,{owner:this}),this.addValue(t,i)),i}readValue(t,e){var i;let s=this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:(i=this.getBaseTargetFromProps(this.props,t))!==null&&i!==void 0?i:this.readValueFromInstance(this.current,t,this.options);return s!=null&&(typeof s=="string"&&(jo(s)||Ko(s))?s=parseFloat(s):!Xf(s)&&ln.test(e)&&(s=Qo(t,e)),this.setBaseTarget(t,fe(s)?s.get():s)),fe(s)?s.get():s}setBaseTarget(t,e){this.baseTarget[t]=e}getBaseTarget(t){var e;let{initial:i}=this.props,s;if(typeof i=="string"||typeof i=="object"){let o=Ho(this.props,i,(e=this.presenceContext)===null||e===void 0?void 0:e.custom);o&&(s=o[t])}if(i&&s!==void 0)return s;let r=this.getBaseTargetFromProps(this.props,t);return r!==void 0&&!fe(r)?r:this.initialValues[t]!==void 0&&s===void 0?void 0:this.baseTarget[t]}on(t,e){return this.events[t]||(this.events[t]=new Es),this.events[t].add(e)}notify(t,...e){this.events[t]&&this.events[t].notify(...e)}};var zs=class extends Bs{constructor(){super(...arguments),this.KeyframeResolver=Ls}sortInstanceNodePosition(t,e){return t.compareDocumentPosition(e)&2?1:-1}getBaseTargetFromProps(t,e){return t.style?t.style[e]:void 0}removeValueFromRenderState(t,{vars:e,style:i}){delete e[t],delete i[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:t}=this.props;fe(t)&&(this.childSubscription=t.on("change",e=>{this.current&&(this.current.textContent=`${e}`)}))}};var ua=(n,t)=>t&&typeof n=="number"?t.transform(n):n;var v_={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},M_=Dn.length;function Qf(n,t,e){let i="",s=!0;for(let r=0;r<M_;r++){let o=Dn[r],a=n[o];if(a===void 0)continue;let l=!0;if(typeof a=="number"?l=a===(o.startsWith("scale")?1:0):l=parseFloat(a)===0,!l||e){let c=ua(a,Ps[o]);if(!l){s=!1;let h=v_[o]||o;i+=`${h}(${c}) `}e&&(t[o]=c)}}return i=i.trim(),e?i=e(t,s?"":i):s&&(i="none"),i}function da(n,t,e){let{style:i,vars:s,transformOrigin:r}=n,o=!1,a=!1;for(let l in t){let c=t[l];if(on.has(l)){o=!0;continue}else if(ta(l)){s[l]=c;continue}else{let h=ua(c,Ps[l]);l.startsWith("origin")?(a=!0,r[l]=h):i[l]=h}}if(t.transform||(o||e?i.transform=Qf(t,n.transform,e):i.transform&&(i.transform="none")),a){let{originX:l="50%",originY:c="50%",originZ:h=0}=r;i.transformOrigin=`${l} ${c} ${h}`}}var S_={offset:"stroke-dashoffset",array:"stroke-dasharray"},b_={offset:"strokeDashoffset",array:"strokeDasharray"};function jf(n,t,e=1,i=0,s=!0){n.pathLength=1;let r=s?S_:b_;n[r.offset]=Ut.transform(-i);let o=Ut.transform(t),a=Ut.transform(e);n[r.array]=`${o} ${a}`}function tp(n,t,e){return typeof n=="string"?n:Ut.transform(t+e*n)}function ep(n,t,e){let i=tp(t,n.x,n.width),s=tp(e,n.y,n.height);return`${i} ${s}`}function np(n,{attrX:t,attrY:e,attrScale:i,originX:s,originY:r,pathLength:o,pathSpacing:a=1,pathOffset:l=0,...c},h,u){if(da(n,c,u),h){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};let{attrs:d,style:p,dimensions:g}=n;d.transform&&(g&&(p.transform=d.transform),delete d.transform),g&&(s!==void 0||r!==void 0||p.transform)&&(p.transformOrigin=ep(g,s!==void 0?s:.5,r!==void 0?r:.5)),t!==void 0&&(d.x=t),e!==void 0&&(d.y=e),i!==void 0&&(d.scale=i),o!==void 0&&jf(d,o,a,l,!1)}var fa=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);var ip=n=>typeof n=="string"&&n.toLowerCase()==="svg";function pa(n,{style:t,vars:e},i,s){Object.assign(n.style,t,s&&s.getProjectionStyles(i));for(let r in e)n.style.setProperty(r,e[r])}function sp(n,t,e,i){pa(n,t,void 0,i);for(let s in t.attrs)n.setAttribute(fa.has(s)?s:ws(s),t.attrs[s])}var rp={};function op(n,{layout:t,layoutId:e}){return on.has(n)||n.startsWith("origin")||(t||e!==void 0)&&(!!rp[n]||n==="opacity")}function ma(n,t,e){var i;let{style:s}=n,r={};for(let o in s)(fe(s[o])||t.style&&fe(t.style[o])||op(o,n)||((i=e?.getValue(o))===null||i===void 0?void 0:i.liveStyle)!==void 0)&&(r[o]=s[o]);return r}function ap(n,t,e){let i=ma(n,t,e);for(let s in n)if(fe(n[s])||fe(t[s])){let r=Dn.indexOf(s)!==-1?"attr"+s.charAt(0).toUpperCase()+s.substring(1):s;i[r]=n[s]}return i}var ga=class extends zs{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Os}getBaseTargetFromProps(t,e){return t[e]}readValueFromInstance(t,e){if(on.has(e)){let i=Is(e);return i&&i.default||0}return e=fa.has(e)?e:ws(e),t.getAttribute(e)}scrapeMotionValuesFromProps(t,e,i){return ap(t,e,i)}build(t,e,i){np(t,e,this.isSVGTag,i.transformTemplate)}renderInstance(t,e,i,s){sp(t,e,i,s)}mount(t){this.isSVGTag=ip(t.tagName),super.mount(t)}};function lp({top:n,left:t,right:e,bottom:i}){return{x:{min:t,max:e},y:{min:n,max:i}}}function cp(n,t){if(!t)return n;let e=t({x:n.left,y:n.top}),i=t({x:n.right,y:n.bottom});return{top:e.y,left:e.x,bottom:i.y,right:i.x}}function hp(n,t){return lp(cp(n.getBoundingClientRect(),t))}function T_(n){return window.getComputedStyle(n)}var _a=class extends zs{constructor(){super(...arguments),this.type="html",this.renderInstance=pa}readValueFromInstance(t,e){if(on.has(e)){let i=Is(e);return i&&i.default||0}else{let i=T_(t),s=(ta(e)?i.getPropertyValue(e):i[e])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(t,{transformPagePoint:e}){return hp(t,e)}build(t,e,i){da(t,e,i.transformTemplate)}scrapeMotionValuesFromProps(t,e,i){return ma(t,e,i)}};function E_(n,t){return n in t}var xa=class extends Bs{constructor(){super(...arguments),this.type="object"}readValueFromInstance(t,e){if(E_(e,t)){let i=t[e];if(typeof i=="string"||typeof i=="number")return i}}getBaseTargetFromProps(){}removeValueFromRenderState(t,e){delete e.output[t]}measureInstanceViewportBox(){return Os()}build(t,e){Object.assign(t.output,e)}renderInstance(t,{output:e}){Object.assign(t,e)}sortInstanceNodePosition(){return 0}};function up(n){let t={presenceContext:null,props:{},visualState:{renderState:{transform:{},transformOrigin:{},style:{},vars:{},attrs:{}},latestValues:{}}},e=Vf(n)?new ga(t):new _a(t);e.mount(n),qn.set(n,e)}function dp(n){let t={presenceContext:null,props:{},visualState:{renderState:{output:{}},latestValues:{}}},e=new xa(t);e.mount(n),qn.set(n,e)}function fp(n,t,e){let i=fe(n)?n:Zn(n);return i.start(la("",i,t,e)),i.animation}function w_(n,t){return fe(n)||typeof n=="number"||typeof n=="string"&&!Fr(t)}function ya(n,t,e,i){let s=[];if(w_(n,t))s.push(fp(n,Fr(t)&&t.default||t,e&&(e.default||e)));else{let r=Fo(n,t,i),o=r.length;_n(!!o,"No valid elements provided.");for(let a=0;a<o;a++){let l=r[a],c=l instanceof Element?up:dp;qn.has(l)||c(l);let h=qn.get(l),u={...e};"delay"in u&&typeof u.delay=="function"&&(u.delay=u.delay(a,o)),s.push(...zf(h,{...t,transition:u},{}))}}return s}function pp(n,t,e){let i=[];return Fd(n,t,e,{spring:Ss}).forEach(({keyframes:r,transition:o},a)=>{i.push(...ya(a,r,o))}),i}function A_(n){return Array.isArray(n)&&n.some(Array.isArray)}function mp(n){function t(e,i,s){let r=[];A_(e)?r=pp(e,i,n):r=ya(e,i,s,n);let o=new ys(r);return n&&n.animations.push(o),o}return t}var wc=mp();function Ac(n,t){let e,i=()=>{let{currentTime:s}=t,o=(s===null?0:s.value)/100;e!==o&&n(o),e=o};return ye.update(i,!0),()=>$n(i)}var va=new WeakMap,bi;function C_(n,t){if(t){let{inlineSize:e,blockSize:i}=t[0];return{width:e,height:i}}else return n instanceof SVGElement&&"getBBox"in n?n.getBBox():{width:n.offsetWidth,height:n.offsetHeight}}function R_({target:n,contentRect:t,borderBoxSize:e}){var i;(i=va.get(n))===null||i===void 0||i.forEach(s=>{s({target:n,contentSize:t,get size(){return C_(n,e)}})})}function P_(n){n.forEach(R_)}function I_(){typeof ResizeObserver>"u"||(bi=new ResizeObserver(P_))}function gp(n,t){bi||I_();let e=_s(n);return e.forEach(i=>{let s=va.get(i);s||(s=new Set,va.set(i,s)),s.add(t),bi?.observe(i)}),()=>{e.forEach(i=>{let s=va.get(i);s?.delete(t),s?.size||bi?.unobserve(i)})}}var Ma=new Set,qr;function D_(){qr=()=>{let n={width:window.innerWidth,height:window.innerHeight},t={target:window,size:n,contentSize:n};Ma.forEach(e=>e(t))},window.addEventListener("resize",qr)}function _p(n){return Ma.add(n),qr||D_(),()=>{Ma.delete(n),!Ma.size&&qr&&(qr=void 0)}}function xp(n,t){return typeof n=="function"?_p(n):gp(n,t)}var L_=50,yp=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Mp=()=>({time:0,x:yp(),y:yp()}),U_={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function vp(n,t,e,i){let s=e[t],{length:r,position:o}=U_[t],a=s.current,l=e.time;s.current=n[`scroll${o}`],s.scrollLength=n[`scroll${r}`]-n[`client${r}`],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=Pn(0,s.scrollLength,s.current);let c=i-l;s.velocity=c>L_?0:Ms(s.current-a,c)}function Sp(n,t,e){vp(n,"x",t,e),vp(n,"y",t,e),t.time=e}function bp(n,t){let e={x:0,y:0},i=n;for(;i&&i!==t;)if(i instanceof HTMLElement)e.x+=i.offsetLeft,e.y+=i.offsetTop,i=i.offsetParent;else if(i.tagName==="svg"){let s=i.getBoundingClientRect();i=i.parentElement;let r=i.getBoundingClientRect();e.x+=s.left-r.left,e.y+=s.top-r.top}else if(i instanceof SVGGraphicsElement){let{x:s,y:r}=i.getBBox();e.x+=s,e.y+=r;let o=null,a=i.parentNode;for(;!o;)a.tagName==="svg"&&(o=a),a=i.parentNode;i=o}else break;return e}var Sa={start:0,center:.5,end:1};function Cc(n,t,e=0){let i=0;if(n in Sa&&(n=Sa[n]),typeof n=="string"){let s=parseFloat(n);n.endsWith("px")?i=s:n.endsWith("%")?n=s/100:n.endsWith("vw")?i=s/100*document.documentElement.clientWidth:n.endsWith("vh")?i=s/100*document.documentElement.clientHeight:n=s}return typeof n=="number"&&(i=t*n),e+i}var N_=[0,0];function Tp(n,t,e,i){let s=Array.isArray(n)?n:N_,r=0,o=0;return typeof n=="number"?s=[n,n]:typeof n=="string"&&(n=n.trim(),n.includes(" ")?s=n.split(" "):s=[n,Sa[n]?n:"0"]),r=Cc(s[0],e,i),o=Cc(s[1],t),r-o}var Ep={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]};var F_={x:0,y:0};function O_(n){return"getBBox"in n&&n.tagName!=="svg"?n.getBBox():{width:n.clientWidth,height:n.clientHeight}}function wp(n,t,e){let{offset:i=Ep.All}=e,{target:s=n,axis:r="y"}=e,o=r==="y"?"height":"width",a=s!==n?bp(s,n):F_,l=s===n?{width:n.scrollWidth,height:n.scrollHeight}:O_(s),c={width:n.clientWidth,height:n.clientHeight};t[r].offset.length=0;let h=!t[r].interpolate,u=i.length;for(let d=0;d<u;d++){let p=Tp(i[d],c[o],l[o],a[r]);!h&&p!==t[r].interpolatorOffsets[d]&&(h=!0),t[r].offset[d]=p}h&&(t[r].interpolate=oa(t[r].offset,bs(i),{clamp:!1}),t[r].interpolatorOffsets=[...t[r].offset]),t[r].progress=Ve(0,1,t[r].interpolate(t[r].current))}function B_(n,t=n,e){if(e.x.targetOffset=0,e.y.targetOffset=0,t!==n){let i=t;for(;i&&i!==n;)e.x.targetOffset+=i.offsetLeft,e.y.targetOffset+=i.offsetTop,i=i.offsetParent}e.x.targetLength=t===n?t.scrollWidth:t.clientWidth,e.y.targetLength=t===n?t.scrollHeight:t.clientHeight,e.x.containerLength=n.clientWidth,e.y.containerLength=n.clientHeight}function Ap(n,t,e,i={}){return{measure:()=>B_(n,i.target,e),update:s=>{Sp(n,e,s),(i.offset||i.target)&&wp(n,e,i)},notify:()=>t(e)}}var $r=new WeakMap,Cp=new WeakMap,Rc=new WeakMap,Rp=n=>n===document.documentElement?window:n;function ba(n,{container:t=document.documentElement,...e}={}){let i=Rc.get(t);i||(i=new Set,Rc.set(t,i));let s=Mp(),r=Ap(t,n,s,e);if(i.add(r),!$r.has(t)){let a=()=>{for(let d of i)d.measure()},l=()=>{for(let d of i)d.update(gi.timestamp)},c=()=>{for(let d of i)d.notify()},h=()=>{ye.read(a,!1,!0),ye.read(l,!1,!0),ye.update(c,!1,!0)};$r.set(t,h);let u=Rp(t);window.addEventListener("resize",h,{passive:!0}),t!==document.documentElement&&Cp.set(t,xp(t,h)),u.addEventListener("scroll",h,{passive:!0})}let o=$r.get(t);return ye.read(o,!1,!0),()=>{var a;$n(o);let l=Rc.get(t);if(!l||(l.delete(r),l.size))return;let c=$r.get(t);$r.delete(t),c&&(Rp(t).removeEventListener("scroll",c),(a=Cp.get(t))===null||a===void 0||a(),window.removeEventListener("resize",c))}}function z_({source:n,container:t,axis:e="y"}){n&&(t=n);let i={value:0},s=ba(r=>{i.value=r[e].progress*100},{container:t,axis:e});return{currentTime:i,cancel:s}}var Pc=new Map;function Pp({source:n,container:t=document.documentElement,axis:e="y"}={}){n&&(t=n),Pc.has(t)||Pc.set(t,{});let i=Pc.get(t);return i[e]||(i[e]=Co()?new ScrollTimeline({source:t,axis:e}):z_({source:t,axis:e})),i[e]}function V_(n){return n.length===2}function Ip(n){return n&&(n.target||n.offset)}function k_(n,t){return V_(n)||Ip(t)?ba(e=>{n(e[t.axis].progress,e)},t):Ac(n,Pp(t))}function H_(n,t){if(n.flatten(),Ip(t))return n.pause(),ba(e=>{n.time=n.duration*e[t.axis].progress},t);{let e=Pp(t);return n.attachTimeline?n.attachTimeline(e,i=>(i.pause(),Ac(s=>{i.time=i.duration*s},e))):Ue}}function Ic(n,{axis:t="y",...e}={}){let i={axis:t,...e};return typeof n=="function"?k_(n,i):H_(n,i)}var G_={some:0,all:1};function Dc(n,t,{root:e,margin:i,amount:s="some"}={}){let r=_s(n),o=new WeakMap,a=c=>{c.forEach(h=>{let u=o.get(h.target);if(h.isIntersecting!==!!u)if(h.isIntersecting){let d=t(h.target,h);typeof d=="function"?o.set(h.target,d):l.unobserve(h.target)}else typeof u=="function"&&(u(h),o.delete(h.target))})},l=new IntersectionObserver(a,{root:e,rootMargin:i,threshold:typeof s=="number"?s:G_[s]});return r.forEach(c=>l.observe(c)),()=>l.disconnect()}var W_=0,Dp=1,X_=2;var Hm=1,Y_=2,ni=3,Ui=0,Ze=1,Mn=2,Ii=0,rr=1,cr=2,Lp=3,Up=4,q_=5,ts=100,$_=101,Z_=102,K_=103,J_=104,Q_=200,j_=201,tx=202,ex=203,gh=204,_h=205,nx=206,ix=207,sx=208,rx=209,ox=210,ax=211,lx=212,cx=213,hx=214,xh=0,yh=1,vh=2,hr=3,Mh=4,Sh=5,bh=6,Th=7,Gm=0,ux=1,dx=2,Di=0,fx=1,px=2,mx=3,gx=4,_x=5,xx=6,yx=7;var Wm=300,ur=301,dr=302,Eh=303,wh=304,Ul=306,Ah=1e3,ns=1001,Ch=1002,bn=1003,vx=1004;var Ta=1005;var Bn=1006,Lc=1007;var is=1008;var li=1009,Xm=1010,Ym=1011,ao=1012,Nu=1013,ss=1014,ri=1015,po=1016,Fu=1017,Ou=1018,fr=1020,qm=35902,$m=1021,Zm=1022,Sn=1023,Km=1024,Jm=1025,or=1026,pr=1027,Qm=1028,Bu=1029,jm=1030,zu=1031;var Vu=1033,il=33776,sl=33777,rl=33778,ol=33779,Rh=35840,Ph=35841,Ih=35842,Dh=35843,Lh=36196,Uh=37492,Nh=37496,Fh=37808,Oh=37809,Bh=37810,zh=37811,Vh=37812,kh=37813,Hh=37814,Gh=37815,Wh=37816,Xh=37817,Yh=37818,qh=37819,$h=37820,Zh=37821,al=36492,Kh=36494,Jh=36495,tg=36283,Qh=36284,jh=36285,tu=36286;var cl=2300,eu=2301,Uc=2302,Np=2400,Fp=2401,Op=2402;var Mx=3200,Sx=3201;var eg=0,bx=1,Pi="",hn="srgb",Tr="srgb-linear",Nl="linear",ie="srgb";var Vs=7680;var Bp=519,Tx=512,Ex=513,wx=514,ng=515,Ax=516,Cx=517,Rx=518,Px=519,nu=35044;var zp="300 es",oi=2e3,hl=2001,Ni=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ll=Math.PI/180,iu=180/Math.PI;function Li(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]).toLowerCase()}function Be(n,t,e){return Math.max(t,Math.min(e,n))}function Ix(n,t){return(n%t+t)%t}function Nc(n,t,e){return(1-e)*n+e*t}function On(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function se(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Gt=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Be(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ht=class n{constructor(t,e,i,s,r,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],p=i[5],g=i[8],_=s[0],m=s[3],f=s[6],T=s[1],v=s[4],M=s[7],P=s[2],w=s[5],R=s[8];return r[0]=o*_+a*T+l*P,r[3]=o*m+a*v+l*w,r[6]=o*f+a*M+l*R,r[1]=c*_+h*T+u*P,r[4]=c*m+h*v+u*w,r[7]=c*f+h*M+u*R,r[2]=d*_+p*T+g*P,r[5]=d*m+p*v+g*w,r[8]=d*f+p*M+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,p=c*r-o*l,g=e*u+i*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=u*_,t[1]=(s*c-h*i)*_,t[2]=(a*i-s*o)*_,t[3]=d*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=p*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Fc.makeScale(t,e)),this}rotate(t){return this.premultiply(Fc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Fc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Fc=new Ht;function ig(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function ul(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Dx(){let n=ul("canvas");return n.style.display="block",n}var Vp={};function so(n){n in Vp||(Vp[n]=!0,console.warn(n))}function Lx(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function Ux(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Nx(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Qt={enabled:!0,workingColorSpace:Tr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ie&&(n.r=ai(n.r),n.g=ai(n.g),n.b=ai(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ie&&(n.r=ar(n.r),n.g=ar(n.g),n.b=ar(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Pi?Nl:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function ai(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ar(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var kp=[.64,.33,.3,.6,.15,.06],Hp=[.2126,.7152,.0722],Gp=[.3127,.329],Wp=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xp=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qt.define({[Tr]:{primaries:kp,whitePoint:Gp,transfer:Nl,toXYZ:Wp,fromXYZ:Xp,luminanceCoefficients:Hp,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:kp,whitePoint:Gp,transfer:ie,toXYZ:Wp,fromXYZ:Xp,luminanceCoefficients:Hp,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}});var ks,su=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ks===void 0&&(ks=ul("canvas")),ks.width=t.width,ks.height=t.height;let i=ks.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=ks}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ul("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ai(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ai(e[i]/255)*255):e[i]=ai(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Fx=0,dl=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fx++}),this.uuid=Li(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Oc(s[o].image)):r.push(Oc(s[o]))}else r=Oc(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Oc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?su.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ox=0,en=class n extends Ni{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=ns,s=ns,r=Bn,o=is,a=Sn,l=li,c=n.DEFAULT_ANISOTROPY,h=Pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ox++}),this.uuid=Li(),this.name="",this.source=new dl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Gt(0,0),this.repeat=new Gt(1,1),this.center=new Gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Wm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ah:t.x=t.x-Math.floor(t.x);break;case ns:t.x=t.x<0?0:1;break;case Ch:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ah:t.y=t.y-Math.floor(t.y);break;case ns:t.y=t.y<0?0:1;break;case Ch:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=Wm;en.DEFAULT_ANISOTROPY=1;var re=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(c+1)/2,M=(p+1)/2,P=(f+1)/2,w=(h+d)/4,R=(u+_)/4,I=(g+m)/4;return v>M&&v>P?v<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(v),s=w/i,r=R/i):M>P?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=w/s,r=I/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=R/r,s=I/r),this.set(i,s,r,e),this}let T=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-_)/T,this.z=(d-h)/T,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ru=class extends Ni{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new re(0,0,t,e),this.scissorTest=!1,this.viewport=new re(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new en(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new dl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ci=class extends ru{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},fl=class extends en{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=bn,this.minFilter=bn,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ou=class extends en{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=bn,this.minFilter=bn,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Fi=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==d||c!==p||h!==g){let m=1-a,f=l*d+c*p+h*g+u*_,T=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){let P=Math.sqrt(v),w=Math.atan2(P,f*T);m=Math.sin(m*w)/P,a=Math.sin(a*w)/P}let M=a*T;if(l=l*m+d*M,c=c*m+p*M,h=h*m+g*M,u=u*m+_*M,m===1-a){let P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*p-c*d,t[e+1]=l*g+h*d+c*u-a*p,t[e+2]=c*g+h*p+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),u=a(r/2),d=l(i/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>u){let p=2*Math.sqrt(1+i-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>u){let p=2*Math.sqrt(1+a-i-u);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Be(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Yp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Yp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Bc.copy(this).projectOnVector(t),this.sub(Bc)}reflect(t){return this.sub(Bc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Be(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Bc=new F,Yp=new Fi,rs=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,xn):xn.fromBufferAttribute(r,o),xn.applyMatrix4(t.matrixWorld),this.expandByPoint(xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ea.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ea.copy(i.boundingBox)),Ea.applyMatrix4(t.matrixWorld),this.union(Ea)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xn),xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Zr),wa.subVectors(this.max,Zr),Hs.subVectors(t.a,Zr),Gs.subVectors(t.b,Zr),Ws.subVectors(t.c,Zr),Ti.subVectors(Gs,Hs),Ei.subVectors(Ws,Gs),qi.subVectors(Hs,Ws);let e=[0,-Ti.z,Ti.y,0,-Ei.z,Ei.y,0,-qi.z,qi.y,Ti.z,0,-Ti.x,Ei.z,0,-Ei.x,qi.z,0,-qi.x,-Ti.y,Ti.x,0,-Ei.y,Ei.x,0,-qi.y,qi.x,0];return!zc(e,Hs,Gs,Ws,wa)||(e=[1,0,0,0,1,0,0,0,1],!zc(e,Hs,Gs,Ws,wa))?!1:(Aa.crossVectors(Ti,Ei),e=[Aa.x,Aa.y,Aa.z],zc(e,Hs,Gs,Ws,wa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Jn=[new F,new F,new F,new F,new F,new F,new F,new F],xn=new F,Ea=new rs,Hs=new F,Gs=new F,Ws=new F,Ti=new F,Ei=new F,qi=new F,Zr=new F,wa=new F,Aa=new F,$i=new F;function zc(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){$i.fromArray(n,r);let a=s.x*Math.abs($i.x)+s.y*Math.abs($i.y)+s.z*Math.abs($i.z),l=t.dot($i),c=e.dot($i),h=i.dot($i);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Bx=new rs,Kr=new F,Vc=new F,os=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Bx.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Kr.subVectors(t,this.center);let e=Kr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Kr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Vc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Kr.copy(t.center).add(Vc)),this.expandByPoint(Kr.copy(t.center).sub(Vc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Qn=new F,kc=new F,Ca=new F,wi=new F,Hc=new F,Ra=new F,Gc=new F,lo=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Qn.copy(this.origin).addScaledVector(this.direction,e),Qn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){kc.copy(t).add(e).multiplyScalar(.5),Ca.copy(e).sub(t).normalize(),wi.copy(this.origin).sub(kc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ca),a=wi.dot(this.direction),l=-wi.dot(Ca),c=wi.lengthSq(),h=Math.abs(1-o*o),u,d,p,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(kc).addScaledVector(Ca,d),p}intersectSphere(t,e){Qn.subVectors(t.center,this.origin);let i=Qn.dot(this.direction),s=Qn.dot(Qn)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Qn)!==null}intersectTriangle(t,e,i,s,r){Hc.subVectors(e,t),Ra.subVectors(i,t),Gc.crossVectors(Hc,Ra);let o=this.direction.dot(Gc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;wi.subVectors(this.origin,t);let l=a*this.direction.dot(Ra.crossVectors(wi,Ra));if(l<0)return null;let c=a*this.direction.dot(Hc.cross(wi));if(c<0||l+c>o)return null;let h=-a*wi.dot(Gc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ce=class n{constructor(t,e,i,s,r,o,a,l,c,h,u,d,p,g,_,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,h,u,d,p,g,_,m)}set(t,e,i,s,r,o,a,l,c,h,u,d,p,g,_,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/Xs.setFromMatrixColumn(t,0).length(),r=1/Xs.setFromMatrixColumn(t,1).length(),o=1/Xs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,p=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=d-_*c,e[9]=-a*l,e[2]=_-d*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,p=l*u,g=c*h,_=c*u;e[0]=d+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=_+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,p=l*u,g=c*h,_=c*u;e[0]=d-_*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,p=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-d*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+g,e[10]=d-_*u}else if(t.order==="XZY"){let d=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zx,t,Vx)}lookAt(t,e,i){let s=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),Ai.crossVectors(i,je),Ai.lengthSq()===0&&(Math.abs(i.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),Ai.crossVectors(i,je)),Ai.normalize(),Pa.crossVectors(je,Ai),s[0]=Ai.x,s[4]=Pa.x,s[8]=je.x,s[1]=Ai.y,s[5]=Pa.y,s[9]=je.y,s[2]=Ai.z,s[6]=Pa.z,s[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],p=i[13],g=i[2],_=i[6],m=i[10],f=i[14],T=i[3],v=i[7],M=i[11],P=i[15],w=s[0],R=s[4],I=s[8],S=s[12],y=s[1],D=s[5],W=s[9],Y=s[13],B=s[2],N=s[6],C=s[10],O=s[14],A=s[3],L=s[7],V=s[11],X=s[15];return r[0]=o*w+a*y+l*B+c*A,r[4]=o*R+a*D+l*N+c*L,r[8]=o*I+a*W+l*C+c*V,r[12]=o*S+a*Y+l*O+c*X,r[1]=h*w+u*y+d*B+p*A,r[5]=h*R+u*D+d*N+p*L,r[9]=h*I+u*W+d*C+p*V,r[13]=h*S+u*Y+d*O+p*X,r[2]=g*w+_*y+m*B+f*A,r[6]=g*R+_*D+m*N+f*L,r[10]=g*I+_*W+m*C+f*V,r[14]=g*S+_*Y+m*O+f*X,r[3]=T*w+v*y+M*B+P*A,r[7]=T*R+v*D+M*N+P*L,r[11]=T*I+v*W+M*C+P*V,r[15]=T*S+v*Y+M*O+P*X,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+r*l*u-s*c*u-r*a*d+i*c*d+s*a*p-i*l*p)+_*(+e*l*p-e*c*d+r*o*d-s*o*p+s*c*h-r*l*h)+m*(+e*c*u-e*a*p-r*o*u+i*o*p+r*a*h-i*c*h)+f*(-s*a*h-e*l*u+e*a*d+s*o*u-i*o*d+i*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],T=u*m*c-_*d*c+_*l*p-a*m*p-u*l*f+a*d*f,v=g*d*c-h*m*c-g*l*p+o*m*p+h*l*f-o*d*f,M=h*_*c-g*u*c+g*a*p-o*_*p-h*a*f+o*u*f,P=g*u*l-h*_*l-g*a*d+o*_*d+h*a*m-o*u*m,w=e*T+i*v+s*M+r*P;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/w;return t[0]=T*R,t[1]=(_*d*r-u*m*r-_*s*p+i*m*p+u*s*f-i*d*f)*R,t[2]=(a*m*r-_*l*r+_*s*c-i*m*c-a*s*f+i*l*f)*R,t[3]=(u*l*r-a*d*r-u*s*c+i*d*c+a*s*p-i*l*p)*R,t[4]=v*R,t[5]=(h*m*r-g*d*r+g*s*p-e*m*p-h*s*f+e*d*f)*R,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*f-e*l*f)*R,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*p+e*l*p)*R,t[8]=M*R,t[9]=(g*u*r-h*_*r-g*i*p+e*_*p+h*i*f-e*u*f)*R,t[10]=(o*_*r-g*a*r+g*i*c-e*_*c-o*i*f+e*a*f)*R,t[11]=(h*a*r-o*u*r-h*i*c+e*u*c+o*i*p-e*a*p)*R,t[12]=P*R,t[13]=(h*_*s-g*u*s+g*i*d-e*_*d-h*i*m+e*u*m)*R,t[14]=(g*a*s-o*_*s-g*i*l+e*_*l+o*i*m-e*a*m)*R,t[15]=(o*u*s-h*a*s+h*i*l-e*u*l-o*i*d+e*a*d)*R,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,p=r*h,g=r*u,_=o*h,m=o*u,f=a*u,T=l*c,v=l*h,M=l*u,P=i.x,w=i.y,R=i.z;return s[0]=(1-(_+f))*P,s[1]=(p+M)*P,s[2]=(g-v)*P,s[3]=0,s[4]=(p-M)*w,s[5]=(1-(d+f))*w,s[6]=(m+T)*w,s[7]=0,s[8]=(g+v)*R,s[9]=(m-T)*R,s[10]=(1-(d+_))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=Xs.set(s[0],s[1],s[2]).length(),o=Xs.set(s[4],s[5],s[6]).length(),a=Xs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],yn.copy(this);let c=1/r,h=1/o,u=1/a;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=h,yn.elements[5]*=h,yn.elements[6]*=h,yn.elements[8]*=u,yn.elements[9]*=u,yn.elements[10]*=u,e.setFromRotationMatrix(yn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=oi){let l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),d=(i+s)/(i-s),p,g;if(a===oi)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===hl)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=oi){let l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(o-r),d=(e+t)*c,p=(i+s)*h,g,_;if(a===oi)g=(o+r)*u,_=-2*u;else if(a===hl)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Xs=new F,yn=new ce,zx=new F(0,0,0),Vx=new F(1,1,1),Ai=new F,Pa=new F,je=new F,qp=new ce,$p=new Fi,zn=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Be(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Be(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return qp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qp,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return $p.setFromEuler(this),this.setFromQuaternion($p,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};zn.DEFAULT_ORDER="XYZ";var pl=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},kx=0,Zp=new F,Ys=new Fi,jn=new ce,Ia=new F,Jr=new F,Hx=new F,Gx=new Fi,Kp=new F(1,0,0),Jp=new F(0,1,0),Qp=new F(0,0,1),jp={type:"added"},Wx={type:"removed"},qs={type:"childadded",child:null},Wc={type:"childremoved",child:null},Pe=class n extends Ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kx++}),this.uuid=Li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new F,e=new zn,i=new Fi,s=new F(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ce},normalMatrix:{value:new Ht}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ys.setFromAxisAngle(t,e),this.quaternion.multiply(Ys),this}rotateOnWorldAxis(t,e){return Ys.setFromAxisAngle(t,e),this.quaternion.premultiply(Ys),this}rotateX(t){return this.rotateOnAxis(Kp,t)}rotateY(t){return this.rotateOnAxis(Jp,t)}rotateZ(t){return this.rotateOnAxis(Qp,t)}translateOnAxis(t,e){return Zp.copy(t).applyQuaternion(this.quaternion),this.position.add(Zp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Kp,t)}translateY(t){return this.translateOnAxis(Jp,t)}translateZ(t){return this.translateOnAxis(Qp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(jn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ia.copy(t):Ia.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Jr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?jn.lookAt(Jr,Ia,this.up):jn.lookAt(Ia,Jr,this.up),this.quaternion.setFromRotationMatrix(jn),s&&(jn.extractRotation(s.matrixWorld),Ys.setFromRotationMatrix(jn),this.quaternion.premultiply(Ys.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(jp),qs.child=t,this.dispatchEvent(qs),qs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Wx),Wc.child=t,this.dispatchEvent(Wc),Wc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),jn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),jn.multiply(t.parent.matrixWorld)),t.applyMatrix4(jn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(jp),qs.child=t,this.dispatchEvent(qs),qs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jr,t,Hx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jr,Gx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Pe.DEFAULT_UP=new F(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var vn=new F,ti=new F,Xc=new F,ei=new F,$s=new F,Zs=new F,tm=new F,Yc=new F,qc=new F,$c=new F,Zc=new re,Kc=new re,Jc=new re,si=class n{constructor(t=new F,e=new F,i=new F){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),vn.subVectors(t,e),s.cross(vn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){vn.subVectors(s,e),ti.subVectors(i,e),Xc.subVectors(t,e);let o=vn.dot(vn),a=vn.dot(ti),l=vn.dot(Xc),c=ti.dot(ti),h=ti.dot(Xc),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,ei)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ei.x),l.addScaledVector(o,ei.y),l.addScaledVector(a,ei.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return Zc.setScalar(0),Kc.setScalar(0),Jc.setScalar(0),Zc.fromBufferAttribute(t,e),Kc.fromBufferAttribute(t,i),Jc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Zc,r.x),o.addScaledVector(Kc,r.y),o.addScaledVector(Jc,r.z),o}static isFrontFacing(t,e,i,s){return vn.subVectors(i,e),ti.subVectors(t,e),vn.cross(ti).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return vn.subVectors(this.c,this.b),ti.subVectors(this.a,this.b),vn.cross(ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;$s.subVectors(s,i),Zs.subVectors(r,i),Yc.subVectors(t,i);let l=$s.dot(Yc),c=Zs.dot(Yc);if(l<=0&&c<=0)return e.copy(i);qc.subVectors(t,s);let h=$s.dot(qc),u=Zs.dot(qc);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector($s,o);$c.subVectors(t,r);let p=$s.dot($c),g=Zs.dot($c);if(g>=0&&p<=g)return e.copy(r);let _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Zs,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return tm.subVectors(r,s),a=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(tm,a);let f=1/(m+_+d);return o=_*f,a=d*f,e.copy(i).addScaledVector($s,o).addScaledVector(Zs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},sg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ci={h:0,s:0,l:0},Da={h:0,s:0,l:0};function Qc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Xt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=hn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Qt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=Qt.workingColorSpace){if(t=Ix(t,1),e=Be(e,0,1),i=Be(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Qc(o,r,t+1/3),this.g=Qc(o,r,t),this.b=Qc(o,r,t-1/3)}return Qt.toWorkingColorSpace(this,s),this}setStyle(t,e=hn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=hn){let i=sg[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ai(t.r),this.g=ai(t.g),this.b=ai(t.b),this}copyLinearToSRGB(t){return this.r=ar(t.r),this.g=ar(t.g),this.b=ar(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=hn){return Qt.fromWorkingColorSpace(Oe.copy(this),t),Math.round(Be(Oe.r*255,0,255))*65536+Math.round(Be(Oe.g*255,0,255))*256+Math.round(Be(Oe.b*255,0,255))}getHexString(t=hn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(Oe.copy(this),e);let i=Oe.r,s=Oe.g,r=Oe.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=hn){Qt.fromWorkingColorSpace(Oe.copy(this),t);let e=Oe.r,i=Oe.g,s=Oe.b;return t!==hn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ci),this.setHSL(Ci.h+t,Ci.s+e,Ci.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ci),t.getHSL(Da);let i=Nc(Ci.h,Da.h,e),s=Nc(Ci.s,Da.s,e),r=Nc(Ci.l,Da.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Oe=new Xt;Xt.NAMES=sg;var Xx=0,Vn=class extends Ni{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xx++}),this.uuid=Li(),this.name="",this.blending=rr,this.side=Ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gh,this.blendDst=_h,this.blendEquation=ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=hr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vs,this.stencilZFail=Vs,this.stencilZPass=Vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==rr&&(i.blending=this.blending),this.side!==Ui&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==gh&&(i.blendSrc=this.blendSrc),this.blendDst!==_h&&(i.blendDst=this.blendDst),this.blendEquation!==ts&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==hr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Vs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Vs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},as=class extends Vn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=Gm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var be=new F,La=new Gt,We=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=nu,this.updateRanges=[],this.gpuType=ri,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)La.fromBufferAttribute(this,e),La.applyMatrix3(t),this.setXY(e,La.x,La.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=On(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=se(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=On(e,this.array)),e}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=On(e,this.array)),e}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=On(e,this.array)),e}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=On(e,this.array)),e}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),i=se(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),i=se(i,this.array),s=se(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),i=se(i,this.array),s=se(s,this.array),r=se(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==nu&&(t.usage=this.usage),t}};var ml=class extends We{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var gl=class extends We{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var me=class extends We{constructor(t,e,i){super(new Float32Array(t),e,i)}},Yx=0,cn=new ce,jc=new Pe,Ks=new F,tn=new rs,Qr=new rs,Ce=new F,Te=class n extends Ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yx++}),this.uuid=Li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ig(t)?gl:ml)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ht().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return cn.makeRotationFromQuaternion(t),this.applyMatrix4(cn),this}rotateX(t){return cn.makeRotationX(t),this.applyMatrix4(cn),this}rotateY(t){return cn.makeRotationY(t),this.applyMatrix4(cn),this}rotateZ(t){return cn.makeRotationZ(t),this.applyMatrix4(cn),this}translate(t,e,i){return cn.makeTranslation(t,e,i),this.applyMatrix4(cn),this}scale(t,e,i){return cn.makeScale(t,e,i),this.applyMatrix4(cn),this}lookAt(t){return jc.lookAt(t),jc.updateMatrix(),this.applyMatrix4(jc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ks).negate(),this.translate(Ks.x,Ks.y,Ks.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new me(i,3))}else{for(let i=0,s=e.count;i<s;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rs);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new os);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let i=this.boundingSphere.center;if(tn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Qr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ce.addVectors(tn.min,Qr.min),tn.expandByPoint(Ce),Ce.addVectors(tn.max,Qr.max),tn.expandByPoint(Ce)):(tn.expandByPoint(Qr.min),tn.expandByPoint(Qr.max))}tn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ce));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ce.fromBufferAttribute(a,c),l&&(Ks.fromBufferAttribute(t,c),Ce.add(Ks)),s=Math.max(s,i.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new We(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<i.count;I++)a[I]=new F,l[I]=new F;let c=new F,h=new F,u=new F,d=new Gt,p=new Gt,g=new Gt,_=new F,m=new F;function f(I,S,y){c.fromBufferAttribute(i,I),h.fromBufferAttribute(i,S),u.fromBufferAttribute(i,y),d.fromBufferAttribute(r,I),p.fromBufferAttribute(r,S),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),p.sub(d),g.sub(d);let D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(D),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(D),a[I].add(_),a[S].add(_),a[y].add(_),l[I].add(m),l[S].add(m),l[y].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let I=0,S=T.length;I<S;++I){let y=T[I],D=y.start,W=y.count;for(let Y=D,B=D+W;Y<B;Y+=3)f(t.getX(Y+0),t.getX(Y+1),t.getX(Y+2))}let v=new F,M=new F,P=new F,w=new F;function R(I){P.fromBufferAttribute(s,I),w.copy(P);let S=a[I];v.copy(S),v.sub(P.multiplyScalar(P.dot(S))).normalize(),M.crossVectors(w,S);let D=M.dot(l[I])<0?-1:1;o.setXYZW(I,v.x,v.y,v.z,D)}for(let I=0,S=T.length;I<S;++I){let y=T[I],D=y.start,W=y.count;for(let Y=D,B=D+W;Y<B;Y+=3)R(t.getX(Y+0)),R(t.getX(Y+1)),R(t.getX(Y+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new We(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);let s=new F,r=new F,o=new F,a=new F,l=new F,c=new F,h=new F,u=new F;if(t)for(let d=0,p=t.count;d<p;d+=3){let g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new We(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,i);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],p=t(d,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},em=new ce,Zi=new lo,Ua=new os,nm=new F,Na=new F,Fa=new F,Oa=new F,th=new F,Ba=new F,im=new F,za=new F,Yt=class extends Pe{constructor(t=new Te,e=new as){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Ba.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(th.fromBufferAttribute(u,t),o?Ba.addScaledVector(th,h):Ba.addScaledVector(th.sub(e),h))}e.add(Ba)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ua.copy(i.boundingSphere),Ua.applyMatrix4(r),Zi.copy(t.ray).recast(t.near),!(Ua.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(Ua,nm)===null||Zi.origin.distanceToSquared(nm)>(t.far-t.near)**2))&&(em.copy(r).invert(),Zi.copy(t.ray).applyMatrix4(em),!(i.boundingBox!==null&&Zi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Zi)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],f=o[m.materialIndex],T=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let M=T,P=v;M<P;M+=3){let w=a.getX(M),R=a.getX(M+1),I=a.getX(M+2);s=Va(this,f,t,i,c,h,u,w,R,I),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let T=a.getX(m),v=a.getX(m+1),M=a.getX(m+2);s=Va(this,o,t,i,c,h,u,T,v,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],f=o[m.materialIndex],T=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=T,P=v;M<P;M+=3){let w=M,R=M+1,I=M+2;s=Va(this,f,t,i,c,h,u,w,R,I),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let T=m,v=m+1,M=m+2;s=Va(this,o,t,i,c,h,u,T,v,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function qx(n,t,e,i,s,r,o,a){let l;if(t.side===Ze?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Ui,a),l===null)return null;za.copy(a),za.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(za);return c<e.near||c>e.far?null:{distance:c,point:za.clone(),object:n}}function Va(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,Na),n.getVertexPosition(l,Fa),n.getVertexPosition(c,Oa);let h=qx(n,t,e,i,Na,Fa,Oa,im);if(h){let u=new F;si.getBarycoord(im,Na,Fa,Oa,u),s&&(h.uv=si.getInterpolatedAttribute(s,a,l,c,u,new Gt)),r&&(h.uv1=si.getInterpolatedAttribute(r,a,l,c,u,new Gt)),o&&(h.normal=si.getInterpolatedAttribute(o,a,l,c,u,new F),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new F,materialIndex:0};si.getNormal(Na,Fa,Oa,d.normal),h.face=d,h.barycoord=u}return h}var Ke=class n extends Te{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new me(c,3)),this.setAttribute("normal",new me(h,3)),this.setAttribute("uv",new me(u,2));function g(_,m,f,T,v,M,P,w,R,I,S){let y=M/R,D=P/I,W=M/2,Y=P/2,B=w/2,N=R+1,C=I+1,O=0,A=0,L=new F;for(let V=0;V<C;V++){let X=V*D-Y;for(let Q=0;Q<N;Q++){let rt=Q*y-W;L[_]=rt*T,L[m]=X*v,L[f]=B,c.push(L.x,L.y,L.z),L[_]=0,L[m]=0,L[f]=w>0?1:-1,h.push(L.x,L.y,L.z),u.push(Q/R),u.push(1-V/I),O+=1}}for(let V=0;V<I;V++)for(let X=0;X<R;X++){let Q=d+X+N*V,rt=d+X+N*(V+1),H=d+(X+1)+N*(V+1),$=d+(X+1)+N*V;l.push(Q,rt,$),l.push(rt,H,$),A+=6}a.addGroup(p,A,S),p+=A,d+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function mr(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function He(n){let t={};for(let e=0;e<n.length;e++){let i=mr(n[e]);for(let s in i)t[s]=i[s]}return t}function $x(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function rg(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}var Zx={clone:mr,merge:He},Kx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,kn=class extends Vn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kx,this.fragmentShader=Jx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=mr(t.uniforms),this.uniformsGroups=$x(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},_l=class extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=oi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ri=new F,sm=new Gt,rm=new Gt,Re=class extends _l{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=iu*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ll*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return iu*2*Math.atan(Math.tan(ll*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ri.x,Ri.y).multiplyScalar(-t/Ri.z),Ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ri.x,Ri.y).multiplyScalar(-t/Ri.z)}getViewSize(t,e){return this.getViewBounds(t,sm,rm),e.subVectors(rm,sm)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ll*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Js=-90,Qs=1,au=class extends Pe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Re(Js,Qs,t,e);s.layers=this.layers,this.add(s);let r=new Re(Js,Qs,t,e);r.layers=this.layers,this.add(r);let o=new Re(Js,Qs,t,e);o.layers=this.layers,this.add(o);let a=new Re(Js,Qs,t,e);a.layers=this.layers,this.add(a);let l=new Re(Js,Qs,t,e);l.layers=this.layers,this.add(l);let c=new Re(Js,Qs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===oi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===hl)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},xl=class extends en{constructor(t,e,i,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ur,super(t,e,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},lu=class extends ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new xl(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Bn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ke(5,5,5),r=new kn({name:"CubemapFromEquirect",uniforms:mr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ze,blending:Ii});r.uniforms.tEquirect.value=e;let o=new Yt(s,r),a=e.minFilter;return e.minFilter===is&&(e.minFilter=Bn),new au(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},eh=new F,Qx=new F,jx=new Ht,ii=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=eh.subVectors(i,e).cross(Qx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(eh),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||jx.getNormalMatrix(t),s=this.coplanarPoint(eh).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ki=new os,ka=new F,co=class{constructor(t=new ii,e=new ii,i=new ii,s=new ii,r=new ii,o=new ii){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=oi){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],_=s[10],m=s[11],f=s[12],T=s[13],v=s[14],M=s[15];if(i[0].setComponents(l-r,d-c,m-p,M-f).normalize(),i[1].setComponents(l+r,d+c,m+p,M+f).normalize(),i[2].setComponents(l+o,d+h,m+g,M+T).normalize(),i[3].setComponents(l-o,d-h,m-g,M-T).normalize(),i[4].setComponents(l-a,d-u,m-_,M-v).normalize(),e===oi)i[5].setComponents(l+a,d+u,m+_,M+v).normalize();else if(e===hl)i[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ki.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ki.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ki)}intersectsSprite(t){return Ki.center.set(0,0,0),Ki.radius=.7071067811865476,Ki.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ki)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(ka.x=s.normal.x>0?t.max.x:t.min.x,ka.y=s.normal.y>0?t.max.y:t.min.y,ka.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ka)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function og(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function ty(n){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){let g=u[d],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){let _=u[p];n.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var gr=class n extends Te{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){let T=f*d-o;for(let v=0;v<c;v++){let M=v*u-r;g.push(M,-T,0),_.push(0,0,1),m.push(v/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let T=0;T<a;T++){let v=T+c*f,M=T+c*(f+1),P=T+1+c*(f+1),w=T+1+c*f;p.push(v,M,w),p.push(M,P,w)}this.setIndex(p),this.setAttribute("position",new me(g,3)),this.setAttribute("normal",new me(_,3)),this.setAttribute("uv",new me(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},ey=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ny=`#ifdef USE_ALPHAHASH
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
#endif`,iy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ry=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,oy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ay=`#ifdef USE_AOMAP
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
#endif`,ly=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cy=`#ifdef USE_BATCHING
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
#endif`,hy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,uy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,py=`#ifdef USE_IRIDESCENCE
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
#endif`,my=`#ifdef USE_BUMPMAP
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
#endif`,gy=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_y=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,My=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,by=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ty=`#define PI 3.141592653589793
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
} // validated`,Ey=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,wy=`vec3 transformedNormal = objectNormal;
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
#endif`,Ay=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ry=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Py=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Iy="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ly=`#ifdef USE_ENVMAP
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
#endif`,Uy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ny=`#ifdef USE_ENVMAP
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
#endif`,Fy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Oy=`#ifdef USE_ENVMAP
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
#endif`,By=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ky=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hy=`#ifdef USE_GRADIENTMAP
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
}`,Gy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yy=`uniform bool receiveShadow;
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
#endif`,qy=`#ifdef USE_ENVMAP
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
#endif`,$y=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ky=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qy=`PhysicalMaterial material;
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
#endif`,jy=`struct PhysicalMaterial {
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
}`,tv=`
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
#endif`,ev=`#if defined( RE_IndirectDiffuse )
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
#endif`,nv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,iv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ov=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,av=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hv=`#if defined( USE_POINTS_UV )
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
#endif`,uv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gv=`#ifdef USE_MORPHTARGETS
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
#endif`,_v=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,yv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bv=`#ifdef USE_NORMALMAP
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
#endif`,Tv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ev=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Av=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Pv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Iv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Uv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Nv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ov=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,zv=`float getShadowMask() {
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
}`,Vv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kv=`#ifdef USE_SKINNING
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
#endif`,Hv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gv=`#ifdef USE_SKINNING
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
#endif`,Wv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,$v=`#ifdef USE_TRANSMISSION
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
#endif`,Zv=`#ifdef USE_TRANSMISSION
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
#endif`,Kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,tM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,eM=`uniform sampler2D t2D;
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
}`,nM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oM=`#include <common>
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
}`,aM=`#if DEPTH_PACKING == 3200
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
}`,lM=`#define DISTANCE
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
}`,cM=`#define DISTANCE
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
}`,hM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dM=`uniform float scale;
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
}`,fM=`uniform vec3 diffuse;
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
}`,pM=`#include <common>
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
}`,mM=`uniform vec3 diffuse;
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
}`,gM=`#define LAMBERT
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
}`,_M=`#define LAMBERT
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
}`,xM=`#define MATCAP
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
}`,yM=`#define MATCAP
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
}`,vM=`#define NORMAL
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
}`,MM=`#define NORMAL
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
}`,SM=`#define PHONG
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
}`,bM=`#define PHONG
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
}`,TM=`#define STANDARD
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
}`,EM=`#define STANDARD
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
}`,wM=`#define TOON
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
}`,AM=`#define TOON
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
}`,CM=`uniform float size;
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
}`,RM=`uniform vec3 diffuse;
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
}`,PM=`#include <common>
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
}`,IM=`uniform vec3 color;
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
}`,DM=`uniform float rotation;
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
}`,LM=`uniform vec3 diffuse;
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
}`,Wt={alphahash_fragment:ey,alphahash_pars_fragment:ny,alphamap_fragment:iy,alphamap_pars_fragment:sy,alphatest_fragment:ry,alphatest_pars_fragment:oy,aomap_fragment:ay,aomap_pars_fragment:ly,batching_pars_vertex:cy,batching_vertex:hy,begin_vertex:uy,beginnormal_vertex:dy,bsdfs:fy,iridescence_fragment:py,bumpmap_pars_fragment:my,clipping_planes_fragment:gy,clipping_planes_pars_fragment:_y,clipping_planes_pars_vertex:xy,clipping_planes_vertex:yy,color_fragment:vy,color_pars_fragment:My,color_pars_vertex:Sy,color_vertex:by,common:Ty,cube_uv_reflection_fragment:Ey,defaultnormal_vertex:wy,displacementmap_pars_vertex:Ay,displacementmap_vertex:Cy,emissivemap_fragment:Ry,emissivemap_pars_fragment:Py,colorspace_fragment:Iy,colorspace_pars_fragment:Dy,envmap_fragment:Ly,envmap_common_pars_fragment:Uy,envmap_pars_fragment:Ny,envmap_pars_vertex:Fy,envmap_physical_pars_fragment:qy,envmap_vertex:Oy,fog_vertex:By,fog_pars_vertex:zy,fog_fragment:Vy,fog_pars_fragment:ky,gradientmap_pars_fragment:Hy,lightmap_pars_fragment:Gy,lights_lambert_fragment:Wy,lights_lambert_pars_fragment:Xy,lights_pars_begin:Yy,lights_toon_fragment:$y,lights_toon_pars_fragment:Zy,lights_phong_fragment:Ky,lights_phong_pars_fragment:Jy,lights_physical_fragment:Qy,lights_physical_pars_fragment:jy,lights_fragment_begin:tv,lights_fragment_maps:ev,lights_fragment_end:nv,logdepthbuf_fragment:iv,logdepthbuf_pars_fragment:sv,logdepthbuf_pars_vertex:rv,logdepthbuf_vertex:ov,map_fragment:av,map_pars_fragment:lv,map_particle_fragment:cv,map_particle_pars_fragment:hv,metalnessmap_fragment:uv,metalnessmap_pars_fragment:dv,morphinstance_vertex:fv,morphcolor_vertex:pv,morphnormal_vertex:mv,morphtarget_pars_vertex:gv,morphtarget_vertex:_v,normal_fragment_begin:xv,normal_fragment_maps:yv,normal_pars_fragment:vv,normal_pars_vertex:Mv,normal_vertex:Sv,normalmap_pars_fragment:bv,clearcoat_normal_fragment_begin:Tv,clearcoat_normal_fragment_maps:Ev,clearcoat_pars_fragment:wv,iridescence_pars_fragment:Av,opaque_fragment:Cv,packing:Rv,premultiplied_alpha_fragment:Pv,project_vertex:Iv,dithering_fragment:Dv,dithering_pars_fragment:Lv,roughnessmap_fragment:Uv,roughnessmap_pars_fragment:Nv,shadowmap_pars_fragment:Fv,shadowmap_pars_vertex:Ov,shadowmap_vertex:Bv,shadowmask_pars_fragment:zv,skinbase_vertex:Vv,skinning_pars_vertex:kv,skinning_vertex:Hv,skinnormal_vertex:Gv,specularmap_fragment:Wv,specularmap_pars_fragment:Xv,tonemapping_fragment:Yv,tonemapping_pars_fragment:qv,transmission_fragment:$v,transmission_pars_fragment:Zv,uv_pars_fragment:Kv,uv_pars_vertex:Jv,uv_vertex:Qv,worldpos_vertex:jv,background_vert:tM,background_frag:eM,backgroundCube_vert:nM,backgroundCube_frag:iM,cube_vert:sM,cube_frag:rM,depth_vert:oM,depth_frag:aM,distanceRGBA_vert:lM,distanceRGBA_frag:cM,equirect_vert:hM,equirect_frag:uM,linedashed_vert:dM,linedashed_frag:fM,meshbasic_vert:pM,meshbasic_frag:mM,meshlambert_vert:gM,meshlambert_frag:_M,meshmatcap_vert:xM,meshmatcap_frag:yM,meshnormal_vert:vM,meshnormal_frag:MM,meshphong_vert:SM,meshphong_frag:bM,meshphysical_vert:TM,meshphysical_frag:EM,meshtoon_vert:wM,meshtoon_frag:AM,points_vert:CM,points_frag:RM,shadow_vert:PM,shadow_frag:IM,sprite_vert:DM,sprite_frag:LM},mt={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new Gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new Gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},Fn={basic:{uniforms:He([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:He([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:He([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:He([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:He([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:He([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:He([mt.points,mt.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:He([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:He([mt.common,mt.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:He([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:He([mt.sprite,mt.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:He([mt.common,mt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:He([mt.lights,mt.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};Fn.physical={uniforms:He([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new Gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new Gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new Gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};var Ha={r:0,b:0,g:0},Ji=new zn,UM=new ce;function NM(n,t,e,i,s,r,o){let a=new Xt(0),l=r===!0?0:1,c,h,u=null,d=0,p=null;function g(T){let v=T.isScene===!0?T.background:null;return v&&v.isTexture&&(v=(T.backgroundBlurriness>0?e:t).get(v)),v}function _(T){let v=!1,M=g(T);M===null?f(a,l):M&&M.isColor&&(f(M,1),v=!0);let P=n.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(T,v){let M=g(v);M&&(M.isCubeTexture||M.mapping===Ul)?(h===void 0&&(h=new Yt(new Ke(1,1,1),new kn({name:"BackgroundCubeMaterial",uniforms:mr(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:Ze,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ji.copy(v.backgroundRotation),Ji.x*=-1,Ji.y*=-1,Ji.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ji.y*=-1,Ji.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(UM.makeRotationFromEuler(Ji)),h.material.toneMapped=Qt.getTransfer(M.colorSpace)!==ie,(u!==M||d!==M.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=M,d=M.version,p=n.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Yt(new gr(2,2),new kn({name:"BackgroundMaterial",uniforms:mr(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:Ui,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(M.colorSpace)!==ie,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||d!==M.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,d=M.version,p=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function f(T,v){T.getRGB(Ha,rg(n)),i.buffers.color.setClear(Ha.r,Ha.g,Ha.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(T,v=1){a.set(T),l=v,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,f(a,l)},render:_,addToRenderList:m}}function FM(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,o=!1;function a(y,D,W,Y,B){let N=!1,C=u(Y,W,D);r!==C&&(r=C,c(r.object)),N=p(y,Y,W,B),N&&g(y,Y,W,B),B!==null&&t.update(B,n.ELEMENT_ARRAY_BUFFER),(N||o)&&(o=!1,M(y,D,W,Y),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function h(y){return n.deleteVertexArray(y)}function u(y,D,W){let Y=W.wireframe===!0,B=i[y.id];B===void 0&&(B={},i[y.id]=B);let N=B[D.id];N===void 0&&(N={},B[D.id]=N);let C=N[Y];return C===void 0&&(C=d(l()),N[Y]=C),C}function d(y){let D=[],W=[],Y=[];for(let B=0;B<e;B++)D[B]=0,W[B]=0,Y[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:W,attributeDivisors:Y,object:y,attributes:{},index:null}}function p(y,D,W,Y){let B=r.attributes,N=D.attributes,C=0,O=W.getAttributes();for(let A in O)if(O[A].location>=0){let V=B[A],X=N[A];if(X===void 0&&(A==="instanceMatrix"&&y.instanceMatrix&&(X=y.instanceMatrix),A==="instanceColor"&&y.instanceColor&&(X=y.instanceColor)),V===void 0||V.attribute!==X||X&&V.data!==X.data)return!0;C++}return r.attributesNum!==C||r.index!==Y}function g(y,D,W,Y){let B={},N=D.attributes,C=0,O=W.getAttributes();for(let A in O)if(O[A].location>=0){let V=N[A];V===void 0&&(A==="instanceMatrix"&&y.instanceMatrix&&(V=y.instanceMatrix),A==="instanceColor"&&y.instanceColor&&(V=y.instanceColor));let X={};X.attribute=V,V&&V.data&&(X.data=V.data),B[A]=X,C++}r.attributes=B,r.attributesNum=C,r.index=Y}function _(){let y=r.newAttributes;for(let D=0,W=y.length;D<W;D++)y[D]=0}function m(y){f(y,0)}function f(y,D){let W=r.newAttributes,Y=r.enabledAttributes,B=r.attributeDivisors;W[y]=1,Y[y]===0&&(n.enableVertexAttribArray(y),Y[y]=1),B[y]!==D&&(n.vertexAttribDivisor(y,D),B[y]=D)}function T(){let y=r.newAttributes,D=r.enabledAttributes;for(let W=0,Y=D.length;W<Y;W++)D[W]!==y[W]&&(n.disableVertexAttribArray(W),D[W]=0)}function v(y,D,W,Y,B,N,C){C===!0?n.vertexAttribIPointer(y,D,W,B,N):n.vertexAttribPointer(y,D,W,Y,B,N)}function M(y,D,W,Y){_();let B=Y.attributes,N=W.getAttributes(),C=D.defaultAttributeValues;for(let O in N){let A=N[O];if(A.location>=0){let L=B[O];if(L===void 0&&(O==="instanceMatrix"&&y.instanceMatrix&&(L=y.instanceMatrix),O==="instanceColor"&&y.instanceColor&&(L=y.instanceColor)),L!==void 0){let V=L.normalized,X=L.itemSize,Q=t.get(L);if(Q===void 0)continue;let rt=Q.buffer,H=Q.type,$=Q.bytesPerElement,it=H===n.INT||H===n.UNSIGNED_INT||L.gpuType===Nu;if(L.isInterleavedBufferAttribute){let et=L.data,ct=et.stride,ut=L.offset;if(et.isInstancedInterleavedBuffer){for(let Tt=0;Tt<A.locationSize;Tt++)f(A.location+Tt,et.meshPerAttribute);y.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Tt=0;Tt<A.locationSize;Tt++)m(A.location+Tt);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let Tt=0;Tt<A.locationSize;Tt++)v(A.location+Tt,X/A.locationSize,H,V,ct*$,(ut+X/A.locationSize*Tt)*$,it)}else{if(L.isInstancedBufferAttribute){for(let et=0;et<A.locationSize;et++)f(A.location+et,L.meshPerAttribute);y.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=L.meshPerAttribute*L.count)}else for(let et=0;et<A.locationSize;et++)m(A.location+et);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let et=0;et<A.locationSize;et++)v(A.location+et,X/A.locationSize,H,V,X*$,X/A.locationSize*et*$,it)}}else if(C!==void 0){let V=C[O];if(V!==void 0)switch(V.length){case 2:n.vertexAttrib2fv(A.location,V);break;case 3:n.vertexAttrib3fv(A.location,V);break;case 4:n.vertexAttrib4fv(A.location,V);break;default:n.vertexAttrib1fv(A.location,V)}}}}T()}function P(){I();for(let y in i){let D=i[y];for(let W in D){let Y=D[W];for(let B in Y)h(Y[B].object),delete Y[B];delete D[W]}delete i[y]}}function w(y){if(i[y.id]===void 0)return;let D=i[y.id];for(let W in D){let Y=D[W];for(let B in Y)h(Y[B].object),delete Y[B];delete D[W]}delete i[y.id]}function R(y){for(let D in i){let W=i[D];if(W[y.id]===void 0)continue;let Y=W[y.id];for(let B in Y)h(Y[B].object),delete Y[B];delete W[y.id]}}function I(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:S,dispose:P,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:T}}function OM(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,i,1)}function l(c,h,u,d){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function BM(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Sn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let I=R===po&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==li&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==ri&&!I)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:T,maxVaryings:v,maxFragmentUniforms:M,vertexTextures:P,maxSamples:w}}function zM(n){let t=this,e=null,i=0,s=!1,r=!1,o=new ii,a=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||i!==0||s;return s=d,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let T=r?0:i,v=T*4,M=f.clippingState||null;l.value=M,M=h(g,d,v,p);for(let P=0;P!==v;++P)M[P]=e[P];f.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,p,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let f=p+_*4,T=d.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<f)&&(m=new Float32Array(f));for(let v=0,M=p;v!==_;++v,M+=4)o.copy(u[v]).applyMatrix4(T,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function VM(n){let t=new WeakMap;function e(o,a){return a===Eh?o.mapping=ur:a===wh&&(o.mapping=dr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Eh||a===wh)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new lu(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var yl=class extends _l{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},sr=4,om=[.125,.215,.35,.446,.526,.582],es=20,nh=new yl,am=new Xt,ih=null,sh=0,rh=0,oh=!1,ji=(1+Math.sqrt(5))/2,js=1/ji,lm=[new F(-ji,js,0),new F(ji,js,0),new F(-js,0,ji),new F(js,0,ji),new F(0,ji,-js),new F(0,ji,js),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],vl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){ih=this._renderer.getRenderTarget(),sh=this._renderer.getActiveCubeFace(),rh=this._renderer.getActiveMipmapLevel(),oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=um(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ih,sh,rh),this._renderer.xr.enabled=oh,t.scissorTest=!1,Ga(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ur||t.mapping===dr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ih=this._renderer.getRenderTarget(),sh=this._renderer.getActiveCubeFace(),rh=this._renderer.getActiveMipmapLevel(),oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Bn,minFilter:Bn,generateMipmaps:!1,type:po,format:Sn,colorSpace:Tr,depthBuffer:!1},s=cm(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cm(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=kM(r)),this._blurMaterial=HM(r,t,e)}return s}_compileMaterial(t){let e=new Yt(this._lodPlanes[0],t);this._renderer.compile(e,nh)}_sceneToCubeUV(t,e,i,s){let a=new Re(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(am),h.toneMapping=Di,h.autoClear=!1;let p=new as({name:"PMREM.Background",side:Ze,depthWrite:!1,depthTest:!1}),g=new Yt(new Ke,p),_=!1,m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(am),_=!0);for(let f=0;f<6;f++){let T=f%3;T===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):T===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));let v=this._cubeSize;Ga(s,T*v,f>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===ur||t.mapping===dr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=um()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hm());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Yt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Ga(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,nh)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=lm[(s-r-1)%lm.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Yt(this._lodPlanes[s],c),d=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*es-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):es;m>es&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${es}`);let f=[],T=0;for(let R=0;R<es;++R){let I=R/_,S=Math.exp(-I*I/2);f.push(S),R===0?T+=S:R<m&&(T+=2*S)}for(let R=0;R<f.length;R++)f[R]=f[R]/T;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-i;let M=this._sizeLods[s],P=3*M*(s>v-sr?s-v+sr:0),w=4*(this._cubeSize-M);Ga(e,P,w,3*M,2*M),l.setRenderTarget(e),l.render(u,nh)}};function kM(n){let t=[],e=[],i=[],s=n,r=n-sr+1+om.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>n-sr?l=om[o-n+sr-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,T=new Float32Array(_*g*p),v=new Float32Array(m*g*p),M=new Float32Array(f*g*p);for(let w=0;w<p;w++){let R=w%3*2/3-1,I=w>2?0:-1,S=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];T.set(S,_*g*w),v.set(d,m*g*w);let y=[w,w,w,w,w,w];M.set(y,f*g*w)}let P=new Te;P.setAttribute("position",new We(T,_)),P.setAttribute("uv",new We(v,m)),P.setAttribute("faceIndex",new We(M,f)),t.push(P),s>sr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function cm(n,t,e){let i=new ci(n,t,e);return i.texture.mapping=Ul,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ga(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function HM(n,t,e){let i=new Float32Array(es),s=new F(0,1,0);return new kn({name:"SphericalGaussianBlur",defines:{n:es,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ku(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function hm(){return new kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ku(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function um(){return new kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ku(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function ku(){return`

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
	`}function GM(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Eh||l===wh,h=l===ur||l===dr;if(c||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new vl(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let p=a.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new vl(n)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function WM(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&so("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function XM(n,t,e,i){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)t.remove(_[m])}d.removeEventListener("dispose",o),delete s[d.id];let p=r.get(d);p&&(t.remove(p),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let g in d)t.update(d[g],n.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let _=p[g];for(let m=0,f=_.length;m<f;m++)t.update(_[m],n.ARRAY_BUFFER)}}function c(u){let d=[],p=u.index,g=u.attributes.position,_=0;if(p!==null){let T=p.array;_=p.version;for(let v=0,M=T.length;v<M;v+=3){let P=T[v+0],w=T[v+1],R=T[v+2];d.push(P,w,w,R,R,P)}}else if(g!==void 0){let T=g.array;_=g.version;for(let v=0,M=T.length/3-1;v<M;v+=3){let P=v+0,w=v+1,R=v+2;d.push(P,w,w,R,R,P)}}else return;let m=new(ig(d)?gl:ml)(d,1);m.version=_;let f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function YM(n,t,e){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,p){n.drawElements(i,p,r,d*o),e.update(p,i,1)}function c(d,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,d*o,g),e.update(p,i,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,i,1)}function u(d,p,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,d,0,_,0,g);let f=0;for(let T=0;T<g;T++)f+=p[T]*_[T];e.update(f,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function qM(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function $M(n,t,e){let i=new WeakMap,s=new re;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(a);if(d===void 0||d.count!==u){let S=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],T=a.morphAttributes.color||[],v=0;p===!0&&(v=1),g===!0&&(v=2),_===!0&&(v=3);let M=a.attributes.position.count*v,P=1;M>t.maxTextureSize&&(P=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let w=new Float32Array(M*P*4*u),R=new fl(w,M,P,u);R.type=ri,R.needsUpdate=!0;let I=v*4;for(let y=0;y<u;y++){let D=m[y],W=f[y],Y=T[y],B=M*P*4*y;for(let N=0;N<D.count;N++){let C=N*I;p===!0&&(s.fromBufferAttribute(D,N),w[B+C+0]=s.x,w[B+C+1]=s.y,w[B+C+2]=s.z,w[B+C+3]=0),g===!0&&(s.fromBufferAttribute(W,N),w[B+C+4]=s.x,w[B+C+5]=s.y,w[B+C+6]=s.z,w[B+C+7]=0),_===!0&&(s.fromBufferAttribute(Y,N),w[B+C+8]=s.x,w[B+C+9]=s.y,w[B+C+10]=s.z,w[B+C+11]=Y.itemSize===4?s.w:1)}}d={count:u,texture:R,size:new Gt(M,P)},i.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let p=0;for(let _=0;_<c.length;_++)p+=c[_];let g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function ZM(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var Ml=class extends en{constructor(t,e,i,s,r,o,a,l,c,h=or){if(h!==or&&h!==pr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===or&&(i=ss),i===void 0&&h===pr&&(i=fr),super(null,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:bn,this.minFilter=l!==void 0?l:bn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},ag=new en,dm=new Ml(1,1),lg=new fl,cg=new ou,hg=new xl,fm=[],pm=[],mm=new Float32Array(16),gm=new Float32Array(9),_m=new Float32Array(4);function Er(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=fm[s];if(r===void 0&&(r=new Float32Array(s),fm[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ee(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function we(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Fl(n,t){let e=pm[t];e===void 0&&(e=new Int32Array(t),pm[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function KM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function JM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2fv(this.addr,t),we(e,t)}}function QM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;n.uniform3fv(this.addr,t),we(e,t)}}function jM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4fv(this.addr,t),we(e,t)}}function tS(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,i))return;_m.set(i),n.uniformMatrix2fv(this.addr,!1,_m),we(e,i)}}function eS(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,i))return;gm.set(i),n.uniformMatrix3fv(this.addr,!1,gm),we(e,i)}}function nS(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,i))return;mm.set(i),n.uniformMatrix4fv(this.addr,!1,mm),we(e,i)}}function iS(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function sS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2iv(this.addr,t),we(e,t)}}function rS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;n.uniform3iv(this.addr,t),we(e,t)}}function oS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4iv(this.addr,t),we(e,t)}}function aS(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function lS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2uiv(this.addr,t),we(e,t)}}function cS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;n.uniform3uiv(this.addr,t),we(e,t)}}function hS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4uiv(this.addr,t),we(e,t)}}function uS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(dm.compareFunction=ng,r=dm):r=ag,e.setTexture2D(t||r,s)}function dS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||cg,s)}function fS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||hg,s)}function pS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||lg,s)}function mS(n){switch(n){case 5126:return KM;case 35664:return JM;case 35665:return QM;case 35666:return jM;case 35674:return tS;case 35675:return eS;case 35676:return nS;case 5124:case 35670:return iS;case 35667:case 35671:return sS;case 35668:case 35672:return rS;case 35669:case 35673:return oS;case 5125:return aS;case 36294:return lS;case 36295:return cS;case 36296:return hS;case 35678:case 36198:case 36298:case 36306:case 35682:return uS;case 35679:case 36299:case 36307:return dS;case 35680:case 36300:case 36308:case 36293:return fS;case 36289:case 36303:case 36311:case 36292:return pS}}function gS(n,t){n.uniform1fv(this.addr,t)}function _S(n,t){let e=Er(t,this.size,2);n.uniform2fv(this.addr,e)}function xS(n,t){let e=Er(t,this.size,3);n.uniform3fv(this.addr,e)}function yS(n,t){let e=Er(t,this.size,4);n.uniform4fv(this.addr,e)}function vS(n,t){let e=Er(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function MS(n,t){let e=Er(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function SS(n,t){let e=Er(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function bS(n,t){n.uniform1iv(this.addr,t)}function TS(n,t){n.uniform2iv(this.addr,t)}function ES(n,t){n.uniform3iv(this.addr,t)}function wS(n,t){n.uniform4iv(this.addr,t)}function AS(n,t){n.uniform1uiv(this.addr,t)}function CS(n,t){n.uniform2uiv(this.addr,t)}function RS(n,t){n.uniform3uiv(this.addr,t)}function PS(n,t){n.uniform4uiv(this.addr,t)}function IS(n,t,e){let i=this.cache,s=t.length,r=Fl(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),we(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||ag,r[o])}function DS(n,t,e){let i=this.cache,s=t.length,r=Fl(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),we(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||cg,r[o])}function LS(n,t,e){let i=this.cache,s=t.length,r=Fl(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),we(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||hg,r[o])}function US(n,t,e){let i=this.cache,s=t.length,r=Fl(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),we(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||lg,r[o])}function NS(n){switch(n){case 5126:return gS;case 35664:return _S;case 35665:return xS;case 35666:return yS;case 35674:return vS;case 35675:return MS;case 35676:return SS;case 5124:case 35670:return bS;case 35667:case 35671:return TS;case 35668:case 35672:return ES;case 35669:case 35673:return wS;case 5125:return AS;case 36294:return CS;case 36295:return RS;case 36296:return PS;case 35678:case 36198:case 36298:case 36306:case 35682:return IS;case 35679:case 36299:case 36307:return DS;case 35680:case 36300:case 36308:case 36293:return LS;case 36289:case 36303:case 36311:case 36292:return US}}var cu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=mS(e.type)}},hu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=NS(e.type)}},uu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},ah=/(\w+)(\])?(\[|\.)?/g;function xm(n,t){n.seq.push(t),n.map[t.id]=t}function FS(n,t,e){let i=n.name,s=i.length;for(ah.lastIndex=0;;){let r=ah.exec(i),o=ah.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){xm(e,c===void 0?new cu(a,n,t):new hu(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new uu(a),xm(e,u)),e=u}}}var lr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);FS(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function ym(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var OS=37297,BS=0;function zS(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var vm=new Ht;function VS(n){Qt._getMatrix(vm,Qt.workingColorSpace,n);let t=`mat3( ${vm.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(n)){case Nl:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Mm(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+zS(n.getShaderSource(t),o)}else return s}function kS(n,t){let e=VS(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function HS(n,t){let e;switch(t){case fx:e="Linear";break;case px:e="Reinhard";break;case mx:e="Cineon";break;case gx:e="ACESFilmic";break;case xx:e="AgX";break;case yx:e="Neutral";break;case _x:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Wa=new F;function GS(){Qt.getLuminanceCoefficients(Wa);let n=Wa.x.toFixed(4),t=Wa.y.toFixed(4),e=Wa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function WS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ro).join(`
`)}function XS(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function YS(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function ro(n){return n!==""}function Sm(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bm(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var qS=/^[ \t]*#include +<([\w\d./]+)>/gm;function du(n){return n.replace(qS,ZS)}var $S=new Map;function ZS(n,t){let e=Wt[t];if(e===void 0){let i=$S.get(t);if(i!==void 0)e=Wt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return du(e)}var KS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tm(n){return n.replace(KS,JS)}function JS(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Em(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function QS(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Hm?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Y_?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ni&&(t="SHADOWMAP_TYPE_VSM"),t}function jS(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ur:case dr:t="ENVMAP_TYPE_CUBE";break;case Ul:t="ENVMAP_TYPE_CUBE_UV";break}return t}function tb(n){let t="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===dr&&(t="ENVMAP_MODE_REFRACTION"),t}function eb(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Gm:t="ENVMAP_BLENDING_MULTIPLY";break;case ux:t="ENVMAP_BLENDING_MIX";break;case dx:t="ENVMAP_BLENDING_ADD";break}return t}function nb(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function ib(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=QS(e),c=jS(e),h=tb(e),u=eb(e),d=nb(e),p=WS(e),g=XS(r),_=s.createProgram(),m,f,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ro).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ro).join(`
`),f.length>0&&(f+=`
`)):(m=[Em(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ro).join(`
`),f=[Em(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Di?"#define TONE_MAPPING":"",e.toneMapping!==Di?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Di?HS("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,kS("linearToOutputTexel",e.outputColorSpace),GS(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ro).join(`
`)),o=du(o),o=Sm(o,e),o=bm(o,e),a=du(a),a=Sm(a,e),a=bm(a,e),o=Tm(o),a=Tm(a),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===zp?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===zp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let v=T+m+o,M=T+f+a,P=ym(s,s.VERTEX_SHADER,v),w=ym(s,s.FRAGMENT_SHADER,M);s.attachShader(_,P),s.attachShader(_,w),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(D){if(n.debug.checkShaderErrors){let W=s.getProgramInfoLog(_).trim(),Y=s.getShaderInfoLog(P).trim(),B=s.getShaderInfoLog(w).trim(),N=!0,C=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(N=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,P,w);else{let O=Mm(s,P,"vertex"),A=Mm(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+W+`
`+O+`
`+A)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(Y===""||B==="")&&(C=!1);C&&(D.diagnostics={runnable:N,programLog:W,vertexShader:{log:Y,prefix:m},fragmentShader:{log:B,prefix:f}})}s.deleteShader(P),s.deleteShader(w),I=new lr(s,_),S=YS(s,_)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,OS)),y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=BS++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=w,this}var sb=0,fu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new pu(t),e.set(t,i)),i}},pu=class{constructor(t){this.id=sb++,this.code=t,this.usedTimes=0}};function rb(n,t,e,i,s,r,o){let a=new pl,l=new fu,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,y,D,W,Y){let B=W.fog,N=Y.geometry,C=S.isMeshStandardMaterial?W.environment:null,O=(S.isMeshStandardMaterial?e:t).get(S.envMap||C),A=O&&O.mapping===Ul?O.image.height:null,L=g[S.type];S.precision!==null&&(p=s.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));let V=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,X=V!==void 0?V.length:0,Q=0;N.morphAttributes.position!==void 0&&(Q=1),N.morphAttributes.normal!==void 0&&(Q=2),N.morphAttributes.color!==void 0&&(Q=3);let rt,H,$,it;if(L){let ne=Fn[L];rt=ne.vertexShader,H=ne.fragmentShader}else rt=S.vertexShader,H=S.fragmentShader,l.update(S),$=l.getVertexShaderID(S),it=l.getFragmentShaderID(S);let et=n.getRenderTarget(),ct=n.state.buffers.depth.getReversed(),ut=Y.isInstancedMesh===!0,Tt=Y.isBatchedMesh===!0,Ot=!!S.map,ht=!!S.matcap,ft=!!O,U=!!S.aoMap,$t=!!S.lightMap,Ct=!!S.bumpMap,Nt=!!S.normalMap,At=!!S.displacementMap,pt=!!S.emissiveMap,at=!!S.metalnessMap,E=!!S.roughnessMap,x=S.anisotropy>0,q=S.clearcoat>0,j=S.dispersion>0,nt=S.iridescence>0,tt=S.sheen>0,bt=S.transmission>0,dt=x&&!!S.anisotropyMap,gt=q&&!!S.clearcoatMap,Kt=q&&!!S.clearcoatNormalMap,ot=q&&!!S.clearcoatRoughnessMap,St=nt&&!!S.iridescenceMap,Et=nt&&!!S.iridescenceThicknessMap,Ft=tt&&!!S.sheenColorMap,Mt=tt&&!!S.sheenRoughnessMap,wt=!!S.specularMap,Dt=!!S.specularColorMap,ae=!!S.specularIntensityMap,z=bt&&!!S.transmissionMap,_t=bt&&!!S.thicknessMap,J=!!S.gradientMap,st=!!S.alphaMap,vt=S.alphaTest>0,xt=!!S.alphaHash,Vt=!!S.extensions,xe=Di;S.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(xe=n.toneMapping);let Le={shaderID:L,shaderType:S.type,shaderName:S.name,vertexShader:rt,fragmentShader:H,defines:S.defines,customVertexShaderID:$,customFragmentShaderID:it,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Tt,batchingColor:Tt&&Y._colorsTexture!==null,instancing:ut,instancingColor:ut&&Y.instanceColor!==null,instancingMorph:ut&&Y.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:et===null?n.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Tr,alphaToCoverage:!!S.alphaToCoverage,map:Ot,matcap:ht,envMap:ft,envMapMode:ft&&O.mapping,envMapCubeUVHeight:A,aoMap:U,lightMap:$t,bumpMap:Ct,normalMap:Nt,displacementMap:d&&At,emissiveMap:pt,normalMapObjectSpace:Nt&&S.normalMapType===bx,normalMapTangentSpace:Nt&&S.normalMapType===eg,metalnessMap:at,roughnessMap:E,anisotropy:x,anisotropyMap:dt,clearcoat:q,clearcoatMap:gt,clearcoatNormalMap:Kt,clearcoatRoughnessMap:ot,dispersion:j,iridescence:nt,iridescenceMap:St,iridescenceThicknessMap:Et,sheen:tt,sheenColorMap:Ft,sheenRoughnessMap:Mt,specularMap:wt,specularColorMap:Dt,specularIntensityMap:ae,transmission:bt,transmissionMap:z,thicknessMap:_t,gradientMap:J,opaque:S.transparent===!1&&S.blending===rr&&S.alphaToCoverage===!1,alphaMap:st,alphaTest:vt,alphaHash:xt,combine:S.combine,mapUv:Ot&&_(S.map.channel),aoMapUv:U&&_(S.aoMap.channel),lightMapUv:$t&&_(S.lightMap.channel),bumpMapUv:Ct&&_(S.bumpMap.channel),normalMapUv:Nt&&_(S.normalMap.channel),displacementMapUv:At&&_(S.displacementMap.channel),emissiveMapUv:pt&&_(S.emissiveMap.channel),metalnessMapUv:at&&_(S.metalnessMap.channel),roughnessMapUv:E&&_(S.roughnessMap.channel),anisotropyMapUv:dt&&_(S.anisotropyMap.channel),clearcoatMapUv:gt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Kt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Et&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&_(S.sheenRoughnessMap.channel),specularMapUv:wt&&_(S.specularMap.channel),specularColorMapUv:Dt&&_(S.specularColorMap.channel),specularIntensityMapUv:ae&&_(S.specularIntensityMap.channel),transmissionMapUv:z&&_(S.transmissionMap.channel),thicknessMapUv:_t&&_(S.thicknessMap.channel),alphaMapUv:st&&_(S.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Nt||x),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!N.attributes.uv&&(Ot||st),fog:!!B,useFog:S.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ct,skinning:Y.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:X,morphTextureStride:Q,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:xe,decodeVideoTexture:Ot&&S.map.isVideoTexture===!0&&Qt.getTransfer(S.map.colorSpace)===ie,decodeVideoTextureEmissive:pt&&S.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(S.emissiveMap.colorSpace)===ie,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Mn,flipSided:S.side===Ze,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Vt&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Vt&&S.extensions.multiDraw===!0||Tt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function f(S){let y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(let D in S.defines)y.push(D),y.push(S.defines[D]);return S.isRawShaderMaterial===!1&&(T(y,S),v(y,S),y.push(n.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function T(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function v(S,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),S.push(a.mask)}function M(S){let y=g[S.type],D;if(y){let W=Fn[y];D=Zx.clone(W.uniforms)}else D=S.uniforms;return D}function P(S,y){let D;for(let W=0,Y=h.length;W<Y;W++){let B=h[W];if(B.cacheKey===y){D=B,++D.usedTimes;break}}return D===void 0&&(D=new ib(n,y,S,r),h.push(D)),D}function w(S){if(--S.usedTimes===0){let y=h.indexOf(S);h[y]=h[h.length-1],h.pop(),S.destroy()}}function R(S){l.remove(S)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:M,acquireProgram:P,releaseProgram:w,releaseShaderCache:R,programs:h,dispose:I}}function ob(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function ab(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function wm(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Am(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,d,p,g,_,m){let f=n[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},n[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),t++,f}function a(u,d,p,g,_,m){let f=o(u,d,p,g,_,m);p.transmission>0?i.push(f):p.transparent===!0?s.push(f):e.push(f)}function l(u,d,p,g,_,m){let f=o(u,d,p,g,_,m);p.transmission>0?i.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||ab),i.length>1&&i.sort(d||wm),s.length>1&&s.sort(d||wm)}function h(){for(let u=t,d=n.length;u<d;u++){let p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function lb(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new Am,n.set(i,[o])):s>=r.length?(o=new Am,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function cb(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Xt};break;case"SpotLight":e={position:new F,direction:new F,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new F,halfWidth:new F,halfHeight:new F};break}return n[t.id]=e,e}}}function hb(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var ub=0;function db(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function fb(n){let t=new cb,e=hb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);let s=new F,r=new ce,o=new ce;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,T=0,v=0,M=0,P=0,w=0,R=0;c.sort(db);for(let S=0,y=c.length;S<y;S++){let D=c[S],W=D.color,Y=D.intensity,B=D.distance,N=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=W.r*Y,u+=W.g*Y,d+=W.b*Y;else if(D.isLightProbe){for(let C=0;C<9;C++)i.probe[C].addScaledVector(D.sh.coefficients[C],Y);R++}else if(D.isDirectionalLight){let C=t.get(D);if(C.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let O=D.shadow,A=e.get(D);A.shadowIntensity=O.intensity,A.shadowBias=O.bias,A.shadowNormalBias=O.normalBias,A.shadowRadius=O.radius,A.shadowMapSize=O.mapSize,i.directionalShadow[p]=A,i.directionalShadowMap[p]=N,i.directionalShadowMatrix[p]=D.shadow.matrix,T++}i.directional[p]=C,p++}else if(D.isSpotLight){let C=t.get(D);C.position.setFromMatrixPosition(D.matrixWorld),C.color.copy(W).multiplyScalar(Y),C.distance=B,C.coneCos=Math.cos(D.angle),C.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),C.decay=D.decay,i.spot[_]=C;let O=D.shadow;if(D.map&&(i.spotLightMap[P]=D.map,P++,O.updateMatrices(D),D.castShadow&&w++),i.spotLightMatrix[_]=O.matrix,D.castShadow){let A=e.get(D);A.shadowIntensity=O.intensity,A.shadowBias=O.bias,A.shadowNormalBias=O.normalBias,A.shadowRadius=O.radius,A.shadowMapSize=O.mapSize,i.spotShadow[_]=A,i.spotShadowMap[_]=N,M++}_++}else if(D.isRectAreaLight){let C=t.get(D);C.color.copy(W).multiplyScalar(Y),C.halfWidth.set(D.width*.5,0,0),C.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=C,m++}else if(D.isPointLight){let C=t.get(D);if(C.color.copy(D.color).multiplyScalar(D.intensity),C.distance=D.distance,C.decay=D.decay,D.castShadow){let O=D.shadow,A=e.get(D);A.shadowIntensity=O.intensity,A.shadowBias=O.bias,A.shadowNormalBias=O.normalBias,A.shadowRadius=O.radius,A.shadowMapSize=O.mapSize,A.shadowCameraNear=O.camera.near,A.shadowCameraFar=O.camera.far,i.pointShadow[g]=A,i.pointShadowMap[g]=N,i.pointShadowMatrix[g]=D.shadow.matrix,v++}i.point[g]=C,g++}else if(D.isHemisphereLight){let C=t.get(D);C.skyColor.copy(D.color).multiplyScalar(Y),C.groundColor.copy(D.groundColor).multiplyScalar(Y),i.hemi[f]=C,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=mt.LTC_FLOAT_1,i.rectAreaLTC2=mt.LTC_FLOAT_2):(i.rectAreaLTC1=mt.LTC_HALF_1,i.rectAreaLTC2=mt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let I=i.hash;(I.directionalLength!==p||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==m||I.hemiLength!==f||I.numDirectionalShadows!==T||I.numPointShadows!==v||I.numSpotShadows!==M||I.numSpotMaps!==P||I.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=M+P-w,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=R,I.directionalLength=p,I.pointLength=g,I.spotLength=_,I.rectAreaLength=m,I.hemiLength=f,I.numDirectionalShadows=T,I.numPointShadows=v,I.numSpotShadows=M,I.numSpotMaps=P,I.numLightProbes=R,i.version=ub++)}function l(c,h){let u=0,d=0,p=0,g=0,_=0,m=h.matrixWorldInverse;for(let f=0,T=c.length;f<T;f++){let v=c[f];if(v.isDirectionalLight){let M=i.directional[u];M.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(v.isSpotLight){let M=i.spot[p];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),p++}else if(v.isRectAreaLight){let M=i.rectArea[g];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(v.width*.5,0,0),M.halfHeight.set(0,v.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){let M=i.point[d];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){let M=i.hemi[_];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function Cm(n){let t=new fb(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function pb(n){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Cm(n),t.set(s,[a])):r>=o.length?(a=new Cm(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var mu=class extends Vn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Mx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},gu=class extends Vn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},mb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gb=`uniform sampler2D shadow_pass;
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
}`;function _b(n,t,e){let i=new co,s=new Gt,r=new Gt,o=new re,a=new mu({depthPacking:Sx}),l=new gu,c={},h=e.maxTextureSize,u={[Ui]:Ze,[Ze]:Ui,[Mn]:Mn},d=new kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Gt},radius:{value:4}},vertexShader:mb,fragmentShader:gb}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new Te;g.setAttribute("position",new We(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Yt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hm;let f=this.type;this.render=function(w,R,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let S=n.getRenderTarget(),y=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),W=n.state;W.setBlending(Ii),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let Y=f!==ni&&this.type===ni,B=f===ni&&this.type!==ni;for(let N=0,C=w.length;N<C;N++){let O=w[N],A=O.shadow;if(A===void 0){console.warn("THREE.WebGLShadowMap:",O,"has no shadow.");continue}if(A.autoUpdate===!1&&A.needsUpdate===!1)continue;s.copy(A.mapSize);let L=A.getFrameExtents();if(s.multiply(L),r.copy(A.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/L.x),s.x=r.x*L.x,A.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/L.y),s.y=r.y*L.y,A.mapSize.y=r.y)),A.map===null||Y===!0||B===!0){let X=this.type!==ni?{minFilter:bn,magFilter:bn}:{};A.map!==null&&A.map.dispose(),A.map=new ci(s.x,s.y,X),A.map.texture.name=O.name+".shadowMap",A.camera.updateProjectionMatrix()}n.setRenderTarget(A.map),n.clear();let V=A.getViewportCount();for(let X=0;X<V;X++){let Q=A.getViewport(X);o.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),W.viewport(o),A.updateMatrices(O,X),i=A.getFrustum(),M(R,I,A.camera,O,this.type)}A.isPointLightShadow!==!0&&this.type===ni&&T(A,I),A.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(S,y,D)};function T(w,R){let I=t.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ci(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(R,null,I,d,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(R,null,I,p,_,null)}function v(w,R,I,S){let y=null,D=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)y=D;else if(y=I.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let W=y.uuid,Y=R.uuid,B=c[W];B===void 0&&(B={},c[W]=B);let N=B[Y];N===void 0&&(N=y.clone(),B[Y]=N,R.addEventListener("dispose",P)),y=N}if(y.visible=R.visible,y.wireframe=R.wireframe,S===ni?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:u[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,I.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let W=n.properties.get(y);W.light=I}return y}function M(w,R,I,S,y){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===ni)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);let Y=t.update(w),B=w.material;if(Array.isArray(B)){let N=Y.groups;for(let C=0,O=N.length;C<O;C++){let A=N[C],L=B[A.materialIndex];if(L&&L.visible){let V=v(w,L,S,y);w.onBeforeShadow(n,w,R,I,Y,V,A),n.renderBufferDirect(I,null,Y,V,w,A),w.onAfterShadow(n,w,R,I,Y,V,A)}}}else if(B.visible){let N=v(w,B,S,y);w.onBeforeShadow(n,w,R,I,Y,N,null),n.renderBufferDirect(I,null,Y,N,w,null),w.onAfterShadow(n,w,R,I,Y,N,null)}}let W=w.children;for(let Y=0,B=W.length;Y<B;Y++)M(W[Y],R,I,S,y)}function P(w){w.target.removeEventListener("dispose",P);for(let I in c){let S=c[I],y=w.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}var xb={[xh]:yh,[vh]:bh,[Mh]:Th,[hr]:Sh,[yh]:xh,[bh]:vh,[Th]:Mh,[Sh]:hr};function yb(n,t){function e(){let z=!1,_t=new re,J=null,st=new re(0,0,0,0);return{setMask:function(vt){J!==vt&&!z&&(n.colorMask(vt,vt,vt,vt),J=vt)},setLocked:function(vt){z=vt},setClear:function(vt,xt,Vt,xe,Le){Le===!0&&(vt*=xe,xt*=xe,Vt*=xe),_t.set(vt,xt,Vt,xe),st.equals(_t)===!1&&(n.clearColor(vt,xt,Vt,xe),st.copy(_t))},reset:function(){z=!1,J=null,st.set(-1,0,0,0)}}}function i(){let z=!1,_t=!1,J=null,st=null,vt=null;return{setReversed:function(xt){if(_t!==xt){let Vt=t.get("EXT_clip_control");_t?Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.ZERO_TO_ONE_EXT):Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.NEGATIVE_ONE_TO_ONE_EXT);let xe=vt;vt=null,this.setClear(xe)}_t=xt},getReversed:function(){return _t},setTest:function(xt){xt?et(n.DEPTH_TEST):ct(n.DEPTH_TEST)},setMask:function(xt){J!==xt&&!z&&(n.depthMask(xt),J=xt)},setFunc:function(xt){if(_t&&(xt=xb[xt]),st!==xt){switch(xt){case xh:n.depthFunc(n.NEVER);break;case yh:n.depthFunc(n.ALWAYS);break;case vh:n.depthFunc(n.LESS);break;case hr:n.depthFunc(n.LEQUAL);break;case Mh:n.depthFunc(n.EQUAL);break;case Sh:n.depthFunc(n.GEQUAL);break;case bh:n.depthFunc(n.GREATER);break;case Th:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}st=xt}},setLocked:function(xt){z=xt},setClear:function(xt){vt!==xt&&(_t&&(xt=1-xt),n.clearDepth(xt),vt=xt)},reset:function(){z=!1,J=null,st=null,vt=null,_t=!1}}}function s(){let z=!1,_t=null,J=null,st=null,vt=null,xt=null,Vt=null,xe=null,Le=null;return{setTest:function(ne){z||(ne?et(n.STENCIL_TEST):ct(n.STENCIL_TEST))},setMask:function(ne){_t!==ne&&!z&&(n.stencilMask(ne),_t=ne)},setFunc:function(ne,mn,Xn){(J!==ne||st!==mn||vt!==Xn)&&(n.stencilFunc(ne,mn,Xn),J=ne,st=mn,vt=Xn)},setOp:function(ne,mn,Xn){(xt!==ne||Vt!==mn||xe!==Xn)&&(n.stencilOp(ne,mn,Xn),xt=ne,Vt=mn,xe=Xn)},setLocked:function(ne){z=ne},setClear:function(ne){Le!==ne&&(n.clearStencil(ne),Le=ne)},reset:function(){z=!1,_t=null,J=null,st=null,vt=null,xt=null,Vt=null,xe=null,Le=null}}}let r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,T=null,v=null,M=null,P=null,w=null,R=new Xt(0,0,0),I=0,S=!1,y=null,D=null,W=null,Y=null,B=null,N=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),C=!1,O=0,A=n.getParameter(n.VERSION);A.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(A)[1]),C=O>=1):A.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(A)[1]),C=O>=2);let L=null,V={},X=n.getParameter(n.SCISSOR_BOX),Q=n.getParameter(n.VIEWPORT),rt=new re().fromArray(X),H=new re().fromArray(Q);function $(z,_t,J,st){let vt=new Uint8Array(4),xt=n.createTexture();n.bindTexture(z,xt),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Vt=0;Vt<J;Vt++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(_t,0,n.RGBA,1,1,st,0,n.RGBA,n.UNSIGNED_BYTE,vt):n.texImage2D(_t+Vt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,vt);return xt}let it={};it[n.TEXTURE_2D]=$(n.TEXTURE_2D,n.TEXTURE_2D,1),it[n.TEXTURE_CUBE_MAP]=$(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[n.TEXTURE_2D_ARRAY]=$(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),it[n.TEXTURE_3D]=$(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),et(n.DEPTH_TEST),o.setFunc(hr),Ct(!1),Nt(Dp),et(n.CULL_FACE),U(Ii);function et(z){h[z]!==!0&&(n.enable(z),h[z]=!0)}function ct(z){h[z]!==!1&&(n.disable(z),h[z]=!1)}function ut(z,_t){return u[z]!==_t?(n.bindFramebuffer(z,_t),u[z]=_t,z===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=_t),z===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=_t),!0):!1}function Tt(z,_t){let J=p,st=!1;if(z){J=d.get(_t),J===void 0&&(J=[],d.set(_t,J));let vt=z.textures;if(J.length!==vt.length||J[0]!==n.COLOR_ATTACHMENT0){for(let xt=0,Vt=vt.length;xt<Vt;xt++)J[xt]=n.COLOR_ATTACHMENT0+xt;J.length=vt.length,st=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,st=!0);st&&n.drawBuffers(J)}function Ot(z){return g!==z?(n.useProgram(z),g=z,!0):!1}let ht={[ts]:n.FUNC_ADD,[$_]:n.FUNC_SUBTRACT,[Z_]:n.FUNC_REVERSE_SUBTRACT};ht[K_]=n.MIN,ht[J_]=n.MAX;let ft={[Q_]:n.ZERO,[j_]:n.ONE,[tx]:n.SRC_COLOR,[gh]:n.SRC_ALPHA,[ox]:n.SRC_ALPHA_SATURATE,[sx]:n.DST_COLOR,[nx]:n.DST_ALPHA,[ex]:n.ONE_MINUS_SRC_COLOR,[_h]:n.ONE_MINUS_SRC_ALPHA,[rx]:n.ONE_MINUS_DST_COLOR,[ix]:n.ONE_MINUS_DST_ALPHA,[ax]:n.CONSTANT_COLOR,[lx]:n.ONE_MINUS_CONSTANT_COLOR,[cx]:n.CONSTANT_ALPHA,[hx]:n.ONE_MINUS_CONSTANT_ALPHA};function U(z,_t,J,st,vt,xt,Vt,xe,Le,ne){if(z===Ii){_===!0&&(ct(n.BLEND),_=!1);return}if(_===!1&&(et(n.BLEND),_=!0),z!==q_){if(z!==m||ne!==S){if((f!==ts||M!==ts)&&(n.blendEquation(n.FUNC_ADD),f=ts,M=ts),ne)switch(z){case rr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case cr:n.blendFunc(n.ONE,n.ONE);break;case Lp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Up:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case rr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case cr:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Lp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Up:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}T=null,v=null,P=null,w=null,R.set(0,0,0),I=0,m=z,S=ne}return}vt=vt||_t,xt=xt||J,Vt=Vt||st,(_t!==f||vt!==M)&&(n.blendEquationSeparate(ht[_t],ht[vt]),f=_t,M=vt),(J!==T||st!==v||xt!==P||Vt!==w)&&(n.blendFuncSeparate(ft[J],ft[st],ft[xt],ft[Vt]),T=J,v=st,P=xt,w=Vt),(xe.equals(R)===!1||Le!==I)&&(n.blendColor(xe.r,xe.g,xe.b,Le),R.copy(xe),I=Le),m=z,S=!1}function $t(z,_t){z.side===Mn?ct(n.CULL_FACE):et(n.CULL_FACE);let J=z.side===Ze;_t&&(J=!J),Ct(J),z.blending===rr&&z.transparent===!1?U(Ii):U(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);let st=z.stencilWrite;a.setTest(st),st&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),pt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?et(n.SAMPLE_ALPHA_TO_COVERAGE):ct(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ct(z){y!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),y=z)}function Nt(z){z!==W_?(et(n.CULL_FACE),z!==D&&(z===Dp?n.cullFace(n.BACK):z===X_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ct(n.CULL_FACE),D=z}function At(z){z!==W&&(C&&n.lineWidth(z),W=z)}function pt(z,_t,J){z?(et(n.POLYGON_OFFSET_FILL),(Y!==_t||B!==J)&&(n.polygonOffset(_t,J),Y=_t,B=J)):ct(n.POLYGON_OFFSET_FILL)}function at(z){z?et(n.SCISSOR_TEST):ct(n.SCISSOR_TEST)}function E(z){z===void 0&&(z=n.TEXTURE0+N-1),L!==z&&(n.activeTexture(z),L=z)}function x(z,_t,J){J===void 0&&(L===null?J=n.TEXTURE0+N-1:J=L);let st=V[J];st===void 0&&(st={type:void 0,texture:void 0},V[J]=st),(st.type!==z||st.texture!==_t)&&(L!==J&&(n.activeTexture(J),L=J),n.bindTexture(z,_t||it[z]),st.type=z,st.texture=_t)}function q(){let z=V[L];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function j(){try{n.compressedTexImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function nt(){try{n.compressedTexImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function tt(){try{n.texSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function bt(){try{n.texSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function dt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function gt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Kt(){try{n.texStorage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ot(){try{n.texStorage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function St(){try{n.texImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Et(){try{n.texImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ft(z){rt.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),rt.copy(z))}function Mt(z){H.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),H.copy(z))}function wt(z,_t){let J=c.get(_t);J===void 0&&(J=new WeakMap,c.set(_t,J));let st=J.get(z);st===void 0&&(st=n.getUniformBlockIndex(_t,z.name),J.set(z,st))}function Dt(z,_t){let st=c.get(_t).get(z);l.get(_t)!==st&&(n.uniformBlockBinding(_t,st,z.__bindingPointIndex),l.set(_t,st))}function ae(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},L=null,V={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,T=null,v=null,M=null,P=null,w=null,R=new Xt(0,0,0),I=0,S=!1,y=null,D=null,W=null,Y=null,B=null,rt.set(0,0,n.canvas.width,n.canvas.height),H.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:et,disable:ct,bindFramebuffer:ut,drawBuffers:Tt,useProgram:Ot,setBlending:U,setMaterial:$t,setFlipSided:Ct,setCullFace:Nt,setLineWidth:At,setPolygonOffset:pt,setScissorTest:at,activeTexture:E,bindTexture:x,unbindTexture:q,compressedTexImage2D:j,compressedTexImage3D:nt,texImage2D:St,texImage3D:Et,updateUBOMapping:wt,uniformBlockBinding:Dt,texStorage2D:Kt,texStorage3D:ot,texSubImage2D:tt,texSubImage3D:bt,compressedTexSubImage2D:dt,compressedTexSubImage3D:gt,scissor:Ft,viewport:Mt,reset:ae}}function Rm(n,t,e,i){let s=vb(i);switch(e){case $m:return n*t;case Km:return n*t;case Jm:return n*t*2;case Qm:return n*t/s.components*s.byteLength;case Bu:return n*t/s.components*s.byteLength;case jm:return n*t*2/s.components*s.byteLength;case zu:return n*t*2/s.components*s.byteLength;case Zm:return n*t*3/s.components*s.byteLength;case Sn:return n*t*4/s.components*s.byteLength;case Vu:return n*t*4/s.components*s.byteLength;case il:case sl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case rl:case ol:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ph:case Dh:return Math.max(n,16)*Math.max(t,8)/4;case Rh:case Ih:return Math.max(n,8)*Math.max(t,8)/2;case Lh:case Uh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Nh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Fh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Oh:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Bh:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case zh:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Vh:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case kh:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Hh:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Gh:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Wh:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Xh:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Yh:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case qh:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case $h:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Zh:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case al:case Kh:case Jh:return Math.ceil(n/4)*Math.ceil(t/4)*16;case tg:case Qh:return Math.ceil(n/4)*Math.ceil(t/4)*8;case jh:case tu:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vb(n){switch(n){case li:case Xm:return{byteLength:1,components:1};case ao:case Ym:case po:return{byteLength:2,components:1};case Fu:case Ou:return{byteLength:2,components:4};case ss:case Nu:case ri:return{byteLength:4,components:1};case qm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Mb(n,t,e,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Gt,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,x){return p?new OffscreenCanvas(E,x):ul("canvas")}function _(E,x,q){let j=1,nt=at(E);if((nt.width>q||nt.height>q)&&(j=q/Math.max(nt.width,nt.height)),j<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let tt=Math.floor(j*nt.width),bt=Math.floor(j*nt.height);u===void 0&&(u=g(tt,bt));let dt=x?g(tt,bt):u;return dt.width=tt,dt.height=bt,dt.getContext("2d").drawImage(E,0,0,tt,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+tt+"x"+bt+")."),dt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),E;return E}function m(E){return E.generateMipmaps}function f(E){n.generateMipmap(E)}function T(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(E,x,q,j,nt=!1){if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let tt=x;if(x===n.RED&&(q===n.FLOAT&&(tt=n.R32F),q===n.HALF_FLOAT&&(tt=n.R16F),q===n.UNSIGNED_BYTE&&(tt=n.R8)),x===n.RED_INTEGER&&(q===n.UNSIGNED_BYTE&&(tt=n.R8UI),q===n.UNSIGNED_SHORT&&(tt=n.R16UI),q===n.UNSIGNED_INT&&(tt=n.R32UI),q===n.BYTE&&(tt=n.R8I),q===n.SHORT&&(tt=n.R16I),q===n.INT&&(tt=n.R32I)),x===n.RG&&(q===n.FLOAT&&(tt=n.RG32F),q===n.HALF_FLOAT&&(tt=n.RG16F),q===n.UNSIGNED_BYTE&&(tt=n.RG8)),x===n.RG_INTEGER&&(q===n.UNSIGNED_BYTE&&(tt=n.RG8UI),q===n.UNSIGNED_SHORT&&(tt=n.RG16UI),q===n.UNSIGNED_INT&&(tt=n.RG32UI),q===n.BYTE&&(tt=n.RG8I),q===n.SHORT&&(tt=n.RG16I),q===n.INT&&(tt=n.RG32I)),x===n.RGB_INTEGER&&(q===n.UNSIGNED_BYTE&&(tt=n.RGB8UI),q===n.UNSIGNED_SHORT&&(tt=n.RGB16UI),q===n.UNSIGNED_INT&&(tt=n.RGB32UI),q===n.BYTE&&(tt=n.RGB8I),q===n.SHORT&&(tt=n.RGB16I),q===n.INT&&(tt=n.RGB32I)),x===n.RGBA_INTEGER&&(q===n.UNSIGNED_BYTE&&(tt=n.RGBA8UI),q===n.UNSIGNED_SHORT&&(tt=n.RGBA16UI),q===n.UNSIGNED_INT&&(tt=n.RGBA32UI),q===n.BYTE&&(tt=n.RGBA8I),q===n.SHORT&&(tt=n.RGBA16I),q===n.INT&&(tt=n.RGBA32I)),x===n.RGB&&q===n.UNSIGNED_INT_5_9_9_9_REV&&(tt=n.RGB9_E5),x===n.RGBA){let bt=nt?Nl:Qt.getTransfer(j);q===n.FLOAT&&(tt=n.RGBA32F),q===n.HALF_FLOAT&&(tt=n.RGBA16F),q===n.UNSIGNED_BYTE&&(tt=bt===ie?n.SRGB8_ALPHA8:n.RGBA8),q===n.UNSIGNED_SHORT_4_4_4_4&&(tt=n.RGBA4),q===n.UNSIGNED_SHORT_5_5_5_1&&(tt=n.RGB5_A1)}return(tt===n.R16F||tt===n.R32F||tt===n.RG16F||tt===n.RG32F||tt===n.RGBA16F||tt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function M(E,x){let q;return E?x===null||x===ss||x===fr?q=n.DEPTH24_STENCIL8:x===ri?q=n.DEPTH32F_STENCIL8:x===ao&&(q=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ss||x===fr?q=n.DEPTH_COMPONENT24:x===ri?q=n.DEPTH_COMPONENT32F:x===ao&&(q=n.DEPTH_COMPONENT16),q}function P(E,x){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==bn&&E.minFilter!==Bn?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function w(E){let x=E.target;x.removeEventListener("dispose",w),I(x),x.isVideoTexture&&h.delete(x)}function R(E){let x=E.target;x.removeEventListener("dispose",R),y(x)}function I(E){let x=i.get(E);if(x.__webglInit===void 0)return;let q=E.source,j=d.get(q);if(j){let nt=j[x.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&S(E),Object.keys(j).length===0&&d.delete(q)}i.remove(E)}function S(E){let x=i.get(E);n.deleteTexture(x.__webglTexture);let q=E.source,j=d.get(q);delete j[x.__cacheKey],o.memory.textures--}function y(E){let x=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(x.__webglFramebuffer[j]))for(let nt=0;nt<x.__webglFramebuffer[j].length;nt++)n.deleteFramebuffer(x.__webglFramebuffer[j][nt]);else n.deleteFramebuffer(x.__webglFramebuffer[j]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[j])}else{if(Array.isArray(x.__webglFramebuffer))for(let j=0;j<x.__webglFramebuffer.length;j++)n.deleteFramebuffer(x.__webglFramebuffer[j]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let j=0;j<x.__webglColorRenderbuffer.length;j++)x.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[j]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let q=E.textures;for(let j=0,nt=q.length;j<nt;j++){let tt=i.get(q[j]);tt.__webglTexture&&(n.deleteTexture(tt.__webglTexture),o.memory.textures--),i.remove(q[j])}i.remove(E)}let D=0;function W(){D=0}function Y(){let E=D;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),D+=1,E}function B(E){let x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function N(E,x){let q=i.get(E);if(E.isVideoTexture&&At(E),E.isRenderTargetTexture===!1&&E.version>0&&q.__version!==E.version){let j=E.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{H(q,E,x);return}}e.bindTexture(n.TEXTURE_2D,q.__webglTexture,n.TEXTURE0+x)}function C(E,x){let q=i.get(E);if(E.version>0&&q.__version!==E.version){H(q,E,x);return}e.bindTexture(n.TEXTURE_2D_ARRAY,q.__webglTexture,n.TEXTURE0+x)}function O(E,x){let q=i.get(E);if(E.version>0&&q.__version!==E.version){H(q,E,x);return}e.bindTexture(n.TEXTURE_3D,q.__webglTexture,n.TEXTURE0+x)}function A(E,x){let q=i.get(E);if(E.version>0&&q.__version!==E.version){$(q,E,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture,n.TEXTURE0+x)}let L={[Ah]:n.REPEAT,[ns]:n.CLAMP_TO_EDGE,[Ch]:n.MIRRORED_REPEAT},V={[bn]:n.NEAREST,[vx]:n.NEAREST_MIPMAP_NEAREST,[Ta]:n.NEAREST_MIPMAP_LINEAR,[Bn]:n.LINEAR,[Lc]:n.LINEAR_MIPMAP_NEAREST,[is]:n.LINEAR_MIPMAP_LINEAR},X={[Tx]:n.NEVER,[Px]:n.ALWAYS,[Ex]:n.LESS,[ng]:n.LEQUAL,[wx]:n.EQUAL,[Rx]:n.GEQUAL,[Ax]:n.GREATER,[Cx]:n.NOTEQUAL};function Q(E,x){if(x.type===ri&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Bn||x.magFilter===Lc||x.magFilter===Ta||x.magFilter===is||x.minFilter===Bn||x.minFilter===Lc||x.minFilter===Ta||x.minFilter===is)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,L[x.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,L[x.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,L[x.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,V[x.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,V[x.minFilter]),x.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,X[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===bn||x.minFilter!==Ta&&x.minFilter!==is||x.type===ri&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let q=t.get("EXT_texture_filter_anisotropic");n.texParameterf(E,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function rt(E,x){let q=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",w));let j=x.source,nt=d.get(j);nt===void 0&&(nt={},d.set(j,nt));let tt=B(x);if(tt!==E.__cacheKey){nt[tt]===void 0&&(nt[tt]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,q=!0),nt[tt].usedTimes++;let bt=nt[E.__cacheKey];bt!==void 0&&(nt[E.__cacheKey].usedTimes--,bt.usedTimes===0&&S(x)),E.__cacheKey=tt,E.__webglTexture=nt[tt].texture}return q}function H(E,x,q){let j=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(j=n.TEXTURE_3D);let nt=rt(E,x),tt=x.source;e.bindTexture(j,E.__webglTexture,n.TEXTURE0+q);let bt=i.get(tt);if(tt.version!==bt.__version||nt===!0){e.activeTexture(n.TEXTURE0+q);let dt=Qt.getPrimaries(Qt.workingColorSpace),gt=x.colorSpace===Pi?null:Qt.getPrimaries(x.colorSpace),Kt=x.colorSpace===Pi||dt===gt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt);let ot=_(x.image,!1,s.maxTextureSize);ot=pt(x,ot);let St=r.convert(x.format,x.colorSpace),Et=r.convert(x.type),Ft=v(x.internalFormat,St,Et,x.colorSpace,x.isVideoTexture);Q(j,x);let Mt,wt=x.mipmaps,Dt=x.isVideoTexture!==!0,ae=bt.__version===void 0||nt===!0,z=tt.dataReady,_t=P(x,ot);if(x.isDepthTexture)Ft=M(x.format===pr,x.type),ae&&(Dt?e.texStorage2D(n.TEXTURE_2D,1,Ft,ot.width,ot.height):e.texImage2D(n.TEXTURE_2D,0,Ft,ot.width,ot.height,0,St,Et,null));else if(x.isDataTexture)if(wt.length>0){Dt&&ae&&e.texStorage2D(n.TEXTURE_2D,_t,Ft,wt[0].width,wt[0].height);for(let J=0,st=wt.length;J<st;J++)Mt=wt[J],Dt?z&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,Mt.width,Mt.height,St,Et,Mt.data):e.texImage2D(n.TEXTURE_2D,J,Ft,Mt.width,Mt.height,0,St,Et,Mt.data);x.generateMipmaps=!1}else Dt?(ae&&e.texStorage2D(n.TEXTURE_2D,_t,Ft,ot.width,ot.height),z&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ot.width,ot.height,St,Et,ot.data)):e.texImage2D(n.TEXTURE_2D,0,Ft,ot.width,ot.height,0,St,Et,ot.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Dt&&ae&&e.texStorage3D(n.TEXTURE_2D_ARRAY,_t,Ft,wt[0].width,wt[0].height,ot.depth);for(let J=0,st=wt.length;J<st;J++)if(Mt=wt[J],x.format!==Sn)if(St!==null)if(Dt){if(z)if(x.layerUpdates.size>0){let vt=Rm(Mt.width,Mt.height,x.format,x.type);for(let xt of x.layerUpdates){let Vt=Mt.data.subarray(xt*vt/Mt.data.BYTES_PER_ELEMENT,(xt+1)*vt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,xt,Mt.width,Mt.height,1,St,Vt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Mt.width,Mt.height,ot.depth,St,Mt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,Ft,Mt.width,Mt.height,ot.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?z&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Mt.width,Mt.height,ot.depth,St,Et,Mt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,J,Ft,Mt.width,Mt.height,ot.depth,0,St,Et,Mt.data)}else{Dt&&ae&&e.texStorage2D(n.TEXTURE_2D,_t,Ft,wt[0].width,wt[0].height);for(let J=0,st=wt.length;J<st;J++)Mt=wt[J],x.format!==Sn?St!==null?Dt?z&&e.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,Mt.width,Mt.height,St,Mt.data):e.compressedTexImage2D(n.TEXTURE_2D,J,Ft,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?z&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,Mt.width,Mt.height,St,Et,Mt.data):e.texImage2D(n.TEXTURE_2D,J,Ft,Mt.width,Mt.height,0,St,Et,Mt.data)}else if(x.isDataArrayTexture)if(Dt){if(ae&&e.texStorage3D(n.TEXTURE_2D_ARRAY,_t,Ft,ot.width,ot.height,ot.depth),z)if(x.layerUpdates.size>0){let J=Rm(ot.width,ot.height,x.format,x.type);for(let st of x.layerUpdates){let vt=ot.data.subarray(st*J/ot.data.BYTES_PER_ELEMENT,(st+1)*J/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,st,ot.width,ot.height,1,St,Et,vt)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,St,Et,ot.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ft,ot.width,ot.height,ot.depth,0,St,Et,ot.data);else if(x.isData3DTexture)Dt?(ae&&e.texStorage3D(n.TEXTURE_3D,_t,Ft,ot.width,ot.height,ot.depth),z&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,St,Et,ot.data)):e.texImage3D(n.TEXTURE_3D,0,Ft,ot.width,ot.height,ot.depth,0,St,Et,ot.data);else if(x.isFramebufferTexture){if(ae)if(Dt)e.texStorage2D(n.TEXTURE_2D,_t,Ft,ot.width,ot.height);else{let J=ot.width,st=ot.height;for(let vt=0;vt<_t;vt++)e.texImage2D(n.TEXTURE_2D,vt,Ft,J,st,0,St,Et,null),J>>=1,st>>=1}}else if(wt.length>0){if(Dt&&ae){let J=at(wt[0]);e.texStorage2D(n.TEXTURE_2D,_t,Ft,J.width,J.height)}for(let J=0,st=wt.length;J<st;J++)Mt=wt[J],Dt?z&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,St,Et,Mt):e.texImage2D(n.TEXTURE_2D,J,Ft,St,Et,Mt);x.generateMipmaps=!1}else if(Dt){if(ae){let J=at(ot);e.texStorage2D(n.TEXTURE_2D,_t,Ft,J.width,J.height)}z&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,St,Et,ot)}else e.texImage2D(n.TEXTURE_2D,0,Ft,St,Et,ot);m(x)&&f(j),bt.__version=tt.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function $(E,x,q){if(x.image.length!==6)return;let j=rt(E,x),nt=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+q);let tt=i.get(nt);if(nt.version!==tt.__version||j===!0){e.activeTexture(n.TEXTURE0+q);let bt=Qt.getPrimaries(Qt.workingColorSpace),dt=x.colorSpace===Pi?null:Qt.getPrimaries(x.colorSpace),gt=x.colorSpace===Pi||bt===dt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);let Kt=x.isCompressedTexture||x.image[0].isCompressedTexture,ot=x.image[0]&&x.image[0].isDataTexture,St=[];for(let st=0;st<6;st++)!Kt&&!ot?St[st]=_(x.image[st],!0,s.maxCubemapSize):St[st]=ot?x.image[st].image:x.image[st],St[st]=pt(x,St[st]);let Et=St[0],Ft=r.convert(x.format,x.colorSpace),Mt=r.convert(x.type),wt=v(x.internalFormat,Ft,Mt,x.colorSpace),Dt=x.isVideoTexture!==!0,ae=tt.__version===void 0||j===!0,z=nt.dataReady,_t=P(x,Et);Q(n.TEXTURE_CUBE_MAP,x);let J;if(Kt){Dt&&ae&&e.texStorage2D(n.TEXTURE_CUBE_MAP,_t,wt,Et.width,Et.height);for(let st=0;st<6;st++){J=St[st].mipmaps;for(let vt=0;vt<J.length;vt++){let xt=J[vt];x.format!==Sn?Ft!==null?Dt?z&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,vt,0,0,xt.width,xt.height,Ft,xt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,vt,wt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Dt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,vt,0,0,xt.width,xt.height,Ft,Mt,xt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,vt,wt,xt.width,xt.height,0,Ft,Mt,xt.data)}}}else{if(J=x.mipmaps,Dt&&ae){J.length>0&&_t++;let st=at(St[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,_t,wt,st.width,st.height)}for(let st=0;st<6;st++)if(ot){Dt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,St[st].width,St[st].height,Ft,Mt,St[st].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,wt,St[st].width,St[st].height,0,Ft,Mt,St[st].data);for(let vt=0;vt<J.length;vt++){let Vt=J[vt].image[st].image;Dt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,vt+1,0,0,Vt.width,Vt.height,Ft,Mt,Vt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,vt+1,wt,Vt.width,Vt.height,0,Ft,Mt,Vt.data)}}else{Dt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Ft,Mt,St[st]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,wt,Ft,Mt,St[st]);for(let vt=0;vt<J.length;vt++){let xt=J[vt];Dt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,vt+1,0,0,Ft,Mt,xt.image[st]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,vt+1,wt,Ft,Mt,xt.image[st])}}}m(x)&&f(n.TEXTURE_CUBE_MAP),tt.__version=nt.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function it(E,x,q,j,nt,tt){let bt=r.convert(q.format,q.colorSpace),dt=r.convert(q.type),gt=v(q.internalFormat,bt,dt,q.colorSpace),Kt=i.get(x),ot=i.get(q);if(ot.__renderTarget=x,!Kt.__hasExternalTextures){let St=Math.max(1,x.width>>tt),Et=Math.max(1,x.height>>tt);nt===n.TEXTURE_3D||nt===n.TEXTURE_2D_ARRAY?e.texImage3D(nt,tt,gt,St,Et,x.depth,0,bt,dt,null):e.texImage2D(nt,tt,gt,St,Et,0,bt,dt,null)}e.bindFramebuffer(n.FRAMEBUFFER,E),Nt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,nt,ot.__webglTexture,0,Ct(x)):(nt===n.TEXTURE_2D||nt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,nt,ot.__webglTexture,tt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function et(E,x,q){if(n.bindRenderbuffer(n.RENDERBUFFER,E),x.depthBuffer){let j=x.depthTexture,nt=j&&j.isDepthTexture?j.type:null,tt=M(x.stencilBuffer,nt),bt=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,dt=Ct(x);Nt(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,dt,tt,x.width,x.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,dt,tt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,tt,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,bt,n.RENDERBUFFER,E)}else{let j=x.textures;for(let nt=0;nt<j.length;nt++){let tt=j[nt],bt=r.convert(tt.format,tt.colorSpace),dt=r.convert(tt.type),gt=v(tt.internalFormat,bt,dt,tt.colorSpace),Kt=Ct(x);q&&Nt(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Kt,gt,x.width,x.height):Nt(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Kt,gt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,gt,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ct(E,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let j=i.get(x.depthTexture);j.__renderTarget=x,(!j.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),N(x.depthTexture,0);let nt=j.__webglTexture,tt=Ct(x);if(x.depthTexture.format===or)Nt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,nt,0,tt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,nt,0);else if(x.depthTexture.format===pr)Nt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,nt,0,tt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function ut(E){let x=i.get(E),q=E.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==E.depthTexture){let j=E.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),j){let nt=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,j.removeEventListener("dispose",nt)};j.addEventListener("dispose",nt),x.__depthDisposeCallback=nt}x.__boundDepthTexture=j}if(E.depthTexture&&!x.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");ct(x.__webglFramebuffer,E)}else if(q){x.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[j]),x.__webglDepthbuffer[j]===void 0)x.__webglDepthbuffer[j]=n.createRenderbuffer(),et(x.__webglDepthbuffer[j],E,!1);else{let nt=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,tt=x.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,tt),n.framebufferRenderbuffer(n.FRAMEBUFFER,nt,n.RENDERBUFFER,tt)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),et(x.__webglDepthbuffer,E,!1);else{let j=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,nt=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,nt),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,nt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Tt(E,x,q){let j=i.get(E);x!==void 0&&it(j.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),q!==void 0&&ut(E)}function Ot(E){let x=E.texture,q=i.get(E),j=i.get(x);E.addEventListener("dispose",R);let nt=E.textures,tt=E.isWebGLCubeRenderTarget===!0,bt=nt.length>1;if(bt||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=x.version,o.memory.textures++),tt){q.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(x.mipmaps&&x.mipmaps.length>0){q.__webglFramebuffer[dt]=[];for(let gt=0;gt<x.mipmaps.length;gt++)q.__webglFramebuffer[dt][gt]=n.createFramebuffer()}else q.__webglFramebuffer[dt]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){q.__webglFramebuffer=[];for(let dt=0;dt<x.mipmaps.length;dt++)q.__webglFramebuffer[dt]=n.createFramebuffer()}else q.__webglFramebuffer=n.createFramebuffer();if(bt)for(let dt=0,gt=nt.length;dt<gt;dt++){let Kt=i.get(nt[dt]);Kt.__webglTexture===void 0&&(Kt.__webglTexture=n.createTexture(),o.memory.textures++)}if(E.samples>0&&Nt(E)===!1){q.__webglMultisampledFramebuffer=n.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let dt=0;dt<nt.length;dt++){let gt=nt[dt];q.__webglColorRenderbuffer[dt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,q.__webglColorRenderbuffer[dt]);let Kt=r.convert(gt.format,gt.colorSpace),ot=r.convert(gt.type),St=v(gt.internalFormat,Kt,ot,gt.colorSpace,E.isXRRenderTarget===!0),Et=Ct(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,Et,St,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,q.__webglColorRenderbuffer[dt])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(q.__webglDepthRenderbuffer=n.createRenderbuffer(),et(q.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(tt){e.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),Q(n.TEXTURE_CUBE_MAP,x);for(let dt=0;dt<6;dt++)if(x.mipmaps&&x.mipmaps.length>0)for(let gt=0;gt<x.mipmaps.length;gt++)it(q.__webglFramebuffer[dt][gt],E,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,gt);else it(q.__webglFramebuffer[dt],E,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);m(x)&&f(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let dt=0,gt=nt.length;dt<gt;dt++){let Kt=nt[dt],ot=i.get(Kt);e.bindTexture(n.TEXTURE_2D,ot.__webglTexture),Q(n.TEXTURE_2D,Kt),it(q.__webglFramebuffer,E,Kt,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,0),m(Kt)&&f(n.TEXTURE_2D)}e.unbindTexture()}else{let dt=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(dt=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(dt,j.__webglTexture),Q(dt,x),x.mipmaps&&x.mipmaps.length>0)for(let gt=0;gt<x.mipmaps.length;gt++)it(q.__webglFramebuffer[gt],E,x,n.COLOR_ATTACHMENT0,dt,gt);else it(q.__webglFramebuffer,E,x,n.COLOR_ATTACHMENT0,dt,0);m(x)&&f(dt),e.unbindTexture()}E.depthBuffer&&ut(E)}function ht(E){let x=E.textures;for(let q=0,j=x.length;q<j;q++){let nt=x[q];if(m(nt)){let tt=T(E),bt=i.get(nt).__webglTexture;e.bindTexture(tt,bt),f(tt),e.unbindTexture()}}}let ft=[],U=[];function $t(E){if(E.samples>0){if(Nt(E)===!1){let x=E.textures,q=E.width,j=E.height,nt=n.COLOR_BUFFER_BIT,tt=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,bt=i.get(E),dt=x.length>1;if(dt)for(let gt=0;gt<x.length;gt++)e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let gt=0;gt<x.length;gt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(nt|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(nt|=n.STENCIL_BUFFER_BIT)),dt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,bt.__webglColorRenderbuffer[gt]);let Kt=i.get(x[gt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Kt,0)}n.blitFramebuffer(0,0,q,j,0,0,q,j,nt,n.NEAREST),l===!0&&(ft.length=0,U.length=0,ft.push(n.COLOR_ATTACHMENT0+gt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(ft.push(tt),U.push(tt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,U)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ft))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),dt)for(let gt=0;gt<x.length;gt++){e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,bt.__webglColorRenderbuffer[gt]);let Kt=i.get(x[gt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,Kt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let x=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Ct(E){return Math.min(s.maxSamples,E.samples)}function Nt(E){let x=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function At(E){let x=o.render.frame;h.get(E)!==x&&(h.set(E,x),E.update())}function pt(E,x){let q=E.colorSpace,j=E.format,nt=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||q!==Tr&&q!==Pi&&(Qt.getTransfer(q)===ie?(j!==Sn||nt!==li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),x}function at(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=W,this.setTexture2D=N,this.setTexture2DArray=C,this.setTexture3D=O,this.setTextureCube=A,this.rebindTextures=Tt,this.setupRenderTarget=Ot,this.updateRenderTargetMipmap=ht,this.updateMultisampleRenderTarget=$t,this.setupDepthRenderbuffer=ut,this.setupFrameBufferTexture=it,this.useMultisampledRTT=Nt}function Sb(n,t){function e(i,s=Pi){let r,o=Qt.getTransfer(s);if(i===li)return n.UNSIGNED_BYTE;if(i===Fu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ou)return n.UNSIGNED_SHORT_5_5_5_1;if(i===qm)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Xm)return n.BYTE;if(i===Ym)return n.SHORT;if(i===ao)return n.UNSIGNED_SHORT;if(i===Nu)return n.INT;if(i===ss)return n.UNSIGNED_INT;if(i===ri)return n.FLOAT;if(i===po)return n.HALF_FLOAT;if(i===$m)return n.ALPHA;if(i===Zm)return n.RGB;if(i===Sn)return n.RGBA;if(i===Km)return n.LUMINANCE;if(i===Jm)return n.LUMINANCE_ALPHA;if(i===or)return n.DEPTH_COMPONENT;if(i===pr)return n.DEPTH_STENCIL;if(i===Qm)return n.RED;if(i===Bu)return n.RED_INTEGER;if(i===jm)return n.RG;if(i===zu)return n.RG_INTEGER;if(i===Vu)return n.RGBA_INTEGER;if(i===il||i===sl||i===rl||i===ol)if(o===ie)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===il)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===sl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===rl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ol)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===il)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===sl)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===rl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ol)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Rh||i===Ph||i===Ih||i===Dh)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Rh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ph)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ih)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Dh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Lh||i===Uh||i===Nh)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Lh||i===Uh)return o===ie?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Nh)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Fh||i===Oh||i===Bh||i===zh||i===Vh||i===kh||i===Hh||i===Gh||i===Wh||i===Xh||i===Yh||i===qh||i===$h||i===Zh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Fh)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Oh)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Bh)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===zh)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Vh)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===kh)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Hh)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Gh)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Wh)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Xh)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Yh)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===qh)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===$h)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Zh)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===al||i===Kh||i===Jh)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===al)return o===ie?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Kh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Jh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===tg||i===Qh||i===jh||i===tu)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===al)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Qh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===jh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===tu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===fr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var _u=class extends Re{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Ge=class extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}},bb={type:"move"},oo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ge,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ge,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ge,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,i),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(bb)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Ge;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Tb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Eb=`
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

}`,xu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new en,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new kn({vertexShader:Tb,fragmentShader:Eb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Yt(new gr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},yu=class extends Ni{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null,_=new xu,m=e.getContextAttributes(),f=null,T=null,v=[],M=[],P=new Gt,w=null,R=new Re;R.viewport=new re;let I=new Re;I.viewport=new re;let S=[R,I],y=new _u,D=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let $=v[H];return $===void 0&&($=new oo,v[H]=$),$.getTargetRaySpace()},this.getControllerGrip=function(H){let $=v[H];return $===void 0&&($=new oo,v[H]=$),$.getGripSpace()},this.getHand=function(H){let $=v[H];return $===void 0&&($=new oo,v[H]=$),$.getHandSpace()};function Y(H){let $=M.indexOf(H.inputSource);if($===-1)return;let it=v[$];it!==void 0&&(it.update(H.inputSource,H.frame,c||o),it.dispatchEvent({type:H.type,data:H.inputSource}))}function B(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",N);for(let H=0;H<v.length;H++){let $=M[H];$!==null&&(M[H]=null,v[H].disconnect($))}D=null,W=null,_.reset(),t.setRenderTarget(f),p=null,d=null,u=null,s=null,T=null,rt.stop(),i.isPresenting=!1,t.setPixelRatio(w),t.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",B),s.addEventListener("inputsourceschange",N),m.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(P),s.renderState.layers===void 0){let $={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,$),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),T=new ci(p.framebufferWidth,p.framebufferHeight,{format:Sn,type:li,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let $=null,it=null,et=null;m.depth&&(et=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,$=m.stencil?pr:or,it=m.stencil?fr:ss);let ct={colorFormat:e.RGBA8,depthFormat:et,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(ct),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),T=new ci(d.textureWidth,d.textureHeight,{format:Sn,type:li,depthTexture:new Ml(d.textureWidth,d.textureHeight,it,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),rt.setContext(s),rt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function N(H){for(let $=0;$<H.removed.length;$++){let it=H.removed[$],et=M.indexOf(it);et>=0&&(M[et]=null,v[et].disconnect(it))}for(let $=0;$<H.added.length;$++){let it=H.added[$],et=M.indexOf(it);if(et===-1){for(let ut=0;ut<v.length;ut++)if(ut>=M.length){M.push(it),et=ut;break}else if(M[ut]===null){M[ut]=it,et=ut;break}if(et===-1)break}let ct=v[et];ct&&ct.connect(it)}}let C=new F,O=new F;function A(H,$,it){C.setFromMatrixPosition($.matrixWorld),O.setFromMatrixPosition(it.matrixWorld);let et=C.distanceTo(O),ct=$.projectionMatrix.elements,ut=it.projectionMatrix.elements,Tt=ct[14]/(ct[10]-1),Ot=ct[14]/(ct[10]+1),ht=(ct[9]+1)/ct[5],ft=(ct[9]-1)/ct[5],U=(ct[8]-1)/ct[0],$t=(ut[8]+1)/ut[0],Ct=Tt*U,Nt=Tt*$t,At=et/(-U+$t),pt=At*-U;if($.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(pt),H.translateZ(At),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),ct[10]===-1)H.projectionMatrix.copy($.projectionMatrix),H.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let at=Tt+At,E=Ot+At,x=Ct-pt,q=Nt+(et-pt),j=ht*Ot/E*at,nt=ft*Ot/E*at;H.projectionMatrix.makePerspective(x,q,j,nt,at,E),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function L(H,$){$===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices($.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;let $=H.near,it=H.far;_.texture!==null&&(_.depthNear>0&&($=_.depthNear),_.depthFar>0&&(it=_.depthFar)),y.near=I.near=R.near=$,y.far=I.far=R.far=it,(D!==y.near||W!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),D=y.near,W=y.far),R.layers.mask=H.layers.mask|2,I.layers.mask=H.layers.mask|4,y.layers.mask=R.layers.mask|I.layers.mask;let et=H.parent,ct=y.cameras;L(y,et);for(let ut=0;ut<ct.length;ut++)L(ct[ut],et);ct.length===2?A(y,R,I):y.projectionMatrix.copy(R.projectionMatrix),V(H,y,et)};function V(H,$,it){it===null?H.matrix.copy($.matrixWorld):(H.matrix.copy(it.matrixWorld),H.matrix.invert(),H.matrix.multiply($.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy($.projectionMatrix),H.projectionMatrixInverse.copy($.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=iu*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(H){l=H,d!==null&&(d.fixedFoveation=H),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=H)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let X=null;function Q(H,$){if(h=$.getViewerPose(c||o),g=$,h!==null){let it=h.views;p!==null&&(t.setRenderTargetFramebuffer(T,p.framebuffer),t.setRenderTarget(T));let et=!1;it.length!==y.cameras.length&&(y.cameras.length=0,et=!0);for(let ut=0;ut<it.length;ut++){let Tt=it[ut],Ot=null;if(p!==null)Ot=p.getViewport(Tt);else{let ft=u.getViewSubImage(d,Tt);Ot=ft.viewport,ut===0&&(t.setRenderTargetTextures(T,ft.colorTexture,d.ignoreDepthValues?void 0:ft.depthStencilTexture),t.setRenderTarget(T))}let ht=S[ut];ht===void 0&&(ht=new Re,ht.layers.enable(ut),ht.viewport=new re,S[ut]=ht),ht.matrix.fromArray(Tt.transform.matrix),ht.matrix.decompose(ht.position,ht.quaternion,ht.scale),ht.projectionMatrix.fromArray(Tt.projectionMatrix),ht.projectionMatrixInverse.copy(ht.projectionMatrix).invert(),ht.viewport.set(Ot.x,Ot.y,Ot.width,Ot.height),ut===0&&(y.matrix.copy(ht.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),et===!0&&y.cameras.push(ht)}let ct=s.enabledFeatures;if(ct&&ct.includes("depth-sensing")){let ut=u.getDepthInformation(it[0]);ut&&ut.isValid&&ut.texture&&_.init(t,ut,s.renderState)}}for(let it=0;it<v.length;it++){let et=M[it],ct=v[it];et!==null&&ct!==void 0&&ct.update(et,$,c||o)}X&&X(H,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),g=null}let rt=new og;rt.setAnimationLoop(Q),this.setAnimationLoop=function(H){X=H},this.dispose=function(){}}},Qi=new zn,wb=new ce;function Ab(n,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,rg(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,T,v,M){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,M)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,T,v):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ze&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ze&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let T=t.get(f),v=T.envMap,M=T.envMapRotation;v&&(m.envMap.value=v,Qi.copy(M),Qi.x*=-1,Qi.y*=-1,Qi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Qi.y*=-1,Qi.z*=-1),m.envMapRotation.value.setFromMatrix4(wb.makeRotationFromEuler(Qi)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,T,v){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*T,m.scale.value=v*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,T){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ze&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){let T=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Cb(n,t,e,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,v){let M=v.program;i.uniformBlockBinding(T,M)}function c(T,v){let M=s[T.id];M===void 0&&(g(T),M=h(T),s[T.id]=M,T.addEventListener("dispose",m));let P=v.program;i.updateUBOMapping(T,P);let w=t.render.frame;r[T.id]!==w&&(d(T),r[T.id]=w)}function h(T){let v=u();T.__bindingPointIndex=v;let M=n.createBuffer(),P=T.__size,w=T.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,P,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,M),M}function u(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){let v=s[T.id],M=T.uniforms,P=T.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let w=0,R=M.length;w<R;w++){let I=Array.isArray(M[w])?M[w]:[M[w]];for(let S=0,y=I.length;S<y;S++){let D=I[S];if(p(D,w,S,P)===!0){let W=D.__offset,Y=Array.isArray(D.value)?D.value:[D.value],B=0;for(let N=0;N<Y.length;N++){let C=Y[N],O=_(C);typeof C=="number"||typeof C=="boolean"?(D.__data[0]=C,n.bufferSubData(n.UNIFORM_BUFFER,W+B,D.__data)):C.isMatrix3?(D.__data[0]=C.elements[0],D.__data[1]=C.elements[1],D.__data[2]=C.elements[2],D.__data[3]=0,D.__data[4]=C.elements[3],D.__data[5]=C.elements[4],D.__data[6]=C.elements[5],D.__data[7]=0,D.__data[8]=C.elements[6],D.__data[9]=C.elements[7],D.__data[10]=C.elements[8],D.__data[11]=0):(C.toArray(D.__data,B),B+=O.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,W,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(T,v,M,P){let w=T.value,R=v+"_"+M;if(P[R]===void 0)return typeof w=="number"||typeof w=="boolean"?P[R]=w:P[R]=w.clone(),!0;{let I=P[R];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return P[R]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function g(T){let v=T.uniforms,M=0,P=16;for(let R=0,I=v.length;R<I;R++){let S=Array.isArray(v[R])?v[R]:[v[R]];for(let y=0,D=S.length;y<D;y++){let W=S[y],Y=Array.isArray(W.value)?W.value:[W.value];for(let B=0,N=Y.length;B<N;B++){let C=Y[B],O=_(C),A=M%P,L=A%O.boundary,V=A+L;M+=L,V!==0&&P-V<O.storage&&(M+=P-V),W.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=M,M+=O.storage}}}let w=M%P;return w>0&&(M+=P-w),T.__size=M,T.__cache={},this}function _(T){let v={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(v.boundary=4,v.storage=4):T.isVector2?(v.boundary=8,v.storage=8):T.isVector3||T.isColor?(v.boundary=16,v.storage=12):T.isVector4?(v.boundary=16,v.storage=16):T.isMatrix3?(v.boundary=48,v.storage=48):T.isMatrix4?(v.boundary=64,v.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),v}function m(T){let v=T.target;v.removeEventListener("dispose",m);let M=o.indexOf(v.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function f(){for(let T in s)n.deleteBuffer(s[T]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}var _r=class{constructor(t={}){let{canvas:e=Dx(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,f=null,T=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=hn,this.toneMapping=Di,this.toneMappingExposure=1;let M=this,P=!1,w=0,R=0,I=null,S=-1,y=null,D=new re,W=new re,Y=null,B=new Xt(0),N=0,C=e.width,O=e.height,A=1,L=null,V=null,X=new re(0,0,C,O),Q=new re(0,0,C,O),rt=!1,H=new co,$=!1,it=!1,et=new ce,ct=new ce,ut=new F,Tt=new re,Ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ht=!1;function ft(){return I===null?A:1}let U=i;function $t(b,k){return e.getContext(b,k)}try{let b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",st,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",xt,!1),U===null){let k="webgl2";if(U=$t(k,b),U===null)throw $t(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Ct,Nt,At,pt,at,E,x,q,j,nt,tt,bt,dt,gt,Kt,ot,St,Et,Ft,Mt,wt,Dt,ae,z;function _t(){Ct=new WM(U),Ct.init(),Dt=new Sb(U,Ct),Nt=new BM(U,Ct,t,Dt),At=new yb(U,Ct),Nt.reverseDepthBuffer&&d&&At.buffers.depth.setReversed(!0),pt=new qM(U),at=new ob,E=new Mb(U,Ct,At,at,Nt,Dt,pt),x=new VM(M),q=new GM(M),j=new ty(U),ae=new FM(U,j),nt=new XM(U,j,pt,ae),tt=new ZM(U,nt,j,pt),Ft=new $M(U,Nt,E),ot=new zM(at),bt=new rb(M,x,q,Ct,Nt,ae,ot),dt=new Ab(M,at),gt=new lb,Kt=new pb(Ct),Et=new NM(M,x,q,At,tt,p,l),St=new _b(M,tt,Nt),z=new Cb(U,pt,Nt,At),Mt=new OM(U,Ct,pt),wt=new YM(U,Ct,pt),pt.programs=bt.programs,M.capabilities=Nt,M.extensions=Ct,M.properties=at,M.renderLists=gt,M.shadowMap=St,M.state=At,M.info=pt}_t();let J=new yu(M,U);this.xr=J,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let b=Ct.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=Ct.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return A},this.setPixelRatio=function(b){b!==void 0&&(A=b,this.setSize(C,O,!1))},this.getSize=function(b){return b.set(C,O)},this.setSize=function(b,k,Z=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}C=b,O=k,e.width=Math.floor(b*A),e.height=Math.floor(k*A),Z===!0&&(e.style.width=b+"px",e.style.height=k+"px"),this.setViewport(0,0,b,k)},this.getDrawingBufferSize=function(b){return b.set(C*A,O*A).floor()},this.setDrawingBufferSize=function(b,k,Z){C=b,O=k,A=Z,e.width=Math.floor(b*Z),e.height=Math.floor(k*Z),this.setViewport(0,0,b,k)},this.getCurrentViewport=function(b){return b.copy(D)},this.getViewport=function(b){return b.copy(X)},this.setViewport=function(b,k,Z,K){b.isVector4?X.set(b.x,b.y,b.z,b.w):X.set(b,k,Z,K),At.viewport(D.copy(X).multiplyScalar(A).round())},this.getScissor=function(b){return b.copy(Q)},this.setScissor=function(b,k,Z,K){b.isVector4?Q.set(b.x,b.y,b.z,b.w):Q.set(b,k,Z,K),At.scissor(W.copy(Q).multiplyScalar(A).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(b){At.setScissorTest(rt=b)},this.setOpaqueSort=function(b){L=b},this.setTransparentSort=function(b){V=b},this.getClearColor=function(b){return b.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor.apply(Et,arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha.apply(Et,arguments)},this.clear=function(b=!0,k=!0,Z=!0){let K=0;if(b){let G=!1;if(I!==null){let lt=I.texture.format;G=lt===Vu||lt===zu||lt===Bu}if(G){let lt=I.texture.type,yt=lt===li||lt===ss||lt===ao||lt===fr||lt===Fu||lt===Ou,Rt=Et.getClearColor(),Pt=Et.getClearAlpha(),Bt=Rt.r,kt=Rt.g,It=Rt.b;yt?(g[0]=Bt,g[1]=kt,g[2]=It,g[3]=Pt,U.clearBufferuiv(U.COLOR,0,g)):(_[0]=Bt,_[1]=kt,_[2]=It,_[3]=Pt,U.clearBufferiv(U.COLOR,0,_))}else K|=U.COLOR_BUFFER_BIT}k&&(K|=U.DEPTH_BUFFER_BIT),Z&&(K|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),gt.dispose(),Kt.dispose(),at.dispose(),x.dispose(),q.dispose(),tt.dispose(),ae.dispose(),z.dispose(),bt.dispose(),J.dispose(),J.removeEventListener("sessionstart",_d),J.removeEventListener("sessionend",xd),Hi.stop()};function st(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;let b=pt.autoReset,k=St.enabled,Z=St.autoUpdate,K=St.needsUpdate,G=St.type;_t(),pt.autoReset=b,St.enabled=k,St.autoUpdate=Z,St.needsUpdate=K,St.type=G}function xt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Vt(b){let k=b.target;k.removeEventListener("dispose",Vt),xe(k)}function xe(b){Le(b),at.remove(b)}function Le(b){let k=at.get(b).programs;k!==void 0&&(k.forEach(function(Z){bt.releaseProgram(Z)}),b.isShaderMaterial&&bt.releaseShaderCache(b))}this.renderBufferDirect=function(b,k,Z,K,G,lt){k===null&&(k=Ot);let yt=G.isMesh&&G.matrixWorld.determinant()<0,Rt=r0(b,k,Z,K,G);At.setMaterial(K,yt);let Pt=Z.index,Bt=1;if(K.wireframe===!0){if(Pt=nt.getWireframeAttribute(Z),Pt===void 0)return;Bt=2}let kt=Z.drawRange,It=Z.attributes.position,jt=kt.start*Bt,le=(kt.start+kt.count)*Bt;lt!==null&&(jt=Math.max(jt,lt.start*Bt),le=Math.min(le,(lt.start+lt.count)*Bt)),Pt!==null?(jt=Math.max(jt,0),le=Math.min(le,Pt.count)):It!=null&&(jt=Math.max(jt,0),le=Math.min(le,It.count));let he=le-jt;if(he<0||he===1/0)return;ae.setup(G,K,Rt,Z,Pt);let qe,te=Mt;if(Pt!==null&&(qe=j.get(Pt),te=wt,te.setIndex(qe)),G.isMesh)K.wireframe===!0?(At.setLineWidth(K.wireframeLinewidth*ft()),te.setMode(U.LINES)):te.setMode(U.TRIANGLES);else if(G.isLine){let Lt=K.linewidth;Lt===void 0&&(Lt=1),At.setLineWidth(Lt*ft()),G.isLineSegments?te.setMode(U.LINES):G.isLineLoop?te.setMode(U.LINE_LOOP):te.setMode(U.LINE_STRIP)}else G.isPoints?te.setMode(U.POINTS):G.isSprite&&te.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)te.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(Ct.get("WEBGL_multi_draw"))te.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Lt=G._multiDrawStarts,Yn=G._multiDrawCounts,ee=G._multiDrawCount,gn=Pt?j.get(Pt).bytesPerElement:1,gs=at.get(K).currentProgram.getUniforms();for(let Qe=0;Qe<ee;Qe++)gs.setValue(U,"_gl_DrawID",Qe),te.render(Lt[Qe]/gn,Yn[Qe])}else if(G.isInstancedMesh)te.renderInstances(jt,he,G.count);else if(Z.isInstancedBufferGeometry){let Lt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Yn=Math.min(Z.instanceCount,Lt);te.renderInstances(jt,he,Yn)}else te.render(jt,he)};function ne(b,k,Z){b.transparent===!0&&b.side===Mn&&b.forceSinglePass===!1?(b.side=Ze,b.needsUpdate=!0,Ao(b,k,Z),b.side=Ui,b.needsUpdate=!0,Ao(b,k,Z),b.side=Mn):Ao(b,k,Z)}this.compile=function(b,k,Z=null){Z===null&&(Z=b),f=Kt.get(Z),f.init(k),v.push(f),Z.traverseVisible(function(G){G.isLight&&G.layers.test(k.layers)&&(f.pushLight(G),G.castShadow&&f.pushShadow(G))}),b!==Z&&b.traverseVisible(function(G){G.isLight&&G.layers.test(k.layers)&&(f.pushLight(G),G.castShadow&&f.pushShadow(G))}),f.setupLights();let K=new Set;return b.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let lt=G.material;if(lt)if(Array.isArray(lt))for(let yt=0;yt<lt.length;yt++){let Rt=lt[yt];ne(Rt,Z,G),K.add(Rt)}else ne(lt,Z,G),K.add(lt)}),v.pop(),f=null,K},this.compileAsync=function(b,k,Z=null){let K=this.compile(b,k,Z);return new Promise(G=>{function lt(){if(K.forEach(function(yt){at.get(yt).currentProgram.isReady()&&K.delete(yt)}),K.size===0){G(b);return}setTimeout(lt,10)}Ct.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let mn=null;function Xn(b){mn&&mn(b)}function _d(){Hi.stop()}function xd(){Hi.start()}let Hi=new og;Hi.setAnimationLoop(Xn),typeof self<"u"&&Hi.setContext(self),this.setAnimationLoop=function(b){mn=b,J.setAnimationLoop(b),b===null?Hi.stop():Hi.start()},J.addEventListener("sessionstart",_d),J.addEventListener("sessionend",xd),this.render=function(b,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(k),k=J.getCamera()),b.isScene===!0&&b.onBeforeRender(M,b,k,I),f=Kt.get(b,v.length),f.init(k),v.push(f),ct.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),H.setFromProjectionMatrix(ct),it=this.localClippingEnabled,$=ot.init(this.clippingPlanes,it),m=gt.get(b,T.length),m.init(),T.push(m),J.enabled===!0&&J.isPresenting===!0){let lt=M.xr.getDepthSensingMesh();lt!==null&&tc(lt,k,-1/0,M.sortObjects)}tc(b,k,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(L,V),ht=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,ht&&Et.addToRenderList(m,b),this.info.render.frame++,$===!0&&ot.beginShadows();let Z=f.state.shadowsArray;St.render(Z,b,k),$===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();let K=m.opaque,G=m.transmissive;if(f.setupLights(),k.isArrayCamera){let lt=k.cameras;if(G.length>0)for(let yt=0,Rt=lt.length;yt<Rt;yt++){let Pt=lt[yt];vd(K,G,b,Pt)}ht&&Et.render(b);for(let yt=0,Rt=lt.length;yt<Rt;yt++){let Pt=lt[yt];yd(m,b,Pt,Pt.viewport)}}else G.length>0&&vd(K,G,b,k),ht&&Et.render(b),yd(m,b,k);I!==null&&(E.updateMultisampleRenderTarget(I),E.updateRenderTargetMipmap(I)),b.isScene===!0&&b.onAfterRender(M,b,k),ae.resetDefaultState(),S=-1,y=null,v.pop(),v.length>0?(f=v[v.length-1],$===!0&&ot.setGlobalState(M.clippingPlanes,f.state.camera)):f=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function tc(b,k,Z,K){if(b.visible===!1)return;if(b.layers.test(k.layers)){if(b.isGroup)Z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(k);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||H.intersectsSprite(b)){K&&Tt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ct);let yt=tt.update(b),Rt=b.material;Rt.visible&&m.push(b,yt,Rt,Z,Tt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||H.intersectsObject(b))){let yt=tt.update(b),Rt=b.material;if(K&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Tt.copy(b.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Tt.copy(yt.boundingSphere.center)),Tt.applyMatrix4(b.matrixWorld).applyMatrix4(ct)),Array.isArray(Rt)){let Pt=yt.groups;for(let Bt=0,kt=Pt.length;Bt<kt;Bt++){let It=Pt[Bt],jt=Rt[It.materialIndex];jt&&jt.visible&&m.push(b,yt,jt,Z,Tt.z,It)}}else Rt.visible&&m.push(b,yt,Rt,Z,Tt.z,null)}}let lt=b.children;for(let yt=0,Rt=lt.length;yt<Rt;yt++)tc(lt[yt],k,Z,K)}function yd(b,k,Z,K){let G=b.opaque,lt=b.transmissive,yt=b.transparent;f.setupLightsView(Z),$===!0&&ot.setGlobalState(M.clippingPlanes,Z),K&&At.viewport(D.copy(K)),G.length>0&&wo(G,k,Z),lt.length>0&&wo(lt,k,Z),yt.length>0&&wo(yt,k,Z),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function vd(b,k,Z,K){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[K.id]===void 0&&(f.state.transmissionRenderTarget[K.id]=new ci(1,1,{generateMipmaps:!0,type:Ct.has("EXT_color_buffer_half_float")||Ct.has("EXT_color_buffer_float")?po:li,minFilter:is,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));let lt=f.state.transmissionRenderTarget[K.id],yt=K.viewport||D;lt.setSize(yt.z,yt.w);let Rt=M.getRenderTarget();M.setRenderTarget(lt),M.getClearColor(B),N=M.getClearAlpha(),N<1&&M.setClearColor(16777215,.5),M.clear(),ht&&Et.render(Z);let Pt=M.toneMapping;M.toneMapping=Di;let Bt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),f.setupLightsView(K),$===!0&&ot.setGlobalState(M.clippingPlanes,K),wo(b,Z,K),E.updateMultisampleRenderTarget(lt),E.updateRenderTargetMipmap(lt),Ct.has("WEBGL_multisampled_render_to_texture")===!1){let kt=!1;for(let It=0,jt=k.length;It<jt;It++){let le=k[It],he=le.object,qe=le.geometry,te=le.material,Lt=le.group;if(te.side===Mn&&he.layers.test(K.layers)){let Yn=te.side;te.side=Ze,te.needsUpdate=!0,Md(he,Z,K,qe,te,Lt),te.side=Yn,te.needsUpdate=!0,kt=!0}}kt===!0&&(E.updateMultisampleRenderTarget(lt),E.updateRenderTargetMipmap(lt))}M.setRenderTarget(Rt),M.setClearColor(B,N),Bt!==void 0&&(K.viewport=Bt),M.toneMapping=Pt}function wo(b,k,Z){let K=k.isScene===!0?k.overrideMaterial:null;for(let G=0,lt=b.length;G<lt;G++){let yt=b[G],Rt=yt.object,Pt=yt.geometry,Bt=K===null?yt.material:K,kt=yt.group;Rt.layers.test(Z.layers)&&Md(Rt,k,Z,Pt,Bt,kt)}}function Md(b,k,Z,K,G,lt){b.onBeforeRender(M,k,Z,K,G,lt),b.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),G.onBeforeRender(M,k,Z,K,b,lt),G.transparent===!0&&G.side===Mn&&G.forceSinglePass===!1?(G.side=Ze,G.needsUpdate=!0,M.renderBufferDirect(Z,k,K,G,b,lt),G.side=Ui,G.needsUpdate=!0,M.renderBufferDirect(Z,k,K,G,b,lt),G.side=Mn):M.renderBufferDirect(Z,k,K,G,b,lt),b.onAfterRender(M,k,Z,K,G,lt)}function Ao(b,k,Z){k.isScene!==!0&&(k=Ot);let K=at.get(b),G=f.state.lights,lt=f.state.shadowsArray,yt=G.state.version,Rt=bt.getParameters(b,G.state,lt,k,Z),Pt=bt.getProgramCacheKey(Rt),Bt=K.programs;K.environment=b.isMeshStandardMaterial?k.environment:null,K.fog=k.fog,K.envMap=(b.isMeshStandardMaterial?q:x).get(b.envMap||K.environment),K.envMapRotation=K.environment!==null&&b.envMap===null?k.environmentRotation:b.envMapRotation,Bt===void 0&&(b.addEventListener("dispose",Vt),Bt=new Map,K.programs=Bt);let kt=Bt.get(Pt);if(kt!==void 0){if(K.currentProgram===kt&&K.lightsStateVersion===yt)return bd(b,Rt),kt}else Rt.uniforms=bt.getUniforms(b),b.onBeforeCompile(Rt,M),kt=bt.acquireProgram(Rt,Pt),Bt.set(Pt,kt),K.uniforms=Rt.uniforms;let It=K.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(It.clippingPlanes=ot.uniform),bd(b,Rt),K.needsLights=a0(b),K.lightsStateVersion=yt,K.needsLights&&(It.ambientLightColor.value=G.state.ambient,It.lightProbe.value=G.state.probe,It.directionalLights.value=G.state.directional,It.directionalLightShadows.value=G.state.directionalShadow,It.spotLights.value=G.state.spot,It.spotLightShadows.value=G.state.spotShadow,It.rectAreaLights.value=G.state.rectArea,It.ltc_1.value=G.state.rectAreaLTC1,It.ltc_2.value=G.state.rectAreaLTC2,It.pointLights.value=G.state.point,It.pointLightShadows.value=G.state.pointShadow,It.hemisphereLights.value=G.state.hemi,It.directionalShadowMap.value=G.state.directionalShadowMap,It.directionalShadowMatrix.value=G.state.directionalShadowMatrix,It.spotShadowMap.value=G.state.spotShadowMap,It.spotLightMatrix.value=G.state.spotLightMatrix,It.spotLightMap.value=G.state.spotLightMap,It.pointShadowMap.value=G.state.pointShadowMap,It.pointShadowMatrix.value=G.state.pointShadowMatrix),K.currentProgram=kt,K.uniformsList=null,kt}function Sd(b){if(b.uniformsList===null){let k=b.currentProgram.getUniforms();b.uniformsList=lr.seqWithValue(k.seq,b.uniforms)}return b.uniformsList}function bd(b,k){let Z=at.get(b);Z.outputColorSpace=k.outputColorSpace,Z.batching=k.batching,Z.batchingColor=k.batchingColor,Z.instancing=k.instancing,Z.instancingColor=k.instancingColor,Z.instancingMorph=k.instancingMorph,Z.skinning=k.skinning,Z.morphTargets=k.morphTargets,Z.morphNormals=k.morphNormals,Z.morphColors=k.morphColors,Z.morphTargetsCount=k.morphTargetsCount,Z.numClippingPlanes=k.numClippingPlanes,Z.numIntersection=k.numClipIntersection,Z.vertexAlphas=k.vertexAlphas,Z.vertexTangents=k.vertexTangents,Z.toneMapping=k.toneMapping}function r0(b,k,Z,K,G){k.isScene!==!0&&(k=Ot),E.resetTextureUnits();let lt=k.fog,yt=K.isMeshStandardMaterial?k.environment:null,Rt=I===null?M.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Tr,Pt=(K.isMeshStandardMaterial?q:x).get(K.envMap||yt),Bt=K.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,kt=!!Z.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),It=!!Z.morphAttributes.position,jt=!!Z.morphAttributes.normal,le=!!Z.morphAttributes.color,he=Di;K.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(he=M.toneMapping);let qe=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,te=qe!==void 0?qe.length:0,Lt=at.get(K),Yn=f.state.lights;if($===!0&&(it===!0||b!==y)){let rn=b===y&&K.id===S;ot.setState(K,b,rn)}let ee=!1;K.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Yn.state.version||Lt.outputColorSpace!==Rt||G.isBatchedMesh&&Lt.batching===!1||!G.isBatchedMesh&&Lt.batching===!0||G.isBatchedMesh&&Lt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Lt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Lt.instancing===!1||!G.isInstancedMesh&&Lt.instancing===!0||G.isSkinnedMesh&&Lt.skinning===!1||!G.isSkinnedMesh&&Lt.skinning===!0||G.isInstancedMesh&&Lt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Lt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Lt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Lt.instancingMorph===!1&&G.morphTexture!==null||Lt.envMap!==Pt||K.fog===!0&&Lt.fog!==lt||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==ot.numPlanes||Lt.numIntersection!==ot.numIntersection)||Lt.vertexAlphas!==Bt||Lt.vertexTangents!==kt||Lt.morphTargets!==It||Lt.morphNormals!==jt||Lt.morphColors!==le||Lt.toneMapping!==he||Lt.morphTargetsCount!==te)&&(ee=!0):(ee=!0,Lt.__version=K.version);let gn=Lt.currentProgram;ee===!0&&(gn=Ao(K,k,G));let gs=!1,Qe=!1,Ur=!1,ue=gn.getUniforms(),Rn=Lt.uniforms;if(At.useProgram(gn.program)&&(gs=!0,Qe=!0,Ur=!0),K.id!==S&&(S=K.id,Qe=!0),gs||y!==b){At.buffers.depth.getReversed()?(et.copy(b.projectionMatrix),Ux(et),Nx(et),ue.setValue(U,"projectionMatrix",et)):ue.setValue(U,"projectionMatrix",b.projectionMatrix),ue.setValue(U,"viewMatrix",b.matrixWorldInverse);let di=ue.map.cameraPosition;di!==void 0&&di.setValue(U,ut.setFromMatrixPosition(b.matrixWorld)),Nt.logarithmicDepthBuffer&&ue.setValue(U,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&ue.setValue(U,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,Qe=!0,Ur=!0)}if(G.isSkinnedMesh){ue.setOptional(U,G,"bindMatrix"),ue.setOptional(U,G,"bindMatrixInverse");let rn=G.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),ue.setValue(U,"boneTexture",rn.boneTexture,E))}G.isBatchedMesh&&(ue.setOptional(U,G,"batchingTexture"),ue.setValue(U,"batchingTexture",G._matricesTexture,E),ue.setOptional(U,G,"batchingIdTexture"),ue.setValue(U,"batchingIdTexture",G._indirectTexture,E),ue.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&ue.setValue(U,"batchingColorTexture",G._colorsTexture,E));let Nr=Z.morphAttributes;if((Nr.position!==void 0||Nr.normal!==void 0||Nr.color!==void 0)&&Ft.update(G,Z,gn),(Qe||Lt.receiveShadow!==G.receiveShadow)&&(Lt.receiveShadow=G.receiveShadow,ue.setValue(U,"receiveShadow",G.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(Rn.envMap.value=Pt,Rn.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&k.environment!==null&&(Rn.envMapIntensity.value=k.environmentIntensity),Qe&&(ue.setValue(U,"toneMappingExposure",M.toneMappingExposure),Lt.needsLights&&o0(Rn,Ur),lt&&K.fog===!0&&dt.refreshFogUniforms(Rn,lt),dt.refreshMaterialUniforms(Rn,K,A,O,f.state.transmissionRenderTarget[b.id]),lr.upload(U,Sd(Lt),Rn,E)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(lr.upload(U,Sd(Lt),Rn,E),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&ue.setValue(U,"center",G.center),ue.setValue(U,"modelViewMatrix",G.modelViewMatrix),ue.setValue(U,"normalMatrix",G.normalMatrix),ue.setValue(U,"modelMatrix",G.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){let rn=K.uniformsGroups;for(let di=0,fi=rn.length;di<fi;di++){let Td=rn[di];z.update(Td,gn),z.bind(Td,gn)}}return gn}function o0(b,k){b.ambientLightColor.needsUpdate=k,b.lightProbe.needsUpdate=k,b.directionalLights.needsUpdate=k,b.directionalLightShadows.needsUpdate=k,b.pointLights.needsUpdate=k,b.pointLightShadows.needsUpdate=k,b.spotLights.needsUpdate=k,b.spotLightShadows.needsUpdate=k,b.rectAreaLights.needsUpdate=k,b.hemisphereLights.needsUpdate=k}function a0(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(b,k,Z){at.get(b.texture).__webglTexture=k,at.get(b.depthTexture).__webglTexture=Z;let K=at.get(b);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=Z===void 0,K.__autoAllocateDepthBuffer||Ct.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,k){let Z=at.get(b);Z.__webglFramebuffer=k,Z.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(b,k=0,Z=0){I=b,w=k,R=Z;let K=!0,G=null,lt=!1,yt=!1;if(b){let Pt=at.get(b);if(Pt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(U.FRAMEBUFFER,null),K=!1;else if(Pt.__webglFramebuffer===void 0)E.setupRenderTarget(b);else if(Pt.__hasExternalTextures)E.rebindTextures(b,at.get(b.texture).__webglTexture,at.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let It=b.depthTexture;if(Pt.__boundDepthTexture!==It){if(It!==null&&at.has(It)&&(b.width!==It.image.width||b.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(b)}}let Bt=b.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(yt=!0);let kt=at.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(kt[k])?G=kt[k][Z]:G=kt[k],lt=!0):b.samples>0&&E.useMultisampledRTT(b)===!1?G=at.get(b).__webglMultisampledFramebuffer:Array.isArray(kt)?G=kt[Z]:G=kt,D.copy(b.viewport),W.copy(b.scissor),Y=b.scissorTest}else D.copy(X).multiplyScalar(A).floor(),W.copy(Q).multiplyScalar(A).floor(),Y=rt;if(At.bindFramebuffer(U.FRAMEBUFFER,G)&&K&&At.drawBuffers(b,G),At.viewport(D),At.scissor(W),At.setScissorTest(Y),lt){let Pt=at.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+k,Pt.__webglTexture,Z)}else if(yt){let Pt=at.get(b.texture),Bt=k||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pt.__webglTexture,Z||0,Bt)}S=-1},this.readRenderTargetPixels=function(b,k,Z,K,G,lt,yt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=at.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&yt!==void 0&&(Rt=Rt[yt]),Rt){At.bindFramebuffer(U.FRAMEBUFFER,Rt);try{let Pt=b.texture,Bt=Pt.format,kt=Pt.type;if(!Nt.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Nt.textureTypeReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=b.width-K&&Z>=0&&Z<=b.height-G&&U.readPixels(k,Z,K,G,Dt.convert(Bt),Dt.convert(kt),lt)}finally{let Pt=I!==null?at.get(I).__webglFramebuffer:null;At.bindFramebuffer(U.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(b,k,Z,K,G,lt,yt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=at.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&yt!==void 0&&(Rt=Rt[yt]),Rt){let Pt=b.texture,Bt=Pt.format,kt=Pt.type;if(!Nt.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Nt.textureTypeReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=b.width-K&&Z>=0&&Z<=b.height-G){At.bindFramebuffer(U.FRAMEBUFFER,Rt);let It=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,It),U.bufferData(U.PIXEL_PACK_BUFFER,lt.byteLength,U.STREAM_READ),U.readPixels(k,Z,K,G,Dt.convert(Bt),Dt.convert(kt),0);let jt=I!==null?at.get(I).__webglFramebuffer:null;At.bindFramebuffer(U.FRAMEBUFFER,jt);let le=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Lx(U,le,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,It),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,lt),U.deleteBuffer(It),U.deleteSync(le),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,k=null,Z=0){b.isTexture!==!0&&(so("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,b=arguments[1]);let K=Math.pow(2,-Z),G=Math.floor(b.image.width*K),lt=Math.floor(b.image.height*K),yt=k!==null?k.x:0,Rt=k!==null?k.y:0;E.setTexture2D(b,0),U.copyTexSubImage2D(U.TEXTURE_2D,Z,0,0,yt,Rt,G,lt),At.unbindTexture()},this.copyTextureToTexture=function(b,k,Z=null,K=null,G=0){b.isTexture!==!0&&(so("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,b=arguments[1],k=arguments[2],G=arguments[3]||0,Z=null);let lt,yt,Rt,Pt,Bt,kt,It,jt,le,he=b.isCompressedTexture?b.mipmaps[G]:b.image;Z!==null?(lt=Z.max.x-Z.min.x,yt=Z.max.y-Z.min.y,Rt=Z.isBox3?Z.max.z-Z.min.z:1,Pt=Z.min.x,Bt=Z.min.y,kt=Z.isBox3?Z.min.z:0):(lt=he.width,yt=he.height,Rt=he.depth||1,Pt=0,Bt=0,kt=0),K!==null?(It=K.x,jt=K.y,le=K.z):(It=0,jt=0,le=0);let qe=Dt.convert(k.format),te=Dt.convert(k.type),Lt;k.isData3DTexture?(E.setTexture3D(k,0),Lt=U.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(E.setTexture2DArray(k,0),Lt=U.TEXTURE_2D_ARRAY):(E.setTexture2D(k,0),Lt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,k.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,k.unpackAlignment);let Yn=U.getParameter(U.UNPACK_ROW_LENGTH),ee=U.getParameter(U.UNPACK_IMAGE_HEIGHT),gn=U.getParameter(U.UNPACK_SKIP_PIXELS),gs=U.getParameter(U.UNPACK_SKIP_ROWS),Qe=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,he.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,he.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Pt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Bt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,kt);let Ur=b.isDataArrayTexture||b.isData3DTexture,ue=k.isDataArrayTexture||k.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){let Rn=at.get(b),Nr=at.get(k),rn=at.get(Rn.__renderTarget),di=at.get(Nr.__renderTarget);At.bindFramebuffer(U.READ_FRAMEBUFFER,rn.__webglFramebuffer),At.bindFramebuffer(U.DRAW_FRAMEBUFFER,di.__webglFramebuffer);for(let fi=0;fi<Rt;fi++)Ur&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,at.get(b).__webglTexture,G,kt+fi),b.isDepthTexture?(ue&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,at.get(k).__webglTexture,G,le+fi),U.blitFramebuffer(Pt,Bt,lt,yt,It,jt,lt,yt,U.DEPTH_BUFFER_BIT,U.NEAREST)):ue?U.copyTexSubImage3D(Lt,G,It,jt,le+fi,Pt,Bt,lt,yt):U.copyTexSubImage2D(Lt,G,It,jt,le+fi,Pt,Bt,lt,yt);At.bindFramebuffer(U.READ_FRAMEBUFFER,null),At.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ue?b.isDataTexture||b.isData3DTexture?U.texSubImage3D(Lt,G,It,jt,le,lt,yt,Rt,qe,te,he.data):k.isCompressedArrayTexture?U.compressedTexSubImage3D(Lt,G,It,jt,le,lt,yt,Rt,qe,he.data):U.texSubImage3D(Lt,G,It,jt,le,lt,yt,Rt,qe,te,he):b.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,G,It,jt,lt,yt,qe,te,he.data):b.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,G,It,jt,he.width,he.height,qe,he.data):U.texSubImage2D(U.TEXTURE_2D,G,It,jt,lt,yt,qe,te,he);U.pixelStorei(U.UNPACK_ROW_LENGTH,Yn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ee),U.pixelStorei(U.UNPACK_SKIP_PIXELS,gn),U.pixelStorei(U.UNPACK_SKIP_ROWS,gs),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Qe),G===0&&k.generateMipmaps&&U.generateMipmap(Lt),At.unbindTexture()},this.copyTextureToTexture3D=function(b,k,Z=null,K=null,G=0){return b.isTexture!==!0&&(so("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,K=arguments[1]||null,b=arguments[2],k=arguments[3],G=arguments[4]||0),so('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,k,Z,K,G)},this.initRenderTarget=function(b){at.get(b).__webglFramebuffer===void 0&&E.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?E.setTextureCube(b,0):b.isData3DTexture?E.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?E.setTexture2DArray(b,0):E.setTexture2D(b,0),At.unbindTexture()},this.resetState=function(){w=0,R=0,I=null,At.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}};var Sl=class n{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Xt(t),this.near=e,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},xr=class extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},vu=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=nu,this.updateRanges=[],this.version=0,this.uuid=Li()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Li()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Li()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},ke=new F,bl=class n{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=On(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=se(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=On(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=On(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=On(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=On(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),i=se(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),i=se(i,this.array),s=se(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),i=se(i,this.array),s=se(s,this.array),r=se(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new We(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new n(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},yr=class extends Vn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Xt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},tr,jr=new F,er=new F,nr=new F,ir=new Gt,to=new Gt,ug=new ce,Xa=new F,eo=new F,Ya=new F,Pm=new Gt,lh=new Gt,Im=new Gt,ho=class extends Pe{constructor(t=new yr){if(super(),this.isSprite=!0,this.type="Sprite",tr===void 0){tr=new Te;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new vu(e,5);tr.setIndex([0,1,2,0,2,3]),tr.setAttribute("position",new bl(i,3,0,!1)),tr.setAttribute("uv",new bl(i,2,3,!1))}this.geometry=tr,this.material=t,this.center=new Gt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),er.setFromMatrixScale(this.matrixWorld),ug.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),nr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&er.multiplyScalar(-nr.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let o=this.center;qa(Xa.set(-.5,-.5,0),nr,o,er,s,r),qa(eo.set(.5,-.5,0),nr,o,er,s,r),qa(Ya.set(.5,.5,0),nr,o,er,s,r),Pm.set(0,0),lh.set(1,0),Im.set(1,1);let a=t.ray.intersectTriangle(Xa,eo,Ya,!1,jr);if(a===null&&(qa(eo.set(-.5,.5,0),nr,o,er,s,r),lh.set(0,1),a=t.ray.intersectTriangle(Xa,Ya,eo,!1,jr),a===null))return;let l=t.ray.origin.distanceTo(jr);l<t.near||l>t.far||e.push({distance:l,point:jr.clone(),uv:si.getInterpolation(jr,Xa,eo,Ya,Pm,lh,Im,new Gt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function qa(n,t,e,i,s,r){ir.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(to.x=r*ir.x-s*ir.y,to.y=s*ir.x+r*ir.y):to.copy(ir),n.copy(t),n.x+=to.x,n.y+=to.y,n.applyMatrix4(ug)}var Hn=class extends Vn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Xt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Tl=new F,El=new F,Dm=new ce,no=new lo,$a=new os,ch=new F,Lm=new F,ls=class extends Pe{constructor(t=new Te,e=new Hn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Tl.fromBufferAttribute(e,s-1),El.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Tl.distanceTo(El);t.setAttribute("lineDistance",new me(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),$a.copy(i.boundingSphere),$a.applyMatrix4(s),$a.radius+=r,t.ray.intersectsSphere($a)===!1)return;Dm.copy(s).invert(),no.copy(t.ray).applyMatrix4(Dm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){let f=h.getX(_),T=h.getX(_+1),v=Za(this,t,no,l,f,T);v&&e.push(v)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(p),f=Za(this,t,no,l,_,m);f&&e.push(f)}}else{let p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){let f=Za(this,t,no,l,_,_+1);f&&e.push(f)}if(this.isLineLoop){let _=Za(this,t,no,l,g-1,p);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Za(n,t,e,i,s,r){let o=n.geometry.attributes.position;if(Tl.fromBufferAttribute(o,s),El.fromBufferAttribute(o,r),e.distanceSqToSegment(Tl,El,ch,Lm)>i)return;ch.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(ch);if(!(l<t.near||l>t.far))return{distance:l,point:Lm.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}var Um=new F,Nm=new F,nn=class extends ls{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Um.fromBufferAttribute(e,s),Nm.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Um.distanceTo(Nm);t.setAttribute("lineDistance",new me(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var uo=class extends Vn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Xt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Fm=new ce,Mu=new lo,Ka=new os,Ja=new F,wl=class extends Pe{constructor(t=new Te,e=new uo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ka.copy(i.boundingSphere),Ka.applyMatrix4(s),Ka.radius+=r,t.ray.intersectsSphere(Ka)===!1)return;Fm.copy(s).invert(),Mu.copy(t.ray).applyMatrix4(Fm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){let d=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=d,_=p;g<_;g++){let m=c.getX(g);Ja.fromBufferAttribute(u,m),Om(Ja,m,l,s,t,e,this)}}else{let d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,_=p;g<_;g++)Ja.fromBufferAttribute(u,g),Om(Ja,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Om(n,t,e,i,s,r,o){let a=Mu.distanceSqToPoint(n);if(a<e){let l=new F;Mu.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Al=class extends en{constructor(t,e,i,s,r,o,a,l,c){super(t,e,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Su=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,o;e?o=e:o=t*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);let h=i[s],d=i[s+1]-h,p=(o-h)/d;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Gt:new F);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new F,s=[],r=[],o=[],a=new F,l=new ce;for(let p=0;p<=t;p++){let g=p/t;s[p]=this.getTangentAt(g,new F)}r[0]=new F,o[0]=new F;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Be(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Be(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}};function Hu(){let n=0,t=0,e=0,i=0;function s(r,o,a,l){n=r,t=a,e=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,p*=h,s(o,a,d,p)},calc:function(r){let o=r*r,a=o*r;return n+t*r+e*o+i*a}}}var Qa=new F,hh=new Hu,uh=new Hu,dh=new Hu,Cl=class extends Su{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new F){let i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Qa.subVectors(s[0],s[1]).add(s[0]),c=Qa);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Qa.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Qa),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),p),_=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),hh.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,m),uh.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,m),dh.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(hh.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),uh.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),dh.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(hh.calc(l),uh.calc(l),dh.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new F().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};var Tn=class n extends Te{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],p=[],g=0,_=[],m=i/2,f=0;T(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new me(u,3)),this.setAttribute("normal",new me(d,3)),this.setAttribute("uv",new me(p,2));function T(){let M=new F,P=new F,w=0,R=(e-t)/i;for(let I=0;I<=r;I++){let S=[],y=I/r,D=y*(e-t)+t;for(let W=0;W<=s;W++){let Y=W/s,B=Y*l+a,N=Math.sin(B),C=Math.cos(B);P.x=D*N,P.y=-y*i+m,P.z=D*C,u.push(P.x,P.y,P.z),M.set(N,R,C).normalize(),d.push(M.x,M.y,M.z),p.push(Y,1-y),S.push(g++)}_.push(S)}for(let I=0;I<s;I++)for(let S=0;S<r;S++){let y=_[S][I],D=_[S+1][I],W=_[S+1][I+1],Y=_[S][I+1];(t>0||S!==0)&&(h.push(y,D,Y),w+=3),(e>0||S!==r-1)&&(h.push(D,W,Y),w+=3)}c.addGroup(f,w,0),f+=w}function v(M){let P=g,w=new Gt,R=new F,I=0,S=M===!0?t:e,y=M===!0?1:-1;for(let W=1;W<=s;W++)u.push(0,m*y,0),d.push(0,y,0),p.push(.5,.5),g++;let D=g;for(let W=0;W<=s;W++){let B=W/s*l+a,N=Math.cos(B),C=Math.sin(B);R.x=S*C,R.y=m*y,R.z=S*N,u.push(R.x,R.y,R.z),d.push(0,y,0),w.x=N*.5+.5,w.y=C*.5*y+.5,p.push(w.x,w.y),g++}for(let W=0;W<s;W++){let Y=P+W,B=D+W;M===!0?h.push(B,B+1,Y):h.push(B+1,B,Y),I+=3}c.addGroup(f,I,M===!0?1:2),f+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var ja=new F,tl=new F,fh=new F,el=new si,un=class extends Te{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(ll*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},p=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:_,b:m,c:f}=el;if(_.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),f.fromBufferAttribute(a,c[2]),el.getNormal(fh),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let T=0;T<3;T++){let v=(T+1)%3,M=u[T],P=u[v],w=el[h[T]],R=el[h[v]],I=`${M}_${P}`,S=`${P}_${M}`;S in d&&d[S]?(fh.dot(d[S].normal)<=r&&(p.push(w.x,w.y,w.z),p.push(R.x,R.y,R.z)),d[S]=null):I in d||(d[I]={index0:c[T],index1:c[v],normal:fh.clone()})}}for(let g in d)if(d[g]){let{index0:_,index1:m}=d[g];ja.fromBufferAttribute(a,_),tl.fromBufferAttribute(a,m),p.push(ja.x,ja.y,ja.z),p.push(tl.x,tl.y,tl.z)}this.setAttribute("position",new me(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var Rl=class n extends Te{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);let a=[],l=[],c=[],h=[],u=t,d=(e-t)/s,p=new F,g=new Gt;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){let f=r+m/i*o;p.x=u*Math.cos(f),p.y=u*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<s;_++){let m=_*(i+1);for(let f=0;f<i;f++){let T=f+m,v=T,M=T+i+1,P=T+i+2,w=T+1;a.push(v,M,w),a.push(M,P,w)}}this.setIndex(a),this.setAttribute("position",new me(l,3)),this.setAttribute("normal",new me(c,3)),this.setAttribute("uv",new me(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Pl=class n extends Te{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],l=[],c=[],h=new F,u=new F,d=new F;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){let _=g/s*r,m=p/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){let _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,T=(s+1)*p+g;o.push(_,m,T),o.push(m,f,T)}this.setIndex(o),this.setAttribute("position",new me(a,3)),this.setAttribute("normal",new me(l,3)),this.setAttribute("uv",new me(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Ie=class extends Vn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Xt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=eg,this.normalScale=new Gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function nl(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Rb(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var vr=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},bu=class extends vr{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Np,endingEnd:Np}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Fp:r=t,a=2*e-i;break;case Op:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Fp:o=t,l=2*i-e;break;case Op:o=1,l=i+s[1]-s[0];break;default:o=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(i-e)/(s-e),_=g*g,m=_*g,f=-d*m+2*d*_-d*g,T=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,v=(-1-p)*m+(1.5+p)*_+.5*g,M=p*m-p*_;for(let P=0;P!==a;++P)r[P]=f*o[h+P]+T*o[c+P]+v*o[l+P]+M*o[u+P];return r}},Tu=class extends vr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(i-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},Eu=class extends vr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},En=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=nl(e,this.TimeBufferType),this.values=nl(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:nl(t.times,Array),values:nl(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Eu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Tu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new bu(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case cl:e=this.InterpolantFactoryMethodDiscrete;break;case eu:e=this.InterpolantFactoryMethodLinear;break;case Uc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return cl;case this.InterpolantFactoryMethodLinear:return eu;case this.InterpolantFactoryMethodSmooth:return Uc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Rb(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Uc,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*i,d=u-i,p=u+i;for(let g=0;g!==i;++g){let _=e[u+g];if(_!==e[d+g]||_!==e[p+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*i,d=o*i;for(let p=0;p!==i;++p)e[d+p]=e[u+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};En.prototype.TimeBufferType=Float32Array;En.prototype.ValueBufferType=Float32Array;En.prototype.DefaultInterpolation=eu;var cs=class extends En{constructor(t,e,i){super(t,e,i)}};cs.prototype.ValueTypeName="bool";cs.prototype.ValueBufferType=Array;cs.prototype.DefaultInterpolation=cl;cs.prototype.InterpolantFactoryMethodLinear=void 0;cs.prototype.InterpolantFactoryMethodSmooth=void 0;var wu=class extends En{};wu.prototype.ValueTypeName="color";var Au=class extends En{};Au.prototype.ValueTypeName="number";var Cu=class extends vr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)Fi.slerpFlat(r,0,o,c-a,o,c,l);return r}},Il=class extends En{InterpolantFactoryMethodLinear(t){return new Cu(this.times,this.values,this.getValueSize(),t)}};Il.prototype.ValueTypeName="quaternion";Il.prototype.InterpolantFactoryMethodSmooth=void 0;var hs=class extends En{constructor(t,e,i){super(t,e,i)}};hs.prototype.ValueTypeName="string";hs.prototype.ValueBufferType=Array;hs.prototype.DefaultInterpolation=cl;hs.prototype.InterpolantFactoryMethodLinear=void 0;hs.prototype.InterpolantFactoryMethodSmooth=void 0;var Ru=class extends En{};Ru.prototype.ValueTypeName="vector";var Pu=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},Pb=new Pu,Iu=class{constructor(t){this.manager=t!==void 0?t:Pb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Iu.DEFAULT_MATERIAL_NAME="__DEFAULT";var fo=class extends Pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var ph=new ce,Bm=new F,zm=new F,Dl=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Gt(512,512),this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new co,this._frameExtents=new Gt(1,1),this._viewportCount=1,this._viewports=[new re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;Bm.setFromMatrixPosition(t.matrixWorld),e.position.copy(Bm),zm.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(zm),e.updateMatrixWorld(),ph.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ph),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ph)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Vm=new ce,io=new F,mh=new F,Du=class extends Dl{constructor(){super(new Re(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Gt(4,2),this._viewportCount=6,this._viewports=[new re(2,1,1,1),new re(0,1,1,1),new re(3,1,1,1),new re(1,1,1,1),new re(3,0,1,1),new re(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(t,e=0){let i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),io.setFromMatrixPosition(t.matrixWorld),i.position.copy(io),mh.copy(i.position),mh.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(mh),i.updateMatrixWorld(),s.makeTranslation(-io.x,-io.y,-io.z),Vm.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vm)}},hi=class extends fo{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Du}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Lu=class extends Dl{constructor(){super(new yl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Mr=class extends fo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.shadow=new Lu}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Sr=class extends fo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var br=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=km(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=km();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function km(){return performance.now()}var Gu="\\[\\]\\.:\\/",Ib=new RegExp("["+Gu+"]","g"),Wu="[^"+Gu+"]",Db="[^"+Gu.replace("\\.","")+"]",Lb=/((?:WC+[\/:])*)/.source.replace("WC",Wu),Ub=/(WCOD+)?/.source.replace("WCOD",Db),Nb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wu),Fb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wu),Ob=new RegExp("^"+Lb+Ub+Nb+Fb+"$"),Bb=["material","materials","bones","map"],Uu=class{constructor(t,e,i){let s=i||pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},pe=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Ib,"")}static parseTrackName(t){let e=Ob.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Bb.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pe.Composite=Uu;pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pe.prototype.GetterByBindingType=[pe.prototype._getValue_direct,pe.prototype._getValue_array,pe.prototype._getValue_arrayElement,pe.prototype._getValue_toArray];pe.prototype.SetterByBindingTypeAndVersioning=[[pe.prototype._setValue_direct,pe.prototype._setValue_direct_setNeedsUpdate,pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_array,pe.prototype._setValue_array_setNeedsUpdate,pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_arrayElement,pe.prototype._setValue_arrayElement_setNeedsUpdate,pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_fromArray,pe.prototype._setValue_fromArray_setNeedsUpdate,pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var fL=new Float32Array(1);var Ll=class extends nn{constructor(t=10,e=10,i=4473924,s=8947848){i=new Xt(i),s=new Xt(s);let r=e/2,o=t/e,a=t/2,l=[],c=[];for(let d=0,p=0,g=-a;d<=e;d++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);let _=d===r?i:s;_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3}let h=new Te;h.setAttribute("position",new me(l,3)),h.setAttribute("color",new me(c,3));let u=new Hn({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var mo=new F;function dn(n,t,e,i,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;mo.copy(t),mo[i]=0,mo.normalize();let c=.5*o/(o+a),h=1-mo.angleTo(n)/l;return Math.sign(mo[e])===1?h*c:a/(o+a)+c+c*(1-h)}var sn=class extends Ke{constructor(t=1,e=1,i=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,i/2,r),super(1,1,1,s,s,s),s===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let a=new F,l=new F,c=new F(t,e,i).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=h.length/6,g=new F,_=.5/s;for(let m=0,f=0;m<h.length;m+=3,f+=2)switch(a.fromArray(h,m),l.copy(a),l.x-=Math.sign(l.x)*_,l.y-=Math.sign(l.y)*_,l.z-=Math.sign(l.z)*_,l.normalize(),h[m+0]=c.x*Math.sign(a.x)+l.x*r,h[m+1]=c.y*Math.sign(a.y)+l.y*r,h[m+2]=c.z*Math.sign(a.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/p)){case 0:g.set(1,0,0),d[f+0]=dn(g,l,"z","y",r,i),d[f+1]=1-dn(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),d[f+0]=1-dn(g,l,"z","y",r,i),d[f+1]=1-dn(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),d[f+0]=1-dn(g,l,"x","z",r,t),d[f+1]=dn(g,l,"z","x",r,i);break;case 3:g.set(0,-1,0),d[f+0]=1-dn(g,l,"x","z",r,t),d[f+1]=1-dn(g,l,"z","x",r,i);break;case 4:g.set(0,0,1),d[f+0]=1-dn(g,l,"x","y",r,t),d[f+1]=1-dn(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),d[f+0]=dn(g,l,"x","y",r,t),d[f+1]=1-dn(g,l,"y","x",r,e);break}}};var Xu=matchMedia("(prefers-reduced-motion: reduce)").matches,zb=new URLSearchParams(location.search).has("debug"),wn=15026253;function Yu(n="rgba(229,72,77,"){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d"),i=e.createRadialGradient(64,64,0,64,64,64);return i.addColorStop(0,n+"0.9)"),i.addColorStop(.35,n+"0.28)"),i.addColorStop(1,n+"0)"),e.fillStyle=i,e.fillRect(0,0,128,128),new Al(t)}function fg(n,t={}){let e=new _r({canvas:n,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});n.addEventListener("webglcontextlost",pt=>{pt.preventDefault(),e.setAnimationLoop(null),t.onFatal&&t.onFatal()}),e.setPixelRatio(Math.min(devicePixelRatio,2));let i=new xr;i.fog=new Sl(657931,12,44);let s=new Re(40,1,.1,100),r=new Ge;s.position.set(0,1.7,6.2),r.add(s),i.add(r),i.add(new Sr(3947588,1.6));let o=new Mr(16773862,4.2);o.position.set(6,8,5),i.add(o);let a=new hi(16777215,40,18);a.position.set(1.2,4.6,1.6),i.add(a);let l=new hi(wn,130,20);l.position.set(-3.2,2.8,-2),i.add(l);let c=new hi(12106952,55,24);c.position.set(3.4,2.4,5),i.add(c);let h=new hi(wn,60,12);h.position.set(-.62,3.4,.8),i.add(h);let u=new Yt(new gr(90,90),new Ie({color:789519,roughness:1,metalness:0}));u.rotation.x=-Math.PI/2,u.position.y=-.32,i.add(u);let d=new Ll(70,70,4868693,2500142);d.position.y=-.3,i.add(d);let p=new Yt(new Rl(.96,1,64),new as({color:wn,transparent:!0,opacity:.7,side:Mn}));p.rotation.x=-Math.PI/2,p.position.y=-.29,i.add(p);let g=0,_=new Ie({color:10199469,metalness:.6,roughness:.32}),m=new Ie({color:1513245,metalness:.45,roughness:.5}),f=new Ie({color:wn,emissive:wn,emissiveIntensity:1.8,metalness:.2,roughness:.4}),T=()=>new Hn({color:wn,transparent:!0,opacity:1}),v=new Ge,M=new Yt(new sn(2.3,.62,1.45,4,.09),_);M.position.y=.16,v.add(M);let P=new Yt(new Tn(.13,.16,.13,24),m);P.position.set(.78,.55,0),v.add(P);let w=new Yt(new Tn(.2,.2,.07,24),m);w.position.set(.78,.65,0);let R=new Yt(new Ke(.02,.03,.34),new as({color:wn}));R.position.set(.78,.65,.2),w.add(R),v.add(w);let I=new Tn(.24,.24,.14,24),S=[];for(let[pt,at]of[[-.82,.78],[.82,.78],[-.82,-.78],[.82,-.78]]){let E=new Yt(I,m);E.rotation.z=Math.PI/2,E.position.set(pt,.02,at),v.add(E),S.push(E)}let y=new Yt(new Ke(.06,.1,1.06),f);y.position.set(1.16,.16,0),v.add(y);for(let pt of[1,-1]){let at=new Yt(new Ke(1.9,.03,.03),f);at.position.set(0,.3,pt*.74),v.add(at)}let D=new Ge,W=new Yt(new sn(.72,.5,.62,3,.07),m);D.add(W);let Y=new nn(new un(W.geometry,20),T());D.add(Y);let B=new Yt(new Tn(.16,.16,.07,32),new Ie({color:wn,emissive:wn,emissiveIntensity:2.2,metalness:.1,roughness:.35}));B.position.y=.28,D.add(B);let N=new ho(new yr({map:Yu(),transparent:!0,opacity:.9,blending:cr,depthWrite:!1}));N.scale.set(1.5,1.5,1),N.position.y=.28,D.add(N),D.position.set(-.62,.72,0),v.add(D),i.add(v);let C=new Ge,O=[],A=new sn(.46,.46,.46,3,.06),L=new Ie({color:1908004,metalness:.5,roughness:.32,emissive:wn,emissiveIntensity:.32});for(let pt=0;pt<6;pt++){let at=pt/6*Math.PI*1.5-.4,E=.66,x=1.75+pt*.62,q=Math.cos(at)*E,j=Math.sin(at)*E,nt=new Yt(A,L);nt.position.set(q,x,j);let tt=new nn(new un(A),T());if(nt.add(tt),nt.userData.phase=pt*1.1,C.add(nt),O.push(nt),pt>0){let bt=O[pt-1].position,dt=new Te().setFromPoints([bt.clone(),nt.position.clone()]),gt=new ls(dt,new Hn({color:wn,transparent:!0,opacity:.75}));gt.userData.pair=[pt-1,pt],C.add(gt),nt.userData.link=gt,O[pt-1].userData.linkOut=gt}}C.position.set(-.62,0,0),i.add(C);let V=new Cl([new F(-.62,1,0),new F(-.9,1.7,.4),new F(-.3,2.6,-.4),new F(-.9,3.6,.3),new F(-.62,4.9,0)]),X=170,Q=new Float32Array(X*3),rt=new Float32Array(X);for(let pt=0;pt<X;pt++)rt[pt]=.05+Math.random()*.06;let H=new Te;H.setAttribute("position",new We(Q,3));let $=new uo({color:16737129,size:.045,transparent:!0,opacity:.55,blending:cr,depthWrite:!1,map:Yu("rgba(255,99,105,")}),it=new wl(H,$);i.add(it);let et=new F,ct=new Float32Array(X);for(let pt=0;pt<X;pt++)ct[pt]=Math.random();let ut=new ho(new yr({map:Yu(),transparent:!0,opacity:.26,blending:cr,depthWrite:!1}));ut.scale.set(6.5,4.2,1),ut.position.set(-1.2,2.2,-6),i.add(ut);let Tt=0,Ot=0,ht=0,ft=0;Xu||addEventListener("pointermove",pt=>{ht=(pt.clientX/innerWidth-.5)*2,ft=(pt.clientY/innerHeight-.5)*2},{passive:!0});function U(){let pt=n.clientWidth,at=n.clientHeight;e.setSize(pt,at,!1),s.aspect=pt/at;let E=pt/at>1.05;v.position.set(E?1.45:.72,E?-.02:-.42,0),v.scale.setScalar(E?1.32:.92),C.position.set(E?1.45:.72,E?-.02:-.42,0),C.scale.setScalar(E?1.32:.92),p.position.x=E?1.35:0,p.position.z=0,s.updateProjectionMatrix()}U(),new ResizeObserver(U).observe(n);let $t=!0;new IntersectionObserver(([pt])=>{$t=pt.isIntersecting},{threshold:.02}).observe(n);let Ct=new br;function Nt(){let pt=Math.min(Ct.getDelta(),.05),at=Ct.elapsedTime;Tt+=(ht-Tt)*Math.min(pt*4,1),Ot+=(ft-Ot)*Math.min(pt*4,1),r.rotation.y=Tt*.09+Math.sin(at*.12)*.03,r.rotation.x=Ot*.035,s.position.x=Tt*.42,s.lookAt(v.position.x*.55,1.55,0),g=(g+pt*.4)%1;let E=.4+g*5.2;if(p.scale.setScalar(E),p.material.opacity=.55*(1-g),!Xu){for(let x of S)x.rotation.x+=pt*2.4;w.rotation.y+=pt*3.2,v.position.y+=Math.sin(at*1.8)*.004,v.rotation.y=Math.sin(at*.25)*.06,B.material.emissiveIntensity=1.9+Math.sin(at*2.6)*.6,N.material.opacity=.75+Math.sin(at*2.6)*.2,y.material.emissiveIntensity=1.6+Math.sin(at*2.6+1)*.5,C.rotation.y=at*.12;for(let x of O)x.position.y+=Math.sin(at*1.4+x.userData.phase)*.0012;for(let x=0;x<X;x++){ct[x]=(ct[x]+rt[x]*pt*2.2)%1,V.getPointAt(ct[x],et);let q=C.position;Q[x*3]=q.x+et.x,Q[x*3+1]=q.y+et.y,Q[x*3+2]=et.z}H.attributes.position.needsUpdate=!0,$.opacity=.65+Math.sin(at*2)*.2}e.render(i,s)}let At=0;return zb&&(window.__heroDebug={scene:i,camera:s,renderer:e,get running(){return $t},get frames(){return At}}),Xu?Nt():e.setAnimationLoop(()=>{$t&&!document.hidden&&(At++,Nt())}),{getFrames:()=>At,dispose(){e.setAnimationLoop(null)}}}var Ol=matchMedia("(prefers-reduced-motion: reduce)").matches,yL=new URLSearchParams(location.search).has("debug"),us=15026253;function pg(n,t,e,i){let s=new _r({canvas:t,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});s.setPixelRatio(Math.min(devicePixelRatio,2));let r=new xr,o=new Re(36,1,.1,60);o.position.set(3.4,2.6,5),r.add(o),r.add(new Sr(3421242,1.7));let a=new Mr(16773604,3.2);a.position.set(4,6,5),r.add(a);let l=new hi(us,80,16);l.position.set(-3.5,1.5,-3),r.add(l);let c=()=>new Hn({color:us,transparent:!0,opacity:1}),h=()=>new Ie({color:1776417,metalness:.45,roughness:.42,transparent:!0,opacity:1}),u=new Ge;r.add(u);let d=[],p=new Ge;u.add(p);function g(N,C,O){let A=new Ge;return N(A),A.position.y=C,A.userData={baseY:C,mats:[],edges:[],anchor:new F(O[0],C,O[2]),op:1},A.traverse(L=>{L.isMesh&&L.material.transparent!==void 0&&(L.material=L.material.clone(),A.userData.mats.push(L.material)),L.isLineSegments&&(L.material=L.material.clone(),A.userData.edges.push(L.material))}),p.add(A),d.push(A),A}g(N=>{let C=new Yt(new sn(1.15,.34,1.15,3,.05),h());N.add(C),N.add(new nn(new un(C.geometry,22),c()));let O=new Yt(new Tn(.17,.17,.07,24),new Ie({color:us,emissive:us,emissiveIntensity:1.5,transparent:!0}));O.position.y=.21,N.add(O),N.userData.seal=O.material},1.62,[.6,0,.6]),g(N=>{let C=new Yt(new sn(2.25,.18,1.65,3,.04),h());N.add(C),N.add(new nn(new un(C.geometry,22),c()));let O=new Ie({color:6974066,metalness:.85,roughness:.3,transparent:!0});for(let A=0;A<10;A++){let L=new Yt(new Tn(.045,.045,.09,10),O);L.position.set(-.9+A%5*.45,.13,A<5?-.45:.45),N.add(L)}},1.32,[1.2,0,.9]),g(N=>{let C=new Yt(new sn(2,.34,1.3,3,.05),h());N.add(C),N.add(new nn(new un(C.geometry,22),c()));let O=new sn(.24,.24,.24,2,.04);for(let A=0;A<5;A++){let L=new Yt(O,h());L.position.set(-.72+A*.36,.28,0),N.add(L);let V=new nn(new un(O),c());if(L.add(V),A>0){let X=new ls(new Te().setFromPoints([new F(-.72+(A-1)*.36,.28,0),new F(-.72+A*.36,.28,0)]),new Hn({color:us,transparent:!0,opacity:.45}));N.add(X)}}},.98,[1.05,0,.7]),g(N=>{let C=new Yt(new sn(1.5,.26,1.1,3,.04),h());N.add(C),N.add(new nn(new un(C.geometry,22),c()));let O=new Ie({color:10124095,metalness:.9,roughness:.35,transparent:!0});for(let L=0;L<12;L++){let V=new Yt(new Ke(.14,.05,.16),O);V.position.set(-.62+L%6*.25,.15,L<6?-.4:.4),N.add(V)}let A=new Yt(new Ke(.4,.09,.4),new Ie({color:657932,metalness:.6,roughness:.2,transparent:!0}));A.position.y=.17,N.add(A)},.62,[.8,0,.6]),g(N=>{let C=new Yt(new sn(2.5,.55,1.9,3,.06),h());N.add(C),N.add(new nn(new un(C.geometry,22),c()));let O=new Yt(new Tn(.55,.55,.06,36),new Ie({color:5658208,metalness:.85,roughness:.25,transparent:!0}));O.position.set(-.6,.3,0),N.add(O);let A=new Yt(new Pl(.55,.015,8,48),new Ie({color:us,emissive:us,emissiveIntensity:.9,transparent:!0}));A.rotation.x=Math.PI/2,A.position.set(.6,.3,0),N.add(A),N.userData.ring=A},0,[1.3,0,1]),u.position.y=-.9;let _=[3.1,1.9,1.05,.45,0];function m(){let N=t.clientWidth,C=t.clientHeight;s.setSize(N,C,!1),o.aspect=N/C,o.updateProjectionMatrix();let O=Math.min(1,N/640);u.scale.setScalar(1.05+O*.35)}m(),new ResizeObserver(m).observe(t);let f=[...i.querySelectorAll(".chip")],T=[...n.querySelectorAll(".step")],v=-1;function M(N){N!==v&&(v=N,T.forEach(C=>C.classList.toggle("active",+C.dataset.layer===N)),f.forEach(C=>C.classList.toggle("active",+C.dataset.layer===N)))}if(Ol)M(1);else{let N=new IntersectionObserver(C=>{for(let O of C)O.isIntersecting&&M(+O.target.dataset.layer)},{rootMargin:"-42% 0px -42% 0px"});T.forEach(C=>N.observe(C))}let w=document.createElementNS("http://www.w3.org/2000/svg","line");e.appendChild(w);let R=matchMedia("(max-width: 900px)").matches;function I(){if(R||v<0){w.setAttribute("opacity","0");return}let N=i.querySelector(".chip.active");if(!N)return;let C=N.getBoundingClientRect(),O=t.getBoundingClientRect(),A=C.right-O.left,L=C.top+C.height/2-O.top,V=d[v].userData.anchor.clone();d[v].getWorldPosition,d[v].localToWorld(V),V.project(o);let X=(V.x*.5+.5)*O.width,Q=(-V.y*.5+.5)*O.height;w.setAttribute("x1",A),w.setAttribute("y1",L),w.setAttribute("x2",X),w.setAttribute("y2",Q),w.setAttribute("opacity","0.55")}let S=N=>N*N*(3-2*N),y=0,D=0,W=!0;new IntersectionObserver(([N])=>{W=N.isIntersecting},{threshold:.02}).observe(t);let Y=new br;function B(){let N=Math.min(Y.getDelta(),.05),C=Y.elapsedTime,O=n.getBoundingClientRect(),A=innerHeight,L=O.height-A;D=L>0?Math.min(1,Math.max(0,-O.top/L)):0,y+=(D-y)*Math.min(N*6,1);let V=Ol?.35:S(y);for(let X=0;X<d.length;X++){let Q=d[X],rt=_[X];Q.position.y=Q.userData.baseY+rt*V,Q.position.x=(X%2===0?-1:1)*V*.28;let H=v<0||v===X?1:.22;Q.userData.op+=(H-Q.userData.op)*Math.min(N*8,1);let $=Q.userData.op;for(let it of Q.userData.mats)it.opacity=$;for(let it of Q.userData.edges)it.opacity=.8*$;Q.userData.seal&&(Q.userData.seal.emissiveIntensity=(1.2+Math.sin(C*2.5)*.5)*$),Q.userData.ring&&(Q.userData.ring.material.emissiveIntensity=(.7+Math.sin(C*1.8)*.3)*$)}p.rotation.y=(Ol?.5:C*.12)+V*1.2,o.position.set(3.4,2.4+V*.7,5-V*.5),o.lookAt(0,.9+V*.5,0),s.render(r,o),I()}return Ol?B():s.setAnimationLoop(()=>{W&&!document.hidden&&B()}),{dispose(){s.setAnimationLoop(null)}}}var Wn=typeof window<"u",qu=Wn?window:null,Dr=Wn?document:null,ge={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},Jt={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},pn={NONE:0,AUTO:1,FORCE:2},Ye={replace:0,none:1,blend:2},mg=Symbol(),sd=Symbol(),Cg=Symbol(),Kl=Symbol();var Vb=Symbol(),oe=1e-11,Rg=1e12,ps=1e3,Ju=120,Vi="",Mo=new Map;Mo.set("x","translateX");Mo.set("y","translateY");Mo.set("z","translateZ");var rd=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],Pg=rd.reduce((n,t)=>({...n,[t]:t+"("}),{}),Je=()=>{},kb=/(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,Hb=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,Gb=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,Wb=/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,Xb=/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,gg=/[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,Ig=/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,Yb=/([a-z])([A-Z])/g,qb=/(\w+)(\([^)]+\)+)/g,$b=/(\*=|\+=|-=)/,Dg={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:Ju,loop:0,reversed:!1,alternate:!1,autoplay:!0,duration:ps,delay:0,loopDelay:0,ease:"out(2)",composition:Ye.replace,modifier:n=>n,onBegin:Je,onBeforeUpdate:Je,onUpdate:Je,onLoop:Je,onPause:Je,onComplete:Je,onRender:Je},ve={defaults:Dg,root:Dr,scope:null,precision:4,timeScale:1,tickThreshold:200},Lg={version:"4.0.2",engine:null};Wn&&(qu.AnimeJS||(qu.AnimeJS=[]),qu.AnimeJS.push(Lg));var Zb=n=>n.replace(Yb,"$1-$2").toLowerCase(),fs=(n,t)=>n.indexOf(t)===0,xo=Date.now,ms=Array.isArray,$u=n=>n&&n.constructor===Object,od=n=>typeof n=="number"&&!isNaN(n),Jl=n=>typeof n=="string",Xl=n=>typeof n=="function",Zt=n=>typeof n>"u",kl=n=>Zt(n)||n===null,Ug=n=>Wn&&n instanceof SVGElement,Ng=n=>kb.test(n),Fg=n=>fs(n,"rgb"),Og=n=>fs(n,"hsl"),Kb=n=>Ng(n)||Fg(n)||Og(n),Hl=n=>!ve.defaults.hasOwnProperty(n),ds=n=>Jl(n)?parseFloat(n):n,Ar=Math.pow,Bg=Math.sqrt,Jb=Math.sin,Qb=Math.cos,yo=Math.abs;var jb=Math.ceil,vo=Math.floor,tT=Math.asin,eT=Math.max;var So=Math.PI,Qu=Math.round,De=(n,t,e)=>n<t?t:n>e?e:n,_g={},_e=(n,t)=>{if(t<0)return n;if(!t)return Qu(n);let e=_g[t];return e||(e=_g[t]=10**t),Qu(n*e)/e},nT=(n,t)=>ms(t)?t.reduce((e,i)=>yo(i-n)<yo(e-n)?i:e):t?Qu(n/t)*t:n,zi=(n,t,e)=>n+(t-n)*e,ad=n=>n===1/0?Rg:n===-1/0?-1e12:n,_o=n=>n<=oe?oe:ad(_e(n,11)),Xe=n=>ms(n)?[...n]:n,iT=(n,t)=>{let e={...n};for(let i in t){let s=n[i];e[i]=Zt(s)?t[i]:s}return e},Me=(n,t,e,i="_prev",s="_next")=>{let r=n._head,o=s;for(e&&(r=n._tail,o=i);r;){let a=r[o];t(r),r=a}},ki=(n,t,e="_prev",i="_next")=>{let s=t[e],r=t[i];s?s[i]=r:n._head=r,r?r[e]=s:n._tail=s,t[e]=null,t[i]=null},Pr=(n,t,e,i="_prev",s="_next")=>{let r=n._tail;for(;r&&e&&e(r,t);)r=r[i];let o=r?r[s]:n._head;r?r[s]=t:n._head=t,o?o[i]=t:n._tail=t,t[i]=r,t[s]=o},Yl=class{constructor(t=0){this.deltaTime=0,this._currentTime=t,this._elapsedTime=t,this._startTime=t,this._lastTime=t,this._scheduledTime=0,this._frameDuration=_e(ps/Ju,0),this._fps=Ju,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(t){let e=this._frameDuration,i=+t,s=i<oe?oe:i,r=_e(ps/s,0);this._fps=s,this._frameDuration=r,this._scheduledTime+=r-e}get speed(){return this._speed}set speed(t){let e=+t;this._speed=e<oe?oe:e}requestTick(t){let e=this._scheduledTime,i=this._elapsedTime;if(this._elapsedTime+=t-i,i<e)return pn.NONE;let s=this._frameDuration,r=i-e;return this._scheduledTime+=r<s?s:r,pn.AUTO}computeDeltaTime(t){let e=t-this._lastTime;return this.deltaTime=e,this._lastTime=t,e}},Gl=(n,t,e,i,s)=>{let r=n.parent,o=n.duration,a=n.completed,l=n.iterationDuration,c=n.iterationCount,h=n._currentIteration,u=n._loopDelay,d=n._reversed,p=n._alternate,g=n._hasChildren,_=n._delay,m=n._currentTime,f=_+l,T=t-_,v=De(m,-_,o),M=De(T,-_,o),P=T-m,w=M>0,R=M>=o,I=o<=oe,S=s===pn.FORCE,y=0,D=T,W=0;if(c>1){let O=~~(M/(l+(R?0:u)));n._currentIteration=De(O,0,c),R&&n._currentIteration--,y=n._currentIteration%2,D=M%(l+u)||0}let Y=d^(p&&y),B=n._ease,N=R?Y?0:o:Y?l-D:D;B&&(N=l*B(N/l)||0);let C=(r?r.backwards:T<m)?!Y:!!Y;if(n._currentTime=T,n._iterationTime=N,n.backwards=C,w&&!n.began?(n.began=!0,!e&&!(r&&(C||!r.began))&&n.onBegin(n)):T<=0&&(n.began=!1),!e&&!g&&w&&n._currentIteration!==h&&n.onLoop(n),S||s===pn.AUTO&&(t>=_&&t<=f||t<=_&&v>_||t>=f&&v!==o)||N>=f&&v!==o||N<=_&&v>0||t<=v&&v===o&&a||R&&!a&&I){if(w&&(n.computeDeltaTime(v),e||n.onBeforeUpdate(n)),!g){let O=S||(C?P*-1:P)>=ve.tickThreshold,A=n._offset+(r?r._offset:0)+_+N,L=n._head,V,X,Q,rt,H=0;for(;L;){let $=L._composition,it=L._currentTime,et=L._changeDuration,ct=L._absoluteStartTime+L._changeDuration,ut=L._nextRep,Tt=L._prevRep,Ot=$!==Ye.none;if((O||(it!==et||A<=ct+(ut?ut._delay:0))&&(it!==0||A>=L._absoluteStartTime))&&(!Ot||!L._isOverridden&&(!L._isOverlapped||A<=ct)&&(!ut||ut._isOverridden||A<=ut._absoluteStartTime)&&(!Tt||Tt._isOverridden||A>=Tt._absoluteStartTime+Tt._changeDuration+L._delay))){let ht=L._currentTime=De(N-L._startTime,0,et),ft=L._ease(ht/L._updateDuration),U=L._modifier,$t=L._valueType,Ct=L._tweenType,Nt=Ct===ge.OBJECT,At=$t===Jt.NUMBER,pt=At&&Nt||ft===0||ft===1?-1:ve.precision,at,E;if(At)at=E=U(_e(zi(L._fromNumber,L._toNumber,ft),pt));else if($t===Jt.UNIT)E=U(_e(zi(L._fromNumber,L._toNumber,ft),pt)),at=`${E}${L._unit}`;else if($t===Jt.COLOR){let x=L._fromNumbers,q=L._toNumbers,j=_e(De(U(zi(x[0],q[0],ft)),0,255),0),nt=_e(De(U(zi(x[1],q[1],ft)),0,255),0),tt=_e(De(U(zi(x[2],q[2],ft)),0,255),0),bt=De(U(_e(zi(x[3],q[3],ft),pt)),0,1);if(at=`rgba(${j},${nt},${tt},${bt})`,Ot){let dt=L._numbers;dt[0]=j,dt[1]=nt,dt[2]=tt,dt[3]=bt}}else if($t===Jt.COMPLEX){at=L._strings[0];for(let x=0,q=L._toNumbers.length;x<q;x++){let j=U(_e(zi(L._fromNumbers[x],L._toNumbers[x],ft),pt)),nt=L._strings[x+1];at+=`${nt?j+nt:j}`,Ot&&(L._numbers[x]=j)}}if(Ot&&(L._number=E),!i&&$!==Ye.blend){let x=L.property;V=L.target,Nt?V[x]=at:Ct===ge.ATTRIBUTE?V.setAttribute(x,at):(X=V.style,Ct===ge.TRANSFORM?(V!==Q&&(Q=V,rt=V[Kl]),rt[x]=at,H=1):Ct===ge.CSS?X[x]=at:Ct===ge.CSS_VAR&&X.setProperty(x,at)),w&&(W=1)}else L._value=at}if(H&&L._renderTransforms){let ht=Vi;for(let ft in rt)ht+=`${Pg[ft]}${rt[ft]}) `;X.transform=ht,H=0}L=L._next}!e&&W&&n.onRender(n)}!e&&w&&n.onUpdate(n)}return r&&I?!e&&(r.began&&!C&&T>=o&&!a||C&&T<=oe&&a)&&(n.onComplete(n),n.completed=!C):w&&R?c===1/0?n._startTime+=n.duration:n._currentIteration>=c-1&&(n.paused=!0,!a&&!g&&(n.completed=!0,!e&&!(r&&(C||!r.began))&&(n.onComplete(n),n._resolve(n)))):n.completed=!1,W},Cr=(n,t,e,i,s)=>{let r=n._currentIteration;if(Gl(n,t,e,i,s),n._hasChildren){let o=n,a=o.backwards,l=i?t:o._iterationTime,c=xo(),h=0,u=!0;if(!i&&o._currentIteration!==r){let d=o.iterationDuration;Me(o,p=>{if(!a)!p.completed&&!p.backwards&&p._currentTime<p.iterationDuration&&Gl(p,d,e,1,pn.FORCE),p.began=!1,p.completed=!1;else{let g=p.duration,_=p._offset+p._delay,m=_+g;!e&&g<=oe&&(!_||m===d)&&p.onComplete(p)}}),e||o.onLoop(o)}Me(o,d=>{let p=_e((l-d._offset)*d._speed,12),g=d._fps<o._fps?d.requestTick(c):s;h+=Gl(d,p,e,i,g),!d.completed&&u&&(u=!1)},a),!e&&h&&o.onRender(o),u&&o._currentTime>=o.duration&&(o.paused=!0,o.completed||(o.completed=!0,e||(o.onComplete(o),o._resolve(o))))}},Ir={animation:null,update:Je},sT=n=>{let t=Ir.animation;return t||(t={duration:oe,computeDeltaTime:Je,_offset:0,_delay:0,_head:null,_tail:null},Ir.animation=t,Ir.update=()=>{n.forEach(e=>{for(let i in e){let s=e[i],r=s._head;if(r){let o=r._valueType,a=o===Jt.COMPLEX||o===Jt.COLOR?Xe(r._fromNumbers):null,l=r._fromNumber,c=s._tail;for(;c&&c!==r;){if(a)for(let h=0,u=c._numbers.length;h<u;h++)a[h]+=c._numbers[h];else l+=c._number;c=c._prevAdd}r._toNumber=l,r._toNumbers=a}}}),Gl(t,1,1,0,pn.FORCE)}),t},zg=Wn?requestAnimationFrame:setImmediate,rT=Wn?cancelAnimationFrame:clearImmediate,ju=class extends Yl{constructor(t){super(t),this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=Dg,this.paused=!!(Wn&&Dr.hidden),this.reqId=null}update(){let t=this._currentTime=xo();if(this.requestTick(t)){this.computeDeltaTime(t);let e=this._speed,i=this._fps,s=this._head;for(;s;){let r=s._next;s.paused?(ki(this,s),this._hasChildren=!!this._tail,s._running=!1,s.completed&&!s._cancelled&&s.cancel()):Cr(s,(t-s._startTime)*s._speed*e,0,0,s._fps<i?s.requestTick(t):pn.AUTO),s=r}Ir.update()}}wake(){return this.useDefaultMainLoop&&!this.reqId&&!this.paused&&(this.reqId=zg(Vg)),this}pause(){return this.paused=!0,oT()}resume(){if(this.paused)return this.paused=!1,Me(this,t=>t.resetTime()),this.wake()}get speed(){return this._speed*(ve.timeScale===1?1:ps)}set speed(t){this._speed=t*ve.timeScale,Me(this,e=>e.speed=e._speed)}get timeUnit(){return ve.timeScale===1?"ms":"s"}set timeUnit(t){let i=t==="s",s=i?.001:1;if(ve.timeScale!==s){ve.timeScale=s,ve.tickThreshold=200*s;let r=i?.001:ps;this.defaults.duration*=r,this._speed*=r}}get precision(){return ve.precision}set precision(t){ve.precision=t}},Ae=(()=>{let n=new ju(xo());return Wn&&(Lg.engine=n,Dr.addEventListener("visibilitychange",()=>{n.pauseOnDocumentHidden&&(Dr.hidden?n.pause():n.resume())})),n})(),Vg=()=>{Ae._head?(Ae.reqId=zg(Vg),Ae.update()):Ae.reqId=0},oT=()=>(rT(Ae.reqId),Ae.reqId=0,Ae),aT=(n,t,e)=>{let i=n.style.transform,s;if(i){let r=n[Kl],o;for(;o=qb.exec(i);){let a=o[1],l=o[2].slice(1,-1);r[a]=l,a===t&&(s=l,e&&(e[t]=l))}}return i&&!Zt(s)?s:fs(t,"scale")?"1":fs(t,"rotate")||fs(t,"skew")?"0deg":"0px"};function xg(n){let t=Jl(n)?ve.root.querySelectorAll(n):n;if(t instanceof NodeList||t instanceof HTMLCollection)return t}function kg(n){if(kl(n))return[];if(ms(n)){let e=n.flat(1/0),i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];if(!kl(o)){let a=xg(o);if(a)for(let l=0,c=a.length;l<c;l++){let h=a[l];if(!kl(h)){let u=!1;for(let d=0,p=i.length;d<p;d++)if(i[d]===h){u=!0;break}u||i.push(h)}}else{let l=!1;for(let c=0,h=i.length;c<h;c++)if(i[c]===o){l=!0;break}l||i.push(o)}}}return i}if(!Wn)return[n];let t=xg(n);return t?Array.from(t):[n]}function ld(n){let t=kg(n),e=t.length;if(e)for(let i=0;i<e;i++){let s=t[i];if(!s[mg]){s[mg]=!0;let r=Ug(s);(s.nodeType||r)&&(s[sd]=!0,s[Cg]=r,s[Kl]={})}}return t}var lT=["opacity","rotate","overflow","color"],cT=(n,t)=>{if(lT.includes(t))return!1;if(n.getAttribute(t)||t in n){if(t==="scale"){let e=n.parentNode;return e&&e.tagName==="filter"}return!0}};var hT=n=>{let t=Hb.exec(n)||Gb.exec(n),e=Zt(t[4])?1:+t[4];return[+t[1],+t[2],+t[3],e]},uT=n=>{let t=n.length,e=t===4||t===5;return[+("0x"+n[1]+n[e?1:2]),+("0x"+n[e?2:3]+n[e?2:4]),+("0x"+n[e?3:5]+n[e?3:6]),t===5||t===9?+(+("0x"+n[e?4:7]+n[e?4:8])/255).toFixed(3):1]},Zu=(n,t,e)=>(e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*(2/3-e)*6:n),dT=n=>{let t=Wb.exec(n)||Xb.exec(n),e=+t[1]/360,i=+t[2]/100,s=+t[3]/100,r=Zt(t[4])?1:+t[4],o,a,l;if(i===0)o=a=l=s;else{let c=s<.5?s*(1+i):s+i-s*i,h=2*s-c;o=_e(Zu(h,c,e+1/3)*255,0),a=_e(Zu(h,c,e)*255,0),l=_e(Zu(h,c,e-1/3)*255,0)}return[o,a,l,r]},fT=n=>Fg(n)?hT(n):Ng(n)?uT(n):Og(n)?dT(n):[0,0,0,1],ze=(n,t)=>Zt(n)?t:n,Oi=(n,t,e,i,s)=>{if(Xl(n)){let r=()=>{let o=n(t,e,i);return isNaN(+o)?o||0:+o};return s&&(s.func=r),r()}else return n},cd=(n,t)=>n[sd]?n[Cg]&&cT(n,t)?ge.ATTRIBUTE:rd.includes(t)||Mo.get(t)?ge.TRANSFORM:fs(t,"--")?ge.CSS_VAR:t in n.style?ge.CSS:t in n?ge.OBJECT:ge.ATTRIBUTE:ge.OBJECT,yg=(n,t,e)=>{let i=n.style[t];i&&e&&(e[t]=i);let s=i||getComputedStyle(n[Vb]||n).getPropertyValue(t);return s==="auto"?"0":s},Rr=(n,t,e,i)=>{let s=Zt(e)?cd(n,t):e;return s===ge.OBJECT?n[t]||0:s===ge.ATTRIBUTE?n.getAttribute(t):s===ge.TRANSFORM?aT(n,t,i):s===ge.CSS_VAR?yg(n,t,i).trimStart():yg(n,t,i)},td=(n,t,e)=>e==="-"?n-t:e==="+"?n+t:n*t,hd=()=>({t:Jt.NUMBER,n:0,u:null,o:null,d:null,s:null}),Cn=(n,t)=>{if(t.t=Jt.NUMBER,t.n=0,t.u=null,t.o=null,t.d=null,t.s=null,!n)return t;let e=+n;if(isNaN(e)){let i=n;i[1]==="="&&(t.o=i[0],i=i.slice(2));let s=i.includes(" ")?!1:Ig.exec(i);if(s)return t.t=Jt.UNIT,t.n=+s[1],t.u=s[2],t;if(t.o)return t.n=+i,t;if(Kb(i))return t.t=Jt.COLOR,t.d=fT(i),t;{let r=i.match(gg);return t.t=Jt.COMPLEX,t.d=r?r.map(Number):[],t.s=i.split(gg)||[],t}}else return t.n=e,t},vg=(n,t)=>(t.t=n._valueType,t.n=n._toNumber,t.u=n._unit,t.o=null,t.d=Xe(n._toNumbers),t.s=Xe(n._strings),t),fn=hd(),ql={_rep:new WeakMap,_add:new Map},ud=(n,t,e="_rep")=>{let i=ql[e],s=i.get(n);return s||(s={},i.set(n,s)),s[t]?s[t]:s[t]={_head:null,_tail:null}},pT=(n,t)=>n._isOverridden||n._absoluteStartTime>t._absoluteStartTime,Wl=n=>{n._isOverlapped=1,n._isOverridden=1,n._changeDuration=oe,n._currentTime=oe},Hg=(n,t)=>{let e=n._composition;if(e===Ye.replace){let i=n._absoluteStartTime;Pr(t,n,pT,"_prevRep","_nextRep");let s=n._prevRep;if(s){let r=s.parent,o=s._absoluteStartTime+s._changeDuration;if(n.parent.id!==r.id&&r.iterationCount>1&&o+(r.duration-r.iterationDuration)>i){Wl(s);let c=s._prevRep;for(;c&&c.parent.id===r.id;)Wl(c),c=c._prevRep}let a=i-n._delay;if(o>a){let c=s._startTime,h=o-(c+s._updateDuration);s._changeDuration=a-h-c,s._currentTime=s._changeDuration,s._isOverlapped=1,s._changeDuration<oe&&Wl(s)}let l=!0;if(Me(r,c=>{c._isOverlapped||(l=!1)}),l){let c=r.parent;if(c){let h=!0;Me(c,u=>{u!==r&&Me(u,d=>{d._isOverlapped||(h=!1)})}),h&&c.cancel()}else r.cancel()}}}else if(e===Ye.blend){let i=ud(n.target,n.property,"_add"),s=sT(ql._add),r=i._head;r||(r={...n},r._composition=Ye.replace,r._updateDuration=oe,r._startTime=0,r._numbers=Xe(n._fromNumbers),r._number=0,r._next=null,r._prev=null,Pr(i,r),Pr(s,r));let o=n._toNumber;if(n._fromNumber=r._fromNumber-o,n._toNumber=0,n._numbers=Xe(n._fromNumbers),n._number=0,r._fromNumber=o,n._toNumbers){let a=Xe(n._toNumbers);a&&a.forEach((l,c)=>{n._fromNumbers[c]=r._fromNumbers[c]-l,n._toNumbers[c]=0}),r._fromNumbers=a}Pr(i,n,null,"_prevAdd","_nextAdd")}return n},Gg=n=>{let t=n._composition;if(t!==Ye.none){let e=n.target,i=n.property,o=ql._rep.get(e)[i];if(ki(o,n,"_prevRep","_nextRep"),t===Ye.blend){let a=ql._add,l=a.get(e);if(!l)return;let c=l[i],h=Ir.animation;ki(c,n,"_prevAdd","_nextAdd");let u=c._head;if(u&&u===c._tail){ki(c,u,"_prevAdd","_nextAdd"),ki(h,u);let d=!0;for(let p in l)if(l[p]._head){d=!1;break}d&&a.delete(e)}}}return n},Mg=n=>(n.paused=!0,n.began=!1,n.completed=!1,n),ed=n=>(n._cancelled&&(n._hasChildren?Me(n,ed):Me(n,t=>{t._composition!==Ye.none&&Hg(t,ud(t.target,t.property))}),n._cancelled=0),n),mT=0,$l=class extends Yl{constructor(t={},e=null,i=0){super(0);let{id:s,delay:r,duration:o,reversed:a,alternate:l,loop:c,loopDelay:h,autoplay:u,frameRate:d,playbackRate:p,onComplete:g,onLoop:_,onPause:m,onBegin:f,onBeforeUpdate:T,onUpdate:v}=t;ve.scope&&ve.scope.revertibles.push(this);let M=e?0:Ae._elapsedTime,P=e?e.defaults:ve.defaults,w=Xl(r)||Zt(r)?P.delay:+r,R=Xl(o)||Zt(o)?1/0:+o,I=ze(c,P.loop),S=ze(h,P.loopDelay),y=I===!0||I===1/0||I<0?1/0:I+1,D=0;if(e)D=i;else{let W=xo();Ae.paused&&(Ae.requestTick(W),W=Ae._elapsedTime),D=W-Ae._startTime}this.id=Zt(s)?++mT:s,this.parent=e,this.duration=ad((R+S)*y-S)||oe,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=f||P.onBegin,this.onBeforeUpdate=T||P.onBeforeUpdate,this.onUpdate=v||P.onUpdate,this.onLoop=_||P.onLoop,this.onPause=m||P.onPause,this.onComplete=g||P.onComplete,this.iterationDuration=R,this.iterationCount=y,this._autoplay=e?!1:ze(u,P.autoplay),this._offset=D,this._delay=w,this._loopDelay=S,this._iterationTime=0,this._currentIteration=0,this._resolve=Je,this._running=!1,this._reversed=+ze(a,P.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=ze(l,P.alternate),this._prev=null,this._next=null,this._elapsedTime=M,this._startTime=M,this._lastTime=M,this._fps=ze(d,P.frameRate),this._speed=ze(p,P.playbackRate)}get cancelled(){return!!this._cancelled}set cancelled(t){t?this.cancel():this.reset(1).play()}get currentTime(){return De(_e(this._currentTime,ve.precision),-this._delay,this.duration)}set currentTime(t){let e=this.paused;this.pause().seek(+t),e||this.resume()}get iterationCurrentTime(){return _e(this._iterationTime,ve.precision)}set iterationCurrentTime(t){this.currentTime=this.iterationDuration*this._currentIteration+t}get progress(){return De(_e(this._currentTime/this.duration,5),0,1)}set progress(t){this.currentTime=this.duration*t}get iterationProgress(){return De(_e(this._iterationTime/this.iterationDuration,5),0,1)}set iterationProgress(t){let e=this.iterationDuration;this.currentTime=e*this._currentIteration+e*t}get currentIteration(){return this._currentIteration}set currentIteration(t){this.currentTime=this.iterationDuration*De(+t,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(t){t?this.reverse():this.play()}get speed(){return super.speed}set speed(t){super.speed=t,this.resetTime()}reset(t=0){return ed(this),this._reversed&&!this._reverse&&(this.reversed=!1),this._iterationTime=this.iterationDuration,Cr(this,0,1,t,pn.FORCE),Mg(this),this._hasChildren&&Me(this,Mg),this}init(t=0){this.fps=this._fps,this.speed=this._speed,!t&&this._hasChildren&&Cr(this,this.duration,1,t,pn.FORCE),this.reset(t);let e=this._autoplay;return e===!0?this.resume():e&&!Zt(e.linked)&&e.link(this),this}resetTime(){let t=1/(this._speed*Ae._speed);return this._startTime=xo()-(this._currentTime+this._delay)*t,this}pause(){return this.paused?this:(this.paused=!0,this.onPause(this),this)}resume(){return this.paused?(this.paused=!1,this.duration<=oe&&!this._hasChildren?Cr(this,oe,0,0,pn.FORCE):(this._running||(Pr(Ae,this),Ae._hasChildren=!0,this._running=!0),this.resetTime(),this._startTime-=12,Ae.wake()),this):this}restart(){return this.reset(0).resume()}seek(t,e=0,i=0){ed(this),this.completed=!1;let s=this.paused;return this.paused=!0,Cr(this,t+this._delay,~~e,~~i,pn.AUTO),s?this:this.resume()}alternate(){let t=this._reversed,e=this.iterationCount,i=this.iterationDuration,s=e===1/0?vo(Rg/i):e;return this._reversed=+(this._alternate&&!(s%2)?t:!t),e===1/0?this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress:this.seek(i*s-this._currentTime),this.resetTime(),this}play(){return this._reversed&&this.alternate(),this.resume()}reverse(){return this._reversed||this.alternate(),this.resume()}cancel(){return this._hasChildren?Me(this,t=>t.cancel(),!0):Me(this,Gg),this._cancelled=1,this.pause()}stretch(t){let e=this.duration,i=_o(t);if(e===i)return this;let s=t/e,r=t<=oe;return this.duration=r?oe:i,this.iterationDuration=r?oe:_o(this.iterationDuration*s),this._offset*=s,this._delay*=s,this._loopDelay*=s,this}revert(){Cr(this,0,1,0,pn.AUTO);let t=this._autoplay;return t&&t.linked&&t.linked===this&&t.revert(),this.cancel()}complete(){return this.seek(this.duration).cancel()}then(t=Je){let e=this.then,i=()=>{this.then=null,t(this),this.then=e,this._resolve=Je};return new Promise(s=>(this._resolve=()=>s(i()),this.completed&&this._resolve(),this))}};var Lr=n=>n,Wg=(n,t,e)=>(((1-3*e+3*t)*n+(3*e-6*t))*n+3*t)*n,gT=(n,t,e)=>{let i=0,s=1,r,o,a=0;do o=i+(s-i)/2,r=Wg(o,t,e)-n,r>0?s=o:i=o;while(yo(r)>1e-7&&++a<100);return o},_T=(n=.5,t=0,e=.5,i=1)=>n===t&&e===i?Lr:s=>s===0||s===1?s:Wg(gT(s,n,e),t,i),xT=(n=10,t)=>{let e=t?jb:vo;return i=>e(De(i,0,1)*n)*(1/n)},Xg=(...n)=>{let t=n.length;if(!t)return Lr;let e=t-1,i=n[0],s=n[e],r=[0],o=[ds(i)];for(let a=1;a<e;a++){let l=n[a],c=Jl(l)?l.trim().split(" "):[l],h=c[0],u=c[1];r.push(Zt(u)?a/e:ds(u)/100),o.push(ds(h))}return o.push(ds(s)),r.push(1),function(l){for(let c=1,h=r.length;c<h;c++){let u=r[c];if(l<=u){let d=r[c-1],p=o[c-1];return p+(o[c]-p)*(l-d)/(u-d)}}return o[o.length-1]}},yT=(n=10,t=1)=>{let e=[0],i=n-1;for(let s=1;s<i;s++){let r=e[s-1],o=s/i,a=(s+1)/i,l=o+(a-o)*Math.random(),c=o*(1-t)+l*t;e.push(De(c,r,1))}return e.push(1),Xg(...e)},vT=So/2,Sg=So*2,go=(n=1.68)=>t=>Ar(t,+n),bg={[Vi]:go,Quad:go(2),Cubic:go(3),Quart:go(4),Quint:go(5),Sine:n=>1-Qb(n*vT),Circ:n=>1-Bg(1-n*n),Expo:n=>n?Ar(2,10*n-10):0,Bounce:n=>{let t,e=4;for(;n<((t=Ar(2,--e))-1)/11;);return 1/Ar(4,3-e)-7.5625*Ar((t*3-2)/22-n,2)},Back:(n=1.70158)=>t=>(+n+1)*t*t*t-+n*t*t,Elastic:(n=1,t=.3)=>{let e=De(+n,1,10),i=De(+t,oe,2),s=i/Sg*tT(1/e),r=Sg/i;return o=>o===0||o===1?o:-e*Ar(2,-10*(1-o))*Jb((1-o-s)*r)}},nd={in:n=>t=>n(t),out:n=>t=>1-n(1-t),inOut:n=>t=>t<.5?n(t*2)/2:1-n(t*-2+2)/2,outIn:n=>t=>t<.5?(1-n(1-t*2))/2:(n(t*2-1)+1)/2},MT=(n,t,e)=>{if(e[n])return e[n];if(n.indexOf("(")<=-1){let s=nd[n]||n.includes("Back")||n.includes("Elastic")?t[n]():t[n];return s?e[n]=s:Lr}else{let i=n.slice(0,-1).split("("),s=t[i[0]];return s?e[n]=s(...i[1].split(",")):Lr}},ST=(()=>{let n={linear:Xg,irregular:yT,steps:xT,cubicBezier:_T};for(let t in nd)for(let e in bg){let i=bg[e],s=nd[t];n[t+e]=e===Vi||e==="Back"||e==="Elastic"?(r,o)=>s(i(r,o)):s(i)}return n})(),bT={linear:Lr},id=n=>Xl(n)?n:Jl(n)?MT(n,ST,bT):Lr,Tg={},dd=(n,t,e)=>{if(e===ge.TRANSFORM){let i=Mo.get(n);return i||n}else if(e===ge.CSS||e===ge.ATTRIBUTE&&Ug(t)&&n in t.style){let i=Tg[n];if(i)return i;{let s=n&&Zb(n);return Tg[n]=s,s}}else return n},Ku={deg:1,rad:180/So,turn:360},Eg={},Yg=(n,t,e,i=!1)=>{let s=t.u,r=t.n;if(t.t===Jt.UNIT&&s===e)return t;let o=r+s+e,a=Eg[o];if(!Zt(a)&&!i)t.n=a;else{let l;if(s in Ku)l=r*Ku[s]/Ku[e];else{let h=n.cloneNode(),u=n.parentNode,d=u&&u!==Dr?u:Dr.body;d.appendChild(h);let p=h.style;p.width=100+s;let g=h.offsetWidth||100;p.width=100+e;let _=h.offsetWidth||100,m=g/_;d.removeChild(h),l=m*r}t.n=l,Eg[o]=l}return t.t,Jt.UNIT,t.u=e,t},fd=n=>{if(n._hasChildren)Me(n,fd,!0);else{let t=n;t.pause(),Me(t,e=>{let i=e.property,s=e.target;if(s[sd]){let r=s.style,o=t._inlineStyles[i];if(e._tweenType===ge.TRANSFORM){let a=s[Kl];if(Zt(o)||o===Vi?delete a[i]:a[i]=o,e._renderTransforms)if(!Object.keys(a).length)r.removeProperty("transform");else{let l=Vi;for(let c in a)l+=Pg[c]+a[c]+") ";r.transform=l}}else Zt(o)||o===Vi?r.removeProperty(i):r[i]=o;t._tail===e&&t.targets.forEach(a=>{a.getAttribute&&a.getAttribute("style")===Vi&&a.removeAttribute("style")})}})}return n},zt=hd(),qt=hd(),Bl={func:null},zl=[null],wr=[null,null],Vl={to:null},TT=0,Bi,Gn,ET=(n,t)=>{let e={};if(ms(n)){let i=[].concat(...n.map(s=>Object.keys(s))).filter(Hl);for(let s=0,r=i.length;s<r;s++){let o=i[s],a=n.map(l=>{let c={};for(let h in l){let u=l[h];Hl(h)?h===o&&(c.to=u):c[h]=u}return c});e[o]=a}}else{let i=ze(t.duration,ve.defaults.duration);Object.keys(n).map(r=>({o:parseFloat(r)/100,p:n[r]})).sort((r,o)=>r.o-o.o).forEach(r=>{let o=r.o,a=r.p;for(let l in a)if(Hl(l)){let c=e[l];c||(c=e[l]=[]);let h=o*i,u=c.length,d=c[u-1],p={to:a[l]},g=0;for(let _=0;_<u;_++)g+=c[_].duration;u===1&&(p.from=d.to),a.ease&&(p.ease=a.ease),p.duration=h-(u?g:0),c.push(p)}return r});for(let r in e){let o=e[r],a;for(let l=0,c=o.length;l<c;l++){let h=o[l],u=h.ease;h.ease=a||void 0,a=u}o[0].duration||o.shift()}}return e},Zl=class extends $l{constructor(t,e,i,s,r=!1,o=0,a=0){super(e,i,s);let l=ld(t),c=l.length,h=e.keyframes,u=h?iT(ET(h,e),e):e,{delay:d,duration:p,ease:g,playbackEase:_,modifier:m,composition:f,onRender:T}=u,v=i?i.defaults:ve.defaults,M=ze(_,v.playbackEase),P=M?id(M):null,w=!Zt(g)&&!Zt(g.ease),R=w?g.ease:ze(g,P?"linear":v.ease),I=w?g.duration:ze(p,v.duration),S=ze(d,v.delay),y=m||v.modifier,D=Zt(f)&&c>=ps?Ye.none:Zt(f)?v.composition:f,W={},Y=this._offset+(i?i._offset:0),B=NaN,N=NaN,C=0,O=0;for(let A=0;A<c;A++){let L=l[A],V=o||A,X=a||c,Q=NaN,rt=NaN;for(let H in u)if(Hl(H)){let $=cd(L,H),it=dd(H,L,$),et=u[H],ct=ms(et);if(r&&!ct&&(wr[0]=et,wr[1]=et,et=wr),ct){let U=et.length,$t=!$u(et[0]);U===2&&$t?(Vl.to=et,zl[0]=Vl,Bi=zl):U>2&&$t?(Bi=[],et.forEach((Ct,Nt)=>{Nt?Nt===1?(wr[1]=Ct,Bi.push(wr)):Bi.push(Ct):wr[0]=Ct})):Bi=et}else zl[0]=et,Bi=zl;let ut=null,Tt=null,Ot=NaN,ht=0,ft=0;for(let U=Bi.length;ft<U;ft++){let $t=Bi[ft];$u($t)?Gn=$t:(Vl.to=$t,Gn=Vl),Bl.func=null;let Ct=Oi(Gn.to,L,V,X,Bl),Nt;$u(Ct)&&!Zt(Ct.to)?(Gn=Ct,Nt=Ct.to):Nt=Ct;let At=Oi(Gn.from,L,V,X),pt=Gn.ease,at=!Zt(pt)&&!Zt(pt.ease),E=at?pt.ease:pt||R,x=at?pt.duration:Oi(ze(Gn.duration,U>1?Oi(I,L,V,X)/U:I),L,V,X),q=Oi(ze(Gn.delay,ft?0:S),L,V,X),j=Oi(ze(Gn.composition,D),L,V,X),nt=od(j)?j:Ye[j],tt=Gn.modifier||y,bt=!Zt(At),dt=!Zt(Nt),gt=ms(Nt),Kt=gt||bt&&dt,ot=Tt?ht+q:q,St=Y+ot;!O&&(bt||gt)&&(O=1);let Et=Tt;if(nt!==Ye.none){ut||(ut=ud(L,it));let wt=ut._head;for(;wt&&!wt._isOverridden&&wt._absoluteStartTime<=St;)if(Et=wt,wt=wt._nextRep,wt&&wt._absoluteStartTime>=St)for(;wt;)Wl(wt),wt=wt._nextRep}if(Kt?(Cn(gt?Oi(Nt[0],L,V,X):At,zt),Cn(gt?Oi(Nt[1],L,V,X,Bl):Nt,qt),zt.t===Jt.NUMBER&&(Et?Et._valueType===Jt.UNIT&&(zt.t=Jt.UNIT,zt.u=Et._unit):(Cn(Rr(L,it,$,W),fn),fn.t===Jt.UNIT&&(zt.t=Jt.UNIT,zt.u=fn.u)))):(dt?Cn(Nt,qt):Tt?vg(Tt,qt):Cn(i&&Et&&Et.parent.parent===i?Et._value:Rr(L,it,$,W),qt),bt?Cn(At,zt):Tt?vg(Tt,zt):Cn(i&&Et&&Et.parent.parent===i?Et._value:Rr(L,it,$,W),zt)),zt.o&&(zt.n=td(Et?Et._toNumber:Cn(Rr(L,it,$,W),fn).n,zt.n,zt.o)),qt.o&&(qt.n=td(zt.n,qt.n,qt.o)),zt.t!==qt.t){if(zt.t===Jt.COMPLEX||qt.t===Jt.COMPLEX){let wt=zt.t===Jt.COMPLEX?zt:qt,Dt=zt.t===Jt.COMPLEX?qt:zt;Dt.t=Jt.COMPLEX,Dt.s=Xe(wt.s),Dt.d=wt.d.map(()=>Dt.n)}else if(zt.t===Jt.UNIT||qt.t===Jt.UNIT){let wt=zt.t===Jt.UNIT?zt:qt,Dt=zt.t===Jt.UNIT?qt:zt;Dt.t=Jt.UNIT,Dt.u=wt.u}else if(zt.t===Jt.COLOR||qt.t===Jt.COLOR){let wt=zt.t===Jt.COLOR?zt:qt,Dt=zt.t===Jt.COLOR?qt:zt;Dt.t=Jt.COLOR,Dt.s=wt.s,Dt.d=[0,0,0,1]}}if(zt.u!==qt.u){let wt=qt.u?zt:qt;wt=Yg(L,wt,qt.u?qt.u:zt.u,!1)}if(qt.d&&zt.d&&qt.d.length!==zt.d.length){let wt=zt.d.length>qt.d.length?zt:qt,Dt=wt===zt?qt:zt;Dt.d=wt.d.map((ae,z)=>Zt(Dt.d[z])?0:Dt.d[z]),Dt.s=Xe(wt.s)}let Ft=_e(+x||oe,12),Mt={parent:this,id:TT++,property:it,target:L,_value:null,_func:Bl.func,_ease:id(E),_fromNumbers:Xe(zt.d),_toNumbers:Xe(qt.d),_strings:Xe(qt.s),_fromNumber:zt.n,_toNumber:qt.n,_numbers:Xe(zt.d),_number:zt.n,_unit:qt.u,_modifier:tt,_currentTime:0,_startTime:ot,_delay:+q,_updateDuration:Ft,_changeDuration:Ft,_absoluteStartTime:St,_tweenType:$,_valueType:qt.t,_composition:nt,_isOverlapped:0,_isOverridden:0,_renderTransforms:0,_prevRep:null,_nextRep:null,_prevAdd:null,_nextAdd:null,_prev:null,_next:null};nt!==Ye.none&&Hg(Mt,ut),isNaN(Ot)&&(Ot=Mt._startTime),ht=_e(ot+Ft,12),Tt=Mt,C++,Pr(this,Mt)}(isNaN(N)||Ot<N)&&(N=Ot),(isNaN(B)||ht>B)&&(B=ht),$===ge.TRANSFORM&&(Q=C-ft,rt=C)}if(!isNaN(Q)){let H=0;Me(this,$=>{H>=Q&&H<rt&&($._renderTransforms=1,$._composition===Ye.blend&&Me(Ir.animation,it=>{it.id===$.id&&(it._renderTransforms=1)})),H++})}}c||console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation."),N?(Me(this,A=>{A._startTime-A._delay||(A._delay-=N),A._startTime-=N}),B-=N):N=0,B||(B=oe,this.iterationCount=0),this.targets=l,this.duration=B===oe?oe:ad((B+this._loopDelay)*this.iterationCount-this._loopDelay)||oe,this.onRender=T||v.onRender,this._ease=P,this._delay=N,this.iterationDuration=B,this._inlineStyles=W,!this._autoplay&&O&&this.onRender(this)}stretch(t){let e=this.duration;if(e===_o(t))return this;let i=t/e;return Me(this,s=>{s._updateDuration=_o(s._updateDuration*i),s._changeDuration=_o(s._changeDuration*i),s._currentTime*=i,s._startTime*=i,s._absoluteStartTime*=i}),super.stretch(t)}refresh(){return Me(this,t=>{let e=Rr(t.target,t.property,t._tweenType);Cn(e,fn),t._fromNumbers=Xe(fn.d),t._fromNumber=fn.n,t._func&&(Cn(t._func(),qt),t._toNumbers=Xe(qt.d),t._strings=Xe(qt.s),t._toNumber=qt.n)}),this}revert(){return super.revert(),fd(this)}then(t){return super.then(t)}},bo=(n,t)=>new Zl(n,t,null,0,!1).init();var qg=["x","y","z"],ML=["perspective","width","height","margin","padding","top","right","bottom","left","borderWidth","fontSize","borderRadius",...qg],SL=[...qg,...rd.filter(n=>["X","Y","Z"].some(t=>n.endsWith(t)))],bL=Wn&&(Zt(CSS)||!Object.hasOwnProperty.call(CSS,"registerProperty"));var wg={_head:null,_tail:null},wT=(n,t,e)=>{let i=wg._head;for(;i;){let s=i._next,r=i.$el===n,o=!t||i.property===t,a=!e||i.parent===e;if(r&&o&&a){let l=i.animation;try{l.commitStyles()}catch{}l.cancel(),ki(wg,i);let c=i.parent;c&&(c._completed++,c.animations.length===c._completed&&(c.completed=!0,c.muteCallbacks||(c.paused=!0,c.onComplete(c),c._resolve(c))))}i=s}};var AT=(n=Je)=>new $l({duration:1*ve.timeScale,onComplete:n},null,0).resume();function CT(n,t,e){let i=ld(n);if(!i.length)return;let[s]=i,r=cd(s,t),o=dd(t,s,r),a=Rr(s,o);if(Zt(e))return a;if(Cn(a,fn),fn.t===Jt.NUMBER||fn.t===Jt.UNIT){if(e===!1)return fn.n;{let l=Yg(s,fn,e,!1);return`${_e(l.n,ve.precision)}${l.u}`}}}var RT=(n,t)=>{if(!Zt(t))return t.duration=oe,t.composition=ze(t.composition,Ye.none),new Zl(n,t,null,0,!0).resume()},Ag=(n,t,e)=>{let i=!1;return Me(t,s=>{let r=s.target;if(n.includes(r)){let o=s.property,a=s._tweenType,l=dd(e,r,a);(!l||l&&l===o)&&(s.parent._tail===s&&s._tweenType===ge.TRANSFORM&&s._prev&&s._prev._tweenType===ge.TRANSFORM&&(s._prev._renderTransforms=1),ki(t,s),Gg(s),i=!0)}},!0),i},$g=(n,t,e)=>{let i=kg(n),s=t||Ae,r=t&&t.controlAnimation&&t;for(let a=0,l=i.length;a<l;a++){let c=i[a];wT(c,e,r)}let o;if(s._hasChildren){let a=0;Me(s,l=>{if(!l._hasChildren)if(o=Ag(i,l,e),o&&!l._head)l.cancel(),ki(s,l);else{let h=l._offset+l._delay+l.duration;h>a&&(a=h)}l._head?$g(n,l,e):l._hasChildren=!1},!0),Zt(s.iterationDuration)||(s.iterationDuration=a)}else o=Ag(i,s,e);return o&&!s._head&&(s._hasChildren=!1,s.cancel&&s.cancel()),i},pd=(n,t,e)=>{let i=10**(e||0);return vo((Math.random()*(t-n+1/i)+n)*i)/i},PT=n=>n[pd(0,n.length-1)],IT=n=>{let t=n.length,e,i;for(;t;)i=pd(0,--t),e=n[t],n[t]=n[i],n[i]=e;return n},DT=(n,t)=>(+n).toFixed(t),LT=(n,t,e)=>`${n}`.padStart(t,e),UT=(n,t,e)=>`${n}`.padEnd(t,e),NT=(n,t,e)=>((n-t)%(e-t)+(e-t))%(e-t)+t,FT=(n,t,e,i,s)=>i+(n-t)/(e-t)*(s-i),OT=n=>n*So/180,BT=n=>n*180/So,zT=(n,t,e,i)=>{let s=ps/ve.defaults.frameRate;if(i!==!1){let o=i||Ae._hasChildren&&Ae;o&&o.deltaTime&&(s=o.deltaTime)}let r=1-Math.exp(-e*s*.1);return e?e===1?t:(1-r)*n+r*t:n},VT=(n,t=0)=>(...e)=>t?i=>n(...e,i):i=>n(i,...e),Zg=n=>(...t)=>{let e=n(...t);return new Proxy(Je,{apply:(i,s,[r])=>e(r),get:(i,s)=>Zg((...r)=>{let o=kT[s](...r);return a=>o(e(a))})})},An=(n,t=0)=>(...e)=>(e.length<n.length?Zg(VT(n,t)):n)(...e),kT={$:ld,get:CT,set:RT,remove:$g,cleanInlineStyles:fd,random:pd,randomPick:PT,shuffle:IT,lerp:zT,sync:AT,clamp:An(De),round:An(_e),snap:An(nT),wrap:An(NT),interpolate:An(zi,1),mapRange:An(FT),roundPad:An(DT),padStart:An(LT),padEnd:An(UT),degToRad:An(OT),radToDeg:An(BT)},HT=(n,t)=>{if(fs(t,"<")){let e=t[1]==="<",i=n._tail,s=i?i._offset+i._delay:0;return e?s:s+i.duration}},GT=(n,t)=>{let e=n.iterationDuration;if(e===oe&&(e=0),Zt(t))return e;if(od(+t))return+t;let i=t,s=n?n.labels:null,r=!kl(s),o=HT(n,i),a=!Zt(o),l=$b.exec(i);if(l){let c=l[0],h=i.split(c),u=r&&h[0]?s[h[0]]:e,d=a?o:r?u:e,p=+h[1];return td(d,p,c[0])}else return a?o:r?Zt(s[i])?e:s[i]:e};var Kg=(n,t={})=>{let e=[],i=0,s=t.from,r=t.reversed,o=t.ease,a=!Zt(o),c=a&&!Zt(o.ease)?o.ease:a?id(o):null,h=t.grid,u=t.axis,d=Zt(s)||s===0||s==="first",p=s==="center",g=s==="last",_=ms(n),m=ds(_?n[0]:n),f=_?ds(n[1]):0,T=Ig.exec((_?n[1]:n)+Vi),v=t.start||0+(_?m:0),M=d?0:od(s)?s:0;return(P,w,R,I)=>{if(p&&(M=(R-1)/2),g&&(M=R-1),!e.length){for(let W=0;W<R;W++){if(!h)e.push(yo(M-W));else{let Y=p?(h[0]-1)/2:M%h[0],B=p?(h[1]-1)/2:vo(M/h[0]),N=W%h[0],C=vo(W/h[0]),O=Y-N,A=B-C,L=Bg(O*O+A*A);u==="x"&&(L=-O),u==="y"&&(L=-A),e.push(L)}i=eT(...e)}c&&(e=e.map(W=>c(W/i)*i)),r&&(e=e.map(W=>u?W<0?W*-1:-W:yo(i-W)))}let S=_?(f-m)/i:m,D=(I?GT(I,Zt(t.start)?I.iterationDuration:v):v)+(S*_e(e[w],2)||0);return t.modifier&&(D=t.modifier(D)),T&&(D=`${D}${T[2]}`),D}};var WT=matchMedia("(prefers-reduced-motion: reduce)").matches;function Jg(n,t){let e=n.getContext("2d"),i=0,s=0,r=Math.min(devicePixelRatio,2);function o(){let A=n.getBoundingClientRect();i=A.width,s=A.height,n.width=i*r,n.height=s*r,e.setTransform(r,0,0,r,0,0)}o(),new ResizeObserver(o).observe(n);let a="#2A2A2F",l="#6E6D68",c="#A6A49E",h="#FF6369",u="#8E2E32",d={idle:{x:.14,y:.5,label:"idle"},drive:{x:.34,y:.5,label:"driving"},human:{x:.52,y:.26,label:"human detected"},zone:{x:.7,y:.26,label:"slow zone"},exit:{x:.7,y:.74,label:"zone exit"}},p={start:{x:.24,y:.5,label:"start"},detect:{x:.43,y:.4,label:"detect human"},clear:{x:.61,y:.26,label:"zone clearance"},resume:{x:.61,y:.62,label:"resume speed"},complete:{x:.86,y:.62,label:"mission complete"},dev:{x:.52,y:.74,label:"clearance skipped",dev:!0}};function g(A){return{x:A.x*i,y:A.y*s}}let _=[["idle","T:start",null,700],["T:start","drive",null,700],["drive","T:detect",{cy:-.1},650],["T:detect","human",null,650],["human","T:clear",null,550],["T:clear","zone",null,550],["zone","T:resume",{cx:.79},650],["T:resume","exit",null,650],["exit","T:complete",{cy:.82},800],["T:complete","idle",{cy:1.02},900]],m=[["drive","T:dev",{cy:.68},600],["T:dev","exit",null,600]],f={};function T(){e.clearRect(0,0,i,s),e.fillStyle="#141416";for(let L=24;L<i;L+=44)for(let V=24;V<s;V+=44)e.fillRect(L,V,1.4,1.4);let A=[["idle","T:start",null,a],["T:start","drive",null,a],["drive","T:detect",{cy:-.1},a],["T:detect","human",null,a],["human","T:clear",null,a],["T:clear","zone",null,a],["zone","T:resume",{cx:.79},a],["T:resume","exit",null,a],["exit","T:complete",{cy:.82},a],["T:complete","idle",{cy:1.02},a],["drive","T:dev",{cy:.68},u],["T:dev","exit",null,u]];for(let[L,V,X,Q]of A){let rt=g(M(L)),H=g(M(V)),$,it;X&&X.cy!=null?($=(rt.x+H.x)/2,it=X.cy*s):X&&X.cx!=null?($=X.cx*i,it=(rt.y+H.y)/2):($=(rt.x+H.x)/2,it=(rt.y+H.y)/2),e.strokeStyle=Q,e.lineWidth=1,e.setLineDash(Q===u?[4,5]:[]),e.beginPath(),e.moveTo(rt.x,rt.y),e.quadraticCurveTo($,it,H.x,H.y),e.stroke(),e.setLineDash([])}e.font='10px "IBM Plex Mono", monospace';for(let[L,V]of Object.entries(p)){let X=g(V),Q=f[L]||0,rt=V.dev?u:a;e.fillStyle=Q>0?`rgba(255,99,105,${.25+Q*.7})`:"#17171A",e.strokeStyle=V.dev?u:"#3A3A40",v(X.x,X.y,5,16),e.fillStyle="#17171A",Q>0&&(e.save(),e.shadowColor=h,e.shadowBlur=14*Q,v(X.x,X.y,5,16),e.restore()),e.fillStyle=V.dev?"#7a4a4c":l,e.textAlign="center",e.fillText(V.label.toUpperCase(),X.x,X.y+30)}for(let[L,V]of Object.entries(d)){let X=g(V),Q=f[L]||0;e.beginPath(),e.arc(X.x,X.y,17,0,Math.PI*2),e.fillStyle="#0E0E10",e.fill(),e.strokeStyle=Q>0?`rgba(255,99,105,${.5+Q*.5})`:"#3A3A40",e.lineWidth=1.2,e.stroke(),Q>0&&(e.save(),e.strokeStyle=`rgba(255,99,105,${.35*Q})`,e.lineWidth=2,e.beginPath(),e.arc(X.x,X.y,17+8*(1-Q),0,Math.PI*2),e.stroke(),e.restore()),e.fillStyle=l,e.textAlign="center",e.fillText(V.label.toUpperCase(),X.x,X.y+34)}}function v(A,L,V,X){e.beginPath(),e.roundRect(A-V,L-X,V*2,X*2,2),e.fill(),e.stroke()}let M=A=>A.startsWith("T:")?p[A.slice(2)]:d[A.slice(0)],P={x:0,y:0,dev:!1,visible:!1};function w(A,L,V,X){let Q=g(A),rt=g(L),H,$;V&&V.cy!=null?(H=(Q.x+rt.x)/2,$=V.cy*s):V&&V.cx!=null?(H=V.cx*i,$=(Q.y+rt.y)/2):(H=(Q.x+rt.x)/2,$=(Q.y+rt.y)/2);let it=1-X;return{x:it*it*Q.x+2*it*X*H+X*X*rt.x,y:it*it*Q.y+2*it*X*$+X*X*rt.y}}function R(A){f[A]=1,bo(f,{[A]:0},{duration:700,ease:"outQuad"})}let I=412,S=["14:02:11","14:02:47","14:03:29"];function y(){let A=document.createElement("div");A.className="deviation-chip";let L=I++,V=S[L%S.length];for(A.innerHTML=`<span class="dot"></span>sealed event #${L}: zone clearance skipped \xB7 ${V}`,t.appendChild(A),bo(A,{opacity:[0,1],translateY:[-8,0],duration:420,ease:"outQuad"});t.children.length>3;)t.firstChild.remove()}let D=0,W=!1;function Y(A,L){let V=0;function X(){if(W)return;if(V>=A.length){L();return}let[Q,rt,H,$]=A[V];R((Q.startsWith("T:"),Q)),Q.startsWith("T:")&&R(Q);let it=performance.now();P.visible=!0,P.dev=rt==="exit"&&Q==="T:dev",P.dev=A===m;function et(ct){if(W)return;let ut=Math.min(1,(ct-it)/$),Tt=1-Math.pow(1-ut,2.2),Ot=w(M(Q),M(rt),H,Tt);P.x=Ot.x,P.y=Ot.y,ut<1?requestAnimationFrame(et):(R(rt),V++,P.dev&&rt==="exit"&&y(),setTimeout(X,260))}requestAnimationFrame(et)}X()}function B(){P.visible&&(e.beginPath(),e.arc(P.x,P.y,5,0,Math.PI*2),e.fillStyle=P.dev?h:"#EDECE8",e.shadowColor=P.dev?h:"rgba(240,240,235,0.8)",e.shadowBlur=10,e.fill(),e.shadowBlur=0)}function N(){D++;let A=D%3===0,L=A?m:_;if(A){let V=_.slice(0,2),X=_.slice(7);Y(V,()=>{Y(m,()=>{Y(X,()=>setTimeout(N,900))})})}else Y(_,()=>setTimeout(N,900))}let C=!0;new IntersectionObserver(([A])=>{C=A.isIntersecting},{threshold:.05}).observe(n);function O(){T(),B(),requestAnimationFrame(O)}if(WT){T();return}requestAnimationFrame(O),(function A(){C&&!document.hidden?N():setTimeout(A,300)})()}var Qg=[{time:"13:58:02",payload:"agent v0.9.3 online, fleet B"},{time:"13:59:10",payload:"config speed_limit zone_B = 1.2 m/s"},{time:"14:01:58",payload:"intervention: operator r.rossi raised speed_limit zone_B to 1.8 m/s (remote)"},{time:"14:02:09",payload:"safety: protective stop near human, aisle 7"},{time:"14:02:10",payload:"state: velocity reached 0.0 m/s in 0.4 s"},{time:"14:04:33",payload:"mission: resumed mission 217"},{time:"14:31:02",payload:"config speed_limit zone_B restored 1.2 m/s"},{time:"14:31:05",payload:"upload: bundle sealed, Merkle root 9f3c41"}],XT="intervention: system auto-tuned speed_limit zone_B to 1.8 m/s",YT=2,qT=5;async function jg(n){let t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return[...new Uint8Array(t)].map(e=>e.toString(16).padStart(2,"0")).join("")}async function t0(){let n=document.getElementById("event-log"),t=document.getElementById("status-dot"),e=document.getElementById("status-text"),i=document.getElementById("sealed-panel"),s=document.getElementById("btn-edit"),r=document.getElementById("btn-delete"),o=document.getElementById("btn-restore"),a=document.getElementById("btn-verify"),l=[],c="genesis";for(let T of Qg)c=await jg(c+T.payload),l.push(c);let h=!1,u=!1,d=[];function p(){d.length=0,Qg.forEach((T,v)=>{d.push({seq:v+1,time:T.time,payload:u&&v===YT?XT:T.payload,deleted:h&&v===qT,sealedHash:l[v]})})}function g(){p(),n.innerHTML="",d.forEach((T,v)=>{let M=document.createElement("li");M.className="event-row"+(T.deleted?" deleted":""),M.innerHTML=`
        <span class="ev-seq">${String(T.seq).padStart(2,"0")}</span>
        <span class="ev-time">${T.time}</span>
        <span class="ev-payload">${T.deleted?"[missing event: sequence break]":_(T.payload)}</span>
        <span class="ev-hash">${T.sealedHash.slice(0,12)}</span>`,n.appendChild(M)})}let _=T=>T.replace(/[<>&]/g,v=>({"<":"&lt;",">":"&gt;","&":"&amp;"})[v]);async function m(){let T="genesis",v=!1,M=[...n.children];for(let P=0;P<d.length;P++){let w=d[P],R=M[P];if(w.deleted){v=!0,R.classList.add("bad");continue}if(v){R.classList.remove("ok"),R.classList.add("bad");continue}let I=await jg(T+w.payload);I===w.sealedHash?(R.classList.add("ok"),T=I):(v=!0,R.classList.add("bad"))}v?(t.classList.add("broken"),e.textContent="Verification fails at the exact gap: the chain is broken",i.hidden=!1):(t.classList.remove("broken"),e.textContent="Chain intact - 8 events sealed",i.hidden=!0)}function f(){bo(".event-row",{opacity:[0,1],translateX:[-14,0],duration:480,delay:Kg(55),ease:"outQuad"})}s.addEventListener("click",()=>{u=!u,s.textContent=u?"Undo edit 03":"Edit event 03",g(),m()}),r.addEventListener("click",()=>{h=!h,r.textContent=h?"Restore event 06":"Delete event 06",g(),m()}),o.addEventListener("click",()=>{u=!1,h=!1,s.textContent="Edit event 03",r.textContent="Delete event 06",g(),m()}),a.addEventListener("click",m),g(),f(),await m()}function e0(n,t){let e=document.createElement("canvas");e.id="hero-canvas",e.setAttribute("aria-hidden","true"),t&&t.parentNode?t.replaceWith(e):n.prepend(e);let i=e.getContext("2d"),s=matchMedia("(prefers-reduced-motion: reduce)").matches,r="229,72,77",o=0,a=0,l=Math.min(devicePixelRatio||1,2),c=120,h=0,u=0,d=0,p=0,g=0,_=0,m=0,f=0;s||addEventListener("pointermove",B=>{g=(B.clientX/innerWidth-.5)*2,_=(B.clientY/innerHeight-.5)*2},{passive:!0});function T(){let B=e.getBoundingClientRect();o=B.width,a=B.height,e.width=Math.round(o*l),e.height=Math.round(a*l),i.setTransform(l,0,0,l,0,0);let N=o/a>1.05;c=N?Math.min(o*.125,a*.2,190):Math.min(o*.38,a*.185,165),h=N?o*.65:o*.56,u=N?a*.74:a*.78}T(),new ResizeObserver(T).observe(e);function v(B,N,C){return[(B-C)*.866*c+h+d*26+Math.sin(m*.35)*5,((B+C)*.5-N)*c+u+p*14]}let M=.56;function P(B,N,C){return[(B-C)*.866*c+h+d*26+Math.sin(m*.35)*5,((B+C)*.5-N*M)*c+u+p*14]}function w(B,N,C,O,A){i.beginPath(),i.moveTo(B[0][0],B[0][1]);for(let L=1;L<B.length;L++)i.lineTo(B[L][0],B[L][1]);i.closePath(),N&&(i.fillStyle=N,i.fill()),C&&(i.save(),O&&(i.shadowColor=`rgba(${r},0.95)`,i.shadowBlur=O),i.strokeStyle=C,i.lineWidth=A||1.6,i.stroke(),i.restore())}function R(B,N,C,O,A,L,V,X){X=X||v;let Q=B-O/2,rt=B+O/2,H=C-L/2,$=C+L/2,it=N,et=N+A,ct=[X(Q,et,H),X(rt,et,H),X(rt,et,$),X(Q,et,$)];if(w(ct,V.top,V.stroke,V.glow,V.lw),V.sheen){i.save(),i.beginPath(),i.moveTo(ct[0][0],ct[0][1]);for(let U=1;U<4;U++)i.lineTo(ct[U][0],ct[U][1]);i.closePath(),i.clip();let[ut,Tt]=ct[0],[Ot,ht]=ct[2],ft=i.createLinearGradient(ut,Tt,Ot,ht);ft.addColorStop(0,"rgba(255,255,255,0.24)"),ft.addColorStop(.5,"rgba(255,255,255,0.02)"),ft.addColorStop(1,"rgba(0,0,0,0.15)"),i.fillStyle=ft,i.fillRect(Math.min(ut,Ot)-400,Math.min(Tt,ht)-400,900,900),i.restore()}w([X(rt,it,H),X(rt,it,$),X(rt,et,$),X(rt,et,H)],V.right,V.stroke,0),w([X(Q,it,$),X(rt,it,$),X(rt,et,$),X(Q,et,$)],V.front,V.stroke,0)}function I(B,N,C,O,A,L,V,X){X=X||v;let[Q,rt]=X(B,N,C);i.beginPath(),i.ellipse(Q,rt,O*1.2247*c,O*.7071*c,0,0,Math.PI*2),A&&(i.fillStyle=A,i.fill()),L&&(i.save(),V&&(i.shadowColor=`rgba(${r},0.95)`,i.shadowBlur=V),i.strokeStyle=L,i.lineWidth=1.8,i.stroke(),i.restore())}let S=[];for(let B=0;B<6;B++){let N=B/6*Math.PI*1.5-.4;S.push({x:Math.cos(N)*.62,z:Math.sin(N)*.62,y:1.95+B*.72,phase:B*1.1})}let y=[];for(let B=0;B<90;B++)y.push({t:Math.random(),sp:.05+Math.random()*.06});function D(){i.clearRect(0,0,o,a);let B=i.createRadialGradient(h,u-c*2,0,h,u-c*2,c*5);B.addColorStop(0,`rgba(${r},0.15)`),B.addColorStop(1,`rgba(${r},0)`),i.fillStyle=B,i.fillRect(0,0,o,a);let N=i.createRadialGradient(h,u,0,h,u,c*4.6);N.addColorStop(0,"rgba(190,196,214,0.14)"),N.addColorStop(1,"rgba(190,196,214,0)"),i.save(),i.translate(h,u),i.scale(1,.5),i.fillStyle=N,i.beginPath(),i.arc(0,0,c*4.6,0,Math.PI*2),i.fill(),i.restore(),i.save(),i.strokeStyle="rgba(165,170,186,0.24)",i.lineWidth=1;for(let ht=-8;ht<=8;ht++){let ft=v(ht,0,-8),U=v(ht,0,8);i.beginPath(),i.moveTo(ft[0],ft[1]),i.lineTo(U[0],U[1]),i.stroke();let $t=v(-8,0,ht),Ct=v(8,0,ht);i.beginPath(),i.moveTo($t[0],$t[1]),i.lineTo(Ct[0],Ct[1]),i.stroke()}i.restore();let C=.7+f*4.6;I(0,.01,0,C,null,`rgba(${r},${.6*(1-f)})`,16);let O=Math.sin(m*1.8)*.012;for(let[ht,ft]of[[-.82,.56],[.82,.56],[-.82,-.56],[.82,-.56]])R(ht,O,ft,.5,.3,.2,{top:"#2a2d35",right:"#191c22",front:"#13161a",stroke:"rgba(255,255,255,0.12)"});R(0,.16+O,0,2.3,.66,1.4,{top:"#9aa2b3",right:"#484d58",front:"#333844",stroke:`rgba(${r},0.95)`,glow:14,lw:2,sheen:!0}),i.save(),i.shadowColor=`rgba(${r},1)`,i.shadowBlur=16,i.strokeStyle="rgba(255,110,116,1)",i.lineWidth=2.8;for(let ht of[-.7,.7]){let ft=v(-1.15,.84+O,ht),U=v(1.15,.84+O,ht);i.beginPath(),i.moveTo(ft[0],ft[1]),i.lineTo(U[0],U[1]),i.stroke()}i.restore(),i.save(),i.shadowColor="rgba(255,99,105,1)",i.shadowBlur=20,i.strokeStyle="#ff6b70",i.lineWidth=4;let A=v(1.16,.34+O,-.48),L=v(1.16,.34+O,.48);i.beginPath(),i.moveTo(A[0],A[1]),i.lineTo(L[0],L[1]),i.stroke(),i.restore();let V=.82+O;I(.78,V,0,.17,"#20232a","rgba(255,255,255,0.16)"),I(.78,V+.14,0,.21,"#2b2f38",`rgba(${r},0.8)`,10);let[X,Q]=v(.78,V+.16,0),rt=m*2.2;i.beginPath(),i.moveTo(X,Q),i.lineTo(X+Math.cos(rt)*.21*1.2247*c,Q+Math.sin(rt)*.21*.7071*c),i.strokeStyle="rgba(255,110,116,0.95)",i.shadowColor="rgba(255,99,105,0.9)",i.shadowBlur=10,i.lineWidth=2,i.stroke(),i.shadowBlur=0,R(-.62,.82+O,0,.74,.54,.64,{top:"#4a505b",right:"#252a32",front:"#1b1f26",stroke:"rgba(255,99,105,1)",glow:12,lw:1.8});let[H,$]=v(-.62,1.38+O,0),it=i.createRadialGradient(H,$,0,H,$,c*.62);it.addColorStop(0,"rgba(255,99,105,0.55)"),it.addColorStop(1,"rgba(255,99,105,0)"),i.fillStyle=it,i.fillRect(H-c,$-c,c*2,c*2),I(-.62,1.38+O,0,.18,"rgba(255,84,90,1)","rgba(255,190,192,0.95)",20);let et=S.map((ht,ft)=>({...ht,i:ft,yy:ht.y+Math.sin(m*1.4+ht.phase)*.09})).sort((ht,ft)=>ht.x+ht.z-(ft.x+ft.z));for(let ht of et){let ft=S[ht.i-1];if(ft){let U=P(ht.x,ht.yy,ht.z),$t=P(ft.x,ft.y,ft.z);i.beginPath(),i.moveTo(U[0],U[1]),i.lineTo($t[0],$t[1]),i.strokeStyle="rgba(255,99,105,0.7)",i.lineWidth=1.8,i.shadowColor="rgba(255,99,105,0.7)",i.shadowBlur=8,i.stroke(),i.shadowBlur=0}R(ht.x,ht.yy,ht.z,.52,.52,.52,{top:"#5e6570",right:"#282d35",front:"#1c2027",stroke:"rgba(255,99,105,1)",glow:16,lw:1.8,sheen:!0},P)}i.save(),i.globalCompositeOperation="lighter";let ct=v(-.35,1,0),ut=v(-1,2.2,.5),Tt=v(-.1,3.6,-.45),Ot=P(S[5].x,S[5].y+.4,S[5].z);for(let ht of y){s||(ht.t=(ht.t+ht.sp*.016)%1);let ft=ht.t,U=1-ft,$t=U*U*U*ct[0]+3*U*U*ft*ut[0]+3*U*ft*ft*Tt[0]+ft*ft*ft*Ot[0],Ct=U*U*U*ct[1]+3*U*U*ft*ut[1]+3*U*ft*ft*Tt[1]+ft*ft*ft*Ot[1];i.fillStyle=ht.t>.7?"rgba(255,130,135,0.95)":"rgba(255,205,205,0.7)",i.beginPath(),i.arc($t,Ct,1.9,0,Math.PI*2),i.fill()}i.restore()}let W=!0;new IntersectionObserver(([B])=>{W=B.isIntersecting},{threshold:.02}).observe(e);function Y(){m+=.016,f=(f+.0065)%1,d+=(g-d)*.06,p+=(_-p)*.06,D()}if(s)m=1.2,f=.3,D();else{let B=()=>{W&&!document.hidden&&Y(),requestAnimationFrame(B)};requestAnimationFrame(B)}}function n0(n,t,e){let i=document.createElement("canvas");i.id="explode-canvas",i.setAttribute("aria-hidden","true"),t&&t.parentNode?t.replaceWith(i):n.querySelector(".pipeline-sticky").prepend(i);let s=i.getContext("2d"),r=matchMedia("(prefers-reduced-motion: reduce)").matches,o="229,72,77",a=0,l=0,c=Math.min(devicePixelRatio||1,2),h=100,u=0,d=0;function p(){let C=i.getBoundingClientRect();a=C.width,l=C.height,i.width=Math.round(a*c),i.height=Math.round(l*c),s.setTransform(c,0,0,c,0,0),h=Math.min(a*.185,l*.115,148),u=a*.5,d=l*.7}p(),new ResizeObserver(p).observe(i);let g=0,_=0,m=0;function f(C,O,A){return[(C-A)*.866*h+u,((C+A)*.5-O)*h+d]}function T(C,O,A,L,V){V!==void 0&&(s.globalAlpha=V),s.beginPath(),s.moveTo(C[0][0],C[0][1]);for(let X=1;X<C.length;X++)s.lineTo(C[X][0],C[X][1]);s.closePath(),O&&(s.fillStyle=O,s.fill()),A&&(s.save(),L&&(s.shadowColor=`rgba(${o},0.9)`,s.shadowBlur=L),s.strokeStyle=A,s.lineWidth=1.4,s.stroke(),s.restore()),s.globalAlpha=1}function v(C,O,A,L,V,X,Q,rt){let H=C-L/2,$=C+L/2,it=A-X/2,et=A+X/2,ct=O,ut=O+V;T([f(H,ut,it),f($,ut,it),f($,ut,et),f(H,ut,et)],Q.top,Q.stroke,Q.glow,rt),T([f($,ct,it),f($,ct,et),f($,ut,et),f($,ut,it)],Q.right,Q.stroke,0,rt),T([f(H,ct,et),f($,ct,et),f($,ut,et),f(H,ut,et)],Q.front,Q.stroke,0,rt)}function M(C,O,A,L,V,X,Q,rt){rt!==void 0&&(s.globalAlpha=rt);let[H,$]=f(C,O,A);s.beginPath(),s.ellipse(H,$,L*1.2247*h,L*.7071*h,0,0,Math.PI*2),V&&(s.fillStyle=V,s.fill()),X&&(s.save(),Q&&(s.shadowColor=`rgba(${o},0.9)`,s.shadowBlur=Q),s.strokeStyle=X,s.lineWidth=1.4,s.stroke(),s.restore()),s.globalAlpha=1}let P=[3.1,1.9,1.05,.45,0];function w(C,O,A){return O+P[C]*A}let R=[...e.querySelectorAll(".chip")],I=[...n.querySelectorAll(".step")],S=-1;function y(C){C===S||C<0||(S=C,I.forEach(O=>O.classList.toggle("active",+O.dataset.layer===C)),R.forEach(O=>O.classList.toggle("active",+O.dataset.layer===C)))}if(r)y(1);else{let C=new IntersectionObserver(O=>{for(let A of O)A.isIntersecting&&y(+A.target.dataset.layer)},{rootMargin:"-42% 0px -42% 0px"});I.forEach(O=>C.observe(O))}function D(C,O,A){let L=S<0||S===C?1:.2,V=(C%2===0?-1:1)*A*.3,X=w(C,O,A),Q=`rgba(${o},${.9*L})`,rt=L;if(C===4)v(V,X,0,2.5,.55,1.9,{top:"#2c2f37",right:"#1a1c22",front:"#14161b",stroke:Q,glow:6},rt),M(V-.6,X+.56,0,.55,`rgba(120,124,138,${.55*L})`,`rgba(255,255,255,${.12*L})`,0,rt),M(V+.6,X+.56,0,.55,null,`rgba(${o},${.6*L})`,10,rt);else if(C===3)v(V,X,0,1.5,.26,1.1,{top:"#23262d",right:"#171920",front:"#121419",stroke:Q,glow:5},rt),v(V,X+.26,0,.4,.09,.4,{top:`rgba(20,22,27,${L})`,right:"#0e1013",front:"#0a0c0f",stroke:`rgba(160,130,70,${.5*L})`},rt);else if(C===2){v(V,X,0,2,.34,1.3,{top:"#2a2c34",right:"#191b21",front:"#121419",stroke:Q,glow:6},rt);for(let H=0;H<5;H++){let $=V-.68+H*.34;v($,X+.34,0,.24,.24,.24,{top:`rgba(30,33,40,${L})`,right:"#14161b",front:"#0f1115",stroke:`rgba(255,99,105,${.85*L})`,glow:8},rt)}}else if(C===1){v(V,X,0,2.25,.18,1.65,{top:"#30333b",right:"#1d1f25",front:"#16181d",stroke:Q,glow:5},rt);for(let H=0;H<6;H++)M(V-.85+H*.34,X+.2,.4,.05,`rgba(140,144,158,${.6*L})`,null,0,rt)}else{v(V,X,0,1.15,.34,1.15,{top:"#262932",right:"#171920",front:"#121419",stroke:Q,glow:6},rt),M(V,X+.35,0,.17,`rgba(229,72,77,${.95*L})`,`rgba(255,170,173,${.9*L})`,18*L,rt);let[H,$]=f(V,X+.35,0),it=s.createRadialGradient(H,$,0,H,$,h*.7);it.addColorStop(0,`rgba(255,99,105,${.4*L})`),it.addColorStop(1,"rgba(255,99,105,0)"),s.fillStyle=it,s.fillRect(H-h,$-h,h*2,h*2)}}function W(){s.save(),s.strokeStyle="rgba(150,152,166,0.1)",s.lineWidth=1;for(let C=-5;C<=5;C++){let O=f(C,-.6,-5),A=f(C,-.6,5);s.beginPath(),s.moveTo(O[0],O[1]),s.lineTo(A[0],A[1]),s.stroke();let L=f(-5,-.6,C),V=f(5,-.6,C);s.beginPath(),s.moveTo(L[0],L[1]),s.lineTo(V[0],V[1]),s.stroke()}s.restore()}function Y(){s.clearRect(0,0,a,l),W();let C=[1.62,1.32,.98,.62,0];for(let O of[4,3,2,1,0])D(O,C[O],r?.3:_)}let B=!0;new IntersectionObserver(([C])=>{B=C.isIntersecting},{threshold:.02}).observe(i);function N(){g+=.016;let C=n.getBoundingClientRect(),O=C.height-innerHeight;m=O>0?Math.min(1,Math.max(0,-C.top/O)):0,_+=(m-_)*.1;let A=r?.3:_*_*(3-2*_);s.clearRect(0,0,a,l),W();let L=[1.62,1.32,.98,.62,0];for(let V of[4,3,2,1,0])D(V,L[V],A)}if(r)Y();else{let C=()=>{B&&!document.hidden&&N(),requestAnimationFrame(C)};requestAnimationFrame(C)}}var jl=matchMedia("(prefers-reduced-motion: reduce)").matches;function $T(){setTimeout(()=>{document.querySelectorAll(".hero h1, .hero-sub, .hero-ctas").forEach(n=>{parseFloat(getComputedStyle(n).opacity)<.99&&(n.style.animation="none",n.style.opacity="1",n.style.transform="none")})},1600)}function ZT(){jl||Ic(wc("#progress",{scaleX:[0,1],ease:"linear"}))}function KT(){if(jl)return;let n=[...document.querySelectorAll(".clause, .ledger-row, .tier, .stat, .fact, .quote-card, .demo-shell, .section-h")],t=new Set,e=i=>{t.has(i)||(t.add(i),i.style.transition="opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",i.style.opacity="1",i.style.transform="translateY(0)")};n.forEach(i=>{i.style.opacity="0",i.style.transform="translateY(24px)",Dc(i,()=>e(i),{amount:.25})}),setTimeout(()=>n.forEach(e),3200)}function JT(){let n=document.querySelectorAll("[data-count]"),t=i=>{let s=+i.dataset.count,r=i.dataset.prefix||"",o=i.dataset.suffix||"%";if(jl){i.textContent=r+s+o;return}let a=performance.now(),l=1400;function c(h){let u=Math.min(1,(h-a)/l),d=1-Math.pow(1-u,3);i.textContent=r+Math.round(s*d)+o,u<1&&requestAnimationFrame(c)}requestAnimationFrame(c)},e=new IntersectionObserver(i=>{i.forEach(s=>{s.isIntersecting&&(t(s.target),e.unobserve(s.target))})},{threshold:.6});n.forEach(i=>e.observe(i))}var QT=new Date("2027-01-20T00:00:00+01:00").getTime();function Ql(n){return String(n).padStart(2,"0")}function jT(){let n=document.getElementById("count-days"),t=document.getElementById("count-clock"),e=document.getElementById("cta-count");function i(){let s=Math.max(0,QT-Date.now()),r=Math.floor(s/864e5),o=Math.floor(s/36e5)%24,a=Math.floor(s/6e4)%60,l=Math.floor(s/1e3)%60;n&&(n.textContent=r),t&&(t.textContent=`${Ql(r)} : ${Ql(o)} : ${Ql(a)} : ${Ql(l)}`),e&&(e.textContent=`${r} days to go`)}i(),setInterval(i,1e3)}function t1(){if(jl)return;document.querySelectorAll(".magnetic").forEach(t=>{let e=0,i=0,s=0,r=0,o=0,a=.18;function l(){i+=(r-i)*.18,s+=(o-s)*.18,t.style.transform=`translate(${i}px, ${s}px)`,e=requestAnimationFrame(l)}t.addEventListener("pointermove",c=>{let h=t.getBoundingClientRect();r=(c.clientX-(h.left+h.width/2))*a,o=(c.clientY-(h.top+h.height/2))*a,e||(e=requestAnimationFrame(l))}),t.addEventListener("pointerleave",()=>{r=0,o=0,setTimeout(()=>{Math.abs(i)<.4&&Math.abs(s)<.4&&(cancelAnimationFrame(e),e=0,t.style.transform="",i=s=0)},350)})})}var md=!1,Eo=null,gd=null;function e1(){let n=document.getElementById("hero-canvas");if(!n)return 0;try{let t=document.createElement("canvas");t.width=72,t.height=45;let e=t.getContext("2d");e.drawImage(n,0,0,72,45);let i=e.getImageData(0,0,72,45).data,s=0;for(let r=0;r<i.length;r+=4)i[r]+i[r+1]+i[r+2]>60&&s++;return s}catch{return 0}}function To(n){if(!md){md=!0,console.warn("[sigillo] 2D renderer active:",n),document.documentElement.setAttribute("data-renderer","2d");try{Eo&&Eo.dispose()}catch{}try{gd&&gd.dispose()}catch{}try{e0(document.querySelector(".hero"),document.getElementById("hero-canvas"))}catch(t){console.error("[sigillo] fallback hero",t)}try{n0(document.querySelector(".pipeline"),document.getElementById("explode-canvas"),document.getElementById("layer-chips"))}catch(t){console.error("[sigillo] fallback explode",t)}}}function n1(){if(new URLSearchParams(location.search).get("renderer")==="2d"){To("forced by URL");return}let n=!1;if(i0())try{Eo=fg(document.getElementById("hero-canvas"),{onFatal:()=>To("webgl context lost")}),gd=pg(document.querySelector(".pipeline"),document.getElementById("explode-canvas"),document.getElementById("leader-lines"),document.getElementById("layer-chips")),n=!0}catch(e){console.error("[sigillo] webgl init failed",e)}if(!n){To(i0()?"webgl init failed":"webgl unavailable");return}document.documentElement.setAttribute("data-renderer","webgl");let t=e=>{setTimeout(()=>{if(md)return;if(document.visibilityState!=="visible"){e<6&&t(e+1);return}if((Eo?Eo.getFrames():0)<3){To("render loop idle");return}e1()<12&&To("blank canvas")},e===0?2200:1600)};t(0)}function i0(){try{let n=document.createElement("canvas");return!!(n.getContext("webgl2")||n.getContext("webgl"))}catch{return!1}}function ui(n,t){try{t()}catch(e){console.error("[sigillo]",n,e)}}function s0(){window.__sigilloBooted=!0,ui("progress",()=>ZT()),ui("reveals",()=>KT()),ui("heroSafety",()=>$T()),ui("counters",()=>JT()),ui("countdown",()=>jT()),ui("magnetic",()=>t1()),ui("3d",()=>n1()),ui("petri",()=>Jg(document.getElementById("petri-canvas"),document.getElementById("deviation-feed"))),ui("tamper",()=>t0())}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",s0):s0();})();
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
