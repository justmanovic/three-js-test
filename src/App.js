import './App.scss';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import {
  softShadows,
  MeshWobbleMaterial,
  OrbitControls,
} from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

softShadows();
function App() {
  return (
    <>
      <Canvas camera={{ position: [-5, 2, 10], fov: 60 }} shadows>
        <ambientLight intensity={0.3} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <group>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
            receiveShadow
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <SpinningMesh
            position={[0, 1, 0]}
            color="lightcoral"
            args={[2, 2, 3]}
            speed={1.5}
          />
          <SpinningMesh position={[-2, 1, -5]} color="lightblue" speed={6} />
          <SpinningMesh position={[5, 1, -2]} color="teal" speed={6} />
        </group>
        <directionalLight
          position={[0, 10, 0]}
          intensity={1.5}
          castShadow
          shadowMapHeight={1024}
          shadowMapWidth={1024}
          shadowCameraFar={50}
          shadowCameraLeft={-10}
          shadowCameraRight={10}
          shadowCameraTop={10}
          shadowCameraBottom={-10}
        />

        <OrbitControls />
      </Canvas>
    </>
  );
}

const SpinningMesh = ({ position, color, args, speed }) => {
  const [expend, setExpend] = useState(false);
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.005));
  const props = useSpring({
    scale: expend ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return (
    <a.mesh
      onClick={() => setExpend(!expend)}
      scale={props.scale}
      castShadow
      ref={mesh}
      position={position}
    >
      <boxBufferGeometry attach="geometry" args={args} />
      {/* <meshStandardMaterial attach="material" color={color} /> */}
      <MeshWobbleMaterial
        attach="material"
        color={color}
        speed={speed}
        factor={0.6}
      />
    </a.mesh>
  );
};

export default App;
