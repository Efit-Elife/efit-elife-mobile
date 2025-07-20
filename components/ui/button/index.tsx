"use client";
import React from "react";
import { createButton } from "@gluestack-ui/button";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import {
  withStyleContext,
  useStyleContext,
} from "@gluestack-ui/nativewind-utils/withStyleContext";
import { cssInterop } from "nativewind";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { PrimitiveIcon, UIIcon } from "@gluestack-ui/icon";

const SCOPE = "BUTTON";

const Root = withStyleContext(Pressable, SCOPE);

const UIButton = createButton({
  Root: Root,
  Text,
  Group: View,
  Spinner: ActivityIndicator,
  Icon: UIIcon,
});

cssInterop(PrimitiveIcon, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: "classNameColor",
      stroke: true,
    },
  },
});

const buttonStyle = tva({
  base: "group/button rounded-lg flex-row items-center justify-center data-[focus-visible=true]:web:outline-none data-[focus-visible=true]:web:ring-2 data-[disabled=true]:opacity-40 gap-2",
  variants: {
    action: {
      primary:
        "bg-[rgb(64,255,167)] data-[hover=true]:bg-[rgb(44,235,147)] data-[active=true]:bg-[rgb(24,215,127)] border-[rgb(64,255,167)] data-[hover=true]:border-[rgb(44,235,147)] data-[active=true]:border-[rgb(24,215,127)] data-[focus-visible=true]:web:ring-primary-400",
      secondary:
        "bg-secondary-600 border-secondary-500 data-[hover=true]:bg-secondary-700 data-[hover=true]:border-secondary-600 data-[active=true]:bg-secondary-800 data-[active=true]:border-secondary-700 data-[focus-visible=true]:web:ring-secondary-400",
      positive:
        "bg-success-600 border-success-500 data-[hover=true]:bg-success-700 data-[hover=true]:border-success-600 data-[active=true]:bg-success-800 data-[active=true]:border-success-700 data-[focus-visible=true]:web:ring-success-400",
      negative:
        "bg-error-600 border-error-500 data-[hover=true]:bg-error-700 data-[hover=true]:border-error-600 data-[active=true]:bg-error-800 data-[active=true]:border-error-700 data-[focus-visible=true]:web:ring-error-400",
      default:
        "bg-background-100 data-[hover=true]:bg-background-200 data-[active=true]:bg-background-300 border-outline-300 data-[hover=true]:border-outline-400 data-[active=true]:border-outline-500",
    },
    variant: {
      link: "px-0",
      outline:
        "bg-transparent border-2 data-[hover=true]:bg-background-100 data-[active=true]:bg-background-200",
      solid: "border",
    },

    size: {
      xs: "px-3 h-8",
      sm: "px-4 h-9",
      md: "px-6 h-11",
      lg: "px-8 h-12",
      xl: "px-10 h-14",
    },
  },
  compoundVariants: [
    {
      action: "primary",
      variant: "link",
      class:
        "px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent",
    },
    {
      action: "secondary",
      variant: "link",
      class:
        "px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent",
    },
    {
      action: "positive",
      variant: "link",
      class:
        "px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent",
    },
    {
      action: "negative",
      variant: "link",
      class:
        "px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent",
    },
    {
      action: "primary",
      variant: "outline",
      class:
        "bg-transparent border-[rgb(64,255,167)] data-[hover=true]:bg-[rgba(64,255,167,0.1)] data-[active=true]:bg-[rgba(64,255,167,0.2)]",
    },
    {
      action: "secondary",
      variant: "outline",
      class:
        "bg-transparent border-secondary-500 data-[hover=true]:bg-secondary-100 data-[active=true]:bg-secondary-200",
    },
    {
      action: "positive",
      variant: "outline",
      class:
        "bg-transparent border-success-500 data-[hover=true]:bg-success-100 data-[active=true]:bg-success-200",
    },
    {
      action: "negative",
      variant: "outline",
      class:
        "bg-transparent border-error-500 data-[hover=true]:bg-error-100 data-[active=true]:bg-error-200",
    },
  ],
});

