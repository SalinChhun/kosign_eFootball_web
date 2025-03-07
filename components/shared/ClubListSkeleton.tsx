import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ClubListSkeleton() {
    // Create an array of 5 placeholder items
    const skeletonItems = Array(5).fill(0);

    return (
        <>
            {skeletonItems.map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative"
                >
                    <div className="p-6 border-t-4 rounded-t-lg">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 mb-4">
                                <Skeleton circle height={96} width={96}/>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 w-full">
                                <Skeleton height={24} width="80%"/>
                            </h3>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}