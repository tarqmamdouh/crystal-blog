var container, stats, camera, controls, scene, renderer, cross;

cols = [
  [0xFF0000, 0xDC143C, 0x8B0000, 0xB22222]
];

specs = [
  [0x94e2fc, 0x666666, 0xffffff, 0xa3fff7],
  [0xf9e69f, 0xfcf6b3, 0xd1fcb2, 0xb5ffeb],
  [0xc6658d, 0xaf3f90, 0xbe5fd8, 0xbf8eff],
  [0xff9077, 0xf7a45b, 0xffcc60, 0x2d211b],
  [0xffbfc0, 0xce7da0, 0xb780c9, 0x755689],
  [0xdeeef9, 0xaef2ee, 0xf7c5ca, 0xf6d4f9],
  [0xF44336, 0x1E88E5, 0xFDD835, 0xffffff]
];
alpha = [
  [0.8, 1.0, 0.3, 0.7],
  [0.5, 0.4, 0.6, 0.7],
  [0.4, 0.6, 0.8, 0.9],
  [0.8, 0.7, 0.4, 1.0],
  [0.4, 0.6, 0.8, 1.0],
  [0.7, 0.5, 0.6, 0.7],
  [0.6, 0.6, 0.6, 0.4]
];

count = 200;
offmax = 50;
offmin = -50;
xWi = 10; nWi = 2;
xLe = 10; nLe = 2;
colRow = 0;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 350;

  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 2.0;
  controls.zoomSpeed = 0;
  controls.panSpeed = 0.8;
  controls.noPan = true;
  controls.staticMoving = false;
  controls.dynamicDampingFactor = 0.2;
  controls.keys = [65, 83, 68];
  controls.addEventListener("change", render);
  
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.002);

  draw();
  
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor( 0x000000, 0 ); // the default
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize((window.innerWidth * .60), (window.innerHeight * 0.60));

  container = document.getElementById("navi");
  container.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize, false);
  render();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.handleResize();
  render();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
}

function render() {
  renderer.render(scene, camera);
}

function ran(max, min) {
  return Math.random() * (max - min + 1) + min;
}

function draw(){
  for (var i = 0; i < count; i++) {
    var width = Math.random() * (xWi - nWi) + nWi;
    var length = Math.random() * (xLe - nLe) + nLe;
    var shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, width);
    shape.lineTo(length, width);
    shape.lineTo(length, 0);
    shape.lineTo(0, 0);

    var extrudeSettings = {
      steps: 2,
      depth: 0,
      bevelEnabled: true,
      bevelThickness: Math.random() * (30 - 10) + 10,
      bevelSize: Math.random() * (10 - 5) + 5,
      bevelSegments: 1
    };

    var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    var mat = Math.round(Math.random() * 3);
    switch(mat){
      case 0:
        var material = new THREE.MeshPhongMaterial({
          color: cols[colRow][0],
          specular: specs[colRow][0],
          shininess: 3000,
          transparent: true,
          opacity: alpha[colRow][0],
          shading: THREE.SmoothShading,
          polygonOffset: true,
          polygonOffsetFactor: -0.1
        });
        break;
      case 1:
        var material = new THREE.MeshPhongMaterial({
          color: cols[colRow][1],
          specular: specs[colRow][1],
          shininess: 3000,
          transparent: true,
          opacity: alpha[colRow][1],
          shading: THREE.SmoothShading,
          polygonOffset: true,
          polygonOffsetFactor: -0.1
        });
        break;
      case 2:
        var material = new THREE.MeshPhongMaterial({
          color: cols[colRow][2],
          specular: specs[colRow][2],
          shininess: 3000,
          transparent: true,
          opacity: alpha[colRow][2],
          shading: THREE.SmoothShading,
          polygonOffset: true,
          polygonOffsetFactor: -0.1
        });
        break;
      default:
        var material = new THREE.MeshPhongMaterial({
          color: cols[colRow][3],
          specular: specs[colRow][3],
          shininess: 3000,
          transparent: true,
          opacity: alpha[colRow][3],
          shading: THREE.SmoothShading,
          polygonOffset: true,
          polygonOffsetFactor: -0.1
        });
    }
    
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / (Math.random() * Math.PI/2);
    mesh.rotation.y = Math.PI / (Math.random() * Math.PI/2);
    mesh.rotation.z = Math.PI / (Math.random() * Math.PI/2);
    mesh.position.x = Math.random()*(offmax - offmin) + offmin; //(Math.random() - 0.5) * 50
    mesh.position.y = Math.random()*(offmax - offmin) + offmin;
    mesh.position.z = Math.random()*(offmax - offmin) + offmin;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
  }
  
  cd = 50;
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(cd, 0, 0);
  scene.add(light);
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(-cd, 0, 0);
  scene.add(light);
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, cd, 0);
  scene.add(light);
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, -cd, 0);
  scene.add(light);

  light = new THREE.AmbientLight(0x000000);
  scene.add(light);
}

function shuffle(){
  colRow = newRan();
}

function newRan(){
  return (newRan.number = Math.floor(Math.random() * (cols.length + 0))) === newRan.lastNumber ? newRan() : newRan.lastNumber = newRan.number;
}

window.ondblclick = function(){
  shuffle();
  while(scene.children.length > 0){
    scene.remove(scene.children[0]);
  }
  draw();
}