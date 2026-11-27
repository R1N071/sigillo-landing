(()=>{function Ns(n,t,e){var i;if(n instanceof Element)return[n];if(typeof n=="string"){let s=document;t&&(s=t.current);let r=(i=e?.[n])!==null&&i!==void 0?i:s.querySelectorAll(n);return r?Array.from(r):[]}return Array.from(n)}var Ze=n=>n;var Ui=Ze,Bn=Ze;var Zn=(n,t,e)=>{let i=t-n;return i===0?1:(e-n)/i};function Fs(n){let t;return()=>(t===void 0&&(t=n()),t)}var Bo=Fs(()=>window.ScrollTimeline!==void 0);var zo=class{constructor(t){this.stop=()=>this.runAll("stop"),this.animations=t.filter(Boolean)}get finished(){return Promise.all(this.animations.map(t=>"finished"in t?t.finished:t))}getAll(t){return this.animations[0][t]}setAll(t,e){for(let i=0;i<this.animations.length;i++)this.animations[i][t]=e}attachTimeline(t,e){let i=this.animations.map(s=>{if(Bo()&&s.attachTimeline)return s.attachTimeline(t);if(typeof e=="function")return e(s)});return()=>{i.forEach((s,r)=>{s&&s(),this.animations[r].stop()})}}get time(){return this.getAll("time")}set time(t){this.setAll("time",t)}get speed(){return this.getAll("speed")}set speed(t){this.setAll("speed",t)}get startTime(){return this.getAll("startTime")}get duration(){let t=0;for(let e=0;e<this.animations.length;e++)t=Math.max(t,this.animations[e].duration);return t}runAll(t){this.animations.forEach(e=>e[t]())}flatten(){this.runAll("flatten")}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}};var Os=class extends zo{then(t,e){return Promise.all(this.animations).then(t).catch(e)}};var Ke=n=>n*1e3,dn=n=>n/1e3;function Bs(n){let t=0,e=50,i=n.next(t);for(;!i.done&&t<2e4;)t+=e,i=n.next(t);return t>=2e4?1/0:t}var Vo=(n,t,e=10)=>{let i="",s=Math.max(Math.round(t/e),2);for(let r=0;r<s;r++)i+=n(Zn(0,s-1,r))+", ";return`linear(${i.substring(0,i.length-2)})`};var sn=(n,t,e)=>e>t?t:e<n?n:e;function zs(n,t){return t?n*(1e3/t):0}var Yg=5;function ko(n,t,e){let i=Math.max(t-Yg,0);return zs(e-n(i),t-i)}var Ce={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};var lc=.001;function md({duration:n=Ce.duration,bounce:t=Ce.bounce,velocity:e=Ce.velocity,mass:i=Ce.mass}){let s,r;Ui(n<=Ke(Ce.maxDuration),"Spring duration must be 10 seconds or less");let o=1-t;o=sn(Ce.minDamping,Ce.maxDamping,o),n=sn(Ce.minDuration,Ce.maxDuration,dn(n)),o<1?(s=c=>{let h=c*o,u=h*n,d=h-e,p=Ho(c,o),g=Math.exp(-u);return lc-d/p*g},r=c=>{let u=c*o*n,d=u*e+e,p=Math.pow(o,2)*Math.pow(c,2)*n,g=Math.exp(-u),_=Ho(Math.pow(c,2),o);return(-s(c)+lc>0?-1:1)*((d-p)*g)/_}):(s=c=>{let h=Math.exp(-c*n),u=(c-e)*n+1;return-lc+h*u},r=c=>{let h=Math.exp(-c*n),u=(e-c)*(n*n);return h*u});let a=5/n,l=$g(s,r,a);if(n=Ke(n),isNaN(l))return{stiffness:Ce.stiffness,damping:Ce.damping,duration:n};{let c=Math.pow(l,2)*i;return{stiffness:c,damping:o*2*Math.sqrt(i*c),duration:n}}}var qg=12;function $g(n,t,e){let i=e;for(let s=1;s<qg;s++)i=i-n(i)/t(i);return i}function Ho(n,t){return n*Math.sqrt(1-t*t)}var Zg=["duration","bounce"],Kg=["stiffness","damping","mass"];function gd(n,t){return t.some(e=>n[e]!==void 0)}function Jg(n){let t={velocity:Ce.velocity,stiffness:Ce.stiffness,damping:Ce.damping,mass:Ce.mass,isResolvedFromDuration:!1,...n};if(!gd(n,Kg)&&gd(n,Zg))if(n.visualDuration){let e=n.visualDuration,i=2*Math.PI/(e*1.2),s=i*i,r=2*sn(.05,1,1-(n.bounce||0))*Math.sqrt(s);t={...t,mass:Ce.mass,stiffness:s,damping:r}}else{let e=md(n);t={...t,...e,mass:Ce.mass},t.isResolvedFromDuration=!0}return t}function Vs(n=Ce.visualDuration,t=Ce.bounce){let e=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:t}:n,{restSpeed:i,restDelta:s}=e,r=e.keyframes[0],o=e.keyframes[e.keyframes.length-1],a={done:!1,value:r},{stiffness:l,damping:c,mass:h,duration:u,velocity:d,isResolvedFromDuration:p}=Jg({...e,velocity:-dn(e.velocity||0)}),g=d||0,_=c/(2*Math.sqrt(l*h)),m=o-r,f=dn(Math.sqrt(l/h)),w=Math.abs(m)<5;i||(i=w?Ce.restSpeed.granular:Ce.restSpeed.default),s||(s=w?Ce.restDelta.granular:Ce.restDelta.default);let T;if(_<1){let I=Ho(f,_);T=A=>{let C=Math.exp(-_*f*A);return o-C*((g+_*f*m)/I*Math.sin(I*A)+m*Math.cos(I*A))}}else if(_===1)T=I=>o-Math.exp(-f*I)*(m+(g+f*m)*I);else{let I=f*Math.sqrt(_*_-1);T=A=>{let C=Math.exp(-_*f*A),P=Math.min(I*A,300);return o-C*((g+_*f*m)*Math.sinh(P)+I*m*Math.cosh(P))/I}}let y={calculatedDuration:p&&u||null,next:I=>{let A=T(I);if(p)a.done=I>=u;else{let C=0;_<1&&(C=I===0?Ke(g):ko(T,I,A));let P=Math.abs(C)<=i,M=Math.abs(o-A)<=s;a.done=P&&M}return a.value=a.done?o:A,a},toString:()=>{let I=Math.min(Bs(y),2e4),A=Vo(C=>y.next(I*C).value,I,30);return I+"ms "+A}};return y}function _d(n,t=100,e){let i=e({...n,keyframes:[0,t]}),s=Math.min(Bs(i),2e4);return{type:"keyframes",ease:r=>i.next(s*r).value/t,duration:dn(s)}}function Ni(n){return typeof n=="function"}var xd=(n,t,e)=>{let i=t-n;return((e-n)%i+i)%i+n};var Go=n=>Array.isArray(n)&&typeof n[0]!="number";function Wo(n,t){return Go(n)?n[xd(0,n.length,t)]:n}var Kn=(n,t,e)=>n+(t-n)*e;function Xo(n,t){let e=n[n.length-1];for(let i=1;i<=t;i++){let s=Zn(0,t,i);n.push(Kn(e,1,s))}}function ks(n){let t=[0];return Xo(t,n.length-1),t}var Re=n=>!!(n&&n.getVelocity);function Yr(n){return typeof n=="object"&&!Array.isArray(n)}function Yo(n,t,e,i){return typeof n=="string"&&Yr(t)?Ns(n,e,i):n instanceof NodeList?Array.from(n):Array.isArray(n)?n:[n]}function yd(n,t,e){return n*(t+1)}function hc(n,t,e,i){var s;return typeof t=="number"?t:t.startsWith("-")||t.startsWith("+")?Math.max(0,n+parseFloat(t)):t==="<"?e:(s=i.get(t))!==null&&s!==void 0?s:n}function vd(n,t){n.indexOf(t)===-1&&n.push(t)}function qo(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function Qg(n,t,e){for(let i=0;i<n.length;i++){let s=n[i];s.at>t&&s.at<e&&(qo(n,s),i--)}}function Sd(n,t,e,i,s,r){Qg(n,s,r);for(let o=0;o<t.length;o++)n.push({value:t[o],at:Kn(s,r,i[o]),easing:Wo(e,o)})}function Md(n,t){for(let e=0;e<n.length;e++)n[e]=n[e]/(t+1)}function bd(n,t){return n.at===t.at?n.value===null?1:t.value===null?-1:0:n.at-t.at}var jg="easeInOut",t0=20;function Ed(n,{defaultTransition:t={},...e}={},i,s){let r=t.duration||.3,o=new Map,a=new Map,l={},c=new Map,h=0,u=0,d=0;for(let p=0;p<n.length;p++){let g=n[p];if(typeof g=="string"){c.set(g,u);continue}else if(!Array.isArray(g)){c.set(g.name,hc(u,g.at,h,c));continue}let[_,m,f={}]=g;f.at!==void 0&&(u=hc(u,f.at,h,c));let w=0,T=(y,I,A,C=0,P=0)=>{let M=e0(y),{delay:v=0,times:N=ks(M),type:X="keyframes",repeat:Y,repeatType:J,repeatDelay:z=0,...L}=I,{ease:W=t.ease||"easeOut",duration:R}=I,D=typeof v=="function"?v(C,P):v,$=M.length,Z=Ni(X)?X:s?.[X];if($<=2&&Z){let j=100;if($===2&&s0(M)){let bt=M[1]-M[0];j=Math.abs(bt)}let lt={...L};R!==void 0&&(lt.duration=Ke(R));let ht=_d(lt,j,Z);W=ht.ease,R=ht.duration}R??(R=r);let tt=u+D;N.length===1&&N[0]===0&&(N[1]=1);let mt=N.length-M.length;if(mt>0&&Xo(N,mt),M.length===1&&M.unshift(null),Y){Bn(Y<t0,"Repeat count too high, must be less than 20"),R=yd(R,Y);let j=[...M],lt=[...N];W=Array.isArray(W)?[...W]:[W];let ht=[...W];for(let bt=0;bt<Y;bt++){M.push(...j);for(let St=0;St<j.length;St++)N.push(lt[St]+(bt+1)),W.push(St===0?"linear":Wo(ht,St-1))}Md(N,Y)}let V=tt+R;Sd(A,M,W,N,tt,V),w=Math.max(D+R,w),d=Math.max(V,d)};if(Re(_)){let y=Td(_,a);T(m,f,wd("default",y))}else{let y=Yo(_,m,i,l),I=y.length;for(let A=0;A<I;A++){m=m,f=f;let C=y[A],P=Td(C,a);for(let M in m)T(m[M],n0(f,M),wd(M,P),A,I)}}h=u,u+=w}return a.forEach((p,g)=>{for(let _ in p){let m=p[_];m.sort(bd);let f=[],w=[],T=[];for(let I=0;I<m.length;I++){let{at:A,value:C,easing:P}=m[I];f.push(C),w.push(Zn(0,d,A)),T.push(P||"easeOut")}w[0]!==0&&(w.unshift(0),f.unshift(f[0]),T.unshift(jg)),w[w.length-1]!==1&&(w.push(1),f.push(null)),o.has(g)||o.set(g,{keyframes:{},transition:{}});let y=o.get(g);y.keyframes[_]=f,y.transition[_]={...t,duration:d,ease:T,times:w,...e}}}),o}function Td(n,t){return!t.has(n)&&t.set(n,{}),t.get(n)}function wd(n,t){return t[n]||(t[n]=[]),t[n]}function e0(n){return Array.isArray(n)?n:[n]}function n0(n,t){return n&&n[t]?{...n,...n[t]}:{...n}}var i0=n=>typeof n=="number",s0=n=>n.every(i0);var di=new WeakMap;function $o(n,t){return n?n[t]||n.default||n:void 0}var Jn=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Sn=new Set(Jn);var Zo=new Set(["width","height","top","left","right","bottom",...Jn]);var Ad=n=>Array.isArray(n);var Cd=n=>Ad(n)?n[n.length-1]||0:n;var Hs={skipAnimations:!1,useManualTiming:!1};function Rd(n){let t=new Set,e=new Set,i=!1,s=!1,r=new WeakSet,o={delta:0,timestamp:0,isProcessing:!1};function a(c){r.has(c)&&(l.schedule(c),n()),c(o)}let l={schedule:(c,h=!1,u=!1)=>{let p=u&&i?t:e;return h&&r.add(c),p.has(c)||p.add(c),c},cancel:c=>{e.delete(c),r.delete(c)},process:c=>{if(o=c,i){s=!0;return}i=!0,[t,e]=[e,t],t.forEach(a),t.clear(),i=!1,s&&(s=!1,l.process(c))}};return l}var Ko=["read","resolveKeyframes","update","preRender","render","postRender"],r0=40;function Pd(n,t){let e=!1,i=!0,s={delta:0,timestamp:0,isProcessing:!1},r=()=>e=!0,o=Ko.reduce((f,w)=>(f[w]=Rd(r),f),{}),{read:a,resolveKeyframes:l,update:c,preRender:h,render:u,postRender:d}=o,p=()=>{let f=Hs.useManualTiming?s.timestamp:performance.now();e=!1,s.delta=i?1e3/60:Math.max(Math.min(f-s.timestamp,r0),1),s.timestamp=f,s.isProcessing=!0,a.process(s),l.process(s),c.process(s),h.process(s),u.process(s),d.process(s),s.isProcessing=!1,e&&t&&(i=!1,n(p))},g=()=>{e=!0,i=!0,s.isProcessing||n(p)};return{schedule:Ko.reduce((f,w)=>{let T=o[w];return f[w]=(y,I=!1,A=!1)=>(e||g(),T.schedule(y,I,A)),f},{}),cancel:f=>{for(let w=0;w<Ko.length;w++)o[Ko[w]].cancel(f)},state:s,steps:o}}var{schedule:Ne,cancel:fi,state:Fi,steps:Aw}=Pd(typeof requestAnimationFrame<"u"?requestAnimationFrame:Ze,!0);var Jo;function o0(){Jo=void 0}var Mn={now:()=>(Jo===void 0&&Mn.set(Fi.isProcessing||Hs.useManualTiming?Fi.timestamp:performance.now()),Jo),set:n=>{Jo=n,queueMicrotask(o0)}};var Gs=class{constructor(){this.subscriptions=[]}add(t){return vd(this.subscriptions,t),()=>qo(this.subscriptions,t)}notify(t,e,i){let s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](t,e,i);else for(let r=0;r<s;r++){let o=this.subscriptions[r];o&&o(t,e,i)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}};var Id=30,a0=n=>!isNaN(parseFloat(n)),Dd={current:void 0},uc=class{constructor(t,e={}){this.version="12.0.0",this.canTrackVelocity=null,this.events={},this.updateAndNotify=(i,s=!0)=>{let r=Mn.now();this.updatedAt!==r&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(i),this.current!==this.prev&&this.events.change&&this.events.change.notify(this.current),s&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.hasAnimated=!1,this.setCurrent(t),this.owner=e.owner}setCurrent(t){this.current=t,this.updatedAt=Mn.now(),this.canTrackVelocity===null&&t!==void 0&&(this.canTrackVelocity=a0(this.current))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return this.on("change",t)}on(t,e){this.events[t]||(this.events[t]=new Gs);let i=this.events[t].add(e);return t==="change"?()=>{i(),Ne.read(()=>{this.events.change.getSize()||this.stop()})}:i}clearListeners(){for(let t in this.events)this.events[t].clear()}attach(t,e){this.passiveEffect=t,this.stopPassiveEffect=e}set(t,e=!0){!e||!this.passiveEffect?this.updateAndNotify(t,e):this.passiveEffect(t,this.updateAndNotify)}setWithVelocity(t,e,i){this.set(e),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-i}jump(t,e=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,e&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return Dd.current&&Dd.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){let t=Mn.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||t-this.updatedAt>Id)return 0;let e=Math.min(this.updatedAt-this.prevUpdatedAt,Id);return zs(parseFloat(this.current)-parseFloat(this.prevFrameValue),e)}start(t){return this.stop(),new Promise(e=>{this.hasAnimated=!0,this.animation=t(e),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}};function pi(n,t){return new uc(n,t)}function Ld(n){let t=[{},{}];return n?.values.forEach((e,i)=>{t[0][i]=e.get(),t[1][i]=e.getVelocity()}),t}function Qo(n,t,e,i){if(typeof t=="function"){let[s,r]=Ld(i);t=t(e!==void 0?e:n.custom,s,r)}if(typeof t=="string"&&(t=n.variants&&n.variants[t]),typeof t=="function"){let[s,r]=Ld(i);t=t(e!==void 0?e:n.custom,s,r)}return t}function Ud(n,t,e){let i=n.getProps();return Qo(i,t,e!==void 0?e:i.custom,n)}function l0(n,t,e){n.hasValue(t)?n.getValue(t).set(e):n.addValue(t,pi(e))}function Nd(n,t){let e=Ud(n,t),{transitionEnd:i={},transition:s={},...r}=e||{};r={...r,...i};for(let o in r){let a=Cd(r[o]);l0(n,o,a)}}function Fd(n){return!!(Re(n)&&n.add)}function Od(n,t){let e=n.getValue("willChange");if(Fd(e))return e.add(t)}var Ws=n=>n.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase();var c0="framerAppearId",Bd="data-"+Ws(c0);function zd(n){return n.props[Bd]}var jo={current:!1};function dc(n,t){n.timeline=t,n.onfinish=null}var qr=n=>Array.isArray(n)&&typeof n[0]=="number";var Vd={linearEasing:void 0};function kd(n,t){let e=Fs(n);return()=>{var i;return(i=Vd[t])!==null&&i!==void 0?i:e()}}var Xs=kd(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing");function pc(n){return!!(typeof n=="function"&&Xs()||!n||typeof n=="string"&&(n in fc||Xs())||qr(n)||Array.isArray(n)&&n.every(pc))}var $r=([n,t,e,i])=>`cubic-bezier(${n}, ${t}, ${e}, ${i})`,fc={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:$r([0,.65,.55,1]),circOut:$r([.55,0,1,.45]),backIn:$r([.31,.01,.66,-.59]),backOut:$r([.33,1.53,.69,.99])};function mc(n,t){if(n)return typeof n=="function"&&Xs()?Vo(n,t):qr(n)?$r(n):Array.isArray(n)?n.map(e=>mc(e,t)||fc.easeOut):fc[n]}var Hd=(n,t,e)=>(((1-3*e+3*t)*n+(3*e-6*t))*n+3*t)*n,h0=1e-7,u0=12;function d0(n,t,e,i,s){let r,o,a=0;do o=t+(e-t)/2,r=Hd(o,i,s)-n,r>0?e=o:t=o;while(Math.abs(r)>h0&&++a<u0);return o}function Oi(n,t,e,i){if(n===t&&e===i)return Ze;let s=r=>d0(r,0,1,n,e);return r=>r===0||r===1?r:Hd(s(r),t,i)}var ta=n=>t=>t<=.5?n(2*t)/2:(2-n(2*(1-t)))/2;var ea=n=>t=>1-n(1-t);var gc=Oi(.33,1.53,.69,.99),Zr=ea(gc),na=ta(Zr);var ia=n=>(n*=2)<1?.5*Zr(n):.5*(2-Math.pow(2,-10*(n-1)));var sa=n=>1-Math.sin(Math.acos(n)),Gd=ea(sa),ra=ta(sa);var oa=n=>/^0[^.\s]+$/u.test(n);function Wd(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||oa(n):!0}var Qn={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},mi={...Qn,transform:n=>sn(0,1,n)},Kr={...Qn,default:1};var Bi=n=>Math.round(n*1e5)/1e5;var Ys=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Xd(n){return n==null}var Yd=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;var qs=(n,t)=>e=>!!(typeof e=="string"&&Yd.test(e)&&e.startsWith(n)||t&&!Xd(e)&&Object.prototype.hasOwnProperty.call(e,t)),aa=(n,t,e)=>i=>{if(typeof i!="string")return i;let[s,r,o,a]=i.match(Ys);return{[n]:parseFloat(s),[t]:parseFloat(r),[e]:parseFloat(o),alpha:a!==void 0?parseFloat(a):1}};var f0=n=>sn(0,255,n),_c={...Qn,transform:n=>Math.round(f0(n))},jn={test:qs("rgb","red"),parse:aa("red","green","blue"),transform:({red:n,green:t,blue:e,alpha:i=1})=>"rgba("+_c.transform(n)+", "+_c.transform(t)+", "+_c.transform(e)+", "+Bi(mi.transform(i))+")"};function p0(n){let t="",e="",i="",s="";return n.length>5?(t=n.substring(1,3),e=n.substring(3,5),i=n.substring(5,7),s=n.substring(7,9)):(t=n.substring(1,2),e=n.substring(2,3),i=n.substring(3,4),s=n.substring(4,5),t+=t,e+=e,i+=i,s+=s),{red:parseInt(t,16),green:parseInt(e,16),blue:parseInt(i,16),alpha:s?parseInt(s,16)/255:1}}var Jr={test:qs("#"),parse:p0,transform:jn.transform};var Qr=n=>({test:t=>typeof t=="string"&&t.endsWith(n)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${n}`}),ti=Qr("deg"),zi=Qr("%"),Gt=Qr("px"),qd=Qr("vh"),$d=Qr("vw"),xc={...zi,parse:n=>zi.parse(n)/100,transform:n=>zi.transform(n*100)};var Vi={test:qs("hsl","hue"),parse:aa("hue","saturation","lightness"),transform:({hue:n,saturation:t,lightness:e,alpha:i=1})=>"hsla("+Math.round(n)+", "+zi.transform(Bi(t))+", "+zi.transform(Bi(e))+", "+Bi(mi.transform(i))+")"};var ze={test:n=>jn.test(n)||Jr.test(n)||Vi.test(n),parse:n=>jn.test(n)?jn.parse(n):Vi.test(n)?Vi.parse(n):Jr.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?jn.transform(n):Vi.transform(n)};var Zd=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function m0(n){var t,e;return isNaN(n)&&typeof n=="string"&&(((t=n.match(Ys))===null||t===void 0?void 0:t.length)||0)+(((e=n.match(Zd))===null||e===void 0?void 0:e.length)||0)>0}var Jd="number",Qd="color",g0="var",_0="var(",Kd="${}",x0=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function us(n){let t=n.toString(),e=[],i={color:[],number:[],var:[]},s=[],r=0,a=t.replace(x0,l=>(ze.test(l)?(i.color.push(r),s.push(Qd),e.push(ze.parse(l))):l.startsWith(_0)?(i.var.push(r),s.push(g0),e.push(l)):(i.number.push(r),s.push(Jd),e.push(parseFloat(l))),++r,Kd)).split(Kd);return{values:e,split:a,indexes:i,types:s}}function jd(n){return us(n).values}function tf(n){let{split:t,types:e}=us(n),i=t.length;return s=>{let r="";for(let o=0;o<i;o++)if(r+=t[o],s[o]!==void 0){let a=e[o];a===Jd?r+=Bi(s[o]):a===Qd?r+=ze.transform(s[o]):r+=s[o]}return r}}var y0=n=>typeof n=="number"?0:n;function v0(n){let t=jd(n);return tf(n)(t.map(y0))}var bn={test:m0,parse:jd,createTransformer:tf,getAnimatableNone:v0};var S0=new Set(["brightness","contrast","saturate","opacity"]);function M0(n){let[t,e]=n.slice(0,-1).split("(");if(t==="drop-shadow")return n;let[i]=e.match(Ys)||[];if(!i)return n;let s=e.replace(i,""),r=S0.has(t)?1:0;return i!==e&&(r*=100),t+"("+r+s+")"}var b0=/\b([a-z-]*)\(.*?\)/gu,jr={...bn,getAnimatableNone:n=>{let t=n.match(b0);return t?t.map(M0).join(" "):n}};var ef={borderWidth:Gt,borderTopWidth:Gt,borderRightWidth:Gt,borderBottomWidth:Gt,borderLeftWidth:Gt,borderRadius:Gt,radius:Gt,borderTopLeftRadius:Gt,borderTopRightRadius:Gt,borderBottomRightRadius:Gt,borderBottomLeftRadius:Gt,width:Gt,maxWidth:Gt,height:Gt,maxHeight:Gt,top:Gt,right:Gt,bottom:Gt,left:Gt,padding:Gt,paddingTop:Gt,paddingRight:Gt,paddingBottom:Gt,paddingLeft:Gt,margin:Gt,marginTop:Gt,marginRight:Gt,marginBottom:Gt,marginLeft:Gt,backgroundPositionX:Gt,backgroundPositionY:Gt};var nf={rotate:ti,rotateX:ti,rotateY:ti,rotateZ:ti,scale:Kr,scaleX:Kr,scaleY:Kr,scaleZ:Kr,skew:ti,skewX:ti,skewY:ti,distance:Gt,translateX:Gt,translateY:Gt,translateZ:Gt,x:Gt,y:Gt,z:Gt,perspective:Gt,transformPerspective:Gt,opacity:mi,originX:xc,originY:xc,originZ:Gt};var yc={...Qn,transform:Math.round};var $s={...ef,...nf,zIndex:yc,size:Gt,fillOpacity:mi,strokeOpacity:mi,numOctaves:yc};var T0={...$s,color:ze,backgroundColor:ze,outlineColor:ze,fill:ze,stroke:ze,borderColor:ze,borderTopColor:ze,borderRightColor:ze,borderBottomColor:ze,borderLeftColor:ze,filter:jr,WebkitFilter:jr},Zs=n=>T0[n];function la(n,t){let e=Zs(n);return e!==jr&&(e=bn),e.getAnimatableNone?e.getAnimatableNone(t):void 0}var w0=new Set(["auto","none","0"]);function sf(n,t,e){let i=0,s;for(;i<n.length&&!s;){let r=n[i];typeof r=="string"&&!w0.has(r)&&us(r).values.length&&(s=n[i]),i++}if(s&&e)for(let r of t)n[r]=la(e,s)}var vc=n=>n===Qn||n===Gt,rf=(n,t)=>parseFloat(n.split(", ")[t]),of=(n,t)=>(e,{transform:i})=>{if(i==="none"||!i)return 0;let s=i.match(/^matrix3d\((.+)\)$/u);if(s)return rf(s[1],t);{let r=i.match(/^matrix\((.+)\)$/u);return r?rf(r[1],n):0}},E0=new Set(["x","y","z"]),A0=Jn.filter(n=>!E0.has(n));function af(n){let t=[];return A0.forEach(e=>{let i=n.getValue(e);i!==void 0&&(t.push([e,i.get()]),i.set(e.startsWith("scale")?1:0))}),t}var ds={width:({x:n},{paddingLeft:t="0",paddingRight:e="0"})=>n.max-n.min-parseFloat(t)-parseFloat(e),height:({y:n},{paddingTop:t="0",paddingBottom:e="0"})=>n.max-n.min-parseFloat(t)-parseFloat(e),top:(n,{top:t})=>parseFloat(t),left:(n,{left:t})=>parseFloat(t),bottom:({y:n},{top:t})=>parseFloat(t)+(n.max-n.min),right:({x:n},{left:t})=>parseFloat(t)+(n.max-n.min),x:of(4,13),y:of(5,14)};ds.translateX=ds.x;ds.translateY=ds.y;var fs=new Set,Sc=!1,Mc=!1;function lf(){if(Mc){let n=Array.from(fs).filter(i=>i.needsMeasurement),t=new Set(n.map(i=>i.element)),e=new Map;t.forEach(i=>{let s=af(i);s.length&&(e.set(i,s),i.render())}),n.forEach(i=>i.measureInitialState()),t.forEach(i=>{i.render();let s=e.get(i);s&&s.forEach(([r,o])=>{var a;(a=i.getValue(r))===null||a===void 0||a.set(o)})}),n.forEach(i=>i.measureEndState()),n.forEach(i=>{i.suspendedScrollY!==void 0&&window.scrollTo(0,i.suspendedScrollY)})}Mc=!1,Sc=!1,fs.forEach(n=>n.complete()),fs.clear()}function cf(){fs.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(Mc=!0)})}function hf(){cf(),lf()}var ki=class{constructor(t,e,i,s,r,o=!1){this.isComplete=!1,this.isAsync=!1,this.needsMeasurement=!1,this.isScheduled=!1,this.unresolvedKeyframes=[...t],this.onComplete=e,this.name=i,this.motionValue=s,this.element=r,this.isAsync=o}scheduleResolve(){this.isScheduled=!0,this.isAsync?(fs.add(this),Sc||(Sc=!0,Ne.read(cf),Ne.resolveKeyframes(lf))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:t,name:e,element:i,motionValue:s}=this;for(let r=0;r<t.length;r++)if(t[r]===null)if(r===0){let o=s?.get(),a=t[t.length-1];if(o!==void 0)t[0]=o;else if(i&&e){let l=i.readValue(e,a);l!=null&&(t[0]=l)}t[0]===void 0&&(t[0]=a),s&&o===void 0&&s.set(t[0])}else t[r]=t[r-1]}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(){this.isComplete=!0,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe),fs.delete(this)}cancel(){this.isComplete||(this.isScheduled=!1,fs.delete(this))}resume(){this.isComplete||this.scheduleResolve()}};var ca=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);var uf=n=>t=>typeof t=="string"&&t.startsWith(n),ha=uf("--"),C0=uf("var(--"),Ks=n=>C0(n)?R0.test(n.split("/*")[0].trim()):!1,R0=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;var P0=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function I0(n){let t=P0.exec(n);if(!t)return[,];let[,e,i,s]=t;return[`--${e??i}`,s]}var D0=4;function bc(n,t,e=1){Bn(e<=D0,`Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`);let[i,s]=I0(n);if(!i)return;let r=window.getComputedStyle(t).getPropertyValue(i);if(r){let o=r.trim();return ca(o)?parseFloat(o):o}return Ks(s)?bc(s,t,e+1):s}var ua=n=>t=>t.test(n);var df={test:n=>n==="auto",parse:n=>n};var Tc=[Qn,Gt,zi,ti,$d,qd,df],wc=n=>Tc.find(ua(n));var Js=class extends ki{constructor(t,e,i,s,r){super(t,e,i,s,r,!0)}readKeyframes(){let{unresolvedKeyframes:t,element:e,name:i}=this;if(!e||!e.current)return;super.readKeyframes();for(let l=0;l<t.length;l++){let c=t[l];if(typeof c=="string"&&(c=c.trim(),Ks(c))){let h=bc(c,e.current);h!==void 0&&(t[l]=h),l===t.length-1&&(this.finalKeyframe=c)}}if(this.resolveNoneKeyframes(),!Zo.has(i)||t.length!==2)return;let[s,r]=t,o=wc(s),a=wc(r);if(o!==a)if(vc(o)&&vc(a))for(let l=0;l<t.length;l++){let c=t[l];typeof c=="string"&&(t[l]=parseFloat(c))}else this.needsMeasurement=!0}resolveNoneKeyframes(){let{unresolvedKeyframes:t,name:e}=this,i=[];for(let s=0;s<t.length;s++)Wd(t[s])&&i.push(s);i.length&&sf(t,i,e)}measureInitialState(){let{element:t,unresolvedKeyframes:e,name:i}=this;if(!t||!t.current)return;i==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=ds[i](t.measureViewportBox(),window.getComputedStyle(t.current)),e[0]=this.measuredOrigin;let s=e[e.length-1];s!==void 0&&t.getValue(i,s).jump(s,!1)}measureEndState(){var t;let{element:e,name:i,unresolvedKeyframes:s}=this;if(!e||!e.current)return;let r=e.getValue(i);r&&r.jump(this.measuredOrigin,!1);let o=s.length-1,a=s[o];s[o]=ds[i](e.measureViewportBox(),window.getComputedStyle(e.current)),a!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=a),!((t=this.removedTransforms)===null||t===void 0)&&t.length&&this.removedTransforms.forEach(([l,c])=>{e.getValue(l).set(c)}),this.resolveNoneKeyframes()}};var Ec=(n,t)=>t==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(bn.test(n)||n==="0")&&!n.startsWith("url("));function L0(n){let t=n[0];if(n.length===1)return!0;for(let e=0;e<n.length;e++)if(n[e]!==t)return!0}function ff(n,t,e,i){let s=n[0];if(s===null)return!1;if(t==="display"||t==="visibility")return!0;let r=n[n.length-1],o=Ec(s,t),a=Ec(r,t);return Ui(o===a,`You are trying to animate ${t} from "${s}" to "${r}". ${s} is not an animatable value - to enable this animation set ${s} to a value animatable to ${r} via the \`style\` property.`),!o||!a?!1:L0(n)||(e==="spring"||Ni(e))&&i}var U0=n=>n!==null;function Hi(n,{repeat:t,repeatType:e="loop"},i){let s=n.filter(U0),r=t&&e!=="loop"&&t%2===1?0:s.length-1;return!r||i===void 0?s[r]:i}var N0=40,Qs=class{constructor({autoplay:t=!0,delay:e=0,type:i="keyframes",repeat:s=0,repeatDelay:r=0,repeatType:o="loop",...a}){this.isStopped=!1,this.hasAttemptedResolve=!1,this.createdAt=Mn.now(),this.options={autoplay:t,delay:e,type:i,repeat:s,repeatDelay:r,repeatType:o,...a},this.updateFinishedPromise()}calcStartTime(){return this.resolvedAt?this.resolvedAt-this.createdAt>N0?this.resolvedAt:this.createdAt:this.createdAt}get resolved(){return!this._resolved&&!this.hasAttemptedResolve&&hf(),this._resolved}onKeyframesResolved(t,e){this.resolvedAt=Mn.now(),this.hasAttemptedResolve=!0;let{name:i,type:s,velocity:r,delay:o,onComplete:a,onUpdate:l,isGenerator:c}=this.options;if(!c&&!ff(t,i,s,r))if(jo.current||!o){l&&l(Hi(t,this.options,e)),a&&a(),this.resolveFinishedPromise();return}else this.options.duration=0;let h=this.initPlayback(t,e);h!==!1&&(this._resolved={keyframes:t,finalKeyframe:e,...h},this.onPostResolved())}onPostResolved(){}then(t,e){return this.currentFinishedPromise.then(t,e)}flatten(){this.options.type="keyframes",this.options.ease="linear"}updateFinishedPromise(){this.currentFinishedPromise=new Promise(t=>{this.resolveFinishedPromise=t})}};function Ac(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*(2/3-e)*6:n}function pf({hue:n,saturation:t,lightness:e,alpha:i}){n/=360,t/=100,e/=100;let s=0,r=0,o=0;if(!t)s=r=o=e;else{let a=e<.5?e*(1+t):e+t-e*t,l=2*e-a;s=Ac(l,a,n+1/3),r=Ac(l,a,n),o=Ac(l,a,n-1/3)}return{red:Math.round(s*255),green:Math.round(r*255),blue:Math.round(o*255),alpha:i}}function js(n,t){return e=>e>0?t:n}var Cc=(n,t,e)=>{let i=n*n,s=e*(t*t-i)+i;return s<0?0:Math.sqrt(s)},F0=[Jr,jn,Vi],O0=n=>F0.find(t=>t.test(n));function mf(n){let t=O0(n);if(Ui(!!t,`'${n}' is not an animatable color. Use the equivalent color code instead.`),!t)return!1;let e=t.parse(n);return t===Vi&&(e=pf(e)),e}var Rc=(n,t)=>{let e=mf(n),i=mf(t);if(!e||!i)return js(n,t);let s={...e};return r=>(s.red=Cc(e.red,i.red,r),s.green=Cc(e.green,i.green,r),s.blue=Cc(e.blue,i.blue,r),s.alpha=Kn(e.alpha,i.alpha,r),jn.transform(s))};var B0=(n,t)=>e=>t(n(e)),tr=(...n)=>n.reduce(B0);var da=new Set(["none","hidden"]);function gf(n,t){return da.has(n)?e=>e<=0?n:t:e=>e>=1?t:n}function z0(n,t){return e=>Kn(n,t,e)}function fa(n){return typeof n=="number"?z0:typeof n=="string"?Ks(n)?js:ze.test(n)?Rc:H0:Array.isArray(n)?_f:typeof n=="object"?ze.test(n)?Rc:V0:js}function _f(n,t){let e=[...n],i=e.length,s=n.map((r,o)=>fa(r)(r,t[o]));return r=>{for(let o=0;o<i;o++)e[o]=s[o](r);return e}}function V0(n,t){let e={...n,...t},i={};for(let s in e)n[s]!==void 0&&t[s]!==void 0&&(i[s]=fa(n[s])(n[s],t[s]));return s=>{for(let r in i)e[r]=i[r](s);return e}}function k0(n,t){var e;let i=[],s={color:0,var:0,number:0};for(let r=0;r<t.values.length;r++){let o=t.types[r],a=n.indexes[o][s[o]],l=(e=n.values[a])!==null&&e!==void 0?e:0;i[r]=l,s[o]++}return i}var H0=(n,t)=>{let e=bn.createTransformer(t),i=us(n),s=us(t);return i.indexes.var.length===s.indexes.var.length&&i.indexes.color.length===s.indexes.color.length&&i.indexes.number.length>=s.indexes.number.length?da.has(n)&&!s.values.length||da.has(t)&&!i.values.length?gf(n,t):tr(_f(k0(i,s),s.values),e):(Ui(!0,`Complex values '${n}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`),js(n,t))};function pa(n,t,e){return typeof n=="number"&&typeof t=="number"&&typeof e=="number"?Kn(n,t,e):fa(n)(n,t)}function Pc({keyframes:n,velocity:t=0,power:e=.8,timeConstant:i=325,bounceDamping:s=10,bounceStiffness:r=500,modifyTarget:o,min:a,max:l,restDelta:c=.5,restSpeed:h}){let u=n[0],d={done:!1,value:u},p=P=>a!==void 0&&P<a||l!==void 0&&P>l,g=P=>a===void 0?l:l===void 0||Math.abs(a-P)<Math.abs(l-P)?a:l,_=e*t,m=u+_,f=o===void 0?m:o(m);f!==m&&(_=f-u);let w=P=>-_*Math.exp(-P/i),T=P=>f+w(P),y=P=>{let M=w(P),v=T(P);d.done=Math.abs(M)<=c,d.value=d.done?f:v},I,A,C=P=>{p(d.value)&&(I=P,A=Vs({keyframes:[d.value,g(d.value)],velocity:ko(T,P,d.value),damping:s,stiffness:r,restDelta:c,restSpeed:h}))};return C(0),{calculatedDuration:null,next:P=>{let M=!1;return!A&&I===void 0&&(M=!0,y(P),C(P)),I!==void 0&&P>=I?A.next(P-I):(!M&&y(P),d)}}}var xf=Oi(.42,0,1,1),yf=Oi(0,0,.58,1),ma=Oi(.42,0,.58,1);var vf={linear:Ze,easeIn:xf,easeInOut:ma,easeOut:yf,circIn:sa,circInOut:ra,circOut:Gd,backIn:Zr,backInOut:na,backOut:gc,anticipate:ia},Ic=n=>{if(qr(n)){Bn(n.length===4,"Cubic bezier arrays must contain four numerical values.");let[t,e,i,s]=n;return Oi(t,e,i,s)}else if(typeof n=="string")return Bn(vf[n]!==void 0,`Invalid easing type '${n}'`),vf[n];return n};function G0(n,t,e){let i=[],s=e||pa,r=n.length-1;for(let o=0;o<r;o++){let a=s(n[o],n[o+1]);if(t){let l=Array.isArray(t)?t[o]||Ze:t;a=tr(l,a)}i.push(a)}return i}function ga(n,t,{clamp:e=!0,ease:i,mixer:s}={}){let r=n.length;if(Bn(r===t.length,"Both input and output ranges must be the same length"),r===1)return()=>t[0];if(r===2&&t[0]===t[1])return()=>t[1];let o=n[0]===n[1];n[0]>n[r-1]&&(n=[...n].reverse(),t=[...t].reverse());let a=G0(t,i,s),l=a.length,c=h=>{if(o&&h<n[0])return t[0];let u=0;if(l>1)for(;u<n.length-2&&!(h<n[u+1]);u++);let d=Zn(n[u],n[u+1],h);return a[u](d)};return e?h=>c(sn(n[0],n[r-1],h)):c}function Sf(n,t){return n.map(e=>e*t)}function W0(n,t){return n.map(()=>t||ma).splice(0,n.length-1)}function to({duration:n=300,keyframes:t,times:e,ease:i="easeInOut"}){let s=Go(i)?i.map(Ic):Ic(i),r={done:!1,value:t[0]},o=Sf(e&&e.length===t.length?e:ks(t),n),a=ga(o,t,{ease:Array.isArray(s)?s:W0(t,s)});return{calculatedDuration:n,next:l=>(r.value=a(l),r.done=l>=n,r)}}var Mf=n=>{let t=({timestamp:e})=>n(e);return{start:()=>Ne.update(t,!0),stop:()=>fi(t),now:()=>Fi.isProcessing?Fi.timestamp:Mn.now()}};var X0={decay:Pc,inertia:Pc,tween:to,keyframes:to,spring:Vs},Y0=n=>n/100,ps=class extends Qs{constructor(t){super(t),this.holdTime=null,this.cancelTime=null,this.currentTime=0,this.playbackSpeed=1,this.pendingPlayState="running",this.startTime=null,this.state="idle",this.stop=()=>{if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.teardown();let{onStop:l}=this.options;l&&l()};let{name:e,motionValue:i,element:s,keyframes:r}=this.options,o=s?.KeyframeResolver||ki,a=(l,c)=>this.onKeyframesResolved(l,c);this.resolver=new o(r,a,e,i,s),this.resolver.scheduleResolve()}flatten(){super.flatten(),this._resolved&&Object.assign(this._resolved,this.initPlayback(this._resolved.keyframes))}initPlayback(t){let{type:e="keyframes",repeat:i=0,repeatDelay:s=0,repeatType:r,velocity:o=0}=this.options,a=Ni(e)?e:X0[e]||to,l,c;a!==to&&typeof t[0]!="number"&&(l=tr(Y0,pa(t[0],t[1])),t=[0,100]);let h=a({...this.options,keyframes:t});r==="mirror"&&(c=a({...this.options,keyframes:[...t].reverse(),velocity:-o})),h.calculatedDuration===null&&(h.calculatedDuration=Bs(h));let{calculatedDuration:u}=h,d=u+s,p=d*(i+1)-s;return{generator:h,mirroredGenerator:c,mapPercentToKeyframes:l,calculatedDuration:u,resolvedDuration:d,totalDuration:p}}onPostResolved(){let{autoplay:t=!0}=this.options;this.play(),this.pendingPlayState==="paused"||!t?this.pause():this.state=this.pendingPlayState}tick(t,e=!1){let{resolved:i}=this;if(!i){let{keyframes:P}=this.options;return{done:!0,value:P[P.length-1]}}let{finalKeyframe:s,generator:r,mirroredGenerator:o,mapPercentToKeyframes:a,keyframes:l,calculatedDuration:c,totalDuration:h,resolvedDuration:u}=i;if(this.startTime===null)return r.next(0);let{delay:d,repeat:p,repeatType:g,repeatDelay:_,onUpdate:m}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-h/this.speed,this.startTime)),e?this.currentTime=t:this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=Math.round(t-this.startTime)*this.speed;let f=this.currentTime-d*(this.speed>=0?1:-1),w=this.speed>=0?f<0:f>h;this.currentTime=Math.max(f,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=h);let T=this.currentTime,y=r;if(p){let P=Math.min(this.currentTime,h)/u,M=Math.floor(P),v=P%1;!v&&P>=1&&(v=1),v===1&&M--,M=Math.min(M,p+1),M%2&&(g==="reverse"?(v=1-v,_&&(v-=_/u)):g==="mirror"&&(y=o)),T=sn(0,1,v)*u}let I=w?{done:!1,value:l[0]}:y.next(T);a&&(I.value=a(I.value));let{done:A}=I;!w&&c!==null&&(A=this.speed>=0?this.currentTime>=h:this.currentTime<=0);let C=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&A);return C&&s!==void 0&&(I.value=Hi(l,this.options,s)),m&&m(I.value),C&&this.finish(),I}get duration(){let{resolved:t}=this;return t?dn(t.calculatedDuration):0}get time(){return dn(this.currentTime)}set time(t){t=Ke(t),this.currentTime=t,this.holdTime!==null||this.speed===0?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.speed)}get speed(){return this.playbackSpeed}set speed(t){let e=this.playbackSpeed!==t;this.playbackSpeed=t,e&&(this.time=dn(this.currentTime))}play(){if(this.resolver.isScheduled||this.resolver.resume(),!this._resolved){this.pendingPlayState="running";return}if(this.isStopped)return;let{driver:t=Mf,onPlay:e,startTime:i}=this.options;this.driver||(this.driver=t(r=>this.tick(r))),e&&e();let s=this.driver.now();this.holdTime!==null?this.startTime=s-this.holdTime:this.startTime?this.state==="finished"&&(this.startTime=s):this.startTime=i??this.calcStartTime(),this.state==="finished"&&this.updateFinishedPromise(),this.cancelTime=this.startTime,this.holdTime=null,this.state="running",this.driver.start()}pause(){var t;if(!this._resolved){this.pendingPlayState="paused";return}this.state="paused",this.holdTime=(t=this.currentTime)!==null&&t!==void 0?t:0}complete(){this.state!=="running"&&this.play(),this.pendingPlayState=this.state="finished",this.holdTime=null}finish(){this.teardown(),this.state="finished";let{onComplete:t}=this.options;t&&t()}cancel(){this.cancelTime!==null&&this.tick(this.cancelTime),this.teardown(),this.updateFinishedPromise()}teardown(){this.state="idle",this.stopDriver(),this.resolveFinishedPromise(),this.updateFinishedPromise(),this.startTime=this.cancelTime=null,this.resolver.cancel()}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}};var bf=new Set(["opacity","clipPath","filter","transform"]);function Tf(n,t,e,{delay:i=0,duration:s=300,repeat:r=0,repeatType:o="loop",ease:a="easeInOut",times:l}={}){let c={[t]:e};l&&(c.offset=l);let h=mc(a,s);return Array.isArray(h)&&(c.easing=h),n.animate(c,{delay:i,duration:s,easing:Array.isArray(h)?"linear":h,fill:"both",iterations:r+1,direction:o==="reverse"?"alternate":"normal"})}var wf=Fs(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));var _a=10,q0=2e4;function $0(n){return Ni(n.type)||n.type==="spring"||!pc(n.ease)}function Z0(n,t){let e=new ps({...t,keyframes:n,repeat:0,delay:0,isGenerator:!0}),i={done:!1,value:n[0]},s=[],r=0;for(;!i.done&&r<q0;)i=e.sample(r),s.push(i.value),r+=_a;return{times:void 0,keyframes:s,duration:r-_a,ease:"linear"}}var Ef={anticipate:ia,backInOut:na,circInOut:ra};function K0(n){return n in Ef}var eo=class extends Qs{constructor(t){super(t);let{name:e,motionValue:i,element:s,keyframes:r}=this.options;this.resolver=new Js(r,(o,a)=>this.onKeyframesResolved(o,a),e,i,s),this.resolver.scheduleResolve()}initPlayback(t,e){let{duration:i=300,times:s,ease:r,type:o,motionValue:a,name:l,startTime:c}=this.options;if(!a.owner||!a.owner.current)return!1;if(typeof r=="string"&&Xs()&&K0(r)&&(r=Ef[r]),$0(this.options)){let{onComplete:u,onUpdate:d,motionValue:p,element:g,..._}=this.options,m=Z0(t,_);t=m.keyframes,t.length===1&&(t[1]=t[0]),i=m.duration,s=m.times,r=m.ease,o="keyframes"}let h=Tf(a.owner.current,l,t,{...this.options,duration:i,times:s,ease:r});return h.startTime=c??this.calcStartTime(),this.pendingTimeline?(dc(h,this.pendingTimeline),this.pendingTimeline=void 0):h.onfinish=()=>{let{onComplete:u}=this.options;a.set(Hi(t,this.options,e)),u&&u(),this.cancel(),this.resolveFinishedPromise()},{animation:h,duration:i,times:s,type:o,ease:r,keyframes:t}}get duration(){let{resolved:t}=this;if(!t)return 0;let{duration:e}=t;return dn(e)}get time(){let{resolved:t}=this;if(!t)return 0;let{animation:e}=t;return dn(e.currentTime||0)}set time(t){let{resolved:e}=this;if(!e)return;let{animation:i}=e;i.currentTime=Ke(t)}get speed(){let{resolved:t}=this;if(!t)return 1;let{animation:e}=t;return e.playbackRate}set speed(t){let{resolved:e}=this;if(!e)return;let{animation:i}=e;i.playbackRate=t}get state(){let{resolved:t}=this;if(!t)return"idle";let{animation:e}=t;return e.playState}get startTime(){let{resolved:t}=this;if(!t)return null;let{animation:e}=t;return e.startTime}attachTimeline(t){if(!this._resolved)this.pendingTimeline=t;else{let{resolved:e}=this;if(!e)return Ze;let{animation:i}=e;dc(i,t)}return Ze}play(){if(this.isStopped)return;let{resolved:t}=this;if(!t)return;let{animation:e}=t;e.playState==="finished"&&this.updateFinishedPromise(),e.play()}pause(){let{resolved:t}=this;if(!t)return;let{animation:e}=t;e.pause()}stop(){if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.resolveFinishedPromise(),this.updateFinishedPromise();let{resolved:t}=this;if(!t)return;let{animation:e,keyframes:i,duration:s,type:r,ease:o,times:a}=t;if(e.playState==="idle"||e.playState==="finished")return;if(this.time){let{motionValue:c,onUpdate:h,onComplete:u,element:d,...p}=this.options,g=new ps({...p,keyframes:i,duration:s,type:r,ease:o,times:a,isGenerator:!0}),_=Ke(this.time);c.setWithVelocity(g.sample(_-_a).value,g.sample(_).value,_a)}let{onStop:l}=this.options;l&&l(),this.cancel()}complete(){let{resolved:t}=this;t&&t.animation.finish()}cancel(){let{resolved:t}=this;t&&t.animation.cancel()}static supports(t){let{motionValue:e,name:i,repeatDelay:s,repeatType:r,damping:o,type:a}=t;if(!e||!e.owner||!(e.owner.current instanceof HTMLElement))return!1;let{onUpdate:l,transformTemplate:c}=e.owner.getProps();return wf()&&i&&bf.has(i)&&!l&&!c&&!s&&r!=="mirror"&&o!==0&&a!=="inertia"}};var J0={type:"spring",stiffness:500,damping:25,restSpeed:10},Q0=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),j0={type:"keyframes",duration:.8},t_={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},Af=(n,{keyframes:t})=>t.length>2?j0:Sn.has(n)?n.startsWith("scale")?Q0(t[1]):J0:t_;function Cf({when:n,delay:t,delayChildren:e,staggerChildren:i,staggerDirection:s,repeat:r,repeatType:o,repeatDelay:a,from:l,elapsed:c,...h}){return!!Object.keys(h).length}var xa=(n,t,e,i={},s,r)=>o=>{let a=$o(i,n)||{},l=a.delay||i.delay||0,{elapsed:c=0}=i;c=c-Ke(l);let h={keyframes:Array.isArray(e)?e:[null,e],ease:"easeOut",velocity:t.getVelocity(),...a,delay:-c,onUpdate:d=>{t.set(d),a.onUpdate&&a.onUpdate(d)},onComplete:()=>{o(),a.onComplete&&a.onComplete()},name:n,motionValue:t,element:r?void 0:s};Cf(a)||(h={...h,...Af(n,h)}),h.duration&&(h.duration=Ke(h.duration)),h.repeatDelay&&(h.repeatDelay=Ke(h.repeatDelay)),h.from!==void 0&&(h.keyframes[0]=h.from);let u=!1;if((h.type===!1||h.duration===0&&!h.repeatDelay)&&(h.duration=0,h.delay===0&&(u=!0)),(jo.current||Hs.skipAnimations)&&(u=!0,h.duration=0,h.delay=0),u&&!r&&t.get()!==void 0){let d=Hi(h.keyframes,a);if(d!==void 0)return Ne.update(()=>{h.onUpdate(d),h.onComplete()}),new Os([])}return!r&&eo.supports(h)?new eo(h):new ps(h)};function e_({protectedKeys:n,needsAnimating:t},e){let i=n.hasOwnProperty(e)&&t[e]!==!0;return t[e]=!1,i}function Rf(n,t,{delay:e=0,transitionOverride:i,type:s}={}){var r;let{transition:o=n.getDefaultTransition(),transitionEnd:a,...l}=t;i&&(o=i);let c=[],h=s&&n.animationState&&n.animationState.getState()[s];for(let u in l){let d=n.getValue(u,(r=n.latestValues[u])!==null&&r!==void 0?r:null),p=l[u];if(p===void 0||h&&e_(h,u))continue;let g={delay:e,...$o(o||{},u)},_=!1;if(window.MotionHandoffAnimation){let f=zd(n);if(f){let w=window.MotionHandoffAnimation(f,u,Ne);w!==null&&(g.startTime=w,_=!0)}}Od(n,u),d.start(xa(u,d,p,n.shouldReduceMotion&&Zo.has(u)?{type:!1}:g,n,_));let m=d.animation;m&&c.push(m)}return a&&Promise.all(c).then(()=>{Ne.update(()=>{a&&Nd(n,a)})}),c}function Pf(n){return n instanceof SVGElement&&n.tagName!=="svg"}var If=()=>({min:0,max:0}),er=()=>({x:If(),y:If()});var Df={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},ya={};for(let n in Df)ya[n]={isEnabled:t=>Df[n].some(e=>!!t[e])};var Lf=typeof window<"u";var no={current:null},va={current:!1};function Uf(){if(va.current=!0,!!Lf)if(window.matchMedia){let n=window.matchMedia("(prefers-reduced-motion)"),t=()=>no.current=n.matches;n.addListener(t),t()}else no.current=!1}var n_=[...Tc,ze,bn],Nf=n=>n_.find(ua(n));function Ff(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function Of(n){return typeof n=="string"||Array.isArray(n)}var i_=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Bf=["initial",...i_];function Dc(n){return Ff(n.animate)||Bf.some(t=>Of(n[t]))}function zf(n){return!!(Dc(n)||n.variants)}function Vf(n,t,e){for(let i in t){let s=t[i],r=e[i];if(Re(s))n.addValue(i,s);else if(Re(r))n.addValue(i,pi(s,{owner:n}));else if(r!==s)if(n.hasValue(i)){let o=n.getValue(i);o.liveStyle===!0?o.jump(s):o.hasAnimated||o.set(s)}else{let o=n.getStaticValue(i);n.addValue(i,pi(o!==void 0?o:s,{owner:n}))}}for(let i in e)t[i]===void 0&&n.removeValue(i);return t}var kf=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],nr=class{scrapeMotionValuesFromProps(t,e,i){return{}}constructor({parent:t,props:e,presenceContext:i,reducedMotionConfig:s,blockInitialAnimation:r,visualState:o},a={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=ki,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let p=Mn.now();this.renderScheduledAt<p&&(this.renderScheduledAt=p,Ne.render(this.render,!1,!0))};let{latestValues:l,renderState:c,onUpdate:h}=o;this.onUpdate=h,this.latestValues=l,this.baseTarget={...l},this.initialValues=e.initial?{...l}:{},this.renderState=c,this.parent=t,this.props=e,this.presenceContext=i,this.depth=t?t.depth+1:0,this.reducedMotionConfig=s,this.options=a,this.blockInitialAnimation=!!r,this.isControllingVariants=Dc(e),this.isVariantNode=zf(e),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);let{willChange:u,...d}=this.scrapeMotionValuesFromProps(e,{},this);for(let p in d){let g=d[p];l[p]!==void 0&&Re(g)&&g.set(l[p],!1)}}mount(t){this.current=t,di.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((e,i)=>this.bindToMotionValue(i,e)),va.current||Uf(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:no.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){di.delete(this.current),this.projection&&this.projection.unmount(),fi(this.notifyUpdate),fi(this.render),this.valueSubscriptions.forEach(t=>t()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(let t in this.events)this.events[t].clear();for(let t in this.features){let e=this.features[t];e&&(e.unmount(),e.isMounted=!1)}this.current=null}bindToMotionValue(t,e){this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)();let i=Sn.has(t),s=e.on("change",a=>{this.latestValues[t]=a,this.props.onUpdate&&Ne.preRender(this.notifyUpdate),i&&this.projection&&(this.projection.isTransformDirty=!0)}),r=e.on("renderRequest",this.scheduleRender),o;window.MotionCheckAppearSync&&(o=window.MotionCheckAppearSync(this,t,e)),this.valueSubscriptions.set(t,()=>{s(),r(),o&&o(),e.owner&&e.stop()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}updateFeatures(){let t="animation";for(t in ya){let e=ya[t];if(!e)continue;let{isEnabled:i,Feature:s}=e;if(!this.features[t]&&s&&i(this.props)&&(this.features[t]=new s(this)),this.features[t]){let r=this.features[t];r.isMounted?r.update():(r.mount(),r.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):er()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,e){this.latestValues[t]=e}update(t,e){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=e;for(let i=0;i<kf.length;i++){let s=kf[i];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);let r="on"+s,o=t[r];o&&(this.propEventSubscriptions[s]=this.on(s,o))}this.prevMotionValues=Vf(this,this.scrapeMotionValuesFromProps(t,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue(),this.onUpdate&&this.onUpdate(this)}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(t){let e=this.getClosestVariantNode();if(e)return e.variantChildren&&e.variantChildren.add(t),()=>e.variantChildren.delete(t)}addValue(t,e){let i=this.values.get(t);e!==i&&(i&&this.removeValue(t),this.bindToMotionValue(t,e),this.values.set(t,e),this.latestValues[t]=e.get())}removeValue(t){this.values.delete(t);let e=this.valueSubscriptions.get(t);e&&(e(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,e){if(this.props.values&&this.props.values[t])return this.props.values[t];let i=this.values.get(t);return i===void 0&&e!==void 0&&(i=pi(e===null?void 0:e,{owner:this}),this.addValue(t,i)),i}readValue(t,e){var i;let s=this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:(i=this.getBaseTargetFromProps(this.props,t))!==null&&i!==void 0?i:this.readValueFromInstance(this.current,t,this.options);return s!=null&&(typeof s=="string"&&(ca(s)||oa(s))?s=parseFloat(s):!Nf(s)&&bn.test(e)&&(s=la(t,e)),this.setBaseTarget(t,Re(s)?s.get():s)),Re(s)?s.get():s}setBaseTarget(t,e){this.baseTarget[t]=e}getBaseTarget(t){var e;let{initial:i}=this.props,s;if(typeof i=="string"||typeof i=="object"){let o=Qo(this.props,i,(e=this.presenceContext)===null||e===void 0?void 0:e.custom);o&&(s=o[t])}if(i&&s!==void 0)return s;let r=this.getBaseTargetFromProps(this.props,t);return r!==void 0&&!Re(r)?r:this.initialValues[t]!==void 0&&s===void 0?void 0:this.baseTarget[t]}on(t,e){return this.events[t]||(this.events[t]=new Gs),this.events[t].add(e)}notify(t,...e){this.events[t]&&this.events[t].notify(...e)}};var ir=class extends nr{constructor(){super(...arguments),this.KeyframeResolver=Js}sortInstanceNodePosition(t,e){return t.compareDocumentPosition(e)&2?1:-1}getBaseTargetFromProps(t,e){return t.style?t.style[e]:void 0}removeValueFromRenderState(t,{vars:e,style:i}){delete e[t],delete i[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:t}=this.props;Re(t)&&(this.childSubscription=t.on("change",e=>{this.current&&(this.current.textContent=`${e}`)}))}};var Sa=(n,t)=>t&&typeof n=="number"?t.transform(n):n;var s_={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},r_=Jn.length;function Hf(n,t,e){let i="",s=!0;for(let r=0;r<r_;r++){let o=Jn[r],a=n[o];if(a===void 0)continue;let l=!0;if(typeof a=="number"?l=a===(o.startsWith("scale")?1:0):l=parseFloat(a)===0,!l||e){let c=Sa(a,$s[o]);if(!l){s=!1;let h=s_[o]||o;i+=`${h}(${c}) `}e&&(t[o]=c)}}return i=i.trim(),e?i=e(t,s?"":i):s&&(i="none"),i}function Ma(n,t,e){let{style:i,vars:s,transformOrigin:r}=n,o=!1,a=!1;for(let l in t){let c=t[l];if(Sn.has(l)){o=!0;continue}else if(ha(l)){s[l]=c;continue}else{let h=Sa(c,$s[l]);l.startsWith("origin")?(a=!0,r[l]=h):i[l]=h}}if(t.transform||(o||e?i.transform=Hf(t,n.transform,e):i.transform&&(i.transform="none")),a){let{originX:l="50%",originY:c="50%",originZ:h=0}=r;i.transformOrigin=`${l} ${c} ${h}`}}var o_={offset:"stroke-dashoffset",array:"stroke-dasharray"},a_={offset:"strokeDashoffset",array:"strokeDasharray"};function Gf(n,t,e=1,i=0,s=!0){n.pathLength=1;let r=s?o_:a_;n[r.offset]=Gt.transform(-i);let o=Gt.transform(t),a=Gt.transform(e);n[r.array]=`${o} ${a}`}function Wf(n,t,e){return typeof n=="string"?n:Gt.transform(t+e*n)}function Xf(n,t,e){let i=Wf(t,n.x,n.width),s=Wf(e,n.y,n.height);return`${i} ${s}`}function Yf(n,{attrX:t,attrY:e,attrScale:i,originX:s,originY:r,pathLength:o,pathSpacing:a=1,pathOffset:l=0,...c},h,u){if(Ma(n,c,u),h){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};let{attrs:d,style:p,dimensions:g}=n;d.transform&&(g&&(p.transform=d.transform),delete d.transform),g&&(s!==void 0||r!==void 0||p.transform)&&(p.transformOrigin=Xf(g,s!==void 0?s:.5,r!==void 0?r:.5)),t!==void 0&&(d.x=t),e!==void 0&&(d.y=e),i!==void 0&&(d.scale=i),o!==void 0&&Gf(d,o,a,l,!1)}var ba=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);var qf=n=>typeof n=="string"&&n.toLowerCase()==="svg";function Ta(n,{style:t,vars:e},i,s){Object.assign(n.style,t,s&&s.getProjectionStyles(i));for(let r in e)n.style.setProperty(r,e[r])}function $f(n,t,e,i){Ta(n,t,void 0,i);for(let s in t.attrs)n.setAttribute(ba.has(s)?s:Ws(s),t.attrs[s])}var Zf={};function Kf(n,{layout:t,layoutId:e}){return Sn.has(n)||n.startsWith("origin")||(t||e!==void 0)&&(!!Zf[n]||n==="opacity")}function wa(n,t,e){var i;let{style:s}=n,r={};for(let o in s)(Re(s[o])||t.style&&Re(t.style[o])||Kf(o,n)||((i=e?.getValue(o))===null||i===void 0?void 0:i.liveStyle)!==void 0)&&(r[o]=s[o]);return r}function Jf(n,t,e){let i=wa(n,t,e);for(let s in n)if(Re(n[s])||Re(t[s])){let r=Jn.indexOf(s)!==-1?"attr"+s.charAt(0).toUpperCase()+s.substring(1):s;i[r]=n[s]}return i}var Ea=class extends ir{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=er}getBaseTargetFromProps(t,e){return t[e]}readValueFromInstance(t,e){if(Sn.has(e)){let i=Zs(e);return i&&i.default||0}return e=ba.has(e)?e:Ws(e),t.getAttribute(e)}scrapeMotionValuesFromProps(t,e,i){return Jf(t,e,i)}build(t,e,i){Yf(t,e,this.isSVGTag,i.transformTemplate)}renderInstance(t,e,i,s){$f(t,e,i,s)}mount(t){this.isSVGTag=qf(t.tagName),super.mount(t)}};function Qf({top:n,left:t,right:e,bottom:i}){return{x:{min:t,max:e},y:{min:n,max:i}}}function jf(n,t){if(!t)return n;let e=t({x:n.left,y:n.top}),i=t({x:n.right,y:n.bottom});return{top:e.y,left:e.x,bottom:i.y,right:i.x}}function tp(n,t){return Qf(jf(n.getBoundingClientRect(),t))}function l_(n){return window.getComputedStyle(n)}var Aa=class extends ir{constructor(){super(...arguments),this.type="html",this.renderInstance=Ta}readValueFromInstance(t,e){if(Sn.has(e)){let i=Zs(e);return i&&i.default||0}else{let i=l_(t),s=(ha(e)?i.getPropertyValue(e):i[e])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(t,{transformPagePoint:e}){return tp(t,e)}build(t,e,i){Ma(t,e,i.transformTemplate)}scrapeMotionValuesFromProps(t,e,i){return wa(t,e,i)}};function c_(n,t){return n in t}var Ca=class extends nr{constructor(){super(...arguments),this.type="object"}readValueFromInstance(t,e){if(c_(e,t)){let i=t[e];if(typeof i=="string"||typeof i=="number")return i}}getBaseTargetFromProps(){}removeValueFromRenderState(t,e){delete e.output[t]}measureInstanceViewportBox(){return er()}build(t,e){Object.assign(t.output,e)}renderInstance(t,{output:e}){Object.assign(t,e)}sortInstanceNodePosition(){return 0}};function ep(n){let t={presenceContext:null,props:{},visualState:{renderState:{transform:{},transformOrigin:{},style:{},vars:{},attrs:{}},latestValues:{}}},e=Pf(n)?new Ea(t):new Aa(t);e.mount(n),di.set(n,e)}function np(n){let t={presenceContext:null,props:{},visualState:{renderState:{output:{}},latestValues:{}}},e=new Ca(t);e.mount(n),di.set(n,e)}function ip(n,t,e){let i=Re(n)?n:pi(n);return i.start(xa("",i,t,e)),i.animation}function h_(n,t){return Re(n)||typeof n=="number"||typeof n=="string"&&!Yr(t)}function Ra(n,t,e,i){let s=[];if(h_(n,t))s.push(ip(n,Yr(t)&&t.default||t,e&&(e.default||e)));else{let r=Yo(n,t,i),o=r.length;Bn(!!o,"No valid elements provided.");for(let a=0;a<o;a++){let l=r[a],c=l instanceof Element?ep:np;di.has(l)||c(l);let h=di.get(l),u={...e};"delay"in u&&typeof u.delay=="function"&&(u.delay=u.delay(a,o)),s.push(...Rf(h,{...t,transition:u},{}))}}return s}function sp(n,t,e){let i=[];return Ed(n,t,e,{spring:Vs}).forEach(({keyframes:r,transition:o},a)=>{i.push(...Ra(a,r,o))}),i}function u_(n){return Array.isArray(n)&&n.some(Array.isArray)}function rp(n){function t(e,i,s){let r=[];u_(e)?r=sp(e,i,n):r=Ra(e,i,s,n);let o=new Os(r);return n&&n.animations.push(o),o}return t}var Lc=rp();function Uc(n,t){let e,i=()=>{let{currentTime:s}=t,o=(s===null?0:s.value)/100;e!==o&&n(o),e=o};return Ne.update(i,!0),()=>fi(i)}var Pa=new WeakMap,Gi;function d_(n,t){if(t){let{inlineSize:e,blockSize:i}=t[0];return{width:e,height:i}}else return n instanceof SVGElement&&"getBBox"in n?n.getBBox():{width:n.offsetWidth,height:n.offsetHeight}}function f_({target:n,contentRect:t,borderBoxSize:e}){var i;(i=Pa.get(n))===null||i===void 0||i.forEach(s=>{s({target:n,contentSize:t,get size(){return d_(n,e)}})})}function p_(n){n.forEach(f_)}function m_(){typeof ResizeObserver>"u"||(Gi=new ResizeObserver(p_))}function op(n,t){Gi||m_();let e=Ns(n);return e.forEach(i=>{let s=Pa.get(i);s||(s=new Set,Pa.set(i,s)),s.add(t),Gi?.observe(i)}),()=>{e.forEach(i=>{let s=Pa.get(i);s?.delete(t),s?.size||Gi?.unobserve(i)})}}var Ia=new Set,io;function g_(){io=()=>{let n={width:window.innerWidth,height:window.innerHeight},t={target:window,size:n,contentSize:n};Ia.forEach(e=>e(t))},window.addEventListener("resize",io)}function ap(n){return Ia.add(n),io||g_(),()=>{Ia.delete(n),!Ia.size&&io&&(io=void 0)}}function lp(n,t){return typeof n=="function"?ap(n):op(n,t)}var __=50,cp=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),up=()=>({time:0,x:cp(),y:cp()}),x_={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function hp(n,t,e,i){let s=e[t],{length:r,position:o}=x_[t],a=s.current,l=e.time;s.current=n[`scroll${o}`],s.scrollLength=n[`scroll${r}`]-n[`client${r}`],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=Zn(0,s.scrollLength,s.current);let c=i-l;s.velocity=c>__?0:zs(s.current-a,c)}function dp(n,t,e){hp(n,"x",t,e),hp(n,"y",t,e),t.time=e}function fp(n,t){let e={x:0,y:0},i=n;for(;i&&i!==t;)if(i instanceof HTMLElement)e.x+=i.offsetLeft,e.y+=i.offsetTop,i=i.offsetParent;else if(i.tagName==="svg"){let s=i.getBoundingClientRect();i=i.parentElement;let r=i.getBoundingClientRect();e.x+=s.left-r.left,e.y+=s.top-r.top}else if(i instanceof SVGGraphicsElement){let{x:s,y:r}=i.getBBox();e.x+=s,e.y+=r;let o=null,a=i.parentNode;for(;!o;)a.tagName==="svg"&&(o=a),a=i.parentNode;i=o}else break;return e}var Da={start:0,center:.5,end:1};function Nc(n,t,e=0){let i=0;if(n in Da&&(n=Da[n]),typeof n=="string"){let s=parseFloat(n);n.endsWith("px")?i=s:n.endsWith("%")?n=s/100:n.endsWith("vw")?i=s/100*document.documentElement.clientWidth:n.endsWith("vh")?i=s/100*document.documentElement.clientHeight:n=s}return typeof n=="number"&&(i=t*n),e+i}var y_=[0,0];function pp(n,t,e,i){let s=Array.isArray(n)?n:y_,r=0,o=0;return typeof n=="number"?s=[n,n]:typeof n=="string"&&(n=n.trim(),n.includes(" ")?s=n.split(" "):s=[n,Da[n]?n:"0"]),r=Nc(s[0],e,i),o=Nc(s[1],t),r-o}var mp={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]};var v_={x:0,y:0};function S_(n){return"getBBox"in n&&n.tagName!=="svg"?n.getBBox():{width:n.clientWidth,height:n.clientHeight}}function gp(n,t,e){let{offset:i=mp.All}=e,{target:s=n,axis:r="y"}=e,o=r==="y"?"height":"width",a=s!==n?fp(s,n):v_,l=s===n?{width:n.scrollWidth,height:n.scrollHeight}:S_(s),c={width:n.clientWidth,height:n.clientHeight};t[r].offset.length=0;let h=!t[r].interpolate,u=i.length;for(let d=0;d<u;d++){let p=pp(i[d],c[o],l[o],a[r]);!h&&p!==t[r].interpolatorOffsets[d]&&(h=!0),t[r].offset[d]=p}h&&(t[r].interpolate=ga(t[r].offset,ks(i),{clamp:!1}),t[r].interpolatorOffsets=[...t[r].offset]),t[r].progress=sn(0,1,t[r].interpolate(t[r].current))}function M_(n,t=n,e){if(e.x.targetOffset=0,e.y.targetOffset=0,t!==n){let i=t;for(;i&&i!==n;)e.x.targetOffset+=i.offsetLeft,e.y.targetOffset+=i.offsetTop,i=i.offsetParent}e.x.targetLength=t===n?t.scrollWidth:t.clientWidth,e.y.targetLength=t===n?t.scrollHeight:t.clientHeight,e.x.containerLength=n.clientWidth,e.y.containerLength=n.clientHeight}function _p(n,t,e,i={}){return{measure:()=>M_(n,i.target,e),update:s=>{dp(n,e,s),(i.offset||i.target)&&gp(n,e,i)},notify:()=>t(e)}}var so=new WeakMap,xp=new WeakMap,Fc=new WeakMap,yp=n=>n===document.documentElement?window:n;function La(n,{container:t=document.documentElement,...e}={}){let i=Fc.get(t);i||(i=new Set,Fc.set(t,i));let s=up(),r=_p(t,n,s,e);if(i.add(r),!so.has(t)){let a=()=>{for(let d of i)d.measure()},l=()=>{for(let d of i)d.update(Fi.timestamp)},c=()=>{for(let d of i)d.notify()},h=()=>{Ne.read(a,!1,!0),Ne.read(l,!1,!0),Ne.update(c,!1,!0)};so.set(t,h);let u=yp(t);window.addEventListener("resize",h,{passive:!0}),t!==document.documentElement&&xp.set(t,lp(t,h)),u.addEventListener("scroll",h,{passive:!0})}let o=so.get(t);return Ne.read(o,!1,!0),()=>{var a;fi(o);let l=Fc.get(t);if(!l||(l.delete(r),l.size))return;let c=so.get(t);so.delete(t),c&&(yp(t).removeEventListener("scroll",c),(a=xp.get(t))===null||a===void 0||a(),window.removeEventListener("resize",c))}}function b_({source:n,container:t,axis:e="y"}){n&&(t=n);let i={value:0},s=La(r=>{i.value=r[e].progress*100},{container:t,axis:e});return{currentTime:i,cancel:s}}var Oc=new Map;function vp({source:n,container:t=document.documentElement,axis:e="y"}={}){n&&(t=n),Oc.has(t)||Oc.set(t,{});let i=Oc.get(t);return i[e]||(i[e]=Bo()?new ScrollTimeline({source:t,axis:e}):b_({source:t,axis:e})),i[e]}function T_(n){return n.length===2}function Sp(n){return n&&(n.target||n.offset)}function w_(n,t){return T_(n)||Sp(t)?La(e=>{n(e[t.axis].progress,e)},t):Uc(n,vp(t))}function E_(n,t){if(n.flatten(),Sp(t))return n.pause(),La(e=>{n.time=n.duration*e[t.axis].progress},t);{let e=vp(t);return n.attachTimeline?n.attachTimeline(e,i=>(i.pause(),Uc(s=>{i.time=i.duration*s},e))):Ze}}function Bc(n,{axis:t="y",...e}={}){let i={axis:t,...e};return typeof n=="function"?w_(n,i):E_(n,i)}var A_={some:0,all:1};function zc(n,t,{root:e,margin:i,amount:s="some"}={}){let r=Ns(n),o=new WeakMap,a=c=>{c.forEach(h=>{let u=o.get(h.target);if(h.isIntersecting!==!!u)if(h.isIntersecting){let d=t(h.target,h);typeof d=="function"?o.set(h.target,d):l.unobserve(h.target)}else typeof u=="function"&&(u(h),o.delete(h.target))})},l=new IntersectionObserver(a,{root:e,rootMargin:i,threshold:typeof s=="number"?s:A_[s]});return r.forEach(c=>l.observe(c)),()=>l.disconnect()}function Mp(n){let t=n.getContext("2d"),e=matchMedia("(prefers-reduced-motion: reduce)").matches,i=Math.min(devicePixelRatio||1,2),{sin:s,cos:r,atan2:o,hypot:a,acos:l,min:c,max:h,PI:u,random:d}=Math,p=(b,U,G)=>b<U?U:b>G?G:b,g=b=>(b=p(b,0,1),b*b*(3-2*b)),_=(b,U,G)=>b+(U-b)*G,m=[10,10,11],f=[229,72,77],w=[255,46,52],T=b=>`${b}px "IBM Plex Mono", ui-monospace, monospace`,y=(b,U)=>`rgba(${b[0]|0},${b[1]|0},${b[2]|0},${p(U,0,1).toFixed(3)})`,I=(b,U,G)=>[_(b[0],U[0],G),_(b[1],U[1],G),_(b[2],U[2],G)],A=b=>{let U="";for(let G=0;G<b;G++)U+="0123456789abcdef"[d()*16|0];return U},C=0,P=0,M=!0,v=800,N=0,X=0,Y=!1;function J(){let b=n.getBoundingClientRect();C=b.width,P=b.height,n.width=Math.round(C*i),n.height=Math.round(P*i),t.setTransform(i,0,0,i,0,0),M=C/P>1.05,M?(v=c(P*.98,C*.7),N=C*.71,X=P*.5):(v=c(C*.95,P*.46),N=C*.5,X=P*.8),Y&&ui()}J(),new ResizeObserver(J).observe(n);let z=0,L=0,W=0,R=0;e||addEventListener("pointermove",b=>{W=(b.clientX/innerWidth-.5)*2,R=(b.clientY/innerHeight-.5)*2},{passive:!0});let D={ex:0,ey:0,ez:0,fx:0,fy:0,fz:0,rx:0,rz:0,ux:0,uy:0,uz:0};function $(b,U){D.ex=s(b)*9.5,D.ez=r(b)*9.5,D.ey=3.6+U;let nt=-D.ex,st=2.5-D.ey,ft=-D.ez,ut=a(nt,st,ft);nt/=ut,st/=ut,ft/=ut;let gt=-ft,zt=nt,Jt=a(gt,zt);gt/=Jt,zt/=Jt,Object.assign(D,{fx:nt,fy:st,fz:ft,rx:gt,rz:zt,ux:-zt*st,uy:zt*nt-gt*ft,uz:gt*st})}let Z=[0,0,0];function tt(b,U,G,et=Z){let nt=b-D.ex,st=U-D.ey,ft=G-D.ez,ut=nt*D.fx+st*D.fy+ft*D.fz,gt=v/h(ut,.05);return et[0]=N+(nt*D.rx+ft*D.rz)*gt,et[1]=X-(nt*D.ux+st*D.uy+ft*D.uz)*gt,et[2]=ut,et}let mt=(b,U)=>({m:b,t:U}),V=(b,U,G)=>mt([1,0,0,0,1,0,0,0,1],[b,U,G]),j=b=>mt([b,0,0,0,b,0,0,0,b],[0,0,0]),lt=b=>{let U=r(b),G=s(b);return mt([U,0,G,0,1,0,-G,0,U],[0,0,0])},ht=b=>{let U=r(b),G=s(b);return mt([U,-G,0,G,U,0,0,0,1],[0,0,0])},bt=b=>{let U=r(b),G=s(b);return mt([1,0,0,0,U,-G,0,G,U],[0,0,0])};function St(b,U){let G=b.m,et=U.m,nt=new Array(9),st=U.t;for(let ft=0;ft<3;ft++)for(let ut=0;ut<3;ut++)nt[ft*3+ut]=G[ft*3]*et[ut]+G[ft*3+1]*et[3+ut]+G[ft*3+2]*et[6+ut];return mt(nt,[G[0]*st[0]+G[1]*st[1]+G[2]*st[2]+b.t[0],G[3]*st[0]+G[4]*st[1]+G[5]*st[2]+b.t[1],G[6]*st[0]+G[7]*st[1]+G[8]*st[2]+b.t[2]])}let Ct=(...b)=>b.reduce(St),$t=(b,U,G,et)=>[b.m[0]*U+b.m[1]*G+b.m[2]*et+b.t[0],b.m[3]*U+b.m[4]*G+b.m[5]*et+b.t[1],b.m[6]*U+b.m[7]*G+b.m[8]*et+b.t[2]];function Yt(b,U,G,et){let nt=[b.m[0]*U+b.m[1]*G+b.m[2]*et,b.m[3]*U+b.m[4]*G+b.m[5]*et,b.m[6]*U+b.m[7]*G+b.m[8]*et],st=a(nt[0],nt[1],nt[2]);return[nt[0]/st,nt[1]/st,nt[2]/st]}let Kt=(b,U,G)=>{let et=a(b,U,G);return[b/et,U/et,G/et]},F=Kt(-.5,.85,.6),ye=Kt(.8,.2,-.55),Lt={metal:{c:[182,188,202],amb:.36,dif:.8,rim:.75},dark:{c:[72,76,88],amb:.5,dif:.6,rim:.65},accent:{c:[236,72,78],amb:.62,dif:.48,rim:.2},crate:{c:[216,212,202],amb:.4,dif:.66,rim:.45},dais:{c:[30,31,36],amb:.85,dif:.45,rim:1}};function Wt(b,U,G,et){let nt=h(0,U[0]*F[0]+U[1]*F[1]+U[2]*F[2]),st=h(0,U[0]*ye[0]+U[1]*ye[1]+U[2]*ye[2]),ft=b.amb+b.dif*nt,ut=st*b.rim*.6,gt=b.c[0]*ft+229*ut+et*255,zt=b.c[1]*ft+60*ut+et*110,Jt=b.c[2]*ft+66*ut+et*115,he=p((G-8.5)/10,0,.6);return gt=c(255,_(gt,m[0],he)),zt=c(255,_(zt,m[1],he)),Jt=c(255,_(Jt,m[2],he)),`rgb(${gt|0},${zt|0},${Jt|0})`}let Ut=[],te=[],Rt=[[[1,3,7,5],[1,0,0]],[[0,4,6,2],[-1,0,0]],[[2,6,7,3],[0,1,0]],[[0,1,5,4],[0,-1,0]],[[4,5,7,6],[0,0,1]],[[0,2,3,1],[0,0,-1]]];function E(b,U,G,et=0,nt=Ut){let st=0,ft=0,ut=0;for(let re of b)st+=re[0],ft+=re[1],ut+=re[2];let gt=b.length;if(st/=gt,ft/=gt,ut/=gt,U[0]*(st-D.ex)+U[1]*(ft-D.ey)+U[2]*(ut-D.ez)>=0)return;let zt=new Array(gt*2),Jt=0;for(let re=0;re<gt;re++){if(tt(b[re][0],b[re][1],b[re][2]),Z[2]<.3)return;zt[re*2]=Z[0],zt[re*2+1]=Z[1],Jt+=Z[2]}let he=Jt/gt;nt.push({k:0,z:he,s:zt,fill:Wt(G,U,he,et)})}function x(b,U,G,et,nt,st=0,ft){let ut=[];for(let gt=0;gt<8;gt++)ut.push($t(b,(gt&1?.5:-.5)*U,(gt&2?.5:-.5)*G,(gt&4?.5:-.5)*et));for(let[gt,zt]of Rt)E(gt.map(Jt=>ut[Jt]),Yt(b,zt[0],zt[1],zt[2]),nt,st,ft)}function q(b,U,G,et,nt,st=0,ft){let ut=[],gt=[];for(let zt=0;zt<et;zt++){let Jt=zt/et*u*2;ut.push($t(b,r(Jt)*U,G/2,s(Jt)*U)),gt.push($t(b,r(Jt)*U,-G/2,s(Jt)*U))}for(let zt=0;zt<et;zt++){let Jt=(zt+1)%et,he=(zt+.5)/et*u*2;E([gt[zt],gt[Jt],ut[Jt],ut[zt]],Yt(b,r(he),0,s(he)),nt,st,ft)}E(ut,Yt(b,0,1,0),nt,st,ft),E(gt,Yt(b,0,-1,0),nt,st,ft)}let rt=.95,at=1.55,ot=1.35,Dt=.49;function _t(b){let U=o(-b[2],b[0]),G=a(b[0],b[2]),et=b[1]+Dt,nt=et-rt,st=p(a(G,nt),.4,at+ot-.001),ft=o(nt,G)+l(p((at*at+st*st-ot*ot)/(2*at*st),-1,1)),ut=[at*r(ft),rt+at*s(ft)],gt=o(et-ut[1],G-ut[0]);return{th:U,a1:ft,a2:gt,E:ut,Wr:[G,et]}}let Mt=(b,U,G)=>[U*r(b),G,-U*s(b)];function ne(b,U,G){let et=lt(b.th),{a1:nt,a2:st,E:ft,Wr:ut}=b;q(V(0,.31,0),.64,.26,22,Lt.dark),q(Ct(et,V(0,.6,0)),.47,.32,22,Lt.metal),q(Ct(et,V(0,.465,0)),.5,.05,22,Lt.accent,G*.5),x(Ct(et,V(0,.94,0)),.56,.46,.48,Lt.metal),q(Ct(et,V(0,rt,0),bt(u/2)),.21,.74,16,Lt.accent,G*.6),x(Ct(et,V(at/2*r(nt),rt+at/2*s(nt),0),ht(nt)),at+.08,.3,.36,Lt.metal),q(Ct(et,V(ft[0],ft[1],0),bt(u/2)),.18,.52,16,Lt.accent,G*.6),x(Ct(et,V((ft[0]+ut[0])/2,(ft[1]+ut[1])/2,0),ht(st)),ot,.24,.28,Lt.metal),q(Ct(et,V(ut[0],ut[1],0),bt(u/2)),.13,.38,14,Lt.dark),x(Ct(et,V(ut[0],ut[1]-.17,0)),.6,.12,.24,Lt.metal);for(let gt of[-1,1])x(Ct(et,V(ut[0]+gt*U/2,ut[1]-.36,0)),.05,.26,.18,Lt.dark,G*.25)}let dt=[{th:-.5,r:1.62},{th:-2.4,r:1.5}],Et=4.4,Pt=1.3,Ht=.24,Tt=.52,It=.35,Ot=[[1,"GRIP"],[2.4,"MOVE"],[3.75,"PLACE"]];function _e(b){let U=Math.floor(b/Et),G=b-U*Et,et=dt[U%2],nt=dt[(U+1)%2],st=et.th,ft=et.r,ut=Pt,gt=Tt,zt=!1,Jt=U%2;if(G<.8)ut=_(Pt,Ht,g(G/.8));else if(G<1.1)ut=Ht,gt=_(Tt,It,g((G-.8)/.25)),zt=G>1;else if(G<1.8)ut=_(Ht,Pt,g((G-1.1)/.7)),gt=It,zt=!0;else if(G<3){let he=g((G-1.8)/1.2);st=_(et.th,nt.th,he),ft=_(et.r,nt.r,he),ut=Pt+.45*s(u*he),gt=It,zt=!0}else G<3.6?(st=nt.th,ft=nt.r,ut=_(Pt,Ht,g((G-3)/.6)),gt=It,zt=!0):G<3.9?(st=nt.th,ft=nt.r,ut=Ht,gt=_(It,Tt,g((G-3.65)/.25)),zt=G<3.7,zt||(Jt=(U+1)%2)):(st=nt.th,ft=nt.r,ut=_(Ht,Pt,g((G-3.9)/.5)),Jt=(U+1)%2);return{th:st,tip:[ft*r(st),ut,-ft*s(st)],g:gt,carry:zt,at:Jt}}let O=2.3,vt=1.05,it=.2,ct=.42,At=-.35,xt=22,Xt=1.1,Ee=.5,We=.12,ae=b=>{let U=At+b*ct;return[O*r(U),vt+b*it,-O*s(U)]},ve=[],In=4096,Gr=4096,Dn=[],cn=[],Ln=[],Wr=[];function Io(b){let U=Ae-b.born;if(U>=Xt)return ae(U);let G=g(U/Xt),et=ae(Xt),nt=[(b.start[0]+et[0])/2,h(b.start[1],et[1])+.9,(b.start[2]+et[2])/2],st=(1-G)*(1-G),ft=2*(1-G)*G,ut=G*G;return[st*b.start[0]+ft*nt[0]+ut*et[0],st*b.start[1]+ft*nt[1]+ut*et[1],st*b.start[2]+ft*nt[2]+ut*et[2]]}function cs(b,U){return[[0,.18,0],[0,.76,0],Mt(b.th,0,rt),Mt(b.th,b.E[0],b.E[1]),Mt(b.th,b.Wr[0],b.Wr[1]),U.slice()]}function Do(b){let U=et=>[et[0],et[1]-1.35,et[2]],G={id:++In,born:Ae,kind:b,hash:`${A(4)}\u2026${A(4)}`,snap:cs(B,S.tip).map(U),crate:U(K.pos),start:[S.tip[0],S.tip[1]+.35,S.tip[2]],spin:d()*u*2,state:null,wp:null};ve.push(G),Gr++,Dn.push({t:0}),cn.push({t:0,p:S.tip.slice()});for(let et=0;et<56;et++)Di({},!0,G)}function Di(b,U,G){let et=cs(B,S.tip),nt=U?S.tip:et[2+(d()*4|0)],st=d()*u*2,ft=U?1.4+d()*1.8:.2+d()*.5;return Object.assign(b,{x:nt[0],y:nt[1],z:nt[2],vx:r(st)*ft,vy:U?d()*1.6:.3+d()*.6,vz:s(st)*ft,t:0,life:U?1.4+d()*.8:1.1+d()*1.6,tgt:G||ve[ve.length-1]||null,burst:U,heat:U?1:.35}),U&&Ln.push(b),b}for(let b=0;b<160;b++)Wr.push({x:(d()-.5)*13,y:d()*6.5,z:(d()-.5)*10,ph:d()*6.28,s:.4+d()*.8});let kt={phase:"idle",t:0,next:17.5,victim:null};function Lo(b){let U=b.map(G=>G.slice());return U[3][1]+=.55,U[3][0]+=.35,U[4][1]+=.8,U[4][2]+=.45,U[5][1]+=.9,U[5][2]+=.6,U}function oc(b){if(kt.phase==="idle"){if(Ae<kt.next)return;let U=null,G=1/0;for(let et of ve){let nt=Ae-et.born;if(nt<5||nt>13)continue;let st=ae(nt),ft=tt(st[0],st[1],st[2])[2];ft<G&&(G=ft,U=et)}if(!U){kt.next=Ae+1;return}kt.victim=U,U.state="edited",U.edited=Lo(U.snap),kt.phase="glitch",kt.t=0;return}if(kt.t+=b,!ve.includes(kt.victim)){kt.phase="idle",kt.victim=null,kt.next=Ae+6;return}kt.phase==="glitch"&&kt.t>.7?(kt.phase="broken",kt.t=0):kt.phase==="broken"&&kt.t>2.8?(kt.phase="restore",kt.t=0):kt.phase==="restore"&&(kt.t>.8&&kt.victim.state==="edited"&&(kt.victim.state="restored",cn.push({t:0,p:kt.victim.wp,white:!0})),kt.t>2&&(kt.victim.state=null,kt.victim=null,kt.phase="idle",kt.next=Ae+10.5))}function ac(b){let U=kt.victim;if(!U||b.id<=U.id)return 0;let G=ve[ve.length-1].id;if(kt.phase==="glitch")return 0;if(kt.phase==="broken")return b.id<=U.id+(G-U.id+1)*g(kt.t/1)?1:0;if(kt.phase==="restore"){let et=U.id+(G-U.id+1)*g((kt.t-.8)/.8);return b.id<=et?2:1}return 0}let Ae=0,S=_e(0),B=_t(S.tip),K={pos:[0,0,0],yaw:0},Q=0,H=b=>Math.floor(b/3)*Et+Ot[b%3][0],pt=[];for(let b=0;b<300;b++)pt.push(Di({},!1));function wt(){if(S.carry)K.pos=[S.tip[0],S.tip[1]+.09,S.tip[2]],K.yaw=S.th;else{let b=dt[S.at];K.pos=[b.r*r(b.th),.33,-b.r*s(b.th)],K.yaw=b.th}}function Nt(b,U){b.t+=U;let G=b.tgt&&b.tgt.wp;if(G){let nt=(b.burst?2.2:.9)+b.t*3.2,st=G[0]-b.x,ft=G[1]-b.y,ut=G[2]-b.z;b.vx+=(st*nt-ut*.9)*U,b.vy+=ft*nt*U,b.vz+=(ut*nt+st*.9)*U,st*st+ft*ft+ut*ut<.03&&(b.t=b.life)}else b.vy+=.4*U;let et=Math.exp(-2.4*U);b.vx*=et,b.vy*=et,b.vz*=et,b.x+=b.vx*U,b.y+=b.vy*U,b.z+=b.vz*U}function Ft(b){for(Ae+=b,S=_e(Ae),B=_t(S.tip),wt();Ae>=H(Q);)Do(Ot[Q%3][1]),Q++;for(let U=ve.length-1;U>=0;U--)Ae-ve[U].born>xt&&ve.splice(U,1);for(let U of ve)U.wp=Io(U);oc(b);for(let U of pt)Nt(U,b),U.t>=U.life&&Di(U,!1);for(let U=Ln.length-1;U>=0;U--)Nt(Ln[U],b),Ln[U].t>=Ln[U].life&&Ln.splice(U,1);for(let U=Dn.length-1;U>=0;U--)(Dn[U].t+=b)>.8&&Dn.splice(U,1);for(let U=cn.length-1;U>=0;U--)(cn[U].t+=b)>.6&&cn.splice(U,1)}function qt(b){t.beginPath(),t.moveTo(b[0],b[1]);for(let U=2;U<b.length;U+=2)t.lineTo(b[U],b[U+1]);t.closePath()}function Zt(b){b.sort((U,G)=>G.z-U.z),t.lineWidth=.8,t.lineJoin="round";for(let U of b)Bt(U)}function Bt(b){if(b.k===0)qt(b.s),t.lineWidth=.8,t.fillStyle=b.fill,t.strokeStyle=b.fill,t.fill(),t.stroke();else if(b.k===1)Vt(b.c);else if(b.k===2)Un(b);else if(b.k===3)pe(b);else if(b.k===4){let U=1-p((b.z-8.5)/8,0,.7);t.strokeStyle=y(f,.38*b.a*U),t.lineWidth=1.2,t.beginPath(),t.moveTo(b.s[0],b.s[1]),t.lineTo(b.s[2],b.s[3]),t.stroke()}}function ie(b,U,G,et,nt,st=0){let ft=[];for(let ut=0;ut<=nt;ut++){let gt=st+ut/nt*u*2;tt(b+r(gt)*et,U,G+s(gt)*et),ft.push(Z[0],Z[1])}return ft}function ge(b,U){t.beginPath(),t.moveTo(b[0],b[1]);for(let G=2;G<b.length;G+=2)t.lineTo(b[G],b[G+1]);U&&t.closePath(),t.stroke()}function we(){let b=tt(0,0,0,[0,0,0]),U=tt(3.2,0,0,[0,0,0]),G=tt(0,0,3.2,[0,0,0]),et=tt(0,0,-3.2,[0,0,0]),nt=h(20,a(U[0]-b[0],U[1]-b[1])),st=h(8,Math.abs(G[1]-et[1])/2);t.save(),t.translate(b[0],b[1]),t.scale(1,st/nt);let ft=t.createRadialGradient(0,0,0,0,0,nt*1.6);ft.addColorStop(0,"rgba(229,72,77,0.22)"),ft.addColorStop(.45,"rgba(229,72,77,0.07)"),ft.addColorStop(1,"rgba(229,72,77,0)"),t.fillStyle=ft,t.beginPath(),t.arc(0,0,nt*1.6,0,u*2),t.fill(),t.restore();let ut=[[],[],[],[],[]],gt=10,zt=[0,0,0],Jt=[0,0,0],he=(re,Oe,un,Uo)=>{let No=a((re+un)/2,(Oe+Uo)/2),Fn=Math.floor((1-No/10)*5);Fn<0||(tt(re,0,Oe,zt),tt(un,0,Uo,Jt),!(zt[2]<.4||Jt[2]<.4)&&ut[c(4,Fn)].push(zt[0],zt[1],Jt[0],Jt[1]))};for(let re=-gt;re<=gt;re++)for(let Oe=-gt;Oe<gt;Oe++)he(re,Oe,re,Oe+1),he(Oe,re,Oe+1,re);t.lineWidth=1;for(let re=0;re<5;re++){let Oe=ut[re];if(Oe.length){t.strokeStyle=`rgba(150,152,168,${(.03+re*.045).toFixed(3)})`,t.beginPath();for(let un=0;un<Oe.length;un+=4)t.moveTo(Oe[un],Oe[un+1]),t.lineTo(Oe[un+2],Oe[un+3]);t.stroke()}}}function $e(){te=[],q(V(0,.09,0),1.95,.18,48,Lt.dais,0,te),Zt(te);let b=.181;t.lineWidth=1.4,t.strokeStyle="rgba(255,99,105,0.75)",ge(ie(0,b,0,1.93,64),!0),t.lineWidth=1,t.strokeStyle="rgba(229,72,77,0.45)",ge(ie(0,b,0,1.78,64),!0),t.strokeStyle="rgba(229,72,77,0.28)",ge(ie(0,b,0,1.05,48),!0),t.strokeStyle="rgba(255,120,125,0.55)",t.beginPath();let U=[0,0,0],G=[0,0,0];for(let et=0;et<72;et++){let nt=Ae*.12+et/72*u*2,st=et%6===0;tt(r(nt)*1.3,b,s(nt)*1.3,U),tt(r(nt)*(st?1.55:1.42),b,s(nt)*(st?1.55:1.42),G),t.moveTo(U[0],U[1]),t.lineTo(G[0],G[1])}t.stroke();for(let et of dt){let nt=Ct(V(et.r*r(et.th),b,-et.r*s(et.th)),lt(et.th)),st=[];for(let[ft,ut]of[[-.24,-.24],[.24,-.24],[.24,.24],[-.24,.24]]){let gt=$t(nt,ft,0,ut);tt(gt[0],gt[1],gt[2]),st.push(Z[0],Z[1])}t.fillStyle="rgba(229,72,77,0.08)",t.strokeStyle="rgba(255,99,105,0.6)",qt(st),t.fill(),t.stroke()}}function fe(b,U){return b.state==="edited"?kt.phase==="glitch"&&d()<.5?[255,255,255]:w:b.state==="restored"?I([255,255,255],f,g((kt.t-.8)/1.2)):I([255,240,240],f,g(U/1.6))}function Vt(b){let U=Ae-b.born,G=c(1,(xt-U)/4)*c(1,U/.25);if(G<=0)return;let et=g(U/.5),nt=b.wp;b.state==="edited"&&(kt.phase==="glitch"||kt.t<.4)&&(nt=[nt[0]+(d()-.5)*.12,nt[1]+(d()-.5)*.06,nt[2]+(d()-.5)*.12]);let st=Ct(lt(b.spin+U*.5),bt(.32)),ft=Ct(V(nt[0],nt[1],nt[2]),st,j(Ee*et)),ut=fe(b,U),gt=1-p((b.z-8.5)/10,0,.55),zt=G*gt,Jt=tt(nt[0],nt[1],nt[2],[0,0,0]),he=Ee*et*v/Jt[2];t.globalCompositeOperation="lighter";let re=t.createRadialGradient(Jt[0],Jt[1],0,Jt[0],Jt[1],he*1.5);re.addColorStop(0,y(ut,.26*zt)),re.addColorStop(1,y(ut,0)),t.fillStyle=re,t.beginPath(),t.arc(Jt[0],Jt[1],he*1.5,0,u*2),t.fill(),t.globalCompositeOperation="source-over";let Oe=[];for(let ue=0;ue<8;ue++){let Se=$t(ft,ue&1?.5:-.5,ue&2?.5:-.5,ue&4?.5:-.5);tt(Se[0],Se[1],Se[2]),Oe.push([Z[0],Z[1]])}let un=Rt.map(([ue,Se])=>{let hs=Yt(st,Se[0],Se[1],Se[2]),On=$t(ft,Se[0]*.5,Se[1]*.5,Se[2]*.5),Fo=hs[0]*(On[0]-D.ex)+hs[1]*(On[1]-D.ey)+hs[2]*(On[2]-D.ez)<0;return{pts:ue.flatMap(Oo=>Oe[Oo]),front:Fo,up:hs[1]}});t.lineWidth=1;for(let ue of un)ue.front||(qt(ue.pts),t.fillStyle=y(ut,.05*zt),t.fill(),t.strokeStyle=y(ut,.32*zt),t.stroke());let Uo=b.state==="edited"?b.edited:b.snap,No=Ct(V(nt[0],nt[1],nt[2]),st,j(We*et)),Fn=Uo.map(ue=>{let Se=$t(No,ue[0],ue[1],ue[2]);return tt(Se[0],Se[1],Se[2]),[Z[0],Z[1]]}),fd=b.state==="edited"?[255,90,90]:[255,226,226];t.strokeStyle=y(fd,.92*zt),t.lineWidth=h(1,he*.09),t.beginPath(),t.moveTo(Fn[0][0],Fn[0][1]);for(let ue=1;ue<Fn.length;ue++)t.lineTo(Fn[ue][0],Fn[ue][1]);t.stroke(),t.fillStyle=y(fd,zt);let Xg=h(1,he*.07);for(let ue=2;ue<Fn.length;ue++)t.beginPath(),t.arc(Fn[ue][0],Fn[ue][1],Xg,0,u*2),t.fill();if(b.state!=="edited"){let ue=$t(No,b.crate[0],b.crate[1],b.crate[2]);tt(ue[0],ue[1],ue[2]);let Se=h(1.5,he*.14);t.fillStyle=y([235,230,220],.8*zt),t.fillRect(Z[0]-Se/2,Z[1]-Se/2,Se,Se)}for(let ue of un)ue.front&&(qt(ue.pts),t.fillStyle=y(ut,(ue.up>.3?.16:.08)*zt),t.fill(),t.strokeStyle=y(ut,.95*zt),t.lineWidth=1.3,t.stroke());if(b.state==="edited"&&kt.phase!=="glitch"){let Se=(un.find(On=>On.front)||un[0]).pts;t.strokeStyle=y([255,200,200],zt),t.lineWidth=1.4,t.beginPath();let hs=6;for(let On=0;On<=hs;On++){let Fo=On/hs,Oo=_(_(Se[0],Se[2],.15),_(Se[4],Se[6],.85),Fo)+(On%2?1:-1)*he*.12,pd=_(_(Se[1],Se[3],.15),_(Se[5],Se[7],.85),Fo);On===0?t.moveTo(Oo,pd):t.lineTo(Oo,pd)}t.stroke()}b.sx=Jt[0],b.sy=Jt[1],b.rad=he,b.al=zt}function Un(b){let{a:U,b:G}=b,et=ac(G),nt=c(U.al??1,G.al??1),st=tt(U.wp[0],U.wp[1],U.wp[2],[0,0,0]),ft=tt(G.wp[0],G.wp[1],G.wp[2],[0,0,0]),ut=f,gt=.5;if(et===1&&(ut=w,gt=.55+.45*(d()<.3?0:1)),et===2&&(ut=[255,235,235],gt=.9),t.strokeStyle=y(ut,gt*nt),t.lineWidth=et===1?1.6:1.2,et===1&&t.setLineDash([5,4]),t.beginPath(),t.moveTo(st[0],st[1]),t.lineTo(ft[0],ft[1]),t.stroke(),t.setLineDash([]),et!==1){let zt=(Ae*.9+G.id*.37)%1,Jt=_(ft[0],st[0],zt),he=_(ft[1],st[1],zt);t.fillStyle=y([255,210,210],.9*nt),t.beginPath(),t.arc(Jt,he,1.8,0,u*2),t.fill()}}function pe(b){let{c:U}=b,G=(Ae-U.born)/Xt,et=tt(S.tip[0],S.tip[1],S.tip[2],[0,0,0]),nt=tt(U.wp[0],U.wp[1],U.wp[2],[0,0,0]),st=t.createLinearGradient(et[0],et[1],nt[0],nt[1]);st.addColorStop(0,y([255,120,125],.7*(1-G))),st.addColorStop(1,y([255,230,230],.9*(1-G))),t.strokeStyle=st,t.lineWidth=1.2,t.beginPath(),t.moveTo(et[0],et[1]),t.lineTo(nt[0],nt[1]),t.stroke()}function hn(b,U){t.globalCompositeOperation="lighter";let G=[0,0,0];for(let et of b){if(tt(et.x,et.y,et.z,G),G[2]<.5)continue;let nt=c(1,et.t/.2)*c(1,(et.life-et.t)/.4),st=p(.05*v/G[2],.8,3.4);t.globalAlpha=p(nt*U,0,1),t.fillStyle=et.burst?"#fff1f1":et.heat>.6?"#ffb3b6":"#ff5a60",t.fillRect(G[0]-st/2,G[1]-st/2,st,st)}t.globalAlpha=1,t.globalCompositeOperation="source-over"}function Li(){t.globalCompositeOperation="lighter";let b=[0,0,0];for(let U of Wr){let G=(U.y+Ae*.06*U.s)%6.5;if(tt(U.x+s(Ae*.2+U.ph)*.3,G,U.z,b),b[2]<.5)continue;let et=.35+.65*Math.abs(s(Ae*.8+U.ph)),nt=p(.035*v/b[2],.6,2.4);t.fillStyle=`rgba(255,120,125,${(.4*et).toFixed(3)})`,t.fillRect(b[0],b[1],nt,nt)}t.globalCompositeOperation="source-over"}function en(){for(let b of Dn){let U=b.t/.8;t.strokeStyle=y([255,99,105],.85*(1-U)),t.lineWidth=1.6,ge(ie(0,_(.25,2.9,g(U)),0,1+U*.5,48),!0)}t.globalCompositeOperation="lighter";for(let b of cn){if(!b.p)continue;let U=b.t/.6,G=tt(b.p[0],b.p[1],b.p[2],[0,0,0]),et=(b.white?1.4:.8)*v/G[2]*(.4+U),nt=t.createRadialGradient(G[0],G[1],0,G[0],G[1],et);nt.addColorStop(0,b.white?y([255,255,255],.8*(1-U)):y([255,200,200],.7*(1-U))),nt.addColorStop(1,"rgba(255,99,105,0)"),t.fillStyle=nt,t.beginPath(),t.arc(G[0],G[1],et,0,u*2),t.fill()}if(t.globalCompositeOperation="source-over",kt.phase==="restore"&&kt.victim&&kt.t<1){let b=kt.victim,U=g(kt.t/.8),G=[b.wp[0],b.wp[1]+(1-U)*2.2,b.wp[2]],et=Ct(V(G[0],G[1],G[2]),lt(b.spin+(Ae-b.born)*.5),bt(.32),j(Ee*1.08)),nt=[];for(let ut=0;ut<8;ut++){let gt=$t(et,ut&1?.5:-.5,ut&2?.5:-.5,ut&4?.5:-.5);tt(gt[0],gt[1],gt[2]),nt.push([Z[0],Z[1]])}t.strokeStyle=y([255,255,255],.95*(1-h(0,kt.t-.8)/.2)),t.lineWidth=1.5,t.beginPath();for(let[ut,gt]of[[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[1,5],[2,6],[3,7]])t.moveTo(nt[ut][0],nt[ut][1]),t.lineTo(nt[gt][0],nt[gt][1]);t.stroke();let st=tt(G[0],G[1]+2.4,G[2],[0,0,0]),ft=t.createLinearGradient(st[0],st[1],nt[0][0],nt[0][1]);ft.addColorStop(0,"rgba(255,255,255,0)"),ft.addColorStop(1,"rgba(255,255,255,0.35)"),t.strokeStyle=ft,t.beginPath(),t.moveTo(st[0],st[1]),t.lineTo(nt[2][0],nt[2][1]),t.stroke()}}function qn(b){"letterSpacing"in t&&(t.letterSpacing=b)}function xe(b,U,G,et,nt){if(!M||!b.sx||nt<=0)return;let st=M?11:10;t.font=T(st),qn("0.08em");let ft=h(t.measureText(U).width,G?t.measureText(G).width:0),ut=b.sx+b.rad+52+ft<C-12,gt=ut?1:-1,zt=b.sx+gt*b.rad*.8,Jt=b.sy-b.rad*.5,he=zt+gt*26,re=Jt-22;t.globalAlpha=nt,t.strokeStyle=y(et,.8),t.lineWidth=1,t.beginPath(),t.moveTo(zt,Jt),t.lineTo(he,re),t.lineTo(he+gt*10,re),t.stroke(),t.textAlign=ut?"left":"right",t.textBaseline="middle";let Oe=ut?he+gt*8:he+gt*8-ft-12;t.fillStyle="rgba(10,10,11,0.78)",t.fillRect(Oe,re-st*.9,ft+12,(G?st*2+4:st)+st*.8),t.fillStyle=y(et,1),t.fillText(U,he+gt*14,re),G&&(t.fillStyle="rgba(166,164,158,0.9)",t.fillText(G,he+gt*14,re+st+4)),qn("0px"),t.globalAlpha=1}function vn(){let b=ve[ve.length-1];if(b&&kt.victim!==b){let gt=Ae-b.born,zt=p((gt-Xt+.1)/.25,0,1)*p((Xt+1.5-gt)/.3,0,1);xe(b,`#0${b.id}  ${b.kind}  SEALED`,M?`sha256 ${b.hash}`:null,[255,140,144],zt)}let U=kt.victim;U&&(kt.phase!=="restore"?xe(U,`#0${U.id}  RECORD EDITED`,"hash mismatch: chain broken",w,kt.phase==="glitch"?d()<.5?1:.3:1):xe(U,`#0${U.id}  RESTORED`,"from the sealed copy",[255,255,255],p((kt.t-.7)/.2,0,1)));let G=tt(0,0,2.3,[0,0,0]),et=c(G[1]+30,P-(M?120:40)),nt=`CHAIN INTACT  \xB7  ${Gr.toLocaleString("en-US")} EVENTS SEALED`,st=[255,140,144];U&&kt.phase==="broken"&&(nt=`CHAIN BROKEN AT #0${U.id}`,st=w),U&&kt.phase==="restore"&&(nt="VERIFIED AGAINST THE SEALED COPY",st=[255,255,255]),t.font=T(M?11:10),qn("0.14em"),t.textAlign="center",t.textBaseline="middle";let ft=t.measureText(nt).width,ut=.55+.45*s(Ae*4);t.fillStyle=y(st,ut),t.beginPath(),t.arc(G[0]-ft/2-12,et,3,0,u*2),t.fill(),t.fillStyle=y(st,.95),t.fillText(nt,G[0],et),qn("0px")}function ui(){t.clearRect(0,0,C,P);let b=.12+s(Ae*.06)*.22+z*.2;$(b,-L*.7),t.globalAlpha=1,we(),Li(),$e(),Ut=[];let U=Dn.length?1-Dn[Dn.length-1].t/.8:0;ne(B,S.g,U),x(Ct(V(K.pos[0],K.pos[1],K.pos[2]),lt(K.yaw)),.3,.3,.3,Lt.crate);let G=[0,0,0],et=[0,0,0];for(let nt=0;nt<90;nt++){let st=nt/90*xt,ft=(nt+1)/90*xt,ut=ae(st),gt=ae(ft);tt(ut[0],ut[1],ut[2],G),tt(gt[0],gt[1],gt[2],et),Ut.push({k:4,z:(G[2]+et[2])/2+.3,s:[G[0],G[1],et[0],et[1]],a:c(1,st/2,(xt-ft)/4)})}for(let nt=0;nt<ve.length;nt++){let st=ve[nt];if(st.z=tt(st.wp[0],st.wp[1],st.wp[2])[2],Ut.push({k:1,z:st.z,c:st}),nt>0){let ft=ve[nt-1];Ae-st.born>=Xt*.8&&Ut.push({k:2,z:(ft.z+st.z)/2+.01,a:ft,b:st})}Ae-st.born<Xt&&Ut.push({k:3,z:st.z-.01,c:st})}Zt(Ut),en(),hn(pt,.75),hn(Ln,1),vn()}let nn=parseFloat(new URLSearchParams(location.search).get("witness_t")),$n=24+(nn>0?nn:0);kt.next=28;for(let b=0;b<$n*30;b++)b%6===0&&$(.12,0),Ft(1/30);Y=!0;let Nn=!0;if(new IntersectionObserver(([b])=>{Nn=b.isIntersecting},{threshold:.02}).observe(n),e){ui();return}let Xr=performance.now(),dd=b=>{let U=Math.min(.05,Math.max(0,(b-Xr)/1e3));Xr=b,Nn&&!document.hidden&&(z+=(W-z)*.05,L+=(R-L)*.05,Ft(U),ui()),requestAnimationFrame(dd)};requestAnimationFrame(dd)}var C_=0,bp=1,R_=2;var Im=1,P_=2,Si=3,ts=0,mn=1,bi=2,Qi=0,yr=1,Tp=2,wp=3,Ep=4,I_=5,Ms=100,D_=101,L_=102,U_=103,N_=104,F_=200,O_=201,B_=202,z_=203,yh=204,vh=205,V_=206,k_=207,H_=208,G_=209,W_=210,X_=211,Y_=212,q_=213,$_=214,Sh=0,Mh=1,bh=2,br=3,Th=4,wh=5,Eh=6,Ah=7,Dm=0,Z_=1,K_=2,ji=0,J_=1,Q_=2,j_=3,tx=4,ex=5,nx=6,ix=7;var Lm=300,Tr=301,wr=302,Ch=303,Rh=304,Vl=306,Ph=1e3,Ts=1001,Ih=1002,Gn=1003,sx=1004;var Ua=1005;var ni=1006,Vc=1007;var ws=1008;var Ai=1009,Um=1010,Nm=1011,go=1012,Uu=1013,Es=1014,Ti=1015,vo=1016,Nu=1017,Fu=1018,Er=1020,Fm=35902,Om=1021,Bm=1022,Hn=1023,zm=1024,Vm=1025,vr=1026,Ar=1027,km=1028,Ou=1029,Hm=1030,Bu=1031;var zu=1033,al=33776,ll=33777,cl=33778,hl=33779,Dh=35840,Lh=35841,Uh=35842,Nh=35843,Fh=36196,Oh=37492,Bh=37496,zh=37808,Vh=37809,kh=37810,Hh=37811,Gh=37812,Wh=37813,Xh=37814,Yh=37815,qh=37816,$h=37817,Zh=37818,Kh=37819,Jh=37820,Qh=37821,ul=36492,jh=36494,tu=36495,Gm=36283,eu=36284,nu=36285,iu=36286;var fl=2300,su=2301,kc=2302,Ap=2400,Cp=2401,Rp=2402;var rx=3200,ox=3201;var Wm=0,ax=1,Ki="",wn="srgb",Lr="srgb-linear",kl="linear",Me="srgb";var sr=7680;var Pp=519,lx=512,cx=513,hx=514,Xm=515,ux=516,dx=517,fx=518,px=519,Ip=35044;var Dp="300 es",wi=2e3,pl=2001,es=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var dl=Math.PI/180,ru=180/Math.PI;function So(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Je[n&255]+Je[n>>8&255]+Je[n>>16&255]+Je[n>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[i&255]+Je[i>>8&255]+Je[i>>16&255]+Je[i>>24&255]).toLowerCase()}function pn(n,t,e){return Math.max(t,Math.min(e,n))}function mx(n,t){return(n%t+t)%t}function Hc(n,t,e){return(1-e)*n+e*t}function ro(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function fn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var me=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(pn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},jt=class n{constructor(t,e,i,s,r,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],p=i[5],g=i[8],_=s[0],m=s[3],f=s[6],w=s[1],T=s[4],y=s[7],I=s[2],A=s[5],C=s[8];return r[0]=o*_+a*w+l*I,r[3]=o*m+a*T+l*A,r[6]=o*f+a*y+l*C,r[1]=c*_+h*w+u*I,r[4]=c*m+h*T+u*A,r[7]=c*f+h*y+u*C,r[2]=d*_+p*w+g*I,r[5]=d*m+p*T+g*A,r[8]=d*f+p*y+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,p=c*r-o*l,g=e*u+i*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=u*_,t[1]=(s*c-h*i)*_,t[2]=(a*i-s*o)*_,t[3]=d*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=p*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Gc.makeScale(t,e)),this}rotate(t){return this.premultiply(Gc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Gc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Gc=new jt;function Ym(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function ml(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function gx(){let n=ml("canvas");return n.style.display="block",n}var Lp={};function fo(n){n in Lp||(Lp[n]=!0,console.warn(n))}function _x(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function xx(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function yx(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var de={enabled:!0,workingColorSpace:Lr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Me&&(n.r=Ei(n.r),n.g=Ei(n.g),n.b=Ei(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Me&&(n.r=Sr(n.r),n.g=Sr(n.g),n.b=Sr(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ki?kl:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Ei(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Sr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Up=[.64,.33,.3,.6,.15,.06],Np=[.2126,.7152,.0722],Fp=[.3127,.329],Op=new jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bp=new jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);de.define({[Lr]:{primaries:Up,whitePoint:Fp,transfer:kl,toXYZ:Op,fromXYZ:Bp,luminanceCoefficients:Np,workingColorSpaceConfig:{unpackColorSpace:wn},outputColorSpaceConfig:{drawingBufferColorSpace:wn}},[wn]:{primaries:Up,whitePoint:Fp,transfer:Me,toXYZ:Op,fromXYZ:Bp,luminanceCoefficients:Np,outputColorSpaceConfig:{drawingBufferColorSpace:wn}}});var rr,ou=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{rr===void 0&&(rr=ml("canvas")),rr.width=t.width,rr.height=t.height;let i=rr.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=rr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ml("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ei(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ei(e[i]/255)*255):e[i]=Ei(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},vx=0,gl=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vx++}),this.uuid=So(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Wc(s[o].image)):r.push(Wc(s[o]))}else r=Wc(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Wc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ou.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Sx=0,An=class n extends es{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Ts,s=Ts,r=ni,o=ws,a=Hn,l=Ai,c=n.DEFAULT_ANISOTROPY,h=Ki){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sx++}),this.uuid=So(),this.name="",this.source=new gl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Lm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ph:t.x=t.x-Math.floor(t.x);break;case Ts:t.x=t.x<0?0:1;break;case Ih:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ph:t.y=t.y-Math.floor(t.y);break;case Ts:t.y=t.y<0?0:1;break;case Ih:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};An.DEFAULT_IMAGE=null;An.DEFAULT_MAPPING=Lm;An.DEFAULT_ANISOTROPY=1;var be=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(c+1)/2,y=(p+1)/2,I=(f+1)/2,A=(h+d)/4,C=(u+_)/4,P=(g+m)/4;return T>y&&T>I?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=A/i,r=C/i):y>I?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=A/s,r=P/s):I<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),i=C/r,s=P/r),this.set(i,s,r,e),this}let w=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(u-_)/w,this.z=(d-h)/w,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},au=class extends es{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ni,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new An(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new gl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ci=class extends au{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},_l=class extends An{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Gn,this.minFilter=Gn,this.wrapR=Ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var lu=class extends An{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Gn,this.minFilter=Gn,this.wrapR=Ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ns=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==d||c!==p||h!==g){let m=1-a,f=l*d+c*p+h*g+u*_,w=f>=0?1:-1,T=1-f*f;if(T>Number.EPSILON){let I=Math.sqrt(T),A=Math.atan2(I,f*w);m=Math.sin(m*A)/I,a=Math.sin(a*A)/I}let y=a*w;if(l=l*m+d*y,c=c*m+p*y,h=h*m+g*y,u=u*m+_*y,m===1-a){let I=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=I,c*=I,h*=I,u*=I}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*p-c*d,t[e+1]=l*g+h*d+c*u-a*p,t[e+2]=c*g+h*p+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),u=a(r/2),d=l(i/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>u){let p=2*Math.sqrt(1+i-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>u){let p=2*Math.sqrt(1+a-i-u);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(pn(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},k=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(zp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(zp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Xc.copy(this).projectOnVector(t),this.sub(Xc)}reflect(t){return this.sub(Xc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(pn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Xc=new k,zp=new ns,As=class{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(zn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(zn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=zn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,zn):zn.fromBufferAttribute(r,o),zn.applyMatrix4(t.matrixWorld),this.expandByPoint(zn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Na.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Na.copy(i.boundingBox)),Na.applyMatrix4(t.matrixWorld),this.union(Na)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,zn),zn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(oo),Fa.subVectors(this.max,oo),or.subVectors(t.a,oo),ar.subVectors(t.b,oo),lr.subVectors(t.c,oo),Wi.subVectors(ar,or),Xi.subVectors(lr,ar),ms.subVectors(or,lr);let e=[0,-Wi.z,Wi.y,0,-Xi.z,Xi.y,0,-ms.z,ms.y,Wi.z,0,-Wi.x,Xi.z,0,-Xi.x,ms.z,0,-ms.x,-Wi.y,Wi.x,0,-Xi.y,Xi.x,0,-ms.y,ms.x,0];return!Yc(e,or,ar,lr,Fa)||(e=[1,0,0,0,1,0,0,0,1],!Yc(e,or,ar,lr,Fa))?!1:(Oa.crossVectors(Wi,Xi),e=[Oa.x,Oa.y,Oa.z],Yc(e,or,ar,lr,Fa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,zn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(zn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(gi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},gi=[new k,new k,new k,new k,new k,new k,new k,new k],zn=new k,Na=new As,or=new k,ar=new k,lr=new k,Wi=new k,Xi=new k,ms=new k,oo=new k,Fa=new k,Oa=new k,gs=new k;function Yc(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){gs.fromArray(n,r);let a=s.x*Math.abs(gs.x)+s.y*Math.abs(gs.y)+s.z*Math.abs(gs.z),l=t.dot(gs),c=e.dot(gs),h=i.dot(gs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Mx=new As,ao=new k,qc=new k,Cr=class{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Mx.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ao.subVectors(t,this.center);let e=ao.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(ao,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(qc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ao.copy(t.center).add(qc)),this.expandByPoint(ao.copy(t.center).sub(qc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},_i=new k,$c=new k,Ba=new k,Yi=new k,Zc=new k,za=new k,Kc=new k,xl=class{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,_i)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=_i.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(_i.copy(this.origin).addScaledVector(this.direction,e),_i.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){$c.copy(t).add(e).multiplyScalar(.5),Ba.copy(e).sub(t).normalize(),Yi.copy(this.origin).sub($c);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ba),a=Yi.dot(this.direction),l=-Yi.dot(Ba),c=Yi.lengthSq(),h=Math.abs(1-o*o),u,d,p,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy($c).addScaledVector(Ba,d),p}intersectSphere(t,e){_i.subVectors(t.center,this.origin);let i=_i.dot(this.direction),s=_i.dot(_i)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,_i)!==null}intersectTriangle(t,e,i,s,r){Zc.subVectors(e,t),za.subVectors(i,t),Kc.crossVectors(Zc,za);let o=this.direction.dot(Kc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Yi.subVectors(this.origin,t);let l=a*this.direction.dot(za.crossVectors(Yi,za));if(l<0)return null;let c=a*this.direction.dot(Zc.cross(Yi));if(c<0||l+c>o)return null;let h=-a*Yi.dot(Kc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},De=class n{constructor(t,e,i,s,r,o,a,l,c,h,u,d,p,g,_,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,h,u,d,p,g,_,m)}set(t,e,i,s,r,o,a,l,c,h,u,d,p,g,_,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/cr.setFromMatrixColumn(t,0).length(),r=1/cr.setFromMatrixColumn(t,1).length(),o=1/cr.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,p=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=d-_*c,e[9]=-a*l,e[2]=_-d*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,p=l*u,g=c*h,_=c*u;e[0]=d+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=_+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,p=l*u,g=c*h,_=c*u;e[0]=d-_*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,p=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-d*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+g,e[10]=d-_*u}else if(t.order==="XZY"){let d=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bx,t,Tx)}lookAt(t,e,i){let s=this.elements;return _n.subVectors(t,e),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),qi.crossVectors(i,_n),qi.lengthSq()===0&&(Math.abs(i.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),qi.crossVectors(i,_n)),qi.normalize(),Va.crossVectors(_n,qi),s[0]=qi.x,s[4]=Va.x,s[8]=_n.x,s[1]=qi.y,s[5]=Va.y,s[9]=_n.y,s[2]=qi.z,s[6]=Va.z,s[10]=_n.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],p=i[13],g=i[2],_=i[6],m=i[10],f=i[14],w=i[3],T=i[7],y=i[11],I=i[15],A=s[0],C=s[4],P=s[8],M=s[12],v=s[1],N=s[5],X=s[9],Y=s[13],J=s[2],z=s[6],L=s[10],W=s[14],R=s[3],D=s[7],$=s[11],Z=s[15];return r[0]=o*A+a*v+l*J+c*R,r[4]=o*C+a*N+l*z+c*D,r[8]=o*P+a*X+l*L+c*$,r[12]=o*M+a*Y+l*W+c*Z,r[1]=h*A+u*v+d*J+p*R,r[5]=h*C+u*N+d*z+p*D,r[9]=h*P+u*X+d*L+p*$,r[13]=h*M+u*Y+d*W+p*Z,r[2]=g*A+_*v+m*J+f*R,r[6]=g*C+_*N+m*z+f*D,r[10]=g*P+_*X+m*L+f*$,r[14]=g*M+_*Y+m*W+f*Z,r[3]=w*A+T*v+y*J+I*R,r[7]=w*C+T*N+y*z+I*D,r[11]=w*P+T*X+y*L+I*$,r[15]=w*M+T*Y+y*W+I*Z,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+r*l*u-s*c*u-r*a*d+i*c*d+s*a*p-i*l*p)+_*(+e*l*p-e*c*d+r*o*d-s*o*p+s*c*h-r*l*h)+m*(+e*c*u-e*a*p-r*o*u+i*o*p+r*a*h-i*c*h)+f*(-s*a*h-e*l*u+e*a*d+s*o*u-i*o*d+i*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],w=u*m*c-_*d*c+_*l*p-a*m*p-u*l*f+a*d*f,T=g*d*c-h*m*c-g*l*p+o*m*p+h*l*f-o*d*f,y=h*_*c-g*u*c+g*a*p-o*_*p-h*a*f+o*u*f,I=g*u*l-h*_*l-g*a*d+o*_*d+h*a*m-o*u*m,A=e*w+i*T+s*y+r*I;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/A;return t[0]=w*C,t[1]=(_*d*r-u*m*r-_*s*p+i*m*p+u*s*f-i*d*f)*C,t[2]=(a*m*r-_*l*r+_*s*c-i*m*c-a*s*f+i*l*f)*C,t[3]=(u*l*r-a*d*r-u*s*c+i*d*c+a*s*p-i*l*p)*C,t[4]=T*C,t[5]=(h*m*r-g*d*r+g*s*p-e*m*p-h*s*f+e*d*f)*C,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*f-e*l*f)*C,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*p+e*l*p)*C,t[8]=y*C,t[9]=(g*u*r-h*_*r-g*i*p+e*_*p+h*i*f-e*u*f)*C,t[10]=(o*_*r-g*a*r+g*i*c-e*_*c-o*i*f+e*a*f)*C,t[11]=(h*a*r-o*u*r-h*i*c+e*u*c+o*i*p-e*a*p)*C,t[12]=I*C,t[13]=(h*_*s-g*u*s+g*i*d-e*_*d-h*i*m+e*u*m)*C,t[14]=(g*a*s-o*_*s-g*i*l+e*_*l+o*i*m-e*a*m)*C,t[15]=(o*u*s-h*a*s+h*i*l-e*u*l-o*i*d+e*a*d)*C,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,p=r*h,g=r*u,_=o*h,m=o*u,f=a*u,w=l*c,T=l*h,y=l*u,I=i.x,A=i.y,C=i.z;return s[0]=(1-(_+f))*I,s[1]=(p+y)*I,s[2]=(g-T)*I,s[3]=0,s[4]=(p-y)*A,s[5]=(1-(d+f))*A,s[6]=(m+w)*A,s[7]=0,s[8]=(g+T)*C,s[9]=(m-w)*C,s[10]=(1-(d+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=cr.set(s[0],s[1],s[2]).length(),o=cr.set(s[4],s[5],s[6]).length(),a=cr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Vn.copy(this);let c=1/r,h=1/o,u=1/a;return Vn.elements[0]*=c,Vn.elements[1]*=c,Vn.elements[2]*=c,Vn.elements[4]*=h,Vn.elements[5]*=h,Vn.elements[6]*=h,Vn.elements[8]*=u,Vn.elements[9]*=u,Vn.elements[10]*=u,e.setFromRotationMatrix(Vn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=wi){let l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),d=(i+s)/(i-s),p,g;if(a===wi)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===pl)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=wi){let l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(o-r),d=(e+t)*c,p=(i+s)*h,g,_;if(a===wi)g=(o+r)*u,_=-2*u;else if(a===pl)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},cr=new k,Vn=new De,bx=new k(0,0,0),Tx=new k(1,1,1),qi=new k,Va=new k,_n=new k,Vp=new De,kp=new ns,si=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(pn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-pn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(pn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-pn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(pn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-pn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Vp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Vp,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return kp.setFromEuler(this),this.setFromQuaternion(kp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};si.DEFAULT_ORDER="XYZ";var yl=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},wx=0,Hp=new k,hr=new ns,xi=new De,ka=new k,lo=new k,Ex=new k,Ax=new ns,Gp=new k(1,0,0),Wp=new k(0,1,0),Xp=new k(0,0,1),Yp={type:"added"},Cx={type:"removed"},ur={type:"childadded",child:null},Jc={type:"childremoved",child:null},on=class n extends es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wx++}),this.uuid=So(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new k,e=new si,i=new ns,s=new k(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new De},normalMatrix:{value:new jt}}),this.matrix=new De,this.matrixWorld=new De,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return hr.setFromAxisAngle(t,e),this.quaternion.multiply(hr),this}rotateOnWorldAxis(t,e){return hr.setFromAxisAngle(t,e),this.quaternion.premultiply(hr),this}rotateX(t){return this.rotateOnAxis(Gp,t)}rotateY(t){return this.rotateOnAxis(Wp,t)}rotateZ(t){return this.rotateOnAxis(Xp,t)}translateOnAxis(t,e){return Hp.copy(t).applyQuaternion(this.quaternion),this.position.add(Hp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Gp,t)}translateY(t){return this.translateOnAxis(Wp,t)}translateZ(t){return this.translateOnAxis(Xp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ka.copy(t):ka.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),lo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xi.lookAt(lo,ka,this.up):xi.lookAt(ka,lo,this.up),this.quaternion.setFromRotationMatrix(xi),s&&(xi.extractRotation(s.matrixWorld),hr.setFromRotationMatrix(xi),this.quaternion.premultiply(hr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Yp),ur.child=t,this.dispatchEvent(ur),ur.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Cx),Jc.child=t,this.dispatchEvent(Jc),Jc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xi.multiply(t.parent.matrixWorld)),t.applyMatrix4(xi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Yp),ur.child=t,this.dispatchEvent(ur),ur.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lo,t,Ex),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lo,Ax,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};on.DEFAULT_UP=new k(0,1,0);on.DEFAULT_MATRIX_AUTO_UPDATE=!0;on.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var kn=new k,yi=new k,Qc=new k,vi=new k,dr=new k,fr=new k,qp=new k,jc=new k,th=new k,eh=new k,nh=new be,ih=new be,sh=new be,Ji=class n{constructor(t=new k,e=new k,i=new k){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),kn.subVectors(t,e),s.cross(kn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){kn.subVectors(s,e),yi.subVectors(i,e),Qc.subVectors(t,e);let o=kn.dot(kn),a=kn.dot(yi),l=kn.dot(Qc),c=yi.dot(yi),h=yi.dot(Qc),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,vi)===null?!1:vi.x>=0&&vi.y>=0&&vi.x+vi.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,vi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vi.x),l.addScaledVector(o,vi.y),l.addScaledVector(a,vi.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return nh.setScalar(0),ih.setScalar(0),sh.setScalar(0),nh.fromBufferAttribute(t,e),ih.fromBufferAttribute(t,i),sh.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(nh,r.x),o.addScaledVector(ih,r.y),o.addScaledVector(sh,r.z),o}static isFrontFacing(t,e,i,s){return kn.subVectors(i,e),yi.subVectors(t,e),kn.cross(yi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return kn.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),kn.cross(yi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;dr.subVectors(s,i),fr.subVectors(r,i),jc.subVectors(t,i);let l=dr.dot(jc),c=fr.dot(jc);if(l<=0&&c<=0)return e.copy(i);th.subVectors(t,s);let h=dr.dot(th),u=fr.dot(th);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(dr,o);eh.subVectors(t,r);let p=dr.dot(eh),g=fr.dot(eh);if(g>=0&&p<=g)return e.copy(r);let _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(fr,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return qp.subVectors(r,s),a=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(qp,a);let f=1/(m+_+d);return o=_*f,a=d*f,e.copy(i).addScaledVector(dr,o).addScaledVector(fr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},qm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},Ha={h:0,s:0,l:0};function rh(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var ce=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=wn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=de.workingColorSpace){return this.r=t,this.g=e,this.b=i,de.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=de.workingColorSpace){if(t=mx(t,1),e=pn(e,0,1),i=pn(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=rh(o,r,t+1/3),this.g=rh(o,r,t),this.b=rh(o,r,t-1/3)}return de.toWorkingColorSpace(this,s),this}setStyle(t,e=wn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=wn){let i=qm[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ei(t.r),this.g=Ei(t.g),this.b=Ei(t.b),this}copyLinearToSRGB(t){return this.r=Sr(t.r),this.g=Sr(t.g),this.b=Sr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=wn){return de.fromWorkingColorSpace(Qe.copy(this),t),Math.round(pn(Qe.r*255,0,255))*65536+Math.round(pn(Qe.g*255,0,255))*256+Math.round(pn(Qe.b*255,0,255))}getHexString(t=wn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.fromWorkingColorSpace(Qe.copy(this),e);let i=Qe.r,s=Qe.g,r=Qe.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=de.workingColorSpace){return de.fromWorkingColorSpace(Qe.copy(this),e),t.r=Qe.r,t.g=Qe.g,t.b=Qe.b,t}getStyle(t=wn){de.fromWorkingColorSpace(Qe.copy(this),t);let e=Qe.r,i=Qe.g,s=Qe.b;return t!==wn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL($i),this.setHSL($i.h+t,$i.s+e,$i.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL($i),t.getHSL(Ha);let i=Hc($i.h,Ha.h,e),s=Hc($i.s,Ha.s,e),r=Hc($i.l,Ha.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Qe=new ce;ce.NAMES=qm;var Rx=0,is=class extends es{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rx++}),this.uuid=So(),this.name="",this.blending=yr,this.side=ts,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yh,this.blendDst=vh,this.blendEquation=Ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ce(0,0,0),this.blendAlpha=0,this.depthFunc=br,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sr,this.stencilZFail=sr,this.stencilZPass=sr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==yr&&(i.blending=this.blending),this.side!==ts&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==yh&&(i.blendSrc=this.blendSrc),this.blendDst!==vh&&(i.blendDst=this.blendDst),this.blendEquation!==Ms&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==br&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==sr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==sr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==sr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},vl=class extends is{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=Dm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ve=new k,Ga=new me,En=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ip,this.updateRanges=[],this.gpuType=Ti,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ga.fromBufferAttribute(this,e),Ga.applyMatrix3(t),this.setXY(e,Ga.x,Ga.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ro(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=fn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ro(e,this.array)),e}setX(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ro(e,this.array)),e}setY(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ro(e,this.array)),e}setZ(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ro(e,this.array)),e}setW(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),i=fn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),i=fn(i,this.array),s=fn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),i=fn(i,this.array),s=fn(s,this.array),r=fn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ip&&(t.usage=this.usage),t}};var Sl=class extends En{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Ml=class extends En{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Ye=class extends En{constructor(t,e,i){super(new Float32Array(t),e,i)}},Px=0,Tn=new De,oh=new on,pr=new k,xn=new As,co=new As,Xe=new k,yn=class n extends es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Px++}),this.uuid=So(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ym(t)?Ml:Sl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new jt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Tn.makeRotationFromQuaternion(t),this.applyMatrix4(Tn),this}rotateX(t){return Tn.makeRotationX(t),this.applyMatrix4(Tn),this}rotateY(t){return Tn.makeRotationY(t),this.applyMatrix4(Tn),this}rotateZ(t){return Tn.makeRotationZ(t),this.applyMatrix4(Tn),this}translate(t,e,i){return Tn.makeTranslation(t,e,i),this.applyMatrix4(Tn),this}scale(t,e,i){return Tn.makeScale(t,e,i),this.applyMatrix4(Tn),this}lookAt(t){return oh.lookAt(t),oh.updateMatrix(),this.applyMatrix4(oh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pr).negate(),this.translate(pr.x,pr.y,pr.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ye(i,3))}else{for(let i=0,s=e.count;i<s;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new As);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];xn.setFromBufferAttribute(r),this.morphTargetsRelative?(Xe.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(Xe),Xe.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(Xe)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cr);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){let i=this.boundingSphere.center;if(xn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];co.setFromBufferAttribute(a),this.morphTargetsRelative?(Xe.addVectors(xn.min,co.min),xn.expandByPoint(Xe),Xe.addVectors(xn.max,co.max),xn.expandByPoint(Xe)):(xn.expandByPoint(co.min),xn.expandByPoint(co.max))}xn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Xe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Xe));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Xe.fromBufferAttribute(a,c),l&&(pr.fromBufferAttribute(t,c),Xe.add(pr)),s=Math.max(s,i.distanceToSquared(Xe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new En(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<i.count;P++)a[P]=new k,l[P]=new k;let c=new k,h=new k,u=new k,d=new me,p=new me,g=new me,_=new k,m=new k;function f(P,M,v){c.fromBufferAttribute(i,P),h.fromBufferAttribute(i,M),u.fromBufferAttribute(i,v),d.fromBufferAttribute(r,P),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,v),h.sub(c),u.sub(c),p.sub(d),g.sub(d);let N=1/(p.x*g.y-g.x*p.y);isFinite(N)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(N),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(N),a[P].add(_),a[M].add(_),a[v].add(_),l[P].add(m),l[M].add(m),l[v].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let P=0,M=w.length;P<M;++P){let v=w[P],N=v.start,X=v.count;for(let Y=N,J=N+X;Y<J;Y+=3)f(t.getX(Y+0),t.getX(Y+1),t.getX(Y+2))}let T=new k,y=new k,I=new k,A=new k;function C(P){I.fromBufferAttribute(s,P),A.copy(I);let M=a[P];T.copy(M),T.sub(I.multiplyScalar(I.dot(M))).normalize(),y.crossVectors(A,M);let N=y.dot(l[P])<0?-1:1;o.setXYZW(P,T.x,T.y,T.z,N)}for(let P=0,M=w.length;P<M;++P){let v=w[P],N=v.start,X=v.count;for(let Y=N,J=N+X;Y<J;Y+=3)C(t.getX(Y+0)),C(t.getX(Y+1)),C(t.getX(Y+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new En(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);let s=new k,r=new k,o=new k,a=new k,l=new k,c=new k,h=new k,u=new k;if(t)for(let d=0,p=t.count;d<p;d+=3){let g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Xe.fromBufferAttribute(t,e),Xe.normalize(),t.setXYZ(e,Xe.x,Xe.y,Xe.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new En(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,i);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],p=t(d,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},$p=new De,_s=new xl,Wa=new Cr,Zp=new k,Xa=new k,Ya=new k,qa=new k,ah=new k,$a=new k,Kp=new k,Za=new k,Ie=class extends on{constructor(t=new yn,e=new vl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){$a.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(ah.fromBufferAttribute(u,t),o?$a.addScaledVector(ah,h):$a.addScaledVector(ah.sub(e),h))}e.add($a)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Wa.copy(i.boundingSphere),Wa.applyMatrix4(r),_s.copy(t.ray).recast(t.near),!(Wa.containsPoint(_s.origin)===!1&&(_s.intersectSphere(Wa,Zp)===null||_s.origin.distanceToSquared(Zp)>(t.far-t.near)**2))&&($p.copy(r).invert(),_s.copy(t.ray).applyMatrix4($p),!(i.boundingBox!==null&&_s.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,_s)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],f=o[m.materialIndex],w=Math.max(m.start,p.start),T=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=w,I=T;y<I;y+=3){let A=a.getX(y),C=a.getX(y+1),P=a.getX(y+2);s=Ka(this,f,t,i,c,h,u,A,C,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let w=a.getX(m),T=a.getX(m+1),y=a.getX(m+2);s=Ka(this,o,t,i,c,h,u,w,T,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],f=o[m.materialIndex],w=Math.max(m.start,p.start),T=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=w,I=T;y<I;y+=3){let A=y,C=y+1,P=y+2;s=Ka(this,f,t,i,c,h,u,A,C,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let w=m,T=m+1,y=m+2;s=Ka(this,o,t,i,c,h,u,w,T,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Ix(n,t,e,i,s,r,o,a){let l;if(t.side===mn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===ts,a),l===null)return null;Za.copy(a),Za.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Za);return c<e.near||c>e.far?null:{distance:c,point:Za.clone(),object:n}}function Ka(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,Xa),n.getVertexPosition(l,Ya),n.getVertexPosition(c,qa);let h=Ix(n,t,e,i,Xa,Ya,qa,Kp);if(h){let u=new k;Ji.getBarycoord(Kp,Xa,Ya,qa,u),s&&(h.uv=Ji.getInterpolatedAttribute(s,a,l,c,u,new me)),r&&(h.uv1=Ji.getInterpolatedAttribute(r,a,l,c,u,new me)),o&&(h.normal=Ji.getInterpolatedAttribute(o,a,l,c,u,new k),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new k,materialIndex:0};Ji.getNormal(Xa,Ya,qa,d.normal),h.face=d,h.barycoord=u}return h}var ri=class n extends yn{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ye(c,3)),this.setAttribute("normal",new Ye(h,3)),this.setAttribute("uv",new Ye(u,2));function g(_,m,f,w,T,y,I,A,C,P,M){let v=y/C,N=I/P,X=y/2,Y=I/2,J=A/2,z=C+1,L=P+1,W=0,R=0,D=new k;for(let $=0;$<L;$++){let Z=$*N-Y;for(let tt=0;tt<z;tt++){let mt=tt*v-X;D[_]=mt*w,D[m]=Z*T,D[f]=J,c.push(D.x,D.y,D.z),D[_]=0,D[m]=0,D[f]=A>0?1:-1,h.push(D.x,D.y,D.z),u.push(tt/C),u.push(1-$/P),W+=1}}for(let $=0;$<P;$++)for(let Z=0;Z<C;Z++){let tt=d+Z+z*$,mt=d+Z+z*($+1),V=d+(Z+1)+z*($+1),j=d+(Z+1)+z*$;l.push(tt,mt,j),l.push(mt,V,j),R+=6}a.addGroup(p,R,M),p+=R,d+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Rr(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function rn(n){let t={};for(let e=0;e<n.length;e++){let i=Rr(n[e]);for(let s in i)t[s]=i[s]}return t}function Dx(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function $m(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}var Lx={clone:Rr,merge:rn},Ux=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,oi=class extends is{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ux,this.fragmentShader=Nx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rr(t.uniforms),this.uniformsGroups=Dx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},bl=class extends on{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new De,this.projectionMatrix=new De,this.projectionMatrixInverse=new De,this.coordinateSystem=wi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Zi=new k,Jp=new me,Qp=new me,je=class extends bl{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ru*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(dl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ru*2*Math.atan(Math.tan(dl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Zi.x,Zi.y).multiplyScalar(-t/Zi.z),Zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Zi.x,Zi.y).multiplyScalar(-t/Zi.z)}getViewSize(t,e){return this.getViewBounds(t,Jp,Qp),e.subVectors(Qp,Jp)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(dl*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},mr=-90,gr=1,cu=class extends on{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new je(mr,gr,t,e);s.layers=this.layers,this.add(s);let r=new je(mr,gr,t,e);r.layers=this.layers,this.add(r);let o=new je(mr,gr,t,e);o.layers=this.layers,this.add(o);let a=new je(mr,gr,t,e);a.layers=this.layers,this.add(a);let l=new je(mr,gr,t,e);l.layers=this.layers,this.add(l);let c=new je(mr,gr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===wi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===pl)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Tl=class extends An{constructor(t,e,i,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Tr,super(t,e,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},hu=class extends Ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Tl(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ni}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ri(5,5,5),r=new oi({name:"CubemapFromEquirect",uniforms:Rr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:mn,blending:Qi});r.uniforms.tEquirect.value=e;let o=new Ie(s,r),a=e.minFilter;return e.minFilter===ws&&(e.minFilter=ni),new cu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},lh=new k,Fx=new k,Ox=new jt,Mi=class{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=lh.subVectors(i,e).cross(Fx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(lh),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Ox.getNormalMatrix(t),s=this.coplanarPoint(lh).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},xs=new Cr,Ja=new k,_o=class{constructor(t=new Mi,e=new Mi,i=new Mi,s=new Mi,r=new Mi,o=new Mi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=wi){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],_=s[10],m=s[11],f=s[12],w=s[13],T=s[14],y=s[15];if(i[0].setComponents(l-r,d-c,m-p,y-f).normalize(),i[1].setComponents(l+r,d+c,m+p,y+f).normalize(),i[2].setComponents(l+o,d+h,m+g,y+w).normalize(),i[3].setComponents(l-o,d-h,m-g,y-w).normalize(),i[4].setComponents(l-a,d-u,m-_,y-T).normalize(),e===wi)i[5].setComponents(l+a,d+u,m+_,y+T).normalize();else if(e===pl)i[5].setComponents(a,u,_,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),xs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),xs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(xs)}intersectsSprite(t){return xs.center.set(0,0,0),xs.radius=.7071067811865476,xs.applyMatrix4(t.matrixWorld),this.intersectsSphere(xs)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(Ja.x=s.normal.x>0?t.max.x:t.min.x,Ja.y=s.normal.y>0?t.max.y:t.min.y,Ja.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ja)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Zm(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Bx(n){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){let g=u[d],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){let _=u[p];n.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var wl=class n extends yn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){let w=f*d-o;for(let T=0;T<c;T++){let y=T*u-r;g.push(y,-w,0),_.push(0,0,1),m.push(T/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let w=0;w<a;w++){let T=w+c*f,y=w+c*(f+1),I=w+1+c*(f+1),A=w+1+c*f;p.push(T,y,A),p.push(y,I,A)}this.setIndex(p),this.setAttribute("position",new Ye(g,3)),this.setAttribute("normal",new Ye(_,3)),this.setAttribute("uv",new Ye(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},zx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vx=`#ifdef USE_ALPHAHASH
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
#endif`,kx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Wx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xx=`#ifdef USE_AOMAP
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
#endif`,Yx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qx=`#ifdef USE_BATCHING
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
#endif`,$x=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Kx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Qx=`#ifdef USE_IRIDESCENCE
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
#endif`,jx=`#ifdef USE_BUMPMAP
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
#endif`,ty=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ey=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ny=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,iy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ry=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,oy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ay=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ly=`#define PI 3.141592653589793
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
} // validated`,cy=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hy=`vec3 transformedNormal = objectNormal;
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
#endif`,uy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,py=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,my="gl_FragColor = linearToOutputTexel( gl_FragColor );",gy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_y=`#ifdef USE_ENVMAP
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
#endif`,xy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yy=`#ifdef USE_ENVMAP
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
#endif`,vy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sy=`#ifdef USE_ENVMAP
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
#endif`,My=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,by=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ty=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ey=`#ifdef USE_GRADIENTMAP
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
}`,Ay=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ry=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Py=`uniform bool receiveShadow;
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
#endif`,Iy=`#ifdef USE_ENVMAP
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
#endif`,Dy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ly=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Uy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ny=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Fy=`PhysicalMaterial material;
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
#endif`,Oy=`struct PhysicalMaterial {
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
}`,By=`
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
#endif`,zy=`#if defined( RE_IndirectDiffuse )
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
#endif`,Vy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ky=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hy=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wy=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,$y=`#if defined( USE_POINTS_UV )
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
#endif`,Zy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ky=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tv=`#ifdef USE_MORPHTARGETS
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
#endif`,ev=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,iv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,sv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ov=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,av=`#ifdef USE_NORMALMAP
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
#endif`,lv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,uv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,pv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_v=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,bv=`float getShadowMask() {
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
}`,Tv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wv=`#ifdef USE_SKINNING
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
#endif`,Ev=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Av=`#ifdef USE_SKINNING
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
#endif`,Cv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Iv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dv=`#ifdef USE_TRANSMISSION
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
#endif`,Lv=`#ifdef USE_TRANSMISSION
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
#endif`,Uv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ov=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Bv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zv=`uniform sampler2D t2D;
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
}`,Vv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Hv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wv=`#include <common>
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
}`,Xv=`#if DEPTH_PACKING == 3200
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
}`,Yv=`#define DISTANCE
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
}`,qv=`#define DISTANCE
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
}`,$v=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kv=`uniform float scale;
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
}`,Jv=`uniform vec3 diffuse;
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
}`,Qv=`#include <common>
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
}`,jv=`uniform vec3 diffuse;
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
}`,tS=`#define LAMBERT
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
}`,eS=`#define LAMBERT
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
}`,nS=`#define MATCAP
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
}`,iS=`#define MATCAP
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
}`,sS=`#define NORMAL
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
}`,rS=`#define NORMAL
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
}`,oS=`#define PHONG
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
}`,aS=`#define PHONG
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
}`,lS=`#define STANDARD
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
}`,cS=`#define STANDARD
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
}`,hS=`#define TOON
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
}`,uS=`#define TOON
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
}`,dS=`uniform float size;
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
}`,fS=`uniform vec3 diffuse;
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
}`,pS=`#include <common>
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
}`,mS=`uniform vec3 color;
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
}`,gS=`uniform float rotation;
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
}`,_S=`uniform vec3 diffuse;
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
}`,ee={alphahash_fragment:zx,alphahash_pars_fragment:Vx,alphamap_fragment:kx,alphamap_pars_fragment:Hx,alphatest_fragment:Gx,alphatest_pars_fragment:Wx,aomap_fragment:Xx,aomap_pars_fragment:Yx,batching_pars_vertex:qx,batching_vertex:$x,begin_vertex:Zx,beginnormal_vertex:Kx,bsdfs:Jx,iridescence_fragment:Qx,bumpmap_pars_fragment:jx,clipping_planes_fragment:ty,clipping_planes_pars_fragment:ey,clipping_planes_pars_vertex:ny,clipping_planes_vertex:iy,color_fragment:sy,color_pars_fragment:ry,color_pars_vertex:oy,color_vertex:ay,common:ly,cube_uv_reflection_fragment:cy,defaultnormal_vertex:hy,displacementmap_pars_vertex:uy,displacementmap_vertex:dy,emissivemap_fragment:fy,emissivemap_pars_fragment:py,colorspace_fragment:my,colorspace_pars_fragment:gy,envmap_fragment:_y,envmap_common_pars_fragment:xy,envmap_pars_fragment:yy,envmap_pars_vertex:vy,envmap_physical_pars_fragment:Iy,envmap_vertex:Sy,fog_vertex:My,fog_pars_vertex:by,fog_fragment:Ty,fog_pars_fragment:wy,gradientmap_pars_fragment:Ey,lightmap_pars_fragment:Ay,lights_lambert_fragment:Cy,lights_lambert_pars_fragment:Ry,lights_pars_begin:Py,lights_toon_fragment:Dy,lights_toon_pars_fragment:Ly,lights_phong_fragment:Uy,lights_phong_pars_fragment:Ny,lights_physical_fragment:Fy,lights_physical_pars_fragment:Oy,lights_fragment_begin:By,lights_fragment_maps:zy,lights_fragment_end:Vy,logdepthbuf_fragment:ky,logdepthbuf_pars_fragment:Hy,logdepthbuf_pars_vertex:Gy,logdepthbuf_vertex:Wy,map_fragment:Xy,map_pars_fragment:Yy,map_particle_fragment:qy,map_particle_pars_fragment:$y,metalnessmap_fragment:Zy,metalnessmap_pars_fragment:Ky,morphinstance_vertex:Jy,morphcolor_vertex:Qy,morphnormal_vertex:jy,morphtarget_pars_vertex:tv,morphtarget_vertex:ev,normal_fragment_begin:nv,normal_fragment_maps:iv,normal_pars_fragment:sv,normal_pars_vertex:rv,normal_vertex:ov,normalmap_pars_fragment:av,clearcoat_normal_fragment_begin:lv,clearcoat_normal_fragment_maps:cv,clearcoat_pars_fragment:hv,iridescence_pars_fragment:uv,opaque_fragment:dv,packing:fv,premultiplied_alpha_fragment:pv,project_vertex:mv,dithering_fragment:gv,dithering_pars_fragment:_v,roughnessmap_fragment:xv,roughnessmap_pars_fragment:yv,shadowmap_pars_fragment:vv,shadowmap_pars_vertex:Sv,shadowmap_vertex:Mv,shadowmask_pars_fragment:bv,skinbase_vertex:Tv,skinning_pars_vertex:wv,skinning_vertex:Ev,skinnormal_vertex:Av,specularmap_fragment:Cv,specularmap_pars_fragment:Rv,tonemapping_fragment:Pv,tonemapping_pars_fragment:Iv,transmission_fragment:Dv,transmission_pars_fragment:Lv,uv_pars_fragment:Uv,uv_pars_vertex:Nv,uv_vertex:Fv,worldpos_vertex:Ov,background_vert:Bv,background_frag:zv,backgroundCube_vert:Vv,backgroundCube_frag:kv,cube_vert:Hv,cube_frag:Gv,depth_vert:Wv,depth_frag:Xv,distanceRGBA_vert:Yv,distanceRGBA_frag:qv,equirect_vert:$v,equirect_frag:Zv,linedashed_vert:Kv,linedashed_frag:Jv,meshbasic_vert:Qv,meshbasic_frag:jv,meshlambert_vert:tS,meshlambert_frag:eS,meshmatcap_vert:nS,meshmatcap_frag:iS,meshnormal_vert:sS,meshnormal_frag:rS,meshphong_vert:oS,meshphong_frag:aS,meshphysical_vert:lS,meshphysical_frag:cS,meshtoon_vert:hS,meshtoon_frag:uS,points_vert:dS,points_frag:fS,shadow_vert:pS,shadow_frag:mS,sprite_vert:gS,sprite_frag:_S},yt={common:{diffuse:{value:new ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},envMapRotation:{value:new jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new ce(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},ei={basic:{uniforms:rn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:rn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new ce(0)}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:rn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new ce(0)},specular:{value:new ce(1118481)},shininess:{value:30}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:rn([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:rn([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new ce(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:rn([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:rn([yt.points,yt.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:rn([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:rn([yt.common,yt.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:rn([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:rn([yt.sprite,yt.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new jt}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distanceRGBA:{uniforms:rn([yt.common,yt.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distanceRGBA_vert,fragmentShader:ee.distanceRGBA_frag},shadow:{uniforms:rn([yt.lights,yt.fog,{color:{value:new ce(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};ei.physical={uniforms:rn([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new ce(0)},specularColor:{value:new ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};var Qa={r:0,b:0,g:0},ys=new si,xS=new De;function yS(n,t,e,i,s,r,o){let a=new ce(0),l=r===!0?0:1,c,h,u=null,d=0,p=null;function g(w){let T=w.isScene===!0?w.background:null;return T&&T.isTexture&&(T=(w.backgroundBlurriness>0?e:t).get(T)),T}function _(w){let T=!1,y=g(w);y===null?f(a,l):y&&y.isColor&&(f(y,1),T=!0);let I=n.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,T){let y=g(T);y&&(y.isCubeTexture||y.mapping===Vl)?(h===void 0&&(h=new Ie(new ri(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:Rr(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ys.copy(T.backgroundRotation),ys.x*=-1,ys.y*=-1,ys.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(xS.makeRotationFromEuler(ys)),h.material.toneMapped=de.getTransfer(y.colorSpace)!==Me,(u!==y||d!==y.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,p=n.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ie(new wl(2,2),new oi({name:"BackgroundMaterial",uniforms:Rr(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:ts,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=de.getTransfer(y.colorSpace)!==Me,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,p=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function f(w,T){w.getRGB(Qa,$m(n)),i.buffers.color.setClear(Qa.r,Qa.g,Qa.b,T,o)}return{getClearColor:function(){return a},setClearColor:function(w,T=1){a.set(w),l=T,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,f(a,l)},render:_,addToRenderList:m}}function vS(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,o=!1;function a(v,N,X,Y,J){let z=!1,L=u(Y,X,N);r!==L&&(r=L,c(r.object)),z=p(v,Y,X,J),z&&g(v,Y,X,J),J!==null&&t.update(J,n.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,y(v,N,X,Y),J!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function l(){return n.createVertexArray()}function c(v){return n.bindVertexArray(v)}function h(v){return n.deleteVertexArray(v)}function u(v,N,X){let Y=X.wireframe===!0,J=i[v.id];J===void 0&&(J={},i[v.id]=J);let z=J[N.id];z===void 0&&(z={},J[N.id]=z);let L=z[Y];return L===void 0&&(L=d(l()),z[Y]=L),L}function d(v){let N=[],X=[],Y=[];for(let J=0;J<e;J++)N[J]=0,X[J]=0,Y[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:X,attributeDivisors:Y,object:v,attributes:{},index:null}}function p(v,N,X,Y){let J=r.attributes,z=N.attributes,L=0,W=X.getAttributes();for(let R in W)if(W[R].location>=0){let $=J[R],Z=z[R];if(Z===void 0&&(R==="instanceMatrix"&&v.instanceMatrix&&(Z=v.instanceMatrix),R==="instanceColor"&&v.instanceColor&&(Z=v.instanceColor)),$===void 0||$.attribute!==Z||Z&&$.data!==Z.data)return!0;L++}return r.attributesNum!==L||r.index!==Y}function g(v,N,X,Y){let J={},z=N.attributes,L=0,W=X.getAttributes();for(let R in W)if(W[R].location>=0){let $=z[R];$===void 0&&(R==="instanceMatrix"&&v.instanceMatrix&&($=v.instanceMatrix),R==="instanceColor"&&v.instanceColor&&($=v.instanceColor));let Z={};Z.attribute=$,$&&$.data&&(Z.data=$.data),J[R]=Z,L++}r.attributes=J,r.attributesNum=L,r.index=Y}function _(){let v=r.newAttributes;for(let N=0,X=v.length;N<X;N++)v[N]=0}function m(v){f(v,0)}function f(v,N){let X=r.newAttributes,Y=r.enabledAttributes,J=r.attributeDivisors;X[v]=1,Y[v]===0&&(n.enableVertexAttribArray(v),Y[v]=1),J[v]!==N&&(n.vertexAttribDivisor(v,N),J[v]=N)}function w(){let v=r.newAttributes,N=r.enabledAttributes;for(let X=0,Y=N.length;X<Y;X++)N[X]!==v[X]&&(n.disableVertexAttribArray(X),N[X]=0)}function T(v,N,X,Y,J,z,L){L===!0?n.vertexAttribIPointer(v,N,X,J,z):n.vertexAttribPointer(v,N,X,Y,J,z)}function y(v,N,X,Y){_();let J=Y.attributes,z=X.getAttributes(),L=N.defaultAttributeValues;for(let W in z){let R=z[W];if(R.location>=0){let D=J[W];if(D===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(D=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(D=v.instanceColor)),D!==void 0){let $=D.normalized,Z=D.itemSize,tt=t.get(D);if(tt===void 0)continue;let mt=tt.buffer,V=tt.type,j=tt.bytesPerElement,lt=V===n.INT||V===n.UNSIGNED_INT||D.gpuType===Uu;if(D.isInterleavedBufferAttribute){let ht=D.data,bt=ht.stride,St=D.offset;if(ht.isInstancedInterleavedBuffer){for(let Ct=0;Ct<R.locationSize;Ct++)f(R.location+Ct,ht.meshPerAttribute);v.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let Ct=0;Ct<R.locationSize;Ct++)m(R.location+Ct);n.bindBuffer(n.ARRAY_BUFFER,mt);for(let Ct=0;Ct<R.locationSize;Ct++)T(R.location+Ct,Z/R.locationSize,V,$,bt*j,(St+Z/R.locationSize*Ct)*j,lt)}else{if(D.isInstancedBufferAttribute){for(let ht=0;ht<R.locationSize;ht++)f(R.location+ht,D.meshPerAttribute);v.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=D.meshPerAttribute*D.count)}else for(let ht=0;ht<R.locationSize;ht++)m(R.location+ht);n.bindBuffer(n.ARRAY_BUFFER,mt);for(let ht=0;ht<R.locationSize;ht++)T(R.location+ht,Z/R.locationSize,V,$,Z*j,Z/R.locationSize*ht*j,lt)}}else if(L!==void 0){let $=L[W];if($!==void 0)switch($.length){case 2:n.vertexAttrib2fv(R.location,$);break;case 3:n.vertexAttrib3fv(R.location,$);break;case 4:n.vertexAttrib4fv(R.location,$);break;default:n.vertexAttrib1fv(R.location,$)}}}}w()}function I(){P();for(let v in i){let N=i[v];for(let X in N){let Y=N[X];for(let J in Y)h(Y[J].object),delete Y[J];delete N[X]}delete i[v]}}function A(v){if(i[v.id]===void 0)return;let N=i[v.id];for(let X in N){let Y=N[X];for(let J in Y)h(Y[J].object),delete Y[J];delete N[X]}delete i[v.id]}function C(v){for(let N in i){let X=i[N];if(X[v.id]===void 0)continue;let Y=X[v.id];for(let J in Y)h(Y[J].object),delete Y[J];delete X[v.id]}}function P(){M(),o=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:M,dispose:I,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:w}}function SS(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,i,1)}function l(c,h,u,d){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function MS(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==Hn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let P=C===vo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Ai&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Ti&&!P)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:y,vertexTextures:I,maxSamples:A}}function bS(n){let t=this,e=null,i=0,s=!1,r=!1,o=new Mi,a=new jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||i!==0||s;return s=d,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let w=r?0:i,T=w*4,y=f.clippingState||null;l.value=y,y=h(g,d,T,p);for(let I=0;I!==T;++I)y[I]=e[I];f.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,p,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let f=p+_*4,w=d.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<f)&&(m=new Float32Array(f));for(let T=0,y=p;T!==_;++T,y+=4)o.copy(u[T]).applyMatrix4(w,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function TS(n){let t=new WeakMap;function e(o,a){return a===Ch?o.mapping=Tr:a===Rh&&(o.mapping=wr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ch||a===Rh)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new hu(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var El=class extends bl{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},xr=4,jp=[.125,.215,.35,.446,.526,.582],bs=20,ch=new El,tm=new ce,hh=null,uh=0,dh=0,fh=!1,Ss=(1+Math.sqrt(5))/2,_r=1/Ss,em=[new k(-Ss,_r,0),new k(Ss,_r,0),new k(-_r,0,Ss),new k(_r,0,Ss),new k(0,Ss,-_r),new k(0,Ss,_r),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)],Al=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){hh=this._renderer.getRenderTarget(),uh=this._renderer.getActiveCubeFace(),dh=this._renderer.getActiveMipmapLevel(),fh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=im(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(hh,uh,dh),this._renderer.xr.enabled=fh,t.scissorTest=!1,ja(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Tr||t.mapping===wr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),hh=this._renderer.getRenderTarget(),uh=this._renderer.getActiveCubeFace(),dh=this._renderer.getActiveMipmapLevel(),fh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ni,minFilter:ni,generateMipmaps:!1,type:vo,format:Hn,colorSpace:Lr,depthBuffer:!1},s=nm(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nm(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wS(r)),this._blurMaterial=ES(r,t,e)}return s}_compileMaterial(t){let e=new Ie(this._lodPlanes[0],t);this._renderer.compile(e,ch)}_sceneToCubeUV(t,e,i,s){let a=new je(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(tm),h.toneMapping=ji,h.autoClear=!1;let p=new vl({name:"PMREM.Background",side:mn,depthWrite:!1,depthTest:!1}),g=new Ie(new ri,p),_=!1,m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(tm),_=!0);for(let f=0;f<6;f++){let w=f%3;w===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):w===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));let T=this._cubeSize;ja(s,w*T,f>2?T:0,T,T),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===Tr||t.mapping===wr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=sm()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=im());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ie(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;ja(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,ch)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=em[(s-r-1)%em.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ie(this._lodPlanes[s],c),d=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*bs-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):bs;m>bs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bs}`);let f=[],w=0;for(let C=0;C<bs;++C){let P=C/_,M=Math.exp(-P*P/2);f.push(M),C===0?w+=M:C<m&&(w+=2*M)}for(let C=0;C<f.length;C++)f[C]=f[C]/w;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:T}=this;d.dTheta.value=g,d.mipInt.value=T-i;let y=this._sizeLods[s],I=3*y*(s>T-xr?s-T+xr:0),A=4*(this._cubeSize-y);ja(e,I,A,3*y,2*y),l.setRenderTarget(e),l.render(u,ch)}};function wS(n){let t=[],e=[],i=[],s=n,r=n-xr+1+jp.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>n-xr?l=jp[o-n+xr-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,w=new Float32Array(_*g*p),T=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let A=0;A<p;A++){let C=A%3*2/3-1,P=A>2?0:-1,M=[C,P,0,C+2/3,P,0,C+2/3,P+1,0,C,P,0,C+2/3,P+1,0,C,P+1,0];w.set(M,_*g*A),T.set(d,m*g*A);let v=[A,A,A,A,A,A];y.set(v,f*g*A)}let I=new yn;I.setAttribute("position",new En(w,_)),I.setAttribute("uv",new En(T,m)),I.setAttribute("faceIndex",new En(y,f)),t.push(I),s>xr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function nm(n,t,e){let i=new Ci(n,t,e);return i.texture.mapping=Vl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ja(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function ES(n,t,e){let i=new Float32Array(bs),s=new k(0,1,0);return new oi({name:"SphericalGaussianBlur",defines:{n:bs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Vu(),fragmentShader:`

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
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function im(){return new oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vu(),fragmentShader:`

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
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function sm(){return new oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function Vu(){return`

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
	`}function AS(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Ch||l===Rh,h=l===Tr||l===wr;if(c||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Al(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let p=a.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new Al(n)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function CS(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&fo("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function RS(n,t,e,i){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)t.remove(_[m])}d.removeEventListener("dispose",o),delete s[d.id];let p=r.get(d);p&&(t.remove(p),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let g in d)t.update(d[g],n.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let _=p[g];for(let m=0,f=_.length;m<f;m++)t.update(_[m],n.ARRAY_BUFFER)}}function c(u){let d=[],p=u.index,g=u.attributes.position,_=0;if(p!==null){let w=p.array;_=p.version;for(let T=0,y=w.length;T<y;T+=3){let I=w[T+0],A=w[T+1],C=w[T+2];d.push(I,A,A,C,C,I)}}else if(g!==void 0){let w=g.array;_=g.version;for(let T=0,y=w.length/3-1;T<y;T+=3){let I=T+0,A=T+1,C=T+2;d.push(I,A,A,C,C,I)}}else return;let m=new(Ym(d)?Ml:Sl)(d,1);m.version=_;let f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function PS(n,t,e){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,p){n.drawElements(i,p,r,d*o),e.update(p,i,1)}function c(d,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,d*o,g),e.update(p,i,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,i,1)}function u(d,p,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,d,0,_,0,g);let f=0;for(let w=0;w<g;w++)f+=p[w]*_[w];e.update(f,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function IS(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function DS(n,t,e){let i=new WeakMap,s=new be;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(a);if(d===void 0||d.count!==u){let M=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],T=0;p===!0&&(T=1),g===!0&&(T=2),_===!0&&(T=3);let y=a.attributes.position.count*T,I=1;y>t.maxTextureSize&&(I=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let A=new Float32Array(y*I*4*u),C=new _l(A,y,I,u);C.type=Ti,C.needsUpdate=!0;let P=T*4;for(let v=0;v<u;v++){let N=m[v],X=f[v],Y=w[v],J=y*I*4*v;for(let z=0;z<N.count;z++){let L=z*P;p===!0&&(s.fromBufferAttribute(N,z),A[J+L+0]=s.x,A[J+L+1]=s.y,A[J+L+2]=s.z,A[J+L+3]=0),g===!0&&(s.fromBufferAttribute(X,z),A[J+L+4]=s.x,A[J+L+5]=s.y,A[J+L+6]=s.z,A[J+L+7]=0),_===!0&&(s.fromBufferAttribute(Y,z),A[J+L+8]=s.x,A[J+L+9]=s.y,A[J+L+10]=s.z,A[J+L+11]=Y.itemSize===4?s.w:1)}}d={count:u,texture:C,size:new me(y,I)},i.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let p=0;for(let _=0;_<c.length;_++)p+=c[_];let g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function LS(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var Cl=class extends An{constructor(t,e,i,s,r,o,a,l,c,h=vr){if(h!==vr&&h!==Ar)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===vr&&(i=Es),i===void 0&&h===Ar&&(i=Er),super(null,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Gn,this.minFilter=l!==void 0?l:Gn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Km=new An,rm=new Cl(1,1),Jm=new _l,Qm=new lu,jm=new Tl,om=[],am=[],lm=new Float32Array(16),cm=new Float32Array(9),hm=new Float32Array(4);function Ur(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=om[s];if(r===void 0&&(r=new Float32Array(s),om[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function ke(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function He(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Hl(n,t){let e=am[t];e===void 0&&(e=new Int32Array(t),am[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function US(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function NS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;n.uniform2fv(this.addr,t),He(e,t)}}function FS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ke(e,t))return;n.uniform3fv(this.addr,t),He(e,t)}}function OS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;n.uniform4fv(this.addr,t),He(e,t)}}function BS(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ke(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),He(e,t)}else{if(ke(e,i))return;hm.set(i),n.uniformMatrix2fv(this.addr,!1,hm),He(e,i)}}function zS(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ke(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),He(e,t)}else{if(ke(e,i))return;cm.set(i),n.uniformMatrix3fv(this.addr,!1,cm),He(e,i)}}function VS(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ke(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),He(e,t)}else{if(ke(e,i))return;lm.set(i),n.uniformMatrix4fv(this.addr,!1,lm),He(e,i)}}function kS(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function HS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;n.uniform2iv(this.addr,t),He(e,t)}}function GS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;n.uniform3iv(this.addr,t),He(e,t)}}function WS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;n.uniform4iv(this.addr,t),He(e,t)}}function XS(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function YS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;n.uniform2uiv(this.addr,t),He(e,t)}}function qS(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;n.uniform3uiv(this.addr,t),He(e,t)}}function $S(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;n.uniform4uiv(this.addr,t),He(e,t)}}function ZS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(rm.compareFunction=Xm,r=rm):r=Km,e.setTexture2D(t||r,s)}function KS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Qm,s)}function JS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||jm,s)}function QS(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Jm,s)}function jS(n){switch(n){case 5126:return US;case 35664:return NS;case 35665:return FS;case 35666:return OS;case 35674:return BS;case 35675:return zS;case 35676:return VS;case 5124:case 35670:return kS;case 35667:case 35671:return HS;case 35668:case 35672:return GS;case 35669:case 35673:return WS;case 5125:return XS;case 36294:return YS;case 36295:return qS;case 36296:return $S;case 35678:case 36198:case 36298:case 36306:case 35682:return ZS;case 35679:case 36299:case 36307:return KS;case 35680:case 36300:case 36308:case 36293:return JS;case 36289:case 36303:case 36311:case 36292:return QS}}function tM(n,t){n.uniform1fv(this.addr,t)}function eM(n,t){let e=Ur(t,this.size,2);n.uniform2fv(this.addr,e)}function nM(n,t){let e=Ur(t,this.size,3);n.uniform3fv(this.addr,e)}function iM(n,t){let e=Ur(t,this.size,4);n.uniform4fv(this.addr,e)}function sM(n,t){let e=Ur(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function rM(n,t){let e=Ur(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function oM(n,t){let e=Ur(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function aM(n,t){n.uniform1iv(this.addr,t)}function lM(n,t){n.uniform2iv(this.addr,t)}function cM(n,t){n.uniform3iv(this.addr,t)}function hM(n,t){n.uniform4iv(this.addr,t)}function uM(n,t){n.uniform1uiv(this.addr,t)}function dM(n,t){n.uniform2uiv(this.addr,t)}function fM(n,t){n.uniform3uiv(this.addr,t)}function pM(n,t){n.uniform4uiv(this.addr,t)}function mM(n,t,e){let i=this.cache,s=t.length,r=Hl(e,s);ke(i,r)||(n.uniform1iv(this.addr,r),He(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Km,r[o])}function gM(n,t,e){let i=this.cache,s=t.length,r=Hl(e,s);ke(i,r)||(n.uniform1iv(this.addr,r),He(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Qm,r[o])}function _M(n,t,e){let i=this.cache,s=t.length,r=Hl(e,s);ke(i,r)||(n.uniform1iv(this.addr,r),He(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||jm,r[o])}function xM(n,t,e){let i=this.cache,s=t.length,r=Hl(e,s);ke(i,r)||(n.uniform1iv(this.addr,r),He(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Jm,r[o])}function yM(n){switch(n){case 5126:return tM;case 35664:return eM;case 35665:return nM;case 35666:return iM;case 35674:return sM;case 35675:return rM;case 35676:return oM;case 5124:case 35670:return aM;case 35667:case 35671:return lM;case 35668:case 35672:return cM;case 35669:case 35673:return hM;case 5125:return uM;case 36294:return dM;case 36295:return fM;case 36296:return pM;case 35678:case 36198:case 36298:case 36306:case 35682:return mM;case 35679:case 36299:case 36307:return gM;case 35680:case 36300:case 36308:case 36293:return _M;case 36289:case 36303:case 36311:case 36292:return xM}}var uu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=jS(e.type)}},du=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=yM(e.type)}},fu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},ph=/(\w+)(\])?(\[|\.)?/g;function um(n,t){n.seq.push(t),n.map[t.id]=t}function vM(n,t,e){let i=n.name,s=i.length;for(ph.lastIndex=0;;){let r=ph.exec(i),o=ph.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){um(e,c===void 0?new uu(a,n,t):new du(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new fu(a),um(e,u)),e=u}}}var Mr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);vM(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function dm(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var SM=37297,MM=0;function bM(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var fm=new jt;function TM(n){de._getMatrix(fm,de.workingColorSpace,n);let t=`mat3( ${fm.elements.map(e=>e.toFixed(4))} )`;switch(de.getTransfer(n)){case kl:return[t,"LinearTransferOETF"];case Me:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function pm(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+bM(n.getShaderSource(t),o)}else return s}function wM(n,t){let e=TM(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function EM(n,t){let e;switch(t){case J_:e="Linear";break;case Q_:e="Reinhard";break;case j_:e="Cineon";break;case tx:e="ACESFilmic";break;case nx:e="AgX";break;case ix:e="Neutral";break;case ex:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var tl=new k;function AM(){de.getLuminanceCoefficients(tl);let n=tl.x.toFixed(4),t=tl.y.toFixed(4),e=tl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function CM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(po).join(`
`)}function RM(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function PM(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function po(n){return n!==""}function mm(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function gm(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var IM=/^[ \t]*#include +<([\w\d./]+)>/gm;function pu(n){return n.replace(IM,LM)}var DM=new Map;function LM(n,t){let e=ee[t];if(e===void 0){let i=DM.get(t);if(i!==void 0)e=ee[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return pu(e)}var UM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _m(n){return n.replace(UM,NM)}function NM(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function xm(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function FM(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Im?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===P_?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Si&&(t="SHADOWMAP_TYPE_VSM"),t}function OM(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Tr:case wr:t="ENVMAP_TYPE_CUBE";break;case Vl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function BM(n){let t="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===wr&&(t="ENVMAP_MODE_REFRACTION"),t}function zM(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Dm:t="ENVMAP_BLENDING_MULTIPLY";break;case Z_:t="ENVMAP_BLENDING_MIX";break;case K_:t="ENVMAP_BLENDING_ADD";break}return t}function VM(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function kM(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=FM(e),c=OM(e),h=BM(e),u=zM(e),d=VM(e),p=CM(e),g=RM(r),_=s.createProgram(),m,f,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(po).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(po).join(`
`),f.length>0&&(f+=`
`)):(m=[xm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(po).join(`
`),f=[xm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ji?"#define TONE_MAPPING":"",e.toneMapping!==ji?ee.tonemapping_pars_fragment:"",e.toneMapping!==ji?EM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,wM("linearToOutputTexel",e.outputColorSpace),AM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(po).join(`
`)),o=pu(o),o=mm(o,e),o=gm(o,e),a=pu(a),a=mm(a,e),a=gm(a,e),o=_m(o),a=_m(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Dp?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Dp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let T=w+m+o,y=w+f+a,I=dm(s,s.VERTEX_SHADER,T),A=dm(s,s.FRAGMENT_SHADER,y);s.attachShader(_,I),s.attachShader(_,A),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(N){if(n.debug.checkShaderErrors){let X=s.getProgramInfoLog(_).trim(),Y=s.getShaderInfoLog(I).trim(),J=s.getShaderInfoLog(A).trim(),z=!0,L=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,I,A);else{let W=pm(s,I,"vertex"),R=pm(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+X+`
`+W+`
`+R)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(Y===""||J==="")&&(L=!1);L&&(N.diagnostics={runnable:z,programLog:X,vertexShader:{log:Y,prefix:m},fragmentShader:{log:J,prefix:f}})}s.deleteShader(I),s.deleteShader(A),P=new Mr(s,_),M=PM(s,_)}let P;this.getUniforms=function(){return P===void 0&&C(this),P};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(_,SM)),v},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=MM++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=A,this}var HM=0,mu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new gu(t),e.set(t,i)),i}},gu=class{constructor(t){this.id=HM++,this.code=t,this.usedTimes=0}};function GM(n,t,e,i,s,r,o){let a=new yl,l=new mu,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,v,N,X,Y){let J=X.fog,z=Y.geometry,L=M.isMeshStandardMaterial?X.environment:null,W=(M.isMeshStandardMaterial?e:t).get(M.envMap||L),R=W&&W.mapping===Vl?W.image.height:null,D=g[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));let $=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Z=$!==void 0?$.length:0,tt=0;z.morphAttributes.position!==void 0&&(tt=1),z.morphAttributes.normal!==void 0&&(tt=2),z.morphAttributes.color!==void 0&&(tt=3);let mt,V,j,lt;if(D){let ae=ei[D];mt=ae.vertexShader,V=ae.fragmentShader}else mt=M.vertexShader,V=M.fragmentShader,l.update(M),j=l.getVertexShaderID(M),lt=l.getFragmentShaderID(M);let ht=n.getRenderTarget(),bt=n.state.buffers.depth.getReversed(),St=Y.isInstancedMesh===!0,Ct=Y.isBatchedMesh===!0,$t=!!M.map,Yt=!!M.matcap,Kt=!!W,F=!!M.aoMap,ye=!!M.lightMap,Lt=!!M.bumpMap,Wt=!!M.normalMap,Ut=!!M.displacementMap,te=!!M.emissiveMap,Rt=!!M.metalnessMap,E=!!M.roughnessMap,x=M.anisotropy>0,q=M.clearcoat>0,rt=M.dispersion>0,at=M.iridescence>0,ot=M.sheen>0,Dt=M.transmission>0,_t=x&&!!M.anisotropyMap,Mt=q&&!!M.clearcoatMap,ne=q&&!!M.clearcoatNormalMap,dt=q&&!!M.clearcoatRoughnessMap,Et=at&&!!M.iridescenceMap,Pt=at&&!!M.iridescenceThicknessMap,Ht=ot&&!!M.sheenColorMap,Tt=ot&&!!M.sheenRoughnessMap,It=!!M.specularMap,Ot=!!M.specularColorMap,_e=!!M.specularIntensityMap,O=Dt&&!!M.transmissionMap,vt=Dt&&!!M.thicknessMap,it=!!M.gradientMap,ct=!!M.alphaMap,At=M.alphaTest>0,xt=!!M.alphaHash,Xt=!!M.extensions,Ee=ji;M.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(Ee=n.toneMapping);let We={shaderID:D,shaderType:M.type,shaderName:M.name,vertexShader:mt,fragmentShader:V,defines:M.defines,customVertexShaderID:j,customFragmentShaderID:lt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Ct,batchingColor:Ct&&Y._colorsTexture!==null,instancing:St,instancingColor:St&&Y.instanceColor!==null,instancingMorph:St&&Y.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ht===null?n.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:Lr,alphaToCoverage:!!M.alphaToCoverage,map:$t,matcap:Yt,envMap:Kt,envMapMode:Kt&&W.mapping,envMapCubeUVHeight:R,aoMap:F,lightMap:ye,bumpMap:Lt,normalMap:Wt,displacementMap:d&&Ut,emissiveMap:te,normalMapObjectSpace:Wt&&M.normalMapType===ax,normalMapTangentSpace:Wt&&M.normalMapType===Wm,metalnessMap:Rt,roughnessMap:E,anisotropy:x,anisotropyMap:_t,clearcoat:q,clearcoatMap:Mt,clearcoatNormalMap:ne,clearcoatRoughnessMap:dt,dispersion:rt,iridescence:at,iridescenceMap:Et,iridescenceThicknessMap:Pt,sheen:ot,sheenColorMap:Ht,sheenRoughnessMap:Tt,specularMap:It,specularColorMap:Ot,specularIntensityMap:_e,transmission:Dt,transmissionMap:O,thicknessMap:vt,gradientMap:it,opaque:M.transparent===!1&&M.blending===yr&&M.alphaToCoverage===!1,alphaMap:ct,alphaTest:At,alphaHash:xt,combine:M.combine,mapUv:$t&&_(M.map.channel),aoMapUv:F&&_(M.aoMap.channel),lightMapUv:ye&&_(M.lightMap.channel),bumpMapUv:Lt&&_(M.bumpMap.channel),normalMapUv:Wt&&_(M.normalMap.channel),displacementMapUv:Ut&&_(M.displacementMap.channel),emissiveMapUv:te&&_(M.emissiveMap.channel),metalnessMapUv:Rt&&_(M.metalnessMap.channel),roughnessMapUv:E&&_(M.roughnessMap.channel),anisotropyMapUv:_t&&_(M.anisotropyMap.channel),clearcoatMapUv:Mt&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:ne&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:dt&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&_(M.sheenRoughnessMap.channel),specularMapUv:It&&_(M.specularMap.channel),specularColorMapUv:Ot&&_(M.specularColorMap.channel),specularIntensityMapUv:_e&&_(M.specularIntensityMap.channel),transmissionMapUv:O&&_(M.transmissionMap.channel),thicknessMapUv:vt&&_(M.thicknessMap.channel),alphaMapUv:ct&&_(M.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Wt||x),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!z.attributes.uv&&($t||ct),fog:!!J,useFog:M.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:bt,skinning:Y.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:tt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ee,decodeVideoTexture:$t&&M.map.isVideoTexture===!0&&de.getTransfer(M.map.colorSpace)===Me,decodeVideoTextureEmissive:te&&M.emissiveMap.isVideoTexture===!0&&de.getTransfer(M.emissiveMap.colorSpace)===Me,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===bi,flipSided:M.side===mn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Xt&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xt&&M.extensions.multiDraw===!0||Ct)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return We.vertexUv1s=c.has(1),We.vertexUv2s=c.has(2),We.vertexUv3s=c.has(3),c.clear(),We}function f(M){let v=[];if(M.shaderID?v.push(M.shaderID):(v.push(M.customVertexShaderID),v.push(M.customFragmentShaderID)),M.defines!==void 0)for(let N in M.defines)v.push(N),v.push(M.defines[N]);return M.isRawShaderMaterial===!1&&(w(v,M),T(v,M),v.push(n.outputColorSpace)),v.push(M.customProgramCacheKey),v.join()}function w(M,v){M.push(v.precision),M.push(v.outputColorSpace),M.push(v.envMapMode),M.push(v.envMapCubeUVHeight),M.push(v.mapUv),M.push(v.alphaMapUv),M.push(v.lightMapUv),M.push(v.aoMapUv),M.push(v.bumpMapUv),M.push(v.normalMapUv),M.push(v.displacementMapUv),M.push(v.emissiveMapUv),M.push(v.metalnessMapUv),M.push(v.roughnessMapUv),M.push(v.anisotropyMapUv),M.push(v.clearcoatMapUv),M.push(v.clearcoatNormalMapUv),M.push(v.clearcoatRoughnessMapUv),M.push(v.iridescenceMapUv),M.push(v.iridescenceThicknessMapUv),M.push(v.sheenColorMapUv),M.push(v.sheenRoughnessMapUv),M.push(v.specularMapUv),M.push(v.specularColorMapUv),M.push(v.specularIntensityMapUv),M.push(v.transmissionMapUv),M.push(v.thicknessMapUv),M.push(v.combine),M.push(v.fogExp2),M.push(v.sizeAttenuation),M.push(v.morphTargetsCount),M.push(v.morphAttributeCount),M.push(v.numDirLights),M.push(v.numPointLights),M.push(v.numSpotLights),M.push(v.numSpotLightMaps),M.push(v.numHemiLights),M.push(v.numRectAreaLights),M.push(v.numDirLightShadows),M.push(v.numPointLightShadows),M.push(v.numSpotLightShadows),M.push(v.numSpotLightShadowsWithMaps),M.push(v.numLightProbes),M.push(v.shadowMapType),M.push(v.toneMapping),M.push(v.numClippingPlanes),M.push(v.numClipIntersection),M.push(v.depthPacking)}function T(M,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),M.push(a.mask)}function y(M){let v=g[M.type],N;if(v){let X=ei[v];N=Lx.clone(X.uniforms)}else N=M.uniforms;return N}function I(M,v){let N;for(let X=0,Y=h.length;X<Y;X++){let J=h[X];if(J.cacheKey===v){N=J,++N.usedTimes;break}}return N===void 0&&(N=new kM(n,v,M,r),h.push(N)),N}function A(M){if(--M.usedTimes===0){let v=h.indexOf(M);h[v]=h[h.length-1],h.pop(),M.destroy()}}function C(M){l.remove(M)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:I,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:P}}function WM(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function XM(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function ym(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function vm(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,d,p,g,_,m){let f=n[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},n[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),t++,f}function a(u,d,p,g,_,m){let f=o(u,d,p,g,_,m);p.transmission>0?i.push(f):p.transparent===!0?s.push(f):e.push(f)}function l(u,d,p,g,_,m){let f=o(u,d,p,g,_,m);p.transmission>0?i.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||XM),i.length>1&&i.sort(d||ym),s.length>1&&s.sort(d||ym)}function h(){for(let u=t,d=n.length;u<d;u++){let p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function YM(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new vm,n.set(i,[o])):s>=r.length?(o=new vm,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function qM(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new k,color:new ce};break;case"SpotLight":e={position:new k,direction:new k,color:new ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new ce,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new ce,groundColor:new ce};break;case"RectAreaLight":e={color:new ce,position:new k,halfWidth:new k,halfHeight:new k};break}return n[t.id]=e,e}}}function $M(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var ZM=0;function KM(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function JM(n){let t=new qM,e=$M(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);let s=new k,r=new De,o=new De;function a(c){let h=0,u=0,d=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,w=0,T=0,y=0,I=0,A=0,C=0;c.sort(KM);for(let M=0,v=c.length;M<v;M++){let N=c[M],X=N.color,Y=N.intensity,J=N.distance,z=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)h+=X.r*Y,u+=X.g*Y,d+=X.b*Y;else if(N.isLightProbe){for(let L=0;L<9;L++)i.probe[L].addScaledVector(N.sh.coefficients[L],Y);C++}else if(N.isDirectionalLight){let L=t.get(N);if(L.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let W=N.shadow,R=e.get(N);R.shadowIntensity=W.intensity,R.shadowBias=W.bias,R.shadowNormalBias=W.normalBias,R.shadowRadius=W.radius,R.shadowMapSize=W.mapSize,i.directionalShadow[p]=R,i.directionalShadowMap[p]=z,i.directionalShadowMatrix[p]=N.shadow.matrix,w++}i.directional[p]=L,p++}else if(N.isSpotLight){let L=t.get(N);L.position.setFromMatrixPosition(N.matrixWorld),L.color.copy(X).multiplyScalar(Y),L.distance=J,L.coneCos=Math.cos(N.angle),L.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),L.decay=N.decay,i.spot[_]=L;let W=N.shadow;if(N.map&&(i.spotLightMap[I]=N.map,I++,W.updateMatrices(N),N.castShadow&&A++),i.spotLightMatrix[_]=W.matrix,N.castShadow){let R=e.get(N);R.shadowIntensity=W.intensity,R.shadowBias=W.bias,R.shadowNormalBias=W.normalBias,R.shadowRadius=W.radius,R.shadowMapSize=W.mapSize,i.spotShadow[_]=R,i.spotShadowMap[_]=z,y++}_++}else if(N.isRectAreaLight){let L=t.get(N);L.color.copy(X).multiplyScalar(Y),L.halfWidth.set(N.width*.5,0,0),L.halfHeight.set(0,N.height*.5,0),i.rectArea[m]=L,m++}else if(N.isPointLight){let L=t.get(N);if(L.color.copy(N.color).multiplyScalar(N.intensity),L.distance=N.distance,L.decay=N.decay,N.castShadow){let W=N.shadow,R=e.get(N);R.shadowIntensity=W.intensity,R.shadowBias=W.bias,R.shadowNormalBias=W.normalBias,R.shadowRadius=W.radius,R.shadowMapSize=W.mapSize,R.shadowCameraNear=W.camera.near,R.shadowCameraFar=W.camera.far,i.pointShadow[g]=R,i.pointShadowMap[g]=z,i.pointShadowMatrix[g]=N.shadow.matrix,T++}i.point[g]=L,g++}else if(N.isHemisphereLight){let L=t.get(N);L.skyColor.copy(N.color).multiplyScalar(Y),L.groundColor.copy(N.groundColor).multiplyScalar(Y),i.hemi[f]=L,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=yt.LTC_FLOAT_1,i.rectAreaLTC2=yt.LTC_FLOAT_2):(i.rectAreaLTC1=yt.LTC_HALF_1,i.rectAreaLTC2=yt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let P=i.hash;(P.directionalLength!==p||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==f||P.numDirectionalShadows!==w||P.numPointShadows!==T||P.numSpotShadows!==y||P.numSpotMaps!==I||P.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=y+I-A,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=C,P.directionalLength=p,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=f,P.numDirectionalShadows=w,P.numPointShadows=T,P.numSpotShadows=y,P.numSpotMaps=I,P.numLightProbes=C,i.version=ZM++)}function l(c,h){let u=0,d=0,p=0,g=0,_=0,m=h.matrixWorldInverse;for(let f=0,w=c.length;f<w;f++){let T=c[f];if(T.isDirectionalLight){let y=i.directional[u];y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(T.isSpotLight){let y=i.spot[p];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(T.isRectAreaLight){let y=i.rectArea[g];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(T.width*.5,0,0),y.halfHeight.set(0,T.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){let y=i.point[d];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){let y=i.hemi[_];y.direction.setFromMatrixPosition(T.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function Sm(n){let t=new JM(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function QM(n){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Sm(n),t.set(s,[a])):r>=o.length?(a=new Sm(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var _u=class extends is{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=rx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},xu=class extends is{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},jM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tb=`uniform sampler2D shadow_pass;
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
}`;function eb(n,t,e){let i=new _o,s=new me,r=new me,o=new be,a=new _u({depthPacking:ox}),l=new xu,c={},h=e.maxTextureSize,u={[ts]:mn,[mn]:ts,[bi]:bi},d=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:jM,fragmentShader:tb}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new yn;g.setAttribute("position",new En(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ie(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Im;let f=this.type;this.render=function(A,C,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;let M=n.getRenderTarget(),v=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),X=n.state;X.setBlending(Qi),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);let Y=f!==Si&&this.type===Si,J=f===Si&&this.type!==Si;for(let z=0,L=A.length;z<L;z++){let W=A[z],R=W.shadow;if(R===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(R.autoUpdate===!1&&R.needsUpdate===!1)continue;s.copy(R.mapSize);let D=R.getFrameExtents();if(s.multiply(D),r.copy(R.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/D.x),s.x=r.x*D.x,R.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/D.y),s.y=r.y*D.y,R.mapSize.y=r.y)),R.map===null||Y===!0||J===!0){let Z=this.type!==Si?{minFilter:Gn,magFilter:Gn}:{};R.map!==null&&R.map.dispose(),R.map=new Ci(s.x,s.y,Z),R.map.texture.name=W.name+".shadowMap",R.camera.updateProjectionMatrix()}n.setRenderTarget(R.map),n.clear();let $=R.getViewportCount();for(let Z=0;Z<$;Z++){let tt=R.getViewport(Z);o.set(r.x*tt.x,r.y*tt.y,r.x*tt.z,r.y*tt.w),X.viewport(o),R.updateMatrices(W,Z),i=R.getFrustum(),y(C,P,R.camera,W,this.type)}R.isPointLightShadow!==!0&&this.type===Si&&w(R,P),R.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(M,v,N)};function w(A,C){let P=t.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Ci(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(C,null,P,d,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(C,null,P,p,_,null)}function T(A,C,P,M){let v=null,N=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(N!==void 0)v=N;else if(v=P.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let X=v.uuid,Y=C.uuid,J=c[X];J===void 0&&(J={},c[X]=J);let z=J[Y];z===void 0&&(z=v.clone(),J[Y]=z,C.addEventListener("dispose",I)),v=z}if(v.visible=C.visible,v.wireframe=C.wireframe,M===Si?v.side=C.shadowSide!==null?C.shadowSide:C.side:v.side=C.shadowSide!==null?C.shadowSide:u[C.side],v.alphaMap=C.alphaMap,v.alphaTest=C.alphaTest,v.map=C.map,v.clipShadows=C.clipShadows,v.clippingPlanes=C.clippingPlanes,v.clipIntersection=C.clipIntersection,v.displacementMap=C.displacementMap,v.displacementScale=C.displacementScale,v.displacementBias=C.displacementBias,v.wireframeLinewidth=C.wireframeLinewidth,v.linewidth=C.linewidth,P.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let X=n.properties.get(v);X.light=P}return v}function y(A,C,P,M,v){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&v===Si)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);let Y=t.update(A),J=A.material;if(Array.isArray(J)){let z=Y.groups;for(let L=0,W=z.length;L<W;L++){let R=z[L],D=J[R.materialIndex];if(D&&D.visible){let $=T(A,D,M,v);A.onBeforeShadow(n,A,C,P,Y,$,R),n.renderBufferDirect(P,null,Y,$,A,R),A.onAfterShadow(n,A,C,P,Y,$,R)}}}else if(J.visible){let z=T(A,J,M,v);A.onBeforeShadow(n,A,C,P,Y,z,null),n.renderBufferDirect(P,null,Y,z,A,null),A.onAfterShadow(n,A,C,P,Y,z,null)}}let X=A.children;for(let Y=0,J=X.length;Y<J;Y++)y(X[Y],C,P,M,v)}function I(A){A.target.removeEventListener("dispose",I);for(let P in c){let M=c[P],v=A.target.uuid;v in M&&(M[v].dispose(),delete M[v])}}}var nb={[Sh]:Mh,[bh]:Eh,[Th]:Ah,[br]:wh,[Mh]:Sh,[Eh]:bh,[Ah]:Th,[wh]:br};function ib(n,t){function e(){let O=!1,vt=new be,it=null,ct=new be(0,0,0,0);return{setMask:function(At){it!==At&&!O&&(n.colorMask(At,At,At,At),it=At)},setLocked:function(At){O=At},setClear:function(At,xt,Xt,Ee,We){We===!0&&(At*=Ee,xt*=Ee,Xt*=Ee),vt.set(At,xt,Xt,Ee),ct.equals(vt)===!1&&(n.clearColor(At,xt,Xt,Ee),ct.copy(vt))},reset:function(){O=!1,it=null,ct.set(-1,0,0,0)}}}function i(){let O=!1,vt=!1,it=null,ct=null,At=null;return{setReversed:function(xt){if(vt!==xt){let Xt=t.get("EXT_clip_control");vt?Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.ZERO_TO_ONE_EXT):Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.NEGATIVE_ONE_TO_ONE_EXT);let Ee=At;At=null,this.setClear(Ee)}vt=xt},getReversed:function(){return vt},setTest:function(xt){xt?ht(n.DEPTH_TEST):bt(n.DEPTH_TEST)},setMask:function(xt){it!==xt&&!O&&(n.depthMask(xt),it=xt)},setFunc:function(xt){if(vt&&(xt=nb[xt]),ct!==xt){switch(xt){case Sh:n.depthFunc(n.NEVER);break;case Mh:n.depthFunc(n.ALWAYS);break;case bh:n.depthFunc(n.LESS);break;case br:n.depthFunc(n.LEQUAL);break;case Th:n.depthFunc(n.EQUAL);break;case wh:n.depthFunc(n.GEQUAL);break;case Eh:n.depthFunc(n.GREATER);break;case Ah:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ct=xt}},setLocked:function(xt){O=xt},setClear:function(xt){At!==xt&&(vt&&(xt=1-xt),n.clearDepth(xt),At=xt)},reset:function(){O=!1,it=null,ct=null,At=null,vt=!1}}}function s(){let O=!1,vt=null,it=null,ct=null,At=null,xt=null,Xt=null,Ee=null,We=null;return{setTest:function(ae){O||(ae?ht(n.STENCIL_TEST):bt(n.STENCIL_TEST))},setMask:function(ae){vt!==ae&&!O&&(n.stencilMask(ae),vt=ae)},setFunc:function(ae,ve,In){(it!==ae||ct!==ve||At!==In)&&(n.stencilFunc(ae,ve,In),it=ae,ct=ve,At=In)},setOp:function(ae,ve,In){(xt!==ae||Xt!==ve||Ee!==In)&&(n.stencilOp(ae,ve,In),xt=ae,Xt=ve,Ee=In)},setLocked:function(ae){O=ae},setClear:function(ae){We!==ae&&(n.clearStencil(ae),We=ae)},reset:function(){O=!1,vt=null,it=null,ct=null,At=null,xt=null,Xt=null,Ee=null,We=null}}}let r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,w=null,T=null,y=null,I=null,A=null,C=new ce(0,0,0),P=0,M=!1,v=null,N=null,X=null,Y=null,J=null,z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),L=!1,W=0,R=n.getParameter(n.VERSION);R.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(R)[1]),L=W>=1):R.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(R)[1]),L=W>=2);let D=null,$={},Z=n.getParameter(n.SCISSOR_BOX),tt=n.getParameter(n.VIEWPORT),mt=new be().fromArray(Z),V=new be().fromArray(tt);function j(O,vt,it,ct){let At=new Uint8Array(4),xt=n.createTexture();n.bindTexture(O,xt),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Xt=0;Xt<it;Xt++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(vt,0,n.RGBA,1,1,ct,0,n.RGBA,n.UNSIGNED_BYTE,At):n.texImage2D(vt+Xt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,At);return xt}let lt={};lt[n.TEXTURE_2D]=j(n.TEXTURE_2D,n.TEXTURE_2D,1),lt[n.TEXTURE_CUBE_MAP]=j(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),lt[n.TEXTURE_2D_ARRAY]=j(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),lt[n.TEXTURE_3D]=j(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ht(n.DEPTH_TEST),o.setFunc(br),Lt(!1),Wt(bp),ht(n.CULL_FACE),F(Qi);function ht(O){h[O]!==!0&&(n.enable(O),h[O]=!0)}function bt(O){h[O]!==!1&&(n.disable(O),h[O]=!1)}function St(O,vt){return u[O]!==vt?(n.bindFramebuffer(O,vt),u[O]=vt,O===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=vt),O===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=vt),!0):!1}function Ct(O,vt){let it=p,ct=!1;if(O){it=d.get(vt),it===void 0&&(it=[],d.set(vt,it));let At=O.textures;if(it.length!==At.length||it[0]!==n.COLOR_ATTACHMENT0){for(let xt=0,Xt=At.length;xt<Xt;xt++)it[xt]=n.COLOR_ATTACHMENT0+xt;it.length=At.length,ct=!0}}else it[0]!==n.BACK&&(it[0]=n.BACK,ct=!0);ct&&n.drawBuffers(it)}function $t(O){return g!==O?(n.useProgram(O),g=O,!0):!1}let Yt={[Ms]:n.FUNC_ADD,[D_]:n.FUNC_SUBTRACT,[L_]:n.FUNC_REVERSE_SUBTRACT};Yt[U_]=n.MIN,Yt[N_]=n.MAX;let Kt={[F_]:n.ZERO,[O_]:n.ONE,[B_]:n.SRC_COLOR,[yh]:n.SRC_ALPHA,[W_]:n.SRC_ALPHA_SATURATE,[H_]:n.DST_COLOR,[V_]:n.DST_ALPHA,[z_]:n.ONE_MINUS_SRC_COLOR,[vh]:n.ONE_MINUS_SRC_ALPHA,[G_]:n.ONE_MINUS_DST_COLOR,[k_]:n.ONE_MINUS_DST_ALPHA,[X_]:n.CONSTANT_COLOR,[Y_]:n.ONE_MINUS_CONSTANT_COLOR,[q_]:n.CONSTANT_ALPHA,[$_]:n.ONE_MINUS_CONSTANT_ALPHA};function F(O,vt,it,ct,At,xt,Xt,Ee,We,ae){if(O===Qi){_===!0&&(bt(n.BLEND),_=!1);return}if(_===!1&&(ht(n.BLEND),_=!0),O!==I_){if(O!==m||ae!==M){if((f!==Ms||y!==Ms)&&(n.blendEquation(n.FUNC_ADD),f=Ms,y=Ms),ae)switch(O){case yr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Tp:n.blendFunc(n.ONE,n.ONE);break;case wp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ep:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case yr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Tp:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case wp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ep:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}w=null,T=null,I=null,A=null,C.set(0,0,0),P=0,m=O,M=ae}return}At=At||vt,xt=xt||it,Xt=Xt||ct,(vt!==f||At!==y)&&(n.blendEquationSeparate(Yt[vt],Yt[At]),f=vt,y=At),(it!==w||ct!==T||xt!==I||Xt!==A)&&(n.blendFuncSeparate(Kt[it],Kt[ct],Kt[xt],Kt[Xt]),w=it,T=ct,I=xt,A=Xt),(Ee.equals(C)===!1||We!==P)&&(n.blendColor(Ee.r,Ee.g,Ee.b,We),C.copy(Ee),P=We),m=O,M=!1}function ye(O,vt){O.side===bi?bt(n.CULL_FACE):ht(n.CULL_FACE);let it=O.side===mn;vt&&(it=!it),Lt(it),O.blending===yr&&O.transparent===!1?F(Qi):F(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);let ct=O.stencilWrite;a.setTest(ct),ct&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),te(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ht(n.SAMPLE_ALPHA_TO_COVERAGE):bt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Lt(O){v!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),v=O)}function Wt(O){O!==C_?(ht(n.CULL_FACE),O!==N&&(O===bp?n.cullFace(n.BACK):O===R_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):bt(n.CULL_FACE),N=O}function Ut(O){O!==X&&(L&&n.lineWidth(O),X=O)}function te(O,vt,it){O?(ht(n.POLYGON_OFFSET_FILL),(Y!==vt||J!==it)&&(n.polygonOffset(vt,it),Y=vt,J=it)):bt(n.POLYGON_OFFSET_FILL)}function Rt(O){O?ht(n.SCISSOR_TEST):bt(n.SCISSOR_TEST)}function E(O){O===void 0&&(O=n.TEXTURE0+z-1),D!==O&&(n.activeTexture(O),D=O)}function x(O,vt,it){it===void 0&&(D===null?it=n.TEXTURE0+z-1:it=D);let ct=$[it];ct===void 0&&(ct={type:void 0,texture:void 0},$[it]=ct),(ct.type!==O||ct.texture!==vt)&&(D!==it&&(n.activeTexture(it),D=it),n.bindTexture(O,vt||lt[O]),ct.type=O,ct.texture=vt)}function q(){let O=$[D];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function rt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function at(){try{n.compressedTexImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ot(){try{n.texSubImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Dt(){try{n.texSubImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function _t(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Mt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ne(){try{n.texStorage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function dt(){try{n.texStorage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Et(){try{n.texImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Pt(){try{n.texImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ht(O){mt.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),mt.copy(O))}function Tt(O){V.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),V.copy(O))}function It(O,vt){let it=c.get(vt);it===void 0&&(it=new WeakMap,c.set(vt,it));let ct=it.get(O);ct===void 0&&(ct=n.getUniformBlockIndex(vt,O.name),it.set(O,ct))}function Ot(O,vt){let ct=c.get(vt).get(O);l.get(vt)!==ct&&(n.uniformBlockBinding(vt,ct,O.__bindingPointIndex),l.set(vt,ct))}function _e(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},D=null,$={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,w=null,T=null,y=null,I=null,A=null,C=new ce(0,0,0),P=0,M=!1,v=null,N=null,X=null,Y=null,J=null,mt.set(0,0,n.canvas.width,n.canvas.height),V.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ht,disable:bt,bindFramebuffer:St,drawBuffers:Ct,useProgram:$t,setBlending:F,setMaterial:ye,setFlipSided:Lt,setCullFace:Wt,setLineWidth:Ut,setPolygonOffset:te,setScissorTest:Rt,activeTexture:E,bindTexture:x,unbindTexture:q,compressedTexImage2D:rt,compressedTexImage3D:at,texImage2D:Et,texImage3D:Pt,updateUBOMapping:It,uniformBlockBinding:Ot,texStorage2D:ne,texStorage3D:dt,texSubImage2D:ot,texSubImage3D:Dt,compressedTexSubImage2D:_t,compressedTexSubImage3D:Mt,scissor:Ht,viewport:Tt,reset:_e}}function Mm(n,t,e,i){let s=sb(i);switch(e){case Om:return n*t;case zm:return n*t;case Vm:return n*t*2;case km:return n*t/s.components*s.byteLength;case Ou:return n*t/s.components*s.byteLength;case Hm:return n*t*2/s.components*s.byteLength;case Bu:return n*t*2/s.components*s.byteLength;case Bm:return n*t*3/s.components*s.byteLength;case Hn:return n*t*4/s.components*s.byteLength;case zu:return n*t*4/s.components*s.byteLength;case al:case ll:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case cl:case hl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Lh:case Nh:return Math.max(n,16)*Math.max(t,8)/4;case Dh:case Uh:return Math.max(n,8)*Math.max(t,8)/2;case Fh:case Oh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Bh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case zh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Vh:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case kh:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Hh:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Gh:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Wh:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Xh:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Yh:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case qh:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case $h:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Zh:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Kh:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Jh:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Qh:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case ul:case jh:case tu:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Gm:case eu:return Math.ceil(n/4)*Math.ceil(t/4)*8;case nu:case iu:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function sb(n){switch(n){case Ai:case Um:return{byteLength:1,components:1};case go:case Nm:case vo:return{byteLength:2,components:1};case Nu:case Fu:return{byteLength:2,components:4};case Es:case Uu:case Ti:return{byteLength:4,components:1};case Fm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function rb(n,t,e,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new me,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,x){return p?new OffscreenCanvas(E,x):ml("canvas")}function _(E,x,q){let rt=1,at=Rt(E);if((at.width>q||at.height>q)&&(rt=q/Math.max(at.width,at.height)),rt<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let ot=Math.floor(rt*at.width),Dt=Math.floor(rt*at.height);u===void 0&&(u=g(ot,Dt));let _t=x?g(ot,Dt):u;return _t.width=ot,_t.height=Dt,_t.getContext("2d").drawImage(E,0,0,ot,Dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+at.width+"x"+at.height+") to ("+ot+"x"+Dt+")."),_t}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+at.width+"x"+at.height+")."),E;return E}function m(E){return E.generateMipmaps}function f(E){n.generateMipmap(E)}function w(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(E,x,q,rt,at=!1){if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ot=x;if(x===n.RED&&(q===n.FLOAT&&(ot=n.R32F),q===n.HALF_FLOAT&&(ot=n.R16F),q===n.UNSIGNED_BYTE&&(ot=n.R8)),x===n.RED_INTEGER&&(q===n.UNSIGNED_BYTE&&(ot=n.R8UI),q===n.UNSIGNED_SHORT&&(ot=n.R16UI),q===n.UNSIGNED_INT&&(ot=n.R32UI),q===n.BYTE&&(ot=n.R8I),q===n.SHORT&&(ot=n.R16I),q===n.INT&&(ot=n.R32I)),x===n.RG&&(q===n.FLOAT&&(ot=n.RG32F),q===n.HALF_FLOAT&&(ot=n.RG16F),q===n.UNSIGNED_BYTE&&(ot=n.RG8)),x===n.RG_INTEGER&&(q===n.UNSIGNED_BYTE&&(ot=n.RG8UI),q===n.UNSIGNED_SHORT&&(ot=n.RG16UI),q===n.UNSIGNED_INT&&(ot=n.RG32UI),q===n.BYTE&&(ot=n.RG8I),q===n.SHORT&&(ot=n.RG16I),q===n.INT&&(ot=n.RG32I)),x===n.RGB_INTEGER&&(q===n.UNSIGNED_BYTE&&(ot=n.RGB8UI),q===n.UNSIGNED_SHORT&&(ot=n.RGB16UI),q===n.UNSIGNED_INT&&(ot=n.RGB32UI),q===n.BYTE&&(ot=n.RGB8I),q===n.SHORT&&(ot=n.RGB16I),q===n.INT&&(ot=n.RGB32I)),x===n.RGBA_INTEGER&&(q===n.UNSIGNED_BYTE&&(ot=n.RGBA8UI),q===n.UNSIGNED_SHORT&&(ot=n.RGBA16UI),q===n.UNSIGNED_INT&&(ot=n.RGBA32UI),q===n.BYTE&&(ot=n.RGBA8I),q===n.SHORT&&(ot=n.RGBA16I),q===n.INT&&(ot=n.RGBA32I)),x===n.RGB&&q===n.UNSIGNED_INT_5_9_9_9_REV&&(ot=n.RGB9_E5),x===n.RGBA){let Dt=at?kl:de.getTransfer(rt);q===n.FLOAT&&(ot=n.RGBA32F),q===n.HALF_FLOAT&&(ot=n.RGBA16F),q===n.UNSIGNED_BYTE&&(ot=Dt===Me?n.SRGB8_ALPHA8:n.RGBA8),q===n.UNSIGNED_SHORT_4_4_4_4&&(ot=n.RGBA4),q===n.UNSIGNED_SHORT_5_5_5_1&&(ot=n.RGB5_A1)}return(ot===n.R16F||ot===n.R32F||ot===n.RG16F||ot===n.RG32F||ot===n.RGBA16F||ot===n.RGBA32F)&&t.get("EXT_color_buffer_float"),ot}function y(E,x){let q;return E?x===null||x===Es||x===Er?q=n.DEPTH24_STENCIL8:x===Ti?q=n.DEPTH32F_STENCIL8:x===go&&(q=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Es||x===Er?q=n.DEPTH_COMPONENT24:x===Ti?q=n.DEPTH_COMPONENT32F:x===go&&(q=n.DEPTH_COMPONENT16),q}function I(E,x){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Gn&&E.minFilter!==ni?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function A(E){let x=E.target;x.removeEventListener("dispose",A),P(x),x.isVideoTexture&&h.delete(x)}function C(E){let x=E.target;x.removeEventListener("dispose",C),v(x)}function P(E){let x=i.get(E);if(x.__webglInit===void 0)return;let q=E.source,rt=d.get(q);if(rt){let at=rt[x.__cacheKey];at.usedTimes--,at.usedTimes===0&&M(E),Object.keys(rt).length===0&&d.delete(q)}i.remove(E)}function M(E){let x=i.get(E);n.deleteTexture(x.__webglTexture);let q=E.source,rt=d.get(q);delete rt[x.__cacheKey],o.memory.textures--}function v(E){let x=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let rt=0;rt<6;rt++){if(Array.isArray(x.__webglFramebuffer[rt]))for(let at=0;at<x.__webglFramebuffer[rt].length;at++)n.deleteFramebuffer(x.__webglFramebuffer[rt][at]);else n.deleteFramebuffer(x.__webglFramebuffer[rt]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[rt])}else{if(Array.isArray(x.__webglFramebuffer))for(let rt=0;rt<x.__webglFramebuffer.length;rt++)n.deleteFramebuffer(x.__webglFramebuffer[rt]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let rt=0;rt<x.__webglColorRenderbuffer.length;rt++)x.__webglColorRenderbuffer[rt]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[rt]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let q=E.textures;for(let rt=0,at=q.length;rt<at;rt++){let ot=i.get(q[rt]);ot.__webglTexture&&(n.deleteTexture(ot.__webglTexture),o.memory.textures--),i.remove(q[rt])}i.remove(E)}let N=0;function X(){N=0}function Y(){let E=N;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),N+=1,E}function J(E){let x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function z(E,x){let q=i.get(E);if(E.isVideoTexture&&Ut(E),E.isRenderTargetTexture===!1&&E.version>0&&q.__version!==E.version){let rt=E.image;if(rt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(rt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{V(q,E,x);return}}e.bindTexture(n.TEXTURE_2D,q.__webglTexture,n.TEXTURE0+x)}function L(E,x){let q=i.get(E);if(E.version>0&&q.__version!==E.version){V(q,E,x);return}e.bindTexture(n.TEXTURE_2D_ARRAY,q.__webglTexture,n.TEXTURE0+x)}function W(E,x){let q=i.get(E);if(E.version>0&&q.__version!==E.version){V(q,E,x);return}e.bindTexture(n.TEXTURE_3D,q.__webglTexture,n.TEXTURE0+x)}function R(E,x){let q=i.get(E);if(E.version>0&&q.__version!==E.version){j(q,E,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture,n.TEXTURE0+x)}let D={[Ph]:n.REPEAT,[Ts]:n.CLAMP_TO_EDGE,[Ih]:n.MIRRORED_REPEAT},$={[Gn]:n.NEAREST,[sx]:n.NEAREST_MIPMAP_NEAREST,[Ua]:n.NEAREST_MIPMAP_LINEAR,[ni]:n.LINEAR,[Vc]:n.LINEAR_MIPMAP_NEAREST,[ws]:n.LINEAR_MIPMAP_LINEAR},Z={[lx]:n.NEVER,[px]:n.ALWAYS,[cx]:n.LESS,[Xm]:n.LEQUAL,[hx]:n.EQUAL,[fx]:n.GEQUAL,[ux]:n.GREATER,[dx]:n.NOTEQUAL};function tt(E,x){if(x.type===Ti&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===ni||x.magFilter===Vc||x.magFilter===Ua||x.magFilter===ws||x.minFilter===ni||x.minFilter===Vc||x.minFilter===Ua||x.minFilter===ws)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,D[x.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,D[x.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,D[x.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,$[x.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,$[x.minFilter]),x.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,Z[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Gn||x.minFilter!==Ua&&x.minFilter!==ws||x.type===Ti&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let q=t.get("EXT_texture_filter_anisotropic");n.texParameterf(E,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function mt(E,x){let q=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",A));let rt=x.source,at=d.get(rt);at===void 0&&(at={},d.set(rt,at));let ot=J(x);if(ot!==E.__cacheKey){at[ot]===void 0&&(at[ot]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,q=!0),at[ot].usedTimes++;let Dt=at[E.__cacheKey];Dt!==void 0&&(at[E.__cacheKey].usedTimes--,Dt.usedTimes===0&&M(x)),E.__cacheKey=ot,E.__webglTexture=at[ot].texture}return q}function V(E,x,q){let rt=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(rt=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(rt=n.TEXTURE_3D);let at=mt(E,x),ot=x.source;e.bindTexture(rt,E.__webglTexture,n.TEXTURE0+q);let Dt=i.get(ot);if(ot.version!==Dt.__version||at===!0){e.activeTexture(n.TEXTURE0+q);let _t=de.getPrimaries(de.workingColorSpace),Mt=x.colorSpace===Ki?null:de.getPrimaries(x.colorSpace),ne=x.colorSpace===Ki||_t===Mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let dt=_(x.image,!1,s.maxTextureSize);dt=te(x,dt);let Et=r.convert(x.format,x.colorSpace),Pt=r.convert(x.type),Ht=T(x.internalFormat,Et,Pt,x.colorSpace,x.isVideoTexture);tt(rt,x);let Tt,It=x.mipmaps,Ot=x.isVideoTexture!==!0,_e=Dt.__version===void 0||at===!0,O=ot.dataReady,vt=I(x,dt);if(x.isDepthTexture)Ht=y(x.format===Ar,x.type),_e&&(Ot?e.texStorage2D(n.TEXTURE_2D,1,Ht,dt.width,dt.height):e.texImage2D(n.TEXTURE_2D,0,Ht,dt.width,dt.height,0,Et,Pt,null));else if(x.isDataTexture)if(It.length>0){Ot&&_e&&e.texStorage2D(n.TEXTURE_2D,vt,Ht,It[0].width,It[0].height);for(let it=0,ct=It.length;it<ct;it++)Tt=It[it],Ot?O&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,Tt.width,Tt.height,Et,Pt,Tt.data):e.texImage2D(n.TEXTURE_2D,it,Ht,Tt.width,Tt.height,0,Et,Pt,Tt.data);x.generateMipmaps=!1}else Ot?(_e&&e.texStorage2D(n.TEXTURE_2D,vt,Ht,dt.width,dt.height),O&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,dt.width,dt.height,Et,Pt,dt.data)):e.texImage2D(n.TEXTURE_2D,0,Ht,dt.width,dt.height,0,Et,Pt,dt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ot&&_e&&e.texStorage3D(n.TEXTURE_2D_ARRAY,vt,Ht,It[0].width,It[0].height,dt.depth);for(let it=0,ct=It.length;it<ct;it++)if(Tt=It[it],x.format!==Hn)if(Et!==null)if(Ot){if(O)if(x.layerUpdates.size>0){let At=Mm(Tt.width,Tt.height,x.format,x.type);for(let xt of x.layerUpdates){let Xt=Tt.data.subarray(xt*At/Tt.data.BYTES_PER_ELEMENT,(xt+1)*At/Tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,xt,Tt.width,Tt.height,1,Et,Xt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,0,Tt.width,Tt.height,dt.depth,Et,Tt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,it,Ht,Tt.width,Tt.height,dt.depth,0,Tt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ot?O&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,0,Tt.width,Tt.height,dt.depth,Et,Pt,Tt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,it,Ht,Tt.width,Tt.height,dt.depth,0,Et,Pt,Tt.data)}else{Ot&&_e&&e.texStorage2D(n.TEXTURE_2D,vt,Ht,It[0].width,It[0].height);for(let it=0,ct=It.length;it<ct;it++)Tt=It[it],x.format!==Hn?Et!==null?Ot?O&&e.compressedTexSubImage2D(n.TEXTURE_2D,it,0,0,Tt.width,Tt.height,Et,Tt.data):e.compressedTexImage2D(n.TEXTURE_2D,it,Ht,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?O&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,Tt.width,Tt.height,Et,Pt,Tt.data):e.texImage2D(n.TEXTURE_2D,it,Ht,Tt.width,Tt.height,0,Et,Pt,Tt.data)}else if(x.isDataArrayTexture)if(Ot){if(_e&&e.texStorage3D(n.TEXTURE_2D_ARRAY,vt,Ht,dt.width,dt.height,dt.depth),O)if(x.layerUpdates.size>0){let it=Mm(dt.width,dt.height,x.format,x.type);for(let ct of x.layerUpdates){let At=dt.data.subarray(ct*it/dt.data.BYTES_PER_ELEMENT,(ct+1)*it/dt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ct,dt.width,dt.height,1,Et,Pt,At)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,dt.width,dt.height,dt.depth,Et,Pt,dt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ht,dt.width,dt.height,dt.depth,0,Et,Pt,dt.data);else if(x.isData3DTexture)Ot?(_e&&e.texStorage3D(n.TEXTURE_3D,vt,Ht,dt.width,dt.height,dt.depth),O&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,dt.width,dt.height,dt.depth,Et,Pt,dt.data)):e.texImage3D(n.TEXTURE_3D,0,Ht,dt.width,dt.height,dt.depth,0,Et,Pt,dt.data);else if(x.isFramebufferTexture){if(_e)if(Ot)e.texStorage2D(n.TEXTURE_2D,vt,Ht,dt.width,dt.height);else{let it=dt.width,ct=dt.height;for(let At=0;At<vt;At++)e.texImage2D(n.TEXTURE_2D,At,Ht,it,ct,0,Et,Pt,null),it>>=1,ct>>=1}}else if(It.length>0){if(Ot&&_e){let it=Rt(It[0]);e.texStorage2D(n.TEXTURE_2D,vt,Ht,it.width,it.height)}for(let it=0,ct=It.length;it<ct;it++)Tt=It[it],Ot?O&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,Et,Pt,Tt):e.texImage2D(n.TEXTURE_2D,it,Ht,Et,Pt,Tt);x.generateMipmaps=!1}else if(Ot){if(_e){let it=Rt(dt);e.texStorage2D(n.TEXTURE_2D,vt,Ht,it.width,it.height)}O&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Et,Pt,dt)}else e.texImage2D(n.TEXTURE_2D,0,Ht,Et,Pt,dt);m(x)&&f(rt),Dt.__version=ot.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function j(E,x,q){if(x.image.length!==6)return;let rt=mt(E,x),at=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+q);let ot=i.get(at);if(at.version!==ot.__version||rt===!0){e.activeTexture(n.TEXTURE0+q);let Dt=de.getPrimaries(de.workingColorSpace),_t=x.colorSpace===Ki?null:de.getPrimaries(x.colorSpace),Mt=x.colorSpace===Ki||Dt===_t?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);let ne=x.isCompressedTexture||x.image[0].isCompressedTexture,dt=x.image[0]&&x.image[0].isDataTexture,Et=[];for(let ct=0;ct<6;ct++)!ne&&!dt?Et[ct]=_(x.image[ct],!0,s.maxCubemapSize):Et[ct]=dt?x.image[ct].image:x.image[ct],Et[ct]=te(x,Et[ct]);let Pt=Et[0],Ht=r.convert(x.format,x.colorSpace),Tt=r.convert(x.type),It=T(x.internalFormat,Ht,Tt,x.colorSpace),Ot=x.isVideoTexture!==!0,_e=ot.__version===void 0||rt===!0,O=at.dataReady,vt=I(x,Pt);tt(n.TEXTURE_CUBE_MAP,x);let it;if(ne){Ot&&_e&&e.texStorage2D(n.TEXTURE_CUBE_MAP,vt,It,Pt.width,Pt.height);for(let ct=0;ct<6;ct++){it=Et[ct].mipmaps;for(let At=0;At<it.length;At++){let xt=it[At];x.format!==Hn?Ht!==null?Ot?O&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At,0,0,xt.width,xt.height,Ht,xt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At,It,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ot?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At,0,0,xt.width,xt.height,Ht,Tt,xt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At,It,xt.width,xt.height,0,Ht,Tt,xt.data)}}}else{if(it=x.mipmaps,Ot&&_e){it.length>0&&vt++;let ct=Rt(Et[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,vt,It,ct.width,ct.height)}for(let ct=0;ct<6;ct++)if(dt){Ot?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,Et[ct].width,Et[ct].height,Ht,Tt,Et[ct].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,It,Et[ct].width,Et[ct].height,0,Ht,Tt,Et[ct].data);for(let At=0;At<it.length;At++){let Xt=it[At].image[ct].image;Ot?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At+1,0,0,Xt.width,Xt.height,Ht,Tt,Xt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At+1,It,Xt.width,Xt.height,0,Ht,Tt,Xt.data)}}else{Ot?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,Ht,Tt,Et[ct]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,It,Ht,Tt,Et[ct]);for(let At=0;At<it.length;At++){let xt=it[At];Ot?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At+1,0,0,Ht,Tt,xt.image[ct]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At+1,It,Ht,Tt,xt.image[ct])}}}m(x)&&f(n.TEXTURE_CUBE_MAP),ot.__version=at.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function lt(E,x,q,rt,at,ot){let Dt=r.convert(q.format,q.colorSpace),_t=r.convert(q.type),Mt=T(q.internalFormat,Dt,_t,q.colorSpace),ne=i.get(x),dt=i.get(q);if(dt.__renderTarget=x,!ne.__hasExternalTextures){let Et=Math.max(1,x.width>>ot),Pt=Math.max(1,x.height>>ot);at===n.TEXTURE_3D||at===n.TEXTURE_2D_ARRAY?e.texImage3D(at,ot,Mt,Et,Pt,x.depth,0,Dt,_t,null):e.texImage2D(at,ot,Mt,Et,Pt,0,Dt,_t,null)}e.bindFramebuffer(n.FRAMEBUFFER,E),Wt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,rt,at,dt.__webglTexture,0,Lt(x)):(at===n.TEXTURE_2D||at>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&at<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,rt,at,dt.__webglTexture,ot),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ht(E,x,q){if(n.bindRenderbuffer(n.RENDERBUFFER,E),x.depthBuffer){let rt=x.depthTexture,at=rt&&rt.isDepthTexture?rt.type:null,ot=y(x.stencilBuffer,at),Dt=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_t=Lt(x);Wt(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t,ot,x.width,x.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t,ot,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,ot,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Dt,n.RENDERBUFFER,E)}else{let rt=x.textures;for(let at=0;at<rt.length;at++){let ot=rt[at],Dt=r.convert(ot.format,ot.colorSpace),_t=r.convert(ot.type),Mt=T(ot.internalFormat,Dt,_t,ot.colorSpace),ne=Lt(x);q&&Wt(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ne,Mt,x.width,x.height):Wt(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ne,Mt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Mt,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function bt(E,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let rt=i.get(x.depthTexture);rt.__renderTarget=x,(!rt.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),z(x.depthTexture,0);let at=rt.__webglTexture,ot=Lt(x);if(x.depthTexture.format===vr)Wt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,at,0,ot):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,at,0);else if(x.depthTexture.format===Ar)Wt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,at,0,ot):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,at,0);else throw new Error("Unknown depthTexture format")}function St(E){let x=i.get(E),q=E.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==E.depthTexture){let rt=E.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),rt){let at=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,rt.removeEventListener("dispose",at)};rt.addEventListener("dispose",at),x.__depthDisposeCallback=at}x.__boundDepthTexture=rt}if(E.depthTexture&&!x.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");bt(x.__webglFramebuffer,E)}else if(q){x.__webglDepthbuffer=[];for(let rt=0;rt<6;rt++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[rt]),x.__webglDepthbuffer[rt]===void 0)x.__webglDepthbuffer[rt]=n.createRenderbuffer(),ht(x.__webglDepthbuffer[rt],E,!1);else{let at=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ot=x.__webglDepthbuffer[rt];n.bindRenderbuffer(n.RENDERBUFFER,ot),n.framebufferRenderbuffer(n.FRAMEBUFFER,at,n.RENDERBUFFER,ot)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),ht(x.__webglDepthbuffer,E,!1);else{let rt=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,at)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ct(E,x,q){let rt=i.get(E);x!==void 0&&lt(rt.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),q!==void 0&&St(E)}function $t(E){let x=E.texture,q=i.get(E),rt=i.get(x);E.addEventListener("dispose",C);let at=E.textures,ot=E.isWebGLCubeRenderTarget===!0,Dt=at.length>1;if(Dt||(rt.__webglTexture===void 0&&(rt.__webglTexture=n.createTexture()),rt.__version=x.version,o.memory.textures++),ot){q.__webglFramebuffer=[];for(let _t=0;_t<6;_t++)if(x.mipmaps&&x.mipmaps.length>0){q.__webglFramebuffer[_t]=[];for(let Mt=0;Mt<x.mipmaps.length;Mt++)q.__webglFramebuffer[_t][Mt]=n.createFramebuffer()}else q.__webglFramebuffer[_t]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){q.__webglFramebuffer=[];for(let _t=0;_t<x.mipmaps.length;_t++)q.__webglFramebuffer[_t]=n.createFramebuffer()}else q.__webglFramebuffer=n.createFramebuffer();if(Dt)for(let _t=0,Mt=at.length;_t<Mt;_t++){let ne=i.get(at[_t]);ne.__webglTexture===void 0&&(ne.__webglTexture=n.createTexture(),o.memory.textures++)}if(E.samples>0&&Wt(E)===!1){q.__webglMultisampledFramebuffer=n.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let _t=0;_t<at.length;_t++){let Mt=at[_t];q.__webglColorRenderbuffer[_t]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,q.__webglColorRenderbuffer[_t]);let ne=r.convert(Mt.format,Mt.colorSpace),dt=r.convert(Mt.type),Et=T(Mt.internalFormat,ne,dt,Mt.colorSpace,E.isXRRenderTarget===!0),Pt=Lt(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,Pt,Et,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,q.__webglColorRenderbuffer[_t])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(q.__webglDepthRenderbuffer=n.createRenderbuffer(),ht(q.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ot){e.bindTexture(n.TEXTURE_CUBE_MAP,rt.__webglTexture),tt(n.TEXTURE_CUBE_MAP,x);for(let _t=0;_t<6;_t++)if(x.mipmaps&&x.mipmaps.length>0)for(let Mt=0;Mt<x.mipmaps.length;Mt++)lt(q.__webglFramebuffer[_t][Mt],E,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Mt);else lt(q.__webglFramebuffer[_t],E,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0);m(x)&&f(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Dt){for(let _t=0,Mt=at.length;_t<Mt;_t++){let ne=at[_t],dt=i.get(ne);e.bindTexture(n.TEXTURE_2D,dt.__webglTexture),tt(n.TEXTURE_2D,ne),lt(q.__webglFramebuffer,E,ne,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,0),m(ne)&&f(n.TEXTURE_2D)}e.unbindTexture()}else{let _t=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(_t=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(_t,rt.__webglTexture),tt(_t,x),x.mipmaps&&x.mipmaps.length>0)for(let Mt=0;Mt<x.mipmaps.length;Mt++)lt(q.__webglFramebuffer[Mt],E,x,n.COLOR_ATTACHMENT0,_t,Mt);else lt(q.__webglFramebuffer,E,x,n.COLOR_ATTACHMENT0,_t,0);m(x)&&f(_t),e.unbindTexture()}E.depthBuffer&&St(E)}function Yt(E){let x=E.textures;for(let q=0,rt=x.length;q<rt;q++){let at=x[q];if(m(at)){let ot=w(E),Dt=i.get(at).__webglTexture;e.bindTexture(ot,Dt),f(ot),e.unbindTexture()}}}let Kt=[],F=[];function ye(E){if(E.samples>0){if(Wt(E)===!1){let x=E.textures,q=E.width,rt=E.height,at=n.COLOR_BUFFER_BIT,ot=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Dt=i.get(E),_t=x.length>1;if(_t)for(let Mt=0;Mt<x.length;Mt++)e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let Mt=0;Mt<x.length;Mt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(at|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(at|=n.STENCIL_BUFFER_BIT)),_t){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Dt.__webglColorRenderbuffer[Mt]);let ne=i.get(x[Mt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ne,0)}n.blitFramebuffer(0,0,q,rt,0,0,q,rt,at,n.NEAREST),l===!0&&(Kt.length=0,F.length=0,Kt.push(n.COLOR_ATTACHMENT0+Mt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Kt.push(ot),F.push(ot),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,F)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Kt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),_t)for(let Mt=0;Mt<x.length;Mt++){e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.RENDERBUFFER,Dt.__webglColorRenderbuffer[Mt]);let ne=i.get(x[Mt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.TEXTURE_2D,ne,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let x=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Lt(E){return Math.min(s.maxSamples,E.samples)}function Wt(E){let x=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Ut(E){let x=o.render.frame;h.get(E)!==x&&(h.set(E,x),E.update())}function te(E,x){let q=E.colorSpace,rt=E.format,at=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||q!==Lr&&q!==Ki&&(de.getTransfer(q)===Me?(rt!==Hn||at!==Ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),x}function Rt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=X,this.setTexture2D=z,this.setTexture2DArray=L,this.setTexture3D=W,this.setTextureCube=R,this.rebindTextures=Ct,this.setupRenderTarget=$t,this.updateRenderTargetMipmap=Yt,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=lt,this.useMultisampledRTT=Wt}function ob(n,t){function e(i,s=Ki){let r,o=de.getTransfer(s);if(i===Ai)return n.UNSIGNED_BYTE;if(i===Nu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Fu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Fm)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Um)return n.BYTE;if(i===Nm)return n.SHORT;if(i===go)return n.UNSIGNED_SHORT;if(i===Uu)return n.INT;if(i===Es)return n.UNSIGNED_INT;if(i===Ti)return n.FLOAT;if(i===vo)return n.HALF_FLOAT;if(i===Om)return n.ALPHA;if(i===Bm)return n.RGB;if(i===Hn)return n.RGBA;if(i===zm)return n.LUMINANCE;if(i===Vm)return n.LUMINANCE_ALPHA;if(i===vr)return n.DEPTH_COMPONENT;if(i===Ar)return n.DEPTH_STENCIL;if(i===km)return n.RED;if(i===Ou)return n.RED_INTEGER;if(i===Hm)return n.RG;if(i===Bu)return n.RG_INTEGER;if(i===zu)return n.RGBA_INTEGER;if(i===al||i===ll||i===cl||i===hl)if(o===Me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===al)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ll)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===cl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===hl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===al)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ll)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===cl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===hl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Dh||i===Lh||i===Uh||i===Nh)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Dh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Lh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Uh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Nh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Fh||i===Oh||i===Bh)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Fh||i===Oh)return o===Me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Bh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===zh||i===Vh||i===kh||i===Hh||i===Gh||i===Wh||i===Xh||i===Yh||i===qh||i===$h||i===Zh||i===Kh||i===Jh||i===Qh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===zh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Vh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===kh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Hh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Gh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Wh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Xh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Yh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===qh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===$h)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Zh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Kh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Jh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Qh)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ul||i===jh||i===tu)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===ul)return o===Me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===jh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===tu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Gm||i===eu||i===nu||i===iu)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===ul)return r.COMPRESSED_RED_RGTC1_EXT;if(i===eu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===nu)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===iu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Er?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var yu=class extends je{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},ii=class extends on{constructor(){super(),this.isGroup=!0,this.type="Group"}},ab={type:"move"},mo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ii,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ii,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ii,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,i),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ab)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new ii;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},lb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cb=`
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

}`,vu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new An,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new oi({vertexShader:lb,fragmentShader:cb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ie(new wl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Su=class extends es{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null,_=new vu,m=e.getContextAttributes(),f=null,w=null,T=[],y=[],I=new me,A=null,C=new je;C.viewport=new be;let P=new je;P.viewport=new be;let M=[C,P],v=new yu,N=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let j=T[V];return j===void 0&&(j=new mo,T[V]=j),j.getTargetRaySpace()},this.getControllerGrip=function(V){let j=T[V];return j===void 0&&(j=new mo,T[V]=j),j.getGripSpace()},this.getHand=function(V){let j=T[V];return j===void 0&&(j=new mo,T[V]=j),j.getHandSpace()};function Y(V){let j=y.indexOf(V.inputSource);if(j===-1)return;let lt=T[j];lt!==void 0&&(lt.update(V.inputSource,V.frame,c||o),lt.dispatchEvent({type:V.type,data:V.inputSource}))}function J(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",z);for(let V=0;V<T.length;V++){let j=y[V];j!==null&&(y[V]=null,T[V].disconnect(j))}N=null,X=null,_.reset(),t.setRenderTarget(f),p=null,d=null,u=null,s=null,w=null,mt.stop(),i.isPresenting=!1,t.setPixelRatio(A),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",J),s.addEventListener("inputsourceschange",z),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(I),s.renderState.layers===void 0){let j={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,j),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),w=new Ci(p.framebufferWidth,p.framebufferHeight,{format:Hn,type:Ai,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let j=null,lt=null,ht=null;m.depth&&(ht=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,j=m.stencil?Ar:vr,lt=m.stencil?Er:Es);let bt={colorFormat:e.RGBA8,depthFormat:ht,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(bt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),w=new Ci(d.textureWidth,d.textureHeight,{format:Hn,type:Ai,depthTexture:new Cl(d.textureWidth,d.textureHeight,lt,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),mt.setContext(s),mt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function z(V){for(let j=0;j<V.removed.length;j++){let lt=V.removed[j],ht=y.indexOf(lt);ht>=0&&(y[ht]=null,T[ht].disconnect(lt))}for(let j=0;j<V.added.length;j++){let lt=V.added[j],ht=y.indexOf(lt);if(ht===-1){for(let St=0;St<T.length;St++)if(St>=y.length){y.push(lt),ht=St;break}else if(y[St]===null){y[St]=lt,ht=St;break}if(ht===-1)break}let bt=T[ht];bt&&bt.connect(lt)}}let L=new k,W=new k;function R(V,j,lt){L.setFromMatrixPosition(j.matrixWorld),W.setFromMatrixPosition(lt.matrixWorld);let ht=L.distanceTo(W),bt=j.projectionMatrix.elements,St=lt.projectionMatrix.elements,Ct=bt[14]/(bt[10]-1),$t=bt[14]/(bt[10]+1),Yt=(bt[9]+1)/bt[5],Kt=(bt[9]-1)/bt[5],F=(bt[8]-1)/bt[0],ye=(St[8]+1)/St[0],Lt=Ct*F,Wt=Ct*ye,Ut=ht/(-F+ye),te=Ut*-F;if(j.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(te),V.translateZ(Ut),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),bt[10]===-1)V.projectionMatrix.copy(j.projectionMatrix),V.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{let Rt=Ct+Ut,E=$t+Ut,x=Lt-te,q=Wt+(ht-te),rt=Yt*$t/E*Rt,at=Kt*$t/E*Rt;V.projectionMatrix.makePerspective(x,q,rt,at,Rt,E),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function D(V,j){j===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(j.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let j=V.near,lt=V.far;_.texture!==null&&(_.depthNear>0&&(j=_.depthNear),_.depthFar>0&&(lt=_.depthFar)),v.near=P.near=C.near=j,v.far=P.far=C.far=lt,(N!==v.near||X!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),N=v.near,X=v.far),C.layers.mask=V.layers.mask|2,P.layers.mask=V.layers.mask|4,v.layers.mask=C.layers.mask|P.layers.mask;let ht=V.parent,bt=v.cameras;D(v,ht);for(let St=0;St<bt.length;St++)D(bt[St],ht);bt.length===2?R(v,C,P):v.projectionMatrix.copy(C.projectionMatrix),$(V,v,ht)};function $(V,j,lt){lt===null?V.matrix.copy(j.matrixWorld):(V.matrix.copy(lt.matrixWorld),V.matrix.invert(),V.matrix.multiply(j.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(j.projectionMatrix),V.projectionMatrixInverse.copy(j.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=ru*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(V){l=V,d!==null&&(d.fixedFoveation=V),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=V)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let Z=null;function tt(V,j){if(h=j.getViewerPose(c||o),g=j,h!==null){let lt=h.views;p!==null&&(t.setRenderTargetFramebuffer(w,p.framebuffer),t.setRenderTarget(w));let ht=!1;lt.length!==v.cameras.length&&(v.cameras.length=0,ht=!0);for(let St=0;St<lt.length;St++){let Ct=lt[St],$t=null;if(p!==null)$t=p.getViewport(Ct);else{let Kt=u.getViewSubImage(d,Ct);$t=Kt.viewport,St===0&&(t.setRenderTargetTextures(w,Kt.colorTexture,d.ignoreDepthValues?void 0:Kt.depthStencilTexture),t.setRenderTarget(w))}let Yt=M[St];Yt===void 0&&(Yt=new je,Yt.layers.enable(St),Yt.viewport=new be,M[St]=Yt),Yt.matrix.fromArray(Ct.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(Ct.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set($t.x,$t.y,$t.width,$t.height),St===0&&(v.matrix.copy(Yt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ht===!0&&v.cameras.push(Yt)}let bt=s.enabledFeatures;if(bt&&bt.includes("depth-sensing")){let St=u.getDepthInformation(lt[0]);St&&St.isValid&&St.texture&&_.init(t,St,s.renderState)}}for(let lt=0;lt<T.length;lt++){let ht=y[lt],bt=T[lt];ht!==null&&bt!==void 0&&bt.update(ht,j,c||o)}Z&&Z(V,j),j.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:j}),g=null}let mt=new Zm;mt.setAnimationLoop(tt),this.setAnimationLoop=function(V){Z=V},this.dispose=function(){}}},vs=new si,hb=new De;function ub(n,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,$m(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,w,T,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,w,T):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===mn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===mn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let w=t.get(f),T=w.envMap,y=w.envMapRotation;T&&(m.envMap.value=T,vs.copy(y),vs.x*=-1,vs.y*=-1,vs.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(vs.y*=-1,vs.z*=-1),m.envMapRotation.value.setFromMatrix4(hb.makeRotationFromEuler(vs)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,w,T){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*w,m.scale.value=T*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,w){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===mn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){let w=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function db(n,t,e,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,T){let y=T.program;i.uniformBlockBinding(w,y)}function c(w,T){let y=s[w.id];y===void 0&&(g(w),y=h(w),s[w.id]=y,w.addEventListener("dispose",m));let I=T.program;i.updateUBOMapping(w,I);let A=t.render.frame;r[w.id]!==A&&(d(w),r[w.id]=A)}function h(w){let T=u();w.__bindingPointIndex=T;let y=n.createBuffer(),I=w.__size,A=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,I,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,y),y}function u(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){let T=s[w.id],y=w.uniforms,I=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let A=0,C=y.length;A<C;A++){let P=Array.isArray(y[A])?y[A]:[y[A]];for(let M=0,v=P.length;M<v;M++){let N=P[M];if(p(N,A,M,I)===!0){let X=N.__offset,Y=Array.isArray(N.value)?N.value:[N.value],J=0;for(let z=0;z<Y.length;z++){let L=Y[z],W=_(L);typeof L=="number"||typeof L=="boolean"?(N.__data[0]=L,n.bufferSubData(n.UNIFORM_BUFFER,X+J,N.__data)):L.isMatrix3?(N.__data[0]=L.elements[0],N.__data[1]=L.elements[1],N.__data[2]=L.elements[2],N.__data[3]=0,N.__data[4]=L.elements[3],N.__data[5]=L.elements[4],N.__data[6]=L.elements[5],N.__data[7]=0,N.__data[8]=L.elements[6],N.__data[9]=L.elements[7],N.__data[10]=L.elements[8],N.__data[11]=0):(L.toArray(N.__data,J),J+=W.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,X,N.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,T,y,I){let A=w.value,C=T+"_"+y;if(I[C]===void 0)return typeof A=="number"||typeof A=="boolean"?I[C]=A:I[C]=A.clone(),!0;{let P=I[C];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return I[C]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function g(w){let T=w.uniforms,y=0,I=16;for(let C=0,P=T.length;C<P;C++){let M=Array.isArray(T[C])?T[C]:[T[C]];for(let v=0,N=M.length;v<N;v++){let X=M[v],Y=Array.isArray(X.value)?X.value:[X.value];for(let J=0,z=Y.length;J<z;J++){let L=Y[J],W=_(L),R=y%I,D=R%W.boundary,$=R+D;y+=D,$!==0&&I-$<W.storage&&(y+=I-$),X.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=y,y+=W.storage}}}let A=y%I;return A>0&&(y+=I-A),w.__size=y,w.__cache={},this}function _(w){let T={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(T.boundary=4,T.storage=4):w.isVector2?(T.boundary=8,T.storage=8):w.isVector3||w.isColor?(T.boundary=16,T.storage=12):w.isVector4?(T.boundary=16,T.storage=16):w.isMatrix3?(T.boundary=48,T.storage=48):w.isMatrix4?(T.boundary=64,T.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),T}function m(w){let T=w.target;T.removeEventListener("dispose",m);let y=o.indexOf(T.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function f(){for(let w in s)n.deleteBuffer(s[w]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}var Rl=class{constructor(t={}){let{canvas:e=gx(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,f=null,w=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=wn,this.toneMapping=ji,this.toneMappingExposure=1;let y=this,I=!1,A=0,C=0,P=null,M=-1,v=null,N=new be,X=new be,Y=null,J=new ce(0),z=0,L=e.width,W=e.height,R=1,D=null,$=null,Z=new be(0,0,L,W),tt=new be(0,0,L,W),mt=!1,V=new _o,j=!1,lt=!1,ht=new De,bt=new De,St=new k,Ct=new be,$t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Yt=!1;function Kt(){return P===null?R:1}let F=i;function ye(S,B){return e.getContext(S,B)}try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",ct,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",xt,!1),F===null){let B="webgl2";if(F=ye(B,S),F===null)throw ye(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Lt,Wt,Ut,te,Rt,E,x,q,rt,at,ot,Dt,_t,Mt,ne,dt,Et,Pt,Ht,Tt,It,Ot,_e,O;function vt(){Lt=new CS(F),Lt.init(),Ot=new ob(F,Lt),Wt=new MS(F,Lt,t,Ot),Ut=new ib(F,Lt),Wt.reverseDepthBuffer&&d&&Ut.buffers.depth.setReversed(!0),te=new IS(F),Rt=new WM,E=new rb(F,Lt,Ut,Rt,Wt,Ot,te),x=new TS(y),q=new AS(y),rt=new Bx(F),_e=new vS(F,rt),at=new RS(F,rt,te,_e),ot=new LS(F,at,rt,te),Ht=new DS(F,Wt,E),dt=new bS(Rt),Dt=new GM(y,x,q,Lt,Wt,_e,dt),_t=new ub(y,Rt),Mt=new YM,ne=new QM(Lt),Pt=new yS(y,x,q,Ut,ot,p,l),Et=new eb(y,ot,Wt),O=new db(F,te,Wt,Ut),Tt=new SS(F,Lt,te),It=new PS(F,Lt,te),te.programs=Dt.programs,y.capabilities=Wt,y.extensions=Lt,y.properties=Rt,y.renderLists=Mt,y.shadowMap=Et,y.state=Ut,y.info=te}vt();let it=new Su(y,F);this.xr=it,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let S=Lt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=Lt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return R},this.setPixelRatio=function(S){S!==void 0&&(R=S,this.setSize(L,W,!1))},this.getSize=function(S){return S.set(L,W)},this.setSize=function(S,B,K=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}L=S,W=B,e.width=Math.floor(S*R),e.height=Math.floor(B*R),K===!0&&(e.style.width=S+"px",e.style.height=B+"px"),this.setViewport(0,0,S,B)},this.getDrawingBufferSize=function(S){return S.set(L*R,W*R).floor()},this.setDrawingBufferSize=function(S,B,K){L=S,W=B,R=K,e.width=Math.floor(S*K),e.height=Math.floor(B*K),this.setViewport(0,0,S,B)},this.getCurrentViewport=function(S){return S.copy(N)},this.getViewport=function(S){return S.copy(Z)},this.setViewport=function(S,B,K,Q){S.isVector4?Z.set(S.x,S.y,S.z,S.w):Z.set(S,B,K,Q),Ut.viewport(N.copy(Z).multiplyScalar(R).round())},this.getScissor=function(S){return S.copy(tt)},this.setScissor=function(S,B,K,Q){S.isVector4?tt.set(S.x,S.y,S.z,S.w):tt.set(S,B,K,Q),Ut.scissor(X.copy(tt).multiplyScalar(R).round())},this.getScissorTest=function(){return mt},this.setScissorTest=function(S){Ut.setScissorTest(mt=S)},this.setOpaqueSort=function(S){D=S},this.setTransparentSort=function(S){$=S},this.getClearColor=function(S){return S.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor.apply(Pt,arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha.apply(Pt,arguments)},this.clear=function(S=!0,B=!0,K=!0){let Q=0;if(S){let H=!1;if(P!==null){let pt=P.texture.format;H=pt===zu||pt===Bu||pt===Ou}if(H){let pt=P.texture.type,wt=pt===Ai||pt===Es||pt===go||pt===Er||pt===Nu||pt===Fu,Nt=Pt.getClearColor(),Ft=Pt.getClearAlpha(),qt=Nt.r,Zt=Nt.g,Bt=Nt.b;wt?(g[0]=qt,g[1]=Zt,g[2]=Bt,g[3]=Ft,F.clearBufferuiv(F.COLOR,0,g)):(_[0]=qt,_[1]=Zt,_[2]=Bt,_[3]=Ft,F.clearBufferiv(F.COLOR,0,_))}else Q|=F.COLOR_BUFFER_BIT}B&&(Q|=F.DEPTH_BUFFER_BIT),K&&(Q|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ct,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),Mt.dispose(),ne.dispose(),Rt.dispose(),x.dispose(),q.dispose(),ot.dispose(),_e.dispose(),O.dispose(),Dt.dispose(),it.dispose(),it.removeEventListener("sessionstart",Gr),it.removeEventListener("sessionend",Dn),cn.stop()};function ct(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;let S=te.autoReset,B=Et.enabled,K=Et.autoUpdate,Q=Et.needsUpdate,H=Et.type;vt(),te.autoReset=S,Et.enabled=B,Et.autoUpdate=K,Et.needsUpdate=Q,Et.type=H}function xt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Xt(S){let B=S.target;B.removeEventListener("dispose",Xt),Ee(B)}function Ee(S){We(S),Rt.remove(S)}function We(S){let B=Rt.get(S).programs;B!==void 0&&(B.forEach(function(K){Dt.releaseProgram(K)}),S.isShaderMaterial&&Dt.releaseShaderCache(S))}this.renderBufferDirect=function(S,B,K,Q,H,pt){B===null&&(B=$t);let wt=H.isMesh&&H.matrixWorld.determinant()<0,Nt=oc(S,B,K,Q,H);Ut.setMaterial(Q,wt);let Ft=K.index,qt=1;if(Q.wireframe===!0){if(Ft=at.getWireframeAttribute(K),Ft===void 0)return;qt=2}let Zt=K.drawRange,Bt=K.attributes.position,ie=Zt.start*qt,ge=(Zt.start+Zt.count)*qt;pt!==null&&(ie=Math.max(ie,pt.start*qt),ge=Math.min(ge,(pt.start+pt.count)*qt)),Ft!==null?(ie=Math.max(ie,0),ge=Math.min(ge,Ft.count)):Bt!=null&&(ie=Math.max(ie,0),ge=Math.min(ge,Bt.count));let we=ge-ie;if(we<0||we===1/0)return;_e.setup(H,Q,Nt,K,Ft);let $e,fe=Tt;if(Ft!==null&&($e=rt.get(Ft),fe=It,fe.setIndex($e)),H.isMesh)Q.wireframe===!0?(Ut.setLineWidth(Q.wireframeLinewidth*Kt()),fe.setMode(F.LINES)):fe.setMode(F.TRIANGLES);else if(H.isLine){let Vt=Q.linewidth;Vt===void 0&&(Vt=1),Ut.setLineWidth(Vt*Kt()),H.isLineSegments?fe.setMode(F.LINES):H.isLineLoop?fe.setMode(F.LINE_LOOP):fe.setMode(F.LINE_STRIP)}else H.isPoints?fe.setMode(F.POINTS):H.isSprite&&fe.setMode(F.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)fe.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(Lt.get("WEBGL_multi_draw"))fe.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Vt=H._multiDrawStarts,Un=H._multiDrawCounts,pe=H._multiDrawCount,hn=Ft?rt.get(Ft).bytesPerElement:1,Li=Rt.get(Q).currentProgram.getUniforms();for(let en=0;en<pe;en++)Li.setValue(F,"_gl_DrawID",en),fe.render(Vt[en]/hn,Un[en])}else if(H.isInstancedMesh)fe.renderInstances(ie,we,H.count);else if(K.isInstancedBufferGeometry){let Vt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Un=Math.min(K.instanceCount,Vt);fe.renderInstances(ie,we,Un)}else fe.render(ie,we)};function ae(S,B,K){S.transparent===!0&&S.side===bi&&S.forceSinglePass===!1?(S.side=mn,S.needsUpdate=!0,Di(S,B,K),S.side=ts,S.needsUpdate=!0,Di(S,B,K),S.side=bi):Di(S,B,K)}this.compile=function(S,B,K=null){K===null&&(K=S),f=ne.get(K),f.init(B),T.push(f),K.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),S!==K&&S.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),f.setupLights();let Q=new Set;return S.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let pt=H.material;if(pt)if(Array.isArray(pt))for(let wt=0;wt<pt.length;wt++){let Nt=pt[wt];ae(Nt,K,H),Q.add(Nt)}else ae(pt,K,H),Q.add(pt)}),T.pop(),f=null,Q},this.compileAsync=function(S,B,K=null){let Q=this.compile(S,B,K);return new Promise(H=>{function pt(){if(Q.forEach(function(wt){Rt.get(wt).currentProgram.isReady()&&Q.delete(wt)}),Q.size===0){H(S);return}setTimeout(pt,10)}Lt.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let ve=null;function In(S){ve&&ve(S)}function Gr(){cn.stop()}function Dn(){cn.start()}let cn=new Zm;cn.setAnimationLoop(In),typeof self<"u"&&cn.setContext(self),this.setAnimationLoop=function(S){ve=S,it.setAnimationLoop(S),S===null?cn.stop():cn.start()},it.addEventListener("sessionstart",Gr),it.addEventListener("sessionend",Dn),this.render=function(S,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(B),B=it.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,B,P),f=ne.get(S,T.length),f.init(B),T.push(f),bt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),V.setFromProjectionMatrix(bt),lt=this.localClippingEnabled,j=dt.init(this.clippingPlanes,lt),m=Mt.get(S,w.length),m.init(),w.push(m),it.enabled===!0&&it.isPresenting===!0){let pt=y.xr.getDepthSensingMesh();pt!==null&&Ln(pt,B,-1/0,y.sortObjects)}Ln(S,B,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(D,$),Yt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Yt&&Pt.addToRenderList(m,S),this.info.render.frame++,j===!0&&dt.beginShadows();let K=f.state.shadowsArray;Et.render(K,S,B),j===!0&&dt.endShadows(),this.info.autoReset===!0&&this.info.reset();let Q=m.opaque,H=m.transmissive;if(f.setupLights(),B.isArrayCamera){let pt=B.cameras;if(H.length>0)for(let wt=0,Nt=pt.length;wt<Nt;wt++){let Ft=pt[wt];Io(Q,H,S,Ft)}Yt&&Pt.render(S);for(let wt=0,Nt=pt.length;wt<Nt;wt++){let Ft=pt[wt];Wr(m,S,Ft,Ft.viewport)}}else H.length>0&&Io(Q,H,S,B),Yt&&Pt.render(S),Wr(m,S,B);P!==null&&(E.updateMultisampleRenderTarget(P),E.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(y,S,B),_e.resetDefaultState(),M=-1,v=null,T.pop(),T.length>0?(f=T[T.length-1],j===!0&&dt.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function Ln(S,B,K,Q){if(S.visible===!1)return;if(S.layers.test(B.layers)){if(S.isGroup)K=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(B);else if(S.isLight)f.pushLight(S),S.castShadow&&f.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||V.intersectsSprite(S)){Q&&Ct.setFromMatrixPosition(S.matrixWorld).applyMatrix4(bt);let wt=ot.update(S),Nt=S.material;Nt.visible&&m.push(S,wt,Nt,K,Ct.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||V.intersectsObject(S))){let wt=ot.update(S),Nt=S.material;if(Q&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ct.copy(S.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),Ct.copy(wt.boundingSphere.center)),Ct.applyMatrix4(S.matrixWorld).applyMatrix4(bt)),Array.isArray(Nt)){let Ft=wt.groups;for(let qt=0,Zt=Ft.length;qt<Zt;qt++){let Bt=Ft[qt],ie=Nt[Bt.materialIndex];ie&&ie.visible&&m.push(S,wt,ie,K,Ct.z,Bt)}}else Nt.visible&&m.push(S,wt,Nt,K,Ct.z,null)}}let pt=S.children;for(let wt=0,Nt=pt.length;wt<Nt;wt++)Ln(pt[wt],B,K,Q)}function Wr(S,B,K,Q){let H=S.opaque,pt=S.transmissive,wt=S.transparent;f.setupLightsView(K),j===!0&&dt.setGlobalState(y.clippingPlanes,K),Q&&Ut.viewport(N.copy(Q)),H.length>0&&cs(H,B,K),pt.length>0&&cs(pt,B,K),wt.length>0&&cs(wt,B,K),Ut.buffers.depth.setTest(!0),Ut.buffers.depth.setMask(!0),Ut.buffers.color.setMask(!0),Ut.setPolygonOffset(!1)}function Io(S,B,K,Q){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[Q.id]===void 0&&(f.state.transmissionRenderTarget[Q.id]=new Ci(1,1,{generateMipmaps:!0,type:Lt.has("EXT_color_buffer_half_float")||Lt.has("EXT_color_buffer_float")?vo:Ai,minFilter:ws,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:de.workingColorSpace}));let pt=f.state.transmissionRenderTarget[Q.id],wt=Q.viewport||N;pt.setSize(wt.z,wt.w);let Nt=y.getRenderTarget();y.setRenderTarget(pt),y.getClearColor(J),z=y.getClearAlpha(),z<1&&y.setClearColor(16777215,.5),y.clear(),Yt&&Pt.render(K);let Ft=y.toneMapping;y.toneMapping=ji;let qt=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),f.setupLightsView(Q),j===!0&&dt.setGlobalState(y.clippingPlanes,Q),cs(S,K,Q),E.updateMultisampleRenderTarget(pt),E.updateRenderTargetMipmap(pt),Lt.has("WEBGL_multisampled_render_to_texture")===!1){let Zt=!1;for(let Bt=0,ie=B.length;Bt<ie;Bt++){let ge=B[Bt],we=ge.object,$e=ge.geometry,fe=ge.material,Vt=ge.group;if(fe.side===bi&&we.layers.test(Q.layers)){let Un=fe.side;fe.side=mn,fe.needsUpdate=!0,Do(we,K,Q,$e,fe,Vt),fe.side=Un,fe.needsUpdate=!0,Zt=!0}}Zt===!0&&(E.updateMultisampleRenderTarget(pt),E.updateRenderTargetMipmap(pt))}y.setRenderTarget(Nt),y.setClearColor(J,z),qt!==void 0&&(Q.viewport=qt),y.toneMapping=Ft}function cs(S,B,K){let Q=B.isScene===!0?B.overrideMaterial:null;for(let H=0,pt=S.length;H<pt;H++){let wt=S[H],Nt=wt.object,Ft=wt.geometry,qt=Q===null?wt.material:Q,Zt=wt.group;Nt.layers.test(K.layers)&&Do(Nt,B,K,Ft,qt,Zt)}}function Do(S,B,K,Q,H,pt){S.onBeforeRender(y,B,K,Q,H,pt),S.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),H.onBeforeRender(y,B,K,Q,S,pt),H.transparent===!0&&H.side===bi&&H.forceSinglePass===!1?(H.side=mn,H.needsUpdate=!0,y.renderBufferDirect(K,B,Q,H,S,pt),H.side=ts,H.needsUpdate=!0,y.renderBufferDirect(K,B,Q,H,S,pt),H.side=bi):y.renderBufferDirect(K,B,Q,H,S,pt),S.onAfterRender(y,B,K,Q,H,pt)}function Di(S,B,K){B.isScene!==!0&&(B=$t);let Q=Rt.get(S),H=f.state.lights,pt=f.state.shadowsArray,wt=H.state.version,Nt=Dt.getParameters(S,H.state,pt,B,K),Ft=Dt.getProgramCacheKey(Nt),qt=Q.programs;Q.environment=S.isMeshStandardMaterial?B.environment:null,Q.fog=B.fog,Q.envMap=(S.isMeshStandardMaterial?q:x).get(S.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&S.envMap===null?B.environmentRotation:S.envMapRotation,qt===void 0&&(S.addEventListener("dispose",Xt),qt=new Map,Q.programs=qt);let Zt=qt.get(Ft);if(Zt!==void 0){if(Q.currentProgram===Zt&&Q.lightsStateVersion===wt)return Lo(S,Nt),Zt}else Nt.uniforms=Dt.getUniforms(S),S.onBeforeCompile(Nt,y),Zt=Dt.acquireProgram(Nt,Ft),qt.set(Ft,Zt),Q.uniforms=Nt.uniforms;let Bt=Q.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Bt.clippingPlanes=dt.uniform),Lo(S,Nt),Q.needsLights=Ae(S),Q.lightsStateVersion=wt,Q.needsLights&&(Bt.ambientLightColor.value=H.state.ambient,Bt.lightProbe.value=H.state.probe,Bt.directionalLights.value=H.state.directional,Bt.directionalLightShadows.value=H.state.directionalShadow,Bt.spotLights.value=H.state.spot,Bt.spotLightShadows.value=H.state.spotShadow,Bt.rectAreaLights.value=H.state.rectArea,Bt.ltc_1.value=H.state.rectAreaLTC1,Bt.ltc_2.value=H.state.rectAreaLTC2,Bt.pointLights.value=H.state.point,Bt.pointLightShadows.value=H.state.pointShadow,Bt.hemisphereLights.value=H.state.hemi,Bt.directionalShadowMap.value=H.state.directionalShadowMap,Bt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Bt.spotShadowMap.value=H.state.spotShadowMap,Bt.spotLightMatrix.value=H.state.spotLightMatrix,Bt.spotLightMap.value=H.state.spotLightMap,Bt.pointShadowMap.value=H.state.pointShadowMap,Bt.pointShadowMatrix.value=H.state.pointShadowMatrix),Q.currentProgram=Zt,Q.uniformsList=null,Zt}function kt(S){if(S.uniformsList===null){let B=S.currentProgram.getUniforms();S.uniformsList=Mr.seqWithValue(B.seq,S.uniforms)}return S.uniformsList}function Lo(S,B){let K=Rt.get(S);K.outputColorSpace=B.outputColorSpace,K.batching=B.batching,K.batchingColor=B.batchingColor,K.instancing=B.instancing,K.instancingColor=B.instancingColor,K.instancingMorph=B.instancingMorph,K.skinning=B.skinning,K.morphTargets=B.morphTargets,K.morphNormals=B.morphNormals,K.morphColors=B.morphColors,K.morphTargetsCount=B.morphTargetsCount,K.numClippingPlanes=B.numClippingPlanes,K.numIntersection=B.numClipIntersection,K.vertexAlphas=B.vertexAlphas,K.vertexTangents=B.vertexTangents,K.toneMapping=B.toneMapping}function oc(S,B,K,Q,H){B.isScene!==!0&&(B=$t),E.resetTextureUnits();let pt=B.fog,wt=Q.isMeshStandardMaterial?B.environment:null,Nt=P===null?y.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Lr,Ft=(Q.isMeshStandardMaterial?q:x).get(Q.envMap||wt),qt=Q.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Zt=!!K.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Bt=!!K.morphAttributes.position,ie=!!K.morphAttributes.normal,ge=!!K.morphAttributes.color,we=ji;Q.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(we=y.toneMapping);let $e=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,fe=$e!==void 0?$e.length:0,Vt=Rt.get(Q),Un=f.state.lights;if(j===!0&&(lt===!0||S!==v)){let nn=S===v&&Q.id===M;dt.setState(Q,S,nn)}let pe=!1;Q.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==Un.state.version||Vt.outputColorSpace!==Nt||H.isBatchedMesh&&Vt.batching===!1||!H.isBatchedMesh&&Vt.batching===!0||H.isBatchedMesh&&Vt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Vt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Vt.instancing===!1||!H.isInstancedMesh&&Vt.instancing===!0||H.isSkinnedMesh&&Vt.skinning===!1||!H.isSkinnedMesh&&Vt.skinning===!0||H.isInstancedMesh&&Vt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Vt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Vt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Vt.instancingMorph===!1&&H.morphTexture!==null||Vt.envMap!==Ft||Q.fog===!0&&Vt.fog!==pt||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==dt.numPlanes||Vt.numIntersection!==dt.numIntersection)||Vt.vertexAlphas!==qt||Vt.vertexTangents!==Zt||Vt.morphTargets!==Bt||Vt.morphNormals!==ie||Vt.morphColors!==ge||Vt.toneMapping!==we||Vt.morphTargetsCount!==fe)&&(pe=!0):(pe=!0,Vt.__version=Q.version);let hn=Vt.currentProgram;pe===!0&&(hn=Di(Q,B,H));let Li=!1,en=!1,qn=!1,xe=hn.getUniforms(),vn=Vt.uniforms;if(Ut.useProgram(hn.program)&&(Li=!0,en=!0,qn=!0),Q.id!==M&&(M=Q.id,en=!0),Li||v!==S){Ut.buffers.depth.getReversed()?(ht.copy(S.projectionMatrix),xx(ht),yx(ht),xe.setValue(F,"projectionMatrix",ht)):xe.setValue(F,"projectionMatrix",S.projectionMatrix),xe.setValue(F,"viewMatrix",S.matrixWorldInverse);let $n=xe.map.cameraPosition;$n!==void 0&&$n.setValue(F,St.setFromMatrixPosition(S.matrixWorld)),Wt.logarithmicDepthBuffer&&xe.setValue(F,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&xe.setValue(F,"isOrthographic",S.isOrthographicCamera===!0),v!==S&&(v=S,en=!0,qn=!0)}if(H.isSkinnedMesh){xe.setOptional(F,H,"bindMatrix"),xe.setOptional(F,H,"bindMatrixInverse");let nn=H.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),xe.setValue(F,"boneTexture",nn.boneTexture,E))}H.isBatchedMesh&&(xe.setOptional(F,H,"batchingTexture"),xe.setValue(F,"batchingTexture",H._matricesTexture,E),xe.setOptional(F,H,"batchingIdTexture"),xe.setValue(F,"batchingIdTexture",H._indirectTexture,E),xe.setOptional(F,H,"batchingColorTexture"),H._colorsTexture!==null&&xe.setValue(F,"batchingColorTexture",H._colorsTexture,E));let ui=K.morphAttributes;if((ui.position!==void 0||ui.normal!==void 0||ui.color!==void 0)&&Ht.update(H,K,hn),(en||Vt.receiveShadow!==H.receiveShadow)&&(Vt.receiveShadow=H.receiveShadow,xe.setValue(F,"receiveShadow",H.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(vn.envMap.value=Ft,vn.flipEnvMap.value=Ft.isCubeTexture&&Ft.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&B.environment!==null&&(vn.envMapIntensity.value=B.environmentIntensity),en&&(xe.setValue(F,"toneMappingExposure",y.toneMappingExposure),Vt.needsLights&&ac(vn,qn),pt&&Q.fog===!0&&_t.refreshFogUniforms(vn,pt),_t.refreshMaterialUniforms(vn,Q,R,W,f.state.transmissionRenderTarget[S.id]),Mr.upload(F,kt(Vt),vn,E)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(Mr.upload(F,kt(Vt),vn,E),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&xe.setValue(F,"center",H.center),xe.setValue(F,"modelViewMatrix",H.modelViewMatrix),xe.setValue(F,"normalMatrix",H.normalMatrix),xe.setValue(F,"modelMatrix",H.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){let nn=Q.uniformsGroups;for(let $n=0,Nn=nn.length;$n<Nn;$n++){let Xr=nn[$n];O.update(Xr,hn),O.bind(Xr,hn)}}return hn}function ac(S,B){S.ambientLightColor.needsUpdate=B,S.lightProbe.needsUpdate=B,S.directionalLights.needsUpdate=B,S.directionalLightShadows.needsUpdate=B,S.pointLights.needsUpdate=B,S.pointLightShadows.needsUpdate=B,S.spotLights.needsUpdate=B,S.spotLightShadows.needsUpdate=B,S.rectAreaLights.needsUpdate=B,S.hemisphereLights.needsUpdate=B}function Ae(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,B,K){Rt.get(S.texture).__webglTexture=B,Rt.get(S.depthTexture).__webglTexture=K;let Q=Rt.get(S);Q.__hasExternalTextures=!0,Q.__autoAllocateDepthBuffer=K===void 0,Q.__autoAllocateDepthBuffer||Lt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,B){let K=Rt.get(S);K.__webglFramebuffer=B,K.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(S,B=0,K=0){P=S,A=B,C=K;let Q=!0,H=null,pt=!1,wt=!1;if(S){let Ft=Rt.get(S);if(Ft.__useDefaultFramebuffer!==void 0)Ut.bindFramebuffer(F.FRAMEBUFFER,null),Q=!1;else if(Ft.__webglFramebuffer===void 0)E.setupRenderTarget(S);else if(Ft.__hasExternalTextures)E.rebindTextures(S,Rt.get(S.texture).__webglTexture,Rt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Bt=S.depthTexture;if(Ft.__boundDepthTexture!==Bt){if(Bt!==null&&Rt.has(Bt)&&(S.width!==Bt.image.width||S.height!==Bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(S)}}let qt=S.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(wt=!0);let Zt=Rt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Zt[B])?H=Zt[B][K]:H=Zt[B],pt=!0):S.samples>0&&E.useMultisampledRTT(S)===!1?H=Rt.get(S).__webglMultisampledFramebuffer:Array.isArray(Zt)?H=Zt[K]:H=Zt,N.copy(S.viewport),X.copy(S.scissor),Y=S.scissorTest}else N.copy(Z).multiplyScalar(R).floor(),X.copy(tt).multiplyScalar(R).floor(),Y=mt;if(Ut.bindFramebuffer(F.FRAMEBUFFER,H)&&Q&&Ut.drawBuffers(S,H),Ut.viewport(N),Ut.scissor(X),Ut.setScissorTest(Y),pt){let Ft=Rt.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ft.__webglTexture,K)}else if(wt){let Ft=Rt.get(S.texture),qt=B||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ft.__webglTexture,K||0,qt)}M=-1},this.readRenderTargetPixels=function(S,B,K,Q,H,pt,wt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Nt=Rt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&wt!==void 0&&(Nt=Nt[wt]),Nt){Ut.bindFramebuffer(F.FRAMEBUFFER,Nt);try{let Ft=S.texture,qt=Ft.format,Zt=Ft.type;if(!Wt.textureFormatReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Wt.textureTypeReadable(Zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=S.width-Q&&K>=0&&K<=S.height-H&&F.readPixels(B,K,Q,H,Ot.convert(qt),Ot.convert(Zt),pt)}finally{let Ft=P!==null?Rt.get(P).__webglFramebuffer:null;Ut.bindFramebuffer(F.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(S,B,K,Q,H,pt,wt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Nt=Rt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&wt!==void 0&&(Nt=Nt[wt]),Nt){let Ft=S.texture,qt=Ft.format,Zt=Ft.type;if(!Wt.textureFormatReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Wt.textureTypeReadable(Zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=S.width-Q&&K>=0&&K<=S.height-H){Ut.bindFramebuffer(F.FRAMEBUFFER,Nt);let Bt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Bt),F.bufferData(F.PIXEL_PACK_BUFFER,pt.byteLength,F.STREAM_READ),F.readPixels(B,K,Q,H,Ot.convert(qt),Ot.convert(Zt),0);let ie=P!==null?Rt.get(P).__webglFramebuffer:null;Ut.bindFramebuffer(F.FRAMEBUFFER,ie);let ge=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await _x(F,ge,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Bt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,pt),F.deleteBuffer(Bt),F.deleteSync(ge),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,B=null,K=0){S.isTexture!==!0&&(fo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,S=arguments[1]);let Q=Math.pow(2,-K),H=Math.floor(S.image.width*Q),pt=Math.floor(S.image.height*Q),wt=B!==null?B.x:0,Nt=B!==null?B.y:0;E.setTexture2D(S,0),F.copyTexSubImage2D(F.TEXTURE_2D,K,0,0,wt,Nt,H,pt),Ut.unbindTexture()},this.copyTextureToTexture=function(S,B,K=null,Q=null,H=0){S.isTexture!==!0&&(fo("WebGLRenderer: copyTextureToTexture function signature has changed."),Q=arguments[0]||null,S=arguments[1],B=arguments[2],H=arguments[3]||0,K=null);let pt,wt,Nt,Ft,qt,Zt,Bt,ie,ge,we=S.isCompressedTexture?S.mipmaps[H]:S.image;K!==null?(pt=K.max.x-K.min.x,wt=K.max.y-K.min.y,Nt=K.isBox3?K.max.z-K.min.z:1,Ft=K.min.x,qt=K.min.y,Zt=K.isBox3?K.min.z:0):(pt=we.width,wt=we.height,Nt=we.depth||1,Ft=0,qt=0,Zt=0),Q!==null?(Bt=Q.x,ie=Q.y,ge=Q.z):(Bt=0,ie=0,ge=0);let $e=Ot.convert(B.format),fe=Ot.convert(B.type),Vt;B.isData3DTexture?(E.setTexture3D(B,0),Vt=F.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(E.setTexture2DArray(B,0),Vt=F.TEXTURE_2D_ARRAY):(E.setTexture2D(B,0),Vt=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,B.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,B.unpackAlignment);let Un=F.getParameter(F.UNPACK_ROW_LENGTH),pe=F.getParameter(F.UNPACK_IMAGE_HEIGHT),hn=F.getParameter(F.UNPACK_SKIP_PIXELS),Li=F.getParameter(F.UNPACK_SKIP_ROWS),en=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,we.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,we.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ft),F.pixelStorei(F.UNPACK_SKIP_ROWS,qt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Zt);let qn=S.isDataArrayTexture||S.isData3DTexture,xe=B.isDataArrayTexture||B.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){let vn=Rt.get(S),ui=Rt.get(B),nn=Rt.get(vn.__renderTarget),$n=Rt.get(ui.__renderTarget);Ut.bindFramebuffer(F.READ_FRAMEBUFFER,nn.__webglFramebuffer),Ut.bindFramebuffer(F.DRAW_FRAMEBUFFER,$n.__webglFramebuffer);for(let Nn=0;Nn<Nt;Nn++)qn&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Rt.get(S).__webglTexture,H,Zt+Nn),S.isDepthTexture?(xe&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Rt.get(B).__webglTexture,H,ge+Nn),F.blitFramebuffer(Ft,qt,pt,wt,Bt,ie,pt,wt,F.DEPTH_BUFFER_BIT,F.NEAREST)):xe?F.copyTexSubImage3D(Vt,H,Bt,ie,ge+Nn,Ft,qt,pt,wt):F.copyTexSubImage2D(Vt,H,Bt,ie,ge+Nn,Ft,qt,pt,wt);Ut.bindFramebuffer(F.READ_FRAMEBUFFER,null),Ut.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else xe?S.isDataTexture||S.isData3DTexture?F.texSubImage3D(Vt,H,Bt,ie,ge,pt,wt,Nt,$e,fe,we.data):B.isCompressedArrayTexture?F.compressedTexSubImage3D(Vt,H,Bt,ie,ge,pt,wt,Nt,$e,we.data):F.texSubImage3D(Vt,H,Bt,ie,ge,pt,wt,Nt,$e,fe,we):S.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,H,Bt,ie,pt,wt,$e,fe,we.data):S.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,H,Bt,ie,we.width,we.height,$e,we.data):F.texSubImage2D(F.TEXTURE_2D,H,Bt,ie,pt,wt,$e,fe,we);F.pixelStorei(F.UNPACK_ROW_LENGTH,Un),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,pe),F.pixelStorei(F.UNPACK_SKIP_PIXELS,hn),F.pixelStorei(F.UNPACK_SKIP_ROWS,Li),F.pixelStorei(F.UNPACK_SKIP_IMAGES,en),H===0&&B.generateMipmaps&&F.generateMipmap(Vt),Ut.unbindTexture()},this.copyTextureToTexture3D=function(S,B,K=null,Q=null,H=0){return S.isTexture!==!0&&(fo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,Q=arguments[1]||null,S=arguments[2],B=arguments[3],H=arguments[4]||0),fo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,B,K,Q,H)},this.initRenderTarget=function(S){Rt.get(S).__webglFramebuffer===void 0&&E.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?E.setTextureCube(S,0):S.isData3DTexture?E.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?E.setTexture2DArray(S,0):E.setTexture2D(S,0),Ut.unbindTexture()},this.resetState=function(){A=0,C=0,P=null,Ut.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=de._getDrawingBufferColorSpace(t),e.unpackColorSpace=de._getUnpackColorSpace()}};var Pl=class extends on{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new si,this.environmentIntensity=1,this.environmentRotation=new si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Pr=class extends is{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new ce(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Il=new k,Dl=new k,bm=new De,ho=new xl,el=new Cr,mh=new k,Tm=new k,xo=class extends on{constructor(t=new yn,e=new Pr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Il.fromBufferAttribute(e,s-1),Dl.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Il.distanceTo(Dl);t.setAttribute("lineDistance",new Ye(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),el.copy(i.boundingSphere),el.applyMatrix4(s),el.radius+=r,t.ray.intersectsSphere(el)===!1)return;bm.copy(s).invert(),ho.copy(t.ray).applyMatrix4(bm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){let f=h.getX(_),w=h.getX(_+1),T=nl(this,t,ho,l,f,w);T&&e.push(T)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(p),f=nl(this,t,ho,l,_,m);f&&e.push(f)}}else{let p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){let f=nl(this,t,ho,l,_,_+1);f&&e.push(f)}if(this.isLineLoop){let _=nl(this,t,ho,l,g-1,p);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function nl(n,t,e,i,s,r){let o=n.geometry.attributes.position;if(Il.fromBufferAttribute(o,s),Dl.fromBufferAttribute(o,r),e.distanceSqToSegment(Il,Dl,mh,Tm)>i)return;mh.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(mh);if(!(l<t.near||l>t.far))return{distance:l,point:Tm.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}var wm=new k,Em=new k,Ri=class extends xo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)wm.fromBufferAttribute(e,s),Em.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+wm.distanceTo(Em);t.setAttribute("lineDistance",new Ye(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ir=class n extends yn{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],p=[],g=0,_=[],m=i/2,f=0;w(),o===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new Ye(u,3)),this.setAttribute("normal",new Ye(d,3)),this.setAttribute("uv",new Ye(p,2));function w(){let y=new k,I=new k,A=0,C=(e-t)/i;for(let P=0;P<=r;P++){let M=[],v=P/r,N=v*(e-t)+t;for(let X=0;X<=s;X++){let Y=X/s,J=Y*l+a,z=Math.sin(J),L=Math.cos(J);I.x=N*z,I.y=-v*i+m,I.z=N*L,u.push(I.x,I.y,I.z),y.set(z,C,L).normalize(),d.push(y.x,y.y,y.z),p.push(Y,1-v),M.push(g++)}_.push(M)}for(let P=0;P<s;P++)for(let M=0;M<r;M++){let v=_[M][P],N=_[M+1][P],X=_[M+1][P+1],Y=_[M][P+1];(t>0||M!==0)&&(h.push(v,N,Y),A+=3),(e>0||M!==r-1)&&(h.push(N,X,Y),A+=3)}c.addGroup(f,A,0),f+=A}function T(y){let I=g,A=new me,C=new k,P=0,M=y===!0?t:e,v=y===!0?1:-1;for(let X=1;X<=s;X++)u.push(0,m*v,0),d.push(0,v,0),p.push(.5,.5),g++;let N=g;for(let X=0;X<=s;X++){let J=X/s*l+a,z=Math.cos(J),L=Math.sin(J);C.x=M*L,C.y=m*v,C.z=M*z,u.push(C.x,C.y,C.z),d.push(0,v,0),A.x=z*.5+.5,A.y=L*.5*v+.5,p.push(A.x,A.y),g++}for(let X=0;X<s;X++){let Y=I+X,J=N+X;y===!0?h.push(J,J+1,Y):h.push(J+1,J,Y),P+=3}c.addGroup(f,P,y===!0?1:2),f+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var il=new k,sl=new k,gh=new k,rl=new Ji,Pi=class extends yn{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(dl*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},p=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:_,b:m,c:f}=rl;if(_.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),f.fromBufferAttribute(a,c[2]),rl.getNormal(gh),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let w=0;w<3;w++){let T=(w+1)%3,y=u[w],I=u[T],A=rl[h[w]],C=rl[h[T]],P=`${y}_${I}`,M=`${I}_${y}`;M in d&&d[M]?(gh.dot(d[M].normal)<=r&&(p.push(A.x,A.y,A.z),p.push(C.x,C.y,C.z)),d[M]=null):P in d||(d[P]={index0:c[w],index1:c[T],normal:gh.clone()})}}for(let g in d)if(d[g]){let{index0:_,index1:m}=d[g];il.fromBufferAttribute(a,_),sl.fromBufferAttribute(a,m),p.push(il.x,il.y,il.z),p.push(sl.x,sl.y,sl.z)}this.setAttribute("position",new Ye(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var Ll=class n extends yn{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],l=[],c=[],h=new k,u=new k,d=new k;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){let _=g/s*r,m=p/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){let _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,w=(s+1)*p+g;o.push(_,m,w),o.push(m,f,w)}this.setIndex(o),this.setAttribute("position",new Ye(a,3)),this.setAttribute("normal",new Ye(l,3)),this.setAttribute("uv",new Ye(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var ai=class extends is{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ce(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wm,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function ol(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function fb(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var Dr=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Mu=class extends Dr{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ap,endingEnd:Ap}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Cp:r=t,a=2*e-i;break;case Rp:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Cp:o=t,l=2*i-e;break;case Rp:o=1,l=i+s[1]-s[0];break;default:o=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(i-e)/(s-e),_=g*g,m=_*g,f=-d*m+2*d*_-d*g,w=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,T=(-1-p)*m+(1.5+p)*_+.5*g,y=p*m-p*_;for(let I=0;I!==a;++I)r[I]=f*o[h+I]+w*o[c+I]+T*o[l+I]+y*o[u+I];return r}},bu=class extends Dr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(i-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},Tu=class extends Dr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Wn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ol(e,this.TimeBufferType),this.values=ol(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:ol(t.times,Array),values:ol(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Tu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new bu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Mu(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case fl:e=this.InterpolantFactoryMethodDiscrete;break;case su:e=this.InterpolantFactoryMethodLinear;break;case kc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fl;case this.InterpolantFactoryMethodLinear:return su;case this.InterpolantFactoryMethodSmooth:return kc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&fb(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===kc,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*i,d=u-i,p=u+i;for(let g=0;g!==i;++g){let _=e[u+g];if(_!==e[d+g]||_!==e[p+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*i,d=o*i;for(let p=0;p!==i;++p)e[d+p]=e[u+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Wn.prototype.TimeBufferType=Float32Array;Wn.prototype.ValueBufferType=Float32Array;Wn.prototype.DefaultInterpolation=su;var Cs=class extends Wn{constructor(t,e,i){super(t,e,i)}};Cs.prototype.ValueTypeName="bool";Cs.prototype.ValueBufferType=Array;Cs.prototype.DefaultInterpolation=fl;Cs.prototype.InterpolantFactoryMethodLinear=void 0;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;var wu=class extends Wn{};wu.prototype.ValueTypeName="color";var Eu=class extends Wn{};Eu.prototype.ValueTypeName="number";var Au=class extends Dr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)ns.slerpFlat(r,0,o,c-a,o,c,l);return r}},Ul=class extends Wn{InterpolantFactoryMethodLinear(t){return new Au(this.times,this.values,this.getValueSize(),t)}};Ul.prototype.ValueTypeName="quaternion";Ul.prototype.InterpolantFactoryMethodSmooth=void 0;var Rs=class extends Wn{constructor(t,e,i){super(t,e,i)}};Rs.prototype.ValueTypeName="string";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=fl;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;var Cu=class extends Wn{};Cu.prototype.ValueTypeName="vector";var Ru=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},pb=new Ru,Pu=class{constructor(t){this.manager=t!==void 0?t:pb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Pu.DEFAULT_MATERIAL_NAME="__DEFAULT";var yo=class extends on{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ce(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var _h=new De,Am=new k,Cm=new k,Nl=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new me(512,512),this.map=null,this.mapPass=null,this.matrix=new De,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _o,this._frameExtents=new me(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;Am.setFromMatrixPosition(t.matrixWorld),e.position.copy(Am),Cm.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Cm),e.updateMatrixWorld(),_h.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_h),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(_h)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Rm=new De,uo=new k,xh=new k,Iu=class extends Nl{constructor(){super(new je(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new me(4,2),this._viewportCount=6,this._viewports=[new be(2,1,1,1),new be(0,1,1,1),new be(3,1,1,1),new be(1,1,1,1),new be(3,0,1,1),new be(1,0,1,1)],this._cubeDirections=[new k(1,0,0),new k(-1,0,0),new k(0,0,1),new k(0,0,-1),new k(0,1,0),new k(0,-1,0)],this._cubeUps=[new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,0,1),new k(0,0,-1)]}updateMatrices(t,e=0){let i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),uo.setFromMatrixPosition(t.matrixWorld),i.position.copy(uo),xh.copy(i.position),xh.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(xh),i.updateMatrixWorld(),s.makeTranslation(-uo.x,-uo.y,-uo.z),Rm.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rm)}},Fl=class extends yo{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Iu}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Du=class extends Nl{constructor(){super(new El(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ol=class extends yo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(on.DEFAULT_UP),this.updateMatrix(),this.target=new on,this.shadow=new Du}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Bl=class extends yo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var zl=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Pm(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Pm();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Pm(){return performance.now()}var ku="\\[\\]\\.:\\/",mb=new RegExp("["+ku+"]","g"),Hu="[^"+ku+"]",gb="[^"+ku.replace("\\.","")+"]",_b=/((?:WC+[\/:])*)/.source.replace("WC",Hu),xb=/(WCOD+)?/.source.replace("WCOD",gb),yb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Hu),vb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Hu),Sb=new RegExp("^"+_b+xb+yb+vb+"$"),Mb=["material","materials","bones","map"],Lu=class{constructor(t,e,i){let s=i||Pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Pe=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(mb,"")}static parseTrackName(t){let e=Sb.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Mb.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Pe.Composite=Lu;Pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Pe.prototype.GetterByBindingType=[Pe.prototype._getValue_direct,Pe.prototype._getValue_array,Pe.prototype._getValue_arrayElement,Pe.prototype._getValue_toArray];Pe.prototype.SetterByBindingTypeAndVersioning=[[Pe.prototype._setValue_direct,Pe.prototype._setValue_direct_setNeedsUpdate,Pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_array,Pe.prototype._setValue_array_setNeedsUpdate,Pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_arrayElement,Pe.prototype._setValue_arrayElement_setNeedsUpdate,Pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_fromArray,Pe.prototype._setValue_fromArray_setNeedsUpdate,Pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var QD=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var Mo=new k;function Cn(n,t,e,i,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;Mo.copy(t),Mo[i]=0,Mo.normalize();let c=.5*o/(o+a),h=1-Mo.angleTo(n)/l;return Math.sign(Mo[e])===1?h*c:a/(o+a)+c+c*(1-h)}var Ii=class extends ri{constructor(t=1,e=1,i=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,i/2,r),super(1,1,1,s,s,s),s===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let a=new k,l=new k,c=new k(t,e,i).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=h.length/6,g=new k,_=.5/s;for(let m=0,f=0;m<h.length;m+=3,f+=2)switch(a.fromArray(h,m),l.copy(a),l.x-=Math.sign(l.x)*_,l.y-=Math.sign(l.y)*_,l.z-=Math.sign(l.z)*_,l.normalize(),h[m+0]=c.x*Math.sign(a.x)+l.x*r,h[m+1]=c.y*Math.sign(a.y)+l.y*r,h[m+2]=c.z*Math.sign(a.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/p)){case 0:g.set(1,0,0),d[f+0]=Cn(g,l,"z","y",r,i),d[f+1]=1-Cn(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),d[f+0]=1-Cn(g,l,"z","y",r,i),d[f+1]=1-Cn(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),d[f+0]=1-Cn(g,l,"x","z",r,t),d[f+1]=Cn(g,l,"z","x",r,i);break;case 3:g.set(0,-1,0),d[f+0]=1-Cn(g,l,"x","z",r,t),d[f+1]=1-Cn(g,l,"z","x",r,i);break;case 4:g.set(0,0,1),d[f+0]=1-Cn(g,l,"x","y",r,t),d[f+1]=1-Cn(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),d[f+0]=Cn(g,l,"x","y",r,t),d[f+1]=1-Cn(g,l,"y","x",r,e);break}}};var Gl=matchMedia("(prefers-reduced-motion: reduce)").matches,nL=new URLSearchParams(location.search).has("debug"),Ps=15026253;function tg(n,t,e,i){let s=new Rl({canvas:t,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});s.setPixelRatio(Math.min(devicePixelRatio,2));let r=new Pl,o=new je(36,1,.1,60);o.position.set(3.4,2.6,5),r.add(o),r.add(new Bl(3421242,1.7));let a=new Ol(16773604,3.2);a.position.set(4,6,5),r.add(a);let l=new Fl(Ps,80,16);l.position.set(-3.5,1.5,-3),r.add(l);let c=()=>new Pr({color:Ps,transparent:!0,opacity:1}),h=()=>new ai({color:1776417,metalness:.45,roughness:.42,transparent:!0,opacity:1}),u=new ii;r.add(u);let d=[],p=new ii;u.add(p);function g(z,L,W){let R=new ii;return z(R),R.position.y=L,R.userData={baseY:L,mats:[],edges:[],anchor:new k(W[0],L,W[2]),op:1},R.traverse(D=>{D.isMesh&&D.material.transparent!==void 0&&(D.material=D.material.clone(),R.userData.mats.push(D.material)),D.isLineSegments&&(D.material=D.material.clone(),R.userData.edges.push(D.material))}),p.add(R),d.push(R),R}g(z=>{let L=new Ie(new Ii(1.15,.34,1.15,3,.05),h());z.add(L),z.add(new Ri(new Pi(L.geometry,22),c()));let W=new Ie(new Ir(.17,.17,.07,24),new ai({color:Ps,emissive:Ps,emissiveIntensity:1.5,transparent:!0}));W.position.y=.21,z.add(W),z.userData.seal=W.material},1.62,[.6,0,.6]),g(z=>{let L=new Ie(new Ii(2.25,.18,1.65,3,.04),h());z.add(L),z.add(new Ri(new Pi(L.geometry,22),c()));let W=new ai({color:6974066,metalness:.85,roughness:.3,transparent:!0});for(let R=0;R<10;R++){let D=new Ie(new Ir(.045,.045,.09,10),W);D.position.set(-.9+R%5*.45,.13,R<5?-.45:.45),z.add(D)}},1.32,[1.2,0,.9]),g(z=>{let L=new Ie(new Ii(2,.34,1.3,3,.05),h());z.add(L),z.add(new Ri(new Pi(L.geometry,22),c()));let W=new Ii(.24,.24,.24,2,.04);for(let R=0;R<5;R++){let D=new Ie(W,h());D.position.set(-.72+R*.36,.28,0),z.add(D);let $=new Ri(new Pi(W),c());if(D.add($),R>0){let Z=new xo(new yn().setFromPoints([new k(-.72+(R-1)*.36,.28,0),new k(-.72+R*.36,.28,0)]),new Pr({color:Ps,transparent:!0,opacity:.45}));z.add(Z)}}},.98,[1.05,0,.7]),g(z=>{let L=new Ie(new Ii(1.5,.26,1.1,3,.04),h());z.add(L),z.add(new Ri(new Pi(L.geometry,22),c()));let W=new ai({color:10124095,metalness:.9,roughness:.35,transparent:!0});for(let D=0;D<12;D++){let $=new Ie(new ri(.14,.05,.16),W);$.position.set(-.62+D%6*.25,.15,D<6?-.4:.4),z.add($)}let R=new Ie(new ri(.4,.09,.4),new ai({color:657932,metalness:.6,roughness:.2,transparent:!0}));R.position.y=.17,z.add(R)},.62,[.8,0,.6]),g(z=>{let L=new Ie(new Ii(2.5,.55,1.9,3,.06),h());z.add(L),z.add(new Ri(new Pi(L.geometry,22),c()));let W=new Ie(new Ir(.55,.55,.06,36),new ai({color:5658208,metalness:.85,roughness:.25,transparent:!0}));W.position.set(-.6,.3,0),z.add(W);let R=new Ie(new Ll(.55,.015,8,48),new ai({color:Ps,emissive:Ps,emissiveIntensity:.9,transparent:!0}));R.rotation.x=Math.PI/2,R.position.set(.6,.3,0),z.add(R),z.userData.ring=R},0,[1.3,0,1]),u.position.y=-.9;let _=[3.1,1.9,1.05,.45,0];function m(){let z=t.clientWidth,L=t.clientHeight;s.setSize(z,L,!1),o.aspect=z/L,o.updateProjectionMatrix();let W=Math.min(1,z/640);u.scale.setScalar(1.05+W*.35)}m(),new ResizeObserver(m).observe(t);let f=[...i.querySelectorAll(".chip")],w=[...n.querySelectorAll(".step")],T=-1;function y(z){z!==T&&(T=z,w.forEach(L=>L.classList.toggle("active",+L.dataset.layer===z)),f.forEach(L=>L.classList.toggle("active",+L.dataset.layer===z)))}if(Gl)y(1);else{let z=new IntersectionObserver(L=>{for(let W of L)W.isIntersecting&&y(+W.target.dataset.layer)},{rootMargin:"-42% 0px -42% 0px"});w.forEach(L=>z.observe(L))}let A=document.createElementNS("http://www.w3.org/2000/svg","line");e.appendChild(A);let C=matchMedia("(max-width: 900px)").matches;function P(){if(C||T<0){A.setAttribute("opacity","0");return}let z=i.querySelector(".chip.active");if(!z)return;let L=z.getBoundingClientRect(),W=t.getBoundingClientRect(),R=L.right-W.left,D=L.top+L.height/2-W.top,$=d[T].userData.anchor.clone();d[T].getWorldPosition,d[T].localToWorld($),$.project(o);let Z=($.x*.5+.5)*W.width,tt=(-$.y*.5+.5)*W.height;A.setAttribute("x1",R),A.setAttribute("y1",D),A.setAttribute("x2",Z),A.setAttribute("y2",tt),A.setAttribute("opacity","0.55")}let M=z=>z*z*(3-2*z),v=0,N=0,X=!0;new IntersectionObserver(([z])=>{X=z.isIntersecting},{threshold:.02}).observe(t);let Y=new zl;function J(){let z=Math.min(Y.getDelta(),.05),L=Y.elapsedTime,W=n.getBoundingClientRect(),R=innerHeight,D=W.height-R;N=D>0?Math.min(1,Math.max(0,-W.top/D)):0,v+=(N-v)*Math.min(z*6,1);let $=Gl?.35:M(v);for(let Z=0;Z<d.length;Z++){let tt=d[Z],mt=_[Z];tt.position.y=tt.userData.baseY+mt*$,tt.position.x=(Z%2===0?-1:1)*$*.28;let V=T<0||T===Z?1:.22;tt.userData.op+=(V-tt.userData.op)*Math.min(z*8,1);let j=tt.userData.op;for(let lt of tt.userData.mats)lt.opacity=j;for(let lt of tt.userData.edges)lt.opacity=.8*j;tt.userData.seal&&(tt.userData.seal.emissiveIntensity=(1.2+Math.sin(L*2.5)*.5)*j),tt.userData.ring&&(tt.userData.ring.material.emissiveIntensity=(.7+Math.sin(L*1.8)*.3)*j)}p.rotation.y=(Gl?.5:L*.12)+$*1.2,o.position.set(3.4,2.4+$*.7,5-$*.5),o.lookAt(0,.9+$*.5,0),s.render(r,o),P()}return Gl?J():s.setAnimationLoop(()=>{X&&!document.hidden&&J()}),{dispose(){s.setAnimationLoop(null)}}}var ci=typeof window<"u",Gu=ci?window:null,kr=ci?document:null,Le={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},le={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},Pn={NONE:0,AUTO:1,FORCE:2},ln={replace:0,none:1,blend:2},eg=Symbol(),td=Symbol(),pg=Symbol(),nc=Symbol();var Tb=Symbol(),Te=1e-11,mg=1e12,Ls=1e3,qu=120,as="",Co=new Map;Co.set("x","translateX");Co.set("y","translateY");Co.set("z","translateZ");var ed=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],gg=ed.reduce((n,t)=>({...n,[t]:t+"("}),{}),gn=()=>{},wb=/(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,Eb=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,Ab=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,Cb=/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,Rb=/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,ng=/[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,_g=/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,Pb=/([a-z])([A-Z])/g,Ib=/(\w+)(\([^)]+\)+)/g,Db=/(\*=|\+=|-=)/,xg={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:qu,loop:0,reversed:!1,alternate:!1,autoplay:!0,duration:Ls,delay:0,loopDelay:0,ease:"out(2)",composition:ln.replace,modifier:n=>n,onBegin:gn,onBeforeUpdate:gn,onUpdate:gn,onLoop:gn,onPause:gn,onComplete:gn,onRender:gn},Fe={defaults:xg,root:kr,scope:null,precision:4,timeScale:1,tickThreshold:200},yg={version:"4.0.2",engine:null};ci&&(Gu.AnimeJS||(Gu.AnimeJS=[]),Gu.AnimeJS.push(yg));var Lb=n=>n.replace(Pb,"$1-$2").toLowerCase(),Ds=(n,t)=>n.indexOf(t)===0,wo=Date.now,Us=Array.isArray,Wu=n=>n&&n.constructor===Object,nd=n=>typeof n=="number"&&!isNaN(n),ic=n=>typeof n=="string",Jl=n=>typeof n=="function",oe=n=>typeof n>"u",ql=n=>oe(n)||n===null,vg=n=>ci&&n instanceof SVGElement,Sg=n=>wb.test(n),Mg=n=>Ds(n,"rgb"),bg=n=>Ds(n,"hsl"),Ub=n=>Sg(n)||Mg(n)||bg(n),$l=n=>!Fe.defaults.hasOwnProperty(n),Is=n=>ic(n)?parseFloat(n):n,Fr=Math.pow,Tg=Math.sqrt,Nb=Math.sin,Fb=Math.cos,Eo=Math.abs;var Ob=Math.ceil,Ao=Math.floor,Bb=Math.asin,zb=Math.max;var Ro=Math.PI,$u=Math.round,qe=(n,t,e)=>n<t?t:n>e?e:n,ig={},Ue=(n,t)=>{if(t<0)return n;if(!t)return $u(n);let e=ig[t];return e||(e=ig[t]=10**t),$u(n*e)/e},Vb=(n,t)=>Us(t)?t.reduce((e,i)=>Eo(i-n)<Eo(e-n)?i:e):t?$u(n/t)*t:n,os=(n,t,e)=>n+(t-n)*e,id=n=>n===1/0?mg:n===-1/0?-1e12:n,To=n=>n<=Te?Te:id(Ue(n,11)),an=n=>Us(n)?[...n]:n,kb=(n,t)=>{let e={...n};for(let i in t){let s=n[i];e[i]=oe(s)?t[i]:s}return e},Be=(n,t,e,i="_prev",s="_next")=>{let r=n._head,o=s;for(e&&(r=n._tail,o=i);r;){let a=r[o];t(r),r=a}},ls=(n,t,e="_prev",i="_next")=>{let s=t[e],r=t[i];s?s[i]=r:n._head=r,r?r[e]=s:n._tail=s,t[e]=null,t[i]=null},zr=(n,t,e,i="_prev",s="_next")=>{let r=n._tail;for(;r&&e&&e(r,t);)r=r[i];let o=r?r[s]:n._head;r?r[s]=t:n._head=t,o?o[i]=t:n._tail=t,t[i]=r,t[s]=o},Ql=class{constructor(t=0){this.deltaTime=0,this._currentTime=t,this._elapsedTime=t,this._startTime=t,this._lastTime=t,this._scheduledTime=0,this._frameDuration=Ue(Ls/qu,0),this._fps=qu,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(t){let e=this._frameDuration,i=+t,s=i<Te?Te:i,r=Ue(Ls/s,0);this._fps=s,this._frameDuration=r,this._scheduledTime+=r-e}get speed(){return this._speed}set speed(t){let e=+t;this._speed=e<Te?Te:e}requestTick(t){let e=this._scheduledTime,i=this._elapsedTime;if(this._elapsedTime+=t-i,i<e)return Pn.NONE;let s=this._frameDuration,r=i-e;return this._scheduledTime+=r<s?s:r,Pn.AUTO}computeDeltaTime(t){let e=t-this._lastTime;return this.deltaTime=e,this._lastTime=t,e}},Zl=(n,t,e,i,s)=>{let r=n.parent,o=n.duration,a=n.completed,l=n.iterationDuration,c=n.iterationCount,h=n._currentIteration,u=n._loopDelay,d=n._reversed,p=n._alternate,g=n._hasChildren,_=n._delay,m=n._currentTime,f=_+l,w=t-_,T=qe(m,-_,o),y=qe(w,-_,o),I=w-m,A=y>0,C=y>=o,P=o<=Te,M=s===Pn.FORCE,v=0,N=w,X=0;if(c>1){let W=~~(y/(l+(C?0:u)));n._currentIteration=qe(W,0,c),C&&n._currentIteration--,v=n._currentIteration%2,N=y%(l+u)||0}let Y=d^(p&&v),J=n._ease,z=C?Y?0:o:Y?l-N:N;J&&(z=l*J(z/l)||0);let L=(r?r.backwards:w<m)?!Y:!!Y;if(n._currentTime=w,n._iterationTime=z,n.backwards=L,A&&!n.began?(n.began=!0,!e&&!(r&&(L||!r.began))&&n.onBegin(n)):w<=0&&(n.began=!1),!e&&!g&&A&&n._currentIteration!==h&&n.onLoop(n),M||s===Pn.AUTO&&(t>=_&&t<=f||t<=_&&T>_||t>=f&&T!==o)||z>=f&&T!==o||z<=_&&T>0||t<=T&&T===o&&a||C&&!a&&P){if(A&&(n.computeDeltaTime(T),e||n.onBeforeUpdate(n)),!g){let W=M||(L?I*-1:I)>=Fe.tickThreshold,R=n._offset+(r?r._offset:0)+_+z,D=n._head,$,Z,tt,mt,V=0;for(;D;){let j=D._composition,lt=D._currentTime,ht=D._changeDuration,bt=D._absoluteStartTime+D._changeDuration,St=D._nextRep,Ct=D._prevRep,$t=j!==ln.none;if((W||(lt!==ht||R<=bt+(St?St._delay:0))&&(lt!==0||R>=D._absoluteStartTime))&&(!$t||!D._isOverridden&&(!D._isOverlapped||R<=bt)&&(!St||St._isOverridden||R<=St._absoluteStartTime)&&(!Ct||Ct._isOverridden||R>=Ct._absoluteStartTime+Ct._changeDuration+D._delay))){let Yt=D._currentTime=qe(z-D._startTime,0,ht),Kt=D._ease(Yt/D._updateDuration),F=D._modifier,ye=D._valueType,Lt=D._tweenType,Wt=Lt===Le.OBJECT,Ut=ye===le.NUMBER,te=Ut&&Wt||Kt===0||Kt===1?-1:Fe.precision,Rt,E;if(Ut)Rt=E=F(Ue(os(D._fromNumber,D._toNumber,Kt),te));else if(ye===le.UNIT)E=F(Ue(os(D._fromNumber,D._toNumber,Kt),te)),Rt=`${E}${D._unit}`;else if(ye===le.COLOR){let x=D._fromNumbers,q=D._toNumbers,rt=Ue(qe(F(os(x[0],q[0],Kt)),0,255),0),at=Ue(qe(F(os(x[1],q[1],Kt)),0,255),0),ot=Ue(qe(F(os(x[2],q[2],Kt)),0,255),0),Dt=qe(F(Ue(os(x[3],q[3],Kt),te)),0,1);if(Rt=`rgba(${rt},${at},${ot},${Dt})`,$t){let _t=D._numbers;_t[0]=rt,_t[1]=at,_t[2]=ot,_t[3]=Dt}}else if(ye===le.COMPLEX){Rt=D._strings[0];for(let x=0,q=D._toNumbers.length;x<q;x++){let rt=F(Ue(os(D._fromNumbers[x],D._toNumbers[x],Kt),te)),at=D._strings[x+1];Rt+=`${at?rt+at:rt}`,$t&&(D._numbers[x]=rt)}}if($t&&(D._number=E),!i&&j!==ln.blend){let x=D.property;$=D.target,Wt?$[x]=Rt:Lt===Le.ATTRIBUTE?$.setAttribute(x,Rt):(Z=$.style,Lt===Le.TRANSFORM?($!==tt&&(tt=$,mt=$[nc]),mt[x]=Rt,V=1):Lt===Le.CSS?Z[x]=Rt:Lt===Le.CSS_VAR&&Z.setProperty(x,Rt)),A&&(X=1)}else D._value=Rt}if(V&&D._renderTransforms){let Yt=as;for(let Kt in mt)Yt+=`${gg[Kt]}${mt[Kt]}) `;Z.transform=Yt,V=0}D=D._next}!e&&X&&n.onRender(n)}!e&&A&&n.onUpdate(n)}return r&&P?!e&&(r.began&&!L&&w>=o&&!a||L&&w<=Te&&a)&&(n.onComplete(n),n.completed=!L):A&&C?c===1/0?n._startTime+=n.duration:n._currentIteration>=c-1&&(n.paused=!0,!a&&!g&&(n.completed=!0,!e&&!(r&&(L||!r.began))&&(n.onComplete(n),n._resolve(n)))):n.completed=!1,X},Or=(n,t,e,i,s)=>{let r=n._currentIteration;if(Zl(n,t,e,i,s),n._hasChildren){let o=n,a=o.backwards,l=i?t:o._iterationTime,c=wo(),h=0,u=!0;if(!i&&o._currentIteration!==r){let d=o.iterationDuration;Be(o,p=>{if(!a)!p.completed&&!p.backwards&&p._currentTime<p.iterationDuration&&Zl(p,d,e,1,Pn.FORCE),p.began=!1,p.completed=!1;else{let g=p.duration,_=p._offset+p._delay,m=_+g;!e&&g<=Te&&(!_||m===d)&&p.onComplete(p)}}),e||o.onLoop(o)}Be(o,d=>{let p=Ue((l-d._offset)*d._speed,12),g=d._fps<o._fps?d.requestTick(c):s;h+=Zl(d,p,e,i,g),!d.completed&&u&&(u=!1)},a),!e&&h&&o.onRender(o),u&&o._currentTime>=o.duration&&(o.paused=!0,o.completed||(o.completed=!0,e||(o.onComplete(o),o._resolve(o))))}},Vr={animation:null,update:gn},Hb=n=>{let t=Vr.animation;return t||(t={duration:Te,computeDeltaTime:gn,_offset:0,_delay:0,_head:null,_tail:null},Vr.animation=t,Vr.update=()=>{n.forEach(e=>{for(let i in e){let s=e[i],r=s._head;if(r){let o=r._valueType,a=o===le.COMPLEX||o===le.COLOR?an(r._fromNumbers):null,l=r._fromNumber,c=s._tail;for(;c&&c!==r;){if(a)for(let h=0,u=c._numbers.length;h<u;h++)a[h]+=c._numbers[h];else l+=c._number;c=c._prevAdd}r._toNumber=l,r._toNumbers=a}}}),Zl(t,1,1,0,Pn.FORCE)}),t},wg=ci?requestAnimationFrame:setImmediate,Gb=ci?cancelAnimationFrame:clearImmediate,Zu=class extends Ql{constructor(t){super(t),this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=xg,this.paused=!!(ci&&kr.hidden),this.reqId=null}update(){let t=this._currentTime=wo();if(this.requestTick(t)){this.computeDeltaTime(t);let e=this._speed,i=this._fps,s=this._head;for(;s;){let r=s._next;s.paused?(ls(this,s),this._hasChildren=!!this._tail,s._running=!1,s.completed&&!s._cancelled&&s.cancel()):Or(s,(t-s._startTime)*s._speed*e,0,0,s._fps<i?s.requestTick(t):Pn.AUTO),s=r}Vr.update()}}wake(){return this.useDefaultMainLoop&&!this.reqId&&!this.paused&&(this.reqId=wg(Eg)),this}pause(){return this.paused=!0,Wb()}resume(){if(this.paused)return this.paused=!1,Be(this,t=>t.resetTime()),this.wake()}get speed(){return this._speed*(Fe.timeScale===1?1:Ls)}set speed(t){this._speed=t*Fe.timeScale,Be(this,e=>e.speed=e._speed)}get timeUnit(){return Fe.timeScale===1?"ms":"s"}set timeUnit(t){let i=t==="s",s=i?.001:1;if(Fe.timeScale!==s){Fe.timeScale=s,Fe.tickThreshold=200*s;let r=i?.001:Ls;this.defaults.duration*=r,this._speed*=r}}get precision(){return Fe.precision}set precision(t){Fe.precision=t}},Ge=(()=>{let n=new Zu(wo());return ci&&(yg.engine=n,kr.addEventListener("visibilitychange",()=>{n.pauseOnDocumentHidden&&(kr.hidden?n.pause():n.resume())})),n})(),Eg=()=>{Ge._head?(Ge.reqId=wg(Eg),Ge.update()):Ge.reqId=0},Wb=()=>(Gb(Ge.reqId),Ge.reqId=0,Ge),Xb=(n,t,e)=>{let i=n.style.transform,s;if(i){let r=n[nc],o;for(;o=Ib.exec(i);){let a=o[1],l=o[2].slice(1,-1);r[a]=l,a===t&&(s=l,e&&(e[t]=l))}}return i&&!oe(s)?s:Ds(t,"scale")?"1":Ds(t,"rotate")||Ds(t,"skew")?"0deg":"0px"};function sg(n){let t=ic(n)?Fe.root.querySelectorAll(n):n;if(t instanceof NodeList||t instanceof HTMLCollection)return t}function Ag(n){if(ql(n))return[];if(Us(n)){let e=n.flat(1/0),i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];if(!ql(o)){let a=sg(o);if(a)for(let l=0,c=a.length;l<c;l++){let h=a[l];if(!ql(h)){let u=!1;for(let d=0,p=i.length;d<p;d++)if(i[d]===h){u=!0;break}u||i.push(h)}}else{let l=!1;for(let c=0,h=i.length;c<h;c++)if(i[c]===o){l=!0;break}l||i.push(o)}}}return i}if(!ci)return[n];let t=sg(n);return t?Array.from(t):[n]}function sd(n){let t=Ag(n),e=t.length;if(e)for(let i=0;i<e;i++){let s=t[i];if(!s[eg]){s[eg]=!0;let r=vg(s);(s.nodeType||r)&&(s[td]=!0,s[pg]=r,s[nc]={})}}return t}var Yb=["opacity","rotate","overflow","color"],qb=(n,t)=>{if(Yb.includes(t))return!1;if(n.getAttribute(t)||t in n){if(t==="scale"){let e=n.parentNode;return e&&e.tagName==="filter"}return!0}};var $b=n=>{let t=Eb.exec(n)||Ab.exec(n),e=oe(t[4])?1:+t[4];return[+t[1],+t[2],+t[3],e]},Zb=n=>{let t=n.length,e=t===4||t===5;return[+("0x"+n[1]+n[e?1:2]),+("0x"+n[e?2:3]+n[e?2:4]),+("0x"+n[e?3:5]+n[e?3:6]),t===5||t===9?+(+("0x"+n[e?4:7]+n[e?4:8])/255).toFixed(3):1]},Xu=(n,t,e)=>(e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*(2/3-e)*6:n),Kb=n=>{let t=Cb.exec(n)||Rb.exec(n),e=+t[1]/360,i=+t[2]/100,s=+t[3]/100,r=oe(t[4])?1:+t[4],o,a,l;if(i===0)o=a=l=s;else{let c=s<.5?s*(1+i):s+i-s*i,h=2*s-c;o=Ue(Xu(h,c,e+1/3)*255,0),a=Ue(Xu(h,c,e)*255,0),l=Ue(Xu(h,c,e-1/3)*255,0)}return[o,a,l,r]},Jb=n=>Mg(n)?$b(n):Sg(n)?Zb(n):bg(n)?Kb(n):[0,0,0,1],tn=(n,t)=>oe(n)?t:n,ss=(n,t,e,i,s)=>{if(Jl(n)){let r=()=>{let o=n(t,e,i);return isNaN(+o)?o||0:+o};return s&&(s.func=r),r()}else return n},rd=(n,t)=>n[td]?n[pg]&&qb(n,t)?Le.ATTRIBUTE:ed.includes(t)||Co.get(t)?Le.TRANSFORM:Ds(t,"--")?Le.CSS_VAR:t in n.style?Le.CSS:t in n?Le.OBJECT:Le.ATTRIBUTE:Le.OBJECT,rg=(n,t,e)=>{let i=n.style[t];i&&e&&(e[t]=i);let s=i||getComputedStyle(n[Tb]||n).getPropertyValue(t);return s==="auto"?"0":s},Br=(n,t,e,i)=>{let s=oe(e)?rd(n,t):e;return s===Le.OBJECT?n[t]||0:s===Le.ATTRIBUTE?n.getAttribute(t):s===Le.TRANSFORM?Xb(n,t,i):s===Le.CSS_VAR?rg(n,t,i).trimStart():rg(n,t,i)},Ku=(n,t,e)=>e==="-"?n-t:e==="+"?n+t:n*t,od=()=>({t:le.NUMBER,n:0,u:null,o:null,d:null,s:null}),Yn=(n,t)=>{if(t.t=le.NUMBER,t.n=0,t.u=null,t.o=null,t.d=null,t.s=null,!n)return t;let e=+n;if(isNaN(e)){let i=n;i[1]==="="&&(t.o=i[0],i=i.slice(2));let s=i.includes(" ")?!1:_g.exec(i);if(s)return t.t=le.UNIT,t.n=+s[1],t.u=s[2],t;if(t.o)return t.n=+i,t;if(Ub(i))return t.t=le.COLOR,t.d=Jb(i),t;{let r=i.match(ng);return t.t=le.COMPLEX,t.d=r?r.map(Number):[],t.s=i.split(ng)||[],t}}else return t.n=e,t},og=(n,t)=>(t.t=n._valueType,t.n=n._toNumber,t.u=n._unit,t.o=null,t.d=an(n._toNumbers),t.s=an(n._strings),t),Rn=od(),jl={_rep:new WeakMap,_add:new Map},ad=(n,t,e="_rep")=>{let i=jl[e],s=i.get(n);return s||(s={},i.set(n,s)),s[t]?s[t]:s[t]={_head:null,_tail:null}},Qb=(n,t)=>n._isOverridden||n._absoluteStartTime>t._absoluteStartTime,Kl=n=>{n._isOverlapped=1,n._isOverridden=1,n._changeDuration=Te,n._currentTime=Te},Cg=(n,t)=>{let e=n._composition;if(e===ln.replace){let i=n._absoluteStartTime;zr(t,n,Qb,"_prevRep","_nextRep");let s=n._prevRep;if(s){let r=s.parent,o=s._absoluteStartTime+s._changeDuration;if(n.parent.id!==r.id&&r.iterationCount>1&&o+(r.duration-r.iterationDuration)>i){Kl(s);let c=s._prevRep;for(;c&&c.parent.id===r.id;)Kl(c),c=c._prevRep}let a=i-n._delay;if(o>a){let c=s._startTime,h=o-(c+s._updateDuration);s._changeDuration=a-h-c,s._currentTime=s._changeDuration,s._isOverlapped=1,s._changeDuration<Te&&Kl(s)}let l=!0;if(Be(r,c=>{c._isOverlapped||(l=!1)}),l){let c=r.parent;if(c){let h=!0;Be(c,u=>{u!==r&&Be(u,d=>{d._isOverlapped||(h=!1)})}),h&&c.cancel()}else r.cancel()}}}else if(e===ln.blend){let i=ad(n.target,n.property,"_add"),s=Hb(jl._add),r=i._head;r||(r={...n},r._composition=ln.replace,r._updateDuration=Te,r._startTime=0,r._numbers=an(n._fromNumbers),r._number=0,r._next=null,r._prev=null,zr(i,r),zr(s,r));let o=n._toNumber;if(n._fromNumber=r._fromNumber-o,n._toNumber=0,n._numbers=an(n._fromNumbers),n._number=0,r._fromNumber=o,n._toNumbers){let a=an(n._toNumbers);a&&a.forEach((l,c)=>{n._fromNumbers[c]=r._fromNumbers[c]-l,n._toNumbers[c]=0}),r._fromNumbers=a}zr(i,n,null,"_prevAdd","_nextAdd")}return n},Rg=n=>{let t=n._composition;if(t!==ln.none){let e=n.target,i=n.property,o=jl._rep.get(e)[i];if(ls(o,n,"_prevRep","_nextRep"),t===ln.blend){let a=jl._add,l=a.get(e);if(!l)return;let c=l[i],h=Vr.animation;ls(c,n,"_prevAdd","_nextAdd");let u=c._head;if(u&&u===c._tail){ls(c,u,"_prevAdd","_nextAdd"),ls(h,u);let d=!0;for(let p in l)if(l[p]._head){d=!1;break}d&&a.delete(e)}}}return n},ag=n=>(n.paused=!0,n.began=!1,n.completed=!1,n),Ju=n=>(n._cancelled&&(n._hasChildren?Be(n,Ju):Be(n,t=>{t._composition!==ln.none&&Cg(t,ad(t.target,t.property))}),n._cancelled=0),n),jb=0,tc=class extends Ql{constructor(t={},e=null,i=0){super(0);let{id:s,delay:r,duration:o,reversed:a,alternate:l,loop:c,loopDelay:h,autoplay:u,frameRate:d,playbackRate:p,onComplete:g,onLoop:_,onPause:m,onBegin:f,onBeforeUpdate:w,onUpdate:T}=t;Fe.scope&&Fe.scope.revertibles.push(this);let y=e?0:Ge._elapsedTime,I=e?e.defaults:Fe.defaults,A=Jl(r)||oe(r)?I.delay:+r,C=Jl(o)||oe(o)?1/0:+o,P=tn(c,I.loop),M=tn(h,I.loopDelay),v=P===!0||P===1/0||P<0?1/0:P+1,N=0;if(e)N=i;else{let X=wo();Ge.paused&&(Ge.requestTick(X),X=Ge._elapsedTime),N=X-Ge._startTime}this.id=oe(s)?++jb:s,this.parent=e,this.duration=id((C+M)*v-M)||Te,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=f||I.onBegin,this.onBeforeUpdate=w||I.onBeforeUpdate,this.onUpdate=T||I.onUpdate,this.onLoop=_||I.onLoop,this.onPause=m||I.onPause,this.onComplete=g||I.onComplete,this.iterationDuration=C,this.iterationCount=v,this._autoplay=e?!1:tn(u,I.autoplay),this._offset=N,this._delay=A,this._loopDelay=M,this._iterationTime=0,this._currentIteration=0,this._resolve=gn,this._running=!1,this._reversed=+tn(a,I.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=tn(l,I.alternate),this._prev=null,this._next=null,this._elapsedTime=y,this._startTime=y,this._lastTime=y,this._fps=tn(d,I.frameRate),this._speed=tn(p,I.playbackRate)}get cancelled(){return!!this._cancelled}set cancelled(t){t?this.cancel():this.reset(1).play()}get currentTime(){return qe(Ue(this._currentTime,Fe.precision),-this._delay,this.duration)}set currentTime(t){let e=this.paused;this.pause().seek(+t),e||this.resume()}get iterationCurrentTime(){return Ue(this._iterationTime,Fe.precision)}set iterationCurrentTime(t){this.currentTime=this.iterationDuration*this._currentIteration+t}get progress(){return qe(Ue(this._currentTime/this.duration,5),0,1)}set progress(t){this.currentTime=this.duration*t}get iterationProgress(){return qe(Ue(this._iterationTime/this.iterationDuration,5),0,1)}set iterationProgress(t){let e=this.iterationDuration;this.currentTime=e*this._currentIteration+e*t}get currentIteration(){return this._currentIteration}set currentIteration(t){this.currentTime=this.iterationDuration*qe(+t,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(t){t?this.reverse():this.play()}get speed(){return super.speed}set speed(t){super.speed=t,this.resetTime()}reset(t=0){return Ju(this),this._reversed&&!this._reverse&&(this.reversed=!1),this._iterationTime=this.iterationDuration,Or(this,0,1,t,Pn.FORCE),ag(this),this._hasChildren&&Be(this,ag),this}init(t=0){this.fps=this._fps,this.speed=this._speed,!t&&this._hasChildren&&Or(this,this.duration,1,t,Pn.FORCE),this.reset(t);let e=this._autoplay;return e===!0?this.resume():e&&!oe(e.linked)&&e.link(this),this}resetTime(){let t=1/(this._speed*Ge._speed);return this._startTime=wo()-(this._currentTime+this._delay)*t,this}pause(){return this.paused?this:(this.paused=!0,this.onPause(this),this)}resume(){return this.paused?(this.paused=!1,this.duration<=Te&&!this._hasChildren?Or(this,Te,0,0,Pn.FORCE):(this._running||(zr(Ge,this),Ge._hasChildren=!0,this._running=!0),this.resetTime(),this._startTime-=12,Ge.wake()),this):this}restart(){return this.reset(0).resume()}seek(t,e=0,i=0){Ju(this),this.completed=!1;let s=this.paused;return this.paused=!0,Or(this,t+this._delay,~~e,~~i,Pn.AUTO),s?this:this.resume()}alternate(){let t=this._reversed,e=this.iterationCount,i=this.iterationDuration,s=e===1/0?Ao(mg/i):e;return this._reversed=+(this._alternate&&!(s%2)?t:!t),e===1/0?this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress:this.seek(i*s-this._currentTime),this.resetTime(),this}play(){return this._reversed&&this.alternate(),this.resume()}reverse(){return this._reversed||this.alternate(),this.resume()}cancel(){return this._hasChildren?Be(this,t=>t.cancel(),!0):Be(this,Rg),this._cancelled=1,this.pause()}stretch(t){let e=this.duration,i=To(t);if(e===i)return this;let s=t/e,r=t<=Te;return this.duration=r?Te:i,this.iterationDuration=r?Te:To(this.iterationDuration*s),this._offset*=s,this._delay*=s,this._loopDelay*=s,this}revert(){Or(this,0,1,0,Pn.AUTO);let t=this._autoplay;return t&&t.linked&&t.linked===this&&t.revert(),this.cancel()}complete(){return this.seek(this.duration).cancel()}then(t=gn){let e=this.then,i=()=>{this.then=null,t(this),this.then=e,this._resolve=gn};return new Promise(s=>(this._resolve=()=>s(i()),this.completed&&this._resolve(),this))}};var Hr=n=>n,Pg=(n,t,e)=>(((1-3*e+3*t)*n+(3*e-6*t))*n+3*t)*n,t1=(n,t,e)=>{let i=0,s=1,r,o,a=0;do o=i+(s-i)/2,r=Pg(o,t,e)-n,r>0?s=o:i=o;while(Eo(r)>1e-7&&++a<100);return o},e1=(n=.5,t=0,e=.5,i=1)=>n===t&&e===i?Hr:s=>s===0||s===1?s:Pg(t1(s,n,e),t,i),n1=(n=10,t)=>{let e=t?Ob:Ao;return i=>e(qe(i,0,1)*n)*(1/n)},Ig=(...n)=>{let t=n.length;if(!t)return Hr;let e=t-1,i=n[0],s=n[e],r=[0],o=[Is(i)];for(let a=1;a<e;a++){let l=n[a],c=ic(l)?l.trim().split(" "):[l],h=c[0],u=c[1];r.push(oe(u)?a/e:Is(u)/100),o.push(Is(h))}return o.push(Is(s)),r.push(1),function(l){for(let c=1,h=r.length;c<h;c++){let u=r[c];if(l<=u){let d=r[c-1],p=o[c-1];return p+(o[c]-p)*(l-d)/(u-d)}}return o[o.length-1]}},i1=(n=10,t=1)=>{let e=[0],i=n-1;for(let s=1;s<i;s++){let r=e[s-1],o=s/i,a=(s+1)/i,l=o+(a-o)*Math.random(),c=o*(1-t)+l*t;e.push(qe(c,r,1))}return e.push(1),Ig(...e)},s1=Ro/2,lg=Ro*2,bo=(n=1.68)=>t=>Fr(t,+n),cg={[as]:bo,Quad:bo(2),Cubic:bo(3),Quart:bo(4),Quint:bo(5),Sine:n=>1-Fb(n*s1),Circ:n=>1-Tg(1-n*n),Expo:n=>n?Fr(2,10*n-10):0,Bounce:n=>{let t,e=4;for(;n<((t=Fr(2,--e))-1)/11;);return 1/Fr(4,3-e)-7.5625*Fr((t*3-2)/22-n,2)},Back:(n=1.70158)=>t=>(+n+1)*t*t*t-+n*t*t,Elastic:(n=1,t=.3)=>{let e=qe(+n,1,10),i=qe(+t,Te,2),s=i/lg*Bb(1/e),r=lg/i;return o=>o===0||o===1?o:-e*Fr(2,-10*(1-o))*Nb((1-o-s)*r)}},Qu={in:n=>t=>n(t),out:n=>t=>1-n(1-t),inOut:n=>t=>t<.5?n(t*2)/2:1-n(t*-2+2)/2,outIn:n=>t=>t<.5?(1-n(1-t*2))/2:(n(t*2-1)+1)/2},r1=(n,t,e)=>{if(e[n])return e[n];if(n.indexOf("(")<=-1){let s=Qu[n]||n.includes("Back")||n.includes("Elastic")?t[n]():t[n];return s?e[n]=s:Hr}else{let i=n.slice(0,-1).split("("),s=t[i[0]];return s?e[n]=s(...i[1].split(",")):Hr}},o1=(()=>{let n={linear:Ig,irregular:i1,steps:n1,cubicBezier:e1};for(let t in Qu)for(let e in cg){let i=cg[e],s=Qu[t];n[t+e]=e===as||e==="Back"||e==="Elastic"?(r,o)=>s(i(r,o)):s(i)}return n})(),a1={linear:Hr},ju=n=>Jl(n)?n:ic(n)?r1(n,o1,a1):Hr,hg={},ld=(n,t,e)=>{if(e===Le.TRANSFORM){let i=Co.get(n);return i||n}else if(e===Le.CSS||e===Le.ATTRIBUTE&&vg(t)&&n in t.style){let i=hg[n];if(i)return i;{let s=n&&Lb(n);return hg[n]=s,s}}else return n},Yu={deg:1,rad:180/Ro,turn:360},ug={},Dg=(n,t,e,i=!1)=>{let s=t.u,r=t.n;if(t.t===le.UNIT&&s===e)return t;let o=r+s+e,a=ug[o];if(!oe(a)&&!i)t.n=a;else{let l;if(s in Yu)l=r*Yu[s]/Yu[e];else{let h=n.cloneNode(),u=n.parentNode,d=u&&u!==kr?u:kr.body;d.appendChild(h);let p=h.style;p.width=100+s;let g=h.offsetWidth||100;p.width=100+e;let _=h.offsetWidth||100,m=g/_;d.removeChild(h),l=m*r}t.n=l,ug[o]=l}return t.t,le.UNIT,t.u=e,t},cd=n=>{if(n._hasChildren)Be(n,cd,!0);else{let t=n;t.pause(),Be(t,e=>{let i=e.property,s=e.target;if(s[td]){let r=s.style,o=t._inlineStyles[i];if(e._tweenType===Le.TRANSFORM){let a=s[nc];if(oe(o)||o===as?delete a[i]:a[i]=o,e._renderTransforms)if(!Object.keys(a).length)r.removeProperty("transform");else{let l=as;for(let c in a)l+=gg[c]+a[c]+") ";r.transform=l}}else oe(o)||o===as?r.removeProperty(i):r[i]=o;t._tail===e&&t.targets.forEach(a=>{a.getAttribute&&a.getAttribute("style")===as&&a.removeAttribute("style")})}})}return n},Qt=od(),se=od(),Wl={func:null},Xl=[null],Nr=[null,null],Yl={to:null},l1=0,rs,li,c1=(n,t)=>{let e={};if(Us(n)){let i=[].concat(...n.map(s=>Object.keys(s))).filter($l);for(let s=0,r=i.length;s<r;s++){let o=i[s],a=n.map(l=>{let c={};for(let h in l){let u=l[h];$l(h)?h===o&&(c.to=u):c[h]=u}return c});e[o]=a}}else{let i=tn(t.duration,Fe.defaults.duration);Object.keys(n).map(r=>({o:parseFloat(r)/100,p:n[r]})).sort((r,o)=>r.o-o.o).forEach(r=>{let o=r.o,a=r.p;for(let l in a)if($l(l)){let c=e[l];c||(c=e[l]=[]);let h=o*i,u=c.length,d=c[u-1],p={to:a[l]},g=0;for(let _=0;_<u;_++)g+=c[_].duration;u===1&&(p.from=d.to),a.ease&&(p.ease=a.ease),p.duration=h-(u?g:0),c.push(p)}return r});for(let r in e){let o=e[r],a;for(let l=0,c=o.length;l<c;l++){let h=o[l],u=h.ease;h.ease=a||void 0,a=u}o[0].duration||o.shift()}}return e},ec=class extends tc{constructor(t,e,i,s,r=!1,o=0,a=0){super(e,i,s);let l=sd(t),c=l.length,h=e.keyframes,u=h?kb(c1(h,e),e):e,{delay:d,duration:p,ease:g,playbackEase:_,modifier:m,composition:f,onRender:w}=u,T=i?i.defaults:Fe.defaults,y=tn(_,T.playbackEase),I=y?ju(y):null,A=!oe(g)&&!oe(g.ease),C=A?g.ease:tn(g,I?"linear":T.ease),P=A?g.duration:tn(p,T.duration),M=tn(d,T.delay),v=m||T.modifier,N=oe(f)&&c>=Ls?ln.none:oe(f)?T.composition:f,X={},Y=this._offset+(i?i._offset:0),J=NaN,z=NaN,L=0,W=0;for(let R=0;R<c;R++){let D=l[R],$=o||R,Z=a||c,tt=NaN,mt=NaN;for(let V in u)if($l(V)){let j=rd(D,V),lt=ld(V,D,j),ht=u[V],bt=Us(ht);if(r&&!bt&&(Nr[0]=ht,Nr[1]=ht,ht=Nr),bt){let F=ht.length,ye=!Wu(ht[0]);F===2&&ye?(Yl.to=ht,Xl[0]=Yl,rs=Xl):F>2&&ye?(rs=[],ht.forEach((Lt,Wt)=>{Wt?Wt===1?(Nr[1]=Lt,rs.push(Nr)):rs.push(Lt):Nr[0]=Lt})):rs=ht}else Xl[0]=ht,rs=Xl;let St=null,Ct=null,$t=NaN,Yt=0,Kt=0;for(let F=rs.length;Kt<F;Kt++){let ye=rs[Kt];Wu(ye)?li=ye:(Yl.to=ye,li=Yl),Wl.func=null;let Lt=ss(li.to,D,$,Z,Wl),Wt;Wu(Lt)&&!oe(Lt.to)?(li=Lt,Wt=Lt.to):Wt=Lt;let Ut=ss(li.from,D,$,Z),te=li.ease,Rt=!oe(te)&&!oe(te.ease),E=Rt?te.ease:te||C,x=Rt?te.duration:ss(tn(li.duration,F>1?ss(P,D,$,Z)/F:P),D,$,Z),q=ss(tn(li.delay,Kt?0:M),D,$,Z),rt=ss(tn(li.composition,N),D,$,Z),at=nd(rt)?rt:ln[rt],ot=li.modifier||v,Dt=!oe(Ut),_t=!oe(Wt),Mt=Us(Wt),ne=Mt||Dt&&_t,dt=Ct?Yt+q:q,Et=Y+dt;!W&&(Dt||Mt)&&(W=1);let Pt=Ct;if(at!==ln.none){St||(St=ad(D,lt));let It=St._head;for(;It&&!It._isOverridden&&It._absoluteStartTime<=Et;)if(Pt=It,It=It._nextRep,It&&It._absoluteStartTime>=Et)for(;It;)Kl(It),It=It._nextRep}if(ne?(Yn(Mt?ss(Wt[0],D,$,Z):Ut,Qt),Yn(Mt?ss(Wt[1],D,$,Z,Wl):Wt,se),Qt.t===le.NUMBER&&(Pt?Pt._valueType===le.UNIT&&(Qt.t=le.UNIT,Qt.u=Pt._unit):(Yn(Br(D,lt,j,X),Rn),Rn.t===le.UNIT&&(Qt.t=le.UNIT,Qt.u=Rn.u)))):(_t?Yn(Wt,se):Ct?og(Ct,se):Yn(i&&Pt&&Pt.parent.parent===i?Pt._value:Br(D,lt,j,X),se),Dt?Yn(Ut,Qt):Ct?og(Ct,Qt):Yn(i&&Pt&&Pt.parent.parent===i?Pt._value:Br(D,lt,j,X),Qt)),Qt.o&&(Qt.n=Ku(Pt?Pt._toNumber:Yn(Br(D,lt,j,X),Rn).n,Qt.n,Qt.o)),se.o&&(se.n=Ku(Qt.n,se.n,se.o)),Qt.t!==se.t){if(Qt.t===le.COMPLEX||se.t===le.COMPLEX){let It=Qt.t===le.COMPLEX?Qt:se,Ot=Qt.t===le.COMPLEX?se:Qt;Ot.t=le.COMPLEX,Ot.s=an(It.s),Ot.d=It.d.map(()=>Ot.n)}else if(Qt.t===le.UNIT||se.t===le.UNIT){let It=Qt.t===le.UNIT?Qt:se,Ot=Qt.t===le.UNIT?se:Qt;Ot.t=le.UNIT,Ot.u=It.u}else if(Qt.t===le.COLOR||se.t===le.COLOR){let It=Qt.t===le.COLOR?Qt:se,Ot=Qt.t===le.COLOR?se:Qt;Ot.t=le.COLOR,Ot.s=It.s,Ot.d=[0,0,0,1]}}if(Qt.u!==se.u){let It=se.u?Qt:se;It=Dg(D,It,se.u?se.u:Qt.u,!1)}if(se.d&&Qt.d&&se.d.length!==Qt.d.length){let It=Qt.d.length>se.d.length?Qt:se,Ot=It===Qt?se:Qt;Ot.d=It.d.map((_e,O)=>oe(Ot.d[O])?0:Ot.d[O]),Ot.s=an(It.s)}let Ht=Ue(+x||Te,12),Tt={parent:this,id:l1++,property:lt,target:D,_value:null,_func:Wl.func,_ease:ju(E),_fromNumbers:an(Qt.d),_toNumbers:an(se.d),_strings:an(se.s),_fromNumber:Qt.n,_toNumber:se.n,_numbers:an(Qt.d),_number:Qt.n,_unit:se.u,_modifier:ot,_currentTime:0,_startTime:dt,_delay:+q,_updateDuration:Ht,_changeDuration:Ht,_absoluteStartTime:Et,_tweenType:j,_valueType:se.t,_composition:at,_isOverlapped:0,_isOverridden:0,_renderTransforms:0,_prevRep:null,_nextRep:null,_prevAdd:null,_nextAdd:null,_prev:null,_next:null};at!==ln.none&&Cg(Tt,St),isNaN($t)&&($t=Tt._startTime),Yt=Ue(dt+Ht,12),Ct=Tt,L++,zr(this,Tt)}(isNaN(z)||$t<z)&&(z=$t),(isNaN(J)||Yt>J)&&(J=Yt),j===Le.TRANSFORM&&(tt=L-Kt,mt=L)}if(!isNaN(tt)){let V=0;Be(this,j=>{V>=tt&&V<mt&&(j._renderTransforms=1,j._composition===ln.blend&&Be(Vr.animation,lt=>{lt.id===j.id&&(lt._renderTransforms=1)})),V++})}}c||console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation."),z?(Be(this,R=>{R._startTime-R._delay||(R._delay-=z),R._startTime-=z}),J-=z):z=0,J||(J=Te,this.iterationCount=0),this.targets=l,this.duration=J===Te?Te:id((J+this._loopDelay)*this.iterationCount-this._loopDelay)||Te,this.onRender=w||T.onRender,this._ease=I,this._delay=z,this.iterationDuration=J,this._inlineStyles=X,!this._autoplay&&W&&this.onRender(this)}stretch(t){let e=this.duration;if(e===To(t))return this;let i=t/e;return Be(this,s=>{s._updateDuration=To(s._updateDuration*i),s._changeDuration=To(s._changeDuration*i),s._currentTime*=i,s._startTime*=i,s._absoluteStartTime*=i}),super.stretch(t)}refresh(){return Be(this,t=>{let e=Br(t.target,t.property,t._tweenType);Yn(e,Rn),t._fromNumbers=an(Rn.d),t._fromNumber=Rn.n,t._func&&(Yn(t._func(),se),t._toNumbers=an(se.d),t._strings=an(se.s),t._toNumber=se.n)}),this}revert(){return super.revert(),cd(this)}then(t){return super.then(t)}},Po=(n,t)=>new ec(n,t,null,0,!1).init();var Lg=["x","y","z"],sL=["perspective","width","height","margin","padding","top","right","bottom","left","borderWidth","fontSize","borderRadius",...Lg],rL=[...Lg,...ed.filter(n=>["X","Y","Z"].some(t=>n.endsWith(t)))],oL=ci&&(oe(CSS)||!Object.hasOwnProperty.call(CSS,"registerProperty"));var dg={_head:null,_tail:null},h1=(n,t,e)=>{let i=dg._head;for(;i;){let s=i._next,r=i.$el===n,o=!t||i.property===t,a=!e||i.parent===e;if(r&&o&&a){let l=i.animation;try{l.commitStyles()}catch{}l.cancel(),ls(dg,i);let c=i.parent;c&&(c._completed++,c.animations.length===c._completed&&(c.completed=!0,c.muteCallbacks||(c.paused=!0,c.onComplete(c),c._resolve(c))))}i=s}};var u1=(n=gn)=>new tc({duration:1*Fe.timeScale,onComplete:n},null,0).resume();function d1(n,t,e){let i=sd(n);if(!i.length)return;let[s]=i,r=rd(s,t),o=ld(t,s,r),a=Br(s,o);if(oe(e))return a;if(Yn(a,Rn),Rn.t===le.NUMBER||Rn.t===le.UNIT){if(e===!1)return Rn.n;{let l=Dg(s,Rn,e,!1);return`${Ue(l.n,Fe.precision)}${l.u}`}}}var f1=(n,t)=>{if(!oe(t))return t.duration=Te,t.composition=tn(t.composition,ln.none),new ec(n,t,null,0,!0).resume()},fg=(n,t,e)=>{let i=!1;return Be(t,s=>{let r=s.target;if(n.includes(r)){let o=s.property,a=s._tweenType,l=ld(e,r,a);(!l||l&&l===o)&&(s.parent._tail===s&&s._tweenType===Le.TRANSFORM&&s._prev&&s._prev._tweenType===Le.TRANSFORM&&(s._prev._renderTransforms=1),ls(t,s),Rg(s),i=!0)}},!0),i},Ug=(n,t,e)=>{let i=Ag(n),s=t||Ge,r=t&&t.controlAnimation&&t;for(let a=0,l=i.length;a<l;a++){let c=i[a];h1(c,e,r)}let o;if(s._hasChildren){let a=0;Be(s,l=>{if(!l._hasChildren)if(o=fg(i,l,e),o&&!l._head)l.cancel(),ls(s,l);else{let h=l._offset+l._delay+l.duration;h>a&&(a=h)}l._head?Ug(n,l,e):l._hasChildren=!1},!0),oe(s.iterationDuration)||(s.iterationDuration=a)}else o=fg(i,s,e);return o&&!s._head&&(s._hasChildren=!1,s.cancel&&s.cancel()),i},hd=(n,t,e)=>{let i=10**(e||0);return Ao((Math.random()*(t-n+1/i)+n)*i)/i},p1=n=>n[hd(0,n.length-1)],m1=n=>{let t=n.length,e,i;for(;t;)i=hd(0,--t),e=n[t],n[t]=n[i],n[i]=e;return n},g1=(n,t)=>(+n).toFixed(t),_1=(n,t,e)=>`${n}`.padStart(t,e),x1=(n,t,e)=>`${n}`.padEnd(t,e),y1=(n,t,e)=>((n-t)%(e-t)+(e-t))%(e-t)+t,v1=(n,t,e,i,s)=>i+(n-t)/(e-t)*(s-i),S1=n=>n*Ro/180,M1=n=>n*180/Ro,b1=(n,t,e,i)=>{let s=Ls/Fe.defaults.frameRate;if(i!==!1){let o=i||Ge._hasChildren&&Ge;o&&o.deltaTime&&(s=o.deltaTime)}let r=1-Math.exp(-e*s*.1);return e?e===1?t:(1-r)*n+r*t:n},T1=(n,t=0)=>(...e)=>t?i=>n(...e,i):i=>n(i,...e),Ng=n=>(...t)=>{let e=n(...t);return new Proxy(gn,{apply:(i,s,[r])=>e(r),get:(i,s)=>Ng((...r)=>{let o=w1[s](...r);return a=>o(e(a))})})},Xn=(n,t=0)=>(...e)=>(e.length<n.length?Ng(T1(n,t)):n)(...e),w1={$:sd,get:d1,set:f1,remove:Ug,cleanInlineStyles:cd,random:hd,randomPick:p1,shuffle:m1,lerp:b1,sync:u1,clamp:Xn(qe),round:Xn(Ue),snap:Xn(Vb),wrap:Xn(y1),interpolate:Xn(os,1),mapRange:Xn(v1),roundPad:Xn(g1),padStart:Xn(_1),padEnd:Xn(x1),degToRad:Xn(S1),radToDeg:Xn(M1)},E1=(n,t)=>{if(Ds(t,"<")){let e=t[1]==="<",i=n._tail,s=i?i._offset+i._delay:0;return e?s:s+i.duration}},A1=(n,t)=>{let e=n.iterationDuration;if(e===Te&&(e=0),oe(t))return e;if(nd(+t))return+t;let i=t,s=n?n.labels:null,r=!ql(s),o=E1(n,i),a=!oe(o),l=Db.exec(i);if(l){let c=l[0],h=i.split(c),u=r&&h[0]?s[h[0]]:e,d=a?o:r?u:e,p=+h[1];return Ku(d,p,c[0])}else return a?o:r?oe(s[i])?e:s[i]:e};var Fg=(n,t={})=>{let e=[],i=0,s=t.from,r=t.reversed,o=t.ease,a=!oe(o),c=a&&!oe(o.ease)?o.ease:a?ju(o):null,h=t.grid,u=t.axis,d=oe(s)||s===0||s==="first",p=s==="center",g=s==="last",_=Us(n),m=Is(_?n[0]:n),f=_?Is(n[1]):0,w=_g.exec((_?n[1]:n)+as),T=t.start||0+(_?m:0),y=d?0:nd(s)?s:0;return(I,A,C,P)=>{if(p&&(y=(C-1)/2),g&&(y=C-1),!e.length){for(let X=0;X<C;X++){if(!h)e.push(Eo(y-X));else{let Y=p?(h[0]-1)/2:y%h[0],J=p?(h[1]-1)/2:Ao(y/h[0]),z=X%h[0],L=Ao(X/h[0]),W=Y-z,R=J-L,D=Tg(W*W+R*R);u==="x"&&(D=-W),u==="y"&&(D=-R),e.push(D)}i=zb(...e)}c&&(e=e.map(X=>c(X/i)*i)),r&&(e=e.map(X=>u?X<0?X*-1:-X:Eo(i-X)))}let M=_?(f-m)/i:m,N=(P?A1(P,oe(t.start)?P.iterationDuration:T):T)+(M*Ue(e[A],2)||0);return t.modifier&&(N=t.modifier(N)),w&&(N=`${N}${w[2]}`),N}};var C1=matchMedia("(prefers-reduced-motion: reduce)").matches;function Og(n,t){let e=n.getContext("2d"),i=0,s=0,r=Math.min(devicePixelRatio,2);function o(){let R=n.getBoundingClientRect();i=R.width,s=R.height,n.width=i*r,n.height=s*r,e.setTransform(r,0,0,r,0,0)}o(),new ResizeObserver(o).observe(n);let a="#2A2A2F",l="#6E6D68",c="#A6A49E",h="#FF6369",u="#8E2E32",d={idle:{x:.14,y:.5,label:"idle"},drive:{x:.34,y:.5,label:"driving"},human:{x:.52,y:.26,label:"human detected"},zone:{x:.7,y:.26,label:"slow zone"},exit:{x:.7,y:.74,label:"zone exit"}},p={start:{x:.24,y:.5,label:"start"},detect:{x:.43,y:.4,label:"detect human"},clear:{x:.61,y:.26,label:"zone clearance"},resume:{x:.61,y:.62,label:"resume speed"},complete:{x:.86,y:.62,label:"mission complete"},dev:{x:.52,y:.74,label:"clearance skipped",dev:!0}};function g(R){return{x:R.x*i,y:R.y*s}}let _=[["idle","T:start",null,700],["T:start","drive",null,700],["drive","T:detect",{cy:-.1},650],["T:detect","human",null,650],["human","T:clear",null,550],["T:clear","zone",null,550],["zone","T:resume",{cx:.79},650],["T:resume","exit",null,650],["exit","T:complete",{cy:.82},800],["T:complete","idle",{cy:1.02},900]],m=[["drive","T:dev",{cy:.68},600],["T:dev","exit",null,600]],f={};function w(){e.clearRect(0,0,i,s),e.fillStyle="#141416";for(let D=24;D<i;D+=44)for(let $=24;$<s;$+=44)e.fillRect(D,$,1.4,1.4);let R=[["idle","T:start",null,a],["T:start","drive",null,a],["drive","T:detect",{cy:-.1},a],["T:detect","human",null,a],["human","T:clear",null,a],["T:clear","zone",null,a],["zone","T:resume",{cx:.79},a],["T:resume","exit",null,a],["exit","T:complete",{cy:.82},a],["T:complete","idle",{cy:1.02},a],["drive","T:dev",{cy:.68},u],["T:dev","exit",null,u]];for(let[D,$,Z,tt]of R){let mt=g(y(D)),V=g(y($)),j,lt;Z&&Z.cy!=null?(j=(mt.x+V.x)/2,lt=Z.cy*s):Z&&Z.cx!=null?(j=Z.cx*i,lt=(mt.y+V.y)/2):(j=(mt.x+V.x)/2,lt=(mt.y+V.y)/2),e.strokeStyle=tt,e.lineWidth=1,e.setLineDash(tt===u?[4,5]:[]),e.beginPath(),e.moveTo(mt.x,mt.y),e.quadraticCurveTo(j,lt,V.x,V.y),e.stroke(),e.setLineDash([])}e.font='10px "IBM Plex Mono", monospace';for(let[D,$]of Object.entries(p)){let Z=g($),tt=f[D]||0,mt=$.dev?u:a;e.fillStyle=tt>0?`rgba(255,99,105,${.25+tt*.7})`:"#17171A",e.strokeStyle=$.dev?u:"#3A3A40",T(Z.x,Z.y,5,16),e.fillStyle="#17171A",tt>0&&(e.save(),e.shadowColor=h,e.shadowBlur=14*tt,T(Z.x,Z.y,5,16),e.restore()),e.fillStyle=$.dev?"#7a4a4c":l,e.textAlign="center",e.fillText($.label.toUpperCase(),Z.x,Z.y+30)}for(let[D,$]of Object.entries(d)){let Z=g($),tt=f[D]||0;e.beginPath(),e.arc(Z.x,Z.y,17,0,Math.PI*2),e.fillStyle="#0E0E10",e.fill(),e.strokeStyle=tt>0?`rgba(255,99,105,${.5+tt*.5})`:"#3A3A40",e.lineWidth=1.2,e.stroke(),tt>0&&(e.save(),e.strokeStyle=`rgba(255,99,105,${.35*tt})`,e.lineWidth=2,e.beginPath(),e.arc(Z.x,Z.y,17+8*(1-tt),0,Math.PI*2),e.stroke(),e.restore()),e.fillStyle=l,e.textAlign="center",e.fillText($.label.toUpperCase(),Z.x,Z.y+34)}}function T(R,D,$,Z){e.beginPath(),e.roundRect(R-$,D-Z,$*2,Z*2,2),e.fill(),e.stroke()}let y=R=>R.startsWith("T:")?p[R.slice(2)]:d[R.slice(0)],I={x:0,y:0,dev:!1,visible:!1};function A(R,D,$,Z){let tt=g(R),mt=g(D),V,j;$&&$.cy!=null?(V=(tt.x+mt.x)/2,j=$.cy*s):$&&$.cx!=null?(V=$.cx*i,j=(tt.y+mt.y)/2):(V=(tt.x+mt.x)/2,j=(tt.y+mt.y)/2);let lt=1-Z;return{x:lt*lt*tt.x+2*lt*Z*V+Z*Z*mt.x,y:lt*lt*tt.y+2*lt*Z*j+Z*Z*mt.y}}function C(R){f[R]=1,Po(f,{[R]:0},{duration:700,ease:"outQuad"})}let P=412,M=["14:02:11","14:02:47","14:03:29"];function v(){let R=document.createElement("div");R.className="deviation-chip";let D=P++,$=M[D%M.length];for(R.innerHTML=`<span class="dot"></span>sealed event #${D}: zone clearance skipped \xB7 ${$}`,t.appendChild(R),Po(R,{opacity:[0,1],translateY:[-8,0],duration:420,ease:"outQuad"});t.children.length>3;)t.firstChild.remove()}let N=0,X=!1;function Y(R,D){let $=0;function Z(){if(X)return;if($>=R.length){D();return}let[tt,mt,V,j]=R[$];C((tt.startsWith("T:"),tt)),tt.startsWith("T:")&&C(tt);let lt=performance.now();I.visible=!0,I.dev=mt==="exit"&&tt==="T:dev",I.dev=R===m;function ht(bt){if(X)return;let St=Math.min(1,(bt-lt)/j),Ct=1-Math.pow(1-St,2.2),$t=A(y(tt),y(mt),V,Ct);I.x=$t.x,I.y=$t.y,St<1?requestAnimationFrame(ht):(C(mt),$++,I.dev&&mt==="exit"&&v(),setTimeout(Z,260))}requestAnimationFrame(ht)}Z()}function J(){I.visible&&(e.beginPath(),e.arc(I.x,I.y,5,0,Math.PI*2),e.fillStyle=I.dev?h:"#EDECE8",e.shadowColor=I.dev?h:"rgba(240,240,235,0.8)",e.shadowBlur=10,e.fill(),e.shadowBlur=0)}function z(){N++;let R=N%3===0,D=R?m:_;if(R){let $=_.slice(0,2),Z=_.slice(7);Y($,()=>{Y(m,()=>{Y(Z,()=>setTimeout(z,900))})})}else Y(_,()=>setTimeout(z,900))}let L=!0;new IntersectionObserver(([R])=>{L=R.isIntersecting},{threshold:.05}).observe(n);function W(){w(),J(),requestAnimationFrame(W)}if(C1){w();return}requestAnimationFrame(W),(function R(){L&&!document.hidden?z():setTimeout(R,300)})()}var Bg=[{time:"13:58:02",payload:"agent v0.9.3 online, fleet B"},{time:"13:59:10",payload:"config speed_limit zone_B = 1.2 m/s"},{time:"14:01:58",payload:"intervention: operator r.rossi raised speed_limit zone_B to 1.8 m/s (remote)"},{time:"14:02:09",payload:"safety: protective stop near human, aisle 7"},{time:"14:02:10",payload:"state: velocity reached 0.0 m/s in 0.4 s"},{time:"14:04:33",payload:"mission: resumed mission 217"},{time:"14:31:02",payload:"config speed_limit zone_B restored 1.2 m/s"},{time:"14:31:05",payload:"upload: bundle sealed, Merkle root 9f3c41"}],R1="intervention: system auto-tuned speed_limit zone_B to 1.8 m/s",P1=2,I1=5;async function zg(n){let t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return[...new Uint8Array(t)].map(e=>e.toString(16).padStart(2,"0")).join("")}async function Vg(){let n=document.getElementById("event-log"),t=document.getElementById("status-dot"),e=document.getElementById("status-text"),i=document.getElementById("sealed-panel"),s=document.getElementById("btn-edit"),r=document.getElementById("btn-delete"),o=document.getElementById("btn-restore"),a=document.getElementById("btn-verify"),l=[],c="genesis";for(let w of Bg)c=await zg(c+w.payload),l.push(c);let h=!1,u=!1,d=[];function p(){d.length=0,Bg.forEach((w,T)=>{d.push({seq:T+1,time:w.time,payload:u&&T===P1?R1:w.payload,deleted:h&&T===I1,sealedHash:l[T]})})}function g(){p(),n.innerHTML="",d.forEach((w,T)=>{let y=document.createElement("li");y.className="event-row"+(w.deleted?" deleted":""),y.innerHTML=`
        <span class="ev-seq">${String(w.seq).padStart(2,"0")}</span>
        <span class="ev-time">${w.time}</span>
        <span class="ev-payload">${w.deleted?"[missing event: sequence break]":_(w.payload)}</span>
        <span class="ev-hash">${w.sealedHash.slice(0,12)}</span>`,n.appendChild(y)})}let _=w=>w.replace(/[<>&]/g,T=>({"<":"&lt;",">":"&gt;","&":"&amp;"})[T]);async function m(){let w="genesis",T=!1,y=[...n.children];for(let I=0;I<d.length;I++){let A=d[I],C=y[I];if(A.deleted){T=!0,C.classList.add("bad");continue}if(T){C.classList.remove("ok"),C.classList.add("bad");continue}let P=await zg(w+A.payload);P===A.sealedHash?(C.classList.add("ok"),w=P):(T=!0,C.classList.add("bad"))}T?(t.classList.add("broken"),e.textContent="Verification fails at the exact gap: the chain is broken",i.hidden=!1):(t.classList.remove("broken"),e.textContent="Chain intact - 8 events sealed",i.hidden=!0)}function f(){Po(".event-row",{opacity:[0,1],translateX:[-14,0],duration:480,delay:Fg(55),ease:"outQuad"})}s.addEventListener("click",()=>{u=!u,s.textContent=u?"Undo edit 03":"Edit event 03",g(),m()}),r.addEventListener("click",()=>{h=!h,r.textContent=h?"Restore event 06":"Delete event 06",g(),m()}),o.addEventListener("click",()=>{u=!1,h=!1,s.textContent="Edit event 03",r.textContent="Delete event 06",g(),m()}),a.addEventListener("click",m),g(),f(),await m()}function kg(n,t,e){let i=document.createElement("canvas");i.id="explode-canvas",i.setAttribute("aria-hidden","true"),t&&t.parentNode?t.replaceWith(i):n.querySelector(".pipeline-sticky").prepend(i);let s=i.getContext("2d"),r=matchMedia("(prefers-reduced-motion: reduce)").matches,o="229,72,77",a=0,l=0,c=Math.min(devicePixelRatio||1,2),h=100,u=0,d=0;function p(){let L=i.getBoundingClientRect();a=L.width,l=L.height,i.width=Math.round(a*c),i.height=Math.round(l*c),s.setTransform(c,0,0,c,0,0),h=Math.min(a*.185,l*.115,148),u=a*.5,d=l*.7}p(),new ResizeObserver(p).observe(i);let g=0,_=0,m=0;function f(L,W,R){return[(L-R)*.866*h+u,((L+R)*.5-W)*h+d]}function w(L,W,R,D,$){$!==void 0&&(s.globalAlpha=$),s.beginPath(),s.moveTo(L[0][0],L[0][1]);for(let Z=1;Z<L.length;Z++)s.lineTo(L[Z][0],L[Z][1]);s.closePath(),W&&(s.fillStyle=W,s.fill()),R&&(s.save(),D&&(s.shadowColor=`rgba(${o},0.9)`,s.shadowBlur=D),s.strokeStyle=R,s.lineWidth=1.4,s.stroke(),s.restore()),s.globalAlpha=1}function T(L,W,R,D,$,Z,tt,mt){let V=L-D/2,j=L+D/2,lt=R-Z/2,ht=R+Z/2,bt=W,St=W+$;w([f(V,St,lt),f(j,St,lt),f(j,St,ht),f(V,St,ht)],tt.top,tt.stroke,tt.glow,mt),w([f(j,bt,lt),f(j,bt,ht),f(j,St,ht),f(j,St,lt)],tt.right,tt.stroke,0,mt),w([f(V,bt,ht),f(j,bt,ht),f(j,St,ht),f(V,St,ht)],tt.front,tt.stroke,0,mt)}function y(L,W,R,D,$,Z,tt,mt){mt!==void 0&&(s.globalAlpha=mt);let[V,j]=f(L,W,R);s.beginPath(),s.ellipse(V,j,D*1.2247*h,D*.7071*h,0,0,Math.PI*2),$&&(s.fillStyle=$,s.fill()),Z&&(s.save(),tt&&(s.shadowColor=`rgba(${o},0.9)`,s.shadowBlur=tt),s.strokeStyle=Z,s.lineWidth=1.4,s.stroke(),s.restore()),s.globalAlpha=1}let I=[3.1,1.9,1.05,.45,0];function A(L,W,R){return W+I[L]*R}let C=[...e.querySelectorAll(".chip")],P=[...n.querySelectorAll(".step")],M=-1;function v(L){L===M||L<0||(M=L,P.forEach(W=>W.classList.toggle("active",+W.dataset.layer===L)),C.forEach(W=>W.classList.toggle("active",+W.dataset.layer===L)))}if(r)v(1);else{let L=new IntersectionObserver(W=>{for(let R of W)R.isIntersecting&&v(+R.target.dataset.layer)},{rootMargin:"-42% 0px -42% 0px"});P.forEach(W=>L.observe(W))}function N(L,W,R){let D=M<0||M===L?1:.2,$=(L%2===0?-1:1)*R*.3,Z=A(L,W,R),tt=`rgba(${o},${.9*D})`,mt=D;if(L===4)T($,Z,0,2.5,.55,1.9,{top:"#2c2f37",right:"#1a1c22",front:"#14161b",stroke:tt,glow:6},mt),y($-.6,Z+.56,0,.55,`rgba(120,124,138,${.55*D})`,`rgba(255,255,255,${.12*D})`,0,mt),y($+.6,Z+.56,0,.55,null,`rgba(${o},${.6*D})`,10,mt);else if(L===3)T($,Z,0,1.5,.26,1.1,{top:"#23262d",right:"#171920",front:"#121419",stroke:tt,glow:5},mt),T($,Z+.26,0,.4,.09,.4,{top:`rgba(20,22,27,${D})`,right:"#0e1013",front:"#0a0c0f",stroke:`rgba(160,130,70,${.5*D})`},mt);else if(L===2){T($,Z,0,2,.34,1.3,{top:"#2a2c34",right:"#191b21",front:"#121419",stroke:tt,glow:6},mt);for(let V=0;V<5;V++){let j=$-.68+V*.34;T(j,Z+.34,0,.24,.24,.24,{top:`rgba(30,33,40,${D})`,right:"#14161b",front:"#0f1115",stroke:`rgba(255,99,105,${.85*D})`,glow:8},mt)}}else if(L===1){T($,Z,0,2.25,.18,1.65,{top:"#30333b",right:"#1d1f25",front:"#16181d",stroke:tt,glow:5},mt);for(let V=0;V<6;V++)y($-.85+V*.34,Z+.2,.4,.05,`rgba(140,144,158,${.6*D})`,null,0,mt)}else{T($,Z,0,1.15,.34,1.15,{top:"#262932",right:"#171920",front:"#121419",stroke:tt,glow:6},mt),y($,Z+.35,0,.17,`rgba(229,72,77,${.95*D})`,`rgba(255,170,173,${.9*D})`,18*D,mt);let[V,j]=f($,Z+.35,0),lt=s.createRadialGradient(V,j,0,V,j,h*.7);lt.addColorStop(0,`rgba(255,99,105,${.4*D})`),lt.addColorStop(1,"rgba(255,99,105,0)"),s.fillStyle=lt,s.fillRect(V-h,j-h,h*2,h*2)}}function X(){s.save(),s.strokeStyle="rgba(150,152,166,0.1)",s.lineWidth=1;for(let L=-5;L<=5;L++){let W=f(L,-.6,-5),R=f(L,-.6,5);s.beginPath(),s.moveTo(W[0],W[1]),s.lineTo(R[0],R[1]),s.stroke();let D=f(-5,-.6,L),$=f(5,-.6,L);s.beginPath(),s.moveTo(D[0],D[1]),s.lineTo($[0],$[1]),s.stroke()}s.restore()}function Y(){s.clearRect(0,0,a,l),X();let L=[1.62,1.32,.98,.62,0];for(let W of[4,3,2,1,0])N(W,L[W],r?.3:_)}let J=!0;new IntersectionObserver(([L])=>{J=L.isIntersecting},{threshold:.02}).observe(i);function z(){g+=.016;let L=n.getBoundingClientRect(),W=L.height-innerHeight;m=W>0?Math.min(1,Math.max(0,-L.top/W)):0,_+=(m-_)*.1;let R=r?.3:_*_*(3-2*_);s.clearRect(0,0,a,l),X();let D=[1.62,1.32,.98,.62,0];for(let $ of[4,3,2,1,0])N($,D[$],R)}if(r)Y();else{let L=()=>{J&&!document.hidden&&z(),requestAnimationFrame(L)};requestAnimationFrame(L)}}var rc=matchMedia("(prefers-reduced-motion: reduce)").matches;function D1(){setTimeout(()=>{document.querySelectorAll(".hero h1, .hero-sub, .hero-ctas").forEach(n=>{parseFloat(getComputedStyle(n).opacity)<.99&&(n.style.animation="none",n.style.opacity="1",n.style.transform="none")})},1600)}function L1(){rc||Bc(Lc("#progress",{scaleX:[0,1],ease:"linear"}))}function U1(){if(rc)return;let n=[...document.querySelectorAll(".clause, .ledger-row, .tier, .stat, .fact, .quote-card, .demo-shell, .section-h")],t=new Set,e=i=>{t.has(i)||(t.add(i),i.style.transition="opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",i.style.opacity="1",i.style.transform="translateY(0)")};n.forEach(i=>{i.style.opacity="0",i.style.transform="translateY(24px)",zc(i,()=>e(i),{amount:.25})}),setTimeout(()=>n.forEach(e),3200)}function N1(){let n=document.querySelectorAll("[data-count]"),t=i=>{let s=+i.dataset.count,r=i.dataset.prefix||"",o=i.dataset.suffix||"%";if(rc){i.textContent=r+s+o;return}let a=performance.now(),l=1400;function c(h){let u=Math.min(1,(h-a)/l),d=1-Math.pow(1-u,3);i.textContent=r+Math.round(s*d)+o,u<1&&requestAnimationFrame(c)}requestAnimationFrame(c)},e=new IntersectionObserver(i=>{i.forEach(s=>{s.isIntersecting&&(t(s.target),e.unobserve(s.target))})},{threshold:.6});n.forEach(i=>e.observe(i))}var F1=new Date("2027-01-20T00:00:00+01:00").getTime();function sc(n){return String(n).padStart(2,"0")}function O1(){let n=document.getElementById("count-days"),t=document.getElementById("count-clock"),e=document.getElementById("cta-count");function i(){let s=Math.max(0,F1-Date.now()),r=Math.floor(s/864e5),o=Math.floor(s/36e5)%24,a=Math.floor(s/6e4)%60,l=Math.floor(s/1e3)%60;n&&(n.textContent=r),t&&(t.textContent=`${sc(r)} : ${sc(o)} : ${sc(a)} : ${sc(l)}`),e&&(e.textContent=`${r} days to go`)}i(),setInterval(i,1e3)}function B1(){if(rc)return;document.querySelectorAll(".magnetic").forEach(t=>{let e=0,i=0,s=0,r=0,o=0,a=.18;function l(){i+=(r-i)*.18,s+=(o-s)*.18,t.style.transform=`translate(${i}px, ${s}px)`,e=requestAnimationFrame(l)}t.addEventListener("pointermove",c=>{let h=t.getBoundingClientRect();r=(c.clientX-(h.left+h.width/2))*a,o=(c.clientY-(h.top+h.height/2))*a,e||(e=requestAnimationFrame(l))}),t.addEventListener("pointerleave",()=>{r=0,o=0,setTimeout(()=>{Math.abs(i)<.4&&Math.abs(s)<.4&&(cancelAnimationFrame(e),e=0,t.style.transform="",i=s=0)},350)})})}var Hg=!1,ud=null;function Gg(n){if(!Hg){Hg=!0,console.warn("[sigillo] 2D renderer active:",n),document.documentElement.setAttribute("data-renderer","2d");try{ud&&ud.dispose()}catch{}try{kg(document.querySelector(".pipeline"),document.getElementById("explode-canvas"),document.getElementById("layer-chips"))}catch(t){console.error("[sigillo] fallback explode",t)}}}function z1(){hi("witness",()=>Mp(document.getElementById("hero-canvas")));let n=new URLSearchParams(location.search).get("renderer")==="2d";if(n||!V1()){n||console.warn("[sigillo] webgl unavailable"),Gg(n?"forced by URL":"webgl unavailable");return}try{ud=tg(document.querySelector(".pipeline"),document.getElementById("explode-canvas"),document.getElementById("leader-lines"),document.getElementById("layer-chips")),document.documentElement.setAttribute("data-renderer","webgl")}catch(t){console.error("[sigillo] webgl init failed",t),Gg("webgl init failed")}}function V1(){try{let n=document.createElement("canvas");return!!(n.getContext("webgl2")||n.getContext("webgl"))}catch{return!1}}function hi(n,t){try{t()}catch(e){console.error("[sigillo]",n,e)}}function Wg(){window.__sigilloBooted=!0,hi("progress",()=>L1()),hi("reveals",()=>U1()),hi("heroSafety",()=>D1()),hi("counters",()=>N1()),hi("countdown",()=>O1()),hi("magnetic",()=>B1()),hi("scenes",()=>z1()),hi("petri",()=>Og(document.getElementById("petri-canvas"),document.getElementById("deviation-feed"))),hi("tamper",()=>Vg())}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Wg):Wg();})();
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
