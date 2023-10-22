import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.7.1/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that hello-world function prints 'hello world'",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let deployer = accounts.get("deployer")!;

        let block = chain.mineBlock([
            Tx.contractCall("hello-world", "hello-world", [], deployer.address),
        ]);

        assertEquals(block.receipts.length, 1);

        let receipt = block.receipts[0];
        assertEquals(receipt.result, '(ok "hello world")');
        assertEquals(receipt.events.length, 1);
        assertEquals(receipt.events[0].contract_event.topic, 'print');
        assertEquals(receipt.events[0].contract_event.value, '"hello world"');
    },
});