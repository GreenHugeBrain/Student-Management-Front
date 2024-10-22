document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'https://testt-k6dj.onrender.com';
    let totalStudents = document.getElementById('total-students')
    let totalSubjects = document.getElementById('total-subjects')
    let totalGrades = document.getElementById('total-grades')

    fetch(`${apiUrl}/student`).then(response => response.json()).then(response => totalStudents.textContent = response.length)

    fetch(`${apiUrl}/subject`).then(response => response.json()).then(response => totalSubjects.textContent = response.length)

    
    fetch(`${apiUrl}/grade`).then(response => response.json()).then(response => totalGrades.textContent = response.length)

})