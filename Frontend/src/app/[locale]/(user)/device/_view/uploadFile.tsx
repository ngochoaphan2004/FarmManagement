"use client";
import Image from "next/image";
import Aos from "@/components/aos";
import 'aos/dist/aos.css'
import { useEffect, useRef, useState } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from 'axios';
import { useSession } from "@/providers/SessionProvider";
import { UpdateAccountPayload, UpdateAvatarPayload } from "@/BE-library/interfaces";
import CustomLoadingElement from "../../loading";
import { useRouter } from "next/navigation";
export default function UploadFile() {
	const {session, status} =useSession()
	const [data, setData] = useState<UpdateAccountPayload>({});
	const [files, setFiles] = useState([]);
	const fileInputRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);
	const router =useRouter()
	const handleFileUpload = (uploadedFiles) => {
		const filesWithProgress = Array.from(uploadedFiles).map((file) => ({
		file,
		progress: 0,
		status: "Uploading...",
		}));
		setFiles((prevFiles) => [...prevFiles, ...filesWithProgress]);
		startUpload(filesWithProgress[0]);
		// Clear the file input to allow re-uploading the same file
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const startUpload = async (fileObj) => {
		try {
			const formData = new FormData();
			formData.append('file', fileObj.file);
			formData.append('token', session.sid);

			const response = await axios.post('https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/files', formData, {
				onUploadProgress: (progressEvent) => {
					const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					setFiles((currentFiles) =>
						currentFiles.map((f) =>
							f.file === fileObj.file ? { ...f, progress } : f
						)
					);
				},
				withCredentials: true, // Enable sending cookies across domains (if needed)
				validateStatus: (status) => status >= 200 && status <= 299, // Only consider successful responses (200-299)
				headers: {
					Authorization: `Bearer ${session.sid}`, // Add Authorization header with token
				},
			});
			console.log(response)
			localStorage.setItem("fileId", response.data.data.id)
			// Handle successful upload (response.status within 200-299)
			setFiles((currentFiles) =>
				currentFiles.map((f) =>
					f.file === fileObj.file ? { ...f, status: "success" } : f
				)
			);

		} catch (error) {
			console.error('Error uploading file:', error);
			setFiles((currentFiles) =>
				currentFiles.map((f) =>
					f.file === fileObj.file ? { ...f, status: "failed"} : f
				)
			);
		}
    };


	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
		handleFileUpload(e.dataTransfer.files);
		e.dataTransfer.clearData();
		}
	};
	const handleRemoveFile = (fileToRemove) => {
		setFiles((currentFiles) => currentFiles.filter((f) => f.file !== fileToRemove));
		
	};
	const calculation = (fileObj)=>{
		let fileCur = fileObj.file.size * fileObj.progress / 100000
		return fileCur
	}
	// Helper function to determine the file icon based on file extension
	const getFileIcon = (fileName) => {
		const extension = fileName.split(".").pop().toLowerCase();
		switch (extension) {
		case "pdf":
			return "/photos/pdf-icon.png"; // Path to PDF icon
		case "doc":
		case "docx":
			return "/photos/doc-icon.png"; // Path to Word icon
		case "jpg":
		case "jpeg":
		case "png":
		case "gif":
			return "/photos/png-icon.png"; // Path to Image icon
		case "xls":
		case "xlsx":
			return "/photos/excel-icon.png"; // Path to Excel icon
		default:
			return "/photos/file-icon.png"; // Default icon for other file types
		}
	};
	return (
		<>
		<Aos/>
		{status === "authenticated" && session ?
			<div className="mt-32 flex flex-col absolute w-fit
            rounded-3xl  gap-10 items-center animate-slide_in_up
            h-fit">
				<div className="h-2/3 relative bg-white p-6 rounded-3xl w-full max-w-md mx-auto mt-8 ">
					<button className="absolute top-3.5 right-3.5" >
						<Image src="/photos/x.png" 
								alt="Cloud" width={20} height={20}/>
					</button>
					
					<div className="flex flex-row border-b-2 border-b-solid border-b-[#CBD0DC] mb-5">
						<div className="justify-items-center content-center" style={{width: "40px", height: "40px", border: "1px solid #000", borderRadius: '100%'}}>
							<Image src="/photos/cloud-add.png" 
								alt="Cloud" width={30} height={30}/>
						</div>
						<div className="ml-5">
							<p className="text-[17px] text-[#292D32]">Upload files</p>
							<p className="text-[#A9ACB4] text-sm mb-4">
								Select and upload the files of your choice
							</p>
						</div>
					</div>
					<div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center"
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					>
						<input 
						type="file"
						multiple
						onChange={(e)=>handleFileUpload(e.target.files)}
						ref={fileInputRef}
						className="hidden"
						id="file-upload"
						/>
						<label className="cursor-pointer text-blue-600" style={{height: "100%", width: "100%"}}>
							<div className="text-gray-400 justify-items-center">
								<Image src="/photos/cloud-add.png" 
									alt="Cloud" width={20} height={20}/>
							</div>
							<span className="block text-[#292D32] mt-2">Choose a file or drag & drop it here</span>
							<span className="text-xs text-[#A9ACB4]">JPEG, PNG, PDG, and MP4 formats, up to 50MB</span>
							<button onClick={() => document.getElementById('file-upload').click()} className="mt-4 px-4 py-2 bg-white text-[#54575C] rounded-md border-2 border-solid border-[#CBD0DC]">Browse File</button>
						</label>
					</div>

					<div className="mt-4 w-full flex flex-col max-h-72 space-y-4 overflow-y-scroll hide-scrollbar">
						{files.map((fileObj, index) => (
						<div key={index} className="relative p-4 rounded-lg bg-gray-100 flex items-center justify-between">
							<div className="flex flex-col space-x-3 w-full">
								<div className="flex items-center w-full px-5">

								<img src={getFileIcon(fileObj.file.name)} alt="" width={35} height={35} />
								<div className="px-4 w-full">
									<p className="text-gray-800 w-full text-sm font-medium truncate">{fileObj.file.name}</p>
									<div className="text-xs text-gray-500">
										{fileObj.status === "failed" ?( 
											<div className="flex flex-row text-red-500">
											{`${calculation(fileObj)} KB of ${fileObj.file.size / 1000} KB •`}
											
											{` Failed`}
										</div>
										): fileObj.status === "success" ? (
											<div className="flex flex-row">
												{`${calculation(fileObj)} KB of ${fileObj.file.size / 1000} KB •`}
												<Image src="/photos/complete.png" className="mx-1 text-[#375EF9]"
													alt="complete" width={15} height={15}/>
												{` Completed`}
											</div>
										) :
										(   <div className="flex flex-row">
											{`${calculation(fileObj)} KB of ${fileObj.file.size / 1000} KB •`}
											<Image src="/photos/loading.png" className="mx-1 text-[#375EF9] animate-spin"
												alt="Loading" width={15} height={15}/>
											{` Uploading...`}
											</div>
										)
									}
									</div>
								</div>
								</div>
								{ <div className="flex items-center w-full mt-2" style={{marginLeft: "0px"}}>
								{fileObj.progress < 1000 ? (
										<div className="w-full bg-[#CBD0DC] rounded-full h-1">
											<div
												className="h-full bg-[#375EF9] rounded-full w-full"
												style={{ width: `${fileObj.progress}%` }}
												></div>
											<button onClick={() => handleRemoveFile(fileObj.file)} className="absolute top-2 right-2" >
												<Image src="/photos/x.png" 
														alt="x" width={15} height={15}/>
											</button>
										</div>	
								) : (
									<button onClick={() => handleRemoveFile(fileObj.file)} className="absolute top-2 right-2" >
										<Image src="/photos/trash.png" 
											alt="trash" width={15} height={15}/>
									</button>
								)}
								
								</div>}
							</div>
						</div>
						))}
					</div>
				</div>
				<button 
				onClick={()=>router.push(`/print/format`)}
				className="w-full bg-white rounded-full py-2 px-5 active:scale-95 duration-150 ease-in">
					Chọn in
				</button>
			</div>:
			<div className="h-screen  w-screen">
				<CustomLoadingElement/>
			</div>
		}			
		</>
		
	);
}
