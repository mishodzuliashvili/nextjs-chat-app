import Ably from "ably";

export default async function subscribeAbly(
  callback: (message: Message) => void
) {
  const ably = new Ably.Realtime.Promise(
    "kF6GTQ.ghESTw:4o49voVpJUXPgygFIsBnDr55MbpJLKUX11w5N4sq4F0"
  );
  await ably.connection.once("connected");
  const channel = ably.channels.get("chat");
  await channel.subscribe("message", (message: { data: Message }) => {
    callback(message.data);
  });
}
