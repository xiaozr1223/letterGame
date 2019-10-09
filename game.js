/*
* @Author: Administrator
* @Date:   2017-05-10 17:48:54
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-13 14:45:27
*/

'use strict';
function Game(){
	this.charArr=[
		['A','img/a.png'],
		['B','img/b.png'],
		['C','img/c.png'],
		['D','img/d.png'],
		['E','img/e.png'],
		['F','img/f.png'],
		['G','img/g.png'],
		['H','img/h.png'],
		['I','img/i.png'],
		['J','img/j.png'],
		['K','img/k.png'],
		['L','img/l.png'],
		['M','img/m.png'],
		['N','img/n.png'],
		['O','img/o.png'],
		['P','img/p.png'],
		['Q','img/q.png'],
		['R','img/r.png'],
		['S','img/s.png'],
		['T','img/t.png'],
		['U','img/u.png'],
		['V','img/v.png'],
		['W','img/w.png'],
		['X','img/x.png'],
		['Y','img/y.png'],
		['Z','img/z.png']
	]
	this.charlength=5;
	this.current=[];
	this.currentPos=[];
	this.cw=window.innerWidth;
	this.speed=10;
	this.scroe=0;
	this.life=10;
	this.okscroe=10;
	this.flag=true; // 开始  暂停
	this.scroeEle=document.querySelector('.scroe');
	this.lifeEle=document.querySelector('.life');
	this.gqEle=document.querySelector('.gq');
	this.ztEle=document.querySelector('.zt');
	this.cxksEle=document.querySelector('.cxks');
}
//Game.prototype.start=function(){}
Game.prototype={
	start:function(){
		this.createElement(this.charlength);
		this.drop();
		this.key();
		this.stop();
		this.cxks();
	},
	createElement:function(length){
		for(let i=0;i<length;i++){
			this.getChar();
		}
	},
	getChar:function(){
		let num=Math.floor(Math.random()*this.charArr.length);

		// 当前页面的字母不重复
		while(this.checkRecept(this.charArr[num][0])){
			num=Math.floor(Math.random()*this.charArr.length);
		}
		let lefts=Math.random()*(this.cw-400)+200;
		let tops=Math.random()*100;

		// 当前页面的位置不离的太近   100px之外
		while(this.checkPos(lefts)){
			lefts=Math.random()*(this.cw-400)+200;
		}
		let ele=document.createElement('div');
		ele.className="chartEle";
		ele.innerText=this.charArr[num][0];
		document.body.appendChild(ele);
		ele.style.cssText=`
		 background-image: url(${this.charArr[num][1]});
	     top:${tops}px; left:${lefts}px;
		`
		this.current.push(ele)
		this.currentPos.push(lefts);
	},
	checkRecept:function(text){
		return this.current.some(function(value){
			return value.innerText==text;
		})
	},
	checkPos:function(lefts){
		// let eleW=this.current[0].offsetWidth;
		// console.log(eleW);
		return this.currentPos.some(function(value){
			return (value+100>lefts&&lefts+100>value);
		})
	},
	drop:function(){
		let self=this;
		this.t=setInterval(function(){
			for(let i=0;i<self.current.length;i++){
				let tops=self.current[i].offsetTop
				self.current[i].style.top=tops+self.speed+'px';
				if(tops>500){
					document.body.removeChild(self.current[i]);
					self.current.splice(i,1);
					self.currentPos.splice(i,1);
					--self.life;
					self.lifeEle.innerText='0'+self.life;
					if(self.life<0){
						let flag=window.confirm('游戏失败，是否继续？')
						if(flag){
							self.restart();
						}else{
							close();
						}
					}	
				}
			}

			if(self.current.length<self.charlength){
				self.getChar();
			}	
		},1000)
	},

	key:function(){
		// var scroe=this.scroe;		
		document.body.onkeydown=function(e){
			if(this.flag==true){
			let code=String.fromCharCode(e.keyCode);
			for(let i=0;i<this.current.length;i++){
				if(code==this.current[i].innerText){
					document.body.removeChild(this.current[i]);
					this.current.splice(i,1);
					this.currentPos.splice(i,1);
					this.getChar();
					// this.scroe++;
					++this.scroe;
					if(this.scroe<10){
						this.scroeEle.innerText='0'+this.scroe;
					}else{
						this.scroeEle.innerText=this.scroe;							
					}
					// this.scroeEle.innerText=++this.scroe;	
					if(this.scroe==this.okscroe){
						this.next();
					}		
				}
			}}	
		}.bind(this)
	},

	restart:function(){
		// alert(1);
		clearInterval(this.t);
		for(let i=0;i<this.current.length;i++){
			document.body.removeChild(this.current[i])
		}
		this.current=[];
		this.currentPos=[];
		document.body.className='one';
		this.scroe='0'+0;
		this.life=10;
		this.speed=5;
		this.gq=1;
		this.charlength=5;
		this.scroeEle.innerText=this.scroe;
		this.lifeEle.innerText=this.life;
		this.gqEle.innerText=this.gq;
		
		this.start();
	},

	next:function(){
		clearInterval(this.t);
		for(let i=0;i<this.current.length;i++){
			document.body.removeChild(this.current[i])
		}
		this.current=[];
		this.currentPos=[];
		let gq=this.gqEle.innerText;
		this.gqEle.innerText=++gq;
		if(gq>3){
			this.speed+=5;
		}else{
			this.charlength++;
		}	
		this.okscroe+=10;
		switch(gq){
			case 2:document.body.className='tow';break;
			case 3:document.body.className='three';break;
			case 4:document.body.className='four';break;
			default:document.body.className='five';
		}
		this.start();
	},
	stop:function(){
		let i=0;
	    this.ztEle.onclick=function(){
			i++;
			console.log(i)
			if(i%2!=0){
				this.flag=false;
				console.log(this.flag);
				clearInterval(this.t);
				this.ztEle.className='ks';					
			}else{
				this.flag=true;
				this.drop();
				this.ztEle.className='zt';
			}
		}.bind(this);	
	},
	cxks:function(){
		this.cxksEle.onclick=function(){
			this.restart();
		}.bind(this);
	}
}