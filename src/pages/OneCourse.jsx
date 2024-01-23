import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementLikes, fetchOneCourse } from '../state/CourseSlice';
import { useParams, NavLink, useNavigate } from 'react-router-dom';

export default function OneCourse() {
    const courseId = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const onestatus = useSelector((state) => state.courses.status);
    const oneerror = useSelector((state) => state.courses.error);
    const studentId = useSelector((state) => state.courses.student);
    const oneCourse = useSelector((state) => state.courses.oneCourse);

    async function handleEnrollment() {
        const url = 'http://localhost:3000/students/addCourseToEnrollment';
        try {
            const body = {
                studentId: studentId,
                courseId: oneCourse.id,
                courseName: oneCourse.name,
            };
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (response.status === 200) {
                console.log('Course Enrolled');
                navigate("/dashboard")
            }
            else console.log('error');
        } catch {
            console.log('error');
        }
    }

    useEffect(() => {
        dispatch(fetchOneCourse(courseId?.id));
    }, [dispatch]);
    // ... (import statements)

    if (oneCourse)
        return (
            <>
                <NavLink to={'/'} className="text-blue-500 hover:underline my-4 inline-block">
                    Go Back
                </NavLink>
                {onestatus === 'loading' && <p>Loading...</p>}
                {onestatus === 'failed' && <p className="text-red-500">Error: {oneerror}</p>}
                {onestatus === 'succeeded' && (
                    <div className="max-w-2xl mx-auto p-4 border rounded bg-white">
                        <h1 className="text-3xl font-bold mb-4">{oneCourse.name}</h1>
                        <p className="text-gray-600 mb-2 italic">ID: {oneCourse.id}</p>
                        <p className="text-gray-600 mb-2">Instructor: {oneCourse.instructor}</p>
                        <p className="mb-4">{oneCourse.description}</p>
                        <p className="text-gray-600 mb-2">Enrollment Status: {oneCourse.enrollmentStatus}</p>
                        <img src={oneCourse.thumbnail} alt="Course Thumbnail" className="mb-4 max-w-full border" />
                        <p className="text-gray-600 mb-2">Duration: {oneCourse.duration}</p>
                        <p className="text-gray-600 mb-2">Schedule: {oneCourse.schedule}</p>
                        <p className="text-gray-600 mb-2">Location: {oneCourse.location}</p>

                        <div className="mb-4 border-t pt-4">
                            <h2 className="text-xl font-bold mb-2">Prerequisites</h2>
                            <ul className="list-disc list-inside">
                                {oneCourse.prerequisites?.map((prerequisite, index) => (
                                    <li key={index} className="text-gray-600">
                                        {prerequisite}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-4 border-t pt-4">
                            <h2 className="text-xl font-bold mb-2">Syllabus</h2>
                            <ul className="list-decimal list-inside">
                                {oneCourse.syllabus?.map((week) => (
                                    <li key={week.week} className="text-gray-600">
                                        <p className="mb-1">Week {week.week}</p>
                                        <p className="mb-1">Topic: {week.topic}</p>
                                        <p className="mb-2">Content: {week.content}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="border-t pt-4">
                            <button
                                onClick={handleEnrollment}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                            >
                                Enroll Now
                            </button>
                        </div>
                    </div>
                )}
            </>
        );
}
