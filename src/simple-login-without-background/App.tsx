"use client";

import React, { useEffect } from "react";
import { Button, Input, Checkbox, Link, Form, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

import { AcmeIcon } from "./acme";

export default function LoginComponent() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  // Kullanıcının zaten giriş yapmış olup olmadığını kontrol et
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      window.location.href = "/assistant";
    }
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Gönderilen Veri:", { email, password }); // Gönderilen veriyi kaydet

    try {
        const response = await fetch("https://derstech-backend.onrender.com/api/v1/auth/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Geçersiz e-posta veya şifre.");
        }

        const data = await response.json();
        console.log("Giriş başarılı:", data); // Yanıtı kaydet
        console.log("Token:", data.token); // Token'ı kaydet

        // Token'ı local storage'a veya güvenli bir yere kaydet
        localStorage.setItem("authToken", data.token);

        // Gerekirse yeniden yönlendirin veya UI'ı güncelleyin
        window.location.href = "/assistant"; // Asistan sayfasına yönlendir
    } catch (error) {
        if (error instanceof Error) {
            setErrorMessage(error.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
        } else {
            setErrorMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <AcmeIcon size={60} />
          <p className="text-xl font-medium">Tekrar Hoş Geldiniz</p>
          <p className="text-small text-default-500">Devam etmek için hesabınıza giriş yapın</p>
        </div>
        <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
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
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Şifre"
            name="password"
            placeholder="Şifrenizi girin"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              Beni Hatırla
            </Checkbox>
            <Link className="text-default-500" href="#" size="sm">
              Şifrenizi mi unuttunuz?
            </Link>
          </div>
          {errorMessage && <p className="text-red-500 text-small">{errorMessage}</p>}
          <Button className="w-full" color="primary" type="submit" disabled={loading}>
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </Button>
        </Form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">YA DA</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Google ile Devam Et
          </Button>
          <Button
            startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
            variant="bordered"
          >
            Github ile Devam Et
          </Button>
        </div>
        <p className="text-center text-small">
          Henüz bir hesabınız yok mu?&nbsp;
          <Link href="#" size="sm">
            Kaydol
          </Link>
        </p>
      </div>
    </div>
  );
}
