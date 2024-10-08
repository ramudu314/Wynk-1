import { styled } from "@mui/material/styles";
import { Box, Modal, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import validator from "validator";
// import { userAuth } from "../../redux/users/userActions";
import { useDispatch, useSelector } from "react-redux";
import { createUser, userSelector } from "../../redux/users/userSlice";
import Swal from "sweetalert2";
import axios from "axios";
import loginImg from "../../assets/images/login.png";
import UpdatePassword from "./UpdatePassword";

const LoginModal = ({
    open,
    handleModal,
    isUpdatePassword,
    setIsUpdatePassword,
}) => {
    // const [open, setOpen] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCurrent, setPasswordCurrent] = useState("");
    const [isError, setIsError] = useState({
        username: "",
        email: "",
        password: "",
        passwordCurrent: "",
    });

    const dispatch = useDispatch();
    const userData = useSelector(userSelector);
    const token = userData?.token;

    const emailOnchange = (inputEmail) => {
        // validator.isEmail(inputEmail)
        if (validator.isEmail(inputEmail)) {
            setIsError((prev) => ({
                ...prev,
                email: "",
            }));
        } else {
            setIsError((prev) => ({
                ...prev,
                email: "Enter Valid Email",
            }));
        }
        setEmail(inputEmail);
    };

    const userAuth = async (userDetails, operation) => {
        const projectId = "f104bi07c490";
        // console.log("userDetails: " + userDetails);
        // console.log("operation: " + operation);
        // const data1 = {
        //     email: "wynk1@email.com",
        //     password: "wynk1",
        //     appType: "music",
        // };
        let url = "";

        if (operation === "signup") {
            url = `https://academics.newtonschool.co/api/v1/user/signup`;
        }
        if (operation === "login") {
            url = `https://academics.newtonschool.co/api/v1/user/login`;
        }
        if (operation === "updatePassword") {
            url = `https://academics.newtonschool.co/api/v1/user/updateMyPassword`;
        }

        const headersObj = {
            projectId: projectId,
        };
        if (isUpdatePassword) {
            headersObj["Authorization"] = `Bearer ${token}`;
        }

        const response = await axios({
            url: url,
            method: isUpdatePassword ? "PATCH" : "post",
            headers: {
                ...headersObj,
                "Content-Type": "application/json",
            },
            data: {
                ...userDetails,
            },
        });

        return response;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password,
            appType: "music",
        };
        let operation = "login";
        if (isSignUp) {
            data["name"] = username;
            operation = "signup";
            // signUpUser(data);
        }
        if (isUpdatePassword) {
            data["name"] = username;
            data["password"] = password;
            data["passwordCurrent"] = passwordCurrent;
            operation = "updatePassword";
        }
        // console.log("data");
        // console.log(data);

        const response = await userAuth(data, operation).catch((error) => {
            return { status: error.response.status, response: error.response };
        });

        if (isUpdatePassword) {
            setIsUpdatePassword(false);
        }
        handleModal();
        // console.log(response);
        if (response.status === 200 || response.status === 201) {
            // console.log(response);
            // localStorage.setItem("user", JSON.stringify(response.data.data));
            if (isSignUp) {
                dispatch(createUser(response.data));

                Swal.fire(
                    "Sign-up successful",
                    "Now you can login.",
                    "success"
                );
                // handleModal();
            } else if (isUpdatePassword) {
                Swal.fire("Successful", "Password has been updated", "success");
            } else {
                dispatch(createUser(response.data));
                Swal.fire("Success", "Login successful", "success");
            }
        } else {
            // console.log(response.status);
            // console.log(response?.response?.data?.message);
            Swal.fire(
                `Error status code: ${response.status}`,
                response?.response?.data?.message || "Error",
                "error"
            );
        }
    };

    const validateStates = () => {
        if (isUpdatePassword && passwordCurrent === "") {
            return false;
        }
        if (
            isSignUp &&
            username != "" &&
            validator.isEmail(email) &&
            password != ""
        ) {
            return true;
        } else if (!isSignUp && validator.isEmail(email) && password != "") {
            return true;
        } else {
            return false;
        }
    };

    // useEffect(() => {
    //     if (userData.error) {
    //         Swal.fire("Error", userData.error, "error");
    //     } else if (userData.success) {
    //         Swal.fire("Success", "Login successful", "success");
    //     }
    // }, [userData]);

    const IOSSwitch = styled((props) => (
        <Switch
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
            {...props}
            checked={isSignUp}
            onChange={() => setIsSignUp((prev) => !prev)}
        />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        "& .MuiSwitch-switchBase": {
            padding: 0,
            margin: 2,
            transitionDuration: "300ms",
            "&.Mui-checked": {
                transform: "translateX(16px)",
                color: "#fff",
                "& + .MuiSwitch-track": {
                    backgroundColor: "#65C466",
                    opacity: 1,
                    border: 0,
                },
                "&.Mui-disabled + .MuiSwitch-track": {
                    opacity: 0.5,
                },
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
                color: "#33cf4d",
                border: "6px solid #fff",
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
                color:
                    theme.palette.mode === "light"
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
            },
        },
        "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 22,
            height: 22,
        },
        "& .MuiSwitch-track": {
            borderRadius: 26 / 2,
            backgroundColor:
                theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
            opacity: 1,
            transition: theme.transitions.create(["background-color"], {
                duration: 500,
            }),
        },
    }));

    return (
        <>
            <Modal
                open={open}
                onClose={handleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className=" "
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                }}
            >
                <Box className=" inline-block text-white w-full max-w-3xl sm:w-auto overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl opacity-100 scale-100 ">
                    <Box className="grid grid-cols-7 md:grid-cols-12 md:h-[500px] ">
                        <Box
                            className={` hidden md:block col-span-5 w-full bg-no-repeat h-full bg-cover `}
                            sx={{ backgroundImage: `url(${loginImg})` }}
                        ></Box>
                        {/* bg-[url('../../../public/assets/images/login.png')] */}
                        {/* bg-[url('assets/images/login.png')] */}

                        <Box className=" bg-[#21252d] col-span-7 ">
                            <Box></Box>

                            <Box className="m-6 mb-3 min-[370px]:m-12 min-[370px]:mb-8 ">
                                <Box className="text-2xl font-medium mb-2 ">
                                    {isSignUp
                                        ? "Sign Up"
                                        : isUpdatePassword
                                        ? "Update Password"
                                        : "Login"}
                                </Box>
                                <Typography
                                    component={"p"}
                                    className="mb-4 text-[#b7c0c4] "
                                >
                                    Get a personalised experience, and access
                                    all your music
                                </Typography>

                                {!isUpdatePassword && (
                                    <>
                                        <Box className="mb-2 flex items-center text-[#d0d6d8] ">
                                            <IOSSwitch sx={{ m: 1 }} />
                                            <Typography
                                                component={"p"}
                                                className="text-[14px] "
                                            >
                                                Toggle to{" "}
                                                {isSignUp ? "Login" : "Sign Up"}
                                            </Typography>
                                        </Box>
                                    </>
                                )}
                                {/* <form
                                    action={(e) => handleSubmit(e)}
                                    method="post" > */}
                                <Box
                                    className={
                                        isSignUp || isUpdatePassword
                                            ? "block"
                                            : "hidden"
                                    }
                                >
                                    <input
                                        type="name"
                                        className="p-2 w-full max-[370px]:w-56 rounded-md bg-black border-[1px] border-black focus-visible:outline-none "
                                        placeholder="Enter Name"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                    <Box
                                        className={`text-[#f2a222] text-sm mt-1 ${
                                            isError.username === ""
                                                ? "hidden"
                                                : "block"
                                        } `}
                                    >
                                        {isError.username}
                                    </Box>
                                </Box>
                                <Box className="mt-4">
                                    <input
                                        type="email"
                                        className="p-2 w-full max-[370px]:w-56 rounded-md bg-black border-[1px] border-black focus-visible:outline-none "
                                        placeholder="Enter Email-ID"
                                        value={email}
                                        onChange={
                                            (e) => emailOnchange(e.target.value)
                                            // setEmail(e.target.value)
                                        }
                                    />
                                    <Box
                                        className={`text-[#f2a222] text-sm mt-1 ${
                                            isError.email === ""
                                                ? "hidden"
                                                : "block"
                                        } `}
                                    >
                                        {isError.email}
                                    </Box>
                                </Box>
                                {isUpdatePassword && (
                                    <Box className="mt-4">
                                        <input
                                            type="password"
                                            className="p-2 w-full max-[370px]:w-56 rounded-md bg-black border-[1px] border-black focus-visible:outline-none mobile-input_loginInput__ZJULr"
                                            placeholder={`Enter Old Password `}
                                            value={passwordCurrent}
                                            onChange={(e) =>
                                                setPasswordCurrent(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Box
                                            className={`text-[#f2a222] text-sm mt-1 ${
                                                isError.passwordCurrent === ""
                                                    ? "hidden"
                                                    : "block"
                                            } `}
                                        >
                                            {isError.passwordCurrent}
                                        </Box>
                                    </Box>
                                )}
                                <Box className="mt-4">
                                    <input
                                        type="password"
                                        className="p-2 w-full max-[370px]:w-56 rounded-md bg-black border-[1px] border-black focus-visible:outline-none mobile-input_loginInput__ZJULr"
                                        placeholder={`${
                                            isUpdatePassword
                                                ? "Enter New Password"
                                                : "Enter Password"
                                        } `}
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <Box
                                        className={`text-[#f2a222] text-sm mt-1 ${
                                            isError.password === ""
                                                ? "hidden"
                                                : "block"
                                        } `}
                                    >
                                        {isError.password}
                                    </Box>
                                </Box>
                                <Box className="mt-4 flex">
                                    <button
                                        type="submit"
                                        className={`inline-flex min-w-[114px] justify-center py-2 px-4 text-sm leading-5 font-[500]text-white  border-[#ed1c24] border-[1px] rounded-full ${
                                            validateStates()
                                                ? "bg-[#ed1c24]"
                                                : "bg-red-800 cursor-not-allowed"
                                        } `}
                                        onClick={(e) => handleSubmit(e)}
                                        disabled={!validateStates()}
                                    >
                                        {/* bg-[#ed1c24] */}
                                        {isSignUp
                                            ? "Sign Up"
                                            : isUpdatePassword
                                            ? "Update Password"
                                            : "Login"}
                                    </button>
                                </Box>
                                {/* </form> */}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default LoginModal;
