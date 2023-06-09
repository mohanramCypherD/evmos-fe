import { useSelector } from "react-redux";
import { ConfirmButton, ViewExplorer } from "ui-helpers";
import { StoreType } from "evmos-wallet";

interface VestingProps {
  accountName: string;
  accountAddress: string;
  funderAddress: string;
  isVesting: boolean;
}

export const AccountDetails = ({ props }: { props: VestingProps }) => {
  const handleClawbackClick = () => {
    // TODO: handle clawback action
  };
  const value = useSelector((state: StoreType) => state.wallet.value);
  return !props.isVesting ? (
    <div className="flex items-center justify-center rounded-2xl bg-darkGray2 p-5">
      There is no vesting account linked to this address
    </div>
  ) : (
    <section className="break-words">
      <h1 className="text-2xl">Vesting Account Details</h1>
      <div className="my-5 mr-1 space-y-5 rounded-2xl bg-darkGray2 p-5 font-[IBM] text-sm text-pearl xl:mx-0 ">
        <div className="flex items-center justify-between">
          <h2 className="text-lg uppercase">{props.accountName} Account</h2>
          <ConfirmButton
            text="Clawback"
            onClick={handleClawbackClick}
            className="w-fit"
            disabled={!value.active}
          />
        </div>
        <div>
          <h3 className="opacity-60">Account Address</h3>
          <ViewExplorer
            txHash={props.accountAddress}
            explorerTxUrl="https://www.mintscan.io/evmos/account"
            text={props.accountAddress}
          />
        </div>
        <div>
          <h3 className="opacity-60">Funder Address</h3>
          <ViewExplorer
            txHash={props.funderAddress}
            explorerTxUrl="https://www.mintscan.io/evmos/account"
            text={props.funderAddress}
          />
        </div>
      </div>
    </section>
  );
};
