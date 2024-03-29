import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import { Attendance_In, Attendance_Out, Attendence, Employee, Employees, New_employee, Salary, Section, Signin, Signup, Update_employee, Users,New_user,Update_user, Error404, Designnation, Update_Attendance, Monthly_attendance, Monthly_attendance_book } from './pages/Index'
import Layout from './pages/Layout'
function App() {
  // const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <Routes>
      <Route path='/' element={<Layout>
        <Home/>
      </Layout>}/>

      <Route path='/signin' element={<Signin/>}/>

      <Route path='/signup' element={<Signup/>}/>

      <Route path='/users' element={<Layout>
        <Users/>
      </Layout>}/>

      <Route path='/user/new' element={<Layout>
        <New_user/>
      </Layout>}/>

      <Route path='/user/:id' element={<Layout>
        <Update_user/>
      </Layout>}/>

      <Route path='/section' element={<Layout>
        <Section/>
      </Layout>}/>

      <Route path='/designation' element={<Layout>
        <Designnation/>
      </Layout>}/>

      <Route path='/employees' element={<Layout>
        <Employees/>
      </Layout>}/>

      <Route path='/employee/new' element={<Layout>
        <New_employee/>
      </Layout>}/>

      <Route path='/employee/:id' element={<Layout>
        <Employee/>
      </Layout>}/>

      <Route path='/employee/update/:id' element={<Layout>
        <Update_employee/>
      </Layout>}/>

      <Route path='/attendences' element={<Layout>
        <Attendence/>
      </Layout>}/>

      <Route path='/attendence/out' element={<Layout>
        <Attendance_Out/>
      </Layout>}/>

      <Route path='/attendence/in' element={<Layout>
        <Attendance_In/>
      </Layout>}/>

      <Route path='/attendence/update' element={<Layout>
        <Update_Attendance/>
      </Layout>}/>

      <Route path='/attendence/monthly/:sectionId/:id' element={<Layout>
        <Monthly_attendance/>
      </Layout>}/>

      <Route path='/attendence/book/:id' element={<Layout>
        <Monthly_attendance_book/>
      </Layout>}/>

      <Route path='/salary' element={<Layout>
        <Salary/>
      </Layout>}/>

      <Route path='*' element={<Layout>
        <Error404/>
      </Layout>}/>
    </Routes>
  )
}

export default App
