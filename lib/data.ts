export const links = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "About",
        path: "/about",
    },
    {
        name: "Projects",
        path: "/projects",
    },
    {
        name: "Contact",
        path: "/contact",
    },
    {
        name: "Blog",
        path: "/blog",
    },
] as const;

export const yearsOfExperience = 4;

export const projects = [
    {
        name: "Invoify",
        description: "An invoice generator web application",
        tech: ["Next.js", "React", "TypeScript", "Shadcn-UI"],
        startDate: "September 2023",
        links: {
            website: "https://invoify.vercel.app",
            github: "https://github.com/aliabb01/invoify",
        },
        mainImage: "/assets/projects/invoify.png",
    },
    {
        name: "EvAl",
        description: "A real estate listing platform",
        tech: ["Laravel", "Vue.js", "Vuex"],
        startDate: "February 2022",
        endDate: "May 2022",
        links: {
            github: "https://github.com/aliabb01/eval",
        },
        mainImage: "/assets/projects/eval.png",
    },
    {
        name: "RRW",
        description: "Railway reservation web application",
        tech: ["Laravel", "PHP", "Blade"],
        startDate: "February 2020",
        endDate: "June 2020",
        links: {
            github: "https://github.com/aliabb01/rrw",
        },
        mainImage: "/assets/projects/rrw.png",
    },
];
