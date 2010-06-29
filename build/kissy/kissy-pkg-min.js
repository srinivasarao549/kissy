/*
Copyright 2010, KISSY UI Library v1.0.8
MIT Licensed
build: 748 Jun 29 23:18
*/
(function(h,j,f){if(h[j]===f)h[j]={};j=h[j];var m=h.document,o=function(b,c,g,i){if(!c||!b)return b;if(g===f)g=true;var n,l,r;if(i&&(r=i.length))for(n=0;n<r;n++){l=i[n];if(l in c)if(g||!(l in b))b[l]=c[l]}else for(l in c)if(g||!(l in b))b[l]=c[l];return b},t=false,s=[],w=false;o(j,{version:"1.0.8",_init:function(){this.Env={mods:{}}},add:function(b,c){this.Env.mods[b]={name:b,fn:c};c(this);return this},ready:function(b){w||this._bindReady();t?b.call(h,this):s.push(b);return this},_bindReady:function(){var b=
this,c=m.documentElement.doScroll,g=c?"onreadystatechange":"DOMContentLoaded",i=function(){b._fireReady()};w=true;if(m.readyState==="complete")return i();if(m.addEventListener){var n=function(){m.removeEventListener(g,n,false);i()};m.addEventListener(g,n,false)}else{var l=function(){if(m.readyState==="complete"){m.detachEvent(g,l);i()}};m.attachEvent(g,l);h.attachEvent("onload",i);if(h==h.top){var r=function(){try{c("left");i()}catch(x){setTimeout(r,1)}};r()}}},_fireReady:function(){if(!t){t=true;
if(s){for(var b,c=0;b=s[c++];)b.call(h,this);s=null}}},mix:o,merge:function(){var b={},c,g=arguments.length;for(c=0;c<g;++c)o(b,arguments[c]);return b},augment:function(){var b=arguments,c=b.length-2,g=b[0],i=b[c],n=b[c+1],l=1;if(!j.isArray(n)){i=n;n=f;c++}if(!j.isBoolean(i)){i=f;c++}for(;l<c;l++)o(g.prototype,b[l].prototype||b[l],i,n);return g},extend:function(b,c,g,i){if(!c||!b)return b;var n=Object.prototype,l=c.prototype,r=function(x){function a(){}a.prototype=x;return new a}(l);b.prototype=r;
r.constructor=b;b.superclass=l;if(c!==Object&&l.constructor===n.constructor)l.constructor=c;g&&o(r,g);i&&o(b,i);return b},namespace:function(){var b=arguments.length,c=null,g,i,n;for(g=0;g<b;++g){n=(""+arguments[g]).split(".");c=this;for(i=h[n[0]]===c?1:0;i<n.length;++i)c=c[n[i]]=c[n[i]]||{}}return c},app:function(b,c){var g=h[b]||{};o(g,this,true,["_init","add","namespace"]);g._init();return o(h[b]=g,typeof c==="function"?c():c)},log:function(b,c,g){if(this.Config.debug){if(g)b=g+": "+b;if(h.console!==
f&&console.log)console[c&&console[c]?c:"log"](b)}return this},error:function(b){if(this.Config.debug)throw b;}});j._init();j.Config={debug:""}})(window,"KISSY");
KISSY.add("kissy-lang",function(h,j){function f(a){var d=typeof a;return a===null||d!=="object"&&d!=="function"}var m=window,o=document,t=location,s=Array.prototype,w=s.indexOf,b=s.filter,c=String.prototype.trim,g=Object.prototype.toString,i=encodeURIComponent,n=decodeURIComponent,l=/^\s+|\s+$/g,r=/^(\w+)\[\]$/,x=/\S/;h.mix(h,{isUndefined:function(a){return a===j},isBoolean:function(a){return typeof a==="boolean"},isString:function(a){return typeof a==="string"},isNumber:function(a){return typeof a===
"number"&&isFinite(a)},isPlainObject:function(a){return a&&g.call(a)==="[object Object]"&&!a.nodeType&&!a.setInterval},isEmptyObject:function(a){for(var d in a)return false;return true},isFunction:function(a){return g.call(a)==="[object Function]"},isArray:function(a){return g.call(a)==="[object Array]"},trim:c?function(a){return a==j?"":c.call(a)}:function(a){return a==j?"":a.toString().replace(l,"")},each:function(a,d,e){for(var k=a&&a.length||0,p=0;p<k;++p)d.call(e||m,a[p],p,a)},indexOf:w?function(a,
d){return w.call(d,a)}:function(a,d){for(var e=0,k=d.length;e<k;++e)if(d[e]===a)return e;return-1},inArray:function(a,d){return h.indexOf(a,d)>-1},makeArray:function(a){if(a===null||a===j)return[];if(h.isArray(a))return a;if(typeof a.length!=="number"||typeof a==="string"||h.isFunction(a))return[a];if(a.item&&h.UA.ie){for(var d=[],e=0,k=a.length;e<k;++e)d[e]=a[e];return d}return s.slice.call(a)},filter:b?function(a,d,e){return b.call(a,d,e)}:function(a,d,e){var k=[];h.each(a,function(p,q,u){d.call(e,
p,q,u)&&k.push(p)});return k},param:function(a){if(!h.isPlainObject(a))return"";var d=[],e,k;for(e in a){k=a[e];e=i(e);if(f(k))d.push(e,"=",i(k+""),"&");else if(h.isArray(k)&&k.length)for(var p=0,q=k.length;p<q;++p)f(k[p])&&d.push(e,"[]=",i(k[p]+""),"&")}d.pop();return d.join("")},unparam:function(a,d){if(typeof a!=="string"||(a=h.trim(a)).length===0)return{};var e={};a=a.split(d||"&");for(var k,p,q,u=0,v=a.length;u<v;++u){d=a[u].split("=");k=n(d[0]);try{p=n(d[1]||"")}catch(y){p=d[1]||""}if((q=k.match(r))&&
q[1]){e[q[1]]=e[q[1]]||[];e[q[1]].push(p)}else e[k]=p}return e},later:function(a,d,e,k,p){d=d||0;k=k||{};var q=a,u=h.makeArray(p),v;if(typeof a==="string")q=k[a];q||h.error("method undefined");a=function(){q.apply(k,u)};v=e?setInterval(a,d):setTimeout(a,d);return{id:v,interval:e,cancel:function(){this.interval?clearInterval(v):clearTimeout(v)}}},now:function(){return(new Date).getTime()},globalEval:function(a){if(a&&x.test(a)){var d=o.getElementsByTagName("head")[0]||o.documentElement,e=o.createElement("script");
e.text=a;d.insertBefore(e,d.firstChild);d.removeChild(e)}}});if(t&&t.search&&t.search.indexOf("ks-debug")!==-1)h.Config.debug=true});
KISSY.add("kissy-ua",function(h){var j=navigator.userAgent,f,m={webkit:0,chrome:0,safari:0,gecko:0,firefox:0,ie:0,opera:0,mobile:""},o=function(t){var s=0;return parseFloat(t.replace(/\./g,function(){return s++===0?".":""}))};if((f=j.match(/AppleWebKit\/([\d.]*)/))&&f[1]){m.webkit=o(f[1]);if((f=j.match(/Chrome\/([\d.]*)/))&&f[1])m.chrome=o(f[1]);else if((f=j.match(/\/([\d.]*) Safari/))&&f[1])m.safari=o(f[1]);if(/ Mobile\//.test(j))m.mobile="Apple";else if(f=j.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))m.mobile=
f[0]}else if((f=j.match(/Opera\/.* Version\/([\d.]*)/))&&f[1]){m.opera=o(f[1]);if(j.match(/Opera Mini[^;]*/))m.mobile=f[0]}else if((f=j.match(/MSIE\s([^;]*)/))&&f[1])m.ie=o(f[1]);else if(f=j.match(/Gecko/)){m.gecko=1;if((f=j.match(/rv:([\d.]*)/))&&f[1])m.gecko=o(f[1]);if((f=j.match(/Firefox\/([\d.]*)/))&&f[1])m.firefox=o(f[1])}h.UA=m});
