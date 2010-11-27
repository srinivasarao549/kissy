/*
Copyright 2010, KISSY UI Library v1.1.6dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("datalazyload",function(c,r){function i(a,b){if(!(this instanceof i))return new i(a,b);if(b===r){b=a;a=[m]}c.isArray(a)||(a=[c.get(a)||m]);this.containers=a;this.config=c.merge(s,b);this.callbacks={els:[],fns:[]};this._init()}var f=c.DOM,k=c.Event,l=window,m=document,n="scroll",o="resize",s={mod:"manual",diff:"default",placeholder:"none"};c.augment(i,{_init:function(){this.threshold=this._getThreshold();this._filterItems();this._initLoadEvent()},_filterItems:function(){var a=this.containers,
b,d,e,h=[],g=[];b=0;for(d=a.length;b<d;++b){e=c.query("img",a[b]);h=h.concat(c.filter(e,this._filterImg,this));e=c.query("textarea",a[b]);g=g.concat(c.filter(e,this._filterArea,this))}this.images=h;this.areaes=g},_filterImg:function(a){var b=a.getAttribute("data-ks-lazyload"),d=this.threshold,e=this.config.placeholder;if(this.config.mod==="manual"){if(b){if(e!=="none")a.src=e;return true}}else if(f.offset(a).top>d&&!b){f.attr(a,"data-ks-lazyload",a.src);if(e!=="none")a.src=e;else a.removeAttribute("src");
return true}},_filterArea:function(a){return f.hasClass(a,"ks-datalazyload")},_initLoadEvent:function(){function a(){d||(d=c.later(function(){b();d=null},100))}function b(){e._loadItems();if(e._getItemsLength()===0){k.remove(l,n,a);k.remove(l,o,a)}}var d,e=this;k.on(l,n,a);k.on(l,o,function(){e.threshold=e._getThreshold();a()});e._getItemsLength()&&c.ready(function(){b()})},_loadItems:function(){this._loadImgs();this._loadAreas();this._fireCallbacks()},_loadImgs:function(){this.images=c.filter(this.images,
this._loadImg,this)},_loadImg:function(a){var b=this.threshold+f.scrollTop();if(f.offset(a).top<=b)this._loadImgSrc(a);else return true},_loadImgSrc:function(a,b){b=b||"data-ks-lazyload";var d=a.getAttribute(b);if(d&&a.src!=d){a.src=d;a.removeAttribute(b)}},_loadAreas:function(){this.areaes=c.filter(this.areaes,this._loadArea,this)},_loadArea:function(a){var b=f.css(a,"display")==="none";if(f.offset(b?a.parentNode:a).top<=this.threshold+f.scrollTop())this._loadAreaData(a.parentNode,a);else return true},
_loadAreaData:function(a,b){b.style.display="none";b.className="";var d=f.create("<div>");a.insertBefore(d,b);f.html(d,b.value,true)},_fireCallbacks:function(){var a=this.callbacks,b=a.els,d=a.fns,e=this.threshold+f.scrollTop(),h,g,j,p=[],q=[];for(h=0;(g=b[h])&&(j=d[h++]);)if(f.offset(g).top<=e)j.call(g);else{p.push(g);q.push(j)}a.els=p;a.fns=q},addCallback:function(a,b){var d=this.callbacks;if((a=c.get(a))&&c.isFunction(b)){d.els.push(a);d.fns.push(b)}},_getThreshold:function(){var a=this.config.diff,
b=f.viewportHeight();return a==="default"?2*b:b+ +a},_getItemsLength:function(){return this.images.length+this.areaes.length+this.callbacks.els.length},loadCustomLazyData:function(a,b){var d=this,e,h;c.isArray(a)||(a=[c.get(a)]);c.each(a,function(g){switch(b){case "img-src":h=g.nodeName==="IMG"?[g]:c.query("img",g);c.each(h,function(j){d._loadImgSrc(j,"data-ks-lazyload-custom")});break;default:(e=c.get("textarea",g))&&f.hasClass(e,"ks-datalazyload-custom")&&d._loadAreaData(g,e)}})}});c.mix(i,i.prototype,
true,["loadCustomLazyData","_loadImgSrc","_loadAreaData"]);c.DataLazyload=i},{requires:["core"]});
