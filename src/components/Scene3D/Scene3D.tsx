import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Mesh, PointLight } from 'three'
import type { MeshId, StageId } from '../../types/cancer'

interface Scene3DProps {
  selectedMeshId: MeshId
  activeMeshes: MeshId[]
  activeStageId: StageId
  isOrbiting: boolean
  onSelectMesh: (meshId: MeshId) => void
}

interface AnatomyMeshProps {
  meshId: MeshId
  selectedMeshId: MeshId
  activeMeshes: MeshId[]
  hoveredMeshId: MeshId | null
  color: string
  emissive: string
  materialKind: MaterialKind
  opacity?: number
  children: ReactNode
  onSelectMesh: (meshId: MeshId) => void
  onHoverMesh: (meshId: MeshId | null) => void
}

type MaterialKind = 'context' | 'lymph' | 'nerve' | 'thyroid' | 'trachea' | 'tumor' | 'vessel'

interface MaterialProfile {
  attenuationDistance: number
  clearcoat: number
  clearcoatRoughness: number
  ior: number
  metalness: number
  roughness: number
  thickness: number
  transmission: number
}

const centeredOrbitTarget: [number, number, number] = [0, 0.14, 0]
const desktopOrbitTarget: [number, number, number] = [0.4, 0.14, 0]
const cameraPosition: [number, number, number] = [0, 0.42, 5.2]

const materialProfiles: Record<MaterialKind, MaterialProfile> = {
  context: {
    attenuationDistance: 2.8,
    clearcoat: 0.08,
    clearcoatRoughness: 0.7,
    ior: 1.28,
    metalness: 0,
    roughness: 0.82,
    thickness: 0.18,
    transmission: 0.06,
  },
  lymph: {
    attenuationDistance: 2.2,
    clearcoat: 0.12,
    clearcoatRoughness: 0.65,
    ior: 1.32,
    metalness: 0,
    roughness: 0.72,
    thickness: 0.3,
    transmission: 0.14,
  },
  nerve: {
    attenuationDistance: 2.6,
    clearcoat: 0.1,
    clearcoatRoughness: 0.58,
    ior: 1.36,
    metalness: 0,
    roughness: 0.58,
    thickness: 0.16,
    transmission: 0.07,
  },
  thyroid: {
    attenuationDistance: 2.4,
    clearcoat: 0.14,
    clearcoatRoughness: 0.72,
    ior: 1.38,
    metalness: 0,
    roughness: 0.65,
    thickness: 0.5,
    transmission: 0.25,
  },
  trachea: {
    attenuationDistance: 3,
    clearcoat: 0.04,
    clearcoatRoughness: 0.84,
    ior: 1.22,
    metalness: 0,
    roughness: 0.88,
    thickness: 0.08,
    transmission: 0.02,
  },
  tumor: {
    attenuationDistance: 1.4,
    clearcoat: 0.06,
    clearcoatRoughness: 0.7,
    ior: 1.44,
    metalness: 0.02,
    roughness: 0.78,
    thickness: 0.12,
    transmission: 0,
  },
  vessel: {
    attenuationDistance: 1.9,
    clearcoat: 0.12,
    clearcoatRoughness: 0.76,
    ior: 1.34,
    metalness: 0,
    roughness: 0.74,
    thickness: 0.28,
    transmission: 0.1,
  },
}

const tumorHaloIntensity: Record<StageId, number> = {
  normal: 0,
  'ret-mutation': 0.8,
  'early-tumor': 2.4,
  'local-invasion': 4.4,
  'vascular-involvement': 7.2,
  'lymphatic-spread': 5.2,
}

function BreathingPointLight() {
  const lightRef = useRef<PointLight>(null)

  useFrame(({ clock }) => {
    if (!lightRef.current) {
      return
    }

    lightRef.current.intensity = Math.sin(clock.elapsedTime * 0.4) * 0.3 + 18
  })

  return <pointLight ref={lightRef} color="#6ee7b7" intensity={18} position={[-2.5, 1.8, 3.2]} />
}

function useDesktopOrbitTarget() {
  const [orbitTarget, setOrbitTarget] = useState<[number, number, number]>(centeredOrbitTarget)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const updateTarget = () => setOrbitTarget(query.matches ? desktopOrbitTarget : centeredOrbitTarget)

    updateTarget()
    query.addEventListener('change', updateTarget)

    return () => query.removeEventListener('change', updateTarget)
  }, [])

  return orbitTarget
}

function TumorHaloLight({ activeStageId }: { activeStageId: StageId }) {
  const lightRef = useRef<PointLight>(null)
  const targetIntensity = tumorHaloIntensity[activeStageId]

  useFrame(() => {
    if (!lightRef.current) {
      return
    }

    lightRef.current.intensity += (targetIntensity - lightRef.current.intensity) * 0.06
  })

  return <pointLight ref={lightRef} color="#f97316" distance={3.2} intensity={targetIntensity} position={[0.78, 0.16, 0.72]} />
}

