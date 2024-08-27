import React from "react";
import { FaMusic, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="my-4 px-4 text-[#818c94] md:px-8 xl:mx-24 xl:px-4 border-gray-700 border-t border-b text-blue-900">
            <div className="max-w-3xl text-[#818c94] mx-auto">
                <h2 className="text-2xl text-center text-[#fff] mb-4">
                    <FaMusic className="inline-block align-middle mr-2" /> About Wynk Music
                </h2>
                <p className="text-center text-[#818c94]">
                    Wynk Music is India's leading music app, offering over 22 Million songs in various languages and genres. Discover new music, create playlists, and enjoy ad-free streaming.
                </p>
                <div className="flex justify-center mt-4">
                    <a href="#" className="text-[#818c94] hover:text-gray-300 mr-4">
                        <FaFacebook className="inline-block align-middle" />
                    </a>
                    <a href="#" className="text-[#818c94] hover:text-gray-300 mr-4">
                        <FaTwitter className="inline-block align-middle" />
                    </a>
                    <a href="#" className="text-[#818c94] hover:text-gray-300">
                        <FaInstagram className="inline-block align-middle" />
                    </a>
                </div>
                <div className="text-center mt-4">
                    <a href="#" className="text-[#818c94] hover:text-gray-300">
                        Visit Wynk Music
                    </a>
                </div>
                <div className="mt-8 text-center">
                    <h3 className="text-lg font-semibold text-[#fff] mb-2">Explore Wynk Music</h3>
                    <ul className="text-[#818c94]">
                        <li>Top Lists of Music</li>
                        <li>New Releases</li>
                        <li>Editor's Picks</li>
                        <li>Artist Spotlights</li>
                        <li>Genre-based Playlists</li>
                    </ul>
                </div>
                <p className="text-center text-gray-600 mt-8">
                    &copy; 2024 All rights reserved | Airtel Digital Limited
                </p>
            </div>
        </footer>
    );
};

export default Footer;
