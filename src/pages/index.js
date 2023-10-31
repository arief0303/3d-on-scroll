import * as React from "react";
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { GlobalCanvas, ScrollScene, UseCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig';
import { MeshDistortMaterial, GradientTexture } from '@react-three/drei';
import * as TWEEN from '@tweenjs/tween.js'

function ExampleComponent() {
  const el = useRef()
  return (
    <>
      <div ref={el} className="Placeholder ScrollScene"></div>
      <UseCanvas>
        <ScrollScene track={el}>
          {(props) => (
            <mesh {...props}>
              <planeGeometry args={[1, 1, 16, 16]} />
              <MeshDistortMaterial speed={5} distort={0.2}>
                <GradientTexture
                  stops={[0, 1]} // As many stops as you want
                  colors={['magenta', 'turquoise']} // Colors need to match the number of stops
                  rotation={0.5}
                />
              </MeshDistortMaterial>
            </mesh>
          )}
        </ScrollScene>
      </UseCanvas>
    </>
  )
}

function SpinningBoxSection() {
  const el = useRef()
  return (
    <section>
      <div ref={el} className="Placeholder ScrollScene"></div>
      <UseCanvas>
        <ScrollScene track={el}>{(props) => <SpinningBoxWebGL {...props} />}</ScrollScene>
      </UseCanvas>
    </section>
  )
}

function SpinningBoxWebGL({ scale, scrollState }) {
  const mesh = useRef()
  const coords = { x: 0, y: 0 } // Start at (0, 0)  

  const tween = new TWEEN.Tween(coords, false) // Create a new tween that modifies 'coords'.
    .to({ x: 2, y: -1.5 }, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
    .onUpdate(() => {
      // Called after tween.js updates 'coords'.
      // Move 'box' to the position described by 'coords' with a CSS translation.
      // box.style.setProperty('transform', 'translate(' + coords.x  + coords.y)
      mesh.current.position.x = coords.x
      mesh.current.position.y = coords.y
    })
    // .start() // Start the tween immediately.

  useFrame(() => {
    // mesh.current.position.y = scrollState.progress * -1
    // console.log(scrollState.progress)
    // if scroll state is 0.5, position.y should be 0
    if (scrollState.progress < 0.5) {
      // mesh.current.position.y = 
      // mesh.current.position.x = coords.x
      // mesh.current.position.y = coords.y
    } else {
      // mesh.current.position.y = scrollState.progress * -1
      //add tweenjs for animating to new position
      // mesh.current.position.x = 2
      // mesh.current.position.y = -1.5
      //update mesh position with tweenjs
      tween.start();
    }
    tween.update()
    // mesh.current.position.y = scrollState.progress * -1

  })
  return (
    <group scale={scale.xy.min() * 0.5}>
      <mesh ref={mesh}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </group>
  )
}

const IndexPage = () => {
  const [isTouch, setTouch] = useState(false)
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
    setTouch(isTouch)
  }, [])
  return (
    <>
      <SmoothScrollbar>
        {(bind) => (
          <article {...bind}>
            <header className="fixed top-0 left-0 z-50 p-0">
              <a href="https://github.com/14islands/r3f-scroll-rig">@14islands/r3f-scroll-rig</a>
            </header>
            <section>
              <h1>Basic &lt;ScrollScene/&gt; example</h1>
            </section>
            {isTouch && (
              <section>
                <p style={{ color: 'orange' }}>
                  You are on a touch device which means the WebGL won't sync with the native scroll. Consider disabling ScrollScenes for
                  touch devices, or experiment with the `smoothTouch` setting on Lenis.
                </p>
              </section>
            )}
            <SpinningBoxSection />
            <section>Both these ScrollScenes are tracking DOM elements and scaling their WebGL meshes to fit.</section>
            {/* <ExampleComponent /> */}
            <section>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </section>
          </article>
        )}
      </SmoothScrollbar>
    </>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
