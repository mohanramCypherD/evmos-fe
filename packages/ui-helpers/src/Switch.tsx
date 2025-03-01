// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const Switch = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
}) => {
  return (
    <div className="mt-3 flex items-center justify-center xl:mt-0">
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          onChange={onChange}
          checked={checked}
        />
        <div className="dark:border-gray-600 h-4 w-10 rounded-full bg-darkGray3 text-pearl after:absolute after:top-[0px] after:left-[1px] after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-darkGray3 peer-checked:after:translate-x-full peer-checked:after:border-red peer-checked:after:bg-red"></div>
        <span className="ml-3 text-sm font-medium text-pearl">{label}</span>
      </label>
    </div>
  );
};
