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
    this.e = i % 2 ? true : false;
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
    for (var i = 0; i < animate.density; i = i + 0.5) { // 0.5 | 1
      var a = i * Math.PI * 2 / animate.density; // 2 = full circle
      var x = Math.cos(a) * (C.r - C.val * Math.sin(i / 4));
      var y = Math.sin(a) * (C.r - C.val * Math.sin(i / 4));
      animate.ctx.fillStyle = animate.color.ink;
      animate.ctx.fillRect(animate.X(x), animate.Y(y), 10, 10);
    }
    animate.ChangeColor();
    animate.Check(C);
  },

  // change color of a complete "circle"
  ChangeColor: function() {
        // random change of color
//        var colorrand = "#"   Math.floor(Math.random()*16777215).toString(16);
//        animate.color.ink = colorrand;

        //Math.floor(Math.random()*3);
        //console.log("CHANGE! "   colorrand);


        animate.colorsindex++; if (animate.colorsindex > 3) animate.colorsindex = 0;
        animate.color.ink = animate.colors[animate.colorsindex];
         //= ['#FF0000', '#00FF00', '#0000FF', '#000000'];
         //console.log("index: " + animate.colorsindex + " || color: " + animate.colors[animate.colorsindex]);

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
    }
		//console.log(animate.circles);
  },

  Init: function() {
		//console.info("INIT");
		//console.log();
		//console.log("window.innerWidth: "   window.innerWidth   " | window.innerHeight: "   window.innerHeight);
		//window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;

		animate.canvas = document.getElementById('animation'); //document.querySelector('canvas');
    animate.ctx = animate.canvas.getContext('2d');

		animate.density = 150;
		animate.noise = 127;
	  animate.speed = 0.84;
	  animate.color = { bg: 'rgba(255, 255, 255, 1)', ink: 'rgba(0, 0, 0, .5)' };

		animate.circles = new Array(4); //new Array(Math.floor(Math.random()*6)   2); // 16, 12
		//animate.circles = new Array(1);
    animate.canvas.width = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
		animate.canvas.height = animate.canvas.width;
  	animate.radius = Math.floor(animate.canvas.width / 2 - animate.noise - 2);

    animate.colors = ['#FF0000', '#00FF00', '#0000FF', '#000000'];
    animate.colorsindex = 0;

    c_left = document.getElementById('animation').offsetLeft;
    m_left = 0;
    w_part = Math.floor(animate.canvas.width / 10);
    if (c_left > w_part) {
      m_left = c_left - w_part;
    }

		//document.getElementById('animation').style.marginLeft = m_left + "px";

    animate.Set();
    animate.Draw();
  }
};

  window.addEventListener('load', function(){animate.Init();});
  window.addEventListener('resize',function(){animate.Init();},false);
  animate.Init();