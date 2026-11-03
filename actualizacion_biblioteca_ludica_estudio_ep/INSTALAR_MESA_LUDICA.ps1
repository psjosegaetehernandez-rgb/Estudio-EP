param(
  [string]$Root = "C:\Users\gaspa\Documents\Creador_Talleres_EP"
)
$ErrorActionPreference = "Stop"
if (-not (Test-Path (Join-Path $Root "index.html"))) {
  throw "No encuentro index.html en '$Root'. Ajusta el parámetro -Root a la carpeta real del creador."
}
$index = Join-Path $Root "index.html"
$jsDir = Join-Path $Root "js"
$cssDir = Join-Path $Root "css"
New-Item -ItemType Directory -Force -Path $jsDir,$cssDir | Out-Null

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
Copy-Item $index "$index.backup_$stamp" -Force
$jsTarget = Join-Path $jsDir "mesa-ludica.js"
$cssTarget = Join-Path $cssDir "mesa-ludica.css"
if ((Test-Path $jsTarget) -or (Test-Path $cssTarget)) {
  Write-Host "Ya existe una extensión previa. Se guardará copia antes de actualizarla." -ForegroundColor Yellow
  if (Test-Path $jsTarget) { Copy-Item $jsTarget "$jsTarget.backup_$stamp" -Force }
  if (Test-Path $cssTarget) { Copy-Item $cssTarget "$cssTarget.backup_$stamp" -Force }
}

$jsSource = Join-Path $PSScriptRoot "mesa-ludica.js"
$cssSource = Join-Path $PSScriptRoot "mesa-ludica.css"
if (-not (Test-Path $jsSource) -or -not (Test-Path $cssSource)) {
  throw "Deja mesa-ludica.js y mesa-ludica.css en la misma carpeta que este instalador."
}
Copy-Item $jsSource $jsTarget -Force
Copy-Item $cssSource $cssTarget -Force

$html = [System.IO.File]::ReadAllText($index)
if ($html -notmatch 'css/mesa-ludica\.css') {
  $html = $html -replace '(?i)</head>', '    <link rel="stylesheet" href="css/mesa-ludica.css">' + "`r`n</head>"
}
if ($html -notmatch 'js/mesa-ludica\.js') {
  $html = $html -replace '(?i)</body>', '    <script src="js/mesa-ludica.js"></script>' + "`r`n</body>"
}
[System.IO.File]::WriteAllText($index, $html, (New-Object System.Text.UTF8Encoding($false)))
Write-Host ""
Write-Host "ACTUALIZACIÓN INCREMENTAL INSTALADA" -ForegroundColor Green
Write-Host "Copia de seguridad: $index.backup_$stamp"
Write-Host "Extensión: $jsTarget"
Write-Host "Estilos:   $cssTarget"
Write-Host "Abre la aplicación y pulsa Ctrl+F5."
Write-Host "Si algo falla, restaura la copia de index.html y elimina los dos archivos mesa-ludica.*."
