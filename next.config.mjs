/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'hbbplmgyfcvqkbwszgiu.supabase.co',
            }
        ]
    }

};

export default nextConfig;
