
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from '../../Helpers/axiosInstance';

const storedData = localStorage.getItem("data");
const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: storedData ? parseJsonSafely(storedData) : {}
}

function parseJsonSafely(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return {};
    }
}


const updateStateOnFulfillment = (state, action) => {
    localStorage.setItem("data", JSON.stringify(action?.payload?.user));
    localStorage.setItem("role", action?.payload?.user?.role);
    localStorage.setItem("isLoggedIn", true);
    state.data = action?.payload?.user;
    state.role = action?.payload?.user?.role;
    state.isLoggedIn = true;
};

export const createAccount = createAsyncThunk("auth/createAccount", async (data) => {
    const loadingMessage = toast.loading("Please wait! Creating your account...");
    try {
        const res = await axiosInstance.post("/user/register", data);
        toast.success(res?.data?.message, { id: loadingMessage });
        return res?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
});

export const login = createAsyncThunk("auth/login", async (data) => {
    const loadingMessage = toast.loading("Please wait! Logging into your account...");
    try {
        const res = await axiosInstance.post("/user/login", data);
        toast.success(res?.data?.message, { id: loadingMessage });
        return res?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    const loadingMessage = toast.loading("Logging out...");
    try {
        const res = await axiosInstance.get("/user/logout");
        toast.success(res?.data?.message, { id: loadingMessage });
        return res?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
});

export const getUserData = createAsyncThunk("auth/user/me", async () => {
    const loadingMessage = toast.loading("Fetching profile...");
    try {
        const res = await axiosInstance.get("/user/me");
        toast.success(res?.data?.message, { id: loadingMessage });
        return res?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
});

export const updateUserData = createAsyncThunk("auth/user/update", async (data) => {
    const loadingMessage = toast.loading("Updating changes...");
    try {
        const res = await axiosInstance.post(`/user/update/${data.id}`, data.formData);
        toast.success(res?.data?.message, { id: loadingMessage });
        return res?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
});

export const changePassword = createAsyncThunk("auth/user/changePassword", async (userPassword) => {
    const loadingMessage = toast.loading("Changing password...");
    try {
        const res = await axiosInstance.post("/user/change-password", userPassword);
        toast.success(res?.data?.message, { id: loadingMessage });
        return res?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
});

export const forgetPassword = createAsyncThunk("auth/user/forgetPassword", async (email) => {
    const loadingMessage = toast.loading("Please wait! Sending email...");
    try {
        const res = await axiosInstance.post("/user/reset", { email });
        toast.success(res?.data?.message, { id: loadingMessage });
        return res?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
});

export const resetPassword = createAsyncThunk("auth/user/resetPassword", async (data) => {
    const loadingMessage = toast.loading("Please wait! Resetting your password...");
    try {
        const res = await axiosInstance.post(`/user/reset/${data.resetToken}`, { password: data.password });
        toast.success(res?.data?.message, { id: loadingMessage });
        return res?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccount.fulfilled, (state, action) => {
            updateStateOnFulfillment(state, action);
        });

        builder.addCase(login.fulfilled, (state, action) => {
            updateStateOnFulfillment(state, action);
        });

        builder.addCase(logout.fulfilled, (state, action) => {
            localStorage.removeItem("data");
            localStorage.removeItem("role");
            localStorage.removeItem("isLoggedIn");
            state.data = {};
            state.role = "";
            state.isLoggedIn = false;
        });

        builder.addCase(getUserData.fulfilled, (state, action) => {
            updateStateOnFulfillment(state, action);
        });
    }
});

export default authSlice.reducer;
