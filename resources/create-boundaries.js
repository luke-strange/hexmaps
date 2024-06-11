(function(root){

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

	function HexBoundaries(el,attr){

		this.name = "HexBoundaries";
		this.version = "0.1";
		this.attr = attr;
		this.el = el;
		this.id = el.getAttribute('id');
		this.colours = new Colours();
		this.saveable = (typeof Blob==="function");

		var msg = new OI.logger(this.name+' v'+this.version,{el:document.getElementById('messages'),'visible':['info','warning','error']});
		msg.log("Loading");

		var defaults = {'hexjson':undefined,'boundaries':undefined};
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

		if(this.query.hexjson) document.getElementById('hexjson').value = this.query.hexjson;

		this.menubar = new Menubar(document.getElementById('navigation'));

		this.init = function(){
			msg.log("init");
			
			this.updateOptionsFromForm();

			// Add a loading animation
			document.getElementById('loader').innerHTML = '<div class="loader"><svg version="1.1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(.11601 0 0 .11601 -49.537 -39.959)"><path d="m610.92 896.12m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.83333s" repeatCount="indefinite" /></path><path d="m794.82 577.6m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.6666s" repeatCount="indefinite" /></path><path d="m1162.6 577.6m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.5s" repeatCount="indefinite" /></path><path d="m1346.5 896.12m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.3333s" repeatCount="indefinite" /></path><path d="m1162.6 1214.6m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.1666s" repeatCount="indefinite" /></path><path d="m794.82 1214.6m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="0s" repeatCount="indefinite" /></path></g></svg><br />Loading...</div>';

			// Get the HexJSON file if we have one
			if(this.options.hexjson){
				this.loadHexJSON(this.options.hexjson);
			}else{
				document.getElementById('loader').innerHTML = '<div class="loader">Please provide a HexJSON layout to get started...<br />Or <a href="?hexjson=https%3A%2F%2Fraw.githubusercontent.com%2Fodileeds%2Fhexmaps%2Fgh-pages%2Fmaps%2Fuk-constituencies-2023.hexjson">load an example with UK constituencies</a>.</div>';
				document.getElementById('hexjson').classList.add('required');
			}

			//this.menubar.toggle(document.getElementById('menu-options'))

			/* Add events to form fields */
			
			addEv('change',document.getElementById('hexjson'),{this:this},function(e){
				this.updateOptionsFromForm();
				if(this.options.url) document.getElementById('url').classList.remove('required');
			});
			addEv('keyup',document.getElementById('boundaries'),{this:this},function(e){
				this.updateOptionsFromForm(document.getElementById('boundaries').selectionStart);
				this.setBorders();
				resizeTextArea(document.getElementById('boundaries'));
			});
			addEv('click',document.getElementById('boundaries'),{this:this},function(e){
				this.updateOptionsFromForm(document.getElementById('boundaries').selectionStart);
				this.setBorders();
				resizeTextArea(document.getElementById('boundaries'));
			});
			addEv('blur',document.getElementById('boundaries'),{this:this},function(e){
				this.updateOptionsFromForm(-1);
				this.setBorders();
			});
			var heightLimit = 400;
			function resizeTextArea(ta){
				ta.style.height = ""; /* Reset the height*/
				ta.style.height = Math.min(ta.scrollHeight, heightLimit) + "px";
			};
			resizeTextArea(document.getElementById('boundaries'))

			if(this.saveable){
				var div = document.createElement('div');
				div.classList.add('save');
				div.innerHTML += '<button class="c10-bg" id="save-hex">HexJSON</button>';
				document.getElementById('saves').appendChild(div);
				var _obj = this;
				div.querySelector('#save-hex').addEventListener('click',function(){ _obj.save(); });
			}
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

			function cleanBoundaries(txt){
				txt = '\n\t\"boundaries\": '+txt;
				txt = txt.replace(/\{\"([^\"]+)\":\{\"type\":/g,function(m,p1){ return '{\n\t\t"'+p1+'":{\n\t\t\t"type":'; });
				txt = txt.replace(/,\"edges\":\[/,',\n\t\t\t"edges":[\n\t\t');
				txt = txt.replace(/{\"q\"/g,'\t\t{"q"');
				txt = txt.replace(/\]\}\}/,'\n\t\t\t]\n\t\t}\n\t}');
				return txt;
			}
			if(!str){
				var hexjson = {};
				if(typeof this.hex.mapping.version==="string") hexjson.version = this.hex.mapping.version;
				if(typeof this.hex.mapping.version==="string") hexjson.layout = this.hex.mapping.layout;
				if(typeof this.hex.mapping.hexes==="object") hexjson.hexes = this.hex.mapping.hexes;
				if(typeof this.hex.mapping.boundaries==="object") hexjson.boundaries = this.hex.mapping.boundaries;
				
				str = JSON.stringify(hexjson,null,'\t');
				str = str.replace(/\n\t{3,}/gs,"");
				str = str.replace(/\n\t{2,}\}/gs,"}");
				str = str.replace(/": /g,'":');
			}
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

		this.updateOptionsFromForm = function(s){
			msg.log("updateOptionsFromForm");
			this.options.hexjson = document.getElementById('hexjson').value;
			this.options.boundaries = simple2boundaries(document.getElementById('boundaries').value);
			var txt = document.getElementById('boundaries').value;
			if(txt[s]!="{"){
				// Find '{' before this point
				var before = txt.substr(0,s);
				if(before.match(/"edges":[\n\t\s]*\[[\n\t\s]*\]/s)){
					// No edges exist to just move to start of the "edges" value
					s = before.indexOf('"edges"');
				}else{
					// Find the last "{" before the cursor point
					var idx = before.lastIndexOf("{");
					s = (idx >= 0) ? idx : -1;
				}
			}
			this.highlighted = {};
			if(s >= 0){
				var id = txt.substr(0,s).replace(/^.*"([^\"]+)":{[\n\t]*"type".*?$/s,function(m,p1){ return p1; });
				txt = txt.substr(s,).replace(/}.*/gs,'}').replace(/^.*\{"q"/gs,'{"q"').replace(/\}\n\}/gs,'}');
				if(txt.match(/"edges":[\n\t\s]*\[[\n\t\s]*\]/s)) txt = "[]";
				try {
					this.highlighted = {'id':id,'edge':JSON.parse(txt)};
				}catch(err){
					msg.warn("Not valid JSON: "+txt);
				}
			}
			return this;
		};


		this.loadHexJSON = function(url){
			msg.info('Loading HexJSON layout from <em>'+url+'</em>'+(url.indexOf('http')==0 ? ' ⚠️ external source':''),{'id':'load-hexjson'});
			fetch(url,{}).then(response => {
				if(!response.ok) throw new Error('Network response was not OK');
				return response.json();
			}).then(json => {
				this.hexjson = json;
				if("boundaries" in json && !document.getElementById('boundaries').value){
					document.getElementById('boundaries').value = boundaries2simple(json.boundaries);
					this.options.boundaries = json.boundaries;
				}
				this.process();
				msg.remove('load-hexjson');
			}).catch(error => {
				msg.remove('load-hexjson');
				msg.error('There has been a problem loading the HexJSON from <em>%c'+url+'%c</em>','font-style:italic;','font-style:normal;',{'fade':10000,'error':error});
			});
			return this;
		};


		this.setBorders = function(){
			msg.log('setBorders');
			if(this.hexjson) this.hexjson.boundaries = clone(this.options.boundaries);
			this.hex.mapping.boundaries = clone(this.options.boundaries);
			// Add in any currently highlighted line segment
			if(this.highlighted && "edge" in this.highlighted) this.hex.mapping.boundaries._fake = {'type':'_highlight','edges':[this.highlighted.edge]};
			this.hex.drawBoundaries();
			this.hex.updateBoundaries(function(n,props){
				if(props.type=="_highlight") return {'stroke':'black','stroke-width':4,'stroke-linecap':'round','opacity':1};
				else return {'stroke':'black','stroke-width':2,'stroke-linecap':'round','opacity':0.9};
			});
			if("_fake" in this.hex.mapping.boundaries) delete this.hex.mapping.boundaries._fake;
			return this;
		};

		this.setColours = function(hex){
			msg.log('setColours',hex);
			if(!hex && "hex" in this) hex = this.hex;
			if(hex){
				hex.updateColours(function(a){
					var c = this.areas[a].data.colour;
					var contrast = contrastColour(c);
					var spans = this.areas[a].label.querySelectorAll('tspan');
					for(var s = 0; s < spans.length; s++) spans[s].setAttribute('fill',contrast);
					return c;
				});

			}
			return this;
		};
		
		this.process = function(){

			msg.log('process');

			var _obj = this;

			document.getElementById('loader').innerHTML = "";
			this.hex = new OI.hexmap(document.getElementById('hexmap'),{
				'hexjson': this.hexjson,
				'label':{
					'show': true,
					'clip': true,
					'format': function(txt,attr){
						return attr.hex.q+','+attr.hex.r;
					}
				},
				'tooltip': {
					'format': function(txt,attr){
						txt += "";
						// Don't allow HTML
						return attr.hex.q+','+attr.hex.r+'\n'+txt.replace(/<[^\>]*>/g,"").replace(/\\n/g,"<br />");
					}
				},
				'style': {
					'selected':{'fill-opacity':1, 'fill':'' },
					'default':{'fill-opacity':1,'fill':'#bb96d3','stroke':(this.options.borders ? '#ffffff':'transparent')},
					'grid':{'fill-opacity':0.1,'fill':'#ccc'}
				},
				'ready':function(){
					// Update the line styles
					_obj.setBorders();
				}
			});
			this.hex.on('click',{this:this},function(e){
				// Work out which edge is clicked
				// Get the bounding box and find the centre of the element
				var bbox = e.target.getBoundingClientRect();
				var a = angle({'x':bbox.left + bbox.width/2,'y':bbox.top + bbox.height/2},{'x':e.clientX,'y':e.clientY},90);
				var side = Math.floor(a/60)+1;
				var data = {'q':e.data.data.q,'r':e.data.data.r,'e':side};
				if("id" in this.highlighted){
					this.options.boundaries[this.highlighted.id].edges.push(data);
					// Update textarea
					document.getElementById('boundaries').value = boundaries2simple(this.options.boundaries);
					this.highlighted.edge = data;
					this.setBorders();
				}
			});
			return this;
		};
		
		return this;
	}
	function angle(c, e, offset) {
		var dy = e.y - c.y;
		var dx = e.x - c.x;
		var theta = Math.atan2(dy, dx); // range (-PI, PI]
		theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
		theta += offset;
		if (theta < 0) theta = 360 + theta; // range [0, 360)
		return theta;
	}
	function boundaries2simple(txt){
		if("_fake" in txt) delete txt["_fake"];
		txt = JSON.stringify(txt||{});
		return txt;
	}
	function simple2boundaries(txt){
		if(!txt) txt = "{}";
		var json = {};
		try {
			json = JSON.parse(txt);
		}catch(e){
			console.error('Unable to parse boundaries from:',txt);
		}
		if("_fake" in json) delete json["_fake"];
		return json;
	}

	OI.HexBoundaries = HexBoundaries;

	function Menubar(el,attr){
		if(!attr) attr = {'on':['on','b5-bg'],'off':['off','b1-bg']};
		var is = el.querySelectorAll('[role=menuitem]');
		var items = [];
		for(var i = 0; i < is.length; i++){
			items.push({
				'btn':is[i],
				'panel':document.getElementById(is[i].getAttribute('aria-controls'))
			});
		}
		this.hide = function(item){
			item.btn.classList.remove(...attr.on);
			item.btn.classList.add(...attr.off);
			item.panel.style.display = "none";
			return this;
		}
		this.show = function(item){
			item.panel.style.display = "";
			item.btn.classList.remove(...attr.off);
			item.btn.classList.add(...attr.on);
			return this;
		}
		this.toggle = function(btn){
			for(var i = 0; i < items.length; i++){
				if(btn==items[i].btn){
					if(isVisible(items[i].panel)) this.hide(items[i]);
					else this.show(items[i]);
				}else this.hide(items[i]);
			}
		};
		for(var i = 0; i < items.length; i++){
			if(items[i].panel) addEv('click',items[i].btn,{this:this,btn:items[i].btn},function(e){ this.toggle(e.data.btn); });
			// Turn the menu item off
			this.hide(items[i]);
		}
		return this;
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
	root.OI = OI||root.OI||{};
	
})(window || this);
