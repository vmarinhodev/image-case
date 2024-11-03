import Link from 'next/link';

interface NoDataLayoutProps {
    message: string; // Message to display when there's no data
    buttonText?: string; // Optional text for a button
    buttonLink?: string; // Optional link for the button
}

export default function NoDataLayout({ message, buttonText, buttonLink }: NoDataLayoutProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center py-10">
        <h1 className="text-4xl font-bold">No Images Available</h1>
        <p className="mt-4 text-lg">{message}</p>
        {buttonText && buttonLink && (
            <Link href={buttonLink}>
                <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    {buttonText}
                </button>
            </Link>
        )}
    </div>
    );
}