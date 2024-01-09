import { act, renderHook } from '@testing-library/react';
import { useVideoPreview } from './use-video-preview';

describe('Hook: useVideoPreview', () => {

  it('should return hash', async () => {
    const initialProps = {
      hoverCondition: false,
      delay: 100
    };
    const { result, rerender } = renderHook((initialProps1: {hoverCondition: boolean; delay: number}) => useVideoPreview(initialProps1.hoverCondition, initialProps1.delay), {initialProps});
    const value = result.current;

    expect(value).toBe(false);
    rerender({hoverCondition: true, delay: 100});
    await act(async () => {
      await new Promise((r) => setTimeout(r, 500));
    });
    expect(result.current).toBe(true);
  });

});
