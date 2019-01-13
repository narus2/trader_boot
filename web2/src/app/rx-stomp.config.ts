import {InjectableRxStompConfig} from "@stomp/ng2-stompjs";
import {environment} from "../environments/environment.prod";


export const myRxStompConfig:
  { brokerURL: string; debug: (msg: string) => void; reconnect_delay: number;
  heartbeat_out: number; heartbeat_in: number } =
  {
  brokerURL: environment.ws_serverURL,
//   headers: {
//     login: 'guest',
//     passcode: 'guest'
//   },
//
   heartbeat_in: 0, // Typical value 0 - disabled
   heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
   reconnect_delay: 200,
//   // Will log diagnostics on console
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};
