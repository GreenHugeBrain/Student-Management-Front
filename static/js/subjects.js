const apiUrl = 'https://testt-k6dj.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
    const addSubjectForm = document.getElementById('addSubjectForm');
    const subjectList = document.getElementById('subjectList'); // Make sure this element exists in your HTML

    // Fetch subjects and display them
    fetchSubjects();

    // Add subject event
    addSubjectForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const subjectName = document.getElementById('subjectName').value;

        const response = await fetch(`${apiUrl}/add_subject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: subjectName })
        });

        if (response.ok) {
            fetchSubjects(); // Fetch the updated list of subjects
            addSubjectForm.reset(); // Clear the form
        } else {
            alert('Failed to add subject');
        }
    });

    // Fetch and display subjects
    async function fetchSubjects() {
        const response = await fetch(`${apiUrl}/subject`); // Ensure this endpoint exists
        const subjects = await response.json();
        subjectList.innerHTML = ''; // Clear existing subjects

        subjects.forEach(subject => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="align-middle">${subject.id}</td>
                <td class="align-middle">${subject.name}</td>
                <td class="align-middle">
                    <button class="btn btn-danger btn-sm" onclick="deleteSubject(${subject.id})">Delete</button>
                </td>
            `;
            subjectList.appendChild(row); // Append new row to the subject list
        });
        
    }

    // View subject details (Implement as needed)
    window.viewSubject = async (id) => {
        // Implementation for viewing subject details
    };

    // Delete subject (Implement as needed)
    window.deleteSubject = async (id) => {
        const response = await fetch(`${apiUrl}/subject/${id}`, { method: 'DELETE' });
        if (response.ok) {
            fetchSubjects(); // Refresh the subject list
        } else {
            alert('Failed to delete subject');
        }
    };
});
