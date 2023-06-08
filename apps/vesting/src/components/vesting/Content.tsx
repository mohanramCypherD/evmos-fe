// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Header } from "./header/Header";

const Content = () => {
  return (
    <>
      <Header />
      <p className="mt-8 flex justify-center text-white">
        A list of your vesting accounts will appear here in the next version
      </p>
    </>
  );
};

export default Content;
