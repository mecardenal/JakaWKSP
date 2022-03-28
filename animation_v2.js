var animate = {
  // X & Y positions
  X: function(x) {
    return animate.canvas.width / 2 + x;
  },

  Y: function(y) {
    return animate.canvas.height / 2 - y;
  },

  Circle: function(i) {
    this.r = animate.radius - i * animate.radius / animate.circles.length;
    this.e = i % 4 ? true : false;
    this.max = Math.random() * animate.noise;
    this.min = -Math.random() * animate.noise;
    this.val = Math.random() * (this.max - this.min) + this.min;
  },

  Clear: function() {
    animate.ctx.fillStyle = animate.color.bg;
    animate.ctx.fillRect(0, 0, animate.canvas.width, animate.canvas.height);
  },

  // changing of shape
  Change: function(C) {
    for (var i = 0; i < animate.density; i = i + 0.8) { // 0.5 | 1
      var a = i * Math.PI * 2 / animate.density; // 2 = full circle
      var x = Math.cos(a) * (C.r - C.val * Math.cos(i / 2));
      var y = Math.sin(a) * (C.r - C.val * Math.cos(i / 6));
      animate.ctx.fillStyle = animate.color.ink;
      animate.ctx.fillRect(animate.X(x), animate.Y(y), 1, 1);
    }
    animate.Check(C);
  },

  //noise level checks | in-out
  Check: function(c) {
    c.val = c.e ? c.val + animate.speed : c.val - animate.speed;
    if (c.val < c.min) {
      c.e = true;
      c.max = Math.random() * animate.noise;
    }
    if (c.val > c.max) {
      c.e = false;
      c.min = -Math.random() * animate.noise;
    }
  },

  Update: function() {
    animate.Clear();
    for (var i = 0; i < animate.circles.length; i++) {
      animate.Change(animate.circles[i]);
    }
  },

  Draw: function() {
    animate.Update();
    window.requestAnimationFrame(animate.Draw);
  },

  //set circles
  Set: function() {
    for (var i = 0; i < animate.circles.length; i++) {
      animate.circles[i] = new animate.Circle(i);
			//console.log(animate.circles[i]);
    }
		//console.log(animate.circles);
  },

  Init: function() {
		//console.info("INIT");
		//console.log();
		//console.log("window.innerWidth: " + window.innerWidth + " | window.innerHeight: " + window.innerHeight);
		//window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;

		animate.canvas = document.getElementById('animation'); //document.querySelector('canvas');
    animate.ctx = animate.canvas.getContext('2d');

		animate.density = 250;
		animate.noise = 200;
	  animate.speed = 0.84;
	  animate.color = { bg: 'rgba(242, 255, 73, 1)', ink: 'rgba(251, 98, 246, .3)' };

		animate.circles = new Array(Math.floor(Math.random()*200));
		//animate.circles = new Array(1);
		animate.canvas.width = window.innerWidth > 500 ? 400 : window.innerWidth;
		animate.canvas.height = animate.canvas.width;
  	animate.radius = Math.floor(animate.canvas.width / 2 - animate.noise - 2);

		c_left = document.getElementsByClassName('container')[0].offsetLeft;
		m_left = 0;
		w_part = Math.floor(animate.canvas.width / 2);
		if (c_left > w_part) {
			m_left = c_left - w_part;
		}

		//document.getElementById('test').innerText = "margin-left: " + m_left + " | part: " + w_part + " | left: " + document.getElementsByClassName('container')[0].offsetLeft;
		document.getElementById('animation').style.marginLeft = m_left + "px";

    animate.Set();
    animate.Draw();
  }
};



window.addEventListener('load', function(){animate.Init();});
window.addEventListener('resize',function(){animate.Init();},false);
