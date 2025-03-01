// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const Button = ({
  children,
  onClick,
  disabled,
  className,
}: {
  children: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
      w-fit font-[GreyCliff] flex justify-center rounded border border-pearl p-2 text-xs font-bold uppercase text-pearl hover:bg-whiteOpacity ${
        disabled ? "disabled rounded" : "rounded"
      } 
        ${className !== undefined ? className : ""}
        `}
    >
      {children}
    </button>
  );
};
