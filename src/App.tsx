import { Upload } from "lucide-react";
import "./App.css";
import ProductVerificationUpload from "./components/product-verification-upload";

function App() {
	return (
		<div>
			<div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
				<h1 className="text-3xl font-bold text-white flex items-center gap-2">
					<Upload className="w-8 h-8" />
					Product Verification
				</h1>
				<p className="text-blue-100 mt-2">
					Upload up to 5 product images for verification
				</p>
			</div>
			<div className="max-w-[900px] mx-auto mt-10">
      <ProductVerificationUpload />
      </div>
		</div>
	);
}

export default App;
