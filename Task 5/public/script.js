document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('api-registration-form');
    const tableBody = document.getElementById('student-table-body');

    // Fetch and display data from API on load
    fetchStudents();

    // Handle Form Submission via API (Create)
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const newStudent = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            course: form.course.value
        };

        const response = await fetch('/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent)
        });

        if (response.ok) {
            form.reset();
            fetchStudents(); // Refresh table seamlessly
        }
    });

    // Fetch Data Logic (Read)
    async function fetchStudents() {
        const response = await fetch('/api/students');
        const students = await response.json();
        
        tableBody.innerHTML = '';
        students.forEach(student => {
            tableBody.innerHTML += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td><span class="badge bg-primary">${student.course}</span></td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>
            `;
        });
    }

    // Expose delete function to window (Delete)
    window.deleteStudent = async (id) => {
        await fetch(`/api/students/${id}`, { method: 'DELETE' });
        fetchStudents(); // Refresh table
    };
});