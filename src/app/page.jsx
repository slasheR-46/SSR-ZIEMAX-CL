import { Button } from "flowbite-react";
import SignIn from "./components/auth/SignIn";

export default function page() {
  return (
    <>
      <div className='min-h-screen bg-cover bg-center' style={{ backgroundImage: "url('/login1.jpg')" }}>
        <SignIn />
      </div>
    </>
  );
}
