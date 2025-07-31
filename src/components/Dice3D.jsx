import React, { useRef, useEffect } from "react";
import {  useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { animated, useSpring } from "@react-spring/three";

const faceRotations = {
    1: [0, 0, 0],                  // top
    2: [Math.PI / 2, 0, 0],        // back
    3: [0, -Math.PI / 2, 0],       // right
    4: [0, Math.PI / 2, 0],        // left
    5: [-Math.PI / 2, 0, 0],       // front
    6: [Math.PI, 0, 0],            // bottom
};

const Dice3D = ({ value }) => {
    const meshRef = useRef();

    const textures = useLoader(TextureLoader, [
        "/textures/dice4.png", // Left
        "/textures/dice3.png", // Right
        "/textures/dice5.png", // Front
        "/textures/dice2.png", // Back
        "/textures/dice1.png", // Top
        "/textures/dice6.png", // Bottom
    ]);

    const [spring, api] = useSpring(() => ({
        rotation: faceRotations[value],
        config: { mass: 1, tension: 100, friction: 20 },
    }));

    useEffect(() => {
        api.start({ rotation: faceRotations[value] });
    }, [value, api]);

    return (
        <animated.mesh ref={meshRef} rotation={spring.rotation}>
            <boxGeometry args={[2, 2, 2]} />
            {textures.map((texture, index) => (
                <meshStandardMaterial attach={`material-${index}`} map={texture} key={index} />
            ))}
        </animated.mesh>
    );
};

export default Dice3D;
