import * as http from "http";
import * as socketIo from "socket.io";
import data from "./data";
import utils from "./utils";

export let io: socketIo.Server;

export const init = async (server: http.Server) => {
  io = new socketIo.Server(server, { path: "/socket", cors: { origin: "*" } });

  io.use(async (socket, next) => {
    let session_id = JSON.parse(socket.handshake.auth.session_id);
    session_id = utils.rsa.decrypter({ data: session_id });

    try {
      const session = await data.functions.session.find({ id: session_id });

      if (!session) {
        socket.emit("notSessionFound");
        return socket.disconnect(true);
      }

      socket.handshake.auth.session = session;

      next();
    } catch (error) {
      socket.emit("unknowError");
    }
  });

  io.on("connection", async (socket) => {
    let session_id = JSON.parse(socket.handshake.auth.session_id);
    session_id = utils.rsa.decrypter({ data: session_id });

    try {
      socket.join("private:" + session_id);
    } catch (error) {
      socket.emit("unknowError");
    }

    // const public_key = socket.handshake.auth.session.public_key;

    // const max_length = 80;
    // for (let i = 0; i < file.length; i += max_length) {
    //   const dt = file.slice(i, i + max_length);
    //   const dt2 = utils.rsa.encrypter({ data: dt, key: public_key });

    //   socket.emit(`stream:${i}`, { data: dt2 });
    // }
  });

  return io;
};
