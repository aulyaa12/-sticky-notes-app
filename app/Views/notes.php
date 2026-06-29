<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">

  <!-- CSS kamu -->
  <link rel="stylesheet" href="/style.css">

  <title>Notes App</title>
</head>

<body>

<!-- ===================== -->
<!-- TOP BAR -->
<!-- ===================== -->
<div class="top-bar">
  <h2 class="title-app">My Sticky Notes</h2>

  <button class="add" id="add">
    <i class="fas fa-plus"></i> Add note
  </button>
</div>

<!-- ===================== -->
<!-- NOTES CONTAINER -->
<!-- ===================== -->
<div class="notes-container"></div>


<!-- ===================== -->
<!-- LIBRARY (MARKDOWN SUPPORT) -->
<!-- ===================== -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/1.2.2/marked.min.js"></script>

<!-- ===================== -->
<!-- MAIN JS -->
<!-- ===================== -->
<script src="/script.js"></script>

</body>
</html>