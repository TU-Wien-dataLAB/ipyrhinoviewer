// Copyright (c) Florian Jaeger
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';
import * as THREE from 'three';
import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../css/widget.css';
import Rhino3dmLoader from 'three/examples/jsm/loaders/3DMLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class RhinoModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: RhinoModel.model_name,
      _model_module: RhinoModel.model_module,
      _model_module_version: RhinoModel.model_module_version,
      _view_name: RhinoModel.view_name,
      _view_module: RhinoModel.view_module,
      _view_module_version: RhinoModel.view_module_version,
      value: '',
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'RhinoModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'RhinoView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

function load3dmModel(
  scene: THREE.Scene,
  filePath: string,
  options: { receiveShadow: any; castShadow: any }
) {
  const { receiveShadow, castShadow } = options;
  return new Promise((resolve, reject) => {
    const loader = new Rhino3dmLoader();
    loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/');
    loader.load(
      filePath,
      (data) => {
        const obj = data;
        obj.position.y = 0;
        obj.position.x = 0;
        obj.receiveShadow = receiveShadow;
        obj.castShadow = castShadow;
        scene.add(obj);

        obj.traverse((child) => {
          if (child.isObject3D) {
            child.castShadow = castShadow;
            child.receiveShadow = receiveShadow;
          }
        });

        resolve(obj);
      },
      undefined,
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
}

export class RhinoView extends DOMWidgetView {
  render() {
    const width = 1000;
    const height = 700;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    const ambientLight = new THREE.AmbientLight(0xcccccc, 2);
    scene.add(ambientLight);
    const controls = new OrbitControls(camera, renderer.domElement);
    this.el.appendChild(renderer.domElement);
    const onContextMenu = (event: Event) => {
      event.stopPropagation();
    };
    this.el.addEventListener('contextmenu', onContextMenu);
    load3dmModel(scene, '/tree/rhino.3dm', {
      receiveShadow: true,
      castShadow: false,
    }).then(() => {
      animate();
    });

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }
}
