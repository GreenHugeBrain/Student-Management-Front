const apiUrl = 'https://testt-k6dj.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
    const addStudentForm = document.getElementById('addStudentForm');
    const studentList = document.getElementById('studentList');
    const studentDetailsModal = document.getElementById('studentDetailsModal');
    const studentDetailsContent = document.getElementById('studentDetailsContent');

    // Fetch students and display them
    fetchStudents();

    // Add student event
    addStudentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const studentName = document.getElementById('studentName').value;
        const studentLastname = document.getElementById('studentLastname').value;

        const response = await fetch(`${apiUrl}/add_student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: studentName, lastname: studentLastname })
        });

        if (response.ok) {
            fetchStudents();
            addStudentForm.reset();
        } else {
            alert('Failed to add student');
        }
    });

    // Fetch and display students
    async function fetchStudents() {
        const response = await fetch(`${apiUrl}/student`);
        const students = await response.json();
        studentList.innerHTML = '';

        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="align-middle">${student.id}</td>
                <td class="align-middle">${student.name}</td>
                <td class="align-middle">${student.lastname}</td>
                <td class="align-middle">
                    <button class="btn btn-primary btn-sm mr-2" onclick="viewStudent(${student.id})">View</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            `;
            studentList.appendChild(row);
        });
        
    }

    // View student details
    window.viewStudent = async (id) => {
        const response = await fetch(`${apiUrl}/student/${id}`);
        const student = await response.json();
        
        // Prepare grades information
        let gradesHtml = '<h3>Grades:</h3>';
        if (student.grades && student.grades.length > 0) {
            gradesHtml += '<ul>';
            student.grades.forEach(grade => {
                gradesHtml += `
              <li class="list-group-item">
                    <strong>Subject:</strong> ${grade.subject} - 
                    <strong>Grade:</strong> ${grade.grade_value} - 
                    <strong>Date:</strong> ${grade.date}
                </li>
                `;
            });
            gradesHtml += '</ul>';
        } else {
            gradesHtml += '<p>No grades available.</p>';
        }

        // Display student details and grades in modal
        studentDetailsContent.innerHTML = `
            <div class="modal-header">
            <h5 class="modal-title">Student Details</h5>
            <button type="button" class="close" onclick="closeModal()">
                <span>&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <p><strong>ID:</strong> ${student.id}</p>
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Lastname:</strong> ${student.lastname}</p>
            ${gradesHtml}
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal()">Close</button>
        </div>
        `;
        studentDetailsModal.style.display = 'block';
    };

    // Delete student
    window.deleteStudent = async (id) => {
        const response = await fetch(`${apiUrl}/student/${id}`, { method: 'DELETE' });
        if (response.ok) {
            fetchStudents();
        } else {
            alert('Failed to delete student');
        }
    };

    // Close modal function
    window.closeModal = () => {
        studentDetailsModal.style.display = 'none';
    };
});
