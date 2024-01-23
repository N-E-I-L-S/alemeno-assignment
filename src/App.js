import { Routes, Route } from 'react-router-dom';
import './App.css';
import StudentDashboard from './pages/StudentDashboard';
import CourseList from './pages/CourseList';
import OneCourse from './pages/OneCourse';
import Navbar from './components/Navbar';
import Login from './pages/Login';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/dashboard" element={<StudentDashboard/>} />
      <Route path='/' element={<CourseList/>}/>
      <Route path='/course/:id' element={<OneCourse/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  );
}

export default App;
