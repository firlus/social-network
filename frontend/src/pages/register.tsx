import { Link } from 'react-router-dom';
import SecretInput from '../components/common/SecretInput';

export default function RegisterPage() {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/2 bg-indigo-600"></div>
      <div className="w-1/2 p-6 flex flex-col gap-4">
        <div className="w-full flex justify-end text-lg gap-4 items-center">
          Already have an account?
          <Link to="/login">
            <div className="bg-indigo-600 text-white rounded-full py-2 px-5">
              Log In
            </div>
          </Link>
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col w-2/3 gap-y-6 items-center">
            <div className="text-4xl text-black font-black">Join us!</div>
            <div>Register now to access all of Twatter!</div>
            <div className="w-full flex flex-col gap-2">
              <div className="text-lg">Email Address</div>
              <input
                type="text"
                className="w-full rounded-full bg-slate-100 py-4 px-6 focus:border-0"
                placeholder="jon@doe.com"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="text-lg">Username</div>
              <input
                type="text"
                className="w-full rounded-full bg-slate-100 py-4 px-6 focus:border-0"
                placeholder="JonDoe_123"
              />
            </div>
            <SecretInput
              className="w-full"
              placeholder="Your super secret password"
              validators={[
                {
                  message: 'At least 8 characters long',
                  validate: (secret: string) => secret.length >= 8,
                },
                {
                  message: 'At least one lowercase letter',
                  validate: (secret: string) => secret.toUpperCase() != secret,
                },
                {
                  message: 'At least one uppercase letter',
                  validate: (secret: string) => secret.toLowerCase() != secret,
                },
                {
                  message: 'At least one number',
                  validate: (secret: string) => /\d/.test(secret),
                },
              ]}
            />
            <div className="flex gap-x-2">
              <input type="checkbox" name="eula" id="eula" />
              <label htmlFor="eula">
                I have read and understand the terms of conditions and accept
                them.
              </label>
            </div>
            <button className="bg-indigo-600 w-full py-4 px-6 text-white rounded-full">
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
