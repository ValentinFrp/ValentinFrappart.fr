import { useTexture } from '@react-three/drei';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80';

export const useProjectTexture = (imagePath: string) => {
    let texture;

    try {
        texture = useTexture(imagePath);
    } catch (error) {
        console.warn(`Failed to load texture: ${imagePath}, using fallback`);
        texture = useTexture(FALLBACK_IMAGE);
    }

    return texture;
};