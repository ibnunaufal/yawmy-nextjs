// import Avatar from '@/components/Avatar';
import React from 'react';

const ProfilePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* <Avatar /> */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <img
                    className="w-24 h-24 rounded-full mx-auto"
                    src="https://picsum.photos/200"
                    alt="Avatar"
                />
                <h2 className="text-xl font-semibold text-center mt-4">John Doe</h2>
                <p className="text-gray-600 text-center mt-2">john.doe@example.com</p>
            </div>
        </div>
    );
};

export default ProfilePage;