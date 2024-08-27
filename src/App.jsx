import {
    BrowserRouter,
    Route,
    Router,
    RouterProvider,
    Routes,
    createBrowserRouter,
    createRoutesFromElements,
    useLocation,
} from "react-router-dom";
import "./App.css";
import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Navbar/Header";
import HomePage from "./components/Home/HomePage";
import Footer from "./components/Footer/Footer";
import PlayerPage from "./components/MusicPlayer/PlayerPage";
import PlayMusic from "./components/PlayMusic/PlayMusic";
import { useDispatch, useSelector } from "react-redux";
import {
    addAlbumArtists,
    addSongIndex,
    addSongs,
    setLikedSongs,
    songSelector,
} from "./redux/songs/songSlice";
import { useEffect, useState } from "react";
import { createUser } from "./redux/users/userSlice";
import MyMusic from "./components/MyMusic/MyMusic";
import jwtDecode from "jwt-decode";
import SelectPlan from "./components/Subscription/SelectPlan";
import { isSubscriptionPageSelector } from "./redux/subscription/subscriptionSlice";
import Search from "./components/Search/search";
import { UserProvider } from "./components/UserProvider";
import MusicContainer from "./components/MusicPlayer/MusicContainer"

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: ["Roboto", "sans-serif"].join(","),
        },
    },
});

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <HomePage />,
//     },
//     {
//         path: "/player",
//         element: <PlayerPage />,
//     },
// ]);


function App() {
    const songs = useSelector(songSelector);
    const dispatch = useDispatch();

    const isSubscriptionPage = useSelector(isSubscriptionPageSelector);

    useEffect(() => {
        if (!songs.length) {
            if (localStorage.getItem("songs")) {
                let isLikedSongs = false;
                if (JSON.parse(localStorage.getItem("isLikedSongs"))) {
                    isLikedSongs = JSON.parse(
                        localStorage.getItem("isLikedSongs")
                    );
                }

                if (JSON.parse(localStorage.getItem("albumArtists"))) {
                    const albumArtists = JSON.parse(
                        localStorage.getItem("albumArtists")
                    );
                    dispatch(addAlbumArtists(albumArtists));
                }
                dispatch(addSongs(JSON.parse(localStorage.getItem("songs"))));
                dispatch(
                    addSongIndex(
                        JSON.parse(localStorage.getItem("currentSongIndex"))
                    )
                );
                if (isLikedSongs) {
                    dispatch(setLikedSongs());
                }
            }
        }

        if (localStorage.getItem("user")) {
            const userData = JSON.parse(localStorage.getItem("user"));
            const decodedToken = jwtDecode(userData.token);
            const expirationTime = decodedToken.exp;

            const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds

            if (expirationTime < currentTimestamp) {
                console.log("Token has expired");
                localStorage.removeItem("user");
            } else {
                dispatch(createUser(userData));
                // dispatch(createUser(JSON.parse(localStorage.getItem("user"))));
            }
        }
    }, []);
    return (
        <>
        <UserProvider>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    {/* <RouterProvider router={router} />*/}

                    <Navbar />
                    {/* <Header /> */}
                    {!isSubscriptionPage && <Box className="mt-[72px]"></Box>}
                    {/* <Box className="mt-[72px]"></Box> */}
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Header />
                                    <HomePage />
                                </>
                            }
                        />
                        <Route path="search" element={<Search/>}/>
                        <Route path="/player" element={<PlayerPage />} />
                        <Route path="/my-music" element={<MyMusic />} />
                        <Route path="MusicContainer" element={<MusicContainer/>}/>
                        <Route path="/subscription" element={<SelectPlan />} />
                    </Routes>
                    {songs?.length > 0 && <PlayMusic />}
                    {/* <PlayMusic /> */}
                    {!isSubscriptionPage && <Footer />}
                    {/* <Footer /> */}
                </ThemeProvider>
            </BrowserRouter>
            </UserProvider>
        </>
    );
}

export default App;
