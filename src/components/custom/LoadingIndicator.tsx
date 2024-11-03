// components/LoadingIndicator.tsx
import { useIsFetching } from '@tanstack/react-query';

const LoadingIndicator = () => {
    const isFetching = useIsFetching();
    
    if (isFetching) {
        console.log('loading')
        return (
            <div className="fixed top-8 left-0 w-full h-1 bg-blue-500 animate-pulse z-50"></div>
            
        );
    }
    return null;
};

export default LoadingIndicator;
