const apiUrl = 'https://testt-k6dj.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
    const addGradeForm = document.getElementById('addGradeForm');
    const gradeList = document.getElementById('gradeList');

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('gradeDate').value = today;

    // Fetch grades and display them
    fetchGrades();

    // Add grade event
    addGradeForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const studentId = document.getElementById('studentId').value;
        const subjectId = document.getElementById('subjectId').value;
        const gradeValue = document.getElementById('gradeValue').value;
        const gradeDate = document.getElementById('gradeDate').value;  // Get the date value

        const response = await fetch(`${apiUrl}/add_grade`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                student_id: studentId, 
                subject_id: subjectId, 
                grade_value: gradeValue,
                date: gradeDate // Include the date in the request
            })
        });

        if (response.ok) {
            fetchGrades();
            addGradeForm.reset();
            document.getElementById('gradeDate').value = today; // Reset date to today
        } else {
            alert('Failed to add grade');
        }
    });

    // Fetch and display grades
    async function fetchGrades() {
        try {
            const response = await fetch(`${apiUrl}/grade`);
            const grades = await response.json();
            console.log(grades);  // Check the fetched grades

            // Check if gradeList is correctly fetched
            if (!gradeList) {
                console.error('Grade list element not found!');
                return;
            }

            gradeList.innerHTML = '';

            if (grades.length === 0) {
                gradeList.innerHTML = '<tr><td colspan="5">No grades available.</td></tr>';
                return;
            }

            grades.forEach(grade => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="align-middle">${grade.student_id}</td>
                    <td class="align-middle">${grade.subject_id}</td>
                    <td class="align-middle">${grade.grade_value}</td>
                    <td class="align-middle">${grade.date}</td>
                    <td class="align-middle">
                        <button class="btn btn-danger btn-sm" onclick="deleteGrade(${grade.id})">Delete</button>
                    </td>
                `;
                gradeList.appendChild(row);
            });
            
        } catch (error) {
            console.error('Error fetching grades:', error);
        }
    }

    // Delete grade
    window.deleteGrade = async (id) => {
        const response = await fetch(`${apiUrl}/grade/${id}`, { method: 'DELETE' });
        if (response.ok) {
            fetchGrades();
        } else {
            alert('Failed to delete grade');
        }
    };
});
