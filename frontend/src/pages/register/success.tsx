import { Link } from 'react-router-dom';

export default function RegisterSuccessPage() {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/2 bg-indigo-600"></div>
      <div className="w-1/2 p-6 flex flex-col gap-4">
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col w-2/3 gap-y-6 items-center">
            <div className="text-4xl text-black font-black">
              Welcome to Twatter!
            </div>
            <div>
              We sent you a verification email to make sure you have access to
              the address you provided us. Please click the link in said email
              to activate your account.
            </div>
            <div className="flex w-full items-center">
              <div className="w-1/2">You haven't received our mail?</div>
              <div className="w-1/2">
                <button className="bg-indigo-600 w-full py-4 px-6 text-white rounded-full">
                  Resend verification email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
