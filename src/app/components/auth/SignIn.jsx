"use client";

import { Button, Label, TextInput } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { HiEye, HiEyeOff, HiLockClosed, HiUser } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      nombre_usuario: usuario,
      password,
    });
    if (res.ok) {
      router.replace("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full bg-black/50 p-6 rounded-lg shadow-md'>
        {/* Ilustracion derecha */}
        <div className='hidden md:flex items-center justify-center'>
          <Image
            src='/logo-color.svg'
            alt='Illustration'
            width={400}
            height={400}
            className='w-full h-auto transition-transform duration-300 hover:scale-110'
          />
        </div>
        {/* Formulario derecho */}
        <div className='flex flex-col justify-center space-y-6'>
          <div>
            <h2 className='text-2xl font-bold text-purple-600'>Iniciar Sesion</h2>
            <p className='text-sm text-white'>SSR Ziemax</p>
          </div>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <Label htmlFor='usuario' value='Usuario' />
              <TextInput
                id='usuario'
                name='usuario'
                icon={HiUser}
                placeholder='Usuario'
                maxLength={15}
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor='password' value='Password' />
              <div className='relative '>
                <TextInput
                  id='password'
                  name='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='Contraseña'
                  icon={HiLockClosed}
                  maxLength={15}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 flex items-center px-2 text-gray-600'>
                  {showPassword ? <HiEye /> : <HiEyeOff />}
                </button>
              </div>
            </div>
            {error && <div className='text-red-500 text-sm'>{error}</div>}
            <Button type='submit' className='!bg-orange-600 !hover:bg-amber-700 text-white font-semibold w-full'>
              Iniciar Sesión
            </Button>
          </form>
          <Button
            color='light'
            className='w-full !bg-purple-600 border border-purple-500 text-white hover:bg-blue-50 gap-1'>
            Continuar con Ziemax
            <Image src='/Z!.ico' alt='icono' width={20} height={20} className='w-5 h-5' priority />
          </Button>
          <div className='text-sm text-white'>
            ¿Olvidaste tu contraseña?{" "}
            <a href='/sign-up' className='text-purple-600 hover:underline'>
              Recuperala Aquí
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
