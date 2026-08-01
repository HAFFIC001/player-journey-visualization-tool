export type Viewport = {
    offsetX: number;
    offsetY: number;
    size: number;
  };
  
  export function getViewport(
    width: number,
    height: number
  ): Viewport {
    const size = Math.min(width, height);
  
    return {
      size,
      offsetX: (width - size) / 2,
      offsetY: (height - size) / 2,
    };
  }