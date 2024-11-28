document.getElementById('generate-btn').addEventListener('click', async () => {
  const request = document.getElementById('plugin-request').value.trim();
  if (!request) {
    alert("Por favor, describe el plugin.");
    return;
  }

  const output = document.getElementById('output');
  const codeElement = document.getElementById('generated-code');
  codeElement.textContent = "Generando código...";
  output.style.display = "block";

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/tu-modelo", {
      method: "POST",
      headers: {
        "Authorization": "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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: request })
    });
    const data = await response.json();
    if (data.generated_text) {
      codeElement.textContent = data.generated_text;
    } else {
      codeElement.textContent = "Error al generar el código.";
    }
  } catch (error) {
    codeElement.textContent = "Error al conectar con la API.";
  }
});

document.getElementById('copy-btn').addEventListener('click', () => {
  const code = document.getElementById('generated-code').textContent;
  navigator.clipboard.writeText(code);
  alert("Código copiado al portapapeles.");
});

document.getElementById('download-btn').addEventListener('click', () => {
  const code = document.getElementById('generated-code').textContent;
  const blob = new Blob([code], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "plugin.php";
  link.click();
});
