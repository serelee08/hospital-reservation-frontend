import { useState, useEffect } from 'react'
import {getDepartments, getPatients, getDoctors, getAppointments,getMedicalRecords, 
deleteAppointment } from './api/api.js'
import './App.css'
import ReservationForm from './components/ReservationForm'

function App() {
  const [departments, setDepartments] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [medicalRecords, setMedicalRecords] = useState([])

  const handleDelete = async (appointmentNo) => {
  if (!window.confirm('이 예약을 취소하시겠습니까?')) return
  try {
    await deleteAppointment(appointmentNo)
    getAppointments().then(setAppointments).catch(console.error)  // 목록 갱신
  } catch (err) {
    console.error('취소 실패:', err)
    alert('취소에 실패했습니다.')
  }
}

  useEffect(() => {
    getDepartments().then(setDepartments).catch(console.error)
    getPatients().then(setPatients).catch(console.error)
    getDoctors().then(setDoctors).catch(console.error)
    getAppointments().then(setAppointments).catch(console.error)
    getMedicalRecords().then(setMedicalRecords).catch(console.error)
  }, [])

  return (
    <div>
      <h1>병원 예약 시스템</h1>

      <h2>진료과 목록</h2>
      <ul>
        {departments.map((d) => (
          <li key={d.departmentNo}>{d.departmentName}</li>
        ))}
      </ul>

      <h2>환자 목록</h2>
      <ul>
        {patients.map((p) => (
          <li key={p.patientNo}>{p.name} ({p.phone})</li>
        ))}
      </ul>

      <h2>의사 목록</h2>
      <ul>
        {doctors.map((doc) => (
          <li key={doc.doctorNo}>{doc.name} — {doc.specialty}</li>
        ))}
      </ul>

      <h2>예약 목록</h2>
      <ul>
        {appointments.map((a) => (
          <li key={a.appointmentNo}>
            예약 #{a.appointmentNo} — 환자 {a.patientNo} / 의사 {a.doctorNo} / {a.status}
                <button onClick={() => handleDelete(a.appointmentNo)}>취소</button>
          </li>
        ))}
      </ul>

      <h2>진료기록 목록</h2>
      <ul>
        {medicalRecords.map((m) => (
          <li key={m.medicalRecordNo}>
            기록 #{m.medicalRecordNo} — {m.diagnosis}
          </li>
        ))}
      </ul>
      <ReservationForm/>
    </div>
  )
}

export default App