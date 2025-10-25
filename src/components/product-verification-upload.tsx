import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import UploadArea from "./upload-area";
import ImagePreviewGrid from "./image-preview-grid";
import SubmitButton from "./submit-button";

const MAX_IMAGES = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

interface UploadedImage {
	id: string;
	file: File;
	preview: string;
}

export default function ProductVerificationUpload() {
	const [images, setImages] = useState<UploadedImage[]>([]);
	const [error, setError] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const handleFileSelect = (files: FileList | null) => {
		if (!files) return;

		setError("");
		const newFiles = Array.from(files);
		const totalImages = images.length + newFiles.length;

		// Validate total count
		if (totalImages > MAX_IMAGES) {
			setError(
				`You can only upload up to ${MAX_IMAGES} images. You're trying to upload ${totalImages}.`
			);
			return;
		}

		// Validate each file
		const validFiles: UploadedImage[] = [];
		for (const file of newFiles) {
			if (!ALLOWED_TYPES.includes(file.type)) {
				setError(
					`Invalid file type: ${file.name}. Only JPEG and PNG are allowed.`
				);
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				const preview = e.target?.result as string;
				validFiles.push({
					id: `${Date.now()}-${Math.random()}`,
					file,
					preview,
				});

				if (validFiles.length === newFiles.length) {
					setImages((prev) => [...prev, ...validFiles]);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = (id: string) => {
		setImages((prev) => prev.filter((img) => img.id !== id));
		setError("");
	};

	const handleSubmit = async () => {
		if (images.length === 0) {
			setError("Please upload at least one image.");
			return;
		}

		setIsSubmitting(true);
		setError("");

		// Simulate submission delay
		await new Promise((resolve) => setTimeout(resolve, 1500));

		console.log("=== Product Verification Submission ===");
		console.log(`Total images: ${images.length}`);
		console.log("Files:");
		images.forEach((img, index) => {
			console.log(
				`${index + 1}. ${img.file.name} (${(
					img.file.size / 1024
				).toFixed(2)} KB)`
			);
		});
		console.log("=====================================");

		setIsSubmitting(false);
		setSubmitSuccess(true);

		// Reset after 3 seconds
		setTimeout(() => {
			setImages([]);
			setSubmitSuccess(false);
		}, 3000);
	};

	if (submitSuccess) {
		return (
			<div className="bg-white rounded-lg shadow-lg p-8 text-center">
				<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
				<h2 className="text-2xl font-bold text-slate-900 mb-2">
					Verification Submitted!
				</h2>
				<p className="text-slate-600 mb-4">
					Your {images.length} product image
					{images.length !== 1 ? "s" : ""} have been successfully
					submitted for verification.
				</p>
				<p className="text-sm text-slate-500">
					Redirecting in a moment...
				</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow-lg overflow-hidden">
			<div className="p-5">
				{/* Upload Area */}
				<UploadArea
					onFileSelect={handleFileSelect}
					disabled={images.length >= MAX_IMAGES}
				/>

				{/* Error Message */}
				{error && (
					<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
						<X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
						<p className="text-red-700 text-sm">{error}</p>
					</div>
				)}

				{/* Image Count */}
				{images.length > 0 && (
					<div className="mt-6 p-4  border border-blue-200 rounded-lg">
						<p className="text-blue-900 font-medium">
							{images.length} of {MAX_IMAGES} images uploaded
						</p>
						<div className="mt-2 w-full bg-blue-200 rounded-full h-2">
							<div
								className="bg-blue-600 h-2 rounded-full transition-all duration-300"
								style={{
									width: `${
										(images.length / MAX_IMAGES) * 100
									}%`,
								}}
							/>
						</div>
					</div>
				)}

				{/* Image Preview Grid */}
				<ImagePreviewGrid
					images={images}
					onRemove={handleRemoveImage}
				/>

				{/* Submit Button */}
				<SubmitButton
					onClick={handleSubmit}
					isLoading={isSubmitting}
					disabled={images.length === 0 || isSubmitting}
					imageCount={images.length}
				/>
			</div>
		</div>
	);
}
