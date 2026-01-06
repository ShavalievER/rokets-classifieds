# PowerShell script to create ZIP archive for cPanel upload
# Excludes .next, node_modules and other unnecessary files

$projectPath = $PSScriptRoot
$zipPath = Join-Path (Split-Path $projectPath) "rokets-classifieds.zip"

Write-Host "Creating ZIP archive for cPanel upload..." -ForegroundColor Green
Write-Host "Source folder: $projectPath" -ForegroundColor Yellow
Write-Host "Archive will be created at: $zipPath" -ForegroundColor Yellow

# Remove old archive if exists
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
    Write-Host "Removed old archive" -ForegroundColor Gray
}

# Files and folders to include
$includeItems = @(
    "app",
    "components",
    "lib",
    "public",
    "scripts",
    "package.json",
    "server.js",
    "next.config.ts",
    "tsconfig.json",
    "postcss.config.mjs"
)

Write-Host "`nIncluding files and folders:" -ForegroundColor Cyan
foreach ($item in $includeItems) {
    $itemPath = Join-Path $projectPath $item
    if (Test-Path $itemPath) {
        Write-Host "  [OK] $item" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $item" -ForegroundColor Red
    }
}

Write-Host "`nExcluding: .next, node_modules, .git, .env*" -ForegroundColor Cyan

# Create temporary folder for archiving
$tempPath = Join-Path $env:TEMP "rokets-upload-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
New-Item -ItemType Directory -Path $tempPath -Force | Out-Null

Write-Host "`nCopying files..." -ForegroundColor Cyan

# Copy needed files and folders
foreach ($item in $includeItems) {
    $sourcePath = Join-Path $projectPath $item
    $destPath = Join-Path $tempPath $item
    
    if (Test-Path $sourcePath) {
        if (Test-Path $sourcePath -PathType Container) {
            Copy-Item -Path $sourcePath -Destination $destPath -Recurse -Force
            Write-Host "  [OK] Copied folder: $item" -ForegroundColor Green
        } else {
            Copy-Item -Path $sourcePath -Destination $destPath -Force
            Write-Host "  [OK] Copied file: $item" -ForegroundColor Green
        }
    }
}

# Create ZIP
Write-Host "`nCreating ZIP archive..." -ForegroundColor Cyan
Compress-Archive -Path "$tempPath\*" -DestinationPath $zipPath -Force

# Remove temporary folder
Remove-Item -Path $tempPath -Recurse -Force

# Check size
$zipSize = (Get-Item $zipPath).Length / 1MB
Write-Host "`n[SUCCESS] Archive created!" -ForegroundColor Green
Write-Host "  Size: $([math]::Round($zipSize, 2)) MB" -ForegroundColor Yellow
Write-Host "  Path: $zipPath" -ForegroundColor Yellow

if ($zipSize -gt 50) {
    Write-Host "`n[WARNING] Archive size is too large!" -ForegroundColor Red
    Write-Host "  Possible: node_modules or .next included" -ForegroundColor Red
} else {
    Write-Host "`n[OK] Archive size is normal (should be 2-5 MB)" -ForegroundColor Green
}

Write-Host "`nDone! You can now upload $zipPath to cPanel" -ForegroundColor Green
