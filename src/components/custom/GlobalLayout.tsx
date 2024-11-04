'use client'
import { ReactNode, useEffect, useState } from 'react';
import NoDataLayout from './NoDataLayout';
import NoSignedUser from '@/app/nouser/page';
import { NavbarUser } from '@/app/layout';
import ImageGrid from './ImageGrid';
import { usePathname, useRouter } from 'next/navigation';
import { useFileUploader } from './FileUploaderContext';
import { HeartFilledIcon } from '@radix-ui/react-icons';

interface GlobalLayoutProps {
    user: NavbarUser | null;
    images: any[];
    children: ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ user, images, children }) => {
    const { openUploaderDialog } = useFileUploader();
    const router = useRouter();
    const pathName = usePathname();
    const formattedPathname = pathName.startsWith('/') ? pathName.slice(1) : pathName;
    const [buttonText, setButtonText] = useState<string>("");
    const [messageBody, setMessageBody] = useState<string | JSX.Element>("");

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const displayPathname = capitalizeFirstLetter(formattedPathname)

    useEffect(() => {
        // Set the button text based on the pathname
        if (formattedPathname.toLowerCase() === 'personal' || formattedPathname.toLowerCase() === 'private') {
            setButtonText("+ Add New Image");
            setMessageBody(`Click the button and add your first ${formattedPathname} image`)
        } else if (formattedPathname.toLowerCase() === 'favourites') {
            setButtonText("Go to Dashboard");
            setMessageBody(
                <span className="flex items-center">
                    Navigate to dashboard and  <HeartFilledIcon className="text-red-500 size-6 inline-block mx-2" /> your first image
                </span>
            )
        } else {
            setButtonText("+ Add New Image"); // Default or fallback text
        }
    }, [formattedPathname]);

    if (!user) {
        // If user is not authenticated, return a No User Layout
        return (
            <NoSignedUser
                noUserText="You must be logged in to see this page content"
            />
        );
    }

    const handleButtonClick = () => {
        if (formattedPathname.toLowerCase() === 'personal' || formattedPathname.toLowerCase() === 'private') {
            openUploaderDialog()
        } else if (formattedPathname.toLowerCase() === 'favourites') {
            router.push('/dashboard')
        }
    }

    if (!images || images.length === 0) {
        // If there is no data, return a No Data Layout
        return (
            <NoDataLayout 
                messageTitle={displayPathname}
                messageBody={messageBody}
                buttonText={buttonText}
                onButtonClick={handleButtonClick}
            />
        );
    }

     // Render the standard layout with ImageGrid if data exists
     return (
        <>
                {children}
                {/* <ImageGrid user={user} images={images} showHearted={true} showEdit={true} /> */}
            </>
    );
};

export default GlobalLayout;