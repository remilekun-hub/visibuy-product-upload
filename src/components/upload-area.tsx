import type React from "react"
import { useRef, useState } from "react"
import { Upload, Cloud } from "lucide-react"

interface UploadAreaProps {
  onFileSelect: (files: FileList | null) => void
  disabled?: boolean
}

export default function UploadArea({ onFileSelect, disabled = false }: UploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(e.target.files)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (!disabled) {
      onFileSelect(e.dataTransfer.files)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
        isDragging
          ? "border-blue-500 bg-blue-50"
          : disabled
            ? "border-gray-300 bg-gray-50 cursor-not-allowed"
            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
      }`}
      onClick={!disabled ? handleClick : undefined}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />

      <div className="flex flex-col items-center gap-3">
        <div className={`p-3 rounded-full ${isDragging ? "bg-blue-200" : "bg-gray-100"}`}>
          {isDragging ? <Cloud className="w-8 h-8 text-blue-600" /> : <Upload className="w-8 h-8 text-gray-600" />}
        </div>

        <div>
          <p className="font-semibold text-gray-900">
            {disabled ? "Maximum images reached" : "Drag and drop your images here"}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {disabled ? "Remove an image to upload more" : "or click to select files (JPEG, PNG)"}
          </p>
        </div>
      </div>
    </div>
  )
}
