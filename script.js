function processCSV() {
  const fileInput = document.getElementById('csvFile');
  if (fileInput.files.length === 0) {
    alert('Please upload a CSV file.');
    return;
  }
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const lines = e.target.result.split('
');
    let html = `<table border="1"><tr><th>Subject</th><th>Attended</th><th>Total</th><th>% Attendance</th></tr>`;
    lines.forEach(line => {
      const [subject, attended, total] = line.trim().split(',');
      if (!subject || !attended || !total || subject === "Subject") return; // skip blank/header
      const percent = ((parseInt(attended)/parseInt(total))*100).toFixed(2);
      html += `<tr><td>${subject}</td><td>${attended}</td><td>${total}</td><td>${percent}%</td></tr>`;
    });
    html += '</table>';
    document.getElementById('attendanceDetails').innerHTML = html;
  };
  reader.readAsText(file);
}
