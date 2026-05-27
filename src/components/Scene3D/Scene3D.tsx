import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Mesh } from 'three'
import type { MeshId } from '../../types/cancer'

interface Scene3DProps {
  selectedMeshId: MeshId
  activeMeshes: MeshId[]
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
  opacity?: number
  children: ReactNode
  onSelectMesh: (meshId: MeshId) => void
  onHoverMesh: (meshId: MeshId | null) => void
}

const sceneOrbitTarget: [number, number, number] = [0, 0.14, 0]

function AnatomyMesh({
  meshId,
  selectedMeshId,
  activeMeshes,
  hoveredMeshId,
  color,
  emissive,
  opacity = 0.82,
  children,
  onSelectMesh,
  onHoverMesh,
}: AnatomyMeshProps) {
  const meshRef = useRef<Mesh>(null)
  const isSelected = selectedMeshId === meshId
  const isHighlighted = isSelected || activeMeshes.includes(meshId)
  const isHovered = hoveredMeshId === meshId

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
      <meshStandardMaterial
        color={color}
        emissive={isHighlighted ? emissive : '#000000'}
        emissiveIntensity={isSelected ? 0.92 : isHighlighted ? 0.42 : 0.08}
        metalness={0.05}
        opacity={opacity}
        roughness={0.78}
        transparent
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
}: Omit<Scene3DProps, 'isOrbiting'> & {
  hoveredMeshId: MeshId | null
  onHoverMesh: (meshId: MeshId | null) => void
}) {
  return (
    <group position={[0, 0.22, 0]} rotation={[0.08, -0.28, 0]} scale={0.94}>
      <mesh position={[0, -0.15, -0.1]} scale={[0.72, 2.4, 0.5]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="#263244" opacity={0.18} roughness={0.92} transparent />
      </mesh>

      <mesh position={[0, -0.06, 0]} scale={[0.28, 0.52, 0.22]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#6ee7b7" emissive="#6ee7b7" emissiveIntensity={0.1} opacity={0.56} roughness={0.82} transparent />
      </mesh>

      <group position={[-0.5, -0.06, 0.08]} scale={[0.72, 1.14, 0.54]}>
        <AnatomyMesh
          activeMeshes={activeMeshes}
          color="#58d7b0"
          emissive="#6ee7b7"
          hoveredMeshId={hoveredMeshId}
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
          <meshStandardMaterial color="#f1f5f9" emissive="#6ee7b7" emissiveIntensity={0.12} opacity={0.46} roughness={0.8} transparent />
        </mesh>
        <mesh position={[-0.3, 0.16, -0.06]} scale={[0.74, 0.74, 0.74]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color="#f1f5f9" emissive="#6ee7b7" emissiveIntensity={0.12} opacity={0.46} roughness={0.8} transparent />
        </mesh>
      </group>

      <group position={[0, -0.1, -0.28]}>
        <AnatomyMesh
          activeMeshes={activeMeshes}
          color="#cbd5e1"
          emissive="#94a3b8"
          hoveredMeshId={hoveredMeshId}
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

export function Scene3D({ selectedMeshId, activeMeshes, isOrbiting, onSelectMesh }: Scene3DProps) {
  const [hoveredMeshId, setHoveredMeshId] = useState<MeshId | null>(null)

  useEffect(() => {
    document.body.style.cursor = hoveredMeshId ? 'pointer' : 'auto'

    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hoveredMeshId])

  return (
    <Canvas camera={{ fov: 36, position: [0, 0.42, 6.7] }} className="h-full w-full">
      <color args={['#0a0a0f']} attach="background" />
      <fog args={['#0a0a0f', 6.4, 11]} attach="fog" />
      <ambientLight intensity={0.52} />
      <directionalLight intensity={1.4} position={[3, 4, 5]} />
      <pointLight color="#6ee7b7" intensity={18} position={[-2.5, 1.8, 3.2]} />
      <pointLight color="#f97316" intensity={10} position={[2.2, 0.2, 2.4]} />
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
        target={sceneOrbitTarget}
      />
    </Canvas>
  )
}
