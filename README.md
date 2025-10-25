# Product Verification Upload Component

A simple, clean React component for sellers to upload and verify product images.

## Features

- Upload up to 5 product images (JPEG/PNG only)
- Drag-and-drop support
- Live image preview in a responsive grid
- Delete images before submitting
- Progress bar showing upload count
- Loading state with spinner
- Success confirmation screen
- Console logging of submitted files

## How It Works

### Split into pieces
The component is broken into smaller parts:
- `ProductVerificationUpload` - Main container and state
- `UploadArea` - Drag-drop zone
- `ImagePreviewGrid` - Image preview with delete buttons
- `SubmitButton` - Submit with loading state

Each part is easy to work with and can be reused.

### Focus on the user
- Drag-and-drop makes uploading easy
- Live preview shows exactly what will be submitted
- Delete buttons are easy to find on hover
- Progress bar shows how many images uploaded
- Clear error messages for any problems

### Keep it simple
- Uses basic React hooks for state
- Tailwind CSS for styling
- No backend needed - everything works in the browser
- Loading spinner as a bonus feature

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the app:
\`\`\`bash
npm run dev
\`\`\`

3. Open http://localhost:5173 in your browser

## How to Use

1. Drag images into the upload area or click to select files
2. Preview images appear below
3. Click the X button to delete any image
4. Click "Submit" when ready
5. Check the browser console to see the submitted files

## File Limits

- Maximum 5 images
- Allowed types: JPEG, PNG
- No file size limit (but keep files reasonable)

## What Gets Logged

When you submit, the console shows:
- Total number of images
- File name for each image
- File size in KB

Example:
\`\`\`
=== Product Verification Submission ===
Total images: 3
Files:
1. product-1.jpg (245.50 KB)
2. product-2.png (189.30 KB)
3. product-3.jpg (312.75 KB)
=====================================
