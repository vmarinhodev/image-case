/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'jdltlsfunkwytxckzmhg.supabase.co',
            }
        ]
    }

};

export default nextConfig;
