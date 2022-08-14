// import './style.css'
// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
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
const material = new THREE.MeshStandardMaterial( {color: 0x6730FF } );
const torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot );


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(10, 20,3)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper,gridHelper);

const controls = new OrbitControls (camera, renderer.domElement)

function animate() {
  requestAnimationFrame( animate );
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.z += 0.01;

  controls.update();

renderer.render (scene, camera);

}

animate()