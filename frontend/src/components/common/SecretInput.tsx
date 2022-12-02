import { useState } from 'react';

interface SecretInputProps {
  className?: string;
  validators?: SecretInputValidator[];
  placeholder?: string;
}

interface SecretInputValidator {
  message: string;
  validate: (secret: string) => boolean;
}

export default function SecretInput(props: SecretInputProps) {
  const [input, setInput] = useState('');
  const [reveal, setReveal] = useState(false);

  return (
    <div className={`flex flex-col gap-2 ${props.className}`}>
      <div className="text-lg">Password</div>
      <div
        className="w-full rounded-full bg-slate-100 overflow-hidden py-4 px-6 flex items-center gap-2"
        placeholder="jon@doe.com"
      >
        <input
          type={reveal ? 'text' : 'password'}
          className="bg-slate-100 w-full focus:ring-transparent"
          value={input}
          placeholder={props.placeholder}
          onChange={(event) => setInput(event.target.value)}
        />
        <i
          className={`fa-solid ${reveal ? 'fa-eye-slash' : 'fa-eye'}`}
          onClick={() => setReveal(!reveal)}
        ></i>
      </div>
      <div className="flex flex-wrap gap-y-2">
        {props.validators?.map((validator) => {
          const isValid = validator.validate(input);
          const icon = isValid ? (
            <i className="fa-solid fa-check"></i>
          ) : (
            <i className="fa-solid fa-xmark"></i>
          );
          const color = isValid ? 'text-green-600' : 'text-slate-400';
          return (
            <div className={`w-1/2 items-center ${color}`}>
              {icon} {validator.message}
            </div>
          );
        })}
      </div>
    </div>
  );
}
