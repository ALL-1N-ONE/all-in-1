var site = site || {};
site.window = $(window);
site.document = $(document);
site.Width = site.window.width();
site.Height = site.window.height();

var Background = function() {};

Background.headparticle = function() {    

   if ( !Modernizr.webgl ) {
      alert('Your browser doesn\'t support WebGL');
      return;
   }

   var camera, scene, renderer;
   var mouseX = 0, mouseY = 0;
   var p;

   var windowHalfX = site.Width / 2;
   var windowHalfY = site.Height / 2;

   Background.camera = new THREE.PerspectiveCamera( 35, site.Width / site.Height, 1, 2000 );
   Background.camera.position.z = 300;

   // scene
   Background.scene = new THREE.Scene();

   // particles geometry & material
   var p_geom = new THREE.Geometry();
   var p_material = new THREE.ParticleBasicMaterial({
      color: 0x2c3e50,
      size: 1.5
   });

   var techGeometry = new THREE.TorusKnotGeometry( 65, 20, 120, 20 );
   
   $(techGeometry.vertices).each(function() {
      p_geom.vertices.push(new THREE.Vector3(this.x, this.y, this.z));
   });

   p_geom.verticesNeedUpdate = true;

   p = new THREE.ParticleSystem(p_geom, p_material);
   p.position.y = -15; 
   
   Background.scene.add(p);

   Background.renderer = new THREE.WebGLRenderer({ alpha: true });
   Background.renderer.setSize( site.Width, site.Height );
   Background.renderer.setClearColor(0x000000, 0);

   $('.particlehead').append(Background.renderer.domElement);
   site.window.on('mousemove', onDocumentMouseMove);
   site.window.on('resize', onWindowResize);

   function onWindowResize() {
      site.Width = site.window.width();
      site.Height = site.window.height();
      windowHalfX = site.Width / 2;
      windowHalfY = site.Height / 2;

      Background.camera.aspect = site.Width / site.Height;
      Background.camera.updateProjectionMatrix();

      Background.renderer.setSize( site.Width, site.Height );
   }

   function onDocumentMouseMove( event ) {
      mouseX = ( event.clientX - windowHalfX ) / -2;
      mouseY = ( event.clientY - windowHalfY ) / -2;
   }

   function render() {
      Background.camera.position.x += ( (mouseX * .5) - Background.camera.position.x ) * .05;
      Background.camera.position.y += ( -(mouseY * .5) - Background.camera.position.y ) * .05;

      Background.camera.lookAt( Background.scene.position );
      Background.renderer.render( Background.scene, Background.camera );
   }

   TweenMax.ticker.addEventListener("tick", render);
   render();
};

Background.headparticle();