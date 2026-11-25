import { useEffect, useRef } from 'react'

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision mediump float;

uniform float u_time;
uniform float u_scroll;
uniform vec2 u_resolution;

float stretchedDistance(vec2 p, vec2 center, vec2 stretch) {
  vec2 scaled = (p - center) * stretch;
  return length(scaled);
}

vec3 blendColor(vec2 p, vec2 center, vec3 color, float scale, vec2 stretch) {
  float d = stretchedDistance(p, center, stretch);
  return color * exp(-scale * d * d);
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

const float speedFactor = 0.4;

vec2 bandDrift(int i, vec2 base, float ampX, float ampY, float baseSpeedX, float baseSpeedY) {
  float fx = sin(u_time * baseSpeedX * speedFactor + float(i) + u_scroll * 1.45) * ampX;
  float fy = cos(u_time * baseSpeedY * speedFactor + float(i) * 1.3 + u_scroll * 1.9) * ampY;
  return base + vec2(fx, fy);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv -= 0.5;
  uv.x *= u_resolution.x / max(u_resolution.y, 1.0);

  // Noticeable atmospheric scroll parallax shift
  uv.y -= (u_scroll - 0.5) * 0.38;

  vec3 col = vec3(0.0);
  vec2 stretch = vec2(0.6, 4.0);

  col += blendColor(uv, bandDrift(0, vec2(-0.4, 0.2), 0.5, 0.4, 0.3, 0.2), vec3(0.9, 0.3, 0.1), 4.0, stretch);
  col += blendColor(uv, bandDrift(1, vec2(-0.3, -0.1), 0.4, 0.3, 0.35, 0.25), vec3(0.9, 0.7, 0.4), 5.0, stretch);
  col += blendColor(uv, bandDrift(2, vec2(-0.1, 0.05), 0.5, 0.6, 0.32, 0.3), vec3(0.8, 0.8, 0.6), 5.5, stretch);
  col += blendColor(uv, bandDrift(3, vec2(0.1, -0.05), 0.6, 0.5, 0.27, 0.3), vec3(0.3, 0.8, 1.0), 6.0, stretch);
  col += blendColor(uv, bandDrift(4, vec2(0.3, 0.0), 0.5, 0.4, 0.25, 0.2), vec3(0.3, 0.5, 1.0), 6.0, stretch);
  col += blendColor(uv, bandDrift(5, vec2(0.4, -0.2), 0.4, 0.5, 0.29, 0.18), vec3(0.2, 0.1, 0.4), 6.5, stretch);
  col += blendColor(uv, bandDrift(6, vec2(-0.45, 0.35), 0.6, 0.6, 0.33, 0.22), vec3(0.8, 0.4, 0.2), 4.5, stretch);
  col += blendColor(uv, bandDrift(7, vec2(-0.25, -0.25), 0.6, 0.5, 0.3, 0.3), vec3(0.9, 0.6, 0.3), 5.5, stretch);
  col += blendColor(uv, bandDrift(8, vec2(0.0, -0.1), 0.5, 0.6, 0.28, 0.2), vec3(0.4, 0.7, 1.0), 6.5, stretch);
  col += blendColor(uv, bandDrift(9, vec2(0.2, 0.15), 0.6, 0.6, 0.25, 0.3), vec3(0.2, 0.3, 0.6), 5.8, stretch);
  col += blendColor(uv, bandDrift(10, vec2(0.35, -0.3), 0.5, 0.5, 0.26, 0.24), vec3(0.15, 0.05, 0.2), 7.0, stretch);

  float maxOffset = 100.0;
  vec2 timeOffset = vec2(
    sin(u_time * 0.2) * maxOffset,
    cos(u_time * 0.15) * maxOffset + u_scroll * 42.0
  );
  float n = noise(gl_FragCoord.xy * 0.8 + timeOffset);
  col += vec3(n * 0.4);

  col *= 0.12;
  gl_FragColor = vec4(col, 1.0);
}
`

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function CosmicBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
    if (!gl) return

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const timeLoc = gl.getUniformLocation(program, 'u_time')
    const scrollLoc = gl.getUniformLocation(program, 'u_scroll')
    const resLoc = gl.getUniformLocation(program, 'u_resolution')

    let targetScroll = 0
    let smoothScroll = 0

    const onScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      )
      targetScroll = window.scrollY / maxScroll
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.floor(window.innerWidth * dpr)
      const h = Math.floor(window.innerHeight * dpr)
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
      gl.uniform2f(resLoc, w, h)
      onScroll()
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })

    const start = performance.now()
    let rafId = 0

    const render = (now) => {
      smoothScroll += (targetScroll - smoothScroll) * 0.08
      gl.uniform1f(timeLoc, (now - start) * 0.001)
      gl.uniform1f(scrollLoc, smoothScroll)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-background"
    />
  )
}
