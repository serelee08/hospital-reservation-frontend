import { useState, useEffect } from 'react'
import { getDepartments, getDoctors, createAppointment } from '../../api/api'
import './ReservationForm.css'

function ReservationForm({ onSuccess }) {
  const [patientName, setPatientName] = useState('')
  const [departmentNo, setDepartmentNo] = useState('')
  const [doctorNo, setDoctorNo] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [departments, setDepartments] = useState([])
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    getDepartments().then(setDepartments).catch(console.error)
    getDoctors().then(setDoctors).catch(console.error)
  }, [])

  const timeOptions = []
  for (let h = 9; h <= 17; h++) {
    timeOptions.push(`${String(h).padStart(2, '0')}:00`)
    timeOptions.push(`${String(h).padStart(2, '0')}:30`)
  }

  const handleSubmit = async () => {
    if (!patientName) { alert('환자 이름을 입력하세요.'); return }
    if (!departmentNo) { alert('진료과를 선택하세요.'); return }
    if (!doctorNo) { alert('의사를 선택하세요.'); return }
    if (!appointmentDate) { alert('예약 날짜를 선택하세요.'); return }
    if (!appointmentTime) { alert('예약 시간을 선택하세요.'); return }

    const appointment = {
      patientNo: 1,
      doctorNo: Number(doctorNo),
      appointmentDt: appointmentDate + 'T' + appointmentTime + ':00',
      status: '예약',
      memo: patientName + ' 예약',
    }

    try {
      const result = await createAppointment(appointment)
      console.log('예약 성공:', result)
      alert('예약이 완료되었습니다!')
      if (onSuccess) onSuccess()
    } catch (err) {
      console.error('예약 실패:', err)
      alert('예약에 실패했습니다.')
    }
  }

  return (
    <div className="form-card">
      <h2>예약하기</h2>

      <div className="form-row">
        <label>환자 이름</label>
        <input value={patientName} onChange={(e) => setPatientName(e.target.value)} />
      </div>

      <div className="form-row">
        <label>진료과</label>
        <select value={departmentNo} onChange={(e) => setDepartmentNo(e.target.value)}>
          <option value="">선택하세요</option>
          {departments.map((d) => (
            <option key={d.departmentNo} value={d.departmentNo}>{d.departmentName}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label>의사</label>
        <select value={doctorNo} onChange={(e) => setDoctorNo(e.target.value)}>
          <option value="">선택하세요</option>
          {doctors.map((doc) => (
            <option key={doc.doctorNo} value={doc.doctorNo}>{doc.name} ({doc.specialty})</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label>예약 날짜</label>
        <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
      </div>

      <div className="form-row">
        <label>예약 시간</label>
        <select value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)}>
          <option value="">선택하세요</option>
          {timeOptions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <button className="btn-submit" onClick={handleSubmit}>예약하기</button>
    </div>
  )
}

export default ReservationForm