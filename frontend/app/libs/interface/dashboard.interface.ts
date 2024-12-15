export interface DashboardProps {
    slides: Slide[];
    // events: Event[];
    // banners: string[];
}

export interface Slide {
    image: string;
    title: string;
    subtitle: string;
}