import {useState, useEffect} from 'react';

export function useDraggable(ref: React.RefObject<HTMLDivElement>) {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
  
    useEffect(() => {
      const handleMouseUpOrLeave = () => setIsDragging(false);
      window.addEventListener('mouseup', handleMouseUpOrLeave);
      window.addEventListener('mouseleave', handleMouseUpOrLeave);
  
      return () => {
        window.removeEventListener('mouseup', handleMouseUpOrLeave);
        window.removeEventListener('mouseleave', handleMouseUpOrLeave);
      };
    }, []);
  
    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - (ref.current?.offsetLeft || 0));
      setScrollLeft(ref.current?.scrollLeft || 0);
    };
  
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging || !ref.current) return;
      e.preventDefault();
      const x = e.pageX - (ref.current.offsetLeft || 0);
      const walk = (x - startX) * 2;
      ref.current.scrollLeft = scrollLeft - walk;
    };
  
    return { handleMouseDown, handleMouseMove };
  }
  