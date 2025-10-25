"use client"

import { CheckCircle, Loader } from "lucide-react"

interface SubmitButtonProps {
  onClick: () => void
  isLoading: boolean
  disabled: boolean
  imageCount: number
}

export default function SubmitButton({ onClick, isLoading, disabled, imageCount }: SubmitButtonProps) {
  return (
    <div className="mt-8 flex gap-4">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`flex-1 py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
        }`}
      >
        {isLoading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            Submit Verification ({imageCount})
          </>
        )}
      </button>
    </div>
  )
}
