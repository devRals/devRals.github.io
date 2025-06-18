import {
    Canvas as FiberCanvas,
    useFrame,
    useLoader,
    useThree,
} from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useScrollY } from "../../hooks/useScrollY"; // az önce yazdığın hook
import { OrbitControls, Stars } from "@react-three/drei";

type ProphecyProps = {
    imageIndex: number;
    position: [x: number, y: number, z: number];
    size?: number;
    grayHint?: number;
};

export const Prophecy = (
    { imageIndex, size = 1.5, position, grayHint = 1 }: ProphecyProps,
) => {
    const prophecyTexture = useLoader(
        THREE.TextureLoader,
        `/images/prophecies/${imageIndex}.png`,
    );
    const oceanTexture = useLoader(
        THREE.TextureLoader,
        "/images/ocean.png",
    );
    const meshRef = useRef<THREE.Mesh>(null);

    const startY = position[1];
    oceanTexture.wrapS = oceanTexture.wrapT = THREE.RepeatWrapping;

    const aspectRatio = useMemo(() => {
        if (!prophecyTexture.image) return 1;
        return prophecyTexture.image.width / prophecyTexture.image.height;
    }, [prophecyTexture.image]);

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uProphecy: { value: prophecyTexture },
                uOcean: { value: oceanTexture },
                uOffset: { value: new THREE.Vector2(0, 0) },
                uGrayHint: { value: grayHint },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                uniform sampler2D uProphecy;
                uniform sampler2D uOcean;
                uniform vec2 uOffset;
                uniform float uGrayHint;

                void main() {
                    vec4 prophecyColor = texture2D(uProphecy, vUv);
                    vec4 oceanColor = texture2D(uOcean, vUv + uOffset);

                    vec3 blueTint = vec3(0.0, 0.1, 0.6);
                    vec3 grayHint = vec3(0.1 * uGrayHint);
                    vec3 finalColor = oceanColor.rgb + blueTint + grayHint;

                    if (prophecyColor.a < 0.5) {
                        gl_FragColor = vec4(finalColor, oceanColor.a);
                    } else {
                        discard;
                    }
                }
            `,
            transparent: true,
        });
    }, [prophecyTexture, oceanTexture, grayHint]);

    const floatOffset = useMemo(() => Math.random() * Math.PI * 2, []);
    const timeRef = useRef(0);
    const accumRef = useRef(0);
    const targetDelta = 1 / 30;

    useFrame((_, delta) => {
        accumRef.current += delta;

        if (accumRef.current >= targetDelta) {
            timeRef.current += targetDelta;

            shaderMaterial.uniforms.uOffset.value.y -= targetDelta * 0.1;
            shaderMaterial.uniforms.uOffset.value.x += targetDelta * 0.1;

            if (meshRef.current) {
                const floatAmount = 0.1;
                const speed = 4.0;
                const newY = startY +
                    Math.sin(timeRef.current * speed + floatOffset) *
                    floatAmount;
                meshRef.current.position.setY(newY);
            }

            accumRef.current = 0;
        }
    });

    return (
        <mesh position={position} ref={meshRef}>
            <planeGeometry args={[aspectRatio * size, size]} />
            <primitive attach="material" object={shaderMaterial} />
        </mesh>
    );
};

type Layer = {
    prophecyCount: number;
    zPos: number;
    grayHintDegre: number;
    itemsPerRow: number;
};

const layers: Layer[] = [
    {
        grayHintDegre: 0,
        prophecyCount: 150,
        zPos: 6,
        itemsPerRow: 7,
    },
    {
        grayHintDegre: -5,
        prophecyCount: 100,
        zPos: 2,
        itemsPerRow: 8,
    },
    {
        grayHintDegre: -8,
        prophecyCount: 100,
        zPos: -3,
        itemsPerRow: 9,
    },
    {
        grayHintDegre: -12,
        prophecyCount: 100,
        zPos: -8,
        itemsPerRow: 9,
    },
];

export const Prophecies = () => {
    return (
        <>
            {layers.map((layer, i) => {
                const columns = layer.itemsPerRow;
                const rows = Math.ceil(layer.prophecyCount / columns);
                const spacingX = 2.5;
                const spacingY = 2.5;

                return (
                    <group key={`layer-${i}`} position={[0, 0, layer.zPos]}>
                        {Array.from({ length: layer.prophecyCount }).map(
                            (_, index) => {
                                const col = index % columns;
                                const row = Math.floor(index / columns);

                                const x = (col - (columns - 1) / 2) * spacingX;
                                const y = ((rows - 1) / 2 - row) * spacingY;

                                return (
                                    <Prophecy
                                        key={`prophecy-${i}-${index}`}
                                        position={[x, y, 0]}
                                        imageIndex={(index % 20) + 1}
                                        grayHint={layer.grayHintDegre}
                                        size={1.2}
                                    />
                                );
                            },
                        )}
                    </group>
                );
            })}
        </>
    );
};

const ScrollCamera = () => {
    const scrollY = useScrollY();
    const { camera } = useThree();
    const targetY = useRef(camera.position.y);

    useFrame(() => {
        const newY = -scrollY / 200;
        targetY.current += (newY - targetY.current) * 0.1;
        camera.position.set(0, targetY.current, 10); // X:0, Y:target, Z: sabit
        camera.lookAt(0, targetY.current, 0); // Y eksenine paralel bakış
    });

    return null;
};

export default function Canvas() {
    return (
        <FiberCanvas
            style={{
                position: "fixed",
                width: window.innerWidth,
                height: window.innerHeight,
                zIndex: -1,
            }}
            camera={{ position: [0, 0, 10], fov: 50 }}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
            }}
        >
            <ScrollCamera />
            <Prophecies />
            {import.meta.env.DEV && <OrbitControls />}
            <Stars
                radius={100}
                depth={50}
                count={3000}
                factor={4}
                saturation={0}
                fade
            />
        </FiberCanvas>
    );
}
