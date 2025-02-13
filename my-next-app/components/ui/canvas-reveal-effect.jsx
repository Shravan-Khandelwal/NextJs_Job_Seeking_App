import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Custom ShaderMaterial Component
const Shader = ({ size, colors }) => {
  const ref = useRef();

  // Shader Code
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec3 u_colors[3];

    varying vec2 vUv;

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution;
      vec3 color = mix(u_colors[0], u_colors[1], step(0.5, st.x));
      color = mix(color, u_colors[2], step(0.5, st.y));
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // Uniforms Setup
  const uniforms = {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(size.width, size.height) },
    u_colors: { value: colors.map(c => new THREE.Color(...c)) },
  };

  // Update uniforms dynamically
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.uniforms.u_resolution.value.set(size.width, size.height);
    }
  }, [size.width, size.height]);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

// Main Canvas Component
const CanvasRevealEffect = () => {
  const size = { width: window.innerWidth, height: window.innerHeight };
  const colors = [
    [1, 0, 0], // Red
    [0, 1, 0], // Green
    [0, 0, 1], // Blue
  ];

  return (
    <Canvas>
      <Shader size={size} colors={colors} />
    </Canvas>
  );
};

export default CanvasRevealEffect;
