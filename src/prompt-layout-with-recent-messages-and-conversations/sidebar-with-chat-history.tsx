"use client";

import type { ComponentProps } from "react";

import React from "react";
import {
  Avatar,
  Button,
  ScrollShadow,
  Spacer,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  cn,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { AcmeIcon } from "./acme";
import SidebarDrawer from "./sidebar-drawer";

/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */

function AvatarDropdownIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3076_10614)">
        <path
          d="M6.6665 7.50008L9.99984 4.16675L13.3332 7.50008"
          stroke="#A1A1AA"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.3332 12.5L9.99984 15.8333L6.6665 12.5"
          stroke="#A1A1AA"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3076_10614">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function Component({
  children,
  header,
  title,
  subTitle,
  classNames = {},
}: {
  children?: React.ReactNode;
  header?: React.ReactNode;
  title?: string;
  subTitle?: string;
  classNames?: Record<string, string>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const content = (
    <div className="relative flex h-full w-72 flex-1 flex-col p-6">
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
          <AcmeIcon className="text-background" />
        </div>
        <span className="text-base font-bold uppercase leading-6 text-foreground">
          Dersitech
        </span>
      </div>

      <Spacer y={8} />

      <div className="flex flex-col gap-4">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              fullWidth
              className="h-[60px] justify-start gap-3 rounded-[14px] border-1 border-default-300 bg-transparent px-3 py-[10px]"
              endContent={<AvatarDropdownIcon height={20} width={20} />}
            >
              <div className="flex w-full items-center gap-3">
                <Avatar
                  size="sm"
                  src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/3a906b3de8eaa53e14582edf5c918b5d.jpg"
                />
                <div className="flex flex-col text-left">
                  <p className="text-small font-semibold leading-5 text-foreground">
                    Taylor Smith
                  </p>
                  <p className="text-tiny text-default-400">taylor@mail.com</p>
                </div>
              </div>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profil İşlemleri"
            className="w-[210px] bg-content1 px-[8px] py-[8px]"
            variant="flat"
          >
            <DropdownItem key="profile" className="h-14">
              <div className="flex w-full items-center gap-3">
                <Avatar
                  size="sm"
                  src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/3a906b3de8eaa53e14582edf5c918b5d.jpg"
                />
                <div className="flex flex-col text-left">
                  <p className="text-small font-normal leading-5 text-foreground">
                    Taylor Smith
                  </p>
                  <p className="text-tiny text-default-400">taylor@mail.com</p>
                </div>
              </div>
            </DropdownItem>
            <DropdownSection
              showDivider
              aria-label="profil-bölüm-1"
              className="px-0"
            >
              <DropdownItem key="my-plan" className="py-[4px] text-default-500">
                Planım
              </DropdownItem>
              <DropdownItem key="my-gpts" className="py-[4px] text-default-500">
                GPT'lerim
              </DropdownItem>
              <DropdownItem
                key="customize-dersitech"
                className="py-[4px] text-default-500"
              >
                Dersitech'i Özelleştir
              </DropdownItem>
            </DropdownSection>
            <DropdownSection showDivider aria-label="profil-bölüm-2">
              <DropdownItem
                key="settings"
                className="py-[4px] text-default-500"
              >
                Ayarlar
              </DropdownItem>
              <DropdownItem
                key="download-desktop-app"
                className="py-[4px] text-default-500"
              >
                Masaüstü Uygulamasını İndir
              </DropdownItem>
            </DropdownSection>
            <DropdownSection aria-label="profil-bölüm-3" className="mb-0">
              <DropdownItem
                key="help-and-feedback"
                className="py-[4px] text-default-500"
              >
                Yardım ve Geri Bildirim
              </DropdownItem>
              <DropdownItem key="logout" className="pt-[4px] text-default-500">
                Çıkış Yap
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>

      <ScrollShadow className="-mr-6 h-full max-h-full pr-6">
        <Button
          fullWidth
          className="mb-6 mt-2 h-[44px] justify-start gap-3 bg-default-foreground px-3 py-[10px] text-default-50"
          startContent={
            <Icon
              className="text-default-50"
              icon="solar:chat-round-dots-linear"
              width={24}
            />
          }
        >
          Yeni Sohbet
        </Button>
      </ScrollShadow>

      <div className="mt-auto flex flex-col mt-52">
        <Button
          fullWidth
          className="justify-start text-default-600"
          startContent={
            <Icon
              className="text-default-600"
              icon="solar:info-circle-line-duotone"
              width={24}
            />
          }
          variant="light"
        >
          Yardım
        </Button>
        <Button
          className="justify-start text-default-600"
          startContent={
            <Icon
              className="text-default-600"
              icon="solar:history-line-duotone"
              width={24}
            />
          }
          variant="light"
        >
          Etkinlikler
        </Button>

        <Button
          className="justify-start text-default-600"
          startContent={
            <Icon
              className="text-default-600"
              icon="solar:settings-minimalistic-line-duotone"
              width={24}
            />
          }
          variant="light"
        >
          Ayarlar
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-full min-h-[48rem] w-full py-4">
      <SidebarDrawer
        className="h-full flex-none rounded-[14px] bg-default-50"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {content}
      </SidebarDrawer>
      <div className="flex w-full flex-col px-4 sm:max-w-[calc(100%_-_288px)]">
        <header
          className={cn(
            "flex h-16 min-h-16 items-center justify-between gap-2 rounded-none rounded-t-medium border-small border-divider px-4 py-3",
            classNames?.["header"]
          )}
        >
          <Button
            isIconOnly
            className="flex sm:hidden"
            size="sm"
            variant="light"
            onPress={onOpen}
          >
            <Icon
              className="text-default-500"
              height={24}
              icon="solar:hamburger-menu-outline"
              width={24}
            />
          </Button>
          {(title || subTitle) && (
            <div className="w-full min-w-[120px] sm:w-auto">
              <div className="truncate text-small font-semibold leading-5 text-foreground">
                {title}
              </div>
              <div className="truncate text-small font-normal leading-5 text-default-500">
                {subTitle}
              </div>
            </div>
          )}
          {header}
        </header>
        <main className="flex h-full">
          <div className="flex h-full w-full flex-col gap-4 rounded-none rounded-b-medium border-0 border-b border-l border-r border-divider py-3">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
