(function(root){

	/*! dom-to-image 10-06-2017 */
	!function(a){"use strict";function b(a,b){function c(a){return b.bgcolor&&(a.style.backgroundColor=b.bgcolor),b.width&&(a.style.width=b.width+"px"),b.height&&(a.style.height=b.height+"px"),b.style&&Object.keys(b.style).forEach(function(c){a.style[c]=b.style[c]}),a}return b=b||{},g(b),Promise.resolve(a).then(function(a){return i(a,b.filter,!0)}).then(j).then(k).then(c).then(function(c){return l(c,b.width||q.width(a),b.height||q.height(a))})}function c(a,b){return h(a,b||{}).then(function(b){return b.getContext("2d").getImageData(0,0,q.width(a),q.height(a)).data})}function d(a,b){return h(a,b||{}).then(function(a){return a.toDataURL()})}function e(a,b){return b=b||{},h(a,b).then(function(a){return a.toDataURL("image/jpeg",b.quality||1)})}function f(a,b){return h(a,b||{}).then(q.canvasToBlob)}function g(a){"undefined"==typeof a.imagePlaceholder?v.impl.options.imagePlaceholder=u.imagePlaceholder:v.impl.options.imagePlaceholder=a.imagePlaceholder,"undefined"==typeof a.cacheBust?v.impl.options.cacheBust=u.cacheBust:v.impl.options.cacheBust=a.cacheBust}function h(a,c){function d(a){var b=document.createElement("canvas");if(b.width=c.width||q.width(a),b.height=c.height||q.height(a),c.bgcolor){var d=b.getContext("2d");d.fillStyle=c.bgcolor,d.fillRect(0,0,b.width,b.height)}return b}return b(a,c).then(q.makeImage).then(q.delay(100)).then(function(b){var c=d(a);return c.getContext("2d").drawImage(b,0,0),c})}function i(a,b,c){function d(a){return a instanceof HTMLCanvasElement?q.makeImage(a.toDataURL()):a.cloneNode(!1)}function e(a,b,c){function d(a,b,c){var d=Promise.resolve();return b.forEach(function(b){d=d.then(function(){return i(b,c)}).then(function(b){b&&a.appendChild(b)})}),d}var e=a.childNodes;return 0===e.length?Promise.resolve(b):d(b,q.asArray(e),c).then(function(){return b})}function f(a,b){function c(){function c(a,b){function c(a,b){q.asArray(a).forEach(function(c){b.setProperty(c,a.getPropertyValue(c),a.getPropertyPriority(c))})}a.cssText?b.cssText=a.cssText:c(a,b)}c(window.getComputedStyle(a),b.style)}function d(){function c(c){function d(a,b,c){function d(a){var b=a.getPropertyValue("content");return a.cssText+" content: "+b+";"}function e(a){function b(b){return b+": "+a.getPropertyValue(b)+(a.getPropertyPriority(b)?" !important":"")}return q.asArray(a).map(b).join("; ")+";"}var f="."+a+":"+b,g=c.cssText?d(c):e(c);return document.createTextNode(f+"{"+g+"}")}var e=window.getComputedStyle(a,c),f=e.getPropertyValue("content");if(""!==f&&"none"!==f){var g=q.uid();b.className=b.className+" "+g;var h=document.createElement("style");h.appendChild(d(g,c,e)),b.appendChild(h)}}[":before",":after"].forEach(function(a){c(a)})}function e(){a instanceof HTMLTextAreaElement&&(b.innerHTML=a.value),a instanceof HTMLInputElement&&b.setAttribute("value",a.value)}function f(){b instanceof SVGElement&&(b.setAttribute("xmlns","http://www.w3.org/2000/svg"),b instanceof SVGRectElement&&["width","height"].forEach(function(a){var c=b.getAttribute(a);c&&b.style.setProperty(a,c)}))}return b instanceof Element?Promise.resolve().then(c).then(d).then(e).then(f).then(function(){return b}):b}return c||!b||b(a)?Promise.resolve(a).then(d).then(function(c){return e(a,c,b)}).then(function(b){return f(a,b)}):Promise.resolve()}function j(a){return s.resolveAll().then(function(b){var c=document.createElement("style");return a.appendChild(c),c.appendChild(document.createTextNode(b)),a})}function k(a){return t.inlineAll(a).then(function(){return a})}function l(a,b,c){return Promise.resolve(a).then(function(a){return a.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),(new XMLSerializer).serializeToString(a)}).then(q.escapeXhtml).then(function(a){return'<foreignObject x="0" y="0" width="100%" height="100%">'+a+"</foreignObject>"}).then(function(a){return'<svg xmlns="http://www.w3.org/2000/svg" width="'+b+'" height="'+c+'">'+a+"</svg>"}).then(function(a){return"data:image/svg+xml;charset=utf-8,"+a})}function m(){function a(){var a="application/font-woff",b="image/jpeg";return{woff:a,woff2:a,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:b,jpeg:b,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml"}}function b(a){var b=/\.([^\.\/]*?)$/g.exec(a);return b?b[1]:""}function c(c){var d=b(c).toLowerCase();return a()[d]||""}function d(a){return a.search(/^(data:)/)!==-1}function e(a){return new Promise(function(b){for(var c=window.atob(a.toDataURL().split(",")[1]),d=c.length,e=new Uint8Array(d),f=0;f<d;f++)e[f]=c.charCodeAt(f);b(new Blob([e],{type:"image/png"}))})}function f(a){return a.toBlob?new Promise(function(b){a.toBlob(b)}):e(a)}function g(a,b){var c=document.implementation.createHTMLDocument(),d=c.createElement("base");c.head.appendChild(d);var e=c.createElement("a");return c.body.appendChild(e),d.href=b,e.href=a,e.href}function h(){var a=0;return function(){function b(){return("0000"+(Math.random()*Math.pow(36,4)<<0).toString(36)).slice(-4)}return"u"+b()+a++}}function i(a){return new Promise(function(b,c){var d=new Image;d.onload=function(){b(d)},d.onerror=c,d.src=a})}function j(a){var b=3e4;return v.impl.options.cacheBust&&(a+=(/\?/.test(a)?"&":"?")+(new Date).getTime()),new Promise(function(c){function d(){if(4===g.readyState){if(200!==g.status)return void(h?c(h):f("cannot fetch resource: "+a+", status: "+g.status));var b=new FileReader;b.onloadend=function(){var a=b.result.split(/,/)[1];c(a)},b.readAsDataURL(g.response)}}function e(){h?c(h):f("timeout of "+b+"ms occured while fetching resource: "+a)}function f(a){console.error(a),c("")}var g=new XMLHttpRequest;g.onreadystatechange=d,g.ontimeout=e,g.responseType="blob",g.timeout=b,g.open("GET",a,!0),g.send();var h;if(v.impl.options.imagePlaceholder){var i=v.impl.options.imagePlaceholder.split(/,/);i&&i[1]&&(h=i[1])}})}function k(a,b){return"data:"+b+";base64,"+a}function l(a){return a.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1")}function m(a){return function(b){return new Promise(function(c){setTimeout(function(){c(b)},a)})}}function n(a){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}function o(a){return a.replace(/#/g,"%23").replace(/\n/g,"%0A")}function p(a){var b=r(a,"border-left-width"),c=r(a,"border-right-width");return a.scrollWidth+b+c}function q(a){var b=r(a,"border-top-width"),c=r(a,"border-bottom-width");return a.scrollHeight+b+c}function r(a,b){var c=window.getComputedStyle(a).getPropertyValue(b);return parseFloat(c.replace("px",""))}return{escape:l,parseExtension:b,mimeType:c,dataAsUrl:k,isDataUrl:d,canvasToBlob:f,resolveUrl:g,getAndEncode:j,uid:h(),delay:m,asArray:n,escapeXhtml:o,makeImage:i,width:p,height:q}}function n(){function a(a){return a.search(e)!==-1}function b(a){for(var b,c=[];null!==(b=e.exec(a));)c.push(b[1]);return c.filter(function(a){return!q.isDataUrl(a)})}function c(a,b,c,d){function e(a){return new RegExp("(url\\(['\"]?)("+q.escape(a)+")(['\"]?\\))","g")}return Promise.resolve(b).then(function(a){return c?q.resolveUrl(a,c):a}).then(d||q.getAndEncode).then(function(a){return q.dataAsUrl(a,q.mimeType(b))}).then(function(c){return a.replace(e(b),"$1"+c+"$3")})}function d(d,e,f){function g(){return!a(d)}return g()?Promise.resolve(d):Promise.resolve(d).then(b).then(function(a){var b=Promise.resolve(d);return a.forEach(function(a){b=b.then(function(b){return c(b,a,e,f)})}),b})}var e=/url\(['"]?([^'"]+?)['"]?\)/g;return{inlineAll:d,shouldProcess:a,impl:{readUrls:b,inline:c}}}function o(){function a(){return b(document).then(function(a){return Promise.all(a.map(function(a){return a.resolve()}))}).then(function(a){return a.join("\n")})}function b(){function a(a){return a.filter(function(a){return a.type===CSSRule.FONT_FACE_RULE}).filter(function(a){return r.shouldProcess(a.style.getPropertyValue("src"))})}function b(a){var b=[];return a.forEach(function(a){try{q.asArray(a.cssRules||[]).forEach(b.push.bind(b))}catch(c){console.log("Error while reading CSS rules from "+a.href,c.toString())}}),b}function c(a){return{resolve:function(){var b=(a.parentStyleSheet||{}).href;return r.inlineAll(a.cssText,b)},src:function(){return a.style.getPropertyValue("src")}}}return Promise.resolve(q.asArray(document.styleSheets)).then(b).then(a).then(function(a){return a.map(c)})}return{resolveAll:a,impl:{readAll:b}}}function p(){function a(a){function b(b){return q.isDataUrl(a.src)?Promise.resolve():Promise.resolve(a.src).then(b||q.getAndEncode).then(function(b){return q.dataAsUrl(b,q.mimeType(a.src))}).then(function(b){return new Promise(function(c,d){a.onload=c,a.onerror=d,a.src=b})})}return{inline:b}}function b(c){function d(a){var b=a.style.getPropertyValue("background");return b?r.inlineAll(b).then(function(b){a.style.setProperty("background",b,a.style.getPropertyPriority("background"))}).then(function(){return a}):Promise.resolve(a)}return c instanceof Element?d(c).then(function(){return c instanceof HTMLImageElement?a(c).inline():Promise.all(q.asArray(c.childNodes).map(function(a){return b(a)}))}):Promise.resolve(c)}return{inlineAll:b,impl:{newImage:a}}}var q=m(),r=n(),s=o(),t=p(),u={imagePlaceholder:void 0,cacheBust:!1},v={toSvg:b,toPng:d,toJpeg:e,toBlob:f,toPixelData:c,impl:{fontFaces:s,images:t,util:q,inliner:r,options:{}}};"undefined"!=typeof module?module.exports=v:a.domtoimage=v}(this);

	var OI = root.OI || {};
	if(!OI.ready){
		OI.ready = function(fn){
			// Version 1.1
			if(document.readyState != 'loading') fn();
			else document.addEventListener('DOMContentLoaded', fn);
		};
	}
	
	if(!OI.logger){
		// Version 1.4
		OI.logger = function(title,attr){
			if(!attr) attr = {};
			title = title||"OI Logger";
			var ms = {};
			this.logging = (location.search.indexOf('debug=true') >= 0);
			if(console && typeof console.log==="function"){
				this.log = function(){ if(this.logging){ console.log.apply(null,getParam(arguments)); updatePage('log',arguments); } };
				this.info = function(){ console.info.apply(null,getParam(arguments)); updatePage('info',arguments); };
				this.warn = function(){ console.warn.apply(null,getParam(arguments)); updatePage('warning',arguments); };
				this.error = function(){ console.error.apply(null,getParam(arguments)); updatePage('error',arguments); };
			}
			this.remove = function(id){
				var el = attr.el.querySelector('#'+id);
				if(ms[id]) clearTimeout(ms[id]);
				el.remove();
			};
			function updatePage(){
				if(attr.el){
					var cls = arguments[0];
					var txt = Array.prototype.shift.apply(arguments[1]);
					var opt = arguments[1]||{};
					if(opt.length > 0) opt = opt[opt.length-1];
					if(attr.visible.includes(cls)) opt.visible = true;
					if(opt.visible){
						var el = document.createElement('div');
						el.classList.add('message',cls);
						el.innerHTML = txt.replace(/\%c/g,"");
						el.style.display = (txt ? 'block' : 'none');
						attr.el.prepend(el);
						id = "default";
						if(opt.id){
							id = opt.id;
							el.setAttribute('id',opt.id);
						}
						ms[id] = setTimeout(function(){ el.remove(); },opt.fade||5000);
					}
				}
			}
			function getParam(){
				var a = Array.prototype.slice.call(arguments[0], 0);
				var str = (typeof a[0]==="string" ? a[0] : "");
				// Build basic result
				var ext = ['%c'+title+'%c: '+str.replace(/<[^\>]*>/g,""),'font-weight:bold;',''];
				var n = (str ? 1 : 0);
				// If there are extra parameters passed we add them
				return (a.length > n) ? ext.concat(a.splice(n)) : ext;
			}
			return this;
		};
	}

	function HexViewer(el,attr){

		this.name = "HexViewer";
		this.version = "1.2";
		this.attr = attr;
		this.el = el;
		this.id = el.getAttribute('id');
		this.colours = new Colours();
		this.saveable = (typeof Blob==="function");

		var _obj = this;
		var msg = new OI.logger(this.name+' v'+this.version,{el:document.getElementById('messages'),'visible':['info','warning','error']});
		msg.log("Loading");

		var scales = {
			'Cividis': '#00224e 0%, #123570 11.1%, #3b496c 22.222%, #575d6d 33.333%, #707173 44.444%, #8a8678 55.555%, #a59c74 66.666%, #c3b369 77.777%, #e1cc55 88.888%, #fee838 100%',
			'EPC': '#ef1c3a 0%, #ef1c3a 20.5%, #f78221 20.5%, #f78221 38.5%, #f9ac64 38.5%, #f9ac64 54.5%, #ffcc00 54.5%, #ffcc00 68.5%, #8cc63f 68.5%, #8cc63f 80.5%, #1bb35b 80.5%, #1bb35b 91.5%, #00855a 91.5%, #00855a 100%',
			'Heat': 'rgb(0,0,0) 0%, rgb(128,0,0) 25%, rgb(255,128,0) 50%, rgb(255,255,128) 75%, rgb(255,255,255) 100%',
			'IMD-low-high': 'rgb(8,64,129) 0%, rgb(8,104,172) 10%, rgb(43,140,190) 20%, rgb(78,179,211) 30%, rgb(123,204,196) 40%, rgb(168,221,181) 50%, rgb(204,235,197) 60%, rgb(224,243,219) 70%, rgb(238,252,217) 80%, rgb(251,252,244) 90%, rgb(251,252,244) 100%',
			'IMD-high-low': 'rgb(251,252,244) 0%, rgb(238,252,217) 10%, rgb(224,243,219) 20%, rgb(204,235,197) 30%, rgb(168,221,181) 40%, rgb(123,204,196) 50%, rgb(78,179,211) 60%, rgb(43,140,190) 70%, rgb(8,104,172) 80%, rgb(8,64,129) 90%, rgb(8,64,129) 100%',
			'Inferno': '#000004 0%, #1b0c41 11.1%, #4a0c6b 22.222%, #781c6d 33.333%, #a52c60 44.444%, #cf4446 55.555%, #ed6925 66.666%, #fb9b06 77.777%, #f7d13d 88.888%, #fcffa4 100%',
			'Leodis': '#2254F4 0%, #F9BC26 50%, #ffffff 100%',
			'Longside': '#801638 0%, #addde6 100%',
			'Magma': '#000004 0%, #180f3d 11.1%, #440f76 22.222%, #721f81 33.333%, #9e2f7f 44.444%, #cd4071 55.555%, #f1605d 66.666%, #fd9668 77.777%, #feca8d 88.888%, #fcfdbf 100%',
			'Mako': '#0B0405 0%, #357BA2 50%, #DEF5E5 100%',
			'PiPG': '#8e0152 0%, #c51b7d 10%, #de77ae 20%, #f1b6da 30%, #fde0ef 40%, #f7f7f7 50%, #e6f5d0 60%, #b8e186 70%, #7fbc41 80%, #4d9221 90%, #276419 100%',
			'Planck': 'rgb(0,0,255) 0%, rgb(0,112,255) 16.666%, rgb(0,221,255) 33.3333%, rgb(255,237,217) 50%, rgb(255,180,0) 66.666%, rgb(255,75,0) 100%',
			'Plasma': '#0d0887 0%, #46039f 11.1%, #7201a8 22.222%, #9c179e 33.333%, #bd3786 44.444%, #d8576b 55.555%, #ed7953 66.666%, #fb9f3a 77.777%, #fdca26 88.888%, #f0f921 100%',
			'PRGn': '#40004b 0%, #762a83 10%, #9970ab 20%, #c2a5cf 30%, #e7d4e8 40%, #f7f7f7 50%, #d9f0d3 60%, #a6dba0 70%, #5aae61 80%, #1b7837 90%, #00441b 100%',
			'PuOr': '#7f3b08 0%, #b35806 10%, #e08214 20%, #fdb863 30%, #fee0b6 40%, #f7f7f7 50%, #d8daeb 60%, #b2abd2 70%, #8073ac 80%, #542788 90%, #2d004b 100%',
			'Referendum': '#4BACC6 0%, #B6DDE8 50%, #FFF380 50%, #FFFF00 100%',
			'Rocket': '#03051A 0%, #CB1B4F 50%, #FAEBDD 100%',	
			'Turbo': '#30123b 0%, #4145ab 7.143%, #4675ed 14.286%, #39a2fc 21.429%, #1bcfd4 28.571%, #24eca6 35.714%, #61fc6c 42.857%, #a4fc3b 50%, #d1e834 57.143%, #f3c63a 64.286%, #fe9b2d 71.429%, #f36315 78.571%, #d93806 85.714%, #b11901 92.857%, #7a0402 100%',
			'Viridis8': '#440154 0%, #482878 11.1%, #3e4989 22.2%, #31688e 33.333%, #26828e 44.444%, #1f9e89 55.555%, #35b779 66.666%, #6ece58 77.777%, #b5de2b 88.888%, #fde725 100%',
			'Viridis-light': 'rgb(122,76,139) 0%, rgb(124,109,168) 12.5%, rgb(115,138,177) 25%, rgb(107,164,178) 37.5%, rgb(104,188,170) 50%, rgb(133,211,146) 62.5%, rgb(189,229,97) 75%, rgb(254,240,65) 87.5%, rgb(254,240,65) 100%',
			'RdBu': '#67001f 0%, #b2182b 10%, #d6604d 20%, #f4a582 30%, #fddbc7 40%, #f7f7f7 50%, #d1e5f0 60%, #92c5de 70%, #4393c3 80%, #2166ac 90%, #053061 100%'
		};

		var defaults = {'colourscale':'Viridis','labels':undefined,'tooltips':undefined,'borders':true,'attribute':undefined,'data':undefined,'hexjson':undefined,'keepmissing':false};
		this.options = clone(defaults);

		// Get parts of the query string
		var str = location.search.substr(1);
		var bits = str.split(/\&/);
		this.query = {};
		var b,kv;
		for(b = 0; b < bits.length; b++){
			if(bits[b].indexOf('http')==0 || bits[b].indexOf("=") == -1){
				this.query.url = bits[b];
			}else{
				kv = bits[b].split(/=/);
				kv[1] = decodeURIComponent(kv[1]);
				kv[1] = kv[1].replace(/\+/g," ");
				if(kv[1]=="true") kv[1] = true;
				if(kv[1]=="false") kv[1] = false;
				this.query[kv[0]] = kv[1];
			}
		}

		// Update colour scales
		for(var s in scales) this.colours.addScale(s,scales[s]);

		// Update values
		if(this.query.colourscale) document.getElementById('colourscale').value = this.query.colourscale;
		if(this.query.url) document.getElementById('url').value = this.query.url;
		if(this.query.hexjson) document.getElementById('hexjson').value = this.query.hexjson;
		if(this.query.attribute) addOptionTo(document.getElementById('attribute'),this.query.attribute,this.query.attribute,true);
		if(this.query.labels) addOptionTo(document.getElementById('labels'),this.query.labels,this.query.labels,true);
		if(this.query.tooltips) addOptionTo(document.getElementById('tooltips'),this.query.tooltips,this.query.tooltips,true);
		if(this.query.borders) document.getElementById('borders').checked = 'checked';

		addEv('click',document.querySelector('#menu-options'),{this:this},function(e){ this.toggleMenu("options"); this.updateOptionsFromForm(); });
		addEv('click',document.querySelector('#menu-save'),{this:this},function(e){ this.toggleMenu("saves"); });
		addEv('click',document.querySelector('#menu-link'),{this:this},function(e){ this.toggleMenu("link"); });

		this.loadData = function(url){
			this.toload++;

			// Convert a Google Sheets URL into the CSV output
			var m = url.match("https://docs.google.com/spreadsheets/d/([^\/]*)");
			if(m) url = "https://docs.google.com/spreadsheets/d/"+m[1]+"/gviz/tq?tqx=out:csv";
			
			msg.info('Loading CSV from <em>'+url+'</em>'+(url.indexOf('http')==0 ? ' ⚠️ external source':''),{'id':'load-data'});
			fetch(url,{}).then(response => {
				if(!response.ok) throw new Error('Network response was not OK');
				return response.text();
			}).then(txt => {
				this.data = CSV2JSON(txt);
				this.loaded++;
				if(this.loaded==this.toload) this.process();
				msg.remove('load-data');
				msg.info('Loaded CSV from <em>'+url+'</em>'+(url.indexOf('http')==0 ? ' ⚠️ external source':''));
			}).catch(error => {
				msg.remove('load-data');
				msg.error('There has been a problem loading CSV data from <em>%c'+this.options.url+'%c</em>','font-style:italic;','font-style:normal;',{'fade':10000,'error':error});
			});
			return this;
		};

		this.loadHexJSON = function(url){
			this.toload++;
			msg.info('Loading HexJSON layout from <em>'+url+'</em>'+(url.indexOf('http')==0 ? ' ⚠️ external source':''),{'id':'load-hexjson'});
			fetch(url,{}).then(response => {
				if(!response.ok) throw new Error('Network response was not OK');
				return response.json();
			}).then(json => {
				this.hexjson = json;
				this.loaded++;
				if(this.loaded==this.toload) this.process();
				msg.remove('load-hexjson');
				msg.info('Loaded HexJSON layout from <em>'+url+'</em>'+(url.indexOf('http')==0 ? ' ⚠️ external source':''));
			}).catch(error => {
				msg.remove('load-hexjson');
				msg.error('There has been a problem loading the HexJSON from <em>%c'+url+'%c</em>','font-style:italic;','font-style:normal;',{'fade':10000,'error':error});
			});
		};

		this.init = function(){
			msg.log("init");
			
			this.updateOptionsFromForm();

			// Add a loading animation
			document.getElementById('loader').innerHTML = '<div class="loader"><svg version="1.1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(.11601 0 0 .11601 -49.537 -39.959)"><path d="m610.92 896.12m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.83333s" repeatCount="indefinite" /></path><path d="m794.82 577.6m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.6666s" repeatCount="indefinite" /></path><path d="m1162.6 577.6m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.5s" repeatCount="indefinite" /></path><path d="m1346.5 896.12m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.3333s" repeatCount="indefinite" /></path><path d="m1162.6 1214.6m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.1666s" repeatCount="indefinite" /></path><path d="m794.82 1214.6m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="0s" repeatCount="indefinite" /></path></g></svg><br />Loading...</div>';

			this.toload = 0;
			this.loaded = 0;
			
			// If the CSV seems to be HexJSON we'll move it
			if(this.options.url.indexOf(".hexjson")>=0 && !this.options.hexjson){
				this.options.hexjson = this.options.url;
				delete this.options.url;
			}

			// Get the data file if we have one
			if(this.options.url) this.loadData(this.options.url);
			// Get the HexJSON file if we have one
			if(this.options.hexjson) this.loadHexJSON(this.options.hexjson);

			if(this.toload==0){
				document.getElementById('loader').innerHTML = '<div class="loader">Nothing to load. Please use the options in the top right to set your data file.</div>';
			}
			
			/* Add events to form fields */
			addEv('change',document.getElementById('borders'),{this:this},function(e){
				this.updateOptionsFromForm();
				this.setBorders();
			});
			addEv('change',document.getElementById('colourscale'),{this:this},function(e){
				this.updateOptionsFromForm();
				this.setColours();
			});
			addEv('change',document.getElementById('attribute'),{this:this},function(e){
				this.updateOptionsFromForm();
				this.setColours();
			});
			addEv('change',document.getElementById('labels'),{this:this},function(e){
				this.updateOptionsFromForm();
				this.setLabels();
			});
			addEv('change',document.getElementById('tooltips'),{this:this},function(e){
				this.updateOptionsFromForm();
				this.setLabels();
			});


			if(this.saveable){
				var div = document.createElement('div');
				div.classList.add('save');
				div.innerHTML = `<p style="color:#999;">Only the HexJSON format can be reloaded in this tool for further editing.</p>
					<div id="save-primary" style="font-size:1.4em;">
						<button class="c10-bg" id="save-hex">HexJSON</button>
						<button class="c8-bg" id="save-svg">SVG</button>
						<button class="c8-bg" id="save-geo">GeoJSON</button>
						<button class="c8-bg" id="save-png">PNG</button>
					</div>`;
				div.innerHTML += '<div id="save-primary" style="font-size:1.4em;"></div>';

				document.getElementById('saves').appendChild(div);

				div.querySelector('#save-hex').addEventListener('click',function(){ _obj.save(); });
				div.querySelector('#save-svg').addEventListener('click',function(){ _obj.saveSVG(); });
				div.querySelector('#save-geo').addEventListener('click',function(){ _obj.saveGeoJSON(); });
				div.querySelector('#save-png').addEventListener('click',function(){ saveDOMImage(el, { "file": "hexmap.png" }); });
			}
			return this;
		};
		
		this.updateOptionsFromForm = function(){
			msg.log("updateOptionsFromForm",document.getElementById('borders').checked);
			this.options.colourscale = document.getElementById('colourscale').value;
			this.options.url = document.getElementById('url').value;
			this.options.hexjson = document.getElementById('hexjson').value;
			this.options.attribute = document.getElementById('attribute').value;
			this.options.labels = document.getElementById('labels').value;
			this.options.tooltips = document.getElementById('tooltips').value;
			this.options.borders = (document.getElementById('borders').checked);
			return this;
		};
		this.hideMenu = function(id){
			var el = document.getElementById(id);
			if(el) el.style.display = "none";
			return this;
		};
		this.showMenu = function(id){
			var el = document.getElementById(id);
			if(el) el.style.display = "";
			return this;
		};
		this.toggleMenu = function(id){
			msg.log("toggleMenu",id);
			var panels = document.querySelectorAll('.menu-panel');
			var el = document.getElementById(id);
			for(var p = 0; p < panels.length; p++){
				if(panels[p]==el){
					if(isVisible(el)) el.style.display = "none";
					else el.style.display = "";
				}else{
					panels[p].style.display = "none";
				}
			}
			return this;			
		};

		this.hideMenu("options").hideMenu("saves").hideMenu("link");

		this.summariseData = function(){
			
			// https://en.wikipedia.org/wiki/ONS_coding_system
			var gss,code,j,k,m,got,typ,n,id="",q="",r="",label="",tooltip="",name="";
			gss = {
				'PCON':{
					'title':'Parliamentary Constituencies (2019)',
					'patterns':[/^E14[0-9]{6}$/,/^W07[0-9]{6}$/,/^S14[0-9]{6}$/,/^N06[0-9]{6}$/],
					'hexjson':'https://raw.githubusercontent.com/odileeds/hexmaps/gh-pages/maps/constituencies.hexjson'
				},
				'WD':{
					'title': 'Wards (2022)',
					'patterns':[/^E05[0-9]{6}$/,/^W05[0-9]{6}$/,/^S13[0-9]{6}$/,/^N08[0-9]{6}$/],
					'hexjson': 'maps/uk-wards-2022/simple.hexjson'
				},
				'LAD':{
					'title': 'Local Authority Districts (2021)',
					'patterns':[/^E06[0-9]{6}$/,/^W06[0-9]{6}$/,/^S12[0-9]{6}$/,/^E07[0-9]{6}$/,/^E08[0-9]{6}$/,/^E09[0-9]{6}$/],
					'hexjson': 'https://raw.githubusercontent.com/odileeds/hexmaps/gh-pages/maps/uk-local-authority-districts-2021.hexjson'
				},
				'NUTS3':{
					'title': 'NUTS3 regions',
					'patterns':[/^UK[C-N][0-9]{2}$/],
					'hexjson': 'https://raw.githubusercontent.com/odileeds/hexmaps/gh-pages/maps/uk-nuts3.hexjson'
				},
				'UTLA':{
					'title': 'Upper Tier Local Authorities',
					'hexjson': 'https://raw.githubusercontent.com/odileeds/hexmaps/gh-pages/maps/uk-upper-tier-local-authorities.hexjson'
				},
				'Senedd':{
					'title': 'Senedd Constituencies',
					'patterns':[/^W09[0-9]{6}$/],
					'hexjson': 'https://raw.githubusercontent.com/odileeds/hexmaps/gh-pages/maps/wales-senedd-constituencies.hexjson'
				},
				'MSOA':{
					'title': 'MSOAs',
					'patterns':[/^[EWS]02[0-9]{6}$/],
					'hexjson': 'https://raw.githubusercontent.com/houseofcommonslibrary/uk-hex-cartograms-noncontiguous/main/hexjson/msoa_hex_coords.hexjson'
				},
				'ICB':{
					'title': 'NHS Integrated Care Boards',
					'patterns':[/^Q[A-Z0-9]{2}$/],
					'hexjson': 'maps/nhs-icb-2022.hexjson'
				},
				'PCN':{
					'title': 'NHS Primary Care Networks',
					'patterns':[/^U[0-9]{5}$/],
					'hexjson': 'maps/nhs-pcn-2022.hexjson'					
				},
				'US-States':{
					'title': 'US States',
					'patterns':[/^(AL|AK|AZ|AR|CA|CO|CT|DC|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)$/],
					'hexjson': 'maps/us-states.hexjson'
				}
			};
			for(code in gss){
				if(code in gss){
					gss[code].count = 0;
					gss[code].matches = {};
				}
			}
			for(k in this.data[0]){
				if(k.toLowerCase()=="id" || k.toLowerCase()=="gss-code" || k.toLowerCase()=="code") id = k;
				if(k.toLowerCase()=="r") r = k;
				if(k.toLowerCase()=="q") q = k;
				if(k.toLowerCase()=="name" || k.toLowerCase()=="n") name = k;
				if(k.toLowerCase()=="label") label = k;
				if(k.toLowerCase()=="tooltip") tooltip = k;
			}
			for(j = 0; j < this.data.length; j++){
				got = false;
				for(code in gss){
					if(gss[code].patterns){
						for(k in this.data[j]){
							if(typeof this.data[j][k]==="string"){
								for(m = 0; m < gss[code].patterns.length; m++){
									if(this.data[j][k].match(gss[code].patterns[m])){
										got = true;
										gss[code].matches[this.data[j][k]] = true;
										gss[code].id = k;
									}
								}
							}
						}
						if(got) gss[code].count++;
					}
				}
			}
			typ = {'id':'','count':0};
			for(var t in gss){
				n = Object.keys(gss[t].matches).length;
				if(n > typ.count) typ = {'id':t,'count':n,'original':gss[t].id};
			}
			if(!id && typ.original) id = typ.original;
			var out = {'id':id,'ids':[]};
			if(q) out.q = q;
			if(r) out.r = r;
			if(name) out.name = name;
			if(label) out.label = label;
			if(tooltip) out.tooltip = tooltip;
			if(typ.id in gss) out.hexjson = gss[typ.id].hexjson;
			if(id){
				for(j = 0; j < this.data.length; j++) out.ids.push(this.data[j][id]);
			}
			return out;
		};

		this.process = function(){

			var i,d,id;
			var summary = this.summariseData();

			msg.log('summary',summary);

			if(!summary.id){
				msg.error('No <code>id</code> (or <code>code</code> columns were found in the data.',{'fade':10000});
				return this;
			}

			if(!this.hexjson){
				if(summary.q && summary.r){

					// Build HexJSON
					this.hexjson = {"hexes":{},"layout":"odd-r"};
					for(i = 0; i < this.data.length; i++) this.hexjson.hexes[this.data[i][summary.id]] = {'q':this.data[i][summary.q],'r':this.data[i][summary.r]};

				}else if(summary.q===undefined || summary.r===undefined){

					// The data doesn't contain q or r columns
					if(summary.hexjson) return this.loadHexJSON(summary.hexjson);

					msg.error('No <code>q</code> or <code>r</code> columns (hex coordinates) were found in the data. Either add them or provide an appropriate HexJSON file.',{'fade':10000});
					return this;

				}else{

					msg.error('Missing both <code>q</code> and <code>r</code> columns (hex coordinates) in the data. Either add them or provide an appropriate HexJSON file.',{'fade':10000});
					return this;

				}
			}

			// Remove hexes that aren't in the data
			if(!this.options.keepmissing){
				for(id in this.hexjson.hexes){
					if(!summary.ids.includes(id)){
						delete this.hexjson.hexes[id];
					}
				}
			}

			// Add the data to the hexes
			for(i = 0; i < this.data.length; i++){
				for(d in this.data[i]){
					id = this.data[i][summary.id];
					if(id in this.hexjson.hexes){
						this.hexjson.hexes[this.data[i][summary.id]][d] = this.data[i][d];
					}
				}
			}

			// Update the dropdowns
			document.getElementById('attribute').innerHTML = "";
			document.getElementById('labels').innerHTML = "";
			document.getElementById('tooltips').innerHTML = "";
			addOptionTo(document.getElementById('attribute'),'','none',(d==this.options.attribute));
			addOptionTo(document.getElementById('labels'),'','none',(d==this.options.labels));
			addOptionTo(document.getElementById('tooltips'),'','none',(d==this.options.tooltips));
			for(d in this.data[0]){
				if(typeof this.data[0][d]==="number") addOptionTo(document.getElementById('attribute'),d,d,(d==this.options.attribute));
				addOptionTo(document.getElementById('labels'),d,d,(d==this.options.labels));
				addOptionTo(document.getElementById('tooltips'),d,d,(d==this.options.tooltips));
			}

			document.getElementById('loader').innerHTML = "";

			if(!this.hex){
				this.hex = new OI.hexmap(document.getElementById('hexmap'),{
					'hexjson': this.hexjson,
					'label':{
						'show': true,
						'clip': true,
						'format': function(txt,attr){
							if(txt){
								txt = txt.substr(0,3);
							}else{
								if(_obj.options.labels in attr.hex) txt = attr.hex[_obj.options.labels];
								else if(summary.label in attr.hex) txt = attr.hex[summary.label];
								else txt = "";
							}
							txt += "";
							var fs = attr['font-size']*0.5;
							var tspans = '';
							var lines = txt.split(/ /);
							for(var i = 0; i < lines.length; i++){
								tspans += '<tspan font-size="'+fs+'px" y="'+(parseFloat(attr.y) + (i-lines.length/2+0.5)*fs).toFixed(3)+'" x="'+parseFloat(attr.x).toFixed(3)+'">'+(lines[i]||"")+'</tspan>';
							}
							return tspans;
						}
					},
					'tooltip': {
						'format': function(txt,attr){
							if(_obj.options.tooltips in attr.hex) txt = attr.hex[_obj.options.tooltips];
							txt += "";
							return txt;
						}
					},
					'style': {
						'selected':{'fill-opacity':1, 'fill':'' },
						'default':{'fill-opacity':1,'fill':'#722EA5','stroke':(this.options.borders ? '#ffffff':'transparent')},
						'grid':{'fill-opacity':0.1,'fill':'#ccc'}
					},
					'ready':function(){
						_obj.setColours(this);

						var svg = this.el.querySelector(':scope > svg');
						var overlay = this.el.querySelector('.overlay');
						function addOutline(e){
							// Create an outline version of the hex that sits on top
							var outline = e.cloneNode(true);
							outline.removeAttribute('tabindex');
							if(outline.querySelector('text')) outline.querySelector('text').remove();
							if(outline.querySelector('title')) outline.querySelector('title').remove();
							outline.querySelector('path').setAttribute('fill','none');
							outline.querySelector('path').setAttribute('vector-effect','non-scaling-stroke');
							outline.removeAttribute('id');
							outline.classList.add('outline');
							outline.querySelector('path').removeAttribute('tabindex');
							overlay.innerHTML = "";
							overlay.appendChild(outline);
							return this;
						};
						function removeOutline(){
							var e = svg.querySelector('.data-layer');
							if(e && overlay.querySelector('.outline')) overlay.querySelector('.outline').remove();
							return this;
						};
						var props = {};
						props.show = function(e){
							removeOutline();
							if(!e.classList.contains('marker')) addOutline(e);
						};
						props.clear = function(e){ removeOutline(); };
						props.coord_attributes = ["data-q", "data-r"];
						function arrow_move(e, _alltips){
							var directions = {
								"ArrowLeft": [-1,0],
								"ArrowRight": [1,0],
								"ArrowUp": [0,1],
								"ArrowDown": [0,-1]
							};

							var direction = directions[e.key];
							var dx = direction[0];
							var dy = direction[1];

							var idx = -1,t;

							// If a tip in this group is active we use that
							if(_alltips.active){
								for(t = 0; t < this.tips.length; t++){
									// Matched to an existing tip in this group
									if(_alltips.active==this.tips[t]) idx = t;
								}
							}

							// Find next hex
							idx = getHexWithTooltip.apply(this, [e, _alltips, idx, dx, dy]);

							while(!this.tips[idx].getTooltip()){
								// Keep trying until we find a hex with a tooltip
								idx = getHexWithTooltip.apply(this, [e, _alltips, idx, dx, dy]);
							}
							// Activate the tooltip
							if(idx >= 0 && idx < this.tips.length) _alltips.activate(this.tips[idx].el);
						}

						function getHexWithTooltip(e,_alltips,idx,dx,dy){
							if(e.shiftKey && this.tips[idx] && props.coord_attributes !== undefined) {
								var tip = this.tips[idx];
								var x = tip.x + dx;
								var y = tip.y + dy;
								var closest = this.tips.map(function(t,i) {
									return {t, i, d: [(t.x - x), (t.y - y)]};
								}).filter(function(a) {
									return dx != 0 ? a.d[0]*dx >= 0 : a.d[1]*dy >= 0;
								})
								.sort(function(a,b) {
									var ax = a.d[0];
									var ay = a.d[1];
									var bx = b.d[0];
									var by = b.d[1];
									return dx != 0 ? (ay==by ? (ax-bx)*dx : Math.abs(ay)-Math.abs(by)) : (ax==bx ? (ay-by)*dy : Math.abs(ax) - Math.abs(bx));
								});
								if(closest.length > 0) idx = closest[0].i;
							}else{
								// Increment
								if(e.key == "ArrowLeft" || e.key == "ArrowUp") idx--;
								else if(e.key == "ArrowRight" || e.key == "ArrowDown") idx++;
							}

							// Limit range
							if(idx < 0) idx += this.tips.length;
							if(idx > this.tips.length-1) idx -= this.tips.length;
							return idx;
						}
						props.keymap = {
							"ArrowLeft": arrow_move,
							"ArrowRight": arrow_move,
							"ArrowUp": arrow_move,
							"ArrowDown": arrow_move,
						}
						var groups = this.el.querySelectorAll('.data-layer .series, .oi-map-inner .markers');
						// Add tooltip groups
						for(var g = 0; g < groups.length; g++) OI.Tooltips.addGroup(groups[g],'.area, .hex, .marker, .line',props);
					}
				});
			}

			this.setBorders();
			this.setLabels();

			return this;
		};
		
		this.setBorders = function(){
			msg.log('setBorders',this.hex);
			if(this.hex){
				var cells = document.querySelectorAll('.data-layer .hex[role=cell] path');
				for(var c = 0; c < cells.length; c++) cells[c].style['stroke-width'] = (this.options.borders) ? '2px' : '0px';
			}
			this.updateLink();
			return this;
		};

		this.setColours = function(hex){
			msg.log('setColours');
			if(!hex && "hex" in this) hex = this.hex;
			if(hex){
				var min,max,a;
				if(typeof this.data[0][this.options.attribute]==="number"){
					min = Infinity;
					max = -Infinity;
					for(a in hex.areas){
						min = Math.min(min,hex.areas[a].data[this.options.attribute]);
						max = Math.max(max,hex.areas[a].data[this.options.attribute]);
					}
					var mm = getNiceRange(min,max);
					min = mm.min;
					max = mm.max;
				}else{
					min = 0;
					max = 1;
				}
				hex.updateColours(function(a){
					var v = this.areas[a].data[_obj.options.attribute];
					if(typeof v!=="number") v = 0;
					var c = _obj.colours.getColourFromScale(_obj.options.colourscale,v,min,max)||this.areas[a].data.colour;
					var contrast = contrastColour(c);
					var spans = this.areas[a].label.querySelectorAll('tspan');
					for(var s = 0; s < spans.length; s++) spans[s].setAttribute('fill',contrast);
					return c;
				});

				// Create colour scale bar
				var el = document.getElementById('scale');
				if(el) el.innerHTML = '<div class="scalebar" style="'+this.colours.getGradient(this.options.colourscale)+';height:1em;"></div><div class="min" style="float:left;border-left:1px solid '+this.colours.getColourFromScale(this.options.colourscale,0,0,100)+';padding-left: 0.25em;">'+(min != Infinity && typeof min!=="undefined" ? min : 'minimum')+'</div><div class="max"style="float:right;border-right:1px solid '+this.colours.getColourFromScale(this.options.colourscale,100,0,100)+';padding-right: 0.25em;">'+(max != -Infinity && typeof max!=="undefined" ? max : 'maximum')+'</div>';

			}
			this.updateLink();
			return this;
		};
		
		this.setLabels = function(){
			msg.log('setLabels');
			if(this.hex) this.hex.updateLabels();
			this.updateLink();
			
			this.setColours();
			return this;
		};

		this.updateLink = function(){
			msg.log('updateLink');
			var el = document.getElementById('share');
			if(el){
				if(this.options.url.indexOf('http')==0){
					//document.getElementById('menu-link').style.display = "";
					el.innerHTML = '<label for="view">Link to this view:</label><input type="text" class="view" id="view" onClick="this.setSelectionRange(0, this.value.length)" value="'+location.protocol + '//' + location.host + location.pathname+'?'+this.options.url+'&hexson='+encodeURI(this.options.hexjson)+'&colourscale='+encodeURI(this.options.colourscale)+'&attribute='+encodeURI(this.options.attribute)+'&labels='+this.options.labels+'&tooltips='+this.options.tooltips+'&borders='+this.options.borders+'" />';
				}else{
					//document.getElementById('menu-link').style.display = "none";
					el.innerHTML = '<div class="warning padded">It is not possible to create a shareable link for local files.</div>';
				}
			}else{
				msg.warn('No link input to write to.');
			}
			return this;
		};

		this.saveSVG = function(){
			msg.log('saveSVG');
			// Make hex json
			var str = el.querySelector('.oi-map-map').outerHTML;
			this.save(str,"map.svg",'text/application/svg+xml');

			return this;
		};

		function roundTo(v,dp){
			if(!dp) dp = 5;
			var s = Math.pow(10,dp);
			return Math.round(v*s)/s;
		}
		// Construct a fake GeoJSON. It is "fake" in the sense that we will place the map at Null Island and scale the map to a 0.1x0.1 degree grid to try to keep it fairly Car.
		this.saveGeoJSON = function(){
			msg.log('saveGeoJSON');
			var h,x,y,bit,j,p;
			var scale = 1/(Math.max(this.hex.maxw,this.hex.maxh)*10);
			var geojson = {"type":"FeatureCollection","features":[]};
			var feature;
			for(h in this.hex.areas){
				x = 0;
				y = 0;
				feature = {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[]]},"properties":clone(this.hex.mapping.hexes[h]||{})};
				feature.properties.id = h;
				p = this.hex.areas[h].orig.array;
				for(bit = 0; bit < p.length; bit++){
					if(p[bit][0] == "M"){
						x = (typeof p[bit][1][0]==="string" ? parseFloat(p[bit][1][0]) : p[bit][1][0]);
						y = (typeof p[bit][1][1]==="string" ? parseFloat(p[bit][1][1]) : p[bit][1][1]);
					}else if(p[bit][0] == "m"){
						x += p[bit][1][0];
						y += p[bit][1][1];
						feature.geometry.coordinates[0].push([roundTo(x*scale),roundTo(-y*scale)]);
					}else if(p[bit][0] == "l"){
						for(j = 0; j < p[bit][1].length; j += 2){
							x += (p[bit][1][j]);
							y += (p[bit][1][j+1]);
							feature.geometry.coordinates[0].push([roundTo(x*scale),roundTo(-y*scale)]);
						}
					}else if(p[bit][0] == "z"){
						feature.geometry.coordinates[0].push(feature.geometry.coordinates[0][0]);
					}
				}
				geojson.features.push(feature);
			}
			this.save(JSON.stringify(geojson),"map.geojson","application/geo+json");
			return this;
		};

		this.save = function(str,file,type){

			// Make hex json

			// Update the version number
			if(this.hex.mapping.version){
				var version = this.hex.mapping.version;
				var bits = version.split(".");
				for(var b = 0; b < bits.length; b++) bits[b] = parseInt(bits[b]);
				bits[bits.length-1]++;
				this.hex.mapping.version = bits.join(".");
			}else{
				this.hex.mapping.version = "0.1";
			}

			if(!str) str = JSON.stringify(this.hex.mapping).replace(/\}\,/g,"},\n\t\t").replace(/\}\}\}/,"}\n\t\}\n\}").replace(/\"hexes\":{/,"\n\t\"hexes\": {\n\t\t").replace(/{"layout"/,"{\n\t\"layout\"").replace(/"version"/,"\n\t\"version\"");
			if(!file) file = "test.hexjson";
			if(!type) type = 'text/application/json';

			var textFileAsBlob = new Blob([str], {type:type});
			var fileNameToSaveAs = file;
		
			function destroyClickedElement(event){ document.body.removeChild(event.target); }
			var dl = document.createElement("a");
			dl.download = fileNameToSaveAs;
			dl.innerHTML = "Download File";
			if(window.webkitURL != null){
				// Chrome allows the link to be clicked
				// without actually adding it to the DOM.
				dl.href = window.webkitURL.createObjectURL(textFileAsBlob);
			}else{
				// Firefox requires the link to be added to the DOM
				// before it can be clicked.
				dl.href = window.URL.createObjectURL(textFileAsBlob);
				dl.onclick = destroyClickedElement;
				dl.style.display = "none";
				document.body.appendChild(dl);
			}
			dl.click();
			return this;
		};

		return this;
	}

	// Simple CSV to JSON parser v3.1
	function CSV2JSON(str,opts){
		// Convert \r\n to \n, remove final newline, and split by newlines
		var lines = str.replace(/[\n\r]{2}/g,"\n").replace(/[\n\r]+$/g,"").split(/\n/);
		var header = [],cols,i,c,data = [],datum,v;
		for(i = 0; i < lines.length; i++){
			cols = lines[i].split(/,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/);
			if(i==0){
				header = cols;
				for(c = 0; c < header.length; c++) header[c] = cols[c].replace(/(^\"|\"$)/g,"");
			}else{
				datum = {};
				for(c = 0; c < header.length; c++){
					v = cols[c].replace(/(^\"|\"$)/g,"");
					if(parseFloat(v)==v) v = parseFloat(v);
					if(v=="True" || v=="true") v = true;
					if(v=="False" || v=="false") v = false;
					datum[header[c]] = v;
				}
				data.push(datum);
			}
		}
		return data;
	}

	// Function to clone a hash otherwise we end up using the same one
	function clone(hash) {
		var json = JSON.stringify(hash);
		var object = JSON.parse(json);
		return object;
	}

	function addEv(ev,el,data,fn){
		el.addEventListener(ev,function(e){
			e.data = data;
			fn.call(data.this||this,e);
		});
	}

	function isVisible(el) {
		return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	}

	function addOptionTo(el,v,label,picked){
		var opt = document.createElement('option');
		opt.setAttribute('value',v);
		opt.innerHTML = label||v;
		if(picked) opt.selected = "selected";
		el.appendChild(opt);
	}


	// Convert to sRGB colorspace
	// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
	function sRGBToLinear(v){
		v /= 255;
		if (v <= 0.03928) return v/12.92;
		else return Math.pow((v+0.055)/1.055,2.4);
	}
	function h2d(h) {return parseInt(h,16);}
	// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
	function relativeLuminance(rgb){ return 0.2126 * sRGBToLinear(rgb[0]) + 0.7152 * sRGBToLinear(rgb[1]) + 0.0722 * sRGBToLinear(rgb[2]); }
	// https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#contrast-ratiodef
	function contrastRatio(a, b){
		var L1 = relativeLuminance(a);
		var L2 = relativeLuminance(b);
		if(L1 < L2){
			var temp = L2;
			L2 = L1;
			L1 = temp;
		}
		return (L1 + 0.05) / (L2 + 0.05);
	}	
	function contrastColour(c){
		var rgb = [];
		if(c.indexOf('#')==0){
			rgb = [h2d(c.substring(1,3)),h2d(c.substring(3,5)),h2d(c.substring(5,7))];
		}else if(c.indexOf('rgb')==0){
			var bits = c.match(/[0-9\.]+/g);
			if(bits.length == 4) this.alpha = parseFloat(bits[3]);
			rgb = [parseInt(bits[0]),parseInt(bits[1]),parseInt(bits[2])];
		}
		var cols = {
			"black": [0, 0, 0],
			"white": [255, 255, 255],
		};
		var maxRatio = 0;
		var contrast = "white";
		for(var col in cols){
			var contr = contrastRatio(rgb, cols[col]);
			if(contr > maxRatio){
				maxRatio = contr;
				contrast = col;
			}
		}
		if(maxRatio < 4.5){
			console.warn('Text contrast poor ('+maxRatio.toFixed(1)+') for %c'+c+'%c','background:'+c+';color:'+contrast,'background:none;color:inherit;');
		}else if(maxRatio < 7){
			//console.warn('Text contrast good ('+maxRatio.toFixed(1)+') for %c'+c+'%c','background:'+c+';color:'+contrast,'background:none;color:inherit;');
		}
		return contrast;
	}
	OI.contrastColour = contrastColour;

	/* ============== */
	/* Colours v0.3.2 */
	// Define colour routines
	function Colour(c,n){
		if(!c) return {};
		function d2h(d) { return ((d < 16) ? "0" : "")+d.toString(16);}
		function h2d(h) {return parseInt(h,16);}
		/**
		 * Converts an RGB color value to HSV. Conversion formula
		 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
		 * Assumes r, g, and b are contained in the set [0, 255] and
		 * returns h, s, and v in the set [0, 1].
		 *
		 * @param	Number	r		 The red color value
		 * @param	Number	g		 The green color value
		 * @param	Number	b		 The blue color value
		 * @return	Array				The HSV representation
		 */
		function rgb2hsv(r, g, b){
			r = r/255;
			g = g/255;
			b = b/255;
			var max = Math.max(r, g, b), min = Math.min(r, g, b);
			var h, s, v = max;
			var d = max - min;
			s = max == 0 ? 0 : d / max;
			if(max == min) h = 0; // achromatic
			else{
				switch(max){
					case r: h = (g - b) / d + (g < b ? 6 : 0); break;
					case g: h = (b - r) / d + 2; break;
					case b: h = (r - g) / d + 4; break;
				}
				h /= 6;
			}
			return [h, s, v];
		}

		this.alpha = 1;

		// Let's deal with a variety of input
		if(c.indexOf('#')==0){
			this.hex = c;
			this.rgb = [h2d(c.substring(1,3)),h2d(c.substring(3,5)),h2d(c.substring(5,7))];
		}else if(c.indexOf('rgb')==0){
			var bits = c.match(/[0-9\.]+/g);
			if(bits.length == 4) this.alpha = parseFloat(bits[3]);
			this.rgb = [parseInt(bits[0]),parseInt(bits[1]),parseInt(bits[2])];
			this.hex = "#"+d2h(this.rgb[0])+d2h(this.rgb[1])+d2h(this.rgb[2]);
		}else return {};
		this.hsv = rgb2hsv(this.rgb[0],this.rgb[1],this.rgb[2]);
		this.name = (n || "Name");
		var r,sat;
		for(r = 0, sat = 0; r < this.rgb.length ; r++){
			if(this.rgb[r] > 200) sat++;
		}
		this.toString = function(){
			return 'rgb'+(this.alpha < 1 ? 'a':'')+'('+this.rgb[0]+','+this.rgb[1]+','+this.rgb[2]+(this.alpha < 1 ? ','+this.alpha:'')+')';
		};
		this.text = (this.rgb[0]*0.299 + this.rgb[1]*0.587 + this.rgb[2]*0.114 > 186 ? "black":"white");
		return this;
	}
	function Colours(){
		var scales = {
			'Viridis': 'rgb(68,1,84) 0%, rgb(72,35,116) 10%, rgb(64,67,135) 20%, rgb(52,94,141) 30%, rgb(41,120,142) 40%, rgb(32,143,140) 50%, rgb(34,167,132) 60%, rgb(66,190,113) 70%, rgb(121,209,81) 80%, rgb(186,222,39) 90%, rgb(253,231,36) 100%'
		};
		function col(a){
			if(typeof a==="string") return new Colour(a);
			else return a;
		}
		this.getColourPercent = function(pc,a,b,inParts){
			var c;
			pc /= 100;
			a = col(a);
			b = col(b);
			c = {'r':parseInt(a.rgb[0] + (b.rgb[0]-a.rgb[0])*pc),'g':parseInt(a.rgb[1] + (b.rgb[1]-a.rgb[1])*pc),'b':parseInt(a.rgb[2] + (b.rgb[2]-a.rgb[2])*pc),'alpha':1};
			if(a.alpha<1 || b.alpha<1) c.alpha = ((b.alpha-a.alpha)*pc + a.alpha);
			if(inParts) return c;
			else return 'rgb'+(c.alpha && c.alpha<1 ? 'a':'')+'('+c.r+','+c.g+','+c.b+(c.alpha && c.alpha<1 ? ','+c.alpha:'')+')';
		};
		this.makeGradient = function(a,b){
			a = col(a);
			b = col(b);
			var grad = a.toString()+' 0%, '+b.toString()+' 100%';
			if(b) return 'background: '+a.toString()+'; background: -moz-linear-gradient(left, '+grad+');background: -webkit-linear-gradient(left, '+grad+');background: linear-gradient(to right, '+grad+');';
			else return 'background: '+a.toString()+';';
		};
		this.getGradient = function(id){
			return 'background: -moz-linear-gradient(left, '+scales[id].str+');background: -webkit-linear-gradient(left, '+scales[id].str+');background: linear-gradient(to right, '+scales[id].str+');';
		};
		this.addScale = function(id,str){
			scales[id] = str;
			processScale(id,str);
			return this;
		};
		this.quantiseScale = function(id,n,id2){
			var cs,m,pc,step,i;
			cs = [];
			m = n-1;
			pc = 0;
			step = 100/n;
			for(i = 0; i < m; i++){
				cs.push(this.getColourFromScale(id,i,0,m)+' '+(pc)+'%');
				cs.push(this.getColourFromScale(id,i,0,m)+' '+(pc+step)+'%');
				pc += step;
			}
			cs.push(this.getColourFromScale(id,1,0,1)+' '+(pc)+'%');
			cs.push(this.getColourFromScale(id,1,0,1)+' 100%');
			this.addScale(id2,cs.join(", "));
			return this;
		};
		function processScale(id,str){
			if(scales[id] && scales[id].str){
				console.warn('Colour scale '+id+' already exists. Bailing out.');
				return this;
			}
			scales[id] = {'str':str};
			scales[id].stops = extractColours(str);
			return this;
		}
		function extractColours(str){
			var stops,cs,i,c;
			stops = str.replace(/^\s+/g,"").replace(/\s+$/g,"").replace(/\s\s/g," ").split(', ');
			cs = [];
			for(i = 0; i < stops.length; i++){
				var bits = stops[i].split(/ /);
				if(bits.length==2) cs.push({'v':bits[1],'c':new Colour(bits[0])});
				else if(bits.length==1) cs.push({'c':new Colour(bits[0])});
			}
			
			for(c=0; c < cs.length;c++){
				if(cs[c].v){
					// If a colour-stop has a percentage value provided, 
					if(cs[c].v.indexOf('%')>=0) cs[c].aspercent = true;
					cs[c].v = parseFloat(cs[c].v);
				}
			}
			return cs;
		}

		// Process existing scales
		for(var id in scales){
			if(scales[id]) processScale(id,scales[id]);
		}
		
		// Return a Colour object for a string
		this.getColour = function(str){
			return new Colour(str);
		};
		// Return the colour scale string
		this.getColourScale = function(id){
			return scales[id].str;
		};
		// Return the colour string for this scale, value and min/max
		this.getColourFromScale = function(s,v,min,max,inParts){
			var cs,v2,pc,c,cfinal;
			if(typeof inParts!=="boolean") inParts = false;
			if(!scales[s]){
				this.log('WARNING','No colour scale '+s+' exists');
				return '';
			}
			if(typeof v!=="number") v = 0;
			if(typeof min!=="number") min = 0;
			if(typeof max!=="number") max = 1;
			cs = scales[s].stops;
			v2 = 100*(v-min)/(max-min);
			cfinal = {};
			if(v==max){
				cfinal = {'r':cs[cs.length-1].c.rgb[0],'g':cs[cs.length-1].c.rgb[1],'b':cs[cs.length-1].c.rgb[2],'alpha':cs[cs.length-1].c.alpha};
			}else{
				if(cs.length == 1){
					cfinal = {'r':cs[0].c.rgb[0],'g':cs[0].c.rgb[1],'b':cs[0].c.rgb[2],'alpha':(v2/100).toFixed(3)};
				}else{
					for(c = 0; c < cs.length-1; c++){
						if(v2 >= cs[c].v && v2 <= cs[c+1].v){
							// On this colour stop
							pc = 100*(v2 - cs[c].v)/(cs[c+1].v-cs[c].v);
							if(pc > 100) pc = 100;	// Don't go above colour range
							cfinal = this.getColourPercent(pc,cs[c].c,cs[c+1].c,true);
							continue;
						}
					}
				}
			}
			if(inParts) return cfinal;
			else return 'rgba(' + cfinal.r + ',' + cfinal.g + ',' + cfinal.b + ',' + cfinal.alpha + ")";
		};
		
		return this;
	}
	function saveDOMImage(el, opt) {
		var w, h, d;
		if(!opt) opt = {};
		if(!opt.file) opt.file = "figure.png";
		if(opt.scale){
			if (!opt.height) opt.height = el.offsetHeight * 2;
			if (!opt.width) opt.width = el.offsetWidth * 2;
			// Force bigger size for element
			w = el.style.getPropertyValue("width");
			h = el.style.getPropertyValue("height");
			el.style.setProperty("width", (opt.width) + "px");
			el.style.setProperty("height", (opt.height) + "px");
		}
		opt.filter = function filter (node) {
			// Don't bother with <title> tags
			return ((node.tagName||"").toLowerCase() == 'title' ? false : true);
		};
		el.classList.add("capture");
		d = new Date();

		domtoimage.toPng(el, opt).then(function (dataUrl) {
			var link = document.createElement("a");
			link.download = opt.file;
			link.href = dataUrl;
			link.click();
			// Reset element
			if(opt.scale){
				el.style.setProperty("width", w);
				el.style.setProperty("height", h);
			}
			el.classList.remove("capture");
			if(typeof opt.callback === "function") opt.callback.call();
		}).catch(function (error) {
			console.error('oops, something went wrong!', error);
		});
	}

	function getNiceRange(min,max){
		var i = calculateInterval(max-min);
		min = Math.floor(min/i)*i;
		max = Math.ceil(max/i)*i;
		return {'min':min,'max':max};
	}

	function calculateInterval(range) {
		var x = Math.pow(10.0, Math.floor(Math.log10(range)));
		if(range / x >= 5) return x;
		else if (range / (x / 2.0) >= 5) return x / 2.0;
		else return x / 5.0;
	}

	OI.HexViewer = HexViewer;

	root.OI = OI||root.OI||{};
	
})(window || this);

/*
	Open Innovations Tooltip v0.5.0
	Helper function to add tooltips. A suitable candidate must:
		- be in an SVG
		- have a <title> child
		- the parent SVG must have a container
*/
!function(e){var r=document.createElement("style");function i(t,e,r,i){e.addEventListener(t,function(t){t.data=r,i.call(r.this||this,t)})}r.innerHTML=".tooltip {z-index:10000;color:black;filter:drop-shadow(0px 1px 1px rgba(0,0,0,0.7));text-align:left;}.tooltip .inner { padding: 1em; }",document.head.prepend(r),e.OI||(e.OI={}),e.OI.ready||(e.OI.ready=function(t){"loading"!=document.readyState?t():document.addEventListener("DOMContentLoaded",t)}),Element.prototype.furthest||(Element.prototype.furthest=function(t){for(var e=this,r=null;null!==e&&1===e.nodeType;)e.matches(t)&&(r=e),e=e.parentElement||e.parentNode;return r});var o=[];function n(r,n){if(!r)return console.error("No point to attach to"),this;this.el=r;var a,l,s="";(a=r.furthest("svg"))?s=a.getAttribute("data-type"):a=r,n._type=s,l=a.parentNode,n._group||this.el.setAttribute("tabindex",0);for(var h=!1,p=0;p<o.length;p++)o[p]==l&&(h=!0);return h||(i("mouseleave",l,{this:this},function(t){this.clear()}),o.push(l)),n._group||r.setAttribute("tabindex",0),this.attr=n,this.setAttr=function(t){for(var e in t||(t={}),t)n[e]=t[e];return this},this.getAttr=function(t){if(t in n)return n[t]},void 0!==n.coord_attributes&&(this.x=parseFloat(this.el.getAttribute(n.coord_attributes[0])),this.y=parseFloat(this.el.getAttribute(n.coord_attributes[1]))),this.show=function(){var i,o,a,h,p,d,f,g,b,y,v,m,k,x;if((m=r.querySelector("path,.marker"))||(m=r),!(k=this.getTooltip(m)))return console.warn("No tooltip content found for ",r),this;if(n._group)for(t=0;t<n._group.tips.length;t++)r!=n._group.tips[t].el?n._group.tips[t].el.removeAttribute("tabindex"):r.setAttribute("tabindex",0);return r.setAttribute("aria-label",k.replace(/<[^\>]+>/g," ")),v=document.body.getBoundingClientRect().width,l.style.position="relative",i=n._alltips.create(),x=i,l.appendChild(x),(a=r.getAttribute("data-fill"))||(a=r.getAttribute("fill")),!a&&r.querySelector("path,.marker")&&((a=r.querySelector("path,.marker").getAttribute("data-fill"))||(a=r.querySelector("path,.marker").getAttribute("fill"))),!a&&m.closest("svg")&&(a=m.closest("svg").getAttribute("fill")),"currentColor"==a&&(a=window.getComputedStyle(m).color),"transparent"==a&&m.getAttribute("data-fill")&&(a=m.getAttribute("data-fill")),a||(a=window.getComputedStyle(m).fill),o=(k||"").replace(/[\n\r]/g,"<br />"),g=i.querySelector(".inner"),b=i.querySelector(".arrow"),g.innerHTML=o,h=r.getBoundingClientRect(),p=l.getBoundingClientRect(),f=4,8,"bar-chart"!=s&&"stacked-bar-chart"!=s||(f=h.height/2),"hex-map"==s&&(f=h.height/2),"tree-map"==s&&(f=h.height/2),"calendar-chart"==s&&(f=h.height/2),"waffle-chart"==s&&(f=h.height/2),i.setAttribute("style","position:absolute;left:"+(h.left+h.width/2-p.left).toFixed(2)+"px;top:"+(h.top+h.height/2-p.top).toFixed(2)+"px;display:"+(o?"block":"none")+";transform:translate3d(-50%,calc(-100% - "+f+"px),0);transition:all 0s;"),g.style.background=a,g.style.transform="none",b.style["border-top-color"]=a,a&&c(u(a),[0,0,0])<2?(g.style.border="1px solid rgba(255,255,255,0.3)",g.style.borderBottom="0"):g.style.border="0px",i.style.color=a&&e.OI.contrastColour?e.OI.contrastColour(a):"black",g.style.whiteSpace=i.offsetWidth>v-16?"none":"nowrap",i.offsetWidth>v-16?(i.style.width=v-16+"px",g.style.whiteSpace="normal"):i.style.width="",y=0,(d=i.getBoundingClientRect()).left<8?y=8-d.left:d.right>v-8&&(y=-(d.right-v+8)),d.top>8?(i.style.top=(h.top+h.height/2-p.top).toFixed(2)+"px",i.style.transform="translate3d("+(0==y?"-50%":"calc(-50% + "+y+"px)")+",calc(-100% - "+f+"px - 0.75em),0)",b.style.transform="translate3d(calc(-50% - "+y+"px),0,0)",b.style.top="calc(100% - 1px)",b.style["border-top"]="0.5em solid "+a,b.style["border-right"]="0.5em solid transparent",b.style["border-bottom"]="",b.style["border-left"]="0.5em solid transparent"):(i.style.top=(h.top+h.height/2-p.top).toFixed(2)+"px",i.style.transform="translate3d("+(0==y?"-50%":"calc(-50% + "+y+"px)")+",calc("+f+"px + 0.75em),0)",b.style.transform="translate3d(calc(-50% - "+y+"px),-100%,0)",b.style.top="1px",b.style["border-top"]="",b.style["border-right"]="0.5em solid transparent",b.style["border-bottom"]="0.5em solid "+a,b.style["border-left"]="0.5em solid transparent"),"function"==typeof n.show&&n.show.call(this,r,n),n._alltips.active=this,this},this.getTooltip=function(t){t||(t=r.querySelector("path,.marker"))||(t=r);var e="";return!e&&t.querySelector("title")&&(e=t.querySelector("title").innerHTML),!e&&r.querySelector("title")&&(e=r.querySelector("title").innerHTML),e||(e=r.getAttribute("title")),e||(e=r.getAttribute("aria-label")),e||(e=t.getAttribute("aria-label")),e},this.clear=function(){n._group?n._group.clear():n._alltips.clear(),"function"!=typeof n.clear||n._alltips.locked||n.clear.call(this,r,n)},this.lock=function(){return n._alltips.locked&&this.unlock(),n._alltips.locked=this,r.classList.add("selected"),a.classList.add("locked"),this},this.unlock=function(){n._alltips.locked=null;for(var t=a.querySelectorAll(".selected"),e=0;e<t.length;e++)t[e].classList.remove("selected");return a.classList.remove("locked"),this},this.toggle=function(){return this==n._alltips.active?this.clear():this.show(),this},this.toggleLock=function(){return n._alltips.locked?this.unlock():this.lock()},i("click",r,{this:this,attr:n},function(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation();var e=t.data.attr._alltips&&"locked"in t.data.attr._alltips&&"object"==typeof t.data.attr._alltips.locked&&null!=t.data.attr._alltips.locked&&this.el==t.data.attr._alltips.locked.el;e&&this.unlock(),this.toggle(),this.show(),e||this.lock()}),i("focus",r,{this:this},function(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),this.show()}),i("mouseover",n["hover-element"]||r,{this:this},function(t){t.preventDefault(),t.stopPropagation(),n._alltips.locked||this.show()}),i("touchstart",r,{this:this},function(t){t.preventDefault(),t.stopPropagation(),this.toggle()}),this}function a(t){return(t/=255)<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)}function l(t){return parseInt(t,16)}function s(t){return.2126*a(t[0])+.7152*a(t[1])+.0722*a(t[2])}function c(t,e){var r=s(t),i=s(e);if(r<i){var o=i;i=r,r=o}return(r+.05)/(i+.05)}function u(t){var e=[];if(0==t.indexOf("#"))e=[l(t.substring(1,3)),l(t.substring(3,5)),l(t.substring(5,7))];else if(0==t.indexOf("rgb")){var r=t.match(/[0-9\.]+/g);4==r.length&&(this.alpha=parseFloat(r[3])),e=[parseInt(r[0]),parseInt(r[1]),parseInt(r[2])]}return e}e.OI.Tooltips||(e.OI.Tooltips=new function(){var t,e=[],r=[];return this.locked=!1,this.active=null,this.getGroup=function(t){for(var e=0;e<r.length;e++)if(r[e].el==t)return r[e]},this.makeGroup=function(t,e){var o=this.getGroup(t);return void 0===o&&(o=new function(t,e,r){return this.el=e,this.tips=[],e.setAttribute("tabindex",0),this.create=function(t,e){e||(e={});for(var r=[],i=0;i<t.length;i++)r.push(this.add(t[i],e));return r},this.add=function(e,r){r||(r={}),r._group=this,r._alltips=t;var i=new n(e,r);return this.tips.push(i),i},this.clear=function(){t.clear();for(var e=0;e<this.tips.length;e++)this.tips[e]!==t.active&&this.tips[e].el.removeAttribute("tabindex");return this},i("keydown",e,{this:this},function(e){e.key in r.keymap&&(e.preventDefault(),e.stopPropagation(),r.keymap[e.key].apply(this,[e,t]))}),this}(this,t,e),r.push(o)),o},this.addGroup=function(t,r,i){i||(i={});var o=this.makeGroup(t,i);return"string"==typeof r&&(r=t.querySelectorAll(r)),e.push.apply(e,o.create(r,i)),this},this.addGroupItem=function(t,r,i){i||(i={});var o=this.makeGroup(t).create([r],i);return e.push.apply(e,o),o[0]},this.add=function(t,r){r||(r={}),r._alltips=this;var i=new n(t,r);return e.push(i),i},this.create=function(){return t||((t=document.createElement("div")).innerHTML='<div class="inner" style="background: #b2b2b2;position:relative;"></div><div class="arrow" style="position:absolute;width:0;height:0;border:0.5em solid transparent;border-bottom:0;left:50%;top:calc(100% - 1px);transform:translate3d(-50%,0,0);border-color:transparent;border-top-color:#aaaaaa;"></div>',function(t,e){for(var r=0;r<e.length;r++)t.classList.add(e[r])}(t,["tooltip"])),t},this.get=function(t){for(var r=0;r<e.length;r++)if(e[r].el==t)return e[r];return!1},this.activate=function(t){var e=this.get(t);e&&(e.show(),e.el.focus(),e.lock())},this.getTips=function(){return e},this.update=function(){this.active&&this.active.show()},this.clear=function(){return this.locked||(t&&t.parentNode&&t.parentNode.removeChild(t),t=null,this.active=null),this},this}),e.OI.contrastColour||(e.OI.contrastColour=function(t){var e=u(t),r={black:[0,0,0],white:[255,255,255]},i=0,o="white";for(var n in r)if(r[n]){var a=c(e,r[n]);a>i&&(i=a,o=n)}return i<4.5&&console.warn("Text contrast poor ("+i.toFixed(1)+") for %c"+t+"%c","background:"+t+";color:"+o,"background:none;color:inherit;"),o})}(window||this);