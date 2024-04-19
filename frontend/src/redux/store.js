// Import các hàm cần thiết từ thư viện redux toolkit
import { configureStore } from "@reduxjs/toolkit";

// Import reducer của slice auth
import authSlice from "./features/auth/authSlice";

// Tạo store redux sử dụng configureStore từ redux toolkit
const store = configureStore({
  // Định nghĩa reducers cho store, ở đây chỉ có một reducer là auth
  reducer: {
    auth: authSlice.reducer,
  },
});

// Xuất store để có thể sử dụng trong ứng dụng
export default store;
////////////////////////////////////////////////////////////////