function AnatomyMesh({
  meshId,
  selectedMeshId,
  activeMeshes,
  hoveredMeshId,
  color,
  emissive,
  materialKind,
  opacity = 0.82,
  children,
  onSelectMesh,
  onHoverMesh,
}: AnatomyMeshProps) {
  const meshRef = useRef<Mesh>(null)
  const isSelected = selectedMeshId === meshId
  const isHighlighted = isSelected || activeMeshes.includes(meshId)
  const isHovered = hoveredMeshId === meshId
  const material = materialProfiles[materialKind]

  useFrame(({ clock }) => {
    if (!meshRef.current) {
      return
    }

    const hoverScale = isHovered ? 1.045 : 1
    const tumorPulse = meshId === 'tumor_mass' && isHighlighted ? Math.sin(clock.elapsedTime * 2.4) * 0.025 : 0
    meshRef.current.scale.setScalar(hoverScale + tumorPulse)
  })

  return (
    <mesh
      ref={meshRef}
      onClick={(event) => {
        event.stopPropagation()
        onSelectMesh(meshId)
      }}
      onPointerOut={() => onHoverMesh(null)}
      onPointerOver={(event) => {
        event.stopPropagation()
        onHoverMesh(meshId)
      }}
    >
      {children}
      <meshPhysicalMaterial
        attenuationDistance={material.attenuationDistance}
        clearcoat={material.clearcoat}
        clearcoatRoughness={material.clearcoatRoughness}
        color={color}
        emissive={isHighlighted ? emissive : '#000000'}
        emissiveIntensity={isSelected ? 0.92 : isHighlighted ? 0.42 : 0.08}
        ior={material.ior}
        metalness={material.metalness}
        opacity={opacity}
        roughness={material.roughness}
        thickness={material.thickness}
        transparent
        transmission={material.transmission}
      />
    </mesh>
  )
}

