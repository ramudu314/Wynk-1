import React from "react";
import { FaMusic, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="my-4 px-4 text-[#818c94] md:px-8 xl:mx-24 xl:px-4 border-gray-700 border-t border-b text-blue-900 pt-10">
            <div className="max-w-7xl text-[#818c94] mx-auto">
                <h2 className="text-2xl text-center text-[#fff] mb-4">
                    <FaMusic className="inline-block align-middle mr-2" /> About Wynk Music
                </h2>
                <p className="text-center text-[#818c94]">
                    Wynk Music is India's leading music app, offering over 22 Million songs in various languages and genres. Discover new music, create playlists, and enjoy ad-free streaming.
                </p>
               
                <div className="text-center mt-4">
                    <a href="#" className="text-[#818c94] hover:text-gray-300">
                        Visit Wynk Music
                    </a>
                </div>
                

                {/* New Section: Grid of Playlists and Songs */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-8">
                    <div>
                        <h3 className="text-[#fff] font-semibold mb-4">REGIONAL PLAYLISTS</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>New Bengali Songs</li>
                            <li>New Bhojpuri Songs</li>
                            <li>New English Songs</li>
                            <li>New Hindi Songs</li>
                            <li>New Kannada Songs</li>
                            <li>New Marathi Songs</li>
                            <li>New Tamil Songs</li>
                            <li>New Telugu Songs</li>
                            <li>New Gujarati Songs</li>
                            <li>New Assamese Songs</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[#fff] font-semibold mb-4">LATEST SONGS</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Zaroorat Se Zyada</li>
                            <li>Chal Ve Dila (From "Khel Khel Mein")</li>
                            <li>Khoobsurat (From "Stree 2")</li>
                            <li>Jee Loon Main Tujhko</li>
                            <li>Asar Tera Kaisa</li>
                            <li>Dheere Dheere (From "Devara Part 1")</li>
                            <li>Dhola</li>
                            <li>Aayi Nai (From "Stree 2")</li>
                            <li>Dil Vasda (From "Ghuchaddi")</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[#fff] font-semibold mb-4">TRENDING SONGS</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Dil Tu Jaan Tu</li>
                            <li>Chuttamalle (From "Devara Part 1")</li>
                            <li>Aaj Ki Raat (From "Stree 2")</li>
                            <li>Sajni (From "Laapata Ladies")</li>
                            <li>Dwapara (From "Krishnam Pranaya Sakhi")</li>
                            <li>Tainu Khabar Nahi</li>
                            <li>Fear Song (From "Devara Part 1")</li>
                            <li>Du Ur Na Karin (From "Khel Khel Mein")</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[#fff] font-semibold mb-4">SONGS WITH LYRICS</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Coca Cola</li>
                            <li>Bom Diggy Diggy</li>
                            <li>Machayenge</li>
                            <li>Tera Yaar Hoon Main</li>
                            <li>Kar Gayi Chull (From "Kapoor & Sons")</li>
                            <li>Morni Banke</li>
                            <li>Chalti Hai Kya 9 Se 12</li>
                            <li>Hawayein</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[#fff] font-semibold mb-4">WYNK TOP HITS</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Top 20 Bollywood Songs</li>
                            <li>Wynk Top 100 Songs</li>
                            <li>Top 20 English Songs</li>
                            <li>Trending Reels Songs</li>
                        </ul>
                    </div>
                </div>

                {/* New Section: Wynk Music Description */}
                <div className="text-center mt-8 text-gray-400">
                    <p>
                        Wynk Music is the one-stop music app for the latest to the greatest songs that you love. 
                        Play your favourite music online for free or download mp3. 
                        Enjoy from over 22 Million Hindi, English, Bollywood, Regional, Latest, Old songs and more.
                    </p>
                </div>

                {/* New Section: Copyright Line */}
                <div className="flex justify-between items-center mt-8 border-t pt-5 border-gray-700">
                    <p className="text-[#818c94]">
                        &copy; 2024 All rights reserved | Airtel Digital Limited
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-[#818c94] hover:text-gray-300">
                            <FaFacebook className="inline-block align-middle" />
                        </a>
                        <a href="#" className="text-[#818c94] hover:text-gray-300">
                            <FaTwitter className="inline-block align-middle" />
                        </a>
                        <a href="#" className="text-[#818c94] hover:text-gray-300">
                            <FaInstagram className="inline-block align-middle" />
                        </a>
                    </div>
                </div>
                <div className="border-b pt-5 border-gray-700"></div>

                <p className="text-center text-gray-600 mt-8">
                    &copy; 2024 All rights reserved | Airtel Digital Limited
                </p>
            </div>
        </footer>
    );
};

export default Footer;
