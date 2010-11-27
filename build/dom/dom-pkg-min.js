/*
Copyright 2010, KISSY UI Library v1.1.6dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("dom",function(a,x){function p(g,q){return g&&g.nodeType===q}a.DOM={_isElementNode:function(g){return p(g,1)},_isKSNode:function(g){return a.Node&&p(g,a.Node.TYPE)},_getWin:function(g){return g&&"scrollTo"in g&&g.document?g:p(g,9)?g.defaultView||g.parentWindow:g===x?window:false},_nodeTypeIs:p}});
KISSY.add("selector",function(a,x){function p(e,f){var d,b,c=[],m;f=g(f);if(a.isString(e)){e=a.trim(e);if(w.test(e)){if(b=q(e.slice(1),f))c=[b]}else if(d=n.exec(e)){b=d[1];m=d[2];d=d[3];if(f=b?q(b,f):f)if(d)if(!b||e.indexOf(k)!==-1)c=h(d,m,f);else{if((b=q(b,f))&&v.hasClass(b,d))c=[b]}else if(m)c=z(m,f)}else if(a.ExternalSelector)return a.ExternalSelector(e,f);else j(e)}else if(e&&(e[r]||e[s]))c=e[r]?[e[r]()]:e[s]();else if(e&&(a.isArray(e)||e&&!e.nodeType&&e.item&&e!=window))c=e;else if(e)c=[e];if(c&&
!c.nodeType&&c.item&&c!=window)c=a.makeArray(c);c.each=function(y,i){return a.each(c,y,i)};return c}function g(e){if(e===x)e=l;else if(a.isString(e)&&w.test(e))e=q(e.slice(1),l);else if(e&&e.nodeType!==1&&e.nodeType!==9)e=null;return e}function q(e,f){if(f.nodeType!==9)f=f.ownerDocument;return f.getElementById(e)}function z(e,f){return f.getElementsByTagName(e)}function h(e,f,d){d=e=d.getElementsByClassName(e);var b=0,c=0,m=e.length,y;if(f&&f!==o){d=[];for(f=f.toUpperCase();b<m;++b){y=e[b];if(y.tagName===
f)d[c++]=y}}return d}function j(e){a.error("Unsupported selector: "+e)}var l=document,v=a.DOM,k=" ",o="*",r="getDOMNode",s=r+"s",w=/^#[\w-]+$/,n=/^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/;(function(){var e=l.createElement("div");e.appendChild(l.createComment(""));if(e.getElementsByTagName(o).length>0)z=function(f,d){var b=d.getElementsByTagName(f);if(f===o){for(var c=[],m=0,y=0,i;i=b[m++];)if(i.nodeType===1)c[y++]=i;b=c}return b}})();l.getElementsByClassName||(h=l.querySelectorAll?function(e,f,
d){return d.querySelectorAll((f?f:"")+"."+e)}:function(e,f,d){f=d.getElementsByTagName(f||o);d=[];var b=0,c=0,m=f.length,y,i;for(e=k+e+k;b<m;++b){y=f[b];if((i=y.className)&&(k+i+k).indexOf(e)>-1)d[c++]=y}return d});a.query=p;a.get=function(e,f){return p(e,f)[0]||null};a.mix(v,{query:p,get:a.get,filter:function(e,f){var d=p(e),b,c,m,y=[];if(a.isString(f)&&(b=n.exec(f))&&!b[1]){c=b[2];m=b[3];f=function(i){return!(c&&i.tagName!==c.toUpperCase()||m&&!v.hasClass(i,m))}}if(a.isFunction(f))y=a.filter(d,
f);else if(f&&a.ExternalSelector)y=a.ExternalSelector._filter(e,f);else j(f);return y},test:function(e,f){var d=p(e);return v.filter(d,f).length===d.length}})});
KISSY.add("dom-data",function(a,x){var p=window,g=a.DOM,q="_ks_data_"+a.now(),z={},h={},j={EMBED:1,OBJECT:1,APPLET:1};a.mix(g,{data:function(l,v,k){if(a.isPlainObject(v))for(var o in v)g.data(l,o,v[o]);else if(k===x){l=a.get(l);var r;if(!(!l||j[l.nodeName])){if(l==p)l=h;r=(o=l&&l.nodeType)?z:l;l=r[o?l[q]:q];if(a.isString(v)&&l)return l[v];return l}}else a.query(l).each(function(s){if(!(!s||j[s.nodeName])){if(s==p)s=h;var w=z,n;if(s&&s.nodeType){if(!(n=s[q]))n=s[q]=a.guid()}else{n=q;w=s}if(v&&k!==
x){w[n]||(w[n]={});w[n][v]=k}}})},removeData:function(l,v){a.query(l).each(function(k){if(k){if(k==p)k=h;var o,r=z,s,w=k&&k.nodeType;if(w)o=k[q];else{r=k;o=q}if(o){s=r[o];if(v){if(s){delete s[v];a.isEmptyObject(s)&&g.removeData(k)}}else{if(w)k.removeAttribute&&k.removeAttribute(q);else try{delete k[q]}catch(n){}w&&delete r[o]}}}})}})});
KISSY.add("dom-class",function(a,x){function p(h,j,l,v){if(!(j=a.trim(j)))return v?false:x;h=a.query(h);var k=0,o=h.length;j=j.split(q);for(var r;k<o;k++){r=h[k];if(g._isElementNode(r)){r=l(r,j,j.length);if(r!==x)return r}}if(v)return false}var g=a.DOM,q=/[\.\s]\s*\.?/,z=/[\n\t]/g;a.mix(g,{hasClass:function(h,j){return p(h,j,function(l,v,k){if(l=l.className){l=" "+l+" ";for(var o=0,r=true;o<k;o++)if(l.indexOf(" "+v[o]+" ")<0){r=false;break}if(r)return true}},true)},addClass:function(h,j){p(h,j,function(l,
v,k){var o=l.className;if(o){var r=" "+o+" ";o=o;for(var s=0;s<k;s++)if(r.indexOf(" "+v[s]+" ")<0)o+=" "+v[s];l.className=a.trim(o)}else l.className=j})},removeClass:function(h,j){p(h,j,function(l,v,k){var o=l.className;if(o)if(k){o=(" "+o+" ").replace(z," ");for(var r=0,s;r<k;r++)for(s=" "+v[r]+" ";o.indexOf(s)>=0;)o=o.replace(s," ");l.className=a.trim(o)}else l.className=""})},replaceClass:function(h,j,l){g.removeClass(h,j);g.addClass(h,l)},toggleClass:function(h,j,l){var v=a.isBoolean(l),k;p(h,
j,function(o,r,s){for(var w=0,n;w<s;w++){n=r[w];k=v?!l:g.hasClass(o,n);g[k?"removeClass":"addClass"](o,n)}})}})});
KISSY.add("dom-attr",function(a,x){var p=a.UA,g=document.documentElement,q=!g.hasAttribute,z=g.textContent!==x?"textContent":"innerText",h=a.DOM,j=h._isElementNode,l=/^(?:href|src|style)/,v=/^(?:href|src|colspan|rowspan)/,k=/\r/g,o=/^(?:radio|checkbox)/,r={readonly:"readOnly"},s={val:1,css:1,html:1,text:1,data:1,width:1,height:1,offset:1};q&&a.mix(r,{"for":"htmlFor","class":"className"});a.mix(h,{attr:function(w,n,e,f){if(a.isPlainObject(n)){f=e;for(var d in n)h.attr(w,d,n[d],f)}else if(n=a.trim(n)){n=
n.toLowerCase();if(f&&s[n])return h[n](w,e);n=r[n]||n;if(e===x){w=a.get(w);if(!j(w))return x;var b;l.test(n)||(b=w[n]);if(b===x)b=w.getAttribute(n);if(q)if(v.test(n))b=w.getAttribute(n,2);else if(n==="style")b=w.style.cssText;return b===null?x:b}a.each(a.query(w),function(c){if(j(c))if(n==="style")c.style.cssText=e;else{if(n==="checked")c[n]=!!e;c.setAttribute(n,""+e)}})}},removeAttr:function(w,n){a.each(a.query(w),function(e){if(j(e)){h.attr(e,n,"");e.removeAttribute(n)}})},val:function(w,n){if(n===
x){var e=a.get(w);if(!j(e))return x;if(e&&e.nodeName.toUpperCase()==="option".toUpperCase())return(e.attributes.value||{}).specified?e.value:e.text;if(e&&e.nodeName.toUpperCase()==="select".toUpperCase()){var f=e.selectedIndex,d=e.options;if(f<0)return null;else if(e.type==="select-one")return h.val(d[f]);e=[];for(var b=0,c=d.length;b<c;++b)d[b].selected&&e.push(h.val(d[b]));return e}if(p.webkit&&o.test(e.type))return e.getAttribute("value")===null?"on":e.value;return(e.value||"").replace(k,"")}a.each(a.query(w),
function(m){if(m&&m.nodeName.toUpperCase()==="select".toUpperCase()){if(a.isNumber(n))n+="";var y=a.makeArray(n),i=m.options,t;b=0;for(c=i.length;b<c;++b){t=i[b];t.selected=a.inArray(h.val(t),y)}if(!y.length)m.selectedIndex=-1}else if(j(m))m.value=n})},text:function(w,n){if(n===x){var e=a.get(w);if(j(e))return e[z]||"";else if(h._nodeTypeIs(e,3))return e.nodeValue}else a.each(a.query(w),function(f){if(j(f))f[z]=n;else if(h._nodeTypeIs(f,3))f.nodeValue=n})}})});
KISSY.add("dom-style",function(a,x){function p(f,d){var b=a.get(f),c=d===l?b.offsetWidth:b.offsetHeight;a.each(d===l?["Left","Right"]:["Top","Bottom"],function(m){c-=parseFloat(q._getComputedStyle(b,"padding"+m))||0;c-=parseFloat(q._getComputedStyle(b,"border"+m+"Width"))||0});return c}function g(f,d,b){var c=b;if(b===v&&o.test(d)){c=0;if(q.css(f,"position")==="absolute"){b=f[d==="left"?"offsetLeft":"offsetTop"];if(z.ie===8||z.opera)b-=k(q.css(f.offsetParent,"border-"+d+"-width"))||0;c=b-(k(q.css(f,
"margin-"+d))||0)}}return c}var q=a.DOM,z=a.UA,h=document,j=h.documentElement,l="width",v="auto",k=parseInt,o=/^(?:left|top)/,r=/^(?:width|height|top|left|right|bottom|margin|padding)/i,s=/-([a-z])/ig,w=function(f,d){return d.toUpperCase()},n={},e={};a.mix(q,{_CUSTOM_STYLES:n,_getComputedStyle:function(f,d){var b="",c=f.ownerDocument;if(f.style)b=c.defaultView.getComputedStyle(f,null)[d];return b},css:function(f,d,b){if(a.isPlainObject(d))for(var c in d)q.css(f,c,d[c]);else{if(d.indexOf("-")>0)d=
d.replace(s,w);d=n[d]||d;if(b===x){f=a.get(f);c="";if(f&&f.style){c=d.get?d.get(f):f.style[d];if(c===""&&!d.get)c=g(f,d,q._getComputedStyle(f,d))}return c===x?"":c}else{if(b===null||b==="")b="";else if(!isNaN(new Number(b))&&r.test(d))b+="px";(d===l||d==="height")&&parseFloat(b)<0||a.each(a.query(f),function(m){if(m&&m.style){d.set?d.set(m,b):m.style[d]=b;if(b==="")m.style.cssText||m.removeAttribute("style")}})}}},width:function(f,d){if(d===x)return p(f,l);else q.css(f,l,d)},height:function(f,d){if(d===
x)return p(f,"height");else q.css(f,"height",d)},show:function(f){a.query(f).each(function(d){if(d){d.style.display=q.data(d,"display")||"";if(q.css(d,"display")==="none"){var b=d.tagName,c=e[b],m;if(!c){m=h.createElement(b);h.body.appendChild(m);c=q.css(m,"display");q.remove(m);e[b]=c}q.data(d,"display",c);d.style.display=c}}})},hide:function(f){a.query(f).each(function(d){if(d){var b=d.style,c=b.display;if(c!=="none"){c&&q.data(d,"display",c);b.display="none"}}})},toggle:function(f){a.query(f).each(function(d){if(d)d.style.display===
"none"?q.show(d):q.hide(d)})},addStyleSheet:function(f,d){var b;if(d&&(d=d.replace("#","")))b=a.get("#"+d);if(!b){b=q.create("<style>",{id:d});a.get("head").appendChild(b);if(b.styleSheet)b.styleSheet.cssText=f;else b.appendChild(h.createTextNode(f))}}});if(j.style.cssFloat!==x)n["float"]="cssFloat";else if(j.style.styleFloat!==x)n["float"]="styleFloat"});
KISSY.add("dom-style-ie",function(a,x){if(a.UA.ie){var p=a.DOM,g=document,q=g.documentElement,z=p._CUSTOM_STYLES,h=/^-?\d+(?:px)?$/i,j=/^-?\d/,l=/^(?:width|height)$/;try{if(q.style.opacity===x&&q.filters)z.opacity={get:function(k){var o=100;try{o=k.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(r){try{o=k.filters("alpha").opacity}catch(s){}}return o/100+""},set:function(k,o){var r=k.style,s=(k.currentStyle||0).filter||"";r.zoom=1;if(s)if(s=s.replace(/alpha\(opacity=.+\)/ig,""))s+=", ";
r.filter=s+"alpha(opacity="+o*100+")"}}}catch(v){}if(!(g.defaultView||{}).getComputedStyle&&q.currentStyle)p._getComputedStyle=function(k,o){var r=k.style,s=k.currentStyle[o];if(l.test(o))s=p[o](k)+"px";else if(!h.test(s)&&j.test(s)){var w=r.left,n=k.runtimeStyle.left;k.runtimeStyle.left=k.currentStyle.left;r.left=o==="fontSize"?"1em":s||0;s=r.pixelLeft+"px";r.left=w;k.runtimeStyle.left=n}return s}}});
KISSY.add("dom-offset",function(a,x){function p(b){var c=0,m=0,y=v(b[s]);if(b[d]){b=b[d]();c=b[w];m=b[n];if(q.mobile!=="apple"){c+=g[e](y);m+=g[f](y)}}return{left:c,top:m}}var g=a.DOM,q=a.UA,z=window,h=document,j=g._isElementNode,l=g._nodeTypeIs,v=g._getWin,k=h.compatMode==="CSS1Compat",o=Math.max,r=parseInt,s="ownerDocument",w="left",n="top",e="scrollLeft",f="scrollTop",d="getBoundingClientRect";a.mix(g,{offset:function(b,c){if(!(b=a.get(b))||!b[s])return null;if(c===x)return p(b);var m=b;if(g.css(m,
"position")==="static")m.style.position="relative";var y=p(m),i={},t,u;for(u in c){t=r(g.css(m,u),10)||0;i[u]=t+c[u]-y[u]}g.css(m,i)},scrollIntoView:function(b,c,m,y){if((b=a.get(b))&&b[s]){y=y===x?true:!!y;m=m===x?true:!!m;if(!c||c===z)return b.scrollIntoView(m);c=a.get(c);if(l(c,9))c=v(c);var i=c&&"scrollTo"in c&&c.document,t=g.offset(b),u=i?{left:g.scrollLeft(c),top:g.scrollTop(c)}:g.offset(c),A={left:t[w]-u[w],top:t[n]-u[n]};t=i?g.viewportHeight(c):c.clientHeight;u=i?g.viewportWidth(c):c.clientWidth;
var C=g[e](c),F=g[f](c),B=C+u,D=F+t,H=b.offsetHeight;b=b.offsetWidth;var G=A.left+C-(r(g.css(c,"borderLeftWidth"))||0);A=A.top+F-(r(g.css(c,"borderTopWidth"))||0);var I=G+b,K=A+H,E,J;if(H>t||A<F||m)E=A;else if(K>D)E=K-t;if(y)if(b>u||G<C||m)J=G;else if(I>B)J=I-u;if(i){if(E!==x||J!==x)c.scrollTo(J,E)}else{if(E!==x)c[f]=E;if(J!==x)c[e]=J}}}});a.each(["Left","Top"],function(b,c){var m="scroll"+b;g[m]=function(y){var i=0,t=v(y),u;if(t&&(u=t.document))i=t[c?"pageYOffset":"pageXOffset"]||u.documentElement[m]||
u.body[m];else if(j(y=a.get(y)))i=y[m];return i}});a.each(["Width","Height"],function(b){g["doc"+b]=function(c){c=c||h;return o(k?c.documentElement["scroll"+b]:c.body["scroll"+b],g["viewport"+b](c))};g["viewport"+b]=function(c){var m="inner"+b;c=v(c);var y=c.document;return m in c?c[m]:k?y.documentElement["client"+b]:y.body["client"+b]}})});
KISSY.add("dom-traversal",function(a,x){function p(h,j,l,v){if(!(h=a.get(h)))return null;if(j===x)j=1;var k=null,o,r;if(a.isNumber(j)&&j>=0){if(j===0)return h;o=0;r=j;j=function(){return++o===r}}for(;h=h[l];)if(z(h)&&(!j||q.test(h,j))&&(!v||v(h))){k=h;break}return k}function g(h,j,l){var v=[];var k=h=a.get(h);if(h&&l)k=h.parentNode;if(k){l=0;for(k=k.firstChild;k;k=k.nextSibling)if(z(k)&&k!==h&&(!j||q.test(k,j)))v[l++]=k}return v}var q=a.DOM,z=q._isElementNode;a.mix(q,{parent:function(h,j){return p(h,
j,"parentNode",function(l){return l.nodeType!=11})},next:function(h,j){return p(h,j,"nextSibling")},prev:function(h,j){return p(h,j,"previousSibling")},siblings:function(h,j){return g(h,j,true)},children:function(h,j){return g(h,j)},contains:function(h,j){var l=false;if((h=a.get(h))&&(j=a.get(j)))if(h.contains){if(j.nodeType===3){j=j.parentNode;if(j===h)return true}if(j)return h.contains(j)}else if(h.compareDocumentPosition)return!!(h.compareDocumentPosition(j)&16);else for(;!l&&(j=j.parentNode);)l=
j==h;return l}})});
KISSY.add("dom-create",function(a,x){function p(i){var t=i.cloneNode(true);if(j.ie<8)t.innerHTML=i.innerHTML;return t}function g(i,t,u,A){if(u){var C=a.guid("ks-tmp-"),F=RegExp(w);t+='<span id="'+C+'"></span>';a.available(C,function(){var B=a.get("head"),D,H,G,I,K,E;for(F.lastIndex=0;D=F.exec(t);)if((G=(H=D[1])?H.match(e):false)&&G[2]){D=z.createElement("script");D.src=G[2];if((I=H.match(f))&&I[2])D.charset=I[2];D.async=true;B.appendChild(D)}else if((E=D[2])&&E.length>0)a.globalEval(E);(K=z.getElementById(C))&&
h.remove(K);a.isFunction(A)&&A()});q(i,t)}else{q(i,t);a.isFunction(A)&&A()}}function q(i,t){t=(t+"").replace(w,"");try{i.innerHTML=t}catch(u){for(;i.firstChild;)i.removeChild(i.firstChild);t&&i.appendChild(h.create(t))}}var z=document,h=a.DOM,j=a.UA,l=j.ie,v=h._nodeTypeIs,k=h._isElementNode,o=h._isKSNode,r=z.createElement("div"),s=/<(\w+)/,w=/<script([^>]*)>([^<]*(?:(?!<\/script>)<[^<]*)*)<\/script>/ig,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,e=/\ssrc=(['"])(.*?)\1/i,f=/\scharset=(['"])(.*?)\1/i;a.mix(h,{create:function(i,
t,u){if(v(i,1)||v(i,3))return p(i);if(o(i))return p(i[0]);if(!(i=a.trim(i)))return null;var A=null;A=h._creators;var C,F="div",B;if(C=n.exec(i))A=(u||z).createElement(C[1]);else{if((C=s.exec(i))&&(B=C[1])&&a.isFunction(A[B=B.toLowerCase()]))F=B;i=A[F](i,u).childNodes;if(i.length===1)u=i[0].parentNode.removeChild(i[0]);else{i=i;B=u||z;u=null;if(i&&(i.push||i.item)&&i[0]){B=B||i[0].ownerDocument;u=B.createDocumentFragment();if(i.item)i=a.makeArray(i);B=0;for(A=i.length;B<A;B++)u.appendChild(i[B])}u=
u}A=u}u=A;k(u)&&a.isPlainObject(t)&&h.attr(u,t,true);return u},_creators:{div:function(i,t){var u=t?t.createElement("div"):r;u.innerHTML=i;return u}},html:function(i,t,u,A){if(t===x){i=a.get(i);if(k(i))return i.innerHTML}else a.each(a.query(i),function(C){k(C)&&g(C,t,u,A)})},remove:function(i){a.each(a.query(i),function(t){k(t)&&t.parentNode&&t.parentNode.removeChild(t)})}});if(l||j.gecko||j.webkit){var d=h._creators,b=h.create,c=/(?:\/(?:thead|tfoot|caption|col|colgroup)>)+\s*<tbody/,m={option:"select",
td:"tr",tr:"tbody",tbody:"table",col:"colgroup",legend:"fieldset"},y;for(y in m)(function(i){d[y]=function(t,u){return b("<"+i+">"+t+"</"+i+">",null,u)}})(m[y]);if(l){d.script=function(i,t){var u=t?t.createElement("div"):r;u.innerHTML="-"+i;u.removeChild(u.firstChild);return u};if(l<8)d.tbody=function(i,t){var u=b("<table>"+i+"</table>",null,t),A=u.children.tags("tbody")[0];u.children.length>1&&A&&!c.test(i)&&A.parentNode.removeChild(A);return u}}a.mix(d,{optgroup:d.option,th:d.td,thead:d.tbody,tfoot:d.tbody,
caption:d.tbody,colgroup:d.tbody})}});
KISSY.add("dom-insertion",function(a){var x=a.DOM;a.mix(x,{insertBefore:function(p,g){if((p=a.get(p))&&(g=a.get(g))&&g.parentNode)g.parentNode.insertBefore(p,g);return p},insertAfter:function(p,g){if((p=a.get(p))&&(g=a.get(g))&&g.parentNode)g.nextSibling?g.parentNode.insertBefore(p,g.nextSibling):g.parentNode.appendChild(p);return p},append:function(p,g){if((p=a.get(p))&&(g=a.get(g)))g.appendChild&&g.appendChild(p)},prepend:function(p,g){if((p=a.get(p))&&(g=a.get(g)))g.firstChild?x.insertBefore(p,
g.firstChild):g.appendChild(p)}})});
