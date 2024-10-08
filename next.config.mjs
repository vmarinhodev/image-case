/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'jdltlsfunkwytxckzmhg.supabase.co',
            }
        ]
    },
};

export default nextConfig;
