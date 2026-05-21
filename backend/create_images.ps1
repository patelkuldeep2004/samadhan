$images = @('potato.jpg', 'wheat.jpg', 'rice.jpg', 'tomato.jpg', 'chillies.jpg', 'onion.jpg', 'carrot.jpg', 'cabbage.jpg', 'cauliflower.jpg', 'spinach.jpg', 'mango.jpg', 'banana.jpg', 'apple.jpg', 'papaya.jpg', 'pomegranate.jpg', 'milk.jpg', 'paneer.jpg', 'butter.jpg', 'mustard.jpg', 'cumin.jpg')

Set-Location "c:\Users\Asus\OneDrive\Desktop\PROJECT\backend\uploads"

# Get first available image file
$sourceImg = Get-ChildItem -Filter "*.jpg" | Select-Object -First 1

if ($sourceImg) {
    foreach ($img in $images) {
        Copy-Item $sourceImg.FullName -Destination $img -Force
        Write-Host "Created: $img"
    }
    Write-Host "`nAll product images created successfully!"
} else {
    Write-Host "No source image found!"
}

# List all images
Write-Host "`nCurrent images in uploads folder:"
Get-ChildItem -Filter "*.jpg" | ForEach-Object { Write-Host $_.Name }
