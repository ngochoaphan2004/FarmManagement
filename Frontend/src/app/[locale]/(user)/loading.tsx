'use client'
export default function CustomLoadingElement() {
    return (
        <div className="w-screen h-screen flex overflow-hidden flex-col gap-4 justify-center place-items-center  ">
            <div className="w-fit h-fit p-20 gap-10 items-center justify-center  flex flex-col">
                <div className="flex justify-center items-center h-full">
                    <div className="rounded-full h-20 w-20 bg-do_600 animate-ping"></div>
                </div>
            </div>
        </div>
    );
}