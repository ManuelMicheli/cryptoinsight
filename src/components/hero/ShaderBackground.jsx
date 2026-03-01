import { useRef, useEffect } from 'react'

const defaultShaderSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
* Color palette adapted for dynamic theme cycling
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec3 tintTop;
uniform vec3 tintBottom;
uniform vec3 fogColor;
uniform vec3 oscFreq;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}
void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*oscFreq)+1.);
    float b=noise(i+p+bg*1.731);
    float blend=smoothstep(-0.6,0.6,p.y);
    vec3 tint=mix(tintBottom,tintTop,blend);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)))*tint;
    col=mix(col,bg*fogColor,d);
  }
  O=vec4(col,1);
}`;

const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

const vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

class WebGLRenderer {
  constructor(canvas, scale) {
    this.canvas = canvas;
    this.scale = scale;
    this.gl = canvas.getContext('webgl2');
    if (!this.gl) return;
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
    this.shaderSource = defaultShaderSource;
    this.program = null;
    this.vs = null;
    this.fs = null;
    this.buffer = null;
    this.mouseMove = [0, 0];
    this.mouseCoords = [0, 0];
    this.pointerCoords = [0, 0];
    this.nbrOfPointers = 0;
    this.currentColors = {
      tintTop: [0.55, 0.2, 0.95],
      tintBottom: [0.96, 0.55, 0.05],
      fogColor: [0.14, 0.06, 0.12],
      oscFreq: [2.2, 1.2, 3.0],
    };
    this.targetColors = {
      tintTop: [0.55, 0.2, 0.95],
      tintBottom: [0.96, 0.55, 0.05],
      fogColor: [0.14, 0.06, 0.12],
      oscFreq: [2.2, 1.2, 3.0],
    };
  }

  updateShader(source) {
    this.reset();
    this.shaderSource = source;
    this.setup();
    this.init();
  }

  updateMove(deltas) { this.mouseMove = deltas; }
  updateMouse(coords) { this.mouseCoords = coords; }
  updatePointerCoords(coords) { this.pointerCoords = coords; }
  updatePointerCount(nbr) { this.nbrOfPointers = nbr; }

  updateColors(targets) {
    this.targetColors = {
      tintTop: [...targets.tintTop],
      tintBottom: [...targets.tintBottom],
      fogColor: [...targets.fogColor],
      oscFreq: [...targets.oscFreq],
    };
  }

  updateScale(scale) {
    this.scale = scale;
    if (this.gl) this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
  }

  compile(shader, source) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    }
  }

  test(source) {
    let result = null;
    const gl = this.gl;
    if (!gl) return 'WebGL2 not supported';
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      result = gl.getShaderInfoLog(shader);
    }
    gl.deleteShader(shader);
    return result;
  }

  reset() {
    const gl = this.gl;
    if (!gl) return;
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) {
        gl.detachShader(this.program, this.vs);
        gl.deleteShader(this.vs);
      }
      if (this.fs) {
        gl.detachShader(this.program, this.fs);
        gl.deleteShader(this.fs);
      }
      gl.deleteProgram(this.program);
    }
  }

  setup() {
    const gl = this.gl;
    if (!gl) return;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    this.compile(this.vs, vertexSrc);
    this.compile(this.fs, this.shaderSource);
    this.program = gl.createProgram();
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const gl = this.gl;
    if (!gl || !this.program) return;
    const program = this.program;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    program._resolution = gl.getUniformLocation(program, 'resolution');
    program._time = gl.getUniformLocation(program, 'time');
    program._move = gl.getUniformLocation(program, 'move');
    program._touch = gl.getUniformLocation(program, 'touch');
    program._pointerCount = gl.getUniformLocation(program, 'pointerCount');
    program._pointers = gl.getUniformLocation(program, 'pointers');
    program._tintTop = gl.getUniformLocation(program, 'tintTop');
    program._tintBottom = gl.getUniformLocation(program, 'tintBottom');
    program._fogColor = gl.getUniformLocation(program, 'fogColor');
    program._oscFreq = gl.getUniformLocation(program, 'oscFreq');
  }

  render(now = 0) {
    const gl = this.gl;
    if (!gl) return;
    const program = this.program;
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.uniform2f(program._resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(program._time, now * 1e-3);
    gl.uniform2f(program._move, this.mouseMove[0], this.mouseMove[1]);
    gl.uniform2f(program._touch, this.mouseCoords[0], this.mouseCoords[1]);
    gl.uniform1i(program._pointerCount, this.nbrOfPointers);
    gl.uniform2fv(program._pointers, this.pointerCoords);
    const s = 0.015;
    for (const key of ['tintTop', 'tintBottom', 'fogColor', 'oscFreq']) {
      for (let j = 0; j < 3; j++) {
        this.currentColors[key][j] += (this.targetColors[key][j] - this.currentColors[key][j]) * s;
      }
    }
    gl.uniform3fv(program._tintTop, this.currentColors.tintTop);
    gl.uniform3fv(program._tintBottom, this.currentColors.tintBottom);
    gl.uniform3fv(program._fogColor, this.currentColors.fogColor);
    gl.uniform3fv(program._oscFreq, this.currentColors.oscFreq);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

class PointerHandler {
  constructor(element, scale) {
    this.scale = scale;
    this.active = false;
    this.pointers = new Map();
    this.lastCoords = [0, 0];
    this.moves = [0, 0];

    const map = (el, s, x, y) => [x * s, el.height - y * s];

    element.addEventListener('pointerdown', (e) => {
      this.active = true;
      this.pointers.set(e.pointerId, map(element, this.scale, e.clientX, e.clientY));
    });

    element.addEventListener('pointerup', (e) => {
      if (this.pointers.size === 1) {
        this.lastCoords = this.getFirst();
      }
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener('pointerleave', (e) => {
      if (this.pointers.size === 1) {
        this.lastCoords = this.getFirst();
      }
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener('pointermove', (e) => {
      if (!this.active) return;
      this.lastCoords = [e.clientX, e.clientY];
      this.pointers.set(e.pointerId, map(element, this.scale, e.clientX, e.clientY));
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
    });
  }

  updateScale(scale) { this.scale = scale; }
  get count() { return this.pointers.size; }
  get move() { return this.moves; }

  get coords() {
    return this.pointers.size > 0
      ? Array.from(this.pointers.values()).flat()
      : [0, 0];
  }

  getFirst() {
    return this.pointers.values().next().value || this.lastCoords;
  }
}

function useShaderBackground(shaderColorsRef) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef();
  const rendererRef = useRef(null);
  const pointersRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    rendererRef.current = new WebGLRenderer(canvas, dpr);
    pointersRef.current = new PointerHandler(canvas, dpr);

    rendererRef.current.setup();
    rendererRef.current.init();

    const resize = () => {
      if (!canvasRef.current) return;
      const c = canvasRef.current;
      const d = Math.max(1, 0.5 * window.devicePixelRatio);
      const w = c.offsetWidth || window.innerWidth;
      const h = c.offsetHeight || window.innerHeight;
      c.width = w * d;
      c.height = h * d;
      if (rendererRef.current) rendererRef.current.updateScale(d);
      if (pointersRef.current) pointersRef.current.updateScale(d);
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    if (rendererRef.current.test(defaultShaderSource) === null) {
      rendererRef.current.updateShader(defaultShaderSource);
    }

    const loop = (now) => {
      if (!rendererRef.current || !pointersRef.current) return;
      if (shaderColorsRef?.current) {
        rendererRef.current.updateColors(shaderColorsRef.current);
      }
      rendererRef.current.updateMouse(pointersRef.current.getFirst());
      rendererRef.current.updatePointerCount(pointersRef.current.count);
      rendererRef.current.updatePointerCoords(pointersRef.current.coords);
      rendererRef.current.updateMove(pointersRef.current.move);
      rendererRef.current.render(now);
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    loop(0);

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (rendererRef.current) rendererRef.current.reset();
    };
  }, []);

  return canvasRef;
}

export default function ShaderBackground({ shaderColorsRef }) {
  const canvasRef = useShaderBackground(shaderColorsRef);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ pointerEvents: 'none', background: 'black' }}
    />
  );
}
