export const performance = {
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Detect GPU capabilities
  detectGPU: async () => {
    if (typeof window === 'undefined') return { tier: 1 };
    
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      if (!gl) return { tier: 0 };
      
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo 
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : 'Unknown';
      
      // Basic GPU tier detection
      if (renderer.includes('Intel')) return { tier: 1, renderer };
      if (renderer.includes('AMD') || renderer.includes('NVIDIA')) return { tier: 3, renderer };
      
      return { tier: 2, renderer };
    } catch {
      return { tier: 1 };
    }
  },

  // FPS Monitor
  createFPSMonitor: () => {
    let lastTime = performance.now();
    let frames = 0;
    let fps = 0;

    const update = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frames * 1000) / (currentTime - lastTime));
        frames = 0;
        lastTime = currentTime;
      }
      
      return fps;
    };

    return { update, getFPS: () => fps };
  },
};
