import * as ss58 from "@subsquid/ss58"
import { lookupArchive } from "@subsquid/archive-registry"
import {EventHandlerContext, SubstrateProcessor} from "@subsquid/substrate-processor"
import {Store, TypeormDatabase} from "@subsquid/typeorm-store"
import { Account } from "./model";

const processor = new SubstrateProcessor(new TypeormDatabase());


processor.setBatchSize(500);
processor.setDataSource({
  archive: 'http://206.81.4.77:4350/graphql',
  chain: "ws://archivelb.nakamoto.opentensor.ai:9944",
  
});

processor.setTypesBundle('types.json');

const logger = (data: any) => {
  console.log(data);
}


processor.addEventHandler('Balances.Transfer', async ctx => {
    const event = ctx.event;
    
    logger(event);
})