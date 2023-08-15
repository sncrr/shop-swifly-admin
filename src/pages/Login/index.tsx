import { useState } from 'react';
import { FormControl, FormGroup, FormInput, FormLabel } from "../../components/forms";
import { useDispatch } from 'react-redux';
import { AdminController } from "../../controllers";
import { Submit } from '../../components/forms/Submit';
import { setAccessToken } from '../../utils/authUtils';
import { setUser } from '../../root/slices/userSlice';

function Login () {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    setIsLoading(true);

    let username = e.target.username?.value;
    let password = e.target.password?.value;

    let result = await AdminController.authenticate(username, password);
    console.log("LOGIN", result)
    if(result && result.access_token) {
      dispatch(setUser(result.access_token));
  
      setAccessToken(result.access_token)
    }

    setIsLoading(false);
  }

  return (
    <div className="flex justify-center w-full h-full bg-gray-800 p-2">
      <div className="mx-auto bg-white rounded-sm p-8 self-center">
        <h6>ACCOUNT LOGIN</h6>
        <form className="mt-4" onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="username">
              Username
            </FormLabel>
            <FormControl>
              <FormInput
                type="text"
                name="username"
                required
              />
            </FormControl>
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="passord">
              Password
            </FormLabel>
            <FormControl>
              <FormInput
                type="password"
                name="password"
                required
              />
            </FormControl>
          </FormGroup>
          
          <div className="flex justify-between items-end text-xs">
            <div className="space-x-1 mt-4">
              <input
                className="h-3"
                id="remember_me"
                type="checkbox"
              />
              <label
                htmlFor="remember_me"
              >
                Remember me
              </label>
            </div>
            <div className="space-x-1 mt-2">
              <button
                className="underline"
              >
                Forgot Password
              </button>
            </div>
          </div>
          <div className="mt-6 flex">
            <Submit className="w-full" disabled={isLoading}>
              LOG IN
            </Submit>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login;