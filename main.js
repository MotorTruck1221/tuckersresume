import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize ( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( { color: 0x4d4dff } );
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0x00FF00)
pointLight.position.set(20,20,20)
const ambientLight = new THREE.AmbientLight(0xff0000);
//green 00FF00
//red ff0000 
//normal ffffff
scene.add(pointLight, ambientLight)

//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
const geometry = new THREE.SphereGeometry(0.25, 24, 24);
const material = new THREE.MeshStandardMaterial( {color: 0xffffff} )
const star = new THREE.Mesh ( geometry, material );

const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

star.position.set(x, y, z);
scene.add(star)

}
Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('https://i.ibb.co/BPwGVdq/space.jpg');
//christmas: https://i.ibb.co/P60WbS2/green-redspace.jpg
//normal: https://i.ibb.co/BPwGVdq/space.jpg
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;


controls.update();


  renderer.render( scene, camera );
}



const tuckerTexture = new THREE.TextureLoader().load('https://i.ibb.co/8XLyf9z/Tucker.jpg');

const tucker = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: tuckerTexture} )
);

scene.add(tucker);

const moonTexture = new THREE.TextureLoader().load('https://i.ibb.co/0GPqN84/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('https://i.ibb.co/syvw8CT/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {map: moonTexture,
  normalMap: normalTexture} )
);



scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

function moveCamera() {
const t = document.body.getBoundingClientRect().top;
moon.rotation.x += 0.05;
moon.rotation.y += 0.075;
moon.rotation.z += 0.05;

tucker.rotation.y += 0.01;
tucker.rotation.z += 0.01;

camera.position.z = t * -0.01;
camera.position.x = t * -0.0002;
camera.position.y = t * -0.0002;

}
document.body.onscroll = moveCamera


animate()

