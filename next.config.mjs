/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: '**',
    //             port: "",
    //             pathname: '**',
    //         },
    //     ],
    // }
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ik.imagekit.io",
                port: "",
            },
        ],
    },
};

export default nextConfig;
