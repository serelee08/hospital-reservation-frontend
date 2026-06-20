const BASE_URL = 'http://localhost:8080/api'

// 진료과
export async function getDepartments() {
  const res = await fetch(`${BASE_URL}/departments`)
  return res.json()
}

// 환자
export async function getPatients() {
  const res = await fetch(`${BASE_URL}/patients`)
  return res.json()
}

// 의사
export async function getDoctors() {
  const res = await fetch(`${BASE_URL}/doctors`)
  return res.json()
}

// 예약
export async function getAppointments() {
  const res = await fetch(`${BASE_URL}/appointments`)
  return res.json()
}

// 진료기록
export async function getMedicalRecords() {
  const res = await fetch(`${BASE_URL}/medical-records`)
  return res.json()
}

export async function createAppointment(appointment) {
  const res = await fetch(`${BASE_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointment),
  })
  return res.json()
}

// 예약 취소 (DELETE)
export async function deleteAppointment(appointmentNo) {
  const res = await fetch(`${BASE_URL}/appointments/${appointmentNo}`, {
    method: 'DELETE',
  })
  return res.json()
}

// 예약 상태 변경 (PATCH)
export async function updateAppointmentStatus(appointmentNo, status) {
  const res = await fetch(`${BASE_URL}/appointments/${appointmentNo}/status?status=${status}`, {
    method: 'PATCH',
  })
  return res.json()
}