"use client";
import React, {useRef, useState} from "react";
import {IKUpload, ImageKitProvider} from "imagekitio-next";
import {useUploadImageStore} from "@/lib/store/store";

export default function ImageUpload({image}: { image?: any}) {

    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
    const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(image || null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const {setImageUrl} = useUploadImageStore(state => state);

    const handleDeleteImage = () => {
        // Reset all states related to image upload
        setImageUrl(null);
        setImagePreview(null);
        setUploadError(null);
        setUploadLoading(false);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFileInput = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const authenticator = async () => {
        try {
            const response = await fetch("/api/imagekit-auth");

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error: any) {
            console.error("Authentication error:", error);
            setUploadError("Authentication failed. Please try again.");
            return { signature: '', expire: 0, token: '' };
        }
    };

    const onError = (err: any) => {
        console.error("Upload Error", err);
        setUploadError("Upload failed. Please try again.");
        setUploadLoading(false);
    };

    const onUploadProgress = (progress: any) => {
        setUploadLoading(true);
    };

    const onSuccess = (res: any) => {
        console.log("Upload Success", res);
        setImageUrl(res.url);
        setImagePreview(res.url);
        setUploadError(null);
        setUploadLoading(false);
    };

    const validateFileType = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

            if (!allowedTypes.includes(file.type)) {
                setUploadError("Invalid file type. Please upload an image (JPEG, PNG, GIF, or WebP).");

                // Clear the file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                return false;
            }
            setUploadError(null);
        }
        return true;
    };

    return (
        <div className="App">
            <div className="flex flex-col items-center gap-4 pb-4">
                <div
                    className={`flex flex-col items-center justify-center w-[150px] h-[150px] border-2 rounded-lg cursor-pointer relative overflow-hidden 
                        ${uploadError
                        ? 'border-red-500 bg-red-50'
                        : 'bg-gray-100 border-dashed border-gray-300'
                    }`}
                    onClick={(e) => triggerFileInput(e)}
                >
                    {imagePreview ? (
                        <>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </>
                    ) : (
                        <>
                            <>
                                {uploadLoading && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <p className="text-white">Uploading...</p>
                                    </div>
                                )}
                                {!uploadLoading && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M11.9917 20.6211C11.3654 20.6211 10.9422 20.1895 10.9422 19.5462V9.51693L11.0099 7.68034L9.00407 9.94857L7.09977 11.8444C6.90511 12.0306 6.6512 12.1576 6.34652 12.1576C5.771 12.1576 5.33936 11.7344 5.33936 11.1419C5.33936 10.8626 5.44938 10.6003 5.66943 10.3802L11.2131 4.82812C11.4162 4.61654 11.7039 4.49805 11.9917 4.49805C12.2795 4.49805 12.5757 4.61654 12.7788 4.82812L18.3224 10.3802C18.5425 10.6003 18.6525 10.8626 18.6525 11.1419C18.6525 11.7344 18.2209 12.1576 17.6453 12.1576C17.3407 12.1576 17.0868 12.0306 16.8921 11.8444L14.9793 9.94857L12.9735 7.68034L13.0496 9.51693V19.5462C13.0496 20.1895 12.618 20.6211 11.9917 20.6211Z"
                                            fill="#171717"
                                        />
                                    </svg>
                                )}
                            </>
                        </>
                    )}

                    <ImageKitProvider
                        publicKey={publicKey}
                        urlEndpoint={urlEndpoint}
                        authenticator={authenticator}
                    >
                        <IKUpload
                            useUniqueFileName
                            onError={onError}
                            onSuccess={onSuccess}
                            onUploadProgress={onUploadProgress}
                            ref={fileInputRef}
                            onChange={validateFileType}
                            accept=".jpg,.jpeg,.png,.gif,.webp"
                            className="hidden"
                        />
                    </ImageKitProvider>
                </div>

                {uploadError && (
                    <p className="text-red-500 text-sm mt-2">{uploadError}</p>
                )}

                {imagePreview ? (
                    <div className="flex gap-2">
                        <button
                            onClick={handleDeleteImage}
                            className="px-4 py-1 bg-[#501414FF] text-white rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                        <button
                            onClick={(e) => {
                                setImagePreview(null);
                                e.preventDefault();
                                e.stopPropagation();
                                triggerFileInput(e);
                            }}
                            className="px-4 py-1 bg-[#121b40] text-white rounded-md hover:bg-[#283C8CFF]"
                        >
                            Replace Image
                        </button>
                    </div>
                ) : (
                    <label className="text-gray-600 text-sm font-medium">
                        Click to upload
                    </label>
                )}
            </div>
        </div>
    );
}