const btnRefresh = document.getElementById('btn-refresh');
const theTable = document.getElementById('the-table');
const [, ...tblRows] = theTable.rows;

btnRefresh.addEventListener('click', async () => {
    const res = await fetch('/adm/raw');
    const data = await res.json();

    console.log(data.students);

    data.students.forEach((student, i) => {
        const cellState = tblRows[i].children[2];

        const elState = document.createElement('span');
        elState.classList.add('badge');
        elState.textContent = student.status;

        switch (student.status) {
            case 'Working':
                elState.classList.add('secondary');
                break;
            case 'Online':
                elState.classList.add('success');
                break;
        }

        cellState.replaceChildren(elState);
    });
});
