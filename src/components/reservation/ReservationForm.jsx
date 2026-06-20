import { useState, useEffect } from 'react'
import { getDepartments, getDoctors, createAppointment, } from '../../api/api'

function ReservationForm({ onSuccess }) {
  // 입력값 상자들
  const [patientName, setPatientName] = useState('')
  const [departmentNo, setDepartmentNo] = useState('')
  const [doctorNo, setDoctorNo] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')  // 날짜만
  const [appointmentTime, setAppointmentTime] = useState('')  // 시간만

  // 드롭다운 목록
  const [departments, setDepartments] = useState([])
  const [doctors, setDoctors] = useState([])

  // 화면 뜰 때 진료과/의사 목록 불러오기
  useEffect(() => {
    getDepartments().then(setDepartments).catch(console.error)
    getDoctors().then(setDoctors).catch(console.error)
  }, [])

  // 09:00 ~ 17:30, 30분 단위 시간 자동 생성
  const timeOptions = []
  for (let h = 9; h <= 17; h++) {
    timeOptions.push(`${String(h).padStart(2, '0')}:00`)
    timeOptions.push(`${String(h).padStart(2, '0')}:30`)
  }

  // 예약 버튼 눌렀을 때
  const handleSubmit = async () => {

      if (!patientName) {
    alert('환자 이름을 입력하세요.')
    return
  }
  if (!departmentNo) {
    alert('진료과를 선택하세요.')
    return
  }
  if (!doctorNo) {
    alert('의사를 선택하세요.')
    return
  }
  if (!appointmentDate) {
    alert('예약 날짜를 선택하세요.')
    return
  }
  if (!appointmentTime) {
    alert('예약 시간을 선택하세요.')
    return
  }

    const appointment = {
      patientNo: 1,
      doctorNo: Number(doctorNo),
      appointmentDt: appointmentDate + 'T' + appointmentTime + ':00',  // 날짜+시간 합치기
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
    <div>
      <h2>예약하기</h2>

      <div>
        <label>환자 이름: </label>
        <input
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
      </div>

      <div>
        <label>진료과: </label>
        <select value={departmentNo} onChange={(e) => setDepartmentNo(e.target.value)}>
          <option value="">선택하세요</option>
          {departments.map((d) => (
            <option key={d.departmentNo} value={d.departmentNo}>
              {d.departmentName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>의사: </label>
        <select value={doctorNo} onChange={(e) => setDoctorNo(e.target.value)}>
          <option value="">선택하세요</option>
          {doctors.map((doc) => (
            <option key={doc.doctorNo} value={doc.doctorNo}>
              {doc.name} ({doc.specialty})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>예약 날짜: </label>
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
      </div>

      <div>
        <label>예약 시간: </label>
        <select value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)}>
          <option value="">선택하세요</option>
          {timeOptions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <button onClick={handleSubmit}>예약</button>
    </div>
  )
}

export default ReservationForm