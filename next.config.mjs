/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
<<<<<<< HEAD
                protocol: 'https',
                hostname: 'jdltlsfunkwytxckzmhg.supabase.co',
=======
                protocol: 'http',
                // hostname: 'jdltlsfunkwytxckzmhg.supabase.co',
                hostname: '127.0.0.1',
>>>>>>> personal-page
            }
        ]
    },
};

export default nextConfig;
