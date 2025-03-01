// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";
import { UndelegateProps } from "../types";
import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";
import { executeUndelegate } from "../../../../internal/staking/functionality/transactions/undelegate";
import { snackExecuteIBCTransfer } from "evmos-wallet";

import {
  CLICK_BUTTON_CONFIRM_UNDELEGATE,
  useTracker,
  SUCCESSFUL_TX_UNDELEGATE,
  UNSUCCESSFUL_TX_UNDELEGATE,
} from "tracker";
export const useUndelegation = (useUndelegateProps: UndelegateProps) => {
  const dispatch = useDispatch();
  const { handlePreClickAction } = useTracker(CLICK_BUTTON_CONFIRM_UNDELEGATE);
  const { handlePreClickAction: successfulTx } = useTracker(
    SUCCESSFUL_TX_UNDELEGATE
  );
  const { handlePreClickAction: unsuccessfulTx } = useTracker(
    UNSUCCESSFUL_TX_UNDELEGATE
  );
  const handleConfirmButton = async () => {
    handlePreClickAction({
      wallet: useUndelegateProps?.wallet?.evmosAddressEthFormat,
      provider: useUndelegateProps?.wallet?.extensionName,
    });
    useUndelegateProps.setConfirmClicked(true);
    if (
      useUndelegateProps.value === undefined ||
      useUndelegateProps.value === null ||
      useUndelegateProps.value === "" ||
      Number(useUndelegateProps.value) === 0
    ) {
      return;
    }
    const amount = parseUnits(useUndelegateProps.value, BigNumber.from(18));

    if (amount.gt(useUndelegateProps.item.balance)) {
      return;
    }

    useUndelegateProps.setDisabled(true);

    const res = await executeUndelegate(
      useUndelegateProps.wallet,
      useUndelegateProps.item.validatorAddress,
      amount
    );
    dispatch(snackExecuteIBCTransfer(res));
    if (res.error === true) {
      unsuccessfulTx({
        errorMessage: res.message,
        wallet: useUndelegateProps.wallet?.evmosAddressEthFormat,
        provider: useUndelegateProps.wallet?.extensionName,
        transaction: "unsuccessful",
      });
    } else {
      successfulTx({
        txHash: res.txHash,
        wallet: useUndelegateProps.wallet?.evmosAddressEthFormat,
        provider: useUndelegateProps.wallet?.extensionName,
        transaction: "successful",
      });
    }
    useUndelegateProps.setShow(false);
  };

  return { handleConfirmButton };
};
