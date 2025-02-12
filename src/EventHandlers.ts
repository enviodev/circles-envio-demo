import {
  Hub, // contract
  HubV2, // contract
  ERC20Lift, // contract
  HubTransfer, // entity
} from "generated";

// Dynamic contract registration functions

Hub.Signup.contractRegister(
  async ({ event, context }) => {
    context.addPersonalCRC(event.params.token);
  },
  { preRegisterDynamicContracts: true }
);

ERC20Lift.ERC20WrapperDeployed.contractRegister(
  async ({ event, context }) => {
    context.addWrappedERC20(event.params.erc20Wrapper);
  },
  { preRegisterDynamicContracts: true }
);

HubV2.RegisterHuman.contractRegister(
  async ({ event, context }) => {
    context.addSafeAccount(event.params.avatar);
  },
  { preRegisterDynamicContracts: true }
);

// example event handler

Hub.HubTransfer.handler(async ({ event, context }) => {
  const entity: HubTransfer = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    to: event.params.to,
    amount: event.params.amount,
  };

  context.HubTransfer.set(entity);
});
