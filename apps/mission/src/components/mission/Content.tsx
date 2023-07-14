// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import dynamic from "next/dynamic";
import HalfLifeContainer from "./HalfLifeContainer";
import Assets from "./Assets";
import NewsFeed from "./feeds/NewsFeed";
import Governance from "./governance/Governance";
import Staking from "./staking/Staking";
import EvmosApps from "./apps/EvmosApps";
import { CLICK_MISSION_CONTROL_HALF_LIFE, useTracker } from "tracker";
import MissionContainer from "./MissionContainer";
import { useEffect } from "react";

const TopBarMissionControl = dynamic(() => import("./TopBarMissionControl"));

const Content = () => {
  const { handlePreClickAction } = useTracker(CLICK_MISSION_CONTROL_HALF_LIFE);

  useEffect(() => {
    window.Cypher({
      address: "", // the wallet address of the user connected ( to be filled )
      targetChainIdHex: "0x2329", // Evmos ChainID
      requiredTokenContractAddress:
        "0x93581991f68dbae1ea105233b67f7fa0d6bdee7b", // Evmos token Contract Address
      appId: "", // AppId (uuid) received (to be filled)
      parentComponentId: "cypher-onboading-sdk", // Id of the <div> tag inside which the widget is needed
    });

    return () => {
      window.Cypher = () => {}; // CleanUp function
    };
  }, []);

  return (
    <div className="flex flex-col pt-4">
      <TopBarMissionControl />

      <div className="mx-5 grid grid-cols-6 gap-6 xl:mx-0">
        <div className="col-span-6 flex flex-col gap-4 lg:col-span-4">
          <Assets />
          <Governance />
          <Staking />
          <MissionContainer>
            <div // div inside which the widget will be present
              id="cypher-onboading-sdk" // Id that will be passed to the window.Cypher() call
              className="flex flex-col items-center justify-center"
            ></div>
          </MissionContainer>
        </div>
        <div className="col-span-6 flex flex-col space-y-5 lg:col-span-2">
          <HalfLifeContainer
            onClick={() => {
              handlePreClickAction();
            }}
          />
          <NewsFeed />
          <EvmosApps />
        </div>
      </div>
    </div>
  );
};

export default Content;
