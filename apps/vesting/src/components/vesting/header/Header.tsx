import { ConfirmButton } from "ui-helpers";
import { SearchVesting } from "./SearchVesting";
import { useSelector } from "react-redux";
import { StoreType } from "evmos-wallet";
export const Header = () => {
  const handleConfirmClick = () => {
    // TODO: open modal for creating vesting account
  };

  const value = useSelector((state: StoreType) => state.wallet.value);

  return (
    <header className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-end lg:space-y-0 lg:space-x-2">
      <SearchVesting />
      <ConfirmButton
        className="w-fit"
        text="Create vesting account"
        onClick={handleConfirmClick}
        disabled={!value.active}
      />
    </header>
  );
};
