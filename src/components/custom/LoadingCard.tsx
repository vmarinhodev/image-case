// components/custom/LoadingCard.tsx
import React from 'react';

const LoadingCard = () => {
    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg p-4 animate-pulse min-w-[250px] min-h-[350px]"> {/* Set min width and height */}
            {/* Placeholder for image with defined height */}
            <div className="bg-gray-200 h-64 rounded-lg mb-4 w-full"></div> 
            <div className="mt-4 space-y-2"> {/* Space between title and description */}
                {/* Placeholder for title */}
                <div className="bg-gray-300 h-4 rounded w-full"></div> {/* Full width for title */}
                {/* Placeholder for description */}
                <div className="bg-gray-300 h-3 rounded w-5/6"></div> {/* Slightly less than full width for description */}
                <div className="bg-gray-300 h-3 rounded w-4/5"></div> {/* Another line for description */}
            </div>
        </div>
    );
};

export default LoadingCard;
