var renderer  = new THREE.WebGLRenderer({
    antialias : true
  });
  renderer.setSize( window.innerWidth, window.innerHeight / 3);
/* Add it to HTML */
  $('header.main-header').append( renderer.domElement );
  var onRenderFcts= [];
  var scene = new THREE.Scene();
  var camera  = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.01, 150);
  camera.position.z = 15;
  camera.position.y = 2.5;
  camera.rotation.z = 180 * Math.PI / 180;
  scene.fog = new THREE.Fog(0xFFFFFF, 0, 14);
  ;(function(){
    var light = new THREE.AmbientLight( 0x202020 );
    scene.add( light );
    light = new THREE.DirectionalLight('white', 6);
    light.position.set(0.5, 0.0, 2);
    scene.add( light );
    light = new THREE.DirectionalLight('white', 0.75*2);
    light.position.set(-1.5, -0.5, -1);
    scene.add( light );
  })();
  var heightMap = THREEx.Terrain.allocateHeightMap(50,190);
  THREEx.Terrain.simplexHeightMap(heightMap);
  var geometry  = THREEx.Terrain.heightMapToPlaneGeometry(heightMap);
  THREEx.Terrain.heightMapToVertexColor(heightMap, geometry);
  var material  = new THREE.MeshBasicMaterial({
    wireframe: true,
     color: 0xBEC0C3
  });
  var mesh  = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  mesh.lookAt(new THREE.Vector3(0,1,0));
  mesh.scale.y  = 1.5;
  mesh.scale.x  = 3;
  mesh.scale.z  = 0.25;
  mesh.scale.multiplyScalar(10);
  onRenderFcts.push(function(delta, now){
    mesh.rotation.z += 0.1 * delta;
  });
  onRenderFcts.push(function(){
    renderer.render( scene, camera );
  });
  var lastTimeMsec= null;
  requestAnimationFrame(function animate(nowMsec){
    requestAnimationFrame( animate );
    lastTimeMsec  = lastTimeMsec || nowMsec-100/60;
    var deltaMsec = Math.min(10, nowMsec - lastTimeMsec);
    lastTimeMsec  = nowMsec;
    onRenderFcts.forEach(function(onRenderFct){
      onRenderFct(deltaMsec/1000, nowMsec/1000);
    });
  });
