import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

interface AuthFormProps {
  email: string;
  password: string;
  errorMessage: string;
  loading: boolean;
  showPassword: boolean;
  isRegister: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPasswordVisibility: () => void;
}

const AuthForm = ({
  email,
  password,
  errorMessage,
  loading,
  setEmail,
  setPassword,
  setPasswordVisibility,
  showPassword,
  isRegister,
}: AuthFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <input
          type="text"
          name="Email"
          className="bg-gray-300 bg-opacity-25 h-12 w-full px-3 py-7 rounded-xl"
          placeholder="Email"
          disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          className=" bg-gray-300 bg-opacity-25 h-12 w-full px-3 py-7 rounded-xl"
          placeholder="Password"
          disabled={loading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          {showPassword ? (
            <IoMdEyeOff
              className="text-gray-400 h-6 w-6 hover:cursor-pointer"
              onClick={setPasswordVisibility}
            />
          ) : (
            <IoMdEye
              className="text-gray-400 h-6 w-6 hover:cursor-pointer"
              onClick={setPasswordVisibility}
            />
          )}
        </span>
      </div>
      {errorMessage !== "" && !isRegister && (
        <div className="text-sm text-red-500">{errorMessage}</div>
      )}
    </div>
  );
};

export default AuthForm;
