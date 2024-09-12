// OI Menu component v0.1
(function(root){

	var OI = root.OI || {};
	if(!OI.ready){
		OI.ready = function(fn){
			// Version 1.1
			if(document.readyState != 'loading') fn();
			else document.addEventListener('DOMContentLoaded', fn);
		};
	}
	root.OI = OI||root.OI||{};

	function setAttr(el,prop){
		for(var p in prop) el.setAttribute(p,prop[p]);
		return el;
	}
	function addEl(typ,to,opts){
		if(!opts) opts = {};
		btn = document.createElement(typ);
		if(opts.id) btn.setAttribute('id',opts.id);
		if(opts.class) btn.classList.add(...opts.class.split(/ /));
		if(opts.on){
			for(ev in opts.on){
				if(ev == "click"){
					btn.addEventListener(ev,opts.on[ev]);
				}
			}
		}
		if(opts.text) btn.innerHTML = opts.text;
		to.append(btn);
		return btn;
	}
	function addEv(ev,el,data,fn){
		el.addEventListener(ev,function(e){
			e.data = data;
			fn.call(data.this||this,e);
		});
	}
	function NavBarItem(parent,opts){
		if(!opts) return this;
		if(typeof opts.index!=="number") opts.index = 0;
		var el = addEl((opts.type=="button" ? 'button' : 'li'),parent.el,opts);
		this.el = el;
		this.id = opts.id;
		this.index = -1;
		if(opts.altkey) this.altkey = opts.altkey;
		var items = [];

		setAttr(el,{'role':'menuitem','aria-expanded':false,'tabindex':(opts.index==0 ? 0 : -1)});

		addEv("focus",el,{me:this},function(e){
			e.stopPropagation();
			e.preventDefault();
			e.data.me.index = -1;
		});
		addEv('click',el,{me:this},function(e){
			if(e.data.me.isOpen()) e.data.me.close();
			else e.data.me.open();
		});
		addEv('keydown',el,{me:this},function(e){
			var prevdef = false;
			var k = { tab:9,enter:13,esc:27,space:32,left:37,up:38,right:39,down:40 };
			switch(e.keyCode){
				case k.right:
					parent.shift(1);
					prevdef = true;
					break;
				case k.left:
					parent.shift(-1);
					prevdef = true;
					break;
				case k.enter:
					if(e.data.me.index < 0){
						e.data.me.open();
					}else{
						items[e.data.me.index].item.click();
					}
					prevdef = true;
					break;
				case k.down:
					e.data.me.shift(1);
					prevdef = true;
					break;
				case k.up:
					e.data.me.shift(-1);
					prevdef = true;
					break;
			}
			if(prevdef) e.preventDefault();
		});

		this.add = function(opts){
			if(items.length == 0){
				this.ul = addEl('ul',this.el);
				setAttr(this.ul,{'role':'menu'});
				setAttr(this.el,{'aria-haspopup':true});
			}
			var li = addEl('li',this.ul);
			setAttr(li,{'role':'menuitem','tabindex':-1,'aria-label':opts.text||''});
			var item;
			opts.class = (opts.class ? opts.class+' ':'')+'button';
			opts.text = '<span class="label">'+opts.text+'</span>';
			if(opts.html){
				item = addEl('div',li,opts);
				item.innerHTML = opts.html;
			}else{
				item = addEl((opts.type=="button" ? 'button' : 'button'),li,opts);
			}
			setAttr(item,{'tabindex':-1});
			if(opts.icon) item.insertAdjacentHTML('afterbegin',opts.icon);
			if(opts.key) item.insertAdjacentHTML('beforeend','<span class="key">'+opts.key+'</span>');

			if(opts.on && typeof opts.on.init==="function") opts.on.init.call(opts['this']||this,item,opts);
			items.push({'el':li,'item':item});

			// Close the menu
			addEv('click',li,{me:this},function(e){
				e.preventDefault();
				e.stopPropagation();
				e.data.me.close();
			});
			return this;
		};

		this.addSeparator = function(){
			var li = addEl('li',this.ul);
			setAttr(li,{'class':'separator'});
			return this;
		};

		function norm(i){
			return (i + items.length)%items.length;
		}

		this.shift = function(inc){
			if(items.length==0) return this;
			var n = 0;
			var idx = norm(this.index + inc);
			while(items[idx].item.disabled && n < items.length){
				idx = norm(idx + inc);
				n++;
			}
			this.index = idx;
			if(!this.isOpen()) this.open();
			items[this.index].el.focus();
			return this;
		};

		this.isOpen = function(){
			return (el.getAttribute('aria-expanded')=="false" || el.getAttribute('aria-expanded')==null ? false : true);
		};

		this.open = function(){
			if(items.length == 0) return this;
			el.setAttribute('aria-expanded',true);
			parent.closeAllExcept(this);
			return this;
		};

		this.close = function(){
			el.setAttribute('aria-expanded',false);
			return this;
		};

		if(opts.on && typeof opts.on.init==="function") opts.on.init.call(opts['this']||this,btn,opts);
		return this;
	}

	function NavBar(el,opt){
		var items = [],ev,btn;
		if(!opt) opt = {};
		this.index = 0;

		// Create main list
		this.el = addEl('ul',el,{'id':opt.id||'appmenu'});
		setAttr(this.el,{'role':'menubar','aria-label':'functions'});

		this.shift = function(inc){
			this.index = (this.index + inc + items.length)%items.length;
			for(var i = 0; i < items.length; i++){
				if(i==this.index) items[i].el.focus();
				else items[i].close();
			}
			return this;
		};

		this.getItem = function(id){
			var idx = this.getItemIndex(id);
			if(idx >= 0) return items[idx];
			else return null;
		};

		this.getItemIndex = function(id){
			for(var i = 0; i < items.length; i++){
				if(items[i].id==id) return i;
			}
			return -1;
		};

		this.add = function(opts){
			if(!opts || !opts.id && !document.getElementById(opts.id)){
				console.error('No valid ID given for item.');
				return this;
			}
			opts.index = items.length;
			items.push(new NavBarItem(this,opts));
			return this;
		};

		this.closeAllExcept = function(item){
			for(var i = 0; i < items.length; i++){
				if(items[i]!=item) items[i].close();
			}
		};

		return this;
	}

	OI.NavBar = NavBar;

	root.OI = OI||root.OI||{};

})(window || this);