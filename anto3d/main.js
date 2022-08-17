import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer  = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshStandardMaterial( { color: 0x6730FF } );
const torusKnot = new THREE.Mesh( geometry, material );

scene.add( torusKnot );

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight )

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const dianciTexture = new THREE.TextureLoader().load('dianci.png');
const dianci = new THREE.Mesh(
new THREE.BoxGeometry(4,4,4),
new THREE.MeshBasicMaterial({map: dianciTexture})
);

scene.add(dianci);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
new THREE.SphereGeometry(3,32,32),
new THREE.MeshStandardMaterial({
  map: moonTexture,
  normalMap: normalTexture
})
);

scene.add(moon);

moon.position.z = 20;
moon.position.setX(-10);

function moveCamera() {
const t= document.body.getBoundingClientRect().top;
moon.rotation.x += 0.05;
moon.rotation.y += 0.075;
moon.rotation.z += 0.05;

dianci.position.y = 3;
dianci.position.x = 10;
dianci.rotation.x += 0.02;
dianci.rotation.y += 0.015;
dianci.rotation.z += 0.02;

torusKnot.position.y = -30;
torusKnot.position.z = -110;
torusKnot.position.setX(10);
torusKnot.rotation.x += 0.02;
torusKnot.rotation.y += 0.015;
torusKnot.rotation.z += 0.02;

camera.position.z = t * -0.01;
camera.position.x = t * -0.0002;
camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame( animate );
 torusKnot.rotation.x += 0.01;
 torusKnot.rotation.y += 0.005;
 torusKnot.rotation.z += 0.01;

controls.update();

renderer.render (scene, camera);

}

animate()