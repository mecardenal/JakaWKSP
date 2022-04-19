var animateB = {
  // X & Y positions
  X: function(x) {
    return animateB.canvas.width / 2 + x;
  },

  Y: function(y) {
    return animateB.canvas.height / 2 - y;
  },

  Circle: function(i) {
    this.r = animateB.radius - i * animateB.radius / animateB.circles.length;
    this.e = i % 5 ? true : false;
    this.max = Math.random() * animateB.noise;
    this.min = -Math.random() * animateB.noise;
    this.val = Math.random() * (this.max - this.min) + this.min;
  },

  Clear: function() {
    animateB.ctx.fillStyle = animateB.color.bg;
  //  animateB.ctx.fillRect(0, 0, animateB.canvas.width, animateB.canvas.height);
    animateB.ctx.clearRect(0, 0, animateB.canvas.width, animateB.canvas.height);
  },

  // changing of shape
  Change: function(C) {
    for (var i = 0; i < animateB.density; i = i + 0.1) { // 0.5 | 1
      var a = i * Math.PI * 2 / animateB.density; // 2 = full circle
      var x = Math.cos(a) * (C.r - C.val * Math.cos(i / 100));
      var y = Math.sin(a) * (C.r - C.val * Math.cos(i / 100));
      animateB.ctx.fillStyle = animateB.color.ink;
      animateB.ctx.fillRect(animateB.X(x), animateB.Y(y), 1, 1);
    }
    animateB.Check(C);
  },

  //noise level checks | in-out
  Check: function(c) {
    c.val = c.e ? c.val + animateB.speed : c.val - animateB.speed;
    if (c.val < c.min) {
      c.e = true;
      c.max = Math.random() * animateB.noise;
    }
    if (c.val > c.max) {
      c.e = false;
      c.min = -Math.random() * animateB.noise;
    }
  },

  Update: function() {
    animateB.Clear();
    for (var i = 0; i < animateB.circles.length; i++) {
      animateB.Change(animateB.circles[i]);
    }
  },

  Draw: function() {
    animateB.Update();
    window.requestAnimationFrame(animateB.Draw);
  },

  //set circles
  Set: function() {
    for (var i = 0; i < animateB.circles.length; i++) {
      animateB.circles[i] = new animateB.Circle(i);
			//console.log(animateB.circles[i]);
    }
		//console.log(animateB.circles);
  },

  Init: function() {
		//console.info("INIT");
		//console.log();
		//console.log("window.innerWidth: " + window.innerWidth + " | window.innerHeight: " + window.innerHeight);
		//window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;

		animateB.canvas = document.getElementById('animationB'); //document.querySelector('canvas');
    animateB.ctx = animateB.canvas.getContext('2d');

		animateB.density = 450;
		animateB.noise = 1250;
	  animateB.speed = 2.84;
	  animateB.color = { bg: 'pink', ink: 'red' };

		animateB.circles = new Array(Math.floor(Math.random()*50));
		//animateB.circles = new Array(1);
		animateB.canvas.width = window.innerWidth > 500 ? 400 : window.innerWidth;
		animateB.canvas.height = animateB.canvas.width;
  	animateB.radius = Math.floor(animateB.canvas.width / 10 - animateB.noise - 2);

		c_left = document.getElementById('animationB').offsetLeft;
		m_left = 0;
		w_part = Math.floor(animateB.canvas.width / 2);
		if (c_left > w_part) {
			m_left = c_left - w_part;
		}

		//document.getElementById('test').innerText = "margin-left: " + m_left + " | part: " + w_part + " | left: " + document.getElementsByClassName('container')[0].offsetLeft;
		document.getElementById('animationB').style.marginLeft = m_left + "px";

    animateB.Set();
    animateB.Draw();
  }
};



window.addEventListener('load', function(){animateB.Init();});
window.addEventListener('resize',function(){animateB.Init();},false);
