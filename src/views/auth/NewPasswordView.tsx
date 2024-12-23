import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewpasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";

const NewPasswordView = () => {
  const [token, setToken] = useState<ConfirmToken["token"]>(" ");

  const [isValidToken, setIsValidToken] = useState(false);
  return (
    <>
      <h1 className="text-5xl font-black text-white">Nuevo Password</h1>
      <p className="text-2xl font-light text-white mt-5 mb-2">
        Ingresa el código que recibiste {""}
        <span className=" text-fuchsia-500 font-bold"> por email</span>
      </p>
      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewpasswordForm token={token} />
      )}
    </>
  );
};

export default NewPasswordView;
