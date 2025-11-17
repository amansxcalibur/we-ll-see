import Image from "next/image";
import profile from "@/public/Assets/logo.png";
import banner from "@/public/Assets/banner.jpg";

export default function Profile() {
  return (
    <div className="w-full bg-black min-h-screen flex flex-col items-center pt-20">
      <div className="w-full max-w-5xl h-78 rounded-3xl overflow-hidden shadow-md">
        <Image
          src={banner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>  
      <div className="w-full max-w-5xl rounded-2xl shadow-lg -mt-20 p-6 bg-black">
        <div className="flex items-start justify-between">
          <div className="flex gap-6">
            <Image
              src={profile}
              alt="Profile"
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
            />            
            <div className="flex flex-col justify-center mt-3">
              <h1 className="text-3xl font-semibold">Mahatma Gandhi</h1>          
              <p className="flex items-center gap-2 text-gray-600 mt-2">            
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="w-5 h-5 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0v0a3 3 0 016 0v0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7-7.5 11.25-7.5 11.25S4.5 17.5 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                Somewhere around the earth
              </p>
            </div>
          </div>

          <div className="flex items-center h-full pr-2 pt-25">
            <p className="text-3xl font-semibold text-gray-700">
              Karma : <span className="text-yellow-600">239pts</span>
            </p>
          </div>
        </div>    
        <div className="flex gap-4 mt-6 w-35 hover:scale-110 border border-white-800 rounded-xl transition-transform duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi py-2 bi-pencil h-8 ml-2 mt-1" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
          </svg>
          <button className="py-2 text-white-900 font-medium ">
            Edit Profile
          </button>
        </div>
        <div className="mt-10 w-full">
          <h2 className="text-2xl font-semibold mb-3">Bio</h2>
          <textarea
            placeholder="Write something about yourself..."
            className="w-full h-40 p-4 text-lg rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="flex justify-end mt-10">
            <button className="flex items-center hover:bg-blue-950 hover:scale-110 bg-blue-900 rounded-3xl h-10 p-8 mr-10 transition-transform duration-300 ease-in-out ">
                <h1 className="text-3xl">Refer a Friend</h1>
            </button>
            <button className="flex items-center hover:bg-red-950 bg-red-900 hover:scale-110 rounded-3xl h-10 p-8 transition-transform duration-300 ease-in-out ">
                <h1 className="text-3xl">Sign Out :(</h1>
            </button>
        </div>
      </div>
    </div>
  );
}
