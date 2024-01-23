import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function StudentDashboard() {
  const studentId = useSelector((state) => state.courses.student);
  const [student, setStudent] = useState("");
  
  useEffect(() => {
    console.log(studentId);
    getStudent();
  }, []);

  async function getStudent() {
    const url = 'http://localhost:3000/students/id';
    const body = {
      id: studentId,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.status === 200) {
        const studentdetails = await response.json();
        console.log(studentdetails);
        setStudent(studentdetails);
      } else {
        console.log('error');
      }
    } catch {
      console.log('error');
    }
  }
  if(student)
  console.log(student.enrollment)
  return (
    <div className="max-w-md mx-auto p-4 border rounded bg-white mt-8">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <h3 className="text-xl font-bold mb-2">{student.name}</h3>
      <div className="flex md:w-[20vw] w-[50vw] justify-between">

      <p className="text-gray-600 mb-2 italic">({student.id})</p>
      <p className="text-gray-600 mb-4 italic">{student.email}</p>
      </div>

      {student.enrollment && student.enrollment.length>0 ? (
        <div>
          <h2 className="text-xl font-bold mb-2">Enrolled Courses</h2>
          <ul className="list-disc list-inside">
            {student.enrollment?.map((course) => (
              <li key={course.courseId} className="text-gray-600">
                {course.courseName} ({course.courseId})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-2">No Enrollments</p>
          <NavLink to={'/'} className="text-blue-500 hover:underline">
            Browse Courses
          </NavLink>
        </div>
      )}
    </div>
  );
}
