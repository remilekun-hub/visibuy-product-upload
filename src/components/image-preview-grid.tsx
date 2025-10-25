"use client";

import { Trash2 } from "lucide-react";

interface UploadedImage {
	id: string;
	file: File;
	preview: string;
}

interface ImagePreviewGridProps {
	images: UploadedImage[];
	onRemove: (id: string) => void;
}

export default function ImagePreviewGrid({
	images,
	onRemove,
}: ImagePreviewGridProps) {
	if (images.length === 0) {
		return null;
	}
	return (
		<div className="mt-8">
			<h2 className="text-lg font-semibold text-gray-900 mb-4">
				Preview
			</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{images.map((image) => (
					<div key={image.id} className="relative group">
						<div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
							<img
								src={image.preview || "/placeholder.svg"}
								alt={image.file.name}
								className="w-full h-full object-cover"
							/>
						</div>

						{/* Delete Button */}
						<button
							onClick={() => onRemove(image.id)}
							className="absolute cursor-pointer! top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
							title={`Delete ${image.file.name}`}
						>
							<Trash2 className="w-4 h-4" />
						</button>

						{/* File Name */}
						<p className="mt-2 text-xs text-gray-600 truncate">
							{image.file.name}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
