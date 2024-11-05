import Link from 'next/link';
import { Button } from '../ui/button';
import FileUploader from './FileUploader';

interface NoDataLayoutProps {
    messageTitle: string; // Message to display when there's no data
    messageBody: string | JSX.Element;
    buttonText?: string; // Optional text for a button
    onButtonClick?: () => void; // Optional link for the button
}

export default function NoDataLayout({ messageTitle, messageBody, buttonText, onButtonClick }: NoDataLayoutProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center py-10">
        <h1 className="text-4xl font-bold">No {messageTitle} images to display</h1>
        <p className="mt-4 text-lg">{messageBody}</p>
        <Button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            onClick={onButtonClick}
        >
            {buttonText}
        </Button>
        <FileUploader />
    </div>
    );
}