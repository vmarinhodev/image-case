import { ReactNode } from 'react';
import NoDataLayout from './NoDataLayout';
import NoSignedUser from '@/app/nouser/page';
import { NavbarUser } from '@/app/layout';
import ImageGrid from './ImageGrid';

interface GlobalLayoutProps {
    user: NavbarUser | null;
    images: any[];
    children: ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ user, images, children }) => {

    if (!user) {
        // If user is not authenticated, return a No Data Layout
        return (
            <NoSignedUser
                noUserText="No user. You must be logged in to see this page."
            />
        );
    }
    if (!images || images.length === 0) {
        // If user is not authenticated, return a No Data Layout
        return (
            <NoDataLayout 
                message="No private Images yet"
                buttonText="+ Add new Image"
                buttonLink="/personal" // Adjust this link as necessary
            />
        );
    }

     // Render the standard layout with ImageGrid if data exists
     return (
        <main className="min-h-screen p-10">
            <div className="container mx-auto">
                {children}
                {/* <ImageGrid user={user} images={images} showHearted={true} showEdit={true} /> */}
            </div>
        </main>
    );
};

export default GlobalLayout;