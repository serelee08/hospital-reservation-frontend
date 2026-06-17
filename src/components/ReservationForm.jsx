import { useState, useEffect } from 'react'
import { getDepartments, getDoctors } from '../api/api'

function ReservationForm() {
  // 예약시 입력값 환자이름, 진료과부서, 의사, 날짜 4가지 담을 상자들
  const [patientName, setPatientName] = useState('')
  const [departmentNo, setDepartmentNo] = useState('')
  const [doctorNo, setDoctorNo] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')

  // 진료과 부서, 의사 목록 드롭다운
  const [departments, setDepartments] = useState([])
  const [doctors, setDoctors] = useState([])

  // ussEffect의미는 : 이 화면 뜰 때 진료과/의사 목록 백엔드에서 불러와라
  useEffect(() => {
    //getdepartment로 백엔드에 진료과 요청 -> .then()받아오면 Departments 상자에 저장
    getDepartments().then(setDepartments).catch(console.error)
    getDoctors().then(setDoctors).catch(console.error)
  }, [])

  // 예약 버튼 눌렀을 때 실행되는 함수
  const handleSubmit = () => {
    console.log('예약 정보:', {
      patientName,
      departmentNo,
      doctorNo,
      appointmentDate,
    })
    alert('예약 정보가 콘솔에 찍혔어요 (아직 백엔드 전송 전)')
  }
//실제 화면에 보이는 부분들
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
          type="datetime-local"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>예약</button>
    </div>
  )
}

export default ReservationForm