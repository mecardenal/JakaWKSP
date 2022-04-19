var animateA = {
  // X & Y positions
  X: function(x) {
    return animateA.canvas.width / 2 + x;
  },

  Y: function(y) {
    return animateA.canvas.height / 2 - y;
  },

  Circle: function(i) {
    this.r = animateA.radius - i * animateA.radius / animateA.circles.length;
    this.e = i % 2 ? true : false;
    this.max = Math.random() * animateA.noise;
    this.min = -Math.random() * animateA.noise;
    this.val = Math.random() * (this.max - this.min) + this.min;


  //  this.color = animateA.color.ink[Math.floor(Math.random()*animateA.color.ink.length)] + "40";

  },

  Clear: function() {
    animateA.ctx.fillStyle = animateA.color.bg;
    animateA.ctx.fillRect(0, 0, animateA.canvas.width, animateA.canvas.height);
  },

  ChangeColor: function(){
//    console.log("E " + );
    this.color = animateA.color.ink[Math.floor(Math.random()*colors_array[0].length)] + "40";

  },

  // changing of shape
  Change: function(C) {
    for (var i = 0; i < animateA.density; i = i + 0.5) { // 0.5 | 1
      var a = i * Math.PI * 2 / animateA.density; // 2 = full circle
      var x = Math.cos(a) * (C.r - C.val * Math.sin(i / 4));
      var y = Math.sin(a) * (C.r - C.val * Math.cos(i / 2));
      animateA.ctx.fillStyle = C.color;
      animateA.ctx.fillRect(animateA.X(x), animateA.Y(y), 2, 2);
    }

    animateA.ChangeColor();

    animateA.Check(C);
  },





  //noise level checks | in-out
  Check: function(c) {
    c.val = c.e ? c.val + animateA.speed : c.val - animateA.speed;
    if (c.val < c.min) {
      c.e = true;
      c.max = Math.random() * animateA.noise;
    }
    if (c.val > c.max) {
      c.e = false;
      c.min = -Math.random() * animateA.noise;
    }
  },

  Update: function() {
    animateA.Clear();
    for (var i = 0; i < animateA.circles.length; i++) {
      animateA.Change(animateA.circles[i]);
    }
  },

  Draw: function() {
    animateA.Update();
    var now = new Date();
    var timedif =Math.round((now - time0)/1000);

    if(timedif>2){
      animateA.color = { bg: 'black', ink: colors_array[Math.floor(Math.random()*colors_array.length)] };
      window.requestAnimationFrame(animateA.Set);
      time0 = new Date();
    }

    window.requestAnimationFrame(animateA.Draw);
  },

  //set circles
  Set: function() {
    for (var i = 0; i < animateA.circles.length; i++) {
      animateA.circles[i] = new animateA.Circle(i);
			//console.log(animateA.circles[i]);
    }
		//console.log(animateA.circles);
  },

  Init: function() {
		//console.info("INIT");
		//console.log();
		//console.log("window.innerWidth: " + window.innerWidth + " | window.innerHeight: " + window.innerHeight);
		//window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
    var time0 = new Date();
    var colors_array = new Array();
    colors_array[0] =  ["#577590","#F3CA40","#F2A541","#F08A4B","#D78A76"];
    colors_array[1] =  ["#BDEDE0","#BBDBD1","#B6B8D6","#7E78D2","#6F58C9"];
    colors_array[2] =  ["#084c61","#db504a","#e3b505","#4f6d7a","#56a3a6"];

		animateA.canvas = document.getElementById('animationA'); //document.querySelector('canvas');
    animateA.ctx = animateA.canvas.getContext('2d');

    animateA.density = 150;
    animateA.noise = 22.9;
    animateA.speed = 1.5;
	  animateA.color = { bg: 'black', ink:  colors_array[0][0] };

		//animateA.circles = new Array(Math.floor(Math.random()*6) + 2);
		animateA.circles = new Array(5);
		animateA.canvas.width = window.innerWidth > 500 ? 500 : window.innerWidth;
		animateA.canvas.height = animateA.canvas.width;
  	animateA.radius = Math.floor(animateA.canvas.width / 2 - animateA.noise - 2);


		c_left = document.getElementById('animationA').offsetLeft;
		m_left = 0;
		w_part = Math.floor(animateA.canvas.width / 10);
		if (c_left > w_part) {
			m_left = c_left - w_part;
		}

		//document.getElementById('test').innerText = "margin-left: " + m_left + " | part: " + w_part + " | left: " + document.getElementsByClassName('container')[0].offsetLeft;
		document.getElementById('animationA').style.marginLeft = m_left + "px";

    animateA.Set();
    animateA.Draw();
  }
};





//getElementById("button1").addEventListener('click',function(){};);
window.addEventListener('load', function(){animateA.Init();});
window.addEventListener('resize',function(){animateA.Init();},false);
