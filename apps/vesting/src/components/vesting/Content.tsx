// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useRouter } from "next/router";
import { Header } from "./header/Header";
import { Navigation } from "ui-helpers";
import { NAV_TO_VESTING } from "constants-helper";
import { AccountDetails } from "./content/AccountDetails";

const Content = () => {
  const router = useRouter();
  const { account } = router.query;

  // TODO: use it with the right information
  const dummyProps = {
    accountName: "Evan Mosley",
    // eslint-disable-next-line no-secrets/no-secrets
    accountAddress: "evmosc5ljcjw341ls6f7xpfvakm2amg962y84z3kell8ks",
    // eslint-disable-next-line no-secrets/no-secrets
    funderAddress: "evmos1cnr73vd4xcjm83xs8275twu06w3xqr6n7g5cud",
    isVesting: true,
  };

  return (
    <>
      {account !== undefined && <Navigation href="/" text={NAV_TO_VESTING} />}
      <Header />

      <div className="mt-8 w-full font-[IBM] text-pearl">
        {account === undefined ? (
          <p className="flex justify-center ">
            A list of your vesting accounts will appear here in the next version
          </p>
        ) : (
          <AccountDetails props={dummyProps} />
        )}
      </div>
    </>
  );
};

export default Content;
