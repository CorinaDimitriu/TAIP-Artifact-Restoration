import React, { Suspense, useEffect, useState } from 'react';
import { Canvas  } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {  Vector3 } from 'three';

import girlWithAPearlEarring from '../paintings/girl-with-a-pearl-earring.jpg';
import monaLisa from '../paintings/mona-lisa.jpg';
import theBirthOfVenus from '../paintings/the-birth-of-venus.jpg';
import theKiss from '../paintings/the-kiss.jpg';
import theStarryNight from '../paintings/the-starry-night.jpg';
import balDuMoulinDeLaGalette from '../paintings/bal-du-moulin-de-la-galette.jpg';
import selfPortraitWithBandagedEar from '../paintings/self-portrait-with-bandaged-ear.jpg';
import theScream from '../paintings/the-scream.jpg';
import theLasSupper from '../paintings/the-las-supper.jpg';

import Loading from './Loading';
import MuseumBackground from "./MuseumBackground";
import Painting from "./Painting";
import CameraController from './CameraController';

const paintingUrls = [
    girlWithAPearlEarring,
    monaLisa,
    theBirthOfVenus,
    theKiss,
    theStarryNight,
    balDuMoulinDeLaGalette,
    selfPortraitWithBandagedEar,
    theScream,
    theLasSupper,
    balDuMoulinDeLaGalette,
    selfPortraitWithBandagedEar,
    theScream,
    theLasSupper,
    selfPortraitWithBandagedEar,
    theScream,
    theLasSupper,
    balDuMoulinDeLaGalette,
    selfPortraitWithBandagedEar,
    theScream,
    theLasSupper,
];

const CameraRoom: React.FC = () => {
    const dFloorPainting = -0.5;
    const roomSize = 20;

    const [targetPosition, setTargetPosition] = useState<Vector3 | null>(null);
    const [targetAngle, setTargetAngle] = useState<number | null>(null);
    const [isDetailView, setIsDetailView] = useState(false);

    const paintingTitles = [
        'Girl with a Pearl Earring',
        'Mona Lisa',
        'The Birth of Venus',
        'The Kiss',
        'The Starry Night',
        'Bal du Moulin de la Galette',
        'Self-Portrait with Bandaged Ear',
        'The Scream',
        'The Last Supper',
    ];

    const paintingHeight = 3;
    const paintingWidths: number[] = paintingUrls.map((url) => {
        const img = new Image();
        img.src = url;
        return paintingHeight * (img.width / img.height);
    });

    const gapPaintings = 3;
    const wallOffset = 0.1;

    const leftWallPaintings = paintingWidths.slice(0, Math.ceil(paintingWidths.length / 2));
    const rightWallPaintings = paintingWidths.slice(Math.ceil(paintingWidths.length / 2));

    const leftWallLength = leftWallPaintings.reduce((sum, width) => sum + width, 0) + (leftWallPaintings.length - 1) * gapPaintings;
    const rightWallLength = rightWallPaintings.reduce((sum, width) => sum + width, 0) + (rightWallPaintings.length - 1) * gapPaintings;

    const roomResize = Math.max(leftWallLength, rightWallLength) + 2 * gapPaintings + 20;

    const leftWallStartX = -roomSize / 2 + (roomSize - leftWallLength) / 2 + wallOffset;
    const rightWallStartX = roomSize / 2 - (roomSize - rightWallLength) / 2 - wallOffset;

    const positions: [number, number, number][] = [];
    let currentLeftX = leftWallStartX;
    let currentRightX = rightWallStartX;

    paintingWidths.forEach((width, i) => {
        const isLeftWall = i < leftWallPaintings.length;
        if (isLeftWall) {
            positions.push([currentLeftX + width / 2, dFloorPainting, -roomSize / 2 + wallOffset]);
            currentLeftX += width + gapPaintings;
        } else {
            positions.push([currentRightX - width / 2, dFloorPainting, roomSize / 2 - wallOffset]);
            currentRightX -= width + gapPaintings;
        }
    });

    const rotations: [number, number, number][] = positions.map((_, index) => {
        return [0, index < leftWallPaintings.length ? 0 : Math.PI, 0];
    });

    useEffect(() => {
        const handleWheel = () => {
            if (isDetailView) {
                setIsDetailView(false);
            }
        };
        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [isDetailView]);


    return (
        <Canvas camera={{ position: [0, 2, 14], fov: 20 }} style={{ height: '100vh' }}>
            <CameraController targetPosition={targetPosition} targetAngle={targetAngle} isDetailView={isDetailView} setCameraPosition={setTargetPosition} />
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <MuseumBackground wallLength={roomResize} />
            <Suspense fallback={<Loading />}>
                {paintingUrls.map((url, index) => (
                    <Painting
                        key={index}
                        position={positions[index]}
                        rotation={rotations[index]}
                        textureUrl={url}
                        title={paintingTitles[index]}
                        onClick={(position, angle) => {
                            setTargetPosition(position);
                            setTargetAngle(angle);
                            setIsDetailView(true);
                        }}
                    />
                ))}
            </Suspense>
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                zoomSpeed={4}
                maxPolarAngle={Math.PI * 0.8}
                target={isDetailView ? targetPosition || new Vector3(0, dFloorPainting, 0) : new Vector3(0, dFloorPainting, 0)} // Menține ținta când nu ești în modul detaliat
            />
        </Canvas>
    );
};


export default CameraRoom;