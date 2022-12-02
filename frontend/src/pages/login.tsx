import { Link } from 'react-router-dom';
import SecretInput from '../components/common/SecretInput';

export default function LoginPage() {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/2 bg-indigo-600"></div>
      <div className="w-1/2 p-6 flex flex-col gap-4">
        <div className="w-full flex justify-end text-lg gap-4 items-center">
          New here?
          <Link to="/register">
            <button className="bg-indigo-600 text-white rounded-full py-2 px-5">
              Register
            </button>
          </Link>
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col w-2/3 gap-y-6 items-center">
            <div className="text-4xl text-black font-black">Welcome back!</div>
            <div>There was a lot going on while you were gone!</div>
            <div className="w-full flex flex-col gap-2">
              <div className="text-lg">Email Address or Username</div>
              <input
                type="text"
                className="w-full rounded-full bg-slate-100 py-4 px-6 focus:border-0"
                placeholder="jon@doe.com / JonDoe_123"
              />
            </div>
            <SecretInput
              className="w-full"
              placeholder="Hopefully it's not 12345678"
            />
            <button className="bg-indigo-600 w-full py-4 px-6 text-white rounded-full">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
