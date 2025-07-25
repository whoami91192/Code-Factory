import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { 
  Network, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Zap
} from 'lucide-react'

interface NetworkNode {
  id: string
  name: string
  type: 'router' | 'server' | 'workstation' | 'firewall' | 'ids'
  status: 'secure' | 'warning' | 'compromised' | 'offline'
  position: [number, number, number]
  connections: string[]
  ip: string
  services: string[]
  threats: number
}

const NetworkTopology3D = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const networkData: NetworkNode[] = [
    {
      id: 'router-1',
      name: 'Main Router',
      type: 'router',
      status: 'secure',
      position: [0, 0, 0],
      connections: ['firewall-1', 'ids-1'],
      ip: '192.168.1.1',
      services: ['DHCP', 'DNS', 'NAT'],
      threats: 0
    },
    {
      id: 'firewall-1',
      name: 'Perimeter Firewall',
      type: 'firewall',
      status: 'secure',
      position: [-3, 2, 0],
      connections: ['router-1', 'server-1', 'server-2'],
      ip: '192.168.1.10',
      services: ['IPS', 'VPN', 'Load Balancer'],
      threats: 0
    },
    {
      id: 'ids-1',
      name: 'Intrusion Detection',
      type: 'ids',
      status: 'warning',
      position: [3, 2, 0],
      connections: ['router-1', 'server-1'],
      ip: '192.168.1.20',
      services: ['IDS', 'Log Analysis'],
      threats: 3
    },
    {
      id: 'server-1',
      name: 'Web Server',
      type: 'server',
      status: 'secure',
      position: [-2, -2, 0],
      connections: ['firewall-1', 'ids-1', 'workstation-1'],
      ip: '192.168.1.100',
      services: ['HTTP', 'HTTPS', 'SSH'],
      threats: 0
    },
    {
      id: 'server-2',
      name: 'Database Server',
      type: 'server',
      status: 'compromised',
      position: [2, -2, 0],
      connections: ['firewall-1', 'workstation-2'],
      ip: '192.168.1.101',
      services: ['MySQL', 'PostgreSQL'],
      threats: 5
    },
    {
      id: 'workstation-1',
      name: 'Admin Workstation',
      type: 'workstation',
      status: 'secure',
      position: [-4, -4, 0],
      connections: ['server-1'],
      ip: '192.168.1.200',
      services: ['RDP', 'SSH'],
      threats: 0
    },
    {
      id: 'workstation-2',
      name: 'User Workstation',
      type: 'workstation',
      status: 'warning',
      position: [4, -4, 0],
      connections: ['server-2'],
      ip: '192.168.1.201',
      services: ['RDP', 'Browser'],
      threats: 2
    }
  ]

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(10, 10, 10)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mountRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // Create nodes
    const nodes: { [key: string]: THREE.Mesh } = {}
    const nodeColors = {
      secure: 0x00ff41,
      warning: 0xffff00,
      compromised: 0xff0040,
      offline: 0x666666
    }

    networkData.forEach((node) => {
      const geometry = new THREE.SphereGeometry(0.3, 32, 32)
      const material = new THREE.MeshPhongMaterial({
        color: nodeColors[node.status],
        emissive: nodeColors[node.status],
        emissiveIntensity: 0.2
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(...node.position)
      mesh.castShadow = true
      mesh.receiveShadow = true
      
      // Add click event
      mesh.userData = { node }
      nodes[node.id] = mesh
      scene.add(mesh)

      // Add label
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')!
      canvas.width = 256
      canvas.height = 64
      context.fillStyle = '#ffffff'
      context.font = '16px Arial'
      context.fillText(node.name, 10, 30)
      context.fillText(node.ip, 10, 50)

      const texture = new THREE.CanvasTexture(canvas)
      const labelMaterial = new THREE.SpriteMaterial({ map: texture })
      const label = new THREE.Sprite(labelMaterial)
      label.position.set(node.position[0], node.position[1] + 0.8, node.position[2])
      label.scale.set(2, 0.5, 1)
      scene.add(label)
    })

    // Create connections
    const connections: THREE.Line[] = []
    networkData.forEach((node) => {
      node.connections.forEach((targetId) => {
        const targetNode = networkData.find(n => n.id === targetId)
        if (targetNode) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...node.position),
            new THREE.Vector3(...targetNode.position)
          ])
          const material = new THREE.LineBasicMaterial({ 
            color: 0x00ff41,
            opacity: 0.6,
            transparent: true
          })
          const line = new THREE.Line(geometry, material)
          scene.add(line)
          connections.push(line)
        }
      })
    })

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(Object.values(nodes))

      if (intersects.length > 0) {
        const clickedNode = intersects[0].object.userData.node
        setSelectedNode(clickedNode)
      } else {
        setSelectedNode(null)
      }
    }

    window.addEventListener('click', onMouseClick)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate nodes slightly
      Object.values(nodes).forEach((node, index) => {
        node.rotation.y += 0.01
        node.rotation.x += 0.005
      })

      // Pulse effect for compromised nodes
      networkData.forEach((nodeData) => {
        if (nodeData.status === 'compromised') {
          const node = nodes[nodeData.id]
          const time = Date.now() * 0.001
          if (node.material instanceof THREE.MeshStandardMaterial) {
            node.material.emissiveIntensity = 0.3 + Math.sin(time * 3) * 0.2
          }
        }
      })

      controls.update()
      renderer.render(scene, camera)
    }

    animate()
    setIsLoading(false)

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('click', onMouseClick)
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'secure': return <CheckCircle className="h-4 w-4 text-cyber-green" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-cyber-yellow" />
      case 'compromised': return <XCircle className="h-4 w-4 text-cyber-red" />
      case 'offline': return <Eye className="h-4 w-4 text-gray-500" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'router': return <Network className="h-4 w-4" />
      case 'server': return <Zap className="h-4 w-4" />
      case 'workstation': return <Eye className="h-4 w-4" />
      case 'firewall': return <Shield className="h-4 w-4" />
      case 'ids': return <AlertTriangle className="h-4 w-4" />
      default: return <Network className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-cyber font-bold mb-4">
          3D Network <span className="text-cyber-green">Topology</span>
        </h2>
        <p className="text-muted-foreground">
          Interactive 3D visualization of network infrastructure and security status
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* 3D Visualization */}
        <div className="lg:col-span-3">
          <div className="cyber-card h-96 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-green"></div>
              </div>
            )}
            <div ref={mountRef} className="w-full h-full" />
            <div className="absolute top-4 left-4 text-xs text-muted-foreground">
              <div>🖱️ Click nodes to inspect</div>
              <div>🖱️ Drag to rotate view</div>
              <div>🔍 Scroll to zoom</div>
            </div>
          </div>
        </div>

        {/* Node Details */}
        <div className="lg:col-span-1">
          <div className="cyber-card">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Network className="h-5 w-5 mr-2 text-cyber-green" />
              Network Nodes
            </h3>
            
            <div className="space-y-3">
              {networkData.map((node) => (
                <div
                  key={node.id}
                  className={`p-3 rounded-md cursor-pointer transition-all duration-300 ${
                    selectedNode?.id === node.id 
                      ? 'bg-cyber-green/20 border border-cyber-green' 
                      : 'bg-muted/50 hover:bg-muted'
                  }`}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(node.type)}
                      <span className="font-medium text-sm">{node.name}</span>
                    </div>
                    {getStatusIcon(node.status)}
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>{node.ip}</div>
                    <div className="flex items-center space-x-1">
                      <span>Threats:</span>
                      <span className={node.threats > 0 ? 'text-cyber-red' : 'text-cyber-green'}>
                        {node.threats}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Node Details */}
          {selectedNode && (
            <div className="cyber-card mt-4">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                {getTypeIcon(selectedNode.type)}
                <span className="ml-2">{selectedNode.name}</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(selectedNode.status)}
                    <span className="text-sm capitalize">{selectedNode.status}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">IP Address</label>
                  <div className="text-sm font-mono text-cyber-green mt-1">
                    {selectedNode.ip}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Services</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedNode.services.map((service) => (
                      <span
                        key={service}
                        className="text-xs px-2 py-1 bg-cyber-dark border border-cyber-green/30 rounded"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Active Threats</label>
                  <div className="text-sm mt-1">
                    <span className={selectedNode.threats > 0 ? 'text-cyber-red' : 'text-cyber-green'}>
                      {selectedNode.threats} detected
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Connections</label>
                  <div className="text-sm mt-1">
                    {selectedNode.connections.length} active connections
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NetworkTopology3D 