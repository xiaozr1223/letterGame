/*
* @Author: Administrator
* @Date:   2017-05-10 17:48:54
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-11 17:32:28
*/

'use strict';
function Game(){
	// this.charArr=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

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
	this.scroeEle=document.querySelector('.scroe');
	this.lifeEle=document.querySelector('.life');
	this.gqEle=document.querySelector('.gq');
}
//Game.prototype.start=function(){}
Game.prototype={
	start:function(){
		this.createElement(this.charlength);
		this.drop();
		this.key();

	},
	createElement:function(length){
		for(let i=0;i<length;i++){
			this.getChar();
		}
	},
	getChar:function(){
		let num=Math.floor(Math.random()*this.charArr.length);

		while(this.checkRecept(this.charArr[num][0])){
			num=Math.floor(Math.random()*this.charArr.length);
		}
		let lefts=Math.random()*(this.cw-200)+100;
		let tops=Math.random()*100;

		while(this.checkPos(lefts)){
			lefts=Math.random()*(this.cw-200)+100;
		}
		let ele=document.createElement('div');
		ele.innerText=this.charArr[num][0];
		document.body.appendChild(ele);
		ele.style.cssText=`
		 width:80px; height:80px; background-image: url(${this.charArr[num][1]});
	     background-repeat: no-repeat; background-size: cover; border-radius: 50%;
		 text-align: center; line-height: 50px; font-size: 0;
		 position: absolute; top:${tops}px; left:${lefts}px;
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
		return this.currentPos.some(function(value){
			return (value+80>lefts&&lefts+80>value);
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
					self.lifeEle.innerText=self.life;
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
		},700)
	},

	key:function(){
		// var scroe=this.scroe;
		document.body.onkeydown=function(e){
			let code=String.fromCharCode(e.keyCode);
			for(let i=0;i<this.current.length;i++){
				if(code==this.current[i].innerText){
					document.body.removeChild(this.current[i]);
					this.current.splice(i,1);
					this.currentPos.splice(i,1);
					this.getChar();
					// this.scroe++;
					++this.scroe;
					this.scroeEle.innerText=this.scroe;

					// this.scroeEle.innerText=++this.scroe;	
					if(this.scroe==this.okscroe){
						this.next();
					}		
				}
			}	
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

		this.scroe=0;
		this.life=10;
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

		this.charlength++;
		this.okscroe+=10;

		this.start();
	}


}