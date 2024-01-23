import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../state/CourseSlice';
import { NavLink } from 'react-router-dom';

export default function CourseList() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const selectedCourse = useSelector((state) => state.courses.selectedCourse);
  const status = useSelector((state) => state.courses.status);
  const error = useSelector((state) => state.courses.error);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Courses</h1>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={handleSearch}
        className="border border-gray-300 p-2 mb-4 rounded-md"
      />

      {status === 'loading' && <p className="text-gray-700">Loading...</p>}
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
      {status === 'succeeded' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <NavLink to={`/course/${course.id}`} key={course.id} style={{ textDecoration: "none", color: "black" }}>
              <div className="border border-gray-300 p-4 rounded-md transition duration-300 hover:shadow-lg">
                <img src={course.thumbnail} alt="Course Image" className="mb-2 w-full h-40 object-cover rounded-md" />
                <h4 className="text-lg font-semibold">{course.name}</h4>
                <p className="text-gray-600">Instructor: {course.instructor}</p>
                <p className="text-gray-600">Likes: {course.likes}</p>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
