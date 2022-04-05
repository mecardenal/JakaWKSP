var animate1 = {
  // X & Y positions
  X: function(x) {
    return animate1.canvas.width / 2 + x;
  },

  Y: function(y) {
    return animate1.canvas.height / 2 - y;
  },

  Circle: function(i) {
    this.r = animate1.radius - i * animate1.radius / animate1.circles.length;
    this.e = i % 4 ? true : false;
    this.max = Math.random() * animate1.noise;
    this.min = -Math.random() * animate1.noise;
    this.val = Math.random() * (this.max - this.min) + this.min;
  },

  Clear: function() {
    animate1.ctx.fillStyle = animate1.color.bg;
    animate1.ctx.fillRect(0, 0, animate1.canvas.width, animate1.canvas.height);
  },

  // changing of shape
  Change: function(C) {
    for (var i = 0; i < animate1.density; i = i + 0.8) { // 0.5 | 1
      var a = i * Math.PI * 2 / animate1.density; // 2 = full circle
      var x = Math.cos(a) * (C.r - C.val * Math.cos(i / 2));
      var y = Math.sin(a) * (C.r - C.val * Math.cos(i / 6));
      animate1.ctx.fillStyle = animate1.color.ink;
      animate1.ctx.fillRect(animate1.X(x), animate1.Y(y), 1, 1);
    }
    animate1.Check(C);
  },

  //noise level checks | in-out
  Check: function(c) {
    c.val = c.e ? c.val + animate1.speed : c.val - animate1.speed;
    if (c.val < c.min) {
      c.e = true;
      c.max = Math.random() * animate1.noise;
    }
    if (c.val > c.max) {
      c.e = false;
      c.min = -Math.random() * animate1.noise;
    }
  },

  Update: function() {
    animate1.Clear();
    for (var i = 0; i < animate1.circles.length; i++) {
      animate1.Change(animate1.circles[i]);
    }
  },

  Draw: function() {
    animate1.Update();
    window.requestAnimationFrame(animate1.Draw);
  },

  //set circles
  Set: function() {
    for (var i = 0; i < animate1.circles.length; i++) {
      animate1.circles[i] = new animate1.Circle(i);
			//console.log(animate1.circles[i]);
    }
		//console.log(animate1.circles);
  },

  Init: function() {
		//console.info("INIT");
		//console.log();
		//console.log("window.innerWidth: " + window.innerWidth + " | window.innerHeight: " + window.innerHeight);
		//window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;

		animate1.canvas = document.getElementById('animation1'); //document.querySelector('canvas');
    animate1.ctx = animate1.canvas.getContext('2d');

		animate1.density = 2050;
		animate1.noise = 127;
	  animate1.speed = 0.74;
	  animate1.color = { bg: 'rgba(242, 255, 73, 1)', ink: 'rgba(251, 98, 246, .5)' };

		animate1.circles = new Array(Math.floor(Math.random()*10) + 2);
		//animate1.circles = new Array(1);
		animate1.canvas.width = window.innerWidth > 500 ? 400 : window.innerWidth;
		animate1.canvas.height = animate1.canvas.width;
  	animate1.radius = Math.floor(animate1.canvas.width / 2 - animate1.noise - 2);

		c_left = document.getElementById('animation1').offsetLeft;
		m_left = 0;
		w_part = Math.floor(animate1.canvas.width / 2);
		if (c_left > w_part) {
			m_left = c_left - w_part;
		}

		//document.getElementById('test').innerText = "margin-left: " + m_left + " | part: " + w_part + " | left: " + document.getElementsByClassName('container')[0].offsetLeft;
		document.getElementById('animation1').style.marginLeft = m_left + "px";

    animate1.Set();
    animate1.Draw();
  }
};


window.addEventListener('load', function(){animate1.Init();});
window.addEventListener('resize',function(){animate1.Init();},false);
