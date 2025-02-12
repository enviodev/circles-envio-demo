import assert from "assert";
import { 
  TestHelpers,
  Hub_HubTransfer
} from "generated";
const { MockDb, Hub } = TestHelpers;

describe("Hub contract HubTransfer event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for Hub contract HubTransfer event
  const event = Hub.HubTransfer.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("Hub_HubTransfer is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await Hub.HubTransfer.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualHubHubTransfer = mockDbUpdated.entities.Hub_HubTransfer.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedHubHubTransfer: Hub_HubTransfer = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      from: event.params.from,
      to: event.params.to,
      amount: event.params.amount,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualHubHubTransfer, expectedHubHubTransfer, "Actual HubHubTransfer should be the same as the expectedHubHubTransfer");
  });
});
