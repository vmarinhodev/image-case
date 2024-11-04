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
                //hostname: '127.0.0.1',
            }
        ]
    },
};

export default nextConfig;
