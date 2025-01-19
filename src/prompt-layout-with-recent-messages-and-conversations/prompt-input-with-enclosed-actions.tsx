"use client"
import type { TextAreaProps } from "@heroui/react"

import type React from "react"
import { Button, Tooltip } from "@heroui/react"
import { Icon } from "@iconify/react"
import { cn } from "@heroui/react"

import PromptInput from "./prompt-input"

export default function Component(
  props: TextAreaProps & {
    classNames?: Record<"button" | "buttonIcon", string>
    value: string
    onValueChange: (value: string) => void
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
    onSendMessage: () => void
  },
) {
  const { value, onValueChange, onKeyDown, onSendMessage, ...rest } = props

  return (
    <form className="flex w-full items-start gap-2" onSubmit={(e) => e.preventDefault()}>
      <PromptInput
        {...rest}
        classNames={{
          innerWrapper: cn("items-center", props.classNames?.innerWrapper),
          input: cn(
            "text-medium data-[has-start-content=true]:ps-0 data-[has-start-content=true]:pe-0",
            props.classNames?.input,
          ),
        }}
        endContent={
          <div className="flex gap-2">
            <Tooltip showArrow content="Send message">
              <Button
                isIconOnly
                className={props?.classNames?.button || ""}
                color={!value ? "default" : "primary"}
                isDisabled={!value}
                radius="full"
                variant={!value ? "flat" : "solid"}
                onClick={onSendMessage}
              >
                <Icon
                  className={cn(
                    "[&>path]:stroke-[2px]",
                    !value ? "text-default-500" : "text-primary-foreground",
                    props?.classNames?.buttonIcon || "",
                  )}
                  icon="solar:arrow-up-linear"
                  width={20}
                />
              </Button>
            </Tooltip>
          </div>
        }
        startContent={
          <Tooltip showArrow content="Add file">
            <Button isIconOnly className="p-[10px]" radius="full" variant="light">
              <Icon className="text-default-500" icon="solar:paperclip-linear" width={20} />
            </Button>
          </Tooltip>
        }
        value={value}
        onValueChange={onValueChange}
        onKeyDown={onKeyDown}
      />
    </form>
  )
}

