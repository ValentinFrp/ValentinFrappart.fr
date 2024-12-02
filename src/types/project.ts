export interface Project {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
}

export interface Project3DCardProps {
    title: string;
    image: string;
    position: [number, number, number];
}