const buttonTextStyle = tva({
  base: "font-semibold web:select-none text-center",
  parentVariants: {
    action: {
      primary:
        "text-typography-950 data-[hover=true]:text-typography-950 data-[active=true]:text-typography-950",
      secondary:
        "text-typography-50 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0",
      positive:
        "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0",
      negative:
        "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0",
    },
    variant: {
      link: "data-[hover=true]:underline data-[active=true]:underline",
      outline: "",
      solid: "",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  parentCompoundVariants: [
    {
      variant: "solid",
      action: "primary",
      class:
        "text-typography-950 data-[hover=true]:text-typography-950 data-[active=true]:text-typography-950",
    },
    {
      variant: "solid",
      action: "secondary",
      class:
        "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0",
    },
    {
      variant: "solid",
      action: "positive",
      class:
        "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0",
    },
    {
      variant: "solid",
      action: "negative",
      class:
        "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0",
    },
    {
      variant: "outline",
      action: "primary",
      class:
        "text-[rgb(64,255,167)] data-[hover=true]:text-[rgb(44,235,147)] data-[active=true]:text-[rgb(24,215,127)]",
    },
    {
      variant: "outline",
      action: "secondary",
      class:
        "text-secondary-400 data-[hover=true]:text-secondary-300 data-[active=true]:text-secondary-200",
    },
    {
      variant: "outline",
      action: "positive",
      class:
        "text-success-400 data-[hover=true]:text-success-300 data-[active=true]:text-success-200",
    },
    {
      variant: "outline",
      action: "negative",
      class:
        "text-error-400 data-[hover=true]:text-error-300 data-[active=true]:text-error-200",
    },
    {
      variant: "link",
      action: "primary",
      class:
        "text-[rgb(64,255,167)] data-[hover=true]:text-[rgb(44,235,147)] data-[active=true]:text-[rgb(24,215,127)]",
    },
    {
      variant: "link",
      action: "secondary",
      class:
        "text-secondary-400 data-[hover=true]:text-secondary-300 data-[active=true]:text-secondary-200",
    },
    {
      variant: "link",
      action: "positive",
      class:
        "text-success-400 data-[hover=true]:text-success-300 data-[active=true]:text-success-200",
    },
    {
      variant: "link",
      action: "negative",
      class:
        "text-error-400 data-[hover=true]:text-error-300 data-[active=true]:text-error-200",
    },
  ],
});

const buttonIconStyle = tva({
  base: "fill-none",
  parentVariants: {
    variant: {
      link: "data-[hover=true]:underline data-[active=true]:underline",
      outline: "",
      solid: "",
    },
    size: {
      xs: "h-3.5 w-3.5",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-7 w-7",
    },
    action: {
      primary:
        "text-typography-950 data-[hover=true]:text-typography-950 data-[active=true]:text-typography-950",
      secondary:
        "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0",
      positive:
        "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0",
      negative:
        "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0",
    },
  },
  parentCompoundVariants: [
    {
      variant: "solid",
      action: "primary",
      class:
        "text-typography-950 data-[hover=true]:text-typography-950 data-[active=true]:text-typography-950",
    },
    {
      variant: "solid",
      action: "secondary",
      class:
        "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0",
    },
    {
      variant: "solid",
      action: "positive",
      class:
        "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0",
    },
    {
      variant: "solid",
      action: "negative",
      class:
        "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0",
    },
    {
      variant: "outline",
      action: "primary",
      class:
        "text-[rgb(64,255,167)] data-[hover=true]:text-[rgb(44,235,147)] data-[active=true]:text-[rgb(24,215,127)]",
    },
    {
      variant: "outline",
      action: "secondary",
      class:
        "text-secondary-400 data-[hover=true]:text-secondary-300 data-[active=true]:text-secondary-200",
    },
    {
      variant: "outline",
      action: "positive",
      class:
        "text-success-400 data-[hover=true]:text-success-300 data-[active=true]:text-success-200",
    },
    {
      variant: "outline",
      action: "negative",
      class:
        "text-error-400 data-[hover=true]:text-error-300 data-[active=true]:text-error-200",
    },
    {
      variant: "link",
      action: "primary",
      class:
        "text-[rgb(64,255,167)] data-[hover=true]:text-[rgb(44,235,147)] data-[active=true]:text-[rgb(24,215,127)]",
    },
    {
      variant: "link",
      action: "secondary",
      class:
        "text-secondary-400 data-[hover=true]:text-secondary-300 data-[active=true]:text-secondary-200",
    },
    {
      variant: "link",
      action: "positive",
      class:
        "text-success-400 data-[hover=true]:text-success-300 data-[active=true]:text-success-200",
    },
    {
      variant: "link",
      action: "negative",
      class:
        "text-error-400 data-[hover=true]:text-error-300 data-[active=true]:text-error-200",
    },
  ],
});

const buttonGroupStyle = tva({
  base: "",
  variants: {
    space: {
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
      xl: "gap-5",
      "2xl": "gap-6",
      "3xl": "gap-7",
      "4xl": "gap-8",
    },
    isAttached: {
      true: "gap-0",
    },
    flexDirection: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    },
  },
});

type IButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof UIButton>,
  "context"
> &
  VariantProps<typeof buttonStyle> & { className?: string };

const Button = React.forwardRef<
  React.ComponentRef<typeof UIButton>,
  IButtonProps
>(function Button(
  { className, variant = "solid", size = "md", action = "primary", ...props },
  ref
) {
  const computedClassName = React.useMemo(
    () => buttonStyle({ variant, size, action, class: className }),
    [variant, size, action, className]
  );

  const context = React.useMemo(
    () => ({ variant, size, action }),
    [variant, size, action]
  );

  return (
    <UIButton
      ref={ref}
      {...props}
      className={computedClassName}
      context={context}
    />
  );
});

type IButtonTextProps = React.ComponentPropsWithoutRef<typeof UIButton.Text> &
  VariantProps<typeof buttonTextStyle> & { className?: string };

const ButtonText = React.forwardRef<
  React.ComponentRef<typeof UIButton.Text>,
  IButtonTextProps
>(function ButtonText({ className, variant, size, action, ...props }, ref) {
  const styleContext = useStyleContext(SCOPE);

  const computedClassName = React.useMemo(() => {
    const {
      variant: parentVariant,
      size: parentSize,
      action: parentAction,
    } = styleContext;

    return buttonTextStyle({
      parentVariants: {
        variant: parentVariant,
        size: parentSize,
        action: parentAction,
      },
      variant,
      size,
      action,
      class: className,
    });
  }, [styleContext, variant, size, action, className]);

  return <UIButton.Text ref={ref} {...props} className={computedClassName} />;
});

const ButtonSpinner = UIButton.Spinner;

type IButtonIcon = React.ComponentPropsWithoutRef<typeof UIButton.Icon> &
  VariantProps<typeof buttonIconStyle> & {
    className?: string | undefined;
    as?: React.ElementType;
    height?: number;
    width?: number;
  };

const ButtonIcon = React.forwardRef<
  React.ComponentRef<typeof UIButton.Icon>,
  IButtonIcon
>(function ButtonIcon({ className, size, ...props }, ref) {
  const styleContext = useStyleContext(SCOPE);

  const computedClassName = React.useMemo(() => {
    const {
      variant: parentVariant,
      size: parentSize,
      action: parentAction,
    } = styleContext;

    return buttonIconStyle({
      parentVariants: {
        size: parentSize,
        variant: parentVariant,
        action: parentAction,
      },
      size,
      class: className,
    });
  }, [styleContext, size, className]);

  if (typeof size === "number") {
    return (
      <UIButton.Icon
        ref={ref}
        {...props}
        className={buttonIconStyle({ class: className })}
        size={size}
      />
    );
  } else if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UIButton.Icon
        ref={ref}
        {...props}
        className={buttonIconStyle({ class: className })}
      />
    );
  }
  return <UIButton.Icon {...props} className={computedClassName} ref={ref} />;
});

type IButtonGroupProps = React.ComponentPropsWithoutRef<typeof UIButton.Group> &
  VariantProps<typeof buttonGroupStyle>;

const ButtonGroup = React.forwardRef<
  React.ComponentRef<typeof UIButton.Group>,
  IButtonGroupProps
>(function ButtonGroup(
  {
    className,
    space = "md",
    isAttached = false,
    flexDirection = "column",
    ...props
  },
  ref
) {
  const computedClassName = React.useMemo(
    () =>
      buttonGroupStyle({
        class: className,
        space,
        isAttached,
        flexDirection,
      }),
    [className, space, isAttached, flexDirection]
  );

  return <UIButton.Group className={computedClassName} {...props} ref={ref} />;
});

Button.displayName = "Button";
ButtonText.displayName = "ButtonText";
ButtonSpinner.displayName = "ButtonSpinner";
ButtonIcon.displayName = "ButtonIcon";
ButtonGroup.displayName = "ButtonGroup";

export { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup };
