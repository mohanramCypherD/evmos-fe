// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ChangeEvent, KeyboardEvent, useState } from "react";

import { Search } from "ui-helpers";
export const SearchVesting = () => {
  const handleOnClick = () => {
    //   redirects to vesting account or to 404
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      //   redirects to vesting account or to 404
    }
  };
  const [value, setValue] = useState("");

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const props = {
    placeholder: "Search Accounts",
    handleKeyDown,
    handleOnClick,
    value,
    handleSetValue,
  };
  return <Search props={props} />;
};
