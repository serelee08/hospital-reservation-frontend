import { useState, useEffect } from 'react'
import { getDepartments,  getDoctors, getAppointments,
deleteAppointment, updateAppointmentStatus } from './api/api.js'
import './App.css'
import Layout from './components/layout/Layout.jsx'
import ReservationForm from './components/reservation/ReservationForm.jsx'
import './App.css'

function App() {
  const [departments, setDepartments] = useState([])
 // const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
 //const [medicalRecords, setMedicalRecords] = useState([])

  const handleDelete = async (appointmentNo) => {
    if (!window.confirm('이 예약을 취소하시겠습니까?')) return
    try {
      await deleteAppointment(appointmentNo)
      getAppointments().then(setAppointments).catch(console.error)
    } catch (err) {
      console.error('취소 실패:', err)
      alert('취소에 실패했습니다.')
    }
  }

  const handleStatusChange = async (appointmentNo, newStatus) => {
    try {
      await updateAppointmentStatus(appointmentNo, newStatus)
      getAppointments().then(setAppointments).catch(console.error)
    } catch (err) {
      console.error('상태 변경 실패:', err)
      alert('상태 변경에 실패했습니다.')
    }
  }

  useEffect(() => {
    getDepartments().then(setDepartments).catch(console.error)
    //getPatients().then(setPatients).catch(console.error)
    getDoctors().then(setDoctors).catch(console.error)
    getAppointments().then(setAppointments).catch(console.error)
    //getMedicalRecords().then(setMedicalRecords).catch(console.error)
  }, [])

  return (
    <Layout>
      <section className="section">
        <h2 className="section-title">진료과</h2>
        <div className="grid">
          {departments.map((d) => (
            <div key={d.departmentNo} className="dept-card">
              {d.departmentName}
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">의료진</h2>
        <ul className="list">
          {doctors.map((doc) => (
            <li key={doc.doctorNo} className="list-item">
              <span className="label">{doc.name}</span>
              <span className="chip">{doc.specialty}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">예약 현황</h2>
        <ul className="list">
          {appointments.map((a) => (
            <li key={a.appointmentNo} className="list-item">
          <span className="label">
                예약 #{a.appointmentNo} · {a.patientName} · {a.doctorName}
          <span className="dept-tag"> ({a.departmentName})</span>{' '}
          <span className={`chip chip-${a.status}`}>{a.status}</span>
          </span>
              <span className="btn-group">
                <button className="btn btn-done" onClick={() => handleStatusChange(a.appointmentNo, '완료')}>완료</button>
                <button className="btn btn-status" onClick={() => handleStatusChange(a.appointmentNo, '취소')}>상태취소</button>
                <button className="btn btn-cancel" onClick={() => handleDelete(a.appointmentNo)}>삭제</button>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <ReservationForm />
    </Layout>
  )
}

export default App