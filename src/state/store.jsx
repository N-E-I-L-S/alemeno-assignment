import { configureStore } from '@reduxjs/toolkit'
import CourseSlice from './CourseSlice'

const store = configureStore({
  reducer: {
    courses: CourseSlice
  }
})

export default store