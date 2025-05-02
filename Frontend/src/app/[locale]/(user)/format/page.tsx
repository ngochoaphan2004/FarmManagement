"use client";
import Image from "next/image";
import 'aos/dist/aos.css'
import {useState } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



export default function Home() {
	const [value, setValue] = useState(1);
	const file = useState([])
	const [fromPage, setFromPage] = useState(1)
	const [toPage, setToPage] = useState(1)
	const [isOpenPreview, setIsOpenPreview] = useState(false);
	const [scale, setScale] = useState(false);
	const [copiesperpage, setCopiesperpage] = useState(1)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
	const increaseValue = (func) => {
		func(prevValue => prevValue + 1);
	};

	const decreaseValue = (func) => {
		func(prevValue => (prevValue > 1 ? prevValue - 1 : 1));
	};

	const handleToggle = () => {
		setIsOpenPreview(!isOpenPreview);
	};
	return (
		<>
		{/* {status == "unauthenticated" && open && <SignInPopUp setOpen={setOpen}/>} */}
		<div className=" h-fit overflow-x-hidden overflow-y-hidden flex flex-row">
			{/* {t('title')} */}
			<div className="relative w-1/3 h-screen flex items-center bg-[#373839] p-7">
					<iframe src="https://drive.google.com/file/d/17yxahSqS7m99W8wpeDQrgK3ePP1Z5NFT/preview" className="h-screen w-full" allow="autoplay"></iframe>
			</div>
			<div className="relative overflow-x-hidden w-2/3 h-screen flex flex-col text-white bg-[#26282A]">
				<div className="p-5 space-y-7 ">
				<div className="w-full bg-[#2D3032]">
					<div className="w-full flex flex-row justify-between p-2 px-7">
						<div className="self-start">Printer</div>
						<div className="flex justify-end ">
							<div>LBP3000</div>
							<div className="flex flex-col items-center justify-center space-y-1 pl-2">
								<button className="bg-[#AAABAC] hover:bg-[#DDDDDD] focus:outline-none flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7-7-7 7"/>
									</svg>
								</button>
								<button className="bg-[#AAABAC] hover:bg-[#DDDDDD] focus:outline-none flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7 7 7-7"/>
									</svg>
								</button>
							</div>
						</div>
					</div>
					<div className="border-b-2 border-solid border-[#D1D2D2] mx-5"></div>

					<div className="w-full flex flex-row justify-between p-2 px-7">
					<div className="self-start">Preset</div>
						<div className="flex justify-end ">
							<div>Default Settings</div>
							<div className="flex flex-col items-center justify-center space-y-1 pl-2">
								<button className="bg-[#AAABAC] hover:bg-[#DDDDDD] focus:outline-none flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7-7-7 7"/>
									</svg>
								</button>
								<button className="bg-[#AAABAC] hover:bg-[#DDDDDD] focus:outline-none flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7 7 7-7"/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full bg-[#2D3032]">
					<div  className="w-full flex flex-row justify-between p-2 px-7">
						<div className="self-start">Copies</div>
						<div className="flex justify-end items-center">
							<input
								type="number"
								value={value}
								min={1}
								onChange={(e) => setValue(() => Number(e.target.value) > 1 ? Number(e.target.value) : 1)}
								className="text-center w-16 h-5 focus:outline-none bg-[#393A3D] items-end"
							/>
							<div className="flex flex-col items-center justify-center space-y-1 pl-2">
								<button onClick={()=>increaseValue(setValue)} className="bg-[#AAABAC] hover:bg-[#DDDDDD] focus:outline-none flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7-7-7 7"/>
									</svg>
								</button>
								<button onClick={()=>decreaseValue(setValue)} className="bg-[#AAABAC] hover:bg-[#DDDDDD] focus:outline-none flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7 7 7-7"/>
									</svg>
								</button>
							</div>
						</div>
					</div>

					<div className="border-b-2 border-solid border-[#D1D2D2] mx-5"></div>

					<div className="w-full flex flex-col justify-between p-2 px-7">
						<div>Pages</div>
						<div className="flex flex-col px-5 py-1">
							<div>
								<input className="accent-[#1D60D1]" type="radio" id="all" name="page" defaultChecked/>
								<label htmlFor="all" className="px-3">All {`${file.length}`} Pages</label>
							</div>
							<div>
								<input className="accent-[#1D60D1]" type="radio" id="preview" name="page" />
								<label htmlFor="preview" className="px-3">Selection in Preview</label>
							</div>
							<div>
								<input className="accent-[#1D60D1]" type="radio" id="range" name="page" />
								<label htmlFor="range" className="px-3">Range from <input type="number" value={fromPage} min={1} max={toPage}
								onChange={(e) => setFromPage(() => Number(e.target.value) > toPage ? toPage : Number(e.target.value) > 1 ?  Number(e.target.value): 1)}
								className="text-center w-16 h-5 mx-3 focus:outline-none bg-[#393A3D] items-end"/>
								to <input type="number" value={toPage} min={fromPage}
								onChange={(e) => setToPage(() => Number(e.target.value) >= fromPage ? Number(e.target.value) : fromPage)}
								className="text-center w-16 h-5 mx-3 focus:outline-none bg-[#393A3D] items-end"/>
								</label>
							</div>
							<div>
								<input className="accent-[#1D60D1]" type="radio" id="optional" name="page"/>
								<label htmlFor="optional" className="px-3">Selection <div className="ml-6 h-0 text-xs text-[#6E7071]">Select pages from the side bar</div></label>
							</div>
						</div>
					</div>

					<div className="border-b-2 border-solid border-[#D1D2D2] mx-5"></div>

					<div className="w-full flex flex-row justify-between p-2 px-7">
						<div className="self-start">Paper Size</div>
						<div className="flex justify-end ">
							<div className="flex flex-row items-center">A4 <div className="ml-1 text-xs text-[#6E7071] self-end">210 by 297 mm</div></div>
							<div className="flex flex-col items-center justify-center space-y-1 pl-2">
								<button className="bg-[#AAABAC] hover:bg-[#DDDDDD] focus:outline-none flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7-7-7 7"/>
									</svg>
								</button>
								<button className="bg-[#AAABAC] hover:bg-[#DDDDDD] focus:outline-none flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7 7 7-7"/>
									</svg>
								</button>
						</div>
						</div>
					</div>

					<div className="border-b-2 border-solid border-[#D1D2D2] mx-5"></div>

					<div className="w-full flex flex-row justify-between p-2 px-7">
						<div className="self-start">Orientation</div>
						<div className="flex justify-end ">
							<div className="flex flex-row">
							<input className="accent-[#1D60D1]" type="radio" id="portrait" name="orientation" defaultChecked/>
							<label htmlFor="portrait" className="px-3 flex flex-row items-center">
								<Image className="mr-2" src={"/photos/orientation.png"} width={0} height={0} style={{width:"15px", height: "17px"}} alt="none"/>
								Portrait</label>
							</div>
							<div>
								<div className="flex flex-row">
								<input className="accent-[#1D60D1]" type="radio" id="landscape" name="orientation"/>
								<label htmlFor="landscape" className="px-3 flex flex-row items-center">
									<Image className="mr-2 rotate-90" src={"/photos/orientation.png"} width={0} height={0} style={{width:"15px", height: "17px"}} alt="none"/>
									Landscape</label>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="text-white w-full rounded-md pb-7">
					<button
						onClick={handleToggle}
						className="flex items-center focus:outline-none w-full"
					>
						<span className={`transform transition-transform ${isOpenPreview ? 'rotate-90' : ''}`}>
						►
						</span>
						<span className="ml-2 font-semibold">Preview</span>
					</button>
					{isOpenPreview && (
						<div className="bg-[#2D3032] p-2 pb-10 rounded-lg text-white w-full h-full">
						<div className="flex justify-around">
						  <div className="">
							<label className="flex items-center space-x-2">
							  <input type="checkbox" className="form-checkbox accent-[#267AFE]" />
							  <span>Auto Rotate</span>
							</label>
				  
							<label className="flex items-center space-x-2">
							  <input type="radio" name="scaleOption" className="form-radio accent-[#267AFE]" defaultChecked/>
							  <span>Scale</span>
							</label>
				  
							<label className="flex items-center space-x-2">
							  <input type="radio" name="scaleOption" className="form-radio accent-[#267AFE]"/>
							  <span>Scale to Fit:</span>
							</label>
							<div className="h-7"></div>
							<div className="flex items-center space-x-2">
							  	<span>Copies per page:</span>
							</div>
						  </div>
				  
						  <div className="">
							<label className="flex items-center space-x-2">
							  <input type="checkbox" className="form-checkbox accent-[#267AFE]" />
							  <span>Show Notes</span>
							</label>

							<div className="flex items-center space-x-2">
							<input
									type="number"
									className="text-center w-16 h-5 focus:outline-none bg-[#393A3D] items-end"
								/>
							</div>
				  
							<label className="flex items-center space-x-2">
							  <input type="radio" name="printOption" className="form-radio accent-[#267AFE]" defaultChecked />
							  <span>Print Entire Image</span>
							</label>
				  
							<label className="flex items-center space-x-2">
							  <input type="radio" name="printOption" className="form-radio accent-[#267AFE]"/>
							  <span>Fill Entire Paper</span>
							</label>

							<div className="flex items-center">
							  	<input
									type="number"
									value={copiesperpage}
									min={1}
									onChange={(e) => setCopiesperpage(() => Number(e.target.value) > 1 ? Number(e.target.value) : 1)}
									className="text-center w-16 h-5 focus:outline-none bg-[#393A3D] items-end"
								/>
								<div className="flex flex-col items-center justify-center space-y-1 pl-2">
									<button onClick={()=>increaseValue(setCopiesperpage)} className="bg-[#AAABAC] hover:bg-[#DDDDDD] focus:outline-none flex items-center justify-center">
										<svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7-7-7 7"/>
										</svg>
									</button>
									<button onClick={()=>decreaseValue(setCopiesperpage)} className="bg-[#AAABAC] hover:bg-[#DDDDDD] focus:outline-none flex items-center justify-center">
										<svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7 7 7-7"/>
										</svg>
									</button>
								</div>
							</div>
						  </div>
						</div>
					  </div>
					)}
					{!isOpenPreview && (<div style={{height: "10rem"}}>

					</div>)
					}
					</div>
					</div>
					<div className="sticky bottom-0 left-0 bg-[#2D3032] h-fit w-full border-t-2 broder-solid border-[#D1D2D2]">
					<div className="mx-10 p-4 flex flex-row justify-between items-center ">
						<div className="flex flex-row space-x-4">
							<div className="flex items-center space-x-2">
								<Image src={"/photos/help.png"} alt="none" width={25} height={25} />
							</div>
							<div className="relative">
								<button 
									className="bg-[#656668] text-white px-2 flex items-center flex flex-row"
									onClick={toggleDropdown}
								>
									<div className="py-1" style={{"width": "4rem"}}>
										PDF
									</div>
									<span className="ml-2 py-1 pl-2 flex border-l-2 border-solid border-white justify-center">&#9660;</span> {/* Mũi tên xuống */}
								</button>
								{isDropdownOpen && (
									<div className="absolute bottom- text-white mt-2 p-2 shadow">
										<div>Option 1</div>
										<div>Option 2</div>
									</div>
								)}
							</div>
						</div>
						<div className="flex justify-end space-x-10">
							<button className="bg-[#656668] text-white px-2 py-1" style={{"width": "6rem"}}>Cancel</button>
							<button className="bg-[#1F66E0] text-white px-2 py-1" style={{"width": "6rem"}}>Print</button>
						</div>
					</div>
					</div>
			</div>
		</div>
		</>
		
	);
}
function setSelectedOption(value: any) {
	throw new Error("Function not implemented.");
}

