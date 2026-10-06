var Ct=Object.defineProperty;var kt=Object.getOwnPropertyDescriptor;var E=(r,t,e,s)=>{for(var i=s>1?void 0:s?kt(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Ct(t,e,i),i};var L=globalThis,j=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,F=Symbol(),ot=new WeakMap,S=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==F)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(j&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ot.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ot.set(e,t))}return t}toString(){return this.cssText}},at=r=>new S(typeof r=="string"?r:r+"",void 0,F),q=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new S(e,r,F)},lt=(r,t)=>{if(j)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=L.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},K=j?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return at(e)})(r):r;var{is:Pt,defineProperty:Tt,getOwnPropertyDescriptor:Mt,getOwnPropertyNames:Ut,getOwnPropertySymbols:Ot,getPrototypeOf:Dt}=Object,z=globalThis,ct=z.trustedTypes,Ht=ct?ct.emptyScript:"",Rt=z.reactiveElementPolyfillSupport,C=(r,t)=>r,k={toAttribute(r,t){switch(t){case Boolean:r=r?Ht:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},I=(r,t)=>!Pt(r,t),dt={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:I};Symbol.metadata??=Symbol("metadata"),z.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Tt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=Mt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let l=i?.call(this);n?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??dt}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;let t=Dt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){let e=this.properties,s=[...Ut(e),...Ot(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(K(i))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:k).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:k;this._$Em=i;let l=o.fromAttribute(e,n.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let o=this.constructor;if(i===!1&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??I)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:o}=n,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,n,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[C("elementProperties")]=new Map,f[C("finalized")]=new Map,Rt?.({ReactiveElement:f}),(z.reactiveElementVersions??=[]).push("2.1.2");var tt=globalThis,ht=r=>r,B=tt.trustedTypes,pt=B?B.createPolicy("lit-html",{createHTML:r=>r}):void 0,yt="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,_t="?"+y,Nt=`<${_t}>`,b=document,T=()=>b.createComment(""),M=r=>r===null||typeof r!="object"&&typeof r!="function",et=Array.isArray,Lt=r=>et(r)||typeof r?.[Symbol.iterator]=="function",G=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,mt=/>/g,_=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,gt=/"/g,vt=/^(?:script|style|textarea|title)$/i,st=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),p=st(1),Xt=st(2),Zt=st(3),A=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),$t=new WeakMap,v=b.createTreeWalker(b,129);function bt(r,t){if(!et(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(t):t}var jt=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=P;for(let l=0;l<e;l++){let a=r[l],h,u,d=-1,m=0;for(;m<a.length&&(o.lastIndex=m,u=o.exec(a),u!==null);)m=o.lastIndex,o===P?u[1]==="!--"?o=ut:u[1]!==void 0?o=mt:u[2]!==void 0?(vt.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=_):u[3]!==void 0&&(o=_):o===_?u[0]===">"?(o=i??P,d=-1):u[1]===void 0?d=-2:(d=o.lastIndex-u[2].length,h=u[1],o=u[3]===void 0?_:u[3]==='"'?gt:ft):o===gt||o===ft?o=_:o===ut||o===mt?o=P:(o=_,i=void 0);let $=o===_&&r[l+1].startsWith("/>")?" ":"";n+=o===P?a+Nt:d>=0?(s.push(h),a.slice(0,d)+yt+a.slice(d)+y+$):a+y+(d===-2?l:$)}return[bt(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},U=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,l=t.length-1,a=this.parts,[h,u]=jt(t,e);if(this.el=r.createElement(h,s),v.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=v.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(yt)){let m=u[o++],$=i.getAttribute(d).split(y),N=/([.?@])?(.*)/.exec(m);a.push({type:1,index:n,name:N[2],strings:$,ctor:N[1]==="."?X:N[1]==="?"?Z:N[1]==="@"?Q:w}),i.removeAttribute(d)}else d.startsWith(y)&&(a.push({type:6,index:n}),i.removeAttribute(d));if(vt.test(i.tagName)){let d=i.textContent.split(y),m=d.length-1;if(m>0){i.textContent=B?B.emptyScript:"";for(let $=0;$<m;$++)i.append(d[$],T()),v.nextNode(),a.push({type:2,index:++n});i.append(d[m],T())}}}else if(i.nodeType===8)if(i.data===_t)a.push({type:2,index:n});else{let d=-1;for(;(d=i.data.indexOf(y,d+1))!==-1;)a.push({type:7,index:n}),d+=y.length-1}n++}}static createElement(t,e){let s=b.createElement("template");return s.innerHTML=t,s}};function x(r,t,e=r,s){if(t===A)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=M(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=x(r,i._$AS(r,t.values),i,s)),t}var J=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??b).importNode(e,!0);v.currentNode=i;let n=v.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new O(n,n.nextSibling,this,t):a.type===1?h=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(h=new Y(n,this,t)),this._$AV.push(h),a=s[++l]}o!==a?.index&&(n=v.nextNode(),o++)}return v.currentNode=b,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},O=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=x(this,t,e),M(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Lt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(b.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=U.createElement(bt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new J(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=$t.get(t.strings);return e===void 0&&$t.set(t.strings,e=new U(t)),e}k(t){et(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new r(this.O(T()),this.O(T()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ht(t).nextSibling;ht(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},w=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=x(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==A,o&&(this._$AH=t);else{let l=t,a,h;for(t=n[0],a=0;a<n.length-1;a++)h=x(this,l[s+a],e,a),h===A&&(h=this._$AH[a]),o||=!M(h)||h!==this._$AH[a],h===c?t=c:t!==c&&(t+=(h??"")+n[a+1]),this._$AH[a]=h}o&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},X=class extends w{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},Z=class extends w{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},Q=class extends w{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=x(this,t,e,0)??c)===A)return;let s=this._$AH,i=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Y=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){x(this,t)}};var qt=tt.litHtmlPolyfillSupport;qt?.(U,O),(tt.litHtmlVersions??=[]).push("3.3.3");var At=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new O(t.insertBefore(T(),n),n,void 0,e??{})}return i._$AI(r),i};var it=globalThis,g=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=At(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};g._$litElement$=!0,g.finalized=!0,it.litElementHydrateSupport?.({LitElement:g});var zt=it.litElementPolyfillSupport;zt?.({LitElement:g});(it.litElementVersions??=[]).push("4.2.2");var It={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:I},Bt=(r=It,t,e)=>{let{kind:s,metadata:i}=e,n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){let{name:o}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,r,l),l}}}if(s==="setter"){let{name:o}=e;return function(l){let a=this[o];t.call(this,l),this.requestUpdate(o,a,r,!0,l)}}throw Error("Unsupported decorator location: "+s)};function D(r){return(t,e)=>typeof e=="object"?Bt(r,t,e):((s,i,n)=>{let o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}function rt(r){return D({...r,state:!0,attribute:!1})}function xt(r){let t=!r.cancelled&&r.delay_seconds>=60;return{delayed:t,displayTime:r.cancelled?r.scheduled_time:r.estimated_time,scheduledTime:t?r.scheduled_time:void 0,delayMinutes:t?Math.round(r.delay_seconds/60):void 0}}function wt(r,t=[]){return[...new Set([...t,...Object.keys(r.states)])].find(s=>{let i=r.states[s]?.attributes;return Array.isArray(i?.stops)&&Array.isArray(i?.departures)})}var W=3,Et=12,St=12;function Vt(r,t=Date.now()){return Math.max(0,Math.round((new Date(r).getTime()-t)/6e4))}function nt(r,t){return new Intl.DateTimeFormat(t,{hour:"numeric",minute:"2-digit"}).format(new Date(r))}var H=class extends g{static async getConfigElement(){return document.createElement("translink-schedule-card-editor")}static getStubConfig(t,e=[]){return{entity:wt(t,e)??"",view:"grouped",departures_per_stop:W}}setConfig(t){if(!t.entity)throw new Error("A TransLink Schedule entity is required");this.config={view:"grouped",departures_per_stop:W,max_departures:St,show_clock:!0,show_alerts:!0,show_attribution:!0,...t}}connectedCallback(){super.connectedCallback(),this.ticker=window.setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){this.ticker!==void 0&&window.clearInterval(this.ticker),super.disconnectedCallback()}render(){if(!this.config||!this.hass)return c;let t=this.hass.states[this.config.entity];if(!t)return p`<ha-card><div class="message error">
        Entity ${this.config.entity} was not found.
      </div></ha-card>`;let e=t.attributes.stops??[],s=t.attributes.departures??[],i=t.attributes.alerts??[],n=this.config.title??t.attributes.board_name??"TransLink departures";return p`
      <ha-card>
        <header>
          <div>
            <div class="eyebrow">TransLink</div>
            <h1>${n}</h1>
          </div>
          ${this.config.show_clock?p`<div class="clock">${nt(new Date().toISOString(),this.hass.locale?.language)}</div>`:c}
        </header>
        ${this.config.show_alerts&&i.length?p`<div class="alerts">
              ${i.map(o=>p`<div>
                  <ha-icon icon="mdi:alert"></ha-icon>
                  <span>
                    <strong>${o.header}</strong>
                    ${o.description?p`<small>${o.description}</small>`:c}
                  </span>
                </div>`)}
            </div>`:c}
        <main>
          ${s.length===0?p`<div class="message">No upcoming departures.</div>`:this.config.view==="combined"?this.renderCombined(s):this.renderGrouped(e)}
        </main>
        ${this.config.show_attribution?p`<footer>Route and arrival data provided by permission of TransLink.</footer>`:c}
      </ha-card>
    `}renderGrouped(t){return t.map(e=>p`
      <section>
        <div class="stop-heading">
          <span>${e.stop_name}</span>
          ${e.stop_code?p`<span class="stop-code">#${e.stop_code}</span>`:c}
        </div>
        ${e.departures.length?e.departures.slice(0,this.config?.departures_per_stop??W).map(s=>this.renderDeparture(s,!1)):p`<div class="empty-stop">No upcoming departures</div>`}
      </section>
    `)}renderCombined(t){return p`
      <section>
        ${t.slice(0,this.config?.max_departures??St).map(e=>this.renderDeparture(e,!0))}
      </section>
    `}renderDeparture(t,e){let s=[t.route_color?`background:#${t.route_color}`:"",t.route_text_color?`color:#${t.route_text_color}`:""].filter(Boolean).join(";"),i=xt(t);return p`
      <div class="departure ${t.cancelled?"cancelled":""}">
        <span class="route" style=${s}>${t.route_name}</span>
        <div class="destination">
          <strong>${t.destination||t.route_long_name}</strong>
          ${e?p`<small>${t.stop_name}</small>`:c}
        </div>
        <div class="timing">
          <strong>${t.cancelled?"Cancelled":`${Vt(t.estimated_time)} min`}</strong>
          <small class="time-details">
            ${i.scheduledTime?p`<s>${nt(i.scheduledTime,this.hass?.locale?.language)}</s>`:c}
            <span class=${i.delayed?"predicted-time":""}>
              ${nt(i.displayTime,this.hass?.locale?.language)}
            </span>
            ${i.delayMinutes!==void 0?p`<span class="delay">+${i.delayMinutes} min</span>`:c}
          </small>
        </div>
      </div>
    `}static{this.styles=q`
    :host { display: block; }
    ha-card { overflow: hidden; }
    header {
      align-items: center;
      background: var(--primary-color);
      color: var(--text-primary-color);
      display: flex;
      justify-content: space-between;
      padding: 16px 20px;
    }
    .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; opacity: .8; text-transform: uppercase; }
    h1 { font-size: 20px; line-height: 1.2; margin: 2px 0 0; }
    .clock { font-size: 18px; font-variant-numeric: tabular-nums; font-weight: 600; }
    .alerts { background: var(--warning-color, #ff9800); color: #111; padding: 8px 16px; }
    .alerts > div { align-items: flex-start; display: flex; gap: 8px; }
    .alerts > div + div { margin-top: 8px; }
    .alerts span { display: flex; flex-direction: column; }
    .alerts small { color: inherit; }
    main { padding: 4px 0; }
    section + section { border-top: 1px solid var(--divider-color); }
    .stop-heading {
      align-items: baseline;
      background: color-mix(in srgb, var(--card-background-color), var(--primary-color) 7%);
      display: flex;
      font-size: 14px;
      font-weight: 700;
      justify-content: space-between;
      padding: 9px 16px;
    }
    .stop-code { color: var(--secondary-text-color); font-size: 12px; font-weight: 500; }
    .departure {
      align-items: center;
      display: grid;
      gap: 12px;
      grid-template-columns: minmax(42px, auto) 1fr auto;
      min-height: 48px;
      padding: 6px 16px;
    }
    .departure + .departure { border-top: 1px solid var(--divider-color); }
    .route {
      background: var(--primary-color);
      border-radius: 5px;
      color: var(--text-primary-color);
      font-size: 13px;
      font-weight: 800;
      min-width: 30px;
      padding: 5px 7px;
      text-align: center;
    }
    .destination, .timing { display: flex; flex-direction: column; min-width: 0; }
    .destination strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    small { color: var(--secondary-text-color); font-size: 11px; }
    .timing { align-items: flex-end; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .time-details { align-items: baseline; display: flex; gap: 5px; }
    .predicted-time, .delay { color: var(--error-color); }
    .cancelled .destination strong { text-decoration: line-through; }
    .empty-stop, .message { color: var(--secondary-text-color); padding: 16px; }
    .error { color: var(--error-color); }
    footer { color: var(--secondary-text-color); font-size: 10px; padding: 8px 16px 12px; }
    @media (max-width: 450px) {
      .departure { gap: 8px; padding-inline: 12px; }
      header { padding-inline: 16px; }
    }
  `}};E([D({attribute:!1})],H.prototype,"hass",2),E([rt()],H.prototype,"config",2);var R=class extends g{setConfig(t){this.config=t}render(){return this.config?p`
      <div class="form">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.entity}
          .includeDomains=${["sensor"]}
          label="Entity"
          data-key="entity"
          @value-changed=${this.valueChanged}
        ></ha-entity-picker>
        <ha-textfield
          .value=${this.config.title??""}
          label="Title"
          data-key="title"
          @input=${this.valueChanged}
        ></ha-textfield>
        <ha-select
          .value=${this.config.view??"grouped"}
          label="Layout"
          data-key="view"
          @selected=${this.valueChanged}
          @closed=${t=>t.stopPropagation()}
        >
          <mwc-list-item value="grouped">Grouped by stop</mwc-list-item>
          <mwc-list-item value="combined">Combined by time</mwc-list-item>
        </ha-select>
        <ha-textfield
          type="number"
          min="1"
          max=${Et}
          .value=${String(this.config.departures_per_stop??W)}
          label="Departures per stop"
          data-key="departures_per_stop"
          @input=${this.numberChanged}
        ></ha-textfield>
        <ha-formfield label="Show service notices">
          <ha-switch
            .checked=${this.config.show_alerts!==!1}
            data-key="show_alerts"
            @change=${this.booleanChanged}
          ></ha-switch>
        </ha-formfield>
      </div>
    `:c}valueChanged(t){if(!this.config)return;let e=t.currentTarget,s=e.dataset.key,n=t.detail?.value??e.value;this.config={...this.config,[s]:n},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}booleanChanged(t){if(!this.config)return;let e=t.currentTarget,s=e.dataset.key;this.config={...this.config,[s]:e.checked},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}numberChanged(t){if(!this.config)return;let e=t.currentTarget,s=Number.parseInt(e.value,10);if(!Number.isFinite(s))return;let i=e.dataset.key;this.config={...this.config,[i]:Math.min(Et,Math.max(1,s))},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}static{this.styles=q`
    .form { display: grid; gap: 16px; padding: 8px 0; }
  `}};E([D({attribute:!1})],R.prototype,"hass",2),E([rt()],R.prototype,"config",2);customElements.get("translink-schedule-card")||customElements.define("translink-schedule-card",H);customElements.get("translink-schedule-card-editor")||customElements.define("translink-schedule-card-editor",R);window.customCards=window.customCards??[];window.customCards.some(r=>r.type==="translink-schedule-card")||window.customCards.push({type:"translink-schedule-card",name:"TransLink Schedule Card",description:"Upcoming departures from multiple TransLink stops.",preview:!0});export{H as TransLinkScheduleCard,R as TransLinkScheduleCardEditor};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
