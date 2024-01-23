// src/redux/courseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  student: null,
  courses: [],
  error: null,
  onestatus: 'idle',
  oneerror: null,
  oneCourse: null,
  status: 'idle',
};


export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axios.get('http://localhost:3000/courses');
  return response.data;
});

export const fetchOneCourse = createAsyncThunk('courses/fetchOneCourse', async (courseId) => {
  console.log(courseId)
  const response = await axios.get(`http://localhost:3000/course/${courseId}`);
  return response.data;
});

const CourseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    incrementLikes(state, action) {
      const { courseId, likes } = action.payload;
      const course = state.courses.find((c) => c.courseId === courseId);
      if (course) {
        course.likes = likes;
      }
    },
    addstudent(state, action){
      console.log(action.payload)
      state.student=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchOneCourse.pending, (state) => {
        state.onestatus = 'loading';
      })
      .addCase(fetchOneCourse.fulfilled, (state, action) => {
        state.onestatus = 'succeeded';
        state.oneCourse = action.payload;
        state.oneerror = null;
      })
      .addCase(fetchOneCourse.rejected, (state, action) => {
        state.onestatus = 'failed';
        state.oneerror = action.payload;
      });
  },
});

// Export the reducer and actions
export const { incrementLikes, addstudent } = CourseSlice.actions;
export default CourseSlice.reducer;
