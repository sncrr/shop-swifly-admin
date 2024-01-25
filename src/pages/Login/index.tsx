import { useState } from 'react';
import { FormGroup, FormInput, FormLabel, FormSection } from "../../components/forms";
import { useDispatch } from 'react-redux';
import { AdminController } from "../../controllers";
import { Submit } from '../../components/forms/Submit';
import { setAccessToken } from '../../utils/authUtils';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from './schema';
import { setUser } from '../../root/Admin/slice';

function Login() {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const formMethods = useForm({
    resolver: yupResolver(LoginSchema)
  });

  const {
    handleSubmit,
    getValues
  } = formMethods;

  const onSubmit = async () => {

    setIsLoading(true);

    let username = getValues('username');
    let password = getValues('password');

    let result = await AdminController.authenticate(username, password);

    if (result && result.access_token) {
      setAccessToken(result.access_token);
      dispatch(setUser(result.access_token));
    }

    setIsLoading(false);
  }

  return (
    <div className="flex justify-center w-full h-full bg-gray-800 p-2">
      <div className="mx-auto bg-white rounded-sm p-8 self-center">
        <h6>ACCOUNT LOGIN</h6>
        <FormProvider {...formMethods}>
          <form className="mt-4 w-[30rem]" onSubmit={handleSubmit(onSubmit)}>
            <FormSection>
              <FormGroup required>
                <FormLabel>Username</FormLabel>
                <FormInput name="username" />
              </FormGroup>

              <FormGroup required>
                <FormLabel>Password</FormLabel>
                <FormInput type='password' name="password" />
              </FormGroup>
            </FormSection>

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
                  type='button'
                >
                  Forgot Password
                </button>
              </div>
            </div>
            <div className="mt-6 flex">
              <Submit 
                // className="w-full" 
                disabled={isLoading}
                text='Submit'
              />
            </div>
          </form>
        </FormProvider>


      </div>
    </div>
  )
}

export default Login;