export const Error = (ErrorProps:{message: string}) => {
    return (
        <div className="flex items-center justify-center h-screen"> 
            <p className="ml-4 text-lg text-red-500">{ErrorProps.message}</p>
            <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => window.location.reload()}>Retry</button>
            <button className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={() => window.location.href = "/"}>Go Home</button>
        </div>
    );
}