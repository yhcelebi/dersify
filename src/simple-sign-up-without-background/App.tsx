"use client"

import { useState } from "react"
import { Button, Input, Checkbox, Link, Divider } from "@heroui/react"
import { Icon } from "@iconify/react"

import { AcmeIcon } from "./acme"

export default function SignUpComponent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const toggleVisibility = () => setIsVisible(!isVisible)
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible)

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage("")
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setErrorMessage("Şifreler eşleşmiyor.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("https://derstech-backend.onrender.com/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      })

      if (!response.ok) {
        throw new Error("Kayıt başarısız. Lütfen tekrar deneyin.")
      }

      const data = await response.json()
      console.log("Kayıt başarılı:", data)

      // Token'ı yerel depolamaya kaydet
      localStorage.setItem("authToken", data.token)

      // Asistan sayfasına yönlendir
      window.location.href = "/assistant"
    } catch (error) {
      setErrorMessage((error as Error).message || "Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <AcmeIcon size={60} />
          <p className="text-xl font-medium">Hoş Geldiniz</p>
          <p className="text-small text-default-500">Başlamak için bir hesap oluşturun</p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleRegister}>
          <div className="flex flex-col">
            <Input
              isRequired
              label="Ad"
              name="firstName"
              placeholder="Adınızı girin"
              type="text"
              variant="bordered"
            />
            <Input
              isRequired
              label="Soyad"
              name="lastName"
              placeholder="Soyadınızı girin"
              type="text"
              variant="bordered"
            />
            <Input
              isRequired
              label="E-posta Adresi"
              name="email"
              placeholder="E-posta adresinizi girin"
              type="email"
              variant="bordered"
            />
            <Input
              isRequired
              endContent={
                <button type="button" onClick={toggleVisibility} aria-label="Şifre Görünürlüğünü Değiştir">
                  {isVisible ? (
                    <Icon className="pointer-events-none text-2xl text-default-400" icon="solar:eye-closed-linear" />
                  ) : (
                    <Icon className="pointer-events-none text-2xl text-default-400" icon="solar:eye-bold" />
                  )}
                </button>
              }
              label="Şifre"
              name="password"
              placeholder="Şifrenizi girin"
              type={isVisible ? "text" : "password"}
              variant="bordered"
            />
            <Input
              isRequired
              endContent={
                <button type="button" onClick={toggleConfirmVisibility} aria-label="Şifre Doğrulama Görünürlüğünü Değiştir">
                  {isConfirmVisible ? (
                    <Icon className="pointer-events-none text-2xl text-default-400" icon="solar:eye-closed-linear" />
                  ) : (
                    <Icon className="pointer-events-none text-2xl text-default-400" icon="solar:eye-bold" />
                  )}
                </button>
              }
              label="Şifreyi Onayla"
              name="confirmPassword"
              placeholder="Şifrenizi onaylayın"
              type={isConfirmVisible ? "text" : "password"}
              variant="bordered"
            />
          </div>
          <Checkbox isRequired className="py-4" size="sm">
            Şartlar &nbsp;
            <Link href="#" size="sm">
              ve Gizlilik Politikası'nı
            </Link>
            &nbsp; kabul ediyorum.
          </Checkbox>
          {errorMessage && <p className="text-red-500 text-small">{errorMessage}</p>}
          <Button color="primary" type="submit" disabled={loading}>
            {loading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">YA DA</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button startContent={<Icon icon="flat-color-icons:google" width={24} />} variant="bordered">
            Google ile Kayıt Ol
          </Button>
          <Button startContent={<Icon className="text-default-500" icon="fe:github" width={24} />} variant="bordered">
            Github ile Kayıt Ol
          </Button>
        </div>
        <p className="text-center text-small">
          Zaten bir hesabınız var mı?&nbsp;
          <Link href="#" size="sm">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  )
}