function MtcAnatomy({
  selectedMeshId,
  activeMeshes,
  hoveredMeshId,
  onSelectMesh,
  onHoverMesh,
}: Omit<Scene3DProps, 'activeStageId' | 'isOrbiting'> & {
  hoveredMeshId: MeshId | null
  onHoverMesh: (meshId: MeshId | null) => void
}) {
  return (
    <group position={[0, 0.22, 0]} rotation={[0.08, -0.28, 0]} scale={0.94}>
      <mesh position={[0, -0.15, -0.1]} scale={[0.72, 2.4, 0.5]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial color="#263244" opacity={0.18} roughness={0.9} thickness={0.12} transparent transmission={0.03} />
      </mesh>

      <mesh position={[0, -0.06, 0]} scale={[0.28, 0.52, 0.22]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial color="#6ee7b7" emissive="#6ee7b7" emissiveIntensity={0.1} opacity={0.52} roughness={0.65} thickness={0.5} transparent transmission={0.25} />
      </mesh>

      <group position={[-0.5, -0.06, 0.08]} scale={[0.72, 1.14, 0.54]}>
        <AnatomyMesh
          activeMeshes={activeMeshes}
          color="#58d7b0"
          emissive="#6ee7b7"
          hoveredMeshId={hoveredMeshId}
          materialKind="thyroid"
          meshId="thyroid_left_lobe"
          onHoverMesh={onHoverMesh}
          onSelectMesh={onSelectMesh}
          opacity={0.56}
          selectedMeshId={selectedMeshId}
        >
          <sphereGeometry args={[0.72, 48, 48]} />
        </AnatomyMesh>
      </group>

      <group position={[0.5, -0.06, 0.08]} scale={[0.72, 1.14, 0.54]}>
        <AnatomyMesh
          activeMeshes={activeMeshes}
          color="#6ee7b7"
          emissive="#6ee7b7"
          hoveredMeshId={hoveredMeshId}
          materialKind="thyroid"
          meshId="thyroid_right_lobe"
          onHoverMesh={onHoverMesh}
          onSelectMesh={onSelectMesh}
          opacity={0.72}
          selectedMeshId={selectedMeshId}
        >
          <sphereGeometry args={[0.72, 48, 48]} />
        </AnatomyMesh>
      </group>

      <group position={[0.68, 0.02, 0.46]} scale={[0.42, 0.42, 0.42]}>
        <AnatomyMesh
          activeMeshes={activeMeshes}
          color="#f97316"
          emissive="#f97316"
          hoveredMeshId={hoveredMeshId}
          materialKind="tumor"
          meshId="tumor_mass"
          onHoverMesh={onHoverMesh}
          onSelectMesh={onSelectMesh}
          opacity={0.9}
          selectedMeshId={selectedMeshId}
        >
          <sphereGeometry args={[0.68, 48, 48]} />
        </AnatomyMesh>
      </group>

      <group position={[1.34, 0.02, 0.08]} rotation={[0, 0, -0.08]}>
        <AnatomyMesh
          activeMeshes={activeMeshes}
          color="#ef4444"
          emissive="#ef4444"
          hoveredMeshId={hoveredMeshId}
          materialKind="vessel"
          meshId="jugular_vein"
          onHoverMesh={onHoverMesh}
          onSelectMesh={onSelectMesh}
          opacity={0.6}
          selectedMeshId={selectedMeshId}
        >
          <cylinderGeometry args={[0.08, 0.12, 2.9, 32]} />
        </AnatomyMesh>
      </group>

      <group position={[-0.96, 0.0, 0.18]} rotation={[0.12, 0, 0.1]}>
        <AnatomyMesh
          activeMeshes={activeMeshes}
          color="#a78bfa"
          emissive="#a78bfa"
          hoveredMeshId={hoveredMeshId}
          materialKind="nerve"
          meshId="recurrent_laryngeal_nerve"
          onHoverMesh={onHoverMesh}
          onSelectMesh={onSelectMesh}
          opacity={0.72}
          selectedMeshId={selectedMeshId}
        >
          <cylinderGeometry args={[0.035, 0.045, 2.5, 24]} />
        </AnatomyMesh>
      </group>

      <group position={[0.08, -1.1, 0.42]}>
        <AnatomyMesh
          activeMeshes={activeMeshes}
          color="#f1f5f9"
          emissive="#6ee7b7"
          hoveredMeshId={hoveredMeshId}
          materialKind="lymph"
          meshId="lymph_nodes"
          onHoverMesh={onHoverMesh}
          onSelectMesh={onSelectMesh}
          opacity={0.58}
          selectedMeshId={selectedMeshId}
        >
          <sphereGeometry args={[0.18, 32, 32]} />
        </AnatomyMesh>
        <mesh position={[0.34, 0.12, -0.08]} scale={[0.82, 0.82, 0.82]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshPhysicalMaterial color="#f1f5f9" emissive="#6ee7b7" emissiveIntensity={0.12} opacity={0.42} roughness={0.72} thickness={0.3} transparent transmission={0.14} />
        </mesh>
        <mesh position={[-0.3, 0.16, -0.06]} scale={[0.74, 0.74, 0.74]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshPhysicalMaterial color="#f1f5f9" emissive="#6ee7b7" emissiveIntensity={0.12} opacity={0.42} roughness={0.72} thickness={0.3} transparent transmission={0.14} />
        </mesh>
      </group>

      <group position={[0, -0.1, -0.28]}>
        <AnatomyMesh
          activeMeshes={activeMeshes}
          color="#cbd5e1"
          emissive="#94a3b8"
          hoveredMeshId={hoveredMeshId}
          materialKind="trachea"
          meshId="trachea"
          onHoverMesh={onHoverMesh}
          onSelectMesh={onSelectMesh}
          opacity={0.22}
          selectedMeshId={selectedMeshId}
        >
          <cylinderGeometry args={[0.18, 0.18, 2.2, 32]} />
        </AnatomyMesh>
      </group>
    </group>
  )
}

export function Scene3D({ selectedMeshId, activeMeshes, activeStageId, isOrbiting, onSelectMesh }: Scene3DProps) {
  const [hoveredMeshId, setHoveredMeshId] = useState<MeshId | null>(null)
  const orbitTarget = useDesktopOrbitTarget()

  useEffect(() => {
    document.body.style.cursor = hoveredMeshId ? 'pointer' : 'auto'

    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hoveredMeshId])

  return (
    <Canvas camera={{ fov: 29, position: cameraPosition }} className="h-full w-full">
      <color args={['#0a0a0f']} attach="background" />
      <fog args={['#0a0a0f', 6.4, 11]} attach="fog" />
      <ambientLight intensity={0.36} />
      <hemisphereLight color="#2b6b61" groundColor="#03050a" intensity={0.42} />
      <directionalLight color="#f3fbff" intensity={1.15} position={[3, 4, 5]} />
      <directionalLight color="#9bd7ff" intensity={0.48} position={[-4, -1, -3]} />
      <pointLight color="#1a3a5c" intensity={5.2} position={[0, -2.6, -3.4]} />
      <pointLight color="#7dd3fc" distance={7} intensity={2.4} position={[-2.2, 2.8, -2.4]} />
      <BreathingPointLight />
      <TumorHaloLight activeStageId={activeStageId} />
      <MtcAnatomy
        activeMeshes={activeMeshes}
        hoveredMeshId={hoveredMeshId}
        onHoverMesh={setHoveredMeshId}
        onSelectMesh={onSelectMesh}
        selectedMeshId={selectedMeshId}
      />
      <OrbitControls
        autoRotate={isOrbiting}
        autoRotateSpeed={0.7}
        enableDamping
        enablePan={false}
        maxDistance={8.2}
        minDistance={3.8}
        target={orbitTarget}
      />
    </Canvas>
  )
}
